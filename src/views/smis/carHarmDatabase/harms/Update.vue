<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">危害更新 (編號：{{ routeId }})</h2>

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
            <v-text-field
                :value="ipt.wbs"
                solo
                @click="eqCodeShow = true"
            ></v-text-field>
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
                            @click="showContent(item.DeviceDesp)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.depart="{ item }">
                        {{ opts.depart.find(ele => ele.value == item.DeviceDepart).text }}
                    </template>

                    <template v-slot:item.file="{ item }">
                        <v-btn fab small dark color="brown"
                            :href="item.file_path"
                            :download="item.file_path_name"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.evidences="{ item }">
                        <v-btn fab small dark color="purple lighten-2"
                            @click="showEvidences(item)"
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

                    <template v-slot:item.depart="{ item }">
                        {{ opts.depart.find(ele => ele.value == item.DeviceDepart).text }}
                    </template>

                    <template v-slot:item.desc="{ item }">
                        <v-btn color="teal" dark
                            @click="showContent(item.DeviceDesp)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.file="{ item }">
                        <v-btn fab small dark color="brown"
                            v-if="item.regul_file_path != ''"
                            :href="item.regul_file_path"
                            :download="item.FileFullName"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.evidences="{ item }">
                        <v-btn fab small dark color="purple lighten-2"
                            v-if="item.file_path.length > 0"
                            @click="showEvidences(item)"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn fab small color="error"
                            @click="delControl(item.ProcCode)"
                        >
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>

    <v-divider class="mx-2 mt-12 mb-4"></v-divider>

    <v-row no-gutters class="px-2">
        <!-- 證據上傳 -->
        <v-col cols="12" v-if="false">
            <v-row>
                <v-col cols="12" sm="4" md="3">
                    <h3 class="mb-1">
                        <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>控制措施編號
                    </h3>
                    <v-select
                        v-model="controlId"
                        :items="controlIdOpts"
                        solo
                    ></v-select>
                </v-col>

                <v-col cols="12" sm="6" md="7">
                    <h3 class="mb-1">
                        <v-icon class="mr-1 mb-1">mdi-cloud-upload</v-icon>證據上傳
                    </h3>
                    
                    <v-file-input
                        label="請點此選要上傳的檔案，選擇時可按 ctrl 或 shift 複選"
                        solo
                        multiple
                        v-model="choose"
                        @change="select"
                    >
                        <template v-slot:selection="{ text }">
                            <v-chip small label color="primary" class="pa-4">{{ text }}</v-chip>
                        </template>
                    </v-file-input>
                </v-col>

                <v-col cols="12" sm="2" class="text-right text-md-left" align-self="center">
                    <v-btn large
                        color="primary"
                        @click="join"
                    >加入檔案</v-btn>
                </v-col>
            </v-row>
        </v-col>

        <UploadFileAdd v-if="false"
            title="證據上傳"
            :uploadDisnable="false"
            :fileList="showFiles"
            @joinFile="joinFile"
            @rmFile="rmFile"
        />

        <!-- 上傳的檔案列表 -->
        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC"
            v-for="(list, i) in uploads"
            :key="list.controlId"
        >
            <v-row no-gutters>
                <v-col class="purple lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        措施編號 {{ list.controlId }}
                    </span>
                </v-col>

                <v-col class="white px-3 d-flex flex-wrap">
                    <v-chip
                        v-for="(file, idx) in list.files"
                        :key="file.name"
                        class="mr-3 my-2"
                        label
                        color="teal"
                        dark
                    >
                        {{ file.name }} 
                        <v-icon right
                            @click="rmFile(i, idx)"
                        >mdi-close-circle</v-icon>
                    </v-chip>
                </v-col>
            </v-row>
        </v-col>
        <!-- 關聯子系統 dailog -->
        <v-dialog v-model="eqCodeShow" max-width="900px">
            <v-card>
            <v-card-title class="yellow darken-1 px-4 py-1">
                選擇設備標示編號(WBS)
                <v-spacer />
                <v-btn fab small text @click="eqCodeShow = false" class="mr-n2">
                <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <EquipRepairCode :key="componentKey" :toLv="2" :nowEqCode="ipt.wbs" @getEqCode="getTempCode" @getEqName="getTempName"/>
            <v-card-actions class="px-5 pb-5">
                <v-spacer></v-spacer>
                <v-btn class="mr-2" elevation="4" @click="eqCodeShow = false">取消</v-btn>
                <v-btn color="success" elevation="4" @click="setWBS">送出</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="mr-4"
                @click="closeWindow"
            >關閉視窗</v-btn>
            
            <template v-if="!done">
                <v-btn
                    color="success"
                    @click="save"
                >申請更新</v-btn>
            </template>
        </v-col>
    </v-row>

    <!-- 證據 dialog -->
    <EvidencesDialog
        :show="dialogShow"
        :fileNameArr="evidencesName"
        :filePathArr="evidences"
        @closeDialog="closeDialog"
    />

    <!-- 證據 dialog -->
    <!-- <v-dialog v-model="dialogShow" max-width="400px">
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
    </v-dialog> -->

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
import { departOptions } from '@/assets/js/departOption'
import AccidentCheckbox from '@/components/smis/AccidentCheckbox.vue'
import EvidencesDialog from '@/components/smis/EvidencesDialog.vue'
import EquipRepairCode from '@/components/EquipRepairCode.vue'
import UploadFileAdd from '@/components/UploadFileAdd.vue'
import Pagination from '@/components/Pagination.vue'
import { deleteData, sendCheckData, sendPassData, sendRetuenData, sendResetData, sendCloseData, fetchOne, sendUpdateData} from '@/apis/smis/carHarmDatabase/harms'
import { fetchList } from '@/apis/smis/carHarmDatabase/controlMeasures'

