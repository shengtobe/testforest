// 1. 北門車站
// 2. 竹崎車站
// 3. 奮起湖車站
// 4. 阿里山車站
// 5. 交力坪、神木、對高岳
// 6. 沼平、祝山
// 7. 十字岔道
<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2">
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>保養日期(起)
        </h3>
        <v-menu
          v-model="a"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="z" solo v-on="on" readonly></v-text-field>
          </template>
          <v-date-picker color="purple" v-model="z" @input="a = false" locale="zh-tw"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="3" md="3">
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
    <v-dialog v-model="Add" max-width="1060px">
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
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">保養日期</h3>
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
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">管理單位</h3>
                  <v-text-field solo value  />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">保養人</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">站長</h3>
                  <v-text-field solo/>
                </v-col>
              </v-row>
              <v-expansion-panels :disabled="disabled" multiple>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">轉轍器</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <!-- ---------------------竹崎車站--------------------- -->
                      <v-col cols="13" sm="12">
                        <v-toolbar color="teal lighten-2" dark>
                        <v-spacer/>
                        <v-toolbar-title>竹崎車站</v-toolbar-title>
                        <v-spacer/>
                      </v-toolbar>
                    </v-col>
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
                        <v-col cols="12" sm="2">
                            <h3 class="mb-1">竹崎車站<br/>轉轍器號碼</h3>
                          {{ item.question }}
                          </v-col>
                        <v-col cols="12" sm="2">
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status1"
                            class="pa-0 ma-0">
                            <h3 class="mb-1">轉轍器<br/>是否加鎖
                            </h3>
                            <v-radio color="success" label="已完成" value="1"></v-radio>
                            <v-radio color="red" label="未完成" value="2"></v-radio>
                            <v-radio color="orange" label="待改善" value="3"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status2"
                            class="pa-0 ma-0">
                            <h3 class="mb-1">清除滑板生銹或積油垢</h3>
                            <v-radio color="success" label="已完成" value="1"></v-radio>
                            <v-radio color="red" label="未完成" value="2"></v-radio>
                            <v-radio color="orange" label="待改善" value="3"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status3"
                            class="pa-0 ma-0">
                            <h3 class="mb-1">各部軸承、聯動桿、油孔注油</h3>
                            <v-radio color="success" label="已完成" value="1"></v-radio>
                            <v-radio color="red" label="未完成" value="2"></v-radio>
                            <v-radio color="orange" label="待改善" value="3"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status4"
                            class="pa-0 ma-0">
                            <h3 class="mb-1">轉轍器四周環境清潔</h3>
                            <v-radio color="success" label="已完成" value="1"></v-radio>
                            <v-radio color="red" label="未完成" value="2"></v-radio>
                            <v-radio color="orange" label="待改善" value="3"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                            <h3 class="mb-1">備註<br/><br/></h3>
                          <span class="d-sm-none error--text">備註</span>
                          <v-textarea auto-grow
                           outlined rows="2"/>
                        </v-col>
                      </v-row>
                    </v-alert>
                    <!-- ---------------------竹崎車站--------------------- -->
                      <v-col cols="13" sm="12">
                        <v-toolbar color="teal lighten-2" dark>
                        <v-spacer/>
                        <v-toolbar-title>竹崎車站</v-toolbar-title>
                        <v-spacer/>
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
                      class="mb-6 mt-4">
                      <v-row no-gutter>
                        <v-col cols="12" sm="2">
                            <h3 class="mb-1">竹崎車站<br/>轉轍器號碼</h3>
                          {{ item.question }}
                          </v-col>
                        <v-col cols="12" sm="2">
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status1"
                            class="pa-0 ma-0">
                            <h3 class="mb-1">轉轍器<br/>是否加鎖
                            </h3>
                            <v-radio color="success" label="已完成" value="1"></v-radio>
                            <v-radio color="red" label="未完成" value="2"></v-radio>
                            <v-radio color="orange" label="待改善" value="3"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status2"
                            class="pa-0 ma-0">
                            <h3 class="mb-1">清除滑板生銹或積油垢</h3>
                            <v-radio color="success" label="已完成" value="1"></v-radio>
                            <v-radio color="red" label="未完成" value="2"></v-radio>
                            <v-radio color="orange" label="待改善" value="3"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status3"
                            class="pa-0 ma-0">
                            <h3 class="mb-1">各部軸承、聯動桿、油孔注油</h3>
                            <v-radio color="success" label="已完成" value="1"></v-radio>
                            <v-radio color="red" label="未完成" value="2"></v-radio>
                            <v-radio color="orange" label="待改善" value="3"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status4"
                            class="pa-0 ma-0">
                            <h3 class="mb-1">轉轍器四周環境清潔</h3>
                            <v-radio color="success" label="已完成" value="1"></v-radio>
                            <v-radio color="red" label="未完成" value="2"></v-radio>
                            <v-radio color="orange" label="待改善" value="3"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                            <h3 class="mb-1">備註<br/><br/></h3>
                          <span class="d-sm-none error--text">備註</span>
                          <v-textarea auto-grow
                           outlined rows="2"/>
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">進、出站號誌機</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <!-- ---------------------進、出站號誌燈--------------------- -->
                      
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
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
                      v-for="(item, idx) in items3"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="4">{{ item.question }}</v-col>
                        <v-col cols="12" sm="4">
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status1"
                            class="pa-0 ma-0">
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="red" label="異常" value="2"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">備註</span>
                          <v-textarea auto-grow
                           outlined rows="2"/>
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
            <!-- 改善建議、改善追蹤 -->
            
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
      title: "保安裝置檢查紀錄表-竹崎車站",
      newText: "紀錄表",
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
          text: "保養日期",
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
        // name: JSON.parse(localStorage.getItem("user")).name,
        // date: new Date().toISOString().substr(0, 10),
        items: [
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
          { status1: "0", status2: "0", status3: "0", status: "0", note: "" },
        ],
      },
      defaultIpt: {  // 預設的欄位值
          flowId: '',
          checkDay: '',
          departCode: '',
          departName: '',
          id: '',
          name: '',
          checkManID: '',
          checkMan: '',
          switchLock: '0',
          rust: '0',
          bearing: '0',
          switchClean: '0',
          memo_1: '0',
          sig_Chiayi: '0',
          memo_2: '0',
          sig_Alishan: '0',
          memo_3: '0',
          updateTime: '0'
        },
        
      items1: [
        //竹崎車站
        { question: "1號" },
        { question: "3號" },
        { question: "5號" },
        { question: "7號" },
        { question: "9號" },
        { question: "11號" },
        { question: "2號" },
        { question: "4號" },
        { question: "6號" },
      ],
      items2: [
        //竹崎車站
        { question: "8號" },
        { question: "10號" },
        { question: "12號" },
        { question: "14號" },
        { question: "16號" },
        { question: "18號" },
        { question: "20號" },
        { question: "22號" },
        { question: "24號" },
        { question: "26號" },
      ],
      items3: [
        //進、出站號誌燈
        { question: "嘉義方向-是否正常作用" },
        { question: "阿里山方向-是否正常作用" },
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
    search() {
      fetchOrderList({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: 'RP002',  // DB table
        KeyItem: [  // 屬性名
          'FlowId',  // 流水號
          'CheckDay',  // 保養日期
          'DepartCode',  // 保養人部門代碼
          'DepartName',  // 保養人部門名稱
          'ID',  // 保養人事編號
          'Name',  // 保養人姓名
          'CheckManID',  // 審核人事編號
          'CheckMan',  // 審核人姓名
          'SwitchLock',  // 檢查狀態(轉轍器是否加鎖)
          'Rust',  // 檢查狀態(清除滑板生鏽或積油垢)
          'Bearing',  // 檢查狀態(各部軸承、聯動桿、油孔注油)
          'SwitchClean',  // 檢查狀態(轉轍器四周環境清潔)
          'Memo_1',  // 備註
          'Sig_Chiayi',  // 檢查狀態(嘉義方向進、出站號誌機是否正常)
          'Memo_2',  // 備註
          'Sig_Alishan',  // 檢查狀態(阿里山方向進、出站號誌機是否正常)
          'Memo_3',  // 備註
          'UpdateTime'  // 此筆記錄最後變更時間
                ],
        KeyValue: [  // 屬性值
          this.ipt.flowId,
          this.ipt.checkDay,
          this.ipt.departCode,
          this.ipt.departName,
          this.ipt.id,
          this.ipt.name,
          this.ipt.checkManID,
          this.ipt.checkMan,
          this.ipt.switchLock,
          this.ipt.rust,
          this.ipt.bearing,
          this.ipt.switchClean,
          this.ipt.memo_1,
          this.ipt.sig_Chiayi,
          this.ipt.memo_2,
          this.ipt.sig_Alishan,
          this.ipt.memo_3,
          this.ipt.updateTime
        ],
        QyName:[
          'FlowId',  // 流水號
          'CheckDay',  // 保養日期
          'DepartCode',  // 保養人部門代碼
          'DepartName',  // 保養人部門名稱
          'ID',  // 保養人事編號
          'Name',  // 保養人姓名
          'CheckManID',  // 審核人事編號
          'CheckMan',  // 審核人姓名
          'SwitchLock',  // 檢查狀態(轉轍器是否加鎖)
          'Rust',  // 檢查狀態(清除滑板生鏽或積油垢)
          'Bearing',  // 檢查狀態(各部軸承、聯動桿、油孔注油)
          'SwitchClean',  // 檢查狀態(轉轍器四周環境清潔)
          'Memo_1',  // 備註
          'Sig_Chiayi',  // 檢查狀態(嘉義方向進、出站號誌機是否正常)
          'Memo_2',  // 備註
          'Sig_Alishan',  // 檢查狀態(阿里山方向進、出站號誌機是否正常)
          'Memo_3',  // 備註
          'UpdateTime'  // 此筆記錄最後變更時間
        ],
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
  },
};
</script>
