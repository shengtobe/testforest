<template>
<div>
    <!-- 已立案 -->
    <Show :itemData="itemData" v-if="status == '1'" />

    <!-- 審核中、已完備資料 -->
    <ReviewComplated :itemData="itemData" v-if="status == '2' || status == '3'" />

    <!-- 審核中、風險已可接受 -->
    <Fulfill :itemData="itemData" v-if="status == '4' || status == '5'" />
</div>
</template>

<script>
import { mapActions } from 'vuex'
// import { fetchWorkOrderOne } from '@/apis/workList/maintain'
import { getNowFullTime } from '@/assets/js/commonFun'
import Show from '@/views/smis/carHarmDatabase/harms/Show.vue'
import ReviewComplated from '@/views/smis/carHarmDatabase/harms/ReviewComplated.vue'
import Fulfill from '@/views/smis/carHarmDatabase/harms/Fulfill.vue'

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

                    this.itemData = {
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