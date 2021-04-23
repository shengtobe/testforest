<template>
  <v-card class="theme-card">
    <v-card-title class="white--text px-4 py-1">
      {{ editType }}{{ commonSettings.title }}
      <v-spacer></v-spacer>
      <v-btn dark fab small text @click="close" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <commonQuestion v-model="inputData" :settings="settings">
        <template v-slot:resultOtions>
            <v-radio color="success" label="良好" value="1"></v-radio>
            <v-radio color="red" label="不良" value="2"></v-radio>
            <v-radio color="black" label="無此項目" value="3"></v-radio>
        </template>
    </commonQuestion>
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
} from "@/assets/js/commonFun";
import {
  fetchFormOrderOne,
  createFormOrder0,
  updateFormOrder,
} from "@/apis/formManage/serve";
import dateSelect from "@/components/forManage/dateSelect";
import deptSelect from "@/components/forManage/deptSelect";
import commonQuestion from "@/components/forManage/commonQuestion";
import { Actions } from "@/assets/js/actions";
import { Constrant } from "@/assets/js/constrant";
export default {
  props: {
    item: Object,
    editType: String,
    DB_Table: String,
  },
  data: () => ({
    actions: Actions,
    commonSettings: {
      iconShow: false,
      title: "一般電氣安全定期檢查表(三個月)",
      isLoading: false,
      deptReadonly: true,
    },
    inputData: {
      RPFlowNo: "",
      DepartCode: "",
      DepartName: "",
      ID: "",
      Name: "",
      editableData: {
        CheckDay: "",
        CheckOption1: "0",
        CheckOption2: "0",
        CheckOption3: "0",
        CheckOption4: "0",
        CheckOption5: "0",
        CheckOption6: "0",
        CheckOption7: "0",
        CheckOption8: "0",
        CheckOption9: "0",
        CheckOption10: "0",
        CheckOption11: "0",
        CheckOption12: "0",
        CheckOption13: "0",
        CheckOption14: "0",
        CheckOption15: "0",
        CheckOption16: "0",
        CheckOption17: "0",
        Memo_1: "",
        Memo_2: "",
        Memo_3: "",
        Memo_4: "",
        Memo_5: "",
        Memo_6: "",
        Memo_7: "",
        Memo_8: "",
        Memo_9: "",
        Memo_10: "",
        Memo_11: "",
        Memo_12: "",
        Memo_13: "",
        Memo_14: "",
        Memo_15: "",
        Memo_16: "",
        Memo_17: "",
        Advice: "",
        Measures: "",
      },
    },
    settings: {
      subtitle: [
        "1.依職業安全衛生法第23條規定辦理。",
        "2.依檢查結果選擇良好、不良、無此項目",
        "3.缺點由使用單位自行改善，不克者委請設備商修護。",
        "4.本定期檢查表於每年1.4.7.10月月底前完成檢查，經主管核章後，留存於管理單位之系統保存備查。",
      ],
      qestions: [
        { question: "1.電氣設備接地線", method: "目視點檢" },
        { question: "2.易發生觸電之防護設施與危險警告牌", method: "目視點檢" },
        { question: "3.電源開關裝置及操作安全措施", method: "動作測試" },
        { question: "4.保險絲按規定裝置", method: "目視點檢" },
        { question: "5.電源開關附近無易燃爆品", method: "目視點檢" },
        { question: "6.電線插座、插頭或連結器", method: "目視點檢" },
        { question: "7.電線接出匣", method: "目視點檢" },
        { question: "8.不在同一電源線裝多種電氣設備", method: "目視點檢" },
        { question: "9.各種設備電磁開關", method: "目視點檢" },
        { question: "10.各種電氣設備短路火花及過熱", method: "目視點檢" },
        { question: "11.各種電氣設備保持乾燥清潔", method: "目視點檢" },
        { question: "12.接面與牆上電線之保護措施", method: "目視點檢" },
        { question: "13.電線電纜絕緣支覆情形", method: "目視點檢" },
        { question: "14.物品不掛在電線、電氣設備上", method: "目視點檢" },
        { question: "15.電線不與震動體接觸", method: "目視點檢" },
        { question: "16.電氣儀表正確靈敏、清潔並適當保護", method: "動作測試" },
        { question: "17.油箱、配電盤或變壓器周圍禁煙火", method: "目視點檢" },
      ],
      columns: {
        option: "CheckOption",
        memo: "Memo_",
      },
      width: {
        qusetion: 4,
        method: 3,
        option: 2,
        memo: 3,
      },
      textarea: [
        {
          label: "改善建議",
          column: "Advice",
        },
        {
          label: "改善措施",
          column: "Measures",
        },
      ],
    },
  }),
  components: {
    dateSelect,
    deptSelect,
    commonQuestion,
  },
  mounted() {
    this.editType == this.actions.edit
      ? this.viewPage(this.item)
      : this.newPage();
  },
  computed: {
    ...mapState("user", {
      userData: (state) => state.userData, // 使用者基本資料
    }),
  },
  methods: {
    ...mapActions("system", [
      "chMsgbar", // messageBar
      "chLoadingShow", // 切換 loading 圖顯示
    ]),
    newPage() {
      this.inputData.editableData.CheckDay = getTodayDateString();
      this.inputData.Name = this.userData.UserName;
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
          "CheckDay",
          "DepartCode",
          "DepartName",
          "ID",
          "Name",
          "CheckOption1",
          "Memo1",
          "CheckOption2",
          "Memo2",
          "CheckOption3",
          "Memo3",
          "CheckOption4",
          "Memo4",
          "CheckOption5",
          "Memo5",
          "CheckOption6",
          "Memo6",
          "CheckOption7",
          "Memo7",
          "CheckOption8",
          "Memo8",
          "CheckOption9",
          "Memo9",
          "CheckOption10",
          "Memo10",
          "CheckOption11",
          "Memo11",
          "CheckOption12",
          "Memo12",
          "CheckOption13",
          "Memo13",
          "CheckOption14",
          "Memo14",
          "CheckOption15",
          "Memo15",
          "CheckOption16",
          "Memo16",
          "CheckOption17",
          "Memo17",
          "Advice",
          "Measures",
        ],
      })
        .then((res) => {
          console.log(res.data.DT);
          let dat = JSON.parse(res.data.DT);
          dat[0].CheckDay = dat[0].CheckDay.substr(0, 10);
          this.inputData.RPFlowNo = this.item.RPFlowNo;
          this.inputData.DepartCode = dat[0].DepartCode;
          this.inputData.Name = dat[0].Name;
          dat[0] = decodeObject(dat[0]);
          const inputArr = Object.keys(this.inputData.editableData);
          inputArr.forEach((e) => {
            that.inputData.editableData[e] = dat[0][e];
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
  },
  filters: {
    // editStatus: function (value) {
    //   let rtnStr = "";
    //   if (value == this.actions.add) {
    //     rtnStr = "新增";
    //   } else if (value == this.actions.edit) {
    //     rtnStr = "編輯";
    //   } else {
    //     rtnStr = "";
    //   }
    //   return rtnStr;
    // },
  },
  watch: {},
};
</script>