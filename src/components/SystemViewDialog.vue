<template>
<v-dialog v-model="viewDialog.show" max-width="600">
    <v-card class="theme-card">
        <v-card-title
            class="white--text py-2 px-3"
            primary-title
        >
            <v-icon class="white--text mr-2">mdi-file-document</v-icon>
            <strong>檢視內容</strong>
            <v-spacer></v-spacer>

            <v-btn text fab small
                @click="chViewDialog({ show: false })"
            >
                <v-icon class="white--text">mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-sheet class="pa-4" v-html="viewDialog.content"></v-sheet>
    </v-card>
</v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState ('system', {
            viewDialog: state => state.viewDialog,
        })
    },
    methods: {
        ...mapActions('system', [
            'chViewDialog',  // 改變檢視內容 dialog (這裡只用來關閉顯示)
        ]),
    }
}
</script>