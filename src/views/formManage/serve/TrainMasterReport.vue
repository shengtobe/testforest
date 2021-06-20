<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2 label-title">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2 label-header">
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="檢查日期(起)"
          v-model="input.dateStart"
          key="dateStart"
          :showIcon="formIconShow"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="檢查日期(迄)"
          v-model="input.dateEnd"
          key="dateStart"
          :showIcon="formIconShow"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn dark large class="mb-sm-8 mb-md-8 btn-search" @click="search">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="px-2 label-header">
      <v-col cols="12" sm="3" md="3">
        <v-form ref="uploadform">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-file</v-icon>檔案上傳
          </h3>
          <v-text-field solo placeholder="點此選擇檔案" />
        </v-form>
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn dark large class="mb-sm-8 mb-md-8 btn-fileup">
          <v-icon class="mr-1">mdi-cloud-upload</v-icon>上傳
        </v-btn>
        <v-btn
          elevation="3"
          dark
          large
          class="ml-4 ml-sm-4 ml-md-4 mb-sm-8 mb-md-8 btn-add"
          @click="newOne"
        >
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </v-col>
    </v-row>
    <!-- 表格資料 -->
    <v-col cols="12">
      <v-card>
        <v-data-table :headers="headers" :items="tableItems" :options.sync="pageOpt" disable-sort disable-filtering hide-default-footer class="theme-table">
          <template v-slot:no-data>
            <span class="red--text subtitle-1">沒有資料</span>
          </template>

          <template v-slot:loading>
            <span class="red--text subtitle-1">資料讀取中...</span>
          </template>

          <!-- headers 的 content 欄位 (檢視內容) -->
          <template v-slot:item.content="{ item }">
            <v-btn title="詳細資料" class="mr-2 btn-memo" small dark fab @click="viewPage(item)">
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
    <v-dialog v-model="Add" max-width="900px">
      <v-card class="theme-card">
        <v-card-title class="white--text px-4 py-1">
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
                <v-row no-gutter class="label-header">
                    <v-col cols="12" sm="3">
                        <h3 class="mb-1">站長姓名</h3>
                        <v-text-field solo v-model="doMan.name"/>
                    </v-col>
                    <v-col cols="12" sm="3">
                        <!-- <h3 class="mb-1">日期</h3>
                        <v-menu :close-on-content-click="false" transition="scale-transition" max-width="290px" min-width="290px">
                            <template v-slot:activator="{ on }">
                                <v-text-field v-model.trim="zs" solo v-on="on" />
                            </template>
                            <v-date-picker color="purple" v-model="zs" @input="MaintenanceDay = false" locale="zh-tw"/>
                        </v-menu> -->
                        <dateSelect
                          label="日期"
                          v-model="CheckDay"
                          key="dateStart"
                          :showIcon="formIconShow"
                        />
                    </v-col>
                    <v-col cols="12" sm="6"/>
                    <v-col cols="12" sm="3">
                        <h3 >機車</h3>
                        <h4 >號碼</h4>
                        <v-text-field solo v-model="No[0].value"/>
                    </v-col>
                    <v-col cols="12" sm="3">
                        <h3 class="hideText">機車</h3>
                        <h4 class="hideText">號碼</h4>
                        <v-text-field solo v-model="No[1].value"/>
                    </v-col>
                    <v-col cols="12" sm="3">
                        <h3 class="hideText">機車</h3>
                        <h4 class="hideText">號碼</h4>
                        <v-text-field solo v-model="No[2].value"/>
                    </v-col>
                    <v-col cols="12" sm="3">
                        <h3 class="hideText">機車</h3>
                        <h4 class="hideText">號碼</h4>
                        <v-text-field solo v-model="No[3].value"/>
                    </v-col>
                    <v-col cols="12" sm="3" style="margin-top:-5%">
                        <h4 >區間</h4>
                        <v-text-field solo v-model="Sec[0].value"/>
                    </v-col>
                    <v-col cols="12" sm="3" style="margin-top:-5%">
                        <h4 class="hideText">_</h4>
                        <v-text-field solo v-model="Sec[1].value"/>
                    </v-col>
                    <v-col cols="12" sm="3" style="margin-top:-5%">
                        <h4 class="hideText">_</h4>
                        <v-text-field solo v-model="Sec[2].value"/>
                    </v-col>
                    <v-col cols="12" sm="3" style="margin-top:-5%">
                        <h4 class="hideText">_</h4>
                        <v-text-field solo v-model="Sec[3].value"/>
                    </v-col>
                    
                    <v-row>
                        <v-col cols="12" sm="3">
                            <h3 >車輛種類</h3>
                            <v-text-field solo v-model="CarType[0].value">
                                <span slot="prepend">1:</span>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo v-model="CarType[1].value">
                                <span slot="prepend">2:</span>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo v-model="CarType[2].value">
                                <span slot="prepend">3:</span>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo v-model="CarType[3].value">
                                <span slot="prepend">4:</span>
                            </v-text-field>
                        </v-col>
                    </v-row>
                
                    <v-row style="margin-top:-7%">
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo v-model="CarType[4].value">
                                <span slot="prepend">5:</span>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo v-model="CarType[5].value">
                                <span slot="prepend">6:</span>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo v-model="CarType[6].value">
                                <span slot="prepend">7:</span>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo v-model="CarType[7].value">
                                <span slot="prepend">8:</span>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row style="margin-top:-7%">
                        <v-col cols="12" sm="3">
                        <h3 class="hideText">_</h3>
                        <v-text-field solo v-model="CarType[8].value">
                            <span slot="prepend">9:</span>
                        </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo v-model="CarType[9].value">
                                <span slot="prepend">10:</span>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo v-model="CarType[10].value">
                                <span slot="prepend">11:</span>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo v-model="CarType[11].value">
                                <span slot="prepend">12:</span>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    
                    <v-row style="margin-top:-7%">
                        <v-col cols="12" sm="3">
                        <h3 class="hideText">_</h3>
                        <v-text-field solo v-model="CarType[12].value">
                            <span slot="prepend">13:</span>
                        </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo v-model="CarType[13].value">
                                <span slot="prepend">14:</span>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo v-model="CarType[14].value">
                                <span slot="prepend">15:</span>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <h3 class="hideText">_</h3>
                            <v-text-field solo v-model="CarType[15].value">
                                <span slot="prepend">16:</span>
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-row>
                <!-- 查票時旅客人數調查 -->
                <v-col cols="13" sm="12">
                    <v-toolbar color="gradual-bg-darken-wood" dark>
                    <v-spacer />
                    <v-toolbar-title>查票時旅客人數調查</v-toolbar-title>
                    <v-spacer />
                    </v-toolbar>
                </v-col>
                <v-row no-gutter class="label-header d-none d-sm-flex font-weight-black" style="margin-left:1%;width:99%;margin-bottom:-3%">
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
                <v-alert dense border="top" colored-border color="border-bg-dark-yellow" elevation="4" v-for="(item, idx) in items1_1" :key="idx" class="mb-6 mt-4">
                    <v-row no-gutter class="label-header" style="margin-bottom:-4%">
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
                
                <v-alert dense border="top" colored-border color="border-bg-dark-yellow" elevation="4" class="mb-6 mt-4">
                    <v-row no-gutter style="margin-bottom:-4%" class="label-header">
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
                            <v-textarea auto-grow outlined rows="2" v-model="items1_2.note"/>
                        </v-col>
                    </v-row>
                </v-alert>
                <!-- 補票情形 -->
                <v-col cols="13" sm="12">
                    <v-toolbar color="gradual-bg-darken-wood" dark>
                    <v-spacer />
                    <v-toolbar-title>查票時旅客人數調查</v-toolbar-title>
                    <v-spacer />
                    </v-toolbar>
                </v-col>
                <v-row no-gutter class="label-header" style="margin-left:8%">
                    <v-col cols="12" sm="2">
                        <h3 class="mb-1">起號</h3>
                        <v-text-field solo v-model="StartNo"/>
                    </v-col>
                    <v-col cols="12" sm="2">
                        <h3 class="mb-1">迄號</h3>
                        <v-text-field solo v-model="EndNo"/>
                    </v-col>
                    <v-col cols="12" sm="2">
                        <h3 class="mb-1">張數</h3>
                        <v-text-field solo v-model="AmountTick"/>
                    </v-col>
                    <v-col cols="12" sm="2">
                        <h3 class="mb-1">票價共計</h3>
                        <v-text-field solo v-model="PriceTick">
                            <span slot="append">元</span>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2">
                        <h3 class="mb-1">總計</h3>
                        <v-text-field solo v-model="TotalTick">
                            <span slot="append">元</span>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="10" style="margin-top:-4%;">
                        <h3 class="mb-1">備註</h3>
                        <v-textarea auto-grow outlined rows="2" v-model="Memo_5"/>
                    </v-col>
                    
                </v-row>

                <v-expansion-panels multiple>
                    <v-expansion-panel>
                        <v-expansion-panel-header color="btn-expansion" class="white--text">
                          車上承運物品
                          <template v-slot:actions>
                            <v-icon color="dropdownicon">
                              $expand
                            </v-icon>
                          </template>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-row no-gutter class="label-header d-none d-sm-flex font-weight-black" style="margin-left:1%;width:99%;margin-bottom:-3%">
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
                            <v-alert dense border="top" colored-border color="border-bg-dark-yellow" elevation="4" v-for="(item, idx) in Carriage" :key="idx" class="mb-6 mt-4">
                                <v-row no-gutter style="margin-bottom:-4%" class="label-header">
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
                        <v-expansion-panel-header color="btn-expansion" class="white--text">
                          無票旅客交站紀錄
                          <template v-slot:actions>
                            <v-icon color="dropdownicon">
                              $expand
                            </v-icon>
                          </template>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-row no-gutter class="label-header d-none d-sm-flex font-weight-black" style="margin-left:1%;width:99%;margin-bottom:-3%">
                                <v-col cols="12" sm="3">
                                    <h3 class="mb-1">由站</h3>
                                </v-col>
                                <v-col cols="12" sm="3">
                                    <h3 class="mb-1">至站</h3>
                                </v-col>
                                <v-col cols="12" sm="2">
                                    <h3 class="mb-1">人數</h3>
                                </v-col>
                                <v-col cols="12" sm="4">
                                    <h3 class="mb-1">補票原因</h3>
                                </v-col>
                                <!-- <v-col cols="12" sm="2">
                                    <h3 class="mb-1">站長簽名</h3>
                                </v-col> -->
                            </v-row>
                            <v-alert dense border="top" colored-border color="border-bg-dark-yellow" elevation="4" v-for="(item, idx) in handover" :key="idx" class="mb-6 mt-4">
                                <v-row no-gutter style="margin-bottom:-4%" class="label-header">
                                    <v-col cols="12" sm="3">
                                        <v-text-field solo v-model="handover[idx].start"/>
                                    </v-col>
                                    <v-col cols="12" sm="3">
                                        <v-text-field solo v-model="handover[idx].end"/>
                                    </v-col>
                                    <v-col cols="12" sm="2">
                                        <v-text-field solo type="number" v-model="handover[idx].num"/>
                                    </v-col>
                                    <v-col cols="12" sm="4">
                                        <v-text-field solo v-model="handover[idx].reason"/>
                                    </v-col>
                                    <!-- <v-col cols="12" sm="2">
                                        <v-text-field solo v-model="handover[idx].sign"/>
                                    </v-col> -->
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
          <v-btn class="mr-2 btn-close white--text" elevation="4" @click="CloseJobApplication">取消</v-btn>
          <v-btn class="btn-add white--text" elevation="4" :loading="isLoading" @click="save">送出</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from "vuex";
