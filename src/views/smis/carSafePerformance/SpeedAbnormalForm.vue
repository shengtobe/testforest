<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">
        {{ (this.isEdit)? `車速異常表編輯 (編號：${ routeId })` : '車速異常表新增' }}
    </h2>

    <v-row class="px-2">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>日期
            </h3>
            <v-menu
                v-model="dateMemuShow"
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
                    color="purple"
                    v-model="ipt.CheckDate"
                    @input="dateMemuShow = false"
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
            <PeopleSelect v-model="ipt.ErrPeopleId" :isMuti="false" :key="componentKey" @change="getPeopleData" />
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
            <v-btn dark class="mr-4"
                to="/smis/car-safe-performance/speed-abnormal"
            >回搜尋頁</v-btn>
            
            <v-btn
                color="success"
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
</v-container>
</template>

<script>
import UploadFileAdd from '@/components/UploadFileAdd.vue'
import UploadFileEdit from '@/components/UploadFileEdit.vue'
import PeopleSelect from '@/components/PeopleSelect'
import { mapState, mapActions } from 'vuex'
import { login } from '@/apis/login'
import { carspeedQuery,carspeedInsert,carspeedUpdate } from '@/apis/smis/safetyPerformance'
import { getNowFullTime,encodeObject,decodeObject } from '@/assets/js/commonFun'

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
        dateMemuShow: false,  // 日曆是否顯示
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

            // -------------- 編輯時 -------------- 
            if (this.id) {
                this.chLoadingShow()
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
                    this.chLoadingShow()
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
            this.chLoadingShow()
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
                    this.chLoadingShow()
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
                    this.chLoadingShow()
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
            console.log("加入要上傳的檔案");
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
            this.chLoadingShow()

            setTimeout(() => {
                // 後端請求後，回傳檔案資料 (id、filename、link)
                // this.ipt.files.push(fileData)
                this.chMsgbar({ success: true, msg: '檔案上傳成功'})
                this.chLoadingShow()
            }, 1000)
        },
        // 刪除檔案 (編輯時)
        deleteFile(id, idx) {
            if (confirm('你確定要刪除嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    // 後端請求後，移除檔案列表
                    // this.ipt.files.splice(idx, 1)
                    this.chMsgbar({ success: true, msg: '檔案刪除成功'})
                    this.chLoadingShow()
                }, 1000)
            }
        },
    },
    created() {
        this.initData()
    }
}
</script>