<template>
<v-container style="max-width: 1200px">
    <!-- 組織表 -->
    <OrganizeDialog @setNowIpt="settingMenbers" />  

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
                <v-text-field
                    :value="ipt.agent.name"
                    solo
                    readonly
                    @click="chooseMembers('agent')"
                ></v-text-field>
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
                    solo type="number"
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
        <v-row class="px-2 mb-6 mt-6" v-if="showEq">
            <v-col cols="12">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-codepen</v-icon>設備標示編號
                    <span class="red--text">*</span>
                </h3>
                <p class="pl-8 mb-0 ml-5">
                    {{ combineCode }}
                </p>
            </v-col>
            <EquipRepairCode :key="eqkey" :toLv="4" :nowEqCode="nowEqCode" :rtnStartLv="lowReturn" @getEqCode="getTempCode" @getEqCh="getTempCh"/>
        </v-row>
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
                            @change="pickOne"
                            solo
                        ></v-select>
                    </v-col>

                    <v-col cols="10" sm="4">
                        <v-select
                            v-model="hasLicenLv2Select"
                            :items="hasLicenseOptLv2"
                            solo
                            @change="addMember(hasLicenLv2Select, true)"
                        ></v-select>
                    </v-col>

                    <v-col cols="2" v-if="false">
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
                <peopleSelect @getPeople="saveSelectPeople" :canEdit="true" :peopleList="queryItem.PeopleList"/>
                <!-- <v-row>
                    <v-col cols="10" sm="4" md="6">
                        <v-text-field
                            :value="ipt.commonNowIpt.name"
                            solo
                            readonly
                            @click="chooseMembers('commonNowIpt')"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="2">
                        <v-btn fab dark small color="indigo"
                            @click="addMember(ipt.commonNowIpt.id, false)"
                        >
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                </v-row> -->
            </v-col>

            <v-col cols="12">
                <!-- <h3 class="mb-1 mt-n3">
                    <v-icon class="mr-1 mb-1">mdi-account</v-icon>林鐵人員統計
                </h3> -->

                <!-- 有證照 -->
                <v-chip
                    v-for="(item, idx) in ipt.licensedArr"
                    :key="item"
                    class="mr-3 mt-n6"
                    label
                    color="blue darken-2"
                    dark
                    large
                >
                    {{ item }}
                    <v-icon right
                        @click="rmlicenseMember(idx, true)"
                    >mdi-close-circle</v-icon>
                </v-chip>
                
                <!-- 無證照 -->
                <v-chip
                    v-for="(item, idx) in ipt.commonMemArr"
                    :key="item"
                    class="mr-3 mt-2"
                    label
                    dark
                    large v-if="false"
                >
                    {{ item }}
                    <v-icon right
                        @click="rmlicenseMember(idx, false)"
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
                                        <v-select
                                            v-model="vendorForm.name"
                                            :items="vendorList"
                                            solo
                                        ></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="5">
                                        <h3 class="mb-1">
                                            <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>人數
                                        </h3>
                                        <v-text-field
                                            v-model.trim.number="vendorForm.count"
                                            solo type="number"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card-text>
                        
                        <v-card-actions class="px-5 pb-5">
                            <v-spacer></v-spacer>
                            <v-btn class="mr-2" elevation="4" @click="vendorDialog = false">取消</v-btn>
                            <v-btn color="success" elevation="4" @click="addVendor" >送出</v-btn>
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
                <v-btn dark class="ma-2 btn-close"
                    @click="closeWindow"
                >關閉視窗</v-btn>

                <template v-if="!done">
                    <v-btn
                         class="ma-2 btn-add"
                        :loading="isLoading"
                        color="success"
                        @click="save"
                    >送出</v-btn>
                </template>
            </v-col>
        </v-row>
    </v-form>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import OrganizeDialog from '@/components/OrganizeDialog.vue'
import EquipRepairCode from '@/components/EquipRepairCode'
import { getNowFullTime } from '@/assets/js/commonFun'
import { fetchWorkOrderOne, dispatchOrder, fetchLicenseManData, fetchFirmList } from '@/apis/workList/maintain'
import peopleSelect from '@/components/PeopleSelectMuti'

