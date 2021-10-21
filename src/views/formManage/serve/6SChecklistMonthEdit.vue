<template>
  <v-card class="theme-card">
    <v-card-title class="white--text px-4 py-1">
      {{ editType }}{{ commonSettings.title }}
      <v-spacer></v-spacer>
      <v-btn dark fab small text @click="close" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <commonQuestion v-model="inputData" :settings="settings">
      <template v-slot:resultOtions>
        <v-radio color="success" label="良好" value="1"></v-radio>
        <v-radio color="red" label="不良" value="2"></v-radio>
        <v-radio color="black" label="無此項目" value="3"></v-radio>
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
import {
  fetchFormOrderOne,
  createFormOrder0,
  updateFormOrder,
} from "@/apis/formManage/serve";
import dateSelect from "@/components/forManage/dateSelect";
import deptSelect from "@/components/forManage/deptSelect";
import commonQuestion from "@/components/forManage/commonQuestion";
import { Actions } from "@/assets/js/actions";
import { Constrant } from "@/assets/js/constrant";
export default {
  props: {
    item: Object,
    editType: String,
    DB_Table: String,
  },
  data: () => ({
    actions: Actions,
    commonSettings: {
      iconShow: false,
      title: "6S 定期檢查表(月)",
      isLoading: false,
      deptReadonly: true,
    },
    inputData: {
      RPFlowNo: "",
      DepartCode: "",
      DepartName: "",
      ID: "",
      Name: "",
      editableData: {
        CheckDay: "",
        CheckOption1: "0",
        CheckOption2: "0",
        CheckOption3: "0",
        CheckOption4: "0",
        CheckOption5: "0",
        CheckOption6: "0",
        CheckOption7: "0",
        CheckOption8: "0",
        CheckOption9: "0",
        CheckOption10: "0",
        Memo_1: "",
        Memo_2: "",
        Memo_3: "",
        Memo_4: "",
        Memo_5: "",
        Memo_6: "",
        Memo_7: "",
        Memo_8: "",
        Memo_9: "",
        Memo_10: "",
      },
    },
    settings: {
      subtitle: [
        "1.依職業安全衛生法第23條規定辦理。",
        "2.檢查結果依狀態選擇良好、不良、無此項目打。",
        "4.本表月底前完成檢查，經主管核章後，留存於管理單位，保存三年備查。",
      ],
      qestions: [
        { question: "1. 工作場所", method:"1.工作場所環境（含四周溝渠）是否保持整潔？機械器具材料是否排列整齊及擦拭乾淨？廢棄物料(鐵、白鐵、銅、建材)是否有分區放置？現場地面油蹟是否按時清理？燈具照明有無燈管閃爍、不亮？通道是否堆置雜物影響通行順暢？逃生門、梯是否有標示及正常通暢？電氣安全使用是否良好？" },
        { question: "2. 辦公室", method:"2.辦公室環境是否保持整齊清潔？辦公桌除電腦、電話外其他物品是否收拾妥當？檔案資料是否分類、標示、歸定位及經管或使用之設備是否數量恰當，位置是否擺放整齊、有效率？燈具照明有無燈管閃爍、不亮？櫥櫃上方是否有放置易掉落物品？通道是否堆置雜物影響通行順暢？逃生門、梯是否有標示及正常通暢？電氣安全使用是否良好？" },
        { question: "3. 廁所", method:"3.廁所是否有定期打掃乾淨？廁內垃圾桶有無加蓋？廁所通風設備是否正常運作，有無異味？地面是否溼滑及擦拭乾淨？" },
        { question: "4. 廚房", method:"4.廚房是否有定期打掃乾淨？瓦斯不用開關是否予以旋緊？通風排氣是否良好？地面是否溼滑及擦拭乾淨？電氣安全使用是否良好？不用電器是否有拔掉電源？是否確實？保管品是否確實登入保管簿內？材料及物品是否有定期予以清潔打掃？" },
        { question: "5. 儲藏室及倉庫", method:"5.材料及物品是否有分類整理存放整齊？有財產編號之財產登記是否確實？保管品是否確實登入保管簿內？材料及物品是否有定期予以清潔打掃？" },
        { question: "6. 飲水機", method:"6.面板與檯面是否予以清潔？冷熱水出水是否正常？濾心是否定期予以更換？定期保養工作紀錄是否確實填寫？" },
        { question: "7. 逃生通道", method:"7.緊急出口指示燈照明裝置是否有亮？走道是否堆置雜物妨礙逃生通行？門鎖是否正常？" },
        { question: "8. 消防設施", method:"8.消防警示燈是否明亮？消防設施有無警訊出現？設備是否正常？滅火器有無短少或過期情形？滅火器是否有定期檢查及填寫檢查表？消防發電機是否有定期予以發動及保養？" },
        { question: "9. 綠美化", method:"9.場庫區四周環境綠美化工作是否良好？樹木及花草是否定期整理及修剪？" },
        { question: "10. 垃圾桶", method:"10.桶外面是否擦拭乾淨？桶內垃圾有無外溢散亂，有無蚊蟲滋生？垃圾是否有做分類處理？" },
      ],
      columns: {
        option: "CheckOption",
        memo: "Memo_",
      },
      width: {
        qusetion: 2,
        method: 5,
        option: 2,
        memo: 3,
      },
    },
  }),
  components: {
    dateSelect,
    deptSelect,
    commonQuestion,
  },
  mounted() {
    this.editType == this.actions.edit
      ? this.viewPage(this.item)
      : this.newPage();
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
          "CheckOption1",
          "Memo_1",
          "CheckOption2",
          "Memo_2",
          "CheckOption3",
          "Memo_3",
          "CheckOption4",
          "Memo_4",
          "CheckOption5",
          "Memo_5",
          "CheckOption6",
          "Memo_6",
          "CheckOption7",
          "Memo_7",
          "CheckOption8",
          "Memo_8",
          "CheckOption9",
          "Memo_9",
          "CheckOption10",
          "Memo_10",
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
          //console.log(err);
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
      let str0 = ''
      for(let itemKey in this.inputData.editableData){
        if(itemKey.substr(0, 11) == 'CheckOption'){
          str0 += this.inputData.editableData[itemKey]
        }
      }
      if(str0.includes('0')){
        alert("檢查結果未填妥。")
        return
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
            //console.log(err);
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
            //console.log(err);
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
  filters: {
    // editStatus: function (value) {
    //   let rtnStr = "";
    //   if (value == this.actions.add) {
    //     rtnStr = "新增";
    //   } else if (value == this.actions.edit) {
    //     rtnStr = "編輯";
    //   } else {
    //     rtnStr = "";
    //   }
    //   return rtnStr;
    // },
  },
  watch: {},
};
</script>