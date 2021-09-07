<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">
        行安改善措施
        <span class="mx-3">(事故事件編號：{{ id }})</span>
    </h2>

    <h3 class="mt-8 error--text">同類型危害已核定採用之控制措施：</h3>
    <v-row class="px-2 label-header">
        <v-col cols="12" sm="4" md="3" class="mb-n7">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-bank</v-icon>管控單位
            </h3>
            <v-select
                v-model="depart"
                :items="departOpts"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="8" md="3" class="mb-n7">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>措施簡述
            </h3>
            <v-text-field
                :value="subject"
                @change="v=>subject=v.trim()"
                solo
                placeholder="請輸入關鍵字"
            ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" align-self="center" class="mb-n7">
            <v-btn dark large class="mr-3 btn-search"
                @click="search"
            >
                <v-icon class="mr-1">mdi-magnify</v-icon>查詢
            </v-btn>
        </v-col>
    </v-row>
    <v-row no-gutters class="mb-8">
        <v-col cols="12" class="mb-12">
            <v-card>
                <v-data-table
                    :headers="headers"
                    :items="showItemList"
                    :options.sync="pageOpt"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                    show-select
                    item-key="ProcCode"
                    class="theme-table"
                    v-model="selected"
                    checkbox-color="orange"
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <!-- <template v-slot:item.action="{ item }">
                        <v-checkbox
                            class="mr-n3 ml-2"
                            v-model="selected"
                            :value="item.ProcCode"
                        ></v-checkbox>
                    </template> -->
                    <template v-slot:header.data-table-select>
                        <span class="subtitle-1 white--text font-weight-bold">連結</span>
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
        tableItemsFirst: [],  // 表格資料
        allItems: [],
        restItem: [],
        HookArr: [],
        depart: '',  // 管控單位
        departConfirm: '',
        subject: '',  // 措施簡述
        subjectConfirm:'',
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            // { text: '連結', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 70 },
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
            let selected = this.selected.map(e=>e.ProcCode)
            // 重新排序
            let arr = selected.sort(function(a, b) {
                return a - b
            })
            return arr.join('、')
        },
        showItemList() {
            let text = this.subjectConfirm
            let depart = this.departConfirm
            let items = this.tableItems.filter(x=>x.DeviceDepart.includes(depart)).filter(x=>x.DeviceTitle.includes(text))
            let selected = this.selected.map(e=>e.ProcCode)
            items.forEach(e=>{
                e.selected = selected.includes(e.ProcCode)
            })
            items.sort(function(x, y) {
                // true values first
                return (x.selected === y.selected)? 0 : x.selected? -1 : 1;
                // false values first
                // return (x === y)? 0 : x? 1 : -1;
            })
            return items
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
            this.chLoadingShow({show:true})
            this.pageOpt.page = 1  // 頁碼初始化
            
            fetchList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                // KeyName: 'SMS_ImproveProc',  // DB table
                KeyName: 'SMS_EndangerProc',  // DB table
                KeyItem: [
                    { tableColumn: 'DeviceDepart', columnValue: this.depart },  // 管控單位
                    { tableColumn: 'DeviceTitle', columnValue: this.subject },  // 措施簡述
                    { tableColumn: 'AccidentCode', columnValue: this.id },  // 措施簡述
                    // { tableColumn: 'ProcCode', columnValue: this.id },  // 措施簡述
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
                let rawString = JSON.stringify(res.data.order_list)
                console.log(rawString);
                let rawData = JSON.parse(rawString)
                let parseData = JSON.parse(rawData)
                console.log("BB : ", parseData);
                this.allItems = [...parseData]
                this.HookArr = res.data.CheckedProcCode
                // let HookArr = ['ARCO01520210707030', 'ARCO01520210707031']
                console.log("before hook this.selected: ", this.selected);
                this.HookArr.forEach(element => {
                    this.selected.push(parseData.find(ele => ele.ProcCode == element))
                    parseData.splice(parseData.map(e => e.ProcCode).indexOf(element), 1)
                });
                // let newTb = this.tableItems
                // this.tableItems = [...[]]
                // newTb.forEach(ee => {
                //     if(ee.DeviceTitle.includes('訓練')){

                //     }
                // });
                console.log("this.selected: ", this.selected);
                console.log("parseData: ", parseData);
                console.log("2 in 1 len: ", this.selected.length+parseData.length);
                this.tableItems = [...this.selected, ...parseData]
                this.tableItemsFirst = this.tableItems
                this.restItem = parseData
            }).catch(err => {
                console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow({show:false})
            })
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        search(){
            console.log("sele: ", this.selected);
            this.subjectConfirm = this.subject;
            this.departConfirm = this.depart;
            return
            //僅 關鍵字查詢
            if(this.subject != '' && this.depart == ''){
                //關鍵字
                let text = this.subject
                //篩出有關鍵字的項目
                console.log("1");
                let filterResult1 = this.tableItems.filter(function (x) { 
                    return x.DeviceTitle.includes(text);
                    });
                console.log("2");
                // let filterResult2 = this.restItem.filter(function (x) { 
                //     return x.DeviceTitle.includes(text);
                //     });
                console.log("3");
                //刪除以勾選項目
                console.log("All len: ", this.allItems.length);
                console.log("filterResult1: ", filterResult1);
                // console.log("filterResult2: ", filterResult2);
                this.tableItems = [...[]]
                console.log("tableItems 1: ", this.tableItems);
                this.tableItems = filterResult1
                // this.tableItems = [...this.filterResult1, ...filterResult2]
                console.log("tableItems 2: ", this.tableItems);
                console.log("4");
            }
            else if(this.subject == '' && this.depart != ''){//僅 單位查詢
                
            }
            else if(this.subject == '' && this.depart == ''){// 無篩選條件
                this.selected = [...[]]
                let parseData = this.allItems
                this.HookArr.forEach(element => {
                    this.selected.push(parseData.find(ele => ele.ProcCode == element))
                    parseData.splice(parseData.map(e => e.ProcCode).indexOf(element), 1)
                });
                this.tableItems = [...this.selected, ...parseData]
            }
        },
        // 送出
        save() {
            if (this.selected.length == 0) {
                alert('請選擇要連結的控制措施')
                return
            }
            this.chLoadingShow({show:true})

            procUpdateData({
                AccidentCode: this.id,  // 事故事件編號
                ProcTitle: this.summary,  // 改善措施摘要
                ProcCode: this.selected.map(item => item.ProcCode ),  //改善措施編號
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
                this.chLoadingShow({show:false})
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