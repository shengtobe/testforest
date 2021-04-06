<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">行車事故事件查詢</h2>

    <v-row class="px-2 mb-8">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>發生地點
            </h3>
            <v-select
                v-model="ipt.location"
                :items="locationOpts"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>發生日期(起)
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
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="purple"
                    v-model="ipt.dateStart"
                    @input="dateMemuShow.start = false"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>發生日期(迄)
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
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="purple"
                    v-model="ipt.dateEnd"
                    @input="dateMemuShow.end = false"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>事故類型
            </h3>
            <v-select
                v-model="ipt.evtType"
                :items="evtTypeOpts"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-cellphone-link-off</v-icon>設備受損情形
            </h3>
            <v-text-field
                v-model.trim="ipt.eqLoss"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-alert-decagram</v-icon>運轉影響情形
            </h3>
            <v-text-field
                v-model.trim="ipt.serviceShock"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>處置過程
            </h3>
            <v-text-field
                v-model.trim="ipt.handle"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>檢討過程
            </h3>
            <v-text-field
                v-model.trim="ipt.review"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>原因分析
            </h3>
            <v-text-field
                v-model.trim="ipt.reason"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>備註
            </h3>
            <v-text-field
                v-model.trim="ipt.note"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>事故事件狀態
            </h3>
            <v-select
                v-model="ipt.status"
                :items="statusOpts"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12">
            <v-btn color="green" dark large class="mr-3 mb-4 mb-sm-0"
                @click="search"
            >
                <v-icon>mdi-magnify</v-icon>查詢
            </v-btn>

            <v-btn color="indigo" dark large class="mr-3 mb-4 mb-sm-0"
                to="/smis/car-accident-event/add"
            >
                <v-icon>mdi-plus</v-icon>新增
            </v-btn>

            <v-btn elevation="2" large class="mr-3 mb-4 mb-sm-0"
                @click="reset"
            >
                <v-icon>mdi-reload</v-icon>清除搜尋內容
            </v-btn>

            <v-btn color="pink" elevation="2" dark large class="mr-3 mb-4 mb-sm-0"
                target="_blank"
                to="/smis/car-accident-event/del-recovery"
            >
                <v-icon>mdi-alert-circle</v-icon>作廢復原
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
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:loading>
                        <span class="red--text subtitle-1">資料讀取中...</span>
                    </template>

                    <!-- <template v-slot:item.location="{ item }">
                        {{ locationOpts.find(ele => ele.value == item.FindLine).text }}
                        {{ (item.FindLine == 'other')? `(${item.FindLineOther})` : '' }}
                        {{ (['l1', 'l2', 'l3', 'l4'].includes(item.FindLine))? `(${item.LineK}K+${item.LineM}M)` : '' }}
                    </template> -->
                    
                    <template v-slot:item.type="{ item }">
                        {{ evtTypeOpts.find(ele => ele.value == item.AccidentType).text }}
                    </template>

                    <template v-slot:item.hurtPeople="{ item }">
                        {{ (item.HurtPeopleCount == 'F')? '未填寫' : item.hurt_people_count }}
                    </template>

                    <template v-slot:item.status="{ item }">
                        {{ accidentEventStatus.find(ele => ele.value == item.AccidentStatus).text }}
                    </template>

                    <template v-slot:item.content="{ item }">
                        <v-btn small dark fab color="teal"
                            :loading="isLoading"
                            @click="redirect(item)"
                        >
                            <v-icon dark>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

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
        <v-col cols="12" class="mt-8">
            <v-card class="mx-auto">
                <v-card-title class="yellow lighten-3 py-2 px-3">
                    <v-icon class="mr-2">mdi-chart-areaspline</v-icon>
                    <strong>統計趨勢圖</strong>
                </v-card-title>

                <v-list class="pa-0">
                    <v-list-item to="/smis/car-accident-event/maintype-chart">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        各大類事故事件趨勢圖
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/car-accident-event/majortype-chart">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        重大事故類事故事件趨勢圖
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/car-accident-event/generaltype-chart">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        一般事故類事故事件趨勢圖
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/car-accident-event/abnormaltype-chart">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        異常事件類事故事件趨勢圖
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
import { carAccidentEventStatus, evtTypes, locationOpts } from '@/assets/js/smisData'
import Pagination from '@/components/Pagination.vue'
import { fetchList } from '@/apis/smis/carAccidentEvent'

export default {
    data: () => ({
        ipt: {},
        defaultIpt: {
            location: '', // 發生地點
            dateStart:  '',  // 發生日期(起)
            dateEnd: '',  // 發生日期(迄)
            evtType: '', // 事故類型
            eqLoss: '',// 設備受損情形
            serviceShock: '', // 運轉影響情形
            handle: '', // 處置過程
            review: '', // 檢討過程
            reason: '', // 原因分析
            note: '', // 備註
            status: '',  // 事故事件狀態
        },
        dateMemuShow: {  // 日曆是否顯示
            start: false,
            end: false,
        },
        evtTypeOpts: evtTypes,  // 事故類型
        locationOpts: locationOpts,  // 事故發生地點
        statusOpts: [  // 事故事件狀態下拉選單 (審核中有二個，故傳中文值讓後端判斷)
            { text: '不限', value: '' },
            { text: '已立案', value: '已立案' },
            { text: '已完備資料', value: '已完備資料' },
            { text: '改善措施已落實', value: '改善措施已落實' },
            { text: '審核中', value: '審核中' },
        ],
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '編號', value: 'AccidentCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: 150 },
            { text: '發生日期', value: 'convert_findDate', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: 120 },
            { text: '發生地點', value: 'location', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: 160 },
            { text: '事故類型', value: 'type', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: 220 },
            { text: '傷亡人數', value: 'hurtPeople', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: 100 },
            { text: '事故事件狀態', value: 'status', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: 140 },
            { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: 100 },
        ],
        accidentEventStatus: carAccidentEventStatus,  // 表格顯示的行車事故事件狀態
        isLoading: false,  // 是否讀取中
    }),
    components: { Pagination },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
    methods: {
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 清除搜尋內容
        reset() {
            this.ipt = { ...this.defaultIpt }
        },
        // 搜尋
        search() {
            this.chLoadingShow()
            this.pageOpt.page = 1  // 頁碼初始化

            fetchList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_AccidentEventData',  // DB table
                KeyItem: [
                    { tableColumn: 'CreateDTime_Start', columnValue: this.ipt.dateStart },  // 發生日期(起)
                    { tableColumn: 'CreateDTime_End', columnValue: this.ipt.dateEnd },  // 發生日期(迄)
                ],
                QyName: [    // 欲回傳的欄位資料
                    'AccidentCode',
                    'AccidentFindDate',
                    'FindLine',
                    'LineK',
                    'LineM',
                    'FindLineOther',
                    'AccidentType',
                    'HurtPeopleCount',
                    'AccidentStatus',
                    'DelStatus',
                    'CancelStatus',
                ],
            }).then(res => {
                this.tableItems = JSON.parse(res.data.order_list)
            }).catch(err => {
                console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow()
            })
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 重新導向 (依事故事件狀態)
        redirect(item) {
            let routeData = this.$router.resolve({ path: `/smis/car-accident-event/${item.AccidentCode}/show` })
            window.open(routeData.href, '_blank')
        },
    },
    created() {
        this.reset()
    }
}
</script>