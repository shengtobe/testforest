<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2">
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>保養日期(起)
        </h3>
        <v-menu
          v-model="dateMenuShow.start"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="ipt.dateStart" solo v-on="on" readonly></v-text-field>
          </template>
          <v-date-picker
            color="purple"
            v-model="ipt.dateStart"
            @input="dateMenuShow.start = false"
            locale="zh-tw"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>保養日期(迄)
        </h3>
        <v-menu
          v-model="dateMemuShow.end"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="ipt.dateEnd" solo v-on="on" readonly></v-text-field>
          </template>
          <v-date-picker
            color="purple"
            v-model="ipt.dateEnd"
            @input="dateMemuShow.end = false"
            locale="zh-tw"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>輸入編號(或機號)
        </h3>
        <v-text-field v-model.trim="ipt.eqLoss" solo />
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>選擇單位
        </h3>
        <v-select
          v-model="ipt.case"
          :items="[{ text: '鐵路服務科', value: 'A' }, { text: '鐵路資訊科', value: 'B' }, { text: '鐵路餐飲科', value: 'C' }, { text: '鐵路英文科', value: 'D' }, { text: '鐵路數學科', value: 'E' }]"
          solo
        />
      </v-col>
      <div class="col-sm-4 col-md-8 col-12">
        <v-btn color="green" dark large class="col-4 col-md-2 mr-3">
          <v-icon>mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn
          color="indigo"
          elevation="3"
          dark
          large
          class="col-4 col-md-3 mr-3"
          @click="newOne"
        >
          <!-- @click="dialogShowAdd = true" -->
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </div>
      <!-- 手攜無線電保養紀錄 -->
      <v-col cols="12" sm="12" md="12">
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
            <template v-slot:item.bb>
              <v-btn color="teal" dark @click="sdad = true">檢視</v-btn>
            </template>
            <!-- headers 的 content 欄位 (檢視內容) -->
            <template v-slot:item.content="{ item }">
              <v-btn title="刪除" small dark fab color="red" @click="dialogDel = true">
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>
            </template>

            <!-- 頁碼 -->
            <template v-slot:footer="footer">
              <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <!-- 檢視保養項目 modal -->
      <v-dialog v-model="sdad" max-width="600px">
        <v-card>
          <!-- 標題 -->
          <v-card-title class="blue white--text px-4 py-1">
            檢視保養項目
            <v-spacer />
            <v-btn dark fab small text @click="close" class="mr-n2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          
          <!-- 內容 -->
          <div class="px-6 py-4">
            <v-row>
              <!-- 外觀 -->
              <h3 class="mb-1">編號(或機號)</h3>
              <v-select dense single-line :items="MachineID" outlined />
              <v-col cols="8" sm="6">
                <h3 class="mb-1">外觀檢查(面板、旋鈕等)</h3>
                <v-radio-group row v-model="mainLocation1">
                  <v-radio label="正常" color="success" value="11"></v-radio>
                  <v-radio label="不正常" color="success" value="l2"></v-radio>
                </v-radio-group>
              </v-col>
              <!-- 出廠日期 -->
              <v-col cols="8" sm="6">
                <h3 class="mb-1">檢查天線是否斷裂</h3>
                <v-radio-group row v-model="mainLocation2">
                  <v-radio label="正常" color="success" value="11"></v-radio>
                  <v-radio label="不正常" color="success" value="l2"></v-radio>
                </v-radio-group>
              </v-col>
              <!-- 電池接點是否生銅繡 -->
              <v-col cols="8" sm="6">
                <h3 class="mb-1">電池接點是否生銅繡</h3>
                <v-radio-group row v-model="mainLocation3">
                  <v-radio label="正常" color="success" value="11"></v-radio>
                  <v-radio label="不正常" color="success" value="l2"></v-radio>
                </v-radio-group>
              </v-col>
              <!-- 充電座指示燈亮否、功能是否正常 -->
              <v-col cols="8" sm="6">
                <h3 class="mb-1">充電座指示燈亮否、功能是否正常</h3>
                <v-radio-group row v-model="mainLocation4">
                  <v-radio label="正常" color="success" value="11"></v-radio>
                  <v-radio label="不正常" color="success" value="l2"></v-radio>
                </v-radio-group>
              </v-col>
              <!-- 接收功能是否正常檢查 -->
              <v-col cols="8" sm="6">
                <h3 class="mb-1">接收功能是否正常檢查</h3>
                <v-radio-group row v-model="mainLocation5">
                  <v-radio label="正常" color="success" value="11"></v-radio>
                  <v-radio label="不正常" color="success" value="l2"></v-radio>
                </v-radio-group>
              </v-col>
              <!-- 不正常狀況及處理說明 -->
              <v-col cols="12">
                <h3 class="mb-1">不正常狀況及處理說明</h3>
                <v-textarea
                  hide-details
                  auto-grow
                  outlined
                  rows="3"
                  v-model.trim="addItem.content"
                />
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-dialog>
      <!-- 新增保養資料 modal -->
      <v-dialog v-model="dialogShowAdd" max-width="600px">
        <v-card>
          <!-- 標題 -->
          <v-card-title class="blue white--text px-4 py-1">
            新增{{ title }}
            <v-spacer />
            <v-btn dark fab small text @click="close" class="mr-n2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <!-- 內容 -->
          <div class="px-6 py-4">
            <v-row>
              <!-- 外觀 -->
              <v-col cols="12">
                <h3 class="mb-1">保養人員：王大明</h3>
              </v-col>
              <v-col cols="12">
                <h3 class="mb-1">編號(或機號)</h3>
                <v-select dense single-line :items="MachineID" outlined />
              </v-col>
              
              <v-col cols="8" sm="6">
                <h3 class="mb-1">外觀檢查(面板、旋鈕等)</h3>
                <v-radio-group row v-model="mainLocation1">
                  <v-radio label="正常" color="success" value="11"></v-radio>
                  <v-radio label="不正常" color="success" value="l2"></v-radio>
                </v-radio-group>
              </v-col>
              <!-- 出廠日期 -->
              <v-col cols="8" sm="6">
                <h3 class="mb-1">檢查天線是否斷裂</h3>
                <v-radio-group row v-model="mainLocation2">
                  <v-radio label="正常" color="success" value="11"></v-radio>
                  <v-radio label="不正常" color="success" value="l2"></v-radio>
                </v-radio-group>
              </v-col>
              <!-- 電池接點是否生銅繡 -->
              <v-col cols="8" sm="6">
                <h3 class="mb-1">電池接點是否生銅繡</h3>
                <v-radio-group row v-model="mainLocation3">
                  <v-radio label="正常" color="success" value="11"></v-radio>
                  <v-radio label="不正常" color="success" value="l2"></v-radio>
                </v-radio-group>
              </v-col>
              <!-- 充電座指示燈亮否、功能是否正常 -->
              <v-col cols="8" sm="6">
                <h3 class="mb-1">充電座指示燈亮否、功能是否正常</h3>
                <v-radio-group row v-model="mainLocation4">
                  <v-radio label="正常" color="success" value="11"></v-radio>
                  <v-radio label="不正常" color="success" value="l2"></v-radio>
                </v-radio-group>
              </v-col>
              <!-- 接收功能是否正常檢查 -->
              <v-col cols="8" sm="6">
                <h3 class="mb-1">接收功能是否正常檢查</h3>
                <v-radio-group row v-model="mainLocation5">
                  <v-radio label="正常" color="success" value="11"></v-radio>
                  <v-radio label="不正常" color="success" value="l2"></v-radio>
                </v-radio-group>
              </v-col>
              
              <!-- 不正常狀況及處理說明 -->
              <v-col cols="12">
                <h3 class="mb-1">不正常狀況及處理說明</h3>
                <v-textarea
                  hide-details
                  auto-grow
                  outlined
                  rows="3"
                  v-model.trim="addItem.content"
                />
              </v-col>
            </v-row>
          </div>
          <!-- 輸出/取消 -->
          <v-card-actions class="px-5 pb-5">
            <v-spacer></v-spacer>
            <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
            <v-btn color="success" elevation="4" :loading="isLoading" @click="save">送出</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { evtTypes, locationOpts } from "@/assets/js/smisData";
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { maintainStatusOpts } from '@/assets/js/workList'
import { fetchFormOrderList, fetchFormOrderOne, createFormOrder, createFormOrder0 } from '@/apis/formManage/serve'
import { formDepartOptions } from '@/assets/js/departOption'

