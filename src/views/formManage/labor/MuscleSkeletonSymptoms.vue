<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2">
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>調查日期(起)
        </h3>
        <v-menu
          v-model="a"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model.trim="z"
              solo
              v-on="on"
              readonly
            ></v-text-field>
          </template>
          <v-date-picker
            color="purple"
            v-model="z"
            @input="a = false"
            locale="zh-tw"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>調查日期(迄)
        </h3>
        <v-menu
          v-model="q"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model.trim="df"
              solo
              v-on="on"
              readonly
            ></v-text-field>
          </template>
          <v-date-picker
            color="purple"
            v-model="df"
            @input="q = false"
            locale="zh-tw"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <div class="col-sm-4 col-md-8 col-12">
        <v-btn color="green" dark large class="col-4 col-md-2 mr-3">
          <v-icon>mdi-magnify</v-icon>查詢
        </v-btn>
        <v-btn color="indigo" elevation="3" dark large @click="Add = true">
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </div>
    </v-row>
    <!-- 人數 -->
    <v-row>
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
              color="info darken-1"
              @click="Add = true"
            >
              <v-icon dark>mdi-magnify</v-icon>
            </v-btn>
            <!-- <v-btn title="刪除" small dark fab color="red" @click="dialog3 = true">
              <v-icon dark>mdi-delete</v-icon>
            </v-btn>-->
          </template>

          <!-- 頁碼 -->
          <template v-slot:footer="footer">
            <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    
    <!-- 新增自動檢點表 modal -->
    <v-dialog v-model="Add" max-width="680px">
      <v-card>
        <v-card-title class="blue white--text px-4 py-1">
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
            <v-col cols="12">
              <v-row no-gutter class="indigo--text">
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">填表日期</h3>
                  <v-menu
                    v-model="ass"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="zs"
                        solo
                        v-on="on"
                        readonly
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="zs"
                      @input="ass = false"
                      locale="zh-tw"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">工作部門</h3>
                  <v-select dense single-line :items="apm" outlined />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">班別</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="12">
                  <h3 class="mb-1">作業名稱</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">職稱</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">員工編號</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">姓名</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">性別</h3>
                  <v-select dense single-line :items="gender" outlined />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">年齡</h3>
                  <v-text-field dense type="number" single-line outlined />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">年資(年)</h3>
                  <v-text-field dense type="number" single-line outlined />
                </v-col>
                <v-col cols="12" sm="3" />
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">身高</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">體重</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">慣用手</h3>
                  <v-select dense single-line :items="handedness" outlined />
                </v-col>
              </v-row>
              <v-col cols="12" sm="12">
                <v-col cols="12" sm="9">
                  <p class="font-weight-black title text-left font-size-50">
                    您在過去的1年內，身體是否有長達1個月以上的疲勞、酸痛、發麻、刺痛等不舒服的症狀？
                  </p>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-radio-group dense row class="pa-0 ma-0" v-model="IsSick1">
                    <v-radio color="success" label="是" value="1" />
                    <v-radio color="success" label="否" value="2" />
                  </v-radio-group>
                </v-col>
              </v-col>
              <div v-if="IsSick1 == 1">
                <v-col cols="12" sm="9">
                  <p class="font-weight-black title text-left font-size-50">
                    身體的疲勞、痠痛、發麻、刺痛等不舒服，是否與目前工作有關？
                  </p>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-radio-group dense row class="pa-0 ma-0" v-model="IsSick2">
                    <v-radio color="success" label="是" value="1" />
                    <v-radio color="success" label="否" value="2" />
                  </v-radio-group>
                </v-col>
              </div>
              <div v-if="IsSick2 == 1">
                <p class="font-weight-black title text-left font-size-50">
                  原因是:
                </p>
                <v-textarea
                  auto-grow
                  outlined
                  rows="3"
                  v-model.trim="ipt.suggest"
                ></v-textarea>
                <p class="font-weight-black title text-left font-size-50">
                  上述最嚴重部位之酸痛、不適情形持續多久時間？
                </p>
                <v-radio-group dense row class="pa-0 ma-0" v-model="SickTime">
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
                      <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.sickPos[idx].pos">
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
                  v-model.trim="ipt.suggest"
                ></v-textarea>

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
          <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
          <v-btn
            color="success"
            elevation="4"
            :loading="isLoading"
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

