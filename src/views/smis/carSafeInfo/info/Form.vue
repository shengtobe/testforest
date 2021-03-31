<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">
        {{ (this.isEdit)? `安全資訊編輯 (編號：${ routeId })` : '安全資訊新增' }}
    </h2>

    <v-row class="px-2 mb-8">
        <v-col cols="12" sm="8">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>通報主題
                <span class="red--text">*</span>
            </h3>
            <v-text-field
                v-model.trim="ipt.title"
                solo
                placeholder="請輸入關鍵字"
            ></v-text-field>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-pen</v-icon>發布內容
                <span class="red--text">*</span>
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入發布內容"
                v-model.trim="ipt.desc"
            ></v-textarea>
        </v-col>

        <!-- 發布對象 -->
        <!-- <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>發布對象
            </h3>
            <v-row>
                <v-col cols="12" sm="4" md="3">
                    <v-select
                        hide-details
                        v-model="choose"
                        :items="opts.depart"
                        @change="changeDepart"
                        solo
                    ></v-select>
                </v-col>

                <v-col cols="12" sm="4" md="3">
                    <v-select
                        hide-details
                        v-model="target"
                        :items="opts.target"
                        solo
                    ></v-select>
                </v-col>
            </v-row>
            <v-sheet color="white" elevation="2" class="px-2 pb-2 mt-3">
                <v-row no-gutters>
                    <v-col cols="12" class="mt-2">
                        <v-btn
                            class="mr-3"
                            dark
                            color="indigo"
                            @click="joinAll"
                        >加入全部</v-btn>

                        <v-btn
                            dark
                            color="indigo"
                            @click="join"
                        >加入勾選</v-btn>
                    </v-col>

                    <v-col cols="12" sm="3" md="2"
                        v-for="item in checkboxs"
                        :key="item.value"
                    >
                        <v-checkbox
                            v-model="chooseMembers"
                            :label="item.name"
                            color="blue"
                            :value="item.value"
                            hide-details
                        ></v-checkbox>
                    </v-col>
                </v-row>
            </v-sheet>
        </v-col> -->

        <!-- 收件人 -->
        <v-col cols="12">
            <h4 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>收件人
                <!-- <v-btn
                    small
                    color="error"
                    @click="delAll('recipients')"
                    class="mb-1 ml-2"
                >移除全部</v-btn> -->
            </h4>
            <PeopleSelect v-model="ipt.recipients" :isMuti="true"/> 
            <!-- <div>
                <v-chip
                    v-for="(item, idx) in ipt.recipients"
                    :key="item"
                    class="mr-3 mt-2"
                    label
                    color="yellow lighten-3"
                >
                    {{ transferName(item) }} 
                    <v-icon right
                        @click="delMember(idx, 'recipients')"
                    >mdi-close-circle</v-icon>
                </v-chip>
            </div> -->
        </v-col>

        <!-- 副本 -->
        <v-col cols="12" class="mt-8">
            <h4 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>副本
                <!-- <v-btn
                    small
                    color="error"
                    @click="delAll('cc')"
                    class="mb-1 ml-2"
                >移除全部</v-btn> -->
            </h4>
            <PeopleSelect v-model="ipt.cc" :isMuti="true"/> 
            <!-- <div>
                <v-chip
                    v-for="(item, idx) in ipt.cc"
                    :key="item"
                    class="mr-3 mt-2"
                    label
                    color="yellow lighten-3"
                >
                    {{ transferName(item) }} 
                    <v-icon right
                        @click="delMember(idx, 'cc')"
                    >mdi-close-circle</v-icon>
                </v-chip>
            </div> -->
        </v-col>

        <!-- 加會人 -->
        <v-col cols="12" class="mt-8">
            <h4 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>加會人
                <!-- <v-btn
                    small
                    color="error"
                    @click="delAll('joiners')"
                    class="mb-1 ml-2"
                >移除全部</v-btn> -->
            </h4>
            <PeopleSelect v-model="ipt.joiners" :isMuti="true"/> 
            <!-- <div>
                <v-chip
                    v-for="(item, idx) in ipt.joiners"
                    :key="item"
                    class="mr-3 mt-2"
                    label
                    color="yellow lighten-3"
                >
                    {{ transferName(item) }} 
                    <v-icon right
                        @click="delMember(idx, 'joiners')"
                    >mdi-close-circle</v-icon>
                </v-chip>
            </div> -->
        </v-col>

        <!-- 上傳檔案 (新增時) -->
        <!-- <template v-if="!isEdit"> -->
        <template v-if="!isEdit">
            <v-col cols="12" class="mt-8 mb-2">
                <v-divider></v-divider>
            </v-col>

            <UploadFileAdd
                title="檔案上傳"
                :uploadDisnable="false"
                :fileList="showFiles"
                @joinFile="joinFile"
                @rmFile="rmFile"
            />
        </template>

        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="mr-4"
                v-if="!isEdit"
                to="/smis/car-safeinfo/info"
            >回搜尋頁</v-btn>

            <v-btn dark class="mr-4"
                v-else
                :to="`/smis/car-safeinfo/info/${this.routeId}/show`"
            >回上層</v-btn>

            <v-btn dark color="success"
                @click="save"
            >{{ (isEdit)? '儲存變更': '送出' }}</v-btn>
        </v-col>

        <!-- 上傳檔案 (編輯時) -->
        <template v-if="isEdit">
            <v-col cols="12" class="mb-2">
                <v-divider></v-divider>
            </v-col>

            <UploadFileEdit
                :fileList="ipt.files"
                @uploadFile="uploadFile"
                @deleteFile="deleteFile"
                class="mb-10"
            />
        </template>
    </v-row>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { dapartOptsForMember } from '@/assets/js/departOption'
