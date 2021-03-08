<template>
  <v-card>
    <!-- 標題 -->
    <v-card-title class="blue white--text px-4 py-1">
      {{ editType }}{{ commonSettings.title }}
      <v-spacer />
      <v-btn dark fab small text @click="close" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <!-- 內容 -->
    <div class="px-6 py-4">
      <v-row>
        <v-col cols="12" sm="4">
          <h3 class="mb-1">車輛編號</h3>
          <v-text-field
            v-model.trim="inputData.editableData.CarNo"
            solo
          ></v-text-field>
        </v-col>
        <!-- 保養日期 -->
        <v-col cols="12" sm="4">
          <dateSelect
            label="保養日期"
            key="CheckDay"
            :showIcon="commonSettings.iconShow"
            v-model="inputData.editableData.CheckDay"
            readonly
          />
        </v-col>
        <!-- 使用時數(hr) -->
        <v-col cols="8" sm="4">
          <h3 class="mb-1">使用時數(hr)</h3>
          <v-text-field
            v-model="inputData.editableData.UsedHour"
            :rules="nameRules"
            required
            solo
          />
        </v-col>
        <!-- 累計使用時數 -->
        <v-col cols="8" sm="4">
          <h3 class="mb-1">累計使用時數(hr)</h3>
          <v-text-field
            v-model="inputData.editableData.Hours"
            :rules="nameRules"
            required
            solo
          />
        </v-col>

        <!-- 保養人 -->
        <v-col cols="8" sm="4">
          <h3 class="mb-1">保養人</h3>
          <v-text-field v-model="inputData.editableData.Name" solo />
        </v-col>
        <!-- 車庫主管 -->
        <v-col cols="8" sm="4">
          <h3 class="mb-1">車庫主管</h3>
          <v-text-field v-model="inputData.editableData.Supervisor" solo />
        </v-col>
        <!-- 保養項目 -->
        <v-col cols="10">
          <h3 class="mb-1">保養項目</h3>
          <v-row class="ml-1" style="justify-content: left">
            <v-checkbox
              class="mr-3"
              v-model="subItems.option1"
              label="機油更換"
              value="1"
            />
            <v-checkbox
              class="mr-3"
              v-model="subItems.option2"
              label="機油濾清芯子換新"
              value="2"
            />
            <v-checkbox
              class="mr-3"
              v-model="subItems.option3"
              label="柴油濾清芯子換新"
              value="3"
            />
            <v-checkbox
              class="mr-3"
              v-model="subItems.option4"
              label="空氣濾清芯子換新"
              value="4"
            />
          </v-row>
        </v-col>
      </v-row>
      <hr />
    </div>
    <!-- 輸出/取消 -->
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
      title: "柴油液力機車發電機檢修紀錄",
      isLoading: false,
      deptReadonly: true,
    },
    nameRules: [(v) => !!v || "時數必須填寫", (v) => v > 0 || "時數必須大於0"],
    inputData: {
      RPFlowNo: "",
      DepartCode: "",
      DepartName: "",
      ID: "",
      editableData: {
        Name: "",
        CarNo: "",
        CheckDay: "",
        UsedHour: "",
        Hours: "",
        Supervisor: "",
        Item: "",
      },
    },
    subItems: { option1: "", option2: "", option3: "", option4: "" },
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
          "CarNo",
          "CheckDay",
          "Name",
          "RPFlowNo",
          "UsedHour",
          "Hours",
          "Supervisor",
          "Item",
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
          console.log(data);
          inputArr.forEach((e) => {
            var tmp = data[e];
            if (isDateObject(tmp)) {
              that.inputData.editableData[e] = tmp.substr(0, 10);
            } else {
              that.inputData.editableData[e] = tmp;
            }
          });
          // deal with item to option1~4
          if (data.Item != null) {
            var tmp = data.Item;
            tmp.split("/").forEach((e, idx) => {
              that.subItems["option" + e] = e;
            });
          }
          console.log(that.subItems);
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
      // deal with option1~4
      var items = [];
      for (let index = 1; index <= 4; index++) {
        const element = this.subItems["option" + index];
        if (element != 0) {
          items.push(element);
        }
      }
      that.inputData.editableData.Item = items.join("/");
      // --
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
