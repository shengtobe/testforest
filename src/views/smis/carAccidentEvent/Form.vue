<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">
        {{ (this.isEdit)? `行車事故事件編輯 (編號：${ routeId })` : '行車事故事件新增' }}
    </h2>

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

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-snowflake</v-icon>事故類型
            </h3>
            <v-select
                v-model="ipt.evtType"
                :items="evtTypeOpts"
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
                <v-icon class="mr-1 mb-1">mdi-cellphone-link-off</v-icon>設備損失
            </h3>
            <v-text-field
                v-model.trim="ipt.eqLoss"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-alert-decagram</v-icon>營運衝擊
            </h3>
            <v-text-field
                v-model.trim="ipt.serviceShock"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>處置過程
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                v-model.trim="ipt.handle"
            ></v-textarea>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>檢討過程
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                v-model.trim="ipt.review"
            ></v-textarea>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>原因分析
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                v-model.trim="ipt.reason"
            ></v-textarea>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>備註說明
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                v-model.trim="ipt.note"
            ></v-textarea>
        </v-col>

        <!-- 上傳檔案 (新增時) -->
        <template v-if="!isEdit">
            <v-col cols="12" class="mb-8" v-if="notify.id != ''">
                <v-checkbox
                    v-model="isExtendAnnex"
                    label="直接使用通報附件 (不自行上傳檔案)"
                ></v-checkbox>

                <v-chip small label color="primary" class="mr-2 mb-2 mb-sm-0"
                    v-for="item in notify.files"
                    :key="item.fileName"
                    :href="item.link"
                    target="_blank"
                    rel="noopener norefferrer"
                >
                    {{ item.fileName }}
                </v-chip>
            </v-col>

            <UploadFileAdd
                title="檔案上傳"
                :uploadDisnable="isExtendAnnex"
                :fileList="ipt.files"
                @joinFile="joinFile"
                @rmFile="rmFile"
            />
        </template>
        

        <v-col cols="12" class="text-center">
            <v-btn dark class="mr-4"
                to="/smis/car-accident-event"
            >回搜尋頁</v-btn>

            <v-btn dark color="success"
                @click="save"
            >確定送出</v-btn>
        </v-col>

        <!-- 上傳檔案 (編輯時) -->
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
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { evtTypes } from '@/assets/js/smisData'
import { hourOptions, minOptions } from '@/assets/js/dateTimeOption'
import LocationSelect from '@/components/smis/LocationSelect.vue'
import UploadFileAdd from '@/components/UploadFileAdd.vue'
import UploadFileEdit from '@/components/UploadFileEdit.vue'

