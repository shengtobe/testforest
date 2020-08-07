<template>
<div class="mx-sm-5 mt-3 mb-8">
    <v-sheet class="px-3 pb-2 mb-6 light-blue lighten-5">
        <v-row>
            <v-col cols="12" sm="4" md="2">
                <h3 class="mb-1 ml-1">進廠日期</h3>
                <v-menu
                    v-model="dateMemuShow.enter"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            hide-details
                            v-model="searchForm.enterDate"
                            v-on="on"
                            solo
                            dense
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        color="purple"
                        v-model="searchForm.enterDate"
                        @input="dateMemuShow.enter = false"
                        locale="zh-tw"
                    ></v-date-picker>
                </v-menu>
            </v-col>

            <v-col cols="12" sm="4" md="2">
                <h3 class="mb-1 ml-1">出廠日期</h3>
                <v-menu
                    v-model="dateMemuShow.out"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            hide-details
                            v-model="searchForm.outDate"
                            v-on="on"
                            solo
                            dense
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        color="purple"
                        v-model="searchForm.outDate"
                        @input="dateMemuShow.out = false"
                        locale="zh-tw"
                    ></v-date-picker>
                </v-menu>
            </v-col>


            <v-col cols="12" sm="4" md="2">
                <h3 class="mb-1 ml-1">檢修人</h3>
                <v-select
                    hide-details
                    solo
                    dense
                    v-model="searchForm.fixMember"
                    :items="selectMembers"
                ></v-select>
            </v-col>

            <v-col cols="12" sm="4" md="4">
                <v-btn dark color="green" class="mt-md-8 mr-3"
                    @click="search"
                >查詢</v-btn>

                <v-btn dark color="blue" class="mt-md-8"
                    @click="dialogShow = true"
                >新增</v-btn>
            </v-col>
        </v-row>
    </v-sheet>

    <!-- dialog -->
    <v-dialog v-model="dialogShow" max-width="600px">
        <v-card>
            <v-card-title class="blue white--text px-4 py-1">
                {{ dialogTitle }}
                <v-spacer></v-spacer>
                <v-btn dark fab small text @click="close" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <div class="px-6 py-4">
                <v-row>
                    <v-col cols="12" sm="4">
                        <v-menu
                            v-model="dialogDateMenuShow.enter"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    hide-details
                                    v-model="editedItem.enterDate"
                                    v-on="on"
                                    label="進廠日期"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                color="purple"
                                v-model="editedItem.enterDate"
                                @input="dialogDateMenuShow.enter = false"
                                locale="zh-tw"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>

                    <v-col cols="12" sm="4">
                        <v-menu
                            v-model="dialogDateMenuShow.end"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    hide-details
                                    v-model="editedItem.outDate"
                                    v-on="on"
                                    label="出廠日期"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                color="purple"
                                v-model="editedItem.outDate"
                                @input="dialogDateMenuShow.end = false"
                                locale="zh-tw"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>

                    <v-col cols="10" sm="3">
                        <v-select
                            hide-details
                            label="檢修人"
                            v-model="dialogSelectMember"
                            :items="dialogMemberOpt"
                        ></v-select>
                    </v-col>

                    <v-col cols="1">
                        <v-btn fab dark small color="indigo"
                            @click="addMember"
                            class="mt-2"
                        >
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>

                    <v-col cols="12">
                        <v-sheet color="yellow lighten-3" class="mt-1 pa-4">
                        <span class="font-weight-black">已選擇人員：</span>
                            <v-chip
                                v-for="(item, idx) in dialogMemberList"
                                :key="item"
                                class="ma-2"
                                label
                                dark
                            >
                                {{ item }}
                                <v-icon right
                                    @click="delMember(idx)"
                                >mdi-close-circle</v-icon>
                            </v-chip>
                        </v-sheet>
                    </v-col>

                    <v-col cols="12">
                        <v-textarea
                            hide-details
                            label="維修項目"
                            auto-grow
                            outlined
                            rows="6"
                            v-model.trim="editedItem.content"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </div>
            
            <v-card-actions class="px-5 pb-5">
                <v-spacer></v-spacer>
                <v-btn class="mr-2" elevation="4" :loading="isLoading" @click="close">取消</v-btn>
                <v-btn color="success" elevation="4" :loading="isLoading" @click="save">送出</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- data -->
    <v-card
        v-for="(item, idx) in items"
        :key="idx"
        elevation="4"
        class="mb-5 px-4"
    >
        <v-row>
            <v-col cols="12" sm="4">
                <span class="font-weight-black">進廠日期：</span>
                {{ item.enterDate }}
            </v-col>

            <v-col cols="12" sm="4">
                <span class="font-weight-black">出廠日期：</span>
                {{ item.outDate }}
            </v-col>

            <v-col cols="12" sm="4">
                <span class="font-weight-black">檢修人員：</span>
                {{ item.fixMembers.join('、') }}
            </v-col>

            <v-col cols="12" class="pt-sm-0">
                <span class="font-weight-black">維修項目：</span>
                <v-sheet
                    color="grey lighten-3"
                    class="py-2 px-3"
                >
                    {{ item.content }}
                </v-sheet>
            </v-col>

            <v-col cols="12" class="pt-0 text-right">
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
            </v-col>
        </v-row>
    </v-card>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data: () => ({
        isLoading: false,  // 是否讀取中
        dateMemuShow: {  // 日期 menu 是否顯示
            enter: false,
            out: false,
        },
        searchForm: {
            enterDate: new Date().toISOString().substr(0, 10),  // 進廠日期
            outDate: new Date().toISOString().substr(0, 10),  // 出廠日期
            fixMember: '',  // 檢修人
        },
        items: [],  // 查詢後的資料
        selectMembers: [],  // 檢修人下拉選單
        dialogShow: false,  // dialog 是否顯示
        dialogDateMenuShow: {  // dialog 日期 menu 是否顯示
            enter: false,
            out: false,
        },
        editedIndex: -1,
        editedItem: {
            enterDate: '',
            outDate: '',  // 負責人
            content: '',  // 維修項目
            fixMembers: [],  // 維修人員
        },
        defaultItem: {
            enterDate: new Date().toISOString().substr(0, 10),
            outDate: '',
            content: '',
            fixMembers: [],
        },
        dialogMemberOpt: [],  // dialog 檢修人下拉選單
        dialogSelectMember: '',  // dialog 表單中選擇的檢修人
        dialogMemberOptValArr: [],  // dialog 檢修人下拉選單值的陣列(反查名字用)
    }),
    computed: {
        dialogTitle () {
            return this.editedIndex === -1 ? '新增資料' : '編輯資料'
        },
        dialogMemberList() {
            // vue data 屬性的陣列沒預設的陣列屬性，所以值要複制出來
            let arr = [...this.editedItem.fixMembers]

            if (arr.length > 0) {
                return arr.map(item => {
                    let idx = this.dialogMemberOptValArr.indexOf(item)  // 查索引值
                    return this.getMemberName(idx)  // 反查姓名
                })
            }
        },
    },
    watch: {
        // dialog 點遮罩關閉時，表單回覆預設值
        dialogShow (val) {
            val || this.close()
        },
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 向後端取資料
        fetchData() {
            this.chLoadingShow()

            // 範例效果
            setTimeout(() => {
                // 向後端請求資料 (檢修人下拉選單)
                let arr = [
                    { text: '陳小明', value: 'a1'},
                    { text: '王鴻志', value: 'a2'},
                    { text: '張宏偉', value: 'a3'},
                ]
               
                this.selectMembers = [{ text: '不限', value: ''}, ...arr]
                this.dialogMemberOpt = arr
                this.dialogSelectMember = arr[0].value
                this.editedItem = Object.assign({}, this.defaultItem)  // init dialog form
                
                // 計算 dialog 檢修人下拉選單值的陣列(反查名字用)
                this.dialogMemberOptValArr = this.dialogMemberOpt.map(item => {
                    return item.value
                })

                this.chLoadingShow()
            }, 1000)
        },
        // 查詢
        search() {
            this.chLoadingShow()

            // 範例效果
            setTimeout(() => {
                // 向後端請求資料
                this.items = [
                    {
                        enterDate: '2020-01-02',
                        outDate: '2020-01-12',
                        content: '蒸氣室空壓機無作用',
                        fixMembers: ['陳小明'],
                    },
                    {
                        enterDate: '2020-01-15',
                        outDate: '2020-01-23',
                        content: '蒸氣火車C600漏氣 (更換C600上蓋墊片)',
                        fixMembers: ['陳小明', '王鴻志'],
                    },
                    {
                        enterDate: '2020-02-09',
                        outDate: '2020-02-14',
                        content: '引擎充電機作用不良 (更換發電機，測試正常)',
                        fixMembers: ['陳小明', '張宏偉'],
                    },
                ]

                this.chLoadingShow()
            }, 1000)

        },
        // 編輯(顯示 dialog)
        edit(item) {
            // this.editedIndex = this.items.indexOf(item)
            // this.editedItem = Object.assign({}, item)
            this.dialogShow = true
        },
        // 關閉 dialog
        close() {
            this.dialogShow = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        },
        // 儲存
        save() {
            this.isLoading = true

            if (this.editedIndex > -1) {
                // 更新資料

                // 範例效果
                setTimeout(() => {
                    Object.assign(this.items[this.editedIndex], this.editedItem)
                    this.chMsgbar({ success: true, msg: '編輯成功' })
                    this.isLoading = this.dialogShow = false
                }, 1000)
            } else {
                // 新增資料

                // 範例效果
                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '新增成功' })
                    this.isLoading = this.dialogShow = false
                }, 1000)
            }
        },
        // 刪除
        del(item) {
            const idx = this.items.indexOf(item)  // 取得該筆資料索引值
            if (confirm('你確定要刪除嗎?')) {
                this.isLoading = true

                // 範例效果
                setTimeout(() => {
                    this.items.splice(idx, 1)
                    this.chMsgbar({ success: true, msg: '刪除成功' })
                    this.isLoading = false
                }, 1000)
            }
        },
        // dialog 加入檢修人
        addMember() {
            let val = this.dialogSelectMember  // 下拉選單所選的值

            // 未被加入過則新增到檢修人清單中
            if (!this.editedItem.fixMembers.includes(val)) {
                this.editedItem.fixMembers.push(val)  // 加入
            }
        },
        // dialog 刪除檢修人
        delMember(idx) {
            this.editedItem.fixMembers.splice(idx, 1)
        },
        // dialog 反查下拉選單姓名
        getMemberName(idx) {
            return this.dialogMemberOpt[idx].text
        }
    },
    created() {
        this.fetchData()
    }
}
</script>