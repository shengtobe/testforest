<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2 label-title">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2 label-header">
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="檢查日期(起)"
          key="dateStart"
          :showIcon="formData.settings.formIconShow"
          v-model="formData.searchItem.dateStart"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="檢查日期(迄)"
          key="dateEnd"
          :showIcon="formData.settings.formIconShow"
          v-model="formData.searchItem.dateEnd"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <deptSelect
          label="管理單位"
          v-model="formData.searchItem.department"
          :showIcon="formData.settings.formIconShow"
          outType="key"
          key="department"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
      </v-col>
      <v-col cols="12" sm="3" md="3" >
        <v-form ref="uploadform">
          <UploadOneFileAdd :TableKey="DB_Table" ref="upload" />
        </v-form>
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex " align-self="center">
        <v-btn dark large class="my-2 mr-2 btn-fileup" @click="select">
          <v-icon class="mr-1">mdi-cloud-upload</v-icon>上傳
        </v-btn>
      </v-col>
    </v-row>
    
    <ToolBar @search="search" @reset="reset" @newOne="newOne" :text="newText" />
    <!-- 表格資料 -->
    <v-col cols="12">
      <v-card>
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
      </v-card>
    </v-col>
    <v-col cols="12">
      <fileList :fileItems="fileItems" />
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
    <!-- 必填欄位空白提醒視窗 -->
    <v-dialog v-model="dialogNull" persistent max-width="290">
      <v-card class="theme-del-card">
        <v-card-title class="red white--text px-4 py-1 headline"
          >請填妥必要欄位: 車種</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="btn-add white--text" @click="dialogNull = false">確定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 新增機動道班台車使用申請書 modal -->
    <v-dialog v-model="Add" persistent max-width="900px">
      <v-card class="theme-card">
        <v-card-title class="white--text px-4 py-1 label-title">
          新增{{ title }}
          <v-spacer></v-spacer>
          <v-btn dark fab small text @click="close" class="mr-n2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <div class="px-6 py-4">
          <v-row>
            <!-- 檢查項目 -->
            <v-col cols="12">
              <!-- 申請日期、車種 -->
              <v-row no-gutter class="label-header">
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">申請日期</h3>
                  <v-menu
                    v-model="ApplicationDay"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="250px"
                    min-width="250px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model.trim="AddData.ApplicationDay" solo v-on="on" readonly />
                    </template>
                    <v-date-picker
                      color="primary"
                      v-model="AddData.ApplicationDay"
                      @input="ApplicationDay = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">車種</h3>
                  <v-radio-group dense row class="pa-0 ma-0 mt-3" :rules="nameRules" v-model="AddData.Vehicles">
                    <v-radio color="success" label="機動道班台車" value="1" />
                    <v-radio color="red" label="手推車" value="2" />
                  </v-radio-group>
                </v-col>
              </v-row>
              <!-- 單位、職稱、申請人 -->
              <v-row no-gutter class="label-header">
                <v-col cols="12" sm="4">
                  <!-- <h3 class="mb-1">單位</h3>
                  <v-text-field solo v-model="DepartName" /> -->
                  <deptSelect
                    label="管理單位"
                    v-model="doMan.depart"
                    outType="key" 
                    :readonly="true"
                    key="depart"
                  />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">職稱</h3>
                  <v-text-field solo v-model="doMan.jobname" readonly/>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">申請人</h3>
                  <v-text-field solo v-model="doMan.name" />
                </v-col>
              </v-row>
              <!-- 使用區間地點 -->
              <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6">
                <v-row no-gutter>
                  <!-- 站內 -->
                  <v-col cols="12">
                    <h3 class="mb-1">使用區間地點-站內</h3>
                  </v-col>
                  <v-col cols="12" class="fkj">
                    <v-col cols="12" sm="4" style="display: flex;">
                      <span class="mt-3 mr-2">自</span>
                      <!-- <v-text-field solo v-model="BgStation" /> -->
                      <v-select dense single-line :items="apm" v-model="BgStation" outlined />
                      <span class="mt-3 ml-2 mr-2">站 </span>
                    </v-col>
                    <v-col cols="12" sm="4" style="display: flex;">
                      <span class="mt-3 mr-2">至</span>
                      <!-- <v-text-field solo v-model="EndStation" /> -->
                      <v-select dense single-line :items="apm" v-model="EndStation" outlined />
                      <span class="mt-3 ml-1" style="white-space: nowrap">站間</span>
                    </v-col>
                    <v-col cols="12" sm="4" style="display: flex;">
                      <v-text-field solo v-model="Km" />
                      <span class="mt-3 ml-2">公里</span>
                    </v-col>
                  </v-col>
                  <!-- 站外 -->
                  <v-col cols="12">
                    <h3 class="mb-1">使用區間地點-站外</h3>
                  </v-col>
                  <v-col cols="12" class="fkj">
                    <v-col cols="12" sm="4" style="display: flex;">
                      <v-text-field solo v-model="AddData.Outer.Road" />
                      <span class="mt-3 ml-2">股道</span>
                    </v-col>
                    <v-col cols="12" sm="7">
                      <v-radio-group
                        dense
                        row
                        class="pa-0 ma-0 mt-3"
                        v-model="AddData.Outer.UpDown"
                      >
                        <v-radio color="success" label="上山端" value="1" />
                        <v-radio color="red" label="下山端" value="2" />
                      </v-radio-group>
                    </v-col>
                  </v-col>
                </v-row>
              </v-alert>
              <!-- 時間 -->
              <v-col cols="12">
                <h3 class="mb-1 label-header">使用時間</h3>
              </v-col>
              <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6">
                <v-row no-gutter>
                  <h3 class="mb-1">列車空隔</h3>
                  <v-col cols="12" class="fkj">
                    <v-col cols="12" sm="4" style="display: flex;">
                      <v-text-field solo v-model="AddData.UsageTime.Train1" />
                      <span class="mt-3 ml-2">次車</span>
                    </v-col>
                    <v-col cols="12" sm="5" style="display: flex;">
                      <span class="mt-3 mr-2">與</span>
                      <v-text-field solo v-model="AddData.UsageTime.Train2" />
                      <span class="mt-3 ml-2">次車間</span>
                    </v-col>
                  </v-col>
                  <v-col cols="12" class="fkj">
                    <!-- 日期 -->
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">時間日期</h3>
                      <v-menu
                        v-model="UsageTimeDay"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        max-width="250px"
                        min-width="250px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model.trim="AddData.UsageTime.TimeDay"
                            solo
                            v-on="on"
                            readonly
                          />
                        </template>
                        <v-date-picker
                          color="primary"
                          v-model="AddData.UsageTime.TimeDay"
                          @input="UsageTimeDay = false"
                          locale="zh-tw"
                        />
                      </v-menu>
                    </v-col>
                    <!-- 上午 -->
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">上午</h3>
                      <div style="display: flex;">
                        <span class="mt-3 mr-2">往</span>
                        <v-text-field type="number" solo v-model="AddData.UsageTime.MrningGoT" />
                        <span class="mt-3 mr-2 ml-2">時</span>
                        <v-text-field type="number" solo v-model="AddData.UsageTime.MrningGoM" />
                        <span class="mt-3 ml-2">分</span>
                      </div>
                      <div style="display: flex;">
                        <span class="mt-3 mr-2">返</span>
                        <v-text-field type="number" solo v-model="AddData.UsageTime.MrningReturnT" />
                        <span class="mt-3 mr-2 ml-2">時</span>
                        <v-text-field type="number" solo v-model="AddData.UsageTime.MrningReturnM" />
                        <span class="mt-3 ml-2">分</span>
                      </div>
                    </v-col>
                    <!-- 下午 -->
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">下午</h3>
                      <div style="display: flex;">
                        <span class="mt-3 mr-2">往</span>
                        <v-text-field type="number" solo v-model="AddData.UsageTime.AfternoonGoT" />
                        <span class="mt-3 mr-2 ml-2">時</span>
                        <v-text-field type="number" solo v-model="AddData.UsageTime.AfternoonGoM" />
                        <span class="mt-3 ml-2">分</span>
                      </div>
                      <div style="display: flex;">
                        <span class="mt-3 mr-2">返</span>
                        <v-text-field
                          type="number"
                          solo
                          v-model="AddData.UsageTime.AfternoonReturnT"
                        />
                        <span class="mt-3 mr-2 ml-2">時</span>
                        <v-text-field
                          type="number"
                          solo
                          v-model="AddData.UsageTime.AfternoonReturnM"
                        />
                        <span class="mt-3 ml-2">分</span>
                      </div>
                    </v-col>
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
            <!-- 目的、輛數、記事 -->
            <v-col cols="12" sm="4">
              <h3 class="mb-1 label-header">使用目的</h3>
              <v-textarea auto-grow outlined rows="4" v-model="AddData.Purpose" />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1 label-header">輛數</h3>
              <v-textarea auto-grow outlined rows="4" v-model="AddData.VehiclesNumber" />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1 label-header">記事</h3>
              <v-textarea auto-grow outlined rows="4" v-model="AddData.Note" />
            </v-col>
            <!-- END 檢查項目 -->
          </v-row>
        </div>

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
  </v-container>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from 'vuex'
