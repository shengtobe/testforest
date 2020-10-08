<template>
<v-container style="max-width: 1200px">
    <v-row class="px-2 mb-8">
        <!-- 表單填報 -->
        <v-col cols="12" md="6" class="mb-8">
            <v-card class="mx-auto">
                <v-card-title class="green accent-1 py-2 px-3">
                    <v-icon class="mr-2">mdi-pen</v-icon>
                    <strong>表單填報</strong>
                </v-card-title>

                <v-list class="pa-0">
                    <v-list-item to="/smis/car-safe-performance/moto-dynamo">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        機車行駛公里及發電機工時
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/car-safe-performance/machine-abnormal">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        軔機檢查異常表
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/car-safe-performance/health-abnormal">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        酒測、健康檢查異常表
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/car-safe-performance/speed-abnormal">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        車速異常表
                    </v-list-item>
                </v-list>
            </v-card>
        </v-col>

        <!-- 趨勢圖 -->
        <v-col cols="12" md="6">
            <v-card class="mx-auto">
                <v-card-title class="yellow lighten-3 py-2 px-3">
                    <v-icon class="mr-2">mdi-chart-areaspline</v-icon>
                    <strong>統計趨勢圖</strong>
                </v-card-title>

                <v-list class="pa-0">
                    <v-list-item to="/smis/car-accident-event/maintype-chart">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        MTBF
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/car-accident-event/maintype-chart">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        MKBF
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/car-accident-event/abnormaltype-chart">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        MTTR
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/car-accident-event/majortype-chart">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        事故事件年趨勢指標
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/car-accident-event/generaltype-chart">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        事故事件月趨勢指標
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/car-safe-performance/crawl-notify">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        慢行通報紀錄
                    </v-list-item>
                </v-list>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>