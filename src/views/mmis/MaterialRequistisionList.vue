<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">料件移存管理</h2>

    <v-divider class="mx-2 mt-5 mb-4" />

    <v-row class="px-2 label-header">
      <!-- 控制措施 -->
      <v-col cols="12" sm="4" md="3">
        <DeptSelect label="移出單位" outType="key" :showIcon="true" v-model="searchData.ReqDepartCode" />
      </v-col>

      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>移出料件
        </h3>
        <v-text-field solo placeholder="點擊選擇WBS編號" v-model="searchData.MaintainCode"/>
      </v-col>

      <v-col cols="12" sm="4" md="3">
        <DeptSelect label="移入單位" outType="key" :showIcon="true" v-model="searchData.RecDepartCode" />
      </v-col>

      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>移入料件
        </h3>
        <v-text-field solo placeholder="點擊選擇WBS編號" v-model="searchData.RecDepartCode"/>
      </v-col>

    </v-row>
    <v-row>

      <v-col cols="0" md="8" />

      <v-col cols="12" md="4" align-self="center">
        <v-btn class="btn-search" dark large @click="goSearch">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn dark large class="ml-2 btn-expansion" @click="goAdd">
          <v-icon class="mr-1">mdi-folder-move-outline</v-icon>移存申請單
        </v-btn>
      </v-col>

    </v-row>
    <v-row>

      <v-col cols="12">
        <v-card>
          <v-data-table
            :headers="tableControl.header"
            :items="tableItems"
            :options.sync="tableControl.pageOpt"
            disable-sort
            disable-filtering
            hide-default-footer
            :loading="tableControl.loading"
            :sort-by.sync="tableControl.sortBy"
            :sort-desc.sync="tableControl.sortDesc"
            class="theme-table"
          >
            <template v-slot:no-data>
              <span class="red--text subtitle-1">沒有資料</span>
            </template>

            <template v-slot:loading>
                <span class="red--text subtitle-1">資料讀取中...</span>
            </template>

            <template v-slot:item.RecYN="{ item }">
              <template v-if="item.RecYN=='Y'">
                <v-icon color="green">mdi-check</v-icon><br/>
                {{ item.RecName }}
              </template>
              <template v-else-if="item.RecYN=='F'">
                <v-icon color="red">mdi-close</v-icon><br/>
                {{ item.RecName }}
              </template>
            </template>

            <template v-slot:item.Memo="{ item }">
              <template v-if="item.Memo">
                <v-btn fab small dark class="mr-2 btn-memo" @click="goMemo(item.Memo)">
                  <v-icon>mdi-file-document</v-icon>
                </v-btn>
              </template>
            </template>

            <template v-slot:item.a8="{ item }">
              <v-btn v-if="item.ReqName==userData.UserName&&item.RecYN!='Y'" fab small dark class="btn-delete" @click="wantDelete(item.FlowId)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <template v-else-if="item.ReqName!=userData.UserName">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn fab small dark class="mr-2 btn-delete" v-bind="attrs" v-on="on" @click="wantBack(item.FlowId)">
                      <v-icon>mdi-text-box-remove</v-icon>
                    </v-btn>
                  </template>
                  <span>退回</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn fab small dark class="mr-2 btn-add" v-bind="attrs" v-on="on" @click="wantConfirm(item.FlowId)">
                       <v-icon>mdi-text-box-check</v-icon>
                    </v-btn>
                  </template>
                  <span>移存</span>
                </v-tooltip>
              </template>
            </template>

            <template v-slot:footer="footer">
              <Pagination :footer="footer" :pageOpt="tableControl.pageOpt" @chPage="chPage" />
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <!-- 備註 modal -->
    <v-dialog v-model="ModalControl.Memo" persistent max-width="500">
      <v-card class="theme-card">
        <v-card-title class="white--text px-4 py-1 headline">備註</v-card-title>
        <div class="px-6 py-4">
          {{Memos}}
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="btn-close white--text" @click="ModalControl.Memo=false">關閉</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 移存申請單 modal -->
    <v-dialog v-model="ModalControl.Add" max-width="1024px">
      <MaterialRequistision @onclose="ModalControl.Add=false;goSearch()" :key="'mr'+componentKey"></MaterialRequistision>
    </v-dialog>
    <!-- 刪除 modal -->
    <v-dialog v-model="ModalControl.Delete" persistent max-width="290">
      <v-card class="theme-del-card">
        <v-card-title class="white--text px-4 py-1 headline">確認是否刪除?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="btn-close white--text" @click="ModalControl.Delete=false">取消</v-btn>
          <v-btn class="btn-delete white--text" @click="goDelete">刪除</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 駁回 modal -->
    <v-dialog v-model="ModalControl.Back" persistent max-width="290">
      <v-card class="theme-del-card">
        <v-card-title class="white--text px-4 py-1 headline">確認是否駁回?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="btn-close white--text" @click="ModalControl.Back=false">取消</v-btn>
          <v-btn class="btn-delete white--text" @click="goBack">駁回</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 確認 modal -->
    <v-dialog v-model="ModalControl.Confirm" persistent max-width="290">
      <v-card class="theme-upload-card">
        <v-card-title class="white--text px-4 py-1 headline">確認是否移轉?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="btn-close white--text" @click="ModalControl.Confirm=false">取消</v-btn>
          <v-btn class="btn-delete white--text" @click="goConfirm">確認</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Pagination from "@/components/Pagination.vue";
