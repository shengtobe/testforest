<!--
  輸入: 
    id: String 操作人員編號
    DB_Table: String 表單編號，Ex：RP055
    RPFlowNo: String 紀錄編號
  使用範例:
    <dialogDelete
        :id="doMan.id"
        :DB_Table="DB_Table"
        :RPFlowNo="RPFlowNo"
        @search="search"
        @close="close"
        @cancel="closeDialogDel"
      />
  可參考檔案：AcetyleneWeldChecklistYear.vue
-->
<template>
  <v-card class="theme-del-card">
    <v-card-title class="white--text px-4 py-1 headline"
      >確認是否刪除?</v-card-title
    >
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="btn-close white--text" @click="cancel">取消</v-btn>
      <v-btn @click="deleteRecord()" class="btn-delete white--text"
        >刪除</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { deleteFormOrder } from "@/apis/formManage/serve";
import { getNowFullTime } from "@/assets/js/commonFun";
import { Constrant } from "@/assets/js/constrant";

export default {
  props: {
    id: String, // 執行人員id
    DB_Table: String, // 資料表代號
    RPFlowNo: String, // Key No.
  },
  data: () => ({}),
  components: {},
  mounted() {},
  computed: {
    ...mapState("user", {
      userData: (state) => state.userData, // 使用者基本資料
    }),
  },
  created: function () {},
  methods: {
    ...mapActions("system", [
      "chMsgbar", // messageBar
      "chLoadingShow", // 切換 loading 圖顯示
    ]),
    deleteRecord() {
      this.chLoadingShow({show:true});
      deleteFormOrder({
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.id, // 操作人id
        KeyName: this.DB_Table, // DB table
        RPFlowNo: this.RPFlowNo,
        KeyItem: [{ Column: "RPFlowNo", Value: this.RPFlowNo }],
      })
        .then((res) => {
          this.dialogDel = false;
          this.chMsgbar({ success: true, msg: Constrant.delete.success });
        })
        .catch((err) => {
          //console.log(err);
          this.chMsgbar({ success: false, msg: Constrant.delete.failed });
        })
        .finally(() => {
          this.chLoadingShow({show:false});
          this.success();
        });
    },
    success() {
      this.$emit("search");
      this.$emit("close");
    },
    cancel() {
      this.$emit("cancel");
    },
  },
  filters: {},
  watch: {},
};
</script>