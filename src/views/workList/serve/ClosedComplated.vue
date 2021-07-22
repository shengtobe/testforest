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
            <v-btn dark class="ma-2"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <v-btn class="ma-2" dark
                color="brown" v-if="isShowBtn"
                @click="excel" 
            >竣工單</v-btn>

            <template v-if="!done">
                <v-btn class="ma-2"
                    color="error"
                    @click="showDialog(true)"
                    v-if="(status == 4) && isShowBtn"
                >退回</v-btn>

                <v-btn class="ma-2" dark
                    color="yellow darken-2"
                    @click="showDialog(false)"
                    v-if="(status == 4) && isShowBtn"
                >徹銷</v-btn>

                <v-btn dark class="ma-2"
                    color="success"
                    @click="save"
                    v-if="(status == 4) && isShowBtn"
                >結案</v-btn>
            </template>
        </v-col>
    </v-row>

    <!-- 退回 dialog -->
    <v-dialog v-model="dialog" max-width="600px" v-if="status == 4">
        <v-card>
            <v-toolbar dark flat dense color="error" class="mb-2">
                <v-toolbar-title>{{ dialogTitle }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn fab small text @click="dialog = !dialog" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-textarea
                            hide-details
                            auto-grow
                            outlined
                            rows="8"
                            v-model.trim="reason"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            
            <v-card-actions class="px-5 pb-5">
                <v-spacer></v-spacer>
                <v-btn class="mr-2" elevation="4" :loading="isLoading" @click="dialog = false">取消</v-btn>
                <v-btn color="success"  elevation="4" :loading="isLoading" @click="withdraw">送出</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { closeOrder, withdrawOrder, cancelOrder, orderFinalExecl } from '@/apis/workList/serve'
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
        status: '',  // 處理階段
        isLoading: false,  // 是否讀取中
        topItems: [],  // 上面的欄位
        bottomItems: [],  // 下面的欄位
        tableItems: [],  // 表格資料
        dialog: false,  // dialog 是否顯示
        dialogTitle: '',  // dialog 標題
        dialogApiName: '',  // 使用的 API 函式名稱
        reason: '',  // 退回或徹銷原因
        dialogReturnMsg: '',  // 退回或徹銷時成功的訊息 (demo 時用)
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
            this.id = obj.WorkOrderID  // 工單編號
            this.status = obj.Status  // 處理階段(值)
            this.topItems = obj.topItems  // 上面的欄位資料
            this.bottomItems = obj.bottomItems  // 下面的欄位資料
            this.tableItems = [ ...obj.tableItems ]  // 表格資料
            this.isShowBtn = obj.AllDepartorID == this.userData.UserId
        },
        // 顯示 dialog
        showDialog(bool) {
            // 若為 true 是退回、false 是徹銷
            this.dialogTitle = (bool)? '退回原因' : '徹銷原因'
            this.dialogApiName = bool  // true 為退回，false 為徹銷
            this.dialogReturnMsg = (bool)? '退回成功' : '徹銷成功'
            this.dialog = true
        },
        // 退回、徹銷
        withdraw() {
            this.isLoading = true

            if (this.dialogApiName) {
                withdrawOrder({
                    WorkOrderID: this.id,  // 工單編號
                    ReturnReason: this.reason,  // 退回原因
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: this.dialogReturnMsg })
                        this.done = true  // 隱藏頁面操作按鈕
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，操作失敗' })
                }).finally(() => {
                    this.isLoading = this.dialog = false
                })
            } else {
                cancelOrder({
                    WorkOrderID: this.id,  // 工單編號
                    CancelReason: this.reason,  // 徹銷原因
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: this.dialogReturnMsg })
                        this.done = true  // 隱藏頁面操作按鈕
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，操作失敗' })
                }).finally(() => {
                    this.isLoading = this.dialog = false
                })
            }
        },
        // 匯出 excel (竣工單)
        excel() {
            orderFinalExecl({
                WorkOrderID: this.id,  // 工單編號
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
                let link = document.createElement('a')
                link.href = `/downloads/${res.data.file_name}`
                link.setAttribute('download', res.data.file_name)
                document.body.appendChild(link)
                link.click()
            }).catch(function (err) {
                alert('匯出失敗')
            })
        },
        // 送出 (結案)
        save() {
            if (confirm('你確定要結案嗎?')) {
                this.chLoadingShow({show:true})

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
                    this.chLoadingShow({show:false})
                })
            }
        },
    },
    created() {
        this.setShowData(this.itemData)
    }
}
</script>