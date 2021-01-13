<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2">
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
            <v-text-field v-model.trim="ipt.dateStart" solo v-on="on" readonly></v-text-field>
          </template>
          <v-date-picker
            color="purple"
            v-model="ipt.dateStart"
            @input="dateMenuShow.start = false"
            locale="zh-tw"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>保養日期(迄)
        </h3>
        <v-menu
          v-model="dateMemuShow.end"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="ipt.dateEnd" solo v-on="on" readonly></v-text-field>
          </template>
          <v-date-picker
            color="purple"
            v-model="ipt.dateEnd"
            @input="dateMemuShow.end = false"
            locale="zh-tw"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>選擇車號
        </h3>
        <v-select
          v-model="ipt.case"
          :items="[{ text: 'A0001', value: 'A' }, { text: 'A0002', value: 'B' }, { text: 'A0003', value: 'C' }, { text: 'A0004', value: 'D' }, { text: 'A0005', value: 'E' }]"
          solo
        />
      </v-col>
      <div class="col-sm-4 col-md-8 col-12">
        <v-btn color="green" dark large class="col-4 col-md-2 mr-3" @click="disabled = false">
          <v-icon>mdi-magnify</v-icon>查詢
        </v-btn>
      </div>
      <!-- 車歷卡資料 -->
      <v-col cols="12" sm="12" md="12">
        <v-expansion-panels :disabled="disabled" focusable>
          <v-expansion-panel>
            <v-expansion-panel-header>車歷卡資料</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="12" sm="4" md="3">
                  <h3 class="mb-1">車號</h3>
                  <v-text-field v-model.trim="ipt.eqLoss" solo></v-text-field>
                  <h3 class="mb-1">型式</h3>
                  <v-text-field v-model.trim="ipt.eqLoss" solo></v-text-field>
                  <h3 class="mb-1">皮重</h3>
                  <v-text-field v-model.trim="ipt.eqLoss" solo></v-text-field>
                  <h3 class="mb-1">載重</h3>
                  <v-text-field v-model.trim="ipt.eqLoss" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                  <h3 class="mb-1">廠牌</h3>
                  <v-text-field v-model.trim="ipt.eqLoss" solo></v-text-field>
                  <h3 class="mb-1">年份</h3>
                  <v-text-field v-model.trim="ipt.eqLoss" solo></v-text-field>
                  <h3 class="mb-1">電源</h3>
                  <v-text-field v-model.trim="ipt.eqLoss" solo></v-text-field>
                  <h3 class="mb-1">電瓶規格</h3>
                  <v-text-field v-model.trim="ipt.eqLoss" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                  <h3 class="mb-1">空調機編號</h3>
                  <v-text-field v-model.trim="ipt.eqLoss" solo></v-text-field>
                  <h3 class="mb-1">客室設備</h3>
                  <v-text-field v-model.trim="ipt.eqLoss" solo></v-text-field>
                  <h3 class="mb-1">窗</h3>
                  <v-text-field v-model.trim="ipt.eqLoss" solo></v-text-field>
                  <h3 class="mb-1">門</h3>
                  <v-text-field v-model.trim="ipt.eqLoss" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                  <h3 class="mb-1">車輪直徑</h3>
                  <v-text-field v-model.trim="ipt.eqLoss" solo></v-text-field>
                  <h3 class="mb-1">轉向架中心距離</h3>
                  <v-text-field v-model.trim="ipt.eqLoss" solo></v-text-field>
                  <h3 class="mb-1">軸距</h3>
                  <v-text-field v-model.trim="ipt.eqLoss" solo></v-text-field>
                  <h3 class="mb-1">連結器中心高度</h3>
                  <v-text-field v-model.trim="ipt.eqLoss" solo></v-text-field>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <div class="col-sm-4 col-md-8 col-12">
        <v-btn
          color="indigo"
          elevation="3"
          dark
          large
          class="col-4 col-md-4 mr-3"
          @click="dialogShowAdd = true"
        >
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </div>
      <!-- 動力車保養紀錄 -->
      <v-col cols="12" sm="12" md="12">
        <v-expansion-panels :disabled="disabled" focusable>
          <v-expansion-panel>
            <v-expansion-panel-header>動力車保養紀錄</v-expansion-panel-header>
            <v-expansion-panel-content>
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
                    <template v-slot:item.shop="{ item }">
                      <v-btn
                        title="編輯"
                        class="mr-2"
                        small
                        dark
                        fab
                        color="info darken-1"
                        @click="dialogShowEdit = true"
                      >
                        <v-icon dark>mdi-pen</v-icon>
                      </v-btn>
                      <v-btn title="刪除" small dark fab color="red" @click="dialogDel = true">
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
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <!-- 新增保養資料 modal -->
      <v-dialog v-model="dialogShowAdd" max-width="600px">
        <v-card>
          <!-- 標題 -->
          <v-card-title class="blue white--text px-4 py-1">
            新增{{ title }}
            <v-spacer />
            <v-btn dark fab small text @click="close" class="mr-n2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <!-- 內容 -->
          <div class="px-6 py-4">
            <v-row>
              <!-- 保養日期 -->
              <v-col cols="8" sm="4">
                <h3 class="mb-1">保養日期</h3>
                <v-menu
                  v-model="dialogDateMenuShow.enters"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field hide-details v-on="on" solo />
                  </template>
                  <v-date-picker
                    color="purple"
                    v-model="addItem.enterDate"
                    @input="dialogDateMenuShow.enters = false"
                    locale="zh-tw"
                  />
                </v-menu>
              </v-col>
              <!-- 出廠日期 -->
              <v-col cols="8" sm="4">
                <h3 class="mb-1">出廠日期</h3>
                <v-menu
                  v-model="dialogDateMenuShow.enter"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field hide-details v-model="addItem.enterDates" v-on="on" solo />
                  </template>
                  <v-date-picker
                    color="purple"
                    v-model="addItem.enterDates"
                    @input="dialogDateMenuShow.enter = false"
                    locale="zh-tw"
                  />
                </v-menu>
              </v-col>
              <!-- 累計公里數 -->
              <v-col cols="8" sm="4">
                <h3 class="mb-1">累計公里數</h3>
                <v-text-field v-model="addItem.Kilometer" :rules="nameRules" required solo />
              </v-col>
              <!-- 保養人 -->
              <v-col cols="8" sm="4">
                <h3 class="mb-1">保養人</h3>
                <v-text-field v-model="addItem.user" solo />
              </v-col>
              <!-- 保養內容 -->
              <v-col cols="12">
                <h3 class="mb-1">保養內容</h3>
                <v-textarea
                  hide-details
                  auto-grow
                  outlined
                  rows="6"
                  v-model.trim="addItem.content"
                />
              </v-col>
            </v-row>
          </div>
          <!-- 輸出/取消 -->
          <v-card-actions class="px-5 pb-5">
            <v-spacer></v-spacer>
            <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
            <v-btn color="success" elevation="4" :loading="isLoading" @click="save">送出</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { evtTypes, locationOpts } from "@/assets/js/smisData";
