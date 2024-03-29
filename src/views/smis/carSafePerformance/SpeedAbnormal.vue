<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">車速異常表查詢</h2>

    <v-row class="px-2 label-header">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>日期(起)
            </h3>
            <v-menu
                v-model="dateMenuShow.start"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model.trim="searchIpt.DTime_Start"
                        solo
                        v-on="on"
                        readonly
                        clearable
                        @click:clear="timeAClean"
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="primary"
                    v-model="searchIpt.DTime_Start"
                    @input="timeA"
                    :max="dateAMax"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>日期(迄)
            </h3>
            <v-menu
                v-model="dateMenuShow.end"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model.trim="searchIpt.DTime_End"
                        solo
                        v-on="on"
                        readonly
                        clearable
                        @click:clear="timeBClean"
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="primary"
                    v-model="searchIpt.DTime_End"
                    @input="timeB"
                    :min="dateBMin"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>車次
            </h3>
            <v-text-field
                v-model.trim="searchIpt.CarVersion"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12">
            <v-btn dark large class="ma-2 btn-search"
                @click="search"
            >
                <v-icon class="mr-1">mdi-magnify</v-icon>查詢
            </v-btn>

            <v-btn dark large class="ma-2 btn-add"
                to="/smis/car-safe-performance/speed-abnormal/add"
            >
                <v-icon>mdi-plus</v-icon>新增
            </v-btn>

            <v-btn elevation="2" large class="ma-2 btn-clear"
                @click="reset"
            >
                <v-icon>mdi-reload</v-icon>清除搜尋內容
            </v-btn>

            <v-btn dark large class="ma-2 btn-close"
                :to="`/smis/car-safe-performance`"
            >回上層</v-btn>
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

                    <template v-slot:item.ErrTitle="{ item }">
                        <v-btn class="btn-detail" dark
                            @click="showContent(item.ErrTitle)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.ErrCheckStatus="{ item }">
                        <v-btn class="btn-detail" dark
                            @click="showContent(item.ErrCheckStatus)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.Attachment="{ item }">
                        <v-btn fab small dark class="btn-memo"
                            v-if="item.Attachment.length > 0 && item.Attachment[0] != ''"
                            @click="showFiles(item)"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn fab small
                            target="_blank"
                            class="mr-3 btn-modify white--text"
                            :to="`/smis/car-safe-performance/speed-abnormal/${item.FlowID}/edit`"
                        >
                            <v-icon>mdi-pen</v-icon>
                        </v-btn>

                        <v-btn fab small class="btn-delete white--text"
                            @click="delControl(item.FlowID)"
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

    <!-- 檔案列表 -->
    <v-dialog v-model="dialogShow" max-width="400px">
        <v-card class="theme-card">
            <v-toolbar flat dense dark class="metal-dark-yellow-top">
                <v-toolbar-title>檔案列表</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn fab small text @click="dialogShow = false" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-list-item-group>
                <template v-for="(item, idx) in fileList">
                    <v-list-item
                        :key="item.Attachment"
                        :href="item.AttachmentPath"
                        :download="item.Attachment"
                    >
                        <v-list-item-content>
                            <v-list-item-title>{{ item.Attachment }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider
                        v-if="idx + 1 < fileList.length"
                        :key="idx"
                    ></v-divider>
                </template>
            </v-list-item-group>
        </v-card>
    </v-dialog>
    <!-- 刪除 modal -->
    <v-dialog v-model="Delete" persistent max-width="290">
        <v-card class="theme-del-card">
            <v-card-title class="white--text px-4 py-1 headline">確認是否刪除?</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="btn-close white--text" @click="close">取消</v-btn>
                <v-btn class="btn-delete white--text" @click="goDelete">刪除</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Pagination from '@/components/Pagination.vue'
import { carspeedQueryList,carspeedUpdate } from '@/apis/smis/safetyPerformance'
import { getNowFullTime,decodeObject } from '@/assets/js/commonFun'

export default {
    data: () => ({
        searchIpt: {},
        searchDefault: {
            DTime_Start: '',  // 日期(起)
            DTime_End: new Date().toISOString().substr(0, 10),  // 日期(迄)
            CarVersion: '',  // 車次
        },
        dateAMax: new Date().toISOString().substr(0, 10),
        dateBMin: '',
        dateMenuShow: {
            start: false,
            end: false,
        },
        typeOpts: [  // 機車或客車下拉選單
            { text: '不限', value: '' },
            { text: '機車', value: '機車' },
            { text: '客車', value: '客車' },
        ],
        pageOpt: { page: 1 },  // 目前頁數
        tableItems: [],  // 表格資料
        headers: [  // 表格欄位
            // { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '70' },
            { text: '日期', value: 'CheckDate', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '車次', value: 'CarVersion', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '80' },
            { text: '駕駛姓名', value: 'ErrPeopleName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '100' },
            { text: '區段', value: 'CarLineZone', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '150' },
            { text: '時間範圍', value: 'CarTimeRange', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '120' },
            { text: '平均車速', value: 'AverageSpeed', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '100' },
            { text: '每小時超出公里數', value: 'OverSpeed', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '110' },
            { text: '超速級別', value: 'OverSpeedStatus', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '100' },
            { text: '異常概況', value: 'ErrTitle', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '100' },
            { text: '處理情形', value: 'ErrCheckStatus', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '100' },
            { text: '附件', value: 'Attachment', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '70' },
            { text: '編輯、刪除', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '130' },
        ],
        fileList: [],  // 檔案列表
        dialogShow: false,  // 檔案dialog是否顯示
        Delete: false,
        DeleteItem: '',
    }),
    components: { Pagination },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'chViewDialog',  // 檢視內容 dialog
        ]),
        // 清除搜尋內容
        reset() {
            this.searchIpt = { ...this.searchDefault }
        },
        timeA(){
            this.dateMenuShow.start = false
            this.dateBMin = this.searchIpt.DTime_Start
        },
        timeAClean(){
            this.dateBMin = ''
        },
        timeB(){
            this.dateMenuShow.end = false
            this.dateAMax = this.searchIpt.DTime_End
        },
        timeBClean(){
            this.dateAMax = ''
        },
         // 查詢
        search() {
            this.chLoadingShow({show:true})
            this.pageOpt.page = 1  // 頁碼初始化
            carspeedQueryList({
                ...this.searchIpt,
                ClientReqTime: getNowFullTime(),
                OperatorID: this.userData.UserId,  // 操作人id
            }).then( res => {
                if (res.data.ErrorCode == 0) {
                    if(res.data.DataList.length > 0){
                        this.tableItems = decodeObject(res.data.DataList)
                        }
                    else{
                        this.tableItems = [...[]]
                    }
                }else {
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
            }).catch( err => {
                console.warn(err)
                this.chMsgbar({ success: false, msg: '伺服器發生問題，清單查詢失敗' })
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
         // 刪除控制措施
        delControl(id) {
            this.DeleteItem = id
            this.Delete = true
        },
        goDelete() {
            this.chLoadingShow({show:true})
            carspeedUpdate({
                FlowID:this.DeleteItem,
                Option: 'D',
                ClientReqTime: getNowFullTime(),
                OperatorID: this.userData.UserId,  // 操作人id
                FileCount: []
            }).then( res => {
                if (res.data.ErrorCode == 0) {
                    this.chMsgbar({ success: true, msg: '刪除成功' })
                }else {
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
            }).catch( err => {
                console.warn(err)
                this.chMsgbar({ success: false, msg: '伺服器發生問題，刪除失敗' })
            }).finally(() => {
                this.chLoadingShow({show:false})
                this.Delete = false
                this.search()
            })
        },
        // 顯示檔案
        showFiles(arr) {
            this.fileList = [...[]]
            if (arr.Attachment.length > 0){
                for (let i = 0; i < arr.Attachment.length; i++) {
                    this.fileList.push({Attachment: arr.Attachment[i], AttachmentPath: arr.AttachmentPath[i]})
                }
            }
            
            this.dialogShow = true
        },
        close(){
            this.Delete = false
        }
    },
    created() {
        this.searchIpt = { ...this.searchDefault }
    }
}
</script>