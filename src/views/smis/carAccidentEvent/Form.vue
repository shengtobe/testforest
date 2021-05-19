<template>
<v-container style="max-width: 1200px" class="label-header">
    <h2 class="mb-4 label-title" >
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
    <h3 class="mb-1 ml-2">
        <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>發現地點
    </h3>

    <v-sheet elevation="2" class="mx-2 mb-8 px-3">
        <!-- 路線 -->
        <h3 class="mb-1 pt-2">路線</h3>
        <v-row no-gutters>
            <v-col cols="12" md="5">
                <v-radio-group row v-model="ipt.location" class="pa-0">
                    <v-radio label="本線" color="success" value="l1" class="mb-2"></v-radio>
                    <v-radio label="祝山線" color="success" value="l2" class="mb-2"></v-radio>
                    <v-radio label="眠月線" color="success" value="l3" class="mb-2"></v-radio>
                    <v-radio label="水山線" color="success" value="l4" class="mb-2"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="6">
                <v-row no-gutters align="center">
                    <v-col cols="4" sm="3">
                        <v-text-field
                            v-model.trim="ipt.locationK"
                            solo
                            placeholder="ex：12"
                            hide-details
                        ></v-text-field>
                    </v-col>

                    <v-col cols="2" sm="1" class="text-center font-weight-bold">K+</v-col>

                     <v-col cols="4" sm="3">
                        <v-text-field
                            v-model.trim="ipt.locationM"
                            solo
                            placeholder="ex：345"
                            hide-details
                        ></v-text-field>
                    </v-col>

                    <v-col cols="2" sm="1" class="text-center font-weight-bold">M</v-col>
                </v-row>
            </v-col>
        </v-row>

        <!-- 車站 -->
        <h3 class="mb-1 pt-2">車站</h3>

        <v-radio-group row v-model="ipt.location" class="pa-0">
            <v-radio label="嘉義" color="success" value="t1" class="mb-2"></v-radio>
            <v-radio label="北門" color="success" value="t2" class="mb-2"></v-radio>
            <v-radio label="鹿滿" color="success" value="t3" class="mb-2"></v-radio>
            <v-radio label="竹崎" color="success" value="t4" class="mb-2"></v-radio>
            <v-radio label="木屐寮" color="success" value="t4-2" class="mb-2"></v-radio>
            <v-radio label="樟腦寮" color="success" value="t5" class="mb-2"></v-radio>
            <v-radio label="獨立山" color="success" value="t6" class="mb-2"></v-radio>
            <v-radio label="梨園寮" color="success" value="t7" class="mb-2"></v-radio>
            <v-radio label="交力坪" color="success" value="t8" class="mb-2"></v-radio>
            <v-radio label="水社寮" color="success" value="t9" class="mb-2"></v-radio>
            <v-radio label="奮起湖" color="success" value="t10" class="mb-2"></v-radio>
            <v-radio label="多林" color="success" value="t11" class="mb-2"></v-radio>
            <v-radio label="十字路" color="success" value="t12" class="mb-2"></v-radio>
            <v-radio label="屏遮那" color="success" value="t13" class="mb-2"></v-radio>
            <v-radio label="第一分道" color="success" value="t14" class="mb-2"></v-radio>
            <v-radio label="二萬平" color="success" value="t15" class="mb-2"></v-radio>
            <v-radio label="神木" color="success" value="t16" class="mb-2"></v-radio>
            <v-radio label="阿里山" color="success" value="t17" class="mb-2"></v-radio>
            <v-radio label="沼平" color="success" value="t18" class="mb-2"></v-radio>
            <v-radio label="十字分道" color="success" value="t19" class="mb-2"></v-radio>
            <v-radio label="對高岳" color="success" value="t20" class="mb-2"></v-radio>
            <v-radio label="祝山" color="success" value="t21" class="mb-2"></v-radio>
            <v-radio label="塔山" color="success" value="t22" class="mb-2"></v-radio>
            <v-radio label="眠月" color="success" value="t23" class="mb-2"></v-radio>
            <v-radio label="石猴" color="success" value="t24" class="mb-2"></v-radio>
            <v-radio label="水山" color="success" value="t25" class="mb-2"></v-radio>
        </v-radio-group>

        <!-- 廠庫 -->
        <h3 class="mt-2">廠庫</h3>

        <v-radio-group row v-model="ipt.location" class="pa-0">
            <v-radio label="嘉義車庫" color="success" value="g1" class="mb-2"></v-radio>
            <v-radio label="阿里山車庫" color="success" value="g2" class="mb-2"></v-radio>
            <v-radio label="修理工廠" color="success" value="factory" class="mb-2"></v-radio>
        </v-radio-group>

        <!-- 其他 -->
        <h3 class="mt-2">其他</h3>
        <v-row no-gutters class="d-flex">
            <v-col cols="12" sm="2">
                <v-radio-group row v-model="ipt.location" class="pa-0">
                    <v-radio label="其他" color="success" value="other" class="mb-2"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" sm="5" class="ml-md-n12">
                <v-text-field
                    v-model.trim="ipt.locationOther"
                    solo
                    placeholder="請輸入地點"
                ></v-text-field>
            </v-col>
        </v-row>
    </v-sheet>

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
                    color="primary"
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
                    color="primary"
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
                    color="primary"
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
            <v-btn dark class="mr-4 btn-close"
                v-if="!isEdit"
                to="/smis/car-accident-event"
            >回搜尋頁</v-btn>

            <v-btn dark class="mr-4 btn-close"
                v-else
                :to="`/smis/car-accident-event/${this.id}/show`"
            >回上層</v-btn>

            <v-btn dark class="btn-add"
                @click="save"
            >{{ (isEdit)? '儲存變更': '送出' }}</v-btn>
        </v-col>

        <!-- 上傳檔案 (編輯時) -->
        <template v-if="isEdit">
            <v-col cols="12" class="mt-8 mb-2">
                <v-divider></v-divider>
            </v-col>

            <UploadFileEdit title="檔案管理"
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
import { canInUpdate } from '@/apis/access'
import { getNowFullTime } from '@/assets/js/commonFun'
import { evtTypes, AccidentFactors1, AccidentFactors2, AccidentFactors3 } from '@/assets/js/smisData'
import { hourOptions, minOptions } from '@/assets/js/dateTimeOption'
import UploadFileAdd from '@/components/UploadFileAdd.vue'
import UploadFileEdit from '@/components/UploadFileEdit.vue'
import { createData, fetchOne, updateData, updateFile, deleteFile, fetchEvtTypes } from '@/apis/smis/carAccidentEvent'

