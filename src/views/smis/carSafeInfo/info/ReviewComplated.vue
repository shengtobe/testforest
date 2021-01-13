<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">安全資訊編號：{{ id }}</h2>

    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8">
        <BottomTable :items="bottomItems" />

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-paperclip</v-icon>檔案附件
                    </span>
                </v-col>

                <v-col class="white pa-3">
                    <v-chip small label color="primary" class="mr-2 mb-2 mb-sm-0"
                        v-for="item in files"
                        :key="item.fileName"
                        :href="item.link"
                        :download="item.fileName"
                    >
                        {{ item.fileName }}
                    </v-chip>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12" class="mt-8" v-if="status == 3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-pen</v-icon>加會意見
                <span class="red--text">*</span>
            </h3>
            <v-textarea
                hide-details
                auto-grow
                solo
                rows="6"
                placeholder="請輸入加會意見"
                v-model.trim="opinion"
            ></v-textarea>
        </v-col>

        <!-- 加會意見列表 -->
        <v-col cols="12" class="mt-8" v-if="status == 4">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>加會意見
            </h3>
            
            <v-row no-gutters
                v-for="item in opinionList"
                :key="item.name"
            >
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">{{ item.name }}</span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="item.text.replace(/\n/g, '<br>')"
                ></v-col>
            </v-row>
        </v-col>

        <v-col cols="12" class="text-center mt-12 mb-8">
            <v-btn dark class="ma-2"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done">
                <v-btn dark  class="ma-2" color="error"
                    @click="dialog = true"
                    v-if="status == 2"
                >退回</v-btn>

                <v-btn dark  class="ma-2" color="success"
                    @click="save"
                    v-if="status == 2"
                >同意發布</v-btn>

                <v-btn dark  class="ma-2" color="success"
                    v-if="status == 3"
                    @click="sendSuggestion"
                >送出意見</v-btn>
            </template>

            <v-btn dark class="ma-2" color="info"
                v-if="status == 4"
                @click="print"
            >列印</v-btn>
        </v-col>
    </v-row>

    <!-- 讀取追蹤 -->
    <template v-if="status == 4">
        <v-divider class="mx-2 mt-5 mb-4"></v-divider>

        <h2 class="mb-4 px-2 text-center">
            <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>讀取追蹤
        </h2>

        <v-row class="px-2">
            <!-- 加會人 -->
            <v-col cols="12">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>加會人
                </h3>

                <v-card>
                    <v-data-table
                        :headers="joinHeaders"
                        :items="joinTableItems"
                        disable-sort
                        hide-default-footer
                    >
                        <template v-slot:no-data>
                            <span class="red--text subtitle-1">沒有資料</span>
                        </template>

                        <template v-slot:item.isRead="{ item }">
                            <div v-if="item.isRead == '已讀'">{{ item.isRead }}</div>
                            <div v-else class="error--text">{{ item.isRead }}</div>
                        </template>

                        <template v-slot:item.hasMsg="{ item }">
                            <div v-if="item.hasMsg">已留意見</div>
                            <div v-else class="error--text">尚未留意見</div>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>

            <!-- 收件人 -->
            <v-col cols="12" sm="4" md="3" class="mt-12">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>收件人
                </h3>
                <v-text-field
                    v-model.trim="keyword"
                    placeholder="請輸入任意關鍵字"
                    solo
                    hide-details
                ></v-text-field>
            </v-col>

            <v-col cols="12">
                <v-card>
                    <v-data-table
                        :search="keyword"
                        :headers="headers"
                        :items="tableItems"
                        :options.sync="pageOpt"
                        disable-sort
                        hide-default-footer
                    >
                        <template v-slot:no-data>
                            <span class="red--text subtitle-1">沒有資料</span>
                        </template>

                        <template v-slot:no-results>
                            <span class="red--text subtitle-1">沒有符合「{{ keyword }}」的資料</span>
                        </template>

                        <template v-slot:item.isRead="{ item }">
                            <div v-if="item.isRead == '已讀'">{{ item.isRead }}</div>
                            <div v-else class="error--text">{{ item.isRead }}</div>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>

            <v-col cols="12" class="text-center mb-8">
                <v-btn dark
                    to="/smis/car-safeinfo/info"
                >回搜尋頁</v-btn>
            </v-col>
        </v-row>
    </template>

    <!-- 退回 dialog -->
    <v-dialog v-model="dialog" max-width="600px"
        v-if="status == 2"
    >
        <v-card>
            <v-toolbar dark flat dense color="error" class="mb-2">
                <v-toolbar-title>退回原因</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn fab small text @click="dialog = !dialog" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-textarea
                            hide-details
                            solo
                            rows="8"
                            placeholder="請輸入原因"
                            v-model.trim="backReason"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            
            <v-card-actions class="px-5 pb-5">
                <v-spacer></v-spacer>
                <v-btn class="mr-2" elevation="4" :loading="isLoading" @click="dialog = false">取消</v-btn>
                <v-btn color="success"  elevation="4" :loading="isLoading" @click="withdraw">送出</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import TopBasicTable from '@/components/TopBasicTable.vue'
