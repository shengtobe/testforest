<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">工單編號：{{ workNumber }}</h2>

    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8">
        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-pen</v-icon>故障描述
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="malfunctionDes"
                ></v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-note</v-icon>備註
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="note"
                ></v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>需證照人員
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ licensedMember }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>作業人員
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ commonMember }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>外包廠商
                    </span>
                </v-col>

                <v-col class="white pa-3">{{ vendorsList }}</v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-wrench</v-icon>維修情況
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="fixSituation"
                ></v-col>
            </v-row>
        </v-col>
        
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
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:footer>
                        <v-divider></v-divider>

                        <p class="py-2 text-center">
                            總金額： <span class="red--text">{{ totalMoney }}</span>
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
                    <span class="red--text">*</span>
                </h3>
                <v-text-field
                    v-model.trim="totalHour"
                    solo
                    placeholder="請輸入總工時，例如：5"
                    :rules="[v => /^\d+$/.test(v) || '請輸入整數']"
                ></v-text-field>
            </v-col>
        </v-row>
    </v-form>

    <!-- 平交道項目 -->
    <v-checkbox
        class="mx-2"
        v-model="crossShow"
        label="選擇平交道項目"
        color="success"
        hide-details
    ></v-checkbox>

    <v-sheet class="white px-4 mt-1 mb-3 mx-2"
        v-if="crossShow"
    >
        <v-row>
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
        </v-row>
    </v-sheet>

    <!-- 工時統計 -->
    <!-- <h3 class="mb-1">
        <v-icon class="mr-1 mb-1">mdi-table</v-icon>工時統計
        <span class="red--text">*</span>
        <v-btn fab dark small color="indigo"
            @click="setJobHour(false)"
            class="ml-2 mb-1"
        >
            <v-icon dark>mdi-plus</v-icon>
        </v-btn>
    </h3>

    <v-card>
        <v-data-table
            :headers="jobHour.headers"
            :items="jobHour.items"
            disable-sort
            disable-filtering
            hide-default-footer
        >
            <template v-slot:no-data>
                <span class="red--text subtitle-1">沒有資料</span>
            </template>

            <template v-slot:top>
                <v-dialog v-model="jobHour.dialogShow" max-width="600px">
                    <v-card>
                        <v-card-title class="light-blue darken-1 white--text px-4 py-1">
                            {{ jobHour.titleName }}
                            <v-spacer></v-spacer>
                            <v-btn dark fab small text @click="jobHour.dialogShow = false" class="mr-n2">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-card-title>

                        <v-card-text class="px-6 py-4">
                            <v-form
                                ref="setjobform"
                                v-model="jobFormValid"
                                lazy-validation
                            >
                                <v-row>
                                    <v-col cols="12" sm="4" v-if="!jobHour.isEdit">
                                        <h3 class="mb-1">
                                            <v-icon class="mr-1 mb-1">mdi-account</v-icon>姓名
                                        </h3>
                                        <v-select
                                            v-model="jobForm.uid"
                                            :items="jobMemberOpts"
                                            solo
                                        ></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="4">
                                        <h3 class="mb-1">
                                            <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>地點
                                            <span class="red--text">*</span>
                                        </h3>
                                        <v-text-field
                                            v-model.trim="jobForm.location"
                                            solo
                                            :rules="[v => (!!v && /[^\s]/.test(v)) || '此欄位不可空白']"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="4">
                                        <h3 class="mb-1">
                                            <v-icon class="mr-1 mb-1">mdi-format-list-bulleted</v-icon>工作項
                                        </h3>
                                        <v-select
                                            v-model="jobForm.job"
                                            :items="['鋼軌', '枕木']"
                                            solo
                                        ></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="4">
                                        <h3 class="mb-1">
                                            <v-icon class="mr-1 mb-1">mdi-calculator</v-icon>工作量
                                            <span class="red--text">*</span>
                                        </h3>
                                        <v-text-field
                                            v-model.trim.number="jobForm.count"
                                            solo
                                            :rules="[v => (!!v && /[^\s]/.test(v)) || '此欄位不可空白']"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="4">
                                        <h3 class="mb-1">
                                            <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>料件費用
                                            <span class="red--text">*</span>
                                        </h3>
                                        <v-text-field
                                            v-model.trim.number="jobForm.price"
                                            solo
                                            :rules="[v => /^\d+$/.test(v) || '請輸入整數']"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card-text>
                        
                        <v-card-actions class="px-5 pb-5">
                            <v-spacer></v-spacer>
                            <v-btn class="mr-2" elevation="4" @click="jobHour.dialogShow = false">取消</v-btn>
                            <v-btn color="success" elevation="4" @click="saveJob">送出</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </template>

            <template v-slot:item.uid="{ item }">
                {{ getJobMemberName(item.uid) }}
            </template>

            <template v-slot:item.price="{ item }">
                {{ new Intl.NumberFormat().format(item.price) }}
            </template>

            <template v-slot:item.action="{ item }">
                <v-btn small dark fab color="info darken-1"
                    @click="setJobHour(true, item)"
                >
                    <v-icon dark>mdi-pen</v-icon>
                </v-btn>
            </template>

            <template v-slot:footer>
                <v-divider></v-divider>

                <p class="py-2 text-center">
                    總金額： <span class="red--text">{{ totalMoney }}</span>
                </p>
            </template>
        </v-data-table>
    </v-card> -->

    <v-row class="mt-8">
        <v-col cols="12" class="text-center">
            <v-btn dark class="ma-2"
                :loading="isLoading"
                to="/worklist/maintain"
            >回搜尋頁</v-btn>

            <v-btn class="ma-2" dark
                :loading="isLoading"
                color="brown"
            >竣工單</v-btn>

            <v-btn class="ma-2" dark
                :loading="isLoading"
                color="purple"
                @click="delay.dialogShow = true"
            >延後驗收</v-btn>

            <v-btn class="ma-2"
                :loading="isLoading"
                color="error"
                @click="showDialog(true)"
            >退回</v-btn>

            <v-btn class="ma-2" dark
                :loading="isLoading"
                color="yellow darken-2"
                @click="showDialog(false)"
            >徹銷</v-btn>

            <v-btn dark class="ma-2"
                :loading="isLoading"
                color="success"
                @click="save"
            >同意驗收</v-btn>
        </v-col>

        <!-- 按鈕說明，demo 用 -->
        <v-col cols="12" class="error--text">
            <h4>按鈕出現說明</h4>
            竣工單、延後驗收、退回、徹銷、送出：派工人、代理人
        </v-col>
    </v-row>

    <!-- 退回 dialog -->
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-toolbar dark flat dense color="error" class="mb-2">
                <v-toolbar-title>{{ dialogTitle }}</v-toolbar-title>
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
                <v-btn class="mr-2" elevation="4" :loading="isLoading" @click="dialog = false">取消</v-btn>
                <v-btn color="success"  elevation="4" :loading="isLoading" @click="withdraw">送出</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- 延後驗收 dialog -->
    <v-dialog v-model="delay.dialogShow" max-width="600px">
        <v-card>
            <v-toolbar dark flat dense color="purple" class="mb-2">
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
                <v-btn class="mr-2" elevation="4" :loading="isLoading" @click="delay.dialogShow = false">取消</v-btn>
                <v-btn color="success"  elevation="4" :loading="isLoading" @click="delaySave">送出</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import TopBasicTable from '@/components/TopBasicTable.vue'

