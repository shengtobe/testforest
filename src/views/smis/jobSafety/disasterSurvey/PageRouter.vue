<template>
<div>
    <!-- 待派工 -->
    <Show :itemData="itemData" v-if="status == 1" />

    <!-- 審核中、已完備資料 -->
    <ReviewComplated :itemData="itemData" v-if="status == 2 || status == 3" />

    <!-- 審核中、改善措施已落實 -->
    <Fulfill :itemData="itemData" v-if="status == 4 || status == 5" />
</div>
</template>

<script>
import { mapActions } from 'vuex'
// import { fetchWorkOrderOne } from '@/apis/workList/maintain'
import { detailOne } from '@/apis/smis/jobSafety'
import { jobDisasterSurveyStatus, injurySiteOpts, disasterTypeOpts, vehicleOpts } from '@/assets/js/smisData'
import { getNowFullTime } from '@/assets/js/commonFun'
import Show from '@/views/smis/jobSafety/disasterSurvey/Show.vue'
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
            this.chLoadingShow({show:true})
            
            detailOne({
                AccidentCode: this.id,  // 危害通報編號 (從路由參數抓取)
                ClientReqTime: getNowFullTime(),  // client 端請求時間
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    if (res.data.DelStatus == 'T') {  // 若已刪除則轉404頁
                        this.$router.push({ path: '/404' })
                    } else {
                        this.status = res.data.AccidentStatus  // 狀態
                        // 設定上面的欄位資料
                        let topItems = [  // 上面的欄位
                        { icon: 'mdi-ray-vertex', title: '事故狀態', text: jobDisasterSurveyStatus.find(ele => ele.value == res.data.AccidentStatus).text },
                        { icon: 'mdi-account', title: '罹災者姓名', text: res.data.HurtPeopleName },
                        { icon: 'mdi-barcode', title: '身分證', text: res.data.HurtPeopleCardID },
                        { icon: 'mdi-barcode', title: '護照號碼', text: res.data.HurtPassportID },
                        { icon: 'mdi-calendar-text', title: '工作部門', text: res.data.PeopleDepart },
                        { icon: 'mdi-snowflake', title: '勞工類型', text: (res.data.EmployType == 1)? '本處員工' : '承攬商勞工' },
                        { icon: 'mdi-human-male-female', title: '性別', text: res.data.PeopleSex },
                        { icon: 'mdi-sort-variant', title: '年齡', text: res.data.PeopleAge },
                        { icon: 'mdi-calendar-text', title: '到職日期', text: res.data.WorkDate },
                        { icon: 'mdi-format-title', title: '職稱', text: res.data.JobTitle },
                        { icon: 'mdi-school', title: '教育程度', text: res.data.EduLevel },
                        { icon: 'mdi-ray-vertex', title: '是否複核', text: (res.data.isReview)? '已複核' : '未核定' },
                    ]
                    // 設定下面的欄位資料
                        let hh
                        if(res.data.HurtMediumLv1 == '' || res.data.HurtMediumLv1 == null){
                             hh = ''
                        }
                        else{
                            if(res.data.HurtMediumLv2 == '' || res.data.HurtMediumLv2 == null){
                                hh = ''
                            }else{
                                hh = vehicleOpts[res.data.HurtMediumLv1].find(item => item.value == res.data.HurtMediumLv2).text
                            }
                        }
                    let bottomItems = [
                        { dataType: 'text', oneline: true, icon: 'none', title: '本項工作經驗年數', text: res.data.WorkExp },
                        { dataType: 'text', oneline: true, icon: 'none', title: '本項工作訓練日期', text: res.data.TrainDate },
                        { dataType: 'text', oneline: true, icon: 'none', title: '罹災者住址', text: res.data.PeopleAddress },
                        { dataType: 'text', oneline: true, icon: 'none', title: '發生單位', text: res.data.PeopleDepart },
                        { dataType: 'text', oneline: true, icon: 'none', title: '發生日期', text: `${res.data.HappenDate} ${res.data.HappenDateHr}:${res.data.HappenDateMin}:00` },
                        { dataType: 'text', oneline: true, icon: 'none', title: '發生地點', text: res.data.HappenPlace },
                        { dataType: 'text', oneline: true, icon: 'none', title: '發生地點(緯度)', text: res.data.HappenPlaceLat },
                        { dataType: 'text', oneline: true, icon: 'none', title: '發生地點(經度)', text: res.data.HappenPlaceLong },
                        { dataType: 'text', oneline: true, icon: 'none', title: '氣候', text: res.data.Weather },
                        { dataType: 'text', oneline: true, icon: 'none', title: '事故類別', text: res.data.AccidentType },
                        { dataType: 'text', oneline: true, icon: 'none', title: '事故結果', text: res.data.AccidentResult },
                        // { dataType: 'text', oneline: true, icon: 'none', title: '傷害部位', text: injurySiteOpts.find(item => item.value == res.data.HurtPart).text },
                        { dataType: 'text', oneline: true, icon: 'none', title: '傷害部位', text: res.data.HurtPart },
                        { dataType: 'text', oneline: true, icon: 'none', title: '災害類型', text: disasterTypeOpts.find(item => item.value == res.data.DisasterType).text },
                        { dataType: 'text', oneline: true, icon: 'none', title: '致傷媒介物', text: hh },
                        { dataType: 'text', oneline: false, icon: 'none', title: '直接原因', text: (res.data.AccidentReason||"").replace(/\n/g, '<br>') },
                        { dataType: 'text', oneline: false, icon: 'none', title: '間接原因', text: (res.data.AccidentIndirect||"").replace(/\n/g, '<br>') },
                        { dataType: 'text', oneline: false, icon: 'none', title: '基本原因', text: (res.data.AccidentBase||"").replace(/\n/g, '<br>') },
                        { dataType: 'text', oneline: false, icon: 'none', title: '傷者當時工作', text: (res.data.HurtWorking||"").replace(/\n/g, '<br>') },
                        { dataType: 'text', oneline: false, icon: 'none', title: '事故概況', text: (res.data.AccidentDesp||"").replace(/\n/g, '<br>') },
                        { dataType: 'text', oneline: false, icon: 'none', title: '緊急處理情形', text: (res.data.EmergencyStatus||"").replace(/\n/g, '<br>') },
                        { dataType: 'text', oneline: false, icon: 'none', title: '事故單位防範及改善對策', text: (res.data.AccidentPolicy||"").replace(/\n/g, '<br>') },
                        { dataType: 'text', oneline: false, icon: 'none', title: '公傷假(起)', text: (res.data.HurtDateStart||"").replace(/\n/g, '<br>') },
                        { dataType: 'text', oneline: false, icon: 'none', title: '公傷假(迄)', text: (res.data.HurtDateEnd||"").replace(/\n/g, '<br>') },
                        { dataType: 'text', oneline: false, icon: 'none', title: '通報勞檢', text: (res.data.NoticeCheck||"").replace(/\n/g, '<br>') },
                        { dataType: 'text', oneline: false, icon: 'none', title: '發生原因', text: (res.data.HappenReason||"").replace(/\n/g, '<br>') },
                        { dataType: 'text', oneline: false, icon: 'none', title: '備註', text: (res.data.Memo||"").replace(/\n/g, '<br>') },
                        { dataType: 'text', oneline: false, icon: 'none', title: '改善措施', text: (res.data.ProcContent||"").replace(/\n/g, '<br>') },
                        { dataType: 'text', oneline: false, icon: 'none', title: '是否已鎖定', text: (res.data.LockStatus == 'F')?'未鎖定':'已鎖定' },
                    ]

                    // if (this.status > 1) {
                    //     bottomItems.push({ oneline: true, title: '公傷假', text: `${res.data.injuryLeaveStart} ~ ${res.data.injuryLeaveEnd}` })
                    //     bottomItems.push({ oneline: true, title: '通報勞檢', text: (res.data.laborInspection == 'y')? '有' : '無' })
                    //     bottomItems.push({ oneline: false, title: '發生原因', text: res.data.cause.replace(/\n/g, '<br>') })
                    //     bottomItems.push({ oneline: false, title: '備註', text: res.data.note.replace(/\n/g, '<br>') })
                    //     bottomItems.push({ oneline: false, title: '改善措施', text: res.data.improve.replace(/\n/g, '<br>') })
                    // }
                    this.itemData = { ...res.data, topItems, bottomItems }  // demo 用時 ...res.data 先改為 obj
                    }
                } else {
                    // 請求發生問題時(ErrorCode 不為 0 時)，重導至錯誤訊息頁面
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
            }).catch(err => {
                //console.log(err)
                alert('伺服器發生問題，資料讀取失敗')
            }).finally(() => {
                this.chLoadingShow({show:false})
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
            //     //console.log(err)
            //     alert('伺服器發生問題，資料讀取失敗')
            // }).finally(() => {
            //     this.chLoadingShow({show:true})
            // })

            // -------------- demo用資料 --------------
            
        },
    },
    created() {
        this.fetchData()
    }
}
</script>