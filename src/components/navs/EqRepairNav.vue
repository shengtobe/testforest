<template>
<v-list-group no-action>
    <template v-slot:prependIcon>
        <!-- <v-icon color="error">mdi-wrench</v-icon> -->
        <v-icon>mdi-wrench</v-icon>
    </template>

    <template v-slot:activator>
        <v-list-item-title class="white--text">設備維修管理</v-list-item-title>
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
import { EqRepairRouter } from '@/router/moduleRouter/eqRepair'

export default {
    data: () => ({
        items: [ ...EqRepairRouter ]
    })
}
</script>