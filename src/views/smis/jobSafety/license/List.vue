<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">人員資料 ({{ licenseName }})</h2>

    <v-row class="px-2 mb-8">
        <v-col cols="12">
            <v-btn dark large class="my-2 mr-2"
                to="/smis/jobsafety/license"
            >回搜尋頁</v-btn>

            <v-btn color="indigo" dark large class="ma-2"
                @click="add"
            >
                <v-icon>mdi-plus</v-icon>新增
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

                    <template v-slot:item.needTrain="{ item }">
                        {{ (item.needTrain == 'y')? '是' : '否' }}
                    </template>

                    <template v-slot:item.depart="{ item }">
                        {{ transferDepartTxt(item.depart) }}
                    </template>

                    <template v-slot:item.job="{ item }">
                        {{ transferJobTxt(item.job) }}
                    </template>

                    <template v-slot:item.note="{ item }">
                        <v-btn color="teal" dark
                            @click="showContent(item.note)"
                        >檢視</v-btn>
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
                <v-row>
                    <v-col cols="12" sm="4">
                        <h3 class="mb-1">
                            <v-icon class="mr-1 mb-1">mdi-bank</v-icon>部門
                        </h3>
                        <v-select
                            v-model="ipt.depart"
                            :items="opts.depart"
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
                            <v-icon class="mr-1 mb-1">mdi-bank</v-icon>職務
                        </h3>
                        <v-select
                            v-model="ipt.job"
                            :items="opts.job"
                            solo
                        ></v-select>
                    </v-col>

                    <v-col cols="12" sm="4">
                        <h3 class="mb-1">
                            <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>證照編號
                        </h3>
                        <v-text-field
                            v-model.trim="ipt.licenseNumber"
                            solo
                            placeholder="請輸入證照編號"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4" md="3">
                        <h3 class="mb-1">
                            <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>證照生效日
                        </h3>
                        <v-menu
                            v-model="dateMemuShow.activeDate"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model.trim="ipt.activeDate"
                                    solo
                                    v-on="on"
                                    readonly
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                color="purple"
                                v-model="ipt.activeDate"
                                @input="dateMemuShow.activeDate = false"
                                locale="zh-tw"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>

                    <v-col cols="12" sm="4" md="3">
                        <h3 class="mb-1">
                            <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>最後回訓日
                        </h3>
                        <v-menu
                            v-model="dateMemuShow.lastTrain"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model.trim="ipt.lastTrain"
                                    solo
                                    v-on="on"
                                    readonly
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                color="purple"
                                v-model="ipt.lastTrain"
                                @input="dateMemuShow.lastTrain = false"
                                locale="zh-tw"
                            ></v-date-picker>
                        </v-menu>
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
        licenseName: '',  // 證照名稱
        opts: {  // 下拉選單
            depart: [  // 部門
                { text: '處本部', value: 'd1' },
                { text: '竹崎監工區', value: 'd2' },
                { text: '奮起湖監工區', value: 'd3' },
                { text: '阿里山監工區', value: 'd4' },
                { text: '嘉義車庫', value: 'd5' },
                { text: '阿里山車庫', value: 'd6' },
                { text: '修理工廠', value: 'd7' },
                { text: '北門車站', value: 'd8' },
                { text: '竹崎車站', value: 'd9' },
                { text: '交力坪車站', value: 'd10' },
                { text: '奮起湖車站', value: 'd11' },
                { text: '阿里山車站', value: 'd12' },
                { text: '其他', value: 'other' },
            ],
            job: [  // 職務
                { text: '技正', value: 'j1' },
                { text: '廠長', value: 'j2' },
                { text: '工程士', value: 'j3' },
                { text: '助理工程員(班長)', value: 'j4' },
                { text: '司機員', value: 'j5' },
                { text: '行車人員', value: 'j6' },
                { text: '其他', value: 'other' },
            ],
        },
        dateMemuShow: {  // 日曆是否顯示
            activeDate: false,  // 證照生效日
            lastTrain: false,  // 最後回訓日
        },
        pageOpt: { page: 1 },  // 目前頁數
        tableItems: [],  // 表格資料
        headers: [  // 表格欄位
            { text: '是否須回訓', value: 'needTrain', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '120' },
            { text: '部門', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '120' },
            { text: '姓名', value: 'name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '100' },
            { text: '職務', value: 'job', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
            { text: '證照編號', value: 'licenseNumber', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '140' },
            { text: '證照生效日', value: 'activeDate', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '120' },
            { text: '最後回訓日', value: 'lastTrain', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '120' },
            { text: '證照有效日', value: 'effective', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '120' },
            { text: '備註', value: 'note', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70' },
            { text: '編輯、刪除', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '130' },
        ],
        dialog: false,  // dialog 是否顯示
        isLoading: false,  // 是否讀取中
        itemIndex: -1,  // 作用中的物件索引值 (小於0為新增的情況)
        ipt: {},  // dialog 欄位
        defaultIpt: {  // dialog 欄位預設值
            depart: 'd1',  // 部門
            name: '',  // 姓名
            job: 'j1',  // 職務
            licenseNumber: '',  // 證照編號
            activeDate: new Date().toISOString().substr(0, 10),  // 證照生效日
            lastTrain: new Date().toISOString().substr(0, 10),  // 最後回訓日
            note: '',  // 備註
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
        // 初始化資料
        initData() {
            this.chLoadingShow()
            this.routeId = this.$route.params.id  // 路由參數(id)
            this.ipt = { ...this.defaultIpt }  // 初始化表單

            setTimeout(() => {
                this.licenseName = '堆高機乙級證照'  // 證照名稱
                this.tableItems = [
                    {
                        id: '55',
                        needTrain: 'y',  // 是否須回訓
                        depart: 'd2',  // 部門
                        name: '陳小美',  // 姓名
                        job: 'j4',  // 職務
                        licenseNumber: '524-96584-58',  // 證照編號
                        activeDate: '2010-01-05',  // 證照生效日
                        lastTrain: '2015-07-22',  // 最後回訓日
                        effective: '2019-12-14',  // 證照有效日
                        note: '備註文字備註文字備註文字備註文字',  // 備註
                    },
                    {
                        id: '34',
                        needTrain: 'n',  // 是否須回訓
                        depart: 'd4',  // 部門
                        name: '王小明',  // 姓名
                        job: 'j5',  // 職務
                        licenseNumber: '658-89631-36',  // 證照編號
                        activeDate: '2003-05-01',  // 證照生效日
                        lastTrain: '2018-10-16',  // 最後回訓日
                        effective: '2023-02-08',  // 證照有效日
                        note: '備註文字備註文字備註文字備註文字',  // 備註
                    },
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
            this.ipt = { ...this.defaultIpt }  // 初始化表單，避免點編輯按鈕但未更新時資料殘留
            this.itemIndex = -1  // 初始化索引值
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
        // 轉換部門文字
        transferDepartTxt(val) {
            return this.opts.depart.find(item => item.value == val).text
        },
        // 轉換職務文字
        transferJobTxt(val) {
            return this.opts.job.find(item => item.value == val).text
        },
    },
    created() {
        this.initData()
    }
}
</script>