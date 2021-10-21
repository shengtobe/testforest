<template>   
  <v-card class="theme-card">
    <v-card-title class="white--text px-4 py-1">
      {{ editType }}{{ title }}
      <v-spacer></v-spacer>
      <v-btn dark fab small text @click="close" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <commonQuestion v-model="inputData" :settings="setting">
        <template v-slot:beforeTextarea>
            <v-col cols="13" sm="12">
              <v-toolbar color="teal lighten-2" dark>
                <v-spacer />
                <v-toolbar-title>觀察內容：（觀察此人進行工作檢討工作關鍵性安全要點、交談結果）</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
            </v-col>
        </template>
        <template v-slot:moreDetails="item">
            <v-col cols="12" sm="4">
              <h3 class="mb-1">編號</h3>
              <v-text-field solo value v-model="item.editItem.EmpID" />
            </v-col>
            <v-col cols="12" sm="4">
              <!-- <h3 class="mb-1">所屬單位</h3>
              
              <v-text-field solo value v-model="item.editItem.EmpID2" /> -->
              <deptSelect
                :label="'所屬單位'"
                v-model="item.editItem.EmpDepartCode"
                outType="key"
                key="EmpDepartCode"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">職稱</h3>
              <v-text-field solo value v-model="item.editItem.JobName" />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">員工姓名</h3>
              <v-text-field solo value v-model="item.editItem.EmpName" />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">任現職年資</h3>
              <v-text-field solo value v-model="item.editItem.EmployeeYears" />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">工作名稱</h3>
              <v-text-field solo value v-model="item.editItem.JobDesp" />
            </v-col>
            
        </v-col>
        </template>
    </commonQuestion>
    <v-card-actions class="px-5 pb-5">
      <v-btn
        v-if="editType != actions.add"
        elevation="4"
        class="mr-2 btn-delete white--text"
        @click="deleteRecord"
        >刪除</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn class="mr-2 btn-close white--text" elevation="4" @click="close">取消</v-btn>
      <v-btn
        class="btn-add white--text"
        elevation="4"
        :loading="commonSettings.isLoading"
        @click="save"
        >送出</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState, mapActions } from "vuex";
import {
  getNowFullTime,
  getTodayDateString,
  encodeObject,
  decodeObject,
} from "@/assets/js/commonFun";
import { generateSettings } from "@/assets/js/commonQuestion2Generater";
import {
  fetchFormOrderOne,
  createFormOrder0,
  updateFormOrder,
} from "@/apis/formManage/serve";
import dateSelect from "@/components/forManage/dateSelect";
import deptSelect from "@/components/forManage/deptSelect";
import commonQuestion from "@/components/forManage/commonQuestion2";
import { Actions } from "@/assets/js/actions";
import { Constrant } from "@/assets/js/constrant";

