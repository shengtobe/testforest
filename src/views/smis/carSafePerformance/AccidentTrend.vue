<template>
<v-container style="max-width: 1200px">
  
  <v-row>
    <v-col cols="12" md="2">
      <v-btn color="secondary" large :to="`/smis/car-safe-performance/analysis`">
        回上一頁
      </v-btn>
    </v-col>
    <v-col cols="12" md="8" class="text-center">
      <h2 class="mb-4">{{decodeURIComponent(acdname)}}趨勢</h2>
    </v-col>
    <v-col cols="12">
      <ChartLine :chartdata="chartdata" :options="options" />
    </v-col>
    <v-col cols="4" class="text-center pa-0">
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
          <v-btn color="primary" large @click="goSearch">
            事故列表
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="4" class="text-center">
      <v-btn color="primary" large :to="`/smis/car-safe-performance/${acdname}/accident-analysis`">
        事故原因趨勢分析
      </v-btn>
    </v-col>
    <v-col cols="4" class="text-center">
      <v-btn color="primary" large :to="`/smis/car-safe-performance/${acdname}/year-analysis`">
        事故原因年度分析
      </v-btn>
    </v-col>
    <v-col cols="12">
      <v-data-table
        v-if="accidentTable.showYN"
        :headers="accidentTable.header"
        :items="accidentTable.item"  
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
import ChartLine from '@/components/chartLine'
import Pagination from '@/components/Pagination.vue'
export default {
  props:['acdname'],
  data: () => ({
    yearSelect:[],
    searchipt:{
      selectedYear: '',
    },
    chartdata: {
      labels: ['2012','2013','2014','2015','2016','2017','2018','2019','2020','2021'],
      datasets: [
        {
          borderColor: 'blue',
          backgroundColor:'blue',
          data: [0.00,0.00,0.00,12.40,19.90,29.89,0.00,21.26,0.00,0.00],
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
          AccidentFindDate:'',
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
    }
  }),
  components: { 
    ChartLine,
    Pagination
  },
  computed: {
    ...mapState ('user', {
      userData: state => state.userData,  // 使用者基本資料
    }),
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
      this.searchipt.selectedYear = today.getFullYear() - 1
    },
    // 更換頁數
    chPage(n) {
      this.accidentTable.pageOpt.page = n
    },
    goSearch() {
      this.accidentTable.showYN = true
      this.accidentTable.item[0].AccidentFindDate = this.searchipt.selectedYear
    }
  },
  mounted() {
    this.dataInit()
  }
}
</script>