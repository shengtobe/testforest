
<template>
<!-- ------------加變數設定v-model只設到18-下次要從18-1開始加變數----------- -->
  <v-sheet class="ma-4 mb-8" color="yellow lighten-2">
    <v-container style="max-width: 1200px" class="px-8">
      <p class="font-weight-black title text-center">新增{{ newText }}</p>
      <v-row class="white px-4">
        <!-- 基本資料 -->
        <v-row no-gutter class="label-header">
          <v-col cols="12" sm="3">
            <dateSelect
            label="評估日期"
            key="checkDate"
            v-model="zs"
          />
          </v-col>
        </v-row>
        <!-- 選擇顯示項目 -->
        <v-col cols="12" sm="12">
          <h3 class="label-header">請選擇區段</h3>
        </v-col>
        
          <v-radio-group style="margin-top: -5px" v-model="valShow" row >
            <v-tooltip bottom v-for="(item, idx) in loc" :key="'vs'+idx">
              <template v-slot:activator="{ on }" >
                <span v-on="on">
                  <v-radio  :value="item.title" @click="initInput">
                    <template v-slot:label>
                      <h4 >{{ item.title}}</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>{{ item.section }}</span>
            </v-tooltip>
          </v-radio-group>
        </v-row>

        <!-- 軌段檢查 -->
        <v-row no-gutter class="label-header" v-if="checkShow">
          <v-col cols="12" sm="12">
            <h3>{{ showTitle }}</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa" v-if="loc.find(e => e.title == valShow).items.includes('1')">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col v-else/>
                    <v-col class="aa" v-if="loc.find(e => e.title == valShow).items.includes('2')">
                      <h3 class="mb-1">接收器</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col v-else/>
                    <v-col class="aa" v-if="loc.find(e => e.title == valShow).items.includes('3')">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col v-else/>
                    <v-col class="aa" v-if="loc.find(e => e.title == valShow).items.includes('4')">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col v-else/>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" style="margin-top: -50px">
                  <v-row no-gutter>
                    <v-col class="aa" v-if="loc.find(e => e.title == valShow).items.includes('5')">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption5"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col v-else/>
                    <v-col class="aa" v-if="loc.find(e => e.title == valShow).items.includes('6')">
                      <h3 class="mb-1">遮桿閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption6"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col v-else/>
                    <v-col class="aa" v-if="loc.find(e => e.title == valShow).items.includes('7')">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption7"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col v-else/>
                    <v-col class="aa" v-if="loc.find(e => e.title == valShow).items.includes('8')">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption8"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col v-else/>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="RepairDayShow"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="RepairDay" outlined
                        placeholder="點此選擇檢修日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="RepairDay"
                      @input="RepairDayShow = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="CompleteDayShow"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="CompleteDay"
                        outlined
                        placeholder="點此選擇完成日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="CompleteDay"
                      @input="CompleteDayShow = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details auto-grow outlined rows="5" v-model="Memo"/>
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined readonly v-model="doMan.name"/>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        
        
        <v-col></v-col>
        <!-- 送出 -->
        <v-col class="mt-2" cols="12">
          <v-btn large block class="mt-n8 mb-4 btn-add white--text"
          @click="save" >送出表單</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from 'vuex'
import { getNowFullTime, getTodayDateString, unique} from "@/assets/js/commonFun";
import { maintainStatusOpts } from '@/assets/js/workList'
import dateSelect from "@/components/forManage/dateSelect";
import dateSelect2 from "@/components/forManage/dateSelect2";
import deptSelect from "@/components/forManage/deptSelect";
import { fetchFormOrderList, fetchFormOrderOne, createFormOrder, createFormOrder0, updateFormOrder } from '@/apis/formManage/serve'
import { formDepartOptions } from '@/assets/js/departOption'
import { Actions } from "@/assets/js/actions";
import dialogDelete from "@/components/forManage/dialogDelete";
import { Constrant } from "@/assets/js/constrant";
import ToolBar from "@/components/forManage/toolbar";