export default {
    data: () => ({
        routeId: '',  // 路由id
        totalHourValid: true,  // 總工時是否驗證欄位
        jobFormValid: true,  // 工時統計是否驗證欄位
        isLoading: false,  // 是否讀取中
        workNumber: '',  // 工單編號
        note: '',  // 備註
        licensedMember: '',  // 需證照人員
        commonMember: '',  // 作業人員
        vendors: [],  // 外包廠商
        malfunctionDes: '',  // 故障描述
        fixSituation: '',  // 維修情況
        dialog: false,  // dialog 是否顯示
        dialogTitle: '',  // dialog 標題
        dialogApiName: '',  // 使用的 API 函式名稱
        reason: '',  // 退回或徹銷原因
        dialogReturnMsg: '',  // 退回或徹銷時成功的訊息 (demo 時用)
        tableItems: [],  // 工時表格資料
        headers: [  // 工時標題
            { text: '姓名', value: 'name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '地點', value: 'location', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '工作項', value: 'job', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '工作量', value: 'count', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
                { text: '料件費用', value: 'price', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
        totalHour: '',  // 總工時
        // jobHour: {  // 工時
        //     dialogShow: false,
        //     isEdit: false,  // 是否為編輯模式
        //     titleName: '',  // dialog 標題人名
        //     headers: [
        //         { text: '姓名', value: 'uid', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '地點', value: 'location', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '工作項', value: 'job', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '工作量', value: 'count', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '料件費用', value: 'price', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //         { text: '編輯', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        //     ],
        //     items: [],
        //     editIdx: 0,  // 編輯中資料的索引值
        //     totalHour: '',  // 總工時
        // },
        // jobMemberOpts: [  // 工時統計時人名下拉選單
        //     { text: '陳高文', value: 'k11839'},
        //     { text: '張仁宣', value: 'k55830'},
        // ],
        // jobForm: {}, // 工時表單
        // defaultJobForm: {  // 工時預設表單
        //     'uid': '',
        //     'name': '',
        //     'location': '',
        //     'job': '',
        //     'count': 1, 
        //     'price': 0,
        // },
        // jobFormIsEdit: false,  // 工時表單是否為編輯模式
        delay: {  // 延後驗收
            dialogShow: false,
            menuShow: false,  // 日期選單是否顯示
            reason: '',  // 原因
            newDate: new Date().toISOString().substr(0, 10),  // 新驗收日
            shortage: false,  // 是否缺料
        },
        topItems: {  // 上面的欄位
            fixTime: { icon: 'mdi-calendar-text', title: '報修時間', text: '' },
            eqCodes: { icon: 'mdi-codepen', title: '設備標示編號', text: '' },
            status: { icon: 'mdi-ray-vertex', title: '處理階段', text: '' },
            createrDepart: { icon: 'mdi-apps', title: '立案單位', text: '' },
            creater: { icon: 'mdi-account', title: '立案人', text: '' },
            fixUnit: { icon: 'mdi-apps', title: '維修單位', text: '' },
            dispatcher: { icon: 'mdi-account', title: '派工人', text: '' },
            agent: { icon: 'mdi-account', title: '代理人', text: '' },
            fixType: { icon: 'mdi-source-branch', title: '維修類型', text: '' },
            workDate: { icon: 'mdi-calendar-text', title: '維修日期', text: '' },
            acceptanceTime: { icon: 'mdi-calendar-text', title: '預計驗收日期', text: '' },
            enterControl: { icon: 'mdi-alert-outline', title: '進場管制申請', text: '' },
            specialDanger: { icon: 'mdi-alert-outline', title: '特殊危害作業', text: '' },
            safeDanger: { icon: 'mdi-alert-outline', title: '安全危害作業', text: '' },
            workLocation: { icon: 'mdi-map-marker', title: '工作地點', text: '' },
            memberCount: { icon: 'mdi-account-multiple', title: '實際人數', text: '' },
            arrivalFixDate: { icon: 'mdi-calendar-text', title: '到修日期', text: '' },
            startFixDate: { icon: 'mdi-calendar-text', title: '動工日期', text: '' },
            endFixDate: { icon: 'mdi-calendar-text', title: '完工日期', text: '' },
        },
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
    components: { TopBasicTable },
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
    computed: {
        // 合併外包廠商字串
        vendorsList() {
            let arr = this.vendors.map(item => {
                return `${ item.name } (${ item.count }人)`
            })
            return arr.join('、')
        },
        // 工時統計的總金額
        totalMoney() {
            let total = this.tableItems.reduce((a,b)=>a + b.price, 0)
            return new Intl.NumberFormat().format(total)
        }
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 向後端取資料
        fetchData() {
            this.chLoadingShow()
            let id = this.$route.params.id  // 路由參數

            // 範例效果
            setTimeout(() => {
                // 向後端請求資料
                let obj = {
                    workNumber: '202004290001',  // 工單編號
                    eqNumber1: 'TQG',
                    eqNumber2: 'A35',
                    eqNumber3: 'EA0',
                    eqNumber4: '013',
                    fixUnit: '車輛組',  // 立案單位
                    creater: '陳小華',  // 立案人
                    dispatcher: '黃小美',  // 派工人
                    agent: '王小明',  // 代理人
                    fixTime: '201903110001',  // 報修時間
                    workDate: '2020-03-15',  // 維修日期
                    hour: '14:00:00',  // 維修時間(小時)
                    workLocation: '115k-120k',  // 工作地點
                    memberCount: 12,  // 實際人數
                    acceptanceTime: '2020-03-22',  // 預計驗收日期
                    arrivalFixDate: '2020-03-15 14:00:00',  // 到修日期
                    startFixDate: '2020-03-15 15:00:00',  // 動工日期
                    endFixDate: '2020-03-15 16:00:00',  // 完工日期
                    licensedMember: ['陳高文'],  // 有證照人員
                    commonMember: ['張仁宣'],  // 無證照人員
                    vendors: [  // 外包廠商
                        { name: 'XX 電子', count: 2 },
                        { name: '○○ 鋼鐵', count: 1 },
                        { name: 'XXX 工廠', count: 5 },
                    ],
                    enterControl: false,  // 進場管制申請
                    specialDanger: false,  // 特殊危害作業
                    safeDanger: false,  // 安全危害作業
                    malfunctionDes: '工具機損壞',  // 故障描述
                    note: '',  // 備註
                    status: '已維修待驗收',  // 狀態
                    fixSituation: '小零件損壞，更換了xxxx',  // 維修情況
                    fixType: '故障檢修',  // 維修類型
                    jobHourData: [  // 工時資料
                        {
                            name: '陳高文',
                            location: '115k-120k',
                            job: '枕木',
                            count: 1,
                            price: 3000,
                        },
                        {
                            name: '張仁宣',
                            location: '115k-120k',
                            job: '鋼軌',
                            count: 1,
                            price: 6000,
                        },
                    ],
                }

                this.setShowData(obj)  // 初始化資料
                this.chLoadingShow()
            }, 1000)
        },
        // 初始化資料
        setShowData(obj) {
            this.workNumber = obj.workNumber  // 工單編號
            this.malfunctionDes = obj.malfunctionDes.replace(/\n/g, '<br>')  // 故障描述
            this.note = obj.note.replace(/\n/g, '<br>')  // 備註
            this.fixSituation = obj.fixSituation.replace(/\n/g, '<br>')  // 維修情況

            // 設定上面的欄位資料
            this.topItems.fixTime.text = obj.fixTime  // 報修時間
            this.topItems.eqCodes.text = `${obj.eqNumber1}-${obj.eqNumber2}-${obj.eqNumber3}-${obj.eqNumber4}`  // 設備標示編號
            this.topItems.status.text = obj.status  // 處理階段
            this.topItems.fixUnit.text = obj.fixUnit  // 立案單位
            this.topItems.creater.text = obj.creater  // 立案人
            this.topItems.fixUnit.text = obj.fixUnit  // 維修單位
            this.topItems.dispatcher.text = obj.dispatcher  // 派工人
            this.topItems.agent.text = obj.agent  // 代理人
            this.topItems.fixType.text = obj.fixType  // 維修類型
            this.topItems.workDate.text = `${obj.workDate} ${obj.hour}`  // 維修日期
            this.topItems.acceptanceTime.text = obj.acceptanceTime  // 預計驗收日期
            this.topItems.enterControl.text = (obj.enterControl)? '是' : '否'  // 進場管制申請
            this.topItems.specialDanger.text = (obj.specialDanger)? '是' : '否'  // 特殊危害作業
            this.topItems.safeDanger.text = (obj.safeDanger)? '是' : '否'  // 安全危害作業
            this.topItems.workLocation.text = obj.workLocation  // 工作地點
            this.topItems.memberCount.text = obj.memberCount  // 實際人數
            this.topItems.arrivalFixDate.text = obj.arrivalFixDate  // 到修日期
            this.topItems.startFixDate.text = obj.startFixDate  // 動工日期
            this.topItems.endFixDate.text = obj.endFixDate  // 完工日期

            this.licensedMember = obj.licensedMember.join('、')  // 需證照人員
            this.commonMember = obj.commonMember.join('、')  // 作業人員
            this.vendors = obj.vendors  // 外包廠商
            this.tableItems = [ ...obj.jobHourData ]  // 工時資料

            // // 工時表單初始化
            // this.jobHour.items = this.jobMemberOpts.map(item => ({
            //     'uid': item.value,
            //     'name': item.text,
            //     'location': obj.workLocation,
            //     'job': '',
            //     'count': 1, 
            //     'price': 0,
            // }))
        },
        // 顯示 dialog
        showDialog(bool) {
            // 若為 true 是退回、false 是徹銷
            this.dialogTitle = (bool)? '退回原因' : '徹銷原因'
            this.dialogApiName = (bool)? 'api1' : 'api2'
            this.dialogReturnMsg = (bool)? '退回成功' : '徹銷成功'
            this.dialog = true
        },
        // 退回、徹銷
        withdraw() {
            this.isLoading = true

            // 由 this.dialogApiName 來判斷要傳送的 API
            
            // 範例效果
            setTimeout(() => {
                // 退回完後，轉頁到搜尋頁
                this.chMsgbar({ success: true, msg: this.dialogReturnMsg })
                this.$router.push({ path: '/worklist/maintain' })
            }, 1000)
        },
        // 送出 (同意驗收)
        save() {
            if (confirm('你確定要驗收嗎?')) {
                this.isLoading = true

                // 範例效果
                setTimeout(() => {
                    // 驗收完後，轉頁到搜尋頁
                    this.chMsgbar({ success: true, msg: '驗收成功' })
                    this.$router.push({ path: '/worklist/maintain' })
                }, 1000)
            }
        },
        // // 填寫工時 (參數 isEdit 為 true 時為編輯模式，item 則為要編輯的資料)
        // setJobHour(isEdit, item) {
        //     if (isEdit == false) {
        //         // 新增時
        //         this.jobHour.isEdit = false
        //         this.jobForm = { ...this.defaultJobForm }
        //         this.jobForm.location = this.topItems.workLocation.text  // 工作地點
        //         this.jobHour.titleName = '新增資料'
        //     } else {
        //         // 編輯時
        //         this.jobHour.isEdit = true
        //         this.jobHour.editIdx = this.jobHour.items.indexOf(item)  // 編輯中的資料索引
        //         this.jobForm = { ...item }  // 現有值帶入表單
        //         this.jobHour.titleName = `編輯資料 - ${item.name}`
        //     }
        //     this.jobHour.dialogShow = true
        // },
        // // 儲存工作表單
        // saveJob() {
        //      if (this.jobHour.isEdit == false) {
        //         // 新增時 (照林鐵人員要求，新增後不關閉視窗)
        //         this.jobHour.items.push(this.jobForm)
        //     } else {
        //         // 編輯時
        //         Object.assign(this.jobHour.items[this.jobHour.editIdx], this.jobForm)
        //         this.jobHour.dialogShow = false
        //     }
        // },
        // // 依 uid 查詢工時成員的名稱
        // getJobMemberName(uid) {
        //     return this.jobMemberOpts.find(item => item.value == uid).text
        // },
        // 延後驗收送出
        delaySave() {
            this.isLoading = true

            // 範例效果
            setTimeout(() => {
                // 延後驗收完後，轉頁到搜尋頁
                this.chMsgbar({ success: true, msg: '延後驗收成功' })
                this.$router.push({ path: '/worklist/maintain' })
            }, 1000)
        }
    },
    created() {
        this.fetchData()
    }
}
</script>