<template>
<v-container style="max-width: 1200px">
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
        <h2 class="mb-4">工單編號：{{ ipt.workNumber }}</h2>

        <!-- 基本資訊 -->
        <v-row class="px-2">
            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>預計驗收日期
                </h3>
                <v-menu
                    v-model="acceptDateMenuShow"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model.trim="ipt.acceptanceTime"
                            solo
                            readonly
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        color="purple"
                        v-model="ipt.acceptanceTime"
                        @input="acceptDateMenuShow = false"
                        locale="zh-tw"
                    ></v-date-picker>
                </v-menu>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-account</v-icon>代理人
                </h3>
                <v-select
                    v-model="ipt.agent"
                    :items="agentOpts"
                    solo
                ></v-select>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>工作地點
                </h3>
                <v-text-field
                    v-model.trim="ipt.workLocation"
                    solo
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>實際人數
                </h3>
                <v-text-field
                    v-model.trim.number="ipt.memberCount"
                    solo
                ></v-text-field>
            </v-col>
        </v-row>

        <v-sheet class="white mx-2 px-4" elevation="2">
            <v-row no-gutters>
                <v-col cols="12" sm="6" md="3" class="px-2">
                    <v-switch
                        class="pl-1"
                        color="green"
                        v-model="ipt.enterControl"
                        :label="`進場管制申請： ${(ipt.enterControl)? '是' : '否'}`"
                    ></v-switch>
                </v-col>

                <v-col cols="12" sm="6" md="3" class="px-2">
                    <v-switch
                        class="pl-1"
                        color="green"
                        v-model="ipt.specialDanger"
                        :label="`特殊危害作業： ${(ipt.specialDanger)? '是' : '否'}`"
                    ></v-switch>
                </v-col>

                <v-col cols="12" sm="6" md="3" class="px-2">
                    <v-switch
                        class="pl-1"
                        color="green"
                        v-model="ipt.safeDanger"
                        :label="`安全危害作業： ${(ipt.safeDanger)? '是' : '否'}`"
                    ></v-switch>
                </v-col>
            </v-row>
        </v-sheet>
        
        <!-- 平交道項目 -->
        <v-checkbox
            class="mx-2"
            v-model="demoShow"
            label="平交道項目 (demo用)"
            color="success"
            hide-details
        ></v-checkbox>

        <v-sheet class="white px-4 mt-1 mb-3 mx-2"
            v-if="demoShow"
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
        
        <v-row class="px-2 mt-8"> 
            <v-col cols="12">
                <h3 class="mb-2">
                    <v-icon class="mr-1 mb-1">mdi-pen</v-icon>故障描述
                </h3>
                <v-textarea
                    auto-grow
                    solo
                    rows="6"
                    placeholder="請輸入故障描述"
                    v-model.trim="ipt.malfunctionDes"
                ></v-textarea>
            </v-col>
        </v-row>

        <!-- 林鐵人員 -->
        <v-row class="px-2">
            <v-col cols="12" md="7">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-account-star</v-icon>需證照人員
                </h3>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-select
                            v-model="hasLicenLv1Select"
                            :items="hasLicenseOptLv1"
                            solo
                        ></v-select>
                    </v-col>

                    <v-col cols="12" sm="4">
                        <v-select
                            v-model="hasLicenLv2Select"
                            :items="hasLicenseOptLv2"
                            solo
                        ></v-select>
                    </v-col>

                    <v-col cols="2">
                        <v-btn fab dark small color="indigo"
                            @click="addMember(hasLicenLv2Select, true)"
                        >
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12" md="5">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-account</v-icon>作業人員
                </h3>
                <v-row>
                    <v-col cols="12" sm="4" md="6">
                        <v-select
                            v-model="noLicenSelect"
                            :items="noLicenseOpt"
                            solo
                        ></v-select>
                    </v-col>

                    <v-col cols="2">
                        <v-btn fab dark small color="indigo"
                            @click="addMember(noLicenSelect, false)"
                        >
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12">
                <h3 class="mb-1 mt-n3">
                    <v-icon class="mr-1 mb-1">mdi-account</v-icon>林鐵人員統計
                </h3>

                <!-- 有證照 -->
                <v-chip
                    v-for="(item, idx) in ipt.licensedMember"
                    :key="item"
                    class="mr-3 mt-2"
                    label
                    color="green dark-2"
                    dark
                    large
                >
                    {{ item }}
                    <v-icon right
                        @click="rmlicense(idx)"
                    >mdi-close-circle</v-icon>
                </v-chip>
                
                <!-- 無證照 -->
                <v-chip
                    v-for="(item, idx) in ipt.commonMember"
                    :key="item"
                    class="mr-3 mt-2"
                    label
                    dark
                    large
                >
                    {{ item }}
                    <v-icon right
                        @click="rmCommon(idx)"
                    >mdi-close-circle</v-icon>
                </v-chip>
            </v-col>
        </v-row>

        <v-row class="px-2 mt-5 mb-8">
            <!-- 外包廠商 -->
            <v-col cols="12">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-account</v-icon>外包廠商
                    <v-btn fab dark x-small color="indigo" class="mt-n2 ml-2"
                        @click="vendorDialog = true"
                    >
                        <v-icon dark>mdi-plus</v-icon>
                    </v-btn>
                </h3>

                <v-chip
                    v-for="(item, idx) in ipt.vendors"
                    :key="item.name"
                    class="mr-3 mt-2"
                    label
                    color="teal"
                    dark
                    large
                >
                    {{ `${item.name} - ${ item.count }人` }} 
                    <v-icon right
                        @click="deleteVendor(idx)"
                    >mdi-close-circle</v-icon>
                </v-chip>

                <!-- 外包廠商 dialog -->
                <v-dialog v-model="vendorDialog" max-width="500px">
                    <v-card>
                        <v-card-title class="cyan px-4 py-1 white--text">
                            新增外包廠商
                            <v-spacer></v-spacer>
                            <v-btn fab small text
                                @click="vendorDialog = !vendorDialog"
                                class="mr-n2 white--text"
                            >
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-card-title>

                        <v-card-text class="px-6 py-4">
                            <v-form>
                                <v-row>
                                    <v-col cols="12" sm="7">
                                        <h3 class="mb-1">
                                            <v-icon class="mr-1 mb-1">mdi-clipboard-text</v-icon>廠商名稱
                                        </h3>
                                        <v-text-field
                                            v-model.trim="vendorForm.name"
                                            solo
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="5">
                                        <h3 class="mb-1">
                                            <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>人數
                                        </h3>
                                        <v-text-field
                                            v-model.trim.number="vendorForm.count"
                                            solo
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card-text>
                        
                        <v-card-actions class="px-5 pb-5">
                            <v-spacer></v-spacer>
                            <v-btn class="mr-2" elevation="4" @click="vendorDialog = false">取消</v-btn>
                            <v-btn color="success" elevation="4" @click="addVendor">送出</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>

            <v-col cols="12">
                <h3 class="mb-2 mt-5">
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

            <v-col cols="12" class="text-center">
                <v-btn
                    :loading="isLoading"
                    dark
                    class="mr-4"
                    to="/worklist/maintain"
                >回搜尋頁</v-btn>

                <v-btn
                    :loading="isLoading"
                    dark
                    color="error"
                    class="mr-4"
                    @click="dialog = true"
                >退回</v-btn>

                <v-btn
                    :loading="isLoading"
                    color="success"
                    @click="save"
                >送出</v-btn>
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
                                auto-grow
                                solo
                                rows="8"
                                placeholder="請輸入原因"
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
    </v-form>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'

