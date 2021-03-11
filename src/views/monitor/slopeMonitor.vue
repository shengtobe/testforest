<template>
  <v-container style="max-width: 1200px">
    <v-row>
        <v-col cols="12" sm="3" class="indigo--text" >
            <h2 align="center"> 即時資料</h2>
        </v-col>
        <v-col cols="12" sm="9" >
            <v-spacer />
            <v-simple-table
              dense
              >
              <template v-slot:default>
                <tbody>
                  <tr class="cyan darken-2 white--text">
                    <th>地點</th>
                    <th colspan="2" class="text-center text-h6">二萬平主站-第一分道</th>
                  </tr>
                  <tr>
                    <th>監控位置</th>
                    <td class="text-center">62K+600(1)</td>
                    <td class="text-center">62K+600(2)</td>
                  </tr>
                  <tr>
                    <th>更新時間</th>
                    <td>{{ convertDate(new Date()) }}</td>
                    <td>{{ convertDate(new Date()) }}</td>
                  </tr>
                  <tr>
                    <th>座標位置</th>
                    <td>(229208.441,2602093.148)</td>
                    <td>(229208.441,2602093.148)</td>
                  </tr>
                  <tr>
                    <th>初始值</th>
                    <td>1.002</td>
                    <td>1.002</td>
                  </tr>
                  <tr>
                    <th>監測值</th>
                    <td>1.1</td>
                    <td>1.1</td>
                  </tr>
                  <tr>
                    <th>變異值</th>
                    <td>1.5</td>
                    <td>1.5</td>
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
      <v-col cols="12" sm="3" class="indigo--text">
            <h2 align="center"> 歷史資料</h2>
        </v-col>
      <v-col cols="12" sm="4" md="3">
        <DateSelect label="查詢日期(起)" v-model="q_datestart" key="dateStart" :showIcon="true"/>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <DateSelect label="查詢日期(迄)" v-model="q_dateend" key="dateStart" :showIcon="true"/>
      </v-col>
      <v-col cols="12" md="2" align-self="center">
        <v-btn color="green" dark large>
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
      </v-col>
      <v-col cols="12" sm="1"></v-col>
    </v-row>
    <v-row>
        <v-col cols="12" sm="3" class="indigo--text" style="margin-left:-5px">
        </v-col>
        <v-col cols="12" sm="9">
            <v-spacer/>
            <v-card>
                <v-data-table
                    :headers="headers"
                    :items="tableItems"
                    :options.sync="pageOpt"
                    disable-sort
                    disable-filtering
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

<script>import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { fetchList } from '@/apis/monitor/slope'
import DateSelect from '@/components/forManage/dateSelect'
import Pagination from '@/components/Pagination'
export default {
  data: () => ({
    imgUrl1: require("../../assets/images/slope1.jpg"),
    imgUrl2: require("../../assets/images/slope2.jpg"),
    q_datestart:'',
    q_dateend:'',
    pageOpt: {page:1},
    tableItems:[],
    headers: [
      { text: '項次', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '30' },
      { text: '地點', value: 'LocID', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '30' },
      { text: '監控位置', value: 'LocName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '30' },
      { text: '更新時間', value: 'DataDTime', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '30' },
      { text: '座標位置', value: 'GPSValue', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '30' },
      { text: '初始值', value: 'InitValue', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '30' },
      { text: '監測值', value: 'Value', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '30' },
      { text: '變異值', value: 'DiffValue', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '30' },
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
    convertDate(date) {
      var mm = date.getMonth() + 1
      var dd = date.getDate()
      var hour = date.getHours()
      var min = date.getMinutes()
      var sec = date.getSeconds()
      return [date.getFullYear(),
              (mm>9 ? '' : '0') + mm,
              (dd>9 ? '' : '0') + dd
            ].join('/')+' '+[
              (hour>9 ? '' : '0') + hour,
              (min>9 ? '' : '0') + min,
              (sec>9 ? '' : '0') + sec,
            ].join(':')
    },
    callback() {
      const that = this
      fetchList({
        CreateDTime_Start:'',
        CreateDTime_End: '',
        Option: '1',
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res=>{
        console.log(res)
      }).catch( err => {
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
      }).finally(() => {
        setTimeout(function() {
          that.callback()
        }, 300000)
      })
    },
    goSearch(){
      fetchList({
        CreateDTime_Start:this.q_datestart,
        CreateDTime_End: this.q_dateend,
        Option: '2',
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res=>{
        console.log(res)
      }).catch( err => {
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
      }).finally(() => {
        setTimeout(function() {
          that.callback()
        }, 300000)
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
  tr:nth-child(odd){
    background: #E0F7FA;
  }
  tr:nth-child(even){
    background-color: #B2EBF2;
  }
</style>
