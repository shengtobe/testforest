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

      <v-col cols="12" sm="3" md="3">
        <v-form ref="uploadform">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-file</v-icon>檔案上傳
          </h3>
          <v-text-field solo placeholder="點此選擇檔案" />
        </v-form>
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn dark large class="mb-sm-8 mb-md-8 btn-fileup">
          <v-icon class="mr-1">mdi-cloud-upload</v-icon>上傳
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
    <v-dialog v-model="Add" max-width="1000px">
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
            <v-col cols="12">
              <p>1.督檢紀錄表(請具體填寫)陳報單位主管核閱後交職安部門彙整及列入追蹤改善，單位主管需確實督導執行P.D.C.A之追蹤改善制度(繼續追蹤或解除追蹤)。</p>
              <p>2.本督檢紀錄表適用對象包含本處各部門及立約商。</p>
              <p>3.本表於月底前完成查核，經主管核章後，留存於管理單位之系統保存備查</p>
            </v-col>
            <!-- 檢查項目 -->
            <v-col cols="12">
              <v-row no-gutter class="label-header">
                <v-col cols="12" sm="3">
                  <dateSelect
                    label="督檢日期"
                    v-model="CheckDay"
                    key="dateStart"
                    :showIcon="formIconShow"
                  />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">督檢作業場所</h3>
                  <v-text-field solo value  v-model="place"/>
                </v-col>
              </v-row>
              <v-row no-gutter class="label-header d-none d-sm-flex font-weight-black">
                <v-col cols="12" sm="2">
                  <h3 class="mb-1">督檢內容</h3>
                </v-col>
                <v-col cols="12" sm="2">
                  <h3 class="mb-1">法令內容</h3>
                </v-col>
                <v-col cols="12" sm="2">
                  <h3 class="mb-1">督檢結果</h3>
                </v-col>
                <v-col cols="12" sm="2">
                  <h3 class="mb-1">建議改善事項</h3>
                </v-col>
                <v-col cols="12" sm="2">
                  <h3 class="mb-1">處理情形、完成日期</h3>
                </v-col>
                <v-col cols="12" sm="2">
                  <h3 class="mb-1">備註</h3>
                </v-col>
              </v-row>
              <v-alert
                dense
                border="top"
                colored-border
                color="border-bg-dark-yellow"
                elevation="4"
                v-for="(item, idx) in items"
                :key="idx"
                class="mb-6"
              >
                <v-row no-gutter>
                  <v-col cols="12" sm="2">{{ item.question }}</v-col>
                  <v-col cols="12" sm="2">{{ item.decree }}</v-col>
                  <v-col cols="12" sm="2">
                    <v-checkbox class="mx-2" v-model="ipt.items[idx].status" label="符合"></v-checkbox>
                  </v-col>
                  <v-col cols="12" sm="2">
                      <v-textarea auto-grow outlined rows="2" v-model="ipt.items[idx].note"/>
                  </v-col>
                  <v-col cols="12" sm="2">
                      <v-textarea hide-details auto-grow outlined rows="2" v-model="ipt.items[idx].note2"/>
                  </v-col>
                  <v-col cols="12" sm="2">
                      <v-textarea hide-details auto-grow outlined rows="2" v-model="ipt.items[idx].note3"/>
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
            <!-- 改善建議、改善追蹤 -->
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
import UploadOneFileAdd from '@/components/UploadOneFileAdd.vue';
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
      title: "各級主管走動管理督檢紀錄暨追蹤表(每月2 次)",
      newText: "追蹤表",
      isLoading: false,
      disabled: false,
      file: null,
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
      Add: false,
      dialog3: false,
      place:"",
      formDepartOptions: [
        // 通報單位下拉選單
        { text: "不限", value: "" },
        ...formDepartOptions,
      ],
      pageOpt: { page: 1 }, // 目前頁數
      //---api---
      DB_Table: "RP015",
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
        { text: "項次", value: "ItemNo", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "督檢日期", value: "CheckDay", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "審查狀態", value: "CheckStatus", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "填寫人", value: "Name", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "督檢單位", value: "DepartName", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "功能", value: "content", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
      ],
      tableItems: [],
      //------
      ipt: {
        department: "",
        // name: JSON.parse(localStorage.getItem("user")).name,
        date: new Date().toISOString().substr(0, 10),
        items: [
          { status: false, note: "", note2:"", note3:"" },
          { status: false, note: "", note2:"", note3:"" },
          { status: false, note: "", note2:"", note3:"" },
          { status: false, note: "", note2:"", note3:"" },
          { status: false, note: "", note2:"", note3:"" },
          { status: false, note: "", note2:"", note3:"" },
          { status: false, note: "", note2:"", note3:"" },
        ],
      },
      items: [
        { question: "1.工作安全防護具", decree: "依安全衛生工作守則 配戴適當之個人防護器具(安全帽、反光背心)" },
        { question: "2.工地場所安全防護設施", decree: "依安全衛生工作守則對於各種防護設施，非經主管核准不得任意拆卸或改裝" },
        { question: "3.人員、機具安全避讓，攜帶配備或操作人員資格符合等事項", decree: "依安全衛生工作守則對於路線上、橋隧內作業規定特殊地段作業應指派瞭望員、應攜帶無線電、哨子以及通訊器具等" },
        { question: "4.在路線上工作，應向臨近車站填寫機動道班車使用申請單或承攬商填寫保安裝置保修申請書申請單，經許可始可進入施工區施工", decree: "依運轉規章規定，辦理路線隔斷或路線封鎖等作業。" },
        { question: "5.工作場所之機械設備、起重機、挖掘機、堆高機、台車等，依期限辦理自主管理檢查等事項", decree: "依職業安全衛生法第23條第四項及職業安全衛生管理辦法內容辦理" },
        { question: "6.對工作場所實施確認勤前教育、工作分配、危害之認知等事項", decree: "依職業安全衛生法第32條內容辦理" },
        { question: "7.其他 (有關安全狀況、行為)", decree: "依各業務單位維護工作安全所制定之工作規章等內容" },
      ],
      suggest: "", // 改善建議
    };
  },
  components: { Pagination, dateSelect, deptSelect, UploadOneFileAdd }, // 頁碼
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
    select(file) {
        this.file = file
    },
    initInput(){
      console.log("init create window form")
      this.doMan.name = this.userData.UserName;
      this.CheckDay = getTodayDateString();
      this.zs = this.nowTime;
      this.place = "";
      var step;
      for (step = 0; step < 7; step++) {
        this.ipt.items[step].status = false
        this.ipt.items[step].note = ""
        this.ipt.items[step].note2 = ""
        this.ipt.items[step].note3 = ""
      }
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
    search() {
      console.log("Search click");
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
      })
    },
    // 存
    save() {
      console.log("送出!!")
      this.chLoadingShow()

      let arr = new Array()
      let obj = new Object()

      obj = new Object()
      obj.Column = "CheckDay"
      obj.Value = this.zs
      arr = arr.concat(obj)

      obj = new Object()
      obj.Column = "Place"
      obj.Value = this.place
      arr = arr.concat(obj)

      let i;
      for (i = 0; i < 7; i++) {
        obj = new Object()
        obj.Column = "CheckOption" + (i+1)
        obj.Value = this.ipt.items[i].status == true?"1":"2"
        arr = arr.concat(obj)

        obj = new Object()
        obj.Column = "CheckAdvice" + (i+1)
        obj.Value = this.ipt.items[i].note
        arr = arr.concat(obj)

        obj = new Object()
        obj.Column = "CheckDescription" + (i+1)
        obj.Value = this.ipt.items[i].note2
        arr = arr.concat(obj)

        obj = new Object()
        obj.Column = "CheckMemo" + (i+1)
        obj.Value = this.ipt.items[i].note3
        arr = arr.concat(obj)
      }

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
          "CheckDay",//0
          "DepartName",//1
          "Name",//2
          "Place",//3
          "CheckOption1",//4
          "CheckAdvice1",//5
          "CheckDescription1",//6
          "CheckMemo1",//7
          "CheckOption2",//8
          "CheckAdvice2",//9
          "CheckDescription2",//10
          "CheckMemo2",//11
          "CheckOption3",//12
          "CheckAdvice3",//13
          "CheckDescription3",//14
          "CheckMemo3",//15
          "CheckOption4",//16
          "CheckAdvice4",//17
          "CheckDescription4",//18
          "CheckMemo4",//19
          "CheckOption5",//20
          "CheckAdvice5",//21
          "CheckDescription5",//22
          "CheckMemo5",//23
          "CheckOption6",//24
          "CheckAdvice6",//25
          "CheckDescription6",//26
          "CheckMemo6",//27
          "CheckOption7",//28
          "CheckAdvice7",//29
          "CheckDescription7",//30
          "CheckMemo7",//31
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
        this.place = dat[0].Place
        var i = 0, j = 0;
        for(let key of Object.keys(dat[0])){
          if(i >= 4 && i <= 31){
            if(i % 4 == 0){
              this.ipt.items[j].status = (dat[0])[key] == "1"?true:false
              console.log("ipt.items[" + j + "].status: " + this.ipt.items[j].status + " >> key:" + key)
            }
            else if (i % 4 == 1){
              this.ipt.items[j].note = (dat[0])[key]
              console.log("ipt.items[" + j + "].note: " + this.ipt.items[j].note + " >> key:" + key)
            }
            else if (i % 4 == 2){
              this.ipt.items[j].note2 = (dat[0])[key]
              console.log("ipt.items[" + j + "].note2: " + this.ipt.items[j].note2 + " >> key:" + key)
            }
            else{
              this.ipt.items[j].note3 = (dat[0])[key]
              console.log("ipt.items[" + j + "].note3: " + this.ipt.items[j].note3 + " >> key:" + key)
              j++
            }
          }
          i++
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
