<template>
<v-row no-gutters class="mt-8">
    <v-col cols="12" v-for="item in items" :key="item.title">
        <v-card flat tile>
            <v-card-title
                class="indigo lighten-2 py-1 px-3 white--text"
                primary-title
            >
                <h5>{{ item.title }}</h5>
            </v-card-title>

            <div v-if="item.oneline" class="pa-4">{{ item.text }}</div>
            <div v-else v-html="item.text" class="pa-4"></div>
        </v-card>
    </v-col>
</v-row>
</template>

<script>
export default {
    props: ['items'],
}
</script>