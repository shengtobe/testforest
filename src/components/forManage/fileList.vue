<template>
  <v-card>
    <v-data-table
      :headers="fileTable.header"
      :items="fileItem"
      :options.sync="pageOpt"
      disable-sort
      disable-filtering
      hide-default-footer
      class="theme-table"
    >
      <template v-slot:no-data>
        <span class="red--text subtitle-1">沒有資料</span>
      </template>

      <template v-slot:loading>
        <span class="red--text subtitle-1">資料讀取中...</span>
      </template>

      <template v-slot:item.FileName="{ item }">
        {{ item.FileName }}.{{ item.FileType }}
      </template>

      <!-- headers 的 content 欄位 (檢視內容) -->
      <template v-slot:item.content="{ item }">
        <v-btn
          title="下載"
          class="mr-2 btn-modify"
          small
          dark
          fab
          :href="item.FileFullPath.replace(/\\/g,'/')"
          :download="item.FileName+'.'+item.FileType"
        >
          <v-icon dark>mdi-file-document-outline</v-icon>
        </v-btn>
      </template>

      <!-- 頁碼 -->
      <template v-slot:footer="footer">
        <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import Pagination from "@/components/Pagination.vue";
export default {
  props: ['fileItems'],
  data: () => ({
    pageOpt: { page: 1 }, // 目前頁數
    fileTable: {
      header: [
        {
          text: "項次",
          value: "ItemNo",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
        {
          text: "檔案名稱",
          value: "FileName",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
        {
          text: "上傳日期",
          value: "CreDTime",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
        {
          text: "功能",
          value: "content",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
      ]
    }
  }),
  components: {
    Pagination
  },
  mounted() {

  },
  computed: {
    fileItem: function() {
      return this.fileItems.map((e,i)=>({...e,ItemNo:i+1}))
    }
  },
  methods: {
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
  }
}
</script>