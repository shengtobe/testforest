<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">規章文件查詢</h2>

    <v-row class="px-2 mb-8">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-bank</v-icon>維護單位
            </h3>
            <v-select
                v-model="searchIpt.depart"
                :items="serchDepartOpts"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>文件類型
            </h3>
            <v-select
                v-model="searchIpt.type"
                :items="serchTypeOpts"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-tag</v-icon>文件名稱
            </h3>
            <v-text-field
                v-model.trim="searchIpt.fileName"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-note</v-icon>備註
            </h3>
            <v-text-field
                v-model.trim="searchIpt.note"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" class="mb-8">
            <v-btn color="success" large class="mr-3"
                @click="search"
            >
                <v-icon>mdi-magnify</v-icon>查詢
            </v-btn>

            <v-btn color="indigo" dark large class="mr-3"
                @click="add"
            >
                <v-icon>mdi-plus</v-icon>新增
            </v-btn>

            <!-- <v-btn elevation="2" large class="mr-3"
                @click="reset"
            >
                <v-icon>mdi-reload</v-icon>清除搜尋內容
            </v-btn> -->
        </v-col>
        
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

                    <template v-slot:item.type="{ item }">
                        {{ (item.FileType)? typeOpts.find(ele => ele.value == item.FileType).text : '' }}
                    </template>

                    <template v-slot:item.depart="{ item }">
                        {{ (item.MaintainDesp)? departOpts.find(ele => ele.value == item.MaintainDesp).text : '' }}
                    </template>

                    <template v-slot:item.file="{ item }">
                        <v-chip small label color="primary"
                            :href="item.file_path"
                            :download="item.FileFullName"
                        >
                            {{ item.FileFullName }}
                        </v-chip>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn fab small color="primary" class="mr-2"
                            @click="edit(item)"
                        >
                            <v-icon>mdi-pen</v-icon>
                        </v-btn>

                        <v-btn fab small color="error"
                            @click="del(item.PolicyCode)"
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
                {{ dialogTitle }}
                <v-spacer></v-spacer>
                <v-btn dark fab small text @click="dialog = false" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text class="px-6 py-4">
                <!-- <v-form
                    ref="setjobform"
                    v-model="jobFormValid"
                    lazy-validation
                > -->
                    <v-row>
                        <v-col cols="12" sm="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-bank</v-icon>維護單位
                            </h3>
                            <v-select
                                v-model="ipt.depart"
                                :items="departOpts"
                                solo
                            ></v-select>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>文件類型
                            </h3>
                            <v-select
                                v-model="ipt.type"
                                :items="typeOpts"
                                solo
                            ></v-select>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-tag-multiple</v-icon>版次
                            </h3>
                            <v-text-field
                                v-model.trim="ipt.version"
                                solo
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-note</v-icon>備註
                            </h3>
                            <v-text-field
                                v-model.trim="ipt.note"
                                solo
                            ></v-text-field>
                        </v-col>

                        <!-- 文件上傳 -->
                        <UploadOneFileAdd @joinFile="select" />

                        <v-col cols="12" v-if="itemIndex > -1" class="mt-n10">
                            <span class="error--text">目前檔案： {{ ipt.nowfile }}</span>
                        </v-col>
                    </v-row>
                <!-- </v-form> -->
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
import UploadOneFileAdd from '@/components/UploadOneFileAdd.vue'
import { departOptions } from '@/assets/js/departOption'
import { regulfetchList, regulCreate, updateRegul, deleteRegul } from '@/apis/smis/safeFile'

