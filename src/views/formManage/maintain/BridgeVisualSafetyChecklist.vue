<template>
  <v-container style="max-width: 1200px">
    <!-- 標題 -->
    <h2 class="mb-4 px-2 label-title">{{ title }}</h2>
    <!-- 查詢區塊 -->
    <v-row class="px-2 label-header">
      <!-- 日期-起 -->
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="檢查日期(起)"
          key="dateStart"
          :showIcon="formData.settings.formIconShow"
          v-model="formData.searchItem.dateStart"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="檢查日期(迄)"
          key="dateEnd"
          :showIcon="formData.settings.formIconShow"
          v-model="formData.searchItem.dateEnd"
        />
      </v-col>
      <!-- 功能 -->
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn dark large class="mb-sm-8 mb-md-8 btn-search" @click="search">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
      </v-col>

      <v-col cols="12" sm="3" md="3"/>
      
      <v-col cols="12" sm="3" >
        <h3 id="mb-1"><v-icon class="mr-1">mdi-plus</v-icon>新增</h3>
        <v-select id="s01" solo style="width:180px;" placeholder="橋梁編號" return-object dense single-line 
        :items="sbjNum" outlined @change="s01Change"/>
      </v-col>
      <v-col cols="12" sm="3" >
        <v-btn style="margin-top:10%" class="ml-4 ml-sm-4 ml-md-4 mb-sm-8 mb-md-8 btn-add" elevation="3" dark large 
        @click="btnNew">
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </v-col>
    </v-row>
    <!-- 查詢結果 -->
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
              <v-icon dark>mdi-pen</v-icon>
            </v-btn>
            <v-btn
              title="刪除"
              small
              dark
              fab
              class="btn-delete"
              @click="deleteRecord(item.RPFlowNo)"
            >
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
  </v-container>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from 'vuex'
import { getNowFullTime, getTodayDateString, unique} from "@/assets/js/commonFun";
import { maintainStatusOpts } from '@/assets/js/workList'
import dateSelect from "@/components/forManage/dateSelect";
import deptSelect from "@/components/forManage/deptSelect";
import { fetchFormOrderList, fetchFormOrderOne, createFormOrder, createFormOrder0, updateFormOrder } from '@/apis/formManage/serve'
import { formDepartOptions } from '@/assets/js/departOption'
import { Actions } from "@/assets/js/actions";
import dialogDelete from "@/components/forManage/dialogDelete";
import ToolBar from "@/components/forManage/toolbar";

