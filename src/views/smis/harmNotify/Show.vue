<template>
<v-container>
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
                        <v-icon class="mr-1 mb-1">mdi-pen</v-icon>通報摘要
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
    </v-row>
    
    <v-row class="my-8">
        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-message-processing</v-icon>回覆處理
            </h3>
            
            <v-sheet elevation="2" class="px-3 mb-5 pt-2">
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

        <v-col cols="12" class="text-center">
            <v-btn dark class="mr-4"
                to="/smis/harmnotify/audit"
            >回搜尋頁</v-btn>

            <v-btn dark color="success"
                @click="save"
            >確定送出</v-btn>
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
                        @click="showCaseMsg('你確定要新登錄至「行車危害」嗎?')"
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
                        @click="showCaseMsg('你確定要新登錄至「職災事故紀錄」嗎?')"
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
                        @click="showCaseMsg('你確定要新登錄至「職災危害」嗎?')"
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
                        @click="showCaseMsg('你確定要「不予處理」嗎?')"
                    >
                        不予處理
                    </v-btn>
                </v-col>
            </v-row>
        </v-sheet>
    </div>

    <!-- dialog - 行車事故事件 -->
    <NotifyEvtDialog
        :id="routeId"
        :dialogShow="dialogShow.carEvt"
        :headers="headers.carEvt"
        :items="dialogTableItems.carEvt"
        dialog="carEvt"
        @closeShow="dialogShow.carEvt = false"
    />

    <!-- dialog - 行車危害 -->
    <NotifyHarmDialog
        :id="routeId"
        :dialogShow="dialogShow.carHarm"
        :headers="headers.carHarm"
        dialog="carHarm"
        @closeShow="dialogShow.carHarm = false"
    />

    <!-- dialog - 職災事故 -->
    <NotifyEvtDialog
        :id="routeId"
        :dialogShow="dialogShow.jobEvt"
        :headers="headers.jobEvt"
        :items="dialogTableItems.jobEvt"
        dialog="jobEvt"
        @closeShow="dialogShow.jobEvt = false"
    />

    <!-- dialog - 職災危害 -->
    <NotifyHarmDialog
        :id="routeId"
        :dialogShow="dialogShow.jobHarm"
        :headers="headers.jobHarm"
        dialog="jobHarm"
        @closeShow="dialogShow.jobHarm = false"
    />

    <!-- 立案處理新登錄的 dialog -->
    <v-dialog v-model="caseDialogShow" max-width="450">
        <v-card>
            <v-card-title
                class="yellow lighten-3 py-2 px-3"
                primary-title
            >
                <strong>重要訊息</strong>
                <v-spacer></v-spacer>

                <v-btn text fab small @click="caseDialogShow = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <v-sheet class="pa-4">{{ caseMode }}</v-sheet>

            <v-card-actions class="px-5 pb-5">
                <v-spacer></v-spacer>
                <v-btn class="mr-2" elevation="4" :loading="caseDialogLoading" @click="caseDialogShow = false">取消</v-btn>
                <v-btn color="success"  elevation="4" :loading="caseDialogLoading" @click="caseAdd">確定</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
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
        cacheData: {},  // 暫存資料 (sessionStorage 會取用)
        topItems: {  // 上面的欄位
            creater: { icon: 'mdi-account', title: '通報人', text: '' },
            depart: { icon: 'mdi-apps', title: '所屬部門', text: '' },
            findDate: { icon: 'mdi-calendar-text', title: '發現日期', text: '' },
            createDate: { icon: 'mdi-calendar-text', title: '填報日期', text: '' },
            findLocation: { icon: 'mdi-map-marker', title: '發現地點', text: '' },
            caseStatus: { icon: 'mdi-ray-vertex', title: '立案狀態', text: '' },
        },
        subject: '',  // 通報摘要
        content: '',  // 通報內容
        files: [],  // 檔案附件
        ipt: {
            reply: 1,  // 回覆處理
            replyOther: '',  // 回覆處理-自訂訊息
            caseChose: '',  // 立案處理選擇的方式
        },
        stateRadios: [
            { text: '未立案', value: 1 },
            { text: '以行車事故事件立案', value: 2 },
            { text: '以行車危害立案', value: 3 },
            { text: '以職安事故立案', value: 4 },
            { text: '以職安危害立案', value: 5 },
        ],
        replyRadios: [
            { text: '感謝通報，已通知相關單位處理', value: 1 },
            { text: '感謝通報，已採「危害」立案管理之', value: 2 },
            { text: '感謝通報，已採「事故/事件」立案', value: 3 },
            { text: '自訂回覆訊息', value: 4 },
        ],
        caseDialogShow: false,  // 立案處理新登錄 dialog 是否顯示
        caseMode: '',  // 新登入模組名稱(用於組合訊息)
        caseDialogLoading: false,
        dialogShow: {  // dialog 是否顯示
            carEvt: false,  // 行車事故事件
            carHarm: false,  // 行車危害
            jobEvt: false,  // 職災事故事件
            jobHarm: false,  // 職災危害
        },
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
                { text: '死亡人數', value: 'deathCount', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '受傷人數', value: 'injuredCount', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
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
                    caseStatus: '未立案',  // 立案狀態
                    subject: '阿里山站外發現鐵軌上有倒下的樹木',  // 通報摘要
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
            this.topItems.caseStatus.text = obj.caseStatus  // 立案狀態

            this.subject = obj.subject  // 通報摘要
            this.content = obj.content // 通報內容
            this.files = [ ...obj.files ]  // 檔案附件
        },
        // 連結行車事故事件
        connCarEvt() {
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
            this.dialogShow.carHarm = true
        },
        // 連結職災事故
        connJobEvt() {
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
            this.dialogShow.jobHarm = true
        },
        showCaseMsg(txt) {
            this.caseMode = txt
            this.caseDialogShow = true
        },
        // 立案處理新登入確定
        caseAdd() {
            this.caseDialogLoading = true
            setTimeout(() => {
                this.chMsgbar({ success: true, msg: '資料更新成功'})
                this.caseDialogLoading = false
                this.caseDialogShow = false
            }, 1000)
        },
        // 送出
        save() {
            this.chLoadingShow()

            setTimeout(() => {
                this.chMsgbar({ success: true, msg: '資料更新成功'})
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
    },
    created() {
        this.fetchData()
    },
}
</script>