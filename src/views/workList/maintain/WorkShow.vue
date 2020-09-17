<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">工單編號：{{ workNumber }}</h2>

    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8">
        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-pen</v-icon>故障描述
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="malfunctionDes"
                ></v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-note</v-icon>備註
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="note"
                ></v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>需證照人員
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ licensedMember }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>作業人員
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ commonMember }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>外包廠商
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ vendorsList }}</v-col>
            </v-row>
        </v-col>
    </v-row>

    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
        <v-row class="mt-8">
            <v-col cols="12" sm="6">
                <v-row>
                    <v-col cols="12" class="mb-n4">
                        <h3>
                            <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>到修日期
                        </h3>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-menu
                            v-model="dateMenuShow.arrivalFix"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model.trim="ipt.arrivalFixDate"
                                    solo
                                    v-on="on"
                                    readonly
                                    hide-details
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                color="purple"
                                v-model="ipt.arrivalFixDate"
                                @input="dateMenuShow.arrivalFix = false"
                                locale="zh-tw"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>

                    <v-col cols="6" md="4">
                        <v-select
                            v-model="ipt.arrivalFixHour"
                            :items="hourOpts"
                            solo
                            hide-details
                        ></v-select>
                    </v-col>

                    <v-col cols="6" md="4">
                        <v-select
                            v-model="ipt.arrivalFixMin"
                            :items="minOpts"
                            solo
                            hide-details
                        ></v-select>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12" sm="6">
                <v-row>
                    <v-col cols="12" class="mb-n4">
                        <h3>
                            <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>動工日期
                        </h3>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-menu
                            v-model="dateMenuShow.startFix"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model.trim="ipt.startFixDate"
                                    solo
                                    v-on="on"
                                    readonly
                                    hide-details
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                color="purple"
                                v-model="ipt.startFixDate"
                                @input="dateMenuShow.startFix = false"
                                locale="zh-tw"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>

                    <v-col cols="6" md="4">
                        <v-select
                            v-model="ipt.startFixHour"
                            :items="hourOpts"
                            solo
                            hide-details
                        ></v-select>
                    </v-col>

                    <v-col cols="6" md="4">
                        <v-select
                            v-model="ipt.startFixMin"
                            :items="minOpts"
                            solo
                            hide-details
                        ></v-select>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12" sm="6">
                <v-row>
                    <v-col cols="12" class="mb-n4">
                        <h3>
                            <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>完工日期
                        </h3>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-menu
                            v-model="dateMenuShow.endFix"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model.trim="ipt.endFixDate"
                                    solo
                                    v-on="on"
                                    readonly
                                    hide-details
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                color="purple"
                                v-model="ipt.endFixDate"
                                @input="dateMenuShow.endFix = false"
                                locale="zh-tw"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>

                    <v-col cols="6" md="4">
                        <v-select
                            v-model="ipt.endFixHour"
                            :items="hourOpts"
                            solo
                            hide-details
                        ></v-select>
                    </v-col>

                    <v-col cols="6" md="4">
                        <v-select
                            v-model="ipt.endFixMin"
                            :items="minOpts"
                            solo
                            hide-details
                        ></v-select>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12">
                <h3 class="mb-2">
                    <v-icon class="mr-1 mb-1">mdi-note</v-icon>維修情況
                </h3>

                <v-textarea
                    auto-grow
                    solo
                    rows="6"
                    placeholder="請輸入維修情況"
                    v-model.trim="ipt.fixSituation"
                    :background-color="errorSituation"
                    :rules="[v => (!!v && /[^\s]/.test(v)) || '此欄位不可空白']"
                ></v-textarea>
            </v-col>
        </v-row>
    </v-form>

    <v-row>
        <!-- 操作按鈕 -->
        <v-col cols="12" class="text-center">
            <v-btn dark class="ma-2"
                :loading="isLoading"
                to="/worklist/maintain"
            >回搜尋頁</v-btn>

            <v-btn dark class="ma-2"
                :loading="isLoading"
                color="indigo"
                :to="`/worklist/maintain/${routeId}/editWork`"
            >編輯</v-btn>

            <v-btn class="ma-2"
                :loading="isLoading"
                color="error"
                @click="dialog = true"
            >退回</v-btn>

            <v-btn dark class="ma-2"
                :loading="isLoading"
                color="success"
                @click="save"
            >送出</v-btn>
        </v-col>

        <!-- 按鈕說明，demo 用 -->
        <v-col cols="12" class="error--text">
            <h4>按鈕出現說明</h4>
            1. 編輯、退回：派工人、代理人<br>
            2. 維修情況：派工人、代理人、林鐵維修人員
        </v-col>
    </v-row>

    <!-- dialog -->
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-toolbar dark flat dense color="error" class="mb-2">
                <v-toolbar-title>退回原因</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn fab small text @click="dialog = !dialog" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-textarea
                            hide-details
                            auto-grow
                            outlined
                            rows="8"
                            v-model.trim="reason"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            
            <v-card-actions class="px-5 pb-5">
                <v-spacer></v-spacer>
                <v-btn class="mr-2" elevation="4" :loading="isLoading" @click="dialog = false">取消</v-btn>
                <v-btn color="success"  elevation="4" :loading="isLoading" @click="withdraw">送出</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { hourOptions, minOptions } from '@/assets/js/dateTimeOption'
