<template>
<v-container style="max-width: 1200px">
  <v-row>
    <v-col cols="4">
      <v-btn class="btn-close white--text" large :to="`/smis/car-safe-performance/${acdcode}/accident-trend/${acdname}`">
        回上一頁
      </v-btn>
    </v-col>
    <v-col cols="2">
      <v-select
        solo
        hide-details
        :items="yearSelect"
        v-model="selectYear"
        @change="AccidentYearQuery"
      ></v-select>
    </v-col>
    <v-col cols="4">
      <h2 class="label-title">年{{decodeURIComponent(acdname)}}事故原因比例</h2>
    </v-col>
    <v-col cols="2" />
    <v-col cols="4">
      <v-row>
        <v-col cols="12" class="text-center align-center">
          <h3 class="label-header">第一層原因</h3>
        </v-col>
        <v-col cols="12">
          <ChartPie :chartdata="Lv1Chart.chartdata" :options="Lv1Chart.options" :key="Lv1Chart.componentKey" />
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="8" class="pt-0 pr-1 pb-0 pl-0">
              <v-select
                solo
                hide-details
                :items="ReasonLv1"
                v-model="reasonSelect.Lv1"
              ></v-select>
            </v-col>
            <v-col cols="4" class="pa-0">
              <v-btn class="btn-memo white--text" large @click="searchLv1">
                事故列表
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="4">
      <v-row>
        <v-col cols="12" class="text-center align-center">
          <h3 class="label-header">第二層原因</h3>
        </v-col>
        <v-col cols="12">
          <ChartPie :chartdata="Lv2Chart.chartdata" :options="Lv2Chart.options" :key="Lv2Chart.componentKey" />
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="8" class="pt-0 pr-1 pb-0 pl-0">
              <v-select
                solo
                hide-details
                :items="ReasonLv2"
                v-model="reasonSelect.Lv2"
              ></v-select>
            </v-col>
            <v-col cols="4" class="pa-0">
              <v-btn class="btn-memo white--text" large @click="searchLv2">
                事故列表
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="4">
      <v-row>
        <v-col cols="12" class="text-center align-center">
          <h3 class="label-header">第三層原因</h3>
        </v-col>
        <v-col cols="12">
          <ChartPie :chartdata="Lv2Chart.chartdata" :options="Lv2Chart.options" :key="Lv2Chart.componentKey" />
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="8" class="pt-0 pr-1 pb-0 pl-0">
              <v-select
                solo
                hide-details
                :items="ReasonLv3"
                v-model="reasonSelect.Lv3"
              ></v-select>
            </v-col>
            <v-col cols="4" class="pa-0">
              <v-btn class="btn-memo white--text" large @click="searchLv3">
                事故列表
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" v-if="accidentTableLv1.showYN">
      <h3>第一層原因</h3>
      <v-data-table
        :headers="accidentTableLv1.header"
        :items="accidentTableLv1.item"  
        hide-default-footer
        class="theme-table"
      >
        <template v-slot:no-data>
          <span class="red--text subtitle-1">沒有資料</span>
        </template>

        <template v-slot:loading>
          <span class="red--text subtitle-1">資料讀取中...</span>
        </template>

        <template v-slot:footer="footer">
          <Pagination
            :footer="footer"
            :pageOpt="accidentTableLv1.pageOpt"
            @chPage="chPageLv1"
          />
        </template>
      </v-data-table>
    </v-col>
    <v-col cols="12" v-if="accidentTableLv2.showYN">
      <h3>第二層原因</h3>
      <v-data-table
        :headers="accidentTableLv2.header"
        :items="accidentTableLv2.item"  
        hide-default-footer
        class="theme-table"
      >
        <template v-slot:no-data>
          <span class="red--text subtitle-1">沒有資料</span>
        </template>

        <template v-slot:loading>
          <span class="red--text subtitle-1">資料讀取中...</span>
        </template>

        <template v-slot:footer="footer">
          <Pagination
            :footer="footer"
            :pageOpt="accidentTableLv2.pageOpt"
            @chPage="chPageLv2"
          />
        </template>
      </v-data-table>
    </v-col>
    <v-col cols="12" v-if="accidentTableLv3.showYN">
      <h3>第三層原因</h3>
      <v-data-table
        :headers="accidentTableLv3.header"
        :items="accidentTableLv3.item"  
        hide-default-footer
        class="theme-table"
      >
        <template v-slot:no-data>
          <span class="red--text subtitle-1">沒有資料</span>
        </template>

        <template v-slot:loading>
          <span class="red--text subtitle-1">資料讀取中...</span>
        </template>

        <template v-slot:footer="footer">
          <Pagination
            :footer="footer"
            :pageOpt="accidentTableLv3.pageOpt"
            @chPage="chPageLv3"
          />
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ChartPie from '@/components/chartPie'
import Pagination from '@/components/Pagination.vue'
import { accidentYearQuery, accidentYearQueryList } from '@/apis/smis/safetyPerformance'
import { getNowFullTime } from '@/assets/js/commonFun'
import { carAccReason } from '@/assets/js/smisData'
export default {
  props:['acdcode','acdname'],
  data: () => ({
    selectYear:'',
    yearSelect:[],
    Lv1Chart:{
      componentKey: 1,
      chartdata: {
        labels: ['未查明原因或其他','內部因素','外部因素'],
        datasets: [
          {
            data: [10,40,50],
            backgroundColor:['green','lightblue','blue'],
            // borderColor:['green','lightblue','blue']
          }
        ]
      },
      options: {
        title:{
          display: false,
          text:'',
          fontSize: 20,
          position: 'top'
        },
        legend:{
          display:false,
          align:'start',
          labels:{
            usePointStyle:true
          }
        },      
        tooltips:{
          enabled:true,
          callbacks: {
            label: function(tooltipItem, data) {
              var label = data.labels[tooltipItem.index] || '';

              if (label) {
                  label += ': ';
              }
              label += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]+'%';
              return label;
            }
          }
        } , 
        plugins: {
          datalabels: {
            align: "top",
            color: 'white',
            formatter: function(value, context) {
              // return context.chart.data.labels[context.dataIndex]+':'+value+'%';
              return value+'%';
            }
          },
        },
        elements:{
          arc:{
            borderWidth:2,
            borderColor:'white'
          }
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    },
    Lv2Chart:{
      componentKey: 1,
      chartdata: {
        labels: ['未查明原因或其他','內部因素','外部因素'],
        datasets: [
          {
            data: [40,30,30],
            backgroundColor:['green','lightblue','blue'],
            // borderColor:['green','lightblue','blue']
          }
        ]
      },
      options: {
        title:{
          display: false,
          text:'',
          fontSize: 20,
          position: 'top'
        },
        legend:{
          display:false,
          align:'start',
          labels:{
            usePointStyle:true
          }
        },   
        tooltips:{
          enabled:true,
          callbacks: {
            label: function(tooltipItem, data) {
              var label = data.labels[tooltipItem.index] || '';

              if (label) {
                  label += ': ';
              }
              label += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]+'%';
              return label;
            }
          }
        } ,      
        plugins: {
          datalabels: {
            display:true,
            align: "top",
            color: 'white',
            formatter: function(value, context) {
              return value+'%';
            }
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    },
    Lv3Chart:{
      componentKey: 1,
      chartdata: {
        labels: ['未查明原因或其他','內部因素','外部因素'],
        datasets: [
          {
            data: [20,40,40],
            backgroundColor:['green','lightblue','blue'],
            // borderColor:['green','lightblue','blue']
          }
        ]
      },
      options: {
        title:{
          display: false,
          text:'',
          fontSize: 20,
          position: 'top'
        },
        legend:{
          display:false,
          align:'start',
          labels:{
            usePointStyle:true
          }
        },  
        tooltips:{
          enabled:true,
          callbacks: {
            label: function(tooltipItem, data) {
              var label = data.labels[tooltipItem.index] || '';

              if (label) {
                  label += ': ';
              }
              label += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]+'%';
              return label;
            }
          }
        } ,       
        plugins: {
          datalabels: {
            display:true,
            align: "top",
            color: 'white',
            formatter: function(value, context) {
              return value+'%';
            }
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    },
    accidentTableLv1: {
      showYN:false,
      header:[
        { text: '發生時間', value: 'AccidentFindDate', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
        { text: '發生地點', value: 'FindLine', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
        { text: '事故種類', value: 'AccidentType', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
        { text: '處置過程及原因分析', value: 'FixProcess', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
        { text: '檢討改進事項', value: 'ReviewProcess', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
        { text: '人員死傷及設備受損情形', value: 'HurtPeopleCount', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
        { text: '運轉影響情形', value: 'OperationLost', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
        { text: '備註', value: 'RemarkDesp', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
      ],
      item:[
        {
          AccidentFindDate:'2020',
          FindLine:'測試地點',
          AccidentType:'測試種類',
          FixProcess:'測試過程與分析',
          ReviewProcess:'測試改進',
          HurtPeopleCount:'測試人員受傷',
          OperationLost:'測試不影響',
          RemarkDesp:'這是測試資料',
        }
      ],
      pageOpt: { page: 1 },  // 目前頁數
    },
    accidentTableLv2: {
      showYN: false,
      header:[
        { text: '發生時間', value: 'AccidentFindDate', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
        { text: '發生地點', value: 'FindLine', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
        { text: '事故種類', value: 'AccidentType', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
        { text: '處置過程及原因分析', value: 'FixProcess', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
        { text: '檢討改進事項', value: 'ReviewProcess', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
        { text: '人員死傷及設備受損情形', value: 'HurtPeopleCount', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
        { text: '運轉影響情形', value: 'OperationLost', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
        { text: '備註', value: 'RemarkDesp', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
      ],
      item:[
        {
          AccidentFindDate:'2020',
          FindLine:'測試地點',
          AccidentType:'測試種類',
          FixProcess:'測試過程與分析',
          ReviewProcess:'測試改進',
          HurtPeopleCount:'測試人員受傷',
          OperationLost:'測試不影響',
          RemarkDesp:'這是測試資料',
        }
      ],
      pageOpt: { page: 1 },  // 目前頁數
    },
    accidentTableLv3: {
      showYN: false,
      header:[
        { text: '發生時間', value: 'AccidentFindDate', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
        { text: '發生地點', value: 'FindLine', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
        { text: '事故種類', value: 'AccidentType', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
        { text: '處置過程及原因分析', value: 'FixProcess', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
        { text: '檢討改進事項', value: 'ReviewProcess', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
        { text: '人員死傷及設備受損情形', value: 'HurtPeopleCount', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
        { text: '運轉影響情形', value: 'OperationLost', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
        { text: '備註', value: 'RemarkDesp', align: 'center', class: 'subtitle-1 white--text font-weight-bold', width: '110' },
      ],
      item:[
        {
          AccidentFindDate:'2020',
          FindLine:'測試地點',
          AccidentType:'測試種類',
          FixProcess:'測試過程與分析',
          ReviewProcess:'測試改進',
          HurtPeopleCount:'測試人員受傷',
          OperationLost:'測試不影響',
          RemarkDesp:'這是測試資料',
        }
      ],
      pageOpt: { page: 1 },  // 目前頁數
    },
    allReasonList: [],
    reasonSelect: {
      Lv1: '',
      Lv2: '',
      Lv3: ''
    },
    colorSet: [
      'red',
      'pink',
      'purple',
      'deep-purple',
      'indigo',
      'blue',
      'light-blue',
      'cyan',
      'teal',
      'green',
      'light-green',
      'lime',
      'yellow',
      'amber',
      'orange',
      'deep-orange',
      'brown',
      'blue-grey'
    ]
  }),
  components: { 
    ChartPie,
    Pagination
  },
  computed: {
    ...mapState ('user', {
      userData: state => state.userData,  // 使用者基本資料
    }),
    ReasonLv1: function() {
      // const thisLevel = carAccReason.ReasonLv1
      const thisLevel = this.allReasonList.map(element=>({text:element.Lv1Name,value:element,Lv1Code}))
      return thisLevel
    },
    ReasonLv2: function() {
      const Lv1Value = this.reasonSelect.Lv1
      // const thisLevel = carAccReason.ReasonLv2[Lv1Value]||[]
      const thisLevel = this.allReasonList.find(element=>element.Lv1Code == Lv1Value)?.map(element=>({text:element.Lv2Name,value:element,Lv2Code}))||[]
      return thisLevel
    },
    ReasonLv3: function() {
      const Lv1Value = this.reasonSelect.Lv1
      const Lv2Value = this.reasonSelect.Lv2
      // const thisLevel = carAccReason.ReasonLv3[Lv2Value]||[]
      const thisLevel = this.allReasonList.find(element=>element.Lv1Code == Lv1Value)?.find(element=>element.Lv2Code == Lv2Value)?.map(element=>({text:element.Lv3Name,value:element,Lv3Code}))||[]
      return thisLevel 
    }
  },
  methods: {
    ...mapActions('system', [
      'chMsgbar',  // 改變 messageBar
      'chLoadingShow',  // 切換 loading 圖顯示
      'chViewDialog',  // 檢視內容 dialog
    ]),
    dataInit() {
      
      const today = new Date() 
      for( let i = today.getFullYear()-1 ; i >= (today.getFullYear() - 10) && i >= 2012 ; i--){
        this.yearSelect.push(i)
      }
      this.selectYear = today.getFullYear() - 1
      this.AccidentYearQuery()
      this.AccidentResonQueryList()
    },
    //圖表資料
    AccidentYearQuery() {
      accidentYearQuery({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        DTime_Start: this.selectYear,
        DTime_End: this.selectYear,
        AcdOption: this.acdcode,
      }).then(res=>{
        console.log(res.data)
        if (res.data.ErrorCode == 0) {
          this.Lv1Chart.chartdata.labels = []
          this.Lv1Chart.chartdata.datasets[0].data = []
          this.Lv1Chart.chartdata.datasets[0].backgroundColor = []
          res.data.DateListLv1.forEach((element,index)=>{
            this.Lv1Chart.chartdata.labels.push(element.Name)
            this.allReasonList.Lv1DataList.push({
              Lv1Code: element.Code,
              Lv1Name: element.Name
            })
            this.Lv1Chart.chartdata.datasets[0].data.push(elelment.Value)
            this.Lv1Chart.chartdata.datasets[0].backgroundColor.push(this.colorSet[index])
          })
          this.Lv1Chart.componentKey ++
          this.Lv2Chart.chartdata.labels = []
          this.Lv2Chart.chartdata.datasets[0].data = []
          this.Lv2Chart.chartdata.datasets[0].backgroundColor = []
          res.data.DateListLv2.forEach((element,index)=>{
            this.Lv2Chart.chartdata.labels.push(element.Name)
            this.allReasonList.Lv2DataList.push({
              Lv2Code: element.Code,
              Lv2Name: element.Name
            })
            this.Lv2Chart.chartdata.datasets[0].data.push(elelment.Value)
            this.Lv2Chart.chartdata.datasets[0].backgroundColor.push(this.colorSet[index])
          })
          this.Lv2Chart.componentKey ++
          this.Lv3Chart.chartdata.labels = []
          this.Lv3Chart.chartdata.datasets[0].data = []
          this.Lv3Chart.chartdata.datasets[0].backgroundColor = []
          res.data.DateListLv3.forEach((element,index)=>{
            this.Lv3Chart.chartdata.labels.push(element.Name)
            this.allReasonList.Lv3DataList.push({
              Lv3Code: element.Code,
              Lv3Name: element.Name
            })
            this.Lv3Chart.chartdata.datasets[0].data.push(elelment.Value)
            this.Lv3Chart.chartdata.datasets[0].backgroundColor.push(this.colorSet[index])
          })
          this.Lv3Chart.componentKey ++
        }else{
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          // this.$router.push({ path: '/error' })
        }
      }).catch( err => {
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
      })
    },
    AccidentResonQueryList() {
      accidentResonQueryList({
        ClientReqTime: getNowFullTime(),
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res=>{
        this.allReasonList = res.data.DataList.Lv1DataList
      }).catch( err => {
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料查詢失敗' })
      })
    },
    // 更換頁數
    chPageLv1(n) {
      this.accidentTableLv1.pageOpt.page = n
    },
    chPageLv2(n) {
      this.accidentTableLv2.pageOpt.page = n
    },
    chPageLv3(n) {
      this.accidentTableLv3.pageOpt.page = n
    },
    //查詢事件清單
    searchLv1() {
      accidentYearQueryList({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        DTime_Start: this.selectYear,
        DTime_End: this.selectYear,
        AcdOption: this.acdcode,
        LevelOptionLv1: this.reasonSelect.Lv1,
      }).then(res=>{
        if (res.data.ErrorCode == 0) {
          this.accidentTableLv1.item = res.data.DataList
          this.accidentTableLv1.showYN = true
        }else{
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          this.$router.push({ path: '/error' })
        }
      })
    },
    searchLv2() {
      accidentYearQueryList({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        DTime_Start: this.selectYear,
        DTime_End: this.selectYear,
        AcdOption: this.acdcode,
        LevelOptionLv2: this.reasonSelect.Lv2,
      }).then(res=>{
        if (res.data.ErrorCode == 0) {
          this.accidentTableLv2.item = res.data.DataList
          this.accidentTableLv2.showYN = true
        }else{
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          this.$router.push({ path: '/error' })
        }
      })
    },
    searchLv3() {
      accidentYearQueryList({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        DTime_Start: this.selectYear,
        DTime_End: this.selectYear,
        AcdOption: this.acdcode,
        LevelOptionLv3: this.reasonSelect.Lv3,
      }).then(res=>{
        if (res.data.ErrorCode == 0) {
          this.accidentTableLv3.item = res.data.DataList
          this.accidentTableLv3.showYN = true
        }else{
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          this.$router.push({ path: '/error' })
        }
      })
    }
  },
  mounted() {
    this.dataInit()
  }
}
</script>