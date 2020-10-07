<template>
<div>
    <h3 class="mb-1 ml-2">
        <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>發現地點
    </h3>

    <v-sheet elevation="2" class="mx-2 mb-8 px-3">
        <!-- 路線 -->
        <h3 class="mb-1 pt-2">路線</h3>
        <v-row no-gutters>
            <v-col cols="12" md="5">
                <v-radio-group row v-model="mainLocation" class="pa-0"
                    @change="update"
                >
                    <v-radio label="本線" color="success" value="l1" class="mb-2"></v-radio>
                    <v-radio label="祝山線" color="success" value="l2" class="mb-2"></v-radio>
                    <v-radio label="眠月線" color="success" value="l3" class="mb-2"></v-radio>
                    <v-radio label="水山線" color="success" value="l4" class="mb-2"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="6">
                <v-row no-gutters align="center">
                    <v-col cols="4" sm="3">
                        <v-text-field
                            v-model.trim="KLocation"
                            solo
                            placeholder="ex：12"
                            hide-details
                            @keyup="update"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="2" sm="1" class="text-center font-weight-bold">K+</v-col>

                     <v-col cols="4" sm="3">
                        <v-text-field
                            v-model.trim="MLocation"
                            solo
                            placeholder="ex：345"
                            hide-details
                            @keyup="update"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="2" sm="1" class="text-center font-weight-bold">M</v-col>
                </v-row>
            </v-col>
        </v-row>

        <!-- 車站 -->
        <h3 class="mb-1 pt-2">車站</h3>

        <v-radio-group row v-model="mainLocation" class="pa-0"
            @change="update"
        >
            <v-radio label="嘉義" color="success" value="t1" class="mb-2"></v-radio>
            <v-radio label="北門" color="success" value="t2" class="mb-2"></v-radio>
            <v-radio label="鹿滿" color="success" value="t3" class="mb-2"></v-radio>
            <v-radio label="竹崎" color="success" value="t4" class="mb-2"></v-radio>
            <v-radio label="樟腦寮" color="success" value="t5" class="mb-2"></v-radio>
            <v-radio label="獨立山" color="success" value="t6" class="mb-2"></v-radio>
            <v-radio label="梨園寮" color="success" value="t7" class="mb-2"></v-radio>
            <v-radio label="交力坪" color="success" value="t8" class="mb-2"></v-radio>
            <v-radio label="水社寮" color="success" value="t9" class="mb-2"></v-radio>
            <v-radio label="奮起湖" color="success" value="t10" class="mb-2"></v-radio>
            <v-radio label="多林" color="success" value="t11" class="mb-2"></v-radio>
            <v-radio label="十字路" color="success" value="t12" class="mb-2"></v-radio>
            <v-radio label="屏遮那" color="success" value="t13" class="mb-2"></v-radio>
            <v-radio label="第一分道" color="success" value="t14" class="mb-2"></v-radio>
            <v-radio label="二萬平" color="success" value="t15" class="mb-2"></v-radio>
            <v-radio label="神木" color="success" value="t16" class="mb-2"></v-radio>
            <v-radio label="阿里山" color="success" value="t17" class="mb-2"></v-radio>
            <v-radio label="沼平" color="success" value="t18" class="mb-2"></v-radio>
            <v-radio label="十字分道" color="success" value="t19" class="mb-2"></v-radio>
            <v-radio label="對高岳" color="success" value="t20" class="mb-2"></v-radio>
            <v-radio label="祝山" color="success" value="t21" class="mb-2"></v-radio>
            <v-radio label="塔山" color="success" value="t22" class="mb-2"></v-radio>
            <v-radio label="眠月" color="success" value="t23" class="mb-2"></v-radio>
            <v-radio label="石猴" color="success" value="t24" class="mb-2"></v-radio>
            <v-radio label="水山" color="success" value="t25" class="mb-2"></v-radio>
        </v-radio-group>

        <!-- 廠庫 -->
        <h3 class="mt-2">廠庫</h3>

        <v-radio-group row v-model="mainLocation" class="pa-0"
            @change="update"
        >
            <v-radio label="嘉義車庫" color="success" value="g1" class="mb-2"></v-radio>
            <v-radio label="阿里山車庫" color="success" value="g2" class="mb-2"></v-radio>
            <v-radio label="修理工廠" color="success" value="factory" class="mb-2"></v-radio>
        </v-radio-group>

        <!-- 其他 -->
        <h3 class="mt-2">其他</h3>
        <v-row no-gutters class="d-flex">
            <v-col cols="12" sm="2">
                <v-radio-group row v-model="mainLocation" class="pa-0"
                    @change="update"
                >
                    <v-radio label="其他" color="success" value="other" class="mb-2"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" sm="5" class="ml-md-n12">
                <v-text-field
                    v-model.trim="OLocation"
                    solo
                    placeholder="請輸入地點"
                    @keyup="update"
                ></v-text-field>
            </v-col>
        </v-row>
    </v-sheet>
</div>
</template>

<script>
export default {
    props: ['location', 'locationK', 'locationM', 'locationOther'],
    data: () => ({
        mainLocation: '',  // 所選的地點
        KLocation: '',  // 路線的 K
        MLocation: '',  // 路線的 M
        OLocation: '',  // 其他地點
    }),
    watch: {
        location(val) {
            this.mainLocation = val
        },
        locationK(val) {
            this.KLocation = val
        },
        locationM(val) {
            this.MLocation = val
        },
        locationOther(val) {
            this.OLocation = val
        },
    },
    methods: {
        // 更新資料
        update() {
            this.$emit('chLocation', {
                location: this.mainLocation,
                locationK: this.KLocation,
                locationM: this.MLocation,
                locationOther: this.OLocation,
            })
        },
        // 設定資料
        setLocationData() {
            this.mainLocation = this.location,
            this.KLocation = this.locationK,
            this.MLocation = this.locationM,
            this.OLocation = this.locationOther
        },
    },
    created() {
        this.setLocationData()
    }
}
</script>