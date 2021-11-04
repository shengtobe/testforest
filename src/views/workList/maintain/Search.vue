<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">維修、養護科工單查詢</h2>

    <v-form autocomplete="off">
        <v-row class="px-2">
            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-account</v-icon>立案人
                </h3>
                <v-text-field
                    v-model.trim="ipt.createrId"
                    solo
                    clearable
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-account</v-icon>派工人
                </h3>
                <v-text-field
                    v-model.trim="ipt.dispatcherId"
                    solo
                    clearable
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>工單建立日期(起)
                </h3>
                <v-menu
                    v-model="dateMemuShow.start"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model.trim="ipt.createDateStart"
                            solo
                            v-on="on"
                            readonly
                            clearable
                            @click:clear="timeAClean"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        color="purple"
                        v-model="ipt.createDateStart"
                        @input="timeA"
                        :max="dateAMax"
                        locale="zh-tw"
                        
                    ></v-date-picker>
                </v-menu>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>工單建立日期(迄)
                </h3>
                <v-menu
                    v-model="dateMemuShow.end"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model.trim="ipt.createDateEnd"
                            solo
                            v-on="on"
                            readonly
                            clearable
                            @click:clear="timeBClean"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        color="purple"
                        v-model="ipt.createDateEnd"
                        @input="timeB"
                        :min="dateBMin"
                        locale="zh-tw"
                    ></v-date-picker>
                </v-menu>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>工單編號
                </h3>
                <v-text-field
                    v-model.trim="ipt.workNumber"
                    solo
                    clearable
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>處理階段
                </h3>
                <v-select
                    v-model="ipt.workState"
                    :items="statusOpt"
                    solo
                ></v-select>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-alert-outline</v-icon>是否缺料
                </h3>
                <v-select
                    v-model="ipt.shortage"
                    :items="[{ text: '不限', value: '' }, { text: '無缺料', value: 'F' }, { text: '缺料中', value: 'T' }]"
                    solo
                ></v-select>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>維修類型
                </h3>
                <v-select
                    v-model="ipt.fixType"
                    :items="[{ text: '不限', value: '' }, { text: '故障檢修', value: '1' }, { text: '例行保養', value: '2' }]"
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
                    clearable
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-currency-usd</v-icon>總費用
                </h3>
                <v-text-field
                    v-model.trim="ipt.moneyStart"
                    placeholder="請輸入最小金額"
                    solo
                    clearable
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3" align-self="end" class="mt-n8">
                <v-text-field
                    v-model.trim="ipt.moneyEnd"
                    placeholder="請輸入最大金額"
                    solo
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row class="px-2">
            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-alert-outline</v-icon>是否徹銷
                </h3>
                <v-select
                    v-model="ipt.cancel"
                    :items="[{ text: '不限', value: '' }, { text: '未徹銷', value: 'F' }, { text: '已徹銷', value: 'T' }]"
                    solo
                ></v-select>
            </v-col>

            <v-col cols="12" md="7">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-codepen</v-icon>設備標示編號
                </h3>
                <!-- <EquipRepairCode :key="0" :toLv="4" @getEqCode="getTempCode"/> -->

                <v-row no-gutters>
                    <v-col cols="12" sm="3" class="mb-3 mb-sm-0 pr-sm-3">
                        <v-text-field
                            hide-details
                            v-model="ipt.eqNumber1"
                            solo
                            readonly
                            placeholder="系統"
                            @click="pickEqNumber_show"
                            clearable
                        ></v-text-field> 
                    </v-col>

                    <v-col cols="12" sm="3" class="mb-3 mb-sm-0 pr-sm-3">
                        <v-text-field
                            hide-details
                            v-model="ipt.eqNumber2"
                            ref="eqNumber2"
                            solo
                            readonly
                            placeholder="位置"
                            @click="pickEqNumber_show"
                            clearable
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="3" class="mb-3 mb-sm-0 pr-sm-3">
                        <v-text-field
                            hide-details
                            v-model="ipt.eqNumber3"
                            ref="eqNumber3"
                            solo
                            readonly
                            placeholder="設備"
                            @click="pickEqNumber_show"
                            clearable
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="3" class="mb-3 mb-sm-0 pr-sm-3">
                        <v-text-field
                            hide-details
                            v-model="ipt.eqNumber4"
                            ref="eqNumber4"
                            solo
                            readonly
                            placeholder="序號"
                            @click="pickEqNumber_show"
                            clearable
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12" class="mb-4">
                <v-btn dark large class="mr-3 mb-4 mb-sm-0 btn-search"
                    @click="search"
                >
                    <v-icon>mdi-magnify</v-icon>查詢
                </v-btn>

                <v-btn color="indigo" dark large class="mr-3 mb-4 mb-sm-0 btn-add"
                    to="/worklist/maintain/newList"
                >
                    <v-icon>mdi-plus</v-icon>新增
                </v-btn>

                <v-btn elevation="2" large class="mr-3 mb-4 mb-sm-0 btn-clear"
                    @click="reset"
                >
                    <v-icon>mdi-reload</v-icon>清除搜尋內容
                </v-btn>
            </v-col>
        </v-row>
        <!-- 必填欄位空白提醒視窗 -->
        <v-dialog v-model="pickEqNumber" max-width="350">
        <v-card class="theme-card">
            <v-card-title class="red white--text px-4 py-1 headline">
                請選擇設備
                <v-spacer></v-spacer>
                <v-btn dark fab small text @click="pickEqNumber = false" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-col class="mt-5" v-if="pickEqNumber">
                <EquipRepairCode :key="0" :toLv="4" :nowEqCode="nowEqCode" @getEqCode="getTempCode"/>
            </v-col>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="btn-add white--text" @click="pickEqNumber_click">確定</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
        <!-- 快速查詢 -->
        <v-col cols="12" class="mt-5">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-tag-multiple</v-icon>快速查詢
            </h3>
            
            <v-btn class="mb-2 mr-3 btn-memo white--text"
                @click="searchAll"
            >全部{{ '(' + searchAllCount + ')' }}</v-btn>

            <v-btn class="mb-2 mr-3 btn-memo white--text"
                @click="searchStatus1"
            >待派工{{ '(' + status1Count + ')' }}</v-btn>

            <v-btn class="mb-2 mr-3 btn-memo white--text"
                @click="searchStatus2"
            >已派工待維修{{ '(' + status2Count + ')' }}</v-btn>

            <v-btn class="mb-2 mr-3 btn-memo white--text"
                @click="searchStatus3"
            >已維修待驗收{{ '(' + status3Count + ')' }}</v-btn>

            <v-btn class="mb-2 mr-3 btn-memo white--text"
                @click="searchStatus4"
            >已驗收待結案{{ '(' + status4Count + ')' }}</v-btn>

            <v-btn class="mb-2 mr-3 btn-memo white--text"
                @click="searchStatus5"
            >已結案{{ '(' + status5Count + ')' }}</v-btn>
        </v-col>
        <!-- 表格資料 -->
        <v-row class="px-2">
            <v-col cols="12" class="mt-5 mb-12">
                <v-card>
                    <v-data-table
                        :headers="headers"
                        :items="tableItems"
                        :options.sync="pageOpt"
                        disable-sort
                        disable-filtering
                        hide-default-footer
                        class="theme-table"
                    >
                        <template v-slot:no-data>
                            <span class="red--text subtitle-1">沒有資料</span>
                        </template>

                        <template v-slot:loading>
                            <span class="red--text subtitle-1">資料讀取中...</span>
                        </template>

                        <template v-slot:item.Status="{ item }">
                            <span>{{ statusOpt.find(ele => ele.value == item.Status).text }}</span>
                        </template>

                        <!-- headers 的 content 欄位 (檢視內容) -->
                        <template v-slot:item.content="{ item }">
                            <v-btn small dark fab color="teal" class="btn-detail"
                                :loading="isLoading"
                                @click="viewPage(item)"
                            >
                                <v-icon dark>mdi-file-document</v-icon>
                            </v-btn>
                        </template>

                        <!-- 頁碼 -->
                        <template v-slot:footer="footer">
                            <Pagination
                                :footer="footer"
                                :pageOpt="pageOpt"
                                @chPage="chPage"
                            />
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-form>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import EquipRepairCode from '@/components/EquipRepairCode'
import { getNowFullTime } from '@/assets/js/commonFun'
import { maintainStatusOpts } from '@/assets/js/workList'
import { fetchOrderList, fetchWorkOrderOne } from '@/apis/workList/maintain'
import { checkEnter } from '@/apis/access'
import Pagination from '@/components/Pagination.vue'

