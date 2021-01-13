<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4">無線電設備管理</h2>

    <v-divider class="mx-2 mt-5 mb-4" />

    <v-row class="px-2">
      <!-- 查詢欄位 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-bank</v-icon>單位
        </h3>
        <v-select solo hide-details v-model="ipt.depart" :items="deptData" item-text="value" item-value="key" label="選擇單位"/>
      </v-col>

      <v-col cols="12" sm="8" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>持有人
        </h3>
        <v-text-field solo v-model="ipt.man" placeholder="請輸入持有人編號或姓名" />
      </v-col>

      <v-col cols="12" md="3" align-self="center" @click="setDataList">
        <v-btn color="green" dark large>
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn color="indigo" dark large class="ml-2" @click="Add = true">
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
          >
            <template v-slot:no-data>
              <span class="red--text subtitle-1">沒有資料</span>
            </template>

            <template v-slot:loading>
              <span class="red--text subtitle-1">資料讀取中...</span>
            </template>

            <template v-slot:item.a8>
              <v-btn
                title="編輯"
                class="mr-2"
                small
                dark
                fab
                color="info darken-1"
                @click="Edit = true"
              >
                <v-icon dark>mdi-pen</v-icon>
              </v-btn>
              <v-btn title="刪除" small dark fab color="red" @click="Delete = true">
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>
            </template>

            <template v-slot:footer="footer">
              <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <!-- 新增無線電 modal -->
      <v-dialog v-model="Add" max-width="900px">
        <v-card>
          <v-card-title class="blue white--text px-4 py-1">
            新增無線電
            <v-spacer></v-spacer>
            <v-btn dark fab small text @click="close" class="mr-n2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <div class="px-6 py-4">
            <v-row>
              <!-- 檢查項目 -->
              <v-col cols="12">
                <v-row no-gutter class="indigo--text">
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">機號</h3>
                    <v-text-field solo value readonly />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">位置</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">類型</h3>
                    <v-select :items="typeData" item-text="value" item-value="key" label="類型" solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">單位名稱</h3>
                    <v-select :items="deptData" item-text="value" item-value="key" label="單位" solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">車站</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">持有人編號</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">持有人</h3>
                    <v-text-field solo />
                  </v-col>
                </v-row>
              </v-col>
              <!-- END 檢查項目 -->
            </v-row>
          </div>

          <v-card-actions class="px-5 pb-5">
            <v-spacer></v-spacer>
            <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
            <v-btn color="success" elevation="4">送出</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 編輯資料 modal -->
      <v-dialog v-model="Edit" max-width="900px">
        <v-card>
          <v-card-title class="blue white--text px-4 py-1">
            編輯資料
            <v-spacer></v-spacer>
            <v-btn dark fab small text @click="close" class="mr-n2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <div class="px-6 py-4">
            <v-row>
              <!-- 檢查項目 -->
              <v-col cols="12">
                <v-row no-gutter class="indigo--text">
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">機號</h3>
                    <v-text-field solo value readonly />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">位置</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">類型</h3>
                    <v-select :items="typeData" item-text="value" item-value="key" label="類型" solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">單位</h3>
                    <v-select :items="deptData" item-text="value" item-value="key" label="單位" solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">車站</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">持有人編號</h3>
                    <v-text-field solo />
                  </v-col>
                  <v-col cols="12" sm="4">
                    <h3 class="mb-1">持有人</h3>
                    <v-text-field solo />
                  </v-col>
                </v-row>
              </v-col>
              <!-- END 檢查項目 -->
            </v-row>
          </div>
          <v-card-actions class="px-5 pb-5">
            <v-spacer></v-spacer>
            <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
            <v-btn color="success" elevation="4">送出</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 刪除 modal -->
      <v-dialog v-model="Delete" persistent max-width="290">
        <v-card>
          <v-card-title class="red white--text px-4 py-1 headline">確認是否刪除?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="close">取消</v-btn>
            <v-btn color="success">刪除</v-btn>
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
import { radioQueryList } from '@/apis/materialManage/radioManage'
export default {
  data: () => ({
    Add: false,
    Edit: false,
    Delete: false,
    pageOpt: { page: 1 }, // 控制措施權責部門的表格目前頁數
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
        key: 'ARCO004',
        value: '服務科'
      },
      {
        key: 'ARCO015',
        value: '維護科'
      }
    ],
    
    tableItems: [
      {
        id: "1",
        Machine: "037TKN3741",
        Position: "",
        Type: "手持式",
        Dept: "服務科",
        Station: "嘉義",
        HolderNumber: "111111",
        Holder: "Bill",
      },
      {
        id: "2",
        Machine: "037TKN3742",
        Position: "",
        Type: "手持式",
        Dept: "服務科",
        Station: "北門",
        HolderNumber: "111111",
        Holder: "Bill",
      },
      {
        id: "3",
        Machine: "037TKN3743",
        Position: "",
        Type: "手持式",
        Dept: "服務科",
        Station: "竹崎車站",
        HolderNumber: "22222",
        Holder: "Tom",
      },
      {
        id: "4",
        Machine: "037TKN3744",
        Position: "",
        Type: "手持式",
        Dept: "服務科",
        Station: "阿里山車站",
        HolderNumber: "22222",
        Holder: "Any",
      },
    ], // 控制措施權責部門的表格資料
    
    headers: [
      // 控制措施權責部門的表格欄位
      {
        text: "項次",
        value: "id",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "機號",
        value: "Machine",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "位置",
        value: "Position",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "類型",
        value: "Type",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "單位",
        value: "Dept",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "車站",
        value: "Station",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "持有人編號",
        value: "HolderNumber",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "持有人",
        value: "Holder",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "修改、刪除",
        value: "a8",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
    ],
    header: [
      // 控制措施權責部門的表格欄位
      {
        text: "項次",
        value: "id",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "機號",
        value: "SerialNo",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "位置",
        value: "Loc",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "類型",
        value: "Type",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "單位",
        value: "DepartParentName",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "車站",
        value: "DepartName",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "持有人編號",
        value: "ManID",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "持有人",
        value: "Name",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
      {
        text: "修改、刪除",
        value: "a8",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
      },
    ],
    ipt: {
      depart: '',
      man: ''
    },
    tableItem: []
  }),
  mounted: function() {
    this.setDataList()
  },
  components: {
    Pagination,
  },
  methods: {
    ...mapActions('system', [
      'chMsgbar',  // messageBar
      'chLoadingShow'  // 切換 loading 圖顯示
    ]),
    setDataList() {
      const that = this
      this.chLoadingShow()
      radioQueryList({
        DepartCode: that.ipt.depart, 
        Man: that.ipt.man,
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res => {
        if (res.data.ErrorCode == 0) {
          //that.chMsgbar({ success: true, msg: '送出成功' })
          that.tableItem = [...res.data.query_list]
          that.tableItem.forEach(function(e,i){
            e.id=i+1
            var indexFind = that.typeData.findIndex((ele) => ele.key == e.Type)
            e.Type = that.typeData[indexFind].value
          })
        } else {
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          that.$router.push({ path: '/error' })
        }
      }).catch( err => {
        this.chMsgbar({ success: false, msg: '伺服器發生問題，設備查詢失敗' })
      }).finally(() => {
        that.chLoadingShow()
        that.tableItem = decodeObject(that.tableItem)
      })
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    close() {
      this.Add = false;
      this.Edit = false;
      this.Delete = false;
    },
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
