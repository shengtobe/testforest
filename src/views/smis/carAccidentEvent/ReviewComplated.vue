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

        <!-- 死傷人數 -->
        <v-col cols="12" class="mt-10">
            <h3>
                <v-icon class="mr-1 mb-2">mdi-hospital-building</v-icon>
                <span class="mr-2">死傷人數：</span>{{ deathCount }}
            </h3>
        </v-col>
        
        <v-col cols="12" v-if="deathCount > 0">
            <v-card flat>
                <v-data-table
                    :headers="headers"
                    :items="deathData"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                >
                </v-data-table>
            </v-card>
        </v-col>

        <!-- 改善措施 -->
        <v-col cols="12" class="mt-8 mb-12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-2">mdi-book-open-page-variant</v-icon>控制措施
            </h3>

            <v-card flat>
                <v-data-table
                    :headers="controlHeaders"
                    :items="controlItems"
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
                        <v-btn small dark fab color="indigo"
                            :href="item.file.link"
                            :download="item.file.name"
                        >
                            <v-icon dark>mdi-file-document</v-icon>
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

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC" class="mb-4">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>改善措施摘要
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="summary"
                ></v-col>
            </v-row>
        </v-col>

        <!-- 檢討摘要、證據上傳 -->
        <template v-if="status == 3">
            <v-col cols="12" class="mt-12 mb-8">
                <v-divider></v-divider>
            </v-col>

            <v-col cols="12" class="mb-8">
                <h3 class="mb-2">
                    <v-icon class="mr-1 mb-1">mdi-pen</v-icon>措施檢討摘要
                </h3>
                <v-textarea
                    auto-grow
                    solo
                    rows="6"
                    placeholder="請輸入措施檢討摘要"
                    v-model.trim="controlReview"
                ></v-textarea>
            </v-col>

            <UploadFileAdd
                title="證據上傳"
                :uploadDisnable="false"
                :fileList="evidences"
                @joinFile="joinFile"
                @rmFile="rmFile"
            />
        </template>

        <v-col cols="12" class="text-center mt-12 mb-8">
            <v-btn dark class="ma-2"
                to="/smis/car-accident-event"
            >回搜尋頁</v-btn>

            <v-btn dark  class="ma-2" color="error"
                @click="dialog = true"
                v-if="status == 2"
            >退回</v-btn>

            <v-btn dark  class="ma-2" color="success"
                @click="save"
                v-if="status == 2"
            >同意措施執行</v-btn>

            <v-btn dark  class="ma-2" color="primary"
                @click="rerun"
                v-if="status == 3"
            >重提事故事件</v-btn>

            <v-btn dark  class="ma-2" color="error"
                @click="del"
                v-if="status == 3"
            >作廢</v-btn>

            <v-btn dark  class="ma-2" color="success"
                @click="closeCase"
                v-if="status == 3"
            >申請結案</v-btn>
        </v-col>
    </v-row>

    <!-- 退回 dialog -->
    <v-dialog v-model="dialog" max-width="600px"
        v-if="status == 2"
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
import TopBasicTable from '@/components/TopBasicTable.vue'
import UploadFileAdd from '@/components/UploadFileAdd.vue'
import { locationOpts, evtTypes } from '@/assets/js/smisData'

