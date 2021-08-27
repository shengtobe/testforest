<template>
  <v-container style="max-width: 1200px" class="label-header">
    <h2 class="label-title mb-4">邊坡監測</h2>
    <v-row>
        <v-col cols="12" sm="12" class="info--text" >
            <h2 class="label-title" align="center"> 即時資料</h2>
        </v-col>
        <v-col cols="12" sm="12" >
            <v-spacer />
            <v-simple-table
              dense
              v-if="toptable.LocationList.length>0"
              >
              <template v-slot:default>
                <tbody>
                  <tr class="metal-dark-yellow-top white--text shadowText">
                    <th>地點</th>
                    <th :colspan="toptable.LocationList.length" class="text-center text-h6">二萬平主站-第一分道</th>
                  </tr>
                  <tr class="lime lighten-4">
                    <th>監控位置</th>
                    <td class="text-center" v-for="i in toptable.LocationList.length" :key="'LocName'+i">{{ toptable.LocationList[i-1].LocName }}({{toptable.LocationList[i-1].LocID}})</td>
                  </tr>
                  <tr class="lime lighten-5">
                    <th>更新時間</th>
                    <td v-for="i in toptable.LocationList.length" :key="'DTime'+i">{{ toptable.LocationList[i-1].DataDTime }}</td>
                  </tr>
                  <!-- <tr class="lime lighten-4">
                    <th>座標位置</th>
                    <td v-for="i in toptable.LocationList.length" :key="'GPS'+i">{{`(${toptable.LocationList[i-1].GPSValue_X},${toptable.LocationList[i-1].GPSValue_Y})`}}</td>
                  </tr>
                  <tr class="lime lighten-5">
                    <th>初始值</th>
                    <td v-for="i in toptable.LocationList.length" :key="'Init'+i">{{ toptable.LocationList[i-1].InitValue }}</td>
                  </tr> -->
                  <tr  class="lime lighten-4">
                    <th>監測值</th>
                    <td v-for="i in toptable.LocationList.length" :key="'Value'+i">{{ toptable.LocationList[i-1].Value }}</td>
                  </tr>
                  <tr class="lime lighten-5">
                    <th>變異值</th>
                    <td v-for="i in toptable.LocationList.length" :key="'Diff'+i">{{ toptable.LocationList[i-1].DiffValue }}</td>
                  </tr>
                  <tr class="lime lighten-4">
                    <th>燈號</th>
                    <td v-for="i in toptable.LocationList.length" :key="'Light'+i" class="text-center">
                      <img class="mt-1" :src="'/images/light-'+getLightColor(toptable.LocationList[i-1].Status)+'.svg'">
                    </td>
                  </tr>
                  <tr class="lime lighten-5">
                    <th :colspan="toptable.LocationList.length+1">
                      燈號說明：<br>
                      <v-row cols="5">
                        <v-col class="d-flex align-center">
                          <img src="/images/light-green.svg"/>
                          <span>正常</span>
                        </v-col>
                        <v-col class="d-flex align-center">
                          <img src="/images/light-yellow.svg"/>
                          <span>第三級警戒:±412秒(arcSec)</span>
                        </v-col>
                        <v-col class="d-flex align-center">
                          <img src="/images/light-orange.svg"/>
                          <span>第二級警戒:±573秒(arcSec)</span>
                        </v-col>
                        <v-col class="d-flex align-center">
                          <img src="/images/light-red.svg"/>
                          <span>第一級警戒:±825秒(arcSec)</span>
                        </v-col>
                        <v-col class="d-flex align-center">
                          <img src="/images/light-gray.svg"/>
                          <span>故障</span>
                        </v-col>
                      </v-row>
                    </th>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-spacer />
        </v-col>
    </v-row>
    
    <v-divider class="mx-2 mb-4" />

    <v-row style="margin-top:-2%">
      <!-- 控制措施 -->
      <v-col cols="12" sm="12" class="info--text">
            <h2 class="label-title" align="center"> 歷史資料</h2>
        </v-col>
        <v-col cols="12" sm="1"/>
      <v-col cols="12" sm="2">
        <DateSelect label="查詢日期(起)" v-model="q_datestart" key="dateStart" :showIcon="true"/>
      </v-col>
      <v-col cols="12" sm="2">
        <DateSelect label="查詢日期(迄)" v-model="q_dateend" key="dateStart" :showIcon="true"/>
      </v-col>
      <v-col cols="12" md="4">
        <h3 class="mb-1"><v-icon class="mr-1">mdi-city-variant-outline</v-icon>監控位置</h3>
        <v-select 
          :items="locListKeyValue" 
          v-model="Location"
          @change="test"
          solo />
      </v-col>
      <v-col cols="12" md="2" align-self="center" >
        <v-btn class="btn-search" dark large @click="goSearch">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
      </v-col>
    </v-row>
    <!-- chart -->
    <v-row>
        <v-col cols="12" sm="12" class="indigo--text" style="margin-left:-5px">
            <ChartLine :chartdata="Lv1Chart.chartdata" :options="Lv1Chart.options" :key="Lv1Chart.componentKey"/>
        </v-col>
        <!-- <v-col cols="12" sm="2" class="indigo--text" style="margin-left:-5px"/> -->
        <v-col cols="12" sm="12">
          <v-spacer/>
          <v-card>
            <v-data-table
              light
              :headers="headers"
              :items="tableItems"
              :options.sync="pageOpt"
              disable-sort
              disable-filtering
              hide-default-footer
              class="theme-table"
            >
                <template v-slot:no-data>
                    <span class="red--text subtitle-1">沒有資料</span>
                </template>

                <template v-slot:loading>
                    <span class="red--text subtitle-1">資料讀取中...</span>
                </template>

                <template v-slot:item.LocID="{item}">
                  {{'二萬坪主站-第一分道'}}
                </template>

                <template v-slot:item.Status="{item}">
                  <img class="mt-1" :src="'/images/light-'+getLightColor(item.Status)+'.svg'">
                </template>

                <template v-slot:item.LocName="{item}">
                  {{ `${item.LocName}(${item.LocID})` }}
                </template>

                <template v-slot:footer="footer">
                    <Pagination
                        :footer="footer"
                        :pageOpt="pageOpt"
                        @chPage="chPage"
                    />
                </template>
            </v-data-table>
          </v-card>
          <v-spacer />
        </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
