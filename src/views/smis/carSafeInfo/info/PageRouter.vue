<template>
<div>
    <!-- 已立案 -->
    <Show :itemData="itemData" v-if="status == 1" />

    <!-- 審核中、加會中、已發布 -->
    <ReviewComplated :itemData="itemData" v-if="status == 2 || status == 3 || status == 4" />
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import { fetchWorkOrderOne } from '@/apis/smis/carSafeInfo/info/maintain'
import { carSafeInfoStatus } from '@/assets/js/smisData'
import { getNowFullTime } from '@/assets/js/commonFun'
import Show from '@/views/smis/carSafeInfo/info/Show.vue'
import ReviewComplated from '@/views/smis/carSafeInfo/info/ReviewComplated.vue'
import { safetyinfodetail } from '@/apis/smis/carSafeInfo'

export default {
    data: () => ({
        itemData: {},  // 工單資料
        status: '',  // 狀態
        tableItems: {},  // 工單資料
        
    }),
    components: {
        Show,
        ReviewComplated,
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
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 向後端取資料
        fetchData() {
            this.chLoadingShow({ show: true})
            // let ww = sessionStorage.getItem('itemStatus') != null
            

            // 暫時先用 storage 設定狀態(缺點是不能重新整理看最新狀態資料)
            // if (sessionStorage.getItem('itemStatus') != null) {
            if (true) {
                safetyinfodetail({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                SaftyInfoCode: this.$route.params.id,  // DB table
            
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
                    this.setShowDataint(res.data)
                }).catch(err => {
                    //console.log(err)
                    alert('查詢時發生問題，請重新查詢!')
                }).finally(() => {
                    this.chLoadingShow({ show: false})
                })
            }
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
            this.itemData = { ...obj, topItems, bottomItems }  // demo 用時 ...res.data 先改為 obj
        }
    },
    created() {
        this.fetchData()
    }
}
</script>