<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">職業災害紀錄表</h2>

    <v-row class="px-2 mb-8">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>日期(起)
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
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>日期(迄)
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

        <v-col cols="12" sm="4" md="3" align-self="center">
            <v-btn color="green" dark large class="ma-2"
                @click="search"
            >
                <v-icon class="mr-1">mdi-magnify</v-icon>查詢
            </v-btn>
        </v-col>

        <v-col cols="12" class="mt-n5">
            <span class="font-weight-bold">累計損失日數： </span>
            <span class="font-weight-bold error--text">{{ totalLossDate }}</span>
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
        searchIpt: {},
        searchDefault: {
            dateStart: new Date().toISOString().substr(0, 10),  // 發生日期(起)
            dateEnd: new Date().toISOString().substr(0, 10),  // 發生日期(迄)
        },
        dateMemuShow: {
            start: false,
            end: false,
        },
        totalLossDate: 0,  // 累計損失日數
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
    }),
    components: { Pagination },
    methods: {
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 搜尋
        search() {
            this.chLoadingShow()
            this.pageOpt.page = 1  // 頁碼初始化

            // 新增測試用資料
            setTimeout(() => {
                this.tableItems = [
                    {
                        findDate: '2020-08-23',  // 發生日期
                        findHour: '09',  // 發生日期(時)
                        findMin: '45',  // 發生日期(分)
                        location: '工具間',  // 發生地點
                        depart: '阿里山車站',  // 發生單位
                        name: '王小明',  // 罹災者姓名
                        jobTitle: '維修員',  // 職稱
                        disasterType: 8,  // 災害類型
                        injurySite: 9,  // 傷害部位
                        InjuryLeaveStart: '2020-08-24',  // 公傷假(起)
                        InjuryLeaveEnd: '2020-08-30',  // 公傷假(迄)
                        cause: '',  // 發生原因
                        note: '',  // 備註
                    },
                    {
                        workDepart: '阿里山車站',
                        name: '王小明',
                        date: '2020-08-23',
                        status: 2,
                    },
                ]
                this.chLoadingShow()

                this.totalLossDate = 15  // 累計損失日數
            }, 1000)
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
    },
    created() {
        this.searchIpt = { ...this.searchDefault }
    },
}
</script>