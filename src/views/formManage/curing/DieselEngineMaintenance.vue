<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2 label-title">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2 label-header">
      <!-- 保養日期起迄 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>保養日期(起)
        </h3>
        <v-menu
          v-model="dateMenuShow.start"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model.trim="ipt.dateStart"
              solo
              v-on="on"
              readonly
              clearable @click:clear="timeClean(1)"
            ></v-text-field>
          </template>
          <v-date-picker
            color="primary"
            v-model="ipt.dateStart"
            @input="time(1)"
            :max="dateAMax"
            locale="zh-tw"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>保養日期(迄)
        </h3>
        <v-menu
          v-model="dateMenuShow.end"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model.trim="ipt.dateEnd"
              solo
              v-on="on"
              readonly
              clearable @click:clear="timeClean(2)"
            ></v-text-field>
          </template>
          <v-date-picker
            color="primary"
            v-model="ipt.dateEnd"
           @input="time(2)"
            :min="dateBMin"
            locale="zh-tw"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4" md="4">
        <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-file</v-icon>車輛型號
        </h3>
        <v-text-field solo @click="eqCode_s=true;eqcKey++" readonly v-model="searchName" clearable @click:clear="eqClear_s"/>
        <v-dialog v-model="eqCode_s" max-width="700px">
          <v-card class="theme-card">
            <v-card-title class="px-4 py-1">
              車輛型號
              <v-spacer></v-spacer>
              <v-btn fab small text @click="eqCode_s = false" class="mr-n2">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <div class="px-4 py-3">
              <EquipCode :key="'eqcKey' + eqcKey" :nowEqCode="com_equipCode_s" :toLv="2" :disableToLv="1" :needIcon="false" :noLabel="true" @getEqCode="getRtnCode_s" @getEqName="getRtnName_s" />
            </div>
            <v-card-actions class="px-5 pb-5">
              <v-spacer></v-spacer>
              <v-btn class="mr-2 btn-close" dark elevation="4"  :loading="isLoading" @click="eqCode_s = false">取消</v-btn>
              <v-btn class="btn-add" dark elevation="4"  :loading="isLoading" @click="selectEQ_s">確認</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col cols="12" sm="8" md="9" align-self="end" class="mb-5 text-md-left">
        <v-btn dark large class="mr-3 mb-3 btn-search" @click="search">
          <v-icon>mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn elevation="2" large class="mb-3 btn-clear" @click="reset">
          <v-icon>mdi-reload</v-icon>清除搜尋內容
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        sm="8"
        md="3"
        align-self="end"
        class="mb-5 text-md-right"
      >
        <v-btn
          elevation="3"
          dark
          large
          class="mr-3 mb-3 btn-add"
          @click="newOne"
        >
          <!-- @click="ShowDetailDialog = true" -->
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </v-col>
      <!-- 新增/修改保養資料 modal -->
      <v-dialog v-model="ShowDetailDialog" persistent max-width="600px">
        <v-card class="theme-card">
          <v-card-title class="white--text px-4 py-1">
            {{ action }}{{ title }}
            <v-spacer></v-spacer>
            <v-btn dark fab small text @click="close" class="mr-n2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <div class="px-6 py-4 label-header">
            <v-row>
              <v-col cols="12" sm="8">
                <h3 class="mb-1">
                  <v-icon class="mr-1 mb-1">mdi-file</v-icon>車輛型號
                </h3>
                <v-text-field solo @click="eqCode=true;eqcKey++" v-model="eqName" readonly clearable  @click:clear="eqClear"/>
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
                      <EquipCode :key="'eqcKey2' + eqcKey" :nowEqCode="com_equipCode" :toLv="2" :disableToLv="1" :needIcon="false" :noLabel="true" @getEqCode="getRtnCode" @getEqName="getRtnName" />
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
            <v-row>
              <!-- 保養日期 -->
              <v-col cols="8" sm="4">
                <v-menu
                  v-model="dialogDateMenuShow.enter"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      hide-details
                      v-model="ipt.CheckDay"
                      v-on="on" readonly
                      label="保養日期"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    color="purple"
                    v-model="ipt.CheckDay"
                    @input="dialogDateMenuShow.enter = false"
                    locale="zh-tw"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <!-- 公里 -->
              <v-col cols="8" sm="4">
                <v-text-field
                  v-model="ipt.Km"
                  :rules="nameRules"
                  label="公里數"
                  placeholder="0"
                  required
                ></v-text-field>
              </v-col>
              <!-- 保養人 -->
              <v-col cols="8" sm="4">
                <v-text-field
                  hide-details readonly
                  v-model="doMan.name"
                  label="保養人"
                ></v-text-field>
              </v-col>
              <!-- 保養項目 -->
              <v-col cols="8" sm="12">
                <v-subheader
                  style="margin-left: -16px !important; margin-bottom: -25px"
                  >保養項目</v-subheader
                >
                <div class="pa-0">
                  <v-row justify="space-around">
                    <v-checkbox
                      class="mx-2"
                      v-model="ipt.checkbox.機油濾清器"
                      label="機油濾清器"
                    ></v-checkbox>
                    <v-checkbox
                      class="mx-2"
                      v-model="ipt.checkbox.柴油濾清器"
                      label="柴油濾清器"
                    ></v-checkbox>
                    <v-checkbox
                      class="mx-2"
                      v-model="ipt.checkbox.水泵濾清器"
                      label="水泵濾清器"
                    ></v-checkbox>
                  </v-row>
                </div>
              </v-col>
              <!-- 備註 -->
              <v-col cols="12">
                <v-textarea
                  hide-details
                  label="備註"
                  auto-grow
                  outlined
                  rows="6"
                  v-model.trim="ipt.Memo"
                ></v-textarea>
              </v-col>
            </v-row>
          </div>

          <v-card-actions class="px-5 pb-5">
            <v-btn
              v-if="action != actions.add"
              class="mr-2 btn-delete white--text"
              elevation="4"
              @click="dialogDel = true"
              >刪除</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn class="mr-2 btn-close white--text" elevation="4" @click="ShowDetailDialog = false"
              >取消</v-btn
            >
            <v-btn
              class="btn-add white--text"
              elevation="4"
              :loading="isLoading"
              @click="save"
              >{{ (action == '編輯')?"更新":action }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 顯示備註視窗 -->
      <v-dialog v-model="showMemoDialog" persistent max-width="500px">
        <v-card class="theme-card">
          <v-card-title class="white--text px-4 py-1">
            備註
            <v-spacer></v-spacer>
            <v-btn dark fab small text @click="showMemoDialog = false" class="mr-n2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <div class="px-6 py-4 label-header">
            {{ memoContent }}
          </div>
          <v-card-actions class="px-5 pb-5">
            <v-spacer></v-spacer>
            <v-btn class="mr-2 btn-close white--text" elevation="4" @click="showMemoDialog = false">關閉</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 刪除確認視窗 -->
      <v-dialog v-model="dialogDel" persistent max-width="290">
        <v-card class="theme-del-card">
          <v-card-title class="white--text px-4 py-1 headline"
            >確認是否刪除?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="btn-close white--text" @click="dialogDel = false">取消</v-btn>
            <v-btn
              class="btn-delete white--text"
              @click="deleteRecord(doMan.id, DB_Table, RPFlowNo)"
              >刪除</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 必填欄位空白提醒視窗 -->
      <v-dialog v-model="dialogNull" persistent max-width="290">
        <v-card class="theme-del-card">
          <v-card-title class="white--text px-4 py-1 headline"
            >請填妥必要欄位</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="btn-add white--text" @click="dialogNull = false">確定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
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

          <template v-slot:item.CarNo="{ item }">
            {{ item.MaintainCode_System + '-' + item.MaintainCode_Loc }}
          </template>

          <template v-slot:item.Memo="{ item }">
            <v-btn fab small dark class="btn-detail white--text"
              v-if="item.Memo.length > 6" @click="showMemo(item.Memo)"
            >
              <v-icon>mdi-file-document</v-icon>
            </v-btn>
            <div v-else>{{item.Memo}}</div>
          </template>

          <!-- headers 的 content 欄位 (檢視內容) -->
          <template v-slot:item.content="{ item }">
            <v-btn
              title="編輯"
              class="btn-memo mr-2"
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
              @click="
                dialogDel = true;
                RPFlowNo = item.RPFlowNo;
              "
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
  </v-container>
</template>

<script>
import { evtTypes, locationOpts } from "@/assets/js/smisData";
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from "vuex";
import {
  getNowFullTime,
  getTodayDateString,
  unique,
} from "@/assets/js/commonFun";
import { maintainStatusOpts } from "@/assets/js/workList";
import EquipCode from '@/components/EquipRepairCode'
import {
  fetchFormOrderList,
  fetchFormOrderOne,
  createFormOrder,
  createFormOrder0,
  updateFormOrder,
  deleteFormOrder,
} from "@/apis/formManage/serve";
import { formDepartOptions } from "@/assets/js/departOption";
import { Actions } from "@/assets/js/actions";
import { Constrant } from "@/assets/js/constrant";

export default {
  data: () => ({
    searchIpt: {  // 搜尋欄位
      dateStart: new Date().toISOString().substr(0, 10), // 通報日期(起)
      dateEnd: new Date().toISOString().substr(0, 10), // 通報日期(迄)
      MaintainCode_System: 'RST',  // 類型
      MaintainCode_Loc: ''
    },
    eqcKey: 0,
    eqCode_s: false,
    eqCode: false,
    searchName: '',
    eqName: '',
    preSetEqcode_s: '',
    preSetEqcode: '',
    preSerEqName_s: '',
    preSerEqName: '',

    showMemoDialog: false,
    memoContent: '',
    //
    title: "柴油引擎保養",
    action: Actions.add,
    actions: Actions,
    newText: "保養資料",
    dateAMax: '',
    dateBMin: '',
    isLoading: false,
    disabled: false,
    DB_Table: "RP047",
    DB_Table_097: "RP097",
    //
    carNos: [],
    RPFlowNo: "",
    nowTime: "",
    doMan: {
      id: "",
      name: "",
      depart: "",
      checkManName: "",
    },
    formDepartOptions: [
      // 通報單位下拉選單
      { text: "不限", value: "" },
      ...formDepartOptions,
    ],
    ipt: { // 新增/編輯 輸入欄位
      carNo: "",
      MaintainCode_System: 'RST',  // 類型
      MaintainCode_Loc: '',
      Km: "",
      Name: '',
      Item: "",
      Memo: "",
      checkbox: {
        機油濾清器: false,
        柴油濾清器: false,
        水泵濾清器: false,
      },
    },
    defaultIpt: {
      CheckDay: '',
      carNo: "",
      MaintainCode_System: 'RST',  // 類型
      MaintainCode_Loc: '',
      Km: "",
      Item: "",
      Memo: "",
      checkbox: {
        機油濾清器: false,
        柴油濾清器: false,
        水泵濾清器: false,
      },
    },
    dateMenuShow: {
      // 日曆是否顯示
      start: false,
      end: false,
    },
    evtTypeOpts: evtTypes,
    locationOpts: locationOpts,
    dateMenuShow: false, // 日曆是否顯示
    dialogDateMenuShow: {
      // dialog 日期 menu 是否顯示
      enter: false,
      out: false,
    },
    // editedItem: {
    //   Kilometer: 12044.3,
    //   enterDate: "2020-08-10",
    //   content: "更換引擎機油", // 維修項目
    //   user: "王大明",
    // },
    // addItem: {
    //   Kilometer: null,
    //   enterDate: "",
    //   content: "", // 維修項目
    //   user: "",
      
    // },
    // defaultItem: {
    //   Kilometer: 0,
    //   enterDate: "2020-08-10",
    //   content: "", // 維修項目
    //   user: "",
    // },
    nameRules: [
      (v) => !!v || "公里數必須填寫",
      (v) => v > 0 || "公里數必須大於0",
    ],
    dialogForm: {},
    dialogDel: false, // model off
    dialogm1: "2020-08-01",
    tableItems: [
      
    ], // 表格資料
    pageOpt: { page: 1 }, // 目前頁數
    headers: [
      // 表格顯示的欄位
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
        value: "CarNo",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "公里",
        value: "Km",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "機油濾清器",
        value: "機油濾清器",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "柴油濾清器",
        value: "柴油濾清器",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "水泵濾清器",
        value: "水泵濾清器",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "保養人",
        value: "Name",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "備註",
        value: "Memo",
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
    dateMenuShow: {
      // 日曆是否顯示
      start: false,
      end: false,
    },
    dialogDateMenuShow: {
      // dialog 日期 menu 是否顯示
      enter: false,
      enters: false,
      out: false,
    },
    readonly: false,
    // controls for dialog
    ShowDetailDialog: false,
    dialogDel: false, // model off
    dialogNull: false,
    // fields for detail page
    
  }),
  components: { Pagination, EquipCode }, // 頁碼
  computed: {
    ...mapState("user", {
      userData: (state) => state.userData, // 使用者基本資料
    }),
    com_equipCode_s: {
      get: function() {
          return this.searchIpt.MaintainCode_System + (this.searchIpt.MaintainCode_Loc==''?'':'-' + this.searchIpt.MaintainCode_Loc)
      },
      set: function(value) {
        if(value == ""){
          this.searchIpt.MaintainCode_System = 'RST';
          this.searchIpt.MaintainCode_Loc = this.preSetEqcode_s = this.preSerEqName_s = ""
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
    com_equipCode: {
      get: function() {
          return this.ipt.MaintainCode_System + (this.ipt.MaintainCode_Loc==''?'':'-' + this.ipt.MaintainCode_Loc)
      },
      set: function(value) {
        if(value == ""){
          this.ipt.MaintainCode_System = 'RST';
          this.ipt.MaintainCode_Loc = this.preSetEqcode = this.preSerEqName = ""
          this.eqName = ""
        }
        else{
          let splitArr2 = value.split('-')
          this.ipt.MaintainCode_System = splitArr2[0]
          this.ipt.MaintainCode_Loc = splitArr2[1]
        }
      }
    },
  },
  created() {
    this.input = { ...this.defaultIpt };
    //更新時間
    this.nowTime = getTodayDateString();
    this.doMan.name = this.userData.UserName;
    this.doMan.id = this.userData.UserId;
    this.doMan.depart = this.userData.DeptList[0].DeptDesc;
    this.doMan.departId = this.userData.DeptList[0].DeptId;
  },
  methods: {
    // 更新資料
    update() {
      this.$emit("chLocation", {});
    },
    ...mapActions("system", [
      "chMsgbar", // messageBar
      "chLoadingShow", // 切換 loading 圖顯示
    ]),
    showMemo(content){
      this.showMemoDialog = true
      this.memoContent = content
    },
    //機車回傳
    getRtnCode_s(code) {
        this.preSetEqcode_s = code
    },
    getRtnCode(code) {
        this.preSetEqcode = code
    },
    //機車回傳中文
    getRtnName_s(cName) {
      this.preSerEqName_s = cName.replace('車輛(RST)-','')
    },
    getRtnName(cName) {
      this.preSerEqName = cName.replace('車輛(RST)-','')
    },
    //機車送出按鈕
    selectEQ_s() {
      this.com_equipCode_s = this.preSetEqcode_s
      this.searchName = this.preSerEqName_s
      this.eqCode_s = false
    },
    selectEQ() {
      this.com_equipCode = this.preSetEqcode
      this.eqName = this.preSerEqName
      this.eqCode = false
    },
    eqClear_s(){
      this.com_equipCode_s = ""
    },
    eqClear(){
      this.com_equipCode = ""
    },
    // 清除搜尋內容
    reset() {
      this.ipt = { ...this.defaultIpt };
      this.com_equipCode_s = ""
    },
    initInput() {
      this.ipt.Name = this.doMan.name;
      this.ipt.CheckDay = getTodayDateString();
      this.ipt.Km = "";
      this.ipt.Memo = ""; // 維修項目
      this.ipt.checkbox.機油濾清器 = false;
      this.ipt.checkbox.柴油濾清器 = false;
      this.ipt.checkbox.水泵濾清器 = false;
      this.com_equipCode = "";
      this.eqName = ""
    },
    newOne() {
      this.readonly = false;
      this.action = this.actions.add;
      this.ShowDetailDialog = true;
      this.initInput();
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 解析保養細項
    parseItem(item) {
      var res = {
        機油濾清器: false,
        柴油濾清器: false,
        水泵濾清器: false,
      };
      var tmp = item.split("/");
      for (let i = 0; i < tmp.length; i++) {
        switch (tmp[i]) {
          case "1":
            res.機油濾清器 = true;
            break;
          case "2":
            res.柴油濾清器 = true;
            break;
          case "3":
            res.水泵濾清器 = true;
            break;
          default:
            break;
        }
      }
      return res;
    },
    // 重組保養細項
    combineItem(機油濾清器, 柴油濾清器, 水泵濾清器) {
      var arr = [];
      if (機油濾清器) {
        arr = arr.concat("1");
      }
      if (柴油濾清器) {
        arr = arr.concat("2");
      }
      if (水泵濾清器) {
        arr = arr.concat("3");
      }
      return arr.join("/");
    },
    time(i){
      if(i == 1){
        this.dateMenuShow.start = false
        this.dateBMin = this.ipt.dateStart
      }
      else{
        this.dateMenuShow.end = false
        this.dateAMax = this.ipt.dateEnd
      }
    },
    timeClean(i){
      if(i == 1){
        this.dateBMin = ''
      }
      else{
        this.dateAMax = ''
      }
    },
    // 搜尋
    search() {
      let d1 = Date.parse(this.ipt.dateStart)
      let d2 = Date.parse(this.ipt.dateEnd)
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
          { Column: "StartDayVlaue", Value: (this.ipt.dateStart == null)?'':this.ipt.dateStart },
          { Column: "EndDayVlaue", Value: (this.ipt.dateEnd == null)?'':this.ipt.dateEnd },
          { Column: "CarNo", Value: this.searchName },
        ],
        QyName: [
          // "DISTINCT (RPFlowNo)",
          // // "ID",
          // // "Name",
          // // "CheckDay",
          // // "CheckStatus",
          // " * "
          "RPFlowNo",
          "ID",
          "Name",
          "CarNo",
          "MaintainCode_System",
          "MaintainCode_Loc",
          "CheckDay",
          "CheckStatus",
          "FlowId",
          "DepartName",
          "Km",
          "Item",
          "Memo",
          "CheckMan",
        ],
      })
        .then((res) => {
          let tbBuffer = JSON.parse(res.data.DT);
          let aa = unique(tbBuffer);

          aa.forEach((element) => {
            var items = this.parseItem(element.Item);
            element.機油濾清器 = items.機油濾清器 ? "V" : "";
            element.柴油濾清器 = items.柴油濾清器 ? "V" : "";
            element.水泵濾清器 = items.水泵濾清器 ? "V" : "";
          });
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
    // 存
    save() {
      if (this.CheckDay == "" || this.Km == "") {
        this.dialogNull = true;
        return;
      }
      this.chLoadingShow({show:true});

      let arr = new Array();
      let obj = new Object();

      obj = new Object();
      obj.Column = "CheckDay";
      obj.Value = this.ipt.CheckDay;
      arr = arr.concat(obj);

      obj = new Object();
      obj.Column = "MaintainCode_System";
      obj.Value = this.ipt.MaintainCode_System;
      arr = arr.concat(obj);

      obj = new Object();
      obj.Column = "MaintainCode_Loc";
      obj.Value = this.ipt.MaintainCode_Loc;
      arr = arr.concat(obj);

      obj = new Object();
      obj.Column = "CarNo";
      obj.Value = this.eqName;
      arr = arr.concat(obj);

      obj = new Object();
      obj.Column = "Km";
      obj.Value = this.ipt.Km;
      arr = arr.concat(obj);

      obj = new Object();
      obj.Column = "Item";
      obj.Value = this.combineItem(
        this.ipt.checkbox.機油濾清器,
        this.ipt.checkbox.柴油濾清器,
        this.ipt.checkbox.水泵濾清器
      );
      arr = arr.concat(obj);

      obj = new Object();
      obj.Column = "Memo";
      obj.Value = this.ipt.Memo;
      arr = arr.concat(obj);

      var data = {
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.userData.UserId, // 操作人id this.doMan.name = this.userData.UserName
        // OperatorID: "16713",  // 操作人id
        FunCode: 'C',
        KeyName: this.DB_Table, // DB table
        KeyItem: arr,
      };

      // 修改
      if (this.action == Actions.edit) {
        // update 要自行增加RPFlowNo欄位
        data.RPFlowNo = this.RPFlowNo;
        updateFormOrder(data)
          .then((res) => {
            this.chMsgbar({ success: true, msg: Constrant.update.success });
          })
          .catch((err) => {
            ////console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.update.failed });
          })
          .finally(() => {
            this.chLoadingShow({ show: false});
            this.search();
          });
      } else {
        // 新增
        createFormOrder0(data)
          .then((res) => {
            if(res.data.ErrorCode == 0){
              this.chMsgbar({ success: true, msg: Constrant.insert.success });
            }
            else{
              alert(res.data.Msg)
            }
          })
          .catch((err) => {
            ////console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.insert.failed });
          })
          .finally(() => {
            this.chLoadingShow({ show: false});
            this.search();
          });
      }

      this.ShowDetailDialog = false;
    },
    // 關閉 dialog
    close() {
      this.ShowDetailDialog = false;
      this.dialogDel = false;
      // setTimeout(() => {
      //   this.editedItem = Object.assign({}, this.defaultItem);
      //   this.addItem = Object.assign({}, this.defaultItem);
      //   this.editedIndex = -1;
      // }, 300);
    },
    viewPage(item) {
      this.action = Actions.edit;
      this.readonly = true;
      this.chLoadingShow({show:true});
      // 依業主要求變更檢式頁面的方式，所以改為另開分頁
      fetchFormOrderOne({
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.userData.UserId, // 操作人id
        KeyName: this.DB_Table, // DB table
        KeyItem: [{ Column: "RPFlowNo", Value: item.RPFlowNo }],
        QyName: [
          "RPFlowNo",
          "CheckDay",
          "DepartName",
          "Name",
          "CheckMan",
          "Km",
          "Item",
          "Memo",
          "CarNo",
          "MaintainCode_System",
          "MaintainCode_Loc",
        ],
      })
        .then((res) => {
          this.initInput();
          let dat = JSON.parse(res.data.DT);
          let data = dat[0];
          this.doMan.name = data.Name;
          this.ipt.CheckDay = data.CheckDay.substr(0, 10);
          this.ipt.Km = data.Km;
          var tmp = this.parseItem(data.Item);
          this.ipt.checkbox.機油濾清器 = tmp.機油濾清器;
          this.ipt.checkbox.柴油濾清器 = tmp.柴油濾清器;
          this.ipt.checkbox.水泵濾清器 = tmp.水泵濾清器;
          this.ipt.Memo = data.Memo;
          this.ipt.MaintainCode_System = data.MaintainCode_System
          this.ipt.MaintainCode_Loc = data.MaintainCode_Loc
          this.RPFlowNo = data.RPFlowNo;
          this.ShowDetailDialog = true;
          this.eqName = data.CarNo;
          
        })
        .catch((err) => {
          ////console.log(err);
          alert("查詢時發生問題，請重新查詢!");
        })
        .finally(() => {
          this.chLoadingShow({ show: false});
        });
    }, //viewPage
    deleteRecord(UserId, DB_Table, RPFlowNo) {
      this.action = Actions.delete;
      this.chLoadingShow({show:true});
      deleteFormOrder({
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: UserId, // 操作人id
        KeyName: DB_Table, // DB table
        RPFlowNo: RPFlowNo,
        KeyItem: [{ Column: "RPFlowNo", Value: RPFlowNo }],
      })
        .then((res) => {
          this.dialogDel = false;
          this.chMsgbar({ success: true, msg: Constrant.delete.success });
        })
        .catch((err) => {
          ////console.log(err);
          this.chMsgbar({ success: false, msg: Constrant.delete.failed });
        })
        .finally(() => {
          this.chLoadingShow({ show: false});
          this.ShowDetailDialog = false;
          this.search();
        });
    },
  },
};
</script>