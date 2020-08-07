<template>
<v-row class="px-4 mb-4">
    <v-col v-for="n in 2" :key="n" class="py-0">  <!-- py-0 讓手機版時上下距離一致 -->
        <v-row>
            <v-col
                cols="12"
                v-for="(item, index) in ((n%2 == 1)? leftItems : rightItems)"
                :key="index"
            >
                <v-card>
                    <v-toolbar flat dense dark :color="item.barColor">
                        <v-toolbar-title>{{ item.barTitle }}</v-toolbar-title>
                    </v-toolbar>

                    <v-list-item-group>
                        <template v-for="(list, idx) in item.lists">
                            <v-list-item :key="list.title" :to="list.to">
                                <!-- 用文字顏色追蹤制作進度 -->
                                <v-list-item-content class="green--text darken-4" v-if="list.status == 1">
                                    <v-list-item-title>{{ list.title }}</v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-content v-else>
                                    <v-list-item-title>{{ list.title }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider
                                v-if="idx + 1 < item.lists.length"
                                :key="idx"
                            ></v-divider>
                        </template>
                    </v-list-item-group>
                </v-card>
            </v-col>
        </v-row>
    </v-col>
</v-row>
</template>

<script>
export default {
    data: () => ({
        items: [
            {
                barTitle: '修理工廠 黏sir',
                barColor: 'teal',
                algin: 'left',  // algin 屬性決定在左、右
                lists: [
                    { title: 'SL-31進廠維修紀錄', to: '/demoform/sl-31', status: 0 },
                    { title: '柴油機車二級檢修紀錄表', to: '', status: 0 },
                    { title: '柴油機車三級檢修紀錄表', to: '', status: 0 },
                    { title: '柴油機車四級檢修紀錄表', to: '', status: 0 },
                    { title: 'DL-40檢修車歷卡', to: '', status: 0 },
                    { title: '手攜無線電月份保養紀錄表', to: '', status: 0 },
                    { title: '客貨車車輪輪緣高度厚度檢查紀錄表', to: '', status: 0 },
                    { title: '客貨車二級檢修(整備檢查)記錄表', to: '', status: 0 },
                    { title: '客貨車三級檢修紀錄表', to: '', status: 0 },
                    { title: '阿里山森林鐵路客貨車四級檢修(臨時檢修)', to: '', status: 0 },
                    { title: '平交道故障維修程序紀錄表', to: '', status: 0 },
                    { title: '平交道異常種類統計表', to: '', status: 0 },
                    { title: '平交道維修保養紀錄表(月)', to: '', status: 0 },
                    { title: '平交道功能檢查紀錄表(月)', to: '', status: 0 },
                ]
            },
            {
                barTitle: '監工區 龔sir',
                barColor: 'pink lighten-1',
                algin: 'left',
                lists: [
                    { title: '影響、列管木月檢查', to: '', status: 0 },
                    { title: '抽換軌枕作業自主檢查表', to: '', status: 0 },
                    { title: '抽換鋼軌作業自主檢查表', to: '', status: 0 },
                    { title: '抽換道岔作業自主檢查表', to: '', status: 0 },
                    { title: '道岔維護檢查表', to: '', status: 0 },
                    { title: '道班養路計畫月報表', to: '', status: 0 },
                    { title: '道班養路實施月報表', to: '', status: 0 },
                    { title: '路線月檢查計畫實施表', to: '', status: 0 },
                    { title: '路線季檢查計畫實施表', to: '', status: 0 },
                    { title: '隨乘機車、列車巡查路線紀錄表', to: '', status: 0 },
                    { title: '朝巡安全檢查紀錄', to: '', status: 0 },
                    { title: '基地台無線電機月份保養紀錄表', to: '', status: 0 },
                    { title: '手提無線電機月份保養紀錄表', to: '', status: 0 },
                    { title: '人工砸道作業自主檢查表', to: '', status: 0 },
                    { title: '路線養護工作量化統計表', to: '', status: 0 },
                    { title: '路線檢查異常改善追蹤表', to: '', status: 0 },
                    { title: '單位材料領用單', to: '', status: 0 },
                    { title: '材料庫存月報表', to: '', status: 0 },
                    { title: '材料調撥單', to: '', status: 0 },
                    { title: '內部通報單', to: '', status: 0 },
                    { title: '路線設備車輛維修管制單', to: '', status: 0 },
                    { title: '鐵路橋梁目視安全檢查表', to: '', status: 0 },
                    { title: '鐵路隧道目視安全檢查表', to: '', status: 0 },
                    { title: '段內沿線朝巡安全檢查紀錄表', to: '', status: 0 },
                ]
            },
            {
                barTitle: '服務科',
                barColor: 'purple',
                algin: 'left',
                lists: [
                    { title: '表5市定古蹟阿里山鐵路北門驛異常現象處理紀錄表', to: '', status: 0 },
                    { title: '表4市定古蹟阿里山鐵路北門驛每半年保養工作紀錄表', to: '', status: 0 },
                    { title: '表3市定古蹟阿里山鐵路北門驛每月保養工作紀錄表', to: '', status: 0 },
                    { title: '表2市定古蹟阿里山鐵路北門驛每週保養工作紀錄表', to: '', status: 0 },
                    { title: '表1市定古蹟阿里山鐵路北門驛每日保養工作紀錄表', to: '', status: 0 },
                    { title: '林務局森林育樂場域颱風防災整備檢查表', to: '', status: 0 },
                    { title: '旅客受傷處理紀錄表', to: '', status: 0 },
                    { title: '列車車長報告', to: '', status: 0 },
                ]
            },
            {
                barTitle: '車庫 陳sir',
                barColor: 'blue darken-4',
                algin: 'right',
                lists: [
                    { title: '客貨車使用前後保養日報表', to: '', status: 0 },
                    { title: '柴油機車XX號行車保養日報表', to: '', status: 0 },
                    { title: '機車軔缸漏氣量檢測紀錄表', to: '', status: 0 },
                    { title: '機車車輪輪緣高度厚度檢查紀錄表', to: '', status: 0 },
                    { title: '轉轍器檢查紀錄表', to: '', status: 0 },
                    { title: '搶修車設備定期保養紀錄表', to: '', status: 0 },
                    { title: '客車軔缸漏氣量檢測紀錄表', to: '', status: 0 },
                    { title: '客貨車車輪輪緣高度厚度檢查紀錄表', to: '', status: 0 },
                    { title: '基地台無線電機月份保養紀錄表', to: '', status: 0 },
                    { title: '手提無線電機月份保養紀錄表', to: '', status: 0 },
                    { title: '行車事故報告', to: '', status: 0 },
                    { title: '柴油機車一級檢修紀錄表', to: '', status: 0 },
                    { title: '客車一級檢修紀錄表', to: '', status: 0 },
                    { title: '貨車一級檢修紀錄表', to: '', status: 0 },
                    { title: '客貨車輛狀態日報表', to: '', status: 0 },
                    { title: '客車廂車輪探傷檢查紀錄', to: '', status: 0 },
                    { title: 'XX車庫勤務表', to: '', status: 0 },
                    { title: '動力車狀態日報表', to: '', status: 0 },
                    { title: '平交道故障維修程序紀錄表', to: '', status: 0 },
                ]
            },
            {
                barTitle: '秘書室職安',
                barColor: 'orange',
                algin: 'right',
                lists: [
                    { title: '過負荷作業防護計畫檢核表', to: '', status: 0 },
                    { title: '職業安全衛生過勞量表', to: '', status: 0 },
                    { title: '心理健康量表', to: '', status: 0 },
                    { title: '母性健康保護工作場所環境及作業危害評估表', to: '', status: 0 },
                    { title: '母性健康保護面談及工作適性安排建議表', to: '', status: 0 },
                    { title: '妊娠及分娩後未滿一年之勞工健康情形自我評估表', to: '', status: 0 },
                    { title: '妊娠及分娩後未滿一年勞工之健康及工作適性評估建議表', to: '', status: 0 },
                    { title: '母性健康保護執行紀錄表', to: '', status: 0 },
                    { title: '肌肉骨骼症狀調查表', to: '', status: 0 },
                    { title: '肌肉骨胳症狀調查與管控追蹤一覽表', to: '', status: 0 },
                    { title: '肌肉骨骼傷病調查一覽表', to: '', status: 0 },
                    { title: '簡易人因工程檢核表', to: '', status: 0 },
                    { title: '肌肉骨骼傷病人因工程改善管控追蹤一覽表', to: '', status: 0 },
                    { title: '職場不法侵害預防之危害辨識及風險評估表', to: '', status: 0 },
                    { title: '職場不法侵害通報及處置表', to: '', status: 0 },
                    { title: '工作者遭遇職場不法侵害事件追蹤調查報告表', to: '', status: 0 },
                    { title: '職場不法侵害預防措施查核及評估表', to: '', status: 0 },
                    { title: '勞工健康服務紀錄', to: '', status: 0 },
                    { title: '4級健檢', to: '', status: 0 },
                ]
            },
        ]
    }),
    computed: {
        // 左邊的資料
        leftItems() {
            return this.items.filter(item => {
                return item.algin == 'left'
            })
        },
        // 右邊的資料
        rightItems() {
            return this.items.filter(item => {
                return item.algin == 'right'
            })
        },
    }
}
</script>