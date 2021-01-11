<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4">危害編號：{{ id }}</h2>

    <!-- 上面的欄位 -->
    <TopBasicTable :items="topItems" />

    <!-- 下面的欄位 -->
    <v-row no-gutters class="mt-8">
        <BottomTable :items="bottomItems" />

        <!-- 控制措施 -->
        <v-col cols="12" class="mt-8">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-check-circle</v-icon>控制措施
            </h3>
            <v-card>
                <v-data-table
                    :headers="headers"
                    :items="tableItems"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:item.desc="{ item }">
                        <v-btn color="teal" dark
                            @click="showContent(item.desc)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.file="{ item }">
                        <v-btn fab small dark color="brown"
                            :href="item.file.link"
                            :download="item.file.name"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:item.evidences="{ item }">
                        <v-btn fab small dark color="purple lighten-2"
                            @click="showEvidences(item.evidences)"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>

        <v-col cols="12" class="text-center mt-12 mb-8">
            <v-btn dark class="ma-2"
                @click="closeWindow"
            >關閉視窗</v-btn>

            <template v-if="!done">
                <v-btn dark class="ma-2"
                    color="indigo"
                    :to="`/smis/car-harmdb/harms/${id}/edit`"
                >編輯</v-btn>

                <v-btn dark  class="ma-2" color="error"
                    @click="del"
                >作廢</v-btn>

                <v-btn dark  class="ma-2" color="success"
                    @click="save"
                >申請措施審核</v-btn>
            </template>
        </v-col>
    </v-row>

    <!-- 證據 -->
    <v-dialog v-model="dialogShow" max-width="400px">
        <v-card>
            <v-toolbar flat dense dark color="purple lighten-2">
                <v-toolbar-title>證據</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn fab small text @click="dialogShow = false" class="mr-n2">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-list-item-group>
                <template v-for="(item, idx) in evidences">
                    <v-list-item
                        :key="item.name"
                        :href="item.link"
                        :download="item.name"
                    >
                        <v-list-item-content>
                            <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider
                        v-if="idx + 1 < evidences.length"
                        :key="idx"
                    ></v-divider>
                </template>
            </v-list-item-group>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { carHarmDbStatus } from '@/assets/js/smisData'
import TopBasicTable from '@/components/TopBasicTable.vue'
import BottomTable from '@/components/BottomTable.vue'

export default {
    props: ['itemData'],
    data: () => ({
        id: '',  // 編號
        done: false,  // 是否完成頁面操作
        topItems: {  // 上面的欄位
            depart: { icon: 'mdi-bank', title: '權責單位', text: '' },
            mode: { icon: 'mdi-snowflake', title: '營運模式', text: '' },
            wbs: { icon: 'mdi-source-branch', title: '關聯子系統', text: '' },
            serious: { icon: 'mdi-format-line-spacing', title: '風險嚴重性', text: '' },
            frequency: { icon: 'mdi-signal-variant', title: '風險頻率', text: '' },
            level: { icon: 'mdi-elevation-rise', title: '風險等級', text: '' },
            status: { icon: 'mdi-ray-vertex', title: '危害狀態', text: '' },
        },
        bottomItems: [],  // 下面的欄位
        tableItems: [],  // 表格資料 (控制措施)
        headers: [  // 表格欄位
            { text: '編號', value: 'id', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '措施簡述', value: 'subject', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '措施說明', value: 'desc', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '管控單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '規章', value: 'file', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '證據', value: 'evidences', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '備註', value: 'note', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
        evidences: [],  // 證據
        dialogShow: false,  // 證據dialog是否顯示
    }),
    components: {
        TopBasicTable,
        BottomTable,
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
    watch: {
        // 路由參數變化時，重新向後端取資料
        $route(to, from) {
            // … 
        }
    },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
            'chViewDialog',  // 檢視內容 dialog
            'closeWindow',  // 關閉視窗
        ]),
        // 初始化資料
        setShowData(obj) {
            this.id = obj.id  // 編號

            // 影響、運轉影響情形字串
            let affectsArr = []
            if (obj.affectTraveler) affectsArr.push('影響旅客')
            if (obj.affectStaff) affectsArr.push('影響員工')
            if (obj.affectPublic) affectsArr.push('影響大眾')
            if (obj.trainLate) affectsArr.push('列車誤點')
            if (obj.stopOperation) affectsArr.push('中斷營運')

            // 設定上面的欄位資料
            this.topItems.depart.text = obj.depart  // 權責部門
            this.topItems.mode.text = obj.mode  // 營運模式
            this.topItems.wbs.text = obj.wbs  // 關聯子系統
            this.topItems.serious.text = obj.serious  // 風險嚴重性
            this.topItems.frequency.text = obj.frequency  // 風險頻率
            this.topItems.level.text = obj.level  // 風險等級
            this.topItems.status.text = carHarmDbStatus.find(ele => ele.value == obj.status).text  // 危害狀態(顯示的文字)

            // 設定下面的欄位資料
            this.bottomItems = [
                { oneline: false, icon: 'mdi-pen', title: '危害說明', text: obj.desc.replace(/\n/g, '<br>') },
                { oneline: false, icon: 'mdi-pen', title: '直接成因', text: obj.reason.replace(/\n/g, '<br>') },
                { oneline: false, icon: 'mdi-pen', title: '可能的間接原因', text: obj.indirectReason.replace(/\n/g, '<br>') },
                { oneline: false, icon: 'mdi-note', title: '備註', text: obj.note.replace(/\n/g, '<br>') },
                { oneline: true, icon: 'mdi-alert-decagram', title: '影響、運轉影響情形', text: affectsArr.join('、') },
                { oneline: true, icon: 'mdi-arrow-expand', title: '衍生事故', text: obj.accidents.join('、') },
            ]

            this.tableItems = [ ...obj.controls ]  // 控制措施
        },
        // 作廢
        del() {
            if (confirm('你確定要作廢嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '作廢成功'})
                    this.done = true  // 隱藏頁面操作按鈕
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 申請審核
        save() {
            if (confirm('你確定要申請審核嗎?')) {
                this.chLoadingShow()

                setTimeout(() => {
                    this.chMsgbar({ success: true, msg: '申請審核成功'})
                    this.done = true  // 隱藏頁面操作按鈕
                    this.chLoadingShow()
                }, 1000)
            }
        },
        // 顯示檢視內容
        showContent(txt) {
            this.chViewDialog({ show: true, content: txt.replace(/\n/g, '<br>') })
        },
        // 顯示證據
        showEvidences(arr) {
            this.evidences = [ ...arr ]
            this.dialogShow = true
        },
    },
    created() {
        this.setShowData(this.itemData)
    }
}
</script>