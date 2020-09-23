<template>
  <v-container style="max-width: 1200px">
    <!-- 標題 -->
    <h2 class="mb-4 px-2">鐵路維護科工作日誌</h2>
    <!-- 查詢區塊 -->
    <v-row class="px-2">
      <!-- 日期-起 -->
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>檢查日期(起)
        </h3>
        <v-menu
          v-model="CheckdayOn"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="QueryCheckdayOn" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="QueryCheckdayOn"
            @input="CheckdayOn = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <!-- 日期-迄 -->
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>檢查日期(迄)
        </h3>
        <v-menu
          v-model="CheckdayOff"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="QueryCheckdayOff" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="QueryCheckdayOff"
            @input="CheckdayOff = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <!-- 功能 -->
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn color="green" dark large class="mb-sm-8 mb-md-8">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn
          class="ml-4 ml-sm-4 ml-md-4 mb-sm-8 mb-md-8"
          color="indigo"
          elevation="3"
          dark
          large
          @click="AddWorkLogModal = true"
        >
          <v-icon>mdi-plus</v-icon>新增工作日誌
        </v-btn>
      </v-col>
    </v-row>
    <!-- 查詢結果 -->
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
              @click="AddWorkLogModal = true"
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
    <!-- 新增工作日誌 modal -->
    <v-dialog v-model="AddWorkLogModal" max-width="1060px">
      <v-card>
        <v-card-title class="blue white--text px-4 py-1">
          新增工作日誌
          <v-spacer />
          <v-btn dark fab small text @click="closeWorkLogModal" class="mr-n2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <div class="px-6 py-4">
          <v-row>
            <!-- 檢查項目 -->
            <v-col cols="12">
              <!-- 固定資料 -->
              <v-row no-gutter class="indigo--text">
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">保養日期</h3>
                  <v-menu
                    v-model="MaintenanceDay"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model.trim="AddData.MaintenanceDay" solo v-on="on" readonly />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.MaintenanceDay"
                      @input="MaintenanceDay = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
              </v-row>
              <!-- 摺疊資料 -->
              <v-expansion-panels>
                <!-- 監工區 -->
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">監工區</v-expansion-panel-header>
                  <v-expansion-panel-content>
                  <v-btn color="success" elevation="4" class="mt-1" @click="addSupervisor">增加欄位</v-btn>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="4">
                          <h3 class="mb-1">監工區人員</h3>
                          <v-textarea v-model="data" auto-grow outlined rows="2" />
                        </v-col>
                        <v-col cols="12" sm="4">
                          <h3 class="mb-1">督導或工作地點</h3>
                          <v-textarea auto-grow outlined rows="2" />
                        </v-col>
                        <v-col cols="12" sm="4">
                          <h3 class="mb-1">督導或工作內容</h3>
                          <v-textarea auto-grow outlined rows="2" />
                        </v-col>
                        <v-col cols="6" sm="1">
                          <h3>公差/公出</h3>
                          <v-text-field class="iwidth" type="number" dense single-line outlined />
                        </v-col>
                        <v-col cols="6" sm="1">
                          <h3>公假/受訓</h3>
                          <v-text-field class="iwidth" type="number" dense single-line outlined />
                        </v-col>
                        <v-col cols="6" sm="1">
                          <h3>出勤/支援</h3>
                          <v-text-field class="iwidth" type="number" dense single-line outlined />
                        </v-col>
                        <v-col cols="6" sm="1">
                          <!-- BR 導致手機板跑版 -->
                          <h3>
                            值班
                            <br />
                            <br />
                          </h3>
                          <v-text-field class="iwidth" type="number" dense single-line outlined />
                        </v-col>
                        <v-col cols="6" sm="1">
                          <h3>休假/補休</h3>
                          <v-text-field class="iwidth" type="number" dense single-line outlined />
                        </v-col>
                        <v-col cols="6" sm="1">
                          <h3>病假/事假</h3>
                          <v-text-field class="iwidth" type="number" dense single-line outlined />
                        </v-col>
                        <v-col cols="6" sm="2">
                          <h3>
                            例假日/
                            <br />例假調整
                          </h3>
                          <v-text-field class="iwidth" type="number" dense single-line outlined />
                        </v-col>
                        <v-col cols="12" sm="4">
                          <h3>合計人數：{{ "0人" }}</h3>
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
          <v-spacer />
          <v-btn class="mr-2" elevation="4" @click="closeWorkLogModal">取消</v-btn>
          <v-btn color="success" elevation="4">送出</v-btn>
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
      // 自定義變數
      CheckdayOn: "",
      QueryCheckdayOn: "",
      CheckdayOff: "",
      QueryCheckdayOff: "",
      AddWorkLogModal: false,
      MaintenanceDay: "",
      AddData: {
        // 新增表單資料
        MaintenanceDay: "", // 保養日
      },
      // 系統變數
      pageOpt: { page: 1 }, // 目前頁數
      headers: [
        {
          text: "項次",
          value: "Item",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "檢查日期",
          value: "Checkday",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "審查狀態",
          value: "Review",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "填寫人",
          value: "Name",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "功能",
          value: "Shop",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
      ],
      tableItems: [
        {
          Item: "1",
          Checkday: "2020-08-01",
          Review: "已審查",
          Name: "王大明",
        },
        {
          Item: "2",
          Checkday: "2020-08-10",
          Review: "審查中",
          Name: "王大明",
        },
      ],
    };
  },
  components: { Pagination }, // 頁碼
  methods: {
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 新增監工區塊欄位
    addSupervisor () {

    },
    // 搜尋
    search() {},
    // 關閉 dialogx
    closeWorkLogModal() {
      this.AddWorkLogModal = false;
    },
  },
};
</script>

<style>
.iwidth {
  width: 65px;
}
</style>