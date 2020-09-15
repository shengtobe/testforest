<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">客貨車使用前後保養日報表</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2">
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>查詢日期(起)
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
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>查詢日期(迄)
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
          <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>材料編號
        </h3>
        <v-text-field solo value="" />
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>材料名稱
        </h3>
        <v-text-field solo value="" />
      </v-col>
      <div class="col-sm-4 col-md-8 col-12">
        <v-btn color="green" dark large class="mb-sm-8 mb-md-8">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn
          color="indigo"
          elevation="3"
          dark
          large
          class="ml-4 ml-sm-4 ml-md-4 mb-sm-8 mb-md-8"
          @click="Add = true"
        >
          <v-icon>mdi-plus</v-icon>新增物料
        </v-btn>
      </div>
    </v-row>
    表格資料
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
          </template>

          <!-- 頁碼 -->
          <template v-slot:footer="footer">
            <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <!-- 新增客貨車使用前後保養日報表 modal -->
    <v-dialog v-model="Add" max-width="900px">
      <v-card>
        <v-card-title class="blue white--text px-4 py-1">
          客貨車使用前後保養日報表
          <v-spacer></v-spacer>
          <v-btn dark fab small text @click="close" class="mr-n2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <div class="px-6 py-4">
          <v-row>
            <v-col cols="12">
              <p>1.客、貨車開出前及到達後，應分別就下列各重要項目之狀態及作用施行檢查並予記錄。</p>
              <p>2.特殊軔塊厚度及車輪磨耗接近限度，追蹤事項應予填註。</p>
              <p>3.本保養表應將檢車過程發現問題事項詳以填註。</p>
            </v-col>
            <!-- 檢查項目 -->
            <v-col cols="12">
              <v-row no-gutter class="indigo--text">
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>填寫日期
                  </h3>
                  <v-menu
                    v-model="add"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model.trim="z" solo v-on="on" />
                    </template>
                    <v-date-picker color="purple" v-model="z" @input="add = false" locale="zh-tw" />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>駕駛員
                  </h3>
                  <v-text-field solo value="王大明" />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>機車編號
                  </h3>
                  <v-text-field solo value="" />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>車次
                  </h3>
                  <v-text-field solo value="" />
                </v-col>
              </v-row>

              <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
                <v-expansion-panel>
                  <v-expansion-panel-header>存放數量</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">新枕木</h3>
                        <v-text-field solo v-model="items1.qq" />
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">舊枕木</h3>
                        <v-text-field solo v-model="items1.ww" />
                      </v-col>
                       <v-col cols="12" sm="3">
                        <h3 class="mb-1">新鋼軌</h3>
                        <v-text-field solo v-model="items1.ee" />
                      </v-col>
                       <v-col cols="12" sm="3">
                        <h3 class="mb-1">舊鋼軌</h3>
                        <v-text-field solo v-model="items1.rr" />
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              
            </v-col>
            <!-- END 檢查項目 -->
            <!-- 改善建議、改善追蹤 -->
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">追蹤事項</h3>
              <v-textarea auto-grow outlined rows="4" />
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">問題事項</h3>
              <v-textarea auto-grow outlined rows="4" />
            </v-col>
          </v-row>
        </div>

        <!-- <v-card-actions class="px-5 pb-5">
          <v-spacer></v-spacer>
          <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
          <v-btn color="success" elevation="4" :loading="isLoading" @click="save">送出</v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Pagination from "@/components/Pagination.vue";

export default {
  data() {
    return {
      panel: [0, 1, 2],
      disabled: false,
      readonly: false,
      a: "",
      ass: "",
      aff: "",
      add: "",
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
          text: "上次填寫日期",
          value: "a1",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "材料編號",
          value: "a2",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "材料名稱",
          value: "a3",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "存放地點",
          value: "a4",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "填寫人",
          value: "a5",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "審查狀態",
          value: "a6",
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
          a1: "2020-08-10",
          a2: "001",
          a3: "新枕木",
          a4: "竹崎",
          a5: "王大明",
          a6: "已審查"
        },
        {
          a0: "2",
          a1: "2020-08-11",
          a2: "002",
          a3: "舊枕木",
          a4: "竹崎",
          a5: "王大明",
          a6: "已審查"
        },
        {
          a0: "3",
          a1: "2020-08-12",
          a2: "003",
          a3: "舊鋼軌",
          a4: "竹崎",
          a5: "王大明",
          a6: "已審查"
        },
        {
          a0: "4",
          a1: "2020-08-13",
          a2: "004",
          a3: "新鋼軌",
          a4: "竹崎",
          a5: "王大明",
          a6: "已審查"
        },
      ],
      ipt: {
        department: "",
        name: JSON.parse(localStorage.getItem("user")).name,
        date: new Date().toISOString().substr(0, 10),
        items: [
          { status: "1", note: "" },
          { status: "1", note: "" },
          { status: "1", note: "" },
          { status: "1", note: "" },
          { status: "1", note: "" },
          { status: "1", note: "" },
          { status: "1", note: "" },
          { status: "1", note: "" },
          { status: "1", note: "" },
          { status: "1", note: "" },
          { status: "1", note: "" },
          { status: "1", note: "" },
          { status: "1", note: "" },
          { status: "1", note: "" },
          { status: "1", note: "" },
          { status: "1", note: "" },
        ],
      },
      items1: [{ qq: "", ww: "", ee: "", rr: "" }],
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
