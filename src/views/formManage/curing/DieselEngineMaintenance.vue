<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2">
      <!-- 保養日期起迄 -->
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>保養日期(起)
        </h3>
        <v-menu
          v-model="dateMenuShow.start"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="ipt.dateStart" solo v-on="on" readonly></v-text-field>
          </template>
          <v-date-picker
            color="purple"
            v-model="ipt.dateStart"
            @input="dateMenuShow.start = false"
            locale="zh-tw"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>保養日期(迄)
        </h3>
        <v-menu
          v-model="dateMemuShow.end"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="ipt.dateEnd" solo v-on="on" readonly></v-text-field>
          </template>
          <v-date-picker
            color="purple"
            v-model="ipt.dateEnd"
            @input="dateMemuShow.end = false"
            locale="zh-tw"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <div class="col-sm-4 col-md-8 col-12">
        <v-btn color="green" dark large class="col-4 col-md-2 mr-3">
          <v-icon>mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn
          color="indigo"
          elevation="3"
          dark
          large
          class="col-4 col-md-2 mr-3"
          @click="dialogShowAdd = true"
        >
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </div>
      <!-- 新增保養資料 modal -->
      <v-dialog v-model="dialogShowAdd" max-width="600px">
        <v-card>
          <v-card-title class="blue white--text px-4 py-1">
            新增{{ title }}
            <v-spacer></v-spacer>
            <v-btn dark fab small text @click="close" class="mr-n2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <div class="px-6 py-4">
            <v-row>
              <!-- 保養日期 -->
              <v-col cols="8" sm="4">
                <v-menu
                  v-model="dialogDateMenuShow.enter"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field hide-details v-model="addItem.enterDate" v-on="on" label="保養日期"></v-text-field>
                  </template>
                  <v-date-picker
                    color="purple"
                    v-model="addItem.enterDate"
                    @input="dialogDateMenuShow.enter = false"
                    locale="zh-tw"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <!-- 公里 -->
              <v-col cols="8" sm="4">
                <v-text-field v-model="addItem.Kilometer" :rules="nameRules" label="公里數" required></v-text-field>
              </v-col>
              <!-- 保養人 -->
              <v-col cols="8" sm="4">
                <v-text-field hide-details v-model="addItem.user" label="保養人"></v-text-field>
              </v-col>
              <!-- 保養項目 -->
              <v-col cols="8" sm="12">
                <v-subheader style="margin-left: -16px !important; margin-bottom: -25px;">保養項目</v-subheader>
                <div class="pa-0">
                  <v-row justify="space-around">
                    <v-checkbox class="mx-2" v-model="aa" label="機油濾清器" value="A"></v-checkbox>
                    <v-checkbox class="mx-2" v-model="bb" label="柴油濾清器" value="B"></v-checkbox>
                    <v-checkbox class="mx-2" v-model="cc" label="水泵濾清器" value="C"></v-checkbox>
                  </v-row>
                </div>
              </v-col>
              <!-- 備註 -->
              <v-col cols="12">
                <v-textarea
                  hide-details
                  label="備註"
                  auto-grow
                  outlined
                  rows="6"
                  v-model.trim="addItem.content"
                ></v-textarea>
              </v-col>
            </v-row>
          </div>

          <v-card-actions class="px-5 pb-5">
            <v-spacer></v-spacer>
            <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
            <v-btn color="success" elevation="4" :loading="isLoading" @click="save">送出</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 修改保養資料 modal -->
      <v-dialog v-model="dialogShowEdit" max-width="600px">
        <v-card>
          <v-card-title class="blue white--text px-4 py-1">
            修改{{ newText }}
            <v-spacer></v-spacer>
            <v-btn dark fab small text @click="close" class="mr-n2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <div class="px-6 py-4">
            <v-row>
              <!-- 保養日期 -->
              <v-col cols="8" sm="4">
                <v-menu
                  v-model="dialogDateMenuShow.enter"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      hide-details
                      v-model="editedItem.enterDate"
                      v-on="on"
                      label="保養日期"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    color="purple"
                    v-model="editedItem.enterDate"
                    @input="dialogDateMenuShow.enter = false"
                    locale="zh-tw"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <!-- 公里 -->
              <v-col cols="8" sm="4">
                <v-text-field
                  v-model="editedItem.Kilometer"
                  :rules="nameRules"
                  label="公里數"
                  required
                ></v-text-field>
              </v-col>
              <!-- 保養人 -->
              <v-col cols="8" sm="4">
                <v-text-field hide-details v-model="editedItem.user" label="保養人"></v-text-field>
              </v-col>
              <!-- 保養項目 -->
              <v-col cols="8" sm="12">
                <div class="pa-0">
                  <v-subheader style="margin-left: -16px !important; margin-bottom: -25px;">保養項目</v-subheader>
                  <v-row justify="space-around">
                    <v-checkbox class="mx-2" v-model="aa" label="機油濾清器" value="A"></v-checkbox>
                    <v-checkbox class="mx-2" v-model="bb" label="柴油濾清器" value="B"></v-checkbox>
                    <v-checkbox class="mx-2" v-model="cc" label="水泵濾清器" value="C"></v-checkbox>
                  </v-row>
                </div>
              </v-col>
              <!-- 備註 -->
              <v-col cols="12">
                <v-textarea
                  hide-details
                  label="備註"
                  auto-grow
                  outlined
                  rows="6"
                  v-model.trim="editedItem.content"
                ></v-textarea>
              </v-col>
            </v-row>
          </div>
          <v-card-actions class="px-5 pb-5">
            <v-spacer></v-spacer>
            <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
            <v-btn color="success" elevation="4" :loading="isLoading" @click="save">送出</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--  -->
      <v-dialog v-model="dialogDel" scrollable max-width="300px">
        <v-card>
          <v-card-title class="error white--text px-4 py-1">確認是否刪除!</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 300px;">
            <v-radio-group v-model="dialogm1" column></v-radio-group>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="darken-1" text @click="close">取消</v-btn>
            <v-btn color="error darken-1" text @click="dialogDel = false">刪除</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
              title="編輯"
              class="mr-2"
              small
              dark
              fab
              color="info darken-1"
              @click="viewPage(item)"
            >
              <!-- @click="dialogShowEdit = true" -->
              <v-icon dark>mdi-pen</v-icon>
            </v-btn>
            <v-btn title="刪除" small dark fab color="red" @click="dialogDel = true">
              <v-icon dark>mdi-delete</v-icon>
            </v-btn>
          </template>

          <!-- 頁碼 -->
          <template v-slot:footer="footer">
            <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import { evtTypes, locationOpts } from "@/assets/js/smisData";
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { maintainStatusOpts } from '@/assets/js/workList'
import { fetchFormOrderList, fetchFormOrderOne, createFormOrder, createFormOrder0 } from '@/apis/formManage/serve'

