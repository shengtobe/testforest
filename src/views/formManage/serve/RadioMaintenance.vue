<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2 mb-8">
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
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>輸入編號(或機號)
        </h3>
        <v-select :items="MachineID" v-model="input.PAID" solo />
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <deptSelect label="管理單位" v-model="input.department" :iconYN="formIconShow" outType="key" key="department"/>
      </v-col>

      <v-col cols="12" sm="8" md="9" align-self="end" class="mb-5 text-md-left">
        <v-btn color="green" dark large class="mr-3 mb-3" @click="search">
          <v-icon>mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn elevation="2" large class="mb-3" @click="reset">
          <v-icon>mdi-reload</v-icon>清除搜尋內容
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        sm="8"
        md="3"
        align-self="end"
        class="mb-5 text-md-right"
      >
        <v-btn
          color="indigo"
          elevation="3"
          dark
          large
          class="mr-3 mb-3"
          @click="newOne"
        >
          <!-- @click="ShowDetailDialog = true" -->
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </v-col>

      <!-- 手攜無線電保養紀錄 -->
      <v-col cols="12">
        <v-card>
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
                <v-icon dark>mdi-pen</v-icon>
              </v-btn>
              <v-btn
                title="刪除"
                small
                dark
                fab
                color="red"
                @click="
                  dialogDel = true;
                  RPFlowNo = item.RPFlowNo;
                "
              >
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>
            </template>

            <!-- 頁碼 -->
            <template v-slot:footer="footer">
              <Pagination
                :footer="footer"
                :pageOpt="pageOpt"
                @chPage="chPage"
              />
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <!-- 刪除確認視窗 -->
      <v-dialog v-model="dialogDel" persistent max-width="290">
        <v-card>
          <v-card-title class="red white--text px-4 py-1 headline"
            >確認是否刪除?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialogDel = false">取消</v-btn>
            <v-btn
              color="red"
              @click="deleteRecord(doMan.id, DB_Table, RPFlowNo)"
              >刪除</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 必填欄位空白提醒視窗 -->
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
      <!-- 新增/修改保養項目 modal -->
      <v-dialog v-model="ShowDetailDialog" max-width="600px">
        <v-card>
          <!-- 標題 -->
          <v-card-title class="blue white--text px-4 py-1">
            {{ action }}{{ title }}
            <v-spacer />
            <v-btn dark fab small text @click="close" class="mr-n2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <!-- 內容 -->
          <div class="px-6 py-4">
            <v-row>
              <!-- 外觀 -->
              <h3 class="mb-1"><span color="red">*</span>編號(或機號)</h3>
              <v-select
                dense
                single-line
                :items="MachineID"
                v-model="PAID"
                outlined
                :readonly="readonly"
                required
                :rules="nameRules"
              />
              <v-col cols="8" sm="6">
                <h3 class="mb-1">
                  <span color="red">*</span>外觀檢查(面板、旋鈕等)
                </h3>
                <v-radio-group
                  row
                  v-model="mainLocation1"
                  required
                  :rules="nameRules"
                >
                  <v-radio label="正常" color="success" value="1"></v-radio>
                  <v-radio label="不正常" color="red" value="2"></v-radio>
                </v-radio-group>
              </v-col>
              <!-- 出廠日期 -->
              <v-col cols="8" sm="6">
                <h3 class="mb-1"><span color="red">*</span>檢查天線是否斷裂</h3>
                <v-radio-group
                  row
                  v-model="mainLocation2"
                  required
                  :rules="nameRules"
                >
                  <v-radio label="正常" color="success" value="1"></v-radio>
                  <v-radio label="不正常" color="red" value="2"></v-radio>
                </v-radio-group>
              </v-col>
              <!-- 電池接點是否生銅繡 -->
              <v-col cols="8" sm="6">
                <h3 class="mb-1">
                  <span color="red">*</span>電池接點是否生銅繡
                </h3>
                <v-radio-group
                  row
                  v-model="mainLocation3"
                  required
                  :rules="nameRules"
                >
                  <v-radio label="正常" color="success" value="1"></v-radio>
                  <v-radio label="不正常" color="red" value="2"></v-radio>
                </v-radio-group>
              </v-col>
              <!-- 充電座指示燈亮否、功能是否正常 -->
              <v-col cols="8" sm="6">
                <h3 class="mb-1">
                  <span color="red">*</span>
                  充電座指示燈亮否、功能是否正常
                </h3>
                <v-radio-group
                  row
                  v-model="mainLocation4"
                  required
                  :rules="nameRules"
                >
                  <v-radio label="正常" color="success" value="1"></v-radio>
                  <v-radio label="不正常" color="red" value="2"></v-radio>
                </v-radio-group>
              </v-col>
              <!-- 接收功能是否正常檢查 -->
              <v-col cols="8" sm="6">
                <h3 class="mb-1">
                  <span color="red">*</span>接收功能是否正常檢查
                </h3>
                <v-radio-group
                  row
                  v-model="mainLocation5"
                  required
                  :rules="nameRules"
                >
                  <v-radio label="正常" color="success" value="1"></v-radio>
                  <v-radio label="不正常" color="red" value="2"></v-radio>
                </v-radio-group>
              </v-col>
              <!-- 不正常狀況及處理說明 -->
              <v-col cols="12">
                <h3 class="mb-1">不正常狀況及處理說明</h3>
                <v-textarea
                  hide-details
                  auto-grow
                  outlined
                  rows="3"
                  v-model.trim="addItem.content"
                />
              </v-col>
            </v-row>
          </div>
          <!-- 輸出/取消 -->
          <v-card-actions class="px-5 pb-5">
            <v-btn
              v-if="action != actions.add"
              class="mr-2"
              elevation="4"
              color="red"
              @click="dialogDel = true"
              >刪除</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn class="mr-2" elevation="4" @click="ShowDetailDialog = false"
              >取消</v-btn
            >
            <v-btn
              color="success"
              elevation="4"
              :loading="isLoading"
              @click="save"
              >{{ action }}</v-btn
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
    title: "手攜無線電機檢查紀錄表",
    action: Actions.add,
    actions: Actions,
    newText: "紀錄表",
    isLoading: false,
    disabled: false,
    PAID: "",
    //---api---
    DB_Table: "RP018",
    //
    RPFlowNo: "",
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
      dateStart: "", // 通報日期(起)
      dateEnd: "", // 通報日期(迄)
      case: "",
      eqLoss: "",
      PAID: "",
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
        text: "檢查日期",
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
        text: "檢查單位",
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
    MachineID: ["", "TRK-ALL-SLP-300", "TRK-ALL-SLP-312", "TRK-ALL-SLP-002"],
    input: {
      dateStart: new Date().toISOString().substr(0, 10), // 通報日期(起)
      dateEnd: new Date().toISOString().substr(0, 10), // 通報日期(迄)
      case: "",
      eqLoss: "",
      PAID: "",
    },
    formIconShow: true,
    dateMenuShow: {
      // 日曆是否顯示
      start: false,
      end: false,
    },
    formDepartOptions: [
      // 通報單位下拉選單
      { text: "不限", value: "" },
      ...formDepartOptions,
    ],
    dialogDateMenuShow: {
      // dialog 日期 menu 是否顯示
      enter: false,
      enters: false,
      out: false,
    },
    editedItem: {
      Kilometer: 12044.3,
      enterDate: "2020-08-10",
      content: "更換引擎機油", // 維修項目
      startday: "2020-08-10",
      user: "王大明",
    },
    addItem: {
      Kilometer: null,
      enterDate: "",
      content: "", // 維修項目 enterDates: "", user: ""
    },
    defaultItem: {
      Kilometer: 0,
      enterDate: "2020-08-10",
      content: "", // 維修項目
      user: "",
    },
    nameRules: [
      (v) => !!v || "不可空白",
      //(v) => !!v || "公里數必須填寫",
      //(v) => v.length > 0 || "公里數必須大於0",
    ],
    dialogForm: {},
    mainLocation1: "", // 所選的地點
    mainLocation2: "", // 所選的地點
    mainLocation3: "", // 所選的地點
    mainLocation4: "", // 所選的地點
    mainLocation5: "", // 所選的地點
    OLocation: "", // 其他地點
    dialogShowEdit: false, // model off
    dialogDel: false, // model off
    dialogm1: "2020-08-01",
    aa: "",
    bb: "",
    cc: "",
    disabled: true,
    pageOpt: { page: 1 }, // 目前頁數
    readonly: false,
    // controls for dialog
    ShowDetailDialog: false,
    dialogDel: false, // model off
    dialogNull: false,
  }),
  components: { Pagination, dateSelect, deptSelect }, // 頁碼
  computed: {
    ...mapState("user", {
      userData: (state) => state.userData, // 使用者基本資料
    }),
  },
  created() {
    this.input = { ...this.defaultIpt };
    //更新時間
    this.nowTime = getTodayDateString();
    this.doMan.name = this.userData.UserName;
    this.doMan.id = this.userData.UserId;
    this.doMan.depart = this.userData.DeptList[0].DeptDesc;
    this.doMan.departId = this.userData.DeptList[0].DeptId;
  },

  methods: {
    // 更新資料
    update() {
      this.$emit("chLocation", {});
    },
    ...mapActions("system", [
      "chMsgbar", // messageBar
      "chLoadingShow", // 切換 loading 圖顯示
    ]),
    // 清除搜尋內容
    reset() {
      this.input = { ...this.defaultIpt };
    },
    // 更換頁數
    initInput() {
      console.log("init create window form");
      this.Name = this.doMan.name;
      // this.zs = this.nowTime;
      this.PAID = "";
      this.mainLocation1 = "";
      this.mainLocation2 = "";
      this.mainLocation3 = "";
      this.mainLocation4 = "";
      this.mainLocation5 = "";
      this.addItem.content = "";
    },
    newOne() {
      this.readonly = false;
      this.action = Actions.add;
      this.ShowDetailDialog = true;
      this.initInput();
    },
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 搜尋
    search() {
      console.log("Search click");
      this.chLoadingShow();
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.userData.UserId, // 操作人id
        KeyName: this.DB_Table, // DB table
        KeyItem: [
          { Column: "StartDayVlaue", Value: this.input.dateStart },
          { Column: "EndDayVlaue", Value: this.input.dateEnd },
          { Column: "PAID", Value: this.input.PAID },
          { Column: "DepartCode", Value: this.input.case },
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
          "CheckDay",
          "CheckStatus",
          "FlowId",
          "DepartName",
        ],
      })
        .then((res) => {
          let tbBuffer = JSON.parse(res.data.DT);
          let aa = unique(tbBuffer);
          this.tableItems = aa;
        })
        .catch((err) => {
          console.log(err);
          this.chMsgbar({ success: false, msg: Constrant.query.failed });
        })
        .finally(() => {
          console.log("search final");
          this.chLoadingShow();
        });
    },
    // 存
    save() {
      if (
        this.PAID == "" ||
        this.mainLocation1 == "" ||
        this.mainLocation2 == "" ||
        this.mainLocation3 == "" ||
        this.mainLocation4 == "" ||
        this.mainLocation5 == ""
      ) {
        this.dialogNull = true;
        return;
      }

      console.log("送出!!");
      this.chLoadingShow();

      let arr = new Array();
      let obj = new Object();

      obj = new Object();
      obj.Column = "CheckDay";
      obj.Value = this.nowTime;
      arr = arr.concat(obj);

      let i;

      obj = new Object();
      obj.Column = "PAID";
      obj.Value = this.PAID;
      arr = arr.concat(obj);
      obj = new Object();
      obj.Column = "CheckOption1";
      obj.Value = this.mainLocation1;
      arr = arr.concat(obj);
      obj = new Object();
      obj.Column = "CheckOption2";
      obj.Value = this.mainLocation2;
      arr = arr.concat(obj);
      obj = new Object();
      obj.Column = "CheckOption3";
      obj.Value = this.mainLocation3;
      arr = arr.concat(obj);
      obj = new Object();
      obj.Column = "CheckOption4";
      obj.Value = this.mainLocation4;
      arr = arr.concat(obj);
      obj = new Object();
      obj.Column = "CheckOption5";
      obj.Value = this.mainLocation5;
      arr = arr.concat(obj);
      obj = new Object();
      obj.Column = "Memo";
      obj.Value = this.addItem.content;
      arr = arr.concat(obj);

      var data = {
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.userData.UserId, // 操作人id this.doMan.name = this.userData.UserName
        // OperatorID: "16713",  // 操作人id
        KeyName: this.DB_Table, // DB table
        KeyItem: arr,
      };
      // 修改
      if (this.action == Actions.edit) {
        // update 要自行增加RPFlowNo欄位
        data.RPFlowNo = this.RPFlowNo;
        console.log(data);
        updateFormOrder(data)
          .then((res) => {
            console.log(res.data.DT);
            this.chMsgbar({ success: true, msg: Constrant.update.success });
          })
          .catch((err) => {
            console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.update.failed });
          })
          .finally(() => {
            this.chLoadingShow();
          });
      } else {
        // 新增
        createFormOrder0(data)
          .then((res) => {
            console.log(res.data.DT);
            this.chMsgbar({ success: true, msg: Constrant.insert.success });
          })
          .catch((err) => {
            console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.insert.failed });
          })
          .finally(() => {
            this.chLoadingShow();
            this.search();
          });
      }
      this.ShowDetailDialog = false;
    },
    // 關閉 dialog
    close() {
      this.ShowDetailDialog = false;
      this.dialogShowEdit = false;
      this.dialogDel = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.addItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    viewPage(item) {
      this.action = Actions.edit;
      this.readonly = true;
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
          "RPFlowNo",
          "CheckDay",
          "DepartName",
          "Name",
          "CheckMan",
          "PAID",
          "CheckOption1",
          "CheckOption2",
          "CheckOption3",
          "CheckOption4",
          "CheckOption5",
          "Memo",
        ],
      })
        .then((res) => {
          this.initInput();
          console.log(res.data.DT);
          let dat = JSON.parse(res.data.DT);
          let data = dat[0];
          // console.log("data name: " + data.Name);
          // console.log("data time: " + data.CheckDay);
          this.doMan.name = data.Name;
          let time1 = data.CheckDay.substr(0, 10);
          //console.log("data time1: " + time1);
          this.zs = time1;
          //console.log("doMan name: " + this.doMan.name);
          //123資料
          this.PAID = data.PAID;
          this.mainLocation1 = data.CheckOption1;
          this.mainLocation2 = data.CheckOption2;
          this.mainLocation3 = data.CheckOption3;
          this.mainLocation4 = data.CheckOption4;
          this.mainLocation5 = data.CheckOption5;
          this.addItem.content = data.Memo;

          this.RPFlowNo = data.RPFlowNo;
          this.ShowDetailDialog = true;
        })
        .catch((err) => {
          console.log(err);
          this.chMsgbar({ success: false, msg: Constrant.query.failed });
        })
        .finally(() => {
          this.chLoadingShow();
        });
    }, //viewPage
    deleteRecord(UserId, DB_Table, RPFlowNo) {
      this.action = Actions.delete;
      this.chLoadingShow();
      deleteFormOrder({
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: UserId, // 操作人id
        KeyName: DB_Table, // DB table
        RPFlowNo: RPFlowNo,
        KeyItem: [{ Column: "RPFlowNo", Value: RPFlowNo }],
      })
        .then((res) => {
          this.dialogDel = false;
          this.chMsgbar({ success: true, msg: Constrant.delete.success });
        })
        .catch((err) => {
          console.log(err);
          this.chMsgbar({ success: false, msg: Constrant.delete.failed });
        })
        .finally(() => {
          this.chLoadingShow();
          this.ShowDetailDialog = false;
          this.search();
        });
    },
  },
};
</script>
<style>
.mb-1 {
  margin-top: 1%;
}
</style>