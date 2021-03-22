<template>
  <div class="px-6 py-4">
    <v-row>
      <v-col cols="12">
        <p v-for="(item, index) in settings.subtitle" :key="'subtitle' + index">
          {{ item }}
        </p>
      </v-col>
      <!-- 檢查項目 -->
      <v-col cols="12">
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="4">
            <dateSelect
              label="檢查日期"
              key="checkDate"
              :showIcon="commonSettings.iconShow"
              v-model="value.editableData.CheckDay"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <deptSelect
              label="管理單位"
              v-model="value.DepartCode"
              :showIcon="commonSettings.iconShow"
              outType="key"
              :readonly="commonSettings.deptReadonly"
              key="department"
            />
          </v-col>
          <v-col cols="12" sm="4">
            <h3 class="mb-1">檢查人員</h3>
            <v-text-field
              solo
              v-model="value.Name"
              :readonly="commonSettings.deptReadonly"
            />
          </v-col>
          <slot name="moreDetails" :editItem="value.editableData"></slot>
        </v-row>
        <v-row
          no-gutter
          class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
        >
          <v-col cols="12" :sm="settings.width.qusetion">
            <h3 class="mb-1">檢查部分</h3>
          </v-col>
          <v-col
            cols="12"
            v-if="settings.width.method"
            :sm="settings.width.method"
          >
            <h3 class="mb-1">檢查方法</h3>
          </v-col>
          <v-col cols="12" :sm="settings.width.option">
            <h3 class="mb-1">檢查結果</h3>
          </v-col>
          <v-col cols="12" v-if="settings.width.memo" :sm="settings.width.memo">
            <h3 class="mb-1">備註</h3>
          </v-col>
          <v-col
            cols="12"
            v-if="settings.width.memo2"
            :sm="settings.width.memo2"
          >
            <h3 class="mb-1"><slot name="memo2Name">備註2</slot></h3>
          </v-col>
          <slot name="moreTitle"></slot>
        </v-row>
        <v-alert
          dense
          border="top"
          colored-border
          color="teal"
          elevation="4"
          v-for="(item, idx) in settings.qestions"
          :key="idx"
          class="mb-6"
        >
          <v-row no-gutter>
            <v-col cols="12" :sm="settings.width.qusetion">{{ item.question }}</v-col>
            <v-col 
              cols="12" 
              v-if="settings.width.method"
              :sm="settings.width.method"
            >
              <v-select
                v-if="settings.columns.method"
                :items="methodOptions"
                v-model="
                  value.editableData[settings.columns.method + (idx + 1)]
                "
                solo
              >
              </v-select>
              <label v-else>{{ item.method }}</label>
            </v-col>
            <v-col cols="12" :sm="settings.width.option">
              <span class="d-sm-none error--text">檢查結果：</span>
              <v-radio-group
                dense
                row
                v-model="
                  value.editableData[settings.columns.option + (idx + 1)]
                "
                class="pa-0 ma-0"
              >
                <slot name="resultOtions">
                  <v-radio color="success" label="正常" value="1"></v-radio>
                  <v-radio color="red" label="異常" value="2"></v-radio>
                  <v-radio color="black" label="無此項目" value="3"></v-radio>
                </slot>
              </v-radio-group>
            </v-col>
            <v-col cols="12" v-if="settings.width.memo" :sm="settings.width.memo">
              <v-textarea
                auto-grow
                outlined
                rows="2"
                v-model="value.editableData[settings.columns.memo + (idx + 1)]"
              />
            </v-col>
            <v-col
              cols="12"
              v-if="settings.width.memo2"
              :sm="settings.width.memo2"
            >
              <v-textarea
                auto-grow
                outlined
                rows="2"
                v-model="value.editableData[settings.columns.memo2 + (idx + 1)]"
              />
            </v-col>
            <slot name="moreMemo" :editItem="value.editableData" :index="idx"></slot>
          </v-row>
        </v-alert>
        <slot name="afterQuestions" :editItem="value.editableData"></slot>
      </v-col>
    </v-row>
    <v-row v-if="settings.textarea">
      <!-- 改善建議、改善追蹤 -->
      <v-col cols="12" v-for="(item,index) in settings.textarea" :key="'ta'+index">
        <h3 class="mb-1 indigo--text">{{ item.label }}</h3>
        <v-textarea
          auto-grow
          outlined
          rows="4"
          v-model="value.editableData[item.column]"
        />
      </v-col>
      <!-- END 檢查項目 -->
    </v-row>
  </div>
</template>
<script>
/*
settings: {
  subtitle:[放上面的說明],
  qestions: [ 題目設定 string
    {
      question: 題目,
      <method: 固定檢查方法>, 
    }
  ],
  columns: { 欄位前綴 string
    <method: 檢查方法>,
    option: 檢查結果,
    <memo: 備註>,
    <memo2: 備註2>,
  },
  width: { 寬度 number
    qusetion: 題目,
    method: 檢查方法,
    option: 檢查結果,
    <memo: 備註>,
    <memo2: 備註2>,
  },
  options: {
    method: [
      {
        text: 顯示名稱
        value: 資料值
      }
    ]
  },
  textarea: [
    {
      label: 名稱,
      column: 欄位 
    }
  ]
}
使用範例
<commonQuestion v-model="inputData" :settings="settings"/>
*/
import dateSelect from "@/components/forManage/dateSelect";
import deptSelect from "@/components/forManage/deptSelect";
export default {
  name: "commonQuestion",
  props: {
    value: Object,
    settings: Object,
  },
  data: () => ({
    commonSettings: {
      iconShow: false,
      deptReadonly: true,
    },
    defaultSettings: {
      options: {
        method: [
          { text: "動作測試", value: "1" },
          { text: "目視點檢", value: "2" },
        ],
      },
    },
    methodOptions: [],
  }),
  components: {
    dateSelect,
    deptSelect,
  },
  mounted() {
    this.methodOptions = this.settings.options
      ? this.settings.options.method
      : this.defaultSettings.options.method;
  },
  watch: {
    value: function (value) {
      this.$emit("input", value);
    },
  },
};
</script>