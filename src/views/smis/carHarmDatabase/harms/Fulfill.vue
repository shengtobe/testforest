<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">危害編號：{{ routeId }}</h2>

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
                        <v-icon class="mr-1 mb-1">mdi-pen</v-icon>危害說明
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="desc"
                ></v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-pen</v-icon>直接成因
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
                        <v-icon class="mr-1 mb-1">mdi-pen</v-icon>可能的間接原因
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="indirectReason"
                ></v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-note</v-icon>備註
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
                        <v-icon class="mr-1 mb-1">mdi-alert-decagram</v-icon>影響、營運衝擊
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ affectTxt }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-arrow-expand</v-icon>衍生事故
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ accidentsTxt }}</v-col>
            </v-row>
        </v-col>

        <!-- 控制措施 -->
        <v-col cols="12" class="mt-8 mb-10">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-check-circle</v-icon>控制措施
            </h3>
            <v-card>
                <v-data-table
                    :headers="headers"
                    :items="tableItems"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:item.desc="{ item }">
                        <v-btn color="teal" dark
                            @click="showContent(item.desc)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.file="{ item }">
                        <v-btn fab small dark color="brown"
                            :href="item.file.link"
                            target="_blank"
                            rel="noopener norefferrer"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.evidences="{ item }">
                        <v-btn fab small dark color="purple lighten-2"
                            @click="showEvidences(item.evidences)"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>

        <!-- 上傳的證據檔案列表 -->
        <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>本案上傳之證據
        </h3>
        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC"
            v-for="list in uploads"
            :key="list.controlId"
        >
            <v-row no-gutters>
                <v-col class="purple lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        措施編號 {{ list.controlId }}
                    </span>
                </v-col>

                <v-col class="white px-3 pt-1 d-flex flex-wrap">
                    <v-chip small label color="primary" class="mr-3 my-2"
                        v-for="file in list.files"
                        :key="file.name"
                        :href="file.link"
                        target="_blank"
                        rel="noopener norefferrer"
                    >
                        {{ file.name }}
                    </v-chip>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12" class="text-center mt-12 mb-8">
            <v-btn dark class="ma-2"
                to="/smis/car-harmdb/harms"
            >回搜尋頁</v-btn>

            <v-btn dark  class="ma-2" color="error"
                @click="dialog = true"
                v-if="status == 4 || status == 7"
            >退回</v-btn>

            <v-btn dark  class="ma-2" color="success"
                @click="save"
                v-if="status == 4"
            >同意結案</v-btn>

            <v-btn dark  class="ma-2" color="error"
                @click="del"
                v-if="status == 5 && version.nowId == version.lasterId"
            >作廢</v-btn>

            <v-btn dark  class="ma-2" color="primary"
                @click="rerun"
                v-if="status == 5 && version.nowId == version.lasterId"
            >重提危害</v-btn>

            <v-btn dark  class="ma-2" color="brown"
                @click="showVersion"
                v-if="status == 5"
            >編修歷程紀錄</v-btn>

            <v-btn dark  class="ma-2" color="indigo"
                :to="`/smis/car-harmdb/harms/${routeId}/update`"
                v-if="status == 5 && version.nowId == version.lasterId"
            >危害更新</v-btn>

            <v-btn dark  class="ma-2" color="success"
                @click="agreeDel"
                v-if="status == 7"
            >同意作廢</v-btn>
        </v-col>
    </v-row>

    <!-- 退回 dialog -->
    <v-dialog v-model="dialog" max-width="600px"
        v-if="status == 4 || status == 7"
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

    <!-- 控制措施證據 dialog -->
    <v-dialog v-model="dialogShow" max-width="400px">
        <v-card>
            <v-toolbar flat dense dark color="purple lighten-2">
                <v-toolbar-title>證據</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn fab small text @click="dialogShow = false" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-list-item-group>
                <template v-for="(item, idx) in evidences">
                    <v-list-item
                        :key="item.name"
                        :href="item.link"
                        target="_blank"
                        rel="noopener norefferrer"
                    >
                        <v-list-item-content>
                            <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider
                        v-if="idx + 1 < evidences.length"
                        :key="idx"
                    ></v-divider>
                </template>
            </v-list-item-group>
        </v-card>
    </v-dialog>

    <!-- 編修歷程紀錄 -->
    <v-dialog v-model="verDialogShow" max-width="500px">
        <v-card>
            <v-card>
                <v-data-table
                    :headers="verHeaders"
                    :items="verTableItems"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                >
                    <template v-slot:item.action="{ item }">
                        <v-btn color="teal" dark
                            :loading="isLoading"
                            @click="chVersion(item.id)"
                        >切換</v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import TopBasicTable from '@/components/TopBasicTable.vue'

