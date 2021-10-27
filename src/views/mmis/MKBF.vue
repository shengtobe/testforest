<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">MKBF 系統營運可靠度</h2>
    <!-- 查詢表單 -->
    <v-row class="px-2 label-header">
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>查詢月份(起)
        </h3>
        <v-menu
          v-model="StartDay"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="searchIpt.StartDay" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="primary"
            type="month"
            v-model="searchIpt.StartDay"
            @input="StartDay = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>

      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>查詢月份(迄)
        </h3>
        <v-menu
          v-model="EndDay"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="searchIpt.EndDay" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="primary"
            type="month"
            v-model="searchIpt.EndDay"
            @input="EndDay = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-contacts</v-icon>科室
        </h3>
        <v-select solo hide-details :loading="deptLoading" :items="selectDept" v-model="searchIpt.Dept" />
      </v-col>
      <v-col cols="12" sm="8" md="6">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-message-processing</v-icon>設備標示編號(WBS)
        </h3>
        <v-text-field v-model.trim="searchIpt.wbsShow" readonly solo @click="goEq"  />
      </v-col>

      <v-dialog v-model="eqCodeShow" max-width="900px">
        <v-card class="theme-card">
          <v-card-title class="px-4 py-1">
            選擇設備標示編號(WBS)
            <v-spacer />
            <v-btn fab small text @click="cancel" class="mr-n2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <EquipRepairCode :key="componentKey" :toLv="dataForEqCode.toLv" :nowEqCode="searchIpt.wbs" @getEqCode="getTempCode" @getEqName="getTempName"/>
          <v-card-actions class="px-5 pb-5">
            <v-spacer></v-spacer>
            <v-btn class="mr-2 btn-close white--text" elevation="4" @click="cancel">取消</v-btn>
            <v-btn class="btn-add white--text" elevation="4" @click="setWBS">送出</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-col cols="12" class="mb-8">
        <v-btn large class="mr-3 btn-search white--text" @click="search">
          <v-icon>mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn elevation="2" large class="btn-clear" @click="reset">
          <v-icon>mdi-reload</v-icon>清除搜尋內容
        </v-btn>
      </v-col>
    </v-row>
    <ChartLine :chartdata="chartdata" :options="options" :key="'CL'+componentKey" v-if="this.chartdata.labels.length > 0"/>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime,decodeObject } from '@/assets/js/commonFun'
