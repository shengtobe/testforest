<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">慢行通報{{(isStop == false && isSp == false && status == 1)?'編輯':''}} (編號：{{ id }})</h2>

    <p class="error--text" v-if="isStop">
        <v-icon class="mr-1 mb-1 error--text">mdi-alert-decagram</v-icon>
        此通報已經解除，無法再次編輯
    </p>

    <!-- 上方基本資料 -->
    <v-row class="px-2 mb-12" no-gutters>
        <v-col cols="12" sm="6" style="border-bottom: 1px solid #CFD8DC"
            v-for="item in topData"
            :key="item.title"
        >
            <v-row no-gutters>
                <v-col class="gradual-bg-wood label-header pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">{{ item.title }}</span>
                </v-col>

                <v-col class="light-white-wood pa-3">{{ item.value }}</v-col>
            </v-row>
        </v-col>
    </v-row>

    <v-row class="px-2 label-header">
        <!-- 延長日期 -->
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>延長日期
            </h3>
            <v-menu
                v-model="dateMemuShow"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model.trim="date"
                        solo
                        v-on="on"
                        readonly
                        hide-details
                        :disabled="isStop || status != 1"
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="primary"
                    v-model="date"
                    @input="dateMemuShow = false"
                    locale="zh-tw"
                    :min="ipt.dateEnd"
                ></v-date-picker>
            </v-menu>
        </v-col>
        <v-col class="d-flex align-end mb-2" cols="12" sm="4" md="3" v-if="date != date_brfore">
            <v-btn
            fab
            dark title="復原"
            small 
            color="blue-grey lighten-2"
            @click="dateBack"
            >
            <v-icon dark>
                mdi-replay
            </v-icon>
            </v-btn>
        </v-col>
<!--
        <v-col cols="12" md="6" align-self="end" class="mb-1">
            <v-btn color="success" large
                v-if="!isStop"
                @click="save"
            >確定延長</v-btn>
        </v-col>
