<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">安全資訊編號：{{ id }}</h2>

    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8">
        <BottomTable :items="bottomItems" />

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
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
        </v-col>

        <v-col cols="12" class="text-center mt-12 mb-8">
            <v-btn dark class="ma-2"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done">
                <v-btn dark class="ma-2"
                    color="indigo"
                    :to="`/smis/car-safeinfo/info/${id}/edit`"
                >編輯</v-btn>

                <v-btn dark  class="ma-2" color="error"
                    @click="del"
                >作廢</v-btn>

                <v-btn dark  class="ma-2" color="success"
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
import { safetyinfodetail } from '@/apis/smis/carSafeInfo'

export default {
    props: ['itemData'],
    data: () => ({
        id: '',  // 編號
        done: false,  // 是否完成頁面操作
        topItems: [],  // 上面的欄位
        bottomItems: [],  // 下面的欄位
        files: [],  // 檔案附件
        Status: '',  // 檔案附件
    }),
    components: {
        TopBasicTable,
        BottomTable,
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
            
            this.id = obj.id  // 編號
            //this.topItems = obj.topItems  // 上面的欄位資料
            //console.log(obj.topItems)
            this.bottomItems = obj.bottomItems  // 下面的欄位資料
            console.log(obj.bottomItems)
            this.files = [ ...obj.files ]  // 檔案附件
            console.log(...obj.files)
            this.chLoadingShow()
               
            
                safetyinfodetail({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                SaftyInfoCode: obj.id,  // DB table
                
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
        del() {
            if (confirm('你確定要作廢嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '作廢成功'})
                    this.done = true  // 隱藏頁面操作按鈕
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 申請審核
        save() {
            if (confirm('你確定要申請審核嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '申請審核成功'})
                    this.done = true  // 隱藏頁面操作按鈕
                    this.chLoadingShow()
                }, 1000)
            }
        },
    },
    created() {
        this.setShowData(this.itemData)
    }
}
</script>