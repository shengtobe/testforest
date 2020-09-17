<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">
        {{ (this.isEdit)? `工單編輯 (編號：${ routeId })` : '服務科工單新增' }}
    </h2>

    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
        <v-row class="px-2">
            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>年度
                </h3>
                <v-text-field
                    v-model.trim="ipt.year"
                    placeholder="請輸入年度，例：109"
                    solo
                    :rules="[v => (!!v && /[^\s]/.test(v)) || '請輸入年度']"
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-currency-usd</v-icon>預算金額
                </h3>
                <v-text-field
                    v-model.trim="ipt.money"
                    placeholder="請輸入預算金額，例：10萬"
                    solo
                    :rules="[v => (!!v && /[^\s]/.test(v)) || '請輸入預算金額']"
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>履約到期日
                </h3>
                <v-menu
                    v-model="dateMenuShow.expiry"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model.trim="ipt.expiryDate"
                            solo
                            v-on="on"
                            readonly
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        color="purple"
                        v-model="ipt.expiryDate"
                        @input="dateMenuShow.expiry = false"
                        locale="zh-tw"
                    ></v-date-picker>
                </v-menu>
            </v-col>
        </v-row>

        <v-row class="px-2">
            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>通知施作日期 (起)
                </h3>
                <v-menu
                    v-model="dateMenuShow.workStart"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model.trim="ipt.workDateStart"
                            solo
                            v-on="on"
                            readonly
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        color="purple"
                        v-model="ipt.workDateStart"
                        @input="dateMenuShow.workStart = false"
                        locale="zh-tw"
                    ></v-date-picker>
                </v-menu>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>通知施作日期 (訖)
                </h3>
                <v-menu
                    v-model="dateMenuShow.workEnd"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model.trim="ipt.workDateEnd"
                            solo
                            v-on="on"
                            readonly
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        color="purple"
                        v-model="ipt.workDateEnd"
                        @input="dateMenuShow.workEnd = false"
                        locale="zh-tw"
                    ></v-date-picker>
                </v-menu>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-note</v-icon>通知方式
                </h3>
                <v-text-field
                    v-model.trim="ipt.noticeMethod"
                    placeholder="請輸入通知方式"
                    solo
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-account</v-icon>通知人
                </h3>
                <v-text-field
                    v-model.trim="ipt.noticeMember"
                    placeholder="請輸入通知人"
                    solo
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="8">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>通報維修地點及事項
                </h3>
                <v-text-field
                    v-model.trim="ipt.noticeLocation"
                    placeholder="請輸入通報維修地點及事項"
                    solo
                ></v-text-field>
            </v-col>

            <!-- 請修項目 -->
            <v-col cols="12">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-view-list</v-icon>請修項目
                    
                    <v-btn fab dark small color="indigo"
                        @click="dialog = true"
                        class="ml-2 mb-1"
                    >
                        <v-icon dark>mdi-plus</v-icon>
                    </v-btn>
                </h3>

                <v-card>
                    <v-data-table
                        :headers="headers"
                        :items="ipt.items"
                        disable-sort
                        disable-filtering
                        hide-default-footer
                    >
                        <template v-slot:no-data>
                            <span class="red--text subtitle-1">沒有資料</span>
                        </template>
                    
                        <!-- 插入 total 欄位做每筆的總計 -->
                        <template v-slot:item.total="{ item }">
                            <span>{{ item.count * item.price }}</span>
                        </template>

                        <!-- 插入 action 欄位做刪除 -->
                        <template v-slot:item.action="{ item }">
                            <v-btn small dark fab color="red darken-1"
                                @click="deleteItem(item)"
                            >
                                <v-icon dark>mdi-delete</v-icon>
                            </v-btn>
                        </template>

                        <template v-slot:footer>
                            <v-divider></v-divider>

                            <p class="py-2 text-center">
                                總金額： <span class="red--text">{{ totalMoney }}</span>
                            </p>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>

            <v-col cols="12" class="text-center mb-8">
                <v-btn dark class="ma-2"
                    to="/worklist/serve"
                >回搜尋頁</v-btn>

                <v-btn dark color="teal" class="ma-2"
                    @click="excel"
                >列印</v-btn>

                <v-btn color="success" class="ma-2"
                    @click="save"
                >{{ (isEdit)? '儲存變更': '送出' }}</v-btn>
            </v-col>
        </v-row>
    </v-form>

    <!-- 請修項目 dialog -->
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-card-title>
                新增請修項目
                <v-spacer></v-spacer>
                <v-btn fab small text @click="dialog = !dialog" class="mr-n2">
                    <v-icon dark>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-form
                        ref="addForm"
                        v-model="addValid"
                        lazy-validation
                    >
                        <v-row>
                            <v-col cols="12" sm="6" md="3">
                                <v-text-field
                                    label="項次"
                                    v-model.trim="dialogForm.numbers"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="5">
                                <v-text-field
                                    label="項目"
                                    v-model.trim="dialogForm.name"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    label="規格"
                                    v-model.trim="dialogForm.spec"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    label="單位"
                                    v-model.trim="dialogForm.unit"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    label="預估數量"
                                    v-model.trim.number="dialogForm.count"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    label="單價"
                                    v-model.trim.number="dialogForm.price"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>
            </v-card-text>
            
            <v-card-actions class="px-5 pb-5">
                <v-spacer></v-spacer>
                <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
                <v-btn color="success"  elevation="4" @click="add">新增</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { serveNewListExecl } from '@/apis/workList/serve'

