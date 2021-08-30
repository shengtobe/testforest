<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">科室職災事故統計</h2>
    <v-row>
        <v-col>
            <dateSelect label="統計日期(起)" :max="dateAMax" @cleanEvent="timeAClean" @inputEvent="timeA" v-model="input.dateStart" key="dateStart" :showIcon="true"/>
        </v-col>
        <v-col>
            <dateSelect label="統計日期(訖)" :min="dateBMin" @cleanEvent="timeBClean" @inputEvent="timeB" v-model="input.dateEnd" key="dateStart" :showIcon="true"/>
        </v-col>
        <v-col>
            <v-btn
                dark
                class="my-8 btn-search"
                @click="getData"
            >查詢</v-btn>
        </v-col>
    </v-row>
    <v-row >
        <v-col class="mt-n9 "><v-checkbox
            v-model="includTraf"
            label="包含交通"
            @change="getData"
        ></v-checkbox></v-col>
    </v-row>
    <v-row class="px-2 mb-8">
        <v-col cols="12" md="6">
            <chart v-if="chartLeft.componentKey>1" :chartdata="chartLeft.chartdata" :options="chartLeft.options" :key="chartLeft.componentKey"/>
        </v-col>

        <v-col cols="12" md="6">
            <chart v-if="chartRight.componentKey>1" :chartdata="chartRight.chartdata" :options="chartRight.options" :key="chartRight.componentKey"/>
        </v-col>

        <v-col cols="12">
            <v-btn dark class="btn-close"
                to="/smis/jobsafety/performance"
            >回上層</v-btn>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import Chart from 'chart.js'
import { mapState, mapActions } from 'vuex'
import { departAccidentChartData } from '@/assets/js/smisTestData'
import dateSelect from '@/components/forManage/dateSelect2'
import chart from '@/components/chartBar'
import { analyDangerByDepart } from '@/apis/smis/jobSafety'
import { getNowFullTime } from '@/assets/js/commonFun'
export default {
    data: () => ({
        includTraf: true,
        show: false,  // canvas 是否隱藏(在還沒有資料時會變小)
        dateAMax: new Date().toISOString().substr(0, 10),
        dateBMin: '',
        input:{
            dateStart:'',
            dateEnd:''
        },
        chartLeft:{
            componentKey: 1,
            options: {
                title: {  // 標題
                    display: true,
                    text: '件數',
                    fontSize: 16,
                },
                scales: {  // 側邊訊息
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,  // y 軸最小數字從 0 開始
                            // max: Math.max(...data.counter)+2,  // y 軸最大數為資料的最大數+2
                        }
                    }]
                },
                layout: {
                    padding: {
                        left: 15,
                        right: 20,
                        top: 20,
                        bottom: 20,
                    }
                },
                legend: {  // 上方的題示小色塊(又稱圖例，在 title 下方)
                    display: false,  // 隱藏
                },
                tooltips: {  // 圖表上的資訊題示
                    intersect: false,  // 滑鼠移到 x 軸上就顯示
                },  
                responsive: true,
                maintainAspectRatio: false
            },
            chartdata:{
                labels: [],
                datasets: [
                    {
                        backgroundColor: [],  // 節點的顏色
                        data: [],
                        barPercentage: 0.5,
                        fill: 20,
                    },
                ]
            }
        },
        chartRight:{
            componentKey: 1,
            options: {
                title: {  // 標題
                    display: true,
                    text: '損失日數(公傷假)',
                    fontSize: 16,
                },
                scales: {  // 側邊訊息
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,  // y 軸最小數字從 0 開始
                            // max: Math.max(...data.counter)+2,  // y 軸最大數為資料的最大數+2
                        }
                    }]
                },
                layout: {
                    padding: {
                        left: 15,
                        right: 20,
                        top: 20,
                        bottom: 20,
                    }
                },
                legend: {  // 上方的題示小色塊(又稱圖例，在 title 下方)
                    display: false,  // 隱藏
                },
                tooltips: {  // 圖表上的資訊題示
                    intersect: false,  // 滑鼠移到 x 軸上就顯示
                },
                responsive: true,
                maintainAspectRatio: false  
            },
            chartdata:{
                labels: [],
                datasets: [
                    {
                        backgroundColor: [],  // 節點的顏色
                        data: [],
                        barPercentage: 0.5,
                        fill: 20,
                    },
                ]
            }
        },
    }),
    components:{
        dateSelect,
        chart
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'chViewDialog',  // 檢視內容 dialog
        ]),
        timeA(){
            this.$nextTick(() => {
                this.dateBMin = this.input.dateStart
            })
        },
        timeAClean(){
            this.dateBMin = ''
        },
        timeB(){
            this.$nextTick(() => {
                this.dateAMax = this.input.dateEnd
            })
        },
        timeBClean(){
            this.dateAMax = ''
        },
        // 初始化資料
        initData() {
            const today = new Date
            this.input.dateEnd = today.getFullYear() + '-' + (today.getMonth()+1<10?'0':'') + (today.getMonth()+1) + '-' + today.getDate()
            this.getData()
        },
        getData() {
            this.chLoadingShow({show:true})
            let mode = (this.includTraf)?'1':'2'
            analyDangerByDepart({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                CreateDTime_Start:this.input.dateStart,
                CreateDTime_End:this.input.dateEnd,
                Mode:mode
            }).then(res=>{
                if (res.data.ErrorCode == 0) {
                    console.log(res.data)
                    if(res.data.SumCount){
                        this.chartLeft.chartdata.labels = [...[]]
                        this.chartLeft.chartdata.datasets[0].backgroundColor = [...[]]
                        this.chartLeft.chartdata.datasets[0].data = [...[]]
                        this.chartLeft.chartdata.datasets[0].count = [...[]]
                        res.data.SumCount.forEach(e=>{
                            this.chartLeft.chartdata.labels.push(e.DepName)
                            this.chartLeft.chartdata.datasets[0].backgroundColor.push(this.getRandomColor())
                            this.chartLeft.chartdata.datasets[0].data.push(e.Count)
                        })
                        this.chartLeft.options.scales.yAxes[0].ticks.max = Math.max(...this.chartLeft.chartdata.datasets[0].data)+2
                        this.chartLeft.componentKey++
                    }
                    if(res.data.DayCount){
                        this.chartRight.chartdata.labels = [...[]]
                        this.chartRight.chartdata.datasets[0].backgroundColor = [...[]]
                        this.chartRight.chartdata.datasets[0].data = [...[]]
                        this.chartRight.chartdata.datasets[0].count = [...[]]
                        res.data.DayCount.forEach(e=>{
                            this.chartRight.chartdata.labels.push(e.DepName)
                            this.chartRight.chartdata.datasets[0].backgroundColor.push(this.getRandomColor())
                            this.chartRight.chartdata.datasets[0].data.push(e.Count)
                        })
                        this.chartRight.options.scales.yAxes[0].ticks.max = Math.max(...this.chartRight.chartdata.datasets[0].data)+2
                        this.chartRight.componentKey++
                    }
                }else{
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
                this.chLoadingShow({show:false})
            }).catch( err => {
                console.error(err)
                this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
            })
        },
        getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    },
    mounted() {
        this.initData()
    },
}
</script>