import {
  getNowFullTime,
  getTodayDateString,
  unique,
  decodeObject,
} from "@/assets/js/commonFun";
import { maintainStatusOpts } from "@/assets/js/workList";
import UploadOneFileAdd from '@/components/UploadOneFileAdd.vue';
import {
  fetchFormOrderList,
  fetchFormOrderOne,
  createFormOrder,
  createFormOrder0,
  updateFormOrder,
  deleteFormOrder,
} from "@/apis/formManage/serve";
import { formDepartOptions } from "@/assets/js/departOption";
import { Actions } from "@/assets/js/actions";
import { Constrant } from "@/assets/js/constrant";
import dateSelect from "@/components/forManage/dateSelect";
import deptSelect from "@/components/forManage/deptSelect";
class Question {
  constructor(description, method, result, memo) {
    this.description = description;
    this.method = method;
    this.result = result;
    this.memo = memo;
  }
}

export default {
  data() {
    return {
      title: "車長報告",
      newText: "報告",
      isLoading: false,
      disabled: false,
      input: {
        dateStart: new Date().toISOString().substr(0, 10), // 通報日期(起)
        dateEnd: new Date().toISOString().substr(0, 10), // 通報日期(迄)
        case: "",
        eqLoss: "",
        departName: "",
      },
      formIconShow: true,
      indexN:0,
      sumN:0,
      z: '',
      df: '',
      formDepartOptions: [
        // 通報單位下拉選單
        { text: "不限", value: "" },
        ...formDepartOptions,
      ],
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
      items1_2: 
      {
        interval:"", 
        car:"", 
        num1:"0", 
        num2:"0", 
        sum:"0", 
        note:""
      },
      Add: false,
      ApplicationDay: "",
      pageOpt: { page: 1 }, // 目前頁數
      No: [
        {value: ''},
        {value: ''},
        {value: ''},
        {value: ''},
      ],
      Sec: [
        {value: ''},
        {value: ''},
        {value: ''},
        {value: ''},
      ],
      CarType: [
        {value: ''},
        {value: ''},
        {value: ''},
        {value: ''},
        {value: ''},
        {value: ''},
        {value: ''},
        {value: ''},
        {value: ''},
        {value: ''},
        {value: ''},
        {value: ''},
        {value: ''},
        {value: ''},
        {value: ''},
        {value: ''},
      ],
      StartNo: '',
      EndNo: '',
      AmountTick: '',
      PriceTick: '',
      TotalTick: '',
      Memo_5: '',
      //---api---
      DB_Table: "RP021",
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
      zs: '',
      headers: [
        // 表格顯示的欄位 DepartCode ID Name
        { text: "項次", value: "ItemNo", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "報告日期", value: "CheckDay", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "審查狀態", value: "CheckStatus", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "報告人", value: "Name", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "報告單位", value: "DepartName", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
        { text: "功能", value: "content", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold" },
      ],
      tableItems: [],
      //------
      suggest: "", // 改善建議
    };
  },
  components: { Pagination, dateSelect, deptSelect }, // 頁碼
  created() {
      // for(let i = 0; i < 76; i++){
      //   this.item.push
      // }

      this.ipt2 = { ...this.defaultIpt }
      //更新時間
      console.log("更新時間")
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
  computed: {
    ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
    }),
    Add1(){
      return function(n){
          var data = Number(this.items1_1[n].num1) + Number(this.items1_1[n].num2);
          this.items1_1[n].sum = data;
          return data
      }
    },
    Add2(){
      var data = Number(this.items1_2.num1) + Number(this.items1_2.num2)
      this.items1_2.sum = data
      return data
    }
  },
  methods: {
    initInput(){
      console.log("init create window form")
      // console.log("this.userData.UserName: " + this.userData.UserName)
      this.doMan.name = this.userData.UserName;
      this.CheckDay = getTodayDateString();
      this.zs = this.nowTime;
      for (let index = 0; index < this.No.length; index++) {
        this.No[index].value = '';
      }
      for (let i = 0; i < this.Sec.length; i++) {
        this.Sec[i].value = '';
      }
      for (let i = 0; i < this.CarType.length; i++) {
        this.CarType[i].value = '';
      }
      this.StartNo = ''
      this.EndNo = ''
      this.AmountTick = ''
      this.PriceTick = ''
      this.TotalTick = ''
      this.Memo_5 = ''
      var step;
      for (step = 0; step < 4; step++) {
        this.items1_1[step].interval = ""
        this.items1_1[step].car = ""
        this.items1_1[step].num1 = ""
        this.items1_1[step].num2 = ""
        this.items1_1[step].sum = ""
        this.items1_1[step].note = ""
        this.Carriage[step].start = ""
        this.Carriage[step].end = ""
        this.Carriage[step].itemName = ""
        this.Carriage[step].count = ""
        this.Carriage[step].id = ""
        this.Carriage[step].note = ""
        this.handover[step].start = ""
        this.handover[step].end = ""
        this.handover[step].num = ""
        this.handover[step].reason = ""
        this.handover[step].sign = ""
        this.handover[step].note = ""

      }
      this.items1_2.interval = ''
      this.items1_2.car = ''
      this.items1_2.num1 = ""
      this.items1_2.num2 = ""
      this.items1_2.sum = ""
      this.items1_2.note = ''
    },
    newOne(){
      this.Add = true
      this.initInput();
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
          { Column: "StartDayVlaue", Value: this.input.dateStart },
          { Column: "EndDayVlaue", Value: this.input.dateEnd },
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
        console.log("res.data.DT: " + res.data.DT)
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

      obj = new Object()
      obj.Column = "CheckDay"
      obj.Value = this.zs
      arr = arr.concat(obj)
      
      //機車號碼
      for (let i = 0; i < this.No.length; i++) {
        obj = new Object()
        obj.Column = "No_" + (i+1)
        obj.Value = this.No[i].value
        arr = arr.concat(obj)
      }
      //機車區間
      for (let i = 0; i < this.Sec.length; i++) {
        obj = new Object()
        obj.Column = "Sec_" + (i+1)
        obj.Value = this.Sec[i].value
        arr = arr.concat(obj)
      }
      //車輛種類
      for (let i = 0; i < this.CarType.length; i++) {
        obj = new Object()
        obj.Column = "CarType_" + (i+1)
        obj.Value = this.CarType[i].value
        arr = arr.concat(obj)
      }
      //人數檢查
      for (let i = 0; i < this.items1_1.length; i++) {
        obj = new Object()
        obj.Column = "AmountSec_" + (i+1)
        obj.Value = this.items1_1[i].interval
        arr = arr.concat(obj)
        obj = new Object()
        obj.Column = "AmountCarType_" + (i+1)
        obj.Value = this.items1_1[i].car
        arr = arr.concat(obj)
        obj = new Object()
        obj.Column = "AmountChkMan_" + (i+1)
        obj.Value = this.items1_1[i].num1
        arr = arr.concat(obj)
        obj = new Object()
        obj.Column = "AmountPeople_" + (i+1)
        obj.Value = this.items1_1[i].num2
        arr = arr.concat(obj)
        obj = new Object()
        obj.Column = "Amount_" + (i+1)
        obj.Value = this.items1_1[i].sum
        arr = arr.concat(obj)
        obj = new Object()
        obj.Column = "Memo_" + (i+1)
        obj.Value = this.items1_1[i].note
        arr = arr.concat(obj)
      }
      //旅客最多區間
      obj = new Object()
      obj.Column = "MostPeoSec_1"
      obj.Value = this.items1_2.car
      arr = arr.concat(obj)
      obj = new Object()
      obj.Column = "MostPeoSec_2"
      obj.Value = this.items1_2.num1
      arr = arr.concat(obj)
      obj = new Object()
      obj.Column = "MostPeoSec_3"
      obj.Value = this.items1_2.num2
      arr = arr.concat(obj)
      obj = new Object()
      obj.Column = "MostPeoSec_4"
      obj.Value = this.items1_2.sum
      arr = arr.concat(obj)
      obj = new Object()
      obj.Column = "MostPeoSec_5"
      obj.Value = this.items1_2.note
      arr = arr.concat(obj)
      //查票時旅客人數調查
      obj = new Object()
      obj.Column = "StartNo"
      obj.Value = this.StartNo
      arr = arr.concat(obj)
      obj = new Object()
      obj.Column = "EndNo"
      obj.Value = this.EndNo
      arr = arr.concat(obj)
      obj = new Object()
      obj.Column = "AmountTick"
      obj.Value = this.AmountTick
      arr = arr.concat(obj)
      obj = new Object()
      obj.Column = "PriceTick"
      obj.Value = this.PriceTick
      arr = arr.concat(obj)
      obj = new Object()
      obj.Column = "TotalTick"
      obj.Value = this.TotalTick
      arr = arr.concat(obj)
      obj = new Object()
      obj.Column = "Memo_5"
      obj.Value = this.Memo_5
      arr = arr.concat(obj)
      obj = new Object()
      //車上承運物品
      for (let i = 0; i < this.Carriage.length; i++) {
        obj = new Object()
        obj.Column = "StartStation_" + (i+1)
        obj.Value = this.Carriage[i].start
        arr = arr.concat(obj)
        obj = new Object()
        obj.Column = "EndStation_" + (i+1)
        obj.Value = this.Carriage[i].end
        arr = arr.concat(obj)
        obj = new Object()
        obj.Column = "Item_" + (i+1)
        obj.Value = this.Carriage[i].itemName
        arr = arr.concat(obj)
        obj = new Object()
        obj.Column = "AmountItem_" + (i+1)
        obj.Value = this.Carriage[i].count
        arr = arr.concat(obj)
        obj = new Object()
        obj.Column = "ItemNo_" + (i+1)
        obj.Value = this.Carriage[i].id
        arr = arr.concat(obj)
      }
      //無票旅客交站紀錄
      console.log("handover.length: " + this.handover.length)
      for (let i = 4; (i+1) <= 8; i++) {
        obj = new Object()
        obj.Column = "StartStation_" + (i+1)
        obj.Value = this.handover[i-4].start
        arr = arr.concat(obj)
        obj = new Object()
        obj.Column = "EndStation_" + (i+1)
        obj.Value = this.handover[i-4].end
        arr = arr.concat(obj)
        obj = new Object()
        obj.Column = "AmountNoTick_" + (i+1)
        obj.Value = this.handover[i-4].num
        arr = arr.concat(obj)
        obj = new Object()
        obj.Column = "ResonNoTick_" + (i+1)
        obj.Value = this.handover[i-4].reason
        arr = arr.concat(obj)
      }
      console.log(JSON.stringify(arr))

      createFormOrder0({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id this.doMan.name = this.userData.UserName
        // OperatorID: "16713",  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem:arr,
      }).then(res => {
        console.log(res.data.DT)
      }).catch(err => {
        console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow()
      })
      this.Add = false;
    },
    // 關閉 dialog
    CloseJobApplication() {
      this.Add = false;
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
          "CheckDay",//0
          "DepartName",
          "Name",
          "CheckMan",
          "No_1",//4
          "No_2",//5
          "No_3",//6
          "No_4",//7
          "Sec_1",//8
          "Sec_2",//9
          "Sec_3",//10
          "Sec_4",//11
          "CarType_1",//12
          "CarType_2",//13
          "CarType_3",//14
          "CarType_4",//15
          "CarType_5",//16
          "CarType_6",//17
          "CarType_7",//18
          "CarType_8",//19
          "CarType_9",//20
          "CarType_10",//21
          "CarType_11",//22
          "CarType_12",//23
          "CarType_13",//24
          "CarType_14",//25
          "CarType_15",//26
          "CarType_16",//27
          "AmountSec_1",//28
          "AmountCarType_1",//29
          "AmountChkMan_1",//30
          "AmountPeople_1",//31
          "Amount_1",//32
          "Memo_1",//33
          "AmountSec_2",//34
          "AmountCarType_2",//35
          "AmountChkMan_2",//36
          "AmountPeople_2",//37
          "Amount_2",//38
          "Memo_2",//39
          "AmountSec_3",//40
          "AmountCarType_3",//41
          "AmountChkMan_3",//42
          "AmountPeople_3",//43
          "Amount_3",//44
          "Memo_3",//45
          "AmountSec_4",//46
          "AmountCarType_4",//47
          "AmountChkMan_4",//48
          "AmountPeople_4",//49
          "Amount_4",//50
          "Memo_4",//51
          "MostPeoSec_1",//52
          "MostPeoSec_2",//53
          "MostPeoSec_3",//54
          "MostPeoSec_4",//55
          "MostPeoSec_5",//56
          "StartNo",//57
          "EndNo",//58
          "AmountTick",//59
          "PriceTick",//60
          "TotalTick",//61
          "Memo_5",//62
          "StartStation_1",//63
          "EndStation_1",//64
          "Item_1",//65
          "AmountItem_1",//66
          "ItemNo_1",//67
          "StartStation_2",//68
          "EndStation_2",//69
          "Item_2",//70
          "AmountItem_2",//71
          "ItemNo_2",//72
          "StartStation_3",//73
          "EndStation_3",//74
          "Item_3",//75
          "AmountItem_3",//76
          "ItemNo_3",//77
          "StartStation_4",//78
          "EndStation_4",//79
          "Item_4",//80
          "AmountItem_4",//81
          "ItemNo_4",//82
          "StartStation_5",//83
          "EndStation_5",//84
          "AmountNoTick_5",//85
          "ResonNoTick_5",//86
          "StartStation_6",//87
          "EndStation_6",//88
          "AmountNoTick_6",//89
          "ResonNoTick_6",//90
          "StartStation_7",//91
          "EndStation_7",//92
          "AmountNoTick_7",//93
          "ResonNoTick_7",//94
          "StartStation_8",//95
          "EndStation_8",//96
          "AmountNoTick_8",//97
          "ResonNoTick_8",//98
        ],
      }).then(res => {
        this.initInput();
        console.log(res.data.DT)
        let dat = JSON.parse(res.data.DT)
        console.log("data name2: " + dat[0].Name)
        console.log("data time: " + dat[0].CheckDay)
        this.Add = true
        // this.zs = res.data.DT.CheckDay
        this.doMan.name = dat[0].Name
        console.log("doMan name: " + this.doMan.name)
        //123資料
        let ad = Object.keys(dat[0])
        console.log(ad)
        
        var i = 0, j = 0, k = 0, m = 0;
        for(let key of Object.keys(dat[0])){
          if(i >= 4 && i <= 7){//機車號碼
            this.No[i-4].value = (dat[0])[key]
          }
          if(i >= 8 && i <= 11){//機車區間
            this.Sec[i-8].value = (dat[0])[key]
          }
          if(i >= 12 && i <= 27){//車輛種類 12~27
            this.CarType[i-12].value = (dat[0])[key]
          }
          if(i >= 28 && i <= 51){//人數檢查 28~51
            var res = key.split("_");
            switch(res[0]){
              case "AmountSec":
                this.items1_1[j].interval = (dat[0])[key]
                break;
              case "AmountCarType":
                this.items1_1[j].car = (dat[0])[key]
                break;
              case "AmountChkMan":
                this.items1_1[j].num1 = (dat[0])[key]
                break;
              case "AmountPeople":
                this.items1_1[j].num2 = (dat[0])[key]
                break;
              case "Amount":
                break;
              case "Memo":
                this.items1_1[j].note = (dat[0])[key]
                j++
                break;
            }
          }
          if(i >= 52 && i <= 56){//旅客最多區間 52~56
            switch(key){
              case "MostPeoSec_1":
                this.items1_2.car = (dat[0])[key]
                break;
              case "MostPeoSec_2":
                this.items1_2.num1 = (dat[0])[key]
                break;
              case "MostPeoSec_3":
                this.items1_2.num2 = (dat[0])[key]
                break;
              case "MostPeoSec_4":
                break;
              case "MostPeoSec_5":
                this.items1_2.note = (dat[0])[key]
                break;
            }
          }
          if(i >= 57 && i <= 62){//查票時旅客人數調查 57~62
          switch(key){
              case "StartNo":
                this.StartNo = (dat[0])[key]
                break;
              case "EndNo":
                this.EndNo = (dat[0])[key]
                break;
              case "AmountTick":
                this.AmountTick = (dat[0])[key]
                break;
              case "PriceTick":
                this.PriceTick = (dat[0])[key]
                break;
              case "TotalTick":
                this.TotalTick = (dat[0])[key]
                break;
                case "Memo_5":
                this.Memo_5 = (dat[0])[key]
                break;
            }
          }
          if(i >= 63 && i <= 82){//車上承運物品
            var res = key.split("_");
            switch(res[0]){
              case "StartStation":
                this.Carriage[k].start = (dat[0])[key]
                break;
              case "EndStation":
                this.Carriage[k].end = (dat[0])[key]
                break;
              case "Item":
                this.Carriage[k].itemName = (dat[0])[key]
                break;
              case "AmountItem":
                this.Carriage[k].count = (dat[0])[key]
                break;
              case "ItemNo":
                this.Carriage[k].id = (dat[0])[key]
                k++
                break;
            }
          }
          m = 0
          if(i > 63){//無票旅客交站紀錄
            var res = key.split("_");
            switch(res[0]){
              case "StartStation":
                this.handover[m].start = (dat[0])[key]
                break;
              case "EndStation":
                this.handover[m].end = (dat[0])[key]
                break;
              case "AmountNoTick":
                this.handover[m].num = (dat[0])[key]
                break;
              case "ResonNoTick":
                this.handover[m].reason = (dat[0])[key]
                m++
                break;
            }
          }


          i++
        }

      
        
        

        
      }).catch(err => {
        console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow()
      })
    },//viewPage
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
