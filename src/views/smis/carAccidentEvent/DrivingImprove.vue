<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">
        行安改善措施
        <span class="mx-3">(事故事件編號：{{ routeId }})</span>
    </h2>

    <h3 class="mt-8 error--text">同類型危害已核定採用之控制措施：</h3>
    <v-row no-gutters class="mb-8">
        <v-col cols="12" class="mb-12">
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
                        <v-checkbox
                            class="mr-n3 ml-2"
                            v-model="selected"
                            :value="item.id"
                        ></v-checkbox>
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

                    <template v-slot:footer="footer">
                        <Pagination
                            :footer="footer"
                            :pageOpt="pageOpt"
                            @chPage="chPage"
                        />
                    </template>
                </v-data-table>
            </v-card>

            <span>
                <v-icon class="mb-2 mr-1">mdi-lightbulb-on</v-icon>
                你選擇的控制措施編號： {{ selectedMsg }}
            </span>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-2">
                <v-icon class="mr-1 mb-1">mdi-pen</v-icon>改善措施摘要
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入改善措施摘要"
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

    <!-- 證據 -->
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
import { mapActions } from 'vuex'
import Pagination from '@/components/Pagination.vue'

export default {
    data: () => ({
        routeId: '',
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '連結', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70' },
            { text: '措施編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '120' },
            { text: '措施簡述', value: 'subject', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '措施說明', value: 'desc', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '150' },
            { text: '管控單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '150' },
            { text: '規章', value: 'file', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '120'},
            { text: '證據', value: 'evidences', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '備註', value: 'note', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
        summary: '',  // 改善措施摘要
        selected: [],  // 所選的控制措施 id
        evidences: [],  // 證據
        dialogShow: false,  // 證據dialog是否顯示
    }),
    components: { Pagination },
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        },
    },
    computed: {
        selectedMsg() {
            // 重新排序
            let arr = this.selected.sort(function(a, b) {
                return a - b
            })
            return arr.join('、')
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
                        file: { name: '123.pdf', link: '/demofile/123.pdf' },
                        note: '',
                        evidences: [
                            {
                                name: '456.xlsx',
                                link: '/demofile/456.xlsx'
                            },
                            {
                                name: '123.pdf',
                                link: '/demofile/123.pdf'
                            },
                        ],
                    },
                    {
                        id: 36,
                        subject: '大型樹木移除注意事項',
                        desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',
                        depart: '服務科',
                        file: { name: '123.docx', link: '/demofile/123.docx' },
                        note: '',
                        evidences: [
                            {
                                name: '123.pdf',
                                link: '/demofile/123.pdf'
                            },
                        ],
                    },
                ]

                this.chLoadingShow()
            }, 1000)
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 送出
        save() {
            if (this.selected.length == 0) {
                alert('請選擇要連結的控制措施')
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
        // 顯示證據
        showEvidences(arr) {
            this.evidences = [ ...arr ]
            this.dialogShow = true
        },
    },
    created() {
        this.fetchData()
    }
}
</script>