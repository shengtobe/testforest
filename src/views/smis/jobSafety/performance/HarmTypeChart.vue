<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">職災傷害類型統計</h2>
    <v-row>
        <v-col>
            <dateSelect label="統計日期(起)" v-model="input.dateStart" key="dateStart" :showIcon="true"/>
        </v-col>
        <v-col>
            <dateSelect label="統計日期(訖)" v-model="input.dateEnd" key="dateStart" :showIcon="true"/>
        </v-col>
        <v-col>
            <v-btn
                dark
                class="my-8 btn-search"
                @click="getData"
            >查詢</v-btn>
        </v-col>
    </v-row>
    <p class="label-warning">* 此圖各數字的單位為「%」</p>

    <!-- 圖表 -->
    <!-- <canvas ref="canvas" style="background-color: white;"
        v-show="show"
    ></canvas> -->
    <chart v-if="chart.componentKey>1" :chartdata="chart.chartdata" :options="chart.options" :key="chart.componentKey"/>
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
        chart:{
            componentKey: 1,
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
            },
            chartdata:{
                labels: [],
                    datasets: [
                        {
                            backgroundColor: [],  // 節點的顏色
                            data: [],
                        },
                    ]
            }
        },
        input:{
            dateStart:'',
            dateEnd:''
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
        // 初始化資料
        initData() {
            const today = new Date
            this.input.dateEnd = today.getFullYear() + '-' + (today.getMonth()+1<10?'0':'') + (today.getMonth()+1) + '-' + today.getDate()
            this.getData()
        },
        getData() {
            this.chLoadingShow()
            analyDanger({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                CreateDTime_Start:this.input.dateStart,
                CreateDTime_End:this.input.dateEnd
            }).then(res=>{
                if (res.data.ErrorCode == 0) {
                    console.log(res.data.DataList)
                    res.data.DataList.forEach(e=>{
                        this.chart.chartdata.labels.push(e.Name)
                        this.chart.chartdata.datasets[0].backgroundColor.push(this.getRandomColor())
                        this.chart.chartdata.datasets[0].data.push(parseFloat(e.Value.replace(/'%'/g,'')))
                    })
                    this.chart.componentKey++
                }else{
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
                this.chLoadingShow()
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