<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">
        職災事故事件改善措施
        <span class="mx-3">(事故事件編號：{{ routeId }})</span>
    </h2>

    <v-row no-gutters class="mb-8 label-header">
        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>直接原因
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="directReason"
                ></v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>間接原因
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="indirectReason"
                ></v-col>
            </v-row>
        </v-col>

        <v-col cols="12" style="border-bottom: 1px solid #CFD8DC">
            <v-row no-gutters>
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">
                        <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>基本原因
                    </span>
                </v-col>

                <v-col class="white pa-3"
                    v-html="basicReason"
                ></v-col>
            </v-row>
        </v-col>

        <v-col cols="12" class="mt-8">
            <h3 class="mb-2">
                <v-icon class="mr-1 mb-1">mdi-pen</v-icon>改善措施
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入改善措施摘要"
                v-model.trim="improve"
            ></v-textarea>
        </v-col>

        <v-col cols="12" class="mt-8 text-center">
            <v-btn dark class="mr-3 btn-close"
                :to="`/smis/jobsafety/disaster-survey/${routeId}/show`"
            >回上層</v-btn>

            <v-btn dark class="btn-add"
                @click="save"
            >更新資料</v-btn>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data: () => ({
        routeId: '',
        directReason: '',  // 直接原因
        indirectReason: '',  // 間接原因
        basicReason: '',  // 基本原因
        improve: '',  // 改善措施
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
        // 向後端取得資料
        fetchData() {
            this.chLoadingShow({show:true})
            this.routeId = this.$route.params.id

            // 新增測試用資料
            setTimeout(() => {
                // 同類危害已核定的控制措施
                let obj = {
                    directReason: '直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字',  // 直接原因
                    indirectReason: '間接原因文字間接原因文字間接原因文字',  // 間接原因
                    basicReason: '基本原因文字基本原因文字基本原因文字基本原因文字基本原因文字基本原因文字基本原因文字',  // 基本原因
                    improveStrategy: '文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容文字內容',  // 事故單位防範及改善對策
                }

                // 設定變數值
                this.directReason = obj.directReason
                this.indirectReason = obj.indirectReason
                this.basicReason = obj.basicReason
                this.improve = obj.improveStrategy  // 改善措施的預設值

                this.chLoadingShow({show:false})
            }, 1000)
        },
        // 送出
        save() {
            this.chLoadingShow({show:true})

            setTimeout(() => {
                this.chMsgbar({ success: true, msg: '更新成功'})
                this.chLoadingShow({show:false})
            }, 1000)
        },
    },
    created() {
        this.fetchData()
    }
}
</script>