import { getNowFullTime, getOrg } from '@/assets/js/commonFun'
import UploadFileAdd from '@/components/UploadFileAdd.vue'
import UploadFileEdit from '@/components/UploadFileEdit.vue'
import PeopleSelect from '@/components/PeopleSelect'
import { safetyinfocreate, safetyinfoquery, safetyinfodetail, safetyinfofileupdate, safetyinfofiledelete, safetyinfoupdate } from '@/apis/smis/carSafeInfo'

export default {
    data: () => ({
        getOrg_objneed: {},
        valid: true,  // 表單是否驗證欄位
        isEdit: false,  // 是否為編輯
        ipt: {},
        defaultIpt: {
            title: '',  // 通報主題
            desc: '',  // 發布內容
            recipients: [],  // 收件人
            cc: [],  // 副本
            joiners: [],  // 加會人
            files: [],  // 附件檔案
        },
        Status: '',
        
        choose: '',  // 所選部門
        target: 'recipients',  // 所選對像
        opts: {  // 下拉選單
            depart: dapartOptsForMember,
            target: [
                { text: '收件人', value: 'recipients' },
                { text: '副本', value: 'cc' },
                { text: '加會人', value: 'joiners' },
            ],
        },
        checkboxs: [],  // 選單
        chooseMembers: [],  // 勾選的員工
        members: [  // 所有員工資料
            { name: '趙國強 (K59632)', value: '1'},
            { name: '錢光華 (K12584)', value: '2'},
            { name: '孫文豪 (K69584)', value: '3'},
            { name: '李運深 (K24785)', value: '4'},
            { name: '周寶盛 (K65241)', value: '5'},
            { name: '吳泓吉 (K58963)', value: '6'},
            { name: '鄭家豪 (K24758)', value: '7'},
            { name: '王永慶 (K25896)', value: '8'},
        ],
        showFiles: [],  // 要顯示的縮圖
    }),
    
    components: {
        UploadFileAdd,
        UploadFileEdit,
        PeopleSelect,
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
        ]),
        // 初始化資料
        initData() {
            //this.getOrg_objneed = getOrg(this.userData.UserId);
            this.ipt = { ...this.defaultIpt }  // 初始化表單

            // -------------- 編輯時 -------------- 
            if (this.$route.params.id != undefined) {
                this.chLoadingShow()
                this.routeId = this.$route.params.id  // 路由參數(id)
                this.isEdit = true
             safetyinfodetail({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                SaftyInfoCode: this.routeId,  // DB table
                
                QyName: [    // 欲回傳的欄位資料
                    'SaftyInfoCode',
                    'InfoTitle',
                    'InfoContent',
                    'PeopleId',
                    'PeopleName',
                    'PeopleRootDepartId',
                    'PeopleRootDepartName',
                    'SaftyInfoStatus',
                    'RecPeople',  
                    'RecCopy',
                    'JoinPeople', 
                    'FileCount', 
                                  
                ],
             }).then(res => {
                console.log(res.data)
                console.log(res.data.RecPeople)
                //this.tableItems = JSON.parse(res.data.order_list)
                //console.log(this.tableItems)
                this.setShowDataint(res.data)
             }).catch(err => {
                console.log(err)
                alert('查詢時發生問題，請重新查詢!')
             }).finally(() => {
                this.chLoadingShow()
             })
                // 範例效果
                // setTimeout(() => {
                //     let obj = {
                //         id: '111',
                //         depart: '綜合企劃科',
                //         name: '王小明',
                //         title: '3月份團康活動',
                //         desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',  // 說明
                //         recipients: ['2', '4', '5'],  // 收件人
                //         cc: ['6'],  // 副本
                //         joiners: ['7'],  // 加會人
                //         files: [
                //             { fileName: 'ASRC200701.jpg', link: '/demofile/demo.jpg' },
                //             { fileName: '123.docx', link: '/demofile/123.docx' },
                //             { fileName: '456.xlsx', link: '/demofile/456.xlsx' },
                //         ],
                //         status: 1,
                //     }
                    
                //     this.setInitDate(obj)
                //     this.chLoadingShow()
                // }, 1000)
            }
        },
        // 設定資料(編輯時)
         setShowDataint(obj) {
                
                    switch(obj.SaftyInfoStatus) {
                case '1':
                    this.Status= '已立案'
                    break
                case '2':
                    this.Status=  '審核中'
                    break
                case '3':
                    this.Status=  '加會中'
                    break
                case '4':
                    this.Status=  '已發布'
                    break
                default:
                    break
            }
                     
            this.ipt.title = obj.InfoTitle // 通報主題
            this.ipt.desc = obj.InfoContent // 發布內容RecCopy: RCarr, JoinPeople: JParr, 
            this.ipt.recipients = obj.RecPeople.map(item => item.PeopleId)
            this.ipt.cc = obj.RecCopy.map(item => item.PeopleId)
            this.ipt.joiners = obj.JoinPeople.map(item => item.PeopleId)
            //this.ipt.recipients = [ ...obj.RecPeople ] // 收件人
            //this.ipt.cc = [ ...obj.RecCopy ] // 副本
            //this.ipt.joiners = [ ...obj.JoinPeople ] // 加會人
            this.ipt.files = [ ...obj.FileCount ] // 附件檔案
        },
        // 設定資料
        setInitDate(obj) {
            this.ipt.title = obj.title // 通報主題
            this.ipt.desc = obj.desc // 發布內容
            this.ipt.recipients = [ ...obj.recipients ] // 收件人
            this.ipt.cc = [ ...obj.cc ] // 副本
            this.ipt.joiners = [ ...obj.joiners ] // 加會人
            this.ipt.files = [ ...obj.files ] // 附件檔案
        },
        // 切換部門成員
        changeDepart() {
            this.chLoadingShow()

            // 範例效果
            setTimeout(() => {
                this.checkboxs = [ ...this.members ]  // 測試用先不過慮部門全列出
                this.chLoadingShow()
            }, 1000)
            
        },
        // 加入全部 (checkboxs 陣列元素是物件)
        joinAll() {
            this.checkboxs.forEach(ele => {
                // 若未選取則加入
                let member = this.ipt[this.target].find(item => item == ele.value)
                if (member == undefined) this.ipt[this.target].push(ele.value)
            })
        },
        // 加入勾選 (chooseMembers 陣列元素是物件的value屬性)
        join() {
            this.chooseMembers.forEach(ele => {
                // 若未選取則加入
                let member = this.ipt[this.target].find(item => item == ele)
                if (member == undefined) this.ipt[this.target].push(ele)
            })
            this.chooseMembers = [ ...[] ]
        },
        // 查詢名稱
        transferName(val) {
            return this.members.find(ele => ele.value == val).name
        },

        // 移除員工
        delMember(idx, t) {
            this.ipt[t].splice(idx, 1)
        },
        // 移除全部員工
        delAll(t) {
            this.ipt[t] = [ ...[] ]
        },
        // 加入要上傳的檔案 (新增時)
        joinFile(obj, bool) {
            //this.ipt.files.push(file)
            if (bool) {
                //console.log(obj)
                this.ipt.files.push(obj)  // 加入要上傳後端的檔案
            } else {
                //console.log(obj)
                this.showFiles.push(obj)  // 加入要顯示的縮圖
            }
        },
        // 移除要上傳的檔案 (新增時)
        rmFile(idx) {
            //this.ipt.files.splice(idx, 1)
            this.showFiles.splice(idx, 1)
            this.ipt.files.splice(idx, 1)
        },
        // 上傳檔案 (編輯時)
        uploadFile(file) {
            this.chLoadingShow()
            safetyinfofileupdate({
                        SaftyInfoCode: this.routeId,  // 措施編號
                        FileCount: file,  // 新檔案
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                    }).then(res => {
                        if (res.data.ErrorCode == 0) {
                            this.chMsgbar({ success: true, msg: '上傳成功' })
                            // 把檔案資料寫入畫面中
                            this.ipt.files = [ ...res.data.FileCount.map(item => ({
                                fileName: item.FileName,
                                link: item.FilePath,
                            }))]
                        } else {
                            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                            this.$router.push({ path: '/error' })
                        }
                    }).catch(err => {
                        this.chMsgbar({ success: false, msg: '伺服器發生問題，上傳失敗' })
                    }).finally(() => {
                        this.chLoadingShow()
                    })
        },
        // 刪除檔案 (編輯時)
        deleteFile(idx) {
            if (confirm('你確定要刪除嗎?')) {
                console.log(this.ipt.files)
                console.log(idx)
                this.chLoadingShow()
                safetyinfofiledelete({
                    SaftyInfoCode: this.routeId,   // 編號
                    FileName: this.ipt.files[idx].FileName,  // 檔案名稱
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.ipt.files.splice(idx, 1)
                        this.chMsgbar({ success: true, msg: '刪除成功' })
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，刪除失敗' })
                }).finally(() => {
                    this.chLoadingShow()
                })
                // setTimeout(() => {
                //     // 後端請求後，移除檔案列表
                //     this.ipt.files.splice(idx, 1)
                //     this.chMsgbar({ success: true, msg: '檔案刪除成功'})
                //     this.chLoadingShow()
                // }, 1000)
            }
        },
        // 送出
        save() {
            if (this.$route.params.id == undefined) {
                this.chLoadingShow()
                let RParr = this.ipt.recipients.map(item => ({
                    PeopleId: item
                }))
                let RCarr = this.ipt.cc.map(item => ({
                    PeopleId: item
                }))
                let JParr = this.ipt.joiners.map(item => ({
                    PeopleId: item
                }))
                console.log(RParr)
                console.log(RCarr)
                console.log(JParr)
                    safetyinfocreate({
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                        InfoTitle: this.ipt.title, //通報主題
                        InfoContent: this.ipt.desc,  //發布內容
                        RecPeople: RParr, 
                        RecCopy: RCarr, 
                        JoinPeople: JParr, 
                        FileCount: this.ipt.files,  // 附件檔案          
                    }).then(res => {
                        if (res.data.ErrorCode == 0) {
                            this.chMsgbar({ success: true, msg: '建立成功'})
                            this.status = '1'  // 狀態改為已回覆
                        } else {
                            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                            this.$router.push({ path: '/error' })
                        }
                    }).catch(err => {
                        this.chMsgbar({ success: false, msg: '建立成功'})
                    }).finally(() => {
                        this.chLoadingShow()
                    })

                // 測試用資料
                // setTimeout(() => {
                //     let txt = (this.isEdit)? '資料更新成功' :  '資料新增成功'
                //     if (!this.isEdit) this.$router.push({ path: '/smis/car-safeinfo/info' })
                //     this.chMsgbar({ success: true, msg: txt })
                //     this.chLoadingShow()
                // }, 1000)
            } else {
                this.chLoadingShow()
                let RParr = this.ipt.recipients.map(item => ({
                    PeopleId: item
                }))
                let RCarr = this.ipt.cc.map(item => ({
                    PeopleId: item
                }))
                let JParr = this.ipt.joiners.map(item => ({
                    PeopleId: item
                }))
                console.log(RParr)
                console.log(RCarr)
                console.log(JParr)
                    safetyinfoupdate({
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                        SaftyInfoCode: this.routeId,   // 編號
                        InfoTitle: this.ipt.title, //通報主題
                        InfoContent: this.ipt.desc,  //發布內容
                        RecPeople: RParr, 
                        RecCopy: RCarr, 
                        JoinPeople: JParr, 
                        FileCount: {},  // 附件檔案  
                        ApplyCheck: 'F',        
                    }).then(res => {
                        if (res.data.ErrorCode == 0) {
                            this.chMsgbar({ success: true, msg: '修改成功'})
                            this.status = '1'  // 狀態改為已回覆
                        } else {
                            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                            this.$router.push({ path: '/error' })
                        }
                    }).catch(err => {
                        this.chMsgbar({ success: false, msg: '修改成功'})
                    }).finally(() => {
                        this.chLoadingShow()
                    })
            }
        },
    },
    created() {
        this.initData()
    }
}
</script>