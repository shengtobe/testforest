<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">行車危害查詢</h2>

    <v-row class="px-2 mb-8 label-header">
        <v-col cols="12" md="5">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>簡易查詢
            </h3>
            <v-text-field
                hide-details
                v-model.trim="keyword"
                solo
                placeholder="請輸入關鍵字"
            ></v-text-field>
        </v-col>

        <v-col cols="12" md="3" align-self="end">
            <v-btn dark large class="mb-1 mr-3 btn-search"
                @click="search"
            >
                <v-icon class="mr-1">mdi-magnify</v-icon>查詢
            </v-btn>

            <v-btn dark large class="mb-1 btn-add"
                to="/smis/car-harmdb/harms/add" v-if="isShowBtn"
            >
                <v-icon>mdi-plus</v-icon>新增
            </v-btn>
        </v-col>

        <v-col cols="12">
            <v-sheet color="white" class="px-2 pb-1">
                <v-row no-gutters>
                    <v-col cols="12" sm="4" md="3">
                        <v-checkbox
                            v-model="chooses"
                            label="危害說明"
                            color="primary"
                            value="t1"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="4" md="3">
                        <v-checkbox
                            v-model="chooses"
                            label="危害直接成因"
                            color="primary"
                            value="t2"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="4" md="3">
                        <v-checkbox
                            v-model="chooses"
                            label="可能的危害間接原因"
                            color="primary"
                            value="t3"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="4" md="3">
                        <v-checkbox
                            v-model="chooses"
                            label="衍生事故"
                            color="primary"
                            value="t4"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="4" md="3">
                        <v-checkbox
                            v-model="chooses"
                            label="危害權責部門"
                            color="primary"
                            value="t5"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="4" md="3">
                        <v-checkbox
                            v-model="chooses"
                            label="備註"
                            color="primary"
                            value="t6"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="4" md="3">
                        <v-checkbox
                            v-model="chooses"
                            label="控制措施權責部門"
                            color="primary"
                            value="t7"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="4" md="3">
                        <v-checkbox
                            v-model="chooses"
                            label="設備標示編號"
                            color="primary"
                            value="t8"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <!-- <v-col cols="12" class="mt-2">
                        <span class="error--text">* 請至要勾選上述其中一個項目</span>
                    </v-col> -->
                </v-row>
            </v-sheet>
        </v-col>

        <!-- 快速查詢 -->
        <v-col cols="12" class="mt-5">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-tag-multiple</v-icon>快速查詢
            </h3>
            
            <v-btn class="mb-2 mr-3 btn-memo white--text"
                @click="searchAllEndanger"
            >全部危害{{ '(' + searchAllEndangerCount + ')' }}</v-btn>

            <v-btn class="mb-2 mr-3 btn-memo white--text"
                @click="searchHighRisk"
            >高風險{{ '(' + searchHighRiskCount + ')' }}</v-btn>

            <v-btn class="mb-2 mr-3 btn-memo white--text"
                @click="caseFetch"
            >已立案{{ '(' + caseFetchCount + ')' }}</v-btn>

            <v-btn class="mb-2 mr-3 btn-memo white--text"
                @click="cpltPaper"
            >已完備資料{{ '(' + cpltPaperCount + ')' }}</v-btn>

            <v-btn class="mb-2 mr-3 btn-memo white--text"
                @click="riskAllow"
            >風險已可接受{{ '(' + riskAllowCount + ')' }}</v-btn>

            <v-btn class="mb-2 mr-3 btn-memo white--text"
                @click="checkFetch"
            >審核中{{ '(' + checkFetchCount + ')' }}</v-btn>
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

                    <template v-slot:item.mode="{ item }">
                        <span>{{ opts.mode.find(ele => ele.value == item.OperationMode).text }}</span>
                    </template>

                    <template v-slot:item.serious="{ item }">
                        <span>{{ opts.serious.find(ele => ele.value == item.RiskSerious).text }}</span>
                    </template>

                    <template v-slot:item.frequency="{ item }">
                        <span>{{ opts.frequency.find(ele => ele.value == item.RiskFreq).text }}</span>
                    </template>

                    <template v-slot:item.level="{ item }">
                        <span>{{ opts.riskLevel.find(ele => ele.value == item.RiskLevel).text }}</span>
                    </template>
                    
                    <template v-slot:item.status="{ item }">
                        <span>{{ opts.status.find(ele => ele.value == item.EndangerStatus).text }}</span>
                    </template>
                    <!-- headers 的 content 欄位 (危害說明) -->
                    <template v-slot:item.harmDesp="{ item }">
                        <span>{{ item.EndangerDesp }}</span>
                        <!-- <v-btn class="btn-memo" dark
                            @click="showContent(item.EndangerDesp)"
                        >檢視</v-btn> -->
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
import { canInUpdate } from '@/apis/access'
import { carHarmDbStatus, operateModes, riskSerious, riskFrequency, riskLevel } from '@/assets/js/smisData'
import Pagination from '@/components/Pagination.vue'
import { carHarmDBHarms } from '@/assets/js/smisTestData'
import { fetchList } from '@/apis/smis/carHarmDatabase/harms'
 
