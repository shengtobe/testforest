<template>
<v-container style="max-width: 1200px;">
    <!-- <v-row class="px-2 mb-8">
        表單填報
        <v-col cols="12" md="6" class="mb-8">
            <v-card class="mx-auto">
                <v-card-title class="green accent-1 py-2 px-3">
                    <v-icon class="mr-2">mdi-pen</v-icon>
                    <strong>表單填報</strong>
                </v-card-title>

                <v-list class="pa-0">
                    <v-list-item to="/smis/car-safe-performance/moto-dynamo">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        機車行駛公里及發電機工時
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/car-safe-performance/machine-abnormal">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        軔機檢查異常表
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/car-safe-performance/health-abnormal">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        酒測、健康檢查異常表
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/car-safe-performance/speed-abnormal">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        車速異常表
                    </v-list-item>
                </v-list>
            </v-card>
        </v-col>

        趨勢圖
        <v-col cols="12" md="6">
            <v-card class="mx-auto">
                <v-card-title class="yellow lighten-3 py-2 px-3">
                    <v-icon class="mr-2">mdi-chart-areaspline</v-icon>
                    <strong>統計趨勢圖</strong>
                </v-card-title>

                <v-list class="pa-0">
                    <v-list-item to="/smis/car-accident-event/maintype-chart">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        MTBF
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/car-accident-event/maintype-chart">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        MKBF
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/car-accident-event/abnormaltype-chart">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        MTTR
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/car-accident-event/majortype-chart">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        事故事件年趨勢指標
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/car-accident-event/generaltype-chart">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        事故事件月趨勢指標
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item to="/smis/car-safe-performance/crawl-notify">
                        <v-icon color="primary" class="mr-1">mdi-chevron-double-right</v-icon>
                        慢行通報紀錄
                    </v-list-item>
                </v-list>
            </v-card>
        </v-col>
    </v-row> -->
    <v-row>
        <v-col cols="12" md="2">
            <v-btn color="secondary" large :to="`/smis/car-safe-performance`">
                回上一頁
            </v-btn>
        </v-col>
        <v-col cols="12" md="8" class="text-center">
            <h2 class="mb-4">行車安全績效趨勢</h2>
        </v-col>
        <v-col cols="12">
            <v-btn color="success" large class="my-2 mr-2" :to="`/smis/car-safe-performance/${encodeURIComponent('全系統行車事故率')}/accident-trend`">
                全系統行車事故率
            </v-btn>
            <v-btn color="success" large class="my-2 mr-2" :to="`/smis/car-safe-performance/${encodeURIComponent('重大行車事故率')}/accident-trend`">
                重大行車事故率
            </v-btn>
            <v-btn color="success" large class="my-2 mr-2" :to="`/smis/car-safe-performance/${encodeURIComponent('一般行車事故率')}/accident-trend`">
                一般行車事故率
            </v-btn>
            <v-btn color="success" large class="my-2 mr-2" :to="`/smis/car-safe-performance/${encodeURIComponent('行車異常事故率')}/accident-trend`">
                行車異常事故率
            </v-btn>
        </v-col>
        <v-col cols="12" style="position:relative;">
            <v-row style="min-height:10rem;border-bottom:1px solid;">
                <v-col cols="7">
                    <h2>第<br>１<br>層</h2>
                </v-col>
                <v-col cols="5" class="float-right">
                    <v-row>
                        <v-col cols="10">
                            <v-select
                                :items="selectOptions.Lv1"
                                v-model="selectValues.Lv1"
                                solo
                            ></v-select>
                        </v-col>
                        <v-col cols="2">
                            <v-btn color="primary" large :to="`/smis/car-safe-performance/${encodeURIComponent(selectValues.Lv1)}/accident-trend`">
                                查詢
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row style="min-height:10rem;border-bottom:1px solid;">
                <v-col cols="7">
                    <h2>第<br>２<br>層</h2>
                </v-col>
                <v-col cols="5" class="float-right">
                    <v-row>
                        <v-col cols="10">
                            <v-select
                                :items="getLvOptions.Lv2"
                                v-model="selectValues.Lv2"
                                solo
                            ></v-select>
                        </v-col>
                        <v-col cols="2">
                            <v-btn color="primary" large :to="`/smis/car-safe-performance/${encodeURIComponent(selectValues.Lv2)}/accident-trend`">
                                查詢
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row style="min-height:10rem;border-bottom:1px solid;">
                <v-col cols="7">
                    <h2>第<br>３<br>層</h2>
                </v-col>
                <v-col cols="5" class="float-right">
                    <v-row>
                        <v-col cols="10">
                            <v-select
                                :items="getLvOptions.Lv3"
                                v-model="selectValues.Lv3"
                                solo
                            ></v-select>
                        </v-col>
                        <v-col cols="2">
                            <v-btn color="primary" large :to="`/smis/car-safe-performance/${encodeURIComponent(selectValues.Lv3)}/key-equip`">
                                查詢
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row style="min-height:10rem;border-bottom:1px solid;">
                <v-col cols="7">
                    <h2>第<br>４<br>層</h2>
                </v-col>
                <v-col cols="5" class="float-right">
                    <v-row>
                        <v-col cols="10">
                            <v-select
                                :items="getLvOptions.Lv4"
                                v-model="selectValues.Lv4"
                                solo
                            ></v-select>
                        </v-col>
                        <v-col cols="2">
                            <v-btn color="primary" large :to="`/smis/car-safe-performance/${encodeURIComponent(selectValues.Lv4)}/work-effectiveness`">
                                查詢
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <div class="T1"></div>
            <div class="trapezoid"></div>
            <div class="trapezoid2"></div>
            <div class="trapezoid3"></div>
        </v-col>
    </v-row>
    
