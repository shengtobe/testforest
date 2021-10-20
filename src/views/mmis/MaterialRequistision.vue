<template>
  <v-card class="theme-card">
    <v-card-title class="white--text px-4 py-1">
      移存申請單
      <v-spacer />
      <v-btn dark fab small text  class="mr-n2" @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <div class="px-6 py-4">
      <v-row>
        <!-- 檢查項目 -->
        <v-col cols="12">
          <v-row no-gutter class="label-header">
            <v-col cols="12" lg="6">
              <h3 class="mb-1">移出編號</h3>
              <v-text-field hide-details solo v-model="InsertItem.MaintainCode" @focus="_dialogOpen('out')"/>
            </v-col>
            <v-col cols="12" lg="6">
              <DeptSelect label="移出單位" outType="key" :showIcon="false" v-model="InsertItem.ReqDepartCode"/>
            </v-col>
            <v-col cols="12" lg="6">
              <h3 class="mb-1">移入編號</h3>
              <v-text-field hide-details solo v-model="InsertItem.RecMaintainCode" @focus="_dialogOpen('in')"/>
            </v-col>
            <v-col cols="12" lg="6">
              <DeptSelect label="移入單位" outType="key" :showIcon="false" v-model="InsertItem.RecDepartCode"/>
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1">數量</h3>
              <v-text-field type="number" :max="maxAmount" min=0 solo v-model="InsertItem.Count" />
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1">備註</h3>
              <v-textarea solo v-model="InsertItem.Memo" />
            </v-col>
          </v-row>
        </v-col>
        <!-- END 檢查項目 -->
      </v-row>
    </div>
    <v-dialog v-model="dialogShow"  max-width="500px">
      <v-card class="theme-card">
        <v-card-title class="white--text px-4 py-1">
          移存申請單
          <v-spacer />
          <v-btn dark fab small text  class="mr-n2" @click="dialogClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <equipRepairObject 
          :nowEqCode="DMaterialCode.equipCode"
          :nowWorkCode="DMaterialCode.workCode"
          :needIcon="false" 
          :disableToLv="0"
          :toLv="5" 
          @getEqCode="_getEqCode" 
          @getWorkCode="_getWorkCode"
          :key="componentKey">
        </equipRepairObject>
        <v-card-actions class="px-5 pb-5">
          <v-spacer></v-spacer>
          <v-btn class="mr-2 btn-close white--text" elevation="4" @click="dialogClose">取消</v-btn>
          <v-btn class="btn-add white--text" elevation="4" @click="confirmSelect">送出</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card-actions class="px-5 pb-5">
      <v-spacer></v-spacer>
      <v-btn class="mr-2 btn-close white--text" elevation="4" @click="close">取消</v-btn>
      <v-btn class="btn-add white--text" elevation="4" @click="goSvae" :disabled="saveDis">送出</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import equipRepairObject from '@/components/EquipRepairCode'
import { materialInventoryQuery, materialSpecQuery, materialRequistision } from '@/apis/materialManage/material'
import DeptSelect from '@/components/forManage/deptSelect'
export default {
  props: {
    value:'',
  },
  data: () => ({
    InsertItem:{
      RecDepartCode:'',
      MaintainCode:'',
      RecMaintainCode:'',
      Count:0,
      ReqDepartCode:'',
      ReqName:'',
      Memo:''
    },
    componentKey: 0,
    dialogShow: false,
    DMaterialCode: {
      equipCode: '',
      workCode: '',
    },
    tempMaterialCode: {
      equipCode: '',
      workCode: '',
    },
    tempType: '',
    checkInv:{
      out: true,
      in: true
    },
    maxAmount: 0
  }),
  mounted: function() {
  },
  components: {
   equipRepairObject,
   DeptSelect
  },
  computed: {
    ...mapState ('user', {
      userData: state => state.userData,  // 使用者基本資料
    }),
    saveDis() {
      return this.checkInv.out || this.checkInv.in
    }
  },
  methods: {
    ...mapActions('system', [
      'chMsgbar',  // messageBar
      'chLoadingShow'  // 切換 loading 圖顯示
    ]),
    /* WBS control start */
    _dialogOpen(openType) {
      this.tempType = openType
      const defCode = this.InsertItem[(openType=='out'?'MaintainCode':'RecMaintainCode')]
      const defArr = defCode.split('-')
      if(defArr.length == 5){
        this.DMaterialCode.equipCode = defArr[0] + '-' +  defArr[1] + '-' + defArr[2] + '-' + defArr[3]
        this.DMaterialCode.workCode = defArr[4]
      }
      this.componentKey += 1
      this.dialogShow = true
    },
    dialogClose() {
      this.tempMaterialCode = {
        equipCode: '',
        workCode: '',
      }
      this.dialogShow = false
    },
    confirmSelect() {
      let code = this.tempMaterialCode.equipCode + '-' + this.tempMaterialCode.workCode
      materialSpecQuery({
        MaterialCode: code,
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res=>{
        if(res.data.ErrorCode == 0){
          this.InsertItem[(this.tempType=='out'?'MaintainCode':'RecMaintainCode')] = code
          this.dialogClose()
        }else{
          this.chMsgbar({ success: false, msg: '查無規格資料，請先新增料件規格' })
        }
      }).catch(err=>{
        this.chMsgbar({ success: false, msg: '伺服器發生問題，規格資料查詢失敗' })
      })
    },
    _getEqCode(eq) {
      this.tempMaterialCode.equipCode = eq
    },
    _getWorkCode(wk) {
      this.tempMaterialCode.workCode = wk
    },
    /* WBS control end */
    // 找庫存
    checkInventory(openType) {
      let WBS = this.InsertItem[(openType=='out'?'MaintainCode':'RecMaintainCode')]
      let Dept = this.InsertItem[(openType=='out'?'ReqDepartCode':'RecDepartCode')]
      materialInventoryQuery({
        MaterialCode: WBS,
        DepartCode: Dept,
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res=>{
        if(res.data.ErrorCode == 0){
          if(openType=='out'){
            this.maxAmount = res.data.Amount
          }
          this.checkInv[openType] = false
        }else{
          this.checkInv[openType] = true
          this.chMsgbar({ success: false, msg: '查無庫存資料，請先新增單位庫存' })
        }
      }).catch(err=>{
        this.checkInv[openType] = true
        this.chMsgbar({ success: false, msg: '伺服器發生問題，庫存資料查詢失敗' })
      })
    },
    goSvae() {
      if(this.InsertItem.Count<=this.maxAmount){
        materialRequistision({
          ...this.InsertItem,
          ReqName: this.userData.UserId,
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id
        }).then(res => {
          if(res.data.ErrorCode == 0){
            this.chMsgbar({success:true, msg:'資料新增成功！'})
            this.close()
          }else{
            this.chMsgbar({ success: false, msg: '資料發生問題，資料新增失敗' })
          }
        }).catch( err => {
          this.chMsgbar({ success: false, msg: '伺服器發生問題，資料新增失敗' })
        })
      }else{
        this.chMsgbar({ success: false, msg: '庫存數量不足，請檢查數量' })
      }
    },
    close() {
      this.$emit('onclose')
    },
  },
  watch: {
    "InsertItem.ReqDepartCode": function() {
      this.checkInventory('out')
    },
    "InsertItem.RecDepartCode": function(){
      this.checkInventory('in')
    }
  },
  created() {},
};
</script>