export default {
    props: ['id'],  //路由參數
    data: () => ({
        routeId: '',  // 編號
        isShowBtn: false,
        isEdit: false,  // 是否為編輯狀態
        ipt: {},
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
            evtType: '', // 事故類型
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
        evtTypeOpts: [],  // 事故類型下拉選單
        showFiles: [],  // 要顯示的縮圖
    }),
    components: {
        UploadFileAdd,
        UploadFileEdit,
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
            groupData: state => state.groupData,
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
        ...mapActions('user', [
            'saveUserGroup',  // 儲存使用者權限(群組)資料
        ]),
        // 初始化資料
        initData() {
            this.ipt = { ...this.defaultIpt }  // 初始化表單欄位
            // 初始化事故類型 fetchEvtTypes
            fetchEvtTypes({
                OperatorID: this.userData.UserId,  // 事故事件編號 (從路由參數抓取)
                ClientReqTime: getNowFullTime(),  // client 端請求時間
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    this.evtTypeOpts = JSON.parse(res.data.order_list)
                    console.log("evtTypeOpts", this.evtTypeOpts);
                } else {
                    // 請求發生問題時(ErrorCode 不為 0 時)，重導至錯誤訊息頁面
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
            }).catch(err => {
                console.log(err)
                alert('伺服器發生問題，事故類型讀取失敗')
            }).finally(() => {
                // this.chLoadingShow()
            })
            console.log("行安編輯/新增 初始:", this.id);
            if (this.id != undefined) {
                // -------------- 編輯前先詢問有無權限 -------------- 
                
                // -------------- 編輯時 -------------- 
                this.chLoadingShow()
                this.isEdit = true

                fetchOne({
                    AccidentCode: this.id,  // 事故事件編號 (從路由參數抓取)
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        console.log("/sms/event/detail: ", res.data)
                        if (res.data.DelStatus == 'T') {  // 若已刪除則轉404頁
                            this.$router.push({ path: '/404' })
                        } else {
                            this.setInitDate(res.data)
                        }
                    } else {
                        // 請求發生問題時(ErrorCode 不為 0 時)，重導至錯誤訊息頁面
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    console.log(err)
                    alert('伺服器發生問題，資料讀取失敗')
                }).finally(() => {
                    this.chLoadingShow()
                })
            } 
        },
        // 設定資料(編輯時)
        setInitDate(obj) {
            this.ipt.subject = obj.ReportTitle  // 事故摘要
            this.ipt.date = obj.FindDDay  // 發現日期
            this.ipt.hour = obj.FindDHour  // 發現時間(小時)
            this.ipt.min = obj.FindDMin  // 發現時間(分)
            this.ipt.climate = obj.EventWeather  // 天候
            this.ipt.evtType = obj.AccidentType // 事故類型
            this.ipt.location = obj.FindLine // 發現地點
            this.ipt.locationK = obj.FindKLine // 路線k
            this.ipt.locationM = obj.FindMLine // 路線m
            this.ipt.locationOther = obj.FindLineOther // 其他地點
            this.ipt.slope = obj.RoadSlope  // 路線坡度
            this.ipt.curve = obj.CurveRadius  // 曲線半徑
            this.ipt.loadType = [ ...obj.RoadType ]  // 路段型態
            this.ipt.loadTypeOther = obj.RoadTypeElse  // 路段型態其他內容
            this.ipt.aroundEnv = [ ...obj.Surround ]  // 周邊環境
            this.ipt.aroundEnvOther = obj.SurroundElse  // 周邊環境其他內容
            this.ipt.fenceEq = [ ...obj.RailwayDevice ]  // 鐵路設施設備及圍籬之設置
            this.ipt.fenceEqOther = obj.RailwayDeviceElse  // 鐵路設施設備及圍籬之設置-其他的內容
            this.ipt.speedLimit = obj.IncidentLimit  // 事發速限
            this.ipt.carSpeed = obj.IncidentSpeed  // 事發車速
            this.ipt.runPlan = obj.CarOperation  // 列車運行計劃及運轉情形
            this.ipt.relatedPerson = obj.TalkSituation  // 關係者之職務、資歷、操作情形及訪談紀要
            this.ipt.fieldRegulations = obj.OnsiteSituation  // 現場作業規定與落實情形
            this.ipt.accidentEq = obj.CarFollowUp  // 事故設施設備或車輛之型式、功能運作、檢修養護及後續檢測情形
            this.ipt.fieldMeasure = obj.OnsiteMeasure  // 現場相關量測
            this.ipt.naturalDisaster = obj.NaturalInfo  // 天然災害偵測資訊
            this.ipt.behaviorDesc = obj.PeopleMemo  // 民眾或旅客行為說明
            this.ipt.eqLoss = obj.DeviceLost  // 設備受損情形
            this.ipt.serviceShock = obj.OperationLost // 運轉影響情形
            this.ipt.review = obj.ReviewProcess // 檢討過程
            this.ipt.reason = obj.CauseAnaly // 原因分析
            this.ipt.note = obj.RemarkDesp // 備註說明
            this.ipt.files = [ ...obj.FileCount ]  // 附件檔案
            this.ipt.accidentFactors1 = obj.SaftyCodeLv1  // 第一層因素
            // 因為二、三層有 watch 動作，所以加上延遲避過 watch
            setTimeout(() => {
                this.ipt.accidentFactors2 = obj.SaftyCodeLv2  // 第二層因素
            }, 300)
            setTimeout(() => {
                this.ipt.accidentFactors3 = obj.SaftyCodeLv3  // 第三層因素
            }, 300)
        },
        // 送出
        save() {
            this.chLoadingShow()
            if(this.ipt.locationK == '') this.ipt.locationK = '0'
            if(this.ipt.locationM == '') this.ipt.locationM = '0'

            if (this.isEdit) {
                // ---------- 編輯時---------- 
                updateData({
                    AccidentCode: this.id,  // 行車事故事件編號
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
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '更新成功' })
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，更新失敗' })
                }).finally(() => {
                    this.chLoadingShow()
                })
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
        uploadFile(fileArr) {
            this.chLoadingShow()

            updateFile({
                AccidentCode: this.id,  // 措施編號
                FileCount: fileArr,  // 新檔案
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    this.chMsgbar({ success: true, msg: '上傳成功' })
                    // 把檔案資料寫入畫面中
                    this.ipt.files = [ ...res.data.FileCount.map(item => ({
                        FileName: item.FileName,
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
        },
        // 刪除檔案 (編輯時)
        deleteFile(idx) {
            if (confirm('你確定要刪除嗎?')) {
                this.chLoadingShow()
                
                deleteFile({
                    AccidentCode: this.id,  // 編號
                    FileSaveName: this.ipt.files[idx].FileName,  // 檔案名稱
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
        canInUpdate({
            ClientReqTime: getNowFullTime(),  // client 端請求時間
            OperatorID: this.userData.UserId,  // 操作人id
        }).then(res => {
            if (res.data.ErrorCode == 0) {
                console.log("🚓 res.data.GroupData", res.data.GroupData);
                console.log("🚓🚓 (brfore)groupData: ", this.groupData);
                this.saveUserGroup(res.data.GroupData)
                console.log("🚓🚓🚓 (after)groupData: ", this.groupData);
                this.isShowBtn = this.groupData.RoleLv2 == "T"

                if(this.isShowBtn){
                    this.initData()
                }
                else{
                    alert("無權限做此操作")
                    this.$router.push('/')
                }
            }
        }).catch( err => {
            console.log(err)
        }).finally(() => {
        })
    }
}
</script>