<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">
        {{ (this.isEdit)? `行車事故事件編輯 (編號：${ id })` : '行車事故事件新增' }}
    </h2>

    <v-row class="px-2">
        <v-col cols="12" md="8">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-tag</v-icon>事故摘要
            </h3>
            <v-text-field
                v-model.trim="ipt.subject"
                solo
            ></v-text-field>
        </v-col>
    </v-row>

    <v-row class="px-2">
        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>發現日期
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

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-clock</v-icon>發現時間 (小時)
            </h3>
            <v-select
                v-model="ipt.hour"
                :items="opts.hour"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-clock</v-icon>發現時間 (分)
            </h3>
            <v-select
                v-model="ipt.min"
                :items="opts.min"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-cloud-outline</v-icon>天候
            </h3>
            <v-text-field
                v-model.trim="ipt.climate"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>事故類型
            </h3>
            <v-select
                v-model="ipt.evtType"
                :items="evtTypeOpts"
                solo
            ></v-select>
        </v-col>
    </v-row>

    <!-- 發現地點 -->
    <LocationSelect
        @chLocation="setLocation"
        :location="ipt.location"
        :locationK="ipt.locationK"
        :locationM="ipt.locationM"
        :locationOther="ipt.locationOther"
    />

    <v-row class="px-2">
        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-stairs</v-icon>路線坡度
            </h3>
            <v-text-field
                v-model.trim="ipt.slope"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-image-filter-tilt-shift</v-icon>曲線半徑
            </h3>
            <v-text-field
                v-model.trim="ipt.curve"
                solo
            ></v-text-field>
        </v-col>
    </v-row>

    <!-- 路段型態 -->
    <h3 class="mb-1 ml-2">
        <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>路段型態
    </h3>

    <v-sheet elevation="2" class="mx-2 mb-8 px-3 pb-3">
        <v-row>
            <v-col cols="12" sm="2" md="1" v-for="item in opts.loadType" :key="item">
                <v-checkbox
                    v-model="ipt.loadType"
                    :label="item"
                    color="indigo"
                    :value="item"
                    hide-details
                ></v-checkbox>
            </v-col>

            <v-col cols="12" md="4" align-self="center" class="mt-2">
                <v-text-field
                    v-model.trim="ipt.loadTypeOther"
                    solo
                    placeholder="請輸入其他的內容"
                    hide-details
                ></v-text-field>
            </v-col>
        </v-row>
    </v-sheet>

    <!-- 周邊環境 -->
    <h3 class="mb-1 ml-2">
        <v-icon class="mr-1 mb-1">mdi-terrain</v-icon>周邊環境
    </h3>

    <v-sheet elevation="2" class="mx-2 mb-8 px-3 pb-3">
        <v-row>
            <v-col cols="12" sm="4" md="2" v-for="item in opts.aroundEnv" :key="item">
                <v-checkbox
                    v-model="ipt.aroundEnv"
                    :label="item"
                    color="indigo"
                    :value="item"
                    hide-details
                ></v-checkbox>
            </v-col>

            <v-col cols="12" md="4" align-self="center" class="mt-2">
                <v-text-field
                    v-model.trim="ipt.aroundEnvOther"
                    solo
                    placeholder="請輸入其他的內容"
                    hide-details
                ></v-text-field>
            </v-col>
        </v-row>
    </v-sheet>

    <!-- 鐵路設施設備及圍籬之設置 -->
    <h3 class="mb-1 ml-2">
        <v-icon class="mr-1 mb-1">mdi-tower-fire</v-icon>鐵路設施設備及圍籬之設置
    </h3>

    <v-sheet elevation="2" class="mx-2 mb-8 px-3 pb-3">
        <v-row>
            <v-col cols="12" sm="4" md="2"  v-for="item in opts.fenceEq" :key="item">
                <v-checkbox
                    v-model="ipt.fenceEq"
                    :label="item"
                    color="indigo"
                    :value="item"
                    hide-details
                >
                </v-checkbox>
            </v-col>

            <v-col cols="12" md="4" align-self="center" class="mt-2">
                <v-text-field
                    v-model.trim="ipt.fenceEqOther"
                    solo
                    placeholder="請輸入其他的內容"
                    hide-details
                ></v-text-field>
            </v-col>
        </v-row>
    </v-sheet>

    <v-row class="px-2">
        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-alert</v-icon>事發速限
            </h3>
            <v-text-field
                v-model.trim="ipt.speedLimit"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-speedometer</v-icon>事發車速
            </h3>
            <v-text-field
                v-model.trim="ipt.carSpeed"
                solo
            ></v-text-field>
        </v-col>
    </v-row>

    <v-row class="px-2 mb-8">
        <v-col cols="12" sm="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-cellphone-link-off</v-icon>設備受損情形
            </h3>
            <v-text-field
                v-model.trim="ipt.eqLoss"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-alert-decagram</v-icon>運轉影響情形
            </h3>
            <v-text-field
                v-model.trim="ipt.serviceShock"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>列車運行計劃及運轉情形
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                v-model.trim="ipt.runPlan"
            ></v-textarea>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>關係者之職務、資歷、操作情形及訪談紀要
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                v-model.trim="ipt.relatedPerson"
            ></v-textarea>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>現場作業規定與落實情形
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                v-model.trim="ipt.fieldRegulations"
            ></v-textarea>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>事故設施設備或車輛之型式、功能運作、檢修養護及後續檢測情形
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                v-model.trim="ipt.accidentEq"
            ></v-textarea>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>現場相關量測
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                v-model.trim="ipt.fieldMeasure"
            ></v-textarea>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>天然災害偵測資訊
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                v-model.trim="ipt.naturalDisaster"
            ></v-textarea>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>民眾或旅客行為說明
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                v-model.trim="ipt.behaviorDesc"
            ></v-textarea>
        </v-col>

        <!-- 原因分析 - 三層下拉選單 -->
        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>第一層因素
            </h3>
            <v-select
                v-model="ipt.accidentFactors1"
                :items="opts.accidentFactors1"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>第二層因素
            </h3>
            <v-select
                v-model="ipt.accidentFactors2"
                :items="accidentFOpts2"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>第三層因素
            </h3>
            <v-select
                v-model="ipt.accidentFactors3"
                :items="accidentFOpts3"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>原因分析
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                v-model.trim="ipt.reason"
            ></v-textarea>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>檢討過程
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                v-model.trim="ipt.review"
            ></v-textarea>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>備註說明
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                v-model.trim="ipt.note"
            ></v-textarea>
        </v-col>

        <!-- 上傳檔案 (新增時) -->
        <template v-if="!isEdit">
            <UploadFileAdd
                title="檔案上傳"
                :uploadDisnable="false"
                :fileList="showFiles"
                @joinFile="joinFile"
                @rmFile="rmFile"
            />
        </template>
        

        <v-col cols="12" class="text-center">
            <v-btn dark class="mr-4"
                v-if="!isEdit"
                to="/smis/car-accident-event"
            >回搜尋頁</v-btn>

            <v-btn dark class="mr-4"
                v-else
                :to="`/smis/car-accident-event/${this.id}/show`"
            >回上層</v-btn>

            <v-btn dark color="success"
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
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { evtTypes, AccidentFactors1, AccidentFactors2, AccidentFactors3 } from '@/assets/js/smisData'
import { hourOptions, minOptions } from '@/assets/js/dateTimeOption'
import LocationSelect from '@/components/smis/LocationSelect.vue'
import UploadFileAdd from '@/components/UploadFileAdd.vue'
import UploadFileEdit from '@/components/UploadFileEdit.vue'
import { createData, fetchOne, updateData } from '@/apis/smis/carAccidentEvent'

