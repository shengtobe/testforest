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
        <v-select solo hide-details :items="selectdata" v-model="searchItem" />
      </v-col>

      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn color="green" dark large @click="goSearch">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn color="indigo" dark large class="ml-2" @click="goAdd">
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

            <template v-slot:item.a5="{item}">
              <v-btn
                title="編輯"
                class="mr-2"
                small
                dark
                fab
                color="info darken-1"
                 @click="goEdit(item.FlowID)"
              >
                <v-icon dark>mdi-pen</v-icon>
              </v-btn>
               <v-btn fab small color="error" @click="goDelete(item.FlowID)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>

            <template v-slot:footer="footer">
              <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <!-- 編輯資料 modal -->
      <v-dialog v-model="Edit" max-width="900px">
        <OutsourcDataEdit :flowId="detailFlow" :inType="inType" :key="componentKey" @close="close"></OutsourcDataEdit>
      </v-dialog>
      <!-- 刪除 modal -->
      <v-dialog v-model="Delete" persistent max-width="290">
        <v-card>
          <v-card-title class="red white--text px-4 py-1 headline">確認是否刪除?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="close">取消</v-btn>
            <v-btn color="success" :loading="isLoading" @click="Del">刪除</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from 'vuex'
import { getNowFullTime,decodeObject } from '@/assets/js/commonFun'
import { fetchOrganization } from '@/apis/organization'
import { outsourceQueryList,outsourceDelete } from '@/apis/materialManage/outsource.js'
import OutsourcDataEdit from '@/views/mmis/OutsourcDataEdit'
export default {
  data: () => ({
    Add: false,
    Edit: false,
    Delete: false,
    searchItem: "",
    pageOpt: { page: 1 },
    tableItems: [],
    selectdata: [],
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
        value: "DepartName",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "廠商名稱",
        value: "VendorName",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "負責人",
        value: "Name",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "電話",
        value: "TEL",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "統一編號",
        value: "UniNumber",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "備註",
        value: "Memo",
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
    isLoading: false,
    detailFlow: "",
    inType: "",
    componentKey: 0,
  }),
  components: {
    Pagination,
    OutsourcDataEdit,
  },
  mounted: function() {
    this.getOrg()
    this.goSearch()
  },
  computed: {
      ...mapState ('user', {
        userData: state => state.userData,  // 使用者基本資料
      }),
    },
  methods: {
    ...mapActions('system', [
      'chMsgbar',  // messageBar
      'chLoadingShow'  // 切換 loading 圖顯示
    ]),
    goSearch() {
      this.chLoadingShow()
      outsourceQueryList({
        DepartName: this.searchItem,
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res => {
        if (res.data.ErrorCode == 0) {
          console.log(res.data)
          this.tableItems = decodeObject(res.data.VendorList)
          this.tableItems.forEach((e,i)=>{
            e.id=i+1
          })
        } else {
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          this.$router.push({ path: '/error' })
        }
      }).catch( err => {
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
      }).finally(() => {
        this.chLoadingShow()
      })
    },
    getOrg() {
      this.chLoadingShow()
      fetchOrganization({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res => {
        if (res.data.ErrorCode == 0) {
          this.selectdata = decodeObject(res.data.user_depart_list_group_1.map(item=>item.DepartName))
          this.selectdata = ["" , ...this.selectdata]
        } else {
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          this.$router.push({ path: '/error' })
        }
      }).catch( err => {
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
      }).finally(() => {
        this.chLoadingShow()
      })
    },
    goAdd() {
      this.componentKey += 1
      this.inType = "add"
      this.Edit = true
    },
    goEdit(flow) {
      this.componentKey += 1
      this.detailFlow = flow
      this.inType = "edit"
      this.Edit = true
    },
    goDelete(flow) {
      this.detailFlow = flow;
      this.Delete = true
    },
    Del() {
      this.isLoading = true
      outsourceDelete({
        FlowID: this.detailFlow,
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res=>{
        if (res.data.ErrorCode == 0) {
          this.chMsgbar({ success: true, msg: '資料刪除成功' })
        } else {
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          this.$router.push({ path: '/error' })
        }
      }).catch( err => {
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料刪除失敗' })
      }).finally(() => {
        this.isLoading = false
        this.close()
      })
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    close() {
      this.goSearch()
      this.Add = false;
      this.Edit = false;
      this.Delete = false;
    },
  },
  created() {},
};
</script>
