<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">職災傷害類型統計</h2>
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
    <p class="label-warning">* 此圖各數字的單位為「%」</p>

    <!-- 圖表 -->
    <!-- <canvas ref="canvas" style="background-color: white;"
        v-show="show"
    ></canvas> -->
    <v-row >
        <v-col cols="12" sm="3"/>
        <v-col cols="12" sm="4">
            <chart v-if="chart.componentKey>1" :chartdata="chart.chartdata" :options="chart.options" :key="chart.componentKey"/>
        </v-col>
        <v-col cols="12" sm="4"/>
    </v-row>
    <v-btn
        dark
        class="my-8 btn-close"
        to="/smis/jobsafety/performance"
    >回上層</v-btn>
</v-container>
</template>

<script>
import Chart from 'chart.js'
import { mapState,mapActions } from 'vuex'
import { harmTypeChartData } from '@/assets/js/smisTestData'
import { analyDanger } from '@/apis/smis/jobSafety'
import dateSelect from '@/components/forManage/dateSelect2'
import chart from '@/components/chartPie'
import { getNowFullTime } from '@/assets/js/commonFun'
export default {
    data: () => ({
        show: false,  // canvas 是否隱藏(在還沒有資料時會變小)
        includTraf: true,
        dateAMax: new Date().toISOString().substr(0, 10),
        dateBMin: '',
        chart:{
            componentKey: 1,
            options: {
                legend: {  // 上方的題示小色塊(又稱圖例，在 title 下方)
                        // display: true,
                        labels: {
                        // This more specific font property overrides the global property
                            fontSize: 18
                        }
                    },
                scales: {  // 側邊訊息
                    yAxes: [{
                        display: false,  // 不顯示 Y 軸
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
                plugins:{
                    datalabels: {
                        labels: {
                            value: {
                                font: {
                                    size: 18
                                }
                            },
                        }
                    }
                },
                // legend: {  // 上方的題示小色塊(又稱圖例，在 title 下方)
                // },
                tooltips: {  // 圖表上的資訊題示
                    intersect: false,  // 滑鼠移到 x 軸上就顯示
                    callbacks: {
                        label: function(tooltipItem, data) {
                            var label = data.labels[tooltipItem.index] || '';

                            if (label) {
                                label += ': ';
                            }
                            label += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]+'%';
                            label += '\n 件數: '+data.datasets[tooltipItem.datasetIndex].count[tooltipItem.index]+'件'
                            return label;
                        }
                    }
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
                        count: [],
                    },
                ]
            }
        },
        input:{
            dateStart:'',
            dateEnd: new Date().toISOString().substr(0, 10)
        } 
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
            analyDanger({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                CreateDTime_Start:this.input.dateStart,
                CreateDTime_End:this.input.dateEnd,
                Mode:mode
            }).then(res=>{
                if (res.data.ErrorCode == 0) {
                    this.chart.chartdata.labels = [...[]]
                    this.chart.chartdata.datasets[0].backgroundColor = [...[]]
                    this.chart.chartdata.datasets[0].data = [...[]]
                    this.chart.chartdata.datasets[0].count = [...[]]
                    // this.chart = this.initChart
                    res.data.DataList.forEach(e=>{
                        this.chart.chartdata.labels.push(e.Name)
                        this.chart.chartdata.datasets[0].backgroundColor.push(this.getRandomColor())
                        this.chart.chartdata.datasets[0].data.push(parseFloat(e.Value.replace(/'%'/g,'')))
                        this.chart.chartdata.datasets[0].count.push(e.Count)
                    })
                    this.chart.componentKey++
                }else{
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
                this.chLoadingShow({show:false})
            }).catch( err => {
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