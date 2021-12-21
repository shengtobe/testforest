<template>
<v-container style="max-width: 1200px" class="label-header">
    <h2 class="mb-4 label-title">管理安全資訊</h2>

    <v-row class="px-2 mb-8">
        <v-col cols="12" sm="8" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>通報主題
            </h3>
            <v-text-field
                clearable
                v-model.trim="ipt.title"
                solo
                placeholder="請輸入關鍵字"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-bank</v-icon>通報單位
            </h3>
            <v-select
                v-model="ipt.depart"
                :items="departOpts"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>發布日期(起)
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
                    locale="zh-tw"
                    @input="timeA"
                    :max="dateAMax"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>發布日期(迄)
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
                    locale="zh-tw"
                    @input="timeB"
                    :min="dateBMin"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>發布狀態
            </h3>
            <v-select
                v-model="ipt.status"
                :items="statusOpts"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="8" md="9" align-self="end" class="mb-5 text-md-right">
            <v-btn large class="mr-3 mb-3 btn-search white--text"
                @click="search"
            >
                <v-icon>mdi-magnify</v-icon>查詢
            </v-btn>

            <v-btn dark large class="mr-3 mb-3 btn-add"
                to="/smis/car-safeinfo/info-add" v-if="false"
            >
                <v-icon>mdi-plus</v-icon>新增
            </v-btn>

            <v-btn elevation="2" large class="mb-3 btn-clear"
                @click="reset"
            >
                <v-icon>mdi-reload</v-icon>清除搜尋內容
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

                    <template v-slot:item.SaftyInfoStatus="{ item }">
                        {{ transferStatusText(item.SaftyInfoStatus) }}
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn small dark fab class="btn-detail"
                            :loading="isLoading"
                            @click="redirect(item)"
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
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Pagination from '@/components/Pagination.vue'
import { getNowFullTime } from '@/assets/js/commonFun'
import { departOptions } from '@/assets/js/departOption'
import { safetyinfoquery, safetyinfocreate } from '@/apis/smis/carSafeInfo'

export default {
    data: () => ({
        ipt: {
            dateStart:  new Date().toISOString().substr(0, 10),  // 限制日期(起)
            dateEnd: new Date().toISOString().substr(0, 10),  // 限制日期(迄)
            title: '', //通報主題
            status: '', //發布狀態
            depart: '', //通報單位
        },
        defaultIpt: {
            title: '',  // 通報主題
            dateStart:  '',  // 發布日期(起)
            dateEnd: new Date().toISOString().substr(0, 10),  // 發布日期(迄)
            depart: '',  // 通報單位
            status: '',  // 發布狀態
        },
        dateMenuShow: {  // 日曆是否顯示
            start: false,
            end: false,
        },
        dateAMax: new Date().toISOString().substr(0, 10),
        dateBMin: '',
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '編號', value: 'SaftyInfoCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '通報主題', value: 'InfoTitle', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '通報單位', value: 'creat_depart_name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '通報人', value: 'creator_name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '發布狀態', value: 'SaftyInfoStatus', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '發布日期', value: 'convert_findDate', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '檢視', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        ],
        departOpts: [  // 通報單位下拉選單
            { text: '不限', value: '' },
            ...departOptions,
        ],
        statusOpts: [
            { text: '不限', value: '' },
            { text: '已立案', value: 1 },
            { text: '審核中', value: 2 },
            { text: '加會中', value: 3 },
            { text: '已發布', value: 4 },
        ],
        isLoading: false,  // 是否讀取中
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
        // 清除搜尋內容
        reset() {
            this.ipt = { ...this.defaultIpt }
            this.search()
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
            if(this.ipt.dateStart == null) this.ipt.dateStart = ''
            if(this.ipt.dateEnd == null) this.ipt.dateEnd = ''
            this.chLoadingShow({ show: true})
            this.pageOpt.page = 1  // 頁碼初始化
            safetyinfoquery({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_SaftyInfomation',  // DB table
                KeyItem: [
                     { tableColumn: 'CreateDTime_Start', columnValue: this.ipt.dateStart },  // 日期(起)
                     { tableColumn: 'CreateDTime_End', columnValue: this.ipt.dateEnd},  // 日期(迄) 
                     { tableColumn: 'InfoTitle', columnValue: this.ipt.title},  // 通報主題
                     { tableColumn: 'SaftyInfoStatus', columnValue: this.ipt.status},  // 發布狀態
                     { tableColumn: 'PeopleRootDepart', columnValue: this.ipt.depart},  // 通報單位                    
                ],
                QyName: [    // 欲回傳的欄位資料
                    'SaftyInfoCode',
                    'PeopleID',
                    'InfoTitle',
                    'SaftyInfoStatus',
                    'InsertDTime',
                    'PeopleRootDepart',              
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
                this.chLoadingShow({ show: false})
            })
            // 新增測試用資料
            // setTimeout(() => {
            //     this.tableItems = [
            //         {
            //             id: '111',
            //             title: '3月份團康活動',
            //             depart: '綜合企劃科',
            //             name: '王小明',
            //             date: '2020-02-03',
            //             status: 1,
            //         },
            //         {
            //             id: '222',
            //             title: '售票注意事項宣導',
            //             depart: '鐵路服務科',
            //             name: '陳志揚',
            //             date: '2020-01-20',
            //             status: 2,
            //         },
            //         {
            //             id: '333',
            //             title: '年中車輛保養行程表',
            //             depart: '車輛養護科',
            //             name: '林家豪',
            //             date: '2020-01-15',
            //             status: 3,
            //         },
            //         {
            //             id: '444',
            //             title: '阿里山站售票大廳電燈更換',
            //             depart: '鐵路服務科',
            //             name: '趙永智',
            //             date: '2020-01-09',
            //             status: 4,
            //         },
            //     ]
            //     this.chLoadingShow({show:true})
            // }, 1000)
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 轉換事故事件狀態文字
        transferStatusText(status) {
            switch(status) {
                case '1':
                    return '已立案'
                    break
                case '2':
                    return '審核中'
                    break
                case '3':
                    return '加會中'
                    break
                case '4':
                    return '已發布'
                    break
                default:
                    break
            }
        },
        // 重新導向 (依事故事件狀態)
        redirect(item) {
            switch(item.SaftyInfoStatus) {
                case '1':  // 已立案
                    sessionStorage.itemStatus = '1'
                    break
                case '2':  // 審核中
                    sessionStorage.itemStatus = '2'
                    break
                case '3':  // 加會中
                    sessionStorage.itemStatus = '3'
                    break
                case '4': // 已發布
                    sessionStorage.itemStatus = '4'
                    break
                default:
                    break
            }

            // this.$router.push({ path: `/smis/car-safeinfo/info/${item.SaftyInfoCode}/show` })
            let routeData = this.$router.resolve({ path: `/smis/car-safeinfo/info/${item.SaftyInfoCode}/show` })
            window.open(routeData.href, '_blank')
        },
    },
    created() {
        this.reset()
    }
}
</script>