<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">工單編號：{{ workNumber }}</h2>

    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8">
        <BottomTable :items="bottomItems" />

        <FileListShow :fileList="files" title="檔案列表" />

        <v-col cols="12" class="mt-8">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-clock</v-icon>工時統計
            </h3>
            <v-card flat>
                <v-data-table
                    :headers="headers"
                    :items="tableItems"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                    class="theme-table"
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>


                    <template v-slot:item.Price="{ item }">
                        <span class="red--text font-weight-black">{{ item.Price }}</span>
                        <v-btn small dark fab color="info darken-1 btn-modify"
                            @click="showMoneyDialog(item)"
                            class="ml-4"
                        >
                            <v-icon dark>mdi-pen</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:footer>
                        <v-divider></v-divider>

                        <p class="py-2 text-center">
                            總工時： <span class="red--text">{{ new Intl.NumberFormat().format(totalHourCount) }}</span>
                        </p>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
        <v-col cols="12" class="mt-8">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-cash-usd</v-icon>費用統計
            </h3>
            <v-card flat>
                <v-data-table
                    :headers="headers_fee"
                    :items="tableItems_fee"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                    class="theme-table"
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <!-- 表格最上面插入 toolbar 及 dialog -->
                    <template v-slot:top>
                        <v-dialog v-model="moneyDialog" max-width="450px">
                            <v-card>
                                <v-card-title class="light-blue darken-1 white--text px-4 py-1 btn-modify">
                                    請輸入數量及金額
                                    <v-spacer></v-spacer>
                                    <v-btn dark fab small text @click="moneyDialog = false" class="mr-n2">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-card-title>

                                <v-card-text class="px-6 py-4">
                                    <v-row>
                                        <v-col cols="12" sm="6">
                                            <h3 class="mb-1">
                                                <v-icon class="mr-1 mb-1">mdi-cash-usd</v-icon>單價
                                            </h3>
                                            <v-text-field
                                                v-model.trim.number="jobPrice"
                                                solo type="number"
                                                placeholder="請輸入單價"
                                                :rules="[v => Number.isFinite(v) || '請輸入整數或小數']"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <h3 class="mb-1">
                                                <v-icon class="mr-1 mb-1">mdi-hexagon-multiple</v-icon>數量
                                            </h3>
                                            <v-text-field
                                                v-model.trim.number="jobAmount"
                                                solo type="number"
                                                placeholder="請輸入數量"
                                                :rules="[v => Number.isFinite(v) || '請輸入整數或小數']"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="9"/>
                                        <v-col cols="12" sm="3" class="mt-n8">
                                            <v-btn class="btn-add" color="green" dark large @click="saveMoney">確定</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-dialog>
                    </template>

                    <template v-slot:item.Price="{ item }">
                        <span class="red--text font-weight-black">{{ item.Price }}</span>
                        <v-btn small dark fab color="info darken-1 btn-modify"
                            @click="showMoneyDialog(item)"
                            class="ml-4"
                        >
                            <v-icon dark>mdi-pen</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:footer>
                        <v-divider></v-divider>

                        <p class="py-2 text-center">
                            總費用： <span class="red--text">{{ new Intl.NumberFormat().format(totalMoney) }}</span>
                        </p>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>

    </v-row>

    <v-form
        ref="hourform"
        v-model="totalHourValid"
        lazy-validation
    >
        <v-row class="mt-8">
            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-clock</v-icon>總工時
                    <!-- <span class="red--text">*</span> -->
                </h3>
                <v-text-field
                    hide-details readonly
                    v-model.trim="totalHourCount"
                    solo type="number"
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <v-checkbox v-if="false"
                    class="mx-2 mt-sm-10"
                    v-model="crossShow"
                    label="選擇平交道項目"
                    color="success"
                    hide-details
                ></v-checkbox>
            </v-col>
        </v-row>
    </v-form>

    <!-- 平交道項目 -->
    <v-sheet class="white px-4 mt-1 mb-3 mx-2"
        v-if="crossShow"
    >
        <v-row no-gutters v-for="(group, gIndex) in groups" :key="'G_'+gIndex">
            <v-col cols="12" sm="12" md="12">
                <h3 class="pt-3 mb-n2 error--text">{{group.MaintainName}}</h3>
            </v-col>
            <v-row no-gutters >
                <v-col cols="12" sm="4" md="3" v-for="(item, iIndex) in group.ItemList" :key="'G_' + gIndex + '_i_' + iIndex">
                    <v-checkbox
                        v-model="accidents"
                        :label="item.Text"
                        color="info"
                        hide-details
                        :value="item.Text + ' ' + item.Value"
                        @change="checked"
                    ></v-checkbox>
                </v-col>
            </v-row>
            
        </v-row>
        <!-- <v-row>
            <v-col cols="12">
                <h3>車種</h3>
                <v-row no-gutters>
                    <v-col cols="12" sm="6" md="3">
                        <v-checkbox
                            class="mt-0"
                            v-model="crossItem.type.bus"
                            label="客車編組"
                            color="primary"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                        <v-checkbox
                            class="mt-0"
                            v-model="crossItem.type.hinoki"
                            label="檜木車編組"
                            color="primary"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                        <v-checkbox
                            class="mt-0"
                            v-model="crossItem.type.engineer"
                            label="工程車編組"
                            color="primary"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                        <v-checkbox
                            class="mt-0"
                            v-model="crossItem.type.trolley"
                            label="台車"
                            color="primary"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                        <v-checkbox
                            class="mt-0"
                            v-model="crossItem.type.locomotive"
                            label="機關車"
                            color="primary"
                            hide-details
                        ></v-checkbox>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12">
                <h3>方向</h3>
                <v-row no-gutters>
                    <v-col cols="12" sm="7" md="4">
                        <v-radio-group v-model="crossItem.direction.updown" row
                            class="mt-1"
                        >
                            <v-radio label="上行" value="top" color="red"></v-radio>
                            <v-radio label="下行" value="down" color="red"></v-radio>
                        </v-radio-group>
                    </v-col>

                    <v-col cols="12" sm="5" md="3">
                        <v-text-field
                            dense
                            label="車次"
                            v-model.trim="crossItem.direction.trip"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12">
                <h3>設施</h3>
                <v-row no-gutters class="d-flex align-center">
                    <v-col cols="12" md="5">
                        <v-checkbox
                            class="mt-0"
                            v-model="crossItem.eqAllerr"
                            label="平交道警報裝置全部失效"
                            color="primary"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="12" md="6">
                        <span class="red--text">(如非此項，請詳填下列設施異常情形)</span>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12">
                <h3>遮斷機</h3>
                <v-row no-gutters>
                    <v-col cols="12" sm="6" md="3">
                        <v-checkbox
                            class="mt-0"
                            v-model="crossItem.interrupter.allNotUp"
                            label="兩側皆無上升"
                            color="primary"
                            hide-details
                            :disabled="crossItem.eqAllerr"
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                        <v-checkbox
                            class="mt-0"
                            v-model="crossItem.interrupter.allNotDown"
                            label="兩側皆無下降"
                            color="primary"
                            hide-details
                            :disabled="crossItem.eqAllerr"
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                        <v-checkbox
                            class="mt-0"
                            v-model="crossItem.interrupter.southNotUp"
                            label="南側無上升"
                            color="primary"
                            hide-details
                            :disabled="crossItem.eqAllerr"
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                        <v-checkbox
                            class="mt-0"
                            v-model="crossItem.interrupter.southNotDown"
                            label="南側無下降"
                            color="primary"
                            hide-details
                            :disabled="crossItem.eqAllerr"
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                        <v-checkbox
                            class="mt-0"
                            v-model="crossItem.interrupter.northNotUp"
                            label="北側無上升"
                            color="primary"
                            hide-details
                            :disabled="crossItem.eqAllerr"
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                        <v-checkbox
                            class="mt-0"
                            v-model="crossItem.interrupter.northNotDown"
                            label="北側無下降"
                            color="primary"
                            hide-details
                            :disabled="crossItem.eqAllerr"
                        ></v-checkbox>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12">
                <h3>閃光燈</h3>
                <v-row no-gutters>
                    <v-col cols="12" md="6">
                        <v-radio-group v-model="crossItem.flash.side" row
                            class="mt-1"
                            :disabled="crossItem.eqAllerr"
                        >
                            <v-radio label="兩則" value="all" color="primary"></v-radio>
                            <v-radio label="南" value="south" color="primary"></v-radio>
                            <v-radio label="北" value="north" color="primary"></v-radio>
                        </v-radio-group>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-radio-group v-model="crossItem.flash.state" row
                            class="mt-1"
                            :disabled="crossItem.eqAllerr"
                        >
                            <v-radio label="不亮" value="noactive" color="red"></v-radio>
                            <v-radio label="不滅" value="noend" color="red"></v-radio>
                            <v-radio label="亮度異常" value="err" color="red"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12">
                <h3>駕駛燈</h3>
                <v-row no-gutters>
                    <v-col cols="12" md="6">
                        <v-radio-group v-model="crossItem.drive.color" row
                            class="mt-1"
                            :disabled="crossItem.eqAllerr"
                        >
                            <v-radio label="紅" value="red" color="primary"></v-radio>
                            <v-radio label="綠" value="green" color="primary"></v-radio>
                        </v-radio-group>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-radio-group v-model="crossItem.drive.state" row
                            class="mt-1"
                            :disabled="crossItem.eqAllerr"
                        >
                            <v-radio label="不亮" value="noactive" color="red"></v-radio>
                            <v-radio label="不滅" value="noend" color="red"></v-radio>
                            <v-radio label="亮度異常" value="err" color="red"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12">
                <h3>旋轉燈</h3>
                <v-row no-gutters>
                    <v-col cols="12" md="6">
                        <v-radio-group v-model="crossItem.spin.side" row
                            class="mt-1"
                            :disabled="crossItem.eqAllerr"
                        >
                            <v-radio label="兩則" value="all" color="primary"></v-radio>
                            <v-radio label="南" value="south" color="primary"></v-radio>
                            <v-radio label="北" value="north" color="primary"></v-radio>
                        </v-radio-group>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-radio-group v-model="crossItem.spin.state" row
                            class="mt-1"
                            :disabled="crossItem.eqAllerr"
                        >
                            <v-radio label="不亮" value="noactive" color="red"></v-radio>
                            <v-radio label="不滅" value="noend" color="red"></v-radio>
                            <v-radio label="亮度異常" value="err" color="red"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12">
                <h3>警音</h3>
                <v-row no-gutters>
                    <v-col cols="12">
                        <v-radio-group v-model="crossItem.warningTone" row
                            class="mt-1"
                            :disabled="crossItem.eqAllerr"
                        >
                            <v-radio label="無聲音" value="no" color="primary"></v-radio>
                            <v-radio label="太小聲" value="small" color="primary"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
            </v-col>
        </v-row> -->
    </v-sheet>

    <v-row class="mt-8">
        <v-col cols="12" class="text-center">
            <v-btn dark class="ma-2 btn-close"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <!-- <v-btn class="ma-2" dark
                :loading="isLoading"
                color="brown"
            >竣工單</v-btn> -->

            <template v-if="!done">
                <v-btn class="ma-2 btn-detail" dark
                    :loading="isLoading"
                    color="purple" v-if="isShowBtn"
                    @click="delay.dialogShow = true"
                >延後驗收</v-btn>

                <v-btn class="ma-2 btn-delete"
                    :loading="isLoading"
                    color="error" v-if="isShowBtn"
                    @click="showDialog(true)"
                >退回</v-btn>

                <v-btn class="ma-2 btn-memo" dark
                    :loading="isLoading"
                    color="yellow darken-2" v-if="isShowBtn"
                    @click="showDialog(false)"
                >徹銷</v-btn>

                <v-btn dark class="ma-2 btn-add"
                    :loading="isLoading"
                    color="success" v-if="isShowBtn"
                    @click="save"
                >同意驗收</v-btn>
            </template>
        </v-col>

        <!-- 按鈕說明，demo 用 -->
        <v-col cols="12" class="error--text">
            <h4>按鈕出現說明</h4>
            竣工單、延後驗收、退回、徹銷、送出：派工人、代理人
        </v-col>
    </v-row>

    <!-- 工作項金額 dialog -->

    <!-- 退回 撤銷 dialog -->
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-toolbar dark flat dense color="error" class="mb-2 btn-delete">
                <v-toolbar-title>{{ dialogTitle }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn fab small text @click="dialog = !dialog" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <!-- :title="controlsName[i]+'證據'" -->

            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-textarea
                            hide-details :placeholder="'請輸入'+dialogTitle"
                            auto-grow
                            outlined
                            rows="8"
                            v-model.trim="reason"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            
            <v-card-actions class="px-5 pb-5">
                <v-spacer></v-spacer>
                <v-btn class="mr-2 btn-clear" elevation="4" :loading="isLoading" @click="dialog = false">取消</v-btn>
                <v-btn class="btn-delete" color="success"  elevation="4" :loading="isLoading" @click="withdraw">{{ dialogBtnTxt }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- 延後驗收 dialog -->
    <v-dialog v-model="delay.dialogShow" max-width="600px">
        <v-card>
            <v-toolbar dark flat dense color="purple" class="mb-2 btn-add">
                <v-toolbar-title>延後驗收</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn fab small text @click="delay.dialogShow = false" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <h3 class="mb-1">
                            <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>新驗收日
                        </h3>
                        <v-menu
                            v-model="delay.menuShow"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model.trim="delay.newDate"
                                    solo
                                    v-on="on"
                                    readonly
                                    hide-details
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                color="purple"
                                v-model="delay.newDate"
                                @input="delay.menuShow = false"
                                locale="zh-tw"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>

                    <v-col cols="12" sm="6" md="4" offset-md="2" align-self="center">
                        <v-checkbox
                            v-model="delay.shortage"
                            label="缺料"
                            color="red darken-3"
                            class="mt-0 mt-sm-6"
                            hide-details
                        ></v-checkbox>
                    </v-col>
                    
                    <v-col cols="12">
                        <h3 class="mb-1">
                            <v-icon class="mr-1 mb-1">mdi-note</v-icon>延後原因
                        </h3>
                        <v-textarea
                            placeholder="請輸入延後原因"
                            hide-details
                            auto-grow
                            solo
                            rows="6"
                            v-model.trim="delay.reason"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            
            <v-card-actions class="px-5 pb-5">
                <v-spacer></v-spacer>
                <v-btn class="mr-2 btn-clear" elevation="4" :loading="isLoading" @click="delay.dialogShow = false">取消</v-btn>
                <v-btn class="btn-add" color="success"  elevation="4" :loading="isLoading" @click="delaySave">送出</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import FileListShow from '@/components/FileListShow.vue'
import TopBasicTable from '@/components/TopBasicTable.vue'
import BottomTable from '@/components/BottomTable.vue'
import { acceptanceOrder, withdrawOrder, cancelOrder, delayOrder, railroadrepairList } from '@/apis/workList/maintain'

export default {
    props: ['itemData'],
    data: () => ({
        isShowBtn: false,
        groups: [], //
        files: [],  // 上傳的檔案
        accidents: [],
        done: false,  // 是否完成頁面操作
        totalHourValid: true,  // 總工時是否驗證欄位
        isLoading: false,  // 是否讀取中
        workNumber: '',  // 工單編號
        dialog: false,  // dialog 是否顯示
        dialogTitle: '',  // dialog 標題
        dialogBtnTxt: '', // dialog 按鈕內容
        dialogApiName: '',  // 使用的 API 函式名稱
        reason: '',  // 退回或徹銷原因
        dialogReturnMsg: '',  // 退回或徹銷時成功的訊息 (demo 時用)
        tableItems: [],  // 工時表格資料
        tableItems_fee: [],  // 費用表格資料
        headers: [  // 工時標題
            { text: '姓名', value: 'PeopleName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '地點', value: 'Location', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '工作項', value: 'JobName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '工作量(hr)', value: 'WorkLoad', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        ],
        headers_fee: [  // 工時標題
            // { text: '姓名', value: 'PeopleName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '工作項', value: 'JobName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
            { text: '單價', value: 'UnitPrice', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' , width: 100 },
            { text: '數量', value: 'Amount', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
            { text: '小計', value: 'Price', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' , width: 100 },
            // { text: '編輯費用', value: 'Price_e', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' , width: 90 },
        ],
        jobAmount: '', // 工作項數量
        jobPrice: '', // 工作項金額
        moneyDialog: false,  // 金額 dialog 是否顯示
        editIdx: 0,  // 總工時編輯中資料的索引值
        totalHour: '',  // 總工時
        delay: {  // 延後驗收
            dialogShow: false,
            menuShow: false,  // 日期選單是否顯示
            reason: '',  // 原因
            newDate: new Date().toISOString().substr(0, 10),  // 新驗收日
            shortage: false,  // 是否缺料
        },
        topItems: [],  // 上面的欄位
        bottomItems: [],  // 下面的欄位
        crossShow: false,  // demo 用的平交道項目是否顯示
        crossItem: {  // 平交道項目
            type: {  // 車種
                bus: false, // 客車
                hinoki: false, // 檜木車
                engineer: false, // 工程車
                trolley: false, // 台車
                locomotive: false, // 機關車
            },
            direction: {  // 方向
                updown: 'top',  // 上(top)、下(down)行
                trip: '',  // 車次
            },
            eqAllerr: false,  // 設施，平交道警報裝置全部失效
            interrupter: {  // 遮斷機
                allNotUp: false,  // 兩側皆無上升
                allNotDown: false,  // 兩側皆無下降
                southNotUp: false,  // 南側無上升
                southNotDown: false,  // 南側無下降
                northNotUp: false,  // 北側無上升
                northNotDown: false,  // 北側無下降
            },
            flash: {  // 閃光燈
                side: '',  // 位置，兩則(all)、南(south)、北(north)
                state: '',  // 狀態，不亮(noactive)、不滅(noend)、亮度異常(err)
            },
            drive: {  // 駕駛燈
                color: '',  // 燈號顏色，紅(red)、綠(green)
                state: '',  // 狀態，不亮(noactive)、不滅(noend)、亮度異常(err)
            },
            spin: {  // 旋轉燈
                side: '',  // 位置，兩則(all)、南(south)、北(north)
                state: '',  // 狀態，不亮(noactive)、不滅(noend)、亮度異常(err)
            },
            warningTone: '',  // 警音，無聲音(no)、太小聲(small)
        },
    }),
    components: {
        TopBasicTable,
        BottomTable,
        FileListShow,
    },
    watch: {
        // 平交道警報裝置全部失效(有勾選)的話，設施回復預設值
        'crossItem.eqAllerr': function(val) {
            if (val) {
                this.crossItem = Object.assign(this.crossItem, {
                    interrupter: {  // 遮斷機
                        allNotUp: false,
                        allNotDown: false,
                        southNotUp: false,
                        southNotDown: false,
                        northNotUp: false,
                        northNotDown: false,
                    },
                    flash: {  // 閃光燈
                        side: '',
                        state: '',
                    },
                    drive: {  // 駕駛燈
                        color: '',
                        state: '',
                    },
                    spin: {  // 旋轉燈
                        side: '',
                        state: '',
                    },
                    warningTone: '',  // 警音
                })
            }
        },
    },
    watch: {
        checkArr(val) {
            this.accidents = [ ...val ]
        }
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
        // 工時統計的總金額
        totalHourCount() {
            return this.tableItems.reduce((a,b)=>a + +b.WorkLoad, 0)
        },
        // 工時統計的總金額
        totalMoney() {
            return this.tableItems_fee.reduce((a,b)=>a + +b.Price, 0)
        }
        
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'closeWindow',  // 關閉視窗
        ]),
        // 選擇
        checked() {
            // this.$emit('checkAccident', this.accidents)
        },
        isRealNum(val){
            // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，
            
        　　if(val === "" || val ==null){
                return false;
        　　}
        if(!isNaN(val)){　　　　
        //对于空数组和只有一个数值成员的数组或全是数字组成的字符串，
        //isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,
        //所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
        　　　 return true; 
        　　}

        　else{ 
        　　　　return false; 
        　　} 
        },
        // 初始化資料
        setShowData(obj) {
            this.isShowBtn = obj.AgentID == this.userData.UserId || obj.DispatchID == this.userData.UserId
            this.workNumber = obj.WorkOrderID  // 工單編號
            this.topItems = obj.topItems  // 上面的欄位資料
            this.bottomItems = obj.bottomItems  // 下面的欄位資料
            this.files = [ ...obj.FileCount ]  // 檔案附件
            this.tableItems = [ ...obj.WorkTimeCount ]  // 人員工時資料
            let tempFeeTable = [...obj.WorkMaterialList]
            // this.tableItems_fee = [ ...obj.WorkTimeCount ]  // 工時資料
            //工作項 清單
            let tempWorkList = this.tableItems.map(e => e.JobName)
            //工作項清單 移除空白
            tempWorkList = tempWorkList.filter(function(n){ return n != ''});
            //工作項清單 移除重複值
            tempWorkList = tempWorkList.filter(function(ele , pos){
                return tempWorkList.indexOf(ele) == pos;
            }) 
            this.tableItems_fee = tempWorkList.map(item => ({
                MaintainCode_Eqp: this.tableItems.find(ele => ele.JobName == item).MaintainCode_Eqp,
                MaintainCode_Seq: this.tableItems.find(ele => ele.JobName == item).MaintainCode_Seq,
                MaintainCode_AllName: this.tableItems.find(ele => ele.JobName == item).MaintainCode_AllName,
                JobCode: this.tableItems.find(ele => ele.JobName == item).JobCode,
                JobName: item,
                UnitPrice: tempFeeTable.find(ele => ele.JobName == item).UnitPrice,
                Amount: this.tableItems.find(ele => ele.JobName == item).WorkLoad,
                Price: tempFeeTable.find(ele => ele.JobName == item).Price,
            }))
            // 要求 平交道項目清單
            railroadrepairList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    this.groups = res.data.RailRepairCount;
                } else {
                    this.$router.push({ path: '/error' })
                }
            }).catch(err => {
                this.chMsgbar({ success: false, msg: '伺服器發生問題，操作失敗' })
            }).finally(() => {
                this.isLoading = this.delay.dialogShow = false
            })
        },
        // 顯示金額Dialog
        showMoneyDialog(item) {
            this.editIdx = this.tableItems_fee.indexOf(item)  // 編輯中的資料索引
            this.jobAmount = item.Amount  // 現有值帶入
            this.jobPrice = item.UnitPrice  // 現有值帶入
            this.moneyDialog = true
        },
        // 確定工作項金額
        saveMoney() {
            this.tableItems_fee[this.editIdx].UnitPrice = this.jobPrice
            this.tableItems_fee[this.editIdx].Amount = this.jobAmount
            this.tableItems_fee[this.editIdx].Price = this.jobAmount * this.jobPrice
            this.moneyDialog = false
        },
        // 顯示 dialog
        showDialog(bool) {
            // 若為 true 是退回、false 是徹銷
            this.dialogTitle = (bool)? '退回原因' : '徹銷原因'
            this.dialogBtnTxt = this.dialogTitle.substr(0, 2)
            this.dialogApiName = bool  // true 為退回，false 為徹銷
            this.dialogReturnMsg = (bool)? '退回成功' : '徹銷成功'
            this.dialog = true
        },
        // 退回、徹銷
        withdraw() {
            let tipMsg = (this.reason == '')?'退回原因為空白，確定退回嗎?':'是否確定退回?';
            if (confirm(tipMsg)){
                this.isLoading = true

                if (this.dialogApiName) {
                    withdrawOrder({
                        WorkOrderID: this.workNumber,  // 工單編號
                        ReturnReason: this.reason,  // 退回原因
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
                } else {
                    cancelOrder({
                        WorkOrderID: this.workNumber,  // 工單編號
                        CancelReason: this.reason,  // 徹銷原因
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
                }
            }
            
        },
        // 送出 (同意驗收)
        save() {
            if (confirm('你確定要驗收嗎?')) {
                this.chLoadingShow({show:true})
                // 整理平交道項目
                let resultCrossItem = [];
                this.accidents.forEach(ele => {
                    let words = ele.split(' ');
                    // var obj = new Object();
                    // obj.DescName = words[0];
                    // obj.DescCode = words[1];
                    resultCrossItem.push({DescName:words[0], DescCode:words[1]})
                });

                acceptanceOrder({
                    WorkOrderID: this.workNumber,  // 工單編號
                    TotalSpent: this.totalMoney,  // 總金額
                    TotalWorkTime: this.totalHourCount,  // 總工時
                    // WorkTimeData: this.tableItems,  // 工時統計資料
                    MaterialData: this.tableItems_fee,
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                    Railroadrepair: resultCrossItem,
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '送出成功' })
                        this.done = true  // 隱藏頁面操作按鈕
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，送出失敗' })
                }).finally(() => {
                    this.chLoadingShow({show:false})
                    // this.$refs.form.resetValidation()  // 取消欄位驗證的紅字樣式
                })
            }
        },
        // 延後驗收
        delaySave() {
            this.isLoading = true

            delayOrder({
                WorkOrderID: this.workNumber,  // 工單編號
                DelayDTime: this.delay.newDate,  // 延後驗收時間
                DelayReason: this.delay.reason,  // 延後驗收原因
                LostMateriel: (this.delay.shortage)? 'T' : 'F',  // 是否缺料
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    this.chMsgbar({ success: true, msg: '延後驗收成功' })
                    this.done = true  // 隱藏頁面操作按鈕
                } else {
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
            }).catch(err => {
                this.chMsgbar({ success: false, msg: '伺服器發生問題，操作失敗' })
            }).finally(() => {
                this.isLoading = this.delay.dialogShow = false
            })
        }
    },
    created() {
        this.setShowData(this.itemData)
    }
}
</script>