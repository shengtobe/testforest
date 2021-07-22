<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">事故事件編號：{{ id }}</h2>

    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8">
        <BottomTable :items="bottomItems" />
    </v-row>

    <!-- 其他資訊 -->
    <OtherInfoShow :items="otherItems" />

    <!-- 檔案列表 -->
    <FileListShow :fileList="files" title="檔案列表" />

    <!-- 死傷人數 -->
    <HurtPeopleShow :tableItems="deathData" :deathCount="deathCount" />

    <!-- 改善措施 -->
    <ImproveMeasureShow :tableItems="controlItems" :summary="summary" />

    <!-- 檢討摘要 -->
    <v-row>
        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-2">mdi-book-open-page-variant</v-icon>措施檢討
            </h3>

            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>措施檢討摘要
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="controlReview"
                ></v-col>
            </v-row>
        </v-col>
    </v-row>

    <!-- 證據 -->
    <FileListShow :fileList="evidences"  title="證據" />

    <v-row>
        <!-- 表格資料 -->
        <v-col cols="12" class="text-center mt-2 mb-1" v-if="tableItems.length > 0"/>
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
    </v-row>

    <v-row>
        <v-col cols="12" class="text-center mt-12 mb-8">
            <v-btn dark class="ma-2"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done">
                <v-btn dark  class="ma-2" color="error"
                    @click="backDialog = true"
                    v-if="status == 4 && isShowBtn"
                >退回</v-btn>

                <v-btn dark  class="ma-2" color="success"
                    @click="save"
                    v-if="status == 4 && isShowBtn"
                >同意結案</v-btn>

                <v-btn dark  class="ma-2" color="error"
                    @click="del"
                    v-if="status == 5 && isShowBtn"
                >作廢</v-btn>
            </template>
        </v-col>
    </v-row>

    <!-- 退回 dialog -->
    <v-dialog v-model="backDialog" max-width="600px" v-if="status == 4">
        <v-card>
            <v-toolbar dark flat dense color="error" class="mb-2">
                <v-toolbar-title>退回原因</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn fab small text @click="backDialog = false" class="mr-n2">
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
                <v-btn class="mr-2" elevation="4" :loading="isLoading" @click="backDialog = false">取消</v-btn>
                <v-btn color="success"  elevation="4" :loading="isLoading" @click="withdraw">送出</v-btn>
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
import BottomTable from '@/components/BottomTable.vue'
import FileListShow from '@/components/FileListShow.vue'
import OtherInfoShow from '@/views/smis/carAccidentEvent/OtherInfoShow.vue'
import HurtPeopleShow from '@/views/smis/carAccidentEvent/HurtPeopleShow.vue'
import { harmNotifyStatus } from '@/assets/js/smisData'
import ImproveMeasureShow from '@/views/smis/carAccidentEvent/ImproveMeasureShow.vue'
import { passData, deleteData, withdrawData, resetData } from '@/apis/smis/carAccidentEvent'
import { fetchList } from '@/apis/smis/harmNotify'