</v-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
export default {
  data: () => ({
    selectOptions:{
        Lv1:['A01正線衝撞率','A02正線出軌率','A03正線火災率','B04平交道事故率','其他'],
        Lv2:[
            {
                region:"A01正線衝撞率",
                Options:[
                    "B01側線衝撞率",
                    "B06設備損害率",
                    "C01列車或車輛分離",
                    "C02進入錯線",
                    "C03冒進號誌",
                    "C04列車或車輛溜逸",
                    "C05違反閉塞運轉",
                    "C06違反號誌運轉",
                    "C08車輛故障",
                    "C11運轉保安裝置故障",
                    "C14駕駛失能",
                ]
            },
            {
                region:"A02正線出軌率",
                Options:[
                    "B02側線出軌率",
                    "B06設備損害率",
                    "B07運轉中斷率",
                    "C04列車或車輛溜逸",
                    "C06違反號誌運轉",
                    "C07號誌處理錯誤(含轉轍器操作)",
                    "C08車輛故障",
                    "C09路線障礙",
                    "C11運轉保安裝置故障",
                    "C12外物入侵",
                    "C14駕駛失能",
                    "C15天然災變",
                ]
            },
            {
                region:"A03正線火災率",
                Options:[
                    "B03側線火災率",
                    "B06設備損害率",
                    "C08車輛故障",
                    "C13危險品洩漏",
                ]
            },
            {
                region:"B04平交道事故率",
                Options:[
                    "C11運轉保安裝置故障",
                ]
            },
            {
                region:"其他",
                Options:[
                    "B05死傷事故率",
                    "C10電力設備故障",
                    "C16列車取消",
                    "C17其他事件",
                ]
            },
        ],
        Lv3:[
            {
                region:"A01正線衝撞率",
                Options:[
                    "車輛-蒸汽機車頭-聯結器系統-聯結器",
                    "車輛-25噸機車頭-聯結器系統-聯結器",
                    "車輛-28噸機車頭-聯結器系統-聯結器",
                    "車輛-29噸機車頭-聯結器系統-聯結器",
                    "無線電-北門車站-手提台-無線電",
                    "無線電-交力坪車站-手提台-無線電",
                    "無線電-竹崎車站-手提台-無線電",
                    "無線電-阿里山車站-手提台-無線電",
                    "無線電-奮起湖車站-手提台-無線電",
                    "無線電-竹崎監工區-手提台-無線電",
                    "無線電-車輛養護科-手提台-無線電",
                    "無線電-車輛養護科神木車站-車裝台-無線電",
                    "無線電-車輛養護科備用機-車裝台-無線電",
                    "無線電-阿里山車庫-手提台-無線電",
                    "無線電-阿里山車庫機關車-車裝台-無線電",
                    "無線電-修理工廠-手提台-無線電",
                    "無線電-嘉義車庫-手提台-無線電",
                    "無線電-嘉義車庫守車-車裝台-無線電",
                    "無線電-嘉義車庫機關車-車裝台-無線電",
                    "無線電-奮起湖監工區-手提台-無線電",
                    "無線電-鐵路服務科-手提台-無線電",
                ]
            },
            {
                region:"A02正線出軌率",
                Options:[
                    "軌道-竹崎監工區-軌道組件故障率",
                    "軌道-竹崎監工區-道岔故障率",
                    "軌道-竹崎監工區-橋梁故障率",
                    "軌道-竹崎監工區-隧道故障率",
                    "軌道-奮起湖監工區-軌道組件故障率",
                    "軌道-奮起湖監工區-道岔故障率",
                    "軌道-奮起湖監工區-橋梁故障率",
                    "軌道-奮起湖監工區-隧道故障率",
                    "軌道-阿里山監工區-軌道組件故障率",
                    "軌道-阿里山監工區-道岔故障率",
                    "軌道-阿里山監工區-橋梁故障率",
                    "軌道-阿里山監工區-隧道故障率",
                    "車輛-中興號客車-轉向架系統-車輪故障率",
                    "車輛-中興號客車-轉向架系統-車軸故障率",
                    "車輛-中興號客車-轉向架系統-轉向架故障率",
                    "車輛-中興號客車-軔機系統-轉向架煞車裝置",
                    "車輛-中興號客車-軔機系統-手軔機各機件",
                    "車輛-中興號客車-聯結器系統-聯結器",
                    "車輛-祝客車-轉向架系統-車輪故障率",
                    "車輛-祝客車-轉向架系統-車軸故障率",
                    "車輛-祝客車-轉向架系統-轉向架故障率",
                    "車輛-祝客車-軔機系統-轉向架煞車裝置",
                    "車輛-祝客車-軔機系統-手軔機各機件",
                    "車輛-祝客車-聯結器系統-聯結器",
                    "車輛-阿里山號客車-轉向架系統-車輪故障率",
                    "車輛-阿里山號客車-轉向架系統-車軸故障率",
                    "車輛-阿里山號客車-轉向架系統-轉向架故障率",
                    "車輛-阿里山號客車-軔機系統-轉向架煞車裝置",
                    "車輛-阿里山號客車-軔機系統-手軔機各機件",
                    "車輛-阿里山號客車-聯結器系統-聯結器",
                    "車輛-臺檜客車-轉向架系統-車輪故障率",
                    "車輛-臺檜客車-轉向架系統-車軸故障率",
                    "車輛-臺檜客車-轉向架系統-轉向架故障率",
                    "車輛-臺檜客車-軔機系統-轉向架煞車裝置",
                    "車輛-臺檜客車-軔機系統-手軔機各機件",
                    "車輛-臺檜客車-聯結器系統-聯結器",
                    "車輛-工程車-轉向架系統-車輪故障率",
                    "車輛-工程車-轉向架系統-車軸故障率",
                    "車輛-工程車-轉向架系統-轉向架故障率",
                    "車輛-工程車-軔機系統-轉向架煞車裝置",
                    "車輛-工程車-軔機系統-手軔機各機件",
                    "車輛-蒸汽機車頭-轉向架系統-轉向架",
                    "車輛-蒸汽機車頭-轉向架系統-撒砂裝置",
                    "車輛-蒸汽機車頭-軔機系統-軔機",
                    "車輛-蒸汽機車頭-軔機系統-基礎軔機",
                    "車輛-蒸汽機車頭-軔機系統-空氣配管",
                    "車輛-蒸汽機車頭-聯結器系統-排障器",
                    "車輛-蒸汽機車頭-聯結器系統-聯結器",
                    "車輛-蒸汽機車頭-電氣系統-儀表",
                    "車輛-25噸機車頭-轉向架系統-轉向架",
                    "車輛-25噸機車頭-轉向架系統-撒砂裝置",
                    "車輛-25噸機車頭-轉向架系統-軔機",
                    "車輛-25噸機車頭-轉向架系統-基礎軔機",
                    "車輛-25噸機車頭-轉向架系統-空氣配管",
                    "車輛-25噸機車頭-聯結器系統-排障器",
                    "車輛-25噸機車頭-聯結器系統-聯結器",
                    "車輛-25噸機車頭-電氣系統-儀表",
                    "車輛-28噸機車頭-轉向架系統-轉向架",
                    "車輛-28噸機車頭-轉向架系統-撒砂裝置",
                    "車輛-28噸機車頭-轉向架系統-軔機",
                    "車輛-28噸機車頭-轉向架系統-基礎軔機",
                    "車輛-28噸機車頭-轉向架系統-空氣配管",
                    "車輛-28噸機車頭--聯結器系統-排障器",
                    "車輛-28噸機車頭-聯結器系統-聯結器",
                    "車輛-28噸機車頭-電氣系統-儀表",
                    "車輛-29噸機車頭-轉向架系統-轉向架",
                    "車輛-29噸機車頭-轉向架系統-撒砂裝置",
                    "車輛-29噸機車頭-轉向架系統-軔機",
                    "車輛-29噸機車頭-轉向架系統-基礎軔機",
                    "車輛-29噸機車頭-轉向架系統-空氣配管",
                    "車輛-29噸機車頭--聯結器系統-排障器",
                    "車輛-29噸機車頭-聯結器系統-聯結器",
                    "車輛-29噸機車頭-電氣系統-儀表",
                ]
            },
            {
                region:"A03正線火災率",
                Options:[
                    "車輛-中興號客車-空調系統-空調機",
                    "車輛-阿里山號客車-空調系統-空調機",
                    "車輛-蒸汽機車頭-電氣系統-發電機",
                    "車輛-蒸汽機車頭-電氣系統-起動馬達",
                    "車輛-25噸機車頭-電氣系統-發電機",
                    "車輛-25噸機車頭-電氣系統-起動馬達",
                    "車輛-25噸機車頭-空調系統-空調機",
                    "車輛-28噸機車頭-電氣系統-發電機",
                    "車輛-28噸機車頭-電氣系統-起動馬達",
                    "車輛-28噸機車頭-空調系統-空調機",
                    "車輛-29噸機車頭-電氣系統-發電機",
                    "車輛-29噸機車頭-電氣系統-起動馬達",
                    "車輛-29噸機車頭-空調系統-空調機",
                ]
            },
            {
                region:"B04平交道事故率",
                Options:[
                    "防護設備-平交道-平交道-邏輯控制系統",
                    "防護設備-平交道-平交道-警報系統",
                    "防護設備-平交道-平交道-遮斷機系統",
                    "防護設備-平交道-平交道-線圈感應系統",
                    "防護設備-平交道-平交道-車踏感應系統",
                    "防護設備-平交道-平交道-無線射頻(RFID)系統",
                ]
            },
            {
                region:"其他",
                Options:[
                    "車站-嘉義車站-廣播設備故障率",
                    "車站-北門車站-廣播設備故障率",
                    "車站-竹崎車站-廣播設備故障率",
                    "車站-奮起湖車站-廣播設備故障率",
                    "車站-二萬平車站-廣播設備故障率",
                    "車站-神木車站-廣播設備故障率",
                    "車站-阿里山車站-廣播設備故障率",
                    "車站-沼平車站-廣播設備故障率",
                    "車站-祝山車站-廣播設備故障率",
                    "車輛-中興號客車-車體總成-車廂內部設備(車門)故障率",
                    "車輛-中興號客車-電氣系統-播音系統",
                    "車輛-祝客車-車體總成-車廂內部設備(車門)故障率",
                    "車輛-祝客車-電氣系統-播音系統",
                    "車輛-阿里山號客車-車體總成-車廂內部設備(車門)故障率",
                    "車輛-阿里山號客車-電氣系統-播音系統",
                    "車輛-臺檜客車-車體總成-車廂內部設備(車門)故障率",
                    "車輛-臺檜客車-電氣系統-播音系統",
                ]
            },
        ],
        Lv4:[
            {
                region:"A01正線衝撞率",
                Options:[
                    "酒精及血壓量測異常率",
                ]
            },
            {
                region:"A02正線出軌率",
                Options:[
                    "列車開車前軔機異常率",
                    "車速異常率",
                    "酒精及血壓量測異常率",
                    "慢行路段分析",
                    "雨量異常",
                ]
            },
            {
                region:"A03正線火災率",
                Options:[
                    "列車開車前軔機異常率",
                ]
            },
        ]
    },
    selectValues:{
        Lv1:'',
        Lv2:'',
        Lv3:'',
        Lv4:'',
    }
  }),
  components: {
  },
  computed: {
    ...mapState ('user', {
      userData: state => state.userData,  // 使用者基本資料
    }),
    getLvOptions:function() {
        let rtnObj = {
            Lv2: this.selectOptions.Lv2.find(e=>e.region == this.selectValues.Lv1)?.Options || [],
            Lv3: this.selectOptions.Lv3.find(e=>e.region == this.selectValues.Lv1)?.Options || [],
            Lv4: this.selectOptions.Lv4.find(e=>e.region == this.selectValues.Lv1)?.Options || [],
        }
        return rtnObj
    }
  },
  methods: {
    ...mapActions('system', [
      'chMsgbar',  // 改變 messageBar
      'chLoadingShow',  // 切換 loading 圖顯示
    ]),
  },
  mounted() {
  },
};
</script>
<style>
.T1, .trapezoid, .trapezoid2, .trapezoid3{
    position:absolute; left:12px; top:12px; 
}
.T1 {
    border-right: 20rem solid transparent;
    border-left: 20rem solid transparent;
    border-bottom: 40rem solid rgb(0, 123, 255);
    display:inline-block;
}
.trapezoid {
    width: 40rem;
    height: 40rem;
    background: transparent;
    border-top: 10rem solid transparent;
    border-bottom: 30rem solid rgb(0, 200, 255);
    border-left: 15rem solid transparent;
    border-right: 15rem solid transparent;
}
.trapezoid2 {
    width: 40rem;
    height: 40rem;
    background: transparent;
    border-top: 20rem solid transparent;
    border-bottom: 20rem solid rgb(0, 255, 217);
    border-left: 10rem solid transparent;
    border-right: 10rem solid transparent;
}
.trapezoid3 {
    width: 40rem;
    height: 40rem;
    background: transparent;
    border-top: 30rem solid transparent;
    border-bottom: 10rem solid rgb(0, 255, 81);
    border-left: 5rem solid transparent;
    border-right: 5rem solid transparent;
}
</style>