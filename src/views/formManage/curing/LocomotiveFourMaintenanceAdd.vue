<template>
  <v-sheet class="ma-4 mb-8" color="yellow lighten-2">
    <v-container style="max-width: 1200px" class="px-8">
      <p class="font-weight-black title text-center">新增{{ title }}</p>
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
          <p>*適用車種：25噸及28噸B-B型柴油液力機車。</p>
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
    title: "柴油液力機車四級檢修記錄表",
    newText: "記錄表",
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
      { question: "1. 引擎啟動檢查有無異常音響" },
      {
        question: "2. 機油管路及接頭全盤檢修"
      },
      {
        question: "3. 機油濾清器總成全盤檢修及機油換新"
      },
      {
        question: "4. 機油泵重整及管路全盤檢修"
      },
      {
        question: "5. 機油涼油器重整檢修"
      },
      {
        question: "6. 燃油箱及管路全盤檢修"
      },
      {
        question: "7. 燃油濾清器總成全盤檢修"
      },
      {
        question: "8. 燃油管路及接頭全盤檢修"
      },
      {
        question: "9. 燃油控制器及噴油泵重整檢修"
      },
      {
        question: "10. 水箱全盤檢修"
      },
      {
        question: "11. 冷卻歧管及墊料重整檢修"
      },
      {
        question: "12. 冷卻水更換及添加防銹劑"
      },
      {
        question: "13. 水泵及節溫器總成重整檢修"
      },
      {
        question: "14. 放出各油系濾清器沉澱水分"
      },
      {
        question: "15. 散熱器重整檢修"
      },
      {
        question: "16. 各部螺栓檢查鎖緊"
      },
      {
        question: "17. 各驅動皮帶全盤檢修"
      },
      {
        question: "18. 大風扇及軸承全盤檢修"
      },
      {
        question: "19. 空氣濾清器總成全盤檢修"
      },
      {
        question: "20. 渦輪增壓機總成全盤檢修"
      },
      {
        question: "21. 噴油器拆卸及狀態檢修"
      },
      {
        question: "22. 進、排氣管全盤檢修"
      },
      {
        question: "23. 進、排氣閥間隙調整檢修"
      },
      {
        question: "24. 消音器全盤檢修"
      },
      {
        question: "25. 汽缸蓋全盤檢修及汽缸蓋襯墊更換檢修"
      },
      {
        question: "26. 汽門裝置全盤檢修"
      },
      {
        question: "27. 汽門磨合重整檢修"
      },
      {
        question: "28. 汽門導管全盤檢修"
      },
      {
        question: "29. 搖桿室及汽門彈簧全盤檢修"
      },
      {
        question: "30. 汽缸蓋平面度重整檢修"
      },
      {
        question: "31. 引擎馬力測試及功能檢修"
      },
      {
        question: "32. 變速機油換新"
      },
      {
        question: "33. 變速機管路全盤檢修"
      },
      {
        question: "34. 變速機油濾清器重整檢修(含涼油器墊片更換)"
      },
      {
        question: "35. 變速機油泵重整檢修"
      },
      {
        question: "36. 變速機出力狀態功能檢修"
      },
      {
        question: "37. 控制閥重整檢修"
      },
      {
        question: "38. 變速機離合機構總成全盤檢修"
      },
      {
        question: "39. 逆轉機總成重整檢修"
      },
      {
        question: "40. 逆轉機油換新"
      },
      {
        question: "41. 減速機總成重整檢修"
      },
      {
        question: "42. 減速機油換新"
      },
      {
        question: "43. 推進軸及萬向接頭全盤檢修"
      },
      {
        question: "44. 推進軸非破壞檢修"
      },
      {
        question: "45. 各部螺栓全盤檢修"
      },
      {
        question: "46. 轉向架框架重整檢修"
      },
      {
        question: "47. 彈簧全盤檢修"
      },
      {
        question: "48. 中心盤重整檢修"
      },
      {
        question: "49. 旁承座重整檢修"
      },
      {
        question: "50. 車輪重整檢修(必要時踏面重整或換新輪箍)"
      },
      {
        question: "51. 車軸及軸箱重整檢修"
      },
      {
        question: "52. 車軸非破壞檢修"
      },
      {
        question: "53. 撒砂閥全盤檢修"
      },
      {
        question: "54. 傳動連桿總成重整檢修(必要時換銅襯)"
      },
      {
        question: "55. 濾水器全盤檢修"
      },
      {
        question: "56. 基礎軔機重整檢修"
      },
      {
        question: "57. 氣軔軟管全盤檢修"
      },
      {
        question: "58. 空氣壓縮機重整檢修"
      },
      {
        question: "59. 更換空氣壓縮機油"
      },
      {
        question: "60. 檢查軔塊厚度及調整間隙"
      },
      {
        question: "61. 軔機性能試驗檢修"
      },
      {
        question: "62. 調壓器重整檢修修"
      },
      {
        question: "63. 軔缸重整檢修"
      },
      {
        question: "64. 司軔閥總成重整檢修(含繼動閥、控制閥等橡膠件更換)"
      },
      {
        question: "65. 分配閥重整檢修(含橡膠件更換)"
      },
      {
        question: "66. 管路及集塵器全盤檢修"
      },
      {
        question: "67. 壓力表功能測試檢修"
      },
      {
        question: "68. 駐車煞車重整檢修"
      },
      {
        question: "69. 角旋塞功能測試檢修"
      },
      {
        question: "70. 緊急閥重整檢修"
      },
      {
        question: "71. 發電機總成全盤檢修(無該設備則免)"
      },
      {
        question: "72. 起動馬達全盤檢修"
      },
      {
        question: "73. 儀錶全盤檢修"
      },
      {
        question: "74. 頭燈、尾燈、信號燈、儀表燈及室內燈全盤檢修"
      },
      {
        question: "75. 電氣各部位連結線全盤檢修"
      },
      {
        question: "76. 蓄電池全盤檢修"
      },
      {
        question: "77. 充電器全盤檢修"
      },
      {
        question: "78. 各項電氣裝備絕緣檢修"
      },
      {
        question: "79. 繼電器、電磁閥(含墊片更換)功能檢修"
      },
      {
        question: "80. 感測器重整檢修"
      },
      {
        question: "81. 車體及裝配狀態全盤檢修"
      },
      {
        question: "82. 檢查車體平衡"
      },
      {
        question: "83. 車體塗裝重整檢修"
      },
      {
        question: "84. 隨車裝備全盤檢修"
      },
      {
        question: "85. 排障器全盤檢修"
      },
      {
        question: "86. 雨刷機全盤檢修"
      },
      {
        question: "87. 喇叭全盤檢修"
      },
      {
        question: "88. 檢查滅火器日期及狀態"
      },
      {
        question: "89. 駕駛室門、窗、座椅及車內附屬設備全盤檢修"
      },
      {
        question: "90. 連結器重整檢修"
      },
      {
        question: "91. 旁鏈裝置全盤檢修"
      },
      {
        question: "92. 駕駛室引擎罩間之橡膠條全盤檢修"
      },
      {
        question: "93. 無線電全盤檢修"
      },
      {
        question: "94. 空調機全盤檢修"
      }
    ]
  })
};
</script>