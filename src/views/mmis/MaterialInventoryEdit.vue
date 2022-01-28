<template>
  <v-card class="theme-card">
    <v-card-title class="white--text px-4 py-1 label-title">
      {{DType|getType}}料件庫存
      <v-spacer></v-spacer>
      <v-btn dark fab small text @click="close" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <div class="px-6 py-4">
      <v-row>
        <!-- 檢查項目 -->
        <v-col cols="12">
          <v-row no-gutter class="label-header">
            <v-col cols="12" sm="6">
              <DeptSelect  label="保存單位" outType="key" :showIcon="false" v-model="materDetail.DepartCode" :readonly="DType=='edit'"/>
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1">材料編號</h3>
              <v-text-field solo v-model="showDetail.MaterialCodeName"  @click="goMaterial" :disabled="DType=='edit'"/>
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1">材料名稱</h3>
              {{ showDetail.MaterialName }}
            </v-col>
            <v-col cols="12" sm="6">
              <h3 class="mb-1">單位</h3>
              {{ showDetail.Unit }}
            </v-col>
            <v-col cols="12" sm="6">
              <h3 class="mb-1">單價</h3>
              {{ showDetail.Price }}元
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1">規範</h3>
              {{ showDetail.Specification }}
            </v-col>   
            <v-col cols="12">
              <h3 class="mb-1">規格備註</h3>
              {{ showDetail.SpecMemo }}
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1">規格照片</h3>
              <v-img
                v-for="(pics,index) in FileListPic"
                :key="'Pic'+ materDetail.MaterialCode +index"
                :src="(/png|jpeg|jpg|gif$/.test(pics.FileFullPath.replace(/\\/g,'/')))?pics.FileFullPath.replace(/\\/g,'/') : '/images/file.jpg'"
                @click="(/png|jpeg|jpg|gif$/.test(pics.FileFullPath))?goViewPic(pics.FileFullPath.replace(/\\/g,'/')):false"
                max-height="172"
                max-width="280"
                :class="{'cursor-pointer':/png|jpeg|jpg|gif$/.test(pics.FileFullPath)}"
              ></v-img>
              <v-chip v-if="FileListPic.length==0">無上傳照片</v-chip>
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">上月結存數量</h3>
              <v-text-field type="number" min="0" solo v-model="materDetail.LastMonthAmount"  />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">安全庫存數量</h3>
              <v-text-field type="number" min="0" solo v-model="materDetail.SaftyAmount"  />
            </v-col>
            <v-col cols="0" sm="4"></v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">本月實收數量</h3>
              <v-text-field type="number" min="0" solo v-model="materDetail.MonthAmountRcv"  />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">本月領用數量</h3>
              <v-text-field type="number" min="0" solo v-model="materDetail.MonthAmountGet"  />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">本月結存數量</h3>
              <v-text-field type="number" min="0" solo v-model="materDetail.Amount"  />
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1">備註</h3>
              <v-textarea solo v-model="materDetail.Memo"  />
            </v-col>
          </v-row>
        </v-col>
        <!-- END 檢查項目 -->
      </v-row>
    </div>
    <v-dialog v-model="dialogShow">
      <v-card class="theme-card">
        <v-card-title class="white--text px-4 py-1">
          <v-spacer></v-spacer>
          <v-btn dark fab small text @click="_resetMaterialCode" class="mr-n2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <equipRepairObject 
          :nowEqCode="LCEquipCode"
          :nowWorkCode="LCWorkCode"
          :needIcon="iconNeeded" 
          :disableToLv="lvDisable"
          :toLv="dialogToLv" 
          @getEqCode="_getEqCode" 
          @getWorkCode="_getWorkCode"
          @getEqCh="_getEqName"
          @getWorkCh="_getWorkName"
          :key="componentKey">
        </equipRepairObject>
        <v-card-actions class="px-5 pb-5">
          <v-spacer></v-spacer>
          <v-btn class="mr-2 btn-close white--text" elevation="4" @click="_resetMaterialCode">取消</v-btn>
          <v-btn class="btn-add white--text" elevation="4" @click="_setMaterialCode">選擇</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card-actions class="px-5 pb-5">
      <v-spacer></v-spacer>
      <v-btn class="mr-2 btn-close white--text" elevation="4" @click="close">取消</v-btn>
      <v-btn class="btn-add white--text" elevation="4" @click="save" :disabled="sendDisabled">送出</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime,encodeObject,decodeObject } from '@/assets/js/commonFun'
