<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2 label-title">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2 label-header">
      <v-col cols="12" sm="3" md="3">
        <dateSelect label="調查日期(起)" :showIcon="false" v-model="SQuery.sDate"/>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <dateSelect label="調查日期(迄)" :showIcon="false" v-model="SQuery.eDate"/>
      </v-col>
      <div class="col-sm-4 col-md-8 col-12">
        <v-btn  dark large class="col-4 col-md-2 mr-3 btn-search" @click="search">
          <v-icon>mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn class="btn-add" elevation="3" dark large @click="newOne">
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </div>
    </v-row>
    <!-- 人數 -->
    <!-- <v-row class="label-header">
      <v-col cols="12" sm="6">
      </v-col>
      <v-col cols="12" sm="2">
        <v-text-field solo v-model="HarmCount">
          <span slot="append" color="red">位</span>
          <span slot="prepend" color="green">有危害</span>
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <v-text-field solo  v-model="NoHarmCount">
          <span slot="append" color="red">位</span>
          <span slot="prepend" color="green">無危害</span>
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <v-text-field solo v-model="Add2">
          <span slot="append" color="red">位</span>
          <span slot="prepend" color="green">總數</span>
        </v-text-field>
      </v-col>
      
    </v-row> -->
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

          <template v-slot:item.SEX="{ item }">
            {{ gender.find(e=>e.value==item.SEX).text }}
          </template>

          <template v-slot:item.Hand="{ item }">
            {{ item.Hand=='1'?'左':'右' }}
          </template>

          <template v-slot:item.CheckOption2="{ item }">
            {{ item.CheckOption2=='1'?'是':'否' }}
          </template>

          <template v-slot:item.CheckOption1="{ item }">
            {{ item.CheckOption1=='1'?'是':'否' }}
          </template>

          <template v-slot:item.CheckOption4="{ item }">
            {{ getDuringTime(item.CheckOption4) }}
          </template>
          

          <template v-slot:item.CheckOption5="{ item }">
            {{ getSelection(item.CheckOption5) }}
          </template>

          <template v-slot:item.CheckOption6="{ item }">
            {{ getSelection(item.CheckOption6) }}
          </template>

          <template v-slot:item.CheckOption7="{ item }">
            {{ getSelection(item.CheckOption7) }}
          </template>

          <template v-slot:item.CheckOption8="{ item }">
            {{ getSelection(item.CheckOption8) }}
          </template>

          <template v-slot:item.CheckOption9="{ item }">
            {{ getSelection(item.CheckOption9) }}
          </template>

          <template v-slot:item.CheckOption10="{ item }">
            {{ getSelection(item.CheckOption10) }}
          </template>

          <template v-slot:item.CheckOption11="{ item }">
            {{ getSelection(item.CheckOption11) }}
          </template>

          <template v-slot:item.CheckOption12="{ item }">
            {{ getSelection(item.CheckOption12) }}
          </template>

          <template v-slot:item.CheckOption13="{ item }">
            {{ getSelection(item.CheckOption13) }}
          </template>

          <template v-slot:item.CheckOption14="{ item }">
            {{ getSelection(item.CheckOption14) }}
          </template>

          <template v-slot:item.CheckOption15="{ item }">
            {{ getSelection(item.CheckOption15) }}
          </template>

          <template v-slot:item.CheckOption16="{ item }">
            {{ getSelection(item.CheckOption16) }}
          </template>

          <template v-slot:item.CheckOption17="{ item }">
            {{ getSelection(item.CheckOption17) }}
          </template>

          <template v-slot:item.CheckOption18="{ item }">
            {{ getSelection(item.CheckOption18) }}
          </template>

          <template v-slot:item.CheckOption19="{ item }">
            {{ getSelection(item.CheckOption19) }}
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
              <v-icon dark>mdi-magnify</v-icon>
            </v-btn>
            <v-btn title="刪除" small dark fab class="mr-2 btn-delete" @click="goDel(item)">
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
    
    <!-- 新增自動檢點表 modal -->
    <v-dialog v-model="Add" persistent max-width="680px">
      <v-card class="theme-card">
        <v-card-title class="white--text px-4 py-1">
          新增{{ title }}
          <v-spacer></v-spacer>
          <v-btn dark small text @click="close" class="mr-n2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <div class="px-6 py-4">
          <v-row>
            <!-- <v-col cols="12">
              <p>(A)說明酸痛不適與影響關節活動能力（以肩關節為例以及身體活動容忍尺度，以 0-5 尺度表示)：</p>
              <p>2.缺點由使用單位自行改善，不克者委請設備商修護。</p>
            </v-col> -->
            <!-- 檢查項目 -->
            <v-col cols="12" class="label-header">
              <v-row no-gutter>
                <v-col cols="12" sm="4">
                  <dateSelect label="填表日期" :showIcon="false" v-model="ipt.CheckDay"/>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">姓名</h3>
                  <peopleSelect solo :peopleList="ipt.CheckedID" ref="peopleSelect" :canEdit="!flowNo" @getPeople="(val)=>{ipt.CheckedID=val.UserId;ipt.CheckedName=val.UserName;getPeopleData(val.UserId)}"/>
                </v-col>
                <v-col cols="12" sm="4">
                  <deptSelect label="工作部門" outType="key" v-model="ipt.Dep" readonly/>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">地區</h3>
                  <v-text-field dense single-line solo v-model="ipt.Location"/>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">作業名稱</h3>
                  <v-text-field dense single-line solo v-model="ipt.WorkName"/>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">職稱</h3>
                  <v-text-field dense single-line solo v-model="ipt.JobName"/>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">性別</h3>
                  <v-select dense single-line :items="gender" v-model="ipt.SEX" solo/>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">年齡</h3>
                  <v-text-field dense type="number" single-line solo v-model="ipt.Age"/>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">年資(年)</h3>
                  <v-text-field dense type="number" single-line solo v-model="ipt.Experience"/>
                </v-col>
                <!-- <v-col cols="12" sm="3" /> -->
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">身高</h3>
                  <v-text-field dense single-line solo suffix="cm" v-model="ipt.Height"/>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">體重</h3>
                  <v-text-field dense single-line solo suffix="kg" v-model="ipt.Weight"/>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">慣用手</h3>
                  <v-select dense single-line :items="handedness" solo v-model="ipt.Hand"/>
                </v-col>
              </v-row>
              <v-col cols="12" sm="12">
                <v-col cols="12" sm="9">
                  <p class="font-weight-black title text-left font-size-50">
                    您在過去的1年內，身體是否有長達1個月以上的疲勞、酸痛、發麻、刺痛等不舒服的症狀？
                  </p>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.CheckOption1">
                    <v-radio color="success" label="是" value="1" />
                    <v-radio color="success" label="否" value="2" />
                  </v-radio-group>
                </v-col>
              </v-col>
              <div v-if="ipt.CheckOption1 == 1">
                <v-col cols="12" sm="9">
                  <p class="font-weight-black title text-left font-size-50">
                    身體的疲勞、痠痛、發麻、刺痛等不舒服，是否與目前工作有關？
                  </p>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.CheckOption2">
                    <v-radio color="success" label="是" value="1" />
                    <v-radio color="success" label="否" value="2" />
                  </v-radio-group>
                </v-col>
              </div>
              <div v-if="ipt.CheckOption2 == 1">
                <p class="font-weight-black title text-left font-size-50">
                  原因是:
                </p>
                <v-textarea
                  auto-grow
                  outlined
                  rows="3"
                  v-model.trim="ipt.CheckOption3"
                ></v-textarea>
                <p class="font-weight-black title text-left font-size-50">
                  上述最嚴重部位之酸痛、不適情形持續多久時間？
                </p>
                <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.CheckOption4">
                  <v-radio color="orange" label="一個月" value="1" />
                  <v-radio color="orange" label="三個月" value="2" />
                  <v-radio color="orange" label="六個月" value="3" />
                  <v-radio color="red" label="一年" value="4" />
                  <v-radio color="red" label="三年" value="5" />
                  <v-radio color="red" label="超過三年" value="6" />
                </v-radio-group>
                <br />
                <!-- 症狀調查 -->
                <v-col cols="13" sm="12">
                  <v-toolbar color="teal" dark>
                    <v-spacer />
                    <v-toolbar-title>症狀調查</v-toolbar-title>
                    <v-spacer />
                  </v-toolbar>
                </v-col>
                <!-- 圖 -->
                <v-col cols="12" sm="12">
                  <v-spacer />
                  <img :src="manImg" />
                  <v-spacer />
                </v-col>
                <v-alert dense border="top" colored-border color="teal" elevation="4"
                  v-for="(item, idx) in sickPos" :key="idx" class="mb-6">
                  <v-row no-gutter>
                    <v-col cols="12" sm="4">{{ item.question }}</v-col>
                    <v-col cols="12" sm="8">
                      <v-radio-group dense row class="pa-0 ma-0" v-model="ipt['CheckOption'+(idx+5)]">
                        <v-radio color="success" label="[不痛]，關節可以自由活動" value="1"/>
                        <v-radio color="orange" label="[微痛]，關節活動到極限會酸痛，可以忽略" value="2" />
                        <v-radio color="orange" label="[中等疼痛]，關節活動超過一半會酸痛，但是可以完成全部活動範圍，可能影響工作" value="3" />
                        <v-radio color="red" label="[劇痛]，關節活動只有正常人的一半，會影響工作" value="4"/>
                        <v-radio color="red" label="[非常劇痛]，關節活動只有正常人的1/4，影響自主活動能力" value="5"/>
                        <v-radio color="red" label="[極度劇痛]，身體完全無法自主活動" value="6"/>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-alert>
                <p class="font-weight-black title text-left font-size-50">
                  其他症狀、病史說明:
                </p>
                <v-textarea
                  auto-grow
                  outlined
                  rows="4"
                  v-model.trim="ipt.Memo"
                />
                <p>
                  以自覺式肌肉骨骼症狀調查表(NMQ)，對於未曾實施過NMQ調查之員工實施，以發現可能有潛在肌肉骨骼傷病風險之工作或作業，參考列入可能需要評估之對象。
                </p>
              </div>
            </v-col>
            <!-- END 檢查項目 -->
          </v-row>
        </div>
        <v-card-actions class="px-5 pb-5">
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

    <v-dialog v-model="Del.show" persistent max-width="290">
      <dialogDelete
        :id="userData.UserId"
        :DB_Table="DB_Table"
        :RPFlowNo="Del.RPFlowNo"
        :key="'d' + Del.key"
        @search="search"
        @close="close"
        @cancel="close" />
    </v-dialog>
  </v-container>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from 'vuex'
