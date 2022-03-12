<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2 label-title">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2 label-header">
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="保養日期(起)"
          key="dateStart"
          :showIcon="formData.settings.formIconShow"
          v-model="formData.searchItem.dateStart"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="保養日期(迄)"
          key="dateEnd"
          :showIcon="formData.settings.formIconShow"
          v-model="formData.searchItem.dateEnd"
        />
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>選擇車號
        </h3>
        <v-select
          v-model="formData.searchItem.carNo"
          v-on:change="search()"
          :items="carNos"
          solo
        />
      </v-col>
      <ToolBar
        @search="search"
        @reset="reset"
        @newOne="newOne"
        :text="newText"
      />
      <!-- 車歷卡資料 -->
      <v-col cols="12" sm="12" md="12">
        <v-expansion-panels :disabled="disabled" focusable>
          <v-expansion-panel>
            <v-expansion-panel-header class="btn-expansion">
              車歷卡資料
              <template v-slot:actions>
                <v-icon color="dropdownicon">
                  $expand
                </v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row class="label-header">
                <v-col cols="12" sm="4" md="3">
                  <h3 class="mb-1">車號</h3>
                  <v-text-field
                    :placeholder="powerCarData.CarNo"
                    solo
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col>
                  <h3 class="mb-1">廠牌</h3>
                  <v-text-field
                    :placeholder="powerCarData.Brand"
                    solo
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col>
                  <h3 class="mb-1">空調機編號</h3>
                  <v-text-field
                    :placeholder="powerCarData.AirCond"
                    solo
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col>
                  <h3 class="mb-1">車輪直徑</h3>
                  <v-text-field
                    :placeholder="powerCarData.WheelDiam"
                    solo
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="label-header">
                <v-col>
                  <h3 class="mb-1">型式</h3>
                  <v-text-field
                    :placeholder="powerCarData.Type"
                    solo
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col>
                  <h3 class="mb-1">年份</h3>
                  <v-text-field
                    :placeholder="powerCarData.Year"
                    solo
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col>
                  <h3 class="mb-1">客室設備</h3>
                  <v-text-field
                    :placeholder="powerCarData.GuestEqip"
                    solo
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col>
                  <h3 class="mb-1">轉向架中心距離</h3>
                  <v-text-field
                    :placeholder="powerCarData.DistBogie"
                    solo
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="label-header">
                <v-col cols="12" sm="4" md="3">
                  <h3 class="mb-1">皮重</h3>
                  <v-text-field
                    :placeholder="powerCarData.Tare"
                    solo
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col>
                  <h3 class="mb-1">電源</h3>
                  <v-text-field
                    :placeholder="powerCarData.PowerType"
                    solo
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col>
                  <h3 class="mb-1">窗</h3>
                  <v-text-field
                    :placeholder="powerCarData.Window"
                    solo
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col>
                  <h3 class="mb-1">軸距</h3>
                  <v-text-field
                    :placeholder="powerCarData.Wheelbase"
                    solo
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="label-header">
                <v-col cols="12" sm="4" md="3">
                  <h3 class="mb-1">載重</h3>
                  <v-text-field
                    solo
                    :placeholder="powerCarData.Load"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col>
                  <h3 class="mb-1">電瓶規格</h3>
                  <v-text-field
                    :placeholder="powerCarData.Battery"
                    solo
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col>
                  <h3 class="mb-1">門</h3>
                  <v-text-field
                    :placeholder="powerCarData.Door"
                    solo
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col>
                  <h3 class="mb-1">連結器中心高度</h3>
                  <v-text-field
                    :placeholder="powerCarData.LinkerHeight"
                    solo
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <v-expansion-panels :disabled="disabled" focusable>
          <v-expansion-panel>
            <v-expansion-panel-header class="btn-expansion">
              動力車保養紀錄
              <template v-slot:actions>
                <v-icon color="dropdownicon">
                  $expand
                </v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
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
                      <Pagination
                        :footer="footer"
                        :pageOpt="pageOpt"
                        @chPage="chPage"
                      />
                    </template>
                  </v-data-table>
                </v-card>
              </v-col>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
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
    <!-- 新增自動檢點表 modal -->
    <v-dialog v-model="Add" persistent max-width="900px">
      <EditPage
        @close="close"
        @search="search"
        @deleteRecord="deleteRecord"
        :key="DynamicKey"
        :item="editItem"
        :editType="editType"
        :DB_Table="DB_Table"
        :title="title"
        :carNo="powerCarData.CarNo"
      />
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
  decodeObject,
} from "@/assets/js/commonFun";
import { fetchFormOrderList } from "@/apis/formManage/serve";
import dateSelect from "@/components/forManage/dateSelect";
import deptSelect from "@/components/forManage/deptSelect";
import EditPage from "@/views/formManage/curing/PowerCarMaintenanceEdit";
import { Actions } from "@/assets/js/actions";
import dialogDelete from "@/components/forManage/dialogDelete";
import ToolBar from "@/components/forManage/toolbar";
import { Constrant } from "@/assets/js/constrant";

