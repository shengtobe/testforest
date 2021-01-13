
<template>
<!-- ------------加變數設定v-model只設到18-下次要從18-1開始加變數----------- -->
  <v-sheet class="ma-4 mb-8" color="yellow lighten-2">
    <v-container style="max-width: 1200px" class="px-8">
      <p class="font-weight-black title text-center">新增{{ newText }}</p>
      <v-row class="white px-4">
        <!-- 基本資料 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="3">
            <h3 class="mb-1">填表日期</h3>
            <v-menu
              v-model="MaintenanceDay"
              :close-on-content-click="false"
              transition="scale-transition"
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model.trim="AddData.MaintenanceDay"
                  outlined
                  v-on="on"
                  dense
                  single-line
                />
              </template>
              <v-date-picker
                color="purple"
                v-model="AddData.MaintenanceDay"
                @input="MaintenanceDay = false"
                locale="zh-tw"
              />
            </v-menu>
          </v-col>
        </v-row>
        <!-- 選擇顯示項目 -->
        <v-col cols="12" sm="12">
          <h3 class="indigo--text">請選擇區段</h3>
        </v-col>
        
          <v-radio-group style="margin-top: -5px" v-model="valShow" row>
            <!-- 1 -->
            <v-tooltip bottom >
              <template v-slot:activator="{ on }" >
                <span v-on="on">
                  <v-radio  value="100" >
                    <template v-slot:label>
                      <h3><strong class="primary--text" v-if="row1_1 > 0">1</strong></h3>
                      <h4 v-if="row1_1 <= 0">1</h4>
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
                      <h3><strong class="primary--text" v-if="row2_1 > 0">2</strong></h3>
                      <h4 v-if="row2_1 <= 0">2</h4>
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
                      <h3><strong class="primary--text" v-if="row3_1 > 0">3</strong></h3>
                      <h4 v-if="row3_1 <= 0">3</h4>
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
                      <h3><strong class="primary--text" v-if="row4_1 > 0">4</strong></h3>
                      <h4 v-if="row4_1 <= 0">4</h4>
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
                      <h3><strong class="primary--text" v-if="row5_1 > 0">5</strong></h3>
                      <h4 v-if="row5_1 <= 0">5</h4>
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
                      <h3><strong class="primary--text" v-if="row6_1 > 0">6</strong></h3>
                      <h4 v-if="row6_1 <= 0">6</h4>
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
        <v-row no-gutter class="indigo--text" v-if="valShow == 100">
          <v-col cols="12" sm="12">
            <h3>1. 0km0-100m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">電源邏輯電路</h3>
                  <v-radio-group style="margin-top: -5px" v-model="row1_1" row>
                    <v-radio label="正常" value="1" />
                    <v-radio label="維修保養後正常" value="2" />
                    <v-radio label="異常" value="3" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">接收器</h3>
                  <v-radio-group style="margin-top: -5px" v-model="row1_2" row>
                    <v-radio label="正常" value="1" />
                    <v-radio label="維修保養後正常" value="2" />
                    <v-radio label="異常" value="3" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">警音</h3>
                  <v-radio-group style="margin-top: -5px" v-model="row1_3" row>
                    <v-radio label="正常" value="1" />
                    <v-radio label="維修保養後正常" value="2" />
                    <v-radio label="異常" value="3" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">警示燈</h3>
                  <v-radio-group style="margin-top: -5px" v-model="row1_4" row>
                    <v-radio label="正常" value="1" />
                    <v-radio label="維修保養後正常" value="2" />
                    <v-radio label="異常" value="3" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top: -35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross1_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross1_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross1_date1"
                      @input="cross1_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross1_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross1_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross1_date2"
                      @input="cross1_date2 = false"
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
        <!-- 2 -->
        <v-row no-gutter class="indigo--text" v-if="valShow == 200">
          <v-col cols="12">
            <h3>2. 0km520m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
            >
              <v-row no-gutter>
                <!-- 檢查項目 part 1/2 -->
                <v-col cols="12" sm="12">
                  <v-row no-gutter style="width: 100%">
                    <v-col class="aa">
                      <h3>電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row2_1"
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
                        v-model="row2_3"
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
                        v-model="row2_5"
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
                        v-model="row2_7"
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
                        v-model="row2_8"
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
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross2_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross2_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross2_date1"
                      @input="cross2_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross2_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross2_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross2_date2"
                      @input="cross2_date2 = false"
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
        <!-- 3 -->
        <v-row no-gutter class="indigo--text" v-if="valShow == 300">
          <v-col cols="12" sm="12">
            <h3>3. 0km550m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter style="width: 100%">
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row3_1"
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
                        v-model="row3_3"
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
                        v-model="row3_5"
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
                        v-model="row3_7"
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
                        v-model="row3_8"
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
                    v-model="cross3_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross3_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross3_date1"
                      @input="cross3_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross3_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross3_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross3_date2"
                      @input="cross3_date2 = false"
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
        <!-- 4 -->
        <v-row no-gutter class="indigo--text" v-if="valShow == 400">
          <v-col cols="12" sm="12">
            <h3>4. 0km600m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row4_1"
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
                        v-model="row4_3"
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
                        v-model="row4_5"
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
                        v-model="row4_7"
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
                        v-model="row4_8"
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
                    v-model="cross4_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross4_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross4_date1"
                      @input="cross4_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross4_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross4_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross4_date2"
                      @input="cross4_date2 = false"
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
        <!-- 5 -->
        <v-row no-gutter class="indigo--text" v-if="valShow == 500">
          <v-col cols="12" sm="12">
            <h3>5. 0km700m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row5_1"
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
                        v-model="row5_3"
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
                        v-model="row5_5"
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
                        v-model="row5_7"
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
                        v-model="row5_8"
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
                    v-model="cross5_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross5_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross5_date1"
                      @input="cross5_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross5_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross5_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross5_date2"
                      @input="cross5_date2 = false"
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
        <!-- 6 -->
        <v-row no-gutter class="indigo--text" v-if="valShow == 600">
          <v-col cols="12" sm="12">
            <h3>6. 0km800m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row6_1"
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
                        v-model="row6_3"
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
                        v-model="row6_4"
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
                        v-model="row6_5"
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
                        v-model="row6_6"
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
                        v-model="row6_7"
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
                        v-model="row6_8"
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
                    v-model="cross6_date1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross6_date1"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross6_date1"
                      @input="cross6_date1 = false"
                      locale="zh-tw"
                    />
                  </v-menu>
                  <h3 class="mb-1" style="margin-top: -12px">完成日期</h3>
                  <v-menu
                    style="margin-top: -12px"
                    v-model="cross6_date2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model.trim="AddData.cross6_date2"
                        outlined
                        placeholder="點此選擇日期"
                        v-on="on"
                        dense
                        single-line
                      />
                    </template>
                    <v-date-picker
                      color="purple"
                      v-model="AddData.cross6_date2"
                      @input="cross6_date2 = false"
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
        <!-- 7 -->
        <v-row no-gutter class="indigo--text" v-if="valShow == 700">
          <v-col cols="12" sm="12">
            <h3>7. 0km900m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group
                        style="margin-top: -5px"
                        v-model="row7_1"
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
                        v-model="row7_3"
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
                        v-model="row7_4"
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
                        v-model="row7_5"
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
                        v-model="row7_6"
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
                        v-model="row7_7"
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
                        v-model="row7_8"
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
        <!-- 7-1庫 -->
        <v-row no-gutter class="indigo--text" v-if="valShow == 711">
          <v-col cols="12" sm="12">
            <h3>7-1庫. 車庫線</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
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
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 7-1 -->
        <v-row no-gutter class="indigo--text" v-if="valShow == 710">
          <v-col cols="12" sm="12">
            <h3>7-1. 1km190m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
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
                        v-model="row7_1_3"
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
                        v-model="row7_1_4"
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
                        v-model="row7_1_5"
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
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 7-2 -->
        <v-row no-gutter class="indigo--text" v-if="valShow == 720">
          <v-col cols="12" sm="12">
            <h3>7-2. 1km240m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
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
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 8 -->
        <v-row no-gutter class="indigo--text" v-if="valShow == 800">
          <v-col cols="12" sm="12">
            <h3>8. 1km440m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
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
                        v-model="row8_3"
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
                        v-model="row8_4"
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
                        v-model="row8_5"
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
                        v-model="row8_8"
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
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 9 -->
        <v-row no-gutter class="indigo--text" v-if="valShow == 900">
          <v-col cols="12" sm="12">
            <h3>9. 1km900m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
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
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 10 -->
        <v-row no-gutter class="indigo--text" v-if="valShow == 1000">
          <v-col cols="12" sm="12">
            <h3>10. 2km110m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
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
                        v-model="row10_3"
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
                        v-model="row10_4"
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
                        v-model="row10_5"
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
                        v-model="row10_6"
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
                        v-model="row10_7"
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
                        v-model="row10_8"
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
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 11 -->
        <v-row no-gutter class="indigo--text" v-if="valShow == 1100">
          <v-col cols="12" sm="12">
            <h3>11. 2km200m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
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
                        v-model="row11_3"
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
                        v-model="row11_4"
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
                        v-model="row11_5"
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
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 12 -->
        <v-row no-gutter class="indigo--text" v-if="valShow == 1200">
          <v-col cols="12" sm="12">
            <h3>12. 2km520m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
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
                        v-model="row12_3"
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
                        v-model="row12_4"
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
                        v-model="row12_5"
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
                        v-model="row12_6"
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
                        v-model="row12_7"
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
                        v-model="row12_8"
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
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 13 -->
        <v-row no-gutter class="indigo--text" v-if="valShow == 1300">
          <v-col cols="12" sm="12">
            <h3>13. 2km830m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
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
                        v-model="row13_3"
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
                        v-model="row13_4"
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
                        v-model="row13_5"
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
                        v-model="row13_6"
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
                        v-model="row13_7"
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
                        v-model="row13_8"
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
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 14 -->
        <v-row no-gutter class="indigo--text" v-if="valShow == 1400">
          <v-col cols="12" sm="12">
            <h3>14. 3km310m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
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
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 15 -->
        <v-row no-gutter class="indigo--text" v-if="valShow == 1500">
          <v-col cols="12" sm="12">
            <h3>15. 3km580m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
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
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 15-1 -->
        <v-row no-gutter class="indigo--text" v-if="valShow == 1510">
          <v-col cols="12" sm="12">
            <h3>15-1. 4km500m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
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
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 16 -->
        <v-row no-gutter class="indigo--text" v-if="valShow == 1600">
          <v-col cols="12" sm="12">
            <h3>16. 4km560m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
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
                  <v-text-field dense single-line outlined />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 17 -->
        <v-row no-gutter class="indigo--text" v-if="valShow == 1700">
          <v-col cols="12" sm="12">
            <h3>17. 4km900m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
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
        <v-row no-gutter class="indigo--text" v-if="valShow == 1710">
          <v-col cols="12" sm="12">
            <h3>17-1. 6km130m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
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
        <v-row no-gutter class="indigo--text" v-if="valShow == 1800">
          <v-col cols="12" sm="12">
            <h3>18. 6km240m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
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
        <v-row no-gutter class="indigo--text" v-if="valShow == 1810">
          <v-col cols="12" sm="12">
            <h3>18-1. 6km460m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
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
        <v-row no-gutter class="indigo--text" v-if="valShow == 1900">
          <v-col cols="12" sm="12">
            <h3>19. 6km740m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
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
        <v-row no-gutter class="indigo--text" v-if="valShow == 1910">
          <v-col cols="12" sm="12">
            <h3>19-1. 6km810m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
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
        <v-row no-gutter class="indigo--text" v-if="valShow == 1920">
          <v-col cols="12" sm="12">
            <h3>19-2. 6km830m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
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
        <v-row no-gutter class="indigo--text" v-if="valShow == 2500">
          <v-col cols="12" sm="12">
            <h3>XXX. XkmXX0m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
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
        <v-row no-gutter class="indigo--text" v-if="valShow == 2600">
          <v-col cols="12" sm="12">
            <h3>XXX. XkmXX0m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
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
        <v-row no-gutter class="indigo--text" v-if="valShow == 2700">
          <v-col cols="12" sm="12">
            <h3>XXX. XkmXX0m</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="teal"
              elevation="4"
              class="mb-6 mt-2"
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
          <v-btn large block class="mt-n8 mb-4" color="success">送出表單</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
