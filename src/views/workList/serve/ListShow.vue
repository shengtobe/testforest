<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">工單編號：{{ routeId }}</h2>
    
    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8">
        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>通報維修地點及事項
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="noticeLocation"
                ></v-col>
            </v-row>
        </v-col>

        <!-- 操作按鈕 -->
        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="ma-2"
                to="/worklist/serve"
            >回搜尋頁</v-btn>

            <v-btn class="ma-2"
                color="primary"
                :to="`/worklist/serve/${routeId}/editList`"
            >編輯</v-btn>

            <v-btn class="ma-2"
                color="error"
                @click="deleteItem"
            >刪除</v-btn>

            <v-btn dark class="ma-2"
                color="amber darken-1"
                @click="closeWork"
            >結案</v-btn>

            <v-btn dark class="ma-2"
                color="success"
                :to="`/worklist/serve/${routeId}/newWork`"
            >派工</v-btn>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
// import { fetchWorkOrderOne } from '@/apis/workList/maintain'
// import { getNowFullTime } from '@/assets/js/commonFun'
import TopBasicTable from '@/components/TopBasicTable.vue'

export default {
    data: () => ({
        routeId: '',  // 工單編號
        topItems: {  // 上面的欄位
            year: { icon: 'mdi-calendar-text', title: '年度', text: '' },
            money: { icon: 'mdi-currency-usd', title: '預算金額', text: '' },
            expiryDate: { icon: 'mdi-calendar-text', title: '履約到期日', text: '' },
            workDateStart: { icon: 'mdi-calendar-text', title: '通知施作日(起)', text: '' },
            workDateEnd: { icon: 'mdi-calendar-text', title: '通知施作日(訖)', text: '' },
            noticeMethod: { icon: 'mdi-note', title: '通知方式', text: '' },
            noticeMember: { icon: 'mdi-account', title: '通知人', text: '' },
            creater: { icon: 'mdi-account', title: '立案人', text: '' },
            status: { icon: 'mdi-ray-vertex', title: '處理階段', text: '' },
        },
        noticeLocation: '',  // 通報維修地點及事項
    }),
    components: { TopBasicTable },
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        },
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 向後端取資料
        fetchData() {
            this.chLoadingShow()
            this.routeId = this.$route.params.id  // 路由參數

            setTimeout(() => {
                let obj = {
                    year: '109',  // 年度
                    expiryDate: '2020-12-20',  // 履約到期日
                    money: '98萬6,517',  // 預算金額
                    workDateStart: '2020-01-05',  // 通知施作日 (起)
                    workDateEnd: '2020-01-30',  // 通知施作日 (訖)
                    noticeMethod: '',  // 通知方式
                    noticeMember: '',  // 通知人
                    noticeLocation: '十字路車站上下車階梯連接通道、木構地坪設置',  // 通報維修地點及事項
                    items: [  // 請修項目
                        {
                            numbers: '1、1',
                            name: '維修大工',
                            spec: '',
                            unit: '人*日',
                            count: 1,
                            price: 2230
                        },
                        {
                            numbers: '1、2',
                            name: '維修小工',
                            spec: '',
                            unit: '人*日',
                            count: 2,
                            price: 1962
                        },
                    ],
                    creater: '王小明',  // 立案人
                    status: '待派工',  // 處理階段
                }

                this.setShowData(obj)  // 初始化資料
                this.chLoadingShow()
            }, 1000)
        },
        // 初始化資料
        setShowData(obj) {
            this.noticeLocation = obj.noticeLocation.replace(/\n/g, '<br>')  // 通報維修地點及事項

            // 設定上面的欄位資料
            this.topItems.year.text = obj.year  // 年度
            this.topItems.money.text = obj.money  // 預算金額
            this.topItems.expiryDate.text = obj.expiryDate  // 履約到期日
            this.topItems.workDateStart.text = obj.workDateStart  // 通知施作日 (起)
            this.topItems.workDateEnd.text = obj.workDateEnd  // 通知施作日 (訖)
            this.topItems.noticeMethod.text = obj.noticeMethod  // 通知方式
            this.topItems.noticeMember.text = obj.noticeMember  // 通知人
            this.topItems.creater.text = obj.creater  // 立案人
            this.topItems.status.text = obj.status  // 處理階段
        },
        // 刪除
        deleteItem() {
            if (confirm('你確定要刪除嗎?')) {
                this.chLoadingShow()

                // 範例效果
                setTimeout(() => {
                    // 刪除完後，轉頁到搜尋頁
                    this.chMsgbar({ success: true, msg: '刪除成功' })
                    this.$router.push({ path: '/worklist/serve' })
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 結案
        closeWork() {
            if (confirm('你確定要結案嗎?')) {
                this.chLoadingShow()
                // 範例效果
                setTimeout(() => {
                    // 結案完後，轉頁到搜尋頁
                    this.chMsgbar({ success: true, msg: '結案成功' })
                    this.$router.push({ path: '/worklist/serve' })
                    this.chLoadingShow()
                }, 1000)
            }
        },
    },
    created() {
        this.fetchData()
    }
}
</script>