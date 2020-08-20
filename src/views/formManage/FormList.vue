<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">表單列表</h2>

    <v-row class="px-2">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-bank</v-icon>科室
            </h3>
            <v-select
                v-model="department"
                :items="depOpts"
                solo
                hide-details
                @change="setDepartment"
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-comment-processing</v-icon>關鍵字
            </h3>
            <v-text-field
                v-model.trim="keyword"
                placeholder="請輸入關鍵字"
                solo
                hide-details
            ></v-text-field>
        </v-col>

        <v-col cols="12" class="error--text">
            *請點擊「表單名稱」進入管理頁面
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

                    <!-- headers 的 fid 欄位 (檢視內容) -->
                    <template v-slot:item.name="{ item }">
                        <router-link
                            :to="`/form-manage/${item.fid}`"
                            class="text-decoration-none text-subtitle-1 grey--text text--darken-3"
                        >
                            {{ item.name }}
                        </router-link>
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
import formList from '../../assets/js/formList'
import Pagination from '@/components/Pagination.vue'

export default {
    data: () => ({
        department: 'serve',  // 科室
        depOpts: [  // 科室下拉選單
            { text: '服務科', value: 'serve' },
            { text: '養護科 (車庫)', value: 'garage' },
            { text: '養護科 (修理工廠)', value: 'factory' },
            { text: '維護科', value: 'maintain' },
            { text: '勞安', value: 'labor' },
        ],
        tableItems: [],  // 表格資料
        keyword: '',  // 關鍵字
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '項次', value: 'idx', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: 80 },
            { text: '表單名稱', value: 'name', align: 'left', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
    }),
    components: { Pagination },
    methods: {
        // 指定科室
        setDepartment() {
            this.tableItems = formList[this.department].map((item, idx) => {
                return {
                    idx: idx+1,
                    ...item
                }
            })
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        }
    },
    created() {
        this.setDepartment()  // 指定科室
    }
}
</script>