// 1. 北門車站
// 2. 竹崎車站
// 3. 奮起湖車站
// 4. 阿里山車站
// 5. 交力坪、神木、對高岳
// 6. 沼平、祝山
// 7. 十字岔道
<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">{{ title }}</h2>
    
    <!-- 第一排選項 -->
    <v-row class="px-2">
        
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>保養日期(起)
        </h3>
        <v-menu
          v-model="a"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="z" solo v-on="on" readonly></v-text-field>
          </template>
          <v-date-picker color="purple" v-model="z" @input="a = false" locale="zh-tw"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>保養日期(迄)
        </h3>
        <v-menu
          v-model="q"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="df" solo v-on="on" readonly></v-text-field>
          </template>
          <v-date-picker color="purple" v-model="df" @input="q = false" locale="zh-tw"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>管理單位
        </h3>
        <v-select
          v-model="ipt2.depart"
          :items="formDepartOptions"
          solo
        />
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn color="green" dark large class="mb-sm-8 mb-md-8" @click="search">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn
          color="indigo"
          elevation="3"
          dark
          large
          class="ml-4 ml-sm-4 ml-md-4 mb-sm-8 mb-md-8"
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
    <v-dialog v-model="Add" max-width="1060px">
      <v-card>
        <v-card-title class="blue white--text px-4 py-1">
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
              <v-row no-gutter class="indigo--text">
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">保養日期</h3>
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
                  </v-menu>
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
                <v-col cols="12" sm="12">
                  <h3 class="mb-1">站別</h3>
                <v-radio-group
                dense
                row v-model="station"
                class="pa-0 ma-0">
                <v-radio color="blue" label="交力坪車站" value="1"></v-radio>
                <v-radio color="blue" label="神木車站" value="2"></v-radio>
                <v-radio color="blue" label="對高岳車站" value="3"></v-radio>
                </v-radio-group>
        </v-col>
              </v-row>
              <v-expansion-panels :disabled="disabled" multiple>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">轉轍器</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in items1"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="2">
                            <h3 class="mb-1">轉轍器號碼<br/><br/></h3>
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
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">進、出站號誌機及開車燈</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <!-- ---------------------進、出站號誌燈--------------------- -->
                      <v-col cols="13" sm="12">
                        <v-toolbar color="teal lighten-2" dark>
                        <v-spacer/>
                        <v-toolbar-title>進、出站號誌燈</v-toolbar-title>
                        <v-spacer/>
                      </v-toolbar>
                    </v-col>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
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
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in items2"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="4">{{ item.question }}</v-col>
                        <v-col cols="12" sm="4">
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items_2[idx].status1"
                            class="pa-0 ma-0">
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="red" label="異常" value="2"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">備註</span>
                          <v-textarea auto-grow v-model="ipt.items_2[idx].note"
                           outlined rows="2"/>
                        </v-col>
                      </v-row>
                    </v-alert>
                    <!-- ---------------------開車燈--------------------- -->
                      <v-col cols="13" sm="12">
                        <v-toolbar color="teal lighten-2" dark>
                        <v-spacer/>
                        <v-toolbar-title>開車燈</v-toolbar-title>
                        <v-spacer/>
                      </v-toolbar>
                    </v-col>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
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
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in items3"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="4">{{ item.question }}</v-col>
                        <v-col cols="12" sm="4">
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items_3[idx].status1"
                            class="pa-0 ma-0">
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="red" label="異常" value="2"></v-radio>
                            <v-radio color="black" label="無此設施" value="3"></v-radio>
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
          <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
          <v-btn color="success" elevation="4" :loading="isLoading" @click="save">送出</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { maintainStatusOpts } from '@/assets/js/workList'
import { fetchFormOrderList, fetchFormOrderOne, createFormOrder } from '@/apis/formManage/serve'
import { formDepartOptions } from '@/assets/js/departOption'

