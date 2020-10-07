
<template>
<!-- ------------加變數設定v-model只設到18-下次要從18-1開始加變數----------- -->
  <v-sheet class="ma-4 mb-8" color="yellow lighten-2">
    <v-container style="max-width: 1200px" class="px-8">
      <p class="font-weight-black title text-center">新增{{ newText }}</p>
      <v-row class="white px-4">
        <!-- 基本資料 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="3">
            <h3 class="mb-1">保養日期</h3>
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
          <v-col cols="12" sm="3">
            <h3 class="mb-1">天氣</h3>
            <v-select dense single-line :items="Weather" outlined />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">現場工作負責人職稱</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">姓名</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">工作項目</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">工作地點</h3>
            <v-text-field dense single-line outlined />
          </v-col>
          <v-col cols="6" sm="2" class="xwd">
            <h3 class="mb-1">全班人數</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
          <v-col cols="6" sm="2" class="xwd">
            <h3 class="mb-1">出勤人數</h3>
            <v-text-field class="iwidth" type="number" dense single-line outlined />
          </v-col>
        </v-row>
        <!-- 選擇軌段 勾選CheckBox
        <v-row justify="space-around">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">
                <v-checkbox v-model="val1" label="1" />
              </span>
            </template>
            <span>0km0-100m</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">
                <v-checkbox v-model="val2" label="2"></v-checkbox>
              </span>
            </template>
            <span>0km520m</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">
                <v-checkbox v-model="val3" label="3"></v-checkbox>
              </span>
            </template>
            <span>0km550m</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">
                <v-checkbox v-model="val4" label="4"></v-checkbox>
              </span>
            </template>
            <span>0km600m</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">
                <v-checkbox v-model="val5" label="5"></v-checkbox>
              </span>
            </template>
            <span>0km700m</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">
                <v-checkbox v-model="val5" label="5"></v-checkbox>
              </span>
            </template>
            <span>0km700m</span>
          </v-tooltip>
          <v-checkbox label="1" />
          <v-checkbox label="2" />
          <v-checkbox label="3" />
          <v-checkbox label="4" />
          <v-checkbox label="5" />
          <v-checkbox label="6" />
          <v-checkbox label="7-1庫" />
          <v-checkbox label="7-1" />
          <v-checkbox label="7-2" />
          <v-checkbox label="8" />
          <v-checkbox label="9" />
          <v-checkbox label="10" />
          <v-checkbox label="11" />
          <v-checkbox label="12" />
          <v-checkbox label="13" />
          <v-checkbox label="14" />
          <v-checkbox label="15" />
          <v-checkbox label="15-1" />
          <v-checkbox label="16" />
          <v-checkbox label="17" />
          <v-checkbox label="18" />
          <v-checkbox label="19" />
          <v-checkbox label="20" />
        </v-row>-->

        <!-- 軌段檢查 -->
        <!-- 1 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>1. 0km0-100m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">電源邏輯電路</h3>
                  <v-radio-group style="margin-top:-5px" v-model="row1_1" row>
                    <v-radio label="正常" value="radio-1" />
                    <v-radio label="維修保養後正常" value="radio-2" />
                    <v-radio label="異常" value="radio-3" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">接收器</h3>
                  <v-radio-group style="margin-top:-5px" v-model="row1_2" row>
                    <v-radio label="正常" value="radio-1" />
                    <v-radio label="維修保養後正常" value="radio-2" />
                    <v-radio label="異常" value="radio-3" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">警音</h3>
                  <v-radio-group style="margin-top:-5px" v-model="row1_3" row>
                    <v-radio label="正常" value="radio-1" />
                    <v-radio label="維修保養後正常" value="radio-2" />
                    <v-radio label="異常" value="radio-3" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">警示燈</h3>
                  <v-radio-group style="margin-top:-5px" v-model="row1_4" row>
                    <v-radio label="正常" value="radio-1" />
                    <v-radio label="維修保養後正常" value="radio-2" />
                    <v-radio label="異常" value="radio-3" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 2 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12">
            <h3>2. 0km520m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <!-- 檢查項目 part 1/2 -->
                <v-col cols="12" sm="12">
                  <v-row no-gutter style="width: 100%;">
                    <v-col class="aa">
                      <h3>電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row2_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3>警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row2_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3>道路閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row2_5" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row2_7" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row2_8" row>
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 3 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>3. 0km550m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter style="width: 100%;">
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row3_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row3_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row3_5" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row3_7" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa"> 
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row3_8" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 4 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>4. 0km600m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row4_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row4_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row4_5" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row4_7" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row4_8" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 5 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>5. 0km700m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row5_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row5_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row5_5" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row5_7" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row5_8" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 6 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>6. 0km800m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row6_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row6_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row6_4" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row6_5" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" style="margin-top:-50px">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">遮桿閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row6_6" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row6_7" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row6_8" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col></v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 7 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>7. 0km900m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row7_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row7_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row7_4" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row7_5" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" style="margin-top:-50px">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">遮桿閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row7_6" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row7_7" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row7_8" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col></v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 7-1庫 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>7-1庫. 車庫線</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row7_1ku_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">接收器</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row7_1ku_2" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row7_1ku_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row7_1ku_4" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row7_1ku_5" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 7-1 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>7-1. 1km190m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row7_1_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row7_1_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row7_1_4" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row7_1_5" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 7-2 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>7-2. 1km240m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row7_2_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row7_2_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row7_2_4" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row7_2_5" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 8 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>8. 1km440m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row8_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row8_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row8_4" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row8_5" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row8_8" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 9 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>9. 1km900m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row9_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
					<v-col class="aa">
                      <h3 class="mb-1">接收器</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row9_2" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row9_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row9_4" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" style="margin-top:-50px">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row9_5" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮桿閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row9_6" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row9_7" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row9_8" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross9_date1"
                    :close-on-content-click="false"
                    transition="scale-transition">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 10 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>10. 2km110m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row10_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row10_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row10_4" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row10_5" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" style="margin-top:-50px">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">遮桿閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row10_6" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row10_7" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row10_8" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa"/>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross10_date1"
                    :close-on-content-click="false"
                    transition="scale-transition">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 11 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>11. 2km200m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row11_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row11_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row11_4" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row11_5" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross11_date1"
                    :close-on-content-click="false"
                    transition="scale-transition">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 12 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>12. 2km520m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row12_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row12_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row12_4" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row12_5" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" style="margin-top:-50px">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">遮桿閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row12_6" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row12_7" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row12_8" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa"/>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross12_date1"
                    :close-on-content-click="false"
                    transition="scale-transition">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 13 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>13. 2km830m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row13_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row13_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row13_4" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row13_5" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" style="margin-top:-50px">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">遮桿閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row13_6" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row13_7" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row13_8" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa"/>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross13_date1"
                    :close-on-content-click="false"
                    transition="scale-transition">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 14 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>14. 3km310m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row14_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row14_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row14_4" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row14_5" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" style="margin-top:-50px">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">遮桿閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row14_6" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row14_7" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row14_8" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa"/>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross14_date1"
                    :close-on-content-click="false"
                    transition="scale-transition">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 15 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>15. 3km580m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row15_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row15_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row15_4" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row15_5" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" style="margin-top:-50px">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row15_7" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row15_8" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa"/>
                    <v-col class="aa"/>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross15_date1"
                    :close-on-content-click="false"
                    transition="scale-transition">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 15-1 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>15-1. 4km500m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row15_1_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">接收器</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row15_1_2" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row15_1_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row15_1_4" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross15_1_date1"
                    :close-on-content-click="false"
                    transition="scale-transition">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 16 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>16. 4km560m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row16_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">接收器</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row16_2" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row16_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row16_4" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row15_5" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross16_date1"
                    :close-on-content-click="false"
                    transition="scale-transition">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 17 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>17. 4km900m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row17_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row17_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row17_4" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row17_5" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" style="margin-top:-50px">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">遮桿閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row17_6" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row17_7" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row17_8" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa"></v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross17_date1"
                    :close-on-content-click="false"
                    transition="scale-transition">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 17-1 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>17-1. 6km130m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row17_1_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">接收器</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row17_1_2" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row17_1_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row17_1_4" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row17_1_5" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross17_1_date1"
                    :close-on-content-click="false"
                    transition="scale-transition">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 18 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>18. 6km240m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row18_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">接收器</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row18_2" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row18_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row18_4" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row18_5" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross18_date1"
                    :close-on-content-click="false"
                    transition="scale-transition">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 18-1 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>18-1. 6km460m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row18_1_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">接收器</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row18_1_2" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row18_1_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row18_1_4" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross18_1_date1"
                    :close-on-content-click="false"
                    transition="scale-transition">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 19 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>19. 6km740m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row19_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">接收器</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row19_2" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row19_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row19_4" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row19_5" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross19_date1"
                    :close-on-content-click="false"
                    transition="scale-transition">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 19-1 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>19-1. 6km810m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row19_1_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">接收器</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row19_1_2" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row19_1_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row19_1_4" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross19_1_date1"
                    :close-on-content-click="false"
                    transition="scale-transition">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
        <!-- 19-2 -->
        <v-row no-gutter class="indigo--text">
          <v-col cols="12" sm="12">
            <h3>19-2. 6km830m</h3>
            <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6 mt-2">
              <v-row no-gutter>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">電源邏輯電路</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row19_2_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">接收器</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row19_2_2" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row19_2_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group style="margin-top:-5px" v-model="row19_2_4" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" style="margin-top:-35px">
                  <h3 class="mb-1">檢修日期</h3>
                  <v-menu
                    v-model="cross19_2_date1"
                    :close-on-content-click="false"
                    transition="scale-transition">
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
                  <h3 class="mb-1" style="margin-top:-12px">完成日期</h3>
                  <v-menu
                    style="margin-top:-12px"
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
      val1: false,
      title: "",
      newText: "工作日誌",
      // 自定義變數
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