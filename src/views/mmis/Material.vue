<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">料件管理</h2>

    <v-divider class="mx-2 mt-5 mb-4" />

    <v-row class="px-2 label-header">
      <!-- 控制措施 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-bank</v-icon>單位
        </h3>
        <v-text-field solo placeholder="請輸入監工區/班別" v-model="searchDepartName"/>
      </v-col>

      <v-col cols="12" sm="8" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>材料名稱
        </h3>
        <v-text-field solo placeholder="請輸入關鍵字" v-model="searchMaterialName"/>
      </v-col>

      <v-col cols="12" md="6" align-self="center">
        <v-btn class="btn-search" dark large @click="searchData">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn dark large class="ml-2 btn-add" @click="goAdd()">
          <v-icon class="mr-1">mdi-plus</v-icon>新增
        </v-btn>
        <v-btn dark large class="ml-2 btn-expansion" @click="Del = true">
          <v-icon class="mr-1">mdi-folder-move-outline</v-icon>移存申請單
        </v-btn>
      </v-col>

      <v-col cols="12">
        <span class="label-warning">*可設定安全庫存數量與單價的數值</span>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="tableItem"
            :options.sync="pageOpt"
            disable-sort
            disable-filtering
            hide-default-footer
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            class="theme-table"
          >
            <template v-slot:no-data>
              <span class="red--text subtitle-1">沒有資料</span>
            </template>

            <!-- 本月結存數量小於安全庫存量時，系統會特以紅色底色標註提醒使用者 -->
            <!--  style="background: #ff9999;" -->
            <template v-slot:item.ViewTicket="{ item }">
              <v-btn fab small dark class="btn-detail" @click="getDetail(item.Material)">
                <v-icon>mdi-file-document</v-icon>
              </v-btn>
            </template>

            <template v-slot:item.Balance="{ item }">
              <div v-if="parseInt(item.Balance) < parseInt(item.Stock)" style="background: #ff9999;">{{ item.Balance }}</div>
              <span v-else>{{ item.Balance }}</span>
            </template>

            <template v-slot:item.a8="{ item }">
              <v-btn fab small dark class="mr-2 btn-modify" @click="goEdit(item.Material)">
                <v-icon>mdi-pen</v-icon>
              </v-btn>

              <v-btn fab small dark class="btn-delete" @click="wantDelete(item.Material)">
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
        <v-card class="theme-card">
          <v-card-title class="px-4 py-1">
            詳細資料
            <v-spacer />
            <v-btn fab small text @click="contentShow = false" class="mr-n2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <div class="px-4 py-3 label-header">
            <v-row no-gutters>
              <v-col cols="12">
                <v-icon class="mr-1 mb-1">mdi-clipboard-text</v-icon>
                監工區(廠/庫)： {{ detailItem.Position }}
              </v-col>

              <v-col cols="12">
                <v-divider class="mt-2 mb-3" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-more</v-icon>
                班別(組)： {{ detailItem.Group }}
              </v-col>
              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-more</v-icon>
                材料編號： {{ detailItem.Material }}
              </v-col>

              <v-col cols="12">
                <v-divider class="mt-2 mb-3" />
              </v-col>
              <v-col cols="12">
                <v-icon class="mr-1 mb-1">mdi-more</v-icon>
                規範： {{ detailItem.Specification }}
              </v-col>
              <v-col cols="12">
                <v-divider class="mt-2 mb-3" />
              </v-col>

              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-domain</v-icon>
                材料名稱： {{ detailItem.MaterialName }}
              </v-col>

              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-timetable</v-icon>
                單位： {{ detailItem.Dept }}
              </v-col>

              <v-col cols="12">
                <v-divider class="mt-2 mb-3" />
              </v-col>

              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-package-variant-closed</v-icon>
                上月結存數量： {{ detailItem.LastBalance }}
              </v-col>

              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-package-variant</v-icon>
                本月實收數量： {{ detailItem.Paid }}
              </v-col>

              <v-col cols="12">
                <v-divider class="mt-2 mb-3" />
              </v-col>

              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-calendar-check</v-icon>
                本月領用數量： {{ detailItem.Receiving }}
              </v-col>

              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-calendar-multiple-check</v-icon>
                本月結存數量： {{ detailItem.Balance }}
              </v-col>

              <v-col cols="12">
                <v-divider class="mt-2 mb-3" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-calendar-check</v-icon>
                安全庫存數量： {{ detailItem.Stock }}
              </v-col>

              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-calendar-multiple-check</v-icon>
                單價： {{ detailItem.UnitPrice }}
              </v-col>

              <v-col cols="12">
                <v-divider class="mt-2 mb-3" />
              </v-col>
              <v-col cols="12">
                <v-icon class="mr-1 mb-1">mdi-wrench</v-icon>
                備註： {{ detailItem.Remarks }}
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-dialog>
      <!-- 新增料件 modal -->
      <v-dialog v-model="Add" max-width="900px">
        <CmaterialEdit @close="close" :materCode="nowMaterial" DType="add" :key="componentKey" @save="save"></CmaterialEdit>
      </v-dialog>
      <!-- 編輯資料 modal -->
      <v-dialog v-model="Edit" max-width="900px">
        <CmaterialEdit @close="close" :materCode="nowMaterial" DType="edit" :key="componentKey" @save="save"></CmaterialEdit>
      </v-dialog>
      <!-- 刪除 modal -->
      <v-dialog v-model="Delete" persistent max-width="290">
        <v-card class="theme-del-card">
          <v-card-title class="white--text px-4 py-1 headline">確認是否刪除?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="btn-close white--text" @click="close">取消</v-btn>
            <v-btn class="btn-delete white--text" @click="goDelete">刪除</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 移存申請單 modal -->
      
      <v-dialog v-model="Del" max-width="500px">
        <MaterialRequistision @onclose="close"></MaterialRequistision>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Pagination from "@/components/Pagination.vue";
