<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">無線電設備管理</h2>

    <v-divider class="mx-2 mt-5 mb-4" />

    <v-row class="px-2 label-header">
      <!-- 查詢欄位 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-bank</v-icon>科室
        </h3>
        <v-select 
          solo 
          hide-details 
          v-model="ipt.depart" 
          :items="deptData" 
          item-text="value" 
          @change="depChange"
          item-value="key" 
          label="選擇科室"/>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-bank</v-icon>單位
        </h3>
        <v-select 
          solo
          hide-details 
          v-model="ipt.depart2" 
          :items="deptData2" 
          item-text="value" 
          item-value="key" 
          label="選擇單位"/>
      </v-col>

      <v-col cols="12" sm="8" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>持有人
        </h3>
        <v-text-field solo v-model="ipt.man" placeholder="請輸入持有人編號或姓名" clearable/>
      </v-col>

      <v-col cols="12" md="3" align-self="center" >
        <v-btn class="btn-search" dark large @click="setDataList">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn dark large class="ml-2 btn-add" @click="goEdit(-1)">
          <v-icon class="mr-1">mdi-plus</v-icon>新增
        </v-btn>
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-data-table
            :headers="header"
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

            <template v-slot:loading>
              <span class="red--text subtitle-1">資料讀取中...</span>
            </template>

            <template v-slot:item.a8={item}>
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
              <v-btn title="停用" small dark fab class="btn-delete" @click="openDelete(item.FlowId)">
                <v-icon dark>mdi-delete</v-icon>
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
        <radioEdit :key="'radioEdit' + editKey" :nowFlowId="nowFlow" @closeAct="close"></radioEdit>
      </v-dialog>
      <!-- 刪除 modal -->
      <v-dialog v-model="Delete" persistent max-width="290">
        <v-card>
          <v-card-title class="red white--text px-4 py-1 headline">確認是否停用?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="close">取消</v-btn>
            <v-btn color="success" @click="goDelete()">停用</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Pagination from "@/components/Pagination.vue";
import { getNowFullTime,encodeObject,decodeObject } from '@/assets/js/commonFun'
import { radioQueryList,radioDelete } from '@/apis/materialManage/radioManage'
import { fetchOrganization } from '@/apis/organization'
import radioEdit from '@/views/mmis/RadioCreate.vue'
export default {
  data: () => ({
    editKey: 0,
    Add: false,
    Edit: false,
    Delete: false,
    sortBy: 'id',
    sortDesc: false,
    pageOpt: { page: 1 }, // 控制措施權責部門的表格目前頁數 
    group2: [],
    typeData: [   //H:手持式、S:固定式、C:車裝台
        {
          key: 'H',
          value: '手持式'
        },
        {
          key: 'S',
          value: '固定式'
        },
        {
          key: 'C',
          value: '車裝台'
        },
      ],
    deptData: [
        {
          key: '',
          value: '選擇科室'
        }
      ],
      deptData2: [
        {
          key: '',
          value: '選擇單位'
        }
      ],
    header: [
      // 控制措施權責部門的表格欄位
      {
        text: "項次",
        value: "id",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "機號",
        value: "SerialNo",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "類型",
        value: "Type",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "科室",
        value: "DepartName",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "單位名稱",
        value: "DepartUnit",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "位置",
        value: "Loc",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold",
      },
      {
        text: "持有人",
        value: "Name",
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
    ipt: {
      depart: '',
      depart2: '',
      man: ''
    },
    tableItem: [],
    nowFlow: 0
  }),
  mounted: function() {
    this.setDataList()
  },
  components: {
    Pagination,
    radioEdit,
  },
  methods: {
    ...mapActions('system', [
      'chMsgbar',  // messageBar
      'chLoadingShow'  // 切換 loading 圖顯示
    ]),
    //抓單位清單
    _getOrg(){
      const that = this
      fetchOrganization().then(res => {
        if (res.data.ErrorCode == 0) {
          that.deptData.push(...res.data.user_depart_list_group_1.map((item) => {
            return {key:item.DepartCode,value:item.DepartName}
          }))
          this.group2 = [...res.data.user_depart_list_group_2]
        }else {
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          that.$router.push({ path: '/error' })
        }
      }).catch( err => {
        this.chMsgbar({ success: false, msg: '伺服器發生問題，單位查詢失敗' })
      })
    },
    depChange(){
      this.ipt.depart2 = '';
      let chName = this.deptData.find(e => e.key == this.ipt.depart).value
      let temp2 = this.group2.filter(e => e.DepartParentName == chName).map(item => ({
        key: item.DepartCode,
        value: item.DepartName,
      }))
      this.deptData2 = [{key: '', value: '選擇單位'}, ...temp2]
    },
    setDataList() {
      const that = this
      this.chLoadingShow({show:true})
      radioQueryList({
        DepartCode: that.ipt.depart, 
        Man: (that.ipt.man == null)?"":that.ipt.man,
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res => {
        if (res.data.ErrorCode == 0) {
          //that.chMsgbar({ success: true, msg: '送出成功' })
          let tempTable = [...res.data.query_list]
          tempTable.forEach(function(e,i){
            e.id=i+1
            var indexFind = that.typeData.findIndex((ele) => ele.key == e.Type)
            e.Type = that.typeData[indexFind].value
          })
          // 前端自行篩選廠庫
          if(that.ipt.depart2 == null || that.ipt.depart2 == ''){
            that.tableItem = tempTable
          }
          else{
            let a = this.deptData2.find(e=>e.key == that.ipt.depart2).value
            that.tableItem = [...[]]
            that.tableItem = tempTable.filter(e => e.DepartUnit == a)
          }
        } else {
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          that.$router.push({ path: '/error' })
        }
      }).catch( err => {
        this.chMsgbar({ success: false, msg: '伺服器發生問題，設備查詢失敗' })
      }).finally(() => {
        that.chLoadingShow({show:false})
        that.tableItem = decodeObject(that.tableItem)
        this._getOrg()
      })
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    close() {
      this.Edit = false;
      this.Delete = false;
      this.nowFlow = -1
      this.setDataList()
    },
    goEdit(flowId) {
      this.nowFlow = flowId
      this.editKey++
      this.Edit = true
    },
    openDelete(flowId) {
      this.Delete = true
      this.nowFlow = flowId
    },
    goDelete() {
      const that = this
      that.chLoadingShow({show:true})
      radioDelete({
        FlowId: that.nowFlow,
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res => {
        if (res.data.ErrorCode == 0) {
          that.chMsgbar({success:true, msg:'停用成功！'})
        } else {
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          that.$router.push({ path: '/error' })
        }
      }).catch( err => {
        this.chMsgbar({ success: false, msg: '伺服器發生問題，停用失敗' })
      }).finally(() => {
        that.chLoadingShow({show:false})
        that.close()
      })
    }
  },
  computed: {
    ...mapState ('user', {
      userData: state => state.userData,  // 使用者基本資料
    }),
  },
  filters:{

  },
  created() {},
};
</script>
