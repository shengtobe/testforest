<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">
        {{ (this.isEdit)? `軔機檢查異常表編輯 (編號：${ id })` : '軔機檢查異常表新增' }}
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
        <v-col cols="12" sm="5" md="4">
            <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>車號
            </h3>
            <v-text-field solo @click="eqCode=true;key++" readonly v-model="searchName" clearable @click:clear="clickCleanCode()"/>
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
                        <EquipCode :key="'eq_' + key" :nowEqCode="com_equipCode" :toLv="2" :disableToLv="1" :needIcon="false" :noLabel="true" 
                        @getEqCode="getRtnCode" @getEqName="getRtnName" ref="rkey"/>
                    </div>
                    <v-card-actions class="px-5 pb-5">
                        <v-spacer></v-spacer>
                        <v-btn class="mr-2 btn-close" dark elevation="4"  :loading="isLoading" @click="eqCode = false">取消</v-btn>
                        <v-btn class="btn-add" dark elevation="4"  :loading="isLoading" @click="selectEQ">確認</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
        <v-col cols="12" sm="4" md="3" v-if="false">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-train</v-icon>機車或客車
            </h3>
            <v-select
                v-model="ipt.CarType"
                :items="[{value:'1',text:'機車'},{value:'2',text:'客車'}]"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3" v-if="false">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-tag-multiple</v-icon>車號
            </h3>
            <v-text-field
                v-model.trim="ipt.CarCode"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>車次
            </h3>
            <v-text-field
                v-model.trim="ipt.CarVersion"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-pen</v-icon>異常說明
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入異常說明"
                v-model.trim="ipt.ErrorDesp"
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
                v-model.trim="ipt.ErrorCheckStatus"
            ></v-textarea>
        </v-col>

        <!-- 檔案上傳，新增時 -->
        <template >
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
                to="/smis/car-safe-performance/machine-abnormal"
            >回搜尋頁</v-btn>
            
            <v-btn
                class="btn-add white--text"
                @click="save"
            >{{ (isEdit)? '儲存變更': '送出' }}</v-btn>
        </v-col>

        <!-- 附件 (編輯時) -->
        <template v-if="false">
            <v-col cols="12" class="mt-8 mb-2">
                <v-divider></v-divider>
            </v-col>

            <UploadFileEdit title="檔案管理"
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
import { mapState, mapActions } from 'vuex'
import { brakeInsert,brakeQuery,brakeUpdate } from '@/apis/smis/safetyPerformance'
import { getNowFullTime,encodeObject,decodeObject } from '@/assets/js/commonFun'
import EquipCode from '@/components/EquipRepairCode'
export default {
    props:['id'],
    data: () => ({
        valid: true,  // 表單是否驗證欄位
        isEdit: false,  // 是否為編輯
        ipt: {},
        showFiles: [],  // 要顯示的縮圖
        defaultIpt: {
            DepartCode:'',
            Depart:'',
            PeopleId:'',
            PeopleName:'',
            ReportCode:'',
            CheckDate: new Date().toISOString().substr(0, 10),
            CarVersion:'',
            CarType:'1',
            CarCode:'',
            ErrorDesp:'',
            ErrorCheckStatus:'',
            FileCount: [],
            MaintainCode_System: 'RST',  // 類型
            MaintainCode_Loc: ''
        },
        key: 0,
        searchName: '',
        preSetEqcode: '',
        preSerEqName: '',
        isLoading: false,
        eqCode: false,
        BarkeID: '',
        FileCount: [],
        dateMenuShow: false,  // 日曆是否顯示
    }),
    components: {
        UploadFileAdd,
        UploadFileEdit,
        EquipCode,
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
        com_equipCode: {
            get: function() {
                return this.ipt.MaintainCode_System + (this.ipt.MaintainCode_Loc==''?'':'-' + this.ipt.MaintainCode_Loc)
            },
            set: function(value) {
                if(value != ''){
                    let splitArr = value.split('-')
                    this.ipt.MaintainCode_System = splitArr[0]
                    this.ipt.MaintainCode_Loc = splitArr[1]
                }
            }
        },
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
            this.ipt.MaintainCode_System = 'RST'
            this.ipt.MaintainCode_Loc = ''
            this.com_equipCode = 'RST-'
            this.searchName = ''
            // -------------- 編輯時 -------------- 
            if (this.id) {
                this.chLoadingShow({show:true})
                this.isEdit = true
                brakeQuery({
                    FlowID: this.id,
                    ClientReqTime: getNowFullTime(),
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then( res => {
                    if (res.data.ErrorCode == 0) {
                        this.ipt = {FileCount: [], ...decodeObject(res.data.DataList[0]), BarkeID: res.data.DataList[0].BarkeID}  
                        this.ipt.CheckDate = this.ipt.CheckDate.split(' ')[0].replace(/\//g,"-")
                        this.com_equipCode = this.ipt.CarCode
                        this.searchName = this.ipt.CarCode
                        this.key++
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
            } else{
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
        //機車回傳中文
        getRtnName(cName) {
            (cName)
            this.preSerEqName = cName.replace('車輛(RST)-','')
            if(cName.includes('客車') || cName.includes('工程車')){
                this.ipt.CarType = '2'
            }
            else{
                this.ipt.CarType = '1'
            }
        },
        //機車回傳
        getRtnCode(code) {
            this.preSetEqcode = code
            this.ipt.CarCode = code
        },
        //機車送出按鈕
        selectEQ() {
            this.com_equipCode = this.preSetEqcode
            this.searchName = this.preSetEqcode
            this.eqCode = false
        },
        // 送出
        save() {
            // let dw = []
            // dw = [...encodeObject(this.ipt)];
            // return
            // dw.forEach(element => {
            // });
            // return
            this.chLoadingShow({show:true})
            this.ipt.CheckDate = this.ipt.CheckDate.replace(/-/g,'/')
            if(this.isEdit){
                // this.chLoadingShow({show:true})
                // return
                brakeUpdate({
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
                    this.ipt.FileCount = [ ...[]]
                    this.showFiles = [ ...[]]
                }).catch( err => {
                    console.warn(err)
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，資料更新失敗' })
                }).finally(() => {
                    this.chLoadingShow({show:false})
                })
            }else{
                brakeInsert({
                    ...encodeObject(this.ipt),
                    // FileCount: this.FileCount,
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
        // 加入要上傳的檔案
        joinFile(obj, bool) {
            if (bool) {
                this.ipt.FileCount.push(obj)  // 加入要上傳後端的檔案
            } else {
                this.showFiles.push(obj)  // 加入要顯示的縮圖
            }
        },
        clickCleanCode(){
            this.ipt.MaintainCode_System = 'RST'
            this.ipt.MaintainCode_Loc = ''
            this.com_equipCode = 'RST-'
            this.searchName = ''
        },
        // 移除要上傳的檔案 (組件用)
        rmFile(idx) {
            this.showFiles.splice(idx, 1)
            this.ipt.FileCount.splice(idx, 1)
        },
        // 上傳檔案 (編輯時)
        uploadFile(file) {
            this.chLoadingShow({show:true})

            return

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