<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">管理危害通報</h2>

    <v-row class="px-2 mb-8">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>通報日期(起)
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
                        v-model.trim="ipt.dateStart"
                        solo
                        v-on="on"
                        readonly
                        clearable
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="primary"
                    v-model="ipt.dateStart"
                    @input="dateMemuShow.start = false"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>通報日期(迄)
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
                        v-model.trim="ipt.dateEnd"
                        solo
                        v-on="on"
                        readonly
                        clearable
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="primary"
                    v-model="ipt.dateEnd"
                    @input="dateMemuShow.end = false"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>通報狀態
            </h3>
            <v-select
                v-model="ipt.status"
                :items="statusOpts"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3" align-self="center" class="mb-8 mb-md-0">
            <v-btn class="btn-search" dark large
                @click="search(false)"
            >
                <v-icon>mdi-magnify</v-icon>查詢
            </v-btn>
        </v-col>
        
        <!-- 表格資料 -->
        <v-col cols="12">
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

                    <template v-slot:item.ReportStatus="{ item }">
                            <span>{{ statusOpts.find(ele => ele.value == item.ReportStatus).text }}</span>
                        </template>

                    <!-- headers 的 content 欄位 (檢視內容) -->
                    <template v-slot:item.content="{ item }">
                        <v-btn small dark fab class="btn-detail"
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

        <!-- 趨勢圖 -->
        <v-col cols="12" v-if="false">
            <v-card class="mx-auto">
                <v-card-title class="gradual-bg-darken-wood py-2 px-3">
                    <v-icon class="mr-2">mdi-chart-areaspline</v-icon>
                    <strong>統計趨勢圖</strong>
                </v-card-title>

                <v-list class="pa-0">
                    <v-list-item to="/smis/harmnotify/case-type">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        立案類型統計圖
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/harmnotify/department-notify">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        各部門通報次數趨勢圖
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/harmnotify/type-notify">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        各類通報趨勢圖
                    </v-list-item>
                </v-list>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { harmNotifyStatus } from '@/assets/js/smisData'
import Pagination from '@/components/Pagination.vue'
import { fetchList } from '@/apis/smis/harmNotify'

export default {
    data: () => ({
        ipt: {
            dateStart:  '',  // 通報日期(起)
            dateEnd: '',  // 通報日期(迄)
            status: '',  // 通報狀態
        },
        dateMemuShow: {  // 日曆是否顯示
            start: false,
            end: false,
        },
        statusOpts: harmNotifyStatus,  // 狀態下拉選單
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '通報日期', value: 'convert_findDate', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '通報人', value: 'PeopleName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '通報主旨', value: 'ReportTitle', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '通報狀態', value: 'ReportStatus', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        ],
        isLoading: false,  // 是否讀取中
    }),
    components: { Pagination },  // 頁碼
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
            groupData: state => state.groupData,  //
        }),
    },
    methods: {
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        clickDate(){
        },
        // 搜尋 (參數的布林值代表是不是直接抓最新五筆，用於一進入此頁面時)
        search(bool) {
            this.chLoadingShow({show:true})
            console.log("進入危害查詢動作");
            this.pageOpt.page = 1  // 頁碼初始化
            // 如果null要改空字串
            if(this.ipt.dateStart == null) this.ipt.dateStart = ''
            if(this.ipt.dateEnd == null) this.ipt.dateEnd = ''

            fetchList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_ReportData',  // DB table
                KeyItem: [
                    { tableColumn: 'CreateDTime_Start', columnValue: this.ipt.dateStart },  // 通報日期(起)
                    { tableColumn: 'CreateDTime_End', columnValue: this.ipt.dateEnd },  // 通報日期(迄)
                    { tableColumn: 'ReportStatus', columnValue: this.ipt.status },  // 狀態
                ],
                QyName: [    // 欲回傳的欄位資料
                    'EndangerID',
                    'EndangerFindDate',
                    'PeopleName',
                    'ReportTitle',
                    'ReportStatus',
                ],
                IsFirstLoad: (bool)? 'T' : 'F',
            }).then(res => {
                this.tableItems = JSON.parse(res.data.order_list)
                this.tableItems.forEach(element => {
                    for(let ele in element){
                        if(element[ele] == null){
                            element[ele] = '';
                        }
                    }
                });
                console.log("危害通報查詢 搜尋 table填完");
            }).catch(err => {
                console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow({show:false})
            })
        },
        // 檢視內容
        viewPage(item) {
            let routeData = this.$router.resolve({ path: `/smis/harmnotify/${item.EndangerID}/show` })
            window.open(routeData.href, '_blank')
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
    },
    created() {
        console.log("進入危害通報查詢");
        this.search(true)
    },
}
</script>