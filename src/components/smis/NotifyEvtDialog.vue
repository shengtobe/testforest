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
        <v-card class="mx-md-10 mt-10">
            <v-data-table
                :headers="headers"
                :items="items"
                disable-sort
                disable-filtering
                hide-default-footer
            >
                <template v-slot:no-data>
                    <span class="red--text subtitle-1">沒有資料</span>
                </template>

                <template v-slot:item.action="{ item }">
                    <v-btn color="success"
                        @click="connect(item.id)"
                    >連結</v-btn>
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

        <div class="mx-md-10 mt-5 pb-8 text-center"
            v-if="dialog == 'carEvt'"
        >
            <v-btn color="cyan darken-4" dark class="mb-4"
                :loading="isLoading"
                @click="fetchAll"
            >列出全部</v-btn>
        </div>
    </v-card>
</v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import Pagination from '@/components/Pagination.vue'

export default {
    props: ['id', 'dialogShow', 'headers', 'items', 'dialog'],
    data: () => ({
        isLoading: false,  // 是否讀取中
        pageOpt: { page: 1 },  // 目前頁數
    }),
    components: { Pagination },
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // 改變 messageBar
        ]),
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 關閉 dialog
        closeShow() {
            this.$emit('closeShow')
        },
        // 確認連結
        connect(id) {
            this.$emit('connect', id, this.dialog)
        },
        // 列出全部 (行車事故事件才需要)
        fetchAll() {
            this.isLoading = true

            setTimeout(() => {
                this.isLoading = false
            }, 1000)
        },
    },
}
</script>