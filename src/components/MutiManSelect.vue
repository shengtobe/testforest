<template>
  <div>
    <h3 class="mb-1">{{ label }}</h3>
    <v-autocomplete
      :items="orgList"
      :filter="aFilter"
      label="輸入人名或單位名稱進行搜尋"
      solo
      clearable
      deletable-chips
      multiple
      small-chips
      :loading="orgIsLoading"
      v-model="getValue"
    />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { fetchOrganization } from '@/apis/organization'
export default {
  props: ["value","label"],
  data: () => ({
    orgIsLoading: false,
    orgList: [],
    getValue: []
  }),
  computed: {
    ...mapState ('user', {
      userData: state => state.userData,  // 使用者基本資料
    }),
  },
  mounted: function() {
    this._getOrg()
    this.getValue = this.value
  },
  methods:{
    ...mapActions('system', [
      'chMsgbar',  // messageBar
      'chLoadingShow'  // 切換 loading 圖顯示
    ]),
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
                that.orgList.push(element)
              }
              that.orgList.push(...rtnArrP2)
              rtnArr3.forEach(items => {
                let rtnArrP3 = people.filter(e => {
                  return e.group == items.text
                })
                if(rtnArrP3.length > 0){
                  items.child = rtnArrP3.map(t=>t.text).toString()
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
        console.warn(err)
        this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
      }).finally(() => {
        this.orgIsLoading = false
      })
    },
    aFilter(item, queryText, itemText) { //選人的filter
      const text = (itemText.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1)
      const child = (item.child.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1)
      const group = (item.group.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1)

      return text || group || child
    },
  },
  watch: {
    getValue: function() {
      this.$emit('input',this.getValue)
    }
  },
}
</script>