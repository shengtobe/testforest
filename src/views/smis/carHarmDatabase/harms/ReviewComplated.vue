<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">危害編號：{{ id }}</h2>

    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8">
        <BottomTable :items="bottomItems" />

        <!-- 控制措施 -->
        <ShowControlsTable :tableItems="tableItems" />
        <!-- <v-col cols="12" class="mt-8">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-check-circle</v-icon>控制措施
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

                    <template v-slot:item.DeviceDesp="{ item }">
                        <v-btn color="teal" dark
                            @click="showContent(item.DeviceDesp)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.file_path="{ item }">
                        <v-btn fab small dark color="brown"
                            :href="item.regul_file_path.link"
                            :download="item.regul_file_path"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.evidences="{ item }">
                        <v-btn fab small dark color="purple lighten-2"
                            @click="showEvidences(item.evidences)"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-col> -->

        <v-col cols="12" class="mt-12 mb-8" v-if="status == 3">
            <v-divider></v-divider>
        </v-col>
        <!-- <v-col cols="12">
            <UploadFileAdd
                title="證據上傳"
                :fileList="showFiles"
                :uploadDisnable="false"
                @joinFile="joinFile"
                @rmFile="rmFile"
            />
        </v-col> -->
        <!-- 證據上傳 -->
        <v-col cols="12" v-if="status == 3">
            <v-row>
                <v-col cols="12" sm="4" md="3">
                    <h3 class="mb-1">
                        <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>控制措施編號
                    </h3>
                    <v-select
                        v-model="controlId"
                        :items="ctrlDriveId"
                        solo
                    ></v-select>
                </v-col>

                <v-col cols="12" sm="6" md="7">
                    
                    <h3 class="mb-1">
                        <v-icon class="mr-1 mb-1">mdi-cloud-upload</v-icon>證據上傳
                    </h3>
                    
                    <v-file-input
                        label="請點此選要上傳的檔案，選擇時可按 ctrl 或 shift 複選"
                        solo
                        multiple
                        v-model="choose"
                        @change="select"
                    >
                        <template v-slot:selection="{ text }">
                            <v-chip small label color="primary" class="pa-4">{{ text }}</v-chip>
                        </template>
                    </v-file-input>
                </v-col>

                <v-col cols="12" sm="2" class="text-right text-md-left" align-self="center">
                    <v-btn large
                        color="primary"
                        @click="join"
                    >加入檔案</v-btn>
                </v-col>
            </v-row>
        </v-col>

        <!-- 上傳的檔案列表 -->
        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC" 
            v-if="status == 3"
            v-for="(list, i) in uploads"
            :key="list.controlId"
        >
            <v-row no-gutters>
                <v-col class="purple lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 200px"
                >
                    <span class="font-weight-black">
                        措施編號 {{ list.ProcCode }}
                    </span>
                </v-col>

                <v-col class="white px-3 d-flex flex-wrap">
                    <v-chip
                        v-for="(file, idx) in list.file_path_name"
                        :key="file"
                        class="mr-3 my-2"
                        label
                        color="teal"
                        dark
                    >
                        {{ file }} 
                        <v-icon right
                            @click="rmFile(i, idx)"
                        >mdi-close-circle</v-icon>
                    </v-chip>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12" class="text-center mt-12 mb-8">
            <v-btn dark class="ma-2"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done">
                <v-btn dark  class="ma-2" color="error"
                    @click="showDialog(true)"
                    v-if="status == 2"
                >退回</v-btn>

                <v-btn dark  class="ma-2" color="success"
                    @click="save"
                    v-if="status == 2"
                >同意措施執行</v-btn>

                <v-btn dark  class="ma-2" color="error"
                    @click="del"
                    v-if="status == 3"
                >作廢</v-btn>

                <v-btn dark  class="ma-2" color="primary"
                    @click="rerun"
                    v-if="status == 3"
                >重提危害</v-btn>

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

    <!-- 控制措施證據 dialog -->
    <v-dialog v-model="dialogShow" max-width="400px">
        <v-card>
            <v-toolbar flat dense dark color="purple lighten-2">
                <v-toolbar-title>證據</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn fab small text @click="dialogShow = false" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-list-item-group>
                <template v-for="(item, idx) in evidences">
                    <v-list-item
                        :key="item.name"
                        :href="item.link"
                        :download="item.name"
                    >
                        <v-list-item-content>
                            <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider
                        v-if="idx + 1 < evidences.length"
                        :key="idx"
                    ></v-divider>
                </template>
            </v-list-item-group>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import TopBasicTable from '@/components/TopBasicTable.vue'