export default {
  props: {
    item: Object,
    editType: String,
    DB_Table: String,
    title: String,
  },
  data() {
    return {
      actions: Actions,
      commonSettings: {
        iconShow: false,
        isLoading: false,
        deptReadonly: true,
      },
      formData: {
        settings: {
          formIconShow: true,
        },
        searchItem: {
          dateStart: "",
          dateEnd: "",
          department: "",
        },
        default: {
          dateStart: "",
          dateEnd: "",
          department: "",
        }
      },
      inputData: {
        RPFlowNo: "",
        DepartCode: "",
        DepartName: "",
        ID: "",
        Name: "",
        editableData: {
          CheckDay: "",
          EmpID: "",
          EmpDepartCode: "",
          JobName: "",
          EmpName: "",
          EmployeeYears: "",
          JobDesp: "",
          CheckOption1: "0",
          CheckOption2: "0",
          CheckOption3: "0",
          CheckOption4: "0",
          CheckOption5: "0",
          CheckOption6: "0",
          CheckOption7: "0",
          CheckOption8: "0",
          CheckOption9: "",
          CheckOption10: "",
          CheckOption11: "",
          CheckOption12: "",
          CheckOption13: "",
          CheckOption14: "",
          CheckOption15: "",
          CheckOption16: "",
        },
      },
      /*
        subtitles: 固定,
        textareas: 固定,
        questions: => 1.小題產生器 2.大題產生器
          2.產生1.的設定檔，然後2.再把1.的東西push進去array再回傳
          小題產生器: 
            {
              pnaelLabel: <string>,
              questionLabels: [
                {
                  width: <number>,
                  text: <string>,
                  generate: <boolean>,  //要被自動產生的寫ture，不要的寫false
                },
              ],
              answerStart: <number>,
              notGenerate: [            //預設不自動產生的都是純文字欄位，依照順序填入
                [
                  <string>,
                ]
              ],
              generate: [               //按順序填入
                {
                  model: <變數名稱前綴 string>, //預設所有可變動資料都放在editableData裡面
                  type: <text/number/radio/select/area string>,
                  <number:{
                    min: <numbebr>,
                    max: <number>,
                  },>
                  <radio: [
                    {
                      color: <string>,
                      label: <string>,
                      value: <string>,
                    }
                  ],> 
                  <select: [
                    {
                      text: <string>,
                      value: <string>,
                    }
                  ],>
                },
              ]
            }
          大題產生器
            {
              panelQuestion: [      //題目
                {
                  panelLabel: <string>,
                  questions: [
                    [
                      <string>,
                    ],
                  ],
                }
              ],
              questionLabels: [       //標題
                {
                  width: <number>,
                  text: <string>,
                  generate: <boolean>,  //要被自動產生的寫ture，不要的寫false
                },
              ],
              panelAnswer: [      //輸入欄位
                {
                  model: <變數名稱前綴 string>, //預設所有可變動資料都放在editableData裡面
                  type: <text/number/radio/select/area string>,
                  <number:{
                    min: <numbebr>,
                    max: <number>,
                  },>
                  <radio: [
                    {
                      color: <string>,
                      label: <string>,
                      value: <string>,
                    }
                  ],> 
                  <select: [
                    {
                      text: <string>,
                      value: <string>,
                    }
                  ],>
                },
              ]
            }
      */
      testSettings: {
        subtitles: [
          "1.本查核紀錄表每月至少觀察2人",
          "2.本表於月底前完成查核，經主管核章後，留存於管理單位之系統保存備查。",
        ],
        textareas: [
          {
            label: "一、工作步驟是否正確？合乎標準作業程序？",
            model: "CheckOption9",
          },
          {
            label: "二、工作熟練程度如何？",
            model: "CheckOption10",
          },
          {
            label: "三、不安全動作係由何種原因所致？",
            model: "CheckOption11",
          },
          {
            label: "四、可能發生的意外有哪些？防止措施如何？",
            model: "CheckOption12",
          },
          {
            label: "五、對工作者說明或糾正要點：",
            model: "CheckOption13",
          },
          {
            label: "六、提請有關單位協辦事項有哪些？",
            model: "CheckOption14",
          },
          {
            label: "七、工作者對進行此工作的意見：",
            model: "CheckOption15",
          },
          {
            label: "八、其他",
            model: "CheckOption16",
          },
        ],
        questions: {
          panelQuestion: [      //題目
            {
              panelLabel: "接受安全觀察之情況",
              questions: [
                [
                  "1. 計畫安全觀察之員工",
                ],
                [
                  "2. 常不注意安全肇生事故者",
                ],
                [
                  "3. 生病或不到工後恢復工作者",
                ],
                [
                  "4. 調換工作者",
                ],
                [
                  "5. 無經驗者",
                ],
                [
                  "6. 身體或心智不能安全工作者",
                ],
                [
                  "7. 似經情緒擾亂有怪異行動者",
                ],
                [
                  "8. 累遭意外者",
                ],
              ],
            },
          ],
          questionLabels: [       //標題
            {
              width: 6,
              text: "被觀察者情況",
              generate: false,
            },
            // {
            //   width: 3,
            //   text: "檢查方法",
            //   generate: false,
            // },
            // {
            //   width: 3,
            //   text: "判定基準",
            //   generate: false,
            // },
            {
              width: 6,
              text: "結果",
              generate: true,
            },
          ],
          panelAnswer: [      //輸入欄位
            {
              type: "radio",
              model: "CheckOption",
              radio: [
                {
                  color: "red",
                  label: "是",
                  value: "1",
                },
                {
                  color: "black",
                  label: "否",
                  value: "3",
                },
              ]
            }
          ]
        }
      },
      // setting: {}
    }
  },
  components: {
    dateSelect,
    deptSelect,
    commonQuestion,
  },
  mounted() {
    this.editType == this.actions.edit
      ? this.viewPage(this.item)
      : this.newPage();
    // this.setting = generateSettings(this.testSettings)
  },
  computed: {
    ...mapState("user", {
      userData: (state) => state.userData, // 使用者基本資料
    }),
    haveText:function() {
      let rtnValue = []
      let rtnChk = []
      for(let itemKey in this.ipt){
        let thisElement = this.ipt[itemKey].map(e => {
          let inElement = {...e}
          delete inElement.note
          return inElement
        })
        //檢查 有無只填一半的 有=false
        let itemsHasChk = thisElement.map(e => {
          let item = Object.values(e)
          let allTxt = item.every(ele=>ele!='0')
          let allZero = item.every(ele=>ele=='0')
          return allTxt || allZero
        }).every(e=>e) 

        //檢查 有沒有一項是全填完整 有=true
        let itemsHasValue = thisElement.map(e => {
          let item = Object.values(e)
          let allTxt = item.every(ele=>ele!='0')
          return allTxt
        }).some(e=>e)
        
        rtnValue.push(itemsHasValue) 
        rtnChk.push(itemsHasChk)
      }
      //上面兩個判斷都要過 = true
      return rtnValue.some(e=>e) && rtnChk.every(e=>e)
    },
    setting:function() {
      return generateSettings(this.testSettings)
    }
  },
  methods: {
    ...mapActions("system", [
      "chMsgbar", // messageBar
      "chLoadingShow", // 切換 loading 圖顯示
    ]),
    newPage() {
      this.inputData.editableData.CheckDay = getTodayDateString();
      this.inputData.Name = this.userData.UserName;
      this.inputData.ID = this.userData.UserId;
      this.inputData.DepartCode = this.userData.DeptList[0].DeptId;
      this.inputData.DepartName = this.userData.DeptList[0].DeptDesc;
    },
    viewPage(item) {
      const that = this;
      this.chLoadingShow({show:true});
      fetchFormOrderOne({
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.userData.UserId, // 操作人id
        KeyName: this.DB_Table, // DB table
        KeyItem: [{ Column: "RPFlowNo", Value: item.RPFlowNo }],
        QyName: [
          "CheckDay",
          "DepartCode",
          "DepartName",
          "ID",
          "Name",
          "Type",
          "Load",
          "CheckOption1",
          "CheckOption2",
          "CheckOption3",
          "CheckOption4",
          "CheckOption5",
          "CheckOption6",
          "CheckOption7",
          "CheckOption8",
          "CheckOption9",
          "CheckOption10",
          "CheckOption11",
          "CheckOption12",
          "CheckOption13",
          "CheckOption14",
          "CheckOption15",
          "CheckOption16",
          "CheckOption17",
          "CheckOption18",
          "CheckOption19",
          "CheckOption20",
          "CheckOption21",
          "CheckOption22",
          "Analysis",
          "Evaluation",
          "Ameliorate",
          "Review",
        ],
      })
        .then((res) => {
          let dat = JSON.parse(res.data.DT);
          dat[0].CheckDay = dat[0].CheckDay.substr(0, 10);
          this.inputData.RPFlowNo = this.item.RPFlowNo;
          this.inputData.DepartCode = dat[0].DepartCode;
          this.inputData.Name = dat[0].Name;
          dat[0] = decodeObject(dat[0]);
          const inputArr = Object.keys(this.inputData.editableData);
          inputArr.forEach((e) => {
            that.inputData.editableData[e] = dat[0][e];
          });
        })
        .catch((err) => {
          ////console.log(err);
          this.chMsgbar({ success: false, msg: Constrant.query.failed });
        })
        .finally(() => {
          this.chLoadingShow({ show: false});
        });
    },
    close() {
      this.$emit("close");
      this.$emit("search");
    },
    save() {
      if(this.item.editItem.EmpName == ''){
        alert("欄位填寫不完整")
      }
      const that = this;
      let rtnObj = [];
      const keyArr = Object.keys(that.inputData.editableData);
      keyArr.forEach((e) => {
        rtnObj.push({ Column: e, Value: that.inputData.editableData[e] });
      });
      encodeObject(rtnObj);
      if (this.editType == this.actions.add) {
        createFormOrder0({
          ClientReqTime: getNowFullTime(), // client 端請求時間
          OperatorID: this.userData.UserId, // 操作人id
          FunCode: "C",
          KeyName: this.DB_Table, // DB table
          KeyItem: rtnObj,
        })
          .then((res) => {
            if (res.data.ErrorCode == 0) {
              this.chMsgbar({ success: true, msg: Constrant.insert.success });
            } else {
              sessionStorage.errData = JSON.stringify({
                errCode: res.data.Msg,
                msg: res.data.Msg,
              });
              that.$router.push({ path: "/error" });
            }
          })
          .catch((err) => {
            ////console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.insert.failed });
          })
          .finally(() => {
            that.close();
          });
      } else {
        //就是edit
        updateFormOrder({
          ClientReqTime: getNowFullTime(), // client 端請求時間
          OperatorID: this.userData.UserId, // 操作人id
          RPFlowNo: that.inputData.RPFlowNo,
          FunCode: "U",
          KeyName: this.DB_Table, // DB table
          KeyItem: rtnObj,
        })
          .then((res) => {
            if (res.data.ErrorCode == 0) {
              this.chMsgbar({ success: true, msg: Constrant.update.success });
            } else {
              sessionStorage.errData = JSON.stringify({
                errCode: res.data.Msg,
                msg: res.data.Msg,
              });
              that.$router.push({ path: "/error" });
            }
          })
          .catch((err) => {
            ////console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.update.failed });
          })
          .finally(() => {
            that.close();
          });
      }
    },
    deleteRecord() {
      this.$emit("deleteRecord", this.inputData.RPFlowNo);
    },
  },
}
</script>