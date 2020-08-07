<template>
<v-snackbar top right
    v-model="msgbar.show"
    :timeout="4000"
    :color="msgbar.color"
    class="mt-12 text-center"
>
    <span>
        <v-icon dark class="mr-2">{{ msgbar.icon }}</v-icon> {{ msgbar.msg }}
    </span>
</v-snackbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState ('system', {
            msgbar: state => state.msgbar,
        })
    },
}
</script>