<template>
<div>
    <!-- 待派工 -->
    <Show :itemData="itemData" v-if="status == 1" />

    <!-- 審核中、已完備資料 -->
    <ReviewComplated :itemData="itemData" v-if="status == 2 || status == 3" />

    <!-- 審核中、改善措施已落實 -->
    <Fulfill :itemData="itemData" v-if="status == 4 || status == 5" />
</div>
</template>

<script>
import { mapActions } from 'vuex'
// import { fetchWorkOrderOne } from '@/apis/workList/maintain'
import { jobDisasterSurveyStatus, injurySiteOpts, disasterTypeOpts, vehicleOpts } from '@/assets/js/smisData'
import { getNowFullTime } from '@/assets/js/commonFun'
import Show from '@/views/smis/jobSafety/disasterSurvey/Show.vue'
import ReviewComplated from '@/views/smis/jobSafety/disasterSurvey/ReviewComplated.vue'
import Fulfill from '@/views/smis/jobSafety/disasterSurvey/Fulfill.vue'

export default {
    data: () => ({
        itemData: {},  // 工單資料
        status: '',  // 狀態
    }),
    components: {
        Show,
        ReviewComplated,
        Fulfill,
    },
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        },
    },
    methods: {
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 向後端取資料
        fetchData() {
            this.chLoadingShow()
            
            // fetchWorkOrderOne({
            //     WorkOrderID: this.$route.params.id,  // 工單編號
            //     ClientReqTime: getNowFullTime(),  // client 端請求時間
            // }).then(res => {
            //     if (res.data.ErrorCode == 0) {
            //         // 若已刪除則轉頁404
            //         if (res.data.DelStatus == 'T') {
            //             this.$router.push({ path: '/404' })
            //         } else {
            //             this.itemData = { ...res.data }
            //             this.status = res.data.Status
            //         }
            //     } else {
            //         sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
            //         this.$router.push({ path: '/error' })
            //     }
            // }).catch(err => {
            //     console.log(err)
            //     alert('伺服器發生問題，資料讀取失敗')
            // }).finally(() => {
            //     this.chLoadingShow()
            // })

            // -------------- demo用資料 --------------
            setTimeout(() => {
                // 暫時先用 storage 設定狀態(缺點是不能重新整理看最新狀態資料)
                if (sessionStorage.getItem('itemStatus') !== null) {
                    this.status = sessionStorage.getItem('itemStatus')
                    sessionStorage.removeItem('itemStatus')  // 清除 sessionStorage

                    // 測試資料
                    let obj = {
                        status: this.status,  // 狀態
                        id: this.$route.params.id,  // 編號
                        workDepart: '阿里山車站',  // 工作部門
                        name: '王小明',  // 罹災者姓名
                        idCard: 'S122333444',  // 身份證
                        passport: 'D88800548',  // 護照號碼
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
                        lat: '45.125986',  // 發生地點(緯度)
                        lng: '120.965478',  // 發生地點(經度)
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
                        controlReview: '措施檢討摘要文字措施檢討摘要文字措施檢討摘要文字措施檢討摘要文字措施檢討摘要文字措施檢討摘要文字措施檢討摘要文字措施檢討摘要文字',  // 措施檢討摘要
                        evidences: [  // 改善措施證據
                            { fileName: '123.docx', link: '/demofile/123.docx' },
                            { fileName: '456.xlsx', link: '/demofile/456.xlsx' },
                        ],
                    }

                    let topItems = [  // 上面的欄位
                        { icon: 'mdi-ray-vertex', title: '事故狀態', text: jobDisasterSurveyStatus.find(ele => ele.value == obj.status).text },
                        { icon: 'mdi-account', title: '罹災者姓名', text: obj.name },
                        { icon: 'mdi-barcode', title: '身分證', text: obj.idCard },
                        { icon: 'mdi-barcode', title: '護照號碼', text: obj.passport },
                        { icon: 'mdi-calendar-text', title: '工作部門', text: obj.workDepart },
                        { icon: 'mdi-snowflake', title: '勞工類型', text: (obj.type == 1)? '本處員工' : '承攬商勞工' },
                        { icon: 'mdi-human-male-female', title: '性別', text: obj.sex },
                        { icon: 'mdi-sort-variant', title: '年齡', text: obj.old },
                        { icon: 'mdi-calendar-text', title: '到職日期', text: obj.startWorkDate },
                        { icon: 'mdi-format-title', title: '職稱', text: obj.jobTitle },
                        { icon: 'mdi-school', title: '教育程度', text: obj.education },
                        { icon: 'mdi-ray-vertex', title: '是否複核', text: (obj.isReview)? '已複核' : '未核定' },
                    ]

                    // 設定下面的欄位資料
                    let bottomItems = [
                        { oneline: true, title: '本項工作經驗年數', text: obj.workYear },
                        { oneline: true, title: '本項工作訓練日期', text: obj.trainingDate },
                        { oneline: true, title: '罹災者住址', text: obj.address },
                        { oneline: true, title: '發生單位', text: obj.depart },
                        { oneline: true, title: '發生日期', text: `${obj.findDate} ${obj.findHour}:${obj.findMin}:00` },
                        { oneline: true, title: '發生地點', text: obj.location },
                        { oneline: true, title: '發生地點(緯度)', text: obj.lat },
                        { oneline: true, title: '發生地點(經度)', text: obj.lng },
                        { oneline: true, title: '氣候', text: obj.weather },
                        { oneline: true, title: '事故類別', text: obj.accidentType },
                        { oneline: true, title: '事故結果', text: obj.accidentResult },
                        { oneline: true, title: '傷害部位', text: injurySiteOpts.find(item => item.value == obj.injurySite).text },
                        { oneline: true, title: '災害類型', text: disasterTypeOpts.find(item => item.value == obj.disasterType).text },
                        { oneline: true, title: '致傷媒介物', text: vehicleOpts[obj.vehicleLv1].find(item => item.value == obj.vehicle).text },
                        { oneline: false, title: '直接原因', text: obj.directReason.replace(/\n/g, '<br>') },
                        { oneline: false, title: '間接原因', text: obj.indirectReason.replace(/\n/g, '<br>') },
                        { oneline: false, title: '基本原因', text: obj.basicReason.replace(/\n/g, '<br>') },
                        { oneline: false, title: '傷者當時工作', text: obj.workItem.replace(/\n/g, '<br>') },
                        { oneline: false, title: '事故概況', text: obj.overview.replace(/\n/g, '<br>') },
                        { oneline: false, title: '緊急處理情形', text: obj.emergentWork.replace(/\n/g, '<br>') },
                        { oneline: false, title: '事故單位防範及改善對策', text: obj.improveStrategy.replace(/\n/g, '<br>') },
                    ]

                    if (this.status > 1) {
                        bottomItems.push({ oneline: true, title: '公傷假', text: `${obj.injuryLeaveStart} ~ ${obj.injuryLeaveEnd}` })
                        bottomItems.push({ oneline: true, title: '通報勞檢', text: (obj.laborInspection == 'y')? '有' : '無' })
                        bottomItems.push({ oneline: false, title: '發生原因', text: obj.cause.replace(/\n/g, '<br>') })
                        bottomItems.push({ oneline: false, title: '備註', text: obj.note.replace(/\n/g, '<br>') })
                        bottomItems.push({ oneline: false, title: '改善措施', text: obj.improve.replace(/\n/g, '<br>') })
                    }

                    this.itemData = { ...obj, topItems, bottomItems }  // demo 用時 ...res.data 先改為 obj
                }

                this.chLoadingShow()
            }, 1000)
        },
    },
    created() {
        this.fetchData()
    }
}
</script>