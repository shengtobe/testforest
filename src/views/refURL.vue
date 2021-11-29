<template>
<v-container style="max-width: 1200px;">
    <h2 class="mb-4 label-title">相關網站</h2>
    <v-row no-gutters >
        <v-col cols="4" class="bk">
            <div class="text-h6 mb-1 ">
            中央氣象局
            </div>
            <a href="https://www.cwb.gov.tw/V8/C/" target="_blank">
                <v-img class="img-responsive center-block"
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
            <a href="https://www.ncree.narl.org.tw/" target="_blank">
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
            <div>
                <a href="https://datahub.ncdr.nat.gov.tw/" target="_blank">
                    <v-img
                    src="../assets/images/ncdr.jpg"
                        max-width="270"
                    ></v-img>
                </a>
            </div>
        </v-col>
        <v-row no-gutters class="mt-10">
            <v-col cols="4">
                <div class="text-h6 mb-1">
                水土保持局之土石流防災中心
                </div>
                <a href="https://246.swcb.gov.tw/" target="_blank">
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
                <a href="https://www.moeacgs.gov.tw/" target="_blank">
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
                <a href="https://www.swcb.gov.tw/Home/" target="_blank">
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
                <a href="https://www.emic.gov.tw/cht/index.php?" target="_blank">
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
    },
    created() {
        
    }
}
</script>
<style>
    a {
        color: #428bca;
        text-decoration: none;
    }
    .bk:hover{
        background: #428bca;
        width: 230px;
    }
</style>