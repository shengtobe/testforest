<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">{{ title }}</h2>
    <v-row class="px-2">
      <!-- 第一排選項 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>保養日期(起)
        </h3>
        <v-menu
          v-model="dateMenuShow.start"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model.trim="ipt.dateStart"
              solo
              v-on="on"
              readonly
            ></v-text-field>
          </template>
          <v-date-picker
            color="purple"
            v-model="ipt.dateStart"
            @input="dateMenuShow.start = false"
            locale="zh-tw"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>保養日期(迄)
        </h3>
        <v-menu
          v-model="dateMemuShow.end"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model.trim="ipt.dateEnd"
              solo
              v-on="on"
              readonly
            ></v-text-field>
          </template>
          <v-date-picker
            color="purple"
            v-model="ipt.dateEnd"
            @input="dateMemuShow.end = false"
            locale="zh-tw"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>選擇車輛編號
        </h3>
        <v-select
          v-model="ipt.case"
          :items="[
            { text: 'A0001', value: 'A' },
            { text: 'A0002', value: 'B' },
            { text: 'A0003', value: 'C' },
            { text: 'A0004', value: 'D' },
            { text: 'A0005', value: 'E' },
          ]"
          solo
        />
      </v-col>
      <div class="col-sm-4 col-md-8 col-12">
        <v-btn
          color="green"
          dark
          large
          class="col-4 col-md-2 mr-3"
          @click="disabled = false"
        >
          <v-icon>mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn
          color="indigo"
          elevation="3"
          dark
          large
          class="col-4 col-md-3 mr-3"
          @click="newOne"
        >
          <!-- @click="Add = true" -->
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </div>
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
              title="編輯"
              class="mr-2"
              small
              dark
              fab
              color="info darken-1"
              @click="viewPage(item)"
            >
              <!-- @click="Add = true" -->
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

      <v-col cols="12" sm="12" md="12">
        <span>
          備註：
          <br />（一）使用時數達<strong>40小時</strong>應將空氣濾清器芯子拆下清理﹔使用時數達<strong>180小時</strong>應進行機油更換；使用時數達<strong>250小時</strong>，應將機油濾清芯子、柴油濾清芯子與空氣濾清芯子換新。
          <br />（二）本項保養作業由司機或車庫檢修人員擔任，經車庫長監督後，記錄表由車庫存查。
          <br />（三）工作記號說明：實施完畢者。
        </span>
      </v-col>
      <!-- 新增保養資料 modal -->
      <v-dialog v-model="Add" max-width="600px">
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
              <!-- 保養日期 -->
              <v-col cols="8" sm="4">
                <h3 class="mb-1">保養日期</h3>
                <v-menu
                  v-model="dialogDateMenuShow.enters"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field hide-details v-on="on" solo />
                  </template>
                  <v-date-picker
                    color="purple"
                    v-model="addItem.enterDate"
                    @input="dialogDateMenuShow.enters = false"
                    locale="zh-tw"
                  />
                </v-menu>
              </v-col>
              <!-- 使用時數(hr) -->
              <v-col cols="8" sm="4">
                <h3 class="mb-1">使用時數(hr)</h3>
                <v-text-field
                  v-model="addItem.Kilometer"
                  :rules="nameRules"
                  required
                  solo
                />
              </v-col>
              <!-- 累計使用時數 -->
              <v-col cols="8" sm="4">
                <h3 class="mb-1">累計使用時數</h3>
                <v-text-field
                  v-model="addItem.Kilometers"
                  :rules="nameRules"
                  required
                  solo
                />
              </v-col>

              <!-- 保養人 -->
              <v-col cols="8" sm="4">
                <h3 class="mb-1">保養人</h3>
                <v-text-field v-model="addItem.user" solo />
              </v-col>
              <!-- 車庫主管 -->
              <v-col cols="8" sm="4">
                <h3 class="mb-1">車庫主管</h3>
                <v-text-field v-model="addItem.user" solo />
              </v-col>
              <!-- 保養項目 -->
              <v-col cols="10">
                <h3 class="mb-1">保養項目</h3>
                <v-row class="ml-1" style="justify-content: left">
                  <v-checkbox
                    class="mr-3"
                    v-model="aas"
                    label="機油更換"
                    value="A"
                  />
                  <v-checkbox
                    class="mr-3"
                    v-model="bbs"
                    label="機油濾清芯子換新"
                    value="B"
                  />
                  <v-checkbox
                    class="mr-3"
                    v-model="ccs"
                    label="柴油濾清芯子換新"
                    value="C"
                  />
                  <v-checkbox
                    class="mr-3"
                    v-model="dds"
                    label="空氣濾清芯子換新"
                    value="E"
                  />
                </v-row>
              </v-col>
            </v-row>
            <hr />
          </div>
          <!-- 輸出/取消 -->
          <v-card-actions class="px-5 pb-5">
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
import { evtTypes, locationOpts } from "@/assets/js/smisData";
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from "vuex";
import {
  getNowFullTime,
  getTodayDateString,
  unique,
} from "@/assets/js/commonFun";
import { maintainStatusOpts } from "@/assets/js/workList";
import {
  fetchFormOrderList,
  fetchFormOrderOne,
  createFormOrder,
  createFormOrder0,
} from "@/apis/formManage/serve";
import { formDepartOptions } from "@/assets/js/departOption";

