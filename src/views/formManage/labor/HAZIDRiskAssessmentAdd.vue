<template>
  <v-sheet class="ma-4 mb-8" color="yellow lighten-2">
    <v-container style="max-width: 1600px" class="px-8">
      <p class="font-weight-black title text-center">
        {{ editType }}{{ newText }}
      </p>
      <v-row class="white px-4">
        <!-- 上面的欄位 -->
        <v-col cols="12" sm="4">
          <dateSelect
            label="評估日期"
            key="checkDate"
            :showIcon="commonSettings.iconShow"
            v-model.lazy="inputData.editableData.CheckDay"
          />
        </v-col>
        <v-col cols="12" sm="4">
          <h3 class="mb-1">單位/部門</h3>
          <v-text-field solo v-model.lazy="inputData.DepartName" />
        </v-col>
        <v-col cols="12" sm="4">
          <h3 class="mb-1">受評估之場所</h3>
          <v-text-field solo v-model.lazy="inputData.editableData.Location" />
        </v-col>
        <v-col cols="12" sm="4">
          <h3 class="mb-1">場所內工作型態及人數</h3>
          <v-text-field solo v-model.lazy="inputData.editableData.Memo1" />
        </v-col>
        <v-col cols="12" sm="4">
          <h3 class="mb-1">評估人員</h3>
          <v-text-field solo v-model.lazy="inputData.Name" key="name" />
        </v-col>
        <v-col cols="12" sm="4">
          <h3 class="mb-1">審核者</h3>
          <v-text-field solo v-model.lazy="inputData.CheckMan" />
        </v-col>
        <hr />
      </v-row>

      <div v-for="(each, idx) in questionsList" :key="idx">
        <v-row>
          <!-- 檢查項目 -->
          <v-col cols="12" sm="12">
            <v-toolbar color="teal lighten-2" dark>
              <v-spacer />
              <v-toolbar-title>{{ each.title }}</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
          </v-col>
        </v-row>
        <!-- 外部不法侵害內容 -->

        <div v-for="(question, idx2) in each.questions" :key="idx + '_' + idx2">
          <!-- header -->
          <v-row dense v-if="idx2 % 5 == 0" :key="'header' + idx + '_' + idx2">
            <v-col cols="auto" sm="2">
              <h3 class="mb-1">潛在風險</h3>
            </v-col>
            <v-col cols="auto" sm="1">
              <h3 class="mb-1">是/否</h3>
            </v-col>
            <v-col cols="auto" sm="2">
              <h3 class="mb-1">潛在不法侵害風險類型</h3>
            </v-col>
            <v-col cols="auto" sm="1">
              <v-tooltip bottom :key="'tooltip_' + idx + '_' + idx2 + '_1'">
                <template v-slot:activator="{ on, attrs }">
                  <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
                </template>
                <span>(發生機率)</span>
              </v-tooltip>
            </v-col>
            <v-col cols="auto" sm="1">
              <v-tooltip bottom :key="'tooltip_' + idx + '_' + idx2 + '_2'">
                <template v-slot:activator="{ on, attrs }">
                  <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
                </template>
                <span>(傷害程度)</span>
              </v-tooltip>
            </v-col>
            <v-col cols="auto" sm="1">
              <h3 class="mb-1">風險等級</h3>
            </v-col>
            <v-col cols="auto" sm="1">
              <v-tooltip bottom :key="'tooltip_' + idx + '_' + idx2 + '_3'">
                <template v-slot:activator="{ on, attrs }">
                  <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
                </template>
                <span>(工程控制/管理控制/個人防護)</span>
              </v-tooltip>
            </v-col>
            <v-col cols="auto" sm="2">
              <h3 class="mb-1">應增加或修正相關措施</h3>
            </v-col>
          </v-row>
          <!-- body -->
          <hazidRiskAssessmentQuestion
            v-model="each.questions[idx2]"
            :question="question"
            :key="'hazidRiskAssessmentQuestion_' + idx + '_' + idx2"
            :idx="idx"
            :idx2="idx2"
          />
        </div>
      </div>
      <v-card-actions class="px-5 pb-5">
        <v-btn
          v-if="editType != actions.add"
          elevation="4"
          color="red"
          class="mr-2 white--text"
          @click="deleteRecord"
          >刪除</v-btn
        >
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
      <!-- 刪除確認視窗 -->
      <v-dialog v-model="dialogDel" persistent max-width="290">
        <dialogDelete
          :id="userData.UserId"
          :DB_Table="DB_Table"
          :RPFlowNo="RPFlowNo"
          :key="'d' + DelDynamicKey"
          @close="close"
          @cancel="closeDialogDel"
        />
      </v-dialog>
    </v-container>
  </v-sheet>
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
import {
  fetchFormOrderOne,
  createFormOrder0,
  updateFormOrder,
} from "@/apis/formManage/serve";
import dateSelect from "@/components/forManage/dateSelect";
import hazidRiskAssessmentQuestion from "@/components/forManage/hazidRiskAssessmentQuestion";
import { Actions } from "@/assets/js/actions";
import dialogDelete from "@/components/forManage/dialogDelete";
import { Constrant } from "@/assets/js/constrant";

