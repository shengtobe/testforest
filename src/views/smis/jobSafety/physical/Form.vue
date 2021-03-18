<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">
        {{ (this.isEdit)? `個人健檢資料編輯 (日期：${ ipt.physicalDate })` : `個人健檢資料新增`}}
    </h2>
    <v-row>
      <v-col cols="12" sm="3">
        <!-- <v-autocomplete
          :items="orgList"
          :filter="aFilter"
          label="輸入人名或單位名稱進行搜尋"
          solo
          clearable
          small-chips
          v-model="pdata.pid"
          :loading="orgIsLoading"
          @change="getPeopleData"
          /> -->
        <PeopleSelect :disabled="id != 0 && id != undefined" v-model="ipt.ID"  @change="getPeopleData" />
      </v-col>
    </v-row>
    <v-row class="px-2">
        <!-- <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-barcode</v-icon>身份證號
            </h3>
            <v-text-field
                v-model.trim="ipt.identityNumber"
                solo
                placeholder="請輸入身份證號"
            ></v-text-field>
        </v-col> -->

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>生日
            </h3>
            <v-text-field
                v-model.trim="ipt.PeopleBirth"
                solo
                readonly
                placeholder="請輸入生日"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-human-male-female</v-icon>性別
            </h3>
            <v-select
                readonly
                v-model="ipt.PeopleSex"
                :items="[{text:'男性',value:'M'}, {text:'女性',value:'F'}, {text:'第三性別',value:'X'}]"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-human-male-female</v-icon>健檢分級性別
            </h3>
            <v-select
                readonly
                v-model="ipt.HealthLvSex"
                :items="[{text:'男性',value:'M'}, {text:'女性',value:'F'}]"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-tag</v-icon>職務
            </h3>
            <!-- <v-text-field
                v-model.trim="ipt.JobName"
                solo
                readonly
                placeholder="請選擇人員"
            ></v-text-field> -->
            <v-select
                v-model="ipt.JobName"
                :items="[{text:'駕駛員',value:'1'}, {text:'車長',value:'2'}, {text:'一般員工',value:'3'}]"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>受雇日期
            </h3>
            <v-text-field
                v-model.trim="ipt.EmployDate"
                solo
                
                placeholder="請輸入受雇日期"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-clipboard-account</v-icon>檢查時期
            </h3>
            <v-select
                v-model="ipt.InspectionType"
                :items="[{ text: '受雇', value: '1' },{ text: '定期', value: '2' }]"
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
                        v-model.trim="ipt.HealthCheckDate"
                        solo
                        v-on="on"
                        readonly
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="purple"
                    v-model="ipt.HealthCheckDate"
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
                <v-icon class="mr-1 mb-1">mdi-format-align-center</v-icon>身高
            </h3>
            <v-text-field
                v-model.trim="ipt.PeopleHeight"
                solo
                placeholder="請輸入身高"
                suffix="cm"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-speedometer</v-icon>體重
            </h3>
            <v-text-field
                v-model.trim="ipt.PeopleWeight"
                solo
                suffix="kg"
                placeholder="請輸入體重"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-source-branch</v-icon>血壓收縮壓
            </h3>
            <v-text-field
                v-model.trim="ipt.BloodShrink"
                solo
                suffix="mmHg"
                placeholder="請輸入血壓收縮壓"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-source-branch</v-icon>血壓舒張壓
            </h3>
            <v-text-field
                v-model.trim="ipt.BloodDiastole"
                solo
                suffix="mmHg"
                placeholder="請輸入血壓舒張壓"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-heart-pulse</v-icon>脈搏
            </h3>
            <v-text-field
                v-model.trim="ipt.Pulse"
                solo
                suffix="次/分鐘"
                placeholder="請輸入脈搏"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>腰圍
            </h3>
            <v-text-field
                v-model.trim="ipt.Waistline"
                solo
                suffix="cm"
                placeholder="請輸入腰圍"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>視力
            </h3>
            <v-text-field
                v-model.trim="ipt.Sight"
                solo
                placeholder="請輸入視力"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>聽力
            </h3>
            <v-text-field
                v-model.trim="ipt.Hearing"
                solo
                placeholder="請輸入聽力"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>尿蛋白
            </h3>
            <v-select
                v-model="ipt.UrineProtein"
                :items="opts.urineProtein"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>尿潛血
            </h3>
            <v-select
                v-model="ipt.UrineBlood"
                :items="opts.urineBlood"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>白血球數
            </h3>
            <v-text-field
                v-model.trim="ipt.WhiteBlood"
                solo
                suffix="個/ul"
                placeholder="請輸入白血球數"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>血色素
            </h3>
            <v-text-field
                v-model.trim="ipt.BloodPigment"
                solo
                suffix="g/dL"
                placeholder="請輸入血色素"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>胸部 X 光
            </h3>
            <v-select
                v-model="ipt.Xray"
                :items="[{ text: '1級', value: '1' },{ text: '2級', value: '2' },{ text: '3級', value: '3' },{ text: '4級', value: '4' }]"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>GPT
            </h3>
            <v-text-field
                v-model.trim="ipt.GPTValue"
                solo
                suffix="U/L"
                placeholder="請輸入GPT"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>B 肝抗原
            </h3>
            <v-select
                v-model="ipt.HepatitisB"
                :items="['Positive', 'Negative']"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>尿酸
            </h3>
            <v-text-field
                v-model.trim="ipt.UricAcid"
                solo
                suffix="mg/dL"
                placeholder="請輸入尿酸"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>肌酸酐
            </h3>
            <v-text-field
                v-model.trim="ipt.Creatinine"
                solo
                suffix="mg/dL"
                placeholder="請輸入肌酸酐"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>膽固醇
            </h3>
            <v-text-field
                v-model.trim="ipt.Cholesterol"
                solo
                suffix="mg/dL"
                placeholder="請輸入膽固醇"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>HDL
            </h3>
            <v-text-field
                v-model.trim="ipt.HDLValue"
                solo
                suffix="mg/dL"
                placeholder="請輸入HDL"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>LDL
            </h3>
            <v-text-field
                v-model.trim="ipt.LDLValue"
                solo
                suffix="mg/dL"
                placeholder="請輸入LDL"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>三酸甘油酯
            </h3>
            <v-text-field
                v-model.trim="ipt.Triglyceride"
                solo
                suffix="mg/dL"
                placeholder="請輸入三酸甘油酯"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>飯前血糖
            </h3>
            <v-text-field
                v-model.trim="ipt.BloodSugar"
                solo
                suffix="mg/dL"
                placeholder="請輸入飯前血糖"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>運動心電圖
            </h3>
            <v-text-field
                v-model.trim="ipt.ECGValue"
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
                v-model.trim="ipt.HandleNotice"
            ></v-textarea>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-pen</v-icon>適任性
            </h3>
            <v-radio-group v-model="ipt.Competence" class="mt-0">
                <v-row no-gutters class="white">
                    <v-col cols="12" md="2" class="my-1 pl-2">
                        <v-radio label="合格" color="success" value="T"></v-radio>
                    </v-col>

                    <v-col cols="12" md="2" class="my-1 pl-2">
                        <v-radio label="不合格" color="error" value="F"></v-radio>
                    </v-col>
                </v-row>
            </v-radio-group>
            
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-pen</v-icon>複檢狀況
            </h3>
            <v-textarea
                auto-grow
                solo
                rows="6"
                placeholder="請輸入複檢狀況"
                v-model.trim="ipt.Reinspection"
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
                v-model.trim="ipt.HealthDoctor"
                solo
                placeholder="請輸入醫師姓名"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-tag</v-icon>醫療機構名稱
            </h3>
            <v-text-field
                v-model.trim="ipt.CheckMechName"
                solo
                placeholder="請輸入醫療機構名稱"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-phone-classic</v-icon>醫療機構電話
            </h3>
            <v-text-field
                v-model.trim="ipt.CheckMechPhone"
                solo
                placeholder="請輸入醫療機構電話"
            ></v-text-field>
        </v-col>

        <v-col cols="12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>醫療機構地址
            </h3>
            <v-text-field
                v-model.trim="ipt.CheckMechAddress"
                solo
                placeholder="請輸入醫療機構地址"
            ></v-text-field>
        </v-col>

        <v-col cols="12" class="text-center mb-8">
            <v-btn dark class="mr-3"
              @click="goBack"
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
import { mapState, mapActions } from 'vuex'
import { jobUrineOpts } from '@/assets/js/smisData'
import { getNowFullTime,encodeObject,decodeObject } from '@/assets/js/commonFun'
import { login } from '@/apis/login'
import PeopleSelect from '@/components/PeopleSelect'
import { healthCdList, healthUpdate } from '@/apis/smis/health'
export default {
    props:['id','sid'],
    data: () => ({
      valid: true,  // 表單是否驗證欄位
      isEdit: false,  // 是否為編輯
      pdata: {
        pid: '',
        name: '',  // 姓名
      },
      ipt: {},
      defaultIpt: {
        ID:'',
        Name:'',
        PeopleIDCode: '',  // 身份證號
        HealthLvSex: 'M',
        DepartCode: '', //單位代碼
        Depart: '', //單位名稱
        PeopleBirth: new Date().toISOString().substr(0, 10),  // 生日
        PeopleSex: 'X',  // 性別
        JobName: '3',    //職務
        JobNowName: '',  // 從事作業之名稱
        EmployDate: new Date().toISOString().substr(0, 10),  // 受雇日期
        InspectionType: '1',  // 檢查時期
        HealthCheckDate: new Date().toISOString().substr(0, 10),  // 檢查日期
        PeopleHeight: '',  // 身高(cm)
        PeopleWeight: '',  // 體重(kg)
        BloodShrink: '',  // 血壓收縮壓(mmHg)
        BloodDiastole: '',  // 血壓舒張壓(mmHg)
        Pulse: '',  // 脈搏(次/分鐘)
        Waistline: '',  // 腰圍(cm)
        Sight: '',  // 視力
        Hearing: '',  // 聽力
        UrineProtein: 1,  // 尿蛋白
        UrineBlood: 1,  // 尿潛血
        WhiteBlood: '',  // 白血球數(個/ul)
        BloodPigment: '',  // 血色素(g/dL)
        Xray: '1',  // 胸部 X 光
        GPTValue: '',  // GPT(U/L)
        HepatitisB: 'Positive',  // B 肝抗原
        UricAcid: '',  // 尿酸(mg/dL)
        Creatinine: '',  // 肌酸酐(mg/dL)
        Cholesterol: '',  // 膽固醇(mg/dL)
        HDLValue: '',  // HDL(mg/dL)
        LDLValue: '',  // LDL(mg/dL)
        Triglyceride: '',  // 三酸甘油酯(mg/dL)
        BloodSugar: '',  // 飯前血糖(mg/dL)
        ECGValue: '',  // 運動心電圖
        HandleNotice: '',  // 應處理及注意事項
        HealthDoctor: '',  // 醫師姓名
        CheckMechName: '',  // 醫療機構名稱
        CheckMechAddress: '',  // 醫療機構地址
        CheckMechPhone: '',  // 醫療機構電話
        Competence: 'T',  // 適任性
        Reinspection: '',  // 複檢狀況
        Memo: '',
        HealthChkStatus: '',
        TrackStatus: '',
        HealthResultLevel: '',
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
      orgList: [],
      people: [],
      orgIsLoading: false,
      sex:[
        {from:'1',to:'M'},
        {from:'2',to:'F'},
        {from:'3',to:'X'}
      ]
    }),
    components:{
      PeopleSelect
    },
    watch: {
      // 路由參數變化時，重新向後端取資料
      $route(to, from) {
          // … 
      },
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
        'chViewDialog',  // 檢視內容 dialog
      ]),
      // 初始化資料
      initData() {
        this.ipt = { ...this.defaultIpt }  // 初始化表單
        // -------------- 編輯時(看sid) -------------- 
        if (this.sid != undefined) {
            this.chLoadingShow()
            this.isEdit = true
            this.ipt.ID = this.id
            console.log({
                FlowId: this.sid,
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
                this.ipt = decodeObject(res.data.HealthDataList.find(e=>e.FlowID==this.sid))
            }else{
              sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
              this.$router.push({ path: '/error' })
            }
          }).catch( err => {
            this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
          }).finally(() => {
            this.chLoadingShow()
          })
        } else {
          // -------------- 新增時 --------------
          if(this.id != 0 && this.id != undefined){   //有選定人的新增
           this.ipt.ID = this.id
            this.getPeopleData(this.id)
          }
        }
      },
      getPeopleData(empid){
        if(empid){
          const sendData = {
            ClientReqTime: getNowFullTime(),  // client 端請求時間
            UserId: empid,
            UserPasswd: "",
            BackDoor: 'T',
          }
          login({
            ...sendData
          }).then(res => {
              console.log('people data',res.data)
            if (res.data.ErrorCode == 0) {
              this.ipt.Name = res.data.UserData.UserName
              this.ipt.Depart = res.data.UserData.DeptList[0].DeptId
              this.ipt.DepartName = res.data.UserData.DeptList[0].DeptDesc
              this.ipt.PeopleBirth = res.data.UserData.PeopleBirthday.split(" ")[0].split("/").map(e=>e.length<2?'0'+e:e).join('-')
              this.ipt.PeopleSex = this.sex.find(e=>e.from == res.data.UserData.PeopleSex)?.to || "X"
            //   this.ipt.JobName = res.data.UserData.JobName
            } else {
              sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
              this.$router.push({ path: '/error' })
            }
          }).catch( err => {
            console.warn(err)
            this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
          }).finally(() => {
          })
        }
      },
      // 送出
      save() {
        this.chLoadingShow()
        let sendData = {
          FlowID: (this.isEdit)?this.sid:'',
          Option: (this.isEdit)?'2':'1',
          ...encodeObject(this.ipt),
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id
        }
        console.log(sendData)
        healthUpdate({
          ...sendData
        }).then(res=>{
            console.log(res.data)
          if (res.data.ErrorCode == 0) {
            const msg = '資料' + ((this.isEdit)?'更新':'新增') + '成功'
            this.chMsgbar({ success: true, msg: msg })
          }else{
            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
            this.$router.push({ path: '/error' })
          }
        }).catch( err => {
            console.warn(err)
            const errMsg = '伺服器發生問題，資料' + ((this.isEdit)?'更新':'新增') + '失敗'
          this.chMsgbar({ success: false, msg: errMsg })
        }).finally(() => {
          this.chLoadingShow()
          this.$router.push({ path: `/smis/jobsafety/physical/${this.ipt.ID}/list` })
        })
      },
      goBack() {
        if(this.isEdit){
          this.$router.push({ path: `/smis/jobsafety/physical/${this.id}/show/${this.sid}` })
        }else {
          if(this.id == 0 || this.id == undefined) {
            this.$router.push({ path: `/smis/jobsafety/physical` })
          }else {
            this.$router.push({ path: `/smis/jobsafety/physical/${this.id}/list` })
          }
        }
      },
    },
    created() {
      this.initData()
    }
}
</script>