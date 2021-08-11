<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">工單編號：{{ workNumber }}</h2>

    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8">
        <BottomTable :items="bottomItems" />
    </v-row>

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
                    :background-color="errorSituation"
                    :rules="[v => (!!v && /[^\s]/.test(v)) || '此欄位不可空白']"
                ></v-textarea>
            </v-col>
        </v-row>
    </v-form>

    <!-- 工時統計 -->
    <h3 class="mb-1">
        <v-icon class="mr-1 mb-1">mdi-table</v-icon>工時統計
        <span class="red--text">*</span>
        <v-btn fab dark small color="indigo"
            @click="setJobHour(false)"
            class="ml-2 mb-1 btn-modify"
        >
            <v-icon dark>mdi-plus</v-icon>
        </v-btn>
    </h3>

    <v-card class="mb-8">
        <v-data-table
            :headers="jobHour.headers"
            :items="jobHour.items"
            disable-sort
            disable-filtering
            hide-default-footer
            class="theme-table"
        >
            <template v-slot:no-data>
                <span class="red--text subtitle-1">沒有資料</span>
            </template>

            <!-- 表格最上面插入 toolbar 及 dialog -->
            <template v-slot:top>
                <v-dialog v-model="jobHour.dialogShow" max-width="600px" >
                    <v-card>
                        <v-card-title class="btn-expansion white--text px-4 py-1">
                            {{ jobHour.titleName }}
                            <v-spacer></v-spacer>
                            <v-btn dark fab small text @click="jobHour.dialogShow = false, eqShow = false" class="mr-n2">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-card-title>

                        <v-card-text class="px-6 py-4">
                            <v-form
                                ref="setjobform"
                                v-model="jobFormValid"
                                lazy-validation
                            >
                                <v-row>
                                    <v-col cols="12" sm="4" v-if="!jobHour.isEdit">
                                        <h3 class="mb-1">
                                            <v-icon class="mr-1 mb-1">mdi-account</v-icon>姓名
                                        </h3>
                                        <v-select
                                            v-model="jobForm.PeopleId"
                                            :items="allLicenseMembers"
                                            solo
                                        ></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="12">
                                        <h3 class="mb-1">
                                            <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>地點
                                            <span class="red--text">*</span>
                                        </h3>
                                        <v-text-field
                                            v-model.trim="jobForm.Location"
                                            solo
                                            :rules="[v => (!!v && /[^\s]/.test(v)) || '此欄位不可空白']"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="12" v-if="false">
                                        <h3 class="mb-1">
                                            <v-icon class="mr-1 mb-1">mdi-format-list-bulleted</v-icon>工作項
                                        </h3>
                                        <v-select
                                            v-model="jobForm.JobCode"
                                            :items="jobNameIpts"
                                            solo
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="12" v-if="eqShow">
                                        <h3 class="mb-5">
                                            <v-icon class="mr-1 mb-1">mdi-format-list-bulleted</v-icon>工作項
                                        </h3>
                                        <EquipRepairCode :key="0" :toLv="5" :rtnStartLv="5" :nowEqCode="nowEqCode" :nowWorkCode="nowWorkCode" :disableToLv="2" @getWorkName="getTempName" @getEqCode="getEqCode" @getEqName="getEqName"/>
                                    </v-col>
                                    <v-col cols="12" sm="12">
                                        <h3 class="mb-1">
                                            <v-icon class="mr-1 mb-1">mdi-calculator</v-icon>工作量(hr)
                                            <span class="red--text">*</span>
                                        </h3>
                                        <v-btn class="btn-clear black--text mb-1" color="success" elevation="4" @click="hr1">1</v-btn>
                                        <v-btn class="btn-clear black--text mb-1 ml-1" color="success" elevation="4" @click="hr2">2</v-btn>
                                        <v-btn class="btn-clear black--text mb-1 ml-1" color="success" elevation="4" @click="hr3">3</v-btn>
                                        <v-btn class="btn-clear black--text mb-1 ml-1" color="success" elevation="4" @click="hr4">4</v-btn>
                                        <v-btn class="btn-clear black--text mb-1 ml-1" color="success" elevation="4" @click="hr8">8</v-btn>
                                        <v-text-field
                                            v-model.trim.number="jobForm.Count"
                                            solo type="number"
                                            suffix="小時"
                                            :rules="[v => (!!v && /[^\s]/.test(v)) || '此欄位不可空白']"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-card
                                            class="d-flex justify-center mb-6"
                                            flat
                                            >
                                            <v-btn class="btn-add" color="success" elevation="4" @click="addWork">加入工作</v-btn>
                                        </v-card>
                                    </v-col>
                                    <!-- <v-card class="d-flex justify-center mb-6">
                                        <v-btn class="btn-add" color="success" elevation="4" @click="saveJob">加入工作</v-btn>
                                    </v-card> -->
                                    <!-- 已選工作項 -->
                                    <v-col cols="12">
                                        <h3 class="mb-1 mt-n3">
                                            <v-icon class="mr-1 mb-1">mdi-briefcase-check</v-icon>已選工作
                                        </h3>

                                        <v-chip
                                            v-for="(item, idx) in selectWorkArr"
                                            :key="item"
                                            class="mr-3 mt-2"
                                            label
                                            color="green dark-2"
                                            dark
                                            large
                                        >
                                            {{ item }}
                                            <v-icon right
                                                @click="rmSelectWork(idx)"
                                            >mdi-close-circle</v-icon>
                                        </v-chip>
                                        
                                    </v-col>


                                    
                                </v-row>
                            </v-form>
                        </v-card-text>
                        
                        <v-card-actions class="px-5 pb-5">
                            <v-spacer></v-spacer>
                            <v-btn class="mr-2 btn-clear" elevation="4" @click="jobHour.dialogShow = false, eqShow = false">取消</v-btn>
                            <v-btn class="btn-add" color="success" elevation="4" @click="saveJob">送出</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </template>

            <!-- 插入 action 欄位編輯 -->
            <template v-slot:item.action="{ item }">
                <v-btn small dark fab color="info darken-1"
                    class="mr-3 btn-modify"
                    @click="setJobHour(true, item)"
                >
                    <v-icon dark>mdi-pen</v-icon>
                </v-btn>

                <v-btn fab small color="error" class="btn-delete"
                    @click="del(item)"
                >
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </v-card>

    <v-row>
        <!-- 操作按鈕 -->
        <v-col cols="12" class="text-center">
            <v-btn dark class="ma-2 btn-close"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done">
                <v-btn class="ma-2 btn-delete"
                    :loading="isLoading"
                    color="error" v-if="isShowBtn"
                    @click="dialog = true"
                >退回</v-btn>

                <v-btn dark class="ma-2 btn-add"
                    :loading="isLoading" v-if="isShowBtn"
                    @click="save"
                >送出</v-btn>
            </template>
        </v-col>

        <!-- 按鈕說明，demo 用 -->
        <v-col cols="12" class="error--text" v-show="false">
            <h4>按鈕出現說明</h4>
            1. 退回：派工人、代理人<br>
            2. 維修情況：派工人、代理人、林鐵維修人員
        </v-col>
    </v-row>

    <!-- dialog -->
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-toolbar dark flat dense color="error" class="mb-2 btn-delete">
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
                            hide-details placeholder="請輸入退回原因"
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
                <v-btn class="mr-2 btn-clear" elevation="4" :loading="isLoading" @click="dialog = false">取消</v-btn>
                <v-btn class="btn-add" color="success"  elevation="4" :loading="isLoading" @click="withdraw">送出</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import EquipRepairCode from '@/components/EquipRepairCode'
