<template>
  <v-card>
    <v-card-title class="blue white--text px-4 py-1">
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
          <v-row no-gutter class="indigo--text">
            <v-col cols="12">
              <h3 class="mb-1">移出編號</h3>
              <v-text-field hide-details solo v-model="defaultItem.MaintainCode" @focus="_dialogOpen('out')"/>
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1">移存編號</h3>
              <v-text-field hide-details solo v-model="defaultItem.RecMaintainCode" @focus="_dialogOpen('in')"/>
            </v-col>
            <v-col cols="12" sm="6">
              <h3 class="mb-1">數量</h3>
              <v-text-field type="number" min=0 solo v-model="defaultItem.Count" />
            </v-col>
            <v-col cols="12" sm="6">
              <h3 class="mb-1">接收人</h3>
              <v-text-field solo v-model="defaultItem.RecName" />
            </v-col>
          </v-row>
        </v-col>
        <!-- END 檢查項目 -->
      </v-row>
    </div>
    <v-dialog v-model="dialogShow"  max-width="500px">
      <v-card>
        <v-card-title class="blue white--text px-4 py-1">
          移存申請單
          <v-spacer />
          <v-btn dark fab small text  class="mr-n2" @click="dialogClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <equipRepairObject 
          :nowEqCode="DMaterialCode.equipCode"
          :nowWorkCode="DMaterialCode.workCode"
          :needIcon="iconNeeded" 
          :disableToLv="lvDisable"
          :toLv="dialogToLv" 
          @getEqCode="_getEqCode" 
          @getWorkCode="_getWorkCode"
          :key="componentKey">
        </equipRepairObject>
        <v-card-actions class="px-5 pb-5">
          <v-spacer></v-spacer>
          <v-btn class="mr-2" elevation="4" @click="dialogClose">取消</v-btn>
          <v-btn color="success" elevation="4" @click="confirmSelect">送出</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card-actions class="px-5 pb-5">
      <v-spacer></v-spacer>
      <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
      <v-btn color="success" elevation="4" @click="goSvae">送出</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime,encodeObject,decodeObject } from '@/assets/js/commonFun'
import equipRepairObject from '@/components/EquipRepairCode'
import { mmaterialRequistision } from '@/apis/materialManage/material'
export default {
  props: {
    value:'',
  }
  ,
  data: () => ({
    defaultItem: {
      MaintainCode: '',
      RecDepartCode: '',
      Count: '0',
      RecName: '',
      ReqName: '',
      ReqDepartCode: '',
      RecMaintainCode: '',
    },
    dialogToLv: 5,
    lvDisable: 0,
    iconNeeded: false,
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
  }),
  mounted: function() {
    //this.userData.UserName
  },
  components: {
   equipRepairObject
  },
  computed: {
    ...mapState ('user', {
      userData: state => state.userData,  // 使用者基本資料
    }),
  },
  methods: {
    ...mapActions('system', [
      'chMsgbar',  // messageBar
      'chLoadingShow'  // 切換 loading 圖顯示
    ]),
    _dialogOpen(openType) {
      this.tempType = openType
      const defCode = this.defaultItem[(openType=='out'?'MaintainCode':'RecDepartCode')]
      const defArr = defCode.split('-')
      if(defArr.length == 5){
        this.DMaterialCode.equipCode = defArr[0] + '-' +  defArr[1] + '-' + defArr[2] + '-' + defArr[3]
        this.DMaterialCode.workCode = defArr[4]
      }
      this.componentKey += 1
      this.dialogShow = true
    },
    close() {
      this.$emit('onclose')
    },
    dialogClose() {
      this.tempMaterialCode = {
        equipCode: '',
        workCode: '',
      }
      this.dialogShow = false
    },
    confirmSelect() {
      this.defaultItem[(this.tempType=='out'?'MaintainCode':'RecMaintainCode')] = this.tempMaterialCode.equipCode + '-' + this.tempMaterialCode.workCode
      this.dialogClose()
    },
    _getEqCode(eq) {
      this.tempMaterialCode.equipCode = eq
    },
    _getWorkCode(wk) {
      this.tempMaterialCode.workCode = wk
    },
    goSvae() {
      this.defaultItem.ReqName = this.userData.UserName
      mmaterialRequistision({
        ...this.defaultItem,
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res => {
        if(res.data.ErrorCode == 0){
          this.chMsgbar({success:true, msg:'資料新增成功！'})
        }else{
          this.chMsgbar({ success: false, msg: '資料發生問題，資料新增失敗' })
        }
      }).catch( err => {
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料新增失敗' })
      }).finally(() => {
        this.close()
      })
    },
  },
  filters: {
    
  },
  watch: {
    
  },
  created() {},
};
</script>