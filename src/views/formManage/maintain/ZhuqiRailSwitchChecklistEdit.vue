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
        <template v-slot:memo2Name>修正事項與建議</template>
        <template v-slot:moreTitle>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">確認結果</h3>
          </v-col>
        </template>
        <template v-slot:moreMemo="item">
          <v-col
            cols="12"
            sm="3"
            >
            <v-textarea
              auto-grow
              outlined
              rows="2"
              v-model="item.editItem['Result' + (item.index + 1)]"
            />
          </v-col>
        </template>
        <template v-slot:moreDetails>
            <v-col cols="12" sm="4">
                <h3 class="mb-1">工作地點</h3>
                <v-text-field solo value v-model="inputData.editableData.Place" />
            </v-col>
            <v-col cols="12" sm="4">
                <h3 class="mb-1">班長</h3>
                <v-text-field solo value v-model="inputData.editableData.Supervisor1" />
            </v-col>
            <v-col cols="12" sm="4">
                <h3 class="mb-1">工務長</h3>
                <v-text-field solo value v-model="inputData.editableData.Supervisor2" />
            </v-col>
            <v-col cols="12" sm="4">
                <h3 class="mb-1">監工長</h3>
                <v-text-field solo value v-model="inputData.editableData.Supervisor3" />
            </v-col>
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
import Pagination from "@/components/Pagination.vue";
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
  data() {
    return {
      actions: Actions,
      commonSettings: {
        iconShow: false,
        title: "竹崎監工區抽換道岔作業自主檢查表",
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
          Place: "",
          Supervisor1: "",
          Supervisor2: "",
          Supervisor3: "",
          CheckOption1: "",
          Advice1: "",
          Result1: "",
          CheckOption2: "",
          Advice2: "",
          Result2: "",
          CheckOption3: "",
          Advice3: "",
          Result3: "",
          CheckOption4: "",
          Advice4: "",
          Result4: "",
          CheckOption5: "",
          Advice5: "",
          Result5: "",
          CheckOption6: "",
          Advice6: "",
          Result6: "",
          CheckOption7: "",
          Advice7: "",
          Result7: "",
          CheckOption8: "",
          Advice8: "",
          Result8: "",
        },
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
      settings: {
        qestions: [
            { question: "1. 檢查道岔材料(組裝前)" },
            { question: "2. 基礎整地是否水平" },
            { question: "3. 組裝工作是否依規章執行" },
            { question: "4. 抽換工作前複檢工作" },
            { question: "5. 檢驗密貼情形" },
            { question: "6. 施工前工具及人力檢查" },
            { question: "7. 施工完後軌距、水平、高低、方向、平面等檢查" },
            { question: "8. 施工完竣測試運轉" },
        ],
        columns: {
          option: "CheckOption",
          memo2: "Advice",
        },
        width: {
          qusetion: 4,
          option: 2,
          memo2: 3,
        },
      },
    };
  },
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
          "Place",
          "Supervisor1",
          "Supervisor2",
          "Supervisor3",
          "CheckOption1",
          "Advice1",
          "Result1",
          "CheckOption2",
          "Advice2",
          "Result2",
          "CheckOption3",
          "Advice3",
          "Result3",
          "CheckOption4",
          "Advice4",
          "Result4",
          "CheckOption5",
          "Advice5",
          "Result5",
          "CheckOption6",
          "Advice6",
          "Result6",
          "CheckOption7",
          "Advice7",
          "Result7",
          "CheckOption8",
          "Advice8",
          "Result8",
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
          this.chLoadingShow({ show: false});
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
