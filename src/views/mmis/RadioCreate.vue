<template>
  <v-card class="theme-card">
    <v-card-title class="white--text px-4 py-1">
      {{showTitle}}資料
      <v-spacer></v-spacer>
      <v-btn dark fab small text @click="closeAct" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <div class="px-6 py-4">
      <v-row>
        <!-- 檢查項目 -->
        <EquipRepairCode :key="0" :toLv="4" disableToLv="1" :nowEqCode="nowEqCode" :rtnStartLv="2" @getEqCode="getTempCode" @getEqCh="getTempCh" />
        <v-col cols="12">
          <v-row no-gutter class="label-header">
            <v-col cols="12" sm="4">
              <h3 class="mb-1">機號</h3>
              <v-text-field solo value v-model="detailItem.SerialNo" />
            </v-col>
            
            <v-col cols="12" sm="4">
              <h3 class="mb-1">類型</h3>
              <v-select :items="typeData" v-model="detailItem.Type" item-text="value" item-value="key" label="類型" solo />
            </v-col>
          </v-row>
          <v-row no-gutter class="label-header">
            <v-col cols="12" sm="4">
              <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-account</v-icon>所有人
              </h3>
              <PeopleSelectMuti :solo="true" :peopleList="detailItem.ManID" @getPeople="getPeople" />
            </v-col>
          </v-row>
          <v-row no-gutter class="label-header">
            <v-col cols="12" sm="4">
              <h3 class="mb-1">單位名稱</h3>
              <v-text-field solo v-model="detailItem.DepartName"/>
              <!-- <v-select :items="departList" v-model="detailItem.DepartParentCode" item-text="value" item-value="key" label="單位" solo /> -->
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
          <v-row no-gutter class="label-header">
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
      <v-btn class="mr-2 btn-close white--text" elevation="4" @click="closeAct">取消</v-btn>
      <v-btn class="btn-add white--text" elevation="4" @click="goSave">送出</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { getNowFullTime,encodeObject,decodeObject } from '@/assets/js/commonFun'
  import PeopleSelectMuti from '@/components/PeopleSelectMuti'
  import EquipRepairCode from '@/components/EquipRepairCode'
  import { radioDetail,radioUpdate } from '@/apis/materialManage/radioManage'
  import { fetchOrganization } from '@/apis/organization'
  export default {
    props: {
      nowFlowId: Number,
    },
    data: () => ({
      combineCode: '',
      combineCh: '',
      nowEqCode: 'RAD---', //編輯時 預設帶入的combineCode
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
      PeopleSelectMuti, EquipRepairCode
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
      //抓取未確認的設備標示編碼
        getTempCode(value) {
            this.detailItem.EqCode = value
            console.log("this.detailItem.EqCode: ", this.detailItem.EqCode);
            const words = this.detailItem.EqCode.split('-');
        },
        getTempCh(value) {
            this.combineCh = value
            console.log("this.combineCh: ", this.combineCh);
            const words = this.combineCh.split('-');
            this.detailItem.Loc = words[1]
        },
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
            DepartParentCode:"",
            Loc:"",
            ManID:"",
            EqCode:"",
            FlowId: -1
          }
        }else{
          that.chLoadingShow({show:true})
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
            that.chLoadingShow({show:false})
            if(that.detailItem != {}){
              that.detailItem = decodeObject(that.detailItem)
            }
          })
        }
      },
      getPeople(value) {
          if(value){
            console.log("getPeople(value): ", value);
              this.detailItem.ManID = value.UserId
              this.detailItem.DepartParentCode = value.DepartCode
              this.detailItem.DepartName = value.DepartName
          } else {
              
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
            DepartParentCode:"",
            Loc:"",
            ManID:"",
            EqCode:"",
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