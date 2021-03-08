<template>   
  <v-card>
    <v-card-title class="blue white--text px-4 py-1">
      {{ editType }}{{ title }}
      <v-spacer></v-spacer>
      <v-btn dark fab small text @click="close" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <div class="px-6 py-4">
      <v-row>
        <v-col cols="12">
          <p>1.依職業安全衛生法第23條及職業安全衛生管理辦法第34條規定辦理</p>
          <p>2.檢查結果應詳實紀錄。檢查結果請依狀態選擇正常、異常或無此項目。</p>
          <p>3.缺點由使用單位自行改善，不克者委請設備商維護。</p>
          <p>4.本表於月底前完成檢查，經主管核章後，留存於管理單位之系統以保存備查。</p>
        </v-col>
        <!-- 檢查部分 -->
        <v-col cols="12">
          <v-row no-gutter class="indigo--text">
            <v-col cols="12" sm="4">
              <dateSelect
                :label="forDate"
                key="checkDate"
                :showIcon="commonSettings.iconShow"
                v-model="inputData.editableData.CheckDay"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <deptSelect
                :label="forDept"
                v-model="inputData.DepartCode"
                :showIcon="commonSettings.iconShow"
                outType="key"
                :readonly="commonSettings.deptReadonly"
                key="department"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">
                <slot name="manLabel">檢查人員</slot>
              </h3>
              <v-text-field
                solo
                v-model="inputData.Name"
                :readonly="commonSettings.deptReadonly"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">型式</h3>
              <v-text-field solo value v-model="inputData.editableData.Type" />
            </v-col>
          </v-row>
          <v-expansion-panels multiple>
            <v-expansion-panel v-for="(panel,pIndex) in settings.panels" :key="'P'+pIndex">
              <v-expansion-panel-header color="teal" class="white--text">{{ panel.panelLabel }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <template v-for="(area,aIndex) in panel.areas">
                  <v-row :key="'P'+pIndex+'A'+aIndex+'T'">
                    <v-col cols="12" sm="12">
                      <v-toolbar color="teal lighten-2" dark>
                        <v-spacer/>
                        <v-toolbar-title>{{ area.areaLabel }}</v-toolbar-title>
                        <v-spacer/>
                      </v-toolbar>
                    </v-col>
                  </v-row>
                  <v-row
                    :key="'P'+pIndex+'A'+aIndex+'H'"
                    no-gutter
                    class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                    <v-col cols="12" sm="6">
                      <h3 class="mb-1">檢查部分</h3>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <h3 class="mb-1">檢查結果</h3>
                    </v-col>
                  </v-row>
                  <v-alert
                    dense
                    border="top"
                    colored-border
                    color="teal"
                    elevation="4"
                    v-for="(question,qIndex) in area.questions"
                    :key="'P'+pIndex+'A'+aIndex+'Q'+qIndex"
                    class="mb-6 mt-4"
                    >
                    <v-row no-gutter>
                      <v-col cols="12" sm="6">{{ question.question }}</v-col>
                      <v-col cols="12" sm="6">
                        <span class="d-sm-none error--text">檢查結果：</span>
                        <v-radio-group
                          dense
                          row
                          class="pa-0 ma-0"
                          v-model="inputData.editableData['CheckOption'+(area.startAt + qIndex)]"
                        >
                          <v-radio color="success" label="良好" value="1"></v-radio>
                          <v-radio color="red" label="不良" value="2"></v-radio>
                          <v-radio color="black" label="無此項目" value="3"></v-radio>
                        </v-radio-group>
                      </v-col>
                    </v-row>
                  </v-alert>
                </template>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
        <!-- 改善建議、改善追蹤 -->
        <v-col cols="12">
          <h3 class="mb-1 indigo--text">改善建議</h3>
          <v-textarea auto-grow outlined rows="4" v-model="inputData.editableData.Advice"/>
        </v-col>
        <v-col cols="12">
          <h3 class="mb-1 indigo--text">改善措施</h3>
          <v-textarea auto-grow outlined rows="4" v-model="inputData.editableData.Measures"/>
        </v-col>
        <!-- END 檢查部分 -->
      </v-row>
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
      forDate: '檢查日期',
      forDept: '管理單位',
      inputData: {
        RPFlowNo: "",
        DepartCode: "",
        DepartName: "",
        ID: "",
        Name: "",
        editableData: {
          CheckDay: "",
          Type: "",
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
          CheckOption21: "0",
          CheckOption22: "0",
          CheckOption23: "0",
          CheckOption24: "0",
          Advice: "",
          Measures: "",
        },
      },
      settings: {
        panels: [
          {
            panelLabel: "一、本體",
            areas:[
              {
                areaLabel: "本體",
                startAt: 1,
                questions: [
                  { question: "1. 檢視胴體、端板、爐筒等有無損傷、變形、腐蝕、裂痕" },
                  { question: "2. 檢視水管、煙管、熱媒管、牽條等有無損傷或洩漏" },
                ],
              },
              {
                areaLabel: "外殼.支撐",
                startAt: 3,
                questions: [
                  { question: "1. 檢視外殼、耐火壁、保溫材有無脫落" },
                  { question: "2. 檢視基礎、支撐有無變形、損傷或異常" },
                ],
              }
            ],
          },
          {
            panelLabel: "二、燃燒裝置",
            areas: [
              {
                areaLabel: "燃燒器",
                startAt: 5,
                questions: [
                  { question: "1. 檢視油加熱器及燃料輸送裝置有無損傷或異常" },
                  { question: "2. 檢視燃燒器有無損傷及污髒" },
                  { question: "3. 檢視燃燒器瓷質部及爐壁保護材有無損傷及污髒" },
                ],
              },
              {
                areaLabel: "過濾器",
                startAt: 8,
                questions: [
                  { question: "1. 檢視有無堵塞或損傷" },
                ],
              },
              {
                areaLabel: "煙道",
                startAt: 9,
                questions: [
                  { question: "1. 檢視有無洩漏、損傷及風壓有無異常" },
                ]
              },
              {
                areaLabel: "爆發門",
                startAt: 10,
                questions: [
                  { question: "1. 檢視有無堵塞或損傷，作動是否正常" },
                ]
              },
            ],
          },
          {
            panelLabel: "三、自動控制裝置",
            areas: [
              {
                areaLabel: "自動檢出裝置",
                startAt: 11,
                questions: [
                  { question: "1. 檢測自動起動、停止裝置之機能有無異常" },
                  { question: "2. 檢測火燄檢出裝置之機能有無異常" },
                  { question: "3. 檢測燃料切斷裝置之機能有無異常" },
                ]
              },
              {
                areaLabel: "調節裝置",
                startAt: 14,
                questions: [
                  { question: "1. 檢測水位調節裝置之機能有無異常" },
                  { question: "2. 檢測壓力調節裝置之機能有無異常" },
                ]
              },
              {
                areaLabel: "配線",
                startAt: 16,
                questions: [
                  { question: "1. 檢視電氣配線端子有無異常" },
                ]
              }
            ]
          },
          {
            panelLabel: "四、附屬裝置及附屬品",
            areas: [
              {
                areaLabel: "給水裝置",
                startAt: 17,
                questions: [
                  { question: "1. 檢視給水泵有無損傷及作動有無異常" },
                ]
              },
              {
                areaLabel: "配管、閥",
                startAt: 18,
                questions: [
                  { question: "1. 檢視蒸汽管及停止閥有無損傷及保溫是否良好" },
                ]
              },
              {
                areaLabel: "空氣預熱器",
                startAt: 19,
                questions: [
                  { question: "1. 檢視有無損傷、傳熱面是否污髒" },
                ]
              },
              {
                areaLabel: "水處理裝置",
                startAt: 20,
                questions: [
                  { question: "1. 檢視水處理裝置之機能是否正常" },
                ]
              },
              {
                areaLabel: "安全閥",
                startAt: 21,
                questions: [
                  { question: "1. 檢視閥體有無損傷、洩漏及異常" },
                  { question: "2. 檢測有無卡死、作動是否正常" },
                ]
              },
              {
                areaLabel: "水位計",
                startAt: 23,
                questions: [
                  { question: "1. 檢視有無損傷或污髒、檢測作動是否正常" },
                ]
              },
              {
                areaLabel: "壓力表",
                startAt: 24,
                questions: [
                  { question: "1. 檢視有無損傷或污髒、功能是否正常" },
                ]
              }
            ]
          }
        ]
      },
    }
  },
  components: {
    dateSelect,
    deptSelect,
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
          "Type",
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