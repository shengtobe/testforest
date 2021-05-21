<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">各大類事故事件趨勢圖</h2>
    
    <p class="label-warning">* 可點擊圖表上方色塊旁的名稱來隱藏該記錄</p>

    <!-- 圖表 -->
    <canvas ref="canvas" style="background-color: white;"
        v-show="show"
    ></canvas>

    <v-btn
        dark
        class="mr-4 my-8 btn-close"
        to="/smis/car-accident-event"
    >回搜尋頁</v-btn>
</v-container>
</template>

<script>
import Chart from 'chart.js'
import { canInUpdate } from '@/apis/access'
import { mapActions } from 'vuex'
import { MainTypeChartData } from '@/assets/js/smisTestData'

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
                this.createChart(MainTypeChartData)  // 繪製圖表
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
                            label: '重大事故',
                            backgroundColor: '#FFB300',  // 節點的顏色
                            borderColor: '#FFB300',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.major,
                        },
                        {
                            label: '一般事故',
                            backgroundColor: '#3949AB',  // 節點的顏色
                            borderColor: '#3949AB',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.general,
                        },
                        {
                            label: '異常事件',
                            backgroundColor: '#00E676',  // 節點的顏色
                            borderColor: '#00E676',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.abnormal,
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