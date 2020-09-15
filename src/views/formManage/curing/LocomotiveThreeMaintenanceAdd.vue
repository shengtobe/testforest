<template>
  <v-sheet class="ma-4 mb-8" color="yellow lighten-2">
    <v-container style="max-width: 1200px" class="px-8">
      <p class="font-weight-black title text-center">柴油液力機車三級檢修記錄表</p>
      <v-row class="white px-4">
        <!-- 上面的欄位 -->
        <v-col cols="12" sm="4">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>上次檢驗完成日期
          </h3>
          <v-text-field solo value="2020-08-20" readonly />
        </v-col>
        <v-col cols="12" sm="4">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>上次累積公里數
          </h3>
          <v-text-field solo value="202020" readonly />
        </v-col>
        <v-col cols="12" sm="4">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>機車編號
          </h3>
          <v-text-field solo value="EZ-555555" readonly />
        </v-col>

        <v-col cols="12" sm="3">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>本次檢修開始日期
          </h3>
          <v-text-field solo value="2020-09-01" readonly />
        </v-col>

        <v-col cols="12" sm="3">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>本次檢修完成日期
          </h3>
          <v-text-field solo value="2020-09-20" readonly />
        </v-col>
        <v-col cols="12" sm="3">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>本次累積公里數
          </h3>
          <v-text-field solo value="208080" />
        </v-col>
        <v-col cols="12" sm="3">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>駕駛員
          </h3>
          <v-text-field solo v-model.trim="ipt.name" readonly />
        </v-col>

        <v-col cols="12">
          <p>*工作重點：對一般機件施行全盤檢修，各重要機件施行重整之檢修。</p>
          <p>*工作記號說明：1.實施完畢或正常者。2.經修復者，需填說明。3.需進場檢修者。4.無此項目者。</p>
          <p>*適用車種：25噸及28噸B-B型柴油液力機車</p>
        </v-col>
        <hr />
        <!-- 檢查項目 -->
        <v-col cols="12">
          <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
            <v-col cols="12" sm="3">檢查項目</v-col>
            <v-col cols="12" sm="4">檢查結果</v-col>
            <v-col cols="12" sm="5">備註</v-col>
          </v-row>

          <v-alert
            dense
            border="top"
            colored-border
            color="teal"
            elevation="4"
            v-for="(item, idx) in items"
            :key="idx"
            class="mb-6"
          >
            <v-row no-gutter>
              <v-col cols="12" sm="3">{{ item.question }}</v-col>
              <v-col cols="12" sm="4">
                <span class="d-sm-none error--text">檢查結果：</span>
                <v-radio-group dense row v-model="ipt.items[idx].status" class="pa-0 ma-0">
                  <v-radio color="success" label="實施完畢、正常" value="1"></v-radio>
                  <v-radio color="success" label="修復、說明" value="2"></v-radio>
                  <v-radio color="red" label="進廠檢修" value="3"></v-radio>
                  <v-radio color="black" label="無此項目" value="0"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" sm="5">
                <span class="d-sm-none error--text">備註：</span>
                <v-textarea auto-grow outlined rows="2" v-model.trim="ipt.items[idx].note" />
              </v-col>
            </v-row>
          </v-alert>
        </v-col>

        <v-col cols="12">
          <v-btn large block class="mt-n8 mb-4" color="success">送出表單</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    menu: false, // 時間選單是否顯示
    ipt: {
      department: "",
      name: JSON.parse(localStorage.getItem("user")).name,
      date: new Date().toISOString().substr(0, 10),
      items: [
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" },
        { status: "1", note: "" }
      ],
      suggest: "", // 改善建議
      track: "" // 改善追蹤
    },
    items: [
      {
        question: "1 引擎外觀狀態檢修"
      },
      {
        question: "2 引擎啟動檢查有無異常音響"
      },
      {
        question: "3 機油管路及接頭狀態檢修"
      },
      {
        question: "4 機油濾清心子及機油換新"
      },
      {
        question: "5 機油泵狀態檢修"
      },
      {
        question: "6 檢查燃油箱有無洩漏並排放沉澱水分"
      },
      {
        question: "7 燃油箱通氣孔清洗"
      },
      {
        question: "8 燃油濾清心子換新"
      },
      {
        question: "9 檢查燃油管路及接頭有無洩漏"
      },
      {
        question: "10 檢查燃油油量"
      },
      {
        question: "11 水箱清拭及狀態檢修"
      },
      {
        question: "12 冷卻水管路及接頭狀態檢修"
      },
      {
        question: "13 冷卻水更換及添加防銹劑"
      },
      {
        question: "14 水泵狀態檢修"
      },
      {
        question: "15 放出各油系濾清器沉澱水分"
      },
      {
        question: "16 清洗散熱器外部校正翅片"
      },
      {
        question: "17 各部螺栓檢查鎖緊"
      },
      {
        question: "18 各驅動皮帶調整檢修"
      },
      {
        question: "19 大風扇及軸承狀態檢修"
      },
      {
        question: "20 空氣濾清器內部清洗(包括心子)"
      },
      {
        question: "21 渦輪增壓機進、排氣葉輪狀態檢修"
      },
      {
        question: "22 噴油器拆卸及狀態檢修"
      },
      {
        question: "23 進、排氣管路狀態檢修"
      },
      {
        question: "24 進、排氣閥間隙調整檢修"
      },
      {
        question: "25 消音器狀態檢修"
      },
      {
        question: "26 變速機油換新"
      },
      {
        question: "27 檢查變速機油管及接頭有無洩漏"
      },
      {
        question: "28 變速機油濾清器拆洗檢修"
      },
      {
        question: "29 控制閥拆洗檢修"
      },
      {
        question: "30 試驗調整變速機各項油壓"
      },
      {
        question: "31 變速機離合器功能檢修"
      },
      {
        question: "32 檢查逆轉機之作用油封有無洩漏"
      },
      {
        question: "33 逆轉機油換新及功能檢修"
      },
      {
        question: "34 檢查逆轉機機油壓力"
      },
      {
        question: "35 檢查逆轉機作用汽缸之動作"
      },
      {
        question: "36 檢查減速機軸承潤滑管路有無破損或洩漏"
      },
      {
        question: "37 減速機油換新及功能檢修"
      },
      {
        question: "38 檢查減速機齒輪箱有無裂痕或漏油"
      },
      {
        question: "39 推進軸及萬向接頭加油脂及功能檢修"
      },
      {
        question: "40 各部螺栓檢查鎖緊"
      },
      {
        question: "41 轉向架框架及裝配狀態檢修"
      },
      {
        question: "42 彈簧狀態檢修"
      },
      {
        question: "43 中心盤狀態檢修"
      },
      {
        question: "44 旁承座狀態檢修"
      },
      {
        question: "45 車輪尺寸量測及狀態檢修"
      },
      {
        question: "46 車軸及軸箱狀態檢修(第一次四級檢修後，需實施非破壞檢測)"
      },
      {
        question: "47 撒砂裝置功能檢修"
      },
      {
        question: "48 傳動連桿狀態檢修"
      },
      {
        question: "49 濾水器拆洗檢修"
      },
      {
        question: "50 基礎軔機拆解檢修並加油潤滑"
      },
      {
        question: "51 氣軔軟管狀態檢修"
      },
      {
        question: "52 空氣壓縮機效能檢修"
      },
      {
        question: "53 更換壓縮機油"
      },
      {
        question: "54 檢查軔塊厚度及調整間隙"
      },
      {
        question: "55 軔機性能試驗檢修"
      },
      {
        question: "56 調壓器試驗檢修"
      },
      {
        question: "57 軔缸拆解清洗及功能檢修"
      },
      {
        question: "58 司軔閥總成拆解清洗及功能檢修(含繼動閥、控制閥等)"
      },
      {
        question: "59 分配閥拆解清洗及功能檢修"
      },
      {
        question: "60 壓力表試驗檢修"
      },
      {
        question: "61 駐車煞車試驗檢修"
      },
      {
        question: "62 清潔發電機空氣濾清器(無該設備則免)"
      },
      {
        question: "63 清掃發電機室內外四周(無該設備則免)"
      },
      {
        question: "64 檢查發電機碳刷及整流子並加油(無該設備則免)"
      },
      {
        question: "65 檢查啟動馬達碳刷及整流子並加油"
      },
      {
        question: "66 儀表功能測試檢修"
      },
      {
        question: "67 控制燈及指示燈功能測試檢修"
      },
      {
        question: "68 頭燈、尾燈及信號燈功能測試檢修"
      },
      {
        question: "69 電氣各部位連結線測試檢修(鎖緊各電線端子螺栓)"
      },
      {
        question: "70 蓄電池拆卸整理及功能檢修"
      },
      {
        question: "71 充電器狀態檢修"
      },
      {
        question: "72 各項電氣裝備絕緣檢修"
      },
      {
        question: "73 繼電器、電磁閥功能檢修"
      },
      {
        question: "74 感測器功能檢修"
      },
      {
        question: "75 車體外觀及裝配狀態檢修"
      },
      {
        question: "76 檢查車體平衡"
      },
      {
        question: "77 隨車裝置狀態檢修"
      },
      {
        question: "78 排障器狀態檢修"
      },
      {
        question: "79 雨刷機功能檢修"
      },
      {
        question: "80 喇叭功能檢修"
      },
      {
        question: "81 檢查滅火器日期及狀態"
      },
      {
        question: "82 駕駛室門、窗、座椅及車內附屬設備功能檢修"
      },
      {
        question: "83 連結器分解清洗檢修"
      },
      {
        question: "84 旁鏈裝置狀態檢修"
      },
      {
        question: "85 無線電操作功能檢修"
      },
      {
        question: "86 空調機拆卸清洗及功能檢修"
      }
    ]
  })
};
</script>