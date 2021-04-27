<template>
  <div class="px-6 py-4">
    <v-row>
      <!-- 檢查項目 -->
      <v-col cols="12">
        <v-row no-gutter class="label-header"  
          ref="form"
          v-model="valid"
          lazy-validation>
          <v-col cols="12">
            <h3 class="mb-1">設備標示編號<span class="red--text">*</span></h3>
            <v-text-field solo value v-model="detailItems.MaintainCodeName" @focus="openDialog" :rules="[v => (!!v && /[^\s]/.test(v) && !(/---/.test(v))) || '項目請勿空白']"/> 
          </v-col>
          <v-col cols="12">
            <h3 class="mb-1">設備名稱<span class="red--text">*</span></h3>
            <v-text-field solo v-model="detailItems.EqipName" :rules="[v => (!!v && /[^\s]/.test(v)) || '項目請勿空白']" />
          </v-col>
          <v-col cols="12">
            <h3 class="mb-1">設備功能描述<span class="red--text">*</span></h3>
            <v-text-field solo v-model="detailItems.Description"  :rules="[v => (!!v && /[^\s]/.test(v)) || '項目請勿空白']"/>
          </v-col>
          <v-col cols="12" md="6">
            <h3 class="mb-1">型號<span class="red--text">*</span></h3>
            <v-text-field solo v-model="detailItems.Type"  :rules="[v => (!!v && /[^\s]/.test(v)) || '項目請勿空白']"/>
          </v-col>
          <v-col cols="12" md="6">
            <h3 class="mb-1">版本<span class="red--text">*</span></h3>
            <v-text-field solo v-model="detailItems.Ver"  :rules="[v => (!!v && /[^\s]/.test(v)) || '項目請勿空白']"/>
          </v-col>
          <v-col cols="12" md="6">
            <h3 class="mb-1">製造商<span class="red--text">*</span></h3>
            <v-text-field solo v-model="detailItems.Company"  :rules="[v => (!!v && /[^\s]/.test(v)) || '項目請勿空白']"/>
          </v-col>
          <v-col cols="12" md="6">
            <h3 class="mb-1">供應商<span class="red--text">*</span></h3>
            <v-text-field solo v-model="detailItems.Supplier" :rules="[v => (!!v && /[^\s]/.test(v)) || '項目請勿空白']" />
          </v-col>
          <v-col cols="12">
            <h3 class="mb-1">管理單位<span class="red--text">*</span></h3>
            <v-select 
              solo 
              hide-details 
              label="管理單位"
              v-model="detailItems.DepartCode"
              :items="departList"
              item-text="value"
              item-value="key" @change="_getOrgName($event)"
              :rules="[v => (!!v && /[^\s]/.test(v)) || '請選擇單位']"/>
          </v-col>
          <v-col cols="12">
            <h3 class="mb-1">外部維修單位</h3>
            <v-text-field solo v-model="detailItems.OutMaintainDepart"
            :rules="[v => (!!v && /[^\s]/.test(v)) || '項目請勿空白']" />
          </v-col>
          <!-- <v-col cols="12" sm="4">
            <h3 class="mb-1">外部維修單位</h3>
            <v-text-field solo />
          </v-col> -->
          <v-col cols="12">
            <h3 class="mb-1">上傳照片</h3>
            <v-file-input solo multiple show-size truncate-length="15" />
          </v-col>
          <v-col cols="12">
            <h3 class="mb-1">上傳技術文件</h3>
            <v-file-input solo multiple show-size truncate-length="15" />
          </v-col>
        </v-row>
        <!--選擇設備標示編號-->
        <v-dialog v-model="showMaintainCode" max-width="450px">
          <v-card class="theme-card">
            <v-card-title class="white--text px-4 py-1">
              <v-spacer></v-spacer>
              <v-btn dark fab small text @click="showMaintainCode=false" class="mr-n2">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-col cols="12" class="label-header">
              <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-codepen</v-icon>設備標示編號
              </h3>

              <p class="pl-8 mb-0">
                
              </p>                  
            </v-col>
            <equipRepairObject :toLv="toLv" :nowEqCode="nowEqCode" @getEqCode="_getNewEqCode" @getEqName="_getNewEqName" :key="componentKey"></equipRepairObject>
            <v-card-actions class="px-5 pb-5">
              <v-spacer></v-spacer>
              <v-btn class="mr-2 btn-close white--text" elevation="4" @click="showMaintainCode=false">取消</v-btn>
              <v-btn class="btn-add white--text" elevation="4" @click="selectMainCode">選擇</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <!-- END 檢查項目 -->
    </v-row>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { fetchOrganization } from '@/apis/organization'
import { createWorkOrder, fetchEqCodeLv1, fetchEqCodeLv2, fetchEqCodeLv3, fetchEqCodeLv4, fetchWorkOrderOne, updateListOrder } from '@/apis/workList/maintain'
import equipRepairObject from '@/components/EquipRepairCode'
export default {
  props: {
    detailItems: Object,
  }
  ,
  data: () => ({
    valid: true,  // 表單是否驗證欄位
    departList: [], //單位清單
    updateData:{
      StatusPic: 'N',
    },
    showMaintainCode: false,
    ifLv5: false,
    newEqCode: '',
    newEqName: '',
    toLv: 4,
    componentKey: 0,
    nowEqCode: '',
  }),
  mounted: function() {
    //抓單位
    this._getOrg()
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
    //抓單位清單
    _getOrg(){
      const that = this
      fetchOrganization().then(res => {
        if (res.data.ErrorCode == 0) {
          that.departList = res.data.user_depart_list_group_1.map((item) => {
            return {key:item.DepartCode,value:item.DepartName}
          })
        }else {
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          that.$router.push({ path: '/error' })
        }
      }).catch( err => {
        this.chMsgbar({ success: false, msg: '伺服器發生問題，單位查詢失敗' })
      })
    },
    //反查單位名稱
    _getOrgName(deptCode){
      const that = this
      this.detailItems.DepartName = this.departList[this.departList.findIndex((ele) => ele.key === that.detailItems.DepartCode)].value
    },
    //回寫設備顯示編號
    selectMainCode() {
      this.showMaintainCode=false
      this.detailItems.MaintainCode = this.newEqCode
      this.detailItems.MaintainCodeName = this.newEqName
      this.componentKey += 1
    },
    _getNewEqCode(newCode) {
      this.newEqCode = newCode
    },
    _getNewEqName(newName) {
      this.newEqName = newName
    },
    openDialog() {
      this.componentKey += 1
      this.nowEqCode = this.detailItems.MaintainCode
      this.showMaintainCode=true
    }
  },
  filters: {
    
  },
  watch: {
    
  },
  created() {},
};
</script>