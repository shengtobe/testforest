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

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>公傷假
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ injuryLeaveStart }} ~ {{ injuryLeaveEnd }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-phone-forward</v-icon>通報勞檢
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ (laborInspection == 'y')? '有' : '無' }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>發生原因
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="cause"
                ></v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>備註
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
                        <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>改善措施
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="improve"
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
                to="/smis/jobsafety/disaster-survey"
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
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import TopBasicTable from '@/components/TopBasicTable.vue'
import UploadFileAdd from '@/components/UploadFileAdd.vue'
import { injurySiteOpts, disasterTypeOpts, vehicleOpts } from '@/assets/js/smisData'

export default {
    props: ['closeStatus'],  // 測試用屬性
    data: () => ({
        routeId: '',
        status: '',  // 處理狀態
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
        notifyLinks: [],  // 連結的通報
        injuryLeaveStart: '',  // 公傷假(起)
        injuryLeaveEnd: '',  // 公傷假(迄)
        laborInspection: 'n',  // 通報勞檢
        cause: '',  // 發生原因
        note: '',  // 備註
        improve: '',  // 改善措施
        controlReview: '',  // 措施檢討摘要
        evidences: [],  // 改善措施證據
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
                    indirectReason: '不安全行為',  // 間接原因
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
                    isReview: true,  // 是否覆核
                    injuryLeaveStart: '2020-08-24',  // 公傷假(起)
                    injuryLeaveEnd: '2020-08-30',  // 公傷假(迄)
                    laborInspection: 'n',  // 通報勞檢
                    cause: '發生原因文字發生原因文字發生原因文字發生原因文字發生原因文字發生原因文字發生原因文字發生原因文字發生原因文字',  // 發生原因
                    note: '備註文字備註文字備註文字備註文字備註文字備註文字備註文字備註文字備註文字',  // 備註
                    improve: '改善措施文字改善措施文字改善措施文字改善措施文字改善措施文字改善措施文字改善措施文字改善措施文字改善措施文字',  // 改善措施
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
            this.topItems.status.text = (this.closeStatus == 5)? '已完備資料' : '審核中'  // 事故事件狀態

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
            this.directReason = obj.directReason.replace(/\n/g, '<br>')  // 直接原因
            this.indirectReason = obj.indirectReason.replace(/\n/g, '<br>')  // 間接原因
            this.basicReason = obj.basicReason.replace(/\n/g, '<br>')  // 基本原因
            this.workItem = obj.workItem.replace(/\n/g, '<br>')  // 傷者當時工作
            this.overview = obj.overview.replace(/\n/g, '<br>')  // 事故概況
            this.emergentWork = obj.emergentWork.replace(/\n/g, '<br>')  // 緊急處理情形
            this.improveStrategy = obj.improveStrategy.replace(/\n/g, '<br>')  // 事故單位防範及改善對策
            this.files = [ ...obj.files ]  // 檔案附件
            this.injuryLeaveStart = obj.injuryLeaveStart  // 公傷假(起)
            this.injuryLeaveEnd = obj.injuryLeaveEnd  // 公傷假(迄)
            this.laborInspection = obj.laborInspection  // 通報勞檢
            this.cause = obj.cause.replace(/\n/g, '<br>')  // 發生原因
            this.note = obj.note.replace(/\n/g, '<br>')  // 備註
            this.improve = obj.improve.replace(/\n/g, '<br>')  // 改善措施

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

            // 設定狀態(測試資料)
            this.status = this.closeStatus
        },
        // 退回
        withdraw() {
            this.isLoading = true

            setTimeout(() => {
                this.chMsgbar({ success: true, msg: '退回成功'})
                this.$router.push({ path: '/smis/jobsafety/disaster-survey' })
                this.isLoading = false
            }, 1000)
        },
        // 同意措施執行
        save() {
            if (confirm('你確定要同意措施執行嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '同意措施執行成功'})
                    this.$router.push({ path: '/smis/jobsafety/disaster-survey' })
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
                    this.$router.push({ path: '/smis/jobsafety/disaster-survey' })
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
                    this.$router.push({ path: '/smis/jobsafety/disaster-survey' })
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 重提事故事件
        rerun() {
            if (confirm('重提後，資料會要重新跑流程，你確定嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.$router.push({ path: `/smis/jobsafety/disaster-survey/${this.routeId}/show` })
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