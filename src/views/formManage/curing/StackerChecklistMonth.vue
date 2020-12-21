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
    <!-- 新增自動檢點表 modal -->
    <v-dialog v-model="Add" max-width="900px">
      <v-card>
        <v-card-title class="blue white--text px-4 py-1">
          新增堆高機定期檢查表(月)
          <v-spacer></v-spacer>
          <v-btn dark fab small text @click="close" class="mr-n2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <div class="px-6 py-4">
          <v-row>
            <v-col cols="12">
              <p>1.依職業安全衛生法第23條及職業安全衛生管理辦法第17條規定辦理。</p>
              <p>2.檢查結果請依情況選擇良好、不良。並應做檢查發現危害、分析危害因素，評估危害風險，依檢查風險評估結果採取改善措施、檢討改善措施之合宜性。</p>
              <p>3.評估危害風險。</p>
              <p>4.缺點由使用單位自行改善，不克者委請設備商維護。</p>
              <p>5.本表於月底前完成檢查，經主管核章後，留存於管理單位之系統以保存備查。</p>
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
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">型式</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">堆高荷重</h3>
                  <v-text-field solo />
                </v-col>
              </v-row>
              <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">引擎系統</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查內容</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查方法</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">判定基準</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">結果</h3>
                      </v-col>
                    </v-row>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in items1"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="3">{{ item.question }}</v-col>
                        <v-col cols="12" sm="3">{{ item.checkMethod }}</v-col>
                        <v-col cols="12" sm="3">{{ item.judgeStandard }}</v-col>
                        <v-col cols="12" sm="3">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="良好" value="1"></v-radio>
                            <v-radio color="red" label="不良/嚴重性危害" value="2"></v-radio>
                            <v-radio color="red" label="不良/可能性危害" value="3"></v-radio>
                            <v-radio color="red" label="不良/無危害" value="4"></v-radio>
                          </v-radio-group>
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">儀電功能</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查內容</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查方法</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">判定基準</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">結果</h3>
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
                        <v-col cols="12" sm="3">{{ item.question }}</v-col>
                        <v-col cols="12" sm="3">{{ item.checkMethod }}</v-col>
                        <v-col cols="12" sm="3">{{ item.judgeStandard }}</v-col>
                        <v-col cols="12" sm="3">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="良好" value="1"></v-radio>
                            <v-radio color="red" label="不良/嚴重性危害" value="2"></v-radio>
                            <v-radio color="red" label="不良/可能性危害" value="3"></v-radio>
                            <v-radio color="red" label="不良/無危害" value="4"></v-radio>
                          </v-radio-group>
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">裝卸裝置</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查內容</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查方法</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">判定基準</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">結果</h3>
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
                        <v-col cols="12" sm="3">{{ item.question }}</v-col>
                        <v-col cols="12" sm="3">{{ item.checkMethod }}</v-col>
                        <v-col cols="12" sm="3">{{ item.judgeStandard }}</v-col>
                        <v-col cols="12" sm="3">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="良好" value="1"></v-radio>
                            <v-radio color="red" label="不良/嚴重性危害" value="2"></v-radio>
                            <v-radio color="red" label="不良/可能性危害" value="3"></v-radio>
                            <v-radio color="red" label="不良/無危害" value="4"></v-radio>
                          </v-radio-group>
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">油壓裝置</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查內容</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查方法</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">判定基準</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">結果</h3>
                      </v-col>
                    </v-row>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in items4"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="3">{{ item.question }}</v-col>
                        <v-col cols="12" sm="3">{{ item.checkMethod }}</v-col>
                        <v-col cols="12" sm="3">{{ item.judgeStandard }}</v-col>
                        <v-col cols="12" sm="3">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="良好" value="1"></v-radio>
                            <v-radio color="red" label="不良/嚴重性危害" value="2"></v-radio>
                            <v-radio color="red" label="不良/可能性危害" value="3"></v-radio>
                            <v-radio color="red" label="不良/無危害" value="4"></v-radio>
                          </v-radio-group>
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">車況</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查內容</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查方法</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">判定基準</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">結果</h3>
                      </v-col>
                    </v-row>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in items5"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="3">{{ item.question }}</v-col>
                        <v-col cols="12" sm="3">{{ item.checkMethod }}</v-col>
                        <v-col cols="12" sm="3">{{ item.judgeStandard }}</v-col>
                        <v-col cols="12" sm="3">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="良好" value="1"></v-radio>
                            <v-radio color="red" label="不良/嚴重性危害" value="2"></v-radio>
                            <v-radio color="red" label="不良/可能性危害" value="3"></v-radio>
                            <v-radio color="red" label="不良/無危害" value="4"></v-radio>
                          </v-radio-group>
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">其他</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查內容</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查方法</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">判定基準</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">結果</h3>
                      </v-col>
                    </v-row>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in items6"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="3">{{ item.question }}</v-col>
                        <v-col cols="12" sm="3">{{ item.checkMethod }}</v-col>
                        <v-col cols="12" sm="3">{{ item.judgeStandard }}</v-col>
                        <v-col cols="12" sm="3">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="良好" value="1"></v-radio>
                            <v-radio color="red" label="不良" value="2"></v-radio>
                          </v-radio-group>
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
            <!-- 改善建議、改善追蹤 -->
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">檢查發現危害、分析危害因素</h3>
              <v-textarea auto-grow outlined rows="4" />
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">評估危害風險(嚴重性及可能性分析)</h3>
              <v-radio-group class="pa-0 ma-0">
                <v-radio color="success" label="良好" value="1"/>
                <v-radio color="red" label="不良" value="2"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">評估結果改善措施</h3>
              <v-textarea auto-grow outlined rows="4" />
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">檢討改善措施之合宜性</h3>
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
      title: "堆高機定期檢查表(月)",
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
        ],
      },
      items1: [
        //引擎系統
        {
          question: "1. 引擎機油",
          checkMethod: "抽取探測棒",
          judgeStandard: "應在標示範圍內",
        },
        {
          question: "2. 水箱狀況",
          checkMethod: "發動前打開檢查",
          judgeStandard: "水位正常無漏水",
        },
        {
          question: "3. 電瓶液",
          checkMethod: "電瓶液位",
          judgeStandard: "應在標示範圍內",
        },
        {
          question: "4. 啟動裝置",
          checkMethod: "測試",
          judgeStandard: "無異常聲音",
        },
        {
          question: "5. 離合器機能",
          checkMethod: "踏踩",
          judgeStandard: "功能正常",
        },
        {
          question: "6. 排檔桿工能",
          checkMethod: "排擋測試",
          judgeStandard: "順暢",
        },
        {
          question: "7. 剎車機能",
          checkMethod: "功能測試",
          judgeStandard: "功能正常",
        },
        {
          question: "8. 差速器操作",
          checkMethod: "運轉測試",
          judgeStandard: "功能正常",
        },
      ],
      items2: [
        //儀電功能
        {
          question: "1. 電流表及指示燈",
          checkMethod: "目測",
          judgeStandard: "功能正常",
        },
        {
          question: "2. 油壓表及溫度表",
          checkMethod: "目測",
          judgeStandard: "功能正常",
        },
        {
          question: "3. 照後鏡、喇叭、燈光、警示燈",
          checkMethod: "動作測試及目測",
          judgeStandard: "功能正常",
        },
      ],
      items3: [
        //裝卸裝置
        {
          question: "1. 貨叉狀況",
          checkMethod: "檢視有無變形斷裂固定",
          judgeStandard: "無變形斷裂固定良好",
        },
        {
          question: "2. 貨背架狀況",
          checkMethod: "檢視有無變形斷裂固定",
          judgeStandard: "無變形斷裂固定良好",
        },
      ],
      items4: [
        //油壓裝置
        {
          question: "1. 循環機油泵",
          checkMethod: "運轉測試",
          judgeStandard: "功能正常",
        },
        {
          question: "2. 各部油封",
          checkMethod: "檢查有無洩漏",
          judgeStandard: "應無洩漏",
        },
        {
          question: "3. 變速箱、差速器",
          checkMethod: "檢查有無洩漏",
          judgeStandard: "應無洩漏",
        },
        {
          question: "4. 升高油壓",
          checkMethod: "檢查有無洩漏",
          judgeStandard: "應無洩漏",
        },
      ],
      items5: [
        //車況
        {
          question: "1. 潤滑狀況",
          checkMethod: "目視各軸封",
          judgeStandard: "充份潤滑",
        },
        {
          question: "2. 螺絲狀況",
          checkMethod: "檢視有無鬆脫",
          judgeStandard: "應無鬆脫",
        },
        {
          question: "3. 輪胎狀況",
          checkMethod: "檢查胎壓及外表",
          judgeStandard: "無過磨損胎壓在5.6-7 kg/cm2",
        },
      ],
      items6: [
        //其他
        {
          question: "1. 安全帶",
          checkMethod: "檢查安全帶固定、環扣帶無破裂",
          judgeStandard: "安全帶固定端及環扣應完整無破裂可使用",
        },
        {
          question: "2. 滅火器",
          checkMethod: "檢查滅火器壓力及噴管",
          judgeStandard: "壓力維持於綠色範圍內，噴管無老化裂痕",
        },
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
