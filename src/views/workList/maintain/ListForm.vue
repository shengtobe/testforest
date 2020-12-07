<template>
<v-container style="max-width: 1200px">
    <!-- 組織表 -->
    <OrganizeDialog />  

    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
        <h2 class="mb-4">
            {{ (this.isEdit)? `工單編輯 (編號：${ workNumber })` : '維修、養護科工單新增' }}
        </h2>

        <!-- 基本資訊 -->
        <v-row class="px-2">
            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-account</v-icon>立案人
                </h3>
                <v-text-field
                    v-model.trim="creater"
                    solo
                    readonly
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-apps</v-icon>請修單位
                </h3>
                <v-text-field
                    v-model.trim="fixUnit"
                    solo
                    readonly
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>立案日期
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
                            v-model.trim="ipt.date"
                            solo
                            v-on="on"
                            readonly
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        color="purple"
                        v-model="ipt.date"
                        @input="dateMenuShow = false"
                        locale="zh-tw"
                    ></v-date-picker>
                </v-menu>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-account</v-icon>派工人
                    <span class="red--text">*</span>
                </h3>
                <v-text-field
                    :value="dispatchName"
                    solo
                    readonly
                    @click="toggleShow"
                    :background-color="ipt.errorDispatchID"
                    :rules="[v => (!!v && /[^\s]/.test(v)) || '請選擇派工人']"
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-source-branch</v-icon>維修類型
                </h3>
                <v-select
                    v-model="ipt.fixType"
                    :items="[{ text: '故障檢修', value: '1' }, { text: '例行保養', value: '2' }]"
                    solo
                ></v-select>
            </v-col>
        </v-row>

        <v-divider class="mx-2 mt-5 mb-8"></v-divider>

        <!-- 派工時間 -->
        <v-row class="px-2 mb-6">
            <v-col cols="12" md="4">
                <h3 class="mb-1">
                    選擇派工時間
                </h3>
                <v-radio-group v-model="ipt.nowAction" row>
                    <v-radio
                        label="立即派工" 
                        :value="true" 
                        color="success"
                    ></v-radio>

                    <v-radio
                        label="定期保養/維修"
                        :value="false"
                        color="blue"
                    ></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" sm="6" md="3"
                v-if="!ipt.nowAction"
            >
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>日期
                </h3>
                <v-menu
                    v-model="workDateMenuShow"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            solo
                            v-model="ipt.workDate"
                            v-on="on"
                            readonly
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        color="purple"
                        v-model="ipt.workDate"
                        @input="workDateMenuShow = false"
                        locale="zh-tw"
                    ></v-date-picker>
                </v-menu>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-clock</v-icon>時間
                </h3>
                <v-select
                    v-model="ipt.hour"
                    :items="hourOpts"
                    solo
                ></v-select>
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
                        class="ml-3 mb-1"
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
                            :background-color="ipt.errorEqNumber1"
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
                            :background-color="ipt.errorEqNumber2"
                            :rules="[v => (!!v && /[^\s]/.test(v)) || '請選擇項目']"
                            :disabled="disableLv2"
                        ></v-select>
                    </v-col>

                    <v-col cols="12" md="3" v-if="subIptShow.opt22">
                        <v-select solo hide-details
                            v-model="ipt.eqNumber22"
                            :items="eqCodes.opt22"
                            :background-color="ipt.errorEqNumber22"
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
                            :background-color="ipt.errorEqNumber3"
                            :rules="[v => (!!v && /[^\s]/.test(v)) || '請選擇項目']"
                        ></v-select>
                    </v-col>

                    <v-col cols="12" md="3" v-if="subIptShow.opt32">
                        <v-select solo hide-details
                            v-model="ipt.eqNumber32"
                            :items="eqCodes.opt32"
                            :background-color="ipt.errorEqNumber32"
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
                            :background-color="ipt.errorEqNumber4"
                            :rules="[v => (!!v && /[^\s]/.test(v)) || '請選擇項目']"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <!-- 故障描述 -->
        <v-row class="px-2 mb-8">
            <v-col cols="12">
                <h3 class="mb-2">
                    <v-icon class="mr-1 mb-1">mdi-pen</v-icon>故障描述
                    <span class="red--text">*</span>
                </h3>
                <v-textarea
                    auto-grow
                    solo
                    rows="6"
                    placeholder="請輸入故障描述"
                    v-model.trim="ipt.malfunctionDes"
                    :background-color="ipt.errorMalfunctionDes"
                    :rules="[v => (!!v && /[^\s]/.test(v)) || '此欄位不可空白']"
                ></v-textarea>
            </v-col>

            <v-col cols="12" class="text-center">
                <v-btn dark class="mr-4"
                    @click="closeWindow"
                    v-if="isEdit"
                >關閉視窗</v-btn>

                <v-btn dark class="mr-4"
                    v-else
                    to="/worklist/maintain"
                >回搜尋頁</v-btn>

                <v-btn
                    color="success"
                    @click="save"
                >送出</v-btn>
            </v-col>
        </v-row> 
    </v-form>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import OrganizeDialog from '@/components/OrganizeDialog.vue'
