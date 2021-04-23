<template>
  <v-card class="theme-card">
    <v-card-title class="white--text px-4 py-1 label-title">
      {{DType|getType}}料件
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
              <h3 class="mb-1">監工區(廠/庫)</h3>
              <v-text-field solo v-model="materDetail.Position" />
            </v-col>
            <v-col cols="12" sm="6">
              <h3 class="mb-1">班別(組)</h3>
              <v-text-field solo v-model="materDetail.Group"  />
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1">材料編號</h3>
              <v-text-field solo v-model="materDetail.Material"  @focus="dialogShow = true" :disabled="DType=='edit'"/>
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1">材料名稱</h3>
              <v-text-field solo v-model="materDetail.MaterialName"  />
            </v-col>
            <v-col cols="12" sm="6">
              <h3 class="mb-1">單位</h3>
              <v-text-field solo v-model="materDetail.Dept"  />
            </v-col>
            <v-col cols="12" sm="6">
              <h3 class="mb-1">單價</h3>
              <v-text-field type="number" min="0" solo v-model="materDetail.UnitPrice"  />
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1">規範</h3>
              <v-textarea solo v-model="materDetail.Specification"  />
            </v-col>            
            <v-col cols="12" sm="4">
              <h3 class="mb-1">上月結存數量</h3>
              <v-text-field type="number" min="0" solo v-model="materDetail.LastBalance"  />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">安全庫存數量</h3>
              <v-text-field type="number" min="0" solo v-model="materDetail.Stock"  />
            </v-col>
            <v-col cols="0" sm="4"></v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">本月實收數量</h3>
              <v-text-field type="number" min="0" solo v-model="materDetail.Paid"  />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">本月領用數量</h3>
              <v-text-field type="number" min="0" solo v-model="materDetail.Receiving"  />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">本月結存數量</h3>
              <v-text-field type="number" min="0" solo v-model="materDetail.Balance"  />
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1">備註</h3>
              <v-textarea solo v-model="materDetail.Remarks"  />
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
          @getEqName="_getEqName"
          @getWorkName="_getWorkName"
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
      <v-btn class="btn-add white--text" elevation="4" @click="save">送出</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime,encodeObject,decodeObject } from '@/assets/js/commonFun'
