<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">
        {{ (this.isEdit)? `車速異常表編輯 (編號：${ routeId })` : '車速異常表新增' }}
    </h2>

    <v-row class="px-2 label-header">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>日期
            </h3>
            <v-menu
                v-model="dateMenuShow"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model.trim="ipt.CheckDate"
                        solo
                        v-on="on"
                        readonly
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="primary"
                    v-model="ipt.CheckDate"
                    @input="dateMenuShow = false"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>車次
            </h3>
            <v-text-field
                v-model.trim="ipt.CarVersion"
                solo
                placeholder="例：1-2"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-account</v-icon>駕駛姓名
            </h3>
            <PeopleSelect v-model="ipt.ErrPeopleId" :isMuti="false" :key="componentKey" singleDept="車輛養護科" @change="getPeopleData" />
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>區段
            </h3>
            <v-text-field
                v-model.trim="ipt.CarLineZone"
                solo
                placeholder="例：主線 5k 10m"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-clock</v-icon>時間範圍
            </h3>
            <v-text-field
                v-model.trim="ipt.CarTimeRange"
                solo
                placeholder="例：1100~1120"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-gauge</v-icon>平均車速
            </h3>
            <v-text-field
                v-model.trim="ipt.AverageSpeed"
                solo type="number"
                placeholder="例：40"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-gauge</v-icon>每小時超出公里數
            </h3>
            <v-text-field
                v-model.trim="ipt.OverSpeed"
                solo type="number"
                placeholder="例：10"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-gauge</v-icon>超速級別
                <v-btn small dark class="mb-1 ml-2 btn-delete"
                    @click="dialogShow = true"
                >速度範圍</v-btn>
            </h3>
            <v-select
                v-model="OverSpeedId"
                :items="[{value:'1',text:'1 級'},{value:'2',text:'2 級'}, {value:'3',text:'其他'}]"
                solo
            ></v-select>
            <v-text-field
                v-show="OverSpeedId == '3'"
                v-model.trim="OverSpeedText"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-pen</v-icon>異常概況
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入異常概況"
                v-model.trim="ipt.ErrTitle"
            ></v-textarea>
        </v-col>

        <v-col cols="12" md="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>異常處理情形
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入異常處理情形"
                v-model.trim="ipt.ErrCheckStatus"
            ></v-textarea>
        </v-col>

        <!-- 檔案上傳，新增時 -->
        <template>
            <UploadFileAdd
                title="附件上傳"
                :uploadDisnable="false"
                :fileList="showFiles"
                @joinFile="joinFile"
                @rmFile="rmFile"
            />
        </template>

        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="mr-4 btn-close"
                to="/smis/car-safe-performance/speed-abnormal"
            >回搜尋頁</v-btn>
            
            <v-btn
                class="btn-add white--text"
                @click="save"
            >{{ (isEdit)? '儲存變更': '送出' }}</v-btn>
        </v-col>

        <!-- 附件 (編輯時) -->
        <template v-if="isEdit">
            <v-col cols="12" class="mt-8 mb-2">
                <v-divider></v-divider>
            </v-col>

            <UploadFileEdit title="檔案管理" v-if="false"
                :fileList="ipt.FileCount"
                @uploadFile="uploadFile"
                @deleteFile="deleteFile"
                class="mb-10"
            />
        </template>
    </v-row>

    <!-- <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >

    </v-form> -->
    <!-- 行車超速第1級列車運轉速度範圍 -->
    <v-dialog v-model="dialogShow" max-width="750px">
        <v-card class="theme-del-card">
            <v-toolbar flat dense dark class="metal-red-top">
                <v-icon class="mr-2">mdi-gauge</v-icon>
                <v-toolbar-title>行車超速第1級列車運轉速度範圍</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn fab small text @click="dialogShow = false" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-data-table
                :headers="headers"
                :items="tableItems"
                disable-sort
                disable-filtering
                hide-default-footer
                class="theme-table"
            ></v-data-table>
            <div>
                <p class="font-weight-black ml-1" >行車超速處理</p>
                <p class="font-weight-regular mt-n4 ml-1">
                1.	行車超速分為2級，超出第1級以外之列車運轉速度為第2級。<br/>
                (1)	行車超速範圍包括牽引及推進速度。<br/>
                (2) 超出限速3公里以下者為第1級行車超速，超出3公里以上者為第2級行車超速。<br/>
                2.	車速紀錄紙上最大超速點其前後2分鐘共4分鐘之平均速度為檢核超速之列車運轉速度。
                </p>
                <p class="font-weight-black ml-1">列車運轉速度規定</p>
                <p class="font-weight-regular mt-n4 ml-1">
                1.	以柴油機車或柴油客車為動力之列車最高運轉速度規定如上表：<br/>
                前項最高運轉速度包括牽引及推進速度。<br/>
                2.	列車通過對向轉轍器，其運轉速度不得超過每小時12公里。通過附有轉轍器之彎曲路線，不得超過每小時10公里。<br/>
                3.	調車速度不得超過每小時15公里，編組聯結作業時，相距5公尺以內，運轉速度不得超過每小時5公里。<br/>
                4.	列車遇有慢行標示牌時，其運轉速度不得超過每小時12公里，但有指定運轉速度者，應依所指示速度行駛。<br/>
                5.	蒸汽機車運轉速度不得超過每小時18公里。
                </p>
            </div>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import UploadFileAdd from '@/components/UploadFileAdd.vue'
