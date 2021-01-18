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
          @click="newOne"
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
            <v-col cols="12">
              <p>1.依職業安全衛生法第23條及職業安全衛生管理辦法第32條規定辦理。</p>
              <p>2.檢查結果請依狀態選擇正常、異常或無此項目。</p>
              <p>3.缺點由使用單位自行改善，不克者委請設備商維護。</p>
              <p>4.本表於月底前完成檢查，經主管核章後，留存於管理單位之系統以保存備查。</p>
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
                  <v-text-field solo value />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">檢查人員</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">型式</h3>
                  <v-text-field solo />
                </v-col>
                
              </v-row>
              <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">鍋爐本體</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查內容</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查方法</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">結果</h3>
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
                      v-for="(item, idx) in items1"
                      :key="idx"
                      class="mb-6 mt-4">
                      <v-row no-gutter>
                        <v-col cols="12" sm="3">{{ item.question }}</v-col>
                        <v-col cols="12" sm="3">{{ item.checkMethod }}</v-col>
                        <v-col cols="12" sm="3">
                          <span class="d-sm-none error--text">結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="red" label="異常" value="2"></v-radio>
                            <v-radio color="red" label="無此項目" value="3"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <span class="d-sm-none error--text">備註：</span>
                          <v-textarea auto-grow
                           outlined rows="2"/>
                            <!-- v-model.trim="ipt.item[idx].note"
                          /> -->
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">燃燒裝置</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查內容</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查方法</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">結果</h3>
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
                      v-for="(item, idx) in items2"
                      :key="idx"
                      class="mb-6 mt-4">
                      <v-row no-gutter>
                        <v-col cols="12" sm="3">{{ item.question }}</v-col>
                        <v-col cols="12" sm="3">{{ item.checkMethod }}</v-col>
                        <v-col cols="12" sm="3">
                          <span class="d-sm-none error--text">結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="red" label="異常" value="2"></v-radio>
                            <v-radio color="red" label="無此項目" value="3"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <span class="d-sm-none error--text">備註：</span>
                          <v-textarea auto-grow
                           outlined rows="2"/>
                            <!-- v-model.trim="ipt.item[idx].note"
                          /> -->
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">自動控制裝置</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查內容</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查方法</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">結果</h3>
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
                      v-for="(item, idx) in items3"
                      :key="idx"
                      class="mb-6 mt-4">
                      <v-row no-gutter>
                        <v-col cols="12" sm="3">{{ item.question }}</v-col>
                        <v-col cols="12" sm="3">{{ item.checkMethod }}</v-col>
                        <v-col cols="12" sm="3">
                          <span class="d-sm-none error--text">結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="red" label="異常" value="2"></v-radio>
                            <v-radio color="red" label="無此項目" value="3"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <span class="d-sm-none error--text">備註：</span>
                          <v-textarea auto-grow
                           outlined rows="2"/>
                            <!-- v-model.trim="ipt.item[idx].note"
                          /> -->
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">附屬裝置</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查內容</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查方法</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">結果</h3>
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
                      v-for="(item, idx) in items4"
                      :key="idx"
                      class="mb-6 mt-4">
                      <v-row no-gutter>
                        <v-col cols="12" sm="3">{{ item.question }}</v-col>
                        <v-col cols="12" sm="3">{{ item.checkMethod }}</v-col>
                        <v-col cols="12" sm="3">
                          <span class="d-sm-none error--text">結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="red" label="異常" value="2"></v-radio>
                            <v-radio color="red" label="無此項目" value="3"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <span class="d-sm-none error--text">備註：</span>
                          <v-textarea auto-grow
                           outlined rows="2"/>
                            <!-- v-model.trim="ipt.item[idx].note"
                          /> -->
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">其他</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查內容</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查方法</h3>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">結果</h3>
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
                      v-for="(item, idx) in items5"
                      :key="idx"
                      class="mb-6 mt-4">
                      <v-row no-gutter>
                        <v-col cols="12" sm="3">{{ item.question }}</v-col>
                        <v-col cols="12" sm="3">{{ item.checkMethod }}</v-col>
                        <v-col cols="12" sm="3">
                          <span class="d-sm-none error--text">結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="red" label="異常" value="2"></v-radio>
                            <v-radio color="red" label="無此項目" value="3"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <span class="d-sm-none error--text">備註：</span>
                          <v-textarea auto-grow
                           outlined rows="2"/>
                            <!-- v-model.trim="ipt.item[idx].note"
                          /> -->
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
            <!-- 改善建議、改善追蹤 -->
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">改善建議</h3>
              <v-textarea auto-grow outlined rows="4" />
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">改善措施</h3>
              <v-textarea auto-grow outlined rows="4"/>
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
      title:"鍋爐定期檢查表(月)",
      newText:"檢查表",
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
        // department: "",
        // date: new Date().toISOString().substr(0, 10),
        items: [
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
        ],
      },
      items1: [
        //鍋爐本體
        { question: "1.爐體(或上下汽水鼓)有無損傷變形", checkMethod: "目測檢視" },
        { question: "2.爐筒有無損傷過熱或壓潰膨出", checkMethod: "目測檢視" },
        { question: "3.煙管或水管有無局部過熱或洩露", checkMethod: "運轉測試" },
        { question: "4.外殼磚壁保溫有無損傷鬆弛龜裂", checkMethod: "目測檢視" },
      ],
      items2: [
        //燃燒裝置
        { question: "1.油加熱器及燃料輸送裝置有無損傷", checkMethod: "目測檢視" },
        { question: "2.噴燃器有無損傷及污髒", checkMethod: "功能測試" },
        { question: "3.過濾器有無堵塞或損傷", checkMethod: "目測檢視" },
        { question: "4.燃燒器瓷質部及爐璧有無污髒及損傷", checkMethod: "目測檢視" },
        { question: "5.加媒機及爐篦有無損傷", checkMethod: "目測檢視" },
        { question: "6.煙道有無洩漏、損傷及風壓異常", checkMethod: "動作測試及目測" },
      ],
      items3: [
        //自動控制裝置
        { question: "1.自動起動停止裝置機能有無異常", checkMethod: "運轉測試" },
        { question: "2.火焰檢出裝置機能有無異常", checkMethod: "運轉測試" },
        { question: "3.燃料切斷裝置機能有無異常", checkMethod: "運轉測試" },
        { question: "4.水位調節裝置機能有無異常", checkMethod: "目測檢視" },
        { question: "5.壓力調節裝置機能有無異常", checkMethod: "運轉測試" },
        { question: "6.電氣配線端子有無異常", checkMethod: "目測檢視" },
      ],
      items4: [
        //附屬裝置
        { question: "1.給水裝置有無損傷及作動狀態", checkMethod: "運轉測試" },
        { question: "2.蒸汽管及停止閥有無損傷及保溫狀態", checkMethod: "運轉測試" },
        { question: "3.安氣預熱器有無損傷", checkMethod: "運轉測試" },
        { question: "4.水處理裝置機能有無異常", checkMethod: "運轉測試" },
      ],
      items5: [
        //其他
        { question: "1.保持性能之必要事項", checkMethod: "目測檢視" },
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
