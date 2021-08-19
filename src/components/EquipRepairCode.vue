<!--
選擇設備報修碼的共用元件
輸入:
      //ifLV5:是否也要選工作項? true為是，false為否
      nowEqCode:現在已選擇好的設備報修碼，預設空
      nowWorkCode:現在已選擇好的工作項，預設空
      rtnStartLv:從第幾層開始回傳(可選，預設和toLv相同)
      toLv: 顯示到第幾層，同時也在第幾層回傳，預設5(到工作項)
      needIcon: 是否顯示icon，預設否
      disableToLv: 第幾層前隱藏，需要先傳入值，預設0
      noLabel: 是否要顯示層級抬頭，預設否
回傳event：
      getEqCode:回傳組好的設備報修碼
      getWorkCode:回傳選擇的工作項
      getEqName:回傳設備報修碼中文
      getWorkName:回傳工作項中文
      getEqCh:回傳設備報修碼純中文
      getWorkCh:回傳設備報修碼純中文
-->
<template>
  <v-row class="px-2 mb-6 label-header">

    <v-col cols="12" class="mt-n4" v-if="toLv >= 1" v-show="_levelShow.Lv1">
      <v-row>
        <v-col cols="12" align-self="center" v-if="!noLabel">
          <h3><v-icon class="mr-1 mb-1" v-show="needIcon">mdi-buffer</v-icon> 系統</h3>
        </v-col>
        <v-col cols="12">
          <v-select solo hide-details
            :items="eqCodes.eqCodeListLv1"
            item-text="FullShowName"
            item-value="EquipCode"
            @change="whenChange('1')"
            label="請選擇"
            v-model="selectItem.Lv1"
          ></v-select>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" v-if="toLv >= 2" v-show="_levelShow.Lv2">
      <v-row>
        <v-col cols="12" align-self="center" v-if="!noLabel">
          <h3><v-icon class="mr-1 mb-1" v-show="needIcon">mdi-map-marker</v-icon> 位置</h3>
        </v-col>
        <v-col cols="12">
          <v-select solo hide-details
            :items="eqCodes.eqCodeListLv2"
            item-text="FullShowName"
            item-value="EquipCode"
            @change="whenChange('2')"
            label="請選擇"
            v-model="selectItem.Lv2"
            :disabled="_selectDisabled.eqCodeListLv2"
          ></v-select>
        </v-col>
        <v-col cols="12" v-if="_show22">
          <v-select solo hide-details
            :items="eqCodes.eqCodeListLv22"
            item-text="FullShowName"
            item-value="EquipCode"
            @change="whenChange('22')"
            label="請選擇"
            v-model="selectItem.Lv22"
            :disabled="_selectDisabled.eqCodeListLv22"
          ></v-select>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" v-if="toLv >= 3" v-show="_levelShow.Lv3">
      <v-row>
        <v-col cols="12" align-self="center" v-if="!noLabel">
          <h3><v-icon class="mr-1 mb-1" v-show="needIcon">mdi-anvil</v-icon> 設備</h3>
        </v-col>
        <v-col cols="12">
          <v-select solo hide-details
            :items="eqCodes.eqCodeListLv3"
            item-text="FullShowName"
            item-value="EquipCode"
            @change="whenChange('3')"
            label="請選擇"
            v-model="selectItem.Lv3"
            :disabled="_selectDisabled.eqCodeListLv3"
          ></v-select>
        </v-col>
        <v-col cols="12" v-if="_show32">
          <v-select solo hide-details
            :items="eqCodes.eqCodeListLv32"
            item-text="FullShowName"
            item-value="EquipCode"
            @change="whenChange('32')"
            label="請選擇"
            v-model="selectItem.Lv32"
            :disabled="_selectDisabled.eqCodeListLv32"
          ></v-select>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" v-if="toLv >= 4" v-show="_levelShow.Lv4">
      <v-row>
        <v-col cols="12" align-self="center" v-if="!noLabel">
          <h3><v-icon class="mr-1 mb-1" v-show="needIcon">mdi-cards-variant</v-icon> 序號</h3>
        </v-col>
        <v-col cols="12">
          <v-select solo hide-details
            :items="eqCodes.eqCodeListLv4"
            item-text="FullShowName"
            item-value="EquipCode"
            @change="whenChange('4')"
            label="請選擇"
            v-model="selectItem.Lv4"
            :disabled="_selectDisabled.eqCodeListLv4"
          ></v-select>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" v-if="toLv == 5" v-show="_levelShow.Lv5">
      <v-row>
        <v-col cols="12" align-self="center"  v-if="!noLabel">
          <h3><v-icon class="mr-1 mb-1" v-show="needIcon">mdi-format-list-bulleted</v-icon> 工作項</h3>
        </v-col>
        <v-col cols="12">
          <v-select solo hide-details
            :items="eqCodes.eqCodeListLv5"
            item-text="FullShowName"
            item-value="EquipCode"
            @change="whenChange('5')"
            label="請選擇"
            v-model="selectItem.Lv5"
            :disabled="_selectDisabled.eqCodeListLv5"
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
      //ifLV5: Boolean,
      nowEqCode: {
        type: String,
        required: false
      },
      nowWorkCode: {
        type: String,
        required: false
      },
      toLv: {
        type: Number,
        required: false,
      },
      needIcon: {
        type:Boolean,
        required: false
      },
      disableToLv: {
        type: Number,
        required: false
      },
      rtnStartLv: {
        type: Number,
        required: false
      },
      noLabel: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    //內部變數
    data: () => ({
      ifIcon: false,
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
      newWorkCode: '',   //工作項目
      newEqName: '',
      newWorkName: '',
      newEqCh: '',
      newWorkCh: '',
      rtnStart: 2,
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
          rtnObj.eqCodeListLv2 = (that.eqCodes.eqCodeListLv2.length > 0 && that.selectItem.Lv1 != '')?false:true
          rtnObj.eqCodeListLv22 = (that.eqCodes.eqCodeListLv22.length > 0 && that.selectItem.Lv2 != '')?false:true
          rtnObj.eqCodeListLv3 = (that.eqCodes.eqCodeListLv3.length > 0 && (that._show22?that.selectItem.Lv22 != '':that.selectItem.Lv2 != ''))?false:true
          rtnObj.eqCodeListLv32 = (that.eqCodes.eqCodeListLv32.length > 0 && that.selectItem.Lv3 != '')?false:true
          rtnObj.eqCodeListLv4 = (that.eqCodes.eqCodeListLv4.length > 0 && (that._show32?that.selectItem.Lv32 != '':that.selectItem.Lv3 != ''))?false:true
          rtnObj.eqCodeListLv5 = (that.eqCodes.eqCodeListLv5.length > 0 && that.selectItem.Lv4 != '')?false:true
        return rtnObj
      },
      _levelShow: function() {
        let rtnObj = {}
        const tLv = (!this.toLv)?5:this.toLv
        const disToLv = (!this.disableToLv)?0:this.disableToLv
        rtnObj.Lv1 = (tLv >= 1 && disToLv < 1)?true:false
        rtnObj.Lv2 = (tLv >= 2 && disToLv < 2)?true:false
        rtnObj.Lv3 = (tLv >= 3 && disToLv < 3)?true:false
        rtnObj.Lv4 = (tLv >= 4 && disToLv < 4)?true:false
        rtnObj.Lv5 = (tLv >= 5 && disToLv < 5)?true:false
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
        this.ifIcon = (!this.needIcon)?false:this.needIcon
        this.rtnStart=this.rtnStartLv==undefined?this.toLv:this.rtnStartLv
        // console.log(this.rtnStart)
        if(this.nowEqCode == '' || !this.nowEqCode){ //沒有帶值進來
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
          if(that.toLv >= 1) {
            await that._goChange('1')
            that.selectItem.Lv1 = resdata.EquipLv1?resdata.EquipLv1:''
            await that.whenChange('1')
          }
          if(that.toLv >= 2) {
            that.selectItem.Lv2 = resdata.EquipLv2?resdata.EquipLv2:''
            await that.whenChange('2')
            if(resdata.EquipLv22 != ""){
              that.selectItem.Lv22 = resdata.EquipLv22?resdata.EquipLv22:''
              await that.whenChange('22')
            }
          }
          if(that.toLv >= 3) {
            that.selectItem.Lv3 = resdata.EquipLv3?resdata.EquipLv3:''
            await that.whenChange('3')
            if(resdata.EquipLv32 != ""){
              that.selectItem.Lv32 = resdata.EquipLv32?resdata.EquipLv32:''
              await that.whenChange('32')
            }
          }
          if(that.toLv >= 4){
            that.selectItem.Lv4 = resdata.EquipLv4?resdata.EquipLv4:''
            await that.whenChange('4')
          }
          if(that.toLv == 5){
            that.selectItem.Lv5 = that.nowWorkCode?that.nowWorkCode:''
            await that.whenChange('5')
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
            // if(res.data.code_list.length > 0 && that.eqCodes[toObject].length == 0){
            if(res.data.code_list.length > 0){
              that.eqCodes[toObject].push(...res.data.code_list)
              that.eqCodes[toObject].forEach((ele,index) => {
                let NeqCode = ''
                //因為3-2的編碼方式是車站+類型，但是顯示的時候只要顯示類型所以要拆出來顯視
                NeqCode = (ele.EquipCode.indexOf('-')!=-1)?(ele.EquipCode.split('-')[1]):ele.EquipCode
                //中文(編碼)
                if(toObjectLv == '22') {
                  let PName = that.eqCodes.eqCodeListLv2.find(e=>e.EquipCode==ele.ParentCode).EquipName
                  ele.FullShowName = PName + '-' + ele.EquipName + '(' + NeqCode +')'
                } else {
                  ele.FullShowName = ele.EquipName + '(' + NeqCode +')'
                }
              })
              that.eqCodes[toObject] = decodeObject(that.eqCodes[toObject])
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
      async whenChange(eqLevel){
        const that = this
        const listName = 'eqCodeListLv' + eqLevel
        //動到系統就要重抓科別
        switch(eqLevel) {
          case '1':
            that.nowParent = that.eqCodes[listName].find(ele => ele.EquipCode == that.selectItem.Lv1).ParentCode
            if(that.toLv > 1){
              that.eqCodes.eqCodeListLv2 = []
              await that._goChange('2')
            }
            if(that.rtnStart<=1){
              that.newEqCode = that.selectItem.Lv1 
              that._returnEqCode(1)
            }
            break;
          case '2':
            that.eqCodes.eqCodeListLv22 = []
            await that._goChange('22')
            if(that.eqCodes.eqCodeListLv22.length == 0){
              if(that.toLv > 2){
                that.eqCodes.eqCodeListLv3 = []
                await that._goChange('3')
              }
              if(this.rtnStart<=2){
                that.newEqCode = that.selectItem.Lv1 + '-' + that.selectItem.Lv2
                that._returnEqCode(2)
              }
            }
            break;
          case '22':
            if(that.toLv > 2){
              that.eqCodes.eqCodeListLv3 = []
              await that._goChange('3')
            }
            if(this.rtnStart<=2){
              that.newEqCode = that.selectItem.Lv1 + '-' + (that._show22?that.selectItem.Lv22:that.selectItem.Lv2)
              that._returnEqCode(2)
            }
            break;
          case '3':
            that.eqCodes.eqCodeListLv32 = []
            await that._goChange('32')
            if(that.eqCodes.eqCodeListLv32.length == 0){
              if(that.toLv > 3){
                that.eqCodes.eqCodeListLv4 = []
                await that._goChange('4')
              }
              if(this.rtnStart<=3){
                that.newEqCode = that.selectItem.Lv1 + '-' + ((that.selectItem.Lv3.indexOf('-')==-1)?((that._show22?that.selectItem.Lv22:that.selectItem.Lv2) + '-' + that.selectItem.Lv3):that.selectItem.Lv3)
                that._returnEqCode(3)
              }
            }
            break;
          case '32':
            if(that.toLv > 3){
              that.eqCodes.eqCodeListLv4 = []
              await that._goChange('4')
            }
            if(this.rtnStart<=3){
              that.newEqCode = that.selectItem.Lv1 + '-' + ((that.selectItem.Lv3.indexOf('-')==-1)?((that._show22?that.selectItem.Lv22:that.selectItem.Lv2) + '-' + that.selectItem.Lv3):that.selectItem.Lv3) + (that._show32?'/'+that.selectItem.Lv32:'') 
              that._returnEqCode(3)
            }
            break;
          case '4':
            if(that.toLv > 4){
              that.eqCodes.eqCodeListLv5 = []
              await that._goChange('5')
            }
            that.newEqCode = that.selectItem.Lv1 + '-' + ((that.selectItem.Lv3.indexOf('-')==-1)?((that._show22?that.selectItem.Lv22:that.selectItem.Lv2) + '-' + that.selectItem.Lv3):that.selectItem.Lv3 )+ (that._show32?'/'+that.selectItem.Lv32:'')  + '-' + that.selectItem.Lv4
            that._returnEqCode(4)
            break;
          case '5':
            if(that.toLv == 5){
              that.newWorkCode = that.selectItem.Lv5
              that._returnWorkCode()
            }
            break;
        }
      },
      async _goChange(eqLevel) {
        const that = this
        const listName = 'eqCodeListLv' + eqLevel
        switch(eqLevel) {
          case '1':
            that.eqCodes.eqCodeListLv2 = []
            that.eqCodes.eqCodeListLv22 = []
            that.eqCodes.eqCodeListLv3 = []
            that.eqCodes.eqCodeListLv32 = []
            that.eqCodes.eqCodeListLv4 = []
            that.eqCodes.eqCodeListLv5 = []
            that.selectItem.Lv1 = ''
            that.selectItem.Lv2 = ''
            that.selectItem.Lv22 = ''
            that.selectItem.Lv3 = ''
            that.selectItem.Lv32 = ''
            that.selectItem.Lv4 = ''
            that.selectItem.Lv5 = ''
            await this._getEqList('SYS','SYS_%','1','1')
            break;
          case '2':
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
            await that._getEqList(that.nowParent,that.selectItem.Lv1,'2','2')
            break;
          case '22':
            that.eqCodes.eqCodeListLv3 = []
            that.eqCodes.eqCodeListLv32 = []
            that.eqCodes.eqCodeListLv4 = []
            that.eqCodes.eqCodeListLv5 = []
            that.selectItem.Lv22 = ''
            that.selectItem.Lv3 = ''
            that.selectItem.Lv32 = ''
            that.selectItem.Lv4 = ''
            that.selectItem.Lv5 = ''
            await that._getEqList(that.nowParent,that.selectItem.Lv2,'2','22')
            break;
          case '3':
            that.eqCodes.eqCodeListLv32 = []
            that.eqCodes.eqCodeListLv4 = []
            that.eqCodes.eqCodeListLv5 = []
            that.selectItem.Lv3 = ''
            that.selectItem.Lv32 = ''
            that.selectItem.Lv4 = ''
            that.selectItem.Lv5 = ''
            await that._getEqList(that.nowParent,that.selectItem.Lv1,'3','3')
            await that._getEqList(that.nowParent,that.selectItem.Lv2,'3','3')
            if(that._show22) {
              await that._getEqList(that.nowParent,that.selectItem.Lv22,'3','3')
            }
            break;
          case '32':
            that.eqCodes.eqCodeListLv4 = []
            that.eqCodes.eqCodeListLv5 = []
            that.selectItem.Lv32 = ''
            that.selectItem.Lv4 = ''
            that.selectItem.Lv5 = ''
            await that._getEqList(that.nowParent,that.selectItem.Lv3,'3','32')
            break;
          case '4':
            that.eqCodes.eqCodeListLv5 = []
            that.selectItem.Lv4 = ''
            that.selectItem.Lv5 = ''
            await that._getEqList(that.nowParent,that.selectItem.Lv1,'4','4')
            await that._getEqList(that.nowParent,that.selectItem.Lv2,'4','4')
            await that._getEqList(that.nowParent,that.selectItem.Lv3,'4','4')
            await that._getEqList(that.nowParent,that.selectItem.Lv32,'4','4')
            if(that._show32) {
              await that._getEqList(that.nowParent,that.selectItem.Lv3+'/'+that.selectItem.Lv32,'4','4')
            }
            break;  
          case '5':
            that.selectItem.Lv5 = ''
            await that._getEqList(that.nowParent,that.selectItem.Lv1 + '-' + ((that.selectItem.Lv3.indexOf('-')==-1)?((that._show22?that.selectItem.Lv22:that.selectItem.Lv2) + '-' + that.selectItem.Lv3):that.selectItem.Lv3 )+ (that._show32?'/'+that.selectItem.Lv32:'')  + '-' + that.selectItem.Lv4,'5','5')
            break;  
        }
      },
      async _returnEqCode(toLevel) {
        const that = this
        await that.$emit('getEqCode',that.newEqCode)
        if(toLevel >= 1){
          that.newEqName = (that.eqCodes.eqCodeListLv1?.find(ele => ele.EquipCode == that.selectItem.Lv1)?.FullShowName||'') + ((toLevel == 1)?'':'-')
          that.newEqCh = (that.eqCodes.eqCodeListLv1?.find(ele => ele.EquipCode == that.selectItem.Lv1)?.EquipName||'') + ((toLevel == 1)?'':'-')
        }
        if(toLevel >= 2){
          that.newEqName += (that._show22?that.eqCodes.eqCodeListLv22.find(ele => ele.EquipCode == that.selectItem.Lv22)?.FullShowName||'' : that.eqCodes.eqCodeListLv2.find(ele => ele.EquipCode == that.selectItem.Lv2)?.FullShowName||'') + ((toLevel == 2)?'':'-')
          that.newEqCh += (that._show22?that.eqCodes.eqCodeListLv22.find(ele => ele.EquipCode == that.selectItem.Lv22)?.EquipName||'' : that.eqCodes.eqCodeListLv2.find(ele => ele.EquipCode == that.selectItem.Lv2)?.EquipName||'') + ((toLevel == 2)?'':'-')
        }
        if(toLevel >= 3){
          that.newEqName += (that.eqCodes.eqCodeListLv3?.find(ele => ele.EquipCode == that.selectItem.Lv3)?.FullShowName||'' + (that._show32?'/'+that.eqCodes.eqCodeListLv32.find(ele => ele.EquipCode == that.selectItem.Lv32)?.FullShowName||'':'')) + ((toLevel == 3)?'':'-')
          that.newEqCh += (that.eqCodes.eqCodeListLv3?.find(ele => ele.EquipCode == that.selectItem.Lv3)?.EquipName||'' + (that._show32?'/'+that.eqCodes.eqCodeListLv32.find(ele => ele.EquipCode == that.selectItem.Lv32)?.EquipName||'':'')) + ((toLevel == 3)?'':'-')
        }
        if(toLevel >= 4){
          that.newEqName += that.eqCodes.eqCodeListLv4.find(ele => ele.EquipCode == that.selectItem.Lv4)?.FullShowName||''
          that.newEqCh += that.eqCodes.eqCodeListLv4.find(ele => ele.EquipCode == that.selectItem.Lv4)?.EquipName||''
        }
        await that.$emit('getEqName',that.newEqName)
        await that.$emit('getEqCh',that.newEqCh)
      },
      async _returnWorkCode() {
        await this.$emit('getWorkCode',this.newWorkCode)
        await this.$emit('getWorkName',this.eqCodes.eqCodeListLv5.find(ele => ele.EquipCode == this.selectItem.Lv5).FullShowName)
        await this.$emit('getWorkCh',this.eqCodes.eqCodeListLv5.find(ele => ele.EquipCode == this.selectItem.Lv5).EquipName)
      }
    },
    //過濾
    filters: {

    },
    //監視
    watch: {
      // nowEqCode: function(){
      //   this._componentInit()
      // },
      // nowWorkCode: function(){
      //   this._componentInit()
      // }
    }
  }
</script>