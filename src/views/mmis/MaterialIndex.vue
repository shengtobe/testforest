<template>
<v-container style="max-width: 1200px;">
    <h2 class="mb-4"> </h2>
    <v-row class="px-2 mb-8">
        <!-- 表單填報 -->
        <v-col cols="12" md="2" class="mb-8"/>
        <v-col cols="12" md="8" class="mb-8">
            <v-card class="mx-auto">
                <v-card-title class="green accent-1 py-2 px-3">
                    <v-icon class="mr-2">mdi-pen</v-icon>
                    <strong>料件管理</strong>
                </v-card-title>

                <v-list class="pa-0">
                    <v-list-item to="/mmis/material/material-spec">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        料件規格管理
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/mmis/material/material-inventory">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        料件庫存管理
                    </v-list-item>
                    <v-divider></v-divider>
                     <v-list-item to="/mmis/material/material-requistision">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        料件移存管理
                    </v-list-item>
                </v-list>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>