export default {
  data: () => ({
    title: "手攜無線電機檢查紀錄表",
    newText: "紀錄表",
    isLoading: false,
    disabled: false,
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
    MachineID: ["TRK-ALL-SLP-300", "TRK-ALL-SLP-312", "TRK-ALL-SLP-002"],
    ipt: {
      dateStart: new Date().toISOString().substr(0, 10), // 通報日期(起)
      dateEnd: new Date().toISOString().substr(0, 10), // 通報日期(迄)
      case: "",
      eqLoss: ""
    },
    dateMemuShow: {
      // 日曆是否顯示
      start: false,
      end: false
    },
    sdad: false,
    evtTypeOpts: evtTypes,
    locationOpts: locationOpts,
    dateMenuShow: false, // 日曆是否顯示
    dialogDateMenuShow: {
      // dialog 日期 menu 是否顯示
      enter: false,
      enters: false,
      out: false
    },
    editedItem: {
      Kilometer: 12044.3,
      enterDate: "2020-08-10",
      content: "更換引擎機油", // 維修項目
      startday: "2020-08-10",
      user: "王大明"
    },
    addItem: {
      Kilometer: null,
      enterDate: "",
      content: "", // 維修項目
      enterDates: "",
      user: ""
    },
    defaultItem: {
      Kilometer: 0,
      enterDate: "2020-08-10",
      content: "", // 維修項目
      user: ""
    },
    nameRules: [
      v => !!v || "公里數必須填寫",
      v => v.length > 0 || "公里數必須大於0"
    ],
    dialogForm: {},
    mainLocation1: "", // 所選的地點
    mainLocation2: "", // 所選的地點
    mainLocation3: "", // 所選的地點
    mainLocation4: "", // 所選的地點
    mainLocation5: "", // 所選的地點
    OLocation: "", // 其他地點
    dialogShowAdd: false, // model off
    dialogShowEdit: false, // model off
    dialogDel: false, // model off
    dialogm1: "2020-08-01",
    aa: "",
    bb: "",
    cc: "",
    disabled: true,
    tableItems: [
      {
        aa: "2020-08-01",
        mcid: "TRK-ALL-SLP-300",
        jj: "王大明",
        kk: "已審查"
      }
    ], // 表格資料
    pageOpt: { page: 1 }, // 目前頁數
    headers: [
      // 表格顯示的欄位
      {
        text: "保養日期",
        value: "aa",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "編號(或機號)",
        value: "mcid",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "保養項目",
        value: "bb",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "保養人",
        value: "jj",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "審查狀態",
        value: "kk",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "功能",
        value: "shop",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      }
    ]
  }),
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
    // 更新資料
    update() {
      this.$emit("chLocation", {});
    },
    ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
    // 更換頁數
    initInput(){
      console.log("init create window form")
      this.doMan.name = this.userData.UserName;
      this.zs = this.nowTime;
      var step;
      for (step = 0; step < 24; step++) {
        this.ipt.items[step].status = "0"
        this.ipt.items[step].note = ""
      }
      this.memo_2 = ""
      this.memo_3 = ""
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
      this.sdad = false;
      this.dialogShowAdd = false;
      this.dialogShowEdit = false;
      this.dialogDel = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.addItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
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
  }
};
</script>
<style>
  .mb-1{
    margin-top: 1%;
  }
</style>