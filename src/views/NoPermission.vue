<template>
<v-app id="page404">
    <v-container>
        <v-row justify="center" class="mt-12">
            <v-col cols="12" sm="4">
                <v-alert
                    text
                    class="text-center"
                    color="error"
                    border="top"
                >
                    <h1>權限不足</h1>
                    你並無操作此頁面的權限
                </v-alert>
            </v-col>
        </v-row>
    </v-container>
</v-app>
</template>