<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">
        {{ (this.isEdit)? `安全資訊編輯 (編號：${ routeId })` : '安全資訊新增' }}
    </h2>

    <v-row class="px-2 mb-8">
        <v-col cols="12" sm="8">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-file-document</v-icon>通報主題
                <span class="red--text">*</span>
            </h3>
            <v-text-field
                v-model.trim="ipt.title"
                solo
                placeholder="請輸入關鍵字"
            ></v-text-field>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-pen</v-icon>發布內容
                <span class="red--text">*</span>
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入發布內容"
                v-model.trim="ipt.desc"
            ></v-textarea>
        </v-col>

        <!-- 發布對象 -->
        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>發布對象
            </h3>
            <v-row>
                <v-col cols="12" sm="4" md="3">
                    <v-select
                        hide-details
                        v-model="choose"
                        :items="opts.depart"
                        @change="changeDepart"
                        solo
                    ></v-select>
                </v-col>

                <v-col cols="12" sm="4" md="3">
                    <v-select
                        hide-details
                        v-model="target"
                        :items="opts.target"
                        solo
                    ></v-select>
                </v-col>
            </v-row>
            <v-sheet color="white" elevation="2" class="px-2 pb-2 mt-3">
                <v-row no-gutters>
                    <v-col cols="12" class="mt-2">
                        <v-btn
                            class="mr-3"
                            dark
                            color="indigo"
                            @click="joinAll"
                        >加入全部</v-btn>

                        <v-btn
                            dark
                            color="indigo"
                            @click="join"
                        >加入勾選</v-btn>
                    </v-col>

                    <v-col cols="12" sm="3" md="2"
                        v-for="item in checkboxs"
                        :key="item.value"
                    >
                        <v-checkbox
                            v-model="chooseMembers"
                            :label="item.name"
                            color="blue"
                            :value="item.value"
                            hide-details
                        ></v-checkbox>
                    </v-col>
                </v-row>
            </v-sheet>
        </v-col>

        <!-- 收件人 -->
        <v-col cols="12">
            <h4 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>收件人
                <v-btn
                    small
                    color="error"
                    @click="delAll('recipients')"
                    class="mb-1 ml-2"
                >移除全部</v-btn>
            </h4>
            
            <div>
                <v-chip
                    v-for="(item, idx) in ipt.recipients"
                    :key="item"
                    class="mr-3 mt-2"
                    label
                    color="yellow lighten-3"
                >
                    {{ transferName(item) }} 
                    <v-icon right
                        @click="delMember(idx, 'recipients')"
                    >mdi-close-circle</v-icon>
                </v-chip>
            </div>
        </v-col>

        <!-- 副本 -->
        <v-col cols="12" class="mt-8">
            <h4 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>副本
                <v-btn
                    small
                    color="error"
                    @click="delAll('cc')"
                    class="mb-1 ml-2"
                >移除全部</v-btn>
            </h4>
            
            <div>
                <v-chip
                    v-for="(item, idx) in ipt.cc"
                    :key="item"
                    class="mr-3 mt-2"
                    label
                    color="yellow lighten-3"
                >
                    {{ transferName(item) }} 
                    <v-icon right
                        @click="delMember(idx, 'cc')"
                    >mdi-close-circle</v-icon>
                </v-chip>
            </div>
        </v-col>

        <!-- 加會人 -->
        <v-col cols="12" class="mt-8">
            <h4 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>加會人
                <v-btn
                    small
                    color="error"
                    @click="delAll('joiners')"
                    class="mb-1 ml-2"
                >移除全部</v-btn>
            </h4>
            
            <div>
                <v-chip
                    v-for="(item, idx) in ipt.joiners"
                    :key="item"
                    class="mr-3 mt-2"
                    label
                    color="yellow lighten-3"
                >
                    {{ transferName(item) }} 
                    <v-icon right
                        @click="delMember(idx, 'joiners')"
                    >mdi-close-circle</v-icon>
                </v-chip>
            </div>
        </v-col>

        <!-- 上傳檔案 (新增時) -->
        <template v-if="!isEdit">
            <v-col cols="12" class="mt-8 mb-2">
                <v-divider></v-divider>
            </v-col>

            <UploadFileAdd
                title="檔案上傳"
                :uploadDisnable="false"
                :fileList="ipt.files"
                @joinFile="joinFile"
                @rmFile="rmFile"
            />
        </template>

        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="mr-3"
                to="/smis/car-safeinfo/info"
            >回搜尋頁</v-btn>

            <v-btn dark color="success"
                @click="save"
            >送出</v-btn>
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
import { dapartOptsForMember } from '@/assets/js/departOption'
import UploadFileAdd from '@/components/UploadFileAdd.vue'
import UploadFileEdit from '@/components/UploadFileEdit.vue'

