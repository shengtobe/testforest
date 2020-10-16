<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">
        {{ (this.isEdit)? `危害編輯 (編號：${ routeId })` : '危害新增' }}
    </h2>

    <v-row class="px-2">
        <v-col cols="12" md="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>編號
            </h3>
            <v-text-field
                v-model.trim="ipt.name"
                solo
                placeholder="請輸入作業名稱"
            ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-tag</v-icon>作業名稱
            </h3>
            <v-text-field
                v-model.trim="ipt.name"
                solo
                placeholder="請輸入作業名稱"
            ></v-text-field>
        </v-col>

        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="mr-4"
                v-if="!isEdit"
                to="/smis/jobsafety/disasterdb"
            >回搜尋頁</v-btn>

            <v-btn dark class="mr-3"
                v-else
                :to="`/smis/jobsafety/disasterdb/${this.routeId}/show`"
            >回上層</v-btn>
            
            <v-btn
                color="success"
                @click="save"
            >{{ (isEdit)? '儲存變更': '送出' }}</v-btn>
        </v-col>
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
import { mapActions } from 'vuex'
import { jobSeriousOpts, jobPossibilityOpts } from '@/assets/js/smisData'

export default {
    data: () => ({
        valid: true,  // 表單是否驗證欄位
        isEdit: false,  // 是否為編輯
        ipt: {
            accidents: [],  // 衍生事故(給組件的預設值)
        },
        opts: {  // 下拉選單
            serious: jobSeriousOpts,  // 風險嚴重性
            possibility: jobPossibilityOpts,  // 風險可能性
        },
    }),
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        },
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 初始化資料
        initData() {
            this.ipt = { ...this.defaultIpt }  // 初始化表單

            // -------------- 編輯時 -------------- 
            if (this.$route.params.id != undefined) {
                this.chLoadingShow()
                this.routeId = this.$route.params.id  // 路由參數(id)
                this.isEdit = true

                // 範例效果
                setTimeout(() => {
                    let obj = {
                        
                    }
                    
                    this.setInitDate(obj)
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 設定資料(編輯時)
        setInitDate(obj) {
            // this.ipt.desc = obj.desc // 危害說明
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 送出
        save() {
            this.chLoadingShow()

            // 測試用資料
            setTimeout(() => {
                let txt = (this.isEdit)? '資料更新成功' :  '資料新增成功'
                if (!this.isEdit) this.$router.push({ path: '/smis/jobsafety/disasterdb' })
                this.chMsgbar({ success: true, msg: txt })
                this.chLoadingShow()
            }, 1000)
        },
    },
    created() {
        this.initData()
    }
}
</script>