<template>
<v-container style="max-width: 1200px" class="label-header">
    <h2 class="mb-4 label-title">職災事故事件編號：{{ id }}</h2>

    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8">
        <BottomTable :items="bottomItems" />

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        檔案附件
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
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        通報連結
                    </span>
                </v-col>

                <v-col class="white pa-3">
                    <v-chip small label color="teal" class="mr-2 mb-2 mb-sm-0"
                        v-for="item in notifyLinks"
                        :key="item.id"
                        :to="item.link"
                        target="_blank"
                        rel="noopener norefferrer"
                        dark
                    >
                        <v-avatar left>
                            <v-icon>mdi-link-variant</v-icon>
                        </v-avatar>
                        {{ item.id }}
                    </v-chip>
                </v-col>
            </v-row>
        </v-col>


        <!-- 檢討摘要、證據上傳 -->
        <template v-if="status == 3">
            <v-col cols="12" class="mt-12 mb-8">
                <v-divider></v-divider>
            </v-col>

            <v-col cols="12" class="mb-8">
                <h3 class="mb-2">
                    <v-icon class="mr-1 mb-1">mdi-pen</v-icon>措施檢討摘要
                </h3>
                <v-textarea
                    auto-grow
                    solo
                    rows="6"
                    placeholder="請輸入措施檢討摘要"
                    v-model.trim="controlReview"
                ></v-textarea>
            </v-col>

            <!-- 檔案列表 -->

            <UploadFileAdd
                title="檔案上傳"
                :uploadDisnable="false"
                :fileList="showFiles"
                @joinFile="joinFile"
                @rmFile="rmFile"
            />
        </template>

        <!-- 表格資料 -->
        <v-col cols="12" class="text-center mt-2 mb-2" v-if="tableItems.length > 0"/>
        <v-col cols="12" v-if="tableItems.length > 0">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-2">mdi-alarm-light</v-icon>危害通報
            </h3>
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

                    <template v-slot:item.ReportStatus="{ item }">
                            <span>{{ statusOpts.find(ele => ele.value == item.ReportStatus).text }}</span>
                        </template>

                    <!-- headers 的 content 欄位 (檢視內容) -->
                    <template v-slot:item.content="{ item }">
                        <v-btn small dark fab class="btn-detail"
                            :loading="isLoading"
                            @click="viewPage(item)"
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

        <v-col cols="12" class="text-center mt-12 mb-8">
            <v-btn dark class="ma-2 btn-close"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done">
                <v-btn dark  class="ma-2 btn-delete"
                    @click="showDialog(true)"
                    v-if="status == 2 && isShowBtn"
                >退回</v-btn>

                <v-btn dark  class="ma-2 btn-add"
                    @click="save"
                    v-if="status == 2 && isShowBtn"
                >同意措施執行</v-btn>

                <v-btn dark  class="ma-2 btn-memo"
                    @click="rerun"
                    v-if="status == 3 && isShowBtn"
                >重提事故事件</v-btn>

                <v-btn dark  class="ma-2 btn-delete"
                    @click="del"
                    v-if="status == 3 && isShowBtn"
                >作廢</v-btn>

                <v-btn dark  class="ma-2 btn-add"
                    @click="closeCase"
                    v-if="status == 3 && isShowBtn"
                >申請結案</v-btn>
            </template>
        </v-col>
    </v-row>

    <!-- 退回 dialog -->
    <v-dialog v-model="dialog" max-width="600px"
        v-if="status == 2"
    >
        <v-card>
            <v-toolbar dark flat dense class="mb-2 metal-red-top">
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
                <v-btn class="mr-2 btn-delete white--text" elevation="4" :loading="isLoading" @click="dialog = false">取消</v-btn>
                <v-btn class="btn-add white--text"  elevation="4" :loading="isLoading" @click="withdraw">送出</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { canInUpdate } from '@/apis/access'
import TopBasicTable from '@/components/TopBasicTable.vue'
import FileListShow from '@/components/FileListShow.vue'
import UploadFileAdd from '@/components/UploadFileAdd.vue'
import BottomTable from '@/components/BottomTable.vue'
import { harmNotifyStatus } from '@/assets/js/smisData'
import { fetchList } from '@/apis/smis/harmNotify'
import { passData, withdrawData, deleteData, resetData, closeData } from '@/apis/smis/jobSafety'

