<template>
<v-container style="max-width: 1200px">
  <v-row>
    <v-col cols="4">
      <v-btn class="btn-close white--text" large :to="`/smis/car-safe-performance/${encodeURIComponent(acdname)}/accident-trend`">
        回上一頁
      </v-btn>
    </v-col>
    <v-col cols="2">
      <v-select
        solo
        hide-details
        :items="yearSelect"
        v-model="selectYear"
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
import { accidentResonQueryList } from '@/apis/smis/safetyPerformance'
import { getNowFullTime } from '@/assets/js/commonFun'
export default {
  props:['acdname'],
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
    }
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
      const today = new Date() 
      for( let i = today.getFullYear()-1 ; i >= (today.getFullYear() - 10) && i >= 2012 ; i--){
        this.yearSelect.push(i)
      }
      this.selectYear = today.getFullYear() - 1
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
      this.accidentTableLv1.showYN = !this.accidentTableLv1.showYN
    },
    searchLv2() {
      this.accidentTableLv2.showYN = !this.accidentTableLv2.showYN
    },
    searchLv3() {
      this.accidentTableLv3.showYN = !this.accidentTableLv3.showYN
    }
  },
  mounted() {
    this.dataInit()
  }
}
</script>