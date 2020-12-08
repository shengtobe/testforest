<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">維修、養護科工單查詢</h2>

    <v-form autocomplete="off">
        <v-row class="px-2">
            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-account</v-icon>立案人
                </h3>
                <v-text-field
                    v-model.trim="ipt.createrId"
                    solo
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-account</v-icon>派工人
                </h3>
                <v-text-field
                    v-model.trim="ipt.dispatcherId"
                    solo
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>工單建立日期(起)
                </h3>
                <v-menu
                    v-model="dateMemuShow.start"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model.trim="ipt.createDateStart"
                            solo
                            v-on="on"
                            readonly
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        color="purple"
                        v-model="ipt.createDateStart"
                        @input="dateMemuShow.start = false"
                        locale="zh-tw"
                    ></v-date-picker>
                </v-menu>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>工單建立日期(迄)
                </h3>
                <v-menu
                    v-model="dateMemuShow.end"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model.trim="ipt.createDateEnd"
                            solo
                            v-on="on"
                            readonly
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        color="purple"
                        v-model="ipt.createDateEnd"
                        @input="dateMemuShow.end = false"
                        locale="zh-tw"
                    ></v-date-picker>
                </v-menu>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>工單編號
                </h3>
                <v-text-field
                    v-model.trim="ipt.workNumber"
                    solo
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>處理階段
                </h3>
                <v-select
                    v-model="ipt.workState"
                    :items="statusOpt"
                    solo
                ></v-select>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-alert-outline</v-icon>是否缺料
                </h3>
                <v-select
                    v-model="ipt.shortage"
                    :items="[{ text: '無缺料', value: 'F' }, { text: '缺料中', value: 'T' }]"
                    solo
                ></v-select>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>維修類型
                </h3>
                <v-select
                    v-model="ipt.fixType"
                    :items="[{ text: '故障檢修', value: '1' }, { text: '例行保養', value: '2' }]"
                    solo
                ></v-select>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-currency-usd</v-icon>總費用
                </h3>
                <v-text-field
                    v-model.trim="ipt.moneyStart"
                    placeholder="請輸入最小金額"
                    solo
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3" align-self="end" class="mt-n8">
                <v-text-field
                    v-model.trim="ipt.moneyEnd"
                    placeholder="請輸入最大金額"
                    solo
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row class="px-2" align="end">
            <v-col cols="12" md="7">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-codepen</v-icon>設備標示編號
                </h3>

                <v-row>
                    <v-col cols="12" sm="3">
                        <v-text-field
                            hide-details
                            v-model="ipt.eqNumber1"
                            solo
                        ></v-text-field> 
                    </v-col>

                    <v-col cols="12" sm="3">
                        <v-text-field
                            hide-details
                            v-model="ipt.eqNumber2"
                            ref="eqNumber2"
                            solo
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="3">
                        <v-text-field
                            hide-details
                            v-model="ipt.eqNumber3"
                            ref="eqNumber3"
                            solo
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="3">
                        <v-text-field
                            hide-details
                            v-model="ipt.eqNumber4"
                            ref="eqNumber4"
                            solo
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12" class="mb-4">
                <v-btn color="green" dark large class="mr-3 mb-4 mb-sm-0"
                    @click="search"
                >
                    <v-icon>mdi-magnify</v-icon>查詢
                </v-btn>

                <v-btn color="green" dark large class="mr-3 mb-4 mb-sm-0"
                    @click="demo"
                >
                    <v-icon>mdi-magnify</v-icon>Demo
                </v-btn>

                <v-btn color="indigo" dark large class="mr-3 mb-4 mb-sm-0"
                    to="/worklist/maintain/newList"
                >
                    <v-icon>mdi-plus</v-icon>新增
                </v-btn>

                <v-btn elevation="2" large class="mr-3 mb-4 mb-sm-0"
                    @click="reset"
                >
                    <v-icon>mdi-reload</v-icon>清除搜尋內容
                </v-btn>
            </v-col>
        </v-row>

        <!-- 表格資料 -->
        <v-row class="px-2">
            <v-col cols="12" class="mt-5 mb-12">
                <v-card>
                    <v-data-table
                        :headers="headers"
                        :items="tableItems"
                        :options.sync="pageOpt"
                        disable-sort
                        disable-filtering
                        hide-default-footer
                    >
                        <template v-slot:no-data>
                            <span class="red--text subtitle-1">沒有資料</span>
                        </template>

                        <template v-slot:loading>
                            <span class="red--text subtitle-1">資料讀取中...</span>
                        </template>

                        <!-- headers 的 content 欄位 (檢視內容) -->
                        <template v-slot:item.content="{ item }">
                            <v-btn small dark fab color="teal"
                                :loading="isLoading"
                                @click="viewPage(item)"
                            >
                                <v-icon dark>mdi-file-document</v-icon>
                            </v-btn>
                        </template>

                        <!-- 頁碼 -->
                        <template v-slot:footer="footer">
                            <Pagination
                                :footer="footer"
                                :pageOpt="pageOpt"
                                @chPage="chPage"
                            />
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-form>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { fetchOrderList, fetchWorkOrderOne } from '@/apis/workList/maintain'
import Pagination from '@/components/Pagination.vue'

