<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">健檢管理查詢</h2>

    <v-row class="px-2 mb-8">

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-bank</v-icon>部門
            </h3>
            <v-select
                v-model="searchIpt.DepartCode"
                :items="opts.depart"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-account</v-icon>姓名
            </h3>
            <v-text-field
                v-model.trim="searchIpt.Name"
                solo
                placeholder="請輸入姓名"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-clipboard-text</v-icon>職務
            </h3>
            <v-select
                v-model="searchIpt.JobName"
                :items="opts.job"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-clipboard-text</v-icon>是否在職
            </h3>
            <v-select
                v-model="searchIpt.Onduty"
                :items="opts.onJob"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-lightbulb-on</v-icon>健檢提醒
            </h3>
            <v-select
                v-model="searchIpt.CheckStatus"
                :items="opts.remind"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>年度
            </h3>
            <v-text-field
                v-model.trim="searchIpt.CheckYear"
                solo
                placeholder="請輸入西元年，例：2020"
            ></v-text-field>
        </v-col>

        <v-col cols="12">
            <v-btn color="success" large class="my-2 mr-2"
                @click="search"
            >
                <v-icon>mdi-magnify</v-icon>查詢
            </v-btn>

            <v-btn color="indigo" dark large class="ma-2"
                @click="add"
            >
                <v-icon>mdi-plus</v-icon>新增
            </v-btn>

            <v-btn elevation="2" large class="ma-2"
                @click="reset"
            >
                <v-icon>mdi-reload</v-icon>清除搜尋內容
            </v-btn>
        </v-col>

        <!-- 表格資料 -->
        <v-col cols="12" class="mt-5 mt-md-0">
            <v-card>
                <v-data-table
                    :headers="headers"
                    :items="tableItems"
                    :options.sync="pageOpt"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:loading>
                        <span class="red--text subtitle-1">資料讀取中...</span>
                    </template>

                    <template v-slot:item.NextCheck="{ item }">
                        {{ (item.NextCheck == 'T')? '須健檢' : '不須健檢' }}
                    </template>

                    <template v-slot:item.Onduty="{ item }">
                        {{ (item.Onduty == 'T')? '在職' : '已離職' }}
                    </template>

                    <template v-slot:item.HealthResultLevel="{ item }">
                        {{ item.HealthResultLevel }}級
                    </template>

                    <template v-slot:item.HealthChkStatus="{ item }">
                        <template v-if="item.HealthChkStatus == 'T'">
                            <v-icon color="green">mdi-check</v-icon>
                        </template>
                    </template>

                    <template v-slot:item.TrackStatus="{ item }">
                        <template v-if="item.TrackStatus == 'T'">
                            <v-icon color="green">mdi-check</v-icon>
                        </template>
                    </template>

                    <template v-slot:item.Memo="{ item }">
                        <v-btn color="teal" dark
                            @click="showContent(item.Memo)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.link="{ item }">
                        <v-btn small dark fab color="purple"
                            target="_blank"
                            :to="`/smis/jobsafety/physical/${item.ID}/list`"
                        >
                            <v-icon dark>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn fab small color="primary"
                            class="mr-3"
                            @click="goedit(item)"
                        >
                            <v-icon>mdi-pen</v-icon>
                        </v-btn>

                        <v-btn fab small color="error"
                            @click="openDel(item)"
                        >
                            <v-icon>mdi-delete</v-icon>
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
    <!-- 表單 -->
    <v-dialog v-model="dialog" max-width="700px">
        <v-card>
            <v-card-title class="light-blue darken-1 white--text px-4 py-1">
                編輯資料
                <v-spacer></v-spacer>
                <v-btn dark fab small text @click="dialog = false" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text class="px-6 py-4">
                <v-row>
                    <v-col cols="12">
                        <h3 class="mb-1">
                            <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>備註
                        </h3>
                        <v-text-field
                            v-model.trim="ipt.Memo"
                            solo
                            placeholder="請輸入備註"
                            hide-details
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-row no-gutters>
                            <v-col cols="6" sm="3">
                                <v-checkbox
                                    v-model="ipt.HealthChkStatus"
                                    label="衛教"
                                    color="blue"
                                    hide-details
                                ></v-checkbox>
                            </v-col>

                            <v-col cols="6" sm="3">
                                <v-checkbox
                                    v-model="ipt.TrackStatus"
                                    label="追蹤"
                                    color="blue"
                                    hide-details
                                ></v-checkbox>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
            
            <v-card-actions class="px-5 pb-5">
                <v-spacer></v-spacer>
                <v-btn class="mr-2" elevation="4"  :loading="isLoading" @click="dialog = false">取消</v-btn>
                <v-btn color="success" elevation="4"  :loading="isLoading" @click="gosave">送出</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="delDialog" max-width="350px">
        <v-card>
            <v-card-title class="red white--text px-4 py-1 headline"
            >確認是否刪除?</v-card-title
            >
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="delDialog=false">取消</v-btn>
            <v-btn color="red" class="white--text" @click="godel">刪除</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { fetchOrganization } from '@/apis/organization'
