<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">
        人員傷亡名單
        <span class="mx-3">(事故事件編號：{{ id }})</span>

        <v-btn small dark fab class="mb-1 btn-modify"
            @click="dialogShow = true"
        >
            <v-icon dark>mdi-plus</v-icon>
        </v-btn>
    </h2>

    <v-row no-gutters class="mb-8">
        <v-col cols="12">
            <v-card>
                <v-data-table
                    :headers="headers"
                    :items="tableItems"
                    :options.sync="pageOpt"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                    class="theme-table"
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:loading>
                        <span class="red--text subtitle-1">資料讀取中...</span>
                    </template>

                    <!-- 表格最上面插入 toolbar 及 dialog -->
                    <template v-slot:top>
                        <v-dialog v-model="dialogShow" max-width="800px">
                            <v-card class="theme-card">
                                <v-card-title class="white--text px-4 py-1">
                                    {{ formTitle }}
                                    <v-spacer></v-spacer>
                                    <v-btn dark fab small text @click="dialogShow = false" class="mr-n2">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-card-title>

                                <v-card-text class="pt-2">
                                    <v-form
                                        ref="form"
                                        v-model="valid"
                                        lazy-validation
                                    >
                                        <v-row>
                                            <v-col cols="12" sm="4" md="3">
                                                <h3 class="mb-1">
                                                    <v-icon class="mr-1 mb-1">mdi-account</v-icon>姓名
                                                    <span class="red--text">*</span>
                                                </h3>
                                                <v-text-field
                                                    v-model.trim="editedItem.name"
                                                    solo
                                                    :rules="[v => (!!v && /[^\s]/.test(v)) || '此欄位不可空白']"
                                                ></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="4" md="3">
                                                <h3 class="mb-1">
                                                    <v-icon class="mr-1 mb-1">mdi-format-list-bulleted</v-icon>性別
                                                </h3>
                                                <v-select
                                                    v-model="editedItem.sex"
                                                    :items="['男', '女']"
                                                    solo
                                                ></v-select>
                                            </v-col>

                                            <v-col cols="12" sm="4" md="3">
                                                <h3 class="mb-1">
                                                    <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>生日
                                                </h3>
                                                <v-menu
                                                    v-model="dateMenuShow"
                                                    :close-on-content-click="false"
                                                    transition="scale-transition"
                                                    max-width="290px"
                                                    min-width="290px"
                                                >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                            v-model.trim="editedItem.birthday"
                                                            solo
                                                            v-on="on"
                                                            readonly
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker
                                                        color="purple"
                                                        v-model="editedItem.birthday"
                                                        @input="dateMenuShow = false"
                                                        locale="zh-tw"
                                                    ></v-date-picker>
                                                </v-menu>
                                            </v-col>

                                            <v-col cols="12" sm="4" md="3">
                                                <h3 class="mb-1">
                                                    <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>電話
                                                </h3>
                                                <v-text-field
                                                    v-model.trim="editedItem.phone"
                                                    solo
                                                ></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="8" md="6">
                                                <h3 class="mb-1">
                                                    <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>住址
                                                </h3>
                                                <v-text-field
                                                    v-model.trim="editedItem.addr"
                                                    solo
                                                ></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="4" md="3">
                                                <h3 class="mb-1">
                                                    <v-icon class="mr-1 mb-1">mdi-format-list-bulleted</v-icon>傷亡種類
                                                </h3>
                                                <v-select
                                                    v-model="editedItem.type"
                                                    :items="['輕傷', '昏迷', '重傷', '死亡']"
                                                    solo
                                                ></v-select>
                                            </v-col>

                                            <v-col cols="12" sm="4" md="3">
                                                <h3 class="mb-1">
                                                    <v-icon class="mr-1 mb-1">mdi-hospital-building</v-icon>收治醫院
                                                </h3>
                                                <v-text-field
                                                    v-model.trim="editedItem.hospital"
                                                    solo
                                                ></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="4" md="3">
                                                <h3 class="mb-1">
                                                    <v-icon class="mr-1 mb-1">mdi-currency-usd</v-icon>賠償金額
                                                </h3>
                                                <v-text-field
                                                    v-model.trim.number="editedItem.money"
                                                    solo
                                                    :rules="[v => /^\d+$/.test(v) || '請輸入整數']"
                                                ></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <h3 class="mb-1">
                                                    <v-icon class="mr-1 mb-1">mdi-tag</v-icon>保險註記
                                                </h3>
                                                <v-text-field
                                                    v-model.trim="editedItem.insurance"
                                                    solo
                                                ></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="5">
                                                <h3 class="mb-1">
                                                    <v-icon class="mr-1 mb-1">mdi-note</v-icon>備註
                                                </h3>
                                                <v-text-field
                                                    v-model.trim="editedItem.note"
                                                    solo
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </v-card-text>
                                
                                <v-card-actions class="px-5 pb-5">
                                    <v-spacer></v-spacer>
                                    <v-btn class="mr-2 btn-close white--text" elevation="4" @click="dialogShow = false" :loading="isDialogLoading">取消</v-btn>
                                    <v-btn class="btn-add white--text" elevation="4" @click="save" :loading="isDialogLoading">送出</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </template>

                    <template v-slot:item.info="{ item }">
                        <v-btn fab small dark class="btn-detail"
                            @click="view(item)"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn fab small class="mr-2 btn-modify"
                            @click="editItem(item)"
                        >
                            <v-icon>mdi-pen</v-icon>
                        </v-btn>

                        <v-btn fab small class="btn-delete"
                            @click="deleteItem(item)"
                        >
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:footer="footer">
                        <Pagination
                            :footer="footer"
                            :pageOpt="pageOpt"
                            @chPage="chPage"
                        />
                    </template>
                </v-data-table>
            </v-card>
        </v-col>

        <v-col cols="12" class="mt-5 text-center">
            <v-btn dark class="mr-3 btn-close"
                :to="`/smis/car-accident-event/${id}/show`"
            >回上層</v-btn>

            <v-btn dark class="btn-memo"
                @click="noDeath"
            >設為無人傷亡</v-btn>
        </v-col>
    </v-row>

    <!-- 個人資料 dialog -->
    <v-dialog v-model="infoShow" max-width="500px">
        <v-card class="theme-card">
            <v-card-title class="px-4 py-1">
                詳細資料
                <v-spacer></v-spacer>
                <v-btn fab small text @click="infoShow = false" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <div class="px-4 py-3">
                <v-row no-gutters>
                    <v-col cols="12">
                        <v-icon class="mr-1 mb-1">mdi-human-male-female</v-icon>
                        姓別： {{ info.PeopleSex }}
                    </v-col>
                
                    <v-col cols="12">
                        <v-divider class="mt-2 mb-3"></v-divider>
                    </v-col>

                    <v-col cols="12">
                        <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>
                        生日： {{ info.convert_birthDate }}
                    </v-col>

                    <v-col cols="12">
                        <v-divider class="mt-2 mb-3"></v-divider>
                    </v-col>

                    <v-col cols="12">
                        <v-icon class="mr-1 mb-1">mdi-phone-classic</v-icon>
                        電話： {{ info.PeoplePhone }}
                    </v-col>
                    
                    <v-col cols="12">
                        <v-divider class="mt-2 mb-3"></v-divider>
                    </v-col>

                    <v-col cols="12">
                        <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>
                        地址： {{ info.PeopleAddress }}
                    </v-col>
                </v-row>
            </div>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { hurtFetchList, hurtCreateData, hurtUpdateData, hurtDeleteData } from '@/apis/smis/carAccidentEvent'