export default {
    props: ['itemData'],
    data: () => ({
        id: '',  // 編號
        done: false,  // 是否完成頁面操作
        status: '',  // 處理狀態
        isShowBtn: false, // 按鈕是否顯示(依權限)
        topItems: [],  // 上面的欄位
        bottomItems: [],  // 下面的欄位
        files: [],  // 上傳的檔案
        dialogReturnMsg: '',  // 退回或徹銷時成功的訊息
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        statusOpts: harmNotifyStatus,  // 狀態下拉選單
        headers: [  // 表格顯示的欄位
            { text: '通報日期', value: 'convert_findDate', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '通報人', value: 'PeopleName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '通報主旨', value: 'ReportTitle', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '通報狀態', value: 'ReportStatus', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        ],
        notifyLinks: [],  // 連結的通報
        controlReview: '',  // 措施檢討摘要
        evidences: [],  // 改善措施證據
        showFiles: [],  // 要顯示的縮圖
        isLoading: false,  // 是否讀取中
        dialog: false,  // 退回 dialog 是否顯示
        backReason: '',  // 退回原因
    }),
    components: {
        TopBasicTable,
        BottomTable,
        UploadFileAdd,
        FileListShow
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
            groupData: state => state.groupData,
        }),
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'closeWindow',  // 關閉視窗
        ]),
        ...mapActions('user', [
            'saveUserGroup',  // 儲存使用者權限(群組)資料
        ]),
        // 初始化資料
        setShowData(obj) {
            this.id = obj.AccidentCode  // 編號
            this.status = obj.AccidentStatus  // 處理狀態
            this.topItems = obj.topItems  // 上面的欄位資料
            this.bottomItems = obj.bottomItems  // 下面的欄位資料
            this.files = [ ...obj.FileCount ]  // 檔案附件
            this.pageOpt.page = 1  // 頁碼初始化

            //敲門
            canInUpdate({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    this.saveUserGroup(res.data.GroupData)
                    if(this.status == 2) // 需主管同意
                        this.isShowBtn = this.groupData.RoleLv4 == "T";
                    else if(this.status == 3) // 職安人員 
                        this.isShowBtn = this.groupData.RoleLv3 == "T";
                }
            }).catch( err => {
                //console.log(err)
            }).finally(() => {
            })

            fetchList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_ReportData',  // DB table
                IsFirstLoad: 'F',
                KeyItem: [
                    { tableColumn: 'ProAccidentCode', columnValue: this.id },  // 通報日期(起)
                ],
                QyName: [    // 欲回傳的欄位資料
                    'EndangerID',
                    'EndangerFindDate',
                    'PeopleName',
                    'ReportTitle',
                    'ReportStatus',
                ],
            }).then(res => {
                if(res.data.ErrorCode == 0){
                    this.tableItems = JSON.parse(res.data.order_list)
                    this.tableItems.forEach(element => {
                        for(let ele in element){
                            if(element[ele] == null){
                                element[ele] = '';
                            }
                        }
                    });
                }
                
            }).catch(err => {
                //console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
            })
        },
        showDialog(bool) {
            // 若為 true 是退回
            this.dialogReturnMsg = (bool)? '退回成功' : '徹銷成功'
            this.dialog = true
        },
        // 退回
        withdraw() {
            this.isLoading = true
            // setTimeout(() => {
            //     this.chMsgbar({ success: true, msg: '退回成功'})
            //     this.isLoading = this.dialog = false
            //     this.done = true  // 隱藏頁面操作按鈕
            // }, 1000)
            withdrawData({
                AccidentCode: this.id,  // 事故事件編號
                Reason: this.backReason,  // 退回原因
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
        },
        // 檢視內容
        viewPage(item) {
            this.$router.push({ path: `/smis/harmnotify/${item.EndangerID}/show` })
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 同意措施執行
        save() {
            if (confirm('你確定要同意措施執行嗎?')) {
                this.chLoadingShow({show:true})
                passData({
                    AccidentCode: this.id,  // 事故事件編號
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
                })
            }
        },
        // 加入要上傳的檔案
        joinFile(obj, bool) {
            if (bool) {
                this.evidences.push(obj)  // 加入要上傳後端的檔案
            } else {
                this.showFiles.push(obj)  // 加入要顯示的縮圖
            }
        },
        // 移除要上傳的檔案
        rmFile(idx) {
            this.showFiles.splice(idx, 1)
            this.evidences.splice(idx, 1)
        },
        // 作廢
        del() {
            if (confirm('你確定要作廢嗎?')) {
                this.chLoadingShow({show:true})

                deleteData({
                    AccidentCode: this.id,  // 編號
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '作廢成功' })
                        this.done = true  // 隱藏頁面操作按鈕
                    } else {
                        this.chMsgbar({ success: false, msg: '作廢失敗' })
                    }
                }).catch(err => {
                    //console.log(err)
                    this.chMsgbar({ success: false, msg: '伺服器發生問題' })
                }).finally(() => {
                    this.chLoadingShow({show:false})
                })
            }
        },
        // 申請結案
        closeCase() {
            if (confirm('你確定要申請結案嗎?')) {
                this.chLoadingShow({show:true})

                closeData({
                    AccidentCode: this.id,  // 事故事件編號
                    ProcReview: this.controlReview,  // 措施檢討摘要
                    FileCount: this.evidences,  // 上傳檔案列表 (證據)
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
                })
            }
        },
        // 重提事故事件
        rerun() {
            if (confirm('重提後，資料會要重新跑流程，你確定嗎?')) {
                this.chLoadingShow({show:true})

                resetData({
                    AccidentCode: this.id,  // 事故事件編號
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '重提成功' })
                        this.done = true  // 隱藏頁面操作按鈕
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，重提失敗' })
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