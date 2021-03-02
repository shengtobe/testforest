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
            <v-col cols="12" sm="3" md="4">
              <h3 class="mb-1">
                <v-icon class="mr-1 mb-1" v-if="commonSettings.iconShow">mdi-domain</v-icon>車庫
              </h3>
              <v-select :items="deptOptions" item-text="value" item-value="key" v-model="inputData.DepartCode" solo/>
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">檢查人員</h3>
              <v-text-field solo value v-model="inputData.Name"/>
            </v-col>
          </v-row>
          <!-- <commonQuestion :settings="setting1" v-model="inputData" key="'first'"/> -->
          <v-expansion-panels multiple>
            <v-expansion-panel v-for="(panel,pIndex) in _panelSettings" :key="'P'+pIndex">
              <v-expansion-panel-header color="teal" class="white--text">{{ panel.panelLabel }}</v-expansion-panel-header>
              <v-expansion-panel-content v-for="(area,aIndex) in panel.areas" :key="'P'+pIndex+'A'+aIndex">
                <v-col cols="12" sm="12">
                  <v-toolbar color="teal lighten-2" dark>
                    <v-spacer />
                    <v-toolbar-title>{{ area.areaLabel }}</v-toolbar-title>
                    <v-spacer />
                  </v-toolbar>
                </v-col>
                <commonQuestion :settings="area.set" v-model="inputData" :key="'P'+pIndex+'A'+aIndex+'C'"/>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
        <!-- 改善建議、改善追蹤 -->
        <v-col cols="12" sm="12" class="pt-0">
          <v-row>
            <v-col cols="12" sm="12">
              <v-toolbar color="teal lighten-2" dark>
                <v-spacer />
                <v-toolbar-title>合計</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
            </v-col>
            <v-col cols="12" sm="2" style="margin-top: -30px">
              <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                <v-col cols="12" sm="12">
                  <h3 class="mb-1">現有車輛總數</h3>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="10" style="margin-top: -30px">
              <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                <v-col cols="12" sm="2">
                  <h3 class="mb-1">使用</h3>
                </v-col>
                <v-col cols="12" sm="2">
                  <h3 class="mb-1">待用</h3>
                </v-col>
                <v-col cols="12" sm="2">
                  <h3 class="mb-1">委外修繕</h3>
                </v-col>
                <v-col cols="12" sm="2">
                  <h3 class="mb-1">待修</h3>
                </v-col>
                <v-col cols="12" sm="2">
                  <h3 class="mb-1">保養維修</h3>
                </v-col>
                <v-col cols="12" sm="2">
                  <h3 class="mb-1">停用</h3>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="2">
              <v-row >
                <v-col cols="12" sm="12">
                  <v-text-field v-model="_getAllCount.totalAmount" solo readonly></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="10">
              <v-row no-gutter >
                <v-col cols="12" sm="2">
                  <v-text-field solo v-model="_getAllCount.totalUse" readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-text-field v-model="_getAllCount.totalStandBy" solo readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-text-field v-model="_getAllCount.totalRepair" solo readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-text-field v-model="_getAllCount.totalWait" solo readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-text-field v-model="_getAllCount.totalMaintain" solo readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-text-field v-model="_getAllCount.totalDeactivate" solo readonly></v-text-field>
                </v-col>
              </v-row>
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
    headers: [
      { width: 1, text:"車種別" },
      { width: 2, text:"現有車輛總數(輛)", model: "AmountTrain" },
      { width: 1, text:"使用", model: "Use" },
      { width: 1, text:"待用", model: "StandBy" },
      { width: 1, text:"委外修繕", model: "Repair" },
      { width: 1, text:"待修", model: "Wait" },
      { width: 1, text:"保養維修", model: "Maintain" },
      { width: 1, text:"停用", model: "Deactivate" },
      { width: 3, text:"備註", model: "Memo" },
    ],
    settings: [
      { 
        rows: [
          { label: "總數", type: "text" },
        ]
      },
      { 
        rows: [
          { label: "使用", type: "text" }
        ]
      },
      { 
        rows: [
          { label: "待用", type: "text" }
        ]
      },
      { 
        rows: [
          { label: "委外修繕", type: "text" }
        ]
      },
      { 
        rows: [
          { label: "待修", type: "text" }
        ]
      },
      { 
        rows: [
          { label: "保養維修", type: "text" }
        ]
      },
      { 
        rows: [
          { label: "停用", type: "text" }
        ]
      },
      { 
        rows: [
          { label: "備註", type: "area", placeholder: "請輸入備註" }
        ]
      }
    ],
    panels:[
      {
        panelLabel: "客車",
        areas: [
          {
            areaLabel: "K閥",
            trains:["阿里山號","電源客車"]
          },
          {
            areaLabel: "EA閥連控",
            trains:["商務客車","阿里山號","中興號","檜木客車","祝客客車"]
          }
        ]
      },
      {
        panelLabel: "貨車",
        areas: [
          {
            areaLabel: "K閥",
            trains:["平守車","平甲車","蓬甲車","搶修車","砂石敞車","油罐車","高甲車"]
          },
        ]
      },
      {
        panelLabel: "展示車",
        areas: [
          {
            areaLabel: "K閥",
            trains:["普通客車","普通客車"]
          },
        ]
      }
    ],
    inputData: {
      RPFlowNo: "",
      DepartCode: "",
      DepartName: "",
      ID: "",
      Name: "",
      editableData: {
        CheckDay: "",
        AmountTrain1: "",
        Use1: "",
        StandBy1: "",
        Repair1: "",
        Wait1: "",
        Maintain1: "",
        Deactivate1: "",
        Memo1: "",
        AmountTrain2: "",
        Use2: "",
        StandBy2: "",
        Repair2: "",
        Wait2: "",
        Maintain2: "",
        Deactivate2: "",
        Memo2: "",
        AmountTrain3: "",
        Use3: "",
        StandBy3: "",
        Repair3: "",
        Wait3: "",
        Maintain3: "",
        Deactivate3: "",
        Memo3: "",
        AmountTrain4: "",
        Use4: "",
        StandBy4: "",
        Repair4: "",
        Wait4: "",
        Maintain4: "",
        Deactivate4: "",
        Memo4: "",
        AmountTrain5: "",
        Use5: "",
        StandBy5: "",
        Repair5: "",
        Wait5: "",
        Maintain5: "",
        Deactivate5: "",
        Memo5: "",
        AmountTrain6: "",
        Use6: "",
        StandBy6: "",
        Repair6: "",
        Wait6: "",
        Maintain6: "",
        Deactivate6: "",
        Memo6: "",
        AmountTrain7: "",
        Use7: "",
        StandBy7: "",
        Repair7: "",
        Wait7: "",
        Maintain7: "",
        Deactivate7: "",
        Memo7: "",
        AmountTrain8: "",
        Use8: "",
        StandBy8: "",
        Repair8: "",
        Wait8: "",
        Maintain8: "",
        Deactivate8: "",
        Memo8: "",
        AmountTrain9: "",
        Use9: "",
        StandBy9: "",
        Repair9: "",
        Wait9: "",
        Maintain9: "",
        Deactivate9: "",
        Memo9: "",
        AmountTrain10: "",
        Use10: "",
        StandBy10: "",
        Repair10: "",
        Wait10: "",
        Maintain10: "",
        Deactivate10: "",
        Memo10: "",
        AmountTrain11: "",
        Use11: "",
        StandBy11: "",
        Repair11: "",
        Wait11: "",
        Maintain11: "",
        Deactivate11: "",
        Memo11: "",
        AmountTrain12: "",
        Use12: "",
        StandBy12: "",
        Repair12: "",
        Wait12: "",
        Maintain12: "",
        Deactivate12: "",
        Memo12: "",
        AmountTrain13: "",
        Use13: "",
        StandBy13: "",
        Repair13: "",
        Wait13: "",
        Maintain13: "",
        Deactivate13: "",
        Memo13: "",
        AmountTrain14: "",
        Use14: "",
        StandBy14: "",
        Repair14: "",
        Wait14: "",
        Maintain14: "",
        Deactivate14: "",
        Memo14: "",
        AmountTrain15: "",
        Use15: "",
        StandBy15: "",
        Repair15: "",
        Wait15: "",
        Maintain15: "",
        Deactivate15: "",
        Memo15: "",
        AmountTrain16: "",
        Use16: "",
        StandBy16: "",
        Repair16: "",
        Wait16: "",
        Maintain16: "",
        Deactivate16: "",
        Memo16: "",
        AmountTrain17: "",
        Use17: "",
        StandBy17: "",
        Repair17: "",
        Wait17: "",
        Maintain17: "",
        Deactivate17: "",
        Memo17: "",
        AmountTrain18: "",
        Use18: "",
        StandBy18: "",
        Repair18: "",
        Wait18: "",
        Maintain18: "",
        Deactivate18: "",
        Memo18        : "",
      },
    },
  }),
  components: {
    commonQuestion,
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
    _panelSettings: function() {
      const that =this
      let rtnObj = []
      let count = 1
      rtnObj = [...that.panels]
      rtnObj.forEach(element=>{
        element.areas.forEach(ele=>{
          ele.set = {
            headers: that.headers,
            alerts: ele.trains.map(e=>{
              let rObj={}
              rObj={
                startAt: count,
                columns: [
                  {
                    rows: [
                      { label: e,type: "label"}
                    ]
                  },
                  ...that.settings
                ]
              }
              count++
              return rObj
            })
          }
        })
      })
      return rtnObj
    },
    _getAllCount: function() {
      let rtnObj={}
      const keys = Object.keys(this.inputData.editableData)
      rtnObj.totalAmount = 0
      keys.filter(element=>element.indexOf('AmountTrain')!=-1).forEach(element=>{
        rtnObj.totalAmount += parseInt(this.inputData.editableData[element] || 0)
      })
      rtnObj.totalUse = 0
      keys.filter(element=>element.indexOf('Use')!=-1).forEach(element=>{
        rtnObj.totalUse += parseInt(this.inputData.editableData[element] || 0)
      })
      rtnObj.totalStandBy = 0
      keys.filter(element=>element.indexOf('StandBy')!=-1).forEach(element=>{
        rtnObj.totalStandBy += parseInt(this.inputData.editableData[element] || 0)
      })
      rtnObj.totalRepair = 0
      keys.filter(element=>element.indexOf('Repair')!=-1).forEach(element=>{
        rtnObj.totalRepair += parseInt(this.inputData.editableData[element] || 0)
      })
      rtnObj.totalWait = 0
      keys.filter(element=>element.indexOf('Wait')!=-1).forEach(element=>{
        rtnObj.totalWait += parseInt(this.inputData.editableData[element] || 0)
      })
      rtnObj.totalMaintain = 0
      keys.filter(element=>element.indexOf('Maintain')!=-1).forEach(element=>{
        rtnObj.totalMaintain += parseInt(this.inputData.editableData[element] || 0)
      })
      rtnObj.totalDeactivate = 0
      keys.filter(element=>element.indexOf('Deactivate')!=-1).forEach(element=>{
        rtnObj.totalDeactivate += parseInt(this.inputData.editableData[element] || 0)
      })
      return rtnObj
    }
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
          "AmountTrain1",
          "Use1",
          "StandBy1",
          "Repair1",
          "Wait1",
          "Maintain1",
          "Deactivate1",
          "Memo1",
          "AmountTrain2",
          "Use2",
          "StandBy2",
          "Repair2",
          "Wait2",
          "Maintain2",
          "Deactivate2",
          "Memo2",
          "AmountTrain3",
          "Use3",
          "StandBy3",
          "Repair3",
          "Wait3",
          "Maintain3",
          "Deactivate3",
          "Memo3",
          "AmountTrain4",
          "Use4",
          "StandBy4",
          "Repair4",
          "Wait4",
          "Maintain4",
          "Deactivate4",
          "Memo4",
          "AmountTrain5",
          "Use5",
          "StandBy5",
          "Repair5",
          "Wait5",
          "Maintain5",
          "Deactivate5",
          "Memo5",
          "AmountTrain6",
          "Use6",
          "StandBy6",
          "Repair6",
          "Wait6",
          "Maintain6",
          "Deactivate6",
          "Memo6",
          "AmountTrain7",
          "Use7",
          "StandBy7",
          "Repair7",
          "Wait7",
          "Maintain7",
          "Deactivate7",
          "Memo7",
          "AmountTrain8",
          "Use8",
          "StandBy8",
          "Repair8",
          "Wait8",
          "Maintain8",
          "Deactivate8",
          "Memo8",
          "AmountTrain9",
          "Use9",
          "StandBy9",
          "Repair9",
          "Wait9",
          "Maintain9",
          "Deactivate9",
          "Memo9",
          "AmountTrain10",
          "Use10",
          "StandBy10",
          "Repair10",
          "Wait10",
          "Maintain10",
          "Deactivate10",
          "Memo10",
          "AmountTrain11",
          "Use11",
          "StandBy11",
          "Repair11",
          "Wait11",
          "Maintain11",
          "Deactivate11",
          "Memo11",
          "AmountTrain12",
          "Use12",
          "StandBy12",
          "Repair12",
          "Wait12",
          "Maintain12",
          "Deactivate12",
          "Memo12",
          "AmountTrain13",
          "Use13",
          "StandBy13",
          "Repair13",
          "Wait13",
          "Maintain13",
          "Deactivate13",
          "Memo13",
          "AmountTrain14",
          "Use14",
          "StandBy14",
          "Repair14",
          "Wait14",
          "Maintain14",
          "Deactivate14",
          "Memo14",
          "AmountTrain15",
          "Use15",
          "StandBy15",
          "Repair15",
          "Wait15",
          "Maintain15",
          "Deactivate15",
          "Memo15",
          "AmountTrain16",
          "Use16",
          "StandBy16",
          "Repair16",
          "Wait16",
          "Maintain16",
          "Deactivate16",
          "Memo16",
          "AmountTrain17",
          "Use17",
          "StandBy17",
          "Repair17",
          "Wait17",
          "Maintain17",
          "Deactivate17",
          "Memo17",
          "AmountTrain18",
          "Use18",
          "StandBy18",
          "Repair18",
          "Wait18",
          "Maintain18",
          "Deactivate18",
          "Memo18",
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
}
</script>