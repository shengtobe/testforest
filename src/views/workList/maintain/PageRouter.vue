<template>
<div>
    <!-- 待派工 -->
    <ListShow :itemData="itemData" v-if="status == '1'" />

    <!-- 已派工待維修 -->
    <WorkShow :itemData="itemData" v-if="status == '2'" />

    <!-- 已維修待驗收 -->
    <AcceptingShow :itemData="itemData" v-if="status == '3'" />

    <!-- 已驗收待結案、已結案 -->
    <ClosedComplated :itemData="itemData" v-if="status == '4' || status == '5'" />
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
                        // 設定上面的欄位資料
                        let topItems = [
                            { icon: 'mdi-codepen', title: '設備標示編號', text: res.data.MaintainCode },
                            { icon: 'mdi-apps', title: '立案單位', text: res.data.CreatorDepart },
                            { icon: 'mdi-account', title: '立案人', text: res.data.Creator },
                            { icon: 'mdi-calendar-text', title: '立案時間', text: `${res.data.CreateDDay} ${res.data.CreateDTime}時` },
                            { icon: 'mdi-apps', title: '維修單位', text: res.data.DispatchDepart },
                            { icon: 'mdi-account', title: '派工人', text: res.data.DispatchMan },
                            { icon: 'mdi-source-branch', title: '維修類型', text: (res.data.Type == '1')? '故障檢修' : ((res.data.Type == '2')? '例行保養' : '') },
                            { icon: 'mdi-ray-vertex', title: '處理階段', text: maintainStatusOpts.find(ele => ele.value == res.data.Status).text },
                        ]

                        // 設定下面的欄位資料
                        let bottomItems = [
                            { oneline: true, icon: 'mdi-file-document', title: '故障主旨', text: res.data.WorkSubject },
                            { oneline: false, icon: 'mdi-pen', title: '故障描述', text: res.data.Malfunction.replace(/\n/g, '<br>') },
                        ]

                        this.itemData = { ...res.data, topItems, bottomItems }
                        this.status = res.data.Status
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