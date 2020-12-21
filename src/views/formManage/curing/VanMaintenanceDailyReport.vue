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
          v-model="a"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="z" solo v-on="on" readonly></v-text-field>
          </template>
          <v-date-picker color="purple" v-model="z" @input="a = false" locale="zh-tw"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>檢查日期(迄)
        </h3>
        <v-menu
          v-model="q"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="df" solo v-on="on" readonly></v-text-field>
          </template>
          <v-date-picker color="purple" v-model="df" @input="q = false" locale="zh-tw"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>管理單位
        </h3>
        <v-select
          :items="[{ text: '資訊科', value: 'A' }, { text: '資訊科2', value: 'B' }, { text: '資訊科3', value: 'C' }, { text: '資訊科4', value: 'D' }, { text: 'A0005', value: 'E' }]"
          solo
        />
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn color="green" dark large class="mb-sm-8 mb-md-8">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
      </v-col>

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
          @click="Add = true"
        >
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </v-col>
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
          <template v-slot:item.shop>
            <v-btn
              title="詳細資料"
              class="mr-2"
              small
              dark
              fab
              color="info darken-1"
              @click="Add = true"
            >
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
    <!-- 新增客貨車使用前後檢修記錄表 modal -->
    <v-dialog v-model="Add" max-width="900px">
      <v-card>
        <v-card-title class="blue white--text px-4 py-1">
          新增客、貨車使用前後檢修記錄表
          <v-spacer />
          <v-btn dark fab small text @click="close" class="mr-n2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <div class="px-6 py-4">
          <!-- 1 -->
          <v-row>
            <v-col cols="12" sm="3">
              <h3 class="mb-1">使用前、後</h3>
              <v-radio-group dense row v-model="AddData.UseType">
                <v-radio color="success" label="使用前" value="1" />
                <v-radio color="info" label="使用後" value="2" />
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="3">
              <h3 class="mb-1">保養單位</h3>
              <v-text-field v-model="AddData.Department" solo />
            </v-col>
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
                  <v-text-field v-model.trim="AddData.MaintenanceDay" solo v-on="on" readonly></v-text-field>
                </template>
                <v-date-picker
                  color="purple"
                  v-model="AddData.MaintenanceDay"
                  @input="MaintenanceDay = false"
                  locale="zh-tw"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <!-- 2 -->
          <v-row>
            <v-col cols="12" sm="3">
              <h3 class="mb-1">司機員</h3>
              <v-text-field v-model="AddData.Driver" solo />
            </v-col>
            <v-col cols="12" sm="3">
              <h3 class="mb-1">車次</h3>
              <v-text-field v-model="AddData.TrainNumber" solo />
            </v-col>
            <v-col cols="12" sm="3">
              <h3 class="mb-1">車種</h3>
              <v-text-field v-model="AddData.Vehicles" solo />
            </v-col>
            <v-col cols="12" sm="3">
              <h3 class="mb-1">車號</h3>
            <v-textarea v-model="AddData.CarNumber" solo rows="1" />
            </v-col>
          </v-row>
          <!-- 3 -->
          <v-col cols="12">
            <h3 class="mb-1 indigo--text">連結及緩衝裝置</h3>
            <h3>(1)連結器(2)彈簧(3)導架(4)軛(5)裝置鬆動</h3>
            <v-radio-group dense row v-model="AddData.CarType.CheckType1">
              <v-radio
                v-for="list in redioList"
                :key="list.label"
                :color="list.color"
                :label="list.label"
                :value="list.value"
              />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <h3 class="mb-1 indigo--text">軔機裝置</h3>
            <h3>(1)前後軔速桿及梢檢查(2)軔管(3)軔機配件A:軔缸B:三動閥C:保持閥D:緊急閥E:角旋塞</h3>
            <v-radio-group dense row v-model="AddData.CarType.CheckType2">
              <v-radio
                v-for="list in redioList"
                :key="list.label"
                :color="list.color"
                :label="list.label"
                :value="list.value"
              />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <h3 class="mb-1 indigo--text">軔塊、車輪及軸箱</h3>
            <h3>(1)問題車輪位置(2)軔塊狀況(3)軸承箱與導板(4)固結螺栓</h3>
            <v-radio-group dense row v-model="AddData.CarType.CheckType3">
              <v-radio
                v-for="list in redioList"
                :key="list.label"
                :color="list.color"
                :label="list.label"
                :value="list.value"
              />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <h3 class="mb-1 indigo--text">彈簧裝置</h3>
            <h3>(1)支持線圈彈簧(貨)(2)支持板彈簧(客)</h3>
            <v-radio-group dense row v-model="AddData.CarType.CheckType4">
              <v-radio
                v-for="list in redioList"
                :key="list.label"
                :color="list.color"
                :label="list.label"
                :value="list.value"
              />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <h3 class="mb-1 indigo--text">轉向架配件</h3>
            <h3>(1)彎樑(2)側承間隙(3)枕樑與彎樑間(4)軔樑(5)軔吊桿(6)軔吊梢(7)枕樑(8)枕吊角梢(9)枕吊桿(10)開尾梢</h3>
            <v-radio-group dense row v-model="AddData.CarType.CheckType5">
              <v-radio
                v-for="list in redioList"
                :key="list.label"
                :color="list.color"
                :label="list.label"
                :value="list.value"
              />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <h3 class="mb-1 indigo--text">摩擦面注油</h3>
            <h3>(1)連結器(2)軔機連桿梢與孔(3)軔吊桿孔與梢(4)枕吊桿與角梢(5)旁承座</h3>
            <v-radio-group dense row v-model="AddData.CarType.CheckType6">
              <v-radio
                v-for="list in redioList"
                :key="list.label"
                :color="list.color"
                :label="list.label"
                :value="list.value"
              />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <h3 class="mb-1 indigo--text">供水裝置</h3>
            <h3>(1)儲水筒及供水管路(2)水龍頭(3)沖洗閥(4)旋塞</h3>
            <v-radio-group dense row v-model="AddData.CarType.CheckType7">
              <v-radio
                v-for="list in redioList"
                :key="list.label"
                :color="list.color"
                :label="list.label"
                :value="list.value"
              />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <h3 class="mb-1 indigo--text">車內裝備</h3>
            <h3>(1)各式門及把鎖(2)通路門鉸鏈(3)廁所(4)窗框(5)窗扣(6)茶杯架(7)通風出口調整器(8)門窗膠條(9)床面膠板</h3>
            <v-radio-group dense row v-model="AddData.CarType.CheckType8">
              <v-radio
                v-for="list in redioList"
                :key="list.label"
                :color="list.color"
                :label="list.label"
                :value="list.value"
              />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <h3 class="mb-1 indigo--text">電器裝置</h3>
            <h3>(1)控制箱(2)電源接頭(3)插座(4)播音喇叭(5)前後照明燈(6)室內日光燈(7)空調機(8)雨刷機(9)電瓶(10)電源開關</h3>
            <v-radio-group dense row v-model="AddData.CarType.CheckType9">
              <v-radio
                v-for="list in redioList"
                :key="list.label"
                :color="list.color"
                :label="list.label"
                :value="list.value"
              />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <h3 class="mb-1 indigo--text">其他部分</h3>
            <h3>(1)傾斜檢查(2)排障器(3)喇叭開關(4)通路渡板(5)通路扶手</h3>
            <v-radio-group dense row v-model="AddData.CarType.CheckType10">
              <v-radio
                v-for="list in redioList"
                :key="list.label"
                :color="list.color"
                :label="list.label"
                :value="list.value"
              />
            </v-radio-group>
          </v-col>
          <!-- 4 -->
          <v-col cols="12">
            <h3 class="mb-1 indigo--text">備註</h3>
            <v-textarea v-model="AddData.Remarks" auto-grow outlined rows="4" />
          </v-col>
        </div>
        <v-card-actions class="px-5 pb-5">
          <v-spacer />
          <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
          <v-btn color="success" elevation="4">送出</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Pagination from "@/components/Pagination.vue";

