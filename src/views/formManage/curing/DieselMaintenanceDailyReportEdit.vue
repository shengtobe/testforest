<template>
  <v-card>
    <v-card-title class="blue white--text px-4 py-1">
      {{ editType }}{{ title }}
      <v-spacer />
      <v-btn dark fab small text @click="close" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <div class="px-6 py-4">
      <v-col cols="12">
        <!-- 檢查項目 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="4">
            <h3 class="mb-1">機車編號</h3>
            <v-text-field solo>
              <span slot="prepend-inner">DL</span>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <h3 class="mb-1">檢查日期</h3>
            <dateSelect
              key="dateEnd"
              :showIcon="commonSettings.formIconShow"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <h3 class="mb-1">氣候</h3>
            <v-text-field solo />
          </v-col>
        </v-row>
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="4">
            <h3 class="mb-1">本日行駛</h3>
            <v-text-field solo>
              <span slot="append">km</span>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <h3 class="mb-1">累計公里</h3>
            <v-text-field solo>
              <span slot="append">km</span>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <h3 class="mb-1">下次保養</h3>
            <v-text-field solo>
              <span slot="append">km</span>
            </v-text-field>
          </v-col>
        </v-row>
        <!-- 摺疊項目 -->
        <v-expansion-panels v-model="panel" multiple>
          <!-- (ㄧ)引擎啟動後10分鐘 -->
          <v-expansion-panel>
            <v-expansion-panel-header color="teal" class="white--text">(ㄧ)引擎啟動後10分鐘</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutter class="indigo--text darken-2 d-sm-flex font-weight-black">
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">引擎油壓</h3>
                  <v-text-field solo messages="(參考值1.5-5)">
                    <template slot="append">
                      kg/cm²
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">引擎水溫</h3>
                  <v-text-field solo messages="(參考值50-100℃)">
                    <span slot="append">℃</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">TC油壓</h3>
                  <v-text-field solo :messages="['TC油壓']">
                    <template slot="append">kg/cm²</template>
                    <template v-slot:message>
                      (A:DBS115-2補充油壓2~4;主液壓:7~10)
                      <br />(B：TDCBN-11-3500補充油壓2~6；主液壓19~22)
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- (二)發電機引擎 -->
          <v-expansion-panel>
            <v-expansion-panel-header color="teal" class="white--text">(二)發電機引擎</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutter class="indigo--text darken-2 d-sm-flex font-weight-black">
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">引擎油壓</h3>
                  <v-text-field solo messages="(參考值2.1-4.6)">
                    <template slot="append">kg/cm²</template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">引擎水溫</h3>
                  <v-text-field solo messages="(參考值50-100℃)">
                    <span slot="append">℃</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">引擎轉速</h3>
                  <v-text-field solo messages="(參考值1,800)">
                    <span slot="append">rpm</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">頻率</h3>
                  <v-text-field solo>
                    <span slot="append">Hz</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">電流</h3>
                  <v-text-field solo>
                    <span slot="append">A</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">電壓</h3>
                  <v-text-field solo>
                    <span slot="append">A</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">下次保養工時</h3>
                  <v-text-field solo>
                    <span slot="append">小時</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">累計工時</h3>
                  <v-text-field solo>
                    <span slot="append">小時</span>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- (三)車次、區間、噸數 -->
          <v-expansion-panel>
            <v-expansion-panel-header color="teal" class="white--text">(三)車次、區間、噸數</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutter class="indigo--text darken-2 d-sm-flex font-weight-black">
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">車次</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">區間</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">噸數</h3>
                  <v-text-field solo />
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- (四)出車命令 -->
          <v-expansion-panel>
            <v-expansion-panel-header color="teal" class="white--text">(四)出車命令</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutter class="indigo--text darken-2 d-sm-flex font-weight-black">
                <v-col cols="12">
                  <p>
                    ※司機酒測合格並接受勤前教育，無線電測試結果良好，完成開車前整備。
                    ※確認行車記錄紙已安裝
                  </p>
                </v-col>
                <v-col cols="12" sm="4">
                  <h2>准予出庫</h2>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">調度員核章</h3>
                  <v-text-field solo />
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- (五)機車使用中狀況 -->
          <v-expansion-panel>
            <v-expansion-panel-header color="teal" class="white--text">(五)機車使用中狀況</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutter class="indigo--text darken-2 d-sm-flex font-weight-black">
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">引擎rpm</h3>
                  <v-text-field solo>
                    <span slot="prepend-inner" class="text-no-wrap">最高</span>
                    <span slot="append">轉</span>
                  </v-text-field>
                  <v-text-field solo>
                    <span slot="prepend-inner" class="text-no-wrap">惰轉</span>
                    <span slot="append">轉</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">引擎油壓</h3>
                  <v-text-field solo messages="(參考值同上)">
                    <span slot="prepend-inner" class="text-no-wrap">最高</span>
                    <template slot="append">kg/cm²</template>
                  </v-text-field>
                  <v-text-field solo messages="(參考值同上)">
                    <span slot="prepend-inner" class="text-no-wrap">最低</span>
                    <template slot="append">kg/cm²</template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">引擎水溫</h3>
                  <v-text-field solo messages="(參考值同上)">
                    <span slot="prepend-inner" class="text-no-wrap">最高</span>
                    <span slot="append">℃</span>
                  </v-text-field>
                  <v-text-field solo messages="(參考值同上)">
                    <span slot="prepend-inner" class="text-no-wrap">最低</span>
                    <span slot="append">℃</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">TC油壓</h3>
                  <v-text-field solo messages="(參考值同上)">
                    <span slot="prepend-inner" class="text-no-wrap">最高</span>
                    <template slot="append">kg/cm²</template>
                  </v-text-field>
                  <v-text-field solo messages="(參考值同上)">
                    <span slot="prepend-inner" class="text-no-wrap">最低</span>
                    <template slot="append">kg/cm²</template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">TC油溫</h3>
                  <v-text-field solo messages="(參考值80-110℃)">
                    <span slot="prepend-inner" class="text-no-wrap">最高</span>
                    <span slot="append">℃</span>
                  </v-text-field>
                  <v-text-field solo messages="(參考值80-110℃)">
                    <span slot="prepend-inner" class="text-no-wrap">最低</span>
                    <span slot="append">℃</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">M.R</h3>
                  <v-text-field solo messages="(參考值6.5-8)">
                    <span slot="prepend-inner" class="text-no-wrap">最高</span>
                    <template slot="append">kg/cm²</template>
                  </v-text-field>
                  <v-text-field solo messages="(參考值6.5-8)">
                    <span slot="prepend-inner" class="text-no-wrap">最低</span>
                    <template slot="append">kg/cm²</template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">B.P</h3>
                  <v-text-field solo messages="(參考值3.6-5)">
                    <span slot="prepend-inner" class="text-no-wrap">最高</span>
                    <template slot="append">kg/cm²</template>
                  </v-text-field>
                  <v-text-field solo messages="(參考值3.6-5)">
                    <span slot="prepend-inner" class="text-no-wrap">最低</span>
                    <template slot="append">kg/cm²</template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">逆轉機油壓</h3>
                  <v-text-field solo>
                    <template slot="append">kg/cm²</template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">充電</h3>
                  <v-text-field solo>
                    <span slot="prepend-inner" class="text-no-wrap">最高</span>
                    <span slot="append">A</span>
                  </v-text-field>
                  <v-text-field solo>
                    <span slot="prepend-inner" class="text-no-wrap">最低</span>
                    <span slot="append">A</span>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- (六)路線 -->
          <v-expansion-panel>
            <v-expansion-panel-header color="teal" class="white--text">(六)路線</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutter class="indigo--text darken-2 d-sm-flex font-weight-black">
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">路基</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">隧道及橋樑</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">平交道安全防護設施</h3>
                  <v-text-field solo />
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- (七)其他事項 -->
          <v-expansion-panel>
            <v-expansion-panel-header color="teal" class="white--text">(七)其他事項</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutter class="indigo--text darken-2 d-sm-flex font-weight-black">
                <v-col cols="12">
                  <h3 class="mb-1">其他事項</h3>
                  <v-textarea solo rows="4" />
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- (八)本日用油 -->
          <v-expansion-panel>
            <v-expansion-panel-header color="teal" class="white--text">(八)本日用油</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutter class="indigo--text darken-2 d-sm-flex font-weight-black">
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">柴油</h3>
                  <v-text-field solo>
                    <span slot="append">公升</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">液體變速機</h3>
                  <v-text-field solo>
                    <span slot="append">公升</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">機油(10#)</h3>
                  <v-text-field solo>
                    <span slot="append">公升</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">機油(15W/40)</h3>
                  <v-text-field solo>
                    <span slot="append">公升</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">機油(85W/90)</h3>
                  <v-text-field solo>
                    <span slot="append">公升</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">液壓油</h3>
                  <v-text-field solo>
                    <span slot="append">公升</span>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <!-- END 檢查項目 -->
      </v-col>
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
        >送出
      </v-btn>
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
import { fetchOrganization } from '@/apis/organization'
import { Actions } from "@/assets/js/actions";
import { Constrant } from "@/assets/js/constrant";
export default {
  props: {
    item: Object,
    editType: String,
    DB_Table: String,
    title: String,
    type: String,
  },
  data: () => ({
    actions: Actions,
    commonSettings: {
      iconShow: false,
      isLoading: false,
      deptReadonly: true,
    },
    deptOptions:[],
    panel: [0, 1, 2, 3, 4, 5, 6, 7], // 摺疊預設展開
    inputData: {
      RPFlowNo: "",
      DepartCode: "",
      DepartName: "",
      ID: "",
      Name: "",
      editableData: {
        CheckDay: "",
        Type: "",
        HandlerID: [],
        Memo1: "",
        Memo2: "",
      },
    },
    orgList: [],
  }),
  components: {
    dateSelect
  },
  mounted() {
    this.editType == this.actions.edit
      ? this.viewPage(this.item)
      : this.newPage();
    this.inputData.editableData.Type = this.type
  },
  computed: {
    ...mapState("user", {
      userData: (state) => state.userData, // 使用者基本資料
    }),
    _typeChangeTitle: function() {
      if(this.type == "1") {
        return {
          man: "保養",
          memo1: "工作項目-上午",
          memo2: "工作項目-下午"
        }
      }else{
        return {
          man: "處理",
          memo1: "無法維護項目",
          memo2: "處理情形"
        }
      }
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
          "Type",
          "HandlerID",
          "Memo1",
          "Memo2",
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
          that.inputData.editableData.HandlerID = that.inputData.editableData.HandlerID.split(",")
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
      that.inputData.editableData.HandlerID = that.inputData.editableData.HandlerID.join()
      const keyArr = Object.keys(that.inputData.editableData);
      keyArr.forEach((e) => {
        rtnObj.push({ Column: e, Value: that.inputData.editableData[e] });
      });
      encodeObject(rtnObj);
      console.log(rtnObj)
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