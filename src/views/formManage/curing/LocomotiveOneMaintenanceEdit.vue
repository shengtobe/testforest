<template>
  <v-card>
    <v-card-title class="blue white--text px-4 py-1">
      {{ editType }}{{ commonSettings.title }}
      <v-spacer></v-spacer>
      <v-btn dark fab small text @click="close" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <div class="px-6 py-4">
      <v-row>
        <v-col cols="12">
          <p>
            *工作重點：以視覺、聽覺、觸覺、嗅覺，就有關行車主要機件之狀態及作用施行檢修
          </p>
          <p>
            *工作記號說明：1.實施完畢或正常者。2.經修復者，需填說明。3.需進廠檢修者。4.無此項目者。
          </p>
          <p>*適用車種：25噸及28噸B-B型柴油機車。</p>
        </v-col>
        <!-- 檢查項目 -->
        <v-col cols="12">
          <v-row no-gutter class="indigo--text">
            <!-- 上面的欄位 -->
            <v-col cols="12" sm="3" md="3">
              <dateSelect
                label="上次檢驗完成日期"
                key="lastChkDay"
                :showIcon="commonSettings.iconShow"
                v-model="inputData.editableData.LastChkDay"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>上次累積公里數
              </h3>
              <v-text-field
                solo
                value="202020"
                v-model="inputData.editableData.LastKm"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>機車編號
              </h3>
              <v-text-field
                solo
                value="EZ-555555"
                v-model="inputData.editableData.CarId"
              />
            </v-col>
          </v-row>
          <v-row no-gutter class="indigo--text">
            <v-col cols="12" sm="3">
              <dateSelect
                label="本次檢修開始日期"
                key="bgChkDay"
                :showIcon="commonSettings.iconShow"
                v-model="inputData.editableData.BgChkDay"
              />
            </v-col>
            <v-col cols="12" sm="3">
              <dateSelect
                label="本次檢修完成日期"
                key="endChkDay"
                :showIcon="commonSettings.iconShow"
                v-model="inputData.editableData.EndChkDay"
              />
            </v-col>
            <v-col cols="12" sm="3">
              <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>本次累積公里數
              </h3>
              <v-text-field
                solo
                value="208080"
                v-model="inputData.editableData.Km"
              />
            </v-col>
            <v-col cols="12" sm="3">
              <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>檢修人員
              </h3>
              <v-text-field solo v-model.trim="inputData.Name" readonly />
            </v-col>
          </v-row>
          <!-- for loop -->
          <v-expansion-panels multiple>
            <template v-for="(list, index) in newItemList">
              <v-expansion-panel :key="'EP_' + (index + 1)">
                <v-expansion-panel-header color="teal" class="white--text">{{
                  list.title
                }}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row
                    no-gutter
                    class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                  >
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">檢查項目</h3>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">檢查結果</h3>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">備註</h3>
                    </v-col>
                  </v-row>
                  <v-alert
                    dense
                    border="top"
                    colored-border
                    color="teal"
                    elevation="4"
                    v-for="(item, idx2) in list.items"
                    :key="'i' + (list.startIndex + idx2)"
                    class="mb-6 mt-4"
                  >
                    <v-row no-gutter>
                      <v-col cols="12" sm="4">{{ item.question }}</v-col>
                      <v-col cols="12" sm="4">
                        <span class="d-sm-none error--text">檢查結果：</span>
                        <v-radio-group
                          dense
                          row
                          v-model="
                            inputData.editableData[
                              settings.columns.option + (list.startIndex + idx2)
                            ]
                          "
                          class="pa-0 ma-0"
                        >
                          <v-radio
                            color="success"
                            label="實施完畢、正常"
                            value="1"
                          ></v-radio>
                          <v-radio
                            color="success"
                            label="修復、說明"
                            value="2"
                          ></v-radio>
                          <v-radio
                            color="red"
                            label="進廠檢修"
                            value="3"
                          ></v-radio>
                          <v-radio
                            color="black"
                            label="無此項目"
                            value="0"
                          ></v-radio>
                        </v-radio-group>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <v-textarea
                          hide-details
                          auto-grow
                          outlined
                          rows="2"
                          v-model="
                            inputData.editableData[
                              settings.columns.memo + (list.startIndex + idx2)
                            ]
                          "
                        />
                      </v-col>
                    </v-row>
                  </v-alert>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </template>
          </v-expansion-panels>
          <!-- END 檢查項目 -->
        </v-col>
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
import commonQuestion from "@/components/forManage/commonQuestion";
import { Actions } from "@/assets/js/actions";
import { Constrant } from "@/assets/js/constrant";
export default {
  props: {
    item: Object,
    editType: String,
    DB_Table: String,
  },
  data: () => ({
    actions: Actions,
    commonSettings: {
      iconShow: true,
      title: "柴油液力機車一級檢修記錄表",
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
        CarId: "",
        LastChkDay: "",
        LastKm: "",
        BgChkDay: "",
        EndChkDay: "",
        Km: "",
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
        Memo_20: "",
        Memo_21: "",
        Memo_22: "",
        Memo_23: "",
        Memo_24: "",
        Memo_25: "",
        Memo_26: "",
        Memo_27: "",
        Memo_28: "",
        Memo_29: "",
        Memo_30: "",
        Memo_31: "",
        Memo_32: "",
        Memo_33: "",
        Memo_34: "",
        Memo_35: "",
        Memo_36: "",
        Memo_37: "",
        Memo_38: "",
        Memo_39: "",
        Memo_40: "",
        Memo_41: "",
        Memo_42: "",
        Memo_43: "",
        Memo_44: "",
        Memo_45: "",
        Memo_46: "",
        Memo_47: "",
        Memo_48: "",
      },
    },
    itemsList: [
      {
        title: "動力系統",
        items: [
          {
            question: "1. 檢查機油管路及接頭有無洩漏",
          },
          {
            question: "2. 檢視機油油面高度",
          },
          {
            question: "3. 檢視燃油箱有無洩漏並排放沉澱水分",
          },
          {
            question: "4. 檢視燃油管路及接頭有無洩漏",
          },
          {
            question: "5. 檢視燃油油量",
          },
          {
            question: "6. 檢視冷卻水管路及接頭有無洩漏",
          },
          {
            question: "7. 檢視冷卻水量",
          },
          {
            question: "8. 放出各油系濾清器沉澱水分",
          },
          {
            question: "9. 檢視散熱器有無洩漏並予清掃",
          },
          {
            question: "10. 檢視各部螺栓有無鬆弛",
          },
          {
            question: "11. 檢查各驅動皮帶",
          },
          {
            question: "12. 檢視大風扇傳動軸作用情況",
          },
        ],
      },
      {
        title: "傳動裝置",
        items: [
          {
            question: "13. 檢視變速機油面高度",
          },
          {
            question: "14. 檢視變速機油管及接頭有無洩漏",
          },
          {
            question: "15. 檢視逆轉機之作用油封有無洩漏",
          },
          {
            question: "16. 檢視逆轉機油面高度",
          },
          {
            question: "17. 檢視減速機軸承潤滑管路有無破損或洩漏",
          },
          {
            question: "18. 檢視減速機油面高度",
          },
          {
            question: "19. 檢查推進軸及萬向接頭有無鬆弛",
          },
        ],
      },
      {
        title: "行走系統",
        items: [
          {
            question: "20. 檢視轉向架框架有無裂痕",
          },
          {
            question: "21. 檢視彈簧有無變形或破損",
          },
          {
            question: "22. 檢視旁承座外觀及狀態",
          },
          {
            question: "23. 檢視車輪及車軸外觀及狀態",
          },
          {
            question: "24. 撒砂裝置功能測試",
          },
          {
            question: "25. 檢查傳動連桿有無鬆弛",
          },
        ],
      },
      {
        title: "軔機系統",
        items: [
          {
            question: "26. 排出各濾水器及風缸水分",
          },
          {
            question: "27. 檢視基礎軔機狀態並加油潤滑",
          },
          {
            question: "28. 檢查氣軔軟管有無洩漏",
          },
          {
            question: "29. 檢視空氣壓縮機油面高度",
          },
          {
            question: "30. 檢視空氣壓縮機動作情況並調整皮帶",
          },
          {
            question: "31. 檢查軔塊厚度及調整間隙",
          },
          {
            question: "32. 軔機性能試驗",
          },
        ],
      },
      {
        title: "電氣及儀表",
        items: [
          {
            question: "33. 清洗發電機風扇通風出口(無該設備則免)",
          },
          {
            question: "34. 儀錶功能測試",
          },
          {
            question: "35. 控制燈及指示燈功能測試",
          },
          {
            question: "36. 頭燈、尾燈及信號燈功能測試",
          },
          {
            question: "37. 檢視蓄電池及電氣各部位連結線情況",
          },
          {
            question: "38. 檢視充電情況",
          },
        ],
      },
      {
        title: "車身及連結器",
        items: [
          {
            question: "39. 檢視車體外觀",
          },
          {
            question: "40. 檢查隨車裝備",
          },
          {
            question: "41. 檢視排障器外觀",
          },
          {
            question: "42. 雨刷及喇叭測試",
          },
          {
            question: "43. 檢視滅火器日期及狀態",
          },
          {
            question: "44. 檢視駕駛室門、窗、座椅及車內設備",
          },
          {
            question: "45. 檢視連結器狀態",
          },
          {
            question: "46. 檢視旁鏈裝置狀態",
          },
        ],
      },
      {
        title: "其他",
        items: [
          {
            question: "47. 無線電操作試驗",
          },
          {
            question: "48. 空調機濾網清洗",
          },
        ],
      },
    ],

    settings: {
      columns: {
        option: "CheckOption",
        memo: "Memo_",
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
          "LastKm",
          "Km",
          "LastChkDay",
          "CarId",
          "BgChkDay",
          "EndChkDay",
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
          "CheckOption9",
          "Memo_9",
          "CheckOption10",
          "Memo_10",
          "CheckOption11",
          "Memo_11",
          "CheckOption12",
          "Memo_12",
          "CheckOption13",
          "Memo_13",
          "CheckOption14",
          "Memo_14",
          "CheckOption15",
          "Memo_15",
          "CheckOption16",
          "Memo_16",
          "CheckOption17",
          "Memo_17",
          "CheckOption18",
          "Memo_18",
          "CheckOption19",
          "Memo_19",
          "CheckOption20",
          "Memo_20",
          "CheckOption21",
          "Memo_21",
          "CheckOption22",
          "Memo_22",
          "CheckOption23",
          "Memo_23",
          "CheckOption24",
          "Memo_24",
          "CheckOption25",
          "Memo_25",
          "CheckOption26",
          "Memo_26",
          "CheckOption27",
          "Memo_27",
          "CheckOption28",
          "Memo_28",
          "CheckOption29",
          "Memo_29",
          "CheckOption30",
          "Memo_30",
          "CheckOption31",
          "Memo_31",
          "CheckOption32",
          "Memo_32",
          "CheckOption33",
          "Memo_33",
          "CheckOption34",
          "Memo_34",
          "CheckOption35",
          "Memo_35",
          "CheckOption36",
          "Memo_36",
          "CheckOption37",
          "Memo_37",
          "CheckOption38",
          "Memo_38",
          "CheckOption39",
          "Memo_39",
          "CheckOption40",
          "Memo_40",
          "CheckOption41",
          "Memo_41",
          "CheckOption42",
          "Memo_42",
          "CheckOption43",
          "Memo_43",
          "CheckOption44",
          "Memo_44",
          "CheckOption45",
          "Memo_45",
          "CheckOption46",
          "Memo_46",
          "CheckOption47",
          "Memo_47",
          "CheckOption48",
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
            if (e.endsWith("Day")) {
              that.inputData.editableData[e] = dat[0][e].substr(0, 10);
            } else {
              that.inputData.editableData[e] = dat[0][e];
            }
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
  filters: {},
  watch: {},
};
</script>