export default {
    data: () => ({
        keyword: '',  // 關鍵字
        searchAllEndangerCount: 0,
        searchHighRiskCount: 0,
        caseFetchCount: 0,
        cpltPaperCount: 0,
        riskAllowCount: 0,
        checkFetchCount: 0,
        chooses: [],  // 查詢項目(checkbox 勾選的項目)
        isShowBtn: false, // 按鈕是否顯示(依權限)
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        searchType: 'normal', // 'normal'/'allEndanger'/
        headers: [  // 表格顯示的欄位
            { text: '編號', value: 'EndangerCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
            { text: '營運模式', value: 'mode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 90 },
            { text: '風險嚴重性', value: 'serious', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
            { text: '風險頻率', value: 'frequency', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
            { text: '風險等級', value: 'level', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 150 },
            { text: '狀態', value: 'status', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
            { text: '危害說明', value: 'harmDesp', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 260 },
            { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 90 },
        ],
        isLoading: false,  // 是否讀取中
        opts: {
            status: carHarmDbStatus,  // 狀態
            mode: operateModes, // 營運模式
            serious: riskSerious, // 風險嚴重性
            frequency: riskFrequency, // 風險頻率
            riskLevel: riskLevel,  // 風險等級
        },
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
            'chLoadingShow',  // 切換 loading 圖顯示
            'chViewDialog',  // 檢視內容 dialog
        ]),
        ...mapActions('user', [
            'saveUserGroup',  // 儲存使用者權限(群組)資料
        ]),
        // 簡易搜尋
        search() {
            this.chLoadingShow({show:true})
            this.pageOpt.page = 1  // 頁碼初始化
            
            if(this.chooses.length == 0){
                //無勾選
                if(this.keyword == ''){//勾選X 關鍵字X 就搜尋全部
                    fetchList({
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                        KeyName: 'SMS_EndangerData',  // DB table
                        KeyItem: [
                            // { tableColumn: 'DeviceDepart', columnValue: this.controlSearch.depart },  // 管控單位
                            // { tableColumn: 'DeviceTitle', columnValue: this.controlSearch.subject },  // 措施簡述
                        ],
                        QyName: [    // 欲回傳的欄位資料
                            'EndangerCode',
                            'EndangerDesp',
                            'EndangerStatus',
                            'OperationMode',
                            'RiskSerious',
                            'RiskFreq',
                            'RiskLevel',
                            'DelStatus',
                            'CancelStatus',
                            'InsertDTime',
                        ],
                    }).then(res => {
                        this.tableItems = JSON.parse(res.data.order_list)
                        console.log("tableItems: ", this.tableItems);
                        // this.tableItems.forEach(element => {
                        //     for(let ele in element){
                        //         if(element[ele] == null){
                        //             element[ele] = '';
                        //         }
                        //         else{
                        //             switch(ele){
                        //                 case 'EndangerDesp'://危害說明
                        //                     break;
                        //                 case 'EndangerReason'://危害直接成因
                        //                     break;
                        //                 case 'EndangerIndirect'://可能的危害間接原因
                        //                     break;
                        //                 case 'AAAAAA'://AAAAA
                        //                     break;
                        //                 case 'AAAAAA'://AAAAA
                        //                     break;
                        //                 case 'AAAAAA'://AAAAA
                        //                     break;
                        //                 case 'AAAAAA'://AAAAA
                        //                     break;
                        //                 case 'AAAAAA'://AAAAA
                        //                     break;
                        //             }
                        //         }
                        //     }
                        // });
                    }).catch(err => {
                        console.log(err)
                        alert('查詢時發生問題，請重新查詢!')
                    }).finally(() => {
                        this.chLoadingShow({show:false})
                    })
                }
                else{//勾選X 關鍵字√ 就搜尋全部欄位 有任一欄位符合就列出
                    fetchList({
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                        KeyName: 'SMS_EndangerData',  // DB table
                        KeyItem: [
                            // { tableColumn: 'DeviceDepart', columnValue: this.controlSearch.depart },  // 管控單位
                            { tableColumn: 'EndangerDesp', columnValue: this.keyword },  // 危害說明 
                            // { tableColumn: 'EndangerReason', columnValue: this.keyword },  // 危害直接成因 
                        ],
                        QyName: [    // 欲回傳的欄位資料
                            'EndangerCode',
                            'EndangerStatus',
                            'OperationMode',
                            'RiskSerious',
                            'RiskFreq',
                            'RiskLevel',
                            'DelStatus',
                            'CancelStatus',
                            'InsertDTime',
                        ],
                    }).then(res => {
                        // this.tableItems = JSON.parse(res.data.order_list)
                        this.tableItems = JSON.parse(res.data.order_list)
                        // this.tableItems = [...[]];
                        console.log("this.tempItems: ", this.tempItems);
                        // this.tempItems.forEach(element => {
                        //     for(let ele in element){
                        //         if(element[ele] == null){
                        //             element[ele] = '';
                        //         }
                        //         //篩 危害說明 
                        //         if(ele == 'EndangerDesp'){
                        //             if((element.EndangerDesp.indexOf(this.keyword)) > -1){
                        //                 this.tableItems.push(element)
                        //                 break
                        //             }
                        //         }
                        //         //篩 危害直接成因
                        //         if(ele == 'EndangerReason'){
                        //             if((element.EndangerReason.indexOf(this.keyword)) > -1){
                        //                 this.tableItems.push(element)
                        //                 break
                        //             }
                        //         }
                        //         //篩 可能的危害間接原因
                        //         if(ele == 'EndangerIndirect'){
                        //             if((element.EndangerIndirect.indexOf(this.keyword)) > -1){
                        //                 this.tableItems.push(element)
                        //                 break
                        //             }
                        //         }
                                
                        //     }
                        // });
                        

                    }).catch(err => {
                        console.log(err)
                        alert('查詢時發生問題，請重新查詢!')
                    }).finally(() => {
                        this.chLoadingShow({show:false})
                    })
                }
            }
            else{
                //勾選√
                if(this.keyword == ''){ //勾選√ 關鍵字X
                    fetchList({
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                        KeyName: 'SMS_EndangerData',  // DB table
                        KeyItem: [
                            // { tableColumn: 'DeviceDepart', columnValue: this.controlSearch.depart },  // 管控單位
                            // { tableColumn: 'DeviceTitle', columnValue: this.controlSearch.subject },  // 措施簡述
                        ],
                        QyName: [    // 欲回傳的欄位資料
                            'EndangerCode',
                            'EndangerStatus',
                            'OperationMode',
                            'RiskSerious',
                            'RiskFreq',
                            'RiskLevel',
                            'DelStatus',
                            'CancelStatus',
                            'InsertDTime',
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
                        console.log(err)
                        alert('查詢時發生問題，請重新查詢!')
                    }).finally(() => {
                        this.chLoadingShow({show:false})
                    })
                }
                else{ //勾選√ 關鍵字√
                    fetchList({
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                        KeyName: 'SMS_EndangerData',  // DB table
                        KeyItem: [
                            // { tableColumn: 'DeviceDepart', columnValue: this.controlSearch.depart },  // 管控單位
                            // { tableColumn: 'DeviceTitle', columnValue: this.controlSearch.subject },  // 措施簡述
                        ],
                        QyName: [    // 欲回傳的欄位資料
                            'EndangerCode',
                            'EndangerStatus',
                            'OperationMode',
                            'RiskSerious',
                            'RiskFreq',
                            'RiskLevel',
                            'DelStatus',
                            'CancelStatus',
                            'InsertDTime',
                        ],
                    }).then(res => {
                        this.tableItems = JSON.parse(res.data.order_list)
                        this.tableItems.forEach(element => {
                            for(let ele in element){
                                if(element[ele] == null){
                                    element[ele] = '';
                                }
                                else{
                                    switch(ele){
                                        case 'EndangerDesp'://危害說明
                                            break;
                                        case 'EndangerReason':// 危害直接成因
                                            break;
                                        case 'EndangerIndirect':// 可能的危害間接原因
                                            break;
                                        case 'DeriveAccident':// 衍伸事故
                                            break;
                                        case 'AAAAAA'://AAAAA
                                            break;
                                        case 'AAAAAA'://AAAAA
                                            break;
                                        case 'AAAAAA'://AAAAA
                                            break;
                                        case 'AAAAAA'://AAAAA
                                            break;
                                    }
                                }
                            }
                        });
                    }).catch(err => {
                        console.log(err)
                        alert('查詢時發生問題，請重新查詢!')
                    }).finally(() => {
                        this.chLoadingShow({show:false})
                    })
                }
            }

            
        },
        // 預設先執行一次搜尋
        initSearch() {
            this.chLoadingShow({show:true})
            this.pageOpt.page = 1  // 頁碼初始化
            
            fetchList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_EndangerData',  // DB table
                KeyItem: [
                    // { tableColumn: 'DeviceDepart', columnValue: this.controlSearch.depart },  // 管控單位
                    // { tableColumn: 'DeviceTitle', columnValue: this.controlSearch.subject },  // 措施簡述
                ],
                QyName: [    // 欲回傳的欄位資料
                    'EndangerCode',
                    'EndangerDesp',
                    'EndangerStatus',
                    'OperationMode',
                    'RiskSerious',
                    'RiskFreq',
                    'RiskLevel',
                    'DelStatus',
                    'CancelStatus',
                    'InsertDTime',
                ],
            }).then(res => {
                
                this.searchHighRiskCount= 0
                this.caseFetchCount= 0
                this.cpltPaperCount= 0
                this.riskAllowCount= 0
                this.checkFetchCount= 0

                let tempTb = JSON.parse(res.data.order_list)
                this.searchAllEndangerCount= tempTb.length
                tempTb.forEach(element => {
                    for(let ele in element){
                        if(element[ele] == null){
                            element[ele] = '';
                        }
                    }
                    if(element.RiskLevel == 'R1' || element.RiskLevel == 'R2'){
                        this.searchHighRiskCount++
                    }
                    if(element.EndangerStatus == '1'){
                        this.caseFetchCount++
                    }
                    if(element.EndangerStatus == '3'){
                        this.cpltPaperCount++
                    }
                    if(element.EndangerStatus == '5'){
                        this.riskAllowCount++
                    }
                    switch(element.EndangerStatus){
                        case '2':
                        case '4':
                        case '6':
                            this.checkFetchCount++
                            break;
                    }
                });
            }).catch(err => {
                console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow({show:false})
            })

            
        },
        // 全部危害
        searchAllEndanger() {
            this.chLoadingShow({show:true})
            this.pageOpt.page = 1  // 頁碼初始化

            fetchList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_EndangerData',  // DB table
                KeyItem: [
                    // { tableColumn: 'DeviceDepart', columnValue: this.controlSearch.depart },  // 管控單位
                    // { tableColumn: 'DeviceTitle', columnValue: this.controlSearch.subject },  // 措施簡述
                ],
                QyName: [    // 欲回傳的欄位資料
                    'EndangerCode',
                    'EndangerStatus',
                    'OperationMode',
                    'RiskSerious',
                    'RiskFreq',
                    'RiskLevel',
                    'DelStatus',
                    'CancelStatus',
                    'InsertDTime',
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
                console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow({show:false})
            })
        }, 
        // 高風險
        searchHighRisk() { 
            this.chLoadingShow({show:true})
            this.pageOpt.page = 1  // 頁碼初始化

            fetchList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_EndangerData',  // DB table
                KeyItem: [
                    // { tableColumn: 'DeviceDepart', columnValue: this.controlSearch.depart },  // 管控單位
                    // { tableColumn: 'DeviceTitle', columnValue: this.controlSearch.subject },  // 措施簡述
                ],
                QyName: [    // 欲回傳的欄位資料
                    'EndangerCode',
                    'EndangerStatus',
                    'OperationMode',
                    'RiskSerious',
                    'RiskFreq',
                    'RiskLevel',
                    'DelStatus',
                    'CancelStatus',
                    'InsertDTime',
                ],
            }).then(res => {
                let tempTableItems = [];
                this.searchHighRiskCount = 0;
                this.tableItems = [...[]];
                this.tempTableItems = JSON.parse(res.data.order_list)
                this.tempTableItems.forEach(element => {
                    for(let ele in element){
                        if(element[ele] == null){
                            element[ele] = '';
                        }
                    }
                    if(element.RiskLevel == 'R1' || element.RiskLevel == 'R2'){
                        this.tableItems.push(element)
                        this.searchHighRiskCount++
                    }
                });
            }).catch(err => {
                console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow({show:false})
            })
        }, 
        // 已立案
        caseFetch() { //caseFetch
            this.chLoadingShow({show:true})
            this.pageOpt.page = 1  // 頁碼初始化

            fetchList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_EndangerData',  // DB table
                KeyItem: [
                    // { tableColumn: 'DeviceDepart', columnValue: this.controlSearch.depart },  // 管控單位
                    // { tableColumn: 'DeviceTitle', columnValue: this.controlSearch.subject },  // 措施簡述
                ],
                QyName: [    // 欲回傳的欄位資料
                    'EndangerCode',
                    'EndangerStatus',
                    'OperationMode',
                    'RiskSerious',
                    'RiskFreq',
                    'RiskLevel',
                    'DelStatus',
                    'CancelStatus',
                    'InsertDTime',
                ],
            }).then(res => {
                let tempTableItems = [];
                this.caseFetchCount= 0
                this.tableItems = [...[]];
                this.tempTableItems = JSON.parse(res.data.order_list)
                this.tempTableItems.forEach(element => {
                    for(let ele in element){
                        if(element[ele] == null){
                            element[ele] = '';
                        }
                    }
                    if(element.EndangerStatus == '1'){
                        this.tableItems.push(element)
                        this.caseFetchCount++
                    }
                });
            }).catch(err => {
                console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow({show:false})
            })
        }, 

        cpltPaper() { //已完備資料
            this.chLoadingShow({show:true})
            this.pageOpt.page = 1  // 頁碼初始化

            fetchList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_EndangerData',  // DB table
                KeyItem: [
                    // { tableColumn: 'DeviceDepart', columnValue: this.controlSearch.depart },  // 管控單位
                    // { tableColumn: 'DeviceTitle', columnValue: this.controlSearch.subject },  // 措施簡述
                ],
                QyName: [    // 欲回傳的欄位資料
                    'EndangerCode',
                    'EndangerStatus',
                    'OperationMode',
                    'RiskSerious',
                    'RiskFreq',
                    'RiskLevel',
                    'DelStatus',
                    'CancelStatus',
                    'InsertDTime',
                ],
            }).then(res => {
                let tempTableItems = [];
                this.cpltPaperCount= 0
                this.tableItems = [...[]];
                this.tempTableItems = JSON.parse(res.data.order_list)
                this.tempTableItems.forEach(element => {
                    for(let ele in element){
                        if(element[ele] == null){
                            element[ele] = '';
                        }
                    }
                    if(element.EndangerStatus == '3'){
                        this.tableItems.push(element)
                        this.cpltPaperCount++
                    }
                });
            }).catch(err => {
                console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow({show:false})
            })
        },
        riskAllow() { //風險可接受
            this.chLoadingShow({show:true})
            this.pageOpt.page = 1  // 頁碼初始化

            fetchList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_EndangerData',  // DB table
                KeyItem: [
                    // { tableColumn: 'DeviceDepart', columnValue: this.controlSearch.depart },  // 管控單位
                    // { tableColumn: 'DeviceTitle', columnValue: this.controlSearch.subject },  // 措施簡述
                ],
                QyName: [    // 欲回傳的欄位資料
                    'EndangerCode',
                    'EndangerStatus',
                    'OperationMode',
                    'RiskSerious',
                    'RiskFreq',
                    'RiskLevel',
                    'DelStatus',
                    'CancelStatus',
                    'InsertDTime',
                ],
            }).then(res => {
                let tempTableItems = [];
                this.riskAllowCount = 0;
                this.tableItems = [...[]];
                this.tempTableItems = JSON.parse(res.data.order_list)
                this.tempTableItems.forEach(element => {
                    for(let ele in element){
                        if(element[ele] == null){
                            element[ele] = '';
                        }
                    }
                    if(element.EndangerStatus == '5'){
                        this.tableItems.push(element)
                        this.riskAllowCount++
                    }
                });
            }).catch(err => {
                console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow({show:false})
            })
        },
        // 審核中
        checkFetch() { //checkFetch
            this.chLoadingShow({show:true})
            this.pageOpt.page = 1  // 頁碼初始化

            fetchList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_EndangerData',  // DB table
                KeyItem: [
                    // { tableColumn: 'DeviceDepart', columnValue: this.controlSearch.depart },  // 管控單位
                    // { tableColumn: 'DeviceTitle', columnValue: this.controlSearch.subject },  // 措施簡述
                ],
                QyName: [    // 欲回傳的欄位資料
                    'EndangerCode',
                    'EndangerStatus',
                    'OperationMode',
                    'RiskSerious',
                    'RiskFreq',
                    'RiskLevel',
                    'DelStatus',
                    'CancelStatus',
                    'InsertDTime',
                ],
            }).then(res => {
                let tempTableItems = [];
                this.checkFetchCount= 0
                this.tableItems = [...[]];
                this.tempTableItems = JSON.parse(res.data.order_list)
                this.tempTableItems.forEach(element => {
                    for(let ele in element){
                        if(element[ele] == null){
                            element[ele] = '';
                        }
                    }
                    switch(element.EndangerStatus){
                        case '2':
                        case '4':
                        case '6':
                            this.tableItems.push(element)
                            this.checkFetchCount++
                            break;
                    }
                });
            }).catch(err => {
                console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow({show:false})
            })
        }, 
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 顯示檢視內容
        showContent(txt) {
            console.log("txt: ", txt);
            this.chViewDialog({ show: true, content: txt })
        },
        // 轉換事故事件狀態文字
        transferStatusText(status) {
            switch(status) {
                case 1:
                    return '已立案'
                    break
                case 2:  // 審核完備資料
                    return '審核中'
                    break
                case 3:
                    return '已完備資料'
                    break
                case 4:  // 審核風險已可接受
                    return '審核中'
                    break
                case 5:
                    return '風險已可接受'
                    break
                case 6:  // 審核更新
                    return '審核中'
                    break
                case 7:  // 審核作廢
                    return '審核中'
                    break
                default:
                    break
            }
        },
        // 檢視內容
        viewPage(item) {
            let routeData = this.$router.resolve({ path: `/smis/car-harmdb/harms/${item.EndangerCode}/show` })
            window.open(routeData.href, '_blank')
        },
    },
    created(){
        //敲門
        canInUpdate({
            ClientReqTime: getNowFullTime(),  // client 端請求時間
            OperatorID: this.userData.UserId,  // 操作人id
        }).then(res => {
            if (res.data.ErrorCode == 0) {
                this.saveUserGroup(res.data.GroupData)
                this.isShowBtn = this.groupData.RoleLv2 == "T";
            }
        }).catch( err => {
            console.log(err)
        }).finally(() => {
        })


        this.initSearch();
    }
}
</script>