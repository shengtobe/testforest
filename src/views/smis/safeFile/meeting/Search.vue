<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">安全會議文件查詢</h2>

    <v-row class="px-2 mb-8">
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
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="purple"
                    v-model="searchIpt.dateStart"
                    @input="dateMemuShow.start = false"
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
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="purple"
                    v-model="searchIpt.dateEnd"
                    @input="dateMemuShow.end = false"
                    locale="zh-tw"
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

            <v-btn elevation="2" large
                @click="reset"
            >
                <v-icon class="mr-1">mdi-reload</v-icon>重置
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
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:loading>
                        <span class="red--text subtitle-1">資料讀取中...</span>
                    </template>

                    <template v-slot:item.date="{ item }">
                        {{ `${item.date} ${item.hour}:${item.min}:00` }}
                    </template>

                    <template v-slot:item.download="{ item }">
                        <v-btn fab small dark color="purple lighten-2"
                            :href="item.download.link"
                            target="_blank"
                            rel="noopener norefferrer"
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
                                    color="purple"
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

                        <v-col cols="12">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-cloud-upload</v-icon>文件上傳
                            </h3>
                            <v-file-input
                                label="請點此選擇要上傳的檔案"
                                solo
                                v-model="ipt.file"
                                @change="select"
                            ></v-file-input>
                        </v-col>

                        <v-col cols="12" v-if="itemIndex > -1" class="mt-n10">
                            <span class="error--text">目前檔案： {{ ipt.download.fileName }}</span>
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
import { mapActions } from 'vuex'
import Pagination from '@/components/Pagination.vue'
import { hourOptions, minOptions } from '@/assets/js/dateTimeOption'

export default {
    data: () => ({
        searchIpt: {  // 搜尋欄位
            dateStart:  '',  // 會議日期(起)
            dateEnd: '',  // 會議日期(迄)
            title: '',  // 會議主題
            fileName: '',  // 檔案名稱
        },
        dateMemuShow: {  // 日曆是否顯示
            start: false,
            end: false,
            form: false,  // dialog 表單內的日期
        },
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '會議日期', value: 'date', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '會議主題', value: 'title', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '文件下載', value: 'download', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '更新日期', value: 'updateTime', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '備註', value: 'note', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '編輯、刪除', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
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
            file: null,  // 檔案
            note: '',  // 備註
        },
        opts: {  // 下拉選單
            hour: hourOptions,  // 會議時間(時)
            min: minOptions,  // 會議時間(分)
        },
    }),
    components: { Pagination },  // 頁碼
    computed: {
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

            // 新增測試用資料
            setTimeout(() => {
                this.tableItems = [
                    {
                        id: '111',
                        date: '2020-05-01',
                        hour: '09',
                        min: '30', 
                        title: '行車安全研討會',
                        download: { fileName: '123.pdf', link: '/demofile/123.pdf' },
                        updateTime: '2020-05-01',
                        note: '',
                    },
                    {
                        id: '222',
                        date: '2020-04-16',
                        hour: '15',
                        min: '20', 
                        title: '年度保養檢討會',
                        download: { fileName: 'ASRC200701.jpg', link: '/demofile/demo.jpg' },
                        updateTime: '2020-04-16',
                        note: '',
                    },
                    {
                        id: '333',
                        date: '2020-03-21',
                        hour: '11',
                        min: '40', 
                        title: '職業安全研討會',
                        download: { fileName: '123.docx', link: '/demofile/123.docx' },
                        updateTime: '2020-03-21',
                        note: '',
                    },
                ]
                this.chLoadingShow()
            }, 1000)
        },
        // 重置
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

            setTimeout(() => {
                let txt = this.itemIndex === -1 ? '新增成功' : '更新成功'
                this.chMsgbar({ success: true, msg: txt })
                this.isLoading = this.dialog = false
                this.ipt = { ...this.defaultIpt }  // 初始化表單
            }, 1000)
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
            this.ipt = { ...item }  // 設定表單資料
            this.dialog = true
        },
        // 刪除
        del(id) {
            if (confirm('你確定要刪除嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    let idx = this.tableItems.findIndex(item => item.id == id)
                    this.tableItems.splice(idx, 1)
                    this.chMsgbar({ success: true, msg: '刪除成功'})
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 選擇檔案(dialog內)
        select(file) {
            this.ipt.file = file
        },
    },
    created() {
        this.ipt = { ...this.defaultIpt }
    },
}
</script>