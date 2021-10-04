<template>
  <v-card class="theme-card">
    <v-card-title class="white--text px-4 py-1">
      {{ editType }}{{ this.title }}
      <v-spacer></v-spacer>
      <v-btn dark fab small text @click="close" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <div class="px-6 py-4">
      <v-row>
        <v-col cols="12">
          <div v-for="(subtitle, index) in subtitles" :key="index">
            <p>
              {{ subtitle }}
            </p>
          </div>
        </v-col>
        <!-- 檢查項目 -->
        <v-col cols="12">
          <v-row no-gutter class="label-header">
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
          <v-row no-gutter class="label-header">
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
                <v-expansion-panel-header color="teal" class="white--text">
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
                    class="label-header darken-2 d-none d-sm-flex font-weight-black"
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
    subtitles: Array,
    title: String,
    item: Object,
    editType: String,
    DB_Table: String,
    inputData: Object,
    itemsList: Array,
    QyName: Array,
  },
  data: () => ({
    actions: Actions,
    commonSettings: {
      iconShow: true,
      isLoading: false,
      deptReadonly: true,
    },

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
     
     
      this.chLoadingShow({show:true});
      fetchFormOrderOne({
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.userData.UserId, // 操作人id
        KeyName: this.DB_Table, // DB table
        KeyItem: [{ Column: "RPFlowNo", Value: item.RPFlowNo }],
        QyName: this.QyName,
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
  filters: {},
  watch: {},
};
</script>