export default {
    props: ['closeStatus'],  // 測試用屬性
    data: () => ({
        routeId: '',
        status: '',  // 處理狀態
        eqLoss: '',// 設備損失
        serviceShock: '', // 營運衝擊
        handle: '', // 處置過程
        review: '', // 檢討過程
        reason: '', // 原因分析
        note: '', // 備註說明
        files: [],  // 危害檔案
        evidences: [],  // 改善措施檢討證據
        controlReview: '',  // 措施檢討摘要
        topItems: {  // 上面的欄位
            findDate: { icon: 'mdi-calendar-text', title: '發現日期', text: '' },
            findLocation: { icon: 'mdi-map-marker', title: '發現地點', text: '' },
            accidentType: { icon: 'mdi-snowflake', title: '事故類型', text: '' },
            status: { icon: 'mdi-ray-vertex', title: '事故事件狀態', text: '' },
        },
        deathCount: '',  // 死傷人數
        deathData: [],  // 死傷資料
        headers: [  // 死傷表格顯示的欄位
            { text: '姓名', value: 'name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '75px' },
            { text: '性別', value: 'sex', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '75px' },
            { text: '生日', value: 'birthday', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110px' },
            { text: '住址', value: 'addr', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '150px' },
            { text: '電話', value: 'phone', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110px' },
            { text: '傷亡種類', value: 'type', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70px' },
            { text: '收治醫院', value: 'hospital', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '68px' },
            { text: '賠償金額', value: 'money', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70px' },
            { text: '保險註記', value: 'insurance', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110px' },
            { text: '備註', value: 'note', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70px' },
        ],
        controlHeaders: [  // 控制措施的欄位
            { text: '措施編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '120' },
            { text: '措施簡述', value: 'subject', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '措施說明', value: 'desc', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '150' },
            { text: '管控單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '150' },
            { text: '規章', value: 'file', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '120'},
            { text: '證據', value: 'evidences', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '備註', value: 'note', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
        controlItems: [],  // 控制措施表格資料
        dialogShow: false,  // 控制措施證據dialog是否顯示
        summary: '',  // 改善措施摘要
        isLoading: false,  // 是否讀取中
        dialog: false,  // 退回 dialog 是否顯示
        backReason: '',  // 退回原因
    }),
    components: {
        TopBasicTable,
        UploadFileAdd,
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
            'chViewDialog',  // 檢視內容 dialog
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
                    deathCount: 1,  // 死傷人數
                    deathData: [  // 死傷資料
                        {
                            id: 1,
                            name: '王小明',
                            sex: '男',
                            birthday: '1962-03-11',
                            addr: '高雄市三民區中正路180巷9號3樓-3',
                            phone: '0987654321',
                            type: '輕傷',
                            hospital: '高雄長庚醫院',
                            money: 50000,
                            insurance: '由勞工保險理賠',
                            note: '住院3天',
                        },
                    ],
                    summary: '摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字',  // 改善措施摘要
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
            this.topItems.status.text = (this.closeStatus == 3)? '已完備資料' : '審核中'  // 事故事件狀態

            this.eqLoss = obj.eqLoss  // 設備損失
            this.serviceShock = obj.serviceShock  // 營運衝擊
            this.handle = obj.handle.replace(/\n/g, '<br>')  // 處置過程
            this.review = obj.review.replace(/\n/g, '<br>')  // 檢討過程
            this.reason = obj.reason.replace(/\n/g, '<br>')  // 原因分析
            this.note = obj.note.replace(/\n/g, '<br>') // 備註說明
            this.files = [ ...obj.files ]  // 檔案附件
            this.deathCount = obj.deathCount  // 死傷人數
            this.deathData = [ ...obj.deathData ]  // 死傷資料
            this.controlItems = [  // 控制措施
                {
                    id: 36,
                    subject: '大型樹木移除注意事項',
                    desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',
                    depart: '服務科',
                    file: { name: '123.docx', link: '/demofile/123.docx' },
                    note: '',
                    evidences: [
                        {
                            name: '123.pdf',
                            link: '/demofile/123.pdf'
                        },
                    ],
                },
            ]
            this.summary = obj.summary.replace(/\n/g, '<br>')  // 改善措施摘要

            // 設定狀態(測試資料)
            this.status = this.closeStatus
        },
        // 退回
        withdraw() {
            this.isLoading = true

            setTimeout(() => {
                this.chMsgbar({ success: true, msg: '退回成功'})
                this.$router.push({ path: '/smis/car-accident-event' })
                this.isLoading = false
            }, 1000)
        },
        // 同意措施執行
        save() {
            if (confirm('你確定要同意措施執行嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '同意措施執行成功'})
                    this.$router.push({ path: '/smis/car-accident-event' })
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 加入要上傳的檔案
        joinFile(file) {
            this.evidences.push(file)
        },
        // 移除要上傳的檔案
        rmFile(idx) {
            this.evidences.splice(idx, 1)
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
        // 申請結案
        closeCase() {
            if (confirm('你確定要申請結案嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '申請結案成功'})
                    this.$router.push({ path: '/smis/car-accident-event' })
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 顯示控制措施說明
        showContent(txt) {
            this.chViewDialog({ show: true, content: txt.replace(/\n/g, '<br>') })
        },
        // 顯示控制措施證據
        showEvidences(arr) {
            this.evidences = [ ...arr ]
            this.dialogShow = true
        },
        // 重提事故事件
        rerun() {
            if (confirm('重提後，資料會要重新跑流程，你確定嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.$router.push({ path: `/smis/car-accident-event/${this.routeId}/show` })
                    this.chLoadingShow()
                }, 1000)
            }
        },
    },
    created() {
        this.fetchData()
    }
}
</script>