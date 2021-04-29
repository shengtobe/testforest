<template>
<v-container style="max-width: 1200px">
    <!-- 組織表 -->
    <OrganizeDialog @setNowIpt="settingMenbers" />  

    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
        <h2 class="mb-4">工單編號：{{ id }}</h2>

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

        <v-row class="px-2 mt-5 mb-8">
            <!-- 外包廠商 -->
            <v-col cols="12">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-account</v-icon>外包廠商
                    <v-btn fab dark small color="indigo" class="ml-2 mb-1 btn-modify"
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
                        <v-card-title class="cyan px-4 py-1 white--text btn-modify">
                            新增外包廠商
                            <v-spacer></v-spacer>
                            <v-btn fab small text dark
                                @click="vendorDialog = !vendorDialog"
                                class="mr-n2"
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
                                            solo type="number"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card-text>
                        
                        <v-card-actions class="px-5 pb-5">
                            <v-spacer></v-spacer>
                            <v-btn class="mr-2 btn-clear" elevation="4" @click="vendorDialog = false">取消</v-btn>
                            <v-btn class="btn-add" color="success" elevation="4" @click="addVendor">送出</v-btn>
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
                <v-btn dark class="ma-2 btn-close"
                    @click="closeWindow"
                >關閉視窗</v-btn>

                <template v-if="!done">
                    <v-btn
                        :loading="isLoading"
                        color="success"
                        class="ma-2 btn-add"
                        @click="save"
                    >送出</v-btn>
                </template>
            </v-col>
        </v-row>
    </v-form>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import OrganizeDialog from '@/components/OrganizeDialog.vue'
import { getNowFullTime } from '@/assets/js/commonFun'
import { fetchWorkOrderOne, dispatchOrder } from '@/apis/workList/serve'

export default {
    props: ['id'],  //路由參數
    data: () => ({
        id: '',  // 工單編號
        done: false,  // 是否完成頁面操作
        valid: true,  // 表單是否驗證欄位
        isLoading: false,  // 是否讀取中
        ipt: {
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
            vendors: [],  // 外包廠商資料
        },
        acceptDateMenuShow: false,  // 預計驗收日曆是否顯示
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
    },
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
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
            console.log("money: ", this.money)
            return
            this.chLoadingShow()

            // 因為要檢查是否有權限編輯，向後端請求資料
            fetchWorkOrderOne({
                WorkOrderID: this.id,  // 工單編號
                ClientReqTime: getNowFullTime()  // client 端請求時間
            }).then(res => {
                // 檢查是否有權限編輯
                if (res.data.CreatorID != this.userData.UserId && res.data.CreatorID != this.userData.UserId) {
                    this.$router.push({ path: '/no-permission' })
                }

                this.id = res.data.WorkOrderID  // 工單編號
            }).catch(err => {
                alert('資料讀取失敗')
            }).finally(() => {
                this.chLoadingShow()
            })
        },
        save() {
            // if (this.$refs.form.validate()) {  // 表單驗證欄位
                if (confirm('你確定要送出嗎?')) {
                    this.chLoadingShow()
                    
                    dispatchOrder({
                        WorkOrderID: this.id,  // 工單編號
                        ExpectedDT: this.ipt.acceptanceTime,  // 預計驗收日期
                        AgentID: this.ipt.agent.id,  // 代理人id
                        WorkApplication: (this.ipt.enterControl)? 'T' : 'F',  // 進場管制申請
                        WorkSp: (this.ipt.specialDanger)? 'T' : 'F',  // 特殊危害作業
                        WorkSafety: (this.ipt.safeDanger)? 'T' : 'F',  // 安全危害作業
                        Malfunction: this.ipt.malfunctionDes,  // 故障描述
                        Memo: this.ipt.note,  // 備註
                        OutSourceCount: this.ipt.vendors.map(item => ({ VendorName: item.name, PeopleCount: item.count })),  // 外包廠商統計
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                    }).then(res => {
                        if (res.data.ErrorCode == 0) {
                            this.chMsgbar({ success: true, msg: '派工成功' })
                            this.done = true  // 隱藏頁面操作按鈕
                        } else {
                            sessionStorage.errData = JSON.stringify({ errCode: res.data.ErrorCode, msg: res.data.Msg })
                            this.$router.push({ path: '/error' })
                        }
                    }).catch(err => {
                        this.chMsgbar({ success: false, msg: '伺服器發生問題，派工失敗' })
                    }).finally(() => {
                        this.chLoadingShow()
                    })
                }
            // }
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
    },
    created() {
        this.initDate()  // 初始化資料
    }
}
</script>