import { materialInventoryQuery, materialSpecQuery, materialSpecFileView } from '@/apis/materialManage/material'
import equipRepairObject from '@/components/EquipRepairCode'
import DeptSelect from '@/components/forManage/deptSelect2'
export default {
  props: {
    materCode: String,
    deptCode: String,
    DType: String,
  }
  ,
  data: () => ({
    FileListPic: [],
    materDetail:{
      DepartCode: '',
      MaterialCode: '',
      LastMonthAmount: '0',
      MonthAmountRcv: '0',
      MonthAmountGet: '0',
      Amount: '0',
      SaftyAmount: '0',
      Memo: '',
    },
    showDetail: {
      MaterialCodeName: '',
      MaterialName: '',
      Specification: '',
      Unit: '',
      Price: '0',
      SpecMemo: '',
    },
    dialogShow:false,
    dialogToLv: 5,
    iconNeeded: false,
    lvDisable: 0,
    tempMaterialCode: {
      equipCode: '',
      workCode: '',
      equipName: '',
      workName: ''
    },
    componentKey: 0,
    sendDisabled: false
  }),
  mounted: function() {
    this.getDetail(this.materCode,this.deptCode)
  },
  components: {
   equipRepairObject,
   DeptSelect
  },
  computed: {
    ...mapState ('user', {
      userData: state => state.userData,  // 使用者基本資料
    }),
    LCEquipCode: {
      get () {
        let valArr = this.materDetail.MaterialCode?.split('-')||[]
        if(valArr.length == 5){
          return valArr[0] +'-' + valArr[1] +'-' + valArr[2] +'-' + valArr[3]
        }else{
          return ''
        }
      },
      set (value) {
        this.materDetail.MaterialCode = value + '-' + this.LCWorkCode
      }
    },
    LCWorkCode: {
      get () {
        let valArr = this.materDetail.MaterialCode?.split('-')||[]
        if(valArr.length == 5){
          return valArr[4]
        }else{
          return ''
        }
      },
      set (value) {
        this.materDetail.MaterialCode = this.LCEquipCode + '-' + value
      }
    },
    necCheck: function() {
      return {
        DepartCode: this.materDetail.DepartCode== '',
        MaterialCode: this.materDetail.MaterialCode== '',
        LastMonthAmount: this.materDetail.LastMonthAmount== ''||this.materDetail.LastMonthAmount<0,
        MonthAmountRcv: this.materDetail.MonthAmountRcv== ''||this.materDetail.MonthAmountRcv<0,
        MonthAmountGet: this.materDetail.MonthAmountGet== ''||this.materDetail.MonthAmountGet<0,
        Amount: this.materDetail.Amount== ''||this.materDetail.Amount<0,
        SaftyAmount: this.materDetail.SaftyAmount== ''||this.materDetail.SaftyAmount<0,
      }
    }
  },
  methods: {
    ...mapActions('system', [
      'chMsgbar',  // messageBar
      'chLoadingShow'  // 切換 loading 圖顯示
    ]),
    getFiles(){
      materialSpecFileView({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        MaterialCode: this.materDetail.MaterialCode,
      }).then(resp=>{
        if(resp.data.ErrorCode==0){
          this.FileListPic = resp.data.FileCount
        } else {
          this.chDialog({ show: true, msg: '伺服器發生問題，照片查詢失敗' })
        }
      }).catch(err => {
        this.chDialog({ show: true, msg: '伺服器發生問題，照片查詢失敗' })
      }).finally(() => {
      })
    },
    //詳細查詢
    getDetail(matCode,deptCode) {
      const that = this
      if(that.materCode != ''){
        that.chLoadingShow({show:true})
        materialInventoryQuery({
          MaterialCode: matCode,
          DepartCode: deptCode,  
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id
        }).then(res => {
          if (res.data.ErrorCode == 0) {
            for(let mKey in that.materDetail){
              that.materDetail[mKey] = res.data[mKey]
            }
            for(let sKey in that.showDetail){
              that.showDetail[sKey] = res.data[sKey]
            }
             // 顯示縮圖
            this.getFiles()
          } else {
            console.warn(res.data)
            // sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
            // that.$router.push({ path: '/error' })
          }
        }).catch( err => {
          that.chMsgbar({ success: false, msg: '伺服器發生問題，查詢失敗' })
          that.sendDisabled = true
        }).finally(() => {
          that.chLoadingShow({show:false})
          that.materDetail = decodeObject(that.materDetail)
          this.contentShow = true;
        })
      }else{
        this.materDetail.DepartCode = this.userData.DeptList[0].DeptId
      }
    },
    goMaterial() {
      if(this.DType!='edit') {
        this.dialogShow = true
      }
    },
    _getEqCode(eq) {
      this.tempMaterialCode.equipCode = eq
    },
    _getWorkCode(work) {
      this.tempMaterialCode.workCode = work
    },
    _getEqName(eq) {
      this.tempMaterialCode.equipName = eq
    },
    _getWorkName(work) {
      this.tempMaterialCode.workName = work
    },
    _resetMaterialCode() {
      this.dialogShow = false
      this.componentKey += 1
    },
    _setMaterialCode() {
      this.LCEquipCode = this.tempMaterialCode.equipCode
      this.LCWorkCode = this.tempMaterialCode.workCode
      this.showDetail.MaterialCodeName = this.tempMaterialCode.equipName + '-' + this.tempMaterialCode.workName
      

      materialSpecQuery({
        MaterialCode: this.materDetail.MaterialCode,
        DepartCode: this.materDetail.DepartCode,  
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res => {
        if(res.data.ErrorCode == 0) {
          // 顯示縮圖
          this.getFiles()
          
          materialInventoryQuery({
            MaterialCode: this.materDetail.MaterialCode,
            DepartCode: this.materDetail.DepartCode,  
            ClientReqTime: getNowFullTime(),  // client 端請求時間
            OperatorID: this.userData.UserId,  // 操作人id
          }).then(response => {
            if (response.data.ErrorCode == 1) {
              for(let iKey in this.showDetail){
                if(iKey=='SpecMemo') {
                  this.showDetail[iKey] = res.data.Memo
                } else {
                  this.showDetail[iKey] = res.data[iKey]
                }
              }
            } else {
              this.chMsgbar({ success: false, msg: '該單位已有庫存，請使用修改功能修改庫存' })
              this.sendDisabled = true
            }
          }).catch( err => {
            this.chMsgbar({ success: false, msg: '伺服器發生問題，查詢失敗' })
            this.sendDisabled = true
          })
        } else {
          this.chMsgbar({ success: false, msg: '查無規格資料，請先新增料件規格' })  
          this.sendDisabled = true
        }
      }).catch(err=>{
        console.error(err)
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料查詢失敗' })
        this.sendDisabled = true
      })
      this.dialogShow = false
      this.componentKey += 1
    },
    close() {
      this.$emit('close')
    },
    save() {
      if(this.materDetail.DepartCode == ''){
        alert("請選擇單位")
        return
      }
      const that = this
      if(Object.values(this.necCheck).every(e=>!e)){
        this.$emit('save',that.materDetail)
        this.$emit('close')
      } else {
        this.chMsgbar({ success: false, msg: '欄位未填寫完成，請完成填寫後再送出' })
      }
    },
    //看照片
    goViewPic(picPath) {
      this.PicView.src = picPath
      this.PicView.key ++
      this.PicView.show = true
    },
  },
  filters: {
    getType: function(value){
      return value=='edit'?'編輯':'新增'
    }
  },
  watch: {
    materCode: function() {
      this.getDetail(this.materCode)
    }
  },
  
  created() {},
};
</script>