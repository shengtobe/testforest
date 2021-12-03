<template>
  <v-container style="max-width: 1200px">
      <h2 class="mb-4">人員權限管理</h2>
    <v-row>
      <v-col cols="12" sm="6" md="3">
          <h3 class="mb-1">
              <v-icon class="mr-1 mb-1">mdi-source-branch</v-icon>部門
          </h3>
          <v-select
              clearable
              v-model="departSelect"
              :items="departList"
              solo @change="departSelectChange"
          ></v-select>
      </v-col>
      <v-col cols="12" sm="3">
        <h3 class="mb-1">員工編號</h3>
        <v-text-field v-model="empID" clearable solo />
      </v-col>
    </v-row>
    
    <v-row>
      <v-col cols="12">
        <v-data-table  
          fixed-header
          disable-filtering
          hide-default-footer
          disable-pagination
          disable-sort
          dense class="theme-table"
          height="60vh"
          :items="filterEmpID"
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
        <v-btn class="btn-memo white--text" @click="save">
          <v-icon>mdi-content-save</v-icon>存檔    
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import { fetchOrganization } from '@/apis/organization' 
  import { fetchUserAuth, userAuthUpdate, canInUpdate } from '@/apis/access'
  import { getNowFullTime,encodeObject,decodeObject } from '@/assets/js/commonFun'
  import { mapState, mapActions } from 'vuex'
// import { filter } from 'vue/types/umd'

