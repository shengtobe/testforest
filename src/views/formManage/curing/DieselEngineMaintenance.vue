<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2 label-title">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2 label-header">
      <!-- 保養日期起迄 -->
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
              clearable @click:clear="timeClean(1)"
            ></v-text-field>
          </template>
          <v-date-picker
            color="primary"
            v-model="ipt.dateStart"
            @input="time(1)"
            :max="dateAMax"
            locale="zh-tw"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>保養日期(迄)
        </h3>
        <v-menu
          v-model="dateMenuShow.end"
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
              clearable @click:clear="timeClean(2)"
            ></v-text-field>
          </template>
          <v-date-picker
            color="primary"
            v-model="ipt.dateEnd"
           @input="time(2)"
            :min="dateBMin"
            locale="zh-tw"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="8" md="9" align-self="end" class="mb-5 text-md-left">
        <v-btn dark large class="mr-3 mb-3 btn-search" @click="search">
          <v-icon>mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn elevation="2" large class="mb-3 btn-clear" @click="reset">
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
          elevation="3"
          dark
          large
          class="mr-3 mb-3 btn-add"
          @click="newOne"
        >
          <!-- @click="ShowDetailDialog = true" -->
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </v-col>
      <!-- 新增/修改保養資料 modal -->
      <v-dialog v-model="ShowDetailDialog" persistent max-width="600px">
        <v-card class="theme-card">
          <v-card-title class="white--text px-4 py-1">
            {{ action }}{{ title }}
            <v-spacer></v-spacer>
            <v-btn dark fab small text @click="close" class="mr-n2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <div class="px-6 py-4 label-header">
            <v-row>
              <!-- 保養日期 -->
              <v-col cols="8" sm="4">
                <v-menu
                  v-model="dialogDateMenuShow.enter"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      hide-details
                      v-model="CheckDay"
                      v-on="on"
                      label="保養日期"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    color="purple"
                    v-model="CheckDay"
                    @input="dialogDateMenuShow.enter = false"
                    locale="zh-tw"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <!-- 公里 -->
              <v-col cols="8" sm="4">
                <v-text-field
                  v-model="Km"
                  :rules="nameRules"
                  label="公里數"
                  placeholder="0"
                  required
                ></v-text-field>
              </v-col>
              <!-- 保養人 -->
              <v-col cols="8" sm="4">
                <v-text-field
                  hide-details
                  v-model="Name"
                  label="保養人"
                ></v-text-field>
              </v-col>
              <!-- 保養項目 -->
              <v-col cols="8" sm="12">
                <v-subheader
                  style="margin-left: -16px !important; margin-bottom: -25px"
                  >保養項目</v-subheader
                >
                <div class="pa-0">
                  <v-row justify="space-around">
                    <v-checkbox
                      class="mx-2"
                      v-model="checkbox.機油濾清器"
                      label="機油濾清器"
                    ></v-checkbox>
                    <v-checkbox
                      class="mx-2"
                      v-model="checkbox.柴油濾清器"
                      label="柴油濾清器"
                    ></v-checkbox>
                    <v-checkbox
                      class="mx-2"
                      v-model="checkbox.水泵濾清器"
                      label="水泵濾清器"
                    ></v-checkbox>
                  </v-row>
                </div>
              </v-col>
              <!-- 備註 -->
              <v-col cols="12">
                <v-textarea
                  hide-details
                  label="備註"
                  auto-grow
                  outlined
                  rows="6"
                  v-model.trim="Memo"
                ></v-textarea>
              </v-col>
            </v-row>
          </div>

          <v-card-actions class="px-5 pb-5">
            <v-btn
              v-if="action != actions.add"
              class="mr-2 btn-delete"
              elevation="4"
              @click="dialogDel = true"
              >刪除</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn class="mr-2 btn-close white--text" elevation="4" @click="ShowDetailDialog = false"
              >取消</v-btn
            >
            <v-btn
              class="btn-add white--text"
              elevation="4"
              :loading="isLoading"
              @click="save"
              >{{ action }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 刪除確認視窗 -->
      <v-dialog v-model="dialogDel" persistent max-width="290">
        <v-card class="theme-del-card">
          <v-card-title class="white--text px-4 py-1 headline"
            >確認是否刪除?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="btn-close white--text" @click="dialogDel = false">取消</v-btn>
            <v-btn
              class="btn-delete white--text"
              @click="deleteRecord(doMan.id, DB_Table, RPFlowNo)"
              >刪除</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 必填欄位空白提醒視窗 -->
      <v-dialog v-model="dialogNull" persistent max-width="290">
        <v-card class="theme-del-card">
          <v-card-title class="white--text px-4 py-1 headline"
            >請填妥必要欄位</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="btn-add white--text" @click="dialogNull = false">確定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
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
              title="編輯"
              class="btn-memo mr-2"
              small
              dark
              fab
              @click="viewPage(item)"
            >
              <!-- @click="dialogShowEdit = true" -->
              <v-icon dark>mdi-pen</v-icon>
            </v-btn>
            <v-btn
              title="刪除"
              small
              dark
              fab
              class="Btn-delete"
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
            <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
          </template>
        </v-data-table>
      </v-card>
    </v-col>
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
  updateFormOrder,
  deleteFormOrder,
} from "@/apis/formManage/serve";
import { formDepartOptions } from "@/assets/js/departOption";
import { Actions } from "@/assets/js/actions";
import { Constrant } from "@/assets/js/constrant";

