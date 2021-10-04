<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">安全會議文件查詢</h2>

    <v-row class="px-2 mb-8 label-header">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>會議日期(起)
            </h3>
            <v-menu
                v-model="dateMemuShow.start"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model.trim="searchIpt.dateStart"
                        solo
                        v-on="on"
                        readonly
                        clearable
                        @click:clear="timeAClean"
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="primary"
                    v-model="searchIpt.dateStart"
                    @input="timeA"
                    :max="dateAMax"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>會議日期(迄)
            </h3>
            <v-menu
                v-model="dateMemuShow.end"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model.trim="searchIpt.dateEnd"
                        solo
                        v-on="on"
                        readonly
                        clearable
                        @click:clear="timeBClean"
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="primary"
                    v-model="searchIpt.dateEnd"
                    locale="zh-tw"
                    @input="timeB"
                    :min="dateBMin"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-tag-multiple</v-icon>會議主題
            </h3>
            <v-text-field
                v-model.trim="searchIpt.title"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file</v-icon>檔案名稱
            </h3>
            <v-text-field
                v-model.trim="searchIpt.fileName"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" class="mb-8">
            <v-btn large class="mr-3 btn-search white--text"
                @click="search"
            >
                <v-icon>mdi-magnify</v-icon>查詢
            </v-btn>

            <v-btn dark large class="mr-3 btn-add white--text"
                @click="add"
            >
                <v-icon>mdi-plus</v-icon>新增
            </v-btn>

            <v-btn elevation="2" large class="btn-clear"
                @click="reset"
            >
                <v-icon>mdi-reload</v-icon>清除搜尋內容
            </v-btn>
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
                    class="theme-table"
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:loading>
                        <span class="red--text subtitle-1">資料讀取中...</span>
                    </template>

                    <template v-slot:item.date="{ item }">
                        {{ `${item.convert_findDate} ${item.convert_findDateHr}:${item.convert_findDateMin}:00` }}
                    </template>

                    <template v-slot:item.download="{ item }">
                        <v-btn fab small dark class="btn-detail"
                            v-if="item.file_name != '' && item.file_path != ''"
                            :href="item.file_path"
                            :download="item.file_name"
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
                            @click="del(item.SaftyFlieID)"
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
                    <v-row class="label-header">
                        <v-col cols="12" sm="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>會議日期
                            </h3>
                            <v-menu
                                v-model="dateMemuShow.form"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model.trim="ipt.date"
                                        solo
                                        v-on="on"
                                        readonly
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    color="primary"
                                    v-model="ipt.date"
                                    @input="dateMemuShow.form = false"
                                    locale="zh-tw"
                                ></v-date-picker>
                            </v-menu>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-clock</v-icon>會議時間 (小時)
                            </h3>
                            <v-select
                                v-model="ipt.hour"
                                :items="opts.hour"
                                solo
                            ></v-select>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-clock</v-icon>會議時間 (分)
                            </h3>
                            <v-select
                                v-model="ipt.min"
                                :items="opts.min"
                                solo
                            ></v-select>
                        </v-col>

                        <v-col cols="12" sm="8">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-tag-multiple</v-icon>會議主題
                            </h3>
                            <v-text-field
                                v-model.trim="ipt.title"
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
                            <span class="label-warning">目前檔案： {{ ipt.nowfile }}</span>
                        </v-col>
                    </v-row>
                <!-- </v-form> -->
            </v-card-text>
            
            <v-card-actions class="px-5 pb-5">
                <v-spacer></v-spacer>
                <v-btn class="mr-2 btn-close white--text" elevation="4"  :loading="isLoading" @click="dialog = false">取消</v-btn>
                <v-btn class="btn-add white--text" elevation="4"  :loading="isLoading" @click="save">送出</v-btn>
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
import { hourOptions, minOptions } from '@/assets/js/dateTimeOption'
import { meetfetchList, createMeet, updateMeet, deleteMeet } from '@/apis/smis/safeFile'

