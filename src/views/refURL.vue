<template>
<v-container style="max-width: 1200px;">
    <h2 class="mb-4 label-title">相關網站</h2>
    <v-row no-gutters >
        <v-col cols="4">
            <div class="text-h6 mb-1">
            中央氣象局
            </div>
            <a @click="link1">
                <v-img
                src="https://cdn2.ettoday.net/images/50/50489.jpg"
                max-width="250"
                ></v-img>
            </a>
        </v-col>
        <v-col cols="4">
            <div class="text-h6 mb-1">
            國家地震中心
            </div>
            <a @click="link2">
                <v-img
                src="data:image/png;base64,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"
                max-width="220"
                ></v-img>
            </a>
        </v-col>
        <v-col cols="4">
            <div class="text-h6 mb-1">
            國家災害防救科技中心
            </div>
            <a @click="link3">
                <v-img
                src="https://www.ncdr.nat.gov.tw/Content/img/logo_400x300.jpg"
                    max-width="270"
                ></v-img>
            </a>
        </v-col>
        <v-row no-gutters class="mt-10">
            <v-col cols="4">
                <div class="text-h6 mb-1">
                水土保持局之土石流防災中心
                </div>
                <a @click="link4">
                    <v-img
                    src="https://dpyl.yuntech.edu.tw/assets/RelatedLink/%E5%9C%9F%E7%9F%B3%E6%B5%81%E9%98%B2%E7%81%BD%E8%B3%87%E8%A8%8A%E7%B6%B2.png"
                    max-width="330"
                    ></v-img>
                </a>
            </v-col>
            <v-col cols="4">
                <div class="text-h6 mb-1">
                經濟部中央地質調查所全球資訊網
                </div>
                <a @click="link5">
                    <v-img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/ROC_Central_Geological_Survey_Emblem.svg/200px-ROC_Central_Geological_Survey_Emblem.svg.png"
                    max-width="220"
                    ></v-img>
                </a>
            </v-col>
            <v-col cols="4">
                <div class="text-h6 mb-1">
                行政院農業委員會水土保持局全球資訊網
                </div>
                <a @click="link6">
                    <v-img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/ROC_Soil_and_Water_Conservation_Bureau_Emblem.svg/1200px-ROC_Soil_and_Water_Conservation_Bureau_Emblem.svg.png"
                    max-width="220"
                    ></v-img>
                </a>
            </v-col>
        </v-row>
        <v-row no-gutters class="mt-10">
            <v-col cols="4">
                <div class="text-h6 mb-1">
                中央災害應變中心
                </div>
                <a @click="link7">
                    <v-img
                    src="https://ws.moi.gov.tw/001/Upload/OldFile/news_content/news_content_22155.jpg"
                    max-width="220"
                    ></v-img>
                </a>
            </v-col>
        </v-row>
        
    </v-row>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data: () => ({
        workNumber: '',  // 工單編號
        finishMan: '',
        isShowBtn: false,
        isShowBtn2: false,
        done: false,  // 是否完成頁面操作
        newDispatcher: '',  // 轉單後的新派工人
        topItems: [],  // 上面的欄位
        bottomItems: [],  // 下面的欄位
    }),
    components: {
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
    
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 中央氣象
        link1() {
            window.open(`https://www.cwb.gov.tw/V8/C/`, '_blank')
        },
        // 國家地震中心：
        link2() {
            window.open(`https://www.ncree.narl.org.tw/`, '_blank')
        },
        // 國家災害防救科技中心：
        link3() {
            window.open(`https://datahub.ncdr.nat.gov.tw/`, '_blank')
        },
        // 水土保持局之土石流防災中心
        link4() {
            window.open(`https://246.swcb.gov.tw/`, '_blank')
        },
        // 經濟部中央地質調查所全球資訊網
        link5() {
            window.open(`https://www.moeacgs.gov.tw/`, '_blank')
        },
        // 行政院農業委員會水土保持局全球資訊網：
        link6() {
            window.open(`https://www.swcb.gov.tw/Home/`, '_blank')
        },
        // 中央災害應變中心：
        link7() {
            window.open(`https://www.emic.gov.tw/cht/index.php?`, '_blank')
        },
        
    },
    created() {
        
    }
}
</script>