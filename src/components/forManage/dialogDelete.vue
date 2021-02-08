<!--
  輸入: 
    label: String 標題
    showIcon: Boolean 是否要圖標，預設否 
  v-model: 綁定變數
  使用範例:
    <dateSelect label="檢查日期(起)" v-model="input.dateStart" key="dateStart" :showIcon="true | false"/>
-->
<template>
  <v-dialog v-model="showThis" @close="doClose" persistent max-width="290">
    <v-card>
      <v-card-title class="red white--text px-4 py-1 headline"
        >確認是否刪除?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="showThis = false">取消</v-btn>
        <v-btn color="red" @click="deleteRecord(doMan.id, DB_Table, RPFlowNo)"
          >刪除</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { deleteFormOrder } from "@/apis/formManage/serve";

export default {
  name: "dateSelect",
  props: {
    show: Boolean,
    id: String,
    DB_Table: String,
    RPFlowNo: String,
  },
  data: () => ({
    showThis: false,
  }),
  components: {},
  mounted() {
    //this.dataSet = this.value;
  },
  computed: {
    // compute_name:function() {
    // }
  },
  created: function () {},
  methods: {
    deleteRecord(UserId, DB_Table, RPFlowNo) {
      this.action = Actions.delete;
      this.chLoadingShow();
      deleteFormOrder({
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: UserId, // 操作人id
        KeyName: DB_Table, // DB table
        RPFlowNo: RPFlowNo,
        KeyItem: [{ Column: "RPFlowNo", Value: RPFlowNo }],
      })
        .then((res) => {
          this.dialogDel = false;
          this.chMsgbar({ success: true, msg: Constrant.delete.success });
        })
        .catch((err) => {
          console.log(err);
          this.chMsgbar({ success: false, msg: Constrant.delete.failed });
        })
        .finally(() => {
          this.chLoadingShow();
          this.ShowDetailDialog = false;
          this.search();
        });
    },
    doClose() {
      this.$emit("dialogData", false); //子组件对openStatus修改后向父组件发送事件通知
    },
  },
  filters: {
    // filter_name:function(value) {
    // }
  },
  watch: {
    // dataSet: function (value) {
    //   this.$emit("input", value);
    // },
    // value: function (value) {
    //   this.dataSet = value;
    // },
    show: function (value) {
      this.showThis = value;
      console.log("ShowThis: " + value);
    },
  },
};
</script>