export default {
  data() {
    return {
      showTF: false,
      isLoading: false,
      disabled: false,
      valShow: 0,
      formDepartOptions: [
        // 通報單位下拉選單
        { text: "不限", value: "" },
        ...formDepartOptions,
      ],
      title: "",
      newText: "平交道功能檢查紀錄表",
      action: Actions.add,
      actions: Actions,
      dialogDel: false, // model off
      Add: false,
      loc:[
        {title: '1',section: '0km0-100m', items: '12345'},
        {title: '2',section: '0km520m', items: '13578'},
        {title: '3',section: '0km550m', items: '13578'},
        {title: '4',section: '0km600m', items: '13578'},
        {title: '5',section: '0km700m', items: '13578'},
        {title: '6',section: '0km800m', items: '1345678'},
        {title: '7',section: '0km900m', items: '1345678'},
        {title: '7-1庫',section: '車庫線', items: '123456'},
        {title: '7-1',section: '1km190m', items: '1345'},
        {title: '7-2',section: '1km240m', items: '1345'},
        {title: '8',section: '1km440m', items: '13458'},
        {title: '9',section: '1km900m', items: '12345678'},
        {title: '10',section: '2km110m', items: '1345678'},
        {title: '11',section: '2km200m', items: '1345'},
        {title: '12',section: '2km520m', items: '1345678'},
        {title: '13',section: '2km830m', items: '1345678'},
        {title: '14',section: '3km310m', items: '1345678'},
        {title: '15',section: '3km580m', items: '134578'},
        {title: '15-1',section: '4km500m', items: '1234'},
        {title: '16',section: '4km560m', items: '12345'},
        {title: '17',section: '4km900m', items: '1345678'},
        {title: '17-1',section: '6km130m', items: '12345'},
        {title: '18',section: '6km240m', items: '12345'},
        {title: '18-1',section: '6km460m', items: '1234'},
        {title: '19',section: '6km740m', items: '12345'},
        {title: '19-1',section: '6km810m', items: '1234'},
        {title: '19-2',section: '6km830m', items: '1234'},
        {title: '20',section: '6km900m', items: '12345'},
        {title: '21',section: '7km250m', items: '1345678'},
        {title: '22',section: '7km360m', items: '1345'},
        {title: '23',section: '7km520m', items: '1345678'},
        {title: '24',section: '7km630m', items: '1345678'},
        {title: '25',section: '7km830m', items: '1345678'},
        {title: '26',section: '8km100m', items: '1345678'},
        {title: '26-1',section: '8km500m', items: '12345'},
        {title: '27',section: '8km840m', items: '1345678'},
        {title: '28',section: '8km900m', items: '1345678'},
        {title: '29',section: '8km990m', items: '1345678'},
        {title: '30',section: '9km110m', items: '1345678'},
        {title: '30-1',section: '9km660m', items: '1345678'},
        {title: '30-4',section: '10km930m', items: '1345678'},
        {title: '31',section: '11km090m', items: '12345678'},
        {title: '32',section: '11km780m', items: '12345'},
        {title: '33',section: '12km000m', items: '1345678'},
        {title: '34',section: '12km200m', items: '1345'},
        {title: '35',section: '13km270m', items: '1345678'},
        {title: '36',section: '13km350m', items: '1345678'},
        {title: '37',section: '13km550m', items: '1345678'},
        {title: '37-1',section: '13km640m', items: '1234'},
        {title: '37-2',section: '13km800m', items: '134578'},
        {title: '38',section: '14km020m', items: '12345678'},
        {title: '38-1',section: '14km330m', items: '1234'},
        {title: '39',section: '14km380m', items: '12345678'},
        {title: '40',section: '14km500m', items: '12345678'},
        {title: '41',section: '15km300m', items: '12345'},
        {title: '42',section: '16km380m', items: '12345'},
        {title: '43',section: '17km100m', items: '1345678'},
        {title: '43-5',section: '21km198m', items: '1234'},
        {title: '43-6',section: '23km300m', items: '12345'},
        {title: '44',section: '32km700m', items: '1345678'},
        {title: '44-1',section: '34km640m', items: '12345'},
        {title: '45',section: '45km800m', items: '12345678'},
        {title: '46',section: '67km100m', items: '12345678'},
        {title: '47',section: '眠0km800m', items: '1345'},
        {title: '48',section: '眠1km200m', items: '12345'},
        {title: '49',section: '眠1km330m', items: '12345'},
        {title: '50',section: '祝2km285m', items: '12345'},
        {title: '51',section: '水0km254m', items: '12345'},
      ],
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

      DB_Table: "RP087",
      RPFlowNo: "",
      nowTime: "",
      doMan:{
        id: '',
        name: '',
        depart: '',
        checkManName: ''
      },
      zs: "",
      // 自定義變數
      EqipNo: "",
      Location: "",
      CheckOption1: "",
      CheckOption2: "",
      CheckOption3: "",
      CheckOption4: "",
      CheckOption5: "",
      CheckOption6: "",
      CheckOption7: "",
      CheckOption8: "",
      RepairDay: '',
      RepairDayShow: false,
      CompleteDay: '',
      CompleteDayShow: false,
      Memo: '',
      

      CheckdayOn: "",
      QueryCheckdayOn: "",
      CheckdayOff: "",
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
        // {
        //   text: "審查狀態",
        //   value: "Review",
        //   align: "center",
        //   divider: true,
        //   class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        // },
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
  components: {
    Pagination, // 頁碼
    dateSelect,
    dateSelect2,
    deptSelect,
    ToolBar,
    dialogDelete,
  },
  //   components: { Pagination, form51lib }, // 頁碼
  computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
        checkShow:function(){
          return this.valShow != 0
        },
        showTitle:function(){
          let aa = this.loc.find(e => e.title == this.valShow).title
          let bb = this.loc.find(e => e.title == this.valShow).section
          return aa + '. ' + bb
        },
  },
  created() {
    //更新時間
    // this.nowTime = getTodayDateString();
    this.doMan.name = this.userData.UserName;
    this.doMan.id = this.userData.UserId;
    this.doMan.depart = this.userData.DeptList[0].DeptDesc;
    this.doMan.departId = this.userData.DeptList[0].DeptId;
  },
  methods: {
    initInput(){
      this.CheckOption1 = ""
      this.CheckOption2 = ""
      this.CheckOption3 = ""
      this.CheckOption4 = ""
      this.CheckOption5 = ""
      this.CheckOption6 = ""
      this.CheckOption7 = ""
      this.CheckOption8 = ""
      this.RepairDay = ''
      this.CompleteDay = ''
    },
    ...mapActions("system", [
      "chMsgbar", // messageBar
      "chLoadingShow", // 切換 loading 圖顯示
    ]),
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 新增監工區塊欄位
    addSupervisor() {},
    // 存
    save() {
      this.chLoadingShow({show:true});
      var data = {
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.userData.UserId, // 操作人id this.doMan.name = this.userData.UserName
        // OperatorID: "16713",  // 操作人id
        KeyName: this.DB_Table, // DB table
        KeyItem: [
          { Column: "CheckDay", Value: this.RepairDay },
          { Column: "EqipNo", Value: this.loc.find(e => e.title == this.valShow).title },
          { Column: "Location", Value: this.loc.find(e => e.title == this.valShow).section },
          { Column: "CheckOption1", Value: this.CheckOption1 },
          { Column: "CheckOption2", Value: this.CheckOption2 },
          { Column: "CheckOption3", Value: this.CheckOption3 },
          { Column: "CheckOption4", Value: this.CheckOption4 },
          { Column: "CheckOption5", Value: this.CheckOption5 },
          { Column: "CheckOption6", Value: this.CheckOption6 },
          { Column: "CheckOption7", Value: this.CheckOption7 },
          { Column: "EndDay", Value: this.CompleteDay },
          { Column: "Memo", Value: this.Memo },
        ],
      };
      // 修改
      if (this.action == Actions.edit) {
        // update 要自行增加RPFlowNo欄位
        data.RPFlowNo = this.RPFlowNo;
       
        updateFormOrder(data)
          .then((res) => {
            
            this.chMsgbar({ success: true, msg: Constrant.update.success });
          })
          .catch((err) => {
            ////console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.update.failed });
          })
          .finally(() => {
            this.chLoadingShow({ show: false});
          });
      } else {
        // 新增
        createFormOrder0(data)
          .then((res) => {
            
            this.chMsgbar({ success: true, msg: Constrant.insert.success });
          })
          .catch((err) => {
            ////console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.insert.failed });
          })
          .finally(() => {
            this.chLoadingShow({ show: false});
          });
      }
      this.$router.push({ path: '/form-manage/curing/level-crossing-function-checklist' })
      // to="/form-manage/curing/level-crossing-function-checklist-add"
    },
    // 關閉 dialogx
    closeWorkLogModal() {
      this.AddWorkLogModal = false;
    },
    viewPage(item) {
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
        //console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow({ show: false})
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
.aa {
  width: 20%;
}
.bb {
  width: 15%;
}
@media only screen and (max-width: 600px) {
  .xwd {
    max-width: 100%;
  }
  .aa {
    width: 100%;
    flex-basis: auto;
  }
}
</style>