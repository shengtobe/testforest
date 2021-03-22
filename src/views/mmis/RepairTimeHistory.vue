<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4">維修工時履歷</h2>

    <v-row class="px-2 mb-8">
      <!-- 查詢時間(起訖) -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>派工時間(起)
        </h3>
        <v-menu
          v-model="dateSelect.StartDay"
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
            @input="dateSelect.StartDay = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>

      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>派工時間(迄)
        </h3>
        <v-menu
          v-model="dateSelect.EndDay"
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
            @input="dateSelect.EndDay = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>

      <!-- 科室 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-contacts</v-icon>科室
        </h3>
        <v-select solo hide-details :loading="deptLoading" :items="selectDept" v-model="searchIpt.Dept" />
      </v-col>
      
      <!-- WBS -->
      <v-col cols="12" sm="12" md="9">
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
      <!-- 立單日期 -->
      <!-- <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>立單日期
        </h3>
        <v-menu
          v-model="Established"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="searchIpt.Established" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="searchIpt.Established"
            @input="Established = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col> -->

      <v-col cols="12">
        <v-divider class="mt-2 mb-3" />
      </v-col>
      <!-- 派工時間 -->
      <!-- <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-av-timer</v-icon>派工時間
        </h3>
        <v-menu
          v-model="scheduleDate"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="searchIpt.scheduleDate" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="searchIpt.scheduleDate"
            @input="scheduleDate = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col> -->
      <!-- 到修時間 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-av-timer</v-icon>到修時間
        </h3>
        <v-menu
          v-model="dateSelect.RepairDate"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="searchIpt.RepairDate" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="searchIpt.RepairDate"
            @input="dateSelect.RepairDate = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <!-- 動工時間 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-av-timer</v-icon>動工時間
        </h3>
        <v-menu
          v-model="dateSelect.StartWorkDate"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="searchIpt.StartWorkDate" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="searchIpt.StartWorkDate"
            @input="dateSelect.StartWorkDate = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <!-- 完工時間 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-av-timer</v-icon>完工時間
        </h3>
        <v-menu
          v-model="dateSelect.FinishedDate"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="searchIpt.FinishedDate" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="searchIpt.FinishedDate"
            @input="dateSelect.FinishedDate = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <!-- 驗收時間 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-av-timer</v-icon>驗收時間
        </h3>
        <v-menu
          v-model="dateSelect.AcceptanceDate"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="searchIpt.AcceptanceDate" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="searchIpt.AcceptanceDate"
            @input="dateSelect.AcceptanceDate = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <!-- 結案時間 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-av-timer</v-icon>結案時間
        </h3>
        <v-menu
          v-model="dateSelect.closDate"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="searchIpt.closDate" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="searchIpt.closDate"
            @input="dateSelect.closDate = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <!-- 維修總工時 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-screwdriver</v-icon>維修總工時
        </h3>
        <v-text-field type="number" min="0" v-model.trim="searchIpt.Material" solo />
      </v-col>

      <v-col cols="12" class="mb-8">
        <v-btn color="success" large class="mr-3" @click="search">
          <v-icon>mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn elevation="2" large @click="reset">
          <v-icon>mdi-reload</v-icon>清除搜尋內容
        </v-btn>
      </v-col>

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

            <template v-slot:item.action="{ item }">
              <v-btn fab small color="primary" class="mr-2" @click="Edit = true">
                <v-icon>mdi-pen</v-icon>
              </v-btn>

              <v-btn fab small color="error" @click="Delete = true">
                <v-icon>mdi-delete</v-icon>
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
    <v-dialog v-model="contentShow" max-width="700px">
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
              <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>
              立單日期： {{ content.Established }}
            </v-col>
            <v-col cols="12">
              <v-divider class="mt-2 mb-3" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-icon class="mr-1 mb-1">mdi-av-timer</v-icon>
              派工時間： {{ content.scheduleDate }}
            </v-col>
            <v-col cols="12" sm="6">
              <v-icon class="mr-1 mb-1">mdi-av-timer</v-icon>
              到修時間： {{ content.RepairDate }}
            </v-col>
            <v-col cols="12">
              <v-divider class="mt-2 mb-3" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-icon class="mr-1 mb-1">mdi-av-timer</v-icon>
              動工時間： {{ content.StartWorkDate }}
            </v-col>
            <v-col cols="12" sm="6">
              <v-icon class="mr-1 mb-1">mdi-av-timer</v-icon>
              完工時間： {{ content.FinishedDate }}
            </v-col>
            <v-col cols="12">
              <v-divider class="mt-2 mb-3" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-icon class="mr-1 mb-1">mdi-av-timer</v-icon>
              驗收時間： {{ content.AcceptanceDate }}
            </v-col>
            <v-col cols="12" sm="6">
              <v-icon class="mr-1 mb-1">mdi-av-timer</v-icon>
              結案時間： {{ content.closDate }}
            </v-col>
            <v-col cols="12">
              <v-divider class="mt-2 mb-3" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-icon class="mr-1 mb-1">mdi-timetable</v-icon>
              維修總工時： {{ content.WorkTotalHours }}
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
import { workTimeQueryList,workTimeQuery } from '@/apis/materialManage/rpresume'

