<template>
<v-row class="justify-center mt-2 mb-10">
    <v-col cols="12" sm="8">
        <v-card color="green accent-2" class="pa-2">
            <h2 class="text-center">工單編號 － {{ item.workNumber }}</h2>

            <v-sheet color="white" class="mt-2 px-6 py-4">
                <v-row>
                    <v-col cols="12" sm="6">
                        <span class="font-weight-black">報修時間：</span> {{ item.fixTime }}
                    </v-col>

                    <v-col cols="12" sm="6">
                        <span class="font-weight-black">設備報修碼：</span>
                        {{ `${item.eqNumber1}-${item.eqNumber2}-${item.eqNumber3}-${item.eqNumber4}` }}
                    </v-col>

                    <v-col cols="12" sm="6">
                        <span class="font-weight-black">立案人：</span> {{ item.creater }}
                    </v-col>

                    <v-col cols="12" sm="6">
                        <span class="font-weight-black">狀態：</span> 
                        <span class="red--text">{{ stateStr(item.status) }}</span>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <span class="font-weight-black">派工人：</span> {{ item.dispatcher }}
                    </v-col>

                    <v-col cols="12" sm="6">
                        <span class="font-weight-black">代理人：</span> {{ item.agent }}
                    </v-col>

                    <v-col cols="12" sm="6">
                        <span class="font-weight-black">維修日期：</span> {{ item.workDate }} {{ item.hour }}
                    </v-col>

                    <v-col cols="12" sm="6">
                        <span class="font-weight-black">預計驗收日：</span> {{ item.acceptanceTime }}
                    </v-col>

                    <v-col cols="12" sm="6">
                        <span class="font-weight-black">進場管制申請：</span>
                        {{ (item.enterControl)? '是' : '否' }}
                    </v-col>

                    <v-col cols="12" sm="6">
                        <span class="font-weight-black">特殊危害作業：</span>
                        {{ (item.specialDanger)? '是' : '否' }}
                    </v-col>

                    <v-col cols="12" sm="6">
                        <span class="font-weight-black">安全危害作業：</span>
                        {{ (item.safeDanger)? '是' : '否' }}
                    </v-col>

                    <v-col cols="12" sm="6">
                        <span class="font-weight-black">工作地點：</span> {{ item.workLocation }}
                    </v-col>

                    <!-- <v-col cols="12" sm="6">
                        <span class="font-weight-black">工作量：</span> {{ item.workCount }}
                    </v-col> -->

                    <v-col cols="12" sm="6">
                        <span class="font-weight-black">實際人數：</span> {{ item.memberCount }}
                    </v-col>

                    <v-col cols="12">
                        <h4>維修項目：</h4>
                        <v-sheet color="yellow lighten-3" class="mt-1 pa-4">
                        1. 查管路 <br>
                        2. 檢查輪軸 <br>
                        3. 小型保養
                        </v-sheet>
                    </v-col>

                    <v-col cols="12">
                        <h4>備註：</h4>
                        <v-sheet color="cyan lighten-4" class="mt-1 pa-4">
                        
                        </v-sheet>
                    </v-col>

                    <v-col cols="12">
                        <h4>林鐵人員：</h4>
                        <v-sheet class="light-green accent-1 py-2 px-4">
                            {{ joinMember }}
                        </v-sheet>
                    </v-col>

                    <v-col cols="12">
                        <h4>外包廠商：</h4>
                        <v-sheet class="red lighten-4 py-2 px-4">
                            {{ vendorsList }}
                        </v-sheet>
                    </v-col>

                    <v-col cols="12">
                        <h4>維修情況：</h4>
                        <v-sheet color="blue-grey lighten-5" class="mt-1 pa-4">
                        1. 更換了 xxxx 幾個、oooo 幾個<br>
                        2. 發現 xxxx 雖然堪用，但已超過使用年限
                        </v-sheet>
                    </v-col>

                    <!-- 工時、工作量統計 -->
                    <v-col cols="12">
                        <v-sheet color="purple lighten-4" class="mt-1 px-4 py-2">
                            <span class="font-weight-black">總工時：</span>
                            {{ item.totalHour }}
                        </v-sheet>
                    </v-col>

                    <v-col cols="12">
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

                                <!-- 表格最上面插入 toolbar 及 dialog -->
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
                        <v-btn dark class="float-left"
                            to="/worklist/maintain"
                        >回搜尋頁</v-btn>
                        
                        <p class="float-right mt-1 mr-1 mr-sm-6 mr-md-12">
                            總金額： <span class="red--text">{{ totalMoney }}</span>
                        </p>
                        
                    </v-col>
                </v-row>
            </v-sheet>
        </v-card>
    </v-col>
