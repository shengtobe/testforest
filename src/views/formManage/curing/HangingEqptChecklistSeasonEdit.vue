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
        <v-radio color="success" label="正常" value="1"></v-radio>
        <v-radio color="red" label="異常" value="2"></v-radio>
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
      title: "吊掛用具定期檢查表(三個月)",
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
        Memo1: "",
        CheckOption2: "0",
        Memo2: "",
        CheckOption3: "0",
        Memo3: "",
        CheckOption4: "0",
        Memo4: "",
        CheckOption5: "0",
        Memo5: "",
        CheckOption6: "0",
        Memo6: "",
        CheckOption7: "0",
        Memo7: "",
        CheckOption8: "0",
        Memo8: "",
        CheckOption9: "0",
        Memo9: "",
        CheckOption10: "0",
        Memo10: "",
        CheckOption11: "0",
        Memo11: "",
      },
    },
    settings: {
      subtitle: [
        "1.依職業安全衛生法第23條規定辦理。",
        "2.檢查結果應詳實紀錄。檢查結果請依狀態選擇正常、異常。",
        "3.缺點由使用單位自行改善，不克者委請設備商修護",
        "4.本定期檢查表於每年1.4.7.10月月底前完成檢查，經主管核章後，留存於管理單位之系統保存備查",
      ],
      qestions: [
        { question: "1.吊索鋼絲索的一燃間有百分之十  以上的素線截斷者",method: "目視點檢" },
        { question: "2.吊索直徑減少達公稱直徑百分之七以上者",method: "實地量測" },
        { question: "3.吊索已扭結者",method: "目視點檢" },
        { question: "4.吊索有顯著變形或腐蝕者",method: "目視點檢" },
        { question: "5.吊索末端結頭部份異常者",method: "目視點檢" },
        { question: "6.吊索鋼索套有裂紋產生",method: "目視點檢" },
        { question: "7.吊索鋼索套有變形情形，並壓迫傷及鋼索",method: "目視點檢" },
        { question: "8.吊鏈延伸長度超過百分之五以上",method: "實地量測" },
        { question: "9.吊鏈環的斷面直徑減少百分之十以上",method: "實地量測" },
        { question: "10.吊鏈有無龜裂",method: "目視點檢" },
        { question: "11.吊鏈有無顯著變形",method: "目視點檢" },
      ],
      columns: {
        option: "CheckOption",
        memo: "Memo",
      },
      width: {
        qusetion: 4,
        method: 2,
        option: 3,
        memo: 3,
      },
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
     
     
      this.chLoadingShow({show:true});
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
        ],
      })
        .then((res) => {
          
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
          ////console.log(err);
          this.chMsgbar({ success: false, msg: Constrant.query.failed });
        })
        .finally(() => {
          this.chLoadingShow({ show: false});
        });
    },
    close() {
      this.$emit("close");
      this.$emit("search");
    },
    save() {
      this.chLoadingShow({ show: true});
      const that = this;
      let rtnObj = [];
      const keyArr = Object.keys(that.inputData.editableData);
      keyArr.forEach((e) => {
        rtnObj.push({ Column: e, Value: that.inputData.editableData[e] });
      });
      encodeObject(rtnObj);
     
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
            ////console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.insert.failed });
          })
          .finally(() => {
          this.chLoadingShow({ show: false});
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
            ////console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.update.failed });
          })
          .finally(() => {
          this.chLoadingShow({ show: false});
            that.close();
          });
      }
    },
    deleteRecord() {
      this.$emit("deleteRecord", this.inputData.RPFlowNo);
    },
  },
};
</script>