// 需證照人員名單
let hasLicense = {
    '固定式起重機': ['陳高文', '劉明凱'],
    '一般手工電焊': ['安東旭']
}

// 作業人員名單
let noLicense = ['高傳仁', '簡泓得', '張天昊']

export default {
    data: () => ({
        valid: true,  // 表單是否驗證欄位
        isLoading: false,  // 是否讀取中
        ipt: {
            creater: '',  // 立案人
            workNumber: '',  // 工單編號
            fixTime: '',  // 報修時間
            eqNumber1: '',  // 設備標示編號1
            eqNumber2: '',  // 設備標示編號2
            eqNumber3: '',  // 設備標示編號3
            eqNumber4: '',  // 設備標示編號4
            workLocation: '',  // 工作地點
            memberCount: '',  // 實際人數
            acceptanceTime: new Date().toISOString().substr(0, 10),  // 預計驗收日期
            agent: '王小明',  // 代理人
            enterControl: false,  // 進場管制申請
            specialDanger: false,  // 特殊危害作業
            safeDanger: false,  // 安全危害作業
            malfunctionDes: '',  // 故障描述
            note: '',  // 備註
            licensedMember: [],  // 需證照人員
            commonMember: [],  // 作業人員
            vendors: [],  // 外包廠商資料
        },
        agentOpts: ['王小明', '陳小華', '黃小美'],  // 代理人選項
        acceptDateMenuShow: false,  // 預計驗收日曆是否顯示
        hasLicenLv1Select: '',  // 有證照所選擇的opt--科室
        hasLicenLv2Select: '',  // 有證照所選擇的opt--人員清單
        noLicenseOpt: noLicense,  // 作業人員的opt
        noLicenSelect: '',  // 無證照所選擇的opt
        dialog: false,  // dialog 是否顯示
        reason: '',  // 退回原因
        vendorDialog: false,  // 外包廠商 dialog 是否顯示
        vendorForm: {},
        defaultVendorForm: {  // 外包廠商 dialog 的表單預設值
            name: '',
            count: 0,
        },
        demoShow: false,  // demo 用的平交道項目是否顯示
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
    computed: {
        // 設備報修
        eqNumbers() {
            return `${this.ipt.eqNumber1}-${this.ipt.eqNumber2}-${this.ipt.eqNumber3}-${this.ipt.eqNumber4}`
        },
        // 有證照option -- 科室
        hasLicenseOptLv1: () => Object.keys(hasLicense),
        // 有證照option -- 人員清單
        hasLicenseOptLv2() {
            return (hasLicense[this.hasLicenLv1Select])
        },
    },
    watch: {
        // 更換科室時，自動選該科室人員清單的第一人
        hasLicenLv1Select: function (newVal, oldVal) {
            if (newVal != oldVal) {
                this.hasLicenLv2Select = this.hasLicenseOptLv2[0]
            }
        },
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
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 初始化資料
        initDate() {
            // 向後端請求資料
            this.chLoadingShow()
            let id = this.$route.params.id  // 路由參數

            // 檢查是否有派工權限

            // 範例效果
            setTimeout(() => {
                this.ipt.workNumber = '201903110001',
                this.ipt.eqNumber1 = 'TRK',
                this.ipt.eqNumber2 = 'R06',
                this.ipt.eqNumber3 = 'EA0',
                this.ipt.eqNumber4 = '002',
                this.ipt.malfunctionDes = '',  // 故障描述
                this.ipt.fixTime = '201903110001',  // 報修時間
                this.ipt.creater = '陳小華',  // 立案人

                // 初始化林鐵人員下拉選項預設值
                this.initMemberSelect()

                // 初始化外包人員的表單
                this.vendorForm = Object.assign({}, this.defaultVendorForm)
                
                this.chLoadingShow()
            }, 1000)
        },
        // 初始化林鐵人員下拉選項預設值
        initMemberSelect() {
            this.hasLicenLv1Select = Object.keys(hasLicense)[0]  // 需證照人員
            // this.noLicenLv1Select = Object.keys(noLicense)[0]  // 作業人員
            this.noLicenSelect = this.noLicenseOpt[0]
        },
        // 增加林鐵參與人員(第二參數為是否有證照)
        addMember(name, bool) {
            if(name == '' || name == null) return

            if (bool && !this.ipt.licensedMember.includes(name)) {
                // 有證照且未被加入
                this.ipt.licensedMember.push(name)
            } else if (!bool && !this.ipt.commonMember.includes(name)) {
                // 無證照且未被加入
                this.ipt.commonMember.push(name)
            }
        },
        save() {
            if (this.$refs.form.validate()) {  // 表單驗證欄位
                this.isLoading = true
                
                // 範例效果
                setTimeout(() => {
                    this.isLoading = false
                    this.chMsgbar({ success: true, msg: '派工成功' })
                }, 1000)
            }
        },
        // 退回
        withdraw() {
            this.isLoading = true
                
            // 範例效果
            setTimeout(() => {
                // 退回完後，轉頁到搜尋頁
                this.chMsgbar({ success: true, msg: '退回成功' })
                this.$router.push({ path: '/worklist/maintain' })
            }, 1000)
        },
        // 刪除林鐵需證照人員
        rmlicense(idx) {
            this.ipt.licensedMember.splice(idx, 1)
        },
        // 刪除林鐵作業人員
        rmCommon(idx) {
            this.ipt.commonMember.splice(idx, 1)
        },
        // 增加外包廠商
        addVendor() {
            if (!this.ipt.vendors.includes(this.vendorForm)) {
                this.ipt.vendors.push(this.vendorForm)

                this.vendorForm = Object.assign({}, this.defaultVendorForm)
                this.vendorDialog = false
            }
        },
        // 刪除外包廠商
        deleteVendor(item) {
            let idx = this.ipt.vendors.indexOf(item)  // 取得該筆資料索引值
            this.ipt.vendors.splice(idx, 1)
        },
    },
    created() {
        this.initDate()  // 初始化資料
    }
}
</script>