<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">事故事件編號：{{ routeId }}</h2>

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
                        <v-icon class="mr-1 mb-1">mdi-cellphone-link-off</v-icon>設備損失
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ eqLoss }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-alert-decagram</v-icon>營運衝擊
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ serviceShock }}</v-col>
            </v-row>
        </v-col>
        
        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>處置過程
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="handle"
                ></v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>檢討過程
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="review"
                ></v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>原因分析
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="reason"
                ></v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>備註說明
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="note"
                ></v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-paperclip</v-icon>檔案附件
                    </span>
                </v-col>

                <v-col class="white pa-3">
                    <v-chip small label color="primary" class="mr-2 mb-2 mb-sm-0"
                        v-for="item in files"
                        :key="item.fileName"
                        :href="item.link"
                        target="_blank"
                        rel="noopener norefferrer"
                    >
                        {{ item.fileName }}
                    </v-chip>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12" class="mt-8">
            <v-row>
                <v-col cols="12" sm="3" md="2">
                    <v-badge overlap
                        :color="(finishDeath)? 'success' : 'error'"
                        :content="(finishDeath)? '已填寫' : '未填寫'"
                    >
                        <v-btn elevation="3" large  color="brown" dark tile
                            :to="`/smis/car-accident-event/${routeId}/person-casualty`"
                        >
                            人員傷亡名單
                        </v-btn>
                    </v-badge>
                </v-col>

                <v-col cols="12" sm="3" md="2">
                    <v-badge overlap
                        :color="(finishImprove)? 'success' : 'error'"
                        :content="(finishImprove)? '已填寫' : '未填寫'"
                    >
                        <v-btn elevation="3" large color="brown" dark tile
                            :to="`/smis/car-accident-event/${routeId}/driving-improve`"
                        >
                            改善措施檢討
                        </v-btn>
                    </v-badge>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12" class="text-center mt-12 mb-8">
            <v-btn dark class="ma-2"
                to="/smis/car-accident-event"
            >回搜尋頁</v-btn>

            <v-btn dark class="ma-2"
                color="indigo"
                :to="`/smis/car-accident-event/${routeId}/edit`"
            >編輯</v-btn>

            <v-btn dark  class="ma-2" color="error"
                @click="del"
            >刪除</v-btn>

            <v-btn dark  class="ma-2" color="success"
                @click="save"
            >申請結案</v-btn>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import TopBasicTable from '@/components/TopBasicTable.vue'
import { locationOpts, evtTypes } from '@/assets/js/smisData'

export default {
    data: () => ({
        routeId: '',
        eqLoss: '',// 設備損失
        serviceShock: '', // 營運衝擊
        handle: '', // 處置過程
        review: '', // 檢討過程
        reason: '', // 原因分析
        note: '', // 備註說明
        files: [],  // 上傳的檔案
        finishDeath: false,  // 是否完成人員傷亡名單
        finishImprove: false,  // 是否完成改善措施
        topItems: {  // 上面的欄位
            findDate: { icon: 'mdi-calendar-text', title: '發現日期', text: '' },
            findLocation: { icon: 'mdi-map-marker', title: '發現地點', text: '' },
            accidentType: { icon: 'mdi-snowflake', title: '事故類型', text: '' },
        },
    }),
    components: { TopBasicTable },
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        }
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 向後端取得資料
        fetchData() {
            this.chLoadingShow()
            this.routeId = this.$route.params.id

            // 新增測試用資料
            setTimeout(() => {
                let obj = {
                    findDate: '2020-03-15',  // 發現日期
                    findHour: '14',  // 發現日期(時)
                    findMin: '00',  // 發現日期(分)
                    location: 't17',  // 發現地點
                    locationK: '',  // 路線k
                    locationM: '',　// 路線m
                    locationOther: '',　// 其他地點
                    accidentType: 'A12',  // 事故類型
                    eqLoss: '無',// 設備損失
                    serviceShock: '列車停駛30分鐘', // 營運衝擊
                    handle: '派三名人員至現場移除', // 處置過程
                    review: '無', // 檢討過程
                    reason: '樹木不明原因倒落', // 原因分析
                    note: '鐵軌上有倒下的樹木數十根，會影響行車，樹木寬目測直徑皆超過100公分，需多人協助移除',  // 通報內容
                    files: [
                        { fileName: 'ASRC200701.jpg', link: '/demofile/demo.jpg' },
                        { fileName: 'ASRC200702.jpg', link: '/demofile/demo2.jpg' },
                        { fileName: '123.pdf', link: '/demofile/123.pdf' },
                        { fileName: '123.docx', link: '/demofile/123.docx' },
                        { fileName: '456.xlsx', link: '/demofile/456.xlsx' },
                    ],
                    finishDeath: true,  // 是否完成人員傷亡名單
                    finishImprove: false,  // 是否完成改善措施
                }

                this.setShowData(obj)
                this.chLoadingShow()
            }, 1000)
        },
        // 初始化資料
        setShowData(obj) {
            this.topItems.findDate.text = `${obj.findDate} ${obj.findHour}:${obj.findMin}:00`  // 發現日期
            this.topItems.findLocation.text = locationOpts.find(item => item.value == obj.location).text  // 發現地點
            this.topItems.accidentType.text = evtTypes.find(item => item.value == obj.accidentType).text  // 事故類型

            this.eqLoss = obj.eqLoss  // 設備損失
            this.serviceShock = obj.serviceShock  // 營運衝擊
            this.handle = obj.handle  // 處置過程
            this.review = obj.review  // 檢討過程
            this.reason = obj.reason  // 原因分析
            this.note = obj.note // 備註說明
            this.files = [ ...obj.files ]  // 檔案附件
            this.finishDeath = obj.finishDeath // 是否完成人員傷亡名單
            this.finishImprove = obj.finishImprove // 是否完成改善措施
        },
        // 刪除
        del() {
            if (confirm('你確定要刪除嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.$router.push({ path: '/smis/car-accident-event' })
                    this.chMsgbar({ success: true, msg: '刪除成功'})
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 申請結案
        save() {
            let errArr = []
            if (!this.finishDeath) errArr.push('人員傷亡名單')
            if (!this.finishImprove) errArr.push('改善措施檢討')

            if (this.finishDeath && this.finishImprove) {  // 都有填寫
                this.chLoadingShow()

                setTimeout(() => {
                    this.chLoadingShow()
                }, 1000)
            } else {
                let errLog = '你還未填寫「'+ errArr.join('、') + '」'
                alert(errLog)
            }
        },
    },
    created() {
        this.fetchData()
    }
}
</script>