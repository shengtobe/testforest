<template>
<v-list-group no-action>
    <template v-slot:prependIcon>
        <!-- <v-icon color="pink accent-2">mdi-file-document</v-icon> -->
        <v-icon>mdi-eye</v-icon>
    </template>

    <template v-slot:activator>
        <v-list-item-title class="white--text">監控系統</v-list-item-title>
    </template>

    <v-list-item to="/monitor/slope-monitor" class="white--text">
        <v-list-item-title>顛坡監控</v-list-item-title>
    </v-list-item>

    <v-list-item to="/monitor/rainfall-monitor" class="white--text">
        <v-list-item-title>雨量監測</v-list-item-title>
    </v-list-item>
</v-list-group>
</template>