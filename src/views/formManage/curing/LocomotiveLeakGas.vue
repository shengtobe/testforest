<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2 label-title">{{ title }}</h2>
    <v-row class="px-2 label-header">
      <!-- 第一排選項 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>檢查日期(起)
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
              v-model.trim="input.dateStart"
              solo clearable
              v-on="on"
              readonly
            ></v-text-field>
          </template>
          <v-date-picker
            color="primary"
            v-model="input.dateStart"
            @input="dateMenuShow.start = false"
            locale="zh-tw"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>檢查日期(迄)
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
              v-model.trim="input.dateEnd"
              solo clearable
              v-on="on"
              readonly
            ></v-text-field>
          </template>
          <v-date-picker
            color="primary"
            v-model="input.dateEnd"
            @input="dateMenuShow.end = false"
            locale="zh-tw"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4" md="4">
        <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-file</v-icon>車輛型號
        </h3>
        <v-text-field solo @click="eqCode_s=true" readonly v-model="searchName" clearable @click:clear="eqClear_s"/>
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
              title="編輯"
              class="mr-2 btn-memo"
              small
              dark
              fab
              @click="viewPage(item)"
            >
              <!-- @click="dialogShowAdd = true" -->
              <v-icon dark>mdi-pen</v-icon>
            </v-btn>
            <v-btn
              title="刪除"
              small
              dark
              fab
              class="btn-delete"
              @click="dialogDel = true"
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

      <v-col cols="12" sm="12" md="12">
        <span>
          備註：
          <br /><strong
            >漏氣試驗：軔管充氣5公斤保壓，壓力降每公鐘不得超過0.2公斤。</strong
          >
        </span>
      </v-col>
      <!-- 新增/修改保養資料 modal -->
      <v-dialog v-model="ShowDetailDialog" persistent max-width="600px">
        <v-card class="theme-card">
          <!-- 標題 -->
          <v-card-title class="white--text px-4 py-1">
            {{ action }}{{ title }}
            <v-spacer />
            <v-btn dark fab small text @click="close" class="mr-n2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <!-- 內容 -->
          <div class="px-6 py-4 label-header">
            <v-row>
              <v-col cols="12" sm="8">
                <h3 class="mb-1">
                  <v-icon class="mr-1 mb-1">mdi-file</v-icon>車輛型號
                </h3>
                <v-text-field solo @click="eqCode=true" v-model="eqName" readonly clearable  @click:clear="eqClear"/>
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
                      <EquipCode :key="'eqcKey' + eqcKey" :nowEqCode="com_equipCode" ref="ref1" :toLv="2" :disableToLv="1" :needIcon="false" :noLabel="true" @getEqCode="getRtnCode" @getEqName="getRtnName" />
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
                <h3 class="mb-1">檢查日期</h3>
                <v-menu
                  v-model="datePickerShowControl.checkDay"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model.trim="CheckDay"
                      hide-details
                      v-on="on"
                      solo
                    />
                  </template>
                  <v-date-picker
                    color="primary"
                    v-model="CheckDay"
                    @input="datePickerShowControl.checkDay = false"
                    locale="zh-tw"
                  />
                </v-menu>
              </v-col>
              <!-- 漏氣量檢測結果 -->
              <v-col cols="8" sm="4">
                <h3 class="mb-1">漏氣量檢測結果</h3>
                <v-text-field
                  v-model="Result"
                  :rules="nameRules"
                  required
                  solo
                />
              </v-col>
              <!-- 累計使用時數 -->
              <v-col cols="8" sm="4">
                <h3 class="mb-1">累計使用時數</h3>
                <v-text-field
                  v-model="Hours"
                  :rules="numbersRules"
                  placeholder="0"
                  pattern="[0-9]+"
                  required
                  solo
                />
              </v-col>

              <!-- 檢測人員 -->
              <v-col cols="8" sm="4">
                <h3 class="mb-1">檢測人員</h3>
                <v-text-field v-model="Name" solo />
              </v-col>
              <!-- 單位主管 -->
              <!-- <v-col cols="8" sm="4">
                <h3 class="mb-1">單位主管</h3>
                <v-text-field v-model="addItem.user" solo />
              </v-col> -->
              <!-- 備註 -->
              <v-col cols="12">
                <h3 class="mb-1">備註</h3>
                <v-textarea
                  hide-details
                  auto-grow
                  outlined
                  rows="3"
                  v-model.trim="Memo"
                />
              </v-col>
            </v-row>
            <hr />
          </div>
          <!-- 輸出/取消 -->
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
              >{{ action }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from "vuex";
import {
  getNowFullTime,
  getTodayDateString,
  unique,
} from "@/assets/js/commonFun";
import EquipCode from '@/components/EquipRepairCode'
import { maintainStatusOpts } from "@/assets/js/workList";
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
    eqcKey: 0,
    eqCode_s: false,
    eqCode: false,
    searchName: '',
    eqName: '',
    preSetEqcode_s: '',
    preSetEqcode: '',
    preSerEqName_s: '',
    preSerEqName: '',
    MaintainCode_System: 'RST',  // 類型
    MaintainCode_Loc: '',
    //
    title: "機車韌缸漏氣量檢測紀錄表",
    action: Actions.add,
    actions: Actions,
    newText: "紀錄表",
    isLoading: false,
    disabled: false,
    input: {
      dateStart: new Date().toISOString().substr(0, 10), // 通報日期(起)
      dateEnd: new Date().toISOString().substr(0, 10), // 通報日期(迄)
      MaintainCode_System: 'RST',  // 類型
      MaintainCode_Loc: '',
    },
    defaultIpt: {
      // 預設的欄位值
      startDay: "",
      EndDay: "",
      MaintainCode_System: 'RST',  // 類型
      MaintainCode_Loc: '',
    },
    dateMenuShow: {
      // 日曆是否顯示
      start: false,
      end: false,
    },
    // evtTypeOpts: evtTypes,
    // locationOpts: locationOpts,
    dialogDateMenuShow: {
      // dialog 日期 menu 是否顯示
      enter: false,
      enters: false,
      out: false,
    },
    editedItem: {
      Kilometer: 12044.3,
      Kilometers: 12044.3,
      enterDate: "2020-08-10",
      content: "更換引擎機油", // 維修項目
      startday: "2020-08-10",
      user: "王大明",
    },
    addItem: {
      Kilometer: null,
      Kilometers: null,
      enterDate: "",
      content: "", // 維修項目
      enterDates: "",
      user: "",
    },
    defaultItem: {
      Kilometer: null,
      Kilometers: 0,
      enterDate: "2020-08-10",
      content: "", // 維修項目
      user: "",
    },
    nameRules: [(v) => !!v || "不可空白"],
    numbersRules: [
      (v) => !!v || "公里數必須填寫",
      (v) => v.length > 0 || "公里數必須大於0",
    ],
    disabled: true,
    pageOpt: { page: 1 }, // 目前頁數
    //---api---
    DB_Table: "RP049",
    RPFlowNo: "",
    nowTime: "",
    doMan: {
      id: "",
      name: "",
      depart: "",
      checkManName: "",
    },
    ipt2: {},
    
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
    formDepartOptions: [
      // 通報單位下拉選單
      { text: "不限", value: "" },
      ...formDepartOptions,
    ],
    dialogDateMenuShow: {
      // dialog 日期 menu 是否顯示
      enter: false,
      enters: false,
      out: false,
    },
    // controls for date picker
    datePickerShowControl: {
      startDate: false,
      endDate: false,
      checkDate: false,
    },
    // controls for dialog
    ShowDetailDialog: false,
    dialogDel: false, // model off
    dialogNull: false,

    // fields for detail page
    Name: "",
    Result: "",
    CheckDay: "",
    Hours: "",
    Memo: "",
    //------
  }),
  components: { Pagination, EquipCode }, // 頁碼
  computed: {
    ...mapState("user", {
      userData: (state) => state.userData, // 使用者基本資料
    }),
    com_equipCode_s: {
      get: function() {
          return this.input.MaintainCode_System + (this.input.MaintainCode_Loc==''?'':'-' + this.input.MaintainCode_Loc)
      },
      set: function(value) {
        if(value == ""){
          this.input.MaintainCode_System = 'RST';
          this.input.MaintainCode_Loc = this.preSetEqcode_s = this.preSerEqName_s = ""
          this.eqcKey++
          this.searchName = ""
        }
        else{
          let splitArr = value.split('-')
          this.input.MaintainCode_System = splitArr[0]
          this.input.MaintainCode_Loc = splitArr[1]
        }
      }
    },
    com_equipCode: {
      get: function() {
          return this.MaintainCode_System + (this.MaintainCode_Loc==''?'':'-' + this.MaintainCode_Loc)
      },
      set: function(value) {
        if(value == ""){
          this.MaintainCode_System = 'RST';
          this.MaintainCode_Loc = this.preSetEqcode = this.preSerEqName = ""
          this.eqcKey++
          this.eqName = ""
        }
        else{
          let splitArr2 = value.split('-')
          this.MaintainCode_System = splitArr2[0]
          this.MaintainCode_Loc = splitArr2[1]
        }
      }
    },
  },
  created() {
    this.ipt2 = { ...this.defaultIpt };
    //更新時間
    this.nowTime = getTodayDateString();
    this.doMan.name = this.userData.UserName;
    this.doMan.id = this.userData.UserId;
    this.doMan.depart = this.userData.DeptList[0].DeptDesc;
    this.doMan.departId = this.userData.DeptList[0].DeptId;
  },
  methods: {
    initInput() {
      this.Name = this.doMan.name;
      this.CheckDay = getTodayDateString();
      this.Result = "";
      this.Hours = "";
      this.Memo = "";
      this.com_equipCode = ""
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
    newOne() {
      this.readonly = false;
      this.action = Actions.add;
      this.ShowDetailDialog = true;
      this.initInput();
    },
    // 更新資料
    update() {
      this.$emit("chLocation", {});
    },
    ...mapActions("system", [
      "chMsgbar", // messageBar
      "chLoadingShow", // 切換 loading 圖顯示
    ]),
    // 清除搜尋內容
    reset() {
      this.input = { ...this.defaultIpt };
      this.com_equipCode_s = ""
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 搜尋
    search() {
      let d1 = Date.parse(this.input.dateStart)
      let d2 = Date.parse(this.input.dateEnd)
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
          { Column: "StartDayVlaue", Value: this.input.dateStart },
          { Column: "EndDayVlaue", Value: this.input.dateEnd },
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
    // 存
    save() {
      if (this.Result == "" || this.Hours == "") {
        this.dialogNull = true;
        return;
      }
      this.chLoadingShow({show:true});

      let arr = new Array();
      let obj = new Object();

      obj = new Object();
      obj.Column = "CheckDay";
      obj.Value = this.nowTime;
      arr = arr.concat(obj);

      obj = new Object();
      obj.Column = "Result";
      obj.Value = this.Result;
      arr = arr.concat(obj);

      obj = new Object();
      obj.Column = "CarNo";
      obj.Value = this.eqName;
      arr = arr.concat(obj);

      obj = new Object();
      obj.Column = "Hours";
      obj.Value = this.Hours;
      arr = arr.concat(obj);

      obj = new Object();
      obj.Column = "Memo";
      obj.Value = this.Memo;
      arr = arr.concat(obj);

      var data = {
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.doMan.id, // 操作人id this.doMan.name = this.userData.UserName
        // OperatorID: "16713",  // 操作人id
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
          });
      } else {
        // 新增
        createFormOrder0(data)
          .then((res) => {
            
            this.chMsgbar({ success: true, msg: Constrant.insert.success });
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
      this.dialogShowEdit = false;
      this.dialogDel = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.addItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
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
          "Result",
          "Hours",
          "Memo",
          "CarNo",
          "MaintainCode_System",
          "MaintainCode_Loc",
        ],
      })
        .then((res) => {
          this.initInput();
          //
          let dat = JSON.parse(res.data.DT);
          let data = dat[0];
          // this.zs = res.data.DT.CheckDay
          this.Name = data.Name;
          this.CheckDay = data.CheckDay.substr(0, 10);
          this.Result = data.Result;
          this.Hours = data.Hours;
          this.Memo = data.Memo;

          this.RPFlowNo = data.RPFlowNo;
          this.ShowDetailDialog = true;

          this.MaintainCode_System = data.MaintainCode_System
          this.MaintainCode_Loc = data.MaintainCode_Loc
          this.eqName = data.CarNo;
        })
        .catch((err) => {
          ////console.log(err);
          this.chMsgbar({ success: false, msg: Constrant.query.failed });
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
