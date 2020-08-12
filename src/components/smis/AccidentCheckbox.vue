<template>
<v-sheet color="white" elevation="2" class="px-2 pb-5">
    <!-- 重大事故 -->
    <h3 class="pt-3 mb-n2 error--text">重大事故</h3>
    <v-row no-gutters>
        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="正線衝撞事故"
                color="grey darken-3"
                value="M1"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="正線出軌事故"
                color="grey darken-3"
                value="M2"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="正線火災事故"
                color="grey darken-3"
                value="M3"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>
    </v-row>

    <!-- 一般事故 -->
    <h3 class="mt-8 mb-n2 primary--text">一般事故</h3>
    <v-row no-gutters>
        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="側線衝撞事故"
                color="grey darken-3"
                value="G1"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="側線出軌事故"
                color="grey darken-3"
                value="G2"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="側線火災事故"
                color="grey darken-3"
                value="G3"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="平交道事故"
                color="grey darken-3"
                value="G4"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="人員死傷事故"
                color="grey darken-3"
                value="G5"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="設備損害事故"
                color="grey darken-3"
                value="G6"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="運轉中斷事故"
                color="grey darken-3"
                value="G7"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>
    </v-row>

    <!-- 異常事件 -->
    <h3 class="mt-8 mb-n2 success--text">異常事件</h3>
    <v-row no-gutters>
        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="列車或車輛分離"
                color="grey darken-3"
                value="A1"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="進入錯線"
                color="grey darken-3"
                value="A2"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="冒進號誌"
                color="grey darken-3"
                value="A3"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="列車或車輛溜逸"
                color="grey darken-3"
                value="A4"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="違反閉塞運轉"
                color="grey darken-3"
                value="A5"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="違反號誌運轉"
                color="grey darken-3"
                value="A6"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="號誌處理錯誤"
                color="grey darken-3"
                value="A7"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="車輛故障"
                color="grey darken-3"
                value="A8"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="路線障礙"
                color="grey darken-3"
                value="A9"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="電子設備故障"
                color="grey darken-3"
                value="A10"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="運轉保安裝置故障"
                color="grey darken-3"
                value="A11"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="外物入侵"
                color="grey darken-3"
                value="A12"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="危險品洩漏"
                color="grey darken-3"
                value="A13"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="駕駛失能"
                color="grey darken-3"
                value="A14"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="天然災變"
                color="grey darken-3"
                value="A15"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="列車取消"
                color="grey darken-3"
                value="A16"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <v-checkbox
                v-model="accidents"
                label="其他事件"
                color="grey darken-3"
                value="A17"
                hide-details
                @change="checked"
            ></v-checkbox>
        </v-col>
    </v-row>
</v-sheet>
</template>

<script>
export default {
    props: ['checkArr'],
    data: () => ({
        accidents: [],
    }),
    watch: {
        checkArr(val) {
            this.accidents = [ ...val ]
        }
    },
    methods: {
        // 選擇
        checked() {
            this.$emit('checkAccident', this.accidents)
        }
    },
    created() {
        this.accidents = [ ...this.checkArr ]
    }
}
</script>