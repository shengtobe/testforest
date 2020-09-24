<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">心理健康量表</h2>
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
          <v-icon>mdi-plus</v-icon>新增量表
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
          新增心理健康量表
          <v-spacer></v-spacer>
          <v-btn dark fab small text @click="close" class="mr-n2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <div class="px-6 py-4">
          <v-row>
            <!-- <v-col cols="12">
              <p>1.依職業安全衛生法第23條及職業安全衛生管理辦法第50條規定辦理。</p>
              <p>2.缺點由使用單位自行改善，不克者委請設備商修護。</p>
            </v-col> -->
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
                <v-row no-gutter >
                  <v-col cols="12" sm="4">{{ item.question }}</v-col>
                  <v-col cols="12" sm="7" style="white-space:pre-wrap"  >
                    <span class="d-sm-none error--text">回答：</span>
                    <v-radio-group dense row v-model="ipt.items[idx].status" class="pa-0 ma-0" >
                      <v-radio color="success" label="沒有或極少(每週一天以下)" value="0"></v-radio>
                      <v-radio color="orange" label="有時(1~2天/週)" value="1"></v-radio>
                      <v-radio color="orange" label="時常 (3~4天/週)" value="2"></v-radio>
                      <v-radio color="orange" label="常常/總是(5~7天/週)" value="3"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
            <!-- 改善建議、改善追蹤 -->
            <v-col cols="12" sm="4">
              <v-text-field v-model="PersonalFatigueTotal">
                <span slot="prepend">分數:</span>
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">同意人簽名</h3>
              <v-textarea auto-grow outlined rows="1" v-model.trim="ipt.suggest"></v-textarea>
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
      ss: "",
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
          { status: "-1", note: "" },
          { status: "-1", note: "" },
          { status: "-1", note: "" },
          { status: "-1", note: "" },
          { status: "-1", note: "" },
          { status: "-1", note: "" },
          { status: "-1", note: "" },
          { status: "-1", note: "" },
          { status: "-1", note: "" },
          { status: "-1", note: "" },
          { status: "-1", note: "" },
          { status: "-1", note: "" },
          { status: "-1", note: "" },
          { status: "-1", note: "" },
          { status: "-1", note: "" },
          { status: "-1", note: "" },
          { status: "-1", note: "" },
          { status: "-1", note: "" },
        ],
      },
      items: [
        { question: "1. 我常常覺得想哭" },
        { question: "2. 我覺得心情不好" },
        { question: "3. 我覺得比以前容易發脾氣" },
        { question: "4. 我睡不好" },
        { question: "5. 我覺得不想吃東西" },
        { question: "6. 我覺得胸口悶悶的" },
        { question: "7. 我覺得不輕鬆、不舒服" },
        { question: "8. 我覺得身體疲勞虛弱無力" },
        { question: "9. 我覺得很煩" },
        { question: "10. 我覺得記憶力不好" },
        { question: "11. 我覺得做事時無法專心" },
        { question: "12. 我覺得想事情或做事時比平常要緩慢" },
        { question: "13. 我覺得比以前沒信心" },
        { question: "14. 我覺得比較會往壞處想" },
        { question: "15. 我覺得想不開，甚至想死" },
        { question: "16. 我覺得對什麼事都失去興趣" },
        { question: "17. 我覺得身體不舒服" },
        { question: "18. 我覺得自己很沒用" },
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
      if(total < 0) total = 0;
      return total
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
    Add() {
      alert("123");
    },
  },
};
</script>
<style>
.v-input--radio-group__input {
  display: block;
}
</style>