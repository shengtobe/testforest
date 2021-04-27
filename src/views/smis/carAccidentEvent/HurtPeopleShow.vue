<template>
<div>
    <v-row no-gutters class="mb-8">
        <v-col cols="12" class="mt-10 label-header">
            <h3>
                <v-icon class="mr-1 mb-2">mdi-hospital-building</v-icon>
                <span class="mr-2">死傷人數：</span>{{ deathCount }}
            </h3>
        </v-col>
        
        <v-col cols="12" v-if="deathCount > 0">
            <v-card flat>
                <v-data-table
                    :headers="headers"
                    :items="tableItems"
                    disable-sort
                    disable-filtering
                    hide-default-footer
                    class="theme-table"
                >
                    <template v-slot:no-data>
                        <span class="red--text subtitle-1">沒有資料</span>
                    </template>

                    <template v-slot:loading>
                        <span class="red--text subtitle-1">資料讀取中...</span>
                    </template>

                    <template v-slot:item.info="{ item }">
                        <v-btn fab small dark class="btn-detail"
                            @click="view(item)"
                        >
                            <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>

        <!-- 個人資料 dialog -->
        <v-dialog v-model="infoShow" max-width="500px">
            <v-card class="theme-card">
                <v-card-title class="px-4 py-1">
                    詳細資料
                    <v-spacer></v-spacer>
                    <v-btn fab small text @click="infoShow = false" class="mr-n2">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>

                <div class="px-4 py-3 label-header">
                    <v-row no-gutters>
                        <v-col cols="12">
                            <v-icon class="mr-1 mb-1">mdi-human-male-female</v-icon>
                            姓別： {{ info.PeopleSex }}
                        </v-col>
                    
                        <v-col cols="12">
                            <v-divider class="mt-2 mb-3"></v-divider>
                        </v-col>

                        <v-col cols="12">
                            <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>
                            生日： {{ info.convert_birthDate }}
                        </v-col>

                        <v-col cols="12">
                            <v-divider class="mt-2 mb-3"></v-divider>
                        </v-col>

                        <v-col cols="12">
                            <v-icon class="mr-1 mb-1">mdi-phone-classic</v-icon>
                            電話： {{ info.PeoplePhone }}
                        </v-col>
                        
                        <v-col cols="12">
                            <v-divider class="mt-2 mb-3"></v-divider>
                        </v-col>

                        <v-col cols="12">
                            <v-icon class="mr-1 mb-1">mdi-map-marker</v-icon>
                            地址： {{ info.PeopleAddress }}
                        </v-col>
                    </v-row>
                </div>
            </v-card>
        </v-dialog>
    </v-row>
</div>
</template>

<script>
export default {
    props: ['tableItems', 'deathCount'],
    data: () => ({
        headers: [  // 表格顯示的欄位
            { text: '姓名', value: 'PeopleName', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
            { text: '個人資料', value: 'info', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
            { text: '傷亡種類', value: 'HurtType', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
            { text: '收治醫院', value: 'SetHospital', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 150 },
            { text: '賠償金額', value: 'Reparation', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 100 },
            { text: '保險註記', value: 'SafeRemark', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 150 },
            { text: '備註', value: 'Remark', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold', width: 150 },
        ],
        infoShow: false,  // 個人資料 dialog 是否顯示
        info: {},  // 個人資料
    }),
    methods: {
        // 顯示個人資料
        view(item) {
            this.infoShow = true
            this.info = { ...item }
        },
    },
}
</script>
