<template>
<v-container style="max-width: 1200px">
    <h2 class="label-header mb-4">
        個人健檢資料
    </h2>

    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <v-row no-gutters class="mt-8">
        <!-- 下面的欄位 -->
        <BottomTable :items="bottomItems" />

        <v-col cols="12" class="text-center mb-8">
            <v-btn dark class="btn-close mr-3"
                :to="`/smis/jobsafety/physical/${id}/list`"
            >回上層</v-btn>

            <v-btn dark class="btn-modify ma-2"
                color="indigo" v-if="isShowBtn"
                :to="`/smis/jobsafety/physical/${id}/form/${sid}`"
            >編輯</v-btn>

            <v-btn dark  class="btn-delete ma-2" color="error"
                @click="delDialog=true" v-if="isShowBtn"
            >作廢</v-btn>
        </v-col>
    </v-row>
    <!-- 刪除 -->
    <v-dialog v-model="delDialog" max-width="350px">
        <v-card>
            <v-card-title class="red white--text px-4 py-1 headline"
            >確認是否作廢?</v-card-title
            >
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="delDialog=false">取消</v-btn>
            <v-btn color="red" class="white--text" @click="del()">刪除</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { canInUpdate } from '@/apis/access'
import TopBasicTable from '@/components/TopBasicTable.vue'
import BottomTable from '@/components/BottomTable.vue'
import { healthCdList, healthUpdate } from '@/apis/smis/health'
import { getNowFullTime, decodeObject } from '@/assets/js/commonFun'
import { jobUrineOpts } from '@/assets/js/smisData'

export default {
    props:['id','sid'],
    data: () => ({
        isShowBtn: false, // 按鈕是否顯示(依權限)
        topItems: {  // 上面的欄位
            
        },
        bottomItems: [],  // 下面的欄位
        opts: {  // 下拉選單
            urineProtein: jobUrineOpts,
            urineBlood: jobUrineOpts,
        },
        jobs: [{ text:'駕駛(60歲以上)', value:'2' }, 
                { text:'駕駛(未滿60歲)', value:'3' }, 
                { text:'行車人員(非駕駛)', value:'4' },
                { text:'一般人員(非行車人員)', value:'5' }],
        sex: [{text:'男',value:'M'}, {text:'女',value:'F'}, {text:'無',value:'X'}],
        InspectionType: [{ text: '受雇', value: '1' },{ text: '定期', value: '2' }],
        delDialog: false
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
            groupData: state => state.groupData,
        }),
        
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        ...mapActions('user', [
            'saveUserGroup',  // 儲存使用者權限(群組)資料
        ]),
        getBMI(h,w){
            if(h < 110 || w < 30) return '--';
            let val = w / Math.pow(h/100, 2)
            let text
            if(val < 18.5){
                text = '體重過輕'
            }
            else if(val < 24 && val >= 18.5){
                text = '正常'
            }else if(val < 27 && val >= 24){
                text = '過重'
            }else if(val < 30 && val >= 27){
                text = '輕度肥胖'
            }else if(val < 35 && val >= 30){
                text = '中度肥胖'
            }else if(val >= 35){
                text = '重度肥胖'
            }
            return val.toFixed(1) + '  ' + text
        },
        // 向後端取得資料
        fetchData() {
            this.chLoadingShow({show:true})
            //敲門
            canInUpdate({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    this.saveUserGroup(res.data.GroupData)
                    this.isShowBtn = this.groupData.RoleLv3 == "T"
                }
            }).catch( err => {
                //console.log(err)
            }).finally(() => {
            })
            //
            healthCdList({
                ID: this.id,
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res=>{
                if (res.data.ErrorCode == 0) {
                                   const Fdata = decodeObject(res.data.HealthDataList.find(e=>e.FlowID==this.sid))
                   this.topItems = {
                        depart: { icon: 'mdi-bank', title: '部門', text: Fdata.Depart },
                        name: { icon: 'mdi-account', title: '姓名', text: Fdata.Name },
                        job: { icon: 'mdi-clipboard-text', title: '職務', text: this.jobs.find(e=>e.value == Fdata.JobName).text },
                        birthday: { icon: 'mdi-calendar-text', title: '生日', text: Fdata.PeopleBirth },
                        sex: { icon: 'mdi-human-male-female', title: '性別', text: this.sex.find(e=>e.value == Fdata.PeopleSex).text },
                        // workName: { icon: 'mdi-tag', title: '從事作業名稱', text: Fdata.JobNowName },
                        jobStartDate: { icon: 'mdi-calendar-text', title: '受雇日期', text: Fdata.EmployDate },
                        physicalPeriod: { icon: 'mdi-clipboard-account', title: '檢查時期', text: this.InspectionType.find(e=>e.value == Fdata.InspectionType).text },
                        physicalDate: { icon: 'mdi-calendar-text', title: '檢查日期', text: Fdata.HealthCheckDate },
                        level: { icon: 'mdi-elevation-rise', title: '健檢評級', text: Fdata.HealthResultLevel+'級' },
                    }
                    this.bottomItems = [
                        { dataType: 'text', oneline: true, icon: 'none', title: '身高(cm)', text: Fdata.PeopleHeight + ' cm' },
                        { dataType: 'text', oneline: true, icon: 'none', title: '體重(kg)', text: Fdata.PeopleWeight + ' kg' },
                        { dataType: 'text', oneline: true, icon: 'none', title: 'BMI', text: this.getBMI(Fdata.PeopleHeight, Fdata.PeopleWeight) },
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
                this.chLoadingShow({show:false})
            })
        },
        // 作廢
        del() {
            this.chLoadingShow({show:true})
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
                this.chLoadingShow({show:false})
                this.$router.push({ path: `/smis/jobsafety/physical/${this.id}/list` })
            })
        },
    },
    created() {
        this.fetchData()
    }
}
</script>