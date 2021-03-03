<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">行車事故事件附件管理</h2>

    <v-row class="px-2 mb-8">
        <!-- 表格資料 -->
        <v-col cols="12">
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

                    <template v-slot:item.link="{ item }">
                        <v-btn fab small dark color="purple lighten-2"
                            :href="item.link"
                            :download="item.fileName"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn fab small color="primary" class="mr-2"
                            @click="edit(item)"
                        >
                            <v-icon>mdi-pen</v-icon>
                        </v-btn>

                        <v-btn fab small color="error"
                            @click="del(item.id)"
                        >
                            <v-icon>mdi-delete</v-icon>
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

    <!-- 表單 -->
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-card-title class="light-blue darken-1 white--text px-4 py-1">
                編輯資料
                <v-spacer></v-spacer>
                <v-btn dark fab small text @click="dialog = false" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text class="px-6 py-4">
                <v-row>
                    <v-col cols="12">
                        <h3 class="mb-1">
                            <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>備註
                        </h3>
                        <v-text-field
                            v-model.trim="note"
                            solo
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            
            <v-card-actions class="px-5 pb-5">
                <v-spacer></v-spacer>
                <v-btn class="mr-2" elevation="4"  :loading="isLoading" @click="dialog = false">取消</v-btn>
                <v-btn color="success" elevation="4"  :loading="isLoading" @click="save">送出</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import Pagination from '@/components/Pagination.vue'

export default {
    data: () => ({
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '上傳人員', value: 'name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '上傳日期', value: 'date', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '檔案名稱', value: 'fileName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '下載', value: 'link', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '備註', value: 'note', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '更新日期', value: 'updateTime', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '編輯、刪除', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
        dialog: false,  // dialog 是否顯示
        isLoading: false,  // 是否讀取中
        editIdx: 0,  // 編輯索引值
        note: '',  // 備註
    }),
    components: { Pagination },  // 頁碼
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 初始化資料 (搜尋所有資料)
        initData() {
            this.chLoadingShow()
            this.pageOpt.page = 1  // 頁碼初始化

            regulfetchList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_RegulFileManage',  // DB table
                KeyItem: [
                    { tableColumn: 'MaintainDesp', columnValue: this.searchIpt.depart },  // 維護單位
                    { tableColumn: 'FileType', columnValue: this.searchIpt.type },  // 文件類型
                    // { tableColumn: 'CreateDTime_Start', columnValue: this.searchIpt.fileName },  // 文件名稱
                    // { tableColumn: 'CreateDTime_End', columnValue: this.searchIpt.note },  // 備註
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
            }).then(res => {
                this.tableItems = JSON.parse(res.data.order_list)
            }).catch(err => {
                console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow()
            })
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 送出
        save() {
            this.isLoading = true

            updateRegul({
                PolicyCode: this.ipt.id,  // 編號
                SelectFileType: this.ipt.type,  // 文件類別
                MaintainDesp: this.ipt.depart,  // 維護單位
                Version: this.ipt.version,  // 版次
                Remark: this.ipt.note,  // 備註
                FileName: (this.ipt.file)? this.ipt.upload.fileName : null,  // 檔案名稱
                FileType: (this.ipt.file)? this.ipt.upload.fileType : null,  // 檔案類型
                UnitData: (this.ipt.file)? this.ipt.upload.unitData : null,  // 檔案內容
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    // 待後回覆無問題，再一併寫回編輯中的該筆資料
                    this.tableItems[this.itemIndex].MaintainDesp = this.ipt.depart  // 維護單位
                    this.tableItems[this.itemIndex].FileType = this.ipt.type  // 文件類別
                    this.tableItems[this.itemIndex].Version = this.ipt.version  // 版次
                    this.tableItems[this.itemIndex].Remark = this.ipt.note  // 備註
                    this.tableItems[this.itemIndex].convert_findDate = res.data.convert_findDate  // 最後更新時間

                    // 若有傳檔案，則更新檔案路徑及檔名
                    if (this.ipt.file) {
                        this.tableItems[this.itemIndex].FileFullName = this.ipt.upload.fileName  // 檔案名稱
                        this.tableItems[this.itemIndex].file_path = res.data.file_path  // 檔案路徑
                    }

                    this.chMsgbar({ success: true, msg: '更新成功' })
                } else {
                    console.log(res.data.Msg)
                    this.chMsgbar({ success: false, msg: '更新失敗' })
                }
            }).catch(err => {
                console.log(err)
                this.chMsgbar({ success: false, msg: '伺服器發生問題' })
            }).finally(() => {
                this.isLoading = this.dialog = false
            })
        },
        // 編輯
        edit (item) {
            this.editIdx = this.tableItems.indexOf(item)  // 取得索引值

            // 設定表單資料
            this.ipt = {
                id: item.PolicyCode,  // 編號
                depart: item.MaintainDesp,  // 維護單位
                type: item.FileType,  // 文件類型
                version: item.Version,  // 版次
                file: null,  // 檔案
                note: item.Remark,  // 備註
                nowfile: item.FileFullName,  // 目前檔案名稱
            }
            this.dialog = true
        },
        // 刪除
        del(id) {
            if (confirm('你確定要刪除嗎?')) {
                this.chLoadingShow()

                deleteRegul({
                    PolicyCode: id,  // 編號
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        let idx = this.tableItems.findIndex(item => item.id == id)
                        this.tableItems.splice(idx, 1)
                        this.chMsgbar({ success: true, msg: '刪除成功' })
                    } else {
                        console.log(res.data.Msg)
                        this.chMsgbar({ success: false, msg: '刪除失敗' })
                    }
                }).catch(err => {
                    console.log(err)
                    this.chMsgbar({ success: false, msg: '伺服器發生問題' })
                }).finally(() => {
                    this.chLoadingShow()
                })
            }
        },
    },
    created() {
        this.initData()
    },
}
</script>