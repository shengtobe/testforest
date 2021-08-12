<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2 label-title">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2 label-header">
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="檢查日期(起)"
          v-model="input.dateStart"
          key="dateStart"
          :showIcon="formIconShow"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="檢查日期(迄)"
          v-model="input.dateEnd"
          key="dateStart"
          :showIcon="formIconShow"
        />
      </v-col>

      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn dark large class="mb-sm-8 mb-md-8 btn-search">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn
          elevation="3"
          dark
          large
          class="ml-4 ml-sm-4 ml-md-4 mb-sm-8 mb-md-8 btn-add"
          @click="newOne"
        >
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </v-col>
    </v-row>
    <!-- 表格資料 -->
    <v-col cols="12">
      <v-card>
        <v-data-table
          :headers="headers"
          :items="tableItems"
          :options.sync="pageOpt"
          disable-sort
          disable-filtering
          hide-default-footer
          class="theme-table"
        >
          <template v-slot:no-data>
            <span class="red--text subtitle-1">沒有資料</span>
          </template>

          <template v-slot:loading>
            <span class="red--text subtitle-1">資料讀取中...</span>
          </template>

          <!-- headers 的 content 欄位 (檢視內容) -->
          <template v-slot:item.content="{ item }">
            <v-btn
              title="詳細資料"
              class="mr-2 btn-memo"
              small
              dark
              fab
              @click="viewPage(item)"
            >
              <v-icon dark>mdi-magnify</v-icon>
            </v-btn>
          </template>

          <!-- 頁碼 -->
          <template v-slot:footer="footer">
            <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <!-- 新增自動檢點表 modal -->
    <v-dialog v-model="Add" persistent max-width="800px">
      <v-card class="theme-card">
        <v-card-title class="white--text px-4 py-1">
          新增{{ title }}
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
                <v-col cols="12" sm="3">
                  <!-- <h3 class="mb-1">施工日期(起)</h3>
                  <v-menu
                    v-model="ass"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model.trim="zs" solo v-on="on" readonly></v-text-field>
                    </template>
                    <v-date-picker color="purple" v-model="zs" @input="ass = false" locale="zh-tw"></v-date-picker>
                  </v-menu> -->
                  <dateSelect
                    label="施工日期(起)"
                    v-model="CheckDay"
                    key="dateStart"
                    :showIcon="formIconShow"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <h3 class="mb-1">工作地點</h3>
                  <v-text-field solo value v-model="Place"/>
                </v-col>
              </v-row>
              <v-row no-gutter class="label-header">
                <v-col cols="12">
                  <h3 class="mb-1 label-header">工作內容</h3>
                  <v-textarea solo rows="4" v-model="Content"/>
                </v-col>
              </v-row> 
              <v-alert dense border="top" colored-border color="border-bg-dark-yellow" elevation="4" class="mb-6">
                <v-row no-gutter class="label-header">
                  <v-col cols="12" sm="4">
                    <h3 class="mt-4">工作時間</h3>
                  </v-col>
                  <v-col cols="12" sm="4" style="display: flex;">
                    <h3 class="mt-3 mr-1">起</h3>
                    <v-text-field type="number" v-model="BgWorkHour" solo style="width: 0px;" placeholder="時"/>
                    <h3 class="mt-3">：</h3>
                    <v-text-field type="number" v-model="BgWorkMinute" solo style="width: 0px;" placeholder="分"/>
                  </v-col>
                  <v-col cols="12" sm="4" style="display: flex;">
                    <h3 class="mt-3 mr-1">迄</h3>
                    <v-text-field type="number" v-model="EndWorkHour" solo style="width: 0px;" placeholder="時"/>
                    <h3 class="mt-3">：</h3>
                    <v-text-field type="number" v-model="EndWorkMinute" solo style="width: 0px;" placeholder="分"/>
                  </v-col>
                </v-row>
                <v-row no-gutter class="label-header">
                  <v-col cols="12" sm="4">
                    <h3 class="mt-4">
                      工作狀態
                      <v-radio-group dense row class="pa-0 ma-0" v-model="WorkStatus">
                        <v-radio color="success" label="開始" value="1" />
                        <v-radio color="orange" label="暫停或終了" value="2" />
                      </v-radio-group>
                    </h3>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">站長簽章</h3>
                    <v-textarea auto-grow outlined rows="1" />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">施工聯絡人</h3>
                    <v-textarea auto-grow outlined rows="1" v-model="Worker" />
                  </v-col>
                </v-row>
                <v-row no-gutter class="label-header">
                  <v-col cols="12" sm="4">
                    <h3 class="mt-4">停用機件</h3>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">名稱</h3>
                    <v-textarea auto-grow outlined rows="1" />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">處置狀況</h3>
                    <v-textarea auto-grow outlined rows="1" />
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
            <!-- 改善建議、改善追蹤 -->
            <v-col cols="12">
              <h3 class="mb-1 label-header">備註</h3>
              <v-textarea solo rows="4" />
            </v-col>
            <!-- END 檢查項目 -->
          </v-row>
        </div>

        <v-card-actions class="px-5 pb-5">
          <v-spacer></v-spacer>
          <v-btn class="mr-2 btn-close white--text" elevation="4" @click="close">取消</v-btn>
          <v-btn class="btn-add white--text" elevation="4" :loading="isLoading" @click="save">送出</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from "vuex";
