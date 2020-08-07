<template>
<v-tabs color="brown" centered class="mb-6">
    <v-tab>維護科</v-tab>
    <v-tab>養護科</v-tab>

    <!----------- 維護科 ----------->
    <v-tab-item>
        <v-row class="justify-center">
            <v-col md="10">
                <v-card elevation="3" class="my-3">
                    <v-data-table
                        :search="tab1.search"
                        :headers="tab1.headers"
                        :items="tab1.tableItems"
                        :loading="tab1.isLoading"
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
                            <span class="red--text subtitle-1">沒有符合「{{ tab1.search }}」的資料</span>
                        </template>

                        <!-- 表格最上面插入 toolbar 及 dialog -->
                        <template v-slot:top>
                            <v-toolbar flat color="indigo lighten-3">
                                <v-toolbar-title>
                                    <v-text-field
                                        v-model="tab1.search"
                                        append-icon="mdi-magnify"
                                        solo
                                        hide-details
                                        dense
                                        placeholder="請輸入關鍵字"
                                        color="red"
                                    ></v-text-field>
                                </v-toolbar-title>

                                <v-spacer></v-spacer>

                                <v-dialog v-model="tab1.dialogShow" max-width="600px">
                                    <template v-slot:activator="{ on }">
                                        <v-btn fab dark small color="indigo" v-on="on"
                                            v-if="userUnit == '維護科'"
                                        >
                                            <v-icon dark>mdi-plus</v-icon>
                                        </v-btn>
                                    </template>

                                    <v-card>
                                        <v-card-title class="blue white--text px-4 py-1">
                                            {{ dialogTitle1 }}
                                            <v-spacer></v-spacer>
                                            <v-btn dark fab small text @click="close" class="mr-n2">
                                                <v-icon>mdi-close</v-icon>
                                            </v-btn>
                                        </v-card-title>

                                        <v-card-text class="px-6 py-4">
                                            <v-row>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                        label="工作區"
                                                        v-model.trim="tab1.editedItem.area"
                                                    ></v-text-field>
                                                </v-col>

                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                        label="班別"
                                                        v-model.trim="tab1.editedItem.shift"
                                                    ></v-text-field>
                                                </v-col>

                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                        label="姓名"
                                                        v-model.trim="tab1.editedItem.name"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                        
                                        <v-card-actions class="px-5 pb-5">
                                            <v-spacer></v-spacer>
                                            <v-btn class="mr-2" elevation="4" :loading="tab1.isLoading" @click="close('tab1')">取消</v-btn>
                                            <v-btn color="success" elevation="4" :loading="tab1.isLoading" @click="save('tab1')">送出</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-toolbar>
                        </template>

                        <!-- 插入 action 欄位-編輯、刪除 -->
                        <template v-slot:item.action="{ item }">
                            <template v-if="userUnit == '維護科'">
                                <v-btn small dark fab color="info darken-1"
                                    class="mr-3"
                                    @click="edit(item, 'tab1')"
                                >
                                    <v-icon dark>mdi-pen</v-icon>
                                </v-btn>

                                <v-btn small dark fab color="red darken-1"
                                    @click="del(item, 'tab1')"
                                >
                                    <v-icon dark>mdi-delete</v-icon>
                                </v-btn>
                            </template>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-tab-item>

    <!----------- 養護科 ----------->
    <v-tab-item>
        <v-row class="justify-center">
            <v-col md="10">
                <v-card elevation="3" class="my-3">
                    <v-data-table
                        :search="tab2.search"
                        :headers="tab2.headers"
                        :items="tab2.tableItems"
                        :loading="tab2.isLoading"
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
                            <span class="red--text subtitle-1">沒有符合「{{ tab2.search }}」的資料</span>
                        </template>

                        <!-- 表格最上面插入 toolbar 及 dialog -->
                        <template v-slot:top>
                            <v-toolbar flat color="purple lighten-3">
                                <v-toolbar-title>
                                    <v-text-field
                                        v-model="tab2.search"
                                        append-icon="mdi-magnify"
                                        solo
                                        hide-details
                                        dense
                                        placeholder="請輸入關鍵字"
                                        color="red"
                                    ></v-text-field>
                                </v-toolbar-title>

                                <v-spacer></v-spacer>

                                <v-dialog v-model="tab2.dialogShow" max-width="600px">
                                    <template v-slot:activator="{ on }">
                                        <v-btn fab dark small color="purple darken-2" v-on="on"
                                            v-if="userUnit == '養護科'"
                                        >
                                            <v-icon dark>mdi-plus</v-icon>
                                        </v-btn>
                                    </template>

                                    <v-card>
                                        <v-card-title class="blue white--text px-4 py-1">
                                            {{ dialogTitle1 }}
                                            <v-spacer></v-spacer>
                                            <v-btn dark fab small text @click="close" class="mr-n2">
                                                <v-icon>mdi-close</v-icon>
                                            </v-btn>
                                        </v-card-title>

                                        <v-card-text class="px-6 py-4">
                                            <v-row>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                        label="廠、庫"
                                                        v-model.trim="tab2.editedItem.plant"
                                                    ></v-text-field>
                                                </v-col>

                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                        label="班別"
                                                        v-model.trim="tab2.editedItem.shift"
                                                    ></v-text-field>
                                                </v-col>

                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                        label="姓名"
                                                        v-model.trim="tab2.editedItem.name"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                        
                                        <v-card-actions class="px-5 pb-5">
                                            <v-spacer></v-spacer>
                                            <v-btn class="mr-2" elevation="4" :loading="tab2.isLoading" @click="close('tab2')">取消</v-btn>
                                            <v-btn color="success" elevation="4" :loading="tab2.isLoading" @click="save('tab2')">送出</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-toolbar>
                        </template>

                        <!-- 插入 action 欄位-編輯、刪除 -->
                        <template v-slot:item.action="{ item }">
                            <template v-if="userUnit == '養護科'">
                                <v-btn small dark fab color="info darken-1"
                                    class="mr-3"
                                    @click="edit(item, 'tab2')"
                                >
                                    <v-icon dark>mdi-pen</v-icon>
                                </v-btn>

                                <v-btn small dark fab color="red darken-1"
                                    @click="del(item, 'tab2')"
                                >
                                    <v-icon dark>mdi-delete</v-icon>
                                </v-btn>
                            </template>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-tab-item>
