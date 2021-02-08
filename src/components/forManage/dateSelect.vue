<!--
  輸入: 
    label: String 標題
    iconYN: Boolean 是否要圖標，預設否 
  v-model: 綁定變數
  使用範例:
    <dateSelect label="檢查日期(起)" v-model="input.dateStart" key="dateStart" :iconYN="變數名稱"/>
-->
<template>
  <div>
    <h3 class="mb-1">
      <v-icon class="mr-1 mb-1" v-if="ifIcon">mdi-calendar-text</v-icon>{{label}}
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
          v-on="on"
          readonly
        ></v-text-field>
      </template>
      <v-date-picker
        color="purple"
        v-model="dataSet"
        @input="showYN = false"
        locale="zh-tw"
      ></v-date-picker>
    </v-menu>
  </div>
</template>
<script>
export default {
  name: "dateSelect",
  props:{
    iconYN: Boolean,
    label: String,
    value: String,
  },
  data: () => ({
    showYN: false,
    dataSet: "",
    ifIcon: false,
  }),
  components: {
  
  },
  mounted() {
    this.dataSet = this.value
    this.ifIcon=(this.iconYN)?this.iconYN:this.ifIcon
  },
  computed: {
    // compute_name:function() {
    
    // }
  },
  created: function () {
  
  },
  methods: {

  },
  filters: {
    // filter_name:function(value) {
    
    // }
  },
  watch: {
    dataSet: function(value) {
      this.$emit('input',value)
    },
    value: function(value) {
      this.dataSet = value
    }
  }
}
</script>