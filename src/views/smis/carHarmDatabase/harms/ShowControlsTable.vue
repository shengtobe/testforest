<template>
<v-col cols="12" class="mt-8 label-header">
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
            class="theme-table"
        >
            <template v-slot:no-data>
                <span class="red--text subtitle-1">沒有資料</span>
            </template>

            <template v-slot:item.desc="{ item }">
                <v-btn class="btn-detail" dark
                    @click="showContent(item.DeviceDesp)"
                >檢視</v-btn>
            </template>

            <template v-slot:item.depart="{ item }">
                {{ departOpts.find(ele => ele.value == item.DeviceDepart).text }}
            </template>
            
            <template v-slot:item.file="{ item }">
                <v-btn fab small dark color="brown"
                    v-if="item.regul_file_path != ''"
                    :href="item.regul_file_path"
                    :download="item.regul_file_path_name"
                >
                    <v-icon>mdi-file-document</v-icon>
                </v-btn>
            </template>

            <template v-slot:item.evidences="{ item }">
                <v-btn fab small dark color="purple lighten-2"
                    v-if="item.file_path.length > 0"
                    @click="showEvidences(item)"
                >
                    <v-icon>mdi-file-document</v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </v-card>

    <!-- 證據 dialog -->
    <EvidencesDialog
        :show="dialogShow"
        :fileNameArr="evidencesName"
        :filePathArr="evidences"
        @closeDialog="closeDialog"
    />
</v-col>
</template>

<script>
import { mapActions } from 'vuex'
import EvidencesDialog from '@/components/smis/EvidencesDialog.vue'
import { departOptions } from '@/assets/js/departOption'

export default {
    props: ['tableItems'],
    data: () => ({
        headers: [  // 表格欄位
            { text: '編號', value: 'ProcCode', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 150 },
            { text: '措施簡述', value: 'DeviceTitle', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 150 },
            { text: '措施說明', value: 'desc', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
            { text: '管控單位', value: 'depart', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
            { text: '規章', value: 'file', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 70 },
            { text: '證據', value: 'evidences', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 70 },
            { text: '備註', value: 'Remark', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
        ],
        evidences: [],  // 證據路徑
        evidencesName: [],  // 證據名稱
        dialogShow: false,  // 證據dialog是否顯示
        departOpts: departOptions,  // 部門
    }),
    components: {
        EvidencesDialog,
    },
    methods: {
        ...mapActions('system', [
            'chViewDialog',  // 檢視內容 dialog
        ]),
        // 顯示檢視內容
        showContent(txt) {
            this.chViewDialog({ show: true, content: txt.replace(/\n/g, '<br>') })
        },
        // 顯示證據
        showEvidences(item) {
            this.evidences = [ ...item.file_path ]  // 指派證據檔案路徑
            this.evidencesName = [ ...item.file_path_name ]  // 指派證據檔案名稱
            this.dialogShow = true
        },
        // 關閉證據dialog
        closeDialog() {
            this.dialogShow = false
        }
    }
}
</script>