import UploadFileEdit from '@/components/UploadFileEdit.vue'
import PeopleSelect from '@/components/PeopleSelect'
import { mapState, mapActions } from 'vuex'
import { login } from '@/apis/login'
import { carspeedQuery,carspeedInsert,carspeedUpdate } from '@/apis/smis/safetyPerformance'
import { getNowFullTime,encodeObject,decodeObject, getOrg } from '@/assets/js/commonFun'

export default {
    props:['id'],
    data: () => ({
        componentKey: 0,
        valid: true,  // 表單是否驗證欄位
        isEdit: false,  // 是否為編輯
        showFiles: [],  // 要顯示的縮圖
        ipt: {},
        defaultIpt: {
            CheckDate: new Date().toISOString().substr(0, 10),  // 日期
            CarVersion: '',  // 車次
            ErrPeopleId: '',  // 駕駛姓名
            ErrPeopleName: '',
            ErrDepartCode: '',
            ErrDepart: '',
            CarLineZone: '',  // 區段
            CarTimeRange: '',  // 時間範圍
            AverageSpeed: '',  // 平均車速
            OverSpeed: '',  // 每小時超出公里數
            OverSpeedStatus: '1',  // 超速級別
            ErrTitle: '',  // 異常概況
            ErrCheckStatus: '',  // 異常處理情形
            FileCount: [],  // 附件
        },
        dateMenuShow: false,  // 日曆是否顯示
        dialogShow: false,  // 速限表是否顯示
        headers: [  // 速限表顯示的欄位
            { text: '起訖站', value: 'station', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '直線最高速度', value: 'straight', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '曲線最高速度', value: 'curve', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        ],
        tableItems: [  // 速限表表格資料
            { station: '嘉義 ~ 北門', straight: '33~36', curve: '28~31'},
            { station: '北門 ~ 竹崎', straight: '50~54', curve: '40~43'},
            { station: '竹崎 ~ 二萬平', straight: '28~31', curve: '22~25'},
            { station: '二萬平 ~ 阿里山', straight: '28~30', curve: '18~20'},
            { station: '阿里山 ~ 祝山', straight: '22~24', curve: '18~20'},
            { station: '阿里山 ~ 眠月', straight: '22~24', curve: '18~20'},
            { station: '阿里山 ~ 水山神木', straight: '22~24', curve: '18~20'},
        ],
    }),
    components: {
        UploadFileAdd,
        UploadFileEdit,
        PeopleSelect
    },
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        },
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
        OverSpeedId: {
            get () {
				if(this.ipt.OverSpeedStatus != '1' && this.ipt.OverSpeedStatus != '2') {
                    return '3'
                }else{
                    return this.ipt.OverSpeedStatus
                }
			},
			set (value) {
                if(value != '1' && value != '2') {
                    this.ipt.OverSpeedStatus = '3'
                }else{
                    this.ipt.OverSpeedStatus = value
                }
                
            }
        },
        OverSpeedText: {
           get () {
				if(this.OverSpeedId != '1' && this.OverSpeedId != '2' && this.OverSpeedId != '3') {
                    return this.ipt.OverSpeedStatus
                }else{
                    return ''
                }
			},
			set (value) {
                if(this.OverSpeedId != '1' && this.OverSpeedId != '2'){
                    this.ipt.OverSpeedStatus = value
                }
            } 
        }
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'chViewDialog',  // 檢視內容 dialog
        ]),
        // 初始化資料
        initData() {
            this.ipt = { ...this.defaultIpt }  // 初始化表單

            let aa = getOrg(this.userData.UserId)

            // -------------- 編輯時 -------------- 
            if (this.id) {
                this.chLoadingShow({show:true})
                this.routeId = this.id  // 路由參數(id)
                this.isEdit = true
                carspeedQuery({
                    FlowID: this.id,
                    ClientReqTime: getNowFullTime(),
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then( res => {
                    if (res.data.ErrorCode == 0) {
                        this.ipt = {FileCount: [],...decodeObject(res.data.DataList[0])}    
                        this.ipt.CheckDate = this.ipt.CheckDate.split(' ')[0].replace(/\//g,"-")
                    }else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch( err => {
                    console.warn(err)
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，資料新增失敗' })
                }).finally(() => {
                    this.chLoadingShow({show:false})
                })
            }else{
                this.ipt.PeopleId = this.userData.UserId
                this.ipt.PeopleName = this.userData.UserName
                this.ipt.DepartCode = this.userData.DeptList[0].DeptId
                this.ipt.Depart = this.userData.DeptList[0].DeptDesc
                
            }
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 送出
        save() {
            this.chLoadingShow({show:true})
            // this.ipt.CheckDate = this.ipt.CheckDate
            if(this.isEdit){
                carspeedUpdate({
                    FlowID:this.id,
                    Option:'U',
                    ...encodeObject(this.ipt),
                    ClientReqTime: getNowFullTime(),
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then( res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '資料更新成功' })    
                    }else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch( err => {
                    console.warn(err)
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，資料更新失敗' })
                }).finally(() => {
                    this.chLoadingShow({show:false})
                })
            }else{
                carspeedInsert({
                    ...encodeObject(this.ipt),
                    ClientReqTime: getNowFullTime(),
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then( res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '資料新增成功' })    
                    }else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch( err => {
                    console.warn(err)
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，資料新增失敗' })
                }).finally(() => {
                    this.chLoadingShow({show:false})
                })
            }
        },
        getPeopleData(empid){
            if(empid){
            const sendData = {
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                UserId: empid,
                UserPasswd: "",
                BackDoor: 'T',
            }
            login({
                ...sendData
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    this.ipt.ErrDepartCode = res.data.UserData.DeptList[0].DeptId
                    this.ipt.ErrDepart = res.data.UserData.DeptList[0].DeptDesc
                    this.ipt.ErrPeopleName = res.data.UserData.UserName
                } else {
                sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                this.$router.push({ path: '/error' })
                }
            }).catch( err => {
                console.warn(err)
                this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
            }).finally(() => {
            })
            }
        },
        // 加入要上傳的檔案
        joinFile(obj, bool) {
            if (bool) {
                this.ipt.FileCount.push(obj)  // 加入要上傳後端的檔案
            } else {
                this.showFiles.push(obj)  // 加入要顯示的縮圖
            }
        },
        // 移除要上傳的檔案
        rmFile(idx) {
            this.showFiles.splice(idx, 1)
            this.ipt.FileCount.splice(idx, 1)
        },
        // 上傳檔案 (編輯時)
        uploadFile(file) {
            this.chLoadingShow({show:true})

            setTimeout(() => {
                // 後端請求後，回傳檔案資料 (id、filename、link)
                // this.ipt.files.push(fileData)
                this.chMsgbar({ success: true, msg: '檔案上傳成功'})
                this.chLoadingShow({show:false})
            }, 1000)
        },
        // 刪除檔案 (編輯時)
        deleteFile(id, idx) {
            if (confirm('你確定要刪除嗎?')) {
                this.chLoadingShow({show:true})

                setTimeout(() => {
                    // 後端請求後，移除檔案列表
                    // this.ipt.files.splice(idx, 1)
                    this.chMsgbar({ success: true, msg: '檔案刪除成功'})
                    this.chLoadingShow({show:false})
                }, 1000)
            }
        },
    },
    created() {
        this.initData()
    }
}
</script>