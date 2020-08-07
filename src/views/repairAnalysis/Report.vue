<template>
<!-- <p>報表</p> -->
<v-row>
    <!-- 樣式一 -->
    <v-col cols="12" sm="6">
        <v-card outlined tile>
            <v-card-title>
                <v-icon class="mr-2 pink--text">mdi-cloud-upload</v-icon>
                表單上傳
            </v-card-title>
            <v-card-text class="px-5">
                <v-text-field
                    label="姓名"
                    v-model="ipt.name"
                    readonly
                ></v-text-field>

                <v-text-field
                    label="主題"
                    v-model="ipt.subject"
                ></v-text-field>

                <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="ipt.date"
                            label="日期"
                            readonly
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="ipt.date"
                        @input="menu = false"
                        color="purple darken-1"
                        locale="zh-tw"
                        
                    ></v-date-picker>
                </v-menu>

                <v-file-input
                    prepend-icon="mdi-file-image"
                    show-size
                    label="選擇圖片"
                    @change="selectfile"
                ></v-file-input>
            </v-card-text>
            <v-card-actions class="px-5 mb-3">
                <v-btn color="success white--text">送出</v-btn>
            </v-card-actions>
        </v-card>
    </v-col>

    <!-- 樣式二 -->
    <v-col cols="12" sm="6">
        <v-card outlined tile>
            <v-card-title>
            <v-icon class="mr-2 pink--text">mdi-cloud-upload</v-icon>
                表單上傳
            </v-card-title>
            <v-card-text class="px-5">
                <v-text-field
                    label="姓名"
                    v-model="ipt.name"
                    readonly
                ></v-text-field>

                <v-text-field
                    label="主題"
                    v-model="ipt.subject2"
                ></v-text-field>

                <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="ipt.date2"
                            label="日期"
                            readonly
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="ipt.date2"
                        @input="menu2 = false"
                        color="purple darken-1"
                        locale="zh-tw"
                        
                    ></v-date-picker>
                </v-menu>

                <v-row no-gutters>
                    <v-col cols="12" sm="2" class="subtitle-1 font-weight-regular" align-self="center">
                        項目 A
                    </v-col>
                    <v-col cols="12" sm="10">
                        <v-radio-group row>
                            <v-radio
                                v-for="n in 5"
                                :key="n"
                                :label="`${n}分`"
                                :value="n"
                            ></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col cols="12" sm="2" class="subtitle-1" align-self="center">
                        項目 B
                    </v-col>
                    <v-col cols="12" sm="10">
                        <v-radio-group row>
                            <v-radio
                                v-for="n in 5"
                                :key="n"
                                :label="`${n}分`"
                                :value="n"
                            ></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col cols="12" sm="2" class="subtitle-1" align-self="center">
                        項目 C
                    </v-col>
                    <v-col cols="12" sm="10">
                        <v-radio-group row>
                            <v-radio
                                v-for="n in 5"
                                :key="n"
                                :label="`${n}分`"
                                :value="n"
                            ></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col cols="12" sm="2" class="subtitle-1" align-self="center">
                        項目 D
                    </v-col>
                    <v-col cols="12" sm="10">
                        <v-radio-group row>
                            <v-radio
                                v-for="n in 5"
                                :key="n"
                                :label="`${n}分`"
                                :value="n"
                            ></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>

                <v-row no-gutters>
                    <v-col cols="12" sm="2" class="subtitle-1" align-self="center">
                        項目 E
                    </v-col>
                    <v-col cols="12" sm="10">
                        <v-radio-group row>
                            <v-radio
                                v-for="n in 5"
                                :key="n"
                                :label="`${n}分`"
                                :value="n"
                            ></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="px-5 mb-3">
                <v-btn color="success white--text">送出</v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</v-row>
</template>

<script>
export default {
    data: () => ({
        menu: false,  // 時間選單是否顯示
        menu2: false,  // 時間選單是否顯示
        ipt: {
            name: JSON.parse(localStorage.getItem('user')).name,
            subject: '',
            date: new Date().toISOString().substr(0, 10),
            subject2: '',
            date2: new Date().toISOString().substr(0, 10),
        }
    }),
    methods: {
        // 選擇檔案時
        selectfile(blob) {
            if (!blob) return

            console.log('檔名：'+ blob.name)  // 查看 blob 的檔名
            console.log('類型：'+ blob.type)  // 查看 blob 的檔案類型
            console.log('大小 (byte)：'+ blob.size)  // 查看 blob 的大小 (byte)
            
            /* 用 formData 做 Ajax
            let uploadFile = blob
            let fomr_data = new formData()
            fomr_data.append('file', uploadFile)

            axios({
                method: 'post',
                url: '/upload',
                data: form_data,
                headers: {'Content-Type': 'multipart/form-data' }  // axios 預設是 json，所以要改
            })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
            */
        }
    },
}
</script>