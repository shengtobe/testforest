<template>
  <v-row dense>
    <v-col cols="auto" sm="2">
      <p class="font-weight-black title text-left font-size-50">
        {{ question.description }}
      </p>
    </v-col>
    <v-col cols="auto" sm="1">
      <v-radio-group
        dense
        row
        class="pa-0 ma-0"
        v-model.lazy="question.yesNo"
        :key="idx + '_' + idx2 + '_1'"
      >
        <v-radio color="success" label="是" value="1" />
        <v-radio color="failed" label="否" value="2" />
      </v-radio-group>
    </v-col>
    <v-col cols="auto" sm="2"
      ><v-radio-group
        dense
        row
        class="pa-0 ma-0"
        v-model.lazy="question.illegalType"
        :key="idx + '_' + idx2 + '_2'"
      >
        <v-radio color="red" label="肢體暴力" value="1" />
        <v-radio color="red" label="心理暴力" value="2" />
        <v-radio color="red" label="語言暴力" value="3" />
        <v-radio color="red" label="性騷擾" value="4" />
      </v-radio-group>
    </v-col>
    <v-col cols="auto" sm="1">
      <v-radio-group
        dense
        row
        class="pa-0 ma-0"
        v-model.lazy="question.possibility"
        :key="idx + '_' + idx2 + '_3'"
      >
        <v-radio color="red" label="可能發生" value="3" />
        <v-radio color="orange" label="不大可能" value="2" />
        <v-radio color="success" label="極不可能" value="1" /> </v-radio-group
    ></v-col>
    <v-col cols="auto" sm="1"
      ><v-radio-group
        dense
        row
        class="pa-0 ma-0"
        v-model.lazy="question.seriousness"
        :key="idx + '_' + idx2 + '_4'"
      >
        <v-radio color="red" label="嚴重" value="3" />
        <v-radio color="orange" label="中度" value="2" />
        <v-radio color="success" label="輕度" value="1" />
      </v-radio-group>
    </v-col>
    <v-col cols="auto" sm="1">
      <p :class="question.riskColor">{{ question.riskLevelStr }}</p>
    </v-col>
    <v-col cols="auto" sm="1">
      <v-radio-group
        dense
        row
        class="pa-0 ma-0"
        v-model.lazy="question.controlMechanism"
        :key="idx + '_' + idx2 + '_5'"
      >
        <v-radio color="success" label="工程控制" value="1" />
        <v-radio color="success" label="管理控制" value="2" />
        <v-radio color="success" label="個人防護" value="3" />
        <v-radio color="success" label="其他" value="4" /> </v-radio-group
    ></v-col>
    <v-col cols="auto" sm="2"
      ><v-textarea
        auto-grow
        outlined
        rows="2"
        v-model.lazy="question.measures"
        :key="idx + '_' + idx2 + '_6'"
      />
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "hazidRiskAssessmentQuestion",
  props: {
    question: Object,
    idx: Number,
    idx2: Number,
  },
  conputed: {},
};
</script>