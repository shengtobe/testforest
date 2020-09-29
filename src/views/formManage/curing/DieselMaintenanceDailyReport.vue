<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">_____柴油液力機車行車紀錄表</h2>
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
          @click="Add = true"
        >
          <v-icon>mdi-plus</v-icon>新增紀錄表
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
          <template v-slot:item.shop>
            <v-btn
              title="詳細資料"
              class="mr-2"
              small
              dark
              fab
              color="info darken-1"
              @click="Add = true"
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
          新增_____柴油液力機車行車紀錄表
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

export default {
  data() {
    return {
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
          HydraulicOil: 0
        }
      },
      Add: false,
      pageOpt: { page: 1 }, // 目前頁數
      headers: [
        // 表格顯示的欄位
        {
          text: "項次",
          value: "a0",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "檢查日期",
          value: "aa",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "審查狀態",
          value: "cc",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "填寫人",
          value: "dd",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
        {
          text: "功能",
          value: "shop",
          align: "center",
          divider: true,
          class: "subtitle-1 white--text font-weight-bold light-blue darken-1",
        },
      ],
      tableItems: [
        {
          a0: "1",
          aa: "2020-08-01",
          cc: "已審查",
          dd: "王大明",
        },
        {
          a0: "2",
          aa: "2020-08-10",
          cc: "審查中",
          dd: "王大明",
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
    // 搜尋
    search() {},
    // 關閉 dialog
    close() {
      this.Add = false;
    },
  },
};
</script>
