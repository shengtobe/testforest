<template>
  <v-card class="theme-card">
    <v-card-title class=" white--text px-4 py-1">
      {{ editType }}{{ commonSettings.title }}
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
            <v-col cols="12" sm="3" md="3">
              <dateSelect
                label="檢查日期"
                key="checkDate"
                :showIcon="commonSettings.iconShow"
                v-model="inputData.editableData.CheckDay"
              />
            </v-col>
            <v-col cols="12" sm="3" md="3">
              <h3 class="mb-1">檢查人員</h3>
              <v-text-field
                solo
                v-model="inputData.Name"
                :readonly="commonSettings.deptReadonly"
              />
            </v-col>
            <v-col cols="12" sm="5" md="5">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-file</v-icon>車輛型號
          </h3>
          <v-text-field solo @click="eqCode=true" v-model="eqName" readonly clearable  @click:clear="eqClear"/>
          <v-dialog v-model="eqCode" max-width="700px">
            <v-card class="theme-card">
              <v-card-title class="px-4 py-1">
                車輛型號
                <v-spacer></v-spacer>
                <v-btn fab small text @click="eqCode = false" class="mr-n2">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <div class="px-4 py-3">
                <EquipCode :key="'eqcKey' + eqcKey" :nowEqCode="com_equipCode" ref="ref1" :toLv="2" :disableToLv="1" :needIcon="false" :noLabel="true" @getEqCode="getRtnCode" @getEqName="getRtnName" />
              </div>
              <v-card-actions class="px-5 pb-5">
                <v-spacer></v-spacer>
                <v-btn class="mr-2 btn-close" dark elevation="4"  :loading="commonSettings.isLoading" @click="eqCode = false">取消</v-btn>
                <v-btn class="btn-add" dark elevation="4"  :loading="commonSettings.isLoading" @click="selectEQ">確認</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
          </v-row>
          <v-row
            no-gutter
            class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
          >
            <v-col cols="12" sm="2">
              <h3 class="mb-1">輪位</h3>
            </v-col>
            <v-col cols="12" sm="2">
              <h3 class="mb-1">輪緣厚度 > 24(mm)</h3>
            </v-col>
            <v-col cols="12" sm="2">
              <h3 class="mb-1">輪緣高度 < 30(mm)</h3>
            </v-col>
            <v-col cols="12" sm="2">
              <h3 class="mb-1">輪緣角點 > 3(mm)</h3>
            </v-col>
            <v-col cols="12" sm="2">
              <h3 class="mb-1">合格</h3>
            </v-col>
            <v-col cols="12" sm="2">
              <h3 class="mb-1">備註</h3>
            </v-col>
          </v-row>
          <v-alert
            dense
            border="top"
            colored-border
            color="teal"
            elevation="4"
            v-for="(item, idx) in items"
            :key="idx"
            class="mb-6"
          >
            <v-row no-gutter class="indigo--text">
              <v-col cols="12" sm="2">
                {{ item.description }}
              </v-col>
              <v-col cols="12" sm="2" class="indigo--text">
                <v-text-field
                  solo :rules="nameRules"
                  placeholder="0"
                  v-model="
                    inputData.editableData[
                      settings.columns.thickness + (idx + 1)
                    ]
                  "
                />
              </v-col>
              <v-col cols="12" sm="2" class="indigo--text">
                <v-text-field
                  solo
                  placeholder="0"
                  v-model="
                    inputData.editableData[settings.columns.height + (idx + 1)]
                  "
                />
              </v-col>
              <v-col cols="12" sm="2" class="indigo--text">
                <v-text-field
                  solo
                  placeholder="0"
                  v-model="
                    inputData.editableData[settings.columns.corner + (idx + 1)]
                  "
                />
              </v-col>
              <v-col cols="12" sm="2">
                <v-radio-group
                  dense
                  row
                  class="pa-0 ma-0"
                  v-model="
                    inputData.editableData[settings.columns.result + (idx + 1)]
                  "
                >
                  <v-radio color="success" label="合格" value="1"></v-radio>
                  <v-radio color="red" label="不合格" value="2"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" sm="2" class="indigo--text">
                <v-textarea
                  auto-grow
                  outlined
                  rows="2"
                  v-model="
                    inputData.editableData[settings.columns.memo + (idx + 1)]
                  "
                />
              </v-col>
            </v-row>
          </v-alert>
        </v-col>
      </v-row>
    </div>

    <v-card-actions class="px-5 pb-5">
      <v-btn
        v-if="editType != actions.add"
        elevation="4"
        color="red"
        class="btn-delete mr-2 white--text"
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
import {
  fetchFormOrderOne,
  createFormOrder0,
  updateFormOrder,
} from "@/apis/formManage/serve";
import EquipCode from '@/components/EquipRepairCode'
import dateSelect from "@/components/forManage/dateSelect";
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
      //
      nameRules: [(v) => !!v || "時數必須填寫", (v) => v > 0 || "時數必須大於0"],
      eqcKey: 0,
      eqCode: false,
      eqName: '',
      preSetEqcode: '',
      preSerEqName: '',
      //
      actions: Actions,
      commonSettings: {
        iconShow: false,
        title: "車輪輪緣高度、厚度檢查紀錄表",
        isLoading: false,
        deptReadonly: true,
      },
      items: [
        { description: "車輪一" },
        { description: "車輪二" },
        { description: "車輪三" },
        { description: "車輪四" },
        { description: "車輪五" },
        { description: "車輪六" },
        { description: "車輪七" },
        { description: "車輪八" },
      ],
      settings: {
        columns: {
          thickness: "CheckThickness_",
          height: "CheckHeight_",
          corner: "CheckCorner_",
          result: "Result_",
          memo: "Memo_",
        },
        width: {
          qusetion: 4,
          method: 3,
          option: 2,
          memo: 3,
        },
      },
      inputData: {
        RPFlowNo: "",
        DepartCode: "",
        DepartName: "",
        ID: "",
        Name: "",
        editableData: {
          MaintainCode_System: 'RST',
          MaintainCode_Loc: '',
          CheckDay: "",
          CheckThickness_1: "",
          CheckHeight_1: "",
          CheckCorner_1: "",
          Result_1: "",
          Memo_1: "",
          CheckThickness_2: "",
          CheckHeight_2: "",
          CheckCorner_2: "",
          Result_2: "",
          Memo_2: "",
          CheckThickness_3: "",
          CheckHeight_3: "",
          CheckCorner_3: "",
          Result_3: "",
          Memo_3: "",
          CheckThickness_4: "",
          CheckHeight_4: "",
          CheckCorner_4: "",
          Result_4: "",
          Memo_4: "",
          CheckThickness_5: "",
          CheckHeight_5: "",
          CheckCorner_5: "",
          Result_5: "",
          Memo_5: "",
          CheckThickness_6: "",
          CheckHeight_6: "",
          CheckCorner_6: "",
          Result_6: "",
          Memo_6: "",
          CheckThickness_7: "",
          CheckHeight_7: "",
          CheckCorner_7: "",
          Result_7: "",
          Memo_7: "",
          CheckThickness_8: "",
          CheckHeight_8: "",
          CheckCorner_8: "",
          Result_8: "",
          Memo_8: "",
        },
      },
    };
  },
  components: {
    dateSelect,
    EquipCode
  },
  mounted() {
    window.scrollTo(0, 0);
    this.editType == this.actions.edit
      ? this.viewPage(this.item)
      : this.newPage();
  },
  computed: {
    ...mapState("user", {
      userData: (state) => state.userData, // 使用者基本資料
    }),
    com_equipCode: {
      get: function() {
        return this.inputData.editableData.MaintainCode_System + (this.inputData.editableData.MaintainCode_Loc==''?'':'-' + this.inputData.editableData.MaintainCode_Loc)
      },
      set: function(value) {
        if(value == ""){
          this.inputData.editableData.MaintainCode_System = 'RST';
          this.inputData.editableData.MaintainCode_Loc = this.preSetEqcode = this.preSerEqName = ""
          this.eqcKey++
        }
        else{
          let splitArr = value.split('-')
          this.inputData.editableData.MaintainCode_System = splitArr[0]
          this.inputData.editableData.MaintainCode_Loc = splitArr[1]
        }
      }
    },
  },
  methods: {
    ...mapActions("system", [
      "chMsgbar", // messageBar
      "chLoadingShow", // 切換 loading 圖顯示
    ]),
    //機車回傳
    getRtnCode(code) {
      this.preSetEqcode = code
    },
    //機車回傳中文
    getRtnName(cName) {
      this.preSerEqName = cName.replace('車輛(RST)-','')
    },
    //機車送出按鈕
    selectEQ() {
      this.com_equipCode = this.preSetEqcode
      this.eqName = this.preSerEqName
      this.eqCode = false
    },
    eqClear(){
      this.com_equipCode = ""
    },
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
          "CarNo",
          "MaintainCode_System",
          "MaintainCode_Loc",
          "CheckThickness_1",
          "CheckHeight_1",
          "CheckCorner_1",
          "Result_1",
          "Memo_1",
          "CheckThickness_2",
          "CheckHeight_2",
          "CheckCorner_2",
          "Result_2",
          "Memo_2",
          "CheckThickness_3",
          "CheckHeight_3",
          "CheckCorner_3",
          "Result_3",
          "Memo_3",
          "CheckThickness_4",
          "CheckHeight_4",
          "CheckCorner_4",
          "Result_4",
          "Memo_4",
          "CheckThickness_5",
          "CheckHeight_5",
          "CheckCorner_5",
          "Result_5",
          "Memo_5",
          "CheckThickness_6",
          "CheckHeight_6",
          "CheckCorner_6",
          "Result_6",
          "Memo_6",
          "CheckThickness_7",
          "CheckHeight_7",
          "CheckCorner_7",
          "Result_7",
          "Memo_7",
          "CheckThickness_8",
          "CheckHeight_8",
          "CheckCorner_8",
          "Result_8",
          "Memo_8",
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
          this.eqName = dat[0].CarNo
        })
        .catch((err) => {
          ////console.log(err);
          this.chMsgbar({ success: false, msg: Constrant.query.failed });
        })
        .finally(() => {
          this.chLoadingShow({ show: false});
        });
    },
    // 關閉 dialog
    close() {
      this.$emit("close");
      this.$emit("search");
    },
    save() {
      this.chLoadingShow({ show: true});
      const that = this;
      let rtnObj = [];
      const keyArr = Object.keys(that.inputData.editableData);
      rtnObj.push({ Column: "CarNo", Value: that.eqName });
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
            ////console.log(err);
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
};
</script>
