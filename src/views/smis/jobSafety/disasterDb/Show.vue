<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">職災危害編號：{{ code1 }}-{{ code2 }}-{{ code3 }}</h2>

    <v-row no-gutters class="mt-8">
        <BottomTableNoIcon :items="bottomItems" />


        <v-col cols="12" class="text-center mt-12 mb-8">
            <v-btn dark class="ma-2"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done">
                <v-btn dark class="ma-2"
                    color="indigo"
                    :to="`/smis/jobsafety/disasterdb/${id}/edit`"
                >編輯</v-btn>

                <v-btn dark  class="ma-2" color="error"
                    @click="del"
                >作廢</v-btn>
            </template>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { jobSeriousOpts, jobPossibilityOpts, jobLevelOpts } from '@/assets/js/smisData'
import BottomTableNoIcon from '@/components/BottomTableNoIcon.vue'

export default {
    data: () => ({
        id: '',  // 編號
        done: false,  // 是否完成頁面操作
        bottomItems: [],  // 欄位資料
        code1: '',  // 編號-第1段
        code2: '',  // 編號-第2段
        code3: '',  // 編號-第3段
    }),
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        }
    },
    components: { BottomTableNoIcon },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'closeWindow',  // 關閉視窗
        ]),
        // 向後端取得資料
        fetchData() {
            this.chLoadingShow()

            // 新增測試用資料
            setTimeout(() => {
                let obj = {
                    id: this.$route.params.id,  // 編號
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
            this.id = obj.id // 編號
            this.code1 = obj.code1 // 編號-第1段
            this.code2 = obj.code2 // 編號-第2段
            this.code3 = obj.code3 // 編號-第3段

            this.bottomItems = [
                { oneline: true, title: '作業名稱', text: obj.name },
                { oneline: true, title: '操作工作內容', text: obj.workContent },
                { oneline: true, title: '作業週期', text: obj.cycle },
                { oneline: true, title: '作業環境', text: obj.env },
                { oneline: true, title: '機械/設備/工具', text: obj.eqs },
                { oneline: true, title: '能源/化學物質', text: obj.energy },
                { oneline: true, title: '危害類型', text: obj.harmType },
                { oneline: true, title: '作業資格', text: obj.qualify },
                { oneline: false, title: '危害可能造成後果', text: obj.result.replace(/\n/g, '<br>') },
                { oneline: true, title: '工程控制', text: obj.engineeringControl },
                { oneline: true, title: '管理控制', text: obj.manageControl },
                { oneline: true, title: '防護具', text: obj.protectEqs },
                { oneline: true, title: '風險嚴重性', text: jobSeriousOpts.find(item => item.value == obj.serious).text },
                { oneline: true, title: '風險可能性', text: jobPossibilityOpts.find(item => item.value == obj.possibility).text },
                { oneline: true, title: '控制後風險嚴重性', text: jobSeriousOpts.find(item => item.value == obj.serious2).text },
                { oneline: true, title: '控制後風險可能性', text: jobPossibilityOpts.find(item => item.value == obj.possibility2).text },
                { oneline: false, title: '降低風險所採取之控制措施', text: obj.controlMeasures.replace(/\n/g, '<br>') },
                { oneline: true, title: '風險等級', text: jobLevelOpts.find(item => item.value == obj.level).text },
                { oneline: true, title: '控制後風險等級', text: jobLevelOpts.find(item => item.value == obj.level2).text },
            ]
        },
        // 刪除
        del() {
            if (confirm('你確定要刪除嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '刪除成功'})
                    this.chLoadingShow()
                    this.done = true  // 隱藏頁面操作按鈕
                }, 1000)
            }
        },
    },
    created() {
        this.fetchData()
    }
}
</script>