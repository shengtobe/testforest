<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4">編輯設備標示編號</h2>
    <v-btn color="red" dark large class="ml-2" to="/mmis/train-track-lane">
      <v-icon class="mr-1">mdi-arrow-left</v-icon>回 列車、軌道、車道設備
    </v-btn>
    
    <v-divider class="mx-2 mt-5 mb-4" />

    <v-row class="px-2">
      <v-col cols="12" >
        <v-row class="px-2 mb-6">
          
          <v-col cols="12" class="mt-n4">
            <v-row>
              <v-col cols="12" md="2" align-self="center">
                <h3 class="ml-md-6">系統</h3>
              </v-col>
              <v-col cols="10" md="8">
                <v-select solo hide-details
                  :items="eqCodes.eqCodeListLv1"
                  item-text="EquipName"
                  item-value="EquipCode"
                  @change="whenChange('1')"
                  label="請選擇"
                  v-model="selectItem.Lv1"
                ></v-select>
              </v-col>
              <v-col cols="2" align-self="center">
                <v-btn color="indigo" dark large class="ml-2" v-if="selectItem.Lv1 == ''" @click="goAdd('1')">
                  <v-icon class="mr-1">mdi-plus</v-icon>新增
                </v-btn>
                <v-btn color="indigo" dark large class="ml-2" v-else :disabled="_editDisabled.Lv1" @click="goEdit('1')">
                  <v-icon class="mr-1">mdi-pencil</v-icon>編輯
                </v-btn>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12">
            <v-row>
              <v-col cols="12" md="2" align-self="center">
                <h3 class="ml-md-6">位置</h3>
              </v-col>
              <v-col cols="10" md="8">
                <v-select solo hide-details
                  :items="eqCodes.eqCodeListLv2"
                  item-text="EquipName"
                  item-value="EquipCode"
                  @change="whenChange('2')"
                  label="請選擇"
                  v-model="selectItem.Lv2"
                  :disabled="_selectDisabled.eqCodeListLv2"
                ></v-select>
              </v-col>
              <v-col cols="2" align-self="center">
                <v-btn color="indigo" dark large class="ml-2" v-if="selectItem.Lv2 == ''" @click="goAdd('2')" :disabled="_selectDisabled.eqCodeListLv2">
                  <v-icon class="mr-1">mdi-plus</v-icon>新增
                </v-btn>
                <v-btn color="indigo" dark large class="ml-2" v-else :disabled="_editDisabled.Lv2" @click="goEdit('2')">
                  <v-icon class="mr-1">mdi-pencil</v-icon>編輯
                </v-btn>
              </v-col>
            </v-row>
            <v-row v-if="_show22">
              <v-col cols="0" md="2"></v-col>
              <v-col cols="10" md="8">
                <v-select solo hide-details
                  :items="eqCodes.eqCodeListLv22"
                  item-text="EquipName"
                  item-value="EquipCode"
                  @change="whenChange('22')"
                  label="請選擇"
                  v-model="selectItem.Lv22"
                  :disabled="_selectDisabled.eqCodeListLv22"
                ></v-select>
              </v-col>
              <v-col cols="2" align-self="center">
                <v-btn color="indigo" dark large class="ml-2" v-if="selectItem.Lv22 == ''" @click="goAdd('22')" :disabled="_selectDisabled.eqCodeListLv22">
                  <v-icon class="mr-1">mdi-plus</v-icon>新增
                </v-btn>
                <v-btn color="indigo" dark large class="ml-2" v-else :disabled="_editDisabled.Lv22" @click="goEdit('22')">
                  <v-icon class="mr-1">mdi-pencil</v-icon>編輯
                </v-btn>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12">
            <v-row>
              <v-col cols="12" md="2" align-self="center">
                <h3 class="ml-md-6">設備</h3>
              </v-col>
              <v-col cols="10" md="8">
                <v-select solo hide-details
                  :items="eqCodes.eqCodeListLv3"
                  item-text="EquipName"
                  item-value="EquipCode"
                  @change="whenChange('3')"
                  label="請選擇"
                  v-model="selectItem.Lv3"
                  :disabled="_selectDisabled.eqCodeListLv3"
                ></v-select>
              </v-col>
              <v-col cols="2" align-self="center">
                <v-btn color="indigo" dark large class="ml-2" v-if="selectItem.Lv3 == ''" @click="goAdd('3')" :disabled="_selectDisabled.eqCodeListLv3">
                  <v-icon class="mr-1">mdi-plus</v-icon>新增
                </v-btn>
                <v-btn color="indigo" dark large class="ml-2" v-else :disabled="_editDisabled.Lv3" @click="goEdit('3')">
                  <v-icon class="mr-1">mdi-pencil</v-icon>編輯
                </v-btn>
              </v-col>
            </v-row>
            <v-row v-if="_show32">
              <v-col cols="0" md="2"></v-col>
              <v-col cols="10" md="8">
                <v-select solo hide-details
                  :items="eqCodes.eqCodeListLv32"
                  item-text="EquipName"
                  item-value="EquipCode"
                  @change="whenChange('32')"
                  label="請選擇"
                  v-model="selectItem.Lv32"
                  :disabled="_selectDisabled.eqCodeListLv32"
                ></v-select>
              </v-col>
              <v-col cols="2" align-self="center">
                <v-btn color="indigo" dark large class="ml-2" v-if="selectItem.Lv32 == ''" @click="goAdd('32')" :disabled="_selectDisabled.eqCodeListLv32">
                  <v-icon class="mr-1">mdi-plus</v-icon>新增
                </v-btn>
                <v-btn color="indigo" dark large class="ml-2" v-else :disabled="_editDisabled.Lv32" @click="goEdit('32')">
                  <v-icon class="mr-1">mdi-pencil</v-icon>編輯
                </v-btn>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12">
            <v-row>
              <v-col cols="12" md="2" align-self="center">
                <h3 class="ml-md-6">序號</h3>
              </v-col>
              <v-col cols="10" md="8">
                <v-select solo hide-details
                  :items="eqCodes.eqCodeListLv4"
                  item-text="EquipName"
                  item-value="EquipCode"
                  @change="whenChange('4')"
                  label="請選擇"
                  v-model="selectItem.Lv4"
                  :disabled="_selectDisabled.eqCodeListLv4"
                ></v-select>
              </v-col>
              <v-col cols="2" align-self="center">
                <v-btn color="indigo" dark large class="ml-2" v-if="selectItem.Lv4 == ''" @click="goAdd('4')" :disabled="_selectDisabled.eqCodeListLv4">
                  <v-icon class="mr-1">mdi-plus</v-icon>新增
                </v-btn>
                <v-btn color="indigo" dark large class="ml-2" v-else :disabled="_editDisabled.Lv4" @click="goEdit('4')">
                  <v-icon class="mr-1">mdi-pencil</v-icon>編輯
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" md="2" align-self="center">
                <h3 class="ml-md-6">工作項</h3>
              </v-col>
              <v-col cols="10" md="8">
                <v-select solo hide-details
                  :items="eqCodes.eqCodeListLv5"
                  item-text="EquipName"
                  item-value="EquipCode"
                  @change="whenChange('5')"
                  label="請選擇"
                  v-model="selectItem.Lv5"
                  :disabled="_selectDisabled.eqCodeListLv5"
                ></v-select>
              </v-col>
              <v-col cols="2" align-self="center">
                <v-btn color="indigo" dark large class="ml-2" v-if="selectItem.Lv5 == ''" :disabled="_selectDisabled.eqCodeListLv5">
                  <v-icon class="mr-1">mdi-plus</v-icon>新增
                </v-btn>
                <v-btn color="indigo" dark large class="ml-2" v-else :disabled="_editDisabled.Lv5" >
                  <v-icon class="mr-1">mdi-pencil</v-icon>編輯
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog v-model="Edit">
      <EquipCodeEdit :detailCode="detailCode" :inputType="inType" :parentList="editParent" :inLevel="editLevel" @close="close"></EquipCodeEdit>  
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime,escapeHtml,encodeObject,decodeObject } from '@/assets/js/commonFun'
import { fetchEqCode,fetchEqList } from '@/apis/materialManage/equipCode'
import EquipCodeEdit from '@/views/mmis/EquipCodeEdit'
export default {
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
        Lv5: '',
      },
      newEqCode: '',  //設備報修碼
      newWorkCode: '',   //工作項目
      dialogopen: false,
      Edit: false,
      detailCode: {},
      editParent: [],
      editLevel: '',
      inType: '',
    }),
    //渲染完成後
    mounted: function() {
      this._componentInit()
      
    },
    //引入元件
    components: {
      EquipCodeEdit
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
        rtnObj.eqCodeListLv22 = (!rtnObj.eqCodeListLv2 && that.eqCodes.eqCodeListLv2.length > 0 && that.selectItem.Lv2!='')?false:true
        rtnObj.eqCodeListLv3 = (that.eqCodes.eqCodeListLv2.length > 0 && (that._show22?(that.selectItem.Lv22!=''&&!rtnObj.eqCodeListLv22):(that.selectItem.Lv2!=''&&!rtnObj.eqCodeListLv2)))?false:true
        rtnObj.eqCodeListLv32 = (!rtnObj.eqCodeListLv3 && that.eqCodes.eqCodeListLv3.length > 0 && that.selectItem.Lv3!='')?false:true
        rtnObj.eqCodeListLv4 = (that.eqCodes.eqCodeListLv4.length > 0 && (that._show32?(that.selectItem.Lv32!='' && !rtnObj.eqCodeListLv32):(that.selectItem.Lv3!='' && !rtnObj.eqCodeListLv3)))?false:true
        rtnObj.eqCodeListLv5 = (!rtnObj.eqCodeListLv4 && that.eqCodes.eqCodeListLv5.length > 0 && that.selectItem.Lv4!='')?false:true
        return rtnObj
      },
      _editDisabled: function() {
        let rtnObj = {}
        const that = this
        rtnObj.Lv1 = (that.selectItem.Lv2=='')?false:true
        rtnObj.Lv2 = (!that._selectDisabled.eqCodeListLv2 && (that._show22?that.selectItem.Lv22=='':that.selectItem.Lv3==''))?false:true
        rtnObj.Lv22 = (!that._selectDisabled.eqCodeListLv22 && that.selectItem.Lv3=='')?false:true
        rtnObj.Lv3 = (!that._selectDisabled.eqCodeListLv3 && (that._show32?that.selectItem.Lv32=='':that.selectItem.Lv4==''))?false:true
        rtnObj.Lv32 = (!that._selectDisabled.eqCodeListLv32 && that.selectItem.Lv4=='')?false:true
        rtnObj.Lv4 = (!that._selectDisabled.eqCodeListLv4 && that.selectItem.Lv5=='')?false:true
        rtnObj.Lv5 = (!that._selectDisabled.eqCodeListLv5)?false:true
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
          Lv5: '',
        }
        this._getEqList('SYS','SYS_%','1','1')
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
            if(res.data.code_list.length > 0){
              // that.eqCodes[toObject].push({EquipCode:'',EquipName:'請選擇'})
              that.eqCodes[toObject].push(...res.data.code_list)
              that.eqCodes[toObject] = decodeObject(that.eqCodes[toObject])
              that.eqCodes[toObject] = [{EquipCode:'',EquipName:'請選擇'},...res.data.code_list]
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
        if(this.selectItem['Lv'+eqLevel] != ""){
          switch(eqLevel) {
            case '1':
              that.nowParent = that.eqCodes[listName].find(ele => ele.EquipCode == that.selectItem.Lv1).ParentCode
              that.eqCodes.eqCodeListLv2 = []
              await that._goChange('2')
              break;
            case '2':
              that.eqCodes.eqCodeListLv22 = []
              await that._goChange('22')
              if(that.eqCodes.eqCodeListLv22.length == 0){
                that.eqCodes.eqCodeListLv3 = []
                await that._goChange('3')
              }
              break;
            case '22':
              that.eqCodes.eqCodeListLv3 = []
              await that._goChange('3')
              break;
            case '3':
              that.eqCodes.eqCodeListLv32 = []
              await that._goChange('32')
              if(that.eqCodes.eqCodeListLv32.length == 0){
                that.eqCodes.eqCodeListLv4 = []
                await that._goChange('4')
              }
              break;
            case '32':
              that.eqCodes.eqCodeListLv4 = []
              await that._goChange('4')
              break;
            case '4':
              that.eqCodes.eqCodeListLv5 = []
              await that._goChange('5')
              break;
            case '5':
              if(that.toLv == 5){
                that.newWorkCode = that.selectItem.Lv5
              }
              break;
          }
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
            await that._getEqList(that.nowParent,that.selectItem.Lv1,'5','5')
            await that._getEqList(that.nowParent,that.selectItem.Lv2,'5','5')
            if(that._show22) {
              await that._getEqList(that.nowParent,that.selectItem.Lv22,'5','5')
            }
            await that._getEqList(that.nowParent,that.selectItem.Lv3,'5','5')
            if(that._show32) {
              await that._getEqList(that.nowParent,that.selectItem.Lv32,'5','5')
              await that._getEqList(that.nowParent,that.selectItem.Lv3+'/'+that.selectItem.Lv32,'5','5')
            }
            await that._getEqList(that.nowParent,that.selectItem.Lv4,'5','5')
            await that._getEqList(that.nowParent,that.selectItem.Lv1+'-'+that.selectItem.Lv4,'5','5')
            await that._getEqList(that.nowParent,that.selectItem.Lv2+'-'+that.selectItem.Lv4,'5','5')
            await that._getEqList(that.nowParent,that.selectItem.Lv3+'-'+that.selectItem.Lv4,'5','5')
            break;  
        }
      },
      goEdit(level) {
        this.editParent = []
        let LdeptCode,LparentCode,LequipCode
        //抓現在的代碼(不抓名稱是因為有機會會被改，雖然機會很低)
        //單位碼抓法不同
        if(level == '1'){
          LdeptCode = 'SYS'
        }else{
          LdeptCode = this.nowParent
        }
        LequipCode = this.selectItem['Lv'+level]
        LparentCode = this.eqCodes['eqCodeListLv'+level].find(ele => ele.EquipCode == LequipCode).ParentCode
        this.detailCode = {
          DeptCode: LdeptCode,
          ParentCode: LparentCode,
          EquipCode: LequipCode,
          EquipLevel: level.substring(0,1)
        }
        //抓上層的選項
        this._getParents(level)
        this.editLevel = level
        this.inType = 'edit'
        this.Edit = true
      },
      goAdd(level) {
        let LdeptCode
        if(level == '1'){
          LdeptCode = 'SYS'
        }else{
          LdeptCode = this.nowParent
        }
        this.detailCode = {
          DeptCode: LdeptCode,
          ParentCode: "",
          EquipCode: "",
          EquipLevel: level.substring(0,1)
        }
        this.editParent = []
        //抓上層的選項
        this._getParents(level)
        this.editLevel = level
        this.inType = 'add'
        this.Edit = true
      },
      _getParents(level) {
        switch(level) {
          case '4':
            if(this._show32){
              this.editParent.push(this._getNowData('32'))
            }
          case '32':
            this.editParent.push(this._getNowData('3'))
          case '3':
            if(this._show22){
              this.editParent.push(this._getNowData('22'))
            }
          case '22':
            this.editParent.push(this._getNowData('2'))
          case '2':
            this.editParent.push(this._getNowData('1'))
        }
      },
      _getNowData(level) {
        let LdeptCode,LparentCode,LequipCode,LequipName,Equip
        //單位碼抓法不同
        if(level == '1'){
          LdeptCode = 'SYS'
        }else{
          LdeptCode = this.nowParent
        }
        LequipCode = this.selectItem['Lv'+level]
        if(LequipCode){
          Equip = this.eqCodes['eqCodeListLv'+level].find(ele => ele.EquipCode == LequipCode)
          LparentCode = Equip.ParentCode
          LequipName = Equip.EquipName
          return {
            DeptCode: LdeptCode,
            ParentCode: LparentCode,
            EquipName: LequipName,
            EquipCode: LequipCode,
            EquipLevel: level.substring(0,1)
          }
        }
      },
      async close(level) {
        let nowdata = this.selectItem['Lv'+level]
        if(level != '1'){
          this.eqCodes['eqCodeListLv'+level] = []
          await this._goChange(level)
        }else{
          await this._getEqList('SYS','SYS_%','1','1')
        }
        this.selectItem['Lv'+level] = nowdata
        if(this.inType =='edit'){
          await this.whenChange(level)
        }
        this.Edit = false
      }
    },
    //過濾
    filters: {

    },
    //監視
    watch: {

    }
  }
</script>