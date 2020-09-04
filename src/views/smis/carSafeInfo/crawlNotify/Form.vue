<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">慢行通報新增</h2>

    <v-row class="px-2">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-mark</v-icon>通報路線
            </h3>
            <v-select
                v-model="ipt.line"
                :items="['本線', '祝山線', '眠月線', '水山線']"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-cellphone-link-off</v-icon>速限起點(km)
            </h3>
            <v-text-field
                v-model.trim="ipt.pointStart"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-cellphone-link-off</v-icon>速限終點(km)
            </h3>
            <v-text-field
                v-model.trim="ipt.pointEnd"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-cellphone-link-off</v-icon>常態速限(km/h)
            </h3>
            <v-text-field
                v-model.trim="ipt.normal"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-cellphone-link-off</v-icon>慢行速限(km/h)
            </h3>
            <v-text-field
                v-model.trim="ipt.slow"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>限制日期(起)
            </h3>
            <v-menu
                v-model="dateMemuShow.start"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model.trim="ipt.dateStart"
                        solo
                        v-on="on"
                        readonly
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="purple"
                    v-model="ipt.dateStart"
                    @input="dateMemuShow.start = false"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>限制日期(迄)
            </h3>
            <v-menu
                v-model="dateMemuShow.end"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model.trim="ipt.dateEnd"
                        solo
                        v-on="on"
                        readonly
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="purple"
                    v-model="ipt.dateEnd"
                    @input="dateMemuShow.end = false"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="mr-4"
                to="/smis/car-safeinfo/crawl-notify"
            >回搜尋頁</v-btn>
            
            <v-btn
                color="success"
                @click="save"
            >送出</v-btn>
        </v-col>
    </v-row>
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
        ipt: {
            line: '本線',  // 通報路線
            pointStart: '',  // 速限起點
            pointEnd: '',  // 速限終點
            normal: '',  // 常態速限
            slow: '',  // 慢行速限
            dateStart: new Date().toISOString().substr(0, 10),  // 限制日期(起)
            dateEnd: new Date().toISOString().substr(0, 10),  // 限制日期(迄)
            recipients: [],  // 收件人
        },
        dateMemuShow: {  // 日曆是否顯示
            start: false,
            end: false,
        },
        members: [  // 員工資料
            { name: '趙國強 (K59632)', val: '1'},
            { name: '錢光華 (K12584)', val: '2'},
            { name: '孫文豪 (K69584)', val: '3'},
            { name: '李運深 (K24785)', val: '4'},
            { name: '周寶盛 (K65241)', val: '5'},
            { name: '吳泓吉 (K58963)', val: '6'},
            { name: '鄭家豪 (K24758)', val: '7'},
            { name: '王永慶 (K25896)', val: '8'},
        ],
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
                this.$router.push({ path: '/smis/car-harmdb/harms' })
                this.chMsgbar({ success: true, msg: '資料新增成功'})
                this.chLoadingShow()
            }, 1000)
        },
        // 搜尋控制措施
        search() {
            this.chLoadingShow()

            // 測試用資料
            setTimeout(() => {
                this.tableItems = [
                    {
                        id: 123,
                        subject: '火災處理要點',
                        desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',
                        depart: '綜合企劃科',
                        file: { link: '/demofile/123.pdf' },
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
                        file: { link: '/demofile/123.docx' },
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
                        file: { link: '/demofile/456.xlsx' },
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