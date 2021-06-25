<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2 label-title">{{ title }}</h2>
    <v-row class="px-2 label-header">
      <!-- 第一排選項 -->
      <v-col cols="12" sm="2" md="3">
        <dateSelect
          label="檢查日期(起)"
          key="dateStart"
          :showIcon="formData.settings.formIconShow"
          v-model="formData.searchItem.dateStart"
        />
      </v-col>
      <v-col cols="12" sm="2" md="3">
        <dateSelect
          label="檢查日期(迄)"
          key="dateEnd"
          :showIcon="formData.settings.formIconShow"
          v-model="formData.searchItem.dateEnd"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <deptSelect
          label="選擇部門"
          v-model="formData.searchItem.department"
          :showIcon="formData.settings.formIconShow"
          outType="key"
          key="department"
        />
      </v-col>
      <!-- <v-col cols="12" sm="2" md="2">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>員工姓名
        </h3>
        <v-text-field solo />
      </v-col>
      <v-col cols="12" sm="2" md="2">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>觀察人員姓名
        </h3>
        <v-text-field solo />
      </v-col> -->
      <v-col cols="12" sm="2" md="2" class="d-flex align-end">
        <!-- <v-btn color="green" dark large class="mb-sm-8 mb-md-8">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn> -->
      </v-col>
      <!-- <v-col cols="12" sm="3" md="3">
        <v-form ref="uploadform">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-file</v-icon>檔案上傳
          </h3>
          <v-text-field solo placeholder="點此選擇檔案" />
        </v-form>
      </v-col> -->
      <!-- <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn color="pink" dark large class="mb-sm-8 mb-md-8">
          <v-icon class="mr-1">mdi-cloud-upload</v-icon>上傳
        </v-btn>
        <v-btn
          color="indigo"
          elevation="3"
          dark
          large
          class="ml-4 ml-sm-4 ml-md-4 mb-sm-8 mb-md-8"
          @click="newOne"
        >
          <v-icon>mdi-plus</v-icon>新增檢點表
        </v-btn>
      </v-col> -->

      <v-dialog v-model="dialogDel" persistent max-width="290">
        <v-card class="theme-del-card">
          <v-card-title class="white--text px-4 py-1 headline">確認是否刪除?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="btn-close white--text" @click="close">取消</v-btn>
            <v-btn class="btn-delete white--text">刪除</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <ToolBar @search="search" @reset="reset" @newOne="newOne" :text="newText" />
      <!-- 動力車保養紀錄 -->
      <v-col cols="12" sm="12" md="12">
        <v-data-table
          :headers="headers"
          :items="tableItems"
          :options.sync="pageOpt"
          disable-sort
          disable-filtering
          hide-default-footer
          class="theme-table"
        >
          <template v-slot:no-data>
            <span class="red--text subtitle-1">沒有資料</span>
          </template>

          <template v-slot:loading>
            <span class="red--text subtitle-1">資料讀取中...</span>
          </template>

          <!-- headers 的 content 欄位 (檢視內容) -->
          <template v-slot:item.content="{ item }">
            <v-btn
              title="詳細資料"
              class="mr-2 btn-memo"
              small
              dark
              fab
              @click="viewPage(item)"
            >
              <v-icon dark>mdi-pen</v-icon>
            </v-btn>
            <v-btn
              title="刪除"
              small
              dark
              fab
              class="btn-delete"
              @click="deleteRecord(item.RPFlowNo)"
            >
              <v-icon dark>mdi-delete</v-icon>
            </v-btn>
          </template>

          <!-- 頁碼 -->
          <template v-slot:footer="footer">
            <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
          </template>
        </v-data-table>
      </v-col>
      <!-- 刪除確認視窗 -->
    <v-dialog v-model="dialogDel" persistent max-width="290">
      <dialogDelete
        :id="userData.UserId"
        :DB_Table="DB_Table"
        :RPFlowNo="RPFlowNo"
        :key="'d' + DelDynamicKey"
        @search="search"
        @close="close"
        @cancel="closeDialogDel"
      />
    </v-dialog>
      <!-- 新增保養資料 modal -->
      <v-dialog v-model="Add" persistent max-width="800px">
        <v-card class="theme-card">
          <!-- 標題 -->
          <v-card-title class="white--text px-4 py-1">
            新增員工工作安全觀察表(每月2 次)
            <v-spacer />
            <v-btn dark fab small text @click="close" class="mr-n2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <!-- 內容 -->
          <div class="px-6 py-4 label-header">
            <v-row>
              <v-col cols="12">
                <p>1.本查核紀錄表每月至少觀察2人</p>
                <p>2.本表於月底前完成查核，經主管核章後，留存於管理單位之系統保存備查。</p>
              </v-col>
              <v-col cols="12" sm="4">
                <h3 class="mb-1">觀察日期</h3>
                <v-menu
                  v-model="dialogDateMenuShow.enters"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field hide-details v-on="on" solo v-model="zs"/>
                  </template>
                  <v-date-picker
                    color="primary"
                    v-model="zs"
                    @input="dialogDateMenuShow.enters = false"
                    locale="zh-tw"
                  />
                </v-menu>
              </v-col>
              <v-col cols="12" sm="4"/>
              <v-col cols="12" sm="4"/>
              
              <v-col cols="8" sm="4">
                <deptSelect
                  label="所屬單位"
                  v-model="EmpDepartCode"
                  outType="key"
                  key="department"
                />
              </v-col>
              <v-col cols="8" sm="4">
                <h3 class="mb-1">職稱</h3>
                <v-text-field v-model="JobName" required solo />
              </v-col>

              <v-col cols="8" sm="4">
                <h3 class="mb-1">員工姓名</h3>
                <v-text-field v-model="EmpName" solo />
              </v-col>
              <v-col cols="8" sm="4">
                <h3 class="mb-1">任現職年資</h3>
                <v-text-field v-model="EmployeeYears" solo />
              </v-col>
              <v-col cols="8" sm="4">
                <h3 class="mb-1">工作名稱</h3>
                <v-text-field v-model="JobDesp" solo />
              </v-col>
              <v-col cols="10">
                <h3 class="mb-1">接受安全觀察之情況</h3>
                <v-row class="ml-1" style="justify-content: left;">
                  <v-checkbox class="mr-3" v-model="CheckOption1" false-value="2" true-value="1" label="計畫安全觀察之員工"/>
                  <v-checkbox class="mr-3" v-model="CheckOption2" false-value="2" true-value="1" label="常不注意安全肇生事故者" value="B" />
                  <v-checkbox class="mr-3" v-model="CheckOption3" false-value="2" true-value="1" label="生病或不到工後恢復工作者" value="C" />
                  <v-checkbox class="mr-3" v-model="CheckOption4" false-value="2" true-value="1" label="調換工作者" value="D" />
                  <v-checkbox class="mr-3" v-model="CheckOption5" false-value="2" true-value="1" label="無經驗者" value="E" />
                  <v-checkbox class="mr-3" v-model="CheckOption6" false-value="2" true-value="1" label="身體或心智不能安全工作者" value="F" />
                  <v-checkbox class="mr-3" v-model="CheckOption7" false-value="2" true-value="1" label="似經情緒擾亂有怪異行動者" value="G" />
                  <v-checkbox class="mr-3" v-model="CheckOption8" false-value="2" true-value="1" label="累遭意外者" value="H" />
                </v-row>
              </v-col>
              <v-col cols="12">
                  <h3 class="mb-1">觀察內容：（觀察此人進行工作檢討工作關鍵性安全要點、交談結果）</h3>
              </v-col>
              <v-col cols="12">
              <h3 class="mb-1">一、工作步驟是否正確？合乎標準作業程序？</h3>
              <v-textarea auto-grow outlined rows="4" v-model="CheckOption9"/>
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1">二、工作熟練程度如何？</h3>
              <v-textarea auto-grow outlined rows="4" v-model="CheckOption10"/>
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1">三、不安全動作係由何種原因所致？</h3>
              <v-textarea auto-grow outlined rows="4" v-model="CheckOption11"/>
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1">四、可能發生的意外有哪些？防止措施如何？</h3>
              <v-textarea auto-grow outlined rows="4" v-model="CheckOption12"/>
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1">五、對工作者說明或糾正要點：</h3>
              <v-textarea auto-grow outlined rows="4" v-model="CheckOption13"/>
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1">六、提請有關單位協辦事項有哪些？</h3>
              <v-textarea auto-grow outlined rows="4" v-model="CheckOption14"/>
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1">七、工作者對進行此工作的意見：</h3>
              <v-textarea auto-grow outlined rows="4" v-model="CheckOption15"/>
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1">八、其他</h3>
              <v-textarea auto-grow outlined rows="4" v-model="CheckOption16"/>
            </v-col>
            </v-row>
            <hr />
            <v-row>
                <v-col cols="12" sm="4">
                <h3 class="mb-1">觀察人員</h3>
                <v-text-field v-model="doMan.name" required solo />
              </v-col>
              <v-col cols="12" sm="4">
                <h3 class="mb-1">職安單位</h3>
                <v-select dense single-line :items="apm" outlined v-model="OccupUnit"/>
                <!-- <h3 class="mb-1">職安單位</h3>
                <v-text-field v-model="OccupUnit" required solo /> -->
              </v-col>
              <!-- <v-col cols="12" sm="4">
                <h3 class="mb-1">科長</h3>
                <v-text-field v-model="addItem.Kilometer" required solo />
              </v-col> -->
            </v-row>
          </div>
          <!-- 輸出/取消 -->
          <v-card-actions class="px-5 pb-5">
          <v-btn
            v-if="action != actions.add"
            elevation="4"
            class="mr-2 btn-delete white--text"
            @click="deleteRecord(RPFlowNo)"
            >刪除</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn class="mr-2 btn-close white--text" elevation="4" @click="close">取消</v-btn>
          <v-btn
            class="btn-add white--text"
            elevation="4"
            @click="save"
            >送出</v-btn
          >
        </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { evtTypes, locationOpts } from "@/assets/js/smisData";
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from 'vuex'
import { getNowFullTime, getTodayDateString, unique} from "@/assets/js/commonFun";
import { maintainStatusOpts } from '@/assets/js/workList'
import UploadOneFileAdd from '@/components/UploadOneFileAdd.vue';
import dateSelect from "@/components/forManage/dateSelect";
import deptSelect from "@/components/forManage/deptSelect";
import { fetchFormOrderList, fetchFormOrderOne, createFormOrder, createFormOrder0, updateFormOrder } from '@/apis/formManage/serve'
import { formDepartOptions } from '@/assets/js/departOption'
import { Actions } from "@/assets/js/actions";
import dialogDelete from "@/components/forManage/dialogDelete";
import ToolBar from "@/components/forManage/toolbar";

