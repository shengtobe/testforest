<template>
  <v-container style="max-width: 1200px">
    <!-- 標題 -->
    <h2 class="mb-4 px-2">{{ title }}</h2>
    <!-- 查詢區塊 -->
    <v-row class="px-2">
      <!-- 日期-起 -->
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>檢查日期(起)
        </h3>
        <v-menu
          v-model="CheckdayOn"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="QueryCheckdayOn" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="QueryCheckdayOn"
            @input="CheckdayOn = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <!-- 日期-迄 -->
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>檢查日期(迄)
        </h3>
        <v-menu
          v-model="CheckdayOff"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="QueryCheckdayOff" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="QueryCheckdayOff"
            @input="CheckdayOff = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <!-- 功能 -->
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn color="green" dark large class="mb-sm-8 mb-md-8">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
      </v-col>

      <v-col cols="12" sm="3" md="3"/>
      
      <v-col cols="12" sm="3" >
        <h3 id="mb-1"><v-icon class="mr-1">mdi-plus</v-icon>新增</h3>
        <v-select id="s01" solo style="width:180px;" placeholder="橋梁編號" return-object dense single-line 
        :items="sbjNum" outlined @change="s01Change"/>
      </v-col>
      <v-col cols="12" sm="3" >
        <v-btn style="margin-top:10%" class="ml-4 ml-sm-4 ml-md-4 mb-sm-8 mb-md-8" color="indigo" elevation="3" dark large 
        @click="btnNew">
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </v-col>
    </v-row>
    <!-- 查詢結果 -->
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

          <!-- headers 的 content 欄位 (檢視內容) -->
           <template v-slot:item.Shop>
            <v-btn
              title="詳細資料"
              class="mr-2"
              small
              dark
              fab
              color="info darken-1"
              to="/form-manage/curing/railway-worklog-add"
            >
              <v-icon dark>mdi-pen</v-icon>
            </v-btn>
          </template>

          <!-- 頁碼 -->
          <template v-slot:footer="footer">
            <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import Pagination from "@/components/Pagination.vue";

export default {
  data() {
    return {
      // 自定義變數
      title: "橋梁目視安全檢查表",
      newText: "檢查表",
      isLoading: false,
      disabled: false,
      n01: "0",
      CheckdayOn: "",
      QueryCheckdayOn: "",
      CheckdayOff: "",
      QueryCheckdayOff: "",
      AddWorkLogModal: false,
      MaintenanceDay: "",
      sbjNum: [],
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
  created:function(){
    var i = 1;
    for(i; i <= 26; i++ ){
      this.sbjNum.push("編號" + i);
    }
  },
  methods: {
    // 更換頁數
    chPage(n) {
      
      this.pageOpt.page = n;
    },
    s01Change(selectObj){
      console.log("select is changed >> " + selectObj);
      this.n01 = selectObj.substr(2);
    },
    btnNew(){
      console.log("Add new form btn is pressed");
      if(this.n01 != "0"){
        this.$router.push('/form-manage/maintain/bridge-visual-safety-checklist-add')
      }
      else{
        window.alert("請選擇橋梁編號");
      }
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