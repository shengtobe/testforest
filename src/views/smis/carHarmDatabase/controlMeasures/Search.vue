<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">控制措施查詢</h2>

    <v-row class="px-2 label-header">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-bank</v-icon>管控單位
            </h3>
            <v-select
                v-model="depart"
                :items="departOpts"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="8" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>措施簡述
            </h3>
            <v-text-field
                v-model.trim="subject"
                solo
                placeholder="請輸入關鍵字"
            ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" align-self="center">
            <v-btn dark large class="mr-3 btn-search"
                @click="search"
            >
                <v-icon class="mr-1">mdi-magnify</v-icon>查詢
            </v-btn>

            <v-btn dark large class="mr-3 btn-add" v-if="isShowBtn"
                to="/smis/car-harmdb/control-measures/add"
            >
                <v-icon>mdi-plus</v-icon>新增
            </v-btn>
        </v-col>

        <!-- 表格資料 -->
        <v-col cols="12" class="mt-5 mt-md-0">
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
                        {{ departOpts.find(ele => ele.value == item.DeviceDepart).text }}
                    </template>

                    <template v-slot:item.desc="{ item }">
                        <v-btn class="btn-memo" dark
                            @click="showContent(item.DeviceDesp)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.file="{ item }">
                        <v-btn fab small dark class="btn-detail white--text"
                            v-if="item.regul_file_path != ''"
                            :href="item.regul_file_path"
                            :download="item.regul_file_path_name"
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

                    <template v-slot:item.action="{ item }" v-if="isShowBtn">
                        <v-btn fab small v-if="isShowBtn"
                            target="_blank"
                            class="mr-3 btn-modify white--text"
                            :to="`/smis/car-harmdb/control-measures/${item.ProcCode}/edit`"
                        >
                            <v-icon>mdi-pen</v-icon>
                        </v-btn>

                        <v-btn fab small class="btn-delete white--text" v-if="isShowBtn"
                            @click="delControl(item.ProcCode)"
                        >
                            <v-icon>mdi-delete</v-icon>
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
import { fetchList, deleteData } from '@/apis/smis/carHarmDatabase/controlMeasures'

export default {
    data: () => ({
        depart: '',  // 管控單位
        isShowBtn: false, // 按鈕是否顯示(依權限)
        departOpts: [  // 管控單位下拉選單
            { text: '不限', value: '' },
            ...departOptions,
        ],
        subject: '',  // 措施簡述
        pageOpt: { page: 1 },  // 目前頁數
        tableItems: [],  // 表格資料
        headers: [  // 表格欄位
            ],
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
        // 查詢
        search() {
            this.chLoadingShow()
            this.pageOpt.page = 1  // 頁碼初始化

            fetchList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_EndangerProc',  // DB table
                KeyItem: [
                    { tableColumn: 'DeviceDepart', columnValue: this.depart },  // 管控單位
                    { tableColumn: 'DeviceTitle', columnValue: this.subject },  // 措施簡述
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
                this.tableItems.forEach(element => {
                    for(let ele in element){
                        if(element[ele] == null){
                            element[ele] = '';
                        }
                    }
                });
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
        // 顯示檢視內容
        showContent(txt) {
            this.chViewDialog({ show: true, content: txt.replace(/\n/g, '<br>') })
        },
        // 刪除控制措施
        delControl(id) {
            if (confirm('你確定要刪除嗎?')) {
                deleteData({
                    ProcCode: id,  // 編號
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '刪除成功' })
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    console.log(err)
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，刪除失敗' })
                }).finally(() => {
                    this.chLoadingShow()
                })
            }
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
    created(){
        //敲門
        canInUpdate({
            ClientReqTime: getNowFullTime(),  // client 端請求時間
            OperatorID: this.userData.UserId,  // 操作人id
        }).then(res => {
            if (res.data.ErrorCode == 0) {
                this.saveUserGroup(res.data.GroupData)
                this.isShowBtn = this.groupData.RoleLv2 == "T";

                if(this.isShowBtn){
                    this.headers = [  // 表格欄位
                        { text: '編號', value: 'ProcCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 150 },
                        { text: '措施簡述', value: 'DeviceTitle', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 150 },
                        { text: '措施說明', value: 'desc', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
                        { text: '管控單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 120 },
                        { text: '規章', value: 'file', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 70 },
                        { text: '證據', value: 'evidences', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 70 },
                        { text: '備註', value: 'Remark', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
                        { text: '編輯、刪除', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 150 },
                    ]
                }
                else{
                    this.headers = [  // 表格欄位
                        { text: '編號', value: 'ProcCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 150 },
                        { text: '措施簡述', value: 'DeviceTitle', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 150 },
                        { text: '措施說明', value: 'desc', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
                        { text: '管控單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 120 },
                        { text: '規章', value: 'file', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 70 },
                        { text: '證據', value: 'evidences', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 70 },
                        { text: '備註', value: 'Remark', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
                    ]
                }
            }
        }).catch( err => {
            console.log(err)
        }).finally(() => {
        })
        //
        
    }

}
</script>