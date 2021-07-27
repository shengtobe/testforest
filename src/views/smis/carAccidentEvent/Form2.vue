<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">
        {{ (this.isEdit)? `行車事故事件編輯 (編號：${ routeId })` : '行車事故事件新增' }}
    </h2>

    <v-row class="px-2 label-header">
        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>發生日期
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
                    color="primary"
                    v-model="ipt.date"
                    @input="dateMenuShow = false"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-clock</v-icon>發生時間 (小時)
            </h3>
            <v-select
                v-model="ipt.hour"
                :items="opts.hour"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-clock</v-icon>發生時間 (分)
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

    <!-- 發生地點 -->
    <LocationSelect
        @chLocation="setLocation"
        :location="ipt.location"
        :locationK="ipt.locationK"
        :locationM="ipt.locationM"
        :locationOther="ipt.locationOther"
    />

    <v-row class="px-2 mb-8 label-header">
        <v-col cols="12" sm="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-cellphone-link-off</v-icon>設備受損情形
            </h3>
            <v-text-field
                v-model.trim="ipt.eqLoss"
                solo
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-alert-decagram</v-icon>運轉影響情形
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
                    :download="item.fileName"
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
            <v-btn dark class="mr-4 btn-search"
                v-if="!isEdit"
                to="/smis/car-accident-event"
            >回搜尋頁</v-btn>

            <v-btn dark class="mr-4 btn-close"
                v-else
                :to="`/smis/car-accident-event/${this.routeId}/show`"
            >回上層</v-btn>

            <v-btn dark class="btn-add"
                @click="save"
            >{{ (isEdit)? '儲存變更': '送出' }}</v-btn>
        </v-col>

        <!-- 上傳檔案 (編輯時) -->
        <template v-if="isEdit">
            <v-col cols="12" class="mt-8 mb-2">
                <v-divider></v-divider>
            </v-col>

            <UploadFileEdit title="檔案管理"
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
            location: 'l1',  // 發生地點
            locationK: '',  // 路線k
            locationM: '',　// 路線m
            locationOther: '',　// 其他地點
        },
        defaultIpt: {
            date: new Date().toISOString().substr(0, 10),  // 發生日期
            hour: '00',  // 發現時間(小時)
            min: '00',  // 發現時間(分)
            location: 'l1',  // 發生地點
            locationK: '',  // 路線k
            locationM: '',　// 路線m
            locationOther: '',　// 其他地點
            evtType: 'M1', // 事故類型
            eqLoss: '',// 設備受損情形
            serviceShock: '', // 運轉影響情形
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
        }
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
                this.chLoadingShow({show:true})
                this.routeId = this.$route.params.id  // 路由參數(id)
                this.isEdit = true

                // 範例效果
                setTimeout(() => {
                    let obj = {
                        date: '2017-01-25',  // 發生日期
                        hour: '15',  // 發現時間(小時)
                        min: '56',  // 發現時間(分)
                        location: 'l1',  // 發生地點
                        locationK: 20,  // 路線k
                        locationM: 445,　// 路線m
                        locationOther: '',　// 其他地點
                        evtType: 'M2',  // 事故類型
                        eqLoss: 'APC3 車廂轉向架受損',  // 設備受損情形
                        serviceShock: '影響列車計2列次',  // 運轉影響情形
                        handle: "1430 312次由奮起湖車站開出。\n1556 312次行駛至嘉義線 20K+445M 出軌，列車於嘉義線 19K+700M停止 司機員及列車員立即通報嘉義車庫及竹崎車站請求救援。\n1633 接駁列車511 次自北門站開出至事故現場接駁 6 次旅客。\n1658 312次將第 1 車廂重新編組載運 29 位旅客離開事故現場。\n1703 搶修列車521 次自北門車站開出辦理搶修作業。\n1734 接駁列車511 次抵達事故現場。\n1803 312次將第 1 車廂重新編組載運 29 位旅客抵達嘉義車站。\n1816 接駁列車511 次自事故現場開出。\n1915 接駁列車511 次抵達嘉義車站。\n1919 復軌完成。\n2000 路線測試完成恢復正常。\n2139 搶修列車521 次返回北門車站。",  // 處置過程
                        review: '新增行車事故事件本事故事發後，鐵道局於107年3月5日啟動專案調查，並於同月8、9日辦理本事故專案調查簡報討論、文件檢視及現場勘查 。同年5月3日召開本事故專案調查工作會議。最終於同年8月15日召開交通部鐵路行車事故調查小組第24次會議，確認本事故專案調查結果。',  // 檢討過程
                        reason: "<直接原因>\n事故路段因氣候易潮濕，加上路基排水狀況不佳 造成該路段有多處噴泥現象， 當鋼軌受列車重壓下沉致軌枕沉 陷、鋼軌產生前後高低不整之現象，在 列車於動態行駛下易致鋼軌單邊下沉產生平面性扭曲，使車輪浮動爬上出軌。\n<間接原因>\n部分路段道碴存有厚度不足加上列車反覆作用下，致使路基土壤細粒料因壓力而循道碴間隙上升， 使路基出現鬆動現象。\n<其他因素>\n有關天候、車輛、人員及運轉等部分，經檢討尚無涉事故原因。",  // 原因分析
                        note: '本事故由鐵道局( 鐵路營運監理小組) 及 5位具軌道、力學、車輛及營運等專業之外聘專案委員組成團隊進行專案調查，並由本部鐵路行車事故調查小組 定期委員開會確認調查結果。', // 備註說明
                        files: [
                            { id: 11, fileName: 'ASRC200701.jpg', link: '/demofile/demo.jpg' },
                            { id: 22, fileName: '123.docx', link: '/demofile/123.docx' },
                        ],
                    }
                    
                    this.setInitDate(obj)
                    this.chLoadingShow({show:false})
                }, 1000)
            
            } else {
                // -------------- 新增時 -------------- 
                // 若由危害通報新登錄轉至此頁，則指派初始值
                // if (sessionStorage.getItem('notifyItem') !== null) {
                //     let obj = JSON.parse(sessionStorage.getItem('notifyItem'))
                    
                //     this.notify.id = obj.id,  // 通報id
                //     this.notify.files = [ ...obj.files ]  // 通報附件
                //     this.notify.isNew = true  // 是否為危害通報的新登錄
                //     this.ipt.date = obj.date  // 發生日期
                //     this.ipt.hour = obj.hour  // 發現時間(小時)
                //     this.ipt.min = obj.min  // 發現時間(分)
                //     this.ipt.note = obj.content // 備註說明
                //     this.ipt.location = obj.location  // 發生地點
                //     this.ipt.locationK = obj.locationK  // 路線k
                //     this.ipt.locationM = obj.locationM　// 路線m
                //     this.ipt.locationOther = obj.locationOther　// 其他地點
                //     this.isExtendAnnex = true  // 延用通報附件

                //     sessionStorage.removeItem('notifyItem')  // 清除 sessionStorage
                // }

                // demo 用資料
                this.ipt.date = '2017-01-25'  // 發生日期
                this.ipt.hour = '15'  // 發現時間(小時)
                this.ipt.min = '56'  // 發現時間(分)
                this.ipt.location = 'l1'  // 發生地點
                this.ipt.locationK = 20  // 路線k
                this.ipt.locationM = 445　// 路線m
                this.ipt.locationOther = ''　// 其他地點
                this.ipt.evtType = 'M2'  // 事故類型
                this.ipt.eqLoss = 'APC3 車廂轉向架受損'  // 設備受損情形
                this.ipt.serviceShock = '影響列車計2列次'  // 運轉影響情形
                this.ipt.handle = "1430 312次由奮起湖車站開出。\n1556 312次行駛至嘉義線 20K+445M 出軌，列車於嘉義線 19K+700M停止 司機員及列車員立即通報嘉義車庫及竹崎車站請求救援。\n1633 接駁列車511 次自北門站開出至事故現場接駁 6 次旅客。\n1658 312次將第 1 車廂重新編組載運 29 位旅客離開事故現場。\n1703 搶修列車521 次自北門車站開出辦理搶修作業。\n1734 接駁列車511 次抵達事故現場。\n1803 312次將第 1 車廂重新編組載運 29 位旅客抵達嘉義車站。\n1816 接駁列車511 次自事故現場開出。\n1915 接駁列車511 次抵達嘉義車站。\n1919 復軌完成。\n2000 路線測試完成恢復正常。\n2139 搶修列車521 次返回北門車站。"  // 處置過程
                this.ipt.review = '新增行車事故事件本事故事發後，鐵道局於107年3月5日啟動專案調查，並於同月8、9日辦理本事故專案調查簡報討論、文件檢視及現場勘查 。同年5月3日召開本事故專案調查工作會議。最終於同年8月15日召開交通部鐵路行車事故調查小組第24次會議，確認本事故專案調查結果。'  // 檢討過程
                this.ipt.reason = "<直接原因>\n事故路段因氣候易潮濕，加上路基排水狀況不佳 造成該路段有多處噴泥現象， 當鋼軌受列車重壓下沉致軌枕沉 陷、鋼軌產生前後高低不整之現象，在 列車於動態行駛下易致鋼軌單邊下沉產生平面性扭曲，使車輪浮動爬上出軌。\n<間接原因>\n部分路段道碴存有厚度不足加上列車反覆作用下，致使路基土壤細粒料因壓力而循道碴間隙上升， 使路基出現鬆動現象。\n<其他因素>\n有關天候、車輛、人員及運轉等部分，經檢討尚無涉事故原因。"  // 原因分析
                this.ipt.note = '本事故由鐵道局( 鐵路營運監理小組) 及 5位具軌道、力學、車輛及營運等專業之外聘專案委員組成團隊進行專案調查，並由本部鐵路行車事故調查小組 定期委員開會確認調查結果。' // 備註說明
            }
        },
        // 設定發生地點
        setLocation(payload) {
            this.ipt.location = payload.location
            this.ipt.locationK = payload.locationK
            this.ipt.locationM = payload.locationM
            this.ipt.locationOther = payload.locationOther
        },
        // 設定資料(編輯時)
        setInitDate(obj) {
            this.ipt.date = obj.date  // 發生日期
            this.ipt.hour = obj.hour  // 發現時間(小時)
            this.ipt.min = obj.min  // 發現時間(分)
            this.ipt.location = obj.location  // 發生地點
            this.ipt.locationK = obj.locationK  // 路線k
            this.ipt.locationM = obj.locationM　// 路線m
            this.ipt.locationOther = obj.locationOther　// 其他地點
            this.ipt.evtType = obj.evtType  // 事故類型
            this.ipt.eqLoss = obj.eqLoss  // 設備受損情形
            this.ipt.serviceShock = obj.serviceShock  // 運轉影響情形
            this.ipt.handle = obj.handle  // 處置過程
            this.ipt.review = obj.review  // 檢討過程
            this.ipt.reason = obj.reason  // 原因分析
            this.ipt.note = obj.note // 備註說明
            this.ipt.files = [ ...obj.files ]  // 附件檔案
        },
        // 送出
        save() {
            this.chLoadingShow({show:true})

            // 新增測試用資料
            setTimeout(() => {
                // 都要順便傳危害通報新登錄 (this.notify.id)、危害通報id (this.notify.id) 欄位給後端
                // 讓後端判斷為新登錄，就更改危害通報的立案狀態，並且順便申請審核
                let txt = (this.isEdit)? '資料更新成功' :  '資料新增成功'
                if (!this.isEdit) this.$router.push({ path: '/smis/car-accident-event' })
                this.chMsgbar({ success: true, msg: txt })
                this.chLoadingShow({show:false})
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
            this.chLoadingShow({show:true})

            setTimeout(() => {
                // 後端請求後，回傳檔案資料 (id、filename、link)
                // this.ipt.files.push(fileData)
                this.chMsgbar({ success: true, msg: '檔案新增成功'})
                this.chLoadingShow({show:false})
            }, 1000)
        },
        // 刪除檔案 (編輯時)
        deleteFile(id, idx) {
            if (confirm('你確定要刪除嗎?')) {
                this.chLoadingShow({show:true})

                setTimeout(() => {
                    // 後端請求後，移除檔案列表
                    this.ipt.files.splice(idx, 1)
                    this.chMsgbar({ success: true, msg: '檔案刪除成功'})
                    this.chLoadingShow({show:false})
                }, 1000)
            }
        },
    },
    created() {
        this.initData()
    }
}
</script>