export default {
  data: () => ({
    title:"柴油引擎保養",
    newText:"保養資料",
    isLoading: false,
    disabled: false,
    ipt: {
      dateStart: new Date().toISOString().substr(0, 10), // 通報日期(起)
      dateEnd: new Date().toISOString().substr(0, 10) // 通報日期(迄)
    },
    dateMemuShow: {
      // 日曆是否顯示
      start: false,
      end: false
    },
    evtTypeOpts: evtTypes,
    locationOpts: locationOpts,
    dateMenuShow: false, // 日曆是否顯示
    dialogDateMenuShow: {
      // dialog 日期 menu 是否顯示
      enter: false,
      out: false
    },
    editedItem: {
      Kilometer: 12044.3,
      enterDate: "2020-08-10",
      content: "更換引擎機油", // 維修項目
      user: "王大明"
    },
    addItem: {
      Kilometer: null,
      enterDate: "",
      content: "", // 維修項目
      user: ""
    },
    defaultItem: {
      Kilometer: 0,
      enterDate: "2020-08-10",
      content: "", // 維修項目
      user: ""
    },
    nameRules: [
      v => !!v || "公里數必須填寫",
      v => v.length > 0 || "公里數必須大於0"
    ],
    dialogForm: {},
    mainLocation: "", // 所選的地點
    OLocation: "", // 其他地點
    dialogShowAdd: false, // model off
    dialogShowEdit: false, // model off
    dialogDel: false, // model off
    dialogm1: "2020-08-01",
    aa: "",
    bb: "",
    cc: "",
    tableItems: [
      {
        date: "2020/08/01",
        kilometer: "12044.3",
        engine_oil: "V",
        diesel_oil: "V",
        water_pump: "V",
        name: "王大明",
        note: "更換引擎機油"
      },
      {
        date: "2020/08/05",
        kilometer: "43000",
        engine_oil: "V",
        diesel_oil: "V",
        water_pump: "V",
        name: "王大明",
        note: "三級保養更換"
      },
      {
        date: "2020/08/05",
        kilometer: "43000",
        engine_oil: "V",
        diesel_oil: "V",
        water_pump: "V",
        name: "王大明",
        note: "三級保養更換"
      },
      {
        date: "2020/08/05",
        kilometer: "43000",
        engine_oil: "V",
        diesel_oil: "V",
        water_pump: "V",
        name: "王大明",
        note: "三級保養更換"
      },
      {
        date: "2020/08/05",
        kilometer: "43000",
        engine_oil: "V",
        diesel_oil: "V",
        water_pump: "V",
        name: "王大明",
        note: "三級保養更換"
      },
      {
        date: "2020/08/05",
        kilometer: "43000",
        engine_oil: "V",
        diesel_oil: "V",
        water_pump: "V",
        name: "王大明",
        note: "三級保養更換"
      },
      {
        date: "2020/08/05",
        kilometer: "43000",
        engine_oil: "V",
        diesel_oil: "V",
        water_pump: "V",
        name: "王大明",
        note: "三級保養更換"
      },
      {
        date: "2020/08/05",
        kilometer: "43000",
        engine_oil: "V",
        diesel_oil: "V",
        water_pump: "V",
        name: "王大明",
        note: "三級保養更換"
      },
      {
        date: "2020/08/05",
        kilometer: "43000",
        engine_oil: "V",
        diesel_oil: "V",
        water_pump: "V",
        name: "王大明",
        note: "三級保養更換"
      },
      {
        date: "2020/08/05",
        kilometer: "43000",
        engine_oil: "V",
        diesel_oil: "V",
        water_pump: "V",
        name: "王大明",
        note: "三級保養更換"
      },
      {
        date: "2020/08/05",
        kilometer: "43000",
        engine_oil: "V",
        diesel_oil: "V",
        water_pump: "V",
        name: "王大明",
        note: "三級保養更換"
      },
      {
        date: "2020/08/05",
        kilometer: "43000",
        engine_oil: "V",
        diesel_oil: "V",
        water_pump: "V",
        name: "王大明",
        note: "三級保養更換"
      },
      {
        date: "2020/08/05",
        kilometer: "43000",
        engine_oil: "V",
        diesel_oil: "V",
        water_pump: "V",
        name: "王大明",
        note: "三級保養更換"
      },
      {
        date: "2020/08/05",
        kilometer: "43000",
        engine_oil: "V",
        diesel_oil: "V",
        water_pump: "V",
        name: "王大明",
        note: "三級保養更換"
      },
      {
        date: "2020/08/05",
        kilometer: "43000",
        engine_oil: "V",
        diesel_oil: "V",
        water_pump: "V",
        name: "王大明",
        note: "三級保養更換"
      },
      {
        date: "2020/08/05",
        kilometer: "43000",
        engine_oil: "V",
        diesel_oil: "V",
        water_pump: "V",
        name: "王大明",
        note: "三級保養更換"
      }
    ], // 表格資料
    pageOpt: { page: 1 }, // 目前頁數
    headers: [
      // 表格顯示的欄位
      {
        text: "保養日期",
        value: "date",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "公里",
        value: "kilometer",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "機油濾清器",
        value: "engine_oil",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "柴油濾清器",
        value: "diesel_oil",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "水泵濾清器",
        value: "water_pump",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "保養人",
        value: "name",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "備註",
        value: "note",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      },
      {
        text: "功能",
        value: "shop",
        align: "center",
        divider: true,
        class: "subtitle-1 white--text font-weight-bold light-blue darken-1"
      }
    ]
  }),
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
    // 更新資料
    update() {
      this.$emit("chLocation", {});
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
      })
    },
    // 存
    save() {},
    // 關閉 dialog
    close() {
      this.dialogShowAdd = false;
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
  }
};
</script>