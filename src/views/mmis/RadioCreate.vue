<template>
  <v-card>
    <v-card-title class="blue white--text px-4 py-1">
      {{showTitle}}資料
      <v-spacer></v-spacer>
      <v-btn dark fab small text @click="closeAct" class="mr-n2">
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
              <v-text-field solo value v-model="detailItem.SerialNo" />
            </v-col>
            
            <v-col cols="12" sm="4">
              <h3 class="mb-1">類型</h3>
              <v-select :items="typeData" v-model="detailItem.Type" item-text="value" item-value="key" label="類型" solo />
            </v-col>
          </v-row>
          <v-row no-gutter class="indigo--text">
            <v-col cols="12" sm="4">
              <h3 class="mb-1">單位名稱</h3>
              <v-select :items="departList" v-model="detailItem.DepartParentCode" item-text="value" item-value="key" label="單位" solo />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">車站</h3>
              <v-text-field solo v-model="detailItem.DepartName"/>
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">位置</h3>
              <v-text-field solo v-model="detailItem.Loc"/>
            </v-col>
          </v-row>
          <v-row no-gutter class="indigo--text">
            <v-col cols="12" sm="4">
              <h3 class="mb-1">持有人編號</h3>
              <v-text-field solo v-model="detailItem.ManID"/>
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">持有人</h3>
              <v-text-field solo v-model="detailItem.Name"/>
            </v-col>
          </v-row>
        </v-col>
        <!-- END 檢查項目 -->
      </v-row>
    </div>
    <v-card-actions class="px-5 pb-5">
      <v-spacer></v-spacer>
      <v-btn class="mr-2" elevation="4" @click="closeAct">取消</v-btn>
      <v-btn color="success" elevation="4" @click="goSave">送出</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { getNowFullTime,encodeObject,decodeObject } from '@/assets/js/commonFun'
  import { radioDetail,radioUpdate } from '@/apis/materialManage/radioManage'
  import { fetchOrganization } from '@/apis/organization'
  export default {
    props: {
      nowFlowId: Number,
    },
    data: () => ({
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
      detailItem: {},
      departList: []
    }),
    mounted: function() {
      this._getDetailData()
      this._getOrg()
    },
    components: {

    },
    computed: {
      ...mapState ('user', {
        userData: state => state.userData,  // 使用者基本資料
      }),
      showTitle: function() {
        return this.nowFlowId === -1?'新增':'編輯'
      }
    },
    methods: {
      ...mapActions('system', [
        'chMsgbar',  // messageBar
        'chLoadingShow'  // 切換 loading 圖顯示
      ]),
      //觸發上層的關閉事件
      closeAct() {
        this.$emit('closeAct')
      },
      //抓單位清單
      _getOrg(){
        const that = this
        fetchOrganization().then(res => {
          if (res.data.ErrorCode == 0) {
            that.departList = res.data.user_depart_list_group_1.map((item) => {
              return {key:item.DepartCode,value:item.DepartName}
            })
          }else {
            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
            that.$router.push({ path: '/error' })
          }
        }).catch( err => {
          this.chMsgbar({ success: false, msg: '伺服器發生問題，單位查詢失敗' })
        })
      },
      _getDetailData(){
        const that = this
        const flow = that.nowFlowId.toString()
        if(that.nowFlowId === -1){
          that.detailItem = {
            DepartName:"",
            DepartParentCode:"",
            Loc:"",
            ManID:"",
            Name:"",
            SerialNo:"",
            Type:"",
            FlowId: -1
          }
        }else{
          that.chLoadingShow()
          radioDetail({
            FlowId: flow,
            ClientReqTime: getNowFullTime(),  // client 端請求時間
            OperatorID: this.userData.UserId,  // 操作人id
          }).then( res => {
            if (res.data.ErrorCode == 0) {
              that.detailItem = res.data
            } else {
              sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
              that.$router.push({ path: '/error' })
            }
          }).catch( err => {
            this.chMsgbar({ success: false, msg: '伺服器發生問題，資料查詢失敗' })
          }).finally(() => {
            that.chLoadingShow()
            if(that.detailItem != {}){
              that.detailItem = decodeObject(that.detailItem)
            }
          })
        }
      },
      goSave() {
        const that = this
        radioUpdate({
          ...that.detailItem,
          FlowId: that.nowFlowId,
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id
        }).then(res => {
          if(res.data.ErrorCode == 0) {
            that.chMsgbar({success:true, msg:'資料編輯成功！'})
          } else {
            essionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
            that.$router.push({ path: '/error' })
          }
        }).catch( err => {
          this.chMsgbar({ success: false, msg: '伺服器發生問題，資料查詢失敗' })
        }).finally(() => {
          that.detailItem = {
            DepartName:"",
            DepartParentCode:"",
            Loc:"",
            ManID:"",
            Name:"",
            SerialNo:"",
            Type:"",
            FlowId: -1
          }
          that.closeAct()
        })
      }
    },
    filters: {
    
    },
    watch: {
      nowFlowId: function() {
        this._getDetailData()
      }
    },
  }
</script>