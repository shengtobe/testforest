<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">事故事件編號：{{ id }}</h2>

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

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-ungroup</v-icon>通報連結
                    </span>
                </v-col>

                <v-col class="white pa-3">
                    <v-chip small label color="teal" class="mr-2 mb-2 mb-sm-0"
                        v-for="item in notifyLinks"
                        :key="item.id"
                        :to="item.link"
                        target="_blank"
                        rel="noopener norefferrer"
                        dark
                    >
                        <v-avatar left>
                            <v-icon>mdi-link-variant</v-icon>
                        </v-avatar>
                        {{ item.id }}
                    </v-chip>
                </v-col>
            </v-row>
        </v-col>

        <!-- 死傷人數 -->
        <v-col cols="12" class="mt-10">
            <h3>
                <v-icon class="mr-1 mb-2">mdi-hospital-building</v-icon>
                <span class="mr-2">死傷人數：</span>{{ deathCount }}
            </h3>
        </v-col>
        
        <v-col cols="12" v-if="deathCount > 0">
            <v-card flat>
                <v-data-table
                    :headers="headers"
                    :items="deathData"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                >
                </v-data-table>
            </v-card>
        </v-col>

        <!-- 改善措施 -->
        <v-col cols="12" class="mt-8 mb-12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-2">mdi-book-open-page-variant</v-icon>控制措施
            </h3>

            <v-card flat>
                <v-data-table
                    :headers="controlHeaders"
                    :items="controlItems"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:item.desc="{ item }">
                        <v-btn color="teal" dark
                            @click="showContent(item.desc)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.file="{ item }">
                        <v-btn small dark fab color="indigo"
                            :href="item.file.link"
                            :download="item.file.name"
                        >
                            <v-icon dark>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                     <template v-slot:item.evidences="{ item }">
                        <v-btn fab small dark color="purple lighten-2"
                            @click="showEvidences(item.evidences)"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC" class="mb-4">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>改善措施摘要
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="summary"
                ></v-col>
            </v-row>
        </v-col>

        <!-- 檢討摘要、證據上傳 -->
        <template v-if="status == 3">
            <v-col cols="12" class="mt-12 mb-8">
                <v-divider></v-divider>
            </v-col>

            <v-col cols="12" class="mb-8">
                <h3 class="mb-2">
                    <v-icon class="mr-1 mb-1">mdi-pen</v-icon>措施檢討摘要
                </h3>
                <v-textarea
                    auto-grow
                    solo
                    rows="6"
                    placeholder="請輸入措施檢討摘要"
                    v-model.trim="controlReview"
                ></v-textarea>
            </v-col>

            <UploadFileAdd
                title="證據上傳"
                :uploadDisnable="false"
                :fileList="evidences"
                @joinFile="joinFile"
                @rmFile="rmFile"
            />
        </template>

        <v-col cols="12" class="text-center mt-12 mb-8">
            <v-btn dark class="ma-2"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done">
                <v-btn dark  class="ma-2" color="error"
                    @click="dialog = true"
                    v-if="status == '2'"
                >退回</v-btn>

                <v-btn dark  class="ma-2" color="success"
                    @click="save"
                    v-if="status == '2'"
                >同意措施執行</v-btn>

                <v-btn dark  class="ma-2" color="primary"
                    @click="rerun"
                    v-if="status == '3'"
                >重提事故事件</v-btn>

                <v-btn dark  class="ma-2" color="error"
                    @click="del"
                    v-if="status == '3'"
                >作廢</v-btn>

                <v-btn dark  class="ma-2" color="success"
                    @click="closeCase"
                    v-if="status == 3"
                >申請結案</v-btn>
            </template>
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

    <!-- 控制措施證據 dialog -->
    <v-dialog v-model="dialogShow" max-width="400px">
        <v-card>
            <v-toolbar flat dense dark color="purple lighten-2">
                <v-toolbar-title>證據</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn fab small text @click="dialogShow = false" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-list-item-group>
                <template v-for="(item, idx) in evidences">
                    <v-list-item
                        :key="item.name"
                        :href="item.link"
                        :download="item.name"
                    >
                        <v-list-item-content>
                            <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider
                        v-if="idx + 1 < evidences.length"
                        :key="idx"
                    ></v-divider>
                </template>
            </v-list-item-group>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { carAccidentEventStatus, locationOpts, evtTypes } from '@/assets/js/smisData'
import TopBasicTable from '@/components/TopBasicTable.vue'
import BottomTable from '@/components/BottomTable.vue'
import UploadFileAdd from '@/components/UploadFileAdd.vue'

