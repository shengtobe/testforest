<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2">
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
          key="dateEnd"
          :showIcon="formIconShow"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>管理單位
        </h3>
        <v-select :items="formDepartOptions" v-model="input.department" solo />
      </v-col>
      <v-col cols="12" sm="3" md="3"></v-col>

      <v-col cols="12" sm="3" md="3">
        <v-form ref="uploadform">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-file</v-icon>檔案上傳
          </h3>
          <v-text-field solo placeholder="點此選擇檔案" />
        </v-form>
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn color="pink" dark large class="mb-sm-8 mb-md-8">
          <v-icon class="mr-1">mdi-cloud-upload</v-icon>上傳
        </v-btn>
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
      <dialogDelete
        :id="doMan.id"
        :DB_Table="DB_Table"
        :RPFlowNo="RPFlowNo"
        :key="DynamicKey"
        @search="search"
        @close="close"
        @cancel="closeDialogDel"
      />
    </v-dialog>
    <!-- 必填欄位空白提醒視窗 -->
    <v-dialog v-model="dialogNull" persistent max-width="290">
      <v-card>
        <v-card-title class="red white--text px-4 py-1 headline"
          >請填妥必要欄位</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="dialogNull = false">確定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 新增自動檢點表 modal -->
    <v-dialog v-model="ShowDetailDialog" max-width="900px">
      <v-card>
        <v-card-title class="blue white--text px-4 py-1">
          {{ action }}{{ title }}
          <v-spacer></v-spacer>
          <v-btn dark fab small text @click="close" class="mr-n2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <div class="px-6 py-4">
          <v-row>
            <v-col cols="12">
              <p>
                1.依職業安全衛生法第23條及職業安全衛生管理辦法第28條規定辦理。
              </p>
              <p>
                2.檢查結果請依情況選擇正常、異常、無此項目。並應做檢查發現危害、分析危害因素，評估危害風險，依檢查風險評估結果採取改善措施、檢討改善措施之合宜性。
              </p>
              <p>3.評估危害風險。</p>
            </v-col>
            <!-- 檢查項目 -->
            <v-col cols="12">
              <v-row no-gutter class="indigo--text">
                <v-col cols="12" sm="4">
                  <dateSelect
                    label="檢查日期(迄)"
                    v-model="CheckDay"
                    key="CheckDay"
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
                class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
              >
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">檢查項目</h3>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">檢查結果</h3>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">備註</h3>
                </v-col>
              </v-row>
              <v-alert
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
                  <v-col cols="12" sm="4">{{ item.description }}</v-col>
                  <v-col cols="12" sm="4">
                    <span class="d-sm-none error--text">檢查結果：</span>
                    <v-radio-group
                      dense
                      row
                      v-model="item.option"
                      class="pa-0 ma-0"
                    >
                      <v-radio color="success" label="正常" value="1"></v-radio>
                      <v-radio color="red" label="異常" value="2"></v-radio>
                      <v-radio
                        color="black"
                        label="無此項目"
                        value="0"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-textarea
                      v-model="item.memo"
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
              <h3 class="mb-1 indigo--text">檢查發現危害、分析危害因素</h3>
              <v-textarea v-model="Memo_10" auto-grow outlined rows="4" />
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">
                評估危害風險(嚴重性及可能性分析)
              </h3>
              <v-textarea v-model="Memo_11" auto-grow outlined rows="4" />
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">評估結果改善措施</h3>
              <v-textarea v-model="Memo_12" auto-grow outlined rows="4" />
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">檢討改善措施之合宜性</h3>
              <v-textarea v-model="Memo_13" auto-grow outlined rows="4" />
            </v-col>
            <!-- END 檢查項目 -->
          </v-row>
        </div>

        <v-card-actions class="px-5 pb-5">
          <v-btn
            v-if="action != actions.add"
            elevation="4"
            color="red"
            class="mr-2 white--text"
            @click="dialogDel = true"
            >刪除</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn class="mr-2" elevation="4" @click="ShowDetailDialog = false"
            >取消</v-btn
          >
          <v-btn
            color="success"
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
import { formDepartOptions } from "@/assets/js/departOption";
import { Actions } from "@/assets/js/actions";
import { Constrant } from "@/assets/js/constrant";
import dateSelect from "@/components/forManage/dateSelect";
import dialogDelete from "@/components/forManage/dialogDelete";
import ToolBar from "@/components/forManage/toolbar";

class Question {
  constructor(description, option, memo) {
    this.description = description;
    this.option = option;
    this.memo = memo;
  }
}

