<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">
        {{ (this.isEdit)? `危害編輯 (編號：${ id })` : '危害新增' }}
    </h2>

    <v-row class="px-2 label-header">
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

    <v-row class="px-2 label-header">
        <v-col cols="8" color="red" >
            <v-row>
                <v-col cols="12" sm="5" md="6">
                    <h3 class="mb-1">
                        <v-icon class="mr-1 mb-1">mdi-bank</v-icon>權責單位
                    </h3>
                    <v-select
                        v-model="ipt.depart"
                        :items="opts.depart2"
                        solo
                    ></v-select>
                </v-col>

                <v-col cols="12" sm="5" md="6">
                    <h3 class="mb-1">
                        <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>營運模式
                    </h3>
                    <v-select
                        v-model="ipt.mode"
                        :items="opts.mode"
                        solo
                    ></v-select>
                </v-col>

                <v-col cols="12" sm="4" md="6">
                    <h3 class="mb-1">
                        <v-icon class="mr-1 mb-1">mdi-format-line-spacing</v-icon>風險嚴重性
                    </h3>
                    <v-select
                        v-model="ipt.serious"
                        :items="opts.serious"
                        solo
                    ></v-select>
                </v-col>

                <v-col cols="12" sm="4" md="6">
                    <h3 class="mb-1">
                        <v-icon class="mr-1 mb-1">mdi-signal-variant</v-icon>風險頻率
                    </h3>
                    <v-select
                        v-model="ipt.frequency"
                        :items="opts.frequency"
                        solo
                    ></v-select>
                </v-col>
            </v-row>
            
        </v-col>
        

        

        <v-col cols="12" sm="4" md="4" align-self="center">
            <v-row  >
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-source-branch</v-icon>關聯子系統
                </h3>
            </v-row>
            <v-row  class="mt-n7">
                <v-text-field class="mt-8 "
                    :value="ipt.wbs"
                    solo
                    readonly
                    @click="eqCodeShow = true"
                ></v-text-field>
            </v-row>
            
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
        <v-col cols="12" sm="6" md="3">
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

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>措施簡述
            </h3>
            <v-text-field
                v-model.trim="controlSearch.subject"
                solo
                placeholder="請輸入關鍵字"
            ></v-text-field>
        </v-col>

        <v-col cols="12" md="3" align-self="center" class="mt-n5 mt-md-0">
            <v-btn class=" btn-search white--text" dark large
                @click="search"
            >
                <v-icon class="mr-1">mdi-magnify</v-icon>查詢
            </v-btn>
        </v-col>

        <v-col cols="12" class="mt-4">
            <v-card>
                <v-data-table
                    :headers="headers"
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

                    <template v-slot:item.depart="{ item }">
                        {{ opts.depart.find(ele => ele.value == item.DeviceDepart).text }}
                    </template>

                    <template v-slot:item.desc="{ item }">
                        <v-btn class="btn-memo" dark
                            @click="showContent(item.DeviceDesp)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.file="{ item }">
                        <v-btn fab small dark class="btn-expansion white--text"
                            v-if="item.regul_file_path != ''"
                            :href="item.regul_file_path"
                            :download="item.FileFullName"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.evidences="{ item }">
                        <v-btn fab small dark class="btn-detail white--text"
                            v-if="item.file_path.length > 0"
                            @click="showEvidences(item)"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn fab small dark class="btn-modify white--text"
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
                    class="theme-table"
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:item.depart="{ item }">
                        {{ opts.depart.find(ele => ele.value == item.DeviceDepart).text }}
                    </template>

                    <template v-slot:item.desc="{ item }">
                        <v-btn class="btn-memo" dark
                            @click="showContent(item.DeviceDesp)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.file="{ item }">
                        <v-btn fab small dark class="btn-expansion white--text"
                            v-if="item.regul_file_path != ''"
                            :href="item.regul_file_path"
                            :download="item.FileFullName"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.evidences="{ item }">
                        <v-btn fab small dark class="btn-detail white--text"
                            v-if="item.file_path.length > 0"
                            @click="showEvidences(item)"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn fab small class="btn-delete white--text"
                            @click="delControl(item.ProcCode)"
                        >
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>

        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="mr-4 btn-close"
                v-if="!isEdit"
                to="/smis/car-harmdb/harms"
            >回搜尋頁</v-btn>

            <v-btn dark class="mr-3 btn-close"
                v-else
                :to="`/smis/car-harmdb/harms/${this.id}/show`"
            >回上層</v-btn>
            
            <v-btn
                class="btn-add white--text"
                @click="save"
            >{{ (isEdit)? '儲存變更': '送出' }}</v-btn>
        </v-col>
    </v-row>

    <!-- 證據 dialog -->
    <EvidencesDialog
        :show="dialogShow"
        :fileNameArr="evidencesName"
        :filePathArr="evidences"
        @closeDialog="closeDialog"
    />

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
import { operateModes, riskSerious, riskFrequency } from '@/assets/js/smisData'
import AccidentCheckbox from '@/components/smis/AccidentCheckbox.vue'
import Pagination from '@/components/Pagination.vue'
import EquipRepairCode from '@/components/EquipRepairCode.vue'
import EvidencesDialog from '@/components/smis/EvidencesDialog.vue'
import { fetchList } from '@/apis/smis/carHarmDatabase/controlMeasures'
import { createData, fetchOne, updateData } from '@/apis/smis/carHarmDatabase/harms'

