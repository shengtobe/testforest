<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title" @click="ccc">慢行通報新增</h2>

    <v-row class="px-2 label-header">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-mark</v-icon>通報路線
            </h3>
            <v-select
                v-model="ipt.line"
                :items="lineList"
                solo
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-gauge</v-icon>速限起點
            </h3>
            <v-row>
                <v-col class="py-0">
                    <v-text-field
                        v-model.trim="ipt.pointStartK" type="number" step=1
                        solo suffix="K"
                    ></v-text-field>
                </v-col>
                <v-col class="py-0">
                    <v-text-field
                        v-model.trim="ipt.pointStartM" type="number" step=1 max="999"
                        solo suffix="M"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-gauge</v-icon>速限終點
            </h3>
            <v-row>
                <v-col class="py-0">
                    <v-text-field
                        v-model.trim="ipt.pointEndK" type="number" step=1
                        solo suffix="K"
                    ></v-text-field>
                </v-col>
                <v-col class="py-0">
                    <v-text-field
                        v-model.trim="ipt.pointEndM" type="number" step=1 max="999"
                        solo suffix="M"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-gauge</v-icon>常態速限
                <v-btn small dark class="mb-1 ml-2 btn-delete"
                    @click="dialogShow = true"
                >速限表</v-btn>
            </h3>
            <v-select
                v-model="ipt.normal"
                :items="['18', '20', '22', '25', '28', '30', '40', '45']"
                solo suffix="km/h"
            ></v-select>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-gauge</v-icon>慢行速限 (預設值：12 km/h)
            </h3>
            <v-text-field
                v-model.trim="ipt.slow" type="number"
                solo suffix="km/h"
            ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>限制日期(起)
            </h3>
            <v-menu
                v-model="dateMenuShow.start"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model.trim="ipt.dateStart"
                        solo
                        v-on="on"
                        readonly clearable @click:clear="timeClean(1)"
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="purple"
                    v-model="ipt.dateStart"
                    @input="time(1)"
                    :max="dateAMax"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>限制日期(迄)
            </h3>
            <v-menu
                v-model="dateMenuShow.end"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="290px"
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model.trim="ipt.dateEnd"
                        solo
                        v-on="on"
                        readonly clearable @click:clear="timeClean(2)"
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="purple"
                    v-model="ipt.dateEnd"
                    @input="time(2)"
                    :min="dateBMin"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <!-- 收件人 -->
        <v-col cols="12" class="mt-12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>收件人
                <span class="red--text">*</span>
            </h3>
            <PeopleSelectMuti :solo="false" :canEdit="true" :peopleList="ipt.recipients" @getPeople="(obj)=>ipt.recipients=obj.map(e=>e.UserId)"/>
            <!-- <v-row>
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
                <v-icon class="mr-1 mb-2">mdi-lightbulb-on</v-icon>已加入的收件人：
                <v-btn
                    small
                    color="error"
                    @click="delAll"
                    class="mb-1"
                >移除全部</v-btn>
            </h4>
            
            <div>
                <v-chip
                    v-for="(item, idx) in ipt.recipients"
                    :key="item"
                    class="mr-3 mt-2"
                    label
                    color="teal"
                    dark
                >
                    {{ transferName(item) }} 
                    <v-icon right
                        @click="delMember(idx)"
                    >mdi-close-circle</v-icon>
                </v-chip>
            </div> -->
        </v-col>

        <v-col cols="12" class="text-center my-8">
            <v-btn dark class="mr-4 btn-close"
                to="/smis/car-safeinfo/crawl-notify"
            >回管理頁</v-btn>
            
            <v-btn
                class="btn-add white--text" v-if="saveBtnShow"
                @click="save"
            >送出</v-btn>
        </v-col>
    </v-row>

    <!-- 常態速限表 -->
    <v-dialog v-model="dialogShow" max-width="450px">
        <v-card class="theme-del-card">
            <v-toolbar flat dense dark class="metal-red-top">
                <v-icon class="mr-2">mdi-gauge</v-icon>
                <v-toolbar-title>常態速限表</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn fab small text @click="dialogShow = false" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-data-table
                :headers="headers"
                :items="tableItems"
                disable-sort
                disable-filtering
                hide-default-footer
                class="theme-table"
            ></v-data-table>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { locationOpts } from '@/assets/js/smisData'
