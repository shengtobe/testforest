<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">通報編號：{{ routeId }}</h2>

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
                        <v-icon class="mr-1 mb-1">mdi-pen</v-icon>通報主旨
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ subject }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-note</v-icon>通報內容
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="content"
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

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>回覆日期
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ replayTime }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-message-processing</v-icon>回覆訊息
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ replayMsg }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>立案狀態
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ caseStatus }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="mr-4"
                to="/smis/harmnotify/audit"
            >回搜尋頁</v-btn>

             <v-btn dark  class="ma-2" color="error"
                @click="dialog = true"
                v-if="closeStatus == '審核中'"
            >退回</v-btn>

            <v-btn dark  class="ma-2" color="success"
                @click="save"
                v-if="closeStatus == '審核中'"
            >同意結案</v-btn>
        </v-col>
    </v-row>

    <!-- 退回 dialog -->
    <v-dialog v-model="dialog" max-width="600px"
        v-if="closeStatus == '審核中'"
    >
        <v-card>
            <v-toolbar dark flat dense color="error" class="mb-2">
                <v-toolbar-title>退回原因</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn fab small text @click="dialog = !dialog" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-textarea
                            hide-details
                            solo
                            rows="8"
                            placeholder="請輸入原因"
                            v-model.trim="backReason"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            
            <v-card-actions class="px-5 pb-5">
                <v-spacer></v-spacer>
                <v-btn class="mr-2" elevation="4" :loading="isLoading" @click="dialog = false">取消</v-btn>
                <v-btn color="success"  elevation="4" :loading="isLoading" @click="withdraw">送出</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import TopBasicTable from '@/components/TopBasicTable.vue'
import { carEventItems, jobEventItems } from '@/assets/js/smisTestData'
import { locationOpts } from '@/assets/js/smisData'

export default {
    props: ['closeStatus'],  // 測試用屬性
    data: () => ({
        routeId: '',
        topItems: {  // 上面的欄位
            creater: { icon: 'mdi-account', title: '通報人', text: '' },
            depart: { icon: 'mdi-apps', title: '所屬部門', text: '' },
            findDate: { icon: 'mdi-calendar-text', title: '發現日期', text: '' },
            createDate: { icon: 'mdi-calendar-text', title: '填報日期', text: '' },
            findLocation: { icon: 'mdi-map-marker', title: '發現地點', text: '' },
            status: { icon: 'mdi-ray-vertex', title: '審核狀態', text: '' },
        },
        subject: '',  // 通報主旨
        content: '',  // 通報內容
        files: [],  // 檔案附件
        replayMsg: '',  // 回覆訊息
        replayTime: '',  // 回覆日期
        replyRadios: [
            { text: '感謝通報，已通知相關單位處理', value: 1 },
            { text: '感謝通報，已採「危害」立案管理之', value: 2 },
            { text: '感謝通報，已採「事故/事件」立案', value: 3 },
            { text: '自訂回覆訊息', value: 4 },
        ],
        caseStatus: '',  // 立案狀態
        isLoading: false,  // 是否讀取中
        dialog: false,  // dialog 是否顯示
        backReason: '',  // 退回原因
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
                    id: 'a201586369',  // 通報id
                    creater: '王小明',  // 通報人
                    createrId: 'OB851234',  // 員工編號
                    depart: '鐵路服務科',  // 部門
                    findDate: '2020-03-15',  // 發現日期
                    findHour: '14',  // 發現日期(時)
                    findMin: '00',  // 發現日期(分)
                    createDate: '2020-03-15 15:20:00',  // 填表日期
                    location: 't17',  // 發現地點
                    locationK: '',  // 路線k
                    locationM: '',　// 路線m
                    locationOther: '',　// 其他地點
                    status: this.closeStatus,  // 審核狀態
                    caseStatus: '以行車事故事件立案',  // 立案狀態
                    subject: '阿里山站外發現鐵軌上有倒下的樹木',  // 通報主旨
                    content: '鐵軌上有倒下的樹木數十根，會影響行車，樹木寬目測直徑皆超過100公分，需多人協助移除',  // 通報內容
                    files: [
                        { fileName: 'ASRC200701.jpg', link: '/demofile/demo.jpg' },
                        { fileName: 'ASRC200702.jpg', link: '/demofile/demo2.jpg' },
                        { fileName: '123.pdf', link: '/demofile/123.pdf' },
                        { fileName: '123.docx', link: '/demofile/123.docx' },
                        { fileName: '456.xlsx', link: '/demofile/456.xlsx' },
                    ],
                    replayMsg: '感謝通報，已採「事故/事件」立案',  // 回覆的訊息
                    replayTime: '2020-03-16 09:15:00',  // 回覆日期
                }

                this.setShowData(obj)
                this.chLoadingShow()
            }, 1000)
        },
        // 初始化資料
        setShowData(obj) {
            this.topItems.creater.text = `${obj.creater} (${obj.createrId})`  // 通報人
            this.topItems.depart.text = obj.depart  // 部門
            this.topItems.findDate.text = `${obj.findDate} ${obj.findHour}:${obj.findMin}:00`  // 發現日期
            this.topItems.createDate.text = obj.createDate  // 填表日期
            this.topItems.findLocation.text = locationOpts.find(item => item.value == obj.location).text  // 發現地點
            this.topItems.status.text = obj.status  // 審核狀態

            this.subject = obj.subject  // 通報主旨
            this.content = obj.content // 通報內容
            this.files = [ ...obj.files ]  // 檔案附件
            this.replayMsg = obj.replayMsg // 回覆的訊息
            this.replayTime = obj.replayTime // 回覆日期
            this.caseStatus = obj.caseStatus // 立案狀態
        },
        // 退回
        withdraw() {
            this.isLoading = true

            setTimeout(() => {
                this.chMsgbar({ success: true, msg: '退回成功'})
                this.$router.push({ path: '/smis/harmnotify/audit' })
                this.isLoading = false
            }, 1000)
        },
        // 結案
        save() {
            if (confirm('結案後無法再退回並修改內容，你確定要結案嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '結案成功'})
                    this.$router.push({ path: '/smis/harmnotify/audit' })
                    this.chLoadingShow()
                }, 1000)
            }
        },
    },
    created() {
        this.fetchData()
    },
}
</script>