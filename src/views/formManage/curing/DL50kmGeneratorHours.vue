<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2 label-title">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2 label-header">
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
            <v-text-field v-model.trim="z" solo v-on="on" readonly clearable @click:clear="timeClean(1)"></v-text-field>
          </template>
          <v-date-picker color="purple" v-model="z" @input="time(1)"
            :max="dateAMax" locale="zh-tw"></v-date-picker>
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
            <v-text-field v-model.trim="df" solo v-on="on" readonly clearable @click:clear="timeClean(2)"></v-text-field>
          </template>
          <v-date-picker color="primary" 
          v-model="df" @input="time(2)"
            :min="dateBMin" locale="zh-tw"></v-date-picker>
        </v-menu>
      </v-col>
      <div class="col-sm-4 col-md-8 col-12">
        <v-btn dark large class="mb-sm-8 mb-md-8 btn-search" @click="search">
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
      </div>
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
    <!-- 新增DL50號機車行駛公里及發電機工時統計表 modal -->
    <v-dialog v-model="Add" persistent max-width="900px">
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
                  <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>填寫日期
                  </h3>
                  <v-menu
                    v-model="dateMenuShow"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model.trim="ipt.date"
                            solo
                            v-on="on"
                            readonly
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        color="purple"
                        v-model="ipt.date"
                        @input="dateMenuShow = false"
                        locale="zh-tw"
                    ></v-date-picker>
                </v-menu>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>司機員
                  </h3>
                  <v-text-field solo v-model="ipt.driver"/>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>行駛區間
                  </h3>
                  <v-text-field solo v-model="ipt.section"/>
                </v-col>
              </v-row>
              <v-row no-gutter class="label-header">
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>本次行駛公里
                  </h3>
                  <v-text-field solo v-model="ipt.currentKm" />
                </v-col>

                <v-col cols="12" sm="3">
                  <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>累計公里數
                  </h3>
                  <v-text-field solo v-model="ipt.totalKm" />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>列車次
                  </h3>
                  <v-text-field solo v-model="ipt.carId" />
                </v-col>
              </v-row>
              <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
                <v-expansion-panel>
                  <v-expansion-panel-header color="btn-expansion" class="white--text">發電機
                    <template v-slot:actions>
                      <v-icon color="dropdownicon">
                        $expand
                      </v-icon>
                    </template>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row
                      no-gutter
                      class="label-header d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">日工時</h3>
                        <v-text-field solo v-model="items1.dayTime" />
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">累計工時</h3>
                        <v-text-field solo v-model="items1.totalTime" />
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header color="btn-expansion" class="white--text">耗用油量類別
                    <template v-slot:actions>
                      <v-icon color="dropdownicon">
                        $expand
                      </v-icon>
                    </template>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row
                      no-gutter
                      class="label-header d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">柴油</h3>
                        <v-text-field solo v-model="items2.diesel" />
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">引擎機油</h3>
                        <v-text-field solo v-model="items2.engineOil" />
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">TC機油</h3>
                        <v-text-field solo v-model="items2.tc" />
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">風泵</h3>
                        <v-text-field solo v-model="items2.windPump" />
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">其他</h3>
                        <v-text-field solo v-model="items2.other" />
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
            <!-- END 檢查項目 -->
            <!-- 改善建議、改善追蹤 -->
            <v-col cols="12">
              <h3 class="mb-1 label-header">保養記事</h3>
              <v-textarea auto-grow outlined rows="4" v-model="memo" />
            </v-col>
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
import { mapState, mapActions } from 'vuex'
import { getNowFullTime, getTodayDateString, unique} from "@/assets/js/commonFun";
import { maintainStatusOpts } from '@/assets/js/workList'
import { fetchFormOrderList, fetchFormOrderOne, createFormOrder, createFormOrder0, updateFormOrder } from '@/apis/formManage/serve'
import { formDepartOptions } from '@/assets/js/departOption'
import { Constrant } from "@/assets/js/constrant";

