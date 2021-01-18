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
          <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>車輛編號
        </h3>
        <v-text-field solo value="EZ-555555" readonly />
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
          @click="newOne"
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
    <!-- 新增客車二級檢修記錄表 modal -->
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
              <p>1.連結器檢查，於連結棒圓桿與長方形狀交接處，應以放大鏡輔助檢查。</p>
            </v-col>
            <!-- 檢查項目 -->
            <v-col cols="12">
              <v-row no-gutter class="indigo--text">
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>上次檢驗完成日期
                  </h3>
                  <v-text-field solo value="2020-08-20" readonly />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>車輛編號
                  </h3>
                  <v-text-field solo value="EZ-555555" readonly />
                </v-col>
              </v-row>
              <v-row no-gutter class="indigo--text">
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>本次檢修開始日期
                  </h3>
                  <v-text-field solo value="2020-09-01" readonly />
                </v-col>

                <v-col cols="12" sm="3">
                  <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>本次檢修完成日期
                  </h3>
                  <v-text-field solo value="2020-09-20" readonly />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>填寫人
                  </h3>
                  <v-text-field solo v-model.trim="ipt.name" readonly />
                </v-col>
              </v-row>
              <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
                <v-expansion-panel>
                  <v-expansion-panel-header>行走裝置</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查結果</h3>
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
                      v-for="(item1, idx) in items1"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="4">{{ item1.question }}</v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="red" label="不正常" value="2"></v-radio>
                            <v-radio color="black" label="無此項目" value="0"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <v-textarea hide-details auto-grow outlined rows="2" />
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>軔機裝置</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查結果</h3>
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
                      v-for="(item2, idx) in items2"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="4">{{ item2.question }}</v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="red" label="不正常" value="2"></v-radio>
                            <v-radio color="black" label="無此項目" value="0"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-textarea hide-details auto-grow outlined rows="2" />
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>連結裝置</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查結果</h3>
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
                      v-for="(item3, idx) in items3"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="4">{{ item3.question }}</v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="red" label="不正常" value="2"></v-radio>
                            <v-radio color="black" label="無此項目" value="0"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-textarea hide-details auto-grow outlined rows="2" />
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>電氣裝置</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查結果</h3>
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
                      v-for="(item4, idx) in items4"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="4">{{ item4.question }}</v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="red" label="不正常" value="2"></v-radio>
                            <v-radio color="black" label="無此項目" value="0"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-textarea hide-details auto-grow outlined rows="2" />
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>空氣調節裝置</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查結果</h3>
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
                      v-for="(item5, idx) in items5"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="4">{{ item5.question }}</v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="red" label="不正常" value="2"></v-radio>
                            <v-radio color="black" label="無此項目" value="0"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-textarea hide-details auto-grow outlined rows="2" />
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>車內各種設備</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查結果</h3>
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
                      v-for="(item6, idx) in items6"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="4">{{ item6.question }}</v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="red" label="不正常" value="2"></v-radio>
                            <v-radio color="black" label="無此項目" value="0"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-textarea hide-details auto-grow outlined rows="2" />
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>車架及轉向架</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查結果</h3>
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
                      v-for="(item7, idx) in items7"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="4">{{ item7.question }}</v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="red" label="不正常" value="2"></v-radio>
                            <v-radio color="black" label="無此項目" value="0"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-textarea hide-details auto-grow outlined rows="2" />
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>車身外觀</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查結果</h3>
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
                      v-for="(item8, idx) in items8"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="4">{{ item8.question }}</v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="red" label="不正常" value="2"></v-radio>
                            <v-radio color="black" label="無此項目" value="0"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-textarea hide-details auto-grow outlined rows="2" />
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
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
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { maintainStatusOpts } from '@/assets/js/workList'
import { fetchFormOrderList, fetchFormOrderOne, createFormOrder, createFormOrder0 } from '@/apis/formManage/serve'

