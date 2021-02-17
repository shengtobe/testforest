<template>
  <v-card>
    <v-card-title class="blue white--text px-4 py-1">
      {{ editType }}{{ commonSettings.title }}
      <v-spacer></v-spacer>
      <v-btn dark fab small text @click="close" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    
    <commonQuestion v-model="inputData" :settings="settings"/>
    <v-card-actions class="px-5 pb-5">
      <v-spacer></v-spacer>
      <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
      <v-btn
        color="success"
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
  },
  data: () => ({
    DB_Table: "RP024",
    action: Actions.add,
    actions: Actions,
    commonSettings: {
      iconShow: false,
      title: "挖掘機每日作業前檢點表(作業前)",
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
        Measures: "",
      },
    },
    items: [
        { question: "1. 引擎冷卻水(水箱)" },
        { question: "2. 引擎機油" },
        { question: "3. 履帶鬆緊度及有無損傷" },
        { question: "4. 電瓶及電器設備" },
        { question: "5. 各動作部分潤滑" },
        { question: "6. 空氣濾清器清潔" },
        { question: "7. 液壓油檢查(操作油)" },
        { question: "8. 方向操作系統動作範圍檢查" },
        { question: "9. 煞車能力動作情況檢查" },
        { question: "10. 儀表、燈及喇叭操作情況檢查" },
        { question: "11. 柴油油量" },
        { question: "12. 有否漏油現象檢查" },
        { question: "13. 各部機件異常聲音及不正常動作" },
        { question: "14. 制動器、連結裝置是否正常" },
    ],
    settings:{
      subtitle:[
        "1.依職業安全衛生法第23條及職業安全衛生管理辦法第50條規定辦理。",
        "2.依檢查結果選擇正常、異常、無此項目。",
        "3.缺點由使用單位自行改善，不克者委請設備商修護。",
        "4.本表月底前完成檢查，經主管核章後，留存於管理單位，保存三年備查。",
      ],
      qestions: [
        { question: "1. 引擎冷卻水(水箱)" },
        { question: "2. 引擎機油" },
        { question: "3. 履帶鬆緊度及有無損傷" },
        { question: "4. 電瓶及電器設備" },
        { question: "5. 各動作部分潤滑" },
        { question: "6. 空氣濾清器清潔" },
        { question: "7. 液壓油檢查(操作油)" },
        { question: "8. 方向操作系統動作範圍檢查" },
        { question: "9. 煞車能力動作情況檢查" },
        { question: "10. 儀表、燈及喇叭操作情況檢查" },
        { question: "11. 柴油油量" },
        { question: "12. 有否漏油現象檢查" },
        { question: "13. 各部機件異常聲音及不正常動作" },
        { question: "14. 制動器、連結裝置是否正常" },
      ],
      columns: {
        option: "CheckOption",
        memo: "Memo_",
      },
      width: {
        qusetion: 4,
        option: 5,
        memo: 3,
      },
      advice: { 
        Advice: true,
        Measures: true,
      }
    }
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
          "Memo_1",
          "CheckOption2",
          "Memo_2",
          "CheckOption3",
          "Memo_3",
          "CheckOption4",
          "Memo_4",
          "CheckOption5",
          "Memo_5",
          "CheckOption6",
          "Memo_6",
          "CheckOption7",
          "Memo_7",
          "CheckOption8",
          "Memo_8",
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
    },
    save() {
      const that = this;
      let rtnObj = [];
      const keyArr = Object.keys(that.inputData.editableData);
      keyArr.forEach((e) => {
        rtnObj.push({ Column: e, Value: that.inputData.editableData[e] });
      });
      encodeObject(rtnObj);
      console.log(rtnObj)
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
  },
  filters: {

  },
  watch: {},
};
</script>