export default {
    props: ['id'],
    data: () => ({
        test13:'test13',
        valid: true,  // 表單是否驗證欄位
        done: false,  // 是否完成頁面操作
        searchTemp: {},  // 關聯子系統 dialog 暫存資料用
        eqCodeShow: false,  // 關聯子系統 dialog 是否顯示
        componentKey: 0,  // 關聯子系統 dialog 內組件計算增數用
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
            files: [],  // 檔案(證據)
        },
        opts: {  // 下拉選單
            depart: departOptions,  // 權責部門
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
            { text: '編號', value: 'ProcCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '150' },
            { text: '措施簡述', value: 'DeviceTitle', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '150' },
            { text: '措施說明', value: 'desc', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '100' },
            { text: '管控單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '100' },
            { text: '規章', value: 'file', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70' },
            { text: '證據', value: 'evidences', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70' },
            { text: '備註', value: 'Remark', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '100' },
            { text: '選用', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70' },
        ],
        chooseHeaders: [  // 已選的表格欄位
            { text: '編號', value: 'ProcCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '150' },
            { text: '措施簡述', value: 'DeviceTitle', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '150' },
            { text: '措施說明', value: 'desc', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '100' },
            { text: '管控單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '100' },
            { text: '規章', value: 'file', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70' },
            { text: '證據', value: 'evidences', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70' },
            { text: '備註', value: 'Remark', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '100' },
            { text: '刪除', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70' },
        ],
        evidences: [],  // 控制措施證據
        evidencesName: [],  // 證據名稱
        dialogShow: false,  // 控制措施證據dialog是否顯示
        controlIdOpts: [],  // 證據上傳下拉選單 (選控制措施編號)
        choose: null,  // 上傳時所選的檔案
        controlId: null,  // 控制措施編號 (證據上傳時用)
        uploads: [],  // 證據上傳檔案列表
        showFiles: [],  // 要顯示的縮圖
    }),
    components: {
        AccidentCheckbox,
        Pagination,
        EvidencesDialog,
        EquipRepairCode,
        UploadFileAdd
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
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
            'closeWindow',  // 關閉視窗
        ]),
        // 初始化資料
        initData() {

            this.ipt = { ...this.defaultIpt }  // 初始化表單
            this.chLoadingShow()
            this.routeId = this.id  // 路由參數(id)

            fetchOne({
                    EndangerCode: this.id,  // 工單編號 (從路由參數抓取)
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                }).then(res => {
                    console.log("fetchOne OK")
                    if (res.data.ErrorCode == 0) {
                        if (res.data.DelStatus == 'T') {  // 若已刪除則轉404頁
                            this.$router.push({ path: '/404' })
                        } else {
                            res.data.controls = JSON.parse(res.data.order_list)  // 已選控制措施
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

            return

            // 範例效果
            setTimeout(() => {
                // 向後端取得最新版本的已核定資料
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
                            file: { name: '123.pdf', link: '/demofile/123.pdf' },
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
                            file: { name: '123.docx', link: '/demofile/123.docx' },
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
        },
        // 設定資料
        // 關閉證據dialog
        closeDialog() {
            this.dialogShow = false
        },
        //抓取未確認的設備標示編碼
        getTempCode(value) {
            this.searchTemp.wbs = value
        },
        //抓取未確認的設備標示編碼中文
        getTempName(value) {
            this.searchTemp.wbsShow = value
        },
        //確認設備標示編碼，寫入
        setWBS() {
            this.ipt.wbs = this.searchTemp.wbs
            this.eqCodeShow = false
        },
        setInitDate(obj) {
            console.log("obj~~~~~: ", obj)
            this.ipt.desc = obj.EndangerDesp // 危害說明
            this.ipt.reason = obj.EndangerReason  // 危害直接成因
            this.ipt.indirectReason = obj.EndangerIndirect  // 可能的危害間接原因
            this.ipt.note = obj.Remark  // 備註
            this.ipt.depart = obj.EndangerDepart  // 權責部門
            this.ipt.mode = obj.OperationMode  // 營運模式
            this.ipt.wbs = obj.ConnectWBS  // 關聯子系統
            this.ipt.serious = obj.RiskSerious  // 風險嚴重性
            this.ipt.frequency = obj.RiskFreq  // 風險頻率
            this.ipt.affectTraveler = (obj.EffectTraveler == 'T')? true : false  // 影響旅客
            this.ipt.affectStaff = (obj.EffectEmploy == 'T')? true : false  // 影響員工
            this.ipt.affectPublic = (obj.EffectPeople == 'T')? true : false  // 影響大眾
            this.ipt.trainLate = (obj.ServiceCarError == 'T')? true : false  // 列車誤點
            this.ipt.stopOperation = (obj.ServiceStopError == 'T')? true : false  // 中斷營運
            this.ipt.accidents = [ ...obj.DeriveAccident ]  // 衍生事故
            this.ipt.controlChoose = [ ...obj.controls ]  // 已選控制措施 
            this.controlIdOpts = [ ...obj.controls.map(item => item.ProcCode) ]  // 已選控制措施 ProcCode
            console.log("this.controlIdOpts: ", this.controlIdOpts)

            // // 重組上傳檔案的控制措施編號下拉選單、檔案列表
            // obj.controls.forEach(item => {
            //     this.controlIdOpts.push(item.id)
            // })
            
            // this.uploads = this.controlIdOpts.map(ele => {
            //     return { controlId: ele, files: []}
            // })
        },
        // 設定勾選的延申事故
        setAccident(arr) {
            this.ipt.accidents = [ ...arr ]
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        test(value){
            console.log("value: ", value)
        },
        // 申請更新
        save() {
            if (confirm('你確定要申請更新嗎?')) {
                this.chLoadingShow()

                // 組合要傳至後端的已選控制措施資料
                let chooseControlData = this.ipt.controlChoose.map(item => ({
                    EndangerCode: '',
                    ProcCode: item.ProcCode
                }))
                console.log("chooseControlData: ", chooseControlData)
                sendUpdateData({
                    EndangerCode: this.id,  // 危害編號
                    EndangerDesp: this.ipt.desc,  // 危害說明
                    EndangerCode: this.id,  // 危害說明
                    OperationMode: this.ipt.mode,  //營運模式
                    EndangerReason: this.ipt.reason,  // 危害直接成因
                    EndangerIndirect: this.ipt.indirectReason,  // 可能的危害間接原因
                    Remark: this.ipt.note,  // 備註
                    EndangerDepart: this.ipt.depart,  // 危害權責部門
                    RiskSerious: this.ipt.serious,  // 風險嚴重性
                    RiskFreq: this.ipt.frequency,  // 風險頻率
                    RiskLevel: '',  // 風險等級
                    DeriveAccident: this.ipt.accidents,  // 衍生事故
                    EffectTraveler: (this.ipt.affectTraveler)? 'T' : 'F',  // 影響人員-旅客
                    EffectEmploy: (this.ipt.affectStaff)? 'T' : 'F',  // 影響人員-員工
                    EffectPeople: (this.ipt.affectPublic)? 'T' : 'F',  // 影響人員-大眾
                    ServiceCarError: (this.ipt.trainLate)? 'T' : 'F',  // 營運衝擊-列車誤點
                    ServiceStopError: (this.ipt.stopOperation)? 'T' : 'F',  // 營運衝擊-中斷營運
                    DeviceDepart: '',  // 控制措施權責部門
                    ConnectWBS: this.ipt.wbs,  // 關聯子系統(WBS)
                    ProcCount: chooseControlData,  // 已選控制措施清單
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '更新成功' })
                        this.done = true
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，更新失敗' })
                }).finally(() => {
                    this.chLoadingShow()
                })
            }
        },
        joinFile(obj, bool) {
            if(this.controlId == null && bool == true) return
            if(this.controlId == null && bool == false){
                alert("未選擇控制措施")
                return
            }
            if (bool) {
                this.ipt.files.push(obj)  // 加入要上傳後端的檔案
            } else {
                this.showFiles.push(obj)  // 加入要顯示的縮圖
            }
            if(!bool){
                console.log("this.ipt.files: ", this.ipt.files)
                console.log("this.showFiles: ", this.showFiles)
            }
        },
        // 移除要上傳的檔案 (組件用)
        rmFile(idx) {
            this.showFiles.splice(idx, 1)
            this.ipt.files.splice(idx, 1)

            console.log("this.ipt.files: ", this.ipt.files)
            console.log("this.showFiles: ", this.showFiles)
        },
        // 搜尋控制措施
        search() {
            this.chLoadingShow()
            this.pageOpt.page = 1  // 頁碼初始化

            fetchList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_EndangerProc',  // DB table
                KeyItem: [
                    { tableColumn: 'DeviceDepart', columnValue: this.controlSearch.depart },  // 管控單位
                    { tableColumn: 'DeviceTitle', columnValue: this.controlSearch.subject },  // 措施簡述
                ],
                QyName: [    // 欲回傳的欄位資料
                    // 'PolicyCode',
                    // 'ProcCode',
                    // 'DeviceTitle',
                    // 'DeviceDesp',
                    // 'DeviceDepart',
                    // 'UpdateDTime',
                    // 'Remark',
                ],
            }).then(res => {
                console.log("res.data.order_list: ", res.data.order_list)
                this.tableItems = JSON.parse(res.data.order_list)
                console.log("tableItems: ", this.tableItems)
            }).catch(err => {
                console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow()
            })
        },
        // 顯示檢視內容
        showContent(txt) {
            console.log("txt:: ", txt)
            this.chViewDialog({ show: true, content: txt.replace(/\n/g, '<br>') })
        },
        // 顯示證據
        showEvidences(item) {
            console.log("item: ", item)
            this.evidences = [ ...item.file_path ]  // 指派證據檔案路徑
            this.evidencesName = [ ...item.file_path_name ]  // 指派證據檔案名稱
            console.log("evidences: ", this.evidences)
            console.log("evidencesName: ", this.evidencesName)
            this.dialogShow = true
        },
        // 增加已選的控制措施
        addControl(item) {
            // 沒找到才新增
            let arr = this.ipt.controlChoose.find(ele => ele.ProcCode == item.ProcCode)
            if (arr == undefined) {
                this.ipt.controlChoose.push(item) //
                this.controlIdOpts.push(item.ProcCode)
            }
        },
        // 刪除已選的控制措施
        delControl(id) {
            console.log("id: ", id)
            let idx = this.ipt.controlChoose.findIndex(ele => ele.ProcCode == id)
            if(idx != -1){
                this.ipt.controlChoose.splice(idx, 1)
            }

            // 移除上傳檔案的控制措施編號下拉選單
            let idx2 = this.controlIdOpts.findIndex(ele => ele == id)
            if(idx2 != -1){
                this.controlIdOpts.splice(idx2, 1)
            }
            console.log("this.uploads: ", this.uploads)
            return

            // 移除檔案列表
            let idx3 = this.uploads.findIndex(ele => ele.controlId == id)
            this.uploads.splice(idx3, 1)

            // 若上傳檔案下拉選單已選的措施編號，已不在下拉選單中，則設為空值
            if (this.controlId == id) {
                this.controlId = null
            }
        },
        // 選擇上傳的檔案
        select(file) {
            this.choose = file
        },
        // 加入要上傳的檔案
        join() {
            if (this.choose != null) {
                if (this.controlId == null) {
                    alert('你還沒選擇控制措施編號')
                    return
                } 

                // 找出目前所選的控制措施 id 檔案列表的索引值
                let idx = this.uploads.findIndex(ele => {
                    return ele.controlId == this.controlId
                })

                // 已加入的檔案不重覆增加
                this.choose.forEach(ele => {
                    let file = this.uploads[idx].files.find(item => {
                        return item.name == ele.name && item.size == ele.size
                    })
                    
                    // // 若已加入列表中沒找到檔案則加入
                    if (file == undefined) this.uploads[idx].files.push(ele)
                })
                this.choose = null
            }
        },
        // 刪除要上傳的檔案
        rmFile(fileListIdx, itemIdx) {
            this.uploads[fileListIdx].files.splice(itemIdx, 1)
        },
    },
    created() {
        this.initData()
    }
}
</script>