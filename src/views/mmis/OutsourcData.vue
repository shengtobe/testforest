<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4">外包廠商資料管理</h2>

    <v-divider class="mx-2 mt-5 mb-4" />

    <v-row class="px-2">
      <!-- 控制措施 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-bank</v-icon>單位
        </h3>
        <v-select solo hide-details :items="selectdata" />
      </v-col>

      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn color="green" dark large>
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn color="indigo" dark large class="ml-2" @click="Add = true">
          <v-icon class="mr-1">mdi-plus</v-icon>新增
        </v-btn>
      </v-col>

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

            <template v-slot:item.a5>
              <v-btn
                title="編輯"
                class="mr-2"
                small
                dark
                fab
                color="info darken-1"
                @click="Edit = true"
              >
                <v-icon dark>mdi-pen</v-icon>
              </v-btn>
               <v-btn fab small color="error" @click="Delete = true">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>

            <template v-slot:footer="footer">
              <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
            </template>
          </v-data-table>
        </v-card>
      </v-col>

      <!-- 新增外包廠商資料 modal -->
      <v-dialog v-model="Add" max-width="900px">
        <v-card>
          <v-card-title class="blue white--text px-4 py-1">
            新增外包廠商資料
            <v-spacer></v-spacer>
            <v-btn dark fab small text @click="close" class="mr-n2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <div class="px-6 py-4">
            <v-row>
              <!-- 檢查項目 -->
              <v-col cols="12">
                <v-row no-gutter class="indigo--text">
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">負責單位</h3>
                    <v-text-field solo value readonly />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">廠商名稱</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">負責人</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">電話</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">統一編號</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">備註</h3>
                    <v-text-field solo />
                  </v-col>
                </v-row>
              </v-col>
              <!-- END 檢查項目 -->
            </v-row>
          </div>
          <v-card-actions class="px-5 pb-5">
            <v-spacer></v-spacer>
            <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
            <v-btn color="success" elevation="4" :loading="isLoading">送出</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 編輯資料 modal -->
      <v-dialog v-model="Edit" max-width="900px">
        <v-card>
          <v-card-title class="blue white--text px-4 py-1">
            編輯外包廠商資料
            <v-spacer></v-spacer>
            <v-btn dark fab small text @click="close" class="mr-n2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <div class="px-6 py-4">
            <v-row>
              <!-- 檢查項目 -->
              <v-col cols="12">
                <v-row no-gutter class="indigo--text">
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">負責單位</h3>
                    <v-text-field solo value readonly />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">廠商名稱</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">負責人</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">電話</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">統一編號</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">備註</h3>
                    <v-text-field solo />
                  </v-col>
                </v-row>
              </v-col>
              <!-- END 檢查項目 -->
            </v-row>
          </div>
          <v-card-actions class="px-5 pb-5">
            <v-spacer></v-spacer>
            <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
            <v-btn color="success" elevation="4" :loading="isLoading">送出</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 刪除 modal -->
      <v-dialog v-model="Delete" persistent max-width="290">
        <v-card>
          <v-card-title class="red white--text px-4 py-1 headline">確認是否刪除?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="close">取消</v-btn>
            <v-btn color="success">刪除</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import Pagination from "@/components/Pagination.vue";

export default {
  data: () => ({
    Add: false,
    Edit: false,
      Delete: false,
    pageOpt: { page: 1 },
    tableItems: [
      {
        id: "1",
        a11: "服務科",
        a10: "廠商A",
        a9: "Bill",
        a8: "(07)333-1234",
        a7: "",
        a6: "",
      },
      {
        id: "2",
        a11: "服務科",
        a10: "廠商B",
        a9: "Tom",
        a8: "(07)333-2222",
        a7: "",
        a6: "",
      },
      {
        id: "3",
        a11: "服務科",
        a10: "廠商C",
        a9: "Mom",
        a8: "(07)333-3333",
        a7: "",
        a6: "",
      },
      {
        id: "4",
        a11: "服務科",
        a10: "廠商D",
        a9: "May",
        a8: "(07)333-4444",
        a7: "",
        a6: "",
      },
      {
        id: "5",
        a11: "服務科",
        a10: "廠商E",
        a9: "Amy",
        a8: "(07)333-5555",
        a7: "",
        a6: "",
      },
      {
        id: "6",
        a11: "服務科",
        a10: "廠商F",
        a9: "Peter",
        a8: "(07)333-6666",
        a7: "",
        a6: "",
      },
    ],
    selectdata: ["維修科", "養護科"],
    headers: [
      {
        text: "項次",
        value: "id",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "負責單位",
        value: "a11",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "廠商名稱",
        value: "a10",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "負責人",
        value: "a9",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "電話",
        value: "a8",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "統一編號",
        value: "a7",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "備註",
        value: "a6",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "修改、刪除",
        value: "a5",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
    ],
  }),
  components: {
    Pagination,
  },
  methods: {
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    close() {
      this.Add = false;
      this.Edit = false;
      this.Delete = false;
    },
  },
  created() {},
};
</script>
