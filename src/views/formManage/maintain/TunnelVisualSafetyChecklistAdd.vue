<template>
  <v-sheet class="ma-4 mb-8" color="yellow lighten-2">
    <v-container style="max-width: 1200px" class="px-8">
      <p class="font-weight-black title text-center label-title">新增{{ title }}</p>
      <v-row class="white px-4">
        <!-- 基本資料 -->
        <v-col cols="12" sm="8">
          
          <v-row no-gutter class="label-header">
            <!-- row1 -->
            <v-row>
              <v-col cols="12" sm="4">
                <h3 class="mb-1">安全檢查日期</h3>
                <v-menu
                  v-model="MaintenanceDay"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model.trim="CheckDate" outlined v-on="on" dense single-line />
                  </template>
                  <v-date-picker
                    color="primary"
                    v-model="CheckDate"
                    @input="MaintenanceDay = false"
                    locale="zh-tw"
                  />
                </v-menu>
              </v-col>
              <v-col cols="12" sm="3">
                <h3 class="mb-1">編號</h3>
                <v-select solo style="width:180px;" placeholder="編號" return-object dense single-line 
                  :items="sbjNum" outlined @change="s01Change" v-model="tunnelNum"/>
              </v-col>
              <v-col cols="12" sm="3">
                <h3 class="mb-1">路線</h3>
                <v-select solo style="width:180px;" placeholder="直/曲" return-object dense single-line 
                  :items="pathType" outlined v-model="LineType"/>
              </v-col>
              <v-col cols="12" sm="2">
                <h3 class="mb-1">長度</h3>
                <v-text-field dense single-line outlined readonly v-model="v3"><span slot="append">m</span></v-text-field>
              </v-col>
            </v-row>
            <!-- row2 -->
            <v-row>
              <v-col cols="12" sm="4">
                <h3 class="mb-1">里程</h3>
                <v-text-field dense single-line outlined readonly v-model="v1" class="ge"><span slot="prepend">起點:</span></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <h3 class="mb-1" style="color:white">里程</h3>
                <v-text-field dense single-line outlined readonly v-model="v2" class="ge"><span slot="prepend">終點:</span></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <h3 class="mb-1">襯砌型式</h3>
                <v-select solo style="width:180px;" return-object dense single-line 
                  :items="tunnelTypeList" outlined 
                  item-value="id" item-text="text" v-model="tunnelType"/>
              </v-col>
              
            </v-row>
            <!-- row3 -->
            <v-row>
              <v-col cols="12" sm="2">
                <h3 class="mb-1">坡度</h3>
                <v-text-field dense single-line outlined readonly v-model="v5"><span slot="append">%</span></v-text-field>
              </v-col>
              <v-col cols="12" sm="2">
                <h3 class="mb-1">標高</h3>
                <v-text-field dense single-line outlined readonly v-model="v6"><span slot="append">m</span></v-text-field>
              </v-col>
              <v-col cols="12" sm="7">
                <h3 class="mb-1">曲線半徑</h3>
                <v-text-field dense single-line outlined readonly v-model="v4"></v-text-field>
              </v-col>
            </v-row>
        </v-row>
        </v-col>
        <v-col cols="12" sm="4" >
          <v-spacer />
          <img style="width:100%" v-if="showImg" :src="vn[i_num].imgUrl1" alt="err" />
          <img style="width:100%" v-if="showImg" :src="vn[i_num].imgUrl2" alt="err"/>
          <v-spacer />
        </v-col>
        <!-- 檢查項目 -->
        <!-- 嘉義端隧道口外 -->
        <v-col cols="13" sm="12">
            <v-toolbar color="gradual-bg-darken-wood" dark>
            <v-spacer />
            <v-toolbar-title>嘉義端隧道口外</v-toolbar-title>
            <v-spacer />
            </v-toolbar>
        </v-col>
        <v-col cols="12" style="margin-bottom:-26px">
          <v-row no-gutter class="label-header">
            <v-col cols="12" sm="3">
              <h3 class="mb-1">檢查項目</h3>
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">問題描述</h3>
            </v-col>
            <v-col cols="12" sm="5">
              <h3 class="mb-1">危害等級判斷</h3>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-alert dense border="top" colored-border color="border-bg-dark-yellow" elevation="4"
            v-for="(item, idx) in items1" :key="item.question" class="mb-6"
            >
            <v-row no-gutter>
              <v-col cols="12" sm="3">{{ item.question }}</v-col>
              <v-col cols="12" sm="4">
                <span class="d-sm-none label-header">問題描述：</span>
                <v-textarea auto-grow outlined rows="1" v-model="ipt.items1[idx].discrip"/>
              </v-col>
              <v-col cols="12" sm="5">
                <span class="d-sm-none label-header">危險等級：</span>
                <v-radio-group dense row v-model="ipt.items1[idx].damLv" class="pa-0 ma-0">
                  <v-radio color="red" label="1" value="1"></v-radio>
                  <v-radio color="red" label="2" value="2"></v-radio>
                  <v-radio color="red" label="3" value="3"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-alert>
          <v-alert dense border="top" colored-border color="border-bg-dark-yellow" elevation="4" class="mb-6">
            <v-row no-gutter>
              <v-col cols="12" sm="3">號誌</v-col>
              <v-col cols="12" sm="4">
                <span class="d-sm-none label-header">問題描述：</span>
                <v-textarea auto-grow outlined rows="1" v-model="ipt.items1_2.discrip"/>
              </v-col>
              <v-col cols="12" sm="5">
                <h3>缺少:</h3>
                <v-row style="margin-top:-4%">
                  <v-checkbox class="mx-2" v-model="CheckOption1_1" label="隧道標示牌" value="1"></v-checkbox>
                  <v-checkbox class="mx-2" v-model="CheckOption1_2" label="禁止行人進入" value="1"></v-checkbox>
                  <v-checkbox class="mx-2" v-model="CheckOption1_3" label="罰款公告" value="1"></v-checkbox>
                </v-row>
              </v-col>
            </v-row>
          </v-alert>
        </v-col>
          <!-- 嘉義端隧道門 -->
        <v-col cols="13" sm="12">
            <v-toolbar color="gradual-bg-darken-wood" dark>
            <v-spacer />
            <v-toolbar-title>嘉義端隧道門</v-toolbar-title>
            <v-spacer />
            </v-toolbar>
        </v-col>
        <v-col cols="12" style="margin-bottom:-26px">
          <v-row no-gutter class="label-header">
            <v-col cols="12" sm="3">
              <h3 class="mb-1">檢查項目</h3>
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">問題描述</h3>
            </v-col>
            <v-col cols="12" sm="5">
              <h3 class="mb-1">危害等級判斷</h3>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-alert dense border="top" colored-border color="border-bg-dark-yellow" elevation="4"
            v-for="(item, idx) in items2" :key="item.question" class="mb-6"
            >
            <v-row no-gutter>
              <v-col cols="12" sm="3">{{ item.question }}</v-col>
              <v-col cols="12" sm="4">
                <span class="d-sm-none label-header">問題描述：</span>
                <v-textarea auto-grow outlined rows="1" v-model="ipt.items2[idx].discrip"/>
              </v-col>
              <v-col cols="12" sm="5">
                <span class="d-sm-none label-header">危險等級：</span>
                <v-radio-group dense row v-model="ipt.items2[idx].damLv" class="pa-0 ma-0">
                  <v-radio color="red" label="1" value="1"></v-radio>
                  <v-radio color="red" label="2" value="2"></v-radio>
                  <v-radio color="red" label="3" value="3"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-alert>
        </v-col>
        <!-- 隧道襯砌 -->
        <v-col cols="13" sm="12">
            <v-toolbar color="gradual-bg-darken-wood" dark>
            <v-spacer />
            <v-toolbar-title>隧道襯砌</v-toolbar-title>
            <v-spacer />
            </v-toolbar>
        </v-col>
        <v-col cols="12" style="margin-bottom:-26px">
          <v-row no-gutter class="label-header">
            <v-col cols="12" sm="3">
              <h3 class="mb-1">檢查項目</h3>
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">問題描述</h3>
            </v-col>
            <v-col cols="12" sm="5">
              <h3 class="mb-1">危害等級判斷</h3>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-alert dense border="top" colored-border color="border-bg-dark-yellow" elevation="4"
            v-for="(item, idx) in items3" :key="item.question" class="mb-6"
            >
            <v-row no-gutter>
              <v-col cols="12" sm="3">{{ item.question }}</v-col>
              <v-col cols="12" sm="4">
                <span class="d-sm-none label-header">問題描述：</span>
                <v-textarea auto-grow outlined rows="1" v-model="ipt.items3[idx].discrip"/>
              </v-col>
              <v-col cols="12" sm="5">
                <span class="d-sm-none label-header">危險等級：</span>
                <v-radio-group dense row v-model="ipt.items3[idx].damLv" class="pa-0 ma-0">
                  <v-radio color="red" label="1" value="1"></v-radio>
                  <v-radio color="red" label="2" value="2"></v-radio>
                  <v-radio color="red" label="3" value="3"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-alert>
        </v-col>
        <!-- 隧道排水 -->
        <v-col cols="13" sm="12">
            <v-toolbar color="gradual-bg-darken-wood" dark>
            <v-spacer />
            <v-toolbar-title>隧道排水</v-toolbar-title>
            <v-spacer />
            </v-toolbar>
        </v-col>
        <v-col cols="12" style="margin-bottom:-26px">
          <v-row no-gutter class="label-header">
            <v-col cols="12" sm="3">
              <h3 class="mb-1">檢查項目</h3>
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">問題描述</h3>
            </v-col>
            <v-col cols="12" sm="5">
              <h3 class="mb-1">危害等級判斷</h3>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-alert dense border="top" colored-border color="border-bg-dark-yellow" elevation="4"
            v-for="(item, idx) in items4" :key="item.question" class="mb-6"
            >
            <v-row no-gutter>
              <v-col cols="12" sm="3">{{ item.question }}</v-col>
              <v-col cols="12" sm="4">
                <span class="d-sm-none label-header">問題描述：</span>
                <v-textarea auto-grow outlined rows="1" v-model="ipt.items4[idx].discrip"/>
              </v-col>
              <v-col cols="12" sm="5">
                <span class="d-sm-none label-header">危險等級：</span>
                <v-radio-group dense row v-model="ipt.items4[idx].damLv" class="pa-0 ma-0">
                  <v-radio color="red" label="1" value="1"></v-radio>
                  <v-radio color="red" label="2" value="2"></v-radio>
                  <v-radio color="red" label="3" value="3"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-alert>
        </v-col>
        <!-- 阿里山端洞門 -->
        <v-col cols="13" sm="12">
            <v-toolbar color="gradual-bg-darken-wood" dark>
            <v-spacer />
            <v-toolbar-title>阿里山端洞門</v-toolbar-title>
            <v-spacer />
            </v-toolbar>
        </v-col>
        <v-col cols="12" style="margin-bottom:-26px">
          <v-row no-gutter class="label-header">
            <v-col cols="12" sm="3">
              <h3 class="mb-1">檢查項目</h3>
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">問題描述</h3>
            </v-col>
            <v-col cols="12" sm="5">
              <h3 class="mb-1">危害等級判斷</h3>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-alert dense border="top" colored-border color="border-bg-dark-yellow" elevation="4"
            v-for="(item, idx) in items5" :key="item.question" class="mb-6"
            >
            <v-row no-gutter>
              <v-col cols="12" sm="3">{{ item.question }}</v-col>
              <v-col cols="12" sm="4">
                <span class="d-sm-none label-header">問題描述：</span>
                <v-textarea auto-grow outlined rows="1" v-model="ipt.items5[idx].discrip"/>
              </v-col>
              <v-col cols="12" sm="5">
                <span class="d-sm-none label-header">危險等級：</span>
                <v-radio-group dense row v-model="ipt.items5[idx].damLv" class="pa-0 ma-0">
                  <v-radio color="red" label="1" value="1"></v-radio>
                  <v-radio color="red" label="2" value="2"></v-radio>
                  <v-radio color="red" label="3" value="3"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-alert>
        </v-col>
        <!-- 阿里山端隧道口外 -->
        <v-col cols="13" sm="12">
            <v-toolbar color="gradual-bg-darken-wood" dark>
            <v-spacer />
            <v-toolbar-title>阿里山端隧道口外</v-toolbar-title>
            <v-spacer />
            </v-toolbar>
        </v-col>
        <v-col cols="12" style="margin-bottom:-26px">
          <v-row no-gutter class="label-header">
            <v-col cols="12" sm="3">
              <h3 class="mb-1">檢查項目</h3>
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">問題描述</h3>
            </v-col>
            <v-col cols="12" sm="5">
              <h3 class="mb-1">危害等級判斷</h3>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-alert dense border="top" colored-border color="border-bg-dark-yellow" elevation="4"
            v-for="(item, idx) in items6" :key="item.question" class="mb-6"
            >
            <v-row no-gutter>
              <v-col cols="12" sm="3">{{ item.question }}</v-col>
              <v-col cols="12" sm="4">
                <span class="d-sm-none label-header">問題描述：</span>
                <v-textarea auto-grow outlined rows="1" v-model="ipt.items6[idx].discrip"/>
              </v-col>
              <v-col cols="12" sm="5">
                <span class="d-sm-none label-header">危險等級：</span>
                <v-radio-group dense row v-model="ipt.items6[idx].damLv" class="pa-0 ma-0">
                  <v-radio color="red" label="1" value="1"></v-radio>
                  <v-radio color="red" label="2" value="2"></v-radio>
                  <v-radio color="red" label="3" value="3"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-alert>
          <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6">
            <v-row no-gutter>
              <v-col cols="12" sm="3">號誌</v-col>
              <v-col cols="12" sm="4">
                <span class="d-sm-none label-header">問題描述：</span>
                <v-textarea auto-grow outlined rows="1" v-model="ipt.items6_2.discrip"/>
              </v-col>
              <v-col cols="12" sm="5">
                <h3>缺少:</h3>
                <v-row style="margin-top:-4%">
                    <v-checkbox class="mx-2" v-model="CheckOption22_1" label="隧道標示牌" value="1"></v-checkbox>
                    <v-checkbox class="mx-2" v-model="CheckOption22_2" label="禁止行人進入" value="1"></v-checkbox>
                    <v-checkbox class="mx-2" v-model="CheckOption22_3" label="罰款公告" value="1"></v-checkbox>
                  </v-row>
              </v-col>
            </v-row>
          </v-alert>
          
          <p style="color:red">危險等級判斷：1安全 2無立即危險但需改善或長期觀察 3 需緊急處理</p>
          <!-- 其他情況描述 -->
          <h3>其他情況描述</h3>
          <v-textarea v-model="note" auto-grow outlined rows="4" />
        </v-col>
        <v-row class="label-header">
          <v-col cols="12" sm="4">
            <h3 class="mb-1">工程員</h3>
            <v-text-field dense single-line outlined v-model="sirName1"></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <h3 class="mb-1">工務長</h3>
            <v-text-field dense single-line outlined v-model="sirName2"></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <h3 class="mb-1">監工長</h3>
            <v-text-field dense single-line outlined v-model="sirName3"></v-text-field>
          </v-col>
        </v-row>
        
        <!-- 送出 -->
        <v-col class="mt-2" cols="12">
          <v-btn large block class="mt-n8 mb-4 btn-add white--text" @click="save">送出表單</v-btn>
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
import deptSelect from "@/components/forManage/deptSelect";
import { fetchFormOrderList, fetchFormOrderOne, createFormOrder, createFormOrder0, updateFormOrder } from '@/apis/formManage/serve'
import { formDepartOptions } from '@/assets/js/departOption'
import { Actions } from "@/assets/js/actions";
import { Constrant } from "@/assets/js/constrant";
import dialogDelete from "@/components/forManage/dialogDelete";
import ToolBar from "@/components/forManage/toolbar";

