<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4">列車、軌道、車道設備</h2>

    <v-divider class="mx-2 mt-5 mb-4" />

    <v-row class="px-2">
      <!-- 查詢欄位 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-bank</v-icon>單位
        </h3>
        <v-select solo hide-details />
      </v-col>

      <v-col cols="12" sm="8" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>設備標示編號
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

            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <div class="row">
                  <div class="col-12 col-md-8">
                    <v-chip class="ma-2" color="cyan" label>型號</v-chip>
                    {{ item.model }}
                    <v-chip class="ma-2" color="cyan" label>版本</v-chip>
                    {{ item.version }}
                    <v-chip class="ma-2" color="cyan" label>製造商</v-chip>
                    {{ item.manufacturer }}
                    <v-chip class="ma-2" color="cyan" label>供應商</v-chip>
                    {{ item.supplier }}
                    <br />
                    <v-chip class="ma-2" color="cyan" label>維修單位</v-chip>
                    {{ item.Maintenance }}
                    <v-chip class="ma-2" color="cyan" label>外部維修單位</v-chip>
                    {{ item.ExternalMaintenance }}
                    <v-chip class="ma-2" color="cyan" label>技術文件</v-chip>
                    <v-chip
                      small
                      label
                      color="primary"
                      class="mr-2 mb-2 mb-sm-0"
                      href="../../../public/demofile/123.docx"
                      :download="item.Technical"
                    >{{ item.Technical }}</v-chip>
                  </div>
                  <div class="col-12 col-md-4">
                    <v-img
                      :lazy-src="url"
                      max-height="172"
                      max-width="280"
                      src="../../../public/demofile/demo3.jpg"
                    />
                  </div>
                </div>
              </td>
            </template>
            <template v-slot:item.a8>
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
              <v-btn title="刪除" small dark fab color="red" @click="Delete = true">
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>
            </template>
            <template v-slot:footer="footer">
              <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
            </template>
          </v-data-table>
        </v-card>
      </v-col>

      <!-- 新增設備 modal -->
      <v-dialog v-model="Add" max-width="900px">
        <v-card>
          <v-card-title class="blue white--text px-4 py-1">
            新增設備
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
                    <h3 class="mb-1">設備標示編號</h3>
                    <v-text-field solo value readonly />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">設備名稱</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">設備功能描述</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">型號</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">版本</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">製造商</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">供應商</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">維修單位</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">外部維修單位</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">外部維修單位</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">上傳照片</h3>
                    <v-file-input solo multiple show-size truncate-length="15" />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">上傳技術文件</h3>
                    <v-file-input solo multiple show-size truncate-length="15" />
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
                    <h3 class="mb-1">設備標示編號</h3>
                    <v-text-field solo value readonly />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">設備名稱</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">設備功能描述</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">型號</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">版本</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">製造商</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">供應商</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">維修單位</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">外部維修單位</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">外部維修單位</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">上傳照片</h3>
                    <v-file-input solo multiple show-size truncate-length="15" />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">上傳技術文件</h3>
                    <v-file-input solo multiple show-size truncate-length="15" />
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
// import UploadFileAdd from "@/components/UploadFileAdd.vue";

export default {
  data: () => ({
    Add: false,
    Edit: false,
    Delete: false,
    url: "@/public/demofile/demo3.jpg",
    pageOpt: { page: 1 },
    expanded: [],
    singleExpand: true,
    headers: [
      {
        text: "項次",
        value: "id",
        align: "start",
        sortable: false,
        divider: true, // 線格
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "單位",
        value: "a1",

        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "設備標示編號",
        value: "wbs",

        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "設備名稱",
        value: "device",

        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "照片",
        value: "photo",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "設備功能描述",
        value: "text",
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
        a1: "維護科",
        wbs: "TPK-ALL-SLP1-165",
        device: "枕木(16*18*12)",
        photo: "有",
        text: "軌道組件",
        model: "000-000-000-001",
        version: "000-000-001",
        manufacturer: "ICSC",
        supplier: "台灣",
        Maintenance: "維護科",
        ExternalMaintenance: "廠商A",
        Technical: "DC-TRK-ALL-SLP-165",
      },
      {
        id: "2",
        a1: "維護科",
        wbs: "TPK-ALL-SLP1-165",
        device: "枕木(16*18*12)",
        photo: "有",
        text: "軌道組件",
      },
      {
        id: "3",
        a1: "維護科",
        wbs: "TPK-ALL-SLP1-165",
        device: "枕木(16*18*12)",
        photo: "有",
        text: "軌道組件",
      },
      {
        id: "4",
        a1: "維護科",
        wbs: "TPK-ALL-SLP1-165",
        device: "枕木(16*18*12)",
        photo: "有",
        text: "軌道組件",
      },
      
    ],
    ipt: {
      // 給地點組件的預設值要先設
      location: "l1", // 發現地點
      locationK: "", // 路線k
      locationM: "", // 路線m
      locationOther: "", // 其他地點
    },
  }),
  components: {
    Pagination,
    // UploadFileAdd,
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
    // 加入要上傳的檔案
    joinFile(file) {
      this.ipt.files.push(file);
    },
    // 移除要上傳的檔案
    rmFile(idx) {
      this.ipt.files.splice(idx, 1);
    },
  },
  created() {},
};
</script>