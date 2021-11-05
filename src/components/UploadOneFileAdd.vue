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
import { uploadFile } from "@/apis/formManage/serve";
import { mapState, mapActions } from "vuex";
import { getNowFullTime } from "@/assets/js/commonFun";
export default {
    props:['TableKey'],
    data: () => ({
        choseFiles: null,  // 所選的檔案
        fileToUpload: null,
    }),
    computed: {
        ...mapState("user", {
            userData: (state) => state.userData, // 使用者基本資料
        }),
    },
    methods: {
        ...mapActions("system", [
            "chMsgbar", // messageBar
        ]),
        // 選擇檔案
        select(file) {
            const that = this
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
                    that.fileToUpload = uploadFile
                    this.$emit('joinFile', uploadFile)
                }
            }
        },
        uploadFile() {
            const that = this
            if(that.fileToUpload) {
                let fileCount = []
                fileCount.push(that.fileToUpload)
                uploadFile({
                    ClientReqTime: getNowFullTime(), // client 端請求時間
                    OperatorID: that.userData.UserId, // 操作人id
                    KeyName: that.TableKey,
                    FileCount: fileCount
                }).then(res=>{
                    if(res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '檔案上傳成功！' })
                    } else {
                        console.warn(res.data.Msg);
                        this.chMsgbar({ success: false, msg: '檔案上傳失敗！請重新上傳' })
                    }
                }).catch(err=>{
                    console.warn(err);
                    this.chMsgbar({ success: false, msg: '檔案上傳失敗！請重新上傳' })
                })
            }
        }
    },
}
</script>
