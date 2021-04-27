<template>
<v-app id="app">
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12 theme-card">
            <v-toolbar dark flat
              class="metal-dark-yellow-top"
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
              
              <v-row>
                <v-col sm="6">
                  <v-btn block dark large
                    class="my-3 metal-dark-yellow-top"
                    :loading="isLoading"
                    @click="submit(true)"
                  >Login</v-btn>
                </v-col>

                <v-col sm="6">
                  <v-btn block dark large
                    class="my-3 metal-dark-yellow-top"
                    :loading="isLoading"
                    @click="submit(false)"
                  >Login (無驗證)</v-btn>
                </v-col>
              </v-row>

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
    // valid: true,    // 先備註掉
    valid: false,
    isLoading: false,
    hasError: false,
    errMsg: '',
    ipt: {
      account: '',
      pwd: ''
    },
  }),
  computed: {
    ...mapState ('user', {
      key: state => state.key,  // 加密金鑰
    })
  },
  methods: {
    // 送出
    submit(bool) {
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

      // --------------- 舊登入demo ---------
      // localStorage.isLogined = true
      // localStorage.user = JSON.stringify({
      //   name: '王小明'
      // })
      // this.$router.push('/')

      // ------------ 已寫好的登入功能，先備註掉 -------------
      this.isLoading = true
      this.errMsg = '認證中...'

      login({
        UserId: this.ipt.account,  // 帳號(員工ID，例如：01009)
        UserPasswd: this.ipt.pwd,  // 密碼(例如：1234)
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        BackDoor: (bool)? 'F' : 'T'  // F 不走後門、T 走後門
      }).then(res => {
        if (res.data.ErrorCode == 0) {
          localStorage.isLogined = true
          localStorage.jwt = this.encode(res.data.Token, this.key)  // JWT 也進行加密，要使用時再解密就好
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