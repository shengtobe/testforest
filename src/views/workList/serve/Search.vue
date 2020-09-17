<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">服務科工單查詢</h2>

    <v-row class="px-2">
        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>年度
            </h3>
            <v-text-field
                v-model.trim="year"
                placeholder="請輸入年度，例：109"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>處理階段
            </h3>
            <v-select
                v-model="status"
                :items="statusOpt"
                solo
            ></v-select>
        </v-col>
        
        <v-col cols="12" sm="6" md="4" align-self="center">
            <v-btn color="green" dark large class="mr-3 mb-4 mb-sm-0"
                @click="search"
            >
                <v-icon>mdi-magnify</v-icon>查詢
            </v-btn>

            <v-btn color="indigo" dark large class="mb-4 mb-sm-0"
                to="/worklist/serve/newList"
            >
                <v-icon>mdi-plus</v-icon>新增
            </v-btn>
        </v-col>

        <!-- 表格資料 -->
        <v-col cols="12" class="mb-8">
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

                    <template v-slot:item.workDate="{ item }">
                        {{ `${item.workDateStart} ~ ${item.workDateEnd}` }}
                    </template>

                    <template v-slot:item.status="{ item }">
                        {{ transferStatusText(item.status) }}
                    </template>

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
    </v-row>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
// import { getNowFullTime } from '@/assets/js/commonFun'
// import { fetchOrderList } from '@/apis/workList/maintain'
import Pagination from '@/components/Pagination.vue'

export default {
    data: () => ({
        year: '',  // 年度
        status: '待派工',  // 處理階段
        statusOpt: ['待派工', '已派工待維修', '已維修待驗收', '已驗收待結案', '已結案'],  // 處理階段下拉選單
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '年度', value: 'year', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '履約到期日', value: 'expiryDate', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '預算金額', value: 'money', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '通知施作日期', value: 'workDate', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '處理階段', value: 'status', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
    }),
    components: { Pagination },  // 頁碼
    methods: {
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 查詢資料
        search() {
            this.chLoadingShow()
            this.pageOpt.page = 1  // 頁碼初始化

            // 新增測試用資料
            setTimeout(() => {
                this.tableItems = [
                    {
                        id: '111',
                        year: '109',
                        expiryDate: '2020-12-25',
                        money: '98萬6,517',
                        workDateStart: '2020-01-05',  // 通知施作日期 (起)
                        workDateEnd: '2020-01-20',  // // 通知施作日期 (迄)
                        status: 1,
                    },
                    {
                        id: '222',
                        year: '109',
                        expiryDate: '2020-12-25',
                        money: '98萬6,517',
                        workDateStart: '2020-01-05',  // 通知施作日期 (起)
                        workDateEnd: '2020-01-20',  // // 通知施作日期 (迄)
                        status: 2,
                    },
                    {
                        id: '333',
                        year: '109',
                        expiryDate: '2020-12-25',
                        money: '98萬6,517',
                        workDateStart: '2020-01-05',  // 通知施作日期 (起)
                        workDateEnd: '2020-01-20',  // // 通知施作日期 (迄)
                        status: 3,
                    },
                    {
                        id: '444',
                        year: '109',
                        expiryDate: '2020-12-25',
                        money: '98萬6,517',
                        workDateStart: '2020-01-05',  // 通知施作日期 (起)
                        workDateEnd: '2020-01-20',  // // 通知施作日期 (迄)
                        status: 4,
                    },
                    {
                        id: '555',
                        year: '109',
                        expiryDate: '2020-12-25',
                        money: '98萬6,517',
                        workDateStart: '2020-01-05',  // 通知施作日期 (起)
                        workDateEnd: '2020-01-20',  // // 通知施作日期 (迄)
                        status: 5,
                    },
                ]

                this.chLoadingShow()
            }, 1000)
        },
        // 轉換狀態文字
        transferStatusText(status) {
            switch(status) {
                case 1:
                    return '待派工'
                    break
                case 2:
                    return '已派工待維修'
                    break
                case 3:
                    return '已維修待驗收'
                    break
                case 4:
                    return '已驗收待結案'
                    break
                case 5:
                    return '已結案'
                    break
                default:
                    break
            }
        },
        // 檢視內容
        redirect(item) {
            // 依處理階段決定要去的頁面
            switch(item.status) {
                case 1:
                    this.$router.push({ path: `/worklist/serve/${item.id}/listShow` })
                    break
                case 2:
                    this.$router.push({ path: `/worklist/serve/${item.id}/workShow` })
                    break
                case 3:
                    this.$router.push({ path: `/worklist/serve/${item.id}/acceptingShow` })
                    break
                case 4:
                    this.$router.push({ path: `/worklist/serve/${item.id}/closedShow` })
                    break
                case 5:
                    this.$router.push({ path: `/worklist/serve/${item.id}/complated` })
                    break
                default:
                    break
            }
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        }
    },
}
</script>