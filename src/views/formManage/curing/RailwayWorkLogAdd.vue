<template>
  <v-sheet class="ma-4 mb-8" color="yellow lighten-2">
    <v-container style="max-width: 1200px" class="px-8">
      <p class="font-weight-black title text-center">新增工作日誌</p>
      <v-row class="white px-4">
        <!-- 基本資料 -->
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
          <v-col cols="12" sm="3">
            <h3 class="mb-1">天氣</h3>
            <v-select dense single-line :items="Weather" outlined />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">現場工作負責人職稱</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">姓名</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">工作項目</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">工作地點</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="6" sm="2" class="xwd">
            <h3 class="mb-1">全班人數</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
          <v-col cols="6" sm="2" class="xwd">
            <h3 class="mb-1">出勤人數</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
        </v-row>
        <!-- 人員出勤狀態 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="6" sm="1">
            <h3 class="mb-1">休假</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
          <v-col cols="6" sm="1">
            <h3 class="mb-1">病假</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
          <v-col cols="6" sm="1">
            <h3 class="mb-1">事假</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
          <v-col cols="6" sm="1">
            <h3 class="mb-1">公假</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
          <v-col cols="6" sm="1">
            <h3 class="mb-1">助勤</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
          <v-col cols="6" sm="1">
            <h3 class="mb-1">公出</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
          <v-col cols="6" sm="1">
            <h3 class="mb-1">夜休</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
          <v-col cols="6" sm="1">
            <h3 class="mb-1">出差</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
          <v-col cols="6" sm="1">
            <h3 class="mb-1">查道</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
          <v-col cols="6" sm="2">
            <h3 class="mb-1">遲到早退</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">其他</h3>
            <v-text-field dense single-line outlined />
          </v-col>
        </v-row>
        <!-- 出料 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12">
            <h3>出料</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">名稱</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">單位</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">數量</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 進料 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12">
            <h3>進料</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">名稱</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">單位</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">數量</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 舊料 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12">
            <h3>舊料</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">名稱</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">單位</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">回收數量</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">退段數量</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
              <v-row no-gutter>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">名稱</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">單位</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">回收數量</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">退段數量</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 使用機具 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12">
            <h3>本日使用機具</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row justify="space-around">
                <v-checkbox class="col-6 col-md-3" label="1.起道機" />
                <v-checkbox class="col-6 col-md-3" label="2.砸道機" />
                <v-checkbox class="col-6 col-md-3" label="3.電機" />
                <v-checkbox class="col-6 col-md-3" label="4.鋸軌機" />
                <v-checkbox class="col-6 col-md-3" label="5.鑽孔機" />
                <v-checkbox class="col-6 col-md-3" label="6.割草機" />
                <v-checkbox class="col-6 col-md-3" label="7.噴霧器" />
                <v-checkbox class="col-6 col-md-3" label="8.螺栓擰緊器" />
                <v-checkbox class="col-6 col-md-3" label="9.起釘撬棍" />
                <v-checkbox class="col-6 col-md-3" label="10.洋鎬" />
                <v-checkbox class="col-6 col-md-3" label="11.大槌" />
                <v-checkbox class="col-6 col-md-3" label="12.水平軌距尺" />
                <v-checkbox class="col-6 col-md-3" label="13.洋鏟" />
                <v-checkbox class="col-6 col-md-3" label="14.鏈鋸機" />
                <v-checkbox class="col-6 col-md-3" label="15.鐵担車" />
                <v-checkbox class="col-6 col-md-3" label="16.平車" />
                <v-checkbox class="col-6 col-md-3" label="17.吊軌器" />
                <v-checkbox class="col-6 col-md-3" label="18.彎軌器" />
                <v-checkbox class="col-6 col-md-3" label="19.電動砂輪機" />
                <v-checkbox class="col-6 col-md-3" label="20.鈍孔機" />
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 工具及材料檢查 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12">
            <h3>工具及材料檢查</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">1.工具及材料檢查</h3>
                  <v-radio-group v-model="row" row>
                    <v-radio label="正常" value="radio-1" />
                    <v-radio label="異常" value="radio-2" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">2.其他機具</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">3.異常機具(填機具代號)</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
              <h3 class="mb-1">4.機具使用前檢查</h3>
              <v-row no-gutter>
                <v-col cols="12" sm="3">
                  <h4 class="mb-1">(1)機油</h4>
                  <v-radio-group v-model="row" row>
                    <v-radio label="正常" value="radio-1" />
                    <v-radio label="異常" value="radio-2" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3">
                  <h4 class="mb-1">(2)油料</h4>
                  <v-radio-group v-model="row" row>
                    <v-radio label="正常" value="radio-1" />
                    <v-radio label="異常" value="radio-2" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3">
                  <h4 class="mb-1">(3)油壓及線路</h4>
                  <v-radio-group v-model="row" row>
                    <v-radio label="正常" value="radio-1" />
                    <v-radio label="異常" value="radio-2" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3">
                  <h4 class="mb-1">(4)啟動及運轉情形</h4>
                  <v-radio-group v-model="row" row>
                    <v-radio label="正常" value="radio-1" />
                    <v-radio label="異常" value="radio-2" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3">
                  <h4 class="mb-1">(5)各部位螺栓鬆緊</h4>
                  <v-radio-group v-model="row" row>
                    <v-radio label="正常" value="radio-1" />
                    <v-radio label="異常" value="radio-2" />
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 其餘檢查 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12">
            <h3>其餘檢查</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-col cols="12">
                <h4>(1)行前檢查</h4>
                <v-row no-gutter justify="space-around">
                  <v-checkbox class="col-12 col-md-4" label="人員安全配備檢查" />
                  <v-checkbox class="col-12 col-md-4" label="行車調度無線電話機測試" />
                  <v-checkbox class="col-12 col-md-4" label="已辦妥進入路線內申請" />
                </v-row>
              </v-col>
              <v-col cols="12">
                <h4>(2)暸望員安全配戴</h4>
                <v-row no-gutter justify="space-around">
                  <v-checkbox class="col-6 col-md-3" label="臂章" />
                  <v-checkbox class="col-6 col-md-3" label="無線電對講機" />
                  <v-checkbox class="col-6 col-md-3" label="哨子" />
                  <v-checkbox class="col-6 col-md-3" label="號誌旗(燈)" />
                </v-row>
              </v-col>
              <v-col cols="12">
                <h4>(3)豎立工作鳴笛牌位置</h4>
                <v-text-field dense single-line outlined />
              </v-col>
              <v-col cols="12">
                <h4>(4)接地桿操作者安全配戴</h4>
                <v-row no-gutter justify="space-around">
                  <v-checkbox class="col-12 col-md-4" label="絕緣手套" />
                  <v-checkbox class="col-12 col-md-4" label="羊皮手套" />
                  <v-checkbox class="col-12 col-md-4" label="安全皮鞋" />
                </v-row>
              </v-col>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 送出 -->
        <!-- <div class="mb-3">
          <v-btn class="mr-2" elevation="4" @click="closeWorkLogModal">取消</v-btn>
          <v-btn color="success" elevation="4">送出</v-btn>
        </div>-->
      </v-row>
    </v-container>
  </v-sheet>
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
      Weather: ["晴天", "陰天", "雨天"],
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
    addSupervisor() {},
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
.xwd {
  max-width: 13%;
}
@media only screen and (max-width: 600px) {
  .xwd {
    max-width: 100%;
  }
}
</style>