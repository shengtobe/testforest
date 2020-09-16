<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">服務科工單查詢</h2>

    <v-row class="px-2">
        <v-col cols="12" class="mb-4">
            <v-btn color="green" dark large class="mr-3 mb-4 mb-sm-0"
                @click="search"
            >
                <v-icon>mdi-magnify</v-icon>查詢
            </v-btn>

            <v-btn color="indigo" dark large class="mr-3 mb-4 mb-sm-0"
                to="/worklist/serve/newList"
            >
                <v-icon>mdi-plus</v-icon>新增
            </v-btn>

            <v-btn elevation="2" large class="mr-3 mb-4 mb-sm-0"
                @click="reset"
            >
                <v-icon>mdi-reload</v-icon>重置
            </v-btn>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
// import { getNowFullTime } from '@/assets/js/commonFun'
// import { fetchOrderList } from '@/apis/workList/maintain'
import Pagination from '@/components/Pagination.vue'

export default {
    data: () => ({
        ipt: {},
        defaultIpt: {

        },
    }),
    components: { Pagination },  // 頁碼
    methods: {
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 查詢資料
        search() {
            this.chLoadingShow()
            this.pageOpt.page = 1  // 頁碼初始化
        },
        // 檢視內容
        viewPage(item) {
            // 依處理階段決定要去的頁面
            switch(item.Status) {
                case '待派工':
                    this.$router.push({ path: `/worklist/serve/${item.WorkOrderID}/listShow` })
                    break
                case '已派工待維修':
                    this.$router.push({ path: `/worklist/serve/${item.WorkOrderID}/workShow` })
                    break
                case '已維修待驗收':
                    this.$router.push({ path: `/worklist/serve/${item.WorkOrderID}/acceptingShow` })
                    break
                case '已驗收待結案':
                    this.$router.push({ path: `/worklist/serve/${item.WorkOrderID}/closedShow` })
                    break
                case '已結案':
                    this.$router.push({ path: `/worklist/serve/${item.WorkOrderID}/complated` })
                    break
                default:
                    break
            }
        },
        // 重置
        reset() {
            this.ipt = { ...this.defaultIpt }
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        }
    },
    created() {
        this.ipt = { ...this.defaultIpt }
    },
}
</script>