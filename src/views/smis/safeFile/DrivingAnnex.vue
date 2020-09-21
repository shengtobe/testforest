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
import { mapActions } from 'vuex'
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
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 初始化資料
        initData() {
            this.chLoadingShow()

            setTimeout(() => {
                this.tableItems = [
                    {
                        id: '111',
                        name: '王小明',
                        date: '2020-05-01 09:30:00',
                        fileName: '123.pdf', 
                        link: '/demofile/123.pdf',
                        updateTime: '2020-05-01 09:03:00',
                        note: '',
                    },
                    {
                        id: '222',
                        name: '王小明',
                        date: '2020-05-01 09:30:00',
                        fileName: 'ASRC200701.jpg', 
                        link: '/demofile/demo.jpg',
                        updateTime: '2020-05-01 09:03:00',
                        note: '',
                    },
                    {
                        id: '333',
                        name: '王小明',
                        date: '2020-05-01 09:30:00',
                        fileName: 'ASRC200702.jpg', 
                        link: '/demofile/demo2.jpg',
                        updateTime: '2020-05-01 09:03:00',
                        note: '',
                    },
                    {
                        id: '444',
                        name: '王小明',
                        date: '2020-05-01 09:30:00',
                        fileName: '123.docx', 
                        link: '/demofile/123.docx',
                        updateTime: '2020-05-01 09:03:00',
                        note: '',
                    },
                    {
                        id: '555',
                        name: '王小明',
                        date: '2020-05-01 09:30:00',
                        fileName: '456.xlsx', 
                        link: '/demofile/456.xlsx',
                        updateTime: '2020-05-01 09:03:00',
                        note: '',
                    },
                ]

                this.chLoadingShow()
            }, 1000)
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 送出
        save() {
            this.isLoading = true

            setTimeout(() => {
                this.tableItems[this.editIdx].note = this.note
                this.chMsgbar({ success: true, msg: '更新成功' })
                this.isLoading = this.dialog = false
            }, 1000)
        },
        // 編輯
        edit (item) {
            this.editIdx = this.tableItems.indexOf(item)
            this.note = item.note  // 設定表單資料
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
    },
    created() {
        this.initData()
    },
}
</script>