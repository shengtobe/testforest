<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">
        {{ (this.isEdit)? `個人健檢資料編輯 (日期：${ ipt.physicalDate })` : `個人健檢資料新增 (姓名：${ pdata.name })` }}
    </h2>

    <v-row class="px-2">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>身份證號
            </h3>
            <v-text-field
                v-model.trim="ipt.identityNumber"
                solo
                placeholder="請輸入身份證號"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>生日
            </h3>
            <v-menu
                v-model="dateMenuShow.birthday"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model.trim="ipt.birthday"
                        solo
                        v-on="on"
                        readonly
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="purple"
                    v-model="ipt.birthday"
                    @input="dateMenuShow.birthday = false"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-human-male-female</v-icon>性別
            </h3>
            <v-select
                v-model="ipt.sex"
                :items="['男', '女']"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-tag</v-icon>從事作業之名稱
            </h3>
            <v-text-field
                v-model.trim="ipt.workName"
                solo
                placeholder="請輸入名稱"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>受雇日期
            </h3>
            <v-menu
                v-model="dateMenuShow.jobStartDate"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model.trim="ipt.jobStartDate"
                        solo
                        v-on="on"
                        readonly
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="purple"
                    v-model="ipt.jobStartDate"
                    @input="dateMenuShow.jobStartDate = false"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-clipboard-account</v-icon>檢查時期
            </h3>
            <v-select
                v-model="ipt.physicalPeriod"
                :items="['受雇', '定期']"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>檢查日期
            </h3>
            <v-menu
                v-model="dateMenuShow.physicalDate"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model.trim="ipt.physicalDate"
                        solo
                        v-on="on"
                        readonly
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="purple"
                    v-model="ipt.physicalDate"
                    @input="dateMenuShow.physicalDate = false"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12">
            <v-divider class="mx-2 mt-1 mb-4"></v-divider>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-format-align-center</v-icon>身高(cm)
            </h3>
            <v-text-field
                v-model.trim="ipt.heigh"
                solo
                placeholder="請輸入身高"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-speedometer</v-icon>體重(kg)
            </h3>
            <v-text-field
                v-model.trim="ipt.weight"
                solo
                placeholder="請輸入體重"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-source-branch</v-icon>血壓收縮壓(mmHg)
            </h3>
            <v-text-field
                v-model.trim="ipt.systolicBlood"
                solo
                placeholder="請輸入血壓收縮壓"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-source-branch</v-icon>血壓舒張壓(mmHg)
            </h3>
            <v-text-field
                v-model.trim="ipt.diastolicBlood"
                solo
                placeholder="請輸入血壓舒張壓"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-heart-pulse</v-icon>脈搏(次/分鐘)
            </h3>
            <v-text-field
                v-model.trim="ipt.pulse"
                solo
                placeholder="請輸入脈搏"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>腰圍(cm)
            </h3>
            <v-text-field
                v-model.trim="ipt.waistline"
                solo
                placeholder="請輸入腰圍"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>視力
            </h3>
            <v-text-field
                v-model.trim="ipt.vision"
                solo
                placeholder="請輸入視力"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>聽力
            </h3>
            <v-text-field
                v-model.trim="ipt.hearing"
                solo
                placeholder="請輸入聽力"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>尿蛋白
            </h3>
            <v-select
                v-model="ipt.urineProtein"
                :items="opts.urineProtein"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>尿潛血
            </h3>
            <v-select
                v-model="ipt.urineBlood"
                :items="opts.urineBlood"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>白血球數(個/ul)
            </h3>
            <v-text-field
                v-model.trim="ipt.whiteBlood"
                solo
                placeholder="請輸入白血球數"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>血色素(g/dL)
            </h3>
            <v-text-field
                v-model.trim="ipt.hemoglobin"
                solo
                placeholder="請輸入血色素"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>胸部 X 光
            </h3>
            <v-select
                v-model="ipt.chestXray"
                :items="['1級', '2級', '3級', '4級']"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>GPT(U/L)
            </h3>
            <v-text-field
                v-model.trim="ipt.gpt"
                solo
                placeholder="請輸入GPT"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>B 肝抗原
            </h3>
            <v-select
                v-model="ipt.BLiver"
                :items="['Positive', 'Negative']"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>尿酸(mg/dL)
            </h3>
            <v-text-field
                v-model.trim="ipt.uricAcid"
                solo
                placeholder="請輸入尿酸"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>肌酸酐(mg/dL)
            </h3>
            <v-text-field
                v-model.trim="ipt.creatinine"
                solo
                placeholder="請輸入肌酸酐"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>膽固醇(mg/dL)
            </h3>
            <v-text-field
                v-model.trim="ipt.cholesterol"
                solo
                placeholder="請輸入膽固醇"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>HDL(mg/dL)
            </h3>
            <v-text-field
                v-model.trim="ipt.hdl"
                solo
                placeholder="請輸入HDL"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>LDL(mg/dL)
            </h3>
            <v-text-field
                v-model.trim="ipt.ldl"
                solo
                placeholder="請輸入LDL"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>三酸甘油酯(mg/dL)
            </h3>
            <v-text-field
                v-model.trim="ipt.triglyceride"
                solo
                placeholder="請輸入三酸甘油酯"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>飯前血糖(mg/dL)
            </h3>
            <v-text-field
                v-model.trim="ipt.bloodSugar"
                solo
                placeholder="請輸入飯前血糖"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>運動心電圖
            </h3>
            <v-text-field
                v-model.trim="ipt.egc"
                solo
                placeholder="請輸入運動心電圖"
            ></v-text-field>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-pen</v-icon>應處理及注意事項
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入應處理及注意事項"
                v-model.trim="ipt.note"
            ></v-textarea>
        </v-col>

        <v-col cols="12">
            <v-divider class="mx-2 mt-1 mb-4"></v-divider>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-account</v-icon>醫師姓名
            </h3>
            <v-text-field
                v-model.trim="ipt.doctorName"
                solo
                placeholder="請輸入醫師姓名"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-tag</v-icon>醫療機構名稱
            </h3>
            <v-text-field
                v-model.trim="ipt.hospitalName"
                solo
                placeholder="請輸入醫療機構名稱"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-phone-classic</v-icon>醫療機構電話
            </h3>
            <v-text-field
                v-model.trim="ipt.hospitalPhone"
                solo
                placeholder="請輸入醫療機構電話"
            ></v-text-field>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>醫療機構地址
            </h3>
            <v-text-field
                v-model.trim="ipt.hospitalAddr"
                solo
                placeholder="請輸入醫療機構地址"
            ></v-text-field>
        </v-col>

        <v-col cols="12" class="text-center mb-8">
            <v-btn dark class="mr-3"
                v-if="isEdit"
                :to="`/smis/jobSafety/physical/${this.sid}/show`"
            >回上層</v-btn>

            <v-btn dark class="mr-3"
                v-else
                :to="`/smis/jobsafety/physical/${this.pdata.pid}/list`"
            >回上層</v-btn>
            
            <v-btn
                color="success"
                @click="save"
            >{{ (isEdit)? '儲存變更': '送出' }}</v-btn>
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
import { jobUrineOpts } from '@/assets/js/smisData'

