<template>
<div>
    <!-- 已立案 -->
    <Show :itemData="itemData" v-if="status == 1" />

    <!-- 審核中、加會中、已發布 -->
    <ReviewComplated :itemData="itemData" v-if="status == 2 || status == 3 || status == 4" />
</div>
</template>

<script>
import { mapActions } from 'vuex'
// import { fetchWorkOrderOne } from '@/apis/smis/carSafeInfo/info/maintain'
import { carSafeInfoStatus } from '@/assets/js/smisData'
import { getNowFullTime } from '@/assets/js/commonFun'
import Show from '@/views/smis/carSafeInfo/info/Show.vue'
import ReviewComplated from '@/views/smis/carSafeInfo/info/ReviewComplated.vue'

export default {
    data: () => ({
        itemData: {},  // 工單資料
        status: '',  // 狀態
    }),
    components: {
        Show,
        ReviewComplated,
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
                        depart: '綜合企劃科',
                        name: '王小明',
                        title: '3月份團康活動',
                        desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',  // 說明
                        recipients: ['錢光華 (K12584)', '李運深 (K24785)', '周寶盛 (K65241)'],  // 收件人
                        cc: ['吳泓吉 (K58963)'],  // 副本
                        joiners: ['鄭家豪 (K24758)'],  // 加會人
                        files: [
                            { fileName: 'ASRC200701.jpg', link: '/demofile/demo.jpg' },
                            { fileName: '123.docx', link: '/demofile/123.docx' },
                            { fileName: '456.xlsx', link: '/demofile/456.xlsx' },
                        ],
                        opinionList: [
                            {
                                name: '鄭家豪',
                                text: '意見文字意見文字意見文字意見文字意見文字意見文字意見文字意見文字意見文字意見文字意見文字意見文字意見文字意見文字意見文字意見文字',
                            },
                        ],
                        Jdata: [  // 加會人
                            {
                                depart: '鐵路維護科',
                                name: '王小明',
                                isRead: true,
                                time: '2020-01-05 14:22:00',
                                hasMsg: true,
                            },
                        ],
                        Rdata: [  // 收件人
                            {
                                depart: '鐵路維護科',
                                name: '陳弘宇',
                                isRead: true,
                                time: '2020-01-05 14:22:00'
                            },
                            {
                                depart: '鐵路維護科',
                                name: '楊耀信',
                                isRead: false,
                                time: ''
                            },
                        ],
                    }

                    let topItems = [  // 上面的欄位
                        { icon: 'mdi-ray-vertex', title: '發布狀態', text: carSafeInfoStatus.find(ele => ele.value == obj.status).text },
                        { icon: 'mdi-bank', title: '通報單位', text: obj.depart },
                        { icon: 'mdi-account', title: '通報人', text: obj.name },
                    ]

                    // 設定下面的欄位資料
                    let bottomItems = [
                        { oneline: true, icon: 'mdi-file-document', title: '通報主題', text: obj.title },
                        { oneline: true, icon: 'mdi-account-multiple', title: '收件人', text: obj.recipients.join('、') },
                        { oneline: true, icon: 'mdi-account-multiple', title: '副本', text: obj.cc.join('、') },
                        { oneline: true, icon: 'mdi-account-multiple', title: '加會人', text: obj.joiners.join('、') },
                        { oneline: false, icon: 'mdi-file-document', title: '發布內容', text: obj.desc.replace(/\n/g, '<br>') },
                    ]

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