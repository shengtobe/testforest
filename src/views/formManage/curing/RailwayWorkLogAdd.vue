<template>
  <v-sheet class="ma-4 mb-8" color="yellow lighten-2">
    <v-container style="max-width: 1200px" class="px-8">
      <p class="font-weight-black title text-center">新增{{ title }}</p>
      <v-row class="white px-4">
        <!-- 基本資料 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="3">
            <h3 class="mb-1">保養日期</h3>
            <v-menu
              v-model="MaintenanceDay"
              :close-on-content-click="false"
              transition="scale-transition"
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field v-model.trim="AddData.MaintenanceDay" outlined v-on="on" dense single-line />
              </template>
              <v-date-picker
                color="purple"
                v-model="AddData.MaintenanceDay"
                @input="MaintenanceDay = false"
                locale="zh-tw"
              />
            </v-menu>
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">天氣</h3>
            <v-select dense single-line :items="Weather" outlined />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">現場工作負責人職稱</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">姓名</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">工作項目</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">工作地點</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="6" sm="2" class="xwd">
            <h3 class="mb-1">全班人數</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
          <v-col cols="6" sm="2" class="xwd">
            <h3 class="mb-1">出勤人數</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
        </v-row>
        <!-- 人員出勤狀態 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="6" sm="1">
            <h3 class="mb-1">休假</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
          <v-col cols="6" sm="1">
            <h3 class="mb-1">病假</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
          <v-col cols="6" sm="1">
            <h3 class="mb-1">事假</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
          <v-col cols="6" sm="1">
            <h3 class="mb-1">公假</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
          <v-col cols="6" sm="1">
            <h3 class="mb-1">助勤</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
          <v-col cols="6" sm="1">
            <h3 class="mb-1">公出</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
          <v-col cols="6" sm="1">
            <h3 class="mb-1">夜休</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
          <v-col cols="6" sm="1">
            <h3 class="mb-1">出差</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
          <v-col cols="6" sm="1">
            <h3 class="mb-1">查道</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
          <v-col cols="6" sm="2">
            <h3 class="mb-1">遲到早退</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">其他</h3>
            <v-text-field dense single-line outlined />
          </v-col>
        </v-row>
        <!-- 出料 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12">
            <h3>出料</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">名稱</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">單位</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">數量</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 進料 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12">
            <h3>進料</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">名稱</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">單位</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">數量</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 舊料 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12">
            <h3>舊料</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">名稱</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">單位</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">回收數量</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">退段數量</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
              <v-row no-gutter>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">名稱</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">單位</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">回收數量</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">退段數量</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 使用機具 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12">
            <h3>本日使用機具</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row justify="space-around">
                <v-checkbox class="col-6 col-md-3" label="1.起道機" />
                <v-checkbox class="col-6 col-md-3" label="2.砸道機" />
                <v-checkbox class="col-6 col-md-3" label="3.電機" />
                <v-checkbox class="col-6 col-md-3" label="4.鋸軌機" />
                <v-checkbox class="col-6 col-md-3" label="5.鑽孔機" />
                <v-checkbox class="col-6 col-md-3" label="6.割草機" />
                <v-checkbox class="col-6 col-md-3" label="7.噴霧器" />
                <v-checkbox class="col-6 col-md-3" label="8.螺栓擰緊器" />
                <v-checkbox class="col-6 col-md-3" label="9.起釘撬棍" />
                <v-checkbox class="col-6 col-md-3" label="10.洋鎬" />
                <v-checkbox class="col-6 col-md-3" label="11.大槌" />
                <v-checkbox class="col-6 col-md-3" label="12.水平軌距尺" />
                <v-checkbox class="col-6 col-md-3" label="13.洋鏟" />
                <v-checkbox class="col-6 col-md-3" label="14.鏈鋸機" />
                <v-checkbox class="col-6 col-md-3" label="15.鐵担車" />
                <v-checkbox class="col-6 col-md-3" label="16.平車" />
                <v-checkbox class="col-6 col-md-3" label="17.吊軌器" />
                <v-checkbox class="col-6 col-md-3" label="18.彎軌器" />
                <v-checkbox class="col-6 col-md-3" label="19.電動砂輪機" />
                <v-checkbox class="col-6 col-md-3" label="20.鈍孔機" />
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 工具及材料檢查 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12">
            <h3>工具及材料檢查</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">1.工具及材料檢查</h3>
                  <v-radio-group v-model="row" row>
                    <v-radio label="正常" value="radio-1" />
                    <v-radio label="異常" value="radio-2" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">2.其他機具</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">3.異常機具(填機具代號)</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
              <h3 class="mb-1">4.機具使用前檢查</h3>
              <v-row no-gutter>
                <v-col cols="12" sm="3">
                  <h4 class="mb-1">(1)機油</h4>
                  <v-radio-group v-model="row" row>
                    <v-radio label="正常" value="radio-1" />
                    <v-radio label="異常" value="radio-2" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3">
                  <h4 class="mb-1">(2)油料</h4>
                  <v-radio-group v-model="row" row>
                    <v-radio label="正常" value="radio-1" />
                    <v-radio label="異常" value="radio-2" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3">
                  <h4 class="mb-1">(3)油壓及線路</h4>
                  <v-radio-group v-model="row" row>
                    <v-radio label="正常" value="radio-1" />
                    <v-radio label="異常" value="radio-2" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3">
                  <h4 class="mb-1">(4)啟動及運轉情形</h4>
                  <v-radio-group v-model="row" row>
                    <v-radio label="正常" value="radio-1" />
                    <v-radio label="異常" value="radio-2" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3">
                  <h4 class="mb-1">(5)各部位螺栓鬆緊</h4>
                  <v-radio-group v-model="row" row>
                    <v-radio label="正常" value="radio-1" />
                    <v-radio label="異常" value="radio-2" />
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 其餘檢查 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12">
            <h3>其餘檢查</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-col cols="12">
                <h4>(1)行前檢查</h4>
                <v-row no-gutter justify="space-around">
                  <v-checkbox class="col-12 col-md-4" label="人員安全配備檢查" />
                  <v-checkbox class="col-12 col-md-4" label="行車調度無線電話機測試" />
                  <v-checkbox class="col-12 col-md-4" label="已辦妥進入路線內申請" />
                </v-row>
              </v-col>
              <v-col cols="12">
                <h4>(2)暸望員安全配戴</h4>
                <v-row no-gutter justify="space-around">
                  <v-checkbox class="col-6 col-md-3" label="臂章" />
                  <v-checkbox class="col-6 col-md-3" label="無線電對講機" />
                  <v-checkbox class="col-6 col-md-3" label="哨子" />
                  <v-checkbox class="col-6 col-md-3" label="號誌旗(燈)" />
                </v-row>
              </v-col>
              <v-col cols="12">
                <h4>(3)豎立工作鳴笛牌位置</h4>
                <v-text-field dense single-line outlined />
              </v-col>
              <v-col cols="12">
                <h4>(4)接地桿操作者安全配戴</h4>
                <v-row no3-gutter justify="space-around">
                  <v-checkbox class="col-12 col-md-4" label="絕緣手套" />
                  <v-checkbox class="col-12 col-md-4" label="羊皮手套" />
                  <v-checkbox class="col-12 col-md-4" label="安全皮鞋" />
                </v-row>
              </v-col>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 項目宣導 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12">
            <h3>勤前教育項目宣導</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-col cols="12">
                <h4>
                  1.未經現場負責人同意，禁止擅自進入路線內，
                  非作業需要禁止在軌道內行走或停留。
                </h4>
                <h4>
                  2.沿路線行進時，應面向列車行駛方向行走，並注意背面來車；
                  若聽列車鳴笛即刻避讓路線路肩。
                </h4>
                <h4>
                  3.遇有本線或鄰線列車駛近鳴笛或避車哨音時，應即刻停止工作，並呼喚同仁待避於工作路線路肩，
                  工作時若需穿越軌道，應確實停、看、聽，確認左、右無來車時迅速通過，不得冒進，以防遭車撞擊。
                </h4>
                <h4>
                  4.上班前及其上工期間嚴禁喝酒及飲用含酒精性飲料，違者當日應請假，不准上班，
                  並擇期離開工作崗位，防止影響他人工作情緒。
                </h4>
                <h4>5.身體不舒適或其他因素，致無法勝任當日工作者請提報，俾另派工作。</h4>
                <h4>
                  6.雙線區間避讓列車應在工作線之路肩或適當地點外側，
                  嚴禁避讓於兩線間或鄰線軌道上，單線區間，應避讓於路線兩側路肩。
                </h4>
                <h4>7.除夜間工作辦理路線封鎖外，白天在軌道上工作之前仍應至值班站長室辦理填寫保安維修單。</h4>
              </v-col>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 危害及預防項目 -->
        <v-col cols="6">
          <h3>可能發生危害及預防項目</h3>
          <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
            <v-col cols="12">
              <h4>(1)不安全環境及不安全動作預防</h4>
              <v-textarea auto-grow outlined rows="4" />

              <h4>(2)機具設備危害及預防</h4>
              <v-textarea auto-grow outlined rows="2" />

              <h4>(3)其他</h4>
              <v-textarea auto-grow outlined rows="1" />
            </v-col>
          </v-alert>
        </v-col>
        <!-- 自主檢查 -->
        <v-col cols="12" sm="6">
          <h3>自主檢查:即工作完成檢查</h3>
          <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <h4>工作項目</h4>
              <v-textarea auto-grow outlined rows="4" />
          </v-alert>
        </v-col>
        <!-- 工作人員 -->
        <v-col cols="12" sm="6">
          <h3>工作人員</h3>
          <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
            <v-textarea class="mt-4" auto-grow outlined rows="4" />
          </v-alert>
        </v-col>
        <!-- 備註 -->
        <v-col cols="12" sm="6">
          <h3>備註</h3>
          <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
            <v-textarea class="mt-4" auto-grow outlined rows="4" />
          </v-alert>
        </v-col>
        <!-- 送出 -->
        <v-col class="mt-2" cols="12">
          <v-btn large block class="mt-n8 mb-4" color="success">送出表單</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { maintainStatusOpts } from '@/assets/js/workList'
