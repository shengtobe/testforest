<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">工單編號：{{ id }}</h2>
    
    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8">
        <BottomTable :items="bottomItems" />

        <!-- 請修項目 -->
        <ShowTable :tableItems="tableItems" />

        <!-- 操作按鈕 -->
        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="ma-2 btn-close"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done">
                <v-btn class="ma-2 btn-expansion" v-if="isShowBtn"
                    color="primary"
                    :to="`/worklist/serve/${id}/editList`"
                >編輯</v-btn>

                <v-btn class="ma-2 btn-delete" v-if="isShowBtn"
                    color="error"
                    @click="deleteItem"
                >刪除</v-btn>

                <v-btn dark class="ma-2 btn-search"
                    color="amber darken-1" v-if="isShowBtn"
                    @click="closeWork"
                >結案</v-btn>

                <v-btn dark class="ma-2 btn-add"
                    color="success" v-if="isShowBtn"
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
import BottomTable from '@/components/BottomTable.vue'
import ShowTable from '@/views/workList/serve/ShowTable.vue'

export default {
    props: ['itemData'],
    data: () => ({
        id: '',  // 工單編號
        isShowBtn: false,
        done: false,  // 是否完成頁面操作
        topItems: [],  // 上面的欄位
        bottomItems: [],  // 下面的欄位
        tableItems: [],  // 表格資料
    }),
    components: {
        TopBasicTable,
        BottomTable,
        ShowTable,
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
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
            this.isShowBtn = obj.CreatorID == this.userData.UserId
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