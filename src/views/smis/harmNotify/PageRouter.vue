<template>
<div>
    <!-- 未回覆 -->
    <Show :itemData="itemData" v-if="status == 1 || status == 2" />

    <!-- 已立案、審核中 -->
    <ReviewComplated :itemData="itemData" v-if="status == 3 || status == 4" />
</div>
</template>

<script>
import { mapActions } from 'vuex'
import { fetchNotifyOne } from '@/apis/smis/harmNotify'
import { getNowFullTime } from '@/assets/js/commonFun'
import { harmNotifyStatus, locationOpts } from '@/assets/js/smisData'
import Show from '@/views/smis/harmNotify/Show.vue'
import ReviewComplated from '@/views/smis/harmNotify/ReviewComplated.vue'

export default {
    props: ['id'],  //路由參數
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
            this.chLoadingShow({show:true})

            fetchNotifyOne({
                EndangerID: this.id,  // 危害通報編號 (從路由參數抓取)
                ClientReqTime: getNowFullTime(),  // client 端請求時間
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    if (res.data.DelStatus == 'T') {  // 若已刪除則轉404頁
                        this.$router.push({ path: '/404' })
                    } else {
                        this.status = res.data.ReportStatus  // 狀態
                        console.log("status: ", res.data.ReportStatus);
                        // 組合發現地點
                        let findLocationText = locationOpts.find(item => item.value == res.data.FindLine).text
                        
                        if (['l1', 'l2', 'l3', 'l4'].includes(res.data.FindLine)) {
                            findLocationText += ` (${res.data.FindKLine}K+${res.data.FindMLine}M)`  // 本線、祝山線、眠月線、水山線
                        } else if(res.data.FindLine == 'other') {
                            findLocationText += ` (${res.data.FindLineOther})`  // 其他地點
                        }

                        

                        // 設定上面的欄位資料
                        let topItems = [
                            { icon: 'mdi-account', title: '通報人', text: res.data.NoticePeople },
                            { icon: 'mdi-apps', title: '所屬部門', text: res.data.NoticePeopleDepart },
                            { icon: 'mdi-calendar-text', title: '發現日期', text: res.data.FindDTime },
                            { icon: 'mdi-calendar-text', title: '填報日期', text: res.data.FillDTime },
                            { icon: 'mdi-map-marker', title: '發現地點', text: findLocationText },
                            { icon: 'mdi-ray-vertex', title: '通報狀態', text: harmNotifyStatus.find(ele => ele.value == res.data.ReportStatus).text },
                        ]

                        let bottomItems = [
                            { dataType: 'text', oneline: true, icon: 'mdi-pen', title: '通報主旨', text: res.data.ReportTitle },
                            { dataType: 'text', oneline: false, icon: 'mdi-note', title: '通報內容', text: res.data.ReportContent.replace(/\n/g, '<br>') },
                            { dataType: 'text', oneline: true, icon: 'mdi-calendar-text', title: '回覆日期', text: res.data.ReplyDTime.substr(0,10) },
                            { dataType: 'text', oneline: true, icon: 'mdi-message-processing', title: '回覆訊息', text: res.data.ReplyMsg },
                            { dataType: 'text', oneline: true, icon: 'mdi-ray-vertex', title: '立案狀態', text: harmNotifyStatus.find(ele => ele.value == res.data.ReportStatus).text },
                        ]

                            // 設定下面的欄位資料
                        // if (this.status > 1) {
                        //     topItems.push({ icon: 'mdi-calendar-text', title: '預計驗收日期', text: res.data.ExpectedDT })
                        //     topItems.push({ icon: 'mdi-alert-outline', title: '進場管制申請', text: (res.data.WorkApplication == 'T')? '是' : '否' })
                        //     topItems.push({ icon: 'mdi-alert-outline', title: '特殊危害作業', text: (res.data.WorkSp == 'T')? '是' : '否' })
                        //     topItems.push({ icon: 'mdi-alert-outline', title: '安全危害作業', text: (res.data.WorkSafety == 'T')? '是' : '否' })
                        //     topItems.push({ icon: 'mdi-map-marker', title: '工作地點', text: res.data.WorkPlace })
                        //     topItems.push({ icon: 'mdi-account-multiple', title: '實際人數', text: res.data.RealWorkerCount })

                        //     bottomItems.push({ oneline: false, icon: 'mdi-note', title: '備註', text: res.data.Memo.replace(/\n/g, '<br>') })
                        //     bottomItems.push({ oneline: true, icon: 'mdi-account-multiple', title: '需證照人員', text: res.data.PeopleLicense.map(ele => ele.PeopleName).join('、') })
                        //     bottomItems.push({ oneline: true, icon: 'mdi-account-multiple', title: '作業人員', text: res.data.PeopleNoLicense.map(ele => ele.PeopleName).join('、') })
                        //     bottomItems.push({ oneline: true, icon: 'mdi-account-multiple', title: '外包廠商', text: res.data.OutSourceCount.map(item => `${ item.VendorName } (${ item.PeopleCount }人)`).join('、') })
                        // }

                        // if (this.status > 2) {
                        //     topItems.push({ icon: 'mdi-calendar-text', title: '到修日期', text: res.data.ToRepairDDate })
                        //     topItems.push({ icon: 'mdi-calendar-text', title: '動工日期', text: res.data.StartWorkDDate })
                        //     topItems.push({ icon: 'mdi-calendar-text', title: '完工日期', text: res.data.FinishDDate })

                        //     bottomItems.push({ oneline: false, icon: 'mdi-wrench', title: '維修情況', text: res.data.MaintainStatus.replace(/\n/g, '<br>') })
                        //     bottomItems.push({ oneline: false, icon: 'mdi-file-document', title: '延後驗收原因', text: res.data.DelayReason.replace(/\n/g, '<br>') })
                        // }

                        this.itemData = { ...res.data, topItems, bottomItems }
                    }
                } else {
                    // 請求發生問題時(ErrorCode 不為 0 時)，重導至錯誤訊息頁面
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
            }).catch(err => {
                console.log(err)
                alert('伺服器發生問題，資料讀取失敗')
            }).finally(() => {
                this.chLoadingShow({show:false})
            })
        },
    },
    created() {
        this.fetchData()
    }
}
</script>