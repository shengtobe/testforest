<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">
        {{ (this.isEdit)? `職災危害編輯 (編號：${ ipt.code1 }-${ ipt.code1 })` : '職災危害新增' }}
    </h2>

    <v-row class="px-2">
        <v-col cols="12" sm="4" md="3" align-self="end">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>編號
            </h3>
            <v-text-field
                v-model.trim="ipt.code1"
                solo
                placeholder="請輸入 2 碼，例：01"
                maxlength="2"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3" align-self="end">
            <v-text-field
                v-model.trim="ipt.code2"
                solo
                placeholder="請輸入 2 碼，例：01"
                maxlength="2"
            ></v-text-field>
        </v-col>
    </v-row>

    <p class="px-2 font-weight-bold mt-n6">
        編碼預覽： <span class="error--text">{{ `${ipt.code1}-${ipt.code2}` }}</span>
    </p>

    <v-row class="px-2 mt-8">
        <v-col cols="12" md="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-tag</v-icon>作業名稱
            </h3>
            <v-text-field
                v-model.trim="ipt.name"
                solo
                placeholder="請輸入作業名稱"
            ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>操作工作內容
            </h3>
            <v-text-field
                v-model.trim="ipt.workContent"
                solo
                placeholder="例：保養、維修"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>作業週期
            </h3>
            <v-text-field
                v-model.trim="ipt.cycle"
                solo
                placeholder="例：每週 1 次"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>作業環境
            </h3>
            <v-text-field
                v-model.trim="ipt.env"
                solo
                placeholder="例：噪音、粉塵"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>機械/設備/工具
            </h3>
            <v-text-field
                v-model.trim="ipt.eqs"
                solo
                placeholder="例：堆高機"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>能源/化學物質
            </h3>
            <v-text-field
                v-model.trim="ipt.energy"
                solo
                placeholder="例：電能"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>危害類型
            </h3>
            <v-select
                v-model="ipt.harmType"
                :items="opts.harmTypeOpts"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" md="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>作業資格
            </h3>
            <v-text-field
                v-model.trim="ipt.qualify"
                solo
                placeholder="例：安全衛生法規證照"
            ></v-text-field>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>危害可能造成後果
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入危害可能造成後果"
                v-model.trim="ipt.result"
            ></v-textarea>
        </v-col>

        <v-col cols="12" sm="4">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>工程控制
            </h3>
            <v-text-field
                v-model.trim="ipt.engineeringControl"
                solo
                placeholder="例：降低危害之裝備"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>管理控制
            </h3>
            <v-text-field
                v-model.trim="ipt.manageControl"
                solo
                placeholder="例：降低嚴重度之措施"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>防護具
            </h3>
            <v-text-field
                v-model.trim="ipt.protectEqs"
                solo
                placeholder="例：減輕嚴重度之裝備"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-format-line-spacing</v-icon>風險嚴重性
            </h3>
            <v-select
                v-model="ipt.serious"
                :items="opts.serious"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-signal-variant</v-icon>風險可能性
            </h3>
            <v-select
                v-model="ipt.possibility"
                :items="opts.possibility"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-format-line-spacing</v-icon>控制後風險嚴重性
            </h3>
            <v-select
                v-model="ipt.serious2"
                :items="opts.serious"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-signal-variant</v-icon>控制後風險可能性
            </h3>
            <v-select
                v-model="ipt.possibility2"
                :items="opts.possibility"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>降低風險所採取之控制措施
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入降低風險所採取之控制措施"
                v-model.trim="ipt.controlMeasures"
                hide-details
            ></v-textarea>
        </v-col>

        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="mr-4"
                v-if="!isEdit"
                to="/smis/jobsafety/disasterdb"
            >回搜尋頁</v-btn>

            <v-btn dark class="mr-3"
                v-else
                :to="`/smis/jobsafety/disasterdb/${this.routeId}/show`"
            >回上層</v-btn>
            
            <v-btn
                color="success"
                @click="save"
            >{{ (isEdit)? '儲存變更': '送出' }}</v-btn>
        </v-col>
    </v-row>

    <!-- <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >

    </v-form> -->
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { disasterTypeOpts, jobSeriousOpts, jobPossibilityOpts } from '@/assets/js/smisData'

export default {
    data: () => ({
        valid: true,  // 表單是否驗證欄位
        isEdit: false,  // 是否為編輯
        ipt: {
            code1: '',  // 編號-第1段
            code2: '',  // 編號-第2段
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
        },
        opts: {  // 下拉選單
            harmTypeOpts: disasterTypeOpts,  // 危害類型
            serious: jobSeriousOpts,  // 風險嚴重性
            possibility: jobPossibilityOpts,  // 風險可能性
        },
    }),
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        },
        'ipt.code1': function(val) {
            this.ipt.code1 = val.substr(0, 5)
        },
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 初始化資料
        initData() {
            // -------------- 編輯時 -------------- 
            if (this.$route.params.id != undefined) {
                this.chLoadingShow()
                this.routeId = this.$route.params.id  // 路由參數(id)
                this.isEdit = true

                // 範例效果
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
                    }
                    
                    this.setInitDate(obj)
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 設定資料(編輯時)
        setInitDate(obj) {
            this.ipt.code1 = obj.code1 // 編號-第1段
            this.ipt.code2 = obj.code2 // 編號-第2段
            this.ipt.code3 = obj.code3 // 編號-第3段
            this.ipt.name = obj.name // 作業名稱
            this.ipt.workContent = obj.workContent // 操作工作內容
            this.ipt.cycle = obj.cycle // 作業週期
            this.ipt.env = obj.env // 作業環境
            this.ipt.eqs = obj.eqs // 機械/設備/工具
            this.ipt.energy = obj.energy // 能源/化學物質
            this.ipt.harmType = obj.harmType // 危害類型
            this.ipt.qualify = obj.qualify // 作業資格
            this.ipt.result = obj.result // 危害可能造成後果
            this.ipt.engineeringControl = obj.engineeringControl // 工程控制
            this.ipt.manageControl = obj.manageControl // 管理控制
            this.ipt.protectEqs = obj.protectEqs // 防護具
            this.ipt.serious = obj.serious // 風險嚴重性
            this.ipt.possibility = obj.possibility // 風險可能性
            this.ipt.serious2 = obj.serious2 // 控制後風險嚴重性
            this.ipt.possibility2 = obj.possibility2 // 控制後風險可能性
            this.ipt.controlMeasures = obj.controlMeasures // 降低風險所採取之控制措施
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 送出
        save() {
            this.chLoadingShow()

            // 測試用資料
            setTimeout(() => {
                let txt = (this.isEdit)? '資料更新成功' :  '資料新增成功'
                if (!this.isEdit) this.$router.push({ path: '/smis/jobsafety/disasterdb' })
                this.chMsgbar({ success: true, msg: txt })
                this.chLoadingShow()
            }, 1000)
        },
    },
    created() {
        this.initData()
    }
}
</script>