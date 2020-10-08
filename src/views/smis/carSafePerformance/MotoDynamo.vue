<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">機車行駛公里及發電機工時表查詢</h2>

    <v-row class="px-2 mb-8">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>年度
            </h3>
            <v-text-field
                v-model.trim="searchIpt.year"
                solo
                placeholder="例：109"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>月份
            </h3>
            <v-select
                v-model="searchIpt.month"
                :items="serchMonthOpts"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file</v-icon>機車型號
            </h3>
            <v-row no-gutters>
                <v-col cols="5" class="mr-2">
                    <v-select
                        v-model="searchIpt.type"
                        :items="['DL', 'SL']"
                        solo
                    ></v-select>
                </v-col>

                <v-col cols="6">
                    <v-text-field
                        v-model.trim="searchIpt.num"
                        solo
                        placeholder="例：47"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12" class="mb-4">
            <v-btn color="success" large class="mt-2 mb-2 mr-2"
                @click="search"
            >
                <v-icon>mdi-magnify</v-icon>查詢
            </v-btn>

            <v-btn color="indigo" dark large class="ma-2"
                @click="add"
            >
                <v-icon>mdi-plus</v-icon>新增
            </v-btn>

            <v-btn elevation="2" large class="ma-2"
                @click="reset"
            >
                <v-icon>mdi-reload</v-icon>重置
            </v-btn>

            <v-btn dark large class="ma-2"
                :to="`/smis/car-safe-performance`"
            >回上層</v-btn>
        </v-col>
        
        <p class="error--text px-2">
            <v-icon class="error--text mb-1">mdi-alert-decagram</v-icon>
            注意：一般員工僅能編修當月與上個月之資料
        </p>

        <!-- 表格資料 -->
        <v-col cols="12">
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

                    <template v-slot:loading>
                        <span class="red--text subtitle-1">資料讀取中...</span>
                    </template>

                    <template v-slot:item.motoId="{ item }">
                        {{ item.type + item.num }}
                    </template>

                    <template v-slot:item.content="{ item }">
                        <v-btn fab small dark color="teal"
                            @click="view(item)"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn fab small color="primary" class="mr-2"
                            @click="edit(item)"
                        >
                            <v-icon>mdi-pen</v-icon>
                        </v-btn>

                        <v-btn fab small color="error"
                            @click="del(item.id)"
                        >
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
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

    <!-- 詳細資料 -->
    <v-dialog v-model="contentShow" max-width="500px">
        <v-card>
            <v-card-title class="yellow darken-1 px-4 py-1">
                詳細資料
                <v-spacer></v-spacer>
                <v-btn fab small text @click="contentShow = false" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <div class="px-4 py-3">
                <v-row no-gutters>
                    <v-col cols="12" sm="6">
                        <v-icon class="mr-1 mb-1">mdi-gauge</v-icon>
                        本日行駛公里： {{ content.todayKm }}
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-icon class="mr-1 mb-1">mdi-gauge</v-icon>
                        累計公里數： {{ content.totalKm }}
                    </v-col>
                
                    <v-col cols="12">
                        <v-divider class="mt-2 mb-3"></v-divider>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-icon class="mr-1 mb-1">mdi-clock</v-icon>
                        發電機日工時： {{ content.todayHour }}
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-icon class="mr-1 mb-1">mdi-clock</v-icon>
                        發電機累計工時： {{ content.totalHour }}
                    </v-col>

                    <v-col cols="12">
                        <v-divider class="mt-2 mb-3"></v-divider>
                    </v-col>

                    <v-col cols="12" class="mb-1">
                        <v-icon class="mr-1 mb-1">mdi-gas-station</v-icon>
                        耗用油量類別
                    </v-col>

                    <v-col cols="12" sm="4">
                        柴油： {{ content.useOilDiesel }}
                    </v-col>

                    <v-col cols="12" sm="4">
                        引擎機油： {{ content.useOilEngine }}
                    </v-col>

                    <v-col cols="12" sm="4">
                        TC機油： {{ content.useOilTC }}
                    </v-col>

                    <v-col cols="12" sm="4">
                        風泵： {{ content.useOilPump }}
                    </v-col>

                    <v-col cols="12" sm="4">
                        其他 {{ content.useOilOther }}
                    </v-col>
                    
                    <v-col cols="12">
                        <v-divider class="mt-2 mb-3"></v-divider>
                    </v-col>

                    <v-col cols="12">
                        <v-icon class="mr-1 mb-1">mdi-pen</v-icon>
                        保養記事
                        <p>{{ content.note }}</p>
                    </v-col>
                </v-row>
            </div>
        </v-card>
    </v-dialog>

    <!-- 表單 -->
    <v-dialog v-model="dialog" max-width="700px">
        <v-card>
            <v-card-title class="light-blue darken-1 white--text px-4 py-1">
                {{ dialogTitle }}
                <v-spacer></v-spacer>
                <v-btn dark fab small text @click="dialog = false" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text class="px-6 py-4">
                <p class="error--text">
                    <v-icon class="error--text mb-1">mdi-alert-decagram</v-icon>
                    注意：一般員工僅能編修當月與上個月之資料
                </p>
                <!-- <v-form
                    ref="setjobform"
                    v-model="jobFormValid"
                    lazy-validation
                > -->
                    <v-row>
                        <v-col cols="12" sm="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-file</v-icon>機車型號
                            </h3>
                            <v-select
                                v-model="ipt.type"
                                :items="['DL', 'SL']"
                                solo
                            ></v-select>
                        </v-col>

                        <v-col cols="12" sm="4" class="mt-n8 mt-sm-8">
                            <v-text-field
                                v-model.trim="ipt.num"
                                solo
                                placeholder="例：47"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>日期
                            </h3>
                            <v-menu
                                v-model="dateMenuShow"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model.trim="ipt.date"
                                        solo
                                        v-on="on"
                                        readonly
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    color="purple"
                                    v-model="ipt.date"
                                    @input="dateMenuShow = false"
                                    locale="zh-tw"
                                ></v-date-picker>
                            </v-menu>
                        </v-col>

                        <v-col cols="12" sm="8">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>司機員
                            </h3>
                            <v-text-field
                                v-model.trim="ipt.drivers"
                                solo
                                placeholder="例：王小明、陳小華"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-train</v-icon>列車次
                            </h3>
                            <v-text-field
                                v-model.trim="ipt.number"
                                solo
                                placeholder="例：1-2"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-gauge</v-icon>本日行駛公里
                            </h3>
                            <v-text-field
                                v-model.trim="ipt.todayKm"
                                solo
                                placeholder="例：20.3"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-gauge</v-icon>累計公里數
                            </h3>
                            <v-text-field
                                v-model.trim="ipt.totalKm"
                                solo
                                placeholder="例：11300.9"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-clock</v-icon>發電機日工時
                            </h3>
                            <v-text-field
                                v-model.trim="ipt.todayHour"
                                solo
                                placeholder="例：8"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-clock</v-icon>發電機累計工時
                            </h3>
                            <v-text-field
                                v-model.trim="ipt.totalHour"
                                solo
                                placeholder="例：2100"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-gas-station</v-icon>耗用油量 (柴油)
                            </h3>
                            <v-text-field
                                v-model.trim="ipt.useOilDiesel"
                                solo
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-gas-station</v-icon>耗用油量 (引擎機油)
                            </h3>
                            <v-text-field
                                v-model.trim="ipt.useOilEngine"
                                solo
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-gas-station</v-icon>耗用油量 (TC機油)
                            </h3>
                            <v-text-field
                                v-model.trim="ipt.useOilTC"
                                solo
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-gas-station</v-icon>耗用油量 (風泵)
                            </h3>
                            <v-text-field
                                v-model.trim="ipt.useOilPump"
                                solo
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-gas-station</v-icon>耗用油量 (其他)
                            </h3>
                            <v-text-field
                                v-model.trim="ipt.useOilOther"
                                solo
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <h3 class="mb-1">
                                <v-icon class="mr-1 mb-1">mdi-note</v-icon>保養記事
                            </h3>
                            <v-text-field
                                v-model.trim="ipt.note"
                                solo
                            ></v-text-field>
                        </v-col>
                    </v-row>
                <!-- </v-form> -->
            </v-card-text>
            
            <v-card-actions class="px-5 pb-5">
                <v-spacer></v-spacer>
                <v-btn class="mr-2" elevation="4"  :loading="isLoading" @click="dialog = false">取消</v-btn>
                <v-btn color="success" elevation="4"  :loading="isLoading" @click="save">送出</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import Pagination from '@/components/Pagination.vue'
