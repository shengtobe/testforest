<!--
  輸入: 
    label: String 標題
    showIcon: Boolean 是否要圖標，預設否 
  v-model: 綁定變數
  max: String
  min: String
  委派 清空event: cleanEvent
  委派 輸入event: inputEvent
  使用範例:
    <dateSelect label="檢查日期(起)" v-model="input.dateStart" key="dateStart" :showIcon="true | false"/>
-->
<template>
  <div>
    <h3 class="mb-1" v-if="label">
      <v-icon class="mr-1 mb-1" v-if="showIcon">mdi-calendar-text</v-icon
      >{{ label }}
    </h3>
    <v-menu
      v-model="showYN"
      :close-on-content-click="false"
      transition="scale-transition"
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model.trim="dataSet"
          solo
          hide-details
          v-on="on"
          readonly
          clearable
          @click:clear="cleanEvent"
        ></v-text-field>
      </template>
      <v-date-picker
        color="primary"
        v-model="dataSet"
        @input="inputEvent"
        locale="zh-tw"
        :max="max"
        :min="min"
      ></v-date-picker>
    </v-menu>
  </div>
</template>
<script>
export default {
  name: "dateSelect",
  props: {
    showIcon: Boolean,
    label: String,
    value: String,
    max: String,
    min: String,
  },
  data: () => ({
    showYN: false,
    dataSet: "",
  }),
  components: {},
  mounted() {
    this.dataSet = this.value;
    this.showIcon = this.showIcon ? this.showIcon : false;
  },
  computed: {
    // compute_name:function() {
    // }
  },
  created: function () {},
  methods: {
    cleanEvent(){
      this.$emit("cleanEvent");
    },
    inputEvent(){
      this.showYN = false
      this.$emit("inputEvent");
    }
  },
  filters: {
    // filter_name:function(value) {
    // }
  },
  watch: {
    dataSet: function (value) {
      this.$emit("input", value);
    },
    value: function (value) {
      this.dataSet = value;
    },
  },
};
</script>