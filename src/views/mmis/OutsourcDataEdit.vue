<template>
  <v-card>
    <v-card-title class="blue white--text px-4 py-1">
      {{titleShow}}外包廠商資料
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
              <h3 class="mb-1">負責單位</h3>
              <v-select solo hide-details :items="orgList" v-model="queryItem.DepartName" />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">廠商名稱</h3>
              <v-text-field solo v-model="queryItem.VendorName" />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">負責人</h3>
              <v-text-field solo v-model="queryItem.Name" />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">電話</h3>
              <v-text-field solo v-model="queryItem.TEL" />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">統一編號</h3>
              <v-text-field solo v-model="queryItem.UnitNumber" />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">備註</h3>
              <v-text-field solo v-model="queryItem.Memo" />
            </v-col>
          </v-row>
        </v-col>
        <!-- END 檢查項目 -->
      </v-row>
    </div>
    <v-card-actions class="px-5 pb-5">
      <v-spacer></v-spacer>
      <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
      <v-btn color="success" elevation="4" :loading="isLoading" @click="goSave">送出</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import { getNowFullTime,encodeObject,decodeObject } from '@/assets/js/commonFun'
  import { fetchOrganization } from '@/apis/organization'
  import { classQuery,classInsert,classUpdate } from '@/apis/materialManage/outsource.js'
  export default {
    props: {
      flowId: String,
      inType: String
    },
    data: () => ({
      titleShow: '',
      orgList: [],
      isLoading: false,
      queryItem: {
        DepartName: "",
        VendorName: "",
        Name: "",
        UnitNumber: "",
        TEL: "",
        Memo: "",
      }
    }),
    mounted: function() {
      this.componentInit()
    },
    components: {

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
      _close() {
        this.$emit('close')
      },
      _getOrg() { //抓單位
        fetchOrganization({
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id
        }).then(res=>{
          if (res.data.ErrorCode == 0) {
            this.orgList = encodeObject(res.data.user_depart_list_group_1.map(item=>item.DepartName))
          }else{
            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
            this.$router.push({ path: '/error' })
          }
        }).catch( err => {
          this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
        }).finally(() => {
        })
      },
      componentInit() {
        this._getOrg()
        if(this.inType == 'edit') {
          this.titleShow = "編輯"
          this.isLoading = true
          classQuery({
            FlowID: this.flowId,
            ClientReqTime: getNowFullTime(),  // client 端請求時間
            OperatorID: this.userData.UserId,  // 操作人id
          }).then(res => {
            if (res.data.ErrorCode == 0) {
              this.queryItem.DepartName = res.data.DepartName
              this.queryItem.VendorName = res.data.VendorName
              this.queryItem.Name = res.data.Name
              this.queryItem.UnitNumber = res.data.UnitNumber
              this.queryItem.TEL = res.data.TEL
              this.queryItem.Memo = res.data.Memo
              this.queryItem = decodeObject(this.queryItem)
            } else {
              sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
              this.$router.push({ path: '/error' })
            }
          }).catch( err => {
            this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
          }).finally(() => {
            this.isLoading = false
          })
        }else if(this.inType == 'add'){
          this.titleShow = "新增"
        }
      },
      close() {
        this.$emit("close")
      },
      goSave() {
        this.isLoading = true
        if(this.inType == 'edit') {
          classUpdate({
            FlowID: this.flowId,
            ...this.queryItem,
            ClientReqTime: getNowFullTime(),  // client 端請求時間
            OperatorID: this.userData.UserId,  // 操作人id
          }).then(res=>{
            if (res.data.ErrorCode == 0) {
              this.chMsgbar({ success: true, msg: '資料更新成功' })
            } else {
              sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
              this.$router.push({ path: '/error' })
            }
          }).catch( err => {
            this.chMsgbar({ success: false, msg: '伺服器發生問題，資料更新失敗' })
          }).finally(() => {
            this.isLoading = false
          })
        }else if(this.inType == 'add') {
          classInsert({
            ...this.queryItem,
            ClientReqTime: getNowFullTime(),  // client 端請求時間
            OperatorID: this.userData.UserId,  // 操作人id
          }).then(res=>{
            if (res.data.ErrorCode == 0) {
              this.chMsgbar({ success: true, msg: '資料新增成功' })
            } else {
              sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
              this.$router.push({ path: '/error' })
            }
          }).catch( err => {
            this.chMsgbar({ success: false, msg: '伺服器發生問題，資料新增失敗' })
          }).finally(() => {
            this.isLoading = false
          })
        }
      }
    },
    filters: {
    
    },
    watch: {

    },
  }
</script>