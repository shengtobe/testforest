<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4">表單搜尋</h2>

    <v-row class="px-2">
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1"><v-icon class="mr-1 mb-1">mdi-bank</v-icon>科室</h3>
        <v-select
          v-model="department"
          :items="depOpts"
          solo
          hide-details
          @change="chPage(1)"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-comment-processing</v-icon>關鍵字
        </h3>
        <v-text-field
          v-model.trim="keyword"
          placeholder="請輸入關鍵字"
          solo
          hide-details
        ></v-text-field>
      </v-col>

      <v-col cols="12" class="error--text">
        *請點擊「表單名稱」進入管理頁面
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-data-table
            :search="keyword"
            :headers="headers"
            :items="tableItems"
            :options.sync="pageOpt"
            disable-sort
            hide-default-footer
          >
            <template v-slot:no-data>
              <span class="red--text subtitle-1">沒有資料</span>
            </template>

            <template v-slot:no-results>
              <span class="red--text subtitle-1"
                >沒有符合「{{ keyword }}」的資料</span
              >
            </template>

            <!-- headers 的 fid 欄位 (檢視內容) -->
            <template v-slot:item.linkText="{ item }">
              <router-link
                :to="item.path"
                class="text-decoration-none text-subtitle-1 grey--text text--darken-3"
              >
                {{ item.linkText }}
              </router-link>
            </template>

            <!-- 頁碼 -->
            <template v-slot:footer="footer">
              <Pagination
                :footer="footer"
                :pageOpt="pageOpt"
                @chPage="chPage"
              />
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { FormServeRouter } from "@/router/moduleRouter/form/serve";
import { FormMaintainRouter } from "@/router/moduleRouter/form/maintain";
import { FormCuringRouter } from "@/router/moduleRouter/form/curing";
import { FormLaborRouter } from "@/router/moduleRouter/form/labor";
import Pagination from "@/components/Pagination.vue";

export default {
  data: () => ({
    allRouters: [], // 所有路由
    department: "serve", // 科室
    depOpts: [
      // 科室下拉選單
      { text: "鐵路服務科", value: "serve" },
      { text: "鐵路維護科", value: "maintain" },
      { text: "車輛養護科", value: "curing" },
      { text: "職安衛", value: "labor" },
    ],
    keyword: "", // 關鍵字
    pageOpt: { page: 1 }, // 目前頁數
    headers: [
      // 表格顯示的欄位
      {
        text: "項次",
        value: "idx",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        width: 80,
      },
      {
        text: "表單名稱",
        value: "linkText",
        align: "left",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
    ],
  }),
  components: { Pagination },
  watch: {
    // 若有用關鍵字過濾，指定頁碼回到第1頁
    keyword: function (val, oldval) {
      if (val != oldval) this.chPage(1);
    },
  },
  computed: {
    // 表格資料
    tableItems() {
      // 過瀘資料
      let arr = this.allRouters.filter((item) =>
        item.formGroup.includes(this.department)
      );

      // 加項次
      return arr.map((item, idx) => {
        if ("params" in item) {
          item.path = item.path + "?";
          for (let index = 0; index < item.params.length; index++) {
            const element = item.params[index];
            item.path += element.key + "=" + element.value;
            if (index != item.params.length - 1) {
              item.path += "&";
            }
          }
        }
        return {
          idx: idx + 1,
          ...item,
        };
      });
    },
  },
  methods: {
    // 初始化資料
    initData() {
      this.allRouters = [
        // 組合所有路由
        ...FormServeRouter,
        ...FormMaintainRouter,
        ...FormCuringRouter,
        ...FormLaborRouter,
      ];
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
  },
  created() {
    this.initData();
  },
};
</script>