export default {
    props: ['closeStatus'],  // 測試用屬性
    data: () => ({
        routeId: '',
        status: '',  // 處理狀態
        topItems: {  // 上面的欄位
            depart: { icon: 'mdi-bank', title: '權責單位', text: '' },
            mode: { icon: 'mdi-snowflake', title: '營運模式', text: '' },
            wbs: { icon: 'mdi-source-branch', title: '關聯子系統', text: '' },
            serious: { icon: 'mdi-format-line-spacing', title: '風險嚴重性', text: '' },
            frequency: { icon: 'mdi-signal-variant', title: '風險頻率', text: '' },
            status: { icon: 'mdi-ray-vertex', title: '危害狀態', text: '' },
        },
        desc: '',  // 危害說明
        reason: '',  // 危害直接成因
        indirectReason: '',  // 可能的危害間接原因
        note: '',  // 備註
        controls: [],  // 控制措施
        affectTxt: '',  // 影響、營運衝擊字串
        accidentsTxt: '',  // 衍生事故字串
        tableItems: [],  // 表格資料
        headers: [  // 表格欄位
            { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '措施簡述', value: 'subject', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '措施說明', value: 'desc', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '管控單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '規章', value: 'file', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '證據', value: 'evidences', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '備註', value: 'note', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
        evidences: [],  // 控制措施證據
        dialogShow: false,  // 控制措施證據 dialog 是否顯示
        isLoading: false,  // 是否讀取中
        dialog: false,  // 退回 dialog 是否顯示
        backReason: '',  // 退回原因
        uploads: [],  // 上傳的證據檔案列表
        verDialogShow: false,  // 版本清單 dialog 是否顯示
        verTableItems: [],  // 版本清單表格資料
        verHeaders: [  // 版本清單表格欄位
            { text: '項次', value: 'version', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '更新時間', value: 'updateTime', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '查看內容', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
        version: {  // 版本
            lasterId: '',  // 最新版本id
            nowId: '',  // 目前版本id
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
            'chViewDialog',  // 檢視內容 dialog
        ]),
        // 向後端取得資料
        fetchData() {
            this.chLoadingShow()
            this.routeId = this.$route.params.id

            // 新增測試用資料
            setTimeout(() => {
                let obj = {
                    desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',  // 危害說明
                    reason: '直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字',  // 危害直接成因
                    indirectReason: '間接原因文字間接原因文字間接原因文字間接原因文字間接原因文字間接原因文字間接原因文字間接原因文字間接原因文字',  // 可能的危害間接原因
                    note: '',  // 備註
                    depart: '鐵路服務科',// 權責部門
                    mode: '正常',  // 營運模式
                    wbs: 'APC2',  // 關聯子系統
                    serious: '稍微',  // 風險嚴重性
                    frequency: '很少',  // 風險頻率
                    affectTraveler: true,  // 影響旅客
                    affectStaff: true,  // 影響員工
                    affectPublic: false,  // 影響大眾
                    trainLate: false,  // 列車誤點
                    stopOperation: false,  // 中斷營運
                    accidents: ['側線火災事故', '設備損壞事故'],  // 衍生事故
                    versionId: 2,  // 版本id (不是版本號)
                    controls: [  // 控制措施
                        {
                            id: 123,
                            subject: '火災處理要點',
                            desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',
                            depart: '綜合企劃科',
                            file: { link: '/demofile/123.pdf' },
                            note: '',
                            evidences: [
                                {
                                    name: '456.xlsx',
                                    link: '/demofile/456.xlsx'
                                },
                                {
                                    name: '123.pdf',
                                    link: '/demofile/123.pdf'
                                },
                            ],
                        },
                        {
                            id: 456,
                            subject: '中暑急救要點',
                            desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',
                            depart: '綜合企劃科',
                            file: { link: '/demofile/123.docx' },
                            note: '',
                            evidences: [
                                {
                                    name: '123.pdf',
                                    link: '/demofile/123.pdf'
                                },
                            ],
                        },
                    ],
                    uploads: [
                        {
                            controlId: '123',
                            files: [
                                {
                                    name: '456.xlsx',
                                    link: '/demofile/456.xlsx'
                                },
                            ]
                        },
                        { 
                            controlId: '456', 
                            files: [
                                {
                                    name: '123.pdf',
                                    link: '/demofile/123.pdf'
                                },
                            ]
                        },
                    ]
                }

                this.setShowData(obj)
                this.chLoadingShow()
            }, 1000)
        },
        // 初始化資料
        setShowData(obj) {
            this.topItems.depart.text = obj.depart  // 權責部門
            this.topItems.mode.text = obj.mode  // 營運模式
            this.topItems.wbs.text = obj.wbs  // 關聯子系統
            this.topItems.serious.text = obj.serious  // 風險嚴重性
            this.topItems.frequency.text = obj.frequency  // 風險頻率
            this.topItems.status.text = (this.closeStatus == 5)? '風險已可接受' : '審核中'  // 危害狀態

            this.desc = obj.desc.replace(/\n/g, '<br>')  // 危害說明
            this.reason = obj.reason.replace(/\n/g, '<br>')  // 危害直接成因
            this.indirectReason = obj.indirectReason.replace(/\n/g, '<br>')  // 可能的危害間接原因
            this.note = obj.note.replace(/\n/g, '<br>')  // 備註
            this.controls = [ ...obj.controls ]  // 控制措施
            
            // 影響、營運衝擊字串
            let arr = []
            if (obj.affectTraveler) arr.push('影響旅客')
            if (obj.affectStaff) arr.push('影響員工')
            if (obj.affectPublic) arr.push('影響大眾')
            if (obj.trainLate) arr.push('列車誤點')
            if (obj.stopOperation) arr.push('中斷營運')
            this.affectTxt = arr.join('、')  

            // 衍生事故字串
            this.accidentsTxt = obj.accidents.join('、')

            this.tableItems = [ ...obj.controls ]
            this.uploads = obj.uploads  // 證據

            this.version.nowId = this.version.lasterId = obj.versionId  // 初始化版本

            // 設定狀態(測試資料)
            this.status = this.closeStatus
        },
        // 退回
        withdraw() {
            this.isLoading = true

            setTimeout(() => {
                this.chMsgbar({ success: true, msg: '退回成功'})
                this.$router.push({ path: '/smis/car-harmdb/harms' })
                this.isLoading = false
            }, 1000)
        },
        // 申請作廢
        del() {
            // 已跑到最後流程的作廢之後要請長官同意

            if (confirm('已結案的危害需經長官同意後才正式作廢，你確定要申請作廢嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '申請作廢成功'})
                    this.$router.push({ path: '/smis/car-harmdb/harms' })
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 同意作廢
        agreeDel() {
            if (confirm('你確定要作廢嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '作廢成功'})
                    this.$router.push({ path: '/smis/car-harmdb/harms' })
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 結案
        save() {
            if (confirm('你確定要結案嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '結案成功'})
                    this.$router.push({ path: '/smis/car-harmdb/harms' })
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 顯示檢視內容
        showContent(txt) {
            this.chViewDialog({ show: true, content: txt.replace(/\n/g, '<br>') })
        },
        // 顯示證據
        showEvidences(arr) {
            this.evidences = [ ...arr ]
            this.dialogShow = true
        },
        // 顯示版本清單 dialog
        showVersion() {
            this.chLoadingShow()

            setTimeout(() => {
                let arr = [
                    {
                        id: 1,  // id
                        version: 1,  // 版本號
                        updateTime: '2019-05-02 11:09:00',  // 更新時間
                    },
                    {
                        id: 2,
                        version: 2,
                        updateTime: '2019-12-28 14:30:00',
                    },
                ]

                this.verTableItems = [ ...arr ]
                this.chLoadingShow()
                this.verDialogShow = true
            }, 1000)
        },
        // 切換版本 (顯示不同版本的內容)
        chVersion(id) {
            // 點擊時 data 內的變數記目前要看的版本id，後端取得資料後更新 data 的值
            this.isLoading = true

            setTimeout(() => {
                this.version.nowId = id
                this.verDialogShow = this.isLoading = false
            }, 1000)
        },
    },
    created() {
        this.fetchData()
    }
}
</script>