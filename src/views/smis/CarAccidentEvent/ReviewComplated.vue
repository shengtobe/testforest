<template>
<v-container>
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
                        target="_blank"
                        rel="noopener norefferrer"
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
        <v-col cols="12" class="mt-8">
            <h3>
                <v-icon class="mr-1 mb-2">mdi-book-open-page-variant</v-icon>改善措施
            </h3>
        </v-col>
        
        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="light-blue darken-1 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black white--text">
                        <v-icon class="mr-1 mb-1" dark>mdi-pen</v-icon>措施摘要
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="summary"
                ></v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="light-blue darken-1 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black white--text">
                        <v-icon class="mr-1 mb-1" dark>mdi-paperclip</v-icon>措施附件
                    </span>
                </v-col>

                <v-col class="white pa-3">
                    <v-chip small label color="primary" class="mr-2 mb-2 mb-sm-0"
                        :href="improveFile.link"
                        target="_blank"
                        rel="noopener norefferrer"
                    >
                        {{ improveFile.fileName }}
                    </v-chip>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12" class="text-center mt-12 mb-8">
            <v-btn dark class="ma-2"
                to="/smis/car-accident-event"
            >回搜尋頁</v-btn>

            <v-btn dark  class="ma-2" color="error"
                @click="dialog = true"
                v-if="closeStatus == '申請結案中'"
            >退回</v-btn>

            <v-btn dark  class="ma-2" color="success"
                @click="save"
                v-if="closeStatus == '申請結案中'"
            >同意結案</v-btn>
        </v-col>
    </v-row>

    <!-- 退回 dialog -->
    <v-dialog v-model="dialog" max-width="600px"
        v-if="closeStatus == '申請結案中'"
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
import { locationOpts, evtTypes } from '@/assets/js/smisData'

export default {
    props: ['closeStatus'],
    data: () => ({
        routeId: '',
        eqLoss: '',// 設備損失
        serviceShock: '', // 營運衝擊
        handle: '', // 處置過程
        review: '', // 檢討過程
        reason: '', // 原因分析
        note: '', // 備註說明
        files: [],  // 上傳的檔案
        topItems: {  // 上面的欄位
            findDate: { icon: 'mdi-calendar-text', title: '發現日期', text: '' },
            findLocation: { icon: 'mdi-map-marker', title: '發現地點', text: '' },
            accidentType: { icon: 'mdi-snowflake', title: '事故類型', text: '' },
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
        summary: '',  // 檢討摘要
        improveFile: {},  // 改善措施文件
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
                    summary: '摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字',  // 檢討摘要
                    improveFile: {  // 改善措施文件
                        fileName: '123.pdf',
                        link: '/demofile/123.pdf'
                    }
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

            this.eqLoss = obj.eqLoss  // 設備損失
            this.serviceShock = obj.serviceShock  // 營運衝擊
            this.handle = obj.handle.replace(/\n/g, '<br>')  // 處置過程
            this.review = obj.review.replace(/\n/g, '<br>')  // 檢討過程
            this.reason = obj.reason.replace(/\n/g, '<br>')  // 原因分析
            this.note = obj.note.replace(/\n/g, '<br>') // 備註說明
            this.files = [ ...obj.files ]  // 檔案附件
            this.deathCount = obj.deathCount  // 死傷人數
            this.deathData = [ ...obj.deathData ]  // 死傷資料
            this.summary = obj.summary.replace(/\n/g, '<br>')  // 檢討摘要
            this.improveFile = { ...obj.improveFile }  // 改善措施文件
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
        // 結案
        save() {
            if (confirm('結案後無法再退回並修改內容，你確定要結案嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '結案成功'})
                    this.$router.push({ path: '/smis/car-accident-event' })
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