>>>.tHeader{
  background: linear-gradient(to top, #967f1b60, #967f1b8e),linear-gradient(to top, #d7d7d7 0%, #858585 45%, #d7d7d7 55%, #fff 100%);
  border-right: 0px !important;
}
</style>
<script>
import { mapState, mapActions } from 'vuex'
import ChartLine from '@/components/chartLine'
import { getNowFullTime } from '@/assets/js/commonFun'
import { fetchList } from '@/apis/monitor/slope'
import DateSelect from '@/components/forManage/dateSelect'
import Pagination from '@/components/Pagination'
export default {
  data: () => ({
    imgUrl1: require("../../assets/images/slope1.jpg"),
    toptable:{
      LocationList: []
    },
    Lv1Chart:{
      componentKey: 1,
      chartdata: {
        labels: [],
        datasets: []
      },
      options: {
        title:{
          display: false,
        },
        legend:{
          display:true,
          // labels:{
          //   usePointStyle:false
          // }
        },
        plugins: {
          datalabels: {
            align: "top",
            anchor: "end",
            color: 'blue',
            display: false
          },
        },
        scales: {
          yAxes: [{
            scaleLabel:{
              display: true,
              labelString: '監測值',
            },
            ticks: {
              suggestedMax: 100,
            }
          }],
          xAxes: [{
            scaleLabel:{
              display: true,
              labelString: '時間',
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
    },
    
    q_datestart:getNowFullTime().substr(0,10),
    q_dateend:getNowFullTime().substr(0,10),
    Location:'',
    pageOpt: {page:1},
    tableItems:[],
    // {LocID:'TI-01X'},
    //       {LocID:'TI-01Y'},
    //       {LocID:'TI-02X'},
    //       {LocID:'TI-02Y'},
    locListKeyValue: [
      {text: 'TI-01X：第一分道站處下方 X軸', value: 'TI-01X'},
      {text: 'TI-01Y：第一分道站處下方 Y軸', value: 'TI-01Y'},
      {text: 'TI-02X：第一分道站處上方 X軸', value: 'TI-02X'},
      {text: 'TI-02Y：第一分道站處上方 Y軸', value: 'TI-02Y'},
      {text: 'TI-02Y：第一分道站處上方 Y軸', value: 'TI-02Y'},
      {text: '不限', value: ''},
    ],
    headers: [
      // { text: '項次', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold accent', width: '30' },
      { text: '地點', value: 'LocID', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold shadowText', width: '15' },
      { text: '監控位置', value: 'LocName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold shadowText', width: '15' },
      { text: '更新時間', value: 'DataDTime', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold shadowText', width: '15' },
      // { text: '座標位置', value: 'GPSValue', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold shadowText', width: '15' },
      // { text: '初始值', value: 'InitValue', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold shadowText', width: '13' },
      { text: '監測值', value: 'Value', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold shadowText', width: '13' },
      { text: '變異值', value: 'DiffValue', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold shadowText', width: '13' },
      { text: '燈號', value: 'Status', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold shadowText', width: '15' },
    ]
  }),
  components: {
    DateSelect,
    Pagination,
    ChartLine
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
    callback() {
      const that = this
      fetchList({
        CreateDTime_Start:'',
        CreateDTime_End: '',
        Option: '1',
        LocationList:[
          {LocID:'TI-01X'},
          {LocID:'TI-01Y'},
          {LocID:'TI-02X'},
          {LocID:'TI-02Y'},
        ],
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res=>{
        console.log("LocationList: ", res.data.LocationList)
        this.toptable.LocationList = res.data.LocationList
      }).catch( err => {
        console.warn(err)
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
      }).finally(() => {
        setTimeout(function() {
          that.callback()
        }, 300000)
      })
    },
    goSearch(){
      let data1 = []
      let data2 = []
      let data3 = []
      let data4 = []
      this.chLoadingShow({show:true})
      fetchList({
        CreateDTime_Start:this.q_datestart,
        CreateDTime_End: this.q_dateend,
        Option: '2',
        LocationList:[
          {LocID:this.Location},
        ],
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res=>{
        this.tableItems = [...[]]
        this.Lv1Chart.chartdata.datasets = [...[]]
        this.Lv1Chart.chartdata.labels = [...[]]
        this.tableItems = res.data.LocationList
        console.log("邊坡歷史紀錄: ", this.tableItems);
        let hour = '0';// 上一筆小時數字為
        // this.tableItems = this.tableItems.splice(0, 80)
        let tempArr = [];
        this.tableItems = this.tableItems
        this.tableItems.forEach(element=>{
          // 取出這一筆小時數字
          let newHour = element.DataDTime.substr(element.DataDTime.indexOf(' ')+1, 2);
          
          switch(element.LocID){
            case 'TI-01X':
              data1.push(element.DiffValue)
              tempArr.push(element.DataDTime)
              // this.Lv1Chart.chartdata.labels.push(element.DataDTime) // 塞時間
              break;
            case 'TI-01Y':
              data2.push(element.DiffValue)
              break;
            case 'TI-02X':
              data3.push(element.DiffValue)
              break;
            case 'TI-02Y':
              data4.push(element.DiffValue)
              break;
          }
        })//forEach end
        tempArr = tempArr.reverse()
        this.Lv1Chart.chartdata.labels = tempArr.map((e, i)=> i % Math.ceil(tempArr.length / 24) == 0||i==tempArr.length-1? e : '')

        this.Lv1Chart.chartdata.datasets.push({
          label:'TI-01X',
          // pointStyle: "circle",
          pointRadius: 0,
          borderColor: "red",
          // backgroundColor: "white",
          data: data1,
          lineTension: 0
        })
        this.Lv1Chart.chartdata.datasets.push({
          label:'TI-01Y',
          // pointStyle: "circle",
          pointRadius: 0,
          borderColor: "blue",
          // backgroundColor: "white",
          data: data2,
          lineTension: 0
        })
        this.Lv1Chart.chartdata.datasets.push({
          label:'TI-02X',
          // pointStyle: "circle",
          pointRadius: 0,
          borderColor: "green",
          // backgroundColor: "white",
          data: data3,
          lineTension: 0
        })
        this.Lv1Chart.chartdata.datasets.push({
          label:'TI-02Y',
          // pointStyle: "circle",
          pointRadius: 0,
          borderColor: "yellow",
          // backgroundColor: "white",
          data: data4,
          lineTension: 0
        })
        this.Lv1Chart.componentKey ++
        console.log("chartdata: ", this.Lv1Chart.chartdata);

      }).catch( err => {
        console.warn(err)
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
      }).finally(() => {
        this.chLoadingShow({ show: false})
      })
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n
    },
    test(){
      console.log("Location: ", this.Location);
    },
    getLightColor(input) {
      let rtnColor = ''
      switch(input){
        case '0':
          rtnColor = 'green'
          break;
        case '1':
          rtnColor = 'red'
          break;
        case '2':
          rtnColor = 'orange'
          break;
        case '3':
          rtnColor = 'yellow'
          break;
        case '4':
          rtnColor = 'gray'
          break;
        default:
          rtnColor = 'gray'
          break;
      }
      return rtnColor
    }
  },
  mounted() {
    this.callback()
  },
};
</script>
<style scoped>
  th,td{
    border:1px black solid
  }
</style>