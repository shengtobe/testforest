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
      <v-col cols="12" sm="4" md="4">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file</v-icon>車輛型號
            </h3>
            <v-text-field solo @click="eqCode=true" readonly v-model="searchName" clearable @click:clear="eqClear"/>
            <v-dialog v-model="eqCode" max-width="700px">
                <v-card class="theme-card">
                    <v-card-title class="px-4 py-1">
                        車輛型號
                        <v-spacer></v-spacer>
                        <v-btn fab small text @click="eqCode = false" class="mr-n2">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-card-title>
                    <div class="px-4 py-3">
                        <EquipCode :key="'eqcKey' + eqcKey" :nowEqCode="com_equipCode" :toLv="2" :disableToLv="1" :needIcon="false" :noLabel="true" @getEqCode="getRtnCode" @getEqName="getRtnName" />
                    </div>
                    <v-card-actions class="px-5 pb-5">
                        <v-spacer></v-spacer>
                        <v-btn class="mr-2 btn-close" dark elevation="4"  :loading="isLoading" @click="eqCode = false">取消</v-btn>
                        <v-btn class="btn-add" dark elevation="4"  :loading="isLoading" @click="selectEQ">確認</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
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
    <!-- 新增車輪輪緣高度、厚度檢查紀錄表 modal -->
    <v-dialog v-model="Add" persistent max-width="1200px">
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
import { formDepartOptions } from "@/assets/js/departOption";
import dateSelect from "@/components/forManage/dateSelect";
import EquipCode from '@/components/EquipRepairCode'
import EditPage from "@/views/formManage/curing/WheelThicknessChecklistEdit";
import { Actions } from "@/assets/js/actions";
import dialogDelete from "@/components/forManage/dialogDelete";
import ToolBar from "@/components/forManage/toolbar";

export default {
  data() {
    return {
      title: "車輪輪緣高度、厚度檢查紀錄表",
      newText: "紀錄表",
      //
      searchName: '',
      searchIpt: {  // 搜尋欄位
          year: new Date().getFullYear(),
          month: '',  // 月
          MaintainCode_System: 'RST',  // 類型
          MaintainCode_Loc: ''
      },
      eqCode: false,
      preSetEqcode: '',
      preSerEqName: '',
      eqcKey: 0,
      //
      action: Actions.add,
      actions: Actions,
      isLoading: false,
      disabled: false,
      panel: [0, 1, 2],
      readonly: false,
      formDepartOptions: [
        // 通報單位下拉選單
        { text: "不限", value: "" },
        ...formDepartOptions,
      ],
      // controls for dialog
      ShowDetailDialog: false,
      dialogDel: false, // model off
      Add: false,
      pageOpt: { page: 1 }, // 目前頁數
      //---api---
      DB_Table: "RP056",
      DB_Table_097: "RP097",
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
      //
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
          text: "車輛編號",
          value: "CarNo",
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
    };
  },
  components: {
    Pagination, // 頁碼
    dateSelect,
    EditPage,
    ToolBar,
    dialogDelete,
    EquipCode
  },
  computed: {
    ...mapState("user", {
      userData: (state) => state.userData, // 使用者基本資料
    }),
    com_equipCode: {
      get: function() {
          return this.searchIpt.MaintainCode_System + (this.searchIpt.MaintainCode_Loc==''?'':'-' + this.searchIpt.MaintainCode_Loc)
      },
      set: function(value) {
        if(value == ""){
          this.searchIpt.MaintainCode_System = 'RST';
          this.searchIpt.MaintainCode_Loc = this.preSetEqcode = this.preSerEqName = ""
          this.eqcKey++
        }
        else{
          let splitArr = value.split('-')
          this.searchIpt.MaintainCode_System = splitArr[0]
          this.searchIpt.MaintainCode_Loc = splitArr[1]
        }
      }
    },
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
    //機車回傳
    getRtnCode(code) {
        this.preSetEqcode = code
    },
    //機車回傳中文
    getRtnName(cName) {
        (cName)
        this.preSerEqName = cName.replace('車輛(RST)-','')
    },
    //機車送出按鈕
    selectEQ() {
        this.com_equipCode = this.preSetEqcode
        this.searchName = this.preSerEqName
        this.eqCode = false
    },
    eqClear(){
      this.com_equipCode = ""
    },
    newOne() {
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
          // { Column: "DepartCode", Value: this.formData.searchItem.department },
          { Column: "CarNo", Value: this.searchName },
        ],
        QyName: [
          "RPFlowNo",
          "ID",
          "Name",
          "CarNo",
          "CheckDay",
          "CheckStatus",
          "FlowId",
          "DepartName",
        ],
      })
        .then((res) => {
          let tbBuffer = JSON.parse(res.data.DT);
          let aa = unique(tbBuffer);
          this.tableItems = aa;
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
    // 關閉 dialog
    viewPage(item) {
     
     
      this.DynamicKey += 1;
      this.editType = this.actions.edit;
      this.editItem = item;
      this.Add = true;
    }, //viewPage
    deleteRecord(RPFlowNo) {
      this.dialogDel = true;
      this.DelDynamicKey += 1;
      this.RPFlowNo = RPFlowNo;
    },
  },
};
</script>
