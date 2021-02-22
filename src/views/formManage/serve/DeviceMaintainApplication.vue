<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2">
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>檢查日期(起)
        </h3>
        <v-menu
          v-model="QueryDayStart"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="QueryData.DayStart" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="QueryData.DayStart"
            @input="QueryDayStart = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>檢查日期(迄)
        </h3>
        <v-menu
          v-model="QueryDayEnd"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="QueryData.DayEnd" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="QueryData.DayEnd"
            @input="QueryDayEnd = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn color="green" dark large class="mb-sm-8 mb-md-8" @click="search">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="px-2">
      <v-col cols="12" sm="3" md="3">
        <v-form ref="uploadform">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-file</v-icon>檔案上傳
          </h3>
          <v-text-field solo placeholder="點此選擇檔案" />
        </v-form>
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn color="pink" dark large class="mb-sm-8 mb-md-8">
          <v-icon class="mr-1">mdi-cloud-upload</v-icon>上傳
        </v-btn>
        <v-btn
          color="indigo"
          elevation="3"
          dark
          large
          class="ml-4 ml-sm-4 ml-md-4 mb-sm-8 mb-md-8"
          @click="newOne"
        >
          <!-- @click="AddJobApplication = true" -->
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </v-col>
    </v-row>
    <!-- 表格資料 -->
    <v-col cols="12">
      <v-card>
        <v-data-table
          :headers="headers"
          :items="tableItems"
          :options.sync="pageOpt"
          disable-sort
          disable-filtering
          hide-default-footer
        >
          <template v-slot:no-data>
            <span class="red--text subtitle-1">沒有資料</span>
          </template>

          <template v-slot:loading>
            <span class="red--text subtitle-1">資料讀取中...</span>
          </template>

          <!-- headers 的 content 欄位 (檢視內容) -->
          <template v-slot:item.content="{ item }">
            <v-btn
              title="詳細資料"
              class="mr-2"
              small
              dark
              fab
              color="info darken-1"
              @click="viewPage(item)"
            >
              <!--上面一行原程式: @click="AddJobApplication = true" -->
              <v-icon dark>mdi-magnify</v-icon>
            </v-btn>
          </template>

          <!-- 頁碼 -->
          <template v-slot:footer="footer">
            <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <!-- 新增保安裝置保修工作申請書 modal -->
    <v-dialog v-model="AddJobApplication" max-width="900px">
      <v-card>
        <v-card-title class="blue white--text px-4 py-1">
          新增{{ title }}
          <v-spacer />
          <v-btn dark fab small text @click="CloseJobApplication" class="mr-n2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <div class="px-6 py-4">
          <v-row>
            <!-- 檢查項目 -->
            <v-col cols="12">
              <v-row no-gutter class="indigo--text">
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">站長</h3>
                  <v-text-field solo v-model="CheckMan"/>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">施工負責人</h3>
                  <v-text-field solo v-model="doMan.name"/>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">施工負責人電話</h3>
                  <v-text-field solo v-model="TEL"/>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">現場聯絡人電話</h3>
                  <v-text-field solo v-model="Contactor"/>
                </v-col>
              </v-row>
              <v-expansion-panels multiple>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">工作概要</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-col cols="12">
                      <p>1.編號原則：站名-年-月-流水號 例如 北站1080301號</p>
                      <p>2.本表與保安裝置保修工作紀錄簿一併保存。</p>
                      <p>3.本表應保存一年。</p>
                    </v-col>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="3">
                          <h3>申請日期</h3>
                          <v-menu
                            v-model="ApplicationDay"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model.trim="CheckDay"
                                outlined
                                v-on="on"
                                dense
                                single-line
                              />
                            </template>
                            <v-date-picker
                              color="purple"
                              v-model="CheckDay"
                              @input="ApplicationDay = false"
                              locale="zh-tw"
                            />
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <h3>編號(由車站填寫)</h3>
                          <input class="newinput" placeholder="號" v-model="NumberID"/>
                          <input class="newinput" placeholder="站" v-model="StationID"/>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <h3>工作開始時刻</h3>
                          <v-menu
                            v-model="BgWorkDay_Show"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                style="margin-bottom: -10%;"
                                v-model.trim="BgWorkDay"
                                outlined
                                v-on="on"
                                dense
                                single-line
                              />
                            </template>
                            <v-date-picker
                              color="purple"
                              v-model="BgWorkDay"
                              @input="BgWorkDay_Show = false"
                              locale="zh-tw"
                            />
                          </v-menu>
                          <input class="newinput widtha" type="number" placeholder="時" v-model="BgWorkTime.hr"/>
                          <input class="newinput widtha" type="number" placeholder="分" v-model="BgWorkTime.min"/>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <h3>工作完成預定時刻</h3>
                          <v-menu
                            v-model="FinDay_Show"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model.trim="FinDay"
                                outlined
                                v-on="on"
                                dense
                                single-line
                                style="margin-bottom: -10%;"
                              />
                            </template>
                            <v-date-picker
                              color="purple"
                              v-model="FinDay"
                              @input="FinDay_Show = false"
                              locale="zh-tw"
                            />
                          </v-menu>
                          <input class="newinput widtha" type="number" placeholder="時" v-model="FinTime.hr"/>
                          <input class="newinput widtha" type="number" placeholder="分" v-model="FinTime.min"/>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <h3>工作概要</h3>
                          <v-textarea auto-grow outlined rows="2" v-model="DescriptionWork"/>
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">施工許可證</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-col cols="12">
                      <p>1. 本證施工負責人應妥為保管不得遺失或損毀。</p>
                      <p>2. 工作結束施工負責人應將本證交還站長存查。</p>
                      <p>3. 本證應保管一年。</p>
                    </v-col>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="3">
                          <h3>編號</h3>
                          <v-text-field dense single-line outlined v-model="WorkID"/>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <h3>站填發</h3>
                          <v-text-field dense single-line outlined v-model="Station"/>
                        </v-col>
                        <v-col cols="12">
                          <h3>施工地點：站外</h3>
                          <input class="newinput widtha" type="number" v-model="BgStation"/>站至
                          <input class="newinput widtha" type="number" v-model="EndStation"/>站間
                          <br />
                          <input class="newinput widthb" type="number" v-model="BgKm"/>公里
                          <input class="newinput widthb" type="number" v-model="BgM"/>公尺 至
                          <input class="newinput widthb" type="number" v-model="EndKm"/>公里
                          <input class="newinput widthb" type="number" v-model="EndM"/>公尺
                        </v-col>
                        <v-col cols="12" sm="3">
                          <h3>施工地點：站內</h3>第
                          <input class="newinput" style="width: 60%" v-model="Line"/>股線
                        </v-col>
                        <v-col cols="12" sm="3">
                          <h3>轉轍器-停用</h3>
                          <input class="newinput" style="width: 60%" type="number" v-model="SwitchNo"/>號
                        </v-col>
                        <v-col cols="12" sm="3">
                          <h3>工作核準時間</h3>
                          <v-menu
                            v-model="WorkCheckTime"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model.trim="ReadyWorkDay"
                                outlined
                                v-on="on"
                                dense
                                single-line
                                style="margin-bottom: -5%;"
                              />
                            </template>
                            <v-date-picker
                              color="purple"
                              v-model="ReadyWorkDay"
                              @input="WorkCheckTime = false"
                              locale="zh-tw"
                            />
                          </v-menu>
                          <input class="newinput widtha" type="number" placeholder="時" v-model="ReadyWorkTime.hr"/>
                          <input class="newinput widtha" type="number" placeholder="分" v-model="ReadyWorkTime.min"/>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <h3>工作完成時間</h3>
                          <v-menu
                            v-model="WorkFinishTime"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model.trim="FinishDay"
                                outlined
                                v-on="on"
                                dense
                                single-line
                                style="margin-bottom: -5%;"
                              />
                            </template>
                            <v-date-picker
                              color="purple"
                              v-model="FinishDay"
                              @input="WorkFinishTime = false"
                              locale="zh-tw"
                            />
                          </v-menu>
                          <input class="newinput widtha" type="number" placeholder="時" v-model="FinishTime.hr"/>
                          <input class="newinput widtha" type="number" placeholder="分" v-model="FinishTime.min"/>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <h3>填發站長</h3>
                          <v-text-field dense single-line outlined v-model="Supervisor"/>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <h3>施工負責人</h3>
                          <v-text-field dense single-line outlined v-model="ResponDep">
                            <span slot="prepend">單位</span>
                          </v-text-field>
                          <v-text-field dense single-line outlined v-model="ResponMan">
                            <span slot="prepend">姓名</span>
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
            <!-- END 檢查項目 -->
          </v-row>
        </div>

        <v-card-actions class="px-5 pb-5">
          <v-spacer />
          <v-btn class="mr-2" elevation="4" @click="CloseJobApplication">取消</v-btn>
          <v-btn color="success" elevation="4" :loading="isLoading" @click="save">送出</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from 'vuex'
