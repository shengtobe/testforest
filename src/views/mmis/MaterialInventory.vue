<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">料件庫存管理</h2>

    <v-divider class="mx-2 mt-5 mb-4" />

    <v-row class="px-2 label-header">
      <!-- 控制措施 -->
      <v-col cols="12" sm="4" md="3">
        <DeptSelect label="保存單位" outType="key" :showIcon="true" v-model="searchDepartName" />
        <!-- <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-bank</v-icon>單位
        </h3>
        <v-text-field solo placeholder="請選擇單位" v-model="searchDepartName"/> -->
      </v-col>

      <v-col cols="12" sm="8" md="5">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>料件關鍵字
        </h3>
        <v-text-field solo placeholder="可輸入WBS編號/WBS中文名稱/料件名稱進行模糊搜尋" v-model="searchMaterialName"/>
      </v-col>

      <v-col cols="12" md="4" align-self="center">
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
            :items="tableItems"
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
              <v-btn fab small dark class="btn-detail" @click="getDetail(item.MaterialCode,item.DepartCode)">
                <v-icon>mdi-file-document</v-icon>
              </v-btn>
            </template>

            <template v-slot:item.Amount="{ item }">
              <div v-if="parseInt(item.Amount) < parseInt(item.SaftyAmount)" style="background: #ff9999;">{{ item.Amount }}</div>
              <span v-else>{{ item.Amount }}</span>
            </template>

            <template v-slot:item.a8="{ item }">
              <v-btn fab small dark class="mr-2 btn-modify" @click="goEdit(item.MaterialCode,item.DepartCode)">
                <v-icon>mdi-pen</v-icon>
              </v-btn>

              <v-btn fab small dark class="btn-delete" @click="wantDelete(item.MaterialCode,item.DepartCode)">
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
                <v-icon class="mr-1 mb-1">mdi-more</v-icon>
                材料編號： {{ detailItem.MaterialCodeName }}
              </v-col>

              <v-col cols="12">
                <v-divider class="mt-2 mb-3" />
              </v-col>
              

              <v-col cols="12">
                <v-icon class="mr-1 mb-1">mdi-domain</v-icon>
                材料名稱： {{ detailItem.MaterialName }}
              </v-col>
              
              <v-col cols="12">
                <v-divider class="mt-2 mb-3" />
              </v-col>

              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-timetable</v-icon>
                單位： {{ detailItem.Unit }}
              </v-col>

              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-calendar-multiple-check</v-icon>
                單價： {{ detailItem.Price }} 元
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

              <v-col cols="12">
                <v-icon class="mr-1 mb-1">mdi-more</v-icon>
                規格備註： {{ detailItem.SpecMemo }}
              </v-col>

              <v-col cols="12">
                <v-divider class="mt-2" />
                <v-divider class="mb-3" />
              </v-col>

              <v-col cols="12">
                <v-icon class="mr-1 mb-1">mdi-clipboard-text</v-icon>
                保存單位： {{ detailItem.DepartName }}
              </v-col>

              <v-col cols="12">
                <v-divider class="mt-2 mb-3" />
              </v-col>

              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-package-variant-closed</v-icon>
                上月結存數量： {{ detailItem.LastMonthAmount }}
              </v-col>

              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-package-variant</v-icon>
                本月實收數量： {{ detailItem.MonthAmountRcv }}
              </v-col>

              <v-col cols="12">
                <v-divider class="mt-2 mb-3" />
              </v-col>

              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-calendar-check</v-icon>
                本月領用數量： {{ detailItem.MonthAmountGet }}
              </v-col>

              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-calendar-multiple-check</v-icon>
                本月結存數量： {{ detailItem.Amount }}
              </v-col>

              <v-col cols="12">
                <v-divider class="mt-2 mb-3" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-icon class="mr-1 mb-1">mdi-calendar-check</v-icon>
                安全庫存數量： {{ detailItem.SaftyAmount }}
              </v-col>

              <v-col cols="12">
                <v-divider class="mt-2 mb-3" />
              </v-col>
              <v-col cols="12">
                <v-icon class="mr-1 mb-1">mdi-wrench</v-icon>
                備註： {{ detailItem.Memo }}
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-dialog>
      <!-- 新增料件 modal -->
      <v-dialog v-model="Add" max-width="900px">
        <CmaterialEdit @close="close" :materCode="nowMaterial" :deptCode="nowDept" DType="add" :key="componentKey" @save="save"></CmaterialEdit>
      </v-dialog>
      <!-- 編輯資料 modal -->
      <v-dialog v-model="Edit" max-width="900px">
        <CmaterialEdit @close="close" :materCode="nowMaterial" :deptCode="nowDept" DType="edit" :key="componentKey" @save="save"></CmaterialEdit>
      </v-dialog>
      <!-- 停用 modal -->
      <v-dialog v-model="Delete" persistent max-width="290">
        <v-card class="theme-del-card">
          <v-card-title class="white--text px-4 py-1 headline">確認是否停用?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="btn-close white--text" @click="close">取消</v-btn>
            <v-btn class="btn-delete white--text" @click="goDelete">停用</v-btn>
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
import { materialInventoryQueryList,materialInventoryQuery,materialInventoryDelete,materialInventoryEdit } from '@/apis/materialManage/material'
import CmaterialEdit from '@/views/mmis/MaterialInventoryEdit'
import MaterialRequistision from '@/views/mmis/MaterialRequistision'
import DeptSelect from '@/components/forManage/deptSelect'
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
      nowDept: '',
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
          text: "保管單位",
          value: "DepartName",
          align: "center",
          sortable: true,
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
        {
          text: "材料編號",
          value: "MaterialCode",
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
          value: "SaftyAmount",
          align: "center",
          sortable: false,
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
        {
          text: "本月結存數量",
          value: "Amount",
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
          text: "修改、停用",
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
      deleteKey: '',
      deleteDept: '',
    };
  },
  mounted:function() {
    this._dataInit()
  },
  components: {
    Pagination,
    CmaterialEdit,
    MaterialRequistision,
    DeptSelect
  },
  computed: {
    ...mapState ('user', {
      userData: state => state.userData,  // 使用者基本資料
    }),
    tableItems: function() {
      return this.tableItem.map((e,index)=>({
        ...e,
        id:index+1
      }))
    }
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
      const departName = that.searchDepartName
      const materialName = '%' + that.searchMaterialName + '%'
      that.chLoadingShow({show:true})
      materialInventoryQueryList({
        DepartCode: departName,
        MaterialName: materialName,
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res => {
        if (res.data.ErrorCode == 0) {
          that.tableItem = []
          that.tableItem = res.data.query_list
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
    getDetail(matCode,depart) {
      const that = this
      that.chLoadingShow({show:true})
      materialInventoryQuery({
        MaterialCode: matCode,
        DepartCode: depart,
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res => {
        if (res.data.ErrorCode == 0) {
          that.detailItem = res.data
          delete that.detailItem.ErrorCode
          delete that.detailItem.Msg
        } else {
          console.error(res.data)
          // sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          // that.$router.push({ path: '/error' })
        }
      }).catch( err => {
        that.chMsgbar({ success: false, msg: '伺服器發生問題，查詢失敗' })
      }).finally(() => {
        that.chLoadingShow({show:false})
        that.detailItem = decodeObject(that.detailItem)
        this.contentShow = true;
      })
    },
    goEdit(materl,dept) {
      this.componentKey += 1
      this.nowMaterial = materl
      this.nowDept = dept
      this.Edit = true
    },
    goAdd() {
      this.nowMaterial = ''
      this.nowDept = ''
      this.componentKey += 1
      this.Add = true
    },
    save(rtnObj) {
      const that = this
      const editObject = encodeObject(rtnObj)
      that.chLoadingShow({show:true})
      materialInventoryEdit({
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
    wantDelete(materialCode,depart) {
      this.deleteKey = materialCode
      this.deleteDept = depart
      this.Delete = true
    },
    goDelete() {
      this.chLoadingShow({show:true})
      materialInventoryDelete({
        MaterialCode: this.deleteKey,
        DepartCode: this.deleteDept,
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res => {
        if(res.data.ErrorCode == 0){
          this.chMsgbar({success:true, msg:'資料停用成功！'})
        }else{
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          this.$router.push({ path: '/error' })
        }
      }).catch( err => {
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料停用失敗' })
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

<style scoped>
>>>.ddf table tbody tr td {
  background: #ff9999;
}
</style>
