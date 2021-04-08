<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">危害更新審核 (編號：{{ id }})</h2>

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-12">
        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-bank</v-icon>權責單位
        </h3>
        <VersionDiff
            :before="before.depart"
            :after="after.depart"
        />

        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>營運模式
        </h3>
        <VersionDiff
            :before="before.mode"
            :after="after.mode"
        />

        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-source-branch</v-icon>關聯子系統
        </h3>
        <VersionDiff
            :before="before.wbs"
            :after="after.wbs"
        />

        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-format-line-spacing</v-icon>風險嚴重性
        </h3>
        <VersionDiff
            :before="before.serious"
            :after="after.serious"
        />

        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-signal-variant</v-icon>風險頻率
        </h3>
        <VersionDiff
            :before="before.frequency"
            :after="after.frequency"
        />

        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-elevation-rise</v-icon>風險等級
        </h3>
        <VersionDiff
            :before="before.level"
            :after="after.level"
        />

        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>營運模式
        </h3>
        <VersionDiff
            :before="before.mode"
            :after="after.mode"
        />

        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-pen</v-icon>危害說明
        </h3>
        <VersionDiff
            :before="before.desc"
            :after="after.desc"
        />

        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-pen</v-icon>直接成因
        </h3>
        <VersionDiff
            :before="before.reason"
            :after="after.reason"
        />

        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-pen</v-icon>可能的間接原因
        </h3>
        <VersionDiff
            :before="before.indirectReason"
            :after="after.indirectReason"
        />

        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-note</v-icon>備註
        </h3>
        <VersionDiff
            :before="before.note"
            :after="after.note"
        />

        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-alert-decagram</v-icon>影響、運轉影響情形
        </h3>
        <VersionDiff
            :before="before.affectTxt"
            :after="after.affectTxt"
        />

        <h3 class="mb-1 mt-12">
            <v-icon class="mr-1 mb-1">mdi-arrow-expand</v-icon>衍生事故
        </h3>
        <VersionDiff
            :before="before.accidentsTxt"
            :after="after.accidentsTxt"
        />

        <!-- 控制措施 -->
        <v-col cols="12" class="mt-12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-check-circle</v-icon>控制措施<br>
                (變更前)
            </h3>
            <v-card flat>
                <v-data-table
                    :headers="headers"
                    :items="before.controls"
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
                   
                </v-data-table>
            </v-card>
        </v-col>

        <v-col cols="12" class="mt-8">
            <h3 class="mb-1">(變更後)</h3>
            <v-card flat>
                <v-data-table
                    :headers="headers"
                    :items="after.controls"
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
                    
                </v-data-table>
            </v-card>
        </v-col>

        <!-- 本案上傳之證據 -->
        <h3 class="mb-1 mt-12" v-if="closeForNow">
            <v-icon class="mr-1 mb-1">mdi-check-circle</v-icon>本案上傳之證據<br>
            (變更前)
        </h3>
        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC"
            v-for="list in before.uploads"
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

                <v-col class="white px-3 pt-1 d-flex flex-wrap">
                    <v-chip small label color="primary" class="mr-3 my-2"
                        v-for="file in list.files"
                        :key="file.name"
                        :href="file.link"
                        :download="file.name"
                    >
                        {{ file.name }}
                    </v-chip>
                </v-col>
            </v-row>
        </v-col>

        
        <h3 class="mb-1 mt-8" v-if="closeForNow">(變更後)</h3>
        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC"
            v-for="list in after.uploads"
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

                <v-col class="white px-3 pt-1 d-flex flex-wrap">
                    <v-chip small label color="primary" class="mr-3 my-2"
                        v-for="file in list.files"
                        :key="file.name"
                        :href="file.link"
                        :download="file.name"
                    >
                        {{ file.name }}
                    </v-chip>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12" class="text-center mt-12 mb-8">
            <v-btn dark class="ma-2"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done">
                <v-btn dark  class="ma-2" color="error"
                    @click="showDialog(true)"
                >退回</v-btn>

                <v-btn dark  class="ma-2" color="success"
                    @click="save"
                >同意更新</v-btn>
            </template>
        </v-col>
    </v-row>

    <!-- 退回 dialog -->
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-toolbar dark flat dense color="error" class="mb-2">
                <v-toolbar-title>退回原因</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn fab small text @click="dialog = !dialog" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-textarea
                            hide-details
                            solo
                            rows="8"
                            placeholder="請輸入原因"
                            v-model.trim="backReason"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            
            <v-card-actions class="px-5 pb-5">
                <v-spacer></v-spacer>
                <v-btn class="mr-2" elevation="4" :loading="isLoading" @click="dialog = false">取消</v-btn>
                <v-btn color="success"  elevation="4" :loading="isLoading" @click="withdraw">送出</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- 證據 dialog -->
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
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { departOptions } from '@/assets/js/departOption'
import { getNowFullTime } from '@/assets/js/commonFun'
import { carHarmDbStatus, evtTypes, operateModes, riskSerious, riskFrequency, riskLevel } from '@/assets/js/smisData'
import VersionDiff from '@/components/smis/VersionDiff.vue'
import { getBeforeData, sendUpdateData, sendRetuenData, updatePassData} from '@/apis/smis/carHarmDatabase/harms'

