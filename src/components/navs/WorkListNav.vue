<template>
<v-list-group no-action>
    <template v-slot:prependIcon>
        <!-- <v-icon color="pink accent-2">mdi-file-document</v-icon> -->
        <v-icon>mdi-file-document</v-icon>
    </template>

    <template v-slot:activator>
        <v-list-item-title class="white--text">故障、保養工單</v-list-item-title>
    </template>

    <v-list-item to="/worklist/maintain" class="white--text">
        <v-list-item-title>維修、養護科類工單</v-list-item-title>
    </v-list-item>

    <v-list-item to="/worklist/serve" class="white--text">
        <v-list-item-title>服務科類工單</v-list-item-title>
    </v-list-item>
</v-list-group>
</template>