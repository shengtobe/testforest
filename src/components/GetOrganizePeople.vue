<template>
<!-- 
  傳入參數：
    defDeptId: 預設的單位
    peopleList: 預設人員清單，string array valueCol欄位陣列
    valueCol: string 回傳的值要用欄位什麼回，還有要用什麼欄位設定上去
    disableList: array 不可以選擇的人員
  回傳function：
    getPeople: 員編
 -->
<!-- 下拉選單 -->
  <v-row no-gutters class="mt-5" cols="3">
    <v-col class="px-4">
      <h3 class="mb-1">
        <v-icon class="mr-1 mb-1">mdi-account</v-icon>科室
      </h3>
      <v-select
        v-model="select.lv1"
        :items="selectOptions.lv1"
        solo
      ></v-select>
    </v-col>

    <v-col class="px-4">
      <h3 class="mb-1">
        <v-icon class="mr-1 mb-1">mdi-account</v-icon>車站、工廠、車庫、監工區
      </h3>
      <v-select
        v-model="select.lv2"
        :items="selectOptions.lv2"
        :disabled="selectOptions.lv2.length==0"
        solo
      ></v-select>
    </v-col>

    <v-col class="px-4">
      <h3 class="mb-1">
        <v-icon class="mr-1 mb-1">mdi-account</v-icon>班、組
      </h3>
      <v-select
        v-model="select.lv3"
        :items="selectOptions.lv3"
        :disabled="selectOptions.lv3.length==0"
        solo
      ></v-select>
    </v-col>

    <!-- 姓名 -->
    <v-col cols="12" class="px-4 mt-3">
      <h3 class="mb-3">
        <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>姓名
      </h3>
      <v-btn v-if="!solo" outlined large tile color="brown" class="mr-4 mb-3" @click="selAll">
        全選
      </v-btn>
      <v-btn
        v-for="item in selectOptions.user"
        :key="item.value"
        @click="choseUser(item)"
        outlined
        :disabled="peopleList.findIndex(e=>e==item.value)!=-1||disableList.findIndex(e=>e==item.value)!=-1"
        large
        tile
        color="brown"
        class="mr-4 mb-3"
      >{{ item.text }}</v-btn>
    </v-col>
  </v-row>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { fetchOrganization } from '@/apis/organization'
export default {
  props:{
    defDeptId: String,
    peopleList: Array,
    valueCol: {
      type: String,
      require: false,
      default: 'UserId'
    },
    disableList: {
      type:Array,
      require: false,
      default: () => []
    },
    solo: Boolean
  },
  data: () => ({
    select: {
      lv1: '',
      lv2: '',
      lv3: '',
    },
    opts: {
      lv1: [],
      lv2: [],
      lv3: [],
    },
    disable: {  // 下拉選單是否禁用
      lv2: true,
      lv3: true,
    },
    users: [],  // 員工列表
    choseData: {   // 所選的員工資料
      uid: '',
      name: '',
    },
    dialogShow: false,
    userDataFull: []//員工列表大全
  }),
  computed: {
    ...mapState ('user', {
      userData: state => state.userData
    }),
    selectOptions:function() {
      const that = this
      let lv2 = that.select.lv1==''?[]:that.opts.lv2.filter(e=>e.parent==that.opts.lv1.find(e=>e.value==that.select.lv1).text)||[]
      let lv3 = that.select.lv2==''?[]:that.opts.lv3.filter(e=>e.parent==that.opts.lv2.find(e=>e.value==that.select.lv2).text)||[]
      const nowDept = that.select.lv3!=''&&lv3.length>0&&lv3.findIndex(e=>e.value==that.select.lv3)>-1?that.select.lv3:that.select.lv2!=''&&lv2.length>0&&lv2.findIndex(e=>e.value==that.select.lv2)>-1?that.select.lv2:that.select.lv1
      if(lv2.length>0){
        lv2.unshift({value:'',text:''})
      }
      if(lv3.length>0){
        lv3.unshift({value:'',text:''})
      }
      return {
        lv1: that.opts.lv1,
        lv2: lv2,
        lv3: lv3,
        user: that.users.filter(e=>e.DepartCode==nowDept)
      }
    }
  },
  watch: {
    "select.lv1": function(value){
      this.select.lv2 = ''
      this.select.lv3 = ''
    },
    "select.lv2": function(value){
      this.select.lv3 = ''
    }
  },
  methods: {
    // 向後端取得資料
    async fetchDdata() {
      try {
        let res = await fetchOrganization({ ClientReqTime: getNowFullTime() })  // 取得組織表所有資料
        this.opts.lv1 = res.data.user_depart_list_group_1.map(e=>({value: e.DepartCode,text:e.DepartName}))
        this.opts.lv2 = res.data.user_depart_list_group_2.map(e=>({value: e.DepartCode,text:e.DepartName,parent:e.DepartParentName}))
        this.opts.lv3 = res.data.user_depart_list_group_3.map(e=>({value: e.DepartCode,text:e.DepartName,parent:e.DepartParentName}))
        this.users = res.data.user_list_group_4.map(e=>({value: e[this.valueCol],text:e.UserName,DepartCode:e.DepartCode}))
        this.userDataFull = res.data.user_list_group_4
        this.getDefaultSelect()
      } catch (err) {
        console.error("err",err)
        alert('組職表資料取得失敗')
      }
    },
    // 選擇員工
    choseUser(item) {
      this.peopleList.push(item.value)
      this.$emit('getPeople',this.userDataFull.find(e=>e[this.valueCol]==item.value))
    },
    getDefaultSelect() {
      //defDeptId
      if(this.opts.lv1.findIndex(e=>e.value==this.defDeptId)>-1){
        this.select.lv1 = this.defDeptId
      }
      if(this.opts.lv2.findIndex(e=>e.value==this.defDeptId)>-1){
        this.select.lv2 = this.defDeptId
        let parentName = this.opts.lv2.find(e=>e.value==this.defDeptId).parent
        this.select.lv1 = this.opts.lv1.find(e=>e.text==parentName).value
      }
      if(this.opts.lv3.findIndex(e=>e.value==this.defDeptId)>-1){
        this.select.lv3 = this.defDeptId
        let lv2Name = this.opts.lv3.find(e=>e.value==this.defDeptId).parent
        this.select.lv2 = this.opts.lv2.find(e=>e.text==lv2Name).value
        let lv1Name = this.opts.lv2.find(e=>e.value==this.select.lv2).parent
        this.select.lv1 = this.opts.lv1.find(e=>e.text==lv1Name).value
      }
    },
    selAll() {
      this.selectOptions.user.forEach(e=>{
        if(this.peopleList.findIndex(el=>el==e.value)==-1&&this.disableList.findIndex(el=>el==e.value)==-1) {
          this.choseUser(e)
        }
      })
    }
  },
  created() {
    this.fetchDdata()
  },
}
</script>