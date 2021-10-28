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
                src="../assets/images/bg07.jpg"
                max-width="250"
                ></v-img>
                <!-- src="https://cdn2.ettoday.net/images/50/50489.jpg" -->
            </a>
        </v-col>
        <v-col cols="4">
            <div class="text-h6 mb-1">
            國家地震中心
            </div>
            <a @click="link2">
                <v-img
                src="../assets/images/ncree.png"
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
                src="../assets/images/ncdr.jpg"
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
                    src="../assets/images/dpyl.png"
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
                    src="../assets/images/cgs.png"
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
                    src="../assets/images/swcb.png"
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
                    src="../assets/images/ceoc.jpg"
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