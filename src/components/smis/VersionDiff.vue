<template>
<v-col cols="12">
    <v-row no-gutters style="border-bottom: 1px solid #CFD8DC">
        <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
            style="max-width: 160px"
        >
            <span class="font-weight-black">變更前</span>
        </v-col>

        <v-col class="white pa-3"
            v-html="before"
        ></v-col>
    </v-row>

    <v-row no-gutters>
        <v-col class="yellow lighten-3 pl-3 pb-2 pt-3"
            style="max-width: 160px"
        >
            <span class="font-weight-black">變更後</span>
        </v-col>

        <v-col class="white pa-3"
            v-if="before == after"
            v-html="after"
        ></v-col>

        <!-- 內容不同用紅字 -->
        <v-col class="white pa-3 error--text"
            v-else
            v-html="after"
        ></v-col>
    </v-row>
</v-col>
</template>

<script>
export default {
    props: ['before', 'after']
}
</script>