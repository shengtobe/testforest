<template>
<div>
    <!-- 待派工 -->
    <ListShow :itemData="itemData" v-if="status == 1" />

    <!-- 已派工待維修 -->
    <WorkShow :itemData="itemData" v-if="status == 2" />

    <!-- 已維修待驗收 -->
    <AcceptingShow :itemData="itemData" v-if="status == 3" />

    <!-- 已驗收待結案、已結案 -->
    <ClosedComplated :itemData="itemData" v-if="status == 4 || status == 5" />
</div>
</template>

<script>
import { mapActions } from 'vuex'
import { fetchWorkOrderOne } from '@/apis/workList/serve'
import { getNowFullTime } from '@/assets/js/commonFun'
import { serveStatusOpts } from '@/assets/js/workList'
import ListShow from '@/views/workList/serve/ListShow.vue'
import WorkShow from '@/views/workList/serve/WorkShow.vue'
import AcceptingShow from '@/views/workList/serve/AcceptingShow.vue'
import ClosedComplated from '@/views/workList/serve/ClosedComplated.vue'

export default {
    props: ['id'],  //路由參數
    data: () => ({
        itemData: {},  // 工單資料
        status: '',  // 狀態
    }),
    components: {
        ListShow,
        WorkShow,
        AcceptingShow,
        ClosedComplated,
    },
    methods: {
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 向後端取資料
        fetchData() {
            this.chLoadingShow({show:true})

            fetchWorkOrderOne({
                WorkOrderID: this.id,  // 工單編號 (從路由參數抓取)
                ClientReqTime: getNowFullTime(),  // client 端請求時間
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    if (res.data.DelStatus == 'T') {  // 若已刪除則轉404頁
                        this.$router.push({ path: '/404' })
                    } else {
                        this.status = res.data.Status  // 狀態

                        // 設定上面的欄位資料
                        let topItems = [
                            { icon: 'mdi-ray-vertex', title: '處理階段', text: serveStatusOpts.find(ele => ele.value == res.data.Status).text },
                            { icon: 'mdi-calendar-text', title: '年度', text: res.data.WorkYear },
                            { icon: 'mdi-currency-usd', title: '預算金額', text: res.data.WorkBudget },
                            { icon: 'mdi-calendar-text', title: '履約到期日', text: res.data.AgreementDTime },
                            { icon: 'mdi-calendar-text', title: '通知施作日(起)', text: res.data.WorkNoticeStartDTime },
                            { icon: 'mdi-calendar-text', title: '通知施作日(訖)', text: res.data.WorkNoticeEndDTime },
                            { icon: 'mdi-note', title: '通知方式', text: res.data.NoticeMethod },
                            { icon: 'mdi-account', title: '通知人', text: res.data.NoticeManID },
                            { icon: 'mdi-account', title: '立案人', text: res.data.Creator },
                            { icon: 'mdi-codepen', title: '設備標示編號', text: res.data.MaintainCode },
                            { icon: 'mdi-snowflake', title: '工單性質', text: (res.data.Type == 3)? '契約' : '小額採購' },
                            { icon: 'mdi-barcode', title: '工單性質編號', text: res.data.OderTypeCode },
                        ]

                        // 設定下面的欄位資料
                        let bottomItems = [
                            { dataType: 'text', oneline: false, icon: 'none', title: '通報維修地點及事項', text: res.data.Malfunction.replace(/\n/g, '<br>') },
                        ]

                        // 工項資料
                        let tableItems = res.data.ItemCount.map((item, idx) => ({  // 表格資料
                            numbers: idx + 1,
                            ...item
                        }))


                        if (this.status > 1) {
                            topItems.push({ icon: 'mdi-calendar-text', title: '預計驗收日期', text: res.data.ExpectedDT })
                            topItems.push({ icon: 'mdi-alert-outline', title: '進場管制申請', text: (res.data.WorkApplication == 'T')? '是' : '否' })
                            topItems.push({ icon: 'mdi-alert-outline', title: '特殊危害作業', text: (res.data.WorkSp == 'T')? '是' : '否' })
                            topItems.push({ icon: 'mdi-alert-outline', title: '安全危害作業', text: (res.data.WorkSafety == 'T')? '是' : '否' })

                            bottomItems.push({ dataType: 'text', oneline: false, icon: 'none', title: '備註', text: res.data.Memo.replace(/\n/g, '<br>') })
                            bottomItems.push({ dataType: 'text', oneline: true, icon: 'none', title: '外包廠商', text: res.data.OutSourceCount.map(item => `${ item.VendorName } (${ item.PeopleCount }人)`).join('、') })
                        }

                        if (this.status > 2) {
                            topItems.push({ icon: 'mdi-calendar-text', title: '到修日期', text: res.data.ToRepairDDate })
                            topItems.push({ icon: 'mdi-calendar-text', title: '動工日期', text: res.data.StartWorkDDate })
                            topItems.push({ icon: 'mdi-calendar-text', title: '完工日期', text: res.data.FinishDDate })

                            bottomItems.push({ dataType: 'text', oneline: false, icon: 'none', title: '維修情況', text: res.data.MaintainStatus.replace(/\n/g, '<br>') })
                            bottomItems.push({ dataType: 'text', oneline: false, icon: 'none', title: '延後驗收原因', text: res.data.DelayReason.replace(/\n/g, '<br>') })
                        }

                        if (this.status > 3) {
                            topItems.push({ icon: 'mdi-clock', title: '總工時', text: res.data.TotalWorkTime })
                        }

                        this.itemData = { ...res.data, topItems, bottomItems, tableItems }
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