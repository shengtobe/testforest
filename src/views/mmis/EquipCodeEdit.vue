<template>
  <v-card class="theme-card">
    <v-card-title class="white--text px-4 py-1">
      <v-spacer>{{(inputType=='edit')?'編輯':inputType=='add'?'新增':''}}資料</v-spacer>
      <v-btn dark fab small text class="mr-n2" @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-row class="px-2 label-header">
      <v-col cols="2" align-self="center">
        <h3 align="center">科室單位</h3>
      </v-col>
      <v-col cols="10">
        <v-select solo hide-details
          :items="getDeptCode"
          item-text="value"
          item-value="key"
          deletable-chips
          v-model="codeDetail.DeptCode"
          :disabled="(inLevel == '1')?editDisable:true"
        ></v-select>
      </v-col>
      <v-col cols="2" align-self="center">
        <h3 align="center">上層</h3>
      </v-col>
      <v-col cols="10">
        <v-select v-if="inLevel != '5'" solo hide-details
          :items="getParentCode"
          item-text="value"
          item-value="key"
          v-model="codeDetail.ParentCode"
          :disabled="editDisable"
        ></v-select>
        <v-text-field
          v-else
          solo hide-details
          v-model="codeDetail.ParentCode"
          disabled></v-text-field>
      </v-col>
      <v-col cols="2" align-self="center">
        <h3 align="center">層級</h3>
      </v-col>
      <v-col cols="10">
        <v-text-field solo hide-details 
          v-model="codeDetail.EquipLevel"
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="2" align-self="center">
        <h3 align="center">代碼</h3>
      </v-col>
      <v-col cols="10">
        <v-text-field solo hide-details
          v-model="codeDetail.EquipCode"
          :disabled="editDisable"
        ></v-text-field>
      </v-col>
      <v-col cols="2" align-self="center">
        <h3 align="center">名稱</h3>
      </v-col>
      <v-col cols="10">
        <v-text-field solo hide-details
          v-model="codeDetail.EquipName"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-card-actions class="px-5 pb-5">
      <v-spacer></v-spacer>
      <v-btn class="mr-2 btn-close white--text" elevation="4" @click="close">取消</v-btn>
      <v-btn class="btn-add white--text" elevation="4" @click="save">儲存</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import { getNowFullTime,encodeObject,decodeObject } from '@/assets/js/commonFun'
  import { equipCodeDetail,equipCodeUpdate,equipCodeInsert } from '@/apis/materialManage/largeMaterial'
  export default {
    //外部傳入資料
    props: {
      detailCode: Object,
      inputType: String,
      parentList: Array,
      inLevel: String,
    },
    //內部變數
    data: () => ({
      codeDetail: {},
      defaultDeptCode: [
        {
          key: 'SYS_S',
          value: '服務科'
        },
        {
          key: 'SYS_M',
          value: '維護科'
        },
        {
          key: 'SYS_C',
          value: '養護科'
        },
      ],
    }),
    //渲染完成後
    mounted: function() {
      if(this.inputType == 'edit') {
        this.codeDetail = {}
        this._getCodeDetail()
      }else if(this.inputType == 'add') {
        this.codeDetail = {}
        this.codeDetail.EquipLevel = this.inLevel.substring(0,1)
        this.codeDetail.DeptCode = this.detailCode.DeptCode
        this.codeDetail.ParentCode = this.detailCode.ParentCode
      }
    },
    //引入元件
    components: {

    },
    //複雜物件
    computed: {
      ...mapState ('user', {
        userData: state => state.userData,  // 使用者基本資料
      }),
      
      getDeptCode: function() {
        let rtnObj = []
        if(this.inLevel == '1') {
          rtnObj = [
            {
              key: 'SYS',
              value: '系統'
            }
          ]
        }else{
          rtnObj = [...this.defaultDeptCode]
        }
        return rtnObj
      },
      getParentCode: function() {
        let rtnObj = []
        if(this.inLevel == '1') {
          rtnObj = [...this.defaultDeptCode]
        }else{
          rtnObj = this.parentList.map(item =>{ return {key:item.EquipCode,value:item.EquipName}}).reverse()
        }
        return rtnObj
      },
      editDisable: function() {
        return (this.inputType == 'edit')?true:(this.inputType == 'add')?false:true
        // return false
      }
    },
    //函式
    methods: {
      ...mapActions('system', [
        'chMsgbar',  // messageBar
        'chLoadingShow'  // 切換 loading 圖顯示
      ]),
      _getCodeDetail() {
        const that = this
        equipCodeDetail({
          DeptCode: that.detailCode.DeptCode,
          EquipCode: that.detailCode.EquipCode,
          EquipLevel: that.detailCode.EquipLevel,
          ParentCode: that.detailCode.ParentCode,
          ClientReqTime: getNowFullTime(),
          OperatorID: this.userData.UserId,  // 操作人id
        }).then(res => {
          if (res.data.ErrorCode == 0) {
            that.codeDetail = res.data
            that.codeDetail = decodeObject(that.codeDetail)
          } else {
            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
            that.$router.push({ path: '/error' })
          }
        }).catch( err => {
          this.chMsgbar({ success: false, msg: '伺服器發生問題，代碼查詢失敗' })
          console.warn(err)
        })
      },
      save() {
        const that = this
        let parmObj = {
            DeptCode: that.codeDetail.DeptCode,
            EquipCode: that.codeDetail.EquipCode,
            EquipLevel: that.codeDetail.EquipLevel,
            ParentCode: that.codeDetail.ParentCode,
            EquipName: that.codeDetail.EquipName,
            ClientReqTime: getNowFullTime(),
            OperatorID: that.userData.UserId,  // 操作人id
          }
        parmObj = encodeObject(parmObj)
        if(this.inputType == 'edit'){
          equipCodeUpdate(parmObj).then(res => {
            if (res.data.ErrorCode == 0) {
              that.chMsgbar({ success: true, msg: '編輯成功' })
            } else {
              sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
              that.$router.push({ path: '/error' })
            }
          }).catch( err => {
            that.chMsgbar({ success: false, msg: '伺服器發生問題，更新失敗' })
            console.warn(err)
          }).finally(() => {
            that.close()
          })
        }else if(this.inputType == 'add') {
          equipCodeInsert(parmObj).then(res => {
            if (res.data.ErrorCode == 0) {
              that.chMsgbar({ success: true, msg: '新增成功' })
            } else {
              sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
              that.$router.push({ path: '/error' })
            }
          }).catch( err => {
            that.chMsgbar({ success: false, msg: '伺服器發生問題，更新失敗' })
            console.warn(err)
          }).finally(() => {
            that.close()
          })
        }
      },
      close() {
        this.$emit('close',this.inLevel)
      }
    },
    //過濾
    filters: {

    },
    //監視
    watch: {
      detailCode: function() {
        if(this.inputType == 'edit'){
          this.codeDetail = {}
          this._getCodeDetail()
        }else if(this.inputType == 'add') {
          this.codeDetail = {}
          this.codeDetail.EquipLevel = this.inLevel.substring(0,1)
          this.codeDetail.DeptCode = this.detailCode.DeptCode
          this.codeDetail.ParentCode = this.detailCode.ParentCode
        }
      },
    },
    created() {
      
    }
  }
</script>