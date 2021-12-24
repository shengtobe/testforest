<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2 label-title">{{ title }}</h2>
    <v-row class="px-2 label-header">
      <!-- 第一排選項 -->
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="保養日期(起)"
          key="dateStart"
          :showIcon="formData.settings.formIconShow"
          v-model="formData.searchItem.dateStart"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="保養日期(迄)"
          key="dateEnd"
          :showIcon="formData.settings.formIconShow"
          v-model="formData.searchItem.dateEnd"
        />
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>選擇車輛編號
        </h3>
        <!-- <v-select v-model="formData.searchItem.carNo" :items="CarNos" solo /> -->
        <v-text-field v-model="formData.searchItem.carNo" solo />
      </v-col>
    </v-row>
    <ToolBar @search="search" @reset="reset" @newOne="newOne" :text="newText" />
    <!-- 動力車保養紀錄 -->
    <v-col cols="12" sm="12" md="12">
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

        <!-- headers 的 content 欄位 (檢視內容) -->
        <template v-slot:item.content="{ item }">
          <v-btn
            title="詳細資料"
            class="mr-2 btn-memo"
            small
            dark
            fab
            @click="viewPage(item)"
          >
            <v-icon dark>mdi-pen</v-icon>
          </v-btn>
          <v-btn
            title="刪除"
            small
            dark
            fab
            class="btn-delete"
            @click="deleteRecord(item.RPFlowNo)"
          >
            <v-icon dark>mdi-delete</v-icon>
          </v-btn>
        </template>

        <!-- 頁碼 -->
        <template v-slot:footer="footer">
          <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
        </template>
      </v-data-table>
    </v-col>

    <v-col cols="12" sm="12" md="12">
      <span>
        備註：
        <br />（一）使用時數達<strong>40小時</strong>應將空氣濾清器芯子拆下清理﹔使用時數達<strong>180小時</strong>應進行機油更換；使用時數達<strong>250小時</strong>，應將機油濾清芯子、柴油濾清芯子與空氣濾清芯子換新。
        <br />（二）本項保養作業由司機或車庫檢修人員擔任，經車庫長監督後，記錄表由車庫存查。
        <br />（三）工作記號說明：實施完畢者。
      </span>
    </v-col>
    <!-- 刪除確認視窗 -->
    <v-dialog v-model="dialogDel" persistent max-width="290">
      <dialogDelete
        :id="userData.UserId"
        :DB_Table="DB_Table"
        :RPFlowNo="RPFlowNo"
        :key="'d' + DelDynamicKey"
        @search="search"
        @close="close"
        @cancel="closeDialogDel"
      />
    </v-dialog>
    <!-- 新增自動檢點表 modal -->
    <v-dialog v-model="Add" persistent max-width="900px">
      <EditPage
        @close="close"
        @search="search"
        @deleteRecord="deleteRecord"
        :key="DynamicKey"
        :item="editItem"
        :editType="editType"
        :DB_Table="DB_Table"
        :title="title"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from "vuex";
import {
  getNowFullTime,
  getTodayDateString,
  unique,
  decodeObject,
} from "@/assets/js/commonFun";
import { maintainStatusOpts } from "@/assets/js/workList";
import { fetchFormOrderList, deleteFormOrder } from "@/apis/formManage/serve";
import dateSelect from "@/components/forManage/dateSelect";
import deptSelect from "@/components/forManage/deptSelect";
import EditPage from "@/views/formManage/curing/LocomotiveGeneratorOverhaulEdit";
import { Actions } from "@/assets/js/actions";
import dialogDelete from "@/components/forManage/dialogDelete";
import ToolBar from "@/components/forManage/toolbar";
import { Constrant } from "@/assets/js/constrant";

