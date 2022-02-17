<template>
<v-container style="max-width: 1300px">
    <h2 class="mb-4 label-title">復原刪除</h2>

    <v-row no-gutters class="mb-8">
        <v-col cols="12" class="mb-8">
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

                    <template v-slot:item.CauseAnaly="{ item }">
                        <v-btn fab small dark class="btn-detail" @click="getDetail(item.CauseAnaly)">
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.type="{ item }">
                        {{ opsList.find(ele => ele.Code == item.AccidentType).Name.replace('率', '')}}
                    </template>

                    <template v-slot:item.hurtPeople="{ item }">
                        {{ (item.HurtPeopleCount == 'F')? '未填寫' : item.hurt_people_count }}
                    </template>

                    <template v-slot:item.status="{ item }">
                        {{ accidentEventStatus.find(ele => ele.value == item.AccidentStatus).text }}
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn class="btn-add" dark
                            @click="recovery(item)"
                        >復原</v-btn>
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
        <!-- 詳細資料 -->
      <v-dialog v-model="contentShow" max-width="900px">
        <v-card class="theme-card">
          <v-card-title class="px-4 py-1">
            原因分析
            <v-spacer />
            <v-btn fab small text @click="contentShow = false" class="mr-n2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <div class="px-4 py-3 label-header">
            <v-row no-gutters>
              <v-col cols="12">
                {{ viewAn }}
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-dialog>
        <v-col cols="12">
            <v-btn dark class="mr-3 btn-close"
                @click="closeWindow"
            >關閉視窗</v-btn>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { carAccidentEventStatus, evtTypes, locationOpts } from '@/assets/js/smisData'
import { getNowFullTime } from '@/assets/js/commonFun'
import Pagination from '@/components/Pagination.vue'
import { canInUpdate } from '@/apis/access'
import { fetchList, fetchEvtTypes, updateData } from '@/apis/smis/carAccidentEvent'

export default {
    data: () => ({
        routeId: '',
        contentShow: false,
        viewAn: '',
        ipt: {},
        arr1: [], // 重大事故
        arr2: [], // 一般事故
        arr3: [], // 異常事件
        tableItems: [],  // 表格資料
        opsList: '', // 完整事故類型清單
        pageOpt: { page: 1 },  // 目前頁數
        accidentEventStatus: carAccidentEventStatus,  // 表格顯示的行車事故事件狀態
        headers: [  // 表格顯示的欄位
            { text: '編號', value: 'AccidentCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold'},
            { text: '發生日期', value: 'convert_findDate', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold'},
            { text: '發生地點', value: 'FindLine', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold'},
            { text: '事故類型', value: 'type', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold'},
            { text: '事故摘要', value: 'ReportTitle', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold'},
            { text: '原因分析', value: 'CauseAnaly', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold'},
            { text: '傷亡人數', value: 'hurtPeople', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold'},
            { text: '事故事件狀態', value: 'status', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold'},
            { text: '復原', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        ],
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
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'closeWindow',  // 關閉視窗
        ]),
        ...mapActions('user', [
            'saveUserGroup',  // 儲存使用者權限(群組)資料
        ]),
        getDetail(txt){
            this.contentShow = true
            this.viewAn = txt
        },
        // 向後端取得資料
        fetchData() {
            this.chLoadingShow({show:true})

            this.pageOpt.page = 1  // 頁碼初始化

            fetchList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_AccidentEventData',  // DB table
                KeyItem: [
                    { tableColumn: 'CreateDTime_Start', columnValue: '' },  // 發生日期(起) ipt.evtType2
                    { tableColumn: 'CreateDTime_End', columnValue: '' },  // 發生日期(迄)
                    { tableColumn: 'DeviceLost', columnValue: '' },  // 設備受損情形
                    { tableColumn: 'OperationLost', columnValue: '' },  // 運轉影響情形
                    { tableColumn: 'ReviewProcess', columnValue: '' },  // 處置過程
                    { tableColumn: 'CauseAnaly', columnValue: '' },  // 原因分析
                    { tableColumn: 'RemarkDesp', columnValue: '' },  // 備註說明
                    { tableColumn: 'AccidentStatus', columnValue: '' },  // 事故事件狀態
                    { tableColumn: 'DelStatus', columnValue: 'T' },  // 是否已被刪除
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
                console.log("tempTable: ", tempTable);
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
                            console.log("element: ", element);
                    this.tableItems.push(element)
                    
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
        // 復原
        recovery(item) {
            let index = this.tableItems.indexOf(item)
            if (confirm(`你確定要復原編號「${item.AccidentCode}」的資料嗎?`)) {
                this.chLoadingShow({show:true})

                updateData({
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                    AccidentCode: item.AccidentCode,
                    FunCode: '2'
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '復原成功' })
                        this.fetchData()
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，更新失敗' })
                }).finally(() => {
                    this.chLoadingShow({show:false})
                })
            }
        },
    },
    created() {
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
                console.log("OK");
        }).catch(err => {
            //console.log(err)
            alert('伺服器發生問題，事故類型讀取失敗')
        }).finally(() => {
            this.chLoadingShow({show:false})
        })

        this.fetchData()

        
    }
}
</script>