import Pagination from "@/components/Pagination";
import EquipRepairCode from '@/components/EquipRepairCode'
import { fetchOrganization } from '@/apis/organization'
import { MKBF } from '@/apis/materialManage/analy'
import ChartLine from '@/components/chartLine'
export default {
  data: () => ({
    //搜尋欄位
    StartDay:false,
    EndDay: false,
    eqCodeShow: false,
    searchIpt: {
      // 搜尋欄位
      EndDay: "",
      StartDay: "",
      wbs: "",
      wbsShow: "",
      Dept: "",
      RepairFees: "",
    },
    searchTemp: {
      wbs: "",
      wbsShow: ""
    },
    componentKey: 0,
    dataForEqCode: {
      toLv: 2,
    },
    selectDept: [],
    deptLoading: false,
    chartdata: {
      labels: [],
      datasets: [
        {
          label: 'MKBF',
          borderColor: 'blue',
          backgroundColor:'blue',
          data: [],
          lineTension: 0
        }
      ]
    },
    options: {
      title:{
        display: true,
        fontSize: 18,
        text: "MKBF"
      },
      legend:{
        display:false
      },
      plugins: {
        datalabels: {
          align: "top",
          anchor: "end",
          color: 'blue',
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      elements:{
        line:{
          fill:false,
        }
      },
    },
    componentKey: 0,
  }),
  components: { 
    Pagination, // 頁碼
    EquipRepairCode, //選擇設備報修碼
    ChartLine,
  },
  mounted() {
    this.getOrg()
    //this.search()
  }, 
  computed: {
    ...mapState ('user', {
      userData: state => state.userData,  // 使用者基本資料
    }),
  },
  methods: {
    ...mapActions('system', [
      'chMsgbar',  // messageBar
      'chLoadingShow'  // 切換 loading 圖顯示
    ]),
    //搜尋區塊功能=========================================================//
    // 搜尋
    search() {
      if(parseInt(this.searchIpt.StartDay.replace(/-/g,"")) <= parseInt(this.searchIpt.EndDay.replace(/-/g,"")) ){
        this.chLoadingShow({show:true})
        const begMonth = this.searchIpt.StartDay.split('-')
        const endMonth = this.searchIpt.EndDay.split('-')
        const wbs = this.searchIpt.wbs.split('-')
        const sendData = {
          CreateDTime_Start: this.searchIpt.StartDay + '-' + (new Date(begMonth[0],parseInt(begMonth[1])-1,1).getDate()),
          CreateDTime_End: this.searchIpt.EndDay + '-' + (new Date(endMonth[0],endMonth[1],0).getDate()),
          DepartName: this.searchIpt.Dept,
          MaintainCode_System: wbs[0]||"",
          MaintainCode_Loc: wbs[1]||"",
          MaintainCode_Eqp: wbs[2]||"",
          MaintainCode_Seq: wbs[3]||"",
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id
        }
        let begYear = parseInt(begMonth[0])
        let endYear = parseInt(endMonth[0])
        let begMon = parseInt(begMonth[1])
        let endMon = parseInt(endMonth[1])
        this.chartdata.labels = []
        if(endMonth[0] - begMonth[0] > 0) {  //跨度超過一年
          for(let yy = begYear ; yy<= endYear ; yy++) {
            for(let mm = ((yy==begYear)?begMon:1) ; mm <= ((yy==endYear)?endMon:12) ; mm++){
              this.chartdata.labels.push(yy + '/' + (mm>9 ? '' : '0') + mm)
            }
          }
        }else {
          for(let mm = begMon ; mm <= endMon ; mm++){
            this.chartdata.labels.push(begYear + '/' + (mm>9 ? '' : '0') + mm)
          }
        }
        MKBF({
          ...sendData
        }).then(res => {
          if (res.data.ErrorCode == 0) {
            this.chartdata.datasets[0].data = []
            let MKBFList = decodeObject(res.data.MKBFDataList)
            this.chartdata.labels.forEach(e=>{
              let eArr = e.split('/')
              let eYear = eArr[0]
              let eMonth = eArr[1]
              const MKBFFind = MKBFList.find(el=>(parseInt(el.Year)==parseInt(eYear)&&parseInt(el.Month)==parseInt(eMonth)))
              this.chartdata.datasets[0].data.push(MKBFFind?MKBFFind.MKBF:"0")
            })
          } else {
            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
            this.$router.push({ path: '/error' })
          }
        }).catch( err => {
          console.error(err)
          this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
        }).finally(() => {
          this.chLoadingShow({show:false})
          this.componentKey ++
        })
      }else if(this.searchIpt.EndDay == "" || this.searchIpt.StartDay== ""){
        this.chMsgbar({ success: false, msg: '請選擇 查詢月份(起) 和 查詢月份(迄)' })
      }else{
        this.chMsgbar({ success: false, msg: '查詢月份(起) 不得大於 查詢月份(迄)' })
      }
    },
    // 清除搜尋內容
    reset() {
      this.searchIpt= {
        // 搜尋欄位
        EndDay: "",
        StartDay: "",
        wbs: "",
        wbsShow: "",
        Dept: "",
      }
    },
    //打開設備標示編碼搜尋框
    goEq() {
      this.componentKey += 1
      this.eqCodeShow = true
    },
    //關閉設備標示編碼搜尋框
    cancel() {
      this.eqCodeShow = false
    },
    //抓取未確認的設備標示編碼
    getTempCode(value) {
      this.searchTemp.wbs = value
    },
    //抓取未確認的設備標示編碼中文
    getTempName(value) {
      this.searchTemp.wbsShow = value
    },
    //確認設備標示編碼，寫入
    setWBS() {
      this.searchIpt.wbs = this.searchTemp.wbs
      this.searchIpt.wbsShow = this.searchTemp.wbsShow
      this.cancel()
    },
    getOrg() {
      this.deptLoading = true
      fetchOrganization({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res => {
        if (res.data.ErrorCode == 0) {
          this.selectDept = ["" , ...decodeObject(res.data.user_depart_list_group_1.map(item=>item.DepartName)),...decodeObject(res.data.user_depart_list_group_2.map(item=>item.DepartName)),...decodeObject(res.data.user_depart_list_group_3.map(item=>item.DepartName))]
        } else {
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          this.$router.push({ path: '/error' })
        }
      }).catch( err => {
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
      }).finally(() => {
        this.deptLoading = false
      })
    },
  },
};
</script>
