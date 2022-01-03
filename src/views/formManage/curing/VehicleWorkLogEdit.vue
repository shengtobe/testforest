<template>
  <v-card class="theme-card">
    <v-card-title class=" white--text px-4 py-1">
      {{ editType }}{{ title }}
      <v-spacer></v-spacer>
      <v-btn dark fab small text @click="close" class="mr-n2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <div class="px-6 py-4 label-header">
      <v-row>
        <!-- 檢查項目 -->
        <v-col cols="12">
          <v-row no-gutter class="label-header">
            <v-col cols="12" sm="4">
              <dateSelect
                label="日期"
                key="checkDate"
                :showIcon="commonSettings.iconShow"
                v-model="inputData.editableData.CheckDay"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="mb-1">{{ _typeChangeTitle.man }}人員</h3>
              <v-autocomplete
                :items="orgList"
                :filter="aFilter"
                label="輸入人名或單位名稱進行搜尋"
                solo
                clearable
                deletable-chips
                multiple
                small-chips
                v-model="inputData.editableData.HandlerID"
              />
            </v-col>
          </v-row>
          <v-row no-gutter class="label-header">
            <v-col cols="12" sm="6">
              <h3 class="mb-1">{{ _typeChangeTitle.memo1 }}</h3>
              <v-textarea 
                auto-grow 
                solo 
                hide-details 
                rows="8" 
                v-model="inputData.editableData.Memo1"
                >
              </v-textarea>
            </v-col>
            <v-col cols="12" sm="6">
              <h3 class="mb-1">{{ _typeChangeTitle.memo2 }}</h3>
              <v-textarea 
                auto-grow 
                solo 
                hide-details 
                rows="8" 
                v-model="inputData.editableData.Memo2"
                >
              </v-textarea>
            </v-col>
          </v-row>
        </v-col>
        <!-- END 檢查項目 -->
      </v-row>
    </div>

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
import { fetchOrganization } from '@/apis/organization'
import { Actions } from "@/assets/js/actions";
import { Constrant } from "@/assets/js/constrant";
export default {
  props: {
    item: Object,
    editType: String,
    DB_Table: String,
    title: String,
    type: String,
  },
  data: () => ({
    actions: Actions,
    commonSettings: {
      iconShow: false,
      isLoading: false,
      deptReadonly: true,
    },
    deptOptions:[],
    inputData: {
      RPFlowNo: "",
      DepartCode: "",
      DepartName: "",
      ID: "",
      Name: "",
      editableData: {
        CheckDay: "",
        Type: "",
        HandlerID: [],
        Memo1: "",
        Memo2: "",
      },
    },
    orgList: [],
  }),
  components: {
    dateSelect
  },
  mounted() {
    this.editType == this.actions.edit
      ? this.viewPage(this.item)
      : this.newPage();
    this.inputData.editableData.Type = this.type
    this._getOrg()
  },
  computed: {
    ...mapState("user", {
      userData: (state) => state.userData, // 使用者基本資料
    }),
    _typeChangeTitle: function() {
      if(this.type == "1") {
        return {
          man: "保養",
          memo1: "工作項目-上午",
          memo2: "工作項目-下午"
        }
      }else{
        return {
          man: "處理",
          memo1: "無法維護項目",
          memo2: "處理情形"
        }
      }
    }
  },
  methods: {
    ...mapActions("system", [
      "chMsgbar", // messageBar
      "chLoadingShow", // 切換 loading 圖顯示
    ]),
    _getOrg() { //抓單位
      this.orgIsLoading = true
      fetchOrganization({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
      }).then(res=>{
        if (res.data.ErrorCode == 0) {
          let rtndata = res.data
          const people = rtndata.user_list_group_4.map(element=>{
            let rtnObj = {}
            rtnObj.text = element.UserName
            rtnObj.value = element.UserName
            rtnObj.group = element.DepartName 
            rtnObj.child = ""
            return rtnObj
          })
          let dept1 = rtndata.user_depart_list_group_1.filter(ele=>ele.DepartCode=="ARCO019").map(ele => {
            let rtnObj1 = {}
            rtnObj1.header = ele.DepartName
            rtnObj1.text = ele.DepartName
            rtnObj1.group = ele.DepartName
            return rtnObj1
          })
          let lv2Names = []
          let dept2 = rtndata.user_depart_list_group_2.filter(ele=>ele.DepartParentName=="車輛養護科").map(ele => {
            let rtnObj2 = {}
            rtnObj2.header = ele.DepartName
            rtnObj2.text = ele.DepartName
            rtnObj2.group = ele.DepartParentName
            lv2Names.push(ele.DepartName)
            return rtnObj2
          })
          const dept3 = rtndata.user_depart_list_group_3.filter(ele=>lv2Names.findIndex(e=>e==ele.DepartParentName)!=-1).map(ele => {
            let rtnObj3 = {}
            rtnObj3.header = ele.DepartName
            rtnObj3.text = ele.DepartName
            rtnObj3.group = ele.DepartParentName
            return rtnObj3
          })
        
          const that = this
          dept1.forEach(ele => {
            let rtnArrP1 = people.filter(e => {
              return e.group == ele.group
            })
            let rtnArr2 = dept2.filter(element => {
              return element.group == ele.text
            })
            if(rtnArrP1.length > 0 || rtnArr2.length > 0){
              ele.child = rtnArrP1.map(t=>t.text).toString()
              that.orgList.push(ele)
            }
            that.orgList.push(...rtnArrP1)
            rtnArr2.forEach(element => {
              let rtnArrP2 = people.filter(e => {
                return e.group == element.text
              })
              let rtnArr3 = []
              rtnArr3 = dept3.filter(item => {
                return item.group == element.text
              })
              if(rtnArrP2.length > 0 || rtnArr3.length > 0){
                element.child = rtnArrP2.map(t=>t.text).toString()
                that.orgList.push(element)
              }
              that.orgList.push(...rtnArrP2)
              rtnArr3.forEach(items => {
                let rtnArrP3 = people.filter(e => {
                  return e.group == items.text
                })
                if(rtnArrP3.length > 0){
                  items.child = rtnArrP3.map(t=>t.text).toString()
                  that.orgList.push(items)
                }
                that.orgList.push(...rtnArrP3)
              })
            })
          })
        }else{
          sessionStorage.errData = JSON.stringify({ errCode: res.data.Msg, msg: res.data.Msg })
          this.$router.push({ path: '/error' })
        }
      }).catch( err => {
        //console.log(err)
        this.chMsgbar({ success: false, msg: Constrant.query.failed })
      }).finally(() => {
        this.orgIsLoading = false
      })
    },
    aFilter(item, queryText, itemText) { //選人的filter
      const text = (itemText.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1)
      const child = (item.child.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1)
      const group = (item.group.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1)

      return text || group || child
    },
    newPage() {
      this.inputData.editableData.CheckDay = getTodayDateString();
      this.inputData.Name = this.userData.UserName;
      this.inputData.ID = this.userData.UserId;
      this.inputData.DepartCode = this.userData.DeptList[0].DeptId;
      this.inputData.DepartName = this.userData.DeptList[0].DeptDesc;
      this.inputData.editableData.HandlerID.push(this.userData.UserName);
      this.inputData.editableData.Type=this.type
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
          "HandlerID",
          "Memo1",
          "Memo2",
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
          that.inputData.editableData.HandlerID = that.inputData.editableData.HandlerID.split(",")
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
      this.chLoadingShow({ show: true});
      const that = this;
      let rtnObj = [];
      that.inputData.editableData.HandlerID = that.inputData.editableData.HandlerID.join()
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
          this.chLoadingShow({ show: false});
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
          this.chLoadingShow({ show: false});
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