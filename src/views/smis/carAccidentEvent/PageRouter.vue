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
import { mapState, mapActions } from 'vuex'
import { canInUpdate } from '@/apis/access'
import { getNowFullTime } from '@/assets/js/commonFun'
import { fetchOne, fetchEvtTypes } from '@/apis/smis/carAccidentEvent'
import { carAccidentEventStatus, evtTypes, locationOpts, AccidentFactors1, AccidentFactors2, AccidentFactors3 } from '@/assets/js/smisData'
import Show from '@/views/smis/carAccidentEvent/Show.vue'
import ReviewComplated from '@/views/smis/carAccidentEvent/ReviewComplated.vue'
import Fulfill from '@/views/smis/carAccidentEvent/Fulfill.vue'

export default {
    props: ['id'],  //路由參數
    data: () => ({
        itemData: {},  // 工單資料
        status: '',  // 狀態
    }),
    opsList: null, 
    components: {
        Show,
        ReviewComplated,
        Fulfill,
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
        fetchData() {
            this.chLoadingShow({show:true})

            // 初始化事故類型 fetchEvtTypes
            fetchEvtTypes({
                OperatorID: this.userData.UserId,  // 事故事件編號 (從路由參數抓取)
                ClientReqTime: getNowFullTime(),  // client 端請求時間
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    //抽離 其他
                    this.opsList = JSON.parse(res.data.order_list)
                } else {
                    // 請求發生問題時(ErrorCode 不為 0 時)，重導至錯誤訊息頁面
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
            }).catch(err => {
                console.log(err)
                alert('伺服器發生問題，事故類型讀取失敗')
            }).finally(() => {
                this.chLoadingShow({show:false})
            })

            fetchOne({
                AccidentCode: this.id,  // 事故事件編號 (從路由參數抓取)
                ClientReqTime: getNowFullTime(),  // client 端請求時間
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    if (res.data.DelStatus == 'T') {  // 若已刪除則轉404頁
                        this.$router.push({ path: '/404' })
                    } else {
                        console.log("Status: ", res.data.AccidentStatus);
                        this.status = res.data.AccidentStatus  // 狀態
                        let hurtPeoples = []  // 死傷人數資料
                        let controls = []  // 已選控制措施
                        
                        // 組合發生地點文字
                        let findLocationText = locationOpts.find(item => item.value == res.data.FindLine).text
                        
                        if (['l1', 'l2', 'l3', 'l4'].includes(res.data.FindLine)) {
                            findLocationText += ` (${res.data.FindKLine}K+${res.data.FindMLine}M)`  // 本線、祝山線、眠月線、水山線
                        } else if(res.data.FindLine == 'other') {
                            findLocationText += ` (${res.data.FindLineOther})`  // 其他地點
                        }

                        // 組合路段型態文字
                        let loadTypeArr = res.data.RoadType
                        let loadTypeOtherIdx = loadTypeArr.indexOf('其他')  // 確認是否有勾選其他，有的話找出其位置
                        if (loadTypeOtherIdx > -1) {
                            loadTypeArr.splice(loadTypeOtherIdx, 1)  // 移除原先的其他
                            loadTypeArr.push(`其他${(res.data.RoadTypeElse == '')? '' : ' (' + res.data.RoadTypeElse + ')'}`)  // 把其他及填寫的欄位加進去
                        }
                        let loadTypeText = loadTypeArr.join('、')

                        // 組合周邊環境文字
                        let aroundEnvArr = res.data.Surround
                        let aroundEnvOtherIdx = aroundEnvArr.indexOf('其他')  // 確認是否有勾選其他，有的話找出其位置
                        if (aroundEnvOtherIdx > -1) {
                            aroundEnvArr.splice(aroundEnvOtherIdx, 1)  // 移除原先的其他
                            aroundEnvArr.push(`其他${(res.data.SurroundElse == '')? '' : ' (' + res.data.SurroundElse + ')'}`)  // 把其他及填寫的欄位加進去
                        }
                        let aroundEnvText = aroundEnvArr.join('、')

                        // 組合鐵路設施設備及圍籬之設置
                        let fenceEqArr = res.data.RailwayDevice
                        let fenceEqOtherIdx = fenceEqArr.indexOf('其他')  // 確認是否有勾選其他，有的話找出其位置
                        if (fenceEqOtherIdx > -1) {
                            fenceEqArr.splice(fenceEqOtherIdx, 1)  // 移除原先的其他
                            fenceEqArr.push(`其他${(res.data.RailwayDeviceElse == '')? '' : ' (' + res.data.RailwayDeviceElse + ')'}`)  // 把其他及填寫的欄位加進去
                        }
                        let fenceEqText = fenceEqArr.join('、')

                        let topItems = [  // 上面的欄位
                            { icon: 'mdi-ray-vertex', title: '事故事件狀態', text: carAccidentEventStatus.find(ele => ele.value == res.data.AccidentStatus).text },
                            { icon: 'mdi-calendar-text', title: '發生日期', text: res.data.FindDDate },
                            { icon: 'mdi-cloud-outline', title: '天候', text: res.data.EventWeather },
                            { icon: 'mdi-snowflake', title: '事故類型', text: this.opsList.find(item => item.value == res.data.AccidentType).text.replace('率', '') },
                            { icon: 'mdi-stairs', title: '路線坡度', text: res.data.RoadSlope },
                            { icon: 'mdi-image-filter-tilt-shift', title: '曲線半徑', text: res.data.CurveRadius },
                            { icon: 'mdi-alert', title: '事發速限', text: res.data.IncidentLimit },
                            { icon: 'mdi-speedometer', title: '事發車速', text: res.data.IncidentSpeed },
                        ]

                        // 設定下面的欄位資料
                        let bottomItems = [
                            { dataType: 'text', oneline: true, icon: 'mdi-tag', title: '事故摘要', text: res.data.ReportTitle },
                            { dataType: 'text', oneline: true, icon: 'mdi-map-marker', title: '發生地點', text: findLocationText },
                            { dataType: 'text', oneline: true, icon: 'mdi-cellphone-link-off', title: '設備受損情形', text: res.data.DeviceLost },
                            { dataType: 'text', oneline: true, icon: 'mdi-alert-decagram', title: '運轉影響情形', text: res.data.OperationLost },
                            { dataType: 'text', oneline: true, icon: 'mdi-snowflake', title: '第一層因素', text: AccidentFactors1.find(item => item.value == res.data.SaftyCodeLv1).text },
                            { dataType: 'text', oneline: true, icon: 'mdi-snowflake', title: '第二層因素', text: AccidentFactors2.find(item => item.value == res.data.SaftyCodeLv2).text },
                            { dataType: 'text', oneline: true, icon: 'mdi-snowflake', title: '第三層因素', text: AccidentFactors3.find(item => item.value == res.data.SaftyCodeLv3).text },
                            { dataType: 'text', oneline: false, icon: 'mdi-file-document', title: '原因分析', text: res.data.CauseAnaly.replace(/\n/g, '<br>') },
                            { dataType: 'text', oneline: false, icon: 'mdi-file-document', title: '檢討過程', text: res.data.ReviewProcess.replace(/\n/g, '<br>') },
                            { dataType: 'text', oneline: false, icon: 'mdi-file-document', title: '備註說明', text: res.data.RemarkDesp.replace(/\n/g, '<br>') },
                        ]

                        // 設定其他資訊的資料
                        let otherInfo = [
                            { oneline: true, title: '路段型態', text: loadTypeText },
                            { oneline: true, title: '周邊環境', text: aroundEnvText },
                            { oneline: true, title: '鐵路設施設備及圍籬之設置', text: fenceEqText },
                            { oneline: false, title: '列車運行計劃及運轉情形', text: res.data.CarOperation.replace(/\n/g, '<br>') },
                            { oneline: false, title: '關係者之職務、資歷、操作情形及訪談紀要', text: res.data.TalkSituation.replace(/\n/g, '<br>') },
                            { oneline: false, title: '現場作業規定與落實情形', text: res.data.OnsiteSituation.replace(/\n/g, '<br>') },
                            { oneline: false, title: '事故設施設備或車輛之型式、功能運作、檢修養護及後續檢測情形', text: res.data.CarFollowUp.replace(/\n/g, '<br>') },
                            { oneline: false, title: '現場相關量測', text: res.data.OnsiteMeasure.replace(/\n/g, '<br>') },
                            { oneline: false, title: '天然災害偵測資訊', text: res.data.NaturalInfo.replace(/\n/g, '<br>') },
                            { oneline: false, title: '民眾或旅客行為說明', text: res.data.PeopleMemo.replace(/\n/g, '<br>') },
                        ]
                        
                        if (this.status > 1) {
                            hurtPeoples = JSON.parse(res.data.order_list_hurt_people)  // 死傷人數資料
                            controls = JSON.parse(res.data.order_list)  // 已選控制措施
                        }
                        this.itemData = { ...res.data, topItems, bottomItems, otherInfo, hurtPeoples, controls }
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