<template>
<v-container style="max-width: 1200px">
    <h2 class="label-title mb-4">個人健檢資料</h2>

    <v-row class="px-2 mb-8">
        <v-col cols="12">
            <v-btn dark large class="btn-close my-2 mr-2"
                @click="close"
            >回搜尋頁</v-btn>

            <v-btn dark large class="btn-add ma-2"
                @click="add"
            >
                <v-icon>mdi-plus</v-icon>新增
            </v-btn>
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
                    </template>

                    <template v-slot:item.Competence="{ item }">
                        {{ (item.Competence == 'T')? '適任' : '不適任' }}
                    </template>

                    <template v-slot:item.content="{ item }">
                        <v-btn small dark fab class="btn-detail"
                            target="_blank"
                            :to="`/smis/jobsafety/physical/${id}/show/${item.FlowID}`"
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
    </v-row>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { healthCdList } from '@/apis/smis/health'
import Pagination from '@/components/Pagination.vue'

export default {
    props:['id'],
    data: () => ({
        routeId: '',
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '健檢日期', value: 'HealthCheckDate', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold darken-1' },
            { text: '部門', value: 'DepartName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold darken-1' },
            { text: '姓名', value: 'Name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold darken-1' },
            { text: '健檢評級', value: 'HealthResultLevel', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold darken-1' },
            { text: '適任性', value: 'Competence', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold darken-1' },
            { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold darken-1' },
        ],
        dialog: false,  // dialog 是否顯示
        isLoading: false,  // 是否讀取中
        editIdx: 0,  // 編輯索引值
        note: '',  // 備註
    }),
    components: { Pagination },  // 頁碼
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
    methods: {
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
            'chMsgbar',
        ]),
        // 初始化資料
        initData() {
            this.chLoadingShow({show:true})
            this.routeId = this.id  // 路由參數(id)
            healthCdList({
                ID: this.id,
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res=>{
                if (res.data.ErrorCode == 0) {
                    if(res.data.HealthDataList.length > 0){
                        this.tableItems = res.data.HealthDataList.map(element=>({
                            FlowID: element.FlowID,
                            DepartName: element.Depart,
                            Name: element.Name,
                            HealthCheckDate: element.HealthCheckDate,
                            HealthResultLevel: element.HealthResultLevel,
                            Competence: element.Competence
                        }))
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
        // 新增
        add() {
            this.$router.push({ path: `/smis/jobsafety/physical/${this.routeId}/form` })
        },
        close() {
            if(window.opener!= null){
                window.close()
            }else{
                this.$router.push({ path: `/smis/jobsafety/physical` })
            }
        }
    },
    created() {
        this.initData()
    },
}
</script>