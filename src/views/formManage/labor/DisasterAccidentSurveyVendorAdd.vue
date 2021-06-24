<template>
  <v-sheet class="ma-4 mb-8" color="yellow lighten-2">
    <v-container style="max-width: 1200px" class="px-8">
      <p class="font-weight-black title text-center label-title">新增{{ newText }}</p>
      <v-row class="white px-4">
        <!-- 基本資料 -->
        <v-row no-gutter class="label-header">
          <v-col cols="12" sm="4">
            <h3 class="mb-1">單位</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="12" sm="4">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">事故編號</h3>
              </template>
              <span>以事故當天日期年月日+兩碼流水號</span>
            </v-tooltip>
            <v-text-field
              dense
              single-line
              outlined
              placeholder="ex:108082301"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <h3 class="mb-1">調查日期</h3>
            <v-menu
              v-model="MaintenanceDay"
              :close-on-content-click="false"
              transition="scale-transition"
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model.trim="AddData.MaintenanceDay"
                  placeholder="點擊選擇日期"
                  outlined
                  v-on="on"
                  dense
                  single-line
                />
              </template>
              <v-date-picker
                color="primary"
                v-model="AddData.MaintenanceDay"
                @input="MaintenanceDay = false"
                locale="zh-tw"
              />
            </v-menu>
          </v-col>

          <v-col cols="12" sm="3">
            <h3 class="mb-1">罹災者姓名(姓名代號)</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="12" sm="1">
            <h3 class="mb-1">年齡</h3>
            <v-text-field
              class="iwidth"
              type="number"
              dense
              single-line
              outlined
            />
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1">性別</h3>
            <v-select dense single-line :items="gender" outlined />
          </v-col>

          <v-col cols="12" sm="3">
            <h3 class="mb-1">工作部門</h3>
            <v-select dense single-line :items="apm" outlined />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">職稱</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="12" sm="12">
            <h3 class="mb-1">住址</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="13" sm="12">
            <v-toolbar color="yellow darken-3" dark>
              <v-spacer />
              <v-toolbar-title>罹災者學經歷</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">到職日期</h3>
            <v-menu
              v-model="MaintenanceDay2"
              :close-on-content-click="false"
              transition="scale-transition"
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model.trim="AddData.MaintenanceDay2"
                  placeholder="點擊選擇日期"
                  outlined
                  v-on="on"
                  dense
                  single-line
                />
              </template>
              <v-date-picker
                color="primary"
                v-model="AddData.MaintenanceDay2"
                @input="MaintenanceDay2 = false"
                locale="zh-tw"
              />
            </v-menu>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1">本項工作經驗</h3>
            <v-text-field type="number" dense single-line outlined>
              <span slot="append" style="margin-top: 5px">年</span>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">教育程度</h3>
            <v-select dense single-line :items="educationLevel" outlined />
          </v-col>
          <v-col cols="12" sm="4">
            <h3 class="mb-1">本項工作相關訓練日期</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="13" sm="12">
            <v-toolbar color="yellow darken-3" dark>
              <v-spacer />
              <v-toolbar-title>事故發生時間</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1">發生日期</h3>
            <v-menu
              v-model="MaintenanceDay2"
              :close-on-content-click="false"
              transition="scale-transition"
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model.trim="AddData.MaintenanceDay2"
                  placeholder="點擊選擇日期"
                  outlined
                  v-on="on"
                  dense
                  single-line
                />
              </template>
              <v-date-picker
                color="primary"
                v-model="AddData.MaintenanceDay2"
                @input="MaintenanceDay2 = false"
                locale="zh-tw"
              />
            </v-menu>
          </v-col>
          <v-col cols="12" sm="1">
            <h3 class="mb-1">時</h3>
            <v-text-field
              class="iwidth"
              type="number"
              dense
              single-line
              outlined
            />
          </v-col>
          <v-col cols="12" sm="1">
            <h3 class="mb-1">分</h3>
            <v-text-field
              class="iwidth"
              type="number"
              dense
              single-line
              outlined
            />
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1">星期</h3>
            <v-select dense single-line :items="week" outlined />
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1">氣候</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="12" sm="4">
            <h3 class="mb-1">事故發生地點</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="13" sm="12">
            <v-toolbar color="yellow darken-3" dark>
              <v-spacer />
              <v-toolbar-title>事故類別</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
          </v-col>
          <v-col cols="12" sm="4">
            <h3 class="mb-1">類別</h3>
            <v-select dense single-line :items="accidentType" outlined />
          </v-col>
          <v-col cols="12" sm="4">
            <h3 class="mb-1">事故結果</h3>
            <v-select dense single-line :items="accidentResult" outlined />
          </v-col>
          <v-col cols="13" sm="12">
            <v-toolbar color="yellow darken-3" dark>
              <v-spacer />
              <v-toolbar-title>事故原因</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
          </v-col>
          <v-col cols="12" sm="9">
            <h3 class="mb-1">直接原因</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">間接原因</h3>
            <v-select dense single-line :items="indirectCause" outlined />
          </v-col>
          <v-col cols="12" sm="12">
            <h3 class="mb-1">基本原因</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="13" sm="12">
            <v-toolbar color="yellow darken-3" dark>
              <v-spacer />
              <v-toolbar-title>傷害情況</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">受傷部位</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">災害類型</h3>
            <v-select dense single-line :items="disasterType" outlined />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">致傷媒介物</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">傷者當時工作</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="12" sm="12">
            <h3 class="mb-1">事故概述</h3>
            <h4 class="mb-1">
              請以六何(何人、為何、何時、何處、何事、如何)方式說明(必要時應附詳圖或照片)
            </h4>
            <v-textarea auto-grow outlined rows="4" />
          </v-col>
          <v-col cols="12" sm="12">
            <h3 class="mb-1">緊急處理情形</h3>
            <v-textarea auto-grow outlined rows="4" />
          </v-col>
          <v-col cols="12" sm="12">
            <h3 class="mb-1">事故單位防範及改善對策</h3>
            <v-textarea auto-grow outlined rows="4" />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">事故調查人員</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">工會代表</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">職安</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">機關首長</h3>
            <v-text-field dense single-line outlined />
          </v-col>
        </v-row>

        <!-- 送出 -->
        <v-col class="mt-2" cols="12">
          <v-btn large block class="mt-n8 mb-4 btn-add white--text">送出表單</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
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
      title: "",
      newText: "災害事故調查表(承攬商)",
      isLoading: false,
      disabled: false,
      CheckdayOn: "",
      QueryCheckdayOn: "",
      CheckdayOff: "",
      QueryCheckdayOff: "",
      AddWorkLogModal: false,
      MaintenanceDay: "",
      formDepartOptions: [
        // 通報單位下拉選單
        { text: "不限", value: "" },
        ...formDepartOptions,
      ],
      apm: ["部門1", "部門2", "部門3", "部門4"],
      gender: ["男", "女", "其他"],
      week: ["日", "一", "二", "三", "四", "五", "六"],
      accidentType: ["工作傷害事故", "上下班交通事故", "工作交通事故", "其他"],
      accidentResult: ["虛驚事故", "失能傷害", "輕傷", "其他"],
      disasterType: [
        "墜落、滾落",
        "跌倒",
        "衝撞",
        "物體飛落",
        "物體倒塌、坍塌",
        "被撞",
        "被夾、被捲",
        "被切、割、擦傷",
        "踩踏",
        "溺斃",
        "與高溫、低溫之接觸",
        "與有害物等之接觸",
        "感電",
        "爆炸",
        "物體破裂",
        "火災",
        "不當動作",
        "其他",
        "無法歸類者",
      ],
      educationLevel: [
        "國小",
        "國中",
        "初級職業學校",
        "簡易師範學校",
        "高中",
        "高職",
        "師範學校",
        "專科學校",
        "大學校院",
        "研究所碩士班",
        "研究所博士班",
        "自修",
      ],
      indirectCause: ["不安全行為", "不可抗力"],
      AddData: {
        // 新增表單資料
        MaintenanceDay: "", // 保養日
      },
      // 系統變數
      pageOpt: { page: 1 }, // 目前頁數
      headers: [
        {
          text: "項次",
          value: "Item",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
        {
          text: "檢查日期",
          value: "Checkday",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
        {
          text: "審查狀態",
          value: "Review",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
        {
          text: "填寫人",
          value: "Name",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
        {
          text: "功能",
          value: "Shop",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
      ],
      tableItems: [
        {
          Item: "1",
          Checkday: "2020-08-01",
          Review: "已審查",
          Name: "王大明",
        },
        {
          Item: "2",
          Checkday: "2020-08-10",
          Review: "審查中",
          Name: "王大明",
        },
      ],
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
  },
  methods: {
    newOne() {
      console.log("newOne23");
      this.Add = true;
      console.log("this.Add: " + this.Add);
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
    // 關閉 dialogx
    closeWorkLogModal() {
      this.AddWorkLogModal = false;
    },
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