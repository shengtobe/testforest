<template>
  <v-card class="theme-card">
    <v-card-title class="white--text px-4 py-1">
      {{ editType }}{{ commonSettings.title }}
      <v-spacer></v-spacer>
      <v-btn dark fab small text @click="close" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <div class="px-6 py-4 label-header">
      <v-row>
        <!-- 檢修日期 -->
        <v-col cols="12" sm="4">
          <dateSelect
            label="建立日期"
            key="CheckDay"
            :showIcon="commonSettings.iconShow"
            v-model="inputData.editableData.CheckDay"
            readonly
          />
        </v-col>

        <!-- 填寫人 -->
        <v-col cols="8" sm="4">
          <h3 class="mb-1">填寫人</h3>
          <v-text-field v-model="inputData.Name" solo readonly />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4" md="3">
          <h3 class="mb-1">車號</h3>
          <v-text-field
            v-model.trim="inputData.editableData.CarNo"
            solo
          ></v-text-field>
        </v-col>
        <v-col>
          <h3 class="mb-1">廠牌</h3>
          <v-text-field
            v-model.trim="inputData.editableData.Brand"
            solo
          ></v-text-field>
        </v-col>
        <v-col>
          <h3 class="mb-1">空調機編號</h3>
          <v-text-field
            v-model.trim="inputData.editableData.AirCond"
            solo
          ></v-text-field>
        </v-col>
        <v-col>
          <h3 class="mb-1">車輪直徑</h3>
          <v-text-field
            v-model.trim="inputData.editableData.WheelDiam"
            solo
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h3 class="mb-1">型式</h3>
          <v-text-field
            v-model.trim="inputData.editableData.Type"
            solo
          ></v-text-field>
        </v-col>
        <v-col>
          <h3 class="mb-1">年份</h3>
          <v-text-field
            v-model.trim="inputData.editableData.Year"
            solo
          ></v-text-field>
        </v-col>
        <v-col>
          <h3 class="mb-1">客室設備</h3>
          <v-text-field
            v-model.trim="inputData.editableData.GuestEqip"
            solo
          ></v-text-field>
        </v-col>
        <v-col>
          <h3 class="mb-1">轉向架中心距離</h3>
          <v-text-field
            v-model.trim="inputData.editableData.DistBogie"
            solo
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4" md="3">
          <h3 class="mb-1">皮重</h3>
          <v-text-field
            v-model.trim="inputData.editableData.Tare"
            solo
          ></v-text-field>
        </v-col>
        <v-col>
          <h3 class="mb-1">電源</h3>
          <v-text-field
            v-model.trim="inputData.editableData.PowerType"
            solo
          ></v-text-field>
        </v-col>
        <v-col>
          <h3 class="mb-1">窗</h3>
          <v-text-field
            v-model.trim="inputData.editableData.Window"
            solo
          ></v-text-field>
        </v-col>
        <v-col>
          <h3 class="mb-1">軸距</h3>
          <v-text-field
            v-model.trim="inputData.editableData.Wheelbase"
            solo
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4" md="3">
          <h3 class="mb-1">載重</h3>
          <v-text-field
            v-model.trim="inputData.editableData.Load"
            solo
          ></v-text-field>
        </v-col>
        <v-col>
          <h3 class="mb-1">電瓶規格</h3>
          <v-text-field
            v-model.trim="inputData.editableData.Battery"
            solo
          ></v-text-field>
        </v-col>
        <v-col>
          <h3 class="mb-1">門</h3>
          <v-text-field
            v-model.trim="inputData.editableData.Door"
            solo
          ></v-text-field>
        </v-col>
        <v-col>
          <h3 class="mb-1">連結器中心高度</h3>
          <v-text-field
            v-model.trim="inputData.editableData.LinkerHeight"
            solo
          ></v-text-field>
        </v-col>
      </v-row>
      <!-- </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col> -->
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
      title: "動力車資料",
      isLoading: false,
      deptReadonly: true,
    },
    // TODO: 應避免寫死在程式裡
    carHeadCodes: [
      { text: "SL", value: "sl" },
      { text: "DL", value: "dl" },
    ],
    inputData: {
      RPFlowNo: "",
      DepartCode: "",
      DepartName: "",
      ID: "",
      Name: "",
      editableData: {
        CheckDay: "",
        DelStatus: "",
        CarNo: "",
        Type: "",
        Tare: "",
        Load: "",
        Brand: "",
        Year: "",
        PowerType: "",
        Battery: "",
        AirCond: "",
        GuestEqip: "",
        Window: "",
        Door: "",
        WheelDiam: "",
        DistBogie: "",
        Wheelbase: "",
        LinkerHeight: "",
      },
    },
  }),
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
          "FlowId",
          "CheckDay",
          "DelStatus",
          "Name",
          "RPFlowNo",
          "CarNo",
          "Type",
          "Tare",
          "Load",
          "Brand",
          "Year",
          "PowerType",
          "Battery",
          "AirCond",
          "GuestEqip",
          "Window",
          "Door",
          "WheelDiam",
          "DistBogie",
          "Wheelbase",
          "LinkerHeight",
        ],
      })
        .then((res) => {
          console.log(res.data.DT);
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
