<template>
<v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">
    <!-- dialog 內容 -->
    <v-card>
        <!-- 上方 bar -->
        <v-toolbar dense dark color="teal">
            <v-btn text fab small @click="toggleShow">
                <v-icon>mdi-close</v-icon>
            </v-btn>
                
            <v-spacer></v-spacer>
            <v-toolbar-title>請選擇姓名</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>

        <!-- 下拉選單 -->
        <v-row no-gutters class="mt-5">
            <v-col cols="12" sm="6" md="3" class="px-4">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-account</v-icon>科室
                </h3>
                <v-select
                    v-model="select.lv1"
                    :items="opts.lv1"
                    solo
                ></v-select>
            </v-col>

            <v-col cols="12" sm="6" md="3" class="px-4">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-account</v-icon>車站、工廠、車庫、監工區
                </h3>
                <v-select
                    v-model="select.lv2"
                    :items="opts.lv2"
                    :disabled="disable.lv2"
                    solo
                ></v-select>
            </v-col>

            <v-col cols="12" sm="6" md="3" class="px-4">
                <h3 class="mb-1">
                    <v-icon class="mr-1 mb-1">mdi-account</v-icon>班、組
                </h3>
                <v-select
                    v-model="select.lv3"
                    :items="opts.lv3"
                    :disabled="disable.lv3"
                    solo
                ></v-select>
            </v-col>

            <!-- 姓名 -->
            <v-col cols="12" class="px-4 mt-3">
                <h3 class="mb-3">
                    <v-icon class="mr-1 mb-1">mdi-account-multiple</v-icon>姓名
                </h3>
                <v-btn
                    v-for="item in users"
                    :key="item.UserId"
                    @click="choseUser(item)"
                    outlined
                    large
                    tile
                    color="brown"
                    class="mr-4 mb-3"
                >{{ item.UserName }}</v-btn>
            </v-col>
        </v-row>
    </v-card>

    <!-- dialog -->
    <v-dialog v-model="dialogShow" width="450">
        <v-card>
            <v-card-title
                class="yellow lighten-3 py-1 px-3"
                primary-title
            >
                <v-icon class="mr-2">mdi-alert-circle-outline</v-icon>
                <strong>確認姓名</strong>
                <v-spacer></v-spacer>

                <v-btn text fab small
                    @click="dialogShow = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <v-sheet class="pa-4">
                你目前選擇了「{{ choseData.name }}」，請問要送出嗎?
            </v-sheet>
            
            <!-- <v-divider></v-divider> -->

            <v-card-actions class="px-5 pb-5 mt-5">
                <v-spacer></v-spacer>
                <v-btn class="mr-2 btn-clear" elevation="4" @click="dialogShow = false">取消</v-btn>
                <v-btn class="btn-add" color="success"  elevation="4" @click="submit">送出</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { fetchOrganization } from '@/apis/organization'

export default {
    data: () => ({
        select: {
            lv1: '',
            lv2: '',
            lv3: '',
        },
        opts: {
            lv1: [],
            lv2: [],
            lv3: [],
        },
        disable: {  // 下拉選單是否禁用
            lv2: true,
            lv3: true,
        },
        users: [],  // 員工列表
        choseData: {   // 所選的員工資料
            uid: '',
            name: '',
        },
        dialogShow: false
    }),
    computed: {
        ...mapState ('organization', {
            show: state => state.show,
            all: state => state.all,
            nowIptName: state => state.nowIptName,
        })
    },
    watch: {
        // 下拉選單第1層
        'select.lv1': function(val) {
            console.log(val)
            let choseItem = this.all.depart1.find(item => item.DepartCode == val)  // 找出該筆資料

            // 清空下二層下拉選單及姓名資料
            this.select.lv2 = this.select.lv3 = ''
            this.disable.lv2 = this.disable.lv3 = true
            this.users.length = 0
            
            // 列出本層人員
            this.users = this.all.users.filter(item => item.DepartCode == choseItem.DepartCode)

            // 若有子類別則指派下層拉下選單
            let subDepart = this.all.depart2.filter(item => item.DepartParentName == choseItem.DepartName)

            if(subDepart.length > 0) {
                this.opts.lv2 = subDepart.map(item => {
                    return {
                        text: item.DepartName,
                        value: item.DepartCode,
                    }
                })
                this.disable.lv2 = false
            }
        },
        // 下拉選單第2層
        'select.lv2': function(val) {
            if (val != '') {
                let choseItem = this.all.depart2.find(item => item.DepartCode == val)  // 找出該筆資料
                
                // 清空下二層下拉選單及姓名資料
                this.select.lv3 = ''
                this.disable.lv3 = true
                this.users.length = 0

                // 列出本層人員
                this.users = this.all.users.filter(item => item.DepartCode == choseItem.DepartCode)
                
                // 若有子類別則指派下層拉下選單
                let subDepart = this.all.depart3.filter(item => item.DepartParentName == choseItem.DepartName)

                if(subDepart.length > 0) {
                    this.opts.lv3 = subDepart.map(item => {
                        return {
                            text: item.DepartName,
                            value: item.DepartCode,
                        }
                    })
                    this.disable.lv3 = false
                }
            }
        },
        // 下拉選單第3層
        'select.lv3': function(val) {
            if (val != '') {
                this.users = this.all.users.filter(item => item.DepartCode == val)
            }
        },
    },
    methods: {
        ...mapActions('organization', [
            'toggleShow',  // toggle dialog show
            'chChose',  // 改變所選的員工資料
            'setAllData',  // 設定所有資料
        ]),
        // 向後端取得資料
        async fetchDdata() {
            try {
                let res = await fetchOrganization({ ClientReqTime: getNowFullTime() })  // 取得組織表所有資料
                this.setAllData(res.data)
                this.initData()
            } catch (err) {
                console.log(err)
                alert('組職表資料取得失敗')
            }
        },
        // 初始化資料
        initData() {
            // 初始化第一層下拉選單
            this.opts.lv1 = this.all.depart1.map(item => {
                return {
                    text: item.DepartName,
                    value: item.DepartCode,
                }
            })
        },
        // 選擇員工
        choseUser(item) {
            this.choseData.uid = item.UserId
            this.choseData.name = item.UserName
            this.dialogShow = true
        },
        // 送出
        submit() {
            this.chChose(this.choseData)
            this.toggleShow()

            if (this.nowIptName != '') {  // 若目前欄位名不為空 (針對頁面有多個欄位使用此組件時用)
                this.$emit('setNowIpt')
            }
        },
    },
    created() {
        this.fetchDdata()
    },
}
</script>