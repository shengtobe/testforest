<template>
<v-container style="max-width: 1200px">
  
  <v-row>
    <v-col cols="2" md="2">
      <v-btn class="btn-close" dark large :to="`/smis/car-safe-performance/key-equip`">
        回上一頁
      </v-btn>
    </v-col>
    <v-col cols="8" md="8" class="text-center">
      <h2 class="mb-4 label-title">{{decodeURIComponent(eqName)}}可靠度</h2>
    </v-col>
    <v-col cols="2" md="2"></v-col>
    <v-col cols="12" class="text-center align-center">
      
    </v-col>
    <v-col cols="12" md="6">
      <v-row>
        <v-col cols="12" class="text-center">
          <h3 class="label-header">{{decodeURIComponent(eqName)}} 可靠度 逐季績效</h3>
        </v-col>
        <v-col cols="12">
          <ChartBar :chartdata="BarChart.chartdata" :options="BarChart.options" :key="BarChart.componentKey" />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="6">
      <v-row>
        <v-col cols="12" class="text-center">
          <h3 class="label-header">{{decodeURIComponent(eqName)}} 可靠度 移動平均績效</h3>
        </v-col>
        <v-col cols="12">
          <ChartLine :chartdata="LineChart.chartdata" :options="LineChart.options" :key="LineChart.componentKey" />
        </v-col>
      </v-row>
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
          <v-btn class="btn-memo" dark large @click="workOrderTable.showYN = true">
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
            class="theme-table"
            >
            <template v-slot:no-data>
              <span class="red--text subtitle-1">沒有資料</span>
            </template>

            <template v-slot:loading>
              <span class="red--text subtitle-1">資料讀取中...</span>
            </template>

            <template v-slot:item.Extend="{ item }">
              <v-btn class="btn-add" rounded dark>
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
import { accidentResonQueryList, keyEquipMKBF, keyEquipQueryList } from '@/apis/smis/safetyPerformance'
import { getNowFullTime } from '@/assets/js/commonFun'
export default {
  props:['acdcode','eqcode','eqName'],
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
            backgroundColor: 'rgba(227, 124, 20, 0.55)',
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
    demoData:[], //展示用資料
    YMData:[],
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
      this.getGraphData()
    },
    getPast3YearPer3Month() {
      const today = new Date
      let thisYear = today.getFullYear() - 3  //先抓三年前
      const thisMonth = today.getMonth() + 1    //月份要加一
      let yearMonth1,yearMonth2
      thisYear = today.getFullYear() - 3  //先抓三年前
      for(let j = 36; j >= 1 ; j--){
        let getMonth =((thisMonth - j)<=0)?12 - Math.abs(thisMonth - j)%12:thisMonth - j
        yearMonth1 = thisYear.toString()+'-'+((getMonth)>=10?'':'0')+getMonth.toString()
        this.YMData.push(yearMonth1)
        if(getMonth == 12){
          thisYear+=1
        }
      }
    },
    getGraphData(){
      keyEquipMKBF({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        EquipCodeLv1:	this.acdcode,	
        EquipCodeLv2:	this.eqcode,
        DTime_Start: this.YMData[0],
        DTime_End: this.YMData[this.YMData.length-1]
      }).then(res=>{
        if (res.data.ErrorCode == 0) {
          const list = res.data.MKBFList
          //季
          const Barchart = this.BarChart.chartdata
          for(let i = 0 ; i <= list.length-3 ; i+=3){
            Barchart.labels.push(list[i].Date+'~'+list[i+2].Date)
            Barchart.datasets[0].data.push((parseFloat(list[i].MKBF_Value)+parseFloat(list[i+1].MKBF_Value)+parseFloat(list[i+2].MKBF_Value))/3)
          }
          this.BarChart.componentKey ++
          //移動平均
          const Linechart = this.LineChart.chartdata
          for(let i = 0 ; i <= list.length-3 ; i++){
            Linechart.labels.push(list[i].Date)
            Linechart.datasets[0].data.push((parseFloat(list[i].MKBF_Value)+parseFloat(list[i+1].MKBF_Value)+parseFloat(list[i+2].MKBF_Value))/3)
          }
          this.LineChart.componentKey ++
        }else{
          console.error(res.data.Msg)
          // sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          // this.$router.push({ path: '/error' })
        }
      }).catch( err => {
        console.error('err',err)
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
      })
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