import { getNowFullTime } from '@/assets/js/commonFun'
import Pagination from '@/components/Pagination.vue'
import { healthList, healthUpdate, healthUpdateStatus } from '@/apis/smis/health'

export default {
    data: () => ({
        sid: {},
        searchIpt: {},
        defaultSearchIpt: {
            FlowId:'',
            DepartCode: '',  // 部門
            Depart: '',
            Name: '',  // 姓名
            ID: '',
            JobName: '',  // 職務
            Onduty: 'N',  // 是否在職
            CheckStatus: 'N',  // 健檢提醒
            CheckYear: '',  // 年度
        },
        opts: {  // 下拉選單
            depart: [  // 部門
                { text: '不限', value: '' },
            ],
            job: [  // 職務
                { text: '不限', value: '' },
                { text: '人事室主任',value: '人事室主任' },
                { text: '工友',value: '工友' },
                { text: '工程士',value: '工程士' },
                { text: '工程員',value: '工程員' },
                { text: '主任',value: '主任' },
                { text: '司機員',value: '司機員' },
                { text: '列車長',value: '列車長' },
                { text: '安全衛生管理員',value: '安全衛生管理員' },
                { text: '行政助理',value: '行政助理' },
                { text: '行政專員',value: '行政專員' },
                { text: '助理工程員',value: '助理工程員' },
                { text: '助理員',value: '助理員' },
                { text: '技士',value: '技士' },
                { text: '技正',value: '技正' },
                { text: '技佐',value: '技佐' },
                { text: '技術士',value: '技術士' },
                { text: '政風室主任',value: '政風室主任' },
                { text: '科長',value: '科長' },
                { text: '科員',value: '科員' },
                { text: '約僱助理',value: '約僱助理' },
                { text: '書記',value: '書記' },
                { text: '秘書',value: '秘書' },
                { text: '站務士',value: '站務士' },
                { text: '站務員',value: '站務員' },
                { text: '副處長',value: '副處長' },
                { text: '專員',value: '專員' },
                { text: '處長',value: '處長' },
                { text: '管理師',value: '管理師' },
                { text: '調度員',value: '調度員' },
                { text: '辦事員',value: '辦事員' },
                { text: '臨時人員',value: '臨時人員' },
            ],
            onJob: [  // 是否在職
                { text: '不限', value: 'N' },
                { text: '在職', value: 'T' },
                { text: '已離職', value: 'F' },
            ],
            remind: [  // 健檢提醒
                { text: '不限', value: 'N' },
                { text: '須健檢', value: 'T' },
                { text: '不須健檢', value: 'F' },
            ],
        },
        pageOpt: { page: 1 },  // 目前頁數
        tableItems: [],  // 表格資料
        headers: [  // 表格欄位
            { text: '部門', value: 'DepartName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
            { text: '姓名', value: 'Name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '80' },
            { text: '職務', value: 'JobName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '90' },
            { text: '是否在職', value: 'Onduty', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '100' },
            { text: '健檢提醒', value: 'NextCheck', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '100' },
            { text: '最新健檢日', value: 'HealthCheckDate', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '120' },
            { text: '健檢評級', value: 'HealthResultLevel', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '80' },
            { text: '衛教', value: 'HealthChkStatus', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70' },
            { text: '追蹤', value: 'TrackStatus', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70' },
            { text: '備註', value: 'Memo', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70' },
            { text: '健檢資料', value: 'link', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70' },
            { text: '編輯、刪除', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '130' },
        ],
        dialog: false,  // dialog 是否顯示
        delDialog: false,
        isLoading: false,  // 是否讀取中
        itemIndex: -1,  // 作用中的物件索引值 (小於0為新增的情況)
        ipt: {}
    }),
    components: { 
        Pagination 
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'chViewDialog',  // 檢視內容 dialog
        ]),
        _getOrg(){
            fetchOrganization({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res=>{
                if (res.data.ErrorCode == 0) {
                   this.opts.depart.push(...res.data.user_depart_list_group_1.map(element=>{
                        return{
                            value: element.DepartCode,
                            text: element.DepartName
                        }
                   }))
                }else{
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
            }).catch( err => {
                this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
            }).finally(() => {
            })
        },
        // 查詢
        search() {
            this.chLoadingShow()
            this.pageOpt.page = 1  // 頁碼初始化
            healthList({
                ...this.searchIpt,
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res=>{
                if (res.data.ErrorCode == 0) {
                    if(res.data.HealthDataList.length > 0){
                        this.tableItems = res.data.HealthDataList
                    }else{
                        this.chMsgbar({ success: false, msg: '查無資料' })
                    }
                }else{
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
            }).catch( err => {
                console.warn(err)
                this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
            }).finally(() => {
                this.chLoadingShow()
            })
        },
        // 清除搜尋內容
        reset() {
            this.searchIpt = { ...this.defaultSearchIpt }
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 顯示檢視內容
        showContent(txt) {
            this.chViewDialog({ show: true, content: txt.replace(/\n/g, '<br>') })
        },
        // 新增
        add() {
            this.$router.push({ path: `/smis/jobsafety/physical/form` })
        },
        goedit(item){
            this.ipt = {...item}
            this.ipt.HealthChkStatus = (this.ipt.HealthChkStatus=='T')
            this.ipt.TrackStatus = (this.ipt.TrackStatus=='T')
            this.dialog = true
        },
        gosave() {
            this.chLoadingShow()
            let sendData = {
                FlowID: this.ipt.FlowID,
                HealthChkStatus: this.ipt.HealthChkStatus?'T':'F',
                TrackStatus: this.ipt.TrackStatus?'T':'F',
                Memo: this.ipt.Memo,
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }
            healthUpdateStatus({
                ...sendData
            }).then(res=>{
                if (res.data.ErrorCode == 0) {
                    this.chMsgbar({ success: true, msg: '資料修改成功' })
                }else{
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
            }).catch( err => {
                console.warn(err)
                this.chMsgbar({ success: false, msg: '伺服器發生問題，資料修改失敗' })
            }).finally(() => {
                this.chLoadingShow()
                this.dialog = false
                this.search()
            })
        },
        openDel(sid) {
            this.delDialog = true
            this.sid = sid
        },
        // 作廢
        godel() {
            this.chLoadingShow()
            let sendData = {
                Option: '3',
                ...this.sid,
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }
            healthUpdate({
                ...sendData
            }).then(res=>{
                if (res.data.ErrorCode == 0) {
                    this.chMsgbar({ success: true, msg: '資料作廢成功' })
                }else{
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
            }).catch( err => {
                console.warn(err)
                this.chMsgbar({ success: false, msg: '伺服器發生問題，資料作廢失敗' })
            }).finally(() => {
                this.chLoadingShow()
                this.delDialog = false
                this.search()
            })
        },
    },
    created() {
        this.reset()
        this.ipt = { ...this.defaultIpt }  // 初始化表單
        this._getOrg()
    }
}
</script>