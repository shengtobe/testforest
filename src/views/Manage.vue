<template>
<v-app>
 <div v-on:mousemove.capture="reCalculate" style="min-height:100vh;">
  <SystemDialog />
  <SystemLoading />
  <SystemViewDialog />
  <MessageBar />
  
  <!-- app-bar -->
  <v-app-bar app clipped-left :color="mainColor" dense dark
    id="main-bar"
  >
    <v-app-bar-nav-icon
        @click.stop="showNav = true"
        v-if="!showNav"
    />

    <v-btn icon
        @click.stop="showNav = false"
        v-else
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <v-toolbar-title class="shadowText align-center font-weight-bold">
        <div>
            <!-- <img style="vertical-align: sub;width:1.5rem" src="@/../public/images/ROC_Forestry_Bureau_Seal.svg"/> -->
            <img style="vertical-align: sub;width:1.5rem" src="@/../public/images/newLogo2.png"/>
            林鐵資訊管理系統
        </div>
    </v-toolbar-title>
    
    <v-spacer></v-spacer>

    <!-- 登入者資訊 -->
    <div class="mr-4 d-none d-sm-flex shadowText font-weight-bold">
        {{ `${userData.DeptList[0].DeptDesc} - ${userData.UserName}(${userData.UserId})` }}
    </div>
    

    <v-btn icon @click="logout">
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </v-app-bar>
    <!-- fullscreen nav -->
    <transition>
        <div id="main-nav" v-if="showNav">
        <!-- <div id="main-nav" :class="{ shownav: showNav }"> -->
            <v-container>
                <v-row class="mt-12">
                    <v-col cols="12" md="2">
                        <p class="text-h5 font-weight-black">常用功能</p>

                        <v-card outlined tile>
                            <v-list-item :class="titleColor1" disabled>
                                <strong class="black--text">功能列表</strong>
                            </v-list-item>
                            <v-divider></v-divider>

                            <v-list class="pa-0">
                                <v-list-item @click="showNav = false" to="/">個人資訊</v-list-item>
                                <v-divider></v-divider>
                                <v-list-item @click="showNav = false" to="/form-manage">表單</v-list-item>
                                <v-divider></v-divider>
                                <v-list-item @click="showNav = false" to="/refURL">相關網站</v-list-item>
                                <v-divider></v-divider>

                                <!-- 故障、保養工單 -->
                                <v-list-item :class="titleColor1" disabled>
                                    <strong class="black--text">設備維修及保養工單</strong>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list-item @click="showNav = false" to="/worklist/maintain">維修、養護科工單</v-list-item>
                                <v-divider></v-divider>
                                <v-list-item @click="showNav = false" to="/worklist/serve">車站營運設備維修工單</v-list-item>
                                <v-divider></v-divider>

                                <!-- 監控系統 -->
                                <v-list-item :class="titleColor1" disabled>
                                    <strong class="black--text">監控系統</strong>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list-item @click="showNav = false" to="/monitor/slope-monitor">邊坡監控</v-list-item>
                                <v-divider></v-divider>
                                <v-list-item @click="showNav = false" to="/monitor/rainfall-monitor">雨量監測</v-list-item>
                                <v-divider></v-divider>

                                <!-- 管理系統 -->
                                <v-list-item :class="titleColor1" disabled>
                                    <strong class="black--text">管理系統</strong>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list-item :disabled="(FShow('SMS_33'))" @click="showNav = false" to="/access">功能清單權限管理</v-list-item>
                                <v-divider></v-divider>
                                <v-list-item :disabled="(FShow('SMS_33'))" @click="showNav = false" to="/access/userManage">人員權限管理</v-list-item>
                                <v-divider></v-divider>
                            </v-list>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="2">
                        <p class="text-h5 font-weight-black">安全資訊管理</p>

                        <v-card outlined tile>
                            <v-list class="pa-0">
                                <!-- 危害通報管理 -->
                                <v-list-item :class="titleColor2" disabled>
                                    <strong class="black--text">危害通報管理</strong>
                                </v-list-item>
                                <v-divider />
                                <v-list-item  :disabled="FShow('SMS_1')" @click="showNav = false" to="/smis/harmnotify/notify">新增危害通報</v-list-item>
                                <v-divider />
                                <v-list-item :disabled="FShow('SMS_2')" @click="showNav = false" to="/smis/harmnotify/audit">管理危害通報</v-list-item>
                                <v-divider />

                                <!-- 行車事故事件 -->
                                <v-list-item :class="titleColor2">
                                    <strong class="black--text">行車事故事件</strong>
                                </v-list-item>
                                <v-divider />
                                <v-list-item :disabled="FShow('SMS_3')" @click="showNav = false" to="/smis/car-accident-event">行車事故事件</v-list-item>
                                <v-divider />

                                <!-- 行車危害資料庫 -->
                                <v-list-item :class="titleColor2" disabled>
                                    <strong class="black--text">行車危害資料庫</strong>
                                </v-list-item>
                                <v-divider />
                                <v-list-item :disabled="(FShow('SMS_7'))" @click="showNav = false" to="/smis/car-harmdb/harms">行車危害</v-list-item>
                                <v-divider />
                                <v-list-item :disabled="FShow('SMS_8')" @click="showNav = false" to="/smis/car-harmdb/control-measures">控制措施</v-list-item>
                                <v-divider />
                            </v-list>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="2">
                        <v-card outlined tile class="mt-sm-12">
                            <v-list class="pa-0">
                                <!-- 行車安全資訊 -->
                                <v-list-item :class="titleColor2" disabled>
                                    <strong class="black--text">行車安全資訊</strong>
                                </v-list-item>
                                <v-divider />
                                <v-list-item :disabled="FShow('SMS_10')" @click="showNav = false" to="/smis/car-safeinfo/info-add">新增安全資訊</v-list-item>
                                <v-divider />
                                <v-list-item :disabled="FShow('SMS_10')" @click="showNav = false" to="/smis/car-safeinfo/info">管理安全資訊</v-list-item>
                                <v-divider />
                                <v-list-item :disabled="FShow('SMS_14')" @click="showNav = false" to="/smis/car-safeinfo/crawl-notify-add">新增慢行通報</v-list-item>
                                <v-divider />
                                <v-list-item :disabled="FShow('SMS_14')" @click="showNav = false" to="/smis/car-safeinfo/crawl-notify">管理慢行通報</v-list-item>
                                <v-divider />

                                <!-- 安全文件 -->
                                <v-list-item :class="titleColor2" disabled>
                                    <strong class="black--text">安全文件</strong>
                                </v-list-item>
                                <v-divider />
                                <v-list-item :disabled="FShow('SMS_15')" @click="showNav = false" to="/smis/safefile/meeting">安全會議文件</v-list-item>
                                <v-divider />
                                <v-list-item :disabled="FShow('SMS_18')" @click="showNav = false" to="/smis/safefile/driving-annex">行車事故事件附件</v-list-item>
                                <v-divider />
                                <v-list-item :disabled="FShow('SMS_16')" @click="showNav = false" to="/smis/safefile/regulations">規章文件</v-list-item>
                                <v-divider />

                                <!-- 行車安全績效 -->
                                <v-list-item :class="titleColor2" disabled>
                                    <strong class="black--text">行車安全績效</strong>
                                </v-list-item>
                                <v-divider />
                                <v-list-item :disabled="FShow('SMS_19')" @click="showNav = false" to="/smis/car-safe-performance">表單填報</v-list-item>
                                <v-divider />
                                <v-list-item :disabled="FShow('SMS_19')" @click="showNav = false" to="/smis/car-safe-performance-analysis">統計趨勢圖</v-list-item>
                                <v-divider />
                            </v-list>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="2">
                        <v-card outlined tile class="mt-sm-12">
                            <v-list class="pa-0">
                                <!-- 職安管理 -->
                                <v-list-item :class="titleColor2_3" disabled>
                                    <strong class="black--text">職安管理</strong>
                                </v-list-item>
                                <v-divider />
                                <!-- <v-list-item :disabled="FShow('SMS_24')" @click="showNav = false" to="/smis/jobsafety/disaster-survey-add">職業災害事故調查表</v-list-item> -->
                                <v-list-item @click="showNav = false" to="/smis/jobsafety/disaster-survey-add">職業災害事故調查表</v-list-item>
                                <v-divider />
                                <v-list-item @click="showNav = false" to="/smis/jobsafety/disaster-survey">職災事故事件管理</v-list-item>
                                <v-divider />
                                <v-list-item :disabled="FShow('SMS_25')" @click="showNav = false" to="/smis/jobsafety/disasterdb">職災危害資料庫</v-list-item>
                                <v-divider />
                                <v-list-item :disabled="FShow('SMS_26')" @click="showNav = false" to="/smis/jobsafety/performance">職安績效</v-list-item>
                                <v-divider />
                                <v-list-item :disabled="FShow('SMS_27')" @click="showNav = false" to="/smis/jobsafety/physical">健檢管理</v-list-item>
                                <v-divider />
                                <v-list-item :disabled="FShow('SMS_31')" @click="showNav = false" to="/smis/jobsafety/license">證照管理</v-list-item>
                            </v-list>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="2">
                        <p class="text-h5 font-weight-black">設備養護管理</p>

                        <v-card outlined tile>
                            <v-list class="pa-0">
                                <!-- 設備資料管理 -->
                                <v-list-item :class="titleColor3" disabled>
                                    <strong class="black--text">設備資料管理</strong>
                                </v-list-item>
                                <v-divider />
                                <v-list-item @click="showNav = false" to="/mmis/train-track-lane">列車、軌道、車道設備</v-list-item>
                                <v-divider />
                                <v-list-item @click="showNav = false" to="/mmis/radio">無線電設備管理</v-list-item>
                                <v-divider />
                                <v-list-item @click="showNav = false" to="/mmis/material">料件管理</v-list-item>
                                <v-divider />

                                <!-- 設備維修管理 -->
                                <v-list-item :class="titleColor3" disabled>
                                    <strong class="black--text">設備維修管理</strong>
                                </v-list-item>
                                <v-divider />
                                <v-list-item @click="showNav = false" to="/mmis/periodicity-job">週期性工作提醒</v-list-item>
                                <v-divider />
                                <v-list-item @click="showNav = false" to="/mmis/work-shift">工班管理</v-list-item>
                                <v-divider />

                                <!-- 維修外包管理 -->
                                <v-list-item :class="titleColor3" disabled>
                                    <strong class="black--text">維修外包管理</strong>
                                </v-list-item>
                                <v-divider />
                                <v-list-item @click="showNav = false" to="/mmis/outsourc-data">維修外包管理</v-list-item>
                            </v-list>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="2">
                        <v-card outlined tile class="mt-sm-12">
                            <v-list class="pa-0">
                                <!-- 統計分析 -->
                                <v-list-item :class="titleColor3" disabled>
                                    <strong class="black--text">統計分析</strong>
                                </v-list-item>
                                <v-divider />
                                <v-list-item @click="showNav = false" to="/mmis/analy/mttr">MTTR 平均修復時間</v-list-item>
                                <v-divider />
                                <v-list-item @click="showNav = false" to="/mmis/analy/mtbf">MTBF 平均故障間隔時間</v-list-item>
                                <v-divider />
                                <v-list-item @click="showNav = false" to="/mmis/analy/mkbf">MKBF 系統營運可靠度</v-list-item>
                                <v-divider />

                                <!-- 報表管理 -->
                                <v-list-item :class="titleColor3" disabled>
                                    <strong class="black--text">報表管理</strong>
                                </v-list-item>
                                <v-divider />
                                <v-list-item @click="showNav = false" to="/mmis/repair-time-history">維修工時履歷</v-list-item>
                                <v-divider />
                                <v-list-item @click="showNav = false" to="/mmis/material-history">料件履歷</v-list-item>
                                <v-divider />
                                <v-list-item @click="showNav = false" to="/mmis/repair-cost">維修費用</v-list-item>
                                <v-divider />
                                <!-- 報表管理 -->
                                <!-- <v-list-item :class="titleColor3" disabled>
                                    <strong class="black--text">測試區域</strong>
                                </v-list-item>
                                <v-divider />
                                <v-list-item @click="showNav = false" to="/text-theme">測試顯示區域</v-list-item> -->
                            </v-list>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </transition>

  <!-- main content -->
  <v-main>
    <router-view></router-view>
  </v-main>

  <!-- 雨量/邊坡 監測警告通知 -->
  <v-overlay
    absolute
    :value="wsShow.overlay"
    z-index="65535"
  >
    <v-snackbar
        :timeout="-1"
        :value="true"
        color="red"
        absolute
        centered
    >
        <h2>
            <v-icon dark @click="wsShow.overlay=false">mdi-close</v-icon>
            {{ wsShow.title }}
        </h2>
        <span>
            {{ wsShow.memo }}
        </span>
    </v-snackbar>
  </v-overlay>
 </div>
