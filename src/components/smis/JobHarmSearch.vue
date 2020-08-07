<template>
<v-row class="px-2">
    <v-col cols="12" sm="6" md="3">
        <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>編號
        </h3>
        <v-text-field
            v-model.trim="ipt.harmNumber"
            solo
        ></v-text-field>
    </v-col>

    <v-col cols="12" sm="6" md="3">
        <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>作業名稱
        </h3>
        <v-text-field
            v-model.trim="ipt.name"
            solo
        ></v-text-field>
    </v-col>

    <v-col cols="12" sm="6" md="3">
        <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>危害類型
        </h3>
        <v-select
            v-model="ipt.harmType"
            :items="harmTypeOpts"
            solo
        ></v-select>
    </v-col>

    <v-col cols="12" class="mb-4">
        <v-btn elevation="3" large class="mr-3"
            :loading="loading"
            @click="reset"
        >
            <v-icon>mdi-reload</v-icon>清空表單
        </v-btn>

        <v-btn color="green" dark large class="mr-3" elevation="3"
            :loading="loading"
            @click="search"
        >
            <v-icon>mdi-magnify</v-icon>查詢
        </v-btn>
    </v-col>
</v-row>
</template>

<script>
import { jobHarmItems } from '@/assets/js/smisTestData'
import { jobHarmType } from '@/assets/js/smisData'

export default {
    data: () => ({
        loading: false,
        ipt: {},
        defaultIpt: {
            id: '',  // 編號
            name: '',  // 作業名稱
            harmType: '',  // 危害類型
        },
        harmTypeOpts: jobHarmType,
    }),
    computed: {
        // subEvtOpts() {
        //     return SubEvt[this.ipt.mainEvt]
        // }
    },
    methods: {
        // 改變子事故
        // chSubEvt() {
        //     this.ipt.subEvt = this.subEvtOpts[0].value
        // },
        // 重置表單
        reset() {
            this.ipt = { ...this.defaultIpt }
        },
        // 查詢
        search() {
            this.loading = true
            // 向後端查詢
            let data = jobHarmItems

            // // 回傳給父元件
            setTimeout(() => {
                this.$emit('returnTableData', data)
                this.loading = false
            }, 1000)
        },
    },
    created() {
        this.reset()
    }
}
</script>