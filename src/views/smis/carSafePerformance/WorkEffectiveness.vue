<template>
<v-container style="max-width: 1200px">
  
  <v-row>
    <v-col cols="12" md="2">
      <v-btn color="secondary" large :to="`/smis/car-safe-performance`">
        回上一頁
      </v-btn>
    </v-col>
    <v-col cols="12" md="8" class="text-center">
      <h2 class="mb-4">{{decodeURIComponent(acdname)}}控制措施執行成效</h2>
    </v-col>
    <template v-if="decodeURIComponent(acdname)!='慢行路段分析'">
      <v-col cols="12" class="text-center align-center">
        <ChartBar :chartdata="Chart.chartdata" :options="Chart.options" :key="Chart.componentKey" />
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="6" md="3">
            <v-select
              solo
              :items="Chart.chartdata.labels">
            </v-select>
          </v-col>
          <v-col cols="6" md="3">
            <v-btn color="primary" large @click="workOrderTable.showYN = true">
              異常列表
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
    </template>
    <template v-else>
      <v-expansion-panels focusable>
        <v-expansion-panel
          v-for="(item,i) in trainSpeed"
          :key="i"
        >
          <v-expansion-panel-header>{{item.lineName}}</v-expansion-panel-header>
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
                <div :class="'some_element '+(Math.floor(Math.random() * Math.floor(3))>0?'red':Math.floor(Math.random() * Math.floor(2))>0?'green':'yellow')"></div>
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
import { accidentResonQueryList } from '@/apis/smis/safetyPerformance'
import { getNowFullTime } from '@/assets/js/commonFun'
export default {
  props:['acdname'],
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
              labelString: '年/月',
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
        { text: '工單編號', value: 'FlowId', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '故障主旨', value: 'Title', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '處理階段', value: 'Level', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
        { text: '檢視內容', value: 'Extend', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
      ],
      items:[
        {FlowId:'TEST0001',Title:'測試工單',Level:'報修階段'}
      ],
    },
    selectItem:[],
    trainSpeed:[
      { 
        lineName:'本線',
        rangeMin: 0,
        rangeMax: 71.350
      },
      { 
        lineName:'眠月線',
        rangeMin: 0,
        rangeMax: 2.84
      },
      { 
        lineName:'祝山線',
        rangeMin: 0,
        rangeMax: 3.247
      },
      { 
        lineName:'水山線',
        rangeMin: 0,
        rangeMax: 1.6
      },
    ]
  }),
  components: { 
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
    getPast3YearPerMonth() {
      const today = new Date
      let thisYear = today.getFullYear() - 3  //先抓三年前
      const thisMonth = today.getMonth() + 1    //月份要加一
      let yearMonth
      for(let i = 36; i >= 1 ; i--){
        let getMonth = 12 - Math.abs(thisMonth - i)%12
        if(getMonth > 12){
          thisYear+=1
          yearMonth = thisYear.toString()+'/0'+(getMonth-12).toString()
        }else{
          yearMonth = thisYear.toString()+'/'+((getMonth)>=10?'':'0')+(getMonth).toString()
        }
        this.Chart.chartdata.datasets[0].data.push((Math.random() * Math.floor(100)).toFixed(2))
        this.Chart.chartdata.labels.push(yearMonth)
        this.selectItem.push(yearMonth)
      }
    },
    dataInit() {
      this.getPast3YearPerMonth()
      this.Chart.componentKey ++
    },
    chPage(n) {
      this.workOrderTable.pageOpt.page = n
    },
    //------
    _getTotalRowCol(item) {
      let thisMin = Math.floor(item.rangeMin)
      let thisMax = Math.ceil(item.rangeMax)
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
    }
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