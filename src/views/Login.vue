<template>
<v-app id="app">
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar dark flat
              :color="mainColor"
            >
              <v-toolbar-title>林鐵資訊管理系統</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                autocomplete="off"
              >
                <!-- <v-text-field
                  label="帳號"
                  :rules="[v => !!v || '請輸入帳號']"
                  v-model.trim="ipt.account"
                  prepend-icon="mdi-account"
                />

                <v-text-field
                  label="密碼"
                  :rules="[v => !!v || '請輸入密碼']"
                  type="password"
                  v-model.trim="ipt.pwd"
                  prepend-icon="mdi-lock"
                /> -->
                <v-text-field
                  label="帳號"
                  v-model.trim="ipt.account"
                  prepend-icon="mdi-account"
                />

                <v-text-field
                  label="密碼"
                  type="password"
                  v-model.trim="ipt.pwd"
                  prepend-icon="mdi-lock"
                />
              </v-form>
              
              <v-btn
                class="my-3"
                :color="mainColor"
                block
                dark
                large
                :loading="isLoading"
                @click="submit"
              >Login</v-btn>

              <v-expand-transition>
                <v-alert
                  v-if="hasError"
                  text
                  type="error"
                  icon="mdi-cloud-alert"
                >{{ errMsg }}</v-alert>
              </v-expand-transition>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</v-app>
</template>

<script>
import { mapState } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { login } from '@/apis/login'
import aesjs from 'aes-js'

export default {
  data: () => ({
    mainColor: 'light-blue darken-1',
    // valid: true,    // 先備註掉
    valid: false,
    isLoading: false,
    hasError: false,
    errMsg: '',
    ipt: {
      account: 'demoUser',
      pwd: '000000'
    },
  }),
  computed: {
    ...mapState ('user', {
      key: state => state.key,  // 加密金鑰
    })
  },
  methods: {
    // 送出
    submit() {
      // if (this.$refs.form.validate()) {  // 驗證欄位
      //   this.isLoading = true
      //   this.errMsg = '重新認證中...'
        
      //   // 驗證帳密
      //   setTimeout(() => {
      //     if (
      //       this.ipt.account == 'admin' &&
      //       this.ipt.pwd == '1234'
      //     ) {
      //       localStorage.isLogined = true
      //       this.$router.push('/')
      //     } else {
      //       this.isLoading = false
      //       this.errMsg = '帳號或密碼錯誤！'
      //       this.hasError = true
      //     }
      //   }, 1000)
      // }

      // localStorage.isLogined = true
      // localStorage.user = JSON.stringify({
      //   name: '王小明'
      // })

      this.isLoading = true
      this.errMsg = '認證中...'

      login({
        UserId: '01009',  // 帳號(員工 id)
        UserPasswd: '1234',  // 密碼
        ClientReqTime: getNowFullTime()  // client 端請求時間
      }).then(res => {
        if (res.data.ErrorCode == 0) {
          localStorage.isLogined = true
          localStorage.jwt = res.data.Token
          localStorage.groupData = this.encode(JSON.stringify(res.data.GroupData), this.key)
          localStorage.userData = this.encode(JSON.stringify(res.data.UserData), this.key)
          this.$router.push('/')
        } else {
          this.errMsg = res.data.Msg
          this.isLoading = false
          this.hasError = true
        }
      }).catch(err => {
        this.errMsg = '伺服器發生錯誤!'
        this.isLoading = false
        this.hasError = true
      })
    },
    // 加密
    encode(str, key) {
      // 將文字轉換為位元組
      let textBytes = aesjs.utils.utf8.toBytes(str)

      // Counter 可省略，若省略則從 1 開始
      let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5))
      let encryptedBytes = aesCtr.encrypt(textBytes)

      // 將位元組轉成 16 進位，方便輸出
      return aesjs.utils.hex.fromBytes(encryptedBytes)
    },
  }
}
</script>