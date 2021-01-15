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
        <v-btn color="green" dark large class="mb-sm-8 mb-md-8">
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
          @click="AddJobApplication = true"
        >
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </v-col>
    </v-row>
    <!-- 表格資料 -->
    <v-col cols="12">
      <v-card>
        <v-data-table :headers="headers" :items="tableItems" :options.sync="pageOpt" disable-sort disable-filtering hide-default-footer>
          <template v-slot:no-data>
            <span class="red--text subtitle-1">沒有資料</span>
          </template>

          <template v-slot:loading>
            <span class="red--text subtitle-1">資料讀取中...</span>
          </template>

          <!-- headers 的 content 欄位 (檢視內容) -->
          <template v-slot:item.content="{ item }">
            <v-btn title="詳細資料" class="mr-2" small dark fab color="info darken-1" @click="AddJobApplication = true">
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
                        <h3 class="mb-1">站長姓名</h3>
                        <v-text-field solo />
                    </v-col>
                    <v-col cols="12" sm="3">
                        <h3 class="mb-1">日期</h3>
                        <v-menu :close-on-content-click="false" transition="scale-transition" max-width="290px" min-width="290px">
                            <template v-slot:activator="{ on }">
                                <v-text-field v-model.trim="AddData.MaintenanceDay" outlined v-on="on" dense single-line />
                            </template>
                            <v-date-picker color="purple" v-model="AddData.MaintenanceDay" @input="MaintenanceDay = false" locale="zh-tw"/>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6"/>
                    <v-col cols="12" sm="3">
                        <h3 >機車</h3>
                        <h4 >號碼</h4>
                        <v-text-field solo/>
                    </v-col>
                    <v-col cols="12" sm="3">
                        <h3 class="hideText">機車</h3>
                        <h4 class="hideText">號碼</h4>
                        <v-text-field solo/>
                    </v-col>
                    <v-col cols="12" sm="3">
                        <h3 class="hideText">機車</h3>
                        <h4 class="hideText">號碼</h4>
                        <v-text-field solo/>
                    </v-col>
                    <v-col cols="12" sm="3">
                        <h3 class="hideText">機車</h3>
                        <h4 class="hideText">號碼</h4>
                        <v-text-field solo/>
                    </v-col>
                    <v-col cols="12" sm="3" style="margin-top:-5%">
                        <h4 >區間</h4>
                        <v-text-field solo/>
                    </v-col>
                    <v-col cols="12" sm="3" style="margin-top:-5%">
                        <h4 class="hideText">_</h4>
                        <v-text-field solo />
                    </v-col>
                    <v-col cols="12" sm="3" style="margin-top:-5%">
                        <h4 class="hideText">_</h4>
                        <v-text-field solo/>
                    </v-col>
                    <v-col cols="12" sm="3" style="margin-top:-5%">
                        <h4 class="hideText">_</h4>
                        <v-text-field solo/>
                    </v-col>
                    
                    <v-row>
                        <v-col cols="12" sm="3">
                            <h3 >車輛種類</h3>
                            <v-text-field solo>
                                <span slot="prepend">1:</span>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo>
                                <span slot="prepend">2:</span>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo>
                                <span slot="prepend">3:</span>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo>
                                <span slot="prepend">4:</span>
                            </v-text-field>
                        </v-col>
                    </v-row>
                
                    <v-row style="margin-top:-7%">
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo>
                                <span slot="prepend">5:</span>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo>
                                <span slot="prepend">6:</span>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo>
                                <span slot="prepend">7:</span>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo>
                                <span slot="prepend">8:</span>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row style="margin-top:-7%">
                        <v-col cols="12" sm="3">
                        <h3 class="hideText">_</h3>
                        <v-text-field solo>
                            <span slot="prepend">9:</span>
                        </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo>
                                <span slot="prepend">10:</span>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo>
                                <span slot="prepend">11:</span>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo>
                                <span slot="prepend">12:</span>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    
                    <v-row style="margin-top:-7%">
                        <v-col cols="12" sm="3">
                        <h3 class="hideText">_</h3>
                        <v-text-field solo>
                            <span slot="prepend">13:</span>
                        </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo>
                                <span slot="prepend">14:</span>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo>
                                <span slot="prepend">15:</span>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo>
                                <span slot="prepend">16:</span>
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-row>
                <!-- 查票時旅客人數調查 -->
                <v-col cols="13" sm="12">
                    <v-toolbar color="teal" dark>
                    <v-spacer />
                    <v-toolbar-title>查票時旅客人數調查</v-toolbar-title>
                    <v-spacer />
                    </v-toolbar>
                </v-col>
                <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black" style="margin-left:1%;width:99%;margin-bottom:-3%">
                    <v-col cols="12" sm="2">
                        <h3 class="mb-1">區間</h3>
                    </v-col>
                    <v-col cols="12" sm="2">
                        <h3 class="mb-1">車別</h3>
                    </v-col>
                    <v-col cols="12" sm="2">
                        <h3 class="mb-1">定員人數</h3>
                    </v-col>
                    <v-col cols="12" sm="2">
                        <h3 class="mb-1">乘車人數</h3>
                    </v-col>
                    <v-col cols="12" sm="2">
                        <h3 class="mb-1">共計</h3>
                    </v-col>
                    <v-col cols="12" sm="2">
                        <h3 class="mb-1">備註</h3>
                    </v-col>
                </v-row>
                <v-alert dense border="top" colored-border color="teal" elevation="4" v-for="(item, idx) in items1_1" :key="idx" class="mb-6 mt-4">
                    <v-row no-gutter style="margin-bottom:-4%">
                        <v-col cols="12" sm="2">
                            <v-text-field solo v-model="items1_1[idx].interval">
                                <span slot="append">間</span>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="2">
                            <v-text-field solo v-model="items1_1[idx].car"/>
                        </v-col>
                        <v-col cols="12" sm="2">
                            <v-text-field type="number" solo v-model="items1_1[idx].num1"/>
                        </v-col>
                        <v-col cols="12" sm="2">
                            <v-text-field type="number" solo v-model="items1_1[idx].num2"/>
                        </v-col>
                        <v-col cols="12" sm="2">
                            <v-text-field type="number" solo readonly :data="Add1(idx)" v-model="items1_1[idx].sum"/>
                        </v-col>
                        <v-col cols="12" sm="2">
                            <span class="d-sm-none error--text" >備註</span>
                            <v-textarea auto-grow v-model="items1_1[idx].note" outlined rows="2"/>
                        </v-col>
                    </v-row>
                </v-alert>
                
                <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-4">
                    <v-row no-gutter style="margin-bottom:-4%">
                        <v-col cols="12" sm="2">
                            <p style="margin-top:11%;margin-left:5%">旅客最多區間</p>
                        </v-col>
                        <v-col cols="12" sm="2">
                            <v-text-field solo v-model="items1_2.car"/>
                        </v-col>
                        <v-col cols="12" sm="2" >
                            <v-text-field solo  type="number" v-model="items1_2.num1"/>
                        </v-col>
                        <v-col cols="12" sm="2" >
                            <v-text-field solo type="number"  v-model="items1_2.num2"/>
                        </v-col>
                        <v-col cols="12" sm="2" >
                            <v-text-field solo type="number" readonly v-model="Add2"/>
                        </v-col>
                        <v-col cols="12" sm="2">
                            <span class="d-sm-none error--text">備註</span>
                            <v-textarea auto-grow outlined rows="2"/>
                        </v-col>
                    </v-row>
                </v-alert>
                <!-- 補票情形 -->
                <v-col cols="13" sm="12">
                    <v-toolbar color="teal" dark>
                    <v-spacer />
                    <v-toolbar-title>查票時旅客人數調查</v-toolbar-title>
                    <v-spacer />
                    </v-toolbar>
                </v-col>
                <v-row no-gutter class="indigo--text" style="margin-left:8%">
                    <v-col cols="12" sm="2">
                        <h3 class="mb-1">起號</h3>
                        <v-text-field solo />
                    </v-col>
                    <v-col cols="12" sm="2">
                        <h3 class="mb-1">迄號</h3>
                        <v-text-field solo />
                    </v-col>
                    <v-col cols="12" sm="2">
                        <h3 class="mb-1">張數</h3>
                        <v-text-field solo />
                    </v-col>
                    <v-col cols="12" sm="2">
                        <h3 class="mb-1">票價共計</h3>
                        <v-text-field solo>
                            <span slot="append">元</span>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2">
                        <h3 class="mb-1">總計</h3>
                        <v-text-field solo>
                            <span slot="append">元</span>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="10" style="margin-top:-4%;">
                        <h3 class="mb-1">備註</h3>
                        <v-textarea auto-grow outlined rows="2"/>
                    </v-col>
                    
                </v-row>

                <v-expansion-panels multiple>
                    <v-expansion-panel>
                        <v-expansion-panel-header color="teal" class="white--text">車上承運物品</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black" style="margin-left:1%;width:99%;margin-bottom:-3%">
                                <v-col cols="12" sm="2">
                                    <h3 class="mb-1">由站</h3>
                                </v-col>
                                <v-col cols="12" sm="2">
                                    <h3 class="mb-1">至站</h3>
                                </v-col>
                                <v-col cols="12" sm="3">
                                    <h3 class="mb-1">品名</h3>
                                </v-col>
                                <v-col cols="12" sm="2">
                                    <h3 class="mb-1">件數</h3>
                                </v-col>
                                <v-col cols="12" sm="3">
                                    <h3 class="mb-1">承運單號碼</h3>
                                </v-col>
                            </v-row>
                            <v-alert dense border="top" colored-border color="teal" elevation="4" v-for="(item, idx) in Carriage" :key="idx" class="mb-6 mt-4">
                                <v-row no-gutter style="margin-bottom:-4%">
                                    <v-col cols="12" sm="2">
                                        <v-text-field solo v-model="Carriage[idx].start"/>
                                    </v-col>
                                    <v-col cols="12" sm="2">
                                        <v-text-field solo v-model="Carriage[idx].end"/>
                                    </v-col>
                                    <v-col cols="12" sm="3">
                                        <v-text-field solo v-model="Carriage[idx].itemName"/>
                                    </v-col>
                                    <v-col cols="12" sm="2">
                                        <v-text-field type="number" solo v-model="Carriage[idx].count"/>
                                    </v-col>
                                    <v-col cols="12" sm="3">
                                        <v-text-field solo v-model="Carriage[idx].id"/>
                                    </v-col>
                                </v-row>
                            </v-alert>

                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header color="teal" class="white--text">無票旅客交站紀錄</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black" style="margin-left:1%;width:99%;margin-bottom:-3%">
                                <v-col cols="12" sm="2">
                                    <h3 class="mb-1">由站</h3>
                                </v-col>
                                <v-col cols="12" sm="2">
                                    <h3 class="mb-1">至站</h3>
                                </v-col>
                                <v-col cols="12" sm="2">
                                    <h3 class="mb-1">人數</h3>
                                </v-col>
                                <v-col cols="12" sm="4">
                                    <h3 class="mb-1">補票原因</h3>
                                </v-col>
                                <v-col cols="12" sm="2">
                                    <h3 class="mb-1">站長簽名</h3>
                                </v-col>
                            </v-row>
                            <v-alert dense border="top" colored-border color="teal" elevation="4" v-for="(item, idx) in handover" :key="idx" class="mb-6 mt-4">
                                <v-row no-gutter style="margin-bottom:-4%">
                                    <v-col cols="12" sm="2">
                                        <v-text-field solo v-model="handover[idx].start"/>
                                    </v-col>
                                    <v-col cols="12" sm="2">
                                        <v-text-field solo v-model="handover[idx].end"/>
                                    </v-col>
                                    <v-col cols="12" sm="2">
                                        <v-text-field solo type="number" v-model="handover[idx].num"/>
                                    </v-col>
                                    <v-col cols="12" sm="4">
                                        <v-text-field solo v-model="handover[idx].reason"/>
                                    </v-col>
                                    <v-col cols="12" sm="2">
                                        <v-text-field solo v-model="handover[idx].sign"/>
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
          <v-btn color="success" elevation="4" :loading="isLoading">送出</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
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
      title: "車長報告",
      newText: "報告",
      isLoading: false,
      disabled: false,
      indexN:0,
      sumN:0,
      QueryDayStart: "",
      QueryDayEnd: "",
      QueryData: {
        DayStart: "",
        DayEnd: "",
      },
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
      Carriage:[
          { start:"", end:"", itemName:"", count:"", id:"", note:"" },
          { start:"", end:"", itemName:"", count:"", id:"", note:"" },
          { start:"", end:"", itemName:"", count:"", id:"", note:"" },
          { start:"", end:"", itemName:"", count:"", id:"", note:"" },
      ],
      handover:[
          { start:"", end:"", num:"", reason:"", sign:"", note:"" },
          { start:"", end:"", num:"", reason:"", sign:"", note:"" },
          { start:"", end:"", num:"", reason:"", sign:"", note:"" },
          { start:"", end:"", num:"", reason:"", sign:"", note:"" },
      ],
      items1_1: [
        { interval:"", car:"", num1:"0", num2:"0", sum:"0", note:"" },
        { interval:"", car:"", num1:"0", num2:"0", sum:"0", note:"" },
        { interval:"", car:"", num1:"0", num2:"0", sum:"0", note:"" },
        { interval:"", car:"", num1:"0", num2:"0", sum:"0", note:"" },
      ],
      items1_2: [
        { interval:"", car:"", num1:"0", num2:"0", sum:"0", note:"" },
      ],
      AddJobApplication: false,
      ApplicationDay: "",
      pageOpt: { page: 1 }, // 目前頁數
      //---api---
      DB_Table: "RP001",
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
        { text: "項次", value: "FlowId", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "保養日期", value: "CheckDay", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "審查狀態", value: "CheckStatus", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "填寫人", value: "Name", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "保養單位", value: "DepartCode", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "功能", value: "content", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
      ],
      tableItems: [],
      //------
      suggest: "", // 改善建議
    };
  },
  components: { Pagination }, // 頁碼
  computed: {
    Add1(){
        return function(n){
            var data = Number(this.items1_1[n].num1) + Number(this.items1_1[n].num2);
            this.items1_1[n].sum = data;
            return data
        }
    },
    Add2(){
            return Number(this.items1_2.num1) + Number(this.items1_2.num2)
        }
  },
  methods: {
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 搜尋
    search() {},
    // 存
    save() {},
    // 關閉 dialog
    CloseJobApplication() {
      this.AddJobApplication = false;
    },
    
    AddN(){
        this.items1_1[n].sum = this.items1_1[n].num1 + this.items1_1[n].num2;
        indexN = indexN + 1;
    }
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
.v-input__prepend-outer{
    margin-left: 4%;
    margin-right: 4%;
    width: 24%;
}
.hideText{
    color:white;
}
</style>
