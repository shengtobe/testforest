<template>
<v-container style="max-width: 1200px;">
    <v-row>
        <v-col cols="12" md="2">
            <v-btn v-if="false" class="btn-close" dark large :to="`/smis/car-safe-performance`">
                回上一頁
            </v-btn>
        </v-col>
        <v-col cols="12" md="8" class="text-center">
            <h2 class="label-title mb-4">行車安全績效趨勢</h2>
        </v-col>
        <v-col cols="12">
            <v-btn dark large class="btn-detail my-2 mr-2" :to="`/smis/car-safe-performance/T/accident-trend/${encodeURIComponent('全系統行車事故率')}`">
                全系統行車事故率
            </v-btn>
            <v-btn dark large class="btn-detail my-2 mr-2" :to="`/smis/car-safe-performance/A/accident-trend/${encodeURIComponent('重大行車事故率')}`">
                重大行車事故率
            </v-btn>
            <v-btn dark large class="btn-detail my-2 mr-2" :to="`/smis/car-safe-performance/B/accident-trend/${encodeURIComponent('一般行車事故率')}`">
                一般行車事故率
            </v-btn>
            <v-btn dark large class="btn-detail my-2 mr-2" :to="`/smis/car-safe-performance/C/accident-trend/${encodeURIComponent('行車異常事故率')}`">
                行車異常事故率
            </v-btn>
        </v-col>
        <v-col cols="12" style="position:relative;">
            <div class="triangle">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 600 600" width="40rem" height="40rem">
                    <defs>
                        <linearGradient id="Gradient1" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stop-color="#ff917a"/>
                            <stop offset="25%" stop-color="#ff2f05"/>
                            <stop offset="25%" stop-color="#ffc09c"/>
                            <stop offset="50%" stop-color="#ff5e00"/>
                            <stop offset="50%" stop-color="#ffdc96"/>
                            <stop offset="75%" stop-color="#ffaa00"/>
                            <stop offset="75%" stop-color="#ffea8f"/>
                            <stop offset="100%" stop-color="#ffd000"/>
                        </linearGradient>
                    </defs>
                    <polygon points="300,0 600,600 0,600" fill="url(#Gradient1)"/>
                    <text x="265" y="110" fill="#617a60" class="label-header" style="font-size:1.5rem;font-weight:bold;">第一層</text>
                    <text x="265" y="260" fill="#617a60" class="label-header" style="font-size:1.5rem;font-weight:bold;">第二層</text>
                    <text x="265" y="410" fill="#617a60" class="label-header" style="font-size:1.5rem;font-weight:bold;">第三層</text>
                    <text x="265" y="560" fill="#617a60" class="label-header" style="font-size:1.5rem;font-weight:bold;">第四層</text>
                </svg>
            </div>
            <v-row class="tri-area">
                <v-col cols="1" md="7">
                    <h2 class="label-header">第<br>一<br>層</h2>
                </v-col>
                <v-col cols="11" md="5" align-self="center">
                    <v-row>
                        <v-col cols="8">
                            <v-select
                                :items="getLvOptions.Lv1"
                                v-model="selectValues.Lv1"
                                solo
                                hide-details
                            ></v-select>
                        </v-col>
                        <v-col cols="4">
                            <v-btn class="btn-memo" dark large :to="`/smis/car-safe-performance/${encodeURIComponent(selectValues.Lv1)}/accident-trend/${encodeURIComponent(getLvText.Lv1)}`">
                                <v-icon class="mr-2">mdi-magnify</v-icon>
                                查詢
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row class="tri-area">
                <v-col cols="1" md="7">
                    <h2 class="label-header">第<br>二<br>層</h2>
                </v-col>
                <v-col cols="11" md="5" align-self="center">
                    <v-row>
                        <v-col cols="8">
                            <v-select
                                :items="getLvOptions.Lv2"
                                v-model="selectValues.Lv2"
                                solo
                                hide-details
                            >
                                <template v-slot:no-data>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>請選擇上層</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>
                            </v-select>
                        </v-col>
                        <v-col cols="4">
                            <v-btn class="btn-memo" dark large :to="`/smis/car-safe-performance/${encodeURIComponent(selectValues.Lv2)}/accident-trend/${encodeURIComponent(getLvText.Lv2)}`">
                                <v-icon class="mr-2">mdi-magnify</v-icon>
                                查詢
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row class="tri-area">
                <v-col cols="1" md="7">
                    <h2 class="label-header">第<br>三<br>層</h2>
                </v-col>
                <v-col cols="11" md="5" align-self="center">
                    <v-row>
                        <v-col cols="8">
                            <!-- <v-select
                                :items="getLvOptions.Lv3"
                                v-model="selectValues.Lv3"
                                solo
                                hide-details
                            >
                                <template v-slot:no-data>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>請選擇上層</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>
                            </v-select> -->
                        </v-col>
                        <v-col cols="4">
                            <v-btn class="btn-memo" dark large :to="`/smis/car-safe-performance/key-equip`">
                                <v-icon class="mr-2">mdi-magnify</v-icon>
                                查詢
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row class="tri-area">
                <v-col cols="1" md="7">
                    <h2 class="label-header">第<br>四<br>層</h2>
                </v-col>
                <v-col cols="11" md="5" align-self="center">
                    <v-row>
                        <v-col cols="8">
                            <v-select
                                :items="getLvOptions.Lv4"
                                v-model="selectValues.Lv4"
                                solo
                                hide-details
                            >
                                <template v-slot:no-data>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>請選擇上層</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>
                            </v-select>
                        </v-col>
                        <v-col cols="4">
                            <v-btn class="btn-memo" dark large :to="`/smis/car-safe-performance/${encodeURIComponent(selectValues.Lv4)}/work-effectiveness/${encodeURIComponent(getLvText.Lv4)}`">
                                <v-icon class="mr-2">mdi-magnify</v-icon>
                                查詢
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</v-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { indexLevelList } from '@/apis/smis/safetyPerformance'
export default {
  data: () => ({
    selectOptions:{
        Lv1:[],
        Lv2:[],
        Lv3:[],
        Lv4:[],
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
        const that = this
        let rtnObj = {
            Lv1: that.selectOptions.Lv1,
            Lv2: that.selectOptions?.Lv2?.filter(e=>e.parent.find(ele=>that.selectValues.Lv1==ele.Code))?.map(ele=>({text:ele.text,value:ele.value})) || [],
            Lv3: that.selectOptions?.Lv3?.filter(e=>e.parent.find(ele=>that.selectValues.Lv1==ele.Code))?.map(ele=>({text:ele.text,value:ele.value})) || [],
            Lv4: that.selectOptions?.Lv4?.filter(e=>e.parent.find(ele=>that.selectValues.Lv1==ele.Code))?.map(ele=>({text:ele.text,value:ele.value})) || [],
        }
        return rtnObj
    },
    getLvText: function() {
        const that = this
        let rtnObj = {
            Lv1: that.selectOptions?.Lv1?.find(e=>e.value == that.selectValues?.Lv1||'')?.text||"",
            Lv2: that.selectOptions?.Lv2?.find(e=>e.value == that.selectValues?.Lv2||'')?.text||"",
            Lv3: that.selectOptions?.Lv3?.find(e=>e.value == that.selectValues?.Lv3||'')?.text||"",
            Lv4: that.selectOptions?.Lv4?.find(e=>e.value == that.selectValues?.Lv4||'')?.text||"",
        }
        return rtnObj
    }
  },
  methods: {
    ...mapActions('system', [
      'chMsgbar',  // 改變 messageBar
      'chLoadingShow',  // 切換 loading 圖顯示
    ]),
    getSelectOptions() {
        indexLevelList({
            ClientReqTime: getNowFullTime(),
            OperatorID: this.userData.UserId,  // 操作人id
        }).then(res=>{
            console.log(res.data)
            const resdata = res.data.DataList
            this.selectOptions.Lv1 = resdata?.filter(element=>element.Level=='1')?.map(ele=>({text:ele.Name,value:ele.Code}))||[]
            this.selectOptions.Lv2 = resdata?.filter(element=>element.Level=='2')?.map(ele=>({text:ele.Name,value:ele.Code,parent: ele.Parent}))||[]
            this.selectOptions.Lv3 = resdata?.filter(element=>element.Level=='3')?.map(ele=>({text:ele.Name,value:ele.Code,parent: ele.Parent}))||[]
            this.selectOptions.Lv4 = resdata?.filter(element=>element.Level=='4')?.map(ele=>({text:ele.Name,value:ele.Code,parent: ele.Parent}))||[]
        }).catch( err => {
            console.log('err',err)
          this.chMsgbar({ success: false, msg: '伺服器發生問題，資料查詢失敗' })
        })
    }
  },
  mounted() {
      this.getSelectOptions()
  },
};
</script>
<style scoped>
>>>.tri-area{
    min-height:10rem;
    border-bottom:1px solid #6b6b6b7a;
}
.triangle{
    position:absolute; left:1rem; top:12px; 
    z-index: 0;
}

</style>