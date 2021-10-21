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
                    <v-text-field v-model.trim="zs" outlined v-on="on" dense single-line />
                  </template>
                  <v-date-picker
                    color="primary"
                    v-model="zs"
                    @input="MaintenanceDay = false"
                    locale="zh-tw"
                  />
                </v-menu>
              </v-col>
              <v-col cols="12" sm="3">
                <h3 class="mb-1">橋梁編號</h3>
                <v-select solo style="width:180px;" placeholder="橋梁編號" return-object dense single-line 
                  :items="sbjNum" outlined @change="s01Change" v-model="bridgeNum"/>
              </v-col>
              <v-col cols="12" sm="3">
                <h3 class="mb-1">路線</h3>
                <v-select solo style="width:180px;" placeholder="直/曲" return-object dense single-line 
                  :items="pathType" outlined v-model="LineType"/>
              </v-col>
              <v-col cols="12" sm="2">
                <h3 class="mb-1">長度</h3>
                <v-text-field dense v-on:click="showlog" single-line outlined readonly v-model="v3"><span slot="append">m</span></v-text-field>
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
                <h3 class="mb-1">橋樑型式</h3>
                <v-text-field dense single-line outlined readonly v-model="v7"></v-text-field>
              </v-col>
              
            </v-row>
            <!-- row3 -->
            <v-row>
              <v-col cols="12" sm="2">
                <h3 class="mb-1">坡度</h3>
                <v-text-field dense single-line outlined readonly v-model="v5"><span slot="append">%</span></v-text-field>
              </v-col>
              <v-col cols="12" sm="5">
                <h3 class="mb-1">標高(以嘉義端橋台高程為準)</h3>
                <v-text-field dense single-line outlined readonly v-model="v6"><span slot="append">m</span></v-text-field>
              </v-col>
              <v-col cols="12" sm="2">
                <h3 class="mb-1">曲線半徑</h3>
                <v-text-field dense single-line outlined readonly v-model="v4"><span slot="append">m</span></v-text-field>
              </v-col>
              <v-col cols="12" sm="2">
                <h3 class="mb-1">孔數</h3>
                <v-text-field dense single-line outlined readonly v-model="v8"></v-text-field>
              </v-col>
            </v-row>
            <!-- row4 -->
            <v-row>
              <v-col cols="12" sm="5">
                <h3 class="mb-1">橋台高度</h3>
                <v-text-field dense single-line outlined readonly v-model="v9" class="fa">
                  <span slot="prepend">嘉義端:</span>
                  <span slot="append">m</span>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="5">
                <h3 class="mb-1" style="color:white">橋台高度</h3>
                <v-text-field dense single-line outlined readonly v-model="v10" class="fe">
                  <span slot="prepend">阿里山端:</span>
                  <span slot="append">m</span>
                </v-text-field>
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
        <v-row no-gutter class="label-header" style="width: 100%">
          <v-col class="aa">
            <h3 class="mb-1">橋墩高度</h3>
            <v-text-field type="number" readonly dense single-line outlined v-model="val1_1">123
              <span slot="prepend">1:</span>
              <span slot="append">m</span>
            </v-text-field>
          </v-col>
          <v-col class="aa">
            <h3 class="hideText mb-1">_</h3>
            <v-text-field type="number" readonly dense single-line outlined v-model="val1_2">
              <span slot="prepend">2:</span>
              <span slot="append">m</span>
            </v-text-field>
          </v-col>
          <v-col class="aa">
            <h3 class="hideText mb-1">_</h3>
            <v-text-field type="number" readonly dense single-line outlined v-model="val1_3">
              <span slot="prepend">3:</span>
              <span slot="append">m</span>
            </v-text-field>
          </v-col>
          <v-col class="aa">
            <h3 class="hideText mb-1">_</h3>
            <v-text-field type="number" readonly dense single-line outlined v-model="val1_4">
              <span slot="prepend">4:</span>
              <span slot="append">m</span>
            </v-text-field>
          </v-col>
          <v-col class="aa">
            <h3 class="hideText mb-1">_</h3>
            <v-text-field type="number" readonly dense single-line outlined v-model="val1_5">
              <span slot="prepend">5:</span>
              <span slot="append">m</span>
            </v-text-field>
          </v-col>
          <v-col class="aa">
            <h3 class="hideText mb-1">_</h3>
            <v-text-field type="number" readonly dense single-line outlined v-model="val1_6">
              <span slot="prepend">6:</span>
              <span slot="append">m</span>
            </v-text-field>
          </v-col>
          <v-col class="aa">
            <h3 class="hideText mb-1">_</h3>
            <v-text-field type="number" readonly dense single-line outlined v-model="val1_7">
              <span slot="prepend">7:</span>
              <span slot="append">m</span>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutter class="label-header" style="width: 100%">
          <v-col class="aa">
            <h3 class="mb-1">簡支樑長度</h3>
            <v-text-field type="number" readonly dense single-line outlined v-model="val2_1">
              <span slot="prepend">1:</span>
              <span slot="append">m</span>
            </v-text-field>
          </v-col>
          <v-col class="aa">
            <h3 class="hideText mb-1">_</h3>
            <v-text-field type="number" readonly dense single-line outlined v-model="val2_2">
              <span slot="prepend">2:</span>
              <span slot="append">m</span>
            </v-text-field>
          </v-col>
          <v-col class="aa">
            <h3 class="hideText mb-1">_</h3>
            <v-text-field type="number" readonly dense single-line outlined v-model="val2_3">
              <span slot="prepend">3:</span>
              <span slot="append">m</span>
            </v-text-field>
          </v-col>
          <v-col class="aa">
            <h3 class="hideText mb-1">_</h3>
            <v-text-field type="number" readonly dense single-line outlined v-model="val2_4">
              <span slot="prepend">4:</span>
              <span slot="append">m</span>
            </v-text-field>
          </v-col>
          <v-col class="aa">
            <h3 class="hideText mb-1">_</h3>
            <v-text-field type="number" readonly dense single-line outlined v-model="val2_5">
              <span slot="prepend">5:</span>
              <span slot="append">m</span>
            </v-text-field>
          </v-col>
          <v-col class="aa">
            <h3 class="hideText mb-1">_</h3>
            <v-text-field type="number" readonly dense single-line outlined v-model="val2_6">
              <span slot="prepend">6:</span>
              <span slot="append">m</span>
            </v-text-field>
          </v-col>
          <v-col class="aa">
            <h3 class="hideText mb-1">_</h3>
            <v-text-field type="number" readonly dense single-line outlined v-model="val2_7">
              <span slot="prepend">7:</span>
              <span slot="append">m</span>
            </v-text-field>
          </v-col>
        </v-row>
        <!-- 檢查項目 -->
        <v-col cols="12" style="margin-bottom:-26px">
          <v-row no-gutter class="label-header">
            <v-col cols="12" sm="6">
              <h3 class="mb-1">檢查項目</h3>
            </v-col>
            <v-col cols="12" sm="3">
              <h3 class="mb-1">檢查結果</h3>
            </v-col>
            <v-col cols="12" sm="3">
              <h3 class="mb-1">危害等級</h3>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <!-- 檢查項目 1 ~ 3 -->
          <v-alert
            dense
            border="top"
            colored-border
            color="border-bg-dark-yellow"
            elevation="4"
            v-for="(item, idx) in items1"
            :key="item.question"
            class="mb-6"
          >
            <v-row no-gutter>
              <v-col cols="12" sm="6">{{ item.question }}</v-col>
              <v-col cols="12" sm="3">
                <span class="d-sm-none label-header">檢查結果：</span>
                <v-radio-group dense row v-model="ipt.items1[idx].result" class="pa-0 ma-0">
                  <v-radio color="success" label="無" value="1"></v-radio>
                  <v-radio color="red" label="嘉義側" value="2"></v-radio>
                  <v-radio color="black" label="阿里山側" value="3"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" sm="3">
                <span class="d-sm-none label-header">危害等級：</span>
                <v-radio-group dense row v-model="ipt.items1[idx].damLv" class="pa-0 ma-0">
                  <v-radio color="red" label="1" value="1"></v-radio>
                  <v-radio color="red" label="2" value="2"></v-radio>
                  <v-radio color="red" label="3" value="3"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-alert>
          <!-- 檢查項目 4 ~ 7 -->
          <v-alert
            dense
            border="top"
            colored-border
            color="border-bg-dark-yellow"
            elevation="4"
            v-for="(item, idx) in items2"
            :key="item.question"
            class="mb-6"
          >
            <v-row no-gutter>
              <v-col cols="12" sm="6">{{ item.question }}</v-col>
              <v-col cols="12" sm="3">
                <span class="d-sm-none label-header">檢查結果：</span>
                <v-radio-group dense row v-model="ipt.items2[idx].result" class="pa-0 ma-0">
                  <v-radio color="success" label="無" value="1"></v-radio>
                  <v-radio color="red" label="編號" value="2"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" sm="3">
                <span class="d-sm-none label-header">危害等級：</span>
                <v-radio-group dense row v-model="ipt.items2[idx].damLv" class="pa-0 ma-0">
                  <v-radio color="red" label="1" value="1"></v-radio>
                  <v-radio color="red" label="2" value="2"></v-radio>
                  <v-radio color="red" label="3" value="3"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-alert>
          <!-- 檢查項目 8 -->
          <v-alert
            dense
            border="top"
            colored-border
            color="border-bg-dark-yellow"
            elevation="4"
            class="rt mb-6"
          >
            <v-row no-gutter>
              <v-col cols="12" sm="6">{{ items3[0].question }}</v-col>
              <v-col cols="12" sm="3">
                <span class="d-sm-none label-header">檢查結果：</span>
                <v-radio-group dense row v-model="ipt.items3[0].result" class="pa-0 ma-0">
                  <v-radio color="success" label="無" value="1"></v-radio>
                  <v-radio color="red" label="編號" value="2"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" sm="3">
                
              </v-col>
            </v-row>
          </v-alert>
          <!-- 檢查項目 9 -->
          <v-alert
            dense
            border="top"
            colored-border
            color="border-bg-dark-yellow"
            elevation="4"
            class="rt mb-6"
          >
            <v-row no-gutter>
              <v-col cols="12" sm="6">{{ items4[0].question }}</v-col>
              <v-col cols="12" sm="3">
                <span class="d-sm-none label-header">檢查結果：</span>
                <v-radio-group dense row v-model="ipt.items4[0].result" class="pa-0 ma-0">
                  <v-radio color="success" label="無" value="1"></v-radio>
                  <v-radio color="red" label="編號" value="2"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" sm="3">
                <span class="d-sm-none label-header">危害等級：</span>
                <v-radio-group dense row v-model="ipt.items4[0].damLv" class="pa-0 ma-0">
                  <v-radio color="red" label="1" value="1"></v-radio>
                  <v-radio color="red" label="2" value="2"></v-radio>
                  <v-radio color="red" label="3" value="3"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-alert>
          <!-- 檢查項目 10 ~ 18 -->
          <v-alert
            dense
            border="top"
            colored-border
            color="border-bg-dark-yellow"
            elevation="4"
            v-for="(item, idx) in items5"
            :key="item.question"
            class="mb-6"
          >
            <v-row no-gutter>
              <v-col cols="12" sm="6">{{ item.question }}</v-col>
              <v-col cols="12" sm="3">
                <span class="d-sm-none label-header">檢查結果：</span>
                <v-radio-group dense row v-model="ipt.items5[idx].result" class="pa-0 ma-0">
                  <v-radio color="success" label="無" value="1"></v-radio>
                  <v-radio color="red" label="有" value="2"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" sm="3">
                
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
          <v-btn large block class="mt-n8 mb-4" color="success" @click="save">送出表單</v-btn>
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
import dialogDelete from "@/components/forManage/dialogDelete";
import ToolBar from "@/components/forManage/toolbar";

