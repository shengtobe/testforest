<template>
<v-container class="label-header" style="max-width: 1200px">
    <h2 class="label-title mb-4">機客車行駛公里及發電機工時表查詢</h2>

    <v-row class="px-2 mb-8">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>年度
            </h3>
            <v-text-field
                v-model.trim="searchIpt.year"
                solo
                placeholder="例：109"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>月份
            </h3>
            <v-select
                v-model="searchIpt.month"
                :items="serchMonthOpts"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file</v-icon>車輛型號
            </h3>
            <v-text-field solo @click="eqCode=true" readonly v-model="searchIpt.MaintainCode_Loc" />
            <v-dialog v-model="eqCode" max-width="700px">
                <v-card class="theme-card">
                    <v-card-title class="px-4 py-1">
                        車輛型號
                        <v-spacer></v-spacer>
                        <v-btn fab small text @click="eqCode = false" class="mr-n2">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-card-title>
                    <div class="px-4 py-3">
                        <EquipCode :nowEqCode="com_equipCode" :toLv="2" :disableToLv="1" :needIcon="false" :noLabel="true" @getEqCode="getRtnCode" />
                    </div>
                    <v-card-actions class="px-5 pb-5">
                        <v-spacer></v-spacer>
                        <v-btn class="mr-2 btn-close" dark elevation="4"  :loading="isLoading" @click="eqCode = false">取消</v-btn>
                        <v-btn class="btn-add" dark elevation="4"  :loading="isLoading" @click="selectEQ">確認</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>

        <v-col cols="12" class="mb-4">
            <v-btn dark large class="btn-search mt-2 mb-2 mr-2"
                @click="search"
            >
                <v-icon>mdi-magnify</v-icon>查詢
            </v-btn>

            <v-btn dark large class="btn-add ma-2"
                @click="add"
            >
                <v-icon>mdi-plus</v-icon>新增
            </v-btn>

            <v-btn elevation="2" large class="btn-clear ma-2"
                @click="reset"
            >
                <v-icon>mdi-reload</v-icon>清除搜尋內容
            </v-btn>

            <v-btn dark large class="btn-close ma-2"
                :to="`/smis/car-safe-performance`"
            >回上層</v-btn>
        </v-col>
        
        <p class="label-warning px-2">
            <v-icon class="label-warning mb-1">mdi-alert-decagram</v-icon>
            注意：一般員工僅能編修當月與上個月之資料
        </p>

        <!-- 表格資料 -->
        <v-col cols="12">
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

                    <template v-slot:item.motoId="{ item }">
                        {{ item.type + item.num }}
                    </template>

                    <template v-slot:item.content="{ item }">
                        <v-btn dark fab small dark class="btn-detail"
                            @click="view(item)"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn dark fab small class="btn-modify mr-2"
                            @click="edit(item.RPFlowNo)"
                        >
                            <v-icon>mdi-pen</v-icon>
                        </v-btn>

                        <v-btn dark fab small class="btn-delete"
                            @click="preDel(item.RPFlowNo)"
                        >
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </template>
                    
                    <!-- 頁碼 -->
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

    <!-- 詳細資料 -->
    <v-dialog v-model="contentShow" max-width="500px">
        <v-card class="theme-card">
            <v-card-title class="px-4 py-1">
                詳細資料
                <v-spacer></v-spacer>
                <v-btn fab small text @click="contentShow = false" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <div class="px-4 py-3">
                <v-row no-gutters>
                    <v-col cols="12" sm="6">
                        <v-icon class="mr-1 mb-1">mdi-gauge</v-icon>
                        本日行駛公里： {{ content.Km }}
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-icon class="mr-1 mb-1">mdi-gauge</v-icon>
                        累計公里數： {{ content.AccumKm }}
                    </v-col>
                
                    <template  v-if="customYN">
                        <v-col cols="12">
                            <v-divider class="mt-2 mb-3"></v-divider>
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-icon class="mr-1 mb-1">mdi-clock</v-icon>
                            發電機日工時： {{ content.HourDay }}
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-icon class="mr-1 mb-1">mdi-clock</v-icon>
                            發電機累計工時： {{ content.Hours }}
                        </v-col>

                        <v-col cols="12">
                            <v-divider class="mt-2 mb-3"></v-divider>
                        </v-col>

                        <v-col cols="12" class="mb-1">
                            <v-icon class="mr-1 mb-1">mdi-gas-station</v-icon>
                            耗用油量類別
                        </v-col>

                        <v-col cols="12" sm="4">
                            柴油： {{ content.DieselOil }}
                        </v-col>

                        <v-col cols="12" sm="4">
                            引擎機油： {{ content.EngineOil }}
                        </v-col>

                        <v-col cols="12" sm="4">
                            TC機油： {{ content.TCOil }}
                        </v-col>

                        <v-col cols="12" sm="4">
                            風泵： {{ content.WindMercury }}
                        </v-col>

                        <v-col cols="12" sm="4">
                            其他 {{ content.Other }}
                        </v-col>
                    </template>
                    
                    <v-col cols="12">
                        <v-divider class="mt-2 mb-3"></v-divider>
                    </v-col>

                    <v-col cols="12">
                        <v-icon class="mr-1 mb-1">mdi-pen</v-icon>
                        保養記事
                        <p>{{ content.Memo }}</p>
                    </v-col>
                </v-row>
            </div>
        </v-card>
    </v-dialog>

    <!-- 刪除確認視窗 -->
    <v-dialog v-model="dialogDel" persistent max-width="290" >
      <v-card class="theme-del-card">
        <v-card-title class="red white--text px-4 py-1 headline"
          >確認是否刪除?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="btn-close white--text" @click="dialogDel = false">取消</v-btn>
          <v-btn class="btn-delete white--text" @click="del"
            >刪除</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 表單 -->
    <v-dialog v-model="dialog" max-width="700px">
        <Form :flowNo="itemIndex" :key="'MotoForm_'+formKey" @search="search" @close="dialog=false"/>
    </v-dialog>
