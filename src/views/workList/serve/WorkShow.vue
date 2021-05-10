<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">工單編號：{{ id }}</h2>
    
    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8">
        <BottomTable :items="bottomItems" />

        <!-- 請修項目 -->
        <ShowTable :tableItems="tableItems" />

        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-row class="mt-8">
                <v-col cols="12" sm="6">
                    <v-row>
                        <v-col cols="12" class="mb-n4">
                            <h3>
                                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>到修日期
                            </h3>
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-menu
                                v-model="dateMenuShow.arrivalFix"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model.trim="ipt.arrivalFixDate"
                                        solo
                                        v-on="on"
                                        readonly
                                        hide-details
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    color="purple"
                                    v-model="ipt.arrivalFixDate"
                                    @input="dateMenuShow.arrivalFix = false"
                                    locale="zh-tw"
                                ></v-date-picker>
                            </v-menu>
                        </v-col>

                        <v-col cols="6" md="4">
                            <v-select
                                v-model="ipt.arrivalFixHour"
                                :items="hourOpts"
                                solo
                                hide-details
                            ></v-select>
                        </v-col>

                        <v-col cols="6" md="4">
                            <v-select
                                v-model="ipt.arrivalFixMin"
                                :items="minOpts"
                                solo
                                hide-details
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-row>
                        <v-col cols="12" class="mb-n4">
                            <h3>
                                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>動工日期
                            </h3>
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-menu
                                v-model="dateMenuShow.startFix"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model.trim="ipt.startFixDate"
                                        solo
                                        v-on="on"
                                        readonly
                                        hide-details
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    color="purple"
                                    v-model="ipt.startFixDate"
                                    @input="dateMenuShow.startFix = false"
                                    locale="zh-tw"
                                ></v-date-picker>
                            </v-menu>
                        </v-col>

                        <v-col cols="6" md="4">
                            <v-select
                                v-model="ipt.startFixHour"
                                :items="hourOpts"
                                solo
                                hide-details
                            ></v-select>
                        </v-col>

                        <v-col cols="6" md="4">
                            <v-select
                                v-model="ipt.startFixMin"
                                :items="minOpts"
                                solo
                                hide-details
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-row>
                        <v-col cols="12" class="mb-n4">
                            <h3>
                                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>完工日期
                            </h3>
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-menu
                                v-model="dateMenuShow.endFix"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model.trim="ipt.endFixDate"
                                        solo
                                        v-on="on"
                                        readonly
                                        hide-details
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    color="purple"
                                    v-model="ipt.endFixDate"
                                    @input="dateMenuShow.endFix = false"
                                    locale="zh-tw"
                                ></v-date-picker>
                            </v-menu>
                        </v-col>

                        <v-col cols="6" md="4">
                            <v-select
                                v-model="ipt.endFixHour"
                                :items="hourOpts"
                                solo
                                hide-details
                            ></v-select>
                        </v-col>

                        <v-col cols="6" md="4">
                            <v-select
                                v-model="ipt.endFixMin"
                                :items="minOpts"
                                solo
                                hide-details
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col cols="12">
                    <h3 class="mb-2">
                        <v-icon class="mr-1 mb-1">mdi-note</v-icon>維修情況
                    </h3>

                    <v-textarea
                        auto-grow
                        solo
                        rows="6"
                        placeholder="請輸入維修情況"
                        v-model.trim="ipt.fixSituation"
                        :rules="[v => (!!v && /[^\s]/.test(v)) || '此欄位不可空白']"
                    ></v-textarea>
                </v-col>
            </v-row>
        </v-form>

        <!-- 操作按鈕 -->
        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="ma-2"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done">
                <v-btn class="ma-2"
                    color="primary" v-if="isShowBtn"
                    :to="`/worklist/serve/${id}/editWork`"
                >編輯</v-btn>

                <v-btn class="ma-2"
                    color="error" v-if="isShowBtn"
                    @click="dialog = true"
                >退回</v-btn>

                <v-btn dark class="ma-2"
                    color="success" v-if="isShowBtn"
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
                            outlined
                            rows="8"
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
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { maintainOrder, withdrawOrder } from '@/apis/workList/serve'
import { getNowFullTime } from '@/assets/js/commonFun'
import { hourOptions, minOptions } from '@/assets/js/dateTimeOption'
import TopBasicTable from '@/components/TopBasicTable.vue'
import BottomTable from '@/components/BottomTable.vue'
import ShowTable from '@/views/workList/serve/ShowTable.vue'

