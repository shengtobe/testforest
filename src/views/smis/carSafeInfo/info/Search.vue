<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">安全資訊查詢</h2>

    <v-row class="px-2 mb-8">
        <v-col cols="12" sm="8" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>通報主題
            </h3>
            <v-text-field
                v-model.trim="ipt.title"
                solo
                placeholder="請輸入關鍵字"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-bank</v-icon>通報單位
            </h3>
            <v-select
                v-model="ipt.depart"
                :items="departOpts"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>發布日期(起)
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
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>發布日期(迄)
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
                <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>發布狀態
            </h3>
            <v-select
                v-model="ipt.status"
                :items="statusOpts"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="8" md="9" align-self="end" class="mb-5 text-md-right">
            <v-btn color="success" large class="mr-3 mb-3"
                @click="search"
            >
                <v-icon>mdi-magnify</v-icon>查詢
            </v-btn>

            <v-btn color="indigo" dark large class="mr-3 mb-3"
                to="/smis/car-safeinfo/info/add"
            >
                <v-icon>mdi-plus</v-icon>新增
            </v-btn>

            <v-btn elevation="2" large class="mb-3"
                @click="reset"
            >
                <v-icon>mdi-reload</v-icon>清除搜尋內容
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

                    <template v-slot:item.status="{ item }">
                        {{ transferStatusText(item.status) }}
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn small dark fab color="teal"
                            :loading="isLoading"
                            @click="redirect(item)"
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
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import Pagination from '@/components/Pagination.vue'
import { departOptions } from '@/assets/js/departOption'

export default {
    data: () => ({
        ipt: {},
        defaultIpt: {
            title: '',  // 通報主題
            dateStart:  '',  // 發布日期(起)
            dateEnd: '',  // 發布日期(迄)
            depart: '',  // 通報單位
            status: '',  // 發布狀態
        },
        dateMemuShow: {  // 日曆是否顯示
            start: false,
            end: false,
        },
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '通報主題', value: 'title', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '通報單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '通報人', value: 'name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '發布狀態', value: 'status', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '發布日期', value: 'date', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '檢視', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
        departOpts: [  // 通報單位下拉選單
            { text: '不限', value: '' },
            ...departOptions,
        ],
        statusOpts: [
            { text: '不限', value: '' },
            { text: '已立案', value: 1 },
            { text: '審核中', value: 2 },
            { text: '加會中', value: 3 },
            { text: '已發布', value: 4 },
        ],
        isLoading: false,  // 是否讀取中
    }),
    components: { Pagination },  // 頁碼
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

            // 新增測試用資料
            setTimeout(() => {
                this.tableItems = [
                    {
                        id: '111',
                        title: '3月份團康活動',
                        depart: '綜合企劃科',
                        name: '王小明',
                        date: '2020-02-03',
                        status: 1,
                    },
                    {
                        id: '222',
                        title: '售票注意事項宣導',
                        depart: '鐵路服務科',
                        name: '陳志揚',
                        date: '2020-01-20',
                        status: 2,
                    },
                    {
                        id: '333',
                        title: '年中車輛保養行程表',
                        depart: '車輛養護科',
                        name: '林家豪',
                        date: '2020-01-15',
                        status: 3,
                    },
                    {
                        id: '444',
                        title: '阿里山站售票大廳電燈更換',
                        depart: '鐵路服務科',
                        name: '趙永智',
                        date: '2020-01-09',
                        status: 4,
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
                case 2:
                    return '審核中'
                    break
                case 3:
                    return '加會中'
                    break
                case 4:
                    return '已發布'
                    break
                default:
                    break
            }
        },
        // 重新導向 (依事故事件狀態)
        redirect(item) {
            switch(item.status) {
                case 1:  // 已立案
                    sessionStorage.itemStatus = '1'
                    break
                case 2:  // 審核中
                    sessionStorage.itemStatus = '2'
                    break
                case 3:  // 加會中
                    sessionStorage.itemStatus = '3'
                    break
                case 4: // 已發布
                    sessionStorage.itemStatus = '4'
                    break
                default:
                    break
            }

            let routeData = this.$router.resolve({ path: `/smis/car-safeinfo/info/${item.id}/show` })
            window.open(routeData.href, '_blank')
        },
    },
    created() {
        this.reset()
    }
}
</script>