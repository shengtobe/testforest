<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">職災事故事件編號：{{ id }}</h2>

    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8">
        <BottomTable :items="bottomItems" />

    <FileListShow :fileList="files" title="檔案列表" />

    <!-- 表格資料 -->
        <v-col cols="12" v-if="tableItems.length > 0">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-2">mdi-alarm-light</v-icon>危害通報
            </h3>
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

                    <template v-slot:item.ReportStatus="{ item }">
                            <span>{{ statusOpts.find(ele => ele.value == item.ReportStatus).text }}</span>
                        </template>

                    <!-- headers 的 content 欄位 (檢視內容) -->
                    <template v-slot:item.content="{ item }">
                        <v-btn small dark fab class="btn-detail"
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

        <!-- <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        通報連結
                    </span>
                </v-col>

                <v-col class="white pa-3">
                    <v-chip small label color="teal" class="mr-2 mb-2 mb-sm-0"
                        v-for="item in notifyLinks"
                        :key="item.id"
                        :to="item.link"
                        target="_blank"
                        rel="noopener norefferrer"
                        dark
                    >
                        <v-avatar left>
                            <v-icon>mdi-link-variant</v-icon>
                        </v-avatar>
                        {{ item.id }}
                    </v-chip>
                </v-col>
            </v-row>
        </v-col> -->
    </v-row>


    <v-row class="mt-8">
        <!-- 鎖定後要填寫的部份 -->
        <!-- <template v-if="isLocked">
            <v-col cols="12" sm="4" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>公傷假(起)
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
                            v-model.trim="ipt.injuryLeaveStart"
                            solo
                            v-on="on"
                            readonly
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        color="purple"
                        v-model="ipt.injuryLeaveStart"
                        @input="dateMemuShow.start = false"
                        locale="zh-tw"
                    ></v-date-picker>
                </v-menu>
            </v-col>

            <v-col cols="12" sm="4" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>公傷假(迄)
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
                            v-model.trim="ipt.injuryLeaveEnd"
                            solo
                            v-on="on"
                            readonly
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        color="purple"
                        v-model="ipt.injuryLeaveEnd"
                        @input="dateMemuShow.end = false"
                        locale="zh-tw"
                    ></v-date-picker>
                </v-menu>
            </v-col>

            <v-col cols="12" sm="4" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-phone-forward</v-icon>通報勞檢
                </h3>
                <v-select
                    v-model="ipt.laborInspection"
                    :items="laborOpts"
                    solo
                ></v-select>
            </v-col>

            <v-col cols="12" sm="6">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>發生原因
                </h3>
                <v-textarea
                    auto-grow
                    solo
                    rows="6"
                    placeholder="請輸入發生原因"
                    v-model.trim="ipt.cause"
                ></v-textarea>
            </v-col>

            <v-col cols="12" sm="6">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>備註
                </h3>
                <v-textarea
                    auto-grow
                    solo
                    rows="6"
                    placeholder="請輸入備註"
                    v-model.trim="ipt.note"
                ></v-textarea>
            </v-col>

            <v-col cols="12">
                <v-card tile>
                    <v-toolbar flat dense dark color="brown">
                        <v-toolbar-title>
                            <v-icon class="mb-1 mr-2">mdi-pen</v-icon>相關表單填寫
                        </v-toolbar-title>
                    </v-toolbar>

                    <v-list-item-group>
                            <v-list-item
                                :to="`/smis/jobsafety/disaster-survey/${id}/improve`"
                            >
                                <v-list-item-content>
                                    <v-list-item-title class="d-flex align-center">
                                        <v-btn x-small depressed rounded
                                            :color="(finishImprove)? 'success' : 'error'"
                                            class="mr-3"
                                        >
                                            {{ (finishImprove)? '已填寫' : '未填寫' }}
                                        </v-btn>
                                        改善措施
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                    </v-list-item-group>
                </v-card>
            </v-col>
        </template> -->

        <v-col cols="12" class="text-center mb-8">
            <v-btn dark class="ma-2 btn-close"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done">
                <v-btn dark class="ma-2 btn-modify"
                    :to="`/smis/jobsafety/disaster-survey/${this.itemData.AccidentCode}/edit`"
                    v-if="!isLocked && isShowBtn"
                >編輯</v-btn>

                <v-btn dark class="ma-2 btn-add"
                    v-if="isShowBtn"
                    @click="excel"
                >列印</v-btn>

                 <v-btn dark  class="ma-2 btn-delete"
                    @click="del" v-if="isShowBtn"
                >作廢</v-btn>

                <v-btn dark  class="ma-2 btn-modify"
                    @click="unlock" v-if="isLocked"
                >解除鎖定</v-btn>

                <v-btn dark  class="ma-2 btn-memo"
                    @click="save" v-if="isShowBtn"
                >{{ (isLocked)? '申請審核資料' : '鎖定' }}</v-btn>
            </template>
           

            
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { canInUpdate } from '@/apis/access'
import { getNowFullTime } from '@/assets/js/commonFun'
import TopBasicTable from '@/components/TopBasicTable.vue'
import BottomTable from '@/components/BottomTable.vue'
import { harmNotifyStatus } from '@/assets/js/smisData'
import FileListShow from '@/components/FileListShow.vue'
import { deleteData, sendCheckData, updateData } from '@/apis/smis/jobSafety'
import { excelData } from '@/apis/smis/jobSafety'
import { fetchList } from '@/apis/smis/harmNotify'

