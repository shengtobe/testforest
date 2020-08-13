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
        <v-col cols="12" class="mt-8">
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
                </v-data-table>
            </v-card>
        </v-col>

        <v-col cols="12" class="text-center mt-12 mb-8">
            <v-btn dark class="ma-2"
                to="/smis/car-harmdb/harms"
            >回搜尋頁</v-btn>

            <v-btn dark class="ma-2"
                color="indigo"
                :to="`/smis/car-harmdb/harms/${routeId}/edit`"
            >編輯</v-btn>

            <v-btn dark  class="ma-2" color="error"
                @click="del"
            >刪除</v-btn>

            <v-btn dark  class="ma-2" color="success"
                @click="save"
            >申請審核</v-btn>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import TopBasicTable from '@/components/TopBasicTable.vue'

export default {
    data: () => ({
        routeId: '',
        topItems: {  // 上面的欄位
            depart: { icon: 'mdi-bank', title: '權責單位', text: '' },
            mode: { icon: 'mdi-snowflake', title: '營運模式', text: '' },
            wbs: { icon: 'mdi-source-branch', title: '關聯子系統', text: '' },
            serious: { icon: 'mdi-format-line-spacing', title: '風險嚴重性', text: '' },
            frequency: { icon: 'mdi-signal-variant', title: '風險頻率', text: '' },
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
            { text: '文件', value: 'file', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '備註', value: 'note', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
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
                    reason: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',  // 危害直接成因
                    indirectReason: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',  // 可能的危害間接原因
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
                    controls: [  // 控制措施
                        {
                            id: 123,
                            subject: '火災處理要點',
                            desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',
                            depart: '綜合企劃科',
                            file: { link: '/demofile/123.pdf' },
                            note: ''
                        },
                        {
                            id: 456,
                            subject: '中暑急救要點',
                            desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',
                            depart: '綜合企劃科',
                            file: { link: '/demofile/123.docx' },
                            note: ''
                        },
                    ],
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
        },
        // 刪除
        del() {
            if (confirm('你確定要刪除嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.$router.push({ path: '/smis/car-harmdb/harms' })
                    this.chMsgbar({ success: true, msg: '刪除成功'})
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 申請審核
        save() {
            this.chLoadingShow()

            setTimeout(() => {
                this.$router.push({ path: '/smis/car-harmdb/harms' })
                this.chMsgbar({ success: true, msg: '申請審核成功'})
                this.chLoadingShow()
            }, 1000)
        },
        // 顯示檢視內容
        showContent(txt) {
            this.chViewDialog({ show: true, content: txt.replace(/\n/g, '<br>') })
        },
    },
    created() {
        this.fetchData()
    }
}
</script>