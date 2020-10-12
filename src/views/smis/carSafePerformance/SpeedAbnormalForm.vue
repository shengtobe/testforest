<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">
        {{ (this.isEdit)? `車速異常表編輯 (編號：${ routeId })` : '車速異常表新增' }}
    </h2>

    <v-row class="px-2">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>日期
            </h3>
            <v-menu
                v-model="dateMemuShow"
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
                    @input="dateMemuShow = false"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>車次
            </h3>
            <v-text-field
                v-model.trim="ipt.number"
                solo
                placeholder="例：1-2"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-account</v-icon>駕駛姓名
            </h3>
            <v-text-field
                v-model.trim="ipt.name"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>區段
            </h3>
            <v-text-field
                v-model.trim="ipt.location"
                solo
                placeholder="例：主線 5k 10m"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-clock</v-icon>時間範圍
            </h3>
            <v-text-field
                v-model.trim="ipt.timeRange"
                solo
                placeholder="例：1100~1120"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-gauge</v-icon>平均車速
            </h3>
            <v-text-field
                v-model.trim="ipt.averageSpeed"
                solo
                placeholder="例：40"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-gauge</v-icon>每小時超出公里數
            </h3>
            <v-text-field
                v-model.trim="ipt.overKm"
                solo
                placeholder="例：10"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-gauge</v-icon>超速級別
            </h3>
            <v-select
                v-model="ipt.hypervelocity"
                :items="['1 級', '2 級', '其他']"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" md="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-pen</v-icon>異常概況
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入異常概況"
                v-model.trim="ipt.desc"
            ></v-textarea>
        </v-col>

        <v-col cols="12" md="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>異常處理情形
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入異常處理情形"
                v-model.trim="ipt.handSituation"
            ></v-textarea>
        </v-col>

        <!-- 檔案上傳，新增時 -->
        <template v-if="!isEdit">
            <UploadFileAdd
                title="附件上傳"
                :uploadDisnable="false"
                :fileList="ipt.files"
                @joinFile="joinFile"
                @rmFile="rmFile"
            />
        </template>

        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="mr-4"
                to="/smis/car-safe-performance/speed-abnormal"
            >回搜尋頁</v-btn>
            
            <v-btn
                color="success"
                @click="save"
            >{{ (isEdit)? '儲存變更': '送出' }}</v-btn>
        </v-col>

        <!-- 附件 (編輯時) -->
        <template v-if="isEdit">
            <v-col cols="12" class="mt-8 mb-2">
                <v-divider></v-divider>
            </v-col>

            <UploadFileEdit
                :fileList="ipt.files"
                @uploadFile="uploadFile"
                @deleteFile="deleteFile"
                class="mb-10"
            />
        </template>
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
import UploadFileAdd from '@/components/UploadFileAdd.vue'
import UploadFileEdit from '@/components/UploadFileEdit.vue'

export default {
    data: () => ({
        valid: true,  // 表單是否驗證欄位
        isEdit: false,  // 是否為編輯
        ipt: {},
        defaultIpt: {
            date: new Date().toISOString().substr(0, 10),  // 日期
            number: '',  // 車次
            name: '',  // 駕駛姓名
            location: '',  // 區段
            timeRange: '',  // 時間範圍
            averageSpeed: '',  // 平均車速
            overKm: '',  // 每小時超出公里數
            hypervelocity: '1 級',  // 超速級別
            desc: '',  // 異常概況
            handSituation: '',  // 異常處理情形
            files: [],  // 附件
        },
        dateMemuShow: false,  // 日曆是否顯示
    }),
    components: {
        UploadFileAdd,
        UploadFileEdit,
    },
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
            'chViewDialog',  // 檢視內容 dialog
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
                        id: 3201,
                        date: '2020-04-04',
                        number: '4-5',
                        name: '王小明',
                        location: '本線 12k 125m',
                        timeRange: '0930~0940',
                        averageSpeed: '50',
                        overKm: '10',
                        hypervelocity: '2 級',
                        desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',
                        handSituation: '處理情形處理情形處理情形處理情形處理情形處理情形處理情形處理情形處理情形處理情形處理情形處理情形處理情形',
                        files: [
                            {
                                fileName: '456.xlsx',
                                link: '/demofile/456.xlsx'
                            },
                            {
                                fileName: '123.pdf',
                                link: '/demofile/123.pdf'
                            },
                        ],
                    }
                    
                    this.setInitDate(obj)
                    this.chLoadingShow()
                }, 1000)
            } 
        },
        // 設定資料(編輯時)
        setInitDate(obj) {
            this.ipt.date = obj.date // 日期
            this.ipt.number = obj.number // 車次
            this.ipt.name = obj.name // 駕駛姓名
            this.ipt.location = obj.location // 區段
            this.ipt.timeRange = obj.timeRange // 時間範圍
            this.ipt.averageSpeed = obj.averageSpeed // 平均車速
            this.ipt.overKm = obj.overKm // 每小時超出公里數
            this.ipt.hypervelocity = obj.hypervelocity // 超速級別
            this.ipt.desc = obj.desc // 異常概況
            this.ipt.handSituation = obj.handSituation // 異常處理情形
            this.ipt.files = [ ...obj.files ]  // 檔案
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
                if (this.isEdit) {
                    // 編輯時
                    this.chMsgbar({ success: true, msg: '資料更新成功'})
                } else {
                    // 新增時
                    this.$router.push({ path: '/smis/car-safe-performance/speed-abnormal' })
                    this.chMsgbar({ success: true, msg: '資料新增成功'})
                }
                this.chLoadingShow()
            }, 1000)
        },
        // 加入要上傳的檔案
        joinFile(file) {
            this.ipt.files.push(file)
        },
        // 移除要上傳的檔案
        rmFile(idx) {
            this.ipt.files.splice(idx, 1)
        },
        // 上傳檔案 (編輯時)
        uploadFile(file) {
            this.chLoadingShow()

            setTimeout(() => {
                // 後端請求後，回傳檔案資料 (id、filename、link)
                // this.ipt.files.push(fileData)
                this.chMsgbar({ success: true, msg: '檔案上傳成功'})
                this.chLoadingShow()
            }, 1000)
        },
        // 刪除檔案 (編輯時)
        deleteFile(id, idx) {
            if (confirm('你確定要刪除嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    // 後端請求後，移除檔案列表
                    // this.ipt.files.splice(idx, 1)
                    this.chMsgbar({ success: true, msg: '檔案刪除成功'})
                    this.chLoadingShow()
                }, 1000)
            }
        },
    },
    created() {
        this.initData()
    }
}
</script>