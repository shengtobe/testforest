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
              class="Btn-delete"
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
    <v-dialog v-model="Add" persistent max-width="680px">
      <v-card class="thmem-card">
        <v-card-title class="white--text px-4 py-1">
          新增{{ title }}
          <v-spacer></v-spacer>
          <v-btn dark fab small text @click="close" class="mr-n2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <div class="px-6 py-4 label-header">
          <v-row>
            <!-- 填表項目 -->
            <v-col cols="12">
              <v-row no-gutter>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">填表日期</h3>
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
                    <v-date-picker color="primary" v-model="zs" @input="ass = false" locale="zh-tw"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">填表人員</h3>
                  <v-text-field solo value readonly v-model="doMan.name"/>
                </v-col>
              </v-row>
              <v-col cols="13" sm="12">
                <v-toolbar color="gradual-bg-darken-wood" dark>
                  <v-spacer />
                  <v-toolbar-title>一、個人疲勞</v-toolbar-title>
                  <v-spacer />
                </v-toolbar>
              </v-col>
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
                  <v-col cols="12" sm="4">{{ item.question }}</v-col>
                  <v-col cols="12" sm="7">
                    <span class="d-sm-none error--text">回答：</span>
                    <v-radio-group dense row v-model="ipt.items[idx].status" class="pa-0 ma-0">
                      <v-radio color="success" label="總是" value="100"></v-radio>
                      <v-radio color="orange" label="常常" value="75"></v-radio>
                      <v-radio color="orange" label="有時候" value="50"></v-radio>
                      <v-radio color="orange" label="不常" value="25"></v-radio>
                      <v-radio color="red" label="從未或幾乎從未" value="0"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-alert>
              <v-col cols="13" sm="12">
                <v-toolbar color="gradual-bg-darken-wood" dark>
                  <v-spacer />
                  <v-toolbar-title>二、工作疲勞</v-toolbar-title>
                  <v-spacer />
                </v-toolbar>
              </v-col>
              <v-alert
                dense
                border="top"
                colored-border
                color="border-bg-dark-yellow"
                elevation="4"
                v-for="(item, idx) in items2"
                :key="idx"
                class="mb-6"
              >
                <v-row no-gutter>
                  <v-col cols="12" sm="4">{{ item.question }}</v-col>
                  <v-col cols="12" sm="7">
                    <span class="d-sm-none error--text">回答：</span>
                    <v-radio-group dense row v-model="ipt.items2[idx].status" class="pa-0 ma-0">
                      <v-radio color="success" label="總是" value="0"></v-radio>
                      <v-radio color="orange" label="常常" value="25"></v-radio>
                      <v-radio color="orange" label="有時候" value="50"></v-radio>
                      <v-radio color="orange" label="不常" value="75"></v-radio>
                      <v-radio color="red" label="從未或幾乎從未" value="100"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
            <!-- 改善建議、改善追蹤 -->
            <v-col cols="12" sm="6">
              <v-toolbar color="border-bg-dark-yellow" dark >
                <v-toolbar-title style="width:70%; text-align:center">個人疲勞分數</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field flat v-model="PersonalFatigueTotal" readonly style="width:30%; margin-top:30px;">
                  <span slot="append">分</span>
                </v-text-field>
              </v-toolbar>
            </v-col>
            <v-col cols="12" sm="6">
              <v-toolbar color="border-bg-dark-yellow" dark >
                <v-toolbar-title style="width:70%; text-align:center">工作疲勞分數</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field flat v-model="count2" readonly style="width:30%; margin-top:30px;">
                  <span slot="append">分</span>
                </v-text-field>
              </v-toolbar>
            </v-col>
            <v-col cols="12">
              <b>※您是否同意檢附量表分數，以作為後續健康風險評估之用途?</b>
            </v-col>
            <v-col cols="12" sm="7">
              <span class="d-sm-none label-header">回答：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="CheckOption16">
                <v-radio color="success" label="同意" value="1"></v-radio>
                <v-radio color="red" label="不同意" value="2"></v-radio>
              </v-radio-group>
            </v-col>
            <!-- <v-col cols="12">
              <h3 class="mb-1 indigo--text">同意人</h3>
              <v-textarea auto-grow outlined rows="1" v-model.trim="ipt.suggest"></v-textarea>
            </v-col> -->
            <v-col cols="12">
              <p>本職場超時工作(過勞)預防計畫編撰參考資料源自勞動部勞工研究所之過勞工作指引及台北市衛生局職場心理健康</p>
            </v-col>
            <v-col cols="13" sm="12">
              <v-toolbar color="gradual-bg-darken-wood" dark>
                <v-spacer />
                <v-toolbar-title>分數解釋</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
            </v-col>
            <v-expansion-panels :disabled="disabled" multiple>
              <v-expansion-panel>
                <v-expansion-panel-header color="border-bg-dark-yellow" class="white--text">
                  個人疲勞
                  <template v-slot:actions>
                    <v-icon color="dropdownicon">
                      $expand
                    </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                    <v-col cols="12" sm="3">
                      <h3 class="mb-1">分數</h3>
                    </v-col>
                    <v-col cols="12" sm="2">
                      <h3 class="mb-1">分級</h3>
                    </v-col>
                    <v-col cols="12" sm="7">
                      <h3 class="mb-1">解釋</h3>
                    </v-col>
                  </v-row>
                  <v-alert
                    dense
                    border="top"
                    colored-border
                    color="border-bg-dark-yellow"
                    elevation="4"
                    v-for="(item, idx) in itemSc1"
                    :key="idx"
                    class="mb-6 mt-4"
                  >
                    <v-row no-gutter>
                      <v-col cols="12" sm="3">{{ item.question }}</v-col>
                      <v-col cols="12" sm="2">{{ item.checkContent }}</v-col>
                      <v-col cols="12" sm="7">{{ item.checkMethod }}</v-col>
                    </v-row>
                  </v-alert>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header color="border-bg-dark-yellow" class="white--text">
                  工作疲勞
                  <template v-slot:actions>
                    <v-icon color="dropdownicon">
                      $expand
                    </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                    <v-col cols="12" sm="3">
                      <h3 class="mb-1">分數</h3>
                    </v-col>
                    <v-col cols="12" sm="2">
                      <h3 class="mb-1">分級</h3>
                    </v-col>
                    <v-col cols="12" sm="7">
                      <h3 class="mb-1">解釋</h3>
                    </v-col>
                  </v-row>
                  <v-alert
                    dense
                    border="top"
                    colored-border
                    color="border-bg-dark-yellow"
                    elevation="4"
                    v-for="(item, idx) in itemSc2"
                    :key="idx"
                    class="mb-6 mt-4"
                  >
                    <v-row no-gutter>
                      <v-col cols="12" sm="3">{{ item.question }}</v-col>
                      <v-col cols="12" sm="2">{{ item.checkContent }}</v-col>
                      <v-col cols="12" sm="7">{{ item.checkMethod }}</v-col>
                    </v-row>
                  </v-alert>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <!-- END 檢查項目 -->
          </v-row>
        </div>
        <!-- <v-card-actions class="px-5 pb-5">
          <v-spacer></v-spacer>
          <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
          <v-btn color="success" elevation="4" :loading="isLoading" @click="save">送出</v-btn>
        </v-card-actions> -->
        <v-card-actions class="px-5 pb-5">
          <v-btn
            v-if="action != actions.add"
            elevation="4"
            class="mr-2 btn-delete white--text"
            @click="deleteRecord(RPFlowNo)"
            >刪除</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn class="mr-2 btn-close white--text" elevation="4" @click="close">取消</v-btn>
          <v-btn
            class="btn-add white--text"
            elevation="4"
            @click="save"
            >送出</v-btn
          >
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
      title:"職業安全衛生過勞量表",
      newText:"量表",
      action: Actions.add,
      actions: Actions,
      isLoading: false,
      disabled: false,
      // ss: 0,
      a: "",
      ass: "",
      z: "",
      zs: "",
      q: "",
      df: "",
      s: "",
      qz: "",
      formDepartOptions: [
        // 通報單位下拉選單
        { text: "不限", value: "" },
        ...formDepartOptions,
      ],
      wx: "",
      pp: "",
      oo: "",
      ii: "",
      uu: "",
      yy: "",
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
      DB_Table: "RP092",
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
        { text: "審查狀態", value: "CheckStatus", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "填寫人", value: "Name", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "保養單位", value: "DepartName", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "功能", value: "content", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
      ],
      tableItems: [],
      //------
      CheckOption16: "0",
      ipt: {
        department: "",
        // name: JSON.parse(localStorage.getItem("user")).name,
        date: new Date().toISOString().substr(0, 10),
        items: [
          { status: 1, note: "" },
          { status: 1, note: "" },
          { status: 1, note: "" },
          { status: 1, note: "" },
          { status: 1, note: "" },
          { status: 1, note: "" },
          { status: 1, note: "" },
        ],
        items2: [
          { status: 1, note: "" },
          { status: 1, note: "" },
          { status: 1, note: "" },
          { status: 1, note: "" },
          { status: 1, note: "" },
          { status: 1, note: "" },
          { status: 1, note: "" },
          { status: 1, note: "" },
        ],
        itemSc1: [
          { status: 1, note: "" },
          { status: 1, note: "" },
          { status: 1, note: "" },
          { status: 1, note: "" },
        ],
        itemSc2: [
          { status: 1, note: "" },
          { status: 1, note: "" },
          { status: 1, note: "" },
          { status: 1, note: "" },
        ],
      },
      items: [
        { question: "1. 你常覺得疲勞嗎?" },
        { question: "2. 你常覺得身體上體力透支嗎?" },
        { question: "3. 你常覺得情緒上心力交瘁嗎?" },
        { question: "4. 你常會覺得，「我快要撐不下去了」嗎?" },
        { question: "5. 你常覺得精疲力竭嗎?" },
        { question: "6. 你常常覺得虛弱，好像快要生病了嗎?" },
      ],
      items2: [
        { question: "1. 你的工作會令人情緒上心力交瘁嗎？" },
        { question: "2. 你的工作會讓你覺得快要累垮了嗎?" },
        { question: "3. 你的工作會讓你覺得挫折嗎?" },
        { question: "4. 工作一整天之後，你覺得精疲力竭嗎?" },
        { question: "5. 上班之前只要想到又要工作一整天，你就覺得沒力嗎?" },
        { question: "6. 上班時你會覺得每一刻都很難熬嗎?" },
        { question: "7. 不工作的時候，你有足夠的精力陪朋友或家人嗎?(反向題)" },
      ],
      itemSc1: [
        {
          question: "1.50分以下",
          checkContent: "輕微",
          checkMethod:
            "您的過負荷程度輕微，您並不常感到疲勞、體力透支、精疲力竭、或者虛弱好像快生病的樣子。",
        },
        {
          question: "2.50－70分",
          checkContent: "中度",
          checkMethod:
            "你的個人過負荷程度中等。您有時候感到疲勞、體力透支、精疲力竭、或者虛弱好像快生病的樣子。建議您找出生活的壓力源，進一步的調適自己，增加放鬆與休息的時間。",
        },
        {
          question: "3.70分以上",
          checkContent: "嚴重",
          checkMethod:
            "您的個人過負荷程度嚴重。您時常感到疲勞、體力透支、精疲力竭、或者虛弱好像快生病的樣子。建議您適度的改變生活方式，增加運動與休閒時間之外，您還需要進一步尋找專業人員諮詢。",
        },
      ],
      itemSc2: [
        {
          question: "1.45分以下",
          checkContent: "輕微",
          checkMethod:
            "您的工作相關過負荷程度輕微，您的工作並不會讓您感覺很沒力、心力交瘁、很挫折。",
        },
        {
          question: "2.45－60分",
          checkContent: "中度",
          checkMethod:
            "您的工作相關過負荷程度中等，您有時對工作感覺沒力，沒有興趣，有點挫折。",
        },
        {
          question: "3.60分以上",
          checkContent: "嚴重",
          checkMethod:
            "您的工作相關過負荷程度嚴重，您已經快被工作累垮了，您感覺心力交瘁，感覺挫折，而且上班時都很難熬，此外您可能缺少休閒時間，沒有時間陪伴家人朋友。建議您適度的改變生活方式，增加運動與休閒時間之外，您還需要進一步尋找專業人員諮詢。",
        },
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
    PersonalFatigueTotal() {
      var total = 0;
      for (let index = 0; index < this.ipt.items.length; index++) {
        total += Number(this.ipt.items[index].status);
      }

      var roundDecimal = function (val, precision) {
        return (
          Math.round(
            Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10
          ) / Math.pow(10, precision || 0)
        );
      };

      total = total / 6;
      return roundDecimal(total, 1);
    },

    count2() {
      var total = 0;
      for (let index = 0; index < this.ipt.items2.length; index++) {
        total += Number(this.ipt.items2[index].status);
      }

      var roundDecimal = function (val, precision) {
        return (
          Math.round(
            Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10
          ) / Math.pow(10, precision || 0)
        );
      };

      total = total / 7;
      return roundDecimal(total, 1);
    },
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
      this.CheckOption16 = "0"
      var step;
      for (step = 0; step < 7; step++) {
        this.ipt.items[step].status = ""
        this.ipt.items2[step].status = ""
      }
      this.Advice = "";
      this.Measures = ""
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
      this.Add = true
      this.action = Actions.add
      console.log("this.Add: " + this.Add)
      this.initInput();
    },
    ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
    reset() {
      this.formData.searchItem.dateStart = "";
      this.formData.searchItem.dateEnd = "";
      this.formData.searchItem.department = "";
    },
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
        this.chLoadingShow({show:false})
      })
    },
    // 存
    save() {
      
      this.chLoadingShow({show:true})

      let arr = new Array()
      let obj = new Object()

      console.log("this.ipt.items[0].status: " + this.ipt.items[0].status)
      console.log("this.ipt.items[0].note: " + this.ipt.items[0].note)

      obj = new Object()
      obj.Column = "CheckDay"
      obj.Value = this.zs
      console.log(obj.Value)
      arr = arr.concat(obj)               

      let i;
      for (i = 0; i < 13; i++) {
        obj = new Object()
        obj.Column = "CheckOption" + (i+1)
        if(i < 6){
          obj.Value = this.ipt.items[i].status
        }
        else{
          obj.Value = this.ipt.items2[i-6].status
        }
        arr = arr.concat(obj)
      }

      obj = new Object()
      obj.Column = "CheckOption14"
      obj.Value = this.PersonalFatigueTotal
      arr = arr.concat(obj)
      obj = new Object()
      obj.Column = "CheckOption15"
      obj.Value = this.count2
      arr = arr.concat(obj)
      obj = new Object()
      obj.Column = "CheckOption16"
      obj.Value = this.CheckOption16
      arr = arr.concat(obj)

      console.log(JSON.stringify(arr))
      console.log("this.action == " + this.action == Actions.add)
      if (this.action == Actions.add){
        //-----新增-----
        createFormOrder0({
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id this.doMan.name = this.userData.UserName
          // OperatorID: "16713",  // 操作人id
          KeyName: this.DB_Table,  // DB table
          KeyItem:arr,
        }).then(res => {
          console.log(res.data.DT)
        }).catch(err => {
          console.log(err)
          alert('查詢時發生問題，請重新查詢!')
        }).finally(() => {
          this.chLoadingShow({show:false})
        })
      }
      else{
        //-----編輯-----
        updateFormOrder({
          ClientReqTime: getNowFullTime(), // client 端請求時間
          OperatorID: this.userData.UserId, // 操作人id
          RPFlowNo: this.RPFlowNo,
          // FunCode: "U",
          KeyName: this.DB_Table, // DB table
          KeyItem: arr,
        })
          .then((res) => {
            console.log(res.data.DT)
          })
          .catch((err) => {
            console.log(err);
            // this.chMsgbar({ success: false, msg: Constrant.update.failed });
            alert('查詢時發生問題，請重新查詢!')
          })
          .finally(() => {
            this.chLoadingShow({show:false})
          });
      }
      this.Add = false;
    },
    // 關閉刪除確認dialod
    closeDialogDel() {
      this.dialogDel = false;
      console.log("刪除確認是窗關閉, RPFlowNo:")
      console.log(RPFlowNo)
    },
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
      console.log("item: " + item)
      this.RPFlowNo = item.RPFlowNo
      console.log("RPFlowNo: " + item.RPFlowNo)
      this.action = Actions.edit
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
          "CheckOption1",//4
          "CheckOption2",
          "CheckOption3",
          "CheckOption4",
          "CheckOption5",
          "CheckOption6",
          "CheckOption7",
          "CheckOption8",
          "CheckOption9",
          "CheckOption10",
          "CheckOption11",
          "CheckOption12",
          "CheckOption13",//16
          "CheckOption14",
          "CheckOption15",
          "CheckOption16",//19
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
        var i = 0, j = 0;
        for (let key of Object.keys(dat[0])) {
          if(i >= 4 && i <= 16){
            if(j < 6){
              this.ipt.items[j].status = (dat[0])[key]
            }
            else{
              this.ipt.items2[j-6].status = (dat[0])[key]
            }
            j++
          }
          i++
        }

        
      }).catch(err => {
        console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow({ show: false})
      })
    },//viewPage
    deleteRecord(RPFlowNo) {
      this.dialogDel = true;
      this.DelDynamicKey += 1;
      this.RPFlowNo = RPFlowNo;
      console.log("刪除確認視窗開啟, RPFlowNo:")
      console.log(RPFlowNo)
      console.log(this.RPFlowNo)
    },
  },
};
</script>
<style>
.v-input__prepend-outer {
  width: 79%;
}
</style>