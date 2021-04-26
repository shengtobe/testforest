<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">科室職災事故統計</h2>

    <v-row class="px-2 mb-8">
        <v-col cols="12" md="6">
            <canvas ref="canvas1" style="background-color: white;"
                v-show="show"
            ></canvas>
        </v-col>

        <v-col cols="12" md="6">
            <canvas ref="canvas2" style="background-color: white;"
                v-show="show"
            ></canvas>
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
import { mapActions } from 'vuex'
import { departAccidentChartData } from '@/assets/js/smisTestData'

export default {
    data: () => ({
        show: false,  // canvas 是否隱藏(在還沒有資料時會變小)
    }),
    methods: {
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 初始化資料
        initData() {
            this.chLoadingShow()

            // 測試用資料
            setTimeout(() => {
                // 向後端取得資料後
                this.createChart(departAccidentChartData)  // 繪製圖表
                this.show = true
                this.chLoadingShow()
            }, 1000)
        },
        // 繪製圖表
        createChart(data) {
            let ctx1 = this.$refs.canvas1
            let myChart1 = new Chart(ctx1, {
                type: 'bar',
                data: {
                    labels: data.labels,
                    datasets: [
                        {
                            backgroundColor: '#00e00a',  // 顏色
                            data: data.counter,
                            barPercentage: 0.5,
                            fill: 20,
                        },
                    ]

                },
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
                                max: Math.max(...data.counter)+2,  // y 軸最大數為資料的最大數+2
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
                }
            })

            // 損失日數
            let ctx2 = this.$refs.canvas2
            let myChart2 = new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: data.labels,
                    datasets: [
                        {
                            backgroundColor: '#8a98ff',  // 顏色
                            data: data.loss,
                            barPercentage: 0.5,
                            fill: 20,
                        },
                    ]

                },
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
                                max: Math.max(...data.loss)+10,  // y 軸最大數為資料的最大數+2
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
                }
            })
        },
    },
    mounted() {
        this.initData()
    },
}
</script>