-->
        <!-- 收件人 -->
        <v-col cols="12" class="mt-12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>收件同仁
            </h3>
            <PeopleSelectMuti :solo="false" :canEdit="isStop == false && isSp == false && status == 1" :peopleList="recipients" @getPeople="(obj)=>recipients=obj.map(e=>e.UserId)" :key="PeopleComponents"/>
            <!--<v-row>
                <v-col cols="12" sm="4" md="3">
                    <v-select
                        hide-details
                        v-model="choose"
                        :items="dapartOpts"
                        @change="changeDepart"
                        solo
                    ></v-select>
                </v-col>
            </v-row>
            <v-sheet color="white" elevation="2" class="px-2 pb-2 mt-3">
                <v-row no-gutters>
                    <v-col cols="12" class="mt-2">
                        <v-btn
                            class="mr-3"
                            dark
                            color="indigo"
                            @click="joinAll"
                        >加入全部</v-btn>

                        <v-btn
                            dark
                            color="indigo"
                            @click="join"
                        >加入勾選</v-btn>
                    </v-col>

                    <v-col cols="12" sm="3" md="2"
                        v-for="item in checkboxs"
                        :key="item.value"
                    >
                        <v-checkbox
                            v-model="chooseMembers"
                            :label="item.name"
                            color="blue"
                            :value="item.value"
                            hide-details
                        ></v-checkbox>
                    </v-col>
                </v-row>
            </v-sheet>
        </v-col>

        <v-col cols="12">
            <h4 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>收件人
                <v-btn
                    small
                    color="error"
                    @click="delAll"
                    class="mb-1 ml-2"
                >移除全部</v-btn>
            </h4>
            
            <div>
                <v-chip
                    v-for="(item, idx) in recipients"
                    :key="item"
                    class="mr-3 mt-2"
                    label
                    color="yellow lighten-3"
                >
                    {{ transferName(item) }} 
                    <v-icon right
                        @click="delMember(idx)"
                    >mdi-close-circle</v-icon>
                </v-chip>
            </div>-->
        </v-col>
        <v-col class="d-flex align-end mb-2" cols="12" sm="4" md="3" v-if="recipients != recipients_before">
            <v-btn
            fab
            dark title="收件同仁復原"
            small 
            color="blue-grey lighten-2"
            @click="recipientsBack"
            >
            <v-icon dark>
                mdi-replay
            </v-icon>
            </v-btn>
        </v-col>

        <v-col cols="12" class="my-8">
            <v-btn dark class="mr-3 btn-close"
                @click="closeWindow"
            >關閉視窗</v-btn>
            <v-btn dark class="mr-3 btn-add"
                v-if="isStop == false && isSp == false && status == 1"
                @click="update"
            >儲存</v-btn>

            <v-btn dark class="ma-2 btn-modify"
                @click="print"
            >列印</v-btn>
            <v-btn dark class="mr-3 btn-modify"
                v-if="isStop == false && isSp == false && status == 1"
                @click="request"
            >申請審核</v-btn>

            <v-btn dark class="mr-3 btn-delete"
                v-if="isSp && status == 2"
                @click="dialog = true"
            >退回</v-btn>

            <v-btn dark class="mr-3 btn-add"
                v-if="isSp && isSp == true && status == 2"
                @click="allow"
            >同意發布</v-btn>

            
        </v-col>
    </v-row>
    <!-- 退回 dialog -->
    <v-dialog v-model="dialog" max-width="600px"
        v-if="status == 2"
    >
        <v-card class="theme-del-card">
            <v-toolbar dark flat dense class="mb-2 metal-red-top">
                <v-toolbar-title>退回原因</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn fab small text @click="dialog = !dialog" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-textarea
                            hide-details
                            solo
                            rows="8"
                            placeholder="請輸入原因"
                            v-model.trim="backReason"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            
            <v-card-actions class="px-5 pb-5">
                <v-spacer></v-spacer>
                <v-btn class="mr-2 btn-close white--text" elevation="4" :loading="isLoading" @click="dialog = false">取消</v-btn>
                <v-btn class="btn-add white--text"  elevation="4" :loading="isLoading" @click="runReturn">送出</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { locationOpts } from '@/assets/js/smisData'
import { getNowFullTime } from '@/assets/js/commonFun'
//import { dapartOptsForMember } from '@/assets/js/departOption'
import { detail, updateRegul, slowspeedCheck, slowspeedPass, slowspeedReturn, slowspeedexcel } from '@/apis/smis/carSafeInfo'
import PeopleSelectMuti from '@/components/PeopleSelectMuti'

