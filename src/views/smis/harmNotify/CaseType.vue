<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">立案類型統計圖</h2>
    
    <p class="error--text">* 可點擊圖表上方色塊旁的名稱來隱藏該記錄</p>

    <!-- 圖表 -->
    <canvas ref="canvas" style="background-color: white;"
        v-show="show"
    ></canvas>

    <v-btn
        dark
        class="mr-4 my-8"
        to="/smis/harmnotify/audit"
    >回搜尋頁</v-btn>
</v-container>
</template>

<script>
import Chart from 'chart.js'
import { mapActions } from 'vuex'
import { caseTypeChartData } from '@/assets/js/smisTestData'

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
                this.createChart(caseTypeChartData)  // 繪製圖表
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
                            label: '以行車事故事件立案(新登錄)',
                            backgroundColor: '#FFB300',  // 節點的顏色
                            borderColor: '#FFB300',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.c1,
                        },
                        {
                            label: '以行車事故事件立案(已登錄)',
                            backgroundColor: '#00E676',  // 節點的顏色
                            borderColor: '#00E676',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.c2,
                        },
                        {
                            label: '以行車危害立案(新登錄)',
                            backgroundColor: '#FF4081',  // 節點的顏色
                            borderColor: '#FF4081',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.c3,
                        },
                        {
                            label: '以行車危害立案(已登錄)',
                            backgroundColor: '#E040FB',  // 節點的顏色
                            borderColor: '#E040FB',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.c4,
                        },
                        {
                            label: '以職災事故事件立案(新登錄)',
                            backgroundColor: '#3949AB',  // 節點的顏色
                            borderColor: '#3949AB',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.c5,
                        },
                        {
                            label: '以職災事故事件立案(已登錄)',
                            backgroundColor: '#00796B',  // 節點的顏色
                            borderColor: '#00796B',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.c6,
                        },
                        {
                            label: '以職災危害立案(新登錄)',
                            backgroundColor: '#F4511E',  // 節點的顏色
                            borderColor: '#F4511E',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.c7,
                        },
                        {
                            label: '以職災危害立案(已登錄)',
                            backgroundColor: '#5D4037',  // 節點的顏色
                            borderColor: '#5D4037',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.c8,
                        },
                        {
                            label: '不立案',
                            backgroundColor: '#29B6F6',  // 節點的顏色
                            borderColor: '#29B6F6',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.c9,
                        },
                        {
                            label: '未立案',
                            backgroundColor: '#CDDC39',  // 節點的顏色
                            borderColor: '#CDDC39',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.c10,
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