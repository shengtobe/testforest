<template>
  <div>
    <v-dialog v-model="Show" persistent max-width="1060px">
      <v-card class="theme-card">
        <v-card-title class="white--text px-4 py-1">
          {{isEdit?'編輯':'新增'}}{{ title }}
          <v-spacer></v-spacer>
          <v-btn dark fab small text @click="close" class="mr-n2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row no-gutter class="label-header">
            <v-col cols="12" sm="3">
              <dateSelect
                label="保養日期"
                v-model="InputData.MainFile[0].CheckDay"
                key="dateStart"
                :showIcon="formIconShow"
              />
            </v-col>
            <v-col cols="12" sm="3">
              <h3 class="mb-1">
                <v-icon class="mr-1 mb-1" v-if="formIconShow">mdi-domain</v-icon>車站
              </h3>
              <v-select 
                :items="stationList" 
                v-model="InputData.MainFile[0].StationCode"
                solo
                :readonly="isEdit"
                @change="changeStation"
                />
            </v-col>
          </v-row>
          <template v-if="InputData.MainFile[0].StationCode">
            <v-expansion-panels multiple>
              <v-expansion-panel>
                <v-expansion-panel-header color="btn-expansion" class="white--text">
                  轉轍器
                  <template v-slot:actions>
                    <v-icon color="dropdownicon">
                      $expand
                    </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <template v-for="switchs in stationQuestions.stationSwitch">
                    <v-col cols="12" sm="12" :key="'SwT'+switchs.areaCode">
                      <v-toolbar color="gradual-bg-darken-wood" dark>
                        <v-spacer/>
                        <v-toolbar-title>{{switchs.areaName}}</v-toolbar-title>
                        <v-spacer/>
                      </v-toolbar>
                    </v-col>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="border-bg-dark-yellow"
                      elevation="4"
                      v-for="(item, idx) in switchs.switch"
                      :key="'SwT'+switchs.areaCode+'SwS_'+idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter class="label-header">
                        <v-col cols="12" sm="2">
                          <h3 class="mb-1">{{switchs.areaName}}<br/>轉轍器號碼</h3>
                          {{ item }}號
                        </v-col>
                        <v-col cols="12" sm="2">
                          <v-radio-group
                            dense
                            row
                            class="pa-0 ma-0"
                            v-model="InputData.Switch.find(e=>e.SwitchLoc==switchs.areaCode&&e.SwitchNo==item).SwitchLock"
                          >
                            <h3 class="mb-1">轉轍器<br/>是否加鎖
                            </h3>
                            <v-radio color="success" label="已完成" value="1"></v-radio>
                            <v-radio color="red" label="未完成" value="2"></v-radio>
                            <v-radio color="orange" label="待改善" value="3"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <v-radio-group
                            dense
                            row
                            class="pa-0 ma-0"
                            v-model="InputData.Switch.find(e=>e.SwitchLoc==switchs.areaCode&&e.SwitchNo==item).Rust"
                          >
                            <h3 class="mb-1">清除滑板生銹或積油垢</h3>
                            <v-radio color="success" label="已完成" value="1"></v-radio>
                            <v-radio color="red" label="未完成" value="2"></v-radio>
                            <v-radio color="orange" label="待改善" value="3"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <v-radio-group
                            dense
                            row
                            class="pa-0 ma-0"
                            v-model="InputData.Switch.find(e=>e.SwitchLoc==switchs.areaCode&&e.SwitchNo==item).Bearing"  
                          >
                            <h3 class="mb-1">各部軸承、聯動桿、油孔注油</h3>
                            <v-radio color="success" label="已完成" value="1"></v-radio>
                            <v-radio color="red" label="未完成" value="2"></v-radio>
                            <v-radio color="orange" label="待改善" value="3"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <v-radio-group
                            dense
                            row
                            class="pa-0 ma-0"
                            v-model="InputData.Switch.find(e=>e.SwitchLoc==switchs.areaCode&&e.SwitchNo==item).SwitchClean"
                          >
                            <h3 class="mb-1">轉轍器四周環境清潔</h3>
                            <v-radio color="success" label="已完成" value="1"></v-radio>
                            <v-radio color="red" label="未完成" value="2"></v-radio>
                            <v-radio color="orange" label="待改善" value="3"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                            <h3 class="mb-1">備註<br/><br/></h3>
                          <span class="d-sm-none error--text">備註</span>
                          <v-textarea 
                            auto-grow 
                            outlined 
                            rows="2"
                            v-model="InputData.Switch.find(e=>e.SwitchLoc==switchs.areaCode&&e.SwitchNo==item).Memo"
                          />
                        </v-col>
                      </v-row>
                    </v-alert>
                  </template>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header color="btn-expansion" class="white--text">
                  檢查項目
                  <template v-slot:actions>
                    <v-icon color="dropdownicon">
                      $expand
                    </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <!-- 忠孝路平交道 -->
                  <template v-if="stationQuestions.stationCorssing">
                    <v-col cols="12" sm="12">
                      <v-toolbar color="gradual-bg-darken-wood" dark>
                        <v-spacer/>
                        <v-toolbar-title>忠孝路平交道</v-toolbar-title>
                        <v-spacer/>
                      </v-toolbar>
                    </v-col>
                    <v-row
                      no-gutter
                      class="label-header d-none d-sm-flex font-weight-black">
                        <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查結果</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">備註</h3>
                      </v-col>
                    </v-row>
                    <template v-for="(Cors,index) in stationQuestions.stationCorssing">
                      <v-alert  
                        dense
                        border="top"
                        colored-border
                        color="border-bg-dark-yellow"
                        elevation="4"
                        :key="'CrI'+index"
                        class="mb-6 mt-4"
                      >
                        <v-row no-gutter class="label-header">
                          <v-col cols="12" sm="4">{{ Cors.corsName }}</v-col>
                          <v-col cols="12" sm="4">
                            <v-radio-group
                              dense
                              row
                              class="pa-0 ma-0"
                              v-model="InputData.Cors.find(e=>e.CrosType==Cors.corsCode).CrosCheck"
                            >
                              <v-radio color="success" label="正常" value="1"></v-radio>
                              <v-radio color="red" label="異常" value="2"></v-radio>
                            </v-radio-group>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <span class="d-sm-none error--text">備註</span>
                            <v-textarea 
                              auto-grow
                              outlined 
                              rows="2"
                              v-model="InputData.Cors.find(e=>e.CrosType==Cors.corsCode).Memo"
                            />
                          </v-col>
                        </v-row>
                      </v-alert>
                    </template>
                  </template>
                  <!-- 進出站號誌機、開車燈 -->
                  <v-col cols="12" sm="12">
                    <v-toolbar color="gradual-bg-darken-wood" dark>
                      <v-spacer/>
                      <v-toolbar-title>進出站號誌機{{stationQuestions.stationSign[0].signType.length>1?'、開車訊號燈':''}}</v-toolbar-title>
                      <v-spacer/>
                    </v-toolbar>
                  </v-col>
                  <v-row
                    no-gutter
                    class="label-header d-none d-sm-flex font-weight-black">
                      <v-col cols="12" sm="4">
                      <h3 class="mb-1">檢查項目</h3>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">檢查結果</h3>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">備註</h3>
                    </v-col>
                  </v-row>
                  <template v-for="Signs in stationQuestions.stationSign">
                    <template v-for="item in Signs.signType">
                      <v-alert  
                        dense
                        border="top"
                        colored-border
                        color="border-bg-dark-yellow"
                        elevation="4"
                        :key="'SiI'+Signs.signCode+'I'+item.STCode"
                        class="mb-6 mt-4"
                      >
                        <v-row no-gutter class="label-header">
                          <v-col cols="12" sm="4">{{ Signs.signName }}方向<br>{{item.STName}}是否正常作用</v-col>
                          <v-col cols="12" sm="4">
                            <v-radio-group
                              dense
                              row
                              class="pa-0 ma-0"
                              v-model="InputData.Sign.find(e=>e.SigFace==Signs.signCode&&e.SigType==item.STCode).SigCheck"
                            >
                              <v-radio color="success" label="正常" value="1"></v-radio>
                              <v-radio color="red" label="異常" value="2"></v-radio>
                              <v-radio v-if="InputData.MainFile[0].StationCode!='RP001'" color="black" label="無此項目" value="3"></v-radio>
                            </v-radio-group>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <span class="d-sm-none error--text">備註</span>
                            <v-textarea 
                              auto-grow
                              outlined 
                              rows="2"
                              v-model="InputData.Sign.find(e=>e.SigFace==Signs.signCode&&e.SigType==item.STCode).Memo"
                            />
                          </v-col>
                        </v-row>
                      </v-alert>
                    </template>
                  </template>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </template>
        </v-card-text>
        <v-card-actions class="px-5 pb-5">
          <v-btn
            v-if="isEdit"
            elevation="4"
            class="mr-2 btn-delete white--text"
            :loading="isLoading"
            @click="del(RPFlowNo)"
            >刪除</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn class="mr-2 btn-close white--text" elevation="4" @click="close">取消</v-btn>
          <v-btn
            class="btn-add white--text"
            elevation="4"
            :loading="isLoading"
            @click="save"
            >送出</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="Del" persistent max-width="290px">
      <v-card class="theme-del-card">
        <v-card-title class="white--text px-4 py-1 headline">
          確認是否刪除?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="btn-close white--text" @click="delCancel">取消</v-btn>
          <v-btn @click="del" class="btn-delete white--text">刪除</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import dateSelect from "@/components/forManage/dateSelect";

