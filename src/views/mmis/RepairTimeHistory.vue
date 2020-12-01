<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4">維修工時履歷</h2>

    <v-row class="px-2 mb-8">
      <!-- 查詢時間(起訖) -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>查詢時間(起)
        </h3>
        <v-menu
          v-model="RepaStartDayirDay"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="searchIpt.StartDay" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="searchIpt.StartDay"
            @input="StartDay = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>

      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>查詢時間(迄)
        </h3>
        <v-menu
          v-model="EndDay"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="searchIpt.EndDay" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="searchIpt.EndDay"
            @input="EndDay = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>

      <!-- WBS -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-message-processing</v-icon>設備標示編號(WBS)
        </h3>
        <v-text-field v-model.trim="searchIpt.wbs" solo />
      </v-col>

      <!-- 科室 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-contacts</v-icon>科室
        </h3>
        <v-text-field v-model.trim="searchIpt.Dept" solo />
      </v-col>

      <!-- 立單日期 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>立單日期
        </h3>
        <v-menu
          v-model="Established"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="searchIpt.Established" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="searchIpt.Established"
            @input="Established = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>

      <v-col cols="12">
        <v-divider class="mt-2 mb-3" />
      </v-col>
      <!-- 派工時間 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-av-timer</v-icon>派工時間
        </h3>
        <v-menu
          v-model="scheduleDate"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="searchIpt.scheduleDate" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="searchIpt.scheduleDate"
            @input="scheduleDate = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <!-- 到修時間 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-av-timer</v-icon>到修時間
        </h3>
        <v-menu
          v-model="RepairDate"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="searchIpt.RepairDate" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="searchIpt.RepairDate"
            @input="RepairDate = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <!-- 動工時間 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-av-timer</v-icon>動工時間
        </h3>
        <v-menu
          v-model="StartWorkDate"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="searchIpt.StartWorkDate" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="searchIpt.StartWorkDate"
            @input="StartWorkDate = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <!-- 完工時間 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-av-timer</v-icon>完工時間
        </h3>
        <v-menu
          v-model="FinishedDate"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="searchIpt.FinishedDate" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="searchIpt.FinishedDate"
            @input="FinishedDate = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <!-- 驗收時間 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-av-timer</v-icon>驗收時間
        </h3>
        <v-menu
          v-model="AcceptanceDate"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="searchIpt.AcceptanceDate" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="searchIpt.AcceptanceDate"
            @input="AcceptanceDate = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <!-- 結案時間 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-av-timer</v-icon>結案時間
        </h3>
        <v-menu
          v-model="closDate"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="searchIpt.closDate" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="searchIpt.closDate"
            @input="closDate = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <!-- 維修總工時 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-screwdriver</v-icon>維修總工時
        </h3>
        <v-text-field type="number" min="0" v-model.trim="searchIpt.Material" solo />
      </v-col>

      <v-col cols="12" class="mb-8">
        <v-btn color="success" large class="mr-3" @click="search">
          <v-icon>mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn elevation="2" large @click="reset">
          <v-icon>mdi-reload</v-icon>清除搜尋內容
        </v-btn>
      </v-col>

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

            <template v-slot:item.ViewTicket="{ item }">
              <v-btn fab small dark color="teal" @click="view(item)">
                <v-icon>mdi-file-document</v-icon>
              </v-btn>
            </template>

            <template v-slot:item.action="{ item }">
              <v-btn fab small color="primary" class="mr-2" @click="Edit = true">
                <v-icon>mdi-pen</v-icon>
              </v-btn>

              <v-btn fab small color="error" @click="Delete = true">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>

            <!-- 頁碼 -->
            <template v-slot:footer="footer">
              <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- 檢視工單 -->
    <v-dialog v-model="contentShow" max-width="500px">
      <v-card>
        <v-card-title class="yellow darken-1 px-4 py-1">
          檢視工單
          <v-spacer />
          <v-btn fab small text @click="contentShow = false" class="mr-n2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <div class="px-4 py-3">
          <v-row no-gutters>
            <v-col cols="12">
              <v-icon class="mr-1 mb-1">mdi-clipboard-text</v-icon>
              工單編號： {{ content.WorkNumber }}
            </v-col>
            <v-col cols="12">
              <v-divider class="mt-2 mb-3" />
            </v-col>
            <v-col cols="12">
              <v-icon class="mr-1 mb-1">mdi-more</v-icon>
              設備標示編號： {{ content.wbs }}
            </v-col>
            <v-col cols="12">
              <v-divider class="mt-2 mb-3" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-icon class="mr-1 mb-1">mdi-domain</v-icon>
              科室： {{ content.Dept }}
            </v-col>
            <v-col cols="12" sm="6">
              <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>
              立單日期： {{ content.Established }}
            </v-col>
            <v-col cols="12">
              <v-divider class="mt-2 mb-3" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-icon class="mr-1 mb-1">mdi-av-timer</v-icon>
              派工時間： {{ content.scheduleDate }}
            </v-col>
            <v-col cols="12" sm="6">
              <v-icon class="mr-1 mb-1">mdi-av-timer</v-icon>
              到修時間： {{ content.RepairDate }}
            </v-col>
            <v-col cols="12">
              <v-divider class="mt-2 mb-3" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-icon class="mr-1 mb-1">mdi-av-timer</v-icon>
              動工時間： {{ content.StartWorkDate }}
            </v-col>
            <v-col cols="12" sm="6">
              <v-icon class="mr-1 mb-1">mdi-av-timer</v-icon>
              完工時間： {{ content.FinishedDate }}
            </v-col>
            <v-col cols="12">
              <v-divider class="mt-2 mb-3" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-icon class="mr-1 mb-1">mdi-av-timer</v-icon>
              驗收時間： {{ content.AcceptanceDate }}
            </v-col>
            <v-col cols="12" sm="6">
              <v-icon class="mr-1 mb-1">mdi-av-timer</v-icon>
              結案時間： {{ content.closDate }}
            </v-col>
            <v-col cols="12">
              <v-divider class="mt-2 mb-3" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-icon class="mr-1 mb-1">mdi-timetable</v-icon>
              維修總工時： {{ content.WorkTotalHours }}
            </v-col>
            <v-col cols="12">
              <v-divider class="mt-2 mb-3" />
            </v-col>
            <v-col cols="12">
              <v-icon class="mr-1 mb-1">mdi-comment-alert-outline</v-icon>
              故障描述： {{ content.FaultDepict }}
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Pagination from "@/components/Pagination.vue";

