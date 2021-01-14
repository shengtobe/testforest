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
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn color="green" dark large class="mb-sm-8 mb-md-8">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
      </v-col>

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
    <!-- 新增切割機定期檢查表(三個月) modal -->
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
            <v-col cols="12">
              <p>1.依職業安全衛生法第23條規定辦理。</p>
              <p>2.依檢查結果選擇良好、不良、無此項目。</p>
              <p>3.缺點由使用單位自行改善，不克者委請設備商修護。</p>
              <p>4.本定期檢查表於每年 1.4.7.10月月底前完成檢查。</p>
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
                  <v-text-field solo value readonly />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">檢查人員</h3>
                  <v-text-field solo />
                </v-col>
              </v-row>
              <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
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
                  <v-col cols="12" sm="3">{{ item.question }}</v-col>
                  <v-col cols="12" sm="3">
                    <v-select
                      :items="[{ text: '動作測試', value: 'A' }, { text: '目視點檢', value: 'B' }]"
                      solo
                    />
                  </v-col>
                  <v-col cols="12" sm="3">
                    <span class="d-sm-none error--text">檢查結果：</span>
                    <v-radio-group dense row v-model="ipt.items[idx].status" class="pa-0 ma-0">
                      <v-radio color="success" label="良好" value="1"></v-radio>
                      <v-radio color="red" label="不良" value="2"></v-radio>
                      <v-radio color="black" label="無此項目" value="0"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-textarea hide-details auto-grow outlined rows="3" />
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
            <!-- 改善建議、改善追蹤 -->
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">改善建議</h3>
              <v-textarea auto-grow outlined rows="4" />
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">改善措施</h3>
              <v-textarea auto-grow outlined rows="4" />
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
      title: "切割機定期檢查表(三個月)",
      newText: "檢查表",
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
        ],
      },
      items: [
        { question: "1. 防護蓋有否裝設" },
        { question: "2. 護目鏡是否配置" },
        { question: "3. 機台固定裝置是否穩固" },
        { question: "4. 馬達絕緣電阻" },
        { question: "5. 電源線有無損傷" },
        { question: "6. 外殼接地線是否裝設" },
        { question: "7. 磨輪規格是否正確，有無裂痕" },
        { question: "8. 磨輪固定情況是否良好" },
        { question: "9. 試運轉是否平衡，有無異狀" },
        { question: "10. 是否有「使用時禁戴手套」警語" },
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
