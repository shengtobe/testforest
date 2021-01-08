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
                <v-icon class="mr-1 mb-1">mdi-clock</v-icon>工時統計
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

        <v-col cols="12" class="text-center">
            <v-btn dark class="ma-2"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <!-- <v-btn class="ma-2" dark
                :loading="isLoading"
                color="brown"
            >竣工單</v-btn> -->

            <template v-if="!done">
                <v-btn class="ma-2"
                    :loading="isLoading"
                    color="error"
                    @click="showDialog(true)"
                    v-if="status == '4'"
                >退回</v-btn>

                <v-btn class="ma-2" dark
                    :loading="isLoading"
                    color="yellow darken-2"
                    @click="showDialog(false)"
                    v-if="status == '4'"
                >徹銷</v-btn>

                <v-btn dark class="ma-2"
                    :loading="isLoading"
                    color="success"
                    @click="save"
                    v-if="status == '4'"
                >結案</v-btn>
            </template>
        </v-col>

        <!-- 按鈕說明，demo 用 -->
        <v-col cols="12" class="error--text" v-if="status == '4'">
            <h4>按鈕出現說明</h4>
            竣工單、退回、徹銷、結案：結案人
        </v-col>
    </v-row>

    <!-- 退回 dialog -->
    <v-dialog v-model="dialog" max-width="600px" v-if="status == '4'">
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
import { maintainStatusOpts } from '@/assets/js/workList'
import { getNowFullTime } from '@/assets/js/commonFun'
import TopBasicTable from '@/components/TopBasicTable.vue'
import BottomTable from '@/components/BottomTable.vue'
import { closeOrder, withdrawOrder, cancelOrder } from '@/apis/workList/maintain'

export default {
    props: ['itemData'],
    data: () => ({
        done: false,  // 是否完成頁面操作
        status: '',  // 處理狀態
        isLoading: false,  // 是否讀取中
        workNumber: '',  // 工單編號
        dialog: false,  // dialog 是否顯示
        dialogTitle: '',  // dialog 標題
        dialogApiName: '',  // 使用的 API 函式名稱
        reason: '',  // 退回或徹銷原因
        dialogReturnMsg: '',  // 退回或徹銷時成功的訊息 (demo 時用)
        totalMoney: '',  // 工時統計的總金額
        totalJobHour: 0,  // 總工時
        tableItems: [],  // 工時表格資料
        headers: [  // 工時標題
            { text: '姓名', value: 'PeopleName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '地點', value: 'Location', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '工作項', value: 'JobName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '工作量', value: 'Count', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '料件費用', value: 'Price', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
        topItems: {  // 上面的欄位
            eqCodes: { icon: 'mdi-codepen', title: '設備標示編號', text: '' },
            createrDepart: { icon: 'mdi-apps', title: '立案單位', text: '' },
            creater: { icon: 'mdi-account', title: '立案人', text: '' },
            createDate: { icon: 'mdi-calendar-text', title: '立案時間', text: '' },
            fixUnit: { icon: 'mdi-apps', title: '維修單位', text: '' },
            dispatcher: { icon: 'mdi-account', title: '派工人', text: '' },
            fixType: { icon: 'mdi-source-branch', title: '維修類型', text: '' },
            acceptanceTime: { icon: 'mdi-calendar-text', title: '預計驗收日期', text: '' },
            enterControl: { icon: 'mdi-alert-outline', title: '進場管制申請', text: '' },
            specialDanger: { icon: 'mdi-alert-outline', title: '特殊危害作業', text: '' },
            safeDanger: { icon: 'mdi-alert-outline', title: '安全危害作業', text: '' },
            workLocation: { icon: 'mdi-map-marker', title: '工作地點', text: '' },
            memberCount: { icon: 'mdi-account-multiple', title: '實際人數', text: '' },
            arrivalFixDate: { icon: 'mdi-calendar-text', title: '到修日期', text: '' },
            startFixDate: { icon: 'mdi-calendar-text', title: '動工日期', text: '' },
            endFixDate: { icon: 'mdi-calendar-text', title: '完工日期', text: '' },
            status: { icon: 'mdi-ray-vertex', title: '處理階段', text: '' },
        },
    }),
    bottomItems: [],  // 下面的欄位
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
            this.workNumber = obj.WorkOrderID  // 工單編號
            this.status = obj.Status  // 處理階段(值)

            // 設定上面的欄位資料
            this.topItems.eqCodes.text = obj.MaintainCode  // 設備標示編號
            this.topItems.status.text = maintainStatusOpts.find(ele => ele.value == obj.Status).text  // 處理階段(顯示的文字)
            this.topItems.createrDepart.text = obj.CreatorDepart  // 立案單位
            this.topItems.creater.text = obj.Creator  // 立案人
            this.topItems.fixUnit.text = obj.DispatchDepart  // 維修單位
            this.topItems.dispatcher.text = obj.DispatchMan  // 派工人
            this.topItems.fixType.text = (obj.Type == '1')? '故障檢修' : ((obj.Type == '2')? '例行保養' : '')   // 維修類型
            this.topItems.createDate.text = `${obj.CreateDDay} ${obj.CreateDTime}時`  // 立案時間
            this.topItems.acceptanceTime.text = obj.ExpectedDT  // 預計驗收日期
            this.topItems.enterControl.text = (obj.WorkApplication == 'T')? '是' : '否'  // 進場管制申請
            this.topItems.specialDanger.text = (obj.WorkSp == 'T')? '是' : '否'  // 特殊危害作業
            this.topItems.safeDanger.text = (obj.WorkSafety == 'T')? '是' : '否'  // 安全危害作業
            this.topItems.workLocation.text = obj.WorkPlace  // 工作地點
            this.topItems.memberCount.text = obj.RealWorkerCount  // 實際人數
            this.topItems.arrivalFixDate.text = obj.ToRepairDDate  // 到修日期
            this.topItems.startFixDate.text = obj.StartWorkDDate  // 動工日期
            this.topItems.endFixDate.text = obj.FinishDDate  // 完工日期

            // 設定下面的欄位資料
            this.bottomItems = [
                { oneline: true, icon: 'mdi-file-document', title: '故障主旨', text: obj.WorkSubject },
                { oneline: false, icon: 'mdi-pen', title: '故障描述', text: obj.Malfunction.replace(/\n/g, '<br>') },
                { oneline: false, icon: 'mdi-note', title: '備註', text: obj.Memo.replace(/\n/g, '<br>') },
                { oneline: true, icon: 'mdi-account-multiple', title: '需證照人員', text: obj.PeopleLicense.map(ele => ele.PeopleName).join('、') },
                { oneline: true, icon: 'mdi-account-multiple', title: '作業人員', text: obj.PeopleNoLicense.map(ele => ele.PeopleName).join('、') },
                { oneline: true, icon: 'mdi-account-multiple', title: '外包廠商', text: obj.OutSourceCount.map(item => `${ item.VendorName } (${ item.PeopleCount }人)`).join('、') },
                { oneline: false, icon: 'mdi-wrench', title: '維修情況', text: obj.MaintainStatus.replace(/\n/g, '<br>') },
            ]
            
            this.tableItems = [ ...obj.WorkTimeCount ]  // 工時資料
            this.totalJobHour = obj.TotalWorkTime  // 總工時
            this.totalMoney = obj.TotalSpent  // 工時統計的總金額
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
        this.setShowData(this.itemData)
    }
}
</script>