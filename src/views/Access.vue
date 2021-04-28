<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4">功能權限管理</h2>
    <v-row>
      <v-col cols="12">
        <v-data-table 
          disable-filtering
          hide-default-footer
          disable-pagination
          disable-sort
          dense
          :items="methodList"
          :headers="headers">
          <template v-slot:item.UserLv1="{ item }">
            <div style="height:100%" @click="rowclick(item.methodId,'UserLv1')">
              <v-icon
                large
                color="green darken-2"
                v-show="item.UserLv1">
                mdi-check
              </v-icon>
            </div>
          </template>
          <template v-slot:item.UserLv2="{ item }">
            <div style="height:100%" @click="rowclick(item.methodId,'UserLv2')">
              <v-icon
                large
                color="green darken-2"
                v-show="item.UserLv2">
                mdi-check
              </v-icon>
            </div>
          </template>
          <template v-slot:item.UserLv3="{ item }">
            <div style="height:100%" @click="rowclick(item.methodId,'UserLv3')">
              <v-icon
                large
                color="green darken-2"
                v-show="item.UserLv3">
                mdi-check
              </v-icon>
            </div>
          </template>
          <template v-slot:item.UserLv4="{ item }">
            <div style="height:100%" @click="rowclick(item.methodId,'UserLv4')">
              <v-icon
                large
                color="green darken-2"
                v-show="item.UserLv4">
                mdi-check
              </v-icon>
            </div>
          </template>
          <template v-slot:item.UserLv5="{ item }">
            <div style="height:100%"  @click="rowclick(item.methodId,'UserLv5')">
              <v-icon
                large
                color="green darken-2"
                v-show="item.UserLv5">
                mdi-check
              </v-icon>
            </div>
          </template>
          <template v-slot:footer></template>
        </v-data-table>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="10"/>
      <v-col cols="2" class="text-right">
        <v-btn color=primary>
          <v-icon>mdi-content-save</v-icon>存檔    
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
	data: () => ({
    methodList:[
      { 
        methodName:"危害通報頁面",	
        methodId:"SMS_1", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"人員傷亡名單頁面",	
        methodId:"SMS_2", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"行安改善措施檢討頁面",	
        methodId:"SMS_3", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"行安改善措施確認頁面",	
        methodId:"SMS_4", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"危害控制措施頁面",	
        methodId:"SMS_5", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"危害編修歷程紀錄頁面",	
        methodId:"SMS_6", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"安全資訊發布頁面",	
        methodId:"SMS_7", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"資訊讀取追蹤頁面",	
        methodId:"SMS_8", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"慢行通報頁面",	
        methodId:"SMS_9", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"慢行管理頁面",	
        methodId:"SMS_10", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"規章文件管理頁面",	
        methodId:"SMS_11", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"安全會議文件管理頁面",	
        methodId:"SMS_12", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"行車事故事件附件管理頁面",	
        methodId:"SMS_13", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"車速異常填報頁面",	
        methodId:"SMS_14", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"軔機檢查異常填報頁面",	
        methodId:"SMS_15", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"酒測、健康檢查異常填報頁面",	
        methodId:"SMS_16", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"職業災害事故調查表頁面",	
        methodId:"SMS_17", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"職安改善措施檢討頁面",	
        methodId:"SMS_18", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"職安改善措施確認頁面",	
        methodId:"SMS_19", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"職災危害資料庫頁面",	
        methodId:"SMS_20", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"職安績效管理頁面",	
        methodId:"SMS_21", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"健檢管理頁面",	
        methodId:"SMS_22", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"員工健檢歷程頁面",	
        methodId:"SMS_23", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"員工健檢資料填報頁面",	
        methodId:"SMS_24", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"司機員與車長分級檢視頁面",	
        methodId:"SMS_25", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"證照管理頁面",	
        methodId:"SMS_26", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"證照資料編輯頁面",	
        methodId:"SMS_27", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
      { 
        methodName:"權限修改、資料刪除",	
        methodId:"SMS_28", 
        UserLv1: true,
        UserLv2: true,
        UserLv3: true,
        UserLv4: true,
        UserLv5: true,
      },
    ],
    headers:[
      { text: '功能名稱', value: 'methodName', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
      { text: '功能名稱(英文)', value: 'methodId', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
      { text: '登入用戶', value: 'UserLv1', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
      { text: '行安幕僚', value: 'UserLv2', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
      { text: '職安幕僚', value: 'UserLv3', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
      { text: '高階主管', value: 'UserLv4', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
      { text: '系統管理員', value: 'UserLv5', align: 'center', class: 'subtitle-1 white--text font-weight-bold light-blue darken-1' },
    ]
	}),
	components: {

	},
	mounted() {

	},
	computed: {
		compute_name:function() {

		}
	},
	methods: {
		rowclick(itemId,itemCol) {
      this.methodList.find(e=>e.methodId===itemId)[itemCol] = !this.methodList.find(e=>e.methodId===itemId)[itemCol]
		}
	}
}
</script>