export default {
  data: () => ({
    title: "柴油引擎保養",
    action: Actions.add,
    actions: Actions,
    newText: "保養資料",
    dateAMax: '',
    dateBMin: '',
    isLoading: false,
    disabled: false,
    DB_Table: "RP047",
    //
    RPFlowNo: "",
    nowTime: "",
    doMan: {
      id: "",
      name: "",
      depart: "",
      checkManName: "",
    },
    formDepartOptions: [
      // 通報單位下拉選單
      { text: "不限", value: "" },
      ...formDepartOptions,
    ],
    ipt: {
      dateStart: new Date().toISOString().substr(0, 10), // 通報日期(起)
      dateEnd: new Date().toISOString().substr(0, 10), // 通報日期(迄)
      Km: "",
      Item: "",
      Memo: "",
    },
    defaultIpt: {
      dateStart: "", // 通報日期(起)
      dateEnd: "", // 通報日期(迄)
      Km: "",
      Item: "",
      Memo: "",
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
      out: false,
    },
    editedItem: {
      Kilometer: 12044.3,
      enterDate: "2020-08-10",
      content: "更換引擎機油", // 維修項目
      user: "王大明",
    },
    addItem: {
      Kilometer: null,
      enterDate: "",
      content: "", // 維修項目
      user: "",
    },
    defaultItem: {
      Kilometer: 0,
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
    dialogShowAdd: false, // model off
    dialogShowEdit: false, // model off
    dialogDel: false, // model off
    dialogm1: "2020-08-01",
    tableItems: [
      // {
      //   date: "2020/08/01",
      //   kilometer: "12044.3",
      //   engine_oil: "V",
      //   diesel_oil: "V",
      //   water_pump: "V",
      //   name: "王大明",
      //   note: "更換引擎機油"
      // },
      // {
      //   date: "2020/08/05",
      //   kilometer: "43000",
      //   engine_oil: "V",
      //   diesel_oil: "V",
      //   water_pump: "V",
      //   name: "王大明",
      //   note: "三級保養更換"
      // },
      // {
      //   date: "2020/08/05",
      //   kilometer: "43000",
      //   engine_oil: "V",
      //   diesel_oil: "V",
      //   water_pump: "V",
      //   name: "王大明",
      //   note: "三級保養更換"
      // },
      // {
      //   date: "2020/08/05",
      //   kilometer: "43000",
      //   engine_oil: "V",
      //   diesel_oil: "V",
      //   water_pump: "V",
      //   name: "王大明",
      //   note: "三級保養更換"
      // },
      // {
      //   date: "2020/08/05",
      //   kilometer: "43000",
      //   engine_oil: "V",
      //   diesel_oil: "V",
      //   water_pump: "V",
      //   name: "王大明",
      //   note: "三級保養更換"
      // },
      // {
      //   date: "2020/08/05",
      //   kilometer: "43000",
      //   engine_oil: "V",
      //   diesel_oil: "V",
      //   water_pump: "V",
      //   name: "王大明",
      //   note: "三級保養更換"
      // },
      // {
      //   date: "2020/08/05",
      //   kilometer: "43000",
      //   engine_oil: "V",
      //   diesel_oil: "V",
      //   water_pump: "V",
      //   name: "王大明",
      //   note: "三級保養更換"
      // },
      // {
      //   date: "2020/08/05",
      //   kilometer: "43000",
      //   engine_oil: "V",
      //   diesel_oil: "V",
      //   water_pump: "V",
      //   name: "王大明",
      //   note: "三級保養更換"
      // },
      // {
      //   date: "2020/08/05",
      //   kilometer: "43000",
      //   engine_oil: "V",
      //   diesel_oil: "V",
      //   water_pump: "V",
      //   name: "王大明",
      //   note: "三級保養更換"
      // },
      // {
      //   date: "2020/08/05",
      //   kilometer: "43000",
      //   engine_oil: "V",
      //   diesel_oil: "V",
      //   water_pump: "V",
      //   name: "王大明",
      //   note: "三級保養更換"
      // },
      // {
      //   date: "2020/08/05",
      //   kilometer: "43000",
      //   engine_oil: "V",
      //   diesel_oil: "V",
      //   water_pump: "V",
      //   name: "王大明",
      //   note: "三級保養更換"
      // },
      // {
      //   date: "2020/08/05",
      //   kilometer: "43000",
      //   engine_oil: "V",
      //   diesel_oil: "V",
      //   water_pump: "V",
      //   name: "王大明",
      //   note: "三級保養更換"
      // },
      // {
      //   date: "2020/08/05",
      //   kilometer: "43000",
      //   engine_oil: "V",
      //   diesel_oil: "V",
      //   water_pump: "V",
      //   name: "王大明",
      //   note: "三級保養更換"
      // },
      // {
      //   date: "2020/08/05",
      //   kilometer: "43000",
      //   engine_oil: "V",
      //   diesel_oil: "V",
      //   water_pump: "V",
      //   name: "王大明",
      //   note: "三級保養更換"
      // },
      // {
      //   date: "2020/08/05",
      //   kilometer: "43000",
      //   engine_oil: "V",
      //   diesel_oil: "V",
      //   water_pump: "V",
      //   name: "王大明",
      //   note: "三級保養更換"
      // },
      // {
      //   date: "2020/08/05",
      //   kilometer: "43000",
      //   engine_oil: "V",
      //   diesel_oil: "V",
      //   water_pump: "V",
      //   name: "王大明",
      //   note: "三級保養更換"
      // }
    ], // 表格資料
    pageOpt: { page: 1 }, // 目前頁數
    headers: [
      // 表格顯示的欄位
      {
        text: "項次",
        value: "ItemNo",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "保養日期",
        value: "CheckDay",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "公里",
        value: "Km",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "機油濾清器",
        value: "機油濾清器",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "柴油濾清器",
        value: "柴油濾清器",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "水泵濾清器",
        value: "水泵濾清器",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "保養人",
        value: "Name",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "備註",
        value: "Memo",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "功能",
        value: "content",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
    ],
    dateMenuShow: {
      // 日曆是否顯示
      start: false,
      end: false,
    },
    dialogDateMenuShow: {
      // dialog 日期 menu 是否顯示
      enter: false,
      enters: false,
      out: false,
    },
    readonly: false,
    // controls for dialog
    ShowDetailDialog: false,
    dialogDel: false, // model off
    dialogNull: false,
    // fields for detail page
    CheckDay: "",
    Name: "",
    Km: null,
    Memo: "", // 維修項目
    checkbox: {
      機油濾清器: false,
      柴油濾清器: false,
      水泵濾清器: false,
    },
  }),
  components: { Pagination }, // 頁碼
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
      this.ipt = { ...this.defaultIpt };
    },
    initInput() {
      this.Name = this.doMan.name;
      this.CheckDay = getTodayDateString();
      this.Km = "";
      this.Memo = ""; // 維修項目
      this.checkbox.機油濾清器 = false;
      this.checkbox.柴油濾清器 = false;
      this.checkbox.水泵濾清器 = false;
    },
    newOne() {
      this.readonly = false;
      this.action = this.actions.add;
      this.ShowDetailDialog = true;
      this.initInput();
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 解析保養細項
    parseItem(item) {
      var res = {
        機油濾清器: false,
        柴油濾清器: false,
        水泵濾清器: false,
      };
      var tmp = item.split("/");
      for (let i = 0; i < tmp.length; i++) {
        switch (tmp[i]) {
          case "1":
            res.機油濾清器 = true;
            break;
          case "2":
            res.柴油濾清器 = true;
            break;
          case "3":
            res.水泵濾清器 = true;
            break;
          default:
            break;
        }
      }
      return res;
    },
    // 重組保養細項
    combineItem(機油濾清器, 柴油濾清器, 水泵濾清器) {
      var arr = [];
      if (機油濾清器) {
        arr = arr.concat("1");
      }
      if (柴油濾清器) {
        arr = arr.concat("2");
      }
      if (水泵濾清器) {
        arr = arr.concat("3");
      }
      return arr.join("/");
    },
    time(i){
      if(i == 1){
        this.dateMenuShow.start = false
        this.dateBMin = this.ipt.dateStart
      }
      else{
        this.dateMenuShow.end = false
        this.dateAMax = this.ipt.dateEnd
      }
    },
    timeClean(i){
      if(i == 1){
        this.dateBMin = ''
      }
      else{
        this.dateAMax = ''
      }
    },
    // 搜尋
    search() {
      this.chLoadingShow({show:true});
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.userData.UserId, // 操作人id
        KeyName: this.DB_Table, // DB table
        KeyItem: [
          { Column: "StartDayVlaue", Value: (this.ipt.dateStart == null)?'':this.ipt.dateStart },
          { Column: "EndDayVlaue", Value: (this.ipt.dateEnd == null)?'':this.ipt.dateEnd },
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
          "Km",
          "Item",
          "Memo",
          "CheckMan",
        ],
      })
        .then((res) => {
          let tbBuffer = JSON.parse(res.data.DT);
          let aa = unique(tbBuffer);

          aa.forEach((element) => {
            var items = this.parseItem(element.Item);
            element.機油濾清器 = items.機油濾清器 ? "V" : "";
            element.柴油濾清器 = items.柴油濾清器 ? "V" : "";
            element.水泵濾清器 = items.水泵濾清器 ? "V" : "";
          });
          this.tableItems = aa;
        })
        .catch((err) => {
          ////console.log(err);
          this.chMsgbar({ success: false, msg: Constrant.query.failed });
        })
        .finally(() => {
          this.chLoadingShow({ show: false});
        });
    },
    // 存
    save() {
      if (this.CheckDay == "" || this.Km == "") {
        this.dialogNull = true;
        return;
      }
      this.chLoadingShow({show:true});

      let arr = new Array();
      let obj = new Object();

      obj = new Object();
      obj.Column = "CheckDay";
      obj.Value = this.CheckDay;
      arr = arr.concat(obj);

      obj = new Object();
      obj.Column = "Km";
      obj.Value = this.Km;
      arr = arr.concat(obj);

      obj = new Object();
      obj.Column = "Item";
      obj.Value = this.combineItem(
        this.checkbox.機油濾清器,
        this.checkbox.柴油濾清器,
        this.checkbox.水泵濾清器
      );
      arr = arr.concat(obj);

      obj = new Object();
      obj.Column = "Memo";
      obj.Value = this.Memo;
      arr = arr.concat(obj);

      var data = {
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.userData.UserId, // 操作人id this.doMan.name = this.userData.UserName
        // OperatorID: "16713",  // 操作人id
        FunCode: 'C',
        KeyName: this.DB_Table, // DB table
        KeyItem: arr,
      };

      // 修改
      if (this.action == Actions.edit) {
        // update 要自行增加RPFlowNo欄位
        data.RPFlowNo = this.RPFlowNo;
        updateFormOrder(data)
          .then((res) => {
            this.chMsgbar({ success: true, msg: Constrant.update.success });
          })
          .catch((err) => {
            ////console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.update.failed });
          })
          .finally(() => {
            this.chLoadingShow({ show: false});
            this.search();
          });
      } else {
        // 新增
        createFormOrder0(data)
          .then((res) => {
            this.chMsgbar({ success: true, msg: Constrant.insert.success });
          })
          .catch((err) => {
            ////console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.insert.failed });
          })
          .finally(() => {
            this.chLoadingShow({ show: false});
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
      this.chLoadingShow({show:true});
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
          "Km",
          "Item",
          "Memo",
        ],
      })
        .then((res) => {
          this.initInput();
          let dat = JSON.parse(res.data.DT);
          let data = dat[0];
          //console.log("data name: " + dat[0].Name);
          //console.log("data time: " + dat[0].CheckDay);
          this.doMan.name = data.Name;
          this.CheckDay = data.CheckDay.substr(0, 10);

          this.Km = data.Km;
          var tmp = this.parseItem(data.Item);
          this.checkbox.機油濾清器 = tmp.機油濾清器;
          this.checkbox.柴油濾清器 = tmp.柴油濾清器;
          this.checkbox.水泵濾清器 = tmp.水泵濾清器;
          this.Memo = data.Memo;

          this.RPFlowNo = data.RPFlowNo;
          this.ShowDetailDialog = true;
        })
        .catch((err) => {
          ////console.log(err);
          alert("查詢時發生問題，請重新查詢!");
        })
        .finally(() => {
          this.chLoadingShow({ show: false});
        });
    }, //viewPage
    deleteRecord(UserId, DB_Table, RPFlowNo) {
      this.action = Actions.delete;
      this.chLoadingShow({show:true});
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
          ////console.log(err);
          this.chMsgbar({ success: false, msg: Constrant.delete.failed });
        })
        .finally(() => {
          this.chLoadingShow({ show: false});
          this.ShowDetailDialog = false;
          this.search();
        });
    },
  },
};
</script>