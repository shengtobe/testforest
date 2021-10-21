<template>   
  <v-card class="theme-card">
    <v-card-title class=" white--text px-4 py-1">
      {{ editType }}{{ title }}
      <v-spacer></v-spacer>
      <v-btn dark fab small text @click="close" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <commonQuestion v-model="inputData" :settings="setting">
      <template v-slot:moreDetails="item">
        <v-col cols="12" sm="4">
          <h3 class="mb-1">型式</h3>
          <v-text-field solo value v-model="item.editItem.Type" />
        </v-col>
        <v-col cols="12" sm="4">
          <h3 class="mb-1">堆高荷重</h3>
          <v-text-field solo value v-model="item.editItem.Load" />
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
import commonQuestion from "@/components/forManage/commonQuestion2";
import { Actions } from "@/assets/js/actions";
import { Constrant } from "@/assets/js/constrant";

export default {
  props: {
    item: Object,
    editType: String,
    DB_Table: String,
    title: String,
  },
  data() {
    return {
      actions: Actions,
      commonSettings: {
        iconShow: false,
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
          Type: "",
          Load: "",
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
          Analysis: "",
          Evaluation: "",
          Ameliorate: "",
          Review: "",
        },
      },
      /*
        subtitles: 固定,
        textareas: 固定,
        questions: => 1.小題產生器 2.大題產生器
          2.產生1.的設定檔，然後2.再把1.的東西push進去array再回傳
          小題產生器: 
            {
              pnaelLabel: <string>,
              questionLabels: [
                {
                  width: <number>,
                  text: <string>,
                  generate: <boolean>,  //要被自動產生的寫ture，不要的寫false
                },
              ],
              answerStart: <number>,
              notGenerate: [            //預設不自動產生的都是純文字欄位，依照順序填入
                [
                  <string>,
                ]
              ],
              generate: [               //按順序填入
                {
                  model: <變數名稱前綴 string>, //預設所有可變動資料都放在editableData裡面
                  type: <text/number/radio/select/area string>,
                  <number:{
                    min: <numbebr>,
                    max: <number>,
                  },>
                  <radio: [
                    {
                      color: <string>,
                      label: <string>,
                      value: <string>,
                    }
                  ],> 
                  <select: [
                    {
                      text: <string>,
                      value: <string>,
                    }
                  ],>
                },
              ]
            }
          大題產生器
            {
              panelQuestion: [      //題目
                {
                  panelLabel: <string>,
                  questions: [
                    [
                      <string>,
                    ],
                  ],
                }
              ],
              questionLabels: [       //標題
                {
                  width: <number>,
                  text: <string>,
                  generate: <boolean>,  //要被自動產生的寫ture，不要的寫false
                },
              ],
              panelAnswer: [      //輸入欄位
                {
                  model: <變數名稱前綴 string>, //預設所有可變動資料都放在editableData裡面
                  type: <text/number/radio/select/area string>,
                  <number:{
                    min: <numbebr>,
                    max: <number>,
                  },>
                  <radio: [
                    {
                      color: <string>,
                      label: <string>,
                      value: <string>,
                    }
                  ],> 
                  <select: [
                    {
                      text: <string>,
                      value: <string>,
                    }
                  ],>
                },
              ]
            }
      */
      testSettings: {
        subtitles: [
          "1.依職業安全衛生法第23條及職業安全衛生管理辦法第17條規定辦理。",
          "2.檢查結果請依情況選擇良好、不良。並應做檢查發現危害、分析危害因素，評估危害風險，依檢查風險評估結果採取改善措施、檢討改善措施之合宜性。",
          "3.缺點由使用單位自行改善，不克者委請設備商維護。",
          "4.本表於12月年底前完成檢查，經主管核章後，留存於管理單位之系統以保存備查。",
        ],
        textareas: [
          {
            label: "檢查發現危害、分析危害因素",
            model: "Analysis",
          },
          {
            label: "評估危害風險(嚴重性及可能性分析)",
            model: "Evaluation",
          },
          {
            label: "評估結果改善措施",
            model: "Ameliorate",
          },
          {
            label: "檢討改善措施之合宜性",
            model: "Review",
          },
        ],
        questions: {
          panelQuestion: [      //題目
            {
              panelLabel: "制動裝置",
              questions: [
                [
                  "1. 手剎車性能",
                  "操作、實測",
                ],
                [
                  "2. 腳踏車性能",
                  "操作、實測",
                ],
              ],
            },
            {
              panelLabel: "離合器裝置",
              questions: [
                [
                  "1. 離合器性能",
                  "操作、實測",
                ],
              ],
            },
            {
              panelLabel: "方向裝置",
              questions: [
                [
                  "1. 方向盤性能",
                  "操作、實測",
                ],
                [
                  "2. 左方向燈",
                  "操作、實測",
                ],
                [
                  "3. 右方向燈",
                  "操作、實測",
                ],
              ],
            },
            {
              panelLabel: "積載裝置",
              questions: [
                [
                  "1. 前叉",
                  "目視檢查",
                ],
                [
                  "2. 積載性能",
                  "荷重試驗",
                ],
              ],
            },
            {
              panelLabel: "警報裝置",
              questions: [
                [
                  "1. 喇叭",
                  "操作測試",
                ],
                [
                  "2. 煞車燈",
                  "操作、目視",
                ],
              ],
            },
            {
              panelLabel: "油壓裝置",
              questions: [
                [
                  "1. 上下升降",
                  "操作測試",
                ],
                [
                  "2. 前傾、後仰",
                  "操作測試",
                ],
              ],
            },
            {
              panelLabel: "頂蓬",
              questions: [
                [
                  "1. 頂蓬",
                  "目視檢查",
                ],
              ],
            },
            {
              panelLabel: "桅桿",
              questions: [
                [
                  "1. 桅桿",
                  "目視檢查",
                ],
              ],
            },
            {
              panelLabel: "滅焰器",
              questions: [
                [
                  "1. 滅焰器",
                  "操作、目視",
                ],
              ],
            },
            {
              panelLabel: "全車狀況",
              questions: [
                [
                  "1. 全車狀況",
                  "操作測試",
                ],
              ],
            },
          ],
          questionLabels: [       //標題
            {
              width: 3,
              text: "檢查項目",
              generate: false,
            },
            {
              width: 3,
              text: "檢查方法",
              generate: false,
            },
            {
              width: 3,
              text: "檢查結果",
              generate: true,
            },
            {
              width: 3,
              text: "備註",
              generate: true,
            },
          ],
          panelAnswer: [      //輸入欄位
            {
              type: "radio",
              model: "CheckOption",
              radio: [
                {
                  color: "success",
                  label: "良好",
                  value: "1",
                },
                {
                  color: "red",
                  label: "不良",
                  value: "2",
                },
              ]
            },
            {
              type: "area",
              model: "Memo",
            }
          ]
        }
      },
      // setting: {}
    }
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
    // this.setting = generateSettings(this.testSettings)
  },
  computed: {
    ...mapState("user", {
      userData: (state) => state.userData, // 使用者基本資料
    }),
    setting:function() {
      return generateSettings(this.testSettings)
    }
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
          "Type",
          "Load",
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
          "Analysis",
          "Evaluation",
          "Ameliorate",
          "Review",
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
}
</script>