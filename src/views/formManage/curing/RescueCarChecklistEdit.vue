<template>
  <v-card class="theme-card">
    <v-card-title class="white--text px-4 py-1">
      {{ editType }}{{ commonSettings.title }}
      <v-spacer></v-spacer>
      <v-btn dark fab small text @click="close" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <!-- <commonQuestion v-model="inputData" :settings="settings" /> -->
    <div class="px-6 py-4 label-header">
      <v-row>
        <!-- 檢查項目 -->
        <v-col cols="12">
          <v-row no-gutter class="indigo--text">
            <v-col cols="12" sm="4">
              <dateSelect
                label="檢查日期"
                key="checkDate"
                :showIcon="commonSettings.iconShow"
                v-model="inputData.editableData.CheckDay"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">使用單位</h3>
              <v-text-field
                solo
                v-model="inputData.DepartName"
                :readonly="commonSettings.deptReadonly"
              />
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <h3 class="mb-1">檢查人員</h3>
              <v-text-field
                solo
                v-model="inputData.Name"
                :readonly="commonSettings.deptReadonly"
              />
            </v-col>
          </v-row>
          <v-row
            no-gutter
            class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
          >
            <v-col cols="12" sm="3">
              <h3 class="mb-1">檢查項目</h3>
            </v-col>
            <v-col cols="12" sm="3">
              <h3 class="mb-1">操作情形</h3>
            </v-col>
            <v-col cols="12" sm="3">
              <h3 class="mb-1">改善方法</h3>
            </v-col>
            <v-col cols="12" sm="3">
              <h3 class="mb-1">備註</h3>
            </v-col>
          </v-row>
          <v-alert
            dense
            border="top"
            colored-border
            color="border-bg-dark-yellow"
            elevation="4"
            v-for="(item, idx) in items"
            :key="idx"
            class="mb-6"
          >
            <v-row no-gutter>
              <v-col cols="12" sm="3">{{ item.question }}</v-col>
              <v-col cols="12" sm="3">
                <span class="d-sm-none error--text">操作情形：</span>
                <v-radio-group
                  dense
                  row
                  v-model="
                    inputData.editableData[settings.columns.option + (idx + 1)]
                  "
                  class="pa-0 ma-0"
                >
                  <v-radio color="success" label="正常" value="1" />
                  <v-radio color="red" label="不正常" value="2" />
                  <v-radio color="black" label="無此項目" value="0" />
                </v-radio-group>
              </v-col>
              <v-col cols="12" sm="3">
                <v-textarea
                  hide-details
                  auto-grow
                  outlined
                  rows="2"
                  v-model="
                    inputData.editableData[settings.columns.advice + (idx + 1)]
                  "
                />
              </v-col>
              <v-col cols="12" sm="3">
                <v-textarea
                  hide-details
                  auto-grow
                  outlined
                  rows="2"
                  v-model="
                    inputData.editableData[settings.columns.memo + (idx + 1)]
                  "
                />
              </v-col>
            </v-row>
          </v-alert>
        </v-col>
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
        title: "搶修車設備定期保養紀錄表",
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
          CheckOption1: "",
          Advice1: "",
          Memo1: "",
          CheckOption2: "",
          Advice2: "",
          Memo2: "",
          CheckOption3: "",
          Advice3: "",
          Memo3: "",
          CheckOption4: "",
          Advice4: "",
          Memo4: "",
          CheckOption5: "",
          Advice5: "",
          Memo5: "",
          CheckOption6: "",
          Advice6: "",
          Memo6: "",
          CheckOption7: "",
          Advice7: "",
          Memo7: "",
          CheckOption8: "",
          Advice8: "",
          Memo8: "",
          CheckOption9: "",
          Advice9: "",
          Memo9: "",
          CheckOption10: "",
          Advice10: "",
          Memo10: "",
          CheckOption11: "",
          Advice11: "",
          Memo11: "",
          CheckOption12: "",
          Advice12: "",
          Memo12: "",
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
      items: [
        { question: "1. 動力液壓組" },
        { question: "2. 頂昇油壓缸" },
        { question: "3. 頂昇油壓缸底座" },
        { question: "4. 側移油壓缸" },
        { question: "5. 架高器" },
        { question: "6. 復軌橋" },
        { question: "7. 復軌橋連結器" },
        { question: "8. 雙向閥" },
        { question: "9. 手動式千斤頂" },
        { question: "10. 墊隙枕木" },
        { question: "11. 鋼索" },
        { question: "12. 鏈鋸" },
      ],
      settings: {
        qestions: [
          { question: "1. 動力液壓組" },
          { question: "2. 頂昇油壓缸" },
          { question: "3. 頂昇油壓缸底座" },
          { question: "4. 側移油壓缸" },
          { question: "5. 架高器" },
          { question: "6. 復軌橋" },
          { question: "7. 復軌橋連結器" },
          { question: "8. 雙向閥" },
          { question: "9. 手動式千斤頂" },
          { question: "10. 墊隙枕木" },
          { question: "11. 鋼索" },
          { question: "12. 鏈鋸" },
        ],
        columns: {
          option: "CheckOption",
          advice: "Advice",
          memo: "Memo",
        },
        width: {
          qusetion: 4,
          advice: 3,
          option: 2,
          memo: 3,
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
          "Advice1",
          "Memo1",
          "CheckOption2",
          "Advice2",
          "Memo2",
          "CheckOption3",
          "Advice3",
          "Memo3",
          "CheckOption4",
          "Advice4",
          "Memo4",
          "CheckOption5",
          "Advice5",
          "Memo5",
          "CheckOption6",
          "Advice6",
          "Memo6",
          "CheckOption7",
          "Advice7",
          "Memo7",
          "CheckOption8",
          "Advice8",
          "Memo8",
          "CheckOption9",
          "Advice9",
          "Memo9",
          "CheckOption10",
          "Advice10",
          "Memo10",
          "CheckOption11",
          "Advice11",
          "Memo11",
          "CheckOption12",
          "Advice12",
          "Memo12",
        ],
      })
        .then((res) => {
          
          let dat = JSON.parse(res.data.DT);
          dat[0].CheckDay = dat[0].CheckDay.substr(0, 10);
          this.inputData.RPFlowNo = this.item.RPFlowNo;
          this.inputData.DepartCode = dat[0].DepartCode;
          this.inputData.DepartName = dat[0].DepartName;
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
