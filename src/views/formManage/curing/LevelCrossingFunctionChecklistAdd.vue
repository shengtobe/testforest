<template>
  <v-sheet class="ma-4 mb-8" color="yellow lighten-2">
    <v-container style="max-width: 1200px" class="px-8">
      <p class="font-weight-black title text-center">新增{{ newText }}</p>
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
                <v-text-field
                  v-model.trim="AddData.MaintenanceDay"
                  outlined
                  v-on="on"
                  dense
                  single-line
                />
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
        <!-- 選擇軌段 勾選CheckBox
        <v-row justify="space-around">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">
                <v-checkbox v-model="val1" label="1" />
              </span>
            </template>
            <span>0km0-100m</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">
                <v-checkbox v-model="val2" label="2"></v-checkbox>
              </span>
            </template>
            <span>0km520m</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">
                <v-checkbox v-model="val3" label="3"></v-checkbox>
              </span>
            </template>
            <span>0km550m</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">
                <v-checkbox v-model="val4" label="4"></v-checkbox>
              </span>
            </template>
            <span>0km600m</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">
                <v-checkbox v-model="val5" label="5"></v-checkbox>
              </span>
            </template>
            <span>0km700m</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">
                <v-checkbox v-model="val5" label="5"></v-checkbox>
              </span>
            </template>
            <span>0km700m</span>
          </v-tooltip>
          <v-checkbox label="1" />
          <v-checkbox label="2" />
          <v-checkbox label="3" />
          <v-checkbox label="4" />
          <v-checkbox label="5" />
          <v-checkbox label="6" />
          <v-checkbox label="7-1庫" />
          <v-checkbox label="7-1" />
          <v-checkbox label="7-2" />
          <v-checkbox label="8" />
          <v-checkbox label="9" />
          <v-checkbox label="10" />
          <v-checkbox label="11" />
          <v-checkbox label="12" />
          <v-checkbox label="13" />
          <v-checkbox label="14" />
          <v-checkbox label="15" />
          <v-checkbox label="15-1" />
          <v-checkbox label="16" />
          <v-checkbox label="17" />
          <v-checkbox label="18" />
          <v-checkbox label="19" />
          <v-checkbox label="20" />
        </v-row>-->

        <!-- 軌段檢查 -->
        <!-- 1 -->
        <test1007
          titlekm="123"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <test1007
          titlekm="2"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
        />
        <test1007
          titlekm="3"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
        />
        <test1007
          titlekm="8"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide8="true"
          hide7="true"
        />
        <!-- 送出 -->
        <v-col class="mt-2" cols="12">
          <v-btn large block class="mt-n8 mb-4" color="success">送出表單</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import test1007 from "@/components/test1007.vue";

export default {
  data() {
    return {
      val1: false,
      title: "",
      newText: "工作日誌",
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
  components: { Pagination, test1007 }, // 頁碼
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
.aa {
  width: 20%;
}
@media only screen and (max-width: 600px) {
  .xwd {
    max-width: 100%;
  }
  .aa {
    width: 100%;
    flex-basis: auto;
  }
}
</style>