export default {
  data() {
    return {
      title: "DL50號機車行駛公里及發電機工時統計表",
      newText: "統計表",
      isEdit: false,
      isLoading: false,
      disabled: false,
      panel: [0, 1, 2],
      dateAMax: '',
      dateBMin: '',
      disabled: false,
      readonly: false,
      formDepartOptions: [
        // 通報單位下拉選單
        { text: "不限", value: "" },
        ...formDepartOptions,
      ],
      dateMenuShow: false,
      RPFlowNo: '',
      a: "",
      ass: "",
      aff: "",
      add: false,
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
      pageOpt: { page: 1 }, // 目前頁數
      //---api---
      DB_Table: "RP066",
      nowTime: "",
      doMan:{
        id: '',
        name: '',
        depart: '',
        checkManName: ''
      },
      ipt:{},
      defaultIpt: {
        driver: "", // 司機員
        section: "", // 區段
        currentKm: "", // 本次里程
        totalKm: "", // 累計里程
        carId: "", // 列車次  
        date: new Date().toISOString().substr(0, 10), // 填寫時間
      },
      iptSearch: {},
      defaultSearchIpt: {  // 預設的欄位值
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
      
      items1: [{ dayTime: "", totalTime: "" }],
      items2: [{ diesel: "", engineOil: "", tc: "", windPump: "", other: "" }],
      defaultItems1: [{ dayTime: "", totalTime: "" }],
      defaultItems2: [{ diesel: "", engineOil: "", tc: "", windPump: "", other: "" }],
      memo: "", // 保養記事
    };
  },
  components: { Pagination }, // 頁碼
  computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
  },
  created() {
      this.iptSearch = { ...this.defaultSearchIpt }
      this.ipt = this.defaultIpt;
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
      this.z = this.df = this.dateAMax = this.dateBMin = this.nowTime
  },
  methods: {
    initInput(){
      this.doMan.name = this.userData.UserName;
      this.zs = this.nowTime;
      this.ipt = {...this.defaultIpt};
      this.items1 = {...this.defaultItems1};
      this.items2 = {...this.defaultItems2};
      this.memo = ""
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
      this.Add = true
      this.isEdit = false
      this.initInput();
    },
    ...mapActions('system', [
          "chMsgbar", // messageBar
          'chLoadingShow',  // 切換 loading 圖顯示
        ]),
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    time(i){
      if(i == 1){
        this.a = false
        this.dateBMin = this.z
      }
      else{
        this.q = false
        this.dateAMax = this.df
      }
    },
    timeClean(i){
      if(i == 1){
        this.dateBMin = ''
      }
      else{
        this.dateAMax = ''
      }
    },
    // 搜尋
    search() {
      let d1 = Date.parse(this._data.z)
      let d2 = Date.parse(this._data.df)
      if(d1 > d2){
        alert('時間範圍錯誤')
        return
      }
      this.chLoadingShow({show:true})
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {'Column':'StartDayVlaue','Value':this._data.z},
          {"Column":"EndDayVlaue","Value":this._data.df},
          {"Column":"DepartCode","Value":this._data.iptSearch.depart},
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
        let diesel = unique(tbBuffer)
        this.tableItems = diesel
      }).catch(err => {
        //console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow({ show: false})
      })
    },
    // 存
    save() {
      var data = {
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.userData.UserId, // 操作人id this.doMan.name = this.userData.UserName
        // OperatorID: "16713",  // 操作人id
        RPFlowNo: (this.isEdit)?this.RPFlowNo:'',
        FunCode: (this.isEdit)?'U':'C',
        KeyName: this.DB_Table, // DB table
        KeyItem: [
          {'Column':'CheckDay','Value': this.ipt.date}, // 司機員
          {'Column':'Driver','Value': this.ipt.driver}, // 司機員
          {'Column':'KmRecord','Value': this.ipt.section}, // 區段
          {'Column':'Km','Value': this.ipt.currentKm}, // 本次里程
          {'Column':'AccumKm','Value': this.ipt.totalKm}, // 累計里程
          {'Column':'TrainNo','Value': this.ipt.carId}, // 列車次
          {'Column':'HourDay','Value': this.items1.dayTime}, // 發電機日工時
          {'Column':'Hours','Value': this.items1.totalTime}, // 發電機累計工時
          {'Column':'DieselOil','Value': this.items2.diesel}, // 柴油
          {'Column':'EngineOil','Value': this.items2.engineOil}, // 引擎機油
          {'Column':'TCOil','Value': this.items2.tc}, // TC機油
          {'Column':'WindMercury','Value': this.items2.windPump}, // 風泵
          {'Column':'Other','Value': this.items2.other}, // 其他
          {'Column':'Memo','Value': this.memo}, // 保養記事
        ]
      };
      if(this.isEdit == true){
        // 編輯
        updateFormOrder(data)
          .then((res) => {
            // 
            this.chMsgbar({ success: true, msg: Constrant.update.success });
          })
          .catch((err) => {
            //console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.update.failed });
          })
          .finally(() => {
            this.Add = false
            this.initInput()
            this.chLoadingShow({ show: false});
            this.search();
          });
      }
      else{
        // 新增
        createFormOrder0(data)
          .then((res) => {
            this.chMsgbar({ success: true, msg: Constrant.insert.success });
          })
          .catch((err) => {
            ////console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.insert.failed });
          })
          .finally(() => {
            this.Add = false
            this.initInput()
            this.chLoadingShow({ show: false});
            this.search();
          });
      }
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
      this.isEdit = true
      this.chLoadingShow({show:true})
        // 依業主要求變更檢式頁面的方式，所以改為另開分頁
        fetchFormOrderOne({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {'Column':'RPFlowNo','Value':item.RPFlowNo},
                ],
        QyName:[
          "RPFlowNo",
          "CheckDay",
          "Driver",
          "KmRecord",
          "Km",
          "AccumKm",
          "HourDay",
          "Hours",
          "DieselOil",
          "EngineOil",
          "TCOil",
          "WindMercury",
          "Other",
          "TrainNo",
          "Memo",
        ],
      }).then(res => {
        this.initInput();
        let dat = JSON.parse(res.data.DT)
        this.Add = true
        // this.zs = res.data.DT.CheckDay
        // this.doMan.name = dat[0].Name
        // let time1 = dat[0].CheckDay.substr(0,10)
        this.RPFlowNo = dat[0].RPFlowNo
        this.ipt.date = dat[0].CheckDay
        this.ipt.driver = dat[0].Driver
        this.ipt.section = dat[0].KmRecord
        this.ipt.currentKm = dat[0].Km
        this.ipt.totalKm = dat[0].AccumKm
        this.items1.dayTime = dat[0].HourDay
        this.items1.totalTime = dat[0].Hours
        this.items2.diesel = dat[0].DieselOil
        this.items2.engineOil = dat[0].EngineOil
        this.items2.tc = dat[0].TCOil
        this.items2.windPump = dat[0].WindMercury
        this.items2.other = dat[0].Other
        this.ipt.carId = dat[0].TrainNo
        this.memo = dat[0].Memo
        //123資料
        
      }).catch(err => {
        //console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow({ show: false})
      })
    },//viewPage
  },
};
</script>
