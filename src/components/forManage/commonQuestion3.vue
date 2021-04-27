<template>
  <div>
    <v-row no-gutter class="label-header d-none d-sm-flex font-weight-black">
      <v-col cols="12" :sm="header.width" v-for="(header,hIndex) in settings.headers" :key="'H'+hIndex">
        <h3 class="mb-1">{{ header.text }}</h3>
      </v-col>
    </v-row>
    <v-row no-gutter class="label-header d-none d-sm-flex">
      <v-col cols="12">
        <v-alert 
          dense 
          border="top" 
          colored-border 
          color="border-bg-dark-yellow" 
          elevation="4" 
          class="mb-6" 
          v-for="(answer,aIndex) in settings.alerts" 
          :key="'A'+aIndex"
          >
          <v-row no-gutter>
            <v-col 
              cols="12" 
              :sm="settings.headers[cIndex].width" 
              v-for="(col,cIndex) in answer.columns"
              :key="'A'+aIndex+'C'+cIndex"
              style="display: flex;flex-direction:column;justify-content: space-around;"
              >
              <div
                v-for="(row,rIndex) in col.rows"
                :key="'A'+aIndex+'C'+cIndex+'R'+rIndex"
                class="my-2"
                >
                <span v-if="row.type=='label'">{{ row.label }}</span>
                <span v-if="row.type!='label'&&row.label" class="d-sm-none error--text">{{ row.label }}：</span>
                <v-textarea 
                  auto-grow 
                  solo 
                  hide-details 
                  rows="1" 
                  :placeholder="row.placeholder||''" 
                  v-if="row.type=='area'"
                  v-model="value.editableData[settings.headers[cIndex].model+(answer.startAt + rIndex)]"
                  >
                  <template v-slot:prepend v-if="row.prepend"><span style="white-space:nowrap;">{{ row.prepend }}</span></template>
                  <template v-slot:append v-if="row.append"><span style="white-space:nowrap;">{{ row.append }}</span></template>
                </v-textarea>
                <dateSelect 
                  v-if="row.type=='date'" 
                  v-model="value.editableData[settings.headers[cIndex].model+(answer.startAt + rIndex)]"
                  />
                <deptSelect 
                  v-if="row.tyoe=='dept'"
                  v-model="value.editableData[settings.headers[cIndex].model+(answer.startAt + rIndex)]"
                  />
                <v-text-field
                  v-if="row.type=='text'"
                  :placeholder="row.placeholder||''"
                  v-model="value.editableData[settings.headers[cIndex].model+(answer.startAt + rIndex)]"
                  solo
                  hide-details
                  type="text"
                  >
                  <template v-slot:prepend v-if="row.prepend"><span style="white-space:nowrap;">{{ row.prepend }}</span></template>
                  <template v-slot:append v-if="row.append"><span style="white-space:nowrap;">{{ row.append }}</span></template>
                </v-text-field>
                <v-text-field
                  v-if="row.type=='number'"
                  :placeholder="row.placeholder||''"
                  v-model="value.editableData[settings.headers[cIndex].model+(answer.startAt + rIndex)]"
                  solo
                  hide-details
                  type="number"
                  :min="row.min"
                  :max="row.max"
                  >
                  <template v-slot:prepend v-if="row.prepend"><span style="white-space:nowrap;">{{ row.prepend }}</span></template>
                  <template v-slot:append v-if="row.append"><span style="white-space:nowrap;">{{ row.append }}</span></template>
                </v-text-field>
                <v-radio-group
                  dense
                  hide-details
                  solo
                  row
                  class="pa-0 ma-0"
                  v-if="row.type=='radio'"
                  v-model="value.editableData[settings.headers[cIndex].model+(answer.startAt + rIndex)]"
                  >
                  <v-radio 
                    v-for="(radio,c) in row.radio" 
                    :key="'A'+aIndex+'C'+cIndex+'R'+rIndex+'RAD'+c"
                    :color="radio.color" 
                    :label="radio.label" 
                    :value="radio.value" 
                    />
                </v-radio-group>
                <v-select
                  hide-details
                  :items="row.select"
                  :placeholder="row.placeholder||''"
                  v-model="value.editableData[settings.headers[cIndex].model+(answer.startAt + rIndex)]"
                  v-if="row.type=='select'"
                  solo
                />
              </div>
            </v-col>
          </v-row>
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>
<script>
/*
只負責產生題目
settings: {
  headers: [
    {
      muti: <Boolean>,  //不是的話會置中對齊
      width: <Number>,
      text: <String>,
      <model: <String>,>
    }
  ]
  alerts: [
    {
      startAt: <Number>,
      columns:[
        {
          rows:[
            {
              <label: <String>,>
              type: <label/date/dept/text/area/select/radio/number/skip String>,
              <placeholder: <String>,>
              <prepend: <String>,>
              <append: <String>,>
              <max: <Number>,>
              <min: <Number>,>
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
            }
          ]
        }
      ]
    }
  ]
}
*/
import dateSelect from "@/components/forManage/dateSelect";
import deptSelect from "@/components/forManage/deptSelect";
export default {
  name: "commonQuestion2",
  props: {
    value: Object,
    settings: Object,
  },
  data: () => ({
    commonSettings: {
      iconShow: false,
      deptReadonly: true,
    },
  }),
  components: {
    dateSelect,
    deptSelect,
  },
  mounted() {
  },
  watch: {
    value: function (value) {
      this.$emit("input", value);
    },
  },
}
</script>