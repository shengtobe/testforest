<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">{{ title }}</h2>
    <v-row class="px-2">
      <!-- 第一排選項 -->
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="檢查日期(起)"
          v-model="input.dateStart"
          key="dateStart"
          :showIcon="formIconShow"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="檢查日期(迄)"
          v-model="input.dateEnd"
          key="dateStart"
          :showIcon="formIconShow"
        />
      </v-col>
      <v-col cols="12" sm="3" md="2">
        <deptSelect label="管理單位" v-model="input.department" :iconYN="formIconShow" outType="key" key="department"/>
      </v-col>
      <v-col cols="12" sm="2" md="2">
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
      </v-col>
      <v-col cols="12" sm="2" md="2" class="d-flex align-end">
        <v-btn color="green" dark large class="mb-sm-8 mb-md-8" @click="search">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <v-form ref="uploadform">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-file</v-icon>檔案上傳
          </h3>
          <v-text-field solo placeholder="點此選擇檔案" />
        </v-form>
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
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
          <!-- @click="dialogShowAdd = true" -->
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </v-col>
      <v-dialog v-model="dialogDel" persistent max-width="290">
        <v-card>
          <v-card-title class="red white--text px-4 py-1 headline"
            >確認是否刪除?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="close">取消</v-btn>
            <v-btn color="success">刪除</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogNull" persistent max-width="290">
        <v-card>
          <v-card-title class="red white--text px-4 py-1 headline"
            >請填妥必要欄位</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="dialogNull = false">確定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 動力車保養紀錄 -->
      <v-col cols="12" sm="12" md="12">
        <v-data-table
          :headers="headers"
          :items="tableItems"
          :options.sync="pageOpt"
          disable-sort
          disable-filtering
          hide-default-footer
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
              class="mr-2"
              small
              dark
              fab
              color="info darken-1"
              @click="viewPage(item)"
            >
              <!--上面一行原程式: @click="dialogShowAdd = true" -->
              <v-icon dark>mdi-pen</v-icon>
            </v-btn>
            <v-btn
              title="刪除"
              small
              dark
              fab
              color="red"
              @click="dialogDel = true"
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
      <!-- 新增保養資料 modal -->
      <v-dialog v-model="dialogShowAdd" max-width="800px">
        <v-card>
          <!-- 標題 -->
          <v-card-title class="blue white--text px-4 py-1">
            新增{{ title }}
            <v-spacer />
            <v-btn dark fab small text @click="close" class="mr-n2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <!-- 內容 -->
          <div class="px-6 py-4">
            <v-row>
              <v-col cols="12">
                <p>1.本查核紀錄表每月至少觀察2人</p>
                <p>
                  2.本表於月底前完成查核，經主管核章後，留存於管理單位之系統保存備查。
                </p>
              </v-col>
              <v-col cols="12" sm="4">
                <dateSelect
                    label="觀察日期"
                    v-model="CheckDay"
                    key="dateStart"
                    :showIcon="formIconShow"
                  />
              </v-col>
              <v-col cols="12" sm="4" />
              <v-col cols="12" sm="4" />

              <v-col cols="8" sm="4">
                <h3 class="mb-1">所屬單位</h3>
                <v-select
                  :rules="nameRules"
                  v-model="EmpDepartCode"
                  :items="formDepartOptions"
                  solo
                />
              </v-col>
              <v-col cols="8" sm="4">
                <h3 class="mb-1">職稱</h3>
                <v-text-field
                  v-model="JobName"
                  :rules="nameRules"
                  required
                  solo
                />
              </v-col>

              <v-col cols="8" sm="4">
                <h3 class="mb-1">員工姓名</h3>
                <v-text-field
                  v-model="EmpName"
                  :rules="nameRules"
                  required
                  solo
                />
              </v-col>

              <v-col cols="8" sm="4">
                <h3 class="mb-1">任現職年資</h3>
                <v-text-field
                  v-model="EmployeeYears"
                  :rules="nameRules"
                  required
                  solo
                />
              </v-col>
              <v-col cols="8" sm="4">
                <h3 class="mb-1">工作名稱</h3>
                <v-text-field
                  v-model="JobDesp"
                  :rules="nameRules"
                  required
                  solo
                />
              </v-col>
              <v-col cols="10">
                <h3 class="mb-1">接受安全觀察之情況</h3>
                <v-row class="ml-1" style="justify-content: left">
                  <v-checkbox
                    class="mr-3"
                    v-model="CheckOption1"
                    label="計畫安全觀察之員工"
                  />
                  <v-checkbox
                    class="mr-3"
                    v-model="CheckOption2"
                    label="常不注意安全肇生事故者"
                  />
                  <v-checkbox
                    class="mr-3"
                    v-model="CheckOption3"
                    label="生病或不到工後恢復工作者"
                  />
                  <v-checkbox
                    class="mr-3"
                    v-model="CheckOption4"
                    label="調換工作者"
                  />
                  <v-checkbox
                    class="mr-3"
                    v-model="CheckOption5"
                    label="無經驗者"
                  />
                  <v-checkbox
                    class="mr-3"
                    v-model="CheckOption6"
                    label="身體或心智不能安全工作者"
                  />
                  <v-checkbox
                    class="mr-3"
                    v-model="CheckOption7"
                    label="似經情緒擾亂有怪異行動者"
                  />
                  <v-checkbox
                    class="mr-3"
                    v-model="CheckOption8"
                    label="累遭意外者"
                  />
                </v-row>
              </v-col>
              <v-col cols="12">
                <h3 class="mb-1 indigo--text">
                  觀察內容：（觀察此人進行工作檢討工作關鍵性安全要點、交談結果）
                </h3>
              </v-col>
              <v-col cols="12">
                <h3 class="mb-1 indigo--text">
                  一、工作步驟是否正確？合乎標準作業程序？
                </h3>
                <v-textarea
                  auto-grow
                  outlined
                  rows="4"
                  v-model="CheckOption9"
                />
              </v-col>
              <v-col cols="12">
                <h3 class="mb-1 indigo--text">二、工作熟練程度如何？</h3>
                <v-textarea
                  auto-grow
                  outlined
                  rows="4"
                  v-model="CheckOption10"
                />
              </v-col>
              <v-col cols="12">
                <h3 class="mb-1 indigo--text">
                  三、不安全動作係由何種原因所致？
                </h3>
                <v-textarea
                  auto-grow
                  outlined
                  rows="4"
                  v-model="CheckOption11"
                />
              </v-col>
              <v-col cols="12">
                <h3 class="mb-1 indigo--text">
                  四、可能發生的意外有哪些？防止措施如何？
                </h3>
                <v-textarea
                  auto-grow
                  outlined
                  rows="4"
                  v-model="CheckOption12"
                />
              </v-col>
              <v-col cols="12">
                <h3 class="mb-1 indigo--text">五、對工作者說明或糾正要點：</h3>
                <v-textarea
                  auto-grow
                  outlined
                  rows="4"
                  v-model="CheckOption13"
                />
              </v-col>
              <v-col cols="12">
                <h3 class="mb-1 indigo--text">
                  六、提請有關單位協辦事項有哪些？
                </h3>
                <v-textarea
                  auto-grow
                  outlined
                  rows="4"
                  v-model="CheckOption14"
                />
              </v-col>
              <v-col cols="12">
                <h3 class="mb-1 indigo--text">
                  七、工作者對進行此工作的意見：
                </h3>
                <v-textarea
                  auto-grow
                  outlined
                  rows="4"
                  v-model="CheckOption15"
                />
              </v-col>
              <v-col cols="12">
                <h3 class="mb-1 indigo--text">八、其他</h3>
                <v-textarea
                  auto-grow
                  outlined
                  rows="4"
                  v-model="CheckOption16"
                />
              </v-col>
            </v-row>
            <hr />
            <v-row>
              <v-col cols="12" sm="4">
                <h3 class="mb-1">觀察人員</h3>
                <v-text-field
                  v-model="ObserName"
                  :rules="nameRules"
                  required
                  solo
                />
              </v-col>
              <v-col cols="12" sm="4">
                <h3 class="mb-1">職安單位</h3>
                <v-text-field
                  v-model="OccupUnit"
                  :rules="nameRules"
                  required
                  solo
                />
              </v-col>
              <v-col cols="12" sm="4">
                <h3 class="mb-1">科長</h3>
                <v-text-field
                  v-model="CheckMan"
                  :rules="nameRules"
                  required
                  solo
                />
              </v-col>
            </v-row>
          </div>
          <!-- 輸出/取消 -->
          <v-card-actions class="px-5 pb-8">
            <v-spacer></v-spacer>

            <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
            <v-btn
              color="success"
              elevation="4"
              :loading="isLoading"
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
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from "vuex";
import {
  getNowFullTime,
  getTodayDateString,
  unique,
  decodeObject,
} from "@/assets/js/commonFun";
import { maintainStatusOpts } from "@/assets/js/workList";
import {
  fetchFormOrderList,
  fetchFormOrderOne,
  createFormOrder,
  createFormOrder0,
  updateFormOrder,
  deleteFormOrder,
} from "@/apis/formManage/serve";
import { formDepartOptions } from "@/assets/js/departOption";
import { Actions } from "@/assets/js/actions";
import { Constrant } from "@/assets/js/constrant";
import dateSelect from "@/components/forManage/dateSelect";
import deptSelect from "@/components/forManage/deptSelect";
class Question {
  constructor(description, method, result, memo) {
    this.description = description;
    this.method = method;
    this.result = result;
    this.memo = memo;
  }
}