export default {
  data() {
    return {
      // 自定義變數
      title: "橋梁目視安全檢查表",
      newText: "檢查表",
      isLoading: false,
      disabled: false,
      formDepartOptions: [
        // 通報單位下拉選單
        { text: "不限", value: "" },
        ...formDepartOptions,
      ],
      formData: {
        settings: {
          formIconShow: true,
        },
        searchItem: {
          dateStart: "",
          dateEnd: "",
          department: "",
        },
      },
      n01: "0",
      CheckdayOn: "",
      QueryCheckdayOn: "",
      CheckdayOff: "",
      QueryCheckdayOff: "",
      AddWorkLogModal: false,
      MaintenanceDay: "",
      sbjNum: [],
      AddData: {
        // 新增表單資料
        MaintenanceDay: "", // 保養日
      },
      // 系統變數
      pageOpt: { page: 1 }, // 目前頁數
      //---api---
      DB_Table: "RP038",
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
        { text: "保養日期", value: "CheckDay", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "審查狀態", value: "CheckStatus", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "填寫人", value: "Name", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "保養單位", value: "DepartName", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "功能", value: "content", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
      ],
      tableItems: [],
      //------
    };
  },
  components: {
    Pagination, // 頁碼
    dateSelect,
    deptSelect,
    ToolBar,
    dialogDelete,
  },
  computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
  created:function(){
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

    var i = 1;
    for(i; i <= 26; i++ ){
      this.sbjNum.push("編號" + i);
    }
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
    s01Change(selectObj){
      console.log("select is changed >> " + selectObj);
      this.n01 = selectObj;
      // this.n01 = selectObj.substr(2);
    },
    btnNew(){
      console.log("Add new form btn is pressed");
      if(this.n01 != "0"){
        console.log("n01: " + this.n01)
        this.$router.push(`/form-manage/maintain/bridge-visual-safety-checklist-add/${this.n01}/newone`)
      }
      else{
        window.alert("請選擇橋梁編號");
      }
    },
    // 新增監工區塊欄位
    addSupervisor() {},
    // 搜尋
    search() {
      console.log("Search click");
      this.chLoadingShow({show:true})
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {'Column':'StartDayVlaue','Value':this.formData.searchItem.dateStart},
          {"Column":"EndDayVlaue","Value":this.formData.searchItem.dateEnd},
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
        this.chLoadingShow({show:false})
      })
    },
    // 存
    save() {},
    // 關閉 dialogx
    closeWorkLogModal() {
      this.AddWorkLogModal = false;
    },
    viewPage(item) {
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
          "CheckDay",//0
          "BridgeID",//1
          "Engineer",//2
          "WorksChief",//3
          "Supervisor",//4
          "LineType",//5
          "CheckOption1",//6
          "CheckOption1HazLv",//7
          "CheckOption2",//8
          "CheckOption2HazLv",//9
          "CheckOption3",//10
          "CheckOption3HazLv",//11
          "CheckOption4",//12
          "CheckOption4HazLv",//13
          "CheckOption5",//14
          "CheckOption5HazLv",//15
          "CheckOption6",//16
          "CheckOption6HazLv",//17
          "CheckOption7",//18
          "CheckOption7HazLv",//19
          "CheckOption8",//20
          "CheckOption9",//21
          "CheckOption9HazLv",//22
          "CheckOption10",//23
          "CheckOption11",//24
          "CheckOption12",//25
          "CheckOption13",//26
          "CheckOption14",//27
          "CheckOption15",//28
          "CheckOption16",//29
          "CheckOption17",//30
          "CheckOption18",//31
          "Memo",//32
        ],
      }).then(res => {
        console.log("viewPage start!!!!!!")
        // this.initInput();
        console.log(res.data.DT)
        let dat = JSON.parse(res.data.DT)
        console.log("data time: " + dat[0].CheckDay)
        // this.Add = true
        // this.zs = res.data.DT.CheckDay
        let time1 = dat[0].CheckDay.substr(0,10)
        console.log("data time1: " + time1)
        this.zs = time1
        console.log("doMan name: " + this.doMan.name)
        //123資料
        let ad = Object.keys(dat[0])
        console.log(ad)
        let dataArr = []
        var i = 0;
        for(let key of Object.keys(dat[0])){
          console.log("key: " + key)
          console.log("(dat[0])[key]: " + (dat[0])[key])
          let vv = ((dat[0])[key] == null)?' ':(dat[0])[key];
          let asciiCode = ""
          if(vv.length > 1){
            let charArr = []
            for (var i = 0; i < vv.length; i++) {
              charArr.push(vv[i].charCodeAt(0))
            }
            asciiCode = charArr.join('_')
          }
          else{
            asciiCode = vv.charCodeAt(0)
          }
          
          console.log("asciiCode: " + asciiCode)
          dataArr.push(asciiCode);
          i++
        }
        console.log("dataArr: ")
        console.log(dataArr)
        let StrForNextPage = "";
        StrForNextPage = dataArr.join();
        console.log("StrForNextPage: " + StrForNextPage);
        this.$router.push(`/form-manage/maintain/bridge-visual-safety-checklist-add/${StrForNextPage}/newone`)

        
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

<style>
.iwidth {
  width: 65px;
}
.xwd {
  max-width: 13%;
}
@media only screen and (max-width: 600px) {
  .xwd {
    max-width: 100%;
  }
}
</style>