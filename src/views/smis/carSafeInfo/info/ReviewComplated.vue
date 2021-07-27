<template>
<v-container style="max-width: 1200px" class="label-header">
    <h2 class="mb-4 label-title">安全資訊編號：{{ id }}</h2>

    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8">
        <BottomTable :items="bottomItems" />
</v-row>
        
        <FileListShow :fileList="files" title="檔案列表" />
<v-row>
        <!-- <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-paperclip</v-icon>檔案附件
                    </span>
                </v-col>

                <v-col class="white pa-3">
                    <v-chip small label color="primary" class="mr-2 mb-2 mb-sm-0"
                        v-for="item in files"
                        :key="item.fileName"
                        :href="item.link"
                        :download="item.fileName"
                    >
                        {{ item.fileName }}
                    </v-chip>
                </v-col>
            </v-row>
        </v-col> -->

        <v-col cols="12" class="mt-8" v-if="status == 3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-pen</v-icon>加會意見
                <span class="red--text">*</span>
            </h3>
            <v-textarea
                hide-details
                auto-grow
                solo
                rows="6"
                placeholder="請輸入加會意見"
                v-model.trim="opinion"
            ></v-textarea>
        </v-col>

        <!-- 加會意見列表 -->
        <v-col cols="12" class="mt-8" v-if="status == 4">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>加會意見
            </h3>
            
            <v-row no-gutters
                style="border-bottom: 1px solid #CFD8DC"
                v-for="item in opinionList"
                :key="item.PeopleName"
            >
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">{{ item.PeopleName }}</span>
                </v-col>

                <v-col class="white pl-3 pb-2 pt-3"
                    v-html="item.JoinMemo.replace(/\n/g, '<br>')"
                ></v-col>
            </v-row>
        </v-col>

        <v-col cols="12" class="text-center mt-12 mb-8">
            <v-btn dark class="ma-2 btn-close"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done">
                <v-btn dark  class="ma-2 btn-delete"
                    @click="dialog = true"
                    v-if="status == 2 && isShowBtn"
                >退回</v-btn>

                <v-btn dark class="ma-2 btn-modify"
                    :to="`/smis/car-safeinfo/info/${id}/edit`"
                    v-if="isShowBtn_edit"
                >編輯</v-btn>

                <v-btn dark  class="ma-2 btn-add"
                    @click="save"
                    v-if="status == 2 && isShowBtn"
                >同意發布</v-btn>

                <v-btn dark  class="ma-2 btn-add"
                    v-if="status == 3 && isShowBtn_add"
                    @click="sendSuggestion"
                >送出意見</v-btn>
            </template>

            <v-btn dark class="ma-2 btn-modify"
                v-if="status == 4"
                @click="print"
            >列印</v-btn>
        </v-col>
    </v-row>

    <!-- 讀取追蹤 -->
    <template v-if="status == 4">
        <v-divider class="mx-2 mt-5 mb-4"></v-divider>

        <h2 class="mb-4 px-2 text-center">
            <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>讀取追蹤
        </h2>

        <v-row class="px-2">
            <!-- 加會人 -->
            <v-col cols="12">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>加會人
                </h3>

                <v-card>
                    <v-data-table
                        :headers="joinHeaders"
                        :items="joinTableItems"
                        disable-sort
                        hide-default-footer
                        class="theme-table"
                    >
                        <template v-slot:no-data>
                            <span class="red--text subtitle-1">沒有資料</span>
                        </template>

                        <template v-slot:item.isRead="{ item }">
                            <div v-if="item.isRead == '已讀'">{{ item.isRead }}</div>
                            <div v-else class="error--text">{{ item.isRead }}</div>
                        </template>

                        <template v-slot:item.hasMsg="{ item }">
                            <div v-if="item.hasMsg">已留意見</div>
                            <div v-else class="error--text">尚未留意見</div>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>

            <!-- 收件人 -->
            <v-col cols="12" sm="4" md="3" class="mt-12">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>收件人
                </h3>
                <v-text-field
                    v-model.trim="keyword"
                    placeholder="請輸入任意關鍵字"
                    solo
                    hide-details
                ></v-text-field>
            </v-col>

            <v-col cols="12">
                <v-card>
                    <v-data-table
                        :search="keyword"
                        :headers="headers"
                        :items="tableItems"
                        :options.sync="pageOpt"
                        disable-sort
                        hide-default-footer
                        class="theme-table"
                    >
                        <template v-slot:no-data>
                            <span class="red--text subtitle-1">沒有資料</span>
                        </template>

                        <template v-slot:no-results>
                            <span class="red--text subtitle-1">沒有符合「{{ keyword }}」的資料</span>
                        </template>

                        <template v-slot:item.isRead="{ item }">
                            <div v-if="item.isRead == '已讀'">{{ item.isRead }}</div>
                            <div v-else class="error--text">{{ item.isRead }}</div>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>

            <v-col cols="12" class="text-center mb-8">
                <v-btn dark class="btn-close"
                    to="/smis/car-safeinfo/info"
                >回搜尋頁</v-btn>
            </v-col>
        </v-row>
    </template>

    <!-- 退回 dialog -->
    <v-dialog v-model="dialog" max-width="600px"
        v-if="status == 2"
    >
        <v-card class="theme-del-card">
            <v-toolbar dark flat dense class="mb-2 metal-red-top">
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
                            solo
                            rows="8"
                            placeholder="請輸入原因"
                            v-model.trim="backReason"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            
            <v-card-actions class="px-5 pb-5">
                <v-spacer></v-spacer>
                <v-btn class="mr-2 btn-close white--text" elevation="4" :loading="isLoading" @click="dialog = false">取消</v-btn>
                <v-btn class="btn-add white--text"  elevation="4" :loading="isLoading" @click="withdraw">送出</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { canInUpdate } from '@/apis/access'
