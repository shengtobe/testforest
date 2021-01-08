<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">事故事件編號：{{ id }}</h2>

    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8">
        <BottomTable :items="bottomItems" />
        
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
                            :to="`/smis/car-accident-event/${id}/person-casualty`"
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
                            :to="`/smis/car-accident-event/${id}/driving-improve`"
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
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done">
                <v-btn dark class="ma-2"
                    color="indigo"
                    :to="`/smis/car-accident-event/${id}/edit`"
                >編輯</v-btn>

                <v-btn dark  class="ma-2" color="error"
                    @click="del"
                >作廢</v-btn>

                <v-btn dark  class="ma-2" color="success"
                    @click="save"
                >申請審核資料</v-btn>
            </template>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { carAccidentEventStatus, locationOpts, evtTypes } from '@/assets/js/smisData'
import TopBasicTable from '@/components/TopBasicTable.vue'
import BottomTable from '@/components/BottomTable.vue'

export default {
    props: ['itemData'],
    data: () => ({
        id: '',  // 編號
        done: false,  // 是否完成頁面操作
        files: [],  // 上傳的檔案
        finishDeath: false,  // 是否完成人員傷亡名單
        finishImprove: false,  // 是否完成改善措施
        topItems: {  // 上面的欄位
            findDate: { icon: 'mdi-calendar-text', title: '發現日期', text: '' },
            findLocation: { icon: 'mdi-map-marker', title: '發現地點', text: '' },
            accidentType: { icon: 'mdi-snowflake', title: '事故類型', text: '' },
            status: { icon: 'mdi-ray-vertex', title: '事故事件狀態', text: '' },
        },
        bottomItems: [],  // 下面的欄位
        notifyLinks: [],  // 連結的通報
    }),
    components: {
        TopBasicTable,
        BottomTable,
    },
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
            'closeWindow',  // 關閉視窗
        ]),
        // 初始化資料
        setShowData(obj) {
            this.id = obj.id  // 編號

            // 設定上面的欄位資料
            this.topItems.findDate.text = `${obj.findDate} ${obj.findHour}:${obj.findMin}:00`  // 發現日期
            this.topItems.findLocation.text = `${locationOpts.find(item => item.value == obj.location).text} ${obj.locationK}K+${obj.locationM}M`  // 發現地點
            this.topItems.accidentType.text = evtTypes.find(item => item.value == obj.accidentType).text  // 事故類型
            this.topItems.status.text = carAccidentEventStatus.find(ele => ele.value == obj.status).text  // 事故事件狀態

            // 設定下面的欄位資料
            this.bottomItems = [
                { oneline: true, icon: 'mdi-cellphone-link-off', title: '設備受損情形', text: obj.eqLoss },
                { oneline: true, icon: 'mdi-alert-decagram', title: '運轉影響情形', text: obj.serviceShock },
                { oneline: false, icon: 'mdi-file-document', title: '處置過程', text: obj.handle.replace(/\n/g, '<br>') },
                { oneline: false, icon: 'mdi-file-document', title: '檢討過程', text: obj.review.replace(/\n/g, '<br>') },
                { oneline: false, icon: 'mdi-file-document', title: '原因分析', text: obj.reason.replace(/\n/g, '<br>') },
                { oneline: false, icon: 'mdi-file-document', title: '備註說明', text: obj.note.replace(/\n/g, '<br>') },
            ]

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
                    this.chMsgbar({ success: true, msg: '作廢成功'})
                    this.done = true  // 隱藏頁面操作按鈕
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
                    this.chMsgbar({ success: true, msg: '申請措施審核成功'})
                    this.done = true  // 隱藏頁面操作按鈕
                    this.chLoadingShow()
                }, 1000)
            } else {
                let errLog = '你還未填寫「'+ errArr.join('、') + '」'
                alert(errLog)
            }
        },
    },
    created() {
        this.setShowData(this.itemData)
    }
}
</script>