import { materialQuery } from '@/apis/materialManage/material'
import equipRepairObject from '@/components/EquipRepairCode'
export default {
  props: {
    materCode: String,
    DType: String,
  }
  ,
  data: () => ({
    materDetail:{},
    dialogShow:false,
    dialogToLv: 5,
    iconNeeded: false,
    lvDisable: 0,
    DMaterialCode: {
      equipCode: '',
      workCode: '',
      equipName: '',
      workName: ''
    },
    tempMaterialCode: {
      equipCode: '',
      workCode: '',
      equipName: '',
      workName: ''
    },
    componentKey: 0,
  }),
  mounted: function() {
    this.getDetail(this.materCode)
  },
  components: {
   equipRepairObject
  },
  computed: {
    ...mapState ('user', {
      userData: state => state.userData,  // 使用者基本資料
    }),
    LMaterialCode: {
      get () {
        //this.materDetail.Material = this.DMaterialCode.equipCode + '-' + this.DMaterialCode.workCode
        return this.DMaterialCode.equipCode + '-' + this.DMaterialCode.workCode

      },
      set (value) {
        let valArr = value.split('-')
        this.DMaterialCode.equipCode = valArr[0] +'-' + valArr[1] +'-' + valArr[2] +'-' + valArr[3]
        this.DMaterialCode.workCode = valArr[4]
      }
    },
    LCEquipCode: {
      get () {
        let valArr = this.LMaterialCode.split('-')
        if(valArr.length == 5){
          this.DMaterialCode.equipCode = valArr[0] +'-' + valArr[1] +'-' + valArr[2] +'-' + valArr[3]
          return valArr[0] +'-' + valArr[1] +'-' + valArr[2] +'-' + valArr[3]
        }else{
          return ''
        }
      },
      set (value) {
        this.LMaterialCode = value + '-' + this.DMaterialCode.workCode
      }
    },
    LCWorkCode: {
      get () {
        let valArr = this.LMaterialCode.split('-')
        if(valArr.length == 5){
          this.DMaterialCode.workCode = valArr[4]
        return valArr[4]
        }else{
          return ''
        }
      },
      set (value) {
        this.LMaterialCode = this.DMaterialCode.equipCode + '-' + value
      }
    }
  },
  methods: {
    ...mapActions('system', [
      'chMsgbar',  // messageBar
      'chLoadingShow'  // 切換 loading 圖顯示
    ]),
    //詳細查詢
    getDetail(matCode) {
      const that = this
      if(that.materCode != ''){
        that.chLoadingShow()
        materialQuery({
          MaterialCode: matCode,  
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id
        }).then(res => {
          if (res.data.ErrorCode == 0) {
            that.materDetail.Position = res.data.Supervision
            that.materDetail.Group = res.data.ClassGroup
            that.materDetail.Material = res.data.MaterialCodeName
            that.LMaterialCode = res.data.MaterialCode
            that.materDetail.Specification = res.data.Specification
            that.materDetail.MaterialName = res.data.MaterialName
            that.materDetail.Dept = res.data.Unit
            that.materDetail.LastBalance = res.data.LastMonthAmount
            that.materDetail.Paid = res.data.MonthAmountRcv
            that.materDetail.Receiving = res.data.MonthAmountGet
            that.materDetail.Balance = res.data.Amount
            that.materDetail.Stock = res.data.SaftyAmount
            that.materDetail.UnitPrice = res.data.Price
            that.materDetail.Remarks = res.data.Memo
            
          } else {
            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
            that.$router.push({ path: '/error' })
          }
        }).catch( err => {
          that.chMsgbar({ success: false, msg: '伺服器發生問題，查詢失敗' })
        }).finally(() => {
          that.chLoadingShow()
          that.materDetail = decodeObject(that.materDetail)
          this.contentShow = true;
        })
      }else{
        that.materDetail = {
          Position: '',
          Group: '',
          Material: '',
          Specification: '',
          MaterialName: '',
          Dept: '',
          LastBalance: '0',
          Paid: '0',
          Receiving: '0',
          Balance: '0',
          Stock: '0',
          UnitPrice: '0',
          Remarks: '',
        }
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
      this.DMaterialCode.equipName = this.tempMaterialCode.equipName
      this.DMaterialCode.workName = this.tempMaterialCode.workName
      this.materDetail.Material = this.tempMaterialCode.equipName + '-' + this.tempMaterialCode.workName
      this.dialogShow = false
      this.componentKey += 1
    },
    close() {
      this.$emit('close')
    },
    save() {
      let rtnObj = {}
      const that = this
      rtnObj.Supervision = that.materDetail.Position
      rtnObj.ClassGroup = that.materDetail.Group
      rtnObj.MaterialCode = that.LMaterialCode
      rtnObj.MaterialCodeName = that.materDetail.Material
      rtnObj.Specification = that.materDetail.Specification
      rtnObj.MaterialName = that.materDetail.MaterialName
      rtnObj.Unit = that.materDetail.Dept
      rtnObj.LastMonthAmount = that.materDetail.LastBalance
      rtnObj.MonthAmountRcv = that.materDetail.Paid
      rtnObj.MonthAmountGet = that.materDetail.Receiving
      rtnObj.Amount = that.materDetail.Balance
      rtnObj.SaftyAmount = that.materDetail.Stock
      rtnObj.Price = that.materDetail.UnitPrice
      rtnObj.Memo = that.materDetail.Remarks
      this.$emit('save',rtnObj)
      this.$emit('close')
    }
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