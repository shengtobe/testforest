<template>
<v-dialog fullscreen hide-overlay transition="dialog-bottom-transition"
    v-model="dialogShow" 
>
    <v-card>
        <!-- 上方 bar -->
        <v-toolbar dense dark color="teal">
            <v-btn text fab small @click="closeShow">
                <v-icon>mdi-close</v-icon>
            </v-btn>
                
            <v-spacer></v-spacer>
            <v-toolbar-title>連結資料</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>

        <!-- 主內容 -->
        <div class="mx-md-10 mt-4">
            <CarHarmSearch
                v-if="dialog == 'carHarm'"
                @returnTableData="setTableData"
                style="max-width: 1280px"
            />

            <JobHarmSearch
                v-if="dialog == 'jobHarm'"
                @returnTableData="setTableData"
                style="max-width: 1280px"
            />

            <!-- 行車危害表格 -->
            <v-card>
                <v-data-table
                    v-if="dialog == 'carHarm'"
                    :headers="headers"
                    :items="items"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:item.caption="{ item }">
                        <v-btn color="teal" dark
                            @click="showContent(item.caption)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.reason="{ item }">
                        <v-btn color="teal" dark
                            @click="showContent(item.reason)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.deriveEvt="{ item }">
                        <v-btn color="teal" dark
                            @click="showContent(item.deriveEvt)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn color="success"
                            :loading="loading"
                            @click="connect(item)"
                        >連結</v-btn>
                    </template>
                </v-data-table>

                <!-- 職災危害表格 -->
                <v-data-table
                    v-if="dialog == 'jobHarm'"
                    :headers="headers"
                    :items="items"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:item.content="{ item }">
                        <v-btn color="teal" dark
                            @click="showContent(item.content)"
                        >檢視</v-btn>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-btn color="success"
                            :loading="loading"
                            @click="connect(item)"
                        >連結</v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </div>
    </v-card>

    <!-- 顯示文字內容的 dialog -->
    <v-dialog v-model="show" max-width="600">
        <v-card>
            <v-card-title
                class="yellow lighten-3 py-2 px-3"
                primary-title
            >
                <v-icon class="mr-2">mdi-file-document</v-icon>
                <strong>檢視內容</strong>
                <v-spacer></v-spacer>

                <v-btn text fab small @click="show = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <v-sheet class="pa-4" v-html="content"></v-sheet>
        </v-card>
    </v-dialog>
</v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import CarHarmSearch from '@/components/smis/CarHarmSearch.vue'
import JobHarmSearch from '@/components/smis/JobHarmSearch.vue'

export default {
    props: ['id', 'dialogShow', 'headers', 'dialog'],
    data: () => ({
        loading: false,
        show: false,
        content: '',
        items: [],
    }),
    components: { CarHarmSearch, JobHarmSearch },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
        ]),
        // 關閉 dialog
        closeShow() {
            this.$emit('closeShow')
        },
        // 設定表格資料
        setTableData(data) {
            this.items = data
        },
        // 顯示檢視內容
        showContent(txt) {
            this.content = txt.replace(/\n/g, '<br>')
            this.show = true
        },
        // 連結資料
        connect(item) {
            this.loading = true

            // if (dialog == 'carHarm') {

            // } else {

            // }

            setTimeout(() => {
                this.chMsgbar({ success: true, msg: '連結成功'})
                this.$emit('closeShow')
                this.loading = false
            }, 1000)
        },
    },
}
</script>