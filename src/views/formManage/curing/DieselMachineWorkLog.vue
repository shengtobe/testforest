<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2 label-title">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2 label-header">
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="日誌日期"
          key="checkDate"
          :showIcon="formData.settings.formIconShow"
          v-model="formData.searchItem.checkDate"
        />
      </v-col>
    </v-row>
    <ToolBar @search="search" @reset="reset" @newOne="newOne('1')" :text="newText" />
    
    <!-- 表格資料 -->
    <v-col cols="12">
      <v-card>
        <v-data-table
          :headers="header1"
          :items="tableItem1"
          :options.sync="pageOpt1"
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
              @click="viewPage(item,'1')"
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
            <Pagination :footer="footer" :pageOpt="pageOpt1" @chPage="chPage" />
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <v-row class="px-2">
      <v-col cols="12" align-self="end" class="mb-5 text-md-right">
        <v-btn
          elevation="3"
          dark
          large
          class="mr-3 mb-3 btn-add"
          @click="newOne('2')"
        >
          <!-- @click="ShowDetailDialog = true" -->
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </v-col>
    </v-row>
    <!-- 表格資料 -->
    <v-col cols="12">
      <v-card>
        <v-data-table
          :headers="header2"
          :items="tableItem2"
          :options.sync="pageOpt2"
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
              @click="viewPage(item,'2')"
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
            <Pagination :footer="footer" :pageOpt="pageOpt2" @chPage="chPage" />
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <!-- 新增自動檢點表 modal -->
    <v-dialog v-model="editLog.dealogEdit" persistent disabledmax-width="900px">
      <EditPage 
        @close="close"
        @search="search"
        @deleteRecord="deleteRecord"
        :key="'E'+editLog.EditDynamicKey"
        :item="editLog.editItem"
        :editType="editLog.editType"
        :DB_Table="DB_Table"
        :title="title"
        :type="editLog.type"
      />
    </v-dialog>    
    <!-- 刪除確認視窗 -->
    <v-dialog v-model="delLog.dialogDel" persistent max-width="290">
      <dialogDelete
        :id="userData.UserId"
        :DB_Table="DB_Table"
        :RPFlowNo="delLog.RPFlowNo"
        :key="'D' + delLog.DelDynamicKey"
        @search="search"
        @close="closeDialogDel();close()"
        @cancel="closeDialogDel"
      />
    </v-dialog>
  </v-container>
</template>
<script>
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from 'vuex'
import { getNowFullTime, getTodayDateString, unique, decodeObject} from "@/assets/js/commonFun";
import { maintainStatusOpts } from '@/assets/js/workList'
import { fetchFormOrderList, fetchFormOrderOne, createFormOrder, createFormOrder0 } from '@/apis/formManage/serve'
import { fetchOrganization } from '@/apis/organization'
import { formDepartOptions } from '@/assets/js/departOption'
import dateSelect from "@/components/forManage/dateSelect";
import deptSelect from "@/components/forManage/deptSelect";
import dialogDelete from "@/components/forManage/dialogDelete";
import ToolBar from "@/components/forManage/toolbar";
import { Actions } from "@/assets/js/actions";
import { Constrant } from "@/assets/js/constrant";
import EditPage from '@/views/formManage/curing/VehicleWorkLogEdit'

export default {
  data: () => ({
    title: "柴油機車使用前後工作日誌",
    newText: "日誌",
    pageOpt1: { page: 1 }, // 目前頁數
    pageOpt2: { page: 1 }, // 目前頁數
    //---api---
    DB_Table: "RP081",
    header1: [
      // 表格顯示的欄位 DepartCode ID Name
      { text: "項次", value: "ItemNo", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
      { text: "填寫人", value: "Name", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
      { text: "保養人員", value: "HandlerID", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
      { text: "工作項目-上午", value: "Memo1", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
      { text: "工作項目-下午", value: "Memo2", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
      { text: "功能", value: "content", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
    ],
    header2: [
      // 表格顯示的欄位 DepartCode ID Name
      { text: "項次", value: "ItemNo", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
      { text: "填寫人", value: "Name", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
      { text: "處理人員", value: "HandlerID", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
      { text: "無法維護項目", value: "Memo1", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
      { text: "處理情形", value: "Memo2", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
      { text: "功能", value: "content", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
    ],
    tableItem1: [],
    tableItem2: [],
    //------
    //------formData 搜尋欄-----
      formData: {
        settings: {
          formIconShow: true,
          deptOptions:[]
        },
        searchItem: {
          checkDate: "",
          department: "",
        },
        default: {
          checkDate: "",
          department: "",
        }
      },
      //---------delLog-----------
      delLog: {
        RPFlowNo: "",
        DelDynamicKey: 0,
        dialogDel: false
      },
      //-------------editLog-------
      editLog: {
        editItem: {},
        dealogEdit: false,
        EditDynamicKey: 0,
        editType: "",
        type: "",
      },
  }),
  components: {
    Pagination, // 頁碼
    dateSelect,
    deptSelect,
    ToolBar,
    dialogDelete,
    EditPage,
  },
 computed: {
    ...mapState ('user', {
      userData: state => state.userData,  // 使用者基本資料
    }),
  },
  mounted() {
    this.formData.searchItem.checkDate = this.formData.default.checkDate = getTodayDateString();
  },
  methods: {
    ...mapActions('system', [
      "chMsgbar", // messageBar
      'chLoadingShow',  // 切換 loading 圖顯示
    ]),
    reset(){
      this.formData.searchItem = {...this.formData.default}
    },
    newOne(newType){
      this.editLog.dealogEdit = true
      this.editLog.editType = Actions.add;
      this.editLog.type = newType;
      this.editLog.EditDynamicKey += 1
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 搜尋
    search() {
      console.log("Search click");
      this.chLoadingShow()
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {'Column':'StartDayVlaue','Value':this.formData.searchItem.checkDate},
          {"Column":"EndDayVlaue","Value":this.formData.searchItem.checkDate},
          {"Column":"DepartCode","Value":this.formData.searchItem.department},
                ],
        QyName:[
          "RPFlowNo",
          "ID",
          "Name",
          "CheckDay",
          "CheckStatus",
          "FlowId", 
          "DepartName",
          "Type",
          "HandlerID",
          "Memo1",
          "Memo2",
        ],
      }).then(res => {
        let tableItems = this.arrGroup(decodeObject(unique(JSON.parse(res.data.DT))),'Type')
        this.tableItem1 = tableItems[1]
        this.tableItem2 = tableItems[2]
      }).catch(err => {
        console.log(err)
        this.chMsgbar({ success: false, msg: Constrant.query.failed });
      }).finally(() => {
        console.log("search final")
        this.chLoadingShow({ show: false})
      })
    },
    // 關閉 dialog
    close() {
      this.editLog.dealogEdit = false
    },
    viewPage(item,newType) {
      console.log(item);
      console.log("RPFlowNo: " + item.RPFlowNo);
      this.editLog.EditDynamicKey += 1;
      this.editLog.type = newType;
      this.editLog.editType = Actions.edit;
      this.editLog.editItem = item;
      this.editLog.dealogEdit = true;
    },
    closeDialogDel() {
      this.delLog.dialogDel = false
    },
    deleteRecord(RPFlowNo) {
      this.delLog.dialogDel = true;
      this.delLog.DelDynamicKey += 1;
      this.delLog.RPFlowNo = RPFlowNo;
    },
    arrGroup(xs, key) {
      return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    }
  }
};
</script>