import { hourOptions, minOptions } from '@/assets/js/dateTimeOption'
import TopBasicTable from '@/components/TopBasicTable.vue'
import BottomTable from '@/components/BottomTable.vue'
import { maintainOrder, fetchJobName, withdrawOrder } from '@/apis/workList/maintain'

export default {
    props: ['itemData'],
    data: () => ({
        nowEqCode: '', //編輯時 預設帶入的combineCode 
        nowWorkCode: '', //編輯時 預設帶入的工作項
        combineCode: '', //合併後的設備編碼
        Lv5Name: '', //工作項中文
        Lv5Code: '', //工作項編碼
        LvAllName: '', // 中文
        initCode: '', //最初始的code
        selectWorkArr0: [],
        selectWorkArr: [],
        selectWorkArr_eqCode: [],
        selectWorkArr_AllName: [],
        isShowBtn: false,
        eqShow: false,
        done: false,  // 是否完成頁面操作
        valid: false,  // 表單是否驗證欄位 (demo先取消掉)
        isLoading: false,  // 是否讀取中
        workNumber: '',  // 工單編號
        dialog: false,  // dialog 是否顯示
        reason: '',  // 退回原因
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
        errorSituation: '',  // 必填欄位背景色-維修情況
        topItems: [],  // 上面的欄位
        bottomItems: [],  // 下面的欄位
        allLicenseMembers: [],  // 所有林鐵人員下拉選單
        jobFormValid: true,  // 工時統計是否驗證欄位
        jobHour: {  // 工時
            dialogShow: false,
            isEdit: false,  // 是否為工時編輯時
            titleName: '',  // dialog 標題人名
            headers: [
                { text: '姓名', value: 'PeopleName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
                { text: '地點', value: 'Location', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
                { text: '工作項', value: 'JobName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
                { text: '工作量(hr)', value: 'Count', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
                { text: '編輯', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            ],
            items: [],
            editIdx: 0,  // 編輯中資料的索引值
        },
        jobForm: {}, // 工時表單
        defaultJobForm: {  // 工時預設表單
            PeopleId: '',
            PeopleName: '',
            Location: '',
            JobCode: '',
            JobName: '',
            Count: 1, 
            eqCode: '',
            MaintainCode_AllName: '',
            MaintainCode_Eqp: '',
            MaintainCode_Seq: '',
        },
        jobNameIpts: [],  // 工作項下拉選單
        jobFormIsEdit: false,  // 工時表單是否為編輯模式
    }),
    components: {
        TopBasicTable,
        BottomTable,
        EquipRepairCode
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
    watch: {
        // ------- 切換選項時，向後端抓下一層的報修碼 --------
        // 系統
        'jobHour.dialogShow': function(newVal) {
            if (newVal == false) {
                    console.log("v: ", newVal);
                    this.eqShow = newVal
                }
        },
    },
    methods: {
        //抓取未確認的設備標示編碼 getEqName
        getTempName(value) {
            console.log("this.Lv5Name: ", value);
            this.Lv5Name = value
        },
        getEqCode(value){
            console.log("this.Lv5Code: ", value);
            this.Lv5Code = value
        },
        getEqName(value){
            console.log("this.LvAllName: ", value);
            this.LvAllName = value
        },
        addWork(){
            if(this.Lv5Name == '') return
            let v = this.Lv5Name + ' - ' + this.jobForm.Count + 'hr'
            console.log("this.Lv5Code: ", this.Lv5Code);
            console.log("this.Lv5Name: ", this.Lv5Name);
            console.log("this.LvAllName: ", this.LvAllName);
            if(this.selectWorkArr0.includes(this.Lv5Name) == false){
                this.selectWorkArr0.push(this.Lv5Name)
                this.selectWorkArr_eqCode.push(this.Lv5Code)
                this.selectWorkArr_AllName.push(this.LvAllName)
                this.selectWorkArr.push(v)
            }
            else{
                let rmIdx = this.selectWorkArr0.indexOf(this.Lv5Name)
                console.log("rmIdx = ", rmIdx);
                this.selectWorkArr.splice(rmIdx, 1)
                this.selectWorkArr0.splice(rmIdx, 1)
                this.selectWorkArr0.push(this.Lv5Name)
                this.selectWorkArr_eqCode.push(this.Lv5Code)
                this.selectWorkArr_AllName.push(this.LvAllName)
                this.selectWorkArr.push(v)
            }
        },
        hr1(){ this.jobForm.Count = 1},
        hr2(){ this.jobForm.Count = 2},
        hr3(){ this.jobForm.Count = 3},
        hr4(){ this.jobForm.Count = 4},
        hr8(){ this.jobForm.Count = 8},
        ...mapActions('system', [
            'chMsgbar',  // messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'closeWindow',  // 關閉視窗
        ]),
        // 初始化資料
        setShowData(obj) {
            console.log("obj.AgentID!: ", obj.AgentID);
            this.isShowBtn = obj.DispatchID == this.userData.UserId || obj.AgentID == this.userData.UserId
            this.workNumber = obj.WorkOrderID  // 工單編號
            this.topItems = obj.topItems  // 上面的欄位資料
            this.bottomItems = obj.bottomItems  // 下面的欄位資料
            console.log("this.bottomItems: ",this.bottomItems)
            this.defaultJobForm.Location = obj.WorkPlace  // 工作地點預設值
            console.log("obj.MaintainCode: ", obj.MaintainCode);
            let codearr = obj.MaintainCode.split('-')
            console.log("codearr: ", codearr);
            codearr[2] = ''
            codearr[3] = ''
            this.initCode = codearr.join('-') + '-'
            this.nowEqCode = this.initCode
            console.log("this.nowEqCode: ", this.nowEqCode);
            // this.nowEqCode = obj.MaintainCode

            // 組合所有林鐵人員下拉選單(用於選工作項)
            let arr = obj.PeopleLicense.concat(obj.PeopleNoLicense)  // 所有林鐵人員
            console.log("arr: ", arr)
            this.allLicenseMembers = arr.map(ele => ({
                text: ele.PeopleName,
                value: ele.PeopleId,
            }))
            console.log("allLicenseMembers: ", this.allLicenseMembers)
            
            // 工時表單初始化
            this.jobHour.items = this.allLicenseMembers.map(item => ({
                PeopleId: item.value,
                PeopleName: item.text,
                Location: obj.WorkPlace,
                JobCode: '',
                JobName: '',
                Count: 1, 
                eqCode: '',
                MaintainCode_AllName: '',
                MaintainCode_Eqp: '',
                MaintainCode_Seq: '',
            }))
            console.log("this.jobHour.items: ", this.jobHour.items)

            // 向後端查詢工作項
            fetchJobName({
                DeviceCode: obj.MaintainCode,  // 工單編號
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
                this.jobNameIpts = res.data.device_jobname.map(item => ({
                    text: item.JobName,
                    value: item.JobCode,
                }))
                console.log("res.data: ", res.data);
                console.log("jobNameIpts: ", this.jobNameIpts);
            }).catch(err => {
                this.chMsgbar({ success: false, msg: '伺服器發生問題，工作項查詢失敗' })
            })
        },
        // 退回
        withdraw() {
            this.isLoading = true
            
            withdrawOrder({
                WorkOrderID: this.workNumber,  // 工單編號
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
            console.log("this.jobHour.items: ", this.jobHour.items);
            if (this.$refs.form.validate()) {  // 表單驗證欄位
                if (confirm('送出後就無法修改，你確定要送出嗎?')) {
                    this.chLoadingShow({show:true})

                    maintainOrder({
                        WorkOrderID: this.workNumber,  // 工單編號
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
                        WorkTimeData: this.jobHour.items,  // 工時統計資料
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                        MaintainCode_Eqp: '',
                        MaintainCode_Seq: '',
                        MaintainCode_AllName: '',
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
                        this.chLoadingShow({show:false})
                        this.$refs.form.resetValidation()  // 取消欄位驗證的紅字樣式
                    })
                }
            } else {
                if (this.ipt.fixSituation == '') this.errorSituation = 'red lighten-4'
                alert('送出失敗，請確認「維修情況」欄位是否填寫')
            }
        },
        // 填寫工時 (參數 isEdit 為 true 時為編輯模式，item 則為要編輯的資料)
        setJobHour(isEdit, item) {
            this.selectWorkArr = [...[]]
            this.eqShow = false
            if (!isEdit) {
                // 新增時
                this.jobHour.isEdit = false
                this.jobForm = { ...this.defaultJobForm }
                this.jobHour.titleName = '新增資料'
                this.nowEqCode = this.initCode
            } else {
                // 編輯時
                this.jobHour.isEdit = true
                this.jobHour.editIdx = this.jobHour.items.indexOf(item)  // 編輯中的資料索引
                this.jobForm = { ...item }  // 現有值帶入表單
                console.log("this.jobForm: ", this.jobForm);
                this.jobHour.titleName = `編輯資料 - ${item.PeopleName}`
                this.nowWorkCode = this.jobForm.JobCode
                console.log("this.nowWorkCode: ", this.nowWorkCode);
                console.log("this.jobForm.eqCode: ", this.jobForm.eqCode);
                if(this.jobForm.eqCode != ''){
                    this.nowEqCode = this.jobForm.eqCode
                    console.log("this.nowEqCode: ", this.nowEqCode);
                }
                else{
                    this.nowEqCode = this.initCode
                }
                if(this.jobForm.JobName != ''){
                    this.selectWorkArr.push(`${this.jobForm.JobName}(${this.jobForm.JobCode}) - ${this.jobForm.Count}hr`)
                    // this.selectWorkArr.push(this.jobForm.JobName + '(' + this.jobForm.JobCode + ') - ' + this.jobForm.Count + "hr")
                }
            }
            this.jobHour.dialogShow = true
            this.eqShow = true
        },
        // 刪除工作項
        del(item) {
            let idx = this.jobHour.items.indexOf(item)  // 編輯中的資料索引
            this.jobHour.items.splice(idx, 1)
        },
        //刪除已選工作項
        rmSelectWork(idx) {
            this.selectWorkArr.splice(idx, 1)
            this.selectWorkArr0.splice(idx, 1)
            this.selectWorkArr_eqCode.splice(idx, 1)
            this.selectWorkArr_AllName.splice(idx, 1)
        },
        // 儲存工作表單
        saveJob() {
            console.log("selectWorkArr_eqCode: ", this.selectWorkArr_eqCode);
            console.log("selectWorkArr_AllName: ", this.selectWorkArr_AllName);
            if(this.Lv5Name == '') return
            // 反查工作項名稱
            // if(this.jobForm.JobCode != '' && this.jobForm.JobCode != null){
            if(this.Lv5Name != '' && this.Lv5Name != null){
                // this.jobForm.JobName = this.jobNameIpts.find(item => item.value == this.jobForm.JobCode).text
                this.jobForm.JobName = this.Lv5Name.substr(0, this.Lv5Name.length - 4)
            }
            else{
                this.jobForm.JobName = ''
            }
            if (this.jobHour.isEdit == false) { 
                // +新增
                let tempJobHour = []
                let i = 0
                console.log("新增時 selectWorkArr_eqCode: ", this.selectWorkArr_eqCode);
                this.selectWorkArr.forEach(work => {
                    console.log("work: ", work);
                    let tempJobForm = {...this.jobForm}
                    // 反查姓名
                    tempJobForm.PeopleName = this.allLicenseMembers.find(item => item.value == tempJobForm.PeopleId).text
                    tempJobForm.JobName = work.substr(0, work.indexOf('('))
                    tempJobForm.JobCode = work.substr(work.indexOf('(') + 1, 2)
                    tempJobForm.Count = work.substr(work.indexOf(' - ') + 3).replace('hr', '')
                    tempJobForm.eqCode = this.selectWorkArr_eqCode[i]
                    tempJobForm.MaintainCode_AllName = this.selectWorkArr_AllName[i]
                    tempJobForm.MaintainCode_Eqp = (this.selectWorkArr_eqCode[i].split('-'))[2]
                    tempJobForm.MaintainCode_Seq = (this.selectWorkArr_eqCode[i].split('-'))[3]
                    console.log("新增 tempJobForm: ", tempJobForm);
                    tempJobHour.push(tempJobForm)
                    tempJobForm = {}
                    i++
                });
                this.jobHour.items.push(...tempJobHour)
                // 反查姓名
                // this.jobForm.PeopleName = this.allLicenseMembers.find(item => item.value == this.jobForm.PeopleId).text
                // 新增時 (照林鐵人員要求，新增後不關閉視窗)
                // this.jobHour.items.push(this.jobForm)
                this.jobForm = { ...this.defaultJobForm }
                this.jobHour.dialogShow = false
            } else {
                // 編輯時
                let tempJobHour = []
                let i = 0
                console.log("編輯時 selectWorkArr_eqCode: ", this.selectWorkArr_eqCode);
                this.selectWorkArr.forEach(work => {
                    console.log("work: ", work);
                    console.log("this.jobForm: ", this.jobForm);
                    let tempJobForm = {...this.jobForm}
                    tempJobForm.JobName = work.substr(0, work.indexOf('('))
                    tempJobForm.JobCode = work.substr(work.indexOf('(') + 1, 2)
                    tempJobForm.Count = work.substr(work.indexOf(' - ') + 3).replace('hr', '')
                    tempJobForm.eqCode = this.selectWorkArr_eqCode[i]
                    tempJobForm.MaintainCode_AllName = this.selectWorkArr_AllName[i]
                    tempJobForm.MaintainCode_Eqp = (this.selectWorkArr_eqCode[i].split('-'))[2]
                    tempJobForm.MaintainCode_Seq = (this.selectWorkArr_eqCode[i].split('-'))[3]
                    console.log("編輯 tempJobForm: ", tempJobForm);
                    tempJobHour.push(tempJobForm)
                    tempJobForm = {}
                    i++
                });
                this.jobHour.items.splice(this.jobHour.editIdx + 1, 0, ...tempJobHour) //先插入點擊編輯的那行後面
                this.jobHour.items.splice(this.jobHour.editIdx, 1) // 再刪除點擊編輯的那行
                // Object.assign(this.jobHour.items[this.jobHour.editIdx], this.jobForm)
                this.jobHour.dialogShow = false
            }
            this.selectWorkArr = [...[]]
            this.eqShow = false
            console.log("jobHour: ", this.jobHour);
        },
    },
    created() {
        this.setShowData(this.itemData)
    }
}
</script>