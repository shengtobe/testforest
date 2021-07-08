<template>
  <v-card class="theme-card">
    <!-- 標題 -->
    <v-card-title class="white--text px-4 py-1">
      {{ mainTitle }}
      <v-spacer />
      <v-btn dark fab small text @click="close" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <!-- 內容 -->
    <div class="px-6 py-4 label-header">
      <v-row class="white px-4">
        <!-- 基本資料 -->
        <v-row no-gutter class="label-header">
          <v-col cols="12" sm="4">
            <h3 class="mb-1">單位</h3>
            <v-text-field
              dense
              single-line
              v-model="inputData.DepartName"
              outlined
            />
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
              v-model="inputData.editableData.EventId"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <dateSelect
              label="調查日期"
              key="CheckDay"
              :showIcon="commonSettings.iconShow"
              v-model="inputData.editableData.CheckDay"
            />
          </v-col>

          <v-col cols="12" sm="3">
            <h3 class="mb-1">罹災者姓名(姓名代號)</h3>
            <v-text-field
              dense
              single-line
              v-model="inputData.editableData.PartyName"
              outlined
            />
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1">年齡</h3>
            <v-text-field
              class="iwidth"
              type="number"
              dense
              single-line
              outlined
              v-model="inputData.editableData.CheckOption3"
            />
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1">性別</h3>
            <v-select
              dense
              single-line
              :items="gender"
              item-text="text"
              item-value="value"
              v-model="inputData.editableData.CheckOption2"
              outlined
            />
          </v-col>

          <v-col cols="12" sm="3">
            <h3 class="mb-1">工作部門</h3>
            <v-select
              dense
              single-line
              :items="apm"
              item-text="text"
              item-value="value"
              v-model="inputData.editableData.CheckOption4"
              outlined
            />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">職稱</h3>
            <v-text-field
              dense
              single-line
              v-model="inputData.editableData.CheckOption6"
              outlined
            />
          </v-col>
          <v-col cols="12" sm="12">
            <h3 class="mb-1">住址</h3>
            <v-text-field
              dense
              single-line
              v-model="inputData.editableData.CheckOption8"
              outlined
            />
          </v-col>
          <v-col cols="13" sm="12">
            <v-toolbar color="yellow darken-3" dark>
              <v-spacer />
              <v-toolbar-title>罹災者學經歷</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
          </v-col>
          <v-col cols="12" sm="3">
            <dateSelect
              label="到職日期"
              key="checkDate"
              :showIcon="commonSettings.iconShow"
              v-model="inputData.editableData.CheckOption5"
            />
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1">本項工作經驗</h3>
            <v-text-field
              type="number"
              dense
              single-line
              v-model="inputData.editableData.CheckOption9"
              outlined
            >
              <span slot="append" style="margin-top: 5px">年</span>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">教育程度</h3>
            <v-select
              dense
              single-line
              :items="educationLevel"
              item-text="text"
              item-value="value"
              v-model="inputData.editableData.CheckOption7"
              outlined
            />
          </v-col>
          <v-col cols="12" sm="4">
            <dateSelect
              label="本項工作相關訓練日期"
              key="checkDate"
              :showIcon="commonSettings.iconShow"
              v-model="inputData.editableData.CheckOption10"
            />
          </v-col>
          <v-col cols="13" sm="12">
            <v-toolbar color="yellow darken-3" dark>
              <v-spacer />
              <v-toolbar-title>事故發生時間</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
          </v-col>
          <v-col cols="12" sm="2">
            <dateSelect
              label="發生日期"
              key="checkDate"
              :showIcon="commonSettings.iconShow"
              v-model="inputData.editableData.CheckOption12"
            />
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1">時</h3>
            <v-text-field
              class="iwidth"
              type="number"
              dense
              single-line
              :rules="hourRules"
              v-model="inputData.editableData.CheckOption14"
              outlined
            />
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1">分</h3>
            <v-text-field
              class="iwidth"
              type="number"
              dense
              single-line
              :rules="minuteRules"
              v-model="inputData.editableData.CheckOption15"
              outlined
            />
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1">星期</h3>
            <v-select
              dense
              single-line
              :items="weekday"
              item-text="text"
              item-value="value"
              v-model="inputData.editableData.CheckOption13"
              :selected="getWeekDay"
              outlined
            />
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1">氣候</h3>
            <v-text-field
              dense
              single-line
              v-model="inputData.editableData.CheckOption16"
              outlined
            />
          </v-col>
          <v-col cols="12" sm="4">
            <h3 class="mb-1">事故發生地點</h3>
            <v-text-field
              dense
              single-line
              v-model="inputData.editableData.CheckOption17"
              outlined
            />
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
            <v-select
              dense
              single-line
              :items="accidentType"
              item-text="text"
              item-value="value"
              v-model="inputData.editableData.CheckOption18"
              outlined
            />
          </v-col>
          <v-col cols="12" sm="4">
            <h3 class="mb-1">事故結果</h3>
            <v-select
              dense
              single-line
              :items="accidentResult"
              item-text="text"
              item-value="value"
              v-model="inputData.editableData.CheckOption19"
              outlined
            />
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
            <v-text-field
              dense
              single-line
              v-model="inputData.editableData.CheckOption24"
              outlined
            />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">間接原因</h3>
            <v-select
              dense
              single-line
              :items="indirectCause"
              item-text="text"
              item-value="value"
              v-model="inputData.editableData.CheckOption25"
              outlined
            />
          </v-col>
          <v-col cols="12" sm="12">
            <h3 class="mb-1">基本原因</h3>
            <v-text-field
              dense
              single-line
              v-model="inputData.editableData.CheckOption26"
              outlined
            />
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
            <v-text-field
              dense
              single-line
              v-model="inputData.editableData.CheckOption20"
              outlined
            />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">災害類型</h3>
            <v-select
              dense
              single-line
              :items="disasterType"
              item-text="text"
              item-value="value"
              v-model="inputData.editableData.CheckOption21"
              outlined
            />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">致傷媒介物</h3>
            <v-text-field
              dense
              single-line
              v-model="inputData.editableData.CheckOption22"
              outlined
            />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">傷者當時工作</h3>
            <v-text-field
              dense
              single-line
              v-model="inputData.editableData.CheckOption27"
              outlined
            />
          </v-col>
          <v-col cols="12" sm="12">
            <h3 class="mb-1">事故概述</h3>
            <h4 class="mb-1">
              請以六何(何人、為何、何時、何處、何事、如何)方式說明(必要時應附詳圖或照片)
            </h4>
            <v-textarea
              auto-grow
              v-model="inputData.editableData.CheckOption28"
              outlined
              rows="4"
            />
          </v-col>
          <v-col cols="12" sm="12">
            <h3 class="mb-1">緊急處理情形</h3>
            <v-textarea
              auto-grow
              v-model="inputData.editableData.CheckOption29"
              outlined
              rows="4"
            />
          </v-col>
          <v-col cols="12" sm="12">
            <h3 class="mb-1">事故單位防範及改善對策</h3>
            <v-textarea
              auto-grow
              v-model="inputData.editableData.CheckOption30"
              outlined
              rows="4"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">事故調查人員</h3>
            <v-text-field
              dense
              single-line
              v-model="inputData.editableData.Investigator"
              outlined
            />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">工會代表</h3>
            <v-text-field
              dense
              single-line
              v-model="inputData.editableData.UnionRepresentative"
              outlined
            />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">職安</h3>
            <v-text-field
              dense
              single-line
              v-model="inputData.editableData.OccupationalSafety"
              outlined
            />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">機關首長</h3>
            <v-text-field
              dense
              single-line
              v-model="inputData.editableData.Supervisor"
              outlined
            />
          </v-col>
        </v-row>
      </v-row>
    </div>
    <v-card-actions class="px-5 pb-5">
      <v-btn
        v-if="editType != actions.add"
        elevation="4"
        class="mr-2 btn-delete white--text"
        @click="deleteRecord"
        >刪除</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn class="mr-2 btn-close white--text" elevation="4" @click="close">取消</v-btn>
      <v-btn
        class="btn-add white--text"
        elevation="4"
        :loading="commonSettings.isLoading"
        @click="save"
        >送出</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import {
  getNowFullTime,
  getTodayDateString,
  encodeObject,
  decodeObject,
  isDateObject,
} from "@/assets/js/commonFun";
import { generateSettings } from "@/assets/js/commonQuestion2Generater";
import {
  fetchFormOrderOne,
  createFormOrder0,
  updateFormOrder,
} from "@/apis/formManage/serve";
import dateSelect from "@/components/forManage/dateSelect";
import deptSelect from "@/components/forManage/deptSelect";
import commonQuestion from "@/components/forManage/commonQuestion3";
import { Actions } from "@/assets/js/actions";
import { Constrant } from "@/assets/js/constrant";

