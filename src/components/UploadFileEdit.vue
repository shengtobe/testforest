<template>
<v-col cols="12">
    <h3 class="mb-1">
        <v-icon class="mr-1 mb-1">mdi-cloud-upload</v-icon>檔案管理
    </h3>

    <v-row>
        <v-col cols="12" sm="8">
            <v-file-input
                hide-details
                label="請點此選擇要新增的檔案"
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

        <v-col cols="12" sm="2" class="text-right text-md-left">
            <v-btn large
                color="primary"
                @click="upload"
            >檔案上傳</v-btn>
        </v-col>

        <!-- 檔案 -->
        <v-col
            cols="12"
            sm="6"
            v-for="(item, i) in fileList"
            :key="item.fileName"
        >
            <v-row class="mx-2 elevation-4">
                <v-col cols="12" md="8" class="white">
                    <v-icon>mdi-file-document</v-icon>
                    {{ item.fileName }}
                </v-col>

                <v-col cols="12" md="4" class="white text-right">
                    <v-btn
                        dark
                        small
                        color="teal"
                        :href="item.link"
                        :download="item.fileName"
                        class="mr-3"
                    >查看</v-btn>

                    <v-btn
                        small
                        color="error"
                        @click="delFile(item.id, i)"
                    >刪除</v-btn>
                </v-col>
            </v-row>
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