export default {
    data: () => ({
        searchIpt: {  // 搜尋欄位
            depart: '',  // 維護單位
            type: '',  // 文件類型
            fileName: '',  // 文件名稱
            note: '',  // 備註
        },
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '文件類別', value: 'type', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '150' },
            { text: '文件名稱', value: 'file', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '150' },
            { text: '維護單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '100' },
            { text: '版次', value: 'Version', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '100' },
            { text: '備註', value: 'Remark', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '100' },
            { text: '更新日期', value: 'convert_findDate', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '150' },
            { text: '編輯、刪除', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '150' },
        ],
        serchDepartOpts: [  // 搜尋表單維護單位下拉選單
            { text: '不限', value: '' },
            ...departOptions,
        ],
        serchTypeOpts: [  // 搜尋表單文件類型下拉選單
            { text: '不限', value: '' },
            { text: '品質文件', value: '1' },
            { text: '維修管理文件', value: '2' },
            { text: '其他文件', value: '3' },
        ],
        dialog: false,  // dialog 是否顯示
        isLoading: false,  // 是否讀取中
        itemIndex: -1,  // 作用中的物件索引值 (小於0為新增的情況)
        ipt: {},  // dialog 欄位
        defaultIpt: {  // dialog 欄位預設值
            depart: 'ARCO001',  // 維護單位
            type: '1',  // 文件類型
            version: '',  // 版次
            upload: null,  // 檔案
            note: '',  // 備註
        },
        departOpts: departOptions,  // dialog 維護單位下拉選單
        typeOpts: [  // dialog 文件類型下拉選單
            { text: '品質文件', value: '1' },
            { text: '維修管理文件', value: '2' },
            { text: '其他文件', value: '3' },
        ],
    }),
    components: {
        Pagination,
        UploadOneFileAdd,
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
        dialogTitle () {
            return this.itemIndex === -1 ? '新增資料' : '編輯資料'
        },
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 搜尋
        search() {
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
        // 清除搜尋內容
        // reset() {
        //     this.searchIpt.depart = this.searchIpt.type = this.searchIpt.fileName = ''
        // },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 送出
        save() {
            this.isLoading = true
            if (this.itemIndex === -1) {
                // -------- 新增時 -------
                if(this.ipt.upload != null && this.ipt.upload != undefined){
                    regulCreate({
                        SelectFileType: this.ipt.type,  // 文件類別
                        MaintainDesp: this.ipt.depart,  // 維護單位
                        Version: this.ipt.version,  // 版次
                        Remark: this.ipt.note,  // 備註
                        FileName: this.ipt.upload.fileName,  // 檔案名稱
                        FileType: this.ipt.upload.fileType,  // 檔案類型
                        UnitData: this.ipt.upload.unitData,  // 檔案內容
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                    }).then(res => {
                        console.log("res.data", res.data)
                        if (res.data.ErrorCode == 0) {
                            this.chMsgbar({ success: true, msg: '新增成功' })
                        } else {
                            console.log(res.data.Msg)
                            this.chMsgbar({ success: false, msg: '新增失敗' })
                        }
                    }).catch(err => {
                        console.log(err)
                        this.chMsgbar({ success: false, msg: '伺服器發生問題' })
                    }).finally(() => {
                        this.isLoading = this.dialog = false
                    })
                }
                else{
                    this.isLoading = false
                    alert("未選擇上傳文件")
                }

            } else {
                // -------- 編輯時 -------
                updateRegul({
                    PolicyCode: this.ipt.id,  // 編號
                    SelectFileType: this.ipt.type,  // 文件類別
                    MaintainDesp: this.ipt.depart,  // 維護單位
                    Version: this.ipt.version,  // 版次
                    Remark: this.ipt.note,  // 備註
                    FileName: (this.ipt.upload)? this.ipt.upload.fileName : null,  // 檔案名稱
                    FileType: (this.ipt.upload)? this.ipt.upload.fileType : null,  // 檔案類型
                    UnitData: (this.ipt.upload)? this.ipt.upload.unitData : null,  // 檔案內容
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
                        if (this.ipt.upload) {
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
            }
        },
        // 新增
        add() {
            this.itemIndex = -1  // 初始化索引值
            this.ipt = { ...this.defaultIpt }  // 初始化表單
            this.dialog = true
        },
        // 編輯
        edit (item) {
            this.itemIndex = this.tableItems.indexOf(item)  // 取得索引值

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
        // 選擇檔案(dialog內)
        select(file) {
            this.ipt.upload = file
        },
    },
    created() {
        this.ipt = { ...this.defaultIpt }
    },
}
</script>