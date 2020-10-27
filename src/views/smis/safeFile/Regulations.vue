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

            <v-btn elevation="2" large
                @click="reset"
            >
                <v-icon>mdi-reload</v-icon>重置
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

                    <template v-slot:item.depart="{ item }">
                        {{ transferDepartTxt(item.depart) }}
                    </template>

                    <template v-slot:item.type="{ item }">
                        {{ transferTypeTxt(item.type) }}
                    </template>

                    <template v-slot:item.file="{ item }">
                        <v-chip small label color="primary"
                            :href="item.file.link"
                            :download="item.file.fileName"
                        >
                            {{ item.file.fileName }}
                        </v-chip>
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
                            <span class="error--text">目前檔案： {{ ipt.file.fileName }}</span>
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
import { departOptions } from '@/assets/js/departOption'

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
            { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '文件類別', value: 'type', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '文件名稱', value: 'file', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '維護單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '版次', value: 'version', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '備註', value: 'note', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '更新日期', value: 'updateTime', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '編輯、刪除', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
        serchDepartOpts: [  // 搜尋表單維護單位下拉選單
            { text: '不限', value: '' },
            ...departOptions,
        ],
        serchTypeOpts: [  // 搜尋表單文件類型下拉選單
            { text: '不限', value: '' },
            { text: '品質文件', value: 1 },
            { text: '維修管理文件', value: 2 },
            { text: '其他文件', value: 3 },
        ],
        dialog: false,  // dialog 是否顯示
        isLoading: false,  // 是否讀取中
        itemIndex: -1,  // 作用中的物件索引值 (小於0為新增的情況)
        ipt: {},  // dialog 欄位
        defaultIpt: {  // dialog 欄位預設值
            depart: 'd1',  // 維護單位
            type: 1,  // 文件類型
            version: '',  // 版次
            file: null,  // 檔案
            note: '',  // 備註
        },
        departOpts: departOptions,  // dialog 維護單位下拉選單
        typeOpts: [  // dialog 文件類型下拉選單
            { text: '品質文件', value: 1 },
            { text: '維修管理文件', value: 2 },
            { text: '其他文件', value: 3 },
        ],
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
            this.pageOpt.page = 1  // 頁碼初始化

            // 新增測試用資料
            setTimeout(() => {
                this.tableItems = [
                    {
                        id: '111',
                        depart: 'd2',
                        type: 3,
                        file: { fileName: '123.pdf', link: '/demofile/123.pdf' },
                        updateTime: '2020-05-01 09:30:00',
                        version: '1',
                        note: '',
                    },
                    {
                        id: '222',
                        depart: 'd4',
                        type: 2,
                        file: { fileName: 'ASRC200701.jpg', link: '/demofile/demo.jpg' },
                        updateTime: '2020-04-16 15:20:00',
                        version: '1',
                        note: '',
                    },
                    {
                        id: '333',
                        depart: 'd4',
                        type: 2,
                        file: { fileName: '123.docx', link: '/demofile/123.docx' },
                        updateTime: '2020-03-21 11:40:00',
                        version: '1',
                        note: '',
                    },
                ]
                this.chLoadingShow()
            }, 1000)
        },
        // 重置
        reset() {
            this.searchIpt.depart = this.searchIpt.type = this.searchIpt.fileName = ''
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

                // 編輯時，待後端回傳檔案資訊，再一併寫回 this.tableItems[this.itemIndex] 中
                if (this.itemIndex > -1) {
                    
                }

                this.chMsgbar({ success: true, msg: txt })
                this.isLoading = this.dialog = false
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
        // 轉換單位名稱
        transferDepartTxt(value) {
            return departOptions.find(item => item.value == value).text
        },
        // 轉換文件類型名稱
        transferTypeTxt(value) {
            return this.typeOpts.find(item => item.value == value).text
        },
    },
    created() {
        this.ipt = { ...this.defaultIpt }
    },
}
</script>