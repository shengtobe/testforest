<template>
<v-container>
    <h2 class="mb-4">
        人員傷亡名單
        <span class="mx-3">(事故事件編號：{{ routeId }})</span>

        <v-btn small dark fab color="indigo darken-3" class="mb-1"
            @click="dialogShow = true"
        >
            <v-icon dark>mdi-plus</v-icon>
        </v-btn>
    </h2>

    <v-row no-gutters class="mb-8">
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

                    <!-- 表格最上面插入 toolbar 及 dialog -->
                    <template v-slot:top>
                        <v-dialog v-model="dialogShow" max-width="800px">
                            <v-card>
                                <v-card-title class="teal white--text px-4 py-1">
                                    {{ formTitle }}
                                    <v-spacer></v-spacer>
                                    <v-btn dark fab small text @click="dialogShow = false" class="mr-n2">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-card-title>

                                <v-card-text class="pt-2">
                                    <v-form
                                        ref="form"
                                        v-model="valid"
                                        lazy-validation
                                    >
                                        <v-row>
                                            <v-col cols="12" sm="4" md="3">
                                                <h3 class="mb-1">
                                                    <v-icon class="mr-1 mb-1">mdi-account</v-icon>姓名
                                                    <span class="red--text">*</span>
                                                </h3>
                                                <v-text-field
                                                    v-model.trim="editedItem.name"
                                                    solo
                                                    :rules="[v => (!!v && /[^\s]/.test(v)) || '此欄位不可空白']"
                                                ></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="4" md="3">
                                                <h3 class="mb-1">
                                                    <v-icon class="mr-1 mb-1">mdi-format-list-bulleted</v-icon>性別
                                                </h3>
                                                <v-select
                                                    v-model="editedItem.sex"
                                                    :items="['男', '女']"
                                                    solo
                                                ></v-select>
                                            </v-col>

                                            <v-col cols="12" sm="4" md="3">
                                                <h3 class="mb-1">
                                                    <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>生日
                                                </h3>
                                                <v-menu
                                                    v-model="dateMenuShow"
                                                    :close-on-content-click="false"
                                                    transition="scale-transition"
                                                    max-width="290px"
                                                    min-width="290px"
                                                >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                            v-model.trim="editedItem.birthday"
                                                            solo
                                                            v-on="on"
                                                            readonly
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker
                                                        color="purple"
                                                        v-model="editedItem.date"
                                                        @input="dateMenuShow = false"
                                                        locale="zh-tw"
                                                    ></v-date-picker>
                                                </v-menu>
                                            </v-col>

                                            <v-col cols="12" sm="4" md="3">
                                                <h3 class="mb-1">
                                                    <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>電話
                                                </h3>
                                                <v-text-field
                                                    v-model.trim="editedItem.phone"
                                                    solo
                                                ></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="8" md="6">
                                                <h3 class="mb-1">
                                                    <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>住址
                                                </h3>
                                                <v-text-field
                                                    v-model.trim="editedItem.addr"
                                                    solo
                                                ></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="4" md="3">
                                                <h3 class="mb-1">
                                                    <v-icon class="mr-1 mb-1">mdi-format-list-bulleted</v-icon>傷亡種類
                                                </h3>
                                                <v-select
                                                    v-model="editedItem.type"
                                                    :items="['輕傷', '昏迷', '重傷', '死亡']"
                                                    solo
                                                ></v-select>
                                            </v-col>

                                            <v-col cols="12" sm="4" md="3">
                                                <h3 class="mb-1">
                                                    <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>收治醫院
                                                </h3>
                                                <v-text-field
                                                    v-model.trim="editedItem.hospital"
                                                    solo
                                                ></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="4" md="3">
                                                <h3 class="mb-1">
                                                    <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>賠償金額
                                                </h3>
                                                <v-text-field
                                                    v-model.trim.number="editedItem.money"
                                                    solo
                                                    :rules="[v => /^\d+$/.test(v) || '請輸入整數']"
                                                ></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <h3 class="mb-1">
                                                    <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>保險註記
                                                </h3>
                                                <v-text-field
                                                    v-model.trim="editedItem.insurance"
                                                    solo
                                                ></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="5">
                                                <h3 class="mb-1">
                                                    <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>備註
                                                </h3>
                                                <v-text-field
                                                    v-model.trim="editedItem.note"
                                                    solo
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </v-card-text>
                                
                                <v-card-actions class="px-5 pb-5">
                                    <v-spacer></v-spacer>
                                    <v-btn class="mr-2" elevation="4" @click="dialogShow = false" :loading="isDialogLoading">取消</v-btn>
                                    <v-btn color="success" elevation="4" @click="save" :loading="isDialogLoading">送出</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </template>

                    <template v-slot:action="{ item }">
                        <a href="javascript:;" @click="editItem(item)">編輯</a><br>
                        <a href="javascript:;" @click="deleteItem(item)">刪除</a>
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

        <v-col cols="12" class="mt-5 text-center">
            <v-btn dark class="mr-3"
                :to="`/smis/car-accident-event/${routeId}/show`"
            >回上層</v-btn>

            <v-btn dark color="success"
                @click="noDeath"
            >無人傷亡</v-btn>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import Pagination from '@/components/Pagination.vue'

