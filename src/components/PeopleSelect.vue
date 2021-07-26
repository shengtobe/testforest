<template>
  <v-autocomplete
    :items="orgList"
    :filter="aFilter"
    label="輸入人名/員工編號或單位名稱進行搜尋"
    solo
    :multiple="isMuti"
    :deletable-chips="isMuti"
    clearable
    small-chips
    v-model="inputValue"
    :loading="orgIsLoading"
    v-on="$listeners"
    :disabled="disabled"
    />
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { fetchOrganization } from '@/apis/organization'
/*
  isMuti: true=>選多人，傳入值必須是string array
          false=>選單人，傳入值必須是string
  outdata: 直接從commonFun裡面的getOrg拉資料進來，避免同一頁連續讀取重複資料的問題
  可以直接綁定原生事件
*/
export default {
	props: ['value','isMuti','disabled','outdata'],
	data: () => ({
    orgList:[],
    orgIsLoading:false,
    people:[],
    inputValue:'',
    inputName:'',
	}),
	mounted() {
    if(this.outData){
      this.orgList = this.outdata.orgList
      this.people = this.outdata.people
      this.inputValue = this.value
    }else{
      this._getOrg()
    }
	},
	computed: {
		...mapState ('user', {
      userData: state => state.userData,  // 使用者基本資料
    }),
    selectName:function() {
      if(Array.isArray(this.inputValue)){
          this.inputName = this.inputValue.map(element=>{
          return this.people.find(el=>el.value==element)?.text||""
        })
      }else{
         this.inputName = this.people.find(el=>el.value==this.inputValue)?.text||""
      }
      return this.inputName
    }
	},
	methods: {
    ...mapActions('system', [
      'chMsgbar',  // 改變 messageBar
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
              ele.child = rtnArrP1.map(t=>t.text).toString()+','
              ele.value = rtnArrP1.map(t=>t.value).toString()+','
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
                element.child = rtnArrP2.map(t=>t.text).toString()+','
                element.value = rtnArrP2.map(t=>t.value).toString()+','
                that.orgList.push(element)
              }
              that.orgList.push(...rtnArrP2)
              rtnArr3.forEach(items => {
                let rtnArrP3 = people.filter(e => {
                  return e.group == items.text
                })
                if(rtnArrP3.length > 0){
                  items.child = rtnArrP3.map(t=>t.text).toString()+','
                  items.value = rtnArrP3.map(t=>t.value).toString()+','
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
	},
  watch: {
    inputValue: function(value){
      this.$emit('input',value)
      this.$emit('getName',this.selectName)
    }
  },
}
</script>