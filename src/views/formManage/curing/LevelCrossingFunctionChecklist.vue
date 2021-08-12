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
    <!-- 新增自動檢點表 modal -->
    <v-dialog v-model="Add" persistent max-width="960px">
      <v-card class="theme-card">
        <v-card-title class="white--text px-4 py-1">
          新增{{ title }}
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
            <!-- 檢查項目 -->
            <v-col cols="12">
              <v-row no-gutter class="label-header">
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">檢查日期</h3>
                  <v-menu
                    v-model="ass"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model.trim="zs" solo v-on="on" readonly></v-text-field>
                    </template>
                    <v-date-picker color="purple" v-model="zs" @input="ass = false" locale="zh-tw"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">管理單位</h3>
                  <v-text-field solo value  />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">檢查人員</h3>
                  <v-text-field solo value  />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">型式</h3>
                  <v-text-field solo value  />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">堆高荷重</h3>
                  <v-text-field solo value  />
                </v-col>
              </v-row>
              <v-row no-gutter class="label-header d-none d-sm-flex font-weight-black">
                <v-col cols="12" sm="1">
                  <h4 class="mb-1">編號及平交道位置</h4>
                </v-col>
                <v-col cols="12" sm="1">
                  <h4 class="mb-1">電源邏輯電路</h4>
                </v-col>
                <v-col cols="12" sm="1">
                  <h4 class="mb-1">接收器</h4>
                </v-col>
                <v-col cols="12" sm="1">
                  <h4 class="mb-1">警音</h4>
                </v-col>
                <v-col cols="12" sm="1">
                  <h4 class="mb-1">警示燈</h4>
                </v-col>
                <v-col cols="12" sm="1">
                  <h4 class="mb-1">道路閃爍光燈1,2</h4>
                </v-col>
                <v-col cols="12" sm="1">
                  <h4 class="mb-1">遮桿閃爍光燈1,2</h4>
                </v-col>
                <v-col cols="12" sm="1">
                  <h4 class="mb-1">信號燈1,2</h4>
                </v-col>
                <v-col cols="12" sm="1">
                  <h4 class="mb-1">遮斷機1,2</h4>
                </v-col>
              </v-row>
              <v-alert
                dense
                border="top"
                colored-border
                color="border-bg-dark-yellow"
                elevation="4"
                v-for="(item, idx) in items"
                :key="idx"
                class="mb-6"
              >
                <v-row no-gutter>
                  <v-col cols="12" sm="1">{{ item.question }}</v-col>
                  <v-col cols="12" sm="1">
                    <span class="d-sm-none label-header">檢查結果：</span>
                    <v-radio-group dense row v-model="ipt.items[idx].status" class="pa-0 ma-0">
                      <v-radio color="success" label="正常" value="1"></v-radio>
                      <v-radio color="red" label="維修保養後正常" value="2"></v-radio>
                      <v-radio color="black" label="無此設備" value="3"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
            <!-- 改善建議、改善追蹤 -->
            <v-col cols="12">
              <h3 class="mb-1 label-header">改善措施</h3>
              <v-textarea auto-grow outlined rows="4" v-model.trim="ipt.suggest"></v-textarea>
            </v-col>
            <!-- END 檢查項目 -->
          </v-row>
        </div>

        <v-card-actions class="px-5 pb-5">
          <v-spacer></v-spacer>
          <v-btn class="mr-2 btn-close white--text" elevation="4" @click="close">取消</v-btn>
          <v-btn class="btn-add white--text" elevation="4" :loading="isLoading" @click="save">送出</v-btn>
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
      Add: false,
      dialog3: false,
      ShowDetailDialog: false,
      dialogDel: false, // model off
      Add: false,
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
        { text: "功能", value: "content", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
      ],
      tableItems: [],
      //------
      ipt: {
        department: "",
        date: new Date().toISOString().substr(0, 10),
        items: [
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
          { status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", status: "0", note: "", sign: "" },
        ],
      },
      items: [
        { question: "1. （漏水與否）引擎冷卻水檢查" },
        { question: "2. 引擎機油檢查" },
        { question: "3. 檢查輪胎氣壓及有無損傷" },
        { question: "4. 吊句防脫裝置" },
        { question: "5. 螺帽檢查輪殼的鎖緊" },
        { question: "6. 動作情況檢查離合器踏板" },
        { question: "7. 液壓油檢查" },
        { question: "8. 範圍檢查方向盤動作" },
        { question: "9. 情況檢查手煞車動作" },
        { question: "10. 操作情況檢查儀表、燈及喇叭" },
        { question: "11. 不正常現象檢查荷重架有否" },
        { question: "12. 有否漏油現象檢查" },
        { question: "13. 油水分離器檢查" },
        { question: "14. 煞車之性能制動裝置及" },
        { question: "15. 有無損壞頂蓬及桅桿" },
        { question: "16. 其他" },
      ],
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
      console.log("newOne23")
      this.$router.push({ path: '/form-manage/curing/level-crossing-function-checklist-add' })
    },
    ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 搜尋
    search() {
      console.log("Search click");
      this.chLoadingShow({show:true})
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {'Column':'StartDayVlaue','Value':this._data.z},
          {"Column":"EndDayVlaue","Value":this._data.df},
          {"Column":"DepartCode","Value":this._data.ipt2.depart},
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
          "FlowId", "DepartName"
        ],
      }).then(res => {
        let tbBuffer = JSON.parse(res.data.DT)
        let aa = unique(tbBuffer)
        this.tableItems = aa
      }).catch(err => {
        console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow({ show: false})
      })
    },
    // 存
    save() {},
    // 關閉 dialog
    close() {
      this.Add = false;
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
          "DepartName",
          "Name",
          "CheckMan",
          "CheckOption1",
          "Memo_1",
          "CheckOption2",
          "Memo_2",
          "CheckOption3",
          "Memo_3",
          "Advice",
          "Measures",

        ],
      }).then(res => {
        this.initInput();
        console.log(res.data.DT)
        let dat = JSON.parse(res.data.DT)
        console.log("data name: " + dat[0].Name)
        console.log("data time: " + dat[0].CheckDay)
        this.Add = true
        // this.zs = res.data.DT.CheckDay
        this.doMan.name = dat[0].Name
        let time1 = dat[0].CheckDay.substr(0,10)
        console.log("data time1: " + time1)
        this.zs = time1
        console.log("doMan name: " + this.doMan.name)
        //123資料
        let ad = Object.keys(dat[0])
        console.log(ad)
        var i = 0, j = 0;
          for(let key of Object.keys(dat[0])){
            if(i > 3 && i < 52){
              if(i % 2 == 0){
                  this.ipt.items[j].status = (dat[0])[key]
              }
              else{
                this.ipt.items[j].note = (dat[0])[key]
                j++
              }
            }
            i++
          }
        this.memo_2 = dat[0].Advice
        this.memo_3 = dat[0].Measures
      }).catch(err => {
        console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow({ show: false})
      })
    },//viewPage
  },
};
</script>
