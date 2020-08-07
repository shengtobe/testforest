<template>
<v-list-group no-action>
    <template v-slot:prependIcon>
        <!-- <v-icon color="green accent-2">mdi-hexagon-multiple</v-icon> -->
        <v-icon>mdi-hexagon-multiple</v-icon>
    </template>

    <template v-slot:activator>
        <v-list-item-title class="white--text">維修統計分析</v-list-item-title>
    </template>

    <v-list-item
        v-for="item in items"
        :to="item.path"
        :key="item.linkText"
        class="white--text"
    >
        <v-list-item-title>{{ item.linkText }}</v-list-item-title>
    </v-list-item>

</v-list-group>
</template>

<script>
// 匯入路由資料
import { RepairAnalysisRouter } from '@/router/moduleRouter/repairAnalysis'

export default {
    data: () => ({
        items: [ ...RepairAnalysisRouter ]
    })
}
</script>