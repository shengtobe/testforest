<template>
  <v-card>
    <v-card-title class="light-blue darken-1 white--text px-4 py-1">
      {{ dialogTitle }}
      <v-spacer></v-spacer>
      <v-btn dark fab small text @click="cancel" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

  <v-card-text class="px-6 py-4">
    <v-row>
      <v-col cols="12" sm="4">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>證照名稱
        </h3>
        <v-text-field
          v-model.trim="ipt.License"
          solo
          :readonly="(license)?true:false"
          placeholder="請輸入證照名稱"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="4">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>初訓時間(小時)
        </h3>
        <v-text-field
          v-model.trim="ipt.InitTrainingTime"
          solo
          placeholder="請輸入初訓時間"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="4">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>回訓時間(小時)
        </h3>
        <v-text-field
          v-model.trim="ipt.ReTrainingTime"
          solo
          placeholder="請輸入回訓時間"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="4">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>有效時間(年)
        </h3>
        <v-text-field
          v-model.trim="ipt.ValidityPeriod"
          solo
          placeholder="請輸入有效時間"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>備註
        </h3>
        <v-text-field
          v-model.trim="ipt.Memo"
          solo
          placeholder="請輸入備註"
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
  </v-card-text>
  
  <v-card-actions class="px-5 pb-5">
    <v-spacer></v-spacer>
    <v-btn class="mr-2" elevation="4"  :loading="isLoading" @click="cancel">取消</v-btn>
    <v-btn color="success" elevation="4"  :loading="isLoading" @click="save">送出</v-btn>
  </v-card-actions>
</v-card>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { licenseRcdOption } from '@/apis/smis/license'
import { getNowFullTime } from '@/assets/js/commonFun'
export default {
    props:['license'],
    data: () => ({
      ipt: {
        FlowID: '',
        License: '',
        InitTrainingTime: '',
        ReTrainingTime: '',
        ValidityPeriod: '',
        Memo: '',
      },
      isLoading: false,
    }),
    computed: {
      ...mapState ('user', {
        userData: state => state.userData,  // 使用者基本資料
      }),
      dialogTitle () {
        return this.license? '新增資料' : '編輯資料'
      },
    },
    mounted() {
      if(this.license){
        this.ipt = this.license
      }
	  },
    methods: {
      ...mapActions('system', [
        'chMsgbar',  // 改變 messageBar
        'chLoadingShow',  // 切換 loading 圖顯示
        'chViewDialog',  // 檢視內容 dialog
      ]),
      // 送出
      save() {
        this.isLoading = true
        licenseRcdOption({
          Option: ((this.license)?'2':'1'),
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id
          ...this.ipt
        }).then(res=>{
          if (res.data.ErrorCode == 0) {
            const msg = '資料' + ((this.license)?'修改':'新增') + '成功'
            this.chMsgbar({ success: true, msg: msg })
          }else{
            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
            this.$router.push({ path: '/error' })
          }
        }).catch( err => {
          console.warn(err)
          this.chMsgbar({ success: false, msg: '伺服器發生問題，資料' + ((this.license)?'修改':'新增') + '失敗' })
        }).finally(() => {
          this.isLoading = false
        })
        this.cancel()
      },
      cancel() {
        this.$emit('cancel')
      }
    },
}
</script>