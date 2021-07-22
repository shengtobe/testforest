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
            <v-btn color="green" dark large class="mr-3 mb-4 mb-sm-0 btn-search"
                @click="search(false)"
            >
                <v-icon>mdi-magnify</v-icon>查詢
            </v-btn>

            <v-btn color="indigo" dark large class="mb-4 mb-sm-0 btn-add"
                @click="newOne(theMoney)"
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
                    class="theme-table"
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
                        <v-btn small dark fab color="teal" class="btn-detail"
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
            { text: '年度', value: 'WorkYear', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '總金額', value: 'TotalSpent', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '工單性質', value: 'Type', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '處理階段', value: 'Status', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        ],
        isLoading: false,  // 是否讀取中
        theMoney: '',

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
        search(bool) {
            this.chLoadingShow({show:true})
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
                    'WorkOrderID',
                    'WorkYear',
                    'TotalSpent',
                    'Type',
                    'Status'
                ],
            }).then(res => {
                this.tableItems = JSON.parse(res.data.order_list)
                if(this.tableItems.length == 0) return
                this.tableItems.forEach(element => {
                    for(let ele in element){
                        if(element[ele] == null){
                            element[ele] = '';
                        }
                    }
                });
                if(bool == true){
                    this.theMoney = this.tableItems[0].WorkBudget
                }
                this.totalPrice = res.data.ListSpent
            }).catch(err => {
                console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow({show:false})
            })
        },
        // 新增
        newOne(item) {
            let routeData
            if(item == '' || item == undefined){
                routeData = this.$router.resolve({ path: `/worklist/serve/newList` })
            }
            else{
                routeData = this.$router.resolve({ path: `/worklist/serve/${item}/newList0` })
            }
            
            window.open(routeData.href, '_blank')
        },
        // 檢視內容
        redirect(item) {
            let routeData = this.$router.resolve({ path: `/worklist/serve/${item.WorkOrderID}/show` })
            window.open(routeData.href, '_blank')
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        }
    },
    created() {
        this.search(true)
    },
}
</script>