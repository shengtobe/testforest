<template>
<v-row no-gutters>
    <v-col cols="12" sm="6" lg="4" style="border-bottom: 1px solid #CFD8DC"
        v-for="item in items"
        :key="item.title"
    >
        <v-row no-gutters>
            <v-col class="gradual-bg-green pl-3 pb-2 pt-3"
                style="max-width: 160px"
            >
                <span class="white--text">
                    <v-icon dark class="mr-1 mb-1">{{ item.icon }}</v-icon>
                    {{ item.title }}
                </span>
            </v-col>

            <v-col class="light-white-green pl-3 pb-2 pt-3">
                {{ item.text }}
            </v-col>
        </v-row>
    </v-col>
</v-row>
</template>

<script>
export default {
    props: ['items'],
}
</script>