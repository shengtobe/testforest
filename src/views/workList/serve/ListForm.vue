<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">
        {{ (this.isEdit)? `工單編輯 (編號：${ id })` : '服務科工單新增' }}
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
                    <span class="red--text">*</span>
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

            <v-col cols="12" md="6">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>通報維修地點及事項
                </h3>
                <v-text-field
                    v-model.trim="ipt.noticeLocation"
                    placeholder="請輸入通報維修地點及事項"
                    solo
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>工單性質
                </h3>
                <v-select
                    v-model="ipt.type"
                    :items="[{ text: '契約', value: '3' }, { text: '小額採購', value: '4' }]"
                    solo
                ></v-select>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>工單性質編號
                </h3>
                <v-text-field
                    v-model.trim="ipt.typeNumber"
                    placeholder="請輸入工單性質編號"
                    solo
                ></v-text-field>
            </v-col>
        </v-row>
                
        <!-- 設備標示編號 -->
        <v-row class="px-2 mb-6">
            <v-col cols="12">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-codepen</v-icon>設備標示編號
                    <span class="red--text">*</span>
                </h3>

                <p class="pl-8 mb-0">
                    {{ ipt.eqNumber1 }}-{{ `${ipt.eqNumber2}${ipt.eqNumber22}` }}-{{ `${ipt.eqNumber3}${ipt.eqNumber32}` }}-{{ ipt.eqNumber4 }}

                    <v-btn
                        v-if="isEdit"
                        class="ml-3 mb-1 btn-modify"
                        color="primary"
                        @click="editEqCode"
                    >編輯</v-btn>
                </p>
                
            </v-col>

            <v-col cols="12" class="mt-n4">
                <v-row>
                    <v-col cols="12" md="1" align-self="center">
                        <h3 class="ml-md-6">系統</h3>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-select solo hide-details
                            v-model="ipt.eqNumber1"
                            :items="eqCodes.opt1"
                            :rules="[v => (!!v && /[^\s]/.test(v)) || '請選擇項目']"
                            :disabled="!canModifyEqCode"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12">
                <v-row>
                    <v-col cols="12" md="1" align-self="center">
                        <h3 class="ml-md-6">位置</h3>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-select solo hide-details
                            v-model="ipt.eqNumber2"
                            :items="eqCodes.opt2"
                            :rules="[v => (!!v && /[^\s]/.test(v)) || '請選擇項目']"
                            :disabled="disableLv2"
                        ></v-select>
                    </v-col>

                    <v-col cols="12" md="3" v-if="subIptShow.opt22">
                        <v-select solo hide-details
                            v-model="ipt.eqNumber22"
                            :items="eqCodes.opt22"
                            :rules="[v => (!!v && /[^\s]/.test(v)) || '請選擇項目']"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12">
                <v-row>
                    <v-col cols="12" md="1" align-self="center">
                        <h3 class="ml-md-6">設備</h3>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-select solo hide-details
                            v-model="ipt.eqNumber3"
                            :items="eqCodes.opt3"
                            :rules="[v => (!!v && /[^\s]/.test(v)) || '請選擇項目']"
                        ></v-select>
                    </v-col>

                    <v-col cols="12" md="3" v-if="subIptShow.opt32">
                        <v-select solo hide-details
                            v-model="ipt.eqNumber32"
                            :items="eqCodes.opt32"
                            :rules="[v => (!!v && /[^\s]/.test(v)) || '請選擇項目']"
                            :disabled="disableLv3"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12">
                <v-row>
                    <v-col cols="12" md="1" align-self="center">
                        <h3 class="ml-md-6">序號</h3>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-select solo hide-details
                            v-model="ipt.eqNumber4"
                            :items="eqCodes.opt4"
                            :rules="[v => (!!v && /[^\s]/.test(v)) || '請選擇項目']"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <!-- 請修項目 -->
        <v-row class="px-2">
            <v-col cols="12">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-view-list</v-icon>請修項目
                    
                    <v-btn fab dark small color="indigo"
                        @click="dialog = true"
                        class="ml-2 mb-1 btn-expansion"
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
                        class="theme-table"
                    >
                        <template v-slot:no-data>
                            <span class="red--text subtitle-1">沒有資料</span>
                        </template>
                    
                        <!-- 插入 total 欄位做每筆的總計 -->
                        <template v-slot:item.total="{ item }">
                            <span>{{ item.ServiceCount * item.ServicePrice }}</span>
                        </template>

                        <!-- 插入 action 欄位做刪除 -->
                        <template v-slot:item.action="{ item }">
                            <v-btn small dark fab color="red darken-1 btn-delete"
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
                <v-btn dark class="mr-4 btn-close"
                    @click="closeWindow"
                    v-if="isEdit"
                >關閉視窗</v-btn>

                <v-btn dark class="ma-2 btn-close"
                    v-else
                    to="/worklist/serve"
                >回搜尋頁</v-btn>

                <v-btn dark color="teal" class="ma-2 btn-modify"
                    @click="excel"
                >列印</v-btn>

                <v-btn color="success" class="ma-2 btn-add"
                    @click="save"
                >{{ (isEdit)? '儲存變更': '送出' }}</v-btn>
            </v-col>
        </v-row>
    </v-form>

    <!-- 請修項目 dialog -->
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-card-title
                class="yellow lighten-3 py-2 px-3 btn-memo"
                primary-title
            >
                新增請修項目
                <v-spacer></v-spacer>
                <v-btn text fab small @click="dialog = !dialog">
                    <v-icon dark>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <div class="mx-4 mt-1">
                <v-form
                    ref="addForm"
                    v-model="addValid"
                    lazy-validation
                >
                    <v-row>
                        <!-- <v-col cols="12" sm="6" md="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-apps</v-icon>項次
                            </h3>
                            <v-text-field
                                v-model.trim="dialogForm.numbers"
                                placeholder="請輸入項次"
                                solo
                            ></v-text-field>
                        </v-col> -->

                        <v-col cols="12" sm="6" md="8">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-view-list</v-icon>工項(項目)
                            </h3>
                            <v-text-field
                                v-model.trim="dialogForm.ServiceItem"
                                placeholder="請輸入項目"
                                solo
                            ></v-text-field>
                        </v-col>
                        
                        <v-col cols="12" sm="6" md="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-database</v-icon>規格
                            </h3>
                            <v-text-field
                                v-model.trim="dialogForm.ServiceSpec"
                                placeholder="請輸入規格"
                                solo
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-cube</v-icon>單位
                            </h3>
                            <v-text-field
                                v-model.trim="dialogForm.ServiceUnit"
                                placeholder="請輸入單位"
                                solo
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-chart-bubble</v-icon>預估數量
                            </h3>
                            <v-text-field
                                v-model.trim.number="dialogForm.ServiceCount"
                                placeholder="請輸入預估數量" type="number"
                                solo
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-currency-usd</v-icon>單價
                            </h3>
                            <v-text-field
                                v-model.trim.number="dialogForm.ServicePrice"
                                placeholder="請輸入單價" type="number"
                                solo
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </div>
            
            <v-card-actions class="px-5 pb-5">
                <v-spacer></v-spacer>
                <v-btn class="mr-2 btn-clear" elevation="4" @click="close">取消</v-btn>
                <v-btn class="btn-add" color="success"  elevation="4" @click="add">送出</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime, verifyIptError } from '@/assets/js/commonFun'
