<template>
<v-list-group no-action>
    <template v-slot:prependIcon>
        <!-- <v-icon color="purple lighten-2">mdi-cube</v-icon> -->
        <v-icon>mdi-cube</v-icon>
    </template>

    <template v-slot:activator>
        <v-list-item-title class="white--text">安全資訊管理</v-list-item-title>
    </template>

    <!-- 危害通報 -->
    <v-list-group no-action sub-group>
        <template v-slot:activator>
            <v-list-item-title class="white--text">危害通報管理</v-list-item-title>
        </template>

        <v-list-item to="/smis/harmnotify/notify" class="white--text">
            <v-list-item-title>危害通報</v-list-item-title>
        </v-list-item>

        <v-list-item to="/smis/harmnotify/audit" class="white--text">
            <v-list-item-title>危害通報審核</v-list-item-title>
        </v-list-item>
    </v-list-group>

    <!-- 事故事件 -->
    <v-list-item to="/smis/car-accident-event" class="white--text">
        <v-list-item-title>行車事故事件</v-list-item-title>
    </v-list-item>

    <!-- 危害資料庫 -->
    <v-list-group no-action sub-group>
        <template v-slot:activator>
            <v-list-item-title class="white--text">行車危害資料庫</v-list-item-title>
        </template>

        <v-list-item to="/smis/car-harmdb/harms" class="white--text">
            <v-list-item-title>行車危害</v-list-item-title>
        </v-list-item>

        <v-list-item to="/smis/car-harmdb/control-measures" class="white--text">
            <v-list-item-title>控制措施</v-list-item-title>
        </v-list-item>
    </v-list-group>

    <!-- 安全資訊 -->
    <v-list-group no-action sub-group>
        <template v-slot:activator>
            <v-list-item-title class="white--text">行車安全資訊</v-list-item-title>
        </template>

        <v-list-item to="/smis/car-safeinfo/info" class="white--text">
            <v-list-item-title>安全資訊</v-list-item-title>
        </v-list-item>

        <v-list-item to="/smis/car-safeinfo/crawl-notify" class="white--text">
            <v-list-item-title>慢行通報</v-list-item-title>
        </v-list-item>
    </v-list-group>

    <!-- 安全文件 -->
    <v-list-group no-action sub-group>
        <template v-slot:activator>
            <v-list-item-title class="white--text">安全文件</v-list-item-title>
        </template>

         <v-list-item to="/smis/safefile/meeting" class="white--text">
            <v-list-item-title>安全會議文件</v-list-item-title>
        </v-list-item>

        <v-list-item to="/smis/safefile/driving-annex" class="white--text">
            <v-list-item-title>行車事故事件附件</v-list-item-title>
        </v-list-item>

        <v-list-item to="/smis/safefile/regulations" class="white--text">
            <v-list-item-title>規章文件</v-list-item-title>
        </v-list-item>
    </v-list-group>

    <!-- 安全績效 -->
    <v-list-item to="/smis/car-safe-performance" class="white--text">
        <v-list-item-title>行車安全績效</v-list-item-title>
    </v-list-item>

    <!-- 職安 -->
    <v-list-group no-action sub-group>
        <template v-slot:activator>
            <v-list-item-title class="white--text">職安管理</v-list-item-title>
        </template>

        <v-list-item to="/smis/jobsafety/disaster-survey-add" class="white--text">
            <v-list-item-title>職業災害事故調查表</v-list-item-title>
        </v-list-item>

         <v-list-item to="/smis/jobsafety/disaster-survey" class="white--text">
            <v-list-item-title>職災事故管理</v-list-item-title>
        </v-list-item>

        <v-list-item to="/smis/jobsafety/disasterdb" class="white--text">
            <v-list-item-title>職災危害資料庫</v-list-item-title>
        </v-list-item>

        <v-list-item to="/smis/jobsafety/performance" class="white--text">
            <v-list-item-title>職安績效</v-list-item-title>
        </v-list-item>

        <v-list-item to="/smis/jobsafety/physical" class="white--text">
            <v-list-item-title>健檢管理</v-list-item-title>
        </v-list-item>

        <v-list-item to="/smis/jobsafety/license" class="white--text">
            <v-list-item-title>證照管理</v-list-item-title>
        </v-list-item>
    </v-list-group>

</v-list-group>
</template>
