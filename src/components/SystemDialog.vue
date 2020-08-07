<template>
<v-dialog
    v-model="dialog.show"
    width="500"
    persistent
>
    <v-card>
        <v-card-title
            class="yellow lighten-3 py-2 px-3"
            primary-title
        >
            <v-icon class="mr-2">mdi-alert-circle-outline</v-icon>
            <strong>重要訊息</strong>
            <v-spacer></v-spacer>

            <v-btn text fab small
                @click="chDialog({ show: false })"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-sheet class="pa-4">
            {{ dialog.msg }}
        </v-sheet>
    </v-card>
</v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState ('system', {
            dialog: state => state.dialog,
        })
    },
    methods: {
        ...mapActions('system', [
            'chDialog',  // 改變 dialog
        ]),
    }
}
</script>