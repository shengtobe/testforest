<template>
  <div class="px-6 py-4">
    <v-row>
      <!-- 檢查項目 -->
      <v-col cols="12">
        <v-row no-gutter class="indigo--text">
          <v-col cols="12">
            <h3 class="mb-1">設備標示編號</h3>
            <v-text-field solo value readonly v-model="detailItems.MaintainCode" />
          </v-col>
          <v-col cols="12">
            <h3 class="mb-1">設備名稱</h3>
            <v-text-field solo v-model="detailItems.EqipName" />
          </v-col>
          <v-col cols="12">
            <h3 class="mb-1">設備功能描述</h3>
            <v-text-field solo rows="4" v-model="detailItems.Description" />
          </v-col>
          <v-col cols="12" md="6">
            <h3 class="mb-1">型號</h3>
            <v-text-field solo v-model="detailItems.Type" />
          </v-col>
          <v-col cols="12" md="6">
            <h3 class="mb-1">版本</h3>
            <v-text-field solo v-model="detailItems.Ver" />
          </v-col>
          <v-col cols="12" md="6">
            <h3 class="mb-1">製造商</h3>
            <v-text-field solo v-model="detailItems.Company" />
          </v-col>
          <v-col cols="12" md="6">
            <h3 class="mb-1">供應商</h3>
            <v-text-field solo v-model="detailItems.Supplier" />
          </v-col>
          <v-col cols="12">
            <h3 class="mb-1">維修單位</h3>
            <v-select 
              solo hide-details 
              v-model="detailItems.DepartCode"
              :items="departList"
              item-text="value"
              item-value="key"/>
          </v-col>
          <v-col cols="12">
            <h3 class="mb-1">外部維修單位</h3>
            <v-text-field solo v-model="detailItems.OutMaintainDepart" />
          </v-col>
          <!-- <v-col cols="12" sm="4">
            <h3 class="mb-1">外部維修單位</h3>
            <v-text-field solo />
          </v-col> -->
          <v-col cols="12">
            <h3 class="mb-1">上傳照片</h3>
            <v-file-input solo multiple show-size truncate-length="15" />
          </v-col>
          <v-col cols="12">
            <h3 class="mb-1">上傳技術文件</h3>
            <v-file-input solo multiple show-size truncate-length="15" />
          </v-col>
        </v-row>
      </v-col>
      <!-- END 檢查項目 -->
    </v-row>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { fetchOrganization } from '@/apis/organization'
export default {
  props: {
    detailItems: Object,
  }
  ,
  data: () => ({
    departList: [],
  }),
  mounted: function() {
    //console.log(this.detailItems)
    this._getOrg()
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
    _getOrg(){
      const that = this
      fetchOrganization({}).then(res => {
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
    }
  },
  filters: {
    
  },
  created() {},
};
</script>