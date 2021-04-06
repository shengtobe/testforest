<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4">雨量監測</h2>
    <v-row no-gutter>
      <v-col cols="12" sm="4" md="3">
        <DateSelect label="查詢日期(起)" v-model="ipt.startDate" :showIcon="true" />
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <DateSelect label="查詢日期(迄)" v-model="ipt.endDate" :showIcon="true" />
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-city-variant-outline</v-icon>查詢地點
        </h3>
        <v-select 
          multiple
          chips
          :items="[
          '嘉義',
          '瑞里',
          '竹崎',
          '十字',
          '石磐龍',
          '獨立山',
          '奮起湖',
          '阿里山',
          ]" 
          v-model="ipt.Location"
          solo />
      </v-col>
      <v-col cols="12" md="3">
        <v-btn color="green" dark large class="mt-9" @click="search">
            <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-alert</v-icon>時雨量門檻
        </h3>
        <v-text-field solo type="number" min=0 v-model="ipt.alarmHour" suffix="mm"/>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-alert</v-icon>日雨量門檻
        </h3>
        <v-text-field solo type="number" min=0 v-model="ipt.alarmDay" suffix="mm"/>
      </v-col>
    </v-row>
    <v-row no-gutter class="indigo--text">
        <v-col cols="12" sm="6">
            <chartBar :chartdata="hourRain.chartdata" :options="hourRain.options" :key="hourRain.componentKey"/>
        </v-col>
        <v-col cols="12" sm="6">
          <chartBar :chartdata="dayRain.chartdata" :options="dayRain.options" :key="dayRain.componentKey"/>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime, groupBy } from '@/assets/js/commonFun'
import chartBar from "@/components/chartBar"
import DateSelect from '@/components/forManage/dateSelect'
import { fetchList } from '@/apis/monitor/rain'
export default {
  data() {
    return {
      disabled: false,
      readonly: false,
      hourRain:{
        chartdata: {},
        options: {
          title:{
            display:true,
            text:'時雨量異常次數(門檻值：  mm)',
            fontSize: 20,
            position: 'top'
          },
          legend:{
            display:true
          },
          plugins: {
            datalabels: {
              align: "top",
              anchor: "end",
            },
          },
          scales: {
            yAxes: [{
              scaleLabel:{
                display: true,
                labelString: '次數',
              },
              ticks: {
                suggestedMax: 25,
              }
            }],
            xAxes: [{
              scaleLabel:{
                display: true,
                labelString: '時間',
              },
              ticks: {
                autoSkip: false,
                maxRotation: 50,
                minRotation: 50
              }
            }]
          },
          responsive: true,
        },
        componentKey: 0,
      },
      dayRain:{
        chartdata: {},
        options: {
          title:{
            display:true,
            text:'24小時累積雨量異常次數(門檻值：  mm)',
            fontSize: 20,
            position: 'top'
          },
          legend:{
            display:true
          },
          plugins: {
            datalabels: {
              align: "top",
              anchor: "end",
            },
          },
          scales: {
            yAxes: [{
              scaleLabel:{
                display: true,
                labelString: '次數',
              },
              ticks: {
                suggestedMax: 25,
              }
            }],
            xAxes: [{
              scaleLabel:{
                display: true,
                labelString: '時間',
              },
              ticks: {
                autoSkip: false,
                maxRotation: 50,
                minRotation: 50
              }
            }]
          },
          responsive: true,
        },
        componentKey: 0,
      },
      colorArr:[
        '255,0,0',
        '0,255,0',
        '0,0,255',
        '255,255,0',
        '255,0,255',
        '0,255,255',
        '0,0,0',
        '255,255,255'
      ],
      ipt:{
        startDate: '',
        endDate: '',
        Location: [],
        alarmHour: 0,
        alarmDay: 0,
      }
    };
  },
  components: { 
    chartBar, 
    DateSelect
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
    ]),
    // 搜尋
    search() {
      const sendData = {
        LocationList: this.ipt.Location.map(e=>({Location:e})),
        CreateDTime_Start: this.ipt.startDate,
        CreateDTime_End: this.ipt.endDate,
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }
      fetchList({
        ...sendData,
        Option: '1',
        AlarmCount: this.ipt.alarmHour,
        }).then(res=>{
        const loc = groupBy(res.data.DataList,'Location')
        const locations = this.ipt.Location
        const yms = Object.keys(groupBy(res.data.DataList,'YM'))
        this.hourRain.chartdata.labels = yms
        this.hourRain.chartdata.datasets = locations.map((element,ind)=>{
          const thisArr = loc[element]
          const thisColor = this.colorArr[ind]
          let rtnObj = {
            label: element,
            borderWidth: '1',
            barPercentage: 1,
            borderColor: 'rgba('+thisColor+',0.7)',
            backgroundColor: 'rgba('+thisColor+',0.3)',
            data: yms.map(ele=>{
              return thisArr?.find(e=>e.YM==ele)?.Count || '0'
            })
          }
          return rtnObj
        })
        this.hourRain.options.title.text = `時雨量異常次數(門檻值： ${this.ipt.alarmHour} mm)`
        this.hourRain.componentKey ++
      }).catch( err => {
        console.warn(err)
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
      }).finally(() => {
      })
      fetchList({
        ...sendData,
        Option: '2',
        AlarmCount: this.ipt.alarmDay,
        }).then(res=>{
        const loc = groupBy(res.data.DataList,'Location')
        const locations = this.ipt.Location
        const yms = Object.keys(groupBy(res.data.DataList,'YM'))
        this.dayRain.chartdata.labels = yms
        this.dayRain.chartdata.datasets = locations.map((element,ind)=>{
          const thisArr = loc[element]
          const thisColor = this.colorArr[ind]
          let rtnObj = {
            label: element,
            borderWidth: '1',
            barPercentage: 1,
            borderColor: 'rgba('+thisColor+',0.7)',
            backgroundColor: 'rgba('+thisColor+',0.3)',
            data: yms.map(ele=>{
              return thisArr?.find(e=>e.YM==ele)?.Count || '0'
            })
          }
          return rtnObj
        })
        this.dayRain.options.title.text = `24小時累積雨量異常次數(門檻值： ${this.ipt.alarmDay} mm)`
        this.dayRain.componentKey ++
      }).catch( err => {
        console.warn(err)
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
      }).finally(() => {
      })
    },
    // 關閉 dialog
    close() {
      this.Add = false;
      this.dialog3 = false;
      this.dialogShowEdit = false;
      this.dialogDel = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.addItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

  },
  mounted() {
    
  }
};
</script>
