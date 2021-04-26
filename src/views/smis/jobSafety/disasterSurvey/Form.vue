<template>
<v-container style="max-width: 1200px" class="label-header">
    <h2 class="mb-4 label-title">
        {{ (this.isEdit)? `職災事故事件編輯 (編號：${ id })` : '職業災害事故調查表' }}
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
                <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>身分證
            </h3>
            <v-text-field
                v-model.trim="ipt.idCard"
                solo
                placeholder="請輸入身分證"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>護照號碼
            </h3>
            <v-text-field
                v-model.trim="ipt.passport"
                solo
                placeholder="請輸入護照號碼"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-human-male-female</v-icon>性別
            </h3>
            <v-select
                v-model="ipt.sex"
                :items="['男', '女', '其他']"
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
                <v-icon class="mr-1 mb-1">mdi-school</v-icon>教育程度
            </h3>
            <v-select
                v-model="ipt.education"
                :items="opts.educ"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" md="6">
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
                <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>發生地點(緯度)
            </h3>
            <v-text-field
                v-model.trim="ipt.lat"
                solo
                placeholder="請輸入緯度"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>發生地點(經度)
            </h3>
            <v-text-field
                v-model.trim="ipt.lng"
                solo
                placeholder="請輸入經度"
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
                :items="vehicleLv2opts"
                solo
            ></v-select>
        </v-col>
    </v-row>

    <v-row class="px-2">
        <v-col cols="12" sm="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>直接原因
            </h3>
            <v-textarea
                hide-details
                auto-grow
                solo
                rows="6"
                placeholder="請輸入直接原因"
                v-model.trim="ipt.directReason"
            ></v-textarea>
            <p class="red--text mt-2">* 直接原因：由於某種能量或危害接觸，而使人體受到傷害，例如：跌倒受傷、高處墜落致顱內出血等</p>
        </v-col>

        <!-- <v-col cols="12" sm="6">
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
        </v-col> -->

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>間接原因
            </h3>
            <v-select
                hide-details
                v-model="ipt.indirectReason"
                :items="['不安全行為', '不可抗力', '不安全環境', '其他']"
                solo
            ></v-select>
            <p class="red--text mt-2">* 間接原因：由於不安全行為或不安全環境引起</p>
        </v-col>

        <v-col cols="12" sm="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>基本原因
            </h3>
            <v-textarea
                hide-details
                auto-grow
                solo
                rows="6"
                placeholder="請輸入基本原因"
                v-model.trim="ipt.basicReason"
            ></v-textarea>
            <p class="red--text mt-2">* 基本原因：作業標準流程、設備維護管理、防護措施或安全衛生管理不良等的結果所造成，例如：未依標準作業流程施作、未每日作業前依規定實施檢點等</p>
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
                hide-details
                auto-grow
                solo
                rows="6"
                placeholder="請輸入事故概況"
                v-model.trim="ipt.overview"
            ></v-textarea>
            <p class="red--text mt-2">* 請以人、事、時、地、物方式說明，必要時應附詳圖或照片</p>
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
                hide-details
                auto-grow
                solo
                rows="6"
                placeholder="請輸入事故單位防範及改善對策"
                v-model.trim="ipt.improveStrategy"
            ></v-textarea>
            <p class="red--text mt-2">* 防範及改善對策已列入追蹤管理，請事故單位填寫預定改善完成期限，並於期限內檢附改善佐證資料或照片後，本調查表方能結案</p>
        </v-col>
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>公傷假(起)
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
                        v-model.trim="ipt.injuryLeaveStart"
                        solo
                        v-on="on"
                        readonly
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="purple"
                    v-model="ipt.injuryLeaveStart"
                    @input="dateMemuShow.start = false"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>公傷假(迄)
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
                        v-model.trim="ipt.injuryLeaveEnd"
                        solo
                        v-on="on"
                        readonly
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="purple"
                    v-model="ipt.injuryLeaveEnd"
                    @input="dateMemuShow.end = false"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-phone-forward</v-icon>通報勞檢
            </h3>
            <v-select
                v-model="ipt.laborInspection"
                :items="laborOpts"
                solo
            ></v-select>
        </v-col>
        <v-col cols="12" sm="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>發生原因
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入發生原因"
                v-model.trim="ipt.cause"
            ></v-textarea>
        </v-col>

        <v-col cols="12" sm="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>備註
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入備註"
                v-model.trim="ipt.note"
            ></v-textarea>
        </v-col>
        <!-- 改善措施 -->
        <v-row no-gutters class="mb-8">
            <v-col cols="12" class="mt-8">
                <h3 class="mb-2">
                    <v-icon class="mr-1 mb-1">mdi-pen</v-icon>改善措施
                </h3>
                <v-textarea
                    auto-grow
                    solo
                    rows="6"
                    placeholder="請輸入改善措施摘要"
                    v-model.trim="ipt.improve"
                ></v-textarea>
            </v-col>
        </v-row>

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
                :fileList="showFiles"
                @joinFile="joinFile"
                @rmFile="rmFile"
            />

        </template>

        <v-col cols="12" class="text-center mb-8">
            <v-btn dark class="mr-4 btn-close white--text"
                v-if="isEdit"
                :to="`/smis/jobsafety/disaster-survey/${this.id}/show`"
            >回上層</v-btn>

            <v-btn
                class="btn-add white--text"
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
    <!-- <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >

    </v-form> -->
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
// import { createWorkOrder } from '@/apis/workList/maintain'
import { hourOptions, minOptions } from '@/assets/js/dateTimeOption'
import { dapartOptsBrief } from '@/assets/js/departOption'
import { injurySiteOpts, disasterTypeOpts, vehicleOpts } from '@/assets/js/smisData'
import UploadFileAdd from '@/components/UploadFileAdd.vue'
import UploadFileEdit from '@/components/UploadFileEdit.vue'
import FileListShow from '@/components/FileListShow.vue'
import { createData, detailOne, updateData, fileUpdateData, fileDeleteData } from '@/apis/smis/jobSafety'