export default {
  data: () => ({
    title: "員工工作安全觀察表(每月2 次)",
    newText: "觀察表",
    isLoading: false,
    disabled: false,
    input: {
      dateStart: new Date().toISOString().substr(0, 10), // 通報日期(起)
      dateEnd: new Date().toISOString().substr(0, 10), // 通報日期(迄)
      case: "",
      eqLoss: "",
      departName: "",
    },
    formIconShow: true,
    QueryDayStart: "",
    QueryDayEnd: "",
    QueryData: {
      DayStart: "",
      DayEnd: "",
    },

    CheckOption1: false,
    CheckOption2: false,
    CheckOption3: false,
    CheckOption4: false,
    CheckOption5: false,
    CheckOption6: false,
    CheckOption7: false,
    CheckOption8: false,
    CheckOption9: "",
    CheckOption10: "",
    CheckOption11: "",
    CheckOption12: "",
    CheckOption13: "",
    CheckOption14: "",
    CheckOption15: "",
    CheckOption16: "",
    CheckDay: "",
    ObserName: "",
    CheckMan: "",
    ObserDep: "",
    JobName: "",
    EmpName: "",
    EmpID: "",
    EmployeeYears: "",
    JobDesp: "",
    OccupUnit: "",
    EmpDepartName: "",
    EmpDepartCode: "",
    formDepartOptions: [
      // 通報單位下拉選單
      { text: "不限", value: "" },
      ...formDepartOptions,
    ],
    //---api---
    DB_Table: "RP014",
    nowTime: "",
    doMan: {
      id: "",
      name: "",
      depart: "",
      checkManName: "",
    },
    ipt2: {},
    defaultIpt: {
      // 預設的欄位值
      startDay: "",
      EndDay: "",
      depart: "", // 單位
    },
    headers: [
      // 表格顯示的欄位 DepartCode ID Name
      {
        text: "項次",
        value: "ItemNo",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "保養日期",
        value: "CheckDay",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "審查狀態",
        value: "CheckStatus",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "填寫人",
        value: "Name",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "保養單位",
        value: "DepartName",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "功能",
        value: "content",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
    ],
    tableItems: [],
    //------
    ipt: {
      dateStart: new Date().toISOString().substr(0, 10), // 通報日期(起)
      dateEnd: new Date().toISOString().substr(0, 10), // 通報日期(迄)
      case: "",
      eqLoss: "",
    },
    dateMemuShow: {
      // 日曆是否顯示
      start: false,
      end: false,
    },
    evtTypeOpts: evtTypes,
    locationOpts: locationOpts,
    dateMenuShow: false, // 日曆是否顯示
    dialogDateMenuShow: {
      // dialog 日期 menu 是否顯示
      enter: false,
      enters: false,
      out: false,
    },
    editedItem: {
      Kilometer: 12044.3,
      Kilometers: 12044.3,
      enterDate: "2020-08-10",
      content: "更換引擎機油", // 維修項目
      startday: "2020-08-10",
      user: "王大明",
    },
    addItem: {
      Kilometer: null,
      Kilometers: null,
      enterDate: "",
      content: "", // 維修項目
      enterDates: "",
      user: "",
    },
    defaultItem: {
      Kilometer: null,
      Kilometers: 0,
      enterDate: "2020-08-10",
      content: "", // 維修項目
      user: "",
    },
    nameRules: [(v) => !!v || "不可空白"],
    dialogForm: {},
    mainLocation: "", // 所選的地點
    OLocation: "", // 其他地點
    dialogShowAdd: false, // model off
    dialogShowEdit: false, // model off
    dialogDel: false, // model off
    dialogNull: false,
    dialogm1: "2020-08-01",
    aa: "",
    bb: "",
    cc: "",
    disabled: true,
    pageOpt: { page: 1 }, // 目前頁數
  }),
  components: { Pagination, dateSelect, deptSelect }, // 頁碼
  computed: {
    ...mapState("user", {
      userData: (state) => state.userData, // 使用者基本資料
    }),
  },
  created() {
    this.ipt2 = { ...this.defaultIpt };
    //更新時間
    var today = new Date();
    let mStr = today.getMonth() + 1;
    let dStr = today.getDate();
    if (mStr < 10) {
      mStr = "0" + mStr;
    }
    if (dStr < 10) {
      dStr = "0" + dStr;
    }
    this.nowTime = today.getFullYear() + "-" + mStr + "-" + dStr;
    this.z = this.df = this.nowTime;
  },

  methods: {
    initInput() {
      this.doMan.name = this.userData.UserName;
      this.CheckDay = this.nowTime;
      this.ObserName = this.doMan.name;
      this.CheckOption1 = false;
      this.CheckOption2 = false;
      this.CheckOption3 = false;
      this.CheckOption4 = false;
      this.CheckOption5 = false;
      this.CheckOption6 = false;
      this.CheckOption7 = false;
      this.CheckOption8 = false;
      this.CheckOption9 = "";
      this.CheckOption10 = "";
      this.CheckOption11 = "";
      this.CheckOption12 = "";
      this.CheckOption13 = "";
      this.CheckOption14 = "";
      this.CheckOption15 = "";
      this.CheckOption16 = "";
      this.ObserName = "";
      this.CheckMan = "";
      this.ObserDep = "";
      this.JobName = "";
      this.EmpName = "";
      this.EmployeeYears = "";
      this.JobDesp = "";
      this.OccupUnit = "";
      this.EmpDepartName = "";
      this.EmpDepartCode = "";
      this.EmpID = "";
    },
    unique(list) {
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
    newOne() {
      console.log("newOne");
      this.dialogShowAdd = true;
      this.initInput();
    },
    ...mapActions("system", [
      "chMsgbar", // messageBar
      "chLoadingShow", // 切換 loading 圖顯示
    ]),
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 搜尋
    search() {
      console.log("Search click!");
      console.log("test" + this.userData.UserId);
      this.chLoadingShow();
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.userData.UserId, // 操作人id
        KeyName: this.DB_Table, // DB table
        KeyItem: [
          { Column: "StartDayVlaue", Value: this.input.dateStart },
          { Column: "EndDayVlaue", Value: this.input.dateEnd },
          { Column: "DepartCode", Value: this.input.department },
        ],
        QyName: [
          // "DISTINCT (RPFlowNo)",
          // // "ID",
          // // "Name",
          // // "CheckDay",
          // // "CheckStatus",
          // " * "
          "RPFlowNo",
          "ID",
          "Name",
          "DepartName",
          "CheckDay",
          "CheckStatus",
          "FlowId",
        ],
      })
        .then((res) => {
          let tbBuffer = JSON.parse(res.data.DT);
          let aa = unique(tbBuffer);
          this.tableItems = aa;
        })
        .catch((err) => {
          console.log(err);
          alert("查詢時發生問題，請重新查詢!");
        })
        .finally(() => {
          console.log("search final");
          this.chLoadingShow();
        });
    },
    // 存
    save() {
      if (this.EmpDepartCode == "") {
        this.dialogNull = true;
        return;
      }

      console.log("送出!!");
      this.chLoadingShow();

      console.log("EmpDepartCode: " + this.EmpDepartCode);
      this.EmpDepartName = formDepartOptions.find(
        (ele) => ele.value == this.EmpDepartCode
      ).text;
      console.log("EmpDepartName: " + this.EmpDepartName);

      createFormOrder0({
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.userData.UserId, // 操作人id this.doMan.name = this.userData.UserName
        // OperatorID: "16713",  // 操作人id
        KeyName: this.DB_Table, // DB table
        KeyItem: [
          { Column: "CheckDay", Value: this.CheckDay },
          {
            Column: "CheckOption1",
            Value: this.CheckOption1 == true ? "1" : "0",
          },
          {
            Column: "CheckOption2",
            Value: this.CheckOption2 == true ? "1" : "0",
          },
          {
            Column: "CheckOption3",
            Value: this.CheckOption3 == true ? "1" : "0",
          },
          {
            Column: "CheckOption4",
            Value: this.CheckOption4 == true ? "1" : "0",
          },
          {
            Column: "CheckOption5",
            Value: this.CheckOption5 == true ? "1" : "0",
          },
          {
            Column: "CheckOption6",
            Value: this.CheckOption6 == true ? "1" : "0",
          },
          {
            Column: "CheckOption7",
            Value: this.CheckOption7 == true ? "1" : "0",
          },
          {
            Column: "CheckOption8",
            Value: this.CheckOption8 == true ? "1" : "0",
          },
          { Column: "CheckOption9", Value: this.CheckOption9 },
          { Column: "CheckOption10", Value: this.CheckOption10 },
          { Column: "CheckOption11", Value: this.CheckOption11 },
          { Column: "CheckOption12", Value: this.CheckOption12 },
          { Column: "CheckOption13", Value: this.CheckOption13 },
          { Column: "CheckOption14", Value: this.CheckOption14 },
          { Column: "CheckOption15", Value: this.CheckOption15 },
          { Column: "CheckOption16", Value: this.CheckOption16 },
          { Column: "ObserName", Value: this.ObserName },
          { Column: "CheckMan", Value: this.CheckMan },
          { Column: "JobName", Value: this.JobName },
          { Column: "EmpName", Value: this.EmpName },
          { Column: "EmployeeYears", Value: this.EmployeeYears },
          { Column: "JobDesp", Value: this.JobDesp },
          { Column: "EmpDepartCode", Value: this.EmpDepartCode },
          { Column: "EmpDepartName", Value: this.EmpDepartName },
          { Column: "ObserDep", Value: this.EmpDepartName },
          { Column: "ObserId", Value: this.userData.UserId },
          { Column: "OccupUnit", Value: this.OccupUnit },
        ],
      })
        .then((res) => {
          console.log(res.data.DT);
        })
        .catch((err) => {
          console.log(err);
          alert("查詢時發生問題，請重新查詢!");
        })
        .finally(() => {
          this.chLoadingShow();
        });
      this.dialogShowAdd = false;
    },
    // 關閉 dialog
    close() {
      this.dialogShowAdd = false;
      this.dialogShowEdit = false;
      this.dialogDel = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.addItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    viewPage(item) {
      console.log("item: " + item);
      console.log("RPFlowNo: " + item.RPFlowNo);
      this.chLoadingShow();
      // 依業主要求變更檢式頁面的方式，所以改為另開分頁
      fetchFormOrderOne({
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.userData.UserId, // 操作人id
        KeyName: this.DB_Table, // DB table
        KeyItem: [{ Column: "RPFlowNo", Value: item.RPFlowNo }],
        QyName: [
          "CheckDay",
          "DepartName",
          "Name",
          "EmpDepartCode",
          "EmpDepartName",
          "CheckMan",
          "JobName",
          "EmpID",
          "EmpName",
          "EmployeeYears",
          "JobDesp",
          "ObserID",
          "ObserName",
          "OccupUnit",
          "CheckOption1",
          "CheckOption2",
          "CheckOption3",
          "CheckOption4",
          "CheckOption5",
          "CheckOption6",
          "CheckOption7",
          "CheckOption8",
          "CheckOption9",
          "CheckOption10",
          "CheckOption11",
          "CheckOption12",
          "CheckOption13",
          "CheckOption14",
          "CheckOption15",
          "CheckOption16",
        ],
      })
        .then((res) => {
          this.initInput();
          console.log(res.data.DT);
          let dat = JSON.parse(res.data.DT);
          console.log("data name: " + dat[0].Name);
          console.log("data time: " + dat[0].CheckDay);
          this.dialogShowAdd = true;
          // this.zs = res.data.DT.CheckDay
          this.doMan.name = dat[0].Name;
          let time1 = dat[0].CheckDay.substr(0, 10);
          console.log("data time1: " + time1);
          this.CheckDay = time1;
          //123資料
          this.CheckOption1 = dat[0].CheckOption1 == "1" ? true : false;
          this.CheckOption2 = dat[0].CheckOption2 == "1" ? true : false;
          console.log("CheckOption2: " + this.CheckOption2);
          this.CheckOption3 = dat[0].CheckOption3 == "1" ? true : false;
          this.CheckOption4 = dat[0].CheckOption4 == "1" ? true : false;
          this.CheckOption5 = dat[0].CheckOption5 == "1" ? true : false;
          this.CheckOption6 = dat[0].CheckOption6 == "1" ? true : false;
          this.CheckOption7 = dat[0].CheckOption7 == "1" ? true : false;
          this.CheckOption8 = dat[0].CheckOption8 == "1" ? true : false;
          this.CheckOption9 = dat[0].CheckOption9;
          this.CheckOption10 = dat[0].CheckOption10;
          this.CheckOption11 = dat[0].CheckOption11;
          this.CheckOption12 = dat[0].CheckOption12;
          this.CheckOption13 = dat[0].CheckOption13;
          this.CheckOption14 = dat[0].CheckOption14;
          this.CheckOption15 = dat[0].CheckOption15;
          this.CheckOption16 = dat[0].CheckOption16;
          this.ObserName = dat[0].ObserName;
          this.CheckMan = dat[0].CheckMan;
          this.JobName = dat[0].JobName;
          this.EmpName = dat[0].EmpName;
          this.EmployeeYears = dat[0].EmployeeYears;
          this.JobDesp = dat[0].JobDesp;
          this.EmpDepartCode = dat[0].EmpDepartCode;
          this.EmpDepartName = dat[0].EmpDepartName;
          this.ObserDep = dat[0].ObserDep;
          this.ObserId = dat[0].ObserId;
          this.OccupUnit = dat[0].OccupUnit;
        })
        .catch((err) => {
          console.log(err);
          alert("查詢時發生問題，請重新查詢!");
        })
        .finally(() => {
          this.chLoadingShow();
        });
    }, //viewPage
  },
};
</script>
