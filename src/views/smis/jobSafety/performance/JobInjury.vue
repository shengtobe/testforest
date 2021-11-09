<template>
<v-container style="max-width: 1200px" class="label-header">
    <h2 class="mb-4 label-title">職能傷害率</h2>

    <v-row class="px-2 mb-8">
        <v-col cols="12" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-tag</v-icon>前年總工時(小時)
            </h3>
            <v-text-field
                v-model.trim="searchIpt.YearHr_belast"
                solo
                placeholder="請輸前年總工時"
                suffix="hr"
            ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-tag</v-icon>去年總工時(小時)
            </h3>
            <v-text-field
                v-model.trim="searchIpt.YearHr_last"
                solo
                placeholder="請輸去年總工時"
                suffix="hr"
            ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-tag</v-icon>今年總工時(小時)
            </h3>
            <v-text-field
                v-model.trim="searchIpt.YearHr_this"
                solo
                placeholder="請輸今年總工時"
                suffix="hr"
            ></v-text-field>
        </v-col>
        <v-col cols="12" md="3" align-self="center">
            <v-btn dark large class="my-2 mr-2 btn-search"
                @click="search"
            >
                <v-icon class="mr-1">mdi-magnify</v-icon>查詢
            </v-btn>

            <v-btn dark large class="ma-2 btn-add"
                @click="edit"
            >
                <v-icon>mdi-pencil</v-icon>編輯
            </v-btn>
        </v-col>

        <v-col cols="12" md="6" align-self="center">
            <v-btn dark large class="my-2 mr-2 btn-search"
                @click="search"
            >
                <v-icon class="mr-1">mdi-magnify</v-icon>查詢
            </v-btn>

            <v-btn dark large class="ma-2 btn-add"
                to="/smis/jobsafety/disasterdb/add"
            >
                <v-icon>mdi-plus</v-icon>新增
            </v-btn>

            <!-- <v-btn elevation="2" large class="ma-2"
                @click="reset"
            >
                <v-icon class="mr-1">mdi-reload</v-icon>清除搜尋內容
            </v-btn> -->
        </v-col>

        <!-- 表格資料 -->
        <v-col cols="12">
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
                    </template>codes

                    <template v-slot:item.codes="{ item }">
                        {{ item.code1 }}-{{ item.code2 }}-{{ item.code3 }}
                    </template>

                    <template v-slot:item.serious="{ item }">
                        {{ transferSeriousText(item.serious) }}
                    </template>

                    <template v-slot:item.possibility="{ item }">
                        {{ transferPossibilityText(item.possibility) }}
                    </template>

                    <template v-slot:item.level="{ item }">
                        {{ transferLevelText(item.level) }}
                    </template>

                    <template v-slot:item.content="{ item }">
                        <v-btn small dark fab class="btn-detail"
                            :loading="isLoading"
                            @click="redirect(item)"
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
import Pagination from '@/components/Pagination.vue'
import { jobSeriousOpts, jobPossibilityOpts, jobLevelOpts } from '@/assets/js/smisData'
import { searchDataDb, jobDangerYearhr, jobDangerOccupationrate } from '@/apis/smis/jobSafety'

export default {
    data: () => ({
        searchIpt: {},
        searchDefault: {
            YearHr_belast: '',  // 前年總工時(小時)
            YearHr_last: '',  // 去年總工時(小時)
            YearHr_this: '',  // 金年總工時(小時)
        },
        tableItems: [],  // 表格資料
        depart: '', // 篩選部門
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '編號', value: 'EndangerCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '作業名稱', value: 'JobName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '風險嚴重性', value: 'EndangerLevel', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '風險可能性', value: 'EndangerProb', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '風險等級', value: 'RiskLevel', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        ],
        opts: {
            status: [  // 事故事件狀態 (審核中有二個，故傳中文值讓後端判斷)
                { text: '不限', value: '' },
                { text: '已立案', value: '已立案' },
                { text: '已完備資料', value: '已完備資料' },
                { text: '改善措施已落實', value: '改善措施已落實' },
                { text: '審核中', value: '審核中' },
                { text: '已作廢', value: '已作廢' },
            ],
        },
        isLoading: false,  // 是否讀取中
    }),
    components: { Pagination },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
    methods: {
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 清除搜尋內容
        reset() {
            this.searchIpt = { ...this.searchDefault }
        },
        // 搜尋
        search() {
            this.chLoadingShow({show:true})
            this.pageOpt.page = 1  // 頁碼初始化

            jobDangerYearhr({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                Mode: '1',  // DB table
                YearHr_belast: this.searchIpt.YearHr_belast,
                YearHr_last: this.searchIpt.YearHr_last,
                YearHr_this: this.searchIpt.YearHr_this,
            }).then(res => {
                console.log("jobDangerYearhr res data: ", res.data);
                // let tempTable = JSON.parse(res.data.order_list)
                // tempTable.forEach(element => {
                //     for(let ele in element){
                //         if(element[ele] == null){
                //             element[ele] = '';
                //         }
                //     }
                // });
                // if(this.depart == ''){
                //     this.tableItems = tempTable
                // }
                // else{
                //     this.tableItems = tempTable.filter((item) =>
                //         (item.EndangerCode.split('-'))[0] == this.depart
                //     );
                // }
                
            }).catch(err => {
                //console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow({show:false})
            })

            jobDangerOccupationrate({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                YearHr_belast: this.searchIpt.YearHr_belast,
                YearHr_last: this.searchIpt.YearHr_last,
                YearHr_this: this.searchIpt.YearHr_this,
            }).then(res => {
                console.log("jobDangerOccupationrate res data: ", res.data);
                // let tempTable = JSON.parse(res.data.order_list)
                // tempTable.forEach(element => {
                //     for(let ele in element){
                //         if(element[ele] == null){
                //             element[ele] = '';
                //         }
                //     }
                // });
                // if(this.depart == ''){
                //     this.tableItems = tempTable
                // }
                // else{
                //     this.tableItems = tempTable.filter((item) =>
                //         (item.EndangerCode.split('-'))[0] == this.depart
                //     );
                // }
                
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
        redirect(item) {
            //開新分頁
            let routeData = this.$router.resolve({ path: `/smis/jobsafety/disasterdb/${item.EndangerCode}/show` })
            window.open(routeData.href, '_blank')
        },
        // 轉換風險嚴重性文字
        transferSeriousText(val) {
            return jobSeriousOpts.find(item => item.value == val).text
        },
        // 轉換風險風險可能性文字
        transferPossibilityText(val) {
            return jobPossibilityOpts.find(item => item.value == val).text
        },
        // 轉換風險風險等級文字
        transferLevelText(val) {
            return jobLevelOpts.find(item => item.value == val).text
        },
    },
    created() {
        this.searchIpt = { ...this.searchDefault }
    },
}
</script>