export default {
  data() {
    return {
      title: "保安裝置檢查紀錄表-交力坪、神木、對高岳車站",
      newText: "紀錄表",
      isLoading: false,
      disabled: false,
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
      station: "",
      DB_Table: "RP005",
      nowTime: "",
      test23: "test1111",
      Add: false,
      dialog3: false,
      pageOpt: { page: 1 }, // 目前頁數
      doMan:{
        id: '',
        name: '',
        depart: '',
        checkManName: ''
      },
      headers2: [  // 表格顯示的欄位
            { text: '工單編號', value: 'WorkOrderID', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '設備標示編號', value: 'MaintainCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '處理階段', value: 'Status', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
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
      ipt2: {},
      defaultIpt: {  // 預設的欄位值
          startDay: '',
          EndDay: '',
          depart: '',  // 單位
        },
      ipt: {
        // department: "",
        // name: JSON.parse(localStorage.getItem("user")).name,
        // date: new Date().toISOString().substr(0, 10),
        items: [
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
        ],
        items_2: [
          { status1: "0", status2: "0", status3: "0", status4: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status4: "0", note: "" },
        ],
        items_3: [
          { status1: "0", status2: "0", status3: "0", status4: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status4: "0", note: "" },
        ],
      },
      items1: [
        //北門車站岔道
        { question: "1號" },
        { question: "2號" },
      ],
      items2: [
        //進、出站號誌燈
        { question: "嘉義方向-是否正常作用(對高岳車站為祝山方向)" },
        { question: "阿里山方向-是否正常作用" },
      ],
      items3: [
        //開車燈
        { question: "嘉義方向-是否正常作用(對高岳車站為祝山方向)" },
        { question: "阿里山方向-是否正常作用" },
      ],
      suggest: "", // 改善建議
      formDepartOptions: [  // 通報單位下拉選單
            { text: '不限', value: '' },
            ...formDepartOptions,
        ],
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
      this.station = "0";
      var step;
      for (step = 0; step < 2; step++) {
        this.ipt.items[step].status1 = "0"
        this.ipt.items[step].status2 = "0"
        this.ipt.items[step].status3 = "0"
        this.ipt.items[step].status4 = "0"
        this.ipt.items[step].note = ''
      }
      for (step = 0; step < 2; step++) {
        this.ipt.items_2[step].status1 = "0"
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
      this.chLoadingShow()
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {"Column":"StartDayVlaue","Value":this._data.z},
          {"Column":"EndDayVlaue","Value":this._data.df},
          {"Column":"DepartCode","Value":this._data.ipt2.depart},
                ],
        QyName:[
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
        this.chLoadingShow()
      })
    },
    // 存
    save() {
      console.log('送出click! 0222')
      this.chLoadingShow()
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
                    "CheckDay":this.nowTime, "SwitchLoc":this.station, "SwitchNo":"1", "SwitchLock":this.ipt.items[0].status1, "Rust":this.ipt.items[0].status2, 
                    "Bearing":this.ipt.items[0].status3, "SwitchClean":this.ipt.items[0].status4, "Memo_1":this.ipt.items[0].note
                  },
                  {
                    "CheckDay":this.nowTime, "SwitchLoc":this.station, "SwitchNo":"2", "SwitchLock":this.ipt.items[1].status1, "Rust":this.ipt.items[1].status2, 
                    "Bearing":this.ipt.items[1].status3, "SwitchClean":this.ipt.items[1].status4, "Memo_1":this.ipt.items[1].note
                  },
                ],
            "Chk2_JiaolipingShenmuDueigaoyueStation":
                {"Sig_Chiayi":this.ipt.items_2[0].status1, 
                 "Memo_2":this.ipt.items_2[0].note, 
                 "Sig_Alishan":this.ipt.items_2[1].status1,
                 "Memo_3":this.ipt.items_2[1].note, 
                 "Light_Chiayi":this.ipt.items_3[0].status1,
                 "Memo_4":this.ipt.items_3[0].note, 
                 "Light_Alishan":this.ipt.items_3[1].status1, 
                 "Memo_5":this.ipt.items_3[1].note}
          }
        ],
      }).then(res => {
        console.log(res.data.DT)
      }).catch(err => {
        console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow()
      })
      this.Add = false;


    },
    // 關閉 dialog
    close() {
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
          "Light_Chiayi",
          "Memo_4",
          "Light_Alishan",
          "Memo_5",
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
        // this.tableItems = JSON.parse(res.data.DT)
        //123資料
        this.station = dat[0].SwitchLoc
        var step;
        var DBIndx = 0
        for (step = 0; step < 2; step++) {
          this.ipt.items[step].status1 = dat[DBIndx].SwitchLock
          this.ipt.items[step].status2 = dat[DBIndx].Rust
          this.ipt.items[step].status3 = dat[DBIndx].Bearing
          this.ipt.items[step].status4 = dat[DBIndx].SwitchClean
          this.ipt.items[step].note = dat[DBIndx].Memo_1
          DBIndx++
        }
        
        console.log("DBIndx: " + DBIndx)
        let www = dat.length
        console.log("dat.length: " + www)
        console.log("dat[0].Memo_2: " + dat[0].Memo_2)
        this.ipt.items_2[0].status1 = dat[0].Sig_Chiayi
        this.ipt.items_2[0].note = dat[0].Memo_2
        this.ipt.items_2[1].status1 = dat[0].Sig_Alishan
        this.ipt.items_2[1].note = dat[0].Memo_3
        this.ipt.items_3[0].status1 = dat[0].Light_Chiayi
        this.ipt.items_3[0].note = dat[0].Memo_4
        this.ipt.items_3[1].status1 = dat[0].Light_Alishan
        this.ipt.items_3[1].note = dat[0].Memo_5
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
