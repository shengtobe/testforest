<template>
<v-row no-gutters>
    <v-col cols="12" style="border-bottom: 1px solid #CFD8DC"
        v-for="item in items"
        :key="item.title"
    >
        <v-row no-gutters>
            <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
                style="max-width: 160px"
            >
                <span class="font-weight-black">
                    {{ item.title }}
                </span>
            </v-col>

            <v-col class="white pa-3" v-if="item.oneline">{{ item.text }}</v-col>
            <v-col class="white pa-3" v-else v-html="item.text"></v-col>
        </v-row>
    </v-col>
</v-row>
</template>

<script>
export default {
    props: ['items'],
}
</script>