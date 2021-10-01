<template>
  <v-card class="theme-card">
    <v-card-title class="white--text px-4 py-1">
      {{titleShow}}工作提醒
      <v-spacer></v-spacer>
      <v-btn dark fab small text  class="mr-n2" @click="_close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <div class="px-6 py-4">
      <v-row>
        <!-- 檢查項目 -->
        <v-col cols="12">
          <v-row no-gutter class="label-header">
            <v-col cols="12" sm="4">
              <h3 class="mb-1">單位(廠/庫、監工區)</h3>
              <v-text-field solo value v-model="queryItem.DepartName" />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">通知起始日</h3>
              <v-menu
                v-model="a_datestart"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model.trim="queryItem.AlarmDTime" solo v-on="on" readonly />
                </template>
                <v-date-picker
                  color="primary"
                  v-model="queryItem.AlarmDTime"
                  @input="a_datestart = false"
                  locale="zh-tw"
                />
              </v-menu>
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">通知結束日</h3>
              <v-menu
                v-model="a_dateend"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model.trim="queryItem.AlarmEndDTime" solo v-on="on" readonly />
                </template>
                <v-date-picker
                  color="primary"
                  v-model="queryItem.AlarmEndDTime"
                  @input="a_dateend = false"
                  locale="zh-tw"
                />
              </v-menu>
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">提醒週期(日曆天)</h3>
              <v-text-field type="number" min="1" solo  v-model="queryItem.Cycle" />
            </v-col>
            <v-col cols="12" sm="8">
              <h3 class="mb-1">提醒多人</h3>
              <peopleSelect :key="'peopleSelect' + psKey" @getPeople="saveSelectPeople" :peopleList="formatPeopleList"/>
            </v-col>
            <v-col cols="12" sm="12">
              <h3 class="mb-1">工作提醒事項</h3>
              <v-textarea auto-grow solo rows="4"  v-model="queryItem.Memo" />
            </v-col>
          </v-row>
        </v-col>
        <!-- END 檢查項目 -->
      </v-row>
    </div>
    <v-card-actions class="px-5 pb-5">
      <v-spacer></v-spacer>
      <v-btn class="mr-2 btn-close white--text" elevation="4" @click="_close">取消</v-btn>
      <v-btn class="btn-add white--text" elevation="4" :loading="isLoading" @click="goSave">送出</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import { getNowFullTime,encodeObject,decodeObject } from '@/assets/js/commonFun'
  import { fetchOrganization } from '@/apis/organization'
  import { jobQuery,jobInsert,jobUpdate } from '@/apis/materialManage/routine'
  import peopleSelect from '@/components/PeopleSelectMuti'
  export default {
    props: {
      flowId: String,
      inType: String
    },
    data: () => ({
      titleShow: '',
      a_datestart: "",
      a_dateend: "",
      add: {
        datestart: "",
      },
      orgList: [],
      people: [],
      isLoading: false,
      orgIsLoading: false,
      queryItem: {
        DepartName: "",
        Memo: "",
        AlarmDTime: "",
        AlarmEndDTime: "",
        Cycle: "",
        PeopleList: []
      },
      defaultQueryItem: {
        DepartName: "",
        Memo: "",
        AlarmDTime: "",
        AlarmEndDTime: "",
        Cycle: "",
        PeopleList: []
      },
      SelectPeople: false,
      psKey: 0,
    }),
    mounted: function() {
      this.componentInit()
    },
    components: {
      peopleSelect
    },
    computed: {
      ...mapState ('user', {
        userData: state => state.userData,  // 使用者基本資料
      }),
      queryItemNull:function() {
        let keys = Object.keys(this.queryItem)
        let errArr = []
        keys.forEach(e=>{
          if(this.queryItem[e] == this.defaultQueryItem[e]) {
            errArr.push(e)
          }
        })
        return errArr
      },
      formatPeopleList:function(){
        return this.queryItem.PeopleList.map(e => e.PeopleId)
      }
    },
    methods: {
      ...mapActions('system', [
        'chMsgbar',  // messageBar
        'chLoadingShow'  // 切換 loading 圖顯示
      ]),
      _close() {
        this.$emit('close')
      },
      
      /* 抓人 */
      saveSelectPeople(peopleData) {
        this.queryItem.PeopleList = peopleData.map(e=>({PeopleId: e.UserId, PeopleName: e.UserName}))
        this.psKey += 1
      },

      componentInit() {
        if(this.inType == 'edit') {
          this.titleShow = "編輯"
          this.isLoading = true
          jobQuery({
            AlarmFlowID: this.flowId,
            ClientReqTime: getNowFullTime(),  // client 端請求時間
            OperatorID: this.userData.UserId,  // 操作人id
          }).then(res => {
            if (res.data.ErrorCode == 0) {
              this.queryItem.DepartName = res.data.DepartName
              this.queryItem.Memo = res.data.Memo
              this.queryItem.AlarmDTime = res.data.AlarmDTime.split(' ')[0].replace(/\//g, "-")
              this.queryItem.AlarmEndDTime = res.data.AlarmEndDTime.split(' ')[0].replace(/\//g, "-")
              this.queryItem.Cycle = res.data.Cycle
              this.queryItem.PeopleList = res.data.PeopleList
              this.queryItem = decodeObject(this.queryItem)
            } else {
              sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
              this.$router.push({ path: '/error' })
            }
          }).catch( err => {
            this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
          }).finally(() => { 
            this.psKey += 1
            this.isLoading = false
          })
        }else if(this.inType == 'add'){
          this.titleShow = "新增"
        }
      },
      goSave() {
        const that = this
        this.isLoading = true
        //先處理人事資料部分
        if(this.queryItemNull.length==0){
          if(this.inType == 'edit') {
            jobUpdate({
              ...encodeObject(this.queryItem),
              AlarmFlowID: this.flowId,
              ClientReqTime: getNowFullTime(),  // client 端請求時間
              OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
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
              this._close()
            })
          }else if(this.inType == 'add'){
            jobInsert({
              ...encodeObject(this.queryItem),
              ClientReqTime: getNowFullTime(),  // client 端請求時間
              OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
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
              this._close()
            })
          }
        } else {
          this.chMsgbar({ success: true, msg: `${this.queryItemNull.join()}欄位尚未填寫` })
          this.isLoading = false
        }
      }
    },
    filters: {
    
    },
    watch: {

    },
  }
</script>