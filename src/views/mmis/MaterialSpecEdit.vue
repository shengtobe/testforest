<template>
  <v-card class="theme-card">
    <v-card-title class="white--text px-4 py-1 label-title">
      {{DType|getType}}料件規格
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
            <v-col cols="12">
              <h3 class="mb-1">材料編號</h3>
              <v-text-field solo v-model="materDetail.MaterialCode"  @click="showDialog" :disabled="DType=='edit'"/>
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1">材料名稱</h3>
              <v-text-field solo v-model="materDetail.MaterialName"  />
            </v-col>
            <v-col cols="12" sm="6">
              <h3 class="mb-1">單位</h3>
              <v-text-field solo v-model="materDetail.Unit"  />
            </v-col>
            <v-col cols="12" sm="6">
              <h3 class="mb-1">單價</h3>
              <v-text-field solo v-model="materDetail.Price" suffix="元"/>
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1">規範</h3>
              <v-textarea solo v-model="materDetail.Specification"  />
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
          :key="componentKey"/>
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
import { materialSpecQuery } from '@/apis/materialManage/material'
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
    componentKey: 0,
    tempMaterialCode: {
      equipCode: '',
      workCode: '',
      equipName: '',
      workName: ''
    },
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
    }
  },
  methods: {
    ...mapActions('system', [
      'chMsgbar',  // messageBar
      'chLoadingShow'  // 切換 loading 圖顯示
    ]),
    showDialog() {
      this.dialogShow = true
    }, 
    //詳細查詢
    getDetail(matCode) {
      const that = this
      if(that.materCode != ''){
        that.chLoadingShow({show:true})
        materialSpecQuery({
          MaterialCode: matCode,  
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id
        }).then(res => {
          if (res.data.ErrorCode == 0) {
            that.materDetail.MaterialCode = res.data.MaterialCode
            that.materDetail.MaterialCodeName = res.data.MaterialCodeName
            that.materDetail.Specification = res.data.Specification
            that.materDetail.MaterialName = res.data.MaterialName
            that.materDetail.Unit = res.data.Unit
            that.materDetail.Price = res.data.Price
            that.materDetail.Memo = res.data.Memo
          } else {
            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
            that.$router.push({ path: '/error' })
          }
        }).catch( err => {
          that.chMsgbar({ success: false, msg: '伺服器發生問題，查詢失敗' })
        }).finally(() => {
          that.chLoadingShow({show:false})
          that.materDetail = decodeObject(that.materDetail)
          this.contentShow = true;
        })
      }else{
        that.materDetail = {
          MaterialCode: '',
          MaterialCodeName: '',
          Specification: '',
          MaterialName: '',
          Unit: '',
          Price: '0',
          Memo: '',
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
      this.materDetail.MaterialCodeName = this.tempMaterialCode.equipName + '-' + this.tempMaterialCode.workName
      this.dialogShow = false
      this.componentKey += 1
    },
    close() {
      this.$emit('close')
    },
    save() {
      this.$emit('save',this.materDetail)
      this.$emit('close')
    }
  },
  filters: {
    getType: function(value){
      return value=='edit'?'編輯':'新增'
    }
  },
  watch: {
    // materCode: function() {
    //   this.getDetail(this.materCode)
    // },
    "materDetail.Price": function(newValue,oldValue) {
      if(/^0[.]\d*$/.test(newValue)) {
        //
      } else if(/^\d*$/.test(newValue)) {
         if(/^0\d+$/.test(newValue)) {
          this.materDetail.Price = this.materDetail.Price.slice(1)
        }
      } else {
        this.$nextTick(() => {
          this.materDetail.Price = oldValue
        })
      }
    }
  },
  created() {},
};
</script>