<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">
        {{ (this.isEdit)? `軔機檢查異常表編輯 (編號：${ id })` : '軔機檢查異常表新增' }}
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
                <v-icon class="mr-1 mb-1">mdi-train</v-icon>機車或客車
            </h3>
            <v-select
                v-model="ipt.CarType"
                :items="[{value:'1',text:'機車'},{value:'2',text:'客車'}]"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
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
        <template v-if="!isEdit">
            <UploadFileAdd
                title="附件上傳"
                :uploadDisnable="false"
                :fileList="ipt.files"
                @joinFile="joinFile"
                @rmFile="rmFile"
            />
        </template>

        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="mr-4"
                to="/smis/car-safe-performance/machine-abnormal"
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

            <UploadFileEdit title="檔案管理"
                :fileList="ipt.files"
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
export default {
    props:['id'],
    data: () => ({
        valid: true,  // 表單是否驗證欄位
        isEdit: false,  // 是否為編輯
        ipt: {},
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
        },
        dateMemuShow: false,  // 日曆是否顯示
    }),
    components: {
        UploadFileAdd,
        UploadFileEdit,
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
                this.isEdit = true
                brakeQuery({
                    FlowID: this.id,
                    ClientReqTime: getNowFullTime(),
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then( res => {
                    console.log("res.data.DataList[0]: ", res.data.DataList[0])
                    if (res.data.ErrorCode == 0) {
                        this.ipt = {FileCount:[], ...decodeObject(res.data.DataList[0])}  
                        console.log("this.ipt2: ", this.ipt)  
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
        // 送出
        save() {
            this.chLoadingShow()
            this.ipt.CheckDate = this.ipt.CheckDate.replace(/-/g,'/')
            if(this.isEdit){
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
                }).catch( err => {
                    console.warn(err)
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，資料更新失敗' })
                }).finally(() => {
                    this.chLoadingShow()
                })
            }else{
                brakeInsert({
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
        // 加入要上傳的檔案
        joinFile(obj, bool) {
            if (bool) {
                this.ipt.files.push(obj)  // 加入要上傳後端的檔案
            } else {
                this.showFiles.push(obj)  // 加入要顯示的縮圖
            }
        },
        // 移除要上傳的檔案 (組件用)
        rmFile(idx) {
            this.showFiles.splice(idx, 1)
            this.ipt.files.splice(idx, 1)
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