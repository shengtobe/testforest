<template>
<div>
    <!-- 待派工 -->
    <Show :itemData="itemData" v-if="status == 1" />

    <!-- 審核中、已完備資料 -->
    <!-- <ReviewComplated :itemData="itemData" v-if="status == 2 || status == 3" /> -->

    <!-- 審核中、改善措施已落實 -->
    <!-- <Fulfill :itemData="itemData" v-if="status == 4 || status == 5" /> -->
</div>
</template>

<script>
import { mapActions } from 'vuex'
// import { fetchWorkOrderOne } from '@/apis/workList/maintain'
import { detailOneDb } from '@/apis/smis/jobSafety'
import { jobSeriousOpts, jobPossibilityOpts, jobLevelOpts, jobHarmType } from '@/assets/js/smisData'
import { getNowFullTime } from '@/assets/js/commonFun'
import Show from '@/views/smis/jobSafety/disasterDb/Show.vue'
import ReviewComplated from '@/views/smis/jobSafety/disasterSurvey/ReviewComplated.vue'
import Fulfill from '@/views/smis/jobSafety/disasterSurvey/Fulfill.vue'

export default {
    props: ['id'],  //路由參數
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
            
            detailOneDb({
                EndangerCode: this.id,  // 危害通報編號 (從路由參數抓取)
                ClientReqTime: getNowFullTime(),  // client 端請求時間
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    if (res.data.DelStatus == 'T') {  // 若已刪除則轉404頁
                        this.$router.push({ path: '/404' })
                    } else {
                        this.status = res.data.AccidentStatus  // 狀態
                    // 設定下面的欄位資料
                    let bottomItems = [
                        { dataType: 'text', oneline: true, icon: 'none', title: '作業名稱', text: res.data.JobName },
                        { dataType: 'text', oneline: true, icon: 'none', title: '操作工作內容', text: res.data.JobContent },
                        { dataType: 'text', oneline: true, icon: 'none', title: '作業週期', text: res.data.JobCycle },
                        { dataType: 'text', oneline: true, icon: 'none', title: '作業環境', text: res.data.JobCondition },
                        { dataType: 'text', oneline: true, icon: 'none', title: '機械/設備/工具', text: res.data.ToolDevice },
                        { dataType: 'text', oneline: true, icon: 'none', title: '能源/化學物質', text: res.data.ChemicalType },
                        { dataType: 'text', oneline: true, icon: 'none', title: '危害類型', text: jobHarmType.find(item => item.value == res.data.JobAccidentType).text },
                        // { dataType: 'text', oneline: true, icon: 'none', title: '危害類型', text: res.data.JobAccidentType },
                        { dataType: 'text', oneline: true, icon: 'none', title: '作業資格', text: res.data.JobProd },
                        { dataType: 'text', oneline: false, icon: 'none', title: '危害可能造成後果', text: res.data.AccidentStatusDesp.replace(/\n/g, '<br>') },
                        { dataType: 'text', oneline: true, icon: 'none', title: '工程控制', text: res.data.EngineerCtrl },
                        { dataType: 'text', oneline: true, icon: 'none', title: '管理控制', text: res.data.ManageCtrl },
                        { dataType: 'text', oneline: true, icon: 'none', title: '防護具', text: res.data.ProtTool },
                        { dataType: 'text', oneline: true, icon: 'none', title: '風險嚴重性', text: jobSeriousOpts.find(item => item.value == res.data.EndangerLevel).text },
                        { dataType: 'text', oneline: true, icon: 'none', title: '風險可能性', text: jobPossibilityOpts.find(item => item.value == res.data.EndangerProb).text },
                        { dataType: 'text', oneline: true, icon: 'none', title: '控制後風險嚴重性', text: jobSeriousOpts.find(item => item.value == res.data.EndangerLevelC).text },
                        { dataType: 'text', oneline: true, icon: 'none', title: '控制後風險可能性', text: jobPossibilityOpts.find(item => item.value == res.data.EndangerProbC).text },
                        { dataType: 'text', oneline: false, icon: 'none', title: '降低風險所採取之控制措施', text: res.data.LowRiskDevice.replace(/\n/g, '<br>') },
                        { dataType: 'text', oneline: true, icon: 'none', title: '風險等級', text: jobLevelOpts.find(item => item.value == res.data.RiskLevel).text },
                        { dataType: 'text', oneline: true, icon: 'none', title: '控制後風險等級', text: jobLevelOpts.find(item => item.value == res.data.RiskLevelC).text },
                    ]

                    // if (this.status > 1) {
                    //     bottomItems.push({ oneline: true, title: '公傷假', text: `${res.data.injuryLeaveStart} ~ ${res.data.injuryLeaveEnd}` })
                    //     bottomItems.push({ oneline: true, title: '通報勞檢', text: (res.data.laborInspection == 'y')? '有' : '無' })
                    //     bottomItems.push({ oneline: false, title: '發生原因', text: res.data.cause.replace(/\n/g, '<br>') })
                    //     bottomItems.push({ oneline: false, title: '備註', text: res.data.note.replace(/\n/g, '<br>') })
                    //     bottomItems.push({ oneline: false, title: '改善措施', text: res.data.improve.replace(/\n/g, '<br>') })
                    // }

                    this.itemData = { ...res.data, bottomItems }  // demo 用時 ...res.data 先改為 obj
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
            
        },
    },
    created() {
        this.fetchData()
    }
}
</script>