export default {
    data: () => ({
        routeId: '',  // 編號
        isEdit: false,  // 是否為編輯狀態
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
            location: 'l1',  // 發現地點
            locationK: '',  // 路線k
            locationM: '',　// 路線m
            locationOther: '',　// 其他地點
            evtType: '', // 事故類型
            eqLoss: '',// 設備損失
            serviceShock: '', // 營運衝擊
            handle: '', // 處置過程
            review: '', // 檢討過程
            reason: '', // 原因分析
            note: '', // 備註說明
            files: [],  // 附件檔案
        },
        dateMenuShow: false,  // 日曆是否顯示
        opts: {  // 下拉選單
            hour: hourOptions,  // 小時
            min: minOptions,  // 分
        },
        evtTypeOpts: evtTypes,  // 事故類型下拉選單
        isExtendAnnex: false,  // 是否延用通報附件
        notify: {  // 危害通報資料
            id: '',  // id
            files: [],  // 附件
            isNew: false,  // 是否為新登錄
        },
        notifyFiles: [
            
        ],  // 通報附件
    }),
    components: {
        LocationSelect,
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
        ]),
        // 初始化資料
        initData() {
            this.ipt = { ...this.defaultIpt }  // 初始化表單欄位

            if (this.$route.params.id != undefined) {
                // -------------- 編輯時 -------------- 
                this.chLoadingShow()
                this.routeId = this.$route.params.id  // 路由參數(id)
                this.isEdit = true

                // 範例效果
                setTimeout(() => {
                    let obj = {
                        date: '2020-03-15',  // 發現日期
                        hour: '14',  // 發現時間(小時)
                        min: '00',  // 發現時間(分)
                        location: 't17',  // 發現地點
                        locationK: '',  // 路線k
                        locationM: '',　// 路線m
                        locationOther: '',　// 其他地點
                        evtType: 'A12', // 事故類型
                        eqLoss: '無',// 設備損失
                        serviceShock: '列車停駛30分鐘', // 營運衝擊
                        handle: '派三名人員至現場移除', // 處置過程
                        review: '無', // 檢討過程
                        reason: '樹木不明原因倒落', // 原因分析
                        note: '鐵軌上有倒下的樹木數十根，會影響行車，樹木寬目測直徑皆超過100公分，需多人協助移除', // 備註說明
                        files: [
                            { id: 11, fileName: 'ASRC200701.jpg', link: '/demofile/demo.jpg' },
                            { id: 22, fileName: '123.docx', link: '/demofile/123.docx' },
                        ],
                    }
                    
                    this.setInitDate(obj)
                    this.chLoadingShow()
                }, 1000)
            
            } else {
                // -------------- 新增時 -------------- 
                // 若由通報新登錄轉至此頁，則指派初始值
                if (sessionStorage.getItem('notifyItem') !== null) {
                    let obj = JSON.parse(sessionStorage.getItem('notifyItem'))
                    
                    this.notify.id = obj.id,  // 通報id
                    this.notify.files = [ ...obj.files ]  // 通報附件
                    this.notify.isNew = true  // 是否為危害通報的新登錄
                    this.ipt.date = obj.date  // 發現日期
                    this.ipt.hour = obj.hour  // 發現時間(小時)
                    this.ipt.min = obj.min  // 發現時間(分)
                    this.ipt.note = obj.content // 備註說明
                    this.ipt.location = obj.location  // 發現地點
                    this.ipt.locationK = obj.locationK  // 路線k
                    this.ipt.locationM = obj.locationM　// 路線m
                    this.ipt.locationOther = obj.locationOther　// 其他地點
                    this.isExtendAnnex = true  // 延用通報附件

                    sessionStorage.removeItem('notifyItem')  // 清除 sessionStorage
                }
            }
        },
        // 設定發現地點
        setLocation(payload) {
            this.ipt.location = payload.location
            this.ipt.locationK = payload.locationK
            this.ipt.locationM = payload.locationM
            this.ipt.locationOther = payload.locationOther
        },
        // 設定資料(編輯時)
        setInitDate(obj) {
            this.ipt.date = obj.date  // 發現日期
            this.ipt.hour = obj.hour  // 發現時間(小時)
            this.ipt.min = obj.min  // 發現時間(分)
            this.ipt.location = obj.location  // 發現地點
            this.ipt.locationK = obj.locationK  // 路線k
            this.ipt.locationM = obj.locationM　// 路線m
            this.ipt.locationOther = obj.locationOther　// 其他地點
            this.ipt.evtType = obj.evtType  // 事故類型
            this.ipt.eqLoss = obj.eqLoss  // 設備損失
            this.ipt.serviceShock = obj.serviceShock  // 營運衝擊
            this.ipt.handle = obj.handle  // 處置過程
            this.ipt.review = obj.review  // 檢討過程
            this.ipt.reason = obj.reason  // 原因分析
            this.ipt.note = obj.note // 備註說明
            this.ipt.files = [ ...obj.files ]  // 附件檔案
        },
        // 送出
        save() {
            this.chLoadingShow()

            // 新增測試用資料
            setTimeout(() => {
                // 都要順便傳危害通報新登錄 (this.notify.id)、危害通報id (this.notify.id) 欄位給後端
                // 讓後端判斷為新登錄，就更改危害通報的立案狀態，並且順便申請審核

                this.$router.push({ path: '/smis/car-accident-event' })
                this.chMsgbar({ success: true, msg: '資料新增成功'})
                this.chLoadingShow()
                console.log(this.ipt)
            }, 1000)
        },
        // 加入要上傳的檔案 (新增時)
        joinFile(file) {
            this.ipt.files.push(file)
        },
        // 刪除要上傳的檔案 (新增時)
        rmFile(idx) {
            this.ipt.files.splice(idx, 1)
        },
        // 上傳檔案 (編輯時)
        uploadFile(file) {
            this.chLoadingShow()

            setTimeout(() => {
                // 後端請求後，回傳檔案資料 (id、filename、link)
                // this.ipt.files.push(fileData)
                this.chMsgbar({ success: true, msg: '檔案新增成功'})
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