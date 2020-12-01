<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">
        {{ (this.isEdit)? `危害編輯 (編號：${ routeId })` : '危害新增' }}
    </h2>

    <v-row class="px-2">
        <v-col cols="12" md="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-pen</v-icon>危害說明
                <span class="red--text">*</span>
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入危害說明"
                v-model.trim="ipt.desc"
            ></v-textarea>
        </v-col>

        <v-col cols="12" md="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-pen</v-icon>危害直接成因
                <span class="red--text">*</span>
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入危害直接成因"
                v-model.trim="ipt.reason"
            ></v-textarea>
        </v-col>

        <v-col cols="12" md="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-pen</v-icon>可能的危害間接原因
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入間接原因"
                v-model.trim="ipt.indirectReason"
            ></v-textarea>
        </v-col>

        <v-col cols="12" md="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-note</v-icon>備註
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入備註"
                v-model.trim="ipt.note"
            ></v-textarea>
        </v-col>
    </v-row>

    <v-divider class="mx-2 mt-5 mb-4"></v-divider>

    <v-row class="px-2">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-bank</v-icon>權責單位
            </h3>
            <v-select
                v-model="ipt.depart"
                :items="opts.depart"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>營運模式
            </h3>
            <v-select
                v-model="ipt.mode"
                :items="opts.mode"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-format-line-spacing</v-icon>風險嚴重性
            </h3>
            <v-select
                v-model="ipt.serious"
                :items="opts.serious"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-signal-variant</v-icon>風險頻率
            </h3>
            <v-select
                v-model="ipt.frequency"
                :items="opts.frequency"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-source-branch</v-icon>關聯子系統
            </h3>
            <v-select
                v-model="ipt.wbs"
                :items="opts.wbs"
                solo
            ></v-select>
        </v-col>

        <!-- 影響、運轉影響情形 -->
        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-alert-decagram</v-icon>影響、運轉影響情形
            </h3>
            <v-sheet color="white" elevation="2" class="px-2 pb-4">
                <v-row no-gutters>
                    <v-col cols="6" sm="4" md="2">
                        <v-checkbox
                            v-model="ipt.affectTraveler"
                            label="影響旅客"
                            color="info"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="6" sm="4" md="2">
                        <v-checkbox
                            v-model="ipt.affectStaff"
                            label="影響員工"
                            color="info"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="6" sm="4" md="2">
                        <v-checkbox
                            v-model="ipt.affectPublic"
                            label="影響大眾"
                            color="info"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="6" sm="4" md="2">
                        <v-checkbox
                            v-model="ipt.trainLate"
                            label="列車誤點"
                            color="info"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="6" sm="4" md="2">
                        <v-checkbox
                            v-model="ipt.stopOperation"
                            label="中斷營運"
                            color="info"
                            hide-details
                        ></v-checkbox>
                    </v-col>
                </v-row>
            </v-sheet>
        </v-col>

        <!-- 衍生事故 -->
        <v-col cols="12" class="my-8">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-arrow-expand</v-icon>衍生事故
            </h3>

            <AccidentCheckbox
                :checkArr="ipt.accidents"
                @checkAccident="setAccident"
            />
        </v-col>

        <!-- 控制措施 -->
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-bank</v-icon>控制措施權責部門
            </h3>
            <v-select
                v-model="controlSearch.depart"
                :items="opts.depart"
                solo
                hide-details
            ></v-select>
        </v-col>

        <v-col cols="12" sm="8" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>措施簡述
            </h3>
            <v-text-field
                v-model.trim="controlSearch.subject"
                solo
                placeholder="請輸入關鍵字"
            ></v-text-field>
        </v-col>

        <v-col cols="12" md="3" align-self="center">
            <v-btn color="green" dark large
                @click="search"
            >
                <v-icon class="mr-1">mdi-magnify</v-icon>查詢
            </v-btn>
        </v-col>

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

                    <template v-slot:item.desc="{ item }">
                        <v-btn color="teal" dark
                            @click="showContent(item.desc)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.file="{ item }">
                        <v-btn fab small dark color="brown"
                            :href="item.file.link"
                            :download="item.file.name"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.evidences="{ item }">
                        <v-btn fab small dark color="purple lighten-2"
                            @click="showEvidences(item.evidences)"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn fab small dark color="indigo"
                            @click="addControl(item)"
                        >
                            <v-icon>mdi-plus</v-icon>
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

        <v-col cols="12" class="mt-8">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-check-circle</v-icon>已選的控制措施
            </h3>
            <v-card>
                <v-data-table
                    :headers="chooseHeaders"
                    :items="ipt.controlChoose"
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
                        <v-btn fab small dark color="brown"
                            :href="item.file.link"
                            :download="item.file.name"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.evidences="{ item }">
                        <v-btn fab small dark color="purple lighten-2"
                            @click="showEvidences(item.evidences)"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn fab small color="error"
                            @click="delControl(item.id)"
                        >
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>

        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="mr-4"
                v-if="!isEdit"
                to="/smis/car-harmdb/harms"
            >回搜尋頁</v-btn>

            <v-btn dark class="mr-3"
                v-else
                :to="`/smis/car-harmdb/harms/${this.routeId}/show`"
            >回上層</v-btn>
            
            <v-btn
                color="success"
                @click="save"
            >{{ (isEdit)? '儲存變更': '送出' }}</v-btn>
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

    <!-- <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >

    </v-form> -->
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { departOptions } from '@/assets/js/departOption'
import AccidentCheckbox from '@/components/smis/AccidentCheckbox.vue'
import Pagination from '@/components/Pagination.vue'

