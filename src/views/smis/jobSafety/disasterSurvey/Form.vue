<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">
        {{ (this.isEdit)? `職災事故事件編輯 (編號：${ routeId })` : '職業災害事故調查表' }}
    </h2>

    <v-row class="px-2">
        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-account</v-icon>罹災者姓名
                <!-- <span class="red--text">*</span> -->
            </h3>
            <v-text-field
                v-model.trim="ipt.name"
                solo
                placeholder="請輸入性名"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>勞工類型
            </h3>
            <v-select
                v-model="ipt.type"
                :items="opts.type"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-human-male-female</v-icon>性別
            </h3>
            <v-select
                v-model="ipt.sex"
                :items="['男', '女']"
                solo
            ></v-select>
        </v-col>
        
        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-sort-variant</v-icon>年齡
            </h3>
            <v-text-field
                v-model.trim="ipt.old"
                solo
                placeholder="請輸入年齡"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-bank</v-icon>工作部門
            </h3>
            <v-select
                v-model="ipt.workDepart"
                :items="opts.depart"
                solo
            ></v-select>
        </v-col>
        
        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>到職日期
            </h3>
            <v-menu
                v-model="dateMenuShow.startWorkDate"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model.trim="ipt.startWorkDate"
                        solo
                        v-on="on"
                        readonly
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="purple"
                    v-model="ipt.startWorkDate"
                    @input="dateMenuShow.startWorkDate = false"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-format-title</v-icon>職稱
            </h3>
            <v-text-field
                v-model.trim="ipt.jobTitle"
                solo
                placeholder="請輸入職稱"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-school</v-icon>教育程度
            </h3>
            <v-select
                v-model="ipt.education"
                :items="['小學', '國中', '高中', '專科', '大學', '碩士', '博士']"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>住址
            </h3>
            <v-text-field
                v-model.trim="ipt.address"
                solo
                placeholder="請輸入住址"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-sort-variant</v-icon>本項工作經驗年數
            </h3>
            <v-text-field
                v-model.trim="ipt.workYear"
                solo
                placeholder="請輸入經驗年數"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>本項工作訓練日期
            </h3>
            <v-text-field
                v-model.trim="ipt.trainingDate"
                solo
                placeholder="請輸入訓練日期"
            ></v-text-field>
        </v-col>
    </v-row>
    
    <v-divider class="mx-2 mt-5 mb-4"></v-divider>

    <v-row class="px-2">
        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-bank</v-icon>發生單位
            </h3>
            <v-select
                v-model="ipt.depart"
                :items="opts.depart"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>發生日期
            </h3>
            <v-menu
                v-model="dateMenuShow.occurDate"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model.trim="ipt.occurDate"
                        solo
                        v-on="on"
                        readonly
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="purple"
                    v-model="ipt.occurDate"
                    @input="dateMenuShow.occurDate = false"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-clock</v-icon>發生日期 (時)
            </h3>
            <v-select
                v-model="ipt.hour"
                :items="opts.hour"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-clock</v-icon>發生日期 (分)
            </h3>
            <v-select
                v-model="ipt.min"
                :items="opts.min"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-cloud</v-icon>氣候
            </h3>
            <v-select
                v-model="ipt.weather"
                :items="['晴', '陰', '雨']"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>發生地點
            </h3>
            <v-text-field
                v-model.trim="ipt.location"
                solo
                placeholder="請輸入發生地點"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>事故類別
            </h3>
            <v-select
                v-model="ipt.accidentType"
                :items="opts.accidentType"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-google-assistant</v-icon>事故結果
            </h3>
            <v-select
                v-model="ipt.accidentResult"
                :items="opts.accidentResult"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-google-assistant</v-icon>傷害部位
            </h3>
            <v-select
                v-model="ipt.injurySite"
                :items="opts.injurySite"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>災害類型
            </h3>
            <v-select
                v-model="ipt.disasterType"
                :items="opts.disasterType"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-google-assistant</v-icon>致傷媒介物
            </h3>
            <v-select
                v-model="ipt.vehicleLv1"
                :items="opts.vehicleLv1"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3" class="mt-n8 mt-sm-8">
            <v-select
                v-model="ipt.vehicle"
                :items="opts.vehicle"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>直接原因
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入直接原因"
                v-model.trim="ipt.directReason"
            ></v-textarea>
        </v-col>

        <v-col cols="12" sm="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>間接原因
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入間接原因"
                v-model.trim="ipt.indirectReason"
            ></v-textarea>
        </v-col>

        <v-col cols="12" sm="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>基本原因
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入基本原因"
                v-model.trim="ipt.basicReason"
            ></v-textarea>
        </v-col>

        <v-col cols="12" sm="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>傷者當時工作
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入傷者當時工作"
                v-model.trim="ipt.workItem"
            ></v-textarea>
        </v-col>

        <v-col cols="12" sm="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>事故概況
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入事故概況"
                v-model.trim="ipt.overview"
            ></v-textarea>
        </v-col>

        <v-col cols="12" sm="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>緊急處理情形
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入緊急處理情形"
                v-model.trim="ipt.emergentWork"
            ></v-textarea>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>事故單位防範及改善對策
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入事故單位防範及改善對策"
                v-model.trim="ipt.improveStrategy"
            ></v-textarea>
        </v-col>

        <!-- 上傳檔案 (新增時) -->
        <template v-if="!isEdit">
            <v-col cols="12" class="mb-8" v-if="notify.id != ''">
                <v-checkbox
                    v-model="isExtendAnnex"
                    label="直接使用通報附件 (不自行上傳檔案)"
                ></v-checkbox>

                <v-chip small label color="primary" class="mr-2 mb-2 mb-sm-0"
                    v-for="item in notify.files"
                    :key="item.fileName"
                    :href="item.link"
                    :download="item.fileName"
                >
                    {{ item.fileName }}
                </v-chip>
            </v-col>

            <UploadFileAdd
                title="檔案上傳"
                :uploadDisnable="isExtendAnnex"
                :fileList="ipt.files"
                @joinFile="joinFile"
                @rmFile="rmFile"
            />
        </template>

        <v-col cols="12" class="text-center mb-8">
            <v-btn dark class="mr-4"
                v-if="isEdit"
                :to="`/smis/jobsafety/disaster-survey/${this.routeId}/show`"
            >回上層</v-btn>

            <v-btn
                color="success"
                @click="save"
            >{{ (isEdit)? '儲存變更': '送出' }}</v-btn>
        </v-col>

        <!-- 上傳檔案 (編輯時) -->
        <template v-if="isEdit">
            <v-col cols="12" class="mt-8 mb-2">
                <v-divider></v-divider>
            </v-col>

            <UploadFileEdit
                :fileList="ipt.files"
                @uploadFile="uploadFile"
                @deleteFile="deleteFile"
                class="mb-10"
            />
        </template>
    </v-row>
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
// import { getNowFullTime } from '@/assets/js/commonFun'
// import { createWorkOrder } from '@/apis/workList/maintain'
import { hourOptions, minOptions } from '@/assets/js/dateTimeOption'
import { dapartOptsBrief } from '@/assets/js/departOption'
import { injurySiteOpts, disasterTypeOpts, vehicleOpts } from '@/assets/js/smisData'
import UploadFileAdd from '@/components/UploadFileAdd.vue'
import UploadFileEdit from '@/components/UploadFileEdit.vue'

