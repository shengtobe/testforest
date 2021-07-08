<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2 label-title">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2 label-header">
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="檢查日期(起)"
          v-model="input.dateStart"
          key="dateStart"
          :showIcon="formIconShow"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="檢查日期(迄)"
          v-model="input.dateEnd"
          key="dateStart"
          :showIcon="formIconShow"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <deptSelect
          label="管理單位"
          v-model="input.department"
          :showIcon="formIconShow"
          outType="key"
          key="department"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3"></v-col>

      <v-col cols="12" sm="3" md="3">
        <v-form ref="uploadform">
         <UploadOneFileAdd @joinFile="select" />
        </v-form>
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn dark large class="mb-sm-8 mb-md-8 btn-fileup">
          <v-icon class="mr-1">mdi-cloud-upload</v-icon>上傳
        </v-btn>
      </v-col>
      <v-col cols="12" sm="3" md="6"></v-col>
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
    <!-- 刪除確認視窗 -->
    <v-dialog v-model="dialogDel" persistent max-width="290">
      <v-card class="theme-del-card">
        <v-card-title class="white--text px-4 py-1 headline"
          >確認是否刪除?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="btn-close white--text" @click="dialogDel = false">取消</v-btn>
          <v-btn class="btn-delete white--text" @click="deleteRecord(doMan.id, DB_Table, RPFlowNo)"
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
    <!-- 新增/修改切割機定期檢查表(三個月) modal -->
    <v-dialog v-model="ShowDetailDialog" persistent max-width="900px">
      <v-card class="theme-card">
        <v-card-title class="white--text px-4 py-1">
          {{ contentType | editStatus }}{{ title }}
          <v-spacer></v-spacer>
          <v-btn dark fab small text @click="close" class="mr-n2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <div class="px-6 py-4">
          <v-row>
            <v-col cols="12">
              <p>1.依職業安全衛生法第23條規定辦理。</p>
              <p>2.依檢查結果選擇良好、不良、無此項目。</p>
              <p>3.缺點由使用單位自行改善，不克者委請設備商修護。</p>
              <p>4.本定期檢查表於每年 1.4.7.10月月底前完成檢查。</p>
            </v-col>
            <!-- 檢查項目 -->
            <v-col cols="12">
              <v-row no-gutter class="label-header">
                <v-col cols="12" sm="4">
                  <dateSelect
                    label="檢查日期"
                    v-model="CheckDay"
                    key="dateStart"
                    :showIcon="formIconShow"
                  />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">管理單位</h3>
                  <v-text-field v-model="DepartName" solo value readonly />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">檢查人員</h3>
                  <v-text-field v-model="Name" solo readonly />
                </v-col>
              </v-row>
              <v-row
                no-gutter
                class="label-header d-none d-sm-flex font-weight-black"
              >
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">檢查項目</h3>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">檢查方法</h3>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">檢查結果</h3>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">備註</h3>
                </v-col>
              </v-row>
              <!-- <v-alert
                dense
                border="top"
                colored-border
                color="teal"
                elevation="4"
                v-for="(item, idx) in itemlist.items1"
                :key="idx"
                class="mb-6"
              >
                <v-row no-gutter>
                  <v-col cols="12" sm="3">{{ item.description }}</v-col>
                  <v-col cols="12" sm="3">
                    <v-select
                      :items="[
                        { text: '動作測試', value: '1' },
                        { text: '目視點檢', value: '2' },
                      ]"
                      v-model="item.method"
                      solo
                    />
                  </v-col>
                  <v-col cols="12" sm="3">
                    <span class="d-sm-none label-header">檢查結果：</span>
                    <v-radio-group
                      dense
                      row
                      v-model="item.result"
                      class="pa-0 ma-0"
                    >
                      <v-radio color="success" label="良好" value="1"></v-radio>
                      <v-radio color="red" label="不良" value="2"></v-radio>
                      <v-radio
                        color="black"
                        label="無此項目"
                        value="3"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-textarea
                      v-model="item.memo"
                      hide-details
                      auto-grow
                      outlined
                      rows="3"
                    />
                  </v-col>
                </v-row>
              </v-alert> -->
              <v-alert
                dense
                border="top"
                colored-border
                color="border-bg-dark-yellow"
                elevation="4"
                v-for="n in 10"
                :key="n"
                class="mb-6"
              >
                <v-row no-gutter>
                  <v-col cols="12" sm="3">{{
                    deatilItemDesc["desc" + n]
                  }}</v-col>
                  <v-col cols="12" sm="3">
                    <v-select
                      :items="[
                        { text: '動作測試', value: '1' },
                        { text: '目視點檢', value: '2' },
                      ]"
                      v-model="detailItem['CheckMethod' + n]"
                      solo
                    />
                  </v-col>
                  <v-col cols="12" sm="3">
                    <span class="d-sm-none label-header">檢查結果：</span>
                    <v-radio-group
                      dense
                      row
                      v-model="detailItem['CheckOption' + n]"
                      class="pa-0 ma-0"
                    >
                      <v-radio color="success" label="良好" value="1"></v-radio>
                      <v-radio color="red" label="不良" value="2"></v-radio>
                      <v-radio
                        color="black"
                        label="無此項目"
                        value="3"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-textarea
                      v-model="detailItem['Memo' + n]"
                      hide-details
                      auto-grow
                      outlined
                      rows="3"
                    />
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
            <!-- 改善建議、改善追蹤 -->
            <v-col cols="12">
              <h3 class="mb-1 label-header">改善建議</h3>
              <v-textarea v-model="Advice" auto-grow outlined rows="4" />
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1 label-header">改善措施</h3>
              <v-textarea v-model="Measures" auto-grow outlined rows="4" />
            </v-col>
            <!-- END 檢查項目 -->
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
            >送出</v-btn
          >
        </v-card-actions>
      </v-card>
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
import {
  fetchFormOrderList,
  fetchFormOrderOne,
  createFormOrder,
  createFormOrder0,
  updateFormOrder,
  deleteFormOrder,
} from "@/apis/formManage/serve";
import UploadOneFileAdd from '@/components/UploadOneFileAdd.vue';
import { formDepartOptions } from "@/assets/js/departOption";
import { Actions } from "@/assets/js/actions";
import { Constrant } from "@/assets/js/constrant";
import dateSelect from "@/components/forManage/dateSelect";
import deptSelect from "@/components/forManage/deptSelect";
class Question {
  constructor(description, method, result, memo) {
    this.description = description;
    this.method = method;
    this.result = result;
    this.memo = memo;
  }
}