export default {
    data: () => ({
        valid: true,  // 表單是否驗證欄位
        isEdit: false,  // 是否為編輯
        ipt: {
            accidents: [],  // 衍生事故(給組件的預設值)
        },
        defaultIpt: {
            desc: '',  // 危害說明
            reason: '',  // 危害直接成因
            indirectReason: '',  // 可能的危害間接原因
            note: '',  // 備註
            depart: 'd1',// 權責部門
            mode: 'm1',  // 營運模式
            wbs: 'APC2',  // 關聯子系統
            serious: 'S5',  // 風險嚴重性
            frequency: 'P1',  // 風險頻率
            affectTraveler: false,  // 影響旅客
            affectStaff: false,  // 影響員工
            affectPublic: false,  // 影響大眾
            trainLate: false,  // 列車誤點
            stopOperation: false,  // 中斷營運
            accidents: [],  // 衍生事故
            controlChoose: [],  // 已選的控制措施
        },
        opts: {  // 下拉選單
            depart: [  // 權責部門
                 { text: '不限', value: '' },
                ...departOptions,
            ],
            mode: [  // 營運模式
                { text: '正常', value: 'm1' },
                { text: '降級', value: 'm2' },
                { text: '緊急', value: 'm3' },
                { text: '維修', value: 'm4' },
            ],
            wbs: [  // 關聯子系統
                { text: 'APC2', value: 'APC2' },
                { text: '平甲6022', value: '平甲6022' },
                { text: '祝8308', value: '祝8308' },
                { text: '蓬甲6', value: '蓬甲6' },
            ],
            serious: [  // 風險嚴重性
                { text: '極輕微', value: 'S5' },
                { text: '稍微', value: 'S4' },
                { text: '主要', value: 'S3' },
                { text: '嚴重', value: 'S2' },
                { text: '災難', value: 'S1' },
            ],
            frequency: [  // 風險頻率
                { text: '經常', value: 'P1' },
                { text: '很可能', value: 'P2' },
                { text: '偶爾', value: 'P3' },
                { text: '很少', value: 'P4' },
                { text: '幾乎不', value: 'P5' },
            ],
        },
        controlSearch: {  // 控制措施搜尋
            depart: '',  // 部門
            subject: '',  // 簡述
        },
        pageOpt: { page: 1 },  // 控制措施權責部門的表格目前頁數
        tableItems: [],  // 控制措施權責部門的表格資料
        headers: [  // 控制措施權責部門的表格欄位
            { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '措施簡述', value: 'subject', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '措施說明', value: 'desc', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '管控單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '規章', value: 'file', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '證據', value: 'evidences', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '備註', value: 'note', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '選用', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
        chooseHeaders: [  // 已選的表格欄位
            { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '措施簡述', value: 'subject', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '措施說明', value: 'desc', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '管控單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '規章', value: 'file', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '證據', value: 'evidences', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '備註', value: 'note', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '刪除', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
        evidences: [],  // 證據
        dialogShow: false,  // 證據dialog是否顯示
        notify: {  // 危害通報資料
            id: '',  // id
            isNew: false,  // 是否為新登錄
        },
    }),
    components: {
        AccidentCheckbox,
        Pagination,
    },
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
        // 初始化資料
        initData() {
            this.ipt = { ...this.defaultIpt }  // 初始化表單

            // -------------- 編輯時 -------------- 
            if (this.$route.params.id != undefined) {
                this.chLoadingShow()
                this.routeId = this.$route.params.id  // 路由參數(id)
                this.isEdit = true

                // 範例效果
                setTimeout(() => {
                    let obj = {
                        desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',  // 危害說明
                        reason: '直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字',  // 危害直接成因
                        indirectReason: '間接原因文字間接原因文字間接原因文字間接原因文字間接原因文字間接原因文字間接原因文字間接原因文字間接原因文字',  // 可能的危害間接原因
                        note: '',  // 備註
                        depart: 'd2',// 權責部門
                        mode: 'm2',  // 營運模式
                        wbs: 'APC2',  // 關聯子系統
                        serious: 'S4',  // 風險嚴重性
                        frequency: 'P2',  // 風險頻率
                        affectTraveler: true,  // 影響旅客
                        affectStaff: true,  // 影響員工
                        affectPublic: false,  // 影響大眾
                        trainLate: false,  // 列車誤點
                        stopOperation: false,  // 中斷營運
                        accidents: ['G3', 'G6'],  // 衍生事故
                        controls: [  // 控制措施
                            {
                                id: 123,
                                subject: '火災處理要點',
                                desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',
                                depart: '綜合企劃科',
                                file: { link: '/demofile/123.pdf' },
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
                                id: 456,
                                subject: '中暑急救要點',
                                desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',
                                depart: '綜合企劃科',
                                file: { link: '/demofile/123.docx' },
                                note: '',
                                evidences: [
                                    {
                                        name: '123.pdf',
                                        link: '/demofile/123.pdf'
                                    },
                                ],
                            },
                        ],
                    }
                    
                    this.setInitDate(obj)
                    this.chLoadingShow()
                }, 1000)
            } else {
                // 新增時
                // 若由危害通報新登錄轉至此頁，則指派初始值
                if (sessionStorage.getItem('notifyItem') !== null) {
                    let obj = JSON.parse(sessionStorage.getItem('notifyItem'))
                    
                    this.notify.id = obj.id,  // 通報id
                    this.notify.isNew = true  // 是否為危害通報的新登錄

                    sessionStorage.removeItem('notifyItem')  // 清除 sessionStorage
                }
            }
        },
        // 設定資料(編輯時)
        setInitDate(obj) {
            this.ipt.desc = obj.desc // 危害說明
            this.ipt.reason = obj.reason  // 危害直接成因
            this.ipt.indirectReason = obj.indirectReason  // 可能的危害間接原因
            this.ipt.note = obj.note  // 備註
            this.ipt.depart = obj.depart  // 權責部門
            this.ipt.mode = obj.mode  // 營運模式
            this.ipt.wbs = obj.wbs  // 關聯子系統
            this.ipt.serious = obj.serious  // 風險嚴重性
            this.ipt.frequency = obj.frequency  // 風險頻率
            this.ipt.affectTraveler = obj.affectTraveler  // 影響旅客
            this.ipt.affectStaff = obj.affectStaff  // 影響員工
            this.ipt.affectPublic = obj.affectPublic  // 影響大眾
            this.ipt.trainLate = obj.trainLate  // 列車誤點
            this.ipt.stopOperation = obj.stopOperation  // 中斷營運
            this.ipt.accidents = [ ...obj.accidents ]  // 衍生事故
            this.ipt.controlChoose = [ ...obj.controls ]   // 已選控制錯施
        },
        // 設定勾選的延申事故
        setAccident(arr) {
            this.ipt.accidents = [ ...arr ]
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 送出
        save() {
            this.chLoadingShow()

            // 測試用資料
            setTimeout(() => {
                let txt = (this.isEdit)? '資料更新成功' :  '資料新增成功'
                if (!this.isEdit) this.$router.push({ path: '/smis/car-harmdb/harms' })
                this.chMsgbar({ success: true, msg: txt })
                this.chLoadingShow()
            }, 1000)
        },
        // 搜尋控制措施
        search() {
            this.chLoadingShow()
            this.pageOpt.page = 1  // 頁碼初始化

            // 測試用資料
            setTimeout(() => {
                this.tableItems = [
                    {
                        id: 123,
                        subject: '火災處理要點',
                        desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',
                        depart: '綜合企劃科',
                        file: { name: '123.pdf', link: '/demofile/123.pdf' },
                        note: '',
                        evidences: [
                            {
                                name: '123.pdf',
                                link: '/demofile/123.pdf'
                            },
                        ],
                    },
                    {
                        id: 456,
                        subject: '中暑急救要點',
                        desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',
                        depart: '綜合企劃科',
                        file: { name: '123.docx', link: '/demofile/123.docx' },
                        note: '',
                        evidences: [
                            {
                                name: '123.pdf',
                                link: '/demofile/123.pdf'
                            },
                            {
                                name: '123.docx',
                                link: '/demofile/123.docx'
                            },
                        ],
                    },
                    {
                        id: 789,
                        subject: '火車誤點處理措施',
                        desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',
                        depart: '鐵路服務科',
                        file: { name: '456.xlsx', link: '/demofile/456.xlsx' },
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
                ]
                this.chLoadingShow()
            }, 1000)
        },
        // 顯示檢視內容
        showContent(txt) {
            this.chViewDialog({ show: true, content: txt.replace(/\n/g, '<br>') })
        },
        // 顯示證據
        showEvidences(arr) {
            this.evidences = [ ...arr ]
            this.dialogShow = true
        },
        // 增加已選的控制措施
        addControl(item) {
            // 沒找到才新增
            let arr = this.ipt.controlChoose.find(ele => ele.id == item.id)
            if (arr == undefined) {
                this.ipt.controlChoose.push(item)
            }
        },
        // 刪除已選的控制措施
        delControl(id) {
            let idx = this.ipt.controlChoose.findIndex(ele => ele.id == id)
            this.ipt.controlChoose.splice(idx, 1)
        },
    },
    created() {
        this.initData()
    }
}
</script>