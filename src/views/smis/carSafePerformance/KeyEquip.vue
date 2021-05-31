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
            :items="locationList"
            v-model="reasonSelect.location"
            @change="initChart"
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
                :items="locEquip"
                v-model="reasonSelect.equip"
                @change="geteqName"
              ></v-select>
            </v-col>
            <v-col cols="6" class="d-flex text-left align-center">
              <v-btn class="btn-memo" dark large :to="`/smis/car-safe-performance/${reasonSelect.location}/key-equip/${reasonSelect.equip}/key-analysis/${reasonSelect.eqName}`" :disabled="reasonSelectEmpty">
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
          <ChartBubble :chartdata="Chart.chartdata" :options="Chart.options" :plugins="Chart.plugins" :key="Chart.componentKey"/>
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
import { accidentResonQueryList, keyEquipList, keyEquipMKBFList } from '@/apis/smis/safetyPerformance'
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
      defaultLine:[
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
      ],
    },
    allReasonList: [],
    reasonSelect: {
      location: '',
      equip: '',
      eqName: ''
    },
    locationList: [],
  }),
  components: { 
    ChartBubble,
    Pagination
  },
  computed: {
    ...mapState ('user', {
      userData: state => state.userData,  // 使用者基本資料
    }),
    locEquip: function() {
      return this.allReasonList?.find(ele=>ele.LocKey == this.reasonSelect.location)?.EquipList?.map(e=>({ value: e.EquipKey , text: e.EquipName}))||[]
    },
    reasonSelectEmpty: function() {
      return !(this.reasonSelect.location||this.reasonSelect.equip)
    }
  },
  methods: {
    ...mapActions('system', [
      'chMsgbar',  // 改變 messageBar
      'chLoadingShow',  // 切換 loading 圖顯示
      'chViewDialog',  // 檢視內容 dialog
    ]),
    dataInit() {
      this.Chart.componentKey ++
      keyEquipList({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res=>{
        if (res.data.ErrorCode == 0) {
          this.allReasonList = res.data.LocList
          this.locationList = [{value: "",text:'---請選擇---'}]
          this.locationList.push(...res.data.LocList.map(ele=>({value: ele.LocKey, text: ele.LocName})))
        }else{
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          this.$router.push({ path: '/error' })
        }
      }).catch( err => {
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
      })
    },
    initChart() {
      let today = new Date
      let thisYear = today.getFullYear()
      let thisMonth = today.getMonth() + 1
      thisMonth = (thisMonth < 10)? '0'+thisMonth:thisMonth.toString()
      keyEquipMKBFList({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        EquipCodeLv1: this.reasonSelect.location,
      }).then(res=>{
        if (res.data.ErrorCode == 0) {
          console.log(res.data)
          this.Chart.chartdata.datasets = this.Chart.defaultLine
          if(res.data.MKBFList.length > 0){
            res.data.MKBFList.forEach(e=>{
            this.Chart.chartdata.datasets.push(
              {   
                label: e.EquipName,
                borderColor: 'black',
                backgroundColor:'black',
                data: [{x: parseFloat(e.History_MKBF_Value), y: parseFloat(e.Recent_MKBF_Value), r:3}],
                type:'bubble'
              }
              )
            })
          }
          this.Chart.componentKey ++
        }else{
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          this.$router.push({ path: '/error' })
        }
      }).catch( err => {
        console.error('err',err)
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
      })
    },
    geteqName() {
      this.reasonSelect.eqName = this.locEquip.find(e=>this.reasonSelect.equip==e.value).text
    }
  },
  mounted() {
    this.dataInit()
    //this.initChart()
  }
}
</script>
<style scoped>

</style>