<template>
<v-container style="max-width: 1200px">
  
  <v-row>
    <v-col cols="12" md="2">
      <v-btn class="btn-close" dark large :to="`/smis/car-safe-performance/analysis`">
        回上一頁
      </v-btn>
    </v-col>
    <v-col cols="12" md="8" class="text-center">
      <h2 class="label-title mb-4">安全關鍵設備可靠度</h2>
    </v-col>
    <v-col cols="12" class="text-center align-center">
      <v-row>
        <v-col cols="0" md="3" />
        <v-col cols="4" md="2" class="d-flex text-right align-center">
          <v-select
            solo
            hide-details
            :items="['25T','28T','29T','蒸汽機車']"
          ></v-select>
        </v-col>
        <v-col cols="8" md="3" class="d-flex text-left align-center">
          <h3 class="label-header">安全關鍵設備MKBF績效</h3>
        </v-col>
        <v-col cols="0" md="4">
          <v-row>
            <v-col cols="6">
              <v-select
                solo
                hide-details
                :items="[
                  '轉向架',
                  '撒砂裝置',
                  '軔機',
                  '空氣配管',
                ]"
                v-model="eqname"
              ></v-select>
            </v-col>
            <v-col cols="6" class="d-flex text-left align-center">
              <v-btn class="btn-memo" dark large :to="`/smis/car-safe-performance/${acdname}/key-equip/${eqname}/key-analysis`">
                趨勢分析
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="0" md="3" />
    <v-col cols="12" md="6">
      <div>
          <ChartBubble :chartdata="Chart.chartdata" :options="Chart.options" :plugins="Chart.plugins" :key="Chart.componentKey" />
      </div>
    </v-col>
    <v-col cols="0" md="3" />
  </v-row>
</v-container>
</template>

<script>

import { mapState, mapActions } from 'vuex'
import ChartBubble from '@/components/chartBubble'
import Pagination from '@/components/Pagination.vue'
import { accidentResonQueryList } from '@/apis/smis/safetyPerformance'
import { getNowFullTime } from '@/assets/js/commonFun'
export default {
  data: () => ({
    yearSelect:[],
    Chart:{
      componentKey: 1,
      chartdata: {
        datasets: [
          {   //45度持平線
            data: [
              {x:0,y:0},
              {x:100,y:100}
            ],
            type: 'line',
            radius: 0,
            borderColor: 'black',
            borderDash:[5,5]
          },
          {   //惡化線
            data: [
              {x: 0, y:0}, 
              {x: 100, y:80}
            ],
            type: 'line',
            radius: 0,
            borderColor: 'red',
            borderDash:[5,5]
          },
          {   //改善線
            data: [
              { x: 0, y:0}, 
              { x: 80, y:100}, 
            ],
            type: 'line',
            radius: 0,
            borderColor: 'green',
            borderDash:[5,5]
          },
          //點點
          {   
            label:'設備A',
            borderColor: 'black',
            backgroundColor:'black',
            data: [{x:20,y:30,r:3}],
            type:'bubble'
          },
          {   
            label:'設備B',
            borderColor: 'black',
            backgroundColor:'black',
            data: [{x:42,y:36,r:3}],
            type:'bubble'
          },
          {   
            label:'設備C',
            borderColor: 'black',
            backgroundColor:'black',
            data: [{x:90,y:60,r:3}],
            type:'bubble'
          },
          {   
            label:'設備D',
            borderColor: 'black',
            backgroundColor:'black',
            data: [{x:40,y:62,r:3}],
            type:'bubble'
          },
          {   
            label:'設備E',
            borderColor: 'black',
            backgroundColor:'black',
            data: [{x:50,y:37,r:3}],
            type:'bubble'
          },
          {   
            label:'設備F',
            borderColor: 'black',
            backgroundColor:'black',
            data: [{x:60,y:97,r:3}],
            type:'bubble'
          },
        ]
      },
      plugins:[{
        id: 'kwhWeek',
        beforeDraw(chart,options) {
          const ctx = chart.chart.ctx;
          const canvas = chart.chart.canvas;
          const chartArea = chart.chartArea;
          var gradientBack = canvas.getContext("2d").createLinearGradient(chartArea.left, chartArea.top, chartArea.right, chartArea.bottom);
          gradientBack.addColorStop(0, "rgba(0,255,0,0.5)");
          gradientBack.addColorStop(0.5, "rgba(255,255,255,0.5)");
          gradientBack.addColorStop(1, "rgba(255,0,0,0.5)");
          ctx.fillStyle = gradientBack
          ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
        }
      }],
      options: {  
        tooltips:{
          enabled:false
        }, 
        legend:{
          display:false,
        },    
        plugins: {
          datalabels: {
            align: "top",
            anchor: "start",
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
              labelString: '近12個月績效值',
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 100,
            }
          }],
          xAxes: [{
            scaleLabel:{
              display: true,
              labelString: '歷史績效值',
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 100,
            }
          }]
        },
        responsive: true,
        maintainAspectRatio: true,
        elements:{
          line:{
            fill:false,
            borderWidth: 1,
          },
          point:{
            borderWidth: 1,
          },
        },
        chartArea: {
					backgroundColor: 'rgba(251, 85, 85, 0.4)'
				}
      },
    },
    allReasonList: [],
    reasonSelect: {
      Lv1: '',
      Lv2: '',
      Lv3: ''
    },
    eqname:''
  }),
  components: { 
    ChartBubble,
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
      this.Chart.componentKey ++
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
  },
  mounted() {
    // this.dataInit()
  }
}
</script>
<style scoped>

</style>