import { getNowFullTime } from '@/assets/js/commonFun'
import { dapartOptsForMember } from '@/assets/js/departOption'
import { CreateCarSafelnfo } from '@/apis/smis/carSafeInfo'
import PeopleSelectMuti from '@/components/PeopleSelectMuti'
export default {
    data: () => ({
        valid: true,  // 表單是否驗證欄位
        saveBtnShow: true, // 送出按鈕隱藏
        lineList: locationOpts.slice(0, 4), // 地點的list
        dateAMax: new Date().toISOString().substr(0, 10),
        dateBMin: new Date().toISOString().substr(0, 10),
        ipt: {
            line: '',  // 通報路線
            // lineList: locationOpts.map(item => item.text), // 地點的list
            
            pointStartK: '',  // 速限起點
            pointStartM: '',  // 速限起點
            pointEndK: '',  // 速限終點
            pointEndM: '',  // 速限終點
            normal: '',  // 常態速限
            slow: '12',  // 慢行速限
            dateStart: new Date().toISOString().substr(0, 10),  // 限制日期(起)
            dateEnd: new Date().toISOString().substr(0, 10),  // 限制日期(迄)
            recipients: [],  // 收件人
        },
        dateMenuShow: {  // 日曆是否顯示
            start: false,
            end: false,
        },
        choose: '',  // 所選部門,
        chooseMembers: [],  // 勾選的收件人
        dapartOpts: dapartOptsForMember,  // 部門下拉選單
        checkboxs: [],  // 選單
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
        dialogShow: false,  // 速限表是否顯示
        headers: [  // 速限表顯示的欄位
            { text: '起訖站', value: 'station', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '直線最高速度', value: 'straight', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
            { text: '曲線最高速度', value: 'curve', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold' },
        ],
        tableItems: [  // 速限表表格資料
            { station: '嘉義 ~ 北門', straight: 30, curve: 28},
            { station: '北門 ~ 竹崎', straight: 45, curve: 40},
            { station: '竹崎 ~ 二萬平', straight: 25, curve: 22},
            { station: '二萬平 ~ 阿里山', straight: 25, curve: 18},
            { station: '阿里山 ~ 祝山', straight: 20, curve: 18},
            { station: '阿里山 ~ 眠月', straight: 20, curve: 18},
            { station: '阿里山 ~ 水山神木', straight: 20, curve: 18},
        ],
    }),
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
        ]),
        // 切換部門成員
        changeDepart() {
            this.chLoadingShow({show:true})

            // 範例效果
            setTimeout(() => {
                this.checkboxs = [ ...this.members ]  // 測試用先不過慮部門全列出
                this.chLoadingShow({show:false})
            }, 1000)
            
        },
        // 加入全部 (checkboxs 陣列元素是物件)
        joinAll() {
            this.checkboxs.forEach(ele => {
                // 若未選取則加入
                let member = this.ipt.recipients.find(item => item == ele.value)
                if (member == undefined) this.ipt.recipients.push(ele.value)
            })
        },
        // 加入勾選 (chooseMembers 陣列元素是物件的value屬性)
        join() {
            this.chooseMembers.forEach(ele => {
                // 若未選取則加入
                let member = this.ipt.recipients.find(item => item == ele)
                if (member == undefined) this.ipt.recipients.push(ele)
            })
            this.chooseMembers = [ ...[] ]
        },
        // 查詢名稱
        transferName(val) {
            return this.members.find(ele => ele.value == val).name
        },
        // 移除收件人
        delMember(idx) {
            this.ipt.recipients.splice(idx, 1)
        },
        // 移除全部收件人
        delAll() {
            this.ipt.recipients = [ ...[] ]
        },
        ccc(){
        },
        time(i){
            if(i == 1){
                this.dateMenuShow.start = false
                this.dateBMin = this.ipt.dateStart
            }
            else{
                this.dateMenuShow.end = false
                this.dateAMax = this.ipt.dateEnd
            }
        },
        timeClean(i){
            if(i == 1){
                this.dateBMin = ''
            }
            else{
                this.dateAMax = ''
            }
        },
        // 送出
        save() {
            if(this.ipt.recipients.length == 0 || this.ipt.line == '' || this.ipt.pointStartK == '' ||  this.ipt.pointStartM == '' || this.ipt.pointEndK == '' 
            || this.ipt.pointEndM == '' || this.ipt.normal == '' || this.ipt.slow == '' || this.ipt.dateStart == '' || this.ipt.dateEnd == '' || this.ipt.dateStart == null || this.ipt.dateEnd == null){
                this.chMsgbar({ success: false, msg: '欄位未填'})
                return
            }
            if(this.ipt.pointStartK == this.ipt.pointEndK && this.ipt.pointStartM == this.ipt.pointEndM){
                this.chMsgbar({ success: false, msg: '路線起迄不可相同'})
                return
            }
            this.chLoadingShow({show:true})
            let arr = this.ipt.recipients.map(item => ({
                PeopleId: item
            }))
                CreateCarSafelnfo({
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                    ReportLine: this.ipt.line,  //通報路線
                    LimitStart: (parseInt(this.ipt.pointStartK)+(parseInt(this.ipt.pointStartM)/1000)).toString(),  //速限起點
                    LimitEnd: (parseInt(this.ipt.pointEndK)+(parseInt(+this.ipt.pointEndM)/1000)).toString(),  //速限終點
                    NormalLimit: this.ipt.normal,  //常態速限
                    SlowLimit: this.ipt.slow,  //慢行速限
                    LimitStartDate: this.ipt.dateStart,  //限制日期(起)
                    LimitEndDate: this.ipt.dateEnd,  //限制日期(迄)
                    RecPeople: arr,           
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '立案成功，已自動轉跳'})
                        this.status = '2'  // 狀態改為已回覆
                        this.saveBtnShow = false

                        //直接進下步驟
                        setTimeout(() => {
                            this.chLoadingShow({show:false})
                            this.$router.push({ path: `/smis/car-safeinfo/crawl-notify/${res.data.SlowSpeedCode}/edit` })
                        }, 1500)
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                     this.chMsgbar({ success: false, msg: '回覆成功'})
                }).finally(() => {
                    this.chLoadingShow({show:false})
                    
                })
            // let arr = this.ipt.recipients.map(item => ({
            //     PeopleId: item
            // }))
            // 測試用資料
            // setTimeout(() => {
            //     this.$router.push({ path: '/smis/car-safeinfo/crawl-notify' })
            //     this.chMsgbar({ success: true, msg: '資料新增成功'})
            //     this.chLoadingShow({show:true})
            // }, 1000)
        },
    },
}
</script>