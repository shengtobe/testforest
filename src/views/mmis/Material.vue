<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4">料件管理</h2>

    <v-divider class="mx-2 mt-5 mb-4" />

    <v-row class="px-2">
      <!-- 控制措施 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-bank</v-icon>部門
        </h3>
        <v-select solo hide-details />
      </v-col>

      <v-col cols="12" sm="8" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>材料名稱
        </h3>
        <v-text-field solo placeholder="請輸入關鍵字" />
      </v-col>

      <v-col cols="12" md="3" align-self="center">
        <v-btn color="green" dark large>
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn color="indigo" dark large class="ml-2" @click="Add = true">
          <v-icon class="mr-1">mdi-plus</v-icon>新增
        </v-btn>
      </v-col>

      <v-col cols="12">
        <span style="color: red;">*可設定安全庫存數量與單價的數值</span>
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

            <!-- 本月結存數量小於安全庫存量時，系統會特以紅色底色標註提醒使用者 -->
            <template v-slot:item.ViewTicket="{ item }">
              <v-btn fab small dark color="teal" @click="view(item)">
                <v-icon>mdi-file-document</v-icon>
              </v-btn>
            </template>

            <template v-slot:item.a8>
              <v-btn fab small color="primary" class="mr-2" @click="Edit = true">
                <v-icon>mdi-pen</v-icon>
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
      <!-- 詳細資料 -->
      <v-dialog v-model="contentShow" max-width="900px">
        <v-card>
          <v-card-title class="yellow darken-1 px-4 py-1">
            詳細資料
            <v-spacer />
            <v-btn fab small text @click="contentShow = false" class="mr-n2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <div class="px-4 py-3">
            <v-row no-gutters>
              <v-col cols="12">
                <v-icon class="mr-1 mb-1">mdi-clipboard-text</v-icon>
                監工區(廠/庫)： {{ content.Position }}
              </v-col>
              
              <v-col cols="12">
                <v-divider class="mt-2 mb-3" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-more</v-icon>
                班別(組)： {{ content.Group }}
              </v-col>
              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-more</v-icon>
                材料編號： {{ content.Material }}
              </v-col>

              <v-col cols="12">
                <v-divider class="mt-2 mb-3" />
              </v-col>
              <v-col cols="12">
                <v-icon class="mr-1 mb-1">mdi-more</v-icon>
                規範： {{ content.Specification }}
              </v-col>
              <v-col cols="12">
                <v-divider class="mt-2 mb-3" />
              </v-col>

              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-domain</v-icon>
                材料名稱： {{ content.MaterialName }}
              </v-col>

              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-timetable</v-icon>
                單位： {{ content.Dept }}
              </v-col>

              <v-col cols="12">
                <v-divider class="mt-2 mb-3" />
              </v-col>

              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-package-variant-closed</v-icon>
                上月結存數量： {{ content.LastBalance }}
              </v-col>

              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-package-variant</v-icon>
                本月實收數量： {{ content.Paid }}
              </v-col>

              <v-col cols="12">
                <v-divider class="mt-2 mb-3" />
              </v-col>

              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-calendar-check</v-icon>
                本月領用數量： {{ content.Receiving }}
              </v-col>

              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-calendar-multiple-check</v-icon>
                本月結存數量： {{ content.Balance }}
              </v-col>

              <v-col cols="12">
                <v-divider class="mt-2 mb-3" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-calendar-check</v-icon>
                安全庫存數量： {{ content.Stock }}
              </v-col>

              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-calendar-multiple-check</v-icon>
                單價： {{ content.UnitPrice }}
              </v-col>

              <v-col cols="12">
                <v-divider class="mt-2 mb-3" />
              </v-col>
              <v-col cols="12">
                <v-icon class="mr-1 mb-1">mdi-wrench</v-icon>
                備註： {{ content.Remarks }}
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-dialog>
      <!-- 新增料件 modal -->
      <v-dialog v-model="Add" max-width="900px">
        <v-card>
          <v-card-title class="blue white--text px-4 py-1">
            新增料件
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
                    <h3 class="mb-1">監工區(廠/庫)</h3>
                    <v-text-field solo value readonly />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">班別(組)</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">材料編號</h3>
                    <v-text-field solo />
                    <!-- <v-select :items="Type" label="類型" solo /> -->
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">材料名稱</h3>
                    <v-text-field solo />
                    <!-- <v-select :items="Dept" label="單位" solo /> -->
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">規範</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">單位</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">上月結存數量</h3>
                    <v-text-field type="number" min="0" solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">本月實收數量</h3>
                    <v-text-field type="number" min="0" solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">本月領用數量</h3>
                    <v-text-field type="number" min="0" solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">本月結存數量</h3>
                    <v-text-field type="number" min="0" solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">安全庫存數量</h3>
                    <v-text-field type="number" min="0" solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">單價</h3>
                    <v-text-field type="number" min="0" solo />
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
            <v-btn color="success" elevation="4" :loading="isLoading" @click="save">送出</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 編輯資料 modal -->
      <v-dialog v-model="Edit" max-width="900px">
        <v-card>
          <v-card-title class="blue white--text px-4 py-1">
            編輯資料
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
                    <h3 class="mb-1">監工區(廠/庫)</h3>
                    <v-text-field solo value readonly />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">班別(組)</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">材料編號</h3>
                    <v-text-field solo />
                    <!-- <v-select :items="Type" label="類型" solo /> -->
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">材料名稱</h3>
                    <v-text-field solo />
                    <!-- <v-select :items="Dept" label="單位" solo /> -->
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">規範</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">單位</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">上月結存數量</h3>
                    <v-text-field type="number" min="0" solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">本月實收數量</h3>
                    <v-text-field type="number" min="0" solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">本月領用數量</h3>
                    <v-text-field type="number" min="0" solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">本月結存數量</h3>
                    <v-text-field type="number" min="0" solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">安全庫存數量</h3>
                    <v-text-field type="number" min="0" solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">單價</h3>
                    <v-text-field type="number" min="0" solo />
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
  data() {
    return {
      pageOpt: { page: 1 }, // 控制措施權責部門的表格目前頁數
      tableItems: [
        {
          id: "1",
          Position: "奮起湖監工區",
          Group: "1",
          Material: "1",
          MaterialName: "道碴",
          Specification: "",
          Dept: "m³",
          LastBalance: "313",
          Paid: "",
          Receiving: "",
          Balance: 313,
          Stock: 100,
          UnitPrice: 10,
          Remarks: "11/27入帳307立方",
        },
        {
          id: "2",
          Position: "奮起湖監工區",
          Group: "2",
          Material: "2",
          MaterialName: "魚尾鈑螺絲(公)",
          Specification: "",
          Dept: "支",
          LastBalance: "",
          Paid: "",
          Receiving: "",
          Balance: "",
          Stock: "",
          UnitPrice: "",
          Remarks: "列入魚尾鈑螺絲組",
        },
        {
          id: "3",
          Position: "阿里山監工區",
          Group: "3",
          Material: "3",
          MaterialName: "魚尾鈑螺絲帽(母)",
          Specification: "",
          Dept: "支",
          LastBalance: "689",
          Paid: "",
          Receiving: "",
          Balance: 689,
          Stock: 700,
          UnitPrice: 10,
          Remarks: "四角螺絲",
        },
        {
          id: "4",
          Position: "竹崎監工區",
          Group: "3",
          Material: "4",
          MaterialName: "魚尾鈑螺絲組",
          Specification: "(公+母)為1組",
          Dept: "組",
          LastBalance: "2873",
          Paid: "",
          Receiving: 300,
          Balance: 2573,
          Stock: 2400,
          UnitPrice: 10,
          Remarks: "",
        },
      ],
      headers: [
        {
          text: "項次",
          value: "id",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "監工區(廠/庫)",
          value: "Position",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "班別(組)",
          value: "Group",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "材料編號",
          value: "Material",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "材料名稱",
          value: "MaterialName",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: " 安全庫存數量",
          value: "Stock",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "本月結存數量",
          value: "Balance",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "詳細",
          value: "ViewTicket",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "修改、刪除",
          value: "a8",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
      ],
      contentShow: false, // 詳細內容 dialog 是否顯示
      content: {}, // 詳細內容欄位
      Add: false,
      Edit: false,
      Delete: false,
      snack: false,
      snackColor: "",
      snackText: "",
    };
  },
  components: {
    Pagination,
  },
  methods: {
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
      this.Add = false;
      this.Edit = false;
      this.Delete = false;
    },
    // 顯示詳細資訊
    view(item) {
      this.contentShow = true;
      this.content = { ...item };
    },
  },
  created() {},
};
</script>
