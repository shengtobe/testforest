<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">行車事故事件查詢</h2>

    <v-row class="px-2 mb-8 label-header">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>發生地點
            </h3>
            <v-select
                v-model="ipt.location"
                :items="locationOpts"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>發生日期(起)
            </h3>
            <v-menu
                v-model="dateMenuShow.start"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model.trim="ipt.dateStart"
                        solo
                        v-on="on"
                        readonly
                        clearable
                        @click:clear="timeAClean"
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="primary"
                    v-model="ipt.dateStart"
                    @input="timeA"
                    locale="zh-tw"
                    :max="dateAMax"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>發生日期(迄)
            </h3>
            <v-menu
                v-model="dateMenuShow.end"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model.trim="ipt.dateEnd"
                        solo
                        v-on="on"
                        readonly
                        clearable
                        @click:clear="timeBClean"
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="primary"
                    v-model="ipt.dateEnd"
                    @input="timeB"
                    :min="dateBMin"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="3"/>
        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>事故類型分類
            </h3>
            <v-select clearable
                v-model="ipt.evtType1"
                :items="FirstLvFiltered"
                @change="evtTypeChange"
                solo
            ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="3" v-if="ipt.evtType1!='其他'">
            <h3 class="mt-1" ><v-icon class="mr-1 mb-1">mdi-chevron-right</v-icon>事故種類</h3>
            <v-select clearable
                v-model="ipt.evtType2"
                :items="evtTypeOpts"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-cellphone-link-off</v-icon>設備受損情形
            </h3>
            <v-text-field
                v-model.trim="ipt.eqLoss"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-alert-decagram</v-icon>運轉影響情形
            </h3>
            <v-text-field
                clearable
                v-model.trim="ipt.serviceShock"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>處置過程
            </h3>
            <v-text-field
                clearable
                v-model.trim="ipt.handle"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>檢討過程
            </h3>
            <v-text-field
                clearable
                v-model.trim="ipt.review"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>原因分析
            </h3>
            <v-text-field
                clearable
                v-model.trim="ipt.reason"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>備註
            </h3>
            <v-text-field
                clearable
                v-model.trim="ipt.note"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>事故事件狀態
            </h3>
            <v-select
                v-model="ipt.status"
                :items="accidentEventStatus"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12">
            <v-btn dark large class="mr-3 mb-4 mb-sm-0 btn-search"
                @click="search"
            >
                <v-icon>mdi-magnify</v-icon>查詢
            </v-btn>

            <v-btn dark large class="mr-3 mb-4 mb-sm-0 btn-add"
                to="/smis/car-accident-event/add" v-if="isShowBtn"
            >
                <v-icon>mdi-plus</v-icon>新增
            </v-btn>

            <v-btn elevation="2" large class="mr-3 mb-4 mb-sm-0 btn-clear"
                @click="reset"
            >
                <v-icon>mdi-reload</v-icon>清除搜尋內容
            </v-btn>

            <v-btn elevation="2" dark large class="mr-3 mb-4 mb-sm-0 btn-fileup"
                target="_blank"
                to="/smis/car-accident-event/del-recovery"
            >
                <v-icon>mdi-alert-circle</v-icon>作廢復原
            </v-btn>
        </v-col>
                
        <!-- 表格資料 -->
        <v-col cols="12">
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

                    <!-- <template v-slot:item.location="{ item }">
                        {{ locationOpts.find(ele => ele.value == item.FindLine).text }}
                        {{ (item.FindLine == 'other')? `(${item.FindLineOther})` : '' }}
                        {{ (['l1', 'l2', 'l3', 'l4'].includes(item.FindLine))? `(${item.LineK}K+${item.LineM}M)` : '' }}
                    </template> -->
                    
                    <template v-slot:item.type="{ item }">
                        {{ opsList.find(ele => ele.Code == item.AccidentType).Name.replace('率', '')}}
                    </template>

                    <template v-slot:item.hurtPeople="{ item }">
                        {{ (item.HurtPeopleCount == 'F')? '未填寫' : item.hurt_people_count }}
                    </template>

                    <template v-slot:item.status="{ item }">
                        {{ accidentEventStatus.find(ele => ele.value == item.AccidentStatus).text }}
                    </template>

                    <template v-slot:item.content="{ item }">
                        <v-btn small dark fab class="btn-detail"
                            :loading="isLoading"
                            @click="redirect(item)"
                        >
                            <v-icon dark>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

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

        <!-- 趨勢圖 -->
        <v-col cols="12" class="mt-8" v-if="false">
            <v-card class="mx-auto">
                <v-card-title class="gradual-bg-darken-wood py-2 px-3">
                    <v-icon class="mr-2">mdi-chart-areaspline</v-icon>
                    <strong>統計趨勢圖</strong>
                </v-card-title>

                <v-list class="pa-0">
                    <v-list-item to="/smis/car-accident-event/maintype-chart">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        各大類事故事件趨勢圖
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/car-accident-event/majortype-chart">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        重大事故類事故事件趨勢圖
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/car-accident-event/generaltype-chart">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        一般事故類事故事件趨勢圖
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/car-accident-event/abnormaltype-chart">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        異常事件類事故事件趨勢圖
                    </v-list-item>
                </v-list>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { canInUpdate } from '@/apis/access'
