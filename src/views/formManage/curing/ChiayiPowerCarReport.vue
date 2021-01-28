<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2">
      <!-- 檢查日期(起) -->
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>檢查日期(起)
        </h3>
        <v-menu
          v-model="CheckdayOn"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="QueryCheckdayOn" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="QueryCheckdayOn"
            @input="CheckdayOn = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <!-- 檢查日期(迄) -->
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>檢查日期(迄)
        </h3>
        <v-menu
          v-model="CheckdayOff"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="QueryCheckdayOff" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="QueryCheckdayOff"
            @input="CheckdayOff = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <!-- 查詢、新增 -->
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn color="green" dark large class="mb-sm-8 mb-md-8" @click="search">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn
          color="indigo"
          elevation="3"
          dark
          large
          class="ml-4 ml-sm-4 ml-md-4 mb-sm-8 mb-md-8"
          @click="AddDataModal = true"
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
              class="mr-2"
              small
              dark
              fab
              color="info darken-1"
              @click="viewPage(item)"
            >
              <!-- @click="AddDataModal = true" -->
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
    <v-dialog v-model="AddDataModal" max-width="1060px">
      <v-card>
        <!-- 標題 -->
        <v-card-title class="blue white--text px-4 py-1">
          新增{{ title }}
          <v-spacer />
          <v-btn dark fab small text @click="closeAddModal" class="mr-n2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <!-- 內容 -->
        <div class="px-6 py-4">
          <v-row>
            <v-col cols="12">
              <!-- 固定資料 -->
              <v-row no-gutter class="indigo--text">
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">保養日期</h3>
                  <v-menu
                    v-model="MaintenanceDay"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model.trim="AddData.MaintenanceDay" solo v-on="on" readonly />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.MaintenanceDay"
                      @input="MaintenanceDay = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
              </v-row>
              <!-- 摺疊資料 -->
              <v-expansion-panels>
                <!-- 動力車狀態 -->
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">動力車狀態</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      v-for="(data, id) in CarTypeData"
                      :key="id"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="2">
                          <h3 class="mb-1">車別</h3>
                          <span style="font-size: 18px;">{{ data.Question }}</span>
                        </v-col>
                        <!-- 現有總數，加總其他資料須js即時計算(尚未完成) -->
                        <v-col cols="12" sm="2">
                          <h3 class="mb-1">現有總數</h3>
                          <span style="font-size: 18px;">{{ data.Total }}</span>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <h3 class="mb-1">使用</h3>
                          <v-text-field
                            type="number"
                            dense
                            v-model="data.Use"
                            single-line
                            outlined
                          />
                        </v-col>
                        <v-col cols="12" sm="2">
                          <h3 class="mb-1">待用</h3>
                          <v-text-field
                            type="number"
                            dense
                            v-model="data.Wait"
                            single-line
                            outlined
                          />
                        </v-col>
                        <v-col cols="12" sm="2">
                          <h3 class="mb-1">試車</h3>
                          <v-text-field
                            type="number"
                            dense
                            v-model="data.Try"
                            single-line
                            outlined
                          />
                        </v-col>
                        <v-col cols="12" sm="2">
                          <h3 class="mb-1">停用</h3>
                          <v-text-field
                            type="number"
                            dense
                            v-model="data.Ban"
                            single-line
                            outlined
                          />
                        </v-col>
                        <v-col cols="12" sm="2">
                          <h3 class="mb-1">在庫待修</h3>
                          <v-text-field
                            type="number"
                            dense
                            v-model="data.Repair"
                            single-line
                            outlined
                          />
                        </v-col>
                        <v-col cols="12" sm="2">
                          <h3 class="mb-1">進廠檢修</h3>
                          <v-text-field
                            type="number"
                            dense
                            v-model="data.Check"
                            single-line
                            outlined
                          />
                        </v-col>
                        <v-col cols="12" sm="4">
                          <h3 class="mb-1">其他</h3>
                          <v-text-field
                            type="text"
                            dense
                            v-model="data.Remarks"
                            single-line
                            outlined
                          />
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <!-- 本日運行車況 -->
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">本日運行車況</v-expansion-panel-header>
                  <!-- 柴油機車 -->
                  <v-expansion-panel-content>
                    <v-col cols="13" sm="12">
                      <v-toolbar color="teal lighten-2" dark>
                        <v-spacer />
                        <v-toolbar-title>柴油機車</v-toolbar-title>
                        <v-spacer />
                      </v-toolbar>
                    </v-col>
                    <!-- ---------------------柴油機車--------------------- -->
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      v-for="(diesel, id) in TodayCar.Diesel"
                      :key="id"
                      class="mb-6 mt-4"
                    >
                      <h2 v-if="id === 0">25噸</h2>
                      <h2 v-if="id === 4">28噸</h2>
                      <h2 v-if="id === 5">29噸</h2>
                      <h2 v-if="id === 12">DPC</h2>
                      <v-row no-gutter>
                        <v-col cols="12" sm="3">
                          <h3 class="mb-1">號碼</h3>
                          <span style="font-size: 18px;">{{ diesel.car }}</span>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <h3 class="mb-1">使用車次</h3>
                          <!-- <span> -->
                          <v-text-field
                            type="text"
                            style="font-size: 18px;"
                            dense
                            v-model="diesel.use"
                            single-line
                            outlined
                          />
                          <!-- </span> -->
                        </v-col>
                        <v-col cols="12" sm="3">
                          <h3 class="mb-1">狀態</h3>
                          <v-radio-group dense row v-model="diesel.type" class="pa-0 ma-0">
                            <v-radio color="success" label="待用" value="0" />
                            <v-radio color="success" label="待修" value="1" />
                            <v-radio color="success" label="進場" value="2" />
                            <v-radio color="red" label="停用" value="3" />
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <h3 class="mb-1">說明</h3>
                          <v-textarea v-model="diesel.remarks" auto-grow outlined rows="2" />
                        </v-col>
                      </v-row>
                    </v-alert>
                    <!-- ---------------------蒸汽機車--------------------- -->
                    <v-col cols="13" sm="12">
                      <v-toolbar color="teal lighten-2" dark>
                        <v-spacer />
                        <v-toolbar-title>蒸氣機車</v-toolbar-title>
                        <v-spacer />
                      </v-toolbar>
                    </v-col>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      v-for="(Steam, id) in TodayCar.Steam"
                      :key="id"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="3">
                          <h3 class="mb-1">號碼</h3>
                          <span style="font-size: 18px;">{{ Steam.car }}</span>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <h3 class="mb-1">使用車次</h3>
                          <v-text-field
                            type="text"
                            style="font-size: 18px;"
                            dense
                            v-model="Steam.use"
                            single-line
                            outlined
                          />
                        </v-col>
                        <v-col cols="12" sm="3">
                          <h3 class="mb-1">狀態</h3>
                          <v-radio-group dense row v-model="Steam.type" class="pa-0 ma-0">
                            <v-radio color="success" label="待用" value="0" />
                            <v-radio color="success" label="待修" value="1" />
                            <v-radio color="success" label="進場" value="2" />
                            <v-radio color="red" label="停用" value="3" />
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <h3 class="mb-1">說明</h3>
                          <v-textarea v-model="Steam.remarks" auto-grow outlined rows="2" />
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </div>

        <!-- 確認、取消 -->
        <v-card-actions class="px-5 pb-5">
          <v-spacer />
          <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
          <v-btn color="success" elevation="4" :loading="isLoading" @click="save">送出</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- END 自動檢點表 modal -->
  </v-container>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { maintainStatusOpts } from '@/assets/js/workList'
