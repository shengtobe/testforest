<template>
<v-container>
    <h2 class="mb-4">{{ title }}</h2>

    <v-row>
        <v-col cols="12" md="6">
            <v-row class="px-2">
                <v-col cols="12" sm="4">
                    <h3 class="mb-1">
                        <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>上傳日期(起)
                    </h3>
                    <v-menu
                        v-model="dateMenuShow.start"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                v-model.trim="dateStart"
                                solo
                                v-on="on"
                                readonly
                                hide-details
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            color="purple"
                            v-model="dateStart"
                            @input="dateMenuShow.start = false"
                            locale="zh-tw"
                        ></v-date-picker>
                    </v-menu>
                </v-col>

                <v-col cols="12" sm="4">
                    <h3 class="mb-1">
                        <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>上傳日期(迄)
                    </h3>
                    <v-menu
                        v-model="dateMenuShow.end"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                v-model.trim="dateEnd"
                                solo
                                v-on="on"
                                readonly
                                hide-details
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            color="purple"
                            v-model="dateEnd"
                            @input="dateMenuShow.end = false"
                            locale="zh-tw"
                        ></v-date-picker>
                    </v-menu>
                </v-col>

                <v-col cols="12" sm="4" class="d-flex align-end">
                    <v-btn color="green" dark large class="mb-sm-1"
                        @click="search"
                    >
                        <v-icon class="mr-1">mdi-magnify</v-icon>查詢
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12" md="6">
            <v-form ref="uploadform">
                <v-row class="px-2">
                    <v-col cols="12" sm="8">
                        <h3 class="mb-1">
                            <v-icon class="mr-1 mb-1">mdi-file</v-icon>檔案上傳 
                        </h3>
                        <v-file-input
                            solo
                            placeholder="點此選擇檔案"
                            hide-details
                            @change="chfile"
                        ></v-file-input>
                    </v-col>

                    <v-col cols="12" sm="4" class="d-flex align-end">
                        <v-btn color="pink" dark large class="mb-sm-1"
                            @click="upload"
                        >
                            <v-icon class="mr-1">mdi-cloud-upload</v-icon>上傳
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-col>
    </v-row>
    
    <v-row class="px-2 mt-4">
        <v-col cols="12" sm="4" md="3">
            <h3 class="mb-1">
                <v-icon class="mr-1 mb-1">mdi-comment-processing</v-icon>關鍵字
            </h3>
            <v-text-field
                v-model.trim="keyword"
                placeholder="請輸入關鍵字"
                solo
                hide-details
            ></v-text-field>
        </v-col>

        <v-col cols="12">
            <v-card>
                <v-data-table
                    :search="keyword"
                    :headers="headers"
                    :items="tableItems"
                    :options.sync="pageOpt"
                    disable-sort
                    hide-default-footer
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:no-results>
                        <span class="red--text subtitle-1">沒有符合「{{ keyword }}」的資料</span>
                    </template>

                    
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
    
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { getNowFullTime } from '../../assets/js/commonFun'
import { uploadImgForm } from '../../apis/formManage'

export default {
    props: ['fid', 'dep', 'title'],  // 表單id、科室、標題 (值從路由傳進)
    data: () => ({
        dateStart: new Date().toISOString().substr(0, 10),  // 上傳日期(起)
        dateEnd: new Date().toISOString().substr(0, 10),  // 上傳日期(迄)
        dateMenuShow: {  // 日曆 menu 是否顯示
            start: false,  // 上傳日期(起)
            end: false,  // 上傳日期(迄)
        },
        keyword: '',  // 關鍵字
        tableItems: [],  // 表格資料
        pageOpt: { page: 1 },  // 目前頁數
        headers: [  // 表格顯示的欄位
            { text: '上傳日期', value: 'idx', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '姓名', value: 'name', align: 'left', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '檔案名稱', value: 'fid', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '查看', value: 'view', align: 'center', filterable: false, divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '刪除', value: 'del', align: 'center', filterable: false, divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
        upfile: '',  // 選擇中的檔案
    }),
    methods: {
        ...mapActions('system', [
            'chMsgbar',  // messageBar
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
        // 查詢資料
        search() {

        },
        // 更換頁數
        chPage(n) {
            this.pageOpt.page = n
        },
        // 更換檔案
        chfile(blob) {
            this.upfile = blob
        },
        // 上傳檔案
        upload() {
            if (this.upfile != '' && this.upfile != undefined) {
                // 檔案限制大小 5 M
                if (this.upfile.size > 1024 * 1024 * 5) {
                    alert('你的檔案不可超過 5 M')
                    return
                }

                this.chLoadingShow()

                let formData = new FormData()
                formData.append('uploadfile', this.upfile)
                
                uploadImgForm({
                    uid: 'kk123',  // 使用者id
                    fid: this.fid,  // 表單id
                    dep: this.dep,  // 科室
                    reqTime: getNowFullTime(),  // 請求時間
                    file: formData,  // 檔案(blob)
                }).then(res => {
                    this.chMsgbar({ success: true, msg: '上傳成功' })
                }).catch(err => {
                    console.log(err)
                    this.chMsgbar({ success: false, msg: '上傳失敗' })
                }).finally(() => {
                    this.chLoadingShow()
                })
            } else {
                alert('你還未選擇檔案!')
            }
        },
    },
}
</script>