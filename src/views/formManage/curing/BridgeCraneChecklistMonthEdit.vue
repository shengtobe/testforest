<template>   
  <v-card class="theme-card">
    <v-card-title class="white--text px-4 py-1">
      {{ editType }}{{ title }}
      <v-spacer></v-spacer>
      <v-btn dark fab small text @click="close" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <commonQuestion v-model="inputData" :settings="setting">
      <template v-slot:moreDetails="item">
        <v-col cols="12" sm="4">
          <h3 class="mb-1">噸數</h3>
          <v-text-field solo v-model="item.editItem.Tonnage">
              <span slot="append">噸</span>
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <h3 class="mb-1">工作場所</h3>
          <v-text-field solo  v-model="item.editItem.Loc"/>
        </v-col>
        <v-col cols="12" sm="4">
          <h3 class="mb-1">編號</h3>
          <v-text-field solo  v-model="item.editItem.SerlNo"/>
        </v-col>
      </template>
    </commonQuestion>
    <v-card-actions class="px-5 pb-5">
      <v-btn
        v-if="editType != actions.add"
        elevation="4"
        class="mr-2 white--text btn-delete"
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
          Tonnage: "0",
          Loc: "",
          SerlNo: "",
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
          CheckOption18: "0",
          CheckOption19: "0",
          CheckOption20: "0",
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
          "1.依職業安全衛生法第23條規定辦理。",
          "2.檢查結果請依狀態選擇正常、異常或無此項目。",
          "3.缺點由使用單位自行改善，不克者委請設備商維護。",
          "4.本表於月底前完成檢查，經主管核章後，留存於管理單位之系統以保存備查。",
        ],
        questions: {
          panelQuestion: [      //題目
            {
              panelLabel: "過捲預防裝置",
              questions: [
                [
                  "1. 吊物升降極限開關",
                  "動作",
                  "動作是否確實螺絲有否鬆弛",
                  "動作確實螺絲堅固",
                ],
              ],
            },
            {
              panelLabel: "剎車控制器",
              questions: [
                [
                  "2.電磁升降剎車",
                  "動作",
                  "反覆操作上升查看其動作狀況停止位置",
                  "動作確實",
                ],
                [
                  "3.電磁走行剎車",
                  "動作",
                  "反覆操作上升查看其動作狀況停止位置",
                  "動作確實",
                ],
                [
                  "4.渦電流或其他控制下降剎車",
                  "動作",
                  "查看降落速度是否適當",
                  "動作適當",
                ],
              ],
            },
            {
              panelLabel: "警報裝置",
              questions: [
                [
                  "5.行走警鈴",
                  "響亮",
                  "行走時響亮",
                  "良好無損",
                ],
                [
                  "6.喇叭",
                  "響亮",
                  "按動時鳴叫",
                  "良好無損",
                ],
              ],
            },
            {
              panelLabel: "鋼索及吊鍊",
              questions: [
                [
                  "7. 鋼索及吊鍊",
                  "損傷",
                  "檢示有無損傷斷裂",
                  "良好無損",
                ],
              ],
            },
            {
              panelLabel: "吊鉤",
              questions: [
                [
                  "8.吊鉤",
                  "損傷",
                  "檢視有無損傷斷裂",
                  "良好無損",
                ],
                [
                  "9.吊鉤安全栓",
                  "損傷",
                  "檢視有無損傷斷裂",
                  "良好無損",
                ],
                [
                  "10.配線",
                  "被覆",
                  "被覆是否剝損劣化",
                  "良好無損",
                ],
              ],
            },
            {
              panelLabel: "配線",
              questions: [
                [
                  "11. 配線",
                  "接續",
                  "終端螺栓是否鬆弛",
                  "充分旋緊",
                ],
              ],
            },
            {
              panelLabel: "集電裝置",
              questions: [
                [
                  "12. 集電裝置",
                  "接觸不良",
                  "螺絲是否鬆弛檢視是否磨耗",
                  "充分旋緊調整接觸壓力",
                ],
              ],
            },
            {
              panelLabel: "配電盤",
              questions: [
                [
                  "13. 配電盤",
                  "有無異狀",
                  "檢視有無異狀",
                  "正常良好",
                ],
                [
                  "14. 無熔絲斷路器",
                  "動作",
                  "核定電流通過是否跳脫",
                  "超跳脫過核定電流",
                ],
              ],
            },
            {
              panelLabel: "開關",
              questions: [
                [
                  "15. 保險絲",
                  "容量",
                  "保險絲是否符合規定",
                  "規定內",
                ],
                [
                  "16. 電磁接觸",
                  "接觸不良",
                  "螺絲是否鬆弛是否接觸不良",
                  "接觸緊故動作確實",
                ],
              ],
            },
            {
              panelLabel: "控制器",
              questions: [
                [
                  "17. 直接控制器",
                  "動作",
                  "反覆操作查看其動作狀況",
                  "動作確實",
                ],
                [
                  "18. 間接控制器",
                  "動作",
                  "反覆操作查看其動作狀況及電譯情形",
                  "動作確實",
                ],
              ],
            },
            {
              panelLabel: "鋼纜",
              questions: [
                [
                  "19. 鋼纜",
                  "有無異狀",
                  "檢視",
                  "良好正常",
                ],
              ],
            },
            {
              panelLabel: "捲揚機",
              questions: [
                [
                  "20. 主副捲揚盤",
                  "損傷",
                  "有無損傷及異狀",
                  "良好正常",
                ],
              ],
            },
          ],
          questionLabels: [       //標題
            {
              width: 2,
              text: "檢查部位",
              generate: false,
            },
            {
              width: 2,
              text: "檢查內容",
              generate: false,
            },
            {
              width: 2,
              text: "檢查方法",
              generate: false,
            },
            {
              width: 2,
              text: "判斷基準",
              generate: false,
            },
            {
              width: 2,
              text: "檢查結果",
              generate: true,
            },
            {
              width: 2,
              text: "改善措施",
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
                  label: "正常",
                  value: "1",
                },
                {
                  color: "red",
                  label: "異常",
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
          "Tonnage",
          "Loc",
          "SerlNo",
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