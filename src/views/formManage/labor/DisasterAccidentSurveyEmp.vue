<template>
  <v-container style="max-width: 1200px">
    <!-- 標題 -->
    <h2 class="mb-4 px-2 label-title">{{ title }}</h2>
    <!-- 查詢區塊 -->
    <v-row class="px-2 label-header">
      <!-- 日期-起 -->
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>調查日期(起)
        </h3>
        <v-menu
          v-model="CheckdayOn"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model.trim="QueryCheckdayOn"
              solo
              v-on="on"
              readonly
            />
          </template>
          <v-date-picker
            color="primary"
            v-model="QueryCheckdayOn"
            @input="CheckdayOn = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <!-- 日期-迄 -->
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>調查日期(迄)
        </h3>
        <v-menu
          v-model="CheckdayOff"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model.trim="QueryCheckdayOff"
              solo
              v-on="on"
              readonly
            />
          </template>
          <v-date-picker
            color="primary"
            v-model="QueryCheckdayOff"
            @input="CheckdayOff = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <!-- 功能 -->
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn dark large class="mb-sm-8 mb-md-8 btn-search">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn
          class="ml-4 ml-sm-4 ml-md-4 mb-sm-8 mb-md-8 btn-add"
          elevation="3"
          dark
          large
          to="/form-manage/labor/disaster-accident-survey-add"
        >
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </v-col>
    </v-row>
    <!-- 查詢結果 -->
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
              <!--上面原程式: to="/form-manage/curing/railway-worklog-add" -->
              <v-icon dark>mdi-pen</v-icon>
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
  data() {
    return {
      // 自定義變數
      title: "災害事故調查表(本處員工)",
      newText: "調查表",
      isLoading: false,
      disabled: false,
      CheckdayOn: "",
      QueryCheckdayOn: "",
      CheckdayOff: "",
      QueryCheckdayOff: "",
      AddWorkLogModal: false,
      formDepartOptions: [
        // 通報單位下拉選單
        { text: "不限", value: "" },
        ...formDepartOptions,
      ],
      MaintenanceDay: "",
      Weather: ["晴天", "陰天", "雨天"],
      AddData: {
        // 新增表單資料
        MaintenanceDay: "", // 保養日
      },
      // 系統變數
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
      //------
    };
  },
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
     ;
      this.Add = true;
     
      this.initInput();
    },
    ...mapActions("system", [
      "chLoadingShow", // 切換 loading 圖顯示
    ]),
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 新增監工區塊欄位
    addSupervisor() {},
    // 搜尋
    search() {
      
      this.chLoadingShow({show:true});
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
          ////console.log(err);
          alert("查詢時發生問題，請重新查詢!");
        })
        .finally(() => {
          this.chLoadingShow({ show: false});
        });
    },
    // 關閉 dialogx
    closeWorkLogModal() {
      this.AddWorkLogModal = false;
    },
    viewPage(item) {
     
     
      this.chLoadingShow({show:true});
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
          
          let dat = JSON.parse(res.data.DT);
          this.Add = true;
          // this.zs = res.data.DT.CheckDay
          this.doMan.name = dat[0].Name;
          let time1 = dat[0].CheckDay.substr(0, 10);
          this.zs = time1;
          //123資料
          let ad = Object.keys(dat[0]);
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
          ////console.log(err);
          alert("查詢時發生問題，請重新查詢!");
        })
        .finally(() => {
          this.chLoadingShow({ show: false});
        });
    }, //viewPage
  },
};
</script>

<style>
.iwidth {
  width: 65px;
}
.xwd {
  max-width: 13%;
}
@media only screen and (max-width: 600px) {
  .xwd {
    max-width: 100%;
  }
}
</style>