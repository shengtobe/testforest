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
            <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>危害說明
        </h3>
        <v-text-field
            v-model.trim="ipt.caption"
            solo
        ></v-text-field>
    </v-col>

    <v-col cols="12" sm="6" md="3">
        <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>事故類型
        </h3>
        <v-select
            v-model="ipt.evtType"
            :items="evtTypeOpts"
            item-color="blue"
            solo
        ></v-select>
    </v-col>

    <v-col cols="12" class="mb-4">
        <v-btn elevation="2" large class="mr-3"
            :loading="loading"
            @click="reset"
        >
            <v-icon>mdi-reload</v-icon>重置
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
import { evtTypes } from '@/assets/js/smisData'
import { carHarmItems } from '@/assets/js/smisTestData'

export default {
    data: () => ({
        loading: false,
        ipt: {},
        defaultIpt: {
            harmNumber: '',  // 危害編號
            caption: '',  // 危害說明
            evtType: '',  // 事故類型
        },
        evtTypeOpts: evtTypes,
    }),
    methods: {
        // 重置
        reset() {
            this.ipt = { ...this.defaultIpt }
        },
        // 查詢
        search() {
            this.loading = true
            // 向後端查詢
            let data = carHarmItems

            // 回傳給父元件
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