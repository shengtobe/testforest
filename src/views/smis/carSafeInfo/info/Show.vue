<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">安全資訊編號：{{ id }}</h2>

    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8" >
        
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

        <v-col cols="12" class="text-center mt-12 mb-8">
            <v-btn dark class="ma-2 btn-close"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done && isBtnShow">
                <v-btn dark class="ma-2 btn-modify"
                    :to="`/smis/car-safeinfo/info/${id}/edit`"
                >編輯</v-btn>

                <v-btn dark  class="ma-2 btn-delete"
                    @click="del"
                >作廢</v-btn>

                <v-btn dark  class="ma-2 btn-add"
                    @click="save"
                >申請審核</v-btn>
            </template>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import TopBasicTable from '@/components/TopBasicTable.vue'
import BottomTable from '@/components/BottomTable.vue'
import { safetyinfodetail, safetyinfocheck, safetyinfodelete, safetyinfoupdate } from '@/apis/smis/carSafeInfo'
import FileListShow from '@/components/FileListShow.vue'

export default {
    props: ['itemData'],
    data: () => ({
        id: '',  // 編號
        isBtnShow: false, // 按鈕是否顯示(依權限)
        done: false,  // 是否完成頁面操作
        topItems: [],  // 上面的欄位
        bottomItems: [],  // 下面的欄位
        files: [],  // 檔案附件
        Status: '',  // 檔案附件
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
        }),
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'closeWindow',  // 關閉視窗
        ]),
        // 初始化資料
        setShowData(obj) {
            console.log("Auth: ", obj.PeopleId + '=' + this.userData.UserId);
            this.isBtnShow = obj.PeopleId == this.userData.UserId
            
            this.id = obj.SaftyInfoCode  // 編號
            this.topItems = obj.topItems  // 上面的欄位資料
            
            this.bottomItems = obj.bottomItems  // 下面的欄位資料
            console.log(this.bottomItems)
            
            this.files = [ ...obj.FileCount ]  // 檔案附件
            //console.log(...obj.files)
            this.chLoadingShow({show:true})
               
            
            //     safetyinfodetail({
            //     ClientReqTime: getNowFullTime(),  // client 端請求時間
            //     OperatorID: this.userData.UserId,  // 操作人id
            //     SaftyInfoCode: obj.id,  // DB table
                
            //     QyName: [    // 欲回傳的欄位資料
            //         'SaftyInfoCode',
            //         'InfoTitle',
            //         'InfoContent',
            //         'PeopleId',
            //         'PeopleName',
            //         'PeopleRootDepartId',
            //         'PeopleRootDepartName',
            //         'SaftyInfoStatus',
            //         'RecPeople',  
            //         'RecCopy',
            //         'JoinPeople', 
            //         'FileCount', 
                                  
            //     ],
            //  }).then(res => {
            //     console.log(res.data)
            //     console.log(res.data.RecPeople)
            //     //this.tableItems = JSON.parse(res.data.order_list)
            //     //console.log(this.tableItems)
            //     this.setShowDataint(res.data)
            //  }).catch(err => {
            //     console.log(err)
            //     alert('查詢時發生問題，請重新查詢!')
            //  }).finally(() => {
            //     this.chLoadingShow({show:true})
            //  })
        },
        // 設定上方資料
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
                     this.topItems= [
                     { icon: 'mdi-ray-vertex', text: this.Status, title: '發布狀態' },  // 日期(起)
                     { icon: 'mdi-bank', text: obj.PeopleRootDepartName, title: '通報單位' },  // 日期(迄) 
                     { icon: 'mdi-account', text: obj.PeopleName, title: '通報人' },  // 通報主題     
                                                      
                     ]
                     this.files=[]
                     obj.FileCount.forEach(element => this.files.push({ fileName: element.FileName, link: element.FileFullPath,}));
                     
                                       
                
            
            
        },
        
        // 作廢
        del(obj) {
            if (confirm('你確定要作廢嗎?')) {
                this.chLoadingShow({show:true})

                safetyinfodelete({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                SaftyInfoCode: this.id,  // DB table
                
             }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        
                        this.chMsgbar({ success: true, msg: '作廢成功' })
                        
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
             }).catch(err => {
                console.log(err)
                alert('查詢時發生問題，請重新查詢!')
             }).finally(() => {
                this.chLoadingShow({show:false})
             })

                // setTimeout(() => {
                //     this.chMsgbar({ success: true, msg: '作廢成功'})
                //     this.done = true  // 隱藏頁面操作按鈕
                //     this.chLoadingShow({show:true})
                // }, 1000)
            }
        },
        // 申請審核
        save(obj) {
            if (confirm('你確定要申請審核嗎?')) {
                this.chLoadingShow({show:true})

                safetyinfoupdate({
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                        SaftyInfoCode: this.id,  // DB table                       
                        ApplyCheck: 'T', 
             }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.done = true 
                        this.chMsgbar({ success: true, msg: '申請成功' })
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
             }).catch(err => {
                console.log(err)
                alert('查詢時發生問題，請重新查詢!')
             }).finally(() => {
                this.chLoadingShow({show:false})
             })

                // setTimeout(() => {
                //     this.chMsgbar({ success: true, msg: '申請審核成功'})
                //     this.done = true  // 隱藏頁面操作按鈕
                //     this.chLoadingShow({show:true})
                // }, 1000)
            }
        },
    },
    created() {
        this.setShowData(this.itemData)
    }
}
</script>