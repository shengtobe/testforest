<template>
<v-card elevation="3" class="mx-sm-5 mb-6 mt-3">
    <v-data-table
        :search="search"
        :headers="headers"
        :items="sortData"
        :loading="isLoading"
        disable-sort
        hide-default-footer
    >
        <template v-slot:no-data>
            <span class="red--text subtitle-1">沒有資料</span>
        </template>

        <template v-slot:loading>
            <span class="red--text subtitle-1">資料讀取中...</span>
        </template>

        <template v-slot:no-results>
            <span class="red--text subtitle-1">沒有符合「{{ search }}」的資料</span>
        </template>

        <!-- 表格最上面插入 toolbar 及 dialog -->
        <template v-slot:top>
            <v-toolbar flat color="green">
                <v-toolbar-title>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        solo
                        hide-details
                        dense
                        placeholder="請輸入關鍵字"
                        color="red"
                    ></v-text-field>
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-dialog v-model="dialogShow" max-width="600px">
                    <template v-slot:activator="{ on }">
                        <v-btn fab small color="light-green lighten-5" v-on="on">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title class="blue white--text px-4 py-1">
                            {{ dialogTitle }}
                            <v-spacer></v-spacer>
                            <v-btn dark fab small text @click="close" class="mr-n2">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-card-title>

                        <v-card-text class="px-6 py-4">
                            <v-row>
                                <!-- <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        label="負責單位"
                                        v-model.trim="editedItem.unit"
                                    ></v-text-field>
                                </v-col> -->

                                <v-col cols="12" sm="4">
                                    <v-text-field
                                        label="廠商名稱"
                                        v-model.trim="editedItem.name"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="4">
                                    <v-text-field
                                        label="負責人"
                                        v-model.trim="editedItem.proprietor"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="4">
                                    <v-text-field
                                        label="電話"
                                        v-model.trim="editedItem.phone"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-text-field
                                        label="備註"
                                        v-model.trim="editedItem.note"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        
                        <v-card-actions class="px-5 pb-5">
                            <v-spacer></v-spacer>
                            <v-btn class="mr-2" elevation="4" :loading="isLoading" @click="close">取消</v-btn>
                            <v-btn color="success" elevation="4" :loading="isLoading" @click="save">送出</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>

        <!-- 插入 action 欄位-編輯、刪除 -->
        <template v-slot:item.action="{ item }">
            <template v-if="item.unit == '服務科'">
                <v-btn small dark fab color="info darken-1"
                    class="mr-3"
                    @click="edit(item)"
                >
                    <v-icon dark>mdi-pen</v-icon>
                </v-btn>

                <v-btn small dark fab color="red darken-1"
                    @click="del(item)"
                >
                    <v-icon dark>mdi-delete</v-icon>
                </v-btn>
            </template>
        </template>

        <!-- 插入 owner 欄位-擁有者 -->
        <template v-slot:item.owner="{ item }">
            <v-btn small dark fab color="purple"
                :to="`/license/${ item.id }/ownerList`"
            >
                <v-icon dark>mdi-account-multiple</v-icon>
            </v-btn>
        </template>
    </v-data-table>
</v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data: () => ({
        isLoading: false,  // 是否讀取中
        search: '',  // 搜尋的關鍵字
        headers: [  // 表格標題
            { text: '負責單位', value: 'unit', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
            { text: '廠商名稱', value: 'name', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
            { text: '負責人', value: 'proprietor', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
            { text: '電話', value: 'phone', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
            { text: '備註', value: 'note', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
            { text: '編輯、刪除', value: 'action', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
        ],
        tableItems: [],  // 表格資料
        dialogShow: false,  // 是否顯示
        editedIndex: -1,
        editedItem: {},
        defaultItem: {
            //unit: '',  // 負責單位
            name: '',
            proprietor: '',  // 負責人
            phone: '',  // 電話
            note: '',  // 備註
        },
    }),
    watch: {
        // dialog 點遮罩關閉時，表單回覆預設值
        dialogShow (val) {
            val || this.close()
        },
        // 若有用關鍵字過濾，指定頁碼回到第1頁
        search: function(val, oldval) {
            if (val != oldval) this.chPage(1)
        },
    },
    computed: {
        dialogTitle () {
            return this.editedIndex === -1 ? '新增人員' : '編輯資料'
        },
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // messageBar
        ]),
        // 向後端取資料
        fetchData() {
            this.isLoading = true
            let id = this.$route.params.id  // 路由參數

            // 範例效果
            setTimeout(() => {
                // 向後端請求資料
                this.tableItems = [
                    {
                        unit: '服務科',
                        name: 'xx 鋼鐵',
                        proprietor: '陳小華',
                        phone: '07-123456',
                        note: '',
                    },
                    {
                        unit: '維護科',
                        name: '○○ 電子',
                        proprietor: '王久山',
                        phone: '0912789456',
                        note: '',
                    },
                    {
                        unit: '養護科',
                        name: 'xxx 股份有限公司',
                        proprietor: '趙天宇',
                        phone: '07-741258',
                        note: '',
                    },
                ]

                this.isLoading = false
            }, 1000)
        },
        // 編輯(顯示 dialog)
        edit(item) {
            this.editedIndex = this.tableItems.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogShow = true
        },
        // 關閉 dialog
        close() {
            this.dialogShow = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                // this.$refs.form.resetValidation()  // 取消驗證的紅字樣式 (目前沒驗證先取消)
            }, 300)
        },
        // 儲存
        save() {
            this.isLoading = true

            if (this.editedIndex > -1) {
                // 更新資料

                // 範例效果
                setTimeout(() => {
                    Object.assign(this.tableItems[this.editedIndex], this.editedItem)
                    this.chMsgbar({ success: true, msg: '編輯成功' })
                    this.isLoading = this.dialogShow = false
                }, 1000)
            } else {
                // 新增資料

                // 範例效果
                setTimeout(() => {
                    // 隨機 id (demo用)
                    let randomID= Math.floor(Math.random() * (10000 - 1 + 1)) + 1
                    let newData = { 
                        id: randomID,
                        unit: '服務科'
                    }
            
                    this.tableItems.push(Object.assign(newData, this.editedItem))
                    this.chMsgbar({ success: true, msg: '新增成功' })
                    this.isLoading = this.dialogShow = false
                }, 1000)
            }
        },
        // 刪除
        del(item) {
            const idx = this.tableItems.indexOf(item)  // 取得該筆資料索引值
            if (confirm('你確定要刪除嗎?')) {
                this.isLoading = true

                // 範例效果
                setTimeout(() => {
                    this.tableItems.splice(idx, 1)
                    this.chMsgbar({ success: true, msg: '刪除成功' })
                    this.isLoading = false
                }, 1000)
            }
        },
    },
    created() {
        this.fetchData()
    }
}
</script>