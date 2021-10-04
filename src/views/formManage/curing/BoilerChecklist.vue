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
    </v-row>
    <v-row class="label-header">
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
      </v-card>
    </v-col>
    <!-- 新增自動檢點表 modal -->
    <v-dialog v-model="editLog.dealogEdit" persistent max-width="900px">
      <EditPage 
        @close="close"
        @search="search"
        @deleteRecord="deleteRecord"
        :key="'E'+editLog.EditDynamicKey"
        :item="editLog.editItem"
        :editType="editLog.editType"
        :DB_Table="DB_Table"
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
import { formDepartOptions } from '@/assets/js/departOption'
import UploadOneFileAdd from '@/components/UploadOneFileAdd.vue';
import dateSelect from "@/components/forManage/dateSelect";
import deptSelect from "@/components/forManage/deptSelect";
import dialogDelete from "@/components/forManage/dialogDelete";
import ToolBar from "@/components/forManage/toolbar";
import { Actions } from "@/assets/js/actions";
import EditPage from '@/views/formManage/curing/BoilerChecklistEdit'

export default {
  data() {
    return {
      title:"鍋爐每日作業前檢點表(作業前)",
      newText:"檢點表",
      file: null,
      pageOpt: { page: 1 }, // 目前頁數
      //---api---
      DB_Table: "RP072",
      headers: [
        // 表格顯示的欄位 DepartCode ID Name
        { text: "項次", value: "ItemNo", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "保養日期", value: "CheckDay", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        // { text: "審查狀態", value: "CheckStatus", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "填寫人", value: "Name", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "保養單位", value: "DepartName", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "功能", value: "content", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
      ],
      tableItems: [],
      //------
      items: [
        { question: "1.檢視本體保溫材、外殼有無損傷或洩漏" },
        { question: "2.檢視油加熱器、過濾器之機能是否正常" },
        { question: "3.檢視燃燒室及燃料輸送裝置是否正常" },
        { question: "4.檢視耐火材、燃燒保護材有無崩落或損傷" },
        { question: "5.檢視爆發門作動是否正常" },
        { question: "6.檢視供油槽、油位調節器、油位計是否正常" },
        { question: "7.檢視火燄檢出裝置機能是否正常" },
        { question: "8.檢視水位調節裝置及警報器之機能是否正常" },
        { question: "9.檢視電氣配線端子及操作盤指示燈是否正常" },
        { question: "10.檢視給水裝置之機能是否正常" },
        { question: "11.檢視水處理裝置之機能是否正常" },
        { question: "12.檢視壓力表壓力指示是否正常" },
        { question: "13.檢視液位計液位指示是否正常" },
        { question: "14.檢視安全閥有無異狀" },
        { question: "15.其他" },
      ],
      //------formData 搜尋欄-----
      formData: {
        settings: {
          formIconShow: true,
        },
        searchItem: {
          dateStart: "",
          dateEnd: "",
          department: "",
        },
        default: {
          dateStart: "",
          dateEnd: "",
          department: "",
        }
      },
      //--------------------------
      //---------delLog-----------
      delLog: {
        RPFlowNo: "",
        DelDynamicKey: 0,
        dialogDel: false
      },
      //---------------------------
      //-------------editLog-------
      editLog: {
        editItem: {},
        dealogEdit: false,
        EditDynamicKey: 0,
        editType: ""
      },
      //---------------------------
    };
  },
  components: {
    Pagination, // 頁碼
    dateSelect,
    deptSelect,
    ToolBar,
    dialogDelete,
    EditPage,
    UploadOneFileAdd
  },
  computed: {
    ...mapState ('user', {
        userData: state => state.userData,  // 使用者基本資料
    }),
},
  mounted() {
    this.formData.searchItem.dateStart = this.formData.searchItem.dateEnd = this.formData.default.dateStart = this.formData.default.dateEnd = getTodayDateString();
  },
  methods: {
    ...mapActions('system', [
      "chMsgbar", // messageBar
      'chLoadingShow',  // 切換 loading 圖顯示
    ]),
    select(file) {
        this.file = file
    },
    reset(){
      this.formData.searchItem = {...this.formData.default}
    },
    newOne(){
      this.editLog.dealogEdit = true
      this.editLog.editType = Actions.add;
      this.editLog.EditDynamicKey += 1
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 搜尋
    search() {
      this.chLoadingShow({show:true})
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {'Column':'StartDayVlaue','Value':this.formData.searchItem.dateStart},
          {"Column":"EndDayVlaue","Value":this.formData.searchItem.dateEnd},
          {"Column":"DepartCode","Value":this.formData.searchItem.department},
                ],
        QyName:[
          "RPFlowNo",
          "ID",
          "Name",
          "CheckDay",
          "CheckStatus",
          "FlowId", "DepartName"
        ],
      }).then(res => {
        this.tableItems = decodeObject(unique(JSON.parse(res.data.DT)))
      }).catch(err => {
        //console.log(err)
        this.chMsgbar({ success: false, msg: Constrant.query.failed });
      }).finally(() => {
        this.chLoadingShow({ show: false})
      })},
    // 關閉 dialog
    close() {
      this.editLog.dealogEdit = false
    },
    viewPage(item) {
      this.editLog.EditDynamicKey += 1;
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
  }
};
</script>
