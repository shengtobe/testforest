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
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>工單性質
            </h3>
            <v-select
                v-model="type"
                :items="typeOpts"
                solo
            ></v-select>
        </v-col>

        <!-- <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-currency-usd</v-icon>總費用
            </h3>
            <v-text-field
                v-model.trim="moneyStart"
                placeholder="請輸入最小金額"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3" align-self="end" class="mt-n8">
            <v-text-field
                v-model.trim="moneyEnd"
                placeholder="請輸入最大金額"
                solo
            ></v-text-field>
        </v-col> -->

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
        
        <v-col cols="12">
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

        <v-col cols="12" class="mt-5">
            <span class="font-weight-bold">累計總費用： </span>
            <span class="font-weight-bold error--text">{{ totalPrice }}</span>
        </v-col>

        <!-- 表格資料 -->
        <v-col cols="12" class="mt-2 mb-8">
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

                    <template v-slot:item.Type="{ item }">
                        {{ (item.Type == 3)? '契約' : '小額採購' }}
                    </template>

                    <template v-slot:item.Status="{ item }">
                        {{ statusOpt.find(ele => ele.value == item.Status).text }}
                    </template>

                   <template v-slot:item.content="{ item }">
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
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { serveStatusOpts } from '@/assets/js/workList'
import { fetchOrderList } from '@/apis/workList/serve'
import Pagination from '@/components/Pagination.vue'

export default {
    data: () => ({
        year: new Date().getFullYear()-1911,  // 年度
        status: '',  // 處理階段
        // moneyStart: '',  // 總費用(最小金額)
        // moneyEnd: '',  // 總費用(最大金額)
        type: '', // 工單性質
        totalPrice: 0,  // 累計總費用
        typeOpts: [
            { text: '不限', value: '' },
            { text: '契約', value: '3' },
            { text: '小額採購', value: '4' },
        ],
        statusOpt: serveStatusOpts,  // 處理階段下拉選單
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '年度', value: 'WorkYear', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '總金額', value: 'TotalSpent', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '工單性質', value: 'Type', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '處理階段', value: 'Status', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
        isLoading: false,  // 是否讀取中
    }),
    components: { Pagination },  // 頁碼
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
    methods: {
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 查詢資料
        search() {
            this.chLoadingShow()
            this.pageOpt.page = 1  // 頁碼初始化

            fetchOrderList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'MMIS_WorkerOrder',  // DB table
                KeyItem: [
                    { tableColumn: 'WorkYear', columnValue: this.year },  // 年度
                    { tableColumn: 'Type', columnValue: this.type },  // 工單性質
                    { tableColumn: 'Status', columnValue: this.status },  // 處理階段
                ],
                QyName: [    // 欲回傳的欄位資料
                    'WorkYear',
                    'TotalSpent',
                    'Type',
                    'Status'
                ],
            }).then(res => {
                this.tableItems = JSON.parse(res.data.order_list)
                this.totalPrice = res.data.ListSpent
            }).catch(err => {
                console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow()
            })
        },
        // 轉換狀態文字
        // transferStatusText(status) {
        //     switch(status) {
        //         case 1:
        //             return '待派工'
        //             break
        //         case 2:
        //             return '已派工待維修'
        //             break
        //         case 3:
        //             return '已維修待驗收'
        //             break
        //         case 4:
        //             return '已驗收待結案'
        //             break
        //         case 5:
        //             return '已結案'
        //             break
        //         default:
        //             break
        //     }
        // },
        // 檢視內容
        redirect(item) {
            // 依業主要求變更檢式頁面的方式，所以改為另開分頁
            // 為避免搜尋頁的每筆資料的處理階段狀態是舊的
            // 在開分頁前都先向後端請求最新資料，依最新的處理階段狀態來決定轉頁

            this.isLoading = true
            let routeData = ''
            switch(item.status) {
                case 1:
                    routeData = this.$router.resolve({ path: `/worklist/serve/${item.id}/listShow` })
                    break
                case 2:
                    routeData = this.$router.resolve({ path: `/worklist/serve/${item.id}/workShow` })
                    break
                case 3:
                    routeData = this.$router.resolve({ path: `/worklist/serve/${item.id}/acceptingShow` })
                    break
                case 4:
                    routeData = this.$router.resolve({ path: `/worklist/serve/${item.id}/closedShow` })
                    break
                case 5:
                    routeData = this.$router.resolve({ path: `/worklist/serve/${item.id}/complated` })
                    break
                default:
                    break
            }
            setTimeout(() => {
                this.isLoading = false
                window.open(routeData.href, '_blank')
            }, 1000)
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        }
    },
}
</script>