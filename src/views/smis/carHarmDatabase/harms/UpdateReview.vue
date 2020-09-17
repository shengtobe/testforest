<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">危害更新審核 (編號：{{ routeId }})</h2>

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-12">
        <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-bank</v-icon>權責單位
        </h3>
        <VersionDiff
            :before="before.depart"
            :after="after.depart"
        />

        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>營運模式
        </h3>
        <VersionDiff
            :before="before.mode"
            :after="after.mode"
        />

        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-source-branch</v-icon>關聯子系統
        </h3>
        <VersionDiff
            :before="before.wbs"
            :after="after.wbs"
        />

        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-format-line-spacing</v-icon>風險嚴重性
        </h3>
        <VersionDiff
            :before="before.serious"
            :after="after.serious"
        />

        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-signal-variant</v-icon>風險頻率
        </h3>
        <VersionDiff
            :before="before.frequency"
            :after="after.frequency"
        />

        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-elevation-rise</v-icon>風險等級
        </h3>
        <VersionDiff
            :before="before.level"
            :after="after.level"
        />

        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>營運模式
        </h3>
        <VersionDiff
            :before="before.mode"
            :after="after.mode"
        />

        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-pen</v-icon>危害說明
        </h3>
        <VersionDiff
            :before="before.desc"
            :after="after.desc"
        />

        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-pen</v-icon>直接成因
        </h3>
        <VersionDiff
            :before="before.reason"
            :after="after.reason"
        />

        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-pen</v-icon>可能的間接原因
        </h3>
        <VersionDiff
            :before="before.indirectReason"
            :after="after.indirectReason"
        />

        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-note</v-icon>備註
        </h3>
        <VersionDiff
            :before="before.note"
            :after="after.note"
        />

        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-alert-decagram</v-icon>影響、營運衝擊
        </h3>
        <VersionDiff
            :before="before.affectTxt"
            :after="after.affectTxt"
        />

        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-arrow-expand</v-icon>衍生事故
        </h3>
        <VersionDiff
            :before="before.accidentsTxt"
            :after="after.accidentsTxt"
        />

        <!-- 控制措施 -->
        <v-col cols="12" class="mt-12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-check-circle</v-icon>控制措施<br>
                (變更前)
            </h3>
            <v-card flat>
                <v-data-table
                    :headers="headers"
                    :items="before.controls"
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
                            :download="item.file.name"
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

        <v-col cols="12" class="mt-8">
            <h3 class="mb-1">(變更後)</h3>
            <v-card flat>
                <v-data-table
                    :headers="headers"
                    :items="after.controls"
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
                            :download="item.file.name"
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

        <!-- 本案上傳之證據 -->
        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-check-circle</v-icon>本案上傳之證據<br>
            (變更前)
        </h3>
        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC"
            v-for="list in before.uploads"
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
                        :download="file.name"
                    >
                        {{ file.name }}
                    </v-chip>
                </v-col>
            </v-row>
        </v-col>

        
        <h3 class="mb-1 mt-8">(變更後)</h3>
        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC"
            v-for="list in after.uploads"
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
                        :download="file.name"
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
            >退回</v-btn>

            <v-btn dark  class="ma-2" color="success"
                @click="save"
            >同意更新</v-btn>
        </v-col>
    </v-row>

    <!-- 退回 dialog -->
    <v-dialog v-model="dialog" max-width="600px">
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

    <!-- 證據 dialog -->
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
                        :download="item.name"
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
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import VersionDiff from '@/components/smis/VersionDiff.vue'