export default {
  data() {
    return {
      props: ['id'],  //路由參數
      // 自定義變數
      bridgeNum: "",
      zs: "",
      title: "橋梁目視安全檢查表",
      newText: "檢查表",
      action: Actions.add,
      actions: Actions,
      isLoading: false,
      disabled: false,
      DB_Table: "RP038",
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
      formDepartOptions: [
        // 通報單位下拉選單
        { text: "不限", value: "" },
        ...formDepartOptions,
      ],
      note: "109年05月21日發生西南氣流豪雨，5/22日累積雨量達200mm以上，建立預警機制5/22日阿里山線暫時停駛。",
      temp1: "../../../assets/images/brgImg1_1.jpg",
      sbjNum: [],
      i_num: 0,
      manImg: require("../../../assets/images/brgImg1_1.jpg"),
      manImg2: require("../../../assets/images/brgImg1_2.jpg"),
      showImg: false,
      sirName1: "",
      sirName2: "",
      sirName3: "",
      arr:[
        "brgImg1_1.jpg",
        "brgImg1_2.jpg"
      ],
      pathType: ["直線", "曲線"],
      LineType: "",
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
        {start: "0k+277.30m", end: "0k+285.00m", len: "8.00", radius: "0", slope: "0", elevation: "30.10", type: "RC 預力橋", holes: "1", height1: "1.15", height2: "1.20",
         val1_1: "0.55", val1_2: "0.60", val1_3: "", val1_4: "", val1_5: "", val1_6: "", val1_7: "",
         val2_1: "8.00", val2_2: "", val2_3: "", val2_4: "", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg1_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg1_2.jpg")},
        // 編號: 2 index: 1
        {start: "1k+904.40m", end: "1k+913.10m", len: "8.70", radius: "0", slope: "0.1", elevation: "31.20", type: "RC 預力橋", holes: "1", height1: "3.25", height2: "3.65",
         val1_1: "2.55", val1_2: "2.95", val1_3: "", val1_4: "", val1_5: "", val1_6: "", val1_7: "",
         val2_1: "8.60", val2_2: "", val2_3: "", val2_4: "", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg2_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg2_2.jpg")},
        // 編號: 3 index: 2
        {start: "2k+936.70m", end: "2k+975.30m", len: "36.60", radius: "900", slope: "2", elevation: "48.20", type: "鋼樑橋", holes: "4", height1: "3.40", height2: "3.70",
         val1_1: "3.00", val1_2: "3.60", val1_3: "4.60", val1_4: "4.60", val1_5: "2.70", val1_6: "", val1_7: "",
         val2_1: "9.15", val2_2: "9.10", val2_3: "9.15", val2_4: "10.95", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg3_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg3_2.jpg")},
        // 編號: 4 index: 3
        {start: "4k+330.20m", end: "4k+366.70m", len: "36.50", radius: "0", slope: "1.6", elevation: "55.20", type: "T型版橋(箱涵)", holes: "3", height1: "", height2: "",
         val1_1: "", val1_2: "", val1_3: "", val1_4: "", val1_5: "", val1_6: "", val1_7: "",
         val2_1: "", val2_2: "", val2_3: "", val2_4: "", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg4_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg4_2.jpg")},
        // 編號: 5 index: 4
        {start: "7k+136.00m", end: "7k+143.80m", len: "7.80", radius: "0", slope: "0.15", elevation: "56.60", type: "RC 預力橋", holes: "1", height1: "3.00", height2: "3.70",
         val1_1: "2.40", val1_2: "3.10", val1_3: "", val1_4: "", val1_5: "", val1_6: "", val1_7: "",
         val2_1: "7.60", val2_2: "", val2_3: "", val2_4: "", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg5_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg5_2.jpg")},
        // 編號: 6 index: 5
        {start: "7k+671.20m", end: "7k+677.25m", len: "6.05", radius: "0", slope: "0.15", elevation: "57.60", type: "RC 預力橋", holes: "1", height1: "2.85", height2: "1.50",
         val1_1: "2.35", val1_2: "1.00", val1_3: "", val1_4: "", val1_5: "", val1_6: "", val1_7: "",
         val2_1: "6.00", val2_2: "", val2_3: "", val2_4: "", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg6_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg6_2.jpg")},
        // 編號: 7 index: 6
        {start: "8k+048.00m", end: "8k+070.20m", len: "22.20", radius: "0", slope: "0.6", elevation: "60.20", type: "RC 預力橋", holes: "1", height1: "5.20", height2: "5.50",
         val1_1: "3.90", val1_2: "5.25", val1_3: "", val1_4: "", val1_5: "", val1_6: "", val1_7: "",
         val2_1: "22.10", val2_2: "", val2_3: "", val2_4: "", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg7_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg7_2.jpg")},
        // 編號: 8 index: 7
        {start: "9k+091.80m", end: "9k+100.00m", len: "8.20", radius: "350", slope: "0.83", elevation: "69.90", type: "RC 預力橋", holes: "1", height1: "2.65", height2: "2.75",
         val1_1: "2.05", val1_2: "2.15", val1_3: "", val1_4: "", val1_5: "", val1_6: "", val1_7: "",
         val2_1: "8.00", val2_2: "", val2_3: "", val2_4: "", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg8_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg8_2.jpg")},
        // 編號: 9 index: 8
        {start: "9k+737.00m", end: "9k+844.00m", len: "107.00", radius: "0", slope: "0", elevation: "72.20", type: "鋼樑橋", holes: "2", height1: "9.45", height2: "8.50",
         val1_1: "13", val1_2: "13", val1_3: "", val1_4: "", val1_5: "", val1_6: "", val1_7: "",
         val2_1: "53.50", val2_2: "53.50", val2_3: "", val2_4: "", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg9_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg9_2.jpg")},
        // 編號: 10 index: 9
        {start: "13k+031.00m", end: "13k+037.00m", len: "6.00", radius: "0", slope: "1.33", elevation: "", type: "RC 預力橋", holes: "1", height1: "1.95", height2: "1.60",
         val1_1: "1.45", val1_2: "1.10", val1_3: "", val1_4: "", val1_5: "", val1_6: "", val1_7: "",
         val2_1: "6.00", val2_2: "", val2_3: "", val2_4: "", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg10_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg10_2.jpg")},
        // 編號: 11 index: 10
        {start: "13k+736.70m", end: "13k+742.70m", len: "6.00", radius: "400", slope: "2", elevation: "121.00", type: "RC 預力橋", holes: "1", height1: "1.35", height2: "1.10",
         val1_1: "0.85", val1_2: "0.60", val1_3: "", val1_4: "", val1_5: "", val1_6: "", val1_7: "",
         val2_1: "6.00", val2_2: "", val2_3: "", val2_4: "", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg11_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg11_2.jpg")},
        // 編號: 12 index: 11
        {start: "13k+990.00m", end: "13k+996.00m", len: "6.00", radius: "310", slope: "2", elevation: "125.90", type: "RC 預力橋", holes: "1", height1: "1.17", height2: "1.30",
         val1_1: "0.67", val1_2: "0.80", val1_3: "", val1_4: "", val1_5: "", val1_6: "", val1_7: "",
         val2_1: "6.00", val2_2: "", val2_3: "", val2_4: "", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg12_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg12_2.jpg")},
        // 編號: 13 index: 12
        {start: "14k+395.90m", end: "14k+492.30m", len: "96.40", radius: "0", slope: "1.25", elevation: "130.40", type: "鋼樑橋", holes: "3", height1: "1.58", height2: "5.90",
         val1_1: "", val1_2: "", val1_3: "", val1_4: "", val1_5: "", val1_6: "", val1_7: "",
         val2_1: "", val2_2: "", val2_3: "", val2_4: "", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg13_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg13_2.jpg")},
        // 編號: 14 index: 13
        {start: "14k+670.95m", end: "14k+715.25m", len: "44.30", radius: "600", slope: "1.25", elevation: "132.90", type: "RC 預力橋", holes: "2", height1: "1.58", height2: "5.90",
         val1_1: "2.65", val1_2: "6.30", val1_3: "4.15", val1_4: "", val1_5: "", val1_6: "", val1_7: "",
         val2_1: "22.00", val2_2: "22.00", val2_3: "", val2_4: "", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg14_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg14_2.jpg")},
        // 編號: 15 index: 14
        {start: "15k+970.00m", end: "16k+012.70m", len: "42.70", radius: "50", slope: "5", elevation: "186.50", type: "T型版橋(箱涵)", holes: "4", height1: "5.30", height2: "4.30",
         val1_1: "4.70", val1_2: "7.90", val1_3: "8.00", val1_4: "6.60", val1_5: "3.70", val1_6: "", val1_7: "",
         val2_1: "", val2_2: "", val2_3: "", val2_4: "", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg15_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg15_2.jpg")},
        // 編號: 16 index: 15
        {start: "18k+356.30m", end: "18k+380.70m", len: "24.40", radius: "0", slope: "5", elevation: "305.70", type: "T型版橋(箱涵)", holes: "2", height1: "9.80", height2: "6.90",
         val1_1: "6.80", val1_2: "9.30", val1_3: "3.90", val1_4: "", val1_5: "", val1_6: "", val1_7: "",
         val2_1: "", val2_2: "", val2_3: "", val2_4: "", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg16_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg16_2.jpg")},
        // 編號: 17 index: 16
        {start: "19k+085.84m", end: "19k+110.14m", len: "24.30", radius: "0", slope: "5", elevation: "335.90", type: "RC 預力橋", holes: "2", height1: "2.20", height2: "5.10",
         val1_1: "1.80", val1_2: "6.50", val1_3: "4.30", val1_4: "", val1_5: "", val1_6: "", val1_7: "",
         val2_1: "12.00", val2_2: "12.00", val2_3: "", val2_4: "", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg17_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg17_2.jpg")},
        // 編號: 18 index: 17
        {start: "20k+435.00m", end: "20k+442.00m", len: "7.00", radius: "45", slope: "5", elevation: "402.00", type: "箱涵橋", holes: "1", height1: "4.40", height2: "4.60",
         val1_1: "3.90", val1_2: "4.10", val1_3: "", val1_4: "", val1_5: "", val1_6: "", val1_7: "",
         val2_1: "", val2_2: "", val2_3: "", val2_4: "", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg18_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg18_2.jpg")},
        // 編號: 19 index: 18
        {start: "21k+373.10m", end: "21k+411.50m", len: "38.40", radius: "40 60", slope: "5", elevation: "449.60", type: "T型版橋(箱涵)", holes: "2", height1: "8.30", height2: "9.00",
         val1_1: "7.70", val1_2: "9.10", val1_3: "8.40", val1_4: "", val1_5: "", val1_6: "", val1_7: "",
         val2_1: "", val2_2: "", val2_3: "", val2_4: "", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg19_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg19_2.jpg")},
        // 編號: 20 index: 19
        {start: "23k+330.00m", end: "23k+465.00m", len: "135.00", radius: "250", slope: "5.23", elevation: "548.00", type: "RC 樑(雙T型樑)", holes: "9", height1: "", height2: "",
         val1_1: "58.00", val1_2: "49.20", val1_3: "43.50", val1_4: "30.00", val1_5: "25.50", val1_6: "20.70", val1_7: "18.65",
         val2_1: "14.00", val2_2: "12.00", val2_3: "10.00", val2_4: "", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg20_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg20_2.jpg")},
        // 編號: 21 index: 20
        {start: "23k+582.48m", end: "23k+610.70m", len: "28.22", radius: "0", slope: "5", elevation: "559.70", type: "RC 拱樑橋", holes: "1", height1: "9.00", height2: "6.21",
         val1_1: "7.40", val1_2: "4.10", val1_3: "", val1_4: "", val1_5: "", val1_6: "", val1_7: "",
         val2_1: "", val2_2: "", val2_3: "", val2_4: "", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg21_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg21_2.jpg")},
        // 編號: 22 index: 21
        {start: "28k+568.92m", end: "23k+603.80m", len: "34.85", radius: "50", slope: "5", elevation: "795.80", type: "T型版橋(箱涵)", holes: "2", height1: "6.05", height2: "5.30",
         val1_1: "5.55", val1_2: "4.80", val1_3: "4.80", val1_4: "", val1_5: "", val1_6: "", val1_7: "",
         val2_1: "", val2_2: "", val2_3: "", val2_4: "", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg21_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg22_2.jpg")},
        // 編號: 23 index: 22
        {start: "28k+919.30m", end: "28k+940.80m", len: "21.50", radius: "50", slope: "5", elevation: "812.40", type: "T型版橋", holes: "3", height1: "3.40", height2: "5.70",
         val1_1: "2.50", val1_2: "7.80", val1_3: "7.80", val1_4: "4.80", val1_5: "", val1_6: "", val1_7: "",
         val2_1: "", val2_2: "", val2_3: "", val2_4: "", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg23_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg23_2.jpg")},
        // 編號: 24 index: 23
        {start: "29k+122.00m", end: "29k+159.00m", len: "37.00", radius: "0", slope: "5", elevation: "", type: "RC 拱樑橋", holes: "3", height1: "5.90", height2: "3.20",
         val1_1: "5.30", val1_2: "6.00", val1_3: "2.40", val1_4: "0.70", val1_5: "", val1_6: "", val1_7: "",
         val2_1: "", val2_2: "", val2_3: "", val2_4: "", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg24_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg24_2.jpg")},
        // 編號: 25 index: 24
        {start: "29k+353.32m", end: "29k+393.42m", len: "40.10", radius: "50", slope: "5", elevation: "832.00", type: "T型版橋(箱涵)", holes: "8", height1: "5.80", height2: "4.40",
         val1_1: "6.30", val1_2: "6.90", val1_3: "6.90", val1_4: "6.90", val1_5: "6.90", val1_6: "5.40", val1_7: "5.20",
         val2_1: "", val2_2: "", val2_3: "", val2_4: "", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg25_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg25_2.jpg")},
        // 編號: 26 index: 25
        {start: "29k+540.80m", end: "29k+565.50m", len: "24.80", radius: "0", slope: "5", elevation: "882.50", type: "T型版橋", holes: "1", height1: "4.70", height2: "4.80",
         val1_1: "3.90", val1_2: "4.00", val1_3: "", val1_4: "", val1_5: "", val1_6: "", val1_7: "",
         val2_1: "", val2_2: "", val2_3: "", val2_4: "", val2_5: "", val2_6: "", val2_7: "",
         imgUrl1: require("../../../assets/images/brgImg26_1.jpg"), imgUrl2: require("../../../../src/assets/images/brgImg26_2.jpg")},

      ],
      ipt: {
        items1: [// 1 ~ 3
          { result: "0", damLv: "0" },
          { result: "0", damLv: "0" },
          { result: "0", damLv: "0" },
        ],
        items2: [// 4 ~ 7
          { result: "0", damLv: "0" },
          { result: "0", damLv: "0" },
          { result: "0", damLv: "0" },
          { result: "0", damLv: "0" },
        ],
        items3: [// 8
          { result: "0", damLv: "0" },
        ],
        items4: [// 9
          { result: "0", damLv: "0" },
        ],
        items5: [// 10 ~ 18
          { result: "0", damLv: "0" },
          { result: "0", damLv: "0" },
          { result: "0", damLv: "0" },
          { result: "0", damLv: "0" },
          { result: "0", damLv: "0" },
          { result: "0", damLv: "0" },
          { result: "0", damLv: "0" },
          { result: "0", damLv: "0" },
          { result: "0", damLv: "0" },
        ],
      },
      items1: [
        { question: "1. 橋台基礎是否淘空" },
        { question: "2. 橋台外側是否有不正常沖刷或崩坍" },
        { question: "3. 橋台擋土牆是否損壞" },
      ],
      items2: [
        { question: "4. 橋墩基礎是否淘空" },
        { question: "5. 橋墩柱是否損壞或傾斜" },
        { question: "6. 預力樑是否有裂縫或受損" },
        { question: "7. 支撐端孔隙寬度是否過大" },
      ],
      items3: [
        { question: "8. 預力樑間橫向支撐是否受損" },
      ],
      items4: [
        { question: "9. 鋼樑螺栓有無鬆弛,鏽蝕,裂損及其他異狀" },
      ],
      items5: [
        { question: "10. 橋樑材是否汙損油漆剝落" },
        { question: "11. 橋台橋墩面是否清理積土" },
        { question: "12. 橋面枕木是否腐壞或擠壓變形" },
        { question: "13. 枕木下墊片是否腐壞" },
        { question: "14. 正軌間距是否合於規定" },
        { question: "15. 正軌與護軌間距是否合於規定" },
        { question: "16. 魚尾鈑螺絲是否鬆動" },
        { question: "17. 道釘是否鬆動" },
        { question: "18. 橋面板是否腐壞或破洞" },
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
          class: "subtitle-1 white--text font-weight-bold",
        },
        {
          text: "檢查日期",
          value: "Checkday",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
        // {
        //   text: "審查狀態",
        //   value: "Review",
        //   align: "center",
        //   divider: true,
        //   class: "subtitle-1 white--text font-weight-bold",
        // },
        {
          text: "填寫人",
          value: "Name",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
        },
        {
          text: "功能",
          value: "Shop",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold",
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
  
  computed:{
    ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    aa:function() {
      // if (data = 1) {
      // }else{
      // }
      // return require("../../../assets/images/" + this.arr[i_num]);
      return require("../../../assets/images/" + this.arr[i_num]);
    }
  },
  created:function(){
    this.nowTime = getTodayDateString();
    this.doMan.name = this.userData.UserName;
    
    var i = 1;
    for(i; i <= 26; i++ ){
      this.sbjNum.push("編號" + i);
    }
    //判斷新增還是編輯
    if(this.$route.params.id.substr(0, 2) == "編號"){
      this.zs = this.nowTime;
      this.bridgeNum = this.$route.params.id;
      this.s01Change();
    }
    else{
      let aa = []
      aa = this.$route.params.id.split(',')
      this.bridgeNum = "編號" + String.fromCharCode(aa[1]);
      this.s01Change();
      //處理日期解碼
      let bb = aa[0].split("_")
      let cc = []
      bb.forEach(element => 
        cc.push(String.fromCharCode(element))
      );
      this.zs = cc.join('')
      //LineType 路線
      bb = aa[5].split("_")
      cc = []
      bb.forEach(element => 
        cc.push(String.fromCharCode(element))
      );
      this.LineType = cc.join('')
      //CheckOption
      this.ipt.items1[0].result = String.fromCharCode(aa[6])
      this.ipt.items1[0].damLv = String.fromCharCode(aa[7])
      this.ipt.items1[1].result = String.fromCharCode(aa[8])
      this.ipt.items1[1].damLv = String.fromCharCode(aa[9])
      this.ipt.items1[2].result = String.fromCharCode(aa[10])
      this.ipt.items1[2].damLv = String.fromCharCode(aa[11])
      this.ipt.items2[0].result = String.fromCharCode(aa[12])
      this.ipt.items2[0].damLv = String.fromCharCode(aa[13])
      this.ipt.items2[1].result = String.fromCharCode(aa[14])
      this.ipt.items2[1].damLv = String.fromCharCode(aa[15])
      this.ipt.items2[2].result = String.fromCharCode(aa[16])
      this.ipt.items2[2].damLv = String.fromCharCode(aa[17])
      this.ipt.items2[3].result = String.fromCharCode(aa[18])
      this.ipt.items2[3].damLv = String.fromCharCode(aa[19])
      this.ipt.items3[0].result = String.fromCharCode(aa[20])
      this.ipt.items4[0].result = String.fromCharCode(aa[21])
      this.ipt.items4[0].damLv = String.fromCharCode(aa[22])
      this.ipt.items5[0].result = String.fromCharCode(aa[23])
      this.ipt.items5[1].result = String.fromCharCode(aa[24])
      this.ipt.items5[2].result = String.fromCharCode(aa[25])
      this.ipt.items5[3].result = String.fromCharCode(aa[26])
      this.ipt.items5[4].result = String.fromCharCode(aa[27])
      this.ipt.items5[5].result = String.fromCharCode(aa[28])
      this.ipt.items5[6].result = String.fromCharCode(aa[29])
      this.ipt.items5[7].result = String.fromCharCode(aa[30])
      this.ipt.items5[8].result = String.fromCharCode(aa[31])
      //Memo
      bb = aa[32].split("_")
      cc = []
      bb.forEach(element => 
        cc.push(String.fromCharCode(element))
      );
      this.note = cc.join('')
      //三人名
      bb = aa[2].split("_")
      cc = []
      bb.forEach(element => 
        cc.push(String.fromCharCode(element))
      );
      this.sirName1 = cc.join('')
      bb = aa[3].split("_")
      cc = []
      bb.forEach(element => 
        cc.push(String.fromCharCode(element))
      );
      this.sirName2 = cc.join('')
      bb = aa[4].split("_")
      cc = []
      bb.forEach(element => 
        cc.push(String.fromCharCode(element))
      );
      this.sirName3 = cc.join('')
    }
    
  },
  methods: {
    initInput(){
      this.doMan.name = this.userData.UserName;
      this.zs = this.nowTime;
      var step;
      // for (step = 0; step < 7; step++) {
      //   this.ipt.items[step].status = ""
      //   this.ipt.items2[step].status = ""
      // }
      // this.Advice = "";
      // this.Measures = ""
    },
    ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
    showlog(){
      // this.bridgeNum = "編號3"
      // this.s01Change();
    },
    newOne(){
     
      this.Add = true
     
      this.initInput();
    },
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    
    s01Change(selectObj){
      this.showImg = true;
      if(selectObj == undefined){
        selectObj = this.bridgeNum
      }
      var i = -1;
      i = Number(selectObj.substr(2)) - 1;
      this.i_num = i;
      if(i > -1){
        this.v1 = this.vn[i].start;
        this.v2 = this.vn[i].end;
        this.v3 = this.vn[i].len;
        this.v4 = this.vn[i].radius;
        this.v5 = this.vn[i].slope;
        this.v6 = this.vn[i].elevation;
        this.v7 = this.vn[i].type;
        this.v8 = this.vn[i].holes;
        this.v9 = this.vn[i].height1;
        this.v10 = this.vn[i].height2;
        this.val1_1 = this.vn[i].val1_1;
        this.val1_2 = this.vn[i].val1_2;
        this.val1_3 = this.vn[i].val1_3;
        this.val1_4 = this.vn[i].val1_4;
        this.val1_5 = this.vn[i].val1_5;
        this.val1_6 = this.vn[i].val1_6;
        this.val1_7 = this.vn[i].val1_7;
        this.val2_1 = this.vn[i].val2_1;
        this.val2_2 = this.vn[i].val2_2;
        this.val2_3 = this.vn[i].val2_3;
        this.val2_4 = this.vn[i].val2_4;
        this.val2_5 = this.vn[i].val2_5;
        this.val2_6 = this.vn[i].val2_6;
        this.val2_7 = this.vn[i].val2_7;
        // this.manImg = this.vn[i].imgUrl1;
        // this.manImg2 = this.vn[i].imgUrl2;
      }
    },
    // 新增監工區塊欄位
    addSupervisor() {},
    // 搜尋
    search() {
      
      this.chLoadingShow({show:true})
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

      if (this.action == Actions.add){
        //-----新增-----
        createFormOrder0({
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id this.doMan.name = this.userData.UserName
          // OperatorID: "16713",  // 操作人id
          KeyName: this.DB_Table,  // DB table
          KeyItem:[
            {Column:"CheckDay", Value: this.zs },
            {Column:"BridgeID", Value: this.bridgeNum.substr(2) },
            {Column:"LineType",Value:this.LineType},
            {Column:"Len",Value:this.v3},
            {Column:"Start",Value:this.v1},
            {Column:"Finish",Value:this.v2},
            {Column:"Type",Value:this.v7},
            {Column:"Slope",Value:this.v5},
            {Column:"Height",Value:this.v6},
            {Column:"CurveRadius",Value:this.v4},
            {Column:"Holes",Value:this.v8},
            {Column:"H_Chiayi",Value:this.v9},
            {Column:"H_Alishan",Value:this.v10},
            {Column:"Engineer",Value:this.sirName1},
            {Column:"WorksChief",Value:this.sirName2},
            {Column:"Supervisor",Value:this.sirName3},
            {Column:"BridgeHeight_1",Value:this.val1_1},
            {Column:"BridgeHeight_2",Value:this.val1_2},
            {Column:"BridgeHeight_3",Value:this.val1_3},
            {Column:"BridgeHeight_4",Value:this.val1_4},
            {Column:"BridgeHeight_5",Value:this.val1_5},
            {Column:"BridgeHeight_6",Value:this.val1_6},
            {Column:"BridgeHeight_7",Value:this.val1_7},
            {Column:"BeamLength_1",Value:this.val2_1},
            {Column:"BeamLength_2",Value:this.val2_2},
            {Column:"BeamLength_3",Value:this.val2_3},
            {Column:"BeamLength_4",Value:this.val2_4},
            {Column:"BeamLength_5",Value:this.val2_5},
            {Column:"BeamLength_6",Value:this.val2_6},
            {Column:"BeamLength_7",Value:this.val2_7},
            {Column:"CheckOption1",Value:this.ipt.items1[0].result},
            {Column:"CheckOption1HazLv",Value:this.ipt.items1[0].damLv},
            {Column:"CheckOption2",Value:this.ipt.items1[1].result},
            {Column:"CheckOption2HazLv",Value:this.ipt.items1[1].damLv},
            {Column:"CheckOption3",Value:this.ipt.items1[2].result},
            {Column:"CheckOption3HazLv",Value:this.ipt.items1[2].damLv},
            {Column:"CheckOption4",Value:this.ipt.items2[0].result},
            {Column:"CheckOption4HazLv",Value:this.ipt.items2[0].damLv},
            {Column:"CheckOption5",Value:this.ipt.items2[1].result},
            {Column:"CheckOption5HazLv",Value:this.ipt.items2[1].damLv},
            {Column:"CheckOption6",Value:this.ipt.items2[2].result},
            {Column:"CheckOption6HazLv",Value:this.ipt.items2[2].damLv},
            {Column:"CheckOption7",Value:this.ipt.items2[3].result},
            {Column:"CheckOption7HazLv",Value:this.ipt.items2[3].damLv},
            {Column:"CheckOption8",Value:this.ipt.items3[0].result},
            {Column:"CheckOption9",Value:this.ipt.items4[0].result},
            {Column:"CheckOption9HazLv",Value:this.ipt.items4[0].damLv},
            {Column:"CheckOption10",Value:this.ipt.items5[0].result},
            {Column:"CheckOption11",Value:this.ipt.items5[1].result},
            {Column:"CheckOption12",Value:this.ipt.items5[2].result},
            {Column:"CheckOption13",Value:this.ipt.items5[3].result},
            {Column:"CheckOption14",Value:this.ipt.items5[4].result},
            {Column:"CheckOption15",Value:this.ipt.items5[5].result},
            {Column:"CheckOption16",Value:this.ipt.items5[6].result},
            {Column:"CheckOption17",Value:this.ipt.items5[7].result},
            {Column:"CheckOption18",Value:this.ipt.items5[8].result},
            {Column:"Memo",Value:this.note},
          ]
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
          KeyItem:[
            {Column:"CheckDay", Value: this.zs },
            {Column:"LineType",Value:this.LineType},
            {Column:"Len",Value:this.v3},
            {Column:"Start",Value:this.v1},
            {Column:"Finish",Value:this.v2},
            {Column:"Type",Value:this.v7},
            {Column:"Slope",Value:this.v5},
            {Column:"Height",Value:this.v6},
            {Column:"CurveRadius",Value:this.v4},
            {Column:"Holes",Value:this.v8},
            {Column:"H_Chiayi",Value:this.v9},
            {Column:"H_Alishan",Value:this.v10},
            {Column:"BridgeHeight_1",Value:this.val1_1},
            {Column:"BridgeHeight_2",Value:this.val1_2},
            {Column:"BridgeHeight_3",Value:this.val1_3},
            {Column:"BridgeHeight_4",Value:this.val1_4},
            {Column:"BridgeHeight_5",Value:this.val1_5},
            {Column:"BridgeHeight_6",Value:this.val1_6},
            {Column:"BridgeHeight_7",Value:this.val1_7},
            {Column:"BeamLength_1",Value:this.val2_1},
            {Column:"BeamLength_2",Value:this.val2_2},
            {Column:"BeamLength_3",Value:this.val2_3},
            {Column:"BeamLength_4",Value:this.val2_4},
            {Column:"BeamLength_5",Value:this.val2_5},
            {Column:"BeamLength_6",Value:this.val2_6},
            {Column:"BeamLength_7",Value:this.val2_7},
            {Column:"CheckOption1",Value:this.ipt.items1[0].result},
            {Column:"CheckOption2",Value:this.ipt.items1[1].result},
            {Column:"CheckOption3",Value:this.ipt.items1[2].result},
            {Column:"CheckOption4",Value:this.ipt.items2[0].result},
            {Column:"CheckOption5",Value:this.ipt.items2[1].result},
            {Column:"CheckOption6",Value:this.ipt.items2[2].result},
            {Column:"CheckOption7",Value:this.ipt.items2[3].result},
            {Column:"CheckOption8",Value:this.ipt.items3[0].result},
            {Column:"CheckOption9",Value:this.ipt.items4[0].result},
            {Column:"CheckOption10",Value:this.ipt.items5[0].result},
            {Column:"CheckOption11",Value:this.ipt.items5[1].result},
            {Column:"CheckOption12",Value:this.ipt.items5[2].result},
            {Column:"CheckOption13",Value:this.ipt.items5[3].result},
            {Column:"CheckOption14",Value:this.ipt.items5[4].result},
            {Column:"CheckOption15",Value:this.ipt.items5[5].result},
            {Column:"CheckOption16",Value:this.ipt.items5[6].result},
            {Column:"CheckOption17",Value:this.ipt.items5[7].result},
            {Column:"CheckOption18",Value:this.ipt.items5[8].result},
            {Column:"Memo",Value:this.note},
          ]
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
      this.$router.push({ path: "/form-manage/maintain/bridge-visual-safety-checklist" });
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