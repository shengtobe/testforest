<template>
  <v-card class="theme-card">
    <v-card-title class="white--text px-4 py-1">
      {{ editType }}{{ title }}
      <v-spacer />
      <v-btn dark fab small text @click="close" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <div class="px-6 py-4">
      <v-col cols="12">
        <!-- 檢查項目 -->
        <v-row no-gutter class="label-header">
          <v-col cols="12" sm="4">
            <h3 class="mb-1">機車編號</h3>
            <v-text-field solo v-model="inputData.editableData.CarNo">
              <span slot="prepend-inner">DL</span>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <h3 class="mb-1">檢查日期</h3>
            <dateSelect
              key="dateEnd"
              v-model="inputData.editableData.CheckDay"
              :showIcon="commonSettings.iconShow"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <h3 class="mb-1">氣候</h3>
            <v-text-field solo v-model="inputData.editableData.Weather"/>
          </v-col>
        </v-row>
        <v-row no-gutter class="label-header">
          <v-col cols="12" sm="4">
            <h3 class="mb-1">本日行駛</h3>
            <v-text-field solo v-model="inputData.editableData.Km">
              <span slot="append">km</span>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <h3 class="mb-1">累計公里</h3>
            <v-text-field solo v-model="inputData.editableData.TotalKm">
              <span slot="append">km</span>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <h3 class="mb-1">下次保養</h3>
            <v-text-field solo v-model="inputData.editableData.NextChkDay">
              <span slot="append">km</span>
            </v-text-field>
          </v-col>
        </v-row>
        <!-- 摺疊項目 -->
        <v-expansion-panels v-model="panel" multiple>
          <!-- (ㄧ)引擎啟動後10分鐘 -->
          <v-expansion-panel>
            <v-expansion-panel-header color="btn-expansion" class="white--text">(ㄧ)引擎啟動後10分鐘
              <template v-slot:actions>
                  <v-icon color="dropdownicon">
                    $expand
                  </v-icon>
                </template></v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutter class="label-header d-sm-flex font-weight-black">
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">引擎油壓</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption1" messages="(參考值1.5-5)">
                    <template slot="append">
                      kg/cm²
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">引擎水溫</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption2" messages="(參考值50-100℃)">
                    <span slot="append">℃</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">TC油壓</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption3" error-count=2 :messages="['(A:DBS115-2補充油壓2~4;主液壓:7~10)','(B：TDCBN-11-3500補充油壓2~6；主液壓19~22)']">
                    <template slot="append">kg/cm²</template>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- (二)發電機引擎 -->
          <v-expansion-panel>
            <v-expansion-panel-header color="btn-expansion" class="white--text">(二)發電機引擎
              <template v-slot:actions>
                  <v-icon color="dropdownicon">
                    $expand
                  </v-icon>
                </template></v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutter class="label-header d-sm-flex font-weight-black">
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">引擎油壓</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption4" messages="(參考值2.1-4.6)">
                    <template slot="append">kg/cm²</template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">引擎水溫</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption5" messages="(參考值50-100℃)">
                    <span slot="append">℃</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">引擎轉速</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption6" messages="(參考值1,800)">
                    <span slot="append">rpm</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">頻率</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption7">
                    <span slot="append">Hz</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">電流</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption8">
                    <span slot="append">A</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">電壓</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption9">
                    <span slot="append">A</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">下次保養工時</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption10">
                    <span slot="append">小時</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">累計工時</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption11">
                    <span slot="append">小時</span>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- (三)車次、區間、噸數 -->
          <v-expansion-panel>
            <v-expansion-panel-header color="btn-expansion" class="white--text">(三)車次、區間、噸數
              <template v-slot:actions>
                  <v-icon color="dropdownicon">
                    $expand
                  </v-icon>
                </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutter class="label-header d-sm-flex font-weight-black">
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">車次</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption12" />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">區間</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption13" />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">噸數</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption14" />
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- (四)出車命令 -->
          <v-expansion-panel>
            <v-expansion-panel-header color="btn-expansion" class="white--text">(四)出車命令
              <template v-slot:actions>
                  <v-icon color="dropdownicon">
                    $expand
                  </v-icon>
                </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutter class="label-header d-sm-flex font-weight-black">
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
                  <v-text-field solo v-model="inputData.editableData.CheckMan" readonly/>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- (五)機車使用中狀況 -->
          <v-expansion-panel>
            <v-expansion-panel-header color="btn-expansion" class="white--text">(五)機車使用中狀況
              <template v-slot:actions>
                  <v-icon color="dropdownicon">
                    $expand
                  </v-icon>
                </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutter class="label-header d-sm-flex font-weight-black">
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">引擎rpm</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption15">
                    <span slot="prepend-inner" class="text-no-wrap">最高</span>
                    <span slot="append">轉</span>
                  </v-text-field>
                  <v-text-field solo v-model="inputData.editableData.CheckOption16">
                    <span slot="prepend-inner" class="text-no-wrap">惰轉</span>
                    <span slot="append">轉</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">引擎油壓</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption17" messages="(參考值同上)">
                    <span slot="prepend-inner" class="text-no-wrap">最高</span>
                    <template slot="append">kg/cm²</template>
                  </v-text-field>
                  <v-text-field solo v-model="inputData.editableData.CheckOption18" messages="(參考值同上)">
                    <span slot="prepend-inner" class="text-no-wrap">最低</span>
                    <template slot="append">kg/cm²</template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">引擎水溫</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption19" messages="(參考值同上)">
                    <span slot="prepend-inner" class="text-no-wrap">最高</span>
                    <span slot="append">℃</span>
                  </v-text-field>
                  <v-text-field solo v-model="inputData.editableData.CheckOption20" messages="(參考值同上)">
                    <span slot="prepend-inner" class="text-no-wrap">最低</span>
                    <span slot="append">℃</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">TC油壓</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption21" messages="(參考值同上)">
                    <span slot="prepend-inner" class="text-no-wrap">最高</span>
                    <template slot="append">kg/cm²</template>
                  </v-text-field>
                  <v-text-field solo v-model="inputData.editableData.CheckOption22" messages="(參考值同上)">
                    <span slot="prepend-inner" class="text-no-wrap">最低</span>
                    <template slot="append">kg/cm²</template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">TC油溫</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption23" messages="(參考值80-110℃)">
                    <span slot="prepend-inner" class="text-no-wrap">最高</span>
                    <span slot="append">℃</span>
                  </v-text-field>
                  <v-text-field solo v-model="inputData.editableData.CheckOption24" messages="(參考值80-110℃)">
                    <span slot="prepend-inner" class="text-no-wrap">最低</span>
                    <span slot="append">℃</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">M.R</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption25" messages="(參考值6.5-8)">
                    <span slot="prepend-inner" class="text-no-wrap">最高</span>
                    <template slot="append">kg/cm²</template>
                  </v-text-field>
                  <v-text-field solo v-model="inputData.editableData.CheckOption26" messages="(參考值6.5-8)">
                    <span slot="prepend-inner" class="text-no-wrap">最低</span>
                    <template slot="append">kg/cm²</template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">B.P</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption27" messages="(參考值3.6-5)">
                    <span slot="prepend-inner" class="text-no-wrap">最高</span>
                    <template slot="append">kg/cm²</template>
                  </v-text-field>
                  <v-text-field solo v-model="inputData.editableData.CheckOption28" messages="(參考值3.6-5)">
                    <span slot="prepend-inner" class="text-no-wrap">最低</span>
                    <template slot="append">kg/cm²</template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">逆轉機油壓</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption29">
                    <template slot="append">kg/cm²</template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">充電</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption30">
                    <span slot="prepend-inner" class="text-no-wrap">最高</span>
                    <span slot="append">A</span>
                  </v-text-field>
                  <v-text-field solo v-model="inputData.editableData.CheckOption31">
                    <span slot="prepend-inner" class="text-no-wrap">最低</span>
                    <span slot="append">A</span>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- (六)路線 -->
          <v-expansion-panel>
            <v-expansion-panel-header color="btn-expansion" class="white--text">(六)路線
              <template v-slot:actions>
                  <v-icon color="dropdownicon">
                    $expand
                  </v-icon>
                </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutter class="label-header d-sm-flex font-weight-black">
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">路基</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption32" />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">隧道及橋樑</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption33" />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">平交道安全防護設施</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption34" />
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- (七)其他事項 -->
          <v-expansion-panel>
            <v-expansion-panel-header color="btn-expansion" class="white--text">(七)其他事項
              <template v-slot:actions>
                  <v-icon color="dropdownicon">
                    $expand
                  </v-icon>
                </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutter class="label-header d-sm-flex font-weight-black">
                <v-col cols="12">
                  <h3 class="mb-1">其他事項</h3>
                  <v-textarea solo rows="4"  v-model="inputData.editableData.CheckOption35"/>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- (八)本日用油 -->
          <v-expansion-panel>
            <v-expansion-panel-header color="btn-expansion" class="white--text">(八)本日用油
              <template v-slot:actions>
                  <v-icon color="dropdownicon">
                    $expand
                  </v-icon>
                </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutter class="label-header d-sm-flex font-weight-black">
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">柴油</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption36">
                    <span slot="append">公升</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">液體變速機</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption37">
                    <span slot="append">公升</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">機油(10#)</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption38">
                    <span slot="append">公升</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">機油(15W/40)</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption39">
                    <span slot="append">公升</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">機油(85W/90)</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption40">
                    <span slot="append">公升</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">液壓油</h3>
                  <v-text-field solo v-model="inputData.editableData.CheckOption41">
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
      CheckMan: "",
      editableData: {
        CarNo: "",
        CheckDay: "",
        Weather: "",
        Km: "",
        TotalKm: "",
        NextChkDay: "",
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
      this.chLoadingShow({show:true});
      fetchFormOrderOne({
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.userData.UserId, // 操作人id
        KeyName: this.DB_Table, // DB table
        KeyItem: [{ Column: "RPFlowNo", Value: item.RPFlowNo }],
        QyName: [
          "CheckMan",
          "DepartCode",
          "DepartName",
          "ID",
          "Name",
          "CarNo",
          "CheckDay",
          "Weather",
          "Km",
          "TotalKm",
          "NextChkDay",
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
        ],
      })
        .then((res) => {
          let dat = JSON.parse(res.data.DT);
          for (const [key, value] of Object.entries(dat[0])) {
            value = value || ""
            dat[0][`${key}`]= `${value}`;
          }
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
}
</script>