export default {
    props: ['itemData'],
    data: () => ({
        id: '',
        closeForNow: false, // 暫時隱藏欄位
        done: false,  // 是否完成頁面操作
        dialogReturnMsg: '',  // 退回或徹銷時成功的訊息
        before: {  // 變更前
            OOOOOO: '', // AAAAAA
            depart: '',// 權責部門
            mode: '',  // 營運模式
            wbs: '',  // 關聯子系統
            serious: '',  // 風險嚴重性
            frequency: '',  // 風險頻率
            level: '',  // 風險等級
            desc: '',  // 危害說明
            reason: '',  // 危害直接成因
            indirectReason: '',  // 可能的危害間接原因
            note: '',  // 備註
            controls: [],  // 控制措施
            affectTxt: '',  // 影響、運轉影響情形字串
            accidentsTxt: '',  // 衍生事故字串
            uploads: [],  // 上傳之證據
        },
        after: {  // 變更後
            depart: '',
            mode: '',
            wbs: '',
            serious: '',
            frequency: '',
            level: '',
            desc: '',
            reason: '',
            indirectReason: '',
            note: '',
            controls: [],
            affectTxt: '',
            accidentsTxt: '',
            uploads: [],
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
        headers: [  // 表格欄位
            { text: '編號', value: 'ProcCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '150' },
            { text: '措施簡述', value: 'DeviceTitle', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '150' },
            { text: '措施說明', value: 'desc', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '100' },
            { text: '管控單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '100' },
            { text: '規章', value: 'file', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70' },
            { text: '證據', value: 'evidences', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '70' },
            { text: '備註', value: 'Remark', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: '100' },
        ],
        dialog: false,  // 退回dialog是否顯示
        isLoading: false,  // 是否讀取中
        backReason: '',  // 退回原因
        evidences: [],  // 控制措施證據
        dialogShow: false,  // 控制措施證據dialog是否顯示
    }),
    components: { VersionDiff },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
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
            'chViewDialog',  // 檢視內容 dialog
            'closeWindow',  // 關閉視窗
        ]),
        // 向後端取得資料
        fetchData() {
            // this.chLoadingShow()
            this.id = this.itemData.EndangerCode
            let tableItems
            let maxIndex
            let old

            // this.setShowData(this.itemData, this.itemData)
            // return

            getBeforeData({
                EndangerCode: this.id,  // 事故事件編號
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    // this.chMsgbar({ success: true, msg: '重提成功' })
                    // this.done = true  // 隱藏頁面操作按鈕
                    tableItems = JSON.parse(res.data.order_list)
                    // let times = tableItems.map(item => item.InsertDTime)
                    // let newArr = []
                    // times.forEach(time => {
                    //     let date = new Date(time)
                    //     newArr.push(date.getTime()); 
                    // });
                    // maxIndex = newArr.findIndex((element)=>{
                    //     return element == Math.max(...newArr)
                    // })
                    // old = tableItems[maxIndex]
                    
                } else {
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
            }).catch(err => {
                this.chMsgbar({ success: false, msg: '伺服器發生問題' })
            }).finally(() => {
                this.setShowData(tableItems[0], this.itemData)
                this.chLoadingShow()
            })
            
            // this.setShowData(this.itemData, old)
        },
        // 初始化資料
        setShowData(before, after) {
            let aa = JSON.parse(before.proc_detail)
            // 危害說明
            this.before.descp = before.EndangerDesp
            this.after.descp = after.EndangerDesp

            // 權責部門
            this.before.depart = before.EndangerDepart
            this.after.depart = after.EndangerDepart

            // 營運模式
            this.before.mode = operateModes.find(ele => ele.value == before.OperationMode).text
            this.after.mode = operateModes.find(ele => ele.value == after.OperationMode).text

            // 關聯子系統 operateModes.find(ele => ele.value == before.OperationMode).text
            this.before.wbs = before.ConnectWBS
            this.after.wbs = after.ConnectWBS

            // 風險嚴重性
            this.before.serious = before.RiskSerious
            this.after.serious = after.RiskSerious

            // 風險頻率
            this.before.frequency = before.RiskFreq
            this.after.frequency = after.RiskFreq

            // 風險等級
            this.before.level = before.RiskLevel
            this.after.level = after.RiskLevel

            // 危害說明
            this.before.desc = before.EndangerDesp
            this.after.desc = after.EndangerDesp

            // 危害直接成因
            this.before.reason = before.EndangerReason
            this.after.reason = after.EndangerReason

            // 可能的危害間接原因
            this.before.indirectReason = before.EndangerIndirect
            this.after.indirectReason = after.EndangerIndirect

            // 備註
            this.before.note = before.Remark
            this.after.note = after.Remark
            
            // 影響、運轉影響情形字串
            let arr_before = []
            if (before.EffectTraveler == 'T') arr_before.push('影響旅客')
            if (before.EffectEmploy == 'T') arr_before.push('影響員工')
            if (before.EffectPeople == 'T') arr_before.push('影響大眾')
            if (before.ServiceCarError == 'T') arr_before.push('列車誤點')
            if (before.ServiceStopError == 'T') arr_before.push('中斷營運')
            this.before.affectTxt = arr_before.join('、')

            let arr_after = []
            if (after.EffectTraveler == 'T') arr_after.push('影響旅客')
            if (after.EffectEmploy == 'T') arr_after.push('影響員工')
            if (after.EffectPeople == 'T') arr_after.push('影響大眾')
            if (after.ServiceCarError == 'T') arr_after.push('列車誤點')
            if (after.ServiceStopError == 'T') arr_after.push('中斷營運')
            this.after.affectTxt = arr_after.join('、') 

            // 衍生事故字串
            this.before.accidentsTxt = before.DeriveAccident
            this.after.accidentsTxt = after.DeriveAccident.join(',')

            // 控制措施
            this.before.controls = [ ...aa ]
            this.after.controls = [ ...after.controls ]

            // 上傳之證據
            this.before.uploads = [ ...before.uploads ]
            this.after.uploads = [ ...after.uploads ]
        },
        showDialog(bool) {
            // 若為 true 是退回
            this.dialogReturnMsg = (bool)? '退回成功' : '徹銷成功'
            this.dialog = true
        },
        // 同意更新
        save() {
            if (confirm('你確定要更新嗎?')) {
                this.chLoadingShow()

                updatePassData({
                    EndangerCode: this.id,  // 編號
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.done = true  // 隱藏頁面操作按鈕
                    } else {
                        console.log(res.data.Msg)
                    }
                }).catch(err => {
                    console.log(err)
                    this.chMsgbar({ success: false, msg: '伺服器發生問題' })
                }).finally(() => {
                    this.chLoadingShow()
                })
            }
        },
        // 顯示檢視內容
        showContent(txt) {
            this.chViewDialog({ show: true, content: txt.replace(/\n/g, '<br>') })
        },
        // 顯示證據
        showEvidences(item) {
            this.evidences = [ ...item.file_path ]  // 指派證據檔案路徑
            this.evidencesName = [ ...item.file_path_name ]  // 指派證據檔案名稱
            this.dialogShow = true
        },
        // 退回
        withdraw() {
            this.isLoading = true

            sendRetuenData({
                EndangerCode: this.id,  // 事故事件編號
                Reason: this.backReason,  // 退回原因
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    this.chMsgbar({ success: true, msg: this.dialogReturnMsg })
                    this.done = true  // 隱藏頁面操作按鈕
                } else {
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
            }).catch(err => {
                this.chMsgbar({ success: false, msg: '伺服器發生問題，操作失敗' })
            }).finally(() => {
                this.isLoading = this.dialog = false
            })
        },
    },
    created() {
        this.fetchData()
    }
}
</script>