export default {
    data: () => ({
        searchIpt: {  // 搜尋欄位
            dateStart:  '',  // 會議日期(起)
            dateEnd: new Date().toISOString().substr(0, 10),  // 會議日期(迄)
            title: '',  // 會議主題
            fileName: '',  // 檔案名稱
        },
        dateAMax: new Date().toISOString().substr(0, 10),
        dateBMin: '',
        dateMemuShow: {  // 日曆是否顯示
            start: false,
            end: false,
            form: false,  // dialog 表單內的日期
        },
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '編號', value: 'SaftyFlieID', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '150' },
            { text: '會議日期', value: 'date', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '150' },
            { text: '會議主題', value: 'MeetingTitle', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '150' },
            { text: '文件下載', value: 'download', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '100' },
            { text: '備註', value: 'Remark', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '100' },
            { text: '更新日期', value: 'convert_update', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '150' },
            { text: '編輯、刪除', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '150' },
        ],
        dialog: false,  // dialog 是否顯示
        isLoading: false,  // 是否讀取中
        itemIndex: -1,  // 作用中的物件索引值 (小於0為新增的情況)
        ipt: {},  // dialog 欄位
        defaultIpt: {  // dialog 欄位預設值
            date:  new Date().toISOString().substr(0, 10),  // 會議日期
            hour: '00',  // 會議時間(時)
            min: '00',  // 會議時間(分)
            title: '',  // 會議主題
            upload: null,  // 檔案
            note: '',  // 備註
        },
        opts: {  // 下拉選單
            hour: hourOptions,  // 會議時間(時)
            min: minOptions,  // 會議時間(分)
        },
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
        timeA(){
            this.dateMemuShow.start = false
            this.dateBMin = this.searchIpt.dateStart
        },
        timeAClean(){
            this.dateBMin = ''
        },
        timeB(){
            this.dateMemuShow.end = false
            this.dateAMax = this.searchIpt.dateEnd
        },
        timeBClean(){
            this.dateAMax = ''
        },
        // 搜尋
        search() {
            this.chLoadingShow({show:true})
            this.pageOpt.page = 1  // 頁碼初始化

            meetfetchList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_SaftyFileManage',  // DB table
                KeyItem: [
                    { tableColumn: 'CreateDTime_Start', columnValue: this.searchIpt.dateStart },  // 會議日期(起)
                    { tableColumn: 'CreateDTime_End', columnValue: this.searchIpt.dateEnd },  // 會議日期(迄)
                    { tableColumn: 'MeetingTitle', columnValue: this.searchIpt.title },  // 維護單位
                ],
                QyName: [    // 欲回傳的欄位資料
                    'SaftyFlieID',
                    'MeetingDate',
                    'MeetingTitle',
                    'Remark',
                    'UpdateDTime',
                ],
            }).then(res => {
                this.tableItems = JSON.parse(res.data.order_list)
            }).catch(err => {
                //console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow({show:false})
            })
        },
        // 清除搜尋內容
        reset() {
            this.searchIpt.dateStart = this.searchIpt.dateEnd = this.searchIpt.title= this.searchIpt.fileName = ''
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 送出
        save() {
            this.isLoading = true

            if (this.itemIndex === -1) {
                // -------- 新增時 -------
                createMeet({
                    MeetingDate: this.ipt.date,  // 會議日期
                    MeetingDateHr: this.ipt.hour,  // 會議時間(小時)
                    MeetingDateMin: this.ipt.min,  // 會議時間(分)
                    MeetingTitle: this.ipt.title,  // 會議主題
                    Remark: this.ipt.note,  // 備註
                    FileName: (this.ipt.upload != null)?this.ipt.upload.fileName:'',  // 檔案名稱
                    FileType: (this.ipt.upload != null)?this.ipt.upload.fileType:'',  // 檔案類型
                    UnitData: (this.ipt.upload != null)?this.ipt.upload.unitData:'',  // 檔案內容
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '新增成功' })
                    } else {
                        this.chMsgbar({ success: false, msg: '新增失敗' })
                    }
                }).catch(err => {
                    //console.log(err)
                    this.chMsgbar({ success: false, msg: '伺服器發生問題' })
                }).finally(() => {
                     this.isLoading = this.dialog = false
                })

            } else {
                // -------- 編輯時 -------
                updateMeet({
                    SaftyFlieID: this.ipt.id,  // 編號
                    MeetingDate: this.ipt.date,  // 會議日期
                    MeetingDateHr: this.ipt.hour,  // 會議時間(小時)
                    MeetingDateMin: this.ipt.min,  // 會議時間(分)
                    MeetingTitle: this.ipt.title,  // 會議主題
                    Remark: this.ipt.note,  // 備註
                    FileName: (this.ipt.upload)? this.ipt.upload.fileName : null,  // 檔案名稱
                    FileType: (this.ipt.upload)? this.ipt.upload.fileType : null,  // 檔案類型
                    UnitData: (this.ipt.upload)? this.ipt.upload.unitData : null,  // 檔案內容
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        // 待後回覆無問題，再一併寫回編輯中的該筆資料
                        this.tableItems[this.itemIndex].MeetingTitle = this.ipt.title  // 會議主題
                        this.tableItems[this.itemIndex].convert_findDate = this.ipt.date  // 會議日期
                        this.tableItems[this.itemIndex].convert_findDateHr = this.ipt.hour  // 會議時間(時)
                        this.tableItems[this.itemIndex].convert_findDateMin = this.ipt.min  // 會議時間(分)
                        this.tableItems[this.itemIndex].Remark = this.ipt.note  // 備註
                        this.tableItems[this.itemIndex].convert_update = res.data.convert_findDate  // 最後更新時間

                        // 若有傳檔案，則更新檔案路徑及檔名
                        if (this.ipt.upload) {
                            this.tableItems[this.itemIndex].file_name = this.ipt.upload.fileName  // 檔案名稱
                            this.tableItems[this.itemIndex].file_path = res.data.file_path  // 檔案路徑
                        }

                        this.chMsgbar({ success: true, msg: '更新成功' })
                    } else {
                        this.chMsgbar({ success: false, msg: '更新失敗' })
                    }
                }).catch(err => {
                    //console.log(err)
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
                id: item.SaftyFlieID,  // 編號
                date:  item.convert_findDate,  // 會議日期
                hour: item.convert_findDateHr,  // 會議時間(時)
                min: item.convert_findDateMin,  // 會議時間(分)
                title: item.MeetingTitle,  // 會議主題
                file: null,  // 檔案
                note: item.Remark,  // 備註
                nowfile: item.file_name,  // 目前檔案名稱
            }
            this.dialog = true
        },
        // 刪除
        del(id) {
            if (confirm('你確定要刪除嗎?')) {
                this.chLoadingShow({show:true})

                deleteMeet({
                    SaftyFlieID: id,  // 編號
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        let idx = this.tableItems.findIndex(item => item.id == id)
                        this.tableItems.splice(idx, 1)
                        this.chMsgbar({ success: true, msg: '刪除成功' })
                    } else {
                        this.chMsgbar({ success: false, msg: '刪除失敗' })
                    }
                }).catch(err => {
                    //console.log(err)
                    this.chMsgbar({ success: false, msg: '伺服器發生問題' })
                }).finally(() => {
                    this.chLoadingShow({show:false})
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
        this.search()
    },
}
</script>