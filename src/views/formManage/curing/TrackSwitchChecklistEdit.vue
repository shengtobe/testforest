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
        <v-col cols="12">
          <p>1.依檢查結果選擇合格、尚可或待改進。</p>
        </v-col>
        <!-- 檢查項目 -->
        <v-col cols="12">
          <v-row no-gutter class="label-header">
            <v-col cols="12" sm="4">
              <dateSelect
                label="檢查日期"
                key="CheckDay"
                :showIcon="commonSettings.iconShow"
                v-model="inputData.editableData.CheckDay"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">管理單位</h3>
              <v-text-field
                solo
                value
                readonly
                v-model="inputData.DepartName"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">檢查人員</h3>
              <v-text-field solo v-model="inputData.Name" />
            </v-col>
          </v-row>
          <v-img src="../../../../public/demofile/dmeo.png" />

          <div v-for="(question, index) in questions" :key="index">
            <v-row
              class="label-header darken-2 d-none d-sm-flex font-weight-black"
              v-if="index % 3 == 0"
            >
              <v-col><h3 class="mb-1">岔道編號</h3></v-col>
              <v-col><h3 class="mb-1">1. 轉轍器基座清潔潤滑</h3></v-col>
              <v-col><h3 class="mb-1">2. 轉轍器連桿滑動部位清潔潤滑</h3></v-col>
              <v-col><h3 class="mb-1">3. 滑板表面清潔潤滑</h3></v-col>
              <v-col><h3 class="mb-1">4. 檢查岔道針是否密合</h3></v-col>
            </v-row>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6"
              :key="index"
            >
              <v-row>
                  <!-- <v-text-field solo v-model="inputData.editableData.SwitchNo"  -->
                <v-col>
                  <v-text-field
                    label="岔道編號" class="centered-input "
                    outlined v-model="inputData.editableData.SwitchNo"
                  ></v-text-field>
                </v-col>
                <v-col
                  v-for="(item, index2) in ddf"
                  :key="index + '_' + index2"
                >
                  <v-radio-group
                    dense
                    row
                    class="pa-0 ma-0"
                    v-model="
                      inputData.editableData[
                        settings.columns.option +
                          (index + 1) +
                          '_' +
                          (index2 + 1)
                      ]
                    "
                    :key="index + '_' + index2"
                  >
                    <v-radio
                      color="success"
                      label="合格"
                      value="1"
                      @click="output(index, index2)"
                    />
                    <v-radio color="red" label="尚可" value="2" />
                    <v-radio color="black" label="待改進" value="3" />
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-alert>
          </div>
        </v-col>
        <!-- END 檢查項目 -->
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
        title: "轉轍器檢查保養紀錄表",
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
          SwitchNo: "",
          CheckOption1_1: "",
          CheckOption1_2: "",
          CheckOption1_3: "",
          CheckOption1_4: "",
        },
      },
      settings: {
        columns: {
          option: "CheckOption",
        },
      },

      ddf: [
        {
          b1: "1. 轉轍器基座清潔潤滑",
        },
        {
          b1: "2. 轉轍器連桿滑動部位清潔潤滑",
        },
        {
          b1: "3. 滑板表面清潔潤滑",
        },
        {
          b1: "4. 檢查岔道針是否密合",
        },
      ],
      

      questions: [
        { description: "岔道編號：1" },
      ],

      itemNumbers: [1],
    };
  },
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
          "SwitchNo",
          "CheckOption1_1",
          "CheckOption1_2",
          "CheckOption1_3",
          "CheckOption1_4",
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
      if(!this.inputData.editableData.SwitchNo || isNaN(this.inputData.editableData.SwitchNo)){
        alert("請輸入正確的岔道編號")
        return
      }
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
    output(index, index2) {
    },
  },
  filters: {},
  watch: {},
};
</script>
<style scoped>
    .centered-input >>> input {
      text-align: center;
      font-size: 1.2em;
    }
</style>