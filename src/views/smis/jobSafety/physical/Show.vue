<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">
        個人健檢資料
    </h2>

    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <v-row no-gutters class="mt-8">
        <!-- 下面的欄位 -->
        <BottomTable :items="bottomItems" />

        <v-col cols="12" class="text-center mb-8">
            <v-btn dark class="mr-3"
                :to="`/smis/jobsafety/physical/${id}/list`"
            >回上層</v-btn>

            <v-btn dark class="ma-2"
                color="indigo"
                :to="`/smis/jobsafety/physical/${id}/form/${sid}`"
            >編輯</v-btn>

            <v-btn dark  class="ma-2" color="error"
                @click="del"
            >作廢</v-btn>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TopBasicTable from '@/components/TopBasicTable.vue'
import BottomTable from '@/components/BottomTable.vue'
import { healthCdList, healthUpdate } from '@/apis/smis/health'
import { getNowFullTime, decodeObject } from '@/assets/js/commonFun'
import { jobUrineOpts } from '@/assets/js/smisData'

export default {
    props:['id','sid'],
    data: () => ({
        topItems: {  // 上面的欄位
            
        },
        bottomItems: [],  // 下面的欄位
        opts: {  // 下拉選單
            urineProtein: jobUrineOpts,
            urineBlood: jobUrineOpts,
        },
        jobs: [{text:'駕駛員',value:'1'}, {text:'車長',value:'2'}, {text:'一般員工',value:'3'}],
        sex: [{text:'男',value:'1'}, {text:'女',value:'2'}, {text:'其他',value:'3'}],
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
        // 向後端取得資料
        fetchData() {
            this.chLoadingShow()
            console.log({
                ID: this.id,
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            })
            healthCdList({
                ID: this.id,
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res=>{
                console.log(res.data)
                if (res.data.ErrorCode == 0) {
                    console.log(res.data.HealthDataList.find(e=>e.FlowID==this.sid))
                   const Fdata = decodeObject(res.data.HealthDataList.find(e=>e.FlowID==this.sid))
                   this.topItems = {
                        depart: { icon: 'mdi-bank', title: '部門', text: Fdata.Depart },
                        name: { icon: 'mdi-account', title: '姓名', text: Fdata.Name },
                        job: { icon: 'mdi-clipboard-text', title: '職務', text: this.jobs.find(e=>e.value == Fdata.JobName).text },
                        birthday: { icon: 'mdi-calendar-text', title: '生日', text: Fdata.PeopleBirth },
                        sex: { icon: 'mdi-human-male-female', title: '性別', text: this.sex.find(e=>e.value == Fdata.PeopleSex).text },
                        // workName: { icon: 'mdi-tag', title: '從事作業名稱', text: Fdata.JobNowName },
                        jobStartDate: { icon: 'mdi-calendar-text', title: '受雇日期', text: Fdata.EmployDate },
                        physicalPeriod: { icon: 'mdi-clipboard-account', title: '檢查時期', text: Fdata.InspectionType },
                        physicalDate: { icon: 'mdi-calendar-text', title: '檢查日期', text: Fdata.HealthCheckDate },
                        level: { icon: 'mdi-elevation-rise', title: '健檢評級', text: Fdata.HealthResultLevel+'級' },
                    }
                    console.log(Fdata)
                    console.log(Fdata.UrineProtein)
                    this.bottomItems = [
                        { dataType: 'text', oneline: true, icon: 'none', title: '身高(cm)', text: Fdata.PeopleHeight + ' cm' },
                        { dataType: 'text', oneline: true, icon: 'none', title: '體重(kg)', text: Fdata.PeopleWeight + ' kg' },
                        { dataType: 'text', oneline: true, icon: 'none', title: '血壓收縮壓(mmHg)', text: Fdata.BloodShrink + ' mmHg' },
                        { dataType: 'text', oneline: true, icon: 'none', title: '血壓舒張壓(mmHg)', text: Fdata.BloodDiastole + ' mmhg' },
                        { dataType: 'text', oneline: true, icon: 'none', title: '脈搏(次/分鐘)', text: Fdata.Pulse + ' 次/分鐘' },
                        { dataType: 'text', oneline: true, icon: 'none', title: '腰圍(cm)', text: Fdata.Waistline + ' cm' },
                        { dataType: 'text', oneline: true, icon: 'none', title: '視力', text: Fdata.Sight },
                        { dataType: 'text', oneline: true, icon: 'none', title: '聽力', text: Fdata.Hearing },
                        { dataType: 'text', oneline: true, icon: 'none', title: '尿蛋白', text: this.opts.urineProtein.find(item => item.value == Fdata.UrineProtein).text },
                        { dataType: 'text', oneline: true, icon: 'none', title: '尿潛血', text: this.opts.urineBlood.find(item => item.value == Fdata.UrineBlood).text },
                        { dataType: 'text', oneline: true, icon: 'none', title: '白血球數(個/ul)', text: Fdata.WhiteBlood + ' 個/ul' },
                        { dataType: 'text', oneline: true, icon: 'none', title: '血色素(g/dL)', text: Fdata.BloodPigment + ' g/dL' },
                        { dataType: 'text', oneline: true, icon: 'none', title: '胸部 X 光', text: Fdata.Xray + '級' },
                        { dataType: 'text', oneline: true, icon: 'none', title: 'GPT(U/L)', text: Fdata.GPTValue + ' U/L' },
                        { dataType: 'text', oneline: true, icon: 'none', title: 'B 肝抗原', text: Fdata.HepatitisB },
                        { dataType: 'text', oneline: true, icon: 'none', title: '尿酸(mg/dL)', text: Fdata.UricAcid + ' mg/dL' },
                        { dataType: 'text', oneline: true, icon: 'none', title: '肌酸酐(mg/dL)', text: Fdata.Creatinine + ' mg/dL' },
                        { dataType: 'text', oneline: true, icon: 'none', title: '膽固醇(mg/dL)', text: Fdata.Cholesterol + ' mg/dL' },
                        { dataType: 'text', oneline: true, icon: 'none', title: 'HDL(mg/dL)', text: Fdata.HDLValue + ' mg/dL' },
                        { dataType: 'text', oneline: true, icon: 'none', title: 'LDL(mg/dL)', text: Fdata.LDLValue + ' mg/dL' },
                        { dataType: 'text', oneline: true, icon: 'none', title: '三酸甘油酯(mg/dL)', text: Fdata.Triglyceride + ' mg/dL' },
                        { dataType: 'text', oneline: true, icon: 'none', title: '飯前血糖(mg/dL)', text: Fdata.BloodSugar + 'mg/dL' },
                        { dataType: 'text', oneline: true, icon: 'none', title: '運動心電圖', text: Fdata.ECGValue },
                        { dataType: 'text', oneline: false, icon: 'none', title: '應處理及注意事項', text: Fdata.HandleNotice.replace(/\n/g, '<br>') },
                        { dataType: 'text', oneline: true, icon: 'none', title: '適任性', text: (Fdata.Competence == 'T')? '合格' : '不合格' },
                        { dataType: 'text', oneline: false, icon: 'none', title: '複檢狀況', text: Fdata.Reinspection.replace(/\n/g, '<br>') },
                        { dataType: 'text', oneline: true, icon: 'none', title: '醫師姓名', text: Fdata.HealthDoctor },
                        { dataType: 'text', oneline: true, icon: 'none', title: '醫療機構名稱', text: Fdata.CheckMechName },
                        { dataType: 'text', oneline: true, icon: 'none', title: '醫療機構地址', text: Fdata.CheckMechAddress },
                        { dataType: 'text', oneline: true, icon: 'none', title: '醫療機構電話', text: Fdata.CheckMechPhone },
                    ]
                }else{
                    sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                    this.$router.push({ path: '/error' })
                }
            }).catch( err => {
                console.warn(err)
                this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
            }).finally(() => {
                this.chLoadingShow()
            })
        },
        // 作廢
        del() {
            if (confirm('你確定要作廢嗎?')) {
                this.chLoadingShow()
                let sendData = {
                    Option: '3',
                    FlowID: this.sid,
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }
                healthUpdate({
                    ...sendData
                }).then(res=>{
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '資料作廢成功' })
                    }else{
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch( err => {
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，資料作廢失敗' })
                }).finally(() => {
                    this.chLoadingShow()
                    this.$router.push({ path: `/smis/jobsafety/physical/${this.id}/list` })
                })
            }
        },
    },
    created() {
        this.fetchData()
    }
}
</script>