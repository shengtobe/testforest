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
            <v-col cols="12" sm="6">
              <h3 class="mb-1">提醒多人</h3>
              <!-- <v-autocomplete
                :items="orgList"
                :filter="aFilter"
                label="輸入人名或單位名稱進行搜尋"
                solo
                clearable
                deletable-chips
                multiple
                small-chips
                :loading="orgIsLoading"
                v-model="queryItem.PeopleList"
              /> -->
              <!-- <PeopleSelect v-model="queryItem.PeopleList" :isMuti="true" /> -->
              <v-chip v-for="(item) in selectedPeople" :key="'P_'+item.PeopleId" close @click:close="deleteSelectedPeople(item.PeopleId)" class="ma-1"> {{ item.PeopleName }} </v-chip>
              <v-btn
                class="mx-2 btn-add"
                fab
                dark
                small
                @click="SelectPeople=true"
              >
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
              <v-dialog v-model="SelectPeople" max-width="900px">
                <v-card class="theme-card">
                  <v-card-title class="white--text px-4 py-1">選擇人員
                    <v-spacer></v-spacer>
                    <v-btn dark fab small text @click="cancelSelectPeople" class="mr-n2">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-lazy>
                    <getPeople :defDeptId="userData.DeptList[0].DeptId" @getPeople="saveSelectPeople"/>
                  </v-lazy>
                  <v-card-actions class="px-5 pb-5">
                    <v-spacer></v-spacer>
                    <v-btn class="mr-2 btn-close white--text" elevation="4" @click="cancelSelectPeople">取消</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
            <v-col cols="12" sm="6">
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
  import getPeople from '@/components/GetOrganizePeople'
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
      SelectPeople: false
    }),
    mounted: function() {
      this.componentInit()
    },
    components: {
      getPeople
    },
    computed: {
      ...mapState ('user', {
        userData: state => state.userData,  // 使用者基本資料
      }),
      selectedPeople:function() {
        return this.queryItem.PeopleList.map(e => {
          let rtnObj = {}
          rtnObj.PeopleId = e
          rtnObj.PeopleName = this.people.find(ele => ele.value == e).text
          return rtnObj
        })
      },
      queryItemNull:function() {
        let keys = Object.keys(this.queryItem)
        let errArr = []
        keys.forEach(e=>{
          if(this.queryItem[e] == this.defaultQueryItem[e]) {
            errArr.push(e)
          }
        })
        return errArr
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
      /*
      _getOrg() { //抓單位
        this.orgIsLoading = true
        fetchOrganization({
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id
        }).then(res=>{
          if (res.data.ErrorCode == 0) {
            let rtndata = res.data
            const people = rtndata.user_list_group_4.map(element=>{
              let rtnObj = {}
              rtnObj.text = element.UserName
              rtnObj.value = element.UserId
              rtnObj.group = element.DepartName 
              rtnObj.child = ""
              return rtnObj
            })

            this.people = people
            const dept3 = rtndata.user_depart_list_group_3.map(ele => {
              let rtnObj3 = {}
              rtnObj3.header = ele.DepartName
              rtnObj3.text = ele.DepartName
              rtnObj3.group = ele.DepartParentName
              return rtnObj3
            })
            let dept2 = rtndata.user_depart_list_group_2.map(ele => {
              let rtnObj2 = {}
              rtnObj2.header = ele.DepartName
              rtnObj2.text = ele.DepartName
              rtnObj2.group = ele.DepartParentName
              return rtnObj2
            })
            let dept1 = rtndata.user_depart_list_group_1.map(ele => {
              let rtnObj1 = {}
              rtnObj1.header = ele.DepartName
              rtnObj1.text = ele.DepartName
              rtnObj1.group = ele.DepartName
              return rtnObj1
            })
            const that = this
            dept1.forEach(ele => {
              let rtnArrP1 = people.filter(e => {
                return e.group == ele.group
              })
              let rtnArr2 = dept2.filter(element => {
                return element.group == ele.text
              })
              if(rtnArrP1.length > 0 || rtnArr2.length > 0){
                ele.child = rtnArrP1.map(t=>t.text).toString()
                ele.value = rtnArrP1.map(t=>t.value).toString()
                that.orgList.push(ele)
              }
              that.orgList.push(...rtnArrP1)
              rtnArr2.forEach(element => {
                let rtnArrP2 = people.filter(e => {
                  return e.group == element.text
                })
                let rtnArr3 = []
                rtnArr3 = dept3.filter(item => {
                  return item.group == element.text
                })
                if(rtnArrP2.length > 0 || rtnArr3.length > 0){
                  element.child = rtnArrP2.map(t=>t.text).toString()
                  element.value = rtnArrP2.map(t=>t.value).toString()
                  that.orgList.push(element)
                }
                that.orgList.push(...rtnArrP2)
                rtnArr3.forEach(items => {
                  let rtnArrP3 = people.filter(e => {
                    return e.group == items.text
                  })
                  if(rtnArrP3.length > 0){
                    items.child = rtnArrP3.map(t=>t.text).toString()
                    items.value = rtnArrP3.map(t=>t.value).toString()
                    that.orgList.push(items)
                  }
                  that.orgList.push(...rtnArrP3)
                })
              })
            })
          }else{
            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
            this.$router.push({ path: '/error' })
          }
        }).catch( err => {
          this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
        }).finally(() => {
          this.orgIsLoading = false
        })
      },
      aFilter(item, queryText, itemText) { //選人的filter
        const text = (itemText.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1)
        const child = (item.child.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1)
        const group = (item.group.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1)
        const value = (item.value.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1)
        return text || group || child || value
      },
      */
      fetchOrganization() {
        fetchOrganization({
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id
        }).then(res=>{
          this.people = res.data.user_list_group_4.map(element=>{
              let rtnObj = {}
              rtnObj.text = element.UserName
              rtnObj.value = element.UserId
              rtnObj.group = element.DepartName 
              rtnObj.child = ""
              return rtnObj
            })
        })
      },
      cancelSelectPeople(){
        this.SelectPeople = false
      },
      saveSelectPeople(peopleData) {
        if(this.queryItem.PeopleList.findIndex(e=>e==peopleData.UserId)==-1){
          this.queryItem.PeopleList.push(peopleData.UserId)
        }
        this.cancelSelectPeople()
      },
      deleteSelectedPeople(peopleId) {
        this.queryItem.PeopleList.splice(this.queryItem.PeopleList.findIndex(e=>e==peopleId),1)
      },
      componentInit() {
        // this._getOrg()
        this.fetchOrganization()
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
              this.queryItem.PeopleList = res.data.PeopleList.map(item=>item.PeopleId)
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
      goSave() {
        const that = this
        this.isLoading = true
        //先處理人事資料部分
        this.queryItem.PeopleList = this.selectedPeople
        if(this.queryItemNull==[]){
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
        }
      }
    },
    filters: {
    
    },
    watch: {

    },
  }
</script>