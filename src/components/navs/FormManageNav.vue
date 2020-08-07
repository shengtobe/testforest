<template>
<v-list-group no-action>
    <template v-slot:prependIcon>
        <!-- <v-icon color="pink accent-2">mdi-file-document</v-icon> -->
        <v-icon>mdi-file-document</v-icon>
    </template>

    <template v-slot:activator>
        <v-list-item-title class="white--text">表單</v-list-item-title>
    </template>

    <v-list-item to="/form-manage/serve" class="white--text">
        <v-list-item-title>服務科</v-list-item-title>
    </v-list-item>

    <v-list-item to="/form-manage/maintain" class="white--text">
        <v-list-item-title>養護科</v-list-item-title>
    </v-list-item>

    <v-list-item to="/form-manage/safeguard" class="white--text">
        <v-list-item-title>維護科</v-list-item-title>
    </v-list-item>

    <v-list-item to="/form-manage/labor-safety" class="white--text">
        <v-list-item-title>勞安</v-list-item-title>
    </v-list-item>
</v-list-group>
</template>