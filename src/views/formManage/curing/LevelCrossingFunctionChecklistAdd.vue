<template>
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
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="rrow9_5" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮桿閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="rrow9_6" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="rrow9_7" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="rrow9_8" row>
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
                    v-model="cross1_date1"
                    :close-on-content-click="false"
                    transition="scale-transition">
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
                      <v-radio-group style="margin-top:-5px" v-model="rrow10_1" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警音</h3>
                      <v-radio-group style="margin-top:-5px" v-model="rrow10_3" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">警示燈</h3>
                      <v-radio-group style="margin-top:-5px" v-model="rrow10_4" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">道路閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="rrrow10_5" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-row no-gutter>
                    <v-col class="aa">
                      <h3 class="mb-1">遮桿閃光燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="rrrow10_6" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">信號燈1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="rrrow10_7" row>
                        <v-radio label="正常" value="radio-1" />
                        <v-radio label="維修保養後正常" value="radio-2" />
                        <v-radio label="異常" value="radio-3" />
                      </v-radio-group>
                    </v-col>
                    <v-col class="aa">
                      <h3 class="mb-1">遮斷機1,2</h3>
                      <v-radio-group style="margin-top:-5px" v-model="rrrow10_8" row>
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
                    v-model="cross1_date1"
                    :close-on-content-click="false"
                    transition="scale-transition">
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