// import form51lib from "@/components/Form51Lib.vue";

export default {
  data() {
    return {
      showTF: false,
      isLoading: false,
      disabled: false,
      valShow: 0,
      title: "",
      newText: "平交道功能檢查紀錄表",
      // 自定義變數
      row1_1: 0,
      row1_2: 0,
      row1_3: 0,
      row1_4: 0,
      row2_1: 0,
      row2_3: 0,
      row2_5: 0,
      row2_7: 0,
      row2_8: 0,
      row3_1: 0,
      row3_3: 0,
      row3_5: 0,
      row3_7: 0,
      row3_8: 0,
      row4_1: 0,
      row4_3: 0,
      row4_5: 0,
      row4_7: 0,
      row4_8: 0,
      row5_1: 0,
      row5_3: 0,
      row5_5: 0,
      row5_7: 0,
      row5_8: 0,
      row6_1: 0,
      row6_3: 0,
      row6_4: 0,
      row6_5: 0,
      row6_6: 0,
      row6_7: 0,
      row6_8: 0,
      row7_1: 0,
      row7_3: 0,
      row7_4: 0,
      row7_5: 0,
      row7_6: 0,
      row7_7: 0,
      row7_8: 0,
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
        {
          text: "審查狀態",
          value: "Review",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
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
  components: { Pagination }, // 頁碼
  //   components: { Pagination, form51lib }, // 頁碼
  methods: {
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 新增監工區塊欄位
    addSupervisor() {},
    // 搜尋
    search() {},
    // 存
    save() {},
    // 關閉 dialogx
    closeWorkLogModal() {
      this.AddWorkLogModal = false;
    },
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