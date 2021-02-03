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
      <v-col cols="12" sm="4" md="3">
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
      <div class="col-sm-4 col-md-8 col-12">
        <v-btn color="green" dark large class="col-4 col-md-2 mr-3">
          <v-icon>mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn
          color="indigo"
          elevation="3"
          dark
          large
          @click="newOne"
        >
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </div>
    </v-row>
    <v-dialog v-model="dialog3" persistent max-width="290">
      <v-card>
        <v-card-title class="red white--text px-4 py-1 headline">確認是否刪除?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="close">取消</v-btn>
          <v-btn color="success">刪除</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
            <v-btn title="編輯" class="mr-2" small dark fab color="info darken-1" @click="Add = true">
              <v-icon dark>mdi-pen</v-icon>
            </v-btn>
            <v-btn title="刪除" small dark fab color="red" @click="dialog3 = true">
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
    <!-- 新增SL-31維修資料 modal -->
    <v-dialog v-model="Add" max-width="600px">
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
            <!-- 選擇車號 -->
            <v-row>
              <v-col cols="12" sm="2" style="margin-top:2%; margin-left:2%;margin-right:-8%">
                <h3 class="mb-1" >車號</h3>
              </v-col>
              <v-col cols="12" sm="3">
                <v-select :items="
                [{ text: 'SL', value: 'sl' }, 
                { text: 'DL', value: 'dl' }, 
                ]" solo />
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field solo></v-text-field>
              </v-col>
            </v-row>
            <!-- 保養日期 -->
            <v-col cols="8" sm="4">
              <h3 class="mb-1">保養日期</h3>
              <v-menu
                v-model="qz"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field hide-details v-model="wx" v-on="on" solo />
                </template>
                <v-date-picker color="purple" v-model="wx" @input="qz = false" locale="zh-tw" />
              </v-menu>
            </v-col>
            <!-- 地點 -->
            <v-col cols="8" sm="4">
              <h3 class="mb-1">累計公里數</h3>
              <v-text-field v-model="pp" :rules="nameRules" required solo />
            </v-col>
            <!-- 填寫人 -->
            <v-col cols="8" sm="4">
              <h3 class="mb-1">填寫人</h3>
              <v-text-field v-model="yy" solo />
            </v-col>
            <!-- 破損及不良部分 -->
            <v-col cols="12">
              <v-textarea
                hide-details
                label="破損及不良部分"
                auto-grow
                outlined
                rows="6"
                v-model.trim="oo"
              />
            </v-col>
            <!-- 狀況及原因 -->
            <v-col cols="12">
              <v-textarea hide-details label="狀況及原因" auto-grow outlined rows="6" v-model.trim="ii" />
            </v-col>
            <!-- 處置 -->
            <v-col cols="12">
              <v-textarea hide-details label="處置" auto-grow outlined rows="6" v-model.trim="uu" />
            </v-col>
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
import { fetchFormOrderList, fetchFormOrderOne, createFormOrder, createFormOrder0 } from '@/apis/formManage/serve'
import { formDepartOptions } from '@/assets/js/departOption'

export default {
  data: () => ({
    title: "SL__/DL__進廠維修紀錄",
    newText: "維修紀錄",
    isLoading: false,
    disabled: false,
    DB_Table: "RP045",
    Add: false,
    dialog3: false,
    formDepartOptions: [
        // 通報單位下拉選單
        { text: "", value: "" },
        ...formDepartOptions,
      ],
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
        text: "地點",
        value: "ss",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "車號",
        value: "carid",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "破損及不良部分",
        value: "dd",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "狀況及原因",
        value: "ff",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "處置",
        value: "gg",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "填寫人",
        value: "hh",
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
    ],
    tableItems: [
      {
        aa: "2020-08-01",
        ss: "修理工廠",
        carid: "SL-013",
        dd: "施行二級保養",
        ff: "下次二級:109-09-01",
        gg: "V",
        hh: "王大明"
      },
      {
        aa: "2020-08-10",
        ss: "阿庫",
        carid: "DL-201",
        dd: "更換引擎機油",
        ff: "更換引擎機油",
        gg: "V",
        hh: "王大明"
      }
    ],
    ipt: {
        CarHeadCode: "",
        CarNo: "",
        Km:"",
        Memo_1: "",
        Memo_2: "",
        Memo_3: "",
    }

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
    initInput(){
      this.doMan.name = this.userData.UserName;
      this.zs = this.nowTime;
      this.CarHeadCode = ""; //車號前置碼
      this.CarNo = "";//車號
      this.Km = ""; //累計公里數
      this.Memo_1 = "";//破損不良部分
      this.Memo_2 = "";//狀況及原因
      this.Memo_3 = "";//處置
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
    save() {
      console.log('送出click! 0222')
      this.chLoadingShow()
        
      let arr = new Array()
      let obj = new Object()

      console.log("this.ipt.items[0].status: " + this.ipt.items[0].status)
      console.log("this.ipt.items[0].note: " + this.ipt.items[0].note)

      obj = new Object()
      obj.Column = "CheckDay"
      obj.Value = this.nowTime
      arr = arr.concat(obj)      
      
      obj = new Object()
      obj.Column = "CarHeadCode"
      obj.Value = this.CarHeadCode
      arr = arr.concat(obj)

      obj = new Object()
      obj.Column = "CarNo"
      obj.Value = this.CarNo
      arr = arr.concat(obj)

      obj = new Object()
      obj.Column = "Km"
      obj.Value = this.CarNo
      arr = arr.concat(obj)

      obj = new Object()
      obj.Column = "Memo_1"
      obj.Value = this.Memo_1
      arr = arr.concat(obj)

      obj = new Object()
      obj.Column = "Memo_2"
      obj.Value = this.Memo_2
      arr = arr.concat(obj)

      obj = new Object()
      obj.Column = "Memo_3"
      obj.Value = this.Memo_3
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
          "CarHeadCode",
          "CarNo",
          "Km",
          "Memo_1",
          "Memo_2",
          "Memo_3",

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
        
        this.CarHeadCode = dat[0].CarHeadCode
        this.CarNo = dat[0].CarNo
        this.Km = dat[0].Km
        this.Memo_1 = dat[0].Memo_1
        this.Memo_2 = dat[0].Memo_2
        this.Memo_3 = dat[0].Memo_3
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