export default {
  data() {
    return {
      title: "肌肉骨骼症狀調查表",
      newText: "調查表",
      apm: ["綜合企劃科", "鐵路服務科", "鐵路維護科", "車輛養護科", "秘書室", "人事室", "主計室", "政風室", "修理工廠", "嘉義車庫", "阿里山車庫", "竹崎監工區", "奮起湖監工區", "阿里山監工區"],
      gender: ["男", "女", "其他"],
      handedness: ["右手", "左手"],
      IsSick1: 0,
      IsSick2: 0,
      SickTime: 0,
      manImg: require("../../../../src/assets/images/manPic.png"),
      HarmCount: 5,
      NoHarmCount: 13,
      SumHarmCount: null,
      a: "",
      ass: "",
      z: "",
      zs: "",
      q: "",
      df: "",
      s: "",
      qz: "",
      wx: "",
      pp: "",
      oo: "",
      ii: "",
      uu: "",
      yy: "",
      Add: false,
      dialog3: false,
      pageOpt: { page: 1 }, // 目前頁數
      headers: [
        // 表格顯示的欄位
        {text: "所屬單位", value: "a1",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "檢查日期",value: "a2",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "審查狀態",value: "a3",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "姓名",value: "a4",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "職稱",value: "a5",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "性別",value: "a6",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "作業名稱",value: "a7",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "年齡",value: "a8",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "年資",value: "a9",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "身高(cm)",value: "a10",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "體重(kg)",value: "a11",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "慣用手",value: "a12",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "職業傷害",value: "a13",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "通報中",value: "a14",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "問卷調查",value: "a15",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "是否不適",value: "a16",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "與目前工作有關",value: "a17",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "痠痛持續時間",value: "a18",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "頸",value: "a19",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "上背",value: "a20",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "下背",value: "a21",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "左肩",value: "a22",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "右肩",value: "a23",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "左手肘 前臂",value: "a24",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "右手肘 前臂",value: "a25",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "左手 手腕",value: "a26",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "右手 手腕",value: "a27",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "左臀/大腿",value: "a28",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "右臀/大腿",value: "a29",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "左膝",value: "a30",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "右膝",value: "a31",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "左腳踝/腳",value: "a32",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "右腳踝/腳",value: "a33",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "簡易人因工程改善",value: "a34",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "是否改善",value: "a35",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "進階人因工程改善",value: "a36",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "是否改善",value: "a37",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
        {text: "備註",value: "a38",align: "center",divider: true,class: "subtitle-1 white--text font-weight-bold light-blue darken-1"},
      ],
      tableItems: [
        {
          a1: "車輛養護科",
          a2: "2020-08-01",
          a3: "已審查",
          a4: "王大明",
          a5: "科員",
          a6: "男",
          a7: "鐵路維護保養",
          a8: "40",
          a9: "12",
          a10: "170",
          a11: "66",
          a12: "右",
          a13: "O",
          a14: "X",
          a15: "O",
          a16: "O",
          a17: "O",
          a18: "3年",
          a19: "2",
          a20: "3",
          a21: "1",
          a22: "0",
          a23: "0",
          a24: "0",
          a25: "2",
          a26: "1",
          a27: "0",
          a28: "0",
          a29: "4",
          a30: "3",
          a31: "0",
          a32: "0",
          a33: "0",
          a34: "",
          a35: "",
          a36: "",
          a37: "",
          a38: ""
        },
        {
          a1: "二萬平車站",
          a2: "2020-08-01",
          a3: "審查中",
          a4: "羅佑婷",
          a5: "副站長",
          a6: "女",
          a7: "值班",
          a8: "43",
          a9: "19",
          a10: "154",
          a11: "47",
          a12: "右",
          a13: "O",
          a14: "X",
          a15: "O",
          a16: "X",
          a17: "O",
          a18: "1年",
          a19: "1",
          a20: "1",
          a21: "0",
          a22: "0",
          a23: "0",
          a24: "1",
          a25: "0",
          a26: "1",
          a27: "2",
          a28: "0",
          a29: "2",
          a30: "1",
          a31: "3",
          a32: "0",
          a33: "1",
          a34: "",
          a35: "",
          a36: "",
          a37: "",
          a38: ""
        },
      ],
      ipt: {
        // department: "",
        // name: JSON.parse(localStorage.getItem("user")).name,
        // date: new Date().toISOString().substr(0, 10),
        sickPos: [
          { pos: "0", note: "" },
          { pos: "0", note: "" },
          { pos: "0", note: "" },
          { pos: "0", note: "" },
          { pos: "0", note: "" },
          { pos: "0", note: "" },
          { pos: "0", note: "" },
          { pos: "0", note: "" },
          { pos: "0", note: "" },
          { pos: "0", note: "" },
          { pos: "0", note: "" },
          { pos: "0", note: "" },
          { pos: "0", note: "" },
          { pos: "0", note: "" },
          { pos: "0", note: "" },
          { pos: "0", note: "" },
          { pos: "0", note: "" },
          { pos: "0", note: "" },
          { pos: "0", note: "" },
          { pos: "0", note: "" },
        ],
      },
      sickPos: [
        { question: "1. 頸" },
        { question: "2. 左肩" },
        { question: "3. 左手肘/左前臂" },
        { question: "4. 左手/左手腕" },
        { question: "5. 左臀/左大腿" },
        { question: "6. 左膝" },
        { question: "7. 左腳踝/左腳" },
        { question: "8. 上背" },
        { question: "9. 右肩" },
        { question: "10. 右手肘/右前臂" },
        { question: "11. 下背" },
        { question: "12. 右手/右手腕" },
        { question: "13. 右臀/右大腿" },
        { question: "14. 右膝" },
        { question: "15. 右腳踝/右腳" },
      ],
      suggest: "", // 改善建議
    };
  },
  components: { Pagination }, // 頁碼
  computed: {
    Add2(){
      return this.HarmCount + this.NoHarmCount
    }
  },
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
      this.dialog3 = false;
      this.dialogShowEdit = false;
      this.dialogDel = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.addItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    Add() {
      alert("123");
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