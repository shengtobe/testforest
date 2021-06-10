<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">行車事故事件附件管理</h2>

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
                    class="theme-table"
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:loading>
                        <span class="red--text subtitle-1">資料讀取中...</span>
                    </template>

                    <template v-slot:item.link="{ item }">
                        <v-btn fab small dark color="purple lighten-2"
                            :href="item.FileSavePath"
                            :download="item.FileSaveName"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn fab small class="mr-2 btn-modify white--text"
                            @click="edit(item)"
                        >
                            <v-icon>mdi-pen</v-icon>
                        </v-btn>

                        <v-btn fab small class="btn-delete white--text"
                            @click="del(item)"
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
        <v-card class="theme-card">
            <v-card-title class="white--text px-4 py-1">
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
import { drivingfetchList, updateDriving, deleteDriving } from '@/apis/smis/safeFile'

export default {
    data: () => ({
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '上傳人員', value: 'creator_name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '100' },
            { text: '上傳日期', value: 'convert_findDate', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '150' },
            { text: '檔案名稱', value: 'FileSaveName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '150' },
            { text: '下載', value: 'link', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '70' },
            { text: '備註', value: 'FileDescrip', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '100' },
            { text: '更新日期', value: 'convert_update', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '150' },
            { text: '編輯、刪除', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '150' },
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

            drivingfetchList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_ReportFile',  // DB table
                KeyItem: [],
                QyName: [    // 欲回傳的欄位資料
                    'ModuleItemID',
                    'FileBelongMod',
                    'InsertDTime',
                    'FileSaveName',
                    'FileSavePath',
                    'FileDescrip',
                    'UpdateDTime',
                    'CreatorID',
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

            updateDriving({
                AccidentCode: this.tableItems[this.editIdx].ModuleItemID,  // 事故編號
                FileSaveName: this.tableItems[this.editIdx].FileSaveName,  // 檔案名稱
                FileDescrip: this.note,  // 檔案說明(備註)
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    // 待後回覆無問題，再一併寫回編輯中的該筆資料
                    this.tableItems[this.editIdx].FileDescrip = this.note  // 檔案說明(備註)
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
            this.note = item.FileDescrip  // 設定表單資料 (備註)
            this.dialog = true
        },
        // 刪除
        del(item) {
            if (confirm('你確定要刪除嗎?')) {
                this.chLoadingShow()

                this.editIdx = this.tableItems.indexOf(item)  // 取得索引值

                deleteDriving({
                    AccidentCode: this.tableItems[this.editIdx].ModuleItemID,  // 事故編號
                    FileSaveName: this.tableItems[this.editIdx].FileSaveName,  // 檔案名稱
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.tableItems.splice(this.editIdx, 1)
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