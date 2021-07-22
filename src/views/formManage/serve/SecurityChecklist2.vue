// 1. 北門車站
// 2. 竹崎車站
// 3. 奮起湖車站
// 4. 阿里山車站
// 5. 交力坪、神木、對高岳
// 6. 沼平、祝山
// 7. 十字岔道
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
      <v-col cols="12" sm="3" md="3">
        <deptSelect label="管理單位" v-model="input.department" :iconYN="formIconShow" outType="key" key="department"/>
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn dark large class="mb-sm-8 mb-md-8 btn-search" @click="search">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
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

          <!-- headers 的 content 欄位 (檢視內容) mdi-magnify-->
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
              <Pagination
                  :footer="footer"
                  :pageOpt="pageOpt"
                  @chPage="chPage"
              />
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <!-- 新增自動檢點表 modal -->
    <v-dialog v-model="Add" persistent max-width="1060px">
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
            <!-- 檢查部分 -->
            <v-col cols="12">
              <v-row no-gutter class="label-header">
                <v-col cols="12" sm="3">
                  <dateSelect
                    label="保養日期"
                    v-model="CheckDay"
                    key="dateStart"
                    :showIcon="formIconShow"
                  />
                </v-col>
                <!-- <v-col cols="12" sm="3">
                  <h3 class="mb-1">管理單位</h3>
                  <v-text-field solo value  />
                </v-col> -->
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">保養人</h3>
                  <v-text-field solo v-model="doMan.name"/>
                </v-col>
                <!-- <v-col cols="12" sm="3">
                  <h3 class="mb-1">站長</h3>
                  <v-text-field solo/>
                </v-col> -->
              </v-row>
              <v-expansion-panels :disabled="disabled" multiple>
                <v-expansion-panel>
                  <v-expansion-panel-header color="btn-expansion" class="white--text">
                    轉轍器
                    <template v-slot:actions>
                      <v-icon color="dropdownicon">
                        $expand
                      </v-icon>
                    </template>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <!-- ---------------------竹崎車站--------------------- -->
                      <v-col cols="13" sm="12">
                        <v-toolbar color="gradual-bg-darken-wood" dark>
                        <v-spacer/>
                        <v-toolbar-title>竹崎車站</v-toolbar-title>
                        <v-spacer/>
                      </v-toolbar>
                    </v-col>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="border-bg-dark-yellow"
                      elevation="4"
                      v-for="(item, idx) in items1"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter class="label-header">
                        <v-col cols="12" sm="2">
                            <h3 class="mb-1">竹崎車站<br/>轉轍器號碼</h3>
                          {{ item.question }}
                          </v-col>
                        <v-col cols="12" sm="2">
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status1"
                            class="pa-0 ma-0">
                            <h3 class="mb-1">轉轍器<br/>是否加鎖
                            </h3>
                            <v-radio color="success" label="已完成" value="1"></v-radio>
                            <v-radio color="red" label="未完成" value="2"></v-radio>
                            <v-radio color="orange" label="待改善" value="3"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status2"
                            class="pa-0 ma-0">
                            <h3 class="mb-1">清除滑板生銹或積油垢</h3>
                            <v-radio color="success" label="已完成" value="1"></v-radio>
                            <v-radio color="red" label="未完成" value="2"></v-radio>
                            <v-radio color="orange" label="待改善" value="3"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status3"
                            class="pa-0 ma-0">
                            <h3 class="mb-1">各部軸承、聯動桿、油孔注油</h3>
                            <v-radio color="success" label="已完成" value="1"></v-radio>
                            <v-radio color="red" label="未完成" value="2"></v-radio>
                            <v-radio color="orange" label="待改善" value="3"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status4"
                            class="pa-0 ma-0">
                            <h3 class="mb-1">轉轍器四周環境清潔</h3>
                            <v-radio color="success" label="已完成" value="1"></v-radio>
                            <v-radio color="red" label="未完成" value="2"></v-radio>
                            <v-radio color="orange" label="待改善" value="3"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                            <h3 class="mb-1">備註<br/><br/></h3>
                          <span class="d-sm-none error--text">備註</span>
                          <v-textarea auto-grow v-model="ipt.items[idx].note"
                           outlined rows="2"/>
                        </v-col>
                      </v-row>
                    </v-alert>
                    <!-- ---------------------竹崎車站--------------------- -->
                      <v-col cols="13" sm="12">
                        <v-toolbar color="gradual-bg-darken-wood" dark>
                        <v-spacer/>
                        <v-toolbar-title>竹崎車站</v-toolbar-title>
                        <v-spacer/>
                      </v-toolbar>
                    </v-col>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="border-bg-dark-yellow"
                      elevation="4"
                      v-for="(item, idx) in items2"
                      :key="idx"
                      class="mb-6 mt-4">
                      <v-row no-gutter class="label-header">
                        <v-col cols="12" sm="2">
                            <h3 class="mb-1">竹崎車站<br/>轉轍器號碼</h3>
                          {{ item.question }}
                          </v-col>
                        <v-col cols="12" sm="2">
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items_2[idx].status1"
                            class="pa-0 ma-0">
                            <h3 class="mb-1">轉轍器<br/>是否加鎖
                            </h3>
                            <v-radio color="success" label="已完成" value="1"></v-radio>
                            <v-radio color="red" label="未完成" value="2"></v-radio>
                            <v-radio color="orange" label="待改善" value="3"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items_2[idx].status2"
                            class="pa-0 ma-0">
                            <h3 class="mb-1">清除滑板生銹或積油垢</h3>
                            <v-radio color="success" label="已完成" value="1"></v-radio>
                            <v-radio color="red" label="未完成" value="2"></v-radio>
                            <v-radio color="orange" label="待改善" value="3"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items_2[idx].status3"
                            class="pa-0 ma-0">
                            <h3 class="mb-1">各部軸承、聯動桿、油孔注油</h3>
                            <v-radio color="success" label="已完成" value="1"></v-radio>
                            <v-radio color="red" label="未完成" value="2"></v-radio>
                            <v-radio color="orange" label="待改善" value="3"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items_2[idx].status4"
                            class="pa-0 ma-0">
                            <h3 class="mb-1">轉轍器四周環境清潔</h3>
                            <v-radio color="success" label="已完成" value="1"></v-radio>
                            <v-radio color="red" label="未完成" value="2"></v-radio>
                            <v-radio color="orange" label="待改善" value="3"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                            <h3 class="mb-1">備註<br/><br/></h3>
                          <span class="d-sm-none error--text">備註</span>
                          <v-textarea auto-grow v-model="ipt.items_2[idx].note"
                           outlined rows="2"/>
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="btn-expansion" class="white--text">
                    進、出站號誌機
                    <template v-slot:actions>
                      <v-icon color="dropdownicon">
                        $expand
                      </v-icon>
                    </template>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <!-- ---------------------進、出站號誌燈--------------------- -->
                      
                    <v-row
                      no-gutter
                      class="label-header d-none d-sm-flex font-weight-black">
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
                      v-for="(item, idx) in items3"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter class="label-header">
                        <v-col cols="12" sm="4">{{ item.question }}</v-col>
                        <v-col cols="12" sm="4">
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items_3[idx].status1"
                            class="pa-0 ma-0">
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="red" label="異常" value="2"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">備註</span>
                          <v-textarea auto-grow v-model="ipt.items_3[idx].note"
                           outlined rows="2"/>
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
            <!-- 改善建議、改善追蹤 -->
            
            <!-- END 檢查部分 -->
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
      title: "保安裝置檢查紀錄表-竹崎車站",
      newText: "紀錄表",
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
      a: "",
      ass: "",
      z: "",
      zs: "",
      q: "",
      df: "",
      s: "",
      qz: "",
      wx: "",
      pp: "",
      oo: "",
      ii: "",
      uu: "",
      yy: "",
      nowTime: "",
      DB_Table: "RP002",
      Add: false,
      dialog3: false,
      doMan:{
        id: '',
        name: '',
        depart: '',
        checkManName: ''
      },
      pageOpt: { page: 1 }, // 目前頁數
      headers2: [  // 表格顯示的欄位
            { text: '工單編號', value: 'WorkOrderID', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '設備標示編號', value: 'MaintainCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '處理階段', value: 'Status', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
      ],
      headers: [
        // 表格顯示的欄位 DepartCode ID Name
        { text: "項次", value: "ItemNo", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "保養日期", value: "CheckDay", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "審查狀態", value: "CheckStatus", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "填寫人", value: "Name", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "保養單位", value: "DepartName", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "功能", value: "content", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
      ],
      tableItems: [],
      ipt2: {},
      ipt: {
        // department: "",
        // name: JSON.parse(localStorage.getItem("user")).name,
        // date: new Date().toISOString().substr(0, 10),
        items: [
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
        ],
        items_2: [
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
        ],
        items_3: [
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
        ],
      },
      defaultIpt: {  // 預設的欄位值
          startDay: '',
          EndDay: '',
          depart: '',  // 單位
        },
        
      items1: [
        //竹崎車站
        { question: "1號" },
        { question: "3號" },
        { question: "5號" },
        { question: "7號" },
        { question: "9號" },
        { question: "11號" },
        { question: "2號" },
        { question: "4號" },
        { question: "6號" },
      ],
      items2: [
        //竹崎車站
        { question: "8號" },
        { question: "10號" },
        { question: "12號" },
        { question: "14號" },
        { question: "16號" },
        { question: "18號" },
        { question: "20號" },
        { question: "22號" },
        { question: "24號" },
        { question: "26號" },
      ],
      items3: [
        //進、出站號誌燈
        { question: "嘉義方向-是否正常作用" },
        { question: "阿里山方向-是否正常作用" },
      ],
      suggest: "", // 改善建議
      formDepartOptions: [  // 通報單位下拉選單
            { text: '不限', value: '' },
            ...formDepartOptions,
        ],
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
      this.doMan.name = this.userData.UserName;
      this.CheckDay = getTodayDateString();
      this.zs = this.nowTime;
      var step;
      for (step = 0; step < 9; step++) {
        this.ipt.items[step].status1 = "0"
        this.ipt.items[step].status2 = "0"
        this.ipt.items[step].status3 = "0"
        this.ipt.items[step].status4 = "0"
        this.ipt.items[step].note = ''
      }
      for (step = 0; step < 10; step++) {
        this.ipt.items_2[step].status1 = "0"
        this.ipt.items_2[step].status2 = "0"
        this.ipt.items_2[step].status3 = "0"
        this.ipt.items_2[step].status4 = "0"
        this.ipt.items_2[step].note = ''
      }
      for (step = 0; step < 2; step++) {
        this.ipt.items_3[step].status1 = "0"
        this.ipt.items_3[step].note = ''
      }
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
    newOne(){
      this.Add = true
      this.initInput();
    },
    // 搜尋
    search() {
      console.log("Search click!")
      var today = new Date();

      console.log("1609")

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
          "RPFlowNo",
          "ID",
          "Name",
          "CheckDay",
          "CheckStatus",
          "FlowId", "DepartName"
        ],
      }).then(res => {
        let tbBuffer = JSON.parse(res.data.DT)
        let aa = unique(tbBuffer)
        this.tableItems = aa
      }).catch(err => {
        console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow({ show: false})
      })
    },
    // 存
    save() {
      this.chLoadingShow({show:false})
      createFormOrder({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id this.doMan.name = this.userData.UserName
        // OperatorID: "16713",  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem:[
          {
            "Chk1": 
                [
                  {
                    "CheckDay":this.zs, "SwitchLoc":"1", "SwitchNo":"1", "SwitchLock":this.ipt.items[0].status1, "Rust":this.ipt.items[0].status2, 
                    "Bearing":this.ipt.items[0].status3, "SwitchClean":this.ipt.items[0].status4, "Memo_1":this.ipt.items[0].note
                  },
                  {
                    "CheckDay":this.nowTime, "SwitchLoc":"1", "SwitchNo":"3", "SwitchLock":this.ipt.items[1].status1, "Rust":this.ipt.items[1].status2, 
                    "Bearing":this.ipt.items[1].status3, "SwitchClean":this.ipt.items[1].status4, "Memo_1":this.ipt.items[1].note
                  },
                  {
                    "CheckDay":this.nowTime, "SwitchLoc":"1", "SwitchNo":"5", "SwitchLock":this.ipt.items[2].status1, "Rust":this.ipt.items[2].status2, 
                    "Bearing":this.ipt.items[2].status3, "SwitchClean":this.ipt.items[2].status4, "Memo_1":this.ipt.items[2].note
                  },
                  {
                    "CheckDay":this.nowTime, "SwitchLoc":"1", "SwitchNo":"7", "SwitchLock":this.ipt.items[3].status1, "Rust":this.ipt.items[3].status2, 
                    "Bearing":this.ipt.items[3].status3, "SwitchClean":this.ipt.items[3].status4, "Memo_1":this.ipt.items[3].note
                  },
                  {
                    "CheckDay":this.nowTime, "SwitchLoc":"1", "SwitchNo":"9", "SwitchLock":this.ipt.items[4].status1, "Rust":this.ipt.items[4].status2, 
                    "Bearing":this.ipt.items[4].status3, "SwitchClean":this.ipt.items[4].status4, "Memo_1":this.ipt.items[4].note
                  },
                  {
                    "CheckDay":this.nowTime, "SwitchLoc":"1", "SwitchNo":"11", "SwitchLock":this.ipt.items[5].status1, "Rust":this.ipt.items[5].status2, 
                    "Bearing":this.ipt.items[5].status3, "SwitchClean":this.ipt.items[5].status4, "Memo_1":this.ipt.items[5].note
                  },
                  {
                    "CheckDay":this.nowTime, "SwitchLoc":"1", "SwitchNo":"2", "SwitchLock":this.ipt.items[6].status1, "Rust":this.ipt.items[6].status2, 
                    "Bearing":this.ipt.items[6].status3, "SwitchClean":this.ipt.items[6].status4, "Memo_1":this.ipt.items[6].note
                  },
                  {
                    "CheckDay":this.nowTime, "SwitchLoc":"1", "SwitchNo":"4", "SwitchLock":this.ipt.items[7].status1, "Rust":this.ipt.items[7].status2, 
                    "Bearing":this.ipt.items[7].status3, "SwitchClean":this.ipt.items[7].status4, "Memo_1":this.ipt.items[7].note
                  },
                  {
                    "CheckDay":this.nowTime, "SwitchLoc":"1", "SwitchNo":"6", "SwitchLock":this.ipt.items[8].status1, "Rust":this.ipt.items[8].status2, 
                    "Bearing":this.ipt.items[8].status3, "SwitchClean":this.ipt.items[8].status4, "Memo_1":this.ipt.items[8].note
                  },
                  {
                    "CheckDay":this.nowTime, "SwitchLoc":"2", "SwitchNo":"8", "SwitchLock":this.ipt.items_2[0].status1, "Rust":this.ipt.items_2[0].status2, 
                    "Bearing":this.ipt.items_2[0].status3, "SwitchClean":this.ipt.items_2[0].status4, "Memo_1":this.ipt.items_2[0].note
                  },
                  {
                    "CheckDay":this.nowTime, "SwitchLoc":"2", "SwitchNo":"10", "SwitchLock":this.ipt.items_2[1].status1, "Rust":this.ipt.items_2[1].status2, 
                    "Bearing":this.ipt.items_2[1].status3, "SwitchClean":this.ipt.items_2[1].status4, "Memo_1":this.ipt.items_2[1].note
                  },
                  {
                    "CheckDay":this.nowTime, "SwitchLoc":"2", "SwitchNo":"12", "SwitchLock":this.ipt.items_2[2].status1, "Rust":this.ipt.items_2[2].status2, 
                    "Bearing":this.ipt.items_2[2].status3, "SwitchClean":this.ipt.items_2[2].status4, "Memo_1":this.ipt.items_2[2].note
                  },
                  {
                    "CheckDay":this.nowTime, "SwitchLoc":"2", "SwitchNo":"14", "SwitchLock":this.ipt.items_2[3].status1, "Rust":this.ipt.items_2[3].status2, 
                    "Bearing":this.ipt.items_2[3].status3, "SwitchClean":this.ipt.items_2[3].status4, "Memo_1":this.ipt.items_2[3].note
                  },
                  {
                    "CheckDay":this.nowTime, "SwitchLoc":"2", "SwitchNo":"16", "SwitchLock":this.ipt.items_2[4].status1, "Rust":this.ipt.items_2[4].status2, 
                    "Bearing":this.ipt.items_2[4].status3, "SwitchClean":this.ipt.items_2[4].status4, "Memo_1":this.ipt.items_2[4].note
                  },
                  {
                    "CheckDay":this.nowTime, "SwitchLoc":"2", "SwitchNo":"18", "SwitchLock":this.ipt.items_2[5].status1, "Rust":this.ipt.items_2[5].status2, 
                    "Bearing":this.ipt.items_2[5].status3, "SwitchClean":this.ipt.items_2[5].status4, "Memo_1":this.ipt.items_2[5].note
                  },
                  {
                    "CheckDay":this.nowTime, "SwitchLoc":"2", "SwitchNo":"20", "SwitchLock":this.ipt.items_2[6].status1, "Rust":this.ipt.items_2[6].status2, 
                    "Bearing":this.ipt.items_2[6].status3, "SwitchClean":this.ipt.items_2[6].status4, "Memo_1":this.ipt.items_2[6].note
                  },
                  {
                    "CheckDay":this.nowTime, "SwitchLoc":"2", "SwitchNo":"22", "SwitchLock":this.ipt.items_2[7].status1, "Rust":this.ipt.items_2[7].status2, 
                    "Bearing":this.ipt.items_2[7].status3, "SwitchClean":this.ipt.items_2[7].status4, "Memo_1":this.ipt.items_2[7].note
                  },
                  {
                    "CheckDay":this.nowTime, "SwitchLoc":"2", "SwitchNo":"24", "SwitchLock":this.ipt.items_2[8].status1, "Rust":this.ipt.items_2[8].status2, 
                    "Bearing":this.ipt.items_2[8].status3, "SwitchClean":this.ipt.items_2[8].status4, "Memo_1":this.ipt.items_2[8].note
                  },
                  {
                    "CheckDay":this.nowTime, "SwitchLoc":"2", "SwitchNo":"26", "SwitchLock":this.ipt.items_2[9].status1, "Rust":this.ipt.items_2[9].status2, 
                    "Bearing":this.ipt.items_2[9].status3, "SwitchClean":this.ipt.items_2[9].status4, "Memo_1":this.ipt.items_2[9].note
                  },
                ],
            "Chk2_ZhuqiStation":
                {
                  "Sig_Chiayi":this.ipt.items_3[0].status1, 
                  "Memo_2":this.ipt.items_3[0].note, 
                  "Sig_Alishan":this.ipt.items_3[1].status1,
                  "Memo_3":this.ipt.items_3[1].note, 
                }
          }
        ],
      }).then(res => {
        console.log(res.data.DT)
      }).catch(err => {
        console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow({ show: false})
      })
      this.Add = false;
    },
    // 關閉 dialog
    close() {
      console.log("close!")
      this.Add = false;
      this.dialog3 = false;
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
          "SwitchLoc",
          "SwitchNo",
          "SwitchLock",
          "Rust",
          "Bearing",
          "SwitchClean",
          "Memo_1",
          "Sig_Chiayi",
          "Memo_2",
          "Sig_Alishan",
          "Memo_3",
        ],
      }).then(res => {
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
        // this.tableItems = JSON.parse(res.data.DT)
        //123資料
        var step;
        var DBIndx = 0
        for (step = 0; step < 9; step++) {
          this.ipt.items[step].status1 = dat[DBIndx].SwitchLock
          this.ipt.items[step].status2 = dat[DBIndx].Rust
          this.ipt.items[step].status3 = dat[DBIndx].Bearing
          this.ipt.items[step].status4 = dat[DBIndx].SwitchClean
          this.ipt.items[step].note = dat[DBIndx].Memo_1
          DBIndx++
        }
        for (step = 0; step < 10; step++) {
          this.ipt.items_2[step].status1 = dat[DBIndx].SwitchLock
          this.ipt.items_2[step].status2 = dat[DBIndx].Rust
          this.ipt.items_2[step].status3 = dat[DBIndx].Bearing
          this.ipt.items_2[step].status4 = dat[DBIndx].SwitchClean
          this.ipt.items_2[step].note = dat[DBIndx].Memo_1
          DBIndx++
        }
        console.log("DBIndx: " + DBIndx)
        
        let www = dat.length
        console.log("dat.length: " + www)
        console.log("dat[0].Memo_2: " + dat[0].Memo_2)
        this.ipt.items_3[0].status1 = dat[0].Sig_Chiayi
        this.ipt.items_3[0].note = dat[0].Memo_2
        this.ipt.items_3[1].status1 = dat[0].Sig_Alishan
        this.ipt.items_3[1].note = dat[0].Memo_3
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
