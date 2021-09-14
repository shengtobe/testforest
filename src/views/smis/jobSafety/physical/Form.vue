<template>
<v-container style="max-width: 1200px" class="label-header">
    <h2 class="label-title mb-4">
        {{ (this.isEdit)? `個人健檢資料編輯 (日期：${ ipt.HealthCheckDate })` : `個人健檢資料新增`}}
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
                :items="[{text:'男性',value:'M'}, {text:'女性',value:'F'}, {text:'無',value:'X'}]"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-human-male-female</v-icon>健檢分級性別
            </h3>
            <v-select
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
                :items="[{ text:'駕駛(60歲以上)', value:'2' }, 
                { text:'駕駛(未滿60歲)', value:'3' }, 
                { text:'行車人員(非駕駛)', value:'4' },
                { text:'一般人員(非行車人員)', value:'5' }]"
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
                readonly
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
                    color="primary"
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
                v-model="ipt.PeopleHeight"
                solo maxlength="3"
                placeholder="請輸入身高"
                suffix="cm"
            />
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-speedometer</v-icon>體重
            </h3>
            <v-text-field
                v-model="ipt.PeopleWeight"
                solo maxlength="3"
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
                solo maxlength="3"
                type="number"
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
                solo maxlength="3"
                type="number"
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
                solo maxlength="3"
                type="number"
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
                solo maxlength="3"
                type="number"
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
                solo maxlength="3"
                placeholder="請輸入視力"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>聽力
            </h3>
            <v-text-field
                v-model.trim="ipt.Hearing"
                solo maxlength="3"
                suffix="dB"
                type="number"
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
                solo maxlength="4"
                suffix="10³/ul"
                placeholder="請輸入白血球數"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>血色素
            </h3>
            <v-text-field
                v-model.trim="ipt.BloodPigment"
                solo maxlength="6"
                type="number"
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
                solo maxlength="4"
                type="number"
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
                solo maxlength="3"
                type="number"
                suffix="mg/dL"
                placeholder="請輸入尿酸"
            ></v-text-field>
        </v-col>

        

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>HDL
            </h3>
            <v-text-field
            color="red"
                v-model.trim="ipt.HDLValue"
                solo maxlength="3"
                type="number"
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
                solo maxlength="3"
                type="number"
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
                solo maxlength="3"
                type="number"
                suffix="mg/dL"
                placeholder="請輸入三酸甘油酯"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>總膽固醇
            </h3>
            <!-- :v-model="ipt.Cholesterol" -->
            <!-- placeholder="請輸入膽固醇" -->
            <v-text-field 
                v-model="ipt.Cholesterol"
                solo maxlength="3" readonly
                suffix="mg/dL"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>肌酸酐
            </h3>
            <v-text-field
                v-model.trim="ipt.Creatinine"
                solo maxlength="4"
                suffix="mg/dL"
                type="number"
                placeholder="請輸入肌酸酐"
            ></v-text-field>
        </v-col>

        

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>飯前血糖
            </h3>
            <v-text-field
                v-model.trim="ipt.BloodSugar"
                solo maxlength="4"
                suffix="mg/dL"
                type="number"
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
            <v-btn dark class="btn-close mr-3"
              @click="goBack"
            >回上層</v-btn>
            
            <v-btn
                dark
                class="btn-add"
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
import { canInUpdate } from '@/apis/access'
import { getNowFullTime,encodeObject,decodeObject } from '@/assets/js/commonFun'
import { login } from '@/apis/login'
import PeopleSelect from '@/components/PeopleSelect'
import { healthCdList, healthUpdate } from '@/apis/smis/health'
export default {
    props:['id','sid'],
    data: () => ({
      valid: true,  // 表單是否驗證欄位
      isShowBtn: false,
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
        PeopleHeight: '0',  // 身高(cm)
        PeopleWeight: '0',  // 體重(kg)
        BloodShrink: '0',  // 血壓收縮壓(mmHg)
        BloodDiastole: '0',  // 血壓舒張壓(mmHg)
        Pulse: '0',  // 脈搏(次/分鐘)
        Waistline: '0',  // 腰圍(cm)
        Sight: '0',  // 視力
        Hearing: '0',  // 聽力
        UrineProtein: '1',  // 尿蛋白
        UrineBlood: '1',  // 尿潛血
        WhiteBlood: '0',  // 白血球數(個/ul)
        BloodPigment: '0',  // 血色素(g/dL)
        Xray: '1',  // 胸部 X 光
        GPTValue: '0',  // GPT(U/L)
        HepatitisB: 'Positive',  // B 肝抗原
        UricAcid: '0',  // 尿酸(mg/dL)
        Creatinine: '0',  // 肌酸酐(mg/dL)
        Cholesterol: '0',  // 膽固醇(mg/dL)
        HDLValue: '0',  // HDL(mg/dL)
        LDLValue: '0',  // LDL(mg/dL)
        Triglyceride: '0',  // 三酸甘油酯(mg/dL)
        BloodSugar: '0',  // 飯前血糖(mg/dL)
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
        //檢查校正身高數值
        "ipt.PeopleHeight": function(newValue,oldValue){
            let heightBool = /^\d{1,3}$/.test(newValue)
            if(heightBool) {
            //    this.ipt.PeopleHeight = newValue
            } else {
                this.$nextTick(() => {
                    this.ipt.PeopleHeight = oldValue
                })
            }
        },
        //檢查校正體重數值
        "ipt.PeopleWeight": function(newValue,oldValue){
            if(/^\d{1,3}$/.test(newValue)) {
            } else {
                this.$nextTick(() => {
                    this.ipt.PeopleWeight = oldValue
                })
            }
        },
        //檢查校正血壓收縮壓
        "ipt.BloodShrink": function(newValue,oldValue){
            if(/^\d{1,3}$/.test(newValue)) {
            } else {
                this.$nextTick(() => {
                    this.ipt.BloodShrink = oldValue
                })
            }
        },
        //檢查校正血壓舒張壓
        "ipt.BloodDiastole": function(newValue,oldValue){
            if(/^\d{1,3}$/.test(newValue)) {
            } else {
                this.$nextTick(() => {
                    this.ipt.BloodDiastole = oldValue
                })
            }
        },
        //檢查校正 脈搏
        "ipt.Pulse": function(newValue,oldValue){
            if(/^\d{1,3}$/.test(newValue)) {
            } else {
                this.$nextTick(() => {
                    this.ipt.Pulse = oldValue
                })
            }
        },
        //檢查校正 腰圍
        "ipt.Waistline": function(newValue,oldValue){
            if(/^\d{1,3}$/.test(newValue)) {
            } else {
                this.$nextTick(() => {
                    this.ipt.Waistline = oldValue
                })
            }
        },
        //檢查校正 視力
        // "ipt.Sight": function(newValue,oldValue){
        //     if(/^[0-9][.][0-9]$/.test(newValue) || newValue == '') {
        //     } else {
        //         this.$nextTick(() => {
        //             this.ipt.Sight = oldValue
        //         })
        //     }
        // },
        //檢查校正 聽力
        "ipt.Hearing": function(newValue,oldValue){
            if(/^\d{1,3}$/.test(newValue)) {
            } else {
                this.$nextTick(() => {
                    this.ipt.Hearing = oldValue
                })
            }
        },
        //檢查校正 尿蛋白 小於30 mg/dL是正常值，30～300是輕度蛋白尿，超過300則是較嚴重
        "ipt.UrineProtein": function(newValue,oldValue){
            if(/^\d{1,3}$/.test(newValue)) {
            } else {
                this.$nextTick(() => {
                    this.ipt.UrineProtein = oldValue
                })
            }
        },
        //檢查校正 XXXXXXXX 正常值為<20
        "ipt.UrineBlood": function(newValue,oldValue){
            if(/^\d{1,3}$/.test(newValue)) {
            } else {
                this.$nextTick(() => {
                    this.ipt.UrineBlood = oldValue
                })
            }
        },
        //檢查校正 XXXXXXXX 4000～10000/ul
        // "ipt.WhiteBlood": function(newValue,oldValue){
        //     if(/^\d{1,5}$/.test(newValue)) {
        //     } else {
        //         this.$nextTick(() => {
        //             this.ipt.WhiteBlood = oldValue
        //         })
        //     }
        // },
        //檢查校正 XXXXXXXX 13.0~18.0 gm/dl
        "ipt.BloodPigment": function(newValue,oldValue){
            if(/^\d{1,4}$/.test(newValue)) {
            } else {
                this.$nextTick(() => {
                    this.ipt.BloodPigment = oldValue
                })
            }
        },//檢查校正 XXXXXXXX 40U/L
        "ipt.GPTValue": function(newValue,oldValue){
            if(/^\d{1,3}$/.test(newValue)) {
            } else {
                this.$nextTick(() => {
                    this.ipt.GPTValue = oldValue
                })
            }
        },
        // //檢查校正 XXXXXXXX
        // "ipt.HepatitisB": function(newValue,oldValue){
        //     if(/^\d{1,3}$/.test(newValue)) {
        //     } else {
        //         this.$nextTick(() => {
        //             this.ipt.HepatitisB = oldValue
        //         })
        //     }
        // },
        // //檢查校正 XXXXXXXX
        "ipt.UricAcid": function(newValue,oldValue){
            if(/^\d{1,3}$/.test(newValue)) {
            } else {
                this.$nextTick(() => {
                    this.ipt.UricAcid = oldValue
                })
            }
        },
        // //檢查校正 XXXXXXXX
        "ipt.Creatinine": function(newValue,oldValue){
            if(/^\d{1,3}$/.test(newValue)) {
            } else {
                this.$nextTick(() => {
                    this.ipt.Creatinine = oldValue
                })
            }
        },
        //檢查校正 XXXXXXXX
        "ipt.BloodSugar": function(newValue,oldValue){
            if(/^\d{1,3}$/.test(newValue)) {
            } else {
                this.$nextTick(() => {
                    this.ipt.BloodSugar = oldValue
                })
            }
        },
        //檢查校正 XXXXXXXX
        "ipt.XXXXXXXX": function(newValue,oldValue){
            if(/^\d{1,3}$/.test(newValue)) {
            } else {
                this.$nextTick(() => {
                    this.ipt.XXXXXXXX = oldValue
                })
            }
        },
        //檢查校正 XXXXXXXX
        "ipt.XXXXXXXX": function(newValue,oldValue){
            if(/^\d{1,3}$/.test(newValue)) {
            } else {
                this.$nextTick(() => {
                    this.ipt.XXXXXXXX = oldValue
                })
            }
        },
        "ipt.Triglyceride": function(newValue,oldValue){
            if(/^\d{1,3}$/.test(newValue)) {
            } else {
                this.$nextTick(() => {
                    this.ipt.Triglyceride = oldValue
                })
            }
            if(this.ipt.LDLValue != '' && this.ipt.HDLValue != '' && this.ipt.Triglyceride != ''){
                this.ipt.Cholesterol = +this.ipt.LDLValue + +this.ipt.HDLValue + +(this.ipt.Triglyceride/5)
            }
        },
        "ipt.LDLValue": function(newValue,oldValue){
            if(/^\d{1,3}$/.test(newValue)) {
            } else {
                this.$nextTick(() => {
                    this.ipt.LDLValue = oldValue
                })
            }
            if(this.ipt.LDLValue != '' && this.ipt.HDLValue != '' && this.ipt.Triglyceride != ''){
                this.ipt.Cholesterol = +this.ipt.LDLValue + +this.ipt.HDLValue + +(this.ipt.Triglyceride/5)
            }
        },
        "ipt.HDLValue": function(newValue,oldValue){
            if(/^\d{1,3}$/.test(newValue)) {
            } else {
                this.$nextTick(() => {
                    this.ipt.HDLValue = oldValue
                })
            }
            if(this.ipt.LDLValue != '' && this.ipt.HDLValue != '' && this.ipt.Triglyceride != ''){
                this.ipt.Cholesterol = +this.ipt.LDLValue + +this.ipt.HDLValue + +(this.ipt.Triglyceride/5)
            }
        },
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
        'chViewDialog',  // 檢視內容 dialog
      ]),
      ...mapActions('user', [
        'saveUserGroup',  // 儲存使用者權限(群組)資料
      ]),
      // 初始化資料
      initData() {
        this.ipt = { ...this.defaultIpt }  // 初始化表單
        // -------------- 編輯時(看sid) -------------- 
        if (this.sid != undefined) {
            this.chLoadingShow({show:true})
            this.isEdit = true
            this.ipt.ID = this.id
            healthCdList({
                ID: this.id,
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res=>{
            if (res.data.ErrorCode == 0) {
                this.ipt = decodeObject(res.data.HealthDataList.find(e=>e.FlowID==this.sid))
            }else{
              sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
              this.$router.push({ path: '/error' })
            }
          }).catch( err => {
            this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
          }).finally(() => {
            this.chLoadingShow({show:false})
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
          if(this.ipt.ID == ''){
              alert("尚未輸入人名/員工編號或單位名稱")
              return;
          }
          
        this.chLoadingShow({show:true})
        let sendData = {
          FlowID: (this.isEdit)?this.sid:'',
          Option: (this.isEdit)?'2':'1',
          ...encodeObject(this.ipt),
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id
        }
        healthUpdate({
          ...sendData
        }).then(res=>{
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
          this.chLoadingShow({show:false})
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
        canInUpdate({
            ClientReqTime: getNowFullTime(),  // client 端請求時間
            OperatorID: this.userData.UserId,  // 操作人id
        }).then(res => {
            if (res.data.ErrorCode == 0) {
                this.saveUserGroup(res.data.GroupData)
                this.isShowBtn = this.groupData.RoleLv3 == "T"

                if(this.isShowBtn)
                    this.initData()
                else{
                    alert("無權限做此操作")
                    this.$router.push('/')
                }
            }
        }).catch( err => {
            console.log(err)
        }).finally(() => {
        })
        // this.initData()
    }
}
</script>