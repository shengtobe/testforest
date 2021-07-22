<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">危害通報新增</h2>

    <v-row class="px-2 label-header">
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
                    color="primary"
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
    <h3 class="mb-1 ml-2 label-header">
        <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>發現地點
    </h3>

    <v-sheet elevation="2" class="mx-2 mb-8 px-3 label-header">
        <!-- 路線 -->
        <h3 class="mb-1 pt-2">路線</h3>
        <v-row no-gutters>
            <v-col cols="12" md="5">
                <v-radio-group row v-model="ipt.location" class="pa-0">
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
                            v-model.trim="ipt.locationK"
                            solo
                            placeholder="ex：12"
                            hide-details
                        ></v-text-field>
                    </v-col>

                    <v-col cols="2" sm="1" class="text-center font-weight-bold">K+</v-col>

                     <v-col cols="4" sm="3">
                        <v-text-field
                            v-model.trim="ipt.locationM"
                            solo
                            placeholder="ex：345"
                            hide-details
                        ></v-text-field>
                    </v-col>

                    <v-col cols="2" sm="1" class="text-center font-weight-bold">M</v-col>
                </v-row>
            </v-col>
        </v-row>

        <!-- 車站 -->
        <h3 class="mb-1 pt-2">車站</h3>

        <v-radio-group row v-model="ipt.location" class="pa-0">
            <v-radio label="嘉義" color="success" value="t1" class="mb-2"></v-radio>
            <v-radio label="北門" color="success" value="t2" class="mb-2"></v-radio>
            <v-radio label="鹿滿" color="success" value="t3" class="mb-2"></v-radio>
            <v-radio label="竹崎" color="success" value="t4" class="mb-2"></v-radio>
            <v-radio label="木屐寮" color="success" value="t4-2" class="mb-2"></v-radio>
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

        <v-radio-group row v-model="ipt.location" class="pa-0">
            <v-radio label="嘉義車庫" color="success" value="g1" class="mb-2"></v-radio>
            <v-radio label="阿里山車庫" color="success" value="g2" class="mb-2"></v-radio>
            <v-radio label="修理工廠" color="success" value="factory" class="mb-2"></v-radio>
        </v-radio-group>

        <!-- 其他 -->
        <h3 class="mt-2">其他</h3>
        <v-row no-gutters class="d-flex">
            <v-col cols="12" sm="2">
                <v-radio-group row v-model="ipt.location" class="pa-0">
                    <v-radio label="其他" color="success" value="other" class="mb-2"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" sm="5" class="ml-md-n12">
                <v-text-field
                    v-model.trim="ipt.locationOther"
                    solo
                    placeholder="請輸入地點"
                ></v-text-field>
            </v-col>
        </v-row>
    </v-sheet>

    <v-row class="px-2 mb-8 label-header">
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
            :fileList="showFiles"
            @joinFile="joinFile"
            @rmFile="rmFile"
        />

        <v-col cols="12" class="text-center mt-8">
            <v-btn
                class="btn-add white--text"
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
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { createNotify } from '@/apis/smis/harmNotify'
import { hourOptions, minOptions } from '@/assets/js/dateTimeOption'
import UploadFileAdd from '@/components/UploadFileAdd.vue'

export default {
    data: () => ({
        valid: true,  // 表單是否驗證欄位
        isEdit: false,  // 是否為編輯
        notifyNumber: '',  // 通報編號
        ipt: {},
        defaultIpt: {
            date: new Date().toISOString().substr(0, 10),  // 發現日期
            hour: '00',  // 發現時間(小時)
            min: '00',  // 發現時間(分)
            location: 'l1',  // 發現地點
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
        showFiles: [],  // 要顯示的縮圖
    }),
    components: {
        UploadFileAdd,
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
        ]),
        // 送出
        save() {
            if(this.ipt.subject == '' || this.ipt.content == ''){
                alert("必填欄位未填")
                return
            }
            this.chLoadingShow()

            createNotify({
                FindDDay: this.ipt.date,  // 發現日期
                FindDHour: this.ipt.hour,  // 發現時間(小時)
                FindDMin: this.ipt.min,  // 發現時間(分)
                FindLine: this.ipt.location,  // 發現地點
                FindKLine: this.ipt.locationK,  // 發現地點-路線k
                FindMLine: this.ipt.locationM,  // 發現地點-路線m
                FindLineOther: this.ipt.locationOther,  // 其他地點
                ReportTitle: this.ipt.subject,  // 通報主旨
                ReportContent: this.ipt.content,  // 通報內容
                FileCount: this.ipt.files,  // 附件檔案
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    this.chMsgbar({ success: true, msg: '新增成功' })
                    this.ipt = { ...this.defaultIpt }  // 初始化新增表單
                    this.ipt.files = [ ...[]]
                    this.showFiles = [ ...[]]
                } else {
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
            }).catch(err => {
                this.chMsgbar({ success: false, msg: '伺服器發生問題，新增失敗' })
            }).finally(() => {
                this.chLoadingShow()
            })
        },
        // 加入檔案 (組件用)
        // 註：第二參數的布林值，是控制物件加入上傳後端的陣列，還是縮圖顯示的陣列
        joinFile(obj, bool) {
            if (bool) {
                this.ipt.files.push(obj)  // 加入要上傳後端的檔案
            } else {
                this.showFiles.push(obj)  // 加入要顯示的縮圖
            }
        },
        // 移除要上傳的檔案 (組件用)
        rmFile(idx) {
            this.showFiles.splice(idx, 1)
            this.ipt.files.splice(idx, 1)
        },
    },
    created() {
        this.ipt = { ...this.defaultIpt }  // 初始化新增表單
    }
}
</script>