<template>
<v-list-group no-action>
    <template v-slot:prependIcon>
        <!-- <v-icon color="blue">mdi-database</v-icon> -->
        <v-icon>mdi-database</v-icon>
    </template>

    <template v-slot:activator>
        <v-list-item-title class="white--text">設備資料管理</v-list-item-title>
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
import { EqInfoRouter } from '@/router/moduleRouter/eqInfo'

export default {
    data: () => ({
        items: [ ...EqInfoRouter ]
    })
}
</script>