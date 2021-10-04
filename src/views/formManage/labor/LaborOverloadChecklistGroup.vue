<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2 label-title">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2 label-header">
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="檢查日期(起)"
          key="dateStart"
          :showIcon="formData.settings.formIconShow"
          v-model="formData.searchItem.dateStart"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="檢查日期(迄)"
          key="dateEnd"
          :showIcon="formData.settings.formIconShow"
          v-model="formData.searchItem.dateEnd"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <deptSelect
          label="管理單位"
          v-model="formData.searchItem.department"
          :showIcon="formData.settings.formIconShow"
          outType="key"
          key="department"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3"></v-col>

      <v-col cols="12" sm="3" md="3">
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
      </v-col>
    </v-row>
    <ToolBar @search="search" @reset="reset" @newOne="newOne" :text="newText" />
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
          class="theme-table"
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
              class="mr-2 btn-memo"
              small
              dark
              fab
              @click="viewPage(item)"
            >
              <v-icon dark>mdi-pen</v-icon>
            </v-btn>
            <v-btn
              title="刪除"
              small
              dark
              fab
              class="btn-delete"
              @click="deleteRecord(item.RPFlowNo)"
            >
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
    <!-- 刪除確認視窗 -->
    <v-dialog v-model="dialogDel" persistent max-width="290">
      <dialogDelete
        :id="userData.UserId"
        :DB_Table="DB_Table"
        :RPFlowNo="RPFlowNo"
        :key="'d' + DelDynamicKey"
        @search="search"
        @close="close"
        @cancel="closeDialogDel"
      />
    </v-dialog>
    <!-- 新增自動檢點表 modal -->
    <v-dialog v-model="Add" persistent max-width="900px">
      <v-card class="theme-card">
        <v-card-title class="white--text px-4 py-1">
          新增{{ title }}
          <v-spacer></v-spacer>
          <v-btn dark fab small text @click="close" class="mr-n2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <div class="px-6 py-4">
          <v-row>
            <!-- 檢查項目 -->
            <v-col cols="12">
              <v-row no-gutter class="label-header">
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">檢核日期</h3>
                  <v-menu
                    v-model="ass"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model.trim="zs" solo v-on="on" readonly></v-text-field>
                    </template>
                    <v-date-picker color="primary" v-model="zs" @input="ass = false" locale="zh-tw"></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-expansion-panels :disabled="disabled" multiple>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">
                    一、作業場所定期健檢的分析與管理
                    <template v-slot:actions>
                      <v-icon color="dropdownicon">
                        $expand
                      </v-icon>
                    </template>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row
                      no-gutter
                      class="label-header d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢核項目</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">查檢結果</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">備註</h3>
                      </v-col>
                    </v-row>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="border-bg-dark-yellow"
                      elevation="4"
                      v-for="(item, idx) in items1"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="4">{{ item.question }}</v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none label-header">檢查結果：</span>
                          <v-textarea auto-grow outlined rows="2" v-model="ipt.items[idx].status">
                            <span slot="append">%</span>
                          </v-textarea>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none label-header">備註：</span>
                          <v-textarea auto-grow outlined rows="2" v-model="ipt.items[idx].note">
                          </v-textarea>
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">
                    二、職場健康促進計畫之擬訂推動與評量
                    <template v-slot:actions>
                      <v-icon color="dropdownicon">
                        $expand
                      </v-icon>
                    </template>
                    </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row
                      no-gutter
                      class="label-header d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢核項目</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">查檢結果</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">備註</h3>
                      </v-col>
                    </v-row>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="border-bg-dark-yellow"
                      elevation="4"
                      v-for="(item, idx) in items2"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="4">{{ item.question }}</v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none label-header">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items2[idx].status"
                            class="pa-0 ma-0">
                            <v-radio color="success" label="是" value="1"></v-radio>
                            <v-radio color="red" label="否" value="2"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none label-header">備註：</span>
                          <v-textarea auto-grow outlined rows="2" v-model="ipt.items2[idx].note">
                          </v-textarea>
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
            <!-- 改善建議、改善追蹤 -->
            
            <!-- END 檢查項目 -->
          </v-row>
        </div>
        <v-card-actions class="px-5 pb-5">
          <v-btn
            v-if="action != actions.add"
            elevation="4"
            class="mr-2 btn-delete white--text"
            @click="deleteRecord(RPFlowNo)"
            >刪除</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn class="mr-2 btn-close white--text" elevation="4" @click="close">取消</v-btn>
          <v-btn
            class="btn-add white--text"
            elevation="4"
            @click="save"
            >送出</v-btn
          >
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
import dateSelect from "@/components/forManage/dateSelect";
import deptSelect from "@/components/forManage/deptSelect";
import { fetchFormOrderList, fetchFormOrderOne, createFormOrder, createFormOrder0, updateFormOrder } from '@/apis/formManage/serve'
import { formDepartOptions } from '@/assets/js/departOption'
import { Actions } from "@/assets/js/actions";
import dialogDelete from "@/components/forManage/dialogDelete";
import ToolBar from "@/components/forManage/toolbar";

