<template>
  <v-card class="theme-card">
    <v-card-title class="white--text px-4 py-1">
      {{showTitle}}資料
      <v-spacer></v-spacer>
      <v-btn dark fab small text @click="closeAct" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <div class="px-6 py-4">
      <v-row>
        <!-- 檢查項目 -->
        <v-col cols="12">
          <v-row no-gutter class="label-header">
            <v-col cols="12" sm="4">
              <h3 class="mb-1">機號</h3>
              <v-text-field solo value v-model="detailItem.SerialNo" />
            </v-col>
            
            <v-col cols="12" sm="4">
              <h3 class="mb-1">類型</h3>
              <v-select :items="typeData" v-model="detailItem.Type" item-text="value" item-value="key" label="類型" solo />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">持有人</h3>
              <peopleSelect :key="'selectPeople'+pskey" solo :peopleList="detailItem.ManID" ref="peopleSelect" @getPeople="getPeople"/>
            </v-col>
          </v-row>
          <v-row no-gutter class="label-header">
            <v-col cols="12" sm="4">
              <h3 class="mb-1">持有人編號</h3>
              <v-text-field solo v-model="detailItem.ManID" readonly/>
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">科室</h3>
              <v-select :items="departList" v-model="detailItem.DepartCode" label="科室" solo readonly/>
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">單位名稱</h3>
              <v-select :items="stationList" v-model="detailItem.DepartUnitCode" label="單位" solo readonly/>
            </v-col>
            
          </v-row>
          <v-row no-gutter class="label-header">
            <v-col cols="12" sm="4">
              <h3 class="mb-1">位置</h3>
              <v-text-field solo v-model="detailItem.Loc" label="請輸入位置"/>
            </v-col>
            <!-- <v-col cols="12" sm="4">
              <h3 class="mb-1">持有人</h3>
              <v-text-field solo v-model="detailItem.Name" readonly/>
            </v-col> -->
          </v-row>
        </v-col>
        <!-- END 檢查項目 -->
      </v-row>
    </div>
    <v-card-actions class="px-5 pb-5">
      <v-spacer></v-spacer>
      <v-btn class="mr-2 btn-close white--text" elevation="4" @click="closeAct">取消</v-btn>
      <v-btn class="btn-add white--text" elevation="4" @click="goSave">送出</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { getNowFullTime,encodeObject,decodeObject } from '@/assets/js/commonFun'
  import { radioDetail,radioUpdate } from '@/apis/materialManage/radioManage'
  import { fetchOrganization } from '@/apis/organization'
  import peopleSelect from '@/components/PeopleSelectMuti'
  export default {
    props: {
      nowFlowId: Number,
    },
    data: () => ({
      pskey: 0,
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
      users: [],  // 員工列表
      typeData: [   //H:手持式、S:固定式、C:車裝台
        {
          key: 'H',
          value: '手持式'
        },
        {
          key: 'S',
          value: '固定式'
        },
        {
          key: 'C',
          value: '車裝台'
        },
      ],
      deptData: [
        {
          key: 'ARCO004',
          value: '服務科'
        },
        {
          key: 'ARCO015',
          value: '維護科'
        }
      ],
      detailItem: {},
      departList: [],
      stationList: [],
    }),
    mounted: function() {
      this._getDetailData()
      // this._getOrg()
    },
    components: {
      peopleSelect,
    },
    computed: {
      ...mapState ('user', {
        userData: state => state.userData,  // 使用者基本資料
      }),
      showTitle: function() {
        return this.nowFlowId === -1?'新增':'編輯'
      },
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
    methods: {
      ...mapActions('system', [
        'chMsgbar',  // messageBar
        'chLoadingShow'  // 切換 loading 圖顯示
      ]),
      //觸發上層的關閉事件
      closeAct() {
        this.$emit('closeAct')
      },
      getPeople(val){
        this.getDefaultSelect(val.DepartCode)
        this.detailItem.ManID = val.UserId;
        this.detailItem.Name = val.UserName;
      },
      //抓單位清單
      _getOrg(){
        const that = this
        fetchOrganization().then(res => {
          // if (res.data.ErrorCode == 0) {
          //   that.departList = res.data.user_depart_list_group_1.map((item) => {
          //     return {key:item.DepartCode,value:item.DepartName}
          //   })
          // }else {
          //   sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          //   that.$router.push({ path: '/error' })
          // }
          if (res.data.ErrorCode == 0) {
            this.opts.lv1 = res.data.user_depart_list_group_1.map(e=>({value: e.DepartCode,text:e.DepartName}))
            this.opts.lv2 = res.data.user_depart_list_group_2.map(e=>({value: e.DepartCode,text:e.DepartName,parent:e.DepartParentName}))
            this.opts.lv3 = res.data.user_depart_list_group_3.map(e=>({value: e.DepartCode,text:e.DepartName,parent:e.DepartParentName}))
            this.users = res.data.user_list_group_4.map(e=>({value: e[this.valueCol],text:e.UserName,DepartCode:e.DepartCode}))
            this.departList = this.opts.lv1
            this.stationList = this.opts.lv2
          }
        }).catch( err => {
          this.chMsgbar({ success: false, msg: '伺服器發生問題，單位查詢失敗' })
        })
      },
      getDefaultSelect(defDeptId) {
        //defDeptId
        console.log("defDeptId: ", defDeptId);
        if(this.opts.lv1.findIndex(e=>e.value==defDeptId)>-1){
          this.detailItem.DepartCode = defDeptId
          this.detailItem.DepartName = this.opts.lv1.find(e=>e.value==defDeptId).text
        }
        if(this.opts.lv2.findIndex(e=>e.value==defDeptId)>-1){
          this.detailItem.DepartUnitCode = defDeptId
          this.detailItem.DepartUnit = this.opts.lv2.find(e=>e.value==defDeptId).text
          let parentName = this.opts.lv2.find(e=>e.value==defDeptId).parent
          this.detailItem.DepartName = parentName
          this.detailItem.DepartCode = this.opts.lv1.find(e=>e.text==parentName).value
        }
        if(this.opts.lv3.findIndex(e=>e.value==defDeptId)>-1){
          let lv2Name = this.opts.lv3.find(e=>e.value==defDeptId).parent
          this.detailItem.DepartUnitCode = this.opts.lv2.find(e=>e.text==lv2Name).value
          this.detailItem.DepartUnit = lv2Name
          let lv1Name = this.opts.lv2.find(e=>e.value==this.detailItem.DepartUnitCode).parent
          this.detailItem.DepartName = lv1Name
          this.detailItem.DepartCode = this.opts.lv1.find(e=>e.text==lv1Name).value
        }
      },
      _getDetailData(){
        const that = this
        const flow = that.nowFlowId.toString()
        if(that.nowFlowId === -1){
          that.detailItem = {
            DepartName:"",
            DepartCode:"",
            DepartUnit:"",
            DepartUnitCode:"",
            Loc:"",
            ManID:"",
            Name:"",
            SerialNo:"",
            Type:"",
            FlowId: -1
          }
            this._getOrg()
        }else{
          that.chLoadingShow({show:true})
          radioDetail({
            FlowId: flow,
            ClientReqTime: getNowFullTime(),  // client 端請求時間
            OperatorID: this.userData.UserId,  // 操作人id
          }).then( res => {
            if (res.data.ErrorCode == 0) {
              let nnn = res.data.Name
              console.log("111 res.data: ", res.data)
              console.log("111 res.data.ManID: ", res.data.ManID)
              that.detailItem = res.data
              fetchOrganization().then(res2 => {
                if (res2.data.ErrorCode == 0) {
                  this.opts.lv1 = res2.data.user_depart_list_group_1.map(e=>({value: e.DepartCode,text:e.DepartName}))
                  this.opts.lv2 = res2.data.user_depart_list_group_2.map(e=>({value: e.DepartCode,text:e.DepartName,parent:e.DepartParentName}))
                  this.opts.lv3 = res2.data.user_depart_list_group_3.map(e=>({value: e.DepartCode,text:e.DepartName,parent:e.DepartParentName}))
                  this.users = res2.data.user_list_group_4.map(e=>({value: e[this.valueCol],text:e.UserName,DepartCode:e.DepartCode}))
                  this.departList = this.opts.lv1
                  this.stationList = this.opts.lv2

                  // that.detailItem = res.data
                  let a = this.users.find(e => e.text == nnn).DepartCode
                  console.log("a: ", a);
                  this.getDefaultSelect(a)
                }
                this.pskey+=1
                console.log("this.pskey++")
              }).catch( err => {
                this.chMsgbar({ success: false, msg: '伺服器發生問題，單位查詢失敗' })
              })
              //
              
            } else {
              sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
              that.$router.push({ path: '/error' })
            }
          }).catch( err => {
            this.chMsgbar({ success: false, msg: '伺服器發生問題，資料查詢失敗' })
          }).finally(() => {
            that.chLoadingShow({show:false})
            if(that.detailItem != {}){
              that.detailItem = decodeObject(that.detailItem)
            }
          })
        }
        
      },
      goSave() {
        if(this.detailItem.SerialNo == '' || this.detailItem.Type == ''){
          alert("機號或類型未填")
          return
        }
        if(this.detailItem.Name == ''){
          alert("持有人未選")
          return
        }
        if(this.detailItem.Loc == ''){
          if (confirm('位置空白，是否繼續儲存?')){
          }else{
            return
          }
        }
        const that = this
        radioUpdate({
          ...that.detailItem,
          FlowId: that.nowFlowId,
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id
        }).then(res => {
          if(res.data.ErrorCode == 0) {
            that.chMsgbar({success:true, msg:'資料編輯成功！'})
          } else {
            essionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
            that.$router.push({ path: '/error' })
          }
        }).catch( err => {
          this.chMsgbar({ success: false, msg: '伺服器發生問題，資料查詢失敗' })
        }).finally(() => {
          that.detailItem = {
            DepartName:"",
            DepartCode:"",
            DepartUnit:"",
            DepartUnitCode:"",
            Loc:"",
            ManID:"",
            Name:"",
            SerialNo:"",
            Type:"",
            FlowId: -1
          }
          that.closeAct()
        })
      }
    },
    filters: {
    
    },
    watch: {
      nowFlowId: function() {
        this._getDetailData()
      }
    },
  }
</script>