</v-tabs>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data: () => ({
        userUnit: '維護科',  // 使用者的單位(demo用)
        tab1: {  // 維護科
            isLoading: false,  // 是否讀取中
            search: '',  // 搜尋的關鍵字
            headers: [  // 表格標題
                { text: '單位', value: 'unit', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
                { text: '工作區', value: 'area', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
                { text: '班別', value: 'shift', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
                { text: '姓名', value: 'name', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
                { text: '編輯、刪除', value: 'action', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
            ],
            tableItems: [],  // 表格資料
            dialogShow: false,  // 是否顯示
            editedIndex: -1,
            editedItem: {},
            defaultItem: {
                area: '',  // 工作區
                shift: '',  // 班別
                name: '',
            },
            apiName: '',  // 後端 api 函式的名稱
        },
        tab2: {  // 養護科
            isLoading: false,  // 是否讀取中
            search: '',  // 搜尋的關鍵字
            headers: [  // 表格標題
                { text: '單位', value: 'unit', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
                { text: '廠、庫', value: 'plant', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
                { text: '班別', value: 'shift', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
                { text: '姓名', value: 'name', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
                { text: '編輯、刪除', value: 'action', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
            ],
            tableItems: [],  // 表格資料
            dialogShow: false,  // 是否顯示
            editedIndex: -1,
            editedItem: {},
            defaultItem: {
                plant: '',  // 廠、庫
                shift: '',  // 班別
                name: '',
            },
            apiName: '',  // 後端 api 函式的名稱
        },
    }),
    watch: {
        // tab1 dialog 遮罩照關閉時，表單回覆預設值
        'tab1.dialogShow': function (val) {
            val || this.close('tab1')
        },
        // tab2 dialog 遮罩照關閉時，表單回覆預設值
        'tab2.dialogShow': function (val) {
            val || this.close('tab2')
        },
    },
    computed: {
        dialogTitle1 () {
            return this.tab1.editedIndex === -1 ? '新增人員' : '編輯資料'
        },
        dialogTitle2 () {
            return this.tab2.editedIndex === -1 ? '新增人員' : '編輯資料'
        },
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // messageBar
        ]),
        // 向後端取資料
        fetchData() {
            // this.tab1.isLoading = true
            this.tab1.isLoading = this.tab2.isLoading = true

            // 範例效果
            setTimeout(() => {
                this.tab1.tableItems = [
                    {
                        unit: '維護科',
                        area: '奮起湖監工區',
                        shift: '第1班',
                        name: '陳大維',
                    },
                    {
                        unit: '維護科',
                        area: '竹崎監工區',
                        shift: '第3班',
                        name: '張國強',
                    },
                    {
                        unit: '維護科',
                        area: '阿里山監工區',
                        shift: '第9班',
                        name: '莊晨偉',
                    },
                ]

                this.tab2.tableItems = [
                    {
                        unit: '養護科',
                        plant: '修理工廠',
                        shift: '第5班',
                        name: '池昇達',
                    },
                    {
                        unit: '養護科',
                        plant: '嘉義車庫',
                        shift: '第7班',
                        name: '候福豐',
                    },
                    {
                        unit: '養護科',
                        plant: '阿里山車庫',
                        shift: '第3班',
                        name: '許育任',
                    },
                ]

                // this.tab1.isLoading = false
                this.tab1.isLoading = this.tab2.isLoading = false
            }, 1000)
        },
        // 編輯(顯示 dialog)，第2參數值為 tab1、tab2 (對應 vue 的 data)
        edit(item, tab) {
            this[tab].editedIndex = this[tab].tableItems.indexOf(item)
            this[tab].editedItem = Object.assign({}, item)
            this[tab].dialogShow = true
        },
        // 關閉 dialog，第2參數值為 tab1、tab2 (對應 vue 的 data)
        close(tab) {
            this[tab].dialogShow = false
            setTimeout(() => {
                this[tab].editedItem = Object.assign({}, this[tab].defaultItem)
                this[tab].editedIndex = -1
            }, 300)
        },
        // 儲存，第2參數值為 tab1、tab2 (對應 vue 的 data)
        save(tab) {
            this[tab].isLoading = true

            if (this[tab].editedIndex > -1) {
                // 更新資料

                // 範例效果
                setTimeout(() => {
                    Object.assign(this[tab].tableItems[this[tab].editedIndex], this[tab].editedItem)
                    this.chMsgbar({ success: true, msg: '編輯成功' })
                    this[tab].isLoading = this[tab].dialogShow = false
                }, 1000)
            } else {
                // 新增資料

                // 範例效果
                let memberUnit = (tab == 'tab1')? '維護科' : '養護科'
                setTimeout(() => {
                    // 隨機 id (demo用)
                    let randomID= Math.floor(Math.random() * (10000 - 1 + 1)) + 1
                    let newData = { id: randomID, unit: memberUnit }
            
                    this[tab].tableItems.push(Object.assign(newData, this[tab].editedItem))
                    this.chMsgbar({ success: true, msg: '編輯成功' })
                    this[tab].isLoading = this[tab].dialogShow = false
                }, 1000)
            }
        },
        // 刪除，第2參數值為 tab1、tab2 (對應 vue 的 data)
        del(item, tab) {
            const idx = this[tab].tableItems.indexOf(item)  // 取得該筆資料索引值
            if (confirm('你確定要刪除嗎?')) {
                this[tab].isLoading = true

                // 範例效果
                setTimeout(() => {
                    this[tab].tableItems.splice(idx, 1)
                    this.chMsgbar({ success: true, msg: '刪除成功' })
                    this[tab].isLoading = false
                }, 1000)
            }
        },
    },
    created() {
        this.fetchData()
    }
}
</script>