<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">
        {{ (this.isEdit)? `控制措施編輯 (編號：${ id })` : '控制措施新增' }}
    </h2>

    <v-row class="px-2">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-bank</v-icon>管控單位
            </h3>
            <v-select
                v-model="ipt.depart"
                :items="departOpts"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-cellphone-link-off</v-icon>措施簡述
                <span class="red--text">*</span>
            </h3>
            <v-text-field
                v-model.trim="ipt.subject"
                solo
                placeholder="請輸入措施簡述"
            ></v-text-field>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-pen</v-icon>措施說明
                <span class="red--text">*</span>
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入措施說明"
                v-model.trim="ipt.desc"
            ></v-textarea>
        </v-col>

        <v-col cols="12" sm="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-note</v-icon>備註
            </h3>
            <v-text-field
                v-model.trim="ipt.note"
                solo
                placeholder="請輸入備註"
            ></v-text-field>
        </v-col>

        <v-col cols="12" class="mb-5">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>規章文件
                <span class="red--text">*</span>
            </h3>
            <v-card>
                <v-data-table
                    :headers="headers"
                    :items="tableItems"
                    :options.sync="pageOpt"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:loading>
                        <span class="red--text subtitle-1">資料讀取中...</span>
                    </template>

                    <template v-slot:item.type="{ item }">
                        {{ (item.FileType)? typeOpts.find(ele => ele.value == item.FileType).text : '' }}
                    </template>

                    <template v-slot:item.depart="{ item }">
                        {{ (item.MaintainDesp)? departOpts.find(ele => ele.value == item.MaintainDesp).text : '' }}
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-radio-group v-model="ipt.docId">
                            <v-radio
                                class="mr-n3 ml-sm-2 mt-1"
                                color="success"
                                :value="item.PolicyCode"
                            ></v-radio>
                        </v-radio-group>
                    </template>

                    <template v-slot:item.file="{ item }">
                        <v-chip small label color="primary"
                            :href="item.file_path"
                            :download="item.FileFullName"
                        >
                            {{ item.FileFullName }}
                        </v-chip>
                    </template>

                    <template v-slot:footer="footer">
                        <Pagination
                            :footer="footer"
                            :pageOpt="pageOpt"
                            @chPage="chPage"
                        />
                    </template>
                </v-data-table>
            </v-card>
            <span class="error--text" v-if="ipt.docId == ''">*你尚未選擇安全文件!</span>
            <span v-else>
                <v-icon class="mb-2 mr-1">mdi-lightbulb-on</v-icon>
                你選擇了編號 {{ ipt.docId }} 的安全文件
            </span>
        </v-col>

        <!-- 檔案上傳 (證據)，新增時 -->
        <template v-if="!isEdit">
            <UploadFileAdd
                title="證據上傳"
                :uploadDisnable="false"
                :fileList="showFiles"
                @joinFile="joinFile"
                @rmFile="rmFile"
            />
        </template>

        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="mr-4" v-if="isEdit"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <v-btn dark class="mr-4" v-else
                to="/smis/car-harmdb/control-measures"
            >回搜尋頁</v-btn>
            
            <v-btn
                color="success"
                @click="save"
            >{{ (isEdit)? '儲存變更': '送出' }}</v-btn>
        </v-col>

        <!-- 上傳檔案 (編輯時) -->
        <template v-if="isEdit">
            <v-col cols="12" class="mt-8 mb-2">
                <v-divider></v-divider>
            </v-col>

            <UploadFileEdit
                :fileList="ipt.files"
                @uploadFile="uploadFile"
                @deleteFile="deleteFile"
                class="mb-10"
            />
        </template>
    </v-row>

    <!-- <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >

    </v-form> -->
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { departOptions } from '@/assets/js/departOption'
import Pagination from '@/components/Pagination.vue'
import UploadFileAdd from '@/components/UploadFileAdd.vue'
import UploadFileEdit from '@/components/UploadFileEdit.vue'
import { regulfetchList } from '@/apis/smis/safeFile'
import { createData, fetchList, updateData, updateFile, deleteFile } from '@/apis/smis/carHarmDatabase/controlMeasures'

