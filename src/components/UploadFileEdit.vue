<template>
<v-col cols="12">
    <h3 class="mb-1">
        <v-icon class="mr-1 mb-1">mdi-cloud-upload</v-icon>檔案管理
    </h3>

    <v-row>
        <v-col cols="12" sm="8" md="10">
            <v-file-input
                hide-details
                label="請點此選要新增檔案"
                solo
                v-model="choseFile"
                @change="select"
                :disabled="uploadDisnable"
            >
                <template v-slot:selection="{ text }">
                    <v-chip small label color="primary" class="pa-4">{{ text }}</v-chip>
                </template>
            </v-file-input>
        </v-col>

        <v-col cols="12" sm="2">
            <v-btn large
                color="primary"
                @click="upload"
            >檔案上傳</v-btn>
        </v-col>

        <v-col cols="12" class="d-flex flex-wrap">
            <v-card
                v-for="(item, idx) in fileList"
                :key="item.fileName"
                elevation="4"
                class="mr-4 mt-3"
            >
                <div class="py-2 px-3">
                    <h4>{{ item.fileName }}</h4>
                </div>
                <v-card-actions>
                    <v-btn
                        color="info"
                        :href="item.link"
                        target="_blank"
                        rel="noopener norefferrer"
                        
                    >
                        <v-icon class="mr-1">mdi-file-document</v-icon>查看
                    </v-btn>

                    <v-btn
                        color="error"
                        
                        @click="delFile(item.id, idx)"
                    >
                        <v-icon class="mr-1">mdi-delete</v-icon>刪除
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</v-col>
</template>

<script>
export default {
    props: ['uploadDisnable', 'fileList'],  // props：是否disabled、檔案列表
    data: () => ({
        choseFile: null,  // 所選的檔案
    }),
    methods: {
        // 選擇檔案
        select(file) {
            this.choseFile = file
        },
        // 上傳檔案
        upload() {
            if (this.choseFile != null) {
                this.$emit('uploadFile', this.choseFile)
                this.choseFile = null
            }
        },
        // 刪除檔案
        delFile(id, idx) {
            this.$emit('deleteFile', id, idx)
        },
    }
}
</script>