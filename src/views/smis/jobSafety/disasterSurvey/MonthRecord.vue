<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">職業災害紀錄表</h2>

    <v-row class="px-2 mb-8 label-header">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>日期(起)
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
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="primary"
                    v-model="searchIpt.dateStart"
                    @input="dateMemuShow.start = false"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>日期(迄)
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
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="primary"
                    v-model="searchIpt.dateEnd"
                    @input="dateMemuShow.end = false"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="12" md="6" align-self="center">
            <v-btn dark large class="my-2 mr-2 btn-search"
                @click="search"
            >
                <v-icon class="mr-1">mdi-magnify</v-icon>查詢
            </v-btn>

            <v-btn dark large class="ma-2 btn-close"
                to="/smis/jobsafety/disaster-survey"
            >回搜尋頁</v-btn>

            <v-btn dark large class="ma-2 btn-detail"
                @click="excel"
            >匯出</v-btn>
        </v-col>

        <v-col cols="12" class="mt-1 mt-md-n5">
            <span class="font-weight-bold">累計損失日數： </span>
            <span class="font-weight-bold label-warning">{{ totalLossDate }}</span>
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

                    <template v-slot:item.date="{ item }">
                        {{ `${item.findDate} ${item.findHour}:${item.findMin}` }}
                    </template>

                    <template v-slot:item.disasterType="{ item }">
                        {{ transferDisasterType(item.disasterType) }}
                    </template>

                    <template v-slot:item.injurySite="{ item }">
                        {{ transferInjurySite(item.injurySite) }}
                    </template>

                    <template v-slot:item.injuryLeave="{ item }">
                        {{ `${item.HurtDateStart} ~ ${item.HurtDateEnd}` }}
                    </template>

                    <template v-slot:item.cause="{ item }">
                        <v-btn class="btn-detail" dark
                            @click="showContent(item.HappenReason)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.improve="{ item }">
                        <v-btn class="btn-detail" dark
                            @click="showContent(item.ProcContent)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.laborInspection="{ item }">
                        {{ item.NoticeCheck }}
                    </template>

                    <template v-slot:item.note="{ item }">
                        <v-btn class="btn-detail" dark
                            @click="showContent(item.Memo)"
                        >檢視</v-btn>
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
import { getNowFullTime } from '@/assets/js/commonFun'
import Pagination from '@/components/Pagination.vue'
import { injurySiteOpts, disasterTypeOpts } from '@/assets/js/smisData'
import { searchData, excelData } from '@/apis/smis/jobSafety'