export default {
    props: ['itemData'],
    data: () => ({
        isShowBtn: false,
        id: '',  // 工單編號
        done: false,  // 是否完成頁面操作
        valid: false,  // 表單是否驗證
        isLoading: false,  // 是否讀取中
        topItems: [],  // 上面的欄位
        bottomItems: [],  // 下面的欄位
        tableItems: [],  // 表格資料
        dateMenuShow: {  // 日曆是否顯示
            arrivalFix: false, // 到修日期
            startFix: false,  // 動工日期
            endFix: false,  // 完工日期
        },
        hourOpts: hourOptions,  // 下拉選單項目-小時
        minOpts: minOptions,  // 下拉選單項目-分鐘
        ipt: {
            arrivalFixDate: new Date().toISOString().substr(0, 10),  // 到修-日期
            arrivalFixHour: '00',  // 到修-時
            arrivalFixMin: '00',  // 到修-分
            startFixDate: new Date().toISOString().substr(0, 10),  // 動工-日期
            startFixHour: '00',  // 動工-時
            startFixMin: '00',  // 動工-分
            endFixDate: new Date().toISOString().substr(0, 10),  // 完工-日期
            endFixHour: '00',  // 完工-時
            endFixMin: '00',  // 完工-分
            fixSituation: '',  // 維修情況
        },
        dialog: false,  // 退回 dialog 是否顯示
        reason: '',  // 退回原因
    }),
    components: {
        TopBasicTable,
        BottomTable,
        ShowTable,
    },
    computed: {
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
        // 初始化資料
        setShowData(obj) {
            this.isShowBtn = obj.CreatorID == this.userData.UserId
            this.id = obj.WorkOrderID  // 工單編號
            this.topItems = obj.topItems  // 上面的欄位資料
            this.bottomItems = obj.bottomItems  // 下面的欄位資料
            this.tableItems = obj.tableItems  // 表格資料
        },
        // 退回
        withdraw() {
            this.isLoading = true
            
            withdrawOrder({
                WorkOrderID: this.id,  // 工單編號
                ReturnReason: this.reason,  // 退回原因
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    this.chMsgbar({ success: true, msg: '退回成功' })
                    this.done = true  // 隱藏頁面操作按鈕
                } else {
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
            }).catch(err => {
                this.chMsgbar({ success: false, msg: '伺服器發生問題，退回失敗' })
            }).finally(() => {
                this.isLoading = this.dialog = false
            })
        },
        // 送出
        save() {
            // if (this.$refs.form.validate()) {  // 表單驗證欄位
                if (confirm('送出後就無法修改，你確定要送出嗎?')) {
                    this.chLoadingShow()

                    maintainOrder({
                        WorkOrderID: this.id,  // 工單編號
                        ToRepairDDay: this.ipt.arrivalFixDate,  // 到修日期(年月日)
                        ToRepairDHour: this.ipt.arrivalFixHour,  // 到修日期(小時)
                        ToRepairDTime: this.ipt.arrivalFixMin,  // 到修日期(分)
                        StartWorkDDay: this.ipt.startFixDate,  // 動工日期(年月日)
                        StartWorkDHour: this.ipt.startFixHour,  // 動工日期(小時)
                        StartWorkDTime: this.ipt.startFixMin,  // 動工日期(分)
                        FinishDDay: this.ipt.endFixDate,  // 完工日期(年月日)
                        FinishDHour: this.ipt.endFixHour,  // 完工日期(小時)
                        FinishDTime: this.ipt.endFixMin,  // 完工日期(分)
                        MaintainStatus: this.ipt.fixSituation,  // 維修情況
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                    }).then(res => {
                        if (res.data.ErrorCode == 0) {
                            this.chMsgbar({ success: true, msg: '送出成功' })
                            this.done = true  // 隱藏頁面操作按鈕
                        } else {
                            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                            this.$router.push({ path: '/error' })
                        }
                    }).catch(err => {
                        this.chMsgbar({ success: false, msg: '伺服器發生問題，送出失敗' })
                    }).finally(() => {
                        this.chLoadingShow()
                        this.$refs.form.resetValidation()  // 取消欄位驗證的紅字樣式
                    })
                }
            // } else {
            //     if (this.ipt.fixSituation == '') this.errorSituation = 'red lighten-4'
            //     alert('送出失敗，請確認「維修情況」欄位是否填寫')
            // }
        },
    },
    created() {
        this.setShowData(this.itemData)
    }
}
</script>