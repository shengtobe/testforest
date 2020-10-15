<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">職災事故事件編號：{{ routeId }}</h2>

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
                        本項工作經驗年數
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ workYear }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        本項工作訓練日期
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ trainingDate }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>罹災者住址
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ address }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-bank</v-icon>發生單位
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ depart }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>發生日期
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ date }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>發生地點
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ location }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-cloud</v-icon>氣候
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ weather }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>事故類別
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ accidentType }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-google-assistant</v-icon>事故結果
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ accidentResult }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-google-assistant</v-icon>傷害部位
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ injurySite }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>災害類型
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ disasterType }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-google-assistant</v-icon>致傷媒介物
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ vehicle }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>直接原因
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="directReason"
                ></v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>間接原因
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
                        <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>基本原因
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="basicReason"
                ></v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>傷者當時工作
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="workItem"
                ></v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>事故概況
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="overview"
                ></v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>緊急處理情形
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="emergentWork"
                ></v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>事故單位防範及改善對策
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="improveStrategy"
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
    </v-row>

    <v-row class="mt-8">
        <!-- 鎖定後要填寫的部份 -->
        <template v-if="isLocked">
            <v-col cols="12" sm="4" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>公傷假(起)
                </h3>
                <v-menu
                    v-model="dateMemuShow.start"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model.trim="ipt.dateStart"
                            solo
                            v-on="on"
                            readonly
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        color="purple"
                        v-model="ipt.dateStart"
                        @input="dateMemuShow.start = false"
                        locale="zh-tw"
                    ></v-date-picker>
                </v-menu>
            </v-col>

            <v-col cols="12" sm="4" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>公傷假(迄)
                </h3>
                <v-menu
                    v-model="dateMemuShow.end"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model.trim="ipt.dateEnd"
                            solo
                            v-on="on"
                            readonly
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        color="purple"
                        v-model="ipt.dateEnd"
                        @input="dateMemuShow.end = false"
                        locale="zh-tw"
                    ></v-date-picker>
                </v-menu>
            </v-col>

            <v-col cols="12" sm="4" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-phone-forward</v-icon>通報勞檢
                </h3>
                <v-select
                    v-model="ipt.laborInspection"
                    :items="laborOpts"
                    solo
                ></v-select>
            </v-col>

            <v-col cols="12" sm="6">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>發生原因
                </h3>
                <v-textarea
                    auto-grow
                    solo
                    rows="6"
                    placeholder="請輸入發生原因"
                    v-model.trim="ipt.cause"
                ></v-textarea>
            </v-col>

            <v-col cols="12" sm="6">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>備註
                </h3>
                <v-textarea
                    auto-grow
                    solo
                    rows="6"
                    placeholder="請輸入備註"
                    v-model.trim="ipt.note"
                ></v-textarea>
            </v-col>

            <v-col cols="12">
                <v-card tile>
                    <v-toolbar flat dense dark color="brown">
                        <v-toolbar-title>
                            <v-icon class="mb-1 mr-2">mdi-pen</v-icon>相關表單填寫
                        </v-toolbar-title>
                    </v-toolbar>

                    <v-list-item-group>
                            <v-list-item
                                :to="`/smis/jobsafety/disaster-survey/${routeId}/improve`"
                            >
                                <v-list-item-content>
                                    <v-list-item-title class="d-flex align-center">
                                        <v-btn x-small depressed rounded
                                            :color="(finishImprove)? 'success' : 'error'"
                                            class="mr-3"
                                        >
                                            {{ (finishImprove)? '已填寫' : '未填寫' }}
                                        </v-btn>
                                        改善措施檢討
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                    </v-list-item-group>
                </v-card>
            </v-col>
        </template>

        <v-col cols="12" class="text-center mb-8">
            <v-btn dark class="ma-2"
                to="/smis/jobsafety/disaster-survey"
            >回搜尋頁</v-btn>

            <v-btn dark class="ma-2"
                color="indigo"
                :to="`/smis/jobsafety/disaster-survey/${routeId}/edit`"
                v-if="!isLocked"
            >編輯</v-btn>

            <v-btn dark  class="ma-2" color="error"
                @click="del"
            >作廢</v-btn>

            <v-btn dark  class="ma-2" color="success"
                @click="save"
            >{{ (isLocked)? '申請審核資料' : '鎖定' }}</v-btn>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import TopBasicTable from '@/components/TopBasicTable.vue'
import { injurySiteOpts, disasterTypeOpts, vehicleOpts } from '@/assets/js/smisData'