import { fetchFormOrderList, fetchFormOrderOne, createFormOrder, createFormOrder0 } from '@/apis/formManage/serve'

export default {
  data() {
    return {
      // 自定義變數
      title:"_____車庫動力車狀態日報表",
      newText:"日報表",
      isLoading: false,
      disabled: false,
      CheckdayOn: "",
      QueryCheckdayOn: "",
      CheckdayOff: "",
      QueryCheckdayOff: "",
      AddDataModal: false,
      MaintenanceDay: "",
      AddData: {
        // 新增表單資料
        MaintenanceDay: "", // 保養日
      },
      // 系統變數
      pageOpt: { page: 1 }, // 目前頁數
      //---api---
      DB_Table: "RP001",
      nowTime: "",
      doMan:{
        id: '',
        name: '',
        depart: '',
        checkManName: ''
      },
      ipt2: {},
      defaultIpt: {  // 預設的欄位值
          startDay: '',
          EndDay: '',
          depart: '',  // 單位
        },
      headers: [
        // 表格顯示的欄位 DepartCode ID Name
        { text: "項次", value: "FlowId", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "保養日期", value: "CheckDay", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "審查狀態", value: "CheckStatus", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "填寫人", value: "Name", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "保養單位", value: "DepartCode", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "功能", value: "content", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
      ],
      tableItems: [],
      //------
      CarTypeData: [ // 新增動力車狀態-(寫死)
        {
          Question: "DL25噸",
          Total: 0,
          Wait: 0,
          Try: 0,
          Ban: 0,
          Repair: 0,
          Check: 0,
          Remarks: "",
        },
        {
          Question: "DL28噸",
          Total: 0,
          Use: 0,
          Wait: 0,
          Try: 0,
          Ban: 0,
          Repair: 0,
          Check: 0,
          Remarks: "",
        },
        {
          Question: "DL29噸",
          Total: 0,
          Use: 0,
          Wait: 0,
          Try: 0,
          Ban: 0,
          Repair: 0,
          Check: 0,
          Remarks: "",
        },
        {
          Question: "蒸汽機車",
          Total: 0,
          Use: 0,
          Wait: 0,
          Try: 0,
          Ban: 0,
          Repair: 0,
          Check: 0,
          Remarks: "",
        },
        {
          Question: "DPC7、8",
          Total: 0,
          Use: 0,
          Wait: 0,
          Try: 0,
          Ban: 0,
          Repair: 0,
          Check: 0,
          Remarks: "",
        },
      ],
      TodayCar: {
        // 本日運行狀態
        Diesel: [
          // 柴油機車
          {
            car: "DL26、27",
            use: "",
            type: "3",
            remarks: "DL26-停用(待報廢)，DL27-竹崎展示",
          },
          { car: "DL28", use: "", type: "3", remarks: "待四級保養" },
          { car: "DL33", use: "", type: "1", remarks: "待四級保養" },
          { car: "DL34", use: "", type: "3", remarks: "停用一年" },
          { car: "DL40", use: "", type: "0", remarks: "" },
          { car: "DL45", use: "1-2", type: "", remarks: "" },
          { car: "DL46", use: "", type: "1", remarks: "待四級保養" },
          { car: "DL47", use: "", type: "0", remarks: "" },
          { car: "DL48", use: "調車", type: "", remarks: "" },
          { car: "DL49", use: "611-N", type: "", remarks: "" },
          { car: "DL50", use: "", type: "0", remarks: "" },
          { car: "DL51", use: "", type: "2", remarks: "四級保養" },
          { car: "DPC 7、8", use: "", type: "3", remarks: "園區展示" },
        ],
        Steam: [
          // 蒸汽機車
          { car: "SL15", use: "", type: "3", remarks: "園區展示" },
          { car: "SL23", use: "", type: "3", remarks: "園區展示" },
          { car: "SL25", use: "", type: "1", remarks: "柴油-變頻器故障" },
          { car: "SL16", use: "", type: "1", remarks: "煤炭" },
        ],
      },
    };
  },
  components: { Pagination }, // 頁碼
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
  },
  methods: {
    initInput(){
      this.doMan.name = this.userData.UserName;
      this.zs = this.nowTime;
      var step;
      for (step = 0; step < 7; step++) {
        this.ipt.items[step].status = "0"
        this.ipt.items[step].note = ''
      }
      this.Advice = "";
      this.Measures = ""
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
    newOne(){
      console.log("newOne23")
      this.Add = true
      console.log("this.Add: " + this.Add)
      this.initInput();
    },
    ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 搜尋
    search() {
      console.log("Search click");
      this.chLoadingShow()
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {'Column':'StartDayVlaue','Value':this._data.z},
          {"Column":"EndDayVlaue","Value":this._data.df},
          {"Column":"DepartCode","Value":this._data.ipt2.depart},
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
          "CheckDay",
          "CheckStatus",
          "FlowId"
        ],
      }).then(res => {
        let tbBuffer = JSON.parse(res.data.DT)
        let aa = this.unique(tbBuffer)
        this.tableItems = aa
      }).catch(err => {
        console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        console.log("search final")
        this.chLoadingShow()
      })
    },
    // 存
    save() {},
    // 關閉 dialog
    close() {
      this.Add = false;
      this.dialog3 = false;
      this.dialogShowEdit = false;
      this.dialogDel = false;
    },
    closeAddModal() {
      this.AddDataModal = false;
    },
    viewPage(item) {
      console.log("item: " + item)
      console.log("RPFlowNo: " + item.RPFlowNo)
      this.chLoadingShow()
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
          "CheckOption1",
          "Memo_1",
          "CheckOption2",
          "Memo_2",
          "CheckOption3",
          "Memo_3",
          "Advice",
          "Measures",

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
        this.memo_2 = dat[0].Advice
        this.memo_3 = dat[0].Measures
      }).catch(err => {
        console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow()
      })
    },//viewPage
  },
};
</script>

<style>
.v-expansion-panel-header {
  font-size: 18px;
}
</style>