export default {
	data: () => ({
        userDepartArr: [],
        tableItems: [],
        methodList:[],
        departList: [],
        departSelect: '',
        empID: '',
        headers:[
            { text: '人員名稱', value: 'methodName', align: 'center', class: 'subtitle-1 white--text font-weight-bold' },
            { text: '編號', value: 'methodId', align: 'center', class: 'subtitle-1 white--text font-weight-bold' },
            { text: '登入用戶', value: 'UserLv1', align: 'center', class: 'subtitle-1 white--text font-weight-bold' },
            { text: '行安幕僚', value: 'UserLv2', align: 'center', class: 'subtitle-1 white--text font-weight-bold' },
            { text: '職安幕僚', value: 'UserLv3', align: 'center', class: 'subtitle-1 white--text font-weight-bold' },
            { text: '高階主管', value: 'UserLv4', align: 'center', class: 'subtitle-1 white--text font-weight-bold' },
            { text: '系統管理員', value: 'UserLv5', align: 'center', class: 'subtitle-1 white--text font-weight-bold' },
        ]
        }),
        components: {

        },
        mounted() {

        },
        computed: {
            ...mapState ('user', {
                userData: state => state.userData,  // 使用者基本資料
                groupData: state => state.groupData,  // 使用者基本資料
                funcIdList: state => state.funcIdList,  // 使用者基本資料
            }),
            compute_name:function() {
            },
            filterEmpID:function() {
              if(this.empID == '' || this.empID == null){
                return this.methodList
              }
              else{
                let temp = []
                this.methodList.forEach(e => {
                  if(e.methodId.includes(this.empID)){
                    temp.push(e)
                  }
                });
                return temp
              }
            },
        },
        methods: {
            ...mapActions('system', [
                'chMsgbar',  // messageBar
                'chLoadingShow'  // 切換 loading 圖顯示
            ]),
            ...mapActions('user', [
                'saveUserGroup',  // 儲存使用者權限(群組)資料
                'saveFuncIdList'
            ]),
            
            save() {
              if (confirm('你確定要儲存此權限設定嗎?')){
                this.chLoadingShow({ show: true})

                userAuthUpdate({
                    AccidentCode: this.id,  // 事故事件編號
                    ClientReqTime: getNowFullTime(),  // client 端請求時間
                    OperatorID: this.userData.UserId,  // 操作人id
                    // methodName: element.PeopleName,
                    //   methodId: element.PeopleId,
                    //   UserLv1: (element.RoleLv1 == 'T')?true:false,
                    //   UserLv2: (element.RoleLv2 == 'T')?true:false,
                    //   UserLv3: (element.RoleLv3 == 'T')?true:false,
                    //   UserLv4: (element.RoleLv4 == 'T')?true:false,
                    //   UserLv5: (element.RoleLv5 == 'T')?true:false,
                    AuthorMemberCount: this.tableItems.map(item => (
                      {
                        PeopleId: item.PeopleId,
                        RoleLv1: item.RoleLv1,
                        RoleLv2: item.RoleLv2,
                        RoleLv3: item.RoleLv3,
                        RoleLv4: item.RoleLv4,
                        RoleLv5: item.RoleLv5
                      }
                    ))
                }).then(res => {
                    if (res.data.ErrorCode == 0) {
                        this.chMsgbar({ success: true, msg: '送出成功' })

                        //更新 FunIdlist
                        canInUpdate({
                            ClientReqTime: getNowFullTime(),  // client 端請求時間
                            OperatorID: this.userData.UserId,  // 操作人id
                        }).then(res => {
                            if (res.data.ErrorCode == 0) {
                              this.saveFuncIdList(res.data.FunctionsAuthorData)
                              
                              更新groupData
                              let fResult = this.tableItems.find(item => item.PeopleId == this.userData.UserId)
                              this.saveUserGroup({
                                RoleLv1: fResult.RoleLv1,
                                RoleLv2: fResult.RoleLv2,
                                RoleLv3: fResult.RoleLv3,
                                RoleLv4: fResult.RoleLv4,
                                RoleLv5: fResult.RoleLv5
                              })

                            }
                        }).catch( err => {
                            //console.log(err);
                        }).finally(() => {
                        })

                        
                    } else {
                        this.$router.push({ path: '/error' })
                    }
                }).catch(err => {
                    //console.log(err);
                    this.chMsgbar({ success: false, msg: '伺服器發生問題，送出失敗' })
                }).finally(() => {
                    this.chLoadingShow({ show: false})
                })
              }
            },
            rowclick(itemId,itemCol) {
              let userIdx = this.tableItems.findIndex(e=>e.PeopleId===itemId)
              let group = '';
              let tf = '';
              switch(itemCol){
                case 'UserLv1':
                  group = 'RoleLv1';
                  this.tableItems[userIdx].RoleLv1 = (this.tableItems.find(e=>e.PeopleId===itemId)[group] == 'T')?'F':'T';
                  break;
                case 'UserLv2':
                  group = 'RoleLv2';
                  this.tableItems[userIdx].RoleLv2 = (this.tableItems.find(e=>e.PeopleId===itemId)[group] == 'T')?'F':'T';
                  break;
                case 'UserLv3':
                  group = 'RoleLv3';
                  this.tableItems[userIdx].RoleLv3 = (this.tableItems.find(e=>e.PeopleId===itemId)[group] == 'T')?'F':'T';
                  break;
                case 'UserLv4':
                  group = 'RoleLv4';
                  this.tableItems[userIdx].RoleLv4 = (this.tableItems.find(e=>e.PeopleId===itemId)[group] == 'T')?'F':'T';
                  break;
                case 'UserLv5':
                  group = 'RoleLv5';
                  this.tableItems[userIdx].RoleLv5 = (this.tableItems.find(e=>e.PeopleId===itemId)[group] == 'T')?'F':'T';
                  break;
              }
              this.methodList.find(e=>e.methodId===itemId)[itemCol] = !this.methodList.find(e=>e.methodId===itemId)[itemCol]
            },
            departSelectChange(){
              // this.methodList = [...[]]
              this.methodList = []
              this.tableItems.forEach(element => {
                if(element.DepartName == this.departSelect || this.departSelect == null){
                  this.methodList.push({
                      methodName: element.PeopleName,
                      methodId: element.PeopleId,
                      UserLv1: (element.RoleLv1 == 'T')?true:false,
                      UserLv2: (element.RoleLv2 == 'T')?true:false,
                      UserLv3: (element.RoleLv3 == 'T')?true:false,
                      UserLv4: (element.RoleLv4 == 'T')?true:false,
                      UserLv5: (element.RoleLv5 == 'T')?true:false,
                  });
                }
              });
            }
        },
        created() {
          
            // return;
            this.chLoadingShow({show:true})
            //=======建立人員部門對照表
            fetchOrganization({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                    // { 
                    //     methodName:"危害通報頁面",	 userDepartArr
                    //     methodId:"SMS_1", 
                    //     UserLv1: true,
                    //     UserLv2: true,
                    //     UserLv3: true,
                    //     UserLv4: true,
                    //     UserLv5: true,
                    // },
                    // DepartChild: null
                    // DepartCode: "ARCO023"
                    // DepartName: "秘書室"
                    // DepartParentCode: null
                    // DepartParentName: null
                    // UserId: "17113"
                    // UserName: "邱武瀚"
                    res.data.user_list_group_4.forEach(element => {
                        this.userDepartArr.push({
                            UserName: element.UserName, 
                            UserId: element.UserId,
                            DepartName: element.DepartName,
                            DepartCode: element.DepartCode,
                        })
                    });
                    this.chLoadingShow({show:false})
                } else {
                }
            }).catch( err => {
                //console.log(err);
                alert('建立人員部門對照表時發生問題，請重新查詢!')
            }).finally(() => {
              this.deptLoading = false
            })

            //===============顯示畫面表=================
            fetchUserAuth({
                ClientReqTime: getNowFullTime(),  // client 端請求時間
                OperatorID: this.userData.UserId,  // 操作人id
            }).then(res => {
                if (res.data.ErrorCode == 0) {
                  this.tableItems = JSON.parse(res.data.order_list)
                    // methodList:[
                    // { 
                    //     methodName:"危害通報頁面",	
                    //     methodId:"SMS_1", 
                    //     UserLv1: true,
                    //     UserLv2: true,
                    //     UserLv3: true,
                    //     UserLv4: true,
                    //     UserLv5: true,
                    // },
                    this.tableItems.forEach(element => {
                        this.methodList.push({
                            methodName: element.PeopleName,
                            methodId: element.PeopleId,
                            UserLv1: (element.RoleLv1 == 'T')?true:false,
                            UserLv2: (element.RoleLv2 == 'T')?true:false,
                            UserLv3: (element.RoleLv3 == 'T')?true:false,
                            UserLv4: (element.RoleLv4 == 'T')?true:false,
                            UserLv5: (element.RoleLv5 == 'T')?true:false,
                        });
                        //部門下拉選單建立:
                        if(this.departList.indexOf(element.DepartName) < 0){
                          this.departList.push(element.DepartName);
                        }
                    });
                    
                } else {
                }
            }).catch( err => {
                //console.log(err);
                alert('查詢權限時發生問題，請重新查詢!')
            }).finally(() => {
                this.deptLoading = false
            })
        }
}
</script>