<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">安全資訊編號：{{ routeId }}</h2>

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
                        <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>通報主題
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ title }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>發布內容
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="desc"
                ></v-col>
            </v-row>
        </v-col>

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

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>收件人
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ recipients }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>副本
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ cc }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>加會人
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ joiners }}</v-col>
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
                to="/smis/car-safeinfo/info"
            >回搜尋頁</v-btn>

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
            >送出意見</v-btn>

            <v-btn dark  class="ma-2" color="info"
                 v-if="status == 4"
                @click="print"
            >列印</v-btn>
        </v-col>
    </v-row>

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

export default {
    props: ['closeStatus'],  // 測試用屬性
    data: () => ({
        routeId: '',
        status: '',  // 處理狀態
        topItems: {  // 上面的欄位
            depart: { icon: 'mdi-bank', title: '通報單位', text: '' },
            name: { icon: 'mdi-account', title: '通報人', text: '' },
            status: { icon: 'mdi-ray-vertex', title: '發布狀態', text: '' },
        },
        title: '',  // 通報主題
        desc: '',  // 發布內容
        recipients: '',  // 收件人
        cc: '',  // 副本
        joiners: '',  // 加會人
        files: [],  // 檔案附件
        opinion: '',  // 加會意見
        opinionList: [],  // 意見列表
        isLoading: false,  // 退回 dialog 是否讀取中
        dialog: false,  // 退回 dialog 是否顯示
        backReason: '',  // 退回原因
        members: [  // 所有員工資料
            { name: '趙國強 (K59632)', value: '1'},
            { name: '錢光華 (K12584)', value: '2'},
            { name: '孫文豪 (K69584)', value: '3'},
            { name: '李運深 (K24785)', value: '4'},
            { name: '周寶盛 (K65241)', value: '5'},
            { name: '吳泓吉 (K58963)', value: '6'},
            { name: '鄭家豪 (K24758)', value: '7'},
            { name: '王永慶 (K25896)', value: '8'},
        ],
    }),
    components: { TopBasicTable },
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
        ]),
        // 向後端取得資料
        fetchData() {
            this.chLoadingShow()
            this.routeId = this.$route.params.id

            // 新增測試用資料
            setTimeout(() => {
                let obj = {
                    id: '111',
                    depart: '綜合企劃科',
                    name: '王小明',
                    title: '3月份團康活動',
                    desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',  // 說明
                    recipients: ['2', '4', '5'],  // 收件人
                    cc: ['6'],  // 副本
                    joiners: ['7'],  // 加會人
                    files: [
                        { fileName: 'ASRC200701.jpg', link: '/demofile/demo.jpg' },
                        { fileName: '123.docx', link: '/demofile/123.docx' },
                        { fileName: '456.xlsx', link: '/demofile/456.xlsx' },
                    ],
                    opinionList: [
                        {
                            name: '鄭家豪',
                            text: '意見文字意見文字意見文字意見文字意見文字意見文字意見文字意見文字意見文字意見文字意見文字意見文字意見文字意見文字意見文字意見文字',
                        },
                    ],
                }

                this.setShowData(obj)
                this.chLoadingShow()
            }, 1000)
        },
        // 初始化資料
        setShowData(obj) {
            this.topItems.depart.text = obj.depart  // 權責部門
            this.topItems.name.text = obj.name  // 通報人
            this.topItems.status.text = (this.closeStatus == 2)? '審核中' : ((this.closeStatus == 3)? '加會中' : '已發布')  // 發布狀態
            this.title = obj.title // 通報主題
            this.desc = obj.desc.replace(/\n/g, '<br>')  // 發布內容
            this.files = [ ...obj.files ]  // 檔案附件
            this.opinionList = [ ...obj.opinionList ]  // 加會意見列表

            // 收件人
            this.recipients = obj.recipients.map(item => (this.transferMemberName(item))).join('、')
            // 副本
            this.cc = obj.cc.map(item => (this.transferMemberName(item))).join('、')
            // 加會人
            this.joiners = obj.joiners.map(item => (this.transferMemberName(item))).join('、')

            // 設定狀態(測試資料)
            this.status = this.closeStatus
        },
        // 退回
        withdraw() {
            this.isLoading = true

            setTimeout(() => {
                this.chMsgbar({ success: true, msg: '退回成功'})
                this.$router.push({ path: '/smis/car-safeinfo/info' })
                this.isLoading = false
            }, 1000)
        },
        // 作廢
        del() {
            if (confirm('你確定要作廢嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.$router.push({ path: '/smis/car-safeinfo/info' })
                    this.chMsgbar({ success: true, msg: '作廢成功'})
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 同意發布
        save() {
            if (confirm('你確定要發布嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.$router.push({ path: '/smis/car-safeinfo/info' })
                    this.chMsgbar({ success: true, msg: '同意發布成功'})
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 員工編號轉換姓名
        transferMemberName(id) {
            return this.members.find(item => item.value == id).name
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
        this.fetchData()
    }
}
</script>