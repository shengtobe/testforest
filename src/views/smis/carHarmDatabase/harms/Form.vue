<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">
        {{ (this.isEdit)? `危害編輯 (編號：${ routeId })` : '危害新增' }}
    </h2>

    <v-row class="px-2">
        <v-col cols="12" md="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-pen</v-icon>危害說明
                <span class="red--text">*</span>
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入危害說明"
                v-model.trim="ipt.desc"
            ></v-textarea>
        </v-col>

        <v-col cols="12" md="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-pen</v-icon>危害直接成因
                <span class="red--text">*</span>
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入危害直接成因"
                v-model.trim="ipt.reason"
            ></v-textarea>
        </v-col>

        <v-col cols="12" md="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-pen</v-icon>可能的危害間接原因
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入間接原因"
                v-model.trim="ipt.indirectReason"
            ></v-textarea>
        </v-col>

        <v-col cols="12" md="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-note</v-icon>備註
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入備註"
                v-model.trim="ipt.note"
            ></v-textarea>
        </v-col>
    </v-row>

    <v-divider class="mx-2 mt-5 mb-4"></v-divider>

    <v-row class="px-2">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-bank</v-icon>權責單位
            </h3>
            <v-select
                v-model="ipt.depart"
                :items="opts.depart"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>營運模式
            </h3>
            <v-select
                v-model="ipt.mode"
                :items="opts.mode"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>風險嚴重性
            </h3>
            <v-select
                v-model="ipt.serious"
                :items="opts.serious"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>風險頻率
            </h3>
            <v-select
                v-model="ipt.frequency"
                :items="opts.frequency"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-source-branch</v-icon>關聯子系統
            </h3>
            <v-select
                v-model="ipt.wbs"
                :items="opts.wbs"
                solo
            ></v-select>
        </v-col>

        <!-- 影響、營運衝擊 -->
        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-alert-decagram</v-icon>影響、營運衝擊
            </h3>
            <v-sheet color="white" elevation="2" class="px-2 pb-4">
                <v-row no-gutters>
                    <v-col cols="6" sm="4" md="2">
                        <v-checkbox
                            v-model="ipt.affectTraveler"
                            label="影響旅客"
                            color="info"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="6" sm="4" md="2">
                        <v-checkbox
                            v-model="ipt.affectStaff"
                            label="影響員工"
                            color="info"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="6" sm="4" md="2">
                        <v-checkbox
                            v-model="ipt.affectPublic"
                            label="影響大眾"
                            color="info"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="6" sm="4" md="2">
                        <v-checkbox
                            v-model="ipt.trainLate"
                            label="列車誤點"
                            color="info"
                            hide-details
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="6" sm="4" md="2">
                        <v-checkbox
                            v-model="ipt.stopOperation"
                            label="中斷營運"
                            color="info"
                            hide-details
                        ></v-checkbox>
                    </v-col>
                </v-row>
            </v-sheet>
        </v-col>

        <!-- 衍生事故 -->
        <v-col cols="12" class="mt-8">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-arrow-expand</v-icon>衍生事故
            </h3>
            <AccidentCheckbox
                :checkArr="ipt.accidents"
                @checkAccident="setAccident"
            />
        </v-col>
    </v-row>

    <v-row class="px-2 mb-8">
        <v-col cols="12" class="text-center mt-8">
            <v-btn
                color="success"
                @click="save"
                large
            >送出</v-btn>
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
import { departOptions } from '@/assets/js/departOption'
import AccidentCheckbox from '@/components/smis/AccidentCheckbox.vue'

export default {
    data: () => ({
        valid: true,  // 表單是否驗證欄位
        isEdit: false,  // 是否為編輯
        ipt: {
            accidents: [],  // 衍生事故(給組件的預設值)
        },
        defaultIpt: {
            desc: '',  // 危害說明
            reason: '',  // 危害直接成因
            indirectReason: '',  // 可能的危害間接原因
            note: '',  // 備註
            depart: 'd1',// 權責部門
            mode: 'm1',  // 營運模式
            wbs: 'APC2',  // 關聯子系統
            serious: 'S5',  // 風險嚴重性
            frequency: 'P1',  // 風險頻率
            affectTraveler: false,  // 影響旅客
            affectStaff: false,  // 影響員工
            affectPublic: false,  // 影響大眾
            trainLate: false,  // 列車誤點
            stopOperation: false,  // 中斷營運
            accidents: [],  // 衍生事故
        },
        opts: {  // 下拉選單
            depart: departOptions,  // 權責部門
            mode: [  // 營運模式
                { text: '正常', value: 'm1' },
                { text: '降級', value: 'm2' },
                { text: '緊急', value: 'm3' },
                { text: '維修', value: 'm4' },
            ],
            wbs: [  // 關聯子系統
                { text: 'APC2', value: 'APC2' },
                { text: '平甲6022', value: '平甲6022' },
                { text: '祝8308', value: '祝8308' },
                { text: '蓬甲6', value: '蓬甲6' },
            ],
            serious: [  // 風險嚴重性
                { text: '極輕微', value: 'S5' },
                { text: '稍微', value: 'S4' },
                { text: '主要', value: 'S3' },
                { text: '嚴重', value: 'S2' },
                { text: '災難', value: 'S1' },
            ],
            frequency: [  // 風險頻率
                { text: '經常', value: 'P1' },
                { text: '很可能', value: 'P2' },
                { text: '偶爾', value: 'P3' },
                { text: '很少', value: 'P4' },
                { text: '幾乎不', value: 'P5' },
            ],
        },
    }),
    components: { AccidentCheckbox },
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        },
    },
    methods: {
        // 初始化資料
        initData() {
            // 範例效果
            setTimeout(() => {
                this.ipt = { ...this.defaultIpt }  // 初始化新增表單
            }, 1000)
        },
        // 延申事故
        setAccident(arr) {
            this.ipt.accidents = [ ...arr ]
        },
        // 送出
        save() {
            
        },
    },
    created() {
        this.initData()
    }
}
</script>