export default {
    data: () => ({
        routeId: '',
        topItems: {  // 上面的欄位
            name: { icon: 'mdi-account', title: '罹災者姓名', text: '' },
            workDepart: { icon: 'mdi-calendar-text', title: '工作部門', text: '' },
            type: { icon: 'mdi-snowflake', title: '勞工類型', text: '' },
            sex: { icon: 'mdi-human-male-female', title: '性別', text: '' },
            old: { icon: 'mdi-sort-variant', title: '年齡', text: '' },
            startWorkDate: { icon: 'mdi-calendar-text', title: '到職日期', text: '' },
            jobTitle: { icon: 'mdi-format-title', title: '職稱', text: '' },
            education: { icon: 'mdi-school', title: '教育程度', text: '' },
            isReview: { icon: 'mdi-ray-vertex', title: '是否複核', text: '' },
            status: { icon: 'mdi-ray-vertex', title: '事故狀態', text: '' },
        },
        workYear: '',  // 本項工作經驗年數
        trainingDate: '',  // 本項工作訓練日期
        address: '',  // 住址
        depart: '',  // 發生單位
        date: '',  // 發生日期
        location: '',  // 發生地點
        weather: '',  // 氣候
        accidentType: '',  // 事故類別
        accidentResult: '',  // 事故結果
        injurySite: '',  // 傷害部位
        disasterType: '',  // 災害類型
        vehicle: '',  // 致傷媒介物
        directReason: '',  // 直接原因
        indirectReason: '',  // 間接原因
        basicReason: '',  // 基本原因
        workItem: '',  // 傷者當時工作
        overview: '',  // 事故概況
        emergentWork: '',  // 緊急處理情形
        improveStrategy: '',  // 事故單位防範及改善對策
        files: [],  // 上傳的檔案
        isLocked: false,  // 是否已鎖定
        finishImprove: false,  // 是否完成改善措施
        notifyLinks: [],  // 連結的通報
        ipt: {  // 鎖定後要填寫的資料
            dateStart: new Date().toISOString().substr(0, 10),  // 公傷假(起)
            dateEnd: new Date().toISOString().substr(0, 10),  // 公傷假(迄)
            laborInspection: 'y',  // 通報勞檢
            cause: '',  // 發生原因
            note: '',  // 備註
        },
        dateMemuShow: {  // 日曆是否顯示
            start: false,
            end: false,
        },
        laborOpts: [
            { text: '有', value: 'y' },
            { text: '無', value: 'n' },
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
        ]),
        // 向後端取得資料
        fetchData() {
            this.chLoadingShow()
            this.routeId = this.$route.params.id

            // 新增測試用資料
            setTimeout(() => {
                let obj = {
                    workDepart: '阿里山車站',  // 工作部門
                    name: '王小明',  // 罹災者姓名
                    type: 1,  // 勞工類型
                    sex: '男',  // 性別
                    old: 34,  // 年齡
                    startWorkDate: '2003-01-02',  // 到職日期
                    jobTitle: '維修員',  // 職稱
                    education: '大學',  // 教育程度
                    address: '嘉義市東區中山路199號',  // 住址
                    workYear: 6,  // 本項工作經驗年數
                    trainingDate: '2003-01-10 ~ 2003-06-15',  // 本項工作訓練日期
                    depart: '阿里山車站',  // 發生單位
                    findDate: '2020-08-23',  // 發生日期
                    findHour: '09',  // 發生日期(時)
                    findMin: '45',  // 發生日期(分)
                    location: '工具間',  // 發生地點
                    weather: '晴',  // 氣候
                    accidentType: '工作傷害事故',  // 事故類別
                    accidentResult: '輕傷',  // 事故結果
                    injurySite: 9,  // 傷害部位
                    disasterType: 8,  // 災害類型
                    vehicleLv1: '動力機械',  // 致傷媒介物-第一層
                    vehicle: 154,  // 致傷媒介物-第二層
                    directReason: '直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字',  // 直接原因
                    indirectReason: '間接原因文字間接原因文字間接原因文字',  // 間接原因
                    basicReason: '基本原因文字基本原因文字基本原因文字基本原因文字基本原因文字基本原因文字基本原因文字',  // 基本原因
                    workItem: '傷者當時工作文字傷者當時工作文字傷者當時工作文字傷者當時工作文字傷者當時工作文字傷者當時工作文字傷者當時工作文字',  // 傷者當時工作
                    overview: '事故概況文字事故概況文字事故概況文字事故概況文字事故概況文字事故概況文字事故概況文字事故概況文字',  // 事故概況
                    emergentWork: '緊急處理情形文字緊急處理情形文字緊急處理情形文字緊急處理情形文字',  // 緊急處理情形
                    improveStrategy: '事故單位防範及改善對策文字事故單位防範及改善對策文字事故單位防範及改善對策文字事故單位防範及改善對策文字事故單位防範及改善對策文字事故單位防範及改善對策文字',  // 事故單位防範及改善對策
                    files: [
                        { fileName: 'ASRC200701.jpg', link: '/demofile/demo.jpg' },
                        { fileName: 'ASRC200702.jpg', link: '/demofile/demo2.jpg' },
                        { fileName: '123.pdf', link: '/demofile/123.pdf' },
                        { fileName: '123.docx', link: '/demofile/123.docx' },
                        { fileName: '456.xlsx', link: '/demofile/456.xlsx' },
                    ],
                    finishImprove: false,  // 是否完成改善措施
                    notifyLinks: [  // 連結的通報
                        {
                            id: 'SH458987',
                            status: '審核中',
                        },
                        {
                            id: 'SH378011',
                            status: '已結案',
                        },
                    ],
                    isReview: false,  // 是否覆核
                    isLocked: false,  // 是否鎖定
                }

                this.setShowData(obj)
                this.chLoadingShow()
            }, 1000)
        },
        // 初始化資料
        setShowData(obj) {
            this.topItems.workDepart.text = obj.workDepart  // 工作部門
            this.topItems.name.text = obj.name  // 罹災者姓名
            this.topItems.type.text = (obj.type == 1)? '本處員工' : '承攬商勞工'  // 勞工類型
            this.topItems.sex.text = obj.sex  // 性別
            this.topItems.old.text = obj.old  // 年齡
            this.topItems.startWorkDate.text = obj.startWorkDate  // 到職日期
            this.topItems.jobTitle.text = obj.jobTitle  // 職稱
            this.topItems.education.text = obj.education  // 教育程度
            this.topItems.isReview.text = (obj.isReview)? '已複核' : '未核定',  // 是否覆核
            this.topItems.status.text = '已立案'  // 事故事件狀態

            this.address = obj.address  // 住址
            this.workYear = obj.workYear  // 本項工作經驗年數
            this.trainingDate = obj.trainingDate  // 本項工作訓練日期
            this.depart = obj.depart  // 發生單位
            this.date = `${obj.findDate} ${obj.findHour}:${obj.findMin}:00`  // 發生日期
            this.location = obj.location  // 發生地點
            this.weather = obj.weather  // 氣候
            this.accidentType = obj.accidentType  // 事故類別
            this.accidentResult = obj.accidentResult  // 事故結果
            this.injurySite = injurySiteOpts.find(item => item.value == obj.injurySite).text  // 傷害部位
            this.disasterType = disasterTypeOpts.find(item => item.value == obj.disasterType).text  // 災害類型
            this.vehicle = vehicleOpts[obj.vehicleLv1].find(item => item.value == obj.vehicle).text,  // 致傷媒介物
            this.directReason = obj.directReason  // 直接原因
            this.indirectReason = obj.indirectReason  // 間接原因
            this.basicReason = obj.basicReason  // 基本原因
            this.workItem = obj.workItem  // 傷者當時工作
            this.overview = obj.overview  // 事故概況
            this.emergentWork = obj.emergentWork  // 緊急處理情形
            this.improveStrategy = obj.improveStrategy  // 事故單位防範及改善對策
            this.files = [ ...obj.files ]  // 檔案附件
            this.isLocked = obj.isLocked  // 是否已鎖定

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
                    this.$router.push({ path: '/smis/jobsafety/disaster-survey' })
                    this.chMsgbar({ success: true, msg: '作廢成功'})
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 鎖定
        save() {
            if (this.isLocked) {
                // -------------- 已鎖定 -------------- 
                let errArr = []
                if (!this.finishImprove) errArr.push('改善措施')

                if (this.finishDeath && this.finishImprove) {  // 都有填寫
                    if (confirm('你確定要申請審核嗎?')) {
                        this.chLoadingShow()

                        setTimeout(() => {
                            this.$router.push({ path: '/smis/jobsafety/disaster-survey' })
                            this.chMsgbar({ success: true, msg: '申請審核成功'})
                            this.chLoadingShow()
                        }, 1000)
                    }
                } else {
                    let errLog = '你還未填寫「'+ errArr.join('、') + '」'
                    alert(errLog)
                }
            } else {
                // -------------- 未鎖定 -------------- 
                if (confirm('你確定要鎖定嗎?')) {
                    this.chLoadingShow()

                    // 向後端更新鎖定、覆核的欄位
                    setTimeout(() => {
                        this.topItems.isReview.text = '已複核'
                        this.isLocked = true
                        this.chLoadingShow()
                    }, 1000)
                }
            }
            
        },
    },
    created() {
        this.fetchData()
    }
}
</script>