export default {
  data: () => ({
    searchIpt: {
      // 搜尋欄位
      EndDay: "",
      StartDay: "",
      wbs: "",
      wbsShow: "",
      Dept: "",
      Material: "",
      schedulehour: "",
      schedulemin: "",
      scheduleDate: "",
      RepairDate: "",
      StartWorkDate: "",
      FinishedDate: "",
      AcceptanceDate: "",
      closDate: "",
    },
    dateSelect: {
      StartDay: false,
      EndDay: false,
      RepairDate: false,
      StartWorkDate: false,
      FinishedDate: false,
      AcceptanceDate: false,
      closDate: false
    },
    searchTemp: {
      wbs: "",
      wbsShow: "",
    },
    componentKey: 0,
    dataForEqCode: {
      toLv: 4,
    },
    eqCodeShow: false,
    deptLoading: false,
    selectDept: [],
    tableItems: [
      
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
    EquipRepairCode,
  },
  mounted() {
    this.getOrg()
   // this.search()
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
    // 搜尋
    search() {
      if(parseInt(this.searchIpt.StartDay.replace(/-/g,"")) <= parseInt(this.searchIpt.EndDay.replace(/-/g,"")) || (this.searchIpt.EndDay == "" && this.searchIpt.StartDay== "")){
        this.chLoadingShow()
        const wbs = this.searchIpt.wbs.split('-')
        const sendData = {
          CreateDTime_Start: this.searchIpt.StartDay,
          CreateDTime_End: this.searchIpt.EndDay,
          DepartName: this.searchIpt.Dept,
          MaintainCode_System: wbs[0]||"",
          MaintainCode_Loc: wbs[1]||"",
          MaintainCode_Eqp: wbs[2]||"",
          MaintainCode_Seq: wbs[3]||"",
          ArrivalWorkDTime: this.searchIpt.RepairDate,	
          StartWorkDTime: this.searchIpt.StartWorkDate,
          FinishDTime: this.searchIpt.FinishedDate,
          AcceptDTime: this.searchIpt.AcceptanceDate,
          CloseDTime: this.searchIpt.closDate,
          TotalWorkTime: this.searchIpt.Material,
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id
        }
        workTimeQueryList({
          ...sendData
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
              return rtnObj
            })
          } else {
            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
            this.$router.push({ path: '/error' })
          }
        }).catch( err => {
          console.warn(err)
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
      this.searchIpt = {
        // 搜尋欄位
        EndDay: "",
        StartDay: "",
        wbs: "",
        wbsShow: "",
        Dept: "",
        Material: "",
        schedulehour: "",
        schedulemin: "",
        scheduleDate: "",
        RepairDate: "",
        StartWorkDate: "",
        FinishedDate: "",
        AcceptanceDate: "",
        closDate: "",
      }
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
    setWBS() { //確認設備標示編碼，寫入
      this.searchIpt.wbs = this.searchTemp.wbs
      this.searchIpt.wbsShow = this.searchTemp.wbsShow
      this.cancel()
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 顯示詳細資訊
    // 顯示詳細資訊
    view(woID) {
      this.chLoadingShow()
      workTimeQuery({
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
          this.content.RepairDate = dataList.ArrivalWorkDTime
          this.content.StartWorkDate = dataList.StartWorkDTime
          this.content.FinishedDate = dataList.FinishDTime
          this.content.AcceptanceDate = dataList.AcceptDTime
          this.content.closDate = dataList.CloseDTime
          this.content.WorkTotalHours = dataList.TotalWorkTime
          this.content.FaultDepict = dataList.Malfunctiont
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
