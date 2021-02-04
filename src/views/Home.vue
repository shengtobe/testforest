<template>
<v-container style="max-width: 1200px">
    <v-row class="px-2 mb-8 mt-2">
        <!-- 個人訊息 -->
        <h3 class="px-3">個人訊息</h3>

        <v-col cols="12" class="mb-8">
            <v-card>
                <v-data-table
                    :headers="headers.personal"
                    :items="tableItems.personal"
                    :options.sync="pageOpt.personal"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:loading>
                        <span class="red--text subtitle-1">資料讀取中...</span>
                    </template>

                    <template v-slot:item.depart="{ item }">
                        {{ transferDepartTxt(item.depart) }}
                    </template>

                    <template v-slot:item.title="{ item }">
                        <div class="text-left">{{ item.title }}</div>
                    </template>

                    <template v-slot:item.content="{ item }">
                        <v-btn small dark fab color="teal"
                            
                        >
                            <v-icon dark>mdi-file-document</v-icon>
                        </v-btn>
                    </template>
                    
                    <!-- 頁碼 -->
                    <template v-slot:footer="footer">
                        <Pagination
                            :footer="footer"
                            :pageOpt="pageOpt.personal"
                            @chPage="chPage"
                        />
                    </template>
                </v-data-table>
            </v-card>
        </v-col>

        <!-- 待辦事項 -->
        <h3 class="px-3">待辦事項</h3>

        <v-col cols="12" class="mb-4">
            <v-card>
                <v-data-table
                    :headers="headers.todo"
                    :items="tableItems.todo"
                    :options.sync="pageOpt.todo"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:loading>
                        <span class="red--text subtitle-1">資料讀取中...</span>
                    </template>

                    <template v-slot:item.title="{ item }">
                        <div class="text-left">{{ item.title }}</div>
                    </template>

                    <template v-slot:item.content="{ item }">
                        <v-btn small dark fab color="teal"
                            
                        >
                            <v-icon dark>mdi-file-document</v-icon>
                        </v-btn>
                    </template>
                    
                    <!-- 頁碼 -->
                    <template v-slot:footer="footer">
                        <Pagination
                            :footer="footer"
                            :pageOpt="pageOpt.todo"
                            @chPage="chPageTodo"
                        />
                    </template>
                </v-data-table>
            </v-card>
        </v-col>

        <!-- 版本資訊 -->
        <v-col cols="12" class="mb-8 px-4">
            <p>系統版本： {{ userData.Version }}</p>
            <div v-html="userData.VersionMemo.replace(/\n/g, '<br>')"></div>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Pagination from '@/components/Pagination.vue'
import { departOptions } from '@/assets/js/departOption'

export default {
    data: () => ({
        tableItems: {  // 表格資料
            personal: [],  // 個人訊息
            todo: [],  // 待辦事項
        },  
        pageOpt: {  // 目前頁數
            personal: { page: 1 }, 
            todo: { page: 1 }, 
        },
        headers: {  // 表格顯示的欄位
            personal: [
                { text: '日期', value: 'date', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
                { text: '部門', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
                { text: '標題', value: 'title', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '100' },
            ],
            todo: [
                { text: '日期', value: 'date', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '110' },
                { text: '標題', value: 'title', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '檢視內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '100' },
            ],
        }
            
    }),
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
            groupData: state => state.groupData,  // 使用者權限(群組)資料
        })
    },
    components: { Pagination },  // 頁碼
    methods: {
        ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 初始化資料
        initData() {
            this.chLoadingShow()

            setTimeout(() => {
                this.tableItems.personal = [
                    {
                        id: '789',
                        depart: 'd2', 
                        title: '資訊安全相關注意事項',
                        date: '2020-05-01',
                    },
                    {
                        id: '658',
                        depart: 'd5', 
                        title: '補休作業調整',
                        date: '2020-04-21',
                    },
                    {
                        id: '447',
                        depart: 'd3', 
                        title: '慢行通報',
                        date: '2020-03-11',
                    },
                ]

                this.tableItems.todo = [
                    {
                        id: '789',
                        title: '維修、養護科工單',
                        date: '2020-09-01',
                    },
                    {
                        id: '2222',
                        title: '行車事故事件',
                        date: '2020-08-26',
                    },
                ]

                this.chLoadingShow()
            }, 1000)
        },
        // 更換頁數-個人訊息
        chPage(n) {
            this.pageOpt.personal.page = n
        },
        // 更換頁數-待辦事項
        chPageTodo(n) {
            this.pageOpt.todo.page = n
        },
        // 轉換部門文字
        transferDepartTxt(val) {
            return departOptions.find(item => item.value == val).text
        },
    },
    created() {
        this.initData()
    },
}
</script>
