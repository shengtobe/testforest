<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">工單編號：{{ workNumber }}</h2>
    
    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8">
        <BottomTable :items="bottomItems" />
    </v-row>

    <v-row class="my-8">
        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-clock</v-icon>工時&費用統計
            </h3>
            <v-card flat>
                <v-data-table
                    :headers="headers"
                    :items="tableItems"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                    class="theme-table"
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:footer>
                        <v-divider></v-divider>

                        <p class="py-2 text-center">
                            總工時： <span class="blue--text mr-5">{{ totalJobHour }}</span>
                            總金額： <span class="red--text">{{ totalMoney }}</span>
                        </p>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>

        <v-col cols="12">
            <BottomTable :items="bottomItems2" />
        </v-col>

        <v-col cols="12" class="text-center">
            <v-btn dark class="ma-2 btn-close"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <!-- <v-btn class="ma-2" dark
                :loading="isLoading"
                color="brown"
            >竣工單</v-btn> -->

            <template v-if="!done">
                <v-btn class="ma-2 btn-delete"
                    :loading="isLoading"
                    color="error"
                    @click="showDialog(true)"
                    v-if="(status == 4) && isShowBtn"
                >退回</v-btn>

                <v-btn class="ma-2" dark
                    :loading="isLoading"
                    color="yellow darken-2 btn-expansion"
                    @click="showDialog(false)" 
                    v-if="(status == 4) && isShowBtn"
                >徹銷</v-btn>

                <v-btn dark class="ma-2 btn-add"
                    :loading="isLoading" 
                    color="success"
                    @click="save"
                    v-if="(status == 4) && isShowBtn"
                >結案</v-btn>
            </template>
        </v-col>

        <!-- 按鈕說明，demo 用 -->
        <v-col cols="12" class="error--text" v-if="status == 4">
            <h4>按鈕出現說明</h4>
            竣工單、退回、徹銷、結案：結案人
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
                            hide-details :placeholder="'請輸入'+dialogTitle"
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
                <v-btn class="mr-2 btn-clear" elevation="4" :loading="isLoading" @click="dialog = false">取消</v-btn>
                <v-btn class="btn-delete" color="success"  elevation="4" :loading="isLoading" @click="withdraw">{{ dialogBtnTxt }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import TopBasicTable from '@/components/TopBasicTable.vue'
import BottomTable from '@/components/BottomTable.vue'
import { closeOrder, withdrawOrder, cancelOrder, fetchSupervisor } from '@/apis/workList/maintain'

export default {
    props: ['itemData'],
    data: () => ({
        isShowBtn: false,
        done: false,  // 是否完成頁面操作
        status: '',  // 處理狀態
        isLoading: false,  // 是否讀取中
        workNumber: '',  // 工單編號
        dialog: false,  // dialog 是否顯示
        dialogTitle: '',  // dialog 標題
        dialogBtnTxt: '', // dialog 按鈕內容
        dialogApiName: '',  // 使用的 API 函式名稱
        reason: '',  // 退回或徹銷原因
        dialogReturnMsg: '',  // 退回或徹銷時成功的訊息 (demo 時用)
        totalMoney: '',  // 工時統計的總金額
        totalJobHour: 0,  // 總工時
        tableItems: [],  // 工時表格資料
        headers: [  // 工時標題
            { text: '姓名', value: 'PeopleName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '地點', value: 'Location', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '工作項', value: 'JobName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '工作量(hr)', value: 'WorkLoad', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '料件費用', value: 'Price', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        ],
        topItems: [],  // 上面的欄位
        bottomItems: [],  // 下面的欄位
        bottomItems2: [],  // 下面的欄位2
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
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'closeWindow',  // 關閉視窗
        ]),
        setShowData(obj) {
            console.log("In ClosedComplated:obj:", obj)
            this.workNumber = obj.WorkOrderID  // 工單編號
            this.status = obj.Status  // 處理階段(值)
            this.topItems = obj.topItems  // 上面的欄位資料
            this.bottomItems = obj.bottomItems  // 下面的欄位資料
            this.bottomItems2 = obj.bottomItems2  // 下面的欄位資料
            this.tableItems = [ ...obj.WorkTimeCount ]  // 工時資料
            this.totalJobHour = obj.TotalWorkTime  // 總工時
            this.totalMoney = obj.TotalSpent  // 工時統計的總金額
            if(this.status == "4"){
                this.isShowBtn = obj.AllDepartorID == this.userData.UserId
                //查詢員工所屬的部門主管資料
                fetchSupervisor({
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                    ReqID: obj.CreatorID,  // 立單人id
                }).then(res => {
                    // this.isShowBtn = res.data == this.userData.UserId
                    // console.log("主管測試: ", res.data + "=" + this.userData.UserId);
                }).catch(err => {
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，操作失敗' })
                }).finally(() => {
                    // this.isLoading = this.dialog = false
                })
            }
            else{

            }
            
        },
        // 顯示 dialog
        showDialog(bool) {
            // 若為 true 是退回、false 是徹銷
            this.dialogTitle = (bool)? '退回原因' : '徹銷原因'
            this.dialogBtnTxt = this.dialogTitle.substr(0, 2)
            this.dialogApiName = bool  // true 為退回，false 為徹銷
            this.dialogReturnMsg = (bool)? '退回成功' : '徹銷成功'
            this.dialog = true
        },
        // 退回、徹銷
        withdraw() {
            this.isLoading = true

            if (this.dialogApiName) {
                withdrawOrder({
                    WorkOrderID: this.workNumber,  // 工單編號
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
                    WorkOrderID: this.workNumber,  // 工單編號
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
        // 確定結案
        save() {
            if (confirm('你確定要結案嗎?')) {
                this.chLoadingShow({show:true})

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