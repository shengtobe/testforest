<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2">
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
        <v-btn color="green" dark large class="mb-sm-8 mb-md-8" @click="search">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
      </v-col>

      <v-col cols="12" sm="3" md="3">
        <v-form ref="uploadform">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-file</v-icon>檔案上傳
          </h3>
          <v-text-field solo placeholder="點此選擇檔案" />
        </v-form>
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn color="pink" dark large class="mb-sm-8 mb-md-8">
          <v-icon class="mr-1">mdi-cloud-upload</v-icon>上傳
        </v-btn>
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
    <!-- 新增發電機定期檢查表(月) modal -->
    <v-dialog v-model="Add" max-width="900px">
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
            <v-col cols="12">
              <p>1.依職業安全衛生法第23條規定辦理。</p>
              <p>2.依檢查結果選擇良好、不良、無此項目。</p>
              <p>3.缺點由使用單位自行改善，不克者委請設備商修護。</p>
              <p>4.本表於月底前完成檢查，經主管核章後，留存於各檢查單位，保存五年備查。</p> 
            </v-col>
            <!-- 檢查項目 -->
            <v-col cols="12">
              <v-row no-gutter class="indigo--text">
                <v-col cols="12" sm="4">
                  <dateSelect
                    label="檢查日期"
                    v-model="CheckDay"
                    key="dateStart"
                    :showIcon="formIconShow"
                  />
                </v-col>
                <!-- <v-col cols="12" sm="4">
                  <h3 class="mb-1">管理單位</h3>
                  <v-text-field solo value readonly />
                </v-col> -->
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">檢查人員</h3>
                  <v-text-field solo v-model="doMan.name"/>
                </v-col>
              </v-row>
              <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">檢查項目</h3>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">檢查方法</h3>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">檢查結果</h3>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">備註</h3>
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
                  <v-col cols="12" sm="3">{{ item.checkMethod }}</v-col>
                  <v-col cols="12" sm="3">
                    <span class="d-sm-none error--text">檢查結果：</span>
                    <v-radio-group dense row v-model="ipt.items[idx].status" class="pa-0 ma-0">
                      <v-radio color="success" label="良好" value="1"></v-radio>
                      <v-radio color="red" label="不良" value="2"></v-radio>
                      <v-radio color="black" label="無此項目" value="3"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-textarea hide-details auto-grow outlined rows="3" v-model="ipt.items[idx].note"/>
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
            <!-- 改善建議、改善追蹤 -->
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">改善建議</h3>
              <v-textarea auto-grow outlined rows="4" v-model="memo_2"/>
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">改善措施</h3>
              <v-textarea auto-grow outlined rows="4" v-model="memo_3"/>
            </v-col>
            <!-- END 檢查項目 -->
          </v-row>
        </div>

        <v-card-actions class="px-5 pb-5">
          <v-spacer></v-spacer>
          <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
          <!-- <v-btn color="success" elevation="4" :loading="isLoading" @click="save">送出</v-btn> -->
          <v-btn color="success" @click="save">送出</v-btn>
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
      title: "發電機定期檢查表(月)",
      newText: "檢查表",
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
      DB_Table: "RP008",
      doMan:{
        id: '',
        name: '',
        depart: '',
        checkManName: ''
      },
      memo_2: "",
      memo_3: "",
      nowTime: "",
      headers: [
        // 表格顯示的欄位
        { text: "項次", value: "ItemNo", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "保養日期", value: "CheckDay", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "審查狀態", value: "CheckStatus", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "填寫人", value: "Name", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "保養單位", value: "DepartName", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "功能", value: "content", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
      ],
      tableItems: [],
      Add: false,
      dialog3: false,
      formDepartOptions: [  // 通報單位下拉選單
            { text: '不限', value: '' },
            ...formDepartOptions,
        ],
      pageOpt: { page: 1 }, // 目前頁數
      ipt2: {},
      defaultIpt: {  // 預設的欄位值
          startDay: '',
          EndDay: '',
          depart: '',  // 單位
        },
      ipt: {
        department: "",
        date: new Date().toISOString().substr(0, 10),
        items: [
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
        ],
      },
      items: [
        { question: "1. 發電機室內周圍環境是否良好", checkMethod: "目視點檢" },
        { question: "2. 各開關的切換動作情形是否良好", checkMethod: "動作測試" },
        { question: "3. 各種指示燈是否正常", checkMethod: "動作測試" },
        { question: "4. 潤滑油質.油量.油管是否正常", checkMethod: "動作測試" },
        { question: "5. 料油泵油管艕", checkMethod: "動作測試" },
        { question: "6. 冷卻水質水管是否良好", checkMethod: "目視點檢" },
        { question: "7. 排氣管狀況是否正常", checkMethod: "目視點檢" },
        { question: "8. 充電電壓是否正常", checkMethod: "動作測試" },
        { question: "9. 蓄電池設備是否正常", checkMethod: "目視點檢" },
        { question: "10. 冷卻水出入口間之開關是否正常", checkMethod: "動作測試" },
        { question: "11. 燃料油管控制閥之開關是否正常", checkMethod: "動作測試" },
        { question: "12. 空氣槽及空氣壓縮機是否正常", checkMethod: "動作測試" },
        { question: "13. 起動動作確認", checkMethod: "動作測試" },
        { question: "14. 各計器及指示燈之指示", checkMethod: "目視點檢" },
        { question: "15. 發電機之引擎運轉狀態", checkMethod: "動作測試" },
        { question: "16. 電源切替", checkMethod: "動作測試" },
        { question: "17. 連續升載運轉狀態", checkMethod: "動作測試" },
        { question: "18. 連續升載投入性能", checkMethod: "動作測試" },
        { question: "19. 排氣管", checkMethod: "目視點檢" },
        { question: "20. 冷卻水循環", checkMethod: "目視點檢" },
        { question: "21. 空氣槽及空氣壓縮機", checkMethod: "目視點檢" },
        { question: "22. 運轉後燃料油量油溫水溫", checkMethod: "動作測試" },
        { question: "23. 引擎之皮帶及過濾器", checkMethod: "動作測試" },
        { question: "24. 保安裝置、保護網電器", checkMethod: "動作測試" },
      ],
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
    ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
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
        console.log("search final")
        this.chLoadingShow()
      })
    },
    // 存
    save() {
      console.log("送出!!")
      this.chLoadingShow()

      let arr = new Array()
      let obj = new Object()

      console.log("this.ipt.items[0].status: " + this.ipt.items[0].status)
      console.log("this.ipt.items[0].note: " + this.ipt.items[0].note)

      obj = new Object()
      obj.Column = "CheckDay"
      obj.Value = this.zs
      arr = arr.concat(obj)               

      let i;
      for (i = 0; i < 24; i++) {
        obj = new Object()
        obj.Column = "CheckOption" + (i+1)
        obj.Value = this.ipt.items[i].status
        arr = arr.concat(obj)

        obj = new Object()
        obj.Column = "Memo_" + (i+1)
        obj.Value = this.ipt.items[i].note
        arr = arr.concat(obj)
      }
      obj = new Object()
      obj.Column = "Advice"
      obj.Value = this.memo_2
      arr = arr.concat(obj)

      obj = new Object()
      obj.Column = "Measures"
      obj.Value = this.memo_3
      arr = arr.concat(obj)


      console.log(JSON.stringify(arr))

      createFormOrder0({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id this.doMan.name = this.userData.UserName
        // OperatorID: "16713",  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem:arr,
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
          "Memo_1",
          "CheckOption2",
          "Memo_2",
          "CheckOption3",
          "Memo_3",
          "CheckOption4",
          "Memo_4",
          "CheckOption5",
          "Memo_5",
          "CheckOption6",
          "Memo_6",
          "CheckOption7",
          "Memo_7",
          "CheckOption8",
          "Memo_8",
          "CheckOption9",
          "Memo_9",
          "CheckOption10",
          "Memo_10",
          "CheckOption11",
          "Memo_11",
          "CheckOption12",
          "Memo_12",
          "CheckOption13",
          "Memo_13",
          "CheckOption14",
          "Memo_14",
          "CheckOption15",
          "Memo_15",
          "CheckOption16",
          "Memo_16",
          "CheckOption17",
          "Memo_17",
          "CheckOption18",
          "Memo_18",
          "CheckOption19",
          "Memo_19",
          "CheckOption20",
          "Memo_20",
          "CheckOption21",
          "Memo_21",
          "CheckOption22",
          "Memo_22",
          "CheckOption23",
          "Memo_23",
          "CheckOption24",
          "Memo_24",
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
        // let ad = Object.keys(dat[0])
        // console.log(ad)
        //   for(let key of Object.keys(dat[0])){
        //     console.log(">>> " + key)
        //     console.log((dat[0])[key])
        //   }
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
        // var step = 0;
        // var DBIndx = 0
        // this.ipt.items[0].status = dat[0].CheckOption1; //4
        // this.ipt.items[0].note = dat[0].Memo_1; //5
        // this.ipt.items[1].status = dat[0].CheckOption2 //6
        // this.ipt.items[1].note = dat[0].Memo_2
        // this.ipt.items[2].status = dat[0].CheckOption3
        // this.ipt.items[2].note = dat[0].Memo_3
        // this.ipt.items[3].status = dat[0].CheckOption4
        // this.ipt.items[3].note = dat[0].Memo_4
        // this.ipt.items[4].status = dat[0].CheckOption5
        // this.ipt.items[4].note = dat[0].Memo_5
        // this.ipt.items[5].status = dat[0].CheckOption6
        // this.ipt.items[5].note = dat[0].Memo_6
        // this.ipt.items[6].status = dat[0].CheckOption7
        // this.ipt.items[6].note = dat[0].Memo_7
        // this.ipt.items[7].status = dat[0].CheckOption8
        // this.ipt.items[7].note = dat[0].Memo_8
        // this.ipt.items[8].status = dat[0].CheckOption9
        // this.ipt.items[8].note = dat[0].Memo_9
        // this.ipt.items[9].status = dat[0].CheckOption10
        // this.ipt.items[9].note = dat[0].Memo_10
        // this.ipt.items[10].status = dat[0].CheckOption11
        // this.ipt.items[10].note = dat[0].Memo_11
        // this.ipt.items[11].status = dat[0].CheckOption12
        // this.ipt.items[11].note = dat[0].Memo_12
        // this.ipt.items[12].status = dat[0].CheckOption13
        // this.ipt.items[12].note = dat[0].Memo_13
        // this.ipt.items[13].status = dat[0].CheckOption14
        // this.ipt.items[13].note = dat[0].Memo_14
        // this.ipt.items[14].status = dat[0].CheckOption15
        // this.ipt.items[14].note = dat[0].Memo_15
        // this.ipt.items[15].status = dat[0].CheckOption16
        // this.ipt.items[15].note = dat[0].Memo_16
        // this.ipt.items[16].status = dat[0].CheckOption17
        // this.ipt.items[16].note = dat[0].Memo_17
        // this.ipt.items[17].status = dat[0].CheckOption18
        // this.ipt.items[17].note = dat[0].Memo_18
        // this.ipt.items[18].status = dat[0].CheckOption19
        // this.ipt.items[18].note = dat[0].Memo_19
        // this.ipt.items[19].status = dat[0].CheckOption20
        // this.ipt.items[19].note = dat[0].Memo_20
        // this.ipt.items[20].status = dat[0].CheckOption21
        // this.ipt.items[20].note = dat[0].Memo_21
        // this.ipt.items[21].status = dat[0].CheckOption22
        // this.ipt.items[21].note = dat[0].Memo_22
        // this.ipt.items[22].status = dat[0].CheckOption23
        // this.ipt.items[22].note = dat[0].Memo_23
        // this.ipt.items[23].status = dat[0].CheckOption24
        // this.ipt.items[23].note = dat[0].Memo_24
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
