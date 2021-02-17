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
import { fetchWorkOrderOne } from '@/apis/workList/maintain'
import { getNowFullTime } from '@/assets/js/commonFun'
import { maintainStatusOpts } from '@/assets/js/workList'
import ListShow from '@/views/workList/maintain/ListShow.vue'
import WorkShow from '@/views/workList/maintain/WorkShow.vue'
import AcceptingShow from '@/views/workList/maintain/AcceptingShow.vue'
import ClosedComplated from '@/views/workList/maintain/ClosedComplated.vue'

export default {
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

            fetchWorkOrderOne({
                WorkOrderID: this.$route.params.id,  // 工單編號 (從路由參數抓取)
                ClientReqTime: getNowFullTime(),  // client 端請求時間
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    if (res.data.DelStatus == 'T') {  // 若已刪除則轉404頁
                        this.$router.push({ path: '/404' })
                    } else {
                        this.status = res.data.Status  // 狀態

                        // 設定上面的欄位資料
                        let topItems = [
                            { icon: 'mdi-ray-vertex', title: '處理階段', text: maintainStatusOpts.find(ele => ele.value == res.data.Status).text },
                            { icon: 'mdi-codepen', title: '設備標示編號', text: res.data.MaintainCode },
                            { icon: 'mdi-apps', title: '立案單位', text: res.data.CreatorDepart },
                            { icon: 'mdi-account', title: '立案人', text: res.data.Creator },
                            { icon: 'mdi-calendar-text', title: '立案時間', text: `${res.data.CreateDDay} ${res.data.CreateDTime}時` },
                            { icon: 'mdi-apps', title: '維修單位', text: res.data.DispatchDepart },
                            { icon: 'mdi-account', title: '派工人', text: res.data.DispatchMan },
                            { icon: 'mdi-source-branch', title: '維修類型', text: (res.data.Type == '1')? '故障檢修' : ((res.data.Type == '2')? '例行保養' : '') },
                        ]

                        // 設定下面的欄位資料
                        let bottomItems = [
                            { dataType: 'text', oneline: true, icon: 'mdi-file-document', title: '故障主旨', text: res.data.WorkSubject },
                            { dataType: 'text', oneline: false, icon: 'mdi-pen', title: '故障描述', text: res.data.Malfunction.replace(/\n/g, '<br>') },
                        ]

                        if (this.status > 1) {
                            topItems.push({ icon: 'mdi-calendar-text', title: '預計驗收日期', text: res.data.ExpectedDT })
                            topItems.push({ icon: 'mdi-alert-outline', title: '進場管制申請', text: (res.data.WorkApplication == 'T')? '是' : '否' })
                            topItems.push({ icon: 'mdi-alert-outline', title: '特殊危害作業', text: (res.data.WorkSp == 'T')? '是' : '否' })
                            topItems.push({ icon: 'mdi-alert-outline', title: '安全危害作業', text: (res.data.WorkSafety == 'T')? '是' : '否' })
                            topItems.push({ icon: 'mdi-map-marker', title: '工作地點', text: res.data.WorkPlace })
                            topItems.push({ icon: 'mdi-account-multiple', title: '實際人數', text: res.data.RealWorkerCount })

                            bottomItems.push({ dataType: 'text', oneline: false, icon: 'mdi-note', title: '備註', text: res.data.Memo.replace(/\n/g, '<br>') })
                            bottomItems.push({ dataType: 'text', oneline: true, icon: 'mdi-account-multiple', title: '需證照人員', text: res.data.PeopleLicense.map(ele => ele.PeopleName).join('、') })
                            bottomItems.push({ dataType: 'text', oneline: true, icon: 'mdi-account-multiple', title: '作業人員', text: res.data.PeopleNoLicense.map(ele => ele.PeopleName).join('、') })
                            bottomItems.push({ dataType: 'text', oneline: true, icon: 'mdi-account-multiple', title: '外包廠商', text: res.data.OutSourceCount.map(item => `${ item.VendorName } (${ item.PeopleCount }人)`).join('、') })
                        }

                        if (this.status > 2) {
                            topItems.push({ icon: 'mdi-calendar-text', title: '到修日期', text: res.data.ToRepairDDate })
                            topItems.push({ icon: 'mdi-calendar-text', title: '動工日期', text: res.data.StartWorkDDate })
                            topItems.push({ icon: 'mdi-calendar-text', title: '完工日期', text: res.data.FinishDDate })

                            bottomItems.push({ dataType: 'text', oneline: false, icon: 'mdi-wrench', title: '維修情況', text: res.data.MaintainStatus.replace(/\n/g, '<br>') })
                            bottomItems.push({ dataType: 'text', oneline: false, icon: 'mdi-file-document', title: '延後驗收原因', text: res.data.DelayReason.replace(/\n/g, '<br>') })
                        }

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
                this.chLoadingShow()
            })
        },
    },
    created() {
        this.fetchData()
    }
}
</script>