</v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data: () => ({
        item: {
            workNumber: '',  // 工單編號
            eqNumber1: '',
            eqNumber2: '',
            eqNumber3: '',
            eqNumber4: '',
            creater: '',  // 立案人
            dispatcher: '',  // 派工人
            agent: '',  // 代理人
            fixTime: '',  // 報修時間
            workDate: '',  // 維修日期
            hour: '',  // 維修時間(小時)
            workLocation: '',  // 工作地點
            // workCount: '',  // 工作量
            memberCount: 0,  // 實際人數
            acceptanceTime: '',  // 預計驗收日期
            licensedMember: [],  // 有證照人員
            commonMember: [],  // 無證照人員
            vendors: [],  // 外包廠商
            jobHours: [],  // 工時資料
            totalHour: 0,  // 總工時
            enterControl: false,  // 進場管制申請
            specialDanger: false,  // 特殊危害作業
            safeDanger: false,  // 安全危害作業
            note: '',  // 備註
            status: '',  // 狀態
        },
        headers: [  // 工時標題
            { text: '姓名', value: 'name', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
            { text: '地點', value: 'location', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
            { text: '工作項', value: 'job', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
            { text: '工作量', value: 'count', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
            { text: '料件費用', value: 'price', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
        ],
    }),
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        }
    },
    computed: {
        // 合併、組合林鐵參與人員的字串
        joinMember() {
            return this.item.licensedMember.concat(this.item.commonMember).join('、')
        },
        // 合併外包廠商字串
        vendorsList() {
            let arr = this.item.vendors.map(item => {
                return `${ item.name } (${ item.count }人)`
            })
            return arr.join('、')
        },
        // 工時統計的總金額
        totalMoney() {
            return this.item.jobHours.reduce((a,b)=>a + b.price, 0)
        }
    },
    methods: {
        ...mapActions('system', [
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
                    creater: '陳小華',  // 立案人
                    dispatcher: '黃小美',  // 派工人
                    agent: '王小明',  // 代理人
                    fixTime: '201903110001',  // 報修時間
                    workDate: '2020-03-15',  // 維修日期
                    hour: '14:00:00',  // 維修時間(小時)
                    workLocation: '115k-120k',  // 工作地點
                    // workCount: '5k',  // 工作量
                    memberCount: 12,  // 實際人數
                    acceptanceTime: '2020-03-22',  // 預計驗收日期
                    licensedMember: ['陳高文'],  // 有證照人員
                    commonMember: ['張仁宣'],  // 無證照人員
                    vendors: [  // 外包廠商
                        { name: 'XX 電子', count: 2 },
                        { name: '○○ 鋼鐵', count: 1 },
                        { name: 'XXX 工廠', count: 5 },
                    ],
                    jobHours: [  // 工時資料
                        {
                            name: '陳高文',
                            location: '115k-120k',
                            job: '壁磚舖貼',
                            count: '1', 
                            price: 19000,
                        },
                        {
                            name: '張仁宣',
                            location: '115k-120k',
                            job: '人造石板',
                            count: '1', 
                            price: 22000,
                        },
                    ],
                    totalHour: 32,  // 總工時
                    enterControl: false,  // 進場管制申請
                    specialDanger: false,  // 特殊危害作業
                    safeDanger: false,  // 安全危害作業
                    note: '',  // 備註
                    status: '5',  // 狀態
                    fixSituation: '',  // 維修情況
                }

                // 指派要呈現的資料
                this.item = Object.assign({}, obj)

                this.chLoadingShow()
            }, 1000)
        },
        // 狀態要呈現的文字 (後端還沒寫好前，暫時先這樣)
        stateStr(status) {
            switch(status) {
                case '1':  // 待派工
                    return '待派工'
                    break
                case '2':  // 已派工待維修
                    return '已派工待維修'
                    break
                case '3':  // 已維修待驗收
                    return '已維修待驗收'
                    break
                case '4':  // 已驗收待結案
                    return '已驗收待結案'
                    break
                case '5':  // 已結案
                    return '已結案'
                    break
                default:
                    break
            }
        },
    },
    created() {
        this.fetchData()
    }
}
</script>