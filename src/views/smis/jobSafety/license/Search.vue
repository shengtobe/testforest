<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">證照管理查詢</h2>

    <v-row class="px-2 mb-8">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-tag</v-icon>證照名稱
            </h3>
            <v-text-field
                v-model.trim="licenseName"
                solo
                placeholder="請輸入證照名稱"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="8" md="9" align-self="center">
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

                    <template v-slot:item.Memo="{ item }">
                        <v-btn color="teal" dark
                            @click="showContent(item.Memo)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.link="{ item }">
                        <v-btn small dark fab color="purple"
                            target="_blank"
                            :to="`/smis/jobsafety/license/${item.FlowID}/list`"
                        >
                            <v-icon dark>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn fab small color="primary"
                            class="mr-3"
                            @click="edit(item)"
                        >
                            <v-icon>mdi-pen</v-icon>
                        </v-btn>

                        <v-btn fab small color="error"
                            @click="del(item)"
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
        <LicenseEdit :key="componentKey" @cancel="cancel" :license="ipt"/> 
    </v-dialog>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Pagination from '@/components/Pagination.vue'
import { licenseRcdQuery, licenseRcdOption } from '@/apis/smis/license'
import { getNowFullTime } from '@/assets/js/commonFun'
import LicenseEdit from '@/views/smis/jobSafety/license/LicenseEdit.vue'

export default {
    data: () => ({
        licenseName: '',  // 證照名稱
        pageOpt: { page: 1 },  // 目前頁數
        tableItems: [],  // 表格資料
        headers: [  // 表格欄位
            // { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '證照名稱', value: 'License', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '初訓時間(小時)', value: 'InitTrainingTime', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '回訓時間(小時)', value: 'ReTrainingTime', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '有效時間(年)', value: 'ValidityPeriod', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '備註', value: 'Memo', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70' },
            { text: '人員資料', value: 'link', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '編輯、刪除', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '130' },
        ],
        dialog: false,  // dialog 是否顯示
        isLoading: false,  // 是否讀取中
        itemIndex: -1,  // 作用中的物件索引值 (小於0為新增的情況)
        ipt: {},  // dialog 欄位
        componentKey: 0,

    }),
    components: { 
        Pagination,
        LicenseEdit 
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
        dialogTitle () {
            return this.itemIndex === -1 ? '新增資料' : '編輯資料'
        },
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'chViewDialog',  // 檢視內容 dialog
        ]),
        // 查詢
        search() {
            this.chLoadingShow()
            this.pageOpt.page = 1  // 頁碼初始化
            console.log({
                License: this.licenseName,
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            })
            licenseRcdQuery({
                License: this.licenseName,
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res=>{
                console.log(res.data)
                if (res.data.ErrorCode == 0) {
                    if(res.data.DataList){
                        this.tableItems = res.data.DataList
                        // .map(element=>({
                        //     License: element.License,
                        //     InitTrainingTime: element.InitTrainingTime,
                        //     ReTrainingTime: element.ReTrainingTime,
                        //     ValidityPeriod: element.ValidityPeriod,
                        //     Memo: element.Memo,
                        // }))
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
            this.ipt = undefined
            this.dialog = true
            this.componentKey ++
        },
        // 編輯
        edit (item) {
            this.ipt = item
            this.dialog = true
            this.componentKey ++
        },
        cancel() {
            this.dialog = false
        },
        // 刪除
        del(item) {
            if (confirm('會連同所有人員資料一併刪除，你確定要刪除嗎?')) {
                this.chLoadingShow()

                licenseRcdOption({
                    ...item,
                    Option: '3',
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res=>{
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: false, msg: '資料刪除成功' })
                    }else{
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch( err => {
                    console.warn(err)
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，資料刪除失敗' })
                }).finally(() => {
                    this.chLoadingShow()
                })
            }
        },
    },
}
</script>