</v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Pagination from '@/components/Pagination.vue'
import { getNowFullTime, decodeObject, unique } from "@/assets/js/commonFun";
import { monthOptions } from '@/assets/js/dateTimeOption'
import EquipCode from '@/components/EquipRepairCode'
import Form from './MotoDynamoForm'
import { fetchFormOrderList, deleteFormOrder } from "@/apis/formManage/serve"
export default {
    data: () => ({
        searchIpt: {  // 搜尋欄位
            year: new Date().getFullYear(),
            month: '',  // 月
            MaintainCode_System: 'RST',  // 類型
            MaintainCode_Loc: ''
        },
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '型號', value: 'MotoId', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '日期', value: 'CheckDay', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '司機員', value: 'Driver', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '行駛區間', value: 'KmRecord', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '列車次', value: 'TrainNo', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '詳細資訊', value: 'content', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '編輯、刪除', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        ],
        monthOpts: monthOptions,  // 月份下拉選單(dialog用)
        serchMonthOpts: [  // 搜尋表單月份下拉選單
            { text: '不限', value: '' },
            ...monthOptions,
        ],
        formKey:0,
        dialog: false,  // dialog 是否顯示
        dialogDel: false,
        RPFlowNo: 0,
        isLoading: false,  // 是否讀取中
        itemIndex: -1,  // 作用中的物件索引值 (小於0為新增的情況)
        contentShow: false,  // 詳細內容 dialog 是否顯示
        eqCode: false,
        content: {},  // 詳細內容欄位
        preSetEqcode: '',
    }),
    components: { 
        Pagination,     // 頁碼
        EquipCode,
        Form
    },
    computed: {
        ...mapState("user", {
            userData: (state) => state.userData, // 使用者基本資料
        }),
        dialogTitle () {
            return this.itemIndex === -1 ? '新增資料' : '編輯資料'
        },
        com_equipCode: {
            get: function() {
                return this.searchIpt.MaintainCode_System + (this.searchIpt.MaintainCode_Loc==''?'':'-' + this.searchIpt.MaintainCode_Loc)
            },
            set: function(value) {
                let splitArr = value.split('-')
                this.searchIpt.MaintainCode_System = splitArr[0]
                this.searchIpt.MaintainCode_Loc = splitArr[1]
            }
        },
        customYN () {
            let Loc = this.content.MotoId
            return /^(DL|SL)\d{2}$/.test(Loc)
        }
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 搜尋
        search() {
            this.chLoadingShow({show:true})
            this.pageOpt.page = 1  // 頁碼初始化
            let sDate
            let eDate
            if(this.searchIpt.month != ''){
                sDate = new Date(this.searchIpt.year + '-' + this.searchIpt.month)
                eDate = new Date(this.searchIpt.year + '-' + this.searchIpt.month)
                eDate.setMonth(eDate.getMonth()+1)
                eDate.setDate(eDate.getDate()-1)
            } else {
                sDate = new Date(this.searchIpt.year + '-01')
                eDate = new Date(this.searchIpt.year+1 + '-01')
                eDate.setDate(eDate.getDate()-1)
            }
            let keyItem = []
            keyItem.push({ Column: "StartDayVlaue", Value: sDate.getFullYear()+'-'+(sDate.getMonth()+1)+'-'+sDate.getDate() })
            keyItem.push({ Column: "EndDayVlaue", Value: eDate.getFullYear()+'-'+(eDate.getMonth()+1)+'-'+eDate.getDate() })
            keyItem.push({ Column: "DepartCode", Value: this.userData.DeptList[0].DeptId })
            keyItem.push({ Column: "MaintainCode_System", Value: this.searchIpt.MaintainCode_System }) 
            keyItem.push({ Column: "MaintainCode_Loc", Value: this.searchIpt.MaintainCode_Loc })
            this.tableItems = []
            fetchFormOrderList({
                ClientReqTime: getNowFullTime(),
                OperatorID: this.userData.UserId,
                KeyName: 'RP066',
                KeyItem: keyItem,
                QyName: [
                    "RPFlowNo",
                    "ID",
                    "Name",
                    "CheckDay",
                    "CheckStatus",
                    "MaintainCode_System",  //設備報修碼(系統)
                    "MaintainCode_Loc", //設備報修碼(位置)
                    "Driver",   //司機員
                    "KmRecord", //行駛區間
                    "Km",   //本日行駛公里數
                    "AccumKm",  //累計公里數
                    "HourDay",  //發電機日工時
                    "Hours",    //發電機累計工時
                    "DieselOil",    //柴油
                    "EngineOil",    //引擎機油
                    "TCOil",    //TC機油
                    "WindMercury",  //風汞
                    "Other",    //其他
                    "TrainNo",  //列車次
                    "Memo", //保養記事
                ],
            }).then(res => {
                if(res.data.ErrorCode==0 && res.data.DT!="[]"){
                    let DT = decodeObject(unique(JSON.parse(res.data.DT)))
                    this.tableItems = DT.map(e=>({
                        RPFlowNo: e.RPFlowNo,
                        ID: e.ID,
                        Name: e.Name,
                        CheckDay: e.CheckDay,
                        CheckStatus: e.CheckStatus,
                        MotoId: e.MaintainCode_Loc,
                        Driver: e.Driver,
                        KmRecord: e.KmRecord,
                        Km: e.Km,
                        AccumKm: e.AccumKm,
                        HourDay: e.HourDay,
                        Hours: e.Hours,
                        DieselOil: e.DieselOil,
                        EngineOil: e.EngineOil,
                        TCOil: e.TCOil,
                        WindMercury: e.WindMercury,
                        Other: e.Other,
                        TrainNo: e.TrainNo,
                        Memo: e.Memo,
                    }))
                } else {
                   if(res.data.ErrorCode != 0) {
                       this.chMsgbar({ success: false, msg: res.data.Msg })
                   } else if(res.data.DT == "[]") {
                       this.chMsgbar({ success: false, msg: '查無資料，請使用其他條件查詢' })
                   }
                }
                
            }).catch(err => {
                console.error(err)
                this.chMsgbar({ success: false, msg: '查無資料，請使用其他條件查詢' })
            }).finally(()=>{
                this.chLoadingShow({show:false})
            })
        },
        add() {
            this.formKey ++
            this.dialog = true
        },
        edit(flowNo) {
            this.itemIndex = flowNo
            this.formKey ++
            this.dialog = true
        },
        // 清除搜尋內容
        reset() {
            this.searchIpt.year = this.searchIpt.num = ''
            this.searchIpt.month = ''
            this.searchIpt.type = 'RST'
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        preDel(id) {
            this.RPFlowNo = id
            this.dialogDel = true
        },
        // 刪除
        del() {
            let id = this.RPFlowNo
            this.chLoadingShow({show:true})
            deleteFormOrder({
                ClientReqTime: getNowFullTime(),
                OperatorID: this.userData.UserId,
                KeyName: 'RP066',
                KeyItem: [
                    { Column: "RPFlowNo", Value: id }
                ]
            }).then(res => {
                if(res.data.ErrorCode == 0) {
                    this.chMsgbar({ success: true, msg: '刪除成功!' })
                    this.search()
                } else {
                    this.chMsgbar({ success: false, msg: res.data.Msg })
                }
            }).catch(err => {
                console.error(err)
                this.chMsgbar({ success: false, msg: '刪除失敗!' })
            }).finally(()=>{
                this.chLoadingShow({show:false})
                this.dialogDel = false
            })
            
        },
        // 顯示詳細資訊
        view(item) {
            this.contentShow = true
            this.content = { ...item }
        },
        //機車回傳
        getRtnCode(code) {
            this.preSetEqcode = code
        },
        //機車送出按鈕
        selectEQ() {
            this.com_equipCode = this.preSetEqcode
            this.eqCode = false
        }
    },
    created() {
        this.ipt = { ...this.defaultIpt }  // 初始化表單
    },
}
</script>