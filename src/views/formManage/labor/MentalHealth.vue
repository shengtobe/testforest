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
        <v-form ref="uploadform">
          <UploadOneFileAdd :TableKey="DB_Table" ref="upload" />
        </v-form>
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn dark large class="mb-sm-8 mb-md-8 btn-fileup" @click="select">
          <v-icon class="mr-1">mdi-cloud-upload</v-icon>上傳
        </v-btn>
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
    <v-col cols="12">
      <fileList :fileItems="fileItems" />
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
    <v-dialog v-model="Add" persistent max-width="680px" >
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
            <!-- <v-col cols="12">
              <p>1.依職業安全衛生法第23條及職業安全衛生管理辦法第50條規定辦理。</p>
              <p>2.缺點由使用單位自行改善，不克者委請設備商修護。</p>
            </v-col>-->
            <!-- 檢查項目 -->
            <v-col cols="12">
              <v-row no-gutter class="label-header">
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">填表日期</h3>
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
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">填表人</h3>
                  <v-text-field solo value readonly v-model="doMan.name"/>
                </v-col>
              </v-row>
              <v-alert
                dense
                border="top"
                colored-border
                color="border-bg-dark-yellow"
                elevation="4"
                v-for="(item, idx) in items"
                :key="idx"
                class="mb-6"
              >
                <v-row no-gutter>
                  <v-col cols="12" sm="4">{{ item.question }}</v-col>
                  <v-col cols="12" sm="7" style="white-space:pre-wrap">
                    <span class="d-sm-none label-header">回答：</span>
                    <v-radio-group dense row v-model="ipt.items[idx].status" class="pa-0 ma-0">
                      <v-radio color="success" label="沒有或極少(每週一天以下)" value="1"></v-radio>
                      <v-radio color="orange" label="有時(1~2天/週)" value="2"></v-radio>
                      <v-radio color="orange" label="時常 (3~4天/週)" value="3"></v-radio>
                      <v-radio color="orange" label="常常/總是(5~7天/週)" value="4"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-alert>
            </v-col>
            <!-- 顯示總分 -->
            <v-col cols="12" sm="12">
              <!-- <v-text-field v-model="PersonalFatigueTotal">
                <span slot="prepend" >分數:</span>
              </v-text-field>-->
              <v-toolbar color="gradual-bg-darken-wood" dark >
                <v-toolbar-title style="width:40%; text-align:center">分數</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field flat v-model="PersonalFatigueTotal" readonly style="margin-top:30px;">
                  <span slot="append">分</span>
                </v-text-field>
              </v-toolbar>
            </v-col>
            <!-- 分數解釋 -->
            <v-col cols="13" sm="12">
              <v-toolbar color="gradual-bg-darken-wood" dark>
                <v-spacer />
                <v-toolbar-title>分數解釋</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
            </v-col>
            <v-col cols="12">
              <v-row no-gutter class="label-header d-none d-sm-flex font-weight-black">
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">分數</h3>
                </v-col>
                <v-col cols="12" sm="8">
                  <h3 class="mb-1">解釋</h3>
                </v-col>
              </v-row>
              <v-alert
                dense
                border="top"
                colored-border
                color="border-bg-dark-yellow"
                elevation="4"
                v-for="(item, idx) in score1"
                :key="idx"
                class="mb-6"
              >
                <v-row no-gutter>
                  <v-col cols="12" sm="4">{{ item.question }}</v-col>
                  <v-col cols="12" sm="8">{{ item.checkContent }}</v-col>
                </v-row>
              </v-alert>
            </v-col>
            <v-col cols="12">
              <b>※您是否同意檢附量表分數，以作為後續健康風險評估之用途?</b>
            </v-col>
            <v-col cols="12" sm="7">
              <span class="d-sm-none label-header">回答：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items[18].status">
                <v-radio color="success" label="同意" value="1"></v-radio>
                <v-radio color="red" label="不同意" value="2"></v-radio>
              </v-radio-group>
            </v-col>
            <!-- <v-col cols="12">
              <h3 class="mb-1 indigo--text">同意人</h3>
              <v-textarea auto-grow outlined rows="1" v-model.trim="ipt.suggest"></v-textarea>
            </v-col> -->
            <!-- END 檢查項目 -->
          </v-row>
        </div>
        <!-- <v-card-actions class="px-5 pb-5">
          <v-spacer></v-spacer>
          <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
          <v-btn color="success" elevation="4" :loading="isLoading" @click="save">送出</v-btn>
        </v-card-actions> -->
        <v-card-actions class="px-5 pb-5">
          <v-btn
            v-if="action != actions.add"
            elevation="4"
            class="mr-2 btn-delete white--text"
            @click="deleteRecord"
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
import UploadOneFileAdd from '@/components/UploadOneFileAdd.vue';
import { fetchFormOrderList, fetchFormOrderOne, createFormOrder, createFormOrder0, updateFormOrder } from '@/apis/formManage/serve'
import { formDepartOptions } from '@/assets/js/departOption'
import { Actions } from "@/assets/js/actions";
import { Constrant } from "@/assets/js/constrant";
import dialogDelete from "@/components/forManage/dialogDelete";
import ToolBar from "@/components/forManage/toolbar";
import fileList from "@/components/forManage/fileList";
export default {
  data() {
    return {
      title:"心理健康量表",
      newText:"",
      file: null,
      action: Actions.add,
      actions: Actions,
      isLoading: false,
      disabled: false,
      ss: "",
      a: "",
      ass: "",
      z: "",
      zs: "",
      q: "",
      df: "",
      s: "",
      qz: "",
      wx: "",
      formDepartOptions: [
        // 通報單位下拉選單
        { text: "不限", value: "" },
        ...formDepartOptions,
      ],
      pp: "",
      oo: "",
      ii: "",
      uu: "",
      yy: "",
      // controls for dialog
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
      DB_Table: "RP093",
      RPFlowNo: "",
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
      fileItems: [],
      //------
      ipt: {
        // department: "",
        // name: JSON.parse(localStorage.getItem("user")).name,
        // date: new Date().toISOString().substr(0, 10),
        items: [
          { status: 0},
          { status: 0},
          { status: 0},
          { status: 0},
          { status: 0},
          { status: 0},
          { status: 0},
          { status: 0},
          { status: 0},
          { status: 0},
          { status: 0},
          { status: 0},
          { status: 0},
          { status: 0},
          { status: 0},
          { status: 0},
          { status: 0},
          { status: 0},
          { status: 0},
          { status: 0},
          { status: 0},
          { status: 0},
        ],
        score1: [
          { status: 1, note: "" },
          { status: 1, note: "" },
          { status: 1, note: "" },
          { status: 1, note: "" },
        ],
      },
      items: [
        { question: "1. 我常常覺得想哭" },
        { question: "2. 我覺得心情不好" },
        { question: "3. 我覺得比以前容易發脾氣" },
        { question: "4. 我睡不好" },
        { question: "5. 我覺得不想吃東西" },
        { question: "6. 我覺得胸口悶悶的" },
        { question: "7. 我覺得不輕鬆、不舒服" },
        { question: "8. 我覺得身體疲勞虛弱無力" },
        { question: "9. 我覺得很煩" },
        { question: "10. 我覺得記憶力不好" },
        { question: "11. 我覺得做事時無法專心" },
        { question: "12. 我覺得想事情或做事時比平常要緩慢" },
        { question: "13. 我覺得比以前沒信心" },
        { question: "14. 我覺得比較會往壞處想" },
        { question: "15. 我覺得想不開，甚至想死" },
        { question: "16. 我覺得對什麼事都失去興趣" },
        { question: "17. 我覺得身體不舒服" },
        { question: "18. 我覺得自己很沒用" },
      ],
      score1: [
        { question: "8 分以下", checkContent: "情緒穩定" },
        {
          question: "9 ~ 14 分",
          checkContent: "情緒較不穩定、多注意情緒變化，多給自己關心",
        },
        {
          question: "15 ~ 18 分",
          checkContent: "壓力負荷已到極點，需要找朋友交談、舒緩情緒",
        },
        { question: "19 分以上", checkContent: "必須找專業醫療單位協助" },
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
    UploadOneFileAdd,
    fileList
  },
  computed: {
    ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    PersonalFatigueTotal() {
      var total = 0;
      for (let index = 0; index < this.ipt.items.length; index++) {
        if (Number(this.ipt.items[index].status) > 0) {
          total += Number(this.ipt.items[index].status) - 1;
        } else {
          total += Number(this.ipt.items[index].status);
        }
      }
      if (total < 0) total = 0;
      return total;
    },
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
    select() {
      this.$refs.upload.uploadFile()
    },
    initInput(){
      this.doMan.name = this.userData.UserName;
      this.zs = this.nowTime;
      var step;
      for (let index = 0; index < this.ipt.items.length; index++) {
        this.ipt.items[index].status = 0;
        this.ipt.items[index].note = '';
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
      "chMsgbar", // messageBar
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
      let d1 = Date.parse(this.formData.searchItem.dateStart)
      let d2 = Date.parse(this.formData.searchItem.dateEnd)
      if(d1 > d2){
        alert('時間範圍錯誤')
        return
      }
      this.chLoadingShow({show:true})
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {'Column':'StartDayVlaue','Value':this.formData.searchItem.dateStart},
          {"Column":"EndDayVlaue","Value":this.formData.searchItem.dateEnd},
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
          "FlowId", 
          "DepartName"
        ],
      }).then(res => {
        let tbBuffer = JSON.parse(res.data.DT)
        let aa = unique(tbBuffer)
        this.tableItems = aa
        this.fileItems = res.data.FileCount||[];
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
      for (i = 0; i < 19; i++) {
        obj = new Object()
        obj.Column = "CheckOption" + (i+1)
        obj.Value = this.ipt.items[i].status
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
         this.chMsgbar({ success: true, msg: Constrant.insert.success });
        }).catch(err => {
          this.chMsgbar({ success: true, msg: Constrant.insert.failed });
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
           this.chMsgbar({ success: true, msg: Constrant.update.success });
        }).catch(err => {
          this.chMsgbar({ success: true, msg: Constrant.update.failed });
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
          "DepartName",
          "Name",//2
          "CheckMan",
          "CheckOption1",//4
          "CheckOption2",
          "CheckOption3",
          "CheckOption4",
          "CheckOption5",
          "CheckOption6",
          "CheckOption7",
          "CheckOption8",
          "CheckOption9",
          "CheckOption10",
          "CheckOption11",
          "CheckOption12",
          "CheckOption13",
          "CheckOption14",
          "CheckOption15",
          "CheckOption16",
          "CheckOption17",
          "CheckOption18",
          "CheckOption19",//22
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
        let ad = Object.keys(dat[0])
        var i = 0, j = 0;
          for(let key of Object.keys(dat[0])){
            if(i >= 4 && i <= 22){
              this.ipt.items[j].status = (dat[0])[key]
              j++;
            }
            i++
          }
        
      }).catch(err => {
        //console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow({show:false})
      })
    },//viewPage
    deleteRecord(RPFlowNo) {
      this.dialogDel = true;
      this.DelDynamicKey += 1;
      this.RPFlowNo = RPFlowNo;
    },
    Add() {
    },
  },
};
</script>
<style>
.v-input--radio-group__input {
  display: block;
}
/* .theme--dark.v-text-field--solo > .v-input__control > .v-input__slot{
  background: transparent;
  margin-top: 30px;
} */
/* .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot {
  -webkit-box-shadow: none;
  box-shadow: none;
} */
</style>