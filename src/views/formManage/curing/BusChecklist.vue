<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2">
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
              class="mr-2"
              small
              dark
              fab
              color="info darken-1"
              @click="viewPage(item)"
            >
              <v-icon dark>mdi-pen</v-icon>
            </v-btn>
            <v-btn
              title="刪除"
              small
              dark
              fab
              color="red"
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
    <v-dialog v-model="editLog.dealogEdit" max-width="900px">
      <EditPage 
        @close="close"
        @search="search"
        @deleteRecord="deleteRecord"
        :key="'E'+editLog.EditDynamicKey"
        :item="editLog.editItem"
        :editType="editLog.editType"
        :DB_Table="DB_Table"
        :title="title"
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
import dateSelect from "@/components/forManage/dateSelect";
import deptSelect from "@/components/forManage/deptSelect";
import dialogDelete from "@/components/forManage/dialogDelete";
import ToolBar from "@/components/forManage/toolbar";
import { Actions } from "@/assets/js/actions";
import EditPage from '@/views/formManage/curing/BusChecklistEdit'

export default {
  data() {
    return {
      title:"客車一級檢修記錄表",
      newText:"記錄表",
      pageOpt: { page: 1 }, // 目前頁數
      //---api---
      DB_Table: "RP079",
      headers: [
        // 表格顯示的欄位 DepartCode ID Name
        { text: "項次", value: "ItemNo", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "保養日期", value: "CheckDay", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "審查狀態", value: "CheckStatus", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "填寫人", value: "Name", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "保養單位", value: "DepartName", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "功能", value: "content", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
      ],
      tableItems: [],
      //------
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
      items1: [
        //行走裝置
        { question: "1. 輪、軸位置無鬆弛移位現象" },
        { question: "2. 輪、軸無裂痕" },
        { question: "3. 輪緣磨耗無超限(厚度大於24mm，月檢)" },
        { question: "4. 輪緣高度無超出輪踏面31mm(月檢)" },
        { question: "5. 輪緣缺損長度無超過27mm、寬度無超過9mm" },
        { question: "6. 踏面擦傷長度無超過40mm" },
        { question: "7. 軸承箱、軸承箱蓋無裂痕或破損" },
        { question: "8. 軸承箱螺栓無鬆弛或脫落" },
      ],
      items2: [
        //軔機裝置
        { question: "9. 拉桿、軔槓桿、挺桿、軔塊調整桿、軔樑、軔吊、軔吊托、圓梢、開口梢、襯套等無破損、變形、鬆弛或脫落" },
        { question: "10. 軔塊調整桿彎曲方向正確" },
        { question: "11. 軔塊厚度大於15mm" },
        { question: "12. 保持閥作用良好" },
        { question: "13. 各桿與車體其他部分無不當接觸" },
        { question: "14. 全緊軔時，EA閥軔缸行程在60至80mm範圍，K閥軔缸行程在100至130mm範圍" },
        { question: "15. 一組客車之軔管漏氣速率不超過每分鐘0.2kg/cm2" },
        { question: "16. 緊軔時，軔缸無漏氣" },
        { question: "17. 緊軔時，軔缸作用良好" },
        { question: "18. 軔機作用良好" },
        { question: "19. 氣軔軟管長度適當" },
        { question: "20. 軔管無破損、漏氣" },
        { question: "21. 車長閥作用正常" },
        { question: "22. 角旋塞作用正常" },
        { question: "23. 手軔機作用正常" },
        { question: "24. 氣軔貫通指示燈正常" },
        { question: "25. 壓力錶準確" },
      ],
      items3: [
        //連結裝置
        { question: "26. 連結器、軛無裂痕或變形" },
        { question: "27. 連結器緩衝彈簧緊度適當" },
        { question: "28. 連結器伸出車端長度正常" },
        { question: "29. 軛固定螺栓無脫落或防鬆鐵絲無斷掉" },
        { question: "30. 導架螺栓無鬆脫" },
        { question: "31. 導架滑動面潤滑正常" },
        { question: "32. 安全鏈及螺栓無鬆脫" },
        { question: "33. 連結銷長度適當。" },
        { question: "34. 八字環磨耗量小於8mm。" },
      ],
      items4: [
        //電氣裝置
        { question: "35. 蓄電池外箱無破損、洩漏" },
        { question: "36. 蓄電池導線或接頭良好" },
        { question: "37. 蓄電池電解液適當" },
        { question: "38. 電氣連接線絕緣物無破損" },
        { question: "39. 配電箱無破損" },
        { question: "40. 保險絲功能正常" },
        { question: "41. 電氣開關、插頭、插座、接頭等無破損、鬆弛或不良" },
        { question: "42. 燈泡、燈管無破損或不良" },
        { question: "43. 燈具、燈架無破損或不良" },
        { question: "44. 變壓器、充電器裝置無破損或機能不良" },
        { question: "45. 播音機、喇叭無破損或機能不良" },
        { question: "46. 個別車廂播音音量大小一致" },
        { question: "47. 雨刷機無破損或機能不良" },
        { question: "48. 車廂間電纜線長度適當" },
      ],
      items5: [
        //空氣調節裝置
        { question: "49. 電源電壓在額定電壓440伏特±10%以內" },
        { question: "50. 空調機配電盤內各機件之安裝螺絲無鬆弛" },
        { question: "51. 運轉指示燈顯示正確" },
        { question: "52. 空氣過濾網無髒污" },
        { question: "53. 溫度開關調整第1段設在25℃，第2段設在27℃，暖氣設在15℃位置" },
        { question: "54. 運轉中之冷媒低壓值在3～7kg/cm2，高壓值在13～22kg/cm2之範圍內" },
        { question: "55. 空調機運轉中聲音正常" },
        { question: "56. 出風口無破裂或作用不良" },
        { question: "57. 出風口風量適當" },
        { question: "58. 車廂內冷度適當" },
      ],
      items6: [
        //車內各種設備
        { question: "59. 廁所盥洗設備之鏡子、洗手台、馬桶、坐墊自動掀起裝置、扶手、垃圾桶、沖洗按鈕開關、衛生紙架、排風扇及其他附屬設備無破損或作用不良" },
        { question: "60. 儲水筒及供水管路無阻塞" },
        { question: "61. 馬桶水量充足、沖力強及沖水正常" },
        { question: "62. 馬桶沖洗時間正常" },
        { question: "63. 廁所控制氣壓管無漏氣" },
        { question: "64. 馬桶切斷閥正常" },
        { question: "65. 水龍頭關閉位置無漏水" },
        { question: "66. 座椅布無破損或汙穢" },
        { question: "67. 座椅迴轉或椅背復位操縱桿正常" },
        { question: "68. 座椅扶手、踏板等無缺損或不良" },
        { question: "69. 窗簾布無汙穢、破損" },
        { question: "70. 座號、茶杯架無破損" },
        { question: "71. 門窗、膠條、行李架、扶桿、頂板、璧板、地板等無汙穢、破損、銹蝕或不良" },
        { question: "72. 車內各式固定螺絲無缺損或突出" },
        { question: "73. 滅火器無過期、洩露或破損" },
        { question: "74. 車窗擊破鎚無缺損" },
      ],
      items7: [
        //車架及轉向架
        { question: "75. 車身車架各樑有無銹蝕破損" },
        { question: "76. 轉向框架、彎樑、導板、搖枕、角銷、懸吊系統、中心盤及其他轉向架機件無斷裂、變形、銹蝕、擦撞痕跡或作用不良" },
        { question: "77. 各式螺栓、襯套及銷無鬆脫或斷裂" },
        { question: "78. 排障器無缺損、斷裂、變形" },
        { question: "79. 旁承座間隙在3～6mm之間(每4個月量測一次)" },
        { question: "80. 旁承座潤滑正常" },
        { question: "81. 中心盤上、下盤無破裂" },
      ],
      items8: [
        //車身外觀
        { question: "82. 車身傾斜左右高低差不超過13mm(月檢)" },
        { question: "83. 車身文字、標記無脫落或不明顯" },
        { question: "84. 車身側面及車頂油漆無龜裂、剝落、褪色、髒污" },
        { question: "85. 車身鈑金無變形、龜裂、銹蝕" },
        { question: "86. 通路渡板及扶手無銹蝕、不良" },
      ],
    };
  },
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
    this.formData.searchItem.dateStart = this.formData.searchItem.dateEnd = this.formData.default.dateStart = this.formData.default.dateEnd = getTodayDateString();
  },
  methods: {
    ...mapActions('system', [
      "chMsgbar", // messageBar
      'chLoadingShow',  // 切換 loading 圖顯示
    ]),
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
      console.log("Search click");
      this.chLoadingShow()
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
        console.log(err)
        this.chMsgbar({ success: false, msg: Constrant.query.failed });
      }).finally(() => {
        console.log("search final")
        this.chLoadingShow()
      })
    },
    // 關閉 dialog
    close() {
      this.editLog.dealogEdit = false
    },
    viewPage(item) {
      console.log("RPFlowNo: " + item.RPFlowNo);
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
  },
};
</script>