import { monthOptions } from '@/assets/js/dateTimeOption'

export default {
    data: () => ({
        searchIpt: {  // 搜尋欄位
            year: new Date().getFullYear()-1911,  // 民國年
            month: '',  // 月
            type: 'DL',  // 類型
            num: '',  // 號碼
        },
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '型號', value: 'motoId', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '日期', value: 'date', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '司機員', value: 'drivers', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '行駛區間', value: 'locations', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '列車次', value: 'number', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '詳細資訊', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '編輯、刪除', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
        monthOpts: monthOptions,  // 月份下拉選單(dialog用)
        serchMonthOpts: [  // 搜尋表單月份下拉選單
            { text: '不限', value: '' },
            ...monthOptions,
        ],
        dialog: false,  // dialog 是否顯示
        isLoading: false,  // 是否讀取中
        itemIndex: -1,  // 作用中的物件索引值 (小於0為新增的情況)
        ipt: {},  // dialog 欄位
        defaultIpt: {  // dialog 欄位預設值
            type: 'DL',
            num: '',
            date: new Date().toISOString().substr(0, 10),  // 日期
            drivers: '',  // 司機員
            locations: '',  // 行駛區間
            number: '',  // 列車次
            todayKm: '',  // 本日行駛公里
            totalKm: '',  // 累計公里數
            todayHour: '',  // 發電機日工時
            totalHour: '',  // 發電機累計工時
            useOilDiesel: 0,  // 耗用油量 (柴油)
            useOilEngine: 0,// 耗用油量 (引擎機油)
            useOilTC: 0,  // 耗用油量 (TC機油)
            useOilPump: 0,  // 耗用油量 (風泵)
            useOilOther: 0,  // 耗用油量 (其他)
            note: '',  // 保養記事
        },
        dateMenuShow: false,  // 日曆是否顯示
        contentShow: false,  // 詳細內容 dialog 是否顯示
        content: {},  // 詳細內容欄位
    }),
    components: { Pagination },  // 頁碼
    computed: {
        dialogTitle () {
            return this.itemIndex === -1 ? '新增資料' : '編輯資料'
        },
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 搜尋
        search() {
            this.chLoadingShow()
            this.pageOpt.page = 1  // 頁碼初始化

            // 新增測試用資料
            setTimeout(() => {
                this.tableItems = [
                    {
                        id: '111',
                        type: 'DL',  // 機車類型
                        num: '47',  // 機車號碼
                        date: '2019-05-01',  // 日期
                        drivers: '林國煌 郭泓志',  // 司機員
                        locations: '北嘉+嘉北',  // 行駛區間
                        number: '1-2',  // 列車次
                        todayKm: 113.8,  // 本日行駛公里
                        totalKm: 53175.8,  // 累計公里數
                        todayHour: 7,  // 發電機日工時
                        totalHour: 5218,  // 發電機累計工時
                        useOilDiesel: 300,  // 耗用油量 (柴油)
                        useOilEngine: 0,// 耗用油量 (引擎機油)
                        useOilTC: 0,  // 耗用油量 (TC機油)
                        useOilPump: 0,  // 耗用油量 (風泵)
                        useOilOther: 0,  // 耗用油量 (其他)
                        note: '保養說明文字保養說明文字保養說明文字',  // 保養記事
                    },
                    {
                        id: '222',
                        type: 'DL',
                        num: '47',
                        date: '2019-05-02',
                        drivers: '郭泓志 林國煌 江明輝',
                        locations: '北嘉+嘉北',
                        number: '211-2',
                        todayKm: 113.8,
                        totalKm: 53289.6,
                        todayHour: 9,
                        totalHour: 5227,
                        useOilDiesel: 300,
                        useOilEngine: 0,
                        useOilTC: 0,
                        useOilPump: 0,
                        useOilOther: 0,
                        note: '',
                    },
                ]
                this.chLoadingShow()
            }, 1000)
        },
        // 重置
        reset() {
            this.searchIpt.year = this.searchIpt.num = ''
            this.searchIpt.month = ''
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 送出
        save() {
            this.isLoading = true

            setTimeout(() => {
                let txt = this.itemIndex === -1 ? '新增成功' : '更新成功'

                // 編輯時，待後端回傳檔案資訊，再一併寫回 this.tableItems[this.itemIndex] 中
                // 新增時則不處理 (因為當前搜尋條件不一定符合新增的記錄)
                if (this.itemIndex > -1) {
                    Object.assign(this.tableItems[this.itemIndex], this.ipt)
                }
                
                this.chMsgbar({ success: true, msg: txt })
                this.isLoading = this.dialog = false
            }, 1000)
        },
        // 新增
        add() {
            this.ipt = { ...this.defaultIpt }  // 初始化表單，避免點編輯按鈕但未更新時資料殘留
            this.itemIndex = -1  // 初始化索引值
            this.dialog = true
        },
        // 編輯
        edit (item) {
            this.itemIndex = this.tableItems.indexOf(item)  // 取得索引值
            this.ipt = { ...item }  // 設定表單資料
            this.dialog = true
        },
        // 刪除
        del(id) {
            if (confirm('你確定要刪除嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    let idx = this.tableItems.findIndex(item => item.id == id)
                    this.tableItems.splice(idx, 1)
                    this.chMsgbar({ success: true, msg: '刪除成功'})
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 顯示詳細資訊
        view(item) {
            this.contentShow = true
            this.content = { ...item }
        },
    },
    created() {
        this.ipt = { ...this.defaultIpt }  // 初始化表單
    },
}
</script>