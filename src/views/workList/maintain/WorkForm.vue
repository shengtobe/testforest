<template>
<v-container style="max-width: 1200px">
    <!-- 組織表 -->
    <OrganizeDialog @setNowIpt="settingMenbers" />  

    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
        <h2 class="mb-4">工單編號：{{ ipt.workNumber }}</h2>

        <!-- 基本資訊 -->
        <v-row class="px-2">
            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>預計驗收日期
                </h3>
                <v-menu
                    v-model="acceptDateMenuShow"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model.trim="ipt.acceptanceTime"
                            solo
                            readonly
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        color="purple"
                        v-model="ipt.acceptanceTime"
                        @input="acceptDateMenuShow = false"
                        locale="zh-tw"
                    ></v-date-picker>
                </v-menu>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-account</v-icon>代理人
                </h3>
                <v-text-field
                    :value="ipt.agent.name"
                    solo
                    readonly
                    @click="chooseMembers('agent')"
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>工作地點
                </h3>
                <v-text-field
                    v-model.trim="ipt.workLocation"
                    solo
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>實際人數
                </h3>
                <v-text-field
                    v-model.trim.number="ipt.memberCount"
                    solo
                ></v-text-field>
            </v-col>
        </v-row>

        <v-sheet class="white mx-2 px-4" elevation="2">
            <v-row no-gutters>
                <v-col cols="12" sm="6" md="3" class="px-2">
                    <v-switch
                        class="pl-1"
                        color="green"
                        v-model="ipt.enterControl"
                        :label="`進場管制申請： ${(ipt.enterControl)? '是' : '否'}`"
                    ></v-switch>
                </v-col>

                <v-col cols="12" sm="6" md="3" class="px-2">
                    <v-switch
                        class="pl-1"
                        color="green"
                        v-model="ipt.specialDanger"
                        :label="`特殊危害作業： ${(ipt.specialDanger)? '是' : '否'}`"
                    ></v-switch>
                </v-col>

                <v-col cols="12" sm="6" md="3" class="px-2">
                    <v-switch
                        class="pl-1"
                        color="green"
                        v-model="ipt.safeDanger"
                        :label="`安全危害作業： ${(ipt.safeDanger)? '是' : '否'}`"
                    ></v-switch>
                </v-col>
            </v-row>
        </v-sheet>
        
        <v-row class="px-2 mt-8"> 
            <v-col cols="12">
                <h3 class="mb-2">
                    <v-icon class="mr-1 mb-1">mdi-pen</v-icon>故障描述
                </h3>
                <v-textarea
                    auto-grow
                    solo
                    rows="6"
                    placeholder="請輸入故障描述"
                    v-model.trim="ipt.malfunctionDes"
                ></v-textarea>
            </v-col>
        </v-row>

        <!-- 林鐵人員 -->
        <v-row class="px-2">
            <v-col cols="12" md="7">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-account-star</v-icon>需證照人員
                </h3>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-select
                            v-model="hasLicenLv1Select"
                            :items="hasLicenseOptLv1"
                            solo
                        ></v-select>
                    </v-col>

                    <v-col cols="10" sm="4">
                        <v-select
                            v-model="hasLicenLv2Select"
                            :items="hasLicenseOptLv2"
                            solo
                        ></v-select>
                    </v-col>

                    <v-col cols="2">
                        <v-btn fab dark small color="indigo"
                            @click="addMember(hasLicenLv2Select, true)"
                        >
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12" md="5">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-account</v-icon>作業人員
                </h3>
                <v-row>
                    <v-col cols="10" sm="4" md="6">
                        <v-text-field
                            :value="ipt.commonNowIpt.name"
                            solo
                            readonly
                            @click="chooseMembers('commonNowIpt')"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="2">
                        <v-btn fab dark small color="indigo"
                            @click="addMember(ipt.commonNowIpt.name, false)"
                        >
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12">
                <h3 class="mb-1 mt-n3">
                    <v-icon class="mr-1 mb-1">mdi-account</v-icon>林鐵人員統計
                </h3>

                <!-- 有證照 -->
                <v-chip
                    v-for="(item, idx) in ipt.licensedArr"
                    :key="item"
                    class="mr-3 mt-2"
                    label
                    color="green dark-2"
                    dark
                    large
                >
                    {{ item }}
                    <v-icon right
                        @click="rmlicense(idx)"
                    >mdi-close-circle</v-icon>
                </v-chip>
                
                <!-- 無證照 -->
                <v-chip
                    v-for="(item, idx) in ipt.commonMemArr"
                    :key="item"
                    class="mr-3 mt-2"
                    label
                    dark
                    large
                >
                    {{ item }}
                    <v-icon right
                        @click="rmCommon(idx)"
                    >mdi-close-circle</v-icon>
                </v-chip>
            </v-col>
        </v-row>

        <v-row class="px-2 mt-5 mb-8">
            <!-- 外包廠商 -->
            <v-col cols="12">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-account</v-icon>外包廠商
                    <v-btn fab dark x-small color="indigo" class="mt-n2 ml-2"
                        @click="vendorDialog = true"
                    >
                        <v-icon dark>mdi-plus</v-icon>
                    </v-btn>
                </h3>

                <v-chip
                    v-for="(item, idx) in ipt.vendors"
                    :key="item.name"
                    class="mr-3 mt-2"
                    label
                    color="teal"
                    dark
                    large
                >
                    {{ `${item.name} - ${ item.count }人` }} 
                    <v-icon right
                        @click="deleteVendor(idx)"
                    >mdi-close-circle</v-icon>
                </v-chip>

                <!-- 外包廠商 dialog -->
                <v-dialog v-model="vendorDialog" max-width="500px">
                    <v-card>
                        <v-card-title class="cyan px-4 py-1 white--text">
                            新增外包廠商
                            <v-spacer></v-spacer>
                            <v-btn fab small text
                                @click="vendorDialog = !vendorDialog"
                                class="mr-n2 white--text"
                            >
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-card-title>

                        <v-card-text class="px-6 py-4">
                            <v-form>
                                <v-row>
                                    <v-col cols="12" sm="7">
                                        <h3 class="mb-1">
                                            <v-icon class="mr-1 mb-1">mdi-clipboard-text</v-icon>廠商名稱
                                        </h3>
                                        <v-text-field
                                            v-model.trim="vendorForm.name"
                                            solo
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="5">
                                        <h3 class="mb-1">
                                            <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>人數
                                        </h3>
                                        <v-text-field
                                            v-model.trim.number="vendorForm.count"
                                            solo
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card-text>
                        
                        <v-card-actions class="px-5 pb-5">
                            <v-spacer></v-spacer>
                            <v-btn class="mr-2" elevation="4" @click="vendorDialog = false">取消</v-btn>
                            <v-btn color="success" elevation="4" @click="addVendor">送出</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>

            <v-col cols="12">
                <h3 class="mb-2 mt-5">
                    <v-icon class="mr-1 mb-1">mdi-note</v-icon>備註
                </h3>

                <v-textarea
                    auto-grow
                    solo
                    rows="6"
                    placeholder="請輸入備註"
                    v-model.trim="ipt.note"
                ></v-textarea>
            </v-col>

            <v-col cols="12" class="text-center">
                <v-btn dark class="ma-2"
                    @click="closeWindow"
                >關閉視窗</v-btn>

                <template v-if="!done">
                    <v-btn
                        :loading="isLoading"
                        dark
                        color="error"
                        class="mr-4"
                        @click="dialog = true"
                    >退回</v-btn>

                    <v-btn
                        :loading="isLoading"
                        color="success"
                        @click="save"
                    >送出</v-btn>
                </template>
            </v-col>
        </v-row>

        <!-- 退回 dialog -->
        <v-dialog v-model="dialog" max-width="600px">
            <v-card>
                <v-toolbar dark flat dense color="error" class="mb-2">
                    <v-toolbar-title>退回原因</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn fab small text @click="dialog = !dialog" class="mr-n2">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>

                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-textarea
                                hide-details
                                auto-grow
                                solo
                                rows="8"
                                placeholder="請輸入原因"
                                v-model.trim="reason"
                            ></v-textarea>
                        </v-col>
                    </v-row>
                </v-card-text>
                
                <v-card-actions class="px-5 pb-5">
                    <v-spacer></v-spacer>
                    <v-btn class="mr-2" elevation="4" :loading="isLoading" @click="dialog = false">取消</v-btn>
                    <v-btn color="success"  elevation="4" :loading="isLoading" @click="withdraw">送出</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-form>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import OrganizeDialog from '@/components/OrganizeDialog.vue'