export default {
  data: () => ({
    title: "車歷卡",
    newText: "保養紀錄",
    actions: Actions,
    isLoading: false,
    disabled: true,
    nameRules: [
      (v) => !!v || "公里數必須填寫",
      (v) => v.length > 0 || "公里數必須大於0",
    ],
    // controls for dialog
    ShowDetailDialog: false,
    dialogDel: false, // model off
    Add: false,
    pageOpt: { page: 1 }, // 目前頁數
    //---api---
    DB_Table: "RP044",
    DB_Table_097: "RP097",
    RPFlowNo: "",
    //搜尋欄位設定
    formData: {
      settings: {
        formIconShow: true,
      },
      searchItem: {
        dateStart: "",
        dateEnd: "",
        department: "",
        carNo: "請選擇...",
      },
    },
    DynamicKey: 0,
    DelDynamicKey: 0,
    editType: "",
    editItem: {},
    headers: [
      // 表格顯示的欄位 DepartCode ID Name
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
      // {
      //   text: "審查狀態",
      //   value: "CheckStatus",
      //   align: "center",
      //   divider: true,
      //   class: "subtitle-1 white--text font-weight-bold",
      // },
      {
        text: "填寫人",
        value: "Name",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "保養單位",
        value: "DepartName",
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
    tableItems: [],
    powerCarData: {
      CheckDay: "",
      CarNo: "",
      Type: "",
      Tare: "",
      Load: "",
      Brand: "",
      Year: "",
      PowerType: "",
      Battery: "",
      AirCond: "",
      GuestEqip: "",
      Window: "",
      Door: "",
      WheelDiam: "",
      DistBogie: "",
      Wheelbase: "",
      LinkerHeight: "",
    },
    carNos: [],
    expand: [0],
  }),
  components: {
    Pagination, // 頁碼
    dateSelect,
    deptSelect,
    EditPage,
    ToolBar,
    dialogDelete,
  },
  computed: {
    ...mapState("user", {
      userData: (state) => state.userData, // 使用者基本資料
    }),
  },
  created() {
    this.formData.searchItem.dateStart = this.formData.searchItem.dateEnd = this.nowTime = getTodayDateString();
  },
  mounted() {
    this.getCarNoList();
    //this.search();
  },
  methods: {
    ...mapActions("system", [
      "chMsgbar", // messageBar
      "chLoadingShow", // 切換 loading 圖顯示
    ]),
    newOne() {
      if (this.powerCarData.CarNo != "") {
        this.Add = true;
        this.DynamicKey += 1;
        this.editType = this.actions.add;
      }
      else{
        alert("未查詢車歷卡資料")
      }
    },
    reset() {
      this.formData.searchItem.dateStart = "";
      this.formData.searchItem.dateEnd = "";
      this.formData.searchItem.carNo = "";
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 搜尋
    search() {
      let d1 = Date.parse(this.formData.searchItem.dateStart)
      let d2 = Date.parse(this.formData.searchItem.dateEnd)
      if(d1 > d2){
        alert('時間範圍錯誤')
        return
      }
      const that = this;
      // RP097
      this.chLoadingShow({show:true});
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.userData.UserId, // 操作人id
        KeyName: this.DB_Table_097, // DB table
        KeyItem: [
          { Column: "StartDayVlaue", Value: this.formData.searchItem.dateStart},
          { Column: "EndDayVlaue", Value: this.formData.searchItem.dateEnd },
          { Column: "CarNo", Value: this.formData.searchItem.carNo }],
        QyName: [
          "CheckDay",
          "CarNo",
          "Type",
          "Tare",
          "Load",
          "Brand",
          "Year",
          "PowerType",
          "Battery",
          "AirCond",
          "GuestEqip",
          "Window",
          "Door",
          "WheelDiam",
          "DistBogie",
          "Wheelbase",
          "LinkerHeight",
        ],
      })
        .then((res) => {
          if (res.data.ErrorCode == 0) {
            let data = decodeObject(unique(JSON.parse(res.data.DT)));
            if (data.length > 0) {
              this.disabled = false;
              const inputArr = Object.keys(this.powerCarData);
              inputArr.forEach((e) => {
                if (e.endsWith("Day")) {
                  that.powerCarData[e] = data[0][e].substr(0, 10);
                } else {
                  that.powerCarData[e] = data[0][e];
                }
              });
            }
          }
        })
        .catch((err) => {
          ////console.log(err);
          this.chMsgbar({ success: false, msg: Constrant.query.failed });
        })
        .finally(() => {
          this.chLoadingShow({ show: false});
        });

      // RP044
      this.chLoadingShow({show:true});
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.userData.UserId, // 操作人id
        KeyName: this.DB_Table, // DB table
        KeyItem: [
          {
            Column: "StartDayVlaue",
            Value: this.formData.searchItem.dateStart,
          },
          { Column: "EndDayVlaue", Value: this.formData.searchItem.dateEnd },
          { Column: "DepartCode", Value: this.formData.searchItem.department },
          { Column: "CarNo", Value: this.formData.searchItem.carNo },
        ],
        QyName: [
          "RPFlowNo",
          "ID",
          "Name",
          "CheckDay",
          "CheckStatus",
          "FlowId",
          "DepartName",
          "CarNo",
        ],
      })
        .then((res) => {
          let data = decodeObject(unique(JSON.parse(res.data.DT)));
          this.tableItems = data;
          if (data.length > 0) this.disabled = false;
        })
        .catch((err) => {
          ////console.log(err);
          this.chMsgbar({ success: false, msg: Constrant.query.failed });
        })
        .finally(() => {
          this.chLoadingShow({ show: false});
        });
    },
    // 關閉刪除確認dialod
    closeDialogDel() {
      this.dialogDel = false;
    },
    // 關閉 dialog
    close() {
      this.Add = false;
      this.dialogDel = false;
    },
    viewPage(item) {
     
     
      this.DynamicKey += 1;
      this.editType = this.actions.edit;
      this.editItem = item;
      this.Add = true;
    },
    deleteRecord(RPFlowNo) {
      this.dialogDel = true;
      this.DelDynamicKey += 1;
      this.RPFlowNo = RPFlowNo;
    },
    getCarNoList() {
      const that = this;
      that.isLoading = true;
      let keys = new Set();
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.userData.UserId, // 操作人id
        KeyName: this.DB_Table_097, // DB table
        KeyItem: [],
        QyName: ["Distinct RPFlowNo", "FlowId", "CarNo"],
      })
        .then((res) => {
          if (res.data.ErrorCode == 0) {
            let dat = JSON.parse(res.data.DT);
            dat.forEach((item) => {
              let carNo = item.CarNo;
              if (!keys.has(carNo)) {
                keys.add(carNo);
              }
            });
          } else {
            sessionStorage.errData = JSON.stringify({
              errCode: res.data.Msg,
              msg: res.data.Msg,
            });
            that.$router.push({ path: "/error" });
          }
        })
        .catch((err) => {
          ////console.log(err);
          this.chMsgbar({ success: false, msg: Constrant.query.failed });
        })
        .finally(() => {
          that.isLoading = false;
          let tmp = [...keys];
          tmp.sort();
          that.carNos = ["請選擇...", ...tmp];
        });
    },
  },
  watch: {},
};
</script>
