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
                    <v-icon class="mr-1 mb-1">mdi-apps</v-icon>立案單位
                </h3>
                <v-text-field
                    v-model.trim="fixUnit"
                    solo
                    readonly
                ></v-text-field>
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
                    @click="toggleShow('kk')"
                    :background-color="errorIpt.dispatchID"
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

            <v-col cols="12" md="6">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>故障主旨
                </h3>
                <v-text-field
                    v-model.trim="ipt.subject"
                    solo
                    placeholder="請輸入故障主旨"
                ></v-text-field>
            </v-col>
        </v-row>

        <v-divider class="mx-2 mt-5 mb-8"></v-divider>

        <!-- 立案時間 -->
        <v-row class="px-2 mb-8">
            <v-col cols="12" md="4">
                <h3 class="mb-1">
                    選擇立單時間
                </h3>
                <v-radio-group v-model="ipt.createType" row class="mb-0">
                    <v-radio
                        label="立即派工" 
                        value="1" 
                        color="success"
                        class="mb-3"
                    ></v-radio>

                    <v-radio
                        label="定期保養/維修"
                        value="2"
                        color="blue"
                        class="mb-3"
                    ></v-radio>

                    <v-radio
                        label="補單"
                        value="3"
                        color="red"
                        class="mb-3"
                    ></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" sm="6" md="3"
                v-if="ipt.createType != '1'"
                class="mt-n8 mt-sm-0"
            >
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>日期
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
                            solo
                            v-model="ipt.date"
                            v-on="on"
                            readonly
                            hide-details
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

            <v-col cols="12" sm="6" md="3"
                    v-if="ipt.createType != '1'"
            >
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-clock</v-icon>時間
                </h3>
                <v-select
                    v-model="ipt.hour"
                    :items="hourOpts"
                    solo
                    hide-details
                ></v-select>
            </v-col>
        </v-row>
        
        <!-- 設備標示編號 -->
        <v-row class="px-2 mb-6" v-if="showEq">
            <v-col cols="12">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-codepen</v-icon>設備標示編號
                    <span class="red--text">*</span>
                </h3>

                <p class="pl-8 mb-0">
                    {{ combineCode }}

                    <!-- <v-btn
                        v-if="isEdit" v-show="false"
                        class="ml-3 mb-1"
                        color="primary"
                        @click="editEqCode"
                    >編輯</v-btn> -->
                </p>
                
            </v-col>
          <!-- <EquipRepairCode :key="componentKey" :toLv="2" :nowEqCode="ipt.wbs" @getEqCode="getTempCode" @getEqName="getTempName"/>RST-8304-COP-02 -->
          <EquipRepairCode :key="0" :toLv="4" :nowEqCode="nowEqCode" @getEqCode="getTempCode" @getEqCh="getTempCh"/>

            <v-col cols="12" class="mt-n4">
                <!-- <v-row>
                    <v-col cols="12" md="1" align-self="center">
                        <h3 class="ml-md-6">系統</h3>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-select solo hide-details
                            v-model="ipt.eqNumber1"
                            :items="eqCodes.opt1"
                            :background-color="errorIpt.eqNumber1"
                            :rules="[v => (!!v && /[^\s]/.test(v)) || '請選擇項目']"
                            :disabled="!canModifyEqCode"
                        ></v-select>
                    </v-col>
                </v-row> -->
            </v-col>

            <v-col cols="12">
                <!-- <v-row>
                    <v-col cols="12" md="1" align-self="center">
                        <h3 class="ml-md-6">位置</h3>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-select solo hide-details
                            v-model="ipt.eqNumber2"
                            :items="eqCodes.opt2"
                            :background-color="errorIpt.eqNumber2"
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
                </v-row> -->
            </v-col>

            <v-col cols="12">
                <!-- <v-row>
                    <v-col cols="12" md="1" align-self="center">
                        <h3 class="ml-md-6">設備</h3>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-select solo hide-details
                            v-model="ipt.eqNumber3"
                            :items="eqCodes.opt3"
                            :background-color="errorIpt.eqNumber3"
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
                </v-row> -->
            </v-col>

            <v-col cols="12">
                <!-- <v-row>
                    <v-col cols="12" md="1" align-self="center">
                        <h3 class="ml-md-6">序號</h3>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-select solo hide-details
                            v-model="ipt.eqNumber4"
                            :items="eqCodes.opt4"
                            :background-color="errorIpt.eqNumber4"
                            :rules="[v => (!!v && /[^\s]/.test(v)) || '請選擇項目']"
                        ></v-select>
                    </v-col>
                </v-row> -->
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
                    :background-color="errorIpt.malfunctionDes"
                    :rules="[v => (!!v && /[^\s]/.test(v)) || '此欄位不可空白']"
                ></v-textarea>
            </v-col>

            <v-col cols="12" class="text-center">
                <v-btn dark class="mr-4 btn-close"
                    @click="closeWindow"
                    v-if="isEdit"
                >關閉視窗</v-btn>

                <v-btn dark class="mr-4 btn-close"
                    v-else
                    to="/worklist/maintain"
                >回搜尋頁</v-btn>

                <v-btn
                    class="btn-add white--text"
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
import EquipRepairCode from '@/components/EquipRepairCode'
import { getNowFullTime, verifyIptError } from '@/assets/js/commonFun'
import { hourOptions } from '@/assets/js/dateTimeOption'
import { createWorkOrder, fetchEqCodeLv1, fetchEqCodeLv2, fetchEqCodeLv3, fetchEqCodeLv4, fetchWorkOrderOne, updateListOrder, fetchLicenseManData } from '@/apis/workList/maintain'