export default {
  data: () => ({
    title: "柴油液力機車發電機檢修",
    newText: "檢修紀錄",
    actions: Actions,
    isLoading: false,
    disabled: false,
    // controls for dialog
    ShowDetailDialog: false,
    dialogDel: false, // model off
    Add: false,
    pageOpt: { page: 1 }, // 目前頁數

    //---api---
    DB_Table: "RP048",
    RPFlowNo: "",
    //搜尋欄位設定
    formData: {
      settings: {
        formIconShow: true,
      },
      searchItem: {
        dateStart: "",
        dateEnd: "",
        department: "",
        carNo: "",
      },
    },
    DynamicKey: 0,
    DelDynamicKey: 0,
    editType: "",
    editItem: {},
    headers: [
      // 表格顯示的欄位 DepartCode ID Name
      {
        text: "項次",
        value: "ItemNo",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "保養日期",
        value: "CheckDay",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      // {
      //   text: "審查狀態",
      //   value: "CheckStatus",
      //   align: "center",
      //   divider: true,
      //   class: "subtitle-1 white--text font-weight-bold",
      // },
      {
        text: "填寫人",
        value: "Name",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "保養單位",
        value: "DepartName",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "功能",
        value: "content",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
    ],
    tableItems: [],
    // TODO: 應從資料庫取
    CarNos: [
      { text: "A0001", value: "A" },
      { text: "A0002", value: "B" },
      { text: "A0003", value: "C" },
      { text: "A0004", value: "D" },
      { text: "A0005", value: "E" },
    ],
    //------
  }),
  components: {
    Pagination, // 頁碼
    dateSelect,
    deptSelect,
    EditPage,
    ToolBar,
    dialogDelete,
  },
  computed: {
    ...mapState("user", {
      userData: (state) => state.userData, // 使用者基本資料
    }),
  },
  created() {
    this.formData.searchItem.dateStart = this.formData.searchItem.dateEnd = this.nowTime = getTodayDateString();
  },
  mounted() {
    this.search();
  },
  methods: {
    ...mapActions("system", [
      "chMsgbar", // messageBar
      "chLoadingShow", // 切換 loading 圖顯示
    ]),
    newOne() {
     ;
      this.Add = true;
      this.DynamicKey += 1;
      this.editType = this.actions.add;
    },
    reset() {
      this.formData.searchItem.dateStart = "";
      this.formData.searchItem.dateEnd = "";
      this.formData.searchItem.carNo = "";
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 搜尋
    search() {
      let d1 = Date.parse(this.formData.searchItem.dateStart)
      let d2 = Date.parse(this.formData.searchItem.dateEnd)
      if(d1 > d2){
        alert('時間範圍錯誤')
        return
      }
      this.chLoadingShow({show:true});
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.userData.UserId, // 操作人id
        KeyName: this.DB_Table, // DB table
        KeyItem: [
          {
            Column: "StartDayVlaue",
            Value: this.formData.searchItem.dateStart,
          },
          { Column: "EndDayVlaue", Value: this.formData.searchItem.dateEnd },
          { Column: "CarNo", Value: this.formData.searchItem.carNo },
        ],
        QyName: [
          "RPFlowNo",
          "ID",
          "Name",
          "CheckDay",
          "CheckStatus",
          "FlowId",
          "DepartName",
        ],
      })
        .then((res) => {
          this.tableItems = decodeObject(unique(JSON.parse(res.data.DT)));
        })
        .catch((err) => {
          ////console.log(err);
          this.chMsgbar({ success: false, msg: Constrant.query.failed });
        })
        .finally(() => {
          this.chLoadingShow({ show: false});
        });
    },
    // 關閉刪除確認dialod
    closeDialogDel() {
      this.dialogDel = false;
    },
    // 關閉 dialog
    close() {
      this.Add = false;
      this.dialogDel = false;
    },
    viewPage(item) {
     
     
      this.DynamicKey += 1;
      this.editType = this.actions.edit;
      this.editItem = item;
      this.Add = true;
    },
    deleteRecord(RPFlowNo) {
      this.dialogDel = true;
      this.DelDynamicKey += 1;
      this.RPFlowNo = RPFlowNo;
    },
  },
};
</script>
