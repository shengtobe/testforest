<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">
        {{ (this.isEdit)? `個人健檢資料編輯 (日期：${ ipt.physicalDate })` : `個人健檢資料新增`}}
    </h2>
    <v-row>
      <v-col cols="12" sm="3">
        <v-autocomplete
          :items="orgList"
          :filter="aFilter"
          label="輸入人名或單位名稱進行搜尋"
          solo
          clearable
          small-chips
          :loading="orgIsLoading"
          @change="getPeopleData"
          />
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
                v-model.trim="ipt.birthday"
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
                v-model="ipt.sex"
                :items="[{text:'男',value:'1'}, {text:'女',value:'2'}, {text:'其他',value:'3'}]"
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
                readonly
                placeholder="請輸入名稱"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>受雇日期
            </h3>
            <v-text-field
                v-model.trim="ipt.jobStartDate"
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
                <v-icon class="mr-1 mb-1">mdi-format-align-center</v-icon>身高
            </h3>
            <v-text-field
                v-model.trim="ipt.heigh"
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
                v-model.trim="ipt.weight"
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
                v-model.trim="ipt.systolicBlood"
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
                v-model.trim="ipt.diastolicBlood"
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
                v-model.trim="ipt.pulse"
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
                v-model.trim="ipt.waistline"
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
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>白血球數
            </h3>
            <v-text-field
                v-model.trim="ipt.whiteBlood"
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
                v-model.trim="ipt.hemoglobin"
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
                v-model="ipt.chestXray"
                :items="['1級', '2級', '3級', '4級']"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>GPT
            </h3>
            <v-text-field
                v-model.trim="ipt.gpt"
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
                v-model="ipt.BLiver"
                :items="['Positive', 'Negative']"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-database</v-icon>尿酸
            </h3>
            <v-text-field
                v-model.trim="ipt.uricAcid"
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
                v-model.trim="ipt.creatinine"
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
                v-model.trim="ipt.cholesterol"
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
                v-model.trim="ipt.hdl"
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
                v-model.trim="ipt.ldl"
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
                v-model.trim="ipt.triglyceride"
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
                v-model.trim="ipt.bloodSugar"
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
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-pen</v-icon>適任性
            </h3>
            <v-radio-group v-model="ipt.competence" class="mt-0">
                <v-row no-gutters class="white">
                    <v-col cols="12" md="2" class="my-1 pl-2">
                        <v-radio label="合格" color="success" value="y"></v-radio>
                    </v-col>

                    <v-col cols="12" md="2" class="my-1 pl-2">
                        <v-radio label="不合格" color="error" value="n"></v-radio>
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
                v-model.trim="ipt.recheck"
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
import { fetchOrganization } from '@/apis/organization'
import { login } from '@/apis/login'
//:to="`/smis/jobSafety/physical/${this.sid}/show`"
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
            competence: 'y',  // 適任性
            recheck: '',  // 複檢狀況
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
    }),
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        },
    },
    mounted: function() {
        this._getOrg()
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
              this.pdata.pid = this.id

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
                      competence: 'y',  // 適任性
                      recheck: '',  // 複檢狀況
                  }

                  this.setInitDate(obj)
                  this.chLoadingShow()
              }, 1000)
          } else {
              // -------------- 新增時 --------------
              //if (sessionStorage.getItem('pdataItem') !== null) {
              //    let obj = JSON.parse(sessionStorage.getItem('pdataItem'))
                  
                  // this.pdata.pid = obj.id,  // pid
                  // this.pdata.name = '王小明'  // 姓名

              //    sessionStorage.removeItem('pdataItem')  // 清除 sessionStorage
              //} else {
                  // 若無 sessionStorage 則導回搜尋頁
              //    this.$router.push({ path: '/smis/jobsafety/physical' })
              //}
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
          this.ipt.competence = obj.competence // 適任性
          this.ipt.recheck = obj.recheck // 複檢狀況
      },
      _getOrg() { //抓單位
        this.orgIsLoading = true
        fetchOrganization({
          ClientReqTime: getNowFullTime(),  // client 端請求時間
          OperatorID: this.userData.UserId,  // 操作人id
        }).then(res=>{
          if (res.data.ErrorCode == 0) {
            let rtndata = res.data
            const people = rtndata.user_list_group_4.map(element=>{
              let rtnObj = {}
              rtnObj.text = element.UserName
              rtnObj.value = element.UserId
              rtnObj.group = element.DepartName 
              rtnObj.child = ""
              return rtnObj
            })

            this.people = people
            const dept3 = rtndata.user_depart_list_group_3.map(ele => {
              let rtnObj3 = {}
              rtnObj3.header = ele.DepartName
              rtnObj3.text = ele.DepartName
              rtnObj3.group = ele.DepartParentName
              return rtnObj3
            })
            let dept2 = rtndata.user_depart_list_group_2.map(ele => {
              let rtnObj2 = {}
              rtnObj2.header = ele.DepartName
              rtnObj2.text = ele.DepartName
              rtnObj2.group = ele.DepartParentName
              return rtnObj2
            })
            let dept1 = rtndata.user_depart_list_group_1.map(ele => {
              let rtnObj1 = {}
              rtnObj1.header = ele.DepartName
              rtnObj1.text = ele.DepartName
              rtnObj1.group = ele.DepartName
              return rtnObj1
            })
            const that = this
            dept1.forEach(ele => {
              let rtnArrP1 = people.filter(e => {
                return e.group == ele.group
              })
              let rtnArr2 = dept2.filter(element => {
                return element.group == ele.text
              })
              if(rtnArrP1.length > 0 || rtnArr2.length > 0){
                ele.child = rtnArrP1.map(t=>t.text).toString()
                that.orgList.push(ele)
              }
              that.orgList.push(...rtnArrP1)
              rtnArr2.forEach(element => {
                let rtnArrP2 = people.filter(e => {
                  return e.group == element.text
                })
                let rtnArr3 = []
                rtnArr3 = dept3.filter(item => {
                  return item.group == element.text
                })
                if(rtnArrP2.length > 0 || rtnArr3.length > 0){
                  element.child = rtnArrP2.map(t=>t.text).toString()
                  that.orgList.push(element)
                }
                that.orgList.push(...rtnArrP2)
                rtnArr3.forEach(items => {
                  let rtnArrP3 = people.filter(e => {
                    return e.group == items.text
                  })
                  if(rtnArrP3.length > 0){
                    items.child = rtnArrP3.map(t=>t.text).toString()
                    that.orgList.push(items)
                  }
                  that.orgList.push(...rtnArrP3)
                })
              })
            })
          }else{
            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
            this.$router.push({ path: '/error' })
          }
        }).catch( err => {
          this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
        }).finally(() => {
          this.orgIsLoading = false
        })
      },
      aFilter(item, queryText, itemText) { //選人的filter
        const text = (itemText.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1)
        const child = (item.child.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1)
        const group = (item.group.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1)

        return text || group || child
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
              this.ipt.birthday = res.data.UserData.PeopleBirthday.split(" ")[0].split("/").map(e=>e.length<2?'0'+e:e).join('-')
              this.ipt.sex = res.data.UserData.PeopleSex
              this.ipt.workName = res.data.UserData.TypeName
              
            } else {
              sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
              this.$router.push({ path: '/error' })
            }
          }).catch( err => {
            console.error(err)
            this.chMsgbar({ success: false, msg: '伺服器發生問題，資料讀取失敗' })
          }).finally(() => {
          })
        }
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
      goBack() {
        if(this.isEdit){
          this.$router.push({ path: `/smis/jobsafety/physical/${this.id}/list` })
        }else {
          console.log(this.id)
          if(this.id == 0) {
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