<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">列車、軌道、車道設備</h2>

    <v-divider class="mx-2 mt-5 mb-4" />

    <v-row class="px-2 label-header">
      <!-- 查詢欄位 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-bank</v-icon>單位
        </h3>
        <v-select 
          solo hide-details 
          v-model="ipt.depart"
          :items="selectItem"
          item-text="value"
          item-value="key"/>
      </v-col>

      <v-col cols="12" sm="8" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>設備標示編號
        </h3>
        <v-text-field solo placeholder="請輸入關鍵字" v-model="ipt.maintain" />
      </v-col>

      <v-col cols="12" md="6" align-self="center">
        <v-btn class="btn-search" dark large @click="setShowData()">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn dark large class="ml-2 btn-modify" @click="add">
          <v-icon class="mr-1">mdi-plus</v-icon>編輯
        </v-btn>
        <v-btn dark large class="ml-2 btn-delete" to="/mmis/edit-eqcode">
          <v-icon class="mr-1">mdi-data-matrix-edit</v-icon>編輯設備標示編號
        </v-btn>
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="decodeTableItems"
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            item-key="id"
            show-expand
            :options.sync="pageOpt"
            hide-default-footer
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            class="theme-table"
            @item-expanded="whenExpanded"
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
                    <v-chip class="ma-2" color="dropdownicon" label>型號</v-chip>
                    {{ item.Type }}
                    <v-chip class="ma-2" color="dropdownicon" label>版本</v-chip>
                    {{ item.Ver }}
                    <v-chip class="ma-2" color="dropdownicon" label>製造商</v-chip>
                    {{ item.Company }}
                    <v-chip class="ma-2" color="dropdownicon" label>供應商</v-chip>
                    {{ item.Supplier }}
                    <br />
                    <v-chip class="ma-2" color="dropdownicon" label>維修單位</v-chip>
                    {{ item.DepartName }}
                    <v-chip class="ma-2" color="dropdownicon" label>外部維修單位</v-chip>
                    {{ item.OutMaintainDepart }}
                    <v-chip class="ma-2" color="dropdownicon" label>技術文件</v-chip>
                    <v-chip
                      v-for="(file,index) in item.FileListTech"
                      :key="'Tech'+item.FlowId+index"
                      small
                      label
                      color="secondary"
                      class="mr-2 mb-2 mb-sm-0"
                      :href="file.FileFullPath.replace(/\\/g,'/')"
                      :download="file.FileName"
                    >{{ file.FileName }}</v-chip>
                    <v-chip v-if="item.FileListTech.length==0">無上傳技術文件</v-chip>
                  </div>
                  <div class="col-12 col-md-4">
                    <v-img
                      v-for="(pics,index) in item.FileListPic"
                      :key="'Pic'+item.FlowId+index"
                      :src="(/png|jpeg|jpg|gif$/.test(pics.FileFullPath.replace(/\\/g,'/')))?pics.FileFullPath.replace(/\\/g,'/') : '/images/file.jpg'"
                      max-height="172"
                      max-width="280"
                    ></v-img>
                    <v-chip v-if="item.FileListPic.length==0">無上傳照片</v-chip>
                  </div>
                </div>
              </td>
            </template>
            
            <template v-slot:item.StatusPic="{item}">{{item.StatusPic|picStatus}}</template>
            <template v-slot:item.a8="{item}">
              <v-btn
                title="編輯"
                class="mr-2 btn-modify"
                small
                dark
                fab
                @click="goEdit(item.FlowId)"
              >
                <v-icon dark>mdi-pen</v-icon>
              </v-btn>
              <v-btn
                title="檔案"
                class="mr-2 btn-memo"
                small
                dark
                fab
                @click="goUpfile(item.MaintainCode)"
              >
                <v-icon dark>mdi-file</v-icon>
              </v-btn>
              <v-btn title="停用" small dark fab class="btn-delete" @click="confirmDelete(item.FlowId)">
                <v-icon dark>mdi-sim-off</v-icon>
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
        <v-card class="theme-card">
          <v-card-title class="white--text px-4 py-1">
            {{dialog_title}}
            <v-spacer></v-spacer>
            <v-btn dark fab small text @click="close" class="mr-n2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-lazy>
            <editPage :detailItems="detailItems" :key="'edit'+detailKey"/>
          </v-lazy>
          <v-card-actions class="px-5 pb-5">
            <v-spacer></v-spacer>
            <v-btn class="mr-2 btn-close white--text" elevation="4" @click="close">取消</v-btn>
            <v-btn class="btn-add white--text" elevation="4" :loading="isLoading" @click="save">送出</v-btn>
          </v-card-actions>
        </v-card>
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
                <UploadFileEdit title="上傳照片" :fileList="fileUpload.Pics" :uploadDisnable="false" @uploadFile="joinFilePic" @deleteFile="rmFilePic" class="mb-10"/>
              </v-col>
              <v-col cols="12">
                <UploadFileEdit title="上傳技術文件" :fileList="fileUpload.Tech" :uploadDisnable="false" @uploadFile="joinFileTech" @deleteFile="rmFileTech" class="mb-10"/>
              </v-col>
            </v-row>
          </v-lazy>
          <v-card-actions class="px-5 pb-5">
            <v-spacer></v-spacer>
            <v-btn class="mr-2 btn-close white--text" elevation="4" @click="close">關閉</v-btn>
          </v-card-actions>
        </v-card>
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
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Pagination from "@/components/Pagination.vue";
import { getNowFullTime,escapeHtml,encodeObject,decodeObject } from '@/assets/js/commonFun'
import UploadFileEdit from "@/components/UploadFileEdit.vue";
import { largeQueryList, largeQueryDetail,largeQueryEdit,largeQueryDelete, largeFileAdd, largeFileView, largeFileDelete } from '@/apis/materialManage/largeMaterial'
import editPage from '@/views/mmis/TrainTrackLaneCreate.vue'
export default {
  data: () => ({
    Add: false,
    Edit: false,
    UpFile: false,
    Delete: false,
    url: "@/public/demofile/demo3.jpg",
    pageOpt: { page: 1 },
    expanded: [],
    singleExpand: true,
    sortBy: 'id',
    sortDesc: false,
    headers: [
      {
        text: "項次",
        value: "id",
        align: "start",
        sortable: true,
        divider: true, // 線格
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "單位",
        value: "DepartName",

        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "設備標示編號",
        value: "MaintainCode",

        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "設備名稱",
        value: "EqipName",

        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      // {
      //   text: "照片",
      //   value: "StatusPic",
      //   divider: true,
      //   class: "subtitle-1 white--text font-weight-bold",
      // },
      {
        text: "設備功能描述",
        value: "Description",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "功能",
        value: "a8",
        align: "center",
        divider: true,
        sortable: false,
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
    ipt: {
      //查詢條件
      depart: '',
      maintain: '',
    },
    selectItem: [],
    tableItem: [],
    isLoading: false,  // 是否讀取中
    detailItems: { },
    dialog_title: "",
    updateData:{
      StatusPic: 'N',
      ClientReqTime: '',
      OperatorID: '',

    },
    deleteFlowId: -1,
    detailKey: 0,
    fileUpload:{
      Pics:[],
      Tech:[]
    },
    upfileMaintain: '',
  }),
  mounted: function() {
      this.setShowData()
  },
  components: {
    Pagination,
    editPage,
    UploadFileEdit,
  },
  computed: {
    ...mapState ('user', {
      userData: state => state.userData,  // 使用者基本資料
    }),
    decodeTableItems: function() {
      return decodeObject(this.tableItem)
    }
  },
  methods: {
    ...mapActions('system', [
      'chMsgbar',  // messageBar
      'chLoadingShow'  // 切換 loading 圖顯示
    ]),
    //按下新增按鈕
    add(){
      const that = this
      this.detailItems= {
        Company: "",
        DepartCode: that.userData.DeptList[0].DeptId,
        DepartName: that.userData.DeptList[0].DeptDesc,
        Description: "",
        EqipName: "",
        FlowId: -1,
        LocDocument: "",
        LocPic: "",
        MaintainCode: "",
        MaintainCodeName: "",
        OutMaintainDepart: "",
        StatusPic: "",
        Supplier: "",
        Type: "",
        Ver: "",
        FileListPic: [],
        FileListTech: []
      }
      this.dialog_title = "新增設備"
      this.detailKey ++
      this.Edit=true
    },
    //抓顯示清單
    setShowData(){
      const that = this
      this.chLoadingShow({show:true})
      largeQueryList({
        DepartCode: that.ipt.depart, 
        MaintainCode: '%' + that.ipt.maintain + '%',
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res => {
        if (res.data.ErrorCode == 0) {
          //that.chMsgbar({ success: true, msg: '送出成功' })
          that.tableItem = res.data.query_list
          that.tableItem.forEach(function(e,i){
            e.id=i+1
          })
        } else {
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          that.$router.push({ path: '/error' })
        }
      }).catch( err => {
        this.chMsgbar({ success: false, msg: '伺服器發生問題，設備查詢失敗' })
      }).finally(() => {
        that.chLoadingShow({show:false})
        if(that.selectItem==''){
          that.selectItem.push({key:'',value:'全部單位'})
          var listDepart = that.tableItem.map((item) => {
            return {key:item.DepartCode,value:item.DepartName}
          })
          listDepart.forEach(function(e){
            that.selectItem.push(e)
          })
          that.selectItem = [...new Set(that.selectItem)]
          that.tableItem = decodeObject(that.tableItem)
        }
      });
    },
    //存檔
    save(){
      this.chLoadingShow({show:true})
      console.log(this.detailItems)
      const that = this
      // const dataKeys = Object.keys(that.detailItems)
      // dataKeys.forEach(e => that.updateData[e] = (typeof(that.detailItems[e])=="string")?escapeHtml(that.detailItems[e]):that.detailItems[e])
      that.updateData = that.detailItems
      that.updateData.ClientReqTime=getNowFullTime()  // client 端請求時間
      that.updateData.OperatorID=that.userData.UserId  // 操作人id
      largeQueryEdit(that.updateData).then(res => {
        if (res.data.ErrorCode == 0) {
          that.chMsgbar({ success: true, msg: '編輯成功' })
        } else {
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          that.$router.push({ path: '/error' })
        }
      }).catch(err => {
        that.chDialog({ show: true, msg: '伺服器發生問題，更新失敗' })
      }).finally(() => {
        that.close()
        that.setShowData()
        that.chLoadingShow({show:false})
      })
      
    },
    //按下編輯按鈕
    goEdit(flowId){
      const FID = flowId
      const that = this
      this.dialog_title = "編輯資料"
      this.chLoadingShow({show:true})
      largeQueryDetail({
        FlowId: FID,
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res => {
        if (res.data.ErrorCode == 0) {
          //that.chMsgbar({ success: true, msg: '資料取得成功' })
          that.detailItems = res.data.query_detail[0]
          that.detailItems = that.detailItems
          that.detailItems.FileListPic= []
          that.detailItems.FileListTech= []
          this.detailKey ++
        } else {
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          that.$router.push({ path: '/error' })
        }
      }).catch(err => {
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料查詢失敗' })
      }).finally(() => {
        that.chLoadingShow({show:false})
      })
      this.Edit=true
    },
    //按下檔案按鈕
    async goUpfile(flowId){
      //打API
      this.upfileMaintain = flowId
      let fileRtn = await this.getFiles(flowId)
      this.fileUpload.Pics = fileRtn.Pics
      this.fileUpload.Tech = fileRtn.Tech
      this.UpFile = true
    },
    async getFiles(Maintain){
      let Pics = []
      let Tech = []
      await largeFileView({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        MaintainCode: Maintain,
        Type: '1'
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
      await largeFileView({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        MaintainCode: Maintain,
        Type: '2'
      }).then(res=>{
        if(res.data.ErrorCode==0){
          Tech = res.data.FileCount
        } else {
          this.chDialog({ show: true, msg: '伺服器發生問題，照片查詢失敗' })
        }
      }).catch(err => {
        this.chDialog({ show: true, msg: '伺服器發生問題，照片查詢失敗' })
      }).finally(() => {
      })
      return {
        Pics,Tech
      }
    },
    //檔案上傳
    joinFilePic(obj){
      //打API
      this.fileUpload.Pics = []
      largeFileAdd({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        MaintainCode: this.upfileMaintain,
        Type: '1',
        FileCount: obj
      }).then(res=>{
        if(res.data.ErrorCode==0){
          this.chMsgbar({ success: true, msg: '檔案上傳成功' })
          this.fileUpload.Pics = res.data.FileCount
        } else {
          this.chMsgbar({ success: false, msg: '檔案上傳失敗' })
          this.fileUpload.Pics = res.data.FileCount
        }
      })
    },
    joinFileTech(obj){
      //打API
      this.fileUpload.Tech = []
      largeFileAdd({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        MaintainCode: this.upfileMaintain,
        Type: '2',
        FileCount: obj
      }).then(res=>{
        if(res.data.ErrorCode==0){
          this.chMsgbar({ success: true, msg: '檔案上傳成功' })
          this.fileUpload.Tech = res.data.FileCount
        } else {
          this.chMsgbar({ success: false, msg: '檔案上傳失敗' })
          this.fileUpload.Tech = res.data.FileCount
        }
      })
    },
    //刪除檔案
    rmFilePic(index){
      //抓出flowNo然後打API
      console.log(this.fileUpload.Pics[index].FlowNo)
      largeFileDelete({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        MaintainCode: this.upfileMaintain,
        Type: '1',
        FlowNo: this.fileUpload.Pics[index].FlowNo
      }).then(res=>{
        if(res.data.ErrorCode==0){
          this.chMsgbar({ success: true, msg: '檔案刪除成功' })
          this.fileUpload.Pics = res.data.FileCount
        } else {
          this.chMsgbar({ success: false, msg: '檔案刪除失敗' })
          this.fileUpload.Pics = res.data.FileCount
        }
      })
    },
    rmFileTech(index){
      //抓出flowNo然後打API
    },
    async whenExpanded(item){
      console.log('item',item)
      if(item.value){
        let fileRtn = await this.getFiles(item.item.MaintainCode)
        item.item.FileListPic = fileRtn.Pics
        item.item.FileListTech = fileRtn.Tech
      }
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    //關閉dialog
    close() {
      this.Add = false;
      this.Edit = false;
      this.UpFile = false
      this.Delete = false;
    },
    //是否刪除
    confirmDelete(flowId) {
      this.Delete = true
      this.deleteFlowId = flowId
    },
    //確認刪除
    goDelete() {
      this.chLoadingShow({show:true})
      const that = this
      largeQueryDelete({
        FlowId: this.deleteFlowId,
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res => {
        if (res.data.ErrorCode == 0) {
          this.chMsgbar({ success: true, msg: '刪除成功' })
        } else {
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          that.$router.push({ path: '/error' })
        }
      }).catch(err => {
        that.chDialog({ show: true, msg: '伺服器發生問題，刪除失敗' })
      }).finally(() => {
        that.close()
        that.setShowData()
        that.chLoadingShow({show:false})
      })
    },
  },
  filters: {
    picStatus:(data) => data=='Y'?'有':'無'
  },
  created() {},
};
</script>