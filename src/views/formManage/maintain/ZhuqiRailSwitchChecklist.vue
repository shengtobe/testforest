<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2">
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>檢查日期(起)
        </h3>
        <v-menu
          v-model="a"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="z" solo v-on="on" readonly></v-text-field>
          </template>
          <v-date-picker color="purple" v-model="z" @input="a = false" locale="zh-tw"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>檢查日期(迄)
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
          :items="formDepartOptions" v-model="ipt2.depart"
          solo
        />
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn color="green" dark large class="mb-sm-8 mb-md-8">
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
            <!-- <v-btn title="刪除" small dark fab color="red" @click="dialog3 = true">
              <v-icon dark>mdi-delete</v-icon>
            </v-btn>-->
          </template>

          <!-- 頁碼 -->
          <template v-slot:footer="footer">
            <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <!-- 新增自動檢點表 modal -->
    <v-dialog v-model="Add" max-width="800px">
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
            <!-- 檢查項目 -->
            <v-col cols="12">
              <v-row no-gutter class="indigo--text">
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">檢查日期</h3>
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
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">管理單位</h3>
                  <v-text-field solo value  />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">檢查人員</h3>
                  <v-text-field solo value  />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">工作地點</h3>
                  <v-text-field solo value  />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">班長</h3>
                  <v-text-field solo value  />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">工務長</h3>
                  <v-text-field solo value  />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">監工長</h3>
                  <v-text-field solo value  />
                </v-col>
              </v-row>
              <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">檢查項目</h3>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">檢查結果</h3>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">修正事項與建議</h3>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">確認結果</h3>
                </v-col>
              </v-row>
              <v-alert
                dense
                border="top"
                colored-border
                color="teal"
                elevation="4"
                v-for="(item, idx) in items"
                :key="idx"
                class="mb-6"
              >
                <v-row no-gutter>
                  <v-col cols="12" sm="3">{{ item.question }}</v-col>
                  <v-col cols="12" sm="3">
                    <span class="d-sm-none error--text">檢查結果：</span>
                    <v-radio-group dense row v-model="ipt.items[idx].status" class="pa-0 ma-0">
                      <v-radio color="success" label="合格" value="1"></v-radio>
                      <v-radio color="orange" label="有瑕疵" value="2"></v-radio>
                      <v-radio color="red" label="不合格" value="3"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <span class="d-sm-none error--text">建議:</span>
                    <v-textarea auto-grow outlined rows="3" v-model="ipt.items[idx].Advice"/>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <span class="d-sm-none error--text">結果確認:</span>
                    <v-textarea auto-grow outlined rows="3" v-model="ipt.items[idx].Result"/>
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
            <!-- 改善建議、改善追蹤 >
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">改善措施</h3>
              <v-textarea auto-grow outlined rows="4" v-model.trim="ipt.suggest"></v-textarea>
            </v-col>
            < END 檢查項目 -->
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
import { getNowFullTime, getTodayDateString, unique} from "@/assets/js/commonFun";
import { maintainStatusOpts } from '@/assets/js/workList'
import { fetchFormOrderList, fetchFormOrderOne, createFormOrder, createFormOrder0 } from '@/apis/formManage/serve'
import { formDepartOptions } from '@/assets/js/departOption'

export default {
  data() {
    return {
      title: "竹崎監工區抽換道岔作業自主檢查表",
      newText: "檢查表",
      isLoading: false,
      disabled: false,
      Add: false,
      dialog3: false,
      pageOpt: { page: 1 }, // 目前頁數
      //---api---
      DB_Table: "RP034",
      nowTime: "",
      formDepartOptions: [
      // 通報單位下拉選單
      { text: "不限", value: "" },
      ...formDepartOptions,
    ],
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
        { text: "項次", value: "ItemNo", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "保養日期", value: "CheckDay", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "審查狀態", value: "CheckStatus", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "填寫人", value: "Name", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "保養單位", value: "DepartName", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "功能", value: "content", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
      ],
      tableItems: [],
      //------
      ipt: {
        department: "",
        name: JSON.parse(localStorage.getItem("user")).name,
        date: new Date().toISOString().substr(0, 10),
        items: [
          { status: "0", Advice: "", Result:"" },
          { status: "0", Advice: "", Result:"" },
          { status: "0", Advice: "", Result:"" },
          { status: "0", Advice: "", Result:"" },
          { status: "0", Advice: "", Result:"" },
          { status: "0", Advice: "", Result:"" },
          { status: "0", Advice: "", Result:"" },
          { status: "0", Advice: "", Result:"" },
        ],
      },
      items: [
        { question: "1. 檢查道岔材料(組裝前)" },
        { question: "2. 基礎整地是否水平" },
        { question: "3. 組裝工作是否依規章執行" },
        { question: "4. 抽換工作前複檢工作" },
        { question: "5. 檢驗密貼情形" },
        { question: "6. 施工前工具及人力檢查" },
        { question: "7. 施工完後軌距、水平、高低、方向、平面等檢查" },
        { question: "8. 施工完竣測試運轉" },
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
      this.z = this.df = this.nowTime
  },
  methods: {
    ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
    // 更換頁數
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
        console.log("search final")
        this.chLoadingShow()
      })},
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
                    "CheckOption1":this.ipt.items[0].status,
                     "Advice1":this.ipt.items[0].Advice,
                     "Result1":this.ipt.items[0].Result,
                  },
                  {
                    "CheckOption2":this.ipt.items[1].status,
                     "Advice2":this.ipt.items[1].Advice,
                     "Result2":this.ipt.items[1].Result,
                  },
                  {
                    "CheckOption3":this.ipt.items[2].status,
                     "Advice3":this.ipt.items[2].Advice,
                     "Result3":this.ipt.items[2].Result,
                  },
                  {
                    "CheckOption4":this.ipt.items[3].status,
                     "Advice4":this.ipt.items[3].Advice,
                     "Result4":this.ipt.items[3].Result,
                  },
                  {
                    "CheckOption5":this.ipt.items[4].status,
                     "Advice5":this.ipt.items[4].Advice,
                     "Result5":this.ipt.items[4].Result,
                  },
                  {
                    "CheckOption6":this.ipt.items[5].status,
                     "Advice6":this.ipt.items[5].Advice,
                     "Result6":this.ipt.items[5].Result,
                  },
                  {
                    "CheckOption7":this.ipt.items[6].status,
                     "Advice7":this.ipt.items[6].Advice,
                     "Result7":this.ipt.items[6].Result,
                  },
                  {
                    "CheckOption8":this.ipt.items[7].status,
                     "Advice8":this.ipt.items[7].Advice,
                     "Result8":this.ipt.items[7].Result,
                  },
                ],
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
          "CheckOption1",
          "Advice1",
          "Result1",
          "CheckOption2",
          "Advice2",
          "Result2",
          "CheckOption3",
          "Advice3",
          "Result3",
          "CheckOption4",
          "Advice4",
          "Result4",
          "CheckOption5",
          "Advice5",
          "Result5",
          "CheckOption6",
          "Advice6",
          "Result6",
          "CheckOption7",
          "Advice7",
          "Result7",
          "CheckOption8",
          "Advice8",
          "Result8",
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
            if(i > 3 && i < 28){
              this.ipt.items[j].status = (dat[0])[key]
              this.ipt.items[j].Advice = (dat[0])[key]
              this.ipt.items[j].Result = (dat[0])[key]
              i+=3
            }
          }        
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
