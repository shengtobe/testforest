<template>
<v-col cols="12">
    <h3 class="mb-1">
        <v-icon class="mr-1 mb-1">mdi-cloud-upload</v-icon>附件上傳
    </h3>

    <v-row>
        <v-col cols="12" sm="8" md="10">
            <v-file-input
                hide-details
                label="請點此選要上傳的檔案，選擇時可按 ctrl 或 shift 複選"
                solo
                multiple
                v-model="choseFiles"
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
                @click="join"
            >加入檔案</v-btn>
        </v-col>

        <v-col cols="12" class="d-flex flex-wrap align-center">
            <span class="font-weight-bold mt-1">已加入的檔案：</span>
            <v-chip
                v-for="(item, idx) in fileList"
                :key="item.name"
                class="mr-3 mt-2"
                label
                color="teal"
                dark
            >
                {{ item.name }} 
                <v-icon right
                    @click="del(idx)"
                >mdi-close-circle</v-icon>
            </v-chip>
        </v-col>
    </v-row>
</v-col>
</template>

<script>
export default {
    props: ['uploadDisnable', 'fileList'],  // props：是否disabled、檔案列表
    data: () => ({
        choseFiles: null,  // 所選的檔案
    }),
    methods: {
        // 選擇檔案
        select(file) {
            this.choseFiles = file
        },
        // 加入要上傳的檔案
        join() {
            if (this.choseFiles != null) {
                // 已加入的檔案不重覆增加
                this.choseFiles.forEach(ele => {
                    let file = this.fileList.find(item => {
                        return item.name == ele.name && item.size == ele.size
                    })

                    // 若已加入列表中沒找到檔案則加入
                    if (file == undefined) this.$emit('joinFile', ele)
                })
                this.choseFiles = null
            }
        },
        // 移除要上傳的檔案
        del(idx) {
            this.$emit('rmFile', idx)
        },
    }
}
</script>