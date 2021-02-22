<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">
        個人健檢資料 (日期：{{ topItems.physicalDate.text }})
    </h2>

    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <v-row no-gutters class="mt-8">
        <!-- 下面的欄位 -->
        <BottomTable :items="bottomItems" />

        <v-col cols="12" class="text-center mb-8">
            <v-btn dark class="mr-3"
                :to="`/smis/jobsafety/physical/${pid}/list`"
            >回上層</v-btn>

            <v-btn dark class="ma-2"
                color="indigo"
                :to="`/smis/jobsafety/physical/${pid}/edit/${sid}`"
            >編輯</v-btn>

            <v-btn dark  class="ma-2" color="error"
                @click="del"
            >作廢</v-btn>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import TopBasicTable from '@/components/TopBasicTable.vue'
import BottomTable from '@/components/BottomTable.vue'
import { departOptions } from '@/assets/js/departOption'
import { jobUrineOpts } from '@/assets/js/smisData'

export default {
    data: () => ({
        pid: '',  // 上層id
        sid: '',  // 本筆記錄id
        topItems: {  // 上面的欄位
            number: { icon: 'mdi-barcode', title: '編號', text: '' },
            depart: { icon: 'mdi-bank', title: '部門', text: '' },
            name: { icon: 'mdi-account', title: '姓名', text: '' },
            job: { icon: 'mdi-clipboard-text', title: '職務', text: '' },
            identityNumber: { icon: 'mdi-barcode', title: '身份證號', text: '' },
            birthday: { icon: 'mdi-calendar-text', title: '生日', text: '' },
            sex: { icon: 'mdi-human-male-female', title: '性別', text: '' },
            workName: { icon: 'mdi-tag', title: '從事作業名稱', text: '' },
            jobStartDate: { icon: 'mdi-calendar-text', title: '受雇日期', text: '' },
            physicalPeriod: { icon: 'mdi-clipboard-account', title: '檢查時期', text: '' },
            physicalDate: { icon: 'mdi-calendar-text', title: '檢查日期', text: '' },
            level: { icon: 'mdi-elevation-rise', title: '健檢評級', text: '' },
        },
        bottomItems: [],  // 下面的欄位
    }),
    components: {
        TopBasicTable,
        BottomTable,
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
        // 向後端取得資料
        fetchData() {
            this.chLoadingShow()
            this.sid = this.$route.params.sid 

            // 新增測試用資料
            setTimeout(() => {
                this.pid = 111  // 上層id(從後端可查到)

                let obj = {
                    number: 'A0015',  // 編號
                    depart: 'd2',  // 部門
                    name: '王小明',  // 姓名
                    job: '一般員工',  // 職務
                    identityNumber: 'S122785694',  // 身份證號
                    birthday: '1991-04-03',  // 生日
                    sex: '男',  // 性別
                    workName: '車輛維修',  // 從事作業之名稱
                    jobStartDate: '2019-03-01',  // 受雇日期
                    physicalPeriod: '受雇',  // 檢查時期
                    physicalDate: '2019-04-20',  // 檢查日期
                    level: '1級',  // 健檢評級
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
                    competence: 'y',  // 適任性
                    recheck: '',  // 複檢狀況
                }

                this.setShowData(obj)
                this.chLoadingShow()
            }, 1000)
        },
        // 初始化資料
        setShowData(obj) {
            this.topItems.number.text = obj.number  // 編號
            this.topItems.depart.text = departOptions.find(item => item.value == obj.depart).text  // 部門
            this.topItems.name.text = obj.name  // 姓名
            this.topItems.job.text = obj.job  // 職務
            this.topItems.identityNumber.text = obj.identityNumber // 身份證號
            this.topItems.birthday.text = obj.birthday // 生日
            this.topItems.sex.text = obj.sex // 性別
            this.topItems.workName.text = obj.workName // 從事作業之名稱
            this.topItems.jobStartDate.text = obj.jobStartDate // 受雇日期
            this.topItems.physicalPeriod.text = obj.physicalPeriod // 檢查時期
            this.topItems.physicalDate.text = obj.physicalDate // 檢查日期
            this.topItems.level.text = obj.level // 健檢評級
            
            this.bottomItems = [
                { dataType: 'text', oneline: true, icon: 'none', title: '身高(cm)', text: obj.heigh },
                { dataType: 'text', oneline: true, icon: 'none', title: '體重(kg)', text: obj.weight },
                { dataType: 'text', oneline: true, icon: 'none', title: '血壓收縮壓(mmHg)', text: obj.systolicBlood },
                { dataType: 'text', oneline: true, icon: 'none', title: '血壓舒張壓(mmHg)', text: obj.diastolicBlood },
                { dataType: 'text', oneline: true, icon: 'none', title: '脈搏(次/分鐘)', text: obj.pulse },
                { dataType: 'text', oneline: true, icon: 'none', title: '腰圍(cm)', text: obj.waistline },
                { dataType: 'text', oneline: true, icon: 'none', title: '視力', text: obj.vision },
                { dataType: 'text', oneline: true, icon: 'none', title: '聽力', text: obj.hearing },
                { dataType: 'text', oneline: true, icon: 'none', title: '尿蛋白', text: jobUrineOpts.find(item => item.value == obj.urineProtein).text },
                { dataType: 'text', oneline: true, icon: 'none', title: '尿潛血', text: jobUrineOpts.find(item => item.value == obj.urineBlood).text },
                { dataType: 'text', oneline: true, icon: 'none', title: '白血球數(個/ul)', text: obj.whiteBlood },
                { dataType: 'text', oneline: true, icon: 'none', title: '血色素(g/dL)', text: obj.hemoglobin },
                { dataType: 'text', oneline: true, icon: 'none', title: '胸部 X 光', text: obj.chestXray },
                { dataType: 'text', oneline: true, icon: 'none', title: 'GPT(U/L)', text: obj.gpt },
                { dataType: 'text', oneline: true, icon: 'none', title: 'B 肝抗原', text: obj.BLiver },
                { dataType: 'text', oneline: true, icon: 'none', title: '尿酸(mg/dL)', text: obj.uricAcid },
                { dataType: 'text', oneline: true, icon: 'none', title: '肌酸酐(mg/dL)', text: obj.creatinine },
                { dataType: 'text', oneline: true, icon: 'none', title: '膽固醇(mg/dL)', text: obj.cholesterol },
                { dataType: 'text', oneline: true, icon: 'none', title: 'HDL(mg/dL)', text: obj.hdl },
                { dataType: 'text', oneline: true, icon: 'none', title: 'LDL(mg/dL)', text: obj.ldl },
                { dataType: 'text', oneline: true, icon: 'none', title: '三酸甘油酯(mg/dL)', text: obj.triglyceride },
                { dataType: 'text', oneline: true, icon: 'none', title: '飯前血糖(mg/dL)', text: obj.bloodSugar },
                { dataType: 'text', oneline: true, icon: 'none', title: '運動心電圖', text: obj.egc },
                { dataType: 'text', oneline: false, icon: 'none', title: '應處理及注意事項', text: obj.note.replace(/\n/g, '<br>') },
                { dataType: 'text', oneline: true, icon: 'none', title: '適任性', text: (obj.competence == 'y')? '合格' : '不合格' },
                { dataType: 'text', oneline: false, icon: 'none', title: '複檢狀況', text: obj.recheck.replace(/\n/g, '<br>') },
                { dataType: 'text', oneline: true, icon: 'none', title: '醫師姓名', text: obj.doctorName },
                { dataType: 'text', oneline: true, icon: 'none', title: '醫療機構名稱', text: obj.hospitalName },
                { dataType: 'text', oneline: true, icon: 'none', title: '醫療機構地址', text: obj.hospitalAddr },
                { dataType: 'text', oneline: true, icon: 'none', title: '醫療機構電話', text: obj.hospitalPhone },
            ]
        },
        // 作廢
        del() {
            if (confirm('你確定要作廢嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.$router.push({ path: `/smis/jobsafety/physical/${this.pid}/list` })
                    this.chMsgbar({ success: true, msg: '作廢成功'})
                    this.chLoadingShow()
                }, 1000)
            }
        },
    },
    created() {
        this.fetchData()
    }
}
</script>