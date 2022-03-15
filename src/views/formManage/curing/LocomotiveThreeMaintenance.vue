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
//import EditPage from "@/views/formManage/curing/LocomotiveThreeMaintenanceEdit";
import EditPage from "@/views/formManage/curing/LocomotiveCommonMaintenanceEdit";
import { Actions } from "@/assets/js/actions";
import dialogDelete from "@/components/forManage/dialogDelete";
import ToolBar from "@/components/forManage/toolbar";

export default {
  data: () => ({
    title: "柴油液力機車三級檢修記錄表",
    newText: "記錄表",
    actions: Actions,
    isLoading: false,
    disabled: false,
    searchName: '',
    key: 0,
    preSetEqcode: '',
    preSerEqName: '',
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
    DB_Table: "RP052",
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
      "*工作重點：對動力、傳動、行走(含轉向架)、軔機、儀錶、車身、連結器、控制、電氣、輔助等裝置主要機件之特定部分施行拆卸並作細部分解之檢修。",
      "*工作記號說明：1.實施完畢或正常者。2.經修復者，需填說明。3.需進廠檢修者。4.無此項目者。",
      "*適用車種：25噸及28噸B-B型柴油液力機車。",
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
        CheckOption49: "",
        CheckOption50: "",
        CheckOption51: "",
        CheckOption52: "",
        CheckOption53: "",
        CheckOption54: "",
        CheckOption55: "",
        CheckOption56: "",
        CheckOption57: "",
        CheckOption58: "",
        CheckOption59: "",
        CheckOption60: "",
        CheckOption61: "",
        CheckOption62: "",
        CheckOption63: "",
        CheckOption64: "",
        CheckOption65: "",
        CheckOption66: "",
        CheckOption67: "",
        CheckOption68: "",
        CheckOption69: "",
        CheckOption70: "",
        CheckOption71: "",
        CheckOption72: "",
        CheckOption73: "",
        CheckOption74: "",
        CheckOption75: "",
        CheckOption76: "",
        CheckOption77: "",
        CheckOption78: "",
        CheckOption79: "",
        CheckOption80: "",
        CheckOption81: "",
        CheckOption82: "",
        CheckOption83: "",
        CheckOption84: "",
        CheckOption85: "",
        CheckOption86: "",
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
        Memo_49: "",
        Memo_50: "",
        Memo_51: "",
        Memo_52: "",
        Memo_53: "",
        Memo_54: "",
        Memo_55: "",
        Memo_56: "",
        Memo_57: "",
        Memo_58: "",
        Memo_59: "",
        Memo_60: "",
        Memo_61: "",
        Memo_62: "",
        Memo_63: "",
        Memo_64: "",
        Memo_65: "",
        Memo_66: "",
        Memo_67: "",
        Memo_69: "",
        Memo_68: "",
        Memo_70: "",
        Memo_71: "",
        Memo_72: "",
        Memo_73: "",
        Memo_74: "",
        Memo_75: "",
        Memo_76: "",
        Memo_77: "",
        Memo_78: "",
        Memo_79: "",
        Memo_80: "",
        Memo_81: "",
        Memo_82: "",
        Memo_83: "",
        Memo_84: "",
        Memo_85: "",
        Memo_86: "",
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
        CheckOption49: "",
        CheckOption50: "",
        CheckOption51: "",
        CheckOption52: "",
        CheckOption53: "",
        CheckOption54: "",
        CheckOption55: "",
        CheckOption56: "",
        CheckOption57: "",
        CheckOption58: "",
        CheckOption59: "",
        CheckOption60: "",
        CheckOption61: "",
        CheckOption62: "",
        CheckOption63: "",
        CheckOption64: "",
        CheckOption65: "",
        CheckOption66: "",
        CheckOption67: "",
        CheckOption68: "",
        CheckOption69: "",
        CheckOption70: "",
        CheckOption71: "",
        CheckOption72: "",
        CheckOption73: "",
        CheckOption74: "",
        CheckOption75: "",
        CheckOption76: "",
        CheckOption77: "",
        CheckOption78: "",
        CheckOption79: "",
        CheckOption80: "",
        CheckOption81: "",
        CheckOption82: "",
        CheckOption83: "",
        CheckOption84: "",
        CheckOption85: "",
        CheckOption86: "",
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
        Memo_49: "",
        Memo_50: "",
        Memo_51: "",
        Memo_52: "",
        Memo_53: "",
        Memo_54: "",
        Memo_55: "",
        Memo_56: "",
        Memo_57: "",
        Memo_58: "",
        Memo_59: "",
        Memo_60: "",
        Memo_61: "",
        Memo_62: "",
        Memo_63: "",
        Memo_64: "",
        Memo_65: "",
        Memo_66: "",
        Memo_67: "",
        Memo_69: "",
        Memo_68: "",
        Memo_70: "",
        Memo_71: "",
        Memo_72: "",
        Memo_73: "",
        Memo_74: "",
        Memo_75: "",
        Memo_76: "",
        Memo_77: "",
        Memo_78: "",
        Memo_79: "",
        Memo_80: "",
        Memo_81: "",
        Memo_82: "",
        Memo_83: "",
        Memo_84: "",
        Memo_85: "",
        Memo_86: "",
      },
    },
    itemsList: [
      {
        title: "動力系統",
        items: [
          {
            question: "1 引擎外觀狀態檢修",
          },
          {
            question: "2 引擎啟動檢查有無異常音響",
          },
          {
            question: "3 機油管路及接頭狀態檢修",
          },
          {
            question: "4 機油濾清心子及機油換新",
          },
          {
            question: "5 機油泵狀態檢修",
          },
          {
            question: "6 檢查燃油箱有無洩漏並排放沉澱水分",
          },
          {
            question: "7 燃油箱通氣孔清洗",
          },
          {
            question: "8 燃油濾清心子換新",
          },
          {
            question: "9 檢查燃油管路及接頭有無洩漏",
          },
          {
            question: "10 檢查燃油油量",
          },
          {
            question: "11 水箱清拭及狀態檢修",
          },
          {
            question: "12 冷卻水管路及接頭狀態檢修",
          },
          {
            question: "13 冷卻水更換及添加防銹劑",
          },
          {
            question: "14 水泵狀態檢修",
          },
          {
            question: "15 放出各油系濾清器沉澱水分",
          },
          {
            question: "16 清洗散熱器外部校正翅片",
          },
          {
            question: "17 各部螺栓檢查鎖緊",
          },
          {
            question: "18 各驅動皮帶調整檢修",
          },
          {
            question: "19 大風扇及軸承狀態檢修",
          },
          {
            question: "20 空氣濾清器內部清洗(包括心子)",
          },
          {
            question: "21 渦輪增壓機進、排氣葉輪狀態檢修",
          },
          {
            question: "22 噴油器拆卸及狀態檢修",
          },
          {
            question: "23 進、排氣管路狀態檢修",
          },
          {
            question: "24 進、排氣閥間隙調整檢修",
          },
          {
            question: "25 消音器狀態檢修",
          },
        ],
      },
      {
        title: "傳動裝置",
        items: [
          {
            question: "26 變速機油換新",
          },
          {
            question: "27 檢查變速機油管及接頭有無洩漏",
          },
          {
            question: "28 變速機油濾清器拆洗檢修",
          },
          {
            question: "29 控制閥拆洗檢修",
          },
          {
            question: "30 試驗調整變速機各項油壓",
          },
          {
            question: "31 變速機離合器功能檢修",
          },
          {
            question: "32 檢查逆轉機之作用油封有無洩漏",
          },
          {
            question: "33 逆轉機油換新及功能檢修",
          },
          {
            question: "34 檢查逆轉機機油壓力",
          },
          {
            question: "35 檢查逆轉機作用汽缸之動作",
          },
          {
            question: "36 檢查減速機軸承潤滑管路有無破損或洩漏",
          },
          {
            question: "37 減速機油換新及功能檢修",
          },
          {
            question: "38 檢查減速機齒輪箱有無裂痕或漏油",
          },
          {
            question: "39 推進軸及萬向接頭加油脂及功能檢修",
          },
          {
            question: "40 各部螺栓檢查鎖緊",
          },
        ],
      },
      {
        title: "行走系統",
        items: [
          {
            question: "41 轉向架框架及裝配狀態檢修",
          },
          {
            question: "42 彈簧狀態檢修",
          },
          {
            question: "43 中心盤狀態檢修",
          },
          {
            question: "44 旁承座狀態檢修",
          },
          {
            question: "45 車輪尺寸量測及狀態檢修",
          },
          {
            question:
              "46 車軸及軸箱狀態檢修(第一次四級檢修後，需實施非破壞檢測)",
          },
          {
            question: "47 撒砂裝置功能檢修",
          },
          {
            question: "48 傳動連桿狀態檢修",
          },
        ],
      },
      {
        title: "軔機系統",
        items: [
          {
            question: "49 濾水器拆洗檢修",
          },
          {
            question: "50 基礎軔機拆解檢修並加油潤滑",
          },
          {
            question: "51 氣軔軟管狀態檢修",
          },
          {
            question: "52 空氣壓縮機效能檢修",
          },
          {
            question: "53 更換壓縮機油",
          },
          {
            question: "54 檢查軔塊厚度及調整間隙",
          },
          {
            question: "55 軔機性能試驗檢修",
          },
          {
            question: "56 調壓器試驗檢修",
          },
          {
            question: "57 軔缸拆解清洗及功能檢修",
          },
          {
            question: "58 司軔閥總成拆解清洗及功能檢修(含繼動閥、控制閥等)",
          },
          {
            question: "59 分配閥拆解清洗及功能檢修",
          },
          {
            question: "60 壓力表試驗檢修",
          },
          {
            question: "61 駐車煞車試驗檢修",
          },
        ],
      },
      {
        title: "電氣及儀表",
        items: [
          {
            question: "62 清潔發電機空氣濾清器(無該設備則免)",
          },
          {
            question: "63 清掃發電機室內外四周(無該設備則免)",
          },
          {
            question: "64 檢查發電機碳刷及整流子並加油(無該設備則免)",
          },
          {
            question: "65 檢查啟動馬達碳刷及整流子並加油",
          },
          {
            question: "66 儀表功能測試檢修",
          },
          {
            question: "67 控制燈及指示燈功能測試檢修",
          },
          {
            question: "68 頭燈、尾燈及信號燈功能測試檢修",
          },
          {
            question: "69 電氣各部位連結線測試檢修(鎖緊各電線端子螺栓)",
          },
          {
            question: "70 蓄電池拆卸整理及功能檢修",
          },
          {
            question: "71 充電器狀態檢修",
          },
          {
            question: "72 各項電氣裝備絕緣檢修",
          },
          {
            question: "73 繼電器、電磁閥功能檢修",
          },
          {
            question: "74 感測器功能檢修",
          },
        ],
      },
      {
        title: "車身及連結器",
        items: [
          {
            question: "75 車體外觀及裝配狀態檢修",
          },
          {
            question: "76 檢查車體平衡",
          },
          {
            question: "77 隨車裝置狀態檢修",
          },
          {
            question: "78 排障器狀態檢修",
          },
          {
            question: "79 雨刷機功能檢修",
          },
          {
            question: "80 喇叭功能檢修",
          },
          {
            question: "81 檢查滅火器日期及狀態",
          },
          {
            question: "82 駕駛室門、窗、座椅及車內附屬設備功能檢修",
          },
          {
            question: "83 連結器分解清洗檢修",
          },
          {
            question: "84 旁鏈裝置狀態檢修",
          },
        ],
      },
      {
        title: "其他",
        items: [
          {
            question: "85 無線電操作功能檢修",
          },
          {
            question: "86 空調機拆卸清洗及功能檢修",
          },
        ],
      },
    ],
    QyName: [
      "CheckDay",
      "DepartCode",
      "DepartName",
      "CarID",
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
      "CheckOption49",
      "Memo_49",
      "CheckOption50",
      "Memo_50",
      "CheckOption51",
      "Memo_51",
      "CheckOption52",
      "Memo_52",
      "CheckOption53",
      "Memo_53",
      "CheckOption54",
      "Memo_54",
      "CheckOption55",
      "Memo_55",
      "CheckOption56",
      "Memo_56",
      "CheckOption57",
      "Memo_57",
      "CheckOption58",
      "Memo_58",
      "CheckOption59",
      "Memo_59",
      "CheckOption60",
      "Memo_60",
      "CheckOption61",
      "Memo_61",
      "CheckOption62",
      "Memo_62",
      "CheckOption63",
      "Memo_63",
      "CheckOption64",
      "Memo_64",
      "CheckOption65",
      "Memo_65",
      "CheckOption66",
      "Memo_66",
      "CheckOption67",
      "Memo_67",
      "CheckOption68",
      "Memo_68",
      "CheckOption69",
      "Memo_69",
      "CheckOption70",
      "Memo_70",
      "CheckOption71",
      "Memo_71",
      "CheckOption72",
      "Memo_72",
      "CheckOption73",
      "Memo_73",
      "CheckOption74",
      "Memo_74",
      "CheckOption75",
      "Memo_75",
      "CheckOption76",
      "Memo_76",
      "CheckOption77",
      "Memo_77",
      "CheckOption78",
      "Memo_78",
      "CheckOption79",
      "Memo_79",
      "CheckOption80",
      "Memo_80",
      "CheckOption81",
      "Memo_81",
      "CheckOption82",
      "Memo_82",
      "CheckOption83",
      "Memo_83",
      "CheckOption84",
      "Memo_84",
      "CheckOption85",
      "Memo_85",
      "CheckOption86",
      "Memo_86",
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
          if(value == ""){
            this.searchIpt.MaintainCode_System = 'RST';
            this.searchIpt.MaintainCode_Loc = this.preSetEqcode = this.preSerEqName = ""
            this.eqcKey++
            this.searchName = ""
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
      this.com_equipCode = "";
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
          // { Column: "CarId", Value: this.searchName },
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