export default {
    data: () => ({
        valid: true,  // 表單是否驗證欄位
        isEdit: false,  // 是否為編輯
        sid: '',
        pdata: {
            pid: '',
            name: '',  // 姓名
        },
        ipt: {},
        defaultIpt: {
            identityNumber: '',  // 身份證號
            birthday: new Date().toISOString().substr(0, 10),  // 生日
            sex: '男',  // 性別
            workName: '',  // 從事作業之名稱
            jobStartDate: new Date().toISOString().substr(0, 10),  // 受雇日期
            physicalPeriod: '受雇',  // 檢查時期
            physicalDate: new Date().toISOString().substr(0, 10),  // 檢查日期
            heigh: '',  // 身高(cm)
            weight: '',  // 體重(kg)
            systolicBlood: '',  // 血壓收縮壓(mmHg)
            diastolicBlood: '',  // 血壓舒張壓(mmHg)
            pulse: '',  // 脈搏(次/分鐘)
            waistline: '',  // 腰圍(cm)
            vision: '',  // 視力
            hearing: '',  // 聽力
            urineProtein: 1,  // 尿蛋白
            urineBlood: 1,  // 尿潛血
            whiteBlood: '',  // 白血球數(個/ul)
            hemoglobin: '',  // 血色素(g/dL)
            chestXray: '1級',  // 胸部 X 光
            gpt: '',  // GPT(U/L)
            BLiver: 'Positive',  // B 肝抗原
            uricAcid: '',  // 尿酸(mg/dL)
            creatinine: '',  // 肌酸酐(mg/dL)
            cholesterol: '',  // 膽固醇(mg/dL)
            hdl: '',  // HDL(mg/dL)
            ldl: '',  // LDL(mg/dL)
            triglyceride: '',  // 三酸甘油酯(mg/dL)
            bloodSugar: '',  // 飯前血糖(mg/dL)
            egc: '',  // 運動心電圖
            note: '',  // 應處理及注意事項
            doctorName: '',  // 醫師姓名
            hospitalName: '',  // 醫療機構名稱
            hospitalAddr: '',  // 醫療機構地址
            hospitalPhone: '',  // 醫療機構電話
        },
        dateMenuShow: {  // 日曆是否顯示
            birthday: false,  // 生日
            jobStartDate: false,  // 受雇日期
            physicalDate: false,  // 檢查日期
        },
        opts: {  // 下拉選單
            urineProtein: jobUrineOpts,
            urineBlood: jobUrineOpts,
        },
    }),
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

            // -------------- 編輯時(看sid) -------------- 
            if (this.$route.params.sid != undefined) {
                this.chLoadingShow()
                this.isEdit = true
                this.pdata.pid = this.$route.params.id
                this.sid = this.$route.params.sid

                // 範例效果
                setTimeout(() => {
                    let obj = {
                        identityNumber: 'S122785694',  // 身份證號
                        birthday: '1991-04-03',  // 生日
                        sex: '男',  // 性別
                        workName: '車輛維修',  // 從事作業之名稱
                        jobStartDate: '2019-03-01',  // 受雇日期
                        physicalPeriod: '受雇',  // 檢查時期
                        physicalDate: '2019-04-20',  // 檢查日期
                        heigh: '174',  // 身高(cm)
                        weight: '80',  // 體重(kg)
                        systolicBlood: '121',  // 血壓收縮壓(mmHg)
                        diastolicBlood: '94',  // 血壓舒張壓(mmHg)
                        pulse: '50',  // 脈搏(次/分鐘)
                        waistline: '32',  // 腰圍(cm)
                        vision: '1.2/1.2',  // 視力
                        hearing: '正常',  // 聽力
                        urineProtein: 3,  // 尿蛋白
                        urineBlood: 4,  // 尿潛血
                        whiteBlood: '4500',  // 白血球數(個/ul)
                        hemoglobin: '3000',  // 血色素(g/dL)
                        chestXray: '1級',  // 胸部 X 光
                        gpt: '400',  // GPT(U/L)
                        BLiver: 'Positive',  // B 肝抗原
                        uricAcid: '30',  // 尿酸(mg/dL)
                        creatinine: '100',  // 肌酸酐(mg/dL)
                        cholesterol: '150',  // 膽固醇(mg/dL)
                        hdl: '120',  // HDL(mg/dL)
                        ldl: '140',  // LDL(mg/dL)
                        triglyceride: '20',  // 三酸甘油酯(mg/dL)
                        bloodSugar: '2',  // 飯前血糖(mg/dL)
                        egc: '',  // 運動心電圖
                        note: '需要定期運動',  // 應處理及注意事項
                        doctorName: '王永慶',  // 醫師姓名
                        hospitalName: '保健醫院',  // 醫療機構名稱
                        hospitalAddr: '高雄市中正一路199號',  // 醫療機構地址
                        hospitalPhone: '07-1274853',  // 醫療機構電話
                    }

                    this.setInitDate(obj)
                    this.chLoadingShow()
                }, 1000)
            } else {
                // -------------- 新增時 --------------
                if (sessionStorage.getItem('pdataItem') !== null) {
                    let obj = JSON.parse(sessionStorage.getItem('pdataItem'))
                    
                    this.pdata.pid = obj.id,  // pid
                    this.pdata.name = '王小明'  // 姓名

                    sessionStorage.removeItem('pdataItem')  // 清除 sessionStorage
                } else {
                    // 若無 sessionStorage 則導回搜尋頁
                    this.$router.push({ path: '/smis/jobsafety/physical' })
                }
            }
        },
        // 設定資料(編輯時)
        setInitDate(obj) {
            this.ipt.identityNumber = obj.identityNumber // 身份證號
            this.ipt.birthday = obj.birthday // 生日
            this.ipt.sex = obj.sex // 性別
            this.ipt.workName = obj.workName // 從事作業之名稱
            this.ipt.jobStartDate = obj.jobStartDate // 受雇日期
            this.ipt.physicalPeriod = obj.physicalPeriod // 檢查時期
            this.ipt.physicalDate = obj.physicalDate // 檢查日期
            this.ipt.heigh = obj.heigh // 身高(cm)
            this.ipt.weight = obj.weight // 體重(kg)
            this.ipt.systolicBlood = obj.systolicBlood // 血壓收縮壓(mmHg)
            this.ipt.diastolicBlood = obj.diastolicBlood //血壓舒張壓(mmHg)
            this.ipt.pulse = obj.pulse // 脈搏(次/分鐘)
            this.ipt.waistline = obj.waistline // 腰圍(cm)
            this.ipt.vision = obj.vision // 視力
            this.ipt.hearing = obj.hearing // 聽力
            this.ipt.urineProtein = obj.urineProtein // 尿蛋白
            this.ipt.urineBlood = obj.urineBlood // 尿潛血
            this.ipt.whiteBlood = obj.whiteBlood // 白血球數(個/ul)
            this.ipt.hemoglobin = obj.hemoglobin // 血色素(g/dL)
            this.ipt.chestXray = obj.chestXray // 胸部 X 光
            this.ipt.gpt = obj.gpt // GPT(U/L)
            this.ipt.BLiver = obj.BLiver // B 肝抗原
            this.ipt.uricAcid = obj.uricAcid // 尿酸(mg/dL)
            this.ipt.creatinine = obj.creatinine // 肌酸酐(mg/dL)
            this.ipt.cholesterol = obj.cholesterol // 膽固醇(mg/dL)
            this.ipt.hdl = obj.hdl // HDL(mg/dL)
            this.ipt.ldl = obj.ldl // LDL(mg/dL)
            this.ipt.triglyceride = obj.triglyceride // 三酸甘油酯(mg/dL)
            this.ipt.bloodSugar = obj.bloodSugar // 飯前血糖(mg/dL)
            this.ipt.egc = obj.egc // 運動心電圖
            this.ipt.note = obj.note // 應處理及注意事項
            this.ipt.doctorName = obj.doctorName // 醫師姓名
            this.ipt.hospitalName = obj.hospitalName // 醫療機構名稱
            this.ipt.hospitalAddr = obj.hospitalAddr // 醫療機構地址
            this.ipt.hospitalPhone = obj.hospitalPhone // 醫療機構電話
        },
        // 送出
        save() {
            this.chLoadingShow()

            // 測試用資料
            setTimeout(() => {
                let txt = (this.isEdit)? '資料更新成功' :  '資料新增成功'
                if (!this.isEdit) this.$router.push({ path: '/smis/jobsafety/physical' })
                this.chMsgbar({ success: true, msg: txt })
                this.chLoadingShow()
            }, 1000)
        },
    },
    created() {
        this.initData()
    }
}
</script>