export default {
    props: ['id'],  //路由參數
    data: () => ({
        valid: true,  // 表單是否驗證欄位
        combineCode: '', //合併後的設備編碼
        combineCh: '', //合併後的設備中文名稱
        nowEqCode: '', //編輯時 預設帶入的combineCode
        isEdit: false,  // 是否為編輯
        showEq: false,
        workNumber: '',  // 工單編號
        creater: '',  // 立案人名稱
        createrId: 'K10744389',  // 立案人員工編號
        fixUnit: '',  // 立案單位
        ipt: {  // 輸入的內容)
            eqNumber1: '',  // 設備標示編號1
            eqNumber2: '',  // 設備標示編號2
            eqNumber22: '',  // 設備標示編號2-2
            eqNumber3: '',  // 設備標示編號3
            eqNumber32: '',  // 設備標示編號3-2
            eqNumber4: '',  // 設備標示編號4
        },  
        defaultIpt: {  // 預設內容
            subject: '',  // 故障主旨
            malfunctionDes: '',  // 故障描述
            fixType: '1',  // 維修類型
            createType: '1',  // 立案類型
            date: new Date().toISOString().substr(0, 10),  // 立案日期
            hour: (new Date().getHours() < 10)? '0'+ new Date().getHours().toString() : new Date().getHours().toString(),  // 立案的小時
        },
        errorIpt: {  // 必填欄位背景色
            dispatchID: '', // 派工人
            eqNumber1: '',  // 設備標示編號1
            eqNumber2: '',  // 設備標示編號2
            eqNumber3: '',  // 設備標示編號3
            eqNumber4: '',  // 設備標示編號4
            malfunctionDes: '',  // 故障描述
        },
        dateMenuShow: false,  // 日期選單是否顯示
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
    components: { OrganizeDialog, EquipRepairCode },
    computed: {
        ...mapState ('organization', {  // 組織表資料
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
        //抓取未確認的設備標示編碼
        getTempCode(value) {
            this.combineCode = value
        },
        getTempCh(value) {
            this.combineCh = value
        },
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
            console.log("判斷新增或編輯 id = ", this.id);
            this.ipt = { ...this.ipt, ...this.defaultIpt }  // 初始化表單

            if (this.id != undefined) {
                // -------- 編輯時 -------
                this.isEdit = true

                // 向後端請求資料
                console.log("ready to 向後端請求資料");
                this.fetchOrderOne()
                // 向後端請求證照人員資料
                // this.fetchLicenseMan()
            } else {
                // 新增的情況
                this.canModifyEqCode = this.showEq = true  // 讓設備標示編號下拉選單能選擇
                this.creater = this.userData.UserName  // 立案人名稱
                this.fixUnit = this.userData.DeptList[0].DeptDesc  // 立案單位(之後api結構會改掉)
            }
        },
        // 向後端請求資料
        fetchOrderOne() {
            console.log("向後端請求資料");
            this.chLoadingShow()

            fetchWorkOrderOne({
                WorkOrderID: this.id,  // 工單編號
                ClientReqTime: getNowFullTime()  // client 端請求時間
            }).then(res => {
                let obj = res.data
                console.log("維護工單第一個編輯 obj: ", obj)
                // 檢查是否有權限編輯 (僅立案人、派工人可編輯)
                if (obj.CreatorID != this.userData.UserId && obj.DispatchID != this.userData.UserId) {
                    this.$router.push({ path: '/no-permission' })
                }

                // 設定資料
                this.workNumber = obj.WorkOrderID  // 工單編號
                this.creater = obj.Creator  // 立案人姓名
                this.createrId = obj.CreatorID  // 立案人id
                this.fixUnit = obj.CreatorDepart  // 立案單位
                // this.ipt.eqNumber1 = obj.MaintainCode_System  // 設備標示編號(系統)
                // this.ipt.eqNumber2 = obj.MaintainCode_Loc  // 設備標示編號(位置)
                // this.ipt.eqNumber22 = obj.MaintainCode_Loc2  // 設備標示編號(位置)2
                // this.ipt.eqNumber3 = obj.MaintainCode_Eqp  // 設備標示編號(設備)
                // this.ipt.eqNumber32 = obj.MaintainCode_Eqp2  // 設備標示編號(設備)2
                // this.ipt.eqNumber4 = obj.MaintainCode_Seq  // 設備標示編號(序號)
                this.nowEqCode = obj.MaintainCode
                this.ipt.malfunctionDes = obj.Malfunction  // 故障描述
                this.ipt.createType = obj.CreateType  // 立案類型
                this.ipt.date = obj.CreateDDay  // 立案日期
                this.ipt.hour = obj.CreateDTime  // 立即派工的小時
                this.ipt.subject = obj.WorkSubject  // 故障主旨
                this.showEq = true

                // 將派工人資料寫入 vuex(組織表)
                this.chChose({ uid: obj.DispatchID, name: obj.DispatchMan })
            }).catch(err => {
                console.log(err)
                alert('資料讀取失敗')
            }).finally(() => {
                this.chLoadingShow()
            })
        },
        // 向後端請求證照人員資料
        // fetchOrderOne() {
        //     this.chLoadingShow()

        //     fetchLicenseManData({
        //         ClientReqTime: getNowFullTime()  // client 端請求時間
        //     }).then(res => {
        //         let obj = res.data
        //         console.log("obj: ", obj)
                
        //     }).catch(err => {
        //         console.log(err)
        //         alert('資料讀取失敗')
        //     }).finally(() => {
        //         this.chLoadingShow()
        //     })
        // },
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
            if (this.$refs.form.validate()) {  // 表單驗證欄位
                this.chLoadingShow()
                let tempCodeArr = this.combineCode.split('-')
                console.log("tempCodeArr: ", tempCodeArr)
                if (this.isEdit) {
                    // -------- 編輯時 -------
                    updateListOrder({
                        WorkOrderID: this.workNumber,  // 工單編號
                        WorkSubject: this.ipt.subject,  // 故障主旨
                        DispatchID: this.dispatchID,  // 派工人id (從 vuex 抓)
                        Type: this.ipt.fixType,  // 維修類型
                        CreateType: this.ipt.createType,  // 立案類型
                        CreateDDay: this.ipt.date,  // 立案日期
                        CreateDTime: this.ipt.hour,  // 立案時間 (小時)
                        MaintainCode_System: tempCodeArr[0],  // 設備標示編號(系統)
                        MaintainCode_Loc: tempCodeArr[1],  // 設備標示編號(位置)
                        MaintainCode_Eqp: tempCodeArr[2],  // 設備標示編號(設備)
                        MaintainCode_Seq: tempCodeArr[3],  // 設備標示編號(序號)
                        Malfunction: this.ipt.malfunctionDes,  // 故障描述
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                        MaintainCode_AllName: this.combineCh,
                    }).then(res => {
                        if (res.data.ErrorCode == 0) {
                            this.chMsgbar({ success: true, msg: '編輯成功' })
                            console.log("送出編輯");
                            // 為避免使用者選立即派工，導致input的不會同步改變，所以重新向後端請求資料
                            this.fetchOrderOne()
                        } else {
                            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                            this.$router.push({ path: '/error' })
                        }
                    }).catch(err => {
                        this.chDialog({ show: true, msg: '伺服器發生問題，更新失敗' })
                    }).finally(() => {
                        this.chLoadingShow()
                    })
                } else {
                    // -------- 新增時 -------
                    createWorkOrder({
                        WorkSubject: this.ipt.subject,  // 故障主旨
                        CreatorID: this.userData.UserId,  // 立案人id
                        DispatchID: this.dispatchID,  // 派工人id (從 vuex 抓)
                        Type: this.ipt.fixType,  // 維修類型
                        CreateType: this.ipt.createType,  // 立案類型
                        CreateDDay: this.ipt.date,  // 立案日期
                        CreateDTime: this.ipt.hour,  // 立案時間 (小時)
                        MaintainCode_System: tempCodeArr[0],  // 設備標示編號(系統)
                        MaintainCode_Loc: tempCodeArr[1],  // 設備標示編號(位置)
                        MaintainCode_Eqp: tempCodeArr[2],  // 設備標示編號(設備)
                        MaintainCode_Seq: tempCodeArr[3],  // 設備標示編號(序號)
                        Malfunction: this.ipt.malfunctionDes,  // 故障描述
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                        MaintainCode_AllName: this.combineCh,
                    }).then(res => {
                        if (res.data.ErrorCode == 0) {
                            console.log("新增工單 res.data: ", res.data);
                            this.chDialog({ show: true, msg: '新增成功，工單編號為： ' + res.data.WorkOrderID })
                            this.clearErrIpt()
                            this.ipt = { ...this.ipt, ...this.defaultIpt }  // 初始化表單
                        } else {
                            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                            this.$router.push({ path: '/error' })
                        }
                    }).catch(err => {
                        this.chDialog({ show: true, msg: '伺服器發生問題，新增失敗' })
                    }).finally(() => {
                        this.chLoadingShow()
                        this.$refs.form.resetValidation()  // 取消欄位驗證的紅字樣式
                    })
                }
            } else {
                // 欄位驗證
                verifyIptError([
                    { label: '派工人', target: this.dispatchID, errTarget: 'dispatchID' },
                    { label: '設備標示編號(系統)', target: this.ipt.eqNumber1, errTarget: 'eqNumber1' },
                    { label: '設備標示編號(位置)', target: this.ipt.eqNumber2, errTarget: 'eqNumber2' },
                    { label: '設備標示編號(設備)', target: this.ipt.eqNumber3, errTarget: 'eqNumber3' },
                    { label: '設備標示編號(序號)', target: this.ipt.eqNumber4, errTarget: 'eqNumber4' },
                    { label: '故障描述', target: this.ipt.malfunctionDes, errTarget: 'malfunctionDes' },
                ], this)
            }
        },
        // 編輯
        // editEqCode() {
        //     if (confirm('編輯設備標示編號會需要重新選擇，你確定嗎?')) {
        //         this.ipt.eqNumber1 = this.ipt.eqNumber2 = this.ipt.eqNumber22 = this.ipt.eqNumber3 = this.ipt.eqNumber32 = this.ipt.eqNumber4 = ''
        //         this.canModifyEqCode = true
        //     }
        // },
        // 清空必填欄位背景色
        clearErrIpt() {
            this.errorIpt.dispatchID = ''
            this.errorIpt.eqNumber1 = ''
            this.errorIpt.eqNumber2 = ''
            this.errorIpt.eqNumber3 = ''
            this.errorIpt.eqNumber4 = ''
            this.errorIpt.malfunctionDes = ''
        }
    },
    created() {
        this.initData()
    }
}
</script>