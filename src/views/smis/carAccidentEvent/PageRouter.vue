<template>
<div>
    <!-- 待派工 -->
    <Show :itemData="itemData" v-if="status == '1'" />

    <!-- 審核中、已完備資料 -->
    <ReviewComplated :itemData="itemData" v-if="status == '2' || status == '3'" />

    <!-- 審核中、改善措施已落實 -->
    <Fulfill :itemData="itemData" v-if="status == '4' || status == '5'" />
</div>
</template>

<script>
import { mapActions } from 'vuex'
// import { fetchWorkOrderOne } from '@/apis/workList/maintain'
import { getNowFullTime } from '@/assets/js/commonFun'
import Show from '@/views/smis/carAccidentEvent/Show.vue'
import ReviewComplated from '@/views/smis/carAccidentEvent/ReviewComplated.vue'
import Fulfill from '@/views/smis/carAccidentEvent/Fulfill.vue'

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
                        findDate: '2017-01-25',  // 發現日期
                        findHour: '15',  // 發現日期(時)
                        findMin: '56',  // 發現日期(分)
                        location: 'l1',  // 發現地點
                        locationK: 20,  // 路線k
                        locationM: 445,　// 路線m
                        locationOther: '',　// 其他地點
                        accidentType: 'M2',  // 事故類型
                        eqLoss: 'APC3 車廂轉向架受損',  // 設備受損情形
                        serviceShock: '影響列車計2列次',  // 運轉影響情形
                        handle: "1430 312次由奮起湖車站開出。\n1556 312次行駛至嘉義線 20K+445M 出軌，列車於嘉義線 19K+700M停止 司機員及列車員立即通報嘉義車庫及竹崎車站請求救援。\n1633 接駁列車511 次自北門站開出至事故現場接駁 6 次旅客。\n1658 312次將第 1 車廂重新編組載運 29 位旅客離開事故現場。\n1703 搶修列車521 次自北門車站開出辦理搶修作業。\n1734 接駁列車511 次抵達事故現場。\n1803 312次將第 1 車廂重新編組載運 29 位旅客抵達嘉義車站。\n1816 接駁列車511 次自事故現場開出。\n1915 接駁列車511 次抵達嘉義車站。\n1919 復軌完成。\n2000 路線測試完成恢復正常。\n2139 搶修列車521 次返回北門車站。",  // 處置過程
                        review: '新增行車事故事件本事故事發後，鐵道局於107年3月5日啟動專案調查，並於同月8、9日辦理本事故專案調查簡報討論、文件檢視及現場勘查 。同年5月3日召開本事故專案調查工作會議。最終於同年8月15日召開交通部鐵路行車事故調查小組第24次會議，確認本事故專案調查結果。',  // 檢討過程
                        reason: "<直接原因>\n事故路段因氣候易潮濕，加上路基排水狀況不佳 造成該路段有多處噴泥現象， 當鋼軌受列車重壓下沉致軌枕沉 陷、鋼軌產生前後高低不整之現象，在 列車於動態行駛下易致鋼軌單邊下沉產生平面性扭曲，使車輪浮動爬上出軌。\n<間接原因>\n部分路段道碴存有厚度不足加上列車反覆作用下，致使路基土壤細粒料因壓力而循道碴間隙上升， 使路基出現鬆動現象。\n<其他因素>\n有關天候、車輛、人員及運轉等部分，經檢討尚無涉事故原因。",  // 原因分析
                        note: '本事故由鐵道局( 鐵路營運監理小組) 及 5位具軌道、力學、車輛及營運等專業之外聘專案委員組成團隊進行專案調查，並由本部鐵路行車事故調查小組 定期委員開會確認調查結果。', // 備註說明
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
                        controlItems: [  // 控制措施
                            {
                                id: 21,
                                subject: '定期巡檢枕木',
                                desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',
                                depart: '服務科',
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
                                id: 36,
                                subject: '定期巡檢扣件',
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
                            {
                                id: 45,
                                subject: '維修後慢行觀察',
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
                            {
                                id: 49,
                                subject: '定期校驗軌道檢測儀',
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
                            {
                                id: 53,
                                subject: '強化鋼軌與軌枕間之扣夾力',
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
                        ],
                        summary: '摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字摘要文字',  // 改善措施摘要
                        controlReview: ' 檢討摘要檢討摘要檢討摘要檢討摘要檢討摘要檢討摘要檢討摘要檢討摘要檢討摘要檢討摘要檢討摘要檢討摘要檢討摘要檢討摘要檢討摘要',  // 檢討摘要
                        evidences: [  // 改善措施證據
                            { fileName: '123.docx', link: '/demofile/123.docx' },
                            { fileName: '456.xlsx', link: '/demofile/456.xlsx' },
                        ],
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