export default {
  data() {
    return {
      title: "切割機定期檢查表(三個月)",
      action: Actions.add,
      actions: Actions,
      file: null,
      newText: "檢查表",
      isLoading: false,
      disabled: false,
      formDepartOptions: [
        // 通報單位下拉選單
        { text: "", value: "" },
        ...formDepartOptions,
      ],
      pageOpt: { page: 1 }, // 目前頁數
      //---api---
      DB_Table: "RP022",
      RPFlowNo: "",
      nowTime: "",
      doMan: {
        id: "",
        name: "",
        depart: "",
        checkManName: "",
      },
      ipt2: {},
      defaultIpt: {
        dateStart: "", // 通報日期(起)
        dateEnd: "", // 通報日期(迄)
        case: "",
        eqLoss: "",
        departName: "",
        department: "",
      },
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
          text: "審查狀態",
          value: "CheckStatus",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
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
      itemlist: {
        items1: [
          new Question("1. 防護蓋有否裝設", 1, 1, ""),
          new Question("2. 護目鏡是否配置", 1, 1, ""),
          new Question("3. 機台固定裝置是否穩固", 1, 1, ""),
          new Question("4. 馬達絕緣電阻", 1, 1, ""),
          new Question("5. 電源線有無損傷", 1, 1, ""),
          new Question("6. 外殼接地線是否裝設", 1, 1, ""),
          new Question("7. 磨輪規格是否正確，有無裂痕", 1, 1, ""),
          new Question("8. 磨輪固定情況是否良好", 1, 1, ""),
          new Question("9. 試運轉是否平衡，有無異狀", 1, 1, ""),
          new Question("10. 是否有「使用時禁戴手套」警語", 1, 1, ""),
        ],
      },
      suggest: "", // 改善建議

      // fields for detail page
      Name: "",
      DepartName: "",
      CheckDay: "",
      Advice: "",
      Measures: "",

      // controls for dialog
      ShowDetailDialog: false,
      dialogDel: false, // model off
      dialogNull: false,

      // controls for date picker
      datePickerShowControl: {
        startDate: false,
        endDate: false,
        checkDate: false,
      },

      nameRules: [(v) => !!v || "不可空白"],
      input: {
        dateStart: new Date().toISOString().substr(0, 10), // 通報日期(起)
        dateEnd: new Date().toISOString().substr(0, 10), // 通報日期(迄)
        case: "",
        eqLoss: "",
        departName: "",
      },

      formIconShow: true,
      detailItem: {},
      deatilItemDesc: {
        desc1: "1. 防護蓋有否裝設",
        desc2: "2. 護目鏡是否配置",
        desc3: "3. 機台固定裝置是否穩固",
        desc4: "4. 馬達絕緣電阻",
        desc5: "5. 電源線有無損傷",
        desc6: "6. 外殼接地線是否裝設",
        desc7: "7. 磨輪規格是否正確，有無裂痕",
        desc8: "8. 磨輪固定情況是否良好",
        desc9: "9. 試運轉是否平衡，有無異狀",
        desc10: "10. 是否有「使用時禁戴手套」警語",
      },
      contentType: "",
    };
  },
  components: { Pagination, dateSelect, deptSelect, UploadOneFileAdd }, // 頁碼
  computed: {
    ...mapState("user", {
      userData: (state) => state.userData, // 使用者基本資料
    }),
  },
  created() {
    this.input = { ...this.defaultIpt };
    this.nowTime = getTodayDateString();
    this.doMan.name = this.userData.UserName;
    this.doMan.id = this.userData.UserId;
    this.doMan.depart = this.userData.DeptList[0].DeptDesc;
    this.doMan.departId = this.userData.DeptList[0].DeptId;
  },
  methods: {
    select(file) {
        this.file = file
    },
    initInput() {
      this.Name = this.doMan.name;
      this.DepartName = this.doMan.depart;
      this.CheckDay = getTodayDateString();

      for (var items in this.itemlist) {
        const element = this.itemlist[items];
        element.forEach((item) => {
          item.method = "0";
          item.result = "0";
          item.memo = "";
        });
      }
      this.Advice = "";
      this.Measures = "";
    },
    newOne() {
      this.contentType = "add";
      this.action = Actions.add;
      this.ShowDetailDialog = true; //開啟dialog
      console.log("this.ShowDetailDialog: " + this.ShowDetailDialog);
      this.initInput();
    },
    ...mapActions("system", [
      "chMsgbar", // messageBar
      "chLoadingShow", // 切換 loading 圖顯示
    ]),
    // 清除搜尋內容
    reset() {
      this.input = { ...this.defaultIpt };
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 搜尋
    search() {
      console.log("Search click");
      this.chLoadingShow();
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.userData.UserId, // 操作人id
        KeyName: this.DB_Table, // DB table
        KeyItem: [
          { Column: "StartDayVlaue", Value: this.input.dateStart },
          { Column: "EndDayVlaue", Value: this.input.dateEnd },
          { Column: "DepartCode", Value: this.input.department },
        ],
        QyName: [
          "RPFlowNo",
          "ID",
          "DepartCode",
          "DepartName",
          "Name",
          "CheckDay",
          "CheckStatus",
          "FlowId",
        ],
      })
        .then((res) => {
          let tbBuffer = JSON.parse(res.data.DT);
          let aa = unique(tbBuffer);
          this.tableItems = aa;
        })
        .catch((err) => {
          console.log(err);
          this.chMsgbar({ success: false, msg: Constrant.query.failed });
        })
        .finally(() => {
          console.log("search final");
          this.chLoadingShow();
        });
    },
    // 存
    save() {
      console.log("送出!!");
      this.chLoadingShow();

      var data = {
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.doMan.id, // 操作人id this.doMan.name = this.userData.UserName
        // OperatorID: "16713",  // 操作人id
        KeyName: this.DB_Table, // DB table
        KeyItem: [
          { Column: "CheckDay", Value: this.CheckDay },
          { Column: "Advice", Value: this.Advice },
          { Column: "Measures", Value: this.Measures },
        ],
      };

      // 加入每個Question的詳細內容
      let j = 1;
      for (var items in this.itemlist) {
        const element = this.itemlist[items];
        element.forEach((item) => {
          var obj1 = new Object();
          obj1.Column = "CheckOption" + j;
          obj1.Value = item.result;

          var obj2 = new Object();
          obj2.Column = "CheckMethod" + j;
          obj2.Value = item.method;

          var obj3 = new Object();
          obj3.Column = "Memo" + j;
          obj3.Value = item.memo;

          data.KeyItem.push(obj1);
          data.KeyItem.push(obj2);
          data.KeyItem.push(obj3);
          j++;
        });
      }

      // TODO: 必要欄位檢查
      // if (data.CheckDay == "" || this.AlarmDay == "" || this.Name == "") {
      //   this.dialogNull = true;
      //   return;
      // }

      // 修改
      if (this.action == Actions.edit) {
        // update 要自行增加RPFlowNo欄位
        data.RPFlowNo = this.RPFlowNo;
        console.log(data);
        updateFormOrder(data)
          .then((res) => {
            console.log(res.data.DT);
            this.chMsgbar({ success: true, msg: Constrant.update.success });
          })
          .catch((err) => {
            console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.update.failed });
          })
          .finally(() => {
            this.chLoadingShow();
            this.search();
          });
      } else {
        // 新增
        createFormOrder0(data)
          .then((res) => {
            console.log(res.data.DT);
            this.chMsgbar({ success: true, msg: Constrant.insert.success });
          })
          .catch((err) => {
            console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.insert.failed });
          })
          .finally(() => {
            this.chLoadingShow();
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
      console.log("item: " + item);
      console.log("RPFlowNo: " + item.RPFlowNo);
      this.chLoadingShow();
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
          "CheckOption1",
          "CheckMethod1",
          "Memo1",
          "CheckOption2",
          "CheckMethod2",
          "Memo2",
          "CheckOption3",
          "CheckMethod3",
          "Memo3",
          "CheckOption4",
          "CheckMethod4",
          "Memo4",
          "CheckOption5",
          "CheckMethod5",
          "Memo5",
          "CheckOption6",
          "CheckMethod6",
          "Memo6",
          "CheckOption7",
          "CheckMethod7",
          "Memo7",
          "CheckOption8",
          "CheckMethod8",
          "Memo8",
          "CheckOption9",
          "CheckMethod9",
          "Memo9",
          "CheckOption10",
          "CheckMethod10",
          "Memo10",
          "Advice",
          "Measures",
        ],
      })
        .then((res) => {
          this.initInput();
          //console.log("Raw response data");
          // console.log(res.data.DT);
          let dat = JSON.parse(res.data.DT);
          let data = dat[0];
          //console.log("Parsed JSON object");
          // console.log(data);

          this.Name = data.Name;
          this.CheckDay = data.CheckDay.substr(0, 10);
          this.Advice = data.Advice;
          this.Measures = data.Measures;

          let j = 1;
          for (var items in this.itemlist) {
            const element = this.itemlist[items];
            element.forEach((item) => {
              let key1 = "CheckOption" + j;
              let key2 = "CheckMethod" + j;
              let key3 = "Memo" + j;
              item.result = data[key1];
              item.method = data[key2];
              item.memo = data[key3];
              j++;
            });
          }
          this.RPFlowNo = data.RPFlowNo;
          this.ShowDetailDialog = true;
          this.detailItem = decodeObject(data);
        })
        .catch((err) => {
          console.log(err);
          this.chMsgbar({ success: false, msg: Constrant.query.failed });
        })
        .finally(() => {
          this.chLoadingShow();
        });
    }, //viewPage
    deleteRecord(UserId, DB_Table, RPFlowNo) {
      this.action = Actions.delete;
      this.chLoadingShow();
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
          console.log(err);
          this.chMsgbar({ success: false, msg: Constrant.delete.failed });
        })
        .finally(() => {
          this.chLoadingShow();
          this.ShowDetailDialog = false;
          this.search();
        });
    },
  },
  filters: {
    editStatus: function (value) {
      let rtnStr = "";
      if (value == "add") {
        rtnStr = "新增";
      } else if (value == "edit") {
        rtnStr = "編輯";
      } else if (value == "delete") {
        rtnStr = "刪除";
      } else {
        rtnStr = "";
      }
      return rtnStr;
    },
  },
};
</script>