export default {
    props: ['id'],  //路由參數
    data: () => ({
        recipients: [],  // 收件人
        recipients_before: [],  // 收件人
        topData: [],  // 上方基本資料
        date: new Date().toISOString().substr(0, 10),  // 延長日期
        date_brfore: '',
        dateMemuShow: false,  // 日曆是否顯示
        isStop: false,  // 是否解除
        backReason: '',  // 退回原因
        isSp: false, // 登入者是否為主管
        isRequested: false, // 是否已申請
        dialog: false,  // 退回 dialog 是否顯示
        choose: '',  // 所選部門,
        status: 0, // 目前流程步驟
        chooseMembers: [],  // 勾選的收件人
        //dapartOpts: dapartOptsForMember,  // 部門下拉選單
        checkboxs: [],  // 選單
        tableItems: [],  // 表格資料
        ipt: {
            line: '',  // 通報路線
            pointStart: '',  // 速限起點
            pointEnd: '',  // 速限終點
            normal: '',  // 常態速限
            slow: '',  // 慢行速限
            dateStart: new Date().toISOString().substr(0, 10),  // 限制日期(起)
            dateEnd: new Date().toISOString().substr(0, 10),  // 限制日期(迄)         
        },
        members: [  // 所有員工資料
            { name: '趙國強 (K59632)', value: '1'},
            { name: '錢光華 (K12584)', value: '2'},
            { name: '孫文豪 (K69584)', value: '3'},
            { name: '李運深 (K24785)', value: '4'},
            { name: '周寶盛 (K65241)', value: '5'},
            { name: '吳泓吉 (K58963)', value: '6'},
            { name: '鄭家豪 (K24758)', value: '7'},
            { name: '王永慶 (K25896)', value: '8'},
        ],
        topItems: {  // 上面的欄位
            findDate: { icon: 'mdi-calendar-text', title: '發現日期', text: '' },
            findLocation: { icon: 'mdi-map-marker', title: '發現地點', text: '' },
            accidentType: { icon: 'mdi-snowflake', title: '事故類型', text: '' },
            status: { icon: 'mdi-ray-vertex', title: '事故事件狀態', text: '' },
        },
        PeopleComponents: 0
    }),
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        },
    },
    components: {
        PeopleSelectMuti  
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
        dateBack(){
            this.date = this.date_brfore
        },
        recipientsBack(){
            this.recipients = this.recipients_before
            this.PeopleComponents++
        },
        initData() {
          if (this.id != undefined) {
                this.chLoadingShow({show:true})
            
                detail({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                SlowSpeedCode: this.id,  // DB table
                
                QyName: [    // 欲回傳的欄位資料
                    'SlowSpeedCode',
                    'PeopleId',
                    'PeopleName',
                    'LimitStart',
                    'LimitEnd',
                    'NormalLimit',
                    'SlowLimit',
                    'LimitStartDate',
                    'LimitEndDate',  
                    'ReportLine',               
                ],
             }).then(res => {
                //this.tableItems = JSON.parse(res.data.order_list)
                //console.log(this.tableItems)
                this.setShowData(res.data)
             }).catch(err => {
                //console.log(err)
                alert('查詢時發生問題，請重新查詢!')
             }).finally(() => {
                this.chLoadingShow({show:false})
             })
            }
         },
         allow(){
             if (confirm('確定要同意發布嗎?')) {
                this.chLoadingShow({show:true})
                slowspeedPass({
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                    SlowSpeedCode: this.id,  // DB table
                    QyName: [],    // 欲回傳的欄位資料
                 }).then(res => {
                     if(res.data.ErrorCode == 0){
                        this.chMsgbar({ success: true, msg: '發布成功'})
                        this.$router.go()

                     }
                 }).catch(err => {
                    //console.log(err)
                    alert('查詢時發生問題，請重新查詢!')
                 }).finally(() => {
                    this.chLoadingShow({show:false})
                 })
            }
         },
         // 列印
        print() {
            safetyinfoexcel({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                SaftyInfoCode: this.id
            }).then(res => {
                let link = document.createElement('a')
                link.href = `/downloads/${res.data.file_name}`
                link.setAttribute('download', res.data.file_name)
                document.body.appendChild(link)
                link.click()
            }).catch(function (err) {
                alert('匯出失敗')
            })
        },
         request(){
             if(this.date != this.date_brfore){
                 alert('[延長日期]有未儲存的修改')
                 return
             }
             else if(this.recipients != this.recipients_before){
                 alert('[收件同仁]有未儲存的修改')
                 return
             }
             if (confirm('確定要申請審核嗎?')) {
                this.chLoadingShow({show:true})
                slowspeedCheck({
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                    SlowSpeedCode: this.id,  // DB table
                    QyName: [],    // 欲回傳的欄位資料
                 }).then(res => {
                     if(res.data.ErrorCode == 0){
                        this.chMsgbar({ success: true, msg: '已送出申請'})
                        this.$router.go()

                     }
                 }).catch(err => {
                    //console.log(err)
                    alert('查詢時發生問題，請重新查詢!')
                 }).finally(() => {
                    this.chLoadingShow({show:false})
                 })
            }
         },
         // 設定上方資料
         setShowData(obj) {
            this.isSp = obj.InfoSign == this.userData.UserId;
            this.recipients = obj.RecPeople.map(item => item.PeopleId)
            this.recipients_before = this.recipients
            this.ipt.line = obj.ReportLine // 通報路線
            this.ipt.pointStart = obj.LimitStart // 速限起點
            this.ipt.pointEnd = obj.LimitEnd // 速限終點
            this.ipt.normal = obj.NormalLimit // 常態速限
            this.ipt.slow = obj.SlowLimit // 慢行速限
            this.ipt.dateStart = obj.LimitStartDate // 限制日期(起)
            this.ipt.dateEnd = obj.LimitEndDate // 限制日期(迄)  
            this.date = this.date_brfore = obj.LimitEndDate
            this.status = obj.SlowSpeedStatus
            let statusTxt = ''
            switch(this.status){
                case "1":
                    statusTxt = '已立案'
                    break;
                case "2":
                    statusTxt = '審核中'
                    break;
                case "3":
                    statusTxt = '已發布'
                    break;
            }
            this.topData = [
                { title: '通報狀態', value: statusTxt  },
                { title: '路線', value: locationOpts.find(e => e.value == obj.ReportLine).text  },
                { title: '速限起點、終點', value: `${obj.LimitStart} ~ ${obj.LimitEnd} km` },
                { title: '常態速限', value: `${ obj.NormalLimit } km/h` },
                { title: '慢行速限', value: `${ obj.SlowLimit } km/h` },
                { title: '限制日期', value: `${obj.LimitStartDate} ~ ${obj.LimitEndDate}` },
                { title: '通報人', value: obj.PeopleName },
            ]
            this.PeopleComponents ++
        },
        
        runReturn(){
            this.chLoadingShow({ show: true})
                slowspeedReturn({
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                    SlowSpeedCode: this.id,  // DB table
                    Reason: this.backReason //退回原因
                 }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '退回成功' })
                        this.dialog = false
                        setTimeout(() => {
                            this.$router.go()
                        }, 500)
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                 }).catch(err => {
                     //console.log(err)
                     alert('退回時發生問題，請重新執行!')
                 }).finally(() => {
                })
            this.chLoadingShow({ show: false})
        },
        // 儲存
        update() {
            if (confirm('你確定要儲存嗎?')) {
                this.chLoadingShow({show:true})

                let arr = this.recipients.map(item => ({
                PeopleId: item
            }))
                updateRegul({
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                    SlowSpeedCode: this.id, //慢行通報編號
                    ReportLine: this.ipt.line,  //通報路線
                    LimitStart: this.ipt.pointStart,  //速限起點
                    LimitEnd: this.ipt.pointEnd,  //速限終點
                    NormalLimit: this.ipt.normal,  //常態速限
                    SlowLimit: this.ipt.slow,  //慢行速限
                    LimitStartDate: this.ipt.dateStart,  //限制日期(起)
                    LimitEndDate: this.ipt.dateEnd,  //限制日期(迄)
                    DelayDTime: this.date, //延長日期
                    RecPeople: arr,  //收件人         
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '儲存成功'})
                       // this.status = '2'  // 狀態改為已回覆
                       setTimeout(() => {
                            this.$router.go()
                        }, 800)
                    } else {
                        //console.log(res.data.Msg)
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                     this.chMsgbar({ success: false, msg: '儲存成功'})
                }).finally(() => {
                    this.chLoadingShow({show:false})
                })

                // 測試用資料
                // setTimeout(() => {
                //     this.chMsgbar({ success: true, msg: '更新收件人成功'})
                //     this.chLoadingShow({show:true})
                // }, 1000)
            }
        },
    },
    created() {
        this.initData()
    }
}
</script>
<style scoped>
.iconReplay {
  cursor: pointer;
}
</style>