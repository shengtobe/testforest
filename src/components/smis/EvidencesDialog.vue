<template>
<v-dialog v-model="show" max-width="400px" @click:outside="close">
    <v-card class="theme-card">
        <v-toolbar flat dense dark class="metal-dark-yellow-top">
            <v-toolbar-title>證據</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn fab small text @click="close" class="mr-n2">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>

        <v-list-item-group>
            <template v-for="(item, idx) in filePathArr">
                <v-list-item
                    :key="item"
                    :href="item"
                    :download="fileNameArr[idx]"
                >
                    <v-list-item-content>
                        <v-list-item-title class="pa-3">{{ fileNameArr[idx] }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider
                    v-if="idx + 1 < filePathArr.length"
                    :key="idx"
                ></v-divider>
            </template>
        </v-list-item-group>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    props: ['show', 'fileNameArr', 'filePathArr'],
    methods: {
        // 關閉 dialog
        close() {
            this.$emit('closeDialog')
        },
    }
}
</script>