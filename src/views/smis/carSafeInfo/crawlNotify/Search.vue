<template>
<v-container style="max-width: 1200px">
    <v-row class="px-2 mb-8">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>限制日期(起)
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
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>限制日期(迄)
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

        <v-col cols="12" md="6" align-self="center" class="mb-8 mb-md-0">
            <v-btn color="green" dark large
                @click="search"
                class="mr-3"
            >
                <v-icon>mdi-magnify</v-icon>查詢
            </v-btn>

            <v-btn color="indigo" dark large
                
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

                    <!-- 速限起點 欄位 -->
                    <template v-slot:item.pointStart="{ item }">
                        {{ item.pointStart }} km
                    </template>

                    <!-- 速限終點 欄位 -->
                    <template v-slot:item.pointEnd="{ item }">
                        {{ item.pointEnd }} km
                    </template>

                    <!-- 常態速限 欄位 -->
                    <template v-slot:item.normal="{ item }">
                        {{ item.normal }} km/h
                    </template>

                    <!-- 慢行速限 欄位 -->
                    <template v-slot:item.slow="{ item }">
                        {{ item.slow }} km/h
                    </template>

                    <!-- 收件人 欄位 -->
                    <template v-slot:item.receivers="{ item }">
                        <v-btn small dark fab color="purple lighten-2"
                            @click="showReceiver(item.receivers)"
                        >
                            <v-icon dark>mdi-account-multiple</v-icon>
                        </v-btn>
                    </template>

                    <!-- 管理 欄位 -->
                    <template v-slot:item.action="{ item }">
                        <v-btn small dark fab color="teal"
                            @click="manageDialogShow = true"
                        >
                            <v-icon dark>mdi-apps</v-icon>
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

    <!-- 收件人 -->
    <v-dialog v-model="receiveDialog.show" max-width="400px">
        <v-card>
            <v-toolbar flat dense dark color="purple lighten-2">
                <v-toolbar-title>收件人姓名</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn fab small text @click="receiveDialog.show = false" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-list-item-group>
                <template v-for="(list, idx) in receiveDialog.items">
                    <v-list-item :key="list.name">
                        <v-list-item-content>
                            <v-list-item-title>{{ list.name }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider
                        v-if="idx + 1 < receiveDialog.items.length"
                        :key="idx"
                    ></v-divider>
                </template>
            </v-list-item-group>
        </v-card>
    </v-dialog>

    <!-- 管理 dialog -->
    <v-dialog v-model="manageDialogShow" max-width="450px">
        <v-card>
            <v-toolbar dark flat dense color="teal" class="mb-2">
                <v-toolbar-title>管理</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn fab small text @click="manageDialogShow = false" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="5">
                        <h3 class="mb-1">
                            <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>延長日期
                        </h3>
                        <v-menu
                            v-model="extend.show"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="extend.date"
                                    solo
                                    v-on="on"
                                    readonly
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                color="purple"
                                v-model="extend.date"
                                @input="extend.show = false"
                                locale="zh-tw"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>

                    <v-col cols="12" sm="7" align-self="center">
                        <v-btn color="green" dark large class="mr-3"
                            
                        >確認延長</v-btn>

                        <v-btn color="blue" dark large
                            
                        >解除慢行</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import Pagination from '@/components/Pagination.vue'
// import { fetchOrderList } from '@/apis/workList/maintain'

export default {
    data: () => ({
        ipt: {
            dateStart:  new Date().toISOString().substr(0, 10),  // 限制日期(起)
            dateEnd: new Date().toISOString().substr(0, 10),  // 限制日期(迄)
        },
        dateMemuShow: {  // 日曆是否顯示
            start: false,
            end: false,
        },
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '路線', value: 'line', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '速限起點', value: 'pointStart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '速限終點', value: 'pointEnd', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '常態速限', value: 'normal', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '慢行速限', value: 'slow', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '限制日期(起)', value: 'dateStart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '限制日期(迄)', value: 'dateEnd', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '通報人', value: 'creater', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '收件人', value: 'receivers', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '管理', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
        receiveDialog: {  // 收件人 dialog
            show: false,
            items: [],
        },
        manageDialogShow: false,  // 管理 dialog 是否顯示
        extend: {  // 延長日期
            show: false,
            date: new Date().toISOString().substr(0, 10),
        },
    }),
    components: { Pagination },  // 頁碼
    methods: {
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 搜尋
        search() {
            this.chLoadingShow()

            // 新增測試用資料
            setTimeout(() => {
                this.tableItems = [
                    {
                        id: '1',
                        line: '本線',
                        pointStart: '5.7',
                        pointEnd: '8',
                        normal: '70',
                        slow: '50',
                        dateStart: '2019-05-10',
                        dateEnd: '2019-05-22',
                        creater: '王小明',
                        receivers: ['陳小華 (AA012563)', '王永慶 (BA044639)', '趙力雄 (BA000854)', '韓志誠 (AA000032)'],
                    },
                    {
                        id: '2',
                        line: '眠月線',
                        pointStart: '210.3',
                        pointEnd: '211.5',
                        normal: '60',
                        slow: '45',
                        dateStart: '2019-06-13',
                        dateEnd: '2019-06-30',
                        creater: '王小明',
                        receivers: ['趙力雄 (BA000854)', '韓志誠 (AA000032)'],
                    },
                    {
                        id: '3',
                        line: '本線',
                        pointStart: '33',
                        pointEnd: '35.2',
                        normal: '70',
                        slow: '60',
                        dateStart: '2019-10-01',
                        dateEnd: '2019-10-20',
                        creater: '王小明',
                        receivers: ['王永慶 (BA044639)', '趙力雄 (BA000854)', '韓志誠 (AA000032)'],
                    },
                ]
                this.chLoadingShow()
            }, 1000)
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 顯示收件人
        showReceiver(item) {
            this.receiveDialog.items = item.map((ele, index) => {
                return {
                    idx: index + 1,
                    name: ele,
                }
            })

            this.receiveDialog.show = true
        },
    },
}
</script>