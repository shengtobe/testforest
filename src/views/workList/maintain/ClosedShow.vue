<template>
<v-container>
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
    </v-row>

    <v-row>
        <!-- <v-col cols="12">
            <v-card elevation="3">
                <v-data-table
                    :headers="headers"
                    :items="item.jobHours"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:top>
                        <v-toolbar dark flat dense color="teal">
                            <v-icon class="mr-2">mdi-timelapse</v-icon>
                            <v-toolbar-title>工時統計</v-toolbar-title>
                        </v-toolbar>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>

        <v-col cols="12" class="text-center mb-2">
            總金額： <span class="red--text">{{ totalMoney }}</span>
        </v-col> -->

        <v-col cols="12" class="text-center">
            <v-btn dark class="ma-2"
                :loading="isLoading"
                to="/worklist/maintain"
            >回搜尋頁</v-btn>

            <v-btn class="ma-2" dark
                :loading="isLoading"
                color="brown"
            >竣工單</v-btn>

            <v-btn class="ma-2"
                :loading="isLoading"
                color="error"
                @click="showDialog(true)"
            >退回</v-btn>

            <v-btn class="ma-2" dark
                :loading="isLoading"
                color="yellow darken-2"
                @click="showDialog(false)"
            >徹銷</v-btn>

            <v-btn dark class="ma-2"
                :loading="isLoading"
                color="success"
                @click="save"
            >結案</v-btn>
        </v-col>

        <!-- 按鈕說明，demo 用 -->
        <v-col cols="12" class="error--text">
            <h4>按鈕出現說明</h4>
            竣工單、退回、徹銷、結案：結案人
        </v-col>
    </v-row>

    <!-- 退回 dialog -->
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-toolbar dark flat dense color="error" class="mb-2">
                <v-toolbar-title>{{ dialogTitle }}</v-toolbar-title>
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
import TopBasicTable from '@/components/TopBasicTable.vue'

export default {
    data: () => ({
        isLoading: false,  // 是否讀取中
        workNumber: '',  // 工單編號
        note: '',  // 備註
        licensedMember: '',  // 需證照人員
        commonMember: '',  // 作業人員
        vendors: [],  // 外包廠商
        malfunctionDes: '',  // 故障描述
        fixSituation: '',  // 維修情況
        dialog: false,  // dialog 是否顯示
        dialogTitle: '',  // dialog 標題
        dialogApiName: '',  // 使用的 API 函式名稱
        reason: '',  // 退回或徹銷原因
        dialogReturnMsg: '',  // 退回或徹銷時成功的訊息 (demo 時用)
        headers: [  // 工時標題
            { text: '姓名', value: 'name', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
            { text: '地點', value: 'location', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
            { text: '工作項', value: 'job', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
            { text: '工作量', value: 'count', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
            { text: '料件費用', value: 'price', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
        ],
        topItems: {  // 上面的欄位
            fixTime: { icon: 'mdi-calendar-text', title: '報修時間', text: '' },
            eqCodes: { icon: 'mdi-codepen', title: '設備報修碼', text: '' },
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
            arrivalFixDate: { icon: 'mdi-calendar-text', title: '到修日期', text: '' },
            startFixDate: { icon: 'mdi-calendar-text', title: '動工日期', text: '' },
            endFixDate: { icon: 'mdi-calendar-text', title: '完工日期', text: '' },
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
        },
        // 工時統計的總金額
        // totalMoney() {
        //     let total = this.jobHour.items.reduce((a,b)=>a + b.price, 0)
        //     return new Intl.NumberFormat().format(total)
        // }
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 向後端取資料
        fetchData() {
            this.chLoadingShow()
            let id = this.$route.params.id  // 路由參數

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
                    arrivalFixDate: '2020-03-15 14:00:00',  // 到修日期
                    startFixDate: '2020-03-15 15:00:00',  // 動工日期
                    endFixDate: '2020-03-15 16:00:00',  // 完工日期
                    licensedMember: ['陳高文'],  // 有證照人員
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
                    note: '',  // 備註
                    status: '已維修待驗收',  // 狀態
                    fixSituation: '小零件損壞，更換了xxxx',  // 維修情況
                    fixType: '故障檢修',  // 維修類型
                }

                this.setShowData(obj)  // 初始化資料
                this.chLoadingShow()
            }, 1000)
        },
        // jobHours: [  // 工時資料
        //                 {
        //                     name: '陳高文',
        //                     location: '115k-120k',
        //                     job: '壁磚舖貼',
        //                     count: '1', 
        //                     price: 19000,
        //                 },
        //                 {
        //                     name: '張仁宣',
        //                     location: '115k-120k',
        //                     job: '人造石板',
        //                     count: '1', 
        //                     price: 22000,
        //                 },
        //             ],
        // 初始化資料
        setShowData(obj) {
            this.workNumber = obj.workNumber  // 工單編號
            this.malfunctionDes = obj.malfunctionDes.replace(/\n/g, '<br>')  // 故障描述
            this.note = obj.note.replace(/\n/g, '<br>')  // 備註
            this.fixSituation = obj.fixSituation.replace(/\n/g, '<br>')  // 維修情況

            // 設定上面的欄位資料
            this.topItems.fixTime.text = obj.fixTime  // 報修時間
            this.topItems.eqCodes.text = `${obj.eqNumber1}-${obj.eqNumber2}-${obj.eqNumber3}-${obj.eqNumber4}`  // 設備報修碼
            this.topItems.status.text = obj.status  // 處理階段
            this.topItems.fixUnit.text = obj.fixUnit  // 請修單位
            this.topItems.creater.text = obj.creater  // 立案人
            this.topItems.dispatcher.text = obj.dispatcher  // 派工人
            this.topItems.agent.text = obj.agent  // 代理人
            this.topItems.fixType.text = obj.fixType  // 維修類型
            this.topItems.workDate.text = `${obj.workDate} ${obj.hour}`  // 維修日期
            this.topItems.acceptanceTime.text = obj.acceptanceTime  // 預計驗收日期
            this.topItems.enterControl.text = (obj.enterControl)? '是' : '否'  // 進場管制申請
            this.topItems.specialDanger.text = (obj.specialDanger)? '是' : '否'  // 特殊危害作業
            this.topItems.safeDanger.text = (obj.safeDanger)? '是' : '否'  // 安全危害作業
            this.topItems.workLocation.text = obj.workLocation  // 工作地點
            this.topItems.memberCount.text = obj.memberCount  // 實際人數
            this.topItems.arrivalFixDate.text = obj.arrivalFixDate  // 到修日期
            this.topItems.startFixDate.text = obj.startFixDate  // 動工日期
            this.topItems.endFixDate.text = obj.endFixDate  // 完工日期

            this.licensedMember = obj.licensedMember.join('、')  // 需證照人員
            this.commonMember = obj.commonMember.join('、')  // 作業人員
            this.vendors = obj.vendors  // 外包廠商

            // 工時表單初始化
            // this.jobHour.items = this.jobMemberOpts.map(item => ({
            //     'uid': item.value,
            //     'name': item.text,
            //     'location': obj.workLocation,
            //     'job': '',
            //     'count': 1, 
            //     'price': 0,
            // }))
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
                this.$router.push({ path: '/worklist/maintain' })
            }, 1000)
        },
        // 確定結案
        save() {
            this.isLoading = true

            // 範例效果
            setTimeout(() => {
                // 成功時，轉頁到搜尋頁
                this.chMsgbar({ success: true, msg: '結案成功' })
                this.$router.push({ path: '/worklist/maintain' })
            }, 1000)
        },
    },
    created() {
        this.fetchData()
    }
}
</script>