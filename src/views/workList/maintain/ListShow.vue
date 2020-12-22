<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">工單編號：{{ workNumber }}</h2>
    
    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8">
        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-pen</v-icon>故障描述
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="malfunction"
                ></v-col>
            </v-row>
        </v-col>

        <!-- 操作按鈕 -->
        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="ma-2"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done">
                <v-btn class="ma-2"
                    color="primary"
                    :to="`/worklist/maintain/${workNumber}/editList`"
                >編輯</v-btn>

                <v-btn class="ma-2"
                    color="error"
                    @click="deleteItem"
                >刪除</v-btn>

                <v-btn dark class="ma-2"
                    color="amber darken-1"
                    @click="closeWork"
                >結案</v-btn>

                <!-- <v-btn dark class="ma-2"
                    color="cyan"
                    @click="dialog = true"
                >轉單</v-btn> -->

                <v-btn dark class="ma-2"
                    color="success"
                    :to="`/worklist/maintain/${workNumber}/newWork`"
                >派工</v-btn>
            </template>
        </v-col>

        <!-- 按鈕說明，demo 用 -->
        <v-col cols="12" class="error--text">
            <h4>按鈕出現說明</h4>
            1. 編輯、刪除：立案人、派工人<br>
            <!-- 2. 編輯、結案、轉單、派工：派工人 -->
            2. 編輯、結案、派工：派工人
        </v-col>
    </v-row>

    <!-- 轉單 dialog -->
    <!-- <v-dialog v-model="dialog" max-width="450px">
        <v-card>
            <v-toolbar dark flat dense color="cyan" class="mb-2">
                <v-toolbar-title>轉單</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn fab small text @click="dialog = !dialog" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-select
                            dense
                            hide-details
                            solo
                            v-model="newUnit"
                            :items="memberOptLv1"
                        ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-select
                            dense
                            hide-details
                            solo
                            v-model="newDispatcher"
                            :items="memberOptLv2"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-card-text>
            
            <v-card-actions class="px-5 pb-5">
                <v-spacer></v-spacer>
                <v-btn class="mr-2" elevation="4" :loading="isLoading" @click="dialog = false">取消</v-btn>
                <v-btn color="success"  elevation="4" :loading="isLoading" @click="chgDispatcher">送出</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog> -->
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { maintainStatusOpts } from '@/assets/js/workList'
import { fetchWorkOrderOne, deleteOrder } from '@/apis/workList/maintain'
import { getNowFullTime } from '@/assets/js/commonFun'
import TopBasicTable from '@/components/TopBasicTable.vue'

export default {
    props: ['itemData'],
    data: () => ({
        workNumber: '',  // 工單編號
        done: false,  // 是否完成頁面操作
        // isLoading: false,  // 是否讀取中
        // dialog: false,  // 轉單 dialog
        // newUnit: '',  // 轉單時所選科室
        newDispatcher: '',  // 轉單後的新派工人
        topItems: {  // 上面的欄位
            fixTime: { icon: 'mdi-calendar-text', title: '報修時間', text: '' },
            eqCodes: { icon: 'mdi-codepen', title: '設備標示編號', text: '' },
            status: { icon: 'mdi-ray-vertex', title: '處理階段', text: '' },
            createrDepart: { icon: 'mdi-apps', title: '立案單位', text: '' },
            creater: { icon: 'mdi-account', title: '立案人', text: '' },
            fixUnit: { icon: 'mdi-apps', title: '維修單位', text: '' },
            dispatcher: { icon: 'mdi-account', title: '派工人', text: '' },
            fixType: { icon: 'mdi-source-branch', title: '維修類型', text: '' },
            workDate: { icon: 'mdi-calendar-text', title: '維修時間', text: '' },
        },
        malfunction: '',  // 故障描述
    }),
    components: { TopBasicTable },
    watch: {
        // 更換科室時，自動選該科室人員清單的第一人
        newUnit: function (newVal, oldVal) {
            if (newVal != oldVal) {
                this.newDispatcher = this.memberOptLv2[0]
            }
        },
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'closeWindow',  // 關閉視窗
        ]),
        // 初始化資料
        setShowData(obj) {
            this.workNumber = obj.WorkOrderID  // 工單編號
            this.malfunction = obj.Malfunction.replace(/\n/g, '<br>')  // 故障描述

            // 設定上面的欄位資料
            this.topItems.fixTime.text = obj.CreateDTime  // 報修時間
            this.topItems.eqCodes.text = obj.MaintainCode  // 設備標示編號
            this.topItems.status.text = maintainStatusOpts.find(ele => ele.value == obj.Status).text  // 處理階段
            this.topItems.createrDepart.text = obj.CreatorDepart  // 立案單位
            this.topItems.creater.text = obj.Creator  // 立案人
            this.topItems.fixUnit.text = obj.DispatchDepart  // 維修單位
            this.topItems.dispatcher.text = obj.DispatchMan  // 派工人
            this.topItems.fixType.text = (obj.Type == '1')? '故障檢修' : ((obj.Type == '2')? '例行保養' : '')   // 維修類型
            this.topItems.workDate.text = `${obj.DispatchDDay} ${obj.DispatchDHour}時`  // 維修時間

            // 權限檢查 (等後續再用 userid 去檢查)
        },
        // 刪除
        deleteItem() {
            if (confirm('你確定要刪除嗎?')) {
                this.chLoadingShow()
                
                deleteOrder({
                    WorkOrderID: this.workNumber,  // 工單編號
                    ClientReqTime: getNowFullTime()  // client 端請求時間
                }).then(res => {
                    this.chMsgbar({ success: true, msg: '刪除成功' })
                    this.done = true  // 隱藏頁面操作按鈕
                }).catch(err => {
                    console.log(err)
                    alert('伺服器發生問題，刪除失敗')
                }).finally(() => {
                    this.chLoadingShow()
                })
            }
        },
        // 結案
        closeWork() {
            if (confirm('你確定要結案嗎?')) {
               this.chLoadingShow()
                
                // 範例效果
                setTimeout(() => {
                    // 結案完後，轉頁到搜尋頁
                    this.chMsgbar({ success: true, msg: '結案成功' })
                    this.done = true  // 隱藏頁面操作按鈕
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 轉單 (更改派工人)
        // chgDispatcher() {
        //    this.isLoading = true
                
        //     // 範例效果
        //     setTimeout(() => {
        //         // 轉單完後，轉頁到搜尋頁
        //         this.chMsgbar({ success: true, msg: '轉單成功' })
        //         this.done = true  // 隱藏頁面操作按鈕
        //         this.dialog = false
        //     }, 1000)
        // },
    },
    created() {
        this.setShowData(this.itemData)
    }
}
</script>