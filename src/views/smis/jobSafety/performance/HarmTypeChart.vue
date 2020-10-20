<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">職災傷害類型統計</h2>
    
    <p class="error--text">* 此圖各數字的單位為「%」</p>

    <!-- 圖表 -->
    <canvas ref="canvas" style="background-color: white;"
        v-show="show"
    ></canvas>

    <v-btn
        dark
        class="my-8"
        to="/smis/jobsafety/performance"
    >回上層</v-btn>
</v-container>
</template>

<script>
import Chart from 'chart.js'
import { mapActions } from 'vuex'
import { harmTypeChartData } from '@/assets/js/smisTestData'

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
                this.createChart(harmTypeChartData)  // 繪製圖表
                this.show = true
                this.chLoadingShow()
            }, 1000)
        },
        // 繪製圖表
        createChart(data) {
            let ctx = this.$refs.canvas
            let myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: data.labels,
                    datasets: [
                        {
                            backgroundColor: ['#EC407A', '#039BE5', '#FFB300', '#00f03f'],  // 節點的顏色
                            data: data.data,
                        },
                    ]
                },
                options: {
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
                    legend: {  // 上方的題示小色塊(又稱圖例，在 title 下方)
                        
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