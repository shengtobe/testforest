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
                <v-icon class="mr-1 mb-1">mdi-cellphone-link-off</v-icon>設備損失
            </h3>
            <v-text-field
                v-model.trim="ipt.eqLoss"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-alert-decagram</v-icon>營運衝擊
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

        <v-col cols="12" md="9" class="text-md-right" align-self="center">
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
                <v-icon class="mr-1">mdi-reload</v-icon>重置
            </v-btn>

            <v-btn color="pink" elevation="2" dark large class="mr-3 mb-4 mb-sm-0"
                to="/smis/car-accident-event/del-recovery"
            >
                <v-icon class="mr-1">mdi-alert-circle</v-icon>作廢復原
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

                    <template v-slot:item.content="{ item }">
                        <v-btn small dark fab color="teal"
                            @click="redirect(item)"
                        >
                            <v-icon dark>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.status="{ item }">
                        {{ transferStatusText(item.status) }}
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
        <v-col cols="12">
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
import { mapActions } from 'vuex'
import { evtTypes, locationOpts } from '@/assets/js/smisData'
import Pagination from '@/components/Pagination.vue'
import { carEventItems } from '@/assets/js/smisTestData'

export default {
    data: () => ({
        ipt: {},
        defaultIpt: {
            location: '', // 發生地點
            evtType: '', // 事故類型
            eqLoss: '',// 設備損失
            serviceShock: '', // 營運衝擊
            handle: '', // 處置過程
            review: '', // 檢討過程
            reason: '', // 原因分析
            note: '', // 備註
            status: '已立案',  // 事故事件狀態
        },
        evtTypeOpts: evtTypes,
        locationOpts: locationOpts,
        statusOpts: [  // 事故事件狀態下拉選單
            '已立案',
            '已完備資料',
            '改善措施已落實',
            '審核中',
        ],
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '發生日期', value: 'date', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '發生地點', value: 'location', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '事故類型', value: 'evtType', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '傷亡人數', value: 'deathCount', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '事故事件狀態', value: 'status', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
    }),
    components: { Pagination },
    methods: {
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 重置
        reset() {
            this.ipt = { ...this.defaultIpt }
        },
        // 搜尋
        search() {
            this.chLoadingShow()
            this.pageOpt.page = 1  // 頁碼初始化

            // 新增測試用資料
            setTimeout(() => {
                this.tableItems = [ ...carEventItems ]
                this.chLoadingShow()
            }, 1000)
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 轉換事故事件狀態文字
        transferStatusText(status) {
            switch(status) {
                case 1:
                    return '已立案'
                    break
                case 2:  // 審核完備資料
                    return '審核中'
                    break
                case 3:
                    return '已完備資料'
                    break
                case 4:  // 審核措施落實
                    return '審核中'
                    break
                case 5:
                    return '改善措施已落實'
                    break
                default:
                    break
            }
        },
        // 重新導向 (依事故事件狀態)
        redirect(item) {
            switch(item.status) {
                case 1:  // 已立案
                    this.$router.push({ path: `/smis/car-accident-event/${item.id}/show` })
                    break
                case 2:  // 審核中 (審核完備資料)
                    this.$router.push({ path: `/smis/car-accident-event/${item.id}/review` })
                    break
                case 3:  // 已完備資料
                    this.$router.push({ path: `/smis/car-accident-event/${item.id}/complated` })
                    break
                case 4: // 審核中 (審核措施落實)
                    this.$router.push({ path: `/smis/car-accident-event/${item.id}/fulfill-review` })
                    break
                case 5: // 改善措施已落實
                    this.$router.push({ path: `/smis/car-accident-event/${item.id}/fulfill-complated` })
                    break
                default:
                    break
            }
        },
    },
    created() {
        this.reset()
    }
}
</script>