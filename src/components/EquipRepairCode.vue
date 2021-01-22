<!--
選擇設備報修碼的共用元件
輸入:
      ifLV5:是否也要選工作項? true為是，false為否
      nowEqCode:現在已選擇好的設備報修碼
      nowWorkCode:現在已選擇好的工作項
回傳方法
      _returnEqCode:回傳組好的設備報修碼
      _returnWorkCode:回傳選擇的工作項
-->
<template>
  <v-row class="px-2 mb-6">

    <v-col cols="12" class="mt-n4">
      <v-row>
        <v-col cols="12" align-self="center">
          <h3 class="ml-md-6">系統</h3>
        </v-col>
        <v-col cols="12">
          <v-select solo hide-details
            :items="eqCodes.eqCodeListLv1"
            item-text="EquipName"
            item-value="EquipCode"
            @change="goChange($event,'1')"
            label="請選擇"
            v-model="selectItem.Lv1"
          ></v-select>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <v-row>
        <v-col cols="12" align-self="center">
          <h3 class="ml-md-6">位置</h3>
        </v-col>
        <v-col cols="12">
          <v-select solo hide-details
            :items="eqCodes.eqCodeListLv2"
            item-text="EquipName"
            item-value="EquipCode"
            @change="goChange($event,'2')"
            label="請選擇"
            v-model="selectItem.Lv2"
            :disabled="_selectDisabled.eqCodeListLv2"
          ></v-select>
        </v-col>
        <v-col cols="12" v-if="_show22">
          <v-select solo hide-details
            :items="eqCodes.eqCodeListLv22"
            item-text="EquipName"
            item-value="EquipCode"
            @change="goChange($event,'22')"
            label="請選擇"
            v-model="selectItem.Lv22"
            :disabled="_selectDisabled.eqCodeListLv22"
          ></v-select>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <v-row>
        <v-col cols="12" align-self="center">
          <h3 class="ml-md-6">設備</h3>
        </v-col>
        <v-col cols="12">
          <v-select solo hide-details
            :items="eqCodes.eqCodeListLv3"
            item-text="EquipName"
            item-value="EquipCode"
            @change="goChange($event,'3')"
            label="請選擇"
            v-model="selectItem.Lv3"
            :disabled="_selectDisabled.eqCodeListLv3"
          ></v-select>
        </v-col>
        <v-col cols="12" v-if="_show32">
          <v-select solo hide-details
            :items="eqCodes.eqCodeListLv32"
            item-text="EquipName"
            item-value="EquipCode"
            @change="goChange($event,'32')"
            label="請選擇"
            v-model="selectItem.Lv32"
            :disabled="_selectDisabled.eqCodeListLv32"
          ></v-select>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <v-row>
        <v-col cols="12" align-self="center">
          <h3 class="ml-md-6">序號</h3>
        </v-col>
        <v-col cols="12">
          <v-select solo hide-details
            :items="eqCodes.eqCodeListLv4"
            item-text="EquipName"
            item-value="EquipCode"
            @change="goChange($event,'4')"
            label="請選擇"
            v-model="selectItem.Lv4"
            :disabled="_selectDisabled.eqCodeListLv4"
          ></v-select>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" v-if="ifLV5">
      <v-row>
        <v-col cols="12" align-self="center">
          <h3 class="ml-md-6">工作項</h3>
        </v-col>
        <v-col cols="12">
          <v-select solo hide-details
            :items="eqCodes.eqCodeListLv5"
            item-text="EquipName"
            item-value="EquipCode"
            @change="goChange($event,'5')"
            label="請選擇"
            v-model="selectItem.Lv5"
          ></v-select>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import { getNowFullTime,decodeObject } from '@/assets/js/commonFun'
  import { fetchEqCode,fetchEqList } from '@/apis/materialManage/equipCode'
  export default {
    //外部傳入資料
    props: {
      ifLV5: Boolean,
      nowEqCode: String,
      nowWorkCode: String,
    },
    //內部變數
    data: () => ({
      //各層的選項變數
      eqCodes: {
        eqCodeListLv1:[],
        eqCodeListLv2:[],
        eqCodeListLv22:[],
        eqCodeListLv3:[],
        eqCodeListLv32:[],
        eqCodeListLv4:[],
        eqCodeListLv5:[],
      },
      //科別
      nowParent: '',

      //選擇的選項
      selectItem: {
        Lv1: '',
        Lv2: '',
        Lv22: '',
        Lv3: '',
        Lv32: '',
        Lv4: '',
        Lv5: ''
      },
      newEqCode: '',  //設備報修碼
      newWorkCode: ''   //工作項目
    }),
    //渲染完成後
    mounted: function() {
      this._componentInit()
      
    },
    //引入元件
    components: {

    },
    //複雜物件
    computed: {
      ...mapState ('user', {
        userData: state => state.userData,  // 使用者基本資料
      }),
      _show22: function() {
        return (this.eqCodes.eqCodeListLv22.length > 0)?true:false
      },
      _show32: function() {
        return (this.eqCodes.eqCodeListLv32.length > 0)?true:false
      },
      _selectDisabled: function() {
        let rtnObj = {}
        const that = this
        rtnObj.eqCodeListLv2 = (that.eqCodes.eqCodeListLv1.length > 0 && that.selectItem.Lv1!='')?false:true
        rtnObj.eqCodeListLv22 = (that.eqCodes.eqCodeListLv2.length > 0 && that.selectItem.Lv2!='')?false:true
        rtnObj.eqCodeListLv3 = (that.eqCodes.eqCodeListLv2.length > 0 && (that._show22?that.selectItem.Lv22!='':that.selectItem.Lv2!=''))?false:true
        rtnObj.eqCodeListLv32 = (that.eqCodes.eqCodeListLv3.length > 0 && that.selectItem.Lv3!='')?false:true
        rtnObj.eqCodeListLv4 = (that.eqCodes.eqCodeListLv4.length > 0 && (that._show32?that.selectItem.Lv32!='':that.selectItem.Lv3!=''))?false:true
        return rtnObj
      }
    },
    //函式
    methods: {
      ...mapActions('system', [
        'chMsgbar',  // messageBar
        'chLoadingShow'  // 切換 loading 圖顯示
      ]),
      //初始化
      async _componentInit() {
        this.selectItem = {
          Lv1: '',
          Lv2: '',
          Lv22: '',
          Lv3: '',
          Lv32: '',
          Lv4: '',
          Lv5: ''
        }
        if(this.nowEqCode == '' || this.nowEqCode == undefined || this.nowEqCode == null){ //沒有帶值進來
          this._getEqList('SYS','SYS_%','1','1')
        }else{  //有帶值進來
          const that = this
          let resdata = {}
          //先把清單帶出來
          await this._getEqList('SYS','SYS_%','1','1')
          //改值之後觸發修改
          //用API把所有選項都帶出來
          await fetchEqList({
            FullCode: that.nowEqCode,
            ClientReqTime: getNowFullTime(),
            OperatorID: this.userData.UserId,  // 操作人id
          }).then( res => {
            if (res.data.ErrorCode == 0) {
                resdata = res.data
            }else {
              sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
              that.$router.push({ path: '/error' })
            }
          })
          that.selectItem.Lv1 = resdata.EquipLv1
          await that.goChange(that.selectItem.Lv1,'1')
          that.selectItem.Lv2 = resdata.EquipLv2
          await that.goChange(that.selectItem.Lv2,'2')
          that.selectItem.Lv22 = resdata.EquipLv22
          if(resdata.EquipLv22 != ""){
            await that.goChange(that.selectItem.Lv22,'22')
          }
          that.selectItem.Lv3 = resdata.EquipLv3
          await that.goChange(that.selectItem.Lv3,'3')
          that.selectItem.Lv32 = resdata.EquipLv32
          if(resdata.EquipLv32 != ""){
            await that.goChange(that.selectItem.Lv32,'32')
          }
          that.selectItem.Lv4 = resdata.EquipLv4
          await that.goChange(that.selectItem.Lv4,'4')
          if(this.ifLV5){
            that.selectItem.Lv5 = that.nowWorkCode
            await that.goChange(that.selectItem.Lv5,'5')
          }
        }
      },
      //取得項目
      async _getEqList(deptCode,parentCode,eqLevel,toObjectLv) {
        //習慣加一個能用的that變數，避免呼叫到其他class的時候指錯對象
        const that = this
        const toObject = 'eqCodeListLv' + toObjectLv
        await fetchEqCode({
          DeptCode: deptCode,
          ParentCode: parentCode,
          EequipLevel: eqLevel,
          ClientReqTime: getNowFullTime(),
          OperatorID: this.userData.UserId,  // 操作人id
        }).then( res => {
          if (res.data.ErrorCode == 0) {
            if(res.data.code_list.length > 0 && that.eqCodes[toObject].length == 0){
              that.eqCodes[toObject].push(...res.data.code_list)
              that.eqCodes[toObject] = decodeObject(that.eqCodes[toOBject])
            }
          }else {
            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
            that.$router.push({ path: '/error' })
          }
        }).catch( err => {
          this.chMsgbar({ success: false, msg: '伺服器發生問題，清單查詢失敗' })
        })
      },
      //每次變動
      async goChange(LParentCode,eqLevel) {
        const that = this
        const listName = 'eqCodeListLv' + eqLevel
        //動到系統就要重抓科別
        if(eqLevel == '1'){
          that.nowParent = that.eqCodes[listName].find(ele => ele.EquipCode == LParentCode).ParentCode
        }
        //依照不同的邏輯去抓
        switch(eqLevel){
          case '1':
            //reset all
            that.eqCodes.eqCodeListLv2 = []
            that.eqCodes.eqCodeListLv22 = []
            that.eqCodes.eqCodeListLv3 = []
            that.eqCodes.eqCodeListLv32 = []
            that.eqCodes.eqCodeListLv4 = []
            that.eqCodes.eqCodeListLv5 = []
            that.selectItem.Lv2 = ''
            that.selectItem.Lv22 = ''
            that.selectItem.Lv3 = ''
            that.selectItem.Lv32 = ''
            that.selectItem.Lv4 = ''
            that.selectItem.Lv5 = ''
            //get options
            await that._getEqList(that.nowParent,LParentCode,'2','2')
            await that._getEqList(that.nowParent,LParentCode,'22','22')
            await that._getEqList(that.nowParent,LParentCode,'3','3')
            await that._getEqList(that.nowParent,LParentCode,'32','32')
            await that._getEqList(that.nowParent,LParentCode,'4','4')
            if(that.ifLV5){
              await that._getEqList(that.nowParent,LParentCode,'5','5')
            }
            that.newEqCode = that.selectItem.Lv1 
            break;
          case '2':
            //reset
            that.eqCodes.eqCodeListLv22 = []
            that.eqCodes.eqCodeListLv3 = []
            that.eqCodes.eqCodeListLv32 = []
            that.eqCodes.eqCodeListLv4 = []
            that.selectItem.Lv22 = ''
            that.selectItem.Lv3 = ''
            that.selectItem.Lv32 = ''
            that.selectItem.Lv4 = ''
            that.selectItem.Lv5 = ''
            //get options
            await that._getEqList(that.nowParent,LParentCode,'2','22')
            await that._getEqList(that.nowParent,that.selectItem.Lv1,'3','3')
            await that._getEqList(that.nowParent,LParentCode,'3','3')
            await that._getEqList(that.nowParent,that.selectItem.Lv1,'4','4')
            await that._getEqList(that.nowParent,LParentCode,'4','4')
            if(that.ifLV5){
              await that._getEqList(that.nowParent,LParentCode,'5','5')
            }
            that.newEqCode = that.selectItem.Lv1 + '-' + that.selectItem.Lv2
            break;
            
          case '22':
            //reset
            that.selectItem.Lv3 = ''
            that.selectItem.Lv32 = ''
            that.selectItem.Lv4 = ''
            that.selectItem.Lv5 = ''
            await that._getEqList(that.nowParent,LParentCode,'3','3')
            await that._getEqList(that.nowParent,that.selectItem.Lv1,'4','4')
            await that._getEqList(that.nowParent,that.selectItem.Lv2,'4','4')
            await that._getEqList(that.nowParent,LParentCode,'4','4')
            if(that.ifLV5){
              await that._getEqList(that.nowParent,LParentCode,'5','5')
            }
            that.newEqCode = that.selectItem.Lv1 + '-' + (that._show22?that.selectItem.Lv22:that.selectItem.Lv2)
            break;
            
          case '3':
            //reset
            that.eqCodes.eqCodeListLv32 = []
            that.eqCodes.eqCodeListLv4 = []
            that.selectItem.Lv32 = ''
            that.selectItem.Lv4 = ''
            that.selectItem.Lv5 = ''
            //get options
            
            await that._getEqList(that.nowParent,LParentCode,'3','32')
            await that._getEqList(that.nowParent,that.selectItem.Lv1,'4','4')
            await that._getEqList(that.nowParent,that.selectItem.Lv2,'4','4')
            await that._getEqList(that.nowParent,that.selectItem.Lv22,'4','4')
            await that._getEqList(that.nowParent,LParentCode,'4','4')
            if(that.ifLV5){
              await that._getEqList(that.nowParent,LParentCode,'5','5')
            }
            that.newEqCode = that.selectItem.Lv1 + '-' + (that._show22?that.selectItem.Lv22:that.selectItem.Lv2) + '-' + that.selectItem.Lv3
            break;
            
          case '32':
            //reset
            that.eqCodes.eqCodeListLv4 = []
            that.selectItem.Lv4 = ''
            that.selectItem.Lv5 = ''
            //get options
            await that._getEqList(that.nowParent,that.selectItem.Lv1,'4','4')
            await that._getEqList(that.nowParent,that.selectItem.Lv2,'4','4')
            await that._getEqList(that.nowParent,that.selectItem.Lv22,'4','4')
            await that._getEqList(that.nowParent,that.selectItem.Lv3,'4','4')
            await that._getEqList(that.nowParent,LParentCode,'4','4')
            const tempParent = that.eqCodes[listName].find(ele => ele.EquipCode == LParentCode).ParentCode
            LParentCode = tempParent + '/' + LParentCode
            await that._getEqList(that.nowParent,LParentCode,'4','4')
            if(that.ifLV5){
              await that._getEqList(that.nowParent,LParentCode,'5','5')
            }
            that.newEqCode = that.selectItem.Lv1 + '-' + (that._show22?that.selectItem.Lv22:that.selectItem.Lv2) + '-' + that.selectItem.Lv3 + (that._show32?'/'+that.selectItem.Lv32:'') 
            break;
            
          case '4':
            //reset
            that.selectItem.Lv5 = ''
            that.eqCodes.eqCodeListLv5 = []
            //get options
            if(that.ifLV5){   //要取第五層
              //規則算寫死的
              let eqPCode = that.selectItem.Lv3
              /*
              if(that.nowParent == 'SYS_S') {
                if(that._show32){
                  eqPCode = eqPCode + '/' + that.selectItem.Lv32
                  await that._getEqList(that.nowParent,eqPCode,'5','5')
                }else{
                  await that._getEqList(that.nowParent,eqPCode,'5','5')
                  eqPCode = eqPCode + '-' + LParentCode
                  await that._getEqList(that.nowParent,eqPCode,'5','5')
                }
              }else if(that.nowParent == 'SYS_M') {
                //不動
                await that._getEqList(that.nowParent,eqPCode,'5','5')
              }else if(that.nowParent == 'SYS_C') {
                switch(that.selectItem.Lv1) {
                  case 'RST':
                    eqPCode = eqPCode + '-' + LParentCode
                    break;
                  case 'RAD':
                    eqPCode = that.selectItem.Lv1
                    break;
                  case 'PTT':
                  case 'SIG':
                    eqPCode = that.selectItem.Lv1 + '-' + LParentCode
                    break;
                }
                await that._getEqList(that.nowParent,eqPCode,'5','5')
              }*/
              await that._getEqList(that.nowParent,eqPCode,'5','5')
              eqPCode = eqPCode + '-' + LParentCode
              await that._getEqList(that.nowParent,eqPCode,'5','5')
              eqPCode = that.selectItem.Lv1
              await that._getEqList(that.nowParent,eqPCode,'5','5')
              eqPCode = that.selectItem.Lv1 + '-' + LParentCode
              await that._getEqList(that.nowParent,eqPCode,'5','5')
              if(that._show32){
                eqPCode = eqPCode + '/' + that.selectItem.Lv32
                await that._getEqList(that.nowParent,eqPCode,'5','5')
              }
            } 
            //串值
            that.newEqCode = that.selectItem.Lv1 + '-' + (that._show22?that.selectItem.Lv22:that.selectItem.Lv2) + '-' + that.selectItem.Lv3 + (that._show32?'/'+that.selectItem.Lv32:'')  + '-' + that.selectItem.Lv4
            that._returnEqCode()
            break;
          case '5':
            //串工作項
            that.newWorkCode = that.selectItem.Lv5
            that._returnWorkCode()
            break;
        }
      },
      _returnEqCode() {
        this.$emit('getEqCode',this.newEqCode)
      },
      _returnWorkCode() {
        this.$emit('getWorkCode',this.newWorkCode)
      }
    },
    //過濾
    filters: {

    },
    //監視
    watch: {
      nowEqCode: function(){
        this._componentInit()
      },
      nowWorkCode: function(){
        this._componentInit()
      }
    }
  }
</script>