<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">柴油液力機車發電機檢修</h2>
    <v-row class="px-2">
      <!-- 第一排選項 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>保養日期(起)
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
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>保養日期(迄)
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
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>選擇車輛編號
        </h3>
        <v-select
          v-model="ipt.case"
          :items="[{ text: 'A0001', value: 'A' }, { text: 'A0002', value: 'B' }, { text: 'A0003', value: 'C' }, { text: 'A0004', value: 'D' }, { text: 'A0005', value: 'E' }]"
          solo
        />
      </v-col>
      <div class="col-sm-4 col-md-8 col-12">
        <v-btn color="green" dark large class="col-4 col-md-2 mr-3" @click="disabled = false">
          <v-icon>mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn
          color="indigo"
          elevation="3"
          dark
          large
          class="col-4 col-md-3 mr-3"
          @click="dialogShowAdd = true"
        >
          <v-icon>mdi-plus</v-icon>新增保養資料
        </v-btn>
      </div>
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
          <template v-slot:item.shop="{ item }">
            <v-btn
              title="編輯"
              class="mr-2"
              small
              dark
              fab
              color="info darken-1"
              @click="dialogShowAdd = true"
            >
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

      <v-col cols="12" sm="12" md="12">
        <span>
          備註：
          <br />（一）使用時數達<strong>40小時</strong>應將空氣濾清器芯子拆下清理﹔使用時數達<strong>180小時</strong>應進行機油更換；使用時數達<strong>250小時</strong>，應將機油濾清芯子、柴油濾清芯子與空氣濾清芯子換新。
          <br />（二）本項保養作業由司機或車庫檢修人員擔任，經車庫長監督後，記錄表由車庫存查。
          <br />（三）工作記號說明：實施完畢者。
        </span>
      </v-col>
      <!-- 新增保養資料 modal -->
      <v-dialog v-model="dialogShowAdd" max-width="600px">
        <v-card>
          <!-- 標題 -->
          <v-card-title class="blue white--text px-4 py-1">
            新增保養資料
            <v-spacer />
            <v-btn dark fab small text @click="close" class="mr-n2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <!-- 內容 -->
          <div class="px-6 py-4">
            <v-row>
              <!-- 保養日期 -->
              <v-col cols="8" sm="4">
                <h3 class="mb-1">保養日期</h3>
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
              <!-- 使用時數(hr) -->
              <v-col cols="8" sm="4">
                <h3 class="mb-1">使用時數(hr)</h3>
                <v-text-field v-model="addItem.Kilometer" :rules="nameRules" required solo />
              </v-col>
              <!-- 累計使用時數 -->
              <v-col cols="8" sm="4">
                <h3 class="mb-1">累計使用時數</h3>
                <v-text-field v-model="addItem.Kilometers" :rules="nameRules" required solo />
              </v-col>

              <!-- 保養人 -->
              <v-col cols="8" sm="4">
                <h3 class="mb-1">保養人</h3>
                <v-text-field v-model="addItem.user" solo />
              </v-col>
              <!-- 車庫主管 -->
              <v-col cols="8" sm="4">
                <h3 class="mb-1">車庫主管</h3>
                <v-text-field v-model="addItem.user" solo />
              </v-col>
              <!-- 保養項目 -->
              <v-col cols="10">
                <h3 class="mb-1">保養項目</h3>
                <v-row class="ml-1" style="justify-content: left;">
                  <v-checkbox class="mr-3" v-model="aas" label="機油更換" value="A" />
                  <v-checkbox class="mr-3" v-model="bbs" label="機油濾清芯子換新" value="B" />
                  <v-checkbox class="mr-3" v-model="ccs" label="柴油濾清芯子換新" value="C" />
                  <v-checkbox class="mr-3" v-model="dds" label="空氣濾清芯子換新" value="E" />
                </v-row>
              </v-col>
            </v-row>
            <hr />
          </div>
          <!-- 輸出/取消 -->
          <v-card-actions class="px-5 pb-5">
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
    aas: "",
    bbs: "",
    ccs: "",
    dds: "",
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
      v => !!v || "公里數必須填寫",
      v => v.length > 0 || "公里數必須大於0"
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
        aa: "2020-08-08",
        bb: 12,
        cc: 36,
        dd: "V",
        ee: "V",
        ff: "V",
        gg: "V",
        hh: "王大明",
        ii: "阿華"
      }
    ], // 表格資料
    pageOpt: { page: 1 }, // 目前頁數
    headers: [
      // 表格顯示的欄位
      {
        text: "保養日期",
        value: "aa",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        width: "11%"
      },
      {
        text: "使用時數(hr)",
        value: "bb",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        width: "10%"
      },
      {
        text: "累計使用時數",
        value: "cc",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        width: "9.5%"
      },
      {
        text: "機油更換",
        value: "dd",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        width: "10%"
      },
      {
        text: "機油濾清芯子換新",
        value: "ee",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        width: "10%"
      },
      {
        text: "柴油濾清芯子換新",
        value: "ff",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        width: "10%"
      },
      {
        text: "空氣濾清芯子換新",
        value: "gg",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        width: "10%"
      },
      {
        text: "保養人",
        value: "hh",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "車庫主管",
        value: "ii",
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
    ]
  }),
  components: { Pagination }, // 頁碼

  methods: {
    // 更新資料
    update() {
      this.$emit("chLocation", {});
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 搜尋
    search() {},
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
    }
  }
};
</script>
