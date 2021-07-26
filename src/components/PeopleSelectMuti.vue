<!--
  input:
    solo: boolean 是否單選
  output:
    getPeople: object|array solo為true時回傳人員物件{DepartCode:單位代碼,DepartName:單位名稱,UserId:員工編號,UserName:員工姓名}，false的話回傳object array
-->
<template>
  <div>
    <v-chip v-for="(item) in selectedPeople" :key="'P_'+item.PeopleId" close @click:close="deleteSelectedPeople(item.PeopleId)" class="ma-1"> {{ item.PeopleName }} </v-chip>
    <v-btn
      class="mx-2 btn-add"
      fab
      dark
      small
      @click="SelectPeople=true"
      v-show="(solo&&PeopleList.length==0)||(!solo)"
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
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { fetchOrganization } from '@/apis/organization'
import getPeople from '@/components/GetOrganizePeople'
export default {
	props: ['solo'],
	data: () => ({
    people: [],
    PeopleList: [],
    SelectPeople: false,
    isSolo: false
	}),
	components: {
    getPeople
	},
	mounted() {
    if(this.solo){
      this.isSolo = this.solo
    }
    this.fetchOrganization()
	},
	computed: {
    ...mapState ('user', {
      userData: state => state.userData,  // 使用者基本資料
    }),
    selectedPeople:function() {
      return this.PeopleList.map(e => {
        let rtnObj = {}
        rtnObj.PeopleId = e.UserId
        rtnObj.PeopleName = e.UserName
        return rtnObj
      })
    }
	},
	methods: {
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
      if(this.isSolo){
        this.PeopleList = [...[]]
        this.$emit('getPeople',peopleData)
        this.PeopleList.push(peopleData)
      } else {
        if(this.PeopleList.findIndex(e=>e.UserId==peopleData.UserId)==-1){
          this.PeopleList.push(peopleData)
        }
        this.$emit('getPeople',this.PeopleList)
      }
      this.cancelSelectPeople()
    },
    deleteSelectedPeople(peopleId) {
      this.PeopleList.splice(this.PeopleList.findIndex(e=>e==peopleId),1)
    },
	},
	filters: {
	},
	watch: {
	}
}
</script>