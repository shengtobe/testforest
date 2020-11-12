<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">
        {{ (this.isEdit)? `控制措施編輯 (編號：${ routeId })` : '控制措施新增' }}
    </h2>

    <v-row class="px-2">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-bank</v-icon>管控單位
            </h3>
            <v-select
                v-model="ipt.depart"
                :items="departOpts"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="6">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-cellphone-link-off</v-icon>措施簡述
                <span class="red--text">*</span>
            </h3>
            <v-text-field
                v-model.trim="ipt.subject"
                solo
                placeholder="請輸入措施簡述"
            ></v-text-field>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-pen</v-icon>措施說明
                <span class="red--text">*</span>
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入措施說明"
                v-model.trim="ipt.desc"
            ></v-textarea>
        </v-col>

        <v-col cols="12" class="mb-5">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>安全文件
                <span class="red--text">*</span>
            </h3>
            <v-card>
                <v-data-table
                    :headers="headers"
                    :items="tableItems"
                    :options.sync="pageOpt"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:loading>
                        <span class="red--text subtitle-1">資料讀取中...</span>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-radio-group v-model="ipt.docId">
                            <v-radio
                                class="ml-3 mt-1"
                                color="success"
                                :value="item.id"
                            ></v-radio>
                        </v-radio-group>
                    </template>

                    <template v-slot:item.file="{ item }">
                        <v-chip small label color="primary" class="mr-2 mb-2 mb-sm-0"
                            :href="item.file.link"
                            :download="item.file.name"
                        >
                            {{ item.file.name }}
                        </v-chip>
                    </template>

                    <template v-slot:footer="footer">
                        <Pagination
                            :footer="footer"
                            :pageOpt="pageOpt"
                            @chPage="chPage"
                        />
                    </template>
                </v-data-table>
            </v-card>
            <span class="error--text" v-if="ipt.docId == ''">*你尚未選擇安全文件!</span>
            <span v-else>
                <v-icon class="mb-2 mr-1">mdi-lightbulb-on</v-icon>
                你選擇了編號 {{ ipt.docId }} 的安全文件
            </span>
        </v-col>

        <!-- 檔案上傳 (證據)，新增時 -->
        <template v-if="!isEdit">
            <UploadFileAdd
                title="證據上傳"
                :uploadDisnable="false"
                :fileList="ipt.files"
                @joinFile="joinFile"
                @rmFile="rmFile"
            />
        </template>

        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="mr-4"
                to="/smis/car-harmdb/control-measures"
            >回搜尋頁</v-btn>
            
            <v-btn
                color="success"
                @click="save"
            >{{ (isEdit)? '儲存變更': '送出' }}</v-btn>
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
import Pagination from '@/components/Pagination.vue'
import UploadFileAdd from '@/components/UploadFileAdd.vue'
import UploadFileEdit from '@/components/UploadFileEdit.vue'
import { safeDocs } from '@/assets/js/smisTestData'

export default {
    data: () => ({
        valid: true,  // 表單是否驗證欄位
        isEdit: false,  // 是否為編輯
        ipt: {},
        defaultIpt: {
            depart: 'd1',  // 管控單位
            subject: '',  // 措施簡述
            desc: '',  // 措施說明
            docId: '',  // 連結的安全文件id
            files: [],  // 檔案(證據)
        },
        departOpts: departOptions,  // 管控單位下拉選單
        pageOpt: { page: 1 },  // 目前頁數
        tableItems: [],  // 資料
        headers: [  // 欄位
            { text: '連結', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1', width: 70 },
            { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '維護單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '類別', value: 'type', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '文件', value: 'file', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '備註', value: 'note', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '版本', value: 'version', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '更新日期', value: 'updateTime', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
    }),
    components: {
        Pagination,
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
            this.tableItems = [ ...safeDocs ]  // fetch 安全文件的資料

            // -------------- 編輯時 -------------- 
            if (this.$route.params.id != undefined) {
                this.chLoadingShow()
                this.routeId = this.$route.params.id  // 路由參數(id)
                this.isEdit = true
                

                // 範例效果
                setTimeout(() => {
                    let obj = {
                        id: 123,
                        depart: 'd3',  // 管控單位
                        subject: '車輛維修作業要點',  // 措施簡述
                        desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',  // 危害說明
                        docId: 18,  // 連結的安全文件id
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
            } else {
                // demo 資料
                this.ipt.depart = 'd3' // 管控單位
                this.ipt.subject = '定期巡檢扣件' // 措施簡述
                this.ipt.desc = '定期檢測適時掌握路線狀況與使用情形，及設施損耗狀況，以作為路線養護依據及後續養護情形追蹤。月檢：檢查小組人員以徒步沿著鐵路路線檢查鋼軌及其配件，檢查待改善事項並記錄於月檢查計畫實施報表中(表007-1) ；各監工區工務長及班長(監工長不定期)每月應就各班轄區路況，乘坐機(列)車巡查一次，並將路線動態不良處所、路線旁危木及相關有待改善事項等填入監工區(隨乘機車、列車)巡查路線紀錄表(表007-4)並於次月整修完成。' // 措施說明
                this.ipt.docId = 20 // 連結的安全文件id
            }
        },
        // 設定資料(編輯時)
        setInitDate(obj) {
            this.ipt.depart = obj.depart // 管控單位
            this.ipt.subject = obj.subject // 措施簡述
            this.ipt.desc = obj.desc // 措施說明
            this.ipt.docId = obj.docId // 連結的安全文件id
            this.ipt.files = [ ...obj.files ]  // 檔案 (證據)
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 送出
        save() {
            if (this.ipt.docId == '') {
                alert('請選擇要連結的安全文件')
                return
            }

            this.chLoadingShow()

            // 測試用資料
            setTimeout(() => {
                if (this.isEdit) {
                    // 編輯時
                    if (confirm('修改內容後，有用到此措施的行車危害全部要重新審核，你確定要存檔嗎?')) {
                        this.chMsgbar({ success: true, msg: '資料更新成功'})
                    }
                } else {
                    // 新增時
                    this.$router.push({ path: '/smis/car-harmdb/control-measures' })
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