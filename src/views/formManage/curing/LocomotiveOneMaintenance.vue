<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2 label-title">{{ title }}</h2>
    <v-row class="px-2 label-header">
      <!-- 第一排選項 -->
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="檢修日期(起)"
          key="dateStart"
          :showIcon="formData.settings.formIconShow"
          v-model="formData.searchItem.dateStart"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="檢修日期(迄)"
          key="dateEnd"
          :showIcon="formData.settings.formIconShow"
          v-model="formData.searchItem.dateEnd"
        />
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>選擇機車編號
        </h3>
        <v-text-field solo @click="eqCode=true;key++" readonly v-model="searchName" clearable @click:clear="clickCleanCode()"/>
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
                    <EquipCode :key="'eq_' + key" :nowEqCode="com_equipCode" :toLv="2" :disableToLv="1" :needIcon="false" :noLabel="true" 
                    @getEqCode="getRtnCode" @getEqName="getRtnName"/>
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
        :inputData="inputData"
        :defInputData="inputDefData"
        :itemsList="itemsList"
        :QyName="QyName"
        :subtitles="subtitles"
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
import EquipCode from '@/components/EquipRepairCode'
import EditPage from "@/views/formManage/curing/LocomotiveCommonMaintenanceEdit";
import { Actions } from "@/assets/js/actions";
import dialogDelete from "@/components/forManage/dialogDelete";
import ToolBar from "@/components/forManage/toolbar";
import { Constrant } from "@/assets/js/constrant";

