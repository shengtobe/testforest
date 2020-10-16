<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4">週期性工作提醒</h2>

    <v-divider class="mx-2 mt-5 mb-4" />

    <v-row class="px-2">
      <!-- 控制措施 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>查詢日期(起)
        </h3>
        <v-menu
          v-model="q_datestart"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="datestart" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="datestart"
            @input="q_datestart = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>查詢日期(迄)
        </h3>
        <v-menu
          v-model="q_dateend"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="dateend" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="dateend"
            @input="q_dateend = false"
            locale="zh-tw"
          />
        </v-menu>
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
        <v-card>
          <v-data-table
            :headers="headers"
            :items="tableItems"
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            item-key="id"
            show-expand
            :options.sync="pageOpt"
            hide-default-footer
          >
            <template v-slot:no-data>
              <span class="red--text subtitle-1">沒有資料</span>
            </template>

            <template v-slot:loading>
              <span class="red--text subtitle-1">資料讀取中...</span>
            </template>
            <template v-slot:item.a8>
              <v-btn fab small color="primary" class="mr-2" @click="Edit = true">
                <v-icon>mdi-pen</v-icon>
              </v-btn>

              <v-btn fab small color="error" @click="Delete = true">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <div class="row">
                  <div class="col-12 col-md-8">
                    <v-chip class="ma-2" color="cyan" label>提醒多人</v-chip>
                    {{ item.t_name }}
                  </div>
                </div>
              </td>
            </template>

            <template v-slot:footer="footer">
              <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
            </template>
          </v-data-table>
        </v-card>
      </v-col>

      <!-- 新增工作提醒 modal -->
      <v-dialog v-model="Add" max-width="900px">
        <v-card>
          <v-card-title class="blue white--text px-4 py-1">
            新增工作提醒
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
                    <h3 class="mb-1">單位(廠/庫、監工區)</h3>
                    <v-text-field solo value readonly />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">通知起始日</h3>
                    <v-menu
                      v-model="a_datestart"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field v-model.trim="add.datestart" solo v-on="on" readonly />
                      </template>
                      <v-date-picker
                        color="purple"
                        v-model="add.datestart"
                        @input="a_datestart = false"
                        locale="zh-tw"
                      />
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">提醒週期</h3>
                    <v-text-field type="number" min="1" solo />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <h3 class="mb-1">提醒多人</h3>
                    <v-autocomplete
                      :items="name"
                      solo
                      clearable
                      deletable-chips
                      multiple
                      small-chips
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <h3 class="mb-1">工作提醒事項</h3>
                    <v-textarea auto-grow solo rows="4" />
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
                    <h3 class="mb-1">單位(廠/庫、監工區)</h3>
                    <v-text-field solo value readonly />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">通知起始日</h3>
                    <v-menu
                      v-model="a_datestart"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field v-model.trim="add.datestart" solo v-on="on" readonly />
                      </template>
                      <v-date-picker
                        color="purple"
                        v-model="add.datestart"
                        @input="a_datestart = false"
                        locale="zh-tw"
                      />
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">提醒週期</h3>
                    <v-text-field type="number" min="1" solo />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <h3 class="mb-1">提醒多人</h3>
                    <v-autocomplete
                      :items="name"
                      solo
                      clearable
                      deletable-chips
                      multiple
                      small-chips
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <h3 class="mb-1">工作提醒事項</h3>
                    <v-textarea auto-grow solo rows="4" />
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
    expanded: [],
    name: ["Bill", "Tom", "Mom", "May"],
    singleExpand: true,
    headers: [
      // 控制措施權責部門的表格欄位
      {
        text: "項次",
        value: "id",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "單位(廠/庫、監工區)",
        value: "a11",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "工作提醒事項",
        value: "a18",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "通知起始日",
        value: "a10",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "提醒週期",
        value: "a9",
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
      {
        text: "",
        value: "data-table-expand",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
    ],
    tableItems: [
      {
        id: "1",
        a11: "維護科",
        a18: "竹崎某段鐵軌檢查",
        a10: "2020-10-20",
        a9: "2週",
        t_name: "Bill, Mom, Tom, May",
      },
    ],
    q_datestart: "",
    q_dateend: "",
    datestart: "",
    dateend: "",
    add: {
      datestart: "",
    },
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
