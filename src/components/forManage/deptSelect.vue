<!--
  輸入: 
    label: 標題
    iconYN: 是否要圖標，預設否 
    outType: 使用甚麼回傳值 value=>單位名稱 key=>單位代碼
  v-model: 綁定變數
  使用範例:
    <deptSelect label="管理單位" v-model="input.department" :iconYN="formIconShow" outType="value" key="department"/>
-->
<template>
  <div>
    <h3 class="mb-1">
      <v-icon class="mr-1 mb-1" v-if="ifIcon">mdi-domain</v-icon>{{label}}
    </h3>
    <v-select :items="deptOptions" item-text="value" :item-value="outType" v-model="dataSet" solo :loading="isLoading" :readonly="isReadonly"/>
  </div>
</template>
<script>
import { mapState,mapActions } from 'vuex'
import { fetchOrganization } from '@/apis/organization'
import { getNowFullTime,decodeObject } from '@/assets/js/commonFun'
export default {
  name: "deptSelect",
  props:{
    showIcon: Boolean,
    label: String,
    value: String,
    outType: String,
    readonly: Boolean,
  },
  data: () => ({
    showYN: false,
    dataSet: "",
    ifIcon: false,
    deptOptions: [],
    isLoading: false,
    isReadonly: false,
    itemValue: "value",
  }),
  components: {
  
  },
  mounted() {
    this.dataSet = this.value
    this.ifIcon = (this.showIcon)?this.showIcon:this.ifIcon
    this.itemValue = (this.outType)?this.outType:this.itemValue 
    this.isReadonly = this.readonly?this.readonly:this.isReadonly
    this._getOrg()
  },
  computed: {
    ...mapState("user", {
      userData: (state) => state.userData, // 使用者基本資料
    }),
    // compute_name:function() {
    
    // }
  },
  created: function () {
  
  },
  methods: {
    ...mapActions("system", [
      "chMsgbar", // messageBar
      "chLoadingShow", // 切換 loading 圖顯示
    ]),
   //抓單位清單
    _getOrg(){
      const that = this
      that.isLoading = true
      fetchOrganization({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res => {
        if (res.data.ErrorCode == 0) {
          that.deptOptions = res.data.user_depart_list_group_1.map((item) => {
            return {key:item.DepartCode,value:item.DepartName}
          })
          that.deptOptions = [{key:"",value:"不限"},...that.deptOptions]
        }else {
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          that.$router.push({ path: '/error' })
        }
      }).catch( err => {
        this.chMsgbar({ success: false, msg: '伺服器發生問題，單位查詢失敗' })
      }).finally(() => {
          that.deptOptions = decodeObject(that.deptOptions)
          that.isLoading = false
      })
    },
  },
  filters: {
    // filter_name:function(value) {
    
    // }
  },
  watch: {
    dataSet: function(value) {
      this.$emit('input',value)
    },
    value: function(value) {
      this.dataSet = value
    }
  }
}
</script>