import { getNowFullTime,encodeObject,decodeObject } from '@/assets/js/commonFun'
import { materialQueryList,materialQuery,materialDelete,materialEdit } from '@/apis/materialManage/material'
import CmaterialEdit from '@/views/mmis/MaterialEdit'
import MaterialRequistision from '@/views/mmis/MaterialRequistision'
export default {
  data() {
    return {
      searchDepartName: '',
      searchMaterialName: '',
      tableItem: [],
      sortBy: 'id',
      sortDesc: false,
      detailItem:{},
      nowMaterial: '',
      pageOpt: { page: 1 }, // 控制措施權責部門的表格目前頁數
      headers: [
        {
          text: "項次",
          value: "id",
          align: "center",
          sortable: true,
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
        {
          text: "監工區(廠/庫)",
          value: "Position",
          align: "center",
          sortable: true,
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
        {
          text: "班別(組)",
          value: "Group",
          align: "center",
          sortable: true,
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
        {
          text: "材料編號",
          value: "Material",
          align: "center",
          sortable: true,
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
        {
          text: "材料名稱",
          value: "MaterialName",
          align: "center",
          sortable: true,
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
        {
          text: " 安全庫存數量",
          value: "Stock",
          align: "center",
          sortable: false,
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
        {
          text: "本月結存數量",
          value: "Balance",
          align: "center",
          sortable: false,
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
        {
          text: "詳細",
          value: "ViewTicket",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
        {
          text: "修改、刪除",
          value: "a8",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
      ],
      contentShow: false, // 詳細內容 dialog 是否顯示
      content: {}, // 詳細內容欄位
      Add: false,
      Edit: false,
      Delete: false,
      Del: false,
      snack: false,
      snackColor: '',
      snackText: '',
      componentKey: 0,
      deleteKey: ''
    };
  },
  mounted:function() {
    this._dataInit()
  },
  components: {
    Pagination,
    CmaterialEdit,
    MaterialRequistision,
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
    _dataInit() {
      this.searchData()
    },
    //清單查詢
    searchData() {
      const that = this
      const departName = '%' + that.searchDepartName + '%'
      const materialName = '%' + that.searchMaterialName + '%'
      that.chLoadingShow({show:true})
      materialQueryList({
        DepartCode: departName,
        MaterialName: materialName,
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res => {
        if (res.data.ErrorCode == 0) {
          let tempObj
          that.tableItem = []
          res.data.query_list.forEach(function(element,index){
            tempObj = {
              id: '',
              Position: '',
              Group: '',
              Material: '',
              MaterialName: '',
              Balance: '',
              Stock: '',
            }
            tempObj.id = (index + 1).toString()
            tempObj.Position = element.Supervision
            tempObj.Group = element.ClassGroup
            tempObj.Material = element.MaterialCode
            tempObj.MaterialName = element.MaterialName
            tempObj.Balance = element.Amount
            tempObj.Stock = element.SaftyAmount
            that.tableItem.push(tempObj)
          })
        } else {
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          that.$router.push({ path: '/error' })
        }
      }).catch( err => {
        that.chMsgbar({ success: false, msg: '伺服器發生問題，查詢失敗' })
      }).finally(() => {
        that.chLoadingShow({show:false})
        that.tableItem = decodeObject(that.tableItem)
      })
    },
    //詳細查詢
    getDetail(matCode) {
      const that = this
      that.chLoadingShow({show:true})
      materialQuery({
        MaterialCode: matCode,  
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res => {
        if (res.data.ErrorCode == 0) {
          that.detailItem.Position = res.data.Supervision
          that.detailItem.Group = res.data.ClassGroup
          that.detailItem.Material = res.data.MaterialCode
          that.detailItem.Specification = res.data.Specification
          that.detailItem.MaterialName = res.data.MaterialName
          that.detailItem.Dept = res.data.Unit
          that.detailItem.LastBalance = res.data.LastMonthAmount
          that.detailItem.Paid = res.data.MonthAmountRcv
          that.detailItem.Receiving = res.data.MonthAmountGet
          that.detailItem.Balance = res.data.Amount
          that.detailItem.Stock = res.data.SaftyAmount
          that.detailItem.UnitPrice = res.data.Price
          that.detailItem.Remarks = res.data.Memo
        } else {
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          that.$router.push({ path: '/error' })
        }
      }).catch( err => {
        that.chMsgbar({ success: false, msg: '伺服器發生問題，查詢失敗' })
      }).finally(() => {
        that.chLoadingShow({show:false})
        that.detailItem = decodeObject(that.detailItem)
        this.contentShow = true;
      })
    },
    goEdit(materl) {
      this.componentKey += 1
      this.nowMaterial = materl
      this.Edit = true
    },
    goAdd() {
      this.componentKey += 1
      this.Add = true
    },
    save(rtnObj) {
      const that = this
      const editObject = encodeObject(rtnObj)
      that.chLoadingShow({show:true})
      materialEdit({
        ...editObject,
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res => {
        if(res.data.ErrorCode == 0){
          that.chMsgbar({success:true, msg:'資料編輯成功！'})
        }else{
          that.chMsgbar({ success: false, msg: '資料發生問題，資料編輯失敗' })
        }
      }).catch( err => {
        that.chMsgbar({ success: false, msg: '伺服器發生問題，資料編輯失敗' })
      }).finally(() => {
        that.chLoadingShow({show:false})
        that.searchData()
      })
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    wantDelete(materialCode) {
      this.deleteKey = materialCode
      this.Delete = true
    },
    goDelete() {
      this.chLoadingShow({show:true})
      materialDelete({
        MaterialCode: this.deleteKey,
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res => {
        if(res.data.ErrorCode == 0){
          this.chMsgbar({success:true, msg:'資料刪除成功！'})
        }else{
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          this.$router.push({ path: '/error' })
        }
      }).catch( err => {
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料刪除失敗' })
      }).finally(() => {
        this.chLoadingShow({ show: false})
        this.searchData()
        this.close()
      })
    },
    close() {
      this.nowMaterial = undefined
      this.nowMaterial = ''
      this.Add = false;
      this.Edit = false;
      this.Delete = false;
      this.Del = false;
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

<style>
.ddf table tbody tr td {
  background: #ff9999;
}
</style>