export default {
  props: {
    item: Object,
    editType: String,
    DB_Table: String,
    title: String,
    type: String,
    typeStr: String,
  },
  data: () => ({
    actions: Actions,
    commonSettings: {
      iconShow: true,
      isLoading: false,
      deptReadonly: true,
    },
    nameRules: [
      (v) => !!v || "公里數必須填寫",
      (v) => v.length > 0 || "公里數必須大於0",
    ],
    hourRules: [
      (v) => !!v || "必填欄位",
      (v) => (v && v >= 0) || "小時應介於0~23",
      (v) => (v && v <= 23) || "小時應介於0~23",
    ],
    minuteRules: [
      (v) => !!v || "必填欄位",
      (v) => (v && v >= 0) || "分鐘應介於0~60",
      (v) => (v && v <= 60) || "分鐘應介於0~60",
    ],
    apm: ["部門1", "部門2", "部門3", "部門4"],
    //{ text: "", value:  },
    gender: [
      { text: "男", value: "1" },
      { text: "女", value: "2" },
      { text: "其他", value: "3" },
    ],
    weekday: [
      { text: "日", value: "0" },
      { text: "一", value: "1" },
      { text: "二", value: "2" },
      { text: "三", value: "3" },
      { text: "四", value: "4" },
      { text: "五", value: "5" },
      { text: "六", value: "6" },
    ],
    accidentType: [
      { text: "工作傷害事故", value: "1" },
      { text: "上下班交通事故", value: "2" },
      { text: "工作交通事故", value: "3" },
      { text: "其他", value: "4" },
    ],
    accidentResult: [
      { text: "虛驚事故", value: "1" },
      { text: "失能傷害", value: "2" },
      { text: "輕傷", value: "3" },
      { text: "其他", value: "4" },
    ],
    disasterType: [
      { text: "墜落、滾落", value: "1" },
      { text: "跌倒", value: "2" },
      { text: "衝撞", value: "3" },
      { text: "物體飛落", value: "4" },
      { text: "物體倒塌、坍塌", value: "5" },
      { text: "被撞", value: "6" },
      { text: "被夾、被捲", value: "7" },
      { text: "被切、割、擦傷", value: "8" },
      { text: "踩踏", value: "9" },
      { text: "溺斃", value: "10" },
      { text: "與高溫、低溫之接觸", value: "11" },
      { text: "與有害物等之接觸", value: "12" },
      { text: "感電", value: "13" },
      { text: "爆炸", value: "14" },
      { text: "物體破裂", value: "15" },
      { text: "火災", value: "16" },
      { text: "不當動作", value: "17" },
      { text: "其他", value: "18" },
      { text: "無法歸類者", value: "19" },
    ],
    educationLevel: [
      { text: "國小", value: "1" },
      { text: "國中", value: "2" },
      { text: "初級職業學校", value: "3" },
      { text: "簡易師範學校", value: "4" },
      { text: "高中", value: "5" },
      { text: "高職", value: "6" },
      { text: "師範學校", value: "7" },
      { text: "專科學校", value: "8" },
      { text: "大學校院", value: "9" },
      { text: "研究所碩士班", value: "10" },
      { text: "研究所博士班", value: "11" },
      { text: "自修", value: "12" },
    ],
    indirectCause: [
      { text: "不安全行為", value: "1" },
      { text: "不可抗力", value: "2" },
      // { text: "不安全環境", value: "3" },
      // { text: "其他", value: "4" },
    ],
    inputData: {
      RPFlowNo: "",
      DepartCode: "",
      DepartName: "",
      ID: "",
      editableData: {
        EventId: "",
        CheckDay: "",
        PartyName: "", //罹災人姓名
        CheckOption1: "", //勞工類型
        CheckOption2: "", //性別
        CheckOption3: "", //年齡
        CheckOption4: "", //工作部門
        CheckOption5: "", //到職日期
        CheckOption6: "", //職稱
        CheckOption7: "", //教育程度
        CheckOption8: "", //住址
        CheckOption9: "", //本項工作經驗年數(單位：年)
        CheckOption10: "", //本項工作訓練日期
        CheckOption11: "", //發生單位
        CheckOption12: "", //發生日期
        CheckOption13: "", //發生星期
        CheckOption14: "", //發生時間(時)
        CheckOption15: "", //發生時間(分)
        CheckOption16: "", //氣候
        CheckOption17: "", //發生地點
        CheckOption18: "", //事故類別
        CheckOption19: "", //事故結果
        CheckOption20: "", //傷害部位
        CheckOption21: "", //災害類型
        CheckOption22: "", //致傷媒介物-1
        CheckOption23: "", //致傷媒介物-2
        CheckOption24: "", //直接原因
        CheckOption25: "", //間接原
        CheckOption26: "", //基本原因
        CheckOption27: "", //傷者當時工作
        CheckOption28: "", //事故概況
        CheckOption29: "", //緊急處理情形
        CheckOption30: "", //事故單位防範及改善對策
        Investigator: "", //事故調查人
        UnionRepresentative: "", //工會代表
        OccupationalSafety: "", //職安
        Supervisor: "", //機關首長
      },
    },
  }),
  components: {
    dateSelect,
    deptSelect,
  },
  mounted() {
    this.editType == this.actions.edit
      ? this.viewPage(this.item)
      : this.newPage();
    this.inputData.editableData.CheckOption1 = this.type;
  },
  created() {},
  computed: {
    ...mapState("user", {
      userData: (state) => state.userData, // 使用者基本資料
    }),
    mainTitle: function () {
      return this.editType + this.title + "(" + this.typeStr + ")";
    },
    getWeekDay: function () {
      let tmpDate = new Date(this.inputData.editableData.CheckOption12);
      this.inputData.editableData.CheckOption13 = tmpDate.getDay().toString();
    },
  },
  methods: {
    ...mapActions("system", [
      "chMsgbar", // messageBar
      "chLoadingShow", // 切換 loading 圖顯示
    ]),
    newPage() {
      this.inputData.editableData.CheckDay = getTodayDateString();
      this.inputData.editableData.Investigator = this.userData.UserName;
      this.inputData.ID = this.userData.UserId;
      this.inputData.DepartCode = this.userData.DeptList[0].DeptId;
      this.inputData.DepartName = this.userData.DeptList[0].DeptDesc;
    },
    viewPage(item) {
      const that = this;
      console.log("item: " + item);
      console.log("RPFlowNo: " + item.RPFlowNo);
      this.chLoadingShow();
      fetchFormOrderOne({
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.userData.UserId, // 操作人id
        KeyName: this.DB_Table, // DB table
        KeyItem: [{ Column: "RPFlowNo", Value: item.RPFlowNo }],
        QyName: [
          "RPFlowNo",
          "CheckDay",
          "DepartName",
          "ID",
          "PartyName",
          "EventId",
          "CheckStatus",
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
          "CheckOption19",
          "CheckOption20",
          "CheckOption21",
          "CheckOption22",
          "CheckOption23",
          "CheckOption24",
          "CheckOption25",
          "CheckOption26",
          "CheckOption27",
          "CheckOption28",
          "CheckOption29",
          "CheckOption30",
          "Investigator",
          "UnionRepresentative",
          "OccupationalSafety",
          "Supervisor",
        ],
      })
        .then((res) => {
          console.log(res.data.DT);
          let dat = JSON.parse(res.data.DT);
          let data = dat[0];
          data.CheckDay = data.CheckDay.substr(0, 10);
          this.inputData.RPFlowNo = this.item.RPFlowNo;
          this.inputData.DepartCode = data.DepartCode;
          this.inputData.Name = data.Name;
          this.inputData.DepartName = data.DepartName;
          data = decodeObject(data);
          const inputArr = Object.keys(this.inputData.editableData);
          inputArr.forEach((e) => {
            var tmp = data[e];
            if (isDateObject(tmp)) {
              that.inputData.editableData[e] = tmp.substr(0, 10);
            } else {
              that.inputData.editableData[e] = tmp;
            }
          });
        })
        .catch((err) => {
          console.log(err);
          this.chMsgbar({ success: false, msg: Constrant.query.failed });
        })
        .finally(() => {
          this.chLoadingShow();
        });
    },
    close() {
      this.$emit("close");
      this.$emit("search");
    },
    save() {
      const that = this;
      let rtnObj = [];
      const keyArr = Object.keys(that.inputData.editableData);
      keyArr.forEach((e) => {
        rtnObj.push({ Column: e, Value: that.inputData.editableData[e] });
      });
      encodeObject(rtnObj);
      console.log(rtnObj);
      if (this.editType == this.actions.add) {
        createFormOrder0({
          ClientReqTime: getNowFullTime(), // client 端請求時間
          OperatorID: this.userData.UserId, // 操作人id
          FunCode: "C",
          KeyName: this.DB_Table, // DB table
          KeyItem: rtnObj,
        })
          .then((res) => {
            if (res.data.ErrorCode == 0) {
              this.chMsgbar({ success: true, msg: Constrant.insert.success });
            } else {
              sessionStorage.errData = JSON.stringify({
                errCode: res.data.Msg,
                msg: res.data.Msg,
              });
              that.$router.push({ path: "/error" });
            }
          })
          .catch((err) => {
            console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.insert.failed });
          })
          .finally(() => {
            that.close();
          });
      } else {
        //就是edit
        updateFormOrder({
          ClientReqTime: getNowFullTime(), // client 端請求時間
          OperatorID: this.userData.UserId, // 操作人id
          RPFlowNo: that.inputData.RPFlowNo,
          FunCode: "U",
          KeyName: this.DB_Table, // DB table
          KeyItem: rtnObj,
        })
          .then((res) => {
            if (res.data.ErrorCode == 0) {
              this.chMsgbar({ success: true, msg: Constrant.update.success });
            } else {
              sessionStorage.errData = JSON.stringify({
                errCode: res.data.Msg,
                msg: res.data.Msg,
              });
              that.$router.push({ path: "/error" });
            }
          })
          .catch((err) => {
            console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.update.failed });
          })
          .finally(() => {
            that.close();
          });
      }
    },
    deleteRecord() {
      this.$emit("deleteRecord", this.inputData.RPFlowNo);
    },
    calcWeek() {
      let tmp = this.inputData.editableData.CheckOption12;
      let tmpDate = new Date(tmp);
      console.log("Date: " + tmpDate);
      console.log(tmpDate.getDay());
    },
  },
  filters: {},
  watch: {
    // "inputData.editableData.CheckOption12": function (value) {
    //   let tmpDate = new Date(value);
    //   this.inputData.editableData.CheckOption13 = tmpDate.getDay().toString();
    // },
  },
};
</script>