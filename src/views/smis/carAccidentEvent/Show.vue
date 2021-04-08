<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">事故事件編號：{{ id }}</h2>

    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8">
        <BottomTable :items="bottomItems" />
    </v-row>

    <!-- 其他資訊 -->
    <OtherInfoShow :items="otherItems" />

    <!-- 檔案列表 -->
    <FileListShow :fileList="files" title="檔案列表" />

    <!-- 填寫人員傷亡、改善措施 -->
    <v-row no-gutters class="mt-10">
        <v-col cols="12">
            <v-card tile>
                <v-toolbar flat dense dark color="brown">
                    <v-toolbar-title>
                        <v-icon class="mb-1 mr-2">mdi-pen</v-icon>相關表單填寫
                    </v-toolbar-title>
                </v-toolbar>

                <v-list-item-group>
                        <v-list-item append
                            :to="`/smis/car-accident-event/${id}/person-casualty`"
                        >
                            <v-list-item-content>
                                <v-list-item-title class="d-flex align-center">
                                    <v-btn x-small depressed rounded
                                        :color="(finishDeath)? 'success' : 'error'"
                                        class="mr-3"
                                    >
                                        {{ (finishDeath)? '已填寫' : '未填寫' }}
                                    </v-btn>
                                    人員傷亡名單
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-divider></v-divider>

                        <v-list-item
                            :to="`/smis/car-accident-event/${id}/driving-improve`"
                        >
                            <v-list-item-content>
                                <v-list-item-title class="d-flex align-center">
                                    <v-btn x-small depressed rounded
                                        :color="(finishImprove)? 'success' : 'error'"
                                        class="mr-3"
                                    >
                                        {{ (finishImprove)? '已填寫' : '未填寫' }}
                                    </v-btn>
                                    改善措施
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                </v-list-item-group>
            </v-card>
        </v-col>

        <v-col cols="12" class="text-center mt-12 mb-8">
            <v-btn dark class="ma-2"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done">
                <v-btn dark class="ma-2"
                    color="indigo"
                    :to="`/smis/car-accident-event/${id}/edit`"
                >編輯</v-btn>

                <v-btn dark  class="ma-2" color="error"
                    @click="del"
                >作廢</v-btn>

                <v-btn dark  class="ma-2" color="success"
                    @click="save"
                >申請審核資料</v-btn>
            </template>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import TopBasicTable from '@/components/TopBasicTable.vue'
import BottomTable from '@/components/BottomTable.vue'
import FileListShow from '@/components/FileListShow.vue'
import OtherInfoShow from '@/views/smis/carAccidentEvent/OtherInfoShow.vue'
import { applyData, deleteData } from '@/apis/smis/carAccidentEvent'

export default {
    props: ['itemData'],
    data: () => ({
        id: '',  // 編號
        done: false,  // 是否完成頁面操作
        files: [],  // 上傳的檔案
        finishDeath: false,  // 是否完成人員傷亡名單
        finishImprove: false,  // 是否完成改善措施
        topItems: [],  // 上面的欄位
        bottomItems: [],  // 下面的欄位
        otherItems: [],  // 其他資訊
        notifyLinks: [],  // 連結的通報
    }),
    components: {
        TopBasicTable,
        BottomTable,
        OtherInfoShow,
        FileListShow,
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'closeWindow',  // 關閉視窗
        ]),
        // 初始化資料
        setShowData(obj) {
            console.log("=========初始化資料========")
            console.log(obj)
            
            this.id = obj.AccidentCode  // 編號
            // console.log("this.id", this.id)
            this.topItems = obj.topItems  // 上面的欄位資料
            this.bottomItems = obj.bottomItems  // 下面的欄位資料
            this.otherItems = obj.otherInfo  // 其他資訊
            this.files = [ ...obj.FileCount ]  // 檔案附件
            console.log("this.files: ", this.files)
            this.finishDeath = (obj.HurtPeopleCount == 'F')? false : true // 是否完成人員傷亡名單
            this.finishImprove = (obj.FixDevice == 'F')? false : true // 是否完成改善措施

            // 危害通報連結 (依通報狀態連至不同頁面)
            // let arr = obj.notifyLinks.map(item => {
            //     let link = ''
            //     switch(item.status) {
            //         case '未審核':
            //             link = `/smis/harmnotify/${item.id}/show`
            //             break
            //         case '審核中':
            //             link = `/smis/harmnotify/${item.id}/review`
            //             break
            //         case '已結案':
            //             link = `/smis/harmnotify/${item.id}/complated`
            //             break
            //         default:
            //             break
            //     }

            //     return {
            //         id: item.id,
            //         link: link,
            //     }
            // })
            // this.notifyLinks = [ ...arr ]
        },
        // 作廢
        del() {
            if (confirm('你確定要作廢嗎?')) {
                this.chLoadingShow()
                
                deleteData({
                    AccidentCode: this.id,  // 事故事件編號
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '作廢成功' })
                        this.done = true  // 隱藏頁面操作按鈕
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    console.log(err)
                    alert('伺服器發生問題，作廢失敗')
                }).finally(() => {
                    this.chLoadingShow()
                })
            }
        },
        // 申請措施審核
        save() {
            let errArr = []
            if (!this.finishDeath) errArr.push('人員傷亡名單')
            if (!this.finishImprove) errArr.push('改善措施檢討')

            if (this.finishDeath && this.finishImprove) {  // 都有填寫
                if (confirm('你確定要申請措施審核嗎?')) {
                    this.chLoadingShow()
                    
                    applyData({
                        AccidentCode: this.id,  // 事故事件編號
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                    }).then(res => {
                        if (res.data.ErrorCode == 0) {
                            this.chMsgbar({ success: true, msg: '申請成功' })
                            this.done = true  // 隱藏頁面操作按鈕
                        } else {
                            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                            this.$router.push({ path: '/error' })
                        }
                    }).catch(err => {
                        console.log(err)
                        alert('伺服器發生問題，申請失敗')
                    }).finally(() => {
                        this.chLoadingShow()
                    })
                }
            } else {
                let errLog = '你還未填寫「'+ errArr.join('、') + '」'
                alert(errLog)
            }
        },
    },
    created() {
        console.log("========created=========")
        console.log(this.itemData)
        this.setShowData(this.itemData)
    }
}
</script>