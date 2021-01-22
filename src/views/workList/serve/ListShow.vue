<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">工單編號：{{ id }}</h2>
    
    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8">
        <BottomTableNoIcon :items="bottomItems" />

        <!-- 請修項目 -->
        <v-col cols="12" class="mt-8">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-view-list</v-icon>請修項目
            </h3>

            <v-card flat>
                <v-data-table
                    :headers="headers"
                    :items="tableItems"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>
                
                    <!-- 插入 total 欄位做每筆的總計 -->
                    <template v-slot:item.total="{ item }">
                        <span>{{ item.ServiceCount * item.ServicePrice }}</span>
                    </template>

                    <template v-slot:footer>
                        <v-divider></v-divider>

                        <p class="py-2 text-center">
                            總金額： <span class="red--text">{{ totalMoney }}</span>
                        </p>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>

        <!-- 操作按鈕 -->
        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="ma-2"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done">
                <v-btn class="ma-2"
                    color="primary"
                    :to="`/worklist/serve/${id}/editList`"
                >編輯</v-btn>

                <v-btn class="ma-2"
                    color="error"
                    @click="deleteItem"
                >刪除</v-btn>

                <v-btn dark class="ma-2"
                    color="amber darken-1"
                    @click="closeWork"
                >結案</v-btn>

                <v-btn dark class="ma-2"
                    color="success"
                    :to="`/worklist/serve/${id}/newWork`"
                >派工</v-btn>
            </template>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { deleteOrder, closeOrder } from '@/apis/workList/serve'
import { getNowFullTime } from '@/assets/js/commonFun'
import TopBasicTable from '@/components/TopBasicTable.vue'
import BottomTableNoIcon from '@/components/BottomTableNoIcon.vue'

export default {
    props: ['itemData'],
    data: () => ({
        id: '',  // 工單編號
        done: false,  // 是否完成頁面操作
        topItems: [],  // 上面的欄位
        bottomItems: [],  // 下面的欄位
        tableItems: [],  // 表格資料
        headers: [  // 表格顯示的欄位
            { text: '項次', value: 'numbers', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '工項(項目)', value: 'ServiceItem', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '規格', value: 'ServiceSpec', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '單位', value: 'ServiceUnit', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '預估數量', value: 'ServiceCount', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '單價', value: 'ServicePrice', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '總價', value: 'total', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
    }),
    components: {
        TopBasicTable,
        BottomTableNoIcon,
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
        // 全部的總金額
        totalMoney() {
            return this.tableItems.reduce((a,b)=>a + b.ServiceCount * b.ServicePrice, 0)
        },
    },
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        },
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'closeWindow',  // 關閉視窗
        ]),
        // 初始化資料
        setShowData(obj) {
            this.id = obj.WorkOrderID  // 工單編號
            this.topItems = obj.topItems  // 上面的欄位資料
            this.bottomItems = obj.bottomItems  // 下面的欄位資料
            this.tableItems = obj.tableItems  // 表格資料
        },
        // 刪除
        deleteItem() {
            if (confirm('你確定要刪除嗎?')) {
                this.chLoadingShow()
                
                deleteOrder({
                    WorkOrderID: this.id,  // 工單編號
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '刪除成功' })
                        this.done = true  // 隱藏頁面操作按鈕
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    console.log(err)
                    alert('伺服器發生問題，刪除失敗')
                }).finally(() => {
                    this.chLoadingShow()
                })
            }
        },
        // 結案
        closeWork() {
            if (confirm('你確定要結案嗎?')) {
               this.chLoadingShow()
                
                closeOrder({
                    WorkOrderID: this.id,  // 工單編號
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '結案成功' })
                        this.done = true  // 隱藏頁面操作按鈕
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，結案失敗' })
                }).finally(() => {
                    this.chLoadingShow()
                })
            }
        },
    },
    created() {
        this.setShowData(this.itemData)
    }
}
</script>