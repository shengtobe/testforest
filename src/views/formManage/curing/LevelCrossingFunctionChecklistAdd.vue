
<template>
<!-- ------------加變數設定v-model只設到18-下次要從18-1開始加變數----------- -->
  <v-sheet class="ma-4 mb-8" color="yellow lighten-2">
    <v-container style="max-width: 1200px" class="px-8">
      <p class="font-weight-black title text-center">新增{{ newText }}</p>
      <v-row class="white px-4">
        <!-- 基本資料 -->
        <v-row no-gutter class="label-header">
          <v-col cols="12" sm="3">
            <dateSelect
            label="評估日期"
            key="checkDate"
            v-model="zs"
          />
          </v-col>
        </v-row>
        <!-- 選擇顯示項目 -->
        <v-col cols="12" sm="12">
          <h3 class="label-header">請選擇區段</h3>
        </v-col>
        
          <v-radio-group style="margin-top: -5px" v-model="valShow" row >
            <!-- 1 -->
            <v-tooltip bottom >
              <template v-slot:activator="{ on }" >
                <span v-on="on">
                  <v-radio  value="100">
                    <template v-slot:label>
                      <!-- <h3><strong class="primary--text" v-if="row1_1 > 0">1</strong></h3> -->
                      <!-- <h4 v-if="row1_1 <= 0">1</h4> -->
                      <h4 >1</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>0km0-100m</span>
            </v-tooltip>
            
            <!-- 2 -->
            <v-tooltip bottom >
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="200">
                      <template v-slot:label>
                      <!-- <h3><strong class="primary--text" v-if="row2_1 > 0">2</strong></h3>
                      <h4 v-if="row2_1 <= 0">2</h4> -->
                      <h4 >2</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>0km520m</span>
            </v-tooltip>
            <!-- 3 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="300">
                    <template v-slot:label>
                      <!-- <h3><strong class="primary--text" v-if="row3_1 > 0">3</strong></h3>
                      <h4 v-if="row3_1 <= 0">3</h4> -->
                      <h4 >3</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>0km550m</span>
            </v-tooltip>
            <!-- 4 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="400">
                    <template v-slot:label>
                      <!-- <h3><strong class="primary--text" v-if="row4_1 > 0">4</strong></h3>
                      <h4 v-if="row4_1 <= 0">4</h4> -->
                      <h4 >4</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>0km600m</span>
            </v-tooltip>
            <!-- 5 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="500">
                    <template v-slot:label>
                      <!-- <h3><strong class="primary--text" v-if="row5_1 > 0">5</strong></h3>
                      <h4 v-if="row5_1 <= 0">5</h4> -->
                      <h4 >5</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>0km700m</span>
            </v-tooltip>
            <!-- 6 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="600">
                    <template v-slot:label>
                      <!-- <h3><strong class="primary--text" v-if="row6_1 > 0">6</strong></h3>
                      <h4 v-if="row6_1 <= 0">6</h4> -->
                      <h4 >6</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>0km800m</span>
            </v-tooltip>
            <!-- 7 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="700">
                    <template v-slot:label>
                      <h3><strong class="primary--text" v-if="row7_1 > 0">7</strong></h3>
                      <h4 v-if="row7_1 <= 0">7</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>0km900m</span>
            </v-tooltip>
            <!-- 7-1庫 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="711">
                    <template v-slot:label>
                      <h3><strong class="primary--text" v-if="row7_1ku_1 > 0">7-1庫</strong></h3>
                      <h4 v-if="row7_1ku_1 <= 0">7-1庫</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>車庫線</span>
            </v-tooltip>
            <!-- 7-1 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="710">
                    <template v-slot:label>
                      <h3><strong class="primary--text" v-if="row7_1_1 > 0">7-1</strong></h3>
                      <h4 v-if="row7_1_1 <= 0">7-1</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>1km190m</span>
            </v-tooltip>
            <!-- 7-2 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="720">
                    <template v-slot:label>
                      <h3><strong class="primary--text" v-if="row7_2_1 > 0">7-2</strong></h3>
                      <h4 v-if="row7_2_1 <= 0">7-2</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>1km240m</span>
            </v-tooltip>
            <!-- 8 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="800">
                    <template v-slot:label>
                      <h3><strong class="primary--text" v-if="row8_1 > 0">8</strong></h3>
                      <h4 v-if="row8_1 <= 0">8</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>1km440m</span>
            </v-tooltip>
            <!-- 9 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="900">
                    <template v-slot:label>
                      <h3><strong class="primary--text" v-if="row9_1 > 0">9</strong></h3>
                      <h4 v-if="row9_1 <= 0">9</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>1km900m</span>
            </v-tooltip>
            <!-- 10 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="1000">
                    <template v-slot:label>
                      <h3><strong class="primary--text" v-if="row10_1 > 0">10</strong></h3>
                      <h4 v-if="row10_1 <= 0">10</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>2km110m</span>
            </v-tooltip>
            <!-- 11 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="1100">
                    <template v-slot:label>
                      <h3><strong class="primary--text" v-if="row11_1 > 0">11</strong></h3>
                      <h4 v-if="row11_1 <= 0">11</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>2km200m</span>
            </v-tooltip>
            <!-- 12 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="1200">
                    <template v-slot:label>
                      <h3><strong class="primary--text" v-if="row12_1 > 0">12</strong></h3>
                      <h4 v-if="row12_1 <= 0">12</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>2km520m</span>
            </v-tooltip>
            <!-- 13 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="1300">
                    <template v-slot:label>
                      <h3><strong class="primary--text" v-if="row13_1 > 0">13</strong></h3>
                      <h4 v-if="row13_1 <= 0">13</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>2km830m</span>
            </v-tooltip>
            <!-- 14 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="1400">
                    <template v-slot:label>
                      <h3><strong class="primary--text" v-if="row14_1 > 0">14</strong></h3>
                      <h4 v-if="row14_1 <= 0">14</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>3km310m</span>
            </v-tooltip>
            <!-- 15 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="1500">
                    <template v-slot:label>
                      <h3><strong class="primary--text" v-if="row15_1 > 0">15</strong></h3>
                      <h4 v-if="row15_1 <= 0">15</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>3km580m</span>
            </v-tooltip>
            <!-- 15-1 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="1510">
                    <template v-slot:label>
                      <h3><strong class="primary--text" v-if="row15_1_1 > 0">15-1</strong></h3>
                      <h4 v-if="row15_1_1 <= 0">15-1</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>4km500m</span>
            </v-tooltip>
            <!-- 16 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="1600">
                    <template v-slot:label>
                      <h3><strong class="primary--text" v-if="row16_1 > 0">16</strong></h3>
                      <h4 v-if="row16_1 <= 0">16</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>4km560m</span>
            </v-tooltip>
            <!-- 17 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="1700">
                    <template v-slot:label>
                      <h3><strong class="primary--text" v-if="row17_1 > 0">17</strong></h3>
                      <h4 v-if="row17_1 <= 0">17</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>4km900m</span>
            </v-tooltip>
            <!-- 17-1 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="1710">
                    <template v-slot:label>
                      <h3><strong class="primary--text" v-if="row17_1_1 > 0">17-1</strong></h3>
                      <h4 v-if="row17_1_1 <= 0">17-1</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>6km130m</span>
            </v-tooltip>
            <!-- 18 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="1800">
                    <template v-slot:label>
                      <h3><strong class="primary--text" v-if="row18_1 > 0">18</strong></h3>
                      <h4 v-if="row18_1 <= 0">18</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>6km240m</span>
            </v-tooltip>
            <!-- 18-1 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="1810">
                    <template v-slot:label>
                      <h3><strong class="primary--text" v-if="row18_1_1 > 0">18-1</strong></h3>
                      <h4 v-if="row18_1_1 <= 0">18-1</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>6km460m</span>
            </v-tooltip>
            <!-- 19 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="1900">
                    <template v-slot:label>
                      <h3><strong class="primary--text" v-if="row19_1 > 0">19</strong></h3>
                      <h4 v-if="row19_1 <= 0">19</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>6km740m</span>
            </v-tooltip>
            <!-- 19-1 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="1910">
                    <template v-slot:label>
                      <h3><strong class="primary--text" v-if="row19_1_1 > 0">19-1</strong></h3>
                      <h4 v-if="row19_1_1 <= 0">19-1</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>6km810m</span>
            </v-tooltip>
            <!-- 19-2 -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-radio value="1920">
                    <template v-slot:label>
                      <h3><strong class="primary--text" v-if="row19_2_1 > 0">19-2</strong></h3>
                      <h4 v-if="row19_2_1 <= 0">19-2</h4>
                    </template>
                  </v-radio>
                </span>
              </template>
              <span>6km830m</span>
            </v-tooltip>
            

          </v-radio-group>
        </v-row>

        <!-- 軌段檢查 -->
        <!-- 1 -->
        <v-row no-gutter class="label-header" v-if="valShow == 100">
          <v-col cols="12" sm="12">
            <h3>1. 0km0-100m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">電源邏輯電路</h3>
                  <v-radio-group style="margin-top: -5px" v-model="CheckOption1" row>
                    <v-radio label="正常" value="1" />
                    <v-radio label="維修保養後正常" value="2" />
                    <v-radio label="異常" value="3" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">接收器</h3>
                  <v-radio-group style="margin-top: -5px" v-model="CheckOption2" row>
                    <v-radio label="正常" value="1" />
                    <v-radio label="維修保養後正常" value="2" />
                    <v-radio label="異常" value="3" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">警音</h3>
                  <v-radio-group style="margin-top: -5px" v-model="CheckOption3" row>
                    <v-radio label="正常" value="1" />
                    <v-radio label="維修保養後正常" value="2" />
                    <v-radio label="異常" value="3" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">警示燈</h3>
                  <v-radio-group style="margin-top: -5px" v-model="CheckOption4" row>
                    <v-radio label="正常" value="1" />
                    <v-radio label="維修保養後正常" value="2" />
                    <v-radio label="異常" value="3" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <dateSelect2
                    label="檢修日期"
                    v-model="CheckDay100"
                  />
                  <dateSelect2
                    label="檢修日期"
                    v-model="EndDay100"
                  />
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details v-model="Memo100" auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined readonly v-model="doMan.name"/>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 2 -->
        <v-row no-gutter class="label-header" v-if="valShow == 200">
          <v-col cols="12">
            <h3>2. 0km520m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <!-- 檢查項目 part 1/2 -->
                <v-col cols="12" sm="12">
                  <v-row no-gutter style="width: 100%">
                    <v-col class="aa">
                      <h3>電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3>警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3>道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption5"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <!-- 日期備註 part 2/2 -->
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <dateSelect2
                    label="檢修日期"
                    v-model="CheckDay200"
                  />
                  <dateSelect2
                    label="檢修日期"
                    v-model="EndDay200"
                  />
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details v-model="Memo200" auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined readonly v-model="doMan.name"/>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 3 -->
        <v-row no-gutter class="label-header" v-if="valShow == 300">
          <v-col cols="12" sm="12">
            <h3>3. 0km550m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter style="width: 100%">
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption5"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <dateSelect2
                    label="檢修日期"
                    v-model="CheckDay300"
                  />
                  <dateSelect2
                    label="檢修日期"
                    v-model="EndDay300"
                  />
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details v-model="Memo300" auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined readonly v-model="doMan.name"/>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 4 -->
        <v-row no-gutter class="label-header" v-if="valShow == 400">
          <v-col cols="12" sm="12">
            <h3>4. 0km600m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption5"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <dateSelect2
                    label="檢修日期"
                    v-model="CheckDay400"
                  />
                  <dateSelect2
                    label="檢修日期"
                    v-model="EndDay400"
                  />
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details v-model="Memo400" auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined readonly v-model="doMan.name"/>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 5 -->
        <v-row no-gutter class="label-header" v-if="valShow == 500">
          <v-col cols="12" sm="12">
            <h3>5. 0km700m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption5"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <dateSelect2
                    label="檢修日期"
                    v-model="CheckDay500"
                  />
                  <dateSelect2
                    label="檢修日期"
                    v-model="EndDay500"
                  />
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details v-model="Memo500" auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined readonly v-model="doMan.name"/>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 6 -->
        <v-row no-gutter class="label-header" v-if="valShow == 600">
          <v-col cols="12" sm="12">
            <h3>6. 0km800m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" style="margin-top: -50px">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">遮桿閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption5"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption6"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption7"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col></v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <dateSelect2
                    label="檢修日期"
                    v-model="CheckDay600"
                  />
                  <dateSelect2
                    label="檢修日期"
                    v-model="EndDay600"
                  />
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details v-model="Memo600" auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined readonly v-model="doMan.name"/>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 7 -->
        <v-row no-gutter class="label-header" v-if="valShow == 700">
          <v-col cols="12" sm="12">
            <h3>7. 0km900m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" style="margin-top: -50px">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">遮桿閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption5"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption6"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="CheckOption7"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col></v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross7_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross7_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross7_date1"
                      @input="cross7_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross7_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross7_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross7_date2"
                      @input="cross7_date2 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details v-model="Memo700" auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined readonly v-model="doMan.name"/>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 7-1庫 -->
        <v-row no-gutter class="label-header" v-if="valShow == 711">
          <v-col cols="12" sm="12">
            <h3>7-1庫. 車庫線</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row7_1ku_1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">接收器</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row7_1ku_2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row7_1ku_3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row7_1ku_4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row7_1ku_5"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross7_1ku_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross7_1ku_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross7_1ku_date1"
                      @input="cross7_1ku_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross7_1ku_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross7_1ku_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross7_1ku_date2"
                      @input="cross7_1ku_date2 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined readonly v-model="doMan.name"/>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 7-1 -->
        <v-row no-gutter class="label-header" v-if="valShow == 710">
          <v-col cols="12" sm="12">
            <h3>7-1. 1km190m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row7_1_1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row7_1_2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row7_1_3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row7_1_4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross7_1_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross7_1_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross7_1_date1"
                      @input="cross7_1_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross7_1_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross7_1_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross7_1_date2"
                      @input="cross7_1_date2 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined readonly v-model="doMan.name"/>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 7-2 -->
        <v-row no-gutter class="label-header" v-if="valShow == 720">
          <v-col cols="12" sm="12">
            <h3>7-2. 1km240m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row7_2_1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row7_2_3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row7_2_4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row7_2_5"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross7_2_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross7_2_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross7_2_date1"
                      @input="cross7_2_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross7_2_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross7_2_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross7_2_date2"
                      @input="cross7_2_date2 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined readonly v-model="doMan.name"/>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 8 -->
        <v-row no-gutter class="label-header" v-if="valShow == 800">
          <v-col cols="12" sm="12">
            <h3>8. 1km440m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row8_1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row8_2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row8_3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row8_4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row8_5"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross8_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross8_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross8_date1"
                      @input="cross8_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross8_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross8_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross8_date2"
                      @input="cross8_date2 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined readonly v-model="doMan.name"/>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 9 -->
        <v-row no-gutter class="label-header" v-if="valShow == 900">
          <v-col cols="12" sm="12">
            <h3>9. 1km900m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row9_1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">接收器</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row9_2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row9_3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row9_4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" style="margin-top: -50px">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row9_5"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮桿閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row9_6"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row9_7"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row9_8"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross9_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross9_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross9_date1"
                      @input="cross9_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross9_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross9_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross9_date2"
                      @input="cross9_date2 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined readonly v-model="doMan.name"/>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 10 -->
        <v-row no-gutter class="label-header" v-if="valShow == 1000">
          <v-col cols="12" sm="12">
            <h3>10. 2km110m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row10_1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row10_2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row10_3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row10_4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" style="margin-top: -50px">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">遮桿閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row10_5"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row10_6"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row10_7"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa" />
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross10_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross10_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross10_date1"
                      @input="cross10_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross10_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross10_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross10_date2"
                      @input="cross10_date2 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined readonly v-model="doMan.name"/>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 11 -->
        <v-row no-gutter class="label-header" v-if="valShow == 1100">
          <v-col cols="12" sm="12">
            <h3>11. 2km200m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row11_1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row11_2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row11_3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row11_4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross11_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross11_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross11_date1"
                      @input="cross11_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross11_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross11_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross11_date2"
                      @input="cross11_date2 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined readonly v-model="doMan.name"/>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 12 -->
        <v-row no-gutter class="label-header" v-if="valShow == 1200">
          <v-col cols="12" sm="12">
            <h3>12. 2km520m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row12_1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row12_2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row12_3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row12_4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" style="margin-top: -50px">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">遮桿閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row12_5"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row12_6"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row12_7"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa" />
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross12_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross12_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross12_date1"
                      @input="cross12_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross12_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross12_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross12_date2"
                      @input="cross12_date2 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined readonly v-model="doMan.name"/>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 13 -->
        <v-row no-gutter class="label-header" v-if="valShow == 1300">
          <v-col cols="12" sm="12">
            <h3>13. 2km830m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row13_1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row13_2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row13_3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row13_4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" style="margin-top: -50px">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">遮桿閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row13_5"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row13_6"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row13_7"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa" />
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross13_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross13_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross13_date1"
                      @input="cross13_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross13_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross13_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross13_date2"
                      @input="cross13_date2 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined readonly v-model="doMan.name"/>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 14 -->
        <v-row no-gutter class="label-header" v-if="valShow == 1400">
          <v-col cols="12" sm="12">
            <h3>14. 3km310m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row14_1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row14_3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row14_4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row14_5"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" style="margin-top: -50px">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">遮桿閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row14_6"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row14_7"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row14_8"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa" />
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross14_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross14_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross14_date1"
                      @input="cross14_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross14_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross14_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross14_date2"
                      @input="cross14_date2 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined readonly v-model="doMan.name"/>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 15 -->
        <v-row no-gutter class="label-header" v-if="valShow == 1500">
          <v-col cols="12" sm="12">
            <h3>15. 3km580m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row15_1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row15_3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row15_4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row15_5"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" style="margin-top: -50px">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row15_7"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row15_8"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa" />
                    <v-col class="aa" />
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross15_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross15_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross15_date1"
                      @input="cross15_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross15_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross15_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross15_date2"
                      @input="cross15_date2 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined readonly v-model="doMan.name"/>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 15-1 -->
        <v-row no-gutter class="label-header" v-if="valShow == 1510">
          <v-col cols="12" sm="12">
            <h3>15-1. 4km500m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row15_1_1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">接收器</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row15_1_2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row15_1_3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row15_1_4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross15_1_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross15_1_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross15_1_date1"
                      @input="cross15_1_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross15_1_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross15_1_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross15_1_date2"
                      @input="cross15_1_date2 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined readonly v-model="doMan.name"/>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 16 -->
        <v-row no-gutter class="label-header" v-if="valShow == 1600">
          <v-col cols="12" sm="12">
            <h3>16. 4km560m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row16_1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">接收器</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row16_2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row16_3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row16_4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row15_5"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross16_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross16_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross16_date1"
                      @input="cross16_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross16_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross16_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross16_date2"
                      @input="cross16_date2 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined readonly v-model="doMan.name"/>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 17 -->
        <v-row no-gutter class="label-header" v-if="valShow == 1700">
          <v-col cols="12" sm="12">
            <h3>17. 4km900m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row17_1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row17_3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row17_4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row17_5"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" style="margin-top: -50px">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">遮桿閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row17_6"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row17_7"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row17_8"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa"></v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross17_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross17_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross17_date1"
                      @input="cross17_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross17_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross17_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross17_date2"
                      @input="cross17_date2 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 17-1 -->
        <v-row no-gutter class="label-header" v-if="valShow == 1710">
          <v-col cols="12" sm="12">
            <h3>17-1. 6km130m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row17_1_1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">接收器</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row17_1_2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row17_1_3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row17_1_4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row17_1_5"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross17_1_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross17_1_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross17_1_date1"
                      @input="cross17_1_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross17_1_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross17_1_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross17_1_date2"
                      @input="cross17_1_date2 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 18 -->
        <v-row no-gutter class="label-header" v-if="valShow == 1800">
          <v-col cols="12" sm="12">
            <h3>18. 6km240m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row18_1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">接收器</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row18_2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row18_3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row18_4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row18_5"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross18_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross18_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross18_date1"
                      @input="cross18_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross18_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross18_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross18_date2"
                      @input="cross18_date2 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 18-1 -->
        <v-row no-gutter class="label-header" v-if="valShow == 1810">
          <v-col cols="12" sm="12">
            <h3>18-1. 6km460m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row18_1_1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">接收器</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row18_1_2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row18_1_3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row18_1_4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross18_1_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross18_1_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross18_1_date1"
                      @input="cross18_1_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross18_1_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross18_1_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross18_1_date2"
                      @input="cross18_1_date2 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 19 -->
        <v-row no-gutter class="label-header" v-if="valShow == 1900">
          <v-col cols="12" sm="12">
            <h3>19. 6km740m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row19_1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">接收器</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row19_2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row19_3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row19_4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row19_5"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross19_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross19_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross19_date1"
                      @input="cross19_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross19_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross19_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross19_date2"
                      @input="cross19_date2 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 19-1 -->
        <v-row no-gutter class="label-header" v-if="valShow == 1910">
          <v-col cols="12" sm="12">
            <h3>19-1. 6km810m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row19_1_1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">接收器</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row19_1_2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row19_1_3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row19_1_4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross19_1_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross19_1_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross19_1_date1"
                      @input="cross19_1_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross19_1_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross19_1_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross19_1_date2"
                      @input="cross19_1_date2 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 19-2 -->
        <v-row no-gutter class="label-header" v-if="valShow == 1920">
          <v-col cols="12" sm="12">
            <h3>19-2. 6km830m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row19_2_1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">接收器</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row19_2_2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row19_2_3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row19_2_4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross19_2_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross19_2_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross19_2_date1"
                      @input="cross19_2_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross19_2_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross19_2_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross19_2_date2"
                      @input="cross19_2_date2 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- XXX -->
        <v-row no-gutter class="label-header" v-if="valShow == 2500">
          <v-col cols="12" sm="12">
            <h3>XXX. XkmXX0m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="rowXX_1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">接收器</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="rowXX_2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="rowXX_3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="rowXX_4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" style="margin-top: -50px">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="rowXX_5"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮桿閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="rowXX_6"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="rowXX_7"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="rowXX_8"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa"></v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross19_2_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross19_2_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross19_2_date1"
                      @input="cross19_2_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross19_2_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross19_2_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross19_2_date2"
                      @input="cross19_2_date2 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- XXX -->
        <v-row no-gutter class="label-header" v-if="valShow == 2600">
          <v-col cols="12" sm="12">
            <h3>XXX. XkmXX0m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="rowXX_1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">接收器</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="rowXX_2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="rowXX_3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="rowXX_4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" style="margin-top: -50px">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="rowXX_5"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮桿閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="rowXX_6"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="rowXX_7"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="rowXX_8"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa"></v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross19_2_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross19_2_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross19_2_date1"
                      @input="cross19_2_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross19_2_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross19_2_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross19_2_date2"
                      @input="cross19_2_date2 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- XXX -->
        <v-row no-gutter class="label-header" v-if="valShow == 2700">
          <v-col cols="12" sm="12">
            <h3>XXX. XkmXX0m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2 label-header"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="rowXX_1"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">接收器</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="rowXX_2"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="rowXX_3"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="rowXX_4"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" style="margin-top: -50px">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="rowXX_5"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮桿閃光燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="rowXX_6"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="rowXX_7"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="rowXX_8"
                        row
                      >
                        <v-radio label="正常" value="1" />
                        <v-radio label="維修保養後正常" value="2" />
                        <v-radio label="異常" value="3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa"></v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross19_2_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross19_2_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross19_2_date1"
                      @input="cross19_2_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross19_2_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross19_2_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross19_2_date2"
                      @input="cross19_2_date2 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="7" style="margin-top: -35px">
                  <h3 class="mb-1">備註</h3>
                  <v-textarea hide-details auto-grow outlined rows="5" />
                </v-col>
                <v-col cols="12" sm="2" style="margin-top: -20px">
                  <h3 class="mb-1">檢查人</h3>
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        
        <v-col></v-col>
        <!-- 送出 -->
        <v-col class="mt-2" cols="12">
          <v-btn large block class="mt-n8 mb-4 btn-add white--text"
          @click="save" >送出表單</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from 'vuex'
