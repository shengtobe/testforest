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
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
      </v-col>
    </v-row>
    <ToolBar @search="search" @reset="initInput" @newOne="newOne" :text="newText" />
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
    <!-- 編輯自動檢點表 modal -->
    <v-dialog v-model="Edit" persistent max-width="960px">
      <v-card class="theme-card">
        <v-card-title class="white--text px-4 py-1">
          編輯{{ title }}
          <v-spacer></v-spacer>
          <v-btn dark fab small text @click="close" class="mr-n2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <div class="px-6 py-4">
          <v-row>
            <v-col cols="12">
              <p>1.依職業安全衛生法第23條及職業安全衛生管理辦法第50條規定辦理。</p>
              <p>2.缺點由使用單位自行改善，不克者委請設備商修護。</p>
            </v-col>
            
            <!-- END 檢查項目 -->
          </v-row>
        </div>

        <v-card-actions class="px-5 pb-5">
          <v-spacer></v-spacer>
          <v-btn class="mr-2 btn-close white--text" elevation="4" @click="close">取消</v-btn>
          <v-btn class="btn-add white--text" elevation="4" :loading="isLoading">儲存編輯</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from 'vuex'
import { getNowFullTime, getTodayDateString, unique} from "@/assets/js/commonFun";
import { maintainStatusOpts } from '@/assets/js/workList'
import dateSelect from "@/components/forManage/dateSelect";
import deptSelect from "@/components/forManage/deptSelect";
import { fetchFormOrderList, fetchFormOrderOne, createFormOrder, createFormOrder0, updateFormOrder } from '@/apis/formManage/serve'
import { formDepartOptions } from '@/assets/js/departOption'
import { Actions } from "@/assets/js/actions";
import dialogDelete from "@/components/forManage/dialogDelete";
import ToolBar from "@/components/forManage/toolbar";

export default {
  data() {
    return {
      title: "平交道功能檢查紀錄表",
      newText: "紀錄表",
      action: Actions.add,
      actions: Actions,
      isLoading: false,
      disabled: false,
      dateAMax: '',
      dateBMin: '',
      a: "",
      ass: "",
      z: "",
      zs: "",
      q: "",
      df: "",
      s: "",
      formDepartOptions: [
        // 通報單位下拉選單
        { text: "不限", value: "" },
        ...formDepartOptions,
      ],
      qz: "",
      wx: "",
      pp: "",
      oo: "",
      ii: "",
      uu: "",
      yy: "",
      Edit: false,
      dialog3: false,
      ShowDetailDialog: false,
      dialogDel: false, // model off
      Edit: false,
      dialog3: false,
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
      editType: "",
      editItem: {},
      DynamicKey: 0,
      DelDynamicKey: 0,
      pageOpt: { page: 1 }, // 目前頁數
      //---api---
      DB_Table: "RP087",
      RPFlowNo: "",
      nowTime: "",
      doMan:{
        id: '',
        name: '',
        depart: '',
        checkManName: ''
      },
      ipt2: {},
      defaultIpt: {  // 預設的欄位值
          startDay: '',
          EndDay: '',
          depart: '',  // 單位
        },
      headers: [
        // 表格顯示的欄位 DepartCode ID Name
        { text: "項次", value: "ItemNo", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "保養日期", value: "CheckDay", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        // { text: "審查狀態", value: "CheckStatus", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "填寫人", value: "Name", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "保養單位", value: "DepartName", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "區段", value: "Location", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "功能", value: "content", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
      ],
      tableItems: [],
      //------
      ipt: {
        department: "",
        date: new Date().toISOString().substr(0, 10),
        
      },
      suggest: "", // 改善建議
    };
  },
  components: {
    Pagination, // 頁碼
    dateSelect,
    deptSelect,
    ToolBar,
    dialogDelete,
  },
  computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
  },
  created() {
      this.ipt2 = { ...this.defaultIpt }
      //更新時間
      var today=new Date();
      let mStr = today.getMonth()+1;
      let dStr = today.getDate();
      if(mStr < 10){
        mStr = '0' + mStr;
      }
      if(dStr < 10){
        dStr = '0' + dStr;
      }
      this.nowTime = today.getFullYear()+'-'+ mStr +'-'+ dStr;
      this.z = this.df = this.nowTime
  },
  methods: {
    initInput(){
      this.doMan.name = this.userData.UserName;
      this.zs = this.nowTime;
      
    },
    unique(list){
      var arr = [];
      let b = false;
      for (var i = 0; i < list.length; i++) {
        if (i == 0) arr.push(list[i]);
        b = false;
        if (arr.length > 0 && i > 0) {
          for (var j = 0; j < arr.length; j++) {
            if (arr[j].RPFlowNo == list[i].RPFlowNo) {
              b = true;
              //break;
            }
          }
          if (!b) {
            arr.push(list[i]);
          }
        }
      }
      return arr;
    },
    newOne(){
      this.$router.push({ path: '/form-manage/curing/level-crossing-function-checklist-add' })
    },
    ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    closeDialogDel(){
    },
    deleteRecord(RPFlowNo) {
      this.dialogDel = true;
      this.DelDynamicKey += 1;
      this.RPFlowNo = RPFlowNo;
    },
    // 搜尋
    search() {
      let d1 = Date.parse(this.formData.searchItem.dateStart)
      let d2 = Date.parse(this.formData.searchItem.dateEnd)
      if(d1 > d2){
        alert('時間範圍錯誤')
        return
      }
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
          // "DISTINCT (RPFlowNo)",
          // // "ID",
          // // "Name",
          // // "CheckDay",
          // // "CheckStatus",
          // " * "
          "RPFlowNo",
          "ID",
          "Name",
          "CheckDay",
          "CheckStatus",
          "Location",
          "FlowId", "DepartName"
        ],
      }).then(res => {
        let tbBuffer = JSON.parse(res.data.DT)
        let aa = unique(tbBuffer)
        this.tableItems = aa
      }).catch(err => {
        //console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow({ show: false})
      })
    },
    // 關閉 dialog
    close() {
      this.Edit = false;
      this.dialog3 = false;
      this.dialogShowEdit = false;
      this.dialogDel = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.addItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    viewPage(item) {
      if(item.RPFlowNo.length > 0){
        this.$router.push({ path: `/form-manage/curing/level-crossing-function-checklist-edit/${item.RPFlowNo}` })
      }
      return
      this.chLoadingShow({show:true})
      
        // 依業主要求變更檢式頁面的方式，所以改為另開分頁
        fetchFormOrderOne({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {'Column':'RPFlowNo','Value':item.RPFlowNo},
                ],
        QyName:[
          "CheckDay",
          "EndDay",
          "Memo",
          "Name",
          "CheckOption1",
          "CheckOption2",
          "CheckOption3",
          "CheckOption4",
          "CheckOption5",
          "CheckOption6",
          "CheckOption7",
          "CheckOption8",

        ],
      }).then(res => {
        this.initInput();
       
        let dat = JSON.parse(res.data.DT)
        console.log("dat: ", dat);
        this.$router.push({ path: `/form-manage/curing/${dat}/level-crossing-function-checklist-add` })
        
      }).catch(err => {
        //console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow({ show: false})
      })
    },//viewPage
  },
};
</script>
