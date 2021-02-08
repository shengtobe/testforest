<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4">維修費用履歷</h2>
    <!-- 查詢表單 -->
    <v-row class="px-2">
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>查詢時間(起)
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
            color="purple"
            v-model="searchIpt.StartDay"
            @input="StartDay = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>

      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>查詢時間(迄)
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
            color="purple"
            v-model="searchIpt.EndDay"
            @input="EndDay = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>

      <v-col cols="12" sm="8" md="6">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-message-processing</v-icon>設備標示編號(WBS)
        </h3>
        <v-text-field v-model.trim="searchIpt.wbsShow" readonly solo @click="goEq"  />
      </v-col>

      <v-dialog v-model="eqCodeShow" max-width="900px">
        <v-card>
          <v-card-title class="yellow darken-1 px-4 py-1">
            選擇設備標示編號(WBS)
            <v-spacer />
            <v-btn fab small text @click="cancel" class="mr-n2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <EquipRepairCode :key="componentKey" :toLv="dataForEqCode.toLv" :nowEqCode="searchIpt.wbs" @getEqCode="getTempCode" @getEqName="getTempName"/>
          <v-card-actions class="px-5 pb-5">
            <v-spacer></v-spacer>
            <v-btn class="mr-2" elevation="4" @click="cancel">取消</v-btn>
            <v-btn color="success" elevation="4" @click="setWBS">送出</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-contacts</v-icon>科室
        </h3>
        <v-select solo hide-details :loading="deptLoading" :items="selectDept" v-model="searchIpt.Dept" />
      </v-col>

      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-screwdriver</v-icon>維修費用
        </h3>
        <v-text-field type="Number" min=0 v-model.trim="searchIpt.RepairFees" solo />
      </v-col>

      <v-col cols="12" class="mb-8">
        <v-btn color="success" large class="mr-3" @click="search">
          <v-icon>mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn elevation="2" large @click="reset">
          <v-icon>mdi-reload</v-icon>清除搜尋內容
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="px-2 mb-8">
      <!-- 表格資料 -->
      <v-col cols="12">
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

            <template v-slot:item.ViewTicket="{ item }">
              <v-btn fab small dark color="teal" @click="view(item.WorkNumber)">
                <v-icon>mdi-file-document</v-icon>
              </v-btn>
            </template>

            <!-- 頁碼 -->
            <template v-slot:footer="footer">
              <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- 檢視工單 -->
    <v-dialog v-model="contentShow" max-width="900px">
      <v-card>
        <v-card-title class="yellow darken-1 px-4 py-1">
          檢視工單
          <v-spacer />
          <v-btn fab small text @click="contentShow = false" class="mr-n2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <div class="px-4 py-3">
          <v-row no-gutters>
            <v-col cols="12">
              <v-icon class="mr-1 mb-1">mdi-clipboard-text</v-icon>
              工單編號： {{ content.WorkNumber }}
            </v-col>
            <v-col cols="12">
              <v-divider class="mt-2 mb-3" />
            </v-col>
            <v-col cols="12">
              <v-icon class="mr-1 mb-1">mdi-more</v-icon>
              設備標示編號： {{ content.wbs }}
            </v-col>
            <v-col cols="12">
              <v-divider class="mt-2 mb-3" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-icon class="mr-1 mb-1">mdi-domain</v-icon>
              科室： {{ content.Dept }}
            </v-col>
            <v-col cols="12" sm="6">
              <v-icon class="mr-1 mb-1">mdi-screwdriver</v-icon>
              維修費用： {{ content.RepairFees }}
            </v-col>
            <v-col cols="12">
              <v-divider class="mt-2 mb-3" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-icon class="mr-1 mb-1">mdi-calendar-check</v-icon>
              立單日期： {{ content.Established }}
            </v-col>

            <v-col cols="12" sm="6">
              <v-icon class="mr-1 mb-1">mdi-calendar-multiple-check</v-icon>
              結案時間： {{ content.ClosingTime }}
            </v-col>

            <v-col cols="12">
              <v-divider class="mt-2 mb-3" />
            </v-col>

            <v-col cols="12">
              <v-icon class="mr-1 mb-1">mdi-comment-alert-outline</v-icon>
              故障描述： {{ content.FaultDepict }}
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime,decodeObject } from '@/assets/js/commonFun'
import Pagination from "@/components/Pagination";
import EquipRepairCode from '@/components/EquipRepairCode'
import { fetchOrganization } from '@/apis/organization'
import { costQueryList,costQuery } from '@/apis/materialManage/rpresume'
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
      toLv: 4,
    },
    selectDept: [],
    deptLoading: false,
    //------------------
    tableItems: [
      {
        id: "1",
        WorkNumber: "AA_201011",
        Dept: "養護科",
        wbs: "PTT-UCC-NUK-168",
        Established: "2010-10-10",
        FaultDepict: "故障描述故障描述",
        RepairFees: 100,
        ClosingTime: "2010-10-20",
      },
      {
        id: "2",
        WorkNumber: "AA_201012",
        Dept: "養護科",
        wbs: "PTT-UCC-NUK-169",
        Established: "2010-10-10",
        FaultDepict: "故障描述故障描述",
        RepairFees: 200,
        ClosingTime: "2010-10-20",
      },
      {
        id: "3",
        WorkNumber: "AA_201013",
        Dept: "養護科",
        wbs: "PTT-UCC-NUK-170",
        Established: "2010-10-10",
        FaultDepict: "故障描述故障描述",
        RepairFees: 300,
        ClosingTime: "2010-10-20",
      },
      {
        id: "4",
        WorkNumber: "AA_201014",
        Dept: "養護科",
        wbs: "PTT-UCC-NUK-171",
        Established: "2010-10-10",
        FaultDepict: "故障描述故障描述",
        RepairFees: 300,
        ClosingTime: "2010-10-20",
      },
      {
        id: "5",
        WorkNumber: "AA_201015",
        Dept: "養護科",
        wbs: "PTT-UCC-NUK-165",
        Established: "2010-10-10",
        FaultDepict: "故障描述故障描述",
        RepairFees: 500,
        ClosingTime: "2010-10-20",
      },
    ], // 表格資料
    pageOpt: { page: 1 }, // 目前頁數
    headers: [
      // 表格顯示的欄位
      {
        text: "項次",
        value: "id",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "工單編號",
        value: "WorkNumber",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "科室",
        value: "Dept",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "設備標示編號",
        value: "wbs",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "立單日期",
        value: "Established",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "檢視工單",
        value: "ViewTicket",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
     
    ],
    contentShow: false, // 詳細內容 dialog 是否顯示
    content: {}, // 詳細內容欄位
  }),
  components: { 
    Pagination, // 頁碼
    EquipRepairCode, //選擇設備報修碼
  },
  mounted() {
    this.getOrg()
    this.search()
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
      if(parseInt(this.searchIpt.StartDay.replace(/-/g,"")) <= parseInt(this.searchIpt.EndDay.replace(/-/g,"")) || (this.searchIpt.EndDay == "" && this.searchIpt.StartDay== "")){
        this.chLoadingShow()
        const wbs = this.searchIpt.wbs.split('-')
        costQueryList({
          CreateDTime_Start: this.searchIpt.StartDay,
          CreateDTime_End: this.searchIpt.EndDay,
          DepartName: this.searchIpt.Dept,
          TotalSpent: this.searchIpt.RepairFees,
          MaintainCode_System: wbs[0],
          MaintainCode_Loc: wbs[1],
          MaintainCode_Eqp: wbs[2],
          MaintainCode_Seq: wbs[3],
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id
        }).then(res => {
          if (res.data.ErrorCode == 0) {
            const dataList = decodeObject(res.data.WorkDataList)
            this.tableItems = dataList.map((e,i)=>{
              let rtnObj = {}
              rtnObj.id=i+1
              rtnObj.WorkNumber = e.WorkOrderID
              rtnObj.Dept= e.DispatchDepart
              rtnObj.wbs = e.MaintainCode_System + '-' + e.MaintainCode_Loc + '-' + e.MaintainCode_Eqp + '-' + e.MaintainCode_Seq
              rtnObj.Established = e.CallWorkDTime
            })
          } else {
            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
            this.$router.push({ path: '/error' })
          }
        }).catch( err => {
          this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
        }).finally(() => {
          this.chLoadingShow()
        })
      }else{
        this.chMsgbar({ success: false, msg: '查詢日期(起) 不得大於 查詢日期(迄)' })
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
        RepairFees: "",
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
          this.selectDept = decodeObject(res.data.user_depart_list_group_1.map(item=>item.DepartName))
          this.selectDept = ["" , ...this.selectDept]
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
    //========================================================================//

    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 顯示詳細資訊
    view(woID) {
      this.chLoadingShow()
      costQuery({
        WorkerOrderID: woID,
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res => {
        if (res.data.ErrorCode == 0) {
          const dataList = decodeObject(res.data.WorkDataList[0])
          this.content.WorkNumber = dataList.WorkOrderID
          this.content.Dept= dataList.DispatchDepart
          this.content.wbs = dataList.MaintainCode_System + '-' + dataList.MaintainCode_Loc + '-' + dataList.MaintainCode_Eqp + '-' + dataList.MaintainCode_Seq
          this.content.Established = dataList.CallWorkDTime
          this.content.FaultDepict = dataList.Malfunction
          this.content.ClosingTime = dataList.CloseDTime
          this.content.RepairFees = dataList.TotalSpent
        } else {
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          this.$router.push({ path: '/error' })
        }
      }).catch( err => {
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
      }).finally(() => {
        this.chLoadingShow()
        this.contentShow = true
      })
    },
  },
};
</script>
