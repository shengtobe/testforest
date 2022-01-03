<template>
  <v-card class="theme-card">
    <v-card-title class="white--text px-4 py-1">
      {{ editType }}{{ commonSettings.title }}
      <v-spacer></v-spacer>
      <v-btn dark fab small text @click="close" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <div class="px-6 py-4">
      <v-row>
        <v-col cols="12">
          <p>1.連結器檢查，於連結桿圓桿與長方形狀交接處，應以液體滲透檢查。</p>
        </v-col>
        <!-- 檢查項目 -->
        <v-col cols="12">
          <v-row no-gutter class="label-header">
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
                <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>車輛編號
              </h3>
              <v-text-field solo v-model="inputData.editableData.TrainNo" />
            </v-col>
          </v-row>
          <v-row no-gutter class="label-header">
            <v-col cols="12" sm="3" md="3">
              <dateSelect
                label="本次檢修開始日期"
                key="bgChkDay"
                :showIcon="commonSettings.iconShow"
                v-model="inputData.editableData.BgChkDay"
              />
            </v-col>
            <v-col cols="12" sm="3" md="3">
              <dateSelect
                label="本次檢修完成日期"
                key="endChkDay"
                :showIcon="commonSettings.iconShow"
                v-model="inputData.editableData.EndChkDay"
              />
            </v-col>
            <v-col cols="12" sm="3">
              <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>填寫人
              </h3>
              <v-text-field
                solo
                v-model="inputData.Name"
                :readonly="commonSettings.deptReadonly"
              />
            </v-col>
          </v-row>

          <!-- for loop -->
          <v-expansion-panels multiple>
            <template v-for="(list, index) in newItemList">
              <v-expansion-panel :key="'EP_' + (index + 1)">
                <v-expansion-panel-header color="btn-expansion" class="white--text">
                  {{ list.title }}
                  <template v-slot:actions>
                    <v-icon color="dropdownicon">
                      $expand
                    </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row
                    no-gutter
                    class="label-header d-none d-sm-flex font-weight-black"
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
                    color="border-bg-dark-yellow"
                    elevation="4"
                    v-for="(item, idx2) in list.items"
                    :key="'i' + (list.startIndex + idx2)"
                    class="mb-6 mt-4"
                  >
                    <v-row no-gutter>
                      <v-col cols="12" sm="4">{{ item.question }}</v-col>
                      <v-col cols="12" sm="4">
                        <span class="d-sm-none label-header">檢查結果：</span>
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
                            label="正常"
                            value="1"
                          ></v-radio>
                          <v-radio
                            color="red"
                            label="不正常"
                            value="2"
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
        title: "客車三級檢修記錄表",
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
          LastChkDay: "",
          TrainNo: "",
          BgChkDay: "",
          EndChkDay: "",
          CheckDay: "",
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
          CheckOption11: "",
          Memo11: "",
          CheckOption12: "",
          Memo12: "",
          CheckOption13: "",
          Memo13: "",
          CheckOption14: "",
          Memo14: "",
          CheckOption15: "",
          Memo15: "",
          CheckOption16: "",
          Memo16: "",
          CheckOption17: "",
          Memo17: "",
          CheckOption18: "",
          Memo18: "",
          CheckOption19: "",
          Memo19: "",
          CheckOption20: "",
          Memo20: "",
          CheckOption21: "",
          Memo21: "",
          CheckOption22: "",
          Memo22: "",
          CheckOption23: "",
          Memo23: "",
          CheckOption24: "",
          Memo24: "",
          CheckOption25: "",
          Memo25: "",
          CheckOption26: "",
          Memo26: "",
          CheckOption27: "",
          Memo27: "",
          CheckOption28: "",
          Memo28: "",
          CheckOption29: "",
          Memo29: "",
          CheckOption30: "",
          Memo30: "",
          CheckOption31: "",
          Memo31: "",
          CheckOption32: "",
          Memo32: "",
          CheckOption33: "",
          Memo33: "",
          CheckOption34: "",
          Memo34: "",
          CheckOption35: "",
          Memo35: "",
          CheckOption36: "",
          Memo36: "",
          CheckOption37: "",
          Memo37: "",
          CheckOption38: "",
          Memo38: "",
          CheckOption39: "",
          Memo39: "",
          CheckOption40: "",
          Memo40: "",
          CheckOption41: "",
          Memo41: "",
          CheckOption42: "",
          Memo42: "",
          CheckOption43: "",
          Memo43: "",
          CheckOption44: "",
          Memo44: "",
          CheckOption45: "",
          Memo45: "",
          CheckOption46: "",
          Memo46: "",
          CheckOption47: "",
          Memo47: "",
          CheckOption48: "",
          Memo48: "",
          CheckOption49: "",
          Memo49: "",
          CheckOption50: "",
          Memo50: "",
          CheckOption51: "",
          Memo51: "",
          CheckOption52: "",
          Memo52: "",
          CheckOption53: "",
          Memo53: "",
          CheckOption54: "",
          Memo54: "",
          CheckOption55: "",
          Memo55: "",
          CheckOption56: "",
          Memo56: "",
          CheckOption57: "",
          Memo57: "",
          CheckOption58: "",
          Memo58: "",
          CheckOption59: "",
          Memo59: "",
          CheckOption60: "",
          Memo60: "",
          CheckOption61: "",
          Memo61: "",
          CheckOption62: "",
          Memo62: "",
          CheckOption63: "",
          Memo63: "",
          CheckOption64: "",
          Memo64: "",
          CheckOption65: "",
          Memo65: "",
          CheckOption66: "",
          Memo66: "",
          CheckOption67: "",
          Memo67: "",
          CheckOption68: "",
          Memo68: "",
          CheckOption69: "",
          Memo69: "",
          CheckOption70: "",
          Memo70: "",
          CheckOption71: "",
          Memo71: "",
          CheckOption72: "",
          Memo72: "",
          CheckOption73: "",
          Memo73: "",
          CheckOption74: "",
          Memo74: "",
          CheckOption75: "",
          Memo75: "",
          CheckOption76: "",
          Memo76: "",
          CheckOption77: "",
          Memo77: "",
          CheckOption78: "",
          Memo78: "",
          CheckOption79: "",
          Memo79: "",
          CheckOption80: "",
          Memo80: "",
          CheckOption81: "",
          Memo81: "",
          CheckOption82: "",
          Memo82: "",
          CheckOption83: "",
          Memo83: "",
          CheckOption84: "",
          Memo84: "",
          CheckOption85: "",
          Memo85: "",
          CheckOption86: "",
          Memo86: "",
          CheckOption87: "",
          Memo87: "",
          CheckOption88: "",
          Memo88: "",
          CheckOption89: "",
          Memo89: "",
          CheckOption90: "",
          Memo90: "",
        },
      },
      itemsList: [
        {
          title: "行走裝置",
          items: [
            { question: "1. 輪、軸位置無鬆弛移位現象" },
            { question: "2. 車輪背距在679±5mm範圍內" },
            { question: "3. 車輪及車軸無裂痕" },
            { question: "4. 車軸無彎曲" },
            { question: "5. 輪緣磨耗無超限(厚度大於24mm)" },
            { question: "6. 輪緣高度無超出輪踏面31mm" },
            { question: "7. 輪緣缺損長度無超過27mm、寬度無超過9mm" },
            { question: "8. 踏面擦傷長度無超過40mm" },
            { question: "9. 軸承箱與導板間隙無超過6mm" },
            { question: "10. 車輪直徑大於540mm，各輪徑檢查(端面有凹痕記號)" },
            { question: "11. 軸承箱無裂痕或破損" },
            { question: "12. 軸承箱螺栓無鬆弛或脫落" },
            { question: "13. 更換潤滑油脂，檢查外側油封是否漏油" },
            { question: "14. 軸承箱內各機件無變形、鬆弛、斷裂或磨損" },
            { question: "15. 軸承轉動順暢無異音" },
          ],
        },
        {
          title: "軔機裝置",
          items: [
            { question: "1. 軔塊調整桿彎曲方向正確" },
            { question: "2. 銷、孔、軸頸及襯套之直徑磨耗量小於2mm" },
            { question: "3. 各桿與車體其他部分無不當碰觸" },
            { question: "4. 氣軔軟管無超過耐用6年期限" },
            { question: "5. 軔管無破損、漏氣" },
            { question: "6. 手軔機各機件無磨耗過量或潤滑不良" },
            {
              question:
                "7. 檢修軔缸時，應將其分解，施以各部之清拭及檢修，並將不良部分更換，塗布油脂後重新裝配之",
            },
            {
              question:
                "8. 檢修K閥及EA閥時，應將其分解，施以各部之清拭、檢修，並將不良部分更換，以#10號油潤滑後重新裝配之，間隔一次更換橡膠零件",
            },
            { question: "9. 濾塵器檢修及清理" },
            { question: "10. 各儲氣筒凝結水排除" },
          ],
        },
        {
          title: "連結裝置",
          items: [
            { question: "1. 連結器、軛無裂痕或變形" },
            { question: "2. 連結器及軛直徑磨損量無超過百分之三十" },
            { question: "3. 拆解連結器液滲檢查軸頸，及調整彈簧緊度" },
            { question: "4. 軛固定螺栓無脫落或防鬆鐵絲緊固" },
            { question: "5. 導架螺栓無鬆脫" },
            { question: "6. 導架滑動面有油潤" },
            { question: "7. 安全鏈及螺栓無鬆脫" },
            { question: "8. 連結銷直徑磨耗量無超過10mm" },
          ],
        },
        {
          title: "電氣裝置",
          items: [
            { question: "1. 蓄電池外箱無破損、洩漏" },
            { question: "2. 蓄電池導線或接頭良好" },
            { question: "3. 蓄電池電解液高度適當" },
            { question: "4. 電氣連接線絕緣物無破損" },
            { question: "5. 配電箱無破損" },
            { question: "6. 保險絲良好，保險絲容量適當" },
            { question: "7. 電氣開關、插頭、插座、接頭等無破損、鬆弛或不良" },
            {
              question:
                "8. 各式燈具外蓋拆開清理，燈具、燈架無破損，或燈泡、燈管功能正常",
            },
            { question: "9. 變壓器、充電器裝置無破損或機能不良" },
            { question: "10. 播音機、喇叭無破損或機能不良" },
            { question: "11. 雨刷機無破損或機能不良" },
            { question: "12. 440V插頭拆解檢查電線與銅極焊合情形" },
          ],
        },
        {
          title: "空氣調節裝置",
          items: [
            { question: "1. 空調機配電盤內各機件之安裝螺絲無鬆弛" },
            { question: "2. 運轉指示燈顯示正確" },
            { question: "3. 空氣過濾網清潔" },
            {
              question:
                "4. 運轉中之冷媒低壓值在3~7kg/cm2，高壓值在13~22kg/cm2之範圍內",
            },
            { question: "5. 風扇運轉正常" },
            { question: "6. 空調機運轉中無異音" },
            { question: "7. 出風口無破裂或作用不良" },
            { question: "8. 出風口風量正常可調整" },
            { question: "9. 車廂內冷度正常可調整" },
            { question: "10. 檢查空調機金屬外殼與上面電線無摩擦破皮情形" },
            { question: "11. 空調機基座無銹蝕、固定良好，門蓋板作用正常" },
            {
              question:
                "12. 空調機之絕緣在主電路不低於0.2MΩ，在控制電路不低於0.1MΩ",
            },
            {
              question:
                "13. 延時裝置、過熱遮斷裝置、過載保護裝置之檢查與調整，並確認其作用符合設定值",
            },
          ],
        },
        {
          title: "車內各種設備",
          items: [
            {
              question:
                "1. 廁所盥洗設備之鏡子、洗手台、馬桶、坐墊自動掀起裝置、扶手、垃圾桶、沖洗按鈕開關、衛生紙架、排風扇及其他附屬設備無破損或作用不良",
            },
            { question: "2. 儲水筒及供水管路無阻塞" },
            { question: "3. 馬桶水量、沖力、沖水功能正常" },
            { question: "4. 馬桶沖洗時間正常" },
            { question: "5. 廁所控制氣壓管無漏氣" },
            { question: "6. 馬桶切斷閥功能正常" },
            { question: "7. 水龍頭關閉位置無漏水" },
            { question: "8. 座椅布無破損或髒污" },
            { question: "9. 座椅迴轉或椅背復位氣壓桿功能正常" },
            { question: "10. 座椅扶手、煙灰缸、踏板等無缺損或不良" },
            { question: "11. 座號、茶杯架無破損" },
            {
              question:
                "12. 門窗、膠條、行李架、扶桿、頂板、璧板、地板等無髒污、破損、銹蝕或不良",
            },
            { question: "13. 車內各式固定螺絲無缺損或突出" },
            { question: "14. 滅火器無過期、洩露或破損" },
            { question: "15. 車窗擊破鎚無缺損或鬆弛" },
          ],
        },
        {
          title: "車架及轉向架",
          items: [
            { question: "1. 車架各梁無銹蝕破損" },
            {
              question:
                "2. 轉向框架、彎樑、導板、搖枕、角銷、懸吊系統、中心盤及其他轉向架機件無斷裂、變形、銹蝕、擦撞痕跡或作用不良",
            },
            { question: "3. 各式螺栓、襯套、銷無鬆脫或斷裂" },
            { question: "4. 排障器無缺損、斷裂、變形" },
            { question: "5. 旁承座間隙在3~6mm之間" },
            { question: "6. 旁承座無磨損過量" },
            { question: "7. 中心盤上、下盤無破裂，鎖固良好" },
            { question: "8. 拆解橫梁吊桿，銷、孔及襯套之直徑磨耗量小於2.5mm" },
            {
              question:
                "9. 上搖枕與中間橫梁凸耳單邊磨耗間隙小於5mm，總間隙小於9mm",
            },
            { question: "10. 檢查轉向架中間橫梁變形量不超過3mm" },
          ],
        },
        {
          title: "車身外觀",
          items: [
            { question: "1. 車身傾斜左右高低差不超過13mm" },
            { question: "2. 車身文字、標記無脫落或不明顯" },
            { question: "3. 車身側面及車頂油漆無龜裂、剝落、褪色、髒污" },
            { question: "4. 車身鈑金無變形、龜裂、銹蝕" },
            { question: "5. 通路渡板及扶手無銹蝕、不良" },
            { question: "6. 檢查車門開關正常，上下軸承固定良好" },
          ],
        },
      ],
      settings: {
        columns: {
          option: "CheckOption",
          memo: "Memo",
        },
        width: {
          option: 4,
          memo: 3,
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
    // 計算各群組的起始位置
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
          "LastChkDay",
          "TrainNo",
          "BgChkDay",
          "EndChkDay",
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
          "CheckOption11",
          "Memo11",
          "CheckOption12",
          "Memo12",
          "CheckOption13",
          "Memo13",
          "CheckOption14",
          "Memo14",
          "CheckOption15",
          "Memo15",
          "CheckOption16",
          "Memo16",
          "CheckOption17",
          "Memo17",
          "CheckOption18",
          "Memo18",
          "CheckOption19",
          "Memo19",
          "CheckOption20",
          "Memo20",
          "CheckOption21",
          "Memo21",
          "CheckOption22",
          "Memo22",
          "CheckOption23",
          "Memo23",
          "CheckOption24",
          "Memo24",
          "CheckOption25",
          "Memo25",
          "CheckOption26",
          "Memo26",
          "CheckOption27",
          "Memo27",
          "CheckOption28",
          "Memo28",
          "CheckOption29",
          "Memo29",
          "CheckOption30",
          "Memo30",
          "CheckOption31",
          "Memo31",
          "CheckOption32",
          "Memo32",
          "CheckOption33",
          "Memo33",
          "CheckOption34",
          "Memo34",
          "CheckOption35",
          "Memo35",
          "CheckOption36",
          "Memo36",
          "CheckOption37",
          "Memo37",
          "CheckOption38",
          "Memo38",
          "CheckOption39",
          "Memo39",
          "CheckOption40",
          "Memo40",
          "CheckOption41",
          "Memo41",
          "CheckOption42",
          "Memo42",
          "CheckOption43",
          "Memo43",
          "CheckOption44",
          "Memo44",
          "CheckOption45",
          "Memo45",
          "CheckOption46",
          "Memo46",
          "CheckOption47",
          "Memo47",
          "CheckOption48",
          "Memo48",
          "CheckOption49",
          "Memo49",
          "CheckOption50",
          "Memo50",
          "CheckOption51",
          "Memo51",
          "CheckOption52",
          "Memo52",
          "CheckOption53",
          "Memo53",
          "CheckOption54",
          "Memo54",
          "CheckOption55",
          "Memo55",
          "CheckOption56",
          "Memo56",
          "CheckOption57",
          "Memo57",
          "CheckOption58",
          "Memo58",
          "CheckOption59",
          "Memo59",
          "CheckOption60",
          "Memo60",
          "CheckOption61",
          "Memo61",
          "CheckOption62",
          "Memo62",
          "CheckOption63",
          "Memo63",
          "CheckOption64",
          "Memo64",
          "CheckOption65",
          "Memo65",
          "CheckOption66",
          "Memo66",
          "CheckOption67",
          "Memo67",
          "CheckOption68",
          "Memo68",
          "CheckOption69",
          "Memo69",
          "CheckOption70",
          "Memo70",
          "CheckOption71",
          "Memo71",
          "CheckOption72",
          "Memo72",
          "CheckOption73",
          "Memo73",
          "CheckOption74",
          "Memo74",
          "CheckOption75",
          "Memo75",
          "CheckOption76",
          "Memo76",
          "CheckOption77",
          "Memo77",
          "CheckOption78",
          "Memo78",
          "CheckOption79",
          "Memo79",
          "CheckOption80",
          "Memo80",
          "CheckOption81",
          "Memo81",
          "CheckOption82",
          "Memo82",
          "CheckOption83",
          "Memo83",
          "CheckOption84",
          "Memo84",
          "CheckOption85",
          "Memo85",
          "CheckOption86",
          "Memo86",
          "CheckOption87",
          "Memo87",
          "CheckOption88",
          "Memo88",
          "CheckOption89",
          "Memo89",
          "CheckOption90",
          "Memo90",
        ],
      })
        .then((res) => {
          let dat = JSON.parse(res.data.DT);
          let data = dat[0];
          data.CheckDay = data.CheckDay.substr(0, 10);
          this.inputData.RPFlowNo = this.item.RPFlowNo;
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
        })
        .catch((err) => {
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
      this.chLoadingShow({ show: true});
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
            this.chMsgbar({ success: false, msg: Constrant.insert.failed });
          })
          .finally(() => {
            this.chLoadingShow({ show: false});
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
            this.chMsgbar({ success: false, msg: Constrant.update.failed });
          })
          .finally(() => {
            this.chLoadingShow({ show: false});
            that.close();
          });
      }
    },
    deleteRecord() {
      this.$emit("deleteRecord", this.inputData.RPFlowNo);
    },
  },
  filters: {
    // editStatus: function (value) {
    //   let rtnStr = "";
    //   if (value == this.actions.add) {
    //     rtnStr = "新增";
    //   } else if (value == this.actions.edit) {
    //     rtnStr = "編輯";
    //   } else {
    //     rtnStr = "";
    //   }
    //   return rtnStr;
    // },
  },
  watch: {},
};
</script>
