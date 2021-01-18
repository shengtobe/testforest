<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2">
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>檢查日期(起)
        </h3>
        <v-menu
          v-model="QueryStartDay"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="QueryData.CheckStartDay" solo v-on="on" readonly></v-text-field>
          </template>
          <v-date-picker
            color="purple"
            v-model="QueryData.CheckStartDay"
            @input="QueryStartDay = false"
            locale="zh-tw"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>檢查日期(迄)
        </h3>
        <v-menu
          v-model="QueryEndDay"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="QueryData.CheckEndDay" solo v-on="on" readonly></v-text-field>
          </template>
          <v-date-picker
            color="purple"
            v-model="QueryData.CheckEndDay"
            @input="QueryEndDay = false"
            locale="zh-tw"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn color="green" dark large class="mb-sm-8 mb-md-8">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="px-2">
      <v-col cols="12" sm="3" md="3">
        <v-form ref="uploadform">
          <h3 class="mb-1">
            <v-icon class="mr-1 mb-1">mdi-file</v-icon>檔案上傳
          </h3>
          <v-text-field solo placeholder="點此選擇檔案" />
        </v-form>
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn color="pink" dark large class="mb-sm-8 mb-md-8">
          <v-icon class="mr-1">mdi-cloud-upload</v-icon>上傳
        </v-btn>
        <v-btn
          color="indigo"
          elevation="3"
          dark
          large
          class="ml-4 ml-sm-4 ml-md-4 mb-sm-8 mb-md-8"
          @click="newOne"
        >
          <v-icon>mdi-plus</v-icon>新增{{ newText }}
        </v-btn>
      </v-col>
    </v-row>
    <!-- 表格資料 -->
    <v-col cols="12">
      <v-card>
        <v-data-table
          :headers="headers"
          :items="tableItems"
          :options.sync="pageOpt"
          disable-sort
          disable-filtering
          hide-default-footer
        >
          <template v-slot:no-data>
            <span class="red--text subtitle-1">沒有資料</span>
          </template>

          <template v-slot:loading>
            <span class="red--text subtitle-1">資料讀取中...</span>
          </template>

          <!-- headers 的 content 欄位 (檢視內容) -->
          <template v-slot:item.content="{ item }">
            <v-btn
              title="詳細資料"
              class="mr-2"
              small
              dark
              fab
              color="info darken-1"
              @click="viewPage(item)"
            >
              <v-icon dark>mdi-magnify</v-icon>
            </v-btn>
          </template>

          <!-- 頁碼 -->
          <template v-slot:footer="footer">
            <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <!-- 新增日報表 modal -->
    <v-dialog v-model="Add" max-width="900px">
      <v-card>
        <v-card-title class="blue white--text px-4 py-1">
          新增{{ title }}
          <v-spacer />
          <v-btn dark fab small text @click="close" class="mr-n2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <div class="px-6 py-4">
          <v-col cols="12">
            <!-- 檢查項目 -->
            <v-row no-gutter class="indigo--text">
              <v-col cols="12" sm="4">
                <h3 class="mb-1">機車編號</h3>
                <v-text-field v-model="AddData.CarNumber" solo>
                  <span slot="prepend">DL</span>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <h3 class="mb-1">檢查日期</h3>
                <v-menu
                  v-model="CheckDay"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model.trim="AddData.CheckDay" solo v-on="on" readonly />
                  </template>
                  <v-date-picker
                    color="purple"
                    v-model="AddData.CheckDay"
                    @input="CheckDay = false"
                    locale="zh-tw"
                  />
                </v-menu>
              </v-col>
              <v-col cols="12" sm="4">
                <h3 class="mb-1">氣候</h3>
                <v-text-field v-model="AddData.Climate" solo />
              </v-col>
            </v-row>
            <v-row no-gutter class="indigo--text">
              <v-col cols="12" sm="4">
                <h3 class="mb-1">本日行駛</h3>
                <v-text-field v-model="AddData.TodayDriving" solo>
                  <span slot="append">km</span>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <h3 class="mb-1">累計公里</h3>
                <v-text-field v-model="AddData.Totalkm" solo>
                  <span slot="append">km</span>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <h3 class="mb-1">下次保養</h3>
                <v-text-field v-model="AddData.NextMaintenance" solo>
                  <span slot="append">km</span>
                </v-text-field>
              </v-col>
            </v-row>
            <!-- 摺疊項目 -->
            <v-expansion-panels v-model="panel" multiple>
              <!-- (ㄧ)引擎啟動後10分鐘 -->
              <v-expansion-panel>
                <v-expansion-panel-header color="teal" class="white--text">(ㄧ)引擎啟動後10分鐘</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutter class="indigo--text darken-2 d-sm-flex font-weight-black">
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">引擎油壓</h3>
                      <v-text-field v-model="AddData.EngineStart.OilPressure" solo>
                        <span slot="append">kg/cm2(參考值1.5-5)</span>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">引擎水溫</h3>
                      <v-text-field v-model="AddData.EngineStart.WaterTemperature" solo>
                        <span slot="append">℃(參考值50-100℃)</span>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">TC油壓</h3>
                      <v-text-field v-model="AddData.EngineStart.TCOilPressure" solo>
                        <span slot="append">
                          ㎏/㎝2(A:DBS115-2補充油壓2~4;主液壓:7~10)
                          <br />(B：TDCBN-11-3500補充油壓2~6；主液壓19~22)
                        </span>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!-- (二)發電機引擎 -->
              <v-expansion-panel>
                <v-expansion-panel-header color="teal" class="white--text">(二)發電機引擎</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutter class="indigo--text darken-2 d-sm-flex font-weight-black">
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">引擎油壓</h3>
                      <v-text-field v-model="AddData.Generator.OilPressure" solo>
                        <span slot="append">kg/cm2(參考值2.1-4.6)</span>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">引擎水溫</h3>
                      <v-text-field v-model="AddData.Generator.WaterTemperature" solo>
                        <span slot="append">℃(參考值50-100℃)</span>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">引擎轉速</h3>
                      <v-text-field v-model="AddData.Generator.RotatingSpeed" solo>
                        <span slot="append">rpm (參考值1,800)</span>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">頻率</h3>
                      <v-text-field v-model="AddData.Generator.Frequency" solo>
                        <span slot="append">Hz</span>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">電流</h3>
                      <v-text-field v-model="AddData.Generator.Current" solo>
                        <span slot="append">A</span>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">電壓</h3>
                      <v-text-field v-model="AddData.Generator.Voltage" solo>
                        <span slot="append">A</span>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">下次保養工時</h3>
                      <v-text-field v-model="AddData.Generator.NextMaintenanceHour" solo>
                        <span slot="append">小時</span>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">累計工時</h3>
                      <v-text-field v-model="AddData.Generator.GrandTotalHour" solo>
                        <span slot="append">小時</span>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!-- (三)車次、區間、噸數 -->
              <v-expansion-panel>
                <v-expansion-panel-header color="teal" class="white--text">(三)車次、區間、噸數</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutter class="indigo--text darken-2 d-sm-flex font-weight-black">
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">車次</h3>
                      <v-text-field v-model="AddData.TrainNumber" solo />
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">區間</h3>
                      <v-text-field v-model="AddData.Interval" solo />
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">噸數</h3>
                      <v-text-field v-model="AddData.Tonnes" solo />
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!-- (四)出車命令 -->
              <v-expansion-panel>
                <v-expansion-panel-header color="teal" class="white--text">(四)出車命令</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutter class="indigo--text darken-2 d-sm-flex font-weight-black">
                    <v-col cols="12">
                      <p>
                        ※司機酒測合格並接受勤前教育，無線電測試結果良好，完成開車前整備。
                        ※確認行車記錄紙已安裝
                      </p>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h2>准予出庫</h2>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">調度員核章</h3>
                      <v-text-field v-model="AddData.Dispatcher" solo />
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!-- (五)機車使用中狀況 -->
              <v-expansion-panel>
                <v-expansion-panel-header color="teal" class="white--text">(五)機車使用中狀況</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutter class="indigo--text darken-2 d-sm-flex font-weight-black">
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">引擎rpm</h3>
                      <v-text-field v-model="AddData.CarType.HighestRpm" solo>
                        <span slot="prepend">最高</span>
                        <span slot="append">轉</span>
                      </v-text-field>
                      <v-text-field v-model="AddData.CarType.IdleRpm" solo>
                        <span slot="prepend">惰轉</span>
                        <span slot="append">轉</span>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">引擎油壓</h3>
                      <v-text-field v-model="AddData.CarType.HighestOilPressure" solo>
                        <span slot="prepend">最高</span>
                        <span slot="append">kg/cm2(參考值同上)</span>
                      </v-text-field>
                      <v-text-field v-model="AddData.CarType.IdleOilPressure" solo>
                        <span slot="prepend">最低</span>
                        <span slot="append">kg/cm2(參考值同上)</span>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">引擎水溫</h3>
                      <v-text-field v-model="AddData.CarType.HighestWaterTemperature" solo>
                        <span slot="prepend">最高</span>
                        <span slot="append">℃(參考值同上)</span>
                      </v-text-field>
                      <v-text-field v-model="AddData.CarType.IdleWaterTemperature" solo>
                        <span slot="prepend">最低</span>
                        <span slot="append">℃(參考值同上)</span>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">TC油壓</h3>
                      <v-text-field v-model="AddData.CarType.HighestTCOilPressure" solo>
                        <span slot="prepend">最高</span>
                        <span slot="append">kg/cm2(參考值同上)</span>
                      </v-text-field>
                      <v-text-field v-model="AddData.CarType.IdleTCOilPressure" solo>
                        <span slot="prepend">最低</span>
                        <span slot="append">kg/cm2(參考值同上)</span>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">TC油溫</h3>
                      <v-text-field v-model="AddData.CarType.HighestTCOilTemperature" solo>
                        <span slot="prepend">最高</span>
                        <span slot="append">℃(參考值80-110℃)</span>
                      </v-text-field>
                      <v-text-field v-model="AddData.CarType.IdleTCOilTemperature" solo>
                        <span slot="prepend">最低</span>
                        <span slot="append">℃(參考值80-110℃)</span>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">M.R</h3>
                      <v-text-field v-model="AddData.CarType.HighestMR" solo>
                        <span slot="prepend">最高</span>
                        <span slot="append">kg/cm2(參考值6.5-8)</span>
                      </v-text-field>
                      <v-text-field v-model="AddData.CarType.IdleMR" solo>
                        <span slot="prepend">最低</span>
                        <span slot="append">kg/cm2(參考值6.5-8)</span>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">B.P</h3>
                      <v-text-field v-model="AddData.CarType.HighestBP" solo>
                        <span slot="prepend">最高</span>
                        <span slot="append">kg/cm2(參考值3.6-5)</span>
                      </v-text-field>
                      <v-text-field v-model="AddData.CarType.IdleBP" solo>
                        <span slot="prepend">最低</span>
                        <span slot="append">kg/cm2(參考值3.6-5)</span>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">逆轉機油壓</h3>
                      <v-text-field v-model="AddData.CarType.RMOilPressure" solo>
                        <span slot="append">kg/cm2</span>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">充電</h3>
                      <v-text-field v-model="AddData.CarType.HighestRecharge" solo>
                        <span slot="prepend">最高</span>
                        <span slot="append">A</span>
                      </v-text-field>
                      <v-text-field v-model="AddData.CarType.IdleRecharge" solo>
                        <span slot="prepend">最低</span>
                        <span slot="append">A</span>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!-- (六)路線 -->
              <v-expansion-panel>
                <v-expansion-panel-header color="teal" class="white--text">(六)路線</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutter class="indigo--text darken-2 d-sm-flex font-weight-black">
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">路基</h3>
                      <v-text-field v-model="AddData.Route.Roadbed" solo />
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">隧道及橋樑</h3>
                      <v-text-field v-model="AddData.Route.TunnelBridge" solo />
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">平交道安全防護設施</h3>
                      <v-text-field v-model="AddData.Route.ProtectiveFacility" solo />
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!-- (七)其他事項 -->
              <v-expansion-panel>
                <v-expansion-panel-header color="teal" class="white--text">(七)其他事項</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutter class="indigo--text darken-2 d-sm-flex font-weight-black">
                    <v-col cols="12">
                      <h3 class="mb-1">其他事項</h3>
                      <v-textarea v-model="AddData.SomethingElse" solo rows="4" />
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!-- (八)本日用油 -->
              <v-expansion-panel>
                <v-expansion-panel-header color="teal" class="white--text">(八)本日用油</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutter class="indigo--text darken-2 d-sm-flex font-weight-black">
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">柴油</h3>
                      <v-text-field v-model="AddData.ToDayOilVolume.Diesel" solo>
                        <span slot="append">公升</span>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">液體變速機</h3>
                      <v-text-field v-model="AddData.ToDayOilVolume.VariableSpeed" solo>
                        <span slot="append">公升</span>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">機油(10#)</h3>
                      <v-text-field v-model="AddData.ToDayOilVolume.EngineOil10" solo>
                        <span slot="append">公升</span>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">機油(15W/40)</h3>
                      <v-text-field v-model="AddData.ToDayOilVolume.EngineOil15" solo>
                        <span slot="append">公升</span>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">機油(85W/90)</h3>
                      <v-text-field v-model="AddData.ToDayOilVolume.EngineOil85" solo>
                        <span slot="append">公升</span>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <h3 class="mb-1">液壓油</h3>
                      <v-text-field v-model="AddData.ToDayOilVolume.HydraulicOil" solo>
                        <span slot="append">公升</span>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <!-- END 檢查項目 -->
          </v-col>
        </div>

        <v-card-actions class="px-5 pb-5">
          <v-spacer />
          <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
          <v-btn color="success" elevation="4">送出</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { maintainStatusOpts } from '@/assets/js/workList'
