<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">職災事故事件編號：{{ id }}</h2>

    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8">
        <BottomTable :items="bottomItems" />

       

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

    <FileListShow :fileList="files" title="檔案列表" />

    <v-row class="mt-8">
        <!-- 鎖定後要填寫的部份 -->
        <template v-if="isLocked">
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
        </template>

        <v-col cols="12" class="text-center mb-8">
            <v-btn dark class="ma-2"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done">
                <v-btn dark class="ma-2"
                    color="indigo"
                    :to="`/smis/jobsafety/disaster-survey/${this.itemData.AccidentCode}/edit`"
                    v-if="!isLocked"
                >編輯</v-btn>

                <v-btn dark color="teal" class="ma-2"
                    v-if="!isLocked"
                    @click="excel"
                >列印</v-btn>

                 <v-btn dark  class="ma-2" color="error"
                    @click="del"
                >作廢</v-btn>

                <v-btn dark  class="ma-2" color="success"
                    @click="save"
                >{{ (isLocked)? '申請審核資料' : '鎖定' }}</v-btn>
            </template>
           

            
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import TopBasicTable from '@/components/TopBasicTable.vue'
import BottomTable from '@/components/BottomTable.vue'
import FileListShow from '@/components/FileListShow.vue'
import { deleteData } from '@/apis/smis/jobSafety'

export default {
    props: ['itemData'],
    data: () => ({
        id: '',  // 編號
        done: false,  // 是否完成頁面操作
        topItems: [],  // 上面的欄位
        bottomItems: [],  // 下面的欄位
        files: [],  // 上傳的檔案
        isLocked: false,  // 是否已鎖定
        finishImprove: false,  // 是否完成改善措施
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
            { text: '有', value: 'y' },
            { text: '無', value: 'n' },
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
        }),
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'closeWindow',  // 關閉視窗
        ]),
        // 初始化資料
        setShowData(obj) {
            console.log("初始化資料")
            console.log(obj)
            this.id = obj.AccidentCode  // 編號
            this.topItems = obj.topItems  // 上面的欄位資料
            this.bottomItems = obj.bottomItems  // 下面的欄位資料
            this.files = [ ...obj.FileCount ]  // 檔案附件
            console.log(this.files)
            this.isLocked = obj.isLocked  // 是否已鎖定
            console.log("topItems:")
            console.log(this.topItems)

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
            serveNewListExecl({
                CreatorID: this.userData.UserId,  // 立案人id
                WorkYear: this.ipt.year,  // 年度
                WorkBudget: this.ipt.money,  // 預算金額
                AgreementDTime: this.ipt.expiryDate,  // 履約到期日
                WorkNoticeStartDTime: this.ipt.workDateStart,  // 通知施作日期 (起)
                WorkNoticeEndDTime: this.ipt.workDateEnd,  // 通知施作日期 (訖)
                NoticeMethod: this.ipt.noticeMethod,  // 通知方式
                NoticeManID: this.ipt.noticeMember,  // 通知人
                // Type: this.ipt.type,  // 工單性質
                OderTypeCode: this.ipt.typeNumber,  // 工單性質編號
                // MaintainCode_System: this.ipt.eqNumber1,  // 設備標示編號(系統)
                // MaintainCode_Loc: (this.ipt.eqNumber22 == '')? this.ipt.eqNumber2 : `${this.ipt.eqNumber2}_${this.ipt.eqNumber22}`,  // 設備標示編號(位置)
                // MaintainCode_Eqp: (this.ipt.eqNumber32 == '')? this.ipt.eqNumber3 : `${this.ipt.eqNumber3}_${this.ipt.eqNumber32}`,  // 設備標示編號(設備)
                // MaintainCode_Seq: this.ipt.eqNumber4,  // 設備標示編號(序號)
                Malfunction: this.ipt.noticeLocation,  // 通報維修地點及事項
                WorkSubject: '',  // 故障主旨(目前是備用的欄位)
                ItemCount: this.ipt.items, // 請修項目
                TotalSpent: this.totalMoney,  // 總金額
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
                let link = document.createElement('a')
                link.href = `/downloads/${res.data.file_name}`
                link.setAttribute('download', res.data.file_name)
                document.body.appendChild(link)
                link.click()
            }).catch(function (err) {
                alert('匯出失敗')
            })
        },
        // 作廢
        del() {
            if (confirm('你確定要作廢嗎?')) {
                console.log("欲刪除的資料ID:" + this.id)
                this.chLoadingShow()

                deleteData({
                    AccidentCode: this.id,  // 編號
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '作廢成功' })
                        this.done = true  // 隱藏頁面操作按鈕
                    } else {
                        console.log(res.data.Msg)
                        this.chMsgbar({ success: false, msg: '作廢失敗' })
                    }
                }).catch(err => {
                    console.log(err)
                    this.chMsgbar({ success: false, msg: '伺服器發生問題' })
                }).finally(() => {
                    this.chLoadingShow()
                })
            }
        },
        // 鎖定
        save() {
            if (this.isLocked) {
                // -------------- 已鎖定 -------------- 
                let errArr = []
                if (!this.finishImprove) errArr.push('改善措施')

                if (this.finishDeath && this.finishImprove) {  // 都有填寫
                    if (confirm('你確定要申請審核嗎?')) {
                        this.chLoadingShow()

                        setTimeout(() => {
                            this.$router.push({ path: '/smis/jobsafety/disaster-survey' })
                            this.chMsgbar({ success: true, msg: '申請審核成功'})
                            this.chLoadingShow()
                        }, 1000)
                    }
                } else {
                    let errLog = '你還未填寫「'+ errArr.join('、') + '」'
                    alert(errLog)
                }
            } else {
                // -------------- 未鎖定 -------------- 
                if (confirm('你確定要鎖定嗎?')) {
                    this.chLoadingShow()

                    // 向後端更新鎖定、覆核的欄位
                    setTimeout(() => {
                        // this.topItems.isReview.text = '已複核'
                        this.isLocked = true
                        this.chLoadingShow()
                    }, 1000)
                }
            }
            
        },
    },
    created() {
        this.setShowData(this.itemData)
    }
}
</script>