<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">通報編號：{{ id }}</h2>

    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />
    <!-- 下面的欄位 -->
    <BottomTable :items="bottomItems" class="mt-8"/>

    <!-- 檔案列表 -->
    <FileListShow :fileList="files" title="檔案列表" />

    <v-row no-gutters class="mt-8">
        <!-- <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-pen</v-icon>通報主旨
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ subject }}</v-col>
            </v-row>
        </v-col> -->

        <!-- <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-note</v-icon>通報內容
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="content"
                ></v-col>
            </v-row>
        </v-col> -->

        <!-- <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-paperclip</v-icon>檔案附件
                    </span>
                </v-col>

                <v-col class="white pa-3">
                    <v-chip small label color="primary" class="mr-2 mb-2 mb-sm-0"
                        v-for="item in files"
                        :key="item.fileName"
                        :href="item.link"
                        :download="item.fileName"
                    >
                        {{ item.fileName }}
                    </v-chip>
                </v-col>
            </v-row>
        </v-col> -->

        <!-- <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>回覆日期
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ replayTime }}</v-col>
            </v-row>
        </v-col> -->

        <!-- <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-message-processing</v-icon>回覆訊息
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ replayMsg }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>立案狀態
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ caseStatus }}</v-col>
            </v-row>
        </v-col> -->

        <!-- 不立案才顯示 -->
        <!-- <v-col cols="12" style="border-bottom: 1px solid #CFD8DC"
        >
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-alert-decagram</v-icon>不立案原因
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ noActionReason }}</v-col>
            </v-row>
        </v-col> -->

        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="mr-2 btn-close"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template >
                <v-btn dark  class="ma-2 btn-modify"
                    @click="edit" v-if="(!done) && isShowBtn"
                >變更立案類型</v-btn>

                <v-btn dark  class="ma-2" color="error"
                    @click="dialog = true"  v-if="(!done) && isShowBtn_s4"
                >退回</v-btn>

                <v-btn dark  class="ma-2" color="success"
                    @click="save" v-if="(!done) && isShowBtn_s4"
                >同意不立案</v-btn>
            </template>
        </v-col>
    </v-row>

    <!-- 退回 dialog -->
    <v-dialog v-model="dialog" max-width="600px"
    >
        <v-card class="theme-del-card">
            <v-toolbar dark flat dense color="error" class="mb-2">
                <v-toolbar-title>退回原因</v-toolbar-title>
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
                            solo
                            rows="8"
                            placeholder="請輸入原因"
                            v-model.trim="backReason"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            
            <v-card-actions class="px-5 pb-5">
                <v-spacer></v-spacer>
                <v-btn class="mr-2 btn-close white--text" elevation="4" :loading="isLoading" @click="dialog = false">取消</v-btn>
                <v-btn class="btn-add white--text"  elevation="4" :loading="isLoading" @click="withdraw">送出</v-btn>
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
import FileListShow from '@/components/FileListShow.vue'
import { carEventItems, jobEventItems } from '@/assets/js/smisTestData'
import { locationOpts } from '@/assets/js/smisData'
import { recordNotify, noRecord } from '@/apis/smis/harmNotify'
import { fetchSupervisor } from '@/apis/workList/maintain'

