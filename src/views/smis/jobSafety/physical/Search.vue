<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">健檢管理查詢</h2>

    <v-row class="px-2 mb-8">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>編號
            </h3>
            <v-text-field
                v-model.trim="searchIpt.number"
                solo
                placeholder="請輸入編號"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-bank</v-icon>部門
            </h3>
            <v-select
                v-model="searchIpt.depart"
                :items="opts.depart"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-account</v-icon>姓名
            </h3>
            <v-text-field
                v-model.trim="searchIpt.name"
                solo
                placeholder="請輸入姓名"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-clipboard-text</v-icon>職務
            </h3>
            <v-select
                v-model="searchIpt.job"
                :items="opts.job"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-clipboard-text</v-icon>是否在職
            </h3>
            <v-select
                v-model="searchIpt.isOnJob"
                :items="opts.onJob"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-lightbulb-on</v-icon>健檢提醒
            </h3>
            <v-select
                v-model="searchIpt.remind"
                :items="opts.remind"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>年度
            </h3>
            <v-text-field
                v-model.trim="searchIpt.year"
                solo
                placeholder="請輸入西元年，例：2020"
            ></v-text-field>
        </v-col>

        <v-col cols="12">
            <v-btn color="success" large class="my-2 mr-2"
                @click="search"
            >
                <v-icon>mdi-magnify</v-icon>查詢
            </v-btn>

            <v-btn color="indigo" dark large class="ma-2"
                @click="add"
            >
                <v-icon>mdi-plus</v-icon>新增
            </v-btn>

            <v-btn elevation="2" large class="ma-2"
                @click="reset"
            >
                <v-icon>mdi-reload</v-icon>清除搜尋內容
            </v-btn>
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

                    <template v-slot:item.depart="{ item }">
                        {{ transferDepartTxt(item.depart) }}
                    </template>

                    <template v-slot:item.isOnJob="{ item }">
                        {{ (item.isOnJob == 'y')? '在職' : '已離職' }}
                    </template>

                    <template v-slot:item.remind="{ item }">
                        {{ (item.remind == 'y')? '須健檢' : '不須健檢' }}
                    </template>

                    <template v-slot:item.education="{ item }">
                        <template v-if="item.education">
                            <v-icon color="green">mdi-check</v-icon>
                        </template>
                    </template>

                    <template v-slot:item.track="{ item }">
                        <template v-if="item.track">
                            <v-icon color="green">mdi-check</v-icon>
                        </template>
                    </template>

                    <template v-slot:item.note="{ item }">
                        <v-btn color="teal" dark
                            @click="showContent(item.note)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.link="{ item }">
                        <v-btn small dark fab color="purple"
                            target="_blank"
                            :to="`/smis/jobsafety/physical/${item.id}/list`"
                        >
                            <v-icon dark>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn fab small color="primary"
                            class="mr-3"
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
    <v-dialog v-model="dialog" max-width="700px">
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
                                <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>編號
                            </h3>
                            <v-text-field
                                v-model.trim="ipt.number"
                                solo
                                placeholder="請輸入編號"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-bank</v-icon>部門
                            </h3>
                            <v-select
                                v-model="ipt.depart"
                                :items="formOpts.depart"
                                solo
                            ></v-select>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-account</v-icon>姓名
                            </h3>
                            <v-text-field
                                v-model.trim="ipt.name"
                                solo
                                placeholder="請輸入姓名"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-clipboard-text</v-icon>職務
                            </h3>
                            <v-select
                                v-model="ipt.job"
                                :items="formOpts.job"
                                solo
                            ></v-select>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-clipboard-text</v-icon>是否在職
                            </h3>
                            <v-select
                                v-model="ipt.isOnJob"
                                :items="formOpts.onJob"
                                solo
                            ></v-select>
                        </v-col>

                        <v-col cols="12">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>備註
                            </h3>
                            <v-text-field
                                v-model.trim="ipt.note"
                                solo
                                placeholder="請輸入備註"
                                hide-details
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-row no-gutters>
                                <v-col cols="6" sm="3">
                                    <v-checkbox
                                        v-model="ipt.education"
                                        label="衛教"
                                        color="blue"
                                        hide-details
                                    ></v-checkbox>
                                </v-col>

                                <v-col cols="6" sm="3">
                                    <v-checkbox
                                        v-model="ipt.track"
                                        label="追蹤"
                                        color="blue"
                                        hide-details
                                    ></v-checkbox>
                                </v-col>
                            </v-row>
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
import { departOptions } from '@/assets/js/departOption'
import Pagination from '@/components/Pagination.vue'

