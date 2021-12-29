<template>
  <v-card class="theme-card">
    <v-card-title class=" white--text px-4 py-1">
      {{ editType }}{{ commonSettings.title }}
      <v-spacer />
      <v-btn dark fab small text @click="close" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <div class="px-6 py-4">
      <v-row>
        <v-col>
          <p>1.特殊軔塊厚度及車輪磨耗接近限度追蹤事項應予填註。</p>
          <p>2.本保養表應將檢車過程發現問題事項詳以填註。</p>
        </v-col>
      </v-row>
      <!-- 1 -->
      <v-row class="label-header">
        <v-col cols="12" sm="3">
          <h3 class="mb-1">使用前、後</h3>
          <v-radio-group dense row v-model="inputData.editableData.Status">
            <v-radio color="success" label="使用前" value="1" />
            <v-radio color="info" label="使用後" value="2" />
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="3">
          <h3 class="mb-1">保養單位</h3>
          <v-text-field v-model="inputData.DepartName" solo />
        </v-col>
        <v-col cols="12" sm="3">
          <dateSelect
            label="保養日期"
            key="CkeckDay"
            :showIcon="commonSettings.iconShow"
            v-model="inputData.editableData.CheckDay"
          />
        </v-col>
      </v-row>
      <!-- 2 -->
      <v-row class="label-header">
        <v-col cols="12" sm="3">
          <h3 class="mb-1">司機員</h3>
          <v-text-field v-model="inputData.editableData.Driver" solo />
        </v-col>
        <v-col cols="12" sm="3">
          <h3 class="mb-1">車次</h3>
          <v-text-field v-model="inputData.editableData.TrainNumber" solo />
        </v-col>
        <v-col cols="12" sm="3">
          <h3 class="mb-1">車種</h3>
          <v-text-field v-model="inputData.editableData.TrainType" solo />
        </v-col>
        <v-col cols="12" sm="3">
          <h3 class="mb-1">車號</h3>
          <v-textarea v-model="inputData.editableData.TrainID" solo rows="1" />
        </v-col>
      </v-row>
      <!-- for loop -->
      <v-alert
        dense
        border="top"
        colored-border
        color="border-bg-dark-yellow"
        elevation="4"
        v-for="(question, idx) in questions"
        :key="idx"
        class="mb-6 mt-4"
      >
        <v-row>
          <v-col>
            <h3 class="mb-1 label-header">{{ question.label }}</h3>
          </v-col>
        </v-row>
        <v-row class="label-header">
          <v-col>
            <h3>{{ question.description }}</h3>
            <v-radio-group
              dense
              row
              v-model="
                inputData.editableData[settings.columns.option + (idx + 1)]
              "
            >
              <v-radio color="success" label="正常" value="1"></v-radio>
              <v-radio
                color="orange darken-4"
                label="經修復或抽換"
                value="2"
              ></v-radio>
              <v-radio color="info" label="當日未能修復" value="3"></v-radio>
              <v-radio color="red" label="須進廠拆解修理" value="4"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col>
            <v-textarea
              auto-grow
              outlined
              label="說明"
              rows="4"
              v-model="
                inputData.editableData[settings.columns.memo + (idx + 1)]
              "
            />
          </v-col>
        </v-row>
      </v-alert>
      <!-- 4 -->
      <v-row class="label-header">
        <v-col cols="12">
          <h3 class="mb-1 label-header">備註</h3>
          <v-textarea
            v-model="inputData.editableData.Memo"
            auto-grow
            outlined
            rows="4"
          />
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
        iconShow: true,
        title: "客、貨車使用前後檢修記錄表",
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
          Status: "",
          Driver: "",
          TrainNumber: "",
          TrainType: "",
          TrainID: "",
          CheckOption1: "",
          Memo1: "",
          CheckOption2: "",
          Memo2: "",
          CheckOption3: "",
          Memo3: "",
          CheckOption4: "",
          Memo4: "",
          CheckOption5: "",
          Memo5: "",
          CheckOption6: "",
          Memo6: "",
          CheckOption7: "",
          Memo7: "",
          CheckOption8: "",
          Memo8: "",
          CheckOption9: "",
          Memo9: "",
          CheckOption10: "",
          Memo10: "",
          Memo: "",
        },
      },
      redioList: [
        { label: "正常", value: 1, color: "success" },
        { label: "經修復或抽換", value: 2, color: "orange darken-4" },
        { label: "當日未能修復", value: 3, color: "info" },
        { label: "須進廠拆解修理", value: 4, color: "red" },
      ],

      questions: [
        {
          label: "連結及緩衝裝置",
          description: "(1)連結器(2)彈簧(3)導架(4)軛(5)裝置鬆動",
        },
        {
          label: "軔機裝置",
          description:
            "(1)前後軔速桿及梢檢查(2)軔管(3)軔機配件A:軔缸B:三動閥C:保持閥D:緊急閥E:角旋塞",
        },
        {
          label: "軔塊、車輪及軸箱",
          description: "(1)問題車輪位置(2)軔塊狀況(3)軸承箱與導板(4)固結螺栓",
        },
        {
          label: "彈簧裝置",
          description: "(1)支持線圈彈簧(貨)(2)支持板彈簧(客)",
        },
        {
          label: "轉向架配件",
          description:
            "(1)彎樑(2)側承間隙(3)枕樑與彎樑間(4)軔樑(5)軔吊桿(6)軔吊梢(7)枕樑(8)枕吊角梢(9)枕吊桿(10)開尾梢",
        },
        {
          label: "摩擦面注油",
          description:
            "(1)連結器(2)軔機連桿梢與孔(3)軔吊桿孔與梢(4)枕吊桿與角梢(5)旁承座",
        },
        {
          label: "供水裝置",
          description: "(1)儲水筒及供水管路(2)水龍頭(3)沖洗閥(4)旋塞",
        },
        {
          label: "車內裝備",
          description:
            "(1)各式門及把鎖(2)通路門鉸鏈(3)廁所(4)窗框(5)窗扣(6)茶杯架(7)通風出口調整器(8)門窗膠條(9)床面膠板",
        },
        {
          label: "電器裝置",
          description:
            "(1)控制箱(2)電源接頭(3)插座(4)播音喇叭(5)前後照明燈(6)室內日光燈(7)空調機(8)雨刷機(9)電瓶(10)電源開關",
        },
        {
          label: "其他部分",
          description: "(1)傾斜檢查(2)排障器(3)喇叭開關(4)通路渡板(5)通路扶手",
        },
      ],
      settings: {
        columns: {
          option: "CheckOption",
          memo: "Memo",
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
    newItemList: function () {
      let rtnObj = [...this.itemsList];
      rtnObj.forEach((element, index) => {
        if (index == 0) {
          element.startIndex = 1;
        } else {
          element.startIndex =
            parseInt(rtnObj[index - 1].startIndex) +
            parseInt(rtnObj[index - 1].items.length);
        }
      });
      return rtnObj;
    },
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
          "Status",
          "Driver",
          "TrainNumber",
          "TrainType",
          "TrainID",
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
          "Memo",
        ],
      })
        .then((res) => {
          
          let dat = JSON.parse(res.data.DT);
          dat[0].CheckDay = dat[0].CheckDay.substr(0, 10);
          this.inputData.RPFlowNo = this.item.RPFlowNo;
          this.inputData.DepartCode = dat[0].DepartCode;
          this.inputData.DepartName = dat[0].DepartName;
          this.inputData.editableData.Driver = dat[0].Name;
          dat[0] = decodeObject(dat[0]);
          const inputArr = Object.keys(this.inputData.editableData);
          inputArr.forEach((e) => {
            var tmp = dat[0][e];
            if (isDateObject(tmp)) {
              that.inputData.editableData[e] = tmp.substr(0, 10);
            } else {
              that.inputData.editableData[e] = temp;
            }
          });
        })
        .catch((err) => {
          // console.log(err);
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
  filters: {},
  watch: {},
};
</script>