export default {
    props: ['itemData'],
    data: () => ({
        id: '',  // 編號
        done: false,  // 是否完成頁面操作
        status: '',  // 處理狀態
        files: [],  // 危害檔案
        evidences: [],  // 改善措施檢討證據
        controlReview: '',  // 措施檢討摘要
        topItems: {  // 上面的欄位
            findDate: { icon: 'mdi-calendar-text', title: '發現日期', text: '' },
            findLocation: { icon: 'mdi-map-marker', title: '發現地點', text: '' },
            accidentType: { icon: 'mdi-snowflake', title: '事故類型', text: '' },
            status: { icon: 'mdi-ray-vertex', title: '事故事件狀態', text: '' },
        },
        bottomItems: [],  // 下面的欄位
        notifyLinks: [],  // 連結的通報
        deathCount: '',  // 死傷人數
        deathData: [],  // 死傷資料
        headers: [  // 死傷表格顯示的欄位
            { text: '姓名', value: 'name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '75px' },
            { text: '性別', value: 'sex', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '75px' },
            { text: '生日', value: 'birthday', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '90px' },
            { text: '住址', value: 'addr', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '150px' },
            { text: '電話', value: 'phone', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '90px' },
            { text: '傷亡種類', value: 'type', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '80px' },
            { text: '收治醫院', value: 'hospital', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '80px' },
            { text: '賠償金額', value: 'money', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '80px' },
            { text: '保險註記', value: 'insurance', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110px' },
            { text: '備註', value: 'note', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70px' },
        ],
        controlHeaders: [  // 控制措施的欄位
            { text: '措施編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '120' },
            { text: '措施簡述', value: 'subject', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '措施說明', value: 'desc', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '150' },
            { text: '管控單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '150' },
            { text: '規章', value: 'file', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '120'},
            { text: '證據', value: 'evidences', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '備註', value: 'note', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
        controlItems: [],  // 控制措施表格資料
        dialogShow: false,  // 控制措施證據dialog是否顯示
        summary: '',  // 改善措施摘要
        isLoading: false,  // 是否讀取中
        dialog: false,  // 退回 dialog 是否顯示
        backReason: '',  // 退回原因
    }),
    components: {
        TopBasicTable,
        BottomTable,
        UploadFileAdd,
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
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
            'chViewDialog',  // 檢視內容 dialog
            'closeWindow',  // 關閉視窗
        ]),
        // 初始化資料
        setShowData(obj) {
            this.id = obj.id  // 編號
            this.status = obj.status  // 事故事件狀態(值)

            this.topItems.findDate.text = `${obj.findDate} ${obj.findHour}:${obj.findMin}:00`  // 發現日期
            this.topItems.findLocation.text = `${locationOpts.find(item => item.value == obj.location).text} ${obj.locationK}K+${obj.locationM}M`  // 發現地點
            this.topItems.accidentType.text = evtTypes.find(item => item.value == obj.accidentType).text  // 事故類型
            this.topItems.status.text = carAccidentEventStatus.find(ele => ele.value == obj.status).text  // 事故事件狀態(顯示的文字)

            // 設定下面的欄位資料
            this.bottomItems = [
                { oneline: true, icon: 'mdi-cellphone-link-off', title: '設備受損情形', text: obj.eqLoss },
                { oneline: true, icon: 'mdi-alert-decagram', title: '運轉影響情形', text: obj.serviceShock },
                { oneline: false, icon: 'mdi-file-document', title: '處置過程', text: obj.handle.replace(/\n/g, '<br>') },
                { oneline: false, icon: 'mdi-file-document', title: '檢討過程', text: obj.review.replace(/\n/g, '<br>') },
                { oneline: false, icon: 'mdi-file-document', title: '原因分析', text: obj.reason.replace(/\n/g, '<br>') },
                { oneline: false, icon: 'mdi-file-document', title: '備註說明', text: obj.note.replace(/\n/g, '<br>') },
            ]

            this.files = [ ...obj.files ]  // 檔案附件
            this.deathCount = obj.deathCount  // 死傷人數
            this.deathData = [ ...obj.deathData ]  // 死傷資料
            this.controlItems = [ ...obj.controlItems ] // 控制措施
            this.summary = obj.summary.replace(/\n/g, '<br>')  // 改善措施摘要

            // 危害通報連結 (依通報狀態連至不同頁面)
            let arr = obj.notifyLinks.map(item => {
                let link = ''
                switch(item.status) {
                    case '未審核':
                        link = `/smis/harmnotify/${item.id}/show`
                        break
                    case '審核中':
                        link = `/smis/harmnotify/${item.id}/review`
                        break
                    case '已結案':
                        link = `/smis/harmnotify/${item.id}/complated`
                        break
                    default:
                        break
                }

                return {
                    id: item.id,
                    link: link,
                }
            })
            this.notifyLinks = [ ...arr ]
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
        // 同意措施執行
        save() {
            if (confirm('你確定要同意措施執行嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '同意措施執行成功'})
                    this.done = true  // 隱藏頁面操作按鈕
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 加入要上傳的檔案
        joinFile(file) {
            this.evidences.push(file)
        },
        // 移除要上傳的檔案
        rmFile(idx) {
            this.evidences.splice(idx, 1)
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
        // 申請結案
        closeCase() {
            if (confirm('你確定要申請結案嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '申請結案成功'})
                    this.done = true  // 隱藏頁面操作按鈕
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 顯示控制措施說明
        showContent(txt) {
            this.chViewDialog({ show: true, content: txt.replace(/\n/g, '<br>') })
        },
        // 顯示控制措施證據
        showEvidences(arr) {
            this.evidences = [ ...arr ]
            this.dialogShow = true
        },
        // 重提事故事件
        rerun() {
            if (confirm('重提後，資料會要重新跑流程，你確定嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.$router.push({ path: `/smis/car-accident-event/${this.routeId}/show` })
                    this.chLoadingShow()
                }, 1000)
            }
        },
    },
    created() {
        this.setShowData(this.itemData)
    }
}
</script>