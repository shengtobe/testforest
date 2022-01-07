<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2 label-title">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2 label-header">
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="檢查日期(起)"
          v-model="input.dateStart"
          :showIcon="formIconShow"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="檢查日期(迄)"
          v-model="input.dateEnd"
          :showIcon="formIconShow"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1" v-if="formIconShow">mdi-domain</v-icon>車站
        </h3>
        <v-select 
          :items="stationList" 
          v-model="input.stationId"
          solo />
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn dark large class="mb-sm-8 mb-md-8 btn-search" @click="search">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn
          elevation="3"
          dark
          large
          class="ml-4 ml-sm-4 ml-md-4 mb-sm-8 mb-md-8 btn-add"
          @click="newOne"
        >
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
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
            class="theme-table"
          >
            <template v-slot:no-data>
              <span class="red--text subtitle-1">沒有資料</span>
            </template>

            <template v-slot:loading>
              <span class="red--text subtitle-1">資料讀取中...</span>
            </template>

            <template v-slot:item.StationCode="{ item }">
              {{ stationList.find(e=>e.value==item.StationCode).text }}
            </template>

            <!-- headers 的 content 欄位 (檢視內容) -->
            <template v-slot:item.content="{ item }">
              <v-btn
                title="詳細資料"
                class="mr-2 btn-memo"
                small
                dark
                fab
                @click="viewPage(item.RPFlowNo)"
              >
                <v-icon dark>mdi-pen</v-icon>
              </v-btn>
              <v-btn
                title="刪除"
                small
                dark
                fab
                class="btn-delete"
                @click="del(item.RPFlowNo)"
              >
                <v-icon dark>mdi-delete</v-icon>
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
    <Edit ref="EditPage" @goSearch="search"/>
  </v-container>
</template>
<style scope>

</style>
<script>
import Pagination from "@/components/Pagination.vue";
import dateSelect from "@/components/forManage/dateSelect";
import Edit from "./SecurityChecklistEdit";

import { mapState, mapActions } from "vuex";
import { getNowFullTime, getTodayDateString, unique } from "@/assets/js/commonFun";
import { securityQuerylist } from '@/apis/formManage/serve';

import { stations } from "@/assets/js/securitySettings";
import { Constrant } from "@/assets/js/constrant";

export default {
  data() {
    return {
      title: "保安裝置檢查紀錄表",
      newText: "紀錄表",
      formIconShow: true,
      input: {
        dateStart: '',
        dateEnd: '',
        stationId: '',
      },
      headers: [
        // 表格顯示的欄位 DepartCode ID Name
        { text: "項次", value: "ItemNo", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "車站", value: "StationCode", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "保養日期", value: "CheckDay", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        // { text: "審查狀態", value: "CheckStatus", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "填寫人", value: "Man", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "保養單位", value: "DepartName", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "功能", value: "content", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
      ],
      tableItems: [],
      pageOpt: { page: 1 }, // 目前頁數
    };
  },
  components: { 
    Pagination, 
    dateSelect,
    Edit
  },
  computed: {
    ...mapState ('user', {
        userData: state => state.userData,  // 使用者基本資料
    }),
    stationList() {
      return [
        { 
          value: "",
          text: "請選擇" 
        },
        ...stations.map(e=>({
          value: e.stationCode,
          text: e.stationName
        }))
      ]
    }
  },
  created() {
    this.input.dateStart = this.input.dateEnd = getTodayDateString()
  },
  methods: {
    ...mapActions('system', [
      'chLoadingShow',  // 切換 loading 圖顯示
      'chMsgbar',  // 改變 messageBar
    ]),
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    newOne() {
      //直接呼叫component裡面的事件
      this.$refs.EditPage.newOne()
    },
    search() {
      securityQuerylist({
        ClientReqTime: getNowFullTime(),
        OperatorID: this.userData.UserId,  // 操作人id
        StartDayVlaue: this.input.dateStart?this.input.dateStart:"",
        EndDayVlaue: this.input.dateEnd?this.input.dateEnd:"",
        StationCode: this.input.stationId
      }).then(res=>{
        if(res.data.ErrorCode == 0) {
          this.tableItems = unique(res.data.Data)
        } else {
          this.chMsgbar({ success: false, msg: Constrant.query.failed })
        }
      })
    },
    viewPage(RPFlowNo) {
      //直接呼叫component裡面的事件
      this.$refs.EditPage.editOne(RPFlowNo)
    },
    del(RPFlowNo) {
      //直接呼叫component裡面的事件
      this.$refs.EditPage.befDel(RPFlowNo)
    }
  },
};
</script>