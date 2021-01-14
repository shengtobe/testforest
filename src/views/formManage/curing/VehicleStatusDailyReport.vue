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

      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
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
    <!-- 新增自動檢點表 modal -->
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
            <!-- 檢查部分 -->
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
                  <v-text-field solo />
                </v-col>
              </v-row>
              <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">客車</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <!-- ---------------------K閥--------------------- -->
                    <v-col cols="13" sm="12">
                      <v-toolbar color="teal lighten-2" dark>
                        <v-spacer />
                        <v-toolbar-title>K閥</v-toolbar-title>
                        <v-spacer />
                      </v-toolbar>
                    </v-col>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">車種別</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">現有車輛總數</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">車輛狀態</h3>
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
                      v-for="(item, idx) in items1_1"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="2">{{ item.question }}</v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">現有車輛總數</span>
                          <v-text-field v-model="items1_1[idx].status" auto-grow outlined rows="1" value="" type="number"/>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="使用" value="1"></v-radio>
                            <v-radio color="blue" label="待用" value="2"></v-radio>
                            <v-radio color="orange" label="委外修繕" value="3"></v-radio>
                            <v-radio color="orange" label="待修" value="4"></v-radio>
                            <v-radio color="orange" label="保養維修" value="5"></v-radio>
                            <v-radio color="red" label="停用" value="6"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">備註：</span>
                          <v-textarea auto-grow outlined rows="2" />
                        </v-col>
                      </v-row>
                    </v-alert>
                    <!-- ---------------------EA閥連控--------------------- -->
                    <v-col cols="13" sm="12">
                      <v-toolbar color="teal lighten-2" dark>
                        <v-spacer />
                        <v-toolbar-title>EA閥連控</v-toolbar-title>
                        <v-spacer />
                      </v-toolbar>
                    </v-col>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">車種別</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">現有車輛總數</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">車輛狀態</h3>
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
                      v-for="(item, idx) in items1_2"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="2">{{ item.question }}</v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">現有車輛總數</span>
                          <v-text-field v-model="items1_2[idx].status" auto-grow outlined rows="1" type="number"/>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="使用" value="1"></v-radio>
                            <v-radio color="blue" label="待用" value="2"></v-radio>
                            <v-radio color="orange" label="委外修繕" value="3"></v-radio>
                            <v-radio color="orange" label="待修" value="4"></v-radio>
                            <v-radio color="orange" label="保養維修" value="5"></v-radio>
                            <v-radio color="red" label="停用" value="6"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">備註：</span>
                          <v-textarea auto-grow outlined rows="2" />
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">貨車</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <!-- ---------------------K閥--------------------- -->
                    <v-col cols="13" sm="12">
                      <v-toolbar color="teal lighten-2" dark>
                        <v-spacer />
                        <v-toolbar-title>K閥</v-toolbar-title>
                        <v-spacer />
                      </v-toolbar>
                    </v-col>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">車種別</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">現有車輛總數</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">車輛狀態</h3>
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
                      v-for="(item, idx) in items2"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="2">{{ item.question }}</v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">現有車輛總數</span>
                          <v-text-field v-model="items2[idx].status" auto-grow outlined rows="1" type="number"/>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="使用" value="1"></v-radio>
                            <v-radio color="blue" label="待用" value="2"></v-radio>
                            <v-radio color="orange" label="委外修繕" value="3"></v-radio>
                            <v-radio color="orange" label="待修" value="4"></v-radio>
                            <v-radio color="orange" label="保養維修" value="5"></v-radio>
                            <v-radio color="red" label="停用" value="6"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">備註：</span>
                          <v-textarea auto-grow outlined rows="2" />
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">展示車</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <!-- ---------------------K閥--------------------- -->
                    <v-col cols="13" sm="12">
                      <v-toolbar color="teal lighten-2" dark>
                        <v-spacer />
                        <v-toolbar-title>K閥</v-toolbar-title>
                        <v-spacer />
                      </v-toolbar>
                    </v-col>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">車種別</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">現有車輛總數</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">車輛狀態</h3>
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
                      v-for="(item, idx) in items3"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="2">{{ item.question }}</v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">現有車輛總數</span>
                          <v-text-field v-model="items3[idx].status" auto-grow outlined rows="1" type="number">0</v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="使用" value="1"></v-radio>
                            <v-radio color="blue" label="待用" value="2"></v-radio>
                            <v-radio color="orange" label="委外修繕" value="3"></v-radio>
                            <v-radio color="orange" label="待修" value="4"></v-radio>
                            <v-radio color="orange" label="保養維修" value="5"></v-radio>
                            <v-radio color="red" label="停用" value="6"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">備註：</span>
                          <v-textarea auto-grow outlined rows="2" />
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
            <!-- 改善建議、改善追蹤 -->
            <v-col cols="13" sm="12">
              <v-toolbar color="teal lighten-2" dark>
                <v-spacer />
                <v-toolbar-title>合計</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
            </v-col>
            <v-col cols="12" sm="2">
              <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                <v-col cols="12" sm="12">
                  <h3 class="mb-1">現有車輛總數</h3>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="10" style="margin-top: -30px">
              <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                <v-col cols="12" sm="2">
                  <h3 class="mb-1">使用</h3>
                </v-col>
                <v-col cols="12" sm="2">
                  <h3 class="mb-1">待用</h3>
                </v-col>
                <v-col cols="12" sm="2">
                  <h3 class="mb-1">委外修繕</h3>
                </v-col>
                <v-col cols="12" sm="2">
                  <h3 class="mb-1">待修</h3>
                </v-col>
                <v-col cols="12" sm="2">
                  <h3 class="mb-1">保養維修</h3>
                </v-col>
                <v-col cols="12" sm="2">
                  <h3 class="mb-1">停用</h3>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="2">
              <v-row >
                <v-col cols="12" sm="12">
                  <!-- 現有車輛總數 -->
                  <v-text-field v-model="count_AllCar" solo v-on="on" readonly></v-text-field>
                </v-col>
              </v-row>
            </v-col>
             <v-col cols="12" sm="10">
              <v-row no-gutter >
                <v-col cols="12" sm="2">
                  <v-text-field solo v-model="using" readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-text-field v-model="stand" solo v-on="on" readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-text-field v-model="outService" solo v-on="on" readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-text-field v-model="waitService" solo v-on="on" readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-text-field v-model="Service" solo v-on="on" readonly></v-text-field>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-text-field v-model="deactivated" solo v-on="on" readonly></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <!-- END 檢查部分 -->
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
      title: "_____車庫客貨車輛狀態日報表",
      newText: "日報表",
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
      ipt: {//這是預設值
        // department: "",
        // date: new Date().toISOString().substr(0, 10),
        items: [
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
        ],
        items1_1: [
          { status: "0"},
          { status: "0"},
        ],
        items1_2: [
          { status: "0"},
          { status: "0"},
          { status: "0"},
          { status: "0"},
          { status: "0"},
        ],
        items2: [
          { status: "0"},
          { status: "0"},
          { status: "0"},
          { status: "0"},
          { status: "0"},
          { status: "0"},
          { status: "0"},
        ],
        items3: [
          { status: "0"},
          { status: "0"},
        ]
      },
      items1_1: [
        //K閥
        { question: "阿里山號" },
        { question: "電源客車" },
      ],
      items1_2: [
        //EA閥連控
        { question: "商務客車" },
        { question: "阿里山號" },
        { question: "中興號" },
        { question: "檜木客車" },
        { question: "祝客客車" },
      ],
      items2: [
        //貨車 K閥
        { question: "平守車" },
        { question: "平甲車" },
        { question: "蓬甲車" },
        { question: "搶修車" },
        { question: "砂石敞車" },
        { question: "油罐車" },
        { question: "高甲車" },
      ],
      items3: [
        //展示車 K閥
        { question: "普通客車", count: "0" },
        { question: "普通客車", count: "0" },
      ],
      suggest: "", // 改善建議
    };
  },
  components: { Pagination }, // 頁碼
  computed: {
    count_AllCar() {
      var total = 0;
      // total = document.getElementById("input-152").value
      // total = $("#input-152").val()

      // total = Number(this.input-152);
      // for (let index = 0; index < this.ipt.items.length; index++) {
      //   total += Number(this.ipt.items[index].status);
      // }
      for (let index = 0; index < this.items1_1.length; index++) {
        total += Number(this.items1_1[index].status);
      }
      for (let index = 0; index < this.items1_2.length; index++) {
        total += Number(this.items1_2[index].status);
      }
      for (let index = 0; index < this.items2.length; index++) {
        total += Number(this.items2[index].status);
      }
      for (let index = 0; index < this.items3.length; index++) {
        total += Number(this.items3[index].status);
      }
      // var roundDecimal = function (val, precision) {
      //   return (
      //     Math.round(
      //       Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10
      //     ) / Math.pow(10, precision || 0)
      //   );
      // };

      // total = total / 6;
      return total
    },
    using() {//使用數量
      var total = 0;
      for (let index = 0; index < this.ipt.items.length; index++) {
        if(this.ipt.items[index].status == "1"){
          total++
        }
      }
      return total
    },
    stand() {//待用數量
      var total = 0;
      for (let index = 0; index < this.ipt.items.length; index++) {
        if(this.ipt.items[index].status == "2"){
          total++
        }
      }
      return total
    },
    outService() {//委外修繕數量
      var total = 0;
      for (let index = 0; index < this.ipt.items.length; index++) {
        if(this.ipt.items[index].status == "3"){
          total++
        }
      }
      return total
    },
    waitService() {//待修數量
      var total = 0;
      for (let index = 0; index < this.ipt.items.length; index++) {
        if(this.ipt.items[index].status == "4"){
          total++
        }
      }
      return total
    },
    Service() {//保養維修數量
      var total = 0;
      for (let index = 0; index < this.ipt.items.length; index++) {
        if(this.ipt.items[index].status == "5"){
          total++
        }
      }
      return total
    },
    deactivated() {//停用數量
      var total = 0;
      for (let index = 0; index < this.ipt.items.length; index++) {
        if(this.ipt.items[index].status == "6"){
          total++
        }
      }
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
