<template>
  <v-sheet class="ma-4 mb-8" color="yellow lighten-2">
    <v-container style="max-width: 1200px" class="px-8">
      <p class="font-weight-black title text-center">柴油液力機車一級檢修記錄表</p>
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

        <!-- <v-col cols="12" sm="4">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>檢查日期 
          </h3>
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field solo v-model="ipt.date" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker
              v-model="ipt.date"
              @input="menu = false"
              color="purple darken-1"
              locale="zh-tw"
            />
          </v-menu>
        </v-col>-->

        <v-col cols="12">
          <p>*工作重點：以視覺、聽覺、觸覺、嗅覺，就有關行車主要機件之狀態及作用施行檢修</p>
          <p>*工作記號說明：1.實施完畢或正常者。2.經修復者，需填說明。3.需進場檢修者。4.無此項目者。</p>
          <p>*適用車種：25噸及28噸B-B型柴油機車。</p>
        </v-col>
        <hr>
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
        { status: "1", note: "" }
      ],
      suggest: "", // 改善建議
      track: "" // 改善追蹤
    },
    items: [
      {
        question: "1. 檢查機油管路及接頭有無洩漏"
      },
      {
        question: "2. 檢視機油油面高度"
      },
      {
        question: "3. 檢視燃油箱有無洩漏並排放沉澱水分"
      },
      {
        question: "4. 檢視燃油管路及接頭有無洩漏"
      },
      {
        question: "5. 檢視燃油油量"
      },
      {
        question: "6. 檢視冷卻水管路及接頭有無洩漏"
      },
      {
        question: "7. 檢視冷卻水量"
      },
      {
        question: "8. 放出各油系濾清器沉澱水分"
      },
      {
        question: "9. 檢視散熱器有無洩漏並予清掃"
      },
      {
        question: "10. 檢視各部螺栓有無鬆弛"
      },
      {
        question: "11. 檢查各驅動皮帶"
      },
      {
        question: "12. 檢視大風扇傳動軸作用情況"
      },
      {
        question: "13. 檢視變速機油面高度"
      },
      {
        question: "14. 檢視變速機油管及接頭有無洩漏"
      },
      {
        question: "15. 檢視逆轉機之作用油封有無洩漏"
      },
      {
        question: "16. 檢視逆轉機油面高度"
      },
      {
        question: "17. 檢視減速機軸承潤滑管路有無破損或洩漏"
      },
      {
        question: "18. 檢視減速機油面高度"
      },
      {
        question: "19. 檢查推進軸及萬向接頭有無鬆弛"
      },
      {
        question: "20. 檢視轉向架框架有無裂痕"
      },
      {
        question: "21. 檢視彈簧有無變形或破損"
      },
      {
        question: "22. 檢視旁承座外觀及狀態"
      },
      {
        question: "23. 檢視車輪及車軸外觀及狀態"
      },
      {
        question: "24. 撒砂裝置功能測試"
      },
      {
        question: "25. 檢查傳動連桿有無鬆弛"
      },
      {
        question: "26. 排出各濾水器及風缸水分"
      },
      {
        question: "27. 檢視基礎軔機狀態並加油潤滑"
      },
      {
        question: "28. 檢查氣軔軟管有無洩漏"
      },
      {
        question: "29. 檢視空氣壓縮機油面高度"
      },
      {
        question: "30. 檢視空氣壓縮機動作情況並調整皮帶"
      },
      {
        question: "31. 檢查軔塊厚度及調整間隙"
      },
      {
        question: "32. 軔機性能試驗"
      },
      {
        question: "33. 清洗發電機風扇通風出口(無該設備則免)"
      },
      {
        question: "34. 儀錶功能測試"
      },
      {
        question: "35. 控制燈及指示燈功能測試"
      },
      {
        question: "36. 頭燈、尾燈及信號燈功能測試"
      },
      {
        question: "37. 檢視蓄電池及電氣各部位連結線情況"
      },
      {
        question: "38. 檢視充電情況"
      },
      {
        question: "39. 檢視車體外觀"
      },
      {
        question: "40. 檢查隨車裝備"
      },
      {
        question: "41. 檢視排障器外觀"
      },
      {
        question: "42. 雨刷及喇叭測試"
      },
      {
        question: "43. 檢視滅火器日期及狀態"
      },
      {
        question: "44. 檢視駕駛室門、窗、座椅及車內設備"
      },
      {
        question: "45. 檢視連結器狀態"
      },
      {
        question: "46. 檢視旁鏈裝置狀態"
      },
      {
        question: "47. 無線電操作試驗"
      },
      {
        question: "48. 空調機濾網清洗"
      }
    ]
  })
};
</script>