export default {
    data: () => ({
        searchIpt: {
            dateStart: new Date().toISOString().substr(0, 10),  // 發生日期(起)
            dateEnd: new Date().toISOString().substr(0, 10),  // 發生日期(迄)
        },
        dateMemuShow: {
            start: false,
            end: false,
        },
        totalLossDate: 0,  // 累計損失日數
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '發生日期', value: 'HappenDate', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '發生地點', value: 'HappenPlace', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '發生單位', value: 'HappenDepart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '120' },
            { text: '罹災者姓名', value: 'HurtPeopleName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '90' },
            { text: '職稱', value: 'JobTitle', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '災害類型', value: 'AccidentType', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '160' },
            { text: '傷害部位', value: 'HurtPart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '160' },
            { text: '公傷假', value: 'injuryLeave', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '130' },
            { text: '發生原因', value: 'cause', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '100' },
            { text: '改善措施', value: 'improve', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '100' },
            { text: '通報勞檢', value: 'laborInspection', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '70' },
            { text: '備註', value: 'note', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '100' },
        ],
    }),
    components: { Pagination },
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
        // 搜尋
        search() {
            this.chLoadingShow()
            this.pageOpt.page = 1  // 頁碼初始化

            searchData({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_JobAccidentSurvey',  // DB table
                KeyItem: [
                    // { tableColumn: 'DeviceDepart', columnValue: this.controlSearch.depart },  // 管控單位
                    // { tableColumn: 'DeviceTitle', columnValue: this.controlSearch.subject },  // 措施簡述
                ],
                QyName: [    // 欲回傳的欄位資料
                    
                ],
            }).then(res => {
                this.tableItems = JSON.parse(res.data.order_list)
                //injurySiteOpts.find(item => item.value == res.data.HurtPart).text
                this.tableItems.forEach(element => {
                    element.HurtPart = injurySiteOpts.find(item => item.value == element.HurtPart).text
                    element.HurtDateStart = element.HurtDateStart.substr(0, 10)
                    element.HurtDateEnd = element.HurtDateEnd.substr(0, 10)
                });
                // this.tableItems[0].HurtPart = injurySiteOpts.find(item => item.value == this.tableItems[0].HurtPart).text
                console.log("this.tableItems[0].HurtPart", this.tableItems[0].HurtPart)
                console.log("tableItems", this.tableItems)
            }).catch(err => {
                console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow()
            })

            // 新增測試用資料
            // setTimeout(() => {
            //     this.tableItems = [
            //         {
            //             findDate: '2020-08-23',  // 發生日期
            //             findHour: '09',  // 發生日期(時)
            //             findMin: '45',  // 發生日期(分)
            //             location: '工具間',  // 發生地點
            //             depart: '阿里山車站',  // 發生單位
            //             name: '王小明',  // 罹災者姓名
            //             jobTitle: '維修員',  // 職稱
            //             disasterType: 8,  // 災害類型
            //             injurySite: 9,  // 傷害部位
            //             injuryLeaveStart: '2020-08-24',  // 公傷假(起)
            //             injuryLeaveEnd: '2020-08-30',  // 公傷假(迄)
            //             cause: '發生原因文字發生原因文字發生原因文字發生原因文字發生原因文字',  // 發生原因
            //             improve: '改善措施文字改善措施文字改善措施文字改善措施文字改善措施文字',  // 改善措施
            //             laborInspection: 'n',  // 通報勞檢
            //             note: '備註文字備註文字備註文字備註文字備註文字備註文字備註文字備註文字備註文字',  // 備註
            //         },
            //         {
            //             findDate: '2020-08-12',  // 發生日期
            //             findHour: '13',  // 發生日期(時)
            //             findMin: '24',  // 發生日期(分)
            //             location: '45K+600M',  // 發生地點
            //             depart: '奮起湖監工區',  // 發生單位
            //             name: '陳小美',  // 罹災者姓名
            //             jobTitle: '助理工程員',  // 職稱
            //             disasterType: 2,  // 災害類型
            //             injurySite: 1,  // 傷害部位
            //             injuryLeaveStart: '2020-08-13',  // 公傷假(起)
            //             injuryLeaveEnd: '2020-08-22',  // 公傷假(迄)
            //             cause: '發生原因文字發生原因文字發生原因文字發生原因文字發生原因文字',  // 發生原因
            //             improve: '改善措施文字改善措施文字改善措施文字改善措施文字改善措施文字',  // 改善措施
            //             laborInspection: 'y',  // 通報勞檢
            //             note: '備註文字備註文字備註文字備註文字備註文字備註文字備註文字備註文字備註文字',  // 備註
            //         },
            //     ]
            //     this.chLoadingShow()

            //     this.totalLossDate = 15  // 累計損失日數
            // }, 1000)
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 轉換災害類型名稱
        transferDisasterType(val) {
            return disasterTypeOpts.find(item => item.value == val).text
        },
        // 轉換傷害部位名稱
        transferInjurySite(val) {
            return injurySiteOpts.find(item => item.value == val).text
        },
        // 顯示檢視內容
        showContent(txt) {
            // this.chViewDialog({ show: true, content: txt.replace(/\n/g, '<br>') })
            this.chViewDialog({ show: true, content: txt })
        },
        // 匯出
        excel() {
            if (confirm('你確定要匯出搜尋結果嗎?')) {
                // "TestStrArr":[["發生日期","發生地點","發生單位",...],["2020-08-23 09:45","工具間","阿里山車站",...],["2020-08-12 13:24","45K+600M","奮起湖監工區",...]]
                if(this.tableItems.length > 0){
                    this.chLoadingShow()
                    let sendArr = []
                    let excelContent1 = []
                    this.headers.forEach(element => {
                        excelContent1.push(element.text)
                    });
                    sendArr.push(excelContent1)
                    let temp = []
                    this.tableItems.forEach(element => {
                        temp = []
                        //1.發生日期
                        temp.push(element.HappenDate.substr(0, 10))
                        //2.發生地點
                        temp.push(element.HappenPlace)
                        //3.發生單位
                        temp.push(element.HappenDepart)
                        //4.災者姓名
                        temp.push(element.HurtPeopleName)
                        //5.職稱
                        temp.push(element.JobTitle)
                        //6.災害類型
                        temp.push(element.AccidentType)
                        //7.傷害部位
                        temp.push(element.HurtPart)
                        //8.公傷假 item.HurtDateStart} ~ ${item.HurtDateEnd
                        temp.push(element.HurtDateStart + "~" + element.HurtDateEnd)
                        //9.發生原因
                        temp.push(element.HappenReason)
                        //10.改善措施
                        temp.push(element.ProcContent)
                        //11.通報勞檢
                        temp.push(element.NoticeCheck)
                        //10.備註
                        temp.push(element.Memo)
                        sendArr.push(temp)
                    });
                    excelData({
                        // AccidentCode: this.id,  // 事故事件編號
                        // FileCount: this.evidences,  // 上傳檔案列表 (證據)
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                        ExcelContent:sendArr
                    }).then(res => {
                        if (res.data.ErrorCode == 0) {
                            this.chMsgbar({ success: true, msg: '送出成功' })
                            this.done = true  // 隱藏頁面操作按鈕

                            let link = document.createElement('a')
                            link.href = `/downloads/${res.data.file_name}`
                            link.setAttribute('download', res.data.file_name)
                            document.body.appendChild(link)
                            link.click()
                        } else {
                            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                            this.$router.push({ path: '/error' })
                        }
                    }).catch(err => {
                        this.chMsgbar({ success: false, msg: '伺服器發生問題，送出失敗' })
                    }).finally(() => {
                        this.chLoadingShow()
                    })
                }
                else{
                    alert("無搜尋結果")
                }
                
            }//confirm end
        },//excel end
    },
}
</script>