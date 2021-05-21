<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">
        行安改善措施
        <span class="mx-3">(事故事件編號：{{ id }})</span>
    </h2>

    <h3 class="mt-8 error--text">同類型危害已核定採用之控制措施：</h3>
    <v-row no-gutters class="mb-8">
        <v-col cols="12" class="mb-12">
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

                    <template v-slot:item.action="{ item }">
                        <v-checkbox
                            class="mr-n3 ml-2"
                            v-model="selected"
                            :value="item.ProcCode"
                        ></v-checkbox>
                    </template>

                    <template v-slot:item.DeviceDesp="{ item }">
                        <v-btn class="btn-detail" dark
                            @click="showContent(item.DeviceDesp)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.depart="{ item }">
                        {{ departOpts.find(ele => ele.value == item.DeviceDepart).text }}
                    </template>

                    <template v-slot:item.file="{ item }">
                        <v-btn fab small dark class="btn-memo"
                            v-if="item.regul_file_path != ''"
                            :href="item.regul_file_path"
                            :download="item.regul_file_path_name"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.evidences="{ item }">
                        <v-btn fab small dark class="btn-modify"
                            v-if="item.file_path.length > 0"
                            @click="showEvidences(item)"
                        >
                            <v-icon>mdi-file-document</v-icon>
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

            <span>
                <v-icon class="mb-2 mr-1">mdi-lightbulb-on</v-icon>
                你選擇的控制措施編號： {{ selectedMsg }}
            </span>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-2">
                <v-icon class="mr-1 mb-1">mdi-pen</v-icon>改善措施摘要
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入改善措施摘要"
                v-model.trim="summary"
            ></v-textarea>
        </v-col>

        <v-col cols="12" class="mt-5 text-center">
            <v-btn dark class="mr-3 btn-close"
                :to="`/smis/car-accident-event/${id}/show`"
            >回上層</v-btn>

            <v-btn dark class="btn-add white--text"
                @click="save"
            >送出</v-btn>
        </v-col>
    </v-row>

    <!-- 證據 dialog -->
    <EvidencesDialog
        :show="dialogShow"
        :fileNameArr="evidencesName"
        :filePathArr="evidences"
        @closeDialog="closeDialog"
    />
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { canInUpdate } from '@/apis/access'
import { getNowFullTime } from '@/assets/js/commonFun'
import { departOptions } from '@/assets/js/departOption'
import Pagination from '@/components/Pagination.vue'
import EvidencesDialog from '@/components/smis/EvidencesDialog.vue'
import { fetchList } from '@/apis/smis/carHarmDatabase/controlMeasures'
import { procUpdateData } from '@/apis/smis/carAccidentEvent'

export default {
    props: ['id'],  //路由參數
    data: () => ({
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '連結', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 70 },
            { text: '措施編號', value: 'ProcCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 150 },
            { text: '措施簡述', value: 'DeviceTitle', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 150 },
            { text: '措施說明', value: 'DeviceDesp', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
            { text: '管控單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 120 },
            { text: '規章', value: 'file', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 70},
            { text: '證據', value: 'evidences', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 70 },
            { text: '備註', value: 'Remark', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
        ],
        departOpts: departOptions,  // 管控單位
        summary: '',  // 改善措施摘要
        selected: [],  // 所選的控制措施 id
        evidences: [],  // 證據路徑
        evidencesName: [],  // 證據名稱
        dialogShow: false,  // 證據dialog是否顯示
    }),
    components: {
        Pagination,
        EvidencesDialog,
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
            groupData: state => state.groupData,
        }),
        selectedMsg() {
            // 重新排序
            let arr = this.selected.sort(function(a, b) {
                return a - b
            })
            return arr.join('、')
        },
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'chViewDialog',  // 檢視內容 dialog
        ]),
        ...mapActions('user', [
            'saveUserGroup',  // 儲存使用者權限(群組)資料
        ]),
        // 向後端取得資料
        fetchData() {
            this.chLoadingShow()
            this.pageOpt.page = 1  // 頁碼初始化

            fetchList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_EndangerProc',  // DB table
                KeyItem: [
                    // { tableColumn: 'DeviceDepart', columnValue: this.depart },  // 管控單位
                    // { tableColumn: 'DeviceTitle', columnValue: this.subject },  // 措施簡述
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
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 送出
        save() {
            if (this.selected.length == 0) {
                alert('請選擇要連結的控制措施')
                return
            }

            this.chLoadingShow()

            procUpdateData({
                AccidentCode: this.id,  // 事故事件編號
                ProcTitle: this.summary,  // 改善措施摘要
                ProcCode: this.selected,  //改善措施編號
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
        },
        // 顯示措施說明
        showContent(txt) {
            // this.chViewDialog({ show: true, content: txt.replace(/\n/g, '<br>') })
            this.chViewDialog({ show: true, content: txt.replace(/\n/g, '<br>') })
        },
        // 顯示證據
        showEvidences(item) {
            this.evidences = [ ...item.file_path ]  // 指派證據檔案路徑
            this.evidencesName = [ ...item.file_path_name ]  // 指派證據檔案名稱
            this.dialogShow = true
        },
        // 關閉證據dialog
        closeDialog() {
            this.dialogShow = false
        },
    },
    created() {
        this.fetchData()
    }
}
</script>