export default {
  data: () => ({
    title:"員工工作安全觀察表(每月2 次)",
    newText:"觀察表",
    action: Actions.add,
    actions: Actions,
    isLoading: false,
    disabled: false,
    file: null,
    Add: false,
    dialog3: false,
    ShowDetailDialog: false,
    dialogDel: false, // model off
    Add: false,
    dialog3: false,
    formData: {
      settings: {
        formIconShow: true,
      },
      searchItem: {
        dateStart: "",
        dateEnd: "",
        department: "",
      },
    },
    apm: ["綜合企劃科", "鐵路服務科", "鐵路維護科", "車輛養護科", "秘書室", "人事室", "主計室", "政風室", "修理工廠", "嘉義車庫", "阿里山車庫", "竹崎監工區", "奮起湖監工區", "阿里山監工區"],
    editType: "",
    editItem: {},
    DynamicKey: 0,
    DelDynamicKey: 0,
    aas: "",
    bbs: "",
    ccs: "",
    dds: "",
    zs: "",
    fw: "",
    formDepartOptions: [
        // 通報單位下拉選單
        { text: "不限", value: "" },
        ...formDepartOptions,
      ],
    EmpDepartCode: "", //被觀察人部門代號
    EmpDepartName: "", //被觀察人部門名稱
    JobName: "", //被觀察人職稱
    EmpID: "", //被觀察人事編號
    EmpName: "", //被觀察人員姓名
    EmployeeYears: "", //被觀察人現任年資
    JobDesp: "", //被觀察人工作名稱
    ObserDep: "", //觀察人單位名稱
    ObserID: "", //觀察人事編號
    ObserName: "", //觀察人員姓名
    OccupUnit: "", //職安單位
    CheckManID: "", //審核人事編號(科長)
    CheckMan: "", //審核人姓名(科長)
    CheckStatus: "", //審核狀態
    CheckOption1: "", //計畫安全觀察之員工
    CheckOption2: "", //常不注意安全肇生事故者
    CheckOption3: "", //生病或不到工後恢復工作者
    CheckOption4: "", //調換工作者
    CheckOption5: "", //無經驗者
    CheckOption6: "", //身體或心智不能安全工作者
    CheckOption7: "", //似經情緒擾亂有怪異行動者
    CheckOption8: "", //累遭意外者
    CheckOption9: "", //工作步驟是否正確？合乎標準作業程序？
    CheckOption10: "", //工作熟練程度如何？
    CheckOption11: "", //不安全動作係由何種原因所致？
    CheckOption12: "", //可能發生的意外有哪些？防止措施如何？
    CheckOption13: "", //對工作者說明或糾正要點
    CheckOption14: "", //提請有關單位協辦事項有哪些？
    CheckOption15: "", //工作者對進行此工作的意見：
    CheckOption16: "", //其他
    ipt: {
      dateStart: new Date().toISOString().substr(0, 10), // 通報日期(起)
      dateEnd: new Date().toISOString().substr(0, 10), // 通報日期(迄)
      case: "",
      eqLoss: ""
    },
    dateMemuShow: {
      // 日曆是否顯示
      start: false,
      end: false
    },
    evtTypeOpts: evtTypes,
    locationOpts: locationOpts,
    dateMenuShow: false, // 日曆是否顯示
    dialogDateMenuShow: {
      // dialog 日期 menu 是否顯示
      enter: false,
      enters: false,
      out: false
    },
    editedItem: {
      Kilometer: 12044.3,
      Kilometers: 12044.3,
      enterDate: "2020-08-10",
      content: "更換引擎機油", // 維修項目
      startday: "2020-08-10",
      user: "王大明"
    },
    addItem: {
      Kilometer: null,
      Kilometers: null,
      enterDate: "",
      content: "", // 維修項目
      enterDates: "",
      user: ""
    },
    defaultItem: {
      Kilometer: null,
      Kilometers: 0,
      enterDate: "2020-08-10",
      content: "", // 維修項目
      user: ""
    },
    nameRules: [
    ],
    dialogForm: {},
    mainLocation: "", // 所選的地點
    OLocation: "", // 其他地點
    dialogShowAdd: false, // model off
    dialogShowEdit: false, // model off
    dialogDel: false, // model off
    dialogm1: "2020-08-01",
    aa: "",
    bb: "",
    cc: "",
    disabled: true,
    tableItems: [], // 表格資料
    pageOpt: { page: 1 }, // 目前頁數
    //---api---
      DB_Table: "RP014",
      RPFlowNo: "",
      nowTime: "",
      doMan:{
        id: '',
        name: '',
        depart: '',
        checkManName: ''
      },
      ipt2: {},
      defaultIpt: {  // 預設的欄位值
          startDay: '',
          EndDay: '',
          depart: '',  // 單位
        },
    headers: [
        // 表格顯示的欄位 DepartCode ID Name
        { text: "項次", value: "ItemNo", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "觀察日期", value: "CheckDay", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "審查狀態", value: "CheckStatus", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "觀察人", value: "Name", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "觀察單位", value: "DepartName", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "功能", value: "content", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
      ],
  }),
  components: {
    Pagination, // 頁碼
    dateSelect,
    deptSelect,
    ToolBar,
    formDepartOptions,
    dialogDelete,
    UploadOneFileAdd
  },
  computed: {
    ...mapState ('user', {
        userData: state => state.userData,  // 使用者基本資料
    }),
  },
  created() {
      this.ipt2 = { ...this.defaultIpt }
      //更新時間
      var today=new Date();
      let mStr = today.getMonth()+1;
      let dStr = today.getDate();
      if(mStr < 10){
        mStr = '0' + mStr;
      }
      if(dStr < 10){
        dStr = '0' + dStr;
      }
      this.nowTime = today.getFullYear()+'-'+ mStr +'-'+ dStr;
      this.zs = this.df = this.nowTime
  },

  methods: {
    select(file) {
        this.file = file
    },
    // 更新資料
    update() {
      this.$emit("chLocation", {});
    },
    ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
    reset() {
      this.formData.searchItem.dateStart = "";
      this.formData.searchItem.dateEnd = "";
      this.formData.searchItem.department = "";
    },
    newOne(){
      console.log("newOne23")
      this.Add = true
      this.action = Actions.add
      console.log("this.Add: " + this.Add)
      this.initInput();
    },
    initInput(){
      console.log("init")
      this.doMan.name = this.userData.UserName;
      this.doMan.id = this.userData.UserId;
      this.zs = this.nowTime;
      this.EmpDepartCode=""
      this.EmpDepartName=""
      this.JobName=""
      this.EmpID=""
      this.EmpName=""
      this.EmployeeYears=""
      this.JobDesp=""
      this.ObserDep=""
      this.ObserID=""
      this.ObserName=""
      this.OccupUnit=""
      this.CheckOption1=""
      this.CheckOption2=""
      this.CheckOption3=""
      this.CheckOption4=""
      this.CheckOption5=""
      this.CheckOption6=""
      this.CheckOption7=""
      this.CheckOption8=""
      this.CheckOption9=""
      this.CheckOption10=""
      this.CheckOption11=""
      this.CheckOption12=""
      this.CheckOption13=""
      this.CheckOption14=""
      this.CheckOption15=""
      this.CheckOption16=""
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 搜尋
    search() {
      console.log("Search click");
      this.chLoadingShow()
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {'Column':'StartDayVlaue','Value':this.formData.searchItem.dateStart},
          {"Column":"EndDayVlaue","Value":this.formData.searchItem.dateEnd},
          {"Column":"DepartCode","Value":this.formData.searchItem.department},
                ],
        QyName:[
          // "DISTINCT (RPFlowNo)",
          // // "ID",
          // // "Name",
          // // "CheckDay",
          // // "CheckStatus",
          // " * "
          "RPFlowNo",
          "ID",
          "Name",
          "CheckDay",
          "CheckStatus",
          "FlowId", "DepartName"
        ],
      }).then(res => {
        let tbBuffer = JSON.parse(res.data.DT)
        let aa = unique(tbBuffer)
        this.tableItems = aa
      }).catch(err => {
        console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        console.log("search final")
        this.chLoadingShow()
      })
    },
    save() {
      console.log("送出!!")
      this.chLoadingShow()
      if(this.EmpDepartCode == ""){
        this.EmpDepartName = ""
      }
      else{
        this.EmpDepartName = formDepartOptions.find(ele => ele.value == this.EmpDepartCode).text
      }

      console.log("this.action == " + this.action == Actions.add)
      if (this.action == Actions.add){
        //-----新增-----
        createFormOrder0({
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id this.doMan.name = this.userData.UserName
          // OperatorID: "16713",  // 操作人id
          KeyName: this.DB_Table,  // DB table
          KeyItem:[
            {Column:"CheckDay", Value: this.zs },
            {Column:"EmpDepartCode",Value:this.EmpDepartCode},
            {Column:"EmpDepartName",Value:this.EmpDepartName},
            {Column:"JobName",Value:this.JobName},
            {Column:"EmpID",Value:this.EmpID},
            {Column:"EmpName",Value:this.EmpName},
            {Column:"EmployeeYears",Value:this.EmployeeYears},
            {Column:"JobDesp",Value:this.JobDesp},
            {Column:"ObserDep",Value:this.ObserDep},
            {Column:"ObserID",Value:this.ObserID},
            {Column:"ObserName",Value:this.doMan.name},
            {Column:"OccupUnit",Value:this.OccupUnit},
            {Column:"CheckOption1",Value:this.CheckOption1},
            {Column:"CheckOption2",Value:this.CheckOption2},
            {Column:"CheckOption3",Value:this.CheckOption3},
            {Column:"CheckOption4",Value:this.CheckOption4},
            {Column:"CheckOption5",Value:this.CheckOption5},
            {Column:"CheckOption6",Value:this.CheckOption6},
            {Column:"CheckOption7",Value:this.CheckOption7},
            {Column:"CheckOption8",Value:this.CheckOption8},
            {Column:"CheckOption9",Value:this.CheckOption9},
            {Column:"CheckOption10",Value:this.CheckOption10},
            {Column:"CheckOption11",Value:this.CheckOption11},
            {Column:"CheckOption12",Value:this.CheckOption12},
            {Column:"CheckOption13",Value:this.CheckOption13},
            {Column:"CheckOption14",Value:this.CheckOption14},
            {Column:"CheckOption15",Value:this.CheckOption15},
            {Column:"CheckOption16",Value:this.CheckOption16},
          ]
        }).then(res => {
          console.log(res.data.DT)
        }).catch(err => {
          console.log(err)
          alert('查詢時發生問題，請重新查詢!')
        }).finally(() => {
          this.chLoadingShow()
        })
      }
      else{
        //-----編輯-----
        updateFormOrder({
          ClientReqTime: getNowFullTime(), // client 端請求時間
          OperatorID: this.userData.UserId, // 操作人id
          RPFlowNo: this.RPFlowNo,
          // FunCode: "U",
          KeyName: this.DB_Table, // DB table
          KeyItem:[
            {Column:"CheckDay", Value: this.zs },
            {Column:"EmpDepartCode",Value:this.EmpDepartCode},
            {Column:"EmpDepartName",Value:this.EmpDepartName},
            {Column:"JobName",Value:this.JobName},
            {Column:"EmpID",Value:this.EmpID},
            {Column:"EmpName",Value:this.EmpName},
            {Column:"EmployeeYears",Value:this.EmployeeYears},
            {Column:"JobDesp",Value:this.JobDesp},
            {Column:"ObserDep",Value:this.ObserDep},
            {Column:"ObserID",Value:this.ObserID},
            {Column:"ObserName",Value:this.doMan.name},
            {Column:"OccupUnit",Value:this.OccupUnit},
            {Column:"CheckOption1",Value:this.CheckOption1},
            {Column:"CheckOption2",Value:this.CheckOption2},
            {Column:"CheckOption3",Value:this.CheckOption3},
            {Column:"CheckOption4",Value:this.CheckOption4},
            {Column:"CheckOption5",Value:this.CheckOption5},
            {Column:"CheckOption6",Value:this.CheckOption6},
            {Column:"CheckOption7",Value:this.CheckOption7},
            {Column:"CheckOption8",Value:this.CheckOption8},
            {Column:"CheckOption9",Value:this.CheckOption9},
            {Column:"CheckOption10",Value:this.CheckOption10},
            {Column:"CheckOption11",Value:this.CheckOption11},
            {Column:"CheckOption12",Value:this.CheckOption12},
            {Column:"CheckOption13",Value:this.CheckOption13},
            {Column:"CheckOption14",Value:this.CheckOption14},
            {Column:"CheckOption15",Value:this.CheckOption15},
            {Column:"CheckOption16",Value:this.CheckOption16},
          ]
        })
          .then((res) => {
            console.log(res.data.DT)
          })
          .catch((err) => {
            console.log(err);
            // this.chMsgbar({ success: false, msg: Constrant.update.failed });
            alert('查詢時發生問題，請重新查詢!')
          })
          .finally(() => {
            this.chLoadingShow()
          });
      }
      this.Add = false;
    },
    closeDialogDel() {
      this.dialogDel = false;
      console.log("刪除確認是窗關閉, RPFlowNo:")
      console.log(RPFlowNo)
    },
    // 關閉 dialog
    close() {
      this.Add = false;
      this.dialogShowEdit = false;
      this.dialogDel = false;ds
      console.log(this.aas)
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.addItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    viewPage(item) {
      console.log("item: ")
      console.log(item)
      this.RPFlowNo = item.RPFlowNo
      console.log("RPFlowNo: " + item.RPFlowNo)
      this.action = Actions.edit
      this.chLoadingShow()
        // 依業主要求變更檢式頁面的方式，所以改為另開分頁
        fetchFormOrderOne({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {'Column':'RPFlowNo','Value':item.RPFlowNo},
                ],
        QyName:[
          "CheckDay",//0
          "EmpDepartCode",//1
          "EmpDepartName",//2
          "JobName",//3
          "EmpID",//4
          "EmpName",//5
          "EmployeeYears",//6
          "JobDesp",//7
          "ObserDep",//8
          "ObserID",//9
          "ObserName",//10
          "OccupUnit",//11
          "CheckOption1",//12
          "CheckOption2",//13
          "CheckOption3",//14
          "CheckOption4",//15
          "CheckOption5",//16
          "CheckOption6",//17
          "CheckOption7",//18
          "CheckOption8",//19
          "CheckOption9",//20
          "CheckOption10",//21
          "CheckOption11",//22
          "CheckOption12",//23
          "CheckOption13",//24
          "CheckOption14",//25
          "CheckOption15",//26
          "CheckOption16",//27
        ],
      }).then(res => {
        this.initInput();
        console.log(res.data.DT)
        let dat = JSON.parse(res.data.DT)
        console.log("data ")
        console.log(dat)
        this.Add = true
        // this.zs = res.data.DT.CheckDay
        this.doMan.name = dat[0].ObserName
        let time1 = dat[0].CheckDay.substr(0,10)
        console.log("data time1: " + time1)
        this.zs = time1
        console.log("doMan name: " + this.doMan.name)
        //123資料
        this.zs = dat[0].CheckDay
        this.EmpDepartCode=dat[0].EmpDepartCode
        this.EmpDepartName=dat[0].EmpDepartName
        this.JobName=dat[0].JobName
        this.EmpID=dat[0].EmpID
        this.EmpName=dat[0].EmpName
        this.EmployeeYears=dat[0].EmployeeYears
        this.JobDesp=dat[0].JobDesp
        this.ObserDep=dat[0].ObserDep
        this.ObserID=dat[0].ObserID
        this.ObserName=dat[0].ObserName
        this.OccupUnit=dat[0].OccupUnit
        this.CheckManID=dat[0].CheckManID
        this.CheckMan=dat[0].CheckMan
        this.CheckStatus=dat[0].CheckStatus
        this.CheckOption1=dat[0].CheckOption1
        this.CheckOption2=dat[0].CheckOption2
        this.CheckOption3=dat[0].CheckOption3
        this.CheckOption4=dat[0].CheckOption4
        this.CheckOption5=dat[0].CheckOption5
        this.CheckOption6=dat[0].CheckOption6
        this.CheckOption7=dat[0].CheckOption7
        this.CheckOption8=dat[0].CheckOption8
        this.CheckOption9=dat[0].CheckOption9
        this.CheckOption10=dat[0].CheckOption10
        this.CheckOption11=dat[0].CheckOption11
        this.CheckOption12=dat[0].CheckOption12
        this.CheckOption13=dat[0].CheckOption13
        this.CheckOption14=dat[0].CheckOption14
        this.CheckOption15=dat[0].CheckOption15
        this.CheckOption16=dat[0].CheckOption16


      }).catch(err => {
        console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow()
      })
    },//viewPage
    deleteRecord(RPFlowNo) {
      this.dialogDel = true;
      this.DelDynamicKey += 1;
      this.RPFlowNo = RPFlowNo;
      console.log("刪除確認視窗開啟, RPFlowNo:")
      console.log(RPFlowNo)
      console.log(this.RPFlowNo)
    },
  }
};
</script>
