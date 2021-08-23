<template>
  <v-card class="theme-card">
    <v-card-title class="white--text px-4 py-1">
      {{ dialogTitle }}
      <v-spacer></v-spacer>
      <v-btn dark fab small text @click="cancel" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text class="px-6 py-4 label-header">
      <v-row>

        <v-col cols="12" sm="4">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-account</v-icon>姓名
          </h3>
          <!-- <PeopleSelect v-model="ipt.ID" @getName="afterSelect"/> -->
          <PeopleSelectMuti :solo="true" :peopleList="ipt.ID" @getPeople="getPeople" />
        </v-col>

        <v-col cols="12" sm="4">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>證照編號
          </h3>
          <v-text-field
            v-model.trim="ipt.LicenseNo"
            solo
            placeholder="請輸入證照編號"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" />
        <v-col cols="12" sm="4">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>證照生效日
          </h3>
          <v-menu
            v-model="dateMemuShow.activeDate"
            :close-on-content-click="false"
            transition="scale-transition"
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model.trim="ipt.EffectiveDate"
                solo
                v-on="on"
                readonly
              ></v-text-field>
            </template>
            <v-date-picker
              color="purple"
              v-model="ipt.EffectiveDate"
              @input="dateMemuShow.activeDate = false"
              locale="zh-tw"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" sm="4">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>最後回訓日
          </h3>
          <v-menu
            v-model="dateMemuShow.lastTrain"
            :close-on-content-click="false"
            transition="scale-transition"
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model.trim="ipt.ReTrainingTime"
                solo
                v-on="on"
                readonly
              ></v-text-field>
            </template>
            <v-date-picker
              color="purple"
              v-model="ipt.ReTrainingTime"
              @input="dateMemuShow.lastTrain = false"
              locale="zh-tw"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <!-- <v-col cols="12" sm="4">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>證照有效日
          </h3>
          <v-menu
            v-model="dateMemuShow.expDate"
            :close-on-content-click="false"
            transition="scale-transition"
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model.trim="ipt.ExpDTime"
                solo
                v-on="on"
                readonly
              ></v-text-field>
            </template>
            <v-date-picker
              color="purple"
              v-model="ipt.ExpDTime"
              @input="dateMemuShow.expDate = false"
              locale="zh-tw"
            ></v-date-picker>
          </v-menu>
        </v-col> -->

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
      <v-btn class="mr-2 btn-close white--text" elevation="4"  :loading="isLoading" @click="cancel">取消</v-btn>
      <v-btn class="btn-add white--text" elevation="4"  :loading="isLoading" @click="save">送出</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PeopleSelect from '@/components/PeopleSelect.vue'
import PeopleSelectMuti from '@/components/PeopleSelectMuti'
import { getNowFullTime } from '@/assets/js/commonFun'
import { licenseOption } from '@/apis/smis/license'
export default {
  props: ['data','name'],
  data: () => ({
    ipt: {
      FlowID: '',
      License: '',
      ID: '',
      Name: '',
      JobName: '',
      LicenseNo: '',
      EffectiveDate: '',
      ReTrainingTime: '',
      ExpDTime: '',
      Memo: '',
    },  // dialog 欄位
    dateMemuShow: {
      activeDate: false,
      lastTrain: false,
      expDate: false
    },
    isLoading: false
  }),
  components: {
    PeopleSelect,
    PeopleSelectMuti
  },
  computed: {
      ...mapState ('user', {
          userData: state => state.userData,  // 使用者基本資料
      }),
      dialogTitle () {
        return this.data?'新增資料' : '編輯資料'
      },
  },
  methods: {
    ...mapActions('system', [
      'chMsgbar',  // 改變 messageBar
      'chLoadingShow',  // 切換 loading 圖顯示
      'chViewDialog',  // 檢視內容 dialog
    ]),
    // 初始化資料
    initData() {
      this.ipt.LicenseNo = ''
      this.ipt.EffectiveDate = ''
      this.ipt.ReTrainingTime = ''
      this.ipt.Memo = ''
      if(this.data){
        console.log("data: ", this.data);
        console.log("11 ipt: ", this.ipt);
        this.ipt = {...this.data}
        console.log("22 ipt: ", this.ipt);
        this.ipt.ReTrainingTime = this.ipt.ReTrainingTime.replace(/\//g,"-")
        this.ipt.EffectiveDate = this.ipt.EffectiveDate.replace(/\//g,"-")
        this.ipt.ExpDTime = this.ipt.ExpDTime.replace(/\//g,"-")
        this.ipt.License = this.name
      }
      
      console.log("ipt.Name: ", this.ipt.Name);
      
    },
    getPeople(value) {
      console.log("getPeople(value): ", value);
      
        if(value){
            this.ipt.ID = value.UserId
            this.ipt.Name = value.UserName
        } else {
            
        }
    },
    // 送出
    save() {
      if(this.ipt.Name == ''){
        alert("請選擇人員姓名")
        return
      }
      else if(this.ipt.LicenseNo == undefined || this.ipt.LicenseNo == ''){
        alert("請填寫證照編號")
        return
      }
      else if(this.ipt.EffectiveDate == undefined || this.ipt.ReTrainingTime == undefined || this.ipt.EffectiveDate == '' || this.ipt.ReTrainingTime == ''){
        alert("請選擇日期")
        return
      }
      if(this.ipt.Memo == undefined) this.ipt.Memo = '';

      // console.log("=============");
      // console.log("this.ipt: ", this.ipt);
      // console.log("this.data: ", this.data);
      // console.log("this.name: ", this.name);
      // return
      this.isLoading = true
      // this.ipt.ReTrainingTime = this.ipt.ReTrainingTime.replace(/-/g,"\/")
      // this.ipt.EffectiveDate = this.ipt.EffectiveDate.replace(/-/g,"\/")
      // this.ipt.ExpDTime = this.ipt.ExpDTime.replace(/-/g,"\/")
      licenseOption({
        ...this.ipt,
        Option: (this.data)?'2':'1',
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        LicenseFK: this.ipt.FlowID,
        License: this.name
      }).then(res=>{
        console.warn(res.data)
        if (res.data.ErrorCode == 0) {
          const msg = '資料' + ((this.data)?'修改':'新增') + '成功'
          this.chMsgbar({ success: true, msg: msg })
        }else{
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          this.$router.push({ path: '/error' })
        }
        console.log("licenseOption OK!111")
      }).catch( err => {
        console.warn(err)
        const msg = '伺服器發生問題，資料' + ((this.data)?'修改':'新增') + '失敗'
        this.chMsgbar({ success: false, msg: msg })
      }).finally(() => {
        console.log("licenseOption OK!222")
        this.isLoading = false
        this.cancel()
      })
    },
    afterSelect(name) {
      this.ipt.Name = name
    },
    cancel() {
      this.$emit('close')
    }
  },
  created() {
    this.initData()
  }
}
</script>