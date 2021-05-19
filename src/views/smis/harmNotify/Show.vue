<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">通報編號：{{ id }}</h2>

    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8 mb-4">
        <BottomTable :items="bottomItems" />
    </v-row>

    <!-- 檔案列表 -->
    <FileListShow :fileList="files" title="檔案列表" />
    
    <v-row class="mt-8 mb-4 label-header" >
        <v-col cols="12" v-if="isShowBtn">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-message-processing</v-icon>回覆處理
            </h3>
            
            <p v-if="status > 1" class="mt-4">
                <span class="font-weight-bold">已回覆通報人：</span>
                <span class="error--text">{{ replayMsg }}</span>
            </p>

            <v-sheet elevation="2" class="px-3 mb-5 pt-2" v-else>
                <v-radio-group hide-details v-model="ipt.reply" class="py-3 ma-0">
                    <v-radio
                        v-for="item in replyRadios"
                        color="green"
                        class="mb-2"
                        :label="item"
                        :value="item"
                        :key="item"
                    ></v-radio>
                </v-radio-group>

                <v-text-field
                    v-model.trim="ipt.replyOther"
                    solo
                    label="請輸入自訂回覆訊息"
                    :disabled="ipt.reply != '自訂訊息'"
                ></v-text-field>
            </v-sheet>
        </v-col>
				

        <v-col cols="12" class="text-center" v-if="status == 1">
						<v-btn dark class="mr-4 btn-close"
                @click="closeWindow"
            >關閉視窗</v-btn>
						
            <v-btn dark class="btn-add"
                @click="sendReplay" v-if="isShowBtn"
            >送出回覆</v-btn>
        </v-col>
    </v-row>

    <v-divider class="mb-3"></v-divider>

    <!-- 立案處理 -->
    <v-row class="mb-12 label-header">
        <!-- <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-database-plus</v-icon>立案處理
        </h3>
        
        <v-sheet elevation="2" class="mb-5 py-3 px-4">
            <p class="error--text mb-0">請點選要如何處理：</p>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-btn color="indigo" dark block large
                        @click="addCarEvt"
                    >
                        新登錄至行車事故事件紀錄
                    </v-btn>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-btn color="indigo" dark block large
                        @click="connCarEvt"
                    >
                        連結至已登錄行車事故事件紀錄
                    </v-btn>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-btn color="indigo" dark block large
                        @click="addCarHarm"
                    >
                        新登錄至行車危害
                    </v-btn>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-btn color="indigo" dark block large
                        @click="connCarHarm"
                    >
                        連結至已登錄行車危害
                    </v-btn>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-btn color="indigo" dark block large
                        @click="addJobEvt"
                    >
                        新登錄至職災事故紀錄
                    </v-btn>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-btn color="indigo" dark block large
                        @click="connJobEvt"
                    >
                        連結至已登錄職災事故紀錄
                    </v-btn>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-btn color="indigo" dark block large
                        to="/smis/jobsafety/disasterdb/add"
                    >
                        新登錄至職災危害
                    </v-btn>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-btn color="indigo" dark block large
                        @click="connJobHarm"
                    >
                        連結至已登錄職災危害
                    </v-btn>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-btn color="indigo" dark block large
                        @click="noAction"
                    >
                        不予處理
                    </v-btn>
                </v-col>

                <v-col cols="12" sm="6" align-self="center"
                    v-if="caseMsg != ''"
                >
                    <v-icon class="mb-2 mr-1">mdi-lightbulb-on</v-icon> 
                    <span>{{ caseMsg }}</span>
                </v-col>

                <v-col cols="12" v-if="noActionShow">
                    <v-text-field
                        v-model.trim="noActionReason"
                        solo
                        label="請輸入不予處理的原因"
                        hide-details
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-sheet> -->

        <v-col cols="12" sm="4" md="3" v-if="(status == 2) && isShowBtn">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>以行安立案
            </h3>
            <v-select
                v-model="carSafeType"
                :items="carSafeTypeOpt"
                @change="selector1Changed"
                @click="click1"
                solo
            ></v-select>
            <p class="red--text mt-n6">{{ pick1 }}</p>
        </v-col>

        <v-col cols="12" sm="4" md="3" v-if="(status == 2) && isShowBtn">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>以職安立案
            </h3>
            <v-select
                v-model="jobSafeType"
                :items="jobSafeTypeOpt"
                @change="selector2Changed"
                solo
            ></v-select>
            <p class="red--text mt-n6">{{ pick2 }}</p>
        </v-col>

        <v-col cols="12" sm="4" md="3" align-self="end" v-if="jobSafeType == 'C'">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>職業危害編號
            </h3>
            <v-text-field
                v-model.trim="ipt.code1"
                placeholder="請輸入 2 碼，例：01"
                maxlength="2" solo
            ></v-text-field>
            <p class="red--text mt-n6">* 作業名稱、設備或區域代碼</p>
        </v-col>

        <v-col cols="12" sm="4" md="3" align-self="end" v-if="jobSafeType == 'C'">
            <v-text-field
                v-model.trim="ipt.code2"
                placeholder="請輸入 2 碼，例：01"
                maxlength="2" solo
            ></v-text-field>
            <p class="red--text mt-n6">* 操作工作內容流水號</p>
        </v-col>

        <!-- 既有行安事故 -->
       <v-col cols="12" v-if="shwoPick1_1Form">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-bookmark-check</v-icon>既有行車事件事故列表
            </h3>
            <v-card>
                <v-data-table
                    :headers="headers1_1"
                    :items="tableItems"
                    :options.sync="pageOpt"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                    class="theme-table"
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:loading>
                        <span class="red--text subtitle-1">資料讀取中...</span>
                    </template>

                    <template v-slot:item.location="{ item }">
                        {{ locationOpts.find(ele => ele.value == item.FindLine).text }}
                        {{ (item.FindLine == 'other')? `(${item.FindLineOther})` : '' }}
                        {{ (['l1', 'l2', 'l3', 'l4'].includes(item.FindLine))? `(${item.LineK}K+${item.LineM}M)` : '' }}
                    </template>
                    
                    <template v-slot:item.type="{ item }">
                        {{ evtTypeOpts.find(ele => ele.value == item.AccidentType).text }}
                    </template>

                    <template v-slot:item.hurtPeople="{ item }">
                        {{ (item.HurtPeopleCount == 'F')? '未填寫' : item.hurt_people_count }}
                    </template>

                    <template v-slot:item.status="{ item }">
                        {{ accidentEventStatus.find(ele => ele.value == item.AccidentStatus).text }}
                    </template>

                    <template v-slot:item.content="{ item }">
                        <v-btn small dark fab class="btn-deatil"
                            @click="pick1Event(item)"
                        >
                            <v-icon dark>mdi-gesture-tap</v-icon>
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

        <!-- 既有行安危害 -->
        <v-col cols="12" class="mt-8" v-if="shwoPick1_2Form">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-bookmark-check</v-icon>既有行車危害列表
            </h3>
            <v-card>
                <v-data-table
                    :headers="headers1_2"
                    :items="tableItems"
                    :options.sync="pageOpt"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                    class="theme-table"
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:loading>
                        <span class="red--text subtitle-1">資料讀取中...</span>
                    </template>

                    <template v-slot:item.mode="{ item }">
                        <span>{{ opts1_2.mode.find(ele => ele.value == item.OperationMode).text }}</span>
                    </template>

                    <template v-slot:item.serious="{ item }">
                        <span>{{ opts1_2.serious.find(ele => ele.value == item.RiskSerious).text }}</span>
                    </template>

                    <template v-slot:item.frequency="{ item }">
                        <span>{{ opts1_2.frequency.find(ele => ele.value == item.RiskFreq).text }}</span>
                    </template>

                    <template v-slot:item.level="{ item }">
                        <span>{{ opts1_2.riskLevel.find(ele => ele.value == item.RiskLevel).text }}</span>
                    </template>
                    
                    <template v-slot:item.status="{ item }">
                        <span>{{ opts1_2.status.find(ele => ele.value == item.EndangerStatus).text }}</span>
                    </template>

                    <!-- headers 的 content 欄位 (檢視內容) -->
                    <template v-slot:item.content="{ item }">
                        <v-btn small dark fab class="btn-detail"
                            @click="pick1Event(item)"
                        >
                            <v-icon dark>mdi-gesture-tap</v-icon>
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

        <!-- 既有職災事件事故 -->
         <v-col cols="12" class="mt-8" v-if="shwoPick2_1Form">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-bookmark-check</v-icon>既有職災事件列表
            </h3>
            <v-card>
                <v-data-table
                    :headers="headers2_1"
                    :items="tableItems"
                    :options.sync="pageOpt"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                    class="theme-table"
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:loading>
                        <span class="red--text subtitle-1">資料讀取中...</span>
                    </template>

                    <!-- <template v-slot:item.status="{ item }">
                        {{ transferStatusText(item.status) }}
                    </template> -->

                    <template v-slot:item.status="{ item }">
                        <span>{{ opts.status.find(ele => ele.value == item.AccidentStatus).text }}</span>
                    </template>

                    <template v-slot:item.content="{ item }">
                        <v-btn small dark fab class="btn-detail"
                            @click="pick2Event(item)"
                        >
                            <v-icon dark>mdi-gesture-tap</v-icon>
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

        <!-- 既有職災危害 -->
        <v-col cols="12" class="mt-8" v-if="shwoPick2_2Form">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-bookmark-check</v-icon>既有職災危害列表
            </h3>
            <v-card>
                <v-data-table
                    :headers="headers2_2"
                    :items="tableItems"
                    :options.sync="pageOpt"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                    class="theme-table"
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:loading>
                        <span class="red--text subtitle-1">資料讀取中...</span>
                    </template>codes

                    <template v-slot:item.codes="{ item }">
                        {{ item.code1 }}-{{ item.code2 }}-{{ item.code3 }}
                    </template>

                    <template v-slot:item.serious="{ item }">
                        {{ transferSeriousText(item.serious) }}
                    </template>

                    <template v-slot:item.possibility="{ item }">
                        {{ transferPossibilityText(item.possibility) }}
                    </template>

                    <template v-slot:item.level="{ item }">
                        {{ transferLevelText(item.level) }}
                    </template>

                    <template v-slot:item.content="{ item }">
                        <v-btn small dark fab class="btn-detail"
                            @click="pick2Event(item)"
                        >
                            <v-icon dark>mdi-gesture-tap</v-icon>
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

        

        <v-col cols="12" class="text-center mt-8" v-if="status == 2">
            <v-btn dark class="mr-4 btn-close"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done">
                <v-btn dark class="mr-4 btn-delete" v-if="isShowBtn"
                    @click="pressSave(true)"
                >不立案</v-btn>

                <v-btn dark class="btn-add" v-if="isShowBtn"
                    @click="pressSave(false)"
                >確定立案</v-btn>
            </template>
        </v-col>
    </v-row>

    

    <!-- dialog - 行車事故事件 -->
    <!-- <NotifyEvtDialog
        :id="id"
        :dialogShow="dialogShow.carEvt"
        :headers="headers.carEvt"
        :items="dialogTableItems.carEvt"
        dialog="carEvt"
        @closeShow="dialogShow.carEvt = false"
        @connect="connect"
    /> -->

    <!-- dialog - 行車危害 -->
    <!-- <NotifyHarmDialog
        :id="id"
        :dialogShow="dialogShow.carHarm"
        :headers="headers.carHarm"
        dialog="carHarm"
        @closeShow="dialogShow.carHarm = false"
        @connect="connect"
    /> -->

    <!-- dialog - 職災事故 -->
    <!-- <NotifyEvtDialog
        :id="id"
        :dialogShow="dialogShow.jobEvt"
        :headers="headers.jobEvt"
        :items="dialogTableItems.jobEvt"
        dialog="jobEvt"
        @closeShow="dialogShow.jobEvt = false"
        @connect="connect"
    /> -->

    <!-- dialog - 職災危害 -->
    <!-- <NotifyHarmDialog
        :id="id"
        :dialogShow="dialogShow.jobHarm"
        :headers="headers.jobHarm"
        dialog="jobHarm"
        @closeShow="dialogShow.jobHarm = false"
        @connect="connect"
    /> -->
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { canInUpdate } from '@/apis/access'
import { getNowFullTime } from '@/assets/js/commonFun'
import { carAccidentEventStatus, jobDisasterSurveyStatus, carHarmDbStatus, operateModes, riskSerious, riskFrequency, riskLevel, arAccidentEventStatus, evtTypes, locationOpts } from '@/assets/js/smisData'
import TopBasicTable from '@/components/TopBasicTable.vue'
import BottomTable from '@/components/BottomTable.vue'
import FileListShow from '@/components/FileListShow.vue'
import { replyNotify, recordNotify } from '@/apis/smis/harmNotify'
import Pagination from '@/components/Pagination.vue'
import { searchData, searchDataDb } from '@/apis/smis/jobSafety'
import { dapartOptsBrief } from '@/assets/js/departOption'
import { fetchList as fetchListDb } from '@/apis/smis/carHarmDatabase/harms'
import { fetchList as fetchListEvent } from '@/apis/smis/carAccidentEvent'
// import NotifyEvtDialog from '@/components/smis/NotifyEvtDialog.vue'
// import NotifyHarmDialog from '@/components/smis/NotifyHarmDialog.vue'
// import { carEventItems, jobEventItems } from '@/assets/js/smisTestData'

