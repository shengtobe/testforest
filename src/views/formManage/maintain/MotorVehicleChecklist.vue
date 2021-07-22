<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2 label-title">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2 label-header">
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="檢查日期(起)"
          key="dateStart"
          :showIcon="formData.settings.formIconShow"
          v-model="formData.searchItem.dateStart"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="檢查日期(迄)"
          key="dateEnd"
          :showIcon="formData.settings.formIconShow"
          v-model="formData.searchItem.dateEnd"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <deptSelect
          label="管理單位"
          v-model="formData.searchItem.department"
          :showIcon="formData.settings.formIconShow"
          outType="key"
          key="department"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3"></v-col>

      <v-col cols="12" sm="3" md="3">
        <v-form ref="uploadform">
          <UploadOneFileAdd @joinFile="select" />
        </v-form>
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn dark large class="mb-sm-8 mb-md-8 btn-fileup">
          <v-icon class="mr-1">mdi-cloud-upload</v-icon>上傳
        </v-btn>
      </v-col>
    </v-row>
    <ToolBar @search="search" @reset="reset" @newOne="newOne" :text="newText" />

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
          class="theme-card"
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
      </v-card>
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
import { fetchFormOrderList } from "@/apis/formManage/serve";
import UploadOneFileAdd from '@/components/UploadOneFileAdd.vue';
import dateSelect from "@/components/forManage/dateSelect";
import deptSelect from "@/components/forManage/deptSelect";
import EditPage from "@/views/formManage/maintain/MotorVehicleChecklistEdit";
import { Actions } from "@/assets/js/actions";
import dialogDelete from "@/components/forManage/dialogDelete";
import ToolBar from "@/components/forManage/toolbar";

export default {
  data() {
    return {
      title: "機動台車輛每日作業前自動檢點表",
      newText: "檢點表",
      action: Actions.add,
      actions: Actions,
      file: null,
      isLoading: false,
      disabled: false,
      // controls for dialog
      ShowDetailDialog: false,
      dialogDel: false, // model off
      Add: false,
      pageOpt: { page: 1 }, // 目前頁數
      //---api---
      DB_Table: "RP030",
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
        },
      },
      DynamicKey: 0,
      DelDynamicKey: 0,
      editType: "",
      editItem: {},
      //
      nowTime: "",
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
        {
          text: "審查狀態",
          value: "CheckStatus",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
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
    };
  },
  components: {
    Pagination, // 頁碼
    dateSelect,
    deptSelect,
    EditPage,
    ToolBar,
    dialogDelete,
    UploadOneFileAdd
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
    select(file) {
        this.file = file
    },
    ...mapActions("system", [
      "chMsgbar", // messageBar
      "chLoadingShow", // 切換 loading 圖顯示
    ]),
    newOne() {
      console.log("newOne23");
      this.Add = true;
      console.log("this.Add: " + this.Add);
      this.DynamicKey += 1;
      this.editType = this.actions.add;
    },
    reset() {
      this.formData.searchItem.dateStart = "";
      this.formData.searchItem.dateEnd = "";
      this.formData.searchItem.department = "";
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 搜尋
    search() {
      console.log("Search click");
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
          { Column: "DepartCode", Value: this.formData.searchItem.department },
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
          console.log(err);
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
      console.log(item);
      console.log("RPFlowNo: " + item.RPFlowNo);
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