import { fetchEqCodeLv1, fetchEqCodeLv2, fetchEqCodeLv3, fetchEqCodeLv4 } from '@/apis/workList/maintain'
import { fetchWorkOrderOne, serveNewListExecl, createWorkOrder, updateListOrder } from '@/apis/workList/serve'

export default {
    props: ['id', 'money'],  //路由參數
    data: () => ({
        valid: false,  // 表單是否驗證欄位 (先不驗證以利測試)
        isEdit: false,  // 是否為編輯
        // id: '',  // 工單編號
        ipt: {
            eqNumber1: '',  // 設備標示編號1
            eqNumber2: '',  // 設備標示編號2
            eqNumber22: '',  // 設備標示編號2-2
            eqNumber3: '',  // 設備標示編號3
            eqNumber32: '',  // 設備標示編號3-2
            eqNumber4: '',  // 設備標示編號4
        },
        defaultIpt: {  // 表單預設值
            year: '',  // 年度
            expiryDate: new Date().toISOString().substr(0, 10),  // 履約到期日
            money: '',  // 預算金額
            workDateStart: new Date().toISOString().substr(0, 10),  // 通知施作日期 (起)
            workDateEnd: new Date().toISOString().substr(0, 10),  // 通知施作日期 (訖)
            noticeMethod: '',  // 通知方式
            noticeMember: '',  // 通知人
            noticeLocation: '',  // 通報維修地點及事項
            type: '3', // 工單性質
            typeNumber: '',  // 工單性質編號
            items: [],  // 請修項目
            eqNumber1: '',  // 設備標示編號1
            eqNumber2: '',  // 設備標示編號2
            eqNumber22: '',  // 設備標示編號2-2
            eqNumber3: '',  // 設備標示編號3
            eqNumber32: '',  // 設備標示編號3-2
            eqNumber4: '',  // 設備標示編號4
        },
        dateMenuShow: {  // 日期選單是否顯示
            expiry: false,  // 履約到期
            workStart: false,  // 通知施作日期 (起)
            workEnd: false,  // 通知施作日期 (訖)
        }, 
        headers: [  // 表格顯示的欄位
            // { text: '項次', value: 'numbers', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold ' },
            { text: '工項(項目)', value: 'ServiceItem', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold ' },
            { text: '規格', value: 'ServiceSpec', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold ' },
            { text: '單位', value: 'ServiceUnit', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold ' },
            { text: '預估數量', value: 'ServiceCount', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold ' },
            { text: '單價', value: 'ServicePrice', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold ' },
            { text: '總價', value: 'total', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold ' },
            { text: '刪除', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold ' },
        ],
        dialog: false,  // dialog 是否顯示
        addValid: true,  // dialog 表單是否驗證
        dialogForm: {},
        dialogDefault: {
            // numbers: '',
            ServiceItem: '',
            ServiceSpec: '',
            ServiceUnit: '',
            ServiceCount: 1,
            ServicePrice: 0
        },
        eqCodes: {
            opt1: [],  // 設備標示編號下拉選單-第1組
            opt2: [],  // 設備標示編號下拉選單-第2組
            opt22: [],  // 設備標示編號下拉選單-第2組-2
            opt3: [],  // 設備標示編號下拉選單-第3組
            opt32: [],  // 設備標示編號下拉選單-第3組-2
            opt4: [],  // 設備標示編號下拉選單-第4組
        },
        // 設備標示編號下拉選單是否禁用
        disableLv2: true,
        disableLv3: true,
        disableLv4: true,
        resOptData: {  // 設備標示編號請求回來的資料
            opt2: [],  // 第2組
            opt3: [],  // 第3組
        },
        subIptShow: {  // 設備標示編號的子選項欄位是否顯示
            opt22: false,  // 第2組-2
            opt32: false,  // 第3組-2
        },
        canModifyEqCode: false,  // 是否能選擇設備標示編號下拉選單
    }),
    computed: {
        // 全部的總金額
        totalMoney() {
            return this.ipt.items.reduce((a,b)=>a + b.ServiceCount * b.ServicePrice, 0)
        },
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
    watch: {
        // ------- 切換選項時，向後端抓下一層的報修碼 --------
        // 系統
        'ipt.eqNumber1': function(newVal) {
            if (this.canModifyEqCode) {  // 若能選擇設備標示編號下拉選單
                if (newVal != '') {
                    this.ipt.eqNumber2 = this.ipt.eqNumber22 = this.ipt.eqNumber3 = this.ipt.eqNumber32 = this.ipt.eqNumber4 = ''
                    this.subIptShow.opt22 = this.subIptShow.opt32 = false
                    this.disableLv2 = false
                    this.disableLv3 = this.disableLv4 = true
                    this.fetchEqCodes(newVal, 2)
                }
            }
        },
        // 位置
        'ipt.eqNumber2': function(newVal) {
            if (this.canModifyEqCode) {  // 若能選擇設備標示編號下拉選單
                if (newVal != '') {
                    let obj = this.resOptData.opt2.find(item => item.DeviceCode == newVal)
                    
                    this.ipt.eqNumber22 = this.ipt.eqNumber3 = this.ipt.eqNumber4 = ''
                    this.subIptShow.opt32 = false
                    this.disableLv3 = false
                    this.disableLv4 = true
                    this.fetchEqCodes(newVal, 3, obj.DeviceCodeParent)

                    // 若第二層有子項目
                    if (obj.device_query_child.length > 0) {
                        this.setEqCodeOption(obj.device_query_child, 'opt22')
                        this.subIptShow.opt22 = true
                    } else {
                        this.ipt.eqNumber22 = ''
                        this.subIptShow.opt22 = false
                    }
                }
            }
        },
        // 位置子項目
        'ipt.eqNumber22': function(newVal) {
            if (this.canModifyEqCode) {  // 若能選擇設備標示編號下拉選單
                if (newVal != '') {
                    let obj = this.resOptData.opt2.find(item => item.DeviceCode == this.ipt.eqNumber2)
                    
                    this.ipt.eqNumber3 = this.ipt.eqNumber32 = this.ipt.eqNumber4 = ''
                    this.disableLv3 = false
                    this.disableLv4 = true
                    this.fetchEqCodes(this.ipt.eqNumber2, 3, obj.DeviceCodeParent, newVal)
                }
            }
        },
        // 設備
        'ipt.eqNumber3': function(newVal) {
            if (this.canModifyEqCode) {  // 若能選擇設備標示編號下拉選單
                if (newVal != '') {
                    let obj = this.resOptData.opt3.find(item => item.DeviceCode == newVal)
                    
                    this.ipt.eqNumber32 = this.ipt.eqNumber4 = ''
                    this.disableLv4 = false
                    this.fetchEqCodes(newVal, 4, obj.DeviceCodeParent)

                    // 若第二層有子項目
                    if (obj.device_query_child.length > 0) {
                        this.setEqCodeOption(obj.device_query_child, 'opt32')
                        this.subIptShow.opt32 = true
                    } else {
                        this.ipt.eqNumber32 = ''
                        this.subIptShow.opt32 = false
                    }
                }
            }
        },
        // 設備子項目
        'ipt.eqNumber32': function(newVal) {
            if (this.canModifyEqCode) {  // 若能選擇設備標示編號下拉選單
                if (newVal != '') {
                    let obj = this.resOptData.opt3.find(item => item.DeviceCode == this.ipt.eqNumber3)

                    this.ipt.eqNumber4 = ''
                    this.disableLv4 = false
                    this.fetchEqCodes(this.ipt.eqNumber3, 4, obj.DeviceCodeParent, newVal)
                }
            }
        },
    },
    methods: {
        ...mapActions('system', [
            'chDialog',  // 改變 dialog
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'getNowFullTime',  // 取得目前時間
            'closeWindow',  // 關閉視窗
        ]),
        // 初始化
        async initData() {
            this.chLoadingShow({show:true})
            this.initFetchData()  // 判斷新增或編輯

            // 向後端請求第一層設備標示編號
            try {
                let codeRes = await fetchEqCodeLv1({ ClientReqTime: getNowFullTime() })  // 取得設備標示編號
                this.setEqCodeOption(codeRes.data.device_query, 'opt1')  // 初始化設備標示編號第一組檢修碼下拉選單
            } catch (err) {
                alert('設備報修資料取得失敗')
            }

            this.chLoadingShow({show:false})
        },
        // 判斷新增或編輯
        initFetchData() {
            this.ipt = { ...this.ipt, ...this.defaultIpt }  // 初始化表單
            this.dialogForm = { ...this.dialogDefault }  // 初始化 dialog

            if (this.id != undefined) {
                // -------- 編輯時 -------
                this.isEdit = true

                // 向後端請求資料
                this.fetchOrderOne()
            } else {
                // 新增的情況
                this.canModifyEqCode = true  // 讓設備標示編號下拉選單能選擇
                this.ipt.money = this.money
            }
        },
        // 向後端請求資料(編輯時用)
        fetchOrderOne() {
            this.chLoadingShow({show:true})

            fetchWorkOrderOne({
                WorkOrderID: this.id,  // 工單編號
                ClientReqTime: getNowFullTime()  // client 端請求時間
            }).then(res => {
                let obj = res.data

                // 檢查是否有權限編輯 (僅立案人、派工人可編輯)
                if (obj.CreatorID != this.userData.UserId && obj.CreatorID != this.userData.UserId) {
                    this.$router.push({ path: '/no-permission' })
                }

                // 設定資料
                    this.id = obj.WorkOrderID,  // 工單編號
                    this.ipt.year = obj.WorkYear  // 年度
                    this.ipt.expiryDate = obj.AgreementDTime  // 履約到期日
                    this.ipt.money = obj.WorkBudget  // 預算金額
                    this.ipt.workDateStart = obj.WorkNoticeStartDTime  // 通知施作日期 (起)
                    this.ipt.workDateEnd = obj.WorkNoticeEndDTime  // 通知施作日期 (訖)
                    this.ipt.noticeMethod = obj.NoticeMethod  // 通知方式
                    this.ipt.noticeMember = obj.NoticeManID  // 通知人
                    this.ipt.noticeLocation = obj.Malfunction  // 通報維修地點及事項
                    this.ipt.type = obj.Type // 工單性質
                    this.ipt.typeNumber = obj.OderTypeCode  // 工單性質編號
                    this.ipt.items = [ ...obj.ItemCount ]  // 請修項目
                    this.ipt.eqNumber1 = obj.MaintainCode_System  // 設備標示編號1
                    this.ipt.eqNumber2 = obj.MaintainCode_Loc  // 設備標示編號2
                    this.ipt.eqNumber22 = obj.MaintainCode_Loc2  // 設備標示編號2-2
                    this.ipt.eqNumber3 = obj.MaintainCode_Eqp  // 設備標示編號3
                    this.ipt.eqNumber32 = obj.MaintainCode_Eqp2  // 設備標示編號3-2
                    this.ipt.eqNumber4 = obj.MaintainCode_Seq  // 設備標示編號4
            }).catch(err => {
                console.log(err)
                alert('資料讀取失敗')
            }).finally(() => {
                this.chLoadingShow({show:false})
            })
        },
        // 關閉 dialog
        close () {
            this.dialog = false
            setTimeout(() => {
                this.dialogForm = { ...this.dialogDefault }  // 初始化 dialog
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
            serveNewListExecl({
                CreatorID: this.userData.UserId,  // 立案人id
                WorkYear: this.ipt.year,  // 年度
                WorkBudget: this.ipt.money,  // 預算金額
                AgreementDTime: this.ipt.expiryDate,  // 履約到期日
                WorkNoticeStartDTime: this.ipt.workDateStart,  // 通知施作日期 (起)
                WorkNoticeEndDTime: this.ipt.workDateEnd,  // 通知施作日期 (訖)
                NoticeMethod: this.ipt.noticeMethod,  // 通知方式
                NoticeManID: this.ipt.noticeMember,  // 通知人
                // Type: this.ipt.type,  // 工單性質
                OderTypeCode: this.ipt.typeNumber,  // 工單性質編號
                // MaintainCode_System: this.ipt.eqNumber1,  // 設備標示編號(系統)
                // MaintainCode_Loc: (this.ipt.eqNumber22 == '')? this.ipt.eqNumber2 : `${this.ipt.eqNumber2}_${this.ipt.eqNumber22}`,  // 設備標示編號(位置)
                // MaintainCode_Eqp: (this.ipt.eqNumber32 == '')? this.ipt.eqNumber3 : `${this.ipt.eqNumber3}_${this.ipt.eqNumber32}`,  // 設備標示編號(設備)
                // MaintainCode_Seq: this.ipt.eqNumber4,  // 設備標示編號(序號)
                Malfunction: this.ipt.noticeLocation,  // 通報維修地點及事項
                WorkSubject: '',  // 故障主旨(目前是備用的欄位)
                ItemCount: this.ipt.items, // 請修項目
                TotalSpent: this.totalMoney,  // 總金額
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
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
            if(this.ipt.year == ''){
                alert("年度未填")
                return
            }
            else if(this.ipt.eqNumber1 == '' || this.ipt.eqNumber2 == '' || this.ipt.eqNumber3 == '' || this.ipt.eqNumber4 == ''){
                alert("設備標示編號未選妥")
                return
            }
            else if(this.subIptShow.opt22 == true && this.ipt.eqNumber22 == ''){
                alert("設備標示編號未選妥")
                return
            }
            else if(this.subIptShow.opt32 == true && this.ipt.eqNumber32 == ''){
                alert("設備標示編號未選妥")
                return
            }
            // if (this.$refs.form.validate()) {  // 表單驗證欄位
                this.chLoadingShow({show:true})

                if (this.isEdit) {
                    // -------- 編輯時 -------
                    updateListOrder({
                        WorkOrderID: this.id,  // 工單編號
                        WorkYear: this.ipt.year,  // 年度
                        WorkBudget: this.ipt.money,  // 預算金額
                        AgreementDTime: this.ipt.expiryDate,  // 履約到期日
                        WorkNoticeStartDTime: this.ipt.workDateStart,  // 通知施作日期 (起)
                        WorkNoticeEndDTime: this.ipt.workDateEnd,  // 通知施作日期 (訖)
                        NoticeMethod: this.ipt.noticeMethod,  // 通知方式
                        NoticeManID: this.ipt.noticeMember,  // 通知人
                        Type: this.ipt.type,  // 工單性質
                        OderTypeCode: this.ipt.typeNumber,  // 工單性質編號
                        MaintainCode_System: this.ipt.eqNumber1,  // 設備標示編號(系統)
                        MaintainCode_Loc: (this.ipt.eqNumber22 == '')? this.ipt.eqNumber2 : `${this.ipt.eqNumber2}/${this.ipt.eqNumber22}`,  // 設備標示編號(位置)
                        MaintainCode_Eqp: (this.ipt.eqNumber32 == '')? this.ipt.eqNumber3 : `${this.ipt.eqNumber3}/${this.ipt.eqNumber32}`,  // 設備標示編號(設備)
                        MaintainCode_Seq: this.ipt.eqNumber4,  // 設備標示編號(序號)
                        Malfunction: this.ipt.noticeLocation,  // 通報維修地點及事項
                        WorkSubject: '',  // 故障主旨(目前是備用的欄位)
                        ItemCount: this.ipt.items, // 請修項目
                        TotalSpent: this.totalMoney,  // 總金額
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                    }).then(res => {
                        if (res.data.ErrorCode == 0) {
                            this.chMsgbar({ success: true, msg: '編輯成功' })
                            // 為避免使用者選立即派工，導致input的不會同步改變，所以重新向後端請求資料
                            this.fetchOrderOne()
                        } else {
                            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                            this.$router.push({ path: '/error' })
                        }
                    }).catch(err => {
                        this.chDialog({ show: true, msg: '伺服器發生問題，更新失敗' })
                    }).finally(() => {
                        this.chLoadingShow({show:false})
                    })
                } else {
                    // -------- 新增時 -------
                    createWorkOrder({
                        CreatorID: this.userData.UserId,  // 立案人id
                        WorkYear: this.ipt.year,  // 年度
                        WorkBudget: this.ipt.money,  // 預算金額
                        AgreementDTime: this.ipt.expiryDate,  // 履約到期日
                        WorkNoticeStartDTime: this.ipt.workDateStart,  // 通知施作日期 (起)
                        WorkNoticeEndDTime: this.ipt.workDateEnd,  // 通知施作日期 (訖)
                        NoticeMethod: this.ipt.noticeMethod,  // 通知方式
                        NoticeManID: this.ipt.noticeMember,  // 通知人
                        Type: this.ipt.type,  // 工單性質
                        OderTypeCode: this.ipt.typeNumber,  // 工單性質編號
                        MaintainCode_System: this.ipt.eqNumber1,  // 設備標示編號(系統)
                        MaintainCode_Loc: (this.ipt.eqNumber22 == '')? this.ipt.eqNumber2 : `${this.ipt.eqNumber2}_${this.ipt.eqNumber22}`,  // 設備標示編號(位置)
                        MaintainCode_Eqp: (this.ipt.eqNumber32 == '')? this.ipt.eqNumber3 : `${this.ipt.eqNumber3}_${this.ipt.eqNumber32}`,  // 設備標示編號(設備)
                        MaintainCode_Seq: this.ipt.eqNumber4,  // 設備標示編號(序號)
                        Malfunction: this.ipt.noticeLocation,  // 通報維修地點及事項
                        WorkSubject: '',  // 故障主旨(目前是備用的欄位)
                        ItemCount: this.ipt.items, // 請修項目
                        TotalSpent: this.totalMoney,  // 總金額
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                    }).then(res => {
                        if (res.data.ErrorCode == 0) {
                            this.chDialog({ show: true, msg: '新增成功，工單編號為： ' + res.data.WorkOrderID })
                            // this.clearErrIpt()
                            // this.ipt = { ...this.defaultIpt }  // 初始化表單
                            // this.dialogForm = { ...this.dialogDefault }  // 初始化 dialog
                        } else {
                            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                            this.$router.push({ path: '/error' })
                        }
                    }).catch(err => {
                        this.chDialog({ show: true, msg: '伺服器發生問題，新增失敗' })
                    }).finally(() => {
                        this.chLoadingShow({show:false})
                        this.$refs.form.resetValidation()  // 取消欄位驗證的紅字樣式
                    })
                }
            // } else {
            //     // 欄位驗證
            //     verifyIptError([
            //         { label: '派工人', target: this.dispatchID, errTarget: 'dispatchID' },
            //         { label: '設備標示編號(系統)', target: this.ipt.eqNumber1, errTarget: 'eqNumber1' },
            //         { label: '設備標示編號(位置)', target: this.ipt.eqNumber2, errTarget: 'eqNumber2' },
            //         { label: '設備標示編號(設備)', target: this.ipt.eqNumber3, errTarget: 'eqNumber3' },
            //         { label: '設備標示編號(序號)', target: this.ipt.eqNumber4, errTarget: 'eqNumber4' },
            //         { label: '故障描述', target: this.ipt.malfunctionDes, errTarget: 'malfunctionDes' },
            //     ], this)
            // }
        },
        // 初始化設備標示編號
        // codeArr: 後端傳的報修碼陣列, opt: 要設定在哪一組下拉選單(op1~4)
        setEqCodeOption(codeArr, opt) {
            this.eqCodes[opt] = codeArr.map(item => {
                return {
                    text: item.CodeDescript,
                    value: item.DeviceCode
                }
            })
        },
        // 向後端請求設備標示編號
        // 參數說明：val => 上層所選的值, lv => 要向後端取得的層數 (2~4)
        async fetchEqCodes(val, lv, parentVal='', subVal='') {
            this.chLoadingShow({show:true})
            let codeRes = {}
            switch(lv) {
                case 2:
                    codeRes = await fetchEqCodeLv2({ ClientDeviceCode: val, ClientReqTime: getNowFullTime() })
                    this.resOptData.opt2 = codeRes.data.device_query
                    break
                case 3:
                    codeRes = await fetchEqCodeLv3({
                        ClientDeviceCode: val,  // 位置
                        ClientDeviceCodeParent: parentVal,  // 位置父code
                        ClientDeviceCodeChild: subVal,  // 位置子項目
                        ClientReqTime: getNowFullTime() 
                    })
                    this.resOptData.opt3 = codeRes.data.device_query
                    break
                case 4:
                    codeRes = await fetchEqCodeLv4({
                        ClientDeviceCode: val,  // 設備
                        ClientDeviceCodeChildParent: val,  // 設備
                        ClientDeviceCodeChild: subVal,  // 設備子項目
                        ClientDeviceCodeParent: parentVal,  // 設備父code
                        ClientReqTime: getNowFullTime()
                    })
                    break
                default:
                    break
            }
            
            this.setEqCodeOption(codeRes.data.device_query, 'opt'+ lv)
            this.chLoadingShow({show:false})
        },
        // 編輯
        editEqCode() {
            if (confirm('編輯設備標示編號會需要重新選擇，你確定嗎?')) {
                this.ipt.eqNumber1 = this.ipt.eqNumber2 = this.ipt.eqNumber22 = this.ipt.eqNumber3 = this.ipt.eqNumber32 = this.ipt.eqNumber4 = ''
                this.canModifyEqCode = true
            }
        },
    },
    created () {
        this.initData()
    },
}
</script>