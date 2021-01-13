<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2">
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>檢查日期(起)
        </h3>
        <v-menu
          v-model="a"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="z" solo v-on="on" readonly></v-text-field>
          </template>
          <v-date-picker color="purple" v-model="z" @input="a = false" locale="zh-tw"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>檢查日期(迄)
        </h3>
        <v-menu
          v-model="q"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="df" solo v-on="on" readonly></v-text-field>
          </template>
          <v-date-picker color="purple" v-model="df" @input="q = false" locale="zh-tw"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>管理單位
        </h3>
        <v-select
          :items="[{ text: '資訊科', value: 'A' }, { text: '資訊科2', value: 'B' }, { text: '資訊科3', value: 'C' }, { text: '資訊科4', value: 'D' }, { text: 'A0005', value: 'E' }]"
          solo
        />
      </v-col>
      <div class="col-sm-4 col-md-8 col-12">
        <v-btn color="green" dark large class="col-4 col-md-2 mr-3" @click="disabled = false">
          <v-icon>mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn
          color="indigo"
          elevation="3"
          dark
          large
          class="col-4 col-md-3 mr-3"
          to="/form-manage/curing/level-crossing-function-checklist-add"
        >
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </div>
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
        >
          <template v-slot:no-data>
            <span class="red--text subtitle-1">沒有資料</span>
          </template>

          <template v-slot:loading>
            <span class="red--text subtitle-1">資料讀取中...</span>
          </template>

          <!-- headers 的 content 欄位 (檢視內容) -->
          <template v-slot:item.shop>
            <v-btn
              title="詳細資料"
              class="mr-2"
              small
              dark
              fab
              color="info darken-1"
              @click="Add = true"
            >
              <v-icon dark>mdi-magnify</v-icon>
            </v-btn>
            <!-- <v-btn title="刪除" small dark fab color="red" @click="dialog3 = true">
              <v-icon dark>mdi-delete</v-icon>
            </v-btn>-->
          </template>

          <!-- 頁碼 -->
          <template v-slot:footer="footer">
            <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <!-- 新增自動檢點表 modal -->
    <v-dialog v-model="Add" max-width="960px">
      <v-card>
        <v-card-title class="blue white--text px-4 py-1">
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
              <v-row no-gutter class="indigo--text">
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
              <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
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
                color="teal"
                elevation="4"
                v-for="(item, idx) in items"
                :key="idx"
                class="mb-6"
              >
                <v-row no-gutter>
                  <v-col cols="12" sm="1">{{ item.question }}</v-col>
                  <v-col cols="12" sm="1">
                    <span class="d-sm-none error--text">檢查結果：</span>
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
              <h3 class="mb-1 indigo--text">改善措施</h3>
              <v-textarea auto-grow outlined rows="4" v-model.trim="ipt.suggest"></v-textarea>
            </v-col>
            <!-- END 檢查項目 -->
          </v-row>
        </div>

        <v-card-actions class="px-5 pb-5">
          <v-spacer></v-spacer>
          <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
          <v-btn color="success" elevation="4" :loading="isLoading" @click="save">送出</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Pagination from "@/components/Pagination.vue";

export default {
  data() {
    return {
      title: "平交道功能檢查紀錄表",
      newText: "紀錄表",
      isLoading: false,
      disabled: false,
      a: "",
      ass: "",
      z: "",
      zs: "",
      q: "",
      df: "",
      s: "",
      qz: "",
      wx: "",
      pp: "",
      oo: "",
      ii: "",
      uu: "",
      yy: "",
      Add: false,
      dialog3: false,
      pageOpt: { page: 1 }, // 目前頁數
      headers: [
        // 表格顯示的欄位
        {
          text: "項次",
          value: "a0",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "檢查日期",
          value: "aa",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "審查狀態",
          value: "cc",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "填寫人",
          value: "dd",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "功能",
          value: "shop",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
      ],
      tableItems: [
        {
          a0: "1",
          aa: "2020-08-01",
          cc: "已審查",
          dd: "王大明",
        },
        {
          a0: "2",
          aa: "2020-08-10",
          cc: "審查中",
          dd: "王大明",
        },
      ],
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
  components: { Pagination }, // 頁碼
  methods: {
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
  },
};
</script>