export default {
    props: ['itemData'],
    data: () => ({
        id: '',  // 編號
        done: false,  // 是否完成頁面操作
        isShowBtn: false, // 按鈕是否顯示(依權限)
        topItems: [],  // 上面的欄位
        bottomItems: [],  // 下面的欄位
        files: [],  // 上傳的檔案
        isLocked: false,  // 是否已鎖定
        pageOpt: { page: 1 },  // 目前頁數
        finishImprove: false,  // 是否完成改善措施
        tableItems: [],  // 表格資料
        statusOpts: harmNotifyStatus,  // 狀態下拉選單
        headers: [  // 表格顯示的欄位
            { text: '通報日期', value: 'convert_findDate', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '通報人', value: 'PeopleName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '通報主旨', value: 'ReportTitle', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '通報狀態', value: 'ReportStatus', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        ],
        notifyLinks: [],  // 連結的通報
        ipt: {  // 鎖定後要填寫的資料
            injuryLeaveStart: new Date().toISOString().substr(0, 10),  // 公傷假(起)
            injuryLeaveEnd: new Date().toISOString().substr(0, 10),  // 公傷假(迄)
            laborInspection: 'n',  // 通報勞檢
            cause: '',  // 發生原因
            note: '',  // 備註
        },
        dateMemuShow: {  // 日曆是否顯示
            start: false,
            end: false,
        },
        laborOpts: [
            { text: '有', value: '有' },
            { text: '無', value: '無' },
        ],
    }),
    components: {
        TopBasicTable,
        BottomTable,
        FileListShow
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
            groupData: state => state.groupData,
        }),
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'closeWindow',  // 關閉視窗
        ]),
        ...mapActions('user', [
            'saveUserGroup',  // 儲存使用者權限(群組)資料
        ]),
        // 初始化資料
        setShowData(obj) {
            this.id = obj.AccidentCode  // 編號
            this.topItems = obj.topItems  // 上面的欄位資料
            this.bottomItems = obj.bottomItems  // 下面的欄位資料
            this.files = [ ...obj.FileCount ]  // 檔案附件
            this.isLocked = (obj.LockStatus == 'T')?true:false  // 是否已鎖定
            
            this.isShowBtn = !(this.userData.UserName == obj.HurtPeopleName)
            // canInUpdate({
            //     ClientReqTime: getNowFullTime(),  // client 端請求時間
            //     OperatorID: this.userData.UserId,  // 操作人id
            // }).then(res => {
            //     if (res.data.ErrorCode == 0) {
            //         // this.saveUserGroup(res.data.GroupData)
            //         // this.isShowBtn = this.groupData.RoleLv3 == "T"
            //     }
            // }).catch( err => {
            //     //console.log(err)
            // }).finally(() => {
            // })
            this.pageOpt.page = 1  // 頁碼初始化

            fetchList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_ReportData',  // DB table
                IsFirstLoad: 'F',
                KeyItem: [
                    { tableColumn: 'ProAccidentCode', columnValue: this.id },  // 通報日期(起)
                ],
                QyName: [    // 欲回傳的欄位資料
                    'EndangerID',
                    'EndangerFindDate',
                    'PeopleName',
                    'ReportTitle',
                    'ReportStatus',
                ],
            }).then(res => {
                if(res.data.ErrorCode == 0){
                    this.tableItems = JSON.parse(res.data.order_list)
                    this.tableItems.forEach(element => {
                        for(let ele in element){
                            if(element[ele] == null){
                                element[ele] = '';
                            }
                        }
                    });
                }
                
            }).catch(err => {
                //console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
            })

            // // 危害通報連結 (依通報狀態連至不同頁面)
            // let arr = obj.notifyLinks.map(item => {
            //     let link = ''
            //     switch(item.status) {
            //         case '未審核':
            //             link = `/smis/harmnotify/${item.id}/show`
            //             break
            //         case '審核中':
            //             link = `/smis/harmnotify/${item.id}/review`
            //             break
            //         case '已結案':
            //             link = `/smis/harmnotify/${item.id}/complated`
            //             break
            //         default:
            //             break
            //     }

            //     return {
            //         id: item.id,
            //         link: link,
            //     }
            // })
            // this.notifyLinks = [ ...arr ]
        },
        // 列印
        excel() {
            excelData({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                AccidentCode: this.id,  // 操作人id
            }).then(res => {
                if(res.data.ErrorCode == 0){
                    let link = document.createElement('a')
                    link.href = `/downloads/${res.data.file_name}`
                    link.setAttribute('download', res.data.file_name)
                    document.body.appendChild(link)
                    link.click()
                }
                else{
                }
            }).catch(function (err) {
                alert('匯出失敗')
            })
        },
        // 作廢
        del() {
            if (confirm('你確定要作廢嗎?')) {
                this.chLoadingShow({show:true})

                deleteData({
                    AccidentCode: this.id,  // 編號
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '作廢成功' })
                        this.done = true  // 隱藏頁面操作按鈕
                    } else {
                        this.chMsgbar({ success: false, msg: '作廢失敗' })
                    }
                }).catch(err => {
                    //console.log(err)
                    this.chMsgbar({ success: false, msg: '伺服器發生問題' })
                }).finally(() => {
                    this.chLoadingShow({show:false})
                })
            }
        },
        unlock(){
            updateData({
                HappenDepart: this.itemData.HappenDepart, //3發生單位
                HurtPeopleName: this.itemData.HurtPeopleName, //4罹災者姓名
                HurtPeopleCardID: this.itemData.HurtPeopleCardID, //身分證
                HurtPassportID: this.itemData.HurtPassportID, //護照號碼
                PeopleAge: this.itemData.PeopleAge, //5年齡
                PeopleSex: this.itemData.PeopleSex, //6性別
                PeopleDepart: this.itemData.PeopleDepart, //7工作部門
                JobTitle: this.itemData.JobTitle, //8職稱
                PeopleAddress: this.itemData.PeopleAddress, //9住址
                WorkDate: this.itemData.WorkDate, //10到職日期
                WorkExp: this.itemData.WorkExp, //11參加本項工作經驗年數
                EduLevel: this.itemData.EduLevel, //12教育程度
                TrainDate: this.itemData.TrainDate, //13本項工作相關訓練日期
                EmployType: this.itemData.EmployType, //1勞工類型
                HappenDate: this.itemData.HappenDate, //14發生日期(日)
                HappenDateHr: this.itemData.HappenDateHr, //15發生日期(時)
                HappenDateMin: this.itemData.HappenDateMin, //16發生日期(分)
                Weather: this.itemData.Weather, //15氣候
                HappenPlace: this.itemData.HappenPlace, //16發生地點
                HappenPlaceLong: this.itemData.HappenPlaceLong, //16發生地點(經度)
                HappenPlaceLat: this.itemData.HappenPlaceLat, //16發生地點(緯度)
                AccidentType: this.itemData.AccidentType, //17事故類別
                AccidentResult: this.itemData.AccidentResult, //18事故結果
                HurtPart: this.itemData.HurtPart, //22傷害部位
                DisasterType: this.itemData.DisasterType, //23災害類型
                HurtMediumLv1: this.itemData.HurtMediumLv1, //24致傷媒介物
                HurtMediumLv2: this.itemData.HurtMediumLv2, //致傷媒介物 第二層
                AccidentReason: this.itemData.AccidentReason, //19直接原因
                AccidentIndirect: this.itemData.AccidentIndirect, //20間接原因
                AccidentBase: this.itemData.AccidentBase, //21基本原因
                HurtWorking: this.itemData.HurtWorking, //25傷者當時工作
                AccidentDesp: this.itemData.AccidentDesp, //26事故概況
                EmergencyStatus: this.itemData.EmergencyStatus, //27緊急處理情形
                AccidentPolicy: this.itemData.AccidentPolicy, //28事故單位防範及改善對策
                HurtDateStart: this.itemData.HurtDateStart, // 公傷假(起)
                HurtDateEnd: this.itemData.HurtDateEnd, // 公傷假(迄)
                NoticeCheck: this.itemData.NoticeCheck, // 通報勞檢
                ProcContent: this.itemData.ProcContent, // 發生原因
                HappenReason: this.itemData.HappenReason, // 改善措施
                Memo: this.itemData.Memo, // 備註
                FileCount: this.FileCount,
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                AccidentCode: this.id,
                LockStatus: (this.itemData.LockStatus == 'F')?'T':'F',
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    this.chMsgbar({ success: true, msg: '更新成功' })
                    this.saveBtnShow = false
                    this.$router.go()
                } else {
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
            }).catch(err => {
                this.chMsgbar({ success: false, msg: '伺服器發生問題，更新失敗' })
            }).finally(() => {
                this.chLoadingShow({show:false})
            })
        },
        // 檢視內容
        viewPage(item) {
            this.chLoadingShow({show:false})
            this.$router.push({ path: `/smis/harmnotify/${item.EndangerID}/show` })
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 鎖定
        save() {
            if (this.isLocked) {
                // -------------- 已鎖定 -------------- 
                let errArr = []
                // if (!this.finishImprove) errArr.push('改善措施')

                if (confirm('你確定要申請審核嗎?')) {
                        this.chLoadingShow({show:true})

                        // setTimeout(() => {
                        //     this.$router.push({ path: '/smis/jobsafety/disaster-survey' })
                        //     this.chMsgbar({ success: true, msg: '申請審核成功'})
                        //     this.done = true
                        //     this.chLoadingShow({show:true})
                        // }, 1000)
                        //-----call申請審核api------
                        sendCheckData({
                            AccidentCode: this.id,  // 編號
                            ClientReqTime: getNowFullTime(),  // client 端請求時間
                            OperatorID: this.userData.UserId,  // 操作人id
                        }).then(res => {
                            if (res.data.ErrorCode == 0) {
                                this.chMsgbar({ success: true, msg: '立案成功'})
                                this.done = true  // 隱藏頁面操作按鈕
                            } else {
                               (res.data.Msg)
                            }
                        }).catch(err => {
                            //console.log(err)
                            this.chMsgbar({ success: false, msg: '伺服器發生問題' })
                        }).finally(() => {
                            this.chLoadingShow({show:false})
                        })

                    }
            } else {
                // -------------- 未鎖定 -------------- 
                if (confirm('你確定要鎖定嗎?')) {
                    this.chLoadingShow({show:true})

                    // 向後端更新鎖定、覆核的欄位
                    updateData({
                        HappenDepart: this.itemData.HappenDepart, //3發生單位
                        HurtPeopleName: this.itemData.HurtPeopleName, //4罹災者姓名
                        HurtPeopleCardID: this.itemData.HurtPeopleCardID, //身分證
                        HurtPassportID: this.itemData.HurtPassportID, //護照號碼
                        PeopleAge: this.itemData.PeopleAge, //5年齡
                        PeopleSex: this.itemData.PeopleSex, //6性別
                        PeopleDepart: this.itemData.PeopleDepart, //7工作部門
                        JobTitle: this.itemData.JobTitle, //8職稱
                        PeopleAddress: this.itemData.PeopleAddress, //9住址
                        WorkDate: this.itemData.WorkDate, //10到職日期
                        WorkExp: this.itemData.WorkExp, //11參加本項工作經驗年數
                        EduLevel: this.itemData.EduLevel, //12教育程度
                        TrainDate: this.itemData.TrainDate, //13本項工作相關訓練日期
                        EmployType: this.itemData.EmployType, //1勞工類型
                        HappenDate: this.itemData.HappenDate, //14發生日期(日)
                        HappenDateHr: this.itemData.HappenDateHr, //15發生日期(時)
                        HappenDateMin: this.itemData.HappenDateMin, //16發生日期(分)
                        Weather: this.itemData.Weather, //15氣候
                        HappenPlace: this.itemData.HappenPlace, //16發生地點
                        HappenPlaceLong: this.itemData.HappenPlaceLong, //16發生地點(經度)
                        HappenPlaceLat: this.itemData.HappenPlaceLat, //16發生地點(緯度)
                        AccidentType: this.itemData.AccidentType, //17事故類別
                        AccidentResult: this.itemData.AccidentResult, //18事故結果
                        HurtPart: this.itemData.HurtPart, //22傷害部位
                        DisasterType: this.itemData.DisasterType, //23災害類型
                        HurtMediumLv1: this.itemData.HurtMediumLv1, //24致傷媒介物
                        HurtMediumLv2: this.itemData.HurtMediumLv2, //致傷媒介物 第二層
                        AccidentReason: this.itemData.AccidentReason, //19直接原因
                        AccidentIndirect: this.itemData.AccidentIndirect, //20間接原因
                        AccidentBase: this.itemData.AccidentBase, //21基本原因
                        HurtWorking: this.itemData.HurtWorking, //25傷者當時工作
                        AccidentDesp: this.itemData.AccidentDesp, //26事故概況
                        EmergencyStatus: this.itemData.EmergencyStatus, //27緊急處理情形
                        AccidentPolicy: this.itemData.AccidentPolicy, //28事故單位防範及改善對策
                        HurtDateStart: this.itemData.HurtDateStart, // 公傷假(起)
                        HurtDateEnd: this.itemData.HurtDateEnd, // 公傷假(迄)
                        NoticeCheck: this.itemData.NoticeCheck, // 通報勞檢
                        ProcContent: this.itemData.ProcContent, // 發生原因
                        HappenReason: this.itemData.HappenReason, // 改善措施
                        Memo: this.itemData.Memo, // 備註
                        FileCount: this.FileCount,
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                        AccidentCode: this.id,
                        LockStatus: (this.itemData.LockStatus == 'F')?'T':'F',
                    }).then(res => {
                        if (res.data.ErrorCode == 0) {
                            this.chMsgbar({ success: true, msg: '更新成功' })
                            this.saveBtnShow = false
                            this.$router.go()
                        } else {
                            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                            this.$router.push({ path: '/error' })
                        }
                    }).catch(err => {
                        this.chMsgbar({ success: false, msg: '伺服器發生問題，更新失敗' })
                    }).finally(() => {
                        this.chLoadingShow({show:false})
                    })
                    // setTimeout(() => {
                    //     // this.topItems.isReview.text = '已複核'
                    //     this.isLocked = true
                    //     this.chLoadingShow({show:true})
                    // }, 1000)
                }
            }
            return
            
            
        },
    },
    created() {
        this.setShowData(this.itemData)
    }
}
</script>