export default {
  data() {
    return {
      title: "乙炔熔接裝置定期檢查表(年)",
      action: Actions.add,
      actions: Actions,
      newText: "檢查表",
      isLoading: false,
      disabled: false,
      formDepartOptions: [
        // 通報單位下拉選單
        { text: "不限", value: "" },
        ...formDepartOptions,
      ],
      pageOpt: { page: 1 }, // 目前頁數
      //---api---
      DB_Table: "RP055",
      RPFlowNo: "",
      nowTime: "",
      doMan: {
        id: "",
        name: "",
        depart: "",
        checkManName: "",
      },
      defaultIpt: {
        dateStart: "", // 通報日期(起)
        dateEnd: "", // 通報日期(迄)
        case: "",
        eqLoss: "",
        departName: "",
      },
      headers: [
        // 表格顯示的欄位 DepartCode ID Name
        {
          text: "項次",
          value: "ItemNo",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "保養日期",
          value: "CheckDay",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "審查狀態",
          value: "CheckStatus",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "填寫人",
          value: "Name",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "保養單位",
          value: "DepartName",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "功能",
          value: "content",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
      ],
      tableItems: [],
      //------
      //------
      itemlist: {
        items1: [
          new Question("1. 乙炔容器是否無損傷、變形、腐蝕", 0, ""),
          new Question("2. 氧氣容器是否無損傷、變形、腐蝕", 0, ""),
          new Question("3. 乙炔壓力調節器是否正常", 0, ""),
          new Question("4. 氧氣壓力調節器是否正常", 0, ""),
          new Question("5. 手把及火嘴性能是否正常", 0, ""),
          new Question("6. 乙炔軟氣管是否正常", 0, ""),
          new Question("7. 氧氣軟氣管是否正常", 0, ""),
          new Question("8. 各處接頭是否牢固", 0, ""),
          new Question("9. 其他", 0, ""),
        ],
      },
      suggest: "", // 改善建議
      // fields for detail page
      Name: "",
      DepartName: "",
      CheckDay: "",
      Memo_10: "",
      Memo_11: "",
      Memo_12: "",
      Memo_13: "",

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
    };
  },
  components: { Pagination, dateSelect, dialogDelete, ToolBar }, // 頁碼
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
    initInput() {
      this.Name = this.doMan.name;
      this.DepartName = this.doMan.depart;
      this.CheckDay = getTodayDateString();

      for (var items in this.itemlist) {
        const element = this.itemlist[items];
        element.forEach((item) => {
          item.option = 0;
          item.memo = "";
        });
      }

      this.Memo_10 = "";
      this.Memo_11 = "";
      this.Memo_12 = "";
      this.Memo_13 = "";
    },
    newOne() {
      this.action = Actions.add;
      this.ShowDetailDialog = true;
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
          { Column: "Memo_10", Value: this.Memo_10 },
          { Column: "Memo_11", Value: this.Memo_11 },
          { Column: "Memo_12", Value: this.Memo_12 },
          { Column: "Memo_13", Value: this.Memo_13 },
        ],
      };

      // 加入每個Question的詳細內容
      let j = 1;
      for (var items in this.itemlist) {
        const element = this.itemlist[items];
        element.forEach((item) => {
          var obj1 = new Object();
          obj1.Column = "CheckOption" + j;
          obj1.Value = item.option;
          var obj2 = new Object();
          obj2.Column = "Memo_" + j;
          obj2.Value = item.memo;

          data.KeyItem.push(obj1);
          data.KeyItem.push(obj2);
          j++;
        });
      }

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
    // 關閉刪除確認dialod
    closeDialogDel() {
      this.dialogDel = false;
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
          "Memo_10",
          "Memo_11",
          "Memo_12",
          "Memo_13",
        ],
      })
        .then((res) => {
          this.initInput();
          let dat = JSON.parse(res.data.DT);
          let data = dat[0];

          this.Name = data.Name;
          this.CheckDay = data.CheckDay.substr(0, 10);
          this.Memo_10 = data.Memo_10;
          this.Memo_11 = data.Memo_11;
          this.Memo_12 = data.Memo_12;
          this.Memo_13 = data.Memo_13;

          let j = 1;
          for (var items in this.itemlist) {
            const element = this.itemlist[items];
            element.forEach((item) => {
              let key1 = "CheckOption" + j;
              item.option = data[key1];

              let key2 = "Memo_" + j;
              item.memo = data[key2];
              j++;
            });
          }
          this.RPFlowNo = data.RPFlowNo;
          this.ShowDetailDialog = true;
        })
        .catch((err) => {
          console.log(err);
          this.chMsgbar({ success: false, msg: Constrant.query.failed });
        })
        .finally(() => {
          this.chLoadingShow();
        });
    }, //viewPage
  },
};
</script>
