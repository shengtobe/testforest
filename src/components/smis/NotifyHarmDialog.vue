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
                            @click="connect(item.id)"
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
                            @click="connect(item.id)"
                        >連結</v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </div>
    </v-card>
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
        items: [],
    }),
    components: { CarHarmSearch, JobHarmSearch },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
            'chViewDialog',  // 檢視內容 dialog
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
            this.chViewDialog({ show: true, content: txt.replace(/\n/g, '<br>') })
        },
        // 確認連結
        connect(id) {
            this.$emit('connect', id, this.dialog)
        },
    },
}
</script>