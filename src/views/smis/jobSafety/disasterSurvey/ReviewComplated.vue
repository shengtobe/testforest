<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">職災事故事件編號：{{ id }}</h2>

    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8">
        <BottomTableNoIcon :items="bottomItems" />

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        檔案附件
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
                        通報連結
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
                    v-if="status == 2"
                >退回</v-btn>

                <v-btn dark  class="ma-2" color="success"
                    @click="save"
                    v-if="status == 2"
                >同意措施執行</v-btn>

                <v-btn dark  class="ma-2" color="primary"
                    @click="rerun"
                    v-if="status == 3"
                >重提事故事件</v-btn>

                <v-btn dark  class="ma-2" color="error"
                    @click="del"
                    v-if="status == 3"
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
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import TopBasicTable from '@/components/TopBasicTable.vue'
import UploadFileAdd from '@/components/UploadFileAdd.vue'
import BottomTableNoIcon from '@/components/BottomTableNoIcon.vue'

export default {
    props: ['itemData'],
    data: () => ({
        id: '',  // 編號
        done: false,  // 是否完成頁面操作
        status: '',  // 處理狀態
        topItems: [],  // 上面的欄位
        bottomItems: [],  // 下面的欄位
        files: [],  // 上傳的檔案
        notifyLinks: [],  // 連結的通報
        controlReview: '',  // 措施檢討摘要
        evidences: [],  // 改善措施證據
        isLoading: false,  // 是否讀取中
        dialog: false,  // 退回 dialog 是否顯示
        backReason: '',  // 退回原因
    }),
    components: {
        TopBasicTable,
        BottomTableNoIcon,
        UploadFileAdd,
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
            this.status = obj.status  // 處理狀態
            this.topItems = obj.topItems  // 上面的欄位資料
            this.bottomItems = obj.bottomItems  // 下面的欄位資料
            this.files = [ ...obj.files ]  // 檔案附件

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
                this.isLoading = this.dialog = false
                this.done = true  // 隱藏頁面操作按鈕
            }, 1000)
        },
        // 同意措施執行
        save() {
            if (confirm('你確定要同意措施執行嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '同意措施執行成功'})
                    this.chLoadingShow()
                    this.done = true  // 隱藏頁面操作按鈕
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
                    this.chLoadingShow()
                    this.done = true  // 隱藏頁面操作按鈕
                }, 1000)
            }
        },
        // 申請結案
        closeCase() {
            if (confirm('你確定要申請結案嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '申請結案成功'})
                    this.chLoadingShow()
                    this.done = true  // 隱藏頁面操作按鈕
                }, 1000)
            }
        },
        // 重提事故事件
        rerun() {
            if (confirm('重提後，資料會要重新跑流程，你確定嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '重提事故事件成功'})
                    this.chLoadingShow()
                    this.done = true  // 隱藏頁面操作按鈕
                }, 1000)
            }
        },
    },
    created() {
        this.setShowData(this.itemData)
    }
}
</script>