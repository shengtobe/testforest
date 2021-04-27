<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">復原刪除</h2>

    <v-row no-gutters class="mb-8">
        <v-col cols="12" class="mb-8">
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

                    <template v-slot:item.action="{ item }">
                        <v-btn class="btn-add" dark
                            @click="recovery(item)"
                        >復原</v-btn>
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

        <v-col cols="12">
            <v-btn dark class="mr-3 btn-close"
                @click="closeWindow"
            >關閉視窗</v-btn>
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
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '發生日期', value: 'date', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '發生地點', value: 'location', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '事故類型', value: 'evtType', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '傷亡人數', value: 'deathCount', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '復原', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        ],
    }),
    components: { Pagination },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'closeWindow',  // 關閉視窗
        ]),
        // 向後端取得資料
        fetchData() {
            this.chLoadingShow()

            // 新增測試用資料
            setTimeout(() => {
                this.tableItems = [
                    {
                        id: 65,
                        date: '2020-06-18 09:16:00',
                        location: '主線 9K+15M',
                        evtType: '平交道事故',
                        deathCount: 0,
                    },
                ]

                this.chLoadingShow()
            }, 1000)
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 復原
        recovery(item) {
            let index = this.tableItems.indexOf(item)
            console.log(index)
            if (confirm(`你確定要復原編號「${item.id}」的資料嗎?`)) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.tableItems.splice(index, 1)
                    this.chMsgbar({ success: true, msg: '復原成功'})
                    this.chLoadingShow()
                }, 1000)
            }
        },
    },
    created() {
        this.fetchData()
    }
}
</script>