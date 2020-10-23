<template>
  <v-container style="max-width: 1200px">
    <v-row no-gutter class="indigo--text">
        <v-col cols="12" sm="6">
            <h2 align="center" class="mt-10 mb-4">時雨量異常次數</h2>
            <v-row>
                <v-col cols="12" sm="4">
                    <h3 align="center" class="mt-2 ml-2">門檻值：  50 mm</h3>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-select :items="[
                    { text: '總計', value: 'A' }, 
                    { text: '阿里山', value: 'B' }, 
                    { text: '奮起湖', value: 'C' }, 
                    { text: '獨立山', value: 'D' }
                    ]" solo />
                </v-col>
                <v-col cols="12" sm="4">
                    <v-btn color="green" dark large class="mb-sm-8 mb-md-8">
                        <v-icon class="mr-1">mdi-magnify</v-icon>查詢
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <img class="ml-4" align="center" style="width:86%" :src="imgUrl1" alt="err" />
            </v-row>
        </v-col>
        <v-col cols="12" sm="6">
            <h2 align="center" class="mt-10 mb-4">24小時累積雨量異常次數</h2>
            <v-row>
                <v-col cols="12" sm="4">
                    <h3 align="center" class="mt-2 ml-2">門檻值：  200 mm</h3>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-select :items="[
                    { text: '總計', value: 'A' }, 
                    { text: '阿里山', value: 'B' }, 
                    { text: '奮起湖', value: 'C' }, 
                    { text: '獨立山', value: 'D' }
                    ]" solo />
                </v-col>
                <v-col cols="12" sm="4" >
                    <v-btn color="green" dark large class="mb-sm-8 mb-md-8">
                        <v-icon class="mr-1">mdi-magnify</v-icon>查詢
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <img class="ml-4" align="center" style="width:86%" :src="imgUrl2" alt="err" />
            </v-row>
        </v-col>
        
    </v-row>
    <v-row class="px-2">
      
      
      <v-col cols="12" sm="3" md="3">
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Pagination from "@/components/Pagination.vue";

export default {
  data() {
    return {
      panel: [0, 1, 2, 3],
      disabled: false,
      readonly: false,
      a: "",
      ass: "",
      z: "",
      zs: "",
      q: "",
      df: "",
      s: "",
      qz: "",
      wx: "",
      pp: "",
      oo: "",
      ii: "",
      uu: "",
      yy: "",
      imgUrl1: require("../../assets/images/rainfall_hr.jpg"),
      imgUrl2: require("../../assets/images/24H.jpg"),
      Add: false,
      dialog3: false,
      pageOpt: { page: 1 }, // 目前頁數
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
      this.dialog3 = false;
      this.dialogShowEdit = false;
      this.dialogDel = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.addItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
  },
};
</script>