export default {
  data() {
    return {
      title:"客車二級檢修記錄表",
      newText:"記錄表",
      panel: [0, 1, 2],
      isLoading: false,
      disabled: false,
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
        ],
      },
      items1: [
        { question: "1. 輪、軸位置無鬆弛移位現象" },
        { question: "2. 車輪背距在679±5mm範圍內" },
        { question: "3. 輪、軸無裂痕" },
        { question: "4. 車軸無彎曲" },
        { question: "5. 輪緣磨耗無超限(厚度大於24mm)" },
        { question: "6. 輪緣高度無超出輪踏面31mm" },
        { question: "7. 輪緣缺損長度無超過27mm、寬度無超過9mm" },
        { question: "8. 踏面擦傷長度單處無超過40mm" },
        { question: "9. 軸承箱與導板間隙無超過6mm" },
        { question: "10. 車輪直徑大於540mm，各輪徑檢查(端面有凹痕記號)" },
        { question: "11. 軸承箱、箱蓋無裂痕或破損" },
        { question: "12. 軸承箱螺栓無鬆弛或脫落" },
        { question: "13. 潤滑油無漏失" },
        { question: "14. 軸承箱內各機件無變形、鬆弛、斷裂或磨損" },
      ],
      items2: [
        {
          question:
            "1. 拉桿、軔槓桿、挺桿、軔塊調整桿、軔樑、軔吊、軔吊托、圓梢、開口梢、襯套等無破損、變形、鬆弛或脫落",
        },
        { question: "2. 軔塊調整桿彎曲方向正確" },
        { question: "3. 銷、孔、軸頸及襯套之直徑磨耗量無大於2mm" },
        { question: "4. 各桿與車體其他部分無不當碰觸" },
        { question: "5. 氣軔軟管無超過耐用期限" },
        { question: "6. 軔管無破損、漏氣" },
        { question: "7. 手軔機各機件無磨耗過量或潤滑不良" },
        {
          question:
            "8. 如需檢修軔缸時，應將其分解，施以各部之清拭及檢修，並將不良部分更換，塗布油脂後重新裝配之。確認無軔缸皮碗磨損過量、復原彈簧疲勞、活塞桿彎曲等",
        },
        {
          question:
            "9. 檢修K閥及EA閥時，應將其分解，施以各部之清拭、檢修，並將不良部分更換，以#10號油潤滑後重新裝配之",
        },
        { question: "10. 濾塵器檢修及清理" },
        { question: "11. 各儲氣筒凝結水排除" },
      ],
      items3: [
        { question: "1. 連結器、軛無裂痕或變形" },
        { question: "2. 連結器磨耗量不超過百分之三十" },
        { question: "3. 連結器緩衝彈簧無太鬆或太緊" },
        { question: "4. 軛固定螺栓無脫落或防鬆鐵絲斷掉" },
        { question: "5. 導架螺栓無鬆脫" },
        { question: "6. 導架滑動面潤滑正常" },
        { question: "7. 安全鏈及螺栓無鬆脫" },
        { question: "8. 連結銷直徑磨耗量小於10mm" },
      ],
      items4: [
        { question: "1. 蓄電池外箱無破損、洩漏" },
        { question: "2. 蓄電池導線或接頭正常" },
        { question: "3. 蓄電池電解液充足" },
        { question: "4. 電氣連接線絕緣物無破損" },
        { question: "5. 配電箱無破損" },
        { question: "6. 保險絲燒斷，保險絲容量適當" },
        { question: "7. 電氣開關、插頭、插座、接頭等無破損、鬆弛或不良" },
        {
          question:
            "8. 各式燈具外蓋拆開清理，燈具、燈架無破損、不良或髒污，或燈泡、燈管無氧化變黑",
        },
        { question: "9. 變壓器、充電器裝置無破損或機能不良" },
        { question: "10. 播音機、喇叭無破損或機能不良" },
        { question: "11. 雨刷機無破損或機能不良" },
      ],
      items5: [
        { question: "1. 空調機配電盤內各機件之安裝螺絲無鬆弛" },
        { question: "2. 運轉指示燈顯示正確" },
        { question: "3. 空氣過濾網無髒污" },
        {
          question:
            "4. 運轉中之冷媒低壓值在3～7kg/cm2，高壓值在13～22kg/cm2之範圍內",
        },
        { question: "5. 風扇運轉正常" },
        { question: "6. 空調機運轉中聲音正常" },
        { question: "7. 出風口無破裂或作用不良" },
        { question: "8. 出風口風量適當" },
        { question: "9. 車廂內冷度適當" },
        { question: "10. 檢查空調機金屬外殼與上面電線無摩擦破皮情形" },
        { question: "11. 空調機基座無銹蝕、固定良好，門蓋板作用正常" },
        {
          question:
            "12. 空調機之絕緣在主電路不低於0.2MΩ，在控制電路不低於0.1MΩ",
        },
        {
          question:
            "13. 延時裝置、過熱遮斷裝置、過載保護裝置之檢查與調整，並確認其作用符合設定值",
        },
      ],
      items6: [
        {
          question:
            "1. 廁所盥洗設備之鏡子、洗手台、馬桶、坐墊自動掀起裝置、扶手、垃圾桶、沖洗按鈕開關、衛生紙架、排風扇及其他附屬設備無破損或作用不良",
        },
        { question: "2. 儲水筒及供水管路無阻塞" },
        { question: "3. 馬桶水量充足、沖水正常" },
        { question: "4. 馬桶沖洗時間正常" },
        { question: "5. 廁所控制氣壓管無漏氣" },
        { question: "6. 馬桶切斷閥正常" },
        { question: "7. 水龍頭關閉位置無漏水" },
        { question: "8. 座椅布無破損或髒污" },
        { question: "9. 座椅迴轉或椅背復位氣壓桿正常" },
        { question: "10. 座椅扶手、煙灰缸、踏板等無缺損或不良" },
        { question: "11. 座號、茶杯架無破損" },
        {
          question:
            "12. 門窗、膠條、行李架、扶桿、頂板、璧板、地板等無髒污、破損、銹蝕或不良",
        },
        { question: "13. 車內各式固定螺絲無缺損或突出" },
        { question: "14. 滅火器無過期、洩漏或破損" },
        { question: "15. 車窗擊破鎚無缺損" },
      ],
      items7: [
        {
          question:
            "1. 轉向框架、彎樑、導板、搖枕、角銷、懸吊系統、中心盤及其他轉向架機件無斷裂、變形、銹蝕、擦撞痕跡或作用不良",
        },
        { question: "2. 車身車架各樑無銹蝕破損" },
        { question: "3. 各式螺栓、襯套及銷無鬆脫或斷裂" },
        { question: "4. 排障器無缺損、斷裂、變形" },
        { question: "5. 旁承座間隙在3~6mm之間" },
        { question: "6. 旁承座無磨損過量" },
        { question: "7. 中心盤上、下盤無破裂" },
        { question: "8. 檢查轉向架中間橫梁變形量不超過3mm" },
      ],
      items8: [
        { question: "1. 車身傾斜左右高低差不超過13mm" },
        { question: "2. 車身文字、標記無脫落或不明顯" },
        { question: "3. 車身側面及車頂油漆無龜裂、剝落、褪色、髒污" },
        { question: "4. 車身鈑金無變形、龜裂、銹蝕" },
        { question: "5. 通路渡板及扶手無銹蝕、不良" },
        { question: "6. 檢查車門開關正常，軸承固定良好" },
      ],
      suggest: "", // 改善建議
    };
  },
  components: { Pagination }, // 頁碼
  computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
  },
  methods: {
    initInput(){
      this.doMan.name = this.userData.UserName;
      this.zs = this.nowTime;
      var step;
      for (step = 0; step < 7; step++) {
        this.ipt.items[step].status = "0"
        this.ipt.items[step].note = ''
      }
      this.Advice = "";
      this.Measures = ""
    },
    unique(list){
      var arr = [];
      let b = false;
      for (var i = 0; i < list.length; i++) {
        if (i == 0) arr.push(list[i]);
        b = false;
        if (arr.length > 0 && i > 0) {
          for (var j = 0; j < arr.length; j++) {
            if (arr[j].RPFlowNo == list[i].RPFlowNo) {
              b = true;
              //break;
            }
          }
          if (!b) {
            arr.push(list[i]);
          }
        }
      }
      return arr;
    },
    newOne(){
      console.log("newOne23")
      this.Add = true
      console.log("this.Add: " + this.Add)
      this.initInput();
    },
    ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 搜尋
    search() {
      console.log("Search click");
      this.chLoadingShow()
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {'Column':'StartDayVlaue','Value':this._data.z},
          {"Column":"EndDayVlaue","Value":this._data.df},
          {"Column":"DepartCode","Value":this._data.ipt2.depart},
                ],
        QyName:[
          // "DISTINCT (RPFlowNo)",
          // // "ID",
          // // "Name",
          // // "CheckDay",
          // // "CheckStatus",
          // " * "
          "RPFlowNo",
          "ID",
          "Name",
          "CheckDay",
          "CheckStatus",
          "FlowId"
        ],
      }).then(res => {
        let tbBuffer = JSON.parse(res.data.DT)
        let aa = this.unique(tbBuffer)
        this.tableItems = aa
      }).catch(err => {
        console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        console.log("search final")
        this.chLoadingShow()
      })
    },
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
    viewPage(item) {
      console.log("item: " + item)
      console.log("RPFlowNo: " + item.RPFlowNo)
      this.chLoadingShow()
        // 依業主要求變更檢式頁面的方式，所以改為另開分頁
        fetchFormOrderOne({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {'Column':'RPFlowNo','Value':item.RPFlowNo},
                ],
        QyName:[
          "CheckDay",
          "DepartName",
          "Name",
          "CheckMan",
          "CheckOption1",
          "Memo_1",
          "CheckOption2",
          "Memo_2",
          "CheckOption3",
          "Memo_3",
          "Advice",
          "Measures",

        ],
      }).then(res => {
        this.initInput();
        console.log(res.data.DT)
        let dat = JSON.parse(res.data.DT)
        console.log("data name: " + dat[0].Name)
        console.log("data time: " + dat[0].CheckDay)
        this.Add = true
        // this.zs = res.data.DT.CheckDay
        this.doMan.name = dat[0].Name
        let time1 = dat[0].CheckDay.substr(0,10)
        console.log("data time1: " + time1)
        this.zs = time1
        console.log("doMan name: " + this.doMan.name)
        //123資料
        let ad = Object.keys(dat[0])
        console.log(ad)
        var i = 0, j = 0;
          for(let key of Object.keys(dat[0])){
            if(i > 3 && i < 52){
              if(i % 2 == 0){
                  this.ipt.items[j].status = (dat[0])[key]
              }
              else{
                this.ipt.items[j].note = (dat[0])[key]
                j++
              }
            }
            i++
          }
        this.memo_2 = dat[0].Advice
        this.memo_3 = dat[0].Measures
      }).catch(err => {
        console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow()
      })
    },//viewPage
  },
};
</script>
