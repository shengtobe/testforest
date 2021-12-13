<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">週期性工作提醒</h2>

    <v-divider class="mx-2 mt-5 mb-4" />

    <v-row class="px-2 label-header">
      <!-- 控制措施 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>查詢日期(起)
        </h3>
        <v-menu
          v-model="q_datestart"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="datestart" solo v-on="on" readonly clearable @click:clear="timeAClean"/>
          </template>
          <v-date-picker
            color="primary"
            v-model="datestart"
            @input="timeA"
            :max="dateAMax"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>查詢日期(迄)
        </h3>
        <v-menu
          v-model="q_dateend"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="dateend" solo v-on="on" readonly clearable @click:clear="timeBClean"/>
          </template>
          <v-date-picker
            color="primary"
            v-model="dateend"
            @input="timeB"
            :min="dateBMin"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <v-col cols="12" md="3" align-self="center">
        <v-btn class="btn-search" dark large @click="getQueryList">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn dark large class="ml-2 btn-add" @click="_goAdd">
          <v-icon class="mr-1">mdi-plus</v-icon>新增
        </v-btn>
      </v-col>

      <v-col cols="12">
        <v-card>
          <!-- <v-data-table
            :headers="headers"
            :items="tableItems"
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            item-key="id"
            show-expand
            :options.sync="pageOpt"
            hide-default-footer
          > -->
          <v-data-table
            :headers="headers"
            :items="tableItems"
            item-key="id"
            :options.sync="pageOpt"
            hide-default-footer
            class="theme-table"
          >
            <template v-slot:no-data>
              <span class="red--text subtitle-1">沒有資料</span>
            </template>

            <template v-slot:loading>
              <span class="red--text subtitle-1">資料讀取中...</span>
            </template>
            <template v-slot:item.a8="{item}">
              <v-btn fab small class="mr-2 btn-modify white--text" @click="_goEdit(item.AlarmFlowID)">
                <v-icon>mdi-pen</v-icon>
              </v-btn>

              <v-btn fab small class="btn-delete white--text" @click="_goDelete(item.AlarmFlowID)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <!-- <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <div class="row">
                  <div class="col-12 col-md-8">
                    <v-chip class="ma-2" color="cyan" label>提醒多人</v-chip>
                    {{ item.t_name }}
                  </div>
                </div>
              </td>
            </template> -->

            <template v-slot:footer="footer">
              <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <!-- 編輯資料 modal -->
      <v-dialog v-model="Edit" max-width="900px">
        <PeriodcityEdit :key="componentKey" :flowId="thisflow" :inType="inType" @close="close"/>
      </v-dialog>
      <!-- 刪除 modal -->
      <v-dialog v-model="Delete" persistent max-width="290">
        <v-card class="theme-del-card">
          <v-card-title class="white--text px-4 py-1 headline">確認是否刪除?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="btn-close white--text" @click="close">取消</v-btn>
            <v-btn :loading="isLoading" class="btn-delete white--text" @click="_delete">刪除</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Pagination from "@/components/Pagination.vue";
import { jobQueryList,jobDelete } from '@/apis/materialManage/routine'
import { getNowFullTime,decodeObject } from '@/assets/js/commonFun'
import PeriodcityEdit from '@/views/mmis/PeriodicityJobEdit'
export default {
  data: () => ({
    Add: false,
    Edit: false,
    Delete: false,
    dateAMax: '',
    dateBMin: '',
    pageOpt: { page: 1 },
    expanded: [],
    singleExpand: true,
    headers: [
      // 控制措施權責部門的表格欄位
      {
        text: "項次",
        value: "id",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "單位(廠/庫、監工區)",
        value: "DepartName",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "工作提醒事項",
        value: "Memo",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "通知起始日",
        value: "AlarmDTime",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "提醒週期(日曆天)",
        value: "Cycle",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "修改、刪除",
        value: "a8",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      // {
      //   text: "",
      //   value: "data-table-expand",
      //   divider: true,
      //   class: "subtitle-1 white--text font-weight-bold",
      // },
    ],
    tableItems: [
      
    ],
    q_datestart: "",
    q_dateend: "",
    a_datestart: "",
      datestart: "",
      dateend: "",
      add: {
        datestart: "",
      },
    isLoading: false,
    componentKey: 0,
    thisflow: "",
    inType: "",
    flow: ""
  }),
  components: {
    Pagination,
    PeriodcityEdit,
  },
  methods: {
    ...mapActions('system', [
      'chMsgbar',  // messageBar
      'chLoadingShow'  // 切換 loading 圖顯示
    ]),
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    close() {
      this.Edit = false;
      this.Delete = false;
      this.thisflow = ""
      this.getQueryList()
    },
    _goEdit(flow) {
      this.componentKey += 1
      this.thisflow = flow
      this.inType = "edit"
      this.Edit = true
    },
    _goAdd() {
      this.componentKey += 1
      this.thisflow = ""
      this.inType = "add"
      this.Edit = true
    },
    timeA(){
      this.q_datestart = false
      this.dateBMin = this.datestart
    },
    timeAClean(){
        this.dateBMin = ''
    },
    timeB(){
        this.q_dateend = false
        this.dateAMax = this.dateend
    },
    timeBClean(){
        this.dateAMax = ''
    },
    getQueryList() { //抓清單
      if(parseInt(this.datestart.replace(/-/g,"")) <= parseInt(this.dateend.replace(/-/g,"")) || (this.dateend == "" && this.datestart== "")){
        this.chLoadingShow({show:true})
        jobQueryList({
          CreateDTime_Start: this.datestart,
          CreateDTime_End: this.dateend,
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id
        }).then(res => {
          if (res.data.ErrorCode == 0) {
            this.tableItems = decodeObject(res.data.JobList)
            this.tableItems.forEach((e,i) => {
              e.AlarmDTime = e.AlarmDTime.split(' ')[0].replace(/\//g, "-")
              e.AlarmEndDTime = e.AlarmEndDTime.split(' ')[0].replace(/\//g, "-")
              e.id = (i+1).toString()
            })
          } else {
            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
            this.$router.push({ path: '/error' })
          }
        }).catch( err => {
          this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
        }).finally(() => {
          this.chLoadingShow({show:false})
        })
      }else{
        this.chMsgbar({ success: false, msg: '查詢日期(起) 不得大於 查詢日期(迄)' })
      }
    },
    _goDelete(flow) {
      this.flow = flow
      this.Delete = true
    },
    _delete() {
      this.isLoading = true
      let flow = this.flow
      jobDelete({
        AlarmFlowID: flow,
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res => {
        if (res.data.ErrorCode == 0) {
          this.chMsgbar({ success: true, msg: '資料刪除成功' })
        } else {
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          this.$router.push({ path: '/error' })
        }
      }).catch( err => {
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料刪除失敗' })
      }).finally(() => {
        this.isLoading = false
        this.flow = ""
        this.close()
      })
    }
  },
  computed: {
    ...mapState ('user', {
      userData: state => state.userData,  // 使用者基本資料
    }),
  },
  filters:{

  },
  created() {
    this.getQueryList()
  },
};
</script>
