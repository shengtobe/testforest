<template>
<v-container style="max-width: 1200px" class="label-header">
    <h2 class="mb-4 label-title">管理慢行通報</h2>

    <v-row class="px-2 mb-8">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>限制日期(起)
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
                    :max="dateAMax"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>限制日期(迄)
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

        <v-col cols="12" md="6" align-self="center" class="mb-8 mb-md-0">
            <v-btn dark large
                @click="search"
                class="mr-3 btn-search"
            >
                <v-icon>mdi-magnify</v-icon>查詢
            </v-btn>

            <v-btn class="btn-add" dark large v-if="false"
                to="/smis/car-safeinfo/crawl-notify-add"
            >
                <v-icon>mdi-plus</v-icon>新增
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
                    
                    <template v-slot:item.line="{ item }">
                        {{ ReportLineList.find(ele => ele.value == item.ReportLine).text }}
                    </template>

                    <template v-slot:item.location="{ item }">
                        {{ `${item.LimitStart} ~ ${item.LimitEnd} km` }}
                    </template>

                    <template v-slot:item.normal="{ item }">
                        {{ item.NormalLimit }} km/h
                    </template>

                    <template v-slot:item.slow="{ item }">
                        {{ item.SlowLimit }} km/h
                    </template>

                    <template v-slot:item.date="{ item }">
                        {{ `${item.convert_Date_Start} ~ ${item.convert_Date_End}` }}
                    </template>

                    <template v-slot:item.SlowSpeedStatus="{ item }">
                        {{ transferStatusText(item.SlowSpeedStatus) }}
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn title="讀取追蹤" fab small dark  class="mr-2 btn-memo"
                            :to="`/smis/car-safeinfo/crawl-notify/${item.SlowReportCode}/read-track`"
                        >
                            <v-icon>mdi-radar</v-icon>
                        </v-btn>

                        <v-btn title="查看" fab small class="mr-2 btn-modify white--text"
                            target="_blank"
                            :to="`/smis/car-safeinfo/crawl-notify/${item.SlowReportCode}/edit`"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>

                        <v-btn title="解除" fab small class="btn-delete white--text"
                            :disabled="item.isStop"
                            @click="stop(item.SlowReportCode)"
                        >
                            <v-icon>mdi-share</v-icon>
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
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { locationOpts } from '@/assets/js/smisData'
import { getNowFullTime } from '@/assets/js/commonFun'
import Pagination from '@/components/Pagination.vue'
import { fetchList, deleteRegul } from '@/apis/smis/carSafeInfo'

export default {
    data: () => ({
        ipt: {
            dateStart:  '',  // 限制日期(起)
            dateEnd: new Date().toISOString().substr(0, 10),  // 限制日期(迄)
        },
        dateMemuShow: {  // 日曆是否顯示
            start: false,
            end: false,
        },
        
        dateAMax: new Date().toISOString().substr(0, 10),
        dateBMin: '',
        ReportLineList: locationOpts,
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位 SlowSpeedStatus
            { text: '編號', value: 'SlowReportCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '路線', value: 'line', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '速限起點、終點', value: 'location', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '常態速限', value: 'normal', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '慢行速限', value: 'slow', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '限制日期', value: 'date', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '通報人', value: 'pose_name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '通報狀態', value: 'SlowSpeedStatus', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '讀取追蹤、查看、解除', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        ],
    }),
    components: { Pagination },  // 頁碼
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        timeA(){
            this.dateMemuShow.start = false
            this.dateBMin = this.ipt.dateStart
        },
        timeAClean(){
            this.dateBMin = ''
        },
        timeB(){
            this.dateMemuShow.end = false
            this.dateAMax = this.ipt.dateEnd
        },
        timeBClean(){
            this.dateAMax = ''
        },
        // 搜尋
        search() {
            this.chLoadingShow({show:true})
            this.pageOpt.page = 1  // 頁碼初始化
            if(this.ipt.dateStart == null) this.ipt.dateStart = '';
            if(this.ipt.dateEnd == null) this.ipt.dateEnd = '';

             fetchList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_SlowSpeedReport',  // DB table
                KeyItem: [
                     { tableColumn: 'CreateDTime_Start', columnValue: this.ipt.dateStart },  // 日期(起)
                     { tableColumn: 'CreateDTime_End', columnValue: this.ipt.dateEnd},  // 日期(迄)                   
                ],
                QyName: [    // 欲回傳的欄位資料
                    'PeopleId',
                    'LimitStart',
                    'LimitEnd',
                    'NormalLimit',
                    'SlowLimit',
                    'LimitStartDate',
                    'LimitEndDate',  
                    'ReportLine',  
                    'SlowReportCode',               
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
            }).catch(err => {
                //console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow({show:false})
            })
            // 新增測試用資料
            // setTimeout(() => {
            //     this.tableItems = [
            //         {
            //             id: '111',
            //             line: '本線',
            //             pointStart: '5.7',
            //             pointEnd: '8',
            //             normal: '70',
            //             slow: '50',
            //             dateStart: '2019-05-10',
            //             dateEnd: '2019-05-22',
            //             creater: '王小明',
            //             isStop: false,  // 是否解除
            //         },
            //         {
            //             id: '222',
            //             line: '眠月線',
            //             pointStart: '210.3',
            //             pointEnd: '211.5',
            //             normal: '60',
            //             slow: '45',
            //             dateStart: '2019-06-13',
            //             dateEnd: '2019-06-30',
            //             creater: '王小明',
            //             isStop: true,  // 是否解除
            //         },
            //         {
            //             id: '333',
            //             line: '本線',
            //             pointStart: '33',
            //             pointEnd: '35.2',
            //             normal: '70',
            //             slow: '60',
            //             dateStart: '2019-10-01',
            //             dateEnd: '2019-10-20',
            //             creater: '王小明',
            //             isStop: false,  // 是否解除
            //         },
            //     ]
            //     this.chLoadingShow({show:true})
            // }, 1000)
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        transferStatusText(status) {
            switch(status) {
                case '1':
                    return '已立案'
                case '2':
                    return '審核中'
                case '3':
                    return '已發布'
                default:
                    return '不明'
                    break
            }
        },
        // 解除
        stop(SlowReportCode) {
            if (confirm('解除會發通知給所有收件人，並且之後無法再編輯，你確定要解除嗎?')) {
                this.chLoadingShow({show:true})
                deleteRegul({
                    SlowSpeedCode: SlowReportCode,  // 編號
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        let idx = this.tableItems.findIndex(item => item.SlowReportCode == SlowReportCode)
                        this.tableItems.splice(idx, 1)
                        this.chMsgbar({ success: true, msg: '解除成功' })
                    } else {
                        this.chMsgbar({ success: false, msg: '解除失敗' })
                    }
                }).catch(err => {
                    //console.log(err)
                    this.chMsgbar({ success: false, msg: '伺服器發生問題' })
                }).finally(() => {
                    this.chLoadingShow({show:false})
                })

                // setTimeout(() => {
                //     let idx = this.tableItems.findIndex(item => item.id == id)
                //     this.tableItems[idx].isStop = true  // 把解除按鈕 disabled 掉
                //     this.chMsgbar({ success: true, msg: '解除成功'})
                //     this.chLoadingShow({show:true})
                // }, 1000)
            }
        },
    },
    created() {
        this.search()
    },
}
</script>