<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">慢行通報編輯 (編號：{{ routeId }})</h2>

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
                <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                    style="max-width: 160px"
                >
                    <span class="font-weight-black">{{ item.title }}</span>
                </v-col>

                <v-col class="white pa-3">{{ item.value }}</v-col>
            </v-row>
        </v-col>
    </v-row>

    <v-row class="px-2">
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
                        :disabled="isStop"
                    ></v-text-field>
                </template>
                <v-date-picker
                    color="purple"
                    v-model="date"
                    @input="dateMemuShow = false"
                    locale="zh-tw"
                ></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" md="6" align-self="end" class="mb-1">
            <v-btn color="success" large
                v-if="!isStop"
                @click="save"
            >確定延長</v-btn>
        </v-col>

        <!-- 收件人 -->
        <v-col cols="12" class="mt-12">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>收件同仁
            </h3>
            <v-row>
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
            </div>
        </v-col>

        <v-col cols="12" class="my-8">
            <v-btn dark class="mr-3"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <v-btn dark color="success"
                v-if="!isStop"
                @click="update"
            >更新收件人</v-btn>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { dapartOptsForMember } from '@/assets/js/departOption'

export default {
    data: () => ({
        routeId: '',
        topData: [],  // 上方基本資料
        date: new Date().toISOString().substr(0, 10),  // 延長日期
        dateMemuShow: false,  // 日曆是否顯示
        recipients: ['2', '3', '5', '7'],  // 收件人 (傳至後端用)
        isStop: false,  // 是否解除
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
        topItems: {  // 上面的欄位
            findDate: { icon: 'mdi-calendar-text', title: '發現日期', text: '' },
            findLocation: { icon: 'mdi-map-marker', title: '發現地點', text: '' },
            accidentType: { icon: 'mdi-snowflake', title: '事故類型', text: '' },
            status: { icon: 'mdi-ray-vertex', title: '事故事件狀態', text: '' },
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
            'closeWindow',  // 關閉視窗
        ]),
        // 初始化資料
        initData() {
            if (this.$route.params.id != undefined) {
                this.chLoadingShow()
                this.routeId = this.$route.params.id  // 路由參數(id)

                // 範例效果
                setTimeout(() => {
                    if (this.routeId == 222) this.isStop = true  // 設定已解除的範例

                    // 設定上方資料
                    let obj = {
                        id: '111',
                        line: '本線',
                        pointStart: '5.7',
                        pointEnd: '8',
                        normal: '70',
                        slow: '50',
                        dateStart: '2019-05-10',
                        dateEnd: '2019-05-22',
                        creater: '王小明',
                        isStop: false,  // 是否解除
                    }
                    this.setShowData(obj)

                    this.recipients = ['2', '3', '5', '7']
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 設定上方資料
        setShowData(obj) {
            this.topData = [
                { title: '路線', value: obj.line },
                { title: '速限起點、終點', value: `${obj.pointStart} ~ ${obj.pointEnd} km` },
                { title: '常態速限', value: `${ obj.normal } km/h` },
                { title: '慢行速限', value: `${ obj.slow } km/h` },
                { title: '限制日期', value: `${obj.dateStart} ~ ${obj.dateEnd}` },
                { title: '通報人', value: obj.creater },
            ]
        },
        // 切換部門成員
        changeDepart() {
            this.chLoadingShow()

            // 範例效果
            setTimeout(() => {
                this.checkboxs = [ ...this.members ]  // 測試用先不過慮部門全列出
                this.chLoadingShow()
            }, 1000)
            
        },
        // 加入全部 (checkboxs 陣列元素是物件)
        joinAll() {
            this.checkboxs.forEach(ele => {
                // 若未選取則加入
                let member = this.recipients.find(item => item == ele.value)
                if (member == undefined) this.recipients.push(ele.value)
            })
        },
        // 加入勾選 (chooseMembers 陣列元素是物件的value屬性)
        join() {
            this.chooseMembers.forEach(ele => {
                // 若未選取則加入
                let member = this.recipients.find(item => item == ele)
                if (member == undefined) this.recipients.push(ele)
            })
            this.chooseMembers = [ ...[] ]
        },
        // 查詢名稱
        transferName(val) {
            return this.members.find(ele => ele.value == val).name
        },
        // 移除收件人
        delMember(idx) {
            this.recipients.splice(idx, 1)
        },
        // 移除全部收件人
        delAll() {
            this.recipients = [ ...[] ]
        },
        // 延長日期
        save() {
            if (confirm('你確定要延長日期嗎?')) {
                this.chLoadingShow()

                // 測試用資料
                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '延長日期成功'})
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 更新收件人
        update() {
            if (confirm('你確定要更新收件人嗎?')) {
                this.chLoadingShow()

                // 測試用資料
                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '更新收件人成功'})
                    this.chLoadingShow()
                }, 1000)
            }
        },
    },
    created() {
        this.initData()
    }
}
</script>