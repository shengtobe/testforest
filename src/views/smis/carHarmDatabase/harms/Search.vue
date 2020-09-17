<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">行車危害查詢</h2>

    <v-row class="px-2 mb-8">
        <v-col cols="12" md="5">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>簡易查詢
            </h3>
            <v-text-field
                hide-details
                v-model.trim="keyword"
                solo
                placeholder="請輸入關鍵字"
            ></v-text-field>
        </v-col>

        <v-col cols="12" md="3" align-self="end">
            <v-btn color="green" dark large class="mb-1 mr-3"
                @click="search"
            >
                <v-icon class="mr-1">mdi-magnify</v-icon>查詢
            </v-btn>

            <v-btn color="indigo" dark large class="mb-1"
                to="/smis/car-harmdb/harms/add"
            >
                <v-icon>mdi-plus</v-icon>新增
            </v-btn>
        </v-col>

        <v-col cols="12">
            <v-sheet color="white" class="px-2 pb-1">
                <v-row no-gutters>
                    <v-col cols="12" sm="4" md="3">
                        <v-checkbox
                            v-model="chooses"
                            label="危害說明"
                            color="info"
                            value="t1"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="4" md="3">
                        <v-checkbox
                            v-model="chooses"
                            label="危害直接成因"
                            color="info"
                            value="t2"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="4" md="3">
                        <v-checkbox
                            v-model="chooses"
                            label="可能的危害間接原因"
                            color="info"
                            value="t3"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="4" md="3">
                        <v-checkbox
                            v-model="chooses"
                            label="衍生事故"
                            color="info"
                            value="t4"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="4" md="3">
                        <v-checkbox
                            v-model="chooses"
                            label="危害權責部門"
                            color="info"
                            value="t5"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="4" md="3">
                        <v-checkbox
                            v-model="chooses"
                            label="備註"
                            color="info"
                            value="t6"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="4" md="3">
                        <v-checkbox
                            v-model="chooses"
                            label="控制措施權責部門"
                            color="info"
                            value="t7"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="4" md="3">
                        <v-checkbox
                            v-model="chooses"
                            label="設備標示編號"
                            color="info"
                            value="t8"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="12" class="mt-2">
                        <span class="error--text">* 請至要勾選上述其中一個項目</span>
                    </v-col>
                </v-row>
            </v-sheet>
        </v-col>

        <!-- 快速查詢 -->
        <v-col cols="12" class="mt-5">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-tag-multiple</v-icon>快速查詢
            </h3>
            
            <v-btn color="yellow lighten-3" class="mb-2 mr-3"
                @click="fastFetch"
            >全部危害</v-btn>

            <v-btn color="yellow lighten-3" class="mb-2 mr-3"
                @click="fastFetch"
            >高風險</v-btn>

            <v-btn color="yellow lighten-3" class="mb-2 mr-3"
                @click="fastFetch"
            >已立案 (1)</v-btn>

            <v-btn color="yellow lighten-3" class="mb-2 mr-3"
                @click="fastFetch"
            >審核中 (4)</v-btn>
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

                    <template v-slot:item.content="{ item }">
                        <v-btn small dark fab color="teal"
                            @click="redirect(item)"
                        >
                            <v-icon dark>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.status="{ item }">
                        {{ transferStatusText(item.status) }}
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
import { evtTypes, locationOpts } from '@/assets/js/smisData'
import Pagination from '@/components/Pagination.vue'
import { carHarmDBHarms } from '@/assets/js/smisTestData'

export default {
    data: () => ({
        keyword: '',  // 關鍵字
        chooses: [],  // 查詢項目(checkbox 勾選的項目)
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '營運模式', value: 'mode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '風險嚴重性', value: 'serious', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '風險頻率', value: 'frequency', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '風險等級', value: 'level', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '狀態', value: 'status', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
    }),
    components: { Pagination },
    methods: {
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 簡易搜尋
        search() {
            this.chLoadingShow()
            this.pageOpt.page = 1  // 頁碼初始化

            // 新增測試用資料
            setTimeout(() => {
                this.tableItems = carHarmDBHarms
                this.chLoadingShow()
            }, 1000)
        },
        // 快速查詢
        fastFetch() {
            this.chLoadingShow()
            this.pageOpt.page = 1  // 頁碼初始化

            // 新增測試用資料
            setTimeout(() => {
                this.tableItems = [ ...carHarmDBHarms ]
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
                case 4:  // 審核風險已可接受
                    return '審核中'
                    break
                case 5:
                    return '風險已可接受'
                    break
                case 6:  // 審核更新
                    return '審核中'
                    break
                case 7:  // 審核作廢
                    return '審核中'
                    break
                default:
                    break
            }
        },
        // 重新導向 (依結案狀態)
        redirect(item) {
            switch(item.status) {
                case 1:  // 已立案
                    this.$router.push({ path: `/smis/car-harmdb/harms/${item.id}/show` })
                    break
                case 2:  // 審核完備資料
                    this.$router.push({ path: `/smis/car-harmdb/harms/${item.id}/review` })
                    break
                case 3:  // 已完備資料
                    this.$router.push({ path: `/smis/car-harmdb/harms/${item.id}/complated` })
                    break
                case 4:  // 審核風險已可接受
                    this.$router.push({ path: `/smis/car-harmdb/harms/${item.id}/fulfill-review` })
                    break
                case 5:  // 風險已可接受
                    this.$router.push({ path: `/smis/car-harmdb/harms/${item.id}/fulfill-complated` })
                    break
                case 6:  // 審核更新
                    this.$router.push({ path: `/smis/car-harmdb/harms/${item.id}/update-review` })
                    break
                case 7:  // 審核作廢
                    this.$router.push({ path: `/smis/car-harmdb/harms/${item.id}/invalid` })
                    break
                default:
                    break
            }
        },
    },
}
</script>