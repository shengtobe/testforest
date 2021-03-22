<template>
<v-container style="max-width: 1200px">
  
  <v-row>
    <v-col cols="2" md="2">
      <v-btn color="secondary" large :to="`/smis/car-safe-performance/${acdname}/key-equip`">
        回上一頁
      </v-btn>
    </v-col>
    <v-col cols="8" md="8" class="text-center">
      <h2 class="mb-4">{{decodeURIComponent(eqname)}}可靠度</h2>
    </v-col>
    <v-col cols="2" md="2"></v-col>
    <v-col cols="12" class="text-center align-center">
      
    </v-col>
    <v-col cols="12" md="6">
      <v-row>
        <v-col cols="12" class="text-center">
          <h3>{{decodeURIComponent(eqname)}} 可靠度 逐季績效</h3>
        </v-col>
        <v-col cols="12">
          <ChartBar :chartdata="BarChart.chartdata" :options="BarChart.options" :key="BarChart.componentKey" />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="6">
      <v-row>
        <v-col cols="12" class="text-center">
          <h3>{{decodeURIComponent(eqname)}} 可靠度 移動平均績效</h3>
        </v-col>
        <v-col cols="12">
          <ChartLine :chartdata="LineChart.chartdata" :options="LineChart.options" :key="LineChart.componentKey" />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <ChartLine :chartdata="MixChart.chartdata" :options="MixChart.options" :key="MixChart.componentKey" />
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="6" md="3">
          <v-select
            solo
            :items="BarChart.chartdata.labels">
          </v-select>
        </v-col>
        <v-col cols="6" md="3">
          <v-btn color="primary" large @click="workOrderTable.showYN = true">
            工單列表
          </v-btn>
        </v-col>
        <v-col cols="0" md="6"></v-col>
      </v-row>
      <v-row v-if="workOrderTable.showYN">
        <v-col cols="12">
          <v-data-table
            :headers="workOrderTable.header"
            :items="workOrderTable.items"  
            hide-default-footer
            >
            <template v-slot:no-data>
              <span class="red--text subtitle-1">沒有資料</span>
            </template>

            <template v-slot:loading>
              <span class="red--text subtitle-1">資料讀取中...</span>
            </template>

            <template v-slot:item.Extend="{ item }">
              <v-btn color="success" rounded dark>
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
        </v-col>
      </v-row>
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
  props:['acdname','eqname'],
  data: () => ({
    yearSelect:[],
    LineChart:{
      componentKey: 1,
      chartdata: {
        labels:[],
        datasets: [
          {
            radius: 0,
            borderWidth: '1',
            borderColor: 'red',
            data: [],
            lineTension: 0.2
          }
        ]
      },
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
            anchor: "end",
            clamp :false,
            color: function(context) {
              return context.dataset.borderColor
            },
            formatter: function(value, context) {
              return '';
            }
          },
        },
        scales: {
          yAxes: [{
            scaleLabel:{
              display: true,
              labelString: 'MKBF',
            },
            ticks: {
              suggestedMin: 0,
            }
          }],
          xAxes: [{
            scaleLabel:{
              display: false,
              labelString: '歷史績效值',
            },
            ticks: {
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
    BarChart:{
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
        },
        scales: {
          yAxes: [{
            scaleLabel:{
              display: true,
              labelString: 'MKBF',
            },
            ticks: {
              suggestedMin: 0,
            }
          }],
          xAxes: [{
            scaleLabel:{
              display: false,
              labelString: '歷史績效值',
            },
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
        chartArea: {
					backgroundColor: 'rgba(251, 85, 85, 0.4)'
				}
      },
    },
    MixChart:{
      componentKey: 1,
      chartdata: {
        datasets: [
          {
            borderWidth: '1',
            borderColor: 'red',
            data: [],
            lineTension: 0.2,
            xAxisID: "1",
            yAxesGroup:"1",
            type:"line"
          },
          {
            borderWidth: '1',
            barPercentage: 1,
            data: [],
            xAxisID: "2",
            yAxesGroup:"2",
            type:"bar"
          }
        ]
      },
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
            anchor: "end",
            clamp :false,
            color: function(context) {
              return context.dataset.borderColor
            },
            formatter: function(value, context) {
              return (context.dataset.type=="line")?'':value;
            }
          },
        },
        scales: {
          yAxes: [
            {
              scaleLabel:{
                display: true,
                labelString: 'MKBF',
              },
              ticks: {
                suggestedMin: 0,
              }
            }
          ],
          xAxes: [
            {
              position: 'top',
              id: "1",
              name:"1",
              labels:[],
              scaleLabel:{
                display: false,
                labelString: '歷史績效值',
              },
              ticks: {
              }
            },
            {
              
              display: true,
              id: "2",
              name:"2",
              labels:[],
              scaleLabel:{
                display: false,
                labelString: '歷史績效值',
              },
            }
          ]
        },
        responsive: true,
        maintainAspectRatio: false,
        elements:{
          line:{
            fill:false,
            borderWidth: 1,
          },
          point:{
            radius: 0,
            pointRadius:0,
            pointHoverRadius:0,
            pointBorderColor:'rgba(0, 0, 0, 0)',
            pointBackgroundColor:'rgba(0, 0, 0, 0)',
            pointHoverBackgroundColor:'rgba(0, 0, 0, 0)',
            pointHoverBorderColor:'rgba(0, 0, 0, 0)',
            pointHoverBorderWidth:0,
            pointBorderWidth:0,
            pointHitRadius:0,
            pointStyle:'line'
          },
        },
      },
    },
    workOrderTable:{
      showYN: false,
      pageOpt: { page: 1 },
      header:[
        { text: '工單編號', value: 'FlowId', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '故障主旨', value: 'Title', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '處理階段', value: 'Level', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '檢視內容', value: 'Extend', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
      ],
      items:[
        {FlowId:'TEST0001',Title:'測試工單',Level:'報修階段'}
      ],
    },
    demoData:[] //展示用資料
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
  },
  methods: {
    ...mapActions('system', [
      'chMsgbar',  // 改變 messageBar
      'chLoadingShow',  // 切換 loading 圖顯示
      'chViewDialog',  // 檢視內容 dialog
    ]),
    dataInit() {
      this.getPast3YearPer3Month()
      this.createDemoData()
      this.BarChart.componentKey ++
      this.LineChart.componentKey ++
      this.MixChart.componentKey ++
    },
    getPast3YearPer3Month() {
      const today = new Date
      let thisYear = today.getFullYear() - 3  //先抓三年前
      const thisMonth = today.getMonth() + 1    //月份要加一
      let yearMonth1,yearMonth2
      for(let i = 36; i >= 1 ; i-=3){
        let getMonth = 12 - Math.abs(thisMonth - i)%12
        yearMonth1 = thisYear.toString()+((getMonth)>10?'':'0')+getMonth.toString()
        getMonth += 2
        if(getMonth > 12){
          thisYear+=1
          yearMonth2 = thisYear.toString()+'0'+(getMonth-12).toString()
        }else{
          yearMonth2 = thisYear.toString()+((getMonth)>=10?'':'0')+(getMonth).toString()
        }
        this.BarChart.chartdata.labels.push(yearMonth1+'~'+yearMonth2)
        this.MixChart.options.scales.xAxes[1].labels.push(yearMonth1+'~'+yearMonth2)
      }
      thisYear = today.getFullYear() - 3  //先抓三年前
      for(let j = 36; j >= 1 ; j--){
        let getMonth =((thisMonth - j)<=0)?12 - Math.abs(thisMonth - j)%12:thisMonth - j
        if(getMonth > 12){
          thisYear+=1
        }
        yearMonth1 = thisYear.toString()+((getMonth)>10?'':'0')+getMonth.toString()
        this.LineChart.chartdata.labels.push(yearMonth1)
        this.MixChart.options.scales.xAxes[0].labels.push(yearMonth1)
      }
    },
    createDemoData() {
      const today = new Date
      let thisYear = today.getFullYear() - 3  //先抓三年前
      let thisMonth = today.getMonth() + 1    //月份要加一
      if(thisMonth -2 <= 0){
        thisYear --
        thisMonth = 12+(thisMonth-2)
      }else{
        thisMonth = thisMonth - 2
      }
      let yearMonth = ''
      let count = 1
      let tempKm = 0
      let tempCount = 0
      let tempTotKm = 0
      let tempTotCount = 0
      for(let i = 0; i < 38 ; i++){
        let getMonth = Math.abs(thisMonth + i)%12 || 12
        let thisKm,thisCount
        yearMonth = thisYear.toString()+((getMonth)>=10?'':'0')+getMonth.toString()
        thisKm = Math.floor(Math.random() * Math.floor(100000))
        thisCount = Math.floor(Math.random() * Math.floor(10))
        this.demoData.push({
          ym: yearMonth,
          km: thisKm,
          count: thisCount
        })
        if(i >=2){
          tempKm += thisKm
          tempCount += thisCount
          if(count == 3){
            this.BarChart.chartdata.datasets[0].data.push((tempKm/tempCount).toFixed(2))
            this.MixChart.chartdata.datasets[1].data.push((tempKm/tempCount).toFixed(2))
            tempKm = 0
            tempCount = 0
            count = 1
          }else{
            count++
          }
        }
        tempTotKm = tempTotKm + thisKm - (this.demoData[i-2]?.km || 0)
        tempTotCount = tempTotCount + thisCount - (this.demoData[i-2]?.count || 0)
        if(i>=2){
          this.LineChart.chartdata.datasets[0].data.push((tempTotKm/tempTotCount).toFixed(2))
          this.MixChart.chartdata.datasets[0].data.push((tempTotKm/tempTotCount).toFixed(2))
        }
        if(getMonth == 12){
          thisYear ++
        }
      }
    },
    chPage(n) {
      this.workOrderTable.pageOpt.page = n
    },
  },
  mounted() {
    this.dataInit()
  }
}
</script>
<style scoped>

</style>