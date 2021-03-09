<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">
        {{ (this.isEdit)? `行車事故事件編輯 (編號：${ routeId })` : '行車事故事件新增' }}
    </h2>

    <v-row class="px-2">
        <v-col cols="12" md="8">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-tags</v-icon>事故摘要
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
                v-model.trim="ipt.climate"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-image-filter-tilt-shift</v-icon>曲線半徑
            </h3>
            <v-text-field
                v-model.trim="ipt.climate"
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
            <v-col cols="12" sm="4" md="2">
                <v-checkbox v-model="ipt.fenceEq" label="圍籬" color="indigo" hide-details></v-checkbox>
            </v-col>

            <v-col cols="12" sm="4" md="2">
                <v-checkbox v-model="ipt.monitorEq" label="監視設備" color="indigo" hide-details></v-checkbox>
            </v-col>

            <v-col cols="12" sm="4" md="2">
                <v-checkbox v-model="ipt.railwayOther" label="其他" color="indigo" hide-details></v-checkbox>
            </v-col>

            <v-col cols="12" md="4" align-self="center" class="mt-2">
                <v-text-field
                    v-model.trim="ipt.railwayOtherText"
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
                v-model="ipt.hour"
                :items="opts.hour"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>第二層因素
            </h3>
            <v-select
                v-model="ipt.hour"
                :items="opts.hour"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>第三層因素
            </h3>
            <v-select
                v-model="ipt.hour"
                :items="opts.hour"
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
        

        <v-col cols="12" class="text-center">
            <v-btn dark class="mr-4"
                v-if="!isEdit"
                to="/smis/car-accident-event"
            >回搜尋頁</v-btn>

            <v-btn dark class="mr-4"
                v-else
                :to="`/smis/car-accident-event/${this.routeId}/show`"
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
import { mapActions } from 'vuex'
import { evtTypes } from '@/assets/js/smisData'
import { hourOptions, minOptions } from '@/assets/js/dateTimeOption'
import LocationSelect from '@/components/smis/LocationSelect.vue'
import UploadFileAdd from '@/components/UploadFileAdd.vue'
import UploadFileEdit from '@/components/UploadFileEdit.vue'

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
            loadType: [],  // 路段型態
            loadTypeOther: '',  // 路段型態其他內容
            aroundEnv: [],  // 周邊環境
            aroundEnvOther: '',  // 周邊環境其他內容
            fenceEq: false,  // 圍籬
            monitorEq: false,  // 監視設備
            railwayOther: false,  // 鐵路設施設備及圍籬之設置-其他
            railwayOtherText: '',  // 鐵路設施設備及圍籬之設置-其他的內容
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
        },
        evtTypeOpts: evtTypes,  // 事故類型下拉選單
        isExtendAnnex: false,  // 是否延用通報附件
        notify: {  // 危害通報資料
            id: '',  // id
            files: [],  // 附件
            isNew: false,  // 是否為新登錄
        },
    }),
    components: {
        LocationSelect,
        UploadFileAdd,
        UploadFileEdit,
    },
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        }
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 初始化資料
        initData() {
            this.ipt = { ...this.defaultIpt }  // 初始化表單欄位

            if (this.$route.params.id != undefined) {
                // -------------- 編輯時 -------------- 
                this.chLoadingShow()
                this.routeId = this.$route.params.id  // 路由參數(id)
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
            
            } else {
                // -------------- 新增時 -------------- 
                // 若由危害通報新登錄轉至此頁，則指派初始值
                // if (sessionStorage.getItem('notifyItem') !== null) {
                //     let obj = JSON.parse(sessionStorage.getItem('notifyItem'))
                    
                //     this.notify.id = obj.id,  // 通報id
                //     this.notify.files = [ ...obj.files ]  // 通報附件
                //     this.notify.isNew = true  // 是否為危害通報的新登錄
                //     this.ipt.date = obj.date  // 發現日期
                //     this.ipt.hour = obj.hour  // 發現時間(小時)
                //     this.ipt.min = obj.min  // 發現時間(分)
                //     this.ipt.note = obj.content // 備註說明
                //     this.ipt.location = obj.location  // 發現地點
                //     this.ipt.locationK = obj.locationK  // 路線k
                //     this.ipt.locationM = obj.locationM　// 路線m
                //     this.ipt.locationOther = obj.locationOther　// 其他地點
                //     this.isExtendAnnex = true  // 延用通報附件

                //     sessionStorage.removeItem('notifyItem')  // 清除 sessionStorage
                // }

                // demo 用資料
                this.ipt.date = '2017-01-25'  // 發現日期
                this.ipt.hour = '15'  // 發現時間(小時)
                this.ipt.min = '56'  // 發現時間(分)
                this.ipt.location = 'l1'  // 發現地點
                this.ipt.locationK = 20  // 路線k
                this.ipt.locationM = 445　// 路線m
                this.ipt.locationOther = ''　// 其他地點
                this.ipt.evtType = 'M2'  // 事故類型
                this.ipt.eqLoss = 'APC3 車廂轉向架受損'  // 設備受損情形
                this.ipt.serviceShock = '影響列車計2列次'  // 運轉影響情形
                this.ipt.review = '新增行車事故事件本事故事發後，鐵道局於107年3月5日啟動專案調查，並於同月8、9日辦理本事故專案調查簡報討論、文件檢視及現場勘查 。同年5月3日召開本事故專案調查工作會議。最終於同年8月15日召開交通部鐵路行車事故調查小組第24次會議，確認本事故專案調查結果。'  // 檢討過程
                this.ipt.reason = "<直接原因>\n事故路段因氣候易潮濕，加上路基排水狀況不佳 造成該路段有多處噴泥現象， 當鋼軌受列車重壓下沉致軌枕沉 陷、鋼軌產生前後高低不整之現象，在 列車於動態行駛下易致鋼軌單邊下沉產生平面性扭曲，使車輪浮動爬上出軌。\n<間接原因>\n部分路段道碴存有厚度不足加上列車反覆作用下，致使路基土壤細粒料因壓力而循道碴間隙上升， 使路基出現鬆動現象。\n<其他因素>\n有關天候、車輛、人員及運轉等部分，經檢討尚無涉事故原因。"  // 原因分析
                this.ipt.note = '本事故由鐵道局( 鐵路營運監理小組) 及 5位具軌道、力學、車輛及營運等專業之外聘專案委員組成團隊進行專案調查，並由本部鐵路行車事故調查小組 定期委員開會確認調查結果。' // 備註說明
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

            // 新增測試用資料
            setTimeout(() => {
                // 都要順便傳危害通報新登錄 (this.notify.id)、危害通報id (this.notify.id) 欄位給後端
                // 讓後端判斷為新登錄，就更改危害通報的立案狀態，並且順便申請審核
                let txt = (this.isEdit)? '資料更新成功' :  '資料新增成功'
                if (!this.isEdit) this.$router.push({ path: '/smis/car-accident-event' })
                this.chMsgbar({ success: true, msg: txt })
                this.chLoadingShow()
            }, 1000)
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