import { fetchFormOrderList, fetchFormOrderOne, createFormOrder, createFormOrder0 } from '@/apis/formManage/serve'
import { formDepartOptions } from '@/assets/js/departOption'

export default {
  data() {
    return {
      title: "鐵路維護科工作日誌",
      newText: "工作日誌",
      isLoading: false,
      disabled: false,
      // 自定義變數
      CheckdayOn: "",
      QueryCheckdayOn: "",
      CheckdayOff: "",
      formDepartOptions: [
        // 通報單位下拉選單
        { text: "", value: "" },
        ...formDepartOptions,
      ],
      QueryCheckdayOff: "",
      AddWorkLogModal: false,
      MaintenanceDay: "",
      Weather: ["晴天", "陰天", "雨天"],
      AddData: {
        // 新增表單資料
        MaintenanceDay: "", // 保養日
      },
      // 系統變數
      pageOpt: { page: 1 }, // 目前頁數
      headers: [
        {
          text: "項次",
          value: "Item",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "檢查日期",
          value: "Checkday",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "審查狀態",
          value: "Review",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "填寫人",
          value: "Name",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "功能",
          value: "Shop",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
      ],
      tableItems: [
        {
          Item: "1",
          Checkday: "2020-08-01",
          Review: "已審查",
          Name: "王大明",
        },
        {
          Item: "2",
          Checkday: "2020-08-10",
          Review: "審查中",
          Name: "王大明",
        },
      ],
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
  },
  methods: {
    initInput(){
      this.doMan.name = this.userData.UserName;
      this.zs = this.nowTime;
      var step;
      for (step = 0; step < 7; step++) {
        this.ipt.items[step].status = "0"
        this.ipt.items[step].note = ''
      }
      this.Advice = "";
      this.Measures = ""
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
      this.Add = true
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
    // 新增監工區塊欄位
    addSupervisor() {},
    // 搜尋
    search() {
    console.log("Search click");
      this.chLoadingShow()
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {'Column':'StartDayVlaue','Value':this._data.z},
          {"Column":"EndDayVlaue","Value":this._data.df},
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
          "FlowId"
        ],
      }).then(res => {
        let tbBuffer = JSON.parse(res.data.DT)
        let aa = this.unique(tbBuffer)
        this.tableItems = aa
      }).catch(err => {
        console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        console.log("search final")
        this.chLoadingShow()
      })},
    // 存
    save() {},
    // 關閉 dialogx
    closeWorkLogModal() {
      this.AddWorkLogModal = false;
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
          "DepartName",
          "Name",
          "CheckMan",
          "CheckOption1",
          "Memo_1",
          "CheckOption2",
          "Memo_2",
          "CheckOption3",
          "Memo_3",
          "Advice",
          "Measures",

        ],
      }).then(res => {
        this.initInput();
        console.log(res.data.DT)
        let dat = JSON.parse(res.data.DT)
        console.log("data name: " + dat[0].Name)
        console.log("data time: " + dat[0].CheckDay)
        this.Add = true
        // this.zs = res.data.DT.CheckDay
        this.doMan.name = dat[0].Name
        let time1 = dat[0].CheckDay.substr(0,10)
        console.log("data time1: " + time1)
        this.zs = time1
        console.log("doMan name: " + this.doMan.name)
        //123資料
        let ad = Object.keys(dat[0])
        console.log(ad)
        var i = 0, j = 0;
          for(let key of Object.keys(dat[0])){
            if(i > 3 && i < 52){
              if(i % 2 == 0){
                  this.ipt.items[j].status = (dat[0])[key]
              }
              else{
                this.ipt.items[j].note = (dat[0])[key]
                j++
              }
            }
            i++
          }
        this.memo_2 = dat[0].Advice
        this.memo_3 = dat[0].Measures
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
.iwidth {
  width: 65px;
}
.xwd {
  max-width: 13%;
}
@media only screen and (max-width: 600px) {
  .xwd {
    max-width: 100%;
  }
}
</style>