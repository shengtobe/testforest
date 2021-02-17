<template>
  <v-card>
    <v-card-title class="blue white--text px-4 py-1">
      {{ editType }}{{ commonSettings.title }}
      <v-spacer></v-spacer>
      <v-btn dark fab small text @click="close" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <!-- <div class="px-6 py-4">
      <v-row>
        <v-col cols="12">
          <p>1.依職業安全衛生法第23條規定辦理。</p>
          <p>
            2.檢查結果應詳實紀錄。檢查結果請依狀態選擇正常、異常、無此項目。
          </p>
          <p>3.缺點由使用單位自行改善，不克者委請設備商修護</p>
          <p>
            4.本定期檢查表於每年1.4.7.10月月底前完成檢查，經主管核章後，留存於管理單位之系統保存備查
          </p>
        </v-col> -->
    <!-- 檢查項目 -->
    <!-- <v-col cols="12">
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
              <deptSelect
                label="管理單位"
                v-model="inputData.DepartCode"
                :showIcon="commonSettings.iconShow"
                outType="key"
                :readonly="commonSettings.deptReadonly"
                key="department"
              />
            </v-col>
            <v-col cols="12" sm="4">
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
            <v-col cols="12" sm="4">
              <h3 class="mb-1">檢查部分</h3>
            </v-col>
            <v-col cols="12" sm="3">
              <h3 class="mb-1">檢查方法</h3>
            </v-col>
            <v-col cols="12" sm="2">
              <h3 class="mb-1">檢查結果</h3>
            </v-col>
            <v-col cols="12" sm="3">
              <h3 class="mb-1">備註</h3>
            </v-col>
          </v-row>
          <v-alert
            dense
            border="top"
            colored-border
            color="teal"
            elevation="4"
            v-for="(item, idx) in items"
            :key="idx"
            class="mb-6"
          >
            <v-row no-gutter>
              <v-col cols="12" sm="4">{{ item.question }}</v-col>
              <v-col cols="12" sm="3">{{ item.checkMethod }}</v-col>
              <v-col cols="12" sm="2">
                <span class="d-sm-none error--text">檢查結果：</span>
                <v-radio-group
                  dense
                  row
                  v-model="inputData.editableData['CheckOption' + (idx + 1)]"
                  class="pa-0 ma-0"
                >
                  <v-radio color="success" label="正常" value="1"></v-radio>
                  <v-radio color="red" label="異常" value="2"></v-radio>
                  <v-radio color="black" label="無此項目" value="3"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" sm="3">
                <v-textarea
                  auto-grow
                  outlined
                  rows="2"
                  v-model="inputData.editableData['Memo_' + (idx + 1)]"
                />
              </v-col>
            </v-row>
          </v-alert>
        </v-col> -->
    <!-- 改善建議、改善追蹤 -->
    <!-- <v-col cols="12">
          <h3 class="mb-1 indigo--text">改善建議</h3>
          <v-textarea
            auto-grow
            outlined
            rows="4"
            v-model="inputData.editableData.Advice"
          />
        </v-col>
        <v-col cols="12">
          <h3 class="mb-1 indigo--text">改善措施</h3>
          <v-textarea
            auto-grow
            outlined
            rows="4"
            v-model="inputData.editableData.Measures"
          />
        </v-col> -->
    <!-- END 檢查項目 -->
    <!-- </v-row>
    </div> -->
    <commonQuestion v-model="inputData" :settings="settings" />
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
    DB_Table: "RP032",
    action: Actions.add,
    actions: Actions,
    commonSettings: {
      iconShow: false,
      title: "割草機定期檢查表(三個月)",
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
        Memo_1: "",
        Memo_2: "",
        Memo_3: "",
        Memo_4: "",
        Memo_5: "",
        Memo_6: "",
        Memo_7: "",
        Memo_8: "",
        Advice: "",
        Measures: "",
      },
    },
    items: [
      { question: "1.刀刃是否牢固有無裂痕或不堪使用", checkMethod: "目視點檢" },
      { question: "2.護罩有無破裂或不堪使用", checkMethod: "目視點檢" },
      { question: "3.引擎是否牢固、有無漏油", checkMethod: "動作測試" },
      { question: "4.各部位螺栓有無鬆脫", checkMethod: "動作測試" },
      { question: "5.背帶有無斷裂或不堪使用", checkMethod: "目視點檢" },
      { question: "6.控制把手是否牢固、油門是否順暢", checkMethod: "目視點檢" },
      { question: "7.試運轉是否順暢、有無異常噪音", checkMethod: "動作測試" },
      { question: "8.其他", checkMethod: "目視點檢" },
    ],
    settings: {
      subtitle: [
        "1.依職業安全衛生法第23條規定辦理。",
        "2.檢查結果應詳實紀錄。檢查結果請依狀態選擇正常、異常、無此項目。",
        "3.缺點由使用單位自行改善，不克者委請設備商修護。",
        "4.本定期檢查表於每年1.4.7.10月月底前完成檢查，經主管核章後，留存於管理單位之系統保存備查。",
      ],
      qestions: [
        { question: "1.刀刃是否牢固有無裂痕或不堪使用", method: "目視點檢" },
        { question: "2.護罩有無破裂或不堪使用", method: "目視點檢" },
        { question: "3.引擎是否牢固、有無漏油", method: "動作測試" },
        { question: "4.各部位螺栓有無鬆脫", method: "動作測試" },
        { question: "5.背帶有無斷裂或不堪使用", method: "目視點檢" },
        { question: "6.控制把手是否牢固、油門是否順暢", method: "目視點檢" },
        { question: "7.試運轉是否順暢、有無異常噪音", method: "動作測試" },
        { question: "8.其他", method: "目視點檢" },
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
      advice: {
        Advice: true,
        Measures: true,
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