<template>
<v-overlay :value="show" z-index="65534">
    <v-progress-circular
        indeterminate
        size="100"
        color="yellow lighten-2"
    ></v-progress-circular>
</v-overlay>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState ('system', {
            show: state => state.loading.show,
        })
    },
}
</script>