<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">慢行通報追蹤 (編號：{{ routeId }})</h2>

    <v-row class="px-2">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-comment-processing</v-icon>關鍵字
            </h3>
            <v-text-field
                v-model.trim="keyword"
                placeholder="請輸入關鍵字"
                solo
                hide-details
            ></v-text-field>
        </v-col>

        <v-col cols="12">
            <v-card>
                <v-data-table
                    :search="keyword"
                    :headers="headers"
                    :items="tableItems"
                    :options.sync="pageOpt"
                    disable-sort
                    hide-default-footer
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:no-results>
                        <span class="red--text subtitle-1">沒有符合「{{ keyword }}」的資料</span>
                    </template>

                    <template v-slot:item.isRead="{ item }">
                        <div v-if="item.isRead == '已讀'">{{ item.isRead }}</div>
                        <div v-else class="error--text">{{ item.isRead }}</div>
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

export default {
    data: () => ({
        routeId: '',
        keyword: '',  // 關鍵字
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '項次', value: 'num', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: 80 },
            { text: '單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '姓名', value: 'name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '是否讀取', value: 'isRead', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '讀取時間', value: 'time', align: 'center', filterable: false, divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
    }),
    components: { Pagination },  // 頁碼
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        }
    },
    methods: {
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 向後端取得資料
        fetchData() {
            this.chLoadingShow()
            this.routeId = this.$route.params.id

            // 新增測試用資料
            setTimeout(() => {
                let data = [
                    {
                        depart: '鐵路維護科',
                        name: '陳弘宇',
                        isRead: true,
                        time: '2020-01-05 14:22:00'
                    },
                    {
                        depart: '鐵路維護科',
                        name: '王世得',
                        isRead: true,
                        time: '2020-01-05 15:17:00'
                    },
                    {
                        depart: '鐵路維護科',
                        name: '林捷元',
                        isRead: false,
                        time: ''
                    },
                    {
                        depart: '鐵路維護科',
                        name: '趙遠龍',
                        isRead: true,
                        time: '2020-01-05 13:42:00'
                    },
                    {
                        depart: '鐵路維護科',
                        name: '楊耀信',
                        isRead: false,
                        time: ''
                    },
                ]

                this.tableItems = data.map((item, idx) => {
                    return {
                        num: idx + 1,
                        depart: item.depart,
                        name: item.name,
                        isRead: (item.isRead)? '已讀' : '未讀',
                        time: item.time,
                    }
                })

                this.chLoadingShow()
            }, 1000)
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
    },
    created() {
        this.fetchData()
    }
}
</script>