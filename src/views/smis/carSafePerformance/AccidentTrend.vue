<template>
<v-container style="max-width: 1200px">
  
  <v-row>
    <v-col cols="12" md="2">
      <v-btn v-if="false" class="btn-close" dark large :to="`/smis/car-safe-performance-analysis`">
        回上一頁
      </v-btn>
    </v-col>
    <v-col cols="12" md="8" class="text-center">
      <h2 class="mb-4 label-title">{{decodeURIComponent(acdname)}}趨勢</h2>
    </v-col>
    <v-col cols="12">
      <ChartLine :chartdata="chartdata" :options="options" :key="chartKey"/>
    </v-col>
    <v-col cols="4" class="text-center pt-0">
      <v-row>
        <v-col cols="8">
          <v-select
            solo
            hide-details
            :items="yearSelect"
            v-model="searchipt.selectedYear"
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-btn class="btn-memo" dark large @click="goSearch">
            事故列表
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="4" class="text-center">
      <v-btn class="btn-memo" dark large :to="`/smis/car-safe-performance/${acdcode}/accident-analysis/${acdname}`">
        事故原因趨勢分析
      </v-btn>
    </v-col>
    <v-col cols="4" class="text-center">
      <v-btn class="btn-memo" dark large :to="`/smis/car-safe-performance/${acdcode}/year-analysis/${acdname}`">
        事故原因年度分析
      </v-btn>
    </v-col>
    <v-col cols="12" 
      v-if="accidentTable.showYN">
      <v-data-table
        :headers="accidentTable.header"
        :items="accidentTableItem"  
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
            :pageOpt="accidentTable.pageOpt"
            @chPage="chPage"
          />
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime, decodeObject } from '@/assets/js/commonFun'
import { accidentQuery, accidentQueryList } from '@/apis/smis/safetyPerformance'
import ChartLine from '@/components/chartLine'
import Pagination from '@/components/Pagination.vue'
export default {
  props:['acdcode','acdname'],
  data: () => ({
    yearSelect:[],
    searchipt:{
      selectedYear: '',
    },
    chartdata: {
      labels: [],
      datasets: [
        {
          borderColor: 'blue',
          backgroundColor:'blue',
          data: [],
          lineTension: 0
        }
      ]
    },
    options: {
      title:{
        display: false,
      },
      legend:{
        display:false
      },
      plugins: {
        datalabels: {
          align: "top",
          anchor: "end",
          color: 'blue',
        },
      },
      scales: {
        yAxes: [{
          scaleLabel:{
            display: true,
            labelString: '件數/百萬列車公里',
          },
          ticks: {
            suggestedMax: 50,
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
        }
      },
    },
    accidentTable: {
      showYN: false,
      header: [
        { text: '發生時間', value: 'AccidentFindDate', align: 'center', class: 'subtitle-1 white--text font-weight-bold ', width: '110' },
        { text: '發生地點', value: 'FindLine', align: 'center', class: 'subtitle-1 white--text font-weight-bold ', width: '110' },
        { text: '事故種類', value: 'AccidentType', align: 'center', class: 'subtitle-1 white--text font-weight-bold ', width: '110' },
        { text: '處置過程及原因分析', value: 'FixProcess', align: 'center', class: 'subtitle-1 white--text font-weight-bold ', width: '110' },
        { text: '檢討改進事項', value: 'ReviewProcess', align: 'center', class: 'subtitle-1 white--text font-weight-bold ', width: '110' },
        { text: '人員死傷及設備受損情形', value: 'HurtPeopleCount', align: 'center', class: 'subtitle-1 white--text font-weight-bold ', width: '110' },
        { text: '運轉影響情形', value: 'OperationLost', align: 'center', class: 'subtitle-1 white--text font-weight-bold ', width: '110' },
        { text: '備註', value: 'RemarkDesp', align: 'center', class: 'subtitle-1 white--text font-weight-bold ', width: '110' },
      ],
      item:[],
      pageOpt: { page: 1 },  // 目前頁數
    },
    chartKey: 0
  }),
  components: { 
    ChartLine,
    Pagination
  },
  computed: {
    ...mapState ('user', {
      userData: state => state.userData,  // 使用者基本資料
    }),
    accidentTableItem: function() {
      return this.accidentTable.item.filter(item=>item.AccidentFindDate == this.searchipt.selectedYear)
    }
  },
  methods: {
    ...mapActions('system', [
      'chMsgbar',  // 改變 messageBar
      'chLoadingShow',  // 切換 loading 圖顯示
      'chViewDialog',  // 檢視內容 dialog
    ]),
    dataInit() {
      const that = this
      const today = new Date() 
      for( let i = today.getFullYear()-1 ; i >= (today.getFullYear() - 10) && i >= 2012 ; i--){
        this.yearSelect.push(i)
      }
      this.searchipt.selectedYear = today.getFullYear() - 1
      let getGraphData = {
        ClientReqTime: getNowFullTime(),
        OperatorID: this.userData.UserId,  // 操作人id
        DTime_Start: this.yearSelect[this.yearSelect.length-1],
        DTime_End: this.yearSelect[0],
        Option: this.acdcode,
      }
      accidentQuery(getGraphData)
        .then(res=>{
          res.data.DataList.forEach(element=>{
            that.chartdata.labels.push(element.Year)
            that.chartdata.datasets[0].data.push(element.Value)
          })
          that.chartKey ++
        })
        .catch( err => {
          this.chMsgbar({ success: false, msg: '伺服器發生問題，資料查詢失敗' })
        })
      accidentQueryList(getGraphData)
        .then(res=>{
          that.accidentTable.item = res.data.DataList
        })
        .catch( err => {
          this.chMsgbar({ success: false, msg: '伺服器發生問題，資料查詢失敗' })
        })
    },
    // 更換頁數
    chPage(n) {
      this.accidentTable.pageOpt.page = n
    },
    goSearch() {
      this.accidentTable.showYN = true
    },
  },
  mounted() {
    this.dataInit()
  }
}
</script>