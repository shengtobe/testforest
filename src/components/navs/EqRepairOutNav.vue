<template>
<v-list-group no-action>
    <template v-slot:prependIcon>
        <!-- <v-icon color="light-green accent-3">mdi-source-branch</v-icon> -->
        <v-icon>mdi-source-branch</v-icon>
    </template>
    
    <template v-slot:activator>
        <v-list-item-title class="white--text">設備維修外包</v-list-item-title>
    </template>

    <v-list-group no-action sub-group>
        <template v-slot:activator>
            <v-list-item-title class="white--text">外包管理</v-list-item-title>
        </template>

        <v-list-item to="/eqrepair-out/contractor-manage" class="white--text">
            <v-list-item-title>包商管理</v-list-item-title>
        </v-list-item>
        <v-list-item to="/eqrepair-out/repair-state" class="white--text">
            <v-list-item-title>到修狀況統計</v-list-item-title>
        </v-list-item>
        <v-list-item to="/eqrepair-out/no-repair" class="white--text">
            <v-list-item-title>未到修警示及催修</v-list-item-title>
        </v-list-item>
    </v-list-group>

    <v-list-item to="/eqrepair-out/work-order-end" class="white--text">
        <v-list-item-title>工單結案及追蹤</v-list-item-title>
    </v-list-item>

    <v-list-item to="/eqrepair-out/report" class="white--text">
        <v-list-item-title>報表</v-list-item-title>
    </v-list-item>

    <v-list-item to="/eqrepair-out/list" class="white--text">
        <v-list-item-title>外包廠商名單管理</v-list-item-title>
    </v-list-item>
</v-list-group>
</template>