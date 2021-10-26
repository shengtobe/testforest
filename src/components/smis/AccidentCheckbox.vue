<template>
<v-sheet color="white" elevation="2" class="px-2 pb-5">
    <!-- 重大事故 -->
    <v-row no-gutters v-for="(group, gIndex) in groups" :key="'G_'+gIndex">
        <v-col cols="12" sm="12" md="12">
            <h3 class="pt-3 mb-n2 error--text">{{group.TypeName}}</h3>
        </v-col>
        <v-row no-gutters >
            <v-col cols="12" sm="4" md="3" v-for="(item, iIndex) in group.TypeList" :key="'G_' + gIndex + '_i_' + iIndex">
                <v-checkbox
                    v-model="accidents"
                    :label="item.Text"
                    color="info"
                    hide-details
                    :value="item.Value"
                    @change="checked"
                ></v-checkbox>
            </v-col>
        </v-row>
        
    </v-row>
</v-sheet>
</template>

<script>
import {fetchEvtTypes2 } from '@/apis/smis/carAccidentEvent'
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'

export default {
    props: ['checkArr'],
    data: () => ({
        accidents: [],
        groups: [], //AccidentCount
        group: [],
    }),
    watch: {
        checkArr(val) {
            this.accidents = [ ...val ]
        }
    },
    computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
    },
    methods: {
        // 選擇
        checked() {
            this.$emit('checkAccident', this.accidents)
        }
    },
    created() {
        fetchEvtTypes2({
            OperatorID: this.userData.UserId,  // 事故事件編號 (從路由參數抓取)
            ClientReqTime: getNowFullTime(),  // client 端請求時間
        }).then(res => {
            if (res.data.ErrorCode == 0) {
                // this.groups = res.data.AccidentCount;
                let acc3 = []
                res.data.AccidentCount[2].TypeList.forEach(item => {
                    if(item.Value.includes('O') == false)
                        acc3.push(item)
                });
                this.groups = [res.data.AccidentCount[0], res.data.AccidentCount[1], {TypeList: acc3, TypeName: "異常事件"}]
            } else {
                // 請求發生問題時(ErrorCode 不為 0 時)，重導至錯誤訊息頁面
                sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
                this.$router.push({ path: '/error' })
            }
        }).catch(err => {
            //console.log(err)
            alert('伺服器發生問題，事故類型讀取失敗')
        }).finally(() => {
            // this.chLoadingShow()
        })
        
    }
}
</script>