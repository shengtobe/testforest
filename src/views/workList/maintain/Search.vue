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

            <v-col cols="12" md="6">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>故障主旨
                </h3>
                <v-text-field
                    v-model.trim="ipt.subject"
                    solo
                ></v-text-field>
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

        <v-row class="px-2">
            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-alert-outline</v-icon>是否徹銷
                </h3>
                <v-select
                    v-model="ipt.cancel"
                    :items="[{ text: '未徹銷', value: 'F' }, { text: '已徹銷', value: 'T' }]"
                    solo
                ></v-select>
            </v-col>

            <v-col cols="12" md="7">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-codepen</v-icon>設備標示編號
                </h3>

                <v-row no-gutters>
                    <v-col cols="12" sm="3" class="mb-3 mb-sm-0 pr-sm-3">
                        <v-text-field
                            hide-details
                            v-model="ipt.eqNumber1"
                            solo
                            placeholder="系統"
                        ></v-text-field> 
                    </v-col>

                    <v-col cols="12" sm="3" class="mb-3 mb-sm-0 pr-sm-3">
                        <v-text-field
                            hide-details
                            v-model="ipt.eqNumber2"
                            ref="eqNumber2"
                            solo
                            placeholder="位置"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="3" class="mb-3 mb-sm-0 pr-sm-3">
                        <v-text-field
                            hide-details
                            v-model="ipt.eqNumber3"
                            ref="eqNumber3"
                            solo
                            placeholder="設備"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="3" class="mb-3 mb-sm-0 pr-sm-3">
                        <v-text-field
                            hide-details
                            v-model="ipt.eqNumber4"
                            ref="eqNumber4"
                            solo
                            placeholder="序號"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12" class="mb-4">
                <v-btn dark large class="mr-3 mb-4 mb-sm-0 btn-search"
                    @click="search"
                >
                    <v-icon>mdi-magnify</v-icon>查詢
                </v-btn>

                <v-btn color="indigo" dark large class="mr-3 mb-4 mb-sm-0 btn-add"
                    to="/worklist/maintain/newList"
                >
                    <v-icon>mdi-plus</v-icon>新增
                </v-btn>

                <v-btn elevation="2" large class="mr-3 mb-4 mb-sm-0 btn-clear"
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
                        class="theme-table"
                    >
                        <template v-slot:no-data>
                            <span class="red--text subtitle-1">沒有資料</span>
                        </template>

                        <template v-slot:loading>
                            <span class="red--text subtitle-1">資料讀取中...</span>
                        </template>

                        <template v-slot:item.Status="{ item }">
                            <span>{{ statusOpt.find(ele => ele.value == item.Status).text }}</span>
                        </template>

                        <!-- headers 的 content 欄位 (檢視內容) -->
                        <template v-slot:item.content="{ item }">
                            <v-btn small dark fab color="teal" class="btn-detail"
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
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { maintainStatusOpts } from '@/assets/js/workList'
import { fetchOrderList, fetchWorkOrderOne } from '@/apis/workList/maintain'
import { checkEnter } from '@/apis/access'
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
            cancel: 'F',  // 是否徹銷
            fixType: '1',  // 維修類型
            moneyStart: '',  // 總費用(最小金額)
            moneyEnd: '',  // 總費用(最大金額)
            subject: '',  // 故障主旨
        },
        dateMemuShow: {  // 日曆是否顯示
            start: false,
            end: false,
        },
        statusOpt: maintainStatusOpts,  // 處理階段下拉選單
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '工單編號', value: 'WorkOrderID', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '故障主旨', value: 'WorkSubject', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '處理階段', value: 'Status', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        ],
        isLoading: false,  // 是否讀取中
    }),
    components: { Pagination },  // 頁碼
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
    methods: {
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 查詢資料
        search() {
            
            this.chLoadingShow()
            this.pageOpt.page = 1  // 頁碼初始化

            fetchOrderList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'MMIS_WorkerOrder',  // DB table
                KeyItem: [
                    { tableColumn: 'CreatorID', columnValue: this.ipt.createrId },  // 立案人id
                    { tableColumn: 'DispatchID', columnValue: this.ipt.dispatcherId },  // 派工人id
                    { tableColumn: 'CreateDTime_Start', columnValue: this.ipt.createDateStart },  // 工單建立日期(起)
                    { tableColumn: 'CreateDTime_End', columnValue: this.ipt.createDateEnd },  // 工單建立日期(迄)
                    { tableColumn: 'WorkOrderID', columnValue: this.ipt.workNumber },  // 工單編號
                    { tableColumn: 'Status', columnValue: this.ipt.workState },  // 處理階段
                    { tableColumn: 'Shortage', columnValue: this.ipt.shortage },  // 是否缺料
                    { tableColumn: 'Type', columnValue: this.ipt.fixType },  // 維修類型
                    { tableColumn: 'WorkSubject', columnValue: this.ipt.subject },  // 故障主旨
                    { tableColumn: 'CancelStatus', columnValue: this.ipt.cancel },  // 是否徹銷
                    { tableColumn: 'MaintainCode_System', columnValue: this.ipt.eqNumber1 },  // 設備標示編號1
                    { tableColumn: 'MaintainCode_Loc', columnValue: this.ipt.eqNumber2 },  // 設備標示編號2
                    { tableColumn: 'MaintainCode_Eqp', columnValue: this.ipt.eqNumber3 },  // 設備標示編號3
                    { tableColumn: 'MaintainCode_Seq', columnValue: this.ipt.eqNumber4 },  // 設備標示編號4
                ],
                QyName: [    // 欲回傳的欄位資料
                    'WorkOrderID',
                    'WorkSubject',
                    'Status'
                ],
            }).then(res => {
                this.tableItems = JSON.parse(res.data.order_list)
                this.tableItems.forEach(element => {
                    for(let ele in element){
                        if(element[ele] == null){
                            element[ele] = '';
                        }
                    }
                });
            }).catch(err => {
                console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow()
            })
        },
        // 檢視內容
        viewPage(item) {
            console.log("item: ", item);
            let routeData = this.$router.resolve({ path: `/worklist/maintain/${item.WorkOrderID}/show` })
            window.open(routeData.href, '_blank')
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
