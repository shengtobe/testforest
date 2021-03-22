<template>
<v-container style="max-width: 1200px">
  
  <v-row>
    <v-col cols="12" md="2">
      <v-btn color="secondary" large :to="`/smis/car-safe-performance/${encodeURIComponent(acdname)}/accident-trend`">
        回上一頁
      </v-btn>
    </v-col>
    <v-col cols="12" md="8" class="text-center">
      <h2 class="mb-4">{{decodeURIComponent(acdname)}}趨勢分析</h2>
    </v-col>
    <v-col cols="0" md="2" />
    <v-col cols="8" class="text-center align-center">
      <h3>{{decodeURIComponent(acdname)}}第一層原因</h3>
    </v-col>
    <v-col cols="4">
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
          <v-btn color="primary" large @click="searchLv1">
            事故列表
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <ChartLine :chartdata="Lv1Chart.chartdata" :options="Lv1Chart.options" :key="Lv1Chart.componentKey" />
      <v-data-table
        v-if="accidentTableLv1.showYN"
        :headers="accidentTableLv1.header"
        :items="accidentTableLv1.item"  
        hide-default-footer
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
    <v-col cols="8" class="text-center align-center">
      <h3>{{decodeURIComponent(acdname)}}第二層原因</h3>
    </v-col>
    <v-col cols="4">
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
          <v-btn color="primary" large @click="searchLv2">
            事故列表
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <ChartLine :chartdata="Lv2Chart.chartdata" :options="Lv2Chart.options" :key="Lv2Chart.componentKey" />
      <v-data-table
        v-if="accidentTableLv2.showYN"
        :headers="accidentTableLv2.header"
        :items="accidentTableLv2.item"  
        hide-default-footer
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
    <v-col cols="8" class="text-center align-center">
      <h3>{{decodeURIComponent(acdname)}}第三層原因</h3>
    </v-col>
    <v-col cols="4">
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
          <v-btn color="primary" large @click="searchLv3">
            事故列表
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <ChartBar :chartdata="Lv3Chart.chartdata" :options="Lv3Chart.options" :key="Lv3Chart.componentKey" />
      <v-data-table
        v-if="accidentTableLv3.showYN"
        :headers="accidentTableLv3.header"
        :items="accidentTableLv3.item"  
        hide-default-footer
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
import ChartLine from '@/components/chartLine'
import ChartBar from '@/components/chartBar'
import Pagination from '@/components/Pagination.vue'
import { accidentResonQueryList } from '@/apis/smis/safetyPerformance'
import { getNowFullTime } from '@/assets/js/commonFun'
export default {
  props:['acdname'],
  data: () => ({
    yearSelect:[],
    Lv1Chart:{
      componentKey: 1,
      chartdata: {
        labels: ['2012','2013','2014','2015','2016','2017','2018','2019','2020','2021'],
        datasets: [
          {
            label:'未查明原因或其他',
            pointStyle:'rectRot',
            borderColor: 'black',
            backgroundColor:'white',
            data: [0,0,0,0,0,0,0,0,0,0],
            lineTension: 0
          },
          {
            label:'內部原因',
            pointStyle:'circle',
            borderColor: 'red',
            backgroundColor:'white',
            data: [50,25,33,77,0,75,46,73,10,57],
            lineTension: 0
          },
          {
            label:'外部原因',
            pointStyle:'rect',
            borderColor: 'blue',
            backgroundColor:'white',
            data: [50,75,67,23,100,25,54,27,90,43],
            lineTension: 0
          }
        ]
      },
      options: {
        title:{
          display: true,
          text:'',
          fontSize: 20,
          position: 'top'
        },
        legend:{
          display:true,
          align:'start',
          labels:{
            usePointStyle:true
          }
        },      
        tooltips:{
          enabled:false
        } , 
        plugins: {
          datalabels: {
            align: "top",
            anchor: "start",
            clamp :true,
            color: function(context) {
              return context.dataset.borderColor
            },
            formatter: function(value, context) {
              return value+'%';
            }
          },
        },
        scales: {
          yAxes: [{
            scaleLabel:{
              display: true,
              labelString: '所占比例',
            },
            ticks: {
              suggestedMax: 100,
              callback: function(label, index, labels) {
                  return label+'%';
              }
            }
          }],
          xAxes: [{
            scaleLabel:{
              display: true,
              labelString: '年分',
            },
            ticks: {
              autoSkip: false
            }
          }]
        },
        responsive: true,
        maintainAspectRatio: false,
        elements:{
          line:{
            fill:false,
            borderWidth: 1,
          },
          point:{
            borderWidth: 1,
          },
        },
      },
    },
    Lv2Chart:{
      componentKey: 1,
      chartdata: {
        labels: ['2012','2013','2014','2015','2016','2017','2018','2019','2020','2021'],
        datasets: [
          {
            label:'員工人為因素',
            pointStyle:'rectRot',
            borderColor: 'orange',
            backgroundColor:'white',
            data: [10,65,12,0,0,0,0,0,0,0,0],
            lineTension: 0
          },
          {
            label:'車輛',
            borderColor: 'red',
            backgroundColor:'white',
            data: [13,7,15,0,0,0,0,0,0,0,0],
            lineTension: 0
          },
          {
            label:'路線',
            borderColor: 'pink',
            backgroundColor:'white',
            data: [15,7,17,0,0,0,0,0,0,0,0],
            lineTension: 0
          },
          {
            label:'乘客',
            borderColor: 'brown',
            backgroundColor:'white',
            data: [44,7,22,0,0,0,0,0,0,0,0],
            lineTension: 0
          },
          {
            label:'第三方',
            borderColor: 'lightblue',
            backgroundColor:'white',
            data: [6,7,25,0,0,0,0,0,0,0,0],
            lineTension: 0
          },
          {
            label:'天氣與環境',
            borderColor: 'blue',
            backgroundColor:'white',
            data: [12,7,9,0,0,0,0,0,0,0,0],
            lineTension: 0
          }
        ]
      },
      options: {
        title:{
          display: true,
          text:'',
          fontSize: 20,
          position: 'top'
        },
        legend:{
          display:true,
          align:'start',
          labels:{
            usePointStyle:true
          }
        },        
        plugins: {
          datalabels: {
            display:false,
            align: "top",
            anchor: "end",
            color: function(context) {
              return context.dataset.borderColor
            },
            formatter: function(value, context) {
              return value+'%';
            }
          },
        },
        scales: {
          yAxes: [{
            scaleLabel:{
              display: true,
              labelString: '所占比例',
            },
            ticks: {
              suggestedMax: 100,
              callback: function(label, index, labels) {
                  return label+'%';
              }
            }
          }],
          xAxes: [{
            scaleLabel:{
              display: true,
              labelString: '年分',
            },
            ticks: {
              autoSkip: false
            }
          }]
        },
        responsive: true,
        maintainAspectRatio: false,
        elements:{
          line:{
            fill:false,
            borderWidth: 1,
          },
          point:{
            borderWidth: 1,
          },
        },
      },
    },
    Lv3Chart:{
      componentKey: 1,
      chartdata: {
        labels: ['2012','2013','2014','2015','2016','2017','2018','2019','2020','2021'],
        datasets: [
          {
            label:'維修人員',
            borderColor: 'orange',
            backgroundColor:'orange',
            data: [15,65,13,0,0,0,0,0,0,0,0],
            lineTension: 0
          },
          {
            label:'調度與號誌員',
            borderColor: 'red',
            backgroundColor:'red',
            data: [35,12,15,0,0,0,0,0,0,0,0],
            lineTension: 0
          },
          {
            label:'司機員',
            borderColor: 'brown',
            backgroundColor:'brown',
            data: [44,12,27,0,0,0,0,0,0,0,0],
            lineTension: 0
          },
          {
            label:'其他人為因素',
            borderColor: 'lightblue',
            backgroundColor:'lightblue',
            data: [6,11,45,0,0,0,0,0,0,0,0],
            lineTension: 0
          }
        ]
      },
      options: {
        title:{
          display: true,
          text:'',
          fontSize: 20,
          position: 'top'
        },
        legend:{
          display:true,
          align:'start',
          labels:{
            usePointStyle:true
          }
        },        
        plugins: {
          datalabels: {
            display:false,
            align: "top",
            anchor: "end",
            color: function(context) {
              return context.dataset.borderColor
            },
            formatter: function(value, context) {
              return value+'%';
            }
          },
        },
        scales: {
          yAxes: [{
            stacked: true,
            scaleLabel:{
              display: true,
              labelString: '所占比例',
            },
            ticks: {
              suggestedMax: 100,
              callback: function(label, index, labels) {
                  return label+'%';
              }
            }
          }],
          xAxes: [{
            stacked: true,
            scaleLabel:{
              display: true,
              labelString: '年分',
            },
            ticks: {
              autoSkip: false
            }
          }]
        },
        responsive: true,
        maintainAspectRatio: false,
        elements:{
          line:{
            fill:false,
            borderWidth: 1,
          },
          point:{
            borderWidth: 1,
          },
        },
      },
    },
    accidentTableLv1: {
      showYN: false,
      header:[
        { text: '發生時間', value: 'AccidentFindDate', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '發生地點', value: 'FindLine', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '事故種類', value: 'AccidentType', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '處置過程及原因分析', value: 'FixProcess', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '檢討改進事項', value: 'ReviewProcess', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '人員死傷及設備受損情形', value: 'HurtPeopleCount', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '運轉影響情形', value: 'OperationLost', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '備註', value: 'RemarkDesp', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
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
        { text: '發生時間', value: 'AccidentFindDate', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '發生地點', value: 'FindLine', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '事故種類', value: 'AccidentType', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '處置過程及原因分析', value: 'FixProcess', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '檢討改進事項', value: 'ReviewProcess', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '人員死傷及設備受損情形', value: 'HurtPeopleCount', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '運轉影響情形', value: 'OperationLost', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '備註', value: 'RemarkDesp', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
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
        { text: '發生時間', value: 'AccidentFindDate', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '發生地點', value: 'FindLine', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '事故種類', value: 'AccidentType', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '處置過程及原因分析', value: 'FixProcess', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '檢討改進事項', value: 'ReviewProcess', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '人員死傷及設備受損情形', value: 'HurtPeopleCount', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '運轉影響情形', value: 'OperationLost', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '備註', value: 'RemarkDesp', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
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
    }
  }),
  components: { 
    ChartLine,
    ChartBar,
    Pagination
  },
  computed: {
    ...mapState ('user', {
      userData: state => state.userData,  // 使用者基本資料
    }),
    ReasonLv1: function() {
      const thisLevel = this.allReasonList.Lv1DataList
      return thisLevel?.map(e=>({
        value:e.Lv1Code,
        text:e.Lc1Name
      }))||[]
    },
    ReasonLv2: function() {
      const Lv1Value = this.reasonSelect.Lv1
      const thisLevel = this.allReasonList.Lv1DataList?.find(el=>el.Lv1Code==Lv1Value).Lv2DataList||[]
      return thisLevel?.map(e=>({
        value:e.Lv2Code,
        text:e.Lc2Name
      }))||[]
    },
    ReasonLv3: function() {
      const Lv1Value = this.reasonSelect.Lv1
      const Lv2Value = this.reasonSelect.Lv2
      const thisLevel = this.allReasonList.Lv1DataList?.find(el=>el.Lv1Code==Lv1Value).Lv2DataList?.find(e=>e.Lv2Code==Lv2Value).Lv3DataList||[]
      return thisLevel?.map(e=>({
        value:e.Lv3Code,
        text:e.Lc3Name
      }))||[]
    }
  },
  methods: {
    ...mapActions('system', [
      'chMsgbar',  // 改變 messageBar
      'chLoadingShow',  // 切換 loading 圖顯示
      'chViewDialog',  // 檢視內容 dialog
    ]),
    dataInit() {
      this.Lv1Chart.componentKey ++
      this.Lv2Chart.componentKey ++
      this.Lv3Chart.componentKey ++
      accidentResonQueryList({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res=>{
        if (res.data.ErrorCode == 0) {
          this.allReasonList = res.data.DataList
        }else{
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          this.$router.push({ path: '/error' })
        }
      }).catch( err => {
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
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
      this.accidentTableLv1.showYN = true
    },
    searchLv2() {
      this.accidentTableLv2.showYN = true
    },
    searchLv3() {
      this.accidentTableLv3.showYN = true
    }
  },
  mounted() {
    this.dataInit()
  }
}
</script>