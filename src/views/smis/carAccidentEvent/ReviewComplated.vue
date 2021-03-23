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
    <FileListShow :fileList="files" />

    <!-- 死傷人數 -->
    <HurtPeopleShow :tableItems="deathData" :deathCount="deathCount" />

     <!-- 改善措施 -->
    <ImproveMeasureShow :tableItems="controlItems" :summary="summary" />

    <v-row>
        <!-- 檢討摘要、證據上傳 -->
        <template v-if="status == 3">
            <v-col cols="12" class="mt-12 mb-2">
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

            <UploadFileAdd
                title="證據上傳"
                :uploadDisnable="false"
                :fileList="showFiles"
                @joinFile="joinFile"
                @rmFile="rmFile"
            />
        </template>

        <v-col cols="12" class="text-center mt-4 mb-12">
            <v-btn dark class="ma-2"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done">
                <v-btn dark  class="ma-2" color="error"
                    @click="dialog = true"
                    v-if="status == 2"
                >退回</v-btn>

                <v-btn dark  class="ma-2" color="success"
                    @click="save"
                    v-if="status == 2"
                >同意措施執行</v-btn>

                <v-btn dark  class="ma-2" color="primary"
                    @click="rerun"
                    v-if="status == 3"
                >重提事故事件</v-btn>

                <v-btn dark  class="ma-2" color="error"
                    @click="del"
                    v-if="status == 3"
                >作廢</v-btn>

                <v-btn dark  class="ma-2" color="success"
                    @click="closeCase"
                    v-if="status == 3"
                >申請結案</v-btn>
            </template>
        </v-col>
    </v-row>

    <!-- 退回 dialog -->
    <v-dialog v-model="dialog" max-width="600px"
        v-if="status == 2"
    >
        <v-card>
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
                <v-btn class="mr-2" elevation="4" :loading="isLoading" @click="dialog = false">取消</v-btn>
                <v-btn color="success"  elevation="4" :loading="isLoading" @click="withdraw">送出</v-btn>
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
import OtherInfoShow from '@/views/smis/carAccidentEvent/OtherInfoShow.vue'
import HurtPeopleShow from '@/views/smis/carAccidentEvent/HurtPeopleShow.vue'
import ImproveMeasureShow from '@/views/smis/carAccidentEvent/ImproveMeasureShow.vue'
import UploadFileAdd from '@/components/UploadFileAdd.vue'
import { passData, deleteData, closeData, withdrawData, resetData } from '@/apis/smis/carAccidentEvent'

export default {
    props: ['itemData'],
    data: () => ({
        id: '',  // 編號
        done: false,  // 是否完成頁面操作
        status: '',  // 處理狀態
        files: [],  // 檔案
        topItems: [],  // 上面的欄位
        bottomItems: [],  // 下面的欄位
        deathCount: '',  // 死傷人數
        deathData: [],  // 死傷資料
        controlItems: [],  // 控制措施表格資料
        summary: '',  // 改善措施摘要
        isLoading: false,  // 是否讀取中
        dialog: false,  // 退回 dialog 是否顯示
        backReason: '',  // 退回原因
        controlReview: '',  // 措施檢討摘要
        evidences: [],  // 證據
        showFiles: [],  // 要顯示的縮圖
    }),
    components: {
        TopBasicTable,
        BottomTable,
        OtherInfoShow,
        FileListShow,
        HurtPeopleShow,
        ImproveMeasureShow,
        UploadFileAdd,
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'chViewDialog',  // 檢視內容 dialog
            'closeWindow',  // 關閉視窗
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

            // 危害通報連結 (依通報狀態連至不同頁面)
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
        // 同意措施執行
        save() {
            if (confirm('你確定要同意措施執行嗎?')) {
                this.chLoadingShow()

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
                    this.chLoadingShow()
                })
            }
        },
        // 加入檔案 (組件用)
        // 註：第二參數的布林值，是控制物件加入上傳後端的陣列，還是縮圖顯示的陣列
        joinFile(obj, bool) {
            if (bool) {
                this.evidences.push(obj)  // 加入要上傳後端的檔案
            } else {
                this.showFiles.push(obj)  // 加入要顯示的縮圖
            }
        },
        // 移除要上傳的檔案 (組件用)
        rmFile(idx) {
            this.showFiles.splice(idx, 1)
            this.evidences.splice(idx, 1)
        },
        // 作廢
        del() {
            if (confirm('你確定要作廢嗎?')) {
                this.chLoadingShow()
                
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
                    this.chLoadingShow()
                })
            }
        },
        // 申請結案
        closeCase() {
            if (confirm('你確定要申請結案嗎?')) {
                this.chLoadingShow()

                closeData({
                    AccidentCode: this.id,  // 事故事件編號
                    ReviewTitle: this.controlReview,  // 措施檢討摘要
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
                    this.chLoadingShow()
                })
            }
        },
        // 重提事故事件
        rerun() {
            if (confirm('重提後，資料會要重新跑流程，你確定嗎?')) {
                this.chLoadingShow()

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