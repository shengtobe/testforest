<template>
  <div class="px-6 py-4">
    <!-- 說明區域 -->
    <v-row no-gutter v-if="settings.subtitles">
      <v-col cols="12">
        <p v-for="(sub,sIndex) in settings.subtitles" :key="'S_'+sIndex">{{ sub }}</p>
      </v-col>
    </v-row>
    <!-- 單獨填寫區域 -->
    <v-row no-gutter class="indigo--text">
      <v-col cols="12" sm="4">
        <dateSelect
          :label="forDate"
          key="checkDate"
          :showIcon="commonSettings.iconShow"
          v-model="value.editableData.CheckDay"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <deptSelect
          :label="forDept"
          v-model="value.DepartCode"
          :showIcon="commonSettings.iconShow"
          outType="key"
          :readonly="commonSettings.deptReadonly"
          key="department"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <h3 class="mb-1">
          <slot name="manLabel">檢查人員</slot>
        </h3>
        <v-text-field
          solo
          v-model="value.Name"
          :readonly="commonSettings.deptReadonly"
        />
      </v-col>
      <slot name="moreDetails" :editItem="value.editableData"></slot>
    </v-row>
    <!-- 摺疊題目區 -->
    <v-expansion-panels multiple>
      <slot name="preExpan" :editItem="value.editableData"></slot>
      <v-expansion-panel v-for="(question,index) in settings.questions" :key="'EXP_'+index">
        <v-expansion-panel-header color="teal" class="white--text">
          {{ question.panelLabel }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
            <v-col cols="12" :sm="questionLabel.width" v-for="(questionLabel,ind) in question.questionLabels" :key="'EXP_QL_'+ind">
              <h3 class="mb-1">
                {{ questionLabel.text }}
              </h3>
            </v-col>
          </v-row>
          <v-alert
            dense
            border="top"
            colored-border
            color="teal"
            elevation="4"
            v-for="(answer,ind) in question.questionAnswers"
            :key="'EXP_QA_'+(question.answerStart+ind)"
            class="mb-6 mt-4">
            <v-row no-gutter>
              <v-col cols="12" :sm="question.questionLabels[i].width" v-for="(element,i) in answer" :key="'EXP_QA_'+(question.answerStart+ind).toString()+'_'+i">
                <!-- 顯示純文字 -->
                <template v-if="element.type=='label'">
                  {{ element.label }}
                </template>
                <!-- 字串輸入 -->
                <template v-else-if="element.type=='text'">
                  <span class="d-sm-none error--text" v-if="element.label">{{ element.label }}</span>
                  <v-text-field
                    solo
                    type="text"
                    v-model="value.editableData[element.model+(question.answerStart+ind)]"
                  />
                </template>
                <!-- 數字輸入 -->
                <template v-else-if="element.type=='number'">
                  <span class="d-sm-none error--text" v-if="element.label">{{ element.label }}</span>
                  <v-text-field
                    solo
                    type="number"
                    :min="element.number.min"
                    :max="element.number.max"
                    v-model="value.editableData[element.model+(question.answerStart+ind)]"
                  />
                </template>
                <!-- 單選按鈕 -->
                <template v-else-if="element.type=='radio'">
                  <span class="d-sm-none error--text" v-if="element.label">{{ element.label }}</span>
                  <v-radio-group
                    dense
                    row
                    v-model="value.editableData[element.model+(question.answerStart+ind)]"
                    class="pa-0 ma-0"
                    >
                    <v-radio 
                      v-for="(radio,c) in element.radio" 
                      :key="'EXP_QA_RAD_'+(question.answerStart+ind).toString()+'_'+i+'_'+c"
                      :color="radio.color" 
                      :label="radio.label" 
                      :value="radio.value" 
                      />
                  </v-radio-group>
                </template>
                <!-- 下拉選單 -->
                <template v-else-if="element.type=='select'">
                  <span class="d-sm-none error--text" v-if="element.label">{{ element.label }}</span>
                  <v-select
                    :items="element.select"
                    v-model="value.editableData[element.model+(question.answerStart+ind)]"
                    solo
                  />
                </template>
                <!-- 輸入區域 -->
                <template v-else-if="element.type=='area'">
                  <span class="d-sm-none error--text" v-if="element.label">{{ element.label }}</span>
                  <v-textarea 
                    auto-grow
                    outlined 
                    rows="2" 
                    v-model="value.editableData[element.model+(question.answerStart+ind)]"
                    />
                </template>
              </v-col>
            </v-row>
          </v-alert>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <slot name="afterExpan" :editItem="value.editableData"></slot>
    </v-expansion-panels>
    <!-- 文字區塊 -->
    <v-row v-if="settings.textareas">
      <v-col cols="12" v-for="(textarea,index) in settings.textareas" :key="'TXA_'+index">
        <h3 class="mb-1 indigo--text">
          {{ textarea.label }}
        </h3>
        <v-textarea
          auto-grow
          outlined
          rows="4"
          v-model="value.editableData[textarea.model]"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
/*
  slots =>
    manLabel => 檢查人員改label名稱
    moreDetails => 新增上層多出來的內容
    preExpan => 在統一產生的之前的題目(摺疊區)
    afterExpan => 在統一產生之後的題目(摺疊區)
  dateLabel => 檢查日期改label名稱
  deptLabel => 管理單位改label名稱

  settings: {
    subtitles: [
      <string>,
    ],
    questions: [
      {
        panelLabel: <string>,
        questionLabels: [
          {
            width: <number>,
            text: <string>,
          },
        ],
        answerStart: <number>,
        questionAnswers:[
          [    
            {
              label: <string>,
              <model: <變數名稱前綴 string>, //預設所有可變動資料都放在editableData裡面>
              type: <label/text/number/radio/select/area string>,
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
          ],
        ]
      }
    ],
    textareas: [
      {
        label: <string>,
        model: <變數名稱 string>, //預設所有可變動資料都放在editableData裡面
      }
    ],
  }
*/
import dateSelect from "@/components/forManage/dateSelect";
import deptSelect from "@/components/forManage/deptSelect";
export default {
  name: "commonQuestion2",
  props: {
    value: Object,
    settings: Object,
    dateLabel: String,
    deptLabel: String,
  },
  data: () => ({
    commonSettings: {
      iconShow: false,
      deptReadonly: true,
    },
    forDate: '檢查日期',
    forDept: '管理單位',
  }),
  components: {
    dateSelect,
    deptSelect,
  },
  mounted() {
    this.forDate = (this.dateLabel == undefined || this.dateLabel == null)?this.forDate:this.dateLabel
    this.forDept = (this.deptLabel == undefined || this.deptLabel == null)?this.forDept:this.deptLabel
  },
  watch: {
    value: function (value) {
      this.$emit("input", value);
    },
  },
}

</script>