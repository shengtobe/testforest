<template>
<v-container style="max-width: 1200px">
    <h2 class="mb-4 label-title">職安績效管理</h2>

    <v-row class="px-2 mb-8 label-header">
        <!-- 趨勢圖 -->
        <v-col cols="12">
            <v-card class="mx-auto">
                <v-card-title class="yellow lighten-3 py-2 px-3">
                    <v-icon class="mr-2">mdi-chart-areaspline</v-icon>
                    <strong>統計圖</strong>
                </v-card-title>

                <v-list class="pa-0">
                    <v-list-item to="/smis/jobsafety/performance/harm-type-chart">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        職災傷害類型統計(含交通職災)
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/jobsafety/performance/depart-accident-chart">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        科室職災事故統計(含交通職災)
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/jobsafety/performance/job-injury">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        職能傷害率
                    </v-list-item>
                </v-list>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>