export default {
    data: () => ({
        valid: true,  // 表單是否驗證欄位
        isEdit: false,  // 是否為編輯
        ipt: {},
        defaultIpt: {
            title: '',  // 通報主題
            desc: '',  // 發布內容
            recipients: [],  // 收件人
            cc: [],  // 副本
            joiners: [],  // 加會人
            files: [],  // 附件檔案
        },
        choose: '',  // 所選部門
        target: 'recipients',  // 所選對像
        opts: {  // 下拉選單
            depart: dapartOptsForMember,
            target: [
                { text: '收件人', value: 'recipients' },
                { text: '副本', value: 'cc' },
                { text: '加會人', value: 'joiners' },
            ],
        },
        checkboxs: [],  // 選單
        chooseMembers: [],  // 勾選的員工
        members: [  // 所有員工資料
            { name: '趙國強 (K59632)', value: '1'},
            { name: '錢光華 (K12584)', value: '2'},
            { name: '孫文豪 (K69584)', value: '3'},
            { name: '李運深 (K24785)', value: '4'},
            { name: '周寶盛 (K65241)', value: '5'},
            { name: '吳泓吉 (K58963)', value: '6'},
            { name: '鄭家豪 (K24758)', value: '7'},
            { name: '王永慶 (K25896)', value: '8'},
        ],
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
                        desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',  // 危害說明
                        reason: '直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字直接成因文字',  // 危害直接成因
                        indirectReason: '間接原因文字間接原因文字間接原因文字間接原因文字間接原因文字間接原因文字間接原因文字間接原因文字間接原因文字',  // 可能的危害間接原因
                        note: '',  // 備註
                        depart: 'd2',// 權責部門
                        mode: 'm2',  // 營運模式
                        wbs: 'APC2',  // 關聯子系統
                        serious: 'S4',  // 風險嚴重性
                    }
                    
                    this.setInitDate(obj)
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 設定資料(編輯時)
        setInitDate(obj) {
            this.ipt.desc = obj.desc // 危害說明
            this.ipt.reason = obj.reason  // 危害直接成因
            this.ipt.indirectReason = obj.indirectReason  // 可能的危害間接原因
            this.ipt.note = obj.note  // 備註
            this.ipt.depart = obj.depart  // 權責部門
            this.ipt.mode = obj.mode  // 營運模式
            this.ipt.wbs = obj.wbs  // 關聯子系統
            this.ipt.serious = obj.serious  // 風險嚴重性
        },
        // 切換部門成員
        changeDepart() {
            this.chLoadingShow()

            // 範例效果
            setTimeout(() => {
                this.checkboxs = [ ...this.members ]  // 測試用先不過慮部門全列出
                this.chLoadingShow()
            }, 1000)
            
        },
        // 加入全部 (checkboxs 陣列元素是物件)
        joinAll() {
            this.checkboxs.forEach(ele => {
                // 若未選取則加入
                let member = this.ipt[this.target].find(item => item == ele.value)
                if (member == undefined) this.ipt[this.target].push(ele.value)
            })
        },
        // 加入勾選 (chooseMembers 陣列元素是物件的value屬性)
        join() {
            this.chooseMembers.forEach(ele => {
                // 若未選取則加入
                let member = this.ipt[this.target].find(item => item == ele)
                if (member == undefined) this.ipt[this.target].push(ele)
            })
            this.chooseMembers = [ ...[] ]
        },
        // 查詢名稱
        transferName(val) {
            return this.members.find(ele => ele.value == val).name
        },
        // 移除員工
        delMember(idx, t) {
            this.ipt[t].splice(idx, 1)
        },
        // 移除全部員工
        delAll(t) {
            this.ipt[t] = [ ...[] ]
        },
        // 加入要上傳的檔案
        joinFile(file) {
            this.ipt.files.push(file)
        },
        // 移除要上傳的檔案
        rmFile(idx) {
            this.ipt.files.splice(idx, 1)
        },
        // 送出
        save() {
            this.chLoadingShow()

            // 測試用資料
            setTimeout(() => {
                this.$router.push({ path: '/smis/car-harmdb/harms' })
                this.chMsgbar({ success: true, msg: '資料新增成功'})
                this.chLoadingShow()
            }, 1000)
        },
    },
    created() {
        this.initData()
    }
}
</script>