export default {
    props: ['id'],  //路由參數
    data: () => ({
        valid: true,  // 表單是否驗證欄位
        isEdit: false,  // 是否為編輯
        ipt: {},
        defaultIpt: {
            depart: 'ARCO001',  // 管控單位
            subject: '',  // 措施簡述
            desc: '',  // 措施說明
            note: '',  // 備註
            docId: '',  // 連結的規章文件id
            files: [],  // 檔案(證據)
        },
        departOpts: departOptions,  // 管控單位下拉選單
        pageOpt: { page: 1 },  // 目前頁數
        tableItems: [],  // 資料
        headers: [  // 欄位
            { text: '連結', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: 70 },
            { text: '編號', value: 'PolicyCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: 150 },
            { text: '維護單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: 150 },
            { text: '類別', value: 'type', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: 100 },
            { text: '文件', value: 'file', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: 150 },
            { text: '備註', value: 'Remark', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: 100 },
            { text: '版本', value: 'Version', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: 70 },
            { text: '更新日期', value: 'convert_findDate', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: 150 },
        ],
        typeOpts: [  // 文件類型
            { text: '品質文件', value: '1' },
            { text: '維修管理文件', value: '2' },
            { text: '其他文件', value: '3' },
        ],
        showFiles: [],  // 要顯示的縮圖
    }),
    components: {
        Pagination,
        UploadFileAdd,
        UploadFileEdit,
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
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'chViewDialog',  // 檢視內容 dialog
            'closeWindow',  // 關閉視窗
        ]),
        // 初始化資料
        async initData() {
            this.chLoadingShow()
            this.ipt = { ...this.defaultIpt }  // 初始化表單

            // fetch 規章文件的資料
            try {
                let res = await regulfetchList({
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                    KeyName: 'SMS_RegulFileManage',  // DB table
                    KeyItem: [
                        { tableColumn: 'MaintainDesp', columnValue: '' },  // 維護單位
                        { tableColumn: 'FileType', columnValue: '' },  // 文件類型
                    ],
                    QyName: [    // 欲回傳的欄位資料
                        'PolicyCode',
                        'FileType',
                        'FileFullName',
                        'MaintainDesp',
                        'Version',
                        'Remark',
                        'UpdateDTime',
                    ],
                })
                
                this.tableItems = JSON.parse(res.data.order_list)  // 將資料指派到表格內
            } catch (err) {
                alert('規章文件讀取失敗')
            }

            if (this.id != undefined) {
                // -------- 編輯時，向後端請求資料 -------
                this.isEdit = true
                
                fetchList({
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                    KeyName: 'SMS_EndangerProc',  // DB table
                    KeyItem: [
                        { tableColumn: 'ProcCode', columnValue: this.id },  // 編號
                    ],
                    QyName: [    // 欲回傳的欄位資料
                        'PolicyCode',
                        'ProcCode',
                        'DeviceTitle',
                        'DeviceDesp',
                        'DeviceDepart',
                        'UpdateDTime',
                        'Remark',
                    ],
                }).then(res => {
                    this.setInitDate(JSON.parse(res.data.order_list)[0])
                }).catch(err => {
                    console.log(err)
                    alert('查詢時發生問題，請重新查詢!')
                }).finally(() => {
                    this.chLoadingShow()
                })
            } else {
                // ------- 新增時 ---------
                this.chLoadingShow()
            }
        },
        // 設定資料(編輯時)
        setInitDate(obj) {
            this.ipt.depart = obj.DeviceDepart // 管控單位
            this.ipt.subject = obj.DeviceTitle // 措施簡述
            this.ipt.desc = obj.DeviceDesp // 措施說明
            this.ipt.note = obj.Remark // 備註
            this.ipt.docId = obj.PolicyCode // 連結的安全文件id
            this.ipt.files = obj.file_path_name.map((item, idx) => ({
                fileName: item,
                link: obj.file_path[idx]
            }))
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 送出
        save() {
            if (this.ipt.docId == '') {
                alert('請選擇要連結的安全文件')
                return
            }

            this.chLoadingShow()

            if (this.isEdit) {
                // ---------- 編輯時---------- 
                if (confirm('修改內容後，有用到此措施的行車危害全部要重新審核，你確定要存檔嗎?')) {
                    updateData({
                        ProcCode: this.id,  // 措施編號
                        PolicyCode: this.ipt.docId,  // 規章編號
                        DeviceTitle: this.ipt.subject,  //措施簡述
                        DeviceDesp: this.ipt.desc,  // 措施說明
                        DeviceDepart: this.ipt.depart,  // 管控單位
                        Remark: this.ipt.note,  // 備註
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                    }).then(res => {
                        if (res.data.ErrorCode == 0) {
                            this.chMsgbar({ success: true, msg: '更新成功' })
                        } else {
                            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                            this.$router.push({ path: '/error' })
                        }
                    }).catch(err => {
                        this.chMsgbar({ success: false, msg: '伺服器發生問題，更新失敗' })
                    }).finally(() => {
                        this.chLoadingShow()
                    })
                }
            } else {
                // ---------- 新增時---------- 
                createData({
                    PolicyCode: this.ipt.docId,  // 規章編號
                    DeviceTitle: this.ipt.subject,  //措施簡述
                    DeviceDesp: this.ipt.desc,  // 措施說明
                    DeviceDepart: this.ipt.depart,  // 管控單位
                    Remark: this.ipt.note,  // 備註
                    FileCount: this.ipt.files,  // 附件檔案
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '新增成功' })
                        this.ipt = { ...this.defaultIpt }  // 初始化新增表單
                        this.ipt.files = [ ...[]]
                        this.showFiles = [ ...[]]
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，新增失敗' })
                }).finally(() => {
                    this.chLoadingShow()
                })
            }
        },
        // 加入檔案 (組件用)
        // 註：第二參數的布林值，是控制物件加入上傳後端的陣列，還是縮圖顯示的陣列
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
        // 上傳檔案 (編輯時)
        uploadFile(fileArr) {
            this.chLoadingShow()

            updateFile({
                ProcCode: this.id,  // 措施編號
                FileCount: fileArr,  // 新檔案
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    this.chMsgbar({ success: true, msg: '上傳成功' })
                    // 把檔案資料寫入畫面中
                    this.ipt.files = [ ...res.data.FileCount.map(item => ({
                        fileName: item.FileName,
                        link: item.FilePath,
                    }))]
                } else {
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
            }).catch(err => {
                this.chMsgbar({ success: false, msg: '伺服器發生問題，上傳失敗' })
            }).finally(() => {
                this.chLoadingShow()
            })
        },
        // 刪除檔案 (編輯時)
        deleteFile(idx) {
            if (confirm('你確定要刪除嗎?')) {
                this.chLoadingShow()

                deleteFile({
                    ProcCode: this.id,  // 編號
                    FileName: this.ipt.files[idx].fileName,  // 檔案名稱
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.ipt.files.splice(idx, 1)
                        this.chMsgbar({ success: true, msg: '刪除成功' })
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，刪除失敗' })
                }).finally(() => {
                    this.chLoadingShow()
                })
            }
        },
    },
    created() {
        this.initData()
    }
}
</script>