<template>
<v-col cols="12" class="mt-8">
    <h3 class="mb-1">
        <v-icon class="mr-1 mb-1">mdi-view-list</v-icon>請修項目
    </h3>

    <v-card flat>
        <v-data-table
            :headers="headers"
            :items="tableItems"
            disable-sort
            disable-filtering
            hide-default-footer
        >
            <template v-slot:no-data>
                <span class="red--text subtitle-1">沒有資料</span>
            </template>
        
            <!-- 插入 total 欄位做每筆的總計 -->
            <template v-slot:item.total="{ item }">
                <span>{{ item.ServiceCount * item.ServicePrice }}</span>
            </template>

            <template v-slot:footer>
                <v-divider></v-divider>

                <p class="py-2 text-center">
                    總金額： <span class="red--text">{{ totalMoney }}</span>
                </p>
            </template>
        </v-data-table>
    </v-card>
</v-col>
</template>

<script>
export default {
    props: ['tableItems'],
    data: () => ({
        headers: [  // 表格顯示的欄位
            { text: '項次', value: 'numbers', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '工項(項目)', value: 'ServiceItem', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '規格', value: 'ServiceSpec', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '單位', value: 'ServiceUnit', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '預估數量', value: 'ServiceCount', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '單價', value: 'ServicePrice', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
            { text: '總價', value: 'total', align: 'center', divider: true, class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
        ],
    }),
    computed: {
        // 全部的總金額
        totalMoney() {
            return this.tableItems.reduce((a,b)=>a + b.ServiceCount * b.ServicePrice, 0)
        },
    },
    created() {
        
    }
}
</script>