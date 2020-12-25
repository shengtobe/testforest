<template>
<v-app id="page404">
    <v-container>
        <v-row justify="center" class="mt-12">
            <v-col cols="12" sm="6" md="4">
                <v-alert
                    text
                    class="text-center"
                    color="error"
                    border="top"
                >
                    <h2 class="mb-3">Error Code： {{ errCode }}</h2>
                    <p class="mb-5">{{ msg }}</p>

                    <v-btn dark class="ma-2"
                        @click="closeWindow"
                    >關閉視窗</v-btn>
                </v-alert>
            </v-col>
        </v-row>
    </v-container>
</v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data: () => ({
        errCode: '',
        msg: '',
    }),
    methods: {
        ...mapActions('system', [
            'closeWindow',  // 關閉視窗
        ]),
    },
    created() {
        if (sessionStorage.getItem('errData') !== null) {
            let obj = JSON.parse(sessionStorage.getItem('errData'))
            
            this.errCode = obj.errCode  // 錯誤代碼
            this.msg = obj.msg  // 錯誤訊息

            sessionStorage.removeItem('errData')  // 清除 sessionStorage
        }
    }
}
</script>