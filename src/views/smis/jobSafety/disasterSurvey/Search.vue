<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">職災事故事件查詢</h2>

    <v-row class="px-2 mb-8 label-header">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>發生日期(起)
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
                        v-model.trim="searchIpt.dateStart"
                        solo
                        v-on="on"
                        readonly
                        clearable
                        @click:clear="timeAClean"
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="primary"
                    v-model="searchIpt.dateStart"
                    @input="timeA"
                    :max="dateAMax"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>發生日期(迄)
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
                        v-model.trim="searchIpt.dateEnd"
                        solo
                        v-on="on"
                        readonly
                        clearable
                        @click:clear="timeBClean"
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="primary"
                    v-model="searchIpt.dateEnd"
                    @input="timeB"
                    :min="dateBMin"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-account</v-icon>罹災者姓名
            </h3>
            <v-text-field
                v-model.trim="searchIpt.name"
                solo
                placeholder="請輸入性名"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-bank</v-icon>工作部門
            </h3>
            <v-select
                v-model="searchIpt.workDepart"
                :items="opts.depart"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-code</v-icon>事故編號
            </h3>
            <v-text-field
                v-model.trim="searchIpt.number"
                solo
                placeholder="請輸入事故編號"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>事故狀態
            </h3>
            <v-select
                v-model="searchIpt.status"
                :items="opts.status"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12">
            <v-btn dark large class="ma-2 btn-search"
                @click="search"
            >
                <v-icon class="mr-1">mdi-magnify</v-icon>查詢
            </v-btn>

            <v-btn elevation="2" large class="ma-2 btn-clear"
                @click="reset"
            >
                <v-icon class="mr-1 btn-clear">mdi-reload</v-icon>清除搜尋內容
            </v-btn>

            <v-btn elevation="2" large class="ma-2 btn-memo white--text"
                to="/smis/jobsafety/month-record"
            >
                <v-icon class="mr-1">mdi-view-list</v-icon>職災紀錄表
            </v-btn>
        </v-col>

        <!-- 表格資料 -->
        <v-col cols="12" class="mt-8">
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

                    <!-- <template v-slot:item.status="{ item }">
                        {{ transferStatusText(item.status) }}
                    </template> -->

                    <template v-slot:item.status="{ item }">
                        <span>{{ opts.status.find(ele => ele.value == item.AccidentStatus).text }}</span>
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
    </v-row>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { jobDisasterSurveyStatus } from '@/assets/js/smisData'
import { getNowFullTime } from '@/assets/js/commonFun'
import { dapartOptsBrief } from '@/assets/js/departOption'
import Pagination from '@/components/Pagination.vue'
import { searchData } from '@/apis/smis/jobSafety'

export default {
    data: () => ({
        searchIpt: {},
        searchDefault: {
            dateStart: '',  // 發生日期(起)
            dateEnd: new Date().toISOString().substr(0, 10),  // 發生日期(迄)
            name: '',  // 罹災者姓名
            workDepart: '',  // 工作部門
            number: '',  // 事故編號
            status: '',  // 事故狀態
        },
        dateAMax: new Date().toISOString().substr(0, 10),
        dateBMin: '',
        dateMemuShow: {
            start: false,
            end: false,
        },
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '編號', value: 'AccidentCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '發生部門', value: 'HappenDepart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '罹災者姓名', value: 'HurtPeopleName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '發生日期', value: 'HappenDate', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '狀態', value: 'status', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        ],
        emptyDepart:[{ text:'不限', value:''}],
        opts: {
            depart: dapartOptsBrief ,  // 部門
            status: [  // 事故事件狀態 (審核中有二個，故傳中文值讓後端判斷)
                { text: '不限', value: '' },
                ...jobDisasterSurveyStatus,
                { text: '已作廢', value: '已作廢' },
                // { text: '已立案', value: '已立案' },
                // { text: '已完備資料', value: '已完備資料' },
                // { text: '改善措施已落實', value: '改善措施已落實' },
                // { text: '審核中', value: '審核中' },
            ],
        },
        isLoading: false,  // 是否讀取中
    }),
    components: { Pagination },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
    methods: {
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 清除搜尋內容
        reset() {
            this.searchIpt = { ...this.searchDefault }
        },
        timeA(){
            this.dateMemuShow.start = false
            this.dateBMin = this.searchIpt.dateStart
        },
        timeAClean(){
            this.dateBMin = ''
        },
        timeB(){
            this.dateMemuShow.end = false
            this.dateAMax = this.searchIpt.dateEnd
        },
        timeBClean(){
            this.dateAMax = ''
        },
        // 搜尋
        search() {
            this.chLoadingShow({show:true})
            this.pageOpt.page = 1  // 頁碼初始化

            searchData({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                IsFirstLoad: false,
                KeyName: 'SMS_JobAccidentSurvey',  // DB table
                KeyItem: [
                    { tableColumn: 'AccidentCode', columnValue: this.searchIpt.number },  //
                    // { tableColumn: 'DeviceTitle', columnValue: this.controlSearch.subject },  // 措施簡述
                ],
                QyName: [    // 欲回傳的欄位資料
                    // 'EndangerCode',
                    // 'EndangerStatus',
                    // 'OperationMode',
                    // 'RiskSerious',
                    // 'RiskFreq',
                    // 'RiskLevel',
                    // 'DelStatus',
                    // 'CancelStatus',
                    // 'InsertDTime',
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
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        
        // 重新導向 (依結案狀態)
        redirect(item) {
            //開新分頁
            let routeData = this.$router.resolve({ path: `/smis/jobsafety/disaster-survey/${item.AccidentCode}/show` })
            window.open(routeData.href, '_blank')
        },
    },
    created() {
        this.opts.depart = [...this.emptyDepart,...dapartOptsBrief]
        this.searchIpt = { ...this.searchDefault }
        this.search()
    },
}
</script>