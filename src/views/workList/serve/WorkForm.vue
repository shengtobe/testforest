<template>
<v-container style="max-width: 1200px">
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
        <h2 class="mb-4">工單編號：{{ routeId }}</h2>

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
                <v-select
                    v-model="ipt.agent"
                    :items="agentOpts"
                    solo
                ></v-select>
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
                    <v-btn fab dark small color="indigo" class="ml-2 mb-1"
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
                <v-btn
                    :loading="isLoading"
                    dark
                    class="ma-2"
                    to="/worklist/serve"
                >回搜尋頁</v-btn>

                <v-btn
                    :loading="isLoading"
                    dark
                    color="error"
                    class="ma-2"
                    @click="dialog = true"
                >退回</v-btn>

                <v-btn
                    :loading="isLoading"
                    color="success"
                    class="ma-2"
                    @click="save"
                >送出</v-btn>
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
import { mapActions } from 'vuex'

export default {
    data: () => ({
        routeId: '',  // 工單編號
        valid: true,  // 表單是否驗證欄位
        isLoading: false,  // 是否讀取中
        ipt: {
            acceptanceTime: new Date().toISOString().substr(0, 10),  // 預計驗收日期
            agent: '王小明',  // 代理人
            enterControl: false,  // 進場管制申請
            specialDanger: false,  // 特殊危害作業
            safeDanger: false,  // 安全危害作業
            malfunctionDes: '',  // 故障描述
            note: '',  // 備註
            vendors: [],  // 外包廠商資料
        },
        agentOpts: ['王小明', '陳小華', '黃小美'],  // 代理人下拉選單
        acceptDateMenuShow: false,  // 預計驗收日曆是否顯示
        dialog: false,  // dialog 是否顯示
        reason: '',  // 退回原因
        vendorDialog: false,  // 外包廠商 dialog 是否顯示
        vendorForm: {},
        defaultVendorForm: {  // 外包廠商 dialog 的表單預設值
            name: '',
            count: 0,
        },
    }),
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
        ]),
        // 初始化資料
        initDate() {
            // 向後端請求資料
            this.chLoadingShow()
            this.routeId = this.$route.params.id  // 路由參數

            // 檢查是否有派工權限

            // 範例效果
            setTimeout(() => {
                // 初始化外包人員的表單
                this.vendorForm = Object.assign({}, this.defaultVendorForm)
                
                this.chLoadingShow()
            }, 1000)
        },
        save() {
            if (this.$refs.form.validate()) {  // 表單驗證欄位
                this.isLoading = true
                
                // 範例效果
                setTimeout(() => {
                    this.isLoading = false
                    this.chMsgbar({ success: true, msg: '派工成功' })
                    this.$router.push({ path: '/worklist/serve' })
                }, 1000)
            }
        },
        // 退回
        withdraw() {
            this.isLoading = true
                
            // 範例效果
            setTimeout(() => {
                // 退回完後，轉頁到搜尋頁
                this.chMsgbar({ success: true, msg: '退回成功' })
                this.$router.push({ path: '/worklist/serve' })
            }, 1000)
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