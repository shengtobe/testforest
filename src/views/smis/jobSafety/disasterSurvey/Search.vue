<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">職災事故事件查詢</h2>

    <v-row class="px-2 mb-8">
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
                        v-model.trim="searchIpt.dateStart"
                        solo
                        v-on="on"
                        readonly
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="purple"
                    v-model="searchIpt.dateStart"
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
                        v-model.trim="searchIpt.dateEnd"
                        solo
                        v-on="on"
                        readonly
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="purple"
                    v-model="searchIpt.dateEnd"
                    @input="dateMemuShow.end = false"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-account</v-icon>罹災者姓名
            </h3>
            <v-text-field
                v-model.trim="searchIpt.name"
                solo
                placeholder="請輸入性名"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-bank</v-icon>工作部門
            </h3>
            <v-select
                v-model="searchIpt.workDepart"
                :items="opts.depart"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-code</v-icon>事故編號
            </h3>
            <v-text-field
                v-model.trim="searchIpt.number"
                solo
                placeholder="請輸入事故編號"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>事故狀態
            </h3>
            <v-select
                v-model="searchIpt.status"
                :items="opts.status"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12">
            <v-btn color="green" dark large class="ma-2"
                @click="search"
            >
                <v-icon class="mr-1">mdi-magnify</v-icon>查詢
            </v-btn>

            <v-btn elevation="2" large class="ma-2"
                @click="reset"
            >
                <v-icon class="mr-1">mdi-reload</v-icon>清除搜尋內容
            </v-btn>

            <v-btn color="amber lighten-3" elevation="2" large class="ma-2"
                to="/smis/jobsafety/month-record"
            >
                <v-icon class="mr-1">mdi-view-list</v-icon>職災紀錄表
            </v-btn>
        </v-col>

        <!-- 表格資料 -->
        <v-col cols="12" class="mt-8">
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

                    <template v-slot:item.status="{ item }">
                        {{ transferStatusText(item.status) }}
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
    </v-row>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { dapartOptsBrief } from '@/assets/js/departOption'
import Pagination from '@/components/Pagination.vue'

export default {
    data: () => ({
        searchIpt: {},
        searchDefault: {
            dateStart: '',  // 發生日期(起)
            dateEnd: '',  // 發生日期(迄)
            name: '',  // 罹災者姓名
            workDepart: '嘉義車站',  // 工作部門
            number: '',  // 事故編號
            status: '',  // 事故狀態
        },
        dateMemuShow: {
            start: false,
            end: false,
        },
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '工作部門', value: 'workDepart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '罹災者姓名', value: 'name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '發生日期', value: 'date', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '狀態', value: 'status', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
        opts: {
            depart: dapartOptsBrief,  // 部門
            status: [  // 事故事件狀態 (審核中有二個，故傳中文值讓後端判斷)
                { text: '不限', value: '' },
                { text: '已立案', value: '已立案' },
                { text: '已完備資料', value: '已完備資料' },
                { text: '改善措施已落實', value: '改善措施已落實' },
                { text: '審核中', value: '審核中' },
                { text: '已作廢', value: '已作廢' },
            ],
        },
        isLoading: false,  // 是否讀取中
    }),
    components: { Pagination },
    methods: {
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 清除搜尋內容
        reset() {
            this.searchIpt = { ...this.searchDefault }
        },
        // 搜尋
        search() {
            this.chLoadingShow()
            this.pageOpt.page = 1  // 頁碼初始化

            // 新增測試用資料
            setTimeout(() => {
                this.tableItems = [
                    {
                        id: '2020090501',
                        workDepart: '阿里山車站',
                        name: '王小明',
                        date: '2020-08-23',
                        status: 1,
                    },
                    {
                        id: '2020090501',
                        workDepart: '阿里山車站',
                        name: '王小明',
                        date: '2020-08-23',
                        status: 2,
                    },
                    {
                        id: '2020090501',
                        workDepart: '阿里山車站',
                        name: '王小明',
                        date: '2020-08-23',
                        status: 3,
                    },
                    {
                        id: '2020090501',
                        workDepart: '阿里山車站',
                        name: '王小明',
                        date: '2020-08-23',
                        status: 4,
                    },
                    {
                        id: '2020090501',
                        workDepart: '阿里山車站',
                        name: '王小明',
                        date: '2020-08-23',
                        status: 5,
                    },
                ]
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
        // 重新導向 (依結案狀態)
        redirect(item) {
            switch(item.status) {
                case 1:  // 已立案
                    sessionStorage.itemStatus = '1'
                    break
                case 2:  // 審核中 (審核完備資料)
                    sessionStorage.itemStatus = '2'
                    break
                case 3:  // 已完備資料
                    sessionStorage.itemStatus = '3'
                    break
                case 4: // 審核中 (審核措施落實)
                    sessionStorage.itemStatus = '4'
                    break
                case 5: // 改善措施已落實
                    sessionStorage.itemStatus = '5'
                    break
                default:
                    break
            }
            
            let routeData = this.$router.resolve({ path: `/smis/jobsafety/disaster-survey/${item.id}/show` })
            window.open(routeData.href, '_blank')
        },
    },
    created() {
        this.searchIpt = { ...this.searchDefault }
    },
}
</script>