export default {
  data: () => ({
    title: "柴油液力機車一級檢修記錄表",
    newText: "記錄表",
    actions: Actions,
    searchName: '',
    key: 0,
    preSetEqcode: '',
    preSerEqName: '',
    isLoading: false,
    disabled: false,
    searchIpt: {  // 搜尋欄位
        year: new Date().getFullYear(),
        month: '',  // 月
        MaintainCode_System: 'RST',  // 類型
        MaintainCode_Loc: ''
    },
    eqCode: false,
    // controls for dialog
    ShowDetailDialog: false,
    dialogDel: false, // model off
    Add: false,
    pageOpt: { page: 1 }, // 目前頁數
    //---api---
    DB_Table: "RP050",
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
        carId: "",
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
      {
        text: "車號",
        value: "CarID",
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
    subtitles: [
      "*工作重點：以視覺、聽覺、觸覺、嗅覺，就有關行車主要機件之狀態及作用施行檢修",
      "*工作記號說明：1.實施完畢或正常者。2.經修復者，需填說明。3.需進廠檢修者。4.無此項目者。",
      "*適用車種：25噸及28噸B-B型柴油機車。",
    ],
    inputData: {
      RPFlowNo: "",
      DepartCode: "",
      DepartName: "",
      ID: "",
      Name: "",
      editableData: {
        CheckDay: "",
        // CarId: "",
        MaintainCode_System: "RST",
        MaintainCode_Loc: "",
        LastChkDay: "",
        LastKm: "",
        BgChkDay: "",
        EndChkDay: "",
        Km: "",
        CheckOption1: "",
        CheckOption2: "",
        CheckOption3: "",
        CheckOption4: "",
        CheckOption5: "",
        CheckOption6: "",
        CheckOption7: "",
        CheckOption8: "",
        CheckOption9: "",
        CheckOption10: "",
        CheckOption11: "",
        CheckOption12: "",
        CheckOption13: "",
        CheckOption14: "",
        CheckOption15: "",
        CheckOption16: "",
        CheckOption17: "",
        CheckOption18: "",
        CheckOption19: "",
        CheckOption20: "",
        CheckOption21: "",
        CheckOption22: "",
        CheckOption23: "",
        CheckOption24: "",
        CheckOption25: "",
        CheckOption26: "",
        CheckOption27: "",
        CheckOption28: "",
        CheckOption29: "",
        CheckOption30: "",
        CheckOption31: "",
        CheckOption32: "",
        CheckOption33: "",
        CheckOption34: "",
        CheckOption35: "",
        CheckOption36: "",
        CheckOption37: "",
        CheckOption38: "",
        CheckOption39: "",
        CheckOption40: "",
        CheckOption41: "",
        CheckOption42: "",
        CheckOption43: "",
        CheckOption44: "",
        CheckOption45: "",
        CheckOption46: "",
        CheckOption47: "",
        CheckOption48: "",
        Memo_1: "",
        Memo_2: "",
        Memo_3: "",
        Memo_4: "",
        Memo_5: "",
        Memo_6: "",
        Memo_7: "",
        Memo_8: "",
        Memo_9: "",
        Memo_10: "",
        Memo_11: "",
        Memo_12: "",
        Memo_13: "",
        Memo_14: "",
        Memo_15: "",
        Memo_16: "",
        Memo_17: "",
        Memo_18: "",
        Memo_19: "",
        Memo_20: "",
        Memo_21: "",
        Memo_22: "",
        Memo_23: "",
        Memo_24: "",
        Memo_25: "",
        Memo_26: "",
        Memo_27: "",
        Memo_28: "",
        Memo_29: "",
        Memo_30: "",
        Memo_31: "",
        Memo_32: "",
        Memo_33: "",
        Memo_34: "",
        Memo_35: "",
        Memo_36: "",
        Memo_37: "",
        Memo_38: "",
        Memo_39: "",
        Memo_40: "",
        Memo_41: "",
        Memo_42: "",
        Memo_43: "",
        Memo_44: "",
        Memo_45: "",
        Memo_46: "",
        Memo_47: "",
        Memo_48: "",
      },
    },
    inputDefData: {
      RPFlowNo: "",
      DepartCode: "",
      DepartName: "",
      ID: "",
      Name: "",
      editableData: {
        CheckDay: "",
        // CarId: "",
        MaintainCode_System: "RST",
        MaintainCode_Loc: "",
        LastChkDay: "",
        LastKm: "",
        BgChkDay: "",
        EndChkDay: "",
        Km: "",
        CheckOption1: "",
        CheckOption2: "",
        CheckOption3: "",
        CheckOption4: "",
        CheckOption5: "",
        CheckOption6: "",
        CheckOption7: "",
        CheckOption8: "",
        CheckOption9: "",
        CheckOption10: "",
        CheckOption11: "",
        CheckOption12: "",
        CheckOption13: "",
        CheckOption14: "",
        CheckOption15: "",
        CheckOption16: "",
        CheckOption17: "",
        CheckOption18: "",
        CheckOption19: "",
        CheckOption20: "",
        CheckOption21: "",
        CheckOption22: "",
        CheckOption23: "",
        CheckOption24: "",
        CheckOption25: "",
        CheckOption26: "",
        CheckOption27: "",
        CheckOption28: "",
        CheckOption29: "",
        CheckOption30: "",
        CheckOption31: "",
        CheckOption32: "",
        CheckOption33: "",
        CheckOption34: "",
        CheckOption35: "",
        CheckOption36: "",
        CheckOption37: "",
        CheckOption38: "",
        CheckOption39: "",
        CheckOption40: "",
        CheckOption41: "",
        CheckOption42: "",
        CheckOption43: "",
        CheckOption44: "",
        CheckOption45: "",
        CheckOption46: "",
        CheckOption47: "",
        CheckOption48: "",
        Memo_1: "",
        Memo_2: "",
        Memo_3: "",
        Memo_4: "",
        Memo_5: "",
        Memo_6: "",
        Memo_7: "",
        Memo_8: "",
        Memo_9: "",
        Memo_10: "",
        Memo_11: "",
        Memo_12: "",
        Memo_13: "",
        Memo_14: "",
        Memo_15: "",
        Memo_16: "",
        Memo_17: "",
        Memo_18: "",
        Memo_19: "",
        Memo_20: "",
        Memo_21: "",
        Memo_22: "",
        Memo_23: "",
        Memo_24: "",
        Memo_25: "",
        Memo_26: "",
        Memo_27: "",
        Memo_28: "",
        Memo_29: "",
        Memo_30: "",
        Memo_31: "",
        Memo_32: "",
        Memo_33: "",
        Memo_34: "",
        Memo_35: "",
        Memo_36: "",
        Memo_37: "",
        Memo_38: "",
        Memo_39: "",
        Memo_40: "",
        Memo_41: "",
        Memo_42: "",
        Memo_43: "",
        Memo_44: "",
        Memo_45: "",
        Memo_46: "",
        Memo_47: "",
        Memo_48: "",
      },
    },
    
    itemsList: [
      {
        title: "動力系統",
        items: [
          {
            question: "1. 檢查機油管路及接頭有無洩漏",
          },
          {
            question: "2. 檢視機油油面高度",
          },
          {
            question: "3. 檢視燃油箱有無洩漏並排放沉澱水分",
          },
          {
            question: "4. 檢視燃油管路及接頭有無洩漏",
          },
          {
            question: "5. 檢視燃油油量",
          },
          {
            question: "6. 檢視冷卻水管路及接頭有無洩漏",
          },
          {
            question: "7. 檢視冷卻水量",
          },
          {
            question: "8. 放出各油系濾清器沉澱水分",
          },
          {
            question: "9. 檢視散熱器有無洩漏並予清掃",
          },
          {
            question: "10. 檢視各部螺栓有無鬆弛",
          },
          {
            question: "11. 檢查各驅動皮帶",
          },
          {
            question: "12. 檢視大風扇傳動軸作用情況",
          },
        ],
      },
      {
        title: "傳動裝置",
        items: [
          {
            question: "13. 檢視變速機油面高度",
          },
          {
            question: "14. 檢視變速機油管及接頭有無洩漏",
          },
          {
            question: "15. 檢視逆轉機之作用油封有無洩漏",
          },
          {
            question: "16. 檢視逆轉機油面高度",
          },
          {
            question: "17. 檢視減速機軸承潤滑管路有無破損或洩漏",
          },
          {
            question: "18. 檢視減速機油面高度",
          },
          {
            question: "19. 檢查推進軸及萬向接頭有無鬆弛",
          },
        ],
      },
      {
        title: "行走系統",
        items: [
          {
            question: "20. 檢視轉向架框架有無裂痕",
          },
          {
            question: "21. 檢視彈簧有無變形或破損",
          },
          {
            question: "22. 檢視旁承座外觀及狀態",
          },
          {
            question: "23. 檢視車輪及車軸外觀及狀態",
          },
          {
            question: "24. 撒砂裝置功能測試",
          },
          {
            question: "25. 檢查傳動連桿有無鬆弛",
          },
        ],
      },
      {
        title: "軔機系統",
        items: [
          {
            question: "26. 排出各濾水器及風缸水分",
          },
          {
            question: "27. 檢視基礎軔機狀態並加油潤滑",
          },
          {
            question: "28. 檢查氣軔軟管有無洩漏",
          },
          {
            question: "29. 檢視空氣壓縮機油面高度",
          },
          {
            question: "30. 檢視空氣壓縮機動作情況並調整皮帶",
          },
          {
            question: "31. 檢查軔塊厚度及調整間隙",
          },
          {
            question: "32. 軔機性能試驗",
          },
        ],
      },
      {
        title: "電氣及儀表",
        items: [
          {
            question: "33. 清洗發電機風扇通風出口(無該設備則免)",
          },
          {
            question: "34. 儀錶功能測試",
          },
          {
            question: "35. 控制燈及指示燈功能測試",
          },
          {
            question: "36. 頭燈、尾燈及信號燈功能測試",
          },
          {
            question: "37. 檢視蓄電池及電氣各部位連結線情況",
          },
          {
            question: "38. 檢視充電情況",
          },
        ],
      },
      {
        title: "車身及連結器",
        items: [
          {
            question: "39. 檢視車體外觀",
          },
          {
            question: "40. 檢查隨車裝備",
          },
          {
            question: "41. 檢視排障器外觀",
          },
          {
            question: "42. 雨刷及喇叭測試",
          },
          {
            question: "43. 檢視滅火器日期及狀態",
          },
          {
            question: "44. 檢視駕駛室門、窗、座椅及車內設備",
          },
          {
            question: "45. 檢視連結器狀態",
          },
          {
            question: "46. 檢視旁鏈裝置狀態",
          },
        ],
      },
      {
        title: "其他",
        items: [
          {
            question: "47. 無線電操作試驗",
          },
          {
            question: "48. 空調機濾網清洗",
          },
        ],
      },
    ],
    QyName: [
      "CheckDay",
      "DepartCode",
      "DepartName",
      "ID",
      "Name",
      "MaintainCode_System",
      "MaintainCode_Loc",
      "CarID",
      "LastKm",
      "Km",
      "LastChkDay",
      "CarId",
      "BgChkDay",
      "EndChkDay",
      "CheckOption1",
      "Memo_1",
      "CheckOption2",
      "Memo_2",
      "CheckOption3",
      "Memo_3",
      "CheckOption4",
      "Memo_4",
      "CheckOption5",
      "Memo_5",
      "CheckOption6",
      "Memo_6",
      "CheckOption7",
      "Memo_7",
      "CheckOption8",
      "Memo_8",
      "CheckOption9",
      "Memo_9",
      "CheckOption10",
      "Memo_10",
      "CheckOption11",
      "Memo_11",
      "CheckOption12",
      "Memo_12",
      "CheckOption13",
      "Memo_13",
      "CheckOption14",
      "Memo_14",
      "CheckOption15",
      "Memo_15",
      "CheckOption16",
      "Memo_16",
      "CheckOption17",
      "Memo_17",
      "CheckOption18",
      "Memo_18",
      "CheckOption19",
      "Memo_19",
      "CheckOption20",
      "Memo_20",
      "CheckOption21",
      "Memo_21",
      "CheckOption22",
      "Memo_22",
      "CheckOption23",
      "Memo_23",
      "CheckOption24",
      "Memo_24",
      "CheckOption25",
      "Memo_25",
      "CheckOption26",
      "Memo_26",
      "CheckOption27",
      "Memo_27",
      "CheckOption28",
      "Memo_28",
      "CheckOption29",
      "Memo_29",
      "CheckOption30",
      "Memo_30",
      "CheckOption31",
      "Memo_31",
      "CheckOption32",
      "Memo_32",
      "CheckOption33",
      "Memo_33",
      "CheckOption34",
      "Memo_34",
      "CheckOption35",
      "Memo_35",
      "CheckOption36",
      "Memo_36",
      "CheckOption37",
      "Memo_37",
      "CheckOption38",
      "Memo_38",
      "CheckOption39",
      "Memo_39",
      "CheckOption40",
      "Memo_40",
      "CheckOption41",
      "Memo_41",
      "CheckOption42",
      "Memo_42",
      "CheckOption43",
      "Memo_43",
      "CheckOption44",
      "Memo_44",
      "CheckOption45",
      "Memo_45",
      "CheckOption46",
      "Memo_46",
      "CheckOption47",
      "Memo_47",
      "CheckOption48",
    ],
  }),
  components: {
    Pagination, // 頁碼
    dateSelect,
    deptSelect,
    EditPage,
    ToolBar,
    dialogDelete,
    EquipCode,
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
          if(value != ''){
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
    clickCleanCode(){
      this.searchIpt.MaintainCode_System = 'RST'
      this.searchIpt.MaintainCode_Loc = ''
      this.com_equipCode = 'RST-'
      this.searchName = ''
    },
    newOne() {
      this.inputData = {...this.inputDefData}
      this.inputData.editableData = {...this.inputDefData.editableData}
      this.Add = true;
      this.DynamicKey += 1;
      this.editType = this.actions.add;
    },
    reset() {
      this.formData.searchItem.dateStart = "";
      this.formData.searchItem.dateEnd = "";
      this.formData.searchItem.carId = "";
      this.com_equipCode = 'RST-'
      this.searchName = ''
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
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
          { Column: "DepartCode", Value: this.formData.searchItem.department },
          { Column: "CarID", Value: this.searchName },
          // { Column: "CarID", Value: this.searchName },
        ],
        QyName: [
          "RPFlowNo",
          "ID",
          "Name",
          "CheckDay",
          "CheckStatus",
          "FlowId",
          "DepartName",
          "CarID",
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
