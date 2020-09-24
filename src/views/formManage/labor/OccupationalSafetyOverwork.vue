<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">職業安全衛生過勞量表</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2">
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>填表日期(起)
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
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>填表日期(迄)
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
      <div class="col-sm-4 col-md-8 col-12">
        <v-btn color="green" dark large class="col-4 col-md-2 mr-3">
          <v-icon>mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn
          color="indigo"
          elevation="3"
          dark
          large
          @click="Add = true"
        >
          <v-icon>mdi-plus</v-icon>新增表單
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
    <v-dialog v-model="Add" max-width="680px">
      <v-card>
        <v-card-title class="blue white--text px-4 py-1">
          新增鍋爐每日作業前自動檢點表
          <v-spacer></v-spacer>
          <v-btn dark fab small text @click="close" class="mr-n2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <div class="px-6 py-4">
          <v-row>
            
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
                  <v-text-field solo value />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">檢查人員</h3>
                  <v-text-field solo value />
                </v-col>
              </v-row>
              <v-col cols="13" sm="12">
                <v-toolbar color="teal lighten-2" dark>
                  <v-spacer />
                  <v-toolbar-title>一、個人疲勞</v-toolbar-title>
                  <v-spacer />
                </v-toolbar>
              </v-col>
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
                <v-toolbar color="teal lighten-2" dark>
                  <v-spacer />
                  <v-toolbar-title>二、工作疲勞</v-toolbar-title>
                  <v-spacer />
                </v-toolbar>
              </v-col>
              <v-alert
                dense
                border="top"
                colored-border
                color="teal"
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
              <v-text-field v-model="PersonalFatigueTotal" readonly>
                <span slot="prepend">個人疲勞分數:</span>
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="count2" readonly>
                <span slot="prepend">工作疲勞分數:</span>
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <b >※您是否同意檢附量表分數，以作為後續健康風險評估之用途?</b>
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">同意人</h3>
              <v-textarea auto-grow outlined rows="1" v-model.trim="ipt.suggest"></v-textarea>
            </v-col>
            <v-col cols="12">
              <p >本職場超時工作(過勞)預防計畫編撰參考資料源自勞動部勞工研究所之過勞工作指引及台北市衛生局職場心理健康</p>
            </v-col>
            <v-col cols="13" sm="12">
                <v-toolbar color="teal lighten-2" dark>
                  <v-spacer />
                  <v-toolbar-title>分數解釋</v-toolbar-title>
                  <v-spacer />
                </v-toolbar>
              </v-col>
            <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">個人疲勞</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
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
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in itemSc1"
                      :key="idx"
                      class="mb-6 mt-4">
                      <v-row no-gutter>
                        <v-col cols="12" sm="3">{{ item.question }}</v-col>
                        <v-col cols="12" sm="2">{{ item.checkContent }}</v-col>
                        <v-col cols="12" sm="7">{{ item.checkMethod }}</v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">工作疲勞</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
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
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in itemSc2"
                      :key="idx"
                      class="mb-6 mt-4">
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
      // ss: 0,
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
        name: JSON.parse(localStorage.getItem("user")).name,
        date: new Date().toISOString().substr(0, 10),
        items: [
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
        ],
        itemSc1:[
          { status: 1, note: "" },
          { status: 1, note: "" },
          { status: 1, note: "" },
        ],
        itemSc2:[
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
        { question: "1.50分以下", checkContent: "輕微",checkMethod: "您的過負荷程度輕微，您並不常感到疲勞、體力透支、精疲力竭、或者虛弱好像快生病的樣子。" },
        { question: "2.50－70分", checkContent: "中度",checkMethod: "你的個人過負荷程度中等。您有時候感到疲勞、體力透支、精疲力竭、或者虛弱好像快生病的樣子。建議您找出生活的壓力源，進一步的調適自己，增加放鬆與休息的時間。" },
        { question: "3.70分以上", checkContent: "嚴重",checkMethod: "您的個人過負荷程度嚴重。您時常感到疲勞、體力透支、精疲力竭、或者虛弱好像快生病的樣子。建議您適度的改變生活方式，增加運動與休閒時間之外，您還需要進一步尋找專業人員諮詢。" },
      ],
      itemSc2: [
       { question: "1.45分以下", checkContent: "輕微",checkMethod: "您的工作相關過負荷程度輕微，您的工作並不會讓您感覺很沒力、心力交瘁、很挫折。" },
       { question: "2.45－60分", checkContent: "中度",checkMethod: "您的工作相關過負荷程度中等，您有時對工作感覺沒力，沒有興趣，有點挫折。" },
       { question: "3.60分以上", checkContent: "嚴重",checkMethod: "您的工作相關過負荷程度嚴重，您已經快被工作累垮了，您感覺心力交瘁，感覺挫折，而且上班時都很難熬，此外您可能缺少休閒時間，沒有時間陪伴家人朋友。建議您適度的改變生活方式，增加運動與休閒時間之外，您還需要進一步尋找專業人員諮詢。" },
      ],
      suggest: "", // 改善建議
    };
  },
  components: { Pagination }, // 頁碼
  computed: {
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
      return roundDecimal(total, 1)
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
      return roundDecimal(total, 1)
    },
  },
  methods: {
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 搜尋
    search() {},
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
    Addss() {
      this.ss = 0;
      for (let index = 0; index < this.ipt.items.length; index++) {
        console.log(this.ipt.items[index].status);
        this.ss += Number(this.ipt.items[index].status);
      }
    },
  },
};
</script>
<style>
.v-input__prepend-outer {
  width: 79%;
}
</style>