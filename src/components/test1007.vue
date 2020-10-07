<script>
export default {
  props: {
    titlekm: {
      type: String,
      default: ''
    },
    hide1: {
      type: String,
      default: ''
    },
    hide2: {
      type: String,
      default: ''
    },
    hide3: {
      type: String,
      default: ''
    },
    hide4: {
      type: String,
      default: ''
    },
    hide5: {
      type: String,
      default: ''
    },
    hide6: {
      type: String,
      default: ''
    },
    hide7: {
      type: String,
      default: ''
    },
    hide8: {
      type: String,
      default: ''
    },
  },
  computed: {
    
  }
}
</script>

<template>
  <div>
    <v-row no-gutter class="indigo--text">
      <v-col cols="12">
        <h3>{{ titlekm }}</h3>
        <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
          <v-row no-gutter>
            <!-- 檢查項目 part 1/2 -->
            <v-col cols="12" sm="12">
              <v-row no-gutter style="width: 100%;">
                <v-col sm="3" class="aa" v-if="hide1 === 'true'">
                  <h3>電源邏輯電路</h3>
                  <v-radio-group style="margin-top:-5px"  row>
                    <v-radio label="正常" value="radio-1" />
                    <v-radio label="維修保養後正常" value="radio-2" />
                    <v-radio label="異常" value="radio-3" />
                  </v-radio-group>
                </v-col>
                <v-col sm="3" class="aa" v-if="hide2 === 'true'">
                  <h3>警音</h3>
                  <v-radio-group style="margin-top:-5px"  row>
                    <v-radio label="正常" value="radio-1" />
                    <v-radio label="維修保養後正常" value="radio-2" />
                    <v-radio label="異常" value="radio-3" />
                  </v-radio-group>
                </v-col>
                <v-col sm="3" class="aa" v-if="hide3 === 'true'">
                  <h3>道路閃光燈1,2</h3>
                  <v-radio-group style="margin-top:-5px"  row>
                    <v-radio label="正常" value="radio-1" />
                    <v-radio label="維修保養後正常" value="radio-2" />
                    <v-radio label="異常" value="radio-3" />
                  </v-radio-group>
                </v-col>
                <v-col sm="3" class="aa" v-if="hide4 === 'true'">
                  <h3 class="mb-1">信號燈1,2</h3>
                  <v-radio-group v-model="tete" style="margin-top:-5px"  row>
                    <v-radio label="正常" value="radio-1" />
                    <v-radio label="維修保養後正常" value="radio-2" />
                    <v-radio label="異常" value="radio-3" />
                  </v-radio-group>
                </v-col>
                <v-col sm="3" class="aa" v-if="hide5 === 'true'">
                  <h3 class="mb-1">遮斷機1,2</h3>
                  <v-radio-group style="margin-top:-5px"  row>
                    <v-radio label="正常" value="radio-1" />
                    <v-radio label="維修保養後正常" value="radio-2" />
                    <v-radio label="異常" value="radio-3" />
                  </v-radio-group>
                </v-col>
                <v-col sm="3" class="aa" v-if="hide6 === 'true'">
                  <h3 class="mb-1">遮斷機666</h3>
                  <v-radio-group style="margin-top:-5px"  row>
                    <v-radio label="正常" value="radio-1" />
                    <v-radio label="維修保養後正常" value="radio-2" />
                    <v-radio label="異常" value="radio-3" />
                  </v-radio-group>
                </v-col>
                <v-col sm="3" class="aa" v-if="hide7 === 'true'">
                  <h3 class="mb-1">遮斷機8</h3>
                  <v-radio-group style="margin-top:-5px"  row>
                    <v-radio label="正常" value="radio-1" />
                    <v-radio label="維修保養後正常" value="radio-2" />
                    <v-radio label="異常" value="radio-3" />
                  </v-radio-group>
                </v-col>
                <v-col sm="3" class="aa" v-if="hide8 === 'true'">
                  <h3 class="mb-1">遮斷機3</h3>
                  <v-radio-group style="margin-top:-5px"  row>
                    <v-radio label="正常" value="radio-1" />
                    <v-radio label="維修保養後正常" value="radio-2" />
                    <v-radio label="異常" value="radio-3" />
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-col>
            <!-- 日期備註 part 2/2 -->
            <v-col cols="12" sm="3" style="margin-top:-35px">
              <h3 class="mb-1">檢修日期</h3>
              <v-menu
                :close-on-content-click="false"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    outlined
                    placeholder="點此選擇日期"
                    v-on="on"
                    dense
                    single-line
                  />
                </template>
                <v-date-picker
                  color="purple"
                  locale="zh-tw"
                />
              </v-menu>
              <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
              <v-menu
                style="margin-top:-12px"
                :close-on-content-click="false"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    outlined
                    placeholder="點此選擇日期"
                    v-on="on"
                    dense
                    single-line
                  />
                </template>
                <v-date-picker
                  color="purple"
                  locale="zh-tw"
                />
              </v-menu>
            </v-col>
            <v-col cols="12" sm="7" style="margin-top:-35px">
              <h3 class="mb-1">備註</h3>
              <v-textarea hide-details auto-grow outlined rows="5" />
            </v-col>
            <v-col cols="12" sm="2" style="margin-top:-20px">
              <h3 class="mb-1">檢查人</h3>
              <v-text-field dense single-line outlined />
            </v-col>
          </v-row>
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>