export default {
    data: () => ({
        routeId: '',
        valid: true,  // 表單是否驗證欄位
        isEdit: false,  // 是否編輯中
        ipt: {},
        defaultIpt: {
            name: '',  // 罹災者姓名
            type: 1,  // 勞工類型
            sex: '男',  // 性別
            old: '',  // 年齡
            workDepart: '嘉義車站',  // 工作部門
            startWorkDate: new Date().toISOString().substr(0, 10),  // 到職日期
            jobTitle: '',  // 職稱
            education: '大學',  // 教育程度
            address: '',  // 住址
            workYear: '',  // 本項工作經驗年數
            trainingDate: '',  // 本項工作訓練日期
            depart: '嘉義車站',  // 發生單位
            occurDate: new Date().toISOString().substr(0, 10),  // 發生日期
            hour: '00',  // 發生時間(時)
            min: '00',  // 發生時間(分)
            weather: '晴',  // 氣候
            location: '',  // 發生地點
            accidentType: 1,  // 事故類別
            accidentResult: 1,  // 事故結果
            injurySite: 1,  // 傷害部位
            disasterType: 1,  // 災害類型
            vehicleLv1: '',  // 致傷媒介物-第一層
            vehicle: '',  // 致傷媒介物-第二層
            directReason: '',  // 直接原因
            indirectReason: '',  // 間接原因
            basicReason: '',  // 基本原因
            workItem: '',  // 傷者當時工作
            overview: '',  // 事故概況
            emergentWork: '',  // 緊急處理情形
            improveStrategy: '',  // 事故單位防範及改善對策
            files: [],  // 附件檔案
        },
        dateMenuShow: {  // 日曆是否顯示
            startWorkDate: false,  // 到職日期
            occurDate: false,  // 發生日期
        },
        opts: {  // 下拉選單
            type: [  // 勞工類型
                { text: '本處員工', value: 1 },
                { text: '承攬商勞工', value: 2 },
            ],
            depart: dapartOptsBrief,  // 發生單位
            hour: hourOptions,  // 時
            min: minOptions,  // 分
            accidentType: [  // 事故類別
                { text: '工作傷害事故', value: 1 },
                { text: '工作交通事故', value: 2 },
                { text: '上下班交通事故', value: 3 },
                { text: '其他', value: 4 },
            ],
            accidentResult: [  // 事故結果
                { text: '虛驚事故', value: 1 },
                { text: '輕傷', value: 2 },
                { text: '失能傷害', value: 3 },
                { text: '死亡', value: 4 },
            ],
            injurySite: injurySiteOpts,  // 傷害部位
            disasterType: disasterTypeOpts,  // 災害類型,
            vehicleLv1: [],  // 致傷媒介物-第一層
            vehicle: [],  // 致傷媒介物-第二層
        },
        isExtendAnnex: false,  // 是否延用通報附件
        notify: {  // 危害通報資料
            id: '',  // id
            files: [],  // 附件
            isNew: false,  // 是否為新登錄
        },
    }),
    components: {
        UploadFileAdd,
        UploadFileEdit,
    },
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        },
        // 致傷媒介物-第二層下拉選單
        'ipt.vehicleLv1': function(val) {
            if (val != '') {
                this.opts.vehicle = vehicleOpts[val]
                this.ipt.vehicle = this.opts.vehicle[1]  // 因為第1個選項不可用，所以設為第2個
            }
        },
        
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 初始化資料
        initData() {
            // 初始化表單
            this.ipt = { ...this.defaultIpt }

            // 產生致傷媒介物-第一層選單 & 設定預設值
            this.opts.vehicleLv1 = Object.keys(vehicleOpts)
            this.ipt.vehicleLv1 = this.opts.vehicleLv1[0]

            if (this.$route.params.id != undefined) {
                // -------------- 編輯時 -------------- 
                this.chLoadingShow()
                this.routeId = this.$route.params.id  // 路由參數(id)
                this.isEdit = true

                // 範例效果
                setTimeout(() => {
                    let obj = {
                        workDepart: '阿里山車站',  // 工作部門
                        name: '王小明',  // 罹災者姓名
                        type: 1,  // 勞工類型
                        sex: '男',  // 性別
                        old: 34,  // 年齡
                        startWorkDate: '2003-01-02',  // 到職日期
                        jobTitle: '維修員',  // 職稱
                        education: '大學',  // 教育程度
                        address: '嘉義市東區中山路199號',  // 住址
                        workYear: 6,  // 本項工作經驗年數
                        trainingDate: '2003-01-10 ~ 2003-06-15',  // 本項工作訓練日期
                        depart: '阿里山車站',  // 發生單位
                        findDate: '2020-08-23',  // 發生日期
                        findHour: '09',  // 發生日期(時)
                        findMin: '45',  // 發生日期(分)
                        location: '工具間',  // 發生地點
                        weather: '晴',  // 氣候
                        accidentType: 1,  // 事故類別
                        accidentResult: 2,  // 事故結果
                        injurySite: 9,  // 傷害部位
                        disasterType: 8,  // 災害類型
                        vehicleLv1: '動力機械',  // 致傷媒介物-第一層
                        vehicle: 154,  // 致傷媒介物-第二層
                        directReason: '直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字',  // 直接原因
                        indirectReason: '間接原因文字間接原因文字間接原因文字',  // 間接原因
                        basicReason: '基本原因文字基本原因文字基本原因文字基本原因文字基本原因文字基本原因文字基本原因文字',  // 基本原因
                        workItem: '傷者當時工作文字傷者當時工作文字傷者當時工作文字傷者當時工作文字傷者當時工作文字傷者當時工作文字傷者當時工作文字',  // 傷者當時工作
                        overview: '事故概況文字事故概況文字事故概況文字事故概況文字事故概況文字事故概況文字事故概況文字事故概況文字',  // 事故概況
                        emergentWork: '緊急處理情形文字緊急處理情形文字緊急處理情形文字緊急處理情形文字',  // 緊急處理情形
                        improveStrategy: '事故單位防範及改善對策文字事故單位防範及改善對策文字事故單位防範及改善對策文字事故單位防範及改善對策文字事故單位防範及改善對策文字事故單位防範及改善對策文字',  // 事故單位防範及改善對策
                        files: [
                            { fileName: 'ASRC200701.jpg', link: '/demofile/demo.jpg' },
                            { fileName: 'ASRC200702.jpg', link: '/demofile/demo2.jpg' },
                            { fileName: '123.pdf', link: '/demofile/123.pdf' },
                            { fileName: '123.docx', link: '/demofile/123.docx' },
                            { fileName: '456.xlsx', link: '/demofile/456.xlsx' },
                        ],
                    }
                    
                    this.setInitDate(obj)
                    this.chLoadingShow()
                }, 1000)

            } else {
                // -------------- 新增時 -------------- 
                // 若由危害通報新登錄轉至此頁，則指派初始值
                if (sessionStorage.getItem('notifyItem') !== null) {
                    let obj = JSON.parse(sessionStorage.getItem('notifyItem'))
                    
                    this.notify.id = obj.id,  // 通報id
                    this.notify.files = [ ...obj.files ]  // 通報附件
                    this.notify.isNew = true  // 是否為危害通報的新登錄
                    this.isExtendAnnex = true  // 延用通報附件

                    sessionStorage.removeItem('notifyItem')  // 清除 sessionStorage
                }
            }
        },
        // 設定資料(編輯時)
        setInitDate(obj) {
            this.ipt.workDepart = obj.workDepart  // 工作部門
            this.ipt.name = obj.name  // 罹災者姓名
            this.ipt.type = obj.type  //勞工類型
            this.ipt.sex = obj.sex  // 性別
            this.ipt.old = obj.old  // 年齡
            this.ipt.startWorkDate = obj.startWorkDate　// 到職日期
            this.ipt.jobTitle = obj.jobTitle　// 職稱
            this.ipt.education = obj.education  // 教育程度
            this.ipt.address = obj.address  // 住址
            this.ipt.workYear = obj.workYear  // 本項工作經驗年數
            this.ipt.trainingDate = obj.trainingDate  // 本項工作訓練日期
            this.ipt.depart = obj.depart  // 發生單位
            this.ipt.occurDate = obj.findDate  // 發生日期
            this.ipt.hour = obj.findHour // 發生日期(時)
            this.ipt.min = obj.findMin  // 發生日期(分)
            this.ipt.location = obj.location  // 發生地點
            this.ipt.weather = obj.weather  // 氣候
            this.ipt.accidentType = obj.accidentType  // 事故類別
            this.ipt.accidentResult = obj.accidentResult  // 事故結果
            this.ipt.injurySite = obj.injurySite  // 傷害部位
            this.ipt.disasterType = obj.disasterType  // 災害類型
            this.ipt.vehicleLv1 = obj.vehicleLv1  // 致傷媒介物-第一層
            this.ipt.vehicle = obj.vehicle  // 致傷媒介物-第二層
            this.ipt.directReason = obj.directReason  // 直接原因
            this.ipt.indirectReason = obj.indirectReason  // 間接原因
            this.ipt.basicReason = obj.basicReason  // 基本原因
            this.ipt.workItem = obj.workItem  // 傷者當時工作
            this.ipt.overview = obj.overview  // 事故概況
            this.ipt.emergentWork = obj.emergentWork  // 緊急處理情形
            this.ipt.improveStrategy = obj.improveStrategy  // 事故單位防範及改善對策
            this.ipt.files = [ ...obj.files ]  // 附件檔案
        },
        // 送出
        save() {
            if (confirm('你確定要送出嗎?')) {
                this.chLoadingShow()

                // 新增測試用資料
                setTimeout(() => {
                    if (this.isEdit) {
                        this.chMsgbar({ success: true, msg: '資料更新成功' })
                    } else {
                        this.$router.push({ path: '/smis/jobsafety/disaster-survey' })
                        this.chMsgbar({ success: true, msg: '資料新增成功' })
                    }
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 加入要上傳的檔案 (新增時)
        joinFile(file) {
            this.ipt.files.push(file)
        },
        // 刪除要上傳的檔案 (新增時)
        rmFile(idx) {
            this.ipt.files.splice(idx, 1)
        },
        // 上傳檔案 (編輯時)
        uploadFile(file) {
            this.chLoadingShow()

            setTimeout(() => {
                // 後端請求後，回傳檔案資料 (id、filename、link)
                // this.ipt.files.push(fileData)
                this.chMsgbar({ success: true, msg: '檔案新增成功'})
                this.chLoadingShow()
            }, 1000)
        },
        // 刪除檔案 (編輯時)
        deleteFile(id, idx) {
            if (confirm('你確定要刪除嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    // 後端請求後，移除檔案列表
                    this.ipt.files.splice(idx, 1)
                    this.chMsgbar({ success: true, msg: '檔案刪除成功'})
                    this.chLoadingShow()
                }, 1000)
            }
        },
    },
    created() {
        this.initData()
    }
}
</script>