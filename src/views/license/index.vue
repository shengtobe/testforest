<template>
<v-row class="mx-sm-8 mb-6 mt-5 justify-center">
    <v-col cols="12" md="10">
        <v-card elevation="3">
            <v-data-table
                :headers="headers"
                :items="tableItems"
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

                <!-- 表格最上面插入 toolbar 及 dialog -->
                <template v-slot:top>
                    <v-toolbar flat dense dark color="teal">
                        <v-icon class="mr-3">mdi-file-multiple</v-icon>
                        <v-toolbar-title>證照管理</v-toolbar-title>

                        <v-spacer></v-spacer>

                        <v-dialog v-model="dialogShow" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn fab small color="teal lighten-5" v-on="on">
                                    <v-icon class="black--text">mdi-plus</v-icon>
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
                                    <v-form
                                        ref="form"
                                        v-model="valid"
                                        lazy-validation
                                    >
                                        <v-row>
                                            <v-col>
                                                <v-text-field
                                                    label="證照名稱"
                                                    v-model.trim="editedItem.name"
                                                    :rules="[v => (!!v && /[^\s]/.test(v)) || '請輸入證照名稱']" 
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-form>
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
    </v-col>
</v-row>

</template>

<script>
import { mapActions } from 'vuex'

export default {
    data: () => ({
        isLoading: false,  // 是否讀取中
        headers: [  // 表格標題
            { text: '證照名稱', value: 'name', width: '60%', class: 'subtitle-1 black--text font-weight-bold' },
            { text: '編輯、刪除', value: 'action', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
            { text: '擁有者', value: 'owner', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
        ],
        tableItems: [],  // 表格資料
        dialogShow: false,  // 是否顯示
        valid: true,  // 是否驗證
        editedIndex: -1,
        editedItem: {},
        defaultItem: {
            id: '',
            name: '',
        },
    }),
    computed: {
        dialogTitle () {
            return this.editedIndex === -1 ? '新增證照' : '編輯資料'
        },
    },
    watch: {
        // dialog 點罩照關閉時，表單回覆預設值
        dialogShow (val) {
            val || this.close()
        },
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // messageBar
        ]),
        // 向後端取資料
        fetchData() {
            this.isLoading = true

            // 範例效果
            setTimeout(() => {
                // 向後端請求資料
                this.tableItems = [
                    { id: 1, name: '固定式起重機'},
                    { id: 2, name: '急救人員'},
                    { id: 3, name: '堆高機'},
                    { id: 4, name: '一般手工電焊'},
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
                this.$refs.form.resetValidation()  // 取消驗證的紅字樣式
            }, 300)
        },
        // 儲存
        save() {
            if (this.$refs.form.validate()) {  // 表單驗證欄位
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
                        let newData = { id: randomID }
                
                        this.tableItems.push(Object.assign(newData, this.editedItem))
                        this.chMsgbar({ success: true, msg: '編輯成功' })
                        this.isLoading = this.dialogShow = false
                    }, 1000)
                }
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