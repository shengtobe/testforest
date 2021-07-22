<template>
<v-container style="max-width: 1200px" class="label-header">
    <h2 class="mb-4 label-title">
        {{ (this.isEdit)? `職災危害編輯 (編號：${ ipt.code1 }-${ ipt.code2 })` : '職災危害新增' }}
    </h2>

    <v-row class="px-2">
        <v-col cols="12" sm="4" md="3" align-self="end">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>編號
            </h3>
            <v-text-field
                v-model.trim="ipt.code1"
                solo :readonly="isEdit == true"
                placeholder="請輸入 2 碼，例：01"
                maxlength="2"
            ></v-text-field>
            <p class="red--text mt-n6">* 作業名稱、設備或區域代碼</p>
        </v-col>

        <v-col cols="12" sm="4" md="3" align-self="end">
            <v-text-field
                v-model.trim="ipt.code2"
                solo :readonly="isEdit == true"
                placeholder="請輸入 2 碼，例：01"
                maxlength="2"
            ></v-text-field>
            <p class="red--text mt-n6">* 操作工作內容流水號</p>
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
                v-model.trim="ipt.JobName"
                solo
                placeholder="請輸入作業名稱"
            ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>操作工作內容
            </h3>
            <v-text-field
                v-model.trim="ipt.JobContent"
                solo
                placeholder="例：保養、維修"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>作業週期
            </h3>
            <v-text-field
                v-model.trim="ipt.JobCycle"
                solo
                placeholder="例：每週 1 次"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>作業環境
            </h3>
            <v-text-field
                v-model.trim="ipt.JobCondition"
                solo
                placeholder="例：噪音、粉塵"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>機械/設備/工具
            </h3>
            <v-text-field
                v-model.trim="ipt.ToolDevice"
                solo
                placeholder="例：堆高機"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>能源/化學物質
            </h3>
            <v-text-field
                v-model.trim="ipt.ChemicalType"
                solo
                placeholder="例：電能"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>危害類型
            </h3>
            <v-select
                v-model="ipt.JobAccidentType"
                :items="opts.harmTypeOpts"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" md="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>作業資格
            </h3>
            <v-text-field
                v-model.trim="ipt.JobProd"
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
                v-model.trim="ipt.AccidentStatusDesp"
            ></v-textarea>
        </v-col>

        <v-col cols="12" sm="4">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>工程控制
            </h3>
            <v-text-field
                v-model.trim="ipt.EngineerCtrl"
                solo
                placeholder="例：降低危害之裝備"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>管理控制
            </h3>
            <v-text-field
                v-model.trim="ipt.ManageCtrl"
                solo
                placeholder="例：降低嚴重度之措施"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>防護具
            </h3>
            <v-text-field
                v-model.trim="ipt.ProtTool"
                solo
                placeholder="例：減輕嚴重度之裝備"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-format-line-spacing</v-icon>風險嚴重性
            </h3>
            <v-select
                v-model="ipt.EndangerLevel"
                :items="opts.serious"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-signal-variant</v-icon>風險可能性
            </h3>
            <v-select
                v-model="ipt.EndangerProb"
                :items="opts.possibility"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-format-line-spacing</v-icon>控制後風險嚴重性
            </h3>
            <v-select
                v-model="ipt.EndangerLevelC"
                :items="opts.serious"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-signal-variant</v-icon>控制後風險可能性
            </h3>
            <v-select
                v-model="ipt.EndangerProbC"
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
                v-model.trim="ipt.LowRiskDevice"
                hide-details
            ></v-textarea>
        </v-col>

        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="mr-4 btn-close"
                v-if="!isEdit"
                to="/smis/jobsafety/disasterdb"
            >回搜尋頁</v-btn>

            <v-btn dark class="mr-3 btn-close"
                v-else
                :to="`/smis/jobsafety/disasterdb/${this.id}/show`"
            >回上層</v-btn>
            
            <v-btn
                class="btn-add white--text"
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
import { mapState, mapActions } from 'vuex'
import { canInUpdate } from '@/apis/access'
import { getNowFullTime } from '@/assets/js/commonFun'
import { disasterTypeOpts, riskSerious, jobPossibilityOpts } from '@/assets/js/smisData'
import { createDataDb, updateDataDb, detailOneDb } from '@/apis/smis/jobSafety'

