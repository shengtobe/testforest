<template>
<v-container style="max-width: 1200px" class="label-header">
    <h2 class="mb-4 label-title">人員資料 ({{ decodeURIComponent(name) }})</h2>

    <v-row class="px-2 mb-8">
        <v-col cols="12">
            <v-btn dark large class="my-2 mr-2 btn-close"
                to="/smis/jobsafety/license"
            >回搜尋頁</v-btn>

            <v-btn dark large class="ma-2 btn-add"
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
                    class="theme-table"
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:loading>
                        <span class="red--text subtitle-1">資料讀取中...</span>
                    </template>

                    <template v-slot:item.needTrain="{ item }">
                        {{ (item.needTrain == 'y')? '是' : '否' }}
                    </template>

                    <template v-slot:item.depart="{ item }">
                        {{ transferDepartTxt(item.depart) }}
                    </template>

                    <template v-slot:item.job="{ item }">
                        {{ transferJobTxt(item.job) }}
                    </template>

                    <template v-slot:item.Memo="{ item }">
                        <v-btn dark class="btn-memo"
                            @click="showContent(item.Memo)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn fab small dark
                            class="mr-3 btn-modify"
                            @click="edit(item)"
                        >
                            <v-icon>mdi-pen</v-icon>
                        </v-btn>

                        <v-btn fab small dark class="btn-delete"
                            @click="godel(item)"
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
        <LicenseManEdit @close="close" :data="ipt" :name="name" :key="componentKey"/>
    </v-dialog>
    <!-- 刪除 -->
    <v-dialog v-model="delDialog" max-width="350px">
        <v-card class="theme-del-card">
            <v-card-title class="white--text px-4 py-1 headline"
            >確認是否刪除?</v-card-title
            >
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="white--text btn-close" @click="delDialog=false">取消</v-btn>
            <v-btn class="white--text btn-delete" @click="del(delItem)">刪除</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Pagination from '@/components/Pagination.vue'
import { getNowFullTime } from '@/assets/js/commonFun'
import { licenseQuery, licenseOption } from '@/apis/smis/license'
import LicenseManEdit from '@/views/smis/jobSafety/license/LicenseManEdit.vue'
export default {
    props: ['id','name'],
    data: () => ({
        licenseName: '',  // 證照名稱
        opts: {  // 下拉選單
            job: [  // 職務
                { text: '駕駛員', value: '1' },
                { text: '車長', value: '2' },
                { text: '一般員工', value: '3' },
            ],
        },
        dateMemuShow: {  // 日曆是否顯示
            activeDate: false,  // 證照生效日
            lastTrain: false,  // 最後回訓日
        },
        pageOpt: { page: 1 },  // 目前頁數
        tableItems: [],  // 表格資料
        headers: [  // 表格欄位
            // { text: '是否須回訓', value: 'needTrain', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '120' },
            { text: '部門', value: 'Depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '120' },
            { text: '姓名', value: 'Name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '100' },
            { text: '職務', value: 'JobName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '證照編號', value: 'LicenseNo', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '140' },
            { text: '證照生效日', value: 'EffectiveDate', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '120' },
            { text: '最後回訓日', value: 'ReTrainingTime', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '120' },
            { text: '證照有效日', value: 'ExpDTime', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '120' },
            { text: '備註', value: 'Memo', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '70' },
            { text: '編輯、刪除', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '130' },
        ],
        dialog: false,  // dialog 是否顯示
        componentKey: 0,
        ipt: {},
        delDialog:false,
        delItem:{}
    }),
    components: { 
        Pagination,
        LicenseManEdit
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
        // 初始化資料
        initData() {
            this.chLoadingShow({show:true})
            licenseQuery({
                FlowID: this.id,
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res=>{
                if (res.data.ErrorCode == 0) {
                    if(res.data.DataList){
                        this.tableItems = res.data.DataList
                        this.tableItems.forEach(e=>{
                            e.EffectiveDate = e.EffectiveDate.split(' ')[0]
                            e.ExpDTime = e.ExpDTime.split(' ')[0]
                            e.ReTrainingTime = e.ReTrainingTime.split(' ')[0]
                        })
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
                this.chLoadingShow({show:false})
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
            // this.ipt = undefined
            this.ipt.FlowID = this.id
            this.dialog = true
            this.componentKey++
        },
        // 編輯
        edit (item) {
            this.ipt = item
            this.dialog = true
            this.componentKey++
        },
        close(){
            this.dialog = false
            this.initData()
        },
        godel(item) {
            this.delItem = item
            this.delDialog = true
        },
        // 刪除
        del(item) {
            this.chLoadingShow({show:true})
            licenseOption({
                ...item,
                Option: '3',
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res=>{
                if (res.data.ErrorCode == 0) {
                    this.chMsgbar({ success: true, msg: '資料刪除成功' })
                }else{
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
            }).catch( err => {
                console.warn(err)
                this.chMsgbar({ success: false, msg: '伺服器發生問題，資料刪除失敗' })
            }).finally(() => {
                this.chLoadingShow({show:false})
                this.initData()
                this.delDialog = false
            })
        },

    },
    mounted() {
        this.initData()
    }
}
</script>