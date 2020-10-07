<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">危害通報新增</h2>

    <v-row class="px-2">
        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>發現日期
            </h3>
            <v-menu
                v-model="dateMenuShow"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model.trim="ipt.date"
                        solo
                        v-on="on"
                        readonly
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="purple"
                    v-model="ipt.date"
                    @input="dateMenuShow = false"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-clock</v-icon>發現時間 (小時)
            </h3>
            <v-select
                v-model="ipt.hour"
                :items="opts.hour"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-clock</v-icon>發現時間 (分)
            </h3>
            <v-select
                v-model="ipt.min"
                :items="opts.min"
                solo
            ></v-select>
        </v-col>
    </v-row>

    <!-- 發現地點 -->
    <LocationSelect
        @chLocation="setLocation"
        :location="ipt.location"
        :locationK="ipt.locationK"
        :locationM="ipt.locationM"
        :locationOther="ipt.locationOther"
    />

    <v-row class="px-2 mb-8">
        <v-col cols="12" sm="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-pen</v-icon>通報主旨
                <span class="red--text">*</span>
            </h3>
            <v-text-field
                v-model.trim="ipt.subject"
                solo
                placeholder="請輸入通報的主題或主旨"
            ></v-text-field>
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

        <!-- 上傳檔案 -->
        <UploadFileAdd
            title="檔案上傳"
            :uploadDisnable="false"
            :fileList="ipt.files"
            @joinFile="joinFile"
            @rmFile="rmFile"
        />

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
// import { mapState, mapActions } from 'vuex'
// import { getNowFullTime } from '@/assets/js/commonFun'
// import { createWorkOrder } from '@/apis/workList/maintain'
import { hourOptions, minOptions } from '@/assets/js/dateTimeOption'
import LocationSelect from '@/components/smis/LocationSelect.vue'
import UploadFileAdd from '@/components/UploadFileAdd.vue'

export default {
    data: () => ({
        valid: true,  // 表單是否驗證欄位
        isEdit: false,  // 是否為編輯
        notifyNumber: '',  // 通報編號
        ipt: {  // 給地點組件的預設值要先設
            location: 'l1',  // 發現地點
            locationK: '',  // 路線k
            locationM: '',　// 路線m
            locationOther: '',　// 其他地點
        },
        defaultIpt: {
            date: new Date().toISOString().substr(0, 10),  // 發現日期
            hour: '00',  // 發現時間(小時)
            min: '00',  // 發現時間(分)
            location: 'l1',  // 發現地點 (預設值要設，組件一開始不會傳值進來)
            locationK: '',  // 路線k
            locationM: '',　// 路線m
            locationOther: '',　// 其他地點
            subject: '',  // 通報主旨
            content: '',  // 通報內容
            files: [],  // 附件檔案
        },
        dateMenuShow: false,  // 日曆是否顯示
        opts: {  // 下拉選單
            hour: hourOptions,  // 小時
            min: minOptions,  // 分
        },
    }),
    components: {
        LocationSelect,
        UploadFileAdd,
    },
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
        // 設定發現地點
        setLocation(payload) {
            this.ipt.location = payload.location
            this.ipt.locationK = payload.locationK
            this.ipt.locationM = payload.locationM
            this.ipt.locationOther = payload.locationOther
        },
        // 送出
        save() {
            
        },
        // 加入要上傳的檔案
        joinFile(file) {
            this.ipt.files.push(file)
        },
        // 移除要上傳的檔案
        rmFile(idx) {
            this.ipt.files.splice(idx, 1)
        },
    },
    created() {
        this.initData()
    }
}
</script>