class Question {
  constructor(description) {
    this.description = description;
    this.yesNo = "";
    this.illegalType = "";
    this.possibility = "";
    this.seriousness = "";
    this.riskLevel = 0;
    this.controlMechanism = "";
    this.measures = "";
  }

  get riskLevelStr() {
    if (this.possibility == "" || this.seriousness == "") {
      return "";
    }
    this.riskLevel = parseInt(this.possibility) * parseInt(this.seriousness);
    if (this.riskLevel <= 2) {
      return "低度風險";
    } else if (this.riskLevel <= 4) {
      return "中度風險";
    } else {
      return "高度風險";
    }
  }

  get riskColor() {
    if (this.possibility == "" || this.seriousness == "") {
      return "";
    }
    var tmp;
    if (this.riskLevel == "") {
      tmp = parseInt(this.possibility) * parseInt(this.seriousness);
    } else {
      tmp = parseInt(this.riskLevel);
    }
    this.riskLevel = tmp;
    if (tmp <= 2) {
      return "green--text";
    } else if (tmp <= 4) {
      return "orange--text";
    } else {
      return "red--text";
    }
  }
}

export default {
  data: () => ({
    title: "職場不法侵害預防之危害辨識及風險評估表",
    newText: "評估表",
    actions: Actions,
    editType: "",
    dialogDel: false, // model off
    // ---- api
    DB_Table: "RP095",
    RPFlowNo: "",
    isLoading: false,
    disabled: false,
    menu: false, // 時間選單是否顯示
    DelDynamicKey: 0,
    commonSettings: {
      iconShow: true,
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
        Location: "",
        Memo1: "",
        CheckDay: "",
      },
    },
    questionsList: [
      {
        title: "外部不法侵害",
        questions: [
          new Question(
            "是否有組織外之人員(承包商、客戶、服務對象或親友等)因其行為無法預知，可能成為該區工作者之不法侵害來源"
          ),
          new Question("是否有已知工作會接觸有暴力史之客戶"),
          new Question("勞工之工作性質是否為執行公共安全業務"),
          new Question("勞工之工作是否為單獨作業"),
          new Question("勞工是否需於深夜或凌晨工作"),
          new Question("勞工是否需於較陌生之環境工作"),
          new Question("勞工之工作是否涉及現金交易、運送或處理貴重物品"),
          new Question("勞工之工作是否為直接面對群眾之第一線服務工作"),
          new Question("勞工之工作是否會與酗酒、毒癮或精神疾病者接觸"),
          new Question("勞工之工作是否需接觸絕望或恐懼或亟需被關懷照顧者"),
          new Question(
            "勞工當中是否有自行通報因私人關係遭受不法侵害威脅者或為家庭暴力受害者"
          ),
          new Question("新進勞工是否有尚未接受職場不法侵害預防教育訓練者"),
          new Question("工作場所是否位於治安不佳或交通不便之偏遠地區"),
          new Question("工作環境中是否有讓施暴者隱藏的地方"),
          new Question(
            "離開工作場所後，是否可能遭遇因執行職務所致之不法侵害行為"
          ),
        ],
      },
      {
        title: "內部不法侵害",
        questions: [
          new Question(
            "組織內是否曾發生主管或勞工遭受同事(含上司)不當言行之對待"
          ),
          new Question("是否有無法接受不同性別、年齡、國籍或宗教信仰之工作者"),
          new Question(
            "是否有同仁之離職或請求調職原因源於職場不法侵害事件之發生"
          ),
          new Question("內部是否有酗酒、毒癮之工作者"),
          new Question("內部是否有情緒不穩定或精神疾患病史之工作者"),
          new Question("是否有被同仁排擠或工作適應不良之工作者"),
          new Question(
            "內部是否有處於情緒低落、絕望或恐懼，亟需被關懷照顧之工作者"
          ),
          new Question("是否有超時工作，反應工作壓力大之工作者"),
          new Question("工作環境是否有空間擁擠，照明設備不足之問題"),
          new Question("工作場所出入是否未有相關管制措施"),
        ],
      },
    ],
  }),
  components: {
    dateSelect,
    hazidRiskAssessmentQuestion,
    dialogDelete,
  },
  created() {
    if (this.$route.query.editType == 1) {
      this.editType = this.actions.add;
    } else {
      this.editType = this.actions.edit;
      this.RPFlowNo = this.$route.query.RPFlowNo;
    }
  },
  mounted() {
    this.editType == this.actions.edit
      ? this.viewPage(this.RPFlowNo)
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
    save() {
      const that = this;
      let rtnObj = [];
      const keyArr = Object.keys(that.inputData.editableData);
      keyArr.forEach((e) => {
        rtnObj.push({ Column: e, Value: that.inputData.editableData[e] });
      });

      // for all questions
      var i = 1;
      this.questionsList.forEach((each) => {
        each.questions.forEach((question) => {
          rtnObj.push({
            Column: "CheckOption" + i + "_1",
            Value: question.yesNo,
          });
          rtnObj.push({
            Column: "CheckOption" + i + "_2",
            Value: question.illegalType,
          });
          rtnObj.push({
            Column: "CheckOption" + i + "_3",
            Value: question.possibility,
          });
          rtnObj.push({
            Column: "CheckOption" + i + "_4",
            Value: question.seriousness,
          });
          rtnObj.push({
            Column: "CheckOption" + i + "_5",
            Value: question.riskLevel,
          });
          rtnObj.push({
            Column: "CheckOption" + i + "_6",
            Value: question.controlMechanism,
          });
          rtnObj.push({
            Column: "CheckOption" + i + "_7",
            Value: question.measures,
          });
          i++;
        });
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
              this.$router.push({ path: "/error" });
            }
          })
          .catch((err) => {
            console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.insert.failed });
          })
          .finally(() => {
            this.close();
          });
      } else {
        //就是edit
        updateFormOrder({
          ClientReqTime: getNowFullTime(), // client 端請求時間
          OperatorID: this.userData.UserId, // 操作人id
          RPFlowNo: this.RPFlowNo,
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
              this.$router.push({ path: "/error" });
            }
          })
          .catch((err) => {
            console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.update.failed });
          })
          .finally(() => {
            this.close();
          });
      }
    },
    close() {
      this.$router.push({ path: "/form-manage/labor/hazid-risk-assessment" });
    },
    newPage() {},
    viewPage(RPFlowNo) {
      this.chLoadingShow();
      fetchFormOrderOne({
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.userData.UserId, // 操作人id
        KeyName: this.DB_Table, // DB table
        KeyItem: [{ Column: "RPFlowNo", Value: RPFlowNo }],
        QyName: [
          "RPFlowNo",
          "CheckDay",
          "DepartName",
          "DepartCode",
          "ID",
          "Name",
          "Location",
          "Memo1",
          "CheckOption1_1",
          "CheckOption1_2",
          "CheckOption1_3",
          "CheckOption1_4",
          "CheckOption1_5",
          "CheckOption1_6",
          "CheckOption1_7",
          "CheckOption2_1",
          "CheckOption2_2",
          "CheckOption2_3",
          "CheckOption2_4",
          "CheckOption2_5",
          "CheckOption2_6",
          "CheckOption2_7",
          "CheckOption3_1",
          "CheckOption3_2",
          "CheckOption3_3",
          "CheckOption3_4",
          "CheckOption3_5",
          "CheckOption3_6",
          "CheckOption3_7",
          "CheckOption4_1",
          "CheckOption4_2",
          "CheckOption4_3",
          "CheckOption4_4",
          "CheckOption4_5",
          "CheckOption4_6",
          "CheckOption4_7",
          "CheckOption5_1",
          "CheckOption5_2",
          "CheckOption5_3",
          "CheckOption5_4",
          "CheckOption5_5",
          "CheckOption5_6",
          "CheckOption5_7",
          "CheckOption6_1",
          "CheckOption6_2",
          "CheckOption6_3",
          "CheckOption6_4",
          "CheckOption6_5",
          "CheckOption6_6",
          "CheckOption6_7",
          "CheckOption7_1",
          "CheckOption7_2",
          "CheckOption7_3",
          "CheckOption7_4",
          "CheckOption7_5",
          "CheckOption7_6",
          "CheckOption7_7",
          "CheckOption8_1",
          "CheckOption8_2",
          "CheckOption8_3",
          "CheckOption8_4",
          "CheckOption8_5",
          "CheckOption8_6",
          "CheckOption8_7",
          "CheckOption9_1",
          "CheckOption9_2",
          "CheckOption9_3",
          "CheckOption9_4",
          "CheckOption9_5",
          "CheckOption9_6",
          "CheckOption9_7",
          "CheckOption10_1",
          "CheckOption10_2",
          "CheckOption10_3",
          "CheckOption10_4",
          "CheckOption10_5",
          "CheckOption10_6",
          "CheckOption10_7",
          "CheckOption11_1",
          "CheckOption11_2",
          "CheckOption11_3",
          "CheckOption11_4",
          "CheckOption11_5",
          "CheckOption11_6",
          "CheckOption11_7",
          "CheckOption12_1",
          "CheckOption12_2",
          "CheckOption12_3",
          "CheckOption12_4",
          "CheckOption12_5",
          "CheckOption12_6",
          "CheckOption12_7",
          "CheckOption13_1",
          "CheckOption13_2",
          "CheckOption13_3",
          "CheckOption13_4",
          "CheckOption13_5",
          "CheckOption13_6",
          "CheckOption13_7",
          "CheckOption14_1",
          "CheckOption14_2",
          "CheckOption14_3",
          "CheckOption14_4",
          "CheckOption14_5",
          "CheckOption14_6",
          "CheckOption14_7",
          "CheckOption15_1",
          "CheckOption15_2",
          "CheckOption15_3",
          "CheckOption15_4",
          "CheckOption15_5",
          "CheckOption15_6",
          "CheckOption15_7",
          "CheckOption16_1",
          "CheckOption16_2",
          "CheckOption16_3",
          "CheckOption16_4",
          "CheckOption16_5",
          "CheckOption16_6",
          "CheckOption16_7",
          "CheckOption17_1",
          "CheckOption17_2",
          "CheckOption17_3",
          "CheckOption17_4",
          "CheckOption17_5",
          "CheckOption17_6",
          "CheckOption17_7",
          "CheckOption18_1",
          "CheckOption18_2",
          "CheckOption18_3",
          "CheckOption18_4",
          "CheckOption18_5",
          "CheckOption18_6",
          "CheckOption18_7",
          "CheckOption19_1",
          "CheckOption19_2",
          "CheckOption19_3",
          "CheckOption19_4",
          "CheckOption19_5",
          "CheckOption19_6",
          "CheckOption19_7",
          "CheckOption20_1",
          "CheckOption20_2",
          "CheckOption20_3",
          "CheckOption20_4",
          "CheckOption20_5",
          "CheckOption20_6",
          "CheckOption20_7",
          "CheckOption21_1",
          "CheckOption21_2",
          "CheckOption21_3",
          "CheckOption21_4",
          "CheckOption21_5",
          "CheckOption21_6",
          "CheckOption21_7",
          "CheckOption22_1",
          "CheckOption22_2",
          "CheckOption22_3",
          "CheckOption22_4",
          "CheckOption22_5",
          "CheckOption22_6",
          "CheckOption22_7",
          "CheckOption23_1",
          "CheckOption23_2",
          "CheckOption23_3",
          "CheckOption23_4",
          "CheckOption23_5",
          "CheckOption23_6",
          "CheckOption23_7",
          "CheckOption24_1",
          "CheckOption24_2",
          "CheckOption24_3",
          "CheckOption24_4",
          "CheckOption24_5",
          "CheckOption24_6",
          "CheckOption24_7",
          "CheckOption25_1",
          "CheckOption25_2",
          "CheckOption25_3",
          "CheckOption25_4",
          "CheckOption25_5",
          "CheckOption25_6",
          "CheckOption25_7",
        ],
      })
        .then((res) => {
          const that = this;
          let dat = JSON.parse(res.data.DT);
          let data = dat[0];
          console.log(data);
          data.CheckDay = data.CheckDay.substr(0, 10);
          this.inputData.RPFlowNo = RPFlowNo;
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

          // for all questions
          var i = 1;
          this.questionsList.forEach((each) => {
            each.questions.forEach((question) => {
              question.yesNo = data["CheckOption" + i + "_1"];
              question.illegalType = data["CheckOption" + i + "_2"];
              question.possibility = data["CheckOption" + i + "_3"];
              question.seriousness = data["CheckOption" + i + "_4"];
              question.riskLevel = data["CheckOption" + i + "_5"];
              question.controlMechanism = data["CheckOption" + i + "_6"];
              question.measures = data["CheckOption" + i + "_7"];
              i++;
            });
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
    deleteRecord() {
      this.dialogDel = true;
      this.DelDynamicKey += 1;
    },
    closeDialogDel() {
      //關閉刪除視窗
      this.dialogDel = false;
    },
  },
};
</script>