export default {
    props: ['id'],  //路由參數
    data: () => ({
        routeId: '',  // 編號
        isEdit: false,  // 是否為編輯狀態
        ipt: {  // 給地點組件的預設值要先設
            location: 'l1',  // 發現地點
            locationK: '',  // 路線k
            locationM: '',　// 路線m
            locationOther: '',　// 其他地點
        },
        defaultIpt: {
            subject: '',  // 事故摘要
            date: new Date().toISOString().substr(0, 10),  // 發現日期
            hour: '00',  // 發現時間(小時)
            min: '00',  // 發現時間(分)
            climate: '',  // 天候
            location: 'l1',  // 發現地點
            locationK: '',  // 路線k
            locationM: '',　// 路線m
            locationOther: '',　// 其他地點
            evtType: 'M1', // 事故類型
            slope: '',  // 路線坡度
            curve: '',  // 曲線半徑
            loadType: [],  // 路段型態
            loadTypeOther: '',  // 路段型態其他內容
            aroundEnv: [],  // 周邊環境
            aroundEnvOther: '',  // 周邊環境其他內容
            fenceEq: [],  // 鐵路設施設備及圍籬之設置
            fenceEqOther: '',  // 鐵路設施設備及圍籬之設置-其他的內容
            speedLimit: '',  // 事發速限
            carSpeed: '',  // 事發車速
            runPlan: '',  // 列車運行計劃及運轉情形
            relatedPerson: '',  // 關係者之職務、資歷、操作情形及訪談紀要
            fieldRegulations: '',  // 現場作業規定與落實情形
            accidentEq: '',  // 事故設施設備或車輛之型式、功能運作、檢修養護及後續檢測情形
            fieldMeasure: '',  // 現場相關量測
            naturalDisaster: '',  // 天然災害偵測資訊
            behaviorDesc: '',  // 民眾或旅客行為說明
            eqLoss: '',  // 設備受損情形
            serviceShock: '', // 運轉影響情形
            review: '', // 檢討過程
            accidentFactors1: '',  // 第一層因素
            accidentFactors2: '',  // 第二層因素
            accidentFactors3: '',  // 第三層因素
            reason: '', // 原因分析
            note: '', // 備註說明
            files: [],  // 附件檔案
        },
        dateMenuShow: false,  // 日曆是否顯示
        opts: {  // 選項
            hour: hourOptions,  // 小時
            min: minOptions,  // 分
            loadType: ['高架', '隧道', '平面', '地下', '其他' ],  // 路段型態
            aroundEnv: ['平交道', '車站', '遂路或便道', '民宅', '河川', '隧道', '橋梁', '邊坡', '逃生出口', '其他' ],  // 周邊環境
            fenceEq: ['圍籬', '監視設備', '其他'],  // 鐵路設施設備及圍籬之
            accidentFactors1: AccidentFactors1,  // 第一層因素
        },
        evtTypeOpts: evtTypes,  // 事故類型下拉選單
        showFiles: [],  // 要顯示的縮圖
    }),
    components: {
        LocationSelect,
        UploadFileAdd,
        UploadFileEdit,
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
        accidentFOpts2() {
            return AccidentFactors2.filter(item => item.parent == this.ipt.accidentFactors1)
        },
        accidentFOpts3() {
            return AccidentFactors3.filter(item => item.parent == this.ipt.accidentFactors2)
        },
    },
    watch: {
        // 第一層因素
        'ipt.accidentFactors1': function(newVal) {
            this.ipt.accidentFactors2 = this.ipt.accidentFactors3 = ''
        },
        // 第二層因素
        'ipt.accidentFactors1': function(newVal) {
            this.ipt.accidentFactors3 = ''
        },
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 初始化資料
        initData() {
            this.ipt = { ...this.defaultIpt }  // 初始化表單欄位

            if (this.id != undefined) {
                // -------------- 編輯時 -------------- 
                this.chLoadingShow()
                this.isEdit = true

                // 範例效果
                setTimeout(() => {
                    let obj = {
                        date: '2017-01-25',  // 發現日期
                        hour: '15',  // 發現時間(小時)
                        min: '56',  // 發現時間(分)
                        location: 'l1',  // 發現地點
                        locationK: 20,  // 路線k
                        locationM: 445,　// 路線m
                        locationOther: '',　// 其他地點
                        evtType: 'M2',  // 事故類型
                        eqLoss: 'APC3 車廂轉向架受損',  // 設備受損情形
                        serviceShock: '影響列車計2列次',  // 運轉影響情形
                        review: '新增行車事故事件本事故事發後，鐵道局於107年3月5日啟動專案調查，並於同月8、9日辦理本事故專案調查簡報討論、文件檢視及現場勘查 。同年5月3日召開本事故專案調查工作會議。最終於同年8月15日召開交通部鐵路行車事故調查小組第24次會議，確認本事故專案調查結果。',  // 檢討過程
                        reason: "<直接原因>\n事故路段因氣候易潮濕，加上路基排水狀況不佳 造成該路段有多處噴泥現象， 當鋼軌受列車重壓下沉致軌枕沉 陷、鋼軌產生前後高低不整之現象，在 列車於動態行駛下易致鋼軌單邊下沉產生平面性扭曲，使車輪浮動爬上出軌。\n<間接原因>\n部分路段道碴存有厚度不足加上列車反覆作用下，致使路基土壤細粒料因壓力而循道碴間隙上升， 使路基出現鬆動現象。\n<其他因素>\n有關天候、車輛、人員及運轉等部分，經檢討尚無涉事故原因。",  // 原因分析
                        note: '本事故由鐵道局( 鐵路營運監理小組) 及 5位具軌道、力學、車輛及營運等專業之外聘專案委員組成團隊進行專案調查，並由本部鐵路行車事故調查小組 定期委員開會確認調查結果。', // 備註說明
                        files: [
                            { id: 11, fileName: 'ASRC200701.jpg', link: '/demofile/demo.jpg' },
                            { id: 22, fileName: '123.docx', link: '/demofile/123.docx' },
                        ],
                    }
                    
                    this.setInitDate(obj)
                    this.chLoadingShow()
                }, 1000)
            
            } 
        },
        // 設定發現地點
        setLocation(payload) {
            this.ipt.location = payload.location
            this.ipt.locationK = payload.locationK
            this.ipt.locationM = payload.locationM
            this.ipt.locationOther = payload.locationOther
        },
        // 設定資料(編輯時)
        setInitDate(obj) {
            this.ipt.date = obj.date  // 發現日期
            this.ipt.hour = obj.hour  // 發現時間(小時)
            this.ipt.min = obj.min  // 發現時間(分)
            this.ipt.location = obj.location  // 發現地點
            this.ipt.locationK = obj.locationK  // 路線k
            this.ipt.locationM = obj.locationM　// 路線m
            this.ipt.locationOther = obj.locationOther　// 其他地點
            this.ipt.evtType = obj.evtType  // 事故類型
            this.ipt.eqLoss = obj.eqLoss  // 設備受損情形
            this.ipt.serviceShock = obj.serviceShock  // 運轉影響情形
            this.ipt.review = obj.review  // 檢討過程
            this.ipt.reason = obj.reason  // 原因分析
            this.ipt.note = obj.note // 備註說明
            this.ipt.files = [ ...obj.files ]  // 附件檔案
        },
        // 送出
        save() {
            this.chLoadingShow()

            if (this.isEdit) {
                // ---------- 編輯時---------- 
                // updateData({
                //     EndangerCode: this.id,  // 危害編號
                //     EndangerDesp: this.ipt.desc,  // 危害說明
                //     OperationMode: this.ipt.mode,  //營運模式
                //     EndangerReason: this.ipt.reason,  // 危害直接成因
                //     EndangerIndirect: this.ipt.indirectReason,  // 可能的危害間接原因
                //     Remark: this.ipt.note,  // 備註
                //     EndangerDepart: this.ipt.depart,  // 危害權責部門
                //     RiskSerious: this.ipt.serious,  // 風險嚴重性
                //     RiskFreq: this.ipt.frequency,  // 風險頻率
                //     RiskLevel: '',  // 風險等級
                //     DeriveAccident: this.ipt.accidents,  // 衍生事故
                //     EffectTraveler: (this.ipt.affectTraveler)? 'T' : 'F',  // 影響人員-旅客
                //     EffectEmploy: (this.ipt.affectStaff)? 'T' : 'F',  // 影響人員-員工
                //     EffectPeople: (this.ipt.affectPublic)? 'T' : 'F',  // 影響人員-大眾
                //     ServiceCarError: (this.ipt.trainLate)? 'T' : 'F',  // 營運衝擊-列車誤點
                //     ServiceStopError: (this.ipt.stopOperation)? 'T' : 'F',  // 營運衝擊-中斷營運
                //     DeviceDepart: '',  // 控制措施權責部門
                //     ConnectWBS: this.ipt.wbs,  // 關聯子系統(WBS)
                //     ProcCount: chooseControlData,  // 已選控制措施清單
                //     ClientReqTime: getNowFullTime(),  // client 端請求時間
                //     OperatorID: this.userData.UserId,  // 操作人id
                // }).then(res => {
                //     if (res.data.ErrorCode == 0) {
                //         this.chMsgbar({ success: true, msg: '更新成功' })
                //     } else {
                //         sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                //         this.$router.push({ path: '/error' })
                //     }
                // }).catch(err => {
                //     this.chMsgbar({ success: false, msg: '伺服器發生問題，更新失敗' })
                // }).finally(() => {
                //     this.chLoadingShow()
                // })
            } else {
                // ---------- 新增時---------- 
                createData({
                    FindDDay: this.ipt.date,  // 發現日期
                    FindDHour: this.ipt.hour,  //發現時間 (小時)
                    FindDMin: this.ipt.min,  // 發現時間 (分)
                    FindLine: this.ipt.location,  // 發現地點
                    FindKLine: this.ipt.locationK,  // 發現地點K路段
                    FindMLine: this.ipt.locationM,  // 發現地點M路段
                    FindLineOther: this.ipt.locationOther,  // 發現地點其他路段
                    ReportTitle: this.ipt.subject,  // 事故摘要
                    AccidentType: this.ipt.evtType,  // 事故類型
                    EventWeather: this.ipt.climate,  // 氣候
                    RoadSlope: this.ipt.slope,  // 路線坡度
                    CurveRadius: this.ipt.curve,  // 曲線半徑
                    RoadType: this.ipt.loadType,  // 路段型態
                    RoadTypeElse: this.ipt.loadTypeOther,  // 路段型態(其他)
                    Surround: this.ipt.aroundEnv,  // 周邊環境
                    SurroundElse: this.ipt.aroundEnvOther,  // 周邊環境(其他)
                    RailwayDevice: this.ipt.fenceEq,  // 鐵路設施設備及圍籬之設置
                    RailwayDeviceElse: this.ipt.fenceEqOther,  // 鐵路設施設備及圍籬之設置(其他)
                    IncidentLimit: this.ipt.speedLimit,  // 事發速限
                    IncidentSpeed: this.ipt.carSpeed,  // 事發車速
                    CarOperation: this.ipt.runPlan,  // 列車運行計劃及運轉情形
                    TalkSituation: this.ipt.relatedPerson,  // 關係者之職務、資歷、操作情形及訪談紀要
                    OnsiteSituation: this.ipt.fieldRegulations,  // 現場作業規定與落實情形
                    CarFollowUp: this.ipt.accidentEq,  // 事故設施設備或車輛之型式、功能運作、檢修養護及後續檢測情形
                    OnsiteMeasure: this.ipt.fieldMeasure,  // 現場相關量測
                    NaturalInfo: this.ipt.naturalDisaster,  // 天然災害偵測資訊
                    PeopleMemo: this.ipt.behaviorDesc,  // 民眾或旅客行為說明
                    DeviceLost: this.ipt.eqLoss,  // 設備損失
                    OperationLost: this.ipt.serviceShock,  // 運轉影響情形
                    FixProcess: '',  // 處置過程(預留的欄位，目前用不到)
                    ReviewProcess: this.ipt.review,  // 檢討過程
                    CauseAnaly: this.ipt.reason,  // 原因分析
                    RemarkDesp: this.ipt.note,  // 備註說明
                    SaftyCodeLv1: this.ipt.accidentFactors1,  // 安全績效指標第一層代碼
                    SaftyCodeLv2: this.ipt.accidentFactors2,  // 安全績效指標第二層代碼
                    SaftyCodeLv3: this.ipt.accidentFactors3,  // 安全績效指標第三層代碼
                    FileCount: this.ipt.files,  // 上傳檔案列表
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '新增成功' })
                        this.ipt = { ...this.defaultIpt }  // 初始化新增表單
                        this.ipt.files = [ ...[]]
                        this.showFiles = [ ...[]]
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，新增失敗' })
                }).finally(() => {
                    this.chLoadingShow()
                })
            }
        },
        // 加入檔案 (組件用)
        // 註：第二參數的布林值，是控制物件加入上傳後端的陣列，還是縮圖顯示的陣列
        joinFile(obj, bool) {
            if (bool) {
                this.ipt.files.push(obj)  // 加入要上傳後端的檔案
            } else {
                this.showFiles.push(obj)  // 加入要顯示的縮圖
            }
        },
        // 移除要上傳的檔案 (組件用)
        rmFile(idx) {
            this.showFiles.splice(idx, 1)
            this.ipt.files.splice(idx, 1)
        },
        // 上傳檔案 (編輯時)
        uploadFile(file) {
            this.chLoadingShow()

            if (file) {
                let reader = new FileReader()  // blob 用

                // 設定 reader 物件的 result 屬性，為 ArrayBuffer
                reader.readAsArrayBuffer(file)

                // 設定讀取完時的動作
                reader.onload = () => {
                    // 抓出副檔名
                    let nameArr = file.name.split('.')  // 用小數點拆成陣列
                    let type = (nameArr.length > 1) ? nameArr[nameArr.length - 1] : ''  // 若沒有副檔名傳空值
                    
                    let fileArr = [{ FileName: file.name, FileType: type, UnitData: Array.from(new Uint8Array(reader.result)) }]
                    
                    updateFile({
                        ProcCode: this.id,  // 措施編號
                        FileCount: fileArr,  // 新檔案
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                    }).then(res => {
                        if (res.data.ErrorCode == 0) {
                            this.chMsgbar({ success: true, msg: '上傳成功' })
                            // 把檔案資料寫入畫面中
                            this.ipt.files = [ ...res.data.FileCount.map(item => ({
                                fileName: item.FileName,
                                link: item.FilePath,
                            }))]
                        } else {
                            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                            this.$router.push({ path: '/error' })
                        }
                    }).catch(err => {
                        this.chMsgbar({ success: false, msg: '伺服器發生問題，上傳失敗' })
                    }).finally(() => {
                        this.chLoadingShow()
                    })
                }
            }
        },
        // 刪除檔案 (編輯時)
        deleteFile(idx) {
            if (confirm('你確定要刪除嗎?')) {
                this.chLoadingShow()

                deleteFile({
                    ProcCode: this.id,  // 編號
                    FileName: this.ipt.files[idx].fileName,  // 檔案名稱
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.ipt.files.splice(idx, 1)
                        this.chMsgbar({ success: true, msg: '刪除成功' })
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，刪除失敗' })
                }).finally(() => {
                    this.chLoadingShow()
                })
            }
        },
    },
    created() {
        this.initData()
    }
}
</script>