import { getNowFullTime, getTodayDateString, unique} from "@/assets/js/commonFun";
import { maintainStatusOpts } from '@/assets/js/workList'
import dateSelect from "@/components/forManage/dateSelect";
import deptSelect from "@/components/forManage/deptSelect";
import { fetchFormOrderList, fetchFormOrderOne, createFormOrder, createFormOrder0, updateFormOrder } from '@/apis/formManage/serve'
import { formDepartOptions } from '@/assets/js/departOption'
import { Actions } from "@/assets/js/actions";
import dialogDelete from "@/components/forManage/dialogDelete";
import ToolBar from "@/components/forManage/toolbar";
import UploadOneFileAdd from '@/components/UploadOneFileAdd.vue';
import fileList from "@/components/forManage/fileList";

export default {
  data() {
    return {
      title: "機動道班台車使用申請書",
      newText: "申請書",
      action: Actions.add,
      actions: Actions,
      isLoading: false,
      disabled: false,
      fileItems: [],
      QueryDayStart: "",
      QueryDayEnd: "",
      apm: ["嘉義", "北門", "鹿麻產", "竹崎", "木履寮", "樟腦寮", "獨立山", "梨園寮", "交力坪", "水社寮", "奮起湖", "多林", "十字路", "屏遮那", "第一分道", "二萬平", "神木", "阿里山", "沼平", "對高岳", "祝山"],
      formDepartOptions: [
      // 通報單位下拉選單
      { text: "不限", value: "" },
      ...formDepartOptions,
    ],
      QueryData: {
        CheckDayStart: "",
        CheckDayEnd: "",
        Department: "",
      },
      ApplicationDay: "",
      UsageTimeDay: "",
      AddData: {
        ApplicationDay: "",
        Vehicles: 0,
        Department: "",
        JobTitle: "",
        Applicant: "",
        Inside: {
          Site1: "",
          Site2: "",
          Kilometer: "",
        },
        Outer: {
          Road: "",
          UpDown: "",
        },
        UsageTime: {
          Train1: "",
          Train2: "",
          TimeDay: "",
          MrningGoT: "",
          MrningGoM: "",
          MrningReturnT: "",
          MrningReturnM: "",
          AfternoonGoT: "",
          AfternoonGoM: "",
          AfternoonReturnT: "",
          AfternoonReturnM: "",
        },
        Purpose: "",
        VehiclesNumber: 0,
        Note: "",
      },
      Add: false,
      ShowDetailDialog: false,
      dialogDel: false, // model off
      dialogNull: false,
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
      editType: "",
      editItem: {},
      DynamicKey: 0,
      DelDynamicKey: 0,
      pageOpt: { page: 1 }, // 目前頁數
      //---api---
      DB_Table: "RP035",
      RPFlowNo: "",
      nowTime: "",
      doMan:{
        id: '',
        name: '',
        depart: '',
        jobname: '',
        checkManName: ''
      },
      ipt2: {},
      defaultIpt: {  // 預設的欄位值
        startDay: '',
        EndDay: '',
        depart: '',  // 單位
      },
      nameRules: [
        (v) => !!v || "請選擇",
      ],
      headers: [
        // 表格顯示的欄位 DepartCode ID Name
        { text: "項次", value: "ItemNo", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "保養日期", value: "CheckDay", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        // { text: "審查狀態", value: "CheckStatus", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "填寫人", value: "Name", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "保養單位", value: "DepartName", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "功能", value: "content", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
      ],
      tableItems: [],
      //------
      CarType: "",
      BgStation: "",
      EndStation: "",
      Km: "",
      Road: "",
      Way: "",
      BgTrainNo: "",
      EndTrainNo: "",
      Day: "",
      AM_To_HH: "",
      AM_To_mm: "",
      AM_Back_HH: "",
      AM_Back_mm: "",
      PM_To_HH: "",
      PM_To_mm: "",
      PM_Back_HH: "",
      PM_Back_mm: "",
      Purpose: "",
      AmountCar: "",
      Memo: "",

    };
  },
  components: {
    Pagination, // 頁碼
    dateSelect,
    deptSelect,
    ToolBar,
    dialogDelete, UploadOneFileAdd, fileList
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
      this.z = this.df = this.nowTime
  },
  methods: {
    ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
    select() {
      this.$refs.upload.uploadFile()
    },
    reset() {
      this.formData.searchItem.dateStart = "";
      this.formData.searchItem.dateEnd = "";
      this.formData.searchItem.department = "";
    },
    // 更換頁數
    initInput(){
      this.doMan.name = this.userData.UserName;
      this.doMan.jobname = this.userData.JobName;
      this.doMan.depart = this.userData.DeptList[0].DeptId;
      this.AddData.ApplicationDay = this.nowTime;
      this.AddData.Vehicles = "0",
      this.BgStation = "",
      this.EndStation = "",
      this.Km = "",
      this.Road = "",
      this.Way = "",
      this.BgTrainNo = "",
      this.EndTrainNo = "",
      this.Day = "",
      this.AM_To_HH = "",
      this.AM_To_mm = "",
      this.AM_Back_HH = "",
      this.AM_Back_mm = "",
      this.PM_To_HH = "",
      this.PM_To_mm = "",
      this.PM_Back_HH = "",
      this.PM_Back_mm = "",
      this.Purpose = "",
      this.AmountCar = "",
      this.Memo = "",
      this.AddData.Outer.Road = "",
      this.AddData.Outer.UpDown = "",
      this.AddData.UsageTime.Train1 = "",
      this.AddData.UsageTime.Train2 = "",
      this.AddData.UsageTime.TimeDay = "",
      this.AddData.UsageTime.MrningGoT = "",
      this.AddData.UsageTime.MrningGoM = "",
      this.AddData.UsageTime.MrningReturnT = "",
      this.AddData.UsageTime.MrningReturnM = "",
      this.AddData.UsageTime.AfternoonGoT = "",
      this.AddData.UsageTime.AfternoonGoM = "",
      this.AddData.UsageTime.AfternoonReturnT = "",
      this.AddData.UsageTime.AfternoonReturnM = "",
      this.AddData.Purpose = "",
      this.AddData.VehiclesNumber = 0,
      this.AddData.Note = ""

    },
    unique(list){
      var arr = [];
      let b = false;
      for (var i = 0; i < list.length; i++) {
        if (i == 0) arr.push(list[i]);
        b = false;
        if (arr.length > 0 && i > 0) {
          for (var j = 0; j < arr.length; j++) {
            if (arr[j].RPFlowNo == list[i].RPFlowNo) {
              b = true;
              //break;
            }
          }
          if (!b) {
            arr.push(list[i]);
          }
        }
      }
      return arr;
    },
    newOne(){
     
      this.Add = true
      this.action = Actions.add
     
      this.initInput();
    },
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 搜尋
    search() {
      let d1 = Date.parse(this._data.z)
      let d2 = Date.parse(this._data.df)
      if(d1 > d2){
        alert('時間範圍錯誤')
        return
      }
      this.chLoadingShow({show:true})
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {'Column':'StartDayVlaue','Value':this._data.z},
          {"Column":"EndDayVlaue","Value":this._data.df},
          {"Column":"DepartCode","Value":this._data.ipt2.depart},
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
        this.fileItems = res.data.FileCount||[];
      }).catch(err => {
        //console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow({show:false})
      })
    },
    // 存
    save() {
      if (this.AddData.Vehicles != "1" && this.AddData.Vehicles != "2") {
        this.dialogNull = true;
        return;
      }
      
      this.chLoadingShow({show:true})
      if(this.AddData.UsageTime.TimeDay.length > 10){
        this.AddData.UsageTime.TimeDay = this.AddData.UsageTime.TimeDay.substring(0, 9)
      }
      if(this.AddData.UsageTime.TimeDay.length == 0){
        this.AddData.UsageTime.TimeDay = this.nowTime
      }
      if (this.action == Actions.add){
        //-----新增-----
        createFormOrder0({
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id this.doMan.name = this.userData.UserName
          // OperatorID: "16713",  // 操作人id
          KeyName: this.DB_Table,  // DB table
          KeyItem: [ 
            {"Column":'CheckDay',"Value":this.AddData.ApplicationDay},
            {"Column":"CarType","Value":this.AddData.Vehicles},
            {"Column":"JobName","Value":this.doMan.jobname},
            {"Column":"BgStation","Value":this.BgStation},
            {"Column":"EndStation","Value":this.EndStation},
            {"Column":"Km","Value":this.Km},
            {"Column":"Road","Value":this.AddData.Outer.Road},
            {"Column":"Way","Value":this.AddData.Outer.UpDown},
            {"Column":"BgTrainNo","Value":this.AddData.UsageTime.Train1},
            {"Column":"EndTrainNo","Value":this.AddData.UsageTime.Train2},
            {"Column":"Day","Value":this.AddData.UsageTime.TimeDay},
            {"Column":"AM_To_HH","Value":this.AddData.UsageTime.MrningGoT},
            {"Column":"AM_To_mm","Value":this.AddData.UsageTime.MrningGoM},
            {"Column":"AM_Back_HH","Value":this.AddData.UsageTime.MrningReturnT},
            {"Column":"AM_Back_mm","Value":this.AddData.UsageTime.MrningReturnM},
            {"Column":"PM_To_HH","Value":this.AddData.UsageTime.AfternoonGoT},
            {"Column":"PM_To_mm","Value":this.AddData.UsageTime.AfternoonGoM},
            {"Column":"PM_Back_HH","Value":this.AddData.UsageTime.AfternoonReturnT},
            {"Column":"PM_Back_mm","Value":this.AddData.UsageTime.AfternoonReturnM},
            {"Column":"Purpose","Value":this.AddData.Purpose},
            {"Column":"AmountCar","Value":this.AddData.VehiclesNumber},
            {"Column":"Memo","Value":this.AddData.Note}
          ]
        }).then(res => {
         
        }).catch(err => {
          //console.log(err)
          alert('查詢時發生問題，請重新查詢!')
        }).finally(() => {
          this.chLoadingShow({show:false})
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
          KeyItem: [ 
            {"Column":'CheckDay',Value:this.AddData.ApplicationDay},
            {"Column":"CarType","Value":this.AddData.Vehicles},
            {"Column":"JobName","Value":this.doMan.jobname},
            {"Column":"BgStation","Value":this.BgStation},
            {"Column":"EndStation","Value":this.EndStation},
            {"Column":"Km","Value":this.Km},
            {"Column":"Road","Value":this.AddData.Outer.Road},
            {"Column":"Way","Value":this.AddData.Outer.UpDown},
            {"Column":"BgTrainNo","Value":this.AddData.UsageTime.Train1},
            {"Column":"EndTrainNo","Value":this.AddData.UsageTime.Train2},
            {"Column":"Day","Value":this.AddData.UsageTime.TimeDay},
            {"Column":"AM_To_HH","Value":this.AddData.UsageTime.MrningGoT},
            {"Column":"AM_To_mm","Value":this.AddData.UsageTime.MrningGoM},
            {"Column":"AM_Back_HH","Value":this.AddData.UsageTime.MrningReturnT},
            {"Column":"AM_Back_mm","Value":this.AddData.UsageTime.MrningReturnM},
            {"Column":"PM_To_HH","Value":this.AddData.UsageTime.AfternoonGoT},
            {"Column":"PM_To_mm","Value":this.AddData.UsageTime.AfternoonGoM},
            {"Column":"PM_Back_HH","Value":this.AddData.UsageTime.AfternoonReturnT},
            {"Column":"PM_Back_mm","Value":this.AddData.UsageTime.AfternoonReturnM},
            {"Column":"Purpose","Value":this.AddData.Purpose},
            {"Column":"AmountCar","Value":this.AddData.VehiclesNumber},
            {"Column":"Memo","Value":this.AddData.Note}
          ]
        })
          .then((res) => {
           
          })
          .catch((err) => {
            //console.log(err);
            // this.chMsgbar({ success: false, msg: Constrant.update.failed });
            alert('查詢時發生問題，請重新查詢!')
          })
          .finally(() => {
            this.chLoadingShow({show:false})
          });
      }
      this.Add = false;
    },
    // 關閉刪除確認dialod
    closeDialogDel() {
      this.dialogDel = false;
    },
    // 關閉 dialog
    close() {
      this.Add = false;
      this.dialog3 = false;
      this.dialogShowEdit = false;
      this.dialogDel = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.addItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    viewPage(item) {
      this.RPFlowNo = item.RPFlowNo
      this.action = Actions.edit
      this.chLoadingShow({show:true})
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
          "DepartName",//1
          "Name",//2
          "CheckMan",//3
          "CarType",//4
          "JobName",//5
          "BgStation",//6
          "EndStation",//7
          "Km",//8
          "Road",//9
          "Way",//10
          "BgTrainNo",//11
          "EndTrainNo",//12
          "Day",//13
          "AM_To_HH",//14
          "AM_To_mm",//15
          "AM_Back_HH",//16
          "AM_Back_mm",//17
          "PM_To_HH",//18
          "PM_To_mm",//19
          "PM_Back_HH",//20
          "PM_Back_mm",//21
          "Purpose",//22
          "AmountCar",//23
          "Memo",//24
        ],
      }).then(res => {
        this.initInput();
       
        let dat = JSON.parse(res.data.DT)
        this.Add = true
        // this.zs = res.data.DT.CheckDay
        this.doMan.name = dat[0].Name
        let time1 = dat[0].CheckDay.substr(0,10)
        this.zs = time1
        //123資料
        let ad = Object.keys(dat[0])
        var step;
        for (step = 0; step < 11; step++) {
          this.doMan.name = dat[0].Name
          this.AddData.Vehicles = dat[0].CarType
          this.doMan.jobname = dat[0].JobName
          this.BgStation = dat[0].BgStation
          this.EndStation = dat[0].EndStation
          this.Km = dat[0].Km
          this.AddData.Outer.Road = dat[0].Road
          this.AddData.Outer.UpDown = dat[0].Way
          this.AddData.UsageTime.Train1 = dat[0].BgTrainNo
          this.AddData.UsageTime.Train2 = dat[0].EndTrainNo
          this.AddData.UsageTime.TimeDay  = dat[0].Day.substr(0, 10)
          this.AddData.UsageTime.MrningGoT = dat[0].AM_To_HH
          this.AddData.UsageTime.MrningGoM = dat[0].AM_To_mm
          this.AddData.UsageTime.MrningReturnT = dat[0].AM_Back_HH
          this.AddData.UsageTime.MrningReturnM = dat[0].AM_Back_mm
          this.AddData.UsageTime.AfternoonGoT = dat[0].PM_To_HH
          this.AddData.UsageTime.MrningReturnM = dat[0].AM_Back_mm
          this.AddData.UsageTime.AfternoonGoT = dat[0].PM_To_HH
          this.AddData.UsageTime.AfternoonGoM = dat[0].PM_To_mm
          this.AddData.UsageTime.AfternoonReturnT = dat[0].PM_Back_HH
          this.AddData.UsageTime.AfternoonReturnM = dat[0].PM_Back_mm
          this.AddData.Purpose = dat[0].Purpose
          this.AddData.VehiclesNumber = dat[0].AmountCar
          this.AddData.Note = dat[0].Memo
        }

        
      }).catch(err => {
        //console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow({ show: false})
      })
    },//viewPage
    deleteRecord(RPFlowNo) {
      this.dialogDel = true;
      this.DelDynamicKey += 1;
      this.RPFlowNo = RPFlowNo;
    },
  },
};
</script>

<style>
.fkj {
  display: flex;
}
@media only screen and (max-width: 600px) {
  .fkj {
    display: contents;
  }
}
</style>