export default {
    data: () => ({
        // valid: false,  // 表單是否驗證欄位 (先不驗證以利測試)
        isEdit: false,  // 是否為編輯
        routeId: '',  // 工單編號
        ipt: {},
        defaultIpt: {  // 表單預設值
            year: '',  // 年度
            expiryDate: new Date().toISOString().substr(0, 10),  // 履約到期日
            money: '',  // 預算金額
            workDateStart: new Date().toISOString().substr(0, 10),  // 通知施作日期 (起)
            workDateEnd: new Date().toISOString().substr(0, 10),  // 通知施作日期 (訖)
            noticeMethod: '',  // 通知方式
            noticeMember: '',  // 通知人
            noticeLocation: '',  // 通報維修地點及事項
            items: [],  // 請修項目
        },
        dateMenuShow: {  // 日期選單是否顯示
            expiry: false,  // 履約到期
            workStart: false,  // 通知施作日期 (起)
            workEnd: false,  // 通知施作日期 (訖)
        }, 
        headers: [  // 表格顯示的欄位
            { text: '項次', value: 'numbers', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '項目', value: 'name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '規格', value: 'spec', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '單位', value: 'unit', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '預估數量', value: 'count', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '單價', value: 'price', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '總價', value: 'total', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '刪除', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
        dialog: false,  // dialog 是否顯示
        addValid: true,  // dialog 表單是否驗證
        dialogForm: {},
        dialogDefault: {
            numbers: '',
            name: '',
            spec: '',
            unit: '',
            count: 1,
            price: 0
        },
    }),
    computed: {
        // 全部的總金額
        totalMoney() {
            return this.ipt.items.reduce((a,b)=>a + b.count * b.price, 0)
        }
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 初始化
        initData() {
            this.ipt = { ...this.defaultIpt }  // 初始化表單
            this.dialogForm = { ...this.dialogDefault }  // 初始化 dialog
            
            // -------------- 編輯時 -------------- 
            if (this.$route.params.id != undefined) {
                this.chLoadingShow()
                this.routeId = this.$route.params.id  // 路由參數(id)
                this.isEdit = true

                // 範例效果
                setTimeout(() => {
                    let obj = {
                        year: new Date().getFullYear() - 1911,  // 年度
                        expiryDate: new Date().toISOString().substr(0, 10),  // 履約到期日
                        money: '98萬6,517',  // 預算金額
                        workDateStart: new Date().toISOString().substr(0, 10),  // 通知施作日期 (起)
                        workDateEnd: new Date().toISOString().substr(0, 10),  // 通知施作日期 (訖)
                        noticeMethod: '',  // 通知方式
                        noticeMember: '',  // 通知人
                        noticeLocation: '十字路車站上下車階梯連接通道、木構地坪設置',  // 通報維修地點及事項
                        items: [  // 請修項目
                            {
                                numbers: '1、1',
                                name: '維修大工',
                                spec: '',
                                unit: '人*日',
                                count: 1,
                                price: 2230
                            },
                            {
                                numbers: '1、2',
                                name: '維修小工',
                                spec: '',
                                unit: '人*日',
                                count: 2,
                                price: 1962
                            },
                        ],
                    }
                    
                    this.setInitDate(obj)
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 設定資料(編輯時)
        setInitDate(obj) {
            this.ipt.year = obj.year
            this.ipt.expiryDate = obj.expiryDate
            this.ipt.money = obj.money
            this.ipt.workDateStart = obj.workDateStart
            this.ipt.workDateEnd = obj.workDateEnd
            this.ipt.noticeMethod = obj.noticeMethod
            this.ipt.noticeMember = obj.noticeMember
            this.ipt.noticeLocation = obj.noticeLocation
            this.ipt.items = [ ...obj.items ]
        },
        // 關閉 dialog
        close () {
            this.dialog = false
            setTimeout(() => {
                this.dialogForm = Object.assign({}, this.dialogDefault)
                this.$refs.addForm.resetValidation()  // 取消驗證的紅字樣式
            }, 300)
        },
        // 新增請修項目
        add() {
            this.ipt.items.push(this.dialogForm)
            this.close()
        },
        // 刪除請修項目
        deleteItem(item) {
            let idx = this.ipt.items.indexOf(item)  // 取得該筆資料索引值

            if (confirm('你確定要刪除嗎?')) {
                this.ipt.items.splice(idx, 1)
            }
        },
        // 匯出 excel
        excel() {
            serveNewListExecl(this.ipt).then(res => {
                let link = document.createElement('a')
                link.href = `/downloads/${res.data.file_name}`
                link.setAttribute('download', res.data.file_name)
                document.body.appendChild(link)
                link.click()
            }).catch(function (err) {
                alert('匯出失敗')
            })
        },
        // 送出表單
        save() {
            // if (this.$refs.form.validate()) {  // 表單驗證欄位
                // 送出表單
                this.chLoadingShow()

                // 測試用資料
                setTimeout(() => {
                    let txt = (this.isEdit)? '資料更新成功' :  '資料新增成功'
                    if (!this.isEdit) this.$router.push({ path: '/worklist/serve' })
                    this.chMsgbar({ success: true, msg: txt })
                    this.chLoadingShow()
                }, 1000)
            // }
        }
    },
    created () {
        this.initData()
    },
}
</script>