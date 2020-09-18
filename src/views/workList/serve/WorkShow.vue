<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">工單編號：{{ routeId }}</h2>
    
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
                        <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>通報維修地點及事項
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="noticeLocation"
                ></v-col>
            </v-row>
        </v-col>

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
                        <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>外包廠商
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ vendorsList }}</v-col>
            </v-row>
        </v-col>

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

        <!-- 操作按鈕 -->
        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="ma-2"
                to="/worklist/serve"
            >回搜尋頁</v-btn>

            <v-btn class="ma-2"
                color="primary"
                :to="`/worklist/serve/${routeId}/editWork`"
            >編輯</v-btn>

            <v-btn class="ma-2"
                color="error"
                @click="dialog = true"
            >退回</v-btn>

            <v-btn dark class="ma-2"
                color="success"
                @click="save"
            >送出</v-btn>
        </v-col>
    </v-row>

    <!-- 退回 dialog -->
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
// import { fetchWorkOrderOne } from '@/apis/workList/maintain'
// import { getNowFullTime } from '@/assets/js/commonFun'
import { hourOptions, minOptions } from '@/assets/js/dateTimeOption'
import TopBasicTable from '@/components/TopBasicTable.vue'


export default {
    data: () => ({
        isLoading: false,  // 是否讀取中
        routeId: '',  // 工單編號
        topItems: {  // 上面的欄位
            year: { icon: 'mdi-calendar-text', title: '年度', text: '' },
            money: { icon: 'mdi-currency-usd', title: '預算金額', text: '' },
            expiryDate: { icon: 'mdi-calendar-text', title: '履約到期日', text: '' },
            workDateStart: { icon: 'mdi-calendar-text', title: '通知施作日(起)', text: '' },
            workDateEnd: { icon: 'mdi-calendar-text', title: '通知施作日(訖)', text: '' },
            noticeMethod: { icon: 'mdi-note', title: '通知方式', text: '' },
            noticeMember: { icon: 'mdi-account', title: '通知人', text: '' },
            creater: { icon: 'mdi-account', title: '立案人', text: '' },
            status: { icon: 'mdi-ray-vertex', title: '處理階段', text: '' },
        },
        noticeLocation: '',  // 通報維修地點及事項
        malfunctionDes: '',  // 故障描述
        note: '',  // 備註
        vendors: [],  // 外包廠商
        dateMenuShow: {  // 日曆是否顯示
            arrivalFix: false, // 到修日期
            startFix: false,  // 動工日期
            endFix: false,  // 完工日期
        },
        hourOpts: hourOptions,  // 下拉選單項目-小時
        minOpts: minOptions,  // 下拉選單項目-分鐘
        ipt: {
            arrivalFixDate: new Date().toISOString().substr(0, 10),  // 到修-日期
            arrivalFixHour: '00',  // 到修-時
            arrivalFixMin: '00',  // 到修-分
            startFixDate: new Date().toISOString().substr(0, 10),  // 動工-日期
            startFixHour: '00',  // 動工-時
            startFixMin: '00',  // 動工-分
            endFixDate: new Date().toISOString().substr(0, 10),  // 完工-日期
            endFixHour: '00',  // 完工-時
            endFixMin: '00',  // 完工-分
            fixSituation: '',  // 維修情況
        },
        dialog: false,  // 退回 dialog 是否顯示
        reason: '',  // 退回原因
    }),
    components: { TopBasicTable },
    computed: {
        // 合併外包廠商字串
        vendorsList() {
            let arr = this.vendors.map(item => {
                return `${ item.name } (${ item.count }人)`
            })
            return arr.join('、')
        }
    },
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        },
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 向後端取資料
        fetchData() {
            this.chLoadingShow()
            this.routeId = this.$route.params.id  // 路由參數

            setTimeout(() => {
                let obj = {
                    year: '109',  // 年度
                    expiryDate: '2020-12-20',  // 履約到期日
                    money: '98萬6,517',  // 預算金額
                    workDateStart: '2020-01-05',  // 通知施作日 (起)
                    workDateEnd: '2020-01-30',  // 通知施作日 (訖)
                    noticeMethod: '',  // 通知方式
                    noticeMember: '',  // 通知人
                    noticeLocation: '十字路車站上下車階梯連接通道、木構地坪設置',  // 通報維修地點及事項
                    items: [  // 請修項目
                        {
                            numbers: '1、1',
                            name: '維修大工',
                            spec: '',
                            unit: '人*日',
                            count: 1,
                            price: 2230
                        },
                        {
                            numbers: '1、2',
                            name: '維修小工',
                            spec: '',
                            unit: '人*日',
                            count: 2,
                            price: 1962
                        },
                    ],
                    malfunctionDes: '文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明',  // 故障描述
                    note: '',  // 備註
                    vendors: [  // 外包廠商
                        { name: '陽明鐵工廠', count: 5 },
                    ],
                    creater: '王小明',  // 立案人
                    status: '已派工待維修',  // 處理階段
                }

                this.setShowData(obj)  // 初始化資料
                this.chLoadingShow()
            }, 1000)
        },
        // 初始化資料
        setShowData(obj) {
            this.noticeLocation = obj.noticeLocation.replace(/\n/g, '<br>')  // 通報維修地點及事項
            this.malfunctionDes = obj.malfunctionDes.replace(/\n/g, '<br>')  // 故障描述
            this.note = obj.note.replace(/\n/g, '<br>')  // 備註
            this.vendors = obj.vendors  // 外包廠商

            // 設定上面的欄位資料
            this.topItems.year.text = obj.year  // 年度
            this.topItems.money.text = obj.money  // 預算金額
            this.topItems.expiryDate.text = obj.expiryDate  // 履約到期日
            this.topItems.workDateStart.text = obj.workDateStart  // 通知施作日 (起)
            this.topItems.workDateEnd.text = obj.workDateEnd  // 通知施作日 (訖)
            this.topItems.noticeMethod.text = obj.noticeMethod  // 通知方式
            this.topItems.noticeMember.text = obj.noticeMember  // 通知人
            this.topItems.creater.text = obj.creater  // 立案人
            this.topItems.status.text = obj.status  // 處理階段
        },
        // 退回
        withdraw() {
            this.isLoading = true
            
            // 範例效果
            setTimeout(() => {
                // 退回完後，轉頁到搜尋頁
                this.chMsgbar({ success: true, msg: '退回成功' })
                this.$router.push({ path: '/worklist/serve' })
            }, 1000)
        },
        // 送出
        save() {
            // if (this.$refs.form.validate()) {  // 表單驗證欄位
                if (confirm('送出後就無法修改，你確定要送出嗎?')) {
                    this.chLoadingShow()
                    
                    // 範例效果
                    setTimeout(() => {
                        // 送出完後，轉頁到搜尋頁
                        this.chMsgbar({ success: true, msg: '送出成功' })
                        this.$router.push({ path: '/worklist/serve' })
                        this.chLoadingShow()

                    }, 1000)
                }
            // }
        },
    },
    created() {
        this.fetchData()
    }
}
</script>