<template>
  <v-card class="theme-card">
    <v-card-title class="white--text px-4 py-1">
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
          <v-row no-gutter class="label-header">
            <v-col cols="12" sm="4">
              <dateSelect
                label="檢查日期"
                key="checkDate"
                :showIcon="commonSettings.iconShow"
                v-model="inputData.editableData.CheckDay"
              />
            </v-col>
            <v-col cols="12" sm="3" md="4">
              <h3 class="mb-1">車庫</h3>
              <v-select :items="deptOptions" item-text="value" item-value="key" v-model="inputData.DepartCode" solo/>
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">檢查人員</h3>
              <v-text-field solo value v-model="inputData.Name"/>
            </v-col>
          </v-row>
          <v-row no-gutter class="label-header">
            <v-col cols="12" sm="4">
              <h3 class="mb-1">車種</h3>
              <v-select :items="selectItems.Type" item-text="value" item-value="key" v-model="inputData.editableData.Type" solo/>
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">車別</h3>
              <v-select :items="selectItems.Category[inputData.editableData.Type]" item-text="value" item-value="key" v-model="inputData.editableData.Category" solo/>
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">號碼</h3>
              <v-text-field solo value v-model="inputData.editableData.CarNo"/>
            </v-col>
            <v-col cols="12" sm="6">
                <v-col cols="12" class="ma-0 pa-0">
                  <h3 class="mb-1">狀態</h3>
                  <v-radio-group
                    dense
                    hide-details
                    solo
                    row
                    class="pa-0 ma-0"
                    v-model="inputData.editableData.Status"
                    >
                    <v-radio color="green" label="使用" value="0" />
                    <v-radio color="green" label="待用" value="1" />
                    <v-radio color="orange" label="待修" value="2" />
                    <v-radio color="red" label="進廠" value="3" />
                    <v-radio color="red" label="停用" value="4" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" class="ma-0 pa-0" v-if="inputData.editableData.Status=='0'">
                  <h3 class="mb-1">使用車次</h3>
                  <v-text-field solo value v-model="inputData.editableData.UsingCarNo"/>
                </v-col>
            </v-col>
            <v-col cols="12" sm="6">
              <h3 class="mb-1">說明</h3>
              <v-textarea 
                  auto-grow 
                  solo 
                  hide-details 
                  rows="1" 
                  v-model="inputData.editableData.Memo"
                  >
                </v-textarea>
            </v-col>
          </v-row>
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
    inputData: {
      RPFlowNo: "",
      DepartCode: "",
      DepartName: "",
      ID: "",
      Name: "",
      editableData: {
        CheckDay: "",
        Type: "",
        Category: "",
        CarNo: "",
        UsingCarNo: "",
        Status: "",
        Memo: "",
      },
    },
    selectItems: {
      Type: ["柴油機車","蒸汽機車"],
      Category: {
        "柴油機車":["DL25噸","DL28噸","DL29噸","DPC"],
        "蒸汽機車":["蒸汽機車"]
      }
    }
  }),
  components: {
    dateSelect
  },
  mounted() {
    this.editType == this.actions.edit
      ? this.viewPage(this.item)
      : this.newPage();
    this._getOrg()
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
    //抓單位清單
    _getOrg(){
      const that = this
      that.isLoading = true
      fetchOrganization({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res => {
        if (res.data.ErrorCode == 0) {
          this.deptOptions = res.data.user_depart_list_group_2.filter(element=>element.DepartParentName=="車輛養護科").map(element=>({key:element.DepartCode,value:element.DepartName}))
        }else {
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          that.$router.push({ path: '/error' })
        }
      }).catch( err => {
        this.chMsgbar({ success: false, msg: '伺服器發生問題，單位查詢失敗' })
      }).finally(() => {
          that.deptOptions = decodeObject(that.deptOptions)
          that.isLoading = false
      })
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
          "Type",
          "Category",
          "CarNo",
          "UsingCarNo",
          "Status",
          "Memo",
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
      that.inputData.editableData.UsingCarNo = (that.inputData.editableData.Status=="0")? that.inputData.editableData.UsingCarNo: ""
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
}
</script>