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
          <p>*工作重點：以清洗、注油、測量、調整、校正、試驗、用以保持動力、傳動、行走、軔機、儀錶等裝置動作圓滑，運用狀態正常之檢修或局部拆卸檢修。</p>
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
    title: "柴油液力機車二級檢修記錄表",
    newText: "記錄表",
    isLoading: false,
    disabled: false,
    menu: false, // 時間選單是否顯示
    ipt: {
      department: "",
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
      ],
      suggest: "", // 改善建議
      track: "" // 改善追蹤
    },
    items: [
      {
        question: "1. 清洗、擦拭引擎外觀"
      },
      {
        question: "2. 引擎啟動檢查有無異常音響"
      },
      {
        question: "3. 檢查機油管路及接頭有無洩漏"
      },
      {
        question: "4. 檢查機油油面高度"
      },
      {
        question: "5. 檢查燃油箱有無洩漏並排放沉澱水分"
      },
      {
        question: "6. 檢查燃油管路及接頭有無洩漏"
      },
      {
        question: "7. 檢查燃油油量"
      },
      {
        question: "8. 檢查冷卻水管路及接頭有無洩漏"
      },
      {
        question: "9. 檢查冷卻水量及添加防銹劑"
      },
      {
        question: "10. 檢查水泵"
      },
      {
        question: "11. 放出各油系濾清器沉澱水分"
      },
      {
        question: "12. 清洗散熱器外部校正翅片"
      },
      {
        question: "13. 各部螺栓檢查鎖緊"
      },
      {
        question: "14. 調整各驅動皮帶"
      },
      {
        question: "15. 檢查清掃大風扇及軸承加油脂"
      },
      {
        question: "16. 清潔空氣濾清器"
      },
      {
        question: "17. ＊檢查渦輪增壓機有無漏油"
      },
      {
        question: "18. 檢查進、排氣管路有無洩漏"
      },
      {
        question: "19. 進排氣閥間隙調整"
      },
      {
        question: "20. 檢查變速機油面高度及清洗加油蓋"
      },
      {
        question: "21. 檢查變速機油管及接頭有無洩漏"
      },
      {
        question: "22. 排出變速機空氣"
      },
      {
        question: "23. ＊清洗控制閥"
      },
      {
        question: "24. ＊試驗調整變速機各項油壓"
      },
      {
        question: "25. 試驗變速機離合器板作用"
      },
      {
        question: "26. 檢查逆轉機之作用油封有無洩漏"
      },
      {
        question: "27. 檢查逆轉機油面高度"
      },
      {
        question: "28. ＊檢查逆轉機機油壓力(或指示燈)必要時換油"
      },
      {
        question: "29. ＊檢查逆轉機作用汽缸之動作"
      },
      {
        question: "30. 檢查減速機軸承潤滑管路有無破損或洩漏"
      },
      {
        question: "31. 檢查減速機油面高度"
      },
      {
        question: "32. 檢查減速機齒輪箱有無裂痕或漏油"
      },
      {
        question: "33. 檢查推進軸及萬向接頭有無鬆弛並加油脂"
      },
      {
        question: "34. 檢查鎖緊各固定螺絲"
      },
      {
        question: "35. 清掃轉向架框架及檢查有無裂痕"
      },
      {
        question: "36. 檢查彈簧有無變形或破損"
      },
      {
        question: "37. 旁承座狀態檢修"
      },
      {
        question: "38. 車輪輪緣尺寸量測及狀態檢修"
      },
      {
        question: "39. 車軸及軸箱狀態檢修"
      },
      {
        question: "40. 撒砂裝置功能檢修"
      },
      {
        question: "41. 傳動連桿狀態檢修"
      },
      {
        question: "42. 濾水器清洗檢修及排出風缸水分"
      },
      {
        question: "43. 基礎軔機狀態檢修並加油潤滑"
      },
      {
        question: "44. 氣軔軟管狀態檢修"
      },
      {
        question: "45. 檢查空氣壓縮機油面高度"
      },
      {
        question: "46. 檢查空氣壓縮機動作情況並調整皮帶"
      },
      {
        question: "47. 檢查軔塊厚度及調整間隙"
      },
      {
        question: "48. 軔機性能試驗檢修"
      },
      {
        question: "49. 調壓器試驗檢修"
      },
      {
        question: "50. 司軔閥試驗檢修"
      },
      {
        question: "51. 壓力表校正檢修"
      },
      {
        question: "52. 駐車煞車試驗檢修"
      },
      {
        question: "53. 清潔發電機空氣濾清器(無該設備則免)"
      },
      {
        question: "54. 清掃發電機室室內四周(無該設備則免)"
      },
      {
        question: "55. ＊檢查發電機碳刷及整流子並加油(無該設備則免)"
      },
      {
        question: "56. ＊檢查起動馬達碳刷及整流子並加油"
      },
      {
        question: "57. 儀錶功能測試檢修"
      },
      {
        question: "58. 控制燈及指示燈功能測試檢修"
      },
      {
        question: "59. 頭燈、尾燈及信號燈功能測試檢修"
      },
      {
        question: "60. 電氣各部位連結線測試檢修"
      },
      {
        question: "61. 檢查蓄電池各極電壓及電液比重"
      },
      {
        question: "62. 充電器狀態檢修"
      },
      {
        question: "63. 各項電氣裝備絕緣檢查"
      },
      {
        question: "64. 車體外觀及裝配狀態檢修"
      },
      {
        question: "65. ＊檢查車體平衡"
      },
      {
        question: "66. 隨車裝備狀態檢修"
      },
      {
        question: "67. 排障器狀態檢修"
      },
      {
        question: "68. 雨刷機功能檢修"
      },
      {
        question: "69. 喇叭功能檢修"
      },
      {
        question: "70. 檢查滅火器日期及狀態"
      },
      {
        question: "71. 駕駛室門、窗、座椅及車內設備功能檢修"
      },
      {
        question: "72. 連結器功能檢修"
      },
      {
        question: "73. 旁鏈裝置狀態檢修"
      },
      {
        question: "74. 無線電功能檢修"
      },
      {
        question: "75. 空調機濾網清洗及功能檢修"
      }
    ]
  })
};
</script>