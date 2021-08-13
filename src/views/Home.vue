<template>
<v-container style="max-width: 1200px" >
    <v-row class="px-2 mb-8 mt-2">
        <!-- 個人訊息 -->
        <h3 class="px-3">個人訊息</h3>

        <v-col cols="12" class="mb-8">
            <v-card>
                <v-data-table
                    :headers="headers.personal"
                    :items="tableItems.personal"
                    :options.sync="pageOpt.personal"
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

                    <template v-slot:item.depart="{ item }">
                        {{ transferDepartTxt(item.depart) }}
                    </template>

                    <template v-slot:item.title="{ item }">
                        <div class="text-left">{{ item.title }}</div>
                    </template>

                    <template v-slot:item.content="{ item }">
                        <v-btn small dark fab class="btn-detail" v-if="!item.isRead" @click="redirect(item)">
                            <v-icon dark>mdi-file-document</v-icon>
                        </v-btn>
                        <v-icon v-if="item.isRead" @click="redirect(item)">mdi-checkbox-marked-circle-outline</v-icon>
                    </template>
                    
                    <!-- 頁碼 -->
                    <template v-slot:footer="footer">
                        <Pagination
                            :footer="footer"
                            :pageOpt="pageOpt.personal"
                            @chPage="chPage"
                        />
                    </template>
                </v-data-table>
            </v-card>
        </v-col>

        <!-- 待辦事項 -->
        <h3 class="px-3">待辦事項</h3>

        <v-col cols="12" class="mb-4">
            <v-card>
                <v-data-table
                    :headers="headers.todo"
                    :items="tableItems.todo"
                    :options.sync="pageOpt.todo"
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

                    <template v-slot:item.title="{ item }">
                        <div class="text-left">{{ item.title }}</div>
                    </template>

                    <template v-slot:item.content="{ item }">
                        <v-btn small dark fab class="btn-detail" @click="redirect(item)">
                            <v-icon dark>mdi-arrow-collapse-right</v-icon>
                        </v-btn>
                    </template>
                    
                    <!-- 頁碼 -->
                    <template v-slot:footer="footer">
                        <Pagination
                            :footer="footer"
                            :pageOpt="pageOpt.todo"
                            @chPage="chPageTodo"
                        />
                    </template>
                </v-data-table>
            </v-card>
        </v-col>

        <!-- 版本資訊 -->
        <v-col cols="12" class="mb-8 px-4">
            <p>系統版本： {{ userData.Version }}</p>
            <div style="background: #ffffff60;border-radius: 1rem;padding: 1rem;" v-html="userData.VersionMemo.replace(/\n/g, '<br>')"></div>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { fetchPersonalInfo, fetchPersonalInfoRead } from '@/apis/login'
import { getNowFullTime } from '@/assets/js/commonFun'
import Pagination from '@/components/Pagination.vue'
import { departOptions } from '@/assets/js/departOption'
import { InfoBelongMod } from '@/assets/js/smisData'