// 需證照人員名單 (demo用)
// let hasLicense = {
//     '固定式起重機': [
//         { text: '潘學文', value: '15741' },
//         { text: '尤宗偉', value: '12401' },
//         { text: '蘇峻逸', value: '12216' },
//         { text: '郭明珠', value: '17303' },
//     ],
//     '一般手工電焊': [
//         { text: '賴威志', value: '13745' },
//         { text: '黃妙修', value: '00008' },
//         { text: '李慧美', value: '11018' },
//         { text: '吳曉旻', value: '11006' },
//     ]
// }

export default {
    props: ['id'],  //路由參數
    data: () => ({
        done: false,  // 是否完成頁面操作
        valid: true,  // 表單是否驗證欄位
        combineCh: '', //合併後的設備中文名稱
        showEq: false,
        eqkey: '0',
        lowReturn: 4,
        isLoading: false,  // 是否讀取中
        combineCode: '', //合併後的設備編碼
        nowEqCode: '', //編輯時 預設帶入的combineCode
        hasLicenseOptLv1: [],
        hasLicenseOptLv2: [],
        licenseItems: [],
        firmItems: [],
        vendorList: [],
        manValueList: [], //人員value陣列
        manTextList: [], //人員text陣列
        queryItem: {
        DepartName: "",
        Memo: "",
        AlarmDTime: "",
        AlarmEndDTime: "",
        Cycle: "",
        PeopleList: []
      },
      defaultQueryItem: {
        DepartName: "",
        Memo: "",
        AlarmDTime: "",
        AlarmEndDTime: "",
        Cycle: "",
        PeopleList: []
      },
        hasLicense: {
            '固定式起重機': [
                { text: '潘學文', value: '15741' },
                { text: '尤宗偉', value: '12401' },
                { text: '蘇峻逸', value: '12216' },
                { text: '郭明珠', value: '17303' },
            ],
            '一般手工電焊': [
                { text: '賴威志', value: '13745' },
                { text: '黃妙修', value: '00008' },
                { text: '李慧美', value: '11018' },
                { text: '吳曉旻', value: '11006' },
            ]
        },
        ipt: {
            workNumber: '',  // 工單編號
            workLocation: '',  // 工作地點
            memberCount: '',  // 實際人數
            acceptanceTime: new Date().toISOString().substr(0, 10),  // 預計驗收日期
            agent: {  // 代理人
                id: '',
                name: '',
            },
            enterControl: false,  // 進場管制申請
            specialDanger: false,  // 特殊危害作業
            safeDanger: false,  // 安全危害作業
            malfunctionDes: '',  // 故障描述
            note: '',  // 備註
            licensedArr: [],  // 需證照人員 (顯示用)
            commonMemArr: [],  // 作業人員 (顯示用)
            commonNowIpt: {  // 作業人員欄位(暫存目前所選作業人員)
                id: '',
                name: '',
            },
            licensedMembers: [],  // 需證照人員 (後端上傳用)
            licensedMembersValue: [],  // 需證照人員 (後端上傳用)
            commonMembers: [],  // 作業人員 (後端上傳用)
            vendors: [],  // 外包廠商資料
        },
        acceptDateMenuShow: false,  // 預計驗收日曆是否顯示
        hasLicenLv1Select: '',  // 有證照所選擇的opt--科室
        hasLicenLv2Select: '',  // 有證照所選擇的opt--人員清單
        vendorDialog: false,  // 外包廠商 dialog 是否顯示
        vendorForm: {},
        defaultVendorForm: {  // 外包廠商 dialog 的表單預設值
            name: '',
            count: 0,
        },
        allLicenseArr: [],  // 所有證照人員
    }),
    components: { OrganizeDialog, EquipRepairCode, peopleSelect },
    computed: {
        ...mapState ('organization', {  // 組織表資料
            memberID: state => state.chose.uid,
            memberName: state => state.chose.name,
            nowIptName: state => state.nowIptName,  // 目前欄位名稱
        }),
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
        // 設備報修
        eqNumbers() {
            return `${this.ipt.eqNumber1}-${this.ipt.eqNumber2}-${this.ipt.eqNumber3}-${this.ipt.eqNumber4}`
        },
        // 有證照option -- 科室
        // hasLicenseOptLv1: () => Object.keys(this.hasLicense),
        // 有證照option -- 人員清單
        // hasLicenseOptLv2() {
        //     return (this.hasLicense[this.hasLicenLv1Select])
        // },
    },
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        },
        // 更換科室時，自動選該科室人員清單的第一人
        hasLicenLv1Select: function (newVal, oldVal) {
            return
            if (newVal != oldVal) {
                this.hasLicenLv2Select = this.hasLicenseOptLv2[0].value
            }
        },
    },
    methods: {
        //抓取未確認的設備標示編碼
        getTempCode(value) {
            this.combineCode = value
        },
        getTempCh(value) {
            this.combineCh = value
        },
        ...mapActions('system', [
            'chMsgbar',  // messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'closeWindow',  // 關閉視窗
        ]),
        ...mapActions('organization', [
            'toggleShow',  // toggle dialog show
            'chChose',  // 改變所選的組職表員工資料
            'chIptName',  // 改變目前欄位
        ]),
        /* 抓人 */
        saveSelectPeople(peopleData) {
            this.queryItem.PeopleList = peopleData.map(e=>e.UserId)

            // 作業人員
            // this.jobNameIpts = res.data.device_jobname.map(item => ({
            //     text: item.JobName,
            //     value: item.JobCode,
            // }))
            this.ipt.commonMemArr = peopleData.map(item => ({ // 顯示用，只放入姓名
                PeopleId: item.UserName,
            }))  
            this.ipt.commonMembers = peopleData.map(item => ({ 
                PeopleId: item.UserId,
            }))  
        },
        // 初始化資料
        initDate() {
            this.chLoadingShow({show:true})

            // 因為要檢查是否有權限編輯，向後端請求資料
            fetchWorkOrderOne({
                WorkOrderID: this.id,  // 工單編號
                ClientReqTime: getNowFullTime()  // client 端請求時間
            }).then(res => {
                // 檢查是否有權限編輯
                if (res.data.CreatorID != this.userData.UserId && res.data.DispatchID != this.userData.UserId) {
                    this.$router.push({ path: '/no-permission' })
                }
                if(res.data.CreateType == '2'){
                    this.lowReturn = 2
                    this.eqkey++
                }
                this.ipt.workNumber = res.data.WorkOrderID  // 工單編號
                this.ipt.malfunctionDes = res.data.Malfunction  // 故障描述
                this.nowEqCode = res.data.MaintainCode

                this.showEq = true

                // 初始化外包人員的表單
                this.vendorForm = Object.assign({}, this.defaultVendorForm)

                // 組合全部有證照人員資料(反查姓名用)
                // let arr = []
                // for (let key in this.hasLicense) {
                //     arr = [ ...arr, ...this.hasLicense[key]]
                // }
                // this.allLicenseArr = arr
            }).catch(err => {
                alert('資料讀取失敗')
            }).finally(() => {
                // this.chLoadingShow({show:true})
            })

            //請求證照人員清單
            fetchLicenseManData({
                ClientReqTime: getNowFullTime()  // client 端請求時間
            }).then(res => {
                let obj = res.data
                this.licenseItems = JSON.parse(res.data.order_list)
                //組合全部有證照人員資料(反查text/valeu用)
                this.licenseItems.forEach(element => {
                    for (let i = 0; i < element.people_id_list.length; i++) {
                        if(this.manValueList.indexOf(element.people_id_list[i]) < 0){
                            this.manValueList.push(element.people_id_list[i])
                            this.manTextList.push(element.people_name_list[i])
                        }
                    }
                });

                // 初始化林鐵人員下拉選項預設值
                this.initMemberSelect(this.licenseItems)
            }).catch(err => {
                //console.log(err)
                alert('資料讀取失敗2')
            }).finally(() => {
            })

            //請求廠商清單
            fetchFirmList({
                ClientReqTime: getNowFullTime()  // client 端請求時間
            }).then(res => {
                let obj = res.data
                this.firmItems = JSON.parse(res.data.order_list)
                this.vendorList = this.firmItems.map(item => item.VendorName)
                // 初始化林鐵人員下拉選項預設值
            }).catch(err => {
                //console.log(err)
                alert('資料讀取失敗2')
            }).finally(() => {
            })


            this.chLoadingShow({show:false})
        },
        pickOne(){
            let select1 = this.hasLicenLv1Select
            this.licenseItems.forEach(element => {
                if(element.License == select1){
                    this.hasLicenseOptLv2 = element.people_name_list
                    return
                }
            });
        },
        // 選擇代理人、作業人員 (組識表組件用)
        chooseMembers(iptName) {
            this.chIptName(iptName)
            this.toggleShow()
        },
        // 設定代理人 (組識表組件用)
        settingMenbers() {
            this.ipt[this.nowIptName].id = this.memberID
            this.ipt[this.nowIptName].name = this.memberName
        },
        // 初始化林鐵人員下拉選項預設值
        initMemberSelect(data) {
            // this.hasLicenLv1Select = Object.keys(this.hasLicense)[0]  // 需證照人員
            this.hasLicenseOptLv1 = data.map(item => item.License)
        },
        // 增加林鐵的人員(第二參數為是否有證照)
        addMember(id, bool) {
            if(id == '' || id == null) return
            
            if (bool && this.ipt.licensedMembers.findIndex(ele => ele.PeopleId == id) == -1) {
                // 有證照且未被加入
                // this.ipt.licensedArr.push(this.allLicenseArr.find(item => item.value ==id).text)  // 顯示用，只放入姓名
                this.ipt.licensedArr.push(id)  // 顯示用，只放入姓名
                this.ipt.licensedMembers.push({ PeopleId:this.manValueList[this.manTextList.indexOf(id)]})  // 後端上傳用(證照功能未完成，先做demo資料)
                
                this.ipt.licensedMembersValue.push({ PeopleId:this.manValueList[this.manTextList.indexOf(id)]})  // 後端上傳用(證照功能未完成，先做demo資料)
                return
            } else if (!bool && this.ipt.commonMembers.findIndex(ele => ele.PeopleId == id) == -1) {
                // 作業人員
                this.ipt.commonMemArr.push(this.ipt.commonNowIpt.name)  // 顯示用，只放入姓名
                this.ipt.commonMembers.push({ PeopleId: this.ipt.commonNowIpt.id })  // 後端上傳用
            }
        },
        save() {
            // combineCode 必須四碼
            let arr = this.combineCode.split('-')
            if(arr.includes('')){
                alert("設備標示編號未填滿四層")
                return
            }
            if(this.ipt.agent.name == ''){
                alert("代理人未填")
                return
            }
            if (confirm('你確定要送出嗎?')) {
                this.chLoadingShow({show:true})
                let tempCodeArr = this.combineCode.split('-')
                
                dispatchOrder({
                    WorkOrderID: this.ipt.workNumber,  // 工單編號
                    ExpectedDT: this.ipt.acceptanceTime,  // 預計驗收日期
                    AgentID: this.ipt.agent.id,  // 代理人id
                    WorkPlace: this.ipt.workLocation,  // 工作地點
                    RealWorkerCount: this.ipt.memberCount,  // 實際人數
                    WorkApplication: (this.ipt.enterControl)? 'T' : 'F',  // 進場管制申請
                    WorkSp: (this.ipt.specialDanger)? 'T' : 'F',  // 特殊危害作業
                    WorkSafety: (this.ipt.safeDanger)? 'T' : 'F',  // 安全危害作業
                    Malfunction: this.ipt.malfunctionDes,  // 故障描述
                    Memo: this.ipt.note,  // 備註
                    MaintainCode_System: tempCodeArr[0],  // 設備標示編號(系統)
                    MaintainCode_Loc: tempCodeArr[1],  // 設備標示編號(位置)
                    MaintainCode_Eqp: tempCodeArr[2],  // 設備標示編號(設備)
                    MaintainCode_Seq: tempCodeArr[3],  // 設備標示編號(序號)
                    PeopleLicense: this.ipt.licensedMembers,  // 林鐵人員統計(有證照)
                    PeopleNoLicense: this.ipt.commonMembers,  // 林鐵人員統計(無證照)
                    OutSourceCount: this.ipt.vendors.map(item => ({ VendorName: item.name, PeopleCount: item.count })),  // 外包廠商統計
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                    MaintainCode_AllName: this.combineCh,
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '派工成功' })
                        this.done = true  // 隱藏頁面操作按鈕
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.ErrorCode, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，派工失敗' })
                }).finally(() => {
                    this.chLoadingShow({show:false})
                })
            }
        },
        // 刪除林鐵需證照人員、作業人員
        // 參數說明：第二參數為布林值，代表是否為需證照人員
        rmlicenseMember(idx, bool) {
            if (bool) {
                // 需證照人員
                this.ipt.licensedArr.splice(idx, 1)
                this.ipt.licensedMembers.splice(idx, 1)  // 後端上傳用
                this.manTextList.splice(idx, 1)
                this.manValueList.splice(idx, 1)
            } else {
                // 作業人員
                this.ipt.commonMemArr.splice(idx, 1)  // 顯示用
                this.ipt.commonMembers.splice(idx, 1)  // 後端上傳用
            }
            
        },
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