export default {
    props: ['id'],  //路由參數
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
            depart: 'ARCO001',// 權責部門
            mode: 'm1',  // 營運模式
            wbs: '',  // 關聯子系統
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
            depart: [  // 部門
                 { text: '不限', value: '' },
                ...departOptions,
            ],
            depart2: departOptions,  // 部門(不含不限)
            mode: operateModes,  // 營運模式
            serious: riskSerious,  // 風險嚴重性
            frequency: riskFrequency,  // 風險頻率
        },
        controlSearch: {  // 控制措施搜尋
            depart: '',  // 部門
            subject: '',  // 簡述
        },
        pageOpt: { page: 1 },  // 控制措施權責部門的表格目前頁數
        tableItems: [],  // 控制措施權責部門的表格資料
        headers: [  // 控制措施權責部門的表格欄位
            { text: '編號', value: 'ProcCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '150' },
            { text: '措施簡述', value: 'DeviceTitle', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '150' },
            { text: '措施說明', value: 'desc', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '100' },
            { text: '管控單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '100' },
            { text: '規章', value: 'file', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '70' },
            { text: '證據', value: 'evidences', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '70' },
            { text: '備註', value: 'Remark', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '100' },
            { text: '選用', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '70' },
        ],
        chooseHeaders: [  // 已選的表格欄位
            { text: '編號', value: 'ProcCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '150' },
            { text: '措施簡述', value: 'DeviceTitle', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '150' },
            { text: '措施說明', value: 'desc', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '100' },
            { text: '管控單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '100' },
            { text: '規章', value: 'file', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '70' },
            { text: '證據', value: 'evidences', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '70' },
            { text: '備註', value: 'Remark', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '100' },
            { text: '刪除', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: '70' },
        ],
        evidences: [],  // 證據路徑
        evidencesName: [],  // 證據名稱
        dialogShow: false,  // 證據dialog是否顯示
        notify: {  // 危害通報資料
            id: '',  // id
            isNew: false,  // 是否為新登錄
        },
        searchTemp: {},  // 關聯子系統 dialog 暫存資料用
        eqCodeShow: false,  // 關聯子系統 dialog 是否顯示
        componentKey: 0,  // 關聯子系統 dialog 內組件計算增數用
    }),
    components: {
        AccidentCheckbox,
        Pagination,
        EquipRepairCode,
        EvidencesDialog,
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
    // watch: {
    //     // 路由參數變化時，重新向後端取資料
    //     $route(to, from) {
    //         // … 
    //     },
    // },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'chViewDialog',  // 檢視內容 dialog
        ]),
        // 初始化資料
        async initData() {
            this.ipt = { ...this.defaultIpt }  // 初始化表單
            
            // -------------- 編輯時 -------------- 
            if (this.id != undefined) {
                this.isEdit = true
                this.chLoadingShow()
                
                fetchOne({
                    EndangerCode: this.id,  // 工單編號 (從路由參數抓取)
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                }).then(res => {
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
            }
        },
        // 設定資料(編輯時)
        setInitDate(obj) {
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
        },
        // 設定勾選的衍生事故
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

            // 組合要傳至後端的已選控制措施資料
            let chooseControlData = this.ipt.controlChoose.map(item => ({
                EndangerCode: '',
                ProcCode: item.ProcCode
            }))

            if (this.isEdit) {
                // ---------- 編輯時---------- 
                updateData({
                    EndangerCode: this.id,  // 危害編號
                    EndangerDesp: this.ipt.desc,  // 危害說明
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
                    EndangerDesp: this.ipt.desc,  // 危害說明
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
                    'PolicyCode',
                    'ProcCode',
                    'DeviceTitle',
                    'DeviceDesp',
                    'DeviceDepart',
                    'UpdateDTime',
                    'Remark',
                ],
            }).then(res => {
                this.tableItems = JSON.parse(res.data.order_list)
            }).catch(err => {
                console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow()
            })
        },
        // 顯示檢視內容
        showContent(txt) {
            this.chViewDialog({ show: true, content: txt.replace(/\n/g, '<br>') })
        },
        showEvidences(item) {
            this.evidences = [ ...item.file_path ]  // 指派證據檔案路徑
            this.evidencesName = [ ...item.file_path_name ]  // 指派證據檔案名稱
            this.dialogShow = true
        },
        // 關閉證據dialog
        closeDialog() {
            this.dialogShow = false
        },
        // 增加已選的控制措施
        addControl(item) {
            // 沒找到才新增
            let arr = this.ipt.controlChoose.find(ele => ele.ProcCode == item.ProcCode)
            if (arr == undefined) {
                this.ipt.controlChoose.push(item)
            }
        },
        // 刪除已選的控制措施
        delControl(id) {
            let idx = this.ipt.controlChoose.findIndex(ele => ele.ProcCode == id)
            this.ipt.controlChoose.splice(idx, 1)
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
    },
    created() {
        this.initData()
    }
}
</script>