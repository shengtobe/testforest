<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">工單編號：{{ workNumber }}</h2>
    
    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8">
        <BottomTable :items="bottomItems" />

        <!-- 操作按鈕 -->
        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="ma-2 btn-close"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done">
                <v-btn class="ma-2 btn-modify" v-if="isShowBtn"
                    color="primary"
                    :to="`/worklist/maintain/${workNumber}/editList`"
                >編輯</v-btn>

                <v-btn class="ma-2 btn-delete" v-if="isShowBtn"
                    color="error"
                    @click="deleteItem"
                >刪除</v-btn>

                <v-btn dark class="ma-2 btn-memo" v-if="isShowBtn"
                    color="amber darken-1"
                    @click="closeWork"
                >結案</v-btn>

                <v-btn dark class="ma-2 btn-add" v-if="isShowBtn"
                    color="success"
                    :to="`/worklist/maintain/${workNumber}/newWork`"
                >派工</v-btn>
            </template>
        </v-col>

        <!-- 按鈕說明，demo 用 -->
        <v-col cols="12" class="error--text">
            <h4>按鈕出現說明</h4>
            1. 編輯、刪除：立案人、派工人<br>
            2. 編輯、結案、派工：派工人
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { deleteOrder, closeOrder } from '@/apis/workList/maintain'
import { getNowFullTime } from '@/assets/js/commonFun'
import TopBasicTable from '@/components/TopBasicTable.vue'
import BottomTable from '@/components/BottomTable.vue'

export default {
    props: ['itemData'],
    data: () => ({
        workNumber: '',  // 工單編號
        finishMan: '',
        isShowBtn: false,
        done: false,  // 是否完成頁面操作
        newDispatcher: '',  // 轉單後的新派工人
        topItems: [],  // 上面的欄位
        bottomItems: [],  // 下面的欄位
    }),
    components: {
        TopBasicTable,
        BottomTable,
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
    watch: {
        // 更換科室時，自動選該科室人員清單的第一人
        newUnit: function (newVal, oldVal) {
            if (newVal != oldVal) {
                this.newDispatcher = this.memberOptLv2[0]
            }
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
            this.isShowBtn = obj.CreatorID == this.userData.UserId || obj.DispatchID == this.userData.UserId
            console.log(obj.CreatorID + '==' + this.userData.UserId + '||' + obj.DispatchID + '==' + this.userData.UserId);
            this.workNumber = obj.WorkOrderID  // 工單編號
            this.topItems = obj.topItems  // 上面的欄位資料
            this.bottomItems = obj.bottomItems  // 下面的欄位資料
        },
        // 刪除
        deleteItem() {
            if (confirm('你確定要刪除嗎?')) {
                this.chLoadingShow()
                
                deleteOrder({
                    WorkOrderID: this.workNumber,  // 工單編號
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
                    WorkOrderID: this.workNumber,  // 工單編號
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
        console.log("ListShow itemData: ", this.itemData);
        this.setShowData(this.itemData)
    }
}
</script>