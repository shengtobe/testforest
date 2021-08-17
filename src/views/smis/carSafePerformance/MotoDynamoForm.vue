<template>
  <v-card class="theme-card">
    <v-card-title class=" white--text px-4 py-1">
        {{ dialogTitle }}
        <v-spacer></v-spacer>
        <v-btn dark fab small text @click="goClose" class="mr-n2">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-card-title>

    <v-card-text class="px-6 py-4">
      <p class="label-warning">
        <v-icon class="label-warning mb-1">mdi-alert-decagram</v-icon>
        注意：一般員工僅能編修當月與上個月之資料
      </p>
      <v-row>
        <v-col cols="12" sm="8">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-file</v-icon>車輛型號
          </h3>
          <v-text-field solo @click="eqCode=true" v-model="ipt.MaintainCode_Loc" readonly />
          <v-dialog v-model="eqCode" max-width="700px">
            <v-card class="theme-card">
              <v-card-title class="px-4 py-1">
                車輛型號
                <v-spacer></v-spacer>
                <v-btn fab small text @click="eqCode = false" class="mr-n2">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <div class="px-4 py-3">
                <EquipCode :nowEqCode="com_equipCode" :toLv="2" :disableToLv="1" :needIcon="false" :noLabel="true" @getEqCode="getRtnCode" />
              </div>
              <v-card-actions class="px-5 pb-5">
                <v-spacer></v-spacer>
                <v-btn class="mr-2 btn-close" dark elevation="4"  :loading="isLoading" @click="eqCode = false">取消</v-btn>
                <v-btn class="btn-add" dark elevation="4"  :loading="isLoading" @click="selectEQ">確認</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>

        <v-col cols="12" sm="4">
          <h3 class="mb-1">
              <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>日期
          </h3>
          <DateSelect v-model="ipt.CheckDay" />
        </v-col>

        <v-col cols="12" sm="8">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>司機員
          </h3>
          <v-text-field
            v-model.trim="ipt.Driver"
            solo
            placeholder="例：王小明、陳小華"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-train</v-icon>列車次
          </h3>
          <v-text-field
            v-model.trim="ipt.TrainNo"
            solo
            placeholder="例：1-2"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-arrow-left-right-bold</v-icon>行駛區間
          </h3>
          <v-text-field
            v-model.trim="ipt.KmRecord"
            solo
            placeholder="例：10-20"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-gauge</v-icon>本日行駛公里
          </h3>
          <v-text-field
            v-model.trim="ipt.Km"
            solo
            placeholder="例：20.3"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-gauge</v-icon>累計公里數
          </h3>
          <v-text-field
            v-model.trim="ipt.AccumKm"
            solo
            placeholder="例：11300.9"
          ></v-text-field>
        </v-col>

        <template v-if="customYN">
          <v-col cols="12" sm="4">
            <h3 class="mb-1">
              <v-icon class="mr-1 mb-1">mdi-clock</v-icon>發電機日工時
            </h3>
            <v-text-field
              v-model.trim="ipt.HourDay"
              solo
              placeholder="例：8"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4">
            <h3 class="mb-1">
              <v-icon class="mr-1 mb-1">mdi-clock</v-icon>發電機累計工時
            </h3>
            <v-text-field
              v-model.trim="ipt.Hours"
              solo
              placeholder="例：2100"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4">
            <h3 class="mb-1">
              <v-icon class="mr-1 mb-1">mdi-gas-station</v-icon>耗用油量 (柴油)
            </h3>
            <v-text-field
              v-model.trim="ipt.DieselOil"
              solo
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4">
            <h3 class="mb-1">
              <v-icon class="mr-1 mb-1">mdi-gas-station</v-icon>耗用油量 (引擎機油)
            </h3>
            <v-text-field
              v-model.trim="ipt.EngineOil"
              solo
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4">
            <h3 class="mb-1">
              <v-icon class="mr-1 mb-1">mdi-gas-station</v-icon>耗用油量 (TC機油)
            </h3>
            <v-text-field
              v-model.trim="ipt.TCOil"
              solo
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4">
            <h3 class="mb-1">
              <v-icon class="mr-1 mb-1">mdi-gas-station</v-icon>耗用油量 (風泵)
            </h3>
            <v-text-field
              v-model.trim="ipt.WindMercury"
              solo
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4">
            <h3 class="mb-1">
              <v-icon class="mr-1 mb-1">mdi-gas-station</v-icon>耗用油量 (其他)
            </h3>
            <v-text-field
              v-model.trim="ipt.Other"
              solo
            ></v-text-field>
          </v-col>
        </template>

        <v-col cols="12">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-note</v-icon>保養記事
          </h3>
          <v-textarea
            v-model.trim="ipt.Memo"
            solo
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card-text>
    
    <v-card-actions class="px-5 pb-5">
      <v-spacer></v-spacer>
      <v-btn class="mr-2 btn-close" dark elevation="4"  :loading="isLoading" @click="goClose">取消</v-btn>
      <v-btn class="btn-add" dark elevation="4"  :loading="isLoading" @click="save">送出</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import EquipCode from '@/components/EquipRepairCode'
