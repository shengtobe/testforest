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
                        :download="item.fileName"
                    >
                        {{ item.fileName }}
                    </v-chip>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
    
    <v-row class="my-8">
        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-message-processing</v-icon>回覆處理
            </h3>
            
            <p v-if="replay.replied" class="mt-4">
                <span class="font-weight-bold">已於 {{ replay.time }} 回覆：</span>
                <span class="error--text">{{ replay.msg }}</span>
            </p>

            <v-sheet elevation="2" class="px-3 mb-5 pt-2" v-else>
                <v-radio-group hide-details v-model="ipt.reply" class="py-3 ma-0">
                    <v-radio
                        v-for="item in replyRadios"
                        :label="item.text"
                        color="green"
                        :value="item.value"
                        :key="item.text"
                        class="mb-2"
                    ></v-radio>
                </v-radio-group>

                <v-text-field
                    v-model.trim="ipt.replyOther"
                    solo
                    label="請輸入自訂回覆訊息"
                    :disabled="ipt.reply != 4"
                ></v-text-field>
            </v-sheet>
        </v-col>

        <v-col cols="12" class="text-center" v-if="!replay.replied">
            <v-btn dark color="success"
                @click="sendReplay"
            >送出回覆</v-btn>
        </v-col>
    </v-row>

    <v-divider></v-divider>

    <!-- 立案處理 -->
    <div class="my-12">
        <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-database-plus</v-icon>立案處理
        </h3>
        
        <v-sheet elevation="2" class="mb-5 py-3 px-4">
            <p class="error--text mb-0">請點選要如何處理：</p>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-btn color="indigo" dark block large
                        @click="addCarEvt"
                    >
                        新登錄至行車事故事件紀錄
                    </v-btn>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-btn color="indigo" dark block large
                        @click="connCarEvt"
                    >
                        連結至已登錄行車事故事件紀錄
                    </v-btn>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-btn color="indigo" dark block large
                        
                    >
                        新登錄至行車危害
                    </v-btn>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-btn color="indigo" dark block large
                        @click="connCarHarm"
                    >
                        連結至已登錄行車危害
                    </v-btn>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-btn color="indigo" dark block large
                        
                    >
                        新登錄至職災事故紀錄
                    </v-btn>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-btn color="indigo" dark block large
                        @click="connJobEvt"
                    >
                        連結至已登錄職災事故紀錄
                    </v-btn>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-btn color="indigo" dark block large
                        
                    >
                        新登錄至職災危害
                    </v-btn>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-btn color="indigo" dark block large
                        @click="connJobHarm"
                    >
                        連結至已登錄職災危害
                    </v-btn>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-btn color="indigo" dark block large
                        @click="noAction"
                    >
                        不予處理
                    </v-btn>
                </v-col>

                <v-col cols="12" sm="6" align-self="center"
                    v-if="caseMsg != ''"
                >
                    <v-icon class="mb-2 mr-1">mdi-lightbulb-on</v-icon> 
                    <span>{{ caseMsg }}</span>
                </v-col>

                <v-col cols="12" v-if="noActionShow">
                    <v-text-field
                        v-model.trim="noActionReason"
                        solo
                        label="請輸入不予處理的原因"
                        hide-details
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-sheet>

        <v-col cols="12" class="text-center">
            <v-btn dark class="mr-4"
                to="/smis/harmnotify/audit"
            >回搜尋頁</v-btn>

            <v-btn dark color="teal" class="mr-4"
                @click="copy"
            >複製通報</v-btn>

            <v-btn dark color="success"
                @click="save"
            >確定立案</v-btn>
        </v-col>
    </div>

    <!-- dialog - 行車事故事件 -->
    <NotifyEvtDialog
        :id="routeId"
        :dialogShow="dialogShow.carEvt"
        :headers="headers.carEvt"
        :items="dialogTableItems.carEvt"
        dialog="carEvt"
        @closeShow="dialogShow.carEvt = false"
        @connect="connect"
    />

    <!-- dialog - 行車危害 -->
    <NotifyHarmDialog
        :id="routeId"
        :dialogShow="dialogShow.carHarm"
        :headers="headers.carHarm"
        dialog="carHarm"
        @closeShow="dialogShow.carHarm = false"
        @connect="connect"
    />

    <!-- dialog - 職災事故 -->
    <NotifyEvtDialog
        :id="routeId"
        :dialogShow="dialogShow.jobEvt"
        :headers="headers.jobEvt"
        :items="dialogTableItems.jobEvt"
        dialog="jobEvt"
        @closeShow="dialogShow.jobEvt = false"
        @connect="connect"
    />

    <!-- dialog - 職災危害 -->
    <NotifyHarmDialog
        :id="routeId"
        :dialogShow="dialogShow.jobHarm"
        :headers="headers.jobHarm"
        dialog="jobHarm"
        @closeShow="dialogShow.jobHarm = false"
        @connect="connect"
    />
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import TopBasicTable from '@/components/TopBasicTable.vue'
import NotifyEvtDialog from '@/components/smis/NotifyEvtDialog.vue'
import NotifyHarmDialog from '@/components/smis/NotifyHarmDialog.vue'
import { carEventItems, jobEventItems } from '@/assets/js/smisTestData'
import { locationOpts } from '@/assets/js/smisData'

