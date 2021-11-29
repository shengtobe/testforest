<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">料件規格管理</h2>

    <v-divider class="mx-2 mt-5 mb-4" />

    <v-row class="px-2 label-header">
      <v-col cols="12" sm="8" md="6">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>料件關鍵字
        </h3>
        <v-text-field solo placeholder="可輸入WBS編號/WBS中文名稱/料件名稱進行模糊搜尋" v-model="searchMaterialName"/>
      </v-col>

      <v-col cols="12" md="6" align-self="center">
        <v-btn class="btn-search" dark large @click="searchData">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn dark large class="ml-2 btn-add" @click="goAdd()">
          <v-icon class="mr-1">mdi-plus</v-icon>新增
        </v-btn>
      </v-col>

      <v-col cols="12">
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

            <template v-slot:item.MaterialCode="{ item }">
              {{ item.MaterialCodeName }}<br>
              {{ item.MaterialCode }}
            </template>

            <template v-slot:item.a8="{ item }">
              <v-btn fab small dark class="mr-2 btn-modify" @click="goEdit(item.MaterialCode)">
                <v-icon>mdi-pen</v-icon>
              </v-btn>

              <v-btn fab small dark class="btn-delete" @click="wantDelete(item.MaterialCode)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>

            <template v-slot:footer="footer">
              <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <!-- 新增料件 modal -->
      <v-dialog v-model="Add" max-width="900px">
        <CmaterialEdit @close="close" :materCode="nowMaterial" DType="add" :key="componentKey" @save="save" />
      </v-dialog>
      <!-- 編輯資料 modal -->
      <v-dialog v-model="Edit" max-width="900px">
        <CmaterialEdit @close="close" :materCode="nowMaterial" DType="edit" :key="componentKey" @save="save" />
      </v-dialog>
      <!-- 停用 modal -->
      <v-dialog v-model="Delete" persistent max-width="290">
        <v-card class="theme-del-card">
          <v-card-title class="white--text px-4 py-1 headline">確認是否停用?</v-card-title>
          <v-card-text>
            <strong>停用料件規格將一併停用所有庫存資料，請問是否確認停用？</strong>
          </v-card-text>
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
import { materialSpecQueryList,materialSpecDelete,materialSpecEdit } from '@/apis/materialManage/material'
import CmaterialEdit from '@/views/mmis/MaterialSpecEdit'
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
          value: "index",
          align: "center",
          sortable: true,
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
        {
          text: "料件編號",
          value: "MaterialCode",
          align: "center",
          sortable: true,
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
        {
          text: "料件名稱",
          value: "MaterialName",
          align: "center",
          sortable: true,
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
        {
          text: "料件單位",
          value: "Unit",
          align: "center",
          sortable: true,
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
        {
          text: "單價",
          value: "Price",
          align: "center",
          sortable: true,
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
      const materialName = '%' + that.searchMaterialName + '%'
      that.chLoadingShow({show:true})
      materialSpecQueryList({
        MaterialName: materialName,
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res => {
        if (res.data.ErrorCode == 0) {
          that.tableItem = res.data.query_list
          if(that.tableItem.length == 0) {
            that.chMsgbar({ success: false, msg: '查無資料，請輸入其他條件進行查詢' })
          }
        } else {
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          that.$router.push({ path: '/error' })
        }
      }).catch( err => {
        that.chMsgbar({ success: false, msg: '伺服器發生問題，查詢失敗' })
      }).finally(() => {
        that.chLoadingShow({show:false})
        that.tableItem = decodeObject(that.tableItem)
        that.tableItem = that.tableItem.map((item,index) => ({
          ...item,
          index:index+1
        }))
      })
    },
    goEdit(materl) {
      this.nowMaterial = materl
      this.componentKey += 1
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
      materialSpecEdit({
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
      materialSpecDelete({
        MaterialCode: this.deleteKey,
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