import { getNowFullTime, getTodayDateString, unique} from "@/assets/js/commonFun";
import { fetchFormOrderList, fetchFormOrderOne, updateFormOrder, createFormOrder0, deleteFormOrder } from '@/apis/formManage/serve'
import deptSelect from '@/components/forManage/deptSelect'
import dateSelect from '@/components/forManage/dateSelect'
import peopleSelect from '@/components/PeopleSelectMuti'
import dialogDelete from "@/components/forManage/dialogDelete"
import { login } from '@/apis/login'

export default {
  data() {
    return {
      title: "肌肉骨骼症狀調查表",
      newText: "調查表",
      DB_Table: "RP094",
      isLoading: false,
      disabled: false,
      gender: [
        { value:"1",text:"男" },
        { value:"2",text:"女" },
        { value:"3",text:"其他" },
      ],
      handedness: [
        { value:"2",text:"右手" },
        { value:"1",text:"左手" },
      ],
      // IsSick1: 0,
      // IsSick2: 0,
      // SickTime: 0,
      manImg: require("../../../../src/assets/images/manPic.png"),
      // HarmCount: 5,
      // NoHarmCount: 13,
      // SumHarmCount: null,
      Add: false,
      dialog3: false,
      SQuery: {
        sDate: "",
        eDate: ""
      },
      pageOpt: { page: 1 }, // 目前頁數
      headers: [
        // 表格顯示的欄位
        {text: "所屬單位", value: "DepName",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "檢查日期",value: "CheckDay",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "姓名",value: "CheckedName",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "職稱",value: "JobName",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "性別",value: "SEX",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "作業名稱",value: "WorkName",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "年齡",value: "Age",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "年資",value: "Experience",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "身高(cm)",value: "Height",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "體重(kg)",value: "Weight",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "慣用手",value: "Hand",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        // {text: "職業傷害",value: "a13",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        // {text: "通報中",value: "a14",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        // {text: "問卷調查",value: "a15",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "是否不適",value: "CheckOption1",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "與目前工作有關",value: "CheckOption2",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "痠痛持續時間",value: "CheckOption4",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "頭",value: "CheckOption5",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "上背",value: "CheckOption6",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "左肩",value: "CheckOption7",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "右肩",value: "CheckOption8",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "左手肘/左前臂",value: "CheckOption9",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "右手肘/右前臂",value: "CheckOption10",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "下背",value: "CheckOption11",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "左手/左手腕",value: "CheckOption12",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "右手/右手腕",value: "CheckOption13",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "左臀/左大腿",value: "CheckOption14",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "右臀/右大腿",value: "CheckOption15",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "左膝",value: "CheckOption16",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "右膝",value: "CheckOption17",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "左腳踝/左腳",value: "CheckOption18",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "右腳踝/右腳",value: "CheckOption19",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        // {text: "簡易人因工程改善",value: "a34",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        // {text: "是否改善",value: "a35",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        // {text: "進階人因工程改善",value: "a36",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        // {text: "是否改善",value: "a37",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "備註",value: "Memo",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
        {text: "功能",value: "content",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold"},
      ],
      tableItems: [],
      defIpt:{
        CheckDay: "",
        CheckedID: "",
        CheckedName: "",
        Location: "",
        Dep: "",
        DepName: "",
        WorkName: "",
        JobName: "",
        SEX: "",
        Age: "",
        Experience: "",
        Height: "",
        Weight: "",
        Hand: "",
        CheckOption1: "",
        CheckOption2: "",
        CheckOption3: "",
        CheckOption4: "",
        CheckOption5: "0",
        CheckOption6: "0",
        CheckOption7: "0",
        CheckOption8: "0",
        CheckOption9: "0",
        CheckOption10: "0",
        CheckOption11: "0",
        CheckOption12: "0",
        CheckOption13: "0",
        CheckOption14: "0",
        CheckOption15: "0",
        CheckOption16: "0",
        CheckOption17: "0",
        CheckOption18: "0",
        CheckOption19: "0",
        Memo: ""
      },
      ipt: {
        CheckDay: "",
        CheckedID: "",
        CheckedName: "",
        Location: "",
        Dep: "",
        DepName: "",
        WorkName: "",
        JobName: "",
        SEX: "",
        Age: "",
        Experience: "",
        Height: "",
        Weight: "",
        Hand: "",
        CheckOption1: "",
        CheckOption2: "",
        CheckOption3: "",
        CheckOption4: "",
        CheckOption5: "0",
        CheckOption6: "0",
        CheckOption7: "0",
        CheckOption8: "0",
        CheckOption9: "0",
        CheckOption10: "0",
        CheckOption11: "0",
        CheckOption12: "0",
        CheckOption13: "0",
        CheckOption14: "0",
        CheckOption15: "0",
        CheckOption16: "0",
        CheckOption17: "0",
        CheckOption18: "0",
        CheckOption19: "0",
        Memo: ""
      },
      sickPos: [
        { question: "1. 頭" },
        { question: "2. 上背" },
        { question: "3. 左肩" },
        { question: "4. 右肩" },
        { question: "5. 左手肘/左前臂" },
        { question: "6. 右手肘/右前臂" },
        { question: "7. 下背" },
        { question: "8. 左手/左手腕" },
        { question: "9. 右手/右手腕" },
        { question: "10. 左臀/左大腿" },
        { question: "11. 右臀/右大腿" },
        { question: "12. 左膝" },
        { question: "13. 右膝" },
        { question: "14. 左腳踝/左腳" },
        { question: "15. 右腳踝/右腳" },
      ],
      flowNo: "",
      Del: {
        show: false,
        key: 0,
        RPFlowNo: ""
      }
    };
  },
  components: { 
    Pagination,
    deptSelect,
    dateSelect,
    peopleSelect,
    dialogDelete
  },
  computed: {
    ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    Add2(){
      return this.HarmCount + this.NoHarmCount
    }
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
      this.SQuery.sDate = this.SQuery.eDate = this.nowTime
  },
  methods: {
    newOne(){
      if(this.ipt.CheckedID){
        this.$refs.peopleSelect.deleteSelectPeople(this.ipt.CheckedID)
      }
      this.ipt = {...this.defIpt}
      const today = new Date()
      this.flowNo = ""
      this.ipt.CheckDay = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate()
      this.Add = true
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
      this.chLoadingShow({show:true})
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {'Column':'StartDayVlaue','Value':this.SQuery.sDate},
          {"Column":"EndDayVlaue","Value":this.SQuery.eDate},
        ],
        QyName:[
          "RPFlowNo",
          "CheckDay",
          "CheckedID",
          "CheckedName",
          "Location",
          "Dep",
          "DepName",
          "WorkName",
          "JobName",
          "SEX",
          "Age",
          "Experience",
          "Height",
          "Weight",
          "Hand",
          "CheckOption1",
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
          "CheckOption19",
          "Memo",
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
    getPeopleData(empid){
      if(empid!=undefined){
        const sendData = {
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          UserId: empid,
          UserPasswd: "",
          BackDoor: 'T',
        }
        login({
          ...sendData
        }).then(res => {
          if (res.data.ErrorCode == 0) {
            this.ipt.CheckedName = res.data.UserData.UserName
            this.ipt.Dep = res.data.UserData.DeptList[0].DeptId
            this.ipt.DepName = res.data.UserData.DeptList[0].DeptDesc
            this.ipt.SEX = res.data.UserData.PeopleSex
            this.ipt.JobName = res.data.UserData.JobName
            const getAge = function(dateString) {
                var today = new Date();
                var birthDate = new Date(dateString);
                var age = today.getFullYear() - birthDate.getFullYear();
                var m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
                {
                    age--;
                }
                return age;
              }
            this.ipt.Age = getAge(res.data.UserData.PeopleBirthday)
            const monthDiff = function(d1, d2) {
              var months;
              months = (d2.getFullYear() - d1.getFullYear()) * 12;
              months -= d1.getMonth();
              months += d2.getMonth();
              return months <= 0 ? 0 : months;
            }
            const totalMonth = monthDiff(new Date(res.data.UserData.CreateDTime), new Date())
            this.ipt.Experience = (totalMonth/12).toFixed(1)
            // this.ipt.EmployDate = res.data.UserData.CreateDTime.split(' ')[0].replaceAll('\/', '-')
          } else {
            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
            this.$router.push({ path: '/error' })
          }
        }).catch( err => {
          console.warn(err)
          this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
        }).finally(() => {
        })
      }
    },
    // 存
    save() {
      this.chLoadingShow({show:true})
      let ki = []
      for( let key in this.ipt ) {
        ki.push({
          Column: key,
          Value: this.ipt[key]
        })
      }
      if(!this.flowNo) {
        createFormOrder0({
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id
          KeyName: this.DB_Table,  // DB table
          FunCode: 'C',
          KeyItem:ki
        }).then(res=>{
          if(!res.data.ErrorCode==0){
            console.error(res.data.Msg)
            alert('儲存時發生問題，請重新儲存!')
          }
        }).catch(err => {
          console.warn(err)
          alert('儲存時發生問題，請重新儲存!')
        }).finally(() => {
          this.chLoadingShow({show:false})
        })
      } else {
        updateFormOrder({
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id
          KeyName: this.DB_Table,  // DB table
          FunCode: 'U',
          RPFlowNo: this.flowNo,
          KeyItem:ki
        }).then(res=>{
          if(!res.data.ErrorCode==0){
            console.error(res.data.Msg)
            alert('儲存時發生問題，請重新儲存!')
          }
        }).catch(err => {
          console.warn(err)
          alert('儲存時發生問題，請重新儲存!')
        }).finally(() => {
          this.chLoadingShow({show:false})
        })
      }
      this.Add = false
    },
    // 關閉 dialog
    close() {
      this.Add = false;
      this.Del.show = false
    },
    viewPage(item) {
      this.chLoadingShow({show:true})
      this.flowNo = item.RPFlowNo
        fetchFormOrderOne({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {'Column':'RPFlowNo','Value':item.RPFlowNo},
                ],
        QyName:[
          "CheckDay",
          "CheckedID",
          "CheckedName",
          "Location",
          "Dep",
          "DepName",
          "WorkName",
          "JobName",
          "SEX",
          "Age",
          "Experience",
          "Height",
          "Weight",
          "Hand",
          "CheckOption1",
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
          "CheckOption19",
          "Memo",
        ],
      }).then(res => {
        let dat = JSON.parse(res.data.DT)
        console.log(dat[0])
        this.ipt = {...dat[0]}
        this.Add = true
      }).catch(err => {
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow({ show: false})
      })
    },
    goDel(item) {
      this.Del.RPFlowNo = item.RPFlowNo
      this.Del.key++
      this.Del.show  = true
    },
    getSelection(selection) {
      switch(selection){
        case "1":
          return "不痛"
        case "2":
          return "微痛"
        case "3":
          return "中等疼痛"
        case "4":
          return "劇痛"
        case "5":
          return "非常劇痛"
        case "6":
          return "極度劇痛"
        default:
          return ""
      }
    },
    getDuringTime(time) {
      switch(time){
        case '1':
          return '一個月'
        case '2':
          return '三個月'
        case '3':
          return '六個月'
        case '4':
          return '一年'
        case '5':
          return '三年'
        case '6':
          return '超過三年'
        default:
          return ""
      }
    }
  },
};
</script>
<style>
.v-input--radio-group__input {
  display: block;
}
.v-input__prepend-outer{
  width: 65%;
  margin-left: 16%;
}
.v-text-field.v-text-field--solo .v-input__prepend-outer, .v-text-field.v-text-field--solo .v-input__append-outer {
    margin-top: 16px;
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