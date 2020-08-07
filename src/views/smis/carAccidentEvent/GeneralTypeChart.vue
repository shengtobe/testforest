<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">一般事故類事故事件趨勢圖</h2>
    
    <p class="error--text">* 可點擊圖表上方色塊旁的名稱來隱藏該記錄</p>

    <!-- 圖表 -->
    <canvas ref="canvas" style="background-color: white;"
        v-show="show"
    ></canvas>

    <v-btn
        dark
        class="mr-4 my-8"
        to="/smis/car-accident-event"
    >回搜尋頁</v-btn>
</v-container>
</template>

<script>
import Chart from 'chart.js'
import { mapActions } from 'vuex'
import { GeneralTypeChartData } from '@/assets/js/smisTestData'

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
                this.createChart(GeneralTypeChartData)  // 繪製圖表
                this.show = true
                this.chLoadingShow()
            }, 1000)
        },
        // 繪製圖表
        createChart(data) {
            let ctx = this.$refs.canvas
            let myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.labels,
                    datasets: [
                        {
                            label: '側線衝撞事故',
                            backgroundColor: '#9C27B0',  // 節點的顏色
                            borderColor: '#9C27B0',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.g1,
                        },
                        {
                            label: '側線出軌事故',
                            backgroundColor: '#26A69A',  // 節點的顏色
                            borderColor: '#26A69A',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.g2,
                        },
                        {
                            label: '側線火災事故',
                            backgroundColor: '#E91E63',  // 節點的顏色
                            borderColor: '#E91E63',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.g3,
                        },
                        {
                            label: '平交道事故',
                            backgroundColor: '#FFB300',  // 節點的顏色
                            borderColor: '#FFB300',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.g4,
                        },
                        {
                            label: '人員死傷事故',
                            backgroundColor: '#00E676',  // 節點的顏色
                            borderColor: '#00E676',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.g5,
                        },
                        {
                            label: '設備損害事故',
                            backgroundColor: '#3949AB',  // 節點的顏色
                            borderColor: '#3949AB',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.g6,
                        },
                        {
                            label: '運轉中斷事故',
                            backgroundColor: '#6D4C41',  // 節點的顏色
                            borderColor: '#6D4C41',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.g7,
                        },
                    ]
                },
                options: {
                    scales: {  // 側邊訊息
                        yAxes: [{
                            ticks: {
                                beginAtZero: true  // y 軸最小數字從 0 開始
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
                    }
                }
            })
        },
    },
    mounted() {
        this.initData()
    },
}
</script>