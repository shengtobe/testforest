<template>
  <v-container style="max-width: 1200px" class="label-header">
    <h2 class="label-title mb-4">邊坡監測</h2>
    <v-row>
        <v-col cols="12" sm="2" class="info--text" >
            <h2 class="label-title" align="center"> 即時資料</h2>
        </v-col>
        <v-col cols="12" sm="10" >
            <v-spacer />
            <v-simple-table
              dense
              v-if="toptable.LocationList.length"
              >
              <template v-slot:default>
                <tbody>
                  <tr class="metal-dark-yellow-top white--text shadowText">
                    <th>地點</th>
                    <th colspan="2" class="text-center text-h6">二萬平主站-第一分道</th>
                  </tr>
                  <tr class="lime lighten-4">
                    <th>監控位置</th>
                    <td class="text-center">{{ `${toptable.LocationList[0].LocName}(${toptable.LocationList[0].LocID})` }}</td>
                    <td class="text-center">{{ `${toptable.LocationList[1].LocName}(${toptable.LocationList[1].LocID})` }}</td>
                  </tr>
                  <tr class="lime lighten-5">
                    <th>更新時間</th>
                    <td>{{ toptable.LocationList[0].DataDTime }}</td>
                    <td>{{ toptable.LocationList[1].DataDTime }}</td>
                  </tr>
                  <tr class="lime lighten-4">
                    <th>座標位置</th>
                    <td>{{`(${toptable.LocationList[0].GPSValue_X},${toptable.LocationList[0].GPSValue_Y})`}}</td>
                    <td>{{`(${toptable.LocationList[1].GPSValue_X},${toptable.LocationList[1].GPSValue_Y})`}}</td>
                  </tr>
                  <tr class="lime lighten-5">
                    <th>初始值</th>
                    <td>{{ toptable.LocationList[0].InitValue }}</td>
                    <td>{{ toptable.LocationList[1].InitValue }}</td>
                  </tr>
                  <tr  class="lime lighten-4">
                    <th>監測值</th>
                    <td>{{ toptable.LocationList[0].Value }}</td>
                    <td>{{ toptable.LocationList[1].Value }}</td>
                  </tr>
                  <tr class="lime lighten-5">
                    <th>變異值</th>
                    <td>{{ toptable.LocationList[0].DiffValue }}</td>
                    <td>{{ toptable.LocationList[1].DiffValue }}</td>
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
      <v-col cols="12" sm="2" class="info--text">
            <h2 class="label-title" align="center"> 歷史資料</h2>
        </v-col>
      <v-col cols="12" sm="3">
        <DateSelect label="查詢日期(起)" v-model="q_datestart" key="dateStart" :showIcon="true"/>
      </v-col>
      <v-col cols="12" sm="3">
        <DateSelect label="查詢日期(迄)" v-model="q_dateend" key="dateStart" :showIcon="true"/>
      </v-col>
      <v-col cols="12" md="2">
        <h3 class="mb-1"><v-icon class="mr-1">mdi-city-variant-outline</v-icon>監控位置</h3>
        <v-select 
          :items="[
            {text:'測試地點',value:'65K_600_A'},
            {text:'測試地點1',value:'65K_600_B'}
          ]" 
          v-model="Location"
          solo />
      </v-col>
      <v-col cols="12" md="2" align-self="center" >
        <v-btn class="btn-search" dark large @click="goSearch">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" sm="2" class="indigo--text" style="margin-left:-5px">
        </v-col>
        <v-col cols="12" sm="10">
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
import { getNowFullTime } from '@/assets/js/commonFun'
import { fetchList } from '@/apis/monitor/slope'
import DateSelect from '@/components/forManage/dateSelect'
import Pagination from '@/components/Pagination'

export default {
  data: () => ({
    imgUrl1: require("../../assets/images/slope1.jpg"),
    toptable:{},
    q_datestart:'',
    q_dateend:'',
    Location:'',
    pageOpt: {page:1},
    tableItems:[],
    headers: [
      // { text: '項次', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold accent', width: '30' },
      { text: '地點', value: 'LocID', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold shadowText', width: '15' },
      { text: '監控位置', value: 'LocName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold shadowText', width: '15' },
      { text: '更新時間', value: 'DataDTime', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold shadowText', width: '15' },
      { text: '座標位置', value: 'GPSValue', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold shadowText', width: '15' },
      { text: '初始值', value: 'InitValue', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold shadowText', width: '13' },
      { text: '監測值', value: 'Value', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold shadowText', width: '13' },
      { text: '變異值', value: 'DiffValue', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold shadowText', width: '13' },
    ]
  }),
  components: {
    DateSelect,
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
    ]),
    callback() {
      const that = this
      fetchList({
        CreateDTime_Start:'',
        CreateDTime_End: '',
        Option: '1',
        LocationList:[
          {LocID:'65K_600_A'},
          {LocID:'65K_600_B'},
        ],
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res=>{
        this.toptable = res.data
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
      this.chLoadingShow()
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
        this.tableItems = res.data.LocationList
      }).catch( err => {
        console.warn(err)
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
      }).finally(() => {
        this.chLoadingShow()
      })
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n
    },
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