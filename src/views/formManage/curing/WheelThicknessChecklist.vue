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
        <h3 class="mb-1">車輛編號</h3>
        <v-text-field solo />
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
    <!-- 新增車輪輪緣高度、厚度檢查紀錄表 modal -->
    <v-dialog v-model="Add" max-width="900px">
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
                  <h3 class="mb-1">檢查人員</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">車輛編號</h3>
                  <v-text-field solo />
                </v-col>
              </v-row>
              <p>輪位一</p>
              <v-row no-gutter class="indigo--text">
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '輪緣厚度 > 24(mm)' }}</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '輪緣高度 < 30(mm)' }}</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '輪緣角點 > 3(mm)' }}</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '備註' }}</h3>
                  <v-text-field solo />
                </v-col>
              </v-row>
              <p>輪位二</p>
              <v-row no-gutter class="indigo--text">
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '輪緣厚度 > 24(mm)' }}</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '輪緣高度 < 30(mm)' }}</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '輪緣角點 > 3(mm)' }}</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '備註' }}</h3>
                  <v-text-field solo />
                </v-col>
              </v-row>
              <p>輪位三</p>
              <v-row no-gutter class="indigo--text">
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '輪緣厚度 > 24(mm)' }}</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '輪緣高度 < 30(mm)' }}</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '輪緣角點 > 3(mm)' }}</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '備註' }}</h3>
                  <v-text-field solo />
                </v-col>
              </v-row>
              <p>輪位四</p>
              <v-row no-gutter class="indigo--text">
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '輪緣厚度 > 24(mm)' }}</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '輪緣高度 < 30(mm)' }}</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '輪緣角點 > 3(mm)' }}</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '備註' }}</h3>
                  <v-text-field solo />
                </v-col>
              </v-row>
              <p>輪位五</p>
              <v-row no-gutter class="indigo--text">
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '輪緣厚度 > 24(mm)' }}</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '輪緣高度 < 30(mm)' }}</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '輪緣角點 > 3(mm)' }}</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '備註' }}</h3>
                  <v-text-field solo />
                </v-col>
              </v-row>
              <p>輪位六</p>
              <v-row no-gutter class="indigo--text">
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '輪緣厚度 > 24(mm)' }}</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '輪緣高度 < 30(mm)' }}</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '輪緣角點 > 3(mm)' }}</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '備註' }}</h3>
                  <v-text-field solo />
                </v-col>
              </v-row>
              <p>輪位七</p>
              <v-row no-gutter class="indigo--text">
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '輪緣厚度 > 24(mm)' }}</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '輪緣高度 < 30(mm)' }}</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '輪緣角點 > 3(mm)' }}</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '備註' }}</h3>
                  <v-text-field solo />
                </v-col>
              </v-row>
              <p>輪位八</p>
              <v-row no-gutter class="indigo--text">
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '輪緣厚度 > 24(mm)' }}</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '輪緣高度 < 30(mm)' }}</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '輪緣角點 > 3(mm)' }}</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="3" class="indigo--text">
                  <h3 class="mb-1">{{ '備註' }}</h3>
                  <v-text-field solo />
                </v-col>
              </v-row>

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
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { maintainStatusOpts } from '@/assets/js/workList'
import { fetchFormOrderList, fetchFormOrderOne, createFormOrder, createFormOrder0 } from '@/apis/formManage/serve'

export default {
  data() {
    return {
      title: "車輪輪緣高度、厚度檢查紀錄表",
      newText: "紀錄表",
      isLoading: false,
      disabled: false,
      panel: [0, 1, 2],
      readonly: false,
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
      //---api---
      DB_Table: "RP001",
      nowTime: "",
      doMan:{
        id: '',
        name: '',
        depart: '',
        checkManName: ''
      },
      ipt2: {},
      defaultIpt: {  // 預設的欄位值
          startDay: '',
          EndDay: '',
          depart: '',  // 單位
        },
      headers: [
        // 表格顯示的欄位 DepartCode ID Name
        { text: "項次", value: "FlowId", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "保養日期", value: "CheckDay", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "審查狀態", value: "CheckStatus", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "填寫人", value: "Name", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "保養單位", value: "DepartCode", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "功能", value: "content", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
      ],
      tableItems: [],
      //------
      ipt: {
        department: "",
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
          { status: "1", note: "" },
          { status: "1", note: "" },
        ],
      },
      items1: [
        { question: "1. 無線電機、電源供應器之清潔" },
        { question: "2. 外觀檢查(面板、旋鈕等)" },
        { question: "3. 麥克風纜線是否完好、按鍵功能是否正常" },
        { question: "4. 天線纜線接頭是否鬆動" },
        { question: "5. 電源線是否鎖緊在電源供應器之接點上" },
        { question: "6. 接收功能是否正常檢查" },
        { question: "7. 發射功能是否正常檢查" },
      ],
      items2: [
        { question: "1. 天線及固定支架外觀檢查" },
        { question: "2. 纜線穿牆進入辦公室之防水滲漏檢查" },
      ],
      items3: [
        { question: "1. 保險絲檢查" },
        { question: "2. 電瓶是否堪用、有無變形，樁頭有無生銅鏽" },
        { question: "3. 連接線是否鬆動檢查鎖緊" },
        { question: "4. 停電電源自動切換檢查" },
      ],
      items4: [
        { question: "1. 設備外觀之清潔及線路接檢查" },
        { question: "2. 硬碟容量檢查" },
        { question: "3. 系統時間檢查" },
        { question: "4. 錄音系統錄音測試" },
        { question: "5. 錄音系統放音測試" },
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
