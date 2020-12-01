<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">證照管理查詢</h2>

    <v-row class="px-2 mb-8">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-tag</v-icon>證照名稱
            </h3>
            <v-text-field
                v-model.trim="licenseName"
                solo
                placeholder="請輸入證照名稱"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="8" md="9" align-self="center">
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

                    <template v-slot:item.note="{ item }">
                        <v-btn color="teal" dark
                            @click="showContent(item.note)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.link="{ item }">
                        <v-btn small dark fab color="purple"
                            target="_blank"
                            :to="`/smis/jobsafety/license/${item.id}/list`"
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
                <v-row>
                    <v-col cols="12" sm="4">
                        <h3 class="mb-1">
                            <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>證照名稱
                        </h3>
                        <v-text-field
                            v-model.trim="ipt.name"
                            solo
                            placeholder="請輸入證照名稱"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4">
                        <h3 class="mb-1">
                            <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>初訓時間(小時)
                        </h3>
                        <v-text-field
                            v-model.trim="ipt.firstTrain"
                            solo
                            placeholder="請輸入初訓時間"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4">
                        <h3 class="mb-1">
                            <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>回訓時間(小時)
                        </h3>
                        <v-text-field
                            v-model.trim="ipt.backTrain"
                            solo
                            placeholder="請輸入回訓時間"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4">
                        <h3 class="mb-1">
                            <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>有效時間(年)
                        </h3>
                        <v-text-field
                            v-model.trim="ipt.effective"
                            solo
                            placeholder="請輸入有效時間"
                        ></v-text-field>
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
        pageOpt: { page: 1 },  // 目前頁數
        tableItems: [],  // 表格資料
        headers: [  // 表格欄位
            { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '證照名稱', value: 'name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '初訓時間(小時)', value: 'firstTrain', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '回訓時間(小時)', value: 'backTrain', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '有效時間(年)', value: 'effective', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '備註', value: 'note', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70' },
            { text: '人員資料', value: 'link', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '編輯、刪除', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '130' },
        ],
        dialog: false,  // dialog 是否顯示
        isLoading: false,  // 是否讀取中
        itemIndex: -1,  // 作用中的物件索引值 (小於0為新增的情況)
        ipt: {},  // dialog 欄位
        defaultIpt: {  // dialog 欄位預設值
            name: '',  // 證照名稱
            firstTrain: '',  // 初訓時間(小時)
            backTrain: '',  // 回訓時間(小時)
            effective: '',  // 有效時間(年)
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
        // 查詢
        search() {
            this.chLoadingShow()
            this.pageOpt.page = 1  // 頁碼初始化

            // 測試用資料
            setTimeout(() => {
                this.tableItems = [
                    {
                        id: 1111,  // 編號
                        name: '堆高機乙級證照',  // 證照名稱
                        firstTrain: 36,  // 初訓時間(小時)
                        backTrain: 24,  // 回訓時間(小時)
                        effective: 10,  // 有效時間(年)
                        note: '文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容',  // 備註
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
            if (confirm('會連同所有人員資料一併刪除，你確定要刪除嗎?')) {
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
        this.ipt = { ...this.defaultIpt }  // 初始化表單
    }
}
</script>