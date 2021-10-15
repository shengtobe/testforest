<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">事故事件編號：{{ id }}</h2>

    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8">
        <BottomTable :items="bottomItems" />
    </v-row>

    <!-- 其他資訊 -->
    <OtherInfoShow :items="otherItems" />

    <!-- 檔案列表 -->
    <FileListShow :fileList="files" title="檔案列表" />

    <!-- 填寫人員傷亡、改善措施 -->
    <v-row no-gutters class="mt-10">
        <v-col cols="12">
            <v-card tile>
                <v-toolbar flat dense dark class="gradual-bg-light-brown">
                    <v-toolbar-title>
                        <v-icon class="mb-1 mr-2">mdi-pen</v-icon>相關表單填寫
                    </v-toolbar-title>
                </v-toolbar>

                <v-list-item-group class="light-white-light-brown">
                        <v-list-item append
                            :to="`/smis/car-accident-event/${id}/person-casualty`"
                        >
                            <v-list-item-content>
                                <v-list-item-title class="d-flex align-center">
                                    <v-btn x-small depressed rounded
                                        :color="(finishDeath)? 'success' : 'error'"
                                        class="mr-3"
                                    >
                                        {{ (finishDeath)? '已填寫' : '未填寫' }}
                                    </v-btn>
                                    {{ (finishDeath == true && hurt_people_count == 0)? '無人員傷亡' : '人員傷亡名單' }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-divider></v-divider>

                        <v-list-item
                            :to="`/smis/car-accident-event/${id}/driving-improve`"
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

        <v-col cols="12" class="text-center mt-2 mb-8" v-if="tableItems.length > 0"/>

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

        <v-col cols="12" class="text-center mt-12 mb-8">
            <v-btn dark class="ma-2 btn-close"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done">
                <v-btn dark class="ma-2 btn-modify" v-if="isShowBtn"
                    :to="`/smis/car-accident-event/${id}/edit`"
                >編輯</v-btn>

                <v-btn dark class="ma-2 btn-add"
                    v-if="isShowBtn"
                    @click="word"
                >列印</v-btn>

                <v-btn dark  class="ma-2 btn-delete"
                    @click="del" v-if="isShowBtn"
                >作廢</v-btn>

                <v-btn dark  class="ma-2 btn-add"
                    @click="save" v-if="isShowBtn"
                >申請審核資料</v-btn>
            </template>
        </v-col>
    </v-row>

    <v-row class="px-2 mb-8">
        
    </v-row>
    
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { canInUpdate } from '@/apis/access'
import { getNowFullTime, knock } from '@/assets/js/commonFun'
import TopBasicTable from '@/components/TopBasicTable.vue'
import { harmNotifyStatus } from '@/assets/js/smisData'
import BottomTable from '@/components/BottomTable.vue'
import FileListShow from '@/components/FileListShow.vue'
import OtherInfoShow from '@/views/smis/carAccidentEvent/OtherInfoShow.vue'
import { applyData, deleteData, wordData } from '@/apis/smis/carAccidentEvent'
import { fetchList } from '@/apis/smis/harmNotify'

export default {
    props: ['itemData'],
    data: () => ({
        id: '',  // 編號
        isShowBtn: false, // 按鈕是否顯示(依權限)
        done: false,  // 是否完成頁面操作
        files: [],  // 上傳的檔案
        finishDeath: false,  // 是否完成人員傷亡名單
        hurt_people_count: null, // 傷亡人數
        finishImprove: false,  // 是否完成改善措施
        statusOpts: harmNotifyStatus,  // 狀態下拉選單
        topItems: [],  // 上面的欄位
        bottomItems: [],  // 下面的欄位
        tableItems: [],  // 表格資料
        otherItems: [],  // 其他資訊
        notifyLinks: [],  // 連結的通報
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '通報日期', value: 'convert_findDate', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '通報人', value: 'PeopleName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '通報主旨', value: 'ReportTitle', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '通報狀態', value: 'ReportStatus', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        ],
    }),
    components: {
        TopBasicTable,
        BottomTable,
        OtherInfoShow,
        FileListShow,
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
        // 檢視內容
        viewPage(item) {
            this.$router.push({ path: `/smis/harmnotify/${item.EndangerID}/show` })
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 初始化資料
        setShowData(obj) {
            
            this.id = obj.AccidentCode  // 編號
            this.topItems = obj.topItems  // 上面的欄位資料
            this.bottomItems = obj.bottomItems  // 下面的欄位資料
            this.otherItems = obj.otherInfo  // 其他資訊
            this.files = [ ...obj.FileCount ]  // 檔案附件
            this.finishDeath = (obj.HurtPeopleCount == 'F')? false : true // 是否完成人員傷亡名單
            this.finishImprove = (obj.FixDevice == 'F')? false : true // 是否完成改善措施
            this.hurt_people_count = obj.hurt_people_count
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
            this.pageOpt.page = 1  // 頁碼初始化
            fetchList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_ReportData',  // DB table
                IsFirstLoad: 'F',
                KeyItem: [
                    { tableColumn: 'AccidentCode', columnValue: this.id },  // 通報日期(起)
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

            // 危害通報連結 (依通報狀態連至不同頁面)
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
        word() {
            wordData({
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
                    AccidentCode: this.id,  // 事故事件編號
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '作廢成功' })
                        this.done = true  // 隱藏頁面操作按鈕
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    //console.log(err)
                    alert('伺服器發生問題，作廢失敗')
                }).finally(() => {
                    this.chLoadingShow({show:false})
                })
            }
        },
        // 申請措施審核
        save() {
            let errArr = []
            if (!this.finishDeath) errArr.push('人員傷亡名單')
            // if (!this.finishImprove) errArr.push('改善措施檢討')

            // if (this.finishDeath && this.finishImprove) {  // 都有填寫
            if (this.finishDeath) {  // 都有填寫
                if (confirm('你確定要申請措施審核嗎?')) {
                    this.chLoadingShow({show:true})
                    
                    applyData({
                        AccidentCode: this.id,  // 事故事件編號
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                    }).then(res => {
                        if (res.data.ErrorCode == 0) {
                            this.chMsgbar({ success: true, msg: '申請成功' })
                            this.done = true  // 隱藏頁面操作按鈕
                        } else {
                            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                            this.$router.push({ path: '/error' })
                        }
                    }).catch(err => {
                        //console.log(err)
                        alert('伺服器發生問題，申請失敗')
                    }).finally(() => {
                        this.chLoadingShow({show:false})
                    })
                }
            } else {
                let errLog = '你還未填寫「'+ errArr.join('、') + '」'
                alert(errLog)
            }
        },
    },
    created() {
        this.setShowData(this.itemData)
    }
}
</script>