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
                        :download="item.fileName"
                    >
                        {{ item.fileName }}
                    </v-chip>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-ungroup</v-icon>通報連結
                    </span>
                </v-col>

                <v-col class="white pa-3">
                    <v-chip small label color="teal" class="mr-2 mb-2 mb-sm-0"
                        v-for="item in notifyLinks"
                        :key="item.id"
                        :to="item.link"
                        target="_blank"
                        rel="noopener norefferrer"
                        dark
                    >
                        <v-avatar left>
                            <v-icon>mdi-link-variant</v-icon>
                        </v-avatar>
                        {{ item.id }}
                    </v-chip>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12" class="mt-10">
            <v-card tile>
                <v-toolbar flat dense dark color="brown">
                    <v-toolbar-title>
                        <v-icon class="mb-1 mr-2">mdi-pen</v-icon>相關表單填寫
                    </v-toolbar-title>
                </v-toolbar>

                <v-list-item-group>
                        <v-list-item append
                            :to="`/smis/car-accident-event/${routeId}/person-casualty`"
                        >
                            <v-list-item-content>
                                <v-list-item-title class="d-flex align-center">
                                    <v-btn x-small depressed rounded
                                        :color="(finishDeath)? 'success' : 'error'"
                                        class="mr-3"
                                    >
                                        {{ (finishDeath)? '已填寫' : '未填寫' }}
                                    </v-btn>
                                    人員傷亡名單
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-divider></v-divider>

                        <v-list-item
                            :to="`/smis/car-accident-event/${routeId}/driving-improve`"
                        >
                            <v-list-item-content>
                                <v-list-item-title class="d-flex align-center">
                                    <v-btn x-small depressed rounded
                                        :color="(finishImprove)? 'success' : 'error'"
                                        class="mr-3"
                                    >
                                        {{ (finishImprove)? '已填寫' : '未填寫' }}
                                    </v-btn>
                                    改善措施
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                </v-list-item-group>
            </v-card>
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
            >作廢</v-btn>

            <v-btn dark  class="ma-2" color="success"
                @click="save"
            >申請審核資料</v-btn>
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
            status: { icon: 'mdi-ray-vertex', title: '事故事件狀態', text: '' },
        },
        notifyLinks: [],  // 連結的通報
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
                    findDate: '2017-01-25',  // 發現日期
                    findHour: '15',  // 發現日期(時)
                    findMin: '56',  // 發現日期(分)
                    location: 'l1',  // 發現地點
                    locationK: 20,  // 路線k
                    locationM: 445,　// 路線m
                    locationOther: '',　// 其他地點
                    accidentType: 'M2',  // 事故類型
                    eqLoss: 'APC3 車廂轉向架受損',// 設備損失
                    serviceShock: '影響列車計2列次', // 營運衝擊
                    handle: "1430 312次由奮起湖車站開出。\n1556 312次行駛至嘉義線 20K+445M 出軌，列車於嘉義線 19K+700M停止 司機員及列車員立即通報嘉義車庫及竹崎車站請求救援。\n1633 接駁列車511 次自北門站開出至事故現場接駁 6 次旅客。\n1658 312次將第 1 車廂重新編組載運 29 位旅客離開事故現場。\n1703 搶修列車521 次自北門車站開出辦理搶修作業。\n1734 接駁列車511 次抵達事故現場。\n1803 312次將第 1 車廂重新編組載運 29 位旅客抵達嘉義車站。\n1816 接駁列車511 次自事故現場開出。\n1915 接駁列車511 次抵達嘉義車站。\n1919 復軌完成。\n2000 路線測試完成恢復正常。\n2139 搶修列車521 次返回北門車站。", // 處置過程
                    review: '新增行車事故事件本事故事發後，鐵道局於107年3月5日啟動專案調查，並於同月8、9日辦理本事故專案調查簡報討論、文件檢視及現場勘查 。同年5月3日召開本事故專案調查工作會議。最終於同年8月15日召開交通部鐵路行車事故調查小組第24次會議，確認本事故專案調查結果。', // 檢討過程
                    reason: "<直接原因>\n事故路段因氣候易潮濕，加上路基排水狀況不佳 造成該路段有多處噴泥現象， 當鋼軌受列車重壓下沉致軌枕沉 陷、鋼軌產生前後高低不整之現象，在 列車於動態行駛下易致鋼軌單邊下沉產生平面性扭曲，使車輪浮動爬上出軌。\n<間接原因>\n部分路段道碴存有厚度不足加上列車反覆作用下，致使路基土壤細粒料因壓力而循道碴間隙上升， 使路基出現鬆動現象。\n<其他因素>\n有關天候、車輛、人員及運轉等部分，經檢討尚無涉事故原因。", // 原因分析
                    note: '本事故由鐵道局( 鐵路營運監理小組) 及 5位具軌道、力學、車輛及營運等專業之外聘專案委員組成團隊進行專案調查，並由本部鐵路行車事故調查小組 定期委員開會確認調查結果。',  // 通報內容
                    files: [
                        { fileName: 'ASRC200701.jpg', link: '/demofile/demo.jpg' },
                        { fileName: 'ASRC200702.jpg', link: '/demofile/demo2.jpg' },
                        { fileName: '123.pdf', link: '/demofile/123.pdf' },
                        { fileName: '123.docx', link: '/demofile/123.docx' },
                        { fileName: '456.xlsx', link: '/demofile/456.xlsx' },
                    ],
                    finishDeath: true,  // 是否完成人員傷亡名單
                    finishImprove: false,  // 是否完成改善措施
                    notifyLinks: [  // 連結的通報
                        {
                            id: 'SH458987',
                            status: '審核中',
                        },
                        {
                            id: 'SH378011',
                            status: '已結案',
                        },
                    ],
                }

                this.setShowData(obj)
                this.chLoadingShow()
            }, 1000)
        },
        // 初始化資料
        setShowData(obj) {
            this.topItems.findDate.text = `${obj.findDate} ${obj.findHour}:${obj.findMin}:00`  // 發現日期
            this.topItems.findLocation.text = `${locationOpts.find(item => item.value == obj.location).text} ${obj.locationK}K+${obj.locationM}M`  // 發現地點
            this.topItems.accidentType.text = evtTypes.find(item => item.value == obj.accidentType).text  // 事故類型
            this.topItems.status.text = '已立案'  // 事故事件狀態

            this.eqLoss = obj.eqLoss  // 設備損失
            this.serviceShock = obj.serviceShock  // 營運衝擊
            this.handle = obj.handle.replace(/\n/g, '<br>')  // 處置過程
            this.review = obj.review.replace(/\n/g, '<br>')  // 檢討過程
            this.reason = obj.reason.replace(/\n/g, '<br>')  // 原因分析
            this.note = obj.note.replace(/\n/g, '<br>') // 備註說明
            this.files = [ ...obj.files ]  // 檔案附件
            this.finishDeath = obj.finishDeath // 是否完成人員傷亡名單
            this.finishImprove = obj.finishImprove // 是否完成改善措施

            // 危害通報連結 (依通報狀態連至不同頁面)
            let arr = obj.notifyLinks.map(item => {
                let link = ''
                switch(item.status) {
                    case '未審核':
                        link = `/smis/harmnotify/${item.id}/show`
                        break
                    case '審核中':
                        link = `/smis/harmnotify/${item.id}/review`
                        break
                    case '已結案':
                        link = `/smis/harmnotify/${item.id}/complated`
                        break
                    default:
                        break
                }

                return {
                    id: item.id,
                    link: link,
                }
            })
            this.notifyLinks = [ ...arr ]
        },
        // 作廢
        del() {
            if (confirm('你確定要作廢嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.$router.push({ path: '/smis/car-accident-event' })
                    this.chMsgbar({ success: true, msg: '作廢成功'})
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 申請措施審核
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