import { getNowFullTime } from '@/assets/js/commonFun'
import { fetchWorkOrderOne, dispatchOrder } from '@/apis/workList/maintain'

// 需證照人員名單
let hasLicense = {
    '固定式起重機': ['陳高文', '劉明凱'],
    '一般手工電焊': ['安東旭']
}

export default {
    data: () => ({
        done: false,  // 是否完成頁面操作
        valid: true,  // 表單是否驗證欄位
        isLoading: false,  // 是否讀取中
        ipt: {
            workNumber: '',  // 工單編號
            workLocation: '',  // 工作地點
            memberCount: '',  // 實際人數
            acceptanceTime: new Date().toISOString().substr(0, 10),  // 預計驗收日期
            agent: {  // 代理人
                id: '',
                name: '',
            },
            enterControl: false,  // 進場管制申請
            specialDanger: false,  // 特殊危害作業
            safeDanger: false,  // 安全危害作業
            malfunctionDes: '',  // 故障描述
            note: '',  // 備註
            licensedArr: [],  // 需證照人員 (顯示用)
            commonMemArr: [],  // 作業人員 (顯示用)
            commonNowIpt: {  // 作業人員欄位(暫存目前所選作業人員)
                id: '',
                name: '',
            },
            licensedMembers: [],  // 需證照人員 (後端上傳用)
            commonMembers: [],  // 作業人員 (後端上傳用)
            vendors: [],  // 外包廠商資料
        },
        agentOpts: ['王小明', '陳小華', '黃小美'],  // 代理人選項
        acceptDateMenuShow: false,  // 預計驗收日曆是否顯示
        hasLicenLv1Select: '',  // 有證照所選擇的opt--科室
        hasLicenLv2Select: '',  // 有證照所選擇的opt--人員清單
        dialog: false,  // dialog 是否顯示
        reason: '',  // 退回原因
        vendorDialog: false,  // 外包廠商 dialog 是否顯示
        vendorForm: {},
        defaultVendorForm: {  // 外包廠商 dialog 的表單預設值
            name: '',
            count: 0,
        },
    }),
    components: { OrganizeDialog },
    computed: {
        ...mapState ('organization', {  // 組織表資料
            memberID: state => state.chose.uid,
            memberName: state => state.chose.name,
            nowIptName: state => state.nowIptName,  // 目前欄位名稱
        }),
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
        // 設備報修
        eqNumbers() {
            return `${this.ipt.eqNumber1}-${this.ipt.eqNumber2}-${this.ipt.eqNumber3}-${this.ipt.eqNumber4}`
        },
        // 有證照option -- 科室
        hasLicenseOptLv1: () => Object.keys(hasLicense),
        // 有證照option -- 人員清單
        hasLicenseOptLv2() {
            return (hasLicense[this.hasLicenLv1Select])
        },
    },
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        },
        // 更換科室時，自動選該科室人員清單的第一人
        hasLicenLv1Select: function (newVal, oldVal) {
            if (newVal != oldVal) {
                this.hasLicenLv2Select = this.hasLicenseOptLv2[0]
            }
        },
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'closeWindow',  // 關閉視窗
        ]),
        ...mapActions('organization', [
            'toggleShow',  // toggle dialog show
            'chChose',  // 改變所選的組職表員工資料
            'chIptName',  // 改變目前欄位
        ]),
        // 初始化資料
        initDate() {
            this.chLoadingShow()

            // 向後端請求資料
            fetchWorkOrderOne({
                WorkOrderID: this.$route.params.id,  // 工單編號
                ClientReqTime: getNowFullTime()  // client 端請求時間
            }).then(res => {
                // 檢查是否有權限編輯

                this.ipt.workNumber = res.data.WorkOrderID  // 工單編號

                // 初始化林鐵人員下拉選項預設值
                this.initMemberSelect()

                // 初始化外包人員的表單
                this.vendorForm = Object.assign({}, this.defaultVendorForm)
            }).catch(err => {
                console.log(err)
                alert('資料讀取失敗')
            }).finally(() => {
                this.chLoadingShow()
            })
        },
        // 選擇代理人、作業人員 (組識表組件用)
        chooseMembers(iptName) {
            this.chIptName(iptName)
            this.toggleShow()
        },
        // 設定代理人 (組識表組件用)
        settingMenbers() {
            this.ipt[this.nowIptName].id = this.memberID
            this.ipt[this.nowIptName].name = this.memberName
        },
        // 初始化林鐵人員下拉選項預設值
        initMemberSelect() {
            this.hasLicenLv1Select = Object.keys(hasLicense)[0]  // 需證照人員
        },
        // 增加林鐵參與人員(第二參數為是否有證照)
        addMember(name, bool) {
            if(name == '' || name == null) return

            if (bool && !this.ipt.licensedArr.includes(name)) {
                // 有證照且未被加入
                this.ipt.licensedArr.push(name)
            } else if (!bool && !this.ipt.commonMemArr.includes(name)) {
                // 無證照且未被加入
                this.ipt.commonMemArr.push(this.ipt.commonNowIpt.name)
                this.ipt.commonMembers.push({ PeopleId: this.ipt.commonNowIpt.id })  // 後端上傳用
            }
        },
        save() {
            if (this.$refs.form.validate()) {  // 表單驗證欄位
                if (confirm('你確定要送出嗎?')) {
                    this.chLoadingShow()
                    
                    dispatchOrder({
                        WorkOrderID: this.ipt.workNumber,  // 工單編號
                        ExpectedDT: this.ipt.acceptanceTime,  // 預計驗收日期
                        AgentID: this.ipt.agent.id,  // 代理人id
                        WorkPlace: this.ipt.workLocation,  // 工作地點
                        RealWorkerCount: this.ipt.memberCount,  // 實際人數
                        WorkApplication: (this.ipt.enterControl)? 'T' : 'F',  // 進場管制申請
                        WorkSp: (this.ipt.specialDanger)? 'T' : 'F',  // 特殊危害作業
                        WorkSafety: (this.ipt.safeDanger)? 'T' : 'F',  // 安全危害作業
                        Malfunction: this.ipt.malfunctionDes,  // 故障描述
                        Memo: this.ipt.note,  // 備註
                        PeopleLicense: this.ipt.licensedMembers.map(item => ({ PeopleId: item })),  // 林鐵人員統計(有證照), 目前測試先用map做回傳格式
                        PeopleNoLicense: this.ipt.commonMembers,  // 林鐵人員統計(無證照)
                        OutSourceCount: this.ipt.vendors.map(item => ({ VendorName: item.name, PeopleCount: item.count })),  // 外包廠商統計
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                    }).then(res => {
                        this.chMsgbar({ success: true, msg: '派工成功' })
                    }).catch(err => {
                        this.chMsgbar({ success: false, msg: '伺服器發生問題，派工失敗' })
                    }).finally(() => {
                        this.done = true  // 隱藏頁面操作按鈕
                        this.chLoadingShow()
                        this.$refs.form.resetValidation()  // 取消欄位驗證的紅字樣式
                    })
                }
            }
        },
        // 退回
        withdraw() {
            this.isLoading = true
                
            // 範例效果
            setTimeout(() => {
                // 退回完後，轉頁到搜尋頁
                this.chMsgbar({ success: true, msg: '退回成功' })
                this.$router.push({ path: '/worklist/maintain' })
            }, 1000)
        },
        // 刪除林鐵需證照人員
        rmlicense(idx) {
            this.ipt.licensedArr.splice(idx, 1)
        },
        // 刪除林鐵作業人員
        rmCommon(idx) {
            this.ipt.commonMemArr.splice(idx, 1)  // 顯示用
            this.ipt.commonMembers.splice(idx, 1)  // 後端上傳用
        },
        // 增加外包廠商
        addVendor() {
            if (!this.ipt.vendors.includes(this.vendorForm)) {
                this.ipt.vendors.push(this.vendorForm)

                this.vendorForm = Object.assign({}, this.defaultVendorForm)
                this.vendorDialog = false
            }
        },
        // 刪除外包廠商
        deleteVendor(item) {
            let idx = this.ipt.vendors.indexOf(item)  // 取得該筆資料索引值
            this.ipt.vendors.splice(idx, 1)
        },
    },
    created() {
        this.initDate()  // 初始化資料
    }
}
</script>