import { getNowFullTime } from '@/assets/js/commonFun'
import { hourOptions } from '@/assets/js/dateTimeOption'
import { createWorkOrder, fetchEqCodeLv1, fetchEqCodeLv2, fetchEqCodeLv3, fetchEqCodeLv4, fetchWorkOrderOne, updateListOrder } from '@/apis/workList/maintain'

export default {
    data: () => ({
        valid: true,  // 表單是否驗證欄位
        isEdit: false,  // 是否為編輯
        workNumber: '',  // 工單編號
        creater: '',  // 立案人名稱
        createrId: 'K10744389',  // 立案人員工編號
        fixUnit: '',  // 請修單位
        ipt: {  // 輸入的內容)
            eqNumber1: '',  // 設備標示編號1
            eqNumber2: '',  // 設備標示編號2
            eqNumber22: '',  // 設備標示編號2-2
            eqNumber3: '',  // 設備標示編號3
            eqNumber32: '',  // 設備標示編號3-2
            eqNumber4: '',  // 設備標示編號4
        },  
        defaultIpt: {  // 預設內容
            date: new Date().toISOString().substr(0, 10),  // 立案日期
            malfunctionDes: '',  // 故障描述
            fixType: '1',  // 維修類型
            nowAction: true,  // 是否立即派工
            hour: (new Date().getHours() < 10)? '0'+ new Date().getHours().toString() : new Date().getHours().toString(),  // 派工的小時
            workDate: new Date().toISOString().substr(0, 10),  // 派工日期
            errorDispatchID: '',  // 必填欄位背景色-派工人
            errorEqNumber1: '',  // 必填欄位背景色-設備標示編號1
            errorEqNumber2: '',  // 必填欄位背景色-設備標示編號2
            errorEqNumber22: '',  // 必填欄位背景色-設備標示編號2-2
            errorEqNumber3: '',  // 必填欄位背景色-設備標示編號3
            errorEqNumber32: '',  // 必填欄位背景色-設備標示編號3-2
            errorEqNumber4: '',  // 必填欄位背景色-設備標示編號4
            errorMalfunctionDes: '',  // 必填欄位背景色-故障描述
        },
        dateMenuShow: false,  // 日期選單是否顯示
        workDateMenuShow: false,  // 維護日期選單是否顯示
        hourOpts: hourOptions,  // 下拉選單項目-小時
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
    components: { OrganizeDialog },
    computed: {
        ...mapState ('organization', {
            dispatchID: state => state.chose.uid,
            dispatchName: state => state.chose.name,
        }),
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
        ...mapActions('organization', [
            'toggleShow',  // toggle dialog show
            'chChose',  // 改變所選的組職表員工資料
        ]),
        // 初始化資料
        async initData() {
            this.chLoadingShow()
            this.initFetchData()  // 判斷新增或編輯

            try {
                let codeRes = await fetchEqCodeLv1({ ClientReqTime: getNowFullTime() })  // 取得設備標示編號
                this.setEqCodeOption(codeRes.data.device_query, 'opt1')  // 初始化設備標示編號第一組檢修碼下拉選單
            } catch (err) {
                alert('設備報修資料取得失敗')
            }

            this.chLoadingShow()
        },
        // 判斷新增或編輯
        initFetchData() {
            this.ipt = { ...this.ipt, ...this.defaultIpt }  // 初始化表單

            if (this.$route.params.id != undefined) {
                // -------- 編輯時 -------
                this.isEdit = true
                this.chLoadingShow()

                // 向後端請求資料
                fetchWorkOrderOne({
                    WorkOrderID: this.$route.params.id,  // 工單編號
                    ClientReqTime: getNowFullTime()  // client 端請求時間
                }).then(res => {
                    let obj = res.data
                    // 檢查是否有權限編輯

                    // 設定資料
                    this.workNumber = obj.WorkOrderID  // 工單編號
                    this.creater = obj.Creator  // 立案人姓名
                    this.createrId = obj.CreatorID  // 立案人id
                    this.fixUnit = obj.CreatorDepart  // 請修單位
                    this.ipt.eqNumber1 = obj.MaintainCode_System  // 設備標示編號()
                    this.ipt.eqNumber2 = obj.MaintainCode_Loc  // 設備標示編號()
                    this.ipt.eqNumber22 = obj.MaintainCode_Loc2  // 設備標示編號()
                    this.ipt.eqNumber3 = obj.MaintainCode_Eqp  // 設備標示編號()
                    this.ipt.eqNumber32 = obj.MaintainCode_Eqp2  // 設備標示編號()
                    this.ipt.eqNumber4 = obj.MaintainCode_Seq  // 設備標示編號()
                    this.ipt.date = obj.CreateDTime  // 立案日期
                    this.ipt.malfunctionDes = obj.Malfunction  // 故障描述
                    this.ipt.fixType = obj.Type  // 維修類型
                    this.ipt.workDate = obj.DispatchDDay  // 維護日期
                    this.ipt.hour = obj.DispatchDHour  // 立即派工的小時
                    this.ipt.nowAction = (obj.CreateDTime == obj.DispatchDDay)? true: false  // 是否立即派工

                    // 將派工人資料寫入 vuex(組織表)
                    this.chChose({ uid: obj.DispatchID, name: obj.DispatchMan })
                }).catch(err => {
                    console.log(err)
                    alert('資料讀取失敗')
                }).finally(() => {
                    this.chLoadingShow()
                })
            } else {
                // 新增的情況
                this.canModifyEqCode = true  // 讓設備標示編號下拉選單能選擇
                this.creater = this.userData.UserName  // 立案人名稱
                this.fixUnit = this.userData.DeptList[0].DeptDesc  // 請修單位(之後api結構會改掉)
            }
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
            this.chLoadingShow()
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
            this.chLoadingShow()
        },
        // 送出表單
        save() {
            // if (this.$refs.form.validate()) {  // 表單驗證欄位
                this.chLoadingShow()

                // 派工日期
                let dispatcherDate = (this.ipt.nowAction)? new Date().toISOString().substr(0, 10) : this.ipt.workDate

                if (this.isEdit) {
                    // -------- 編輯時 -------
                    updateListOrder({
                        WorkerOrderID: this.workNumber,  // 工單編號
                        DispatchID: this.dispatchID,  // 派工人id (從 vuex 抓)
                        Type: this.ipt.fixType,  // 維修類型
                        DispatchDDay: dispatcherDate,  // 派工日期
                        DispatchDTime: this.ipt.hour,  // 派工時間 (小時)
                        MaintainCode_System: this.ipt.eqNumber1,  // 設備標示編號(系統)
                        MaintainCode_Loc: (this.ipt.eqNumber22 == '')? this.ipt.eqNumber2 : `${this.ipt.eqNumber2}_${this.ipt.eqNumber22}`,  // 設備標示編號(位置)
                        MaintainCode_Eqp: (this.ipt.eqNumber32 == '')? this.ipt.eqNumber3 : `${this.ipt.eqNumber3}_${this.ipt.eqNumber32}`,  // 設備標示編號(設備)
                        MaintainCode_Seq: this.ipt.eqNumber4,  // 設備標示編號(序號)
                        Malfunction: this.ipt.malfunctionDes,  // 故障描述
                        ClientReqTime: getNowFullTime()  // client 端請求時間
                    }).then(res => {
                        this.chDialog({ show: true, msg: '編輯成功' })
                    }).catch(err => {
                        this.chDialog({ show: true, msg: '伺服器發生問題，更新失敗' })
                    }).finally(() => {
                        this.chLoadingShow()
                    })
                } else {
                    // -------- 新增時 -------
                    createWorkOrder({
                        CreatorID: this.userData.UserId,  // 立案人id
                        CreateDTime: this.ipt.date,  // 立案日期
                        DispatchID: this.dispatchID,  // 派工人id (從 vuex 抓)
                        Type: this.ipt.fixType,  // 維修類型
                        DispatchDDay: dispatcherDate,  // 派工日期
                        DispatchDTime: this.ipt.hour,  // 派工時間 (小時)
                        MaintainCode_System: this.ipt.eqNumber1,  // 設備標示編號(系統)
                        MaintainCode_Loc: (this.ipt.eqNumber22 == '')? this.ipt.eqNumber2 : `${this.ipt.eqNumber2}_${this.ipt.eqNumber22}`,  // 設備標示編號(位置)
                        MaintainCode_Eqp: (this.ipt.eqNumber32 == '')? this.ipt.eqNumber3 : `${this.ipt.eqNumber3}_${this.ipt.eqNumber32}`,  // 設備標示編號(設備)
                        MaintainCode_Seq: this.ipt.eqNumber4,  // 設備標示編號(序號)
                        Malfunction: this.ipt.malfunctionDes,  // 故障描述
                        ClientReqTime: getNowFullTime()  // client 端請求時間
                    }).then(res => {
                        this.chDialog({ show: true, msg: '新增成功，工單編號為： ' + res.data.WorkOrderID })
                    }).catch(err => {
                        this.chDialog({ show: true, msg: '新增失敗，請重新操作' })
                    }).finally(() => {
                        this.chLoadingShow()
                        this.ipt = { ...this.ipt, ...this.defaultIpt }  // 初始化新增表單
                        this.$refs.form.resetValidation()  // 取消欄位驗證的紅字樣式
                    })
                }
            // } else {
                // 欄位驗證
                // let errArr = []

                // if (this.dispatchID == '') {
                //     this.ipt.errorDispatchID = 'red lighten-5'
                //     errArr.push('派工人')
                // } else {
                //     this.ipt.errorDispatchID = ''
                // }

                // if (this.ipt.eqNumber1 == '') {
                //     this.ipt.errorEqNumber1 = 'red lighten-5'
                //     errArr.push('設備標示編號1')
                // } else {
                //     this.ipt.errorEqNumber1 = ''
                // }

                // if (this.ipt.eqNumber2 == '') {
                //     this.ipt.errorEqNumber2 = 'red lighten-5'
                //     errArr.push('設備標示編號2')
                // } else {
                //     this.ipt.errorEqNumber2 = ''
                // }

                // if (this.ipt.eqNumber22 == '') {
                //     this.ipt.errorEqNumber22 = 'red lighten-5'
                //     errArr.push('設備標示編號22')
                // } else {
                //     this.ipt.errorEqNumber22 = ''
                // }

                // if (this.ipt.eqNumber3 == '') {
                //     this.ipt.errorEqNumber3 = 'red lighten-5'
                //     errArr.push('設備標示編號3')
                // } else {
                //     this.ipt.errorEqNumber3 = ''
                // }

                // if (this.ipt.eqNumber32 == '') {
                //     this.ipt.errorEqNumber32 = 'red lighten-5'
                //     errArr.push('設備標示編號3')
                // } else {
                //     this.ipt.errorEqNumber32 = ''
                // }

                // if (this.ipt.eqNumber4 == '') {
                //     this.ipt.errorEqNumber4 = 'red lighten-5'
                //     errArr.push('設備標示編號4')
                // } else {
                //     this.ipt.errorEqNumber4 = ''
                // }

                // if (this.ipt.malfunctionDes == '') {
                //     this.ipt.errorMalfunctionDes = 'red lighten-5'
                //     errArr.push('故障描述')
                // } else {
                //     this.ipt.errorMalfunctionDes = ''
                // }

                // alert('送出失敗，請確認「' + errArr.join('、') + '」欄位是否填寫，格式是否正確')
            // }
        },
        // 編輯設備標示編號 (編輯模式)
        editEqCode() {
            if (confirm('編輯設備標示編號會需要重新選擇，你確定嗎?')) {
                this.ipt.eqNumber1 = this.ipt.eqNumber2 = this.ipt.eqNumber22 = this.ipt.eqNumber3 = this.ipt.eqNumber32 = this.ipt.eqNumber4 = ''
                this.canModifyEqCode = true
            }
        },
    },
    created() {
        this.initData()
    }
}
</script>