import TopBasicTable from '@/components/TopBasicTable.vue'
import BottomTable from '@/components/BottomTable.vue'
import FileListShow from '@/components/FileListShow.vue'
import { safetyinfodelete, safetyinforeturn, safetyinfojoincheck, safetyinfocheck } from '@/apis/smis/carSafeInfo'
import { fetchSupervisor } from '@/apis/workList/maintain'

export default {
    props: ['itemData'],
    data: () => ({
        id: '',  // 編號
        done: false,  // 是否完成頁面操作
        status: '',  // 處理狀態
        isShowBtn: false, // 按鈕是否顯示(依權限)
        isShowBtn_edit: false, // 按鈕是否顯示(依權限)
        isShowBtn_add: false, // 加會送出建議是否顯示(依權限)
        topItems: [],  // 上面的欄位
        bottomItems: [],  // 下面的欄位
        files: [],  // 檔案附件
        opinion: '',  // 加會意見
        opinionList: [],  // 意見列表
        isLoading: false,  // 退回 dialog 是否讀取中
        dialog: false,  // 退回 dialog 是否顯示
        backReason: '',  // 退回原因
        keyword: '',  // 關鍵字
        joinTableItems: [],  // 加會人表格資料
        joinHeaders: [  // 加會人表格顯示的欄位
            { text: '項次', value: 'num', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 80 },
            { text: '單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '姓名', value: 'name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '是否讀取', value: 'isRead', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '讀取時間', value: 'time', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '是否已留意見', value: 'hasMsg', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        ],
        tableItems: [],  // 收件人表格資料
        pageOpt: { page: 1 },  // 收件人目前頁數
        headers: [  // 收件人表格顯示的欄位
            { text: '項次', value: 'num', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 80 },
            { text: '單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '姓名', value: 'name', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '是否讀取', value: 'isRead', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '讀取時間', value: 'time', align: 'center', filterable: false, divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        ],
    }),
    components: {
        TopBasicTable,
        BottomTable,
        FileListShow,
    },
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        }
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
            groupData: state => state.groupData,
        }),
        
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'closeWindow',  // 關閉視窗
        ]),
        ...mapActions('user', [
            'saveUserGroup',  // 儲存使用者權限(群組)資料
        ]),
        // 初始化資料
        setShowData(obj) {
            // this.chLoadingShow({show:true})
            this.chLoadingShow({ show: true})
            console.log("安全資訊 審核中 obj: ", obj)
            
            
            this.id = obj.SaftyInfoCode  // 編號
            this.status = obj.SaftyInfoStatus  // 事故事件狀態(值)
            this.topItems = obj.topItems  // 上面的欄位資料
            this.bottomItems = obj.bottomItems  // 下面的欄位資料
            this.files = [ ...obj.FileCount ]  // 檔案附件
            //this.files = [ ...obj.files ]  // 檔案附件
            //this.opinionList = [ ...obj.opinionList ]  // 加會意見列表
            this.opinionList = [ ...obj.JoinPeople ]  // 加會意見列表
            console.log("status: ", this.status)
            if(this.status == 1){
                if(this.userData.UserId == obj.PeopleId){
                    
                }
            }
            else if(this.status == 2){
                //敲門
                // canInUpdate({
                //     ClientReqTime: getNowFullTime(),  // client 端請求時間
                //     OperatorID: this.userData.UserId,  // 操作人id
                // }).then(res => {
                //     if (res.data.ErrorCode == 0) {
                //         this.saveUserGroup(res.data.GroupData)
                //         this.isShowBtn = this.groupData.RoleLv4 == "T";
                //     }
                // }).catch( err => {
                //     console.log(err)
                // }).finally(() => {
                // })
                let sup = ''
                //查詢員工所屬的部門主管資料
                fetchSupervisor({
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                    ReqID: obj.PeopleId,  // 立單人id
                }).then(res => {
                    // this.isShowBtn = res.data == this.userData.UserId
                    console.log("主管/登入者: ", res.data.ID+'/'+this.userData.UserId);
                    sup = res.data.ID
                    if(this.userData.UserId == res.data.ID){ // 如果登入者是主管
                        this.isShowBtn = this.isShowBtn_edit = true
                    }
                    else if(this.userData.UserId == obj.PeopleId){ // 如果登入者是通報人
                        this.isShowBtn_edit = true
                    }
                    else{ // 都不是
                        this.$router.push({ path: '/no-permission' })
                    }
                }).catch(err => {
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，操作失敗' })
                }).finally(() => {
                    // this.isLoading = this.dialog = false
                })
                
            }
            else if(this.status == 3){ // 加會中
                this.isShowBtn_edit = this.isShowBtn = false
                // 驗證登入者是否為加會人
                let joinerIdArr = obj.JoinPeople.map(e => e.PeopleId)
                console.log("加會人們: ", joinerIdArr);
                //查詢員工所屬的部門主管資料
                fetchSupervisor({
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                    ReqID: obj.PeopleId,  // 立單人id
                }).then(res => {
                    // this.isShowBtn = res.data == this.userData.UserId
                    console.log("主管/登入者: ", res.data.ID+'/'+this.userData.UserId);
                    if(joinerIdArr.includes(this.userData.UserId)){// 如果登入者是加會人
                        this.isShowBtn_add = true
                    }
                    else if(this.userData.UserId == res.data.ID){ // 如果登入者是主管
                    }
                    else if(this.userData.UserId == obj.PeopleId){ // 如果登入者是通報人
                    }
                    else{ // 都不是
                        this.$router.push({ path: '/no-permission' })
                    }
                }).catch(err => {
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，操作失敗' })
                }).finally(() => {
                    // this.isLoading = this.dialog = false
                })
                
                
            }
            else if(this.status == 4){ // 已發布
                this.isShowBtn_edit = this.isShowBtn = isShowBtn_add = false
                let joinerIdArr = obj.JoinPeople.map(e => e.PeopleId) // 加會人
                let ccArr = obj.RecCopy.map(e => e.PeopleId) // 副本人
                let recArr = obj.RecPeople.map(e => e.PeopleId) // 收件人
                console.log("加會人們: ", joinerIdArr);
                //查詢員工所屬的部門主管資料
                fetchSupervisor({
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                    ReqID: obj.PeopleId,  // 立單人id
                }).then(res => {
                    // this.isShowBtn = res.data == this.userData.UserId
                    console.log("主管/登入者: ", res.data.ID+'/'+this.userData.UserId);
                    if(joinerIdArr.includes(this.userData.UserId)){// 如果登入者是加會人
                    }
                    else if(this.userData.UserId == res.data.ID){ // 如果登入者是主管
                    }
                    else if(this.userData.UserId == obj.PeopleId){ // 如果登入者是通報人
                    }
                    else if(ccArr.includes(this.userData.UserId) || recArr.includes(this.userData.UserId)){ // 如果登入者是副本人或收件人
                    }
                    else{ // 都不是
                        this.$router.push({ path: '/no-permission' })
                    }
                }).catch(err => {
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，操作失敗' })
                }).finally(() => {
                    // this.isLoading = this.dialog = false
                })
            }
            this.chLoadingShow({ show: false})
            
            
            // if(this.status == 2){
            //     //敲門
            //     canInUpdate({
            //         ClientReqTime: getNowFullTime(),  // client 端請求時間
            //         OperatorID: this.userData.UserId,  // 操作人id
            //     }).then(res => {
            //         if (res.data.ErrorCode == 0) {
            //             this.saveUserGroup(res.data.GroupData)
            //             this.isShowBtn = this.groupData.RoleLv4 == "T";
            //         }
            //     }).catch( err => {
            //         console.log(err)
            //     }).finally(() => {
            //     })
            // }


            // this.chLoadingShow({show:true})
            //     safetyinfodetail({
            //             ClientReqTime: getNowFullTime(),  // client 端請求時間
            //            OperatorID: this.userData.UserId,  // 操作人id
            //            SaftyInfoCode: obj.SaftyInfoCode,  // DB table
                
            //           QyName: [    // 欲回傳的欄位資料
            //            'SaftyInfoCode',
            //          'InfoTitle',
            //            'InfoContent',
            //           'PeopleId',
            //            'PeopleName',
            //           'PeopleRootDepartId',
            //           'PeopleRootDepartName',
            //           'SaftyInfoStatus',
            //            'RecPeople',  
            //            'RecCopy',
            //           'JoinPeople', 
            //           'FileCount', 
                                  
            //           ],
            //           }).then(res => {
            //            //console.log(res.data)
            //          //console.log(res.data.RecPeople)
            //            //this.tableItems = JSON.parse(res.data.order_list)
            //             //console.log(this.tableItems)
            //            this.setShowDataint(res.data)
            //            //this.tableItems = res.data
                
            //            }).catch(err => {
            //             console.log(err)
            //             alert('查詢時發生問題，請重新查詢!')
            //            }).finally(() => {
            //              this.chLoadingShow({show:true})
            //            })

            // // 讀取追蹤-加會人
            // this.joinTableItems = obj.Jdata.map((item, idx) => ({
            //     num: idx + 1,
            //     depart: item.depart,
            //     name: item.name,
            //     isRead: (item.isRead)? '已讀' : '未讀',
            //     time: item.time,
            //     hasMsg: item.hasMsg,
            // }))

            // // 讀取追蹤-收件人
            // this.tableItems = obj.Rdata.map((item, idx) => ({
            //     num: idx + 1,
            //     depart: item.depart,
            //     name: item.name,
            //     isRead: (item.isRead)? '已讀' : '未讀',
            //     time: item.time,
            // }))
        },
        
        setShowDataint(obj) {
            this.status = obj.SaftyInfoStatus
            
            let stry = 'err'
                 switch(obj.SaftyInfoStatus) {
                  case '1':
                      stry= '已立案'
                      break
                  case '2':
                      stry=  '審核中'
                       break
                 case '3':
                     stry=  '加會中'
                     break
                 case '4':
                      stry=  '已發布'
                     break
                  default:
                        break
                     }
                    console.log(obj)
                    let topItems = [  // 上面的欄位
                        { icon: 'mdi-ray-vertex', title: '發布狀態', text: stry },
                        { icon: 'mdi-bank', title: '通報單位', text: obj.PeopleRootDepartName },
                        { icon: 'mdi-account', title: '通報人', text: obj.PeopleName },
                    ]

                    // 設定下面的欄位資料
                    let RecPeoplestr = obj.RecPeople.map(item => item.PeopleName).join('、');
                    let RecCopystr = obj.RecCopy.map(item => item.PeopleName).join('、');
                    let JoinPeoplestr = obj.JoinPeople.map(item => item.PeopleName).join('、');
                    
                    let bottomItems = [
                        { dataType: 'text', oneline: true, icon: 'mdi-file-document', title: '通報主題', text: obj.InfoTitle },
                        { dataType: 'text', oneline: true, icon: 'mdi-account-multiple', title: '收件人', text: RecPeoplestr },
                        { dataType: 'text', oneline: true, icon: 'mdi-account-multiple', title: '副本', text: RecCopystr },
                        { dataType: 'text', oneline: true, icon: 'mdi-account-multiple', title: '加會人', text: JoinPeoplestr },
                        { dataType: 'text', oneline: false, icon: 'mdi-file-document', title: '發布內容', text: obj.InfoContent.replace(/\n/g, '<br>') },
                    ]
                    //this.$route.params.id


                    this.itemData = { ...obj, topItems, bottomItems }  // demo 用時 ...res.data 先改為 obj

        },
        // 退回
        withdraw() {
            this.chLoadingShow({ show: true})
//console.log(this.backReason)
            setTimeout(() => {

                safetyinforeturn({
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                    SaftyInfoCode: this.id,  // DB table
                    Reason: this.backReason //退回原因
                 }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        
                        this.chMsgbar({ success: true, msg: '退回成功' })
                        this.done = true  // 隱藏頁面操作按鈕
                        this.dialog = false
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                 }).catch(err => {
                     console.log(err)
                     alert('退回時發生問題，請重新執行!')
                 }).finally(() => {
                })
              
            }, 1000)
            this.chLoadingShow({ show: false})
        },
        // 作廢
        del() {
            if (confirm('你確定要作廢嗎?')) {
                this.chLoadingShow({ show: true})

                setTimeout(() => {
                    safetyinfodelete({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                SaftyInfoCode: this.id,  // DB table
                
             }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        
                        this.chMsgbar({ success: true, msg: '作廢成功' })
                        this.done = true  // 隱藏頁面操作按鈕
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
             }).catch(err => {
                console.log(err)
                alert('作廢時發生問題，請重新執行!')
             }).finally(() => {
                this.chLoadingShow({ show: false})
             })}, 1000)
            }
        },
        // 同意發布
        save() {
            if (confirm('你確定要發布嗎?')) {
                this.chLoadingShow({ show: true})

                setTimeout(() => {

                safetyinfocheck({
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                    SaftyInfoCode: this.id,  // DB table
                    
                 }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        
                        this.chMsgbar({ success: true, msg: '發布成功' })
                        this.done = true  // 隱藏頁面操作按鈕
                        //this.dialog = false
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                 }).catch(err => {
                     console.log(err)
                     alert('發布時發生問題，請重新執行!')
                 }).finally(() => {
                     this.chLoadingShow({ show: false})
                })

                    this.chMsgbar({ success: true, msg: '同意發布成功'})
                    this.done = true  // 隱藏頁面操作按鈕
                }, 1000)
            }
        },
        // 送出意見
        sendSuggestion() {
            if(this.opinion == ''){
                alert("確實填寫加會意見")
                return
            }
            if (confirm('你確定要送出意見嗎?')) {
                
                this.chLoadingShow({ show: true})

                setTimeout(() => {
//console.log(this.opinion)
                safetyinfojoincheck({
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                    SaftyInfoCode: this.id,  // DB table
                    JoinMemo: this.opinion //加會意見
                 }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        
                        this.chMsgbar({ success: true, msg: '同意送出意見成功' })
                        this.done = true  // 隱藏頁面操作按鈕
                        this.dialog = false

                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                 }).catch(err => {
                     console.log(err)
                     alert('同意送出意見時發生問題，請重新執行!')
                 }).finally(() => {
                     this.chLoadingShow({ show: false})
                })
                    this.chMsgbar({ success: true, msg: '同意送出意見成功'})
                    this.done = true  // 隱藏頁面操作按鈕

                }, 1000)
            }
        },
        // 列印
        print() {
            this.chLoadingShow({ show: true})

            setTimeout(() => {
                this.chLoadingShow({ show: false})
            }, 1000)
        },
    },
    created() {
        this.setShowData(this.itemData)
    }
}
</script>