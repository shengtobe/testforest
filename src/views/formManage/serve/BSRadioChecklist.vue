<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2">
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>檢查日期(起)
        </h3>
        <v-menu
          v-model="datePickerShowControl.startDate"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model.trim="input.dateStart"
              solo
              v-on="on"
              readonly
            ></v-text-field>
          </template>
          <v-date-picker
            color="purple"
            v-model="input.dateStart"
            @input="datePickerShowControl.startDate = false"
            locale="zh-tw"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>檢查日期(迄)
        </h3>
        <v-menu
          v-model="datePickerShowControl.endDate"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model.trim="input.dateEnd"
              solo
              v-on="on"
              readonly
            ></v-text-field>
          </template>
          <v-date-picker
            color="purple"
            v-model="input.dateEnd"
            @input="datePickerShowControl.endDate = false"
            locale="zh-tw"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>管理單位
        </h3>
        <v-select :items="formDepartOptions" v-model="input.department" solo />
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
            <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
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
          <v-btn color="red" @click="deleteRecord">刪除</v-btn>
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
    <!-- 新增/編輯自動檢點表 modal -->
    <v-dialog v-model="ShowDetailDialog" max-width="700px">
      <v-card>
        <v-card-title class="blue white--text px-4 py-1">
          {{ action }}{{ title }}
          <v-spacer></v-spacer>
          <v-btn dark fab small text @click="close" class="mr-n2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <div class="px-6 py-4">
          <v-row>
            <v-col cols="12">
              <p>
                請於每月10日前完成車裝台、固定台檢查，每部設備使用1張檢查表。
              </p>
            </v-col>

            <!-- 檢查項目 -->
            <v-col cols="12">
              <v-row no-gutter class="indigo--text">
                <v-col cols="12" sm="6">
                  <h3 class="mb-1">設備</h3>
                  <v-radio-group
                    dense
                    row
                    class="pa-0 ma-0"
                    v-model="DeviceType"
                  >
                    <v-radio color="blue" label="車裝台" value="1"> </v-radio>
                    <v-radio
                      color="blue"
                      label="基地台無線電機"
                      value="2"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="6">
                  <h3 class="mb-1">編號(或機號)</h3>
                  <v-select
                    dense
                    single-line
                    :items="MachineID"
                    v-model="PAID"
                    outlined
                    :readonly="readonly"
                  />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">檢查日期</h3>
                  <v-menu
                    v-model="datePickerShowControl.checkDay"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="CheckDay"
                        solo
                        v-on="on"
                        readonly
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="CheckDay"
                      @input="datePickerShowControl.checkDay = false"
                      locale="zh-tw"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">使用單位</h3>
                  <v-text-field
                    v-model="DepartName"
                    required
                    :rules="nameRules"
                    solo
                  />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">機關(守)車</h3>
                  <v-text-field v-model="CarNo" solo value />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">檢查人員</h3>
                  <v-text-field
                    v-model="Name"
                    required
                    :rules="nameRules"
                    solo
                  />
                </v-col>
                <!-- <v-col cols="12" sm="4">
                  <h3 class="mb-1">單位主管</h3>
                  <v-text-field solo value />
                </v-col> -->
              </v-row>
              <v-expansion-panels :disabled="disabled" multiple>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text"
                    >無線電機(含電源供應器)</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="7">
                        <h3 class="mb-1">保養檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="5">
                        <h3 class="mb-1">檢查結果</h3>
                      </v-col>
                    </v-row>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in itemlist.items1"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="7">{{ item.description }}</v-col>
                        <v-col cols="12" sm="5">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="item.status"
                            class="pa-0 ma-0"
                            :rules="nameRules"
                            required
                          >
                            <v-radio
                              color="success"
                              label="正常"
                              value="1"
                            ></v-radio>
                            <v-radio
                              color="red"
                              label="不正常"
                              value="2"
                            ></v-radio>
                          </v-radio-group>
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text"
                    >天線組件</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="7">
                        <h3 class="mb-1">保養檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="5">
                        <h3 class="mb-1">檢查結果</h3>
                      </v-col>
                    </v-row>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in itemlist.items2"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="7">{{ item.description }}</v-col>
                        <v-col cols="12" sm="5">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="item.status"
                            class="pa-0 ma-0"
                          >
                            <v-radio
                              color="success"
                              label="正常"
                              value="1"
                            ></v-radio>
                            <v-radio
                              color="red"
                              label="不正常"
                              value="2"
                            ></v-radio>
                          </v-radio-group>
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text"
                    >電瓶、保險絲及電源線(車裝台免填)</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="7">
                        <h3 class="mb-1">保養檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="5">
                        <h3 class="mb-1">檢查結果</h3>
                      </v-col>
                    </v-row>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in itemlist.items3"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="7">{{ item.description }}</v-col>
                        <v-col cols="12" sm="5">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="item.status"
                            class="pa-0 ma-0"
                          >
                            <v-radio
                              color="success"
                              label="正常"
                              value="1"
                            ></v-radio>
                            <v-radio
                              color="red"
                              label="不正常"
                              value="2"
                            ></v-radio>
                          </v-radio-group>
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text"
                    >數位錄音設備（無者免填）</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="7">
                        <h3 class="mb-1">保養檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="5">
                        <h3 class="mb-1">檢查結果</h3>
                      </v-col>
                    </v-row>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in itemlist.items4"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="7">{{ item.description }}</v-col>
                        <v-col cols="12" sm="5">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="item.status"
                            class="pa-0 ma-0"
                          >
                            <v-radio
                              color="success"
                              label="正常"
                              value="1"
                            ></v-radio>
                            <v-radio
                              color="red"
                              label="不正常"
                              value="2"
                            ></v-radio>
                          </v-radio-group>
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
            <!-- 改善建議、改善追蹤 -->
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">不正常狀態及處理說明</h3>
              <v-textarea
                hide-details
                auto-grow
                outlined
                rows="4"
                v-model="Memo"
              />
            </v-col>
            <!-- END 檢查項目 -->
          </v-row>
        </div>

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
  </v-container>