export default {
    props: ['itemData'],
    data: () => ({
        id: '',  // 編號
        done: false,  // 是否完成頁面操作
        isShowBtn: false, // 按鈕是否顯示(依權限)
        status: '',  // 處理狀態
        files: [],  // 危害檔案
        topItems: [],  // 上面的欄位
        bottomItems: [],  // 下面的欄位
        tableItems: [],  // 表格資料
        statusOpts: harmNotifyStatus,  // 狀態下拉選單
        otherItems: [],  // 其他資訊
        deathCount: '',  // 死傷人數
        deathData: [],  // 死傷資料
        controlItems: [],  // 控制措施表格資料
        summary: '',  // 改善措施摘要
        controlReview: '',  // 措施檢討摘要
        evidences: [],  // 改善措施檢討證據
        isLoading: false,  // 是否讀取中
        backDialog: false,  // 退回 dialog 是否顯示
        backReason: '',  // 退回原因
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '通報日期', value: 'convert_findDate', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '通報人', value: 'PeopleName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '通報主旨', value: 'ReportTitle', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '通報狀態', value: 'ReportStatus', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        ],
    }),
    components: {
        TopBasicTable,
        BottomTable,
        OtherInfoShow,
        FileListShow,
        HurtPeopleShow,
        ImproveMeasureShow,
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
            'chViewDialog',  // 檢視內容 dialog
            'closeWindow',  // 關閉視窗
        ]),
        ...mapActions('user', [
            'saveUserGroup',  // 儲存使用者權限(群組)資料
        ]),
        // 初始化資料
        setShowData(obj) {
            this.id = obj.AccidentCode  // 編號
            this.status = obj.AccidentStatus  // 處理階段
            this.topItems = obj.topItems  // 上面的欄位資料
            this.bottomItems = obj.bottomItems  // 下面的欄位資料
            this.otherItems = obj.otherInfo  // 其他資訊
            this.files = [ ...obj.FileCount ]  // 檔案附件
            this.deathCount = obj.hurt_people_count  // 死傷人數
            this.deathData = [ ...obj.hurtPeoples ]  // 死傷資料
            this.controlItems = [ ...obj.controls ]  // 控制措施表格資料
            this.summary = obj.ProcTitle  // 改善措施摘要
            this.controlReview = obj.ProcReview  // 措施檢討摘要
            this.evidences = [ ...obj.FileCountImprove ]  // 改善措施檢討證據
            this.pageOpt.page = 1  // 頁碼初始化

            //敲門
            canInUpdate({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    this.saveUserGroup(res.data.GroupData)
                    if(this.status == 4) // 需主管同意
                        this.isShowBtn = this.groupData.RoleLv4 == "T";
                    else if(this.status == 3) // 行安人員 申請結案
                        this.isShowBtn = this.groupData.RoleLv2 == "T" || this.groupData.RoleLv4 == "T";
                }
            }).catch( err => {
                console.log(err)
            }).finally(() => {
            })

            fetchList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_ReportData',  // DB table
                IsFirstLoad: 'F',
                KeyItem: [
                    { tableColumn: 'AccidentCode', columnValue: this.id },  // 通報日期(起)
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
                console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
            })

            // // 危害通報連結 (依通報狀態連至不同頁面)
            // let arr = obj.notifyLinks.map(item => {
            //     let link = ''
            //     switch(item.status) {
            //         case '未審核':
            //             link = `/smis/harmnotify/${item.id}/show`
            //             break
            //         case '審核中':
            //             link = `/smis/harmnotify/${item.id}/review`
            //             break
            //         case '已結案':
            //             link = `/smis/harmnotify/${item.id}/complated`
            //             break
            //         default:
            //             break
            //     }

            //     return {
            //         id: item.id,
            //         link: link,
            //     }
            // })
            // this.notifyLinks = [ ...arr ]
        },
        // 檢視內容
        viewPage(item) {
            this.$router.push({ path: `/smis/harmnotify/${item.EndangerID}/show` })
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 退回
        withdraw() {
            this.isLoading = true

            withdrawData({
                AccidentCode: this.id,  // 事故事件編號
                Reason: this.backReason,  // 退回原因
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    this.chMsgbar({ success: true, msg: '退回成功' })
                    this.done = true  // 隱藏頁面操作按鈕
                } else {
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
            }).catch(err => {
                this.chMsgbar({ success: false, msg: '伺服器發生問題，退回失敗' })
            }).finally(() => {
                this.isLoading = this.backDialog = false
            })
        },
        // 同意結案
        save() {
            if (confirm('你確定要結案嗎?')) {
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
        // 作廢
        del() {
            if (confirm('你確定要作廢嗎?')) {
                this.chLoadingShow({show:true})

                deleteData({
                    AccidentCode: this.id,  // 事故事件編號
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '作廢成功' })
                        this.done = true  // 隱藏頁面操作按鈕
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    console.log(err)
                    alert('伺服器發生問題，作廢失敗')
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