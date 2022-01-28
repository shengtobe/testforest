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
            :single-expand="true"
            :expanded.sync="expanded"
            item-key="MaterialCode"
            show-expand
            :options.sync="pageOpt"
            disable-sort
            disable-filtering
            hide-default-footer
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            class="theme-table"
            @item-expanded="whenExpanded"
          >
            <template v-slot:no-data>
              <span class="red--text subtitle-1">沒有資料</span>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <div class="row">
                  <div class="col-12 col-md-8">
                    <v-chip class="ma-2" color="dropdownicon" label>規格</v-chip>
                    {{ item.Specification }}
                    <br />
                    <v-chip class="ma-2" color="dropdownicon" label>備註</v-chip>
                    {{ item.Memo }}
                  </div>
                  <div class="col-12 col-md-4">
                    <v-img
                      v-for="(pics,index) in item.FileListPic"
                      :key="'Pic'+item.FlowId+index"
                      :src="(/png|jpeg|jpg|gif$/.test(pics.FileFullPath.replace(/\\/g,'/')))?pics.FileFullPath.replace(/\\/g,'/') : '/images/file.jpg'"
                      @click="(/png|jpeg|jpg|gif$/.test(pics.FileFullPath))?goViewPic(pics.FileFullPath.replace(/\\/g,'/')):false"
                      max-height="172"
                      max-width="280"
                      :class="{'cursor-pointer':/png|jpeg|jpg|gif$/.test(pics.FileFullPath)}"
                    ></v-img>
                    <v-chip v-if="item.FileListPic.length==0">無上傳照片</v-chip>
                  </div>
                </div>
              </td>
            </template>

            <template v-slot:item.MaterialCode="{ item }">
              {{ item.MaterialCodeName }}<br>
              {{ item.MaterialCode }}
            </template>

            <template v-slot:item.a8="{ item }">
              <v-btn fab small dark class="mr-2 btn-modify" @click="goEdit(item.MaterialCode)">
                <v-icon>mdi-pen</v-icon>
              </v-btn>

              <v-btn
                title="檔案"
                class="mr-2 btn-memo"
                small
                dark
                fab
                @click="goUpfile(item.MaterialCode)"
              >
                <v-icon dark>mdi-file</v-icon>
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
      <v-dialog v-model="PicView.show" max-width="800px">
        <v-img
          :key="'PicShow'+PicView.key"
          :src="PicView.src"
        ></v-img>
      </v-dialog>
      <!-- 檔案上傳 modal -->
      <v-dialog v-model="UpFile" max-width="900px">
        <v-card class="theme-card">
          <v-card-title class="white--text px-4 py-1">
            檔案管理
            <v-spacer></v-spacer>
            <v-btn dark fab small text @click="close" class="mr-n2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-lazy>
            <v-row>
              <v-col cols="12">
                <UploadFileEdit title="上傳照片" :fileList="fileUpload" :uploadDisnable="false" @uploadFile="joinFilePic" @deleteFile="rmFilePic" class="mb-10"/>
              </v-col>
            </v-row>
          </v-lazy>
          <v-card-actions class="px-5 pb-5">
            <v-spacer></v-spacer>
            <v-btn class="mr-2 btn-close white--text" elevation="4" @click="close">關閉</v-btn>
          </v-card-actions>
        </v-card>
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
import { materialSpecQueryList,materialSpecDelete,materialSpecEdit, materialSpecFileAdd, materialSpecFileView, materialSpecFileDelete } from '@/apis/materialManage/material'
import UploadFileEdit from "@/components/UploadFileEdit.vue";
import CmaterialEdit from '@/views/mmis/MaterialSpecEdit'
import MaterialRequistision from '@/views/mmis/MaterialRequistision'
export default {
  data() {
    return {
      searchDepartName: '',
      searchMaterialName: '',
      expanded: [],
      tableItem: [],
      sortBy: 'id',
      sortDesc: false,
      detailItem:{},
      nowMaterial: '',
      PicView: {
        show: false,
        key: 0,
        src: ""
      },
      fileUpload: [],
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
        {
        text: "",
        value: "data-table-expand",
        divider: true,
        sortable: false,
        class: "subtitle-1 white--text font-weight-bold",
      },
      ],
      contentShow: false, // 詳細內容 dialog 是否顯示
      content: {}, // 詳細內容欄位
      Add: false,
      Edit: false,
      UpFile: false,
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
    UploadFileEdit,
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
      // this.searchData()
    },
    //按下檔案按鈕
    async goUpfile(flowId){
      //打API
      this.nowMaterial = flowId
      let fileRtn = await this.getFiles(flowId)
      this.fileUpload = fileRtn
      this.UpFile = true
    },
    async getFiles(Material){
      let Pics = []
      let Tech = []
      await materialSpecFileView({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        MaterialCode: Material,
      }).then(res=>{
        if(res.data.ErrorCode==0){
          Pics = res.data.FileCount
        } else {
          this.chDialog({ show: true, msg: '伺服器發生問題，照片查詢失敗' })
        }
      }).catch(err => {
        this.chDialog({ show: true, msg: '伺服器發生問題，照片查詢失敗' })
      }).finally(() => {
      })
      return Pics
    },
    //檔案上傳
    joinFilePic(obj){
      //打API
      this.fileUpload = []
      materialSpecFileAdd({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        MaterialCode: this.nowMaterial,
        FileCount: obj
      }).then(res=>{
        if(res.data.ErrorCode==0){
          this.chMsgbar({ success: true, msg: '檔案上傳成功' })
          this.fileUpload = res.data.FileCount
        } else {
          this.chMsgbar({ success: false, msg: '檔案上傳失敗' })
          this.fileUpload = res.data.FileCount
        }
      })
    },
    //刪除檔案
    rmFilePic(index){
      //抓出flowNo然後打API
      materialSpecFileDelete({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        MaterialCode: this.nowMaterial,
        FlowNo: this.fileUpload[index].FlowNo
      }).then(res=>{
        if(res.data.ErrorCode==0){
          this.chMsgbar({ success: true, msg: '檔案刪除成功' })
          this.fileUpload = res.data.FileCount
        } else {
          this.chMsgbar({ success: false, msg: '檔案刪除失敗' })
          this.fileUpload = res.data.FileCount
        }
      })
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
          that.tableItem = that.tableItem.map(e => ({...e, FileListPic:[]}))
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
    async whenExpanded(item){
      if(item.value){
        let fileRtn = await this.getFiles(item.item.MaterialCode)
        item.item.FileListPic = fileRtn
      }
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
      this.UpFile = false;
    },
    // 顯示詳細資訊
    view(item) {
      this.contentShow = true;
      this.content = { ...item };
    },
    //看照片
    goViewPic(picPath) {
      this.PicView.src = picPath
      this.PicView.key ++
      this.PicView.show = true
    },
  },
  created() {},
};
</script>
