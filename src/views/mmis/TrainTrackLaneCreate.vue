<template>
  <div class="px-6 py-4">
    <v-row>
      <!-- 檢查項目 -->
      <v-col cols="12">
        <v-row no-gutter class="indigo--text"  
          ref="form"
          v-model="valid"
          lazy-validation>
          <v-col cols="12">
            <h3 class="mb-1">設備標示編號<span class="red--text">*</span></h3>
            <v-text-field solo value v-model="detailItems.MaintainCode" @focus="initData()" :rules="[v => (!!v && /[^\s]/.test(v) && !(/---/.test(v))) || '項目請勿空白']"/> 
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
            <h3 class="mb-1">維修單位<span class="red--text">*</span></h3>
            <v-select 
              solo 
              hide-details 
              v-model="detailItems.DepartCode"
              :items="departList"
              item-text="value"
              item-value="key" @change="_getOrgName($event)"
              :rules="[v => (!!v && /[^\s]/.test(v)) || '請選擇單位']"/>
          </v-col>
          <v-col cols="12">
            <h3 class="mb-1">外部維修單位<span class="red--text">*</span></h3>
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
          <v-card>
            <v-card-title class="blue white--text px-4 py-1">
              <v-spacer></v-spacer>
              <v-btn dark fab small text @click="showMaintainCode=false" class="mr-n2">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-row class="px-2 mb-6">
              <v-col cols="12">
                <h3 class="mb-1">
                  <v-icon class="mr-1 mb-1">mdi-codepen</v-icon>設備標示編號
                </h3>

                <p class="pl-8 mb-0">
                  <label v-if="canModifyEqCode">{{ ipt.eqNumber1 }}-{{ `${ipt.eqNumber2}${ipt.eqNumber22}` }}-{{ `${ipt.eqNumber3}${ipt.eqNumber32}` }}-{{ ipt.eqNumber4 }}</label>
                  <label v-else>{{detailItems.MaintainCode}}</label>
                  <v-btn
                      class="ml-3 mb-1"
                      color="primary"
                      @click="editEqCode"
                      v-show="!canModifyEqCode"
                  >編輯</v-btn>
                </p>                  
              </v-col>

              <v-col cols="12" class="mt-n4">
                <v-row>
                  <v-col cols="12" align-self="center">
                    <h3 class="ml-md-6">系統</h3>
                  </v-col>
                  <v-col cols="12">
                    <v-select solo hide-details
                        v-model="ipt.eqNumber1"
                        :items="eqCodes.opt1"
                        :background-color="errorIpt.eqNumber1"
                        :disabled="!canModifyEqCode"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="12">
                <v-row>
                  <v-col cols="12" align-self="center">
                    <h3 class="ml-md-6">位置</h3>
                  </v-col>
                  <v-col cols="12">
                    <v-select solo hide-details
                        v-model="ipt.eqNumber2"
                        :items="eqCodes.opt2"
                        :background-color="errorIpt.eqNumber2"
                        :disabled="disableLv2&&!canModifyEqCode"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" v-if="subIptShow.opt22">
                    <v-select solo hide-details
                        v-model="ipt.eqNumber22"
                        :items="eqCodes.opt22"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="12">
                <v-row>
                  <v-col cols="12" align-self="center">
                    <h3 class="ml-md-6">設備</h3>
                  </v-col>
                  <v-col cols="12">
                    <v-select solo hide-details
                        v-model="ipt.eqNumber3"
                        :items="eqCodes.opt3"
                        :background-color="errorIpt.eqNumber3"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" v-if="subIptShow.opt32">
                    <v-select solo hide-details
                        v-model="ipt.eqNumber32"
                        :items="eqCodes.opt32"
                        :disabled="disableLv3&&!canModifyEqCode"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="12">
                <v-row>
                  <v-col cols="12" align-self="center">
                    <h3 class="ml-md-6">序號</h3>
                  </v-col>
                  <v-col cols="12">
                    <v-select solo hide-details
                        v-model="ipt.eqNumber4"
                        :items="eqCodes.opt4"
                        :background-color="errorIpt.eqNumber4"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-card-actions class="px-5 pb-5">
              <v-spacer></v-spacer>
              <v-btn class="mr-2" elevation="4" @click="showMaintainCode=false">取消</v-btn>
              <v-btn color="success" elevation="4" :disabled="!canModifyEqCode" @click="selectMainCode">選擇</v-btn>
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
export default {
  props: {
    detailItems: Object,
  }
  ,
  data: () => ({
    valid: true,  // 表單是否驗證欄位
    departList: [], //單位清單
    showMaintainCode: false, //設備顯示編號小視窗
    eqCodes: {
      opt1: [],  // 設備標示編號下拉選單-第1組
      opt2: [],  // 設備標示編號下拉選單-第2組
      opt22: [],  // 設備標示編號下拉選單-第2組-2
      opt3: [],  // 設備標示編號下拉選單-第3組
      opt32: [],  // 設備標示編號下拉選單-第3組-2
      opt4: [],  // 設備標示編號下拉選單-第4組
    },
    // 設備標示編號下拉選單是否禁用
    disableLv2: true,
    disableLv3: true,
    disableLv4: true,
    resOptData: {  // 設備標示編號請求回來的資料
      opt2: [],  // 第2組
      opt3: [],  // 第3組
    },
    subIptShow: {  // 設備標示編號的子選項欄位是否顯示
      opt22: false,  // 第2組-2
      opt32: false,  // 第3組-2
    },
    ipt: {  // 輸入的內容)
      eqNumber1: '',  // 設備標示編號1
      eqNumber2: '',  // 設備標示編號2
      eqNumber22: '',  // 設備標示編號2-2
      eqNumber3: '',  // 設備標示編號3
      eqNumber32: '',  // 設備標示編號3-2
      eqNumber4: '',  // 設備標示編號4
    },
    errorIpt: {  // 必填欄位背景色
      dispatchID: '', // 派工人
      eqNumber1: '',  // 設備標示編號1
      eqNumber2: '',  // 設備標示編號2
      eqNumber3: '',  // 設備標示編號3
      eqNumber4: '',  // 設備標示編號4
      malfunctionDes: '',  // 故障描述
    },
    canModifyEqCode: false,  // 是否能選擇設備標示編號下拉選單
    updateData:{
      StatusPic: 'N',
    }
  }),
  mounted: function() {
    //抓單位
    this._getOrg()
  },
  components: {
    
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
    // 初始化設備標示編號
    // codeArr: 後端傳的報修碼陣列, opt: 要設定在哪一組下拉選單(op1~4)
    setEqCodeOption(codeArr, opt) {
        this.eqCodes[opt] = codeArr.map(item => {
            return {
                text: item.CodeDescript,
                value: item.DeviceCode
            }
        })
    },
    // 向後端請求設備標示編號
    // 參數說明：val => 上層所選的值, lv => 要向後端取得的層數 (2~4)
    async fetchEqCodes(val, lv, parentVal='', subVal='') {
      this.chLoadingShow()
      let codeRes = {}
      switch(lv) {
        case 2:
          codeRes = await fetchEqCodeLv2({ ClientDeviceCode: val, ClientReqTime: getNowFullTime() })
          this.resOptData.opt2 = codeRes.data.device_query
          break
        case 3:
          codeRes = await fetchEqCodeLv3({
            ClientDeviceCode: val,  // 位置
            ClientDeviceCodeParent: parentVal,  // 位置父code
            ClientDeviceCodeChild: subVal,  // 位置子項目
            ClientReqTime: getNowFullTime() 
          })
          this.resOptData.opt3 = codeRes.data.device_query
          break
        case 4:
          codeRes = await fetchEqCodeLv4({
            ClientDeviceCode: val,  // 設備
            ClientDeviceCodeChildParent: val,  // 設備
            ClientDeviceCodeChild: subVal,  // 設備子項目
            ClientDeviceCodeParent: parentVal,  // 設備父code
            ClientReqTime: getNowFullTime()
          })
          break
        default:
          break
      }
      
      this.setEqCodeOption(codeRes.data.device_query, 'opt'+ lv)
      this.chLoadingShow()
    },
    //重新編輯設備顯示編號
    editEqCode() {
      if (confirm('編輯設備標示編號會需要重新選擇，你確定嗎?')) {
        this.ipt.eqNumber1 = this.ipt.eqNumber2 = this.ipt.eqNumber22 = this.ipt.eqNumber3 = this.ipt.eqNumber32 = this.ipt.eqNumber4 = ''
        this.canModifyEqCode = true
      }
    },
    //初始化設備顯示編號選項
    async initData() {
      this.chLoadingShow()
      if(this.detailItems.FlowId == -1 && (this.detailItems.MaintainCode == "" || this.detailItems.MaintainCode == "---")) {
        this.canModifyEqCode = true
      }else {
        this.canModifyEqCode = false
      }
      this.eqCodes= {
        opt1: [],  // 設備標示編號下拉選單-第1組
        opt2: [],  // 設備標示編號下拉選單-第2組
        opt22: [],  // 設備標示編號下拉選單-第2組-2
        opt3: [],  // 設備標示編號下拉選單-第3組
        opt32: [],  // 設備標示編號下拉選單-第3組-2
        opt4: [],  // 設備標示編號下拉選單-第4組
      },
      this.ipt= {  // 輸入的內容)
        eqNumber1: '',  // 設備標示編號1
        eqNumber2: '',  // 設備標示編號2
        eqNumber22: '',  // 設備標示編號2-2
        eqNumber3: '',  // 設備標示編號3
        eqNumber32: '',  // 設備標示編號3-2
        eqNumber4: '',  // 設備標示編號4
      }
      //this.initFetchData()  // 判斷新增或編輯
      try {
        let codeRes = await fetchEqCodeLv1({ ClientReqTime: getNowFullTime() }).finally(() => this.showMaintainCode=true)  // 取得設備標示編號
        this.setEqCodeOption(codeRes.data.device_query, 'opt1')  // 初始化設備標示編號第一組檢修碼下拉選單
      } catch (err) {
        alert('設備報修資料取得失敗')
      }
      this.chLoadingShow()
    },
    //回寫設備顯示編號
    selectMainCode() {
      this.showMaintainCode=false
      this.detailItems.MaintainCode = this.ipt.eqNumber1+'-'+this.ipt.eqNumber2+this.ipt.eqNumber22+'-'+this.ipt.eqNumber3+this.ipt.eqNumber32+'-'+this.ipt.eqNumber4
    },
  },
  filters: {
    
  },
  watch: {
    // ------- 切換選項時，向後端抓下一層的報修碼 --------
    // 系統
    'ipt.eqNumber1': function(newVal) {
      if (this.canModifyEqCode) {  // 若能選擇設備標示編號下拉選單
        if (newVal != '') {
          this.ipt.eqNumber2 = this.ipt.eqNumber22 = this.ipt.eqNumber3 = this.ipt.eqNumber32 = this.ipt.eqNumber4 = ''
          this.subIptShow.opt22 = this.subIptShow.opt32 = false
          this.disableLv2 = false
          this.disableLv3 = this.disableLv4 = true
          this.fetchEqCodes(newVal, 2)
        }
      }
    },
    // 位置
    'ipt.eqNumber2': function(newVal) {
      if (this.canModifyEqCode) {  // 若能選擇設備標示編號下拉選單
        if (newVal != '') {
          let obj = this.resOptData.opt2.find(item => item.DeviceCode == newVal)
          
          this.ipt.eqNumber22 = this.ipt.eqNumber3 = this.ipt.eqNumber4 = ''
          this.subIptShow.opt32 = false
          this.disableLv3 = false
          this.disableLv4 = true
          this.fetchEqCodes(newVal, 3, obj.DeviceCodeParent)

          // 若第二層有子項目
          if (obj.device_query_child.length > 0) {
            this.setEqCodeOption(obj.device_query_child, 'opt22')
            this.subIptShow.opt22 = true
          } else {
            this.ipt.eqNumber22 = ''
            this.subIptShow.opt22 = false
          }
        }
      }
    },
    // 位置子項目
    'ipt.eqNumber22': function(newVal) {
      if (this.canModifyEqCode) {  // 若能選擇設備標示編號下拉選單
        if (newVal != '') {
          let obj = this.resOptData.opt2.find(item => item.DeviceCode == this.ipt.eqNumber2)
          
          this.ipt.eqNumber3 = this.ipt.eqNumber32 = this.ipt.eqNumber4 = ''
          this.disableLv3 = false
          this.disableLv4 = true
          this.fetchEqCodes(this.ipt.eqNumber2, 3, obj.DeviceCodeParent, newVal)
        }
      }
    },
    // 設備
    'ipt.eqNumber3': function(newVal) {
      if (this.canModifyEqCode) {  // 若能選擇設備標示編號下拉選單
        if (newVal != '') {
          let obj = this.resOptData.opt3.find(item => item.DeviceCode == newVal)
          
          this.ipt.eqNumber32 = this.ipt.eqNumber4 = ''
          this.disableLv4 = false
          this.fetchEqCodes(newVal, 4, obj.DeviceCodeParent)

          // 若第二層有子項目
          if (obj.device_query_child.length > 0) {
              this.setEqCodeOption(obj.device_query_child, 'opt32')
              this.subIptShow.opt32 = true
          } else {
              this.ipt.eqNumber32 = ''
              this.subIptShow.opt32 = false
          }
        }
      }
    },
    // 設備子項目
    'ipt.eqNumber32': function(newVal) {
      if (this.canModifyEqCode) {  // 若能選擇設備標示編號下拉選單
        if (newVal != '') {
          let obj = this.resOptData.opt3.find(item => item.DeviceCode == this.ipt.eqNumber3)

          this.ipt.eqNumber4 = ''
          this.disableLv4 = false
          this.fetchEqCodes(this.ipt.eqNumber3, 4, obj.DeviceCodeParent, newVal)
        }
      }
    },
  },
  created() {},
};
</script>