export default {
  data: () => ({
    searchIpt: {
      // 搜尋欄位
      EndDay: "",
      StartDay: "",
      wbs: "",
      Dept: "",
      Material: "",
      schedulehour: "",
      schedulemin: "",
      scheduleDate: "",
      RepairDate: "",
      StartWorkDate: "",
      FinishedDate: "",
      AcceptanceDate: "",
      closDate: "",
    },
    tableItems: [
      {
        id: "1",
        WorkNumber: "AA_201011",
        wbs: "PTT-UCC-NUK-168",
        Dept: "養護科",
        Established: "2020-10-10",
        scheduleDate: "2020-10-12",
        RepairDate: "2020-10-16",
        StartWorkDate: "2020-10-20",
        FinishedDate: "2020-10-25",
        AcceptanceDate: "2020-10-28",
        closDate: "2020-10-30",
        WorkTotalHours: 80,
        FaultDepict: "螺帽些許鬆動"
      },
      {
        id: "2",
        WorkNumber: "AA_201012",
        wbs: "PTT-UCC-NUK-160",
        Dept: "養護科",
        Established: "2020-11-10",
        scheduleDate: "2020-11-12",
        RepairDate: "2020-11-16",
        StartWorkDate: "2020-11-20",
        FinishedDate: "2020-11-25",
        AcceptanceDate: "2020-11-28",
        closDate: "2020-11-30",
        WorkTotalHours: 80,
        FaultDepict: "螺帽些許鬆動"
      },
    ], // 表格資料
    pageOpt: { page: 1 }, // 目前頁數
    headers: [
      // 表格顯示的欄位
      {
        text: "項次",
        value: "id",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "工單編號",
        value: "WorkNumber",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "科室",
        value: "Dept",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "設備標示編號",
        value: "wbs",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "立單日期",
        value: "Established",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "檢視工單",
        value: "ViewTicket",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
    ],
    contentShow: false, // 詳細內容 dialog 是否顯示
    content: {}, // 詳細內容欄位
  }),
  components: { Pagination }, // 頁碼
  computed: {},
  methods: {
    // 搜尋
    search() {},
    // 清除搜尋內容
    reset() {
      this.searchIpt.EndDay = "";
      this.searchIpt.StartDay = "";
      this.searchIpt.wbs = "";
      this.searchIpt.Dept = "";
      this.searchIpt.Material = "";
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 送出
    save() {},
    close() {},
    // 顯示詳細資訊
    view(item) {
      this.contentShow = true;
      this.content = { ...item };
    },
  },
};
</script>
