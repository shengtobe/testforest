<template>
<v-list-group no-action>
    <template v-slot:prependIcon>
        <!-- <v-icon color="purple lighten-2">mdi-cube</v-icon> -->
        <v-icon>mdi-wrench</v-icon>
    </template>

    <template v-slot:activator>
        <v-list-item-title class="white--text">設備養護管理</v-list-item-title>
    </template>

    <!-- 設備資料管理 -->
    <v-list-group no-action sub-group>
        <template v-slot:activator>
            <v-list-item-title class="white--text">設備資料管理</v-list-item-title>
        </template>

        <v-list-item to="/mmis/train-track-lane" class="white--text">
            <v-list-item-title>列車、軌道、車道設備</v-list-item-title>
        </v-list-item>
        <v-list-item to="/mmis/radio" class="white--text">
            <v-list-item-title>無線電設備管理</v-list-item-title>
        </v-list-item>
        <v-list-item to="/mmis/material" class="white--text">
            <v-list-item-title>料件管理</v-list-item-title>
        </v-list-item>
    </v-list-group>

    <!-- 設備維修管理 -->
    <v-list-group no-action sub-group>
        <template v-slot:activator>
            <v-list-item-title class="white--text">設備維修管理</v-list-item-title>
        </template>

        <v-list-item to="/mmis/fault-maintenance" class="white--text">
            <v-list-item-title>故障、保養工單</v-list-item-title>
        </v-list-item>

        <v-list-item to="/mmis/periodicity-job" class="white--text">
            <v-list-item-title>週期性工作提醒</v-list-item-title>
        </v-list-item>

        <v-list-item to="/mmis/work-shift" class="white--text">
            <v-list-item-title>工班管理</v-list-item-title>
        </v-list-item>
    </v-list-group>

    <!-- 維修外包管理 -->
    <v-list-item to="/mmis/c" class="white--text">
        <v-list-item-title>維修外包管理</v-list-item-title>
    </v-list-item>

    <!-- 統計分析 -->
    <v-list-group no-action sub-group>
        <template v-slot:activator>
            <v-list-item-title class="white--text">統計分析</v-list-item-title>
        </template>

        <v-list-item to="/mmis/d/a" class="white--text">
            <v-list-item-title>MTTR 分析</v-list-item-title>
        </v-list-item>

        <v-list-item to="/mmis/d/b" class="white--text">
            <v-list-item-title>MTBF 分析</v-list-item-title>
        </v-list-item>

        <v-list-item to="/mmis/d/c" class="white--text">
            <v-list-item-title>MKBF 分析</v-list-item-title>
        </v-list-item>
    </v-list-group>

    <!-- 報表管理 -->
    <v-list-group no-action sub-group>
        <template v-slot:activator>
            <v-list-item-title class="white--text">報表管理</v-list-item-title>
        </template>

         <v-list-item to="/mmis/e/a" class="white--text">
            <v-list-item-title>故障履歷</v-list-item-title>
        </v-list-item>

        <v-list-item to="/mmis/e/b" class="white--text">
            <v-list-item-title>維修工時履歷</v-list-item-title>
        </v-list-item>

        <v-list-item to="/mmis/e/c" class="white--text">
            <v-list-item-title>料件履歷</v-list-item-title>
        </v-list-item>

        <v-list-item to="/mmis/e/d" class="white--text">
            <v-list-item-title>維修費用</v-list-item-title>
        </v-list-item>
    </v-list-group>
</v-list-group>
</template>
