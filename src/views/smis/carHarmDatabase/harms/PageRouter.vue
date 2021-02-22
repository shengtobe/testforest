<template>
<div>
    <!-- 已立案 -->
    <Show :itemData="itemData" v-if="status == 1" />

    <!-- 審核中、已完備資料 -->
    <ReviewComplated :itemData="itemData" v-if="status == 2 || status == 3" />

    <!-- 審核中、風險已可接受 -->
    <Fulfill :itemData="itemData" v-if="status == 4 || status == 5" />

    <!-- 審核中(審核更新) -->
    <UpdateReview :itemData="itemData" v-if="status == 6" />
</div>
</template>

<script>
import { mapActions } from 'vuex'
// import { fetchWorkOrderOne } from '@/apis/workList/maintain'
import { getNowFullTime } from '@/assets/js/commonFun'
import { carHarmDbStatus } from '@/assets/js/smisData'
import Show from '@/views/smis/carHarmDatabase/harms/Show.vue'
import ReviewComplated from '@/views/smis/carHarmDatabase/harms/ReviewComplated.vue'
import Fulfill from '@/views/smis/carHarmDatabase/harms/Fulfill.vue'
import UpdateReview from '@/views/smis/carHarmDatabase/harms/UpdateReview.vue'

export default {
    data: () => ({
        itemData: {},  // 工單資料
        status: '',  // 狀態
    }),
    components: {
        Show,
        ReviewComplated,
        Fulfill,
        UpdateReview,
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
            // let id = this.$route.params.id  // 路由參數
            
            // fetchWorkOrderOne({
            //     WorkOrderID: id,  // 工單編號
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
                        versionId: 2,  // 版本id (不是版本號)
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

                    // 影響、運轉影響情形字串
                    let affectsArr = []
                    if (obj.affectTraveler) affectsArr.push('影響旅客')
                    if (obj.affectStaff) affectsArr.push('影響員工')
                    if (obj.affectPublic) affectsArr.push('影響大眾')
                    if (obj.trainLate) affectsArr.push('列車誤點')
                    if (obj.stopOperation) affectsArr.push('中斷營運')

                    let topItems = [  // 上面的欄位
                        { icon: 'mdi-ray-vertex', title: '危害狀態', text: carHarmDbStatus.find(ele => ele.value == obj.status).text },
                        { icon: 'mdi-bank', title: '權責單位', text: obj.depart },
                        { icon: 'mdi-snowflake', title: '營運模式', text: obj.mode },
                        { icon: 'mdi-source-branch', title: '關聯子系統', text: obj.wbs },
                        { icon: 'mdi-format-line-spacing', title: '風險嚴重性', text: obj.serious },
                        { icon: 'mdi-signal-variant', title: '風險頻率', text: obj.frequency },
                        { icon: 'mdi-elevation-rise', title: '風險等級', text: obj.level },
                    ]

                    // 設定下面的欄位資料
                    let bottomItems = [
                        { oneline: false, icon: 'mdi-pen', title: '危害說明', text: obj.desc.replace(/\n/g, '<br>') },
                        { oneline: false, icon: 'mdi-pen', title: '直接成因', text: obj.reason.replace(/\n/g, '<br>') },
                        { oneline: false, icon: 'mdi-pen', title: '可能的間接原因', text: obj.indirectReason.replace(/\n/g, '<br>') },
                        { oneline: false, icon: 'mdi-note', title: '備註', text: obj.note.replace(/\n/g, '<br>') },
                        { oneline: true, icon: 'mdi-alert-decagram', title: '影響、運轉影響情形', text: affectsArr.join('、') },
                        { oneline: true, icon: 'mdi-arrow-expand', title: '衍生事故', text: obj.accidents.join('、') },
                    ]

                    // status 6 的審核更新，會使用二筆資料用來做比對，所以要另外處理

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