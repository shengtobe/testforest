<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2 label-title">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2 label-header">
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
      <v-col cols="12" sm="3" md="3">
        <!-- <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>通報單位
        </h3>
        <v-select :items="formDepartOptions" v-model="input.department" solo /> -->
        <deptSelect
          label="通報單位"
          v-model="input.department"
          :iconYN="formIconShow"
          outType="key"
          key="department"
        />
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
          class="mr-3 btn-add mb-3"
          @click="newOne"
        >
          <!-- @click="ShowDetailDialog = true" -->
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogDel" persistent max-width="290">
      <v-card class="theme-del-card">
        <v-card-title class="red white--text px-4 py-1 headline"
          >確認是否刪除?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="btn-close white--text" @click="dialogDel = false">取消</v-btn>
          <v-btn class="btn-delete white--text" @click="deleteRecord">刪除</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogNull" persistent max-width="290">
      <v-card class="theme-del-card">
        <v-card-title class="red white--text px-4 py-1 headline"
          >請填妥必要欄位</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="btn-add white--text" @click="dialogNull = false">確定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 表格資料 -->
    <v-col cols="12">
      <v-card>
        <v-data-table
          :headers="headers"
          :items="tableItems"
          :options.sync="pageOpt"
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

          <template v-slot:item.CheckDay="{ item }">
            {{item.CheckDay.substr(0, 10)}}
          </template>

          <!-- headers 的 content 欄位 (檢視內容) -->
          <template v-slot:item.content="{ item }">
            <v-btn
              title="編輯"
              class="mr-2 btn-modify"
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
    <!-- 新增SL-31維修資料 modal -->
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
            <v-col cols="8" sm="4">
              <!-- <h3 class="mb-1">通報時間</h3>
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
                    outlined
                    v-on="on"
                    :rules="nameRules"
                    required
                    dense
                    single-line
                  />
                </template>
                <v-date-picker
                  color="purple"
                  v-model="CheckDay"
                  @input="datePickerShowControl.checkDay = false"
                  locale="zh-tw"
                />
              </v-menu> -->
              <dateSelect
                label="檢查日期"
                v-model="CheckDay"
                key="dateStart"
                :showIcon="formIconShow"
              />
            </v-col>
            <v-col cols="8" sm="4">
              <dateSelect
                label="異常狀況時間"
                v-model="AlarmDay"
                key="errStart"
                :showIcon="formIconShow"
              />
              <!-- <h3 class="mb-1">異常狀況時間</h3>
              <v-menu
                v-model="datePickerShowControl.alarmDate"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model.trim="AlarmDay"
                    outlined
                    v-on="on"
                    :rules="nameRules"
                    required
                    dense
                    single-line
                  />
                </template>
                <v-date-picker
                  color="primary"
                  v-model="AlarmDay"
                  @input="datePickerShowControl.alarmDate = false"
                  locale="zh-tw"
                />
              </v-menu> -->
            </v-col>
            <!-- 填寫人 -->
            <!-- <v-col cols="8" sm="4">
              <h3 class="mb-1">通報單位</h3>
              <v-text-field v-model="Dept" required :rules="nameRules" solo />
            </v-col> -->
            <!-- 填寫人 -->
            <v-col cols="8" sm="4">
              <h3 class="mb-1">通報人(職稱姓名)</h3>
              <v-text-field v-model="Name" required :rules="nameRules" solo />
            </v-col>
            <!-- 狀況及原因 -->
            <v-col cols="12">
              <v-textarea
                hide-details
                label="異常狀況地點"
                auto-grow
                outlined
                rows="2"
                v-model.trim="CheckOption1"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                hide-details
                label="異常情形概要"
                auto-grow
                outlined
                rows="8"
                v-model.trim="CheckOption2"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                hide-details
                label="緊急應變措施"
                auto-grow
                outlined
                rows="6"
                v-model.trim="CheckOption3"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                hide-details
                label="影響情形"
                auto-grow
                outlined
                rows="6"
                v-model.trim="CheckOption4"
              />
            </v-col>
            <v-col cols="12" md="6">
              <span class="red--text" v-if="showAlert">有欄位未填。</span>
          </v-col>
          </v-row>
        </div>

        <v-card-actions class="px-5 pb-5">
          <v-btn
            v-if="action != actions.add"
            class="mr-2 btn-delete white--text"
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
            >送出</v-btn
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
    title: "營運異常狀況通報單",
    action: Actions.add,
    actions: Actions,
    newText: "通報單",
    isLoading: false,
    showAlert: false,
    // fields for detail page
    Name: "",
    CheckDay: "",
    AlarmDay: "",
    CheckOption1: "",
    CheckOption2: "",
    CheckOption3: "",
    CheckOption4: "",
    // controls for dialog
    ShowDetailDialog: false,
    dialogDel: false, // model off
    dialogNull: false,

    // controls for date picker
    datePickerShowControl: {
      startDate: false,
      endDate: false,
      checkDate: false,
      alarmDate: false,
    },

    formDepartOptions: [
      // 通報單位下拉選單
      { text: "", value: "" },
      ...formDepartOptions,
    ],
    Add: false,
    yy: false,
    dialog3: false,
    pageOpt: { page: 1 }, // 目前頁數
    //---api---
    DB_Table: "RP016",
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
      // 預設的欄位值
      dateStart: "", // 通報日期(起)
      dateEnd: "", // 通報日期(迄)
      case: "",
      eqLoss: "",
      department: "",
    },
    headers: [
      // 表格顯示的欄位 DepartCode ID Name
      {
        text: "項次",
        value: "ItemNo", // 給使用者看得項次，非FlowId
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "通報日期",
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
      // {
      //   text: "通報單位",
      //   value: "DepartCode",
      //   align: "center",
      //   divider: true,
      //   class: "subtitle-1 white--text font-weight-bold",
      // },
      {
        text: "通報單位",
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
    nameRules: [(v) => !!v || "不可空白"],
    input: {
      dateStart: new Date().toISOString().substr(0, 10), // 通報日期(起)
      dateEnd: new Date().toISOString().substr(0, 10), // 通報日期(迄)
      case: "",
      eqLoss: "",
      department: "",
    },
    formIconShow: true,
    confirmDelete: false,

    //------
  }),
  components: { Pagination, dateSelect, deptSelect }, // 頁碼
  computed: {
    ...mapState("user", {
      userData: (state) => state.userData, // 使用者基本資料
    }),
  },
  // page init
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
      this.CheckDay = getTodayDateString();
      this.AlarmDay = getTodayDateString();
      this.CheckOption1 = "";
      this.CheckOption2 = "";
      this.CheckOption3 = "";
      this.CheckOption4 = "";
      this.RPFlowNo = "";
    },
    newOne() {
      this.ShowDetailDialog = true;
      this.action = Actions.add;
      this.initInput();
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 搜尋
    search() {
      let d1 = Date.parse(this.input.dateStart)
      let d2 = Date.parse(this.input.dataEnd)
      if(d1 > d2){
        alert('時間範圍錯誤')
        return
      }
      this.chLoadingShow({show:true});
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.doMan.id, // 操作人id
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
        ],
      })
        .then((res) => {
          let tbBuffer = JSON.parse(res.data.DT);
          let aa = unique(tbBuffer);
          this.tableItems = aa;
        })
        .catch((err) => {
          //console.log(err);
          this.chMsgbar({ success: false, msg: Constrant.query.failed });
        })
        .finally(() => {
          this.chLoadingShow({ show: false});
        });
    },
    // 存
    save() {
      // 必要欄位檢查
      if (this.CheckDay == "" || this.AlarmDay == "" || this.Name == "" || this.CheckOption1 == '' || this.CheckOption2 == '') {
        this.dialogNull = true;
        return;
      }

      this.chLoadingShow({show:true});

      var data = {
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.doMan.id, // 操作人id this.doMan.name = this.userData.UserName
        // OperatorID: "16713",  // 操作人id
        KeyName: this.DB_Table, // DB table
        KeyItem: [
          { Column: "CheckDay", Value: this.CheckDay },
          { Column: "AlarmDay", Value: this.AlarmDay },
          { Column: "CheckOption1", Value: this.CheckOption1 },
          { Column: "CheckOption2", Value: this.CheckOption2 },
          { Column: "CheckOption3", Value: this.CheckOption3 },
          { Column: "CheckOption4", Value: this.CheckOption4 },
        ],
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
            //console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.update.failed });
          })
          .finally(() => {
            this.chLoadingShow({ show: false});
          });
      } else {
        // 新增
        createFormOrder0(data)
          .then((res) => {
            
            this.chMsgbar({ success: true, msg: Constrant.insert.success });
          })
          .catch((err) => {
            //console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.insert.failed });
          })
          .finally(() => {
            this.chLoadingShow({ show: false});
            this.search();
          });
      }
      this.search()
      this.ShowDetailDialog = false;
    },
    // 關閉 dialog
    close() {
      this.ShowDetailDialog = false;
      this.dialogShowEdit = false;
      this.dialogDel = false;
      this.RPFlowNo = "";
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.addItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    viewPage(item) {
      this.action = Actions.edit;
     
     
      this.chLoadingShow({show:true});
      // 依業主要求變更檢式頁面的方式，所以改為另開分頁
      fetchFormOrderOne({
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.doMan.id, // 操作人id
        KeyName: this.DB_Table, // DB table
        KeyItem: [{ Column: "RPFlowNo", Value: item.RPFlowNo }],
        QyName: [
          "RPFlowNo",
          "CheckDay",
          "AlarmDay",
          "Name",
          "CheckOption1",
          "CheckOption2",
          "CheckOption3",
          "CheckOption4",
        ],
      })
        .then((res) => {
          this.initInput();
          
          let dat = JSON.parse(res.data.DT);
          let data = dat[0];
          this.Name = data.Name;
          this.CheckDay = data.CheckDay.substr(0, 10);
          this.AlarmDay = data.AlarmDay.substr(0, 10);
          this.CheckOption1 = data.CheckOption1;
          this.CheckOption2 = data.CheckOption2;
          this.CheckOption3 = data.CheckOption3;
          this.CheckOption4 = data.CheckOption4;
          this.RPFlowNo = data.RPFlowNo;
          this.ShowDetailDialog = true;
        })
        .catch((err) => {
          //console.log(err);
          this.chMsgbar({ success: false, msg: Constrant.query.failed });
        })
        .finally(() => {
          this.chLoadingShow({ show: false});
        });
    }, //viewPage
    deleteRecord() {
      this.action = Actions.delete;
      this.chLoadingShow({show:true});
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
          //console.log(err);
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
