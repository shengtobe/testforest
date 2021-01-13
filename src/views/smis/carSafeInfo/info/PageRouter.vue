<template>
<div>
    <!-- 待派工 -->
    <ListShow :itemData="itemData" v-if="status == '1'" />

    <!-- 審核中 -->
    <WorkShow :itemData="itemData" v-if="status == '2'" />

    <!-- 加會中 -->
    <AcceptingShow :itemData="itemData" v-if="status == '3'" />

    <!-- 已發布 -->
    <ClosedComplated :itemData="itemData" v-if="status == '4' || status == '5'" />
</div>
</template>

<script>
import { mapActions } from 'vuex'
import { fetchWorkOrderOne } from '@/apis/workList/maintain'
import { getNowFullTime } from '@/assets/js/commonFun'
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
            let id = this.$route.params.id  // 路由參數
            
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
        },
    },
    created() {
        this.fetchData()
    }
}
</script>