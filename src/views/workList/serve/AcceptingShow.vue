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

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-wrench</v-icon>維修情況
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="fixSituation"
                ></v-col>
            </v-row>
        </v-col>

        <!-- 總工時 -->
        <v-col cols="12" sm="6" md="3" class="mt-8">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-clock</v-icon>總工時
                <span class="red--text">*</span>
            </h3>
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
                <v-text-field
                    v-model.trim="totalHour"
                    solo
                    placeholder="請輸入總工時，例如：5"
                    :rules="[v => /^\d+$/.test(v) || '請輸入整數']"
                ></v-text-field>
            </v-form>
        </v-col>
        
        <!-- 操作按鈕 -->
        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="ma-2"
                to="/worklist/serve"
            >回搜尋頁</v-btn>

            <v-btn class="ma-2" dark
                color="brown"
            >竣工單</v-btn>

            <v-btn class="ma-2" dark
                color="purple"
                @click="delay.dialogShow = true"
            >延後驗收</v-btn>

            <v-btn class="ma-2"
                color="error"
                @click="showDialog(true)"
            >退回</v-btn>

            <v-btn class="ma-2" dark
                color="yellow darken-2"
                @click="showDialog(false)"
            >徹銷</v-btn>

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

    <!-- 延後驗收 dialog -->
    <v-dialog v-model="delay.dialogShow" max-width="600px">
        <v-card>
            <v-toolbar dark flat dense color="purple" class="mb-2">
                <v-toolbar-title>延後驗收</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn fab small text @click="delay.dialogShow = false" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-menu
                            v-model="delay.menuShow"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    label="新驗收日"
                                    v-model="delay.newDate"
                                    v-on="on"
                                    hide-details
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                color="purple"
                                v-model="delay.newDate"
                                @input="delay.menuShow = false"
                                locale="zh-tw"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>

                    <v-col cols="12" sm="6" md="4" offset-md="2">
                        <v-checkbox
                            v-model="delay.shortage"
                            label="缺料"
                            color="red darken-3"
                            hide-details
                        ></v-checkbox>
                    </v-col>
                    
                    <v-col cols="12">
                        <v-textarea
                            label="延後原因"
                            hide-details
                            auto-grow
                            outlined
                            rows="6"
                            v-model.trim="delay.reason"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            
            <v-card-actions class="px-5 pb-5">
                <v-spacer></v-spacer>
                <v-btn class="mr-2" elevation="4" :loading="isLoading" @click="delay.dialogShow = false">取消</v-btn>
                <v-btn color="success"  elevation="4" :loading="isLoading" @click="delaySave">送出</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
// import { fetchWorkOrderOne } from '@/apis/workList/maintain'
// import { getNowFullTime } from '@/assets/js/commonFun'
import TopBasicTable from '@/components/TopBasicTable.vue'


export default {
    data: () => ({
        isLoading: false,  // 是否讀取中
        valid: false,  // 是否驗證欄位 (方便測試先取消)
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
            arrivalFixDate: { icon: 'mdi-calendar-text', title: '到修日期', text: '' },
            startFixDate: { icon: 'mdi-calendar-text', title: '動工日期', text: '' },
            endFixDate: { icon: 'mdi-calendar-text', title: '完工日期', text: '' },
        },
        noticeLocation: '',  // 通報維修地點及事項
        malfunctionDes: '',  // 故障描述
        note: '',  // 備註
        vendors: [],  // 外包廠商
        totalHour: '',  // 總工時
        dialog: false,  // dialog 是否顯示
        dialogTitle: '',  // dialog 標題
        dialogApiName: '',  // 使用的 API 函式名稱
        reason: '',  // 退回或徹銷原因
        dialogReturnMsg: '',  // 退回或徹銷時成功的訊息 (demo 時用)
        delay: {  // 延後驗收
            dialogShow: false,
            menuShow: false,  // 日期選單是否顯示
            reason: '',  // 原因
            newDate: new Date().toISOString().substr(0, 10),  // 新驗收日
            shortage: false,  // 是否缺料
        },
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
                    arrivalFixDate: '2020-03-15 14:00:00',  // 到修日期
                    startFixDate: '2020-03-15 15:00:00',  // 動工日期
                    endFixDate: '2020-03-15 16:00:00',  // 完工日期
                    fixSituation: '維修說明文字維修說明文字維修說明文字維修說明文字維修說明文字維修說明文字',  // 維修情況
                    creater: '王小明',  // 立案人
                    status: '已維修待驗收',  // 處理階段
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
            this.fixSituation = obj.fixSituation.replace(/\n/g, '<br>')  // 維修情況

            // 設定上面的欄位資料
            this.topItems.year.text = obj.year  // 年度
            this.topItems.money.text = obj.money  // 預算金額
            this.topItems.expiryDate.text = obj.expiryDate  // 履約到期日
            this.topItems.workDateStart.text = obj.workDateStart  // 通知施作日 (起)
            this.topItems.workDateEnd.text = obj.workDateEnd  // 通知施作日 (訖)
            this.topItems.noticeMethod.text = obj.noticeMethod  // 通知方式
            this.topItems.noticeMember.text = obj.noticeMember  // 通知人
            this.topItems.arrivalFixDate.text = obj.arrivalFixDate  // 到修日期
            this.topItems.startFixDate.text = obj.startFixDate  // 動工日期
            this.topItems.endFixDate.text = obj.endFixDate  // 完工日期
            this.topItems.creater.text = obj.creater  // 立案人
            this.topItems.status.text = obj.status  // 處理階段
        },
        // 顯示 dialog
        showDialog(bool) {
            // 若為 true 是退回、false 是徹銷
            this.dialogTitle = (bool)? '退回原因' : '徹銷原因'
            this.dialogApiName = (bool)? 'api1' : 'api2'
            this.dialogReturnMsg = (bool)? '退回成功' : '徹銷成功'
            this.dialog = true
        },
        // 退回、徹銷
        withdraw() {
            this.isLoading = true

            // 由 this.dialogApiName 來判斷要傳送的 API
            
            // 範例效果
            setTimeout(() => {
                // 退回完後，轉頁到搜尋頁
                this.chMsgbar({ success: true, msg: this.dialogReturnMsg })
                this.$router.push({ path: '/worklist/serve' })
            }, 1000)
        },
        // 延後驗收送出
        delaySave() {
            this.isLoading = true

            // 範例效果
            setTimeout(() => {
                // 延後驗收完後，轉頁到搜尋頁
                this.chMsgbar({ success: true, msg: '延後驗收成功' })
                this.$router.push({ path: '/worklist/serve' })
            }, 1000)
        },
        // 送出 (確定驗收)
        save() {
            // if (this.$refs.form.validate()) {  // 表單驗證欄位
                if (confirm('你確定要完成驗收嗎?')) {
                    this.chLoadingShow()
                    
                    // 範例效果
                    setTimeout(() => {
                        // 驗收完後，轉頁到搜尋頁
                        this.chMsgbar({ success: true, msg: '驗收成功' })
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