import { fetchFormOrderList, fetchFormOrderOne, createFormOrder, createFormOrder0 } from '@/apis/formManage/serve'

export default {
  data() {
    return {
      title: "_____柴油液力機車行車紀錄表",
      newText: "紀錄表",
      isLoading: false,
      disabled: false,
      QueryStartDay: "",
      QueryEndDay: "",
      QueryData: {
        CheckStartDay: "",
        CheckEndDay: "",
      },
      CheckDay: "",
      panel: [0, 1, 2, 3, 4, 5, 6, 7], // 摺疊預設展開
      AddData: {
        CarNumber: "",
        CheckDay: "",
        Climate: "",
        TodayDriving: 0,
        Totalkm: 0,
        NextMaintenance: 0,
        EngineStart: {
          OilPressure: 0,
          WaterTemperature: 0,
          TCOilPressure: 0,
        },
        Generator: {
          OilPressure: 0,
          WaterTemperature: 0,
          RotatingSpeed: 0,
          Frequency: 0,
          Current: 0,
          Voltage: 0,
          NextMaintenanceHour: 0,
          GrandTotalHour: 0,
        },
        TrainNumber: 0,
        Interval: 0,
        Tonnes: 0,
        Dispatcher: "",
        CarType: {
          HighestRpm: 0,
          IdleRpm: 0,
          HighestOilPressure: 0,
          IdleOilPressure: 0,
          HighestWaterTemperature: 0,
          IdleWaterTemperature: 0,
          HighestTCOilPressure: 0,
          IdleTCOilPressure: 0,
          HighestTCOilTemperature: 0,
          IdleTCOilTemperature: 0,
          HighestMR: 0,
          IdleMR: 0,
          HighestBP: 0,
          IdleBP: 0,
          RMOilPressure: 0,
          HighestRecharge: 0,
          IdleRecharge: 0,
        },
        Route: {
          Roadbed: "",
          TunnelBridge: "",
          ProtectiveFacility: "",
        },
        SomethingElse: "",
        ToDayOilVolume: {
          Diesel: 0,
          VariableSpeed: 0,
          EngineOil10: 0,
          EngineOil15: 0,
          EngineOil85: 0,
          HydraulicOil: 0,
        },
      },
      Add: false,
      pageOpt: { page: 1 }, // 目前頁數
      //---api---
      DB_Table: "RP001",
      nowTime: "",
      doMan:{
        id: '',
        name: '',
        depart: '',
        checkManName: ''
      },
      ipt2: {},
      defaultIpt: {  // 預設的欄位值
          startDay: '',
          EndDay: '',
          depart: '',  // 單位
        },
      headers: [
        // 表格顯示的欄位 DepartCode ID Name
        { text: "項次", value: "FlowId", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "保養日期", value: "CheckDay", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "審查狀態", value: "CheckStatus", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "填寫人", value: "Name", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "保養單位", value: "DepartCode", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "功能", value: "content", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
      ],
      tableItems: [],
      //------
    };
  },
  components: { Pagination }, // 頁碼
  computed: {
        ...mapState ('user', {
            userData: state => state.userData,  // 使用者基本資料
        }),
  },
  created() {
      this.ipt2 = { ...this.defaultIpt }
      //更新時間
      var today=new Date();
      let mStr = today.getMonth()+1;
      let dStr = today.getDate();
      if(mStr < 10){
        mStr = '0' + mStr;
      }
      if(dStr < 10){
        dStr = '0' + dStr;
      }
      this.nowTime = today.getFullYear()+'-'+ mStr +'-'+ dStr;
  },
  methods: {
    initInput(){
      this.doMan.name = this.userData.UserName;
      this.zs = this.nowTime;
      var step;
      for (step = 0; step < 7; step++) {
        this.ipt.items[step].status = "0"
        this.ipt.items[step].note = ''
      }
      this.Advice = "";
      this.Measures = ""
    },
    unique(list){
      var arr = [];
      let b = false;
      for (var i = 0; i < list.length; i++) {
        if (i == 0) arr.push(list[i]);
        b = false;
        if (arr.length > 0 && i > 0) {
          for (var j = 0; j < arr.length; j++) {
            if (arr[j].RPFlowNo == list[i].RPFlowNo) {
              b = true;
              //break;
            }
          }
          if (!b) {
            arr.push(list[i]);
          }
        }
      }
      return arr;
    },
    newOne(){
      console.log("newOne23")
      this.Add = true
      console.log("this.Add: " + this.Add)
      this.initInput();
    },
    ...mapActions('system', [
            'chLoadingShow',  // 切換 loading 圖顯示
        ]),
    // 更換頁數
    chPage(n) {
      this.pageOpt.page = n;
    },
    // 搜尋
    search() {
      console.log("Search click");
      this.chLoadingShow()
      fetchFormOrderList({
        ClientReqTime: getNowFullTime(),  // client 端請求時間
        OperatorID: this.userData.UserId,  // 操作人id
        KeyName: this.DB_Table,  // DB table
        KeyItem: [ 
          {'Column':'StartDayVlaue','Value':this._data.z},
          {"Column":"EndDayVlaue","Value":this._data.df},
          {"Column":"DepartCode","Value":this._data.ipt2.depart},
                ],
        QyName:[
          // "DISTINCT (RPFlowNo)",
          // // "ID",
          // // "Name",
          // // "CheckDay",
          // // "CheckStatus",
          // " * "
          "RPFlowNo",
          "ID",
          "Name",
          "CheckDay",
          "CheckStatus",
          "FlowId"
        ],
      }).then(res => {
        let tbBuffer = JSON.parse(res.data.DT)
        let aa = this.unique(tbBuffer)
        this.tableItems = aa
      }).catch(err => {
        console.log(err)
        alert('查詢時發生問題，請重新查詢!')
      }).finally(() => {
        console.log("search final")
        this.chLoadingShow()
      })
    },
    // 存
    save() {},
    // 關閉 dialog
    close() {
      this.Add = false;
    },
    viewPage(item) {
      console.log("item: " + item)
      console.log("RPFlowNo: " + item.RPFlowNo)
      this.chLoadingShow()
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
        this.chLoadingShow()
      })
    },//viewPage
  },
};
</script>
