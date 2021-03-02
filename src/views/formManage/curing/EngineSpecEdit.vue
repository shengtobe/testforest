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
              <h3 class="mb-1">引擎號碼</h3>
              <v-text-field
                solo
                value
                v-model="inputData.editableData.EngineNo"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">檢查人員</h3>
              <v-text-field solo value v-model="inputData.Name" />
            </v-col>
          </v-row>
          <commonQuestion :settings="settings" v-model="inputData" />
        </v-col>
        <!-- END 檢查項目 -->
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
        { width: 3, text: "名稱" },
        { width: 5, text: "摘要", model: "CheckOption" },
        { width: 4, text: "備註", model: "Memo" },
      ],
      alerts: [
        {
          startAt: 1,
          columns: [
            {
              rows: [{ label: "型式", type: "label" }],
            },
            {
              rows: [{ label: "摘要", type: "area", placeholder: "AAA-00A" }],
            },
            {
              rows: [{ label: "備註", type: "area", placeholder: "備註" }],
            },
          ],
        },
        {
          startAt: 2,
          columns: [
            {
              rows: [{ label: "製造廠名", type: "label" }],
            },
            {
              rows: [{ label: "摘要", type: "area" }],
            },
            {
              rows: [{ label: "備註", type: "area", placeholder: "備註" }],
            },
          ],
        },
        {
          startAt: 3,
          columns: [
            {
              rows: [{ label: "製造日期", type: "label" }],
            },
            {
              rows: [{ type: "date" }],
            },
            {
              rows: [{ label: "備註", type: "area", placeholder: "備註" }],
            },
          ],
        },
        {
          startAt: 4,
          columns: [
            {
              rows: [{ label: "開始使用時間", type: "label" }],
            },
            {
              rows: [{ type: "date" }],
            },
            {
              rows: [{ label: "備註", type: "area", placeholder: "備註" }],
            },
          ],
        },
        {
          startAt: 5,
          columns: [
            {
              rows: [{ label: "價格", type: "label" }],
            },
            {
              rows: [{ label: "摘要", type: "number", min: 0 }],
            },
            {
              rows: [{ label: "備註", type: "area", placeholder: "備註" }],
            },
          ],
        },
        {
          startAt: 6,
          columns: [
            {
              rows: [{ label: "爆發順序", type: "label" }],
            },
            {
              rows: [
                { label: "摘要", type: "text", placeholder: "1-5-3-6-2-4" },
              ],
            },
            {
              rows: [{ label: "備註", type: "area", placeholder: "備註" }],
            },
          ],
        },
        {
          startAt: 7,
          columns: [
            {
              rows: [{ label: "壓縮比", type: "label" }],
            },
            {
              rows: [{ label: "摘要", type: "text", placeholder: "88:88" }],
            },
            {
              rows: [{ label: "備註", type: "area", placeholder: "備註" }],
            },
          ],
        },
        {
          startAt: 8,
          columns: [
            {
              rows: [{ label: "迴轉方向", type: "label" }],
            },
            {
              rows: [
                {
                  label: "摘要",
                  type: "select",
                  placeholder: "點此選擇",
                  select: [
                    { text: "順時針", value: "A" },
                    { text: "逆時針", value: "B" },
                  ],
                },
              ],
            },
            {
              rows: [{ label: "備註", type: "area", placeholder: "備註" }],
            },
          ],
        },
        {
          startAt: 9,
          columns: [
            {
              rows: [{ label: "引擎重量", type: "label" }],
            },
            {
              rows: [
                { label: "摘要", type: "text", placeholder: "加液油後 1234kg" },
              ],
            },
            {
              rows: [{ label: "備註", type: "area", placeholder: "備註" }],
            },
          ],
        },
        {
          startAt: 10,
          columns: [
            {
              rows: [{ label: "引擎尺寸", type: "label" }],
            },
            {
              rows: [
                { label: "摘要", type: "text", placeholder: "長 x 寬 x 高" },
              ],
            },
            {
              rows: [{ label: "備註", type: "area", placeholder: "備註" }],
            },
          ],
        },
        {
          startAt: 11,
          columns: [
            {
              rows: [{ label: "總排氣量", type: "label" }],
            },
            {
              rows: [{ label: "摘要", type: "text", placeholder: "1234 in³" }],
            },
            {
              rows: [{ label: "備註", type: "area", placeholder: "備註" }],
            },
          ],
        },
        {
          startAt: 12,
          columns: [
            {
              rows: [{ label: "直徑 x 衝程 x 數", type: "label" }],
            },
            {
              rows: [
                {
                  label: "摘要",
                  type: "text",
                  placeholder: "888.8 x 888.8",
                  prepend: "最大",
                  append: "M/sec",
                },
                {
                  type: "text",
                  placeholder: "888.8 x 888.8",
                  prepend: "標準",
                  append: "M/sec",
                },
              ],
            },
            {
              rows: [
                { label: "備註", type: "area", placeholder: "備註" },
                { label: "備註", type: "area", placeholder: "備註" },
              ],
            },
          ],
        },
        {
          startAt: 14,
          columns: [
            {
              rows: [{ label: "活塞移動量", type: "label" }],
            },
            {
              rows: [{ label: "摘要", type: "number", append: "m³", min: "0" }],
            },
            {
              rows: [{ label: "備註", type: "area", placeholder: "備註" }],
            },
          ],
        },
        {
          startAt: 15,
          columns: [
            {
              rows: [{ label: "活塞平均速度", type: "label" }],
            },
            {
              rows: [{ label: "摘要", type: "text" }],
            },
            {
              rows: [{ label: "備註", type: "area", placeholder: "備註" }],
            },
          ],
        },
        {
          startAt: 16,
          columns: [
            {
              rows: [{ label: "爆發壓力", type: "label" }],
            },
            {
              rows: [{ label: "摘要", type: "text" }],
            },
            {
              rows: [{ label: "備註", type: "area", placeholder: "備註" }],
            },
          ],
        },
        {
          startAt: 17,
          columns: [
            {
              rows: [{ label: "馬力", type: "label" }],
            },
            {
              rows: [
                {
                  label: "摘要",
                  type: "number",
                  prepend: "最大",
                  append: "HP",
                },
                { type: "number", prepend: "標準", append: "HP" },
              ],
            },
            {
              rows: [
                { label: "備註", type: "area", placeholder: "備註" },
                { label: "備註", type: "area", placeholder: "備註" },
              ],
            },
          ],
        },
        {
          startAt: 19,
          columns: [
            {
              rows: [{ label: "轉速", type: "label" }],
            },
            {
              rows: [
                {
                  label: "摘要",
                  type: "number",
                  prepend: "最大",
                  append: "RPM",
                },
                { type: "number", prepend: "標準", append: "RPM" },
              ],
            },
            {
              rows: [
                { label: "備註", type: "area", placeholder: "備註" },
                { label: "備註", type: "area", placeholder: "備註" },
              ],
            },
          ],
        },
        {
          startAt: 21,
          columns: [
            {
              rows: [{ label: "燃料", type: "label" }],
            },
            {
              rows: [
                {
                  label: "摘要",
                  type: "text",
                  prepend: "種類",
                  placeholder: "高級柴油",
                },
                { type: "text", prepend: "消費量於標準HP", append: "以下" },
              ],
            },
            {
              rows: [
                { label: "備註", type: "area", placeholder: "備註" },
                { label: "備註", type: "area", placeholder: "備註" },
              ],
            },
          ],
        },
        {
          startAt: 23,
          columns: [
            {
              rows: [{ label: "燃料供給裝置", type: "label" }],
            },
            {
              rows: [
                { label: "摘要", type: "text", prepend: "燃油泵" },
                { type: "text", prepend: "噴油嘴保持器" },
                { type: "text", prepend: "噴油嘴" },
              ],
            },
            {
              rows: [
                { label: "備註", type: "area", placeholder: "備註" },
                { label: "備註", type: "area", placeholder: "備註" },
                { label: "備註", type: "area", placeholder: "備註" },
              ],
            },
          ],
        },
        {
          startAt: 26,
          columns: [
            {
              rows: [{ label: "閥開閉時期", type: "label" }],
            },
            {
              rows: [
                { label: "摘要", type: "text", prepend: "進氣-開" },
                { type: "text", prepend: "進氣-閉" },
                { type: "text", prepend: "排氣-開" },
                { type: "text", prepend: "排氣-閉" },
              ],
            },
            {
              rows: [
                { label: "備註", type: "area", placeholder: "備註" },
                { label: "備註", type: "area", placeholder: "備註" },
                { label: "備註", type: "area", placeholder: "備註" },
                { label: "備註", type: "area", placeholder: "備註" },
              ],
            },
          ],
        },
        {
          startAt: 30,
          columns: [
            {
              rows: [{ label: "潤滑方式", type: "label" }],
            },
            {
              rows: [{ label: "摘要", type: "text" }],
            },
            {
              rows: [{ label: "備註", type: "area", placeholder: "備註" }],
            },
          ],
        },
        {
          startAt: 31,
          columns: [
            {
              rows: [{ label: "冷卻方式", type: "label" }],
            },
            {
              rows: [{ label: "摘要", type: "text" }],
            },
            {
              rows: [{ label: "備註", type: "area", placeholder: "備註" }],
            },
          ],
        },
        {
          startAt: 32,
          columns: [
            {
              rows: [{ label: "啟動馬達", type: "label" }],
            },
            {
              rows: [{ label: "摘要", type: "text" }],
            },
            {
              rows: [{ label: "備註", type: "area", placeholder: "備註" }],
            },
          ],
        },
        {
          startAt: 33,
          columns: [
            {
              rows: [{ label: "充電發電機", type: "label" }],
            },
            {
              rows: [{ label: "摘要", type: "text" }],
            },
            {
              rows: [{ label: "備註", type: "area", placeholder: "備註" }],
            },
          ],
        },
        {
          startAt: 34,
          columns: [
            {
              rows: [{ label: "冷卻水泵", type: "label" }],
            },
            {
              rows: [{ label: "摘要", type: "text" }],
            },
            {
              rows: [{ label: "備註", type: "area", placeholder: "備註" }],
            },
          ],
        },
        {
          startAt: 35,
          columns: [
            {
              rows: [{ label: "涼油器", type: "label" }],
            },
            {
              rows: [{ label: "摘要", type: "text" }],
            },
            {
              rows: [{ label: "備註", type: "area", placeholder: "備註" }],
            },
          ],
        },
        {
          startAt: 36,
          columns: [
            {
              rows: [{ label: "節溫器", type: "label" }],
            },
            {
              rows: [{ label: "摘要", type: "text" }],
            },
            {
              rows: [{ label: "備註", type: "area", placeholder: "備註" }],
            },
          ],
        },
      ],
    },
    inputData: {
      RPFlowNo: "",
      DepartCode: "",
      DepartName: "",
      ID: "",
      Name: "",
      editableData: {
        CheckDay: "",
        EngineNo: "",
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
      },
    },
  }),
  components: {
    commonQuestion,
    dateSelect,
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
          "EngineNo",
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
};
</script>