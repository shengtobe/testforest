<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">職災危害編號：{{ code1 }}-{{ code2 }}-{{ code3 }}</h2>

    <v-row no-gutters class="mt-8">
        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 px-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">作業名稱</span>
                </v-col>

                <v-col class="white pa-3">{{ name }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 px-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">操作工作內容</span>
                </v-col>

                <v-col class="white pa-3">{{ workContent }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 px-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">作業週期</span>
                </v-col>

                <v-col class="white pa-3">{{ cycle }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 px-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">作業環境</span>
                </v-col>

                <v-col class="white pa-3">{{ env }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 px-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">機械/設備/工具</span>
                </v-col>

                <v-col class="white pa-3">{{ eqs }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 px-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">能源/化學物質</span>
                </v-col>

                <v-col class="white pa-3">{{ energy }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 px-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">危害類型</span>
                </v-col>

                <v-col class="white pa-3">{{ harmType }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 px-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">作業資格</span>
                </v-col>

                <v-col class="white pa-3">{{ qualify }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 px-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">危害可能造成後果</span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="result"
                ></v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 px-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">工程控制</span>
                </v-col>

                <v-col class="white pa-3">{{ engineeringControl }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 px-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">管理控制</span>
                </v-col>

                <v-col class="white pa-3">{{ manageControl }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 px-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">防護具</span>
                </v-col>

                <v-col class="white pa-3">{{ protectEqs }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 px-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">風險嚴重性</span>
                </v-col>

                <v-col class="white pa-3">{{ serious }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 px-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">風險可能性</span>
                </v-col>

                <v-col class="white pa-3">{{ possibility }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 px-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">控制後風險嚴重性</span>
                </v-col>

                <v-col class="white pa-3">{{ serious2 }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 px-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">控制後風險可能性</span>
                </v-col>

                <v-col class="white pa-3">{{ possibility2 }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 px-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">降低風險所採取之控制措施</span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="controlMeasures"
                ></v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 px-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">風險等級</span>
                </v-col>

                <v-col class="white pa-3">{{ level }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 px-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">控制後風險等級</span>
                </v-col>

                <v-col class="white pa-3">{{ level2 }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" class="text-center mt-12 mb-8">
            <v-btn dark class="ma-2"
                to="/smis/jobsafety/disasterdb"
            >回搜尋頁</v-btn>

            <v-btn dark class="ma-2"
                color="indigo"
                :to="`/smis/jobsafety/disasterdb/${routeId}/edit`"
            >編輯</v-btn>

            <v-btn dark  class="ma-2" color="error"
                @click="del"
            >作廢</v-btn>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { jobSeriousOpts, jobPossibilityOpts, jobLevelOpts } from '@/assets/js/smisData'

export default {
    data: () => ({
        routeId: '',
        code1: '',  // 編號-第1段
        code2: '',  // 編號-第2段
        code3: '',  // 編號-第3段
        name: '',  // 作業名稱
        workContent: '',  // 操作工作內容
        cycle: '',  // 作業週期
        env: '',  // 作業環境
        eqs: '',  // 機械/設備/工具
        energy: '',  // 能源/化學物質
        harmType: 1,  // 危害類型
        qualify: '',  // 作業資格
        result: '',  // 危害可能造成後果
        engineeringControl: '',  // 工程控制
        manageControl: '',  // 管理控制
        protectEqs: '',  // 防護具
        serious: 'S1',  // 風險嚴重性
        possibility: 'P1',  // 風險可能性
        serious2: 'S1',  // 控制後風險嚴重性
        possibility2: 'P1',  // 控制後風險可能性
        controlMeasures: '',  // 降低風險所採取之控制措施
        level: 'R1',  // 風險等級
        level2: 'R1',  // 控制後風險等級
    }),
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        }
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 向後端取得資料
        fetchData() {
            this.chLoadingShow()
            this.routeId = this.$route.params.id

            // 新增測試用資料
            setTimeout(() => {
                let obj = {
                    code1: '12047',  // 編號-第1段
                    code2: '22',  // 編號-第2段
                    code3: '16',  // 編號-第3段
                    name: '堆高機作業',  // 作業名稱
                    workContent: '保養、維修',  // 操作工作內容
                    cycle: '二週 1 次',  // 作業週期
                    env: '倉庫',  // 作業環境
                    eqs: '堆高機',  // 機械/設備/工具
                    energy: '',  // 能源/化學物質
                    harmType: 5,  // 危害類型
                    qualify: '堆高機丙級證照',  // 作業資格
                    result: '文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明',  // 危害可能造成後果
                    engineeringControl: '',  // 工程控制
                    manageControl: '堆高機維修手則',  // 管理控制
                    protectEqs: '安全帽、手套',  // 防護具
                    serious: 'S3',  // 風險嚴重性
                    possibility: 'P3',  // 風險可能性
                    serious2: 'S1',  // 控制後風險嚴重性
                    possibility2: 'P1',  // 控制後風險可能性
                    controlMeasures: '控制措施文字控制措施文字控制措施文字控制措施文字控制措施文字控制措施文字',  // 降低風險所採取之控制措施
                    level: 'R2',  // 風險等級
                    level2: 'R1',  // 控制後風險等級
                }

                this.setShowData(obj)
                this.chLoadingShow()
            }, 1000)
        },
        // 初始化資料
        setShowData(obj) {
            this.code1 = obj.code1 // 編號-第1段
            this.code2 = obj.code2 // 編號-第2段
            this.code3 = obj.code3 // 編號-第3段
            this.name = obj.name // 作業名稱
            this.workContent = obj.workContent // 操作工作內容
            this.cycle = obj.cycle // 作業週期
            this.env = obj.env // 作業環境
            this.eqs = obj.eqs // 機械/設備/工具
            this.energy = obj.energy // 能源/化學物質
            this.harmType = obj.harmType // 危害類型
            this.qualify = obj.qualify // 作業資格
            this.result = obj.result.replace(/\n/g, '<br>') // 危害可能造成後果
            this.engineeringControl = obj.engineeringControl // 工程控制
            this.manageControl = obj.manageControl // 管理控制
            this.protectEqs = obj.protectEqs // 防護具
            this.serious = jobSeriousOpts.find(item => item.value == obj.serious).text // 風險嚴重性
            this.possibility = jobPossibilityOpts.find(item => item.value == obj.possibility).text // 風險可能性
            this.serious2 = jobSeriousOpts.find(item => item.value == obj.serious2).text // 控制後風險嚴重性
            this.possibility2 = jobPossibilityOpts.find(item => item.value == obj.possibility2).text // 控制後風險可能性
            this.controlMeasures = obj.controlMeasures.replace(/\n/g, '<br>') // 降低風險所採取之控制措施
            this.level = jobLevelOpts.find(item => item.value == obj.level).text // 風險等級
            this.level2 = jobLevelOpts.find(item => item.value == obj.level2).text // 控制後風險等級
        },
        // 刪除
        del() {
            if (confirm('你確定要刪除嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.$router.push({ path: '/smis/jobsafety/disasterdb' })
                    this.chMsgbar({ success: true, msg: '刪除成功'})
                    this.chLoadingShow()
                }, 1000)
            }
        },
    },
    created() {
        this.fetchData()
    }
}
</script>