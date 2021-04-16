<template>
<v-col cols="12">
    <h3 class="mb-1">
        <v-icon class="mr-1 mb-1">mdi-cloud-upload</v-icon>文件上傳
    </h3>
    <v-file-input
        label="請點此選擇要上傳的檔案"
        solo
        v-model="choseFiles"
        @change="select"
    ></v-file-input>
</v-col>
</template>

<script>
export default {
    data: () => ({
        choseFiles: null,  // 所選的檔案
    }),
    methods: {
        // 選擇檔案
        select(file) {
            if (file) {
                let reader = new FileReader()  // blob 用

                // 設定 reader 物件的 result 屬性，為 ArrayBuffer
                reader.readAsArrayBuffer(file)

                // 設定讀取完時的動作
                reader.onload = () => {
                    // 抓出副檔名
                    let nameArr = file.name.split('.')  // 用小數點拆成陣列
                    let type = (nameArr.length > 1) ? nameArr[nameArr.length - 1] : ''  // 若沒有副檔名傳空值
                    
                    let uploadFile = { fileName: file.name, fileType: type, unitData: Array.from(new Uint8Array(reader.result)) }
                    this.$emit('joinFile', uploadFile)
                }
            }
        },
    },
}
</script>