export default {
    props: ['id'],  //路由參數
    data: () => ({
        valid: true,  // 表單是否驗證欄位
        isShowBtn: false,
        isEdit: false,  // 是否為編輯
        ipt: {
            code1: '',  // 編號-第1段
            code2: '',  // 編號-第2段
            
            EndangerCode: "", //職業危害編碼
            JobName: "", //2作業名稱
            JobContent: "", //3操作工作內容
            JobCycle: "", //4作業週期
            JobCondition: "", //5作業環境
            ToolDevice: "", //6機械/設備/工具
            ChemicalType: "", //7能源/化學物質
            JobProd: "", //8作業資格
            JobAccidentType: "", //9危害類型
            AccidentStatusDesp: "", //10危害可能造成後果
            EngineerCtrl: "", //11工程控制
            ManageCtrl: "", //12管理控制
            ProtTool: "", //13防護具
            EndangerLevel: "", //14嚴重性
            EndangerProb: "", //15可能性
            RiskLevel: "", //16風險等級
            LowRiskDevice: "", //17降低風險控制措施
            EndangerLevelC: "", //控制後嚴重性
            EndangerProbC: "", //控制後可能性
            RiskLevelC: "", //控制後風險等級
            Timeout: "", //本次連線Session保留時間(分)
            // code1: '',  // 編號-第1段
            // code2: '',  // 編號-第2段
            // name: '',  // 作業名稱
            // workContent: '',  // 操作工作內容
            // cycle: '',  // 作業週期
            // env: '',  // 作業環境
            // eqs: '',  // 機械/設備/工具
            // energy: '',  // 能源/化學物質
            // harmType: 1,  // 危害類型
            // qualify: '',  // 作業資格
            // result: '',  // 危害可能造成後果
            // engineeringControl: '',  // 工程控制
            // manageControl: '',  // 管理控制
            // protectEqs: '',  // 防護具
            // serious: 'S1',  // 風險嚴重性
            // possibility: 'P1',  // 風險可能性
            // serious2: 'S1',  // 控制後風險嚴重性
            // possibility2: 'P1',  // 控制後風險可能性
            // controlMeasures: '',  // 降低風險所採取之控制措施
        },
        opts: {  // 下拉選單
            harmTypeOpts: disasterTypeOpts,  // 危害類型
            serious: riskSerious,  // 風險嚴重性
            possibility: jobPossibilityOpts,  // 風險可能性
        },
    }),
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
            groupData: state => state.groupData,
        }),
    },
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        },
        // 'ipt.code1': function(val) {
        //     this.ipt.code1 = val.substr(0, 5)
        // },
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        ...mapActions('user', [
            'saveUserGroup',  // 儲存使用者權限(群組)資料
        ]),
        // 初始化資料
        initData() {
            // -------------- 編輯時 -------------- 
            if (this.$route.params.id != undefined) {
                this.chLoadingShow({show:true})
                this.id = this.$route.params.id  // 路由參數(id) routeId
                this.isEdit = true

                detailOneDb({
                    EndangerCode: this.id,  // 工單編號 (從路由參數抓取)
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        console.log("fetchOne後收到res.data:")
                        console.log(res.data)
                        if (res.data.DelStatus == 'T') {  // 若已刪除則轉404頁
                            this.$router.push({ path: '/404' })
                        } else {
                            // res.data.controls = JSON.parse(res.data.order_list)  // 已選控制措施
                            this.setInitDate(res.data)
                        }
                    } else {
                        // 請求發生問題時(ErrorCode 不為 0 時)，重導至錯誤訊息頁面
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    console.log(err)
                    alert('伺服器發生問題，資料讀取失敗')
                }).finally(() => {
                    this.chLoadingShow({show:false})
                })

                // 範例效果
                // setTimeout(() => {
                //     let obj = {
                //         code1: '12047',  // 編號-第1段
                //         code2: '22',  // 編號-第2段
                //         code3: '16',  // 編號-第3段
                //         name: '堆高機作業',  // 作業名稱
                //         workContent: '保養、維修',  // 操作工作內容
                //         cycle: '二週 1 次',  // 作業週期
                //         env: '倉庫',  // 作業環境
                //         eqs: '堆高機',  // 機械/設備/工具
                //         energy: '',  // 能源/化學物質
                //         harmType: 5,  // 危害類型
                //         qualify: '堆高機丙級證照',  // 作業資格
                //         result: '文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明',  // 危害可能造成後果
                //         engineeringControl: '',  // 工程控制
                //         manageControl: '堆高機維修手則',  // 管理控制
                //         protectEqs: '安全帽、手套',  // 防護具
                //         serious: 'S3',  // 風險嚴重性
                //         possibility: 'P3',  // 風險可能性
                //         serious2: 'S1',  // 控制後風險嚴重性
                //         possibility2: 'P1',  // 控制後風險可能性
                //         controlMeasures: '控制措施文字控制措施文字控制措施文字控制措施文字控制措施文字控制措施文字',  // 降低風險所採取之控制措施
                //     }
                    
                //     this.setInitDate(obj)
                //     this.chLoadingShow({show:true})
                // }, 1000)
            }
        },
        // 設定資料(編輯時)
        setInitDate(obj) {
            console.log("設定資料(編輯時): obj:", obj)
            this.ipt.EndangerCode = obj.EndangerCode // 職業危害編碼
            let CodeArr = obj.EndangerCode.split("-")
            this.ipt.code1 = CodeArr[0]
            this.ipt.code2 = CodeArr[1]
            this.ipt.JobName = obj.JobName // 2作業名稱
            this.ipt.JobContent = obj.JobContent // 3操作工作內容
            this.ipt.JobCycle = obj.JobCycle // 4作業週期
            this.ipt.JobCondition = obj.JobCondition // 5作業環境
            this.ipt.ToolDevice = obj.ToolDevice // 6機械/設備/工具
            this.ipt.ChemicalType = obj.ChemicalType // 7能源/化學物質
            this.ipt.JobProd = obj.JobProd // 8作業資格
            this.ipt.JobAccidentType = obj.JobAccidentType // 9危害類型
            this.ipt.AccidentStatusDesp = obj.AccidentStatusDesp // 10危害可能造成後果
            this.ipt.EngineerCtrl = obj.EngineerCtrl // 11工程控制
            this.ipt.ManageCtrl = obj.ManageCtrl // 12管理控制
            this.ipt.ProtTool = obj.ProtTool // 13防護具
            this.ipt.EndangerLevel = obj.EndangerLevel // 14嚴重性
            this.ipt.EndangerProb = obj.EndangerProb // 15可能性
            this.ipt.RiskLevel = obj.RiskLevel // 16風險等級
            this.ipt.LowRiskDevice = obj.LowRiskDevice // 17降低風險控制措施
            this.ipt.EndangerLevelC = obj.EndangerLevelC // 控制後嚴重性
            this.ipt.EndangerProbC = obj.EndangerProbC // 控制後可能性
            this.ipt.RiskLevelC = obj.RiskLevelC // 控制後風險等級
            this.ipt.Timeout = obj.Timeout // 本次連線Session保留時間(分)

            // this.ipt.code1 = obj.code1 // 編號-第1段
            // this.ipt.code2 = obj.code2 // 編號-第2段
            // this.ipt.code3 = obj.code3 // 編號-第3段
            // this.ipt.name = obj.name // 作業名稱
            // this.ipt.workContent = obj.workContent // 操作工作內容
            // this.ipt.cycle = obj.cycle // 作業週期
            // this.ipt.env = obj.env // 作業環境
            // this.ipt.eqs = obj.eqs // 機械/設備/工具
            // this.ipt.energy = obj.energy // 能源/化學物質
            // this.ipt.harmType = obj.harmType // 危害類型
            // this.ipt.qualify = obj.qualify // 作業資格
            // this.ipt.result = obj.result // 危害可能造成後果
            // this.ipt.engineeringControl = obj.engineeringControl // 工程控制
            // this.ipt.manageControl = obj.manageControl // 管理控制
            // this.ipt.protectEqs = obj.protectEqs // 防護具
            // this.ipt.serious = obj.serious // 風險嚴重性
            // this.ipt.possibility = obj.possibility // 風險可能性
            // this.ipt.serious2 = obj.serious2 // 控制後風險嚴重性
            // this.ipt.possibility2 = obj.possibility2 // 控制後風險可能性
            // this.ipt.controlMeasures = obj.controlMeasures // 降低風險所採取之控制措施
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 送出
        save() {
            if (confirm('你確定要送出嗎?')) {
                this.chLoadingShow({show:true})

                this.ipt.EndangerCode = this.ipt.code1 + "-" + this.ipt.code2

                // 新增測試用資料
                // setTimeout(() => {
                //     if (this.isEdit) {
                //         this.chMsgbar({ success: true, msg: '資料更新成功' })
                //     } else {
                //         this.$router.push({ path: '/smis/jobsafety/disaster-survey' })
                //         this.chMsgbar({ success: true, msg: '資料新增成功' })
                //     }
                //     this.chLoadingShow({show:true})
                // }, 1000)
                if (this.isEdit) {
                // ---------- 編輯時---------- 
                updateDataDb({
                    EndangerCode: this.id, // 職業危害編碼
                    JobName: this.ipt.JobName, // 2作業名稱
                    JobContent: this.ipt.JobContent, // 3操作工作內容
                    JobCycle: this.ipt.JobCycle, // 4作業週期
                    JobCondition: this.ipt.JobCondition, // 5作業環境
                    ToolDevice: this.ipt.ToolDevice, // 6機械/設備/工具
                    ChemicalType: this.ipt.ChemicalType, // 7能源/化學物質
                    JobProd: this.ipt.JobProd, // 8作業資格
                    JobAccidentType: this.ipt.JobAccidentType, // 9危害類型
                    AccidentStatusDesp: this.ipt.AccidentStatusDesp, // 10危害可能造成後果
                    EngineerCtrl: this.ipt.EngineerCtrl, // 11工程控制
                    ManageCtrl: this.ipt.ManageCtrl, // 12管理控制
                    ProtTool: this.ipt.ProtTool, // 13防護具
                    EndangerLevel: this.ipt.EndangerLevel, // 14嚴重性
                    EndangerProb: this.ipt.EndangerProb, // 15可能性
                    RiskLevel: this.ipt.RiskLevel, // 16風險等級
                    LowRiskDevice: this.ipt.LowRiskDevice, // 17降低風險控制措施
                    EndangerLevelC: this.ipt.EndangerLevelC, // 控制後嚴重性
                    EndangerProbC: this.ipt.EndangerProbC, // 控制後可能性
                    RiskLevelC: this.ipt.RiskLevelC, // 控制後風險等級
                    Timeout: this.ipt.Timeout, // 本次連線Session保留時間(分)
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '更新成功' })
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，更新失敗' })
                }).finally(() => {
                    this.chLoadingShow({show:false})
                })
            } else {
                console.log("---------- 新增時---------- ")
                // ---------- 新增時---------- 
                createDataDb({
                    EndangerCode: this.ipt.EndangerCode, // 職業危害編碼
                    JobName: this.ipt.JobName, // 2作業名稱
                    JobContent: this.ipt.JobContent, // 3操作工作內容
                    JobCycle: this.ipt.JobCycle, // 4作業週期
                    JobCondition: this.ipt.JobCondition, // 5作業環境
                    ToolDevice: this.ipt.ToolDevice, // 6機械/設備/工具
                    ChemicalType: this.ipt.ChemicalType, // 7能源/化學物質
                    JobProd: this.ipt.JobProd, // 8作業資格
                    JobAccidentType: this.ipt.JobAccidentType, // 9危害類型
                    AccidentStatusDesp: this.ipt.AccidentStatusDesp, // 10危害可能造成後果
                    EngineerCtrl: this.ipt.EngineerCtrl, // 11工程控制
                    ManageCtrl: this.ipt.ManageCtrl, // 12管理控制
                    ProtTool: this.ipt.ProtTool, // 13防護具
                    EndangerLevel: this.ipt.EndangerLevel, // 14嚴重性
                    EndangerProb: this.ipt.EndangerProb, // 15可能性
                    RiskLevel: this.ipt.RiskLevel, // 16風險等級
                    LowRiskDevice: this.ipt.LowRiskDevice, // 17降低風險控制措施
                    EndangerLevelC: this.ipt.EndangerLevelC, // 控制後嚴重性
                    EndangerProbC: this.ipt.EndangerProbC, // 控制後可能性
                    RiskLevelC: this.ipt.RiskLevelC, // 控制後風險等級
                    Timeout: this.ipt.Timeout, // 本次連線Session保留時間(分)
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '新增成功' })
                        this.ipt = { ...this.defaultIpt }  // 初始化新增表單
                        this.ipt.controlChoose = [ ...[]]
                        this.tableItems = [ ...[]]
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，新增失敗' })
                }).finally(() => {
                    this.chLoadingShow({show:false})
                })
            }
            }
        },
    },
    created() {
        canInUpdate({
            ClientReqTime: getNowFullTime(),  // client 端請求時間
            OperatorID: this.userData.UserId,  // 操作人id
        }).then(res => {
            if (res.data.ErrorCode == 0) {
                this.saveUserGroup(res.data.GroupData)
                this.isShowBtn = this.groupData.RoleLv3 == "T"

                if(this.isShowBtn)
                    this.initData()
                else{
                    alert("無權限做此操作")
                    this.$router.push('/')
                }
            }
        }).catch( err => {
            console.log(err)
        }).finally(() => {
        })
    }
}
</script>