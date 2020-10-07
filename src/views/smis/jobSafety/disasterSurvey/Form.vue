<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">職業災害事故調查表</h2>

    <v-row class="px-2">
        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-account</v-icon>罹災者姓名
                <!-- <span class="red--text">*</span> -->
            </h3>
            <v-text-field
                v-model.trim="ipt.name"
                solo
                placeholder="請輸入性名"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>勞工類型
            </h3>
            <v-select
                v-model="ipt.type"
                :items="opts.type"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-human-male-female</v-icon>性別
            </h3>
            <v-select
                v-model="ipt.sex"
                :items="['男', '女']"
                solo
            ></v-select>
        </v-col>
        
        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-sort-variant</v-icon>年齡
            </h3>
            <v-text-field
                v-model.trim="ipt.old"
                solo
                placeholder="請輸入年齡"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-bank</v-icon>工作部門
            </h3>
            <v-select
                v-model="ipt.workDepart"
                :items="opts.depart"
                solo
            ></v-select>
        </v-col>
        
        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>到職日期
            </h3>
            <v-menu
                v-model="dateMenuShow.startWorkDate"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model.trim="ipt.startWorkDate"
                        solo
                        v-on="on"
                        readonly
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="purple"
                    v-model="ipt.startWorkDate"
                    @input="dateMenuShow.startWorkDate = false"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-format-title</v-icon>職稱
            </h3>
            <v-text-field
                v-model.trim="ipt.jobTitle"
                solo
                placeholder="請輸入職稱"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-school</v-icon>教育程度
            </h3>
            <v-select
                v-model="ipt.education"
                :items="['小學', '國中', '高中', '專科', '大學', '碩士', '博士']"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>住址
            </h3>
            <v-text-field
                v-model.trim="ipt.address"
                solo
                placeholder="請輸入住址"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-sort-variant</v-icon>本項工作經驗年數
            </h3>
            <v-text-field
                v-model.trim="ipt.workYear"
                solo
                placeholder="請輸入經驗年數"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>本項工作訓練日期
            </h3>
            <v-text-field
                v-model.trim="ipt.trainingDate"
                solo
                placeholder="請輸入訓練日期"
            ></v-text-field>
        </v-col>
    </v-row>
    
    <v-divider class="mx-2 mt-5 mb-4"></v-divider>

    <v-row class="px-2">
        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-bank</v-icon>發生單位
            </h3>
            <v-select
                v-model="ipt.depart"
                :items="opts.depart"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>發生日期
            </h3>
            <v-menu
                v-model="dateMenuShow.occurDate"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model.trim="ipt.occurDate"
                        solo
                        v-on="on"
                        readonly
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="purple"
                    v-model="ipt.occurDate"
                    @input="dateMenuShow.occurDate = false"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-clock</v-icon>發生日期 (時)
            </h3>
            <v-select
                v-model="ipt.hour"
                :items="opts.hour"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-clock</v-icon>發生日期 (分)
            </h3>
            <v-select
                v-model="ipt.min"
                :items="opts.min"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-cloud</v-icon>氣候
            </h3>
            <v-select
                v-model="ipt.weather"
                :items="['晴', '陰', '雨']"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>發生地點
            </h3>
            <v-text-field
                v-model.trim="ipt.location"
                solo
                placeholder="請輸入發生地點"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>事故類別
            </h3>
            <v-select
                v-model="ipt.accidentType"
                :items="opts.accidentType"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-google-assistant</v-icon>事故結果
            </h3>
            <v-select
                v-model="ipt.accidentResult"
                :items="opts.accidentResult"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-google-assistant</v-icon>傷害部位
            </h3>
            <v-select
                v-model="ipt.injurySite"
                :items="opts.injurySite"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>災害類型
            </h3>
            <v-select
                v-model="ipt.disasterType"
                :items="opts.disasterType"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-google-assistant</v-icon>致傷媒介物
            </h3>
            <v-select
                v-model="ipt.vehicle"
                :items="opts.vehicle"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-note</v-icon>通報內容
                <span class="red--text">*</span>
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入通報內容"
                v-model.trim="ipt.content"
            ></v-textarea>
        </v-col>

        <v-col cols="12" class="text-center mb-8">
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
// import { mapState, mapActions } from 'vuex'
// import { getNowFullTime } from '@/assets/js/commonFun'
// import { createWorkOrder } from '@/apis/workList/maintain'
import { hourOptions, minOptions } from '@/assets/js/dateTimeOption'
import { dapartOptsBrief } from '@/assets/js/departOption'
import { injurySiteOpts, disasterTypeOpts, vehicleOpts } from '@/assets/js/smisData'

export default {
    data: () => ({
        valid: true,  // 表單是否驗證欄位
        isEdit: false,  // 是否為編輯
        notifyNumber: '',  // 通報編號
        ipt: {},
        defaultIpt: {
            name: '',  // 罹災者姓名
            type: 1,  // 勞工類型
            sex: '男',  // 性別
            old: '',  // 年齡
            workDepart: '嘉義車站',  // 工作部門
            startWorkDate: new Date().toISOString().substr(0, 10),  // 到職日期
            jobTitle: '',  // 職稱
            education: '大學',  // 教育程度
            address: '',  // 住址
            workYear: '',  // 本項工作經驗年數
            trainingDate: '',  // 本項工作訓練日期
            depart: '嘉義車站',  // 發生單位
            occurDate: new Date().toISOString().substr(0, 10),  // 發生日期
            hour: '00',  // 發生時間(時)
            min: '00',  // 發生時間(分)
            weather: '晴',  // 氣候
            location: '',  // 發生地點
            accidentType: 1,  // 事故類別
            accidentResult: 1,  // 事故結果
            injurySite: 1,  // 傷害部位
            disasterType: 1,  // 災害類型
            vehicle: 111,  // 致傷媒介物
            file: '',  // 附件檔案
        },
        dateMenuShow: {  // 日曆是否顯示
            startWorkDate: false,  // 到職日期
            occurDate: false,  // 發生日期
        },
        opts: {  // 下拉選單
            type: [  // 勞工類型
                { text: '本處員工', value: 1 },
                { text: '承攬商勞工', value: 2 },
            ],
            depart: dapartOptsBrief,  // 發生單位
            hour: hourOptions,  // 時
            min: minOptions,  // 分
            accidentType: [  // 事故類別
                { text: '工作傷害事故', value: 1 },
                { text: '工作交通事故', value: 2 },
                { text: '上下班交通事故', value: 3 },
                { text: '其他', value: 4 },
            ],
            accidentResult: [  // 事故結果
                { text: '虛驚事故', value: 1 },
                { text: '輕傷', value: 2 },
                { text: '失能傷害', value: 3 },
                { text: '死亡', value: 4 },
            ],
            injurySite: injurySiteOpts,  // 傷害部位
            disasterType: disasterTypeOpts,  // 災害類型,
            vehicle: vehicleOpts,  // 致傷媒介物
        },
    }),
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        },
    },
    methods: {
        // 初始化資料
        initData() {
            this.ipt = { ...this.defaultIpt }  // 初始化新增表單

            // 範例效果
            // setTimeout(() => {
                
            // }, 1000)
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