<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">{{ title }}</h2>
    <v-row class="px-2">
      <!-- 第一排選項 -->
      <v-col cols="12" sm="2" md="2">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>查詢日期(起)
        </h3>
        <v-menu
          v-model="dateMenuShow.start"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="ipt.dateStart" solo v-on="on" readonly></v-text-field>
          </template>
          <v-date-picker
            color="purple"
            v-model="ipt.dateStart"
            @input="dateMenuShow.start = false"
            locale="zh-tw"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="2" md="2">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>查詢日期(迄)
        </h3>
        <v-menu
          v-model="dateMemuShow.end"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="ipt.dateEnd" solo v-on="on" readonly></v-text-field>
          </template>
          <v-date-picker
            color="purple"
            v-model="ipt.dateEnd"
            @input="dateMemuShow.end = false"
            locale="zh-tw"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="3" md="2">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>選擇部門
        </h3>
        <v-select
          v-model="ipt.case"
          :items="[
          { text: '綜合企劃科', value: 'A' }, 
          { text: '鐵路服務科', value: 'B' }, 
          { text: '鐵路維護科', value: 'C' }, 
          { text: '車輛養護科', value: 'D' }, 
          { text: '人事室', value: 'E' }, 
          { text: '主計室', value: 'F' }, 
          { text: '政風室', value: 'G' }, 
          { text: '秘書室', value: 'H' }]"
          solo
        />
      </v-col>
      <v-col cols="12" sm="2" md="2">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>員工姓名
        </h3>
        <v-text-field solo />
      </v-col>
      <v-col cols="12" sm="2" md="2">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>觀察人員姓名
        </h3>
        <v-text-field solo />
      </v-col>
      <v-col cols="12" sm="2" md="2" class="d-flex align-end">
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
          @click="dialogShowAdd = true"
        >
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </v-col>
      <v-dialog v-model="dialogDel" persistent max-width="290">
        <v-card>
          <v-card-title class="red white--text px-4 py-1 headline">確認是否刪除?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="close">取消</v-btn>
            <v-btn color="success">刪除</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 動力車保養紀錄 -->
      <v-col cols="12" sm="12" md="12">
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
              title="編輯"
              class="mr-2"
              small
              dark
              fab
              color="info darken-1"
              @click="viewPage(item)"
            >
              <!--上面一行原程式: @click="dialogShowAdd = true" -->
              <v-icon dark>mdi-pen</v-icon>
            </v-btn>
            <v-btn title="刪除" small dark fab color="red" @click="dialogDel = true">
              <v-icon dark>mdi-delete</v-icon>
            </v-btn>
          </template>

          <!-- 頁碼 -->
          <template v-slot:footer="footer">
            <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
          </template>
        </v-data-table>
      </v-col>
      <!-- 新增保養資料 modal -->
      <v-dialog v-model="dialogShowAdd" max-width="800px">
        <v-card>
          <!-- 標題 -->
          <v-card-title class="blue white--text px-4 py-1">
            新增{{ title }}
            <v-spacer />
            <v-btn dark fab small text @click="close" class="mr-n2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <!-- 內容 -->
          <div class="px-6 py-4">
            <v-row>
              <v-col cols="12">
              <p>1.本查核紀錄表每月至少觀察2人</p>
              <p>2.本表於月底前完成查核，經主管核章後，留存於管理單位之系統保存備查。</p>
            </v-col>
              <v-col cols="12" sm="4">
                <h3 class="mb-1">觀察日期</h3>
                <v-menu
                  v-model="dialogDateMenuShow.enters"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field hide-details v-on="on" solo />
                  </template>
                  <v-date-picker
                    color="purple"
                    v-model="addItem.enterDate"
                    @input="dialogDateMenuShow.enters = false"
                    locale="zh-tw"
                  />
                </v-menu>
              </v-col>
              <v-col cols="12" sm="4"/>
              <v-col cols="12" sm="4"/>
              
              
              <v-col cols="8" sm="4">
                <h3 class="mb-1">所屬單位</h3>
                <v-text-field v-model="addItem.Kilometer" :rules="nameRules" required solo />
              </v-col>
              <v-col cols="8" sm="4">
                <h3 class="mb-1">職稱</h3>
                <v-text-field v-model="addItem.Kilometers" :rules="nameRules" required solo />
              </v-col>

              <v-col cols="8" sm="4">
                <h3 class="mb-1">員工姓名</h3>
                <v-text-field v-model="addItem.user" solo />
              </v-col>
              <v-col cols="8" sm="4">
                <h3 class="mb-1">任現職年資</h3>
                <v-text-field v-model="addItem.user" solo />
              </v-col>
              <v-col cols="8" sm="4">
                <h3 class="mb-1">工作名稱</h3>
                <v-text-field v-model="addItem.user" solo />
              </v-col>
              <v-col cols="10">
                <h3 class="mb-1">接受安全觀察之情況</h3>
                <v-row class="ml-1" style="justify-content: left;">
                  <v-checkbox class="mr-3" v-model="aas" label="計畫安全觀察之員工" value="A" />
                  <v-checkbox class="mr-3" v-model="bbs" label="常不注意安全肇生事故者" value="B" />
                  <v-checkbox class="mr-3" v-model="ccs" label="生病或不到工後恢復工作者" value="C" />
                  <v-checkbox class="mr-3" v-model="dds" label="調換工作者" value="D" />
                  <v-checkbox class="mr-3" v-model="dds" label="無經驗者" value="E" />
                  <v-checkbox class="mr-3" v-model="dds" label="身體或心智不能安全工作者" value="F" />
                  <v-checkbox class="mr-3" v-model="dds" label="似經情緒擾亂有怪異行動者" value="G" />
                  <v-checkbox class="mr-3" v-model="dds" label="累遭意外者" value="H" />
                </v-row>
              </v-col>
              <v-col cols="12">
                  <h3 class="mb-1 indigo--text">觀察內容：（觀察此人進行工作檢討工作關鍵性安全要點、交談結果）</h3>
              </v-col>
              <v-col cols="12">
              <h3 class="mb-1 indigo--text">一、工作步驟是否正確？合乎標準作業程序？</h3>
              <v-textarea auto-grow outlined rows="4" />
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">二、工作熟練程度如何？</h3>
              <v-textarea auto-grow outlined rows="4" />
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">三、不安全動作係由何種原因所致？</h3>
              <v-textarea auto-grow outlined rows="4" />
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">四、可能發生的意外有哪些？防止措施如何？</h3>
              <v-textarea auto-grow outlined rows="4" />
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">五、對工作者說明或糾正要點：</h3>
              <v-textarea auto-grow outlined rows="4" />
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">六、提請有關單位協辦事項有哪些？</h3>
              <v-textarea auto-grow outlined rows="4" />
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">七、工作者對進行此工作的意見：</h3>
              <v-textarea auto-grow outlined rows="4" />
            </v-col>
            <v-col cols="12">
              <h3 class="mb-1 indigo--text">八、其他</h3>
              <v-textarea auto-grow outlined rows="4" />
            </v-col>
            </v-row>
            <hr />
            <v-row>
                <v-col cols="12" sm="4">
                <h3 class="mb-1">觀察人員</h3>
                <v-text-field v-model="addItem.Kilometer" :rules="nameRules" required solo />
              </v-col>
              <v-col cols="12" sm="4">
                <h3 class="mb-1">職安單位</h3>
                <v-text-field v-model="addItem.Kilometer" :rules="nameRules" required solo />
              </v-col>
              <v-col cols="12" sm="4">
                <h3 class="mb-1">科長</h3>
                <v-text-field v-model="addItem.Kilometer" :rules="nameRules" required solo />
              </v-col>
            </v-row>
          </div>
          <!-- 輸出/取消 -->
          <v-card-actions class="px-5 pb-8">
            <v-spacer></v-spacer>
            
              <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
                  <v-btn color="success" elevation="4" :loading="isLoading" @click="save">送出</v-btn>
            
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { evtTypes, locationOpts } from "@/assets/js/smisData";
import Pagination from "@/components/Pagination.vue";

