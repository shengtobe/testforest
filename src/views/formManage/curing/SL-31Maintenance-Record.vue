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
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>保養日期(迄)
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
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </div>
    </v-row>
    <v-dialog v-model="dialog3" persistent max-width="290">
      <v-card>
        <v-card-title class="red white--text px-4 py-1 headline">確認是否刪除?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="close">取消</v-btn>
          <v-btn color="success">刪除</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
          <template v-slot:item.shop="{ item }">
            <v-btn title="編輯" class="mr-2" small dark fab color="info darken-1" @click="Add = true">
              <v-icon dark>mdi-pen</v-icon>
            </v-btn>
            <v-btn title="刪除" small dark fab color="red" @click="dialog3 = true">
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
    <!-- 新增SL-31維修資料 modal -->
    <v-dialog v-model="Add" max-width="600px">
      <v-card>
        <v-card-title class="blue white--text px-4 py-1">
<<<<<<< HEAD
          新增SL-31進廠維修紀錄
=======
          新增{{ tile }}}
>>>>>>> develop
          <v-spacer></v-spacer>
          <v-btn dark fab small text @click="close" class="mr-n2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <div class="px-6 py-4">
          <v-row>
            <!-- 保養日期 -->
            <v-col cols="8" sm="4">
              <h3 class="mb-1">保養日期</h3>
              <v-menu
                v-model="qz"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field hide-details v-model="wx" v-on="on" solo />
                </template>
                <v-date-picker color="purple" v-model="wx" @input="qz = false" locale="zh-tw" />
              </v-menu>
            </v-col>
            <!-- 地點 -->
            <v-col cols="8" sm="4">
              <h3 class="mb-1">累計公里數</h3>
              <v-text-field v-model="pp" :rules="nameRules" required solo />
            </v-col>
            <!-- 填寫人 -->
            <v-col cols="8" sm="4">
              <h3 class="mb-1">填寫人</h3>
              <v-text-field v-model="yy" solo />
            </v-col>
            <!-- 破損及不良部分 -->
            <v-col cols="12">
              <v-textarea
                hide-details
                label="破損及不良部分"
                auto-grow
                outlined
                rows="6"
                v-model.trim="oo"
              />
            </v-col>
            <!-- 狀況及原因 -->
            <v-col cols="12">
              <v-textarea hide-details label="狀況及原因" auto-grow outlined rows="6" v-model.trim="ii" />
            </v-col>
            <!-- 處置 -->
            <v-col cols="12">
              <v-textarea hide-details label="處置" auto-grow outlined rows="6" v-model.trim="uu" />
            </v-col>
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
  data: () => ({
    title: "SL__/DL__進廠維修紀錄",
    newText: "維修紀錄",
    a: "",
    z: "",
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
        text: "保養日期",
        value: "aa",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "地點",
        value: "ss",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "破損及不良部分",
        value: "dd",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "狀況及原因",
        value: "ff",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "處置",
        value: "gg",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "填寫人",
        value: "hh",
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
    ],
    tableItems: [
      {
        aa: "2020-08-01",
        ss: "修理工廠",
        dd: "施行二級保養",
        ff: "下次二級:109-09-01",
        gg: "V",
        hh: "王大明"
      },
      {
        aa: "2020-08-10",
        ss: "阿庫",
        dd: "更換引擎機油",
        ff: "更換引擎機油",
        gg: "V",
        hh: "王大明"
      }
    ]
  }),
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
    }
  }
};
</script>