import { getNowFullTime, getTodayDateString, unique} from "@/assets/js/commonFun";
import { maintainStatusOpts } from '@/assets/js/workList'
import dateSelect from "@/components/forManage/dateSelect";
import dateSelect2 from "@/components/forManage/dateSelect2";
import deptSelect from "@/components/forManage/deptSelect";
import { fetchFormOrderList, fetchFormOrderOne, createFormOrder, createFormOrder0, updateFormOrder } from '@/apis/formManage/serve'
import { formDepartOptions } from '@/assets/js/departOption'
import { Actions } from "@/assets/js/actions";
import dialogDelete from "@/components/forManage/dialogDelete";
import { Constrant } from "@/assets/js/constrant";
import ToolBar from "@/components/forManage/toolbar";

export default {
  data() {
    return {
      showTF: false,
      isLoading: false,
      disabled: false,
      valShow: 0,
      formDepartOptions: [
        // 通報單位下拉選單
        { text: "不限", value: "" },
        ...formDepartOptions,
      ],
      title: "",
      newText: "平交道功能檢查紀錄表",
      action: Actions.add,
      actions: Actions,
      ShowDetailDialog: false,
      dialogDel: false, // model off
      Add: false,
      dialog3: false,
      formData: {
        settings: {
          formIconShow: true,
        },
        searchItem: {
          dateStart: "",
          dateEnd: "",
          department: "",
        },
      },
      editType: "",
      editItem: {},
      DynamicKey: 0,
      DelDynamicKey: 0,

      DB_Table: "RP087",
      RPFlowNo: "",
      nowTime: "",
      doMan:{
        id: '',
        name: '',
        depart: '',
        checkManName: ''
      },
      zs: "",
      ipt2: {},
      defaultIpt: {  // 預設的欄位值
          startDay: '',
          EndDay: '',
          depart: '',  // 單位
        },
      // 自定義變數
      CheckDay100: "",
      CheckDay200: "",
      CheckDay300: "",
      CheckDay400: "",
      CheckDay500: "",
      CheckDay600: "",
      CheckDay700: "",
      EndDay100: "",
      EndDay200: "",
      EndDay300: "",
      EndDay400: "",
      EndDay500: "",
      EndDay600: "",
      EndDay700: "",
      Memo100: "",
      Memo200: "",
      Memo300: "",
      Memo400: "",
      Memo500: "",
      Memo600: "",
      Memo700: "",
      EqipNo: "",
      Location: "",
      CheckOption1: "",
      CheckOption2: "",
      CheckOption3: "",
      CheckOption4: "",
      CheckOption5: "",
      CheckOption6: "",
      CheckOption7: "",
      CheckOption8: "",
      row1_1: 0,
      row1_2: 0,
      row1_3: 0,
      row1_4: 0,
      row2_1: 0,
      row2_2: 0,
      row2_3: 0,
      row2_4: 0,
      row2_5: 0,
      row2_6: 0,
      row2_7: 0,
      row3_1: 0,
      row3_2: 0,
      row3_3: 0,
      row3_4: 0,
      row3_5: 0,
      row4_1: 0,
      row4_2: 0,
      row4_3: 0,
      row4_4: 0,
      row4_5: 0,
      row5_1: 0,
      row5_2: 0,
      row5_3: 0,
      row5_4: 0,
      row5_5: 0,
      row6_1: 0,
      row6_2: 0,
      row6_3: 0,
      row6_4: 0,
      row6_5: 0,
      row6_6: 0,
      row6_7: 0,
      row7_1: 0,
      row7_2: 0,
      row7_3: 0,
      row7_4: 0,
      row7_5: 0,
      row7_6: 0,
      row7_7: 0,
      row7_1ku_1: 0,
      row7_1ku_2: 0,
      row7_1ku_3: 0,
      row7_1ku_4: 0,
      row7_1ku_5: 0,
      row7_1_1: 0,
      row7_1_3: 0,
      row7_1_4: 0,
      row7_1_5: 0,
      row7_2_1: 0,
      row7_2_3: 0,
      row7_2_4: 0,
      row7_2_5: 0,
      row8_1: 0,
      row8_3: 0,
      row8_4: 0,
      row8_5: 0,
      row8_8: 0,
      row9_1: 0,
      row9_2: 0,
      row9_3: 0,
      row9_4: 0,
      row9_5: 0,
      row9_6: 0,
      row9_7: 0,
      row9_8: 0,
      row10_1: 0,
      row10_3: 0,
      row10_4: 0,
      row10_5: 0,
      row10_6: 0,
      row10_7: 0,
      row10_8: 0,
      row11_1: 0,
      row11_3: 0,
      row11_4: 0,
      row11_5: 0,
      row12_1: 0,
      row12_3: 0,
      row12_4: 0,
      row12_5: 0,
      row12_6: 0,
      row12_7: 0,
      row12_8: 0,
      row13_1: 0,
      row13_3: 0,
      row13_4: 0,
      row13_5: 0,
      row13_6: 0,
      row13_7: 0,
      row13_8: 0,
      row14_1: 0,
      row14_3: 0,
      row14_4: 0,
      row14_5: 0,
      row14_6: 0,
      row14_7: 0,
      row14_8: 0,
      row15_1: 0,
      row15_3: 0,
      row15_4: 0,
      row15_5: 0,
      row15_7: 0,
      row15_8: 0,
      row15_1_1: 0,
      row15_1_2: 0,
      row15_1_3: 0,
      row15_1_4: 0,
      row16_1: 0,
      row16_2: 0,
      row16_3: 0,
      row16_4: 0,
      row16_5: 0,
      row17_1: 0,
      row17_3: 0,
      row17_4: 0,
      row17_5: 0,
      row17_6: 0,
      row17_7: 0,
      row17_8: 0,
      row17_1_1: 0,
      row17_1_2: 0,
      row17_1_3: 0,
      row17_1_4: 0,
      row17_1_5: 0,
      row18_1: 0,
      row18_2: 0,
      row18_3: 0,
      row18_4: 0,
      row18_5: 0,
      row18_1_1: 0,
      row18_1_2: 0,
      row18_1_3: 0,
      row18_1_4: 0,
      row19_1: 0,
      row19_2: 0,
      row19_3: 0,
      row19_4: 0,
      row19_5: 0,
      row19_1_1: 0,
      row19_1_2: 0,
      row19_1_3: 0,
      row19_1_4: 0,
      row19_2_1: 0,
      row19_2_2: 0,
      row19_2_3: 0,
      row19_2_4: 0,

      CheckdayOn: "",
      QueryCheckdayOn: "",
      CheckdayOff: "",
      QueryCheckdayOff: "",
      AddWorkLogModal: false,
      MaintenanceDay: "",
      Weather: ["晴天", "陰天", "雨天"],
      AddData: {
        // 新增表單資料
        MaintenanceDay: "", // 保養日
      },
      // 系統變數
      pageOpt: { page: 1 }, // 目前頁數
      headers: [
        {
          text: "項次",
          value: "Item",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "檢查日期",
          value: "Checkday",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        // {
        //   text: "審查狀態",
        //   value: "Review",
        //   align: "center",
        //   divider: true,
        //   class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        // },
        {
          text: "填寫人",
          value: "Name",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "功能",
          value: "Shop",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
      ],
      tableItems: [
        {
          Item: "1",
          Checkday: "2020-08-01",
          Review: "已審查",
          Name: "王大明",
        },
        {
          Item: "2",
          Checkday: "2020-08-10",
          Review: "審查中",
          Name: "王大明",
        },
      ],
    };
  },
  components: {
    Pagination, // 頁碼
    dateSelect,
    dateSelect2,
    deptSelect,
    ToolBar,
    dialogDelete,
  },
  //   components: { Pagination, form51lib }, // 頁碼
  computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
  },
  created() {
    this.ipt2 = { ...this.defaultIpt }
    //更新時間
    this.nowTime = getTodayDateString();
    this.doMan.name = this.userData.UserName;
    this.doMan.id = this.userData.UserId;
    this.doMan.depart = this.userData.DeptList[0].DeptDesc;
    this.doMan.departId = this.userData.DeptList[0].DeptId;
    this.zs = this.nowTime
  },
  methods: {
    initInput(){
      console.log("init~");
      this.row1_1 = 0;
      this.row1_2 = 0;
      this.row1_3 = 0;
      this.row1_4 = 0;
      this.row2_1 = 0;
      this.row2_2 = 0;
      this.row2_3 = 0;
      this.row2_4 = 0;
      this.row2_5 = 0;
      this.row3_1 = 0;
      this.row3_2 = 0;
      this.row3_3 = 0;
      this.row3_4 = 0;
      this.row3_5 = 0;
      this.row4_1 = 0;
      this.row4_2 = 0;
      this.row4_3 = 0;
      this.row4_4 = 0;
      this.row4_5 = 0;
      this.row5_1 = 0;
      this.row5_2 = 0;
      this.row5_3 = 0;
      this.row5_4 = 0;
      this.row5_5 = 0;
      this.row6_1 = 0;
      this.row6_2 = 0;
      this.row6_3 = 0;
      this.row6_4 = 0;
      this.row6_5 = 0;
      this.row6_6 = 0;
      this.row6_7 = 0;
      this.row7_1 = 0;
      this.row7_2 = 0;
      this.row7_3 = 0;
      this.row7_4 = 0;
      this.row7_5 = 0;
      this.row7_6 = 0;
      this.row7_7 = 0;
      this.row7_1ku_1 = 0;
      this.row7_1ku_2 = 0;
      this.row7_1ku_3 = 0;
      this.row7_1ku_4 = 0;
      this.row7_1ku_5 = 0;
    },
    ...mapActions("system", [
      "chMsgbar", // messageBar
      "chLoadingShow", // 切換 loading 圖顯示
    ]),
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 新增監工區塊欄位
    addSupervisor() {},
    // 搜尋
    search() {},
    // 存
    save() {
      ;
      this.chLoadingShow({show:true});
      console.log(this.valShow);
      switch(this.valShow){
        case "100":
          this.Location = "0km0-100m";
          break;
        case "200":
          this.Location = "0km520m";
          break;
        case "300":
          this.Location = "0km550m";
          break;
        case "400":
          this.Location = "0km600m";
          break;
        case "500":
          this.Location = "0km700m";
          break;
        case "600":
          this.Location = "0km800m";
          break;
        case "700":
          this.Location = "0km900m";
          break;
      }

      var data = {
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.userData.UserId, // 操作人id this.doMan.name = this.userData.UserName
        // OperatorID: "16713",  // 操作人id
        KeyName: this.DB_Table, // DB table
        KeyItem: [
          { Column: "CheckDay", Value: this.zs },
          { Column: "EqipNo", Value: this.valShow },
          { Column: "Location", Value: this.Location },
          { Column: "CheckOption1", Value: this.CheckOption1 },
          { Column: "CheckOption2", Value: this.CheckOption2 },
          { Column: "CheckOption3", Value: this.CheckOption3 },
          { Column: "CheckOption4", Value: this.CheckOption4 },
          { Column: "CheckOption5", Value: this.CheckOption5 },
          { Column: "CheckOption6", Value: this.CheckOption6 },
          { Column: "CheckOption7", Value: this.CheckOption7 },
        ],
      };

      // 修改
      if (this.action == Actions.edit) {
        // update 要自行增加RPFlowNo欄位
        data.RPFlowNo = this.RPFlowNo;
        console.log(data);
        updateFormOrder(data)
          .then((res) => {
            console.log(res.data.DT);
            this.chMsgbar({ success: true, msg: Constrant.update.success });
          })
          .catch((err) => {
            console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.update.failed });
          })
          .finally(() => {
            this.chLoadingShow({ show: false});
          });
      } else {
        // 新增
        createFormOrder0(data)
          .then((res) => {
            console.log(res.data.DT);
            this.chMsgbar({ success: true, msg: Constrant.insert.success });
          })
          .catch((err) => {
            console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.insert.failed });
          })
          .finally(() => {
            this.chLoadingShow({ show: false});
            this.search();
          });
      }
      this.ShowDetailDialog = false;
      this.$router.push({ path: '/form-manage/curing/level-crossing-function-checklist' })
      // to="/form-manage/curing/level-crossing-function-checklist-add"
    },
    // 關閉 dialogx
    closeWorkLogModal() {
      this.AddWorkLogModal = false;
    },
    viewPage(item) {
      this.chLoadingShow({show:true})
        // 依業主要求變更檢式頁面的方式，所以改為另開分頁
        fetchFormOrderOne({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {'Column':'RPFlowNo','Value':item.RPFlowNo},
                ],
        QyName:[
          "CheckDay",
          "DepartName",
          "Name",
          "CheckMan",
          "CheckOption1",
          "Memo_1",
          "CheckOption2",
          "Memo_2",
          "CheckOption3",
          "Memo_3",
          "Advice",
          "Measures",

        ],
      }).then(res => {
        this.initInput();
        console.log(res.data.DT)
        let dat = JSON.parse(res.data.DT)
        console.log("data name: " + dat[0].Name)
        console.log("data time: " + dat[0].CheckDay)
        this.Add = true
        // this.zs = res.data.DT.CheckDay
        this.doMan.name = dat[0].Name
        let time1 = dat[0].CheckDay.substr(0,10)
        console.log("data time1: " + time1)
        this.zs = time1
        console.log("doMan name: " + this.doMan.name)
        //123資料
        let ad = Object.keys(dat[0])
        console.log(ad)
        var i = 0, j = 0;
          for(let key of Object.keys(dat[0])){
            if(i > 3 && i < 52){
              if(i % 2 == 0){
                  this.ipt.items[j].status = (dat[0])[key]
              }
              else{
                this.ipt.items[j].note = (dat[0])[key]
                j++
              }
            }
            i++
          }
        this.memo_2 = dat[0].Advice
        this.memo_3 = dat[0].Measures
      }).catch(err => {
        console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        this.chLoadingShow({ show: false})
      })
    },//viewPage
  },
};
</script>

<style>
.iwidth {
  width: 65px;
}
.xwd {
  max-width: 13%;
}
.aa {
  width: 20%;
}
.bb {
  width: 15%;
}
@media only screen and (max-width: 600px) {
  .xwd {
    max-width: 100%;
  }
  .aa {
    width: 100%;
    flex-basis: auto;
  }
}
</style>