import UploadFileAdd from '@/components/UploadFileAdd.vue'
import FileListShow from '@/components/FileListShow.vue'
import ShowControlsTable from '@/views/smis/carHarmDatabase/harms/ShowControlsTable.vue'
import BottomTable from '@/components/BottomTable.vue'
import { deleteData, sendCheckData, sendPassData, sendRetuenData, sendResetData, sendCloseData} from '@/apis/smis/carHarmDatabase/harms'

export default {
    props: ['itemData'],
    data: () => ({
        id: '',  // 編號
        done: false,  // 是否完成頁面操作
        status: '',  // 處理狀態
        topItems: [],  // 上面的欄位
        dialogReturnMsg: '',  // 退回或徹銷時成功的訊息
        bottomItems: [],  // 下面的欄位
        tableItems: [],  // 表格資料 (控制措施)
        ctrlDriveId: [], // 控制措施編號
        showFiles: [],  // 要顯示的縮圖
        eachFile:{ FileName: '' ,FileType: '', UnitData: '', ProcCode: '' },
        headers: [  // 表格欄位
            { text: '編號', value: 'ProcCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '措施簡述', value: 'DeviceTitle', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '措施說明', value: 'DeviceDesp', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '管控單位', value: 'DeviceDepart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '規章', value: 'file_path', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '證據', value: 'file_path', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '備註', value: 'Remark', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
        evidences: [],  // 控制措施證據
        dialogShow: false,  // 控制措施證據 dialog 是否顯示
        isLoading: false,  // 是否讀取中
        dialog: false,  // 退回 dialog 是否顯示
        backReason: '',  // 退回原因
        controlId: '',  // 控制措施編號 (證據上傳時用)
        choose: null,  // 上傳時所選的檔案
        uploads: [  // 證據上傳檔案列表
            // { controlId: '123', files: []},
            // { controlId: '456', files: []},
        ],  
    }),
    components: {
        TopBasicTable,
        BottomTable,
        UploadFileAdd,
        ShowControlsTable,
        FileListShow
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
        }
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
            this.id = obj.EndangerCode  // 編號
            this.status = obj.EndangerStatus  // 事故事件狀態(值)
            this.topItems = obj.topItems  // 上面的欄位資料
            this.bottomItems = obj.bottomItems  // 下面的欄位資料
            this.tableItems = [ ...obj.controls ]  // 控制措施
            // 重組編號下拉選單列表
            this.ctrlDriveId = this.tableItems.map(item => item.ProcCode )
            this.uploads = this.tableItems
        },
        showDialog(bool) {
            // 若為 true 是退回
            this.dialogReturnMsg = (bool)? '退回成功' : '徹銷成功'
            this.dialog = true
        },
        joinFile(obj, bool) {
            if (bool) {
                this.ipt.files.push(obj)  // 加入要上傳後端的檔案
            } else {
                this.showFiles.push(obj)  // 加入要顯示的縮圖
            }
        },
        // 移除要上傳的檔案 (組件用)
        rmFile(idx) {
            this.showFiles.splice(idx, 1)
            this.ipt.files.splice(idx, 1)
        },
        // 退回
        withdraw() {
            this.isLoading = true

            sendRetuenData({
                EndangerCode: this.id,  // 事故事件編號
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

                sendPassData({
                    EndangerCode: this.id,  // 編號
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.done = true  // 隱藏頁面操作按鈕
                    } else {
                        console.log(res.data.Msg)
                    }
                }).catch(err => {
                    console.log(err)
                    this.chMsgbar({ success: false, msg: '伺服器發生問題' })
                }).finally(() => {
                    this.chLoadingShow()
                })
            }
        },
        // 作廢
        del() {
            if (confirm('你確定要作廢嗎?')) {
                this.chLoadingShow()

                deleteData({
                    EndangerCode: this.id,  // 編號
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '作廢成功' })
                        this.done = true  // 隱藏頁面操作按鈕
                    } else {
                        console.log(res.data.Msg)
                        this.chMsgbar({ success: false, msg: '作廢失敗' })
                    }
                }).catch(err => {
                    console.log(err)
                    this.chMsgbar({ success: false, msg: '伺服器發生問題' })
                }).finally(() => {
                    this.chLoadingShow()
                })
            }
        },
        // 申請結案
        closeCase() {
            if (confirm('你確定要申請結案嗎?')) {
                this.chLoadingShow()

                sendCloseData({
                    EndangerCode: this.id,  // 事故事件編號
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
                    this.chLoadingShow()
                })
            }
        },
        // 顯示檢視內容
        showContent(txt) {
            this.chViewDialog({ show: true, content: txt.replace(/\n/g, '<br>') })
        },
        // 顯示證據
        showEvidences(arr) {
            this.evidences = [ ...arr ]
            this.dialogShow = true
        },
        // 重提危害
        rerun() {
            if (confirm('重提後，資料會要重新跑流程，你確定嗎?')) {
                this.chLoadingShow()

                sendResetData({
                    EndangerCode: this.id,  // 事故事件編號
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
        // 選擇上傳的檔案
        select(file) {
            this.choose = file
        },
        // 加入要上傳的檔案
        join() {
            if(this.choose == null){
                alert("請選擇要上傳的檔案")
                return
            }
            if(this.controlId == ''){
                alert("請選擇控制措施編號")
                return
            }
            // 找出目前所選的控制措施 id 檔案列表的索引值
            let idx = this.uploads.findIndex(ele => {
                return ele.ProcCode == this.controlId
            })
            // 已加入的檔案不重覆增加
            this.choose.forEach(chooseItem => {
                //檢測檔名是否存在
                let file = this.uploads[idx].file_path_name.find(item => {
                    return item == chooseItem.name
                })

                // // 若已加入列表中沒找到檔案則加入
                if (file == undefined){
                    let reader = new FileReader()  // blob 用
                    reader.readAsArrayBuffer(chooseItem)
                    
                    // 設定讀取完時的動作
                    reader.onload = () => {
                        // 抓出副檔名
                        let nameArr = chooseItem.name.split('.')  // 用小數點拆成陣列
                        let type = (nameArr.length > 1) ? nameArr[nameArr.length - 1] : ''  // 若沒有副檔名傳空值
                        
                        this.eachFile.FileName = chooseItem.name
                        this.eachFile.FileType = type
                        this.eachFile.UnitData = Array.from(new Uint8Array(reader.result))
                        this.eachFile.ProcCode = this.uploads[idx].ProcCode
                    }
                    this.evidences.push(this.eachFile)
                    
                    this.uploads[idx].file_path_name.push(chooseItem.name)
                }
                else{
                    alert("檔名有重複")
                }
            })
            this.choose = null
        },
        // 刪除要上傳的檔案
        rmFile(fileListIdx, itemIdx) {
            this.uploads[fileListIdx].file_path_name.splice(itemIdx, 1)
            this.uploads[fileListIdx].file_path.splice(itemIdx, 1)
        },
    },
    created() {
        this.setShowData(this.itemData)
    }
}
</script>