import {
  getNowFullTime,
  getTodayDateString,
  unique,
  decodeObject,
} from "@/assets/js/commonFun";
import { maintainStatusOpts } from "@/assets/js/workList";
import {
  fetchFormOrderList,
  fetchFormOrderOne,
  createFormOrder,
  createFormOrder0,
  updateFormOrder,
  deleteFormOrder,
} from "@/apis/formManage/serve";
import { formDepartOptions } from "@/assets/js/departOption";
import { Actions } from "@/assets/js/actions";
import { Constrant } from "@/assets/js/constrant";
import dateSelect from "@/components/forManage/dateSelect";
import deptSelect from "@/components/forManage/deptSelect";
class Question {
  constructor(description, method, result, memo) {
    this.description = description;
    this.method = method;
    this.result = result;
    this.memo = memo;
  }
}

export default {
  data() {
    return {
      title: "保安裝置保修工作紀錄簿",
      newText: "紀錄簿",
      isLoading: false,
      disabled: false,
      input: {
        dateStart: new Date().toISOString().substr(0, 10), // 通報日期(起)
        dateEnd: new Date().toISOString().substr(0, 10), // 通報日期(迄)
        case: "",
        eqLoss: "",
        departName: "",
      },
      formIconShow: true,
      //---api---
      DB_Table: "RP019",
      nowTime: "",
      doMan:{
        id: '',
        name: '',
        depart: '',
        checkManName: ''
      },
      formDepartOptions: [
        // 通報單位下拉選單
        { text: "不限", value: "" },
        ...formDepartOptions,
      ],
      Place: '',
      Content: '',
      BgWorkHour: '',
      BgWorkMinute: '',
      EndWorkHour: '',
      EndWorkMinute: '',
      WorkStatus: '',
      Worker: '',
      StopEqip: '',
      StopEqipStatus: '',
      ipt2: {},
      defaultIpt: {  // 預設的欄位值
          startDay: '',
          EndDay: '',
          depart: '',  // 單位
        },
      headers: [
        // 表格顯示的欄位 DepartCode ID Name
        { text: "項次", value: "ItemNo", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "保養日期", value: "CheckDay", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        // { text: "審查狀態", value: "CheckStatus", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "填寫人", value: "Name", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "保養單位", value: "DepartName", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "功能", value: "content", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
      ],
      tableItems: [],
      //------
      Add: false,
      dialog3: false,
      pageOpt: { page: 1 }, // 目前頁數
      ipt: {
        department: "",
        // name: JSON.parse(localStorage.getItem("user")).name,
        date: new Date().toISOString().substr(0, 10),
        items: [
          { status: "0", note: "" },
          { status: "0", note: "" },
        ],
      },
      items: [{ question: "1. 檢查道岔材料(組裝前)" }],
      suggest: "", // 改善建議
    };
  },
  components: { Pagination, dateSelect, deptSelect }, // 頁碼
  computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
    created() {
      this.ipt2 = { ...this.defaultIpt }
      //更新時間
      var today=new Date();
      let mStr = today.getMonth()+1;
      let dStr = today.getDate();
      if(mStr < 10){
        mStr = '0' + mStr;
      }
      if(dStr < 10){
        dStr = '0' + dStr;
      }
      this.nowTime = today.getFullYear()+'-'+ mStr +'-'+ dStr;
      this.z = this.df = this.nowTime
  },
  methods: {
    initInput(){
      console.log("init create window form")
      this.doMan.name = this.userData.UserName;
      this.CheckDay = getTodayDateString();
      this.zs = this.nowTime;
      this.Place = '',
      this.Content = '',
      this.BgWorkHour = '',
      this.BgWorkMinute = '',
      this.EndWorkHour = '',
      this.EndWorkMinute = '',
      this.WorkStatus = '',
      this.Worker = '',
      this.StopEqip = '',
      this.StopEqipStatus = ''
    },
    newOne(){
      this.Add = true
      this.initInput();
    },
    unique(list){
      var arr = [];
      let b = false;
      for (var i = 0; i < list.length; i++) {
        if (i == 0) arr.push(list[i]);
        b = false;
        if (arr.length > 0 && i > 0) {
          for (var j = 0; j < arr.length; j++) {
            if (arr[j].RPFlowNo == list[i].RPFlowNo) {
              b = true;
              //break;
            }
          }
          if (!b) {
            arr.push(list[i]);
          }
        }
      }
      return arr;
    },
    ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 搜尋
    search() 
    {
      console.log("Search click");
      this.chLoadingShow({show:false})
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          { Column: "StartDayVlaue", Value: this.input.dateStart },
          { Column: "EndDayVlaue", Value: this.input.dateEnd },
          { Column: "DepartCode", Value: this.input.department },
                ],
        QyName:[
          // "DISTINCT (RPFlowNo)",
          // // "ID",
          // // "Name",
          // // "CheckDay",
          // // "CheckStatus",
          // " * "
          "RPFlowNo",
          "ID",
          "Name",
          "DepartName",
          "CheckDay",
          "CheckStatus",
          "FlowId"
        ],
      }).then(res => {
        let tbBuffer = JSON.parse(res.data.DT)
        let aa = unique(tbBuffer)
        this.tableItems = aa
      }).catch(err => {
        console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow({show:false})
      })
    },
    // 存
    save() {},
    // 關閉 dialog
    close() {
      this.Add = false;
      this.dialog = false;
      this.dialogShowEdit = false;
      this.dialogDel = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.addItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    viewPage(item) {
      this.chLoadingShow({show:false})
        // 依業主要求變更檢式頁面的方式，所以改為另開分頁
        fetchFormOrderOne({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {'Column':'RPFlowNo','Value':item.RPFlowNo},
                ],
        QyName:[
          "CheckDay",
          "DepartName",
          "Name",
          "CheckMan",
          "Place",
          "Content",
          "BgWorkHour",
          "BgWorkMinute",
          "EndWorkHour",
          "EndWorkMinute",
          "WorkStatus",
          "CheckManID",
          "CheckMan",
          "Worker",
          "StopEqip",
          "StopEqipStatus",
        ],
      }).then(res => {
        this.initInput();
        console.log(res.data.DT)
        let dat = JSON.parse(res.data.DT)
        console.log("data name: " + dat[0].Name)
        console.log("data time: " + dat[0].CheckDay)
        this.Add = true
        // this.zs = res.data.DT.CheckDay
        this.doMan.name = dat[0].Name
        let time1 = dat[0].CheckDay.substr(0,10)
        console.log("data time1: " + time1)
        this.zs = time1
        console.log("doMan name: " + this.doMan.name)
        //123資料
        let ad = Object.keys(dat[0])
        console.log(ad)
        var i = 0, j = 0;
          for(let key of Object.keys(dat[0])){
            if(i > 3 && i < 52){
              if(i % 2 == 0){
                  this.ipt.items[j].status = (dat[0])[key]
              }
              else{
                this.ipt.items[j].note = (dat[0])[key]
                j++
              }
            }
            i++
          }
        
      }).catch(err => {
        console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow({ show: false})
      })
    },//viewPage
  },
};
</script>