export default {
  data() {
    return {
      props: ['id'],  //路由參數
      // 自定義變數
      CheckOption1_1: "0",
      CheckOption1_2: "0",
      CheckOption1_3: "0",
      CheckOption22_1: "0",
      CheckOption22_2: "0",
      CheckOption22_3: "0",
      tunnelNum: "",
      CheckDate: "",
      title: "隧道目視安全檢查表",
      newText: "檢查表",
      action: Actions.add,
      actions: Actions,
      isLoading: false,
      disabled: false,
      DB_Table: "RP039",
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
      note: "109年05月21日發生西南氣流豪雨，5/22日累積雨量達200mm以上，建立預警機制5/22日阿里山線暫時停駛。",
      temp1: "../../../assets/images/brgImg1_1.jpg",
      sbjNum: [],
      formDepartOptions: [
      // 通報單位下拉選單
      { text: "不限", value: "" },
      ...formDepartOptions,
    ],
      i_num: 0,
      manImg: require("../../../assets/images/brgImg1_1.jpg"),
      manImg2: require("../../../assets/images/brgImg1_2.jpg"),
      showImg: false,
      sirName1: "",
      sirName2: "",
      sirName3: "",
      LineType: "",
      arr:[
        "brgImg1_1.jpg",
        "brgImg1_2.jpg"
      ],
      pathType: ["直線", "曲線"],
      tunnelType: "",
      tunnelTypeList: [
        {id: "1", text: "RC襯砌"},
        {id: "2", text: "預力支堡"},
        {id: "3", text: "天然岩壁"},
        ],
      val1_1: "",
      idx: -1,
      val1_2: "",
      val1_3: "",
      val1_4: "",
      val1_5: "",
      val1_6: "",
      val1_7: "",
      val2_1: "",
      val2_2: "",
      val2_3: "",
      val2_4: "",
      val2_5: "",
      val2_6: "",
      val2_7: "",
      n01:"0",
      v1: "",
      v2: "",
      v3: "",
      v4: "",
      v5: "",
      v6: "",
      v7: "",
      v8: "",
      v9: "",
      v10: "",
      vn:[
        // 編號: 1 index: 0
        {start: "21k+402.50m", end: "21k+793.50m", len: "361", radius: "50m", slope: "5", elevation: "459",
         imgUrl1: require("../../../assets/images/tnImg1_1.jpg"), imgUrl2: require("../../..//assets/images/tnImg1_2.jpg")},
         // 編號: 2 index: 1
        {start: "23k+496.30m", end: "23k+571.80m", len: "76", radius: "70m 65m 60m", slope: "5", elevation: "557",
         imgUrl1: require("../../../assets/images/tnImg2_1.jpg"), imgUrl2: require("../../..//assets/images/tnImg2_2.jpg")},
         // 編號: 3 index: 2
         {start: "23k+618.20m", end: "24k+288.70m", len: "760", radius: "60m 60m 70m", slope: "5", elevation: "577",
         imgUrl1: require("../../../assets/images/tnImg3_1.jpg"), imgUrl2: require("../../..//assets/images/tnImg3_2.jpg")},
         // 編號: 4 index: 3
         {start: "24k+348.10m", end: "24k+537.70m", len: "190", radius: "60m", slope: "5", elevation: "601",
         imgUrl1: require("../../../assets/images/tnImg4_1.jpg"), imgUrl2: require("../../..//assets/images/tnImg4_2.jpg")},
         // 編號: 5 index: 4
         {start: "24k+903.00m", end: "25k+129.50m", len: "267", radius: "0m", slope: "5", elevation: "631",
         imgUrl1: require("../../../assets/images/tnImg5_1.jpg"), imgUrl2: require("../../..//assets/images/tnImg5_2.jpg")},
         // 編號: 6 index: 5
         {start: "25k+582.50m", end: "25k+942.90m", len: "360", radius: "60m 65m 60m 60m 70m", slope: "5", elevation: "668",
         imgUrl1: require("../../../assets/images/tnImg6_1.jpg"), imgUrl2: require("../../..//assets/images/tnImg6_2.jpg")},
         // 編號: 7 index: 6
         {start: "26k+058.80m", end: "26k+116.30m", len: "58", radius: "70m 60m 70m", slope: "5", elevation: "685",
         imgUrl1: require("../../../assets/images/tnImg7_1.jpg"), imgUrl2: require("../../..//assets/images/tnImg7_2.jpg")},
         // 編號: 8 index: 7
         {start: "26k+438.90m", end: "26k+563.45m", len: "125", radius: "80m 60m 60m 70m 50m", slope: "5", elevation: "706",
         imgUrl1: require("../../../assets/images/tnImg8_1.jpg"), imgUrl2: require("../../..//assets/images/tnImg8_2.jpg")},
         // 編號: 9 index: 8
         {start: "27k+107.60m", end: "27k+285.00m", len: "177", radius: "80m 50m 50m", slope: "5", elevation: "742",
         imgUrl1: require("../../../assets/images/tnImg9_1.jpg"), imgUrl2: require("../../..//assets/images/tnImg9_2.jpg")},
         // 編號: 10 index: 9
         {start: "27k+422.59m", end: "27k+548.15m", len: "126", radius: "110m 80m 50m", slope: "0", elevation: "743",
         imgUrl1: require("../../../assets/images/tnImg10_1.jpg"), imgUrl2: require("../../..//assets/images/tnImg10_2.jpg")},
         // 編號: 11 index: 10
         {start: "27k+683.20m", end: "27k+753.20m", len: "70", radius: "50m", slope: "5", elevation: "752",
         imgUrl1: require("../../../assets/images/tnImg11_1.jpg"), imgUrl2: require("../../..//assets/images/tnImg11_2.jpg")},
         // 編號: 12 index: 11
         {start: "27k+828.60m", end: "27k+995.40m", len: "167", radius: "50m 50m 60m", slope: "5", elevation: "762",
         imgUrl1: require("../../../assets/images/tnImg12_1.jpg"), imgUrl2: require("../../..//assets/images/tnImg12_2.jpg")},
         // 編號: 13 index: 12
         {start: "29k+587.60m", end: "30k+125.70m", len: "538", radius: "100m 90m 70m 70m 60m", slope: "5", elevation: "857",
         imgUrl1: require("../../../assets/images/tnImg13_1.jpg"), imgUrl2: require("../../..//assets/images/tnImg13_2.jpg")},
         // 編號: 14 index: 13
         {start: "30k+211.50m", end: "30k+529.10m", len: "518", radius: "80m", slope: "5", elevation: "884",
         imgUrl1: require("../../../assets/images/tnImg14_1.jpg"), imgUrl2: require("../../..//assets/images/tnImg14_2.jpg")},
         // 編號: 15 index: 14
         {start: "31k+058.40m", end: "31k+234.61m", len: "176", radius: "180m 200m", slope: "5", elevation: "904",
         imgUrl1: require("../../../assets/images/tnImg15_1.jpg"), imgUrl2: require("../../..//assets/images/tnImg15_2.jpg")},

      ],
      ipt: {
          // 嘉義端隧道口外
        items1: [
            { discrip: "", damLv: "0" },
            { discrip: "", damLv: "0" },
            { discrip: "", damLv: "0" },
        ],
        items1_2: { discrip: "", damLv: "0" },
        items2: [// 嘉義端隧道門
          { discrip: "", damLv: "0" },
          { discrip: "", damLv: "0" },
          { discrip: "", damLv: "0" },
        ],
        items3: [// 隧道襯砌
          { discrip: "", damLv: "0" },
          { discrip: "", damLv: "0" },
          { discrip: "", damLv: "0" },
          { discrip: "", damLv: "0" },
          { discrip: "", damLv: "0" },
          { discrip: "", damLv: "0" },
        ],
        items4: [// 隧道排水
          { discrip: "", damLv: "0" },
          { discrip: "", damLv: "0" },
        ],
        items5: [// 阿里山端洞門
          { discrip: "", damLv: "0" },
          { discrip: "", damLv: "0" },
          { discrip: "", damLv: "0" },
        ],
        items6: [// 阿里山端隧道口外
          { discrip: "", damLv: "0" },
          { discrip: "", damLv: "0" },
          { discrip: "", damLv: "0" },
        ],
        items6_2: { discrip: "", damLv: "0" },
      },
      items1: [
        { question: "山頂排水、墾植與地變" },
        { question: "路塹擋土墻及崩坍" },
        { question: "排水設施" },
      ],
    //   嘉義端隧道門
      items2: [
        { question: "裂痕" },
        { question: "傾斜、沉陷" },
        { question: "鼓凸、破損" },
      ],
    //   隧道襯砌
      items3: [
        { question: "襯砌裂痕" },
        { question: "傾斜、沉陷" },
        { question: "鼓凸、破損" },
        { question: "施工縫分離、錯動" },
        { question: "漏水" },
        { question: "岩壁風化落石" },
      ],
      items4: [// 隧道排水
        { question: "積水" },
        { question: "排水管、邊溝、暗溝堵塞" },
      ],
      items5: [// 阿里山端洞門
        { question: "裂痕" },
        { question: "傾斜、沉陷" },
        { question: "鼓凸、破損" },
      ],
      items6: [// 阿里山端隧道口外
        { question: "山頂排水、墾植與地變" },
        { question: "路塹擋土墻及崩坍" },
        { question: "排水設施" },
      ],
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
  components: { Pagination }, // 頁碼
  computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
    created() {
      this.nowTime = getTodayDateString();
      this.doMan.name = this.userData.UserName;
      var i = 1;
      for(i; i <= 15; i++ ){
        this.sbjNum.push("編號" + i);
      }
      let rid = this.$route.params.id; // 管理頁傳來的id
      //判斷新增還是編輯
      if(rid.substr(0, 2) == "編號"){
        this.action = Actions.add
        this.CheckDate = this.nowTime;
        this.tunnelNum = rid;
        this.s01Change();
      }
      else{
        // 編輯 抓資料
        this.action = Actions.edit
        this.RPFlowNo = rid
        this.chLoadingShow({ show: true});
        fetchFormOrderOne({
          ClientReqTime: getNowFullTime(), // client 端請求時間
          OperatorID: this.userData.UserId, // 操作人id
          KeyName: this.DB_Table, // DB table
          KeyItem: [{ Column: "RPFlowNo", Value: rid }],
          QyName: [
            "CheckDay",
            "TunnelID",
            "Engineer",
            "WorksChief",
            "Supervisor",
            "LineType",
            "Length",
            "Start",
            "Finish",
            "Type",  
            "Slope", 
            "Height",
            "CurveRadius",
            "CheckOption1",
            "CheckOptionLv1",
            "CheckOption1_1",
            "CheckOption1_2",
            "CheckOption1_3",
            "CheckOption2",
            "CheckOptionLv2",
            "CheckOption3",
            "CheckOptionLv3",
            "CheckOption4",
            "CheckOptionLv4",
            "CheckOption5",
            "CheckOptionLv5",
            "CheckOption6",
            "CheckOptionLv6",
            "CheckOption7",
            "CheckOptionLv7",
            "CheckOption8",
            "CheckOptionLv8",
            "CheckOption9",
            "CheckOptionLv9",
            "CheckOption10",
            "CheckOptionLv10",
            "CheckOption11",
            "CheckOptionLv11",
            "CheckOption12",
            "CheckOptionLv12",
            "CheckOption13",
            "CheckOptionLv13",
            "CheckOption14",
            "CheckOptionLv14",
            "CheckOption15",
            "CheckOptionLv15",
            "CheckOption16",
            "CheckOptionLv16",
            "CheckOption17",
            "CheckOptionLv17",
            "CheckOption18",
            "CheckOptionLv18",
            "CheckOption19",
            "CheckOptionLv19",
            "CheckOption20",
            "CheckOptionLv20",
            "CheckOption21",
            "CheckOptionLv21",
            "CheckOption22",
            "CheckOption22_1",
            "CheckOption22_2",
            "CheckOption22_3",
            "Memo"
          ],
        })
          .then((res) => {
            let dat = (JSON.parse(res.data.DT))[0];
            this.tunnelNum = '編號' + dat.TunnelID
            this.CheckDate = dat.CheckDay
            this.LineType = dat.LineType
            this.tunnelType = dat.Type
            this.sirName1 = dat.Engineer
            this.sirName2 = dat.WorksChief
            this.sirName3 = dat.Supervisor
            this.v3 = dat.Length
            this.v1 = dat.Start
            this.v2 = dat.Finish
            this.v5 = dat.Slope
            this.v6 = dat.Height
            this.v4 = dat.CurveRadius
            this.CheckOption1_1 = dat.CheckOption1_1
            this.CheckOption1_2 = dat.CheckOption1_2
            this.CheckOption1_3 = dat.CheckOption1_3
            this.ipt.items1[0].discrip = dat.CheckOption1
            this.ipt.items1[0].damLv = dat.CheckOptionLv1
            this.ipt.items1[1].discrip = dat.CheckOption2
            this.ipt.items1[1].damLv = dat.CheckOptionLv2
            this.ipt.items1[2].discrip = dat.CheckOption3
            this.ipt.items1[2].damLv = dat.CheckOptionLv3
            this.ipt.items1_2.discrip = dat.CheckOption4
            this.ipt.items1_2.damLv = dat.CheckOptionLv4
            this.ipt.items2[0].discrip = dat.CheckOption5
            this.ipt.items2[0].damLv = dat.CheckOptionLv5
            this.ipt.items2[1].discrip = dat.CheckOption6
            this.ipt.items2[1].damLv = dat.CheckOptionLv6
            this.ipt.items2[2].discrip = dat.CheckOption7
            this.ipt.items2[2].damLv = dat.CheckOptionLv7
            this.ipt.items3[0].discrip = dat.CheckOption8
            this.ipt.items3[0].damLv = dat.CheckOptionLv8
            this.ipt.items3[1].discrip = dat.CheckOption9
            this.ipt.items3[1].damLv = dat.CheckOptionLv9
            this.ipt.items3[2].discrip = dat.CheckOption10
            this.ipt.items3[2].damLv = dat.CheckOptionLv10
            this.ipt.items3[3].discrip = dat.CheckOption11
            this.ipt.items3[3].damLv = dat.CheckOptionLv11
            this.ipt.items3[4].discrip = dat.CheckOption12
            this.ipt.items3[4].damLv = dat.CheckOptionLv12
            this.ipt.items3[5].discrip = dat.CheckOption13
            this.ipt.items3[5].damLv = dat.CheckOptionLv13
            this.ipt.items4[0].discrip = dat.CheckOption14
            this.ipt.items4[0].damLv = dat.CheckOptionLv14
            this.ipt.items4[1].discrip = dat.CheckOption15
            this.ipt.items4[1].damLv = dat.CheckOptionLv15
            this.ipt.items5[0].discrip = dat.CheckOption16
            this.ipt.items5[0].damLv = dat.CheckOptionLv16
            this.ipt.items5[1].discrip = dat.CheckOption17
            this.ipt.items5[1].damLv = dat.CheckOptionLv17
            this.ipt.items5[2].discrip = dat.CheckOption18
            this.ipt.items5[2].damLv = dat.CheckOptionLv18
            this.ipt.items6[0].discrip = dat.CheckOption19
            this.ipt.items6[0].damLv = dat.CheckOptionLv19
            this.ipt.items6[1].discrip = dat.CheckOption20
            this.ipt.items6[1].damLv = dat.CheckOptionLv20
            this.ipt.items6[2].discrip = dat.CheckOption21
            this.ipt.items6[2].damLv = dat.CheckOptionLv21
            this.ipt.items6_2.discrip = dat.CheckOption22
            this.CheckOption22_1 = dat.CheckOption22_1
            this.CheckOption22_2 = dat.CheckOption22_2
            this.CheckOption22_3 = dat.CheckOption22_3
            this.note = dat.Memo
            this.s01Change();
          })
          .catch((err) => {
            this.chMsgbar({ success: false, msg: Constrant.query.failed });
          })
          .finally(() => {
            this.chLoadingShow({ show: false});
          });
      }
    },
  methods: {
    ...mapActions('system', [
      "chMsgbar", // messageBar
        'chLoadingShow',  // 切換 loading 圖顯示
    ]),
    s01Change(){
      this.showImg = true;
      var i = -1;
      i = Number(this.tunnelNum.substr(2)) - 1;
      this.i_num = i;
      if(i > -1){
        this.v1 = this.vn[i].start;
        this.v2 = this.vn[i].end;
        this.v3 = this.vn[i].len;
        this.v4 = this.vn[i].radius;
        this.v5 = this.vn[i].slope;
        this.v6 = this.vn[i].elevation;
        // this.manImg = this.vn[i].imgUrl1;
        // this.manImg2 = this.vn[i].imgUrl2;
      }
    },
    // 存
    save() {
      this.chLoadingShow({show:true})
      this.CheckOption1_1 = (this.CheckOption1_1 == undefined)?"0":this.CheckOption1_1;
      this.CheckOption1_2 = (this.CheckOption1_2 == undefined)?"0":this.CheckOption1_2;
      this.CheckOption1_3 = (this.CheckOption1_3 == undefined)?"0":this.CheckOption1_3;
      this.CheckOption22_1 = (this.CheckOption22_1 == undefined)?"0":this.CheckOption22_1;
      this.CheckOption22_2 = (this.CheckOption22_2 == undefined)?"0":this.CheckOption22_2;
      this.CheckOption22_3 = (this.CheckOption22_3 == undefined)?"0":this.CheckOption22_3;
      if (this.action == Actions.add){
        console.log("new one!")
        //-----新增-----
        createFormOrder0({
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id this.doMan.name = this.userData.UserName
          // OperatorID: "16713",  // 操作人id
          KeyName: this.DB_Table,  // DB table
          KeyItem:[
            {Column:"CheckDay", Value: this.CheckDate },
            {Column:"TunnelID", Value: this.tunnelNum.substr(2) },
            {Column:"Engineer",Value:this.sirName1},
            {Column:"WorksChief",Value:this.sirName2},
            {Column:"Supervisor",Value:this.sirName3},
            {Column:"LineType",Value:this.LineType},
            {Column:"Length",Value:this.v3},
            {Column:"Start",Value:this.v1},
            {Column:"Finish",Value:this.v2},
            {Column:"Type",Value:this.tunnelType},
            {Column:"Slope",Value:this.v5},
            {Column:"Height",Value:this.v6},
            {Column:"CurveRadius",Value:this.v4},
            {Column:"CheckOption1",Value:this.ipt.items1[0].discrip},
            {Column:"CheckOptionLv1",Value:this.ipt.items1[0].damLv},
            {Column:"CheckOption1_1",Value:this.CheckOption1_1},
            {Column:"CheckOption1_2",Value:this.CheckOption1_2},
            {Column:"CheckOption1_3",Value:this.CheckOption1_3},
            {Column:"CheckOption2",Value:this.ipt.items1[1].discrip},
            {Column:"CheckOptionLv2",Value:this.ipt.items1[1].damLv},
            {Column:"CheckOption3",Value:this.ipt.items1[2].discrip},
            {Column:"CheckOptionLv3",Value:this.ipt.items1[2].damLv},
            {Column:"CheckOption4",Value:this.ipt.items1_2.discrip},
            {Column:"CheckOptionLv4",Value:this.ipt.items1_2.damLv},
            {Column:"CheckOption5",Value:this.ipt.items2[0].discrip},
            {Column:"CheckOptionLv5",Value:this.ipt.items2[0].damLv},
            {Column:"CheckOption6",Value:this.ipt.items2[1].discrip},
            {Column:"CheckOptionLv6",Value:this.ipt.items2[1].damLv},
            {Column:"CheckOption7",Value:this.ipt.items2[2].discrip},
            {Column:"CheckOptionLv7",Value:this.ipt.items2[2].damLv},
            {Column:"CheckOption8",Value:this.ipt.items3[0].discrip},
            {Column:"CheckOptionLv8",Value:this.ipt.items3[0].damLv},
            {Column:"CheckOption9",Value:this.ipt.items3[1].discrip},
            {Column:"CheckOptionLv9",Value:this.ipt.items3[1].damLv},
            {Column:"CheckOption10",Value:this.ipt.items3[2].discrip},
            {Column:"CheckOptionLv10",Value:this.ipt.items3[2].damLv},
            {Column:"CheckOption11",Value:this.ipt.items3[3].discrip},
            {Column:"CheckOptionLv11",Value:this.ipt.items3[3].damLv},
            {Column:"CheckOption12",Value:this.ipt.items3[4].discrip},
            {Column:"CheckOptionLv12",Value:this.ipt.items3[4].damLv},
            {Column:"CheckOption13",Value:this.ipt.items3[5].discrip},
            {Column:"CheckOptionLv13",Value:this.ipt.items3[5].damLv},
            {Column:"CheckOption14",Value:this.ipt.items4[0].discrip},
            {Column:"CheckOptionLv14",Value:this.ipt.items4[0].damLv},
            {Column:"CheckOption15",Value:this.ipt.items4[1].discrip},
            {Column:"CheckOptionLv15",Value:this.ipt.items4[1].damLv},
            {Column:"CheckOption16",Value:this.ipt.items5[0].discrip},
            {Column:"CheckOptionLv16",Value:this.ipt.items5[0].damLv},
            {Column:"CheckOption17",Value:this.ipt.items5[1].discrip},
            {Column:"CheckOptionLv17",Value:this.ipt.items5[1].damLv},
            {Column:"CheckOption18",Value:this.ipt.items5[2].discrip},
            {Column:"CheckOptionLv18",Value:this.ipt.items5[2].damLv},
            {Column:"CheckOption19",Value:this.ipt.items6[0].discrip},
            {Column:"CheckOptionLv19",Value:this.ipt.items6[0].damLv},
            {Column:"CheckOption20",Value:this.ipt.items6[1].discrip},
            {Column:"CheckOptionLv20",Value:this.ipt.items6[1].damLv},
            {Column:"CheckOption21",Value:this.ipt.items6[2].discrip},
            {Column:"CheckOptionLv21",Value:this.ipt.items6[2].damLv},
            {Column:"CheckOption22",Value:this.ipt.items6_2.discrip},
            {Column:"CheckOption22_1",Value:this.CheckOption22_1},
            {Column:"CheckOption22_2",Value:this.CheckOption22_2},
            {Column:"CheckOption22_3",Value:this.CheckOption22_3},
            {Column:"Memo",Value:this.note},
          ]
        }).then(res => {
         this.chMsgbar({ success: true, msg: Constrant.insert.success });
        }).catch(err => {
          this.chMsgbar({ success: true, msg: Constrant.insert.failed });
        }).finally(() => {
          this.chLoadingShow({show:false})
          // this.chLoadingShow({show:true})
        })
      }
      else{
        //-----編輯-----
        console.log("update!")
        updateFormOrder({
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id this.doMan.name = this.userData.UserName
          // OperatorID: "16713",  // 操作人id
          KeyName: this.DB_Table,  // DB table
          RPFlowNo: this.RPFlowNo,
          KeyItem:[
            {Column:"CheckDay", Value: this.CheckDate },
            {Column:"TunnelID", Value: this.tunnelNum.substr(2) },
            {Column:"Engineer",Value:this.sirName1},
            {Column:"WorksChief",Value:this.sirName2},
            {Column:"Supervisor",Value:this.sirName3},
            {Column:"LineType",Value:this.LineType},
            {Column:"Length",Value:this.v3},
            {Column:"Start",Value:this.v1},
            {Column:"Finish",Value:this.v2},
            {Column:"Type",Value:this.tunnelType.id},
            {Column:"Slope",Value:this.v5},
            {Column:"Height",Value:this.v6},
            {Column:"CurveRadius",Value:this.v4},
            {Column:"CheckOption1",Value:this.ipt.items1[0].discrip},
            {Column:"CheckOptionLv1",Value:this.ipt.items1[0].damLv},
            {Column:"CheckOption1_1",Value:this.CheckOption1_1},
            {Column:"CheckOption1_2",Value:this.CheckOption1_2},
            {Column:"CheckOption1_3",Value:this.CheckOption1_3},
            {Column:"CheckOption2",Value:this.ipt.items1[1].discrip},
            {Column:"CheckOptionLv2",Value:this.ipt.items1[1].damLv},
            {Column:"CheckOption3",Value:this.ipt.items1[2].discrip},
            {Column:"CheckOptionLv3",Value:this.ipt.items1[2].damLv},
            {Column:"CheckOption4",Value:this.ipt.items1_2.discrip},
            {Column:"CheckOptionLv4",Value:this.ipt.items1_2.damLv},
            {Column:"CheckOption5",Value:this.ipt.items2[0].discrip},
            {Column:"CheckOptionLv5",Value:this.ipt.items2[0].damLv},
            {Column:"CheckOption6",Value:this.ipt.items2[1].discrip},
            {Column:"CheckOptionLv6",Value:this.ipt.items2[1].damLv},
            {Column:"CheckOption7",Value:this.ipt.items2[2].discrip},
            {Column:"CheckOptionLv7",Value:this.ipt.items2[2].damLv},
            {Column:"CheckOption8",Value:this.ipt.items3[0].discrip},
            {Column:"CheckOptionLv8",Value:this.ipt.items3[0].damLv},
            {Column:"CheckOption9",Value:this.ipt.items3[1].discrip},
            {Column:"CheckOptionLv9",Value:this.ipt.items3[1].damLv},
            {Column:"CheckOption10",Value:this.ipt.items3[2].discrip},
            {Column:"CheckOptionLv10",Value:this.ipt.items3[2].damLv},
            {Column:"CheckOption11",Value:this.ipt.items3[3].discrip},
            {Column:"CheckOptionLv11",Value:this.ipt.items3[3].damLv},
            {Column:"CheckOption12",Value:this.ipt.items3[4].discrip},
            {Column:"CheckOptionLv12",Value:this.ipt.items3[4].damLv},
            {Column:"CheckOption13",Value:this.ipt.items3[5].discrip},
            {Column:"CheckOptionLv13",Value:this.ipt.items3[5].damLv},
            {Column:"CheckOption14",Value:this.ipt.items4[0].discrip},
            {Column:"CheckOptionLv14",Value:this.ipt.items4[0].damLv},
            {Column:"CheckOption15",Value:this.ipt.items4[1].discrip},
            {Column:"CheckOptionLv15",Value:this.ipt.items4[1].damLv},
            {Column:"CheckOption16",Value:this.ipt.items5[0].discrip},
            {Column:"CheckOptionLv16",Value:this.ipt.items5[0].damLv},
            {Column:"CheckOption17",Value:this.ipt.items5[1].discrip},
            {Column:"CheckOptionLv17",Value:this.ipt.items5[1].damLv},
            {Column:"CheckOption18",Value:this.ipt.items5[2].discrip},
            {Column:"CheckOptionLv18",Value:this.ipt.items5[2].damLv},
            {Column:"CheckOption19",Value:this.ipt.items6[0].discrip},
            {Column:"CheckOptionLv19",Value:this.ipt.items6[0].damLv},
            {Column:"CheckOption20",Value:this.ipt.items6[1].discrip},
            {Column:"CheckOptionLv20",Value:this.ipt.items6[1].damLv},
            {Column:"CheckOption21",Value:this.ipt.items6[2].discrip},
            {Column:"CheckOptionLv21",Value:this.ipt.items6[2].damLv},
            {Column:"CheckOption22",Value:this.ipt.items6_2.discrip},
            {Column:"CheckOption22_1",Value:this.CheckOption22_1},
            {Column:"CheckOption22_2",Value:this.CheckOption22_2},
            {Column:"CheckOption22_3",Value:this.CheckOption22_3},
            {Column:"Memo",Value:this.note},
          ]
        }).then(res => {
          if(res.data.ErrorCode == 0) this.chMsgbar({ success: true, msg: Constrant.update.success });
        }).catch(err => {
          this.chMsgbar({ success: true, msg: Constrant.update.failed });
        }).finally(() => {
          this.chLoadingShow({show:false})
          // this.chLoadingShow({show:true})
        })
      }
      this.$router.push({ path: "/form-manage/maintain/tunnel-visual-safety-checklist" });
    },
    // 關閉 dialogx
    closeWorkLogModal() {
      this.AddWorkLogModal = false;
    },
  },
};
</script>

<style>
.hideText{
    color:white;
}
.fa .v-input__prepend-outer {
    width: 31%;
}
.fe .v-input__prepend-outer {
    width: 43%;
}
.ge .v-input__prepend-outer {
    width: 30%;
}
.iwidth {
  width: 65px;
}
.aa {
  width: 14%;
}
.xwd {
  max-width: 13%;
}
@media only screen and (max-width: 600px) {
  .xwd {
    max-width: 100%;
  }
  .aa {
    max-width: 100%;
    flex-basis: auto;
  }
}

</style>