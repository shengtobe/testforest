<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2 label-title">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2 label-header">
      <!-- 檢查日期(起) -->
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="檢查日期(起)"
          key="dateStart"
          :showIcon="formData.settings.formIconShow"
          v-model="formData.searchItem.dateStart"
        />
      </v-col>
      <!-- 檢查日期(迄) -->
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="檢查日期(迄)"
          key="dateEnd"
          :showIcon="formData.settings.formIconShow"
          v-model="formData.searchItem.dateEnd"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3" v-if="false">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1" v-if="formData.settings.formIconShow">mdi-domain</v-icon>車庫
        </h3>
        <v-select :items="formData.settings.deptOptions" item-text="value" item-value="key" v-model="formData.searchItem.department" solo/>
      </v-col>
    </v-row>
    <ToolBar @search="search" @reset="reset" @newOne="newOne" :text="newText" />
    <!-- 表格資料 -->
    <v-col cols="12">
      <v-card>
        <v-data-table
          :headers="header"
          :items="tableItem"
          :options.sync="pageOpt"
          disable-sort
          disable-filtering
          hide-default-footer
          class="theme-table"
        >
          <template v-slot:no-data>
            <span class="red--text subtitle-1">沒有資料</span>
          </template>
          <template v-slot:footer="footer">
            <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-data-table
          :headers="headers"
          :items="tableItems"
          :options.sync="pageOpts"
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
            <Pagination :footer="footer" :pageOpt="pageOpts" @chPage="chPages" />
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
    <!-- END 自動檢點表 modal -->
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
import EditPage from '@/views/formManage/curing/ChiayiPowerCarReportEdit'

export default {
  data() {
    return {
      // 自定義變數
      title:"嘉義車庫動力車狀態日報表",
      newText:"日報表",
      // 系統變數
      pageOpt: { page: 1 }, // 目前頁數
      pageOpts: { page: 1 }, // 目前頁數
      //---api---
      DB_Table: "RP084",
      headers: [
        // 表格顯示的欄位 DepartCode ID Name
        { text: "車種", value: "Type", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "車別", value: "Category", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "號碼", value: "CarNo", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "使用車次", value: "UsingCarNo", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "狀態", value: "StatusText", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "說明", value: "Memo", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "功能", value: "content", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
      ],
      tableItems: [],
      header: [
        // 表格顯示的欄位 DepartCode ID Name
        { text: "車別", value: "Category", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "現有總數", value: "TotalAmount", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "使用", value: "0", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "待用", value: "1", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "停用", value: "4", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "在庫待修", value: "2", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "進廠檢修", value: "3", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "其他", value: "else", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
      ],
      tableItem:[],
      //------
      //------formData 搜尋欄-----
      formData: {
        settings: {
          formIconShow: true,
          deptOptions:[]
        },
        searchItem: {
          dateStart: "",
          dateEnd: "",
          garageCode: "",
        },
        default: {
          dateStart: "",
          dateEnd: "",
          garageCode: "",
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
        editType: ""
      },
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
    this.formData.searchItem.dateEnd = getTodayDateString();
    this._getOrg()
  },
  methods: {
    ...mapActions('system', [
      "chMsgbar", // messageBar
      'chLoadingShow',  // 切換 loading 圖顯示
    ]),
    //抓單位清單
    _getOrg(){
      const that = this
      that.isLoading = true
      fetchOrganization({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res => {
        if (res.data.ErrorCode == 0) {
          this.formData.settings.deptOptions = [
            {key:'',value:'不限'},
            ...res.data.user_depart_list_group_2.filter(element=>element.DepartParentName=="車輛養護科").map(element=>({key:element.DepartCode,value:element.DepartName}))
          ]
        }else {
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          that.$router.push({ path: '/error' })
        }
      }).catch( err => {
        this.chMsgbar({ success: false, msg: '伺服器發生問題，單位查詢失敗' })
      }).finally(() => {
          that.deptOptions = decodeObject(that.deptOptions)
          that.isLoading = false
      })
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
    chPages(n) {
      this.pageOpts.page = n;
    },
    // 搜尋
    search() {
      let d1 = Date.parse(this.formData.searchItem.dateStart)
      let d2 = Date.parse(this.formData.searchItem.dateEnd)
      if(d1 > d2){
        alert('時間範圍錯誤')
        return
      }
      const that = this
      this.chLoadingShow({show:true})
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {'Column':'StartDayVlaue','Value':this.formData.searchItem.dateStart},
          {"Column":"EndDayVlaue","Value":this.formData.searchItem.dateEnd},
          {"Column":"GarageCode","Value":this.formData.searchItem.garageCode},
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
          "Category",
          "CarNo",
          "UsingCarNo",
          "Status",
          "Memo",
        ],
      }).then(res => {
        this.tableItems = decodeObject(unique(JSON.parse(res.data.DT)))
        this.tableItems.forEach(element=>{
          switch(element.Status) {
            case "0":
              element.StatusText = "使用"
              break;
            case "1":
              element.StatusText = "待用"
              break;
            case "2":
              element.StatusText = "待修"
              break;
            case "3":
              element.StatusText = "進廠"
              break;
            case "4":
              element.StatusText = "停用"
              break;
          }
        })
        let catGroup = this.arrGroup(this.tableItems,'Category')
        this.tableItem = Object.keys(catGroup).map(element=>{
          let rtnObj={
            Category: element,
            TotalAmount: catGroup[element].length+" 輛",
            0: "",
            1: "",
            2: "",
            3: "",
            4: "",
            else: "",
          }
          let statusArr = that.arrGroup(catGroup[element],'Status')
          Object.keys(statusArr).forEach(ele=>{
            if(ele!=""){
              rtnObj[ele]=statusArr[ele].length
            }else{
              rtnObj.else=statusArr[ele].length
            }
          })
          return rtnObj
        })

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
    arrGroup(xs, key) {
      return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    }
  },
};
</script>

<style>
.v-expansion-panel-header {
  font-size: 18px;
}
</style>