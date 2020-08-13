<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">
        行安改善措施
        <span class="mx-3">(事故事件編號：{{ routeId }})</span>
    </h2>

    <h3 class="mt-8 error--text">同類型危害已核定採用之控制措施：</h3>
    <v-row no-gutters class="mb-8">
        <v-col cols="12" class="mb-10">
            <v-card>
                <v-data-table
                    :headers="headers"
                    :items="tableItems"
                    :options.sync="pageOpt"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-radio-group v-model="fileId">
                            <v-radio
                                class="ml-3 mt-1"
                                color="success"
                                :value="item.file.id"
                            ></v-radio>
                        </v-radio-group>
                    </template>

                    <template v-slot:item.desc="{ item }">
                        <v-btn color="teal" dark
                            @click="showContent(item.desc)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.download="{ item }">
                        <v-btn small dark fab color="indigo"
                            :href="item.file.path"
                            target="_blank"
                            rel="noopener norefferrer"
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

        <v-col cols="12">
            <h3 class="mb-2">
                <v-icon class="mr-1 mb-1">mdi-pen</v-icon>檢討摘要
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入檢討摘要"
                v-model.trim="summary"
            ></v-textarea>
        </v-col>

        <v-col cols="12" class="mt-5 text-center">
            <v-btn dark class="mr-3"
                :to="`/smis/car-accident-event/${routeId}/show`"
            >回上層</v-btn>

            <v-btn dark color="success"
                @click="save"
            >送出</v-btn>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import Pagination from '@/components/Pagination.vue'

export default {
    data: () => ({
        routeId: '',
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '連結', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '80' },
            { text: '措施編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '120' },
            { text: '措施簡述', value: 'subject', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '措施說明', value: 'desc', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '150' },
            { text: '管控單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '150' },
            { text: '附件下載', value: 'download', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '120'},
        ],
        fileId: '',  // 連結的措施附件檔案id
        summary: '',  // 檢討摘要
    }),
    components: { Pagination },
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        },
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'chViewDialog',  // 檢視內容 dialog
        ]),
        // 向後端取得資料
        fetchData() {
            this.chLoadingShow()
            this.routeId = this.$route.params.id

            // 新增測試用資料
            setTimeout(() => {
                // 同類危害已核定的控制措施
                this.tableItems = [
                    {
                        id: 21,
                        subject: '鐵軌異物處理規定',
                        desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',
                        depart: '服務科',
                        file: {
                            id: '14',
                            name: '123.pdf',
                            path: '/demofile/123.pdf',
                        }
                    },
                    {
                        id: 36,
                        subject: '大型樹木移除注意事項',
                        desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',
                        depart: '服務科',
                        file: {
                            id: '99',
                            name: '123.docx',
                            path: '/demofile/123.docx',
                        }
                    },
                ]

                // 已儲存的資料
                // this.fileId = '99'
                // this.summary = '檢討摘要文字...'

                this.chLoadingShow()
            }, 1000)
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 送出
        save() {
            if (this.fileId == '') {
                alert('請選擇要連結的附件')
                return
            }

            this.chLoadingShow()
            setTimeout(() => {
                this.chMsgbar({ success: true, msg: '更新成功'})
                this.chLoadingShow()
            }, 1000)
        },
        // 顯示措施說明
        showContent(txt) {
            this.chViewDialog({ show: true, content: txt.replace(/\n/g, '<br>') })
        },
    },
    created() {
        this.fetchData()
    }
}
</script>