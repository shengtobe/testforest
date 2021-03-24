<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">通報編號：{{ id }}</h2>

    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8 mb-4">
        <BottomTable :items="bottomItems" />
    </v-row>

    <!-- 檔案列表 -->
    <FileListShow :fileList="files" title="檔案列表" />
    
    <v-row class="mt-8 mb-4">
        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-message-processing</v-icon>回覆處理
            </h3>
            
            <p v-if="status > 1" class="mt-4">
                <span class="font-weight-bold">已回覆通報人：</span>
                <span class="error--text">{{ replayMsg }}</span>
            </p>

            <v-sheet elevation="2" class="px-3 mb-5 pt-2" v-else>
                <v-radio-group hide-details v-model="ipt.reply" class="py-3 ma-0">
                    <v-radio
                        v-for="item in replyRadios"
                        color="green"
                        class="mb-2"
                        :label="item"
                        :value="item"
                        :key="item"
                    ></v-radio>
                </v-radio-group>

                <v-text-field
                    v-model.trim="ipt.replyOther"
                    solo
                    label="請輸入自訂回覆訊息"
                    :disabled="ipt.reply != '自訂訊息'"
                ></v-text-field>
            </v-sheet>
        </v-col>

        <v-col cols="12" class="text-center" v-if="status == 1">
            <v-btn dark color="success"
                @click="sendReplay"
            >送出回覆</v-btn>
        </v-col>
    </v-row>

    <v-divider class="mb-3"></v-divider>

    <!-- 立案處理 -->
    <v-row class="mb-12">
        <!-- <h3 class="mb-1">
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
                        @click="addCarHarm"
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
                        @click="addJobEvt"
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
                        to="/smis/jobsafety/disasterdb/add"
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
        </v-sheet> -->

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>以行安立案
            </h3>
            <v-select
                v-model="carSafeType"
                :items="carSafeTypeOpt"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>以職安立案
            </h3>
            <v-select
                v-model="jobSafeType"
                :items="jobSafeTypeOpt"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" class="text-center mt-8">
            <v-btn dark class="mr-4"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done">
                <v-btn dark color="purple" class="mr-4"
                    @click="nocreate"
                >不立案</v-btn>

                <v-btn dark color="success"
                    @click="save"
                >確定立案</v-btn>
            </template>
        </v-col>
    </v-row>

    <!-- dialog - 行車事故事件 -->
    <!-- <NotifyEvtDialog
        :id="id"
        :dialogShow="dialogShow.carEvt"
        :headers="headers.carEvt"
        :items="dialogTableItems.carEvt"
        dialog="carEvt"
        @closeShow="dialogShow.carEvt = false"
        @connect="connect"
    /> -->

    <!-- dialog - 行車危害 -->
    <!-- <NotifyHarmDialog
        :id="id"
        :dialogShow="dialogShow.carHarm"
        :headers="headers.carHarm"
        dialog="carHarm"
        @closeShow="dialogShow.carHarm = false"
        @connect="connect"
    /> -->

    <!-- dialog - 職災事故 -->
    <!-- <NotifyEvtDialog
        :id="id"
        :dialogShow="dialogShow.jobEvt"
        :headers="headers.jobEvt"
        :items="dialogTableItems.jobEvt"
        dialog="jobEvt"
        @closeShow="dialogShow.jobEvt = false"
        @connect="connect"
    /> -->

    <!-- dialog - 職災危害 -->
    <!-- <NotifyHarmDialog
        :id="id"
        :dialogShow="dialogShow.jobHarm"
        :headers="headers.jobHarm"
        dialog="jobHarm"
        @closeShow="dialogShow.jobHarm = false"
        @connect="connect"
    /> -->
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import TopBasicTable from '@/components/TopBasicTable.vue'
import BottomTable from '@/components/BottomTable.vue'
import FileListShow from '@/components/FileListShow.vue'
import { replyNotify } from '@/apis/smis/harmNotify'
// import NotifyEvtDialog from '@/components/smis/NotifyEvtDialog.vue'
// import NotifyHarmDialog from '@/components/smis/NotifyHarmDialog.vue'
// import { carEventItems, jobEventItems } from '@/assets/js/smisTestData'