export default {
    props: ['id'],  //路由參數
    data: () => ({
        valid: true,  // 表單是否驗證欄位
        isEdit: false,  // 是否編輯中
        evidences: [],  // 改善措施證據
        showFiles: [],  // 要顯示的縮圖
        ipt: {},
        defaultIpt: {
            name: '',  // 罹災者姓名
            idCard: '',  // 身分證
            passport: '',  // 護照號碼
            type: 1,  // 勞工類型
            sex: '男',  // 性別
            old: '',  // 年齡
            workDepart: '嘉義車站',  // 工作部門
            startWorkDate: new Date().toISOString().substr(0, 10),  // 到職日期
            jobTitle: '',  // 職稱
            education: '大學畢業',  // 教育程度
            address: '',  // 住址
            workYear: '',  // 本項工作經驗年數
            trainingDate: '',  // 本項工作訓練日期
            depart: '嘉義車站',  // 發生單位
            occurDate: new Date().toISOString().substr(0, 10),  // 發生日期
            hour: '00',  // 發生時間(時)
            min: '00',  // 發生時間(分)
            weather: '晴',  // 氣候
            location: '',  // 發生地點
            lat: '',  // 發生地點(緯度)
            lng: '',  // 發生地點(經度)
            accidentType: 1,  // 事故類別
            accidentResult: 1,  // 事故結果
            injurySite: 1,  // 傷害部位
            disasterType: 1,  // 災害類型
            vehicleLv1: '',  // 致傷媒介物-第一層
            vehicle: '',  // 致傷媒介物-第二層
            directReason: '',  // 直接原因
            indirectReason: '不安全行為',  // 間接原因
            basicReason: '',  // 基本原因
            workItem: '',  // 傷者當時工作
            overview: '',  // 事故概況
            emergentWork: '',  // 緊急處理情形
            improveStrategy: '',  // 事故單位防範及改善對策
            files: [],  // 附件檔案
            injuryLeaveStart: new Date().toISOString().substr(0, 10),  // 公傷假(起)
            injuryLeaveEnd: new Date().toISOString().substr(0, 10),  // 公傷假(迄)
            laborInspection: 'n',  // 通報勞檢
            cause: '',  // 發生原因
            note: '',  // 備註
            improve: '', // 改善措施
        },
        dateMemuShow: {  // 日曆是否顯示
            start: false,
            end: false,
        },
        laborOpts: [ // 是否有通報勞檢-選單
            { text: '有', value: '有' },
            { text: '無', value: '無' },
        ],
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
            educ: [  // 教育程度
                { text: '小學畢業', value: '小學畢業' },
                { text: '小學肄業', value: '小學肄業' },
                { text: '國中畢業', value: '國中畢業' },
                { text: '國中肄業', value: '國中肄業' },
                { text: '高中畢業', value: '高中畢業' },
                { text: '高中肄業', value: '高中肄業' },
                { text: '專科畢業', value: '專科畢業' },
                { text: '專科肄業', value: '專科肄業' },
                { text: '大學畢業', value: '大學畢業' },
                { text: '大學肄業', value: '大學肄業' },
                { text: '碩士畢業', value: '碩士畢業' },
                { text: '碩士肄業', value: '碩士肄業' },
                { text: '博士畢業', value: '博士畢業' },
                { text: '博士肄業', value: '博士肄業' },
            ],
            accidentType: [  // 事故類別
                { text: '工作傷害事故', value: "工作傷害事故" },
                { text: '工作交通事故', value: "工作交通事故" },
                { text: '上下班交通事故', value: "上下班交通事故" },
                { text: '其他', value: "其他" },
            ],
            accidentResult: [  // 事故結果
                { text: '虛驚事故', value: "虛驚事故" },
                { text: '輕傷', value: "輕傷" },
                { text: '失能傷害', value: "失能傷害" },
                { text: '死亡', value: "死亡" },
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
        FileListShow
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
        vehicleLv2opts() {
            return vehicleOpts[this.ipt.vehicleLv1]
        },
    },
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        },
        // 致傷媒介物-第二層下拉選單
        // 'ipt.vehicleLv1': function(val) {
        //     if (val != '') {
        //         this.opts.vehicle = vehicleOpts[val]
        //         this.ipt.vehicle = this.opts.vehicle[1]  // 因為第1個選項不可用，所以設為第2個
        //     }
        // },
        
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

            if (this.id != undefined) {
                // -------------- 編輯時 -------------- 
                this.chLoadingShow()
                // this.id = this.$route.params.id  // 路由參數(id)
                this.isEdit = true

                detailOne({
                    AccidentCode: this.id,  // 工單編號 (從路由參數抓取)
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        if (res.data.DelStatus == 'T') {  // 若已刪除則轉404頁
                            this.$router.push({ path: '/404' })
                        } else {
                            // res.data.controls = JSON.parse(res.data.order_list)  // 已選控制措施
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

                // 範例效果
                // setTimeout(() => {
                //     let obj = {
                //         workDepart: '阿里山車站',  // 工作部門
                //         name: '王小明',  // 罹災者姓名
                //         idCard: 'S122456789',  // 身分證
                //         passport: 'D88800548',  // 護照號碼
                //         type: 1,  // 勞工類型
                //         sex: '男',  // 性別
                //         old: 34,  // 年齡
                //         startWorkDate: '2003-01-02',  // 到職日期
                //         jobTitle: '維修員',  // 職稱
                //         education: '大學',  // 教育程度
                //         address: '嘉義市東區中山路199號',  // 住址
                //         workYear: 6,  // 本項工作經驗年數
                //         trainingDate: '2003-01-10 ~ 2003-06-15',  // 本項工作訓練日期
                //         depart: '阿里山車站',  // 發生單位
                //         findDate: '2020-08-23',  // 發生日期
                //         findHour: '09',  // 發生日期(時)
                //         findMin: '45',  // 發生日期(分)
                //         location: '工具間',  // 發生地點
                //         lat: '23.444131',  // 發生地點(緯度)
                //         lng: '120.776988',  // 發生地點(經度)
                //         weather: '晴',  // 氣候
                //         accidentType: 1,  // 事故類別
                //         accidentResult: 2,  // 事故結果
                //         injurySite: 9,  // 傷害部位
                //         disasterType: 8,  // 災害類型
                //         vehicleLv1: '動力機械',  // 致傷媒介物-第一層
                //         vehicle: 154,  // 致傷媒介物-第二層
                //         directReason: '直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字',  // 直接原因
                //         indirectReason: '不安全行為',  // 間接原因
                //         basicReason: '基本原因文字基本原因文字基本原因文字基本原因文字基本原因文字基本原因文字基本原因文字',  // 基本原因
                //         workItem: '傷者當時工作文字傷者當時工作文字傷者當時工作文字傷者當時工作文字傷者當時工作文字傷者當時工作文字傷者當時工作文字',  // 傷者當時工作
                //         overview: '事故概況文字事故概況文字事故概況文字事故概況文字事故概況文字事故概況文字事故概況文字事故概況文字',  // 事故概況
                //         emergentWork: '緊急處理情形文字緊急處理情形文字緊急處理情形文字緊急處理情形文字',  // 緊急處理情形
                //         improveStrategy: '事故單位防範及改善對策文字事故單位防範及改善對策文字事故單位防範及改善對策文字事故單位防範及改善對策文字事故單位防範及改善對策文字事故單位防範及改善對策文字',  // 事故單位防範及改善對策
                //         files: [
                //             { fileName: 'ASRC200701.jpg', link: '/demofile/demo.jpg' },
                //             { fileName: 'ASRC200702.jpg', link: '/demofile/demo2.jpg' },
                //             { fileName: '123.pdf', link: '/demofile/123.pdf' },
                //             { fileName: '123.docx', link: '/demofile/123.docx' },
                //             { fileName: '456.xlsx', link: '/demofile/456.xlsx' },
                //         ],
                //     }
                    
                //     this.setInitDate(obj)
                //     this.chLoadingShow()
                // }, 1000
                // )

            } else {
                // -------------- 新增時 -------------- 
                // 若由危害通報新登錄轉至此頁，則指派初始值
                if (sessionStorage.getItem('notifyItem') !== null) {
                    let obj = JSON.parse(sessionStorage.getItem('notifyItem'))
                    this.notify.id = obj.AccidentCode,  // 通報id
                    this.notify.files = [ ...obj.FileCount ]  // 通報附件
                    this.notify.isNew = true  // 是否為危害通報的新登錄
                    this.isExtendAnnex = true  // 延用通報附件

                    sessionStorage.removeItem('notifyItem')  // 清除 sessionStorage
                }
            }
        },
        // 設定資料(編輯時)
        setInitDate(obj) {
            this.ipt.workDepart = obj.PeopleDepart  // 工作部門
            this.ipt.name = obj.HurtPeopleName  // 罹災者姓名
            this.ipt.idCard = obj.HurtPeopleCardID  // 身分證
            this.ipt.passport = obj.HurtPassportID  // 護照號碼
            this.ipt.type = obj.EmployType  //勞工類型
            this.ipt.sex = obj.PeopleSex  // 性別
            this.ipt.old = obj.PeopleAge  // 年齡
            this.ipt.startWorkDate = obj.WorkDate// 到職日期
            this.ipt.jobTitle = obj.JobTitle// 職稱
            this.ipt.education = obj.EduLevel  // 教育程度
            this.ipt.address = obj.PeopleAddress  // 住址
            this.ipt.workYear = obj.WorkExp  // 本項工作經驗年數
            this.ipt.trainingDate = obj.TrainDate  // 本項工作訓練日期
            this.ipt.depart = obj.HappenDepart  // 發生單位
            this.ipt.occurDate = obj.HappenDate  // 發生日期
            this.ipt.hour = obj.HappenDateHr // 發生日期(時)
            this.ipt.min = obj.HappenDateMin  // 發生日期(分)
            this.ipt.location = obj.HappenPlace  // 發生地點
            this.ipt.lat = obj.HappenPlaceLat  // 發生地點(緯度)
            this.ipt.lng = obj.HappenPlaceLong  // 發生地點(經度)
            this.ipt.weather = obj.Weather  // 氣候
            this.ipt.accidentType = obj.AccidentType  // 事故類別
            this.ipt.accidentResult = obj.AccidentResult  // 事故結果
            this.ipt.injurySite = obj.HurtPart  // 傷害部位
            this.ipt.disasterType = obj.DisasterType  // 災害類型
            this.ipt.vehicleLv1 = obj.HurtMediumLv1  // 致傷媒介物-第一層
            this.ipt.vehicle = obj.HurtMediumLv2  // 致傷媒介物-第二層
            this.ipt.directReason = obj.AccidentReason  // 直接原因
            this.ipt.indirectReason = obj.AccidentIndirect  // 間接原因
            this.ipt.basicReason = obj.AccidentBase  // 基本原因
            this.ipt.workItem = obj.HurtWorking  // 傷者當時工作
            this.ipt.overview = obj.AccidentDesp  // 事故概況
            this.ipt.emergentWork = obj.EmergencyStatus  // 緊急處理情形
            this.ipt.improveStrategy = obj.AccidentPolicy  // 事故單位防範及改善對策
            this.ipt.injuryLeaveStart = obj.HurtDateStart // 公傷假(起)
            this.ipt.injuryLeaveEnd = obj.HurtDateEnd // 公傷假(迄)
            this.ipt.laborInspection = obj.NoticeCheck // 通報勞檢
            this.ipt.improve = obj.ProcContent // 發生原因
            this.ipt.cause = obj.HappenReason // 改善措施
            this.ipt.note = obj.Memo // 備註
            this.ipt.files = [ ...obj.FileCount ]  // 附件檔案
        },
        // 送出
        save() {
            if (confirm('你確定要送出嗎?')) {
                this.chLoadingShow()

                // 新增測試用資料
                // setTimeout(() => {
                //     if (this.isEdit) {
                //         this.chMsgbar({ success: true, msg: '資料更新成功' })
                //     } else {
                //         this.$router.push({ path: '/smis/jobsafety/disaster-survey' })
                //         this.chMsgbar({ success: true, msg: '資料新增成功' })
                //     }
                //     this.chLoadingShow()
                // }, 1000)
                if (this.isEdit) {
                // ---------- 編輯時---------- 
                updateData({
                    HappenDepart: this.ipt.depart, //3發生單位
                    HurtPeopleName: this.ipt.name, //4罹災者姓名
                    HurtPeopleCardID: this.ipt.idCard, //身分證
                    HurtPassportID: this.ipt.passport, //護照號碼
                    PeopleAge: this.ipt.old, //5年齡
                    PeopleSex: this.ipt.sex, //6性別
                    PeopleDepart: this.ipt.workDepart, //7工作部門
                    JobTitle: this.ipt.jobTitle, //8職稱
                    PeopleAddress: this.ipt.address, //9住址
                    WorkDate: this.ipt.startWorkDate, //10到職日期
                    WorkExp: this.ipt.workYear, //11參加本項工作經驗年數
                    EduLevel: this.ipt.education, //12教育程度
                    TrainDate: this.ipt.trainingDate, //13本項工作相關訓練日期
                    EmployType: this.ipt.type, //1勞工類型
                    HappenDate: this.ipt.occurDate, //14發生日期(日)
                    HappenDateHr: this.ipt.hour, //15發生日期(時)
                    HappenDateMin: this.ipt.min, //16發生日期(分)
                    Weather: this.ipt.weather, //15氣候
                    HappenPlace: this.ipt.location, //16發生地點
                    HappenPlaceLong: this.ipt.lng, //16發生地點(經度)
                    HappenPlaceLat: this.ipt.lat, //16發生地點(緯度)
                    AccidentType: this.ipt.accidentType, //17事故類別
                    AccidentResult: this.ipt.accidentResult, //18事故結果
                    HurtPart: this.ipt.injurySite, //22傷害部位
                    DisasterType: this.ipt.disasterType, //23災害類型
                    HurtMediumLv1: this.ipt.vehicleLv1, //24致傷媒介物
                    HurtMediumLv2: this.ipt.vehicle, //致傷媒介物 第二層
                    AccidentReason: this.ipt.directReason, //19直接原因
                    AccidentIndirect: this.ipt.indirectReason, //20間接原因
                    AccidentBase: this.ipt.basicReason, //21基本原因
                    HurtWorking: this.ipt.workItem, //25傷者當時工作
                    AccidentDesp: this.ipt.overview, //26事故概況
                    EmergencyStatus: this.ipt.emergentWork, //27緊急處理情形
                    AccidentPolicy: this.ipt.improveStrategy, //28事故單位防範及改善對策
                    HurtDateStart: this.ipt.injuryLeaveStart, // 公傷假(起)
                    HurtDateEnd: this.ipt.injuryLeaveEnd, // 公傷假(迄)
                    NoticeCheck: this.ipt.laborInspection, // 通報勞檢
                    ProcContent: this.ipt.improve, // 發生原因
                    HappenReason: this.ipt.cause, // 改善措施
                    Memo: this.ipt.note, // 備註
                    FileCount: this.evidences,
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                    AccidentCode: this.id,
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
                    HappenDepart: this.ipt.depart, //3發生單位
                    HurtPeopleName: this.ipt.name, //4罹災者姓名
                    HurtPeopleCardID: this.ipt.idCard, //身分證
                    HurtPassportID: this.ipt.passport, //護照號碼
                    PeopleAge: this.ipt.old, //5年齡
                    PeopleSex: this.ipt.sex, //6性別
                    PeopleDepart: this.ipt.workDepart, //7工作部門
                    JobTitle: this.ipt.jobTitle, //8職稱
                    PeopleAddress: this.ipt.address, //9住址
                    WorkDate: this.ipt.startWorkDate, //10到職日期
                    WorkExp: this.ipt.workYear, //11參加本項工作經驗年數
                    EduLevel: this.ipt.education, //12教育程度
                    TrainDate: this.ipt.trainingDate, //13本項工作相關訓練日期
                    EmployType: this.ipt.type, //1勞工類型
                    HappenDate: this.ipt.occurDate, //14發生日期(日)
                    HappenDateHr: this.ipt.hour, //15發生日期(時)
                    HappenDateMin: this.ipt.min, //16發生日期(分)
                    Weather: this.ipt.weather, //15氣候
                    HappenPlace: this.ipt.location, //16發生地點
                    HappenPlaceLong: this.ipt.lng, //16發生地點(經度)
                    HappenPlaceLat: this.ipt.lat, //16發生地點(緯度)
                    AccidentType: this.ipt.accidentType, //17事故類別
                    AccidentResult: this.ipt.accidentResult, //18事故結果
                    HurtPart: this.ipt.injurySite, //22傷害部位
                    DisasterType: this.ipt.disasterType, //23災害類型
                    HurtMediumLv1: this.ipt.vehicleLv1, //24致傷媒介物
                    HurtMediumLv2: this.ipt.vehicle, //致傷媒介物 第二層
                    AccidentReason: this.ipt.directReason, //19直接原因
                    AccidentIndirect: this.ipt.indirectReason, //20間接原因
                    AccidentBase: this.ipt.basicReason, //21基本原因
                    HurtWorking: this.ipt.workItem, //25傷者當時工作
                    AccidentDesp: this.ipt.overview, //26事故概況
                    EmergencyStatus: this.ipt.emergentWork, //27緊急處理情形
                    AccidentPolicy: this.ipt.improveStrategy, //28事故單位防範及改善對策
                    HurtDateStart: this.ipt.injuryLeaveStart, // 公傷假(起)
                    HurtDateEnd: this.ipt.injuryLeaveEnd, // 公傷假(迄)
                    NoticeCheck: this.ipt.laborInspection, // 通報勞檢
                    ProcContent: this.ipt.improve, // 發生原因
                    HappenReason: this.ipt.cause, // 改善措施
                    Memo: this.ipt.note, // 備註
                    FileCount: this.evidences,
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '新增成功' })
                        this.ipt = { ...this.defaultIpt }  // 初始化新增表單
                        this.ipt.controlChoose = [ ...[]]
                        this.tableItems = [ ...[]]
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
            }
        },
        // 加入要上傳的檔案 (新增時)
        // joinFile(file) {
        //     this.ipt.files.push(file)
        // },
        joinFile(obj, bool) {
            if (bool) {
                this.evidences.push(obj)  // 加入要上傳後端的檔案
            } else {
                this.showFiles.push(obj)  // 加入要顯示的縮圖
            }
        },
        // 刪除要上傳的檔案 (新增時)
        // rmFile(idx) {
        //     this.ipt.files.splice(idx, 1)
        // },
        rmFile(idx) {
            this.showFiles.splice(idx, 1)
            this.evidences.splice(idx, 1)
        },
        // 上傳檔案 (編輯時)
        uploadFile(fileArr) {
            this.chLoadingShow()

            fileUpdateData({
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
                this.chLoadingShow() // fileDeleteData

                fileDeleteData({
                    AccidentCode: this.id,  // 編號
                    FileName: this.ipt.files[idx].FileName,  // 檔案名稱
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