export default {
  data: () => ({
    title: "柴油液力機車發電機檢修",
    newText: "檢修紀錄",
    isLoading: false,
    disabled: false,
    aas: "",
    bbs: "",
    ccs: "",
    dds: "",
    formDepartOptions: [
      // 通報單位下拉選單
      { text: "不限", value: "" },
      ...formDepartOptions,
    ],
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
    nameRules: [
      (v) => !!v || "公里數必須填寫",
      (v) => v.length > 0 || "公里數必須大於0",
    ],
    dialogForm: {},
    mainLocation: "", // 所選的地點
    OLocation: "", // 其他地點
    Add: false, // model off
    dialogShowEdit: false, // model off
    dialogDel: false, // model off
    dialogm1: "2020-08-01",
    aa: "",
    bb: "",
    cc: "",
    disabled: true,
    pageOpt: { page: 1 }, // 目前頁數
    //---api---
    DB_Table: "RP001",
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
  }),
  components: { Pagination }, // 頁碼
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
      this.zs = this.nowTime;
      var step;
      for (step = 0; step < 7; step++) {
        this.ipt.items[step].status = "0";
        this.ipt.items[step].note = "";
      }
      this.Advice = "";
      this.Measures = "";
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
      console.log("newOne23");
      this.Add = true;
      console.log("this.Add: " + this.Add);
      this.initInput();
    },
    // 更新資料
    update() {
      this.$emit("chLocation", {});
    },
    ...mapActions("system", [
      "chLoadingShow", // 切換 loading 圖顯示
    ]),
    // 更換頁數
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
          { Column: "StartDayVlaue", Value: this._data.z },
          { Column: "EndDayVlaue", Value: this._data.df },
          { Column: "DepartCode", Value: this._data.ipt2.depart },
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
          alert("查詢時發生問題，請重新查詢!");
        })
        .finally(() => {
          console.log("search final");
          this.chLoadingShow();
        });
    },
    // 存
    save() {},
    // 關閉 dialog
    close() {
      this.Add = false;
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
          "CheckMan",
          "CheckOption1",
          "Memo_1",
          "CheckOption2",
          "Memo_2",
          "CheckOption3",
          "Memo_3",
          "Advice",
          "Measures",
        ],
      })
        .then((res) => {
          this.initInput();
          console.log(res.data.DT);
          let dat = JSON.parse(res.data.DT);
          console.log("data name: " + dat[0].Name);
          console.log("data time: " + dat[0].CheckDay);
          this.Add = true;
          // this.zs = res.data.DT.CheckDay
          this.doMan.name = dat[0].Name;
          let time1 = dat[0].CheckDay.substr(0, 10);
          console.log("data time1: " + time1);
          this.zs = time1;
          console.log("doMan name: " + this.doMan.name);
          //123資料
          let ad = Object.keys(dat[0]);
          console.log(ad);
          var i = 0,
            j = 0;
          for (let key of Object.keys(dat[0])) {
            if (i > 3 && i < 52) {
              if (i % 2 == 0) {
                this.ipt.items[j].status = dat[0][key];
              } else {
                this.ipt.items[j].note = dat[0][key];
                j++;
              }
            }
            i++;
          }
          this.memo_2 = dat[0].Advice;
          this.memo_3 = dat[0].Measures;
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