export default {
    data: () => ({
        routeId: '',
        before: {  // 變更前
            depart: '',// 權責部門
            mode: '',  // 營運模式
            wbs: '',  // 關聯子系統
            serious: '',  // 風險嚴重性
            frequency: '',  // 風險頻率
            level: '',  // 風險等級
            desc: '',  // 危害說明
            reason: '',  // 危害直接成因
            indirectReason: '',  // 可能的危害間接原因
            note: '',  // 備註
            controls: [],  // 控制措施
            affectTxt: '',  // 影響、營運衝擊字串
            accidentsTxt: '',  // 衍生事故字串
            uploads: [],  // 上傳之證據
        },
        after: {  // 變更後
            depart: '',
            mode: '',
            wbs: '',
            serious: '',
            frequency: '',
            level: '',
            desc: '',
            reason: '',
            indirectReason: '',
            note: '',
            controls: [],
            affectTxt: '',
            accidentsTxt: '',
            uploads: [],
        },
        headers: [  // 表格欄位
            { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '措施簡述', value: 'subject', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '措施說明', value: 'desc', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '管控單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '規章', value: 'file', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '證據', value: 'evidences', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '備註', value: 'note', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
        dialog: false,  // 退回dialog是否顯示
        isLoading: false,  // 是否讀取中
        backReason: '',  // 退回原因
        evidences: [],  // 控制措施證據
        dialogShow: false,  // 控制措施證據dialog是否顯示
    }),
    components: { VersionDiff },
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
                let obj1 = {
                    desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',  // 危害說明
                    reason: '直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字',  // 危害直接成因
                    indirectReason: '間接原因文字間接原因文字間接原因文字間接原因文字間接原因文字間接原因文字間接原因文字間接原因文字間接原因文字',  // 可能的危害間接原因
                    note: '',  // 備註
                    depart: '鐵路服務科',// 權責部門
                    mode: '正常',  // 營運模式
                    wbs: 'APC2',  // 關聯子系統
                    serious: '稍微 (S4)',  // 風險嚴重性
                    frequency: '很少 (P4)',  // 風險頻率
                    level: '可接受，持續控管 (R4)',  // 風險等級
                    affectTraveler: true,  // 影響旅客
                    affectStaff: true,  // 影響員工
                    affectPublic: false,  // 影響大眾
                    trainLate: false,  // 列車誤點
                    stopOperation: false,  // 中斷營運
                    accidents: ['側線火災事故', '設備損壞事故'],  // 衍生事故
                    controls: [  // 控制措施
                        {
                            id: 123,
                            subject: '火災處理要點',
                            desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',
                            depart: '綜合企劃科',
                            file: { name: '123.pdf', link: '/demofile/123.pdf' },
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
                            file: { name: '123.docx', link: '/demofile/123.docx' },
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
                    ]
                }

                let obj2 = {
                    desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',  // 危害說明
                    reason: '直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字',  // 危害直接成因
                    indirectReason: '間接原因文字間接原因文字間接原因文字間接原因文字間接原因文字間接原因文字間接原因文字間接原因文字間接原因文字',  // 可能的危害間接原因
                    note: '',  // 備註
                    depart: '鐵路服務科',// 權責部門
                    mode: '正常',  // 營運模式
                    wbs: 'APC2',  // 關聯子系統
                    serious: '稍微 (S4)',  // 風險嚴重性
                    frequency: '幾乎不 (P5)',  // 風險頻率
                    level: '可接受，持續控管 (R4)',  // 風險等級
                    affectTraveler: true,  // 影響旅客
                    affectStaff: true,  // 影響員工
                    affectPublic: false,  // 影響大眾
                    trainLate: false,  // 列車誤點
                    stopOperation: false,  // 中斷營運
                    accidents: ['側線火災事故'],  // 衍生事故
                    controls: [  // 控制措施
                        {
                            id: 123,
                            subject: '火災處理要點',
                            desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',
                            depart: '綜合企劃科',
                            file: { name: '123.pdf', link: '/demofile/123.pdf' },
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

                this.setShowData(obj1, obj2)
                this.chLoadingShow()
            }, 1000)
        },
        // 初始化資料
        setShowData(before, after) {
            // 權責部門
            this.before.depart = before.depart.replace(/\n/g, '<br>')
            this.after.depart = after.depart.replace(/\n/g, '<br>')

            // 營運模式
            this.before.mode = before.mode.replace(/\n/g, '<br>')
            this.after.mode = after.mode.replace(/\n/g, '<br>')

            // 關聯子系統
            this.before.wbs = before.wbs.replace(/\n/g, '<br>')
            this.after.wbs = after.wbs.replace(/\n/g, '<br>')

            // 風險嚴重性
            this.before.serious = before.serious.replace(/\n/g, '<br>')
            this.after.serious = after.serious.replace(/\n/g, '<br>')

            // 風險頻率
            this.before.frequency = before.frequency.replace(/\n/g, '<br>')
            this.after.frequency = after.frequency.replace(/\n/g, '<br>')

            // 風險等級
            this.before.level = before.level.replace(/\n/g, '<br>')
            this.after.level = after.level.replace(/\n/g, '<br>')

            // 危害說明
            this.before.desc = before.desc.replace(/\n/g, '<br>')
            this.after.desc = after.desc.replace(/\n/g, '<br>')

            // 危害直接成因
            this.before.reason = before.reason.replace(/\n/g, '<br>')
            this.after.reason = after.reason.replace(/\n/g, '<br>')

            // 可能的危害間接原因
            this.before.indirectReason = before.indirectReason.replace(/\n/g, '<br>')
            this.after.indirectReason = after.indirectReason.replace(/\n/g, '<br>')

            // 備註
            this.before.note = before.note.replace(/\n/g, '<br>')
            this.after.note = after.note.replace(/\n/g, '<br>')
            
            // 影響、營運衝擊字串
            let arr_before = []
            if (before.affectTraveler) arr_before.push('影響旅客')
            if (before.affectStaff) arr_before.push('影響員工')
            if (before.affectPublic) arr_before.push('影響大眾')
            if (before.trainLate) arr_before.push('列車誤點')
            if (before.stopOperation) arr_before.push('中斷營運')
            this.before.affectTxt = arr_before.join('、')

            let arr_after = []
            if (after.affectTraveler) arr_after.push('影響旅客')
            if (after.affectStaff) arr_after.push('影響員工')
            if (after.affectPublic) arr_after.push('影響大眾')
            if (after.trainLate) arr_after.push('列車誤點')
            if (after.stopOperation) arr_after.push('中斷營運')
            this.after.affectTxt = arr_after.join('、') 

            // 衍生事故字串
            this.before.accidentsTxt = before.accidents.join('、')
            this.after.accidentsTxt = after.accidents.join('、')

            // 控制措施
            this.before.controls = [ ...before.controls ]
            this.after.controls = [ ...after.controls ]

            // 上傳之證據
            this.before.uploads = [ ...before.uploads ]
            this.after.uploads = [ ...after.uploads ]
        },
        // 同意更新
        save() {
            if (confirm('你確定要更新嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '更新成功'})
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
        // 退回
        withdraw() {
            this.isLoading = true

            setTimeout(() => {
                this.chMsgbar({ success: true, msg: '退回成功'})
                this.$router.push({ path: '/smis/car-harmdb/harms' })
                this.isLoading = false
            }, 1000)
        },
    },
    created() {
        this.fetchData()
    }
}
</script>