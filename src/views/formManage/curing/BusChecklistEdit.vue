<template>   
  <v-card class="theme-card">
    <v-card-title class="white--text px-4 py-1">
      {{ editType }}{{ title }}
      <v-spacer></v-spacer>
      <v-btn dark fab small text @click="close" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <commonQuestion v-model="inputData" :settings="setting" dateLabel="填寫日期">
      <template v-slot:moreDetails="item">
        <v-col cols="12" sm="4">
          <h3 class="mb-1">車輛編號</h3>
          <v-text-field solo  v-model="item.editItem.CarNum"/>
        </v-col>
        <v-col cols="12" sm="4">
          <dateSelect
            label="上次檢修完成日期"
            key="lastChkDay"
            :showIcon="commonSettings.iconShow"
            v-model="item.editItem.LastChkDay"
           />
        </v-col>
        <v-col cols="0" sm="4"/>
        <v-col cols="12" sm="4">
          <dateSelect
            label="本次檢修開始日期"
            key="chkDay"
            :showIcon="commonSettings.iconShow"
            v-model="item.editItem.ChkDay"
           />
        </v-col>
        <v-col cols="12" sm="4">
          <dateSelect
            label="本次檢修完成日期"
            key="DoneDate"
            :showIcon="commonSettings.iconShow"
            v-model="item.editItem.DoneDay"
           />
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
          LastChkDay: "",
          ChkDay: "",
          DoneDay: "",
          CarNum: "",
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
          CheckOption25: "0",
          CheckOption26: "0",
          CheckOption27: "0",
          CheckOption28: "0",
          CheckOption29: "0",
          CheckOption30: "0",
          CheckOption31: "0",
          CheckOption32: "0",
          CheckOption33: "0",
          CheckOption34: "0",
          CheckOption35: "0",
          CheckOption36: "0",
          CheckOption37: "0",
          CheckOption38: "0",
          CheckOption39: "0",
          CheckOption40: "0",
          CheckOption41: "0",
          CheckOption42: "0",
          CheckOption43: "0",
          CheckOption44: "0",
          CheckOption45: "0",
          CheckOption46: "0",
          CheckOption47: "0",
          CheckOption48: "0",
          CheckOption49: "0",
          CheckOption50: "0",
          CheckOption51: "0",
          CheckOption52: "0",
          CheckOption53: "0",
          CheckOption54: "0",
          CheckOption55: "0",
          CheckOption56: "0",
          CheckOption57: "0",
          CheckOption58: "0",
          CheckOption59: "0",
          CheckOption60: "0",
          CheckOption61: "0",
          CheckOption62: "0",
          CheckOption63: "0",
          CheckOption64: "0",
          CheckOption65: "0",
          CheckOption66: "0",
          CheckOption67: "0",
          CheckOption68: "0",
          CheckOption69: "0",
          CheckOption70: "0",
          CheckOption71: "0",
          CheckOption72: "0",
          CheckOption73: "0",
          CheckOption74: "0",
          CheckOption75: "0",
          CheckOption76: "0",
          CheckOption77: "0",
          CheckOption78: "0",
          CheckOption79: "0",
          CheckOption80: "0",
          CheckOption81: "0",
          CheckOption82: "0",
          CheckOption83: "0",
          CheckOption84: "0",
          CheckOption85: "0",
          CheckOption86: "0",
          memo1: "",
          memo2: "",
          memo3: "",
          memo4: "",
          memo5: "",
          memo6: "",
          memo7: "",
          memo8: "",
          memo9: "",
          memo10: "",
          memo11: "",
          memo12: "",
          memo13: "",
          memo14: "",
          memo15: "",
          memo16: "",
          memo17: "",
          memo18: "",
          memo19: "",
          memo20: "",
          memo21: "",
          memo22: "",
          memo23: "",
          memo24: "",
          memo25: "",
          memo26: "",
          memo27: "",
          memo28: "",
          memo29: "",
          memo30: "",
          memo31: "",
          memo32: "",
          memo33: "",
          memo34: "",
          memo35: "",
          memo36: "",
          memo37: "",
          memo38: "",
          memo39: "",
          memo40: "",
          memo41: "",
          memo42: "",
          memo43: "",
          memo44: "",
          memo45: "",
          memo46: "",
          memo47: "",
          memo48: "",
          memo49: "",
          memo50: "",
          memo51: "",
          memo52: "",
          memo53: "",
          memo54: "",
          memo55: "",
          memo56: "",
          memo57: "",
          memo58: "",
          memo59: "",
          memo60: "",
          memo61: "",
          memo62: "",
          memo63: "",
          memo64: "",
          memo65: "",
          memo66: "",
          memo67: "",
          memo68: "",
          memo69: "",
          memo70: "",
          memo71: "",
          memo72: "",
          memo73: "",
          memo74: "",
          memo75: "",
          memo76: "",
          memo77: "",
          memo78: "",
          memo79: "",
          memo80: "",
          memo81: "",
          memo82: "",
          memo83: "",
          memo84: "",
          memo85: "",
          memo86: "",
        },
      },
      /*
        subtitles: 固定,
        textareas: 固定,
        questions: => 1.小題產生器 2.大題產生器
          2.產生1.的設定檔，然後2.再把1.的東西push進去array再回傳
          小題產生器: 
            {
              panelLabel: <string>,
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
        questions: {
          panelQuestion: [      //題目
            {
              panelLabel: "行走裝置",
              questions: [
                ["1. 輪、軸位置無鬆弛移位現象" ],
                ["2. 輪、軸無裂痕" ],
                ["3. 輪緣磨耗無超限(厚度大於24mm，月檢)"],
                ["4. 輪緣高度無超出輪踏面31mm(月檢)"],
                ["5. 輪緣缺損長度無超過27mm、寬度無超過9mm" ],
                ["6. 踏面擦傷長度無超過40mm" ],
                ["7. 軸承箱、軸承箱蓋無裂痕或破損" ],
                ["8. 軸承箱螺栓無鬆弛或脫落" ],
              ],
            },
            {
              panelLabel: "軔機裝置",
              questions: [
                ["9. 拉桿、軔槓桿、挺桿、軔塊調整桿、軔樑、軔吊、軔吊托、圓梢、開口梢、襯套等無破損、變形、鬆弛或脫落"],
                ["10. 軔塊調整桿彎曲方向正確"],
                ["11. 軔塊厚度大於15mm"],
                ["12. 保持閥作用良好"],
                ["13. 各桿與車體其他部分無不當接觸"],
                ["14. 全緊軔時，EA閥軔缸行程在60至80mm範圍，K閥軔缸行程在100至130mm範圍"],
                ["15. 一組客車之軔管漏氣速率不超過每分鐘0.2kg/cm2"],
                ["16. 緊軔時，軔缸無漏氣"],
                ["17. 緊軔時，軔缸作用良好"],
                ["18. 軔機作用良好"],
                ["19. 氣軔軟管長度適當"],
                ["20. 軔管無破損、漏氣"],
                ["21. 車長閥作用正常"],
                ["22. 角旋塞作用正常"],
                ["23. 手軔機作用正常"],
                ["24. 氣軔貫通指示燈正常"],
                ["25. 壓力錶準確"],
              ],
            },
            {
              panelLabel: "連結裝置",
              questions: [
                ["26. 連結器、軛無裂痕或變形"],
                ["27. 連結器緩衝彈簧緊度適當"],
                ["28. 連結器伸出車端長度正常"],
                ["29. 軛固定螺栓無脫落或防鬆鐵絲無斷掉"],
                ["30. 導架螺栓無鬆脫"],
                ["31. 導架滑動面潤滑正常"],
                ["32. 安全鏈及螺栓無鬆脫"],
                ["33. 連結銷長度適當。"],
                ["34. 八字環磨耗量小於8mm。"],
              ]
            },
            {
              panelLabel: "電氣裝置",
              questions: [
                ["35. 蓄電池外箱無破損、洩漏"],
                ["36. 蓄電池導線或接頭良好"],
                ["37. 蓄電池電解液適當"],
                ["38. 電氣連接線絕緣物無破損"],
                ["39. 配電箱無破損"],
                ["40. 保險絲功能正常"],
                ["41. 電氣開關、插頭、插座、接頭等無破損、鬆弛或不良"],
                ["42. 燈泡、燈管無破損或不良"],
                ["43. 燈具、燈架無破損或不良"],
                ["44. 變壓器、充電器裝置無破損或機能不良"],
                ["45. 播音機、喇叭無破損或機能不良"],
                ["46. 個別車廂播音音量大小一致"],
                ["47. 雨刷機無破損或機能不良"],
                ["48. 車廂間電纜線長度適當"],
              ]
            },
            {
              panelLabel: "空氣調節裝置",
              questions: [
                ["49. 電源電壓在額定電壓440伏特±10%以內"],
                ["50. 空調機配電盤內各機件之安裝螺絲無鬆弛"],
                ["51. 運轉指示燈顯示正確"],
                ["52. 空氣過濾網無髒污"],
                ["53. 溫度開關調整第1段設在25℃，第2段設在27℃，暖氣設在15℃位置"],
                ["54. 運轉中之冷媒低壓值在3～7kg/cm2，高壓值在13～22kg/cm2之範圍內"],
                ["55. 空調機運轉中聲音正常"],
                ["56. 出風口無破裂或作用不良"],
                ["57. 出風口風量適當"],
                ["58. 車廂內冷度適當"],
              ]
            },
            {
              panelLabel: "車內各種設備",
              questions: [
                ["59. 廁所盥洗設備之鏡子、洗手台、馬桶、坐墊自動掀起裝置、扶手、垃圾桶、沖洗按鈕開關、衛生紙架、排風扇及其他附屬設備無破損或作用不良"],
                ["60. 儲水筒及供水管路無阻塞"],
                ["61. 馬桶水量充足、沖力強及沖水正常"],
                ["62. 馬桶沖洗時間正常"],
                ["63. 廁所控制氣壓管無漏氣"],
                ["64. 馬桶切斷閥正常"],
                ["65. 水龍頭關閉位置無漏水"],
                ["66. 座椅布無破損或汙穢"],
                ["67. 座椅迴轉或椅背復位操縱桿正常"],
                ["68. 座椅扶手、踏板等無缺損或不良"],
                ["69. 窗簾布無汙穢、破損"],
                ["70. 座號、茶杯架無破損"],
                ["71. 門窗、膠條、行李架、扶桿、頂板、璧板、地板等無汙穢、破損、銹蝕或不良"],
                ["72. 車內各式固定螺絲無缺損或突出"],
                ["73. 滅火器無過期、洩露或破損"],
                ["74. 車窗擊破鎚無缺損"],
              ]
            },
            {
              panelLabel: "車架及轉向架",
              questions: [
                ["75. 車身車架各樑有無銹蝕破損"],
                ["76. 轉向框架、彎樑、導板、搖枕、角銷、懸吊系統、中心盤及其他轉向架機件無斷裂、變形、銹蝕、擦撞痕跡或作用不良"],
                ["77. 各式螺栓、襯套及銷無鬆脫或斷裂"],
                ["78. 排障器無缺損、斷裂、變形"],
                ["79. 旁承座間隙在3～6mm之間(每4個月量測一次)"],
                ["80. 旁承座潤滑正常"],
                ["81. 中心盤上、下盤無破裂"],
              ]
            },
            {
              panelLabel: "車身外觀",
              questions: [
                ["82. 車身傾斜左右高低差不超過13mm(月檢)"],
                ["83. 車身文字、標記無脫落或不明顯"],
                ["84. 車身側面及車頂油漆無龜裂、剝落、褪色、髒污"],
                ["85. 車身鈑金無變形、龜裂、銹蝕"],
                ["86. 通路渡板及扶手無銹蝕、不良"],
              ]
            },
          ],
          questionLabels: [       //標題
            {
              width: 4,
              text: "檢查項目",
              generate: false,
            },
            {
              width: 4,
              text: "檢查結果",
              generate: true,
            },
            {
              width: 4,
              text: "說明",
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
                  color: "success",
                  label: "經修復(需填說明→)",
                  value: "2",
                },
                {
                  color: "red",
                  label: "需進廠檢修",
                  value: "3",
                },
                {
                  color: "black",
                  label: "車輛無此項目",
                  value: "4",
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
          "LastChkDay",
          "ChkDay",
          "DoneDay",
          "CarNum",
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
          "CheckOption53",
          "CheckOption54",
          "CheckOption55",
          "CheckOption56",
          "CheckOption57",
          "CheckOption58",
          "CheckOption59",
          "CheckOption60",
          "CheckOption61",
          "CheckOption62",
          "CheckOption63",
          "CheckOption64",
          "CheckOption65",
          "CheckOption66",
          "CheckOption67",
          "CheckOption68",
          "CheckOption69",
          "CheckOption70",
          "CheckOption71",
          "CheckOption72",
          "CheckOption73",
          "CheckOption74",
          "CheckOption75",
          "CheckOption76",
          "CheckOption77",
          "CheckOption78",
          "CheckOption79",
          "CheckOption80",
          "CheckOption81",
          "CheckOption82",
          "CheckOption83",
          "CheckOption84",
          "CheckOption85",
          "CheckOption86",
          "memo1",
          "memo2",
          "memo3",
          "memo4",
          "memo5",
          "memo6",
          "memo7",
          "memo8",
          "memo9",
          "memo10",
          "memo11",
          "memo12",
          "memo13",
          "memo14",
          "memo15",
          "memo16",
          "memo17",
          "memo18",
          "memo19",
          "memo20",
          "memo21",
          "memo22",
          "memo23",
          "memo24",
          "memo25",
          "memo26",
          "memo27",
          "memo28",
          "memo29",
          "memo30",
          "memo31",
          "memo32",
          "memo33",
          "memo34",
          "memo35",
          "memo36",
          "memo37",
          "memo38",
          "memo39",
          "memo40",
          "memo41",
          "memo42",
          "memo43",
          "memo44",
          "memo45",
          "memo46",
          "memo47",
          "memo48",
          "memo49",
          "memo50",
          "memo51",
          "memo52",
          "memo53",
          "memo54",
          "memo55",
          "memo56",
          "memo57",
          "memo58",
          "memo59",
          "memo60",
          "memo61",
          "memo62",
          "memo63",
          "memo64",
          "memo65",
          "memo66",
          "memo67",
          "memo68",
          "memo69",
          "memo70",
          "memo71",
          "memo72",
          "memo73",
          "memo74",
          "memo75",
          "memo76",
          "memo77",
          "memo78",
          "memo79",
          "memo80",
          "memo81",
          "memo82",
          "memo83",
          "memo84",
          "memo85",
          "memo86",
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