import { getNowFullTime } from '@/assets/js/commonFun'
import { materialRequistisionList, materialRequistisionDelete, materialRequistisionReturn, materialRequistisionConfirm } from '@/apis/materialManage/material'
import MaterialRequistision from '@/views/mmis/MaterialRequistision'
import DeptSelect from '@/components/forManage/deptSelect'
export default {
  data() {
    return {
      ModalControl:{
        Add: false,
        Memo: false,
        Delete: false,
        Confirm: false,
        Back: false 
      },
      componentKey: 0,
      searchData:{
        RecDepartCode: "",
        MaintainCode: "",
        RecMaintainCode: "",
        ReqDepartCode: "",
      },
      tableControl:{
        header:[
          {
            text: "項次",
            value: "index",
            align: "center",
            sortable: true,
            divider: true,
            class: "subtitle-1 white--text font-weight-bold",
          },
          {
            text: "申請人",
            value: "ReqName",
            align: "center",
            sortable: true,
            divider: true,
            class: "subtitle-1 white--text font-weight-bold",
          },
          {
            text: "移出料件編號",
            value: "MaintainCode",
            align: "center",
            sortable: true,
            divider: true,
            class: "subtitle-1 white--text font-weight-bold",
          },
          {
            text: "移出單位",
            value: "ReqDepartCode",
            align: "center",
            sortable: true,
            divider: true,
            class: "subtitle-1 white--text font-weight-bold",
          },
          {
            text: "移存件數",
            value: "Count",
            align: "center",
            sortable: false,
            divider: true,
            class: "subtitle-1 white--text font-weight-bold",
          },
          {
            text: "移入料件編號",
            value: "RecMaintainCode",
            align: "center",
            sortable: true,
            divider: true,
            class: "subtitle-1 white--text font-weight-bold",
          },
          {
            text: "移入單位",
            value: "RecDepartCode",
            align: "center",
            sortable: true,
            divider: true,
            class: "subtitle-1 white--text font-weight-bold",
          },
          {
            text: "已移轉",
            value: "RecYN",
            align: "center",
            sortable: true,
            divider: true,
            class: "subtitle-1 white--text font-weight-bold",
          },
          {
            text: "備註",
            value: "Memo",
            align: "center",
            sortable: true,
            divider: true,
            class: "subtitle-1 white--text font-weight-bold",
          },
          {
            text: "功能",
            value: "a8",
            align: "center",
            divider: true,
            class: "subtitle-1 white--text font-weight-bold",
          },
        ],
        items:[],
        sortBy: "index",
        sortDesc: false,
        pageOpt: { page: 1 },
        loading: false
      },
      Flow:{
        Delete: "",
        Back: "",
        Comfirm: ""
      },
      Memos:''
    };
  },
  mounted:function() {
    
  },
  components: {
    Pagination,
    MaterialRequistision,
    DeptSelect
  },
  computed: {
    ...mapState ('user', {
      userData: state => state.userData,  // 使用者基本資料
    }),
    tableItems() {
      return this.tableControl.items.map((e,i)=>({index:i+1,...e}))
    }
  },
  methods: {
    ...mapActions('system', [
      'chMsgbar',  // messageBar
      'chLoadingShow'  // 切換 loading 圖顯示
    ]),
    // 更換頁數
    chPage(n) {
      this.tableControl.pageOpt.page = n;
    },
    goAdd() {
      this.componentKey++
      this.ModalControl.Add=true
    },
    goSearch() {
      this.tableControl.loading = true
      this.tableControl.items = []
      this.chLoadingShow({show:true})
      materialRequistisionList({
        ...this.searchData,
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res=>{
        if(res.data.ErrorCode == 0){
          this.tableControl.items = res.data.Data
          this.tableControl.loading = false
        }else{
          this.chMsgbar({ success: false, msg: '查無資料，請重選查詢條件' })
        }
      }).catch(err=>{
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料查詢失敗' })
      }).finally(()=>{this.chLoadingShow({show:false})})
    },
    goMemo(memo) {
      this.Memos = memo
      this.ModalControl.Memo = true
    },
    wantDelete(flowId) {
      this.Flow.Delete = flowId
      this.ModalControl.Delete = true
    },
    goDelete() {
      this.chLoadingShow({show:true})
      materialRequistisionDelete({
        FlowId: this.Flow.Delete
      }).then(res=>{
        if(res.data.ErrorCode == 0){
          this.chMsgbar({ success: true, msg: '刪除成功' })
          this.ModalControl.Delete = false
          this.goSearch()
        }else{
          this.chMsgbar({ success: false, msg: '查無資料，請重選刪除資料' })
        }
      }).catch(err=>{
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料刪除失敗' })
      }).finally(()=>{this.chLoadingShow({show:false})})
    },
    wantBack(flowId) {
      this.Flow.Back = flowId
      this.ModalControl.Back = true
    },
    goBack() {
      this.chLoadingShow({show:true})
      materialRequistisionReturn({
        FlowId: this.Flow.Back
      }).then(res=>{
        if(res.data.ErrorCode == 0){
          this.chMsgbar({ success: true, msg: '駁回成功' })
          this.ModalControl.Back = false
          this.goSearch()
        }else{
          this.chMsgbar({ success: false, msg: '查無資料，請重選駁回資料' })
        }
      }).catch(err=>{
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料駁回失敗' })
      }).finally(()=>{this.chLoadingShow({show:false})})
    },
    wantConfirm(flowId) {
      this.Flow.Confirm = flowId
      this.ModalControl.Confirm = true
    },
    goConfirm() {
      this.chLoadingShow({show:true})
      materialRequistisionConfirm({
        FlowId: this.Flow.Confirm
      }).then(res=>{
        if(res.data.ErrorCode == 0){
          this.chMsgbar({ success: true, msg: '移轉成功' })
          this.ModalControl.Confirm = false
          this.goSearch()
        }else{
          this.chMsgbar({ success: false, msg: '查無資料，請重選移轉資料' })
        }
      }).catch(err=>{
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料移轉失敗' })
      }).finally(()=>{this.chLoadingShow({show:false})})
    }
  },
};
</script>

<style scoped>
>>>.col-0{
  width: 0%;
  padding: 0px;
}
</style>