export default {
    data: () => ({
        routeId: '',
        replay: {
            replied: false,  // 是否已回覆
            msg: '',  // 回覆的訊息
            time: '',  // 回覆日期
        },
        cacheData: {},  // 暫存資料 (sessionStorage 會取用)
        topItems: {  // 上面的欄位
            creater: { icon: 'mdi-account', title: '通報人', text: '' },
            depart: { icon: 'mdi-apps', title: '所屬部門', text: '' },
            findDate: { icon: 'mdi-calendar-text', title: '發現日期', text: '' },
            createDate: { icon: 'mdi-calendar-text', title: '填報日期', text: '' },
            findLocation: { icon: 'mdi-map-marker', title: '發現地點', text: '' },
            status: { icon: 'mdi-ray-vertex', title: '通報狀態', text: '' },
        },
        subject: '',  // 通報主旨
        content: '',  // 通報內容
        files: [],  // 檔案附件
        ipt: {
            reply: 1,  // 回覆處理
            replyOther: '',  // 回覆處理-自訂訊息
            caseChose: '',  // 立案處理選擇的方式
        },
        replyRadios: [
            { text: '感謝通報，已通知相關單位處理', value: 1 },
            { text: '感謝通報，已採「危害」立案管理之', value: 2 },
            { text: '感謝通報，已採「事故/事件」立案', value: 3 },
            { text: '自訂回覆訊息', value: 4 },
        ],
        dialogShow: {  // dialog 是否顯示
            carEvt: false,  // 行車事故事件
            carHarm: false,  // 行車危害
            jobEvt: false,  // 職災事故事件
            jobHarm: false,  // 職災危害
        },
        connData: {  // 連結資料
            id: '',  // 編號
            model: '',  // 模組名稱
        },
        caseMsg: '',  // 立案處理題示字
        dialogTableItems: {  // dialog 表格資料
            carEvt: [],  // 行車事故事件
            carHarm: [],  // 行車危害
            jobEvt: [],  // 職災事故事件
            jobHarm: [],  // 職災危害
        },
        headers: {  // dialog 表格顯示的標題欄位
            carEvt: [
                { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '發生日期', value: 'date', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '發生地點', value: 'location', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '事故類型', value: 'evtType', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '死傷人數', value: 'deathCount', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '設備損失', value: 'eqLoss', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '營運衝擊', value: 'serviceShock', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '連結資料', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            ],
            carHarm: [
                { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '危害說明', value: 'caption', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '直接原因', value: 'reason', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '衍生事故', value: 'deriveEvt', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '營運模式', value: 'serviceMode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '風險等級', value: 'level', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '連結資料', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            ],
            jobEvt: [
                { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '發生日期', value: 'date', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '勞工類型', value: 'memberType', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '姓名', value: 'name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '發生地點', value: 'location', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '事故類別', value: 'evtType', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '災害類型', value: 'harmType', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '事故結果', value: 'result', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '連結資料', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            ],
            jobHarm: [
                { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '作業名稱', value: 'name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '工作內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '作業環境', value: 'env', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '工具設備', value: 'tools', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '危害類型', value: 'harmType', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '風險嚴重性', value: 'riskSerious', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '風險等級', value: 'riskLevel', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '連結資料', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            ],
        },
        noActionShow: false,  // 不予處理原因欄位是否顯示
        noActionReason: '',  // 不予處理原因
    }),
    components: {
        TopBasicTable,
        NotifyEvtDialog,
        NotifyHarmDialog,
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
                    status: '未回覆',  // 通報狀態
                    subject: '阿里山站外發現鐵軌上有倒下的樹木',  // 通報主旨
                    content: '鐵軌上有倒下的樹木數十根，會影響行車，樹木寬目測直徑皆超過100公分，需多人協助移除',  // 通報內容
                    files: [
                        { fileName: 'ASRC200701.jpg', link: '/demofile/demo.jpg' },
                        { fileName: 'ASRC200702.jpg', link: '/demofile/demo2.jpg' },
                        { fileName: '123.pdf', link: '/demofile/123.pdf' },
                        { fileName: '123.docx', link: '/demofile/123.docx' },
                        { fileName: '456.xlsx', link: '/demofile/456.xlsx' },
                    ],
                }

                this.setShowData(obj)
                this.cacheData = { ...obj }
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
            this.topItems.status.text = obj.status  // 通報狀態

            this.subject = obj.subject  // 通報主旨
            this.content = obj.content // 通報內容
            this.files = [ ...obj.files ]  // 檔案附件
        },
        // 連結行車事故事件
        connCarEvt() {
            this.noActionShow = false  // 關閉不予處理原因欄位
            this.chLoadingShow()

            // 向後端請求資料
            setTimeout(() => {
                this.dialogTableItems.carEvt = [ ...carEventItems ]
                this.dialogShow.carEvt = true
                this.chLoadingShow()
            }, 1000)
        },
        // 連結行車危害
        connCarHarm() {
            this.noActionShow = false  // 關閉不予處理原因欄位
            this.dialogShow.carHarm = true
        },
        // 連結職災事故
        connJobEvt() {
            this.noActionShow = false  // 關閉不予處理原因欄位
            this.chLoadingShow()

            // 向後端請求資料
            setTimeout(() => {
                this.dialogTableItems.jobEvt = [ ...jobEventItems ]
                this.dialogShow.jobEvt = true
                this.chLoadingShow()
            }, 1000)
        },
        // 連結職災危害
        connJobHarm() {
            this.noActionShow = false  // 關閉不予處理原因欄位
            this.dialogShow.jobHarm = true
        },
        // 確認連結 (接收子組件傳來的資料)
        connect(id, model) {
            let modelName = ''
            this.cacheData.id = id
            this.dialogShow[model] = false  // 關閉 dialog
            
            switch(model) {
                case 'carEvt':
                    modelName = '行車事故事件'
                    this.ipt.caseChose = 2
                    break;
                case 'carHarm':
                    modelName = '行車危害'
                    this.ipt.caseChose = 4
                    break;
                case 'jobEvt':
                    modelName = '職災事故'
                    this.ipt.caseChose = 6
                    break;
                case 'jobHarm':
                    modelName = '職災危害'
                    this.ipt.caseChose = 8
                    break;
                default:
                    break;
            }
            this.caseMsg = `你選擇連結「${modelName}」，編號 ${id}`
        },
        // 立案處理-不予處理
        noAction() {
            this.ipt.caseChose = 9
            this.caseMsg = '你選擇「不予處理」'
            this.noActionShow = true
        },
        // 送出回覆
        sendReplay() {
            if (confirm('送出後無法再修改內容，你確定要送出回覆嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.replay.replied = true
                    this.replay.time = '2020-10-01 09:34:00'

                    if (this.ipt.reply != 4) {
                        this.replay.msg = this.replyRadios.find(item => item.value == this.ipt.reply).text
                    } else {
                        this.replay.msg = this.ipt.replyOther
                    }
                    this.topItems.status.text = '已回覆尚未立案'  // 通報狀態
                    this.chMsgbar({ success: true, msg: '回覆成功'})
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 確定立案(用在立案處理是連結跟不予處理的情況)
        save() {
            if (!this.replay.replied) {
                alert('請先完成回覆處理!')
                return
            }

            this.chLoadingShow()

            setTimeout(() => {
                this.chMsgbar({ success: true, msg: '立案成功'})
                this.$router.push({ path: '/smis/harmnotify/audit' })
                this.chLoadingShow()
            }, 1000)
        },
        // 將資料存至 sessionStorage
        storeSession(obj) {
            sessionStorage.setItem('notifyItem', JSON.stringify({
                id: obj.id,
                files: obj.files,  // 附件
                date: obj.findDate,  // 發現日期
                hour: obj.findHour,  // 發現日期(時)
                min: obj.findMin,  // 發現日期(分)
                location: obj.location,  // 發現地點
                locationK: obj.locationK,  // 路線k
                locationM: obj.locationM,　// 路線m
                locationOther: obj.locationOther,　// 其他地點
                content: obj.content,  // 通報內容
            }));
        },
        // 新登錄至行車事故事件
        addCarEvt() {
            this.storeSession(this.cacheData)  // 將資料存至 sessionStorage
            this.$router.push({ path: '/smis/car-accident-event/add' })
        },
        // 複製通報
        copy() {
            if (confirm('你確定要複製通報嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '已複製了一筆通報'})
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