import { getNowFullTime, getTodayDateString, unique} from "@/assets/js/commonFun";
import { maintainStatusOpts } from '@/assets/js/workList'
import { fetchFormOrderList, fetchFormOrderOne, createFormOrder, createFormOrder0 } from '@/apis/formManage/serve'
import { formDepartOptions } from '@/assets/js/departOption'

export default {
  data() {
    return {
      title: "保安裝置保修工作申請書",
      newText: "申請書",
      isLoading: false,
      disabled: false,
      QueryDayStart: "",
      QueryDayEnd: "",
      QueryData: {
        DayStart: "",
        DayEnd: "",
      },
      formDepartOptions: [
        // 通報單位下拉選單
        { text: "不限", value: "" },
        ...formDepartOptions,
      ],
      WorkDayStart: "",
      WorkDayEnd: "",
      WorkCheckTime: "",
      WorkFinishTime: "",
      AddData: {
        ApplicationDay: "",
        WorkDayStart: "",
        WorkDayEnd: "",
        WorkCheckTime: "",
        WorkFinishTime: "",
      },
      AddJobApplication: false,
      ApplicationDay: "",
      pageOpt: { page: 1 }, // 目前頁數
      //---api---
      DB_Table: "RP017",
      nowTime: "",
      doMan:{
        id: '',
        name: '',
        depart: '',
        checkManName: ''
      },
      BgWorkDay_Show: false,
      FinDay_Show: false,
      //填空
      CheckMan: '',
      TEL: '',
      Contactor: '',
      CheckDay: '',
      NumberID: '',
      StationID: '',
      BgWorkDay: '',
      BgWorkTime:{
        hr: '',
        min: '',
      },
      FinDay: '',
      FinTime: {
        hr: '',
        min: ''
      },
      DescriptionWork: '',
      WorkID: '',
      Station: '',
      BgStation: '',
      EndStation: '',
      BgKm: '',
      BgM: '',
      EndKm: '',
      EndM: '',
      Line: '',
      SwitchNo: '',
      ReadyWorkDay: '',
      ReadyWorkTime: {
        hr: '',
        min: ''
      },
      FinishDay: '',
      FinishTime: {
        hr: '',
        min: ''
      },
      Supervisor: '',
      ResponDep: '',
      ResponMan: '',
      //----------(填空)
      ipt2: {},
      defaultIpt: {  // 預設的欄位值
          startDay: '',
          EndDay: '',
          depart: '',  // 單位
        },
      headers: [
        // 表格顯示的欄位 DepartCode ID Name
        { text: "項次", value: "ItemNo", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "保養日期", value: "CheckDay", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "審查狀態", value: "CheckStatus", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "填寫人", value: "Name", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        // { text: "保養單位", value: "DepartName", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "功能", value: "content", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
      ],
      tableItems: [],
      //------
      suggest: "", // 改善建議
    };
  },
  components: { Pagination }, // 頁碼
  computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),

    },
    created() {
      this.ipt2 = { ...this.defaultIpt }
      //更新時間
      var today=new Date();
      let mStr = today.getMonth()+1;
      let dStr = today.getDate();
      if(mStr < 10){
        mStr = '0' + mStr;
      }
      if(dStr < 10){
        dStr = '0' + dStr;
      }
      this.nowTime = today.getFullYear()+'-'+ mStr +'-'+ dStr;
      this.z = this.df = this.nowTime
  },
  methods: {
    initInput(){
      this.doMan.name = this.userData.UserName;
      this.CheckDay = this.nowTime;
      var step;
      
      this.CheckMan = '',
      this.TEL = '',
      this.Contactor = '',
      this.NumberID = '',
      this.StationID = '',
      this.BgWorkDay = '',
      this.BgWorkTime.hr = '',
      this.BgWorkTime.min = '',
      this.FinDay = '',
      this.FinTime.hr,
      this.FinTime.min,
      this.DescriptionWork = '',
      this.WorkID = '',
      this.Station = '',
      this.BgStation = '',
      this.EndStation = '',
      this.BgKm = '',
      this.BgM = '',
      this.EndKm = '',
      this.EndM = '',
      this.Line = '',
      this.SwitchNo = '',
      this.ReadyWorkDay = '',
      this.ReadyWorkTime.hr = '',
      this.ReadyWorkTime.min = '',
      this.FinishDay = '',
      this.FinishTime.hr = '',
      this.FinishTime.min = '',
      this.Supervisor = '',
      this.ResponDep = '',
      this.ResponMan = ''
    },
    addZero(num){
      let result
      if(num == "") return "00";
      if(num < 10){
        result = "0" + num
      }
      else{
        result = "" + num
      }
      return result
    },
    unique(list){
      var arr = [];
      let b = false;
      for (var i = 0; i < list.length; i++) {
        if (i == 0) arr.push(list[i]);
        b = false;
        if (arr.length > 0 && i > 0) {
          for (var j = 0; j < arr.length; j++) {
            if (arr[j].RPFlowNo == list[i].RPFlowNo) {
              b = true;
              //break;
            }
          }
          if (!b) {
            arr.push(list[i]);
          }
        }
      }
      return arr;
    },
    newOne(){
      console.log("newOne23")
      this.AddJobApplication = true
      console.log("this.Add: " + this.Add)
      this.initInput();
    },
    ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 搜尋
    search() {
      console.log("Search click");
      this.chLoadingShow()
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {'Column':'StartDayVlaue','Value':this._data.QueryData.DayStart},
          {"Column":"EndDayVlaue","Value":this._data.QueryData.DayEnd},
          {"Column":"DepartCode","Value":this._data.ipt2.depart},
                ],
        QyName:[
          // "DISTINCT (RPFlowNo)",
          // // "ID",
          // // "Name",
          // // "CheckDay",
          // // "CheckStatus",
          // " * "
          "RPFlowNo",
          "ID",
          "Name",
          "CheckDay",
          "CheckStatus",
          "FlowId", "DepartName"
        ],
      }).then(res => {
        let tbBuffer = JSON.parse(res.data.DT)
        let aa = unique(tbBuffer)
        this.tableItems = aa
      }).catch(err => {
        console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        console.log("search final")
        this.chLoadingShow()
      })
    },
    // 存
    save() {
      console.log("送出!!")
      this.chLoadingShow()

      let arr = new Array()
      let obj = new Object()

      // obj = new Object()
      // obj.Column = "CheckDay"
      // obj.Value = this.zs
      // arr = arr.concat(obj)
      // console.log(JSON.stringify(arr))

      createFormOrder0({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id this.doMan.name = this.userData.UserName
        // OperatorID: "16713",  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem:[
          {"Column":"CheckDay","Value":this.nowTime},
          {"Column":"CheckMan","Value":this.CheckMan},
          {"Column":"TEL","Value":this.TEL},
          {"Column":"Contactor","Value":this.Contactor},
          {"Column":"NumberID","Value":this.NumberID},
          {"Column":"StationID","Value":this.StationID},
          {"Column":"BgWorkDay","Value":this.BgWorkDay},
          {"Column":"BgWorkTime","Value":this.addZero(this.BgWorkTime.hr) + ":" + this.addZero(this.BgWorkTime.min)},
          {"Column":"FinDay","Value":this.FinDay},
          {"Column":"FinTime","Value":this.addZero(this.FinTime.hr) + ":" + this.addZero(this.FinTime.min)},
          {"Column":"DescriptionWork","Value":this.DescriptionWork},
          {"Column":"WorkID","Value":this.WorkID},
          {"Column":"Station","Value":this.Station},
          {"Column":"BgStation","Value":this.BgStation},
          {"Column":"EndStation","Value":this.EndStation},
          {"Column":"BgKm","Value":this.BgKm},
          {"Column":"BgM","Value":this.BgM},
          {"Column":"EndKm","Value":this.EndKm},
          {"Column":"EndM","Value":this.EndM},
          {"Column":"Line","Value":this.Line},
          {"Column":"SwitchNo","Value":this.SwitchNo},
          {"Column":"ReadyWorkDay","Value":this.ReadyWorkDay},
          {"Column":"ReadyWorkTime","Value":this.addZero(this.ReadyWorkTime.hr) + ":" + this.addZero(this.ReadyWorkTime.min)},
          {"Column":"FinishDay","Value":this.FinishDay},
          {"Column":"FinishTime","Value":this.addZero(this.FinishTime.hr) + ":" + this.addZero(this.FinishTime.min)},
          {"Column":"Supervisor","Value":this.Supervisor},
          {"Column":"ResponDep","Value":this.ResponDep},
          {"Column":"ResponMan","Value":this.ResponMan}
        ]
      }).then(res => {
        console.log(res.data.DT)
      }).catch(err => {
        console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow()
      })
      this.AddJobApplication = false
    },
    // 關閉 dialog
    CloseJobApplication() {
      this.AddJobApplication = false;
    },
    close() {
      this.Add = false;
      this.dialog3 = false;
      this.dialogShowEdit = false;
      this.dialogDel = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.addItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    viewPage(item) {
      console.log("item: " + item)
      console.log("RPFlowNo: " + item.RPFlowNo)
      this.chLoadingShow()
        // 依業主要求變更檢式頁面的方式，所以改為另開分頁
        fetchFormOrderOne({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {'Column':'RPFlowNo','Value':item.RPFlowNo},
                ],
        QyName:[
          "CheckDay",
          "Name",
          "CheckMan",
          "TEL",
          "Contactor",
          "NumberID",
          "StationID",
          "BgWorkDay",
          "BgWorkTime",
          "FinDay",
          "FinTime",
          "DescriptionWork",
          "WorkID",
          "Station",
          "BgStation",
          "EndStation",
          "BgKm",
          "BgM",
          "EndKm",
          "EndM",
          "Line",
          "SwitchNo",
          "ReadyWorkDay",
          "ReadyWorkTime",
          "FinishDay",
          "FinishTime",
          "Supervisor",
          "ResponDep",
          "ResponMan",
        ],
      }).then(res => {
        this.initInput();
        console.log(res.data.DT)
        let dat = JSON.parse(res.data.DT)
        this.AddJobApplication = true
        this.doMan.name = dat[0].Name
        // this.CheckDay = dat[0].CheckDay.substr(0,10)
        this.CheckDay = dat[0].CheckDay
        //123資料
        var ar;
        
        this.NumberID = dat[0].NumberID
        this.CheckMan = dat[0].CheckMan
        this.TEL = dat[0].TEL
        this.Contactor = dat[0].Contactor
        this.StationID = dat[0].StationID
        this.BgWorkDay = dat[0].BgWorkDay
        ar = dat[0].BgWorkTime.split(":")
        this.BgWorkTime.hr = ar[0]
        this.BgWorkTime.min = ar[1]
        this.FinDay = dat[0].FinDay
        ar = dat[0].FinTime.split(":")
        this.FinTime.hr = ar[0]
        this.FinTime.min = ar[1]
        this.DescriptionWork = dat[0].DescriptionWork
        this.WorkID = dat[0].WorkID
        this.Station = dat[0].Station
        this.BgStation = dat[0].BgStation
        this.EndStation = dat[0].EndStation
        this.BgKm = dat[0].BgKm
        this.BgM = dat[0].BgM
        this.EndKm = dat[0].EndKm
        this.EndM = dat[0].EndM
        this.Line = dat[0].Line
        this.SwitchNo = dat[0].SwitchNo
        this.ReadyWorkDay = dat[0].ReadyWorkDay
        ar = dat[0].ReadyWorkTime.split(":")
        this.ReadyWorkTime.hr = ar[0]
        this.ReadyWorkTime.min = ar[1]
        this.FinishDay = dat[0].FinishDay
        ar = dat[0].FinishTime.split(":")
        this.FinishTime.hr = ar[0]
        this.FinishTime.min = ar[1]
        this.Supervisor = dat[0].Supervisor
        this.ResponDep = dat[0].ResponDep
        this.ResponMan = dat[0].ResponMan
        
      }).catch(err => {
        console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow()
      })
    },//viewPage
  },
};
</script>

<style>
.widtha {
  width: 33%;
}
.widthb {
  width: 15%;
}
.newinput {
  border-radius: 3px;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 37px;
  margin: 3px;
  font-size: 16px;
  padding: 1px 9px;
  border-width: 1px;
  border-style: double;
}
</style>
