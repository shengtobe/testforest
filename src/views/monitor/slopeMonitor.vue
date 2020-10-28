<template>
  <v-container style="max-width: 1200px">
    <v-row>
        <v-col cols="12" sm="3" class="indigo--text" >
            <h2 align="center"> 即時資料</h2>
        </v-col>
        <v-col cols="12" sm="9" >
            <v-spacer />
            <img style="width:78%" :src="imgUrl1" alt="err" />
            <v-spacer />
        </v-col>
    </v-row>
    
    <v-divider class="mx-2 mb-4" />

    <v-row style="margin-top:-2%">
      <!-- 控制措施 -->
      <v-col cols="12" sm="3" class="indigo--text">
            <h2 align="center"> 歷史資料</h2>
        </v-col>
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>查詢日期(起)
        </h3>
        <v-menu
          v-model="q_datestart"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="datestart" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="datestart"
            @input="q_datestart = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>查詢日期(迄)
        </h3>
        <v-menu
          v-model="q_dateend"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="dateend" solo v-on="on" readonly />
          </template>
          <v-date-picker
            color="purple"
            v-model="dateend"
            @input="q_dateend = false"
            locale="zh-tw"
          />
        </v-menu>
      </v-col>
      <v-col cols="12" md="2" align-self="center">
        <v-btn color="green" dark large>
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
      </v-col>
      <v-col cols="12" sm="1"></v-col>
    </v-row>
    <v-row>
        <v-col cols="12" sm="3" class="indigo--text" style="margin-left:-5px">
        </v-col>
        <v-col cols="12" sm="9" style="margin-top:-3%">
            <v-spacer />
            <img style="width:96%" :src="imgUrl2" alt="err" />
            <v-spacer />
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    imgUrl1: require("../../assets/images/slope1.jpg"),
    imgUrl2: require("../../assets/images/slope2.jpg"),
    
  }),
  components: {
  },
  methods: {
  },
  created() {},
};
</script>
