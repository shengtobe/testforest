<template>
<div>
    <!-- 已立案 -->
    <Show :itemData="itemData" v-if="status == 1" />

    <!-- 審核中、已完備資料 -->
    <ReviewComplated :itemData="itemData" v-if="status == 2 || status == 3" />

    <!-- 審核中、風險已可接受 -->
    <Fulfill :itemData="itemData" v-if="status == 4 || status == 5" />

    <!-- 審核中(審核更新) -->
    <UpdateReview :itemData="itemData" v-if="status == 6" />
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { fetchOne } from '@/apis/smis/carHarmDatabase/harms'
import { fetchList } from '@/apis/smis/carHarmDatabase/controlMeasures'
import { getNowFullTime } from '@/assets/js/commonFun'
import { carHarmDbStatus, evtTypes, operateModes, riskSerious, riskFrequency } from '@/assets/js/smisData'
import { departOptions } from '@/assets/js/departOption'
import Show from '@/views/smis/carHarmDatabase/harms/Show.vue'
import ReviewComplated from '@/views/smis/carHarmDatabase/harms/ReviewComplated.vue'
import Fulfill from '@/views/smis/carHarmDatabase/harms/Fulfill.vue'
import UpdateReview from '@/views/smis/carHarmDatabase/harms/UpdateReview.vue'

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
        UpdateReview,
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
    methods: {
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 向後端取資料
        async fetchData() {
            this.chLoadingShow()
            let res = {}  // 危害資料
            let controls = {}  // 控制措施資料

            // 向後端查詢危害資料
            try {
                res = await fetchOne({
                    EndangerCode: this.id,  // 工單編號 (從路由參數抓取)
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                })
            } catch (err) {
                alert('查詢危害資料時發生問題')
            }

            // 若請求發生問題則轉頁
            if (res.data.ErrorCode == 0) {
                if (res.data.DelStatus == 'T') {  // 若已刪除則轉404頁
                    this.$router.push({ path: '/404' })
                }
            } else {
                // 請求發生問題時(ErrorCode 不為 0 時)，重導至錯誤訊息頁面
                sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                this.$router.push({ path: '/error' })
            }

            // 向後端查詢控制措施的資料
            try {
                controls = await fetchList({
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                    KeyName: 'SMS_EndangerProc',  // DB table
                    KeyItem: [
                        { tableColumn: 'ProcCode', columnValue: res.data.ProcCount[0].ProcCode },  // 控制措施編號
                    ],
                    QyName: [    // 欲回傳的欄位資料
                        'PolicyCode',
                        'ProcCode',
                        'DeviceTitle',
                        'DeviceDesp',
                        'DeviceDepart',
                        'UpdateDTime',
                        'Remark',
                    ],
                }) 
                controls = JSON.parse(controls.data.order_list)
            } catch (err) {
                alert('查詢控制措施資料時發生問題')
            }

            this.status = res.data.EndangerStatus  // 狀態
            
            // 組合影響、運轉影響情形字串
            let affectsArr = []
            if (res.data.EffectTraveler == 'T') affectsArr.push('影響旅客')
            if (res.data.EffectEmploy == 'T') affectsArr.push('影響員工')
            if (res.data.EffectPeople == 'T') affectsArr.push('影響大眾')
            if (res.data.ServiceCarError == 'T') affectsArr.push('列車誤點')
            if (res.data.ServiceStopError == 'T') affectsArr.push('中斷營運')

            // 組合衍生事故字串
            let accidentsTxt = '<lu>'
            res.data.DeriveAccident.forEach(item => {
                accidentsTxt += `<li>${evtTypes.find(ele => ele.value == item).text}</li>`
            })
            accidentsTxt += '</lu>'

            let topItems = [  // 上面的欄位
                { icon: 'mdi-ray-vertex', title: '危害狀態', text: carHarmDbStatus.find(ele => ele.value == res.data.EndangerStatus).text },
                { icon: 'mdi-bank', title: '權責單位', text: departOptions.find(ele => ele.value == res.data.EndangerDepart).text },
                { icon: 'mdi-snowflake', title: '營運模式', text: operateModes.find(ele => ele.value == res.data.OperationMode).text },
                { icon: 'mdi-source-branch', title: '關聯子系統', text: res.data.ConnectWBS },
                { icon: 'mdi-format-line-spacing', title: '風險嚴重性', text: riskSerious.find(ele => ele.value == res.data.RiskSerious).text },
                { icon: 'mdi-signal-variant', title: '風險頻率', text: riskFrequency.find(ele => ele.value == res.data.RiskFreq).text },
                { icon: 'mdi-elevation-rise', title: '風險等級', text: res.data.RiskLevel },
            ]

            // 設定下面的欄位資料
            let bottomItems = [
                { dataType: 'text', oneline: false, icon: 'none', title: '危害說明', text: res.data.EndangerDesp.replace(/\n/g, '<br>') },
                { dataType: 'text', oneline: false, icon: 'none', title: '直接成因', text: res.data.EndangerReason.replace(/\n/g, '<br>') },
                { dataType: 'text', oneline: false, icon: 'none', title: '可能的間接原因', text: res.data.EndangerIndirect.replace(/\n/g, '<br>') },
                { dataType: 'text', oneline: false, icon: 'none', title: '備註', text: res.data.Remark.replace(/\n/g, '<br>') },
                { dataType: 'text', oneline: true, icon: 'none', title: '影響、運轉影響情形', text: affectsArr.join('、') },
                { dataType: 'text', oneline: false, icon: 'none', title: '衍生事故', text: accidentsTxt },
            ]

            


            // status 6 的審核更新，會使用二筆資料用來做比對，所以要另外處理

            this.itemData = { ...res.data, topItems, bottomItems, controls }
            this.chLoadingShow()
        },
    },
    created() {
        this.fetchData()
    }
}
</script>