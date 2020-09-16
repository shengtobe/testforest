<template>
<v-row class="justify-center mt-2 mb-5">
    <v-col cols="12" sm="10">
        <v-card color="red lighten-4" class="pa-2">
            <h2 class="text-center">通報單新增</h2>

            <v-sheet color="white" class="mt-2 pa-4">
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                label="年度"
                                v-model.trim="ipt.year"
                                :rules="[v => (!!v && /[^\s]/.test(v)) || '請輸入年度']"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                            <v-menu
                                v-model="dateMenuShow.expiry"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        label="履約到期日"
                                        v-model="ipt.expiryDate"
                                        v-on="on"
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

                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                label="預算金額"
                                v-model.trim="ipt.money"
                                :rules="[v => (!!v && /[^\s]/.test(v)) || '請輸入預算金額']"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                            <v-menu
                                v-model="dateMenuShow.workStart"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        label="通知施作日期 (起)"
                                        v-model="ipt.workDateStart"
                                        v-on="on"
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

                        <v-col cols="12" sm="6" md="4">
                            <v-menu
                                v-model="dateMenuShow.workEnd"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        label="通知施作日期 (訖)"
                                        v-model="ipt.workDateEnd"
                                        v-on="on"
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

                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                label="通知方式"
                                v-model.trim="ipt.noticeMethod"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                label="通知人"
                                v-model.trim="ipt.noticeMember"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="8">
                            <v-text-field
                                label="通報維修地點及事項"
                                v-model.trim="ipt.noticeLocation"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <!-- 請修項目 -->
                    <v-row class="mt-3">
                        <v-col cols="12">
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

                                    <!-- 表格最上面插入 toolbar 及 dialog -->
                                    <template v-slot:top>
                                        <v-toolbar flat color="green accent-2">
                                            <v-icon class="mr-2">mdi-view-list</v-icon>
                                            <v-toolbar-title>請修項目</v-toolbar-title>

                                            <v-spacer></v-spacer>

                                            <!-- 匯出 excel -->
                                            <v-btn fab dark small color="green"
                                                class="mr-3"
                                                @click="excel"
                                            >
                                                <v-icon>mdi-file-excel</v-icon>
                                            </v-btn>

                                            <!-- dialog -->
                                            <v-dialog v-model="dialog" max-width="600px">
                                                <template v-slot:activator="{ on }">
                                                    <v-btn fab dark small color="teal" v-on="on">
                                                        <v-icon dark>mdi-plus</v-icon>
                                                    </v-btn>
                                                </template>

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
                                        </v-toolbar>
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
                                </v-data-table>
                            </v-card>
                        </v-col>
                    </v-row>
                        
                    <v-row>
                        <v-col cols="12" class="text-center mb-2">
                            總金額： <span class="red--text">{{ totalMoney }}</span>
                        </v-col>

                        <v-col cols="12">
                            <v-btn large block
                                class="mt-n4"
                                color="success"
                                @click="save"
                            >送出</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-sheet>
        </v-card>
    </v-col>
</v-row>
</template>

<script>
import { serveNewListExecl } from '@/apis/workList/serve'

export default {
    data: () => ({
        valid: true,  // 表單是否驗證欄位
        ipt: {
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
        },
        dateMenuShow: {  // 日期選單是否顯示
            expiry: false,  // 履約到期
            workStart: false,  // 通知施作日期 (起)
            workEnd: false,  // 通知施作日期 (訖)
        }, 
        headers: [  // 表格顯示的欄位
            { text: '項次', value: 'numbers', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
            { text: '項目', value: 'name', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
            { text: '規格', value: 'spec', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
            { text: '單位', value: 'unit', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
            { text: '預估數量', value: 'count', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
            { text: '單價', value: 'price', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
            { text: '總價', value: 'total', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
            { text: '刪除', value: 'action', align: 'center', class: 'subtitle-1 black--text font-weight-bold' },
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
            if (this.$refs.form.validate()) {  // 表單驗證欄位
                // 送出表單
            }
        }
    },
    created () {
        this.dialogForm = Object.assign({}, this.dialogDefault)
    },
}
</script>