export default {
  data() {
    return {
      title:"過負荷作業防護計畫檢核表（群體部分）",
      newText:"檢核表",
      action: Actions.add,
      actions: Actions,
      isLoading: false,
      disabled: false,
      a: "",
      ass: "",
      z: "",
      zs: "",
      q: "",
      df: "",
      formDepartOptions: [
        // 通報單位下拉選單
        { text: "不限", value: "" },
        ...formDepartOptions,
      ],
      s: "",
      qz: "",
      wx: "",
      pp: "",
      oo: "",
      ii: "",
      uu: "",
      yy: "",
      ShowDetailDialog: false,
      dialogDel: false, // model off
      Add: false,
      dialog3: false,
      formData: {
        settings: {
          formIconShow: true,
        },
        searchItem: {
          dateStart: "",
          dateEnd: "",
          department: "",
        },
      },
      editType: "",
      editItem: {},
      DynamicKey: 0,
      DelDynamicKey: 0,
      pageOpt: { page: 1 }, // 目前頁數
      //---api---
      DB_Table: "RP091",
      nowTime: "",
      doMan:{
        id: '',
        name: '',
        depart: '',
        checkManName: ''
      },
      ipt2: {},
      defaultIpt: {  // 預設的欄位值
          startDay: '',
          EndDay: '',
          depart: '',  // 單位
        },
      headers: [
        // 表格顯示的欄位 DepartCode ID Name
        { text: "項次", value: "ItemNo", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "保養日期", value: "CheckDay", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        // { text: "審查狀態", value: "CheckStatus", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "填寫人", value: "Name", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "保養單位", value: "DepartName", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "功能", value: "content", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
      ],
      tableItems: [],
      //------
      ipt: {
        // department: "",
        // name: JSON.parse(localStorage.getItem("user")).name,
        // date: new Date().toISOString().substr(0, 10),
        items: [
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
        ],
        items2: [
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
        ],
      },
      items1: [
        //作業場所定期健檢的分析與管理
        { question: "1. 定期健檢診斷實施率" },
        { question: "2. 定期健檢診斷受檢率" },
        { question: "3. 健檢異常發現比率" },
        { question: "4. 高血壓的比率" },
        { question: "5. 高血脂的比率" },
        { question: "6. 高血糖的比率" },
      ],
      items2: [
        //職場健康促進計畫之擬訂推動與評量
        { question: "1. 實行定期健康檢查／特殊健康檢查" },
        { question: "2. 定期健檢／特殊健康後的管理措施" },
        { question: "3. 實施三高風險勞工精密健檢" },
        { question: "4. 醫療設施與人員的充實整備" },
        { question: "5. 長時間（超時）勞工接受專業醫療人員諮詢與諮詢後的具體改善作為" },
        { question: "6. 實行職場健康促進活動" },
        { question: "7. 職場環境改善與整備" },
        { question: "8. 員工體能強化對策" },
        { question: "9. 員工健康教育與諮詢指導" },
        { question: "10. 職業衛生人員的在職教育" },
        { question: "11. 員工心理健康問題的評估與對策" },
        { question: "12. 針對中、高齡員工的健康對策" },
        { question: "13. 職場禁煙" },
        { question: "14. 女性員工過負荷保護" },
      ],
      suggest: "", // 改善建議
    };
  },
  components: {
    Pagination, // 頁碼
    dateSelect,
    deptSelect,
    ToolBar,
    dialogDelete,
  },
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
      this.zs = this.nowTime;
      var step;
      for (step = 0; step < 14; step++) {
        if(step < 6){
        this.ipt.items[step].status = "0"
        this.ipt.items[step].note = ''
        }
        this.ipt.items2[step].status = "0"
        this.ipt.items2[step].note = ''
      }
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
     
      this.Add = true
      this.action = Actions.add
      this.initInput();
    },
    ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        reset() {
      this.formData.searchItem.dateStart = "";
      this.formData.searchItem.dateEnd = "";
      this.formData.searchItem.department = "";
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 搜尋
    search() {
      
      this.chLoadingShow({show:true})
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {'Column':'StartDayVlaue','Value':this.formData.searchItem.dateStart},
          {"Column":"EndDayVlaue","Value":this.formData.searchItem.dateEnd},
          {"Column":"DepartCode","Value":this.formData.searchItem.department},
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
        //console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow({show:false})
      })
    },
    // 存
    save() {
      
      this.chLoadingShow({show:true})

      let arr = new Array()
      let obj = new Object()

      obj = new Object()
      obj.Column = "CheckDay"
      obj.Value = this.zs
      arr = arr.concat(obj)               

      let i;
      for (i = 0; i < 20; i++) {
        obj = new Object()
        obj.Column = "CheckOption" + (i+1)
        if(i < 6){
          obj.Value = this.ipt.items[i].status
        }
        else{
          obj.Value = this.ipt.items2[i-6].status
        }
        arr = arr.concat(obj)
      }
      for (i = 0; i < 20; i++) {
        obj = new Object()
        obj.Column = "Memo" + (i+1)
        if(i < 6){
          obj.Value = this.ipt.items[i].note
        }
        else{
          obj.Value = this.ipt.items2[i-6].note
        }
        arr = arr.concat(obj)
      }

      if (this.action == Actions.add){
        //-----新增-----
        createFormOrder0({
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id this.doMan.name = this.userData.UserName
          // OperatorID: "16713",  // 操作人id
          KeyName: this.DB_Table,  // DB table
          KeyItem:arr,
        }).then(res => {
         
        }).catch(err => {
          //console.log(err)
          alert('查詢時發生問題，請重新查詢!')
        }).finally(() => {
          this.chLoadingShow({show:false})
        })
      }
      else{
        //-----編輯-----
        updateFormOrder({
          ClientReqTime: getNowFullTime(), // client 端請求時間
          OperatorID: this.userData.UserId, // 操作人id
          RPFlowNo: this.RPFlowNo,
          // FunCode: "U",
          KeyName: this.DB_Table, // DB table
          KeyItem: arr,
        })
          .then((res) => {
           
          })
          .catch((err) => {
            ////console.log(err);
            // this.chMsgbar({ success: false, msg: Constrant.update.failed });
            alert('查詢時發生問題，請重新查詢!')
          })
          .finally(() => {
            this.chLoadingShow({show:false})
          });
      }
      this.Add = false;
    },
    // 關閉刪除確認dialod
    closeDialogDel() {
      this.dialogDel = false;
    },
    // 關閉 dialog
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
      this.RPFlowNo = item.RPFlowNo
      this.action = Actions.edit
      this.chLoadingShow({show:true})
        // 依業主要求變更檢式頁面的方式，所以改為另開分頁
        fetchFormOrderOne({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {'Column':'RPFlowNo','Value':item.RPFlowNo},
                ],
        QyName:[
          "CheckDay",//0
          "DepartName",//1
          "Name",//2
          "CheckMan",//3
          "CheckOption1",//4
          "Memo1",//5
          "CheckOption2",//6
          "Memo2",//7
          "CheckOption3",//8
          "Memo3",//9
          "CheckOption4",//10
          "Memo4",//11
          "CheckOption5",//12
          "Memo5",//13
          "CheckOption6",//14
          "Memo6",//15
          "CheckOption7",//16
          "Memo7",//17
          "CheckOption8",//18
          "Memo8",//19
          "CheckOption9",//20
          "Memo9",//21
          "CheckOption10",//22
          "Memo10",//23
          "CheckOption11",//24
          "Memo11",//25
          "CheckOption12",//26
          "Memo12",//27
          "CheckOption13",//28
          "Memo13",//29
          "CheckOption14",//30
          "Memo14",//31
          "CheckOption15",//32
          "Memo15",//33
          "CheckOption16",//34
          "Memo16",//35
          "CheckOption17",//36
          "Memo17",//37
          "CheckOption18",//38
          "Memo18",//39
          "CheckOption19",//40
          "Memo19",//41
          "CheckOption20",//42
          "Memo20",//43
        ],
      }).then(res => {
        this.initInput();
       
        let dat = JSON.parse(res.data.DT)
        this.Add = true
        // this.zs = res.data.DT.CheckDay
        this.doMan.name = dat[0].Name
        let time1 = dat[0].CheckDay.substr(0,10)
        this.zs = time1
        //123資料
        var i = 0, j = 0;
        for (let key of Object.keys(dat[0])) {
          if(i >= 4 && i <= 43){
            if(i <= 15){
              if(i % 2 == 0){
                this.ipt.items[j].status = (dat[0])[key]
              }
              else{
                this.ipt.items[j].note = (dat[0])[key]
                j++
              }
            }
            else{
              if(i == 16) j = 0;
              if(i % 2 == 0){
                this.ipt.items2[j].status = (dat[0])[key]
              }
              else{
                this.ipt.items2[j].note = (dat[0])[key]
                j++
              }
            }
          }
          i++
        }

        
      }).catch(err => {
        //console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow({ show: false})
      })
    },//viewPage
    deleteRecord(RPFlowNo) {
      this.dialogDel = true;
      this.DelDynamicKey += 1;
      this.RPFlowNo = RPFlowNo;
    },
  },
};
</script>
