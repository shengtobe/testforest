<template>
<v-sheet class="ma-4 mb-8" color="yellow lighten-2">
    <v-container class="px-8">
        <p class="font-weight-black title text-center">挖掘機定期檢查表(月檢表)</p>

        <v-row class="white px-4">
            <v-col cols="12" sm="4">
                <v-text-field
                    label="管理單位"
                    v-model.trim="ipt.department"
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="4">
                <v-text-field
                    label="檢查人員"
                    v-model="ipt.name"
                    readonly
                ></v-text-field>
            </v-col>
                
            <v-col cols="12" sm="4">
                <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="ipt.date"
                            label="檢查日期"
                            readonly
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="ipt.date"
                        @input="menu = false"
                        color="purple darken-1"
                        locale="zh-tw"
                    ></v-date-picker>
                </v-menu>
            </v-col>

            <!-- 檢查項目 -->
            <v-col cols="12">
                <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                    <v-col cols="12" sm="5">檢查項目</v-col>
                    <v-col cols="12" sm="2">檢查方法</v-col>
                    <v-col cols="12" sm="3">檢查結果</v-col>
                    <v-col cols="12" sm="2">備註</v-col>
                </v-row>

                <v-alert
                    dense
                    border="top"
                    colored-border
                    color="teal"
                    elevation="4"
                    v-for="(item, idx) in items"
                    :key="idx"
                    class="mb-6"
                >
                    <v-row no-gutter>
                        <v-col cols="12" sm="5">{{ item.question }}</v-col>
                        <v-col cols="12" sm="2">
                            <span class="d-sm-none error--text">檢查方法：</span>
                            {{ item.action }}
                        </v-col>
                        <v-col cols="12" sm="3">
                            <span class="d-sm-none error--text">檢查結果：</span>
                            <v-radio-group dense row
                                v-model="ipt.items[idx].status"
                                class="pa-0 ma-0"
                            >
                                <v-radio color="success" label="良好" value="1"></v-radio>
                                <v-radio color="red" label="不良" value="2"></v-radio>
                                <v-radio color="black" label="無此項" value="0"></v-radio>
                            </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                            <span class="d-sm-none error--text">備註：</span>
                            <v-text-field outlined dense
                                v-model.trim="ipt.items[idx].note"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-alert>
            </v-col>

            <!-- 改善建議、改善追蹤 -->
            <v-col cols="12">
                <v-textarea
                    label="改善建議"
                    auto-grow
                    outlined
                    rows="4"
                    v-model.trim="ipt.suggest"
                ></v-textarea>
            </v-col>

            <v-col cols="12">
                <v-textarea
                    class="mt-n6"
                    label="改善追蹤"
                    auto-grow
                    outlined
                    rows="4"
                    v-model.trim="ipt.track"
                ></v-textarea>
            </v-col>

            <v-col cols="12">
                <v-btn large block
                    class="mt-n8 mb-4"
                    color="success"
                >送出表單</v-btn>
            </v-col>
        </v-row>
    </v-container>
</v-sheet>
</template>

<script>
export default {
    data: () => ({
        menu: false,  // 時間選單是否顯示
        ipt: {
            department: '',
            name: JSON.parse(localStorage.getItem('user')).name,
            date: new Date().toISOString().substr(0, 10),
            items: [
                { status: '1', note: '' },
                { status: '1', note: '' },
                { status: '1', note: '' },
                { status: '1', note: '' },
                { status: '1', note: '' },
                { status: '1', note: '' },
                { status: '1', note: '' },
                { status: '1', note: '' },
                { status: '1', note: '' },
                { status: '1', note: '' },
                { status: '1', note: '' },
                { status: '1', note: '' },
            ],
            suggest: '',  // 改善建議
            track: '',  // 改善追蹤
        },
        items: [
            {
                question: '1. 引擎水箱冷卻水水量是否正常',
                action: '目視點檢',
            },
            {
                question: '2. 引擎機油及柴油油量是否正常',
                action: '目視點檢',
            },
            {
                question: '3. 履帶鬆緊度及表面是否正常',
                action: '動作測試及目視點檢',
            },
            {
                question: '4. 電瓶及電器設備是否正常',
                action: '動作測試',
            },
            {
                question: '5. 機械各動作部分潤滑是否正常',
                action: '目視點檢',
            },
            {
                question: '6. 空氣濾清器清潔度是否正常',
                action: '目視點檢',
            },
            {
                question: '7. 操作液壓油油量是否正常',
                action: '目視點檢',
            },
            {
                question: '8. 方向操作系統動作是否正常',
                action: '動作測試',
            },
            {
                question: '9. 剎車能力動作情況檢查是否正常',
                action: '目視點檢',
            },
            {
                question: '10. 儀表、燈及喇叭操作情況檢查是否正常',
                action: '動作測試',
            },
            {
                question: '11. 各部機件是否有漏油現象',
                action: '目視點檢',
            },
            {
                question: '12. 各部機件是否有異常聲音及不正常動作',
                action: '動作測試',
            },
        ]
    }),
}
</script>