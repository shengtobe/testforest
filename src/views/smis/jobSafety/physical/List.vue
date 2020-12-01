<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">個人健檢資料</h2>

    <v-row class="px-2 mb-8">
        <v-col cols="12">
            <v-btn dark large class="my-2 mr-2"
                to="/smis/jobsafety/physical"
            >回搜尋頁</v-btn>

            <v-btn color="indigo" dark large class="ma-2"
                @click="add"
            >
                <v-icon>mdi-plus</v-icon>新增
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

                    <template v-slot:item.depart="{ item }">
                        {{ transferDepartTxt(item.depart) }}
                    </template>

                    <template v-slot:item.competence="{ item }">
                        {{ (item.competence == 'y')? '合格' : '不合格' }}
                    </template>

                    <template v-slot:item.content="{ item }">
                        <v-btn small dark fab color="teal"
                            target="_blank"
                            :to="`/smis/jobsafety/physical/${item.id}/show`"
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
import { departOptions } from '@/assets/js/departOption'
import Pagination from '@/components/Pagination.vue'

export default {
    data: () => ({
        routeId: '',
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '健檢日期', value: 'date', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '部門', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '姓名', value: 'name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '健檢評級', value: 'level', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '適任性', value: 'competence', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
        dialog: false,  // dialog 是否顯示
        isLoading: false,  // 是否讀取中
        editIdx: 0,  // 編輯索引值
        note: '',  // 備註
    }),
    components: { Pagination },  // 頁碼
    methods: {
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 初始化資料
        initData() {
            this.chLoadingShow()
            this.routeId = this.$route.params.id  // 路由參數(id)

            setTimeout(() => {
                this.name = '王小明'
                this.tableItems = [
                    {
                        id: '789',
                        depart: 'd2', 
                        name: '王小明',
                        date: '2020-05-01',
                        level: '1級',
                        competence: 'y',
                    },
                    {
                        id: '658',
                        depart: 'd2', 
                        name: '王小明',
                        date: '2019-04-20',
                        level: '2級',
                        competence: 'y',
                    },
                ]

                this.chLoadingShow()
            }, 1000)
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 轉換部門文字
        transferDepartTxt(val) {
            return departOptions.find(item => item.value == val).text
        },
        // 新增
        add() {
            // 將資料存至 sessionStorage
            sessionStorage.setItem('pdataItem', JSON.stringify({
                id: this.routeId,
                name: this.name,
            }))
            this.$router.push({ path: `/smis/jobsafety/physical/${this.routeId}/add` })
        }
    },
    created() {
        this.initData()
    },
}
</script>