export default {
    props: ['itemData'],
    // props: ['closeStatus'],  // 測試用屬性
    data: () => ({
        routeId: '',
        isShowBtn: false,
        isShowBtn_s4: false,
        done: false,  // 是否完成頁面操作
        topItems: {  // 上面的欄位
            creater: { icon: 'mdi-account', title: '通報人', text: '' },
            depart: { icon: 'mdi-apps', title: '所屬部門', text: '' },
            findDate: { icon: 'mdi-calendar-text', title: '發現日期', text: '' },
            createDate: { icon: 'mdi-calendar-text', title: '填報日期', text: '' },
            findLocation: { icon: 'mdi-map-marker', title: '發現地點', text: '' },
            status: { icon: 'mdi-ray-vertex', title: '通報狀態', text: '' },
        },
        bottomItems: {  // 上面的欄位
            a1: { icon: 'mdi-pen', title: '通報主旨', text: '' },
            depart: { icon: 'mdi-apps', title: '所屬部門', text: '' },
            findDate: { icon: 'mdi-calendar-text', title: '發現日期', text: '' },
            createDate: { icon: 'mdi-calendar-text', title: '填報日期', text: '' },
            findLocation: { icon: 'mdi-map-marker', title: '發現地點', text: '' },
            status: { icon: 'mdi-ray-vertex', title: '通報狀態', text: '' },
        },
        subject: '',  // 通報主旨
        content: '',  // 通報內容
        files: [],  // 檔案附件
        replayMsg: '',  // 回覆訊息
        replayTime: '',  // 回覆日期
        replyRadios: [
            { text: '感謝通報，已通知相關單位處理', value: 1 },
            { text: '感謝通報，已採「既有行安危害」立案', value: 2 },
            { text: '感謝通報，已採「既有行安事故」立案', value: 3 },
            { text: '自訂回覆訊息', value: 4 },
        ],
        caseStatus: '',  // 立案狀態
        noActionReason: '',  // 不立案原因
        isLoading: false,  // 是否讀取中
        dialog: false,  // dialog 是否顯示
        backReason: '',  // 退回原因
    }),
    components: { TopBasicTable, BottomTable, FileListShow, fetchSupervisor },
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        }
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
            groupData: state => state.groupData,  // 使用者基本資料
        }),
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'closeWindow',  // 關閉視窗
        ]),
        // 向後端取得資料
        fetchData() {
            this.chLoadingShow({show:true})
            // this.routeId = this.$route.params.id
            this.routeId = this.id

            // 新增測試用資料
            // setTimeout(() => {
            //     let caseTxt = (this.closeStatus == '審核中')? '不立案' : (this.routeId == 'SH995413')? '既有行安危害立案' : '既有行安事故立案'
            //     let repTxt = (this.closeStatus == '審核中')? '感謝通報，已通知相關單位處理' : (this.routeId == 'SH995413')? '感謝通報，已採「既有行安危害」立案' : '感謝通報，已採「既有行安事故」立案'
                
            //     let obj = {
            //         // id: 'a201586369',  // 通報id
            //         creater: '王小明',  // 通報人
            //         createrId: 'OB851234',  // 員工編號
            //         depart: '鐵路服務科',  // 部門
            //         findDate: '2020-03-15',  // 發現日期
            //         findHour: '14',  // 發現日期(時)
            //         findMin: '00',  // 發現日期(分)
            //         createDate: '2020-03-15 15:20:00',  // 填表日期
            //         location: 'l1',  // 發現地點
            //         locationK: 20,  // 路線k
            //         locationM: 445,　// 路線m
            //         locationOther: '',　// 其他地點
            //         status: this.closeStatus,  // 通報狀態
            //         caseStatus: caseTxt,  // 立案狀態
            //         subject: (this.routeId == 'SH995413')? '路基持續有噴泥現象' : '1070225事故資訊',  // 通報主旨
            //         content: (this.routeId == 'SH995413')? 'XXX年XX月XX日隨乘機車路經木屐寮~樟腦寮路段，於約20K處發現多處噴泥現象，恐影響...' : '木屐寮~樟腦寮路段大雨後常有噴泥狀況，溝渠阻塞、排水不良應是主因...',  // 通報內容
            //         files: [
            //             { fileName: 'ASRC200701.jpg', link: '/demofile/demo.jpg' },
            //             { fileName: 'ASRC200702.jpg', link: '/demofile/demo2.jpg' },
            //             { fileName: '123.pdf', link: '/demofile/123.pdf' },
            //             { fileName: '123.docx', link: '/demofile/123.docx' },
            //             { fileName: '456.xlsx', link: '/demofile/456.xlsx' },
            //         ],
            //         replayMsg: repTxt,  // 回覆的訊息
            //         replayTime: '2020-03-16 09:15:00',  // 回覆日期
            //         noActionReason: '重覆通報',  // 不立案原因
            //     }

            //     this.setShowData(obj)
            //     this.chLoadingShow({show:true})
            // }, 1000)
        },
        // 初始化資料
        setShowData(obj) {
            this.status = obj.ReportStatus  // 狀態(用來判斷是否已回覆通報人)
            this.id = obj.EndangerID  // 危害通報編號
            this.topItems = obj.topItems  // 上面的欄位資料
            this.bottomItems = obj.bottomItems  // 下面的欄位資料
            this.files = [ ...obj.FileCount ]  // 檔案附件
            this.replayMsg = obj.ReplyMsg  // 回覆訊息
            this.isShowBtn = this.groupData.RoleLv2 == "T" || this.groupData.RoleLv3 == "T"
            if(obj.ReportStatus == '4'){ // 審核中
                this.isShowBtn = false
                let sup
                fetchSupervisor({
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                    ReqID: obj.NoticePeopleId,  // 立單人id
                }).then(res => {
                    // this.isShowBtn = res.data == this.userData.UserId
                    sup = res.data.ID
                    if(this.userData.UserId == sup){ // 如果登入者是主管
                        this.isShowBtn_s4 = true
                    }
                    else{ // 都不是
                    }
                }).catch(err => {
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，操作失敗' })
                }).finally(() => {
                    // this.isLoading = this.dialog = false
                })
            }// 審核中 加會中 已發布 END
            // this.topItems.creater.text = `${obj.NoticePeople} (${obj.NoticePeopleId})`  // 通報人
            // // this.topItems.creater.text = obj.NoticePeople  // 通報人
            // this.topItems.depart.text = obj.NoticePeopleDepart  // 部門
            // // this.topItems.findDate.text = `${obj.findDate} ${obj.findHour}:${obj.findMin}:00`  // 發現日期
            // this.topItems.findDate.text = obj.FindDTime  // 發現日期
            // this.topItems.createDate.text = obj.FillDTime  // 填表日期
            // this.topItems.findLocation.text = `${locationOpts.find(item => item.value == obj.FindLine).text} ${obj.FindKLine}K+${obj.FindMLine}M`  // 發現地點
            // this.topItems.status.text = obj.status  // 通報狀態

            // this.subject = obj.subject  // 通報主旨
            // this.content = obj.content // 通報內容
            // this.files = [ ...obj.files ]  // 檔案附件
            // this.replayMsg = obj.replayMsg // 回覆的訊息
            // this.replayTime = obj.replayTime // 回覆日期
            // this.caseStatus = obj.caseStatus // 立案狀態
            // this.noActionReason = obj.noActionReason  // 不立案原因
        },
        // 退回
        withdraw() {
            if (confirm('你確定要退回嗎?')) {
                this.isLoading = true
                noRecord({
                    EndangerID: this.id,  // 通報編號
                    CheckMode: '2',
                    Reason: this.backReason,  // 
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '退回成功'})
                        this.done = true  // 隱藏按鈕
                        this.dialog = false
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                        this.chMsgbar({ success: false, msg: '伺服器發生問題'})
                }).finally(() => {
                    this.chLoadingShow({show:false})
                })
            }
            else{
                this.chLoadingShow({show:false})
            }
            

            // setTimeout(() => {
            //     this.chMsgbar({ success: true, msg: '退回成功'})
            //     this.done = true  // 隱藏頁面操作按鈕
            //     this.dialog = false
            // }, 1000)
        },
        // 同意不立案
        save() {
            if (confirm('你確定要不立案嗎?')) {
                this.chLoadingShow({show:true})

                noRecord({
                    EndangerID: this.id,  // 通報編號
                    CheckMode: '1',
                    Reason: '',  // 
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '審核完成'})
                        this.done = true  // 隱藏按鈕
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                        this.chMsgbar({ success: false, msg: '伺服器發生問題'})
                }).finally(() => {
                    this.chLoadingShow({show:false})
                })
            }
        },
        // 變更立案類型
        edit() {
            // 請後端更改危害狀態為2 (已回覆尚未立案)
            // 收到後端回應後，重新導向回 show 的路由
            if (confirm('你確定要變更立案類型嗎?')) {
                this.chLoadingShow({show:true})

                recordNotify({
                    EndangerID: this.id,  // 通報編號
                    DriveRecordType: 'no',  // 行安立案類型
                    DriveRecordCase: 'no',  // 行安立案種類
                    ProfesRecordType: 'no',  // 職安立案類型
                    ProfesRecordCase: 'no',  // 職安立案種類
                    DriveConnectID: 'no',
                    ProfesConnectID: 'no',
                    EndangerCode: '',
                    NoRecord: 'F',  // 是否不立案
                    ChangeRecord: 'T',  // 是否變更立案類型
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '變更立案成功'})
                        this.done = true  // 隱藏按鈕
                        setTimeout(() => {
                            this.$router.go()
                        }, 800)
                        
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                        this.chMsgbar({ success: false, msg: '變更立案成功'})
                }).finally(() => {
                    this.chLoadingShow({show:false})
                })
            }
        },
    },
    created() {
        // this.fetchData()
        this.setShowData(this.itemData)
    },
}
</script>