import Pagination from "@/components/Pagination.vue";

export default {
  data: () => ({
    title: "車歷卡",
    newText: "車歷卡",
    isLoading: false,
    disabled: false,
    ipt: {
      dateStart: new Date().toISOString().substr(0, 10), // 通報日期(起)
      dateEnd: new Date().toISOString().substr(0, 10), // 通報日期(迄)
      case: "",
      eqLoss: ""
    },
    dateMemuShow: {
      // 日曆是否顯示
      start: false,
      end: false
    },
    evtTypeOpts: evtTypes,
    locationOpts: locationOpts,
    dateMenuShow: false, // 日曆是否顯示
    dialogDateMenuShow: {
      // dialog 日期 menu 是否顯示
      enter: false,
      enters: false,
      out: false
    },
    editedItem: {
      Kilometer: 12044.3,
      enterDate: "2020-08-10",
      content: "更換引擎機油", // 維修項目
      startday: "2020-08-10",
      user: "王大明"
    },
    addItem: {
      Kilometer: null,
      enterDate: "",
      content: "", // 維修項目
      enterDates: "",
      user: ""
    },
    defaultItem: {
      Kilometer: 0,
      enterDate: "2020-08-10",
      content: "", // 維修項目
      user: ""
    },
    nameRules: [
      v => !!v || "公里數必須填寫",
      v => v.length > 0 || "公里數必須大於0"
    ],
    dialogForm: {},
    mainLocation: "", // 所選的地點
    OLocation: "", // 其他地點
    dialogShowAdd: false, // model off
    dialogShowEdit: false, // model off
    dialogDel: false, // model off
    dialogm1: "2020-08-01",
    aa: "",
    bb: "",
    cc: "",
    disabled: true,
    tableItems: [
      {
        date: "2020-08-01",
        kilometer: "12044.3",
        engine_oil: "V",
        diesel_oil: "V",
        water_pump: "V",
        name: "王大明",
        startday: "2020/08/10",
        note: "更換引擎機油"
      }
    ], // 表格資料
    pageOpt: { page: 1 }, // 目前頁數
    headers: [
      // 表格顯示的欄位
      {
        text: "保養日期",
        value: "date",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "累計公里數",
        value: "kilometer",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "保養內容",
        value: "note",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "出廠日期",
        value: "startday",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "保養人",
        value: "name",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "功能",
        value: "shop",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      }
    ]
  }),
  components: { Pagination }, // 頁碼

  methods: {
    // 更新資料
    update() {
      this.$emit("chLocation", {});
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 搜尋
    search() {},
    // 存
    save() {},
    // 關閉 dialog
    close() {
      this.dialogShowAdd = false;
      this.dialogShowEdit = false;
      this.dialogDel = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.addItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    }
  }
};
</script>
