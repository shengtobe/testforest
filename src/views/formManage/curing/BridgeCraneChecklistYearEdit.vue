<template>   
  <v-card>
    <v-card-title class="blue white--text px-4 py-1">
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
          Memo53: "",
          Memo54: "",
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
          "1.依職業安全衛生法第23條及職業安全衛生管理辦法第19條規定辦理。",
          "2.檢查結果應詳實紀錄。檢查結果請依狀態選擇正常、異常。",
          "3.缺點由使用單位自行改善，不克者委請設備商維護。",
          "4.本表於12月年底前完成檢查，經主管核章後，留存於管理單位之系統以保存備查。",
        ],
        questions: {
          panelQuestion: [      //題目
            {
              panelLabel: "電氣部份",
              questions: [
                ["吊重電動機","溫度","用手擦拭是否燙手","正常溫度（不燙手；周圍溫度＋20℃）",],
                ["吊重電動機","聲音","不正常作鳴鳴之聲","正常聲音",],
                ["吊重電動機","接觸不良","端點螺絲是否鬆弛","充分旋緊",],
                ["走行電動機","溫度","用手擦拭是否燙手","正常溫度（不燙手；周圍溫度＋20℃）",],
                ["走行電動機","聲音","不正常作鳴鳴之聲","正常聲音",],
                ["走行電動機","損傷","端點螺絲是否鬆弛","充分旋緊",],
                ["旋轉或橫行電動機","溫度","用手擦拭是否燙手","正常溫度（不燙手；周圍溫度＋20℃）",],
                ["旋轉或橫行電動機","聲音","不正常作鳴鳴之聲","正常聲音",],
                ["旋轉或橫行電動機","損傷","端點螺絲是否鬆弛","充分旋緊",],
                ["吊桿升降機或其他用途電動機","溫度","用手擦拭是否燙手","正常溫度（不燙手；周圍溫度＋20℃）",],
                ["吊桿升降機或其他用途電動機","聲音","不正常作鳴鳴之聲","正常聲音",],
                ["吊桿升降機或其他用途電動機","損傷","端點螺絲是否鬆弛","充分旋緊",],
                ["電阻器","接觸不良","端點螺絲是否鬆弛","充分旋緊",],
                ["電阻器（走行）","接觸不良","端點螺絲是否鬆弛","充分旋緊",],
                ["電阻器（旋轉或橫行）","接觸不良","端點螺絲是否鬆弛","充分旋緊",],
                ["直、間接控制器（吊重）","動作","反覆操作查看其動作狀況及電譯情形","動作確實",],
                ["直、間接控制器（行走）","動作","反覆操作查看其動作狀況及電譯情形","動作確實",],
                ["直、間接控制器（旋轉或橫行）","動作","反覆操作查看其動作狀況及電譯情形","動作確實",],
                ["電磁升降剎車","動作","反覆操作上升查看其動作狀況停止位置","動作確實",],
                ["電磁行走剎車","動作","反覆操作查看其動作狀況停止位置","動作確實",],
                ["渦電流及其控制剎車","動作","使用特下降查看其降落速度是否適當","動作適當",],
                ["吊物升降極限開關","動作及位置","動作是否確實；螺旋有無鬆弛","動作確實",],
                ["行走極限開關","動作","動作是否確實；螺旋有無鬆弛","動作確實",],
                ["集電裝置","接觸不良","螺絲是否鬆弛","充分旋緊",],
                ["集電裝置","輪屐磨耗","查看接觸部分是否磨耗","充分旋緊",],
                ["旋轉集電滑環","接觸不良","接觸壓力是否過當","調整接解壓",],
                ["旋轉集電滑環","磨耗","接觸部分是否磨損","調整接解壓",],
                ["配線","被覆","被覆是否剝損劣化","良好",],
                ["配線","接續","端點螺栓是否鬆弛","充分旋緊",],
                ["無熔絲斷路器","動作","使規定電流通過是否跳脫","超過規定電流通過應跳脫",],
                ["保險絲","容量","保險絲是否符合規定","規定內",],
                ["電磁接觸","接觸不良","螺絲是否鬆弛是否接觸不良","接觸緊故動作確實",],
              ],
            },
            {
              panelLabel: "機械部分",
              questions: [
                ["主捲揚盤","損傷","檢視有無損傷","良好無損",],
                ["副捲揚盤","損傷","檢視有無損傷","良好無損",],
                ["鋼索吊鍊及附件","損傷","檢視有無損傷斷裂及附件是否完好","良好無損",],
                ["吊鉤","安全栓","有無安全栓是否良好","安全栓良好",],
                ["索輪","索槽磨損","檢視索槽磨損情形","磨損1/4a以下",],
                ["鋼索絞盤末端夾","是否鬆弛","目測","堅固無損",],
                ["油脂潤滑情形","潤滑是否已乾","拆卸目測","潤滑油充足",],
                ["鋼架","損傷銹蝕","有無損傷銹蝕","良好無損",],
                ["機身旋轉情形","動作","旋轉平穩","良好無損",],
                ["軌道","損傷斷裂","有無損傷斷裂","良好無損",],
                ["阻擋器","牢固否位置適當否","目測","牢固適當",],
              ],
            },
            {
              panelLabel: "安全設備",
              questions: [
                ["電纜溝蓋","有無損傷銹蝕","有無損傷銹蝕、斷裂","良好無損",],
                ["行走警鈴","響亮","行走時響亮","良好無損",],
                ["喇叭","響亮","按動時鳴叫","良好無損",],
                ["照明燈","明亮","燈泡是否損壞線路是否連通","控制靈敏",],
                ["夜間警示燈","明亮","燈泡是否損壞線路是否連通","控制靈敏",],
                ["禁止攀登標示牌","醒目否","是否在適當處懸掛","良好適當",],
                ["安全標示","醒目否","是否在適當部位裝置","良好適當",],
                ["地板","損壞油垢","是否附著油污或損壞","堅固清潔",],
                ["消防設備","有效否","是否過期失效、適當、充足","堅固清潔",],
                ["堅固設備","損壞","零件、鋼索、齊全損壞否","齊全良好",],
                ["荷重試驗","荷重容量","是否符合荷重容量","符合荷重",],
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
          "Memo53",
          "Memo54",
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