<template>
    <v-col cols="12">
        <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-cloud-upload</v-icon>{{ title }}
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
                    class="btn-memo white--text"
                    @click="upload"
                >檔案上傳</v-btn>
            </v-col>

            <!-- 檔案 -->
            <v-col
                cols="12"
                class="mb-n4"
                v-for="(item, i) in fileList"
                :key="(item.fileName == undefined)? item.FileName : item.fileName"
            >
                <v-row class="mx-2 elevation-4">
                    <v-col cols="12" md="8" class="white">
                        <v-icon>mdi-file-document</v-icon>
                        {{ (item.fileName == undefined)? item.FileName : item.fileName }}
                    </v-col>

                    <v-col cols="12" md="4" class="white text-right">
                        <v-btn
                            dark
                            small
                            :href="(item.link == undefined)? item.FileFullPath : item.link"
                            :download="(item.fileName == undefined)? item.FileName : item.fileName"
                            class="mr-3 btn-modify"
                        >下載</v-btn>

                        <v-btn
                            small
                            class="btn-delete white--text"
                            @click="delFile(i)"
                        >刪除</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
export default {
    props: ['uploadDisnable', 'fileList', 'title'],  // props：是否disabled、檔案列表
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
                let reader = new FileReader()  // blob 用

                // 設定 reader 物件的 result 屬性，為 ArrayBuffer
                reader.readAsArrayBuffer(this.choseFile)

                // 設定讀取完時的動作
                reader.onload = () => {
                    // 抓出副檔名
                    let nameArr = this.choseFile.name.split('.')  // 用小數點拆成陣列
                    let type = (nameArr.length > 1) ? nameArr[nameArr.length - 1] : ''  // 若沒有副檔名傳空值
                    
                    // 組合要給後端的資料
                    let fileArr = [{ FileName: this.choseFile.name, FileType: type, UnitData: Array.from(new Uint8Array(reader.result)) }]
                    
                    this.$emit('uploadFile', fileArr)
                    this.choseFile = null
                }
            }
        },
        // 刪除檔案
        delFile(idx) {
            this.$emit('deleteFile', idx)
        },
    }
}
</script>