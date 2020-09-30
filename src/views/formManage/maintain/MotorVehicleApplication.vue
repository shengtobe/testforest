<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2">
      <!-- 檢查日期起 -->
      <v-col cols="12" sm="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>檢查日期(起)
        </h3>
        <v-menu
          v-model="QueryDayStart"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="QueryData.CheckDayStart" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="QueryData.CheckDayStart"
            @input="QueryDay = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <!-- 檢查日期迄 -->
      <v-col cols="12" sm="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>檢查日期(迄)
        </h3>
        <v-menu
          v-model="QueryDayEnd"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="QueryData.CheckDayEnd" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="QueryData.CheckDayEnd"
            @input="QueryDayEnd = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <!-- 管理單位 -->
      <v-col cols="12" sm="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>管理單位
        </h3>
        <v-select
          :items="[{ text: '資訊科', value: 'A' }, { text: '資訊科2', value: 'B' }, { text: '資訊科3', value: 'C' }, { text: '資訊科4', value: 'D' }, { text: 'A0005', value: 'E' }]"
          solo
          v-model="QueryData.Department"
        />
      </v-col>
      <!-- 查詢 -->
      <v-col cols="12" sm="3" class="d-flex align-end">
        <v-btn color="green" dark large class="mb-sm-8 mb-md-8" @click="search">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
      </v-col>

      <!-- 檔案上傳 -->
      <v-col cols="12" sm="3">
        <v-form ref="uploadform">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-file</v-icon>檔案上傳
          </h3>
          <v-text-field solo placeholder="點此選擇檔案" />
        </v-form>
      </v-col>
      <v-col cols="12" sm="3" class="d-flex align-end">
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
          <v-icon>mdi-plus</v-icon>
          新增{{ newText }}
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
    <!-- 新增機動道班台車使用申請書 modal -->
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
            <!-- 檢查項目 -->
            <v-col cols="12">
              <!-- 申請日期、車種 -->
              <v-row no-gutter class="indigo--text">
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">申請日期</h3>
                  <v-menu
                    v-model="ApplicationDay"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="250px"
                    min-width="250px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model.trim="AddData.ApplicationDay" solo v-on="on" readonly />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.ApplicationDay"
                      @input="ApplicationDay = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">車種</h3>
                  <v-radio-group dense row class="pa-0 ma-0 mt-3" v-model="AddData.Vehicles">
                    <v-radio color="success" label="機動道班台車" value="1" />
                    <v-radio color="red" label="手推車" value="2" />
                  </v-radio-group>
                </v-col>
              </v-row>
              <!-- 單位、職稱、申請人 -->
              <v-row no-gutter class="indigo--text">
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">單位</h3>
                  <v-text-field solo v-model="AddData.Department" />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">職稱</h3>
                  <v-text-field solo v-model="AddData.JobTitle" />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">申請人</h3>
                  <v-text-field solo v-model="AddData.Applicant" />
                </v-col>
              </v-row>
              <!-- 使用區間地點 -->
              <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6">
                <v-row no-gutter>
                  <!-- 站內 -->
                  <v-col cols="12">
                    <h3 class="mb-1">使用區間地點-站內</h3>
                  </v-col>
                  <v-col cols="12" class="fkj">
                    <v-col cols="12" sm="3" style="display: flex;">
                      <span class="mt-3 mr-2">自</span>
                      <v-text-field solo v-model="AddData.Inside.Site1" />
                      <span class="mt-3 ml-2">站</span>
                    </v-col>
                    <v-col cols="12" sm="5" style="display: flex;">
                      <span class="mt-3 mr-2">至</span>
                      <v-text-field solo v-model="AddData.Inside.Site2" />
                      <span class="mt-3 ml-2">站間</span>
                    </v-col>
                    <v-col cols="12" sm="4" style="display: flex;">
                      <v-text-field solo v-model="AddData.Inside.Kilometer" />
                      <span class="mt-3 ml-2">公里</span>
                    </v-col>
                  </v-col>
                  <!-- 站外 -->
                  <v-col cols="12">
                    <h3 class="mb-1">使用區間地點-站外</h3>
                  </v-col>
                  <v-col cols="12" class="fkj">
                    <v-col cols="12" sm="4" style="display: flex;">
                      <v-text-field solo v-model="AddData.Outer.Road" />
                      <span class="mt-3 ml-2">股道</span>
                    </v-col>
                    <v-col cols="12" sm="7">
                      <v-radio-group
                        dense
                        row
                        class="pa-0 ma-0 mt-3"
                        v-model="AddData.Outer.UpDown"
                      >
                        <v-radio color="success" label="上山端" value="1" />
                        <v-radio color="red" label="下山端" value="2" />
                      </v-radio-group>
                    </v-col>
                  </v-col>
                </v-row>
              </v-alert>
              <!-- 時間 -->
              <v-col cols="12">
                <h3 class="mb-1 indigo--text">使用時間</h3>
              </v-col>
              <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6">
                <v-row no-gutter>
                  <h3 class="mb-1">列車空隔</h3>
                  <v-col cols="12" class="fkj">
                    <v-col cols="12" sm="4" style="display: flex;">
                      <v-text-field solo v-model="AddData.UsageTime.Train1" />
                      <span class="mt-3 ml-2">次車</span>
                    </v-col>
                    <v-col cols="12" sm="5" style="display: flex;">
                      <span class="mt-3 mr-2">與</span>
                      <v-text-field solo v-model="AddData.UsageTime.Train2" />
                      <span class="mt-3 ml-2">次車間</span>
                    </v-col>
                  </v-col>
                  <v-col cols="12" class="fkj">
                    <!-- 日期 -->
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">時間日期</h3>
                      <v-menu
                        v-model="UsageTimeDay"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        max-width="250px"
                        min-width="250px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model.trim="AddData.UsageTime.TimeDay"
                            solo
                            v-on="on"
                            readonly
                          />
                        </template>
                        <v-date-picker
                          color="purple"
                          v-model="AddData.UsageTime.TimeDay"
                          @input="UsageTimeDay = false"
                          locale="zh-tw"
                        />
                      </v-menu>
                    </v-col>
                    <!-- 上午 -->
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">上午</h3>
                      <div style="display: flex;">
                        <span class="mt-3 mr-2">往</span>
                        <v-text-field type="number" solo v-model="AddData.UsageTime.MrningGoT" />
                        <span class="mt-3 mr-2 ml-2">時</span>
                        <v-text-field type="number" solo v-model="AddData.UsageTime.MrningGoM" />
                        <span class="mt-3 ml-2">分</span>
                      </div>
                      <div style="display: flex;">
                        <span class="mt-3 mr-2">返</span>
                        <v-text-field type="number" solo v-model="AddData.UsageTime.MrningReturnT" />
                        <span class="mt-3 mr-2 ml-2">時</span>
                        <v-text-field type="number" solo v-model="AddData.UsageTime.MrningReturnM" />
                        <span class="mt-3 ml-2">分</span>
                      </div>
                    </v-col>
                    <!-- 下午 -->
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">下午</h3>
                      <div style="display: flex;">
                        <span class="mt-3 mr-2">往</span>
                        <v-text-field type="number" solo v-model="AddData.UsageTime.AfternoonGoT" />
                        <span class="mt-3 mr-2 ml-2">時</span>
                        <v-text-field type="number" solo v-model="AddData.UsageTime.AfternoonGoM" />
                        <span class="mt-3 ml-2">分</span>
                      </div>
                      <div style="display: flex;">
                        <span class="mt-3 mr-2">返</span>
                        <v-text-field
                          type="number"
                          solo
                          v-model="AddData.UsageTime.AfternoonReturnT"
                        />
                        <span class="mt-3 mr-2 ml-2">時</span>
                        <v-text-field
                          type="number"
                          solo
                          v-model="AddData.UsageTime.AfternoonReturnM"
                        />
                        <span class="mt-3 ml-2">分</span>
                      </div>
                    </v-col>
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
            <!-- 目的、輛數、記事 -->
            <v-col cols="12" sm="4">
              <h3 class="mb-1 indigo--text">使用目的</h3>
              <v-textarea auto-grow outlined rows="4" v-model="AddData.Purpose" />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1 indigo--text">輛數</h3>
              <v-textarea auto-grow outlined rows="4" v-model="AddData.VehiclesNumber" />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1 indigo--text">記事</h3>
              <v-textarea auto-grow outlined rows="4" v-model="AddData.Note" />
            </v-col>
            <!-- END 檢查項目 -->
          </v-row>
        </div>

        <v-card-actions class="px-5 pb-5">
          <v-spacer></v-spacer>
          <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
          <v-btn color="success" elevation="4" @click="save">送出</v-btn>
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
      title: "機動道班台車使用申請書",
      newText: "申請書",
      QueryDayStart: "",
      QueryDayEnd: "",
      QueryData: {
        CheckDayStart: "",
        CheckDayEnd: "",
        Department: "",
      },
      ApplicationDay: "",
      UsageTimeDay: "",
      AddData: {
        ApplicationDay: "",
        Vehicles: 0,
        Department: "",
        JobTitle: "",
        Applicant: "",
        Inside: {
          Site1: "",
          Site2: "",
          Kilometer: "",
        },
        Outer: {
          Road: "",
          UpDown: "",
        },
        UsageTime: {
          Train1: "",
          Train2: "",
          TimeDay: "",
          MrningGoT: "",
          MrningGoM: "",
          MrningReturnT: "",
          MrningReturnM: "",
          AfternoonGoT: "",
          AfternoonGoM: "",
          AfternoonReturnT: "",
          AfternoonReturnM: "",
        },
        Purpose: "",
        VehiclesNumber: 0,
        Note: "",
      },
      Add: false,
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
    },
    save() {},
  },
};
</script>

<style>
.fkj {
  display: flex;
}
@media only screen and (max-width: 600px) {
  .fkj {
    display: contents;
  }
}
</style>