export default {
    data: () => ({
        routeId: '',
        valid: true,  // dialog 表單是否驗證
        dialogShow: false,
        isDialogLoading: false,  // dialog 是否讀取中
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '姓名', value: 'name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '75px' },
            { text: '性別', value: 'sex', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '75px' },
            { text: '生日', value: 'birthday', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110px' },
            { text: '住址', value: 'addr', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '150px' },
            { text: '電話', value: 'phone', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110px' },
            { text: '傷亡種類', value: 'type', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70px' },
            { text: '收治醫院', value: 'hospital', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '80px' },
            { text: '賠償金額', value: 'money', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70px' },
            { text: '保險註記', value: 'insurance', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110px' },
            { text: '備註', value: 'note', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70px' },
            { text: '編輯刪除', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70px' },
        ],
        editedIndex: -1,
        editedItem: {},
        defaultItem: {
            name: '',
            sex: '男',
            birthday: new Date().toISOString().substr(0, 10),
            addr: '',
            phone: '',
            type: '輕傷',
            hospital: '',
            money: 0,
            insurance: '',
            note: '',
        },
        dateMenuShow: false,  // 日期選單是否顯示
    }),
    components: { Pagination },
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        },
        // dialogShow 是否顯示
        dialogShow (val) {
            val || this.close()
        },
    },
    computed: {
        formTitle () {
            return (this.editedIndex == -1) ? '新增資料' : '編輯資料'
        },
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 向後端取得資料
        fetchData() {
            this.chLoadingShow()
            this.routeId = this.$route.params.id
            this.editedItem = { ...this.defaultItem }

            // 新增測試用資料
            setTimeout(() => {
                this.tableItems = [
                    {
                        id: 1,
                        name: '王小明',
                        sex: '男',
                        birthday: '1962-03-11',
                        addr: '高雄市三民區中正路180巷9號3樓-3',
                        phone: '0987654321',
                        type: '輕傷',
                        hospital: '高雄長庚醫院',
                        money: 50000,
                        insurance: '由勞工保險理賠',
                        note: '住院3天',
                    },
                ]

                this.chLoadingShow()
            }, 1000)
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 編輯記錄
        editItem (item) {
            this.editedIndex = this.tableItems.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogShow = true
        },
        // 刪除記錄
        deleteItem (item) {
            let index = this.tableItems.indexOf(item)
            if (confirm(`你確定要刪除「${item.name}」嗎?`)) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.tableItems.splice(index, 1)
                    this.chMsgbar({ success: true, msg: '刪除成功'})
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // dialog 關閉
        close() {
            this.dialogShow = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        // 存檔
        save() {
            if (this.$refs.form.validate()) {  // 表單驗證欄位
                this.isDialogLoading = true

                setTimeout(() => {
                    if (this.editedIndex > -1) {
                        // 向後端編輯
                        Object.assign(this.tableItems[this.editedIndex], this.editedItem)
                        this.chMsgbar({ success: true, msg: '編輯成功'})
                    } else {
                        // 向後端新增
                        this.tableItems.push(this.editedItem)
                        this.chMsgbar({ success: true, msg: '新增成功'})
                    }
                    this.close()
                    this.isDialogLoading = false
                }, 1000)
            } else {
                alert('有欄位未正確填寫!')
            }
        },
        // 設為無人傷亡
        noDeath() {
            if (confirm(`你確定無人傷亡嗎?  (確定後會一併刪除現有的傷亡資料)`)) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.tableItems = [ ...[] ]
                    this.chMsgbar({ success: true, msg: '已設為無人傷亡'})
                    this.chLoadingShow()
                }, 1000)
            }
        },
    },
    created() {
        this.fetchData()
    }
}
</script>