export default {
  data() {
    return {
      title: "客、貨車使用前後檢修記錄表",
      newText: "記錄表",
      isLoading: false,
      disabled: false,
      AddData: {
        MaintenanceDay: "",
        Department: "",
        UseType: "",
        Driver: "",
        TrainNumber: "",
        Vehicles: "",
        CarNumber: "",
        CarType: {
          CheckType1: "",
          CheckType2: "",
          CheckType3: "",
          CheckType4: "",
          CheckType5: "",
          CheckType6: "",
          CheckType7: "",
          CheckType8: "",
          CheckType9: "",
          CheckType10: ""
        },
        Remarks: ""
      },
      redioList: [
        { label: '正常', value: 1, color: 'success'},
        { label: '經修復或抽換', value: 2, color: 'orange darken-4'},
        { label: '當日未能修復', value: 3, color: 'info'},
        { label: '須進廠拆解修理', value: 4, color: 'red'},
      ],
      Add: false,
      pageOpt: { page: 1 }, // 目前頁數
      headers: [
        // 表格顯示的欄位
        {
          text: "項次",
          value: "a0",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "檢查日期",
          value: "aa",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "審查狀態",
          value: "cc",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "填寫人",
          value: "dd",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "功能",
          value: "shop",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
      ],
      tableItems: [
        {
          a0: "1",
          aa: "2020-08-01",
          cc: "已審查",
          dd: "王大明",
        },
        {
          a0: "2",
          aa: "2020-08-10",
          cc: "審查中",
          dd: "王大明",
        },
      ],
    };
  },
  components: { Pagination }, // 頁碼
  methods: {
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 搜尋
    search() {},
    // 關閉 dialog
    close() {
      this.Add = false;
    },
  },
};
</script>