import BottomTable from '@/components/BottomTable.vue'

export default {
    props: ['itemData'],
    data: () => ({
        id: '',  // 編號
        done: false,  // 是否完成頁面操作
        status: '',  // 處理狀態
        topItems: [],  // 上面的欄位
        bottomItems: [],  // 下面的欄位
        files: [],  // 檔案附件
        opinion: '',  // 加會意見
        opinionList: [],  // 意見列表
        isLoading: false,  // 退回 dialog 是否讀取中
        dialog: false,  // 退回 dialog 是否顯示
        backReason: '',  // 退回原因
        keyword: '',  // 關鍵字
        joinTableItems: [],  // 加會人表格資料
        joinHeaders: [  // 加會人表格顯示的欄位
            { text: '項次', value: 'num', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: 80 },
            { text: '單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '姓名', value: 'name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '是否讀取', value: 'isRead', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '讀取時間', value: 'time', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '是否已留意見', value: 'hasMsg', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
        tableItems: [],  // 收件人表格資料
        pageOpt: { page: 1 },  // 收件人目前頁數
        headers: [  // 收件人表格顯示的欄位
            { text: '項次', value: 'num', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: 80 },
            { text: '單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '姓名', value: 'name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '是否讀取', value: 'isRead', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '讀取時間', value: 'time', align: 'center', filterable: false, divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
    }),
    components: {
        TopBasicTable,
        BottomTable,
    },
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        }
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'closeWindow',  // 關閉視窗
        ]),
        // 初始化資料
        setShowData(obj) {
            this.id = obj.id  // 編號
            this.status = obj.status  // 事故事件狀態(值)
            this.topItems = obj.topItems  // 上面的欄位資料
            this.bottomItems = obj.bottomItems  // 下面的欄位資料
            this.files = [ ...obj.files ]  // 檔案附件
            this.opinionList = [ ...obj.opinionList ]  // 加會意見列表

            // 讀取追蹤-加會人
            this.joinTableItems = obj.Jdata.map((item, idx) => ({
                num: idx + 1,
                depart: item.depart,
                name: item.name,
                isRead: (item.isRead)? '已讀' : '未讀',
                time: item.time,
                hasMsg: item.hasMsg,
            }))

            // 讀取追蹤-收件人
            this.tableItems = obj.Rdata.map((item, idx) => ({
                num: idx + 1,
                depart: item.depart,
                name: item.name,
                isRead: (item.isRead)? '已讀' : '未讀',
                time: item.time,
            }))
        },
        // 退回
        withdraw() {
            this.isLoading = true

            setTimeout(() => {
                this.chMsgbar({ success: true, msg: '退回成功'})
                this.done = true  // 隱藏頁面操作按鈕
                this.dialog = false
            }, 1000)
        },
        // 作廢
        del() {
            if (confirm('你確定要作廢嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '作廢成功'})
                    this.done = true  // 隱藏頁面操作按鈕
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 同意發布
        save() {
            if (confirm('你確定要發布嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '同意發布成功'})
                    this.done = true  // 隱藏頁面操作按鈕
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 送出意見
        sendSuggestion() {
            if (confirm('你確定要送出意見嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '同意送出意見成功'})
                    this.done = true  // 隱藏頁面操作按鈕
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 列印
        print() {
            this.chLoadingShow()

            setTimeout(() => {
                this.chLoadingShow()
            }, 1000)
        },
    },
    created() {
        this.setShowData(this.itemData)
    }
}
</script>