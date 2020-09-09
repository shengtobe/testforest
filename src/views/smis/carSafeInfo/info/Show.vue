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
                        target="_blank"
                        rel="noopener norefferrer"
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

        <v-col cols="12" class="text-center mt-12 mb-8">
            <v-btn dark class="ma-2"
                to="/smis/car-safeinfo/info"
            >回搜尋頁</v-btn>

            <v-btn dark class="ma-2"
                color="indigo"
                :to="`/smis/car-safeinfo/info/${routeId}/edit`"
            >編輯</v-btn>

            <v-btn dark  class="ma-2" color="error"
                @click="del"
            >作廢</v-btn>

            <v-btn dark  class="ma-2" color="success"
                @click="save"
            >申請審核</v-btn>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import TopBasicTable from '@/components/TopBasicTable.vue'

export default {
    data: () => ({
        routeId: '',
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
                    status: 1,
                }

                this.setShowData(obj)
                this.chLoadingShow()
            }, 1000)
        },
        // 初始化資料
        setShowData(obj) {
            this.topItems.depart.text = obj.depart  // 權責部門
            this.topItems.name.text = obj.name  // 通報人
            this.topItems.status.text = '已立案'  // 發布狀態

            this.title = obj.title // 通報主題
            this.desc = obj.desc.replace(/\n/g, '<br>')  // 發布內容
            this.files = [ ...obj.files ]  // 檔案附件

            // 收件人
            this.recipients = obj.recipients.map(item => (this.transferMemberName(item))).join('、')
            // 副本
            this.cc = obj.cc.map(item => (this.transferMemberName(item))).join('、')
            // 加會人
            this.joiners = obj.joiners.map(item => (this.transferMemberName(item))).join('、')
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
        // 申請審核
        save() {
            this.chLoadingShow()

            setTimeout(() => {
                this.$router.push({ path: '/smis/car-safeinfo/info' })
                this.chMsgbar({ success: true, msg: '申請審核成功'})
                this.chLoadingShow()
            }, 1000)
        },
        // 員工編號轉換姓名
        transferMemberName(id) {
            return this.members.find(item => item.value == id).name
        },
    },
    created() {
        this.fetchData()
    }
}
</script>