export default {
    data: () => ({
        tableItems: {  // 表格資料
            personal: [],  // 個人訊息
            todo: [],  // 待辦事項
        },  
        pageOpt: {  // 目前頁數
            personal: { page: 1 }, 
            todo: { page: 1 }, 
        },
        headers: {  // 表格顯示的欄位
            personal: [
                { text: '日期', value: 'date', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '110' },
                { text: '部門', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '110' },
                { text: '標題', value: 'title', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
                { text: '已讀', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '100' },
            ],
            todo: [
                { text: '日期', value: 'date', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '110' },
                { text: '標題', value: 'title', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
                { text: '前往操作', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '100' },
            ],
        }
            
    }),
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
            groupData: state => state.groupData,  // 使用者權限(群組)資料
        })
    },
    components: { Pagination },  // 頁碼
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 初始化資料
        initData() {
            this.chLoadingShow({ show: true})

            //詢問個人資訊
            fetchPersonalInfo({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    // this.tableItems = JSON.parse(res.data.order_list)
                    let tb = JSON.parse(res.data.order_list)
                    console.log("Manage 詢問個人資訊: ", tb)
                    console.log("Manage 詢問個人資訊 MsgType: ", tb.map(e=>e.MsgType))
                    // 個人訊息
                    let psnal = tb.map(item => ({
                        id: item.ModuleItemID,
                        depart: item.DepartCode, 
                        // title: ((item.title == null)?'':item.title) + '(' + item.ModTitle + ')',
                        title: item.ModTitle,
                        sourceTitle: item.Title,
                        date: item.InsertDTime.substr(0, 10),
                        isRead: item.RecReadStatus == 'T',
                        ModuleItemID: item.ModuleItemID,
                        MsgType: item.MsgType,
                        InfoBelongMod: item.InfoBelongMod,
                    }));
                    psnal.forEach(element => {
                        element.title = ((element.sourceTitle == null)?'':element.sourceTitle) + '(' + element.title + ')'
                        if(element.MsgType == 1){
                            console.log("element.MsgType: ", element.MsgType);
                            this.tableItems.personal.push(element);
                        }
                        else{
                            // element.title = ((element.sourceTitle == null)?'':element.sourceTitle) + '(' + element.title + ')'
                            // this.tableItems.personal.push(element);
                            this.tableItems.todo.push(element);
                        }
                    });
                    // this.tableItems.personal = [...psnal]

                    // 待辦事項
                //     this.tableItems.todo = [
                //         {
                //             id: '789',
                //             title: '維修、養護科工單',
                //             date: '2020-09-01',
                //         },
                //         {
                //             id: '2222',
                //             title: '行車事故事件',
                //             date: '2020-08-26',
                //         },
                //     ]
                }
            }).catch( err => {
                console.log(err)
            }).finally(() => {
            })

            // setTimeout(() => {
            //     // this.tableItems.personal = [
            //     //     {
            //     //         id: '789',
            //     //         depart: 'ARCO001', 
            //     //         title: '資訊安全相關注意事項',
            //     //         date: '2020-05-01',
            //     //     },
            //     //     {
            //     //         id: '658',
            //     //         depart: 'ARCO015', 
            //     //         title: '補休作業調整',
            //     //         date: '2020-04-21',
            //     //     },
            //     //     {
            //     //         id: '447',
            //     //         depart: 'ARCO026', 
            //     //         title: '慢行通報',
            //     //         date: '2020-03-11',
            //     //     },
            //     // ]

            //     this.tableItems.todo = [
            //         {
            //             id: '789',
            //             title: '維修、養護科工單',
            //             date: '2020-09-01',
            //         },
            //         {
            //             id: '2222',
            //             title: '行車事故事件',
            //             date: '2020-08-26',
            //         },
            //     ]

            // }, 1000)
                this.chLoadingShow({ show: false})
        },
        redirect(item) {
            console.log("item:::", item)
            //test
            // item.InfoBelongMod = '18';
            //
            //改為已讀
            fetchPersonalInfoRead({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                ModuleItemID: item.ModuleItemID,
                InfoBelongMod: item.InfoBelongMod,
                MsgType: item.MsgType,
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    console.log("首頁代辦事項已讀 item: ", item);
                    console.log("首頁代辦事項已讀 res.data: ", res.data);
                    console.log("首頁代辦事項已讀 this.tableItems.personal: ", this.tableItems.personal);
                    // item.isRead = false
                    if(item.MsgType == '1'){
                        this.tableItems.personal.find(e => e.id == item.ModuleItemID).isRead = true;
                    }

                    // setTimeout(() => {
                    //     this.$router.push({ path: `/smis/car-safeinfo/info/${item.ModuleItemID}/show` })
                    // }, 300)

                }
            }).catch( err => {
                console.log(err)
            }).finally(() => {
            })
            console.log("[轉跳]item.InfoBelongMod: ", item.InfoBelongMod);
            console.log("[轉跳]item.ModuleItemID: ", item.ModuleItemID);
            if (confirm('確定要離開目前頁面至指定頁面操作?')) {
                switch(item.InfoBelongMod){
                    case '1':
                        this.$router.push({ path: '/smis/harmnotify/audit' })
                        break;
                    case '2':
                        this.$router.push({ path: `/smis/car-accident-event/${item.ModuleItemID}/show` })
                        break;
                    case '3':
                    case '4':
                        this.$router.push({ path: `/smis/car-harmdb/control-measures/${item.ModuleItemID}/edit` })
                        break;
                    case '5':
                        // this.$router.push({ path: '/smis/car-safeinfo/info' })
                        this.$router.push({ path: `/smis/car-safeinfo/info/${item.ModuleItemID}/show` })
                        break;
                    case '6':
                        this.$router.push({ path: '/smis/safefile/meeting' })
                        break;
                    case '7':
                        this.$router.push({ path: '/smis/safefile/regulations' })
                        break;
                    case '8':
                        this.$router.push({ path: `/smis/car-safe-performance/machine-abnormal/${item.ModuleItemID}/edit` })
                        break;
                    case '9':
                        this.$router.push({ path: `/smis/jobsafety/physical/${item.ModuleItemID}/list` })
                        break;
                    case '10':
                        this.$router.push({ path: `/smis/car-safe-performance/speed-abnormal/${item.ModuleItemID}/edit` })
                        break;
                    case '11':
                        this.$router.push({ path: `/smis/jobsafety/disaster-survey/${item.ModuleItemID}/show` })
                        break;
                    case '12':
                        // this.$router.push({ path: 'XXXXXXXXXXXXXXX' })
                        break;
                    case '13':
                        this.$router.push({ path: `/smis/car-safeinfo/crawl-notify/${item.ModuleItemID}/edit` })
                        break;
                    case '14':
                        this.$router.push({ path: `/smis/car-harmdb/harms/${item.ModuleItemID}/show` })
                        break;
                    case '15':
                        this.$router.push({ path: `/smis/jobsafety/disasterDb/${item.ModuleItemID}/show` })
                        break;
                    case '16':
                        // this.$router.push({ path: '/worklist/maintain' })
                        this.$router.push({ path: `/worklist/maintain/${item.ModuleItemID}/show` })
                        break;
                    case '17':
                        this.$router.push({ path: `/worklist/serve/${item.ModuleItemID}/show` })
                        break;
                    case '18':
                        this.$router.push({ path: '/mmis/periodicity-job' })
                        break;
                }
                this.chMsgbar({ success: true, msg: '成功轉跳至操作頁面' })
            }
            
        },
        // 更換頁數-個人訊息
        chPage(n) {
            this.pageOpt.personal.page = n
        },
        // 更換頁數-待辦事項
        chPageTodo(n) {
            this.pageOpt.todo.page = n
        },
        personClick(item){
            //改為已讀
            fetchPersonalInfoRead({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                ModuleItemID: item.ModuleItemID,
                InfoBelongMod: item.InfoBelongMod,
                MsgType: item.MsgType,
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    console.log("首頁個人資訊已讀 item: ", item);
                    console.log("首頁個人資訊已讀 res.data: ", res.data);
                    console.log("首頁個人資訊已讀 this.tableItems.personal: ", this.tableItems.personal);
                    // item.isRead = false
                    this.tableItems.personal.find(e => e.id == item.ModuleItemID).isRead = true;

                    setTimeout(() => {
                        this.$router.push({ path: `/smis/car-safeinfo/info/${item.ModuleItemID}/show` })
                    }, 300)

                }
            }).catch( err => {
                console.log(err)
            }).finally(() => {
            })
        },
        // 轉換部門文字
        transferDepartTxt(val) {
            console.log("departOptions: ", departOptions.map(e=>e.value));
            console.log("val: ", val);
            return departOptions.find(item => item.value == val).text
        },
    },
    created() {
        this.initData()
    },
}
</script>
