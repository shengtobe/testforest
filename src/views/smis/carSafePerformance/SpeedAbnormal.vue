<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">車速異常表查詢</h2>

    <v-row class="px-2">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>日期(起)
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
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>日期(迄)
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
                <v-icon class="mr-1 mb-1">mdi-train</v-icon>機車或客車
            </h3>
            <v-select
                v-model="searchIpt.type"
                :items="typeOpts"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-tag-multiple</v-icon>車號
            </h3>
            <v-text-field
                v-model.trim="searchIpt.carNumber"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12">
            <v-btn color="green" dark large class="ma-2"
                @click="search"
            >
                <v-icon class="mr-1">mdi-magnify</v-icon>查詢
            </v-btn>

            <v-btn color="indigo" dark large class="ma-2"
                to="/smis/car-safe-performance/machine-abnormal/add"
            >
                <v-icon>mdi-plus</v-icon>新增
            </v-btn>

            <v-btn elevation="2" large class="ma-2"
                @click="reset"
            >
                <v-icon>mdi-reload</v-icon>重置
            </v-btn>

            <v-btn dark large class="ma-2"
                :to="`/smis/car-safe-performance`"
            >回上層</v-btn>
        </v-col>

        <!-- 表格資料 -->
        <v-col cols="12" class="mt-5 mt-md-0">
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

                    <template v-slot:item.desc="{ item }">
                        <v-btn color="teal" dark
                            @click="showContent(item.desc)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.handSituation="{ item }">
                        <v-btn color="teal" dark
                            @click="showContent(item.handSituation)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.files="{ item }">
                        <v-btn fab small dark color="purple lighten-2"
                            @click="showFiles(item.files)"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn fab small color="primary"
                            class="mr-3"
                            :to="`/smis/car-safe-performance/machine-abnormal/${item.id}/edit`"
                        >
                            <v-icon>mdi-pen</v-icon>
                        </v-btn>

                        <v-btn fab small color="error"
                            @click="delControl(item.id)"
                        >
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
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
        </v-col>
    </v-row>

    <!-- 檔案列表 -->
    <v-dialog v-model="dialogShow" max-width="400px">
        <v-card>
            <v-toolbar flat dense dark color="purple lighten-2">
                <v-toolbar-title>檔案列表</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn fab small text @click="dialogShow = false" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-list-item-group>
                <template v-for="(item, idx) in fileList">
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
                        v-if="idx + 1 < fileList.length"
                        :key="idx"
                    ></v-divider>
                </template>
            </v-list-item-group>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import Pagination from '@/components/Pagination.vue'

export default {
    data: () => ({
        searchIpt: {},
        searchDefault: {
            dateStart: '',  // 日期(起)
            dateEnd: '',  // 日期(迄)
            type: '',  // 機車或客車
            carNumber: '',  // 車號
        },
        dateMemuShow: {
            start: false,
            end: false,
        },
        typeOpts: [  // 機車或客車下拉選單
            { text: '不限', value: '' },
            { text: '機車', value: '機車' },
            { text: '客車', value: '客車' },
        ],
        pageOpt: { page: 1 },  // 目前頁數
        tableItems: [],  // 表格資料
        headers: [  // 表格欄位
            { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '日期', value: 'date', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '車次', value: 'number', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '機/客車', value: 'type', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '車號', value: 'carNumber', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '異常說明', value: 'desc', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '處理情形', value: 'handSituation', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '附件', value: 'files', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '編輯、刪除', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
        fileList: [],  // 檔案列表
        dialogShow: false,  // 檔案dialog是否顯示
    }),
    components: { Pagination },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'chViewDialog',  // 檢視內容 dialog
        ]),
        // 重置
        reset() {
            this.searchIpt = { ...this.searchDefault }
        },
        // 查詢
        search() {
            this.chLoadingShow()
            this.pageOpt.page = 1  // 頁碼初始化

            // 新增測試用資料
            setTimeout(() => {
                this.tableItems = [
                    {
                        id: 1135,
                        date: '2020-06-09',
                        number: '1-2',
                        type: '客車',
                        carNumber: 1234,
                        desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',
                        handSituation: '處理情形處理情形處理情形處理情形處理情形處理情形處理情形處理情形處理情形處理情形處理情形處理情形處理情形',
                        files: [
                            {
                                name: '456.xlsx',
                                link: '/demofile/456.xlsx'
                            },
                            {
                                name: '123.pdf',
                                link: '/demofile/123.pdf'
                            },
                        ],
                    }
                ]
                this.chLoadingShow()
            }, 1000)
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 顯示檢視內容
        showContent(txt) {
            this.chViewDialog({ show: true, content: txt.replace(/\n/g, '<br>') })
        },
        // 刪除控制措施
        delControl(id) {
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
        // 顯示檔案
        showFiles(arr) {
            if (arr.length > 0) this.fileList = [ ...arr ]
            this.dialogShow = true
        },
    },
    created() {
        this.searchIpt = { ...this.searchDefault }
    }
}
</script>