import { getNowFullTime } from '@/assets/js/commonFun'
import { carAccidentEventStatus, evtTypes, locationOpts } from '@/assets/js/smisData'
import Pagination from '@/components/Pagination.vue'
import { fetchList, fetchEvtTypes } from '@/apis/smis/carAccidentEvent'

export default {
    data: () => ({
        ipt: {},
        arr1: [], // 重大事故
        arr2: [], // 一般事故
        arr3: [], // 異常事件
        FirstLvFiltered: [], // 事故類型第一層
        dateAMax: new Date().toISOString().substr(0, 10),
        dateBMin: '',
        opsList: '', // 完整事故類型清單
        isShowBtn: false, // 按鈕是否顯示(依權限)
        defaultIpt: {
            location: '', // 發生地點
            dateStart:  '',  // 發生日期(起)
            dateEnd: new Date().toISOString().substr(0, 10),  // 發生日期(迄)
            evtType1: '', // 事故類型1
            evtType2: '', // 事故類型2
            eqLoss: '',// 設備受損情形
            serviceShock: '', // 運轉影響情形
            handle: '', // 處置過程
            review: '', // 檢討過程
            reason: '', // 原因分析
            note: '', // 備註
            status: '',  // 事故事件狀態
        },
        dateMenuShow: {  // 日曆是否顯示
            start: false,
            end: false,
        },
        evtTypeOptsForm: evtTypes, // 對照表事故類型
        evtTypeOpts: [],  // 事故類型
        locationOpts: locationOpts,  // 事故發生地點
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '編號', value: 'AccidentCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 150 },
            { text: '發生日期', value: 'convert_findDate', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 120 },
            { text: '發生地點', value: 'FindLine', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 160 },
            { text: '事故類型', value: 'type', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 220 },
            { text: '傷亡人數', value: 'hurtPeople', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
            { text: '事故事件狀態', value: 'status', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 140 },
            { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
        ],
        accidentEventStatus: carAccidentEventStatus,  // 表格顯示的行車事故事件狀態
        isLoading: false,  // 是否讀取中
    }),
    components: { Pagination },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
            groupData: state => state.groupData,
        }),
    },
    methods: {
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        ...mapActions('user', [
            'saveUserGroup',  // 儲存使用者權限(群組)資料
        ]),
        // 清除搜尋內容
        reset() {
            this.ipt = { ...this.defaultIpt }
        },
        evtTypeChange(){
            this.ipt.evtType2 = ''
            if(this.ipt.evtType1 == this.FirstLvFiltered[0]){
                this.evtTypeOpts = this.arr1
            }
            else if(this.ipt.evtType1 == this.FirstLvFiltered[1]){
                this.evtTypeOpts = this.arr2
            }
            else if(this.ipt.evtType1 == this.FirstLvFiltered[2]){
                this.evtTypeOpts = this.arr3
            }
            else{
                this.ipt.evtType2 = ''
            }
        },
        timeA(){
            this.dateMenuShow.start = false
            this.dateBMin = this.ipt.dateStart
        },
        timeAClean(){
            this.dateBMin = ''
        },
        timeB(){
            this.dateMenuShow.end = false
            this.dateAMax = this.ipt.dateEnd
        },
        timeBClean(){
            this.dateAMax = ''
        },
        // 搜尋
        search() {
            if(this.ipt.evtType1 == undefined) this.ipt.evtType1 = ''
            if(this.ipt.evtType2 == undefined) this.ipt.evtType2 = ''
            if(this.ipt.dateStart == null) this.ipt.dateStart = ''
            if(this.ipt.dateEnd == null) this.ipt.dateEnd = ''

            // v-model="ipt.evtType2"
            //     :items="evtTypeOpts"
            // let searchType = this.evtTypeOpts.find

            this.chLoadingShow({show:true})
            this.pageOpt.page = 1  // 頁碼初始化

            fetchList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_AccidentEventData',  // DB table
                KeyItem: [
                    { tableColumn: 'CreateDTime_Start', columnValue: this.ipt.dateStart },  // 發生日期(起) ipt.evtType2
                    { tableColumn: 'CreateDTime_End', columnValue: this.ipt.dateEnd },  // 發生日期(迄)
                    { tableColumn: 'DeviceLost', columnValue: this.ipt.eqLoss },  // 設備受損情形
                    { tableColumn: 'OperationLost', columnValue: this.ipt.serviceShock },  // 運轉影響情形
                    { tableColumn: 'ReviewProcess', columnValue: this.ipt.handle },  // 處置過程
                    { tableColumn: 'CauseAnaly', columnValue: this.ipt.reason },  // 原因分析
                    { tableColumn: 'RemarkDesp', columnValue: this.ipt.note },  // 備註說明
                    { tableColumn: 'AccidentStatus', columnValue: this.ipt.status },  // 事故事件狀態
                ],
                QyName: [    // 欲回傳的欄位資料
                    'AccidentCode',
                    'AccidentFindDate',
                    'FindLine',
                    'LineK',
                    'LineM',
                    'FindLineOther',
                    'AccidentType',
                    'HurtPeopleCount',
                    'AccidentStatus',
                    'DelStatus',
                    'CancelStatus',
                ],
            }).then(res => {
                this.tableItems = [...[]]
                let tempTable = JSON.parse(res.data.order_list)
                tempTable.forEach(element => {
                    for(let ele in element){
                        if(element[ele] == null){
                            element[ele] = '';
                        }
                    }
                    // 解決AccidentType有空字串問題:
                    // if(element.AccidentType == '') element.AccidentType = 'Other'

                    // 組合發生地點文字 AccidentCode
                    
                    let findLocationText = locationOpts.find(item => item.value == element.FindLine).text
                    
                    if (['l1', 'l2', 'l3', 'l4'].includes(element.FindLine)) {
                        findLocationText += ` (${element.LineK}K+${element.LineM}M)`  // 本線、祝山線、眠月線、水山線
                        
                    } else if(element.FindLine == 'other') {
                        findLocationText += ` (${element.FindLineOther})`  // 其他地點
                    } else if(element.FindLine == '') {
                        findLocationText = element.FindLineOther
                    }
                    element.FindLine = findLocationText

                    // 事故類型篩選
                    if(this.ipt.evtType1 == '' && this.ipt.evtType2 == ''){ // 無篩選
                        this.tableItems.push(element)
                    }
                    else if(this.ipt.evtType1 != '' && this.ipt.evtType2 == ''){ // 篩選只選第一個
                        let type1 = this.opsList.find(ele => ele.Code == element.AccidentType).Name.replace('率', '')
                        type1 = type1.substr(0, type1.indexOf('-'))
                        if(type1 == this.ipt.evtType1){
                            this.tableItems.push(element)
                        }
                    }
                    else{ // 篩選都有選
                        let type2 = this.opsList.find(ele => ele.Code == element.AccidentType).Name.replace('率', '')
                        if(type2 == this.ipt.evtType1 + '-' + this.ipt.evtType2){
                            this.tableItems.push(element)
                        }
                    }
                    // opsList.find(ele => ele.Code == item.AccidentType).Name.replace('率', '')
                });
                //splice
                // this.tableItems.splice(1, 3);

            }).catch(err => {
                //console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow({show:false})
            })
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 重新導向 (依事故事件狀態)
        redirect(item) {
            let routeData = this.$router.resolve({ path: `/smis/car-accident-event/${item.AccidentCode}/show` })
            window.open(routeData.href, '_blank')
        },
    },
    created() {
        canInUpdate({
            ClientReqTime: getNowFullTime(),  // client 端請求時間
            OperatorID: this.userData.UserId,  // 操作人id
        }).then(res => {
            if (res.data.ErrorCode == 0) {
                this.saveUserGroup(res.data.GroupData)
                this.isShowBtn = this.groupData.RoleLv2 == "T"
            }
        }).catch( err => {
            //console.log(err)
        }).finally(() => {
        })

        // 初始化事故類型 fetchEvtTypes
        this.chLoadingShow({show:true})
        fetchEvtTypes({
            OperatorID: this.userData.UserId,  // 事故事件編號 (從路由參數抓取)
            ClientReqTime: getNowFullTime(),  // client 端請求時間
        }).then(res => {
            if (res.data.ErrorCode == 0) {
                    //抽離 其他
                    this.opsList = JSON.parse(res.data.order_list)
                    let tempOps = this.opsList.map(e=>e.text)
                    let firstLv = [];
                    tempOps.forEach(element => { 
                        if(element.indexOf("-") >= 0) firstLv.push((element.split('-'))[0])
                    });
                    this.FirstLvFiltered = [...new Set(firstLv)]
                    this.FirstLvFiltered.push("其他")
                    tempOps.forEach(e => {
                        if(e.indexOf("-") >= 0){
                            let arr = e.split('-')
                            firstLv.push(arr[0])
                            arr[1] = arr[1].replace('率', '')
                            if(arr[0] == this.FirstLvFiltered[0]){
                                this.arr1.push(arr[1])
                            }
                            else if(arr[0] == this.FirstLvFiltered[1]){
                                this.arr2.push(arr[1])
                            }
                            else if(arr[0] == this.FirstLvFiltered[2]){
                                this.arr3.push(arr[1])
                            }
                        }
                        // evtTypeOpts
                    });
                } else {
                    // 請求發生問題時(ErrorCode 不為 0 時)，重導至錯誤訊息頁面
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
        }).catch(err => {
            //console.log(err)
            alert('伺服器發生問題，事故類型讀取失敗')
        }).finally(() => {
            this.chLoadingShow({show:false})
        })

        this.reset()
    }
}
</script>