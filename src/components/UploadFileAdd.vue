<template>
<v-col cols="12">
    <h3 class="mb-1">
        <v-icon class="mr-1 mb-1">mdi-cloud-upload</v-icon>{{ title }}
    </h3>

    <v-row>
        <v-col cols="12" sm="8" md="10">
            <v-file-input
                hide-details
                label="請點此選要上傳的檔案，選擇時可按 ctrl 或 shift 複選"
                solo
                multiple
                v-model="choseFiles"
                :clearable='true'
                @click:clear="deleting"
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
                @click="join"
            >加入檔案</v-btn>
        </v-col>

        <v-col cols="12" class="mt-2">
            <v-card flat>
                <v-card-title
                    class="purple lighten-3 py-2 px-3 white--text"
                    primary-title
                >
                    <h5>檔案列表</h5>
                </v-card-title>

                <v-row class="py-2 px-4">
                    <v-col cols="12" sm="6" md="3"
                        v-for="(item, idx) in fileList"
                        :key="item.name"
                    >
                        <v-card>
                            <v-img
                                contain
                                min-width="100%"
                                height="158"
                                :src="item.src"
                                class="grey lighten-2"
                            ></v-img>

                            <v-card-actions
                                class="my-1 mx-2 d-flex justify-space-between align-start"
                            >
                                <div style="width: calc(100% - 36px);">{{ item.name }}</div>

                                <v-icon large color="error"
                                    class="mr-n2"
                                    @click="del(idx)"
                                >mdi-close-circle</v-icon>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</v-col>
</template>

<script>
export default {
    props: ['uploadDisnable', 'fileList', 'title'],  // props：是否disabled(用於危害通報)、檔案列表、標題
    data: () => ({
        choseFiles: null,  // 所選的檔案
        urltxt: '',
        fileBuffer: [],
    }),
    methods: {
        deleting(){
            this.fileBuffer = [];
            this.choseFiles = null;
        },
        // 選擇檔案
        select(file) {
            this.choseFiles.forEach(oneFile => {
                let ff = this.fileBuffer.find(item => {
                        return item.name == oneFile.name && item.size == oneFile.size
                    })
                if(ff == undefined){
                    this.fileBuffer.push(oneFile)
                }
            });
            this.choseFiles = this.fileBuffer
        },
        // 加入要上傳的檔案
        join() {
            console.log("fileBuffer: ", this.fileBuffer)
            console.log("choseFiles: ", this.choseFiles)
            if (this.choseFiles.length > 0) {
                console.log("Enter join~~~~")
                // 已加入的檔案不重覆增加
                this.choseFiles.forEach(ele => {
                    let file = this.fileList.find(item => {
                        return item.name == ele.name && item.size == ele.size
                    })

                    if (file == undefined) {
                        let reader = new FileReader()  // blob 用
                        let reader2 = new FileReader()  // 產生縮圖用

                        // --------- 上傳後端的 blob 資料處理 -------------
                        // 設定 reader 物件的 result 屬性，為 ArrayBuffer
                        reader.readAsArrayBuffer(ele)

                        // 設定讀取完時的動作
                        reader.onload = () => {
                            // 抓出副檔名
                            let nameArr = ele.name.split('.')  // 用小數點拆成陣列
                            let type = (nameArr.length > 1) ? nameArr[nameArr.length - 1] : ''  // 若沒有副檔名傳空值
                            
                            this.$emit('joinFile', { FileName: ele.name, FileType: type, UnitData: Array.from(new Uint8Array(reader.result)) }, true)
                        }
                        
                        // --------- 縮圖資料處理 -------------
                        if (['image/png', 'image/jpeg', 'image/gif'].includes(ele.type)) {
                            // ------ 若是圖片------ 
                            // 設定 reader 物件的 result 屬性，為圖片 base64 資料 (用於圖片縮圖)
                            reader2.readAsDataURL(ele)

                            // 設定讀取完圖片時的動作
                            reader2.onload = () => {
                                ele.src = reader2.result
                                this.$emit('joinFile', { name: ele.name, src: ele.src }, false)  // 將檔案資料傳送至父組件
                            }
                        } else {
                            // ------ 其他類型檔案 ------ 
                            ele.src = '/images/file.jpg'
                            this.$emit('joinFile', { name: ele.name, src: ele.src }, false)  // 將檔案資料傳送至父組件
                        }
                    }
                })
                this.fileBuffer = [];
                this.choseFiles = null;
            }
        },
        // 移除要上傳的檔案
        del(idx) {
            this.$emit('rmFile', idx)
        },
    },
}
</script>