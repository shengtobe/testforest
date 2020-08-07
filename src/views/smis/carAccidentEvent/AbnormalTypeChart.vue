<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">各大類事故事件趨勢圖</h2>
    
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
import { AbnormalTypeChartData } from '@/assets/js/smisTestData'

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
                this.createChart(AbnormalTypeChartData)  // 繪製圖表
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
                            label: '列車或車輛分離',
                            backgroundColor: '#FFB300',  // 節點的顏色
                            borderColor: '#FFB300',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.a1,
                        },
                        {
                            label: '進入錯線',
                            backgroundColor: '#3949AB',  // 節點的顏色
                            borderColor: '#3949AB',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.a2,
                        },
                        {
                            label: '冒進號誌',
                            backgroundColor: '#00E676',  // 節點的顏色
                            borderColor: '#00E676',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.a3,
                        },
                        {
                            label: '列車或車輛溜逸',
                            backgroundColor: '#E91E63',  // 節點的顏色
                            borderColor: '#E91E63',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.a4,
                        },
                        {
                            label: '違反閉塞運轉',
                            backgroundColor: '#9C27B0',  // 節點的顏色
                            borderColor: '#9C27B0',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.a5,
                        },
                        {
                            label: '違反號誌運轉',
                            backgroundColor: '#FFC107',  // 節點的顏色
                            borderColor: '#FFC107',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.a6,
                        },
                        {
                            label: '號誌處理錯誤',
                            backgroundColor: '#795548',  // 節點的顏色
                            borderColor: '#795548',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.a7,
                        },
                        {
                            label: '車輛故障',
                            backgroundColor: '#607D8B',  // 節點的顏色
                            borderColor: '#607D8B',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.a8,
                        },
                        {
                            label: '路線障礙',
                            backgroundColor: '#FF3D00',  // 節點的顏色
                            borderColor: '#FF3D00',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.a9,
                        },
                        {
                            label: '電子設備故障',
                            backgroundColor: '#1B5E20',  // 節點的顏色
                            borderColor: '#1B5E20',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.a10,
                        },
                        {
                            label: '運轉保安裝置故障',
                            backgroundColor: '#29B6F6',  // 節點的顏色
                            borderColor: '#29B6F6',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.a11,
                        },
                        {
                            label: '外物入侵',
                            backgroundColor: '#009688',  // 節點的顏色
                            borderColor: '#009688',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.a12,
                        },
                        {
                            label: '危險品洩漏',
                            backgroundColor: '#B388FF',  // 節點的顏色
                            borderColor: '#B388FF',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.a13,
                        },
                        {
                            label: '駕駛失能',
                            backgroundColor: '#FF80AB',  // 節點的顏色
                            borderColor: '#FF80AB',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.a14,
                        },
                        {
                            label: '天然災變',
                            backgroundColor: '#673AB7',  // 節點的顏色
                            borderColor: '#673AB7',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.a15,
                        },
                        {
                            label: '列車取消',
                            backgroundColor: '#CDDC39',  // 節點的顏色
                            borderColor: '#CDDC39',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.a16,
                        },
                        {
                            label: '其他事件',
                            backgroundColor: '#FFE0B2',  // 節點的顏色
                            borderColor: '#FFE0B2',  // 線的顏色
                            fill: false,  // 不要有下方填滿
                            data: data.a17,
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