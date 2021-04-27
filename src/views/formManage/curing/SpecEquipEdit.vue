<template>
  <v-card class="theme-card">
    <v-card-title class=" white--text px-4 py-1">
      {{ editType }}{{ title }}
      <v-spacer></v-spacer>
      <v-btn dark fab small text @click="close" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

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
              <h3 class="mb-1">檢查人員</h3>
              <v-text-field solo value v-model="inputData.Name"/>
            </v-col>
          </v-row>
          <commonQuestion :settings="settings" v-model="inputData"/>
        </v-col>
        <!-- END 檢查項目 -->
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
  },
  data: () => ({
    actions: Actions,
    commonSettings: {
        iconShow: false,
        isLoading: false,
        deptReadonly: true,
      },
    settings: {
      headers: [
        {  width: 3, text:"名稱" },
        {  width: 5, text:"摘要", model: "CheckOption" },
        {  width: 4, text:"備註", model: "Memo" }
      ],
      alerts: [
        {
          startAt: 1,
          columns:[
            { 
             rows: [
                { label: "型式",type: "label" }
              ]
            },
            { 
              rows: [
                { label: "摘要", type: "area", placeholder: "AAA-00A" },
              ]
            },
            { 
              rows: [
                { label: "備註", type: "area", placeholder: "備註" }
              ]
            }
          ]
        },
        {
          startAt: 2,
          columns:[
            { 
             rows: [
                { label: "製造廠名",type: "label" }
              ]
            },
            { 
              rows: [
                { label: "摘要", type: "area" },
              ]
            },
            { 
              rows: [
                { label: "備註", type: "area", placeholder: "備註" }
              ]
            }
          ]
        },
        {
          startAt: 3,
          columns:[
            { 
             rows: [
                { label: "製造日期",type: "label" }
              ]
            },
            { 
              rows: [
                { label: "摘要", type: "date" },
              ]
            },
            { 
              rows: [
                { label: "備註", type: "area", placeholder: "備註" }
              ]
            }
          ]
        },
        {
          startAt: 4,
          columns:[
            { 
             rows: [
                { label: "開始使用時間",type: "label" }
              ]
            },
            { 
              rows: [
                { label: "摘要", type: "date" },
              ]
            },
            { 
              rows: [
                { label: "備註", type: "area", placeholder: "備註" }
              ]
            }
          ]
        },
        {
          startAt: 5,
          columns:[
            { 
             rows: [
                { label: "價格",type: "label" }
              ]
            },
            { 
              rows: [
                { label: "摘要", type: "number", append: "元" },
              ]
            },
            { 
              rows: [
                { label: "備註", type: "area", placeholder: "備註" }
              ]
            }
          ]
        },
        {
          startAt: 6,
          columns:[
            { 
             rows: [
                { label: "車身最大尺寸",type: "label" }
              ]
            },
            { 
              rows: [
                { label: "摘要", type: "number", prepend:"長", append: "n/m" },
                { type: "number", prepend:"寬", append: "n/m" },
                { type: "number", prepend:"高", append: "n/m" },
              ]
            },
            { 
              rows: [
                { label: "備註", type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" }
              ]
            }
          ]
        },
        {
          startAt: 9,
          columns:[
            { 
             rows: [
                { label: "燃料容量",type: "label" }
              ]
            },
            { 
              rows: [
                { label: "摘要", type: "number", append: "公升" },
              ]
            },
            { 
              rows: [
                { label: "備註", type: "area", placeholder: "備註" }
              ]
            }
          ]
        },
        {
          startAt: 10,
          columns:[
            { 
             rows: [
                { label: "皮重",type: "label" }
              ]
            },
            { 
              rows: [
                { label: "摘要", type: "number", append: "公噸" },
              ]
            },
            { 
              rows: [
                { label: "備註", type: "area", placeholder: "備註" }
              ]
            }
          ]
        },
        {
          startAt: 11,
          columns:[
            { 
             rows: [
                { label: "最大牽引重量或載重",type: "label" }
              ]
            },
            { 
              rows: [
                { label: "摘要", type: "number", append: "公噸" },
              ]
            },
            { 
              rows: [
                { label: "備註", type: "area", placeholder: "備註" }
              ]
            }
          ]
        },
        {
          startAt: 12,
          columns:[
            { 
             rows: [
                { label: "氣軔裝置",type: "label" }
              ]
            },
            { 
              rows: [
                { label: "摘要", type: "text", prepend: "型式" },
                { type: "text", prepend: "司軔閥" },
                { type: "text", prepend: "三通閥" },
                { type: "text", prepend: "調壓器" },
                { type: "text", prepend: "風泵" },
                { type: "text", prepend: "風泵排氣量" },
                { type: "text", prepend: "軔缸尺寸" },
                { type: "text", prepend: "分配閥" },
                { type: "text", prepend: "繼動閥" },
                { type: "text", prepend: "餵閥" },
              ]
            },
            { 
              rows: [
                { label: "備註", type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
              ]
            }
          ]
        },
        {
          startAt: 22,
          columns:[
            { 
             rows: [
                { label: "轉向架",type: "label" }
              ]
            },
            { 
              rows: [
                { label: "摘要", type: "text", prepend: "型式" },
                { type: "text", prepend: "軸距" },
                { type: "text", prepend: "車輪直徑" },
                { type: "text", prepend: "軸頸直徑" },
                { type: "text", prepend: "閘瓦中心距離" },
                { type: "text", prepend: "聯結器中心至軌面高度" },
                { type: "text", prepend: "側承面至軌面高度" },
                { type: "text", prepend: "轉向架重量(一只)" },
                { type: "text", prepend: "彈簧撓度-正常負荷" },
                { type: "text", prepend: "彈簧撓度-最大負荷" },
                { type: "text", prepend: "軔機倍率" },
              ]
            },
            { 
              rows: [
                { label: "備註", type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
              ]
            }
          ]
        },
        {
          startAt: 33,
          columns:[
            { 
             rows: [
                { label: "最大容許速度",type: "label" }
              ]
            },
            { 
              rows: [
                { label: "摘要", type: "text", prepend: "第一" },
                { type: "text", prepend: "第二" },
                { type: "text", prepend: "第三" },
                { type: "text", prepend: "第四" },
                { type: "text", prepend: "第五" },
              ]
            },
            { 
              rows: [
                { label: "備註", type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
              ]
            }
          ]
        },
        {
          startAt: 38,
          columns:[
            { 
             rows: [
                { label: "進氣增壓機",type: "label" }
              ]
            },
            { 
              rows: [
                { label: "摘要", type: "text", prepend: "型式" },
                { type: "text", prepend: "進氣方法" },
                { type: "number", prepend: "進氣量", append: "公升/分" },
              ]
            },
            { 
              rows: [
                { label: "備註", type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
              ]
            }
          ]
        },
        {
          startAt: 41,
          columns:[
            { 
             rows: [
                { label: "電瓶",type: "label" }
              ]
            },
            { 
              rows: [
                { label: "摘要", type: "text", prepend: "牌號" },
                { type: "text", prepend: "電壓", append: "伏" },
                { type: "text", prepend: "容量", append: "安/時" },
                { type: "number", prepend: "個數", min: 0 },
                { type: "text", prepend: "尺寸及重量" }
              ]
            },
            { 
              rows: [
                { label: "備註", type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
              ]
            }
          ]
        },
        {
          startAt: 46,
          columns:[
            { 
             rows: [
                { label: "變速(逆轉)機",type: "label" }
              ]
            },
            { 
              rows: [
                { label: "摘要", type: "text", prepend: "型式" },
                { type: "text", prepend: "容油量" },
                { type: "text", prepend: "重量" },
                { type: "text", prepend: "最大迴轉比" }
              ]
            },
            { 
              rows: [
                { label: "備註", type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
              ]
            }
          ]
        },
        {
          startAt: 50,
          columns:[
            { 
             rows: [
                { label: "冷卻器",type: "label" }
              ]
            },
            { 
              rows: [
                { label: "摘要", type: "text", prepend: "型式" },
                { type: "text", prepend: "組數X條數" },
                { type: "text", prepend: "容水量" },
              ]
            },
            { 
              rows: [
                { label: "備註", type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
                { type: "area", placeholder: "備註" },
              ]
            }
          ]
        },
      ]
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
        CheckOption2: "",
        CheckOption3: "",
        CheckOption4: "",
        CheckOption5: "",
        CheckOption6: "",
        CheckOption7: "",
        CheckOption8: "",
        CheckOption9: "",
        CheckOption10: "",
        CheckOption11: "",
        CheckOption12: "",
        CheckOption13: "",
        CheckOption14: "",
        CheckOption15: "",
        CheckOption16: "",
        CheckOption17: "",
        CheckOption18: "",
        CheckOption19: "",
        CheckOption20: "",
        CheckOption21: "",
        CheckOption22: "",
        CheckOption23: "",
        CheckOption24: "",
        CheckOption25: "",
        CheckOption26: "",
        CheckOption27: "",
        CheckOption28: "",
        CheckOption29: "",
        CheckOption30: "",
        CheckOption31: "",
        CheckOption32: "",
        CheckOption33: "",
        CheckOption34: "",
        CheckOption35: "",
        CheckOption36: "",
        CheckOption37: "",
        CheckOption38: "",
        CheckOption39: "",
        CheckOption40: "",
        CheckOption41: "",
        CheckOption42: "",
        CheckOption43: "",
        CheckOption44: "",
        CheckOption45: "",
        CheckOption46: "",
        CheckOption47: "",
        CheckOption48: "",
        CheckOption49: "",
        CheckOption50: "",
        CheckOption51: "",
        CheckOption52: "",
        Memo1: "",
        Memo2: "",
        Memo3: "",
        Memo4: "",
        Memo5: "",
        Memo6: "",
        Memo7: "",
        Memo8: "",
        Memo9: "",
        Memo10: "",
        Memo11: "",
        Memo12: "",
        Memo13: "",
        Memo14: "",
        Memo15: "",
        Memo16: "",
        Memo17: "",
        Memo18: "",
        Memo19: "",
        Memo20: "",
        Memo21: "",
        Memo22: "",
        Memo23: "",
        Memo24: "",
        Memo25: "",
        Memo26: "",
        Memo27: "",
        Memo28: "",
        Memo29: "",
        Memo30: "",
        Memo31: "",
        Memo32: "",
        Memo33: "",
        Memo34: "",
        Memo35: "",
        Memo36: "",
        Memo37: "",
        Memo38: "",
        Memo39: "",
        Memo40: "",
        Memo41: "",
        Memo42: "",
        Memo43: "",
        Memo44: "",
        Memo45: "",
        Memo46: "",
        Memo47: "",
        Memo48: "",
        Memo49: "",
        Memo50: "",
        Memo51: "",
        Memo52: "",
      },
    },
  }),
  components: {
    commonQuestion,
    dateSelect
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
          "CheckOption31",
          "CheckOption32",
          "CheckOption33",
          "CheckOption34",
          "CheckOption35",
          "CheckOption36",
          "CheckOption37",
          "CheckOption38",
          "CheckOption39",
          "CheckOption40",
          "CheckOption41",
          "CheckOption42",
          "CheckOption43",
          "CheckOption44",
          "CheckOption45",
          "CheckOption46",
          "CheckOption47",
          "CheckOption48",
          "CheckOption49",
          "CheckOption50",
          "CheckOption51",
          "CheckOption52",
          "Memo1",
          "Memo2",
          "Memo3",
          "Memo4",
          "Memo5",
          "Memo6",
          "Memo7",
          "Memo8",
          "Memo9",
          "Memo10",
          "Memo11",
          "Memo12",
          "Memo13",
          "Memo14",
          "Memo15",
          "Memo16",
          "Memo17",
          "Memo18",
          "Memo19",
          "Memo20",
          "Memo21",
          "Memo22",
          "Memo23",
          "Memo24",
          "Memo25",
          "Memo26",
          "Memo27",
          "Memo28",
          "Memo29",
          "Memo30",
          "Memo31",
          "Memo32",
          "Memo33",
          "Memo34",
          "Memo35",
          "Memo36",
          "Memo37",
          "Memo38",
          "Memo39",
          "Memo40",
          "Memo41",
          "Memo42",
          "Memo43",
          "Memo44",
          "Memo45",
          "Memo46",
          "Memo47",
          "Memo48",
          "Memo49",
          "Memo50",
          "Memo51",
          "Memo52",
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
}
</script>