export default {
    data: () => ({
        searchAllCount: 0,
        status1Count: 0,
        status2Count: 0,
        status3Count: 0,
        status4Count: 0,
        status5Count: 0,
        combineCode: '', //合併後的設備編碼
        nowEqCode: '', //編輯時 預設帶入的combineCode
        pickEqNumber: false, // 設備標示編號選擇視窗
        dateAMax: new Date().toISOString().substr(0, 10),
        dateBMin: '',
        ipt: {},
        defaultIpt: {  // 預設的欄位值
            createrId: '',  // 立案人
            createDateStart: '',  // 建立日期(起)
            createDateEnd: new Date().toISOString().substr(0, 10),  // 建立日期(迄)
            dispatcherId: '',  // 派工人
            workNumber: '',  // 工單編號
            workState: '',  // 處理階段
            eqNumber1: '',  // 設備標示編號1
            eqNumber2: '',  // 設備標示編號2
            eqNumber3: '',  // 設備標示編號3
            eqNumber4: '',  // 設備標示編號4
            shortage: '',  // 是否缺料 (預設不缺料)
            cancel: 'F',  // 是否徹銷
            fixType: '',  // 維修類型
            moneyStart: '',  // 總費用(最小金額)
            moneyEnd: '',  // 總費用(最大金額)
            subject: '',  // 故障主旨
        },
        dateMemuShow: {  // 日曆是否顯示
            start: false,
            end: false,
        },
        statusOpt: maintainStatusOpts,  // 處理階段下拉選單
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '工單編號', value: 'WorkOrderID', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '故障主旨', value: 'WorkSubject', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '處理階段', value: 'Status', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        ],
        isLoading: false,  // 是否讀取中
    }),
    components: { Pagination, EquipRepairCode },  // 頁碼
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        },
        'ipt.eqNumber1': function(val, oldval) {
            if(val == null){
                this.ipt.eqNumber1 = '';
                this.ipt.eqNumber2 = '';
                this.ipt.eqNumber3 = '';
                this.ipt.eqNumber4 = '';
            }
        },
        'ipt.eqNumber2': function(val, oldval) {
            if(val == null){
                this.ipt.eqNumber2 = '';
                this.ipt.eqNumber3 = '';
                this.ipt.eqNumber4 = '';
            }
        },
        'ipt.eqNumber3': function(val, oldval) {
            if(val == null){
                this.ipt.eqNumber3 = '';
                this.ipt.eqNumber4 = '';
            }
        },
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
    methods: {
        pickEqNumber_show(){
            this.nowEqCode = `${this.ipt.eqNumber1}-${this.ipt.eqNumber2}-${this.ipt.eqNumber3}-${this.ipt.eqNumber4}`
            this.pickEqNumber = true
        },
        pickEqNumber_click(){
            this.pickEqNumber = false
            let tempCodeArr = this.combineCode.split('-')
            this.ipt.eqNumber1 = tempCodeArr[0],  // 設備標示編號(系統)
            this.ipt.eqNumber2 = tempCodeArr[1],  // 設備標示編號(位置)
            this.ipt.eqNumber3 = tempCodeArr[2],  // 設備標示編號(設備)
            this.ipt.eqNumber4 = tempCodeArr[3]  // 設備標示編號(序號)
        },
        timeA(){
            this.dateMemuShow.start = false
            this.dateBMin = this.ipt.createDateStart
        },
        timeAClean(){
            this.dateBMin = ''
        },
        timeB(){
            this.dateMemuShow.end = false
            this.dateAMax = this.ipt.createDateEnd
        },
        timeBClean(){
            this.dateAMax = ''
        },
        //抓取未確認的設備標示編碼
        getTempCode(value) {
            this.combineCode = value
        },
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 查詢資料
        search() {
            
            this.chLoadingShow({show:true})
            this.pageOpt.page = 1  // 頁碼初始化
            if(this.ipt.eqNumber3 == null) this.ipt.eqNumber3 = ''
            if(this.ipt.eqNumber4 == null) this.ipt.eqNumber4 = ''

            fetchOrderList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'MMIS_WorkerOrder',  // DB table
                KeyItem: [
                    { tableColumn: 'Creator', columnValue: this.ipt.createrId },  // 立案人id
                    { tableColumn: 'DispatchMan', columnValue: this.ipt.dispatcherId },  // 派工人id
                    { tableColumn: 'CreateDTime_Start', columnValue: this.ipt.createDateStart },  // 工單建立日期(起)
                    { tableColumn: 'CreateDTime_End', columnValue: this.ipt.createDateEnd },  // 工單建立日期(迄)
                    { tableColumn: 'WorkOrderID', columnValue: this.ipt.workNumber },  // 工單編號
                    { tableColumn: 'Status', columnValue: this.ipt.workState },  // 處理階段
                    { tableColumn: 'Shortage', columnValue: this.ipt.shortage },  // 是否缺料
                    { tableColumn: 'Type', columnValue: this.ipt.fixType },  // 維修類型
                    { tableColumn: 'WorkSubject', columnValue: this.ipt.subject },  // 故障主旨
                    { tableColumn: 'CancelStatus', columnValue: this.ipt.cancel },  // 是否徹銷
                    { tableColumn: 'MaintainCode_System', columnValue: this.ipt.eqNumber1 },  // 設備標示編號1
                    { tableColumn: 'MaintainCode_Loc', columnValue: this.ipt.eqNumber2 },  // 設備標示編號2
                    { tableColumn: 'MaintainCode_Eqp', columnValue: this.ipt.eqNumber3 },  // 設備標示編號3
                    { tableColumn: 'MaintainCode_Seq', columnValue: this.ipt.eqNumber4 },  // 設備標示編號4
                ],
                QyName: [    // 欲回傳的欄位資料
                    'WorkOrderID',
                    'WorkSubject',
                    'Status'
                ],
            }).then(res => {
                this.tableItems = JSON.parse(res.data.order_list)
                this.tableItems.forEach(element => {
                    for(let ele in element){
                        if(element[ele] == null){
                            element[ele] = '';
                        }
                    }
                });
                let dd = this.tableItems.map(e => e.CreateDTime)
            }).catch(err => {
                //console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow({show:false})
            })
        },
        // 檢視內容
        viewPage(item) {
            let routeData = this.$router.resolve({ path: `/worklist/maintain/${item.WorkOrderID}/show` })
            window.open(routeData.href, '_blank')
        },
        // 清除搜尋內容
        reset() {
            this.ipt = { ...this.defaultIpt }
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 預設先執行一次搜尋
        initSearch() {
            this.chLoadingShow({show:true})
            this.pageOpt.page = 1  // 頁碼初始化
            
            fetchOrderList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'MMIS_WorkerOrder',  // DB table
                KeyItem: [
                    { tableColumn: 'CreatorID', columnValue: this.ipt.createrId },  // 立案人id
                    { tableColumn: 'DispatchID', columnValue: this.ipt.dispatcherId },  // 派工人id
                    { tableColumn: 'CreateDTime_Start', columnValue: this.ipt.createDateStart },  // 工單建立日期(起)
                    { tableColumn: 'CreateDTime_End', columnValue: this.ipt.createDateEnd },  // 工單建立日期(迄)
                    { tableColumn: 'WorkOrderID', columnValue: this.ipt.workNumber },  // 工單編號
                    { tableColumn: 'Status', columnValue: this.ipt.workState },  // 處理階段
                    { tableColumn: 'Shortage', columnValue: this.ipt.shortage },  // 是否缺料
                    { tableColumn: 'Type', columnValue: this.ipt.fixType },  // 維修類型
                    { tableColumn: 'WorkSubject', columnValue: this.ipt.subject },  // 故障主旨
                    { tableColumn: 'CancelStatus', columnValue: this.ipt.cancel },  // 是否徹銷
                    { tableColumn: 'MaintainCode_System', columnValue: this.ipt.eqNumber1 },  // 設備標示編號1
                    { tableColumn: 'MaintainCode_Loc', columnValue: this.ipt.eqNumber2 },  // 設備標示編號2
                    { tableColumn: 'MaintainCode_Eqp', columnValue: this.ipt.eqNumber3 },  // 設備標示編號3
                    { tableColumn: 'MaintainCode_Seq', columnValue: this.ipt.eqNumber4 },  // 設備標示編號4
                ],
                QyName: [    // 欲回傳的欄位資料
                    'WorkOrderID',
                    'WorkSubject',
                    'Status'
                ],
            }).then(res => {
                this.status1Count= 0
                this.status2Count= 0
                this.status3Count= 0
                this.status4Count= 0
                this.status5Count= 0

                let tempTb = JSON.parse(res.data.order_list)
                this.searchAllCount= tempTb.length
                tempTb.forEach(element => {
                    for(let ele in element){
                        if(element[ele] == null){
                            element[ele] = '';
                        }
                    }
                    if(element.Status == '1'){
                        this.status1Count++
                    }
                    if(element.Status == '2'){
                        this.status2Count++
                    }
                    if(element.Status == '3'){
                        this.status3Count++
                    }
                    if(element.Status == '4'){
                        this.status4Count++
                    }
                    if(element.Status == '5'){
                        this.status5Count++
                    }
                    
                });
            }).catch(err => {
                //console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow({show:false})
            })

            
        },
        // 全部
        searchAll() {
            this.chLoadingShow({show:true})
            this.pageOpt.page = 1  // 頁碼初始化

            fetchOrderList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'MMIS_WorkerOrder',  // DB table
                KeyItem: [
                    
                ],
                QyName: [    // 欲回傳的欄位資料
                    'WorkOrderID',
                    'WorkSubject',
                    'Status'
                ],
            }).then(res => {
                this.tableItems = JSON.parse(res.data.order_list)
                this.tableItems.forEach(element => {
                    for(let ele in element){
                        if(element[ele] == null){
                            element[ele] = '';
                        }
                    }
                });
                let dd = this.tableItems.map(e => e.CreateDTime)
            }).catch(err => {
                //console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow({show:false})
            })
        }, 
        // 待派工
        searchStatus1() { 
            this.chLoadingShow({show:true})
            this.pageOpt.page = 1  // 頁碼初始化

            fetchOrderList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'MMIS_WorkerOrder',  // DB table
                KeyItem: [
                    
                ],
                QyName: [    // 欲回傳的欄位資料
                    'WorkOrderID',
                    'WorkSubject',
                    'Status'
                ],
            }).then(res => {
                let tempTableItems = [];
                this.status1Count = 0;
                this.tableItems = [...[]];
                tempTableItems = JSON.parse(res.data.order_list)
                tempTableItems.forEach(element => {
                    for(let ele in element){
                        if(element[ele] == null){
                            element[ele] = '';
                        }
                    }
                    if(element.Status == '1'){
                        this.tableItems.push(element)
                        this.status1Count++
                    }
                });
            }).catch(err => {
                //console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow({show:false})
            })
        }, 
        // 已派工待維修
        searchStatus2() { 
            this.chLoadingShow({show:true})
            this.pageOpt.page = 1  // 頁碼初始化

            fetchOrderList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'MMIS_WorkerOrder',  // DB table
                KeyItem: [
                    
                ],
                QyName: [    // 欲回傳的欄位資料
                    'WorkOrderID',
                    'WorkSubject',
                    'Status'
                ],
            }).then(res => {
                let tempTableItems = [];
                this.status2Count = 0;
                this.tableItems = [...[]];
                tempTableItems = JSON.parse(res.data.order_list)
                tempTableItems.forEach(element => {
                    for(let ele in element){
                        if(element[ele] == null){
                            element[ele] = '';
                        }
                    }
                    if(element.Status == '2'){
                        this.tableItems.push(element)
                        this.status2Count++
                    }
                });
            }).catch(err => {
                //console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow({show:false})
            })
        }, 
        // 已維修待驗收
        searchStatus3() { 
            this.chLoadingShow({show:true})
            this.pageOpt.page = 1  // 頁碼初始化

            fetchOrderList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'MMIS_WorkerOrder',  // DB table
                KeyItem: [
                    
                ],
                QyName: [    // 欲回傳的欄位資料
                    'WorkOrderID',
                    'WorkSubject',
                    'Status'
                ],
            }).then(res => {
                let tempTableItems = [];
                this.status3Count = 0;
                this.tableItems = [...[]];
                tempTableItems = JSON.parse(res.data.order_list)
                tempTableItems.forEach(element => {
                    for(let ele in element){
                        if(element[ele] == null){
                            element[ele] = '';
                        }
                    }
                    if(element.Status == '3'){
                        this.tableItems.push(element)
                        this.status3Count++
                    }
                });
            }).catch(err => {
                //console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow({show:false})
            })
        },
        // 已驗收待結案
        searchStatus4() {
            this.chLoadingShow({show:true})
            this.pageOpt.page = 1  // 頁碼初始化

            fetchOrderList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'MMIS_WorkerOrder',  // DB table
                KeyItem: [
                    
                ],
                QyName: [    // 欲回傳的欄位資料
                    'WorkOrderID',
                    'WorkSubject',
                    'Status'
                ],
            }).then(res => {
                let tempTableItems = [];
                this.status4Count = 0;
                this.tableItems = [...[]];
                tempTableItems = JSON.parse(res.data.order_list)
                tempTableItems.forEach(element => {
                    for(let ele in element){
                        if(element[ele] == null){
                            element[ele] = '';
                        }
                    }
                    if(element.Status == '4'){
                        this.tableItems.push(element)
                        this.status4Count++
                    }
                });
            }).catch(err => {
                //console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow({show:false})
            })
        },
        // 已結案
        searchStatus5() { 
            this.chLoadingShow({show:true})
            this.pageOpt.page = 1  // 頁碼初始化

            fetchOrderList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'MMIS_WorkerOrder',  // DB table
                KeyItem: [
                    
                ],
                QyName: [    // 欲回傳的欄位資料
                    'WorkOrderID',
                    'WorkSubject',
                    'Status'
                ],
            }).then(res => {
                let tempTableItems = [];
                this.status5Count = 0;
                this.tableItems = [...[]];
                tempTableItems = JSON.parse(res.data.order_list)
                tempTableItems.forEach(element => {
                    for(let ele in element){
                        if(element[ele] == null){
                            element[ele] = '';
                        }
                    }
                    if(element.Status == '5'){
                        this.tableItems.push(element)
                        this.status5Count++
                    }
                });
            }).catch(err => {
                //console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow({show:false})
            })
        }, 
    },
    created() {
        this.ipt = { ...this.defaultIpt }
        // this.search();
        this.initSearch();
    },

}
</script>