</template>

<script>
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

class Question {
  constructor(description, status, note, required) {
    this.description = description;
    this.status = 0;
    this.note = "";
    this.required = required;
  }
}

export default {
  data() {
    return {
      title: "車裝台/基地台無線電機檢查紀錄表",
      action: Actions.add,
      actions: Actions,
      newText: "紀錄表",
      isLoading: false,
      disabled: false,
      MachineID: ["TRK-ALL-SLP-300", "TRK-ALL-SLP-312", "TRK-ALL-SLP-002"],
      ShowDetailDialog: false,
      dialog3: false,
      pageOpt: { page: 1 }, // 目前頁數

      //---api---
      DB_Table: "RP020",
      RPFlowNo: "",
      nowTime: "",
      doMan: {
        id: "",
        name: "",
        depart: "",
        departId: "",
        checkManName: "",
      },
      ipt2: {},
      defaultIpt: {
        dateStart: "", // 通報日期(起)
        dateEnd: "", // 通報日期(迄)
        case: "",
        eqLoss: "",
        departName: "",
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

      // all columns for this page
      ColumnsForDetailPage: [
        "Name",
        "RPFlowNo",
        "CheckDay",
        "DeviceType",
        "CarNo",
        "PAID",
        "DepartName",
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
        "CheckOption17",
        "CheckOption18",
        "Memo",
      ],

      // fields for detail page
      Name: "",
      DepartName: "",
      CheckDay: "",
      DeviceType: "",
      PAID: "",
      CarNo: "",
      readonly: false,

      // controls for dialog
      ShowDetailDialog: false,
      dialogDel: false, // model off
      dialogNull: false,

      // controls for date picker
      datePickerShowControl: {
        startDate: false,
        endDate: false,
        checkDate: false,
      },

      itemlist: {
        items1: [
          //無線電機(含電源供應器)
          new Question("1. 無線電機、電源供應器之清潔", "0", "", true),
          new Question("2. 外觀檢查(面板、旋鈕等)", "0", "", true),
          new Question(
            "3. 麥克風纜線是否完好、按鍵功能是否正常",
            "0",
            "",
            true
          ),
          new Question("4. 天線纜線接頭是否鬆動", "0", "", true),
          new Question("5. 電源線是否鎖緊在電源供應器之接點上 ", "0", "", true),
          new Question("6. 接收功能是否正常檢查", "0", "", true),
          new Question("7. 發射功能是否正常檢查", "0", "", true),
        ],
        items2: [
          //天線組件
          new Question("1. 天線及固定支架外觀檢查", "0", "", true),
          new Question("2. 纜線穿牆進入辦公室之防水滲漏檢查", "0", "", true),
        ],
        items3: [
          //電瓶、保險絲及電源線(車裝台免填)
          new Question("1. 保險絲檢查"),
          new Question("2. 電瓶是否堪用、有無變形，樁頭有無生銅鏽"),
          new Question("3. 連接線是否鬆動檢查鎖緊"),
          new Question("4. 停電電源自動切換檢查"),
        ],
        items4: [
          //數位錄音設備（無者免填）
          new Question("1. 設備外觀之清潔及線路接檢查"),
          new Question("2. 硬碟容量檢查"),
          new Question("3. 系統時間檢查"),
          new Question("4. 錄音系統錄音測試"),
          new Question("5. 錄音系統放音測試"),
        ],
      },
      Memo: "", // 改善建議
      nameRules: [(v) => !!v || "不可空白"],
      input: {
        dateStart: new Date().toISOString().substr(0, 10), // 通報日期(起)
        dateEnd: new Date().toISOString().substr(0, 10), // 通報日期(迄)
        case: "",
        eqLoss: "",
        departName: "",
      },
      formDepartOptions: [
        // 通報單位下拉選單
        { text: "不限", value: "" },
        ...formDepartOptions,
      ],
    };
  },
  components: { Pagination }, // 頁碼
  computed: {
    ...mapState("user", {
      userData: (state) => state.userData, // 使用者基本資料
    }),
  },
  // page init
  created() {
    this.ipt2 = { ...this.defaultIpt };
    this.nowTime = getTodayDateString();
    this.doMan.name = this.userData.UserName;
    this.doMan.id = this.userData.UserId;
    this.doMan.depart = this.userData.DeptList[0].DeptDesc;
    this.doMan.departId = this.userData.DeptList[0].DeptId;
  },
  methods: {
    ...mapActions("system", [
      "chMsgbar", // messageBar
      "chLoadingShow", // 切換 loading 圖顯示
    ]),
    // 清除搜尋內容
    reset() {
      this.input = { ...this.defaultIpt };
    },
    initInput() {
      this.Name = this.doMan.name;
      this.DepartName = this.doMan.depart;
      this.CheckDay = getTodayDateString();
      this.DeviceType = "";
      this.CarNo = "";
      this.PAID = "";
      this.Memo = "";
      for (var items in this.itemlist) {
        const element = this.itemlist[items];
        element.forEach((item) => {
          item.status = "0";
          item.note = "";
        });
      }
    },
    newOne() {
      this.action = Actions.add;
      this.readonly = false;
      this.ShowDetailDialog = true;
      console.log("this.ShowDetailDialog: " + this.ShowDetailDialog);
      this.initInput();
    },

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
          { Column: "StartDayVlaue", Value: this.input.dateStart },
          { Column: "EndDayVlaue", Value: this.input.dateEnd },
          { Column: "DepartCode", Value: this.input.department },
        ],
        QyName: [
          "RPFlowNo",
          "ID",
          "DepartCode",
          "DepartName",
          "Name",
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
          this.chMsgbar({ success: false, msg: Constrant.query.failed });
        })
        .finally(() => {
          console.log("search final");
          this.chLoadingShow();
        });
    },
    // 存
    save() {
      console.log("送出!!");
      this.chLoadingShow();

      var data = {
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.doMan.id, // 操作人id this.doMan.name = this.userData.UserName
        // OperatorID: "16713",  // 操作人id
        KeyName: this.DB_Table, // DB table
        KeyItem: [
          { Column: "CheckDay", Value: this.CheckDay },
          { Column: "DeviceType", Value: this.DeviceType },
          { Column: "CarNo", Value: this.CarNo },
          { Column: "PAID", Value: this.PAID },
          { Column: "Memo", Value: this.Memo },
        ],
      };

      // 加入CheckOption1~18的值
      let j = 1;
      for (var items in this.itemlist) {
        const element = this.itemlist[items];
        element.forEach((item) => {
          var obj = new Object();
          obj.Column = "CheckOption" + j;
          obj.Value = item.status;
          data.KeyItem.push(obj);
          j++;
        });
      }

      // TODO: 必要欄位檢查
      // if (data.CheckDay == "" || this.AlarmDay == "" || this.Name == "") {
      //   this.dialogNull = true;
      //   return;
      // }

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
        OperatorID: this.doMan.id, // 操作人id
        KeyName: this.DB_Table, // DB table
        KeyItem: [{ Column: "RPFlowNo", Value: item.RPFlowNo }],
        QyName: this.ColumnsForDetailPage,
      })
        .then((res) => {
          this.initInput();
          // console.log("Raw response data");
          // console.log(res.data.DT);
          let dat = JSON.parse(res.data.DT);
          let data = dat[0];
          // console.log("Parsed JSON object");
          // console.log(data);
          this.Name = data.Name;
          this.CheckDay = data.CheckDay.substr(0, 10);
          this.DeviceType = data.DeviceType;
          this.CarNo = data.CarNo;
          this.PAID = data.PAID;
          this.DepartName = data.DepartName;
          this.RPFlowNo = data.RPFlowNo;
          this.Memo = data.Memo;

          let j = 1;
          for (var items in this.itemlist) {
            const element = this.itemlist[items];
            element.forEach((item) => {
              let key = "CheckOption" + j;
              item.status = data[key];
              j++;
            });
          }
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
    deleteRecord() {
      console.log("Delete click");
      this.action = Actions.delete;
      console.log("RPFlowNo: " + this.RPFlowNo);
      this.chLoadingShow();
      deleteFormOrder({
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.doMan.id, // 操作人id
        KeyName: this.DB_Table, // DB table
        RPFlowNo: this.RPFlowNo,
        KeyItem: [{ Column: "RPFlowNo", Value: this.RPFlowNo }],
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