import { mapState, mapActions } from "vuex";
import { getNowFullTime, getTodayDateString } from "@/assets/js/commonFun";
import { securityEdit, securityQuery, securityDelete } from '@/apis/formManage/serve';

import { stations } from "@/assets/js/securitySettings";
import { Constrant } from "@/assets/js/constrant";

export default {
  data() {
    return {
      Show: false,
      isLoading: false,
      title: "保安裝置檢查紀錄表",
      formIconShow: true,
      InputData: {
        MainFile: [
          {
            CheckDay: "",
            StationCode: "",
          }
        ],
        Switch: [],
        Sign: [],
        Cors: []
      },
      isEdit: false,
      RPFlowNo: '',
      Del: false,
      DelRPFlowNo: ''
    };
  },
  components: { 
    dateSelect
  },
  computed: {
    ...mapState ('user', {
        userData: state => state.userData,  // 使用者基本資料
    }),
    stationList() { //車站選單
      return [
        { 
          value: "",
          text: "請選擇" 
        },
        ...stations.map(e=>({
          value: e.stationCode,
          text: e.stationName
        }))
      ]
    },
    stationQuestions() {  //車站設定檔
      return stations.find(e=>e.stationCode==this.InputData.MainFile[0].StationCode)
    }
  },
  methods: {
    ...mapActions('system', [
      'chLoadingShow',  // 切換 loading 圖顯示
      'chMsgbar',  // 改變 messageBar
    ]),
    newOne() {  //新增
      this.isLoading = true
      this.chLoadingShow({show:true})
      this.resetData()
      this.InputData.MainFile[0].CheckDay = getTodayDateString()
      this.Show = true
      this.isEdit = false
      this.isLoading = false
      this.chLoadingShow({show:false})
    },
    changeStation() { //新增，選定車站之後初始化資料，用設定檔產
      const Sswitch = this.stationQuestions.stationSwitch
      const Ssign = this.stationQuestions.stationSign
      const Scorssing = this.stationQuestions.stationCorssing
      this.InputData.Switch = []
      this.InputData.Sign = []
      this.InputData.Cors = []

      for( let Lo of Sswitch ) {
        for( let Sw of Lo.switch ){
          this.InputData.Switch.push({
            SwitchLoc: Lo.areaCode,
            SwitchNo: Sw,
            SwitchLock: "0",
            Rust: "0",
            Bearing: "0",
            SwitchClean: "0",
            Memo: ""
          })
        }
      }

      for( let Lo of Ssign) {
        for( let Ty of Lo.signType ) {
          this.InputData.Sign.push({
            SigFace: Lo.signCode,
            SigType: Ty.STCode,
            SigCheck: "0",
            Memo: ""
          })
        }
      }

      if(Scorssing){
        for( let Co of Scorssing ) {
          this.InputData.Cors.push({
            CrosType: Co.corsCode,
            CrosCheck: "0",
            Memo: ""
          })
        }
      }
    },
    editOne(RPFlowNo) { // 修改/檢視
      this.isLoading = true
      this.chLoadingShow({show:true})
      securityQuery({
        RPFlowNo: RPFlowNo,
        ClientReqTime: getNowFullTime(),
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res=>{
        if(res.data.ErrorCode == 0) {
          this.RPFlowNo = RPFlowNo
          let resData = res.data
          delete resData.ErrorCode
          delete resData.msg
          delete resData.Token
          this.InputData = resData
        } else {
          this.chMsgbar({ success: false, msg: Constrant.query.failed })
        }
      }).finally(()=>{
        this.Show = true
        this.isEdit = true
        this.isLoading = false
        this.chLoadingShow({show:false})
      })
    },
    save() {  //存檔=>新增和更新寫在同一支，用FunCode判斷，更新要多寫RPFlowNo
      let Idata = {
        FunCode: this.isEdit?'U':'C',
        ...this.InputData,
        ClientReqTime: getNowFullTime(),
        OperatorID: this.userData.UserId,  // 操作人id
      }
      if(this.isEdit){
        Idata.RPFlowNo = this.RPFlowNo
      }
      securityEdit({
        ...Idata
      }).then(res=>{
        if(res.data.ErrorCode == 0) {
          this.chMsgbar({ success: true, msg: this.isEdit?Constrant.update.success:Constrant.insert.success })
        } else {
          this.chMsgbar({ success: false, msg: this.isEdit?Constrant.update.failed:Constrant.insert.failed })
        }
      }).finally(()=>{
        this.isLoading = false
        this.chLoadingShow({show:false})
        this.$emit('goSearch')
        this.close()
      })
    },
    close() { //關閉modal，順便重設InputData
      this.resetData()
      this.Show = false
    },
    resetData() { //重設InputData
      this.InputData = {
        MainFile: [
          {
            CheckDay: "",
            StationCode: "",
          }
        ],
        Switch: [],
        Sign: [],
        Cors: []
      }
    },
    befDel(RPFlowNo) {
      this.DelRPFlowNo = RPFlowNo
      this.Del = true
    },
    delCancel() {
      this.DelRPFlowNo = ''
      this.Del = false
    },
    del() { //刪除資料
      this.isLoading = true
      this.chLoadingShow({show:true})
      securityDelete({
        RPFlowNo: this.DelRPFlowNo,
        ClientReqTime: getNowFullTime(),
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res=>{
        if(res.data.ErrorCode == 0) {
          this.chMsgbar({ success: true, msg: Constrant.delete.success })
        } else {
          this.chMsgbar({ success: false, msg: Constrant.delete.failed })
        }
      }).finally(()=>{
        this.isLoading = false
        this.chLoadingShow({show:false})
        this.$emit('goSearch')
        this.close()
        this.delCancel()
      })
    },
  },
};
</script>