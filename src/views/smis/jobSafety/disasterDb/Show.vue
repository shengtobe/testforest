<template>
<v-container style="max-width: 1200px" class="label-header">
    <!-- <h2 class="mb-4 label-title">職災危害編號：{{ code1 }}{{ code2 }}{{ code3 }}</h2> -->
    <h2 class="mb-4 label-title">危害鑑別與風險評估編號：{{ id }}</h2>

    <v-row no-gutters class="mt-8">
        <BottomTable :items="bottomItems" />

        <!-- 表格資料 -->
        <v-col cols="12" class="text-center mt-2 mb-1" v-if="tableItems.length > 0"/>
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

        <v-col cols="12" class="text-center mt-12 mb-8">
            <v-btn dark class="ma-2 btn-close"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done && isShowBtn">
                <v-btn dark class="ma-2 btn-add" 
                    :to="`/smis/jobsafety/disasterdb/${id}/edit`"
                >編輯</v-btn>

                <v-btn dark  class="ma-2 btn-delete"
                    @click="del" v-if="isShowBtn"
                >作廢</v-btn>
            </template>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { canInUpdate } from '@/apis/access'
import { getNowFullTime } from '@/assets/js/commonFun'
import { jobSeriousOpts, jobPossibilityOpts, jobLevelOpts } from '@/assets/js/smisData'
import { harmNotifyStatus } from '@/assets/js/smisData'
import BottomTable from '@/components/BottomTable.vue'
import { deleteDataDb} from '@/apis/smis/jobSafety'
import { fetchList } from '@/apis/smis/harmNotify'

export default {
    props: ['itemData'],
    data: () => ({
        id: '',  // 編號
        isShowBtn: false, // 按鈕是否顯示(依權限)
        done: false,  // 是否完成頁面操作
        bottomItems: [],  // 欄位資料
        code1: '',  // 編號-第1段
        code2: '',  // 編號-第2段
        code3: '',  // 編號-第3段
        tableItems: [],  // 表格資料
        statusOpts: harmNotifyStatus,  
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '通報日期', value: 'convert_findDate', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '通報人', value: 'PeopleName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '通報主旨', value: 'ReportTitle', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '通報狀態', value: 'ReportStatus', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        ],
    }),
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        }
    },
    components: { BottomTable },
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
        // 向後端取得資料
        fetchData() {
            this.chLoadingShow({show:true})

            // // 新增測試用資料
            // setTimeout(() => {
            //     let obj = {
            //         id: this.$route.params.id,  // 編號
            //         code1: '12047',  // 編號-第1段
            //         code2: '22',  // 編號-第2段
            //         code3: '16',  // 編號-第3段
            //         name: '堆高機作業',  // 作業名稱
            //         workContent: '保養、維修',  // 操作工作內容
            //         cycle: '二週 1 次',  // 作業週期
            //         env: '倉庫',  // 作業環境
            //         eqs: '堆高機',  // 機械/設備/工具
            //         energy: '',  // 能源/化學物質
            //         harmType: 5,  // 危害類型
            //         qualify: '堆高機丙級證照',  // 作業資格
            //         result: '文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明',  // 危害可能造成後果
            //         engineeringControl: '',  // 工程控制
            //         manageControl: '堆高機維修手則',  // 管理控制
            //         protectEqs: '安全帽、手套',  // 防護具
            //         serious: 'S3',  // 風險嚴重性
            //         possibility: 'P3',  // 風險可能性
            //         serious2: 'S1',  // 控制後風險嚴重性
            //         possibility2: 'P1',  // 控制後風險可能性
            //         controlMeasures: '控制措施文字控制措施文字控制措施文字控制措施文字控制措施文字控制措施文字',  // 降低風險所採取之控制措施
            //         level: 'R2',  // 風險等級
            //         level2: 'R1',  // 控制後風險等級
            //     }

            //     this.setShowData(obj)
            //     this.chLoadingShow({show:true})
            // }, 1000)
        },
        // 初始化資料
        setShowData(obj) {
            this.id = obj.EndangerCode // 編號
            // this.code1 = obj.code1 // 編號-第1段
            this.code1 = "" // 編號-第1段
            // this.code2 = obj.code2 // 編號-第2段
            this.code2 = obj.EndangerCode // 編號-第2段
            // this.code3 = obj.code3 // 編號-第3段
            this.code3 = "" // 編號-第3段
            this.bottomItems = obj.bottomItems

            canInUpdate({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    this.saveUserGroup(res.data.GroupData)
                    this.isShowBtn = this.groupData.RoleLv3 == "T"
                }
            }).catch( err => {
                //console.log(err)
            }).finally(() => {
            })
            
            fetchList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_ReportData',  // DB table
                IsFirstLoad: 'F',
                KeyItem: [
                    { tableColumn: 'ProEndangerCode', columnValue: this.id },  // 通報日期(起)
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
        },
        // 刪除
        del() {
            if (confirm('你確定要作廢嗎?')) {
                this.chLoadingShow({show:true})

                deleteDataDb({
                    EndangerCode: this.id,  // 編號
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
    },
    created() {
        this.setShowData(this.itemData)
        // this.fetchData()
    }
}
</script>