export default {
    props: ['itemData'],
    data: () => ({
        id: '',  // 危害通報編號
        isShowBtn: false,
        done: false,  // 是否完成頁面操作
        NoRecord: 'F',
        status: '',  // 狀態
        pick1: '', // 既有行安事故編號
        pick2: '', // 既有行安事故編號
        pick1_2: '', // 既有行安危害編號
        pick2_1: '', // 既有職災事故編號
        pick2_2: '', // 既有職安危害編號
        shwoPick1_1Form: false, // 顯示既有行安事故表格
        shwoPick1_2Form: false, // 顯示既有行安事故表格
        shwoPick2_1Form: false, // 顯示既有行安事故表格
        shwoPick2_2Form: false, // 顯示既有行安事故表格
        shwoPick2_3Form: false, // 顯示既有行安事故表格
        replayMsg: '',  // 回覆的訊息
        // cacheData: {},  // 暫存資料 (sessionStorage 會取用)
        topItems: [],  // 上面的欄位
        bottomItems: [],  // 下面的欄位
        files: [],  // 檔案附件
        ipt: {
            code1: '',
            code2: '',
            code3: '',
            reply: '感謝通報，已通知相關單位處理',  // 回覆處理
            replyOther: '',  // 回覆處理-自訂訊息
            // caseChose: '',  // 立案處理選擇的方式
        },
        accidentEventStatus: carAccidentEventStatus,  // 表格顯示的行車事故事件狀態
        evtTypeOpts: evtTypes,  // 事故類型
        locationOpts: locationOpts,  // 事故發生地點
        replyRadios: [
            '感謝通報，已通知相關單位處理',
            '感謝通報，已採「危害」立案管理之',
            '感謝通報，已採「事故/事件」立案',
            '自訂訊息',
        ],
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers1_1: [  // 表格顯示的欄位
            { text: '編號', value: 'AccidentCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 150 },
            { text: '發生日期', value: 'convert_findDate', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 120 },
            { text: '發生地點', value: 'location', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 160 },
            { text: '事故類型', value: 'type', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 220 },
            { text: '傷亡人數', value: 'hurtPeople', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
            { text: '事故事件狀態', value: 'status', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 140 },
            { text: '選用', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
        ],
        headers1_2: [  // 表格顯示的欄位
            { text: '編號', value: 'EndangerCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 150 },
            { text: '營運模式', value: 'mode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
            { text: '風險嚴重性', value: 'serious', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 120 },
            { text: '風險頻率', value: 'frequency', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 120 },
            { text: '風險等級', value: 'level', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 150 },
            { text: '狀態', value: 'status', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
            { text: '選用', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
        ],
        headers2_1: [  // 表格顯示的欄位
            { text: '編號', value: 'AccidentCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '發生部門', value: 'HappenDepart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '罹災者姓名', value: 'HurtPeopleName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '發生日期', value: 'HappenDate', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '狀態', value: 'status', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '選用', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        ],
        headers2_2: [  // 表格顯示的欄位
             { text: '編號', value: 'EndangerCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '作業名稱', value: 'JobName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '風險嚴重性', value: 'EndangerLevel', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '風險可能性', value: 'EndangerProb', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '風險等級', value: 'RiskLevel', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '選用', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        ],
        opts: {
            depart: dapartOptsBrief,  // 部門
            status: [  // 事故事件狀態 (審核中有二個，故傳中文值讓後端判斷)
                { text: '不限', value: '' },
                ...jobDisasterSurveyStatus,
                { text: '已作廢', value: '已作廢' },
                // { text: '已立案', value: '已立案' },
                // { text: '已完備資料', value: '已完備資料' },
                // { text: '改善措施已落實', value: '改善措施已落實' },
                // { text: '審核中', value: '審核中' },
            ],
        },
        opts1_2: {
            status: carHarmDbStatus,  // 狀態
            mode: operateModes, // 營運模式
            serious: riskSerious, // 風險嚴重性
            frequency: riskFrequency, // 風險頻率
            riskLevel: riskLevel,  // 風險等級
        },
        
        // dialogShow: {  // dialog 是否顯示
        //     carEvt: false,  // 行車事故事件
        //     carHarm: false,  // 行車危害
        //     jobEvt: false,  // 職災事故事件
        //     jobHarm: false,  // 職災危害
        // },
        // connData: {  // 連結資料
        //     id: '',  // 編號
        //     model: '',  // 模組名稱
        // },
        // caseMsg: '',  // 立案處理題示字
        // dialogTableItems: {  // dialog 表格資料
        //     carEvt: [],  // 行車事故事件
        //     carHarm: [],  // 行車危害
        //     jobEvt: [],  // 職災事故事件
        //     jobHarm: [],  // 職災危害
        // },
        // headers: {  // dialog 表格顯示的標題欄位
        //     carEvt: [
        //         { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '發生日期', value: 'date', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '發生地點', value: 'location', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '事故類型', value: 'evtType', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '死傷人數', value: 'deathCount', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '設備受損情形', value: 'eqLoss', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '運轉影響情形', value: 'serviceShock', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '連結資料', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //     ],
        //     carHarm: [
        //         { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '危害說明', value: 'caption', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '直接原因', value: 'reason', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '衍生事故', value: 'deriveEvt', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '營運模式', value: 'serviceMode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '風險等級', value: 'level', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '連結資料', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //     ],
        //     jobEvt: [
        //         { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '發生日期', value: 'date', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '勞工類型', value: 'memberType', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '姓名', value: 'name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '發生地點', value: 'location', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '事故類別', value: 'evtType', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '災害類型', value: 'harmType', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '事故結果', value: 'result', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '連結資料', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //     ],
        //     jobHarm: [
        //         { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '作業名稱', value: 'name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '工作內容', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '作業環境', value: 'env', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '工具設備', value: 'tools', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '危害類型', value: 'harmType', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '風險嚴重性', value: 'riskSerious', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '風險等級', value: 'riskLevel', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //         { text: '連結資料', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        //     ],
        // },
        // noActionShow: false,  // 不予處理原因欄位是否顯示
        // noActionReason: '',  // 不予處理原因
        carSafeType: '',  // 行安
        jobSafeType: '',  // 職安
        carSafeTypeOpt: [  // 行安下拉選單
            { text: '不選擇', value: '' }, 
            { text: '新增行安事故', value: 'A' }, 
            { text: '既有行安事故', value: 'B' }, 
            { text: '新增行安危害', value: 'C' }, 
            { text: '既有行安危害', value: 'D' }, 
        ],
        jobSafeTypeOpt: [  // 職安下拉選單
            { text: '不選擇', value: '' }, 
            { text: '新增職災事故', value: 'A' }, 
            { text: '既有職災事故', value: 'B' }, 
            { text: '新增職安危害', value: 'C' }, 
            { text: '既有職安危害', value: 'D' }, 
        ],
    }),
    components: {
        TopBasicTable,
        BottomTable,
        FileListShow,
        Pagination
        // NotifyEvtDialog,
        // NotifyHarmDialog,
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
            groupData: state => state.groupData,
        }),
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'closeWindow',  // 關閉視窗
        ]),
        ...mapActions('user', [
            'saveUserGroup',  // 儲存使用者權限(群組)資料
        ]),
        click1(){
        },
        selector1Changed(){
            this.shwoPick1_1Form = this.shwoPick1_2Form = this.shwoPick2_1Form = this.shwoPick2_3Form = this.shwoPick2_2Form = false
            if(this.pick2 == '' && this.ipt.code1 == '' && this.ipt.code2 == ''){
                this.jobSafeType = '';
            }
            switch(this.carSafeType){
                case 'B': // 以行安立案 選擇 既有行安事故
                    this.shwoPick1_1Form = true;
                    this.chLoadingShow()
                    fetchListEvent({
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                        KeyName: 'SMS_AccidentEventData',  // DB table
                        KeyItem: [
                            // { tableColumn: 'CreateDTime_Start', columnValue: this.ipt.dateStart },  // 發生日期(起)
                            // { tableColumn: 'CreateDTime_End', columnValue: this.ipt.dateEnd },  // 發生日期(迄)
                        ],
                        QyName: [    // 欲回傳的欄位資料
                            // 'AccidentCode',
                            // 'AccidentFindDate',
                            // 'FindLine',
                            // 'LineK',
                            // 'LineM',
                            // 'FindLineOther',
                            // 'AccidentType',
                            // 'HurtPeopleCount',
                            // 'AccidentStatus',
                            // 'DelStatus',
                            // 'CancelStatus',
                        ],
                    }).then(res => {
                        this.tableItems = JSON.parse(res.data.order_list)
                    }).catch(err => {
                        console.log(err)
                        alert('查詢時發生問題，請重新查詢!')
                    }).finally(() => {
                        this.chLoadingShow()
                    })
                    break;
                case 'D': // 以行安立案 選擇 既有行安危害
                    this.shwoPick1_2Form = true;
                    this.chLoadingShow()
                    fetchListDb({
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                        KeyName: 'SMS_EndangerData',  // DB table
                        KeyItem: [
                            // { tableColumn: 'DeviceDepart', columnValue: this.controlSearch.depart },  // 管控單位
                            // { tableColumn: 'DeviceTitle', columnValue: this.controlSearch.subject },  // 措施簡述
                        ],
                        QyName: [    // 欲回傳的欄位資料
                            // 'EndangerCode',
                            // 'EndangerStatus',
                            // 'OperationMode',
                            // 'RiskSerious',
                            // 'RiskFreq',
                            // 'RiskLevel',
                            // 'DelStatus',
                            // 'CancelStatus',
                            // 'InsertDTime',
                        ],
                    }).then(res => {
                        this.tableItems = JSON.parse(res.data.order_list)
                    }).catch(err => {
                        console.log(err)
                        alert('查詢時發生問題，請重新查詢!')
                    }).finally(() => {
                        this.chLoadingShow()
                    })
                    break;
                default:
                    this.pick1 = "";
                    break;
            }
        },
        selector2Changed(){
            this.shwoPick1_1Form = this.shwoPick1_2Form = this.shwoPick2_1Form = this.shwoPick2_3Form = this.shwoPick2_2Form = false
            if(this.pick1 == ''){
                this.carSafeType = '';
            }
            switch(this.jobSafeType){
                case 'B': // 以職安立案 選擇 既有職災事故
                    this.shwoPick2_1Form = true;
                    this.ipt.code1 = this.ipt.code2 = '';
                    this.chLoadingShow()
                    
                    searchData({
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                        KeyName: 'SMS_JobAccidentSurvey',  // DB table
                        KeyItem: [
                            // { tableColumn: 'DeviceDepart', columnValue: this.controlSearch.depart },  // 管控單位
                            // { tableColumn: 'DeviceTitle', columnValue: this.controlSearch.subject },  // 措施簡述
                        ],
                        QyName: [    // 欲回傳的欄位資料
                            // 'EndangerCode',
                            // 'EndangerStatus',
                            // 'OperationMode',
                            // 'RiskSerious',
                            // 'RiskFreq',
                            // 'RiskLevel',
                            // 'DelStatus',
                            // 'CancelStatus',
                            // 'InsertDTime',
                        ],
                    }).then(res => {
                        this.tableItems = JSON.parse(res.data.order_list)
                    }).catch(err => {
                        console.log(err)
                        alert('查詢時發生問題，請重新查詢!')
                    }).finally(() => {
                        this.chLoadingShow()
                    })
                    break;
                case 'C': // 以職安立案 選擇 新增職災事故
                    this.pick2 = "";
                    // this.shwoPick2_3Form = true


                    break;
                case 'D': // 以職安立案 選擇 既有職災危害
                    this.shwoPick2_2Form = true;
                    this.ipt.code1 = this.ipt.code2 = '';
                    this.chLoadingShow()
                    
                    searchDataDb({
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                        KeyName: 'SMS_JobAccidentData',  // DB table
                        KeyItem: [
                            // { tableColumn: 'DeviceDepart', columnValue: this.controlSearch.depart },  // 管控單位
                            // { tableColumn: 'DeviceTitle', columnValue: this.controlSearch.subject },  // 措施簡述
                        ],
                        QyName: [    // 欲回傳的欄位資料
                            // 'EndangerCode',
                            // 'EndangerStatus',
                            // 'OperationMode',
                            // 'RiskSerious',
                            // 'RiskFreq',
                            // 'RiskLevel',
                            // 'DelStatus',
                            // 'CancelStatus',
                            // 'InsertDTime',
                        ],
                    }).then(res => {
                        this.tableItems = JSON.parse(res.data.order_list)
                    }).catch(err => {
                        console.log(err)
                        alert('查詢時發生問題，請重新查詢!')
                    }).finally(() => {
                        this.chLoadingShow()
                    })
                    break;
                default:
                    this.ipt.code1 = this.ipt.code2 = '';
                    this.pick2 = "";
                    break;
            }
        },
        // 初始化資料
        setShowData(obj) {
						console.log("👻 obj: ", obj);
            this.status = obj.ReportStatus  // 狀態(用來判斷是否已回覆通報人)
            this.id = obj.EndangerID  // 危害通報編號
            this.topItems = obj.topItems  // 上面的欄位資料
            this.bottomItems = obj.bottomItems  // 下面的欄位資料
            this.files = [ ...obj.FileCount ]  // 檔案附件
            this.replayMsg = obj.ReplyMsg  // 回覆訊息

            canInUpdate({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    console.log("🦋 res.data.GroupData", res.data.GroupData);
                    console.log("🦋🦋 (brfore)groupData: ", this.groupData);
                    this.saveUserGroup(res.data.GroupData)
                    console.log("🦋🦋🦋 (after))groupData: ", this.groupData);
                    this.isShowBtn = this.groupData.RoleLv2 == "T" || this.groupData.RoleLv3 == "T"
                }
            }).catch( err => {
                console.log(err)
            }).finally(() => {
            })

            
        },
        // 連結行車事故事件
        // connCarEvt() {
        //     this.noActionShow = false  // 關閉不予處理原因欄位
        //     this.chLoadingShow()

        //     // 向後端請求資料
        //     setTimeout(() => {
        //         this.dialogTableItems.carEvt = [ ...carEventItems ]
        //         this.dialogShow.carEvt = true
        //         this.chLoadingShow()
        //     }, 1000)
        // },
        // 連結行車危害
        // connCarHarm() {
        //     this.noActionShow = false  // 關閉不予處理原因欄位
        //     this.dialogShow.carHarm = true
        // },
        // 連結職災事故
        // connJobEvt() {
        //     this.noActionShow = false  // 關閉不予處理原因欄位
        //     this.chLoadingShow()

        //     // 向後端請求資料
        //     setTimeout(() => {
        //         this.dialogTableItems.jobEvt = [ ...jobEventItems ]
        //         this.dialogShow.jobEvt = true
        //         this.chLoadingShow()
        //     }, 1000)
        // },
        // 連結職災危害
        // connJobHarm() {
        //     this.noActionShow = false  // 關閉不予處理原因欄位
        //     this.dialogShow.jobHarm = true
        // },
        // 確認連結 (接收子組件傳來的資料)
        // connect(id, model) {
        //     let modelName = ''
        //     this.cacheData.id = id
        //     this.dialogShow[model] = false  // 關閉 dialog
            
        //     switch(model) {
        //         case 'carEvt':
        //             modelName = '行車事故事件'
        //             this.ipt.caseChose = 2
        //             break;
        //         case 'carHarm':
        //             modelName = '行車危害'
        //             this.ipt.caseChose = 4
        //             break;
        //         case 'jobEvt':
        //             modelName = '職災事故'
        //             this.ipt.caseChose = 6
        //             break;
        //         case 'jobHarm':
        //             modelName = '職災危害'
        //             this.ipt.caseChose = 8
        //             break;
        //         default:
        //             break;
        //     }
        //     this.caseMsg = `你選擇連結「${modelName}」，編號 ${id}`
        // },
        // 立案處理-不予處理
        // noAction() {
        //     this.ipt.caseChose = 9
        //     this.caseMsg = '你選擇「不予處理」'
        //     this.noActionShow = true
        // },
        // 送出回覆
        sendReplay() {
            if (confirm('送出後無法再修改內容，你確定要送出回覆嗎?')) {
                this.chLoadingShow()
                this.replayMsg = (this.ipt.reply == '自訂訊息')? this.ipt.replyOther : this.ipt.reply
                
                replyNotify({
                    EndangerID: this.id,  // 危害通報編號
                    ReplyMsg: this.replayMsg,  // 回覆訊息
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '回覆成功'})
                        this.status = '2'  // 狀態改為已回覆
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                     this.chMsgbar({ success: false, msg: '回覆成功'})
                }).finally(() => {
                    this.chLoadingShow()
                })
            }
        },
        pressSave(IsNoRecord){
            if(this.jobSafeType == 'C'){
                if((this.ipt.code1.length + this.ipt.code2.length) < 4){
                    alert("職業危害編號不完整")
                    return
                }
            }
            this.NoRecord = (IsNoRecord)?'T':'F';
            this.save();
        },
        // 確定立案(用在立案處理是連結跟不予處理的情況)
        save() {
            // if (!this.replay.replied) {
            //     alert('請先完成回覆處理!')
            //     return
            // }
            let askMsg = (this.NoRecord == 'F')?'你確定要立案嗎?':'你確定要不立案嗎?';
            if (confirm(askMsg)) {

                this.chLoadingShow()

                // 判斷行安、職安的立案類型及種類 (依下拉選單所選的值判斷，不選擇就維持空值)
                let carType = ''  // 行安立案類型
                let carCase = ''  // 行安立案種類
                let jobType = ''  // 職安立案類型
                let jobCase = ''  // 職安立案種類

                // 行安
                switch (this.carSafeType) {
                    case 'A':
                        carType = 'new'
                        carCase = 'event'
                        break
                    case 'B':
                        carType = 'connect'
                        carCase = 'event'
                        break
                    case 'C':
                        carType = 'new'
                        carCase = 'endanger'
                        break
                    case 'D':
                        carType = 'connect'
                        carCase = 'endanger'
                        break
                    default:
                        carType = 'no'
                        carCase = 'no'
                        break;
                }

                // 職安
                switch (this.jobSafeType) {
                    case 'A':
                        jobType = 'new'
                        jobCase = 'event'
                        break
                    case 'B':
                        jobType = 'connect'
                        jobCase = 'event'
                        break
                    case 'C':
                        jobType = 'new'
                        jobCase = 'endanger'
                        break
                    case 'D':
                        jobType = 'connect'
                        jobCase = 'endanger'
                        break
                    default:
                        jobType = 'no'
                        jobCase = 'no'
                        break;
                }

                recordNotify({
                    EndangerID: this.id,  // 通報編號
                    DriveRecordType: carType,  // 行安立案類型
                    DriveRecordCase: carCase,  // 行安立案種類
                    ProfesRecordType: jobType,  // 職安立案類型
                    ProfesRecordCase: jobCase,  // 職安立案種類
                    DriveConnectID: this.pick1,
                    ProfesConnectID: this.pick2,
                    EndangerCode: this.ipt.code1 + '-' + this.ipt.code2,
                    NoRecord: this.NoRecord,  // 是否不立案
                    ChangeRecord: 'F',  // 是否變更立案類型
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '立案成功'})
                        this.done = true  // 隱藏按鈕
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                        this.chMsgbar({ success: false, msg: '立案成功'})
                }).finally(() => {
                    this.chLoadingShow()
                })
            }
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 不立案
        nocreate() {
            if (confirm('你確定要不立案嗎?')) {
                this.chLoadingShow()

                // 判斷行安、職安的立案類型及種類 (依下拉選單所選的值判斷，不選擇就維持空值)
                let carType = ''  // 行安立案類型
                let carCase = ''  // 行安立案種類
                let jobType = ''  // 職安立案類型
                let jobCase = ''  // 職安立案種類

                // 行安
                switch (this.carSafeType) {
                    case 'A':
                        carType = 'new'
                        carCase = 'event'
                        break
                    case 'B':
                        carType = 'connect'
                        carCase = 'event'
                        break
                    case 'C':
                        carType = 'new'
                        carCase = 'endanger'
                        break
                    case 'D':
                        carType = 'connect'
                        carCase = 'endanger'
                        break
                    default:
                        carType = 'no'
                        carCase = 'no'
                        break;
                }

                // 職安
                switch (this.jobSafeType) {
                    case 'A':
                        jobType = 'new'
                        jobCase = 'event'
                        break
                    case 'B':
                        jobType = 'connect'
                        jobCase = 'event'
                        break
                    case 'C':
                        jobType = 'new'
                        jobCase = 'endanger'
                        break
                    case 'D':
                        jobType = 'connect'
                        jobCase = 'endanger'
                        break
                    default:
                        jobType = 'no'
                        jobCase = 'no'
                        break;
                }

                recordNotify({
                    EndangerID: this.id,  // 通報編號
                    DriveRecordType: carType,  // 行安立案類型
                    DriveRecordCase: carCase,  // 行安立案種類
                    ProfesRecordType: jobType,  // 職安立案類型
                    ProfesRecordCase: jobCase,  // 職安立案種類
                    DriveConnectID: this.pick1,
                    ProfesConnectID: this.pick2,
                    EndangerCode: this.ipt.code1 + '-' + this.ipt.code2,
                    NoRecord: this.NoRecord,  // 是否不立案
                    ChangeRecord: 'F',  // 是否變更立案類型
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '立案成功'})
                        this.done = true  // 隱藏按鈕
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                        this.chMsgbar({ success: false, msg: '立案成功'})
                }).finally(() => {
                    this.chLoadingShow()
                })
            }
        },
        pick1Event(item) {
            switch(this.carSafeType){
                case 'B':
                    this.shwoPick1_1Form = false;
                    this.pick1 = item.AccidentCode
                    break;
                case 'D':
                    this.shwoPick1_2Form = false;
                    this.pick1 = item.EndangerCode
                    break;
            }
            // this.carSafeType = ''
        },
        pick2Event(item) {
            switch(this.jobSafeType){
                case 'B':
                    this.shwoPick2_1Form = false;
                    this.pick2 = item.AccidentCode
                    break;
                case 'D':
                    this.shwoPick2_2Form = false;
                    this.pick2 = item.EndangerCode
                    break;
            }
        },
    },
    created() {
        this.setShowData(this.itemData)
    },
}
</script>