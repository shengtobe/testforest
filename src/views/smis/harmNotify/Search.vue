<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">危害通報查詢</h2>

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
                <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>通報狀態
            </h3>
            <v-select
                v-model="ipt.case"
                :items="['未回覆', '已回覆尚未立案', '已立案', '審核中']"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3" align-self="center" class="mb-8 mb-md-0">
            <v-btn color="green" dark large
                @click="search"
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

        <!-- 趨勢圖 -->
        <v-col cols="12">
            <v-card class="mx-auto">
                <v-card-title class="yellow lighten-3 py-2 px-3">
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
import { mapActions } from 'vuex'
import Pagination from '@/components/Pagination.vue'
// import { fetchOrderList } from '@/apis/workList/maintain'

export default {
    data: () => ({
        ipt: {
            dateStart:  new Date().toISOString().substr(0, 10),  // 通報日期(起)
            dateEnd: new Date().toISOString().substr(0, 10),  // 通報日期(迄)
            case: '未回覆',  // 通報狀態
        },
        dateMemuShow: {  // 日曆是否顯示
            start: false,
            end: false,
        },
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '通報日期', value: 'date', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '通報人', value: 'name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '通報主旨', value: 'title', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '通報狀態', value: 'status', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
    }),
    components: { Pagination },  // 頁碼
    methods: {
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        initData() {
            this.chLoadingShow()

            // 新增測試用資料
            setTimeout(() => {
                this.tableItems = [
                    {
                        id: 'SH458987',
                        date: new Date().toISOString().substr(0, 10),
                        name: '王小明',
                        title: '阿里山站外發現鐵軌上有倒下的樹木',
                        status: '未回覆',
                    },
                    {
                        id: 'SH995413',
                        date: new Date().toISOString().substr(0, 10),
                        name: '陳小華',
                        title: '嘉義車庫失火',
                        status: '已立案',
                    },
                    {
                        id: 'SH785641',
                        date: new Date().toISOString().substr(0, 10),
                        name: '王小明',
                        title: '主線 5K+60 M 處發現落石',
                        status: '審核中',
                    },
                ]
                this.chLoadingShow()
            }, 1000)
        },
        // 搜尋
        search() {
            this.chLoadingShow()
            this.pageOpt.page = 1  // 頁碼初始化

            setTimeout(() => {
                this.chLoadingShow()
            }, 1000)
        },
        // 重新導向 (依結案狀態)
        redirect(item) {
            switch(item.status) {
                case '未回覆':
                    this.$router.push({ path: `/smis/harmnotify/${item.id}/show` })
                    break
                case '已回覆尚未立案':
                    this.$router.push({ path: `/smis/harmnotify/${item.id}/show` })
                    break
                case '審核中':
                    this.$router.push({ path: `/smis/harmnotify/${item.id}/review` })
                    break
                case '已立案':
                    this.$router.push({ path: `/smis/harmnotify/${item.id}/complated` })
                    break
                default:
                    break
            }
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
    },
    created() {
        this.initData()
    },
}
</script>