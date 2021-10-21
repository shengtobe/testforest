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
        <v-select
          v-model="formData.searchItem.carId"
          :items="[
            { text: 'A0001', value: 'A' },
            { text: 'A0002', value: 'B' },
            { text: 'A0003', value: 'C' },
            { text: 'A0004', value: 'D' },
            { text: 'A0005', value: 'E' },
          ]"
          solo
        />
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
// import EditPage from "@/views/formManage/curing/LocomotiveThreeMaintenanceEdit";
import EditPage from "@/views/formManage/curing/LocomotiveCommonMaintenanceEdit";
import { Actions } from "@/assets/js/actions";
import dialogDelete from "@/components/forManage/dialogDelete";
import ToolBar from "@/components/forManage/toolbar";

export default {
  data: () => ({
    title: "柴油液力機車四級檢修記錄表",
    newText: "記錄表",
    actions: Actions,
    isLoading: false,
    disabled: false,
    // controls for dialog
    ShowDetailDialog: false,
    dialogDel: false, // model off
    Add: false,
    pageOpt: { page: 1 }, // 目前頁數
    //---api---
    DB_Table: "RP053",
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
      "*工作重點：對一般機件施行全盤檢修，各重要機件施行重整之檢修。",
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
        CarId: "",
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
        CheckOption87: "",
        CheckOption88: "",
        CheckOption89: "",
        CheckOption90: "",
        CheckOption91: "",
        CheckOption92: "",
        CheckOption93: "",
        CheckOption94: "",
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
        Memo_87: "",
        Memo_88: "",
        Memo_89: "",
        Memo_90: "",
        Memo_91: "",
        Memo_92: "",
        Memo_93: "",
        Memo_94: "",
      },
    },
    itemsList: [
      {
        title: "動力系統",
        items: [
          { question: "1. 引擎啟動檢查有無異常音響" },
          {
            question: "2. 機油管路及接頭全盤檢修",
          },
          {
            question: "3. 機油濾清器總成全盤檢修及機油換新",
          },
          {
            question: "4. 機油泵重整及管路全盤檢修",
          },
          {
            question: "5. 機油涼油器重整檢修",
          },
          {
            question: "6. 燃油箱及管路全盤檢修",
          },
          {
            question: "7. 燃油濾清器總成全盤檢修",
          },
          {
            question: "8. 燃油管路及接頭全盤檢修",
          },
          {
            question: "9. 燃油控制器及噴油泵重整檢修",
          },
          {
            question: "10. 水箱全盤檢修",
          },
          {
            question: "11. 冷卻歧管及墊料重整檢修",
          },
          {
            question: "12. 冷卻水更換及添加防銹劑",
          },
          {
            question: "13. 水泵及節溫器總成重整檢修",
          },
          {
            question: "14. 放出各油系濾清器沉澱水分",
          },
          {
            question: "15. 散熱器重整檢修",
          },
          {
            question: "16. 各部螺栓檢查鎖緊",
          },
          {
            question: "17. 各驅動皮帶全盤檢修",
          },
          {
            question: "18. 大風扇及軸承全盤檢修",
          },
          {
            question: "19. 空氣濾清器總成全盤檢修",
          },
          {
            question: "20. 渦輪增壓機總成全盤檢修",
          },
          {
            question: "21. 噴油器拆卸及狀態檢修",
          },
          {
            question: "22. 進、排氣管全盤檢修",
          },
          {
            question: "23. 進、排氣閥間隙調整檢修",
          },
          {
            question: "24. 消音器全盤檢修",
          },
          {
            question: "25. 汽缸蓋全盤檢修及汽缸蓋襯墊更換檢修",
          },
          {
            question: "26. 汽門裝置全盤檢修",
          },
          {
            question: "27. 汽門磨合重整檢修",
          },
          {
            question: "28. 汽門導管全盤檢修",
          },
          {
            question: "29. 搖桿室及汽門彈簧全盤檢修",
          },
          {
            question: "30. 汽缸蓋平面度重整檢修",
          },
          {
            question: "31. 引擎馬力測試及功能檢修",
          },
        ],
      },
      {
        title: "傳動裝置",
        items: [
          {
            question: "32. 變速機油換新",
          },
          {
            question: "33. 變速機管路全盤檢修",
          },
          {
            question: "34. 變速機油濾清器重整檢修(含涼油器墊片更換)",
          },
          {
            question: "35. 變速機油泵重整檢修",
          },
          {
            question: "36. 變速機出力狀態功能檢修",
          },
          {
            question: "37. 控制閥重整檢修",
          },
          {
            question: "38. 變速機離合機構總成全盤檢修",
          },
          {
            question: "39. 逆轉機總成重整檢修",
          },
          {
            question: "40. 逆轉機油換新",
          },
          {
            question: "41. 減速機總成重整檢修",
          },
          {
            question: "42. 減速機油換新",
          },
          {
            question: "43. 推進軸及萬向接頭全盤檢修",
          },
          {
            question: "44. 推進軸非破壞檢修",
          },
          {
            question: "45. 各部螺栓全盤檢修",
          },
        ],
      },
      {
        title: "行走系統",
        items: [
          {
            question: "46. 轉向架框架重整檢修",
          },
          {
            question: "47. 彈簧全盤檢修",
          },
          {
            question: "48. 中心盤重整檢修",
          },
          {
            question: "49. 旁承座重整檢修",
          },
          {
            question: "50. 車輪重整檢修(必要時踏面重整或換新輪箍)",
          },
          {
            question: "51. 車軸及軸箱重整檢修",
          },
          {
            question: "52. 車軸非破壞檢修",
          },
          {
            question: "53. 撒砂閥全盤檢修",
          },
          {
            question: "54. 傳動連桿總成重整檢修(必要時換銅襯)",
          },
        ],
      },
      {
        title: "軔機系統",
        items: [
          {
            question: "55. 濾水器全盤檢修",
          },
          {
            question: "56. 基礎軔機重整檢修",
          },
          {
            question: "57. 氣軔軟管全盤檢修",
          },
          {
            question: "58. 空氣壓縮機重整檢修",
          },
          {
            question: "59. 更換空氣壓縮機油",
          },
          {
            question: "60. 檢查軔塊厚度及調整間隙",
          },
          {
            question: "61. 軔機性能試驗檢修",
          },
          {
            question: "62. 調壓器重整檢修修",
          },
          {
            question: "63. 軔缸重整檢修",
          },
          {
            question: "64. 司軔閥總成重整檢修(含繼動閥、控制閥等橡膠件更換)",
          },
          {
            question: "65. 分配閥重整檢修(含橡膠件更換)",
          },
          {
            question: "66. 管路及集塵器全盤檢修",
          },
          {
            question: "67. 壓力表功能測試檢修",
          },
          {
            question: "68. 駐車煞車重整檢修",
          },
          {
            question: "69. 角旋塞功能測試檢修",
          },
          {
            question: "70. 緊急閥重整檢修",
          },
        ],
      },
      {
        title: "電氣及儀表",
        items: [
          {
            question: "71. 發電機總成全盤檢修(無該設備則免)",
          },
          {
            question: "72. 起動馬達全盤檢修",
          },
          {
            question: "73. 儀錶全盤檢修",
          },
          {
            question: "74. 頭燈、尾燈、信號燈、儀表燈及室內燈全盤檢修",
          },
          {
            question: "75. 電氣各部位連結線全盤檢修",
          },
          {
            question: "76. 蓄電池全盤檢修",
          },
          {
            question: "77. 充電器全盤檢修",
          },
          {
            question: "78. 各項電氣裝備絕緣檢修",
          },
          {
            question: "79. 繼電器、電磁閥(含墊片更換)功能檢修",
          },
          {
            question: "80. 感測器重整檢修",
          },
        ],
      },
      {
        title: "車身及連結器",
        items: [
          {
            question: "81. 車體及裝配狀態全盤檢修",
          },
          {
            question: "82. 檢查車體平衡",
          },
          {
            question: "83. 車體塗裝重整檢修",
          },
          {
            question: "84. 隨車裝備全盤檢修",
          },
          {
            question: "85. 排障器全盤檢修",
          },
          {
            question: "86. 雨刷機全盤檢修",
          },
          {
            question: "87. 喇叭全盤檢修",
          },
          {
            question: "88. 檢查滅火器日期及狀態",
          },
          {
            question: "89. 駕駛室門、窗、座椅及車內附屬設備全盤檢修",
          },
          {
            question: "90. 連結器重整檢修",
          },
          {
            question: "91. 旁鏈裝置全盤檢修",
          },
          {
            question: "92. 駕駛室引擎罩間之橡膠條全盤檢修",
          },
        ],
      },
      {
        title: "其他",
        items: [
          {
            question: "93. 無線電全盤檢修",
          },
          {
            question: "94. 空調機全盤檢修",
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
      "CheckOption87",
      "Memo_87",
      "CheckOption88",
      "Memo_88",
      "CheckOption89",
      "Memo_89",
      "CheckOption90",
      "Memo_90",
      "CheckOption91",
      "Memo_91",
      "CheckOption92",
      "Memo_92",
      "CheckOption93",
      "Memo_93",
      "CheckOption94",
      "Memo_94",
    ],
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
      this.formData.searchItem.carId = "";
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 搜尋
    search() {
      
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
          { Column: "CarId", Value: this.formData.searchItem.carId },
        ],
        QyName: [
          "RPFlowNo",
          "ID",
          "Name",
          "CheckDay",
          "CheckStatus",
          "FlowId",
          "DepartName",
          "CarId",
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