</v-app>
</template>
<style>
.container{
    background: linear-gradient(to bottom right ,rgba(245,245,245,0.8),rgba(245,245,245,0.5));
    border-radius: 0rem 0rem 1rem 1rem;
}
</style>
<style scoped>
.top-nav{
    background: linear-gradient(to top, #3a2514 0%, #2b1400 25%, #382414 100%);
    /*background: linear-gradient(to top, #f89e3660, #f89e368e),linear-gradient(to top, #d7d7d7 0%, #747474 45%, #d7d7d7 55%, #fff 100%);*/

}
>>>.shadowText{
    text-shadow: black 0rem 0rem 0.4rem;
  }
</style>
<script>
import { mapState, mapActions } from 'vuex'
import aesjs from 'aes-js'
import SystemDialog from '@/components/SystemDialog.vue'
import SystemLoading from '@/components/SystemLoading.vue'
import SystemViewDialog from '@/components/SystemViewDialog.vue'
import MessageBar from '@/components/MessageBar.vue'
var OtimeOut;
export default {
    data: () => ({
        // mainColor: 'light-blue darken-1',
        funcShow: [],
        role: null,
        mainColor: 'top-nav',
        showNav: false,  // 導覽列是否顯示
        titleColor1: 'blue lighten-4',
        titleColor2: 'amber lighten-4',
        titleColor2_3: 'light-green accent-1',
        titleColor3: 'red lighten-4',
        ws: null,
        wsShow: {
            overlay: false,
            title: '',
            memo: '',
        },
        // OtimeOut: null,
    }),
    computed: {
        ...mapState ('user', {
            key: state => state.key,  // 加密金鑰
            userData: state => state.userData,  // 使用者基本資料
            groupData: state => state.groupData,  // 使用者基本資料
            userFunc: state => state.funcIdList,  // 
        }),
        FuncShow(){
            
        }
    },
    components: {
        SystemDialog,  // 系統重要訊息 Dialog
        SystemLoading,  // 系統 Loading 圖
        SystemViewDialog,  // 系統檢視內容 Dialog
        MessageBar,  // 題示訊息
    },
    methods: {
        ...mapActions('user', [
            'saveUserProfile',  // 儲存使用者基本資料
            'saveUserGroup',  // 儲存使用者權限(群組)資料
            'saveFuncIdList',  // 
        ]),
        FShow(FID){ // 是否有這個訪問權限
            // return (this.userFunc.find(item => item == FID) == null)
            return (!this.userFunc.find(item => item == FID))
        },
        // 登出
        logout() {
            localStorage.clear()  // 清除所有 localstorage
            this.$router.push('/login')
        },
        // 解密
        decode(str, key) {
            // 16 進位轉回位元組
            let encryptedBytes = aesjs.utils.hex.toBytes(str)

            // 建立另一個 Counter 實體
            let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5))
            let decryptedBytes = aesCtr.decrypt(encryptedBytes)

            // 將位元組轉回原始字串
            return aesjs.utils.utf8.fromBytes(decryptedBytes)
        },
        // 檢查 localStorage
        checkLocalStorage() {
            // 檢查是否有 jwt、使用者資訊、權限資訊
            if (
                localStorage.getItem('jwt') == null ||
                localStorage.getItem('userData') == null ||
                localStorage.getItem('groupData') == null
            ) {
                this.logout()
                return
            }

            try 
            {
                // 儲存使用者資訊
                let UData = JSON.parse(this.decode(localStorage.getItem('userData'), this.key))
                this.funcShow = UData.FunctionsAuthorData; // DeptList
                this.saveUserProfile(UData)
                
                // 儲存權限資訊
                this.saveUserGroup(JSON.parse(this.decode(localStorage.getItem('groupData'), this.key)))
                //
                this.saveFuncIdList(UData.FunctionsAuthorData)
                //建立全域警告
                this.createWSC()
                //建立無動作登出計時
                this.reCalculate()
                // 使用者權限
                this.role = JSON.parse(this.decode(localStorage.getItem('groupData'), this.key))
            } 
            catch (e) 
            {
                //console.log(e);
            }
        },
        //全域警告
        createWSC() {
            let wsc = this.ws
            const that = this
            let obj = {}
            let wsIP = ''
            try {
                wsIP = `${process.env.VUE_APP_WS_HOST}:${process.env.VUE_APP_WS_PORT}/global/inner/alarmmsg`
                wsc = new WebSocket(wsIP)
                wsc.onopen = function () {
                }
                wsc.onclose = function (e) {
                }
                wsc.onmessage = function (e) {
                    var data = JSON.parse(e.data)
                    const aType = [
                        {
                            value: '1',
                            text: '雨量通知'
                        },
                        {
                            value: '2',
                            text: '邊坡通知'
                        },
                    ]
                    if(data.Type=='1'||(data.Type=='2'&&data.IDArray.findIndex(e=>e==that.userData.UserId)>-1)){
                        that.wsShow = {
                            overlay: true,
                            title: aType.find(e=>e.value==data.AlarmType).text,
                            memo: data.Msg,
                        }
                    }
                }
                this.ws = wsc
            } catch(err) {
                //console.log(err)
            }
        },
        //無動作登出
        whenTimnmeout() {
            this.logout()
        },
        reCalculate() {
            const that = this
            clearTimeout(OtimeOut)
            OtimeOut = setTimeout(()=>{that.whenTimnmeout()}, 90 * 60 * 1000)
        }
    },
    created() {
        
        // store.state.user.groupData
        // ------------ 已寫好的登入功能，先備註掉 -------------
        // if(!this.groupData){
        //     this.checkLocalStorage()
        // }
        this.checkLocalStorage()
    },
    beforeDestroy() {
        this.ws.close()
    }
}
</script>