import DateSelect from '@/components/forManage/dateSelect'
import { fetchFormOrderOne, createFormOrder0, updateFormOrder } from "@/apis/formManage/serve"
import { getNowFullTime, decodeObject, unique } from "@/assets/js/commonFun";
export default {
  props:['flowNo'],
  data: () => ({
    dialog: false,  // dialog 是否顯示
    isLoading: false,  // 是否讀取中
    ipt: {},  // dialog 欄位
    defaultIpt: {  // dialog 欄位預設值
      MaintainCode_System: 'RST',
      MaintainCode_Loc: '',
      CheckDay: new Date().toISOString().substr(0, 10),  // 日期
      Driver: '',  // 司機員
      KmRecord: '',  // 行駛區間
      TrainNo: '',  // 列車次
      Km: '',  // 本日行駛公里
      AccumKm: '',  // 累計公里數
      HourDay: '',  // 發電機日工時
      Hours: '',  // 發電機累計工時
      DieselOil: 0,  // 耗用油量 (柴油)
      EngineOil: 0,// 耗用油量 (引擎機油)
      TCOil: 0,  // 耗用油量 (TC機油)
      WindMercury: 0,  // 耗用油量 (風泵)
      Other: 0,  // 耗用油量 (其他)
      Memo: '',  // 保養記事
    },
    dateMenuShow: false,  // 日曆是否顯示
    contentShow: false,  // 詳細內容 dialog 是否顯示
    eqCode: false,
    content: {},  // 詳細內容欄位
    preSetEqcode: '',
  }),
  components: { 
    EquipCode,
    DateSelect
  },
  computed: {
    ...mapState("user", {
      userData: (state) => state.userData, // 使用者基本資料
    }),
    dialogTitle () {
      return this.flowNo === -1 ? '新增資料' : '編輯資料'
    },
    com_equipCode: {
      get: function() {
        return this.ipt.MaintainCode_System + (this.ipt.MaintainCode_Loc==''?'':'-' + this.ipt.MaintainCode_Loc)
      },
      set: function(value) {
        let splitArr = value.split('-')
        this.ipt.MaintainCode_System = splitArr[0]
        this.ipt.MaintainCode_Loc = splitArr[1]
      }
    },
    customYN () {
      let Loc = this.ipt.MaintainCode_Loc
      return /^(DL|SL)\d{2}$/.test(Loc)
    }
  },
  methods: {
    ...mapActions('system', [
      'chMsgbar',  // 改變 messageBar
      'chLoadingShow',  // 切換 loading 圖顯示
    ]),
    // 送出
    save() {
      let keyArr = []
      for(let key in this.ipt){
        keyArr.push({ Column: key, Value: this.ipt[key] })
      }
      if( this.flowNo == -1 ) {
        createFormOrder0({
          ClientReqTime: getNowFullTime(), 
          OperatorID: this.userData.UserId,
          FunCode: "C",
          KeyName: 'RP066',
          KeyItem: [...keyArr]
        }).then(res => {
          if(res.data.ErrorCode==0) {
            this.chMsgbar({ success: true, msg: '資料新增成功!' })
          } else {
            console.error(res.data.Msg)
            this.chMsgbar({ success: false, msg: res.data.Msg })
          }
        }).catch(err => {
          console.error(err)
          this.chMsgbar({ success: false, msg:'資料新增失敗!' })
        }).finally(() => {
          this.$emit('search')
          this.goClose()
        })
      } else {
        updateFormOrder({
          ClientReqTime: getNowFullTime(), 
          OperatorID: this.userData.UserId,
          FunCode: "U",
          KeyName: 'RP066',
          RPFlowNo: this.flowNo,
          KeyItem: [...keyArr]
        }).then(res => {
          if(res.data.ErrorCode==0) {
            this.chMsgbar({ success: true, msg: '資料更新成功!' })
          } else {
            console.error(res.data.Msg)
            this.chMsgbar({ success: false, msg: res.data.Msg })
          }
        }).catch(err => {
          console.error(err)
          this.chMsgbar({ success: false, msg:'資料更新失敗!' })
        }).finally(() => {
          this.$emit('search')
          this.goClose()
        })
      }
    },
    goClose() {
      this.$emit('close')
    },
    //機車回傳
    getRtnCode(code) {
      this.preSetEqcode = code
    },
    //機車送出按鈕
    selectEQ() {
      this.com_equipCode = this.preSetEqcode
      this.eqCode = false
    }
  },
  created() {
    let tzoffset = (new Date()).getTimezoneOffset() * 60000; 
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1)
    let ISOArr = localISOTime.split('T')
    if(this.flowNo == -1){
      this.ipt = { ...this.defaultIpt }  // 初始化表單
      this.ipt.CheckDay = ISOArr[0]
      // this.ipt.Name = this.userData.UserName
      // this.ipt.ID = this.userData.UserId
      // this.ipt.DepartCode = this.userData.DeptList[0].DeptId
      // this.ipt.DepartName = this.userData.DeptList[0].DeptDesc
    } else {
      fetchFormOrderOne({
        ClientReqTime: getNowFullTime(), 
        OperatorId: this.userData.UserId,
        KeyName: 'RP066',
        KeyItem: [{ Column: "RPFlowNo", Value: this.flowNo }],
        QyName: [
          "CheckDay",
          "MaintainCode_System",  //設備報修碼(系統)
          "MaintainCode_Loc", //設備報修碼(位置)
          "Driver",   //司機員
          "KmRecord", //行駛區間
          "AccumKm",  //累計公里數
          "Km",   //本日行駛公里數
          "HourDay",  //發電機日工時
          "Hours",    //發電機累計工時
          "DieselOil",    //柴油
          "EngineOil",    //引擎機油
          "TCOil",    //TC機油
          "WindMercury",  //風汞
          "Other",    //其他
          "TrainNo",  //列車次
          "Memo", //保養記事
        ],
      }).then(res => {
        if(res.data.ErrorCode == 0){
          this.ipt = decodeObject(JSON.parse(res.data.DT))[0]
        } else {
          this.chMsgbar({ success: false, msg:'資料查詢失敗!' })
          this.goClose()
        }
      }).catch(err=>{
        this.chMsgbar({ success: false, msg:'資料查詢失敗!' })
        this.goClose()
      })
    }
  },
}
</script>