import TopBasicTable from '@/components/TopBasicTable.vue'

export default {
    data: () => ({
        routeId: '',  // 路由id
        valid: true,  // 表單是否驗證欄位
        isLoading: false,  // 是否讀取中
        workNumber: '',  // 工單編號
        note: '',  // 備註
        licensedMember: '',  // 需證照人員
        commonMember: '',  // 作業人員
        vendors: [],  // 外包廠商
        malfunctionDes: '',  // 故障描述
        dialog: false,  // dialog 是否顯示
        reason: '',  // 退回原因
        dateMenuShow: {  // 日曆是否顯示
            arrivalFix: false, // 到修日期
            startFix: false,  // 動工日期
            endFix: false,  // 完工日期
        },
        hourOpts: hourOptions,  // 下拉選單項目-小時
        minOpts: minOptions,  // 下拉選單項目-分鐘
        ipt: {
            arrivalFixDate: new Date().toISOString().substr(0, 10),  // 到修-日期
            arrivalFixHour: 0,  // 到修-時
            arrivalFixMin: 0,  // 到修-分
            startFixDate: new Date().toISOString().substr(0, 10),  // 動工-日期
            startFixHour: 0,  // 動工-時
            startFixMin: 0,  // 動工-分
            endFixDate: new Date().toISOString().substr(0, 10),  // 完工-日期
            endFixHour: 0,  // 完工-時
            endFixMin: 0,  // 完工-分
            fixSituation: '',  // 維修情況
        },
        errorSituation: '',  // 必填欄位背景色-維修情況
        topItems: {  // 上面的欄位
            fixTime: { icon: 'mdi-calendar-text', title: '報修時間', text: '' },
            eqCodes: { icon: 'mdi-codepen', title: '設備標示編號', text: '' },
            status: { icon: 'mdi-ray-vertex', title: '處理階段', text: '' },
            fixUnit: { icon: 'mdi-apps', title: '請修單位', text: '' },
            creater: { icon: 'mdi-account', title: '立案人', text: '' },
            dispatcher: { icon: 'mdi-account', title: '派工人', text: '' },
            agent: { icon: 'mdi-account', title: '代理人', text: '' },
            fixType: { icon: 'mdi-source-branch', title: '維修類型', text: '' },
            workDate: { icon: 'mdi-calendar-text', title: '維修日期', text: '' },
            acceptanceTime: { icon: 'mdi-calendar-text', title: '預計驗收日期', text: '' },
            enterControl: { icon: 'mdi-alert-outline', title: '進場管制申請', text: '' },
            specialDanger: { icon: 'mdi-alert-outline', title: '特殊危害作業', text: '' },
            safeDanger: { icon: 'mdi-alert-outline', title: '安全危害作業', text: '' },
            workLocation: { icon: 'mdi-map-marker', title: '工作地點', text: '' },
            memberCount: { icon: 'mdi-account-multiple', title: '實際人數', text: '' },
        },
    }),
    components: { TopBasicTable },
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        }
    },
    computed: {
        // 合併外包廠商字串
        vendorsList() {
            let arr = this.vendors.map(item => {
                return `${ item.name } (${ item.count }人)`
            })
            return arr.join('、')
        }
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 向後端取資料
        fetchData() {
            this.chLoadingShow()
            let routeId = this.$route.params.id  // 路由參數

            // 範例效果
            setTimeout(() => {
                // 向後端請求資料
                let obj = {
                    workNumber: '202004290001',  // 工單編號
                    eqNumber1: 'TQG',
                    eqNumber2: 'A35',
                    eqNumber3: 'EA0',
                    eqNumber4: '013',
                    fixUnit: '車輛組',  // 請修單位
                    creater: '陳小華',  // 立案人
                    dispatcher: '黃小美',  // 派工人
                    agent: '王小明',  // 代理人
                    fixTime: '201903110001',  // 報修時間
                    workDate: '2020-03-15',  // 維修日期
                    hour: '14:00:00',  // 維修時間(小時)
                    workLocation: '115k-120k',  // 工作地點
                    memberCount: 12,  // 實際人數
                    acceptanceTime: '2020-03-22',  // 預計驗收日期
                    licensedMember: ['陳高文'],  // 需證照人員
                    commonMember: ['張仁宣'],  // 無證照人員
                    vendors: [  // 外包廠商
                        { name: 'XX 電子', count: 2 },
                        { name: '○○ 鋼鐵', count: 1 },
                        { name: 'XXX 工廠', count: 5 },
                    ],
                    enterControl: false,  // 進場管制申請
                    specialDanger: false,  // 特殊危害作業
                    safeDanger: false,  // 安全危害作業
                    malfunctionDes: '工具機損壞',  // 故障描述
                    fixType: '1',  // 維修類型
                    note: '',  // 備註
                    status: '已派工待維修',  // 狀態
                }

                this.setShowData(obj)  // 初始化資料
                this.chLoadingShow()
            }, 1000)
        },
        // 初始化資料
        setShowData(obj) {
            this.workNumber = obj.workNumber  // 工單編號
            this.malfunctionDes = obj.malfunctionDes.replace(/\n/g, '<br>')  // 故障描述
            this.note = obj.note.replace(/\n/g, '<br>')  // 備註

            // 設定上面的欄位資料
            this.topItems.fixTime.text = obj.fixTime  // 報修時間
            this.topItems.eqCodes.text = `${obj.eqNumber1}-${obj.eqNumber2}-${obj.eqNumber3}-${obj.eqNumber4}`  // 設備標示編號
            this.topItems.status.text = obj.status  // 處理階段
            this.topItems.fixUnit.text = obj.fixUnit  // 請修單位
            this.topItems.creater.text = obj.creater  // 立案人
            this.topItems.dispatcher.text = obj.dispatcher  // 派工人
            this.topItems.agent.text = obj.agent  // 代理人
            this.topItems.fixType.text = (obj.fixType == '1')? '故障檢修' : ((obj.Type == '2')? '例行保養' : '')  // 維修類型
            this.topItems.workDate.text = `${obj.workDate} ${obj.hour}`  // 維修日期
            this.topItems.acceptanceTime.text = obj.acceptanceTime  // 預計驗收日期
            this.topItems.enterControl.text = (obj.enterControl)? '是' : '否'  // 進場管制申請
            this.topItems.specialDanger.text = (obj.specialDanger)? '是' : '否'  // 特殊危害作業
            this.topItems.safeDanger.text = (obj.safeDanger)? '是' : '否'  // 安全危害作業
            this.topItems.workLocation.text = obj.workLocation  // 工作地點
            this.topItems.memberCount.text = obj.memberCount  // 實際人數

            this.licensedMember = obj.licensedMember.join('、')  // 需證照人員
            this.commonMember = obj.commonMember.join('、')  // 作業人員
            this.vendors = obj.vendors  // 外包廠商
        },
        // 退回
        withdraw() {
            this.isLoading = true
            
            // 範例效果
            setTimeout(() => {
                // 退回完後，轉頁到搜尋頁
                this.chMsgbar({ success: true, msg: '退回成功' })
                this.$router.push({ path: '/worklist/maintain' })
            }, 1000)
        },
        // 送出(維修情況)
        save() {
            if (this.$refs.form.validate()) {  // 表單驗證欄位
                if (confirm('送出後就無法修改，你確定要送出嗎?')) {
                    this.chLoadingShow()

                    // this.fixSituation
                    
                    // 範例效果
                    setTimeout(() => {
                        // 送出完後，轉頁到搜尋頁
                        this.chMsgbar({ success: true, msg: '送出成功' })
                        this.$router.push({ path: '/worklist/maintain' })
                        this.chLoadingShow()

                    }, 1000)
                }
            } else {
                if (this.ipt.fixSituation == '') this.errorSituation = 'red lighten-4'
                alert('送出失敗，請確認「維修情況」欄位是否填寫')
            }
        },
    },
    created() {
        this.fetchData()
    }
}
</script>