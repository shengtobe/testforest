<template>
<v-container style="max-width: 1200px">
  
  <v-row>
    <v-col cols="12" md="2">
      <v-btn class="btn-close" dark large :to="`/smis/car-safe-performance-analysis`">
        回上一頁
      </v-btn>
    </v-col>
    <v-col cols="12" md="8" class="text-center">
      <h2 class="label-title mb-4">{{decodeURIComponent(acdname)}}控制措施執行成效</h2>
    </v-col>
  </v-row>
  <v-row>
    <template v-if="decodeURIComponent(acdname)!='慢行路段分析'">
      <v-col offset-sm="6" offset-md="10" cols="12" sm="6" md="2">
         <v-select
          :items="TypeSelect"
          v-model="selectedType"
          solo
          @change="initChart"
        ></v-select>
      </v-col>
      <v-col cols="12" class="text-center align-center">
        <ChartBar :chartdata="Chart.chartdata" :options="Chart.options" :key="Chart.componentKey" />
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="6" md="3">
            <v-select
              solo
              :items="selectItem"
              v-model="selectedYM"
              >
            </v-select>
          </v-col>
          <v-col cols="6" md="3">
            <v-btn class="btn-memo" dark large @click="initTable">
              異常列表
            </v-btn>
          </v-col>
          <v-col cols="0" md="6"></v-col>
        </v-row>
        <v-row v-if="workOrderTable.showYN">
          <v-col cols="12">
            <v-data-table
              :headers="TabeleField"
              :items="workOrderTable.items"  
              hide-default-footer
              class="theme-table"
              >
              <template v-slot:no-data>
                <span class="red--text subtitle-1">沒有資料</span>
              </template>

              <template v-slot:loading>
                <span class="red--text subtitle-1">資料讀取中...</span>
              </template>
            
              <template v-slot:item.OverSpeedStatus="{ item }">
                {{ item.OverSpeedStatus }}級
              </template>

              <template v-slot:item.ErrorDesp="{ item }">
                <v-btn class="btn-add" rounded dark @click="goOpen('異常說明',item.ErrorDesp)">
                  <v-icon dark>mdi-clipboard-outline</v-icon>
                </v-btn>
              </template>

              <template v-slot:item.ErrorCheckStatus="{ item }">
                <v-btn class="btn-add" rounded dark @click="goOpen('異常處理情形',item.ErrorCheckStatus)">
                  <v-icon dark>mdi-clipboard-outline</v-icon>
                </v-btn>
              </template>

              <template v-slot:footer="footer">
                <Pagination
                  :footer="footer"
                  :pageOpt="workOrderTable.pageOpt"
                  @chPage="chPage"
                />
              </template>
            </v-data-table>
            <v-dialog v-model="ShowDetail.Dialog" max-width="600px">
              <v-card class="theme-card">
                <v-card-title class="white--text px-4 py-1">
                  {{ ShowDetail.Title }}
                  <v-spacer></v-spacer>
                  <v-btn dark fab small text @click="ShowDetail.Dialog = false" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-title>
                {{ ShowDetail.Detail }}
                <v-card-actions class="px-5 pb-5">
                  <v-btn class="mr-2 btn-close white--text" elevation="4" @click="ShowDetail.Dialog = false"
                    >關閉</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-col>
    </template>
    <template v-else>
      <v-col cols="1" class="text-center grey"></v-col>
      <v-col cols="2">無資料</v-col>
      <v-col cols="1" class="text-center green"></v-col>
      <v-col cols="2">過去1年慢行天數30天以下</v-col>
      <v-col cols="1" class="text-center yellow"></v-col>
      <v-col cols="2">過去1年慢行天數31~90天</v-col>
      <v-col cols="1" class="text-center red"></v-col>
      <v-col cols="2">過去1年慢行天數91天以上</v-col>
      <v-expansion-panels focusable class="mt-1">
        <v-expansion-panel
          v-for="(item,i) in trainSpeed"
          :key="i"
        >
          <v-expansion-panel-header class="metal-dark-yellow-top white--text font-weight-bold text-subtitle-1">{{item.lineName}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="1"></v-col>
              <v-col cols="1"><sup>0K</sup></v-col>
              <v-col cols="1"><sup>1K</sup></v-col>
              <v-col cols="1"><sup>2K</sup></v-col>
              <v-col cols="1"><sup>3K</sup></v-col>
              <v-col cols="1"><sup>4K</sup></v-col>
              <v-col cols="1"><sup>5K</sup></v-col>
              <v-col cols="1"><sup>6K</sup></v-col>
              <v-col cols="1"><sup>7K</sup></v-col>
              <v-col cols="1"><sup>8K</sup></v-col>
              <v-col cols="1"><sup>9K</sup></v-col>
              <v-col cols="1"></v-col>
            </v-row>
            <v-row v-for="(cols,ind) in _getTotalRowCol(item)" :key="i+'R'+ind">
              <v-col cols="1" class="text-right"><sup>{{cols[0]}}K</sup></v-col>
              <v-col cols="1" v-for="(col,index) in cols" :key="i+'R'+ind+'C'+index">
                <div :class="'some_element '+getColor(item.lineCode,col)"></div>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>
  </v-row>
</v-container>
</template>

<script>

import { mapState, mapActions } from 'vuex'
import ChartBar from '@/components/chartBar'
import Pagination from '@/components/Pagination.vue'
import { accidentResonQueryList, Lv4_1, Lv4_2, Lv4_3, Lv4_4, Lv4_1List, Lv4_2List, Lv4_3List } from '@/apis/smis/safetyPerformance'
import { fetchOrganization } from '@/apis/organization'
import { getNowFullTime, groupBy } from '@/assets/js/commonFun'
export default {
  props:['acdcode','acdname'],
  data: () => ({
    yearSelect:[],
    Chart:{
      componentKey: 1,
      chartdata: {
        labels:[],
        datasets: [
          {
            borderWidth: '1',
            barPercentage: 1,
            data: []
          }
        ]
      },
      options: {  
        tooltips:{
          enabled:true
        }, 
        legend:{
          display:false,
        },    
        plugins: {
          datalabels: {
            align: "top",
            anchor: "end",
            clamp :true,
            color: function(context) {
              return context.dataset.borderColor
            },
            formatter: function(value, context) {
              return (context.dataset.type=="line")?'':context.dataset.label;
            }
          },
          kwhWeek:true
        },
        scales: {
          yAxes: [{
            scaleLabel:{
              display: true,
              labelString: '次數',
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 10,
            }
          }],
          xAxes: [{
            scaleLabel:{
              display: true,
              labelString: '年-月',
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 100,
            }
          }]
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    },
    workOrderTable:{
      showYN: false,
      pageOpt: { page: 1 },
      header:[
        { text: '工單編號', value: 'FlowId', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
        { text: '故障主旨', value: 'Title', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
        { text: '處理階段', value: 'Level', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
        { text: '檢視內容', value: 'Extend', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
      ],
      items:[
        {FlowId:'TEST0001',Title:'測試工單',Level:'報修階段'}
      ],
    },
    selectItem:[],
    trainSpeed:[
      { 
        lineName:'本線',
        lineCode:'l1',
        rangeMin: 0,
        rangeMax: 71.350
      },
      { 
        lineName:'眠月線',
        lineCode:'l2',
        rangeMin: 0,
        rangeMax: 2.84
      },
      { 
        lineName:'祝山線',
        lineCode:'l3',
        rangeMin: 0,
        rangeMax: 3.247
      },
      { 
        lineName:'水山線',
        lineCode:'l4',
        rangeMin: 0,
        rangeMax: 1.6
      },
    ],
    selectedType: 'T',
    selectedYM: '',
    ShowDetail:{
      Dialog: false,
      Title: '',
      Detail: ''
    },
    orgList: [],
    SpeedList:{}
  }),
  components: { 
    ChartBar,
    Pagination
  },
  computed: {
    ...mapState ('user', {
      userData: state => state.userData,  // 使用者基本資料
    }),
    TypeSelect() {
      let rtnObj = []
      switch(this.acdcode){
        case 'O4':
          rtnObj = [
            { value:'T', text:'總計'},
            ...this.orgList.map(e=>({value: e.value,text:e.text}))
          ]
          break;
        case 'O5':
          rtnObj = [
            { value: 'T', text:'總計'},
            { value: '1', text:'機車'},
            { value: '2', text:'客車'}
          ]
          break;
        case 'O6':
          rtnObj = [
            { value:'T', text:'總計' },
            { value:'1', text:'1級' },
            { value:'2', text:'2級' },
            { value:'3', text:'其他' },
          ]
          break;
        case 'O7':
          rtnObj = [
            { value:'T', text:'總計' },
            { value:'1', text:'1級' },
            { value:'2', text:'2級' },
            { value:'3', text:'其他' },
          ]
          break;
      }
      return rtnObj
    },
    TabeleField() {
      let rtnObj = []
      switch(this.acdcode){
        case 'O4':
          rtnObj = [
            { text: '日期', value: 'CheckDate', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '車次', value: 'CarVersion', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '車類型', value: 'CarType', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '車號', value: 'CarCode', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '異常說明', value: 'ErrorDesp', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '異常處理情形', value: 'ErrorCheckStatus', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
          ]
          break;
        case 'O5':
          rtnObj = [
            { text: '檢查日期', value: 'CheckDate', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '車次', value: 'CarVersion', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '異常單位名稱', value: 'ErrorDepart', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '異常人員', value: 'ErrorPeopleName', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '異常說明', value: 'ErrorDesp', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '異常處理情形', value: 'ErrorCheckStatus', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
          ]
          break;
        case 'O6':
          rtnObj = [
            { text: '檢查日期', value: 'CheckDate', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '車次', value: 'CarVersion', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '人員單位名稱', value: 'ErrorDepart', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '人員姓名', value: 'ErrorPeopleName', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '時間範圍', value: 'CarTimeRange', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '平均車速', value: 'AverageSpeed', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '每小時超出公里數', value: 'OverSpeed', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '超速狀態', value: 'OverSpeedStatus', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '異常概況', value: 'ErrorTitle', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '處理情形', value: 'ErrorCheckStatus', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '附件', value: 'ErrorDesp', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
          ]
          break;
      }
      return rtnObj
    }
  },
  methods: {
    ...mapActions('system', [
      'chMsgbar',  // 改變 messageBar
      'chLoadingShow',  // 切換 loading 圖顯示
      'chViewDialog',  // 檢視內容 dialog
    ]),
    getPast3YearPerMonth() {
      const today = new Date
      let thisYear = today.getFullYear() - 3  //先抓三年前
      const thisMonth = today.getMonth() + 1    //月份要加一
      let yearMonth
      for(let i = 37; i > 1 ; i--){
        let getMonth = (thisMonth - i<=0)?12 - Math.abs(thisMonth - i)%12:thisMonth - i;
        if(getMonth == 12){
          yearMonth = thisYear.toString()+'-'+((getMonth)>=10?'':'0')+(getMonth).toString()
          thisYear+=1
        }else{
          yearMonth = thisYear.toString()+'-'+((getMonth)>=10?'':'0')+(getMonth).toString()
        }
        this.selectItem.push(yearMonth)
      }
    },
    dataInit() {
      if(this.acdcode == 'O8') {
        this.$router.push({path:'/monitor/rainfall-monitor'})
      }
      this.getPast3YearPerMonth()
      if(this.acdcode == 'O4') {
        this._getOrg()
      }
      this.initChart()
    },
    chPage(n) {
      this.workOrderTable.pageOpt.page = n
    },
    initChart() {
      this.Chart.chartdata.datasets[0].data = []
      this.Chart.chartdata.labels = []
      const reqData = {
              ClientReqTime: getNowFullTime(),  // client 端請求時間
              OperatorID: this.userData.UserId,  // 操作人id
              DTime_Start: this.selectItem[0],
              DTime_End: this.selectItem[this.selectItem.length - 1],
            }
      switch(this.acdcode){
        case 'O4':
          Lv4_2({
            ...reqData,
            Option: (this.selectedType=='T'?'T':'1'),
            DepartCode: this.selectedType!='T'?this.selectedType:null
          }).then(res=>{
              if (res.data.ErrorCode == 0) {
                res.data.DataList.forEach(e=>{
                  this.Chart.chartdata.labels.push(e.Year + '-' + e.Month)
                  this.Chart.chartdata.datasets[0].data.push(e.Value)
                })
                this.Chart.componentKey ++
              }else{
                sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                this.$router.push({ path: '/error' })
              }
            }).catch( err => {
              this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
            })
          break;
        case 'O5':
          Lv4_1({
            ...reqData,
            Option: this.selectedType,
          }).then(res=>{
              if (res.data.ErrorCode == 0) {
                res.data.DataList.forEach(e=>{
                  this.Chart.chartdata.labels.push(e.Year + '-' + e.Month)
                  this.Chart.chartdata.datasets[0].data.push(e.Value)
                })
                this.Chart.componentKey ++
              }else{
                sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                this.$router.push({ path: '/error' })
              }
            }).catch( err => {
              this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
            })
          break;
        case 'O6':
          Lv4_3({
            ...reqData,
            Option: this.selectedType
          }).then(res=>{
              if (res.data.ErrorCode == 0) {
                res.data.DataList.forEach(e=>{
                  this.Chart.chartdata.labels.push(e.Year + '-' + e.Month)
                  this.Chart.chartdata.datasets[0].data.push(e.Value)
                })
                this.Chart.componentKey ++
              }else{
                sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                this.$router.push({ path: '/error' })
              }
            }).catch( err => {
              this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
            })
          break;
        case 'O7':
          const today = new Date
          let thisYear = today.getFullYear()
          Lv4_4({
            ClientReqTime: getNowFullTime(),  // client 端請求時間
            OperatorID: this.userData.UserId,  // 操作人id
            DTime_Start: thisYear,
            DTime_End: thisYear-1
          }).then(res=>{
              if (res.data.ErrorCode == 0) {
                console.log(res.data.DataList)
                this.SpeedList = groupBy(res.data.DataList,'ReportLine')
              }else{
                sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                this.$router.push({ path: '/error' })
              }
            }).catch( err => {
              this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
            })
          break;
      }
    },
    initTable() {
      this.workOrderTable.items = []
      const reqData = {
              ClientReqTime: getNowFullTime(),  // client 端請求時間
              OperatorID: this.userData.UserId,  // 操作人id
              DTime_Start: this.selectedYM,
              DTime_End: this.selectedYM,
            }
      switch(this.acdcode){
        case 'O4':
          Lv4_2List({
            ...reqData,
            Option: (this.selectedType=='T'?'T':'1'),
            DepartCode: this.selectedType!='T'?this.selectedType:null
          }).then(res=>{
              if (res.data.ErrorCode == 0) {
                console.log(res.data)
                this.workOrderTable.items = res.data.DataList
              }else{
                sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                this.$router.push({ path: '/error' })
              }
            }).catch( err => {
              this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
            })
          break;
        case 'O5':
          Lv4_1List({
            ...reqData,
            Option: this.selectedType
          })
            .then(res=>{
              if (res.data.ErrorCode == 0) {
                console.log(res.data)
                this.workOrderTable.items = res.data.DataList
              }else{
                sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                this.$router.push({ path: '/error' })
              }
            }).catch( err => {
              this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
            })
          break;
        case 'O6':
          Lv4_3List({
            ...reqData,
            Option: this.selectedType
          })
            .then(res=>{
              if (res.data.ErrorCode == 0) {
                console.log(res.data)
                this.workOrderTable.items = res.data.DataList
              }else{
                sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                this.$router.push({ path: '/error' })
              }
            }).catch( err => {
              this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
            })
          break;
      }
      this.workOrderTable.showYN = true
    },
    goOpen(title,detail) {
      this.ShowDetail = {
        Dialog: true,
        Title: title,
        Detail: detail
      }
    },
    getColor(line,col) {
      const getValue = this.SpeedList[line]?.find(e=>e.LimitStart==col)?.Value||''
      switch(getValue){
        case '1':
          return 'green'
        case '2':
          return 'yellow'
        case '3':
          return 'red'
        default:
          return 'grey'
      }
    },
    //------
    _getTotalRowCol(item) {
      let thisMin = Math.floor(item.rangeMin)
      let thisMax = Math.floor(item.rangeMax)
      let rowMax = Math.floor(thisMax/10)
      let countRow = []
      let countCol = []
      for(let row = Math.floor(thisMin/10) ; row <= rowMax ; row ++) {
        countCol = []
        for(let col = 0 ;( (row<rowMax && col < 10) || (row==rowMax && col <= thisMax%10) ); col ++) {
          countCol.push(row*10+col)
        }
        countRow.push(countCol)
      }
      return countRow
    },
    _getOrg() { //抓單位
      fetchOrganization({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res=>{
        if (res.data.ErrorCode == 0) {
          let rtndata = res.data
          console.log('data',rtndata)
          const dept3 = rtndata.user_depart_list_group_3.map(ele => {
            let rtnObj3 = {}
            rtnObj3.value = ele.DepartCode
            rtnObj3.text = ele.DepartName
            rtnObj3.group = ele.DepartParentName
            return rtnObj3
          })
          let dept2 = rtndata.user_depart_list_group_2.map(ele => {
            let rtnObj2 = {}
            rtnObj2.value = ele.DepartCode
            rtnObj2.text = ele.DepartName
            rtnObj2.group = ele.DepartParentName
            return rtnObj2
          })
          let dept1 = rtndata.user_depart_list_group_1.map(ele => {
            let rtnObj1 = {}
            rtnObj1.value = ele.DepartCode
            rtnObj1.text = ele.DepartName
            rtnObj1.group = ele.DepartName
            return rtnObj1
          })
          const that = this
          dept1.forEach(ele => {
            that.orgList.push(ele)
            let rtnArr2 = dept2.filter(element => {
              return element.group == ele.text
            })
            rtnArr2.forEach(element => {
              that.orgList.push(element)
              let rtnArr3 = []
              rtnArr3 = dept3.filter(item => {
                return item.group == element.text
              })
              rtnArr3.forEach(items => {
                that.orgList.push(items)
              })
            })
          })
        }else{
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          this.$router.push({ path: '/error' })
        }
      }).catch( err => {
        console.warn(err)
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
      }).finally(() => {
        this.orgIsLoading = false
      })
    },
  },
  mounted() {
    this.dataInit()
  }
}
</script>
<style scoped>
.some_element {
  position: relative;
  width: 70%;
  height: 0;
  margin-left: 30%;
  padding-bottom: 70%;
} 
</style>