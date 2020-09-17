<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">工單編號：{{ routeId }}</h2>
    
    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8">
        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-pen</v-icon>故障描述
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="malfunctionDes"
                ></v-col>
            </v-row>
        </v-col>

        <!-- 操作按鈕 -->
        <v-col cols="12" class="text-center mt-5">
            <v-btn dark class="ma-2"
                :loading="isLoading"
                to="/worklist/serve"
            >回搜尋頁</v-btn>

            <v-btn dark class="ma-2"
                :loading="isLoading"
                color="indigo"
                :to="`/worklist/serve/${workNumber}/editList`"
            >編輯</v-btn>

            <v-btn class="ma-2"
                :loading="isLoading"
                color="error"
                @click="deleteItem"
            >刪除</v-btn>

            <v-btn dark class="ma-2"
                :loading="isLoading"
                color="amber darken-1"
                @click="closeWork"
            >結案</v-btn>

            <v-btn dark class="ma-2"
                :loading="isLoading"
                color="success"
                :to="`/worklist/maintain/${workNumber}/newWork`"
            >派工</v-btn>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { fetchWorkOrderOne } from '@/apis/workList/maintain'
import { getNowFullTime } from '@/assets/js/commonFun'
import TopBasicTable from '@/components/TopBasicTable.vue'

// 科室人員名單
let memberList = {
    '養護科': ['陳小華', '王大明'],
    '維護科': ['劉章元', '楊力昇']
}

export default {
    data: () => ({
        isLoading: false,  // 是否讀取中
        routeId: '',  // 工單編號
        dialog: false,  // 轉單 dialog
        newUnit: '',  // 轉單時所選科室
        newDispatcher: '',  // 轉單後的新派工人
        topItems: {  // 上面的欄位
            fixTime: { icon: 'mdi-calendar-text', title: '報修時間', text: '' },
            eqCodes: { icon: 'mdi-codepen', title: '設備標示編號', text: '' },
            status: { icon: 'mdi-ray-vertex', title: '處理階段', text: '' },
            fixUnit: { icon: 'mdi-apps', title: '請修單位', text: '' },
            creater: { icon: 'mdi-account', title: '立案人', text: '' },
            dispatcher: { icon: 'mdi-account', title: '派工人', text: '' },
            fixType: { icon: 'mdi-source-branch', title: '維修類型', text: '' },
            workDate: { icon: 'mdi-calendar-text', title: '維修時間', text: '' },
        },
        malfunctionDes: '',  // 故障描述
    }),
    components: { TopBasicTable },
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        },
        // 更換科室時，自動選該科室人員清單的第一人
        newUnit: function (newVal, oldVal) {
            if (newVal != oldVal) {
                this.newDispatcher = this.memberOptLv2[0]
            }
        },
    },
    computed: {
        // 科室人員名單--科室
        memberOptLv1: () => Object.keys(memberList),
        // 科室人員名單--姓名
        memberOptLv2() {
            return (memberList[this.newUnit])
        },
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 向後端取資料
        fetchData() {
            this.chLoadingShow()
            let routeId = this.$route.params.id  // 路由參數

            setTimeout(() => {
                let obj = {
                    WorkOrderID: '201903110001',  // 工單編號
                    MaintainCode: 'TRK-R06-EA0-002',  // 設備標示編號
                    Creator: '陳小華',  // 立案人
                    DispatchMan: '黃小美',  // 派工人
                    Status: '待派工',  // 處理階段
                    CreatorDepart: '車輛組',  // 請修單位
                    Malfunction: '工具機損壞',  // 故障描述
                    CreateDTime: '2019-03-11 12:03:24',  // 報修時間
                    Type: '1',  // 維修類型
                    DispatchDTime: '14:00:00',  // 維修時間
                }

                this.setShowData(obj)  // 初始化資料
                this.newUnit = Object.keys(memberList)[0]  // 轉單下拉選單科室預設值
                this.chLoadingShow()
            }, 1000)
        },
        // 初始化資料
        setShowData(obj) {
            this.workNumber = obj.WorkOrderID  // 工單編號
            this.malfunctionDes = obj.Malfunction.replace(/\n/g, '<br>')  // 故障描述

            // 設定上面的欄位資料
            this.topItems.fixTime.text = obj.CreateDTime  // 報修時間
            this.topItems.eqCodes.text = obj.MaintainCode  // 設備標示編號
            this.topItems.status.text = obj.Status  // 處理階段
            this.topItems.fixUnit.text = obj.CreatorDepart  // 請修單位
            this.topItems.creater.text = obj.Creator  // 立案人
            this.topItems.dispatcher.text = obj.DispatchMan  // 派工人
            this.topItems.fixType.text = (obj.Type == '1')? '故障檢修' : ((obj.Type == '2')? '例行保養' : '')   // 維修類型
            this.topItems.workDate.text = obj.DispatchDTime  // 維修時間

            // 權限檢查 (等後續再用 userid 去檢查)
        },
        // 刪除
        deleteItem() {
            if (confirm('你確定要刪除嗎?')) {
                this.isLoading = true
                
                // 範例效果
                setTimeout(() => {
                    // 刪除完後，轉頁到搜尋頁
                    this.chMsgbar({ success: true, msg: '刪除成功' })
                    this.$router.push({ path: '/worklist/maintain' })
                }, 1000)
            }
        },
        // 結案
        closeWork() {
            if (confirm('你確定要結案嗎?')) {
                this.isLoading = true
                
                // 範例效果
                setTimeout(() => {
                    // 結案完後，轉頁到搜尋頁
                    this.chMsgbar({ success: true, msg: '結案成功' })
                    this.$router.push({ path: '/worklist/maintain' })
                }, 1000)
            }
        },
    },
    created() {
        this.fetchData()
    }
}
</script>