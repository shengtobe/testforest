<!--
  說明：提供"查詢"、"清除搜尋內容"以及"新增"等功能按鈕，請加在原表單頁面上方的搜尋欄位<v-row></v-row>之後
  輸入: 
    text: String 表單描述
  使用範例:
    <ToolBar @search="search" @reset="reset" @newOne="newOne" :text="newText" />
  可參考檔案：AcetyleneWeldChecklistYear.vue
-->
<template>
  <v-row class="px-2">
    <v-col cols="12" sm="8" md="9" align-self="end" class="mb-5 text-md-left">
      <v-btn color="green" dark large class="mr-3 mb-3" @click="search">
        <v-icon>mdi-magnify</v-icon>查詢
      </v-btn>
      <v-btn elevation="2" large class="mb-3" @click="reset">
        <v-icon>mdi-reload</v-icon>清除搜尋內容
      </v-btn>
    </v-col>
    <v-col cols="12" sm="4" md="3" align-self="end" class="mb-5 text-md-right">
      <v-btn
        color="indigo"
        elevation="3"
        dark
        large
        class="mr-3 mb-3"
        @click="newOne"
      >
        <!-- @click="ShowDetailDialog = true" -->
        <v-icon>mdi-plus</v-icon>新增{{ text }}
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    text: String,
  },
  methods: {
    search() {
      this.$emit("search");
    },
    reset() {
      this.$emit("reset");
    },
    newOne() {
      this.$emit("newOne");
    },
  },
};
</script>