export default {
    props: ['itemData'],
    data: () => ({
        id: '',  // 危害通報編號
        done: false,  // 是否完成頁面操作
        status: '',  // 狀態
        replayMsg: '',  // 回覆的訊息
        // cacheData: {},  // 暫存資料 (sessionStorage 會取用)
        topItems: [],  // 上面的欄位
        bottomItems: [],  // 下面的欄位
        files: [],  // 檔案附件
        ipt: {
            reply: '感謝通報，已通知相關單位處理',  // 回覆處理
            replyOther: '',  // 回覆處理-自訂訊息
            // caseChose: '',  // 立案處理選擇的方式
        },
        replyRadios: [
            '感謝通報，已通知相關單位處理',
            '感謝通報，已採「危害」立案管理之',
            '感謝通報，已採「事故/事件」立案',
            '自訂訊息',
        ],
        // dialogShow: {  // dialog 是否顯示
        //     carEvt: false,  // 行車事故事件
        //     carHarm: false,  // 行車危害
        //     jobEvt: false,  // 職災事故事件
        //     jobHarm: false,  // 職災危害
        // },
        // connData: {  // 連結資料
        //     id: '',  // 編號
        //     model: '',  // 模組名稱
        // },
        // caseMsg: '',  // 立案處理題示字
        // dialogTableItems: {  // dialog 表格資料
        //     carEvt: [],  // 行車事故事件
        //     carHarm: [],  // 行車危害
        //     jobEvt: [],  // 職災事故事件
        //     jobHarm: [],  // 職災危害
        // },
        // headers: {  // dialog 表格顯示的標題欄位
        //     carEvt: [
        //         { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '發生日期', value: 'date', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '發生地點', value: 'location', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '事故類型', value: 'evtType', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '死傷人數', value: 'deathCount', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '設備受損情形', value: 'eqLoss', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '運轉影響情形', value: 'serviceShock', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '連結資料', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //     ],
        //     carHarm: [
        //         { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '危害說明', value: 'caption', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '直接原因', value: 'reason', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '衍生事故', value: 'deriveEvt', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '營運模式', value: 'serviceMode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '風險等級', value: 'level', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '連結資料', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //     ],
        //     jobEvt: [
        //         { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '發生日期', value: 'date', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '勞工類型', value: 'memberType', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '姓名', value: 'name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '發生地點', value: 'location', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '事故類別', value: 'evtType', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '災害類型', value: 'harmType', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '事故結果', value: 'result', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '連結資料', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //     ],
        //     jobHarm: [
        //         { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '作業名稱', value: 'name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '工作內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '作業環境', value: 'env', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '工具設備', value: 'tools', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '危害類型', value: 'harmType', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '風險嚴重性', value: 'riskSerious', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '風險等級', value: 'riskLevel', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '連結資料', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //     ],
        // },
        // noActionShow: false,  // 不予處理原因欄位是否顯示
        // noActionReason: '',  // 不予處理原因
        carSafeType: '',  // 行安
        jobSafeType: '',  // 職安
        carSafeTypeOpt: [  // 行安下拉選單
            { text: '不選擇', value: '' }, 
            { text: '新增行安事故', value: 'A' }, 
            { text: '既有行安事故', value: 'B' }, 
            { text: '新增行安危害', value: 'C' }, 
            { text: '既有行安危害', value: 'D' }, 
        ],
        jobSafeTypeOpt: [  // 職安下拉選單
            { text: '不選擇', value: '' }, 
            { text: '新增職災事故', value: 'A' }, 
            { text: '既有職災事故', value: 'B' }, 
            { text: '新增職安危害', value: 'C' }, 
            { text: '既有職安危害', value: 'D' }, 
        ],
    }),
    components: {
        TopBasicTable,
        BottomTable,
        FileListShow,
        // NotifyEvtDialog,
        // NotifyHarmDialog,
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'closeWindow',  // 關閉視窗
        ]),
        // 初始化資料
        setShowData(obj) {
            this.status = obj.ReportStatus  // 狀態(用來判斷是否已回覆通報人)
            this.id = obj.EndangerID  // 危害通報編號
            this.topItems = obj.topItems  // 上面的欄位資料
            this.bottomItems = obj.bottomItems  // 下面的欄位資料
            this.files = [ ...obj.FileCount ]  // 檔案附件
            this.replayMsg = obj.ReplyMsg  // 回覆訊息
        },
        // 連結行車事故事件
        // connCarEvt() {
        //     this.noActionShow = false  // 關閉不予處理原因欄位
        //     this.chLoadingShow()

        //     // 向後端請求資料
        //     setTimeout(() => {
        //         this.dialogTableItems.carEvt = [ ...carEventItems ]
        //         this.dialogShow.carEvt = true
        //         this.chLoadingShow()
        //     }, 1000)
        // },
        // 連結行車危害
        // connCarHarm() {
        //     this.noActionShow = false  // 關閉不予處理原因欄位
        //     this.dialogShow.carHarm = true
        // },
        // 連結職災事故
        // connJobEvt() {
        //     this.noActionShow = false  // 關閉不予處理原因欄位
        //     this.chLoadingShow()

        //     // 向後端請求資料
        //     setTimeout(() => {
        //         this.dialogTableItems.jobEvt = [ ...jobEventItems ]
        //         this.dialogShow.jobEvt = true
        //         this.chLoadingShow()
        //     }, 1000)
        // },
        // 連結職災危害
        // connJobHarm() {
        //     this.noActionShow = false  // 關閉不予處理原因欄位
        //     this.dialogShow.jobHarm = true
        // },
        // 確認連結 (接收子組件傳來的資料)
        // connect(id, model) {
        //     let modelName = ''
        //     this.cacheData.id = id
        //     this.dialogShow[model] = false  // 關閉 dialog
            
        //     switch(model) {
        //         case 'carEvt':
        //             modelName = '行車事故事件'
        //             this.ipt.caseChose = 2
        //             break;
        //         case 'carHarm':
        //             modelName = '行車危害'
        //             this.ipt.caseChose = 4
        //             break;
        //         case 'jobEvt':
        //             modelName = '職災事故'
        //             this.ipt.caseChose = 6
        //             break;
        //         case 'jobHarm':
        //             modelName = '職災危害'
        //             this.ipt.caseChose = 8
        //             break;
        //         default:
        //             break;
        //     }
        //     this.caseMsg = `你選擇連結「${modelName}」，編號 ${id}`
        // },
        // 立案處理-不予處理
        // noAction() {
        //     this.ipt.caseChose = 9
        //     this.caseMsg = '你選擇「不予處理」'
        //     this.noActionShow = true
        // },
        // 送出回覆
        sendReplay() {
            if (confirm('送出後無法再修改內容，你確定要送出回覆嗎?')) {
                this.chLoadingShow()
                this.replayMsg = (this.ipt.reply == '自訂訊息')? this.ipt.replyOther : this.ipt.reply
                
                replyNotify({
                    EndangerID: this.id,  // 危害通報編號
                    ReplyMsg: this.replayMsg,  // 回覆訊息
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '回覆成功'})
                        this.status = '2'  // 狀態改為已回覆
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                     this.chMsgbar({ success: false, msg: '回覆成功'})
                }).finally(() => {
                    this.chLoadingShow()
                })
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
                this.done = true  // 隱藏頁面操作按鈕
                this.chLoadingShow()
            }, 1000)
        },
        // 將資料存至 sessionStorage
        // storeSession(obj) {
        //     sessionStorage.setItem('notifyItem', JSON.stringify({
        //         id: obj.id,
        //         files: obj.files,  // 附件
        //         date: obj.findDate,  // 發現日期
        //         hour: obj.findHour,  // 發現日期(時)
        //         min: obj.findMin,  // 發現日期(分)
        //         location: obj.location,  // 發現地點
        //         locationK: obj.locationK,  // 路線k
        //         locationM: obj.locationM,　// 路線m
        //         locationOther: obj.locationOther,　// 其他地點
        //         content: obj.content,  // 通報內容
        //     }));
        // },
        // // 新登錄至行車事故事件
        // addCarEvt() {
        //     this.storeSession(this.cacheData)  // 將資料存至 sessionStorage
        //     this.$router.push({ path: '/smis/car-accident-event/add' })
        // },
        // // 新登錄至行車危害
        // addCarHarm() {
        //     this.storeSession(this.cacheData)  // 將資料存至 sessionStorage
        //     this.$router.push({ path: '/smis/car-harmdb/harms/add' })
        // },
        // // 新登錄至職災事故紀錄
        // addJobEvt() {
        //     this.storeSession(this.cacheData)  // 將資料存至 sessionStorage
        //     this.$router.push({ path: '/smis/jobsafety/disaster-survey-add' })
        // },
        // 不立案
        nocreate() {
            if (confirm('你確定要不立案嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '不立案成功'})
                    this.done = true  // 隱藏頁面操作按鈕
                    this.chLoadingShow()
                }, 1000)
            }
        },
    },
    created() {
        this.setShowData(this.itemData)
    },
}
</script>