export default {
    data: () => ({
        ipt: {},
        defaultIpt: {  // 預設的欄位值
            createrId: '',  // 立案人
            createDateStart: '',  // 建立日期(起)
            createDateEnd: '',  // 建立日期(迄)
            dispatcherId: '',  // 派工人
            workNumber: '',  // 工單編號
            workState: '',  // 處理階段
            eqNumber1: '',  // 設備標示編號1
            eqNumber2: '',  // 設備標示編號2
            eqNumber3: '',  // 設備標示編號3
            eqNumber4: '',  // 設備標示編號4
            shortage: 'F',  // 是否缺料 (預設不缺料)
            fixType: '1',  // 維修類型
            moneyStart: '',  // 總費用(最小金額)
            moneyEnd: '',  // 總費用(最大金額)
        },
        dateMemuShow: {  // 日曆是否顯示
            start: false,
            end: false,
        },
        statusOpt: [  // 處理階段下拉選單
            { text: '不限', value: '' },
            { text: '待派工', value: '1' },
            { text: '已派工待維修', value: '2' },
            { text: '已維修待驗收', value: '3' },
            { text: '已驗收待結案', value: '4' },
            { text: '已結案', value: '5' },
        ],
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '工單編號', value: 'WorkOrderID', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '設備標示編號', value: 'MaintainCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '處理階段', value: 'Status', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
        isLoading: false,  // 是否讀取中
    }),
    components: { Pagination },  // 頁碼
    methods: {
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // demo資料
        demo() {
            this.chLoadingShow()

            // 新增測試用資料
            setTimeout(() => {
                this.tableItems = [
                    {
                        WorkOrderID: '201903110001',
                        MaintainCode: 'TRK-R06-EA0-002',
                        Status: '待派工',
                    },
                    {
                        WorkOrderID: '201903070003',
                        MaintainCode: 'TQG-A35-EA0-013',
                        Status: '已派工待維修',
                    },
                    {
                        WorkOrderID: '201902150005',
                        MaintainCode: 'TRU-E07-H03-002',
                        Status: '已維修待驗收',
                    },
                    {
                        WorkOrderID: '201903270011',
                        MaintainCode: 'TRK-U06-N11-007',
                        Status: '已驗收待結案',
                    },
                    {
                        WorkOrderID: '201901220002',
                        MaintainCode: 'JKU-Q12-G02-009',
                        Status: '已結案',
                    },
                ]
                this.chLoadingShow()
            }, 1000)
        },
        // 查詢資料
        search() {
            this.chLoadingShow()
            this.pageOpt.page = 1  // 頁碼初始化

            fetchOrderList({
                CreatorID: this.ipt.createrId,  // 立案人id
                DispatchID: this.ipt.dispatcherId,  // 派工人id
                CreateDTime_Start: this.ipt.createDateStart,  // 工單建立日期(起)
                CreateDTime_End: this.ipt.createDateEnd,  // 工單建立日期(迄)
                WorkOrderID: this.ipt.workNumber,  // 工單編號
                Status: this.ipt.workState,  // 處理階段
                Shortage: this.ipt.shortage,  // 是否缺料
                Type: this.ipt.fixType,  // 維修類型
                MaintainCode_System: this.ipt.eqNumber1,  // 設備標示編號1
                MaintainCode_Loc: this.ipt.eqNumber2,  // 設備標示編號2
                MaintainCode_Eqp: this.ipt.eqNumber3,  // 設備標示編號3
                MaintainCode_Seq: this.ipt.eqNumber4,  // 設備標示編號4
                ClientReqTime: getNowFullTime()  // client 端請求時間
            }).then(res => {
                this.tableItems = res.data.order_list
            }).catch(err => {
                console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow()
            })
        },
        // 檢視內容
        viewPage(item) {
            // 依業主要求變更檢式頁面的方式，所以改為另開分頁
            // 為避免搜尋頁的每筆資料的處理階段狀態是舊的
            // 在開分頁前都先向後端請求最新資料，依最新的處理階段狀態來決定轉頁
            this.isLoading = true

            fetchWorkOrderOne({
                WorkOrderID: item.WorkOrderID,  // 工單編號
                ClientReqTime: getNowFullTime()  // client 端請求時間
            }).then(res => {
                // 若已刪除則轉頁404
                if (res.data.DelStatus == 'T') {
                    this.$router.push({ path: '/404' })
                } else {
                    let routeData = ''
                    switch(res.data.Status) {
                        case '待派工':
                            routeData = this.$router.resolve({ path: `/worklist/maintain/${item.WorkOrderID}/listShow` })
                            break
                        case '已派工待維修':
                            routeData = this.$router.resolve({ path: `/worklist/maintain/${item.WorkOrderID}/workShow` })
                            break
                        case '已維修待驗收':
                            routeData = this.$router.resolve({ path: `/worklist/maintain/${item.WorkOrderID}/acceptingShow` })
                            break
                        case '已驗收待結案':
                            routeData = this.$router.resolve({ path: `/worklist/maintain/${item.WorkOrderID}/closedShow` })
                            break
                        case '已結案':
                            routeData = this.$router.resolve({ path: `/worklist/maintain/${item.WorkOrderID}/complated` })
                            break
                        default:
                            break
                    }
                    window.open(routeData.href, '_blank')
                }
            }).catch(err => {
                console.log(err)
                alert('伺服器發生問題，資料讀取失敗')
            }).finally(() => {
                this.isLoading = false
            })
        },
        // 清除搜尋內容
        reset() {
            this.ipt = { ...this.defaultIpt }
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        }
    },
    created() {
        this.ipt = { ...this.defaultIpt }
    },
}
</script>
