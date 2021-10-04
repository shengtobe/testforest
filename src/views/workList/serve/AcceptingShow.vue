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

        <!-- 總工時 -->
        <v-col cols="12" sm="6" md="3" class="mt-8">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-clock</v-icon>總工時
                <span class="red--text">*</span>
            </h3>
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
                <v-text-field
                    v-model.trim="totalHour"
                    solo
                    placeholder="請輸入總工時，例如：5"
                    :rules="[v => /^\d+$/.test(v) || '請輸入整數']"
                ></v-text-field>
            </v-form>
        </v-col>
        
        <!-- 操作按鈕 -->
        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="ma-2"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done">
                <v-btn class="ma-2" dark
                    color="brown"
                    @click="excel" v-if="isShowBtn"
                >竣工單</v-btn>

                <v-btn class="ma-2" dark
                    color="purple"
                    @click="delay.dialogShow = true" v-if="isShowBtn"
                >延後驗收</v-btn>

                <v-btn class="ma-2"
                    color="error" v-if="isShowBtn"
                    @click="showDialog(true)"
                >退回</v-btn>

                <v-btn class="ma-2" dark
                    color="yellow darken-2" v-if="isShowBtn"
                    @click="showDialog(false)"
                >徹銷</v-btn>

                <v-btn dark class="ma-2"
                    color="success" v-if="isShowBtn"
                    @click="save"
                >同意驗收</v-btn>
            </template>
        </v-col>
    </v-row>

    <!-- 退回 dialog -->
    <v-dialog v-model="dialog" max-width="600px">
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

    <!-- 延後驗收 dialog -->
    <v-dialog v-model="delay.dialogShow" max-width="600px">
        <v-card>
            <v-toolbar dark flat dense color="purple" class="mb-2">
                <v-toolbar-title>延後驗收</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn fab small text @click="delay.dialogShow = false" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <h3 class="mb-1">
                            <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>新驗收日
                        </h3>
                        <v-menu
                            v-model="delay.menuShow"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model.trim="delay.newDate"
                                    solo
                                    v-on="on"
                                    readonly
                                    hide-details
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                color="purple"
                                v-model="delay.newDate"
                                @input="delay.menuShow = false"
                                locale="zh-tw"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>

                    <!-- <v-col cols="12" sm="6" md="4" offset-md="2" align-self="center">
                        <v-checkbox
                            v-model="delay.shortage"
                            label="缺料"
                            color="red darken-3"
                            class="mt-0 mt-sm-6"
                            hide-details
                        ></v-checkbox>
                    </v-col> -->
                    
                    <v-col cols="12">
                        <h3 class="mb-1">
                            <v-icon class="mr-1 mb-1">mdi-note</v-icon>延後原因
                        </h3>
                        <v-textarea
                            placeholder="請輸入延後原因"
                            hide-details
                            auto-grow
                            solo
                            rows="6"
                            v-model.trim="delay.reason"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            
            <v-card-actions class="px-5 pb-5">
                <v-spacer></v-spacer>
                <v-btn class="mr-2" elevation="4" :loading="isLoading" @click="delay.dialogShow = false">取消</v-btn>
                <v-btn color="success"  elevation="4" :loading="isLoading" @click="delaySave">送出</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { acceptanceOrder, withdrawOrder, cancelOrder, delayOrder, orderFinalExecl } from '@/apis/workList/serve'
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
        isLoading: false,  // 是否讀取中
        valid: false,  // 是否驗證欄位 (方便測試先取消)
        topItems: [],  // 上面的欄位
        bottomItems: [],  // 下面的欄位
        tableItems: [],  // 表格資料
        totalHour: '',  // 總工時
        dialog: false,  // dialog 是否顯示
        dialogTitle: '',  // dialog 標題
        dialogApiName: '',  // 使用的 API 函式名稱
        reason: '',  // 退回或徹銷原因
        dialogReturnMsg: '',  // 退回或徹銷時成功的訊息 (demo 時用)
        delay: {  // 延後驗收
            dialogShow: false,
            menuShow: false,  // 日期選單是否顯示
            reason: '',  // 原因
            newDate: new Date().toISOString().substr(0, 10),  // 新驗收日
            // shortage: false,  // 是否缺料
        },
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
            this.tableItems = [ ...obj.tableItems ]  // 表格資料
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
        // 延後驗收送出
        delaySave() {
            this.isLoading = true

            delayOrder({
                WorkOrderID: this.id,  // 工單編號
                DelayDTime: this.delay.newDate,  // 延後驗收時間
                DelayReason: this.delay.reason,  // 延後驗收原因
                // LostMateriel: (this.delay.shortage)? 'T' : 'F',  // 是否缺料
                LostMateriel: 'F',  // 是否缺料(暫定服務科沒缺料問題，所以先直接傳F)
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    this.chMsgbar({ success: true, msg: '延後驗收成功' })
                    this.done = true  // 隱藏頁面操作按鈕
                } else {
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
            }).catch(err => {
                this.chMsgbar({ success: false, msg: '伺服器發生問題，操作失敗' })
            }).finally(() => {
                this.isLoading = this.delay.dialogShow = false
            })
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
        // 送出 (確定驗收)
        save() {
            // if (this.$refs.form.validate()) {  // 表單驗證欄位
                if (confirm('你確定要驗收嗎?')) {
                    this.chLoadingShow({show:true})

                    acceptanceOrder({
                        WorkOrderID: this.id,  // 工單編號
                        TotalWorkTime: this.totalHour,  // 總工時
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                    }).then(res => {
                        if (res.data.ErrorCode == 0) {
                            this.chMsgbar({ success: true, msg: '送出成功' })
                            this.done = true  // 隱藏頁面操作按鈕
                        } else {
                            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                            this.$router.push({ path: '/error' })
                        }
                    }).catch(err => {
                        this.chMsgbar({ success: false, msg: '伺服器發生問題，送出失敗' })
                    }).finally(() => {
                        this.chLoadingShow({show:false})
                        // this.$refs.form.resetValidation()  // 取消欄位驗證的紅字樣式
                    })
                }
            // }
        },
    },
    created() {
        this.setShowData(this.itemData)
    }
}
</script>