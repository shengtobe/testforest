<template>
<v-container style="max-width: 1200px">
    <v-row>
        <v-col>
            <h2 class="mb-4 label-title">立案類型統計圖</h2>
            
            <p class="error--text">* 可點擊圖表上方色塊旁的名稱來隱藏該記錄</p>
        </v-col>
    </v-row>
    <v-row>
        <!-- 圖表 -->
        <v-col class="white">
            <ChartLine :options="chart.options" :chartdata="chart.data" :key="chart.componentKey"/>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-btn
                dark
                class="mr-4 my-8 btn-close"
                to="/smis/harmnotify/audit"
            >回搜尋頁</v-btn>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ChartLine from '@/components/chartLine'
import { analysis1 } from '@/apis/smis/harmNotify'
import { getNowFullTime } from '@/assets/js/commonFun'

export default {
    data: () => ({
        show: false,  // canvas 是否隱藏(在還沒有資料時會變小)
        chart: {
            componentKey: 0,
            options: {
                scales: {  // 側邊訊息
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,  // y 軸最小數字從 0 開始
                            stepSize: 1
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
            },
            data: {
                labels: [],
                datasets: [
                    {
                        label: '行車危害資料次數',
                        backgroundColor: '',  // 節點的顏色
                        borderColor: '',  // 線的顏色
                        fill: false,  // 不要有下方填滿
                        data: [],
                    },
                    {
                        label: '行車事故事件次數',
                        backgroundColor: '',  // 節點的顏色
                        borderColor: '',  // 線的顏色
                        fill: false,  // 不要有下方填滿
                        data: [],
                    },
                    {
                        label: '職業危害資料次數',
                        backgroundColor: '',  // 節點的顏色
                        borderColor: '',  // 線的顏色
                        fill: false,  // 不要有下方填滿
                        data: [],
                    },
                    {
                        label: '職業事故事件次數',
                        backgroundColor: '',  // 節點的顏色
                        borderColor: '',  // 線的顏色
                        fill: false,  // 不要有下方填滿
                        data: [],
                    },
                ]
            },

        }
    }),
    components:{
        ChartLine
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
        ]),
        // 初始化資料
        initData() {
            const that = this
            this.chLoadingShow({show:true})
            analysis1({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res=>{
                if (res.data.ErrorCode == 0) {
                    let DataList = res.data.EndangerDataList
                    let CountList = [[],[],[],[]]
                    for( let Data of DataList ) {
                        that.chart.data.labels.push(Data.YM)
                        CountList[0].push(Data.AccidentCount)
                        CountList[1].push(Data.EndangerCount)
                        CountList[2].push(Data.ProAccidentCount)
                        CountList[3].push(Data.ProEndangerCount)
                    }
                    CountList.forEach((e,i)=>{
                        that.chart.data.datasets[i].data = e
                        let randColor = that.getRandomColor()
                        that.chart.data.datasets[i].backgroundColor = randColor
                        that.chart.data.datasets[i].borderColor = randColor
                    })
                    this.chart.componentKey ++
                } else {
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
            }).catch( err => {
                this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
            }).finally(()=>{
                this.chLoadingShow({show:false})
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