import Pagination from '@/components/Pagination.vue'

export default {
    props: ['id'],  //路由參數
    data: () => ({
        valid: true,  // dialog 表單是否驗證
        dialogShow: false,
        isDialogLoading: false,  // dialog 是否讀取中
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '姓名', value: 'PeopleName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
            { text: '個人資料', value: 'info', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
            { text: '傷亡種類', value: 'HurtType', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
            { text: '收治醫院', value: 'SetHospital', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 150 },
            { text: '賠償金額', value: 'Reparation', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
            { text: '保險註記', value: 'SafeRemark', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 150 },
            { text: '備註', value: 'Remark', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 150 },
            { text: '編輯、刪除', value: 'action', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 150 },
        ],
        editedIndex: -1,
        editedItem: {},
        defaultItem: {
            name: '',
            sex: '男',
            birthday: new Date().toISOString().substr(0, 10),
            addr: '',
            phone: '',
            type: '輕傷',
            hospital: '',
            money: 0,
            insurance: '',
            note: '',
        },
        dateMenuShow: false,  // 日期選單是否顯示
        infoShow: false,  // 個人資料 dialog 是否顯示
        info: {},  // 個人資料
    }),
    components: { Pagination },
    watch: {
        // dialogShow 是否顯示
        dialogShow (val) {
            val || this.close()
        },
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
        formTitle () {
            return (this.editedIndex == -1) ? '新增資料' : '編輯資料'
        },
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 向後端取得資料
        fetchData() {
            this.editedItem = { ...this.defaultItem }
            this.pageOpt.page = 1  // 頁碼初始化
            this.fetchList()
        },
        // 向後端查詢資料
        fetchList() {
            this.chLoadingShow()

            hurtFetchList({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
                KeyName: 'SMS_HurtPeopleList',  // DB table
                KeyItem: [
                    { tableColumn: 'AccidentCode', columnValue: this.id },  // 行車事故事件編號
                ],
                QyName: [    // 欲回傳的欄位資料
                    'AccidentCode',
                    'FlowId',
                    'PeopleName',
                    'PeopleSex',
                    'PeopleDate',
                    'PeopleAddress',
                    'PeoplePhone',
                    'HurtType',
                    'SetHospital',
                    'Reparation',
                    'SafeRemark',
                    'Remark',
                ],
            }).then(res => {
                this.tableItems = JSON.parse(res.data.order_list)
            }).catch(err => {
                console.log(err)
                alert('查詢時發生問題，請重新查詢!')
            }).finally(() => {
                this.chLoadingShow()
            })
        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 編輯記錄
        editItem (item) {
            this.editedIndex = this.tableItems.indexOf(item)
            // 指派欄位的值
            this.editedItem.id = item.FlowId
            this.editedItem.name = item.PeopleName
            this.editedItem.sex = item.PeopleSex
            this.editedItem.birthday = item.convert_birthDate
            this.editedItem.addr = item.PeopleAddress
            this.editedItem.phone = item.PeoplePhone
            this.editedItem.type = item.HurtType
            this.editedItem.hospital = item.SetHospital
            this.editedItem.money = item.Reparation
            this.editedItem.insurance = item.SafeRemark
            this.editedItem.note = item.Remark

            this.dialogShow = true
        },
        // 刪除記錄
        deleteItem (item) {
            let index = this.tableItems.indexOf(item)
            if (confirm(`你確定要刪除此筆資料嗎?`)) {
                this.chLoadingShow()

                hurtDeleteData({
                    AccidentCode: this.id,  // 行車事故事件編號
                    FlowId: item.FlowId,  // 編輯中的資料的編號
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.tableItems.splice(index, 1)
                        this.chMsgbar({ success: true, msg: '刪除成功' })
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，刪除失敗' })
                }).finally(() => {
                    this.chLoadingShow()
                })
            }
        },
        // dialog 關閉
        close() {
            this.dialogShow = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        // 存檔
        save() {
            if (this.$refs.form.validate()) {  // 表單驗證欄位
                this.isDialogLoading = true

                if (this.editedIndex > -1) {
                    // ----------------- 編輯 ----------------- 
                    hurtUpdateData({
                        FlowId: this.editedItem.id,  // 編輯中的資料的編號
                        AccidentCode: this.id,  // 事故事件編號
                        PeopleName: this.editedItem.name,  // 姓名
                        PeopleSex: this.editedItem.sex,  // 性別
                        PeopleDate: this.editedItem.birthday,  // 生日
                        PeopleAddress: this.editedItem.addr,  // 住址
                        PeoplePhone: this.editedItem.phone,  // 電話
                        HurtType: this.editedItem.type,  // 傷亡種類
                        SetHospital: this.editedItem.hospital,  // 收治醫院
                        Reparation: this.editedItem.money,  // 賠償金額
                        SafeRemark: this.editedItem.insurance,  // 保險註記
                        Remark: this.editedItem.note,  // 備註
                        NoHurtPeople: 'F',  // 是否無傷亡
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                    }).then(res => {
                        if (res.data.ErrorCode == 0) {
                            // 將編輯後的資料更改回表格內
                            this.tableItems[this.editedIndex].PeopleName = this.editedItem.name
                            this.tableItems[this.editedIndex].PeopleSex = this.editedItem.sex
                            this.tableItems[this.editedIndex].convert_birthDate = this.editedItem.birthday
                            this.tableItems[this.editedIndex].PeopleAddress = this.editedItem.addr
                            this.tableItems[this.editedIndex].PeoplePhone = this.editedItem.phone
                            this.tableItems[this.editedIndex].HurtType = this.editedItem.type
                            this.tableItems[this.editedIndex].SetHospital = this.editedItem.hospital
                            this.tableItems[this.editedIndex].Reparation = this.editedItem.money
                            this.tableItems[this.editedIndex].SafeRemark = this.editedItem.insurance
                            this.tableItems[this.editedIndex].Remark = this.editedItem.note
                            this.chMsgbar({ success: true, msg: '更新成功' })
                        } else {
                            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                            this.$router.push({ path: '/error' })
                        }
                    }).catch(err => {
                        this.chMsgbar({ success: false, msg: '伺服器發生問題，更新失敗' })
                    }).finally(() => {
                        this.isDialogLoading = false
                        this.close()
                    })
                } else {
                    // ----------------- 新增 -----------------
                    hurtCreateData({
                        AccidentCode: this.id,  // 事故事件編號
                        PeopleName: this.editedItem.name,  // 姓名
                        PeopleSex: this.editedItem.sex,  // 性別
                        PeopleDate: this.editedItem.birthday,  // 生日
                        PeopleAddress: this.editedItem.addr,  // 住址
                        PeoplePhone: this.editedItem.phone,  // 電話
                        HurtType: this.editedItem.type,  // 傷亡種類
                        SetHospital: this.editedItem.hospital,  // 收治醫院
                        Reparation: this.editedItem.money,  // 賠償金額
                        SafeRemark: this.editedItem.insurance,  // 保險註記
                        Remark: this.editedItem.note,  // 備註
                        NoHurtPeople: 'F',  // 是否無傷亡
                        ClientReqTime: getNowFullTime(),  // client 端請求時間
                        OperatorID: this.userData.UserId,  // 操作人id
                    }).then(res => {
                        if (res.data.ErrorCode == 0) {
                            this.fetchList()  // 重新查詢資料
                            this.chMsgbar({ success: true, msg: '新增成功' })
                            this.editedItem = { ...this.defaultItem }
                        } else {
                            sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                            this.$router.push({ path: '/error' })
                        }
                    }).catch(err => {
                        this.chMsgbar({ success: false, msg: '伺服器發生問題，新增失敗' })
                    }).finally(() => {
                        this.isDialogLoading = false
                        this.close()
                    })
                }
            } else {
                alert('有欄位未正確填寫!')
            }
        },
        // 設為無人傷亡
        noDeath() {
            if (confirm(`你確定要設為無人傷亡嗎?  (確定後會刪除所有人員傷亡資料)`)) {
                this.chLoadingShow()

                hurtCreateData({
                    AccidentCode: this.id,  // 事故事件編號
                    NoHurtPeople: 'T',  // 是否無傷亡
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.tableItems = [ ...[]]
                        this.chMsgbar({ success: true, msg: '設定成功' })
                    } else {
                        sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，設定失敗' })
                }).finally(() => {
                    this.chLoadingShow()
                    this.close()
                })
            }
        },
        // 顯示個人資料
        view(item) {
            this.infoShow = true
            this.info = { ...item }
        },
    },
    created() {
        this.fetchData()
    }
}
</script>