export default {
    data: () => ({
        searchIpt: {},
        defaultSearchIpt: {
            number: '',  // 編號
            depart: '',  // 部門
            name: '',  // 姓名
            job: '',  // 職務
            isOnJob: '',  // 是否在職
            remind: '',  // 健檢提醒
            year: '',  // 年度
        },
        opts: {  // 下拉選單
            depart: [  // 部門
                { text: '不限', value: '' },
                ...departOptions,
                { text: '其他', value: 'other' },
            ],
            job: [  // 職務
                { text: '不限', value: '' },
                { text: '駕駛員', value: '駕駛員' },
                { text: '行車人員', value: '行車人員' },
                { text: '一般員工', value: '一般員工' },
            ],
            onJob: [  // 是否在職
                { text: '不限', value: '' },
                { text: '在職', value: 'y' },
                { text: '已離職', value: 'n' },
            ],
            remind: [  // 健檢提醒
                { text: '不限', value: '' },
                { text: '須健檢', value: 'y' },
                { text: '不須健檢', value: 'n' },
            ],
        },
        pageOpt: { page: 1 },  // 目前頁數
        tableItems: [],  // 表格資料
        headers: [  // 表格欄位
            { text: '編號', value: 'number', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '80' },
            { text: '部門', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
            { text: '姓名', value: 'name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '80' },
            { text: '職務', value: 'job', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '90' },
            { text: '是否在職', value: 'isOnJob', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '100' },
            { text: '健檢提醒', value: 'remind', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '100' },
            { text: '最新健檢日', value: 'date', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '120' },
            { text: '健檢評級', value: 'level', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '80' },
            { text: '衛教', value: 'education', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70' },
            { text: '追蹤', value: 'track', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70' },
            { text: '備註', value: 'note', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70' },
            { text: '健檢資料', value: 'link', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70' },
            { text: '編輯、刪除', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '130' },
        ],
        dialog: false,  // dialog 是否顯示
        isLoading: false,  // 是否讀取中
        itemIndex: -1,  // 作用中的物件索引值 (小於0為新增的情況)
        ipt: {},  // dialog 欄位
        defaultIpt: {  // dialog 欄位預設值
            number: '',  // 編號
            depart: 'd1',  // 部門
            name: '',  // 姓名
            job: '駕駛員',  // 職務
            isOnJob: 'y',  // 是否在職
            note: '',  // 備註
            education: false,  // 衛教
            track: false,  // 追蹤
        },
        formOpts: {  // 表單下拉選單
            depart: [  // 部門
                ...departOptions,
                { text: '其他', value: 'other' },
            ],
            job: [  // 職務
                { text: '駕駛員', value: '駕駛員' },
                { text: '行車人員', value: '行車人員' },
                { text: '一般員工', value: '一般員工' },
            ],
            onJob: [  // 是否在職
                { text: '在職', value: 'y' },
                { text: '已離職', value: 'n' },
            ],
        },
    }),
    components: { Pagination },
    computed: {
        dialogTitle () {
            return this.itemIndex === -1 ? '新增資料' : '編輯資料'
        },
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'chViewDialog',  // 檢視內容 dialog
        ]),
        // 查詢
        search() {
            this.chLoadingShow()
            this.pageOpt.page = 1  // 頁碼初始化

            // 測試用資料
            setTimeout(() => {
                this.tableItems = [
                    {
                        id: 1111,
                        number: 'A0015',
                        depart: 'd3',
                        name: '王小明',
                        job: '一般員工',
                        isOnJob: 'y',
                        remind: 'n',
                        date: '2020-05-27',
                        level: '1級',
                        education: true,
                        track: false,
                        note: '備註文字備註文字備註文字備註文字備註文字備註文字',
                    }
                ]
                this.chLoadingShow()
            }, 1000)
        },
        // 清除搜尋內容
        reset() {
            this.searchIpt = { ...this.defaultSearchIpt }
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 顯示檢視內容
        showContent(txt) {
            this.chViewDialog({ show: true, content: txt.replace(/\n/g, '<br>') })
        },
        // 送出
        save() {
            this.isLoading = true

            setTimeout(() => {
                let txt = this.itemIndex === -1 ? '新增成功' : '更新成功'

                // 編輯時，待後端回傳檔案資訊，再一併寫回 this.tableItems[this.itemIndex] 中
                // 新增時則不處理 (因為當前搜尋條件不一定符合新增的記錄)
                if (this.itemIndex > -1) {
                    Object.assign(this.tableItems[this.itemIndex], this.ipt)
                }
                
                this.chMsgbar({ success: true, msg: txt })
                this.isLoading = this.dialog = false
            }, 1000)
        },
        // 新增
        add() {
            // this.ipt = { ...this.defaultIpt }  // 初始化表單，避免點編輯按鈕但未更新時資料殘留
            // this.itemIndex = -1  // 初始化索引值
            // this.dialog = true
             this.$router.push({ path: `/smis/jobsafety/physical/0/add` })
        },
        // 編輯
        edit (item) {
            this.itemIndex = this.tableItems.indexOf(item)  // 取得索引值
            this.ipt = { ...item }  // 設定表單資料
            this.dialog = true
        },
        // 刪除
        del(id) {
            if (confirm('會連同所有健檢資料一併刪除，你確定要刪除嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    let idx = this.tableItems.findIndex(item => item.id == id)
                    this.tableItems.splice(idx, 1)
                    this.chMsgbar({ success: true, msg: '刪除成功'})
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 轉換部門文字
        transferDepartTxt(val) {
            return departOptions.find(item => item.value == val).text
        },
    },
    created() {
        this.reset()
        this.ipt = { ...this.defaultIpt }  // 初始化表單
    }
}
</script>