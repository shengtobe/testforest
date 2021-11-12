<!--
  input:
    solo: boolean 是否單選
    canEdit: boolean 是否可新增刪除
    peopleList: string array 預設人員清單，員編陣列
    valueCol: string 回傳的值要用欄位什麼回，還有要用什麼欄位設定上去
    disableList: array 不可以選擇的人員
  output:
    getPeople: object|array solo為true時回傳人員物件{DepartCode:單位代碼,DepartName:單位名稱,UserId:員工編號,UserName:員工姓名}，false的話回傳object array
-->
<template>
  <div>
    <v-chip label color="green darken-1" dark large v-for="(item) in PeopleList" :key="'P_'+item.UserId" close @click:close="deleteSelectPeople(item[valueCol])" class="ma-1"> {{ item.UserName }} </v-chip>
    <v-chip label color="green darken-1" dark large v-for="(item) in PeopleList_NoClose" :key="'P_'+item.UserId" class="ma-1"> {{ item.UserName }} </v-chip>
    <v-btn v-if="canEdit"
      class="mx-2 btn-add"
      fab
      dark
      small
      @click="openSelectPeople"
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
          <getPeople :defDeptId="userData.DeptList[0].DeptId" :solo="solo" :peopleList="PrepeopleList.map(e=>e[valueCol])" :valueCol="valueCol" :disableList="disableList" :key="'PK_'+peopleKey" @getPeople="saveSelectPeople"/>
        </v-lazy>
        <v-chip v-for="(item) in PrepeopleList" :key="'PP_'+item.UserId" close @click:close="deletePreselectPeople(item[valueCol])" class="ma-1"> {{ item.UserName }} </v-chip>
        <v-card-actions class="px-5 pb-5">
          <v-spacer></v-spacer>
          <v-btn class="mr-2 btn-close white--text" elevation="4" @click="cancelSelectPeople">取消</v-btn>
          <v-btn class="mr-2 btn-add white--text" elevation="4" @click="saveSelectedPeople">確認</v-btn>
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
	props: {
    solo: Boolean,
    canEdit: Boolean,
    peopleList: [String, Array],
    valueCol: {
      type: String,
      require: false,
      default: 'UserId'
    },
    disableList: {
      type:Array,
      require: false
    }
  },
	data: () => ({
    defPeopleList:[],
    people: [],
    PeopleList: [],
    PeopleList_NoClose: [],
    PrepeopleList: [],
    SelectPeople: false,
    isSolo: false,
    peopleKey: 0
	}),
	components: {
    getPeople
	},
	mounted() {
    if(this.solo){
      this.isSolo = this.solo
      this.defPeopleList = [this.peopleList]
    } else {
      this.defPeopleList = [...this.peopleList]
    }
    this.fetchOrganization()
    if(this.canEdit){
    }
    else{
      this.canEdit = true
    }
	},
	computed: {
    ...mapState ('user', {
      userData: state => state.userData,  // 使用者基本資料
    }),
    selectedPeople:function() {
      return this.PeopleList.map(e => {
        let rtnObj = {}
        rtnObj.PeopleId = e[this.valueCol]
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
        this.people = res.data.user_list_group_4
        this.PeopleList = this.people.filter(e=>this.defPeopleList.findIndex(el=>el==e[this.valueCol])!=-1)
        this.PeopleList_NoClose = this.people.filter(e=>this.defPeopleList.findIndex(el=>el==e[this.valueCol])!=-1)
        this.PrepeopleList = [...this.PeopleList]
        if(this.canEdit == false){ // 如果不能新增刪除
          this.PeopleList = [...[]] // 編輯的chip要清空
        }
        else{ // 如果可以新增刪除
          this.PeopleList_NoClose = [...[]] // 沒X的chip要清空
        }
      })
    },
    openSelectPeople() {
      this.PrepeopleList = [...this.PeopleList]
      this.peopleKey++
      this.SelectPeople=true
    },
    cancelSelectPeople(){
      this.SelectPeople = false
    },
    saveSelectPeople(peopleData) {
      if(this.isSolo) {
        this.PrepeopleList = [...[]]
        this.PrepeopleList.push(peopleData)
      } else {
        if(this.PrepeopleList.findIndex(e=>e[this.valueCol]==peopleData[this.valueCol])==-1){
          this.PrepeopleList.push(peopleData)
        }
      }
    },
    saveSelectedPeople(){
      this.PeopleList = this.PrepeopleList
      if(this.isSolo){
        this.$emit('getPeople',this.PeopleList[0])
      } else {
        this.$emit('getPeople',this.PeopleList)
      }
      this.cancelSelectPeople()
    },
    deleteSelectPeople(peopleId) {
      this.PeopleList.splice(this.PeopleList.findIndex(e=>e[this.valueCol]==peopleId),1)
      if(this.isSolo) {
        this.$emit('getPeople',undefined)
      } else {
        this.$emit('getPeople',this.PeopleList)
      }
    },
    deletePreselectPeople(peopleId) {
      this.PrepeopleList.splice(this.PrepeopleList.findIndex(e=>e[this.valueCol]==peopleId),1)
    }
	},
	filters: {
	},
	watch: {
    PeopleList: function(value) {
      this.PrepeopleList = [...value]
    }
	}
}
</script>