export default {
  data: () => ({
    title: "員工工作安全觀察表(每月2 次)",
    newText: "觀察表",
    isLoading: false,
    disabled: false,
    aas: "",
    bbs: "",
    ccs: "",
    dds: "",
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
      dateStart: new Date().toISOString().substr(0, 10), // 通報日期(起)
      dateEnd: new Date().toISOString().substr(0, 10), // 通報日期(迄)
      case: "",
      eqLoss: ""
    },
    dateMemuShow: {
      // 日曆是否顯示
      start: false,
      end: false
    },
    evtTypeOpts: evtTypes,
    locationOpts: locationOpts,
    dateMenuShow: false, // 日曆是否顯示
    dialogDateMenuShow: {
      // dialog 日期 menu 是否顯示
      enter: false,
      enters: false,
      out: false
    },
    editedItem: {
      Kilometer: 12044.3,
      Kilometers: 12044.3,
      enterDate: "2020-08-10",
      content: "更換引擎機油", // 維修項目
      startday: "2020-08-10",
      user: "王大明"
    },
    addItem: {
      Kilometer: null,
      Kilometers: null,
      enterDate: "",
      content: "", // 維修項目
      enterDates: "",
      user: ""
    },
    defaultItem: {
      Kilometer: null,
      Kilometers: 0,
      enterDate: "2020-08-10",
      content: "", // 維修項目
      user: ""
    },
    nameRules: [
      v => !!v || "不可空白",
    ],
    dialogForm: {},
    mainLocation: "", // 所選的地點
    OLocation: "", // 其他地點
    dialogShowAdd: false, // model off
    dialogShowEdit: false, // model off
    dialogDel: false, // model off
    dialogm1: "2020-08-01",
    aa: "",
    bb: "",
    cc: "",
    disabled: true,
    tableItems: [
      {
        aa: 1,
        bb: "鐵路維護科",
        cc: "王小明",
        dd: "張大仁",
        ee: "2020-08-08",
      }
    ], // 表格資料
    pageOpt: { page: 1 }, // 目前頁數
    headers: [
      // 表格顯示的欄位
      {
        text: "編號",
        value: "aa",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        width: "8%"
      },
      {
        text: "所屬單位",
        value: "bb",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        width: "20%"
      },
      {
        text: "員工姓名",
        value: "cc",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        width: "20%"
      },
      {
        text: "觀察人員",
        value: "dd",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        width: "20%"
      },
      {
        text: "觀察日期",
        value: "ee",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        width: "20%"
      },
      {
        text: "功能",
        value: "shop",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
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
    // 存
    save() {},
    // 關閉 dialog
    close() {
      this.dialogShowAdd = false;
      this.dialogShowEdit = false;
      this.dialogDel = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.addItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    // 確定新增
    save() {

    },
  }
};
</script>
