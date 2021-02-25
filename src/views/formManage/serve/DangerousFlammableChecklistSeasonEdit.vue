<template>   
  <v-card>
    <v-card-title class="blue white--text px-4 py-1">
      {{ editType }}{{ title }}
      <v-spacer></v-spacer>
      <v-btn dark fab small text @click="close" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <commonQuestion v-model="inputData" :settings="setting"/>
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
          Memo_1: "",
          Memo_2: "",
          Memo_3: "",
          Memo_4: "",
          Memo_5: "",
          Memo_6: "",
          Memo_7: "",
          Memo_8: "",
          Memo_9: "",
          Memo_10: "",
          Memo_11: "",
          Memo_12: "",
          Memo_13: "",
          Memo_14: "",
          Memo_15: "",
          Memo_16: "",
          Memo_17: "",
          Memo_18: "",
          Memo_19: "",
          Advice: "",
          Measures: "",
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
          "1.依職業安全衛生法第23條規定辦理",
          "2.檢查結果請依狀態選擇正常、異常或無此項目。",
          "3.缺點由使用單位自行改善，不克者委請設備商維護。",
          "4.本定期檢查表於每年1.4.7.10月月底前完成檢查，經主管核章後，留存於管理單位之系統以保存備查。",
        ],
        textareas: [
          {
            label: "改善建議",
            model: "Advice",
          },
          {
            label: "改善措施",
            model: "Measures",
          },
        ],
        questions: {
          panelQuestion: [      //題目
            {
              panelLabel: "氧氣、乙炔氣鋼瓶",
              questions: [
                [
                  "1.通風良好，並防止日曬、雨淋",
                  "目視點檢",
                ],
                [
                  "2.存放於乾淨且遠離熱源之儲存間",
                  "目視點檢",
                ],
                [
                  "3. 與油料及易燃性物品隔離",
                  "目視點檢",
                ],
                [
                  "4. 不同氣體鋼瓶隔離儲存",
                  "目視點檢",
                ],
                [
                  "5. 設法固定直立儲存",
                  "目視點檢",
                ],
                [
                  "6. 瓶閥保持清潔，不沾油污",
                  "目視點檢",
                ],
                [
                  "7. 瓶閥螺帽良好",
                  "動作測試",
                ],
                [
                  "8. 存放處四周嚴禁煙火",
                  "目視點檢",
                ],
                [
                  "9. 鋼瓶無漏氣檢查",
                  "動作測試",
                ],
              ],
            },
            {
              panelLabel: "油料",
              questions: [
                [
                  "10. 通風良好，並防止日曬",
                  "目視點檢",
                ],
                [
                  "11. 遠離爆炸性、易燃性物料",
                  "目視點檢",
                ],
                [
                  "12. 儲油庫4公尺內嚴禁煙火",
                  "目視點檢",
                ],
                [
                  "13. 油料容器內良好，桶蓋鎖緊",
                  "動作測試",
                ],
                [
                  "14. 無漏油，地上無油漬",
                  "目視點檢",
                ],
                [
                  "15. 備有充分有效滅火器",
                  "目視點檢",
                ],
              ],
            },
            {
              panelLabel: "化學危險品",
              questions: [
               [
                  "16. 通風良好，並防止日曬、雨淋",
                  "目視點檢",
                ],
                [
                  "17. 瓶裝酸、鹼存於特定之格、架",
                  "目視點檢",
                ],
                [
                  "18. 不同化學物品隔離儲存乾淨處所",
                  "目視點檢",
                ],
                [
                  "19. 容器良好，並密蓋",
                  "動作測試",
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
                  label: "正常",
                  value: "1",
                },
                {
                  color: "red",
                  label: "異常",
                  value: "2",
                },
                {
                  color: "black",
                  label: "無此項目",
                  value: "3",
                },
              ]
            },
            {
              type: "area",
              model: "Memo_",
            }
          ]
        }
      },
      setting: {}
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
    this.setting = generateSettings(this.testSettings)
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
          "Memo_1",
          "Memo_2",
          "Memo_3",
          "Memo_4",
          "Memo_5",
          "Memo_6",
          "Memo_7",
          "Memo_8",
          "Memo_9",
          "Memo_10",
          "Memo_11",
          "Memo_12",
          "Memo_13",
          "Memo_14",
          "Memo_15",
          "Memo_16",
          "Memo_17",
          "Memo_18",
          "Memo_19",
          "Advice",
          "Measures",
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