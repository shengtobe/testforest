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

                    <template v-slot:item.date="{ item }">
                        {{ `${item.findDate} ${item.findHour}:${item.findMin}` }}
                    </template>

                    <template v-slot:item.disasterType="{ item }">
                        {{ transferDisasterType(item.disasterType) }}
                    </template>

                    <template v-slot:item.injurySite="{ item }">
                        {{ transferInjurySite(item.injurySite) }}
                    </template>

                    <template v-slot:item.injuryLeave="{ item }">
                        {{ `${item.injuryLeaveStart} ~ ${item.injuryLeaveEnd}` }}
                    </template>

                    <template v-slot:item.cause="{ item }">
                        <v-btn color="teal" dark
                            @click="showContent(item.cause)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.improve="{ item }">
                        <v-btn color="teal" dark
                            @click="showContent(item.improve)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.laborInspection="{ item }">
                        {{ (item.laborInspection == 'y')? '有' : '無' }}
                    </template>

                    <template v-slot:item.note="{ item }">
                        <v-btn color="teal" dark
                            @click="showContent(item.note)"
                        >檢視</v-btn>
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
import { injurySiteOpts, disasterTypeOpts } from '@/assets/js/smisData'

export default {
    data: () => ({
        searchIpt: {
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
            { text: '發生日期', value: 'date', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
            { text: '發生地點', value: 'location', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
            { text: '發生單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '120' },
            { text: '罹災者姓名', value: 'name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '90' },
            { text: '職稱', value: 'jobTitle', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
            { text: '災害類型', value: 'disasterType', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '160' },
            { text: '傷害部位', value: 'injurySite', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '160' },
            { text: '公傷假', value: 'injuryLeave', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '130' },
            { text: '發生原因', value: 'cause', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '100' },
            { text: '改善措施', value: 'improve', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '100' },
            { text: '通報勞檢', value: 'laborInspection', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70' },
            { text: '備註', value: 'note', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '100' },
        ],
    }),
    components: { Pagination },
    methods: {
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
            'chViewDialog',  // 檢視內容 dialog
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
                        injuryLeaveStart: '2020-08-24',  // 公傷假(起)
                        injuryLeaveEnd: '2020-08-30',  // 公傷假(迄)
                        cause: '發生原因文字發生原因文字發生原因文字發生原因文字發生原因文字',  // 發生原因
                        improve: '改善措施文字改善措施文字改善措施文字改善措施文字改善措施文字',  // 改善措施
                        laborInspection: 'n',  // 通報勞檢
                        note: '備註文字備註文字備註文字備註文字備註文字備註文字備註文字備註文字備註文字',  // 備註
                    },
                    {
                        findDate: '2020-08-12',  // 發生日期
                        findHour: '13',  // 發生日期(時)
                        findMin: '24',  // 發生日期(分)
                        location: '45K+600M',  // 發生地點
                        depart: '奮起湖監工區',  // 發生單位
                        name: '陳小美',  // 罹災者姓名
                        jobTitle: '助理工程員',  // 職稱
                        disasterType: 2,  // 災害類型
                        injurySite: 1,  // 傷害部位
                        injuryLeaveStart: '2020-08-13',  // 公傷假(起)
                        injuryLeaveEnd: '2020-08-22',  // 公傷假(迄)
                        cause: '發生原因文字發生原因文字發生原因文字發生原因文字發生原因文字',  // 發生原因
                        improve: '改善措施文字改善措施文字改善措施文字改善措施文字改善措施文字',  // 改善措施
                        laborInspection: 'y',  // 通報勞檢
                        note: '備註文字備註文字備註文字備註文字備註文字備註文字備註文字備註文字備註文字',  // 備註
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
        // 轉換災害類型名稱
        transferDisasterType(val) {
            return disasterTypeOpts.find(item => item.value == val).text
        },
        // 轉換傷害部位名稱
        transferInjurySite(val) {
            return injurySiteOpts.find(item => item.value == val).text
        },
        // 顯示檢視內容
        showContent(txt) {
            this.chViewDialog({ show: true, content: txt.replace(/\n/g, '<br>') })
        },
    },
}
</script>