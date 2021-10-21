<template>
  <v-sheet class="ma-4 mb-8" color="yellow lighten-2">
    <v-container style="max-width: 1200px" class="px-8">
      <p class="font-weight-black title text-center">新增{{ title }}</p>
      <v-row class="white px-4">
        <!-- 基本資料 -->
        <v-row no-gutter class="label-header">
          <v-col cols="12" sm="3">
            <dateSelect
              label="保養日期"
              key="checkDate"
              :showIcon="commonSettings.iconShow"
              v-model.lazy="inputData.editableData.CheckDay"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">天氣</h3>
            <v-select
              dense
              single-line
              :items="WeatherOptions"
              outlined
              v-model="inputData.editableData.Weather"
              key="Weather"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">現場工作負責人職稱</h3>
            <v-text-field
              dense
              single-line
              outlined
              v-model="inputData.editableData.JobName"
              key="JobName"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">姓名</h3>
            <v-text-field
              dense
              single-line
              outlined
              v-model="inputData.editableData.Supervisor"
              key="Supervisor"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">工作項目</h3>
            <v-text-field
              dense
              single-line
              outlined
              v-model="inputData.editableData.Item"
              key="Item"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">工作地點</h3>
            <v-text-field
              dense
              single-line
              outlined
              v-model="inputData.editableData.Location"
              key="Location"
            />
          </v-col>
          <v-col cols="6" sm="2" class="xwd">
            <h3 class="mb-1">全班人數</h3>
            <v-text-field
              class="iwidth"
              type="number"
              dense
              single-line
              outlined
              v-model="inputData.editableData.TotalCount"
              key="TotalCount"
            />
          </v-col>
          <v-col cols="6" sm="2" class="xwd">
            <h3 class="mb-1">出勤人數</h3>
            <v-text-field
              class="iwidth"
              type="number"
              dense
              single-line
              outlined
              v-model="inputData.editableData.CheckOption1"
              key="CheckOption1"
            />
          </v-col>
        </v-row>
        <!-- 人員出勤狀態 -->
        <v-row no-gutter class="label-header">
          <v-col cols="6" sm="1">
            <h3 class="mb-1">休假</h3>
            <v-text-field
              class="iwidth"
              type="number"
              dense
              single-line
              outlined
              v-model="inputData.editableData.CheckOption2"
              key="CheckOption2"
            />
          </v-col>
          <v-col cols="6" sm="1">
            <h3 class="mb-1">病假</h3>
            <v-text-field
              class="iwidth"
              type="number"
              dense
              single-line
              outlined
              v-model="inputData.editableData.CheckOption3"
              key="CheckOption3"
            />
          </v-col>
          <v-col cols="6" sm="1">
            <h3 class="mb-1">事假</h3>
            <v-text-field
              class="iwidth"
              type="number"
              dense
              single-line
              outlined
              v-model="inputData.editableData.CheckOption4"
              key="CheckOption4"
            />
          </v-col>
          <v-col cols="6" sm="1">
            <h3 class="mb-1">公假</h3>
            <v-text-field
              class="iwidth"
              type="number"
              dense
              single-line
              outlined
              v-model="inputData.editableData.CheckOption5"
              key="CheckOption5"
            />
          </v-col>
          <v-col cols="6" sm="1">
            <h3 class="mb-1">助勤</h3>
            <v-text-field
              class="iwidth"
              type="number"
              dense
              single-line
              outlined
              v-model="inputData.editableData.CheckOption6"
              key="CheckOption6"
            />
          </v-col>
          <v-col cols="6" sm="1">
            <h3 class="mb-1">公出</h3>
            <v-text-field
              class="iwidth"
              type="number"
              dense
              single-line
              outlined
              v-model="inputData.editableData.CheckOption7"
              key="CheckOption7"
            />
          </v-col>
          <v-col cols="6" sm="1">
            <h3 class="mb-1">夜休</h3>
            <v-text-field
              class="iwidth"
              type="number"
              dense
              single-line
              outlined
              v-model="inputData.editableData.CheckOption8"
              key="CheckOption8"
            />
          </v-col>
          <v-col cols="6" sm="1">
            <h3 class="mb-1">出差</h3>
            <v-text-field
              class="iwidth"
              type="number"
              dense
              single-line
              outlined
              v-model="inputData.editableData.CheckOption9"
              key="CheckOption9"
            />
          </v-col>
          <v-col cols="6" sm="1">
            <h3 class="mb-1">查道</h3>
            <v-text-field
              class="iwidth"
              type="number"
              dense
              single-line
              outlined
              v-model="inputData.editableData.CheckOption10"
              key="CheckOption9"
            />
          </v-col>
          <v-col cols="6" sm="2">
            <h3 class="mb-1">遲到早退</h3>
            <v-text-field
              class="iwidth"
              type="number"
              dense
              single-line
              outlined
              v-model="inputData.editableData.CheckOption11"
              key="CheckOption11"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <h3 class="mb-1">其他</h3>
            <v-text-field
              dense
              single-line
              outlined
              v-model="inputData.editableData.CheckOption12"
              key="CheckOption12"
            />
          </v-col>
        </v-row>
        <!-- 出料 -->
        <v-row no-gutter class="label-header">
          <v-col cols="12">
            <h3>出料</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">名稱</h3>
                  <v-text-field
                    dense
                    single-line
                    outlined
                    v-model="inputData.editableData.CheckOption13"
                    key="CheckOption13"
                  />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">單位</h3>
                  <v-text-field
                    dense
                    single-line
                    outlined
                    v-model="inputData.editableData.CheckOption14"
                    key="CheckOption14"
                  />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">數量</h3>
                  <v-text-field
                    dense
                    single-line
                    outlined
                    v-model="inputData.editableData.CheckOption15"
                    key="CheckOption14"
                  />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 進料 -->
        <v-row no-gutter class="label-header">
          <v-col cols="12">
            <h3>進料</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">名稱</h3>
                  <v-text-field
                    dense
                    single-line
                    outlined
                    v-model="inputData.editableData.CheckOption16"
                    key="CheckOption16"
                  />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">單位</h3>
                  <v-text-field
                    dense
                    single-line
                    outlined
                    v-model="inputData.editableData.CheckOption17"
                    key="CheckOption17"
                  />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">數量</h3>
                  <v-text-field
                    dense
                    single-line
                    outlined
                    v-model="inputData.editableData.CheckOption18"
                    key="CheckOption18"
                  />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 舊料 -->
        <v-row no-gutter class="label-header">
          <v-col cols="12">
            <h3>舊料</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">名稱</h3>
                  <v-text-field
                    dense
                    single-line
                    outlined
                    v-model="inputData.editableData.CheckOption19"
                    key="CheckOption19"
                  />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">單位</h3>
                  <v-text-field
                    dense
                    single-line
                    outlined
                    v-model="inputData.editableData.CheckOption20"
                    key="CheckOption20"
                  />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">回收數量</h3>
                  <v-text-field
                    dense
                    single-line
                    outlined
                    v-model="inputData.editableData.CheckOption21"
                    key="CheckOption21"
                  />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">退段數量</h3>
                  <v-text-field
                    dense
                    single-line
                    outlined
                    v-model="inputData.editableData.CheckOption22"
                    key="CheckOption22"
                  />
                </v-col>
              </v-row>
              <v-row no-gutter>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">名稱</h3>
                  <v-text-field
                    dense
                    single-line
                    outlined
                    v-model="inputData.editableData.CheckOption23"
                    key="CheckOption23"
                  />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">單位</h3>
                  <v-text-field
                    dense
                    single-line
                    outlined
                    v-model="inputData.editableData.CheckOption24"
                    key="CheckOption24"
                  />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">回收數量</h3>
                  <v-text-field
                    dense
                    single-line
                    outlined
                    v-model="inputData.editableData.CheckOption25"
                    key="CheckOption25"
                  />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">退段數量</h3>
                  <v-text-field
                    dense
                    single-line
                    outlined
                    v-model="inputData.editableData.CheckOption26"
                    key="CheckOption26"
                  />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 使用機具 -->
        <v-row no-gutter class="label-header">
          <v-col cols="12">
            <h3>本日使用機具</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2"
            >
              <v-row justify="space-around">
                <!-- <div v-for="UsedMachine in UsedMachines" :key="UsedMachine.id">
                  <input
                    type="checkbox"
                    v-model="inputData.editableData.CheckOption27"
                    :id="'UsedMachine_' + UsedMachine.id"
                    :value="UsedMachine.id"
                  />
                  <label>{{ UsedMachine.name }}</label>
                </div> -->
                <v-checkbox
                  class="col-6 col-md-3"
                  label="1.起道機"
                  v-model="inputData.editableData.CheckOption27"
                  key="tool_1"
                  value="1"
                />
                <v-checkbox
                  class="col-6 col-md-3"
                  label="2.砸道機"
                  v-model="inputData.editableData.CheckOption27"
                  key="tool_2"
                  value="2"
                />
                <v-checkbox
                  class="col-6 col-md-3"
                  label="3.電機"
                  v-model="inputData.editableData.CheckOption27"
                  value="3"
                />
                <v-checkbox
                  class="col-6 col-md-3"
                  label="4.鋸軌機"
                  v-model="inputData.editableData.CheckOption27"
                  value="4"
                />
                <v-checkbox
                  class="col-6 col-md-3"
                  label="5.鑽孔機"
                  v-model="inputData.editableData.CheckOption27"
                  value="5"
                />
                <v-checkbox
                  class="col-6 col-md-3"
                  label="6.割草機"
                  v-model="inputData.editableData.CheckOption27"
                  value="6"
                />
                <v-checkbox
                  class="col-6 col-md-3"
                  label="7.噴霧器"
                  v-model="inputData.editableData.CheckOption27"
                  value="7"
                />
                <v-checkbox
                  class="col-6 col-md-3"
                  label="8.螺栓擰緊器"
                  v-model="inputData.editableData.CheckOption27"
                  value="8"
                />
                <v-checkbox
                  class="col-6 col-md-3"
                  label="9.起釘撬棍"
                  v-model="inputData.editableData.CheckOption27"
                  value="9"
                />
                <v-checkbox
                  class="col-6 col-md-3"
                  label="10.洋鎬"
                  v-model="inputData.editableData.CheckOption27"
                  value="10"
                />
                <v-checkbox
                  class="col-6 col-md-3"
                  label="11.大槌"
                  v-model="inputData.editableData.CheckOption27"
                  value="11"
                />
                <v-checkbox
                  class="col-6 col-md-3"
                  label="12.水平軌距尺"
                  v-model="inputData.editableData.CheckOption27"
                  value="12"
                />
                <v-checkbox
                  class="col-6 col-md-3"
                  label="13.洋鏟"
                  v-model="inputData.editableData.CheckOption27"
                  value="13"
                />
                <v-checkbox
                  class="col-6 col-md-3"
                  label="14.鏈鋸機"
                  v-model="inputData.editableData.CheckOption27"
                  value="14"
                />
                <v-checkbox
                  class="col-6 col-md-3"
                  label="15.鐵担車"
                  v-model="inputData.editableData.CheckOption27"
                  value="15"
                />
                <v-checkbox
                  class="col-6 col-md-3"
                  label="16.平車"
                  v-model="inputData.editableData.CheckOption27"
                  value="16"
                />
                <v-checkbox
                  class="col-6 col-md-3"
                  label="17.吊軌器"
                  v-model="inputData.editableData.CheckOption27"
                  value="17"
                />
                <v-checkbox
                  class="col-6 col-md-3"
                  label="18.彎軌器"
                  v-model="inputData.editableData.CheckOption27"
                  value="18"
                />
                <v-checkbox
                  class="col-6 col-md-3"
                  label="19.電動砂輪機"
                  v-model="inputData.editableData.CheckOption27"
                  value="19"
                />
                <v-checkbox
                  class="col-6 col-md-3"
                  label="20.鈍孔機"
                  v-model="inputData.editableData.CheckOption27"
                  value="20"
                />
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 工具及材料檢查 -->
        <v-row no-gutter class="label-header">
          <v-col cols="12">
            <h3>工具及材料檢查</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2"
            >
              <v-row no-gutter>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">1.工具及材料檢查</h3>
                  <v-radio-group
                    row
                    v-model="inputData.editableData.CheckOption28"
                    key="CheckOption28"
                  >
                    <v-radio label="正常" color="success" value="1" />
                    <v-radio label="異常" color="error" value="2" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">2.其他機具</h3>
                  <v-text-field
                    dense
                    single-line
                    outlined
                    v-model="inputData.editableData.CheckOption29"
                    key="CheckOption29"
                  />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">3.異常機具(填機具代號)</h3>
                  <v-text-field
                    dense
                    single-line
                    outlined
                    v-model="inputData.editableData.CheckOption30"
                    key="CheckOption30"
                  />
                </v-col>
              </v-row>
              <h3 class="mb-1">4.機具使用前檢查</h3>
              <v-row no-gutter>
                <v-col cols="12" sm="3">
                  <h4 class="mb-1">(1)機油</h4>
                  <v-radio-group
                    v-model="inputData.editableData.CheckOption31"
                    row
                    key="CheckOption31"
                  >
                    <v-radio label="正常" color="success" value="1" />
                    <v-radio label="異常" color="error" value="2" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3">
                  <h4 class="mb-1">(2)油料</h4>
                  <v-radio-group
                    v-model="inputData.editableData.CheckOption32"
                    row
                    key="CheckOption32"
                  >
                    <v-radio label="正常" color="success" value="1" />
                    <v-radio label="異常" color="error" value="2" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3">
                  <h4 class="mb-1">(3)油壓及線路</h4>
                  <v-radio-group
                    v-model="inputData.editableData.CheckOption33"
                    row
                    key="CheckOption33"
                  >
                    <v-radio label="正常" color="success" value="1" />
                    <v-radio label="異常" color="error" value="2" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3">
                  <h4 class="mb-1">(4)啟動及運轉情形</h4>
                  <v-radio-group
                    v-model="inputData.editableData.CheckOption34"
                    row
                    key="CheckOption34"
                  >
                    <v-radio label="正常" color="success" value="1" />
                    <v-radio label="異常" color="error" value="2" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="3">
                  <h4 class="mb-1">(5)各部位螺栓鬆緊</h4>
                  <v-radio-group
                    v-model="inputData.editableData.CheckOption35"
                    row
                    key="CheckOption35"
                  >
                    <v-radio label="正常" color="success" value="1" />
                    <v-radio label="異常" color="error" value="2" />
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 其餘檢查 -->
        <v-row no-gutter class="label-header">
          <v-col cols="12">
            <h3>其餘檢查</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2"
            >
              <v-col cols="12">
                <h4>(1)行前檢查</h4>
                <v-row no-gutter justify="space-around">
                  <v-checkbox
                    class="col-12 col-md-4"
                    label="人員安全配備檢查"
                    v-model="inputData.editableData.CheckOption36"
                    value="1"
                  />
                  <v-checkbox
                    class="col-12 col-md-4"
                    label="行車調度無線電話機測試"
                    v-model="inputData.editableData.CheckOption36"
                    value="2"
                  />
                  <v-checkbox
                    class="col-12 col-md-4"
                    label="已辦妥進入路線內申請"
                    v-model="inputData.editableData.CheckOption36"
                    value="3"
                  />
                </v-row>
              </v-col>
              <v-col cols="12">
                <h4>(2)暸望員安全配戴</h4>
                <v-row no-gutter justify="space-around">
                  <v-checkbox
                    class="col-6 col-md-3"
                    label="臂章"
                    v-model="inputData.editableData.CheckOption37"
                    value="1"
                  />
                  <v-checkbox
                    class="col-6 col-md-3"
                    label="無線電對講機"
                    v-model="inputData.editableData.CheckOption37"
                    value="2"
                  />
                  <v-checkbox
                    class="col-6 col-md-3"
                    label="哨子"
                    v-model="inputData.editableData.CheckOption37"
                    value="3"
                  />
                  <v-checkbox
                    class="col-6 col-md-3"
                    label="號誌旗(燈)"
                    v-model="inputData.editableData.CheckOption37"
                    value="4"
                  />
                </v-row>
              </v-col>
              <v-col cols="12">
                <h4>(3)豎立工作鳴笛牌位置</h4>
                <v-text-field
                  dense
                  single-line
                  outlined
                  v-model="inputData.editableData.CheckOption38"
                  key="CheckOption38"
                />
              </v-col>
              <v-col cols="12">
                <h4>(4)接地桿操作者安全配戴</h4>
                <v-row no3-gutter justify="space-around">
                  <v-checkbox
                    class="col-12 col-md-4"
                    label="絕緣手套"
                    v-model="inputData.editableData.CheckOption39"
                    value="1"
                  />
                  <v-checkbox
                    class="col-12 col-md-4"
                    label="羊皮手套"
                    v-model="inputData.editableData.CheckOption39"
                    value="2"
                  />
                  <v-checkbox
                    class="col-12 col-md-4"
                    label="安全皮鞋"
                    v-model="inputData.editableData.CheckOption39"
                    value="3"
                  />
                </v-row>
              </v-col>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 項目宣導 -->
        <v-row no-gutter class="label-header">
          <v-col cols="12">
            <h3>勤前教育項目宣導</h3>
            <v-alert
              dense
              border="top"
              colored-border
              color="border-bg-dark-yellow"
              elevation="4"
              class="mb-6 mt-2"
            >
              <v-col cols="12">
                <h4>
                  1.未經現場負責人同意，禁止擅自進入路線內，
                  非作業需要禁止在軌道內行走或停留。
                </h4>
                <h4>
                  2.沿路線行進時，應面向列車行駛方向行走，並注意背面來車；
                  若聽列車鳴笛即刻避讓路線路肩。
                </h4>
                <h4>
                  3.遇有本線或鄰線列車駛近鳴笛或避車哨音時，應即刻停止工作，並呼喚同仁待避於工作路線路肩，
                  工作時若需穿越軌道，應確實停、看、聽，確認左、右無來車時迅速通過，不得冒進，以防遭車撞擊。
                </h4>
                <h4>
                  4.上班前及其上工期間嚴禁喝酒及飲用含酒精性飲料，違者當日應請假，不准上班，
                  並擇期離開工作崗位，防止影響他人工作情緒。
                </h4>
                <h4>
                  5.身體不舒適或其他因素，致無法勝任當日工作者請提報，俾另派工作。
                </h4>
                <h4>
                  6.雙線區間避讓列車應在工作線之路肩或適當地點外側，
                  嚴禁避讓於兩線間或鄰線軌道上，單線區間，應避讓於路線兩側路肩。
                </h4>
                <h4>
                  7.除夜間工作辦理路線封鎖外，白天在軌道上工作之前仍應至值班站長室辦理填寫保安維修單。
                </h4>
              </v-col>
            </v-alert>
          </v-col>
        </v-row>
        <!-- 危害及預防項目 -->
        <v-col cols="6">
          <h3>可能發生危害及預防項目</h3>
          <v-alert
            dense
            border="top"
            colored-border
            color="border-bg-dark-yellow"
            elevation="4"
            class="mb-6 mt-2"
          >
            <v-col cols="12">
              <h4>(1)不安全環境及不安全動作預防</h4>
              <v-textarea
                auto-grow
                outlined
                v-model="inputData.editableData.Memo1"
                key="Memo1"
                rows="4"
              />

              <h4>(2)機具設備危害及預防</h4>
              <v-textarea
                auto-grow
                outlined
                v-model="inputData.editableData.Memo2"
                key="Memo2"
                rows="2"
              />

              <h4>(3)其他</h4>
              <v-textarea
                auto-grow
                outlined
                v-model="inputData.editableData.Memo3"
                key="Memo3"
                rows="1"
              />
            </v-col>
          </v-alert>
        </v-col>
        <!-- 自主檢查 -->
        <v-col cols="12" sm="6">
          <h3>自主檢查:即工作完成檢查</h3>
          <v-alert
            dense
            border="top"
            colored-border
            color="border-bg-dark-yellow"
            elevation="4"
            class="mb-6 mt-2"
          >
            <h4>工作項目</h4>
            <v-textarea
              auto-grow
              outlined
              v-model="inputData.editableData.Memo4"
              key="Memo4"
              rows="4"
            />
          </v-alert>
        </v-col>
        <!-- 工作人員 -->
        <v-col cols="12" sm="6">
          <h3>工作人員</h3>
          <v-alert
            dense
            border="top"
            colored-border
            color="border-bg-dark-yellow"
            elevation="4"
            class="mb-6 mt-2"
          >
            <v-textarea
              class="mt-4"
              auto-grow
              outlined
              v-model="inputData.editableData.Memo5"
              key="Memo5"
              rows="4"
            />
          </v-alert>
        </v-col>
        <!-- 備註 -->
        <v-col cols="12" sm="6">
          <h3>備註</h3>
          <v-alert
            dense
            border="top"
            colored-border
            color="border-bg-dark-yellow"
            elevation="4"
            class="mb-6 mt-2"
          >
            <v-textarea
              class="mt-4"
              auto-grow
              outlined
              v-model="inputData.editableData.Memo6"
              key="Memo6"
              rows="4"
            />
          </v-alert>
        </v-col>
        <!-- 送出 -->
        <!-- <v-col class="mt-2" cols="12">
          <v-btn large block class="mt-n8 mb-4" color="success" @click="save"
            >送出表單</v-btn
          >
        </v-col> -->
      </v-row>
      <v-card-actions class="px-5 pb-5">
        <v-btn
          v-if="editType != actions.add"
          elevation="4"
          class="mr-2 btn-delete white--text"
          @click="deleteRecord"
          >刪除</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn class="mr-2 btn-close white--text" elevation="4" @click="close">取消</v-btn>
        <v-btn
          class="btn-add white--text"
          elevation="4"
          :loading="commonSettings.isLoading"
          @click="save"
          >送出</v-btn
        >
      </v-card-actions>
      <!-- 刪除確認視窗 -->
      <v-dialog v-model="dialogDel" persistent max-width="290">
        <dialogDelete
          :id="userData.UserId"
          :DB_Table="DB_Table"
          :RPFlowNo="RPFlowNo"
          :key="'d' + DelDynamicKey"
          @close="close"
          @cancel="closeDialogDel"
        />
      </v-dialog>
    </v-container>
  </v-sheet>
</template>

<script>
import { mapState, mapActions } from "vuex";
import {
  getNowFullTime,
  getTodayDateString,
  encodeObject,
  decodeObject,
  isDateObject,
} from "@/assets/js/commonFun";
import {
  fetchFormOrderOne,
  createFormOrder0,
  updateFormOrder,
} from "@/apis/formManage/serve";
import dateSelect from "@/components/forManage/dateSelect";
import hazidRiskAssessmentQuestion from "@/components/forManage/hazidRiskAssessmentQuestion";
import { Actions } from "@/assets/js/actions";
import dialogDelete from "@/components/forManage/dialogDelete";
import { Constrant } from "@/assets/js/constrant";

export default {
  data() {
    return {
      title: "鐵路維護科工作日誌",
      newText: "工作日誌",
      actions: Actions,
      editType: "",
      dialogDel: false, // model off
      // ---- api
      DB_Table: "RP085",
      RPFlowNo: "",
      isLoading: false,
      disabled: false,
      menu: false, // 時間選單是否顯示
      DelDynamicKey: 0,
      commonSettings: {
        iconShow: true,
        isLoading: false,
        deptReadonly: true,
      },
      inputData: {
        RPFlowNo: "",
        DepartCode: "",
        DepartName: "",
        ID: "",
        Name: "",
        editableData: {
          CheckDay: "",
          Weather: "",
          JobName: "",
          Supervisor: "",
          Item: "",
          Location: "",
          TotalCount: "",
          CheckOption1: "",
          CheckOption2: "",
          CheckOption3: "",
          CheckOption4: "",
          CheckOption5: "",
          CheckOption6: "",
          CheckOption7: "",
          CheckOption8: "",
          CheckOption9: "",
          CheckOption10: "",
          CheckOption11: "",
          CheckOption12: "",
          CheckOption13: "",
          CheckOption14: "",
          CheckOption15: "",
          CheckOption16: "",
          CheckOption17: "",
          CheckOption18: "",
          CheckOption19: "",
          CheckOption20: "",
          CheckOption21: "",
          CheckOption22: "",
          CheckOption23: "",
          CheckOption24: "",
          CheckOption25: "",
          CheckOption26: "",
          CheckOption27: [],
          CheckOption28: "",
          CheckOption29: "",
          CheckOption30: "",
          CheckOption31: "",
          CheckOption32: "",
          CheckOption33: "",
          CheckOption34: "",
          CheckOption35: "",
          CheckOption36: [],
          CheckOption37: [],
          CheckOption38: "",
          CheckOption39: [],
          Memo1: "",
          Memo2: "",
          Memo3: "",
          Memo4: "",
          Memo5: "",
          Memo6: "",
        },
      },
      WeatherOptions: ["晴天", "陰天", "雨天"],
      UsedMachines: [
        { id: 1, name: "1：起道機" },
        { id: 2, name: "2：砸道機" },
        { id: 3, name: "3：電機" },
        { id: 4, name: "4：鋸軌機" },
        { id: 5, name: "5：鑽孔機" },
        { id: 6, name: "6：割草機" },
        { id: 7, name: "7：噴霧器" },
        { id: 8, name: "8：螺栓擰緊器" },
        { id: 9, name: "9：起釘撬棍" },
        { id: 10, name: "10：洋鎬" },
        { id: 11, name: "11：大槌" },
        { id: 12, name: "12：水平軌距尺" },
        { id: 13, name: "13：洋鏟" },
        { id: 14, name: "14：鏈鋸機" },
        { id: 15, name: "15：鐵車" },
        { id: 16, name: "16：平車" },
        { id: 17, name: "17：吊軌車" },
        { id: 18, name: "18：彎軌器" },
        { id: 19, name: "19：電動砂磨機" },
        { id: 20, name: "20：鈍孔機" },
      ],
      // 處理多選項目
      mulitSelectList: [
        "CheckOption27",
        "CheckOption36",
        "CheckOption37",
        "CheckOption39",
      ],
    };
  },
  components: {
    dateSelect,
    hazidRiskAssessmentQuestion,
    dialogDelete,
  },
  created() {
    if (this.$route.query.editType == 2) {
      this.editType = this.actions.edit;
      this.RPFlowNo = this.$route.query.RPFlowNo;
    } else {
      this.editType = this.actions.add;
    }
  },
  mounted() {
    this.editType == this.actions.edit
      ? this.viewPage(this.RPFlowNo)
      : this.newPage();
  },
  computed: {
    ...mapState("user", {
      userData: (state) => state.userData, // 使用者基本資料
    }),
  },
  methods: {
    ...mapActions("system", [
      "chMsgbar", // messageBar
      "chLoadingShow", // 切換 loading 圖顯示
    ]),
    save() {
      const that = this;
      let rtnObj = [];
      const keyArr = Object.keys(that.inputData.editableData);
      keyArr.forEach((e) => {
        if (that.mulitSelectList.includes(e)) {
          that.inputData.editableData[e] = that.inputData.editableData[e].join(
            "/"
          );
        }
        rtnObj.push({ Column: e, Value: that.inputData.editableData[e] });
      });

      encodeObject(rtnObj);
      if (this.editType == this.actions.add) {
        createFormOrder0({
          ClientReqTime: getNowFullTime(), // client 端請求時間
          OperatorID: this.userData.UserId, // 操作人id
          FunCode: "C",
          KeyName: this.DB_Table, // DB table
          KeyItem: rtnObj,
        })
          .then((res) => {
            if (res.data.ErrorCode == 0) {
              this.chMsgbar({ success: true, msg: Constrant.insert.success });
            } else {
              sessionStorage.errData = JSON.stringify({
                errCode: res.data.Msg,
                msg: res.data.Msg,
              });
              this.$router.push({ path: "/error" });
            }
          })
          .catch((err) => {
            ////console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.insert.failed });
          })
          .finally(() => {
            this.close();
          });
      } else {
        //就是edit
        updateFormOrder({
          ClientReqTime: getNowFullTime(), // client 端請求時間
          OperatorID: this.userData.UserId, // 操作人id
          RPFlowNo: this.RPFlowNo,
          FunCode: "U",
          KeyName: this.DB_Table, // DB table
          KeyItem: rtnObj,
        })
          .then((res) => {
            if (res.data.ErrorCode == 0) {
              this.chMsgbar({ success: true, msg: Constrant.update.success });
            } else {
              sessionStorage.errData = JSON.stringify({
                errCode: res.data.Msg,
                msg: res.data.Msg,
              });
              this.$router.push({ path: "/error" });
            }
          })
          .catch((err) => {
            ////console.log(err);
            this.chMsgbar({ success: false, msg: Constrant.update.failed });
          })
          .finally(() => {
            this.close();
          });
      }
    },
    close() {
      this.$router.push({ path: "/form-manage/curing/railway-worklog" });
    },
    newPage() {},
    viewPage(RPFlowNo) {
      this.chLoadingShow({show:true});
      fetchFormOrderOne({
        ClientReqTime: getNowFullTime(), // client 端請求時間
        OperatorID: this.userData.UserId, // 操作人id
        KeyName: this.DB_Table, // DB table
        KeyItem: [{ Column: "RPFlowNo", Value: RPFlowNo }],
        QyName: [
          "RPFlowNo",
          "CheckDay",
          "DepartName",
          "DepartCode",
          "ID",
          "Name",
          "Weather",
          "JobName",
          "Supervisor",
          "Item",
          "Location",
          "TotalCount",
          "CheckOption1",
          "CheckOption2",
          "CheckOption3",
          "CheckOption4",
          "CheckOption5",
          "CheckOption6",
          "CheckOption7",
          "CheckOption8",
          "CheckOption9",
          "CheckOption10",
          "CheckOption11",
          "CheckOption12",
          "CheckOption13",
          "CheckOption14",
          "CheckOption15",
          "CheckOption16",
          "CheckOption17",
          "CheckOption18",
          "CheckOption19",
          "CheckOption20",
          "CheckOption21",
          "CheckOption22",
          "CheckOption23",
          "CheckOption24",
          "CheckOption25",
          "CheckOption26",
          "CheckOption27",
          "CheckOption28",
          "CheckOption29",
          "CheckOption30",
          "CheckOption31",
          "CheckOption32",
          "CheckOption33",
          "CheckOption34",
          "CheckOption35",
          "CheckOption36",
          "CheckOption37",
          "CheckOption38",
          "CheckOption39",
          "Memo1",
          "Memo2",
          "Memo3",
          "Memo4",
          "Memo5",
          "Memo6",
        ],
      })
        .then((res) => {
          const that = this;
          let dat = JSON.parse(res.data.DT);
          let data = dat[0];
         
          data.CheckDay = data.CheckDay.substr(0, 10);
          this.inputData.RPFlowNo = RPFlowNo;
          this.inputData.DepartCode = data.DepartCode;
          this.inputData.Name = data.Name;
          this.inputData.DepartName = data.DepartName;
          data = decodeObject(data);
          const inputArr = Object.keys(this.inputData.editableData);
          inputArr.forEach((e) => {
            var tmp = data[e];
            // 處理日期項目
            if (isDateObject(tmp)) {
              that.inputData.editableData[e] = tmp.substr(0, 10);
            } else {
              that.inputData.editableData[e] = tmp;
            }
            //處理多選項目
            if (that.mulitSelectList.includes(e)) {
              that.inputData.editableData[e] = tmp.split("/");
            }
          });
        })
        .catch((err) => {
          ////console.log(err);
          this.chMsgbar({ success: false, msg: Constrant.query.failed });
        })
        .finally(() => {
          this.chLoadingShow({ show: false});
        });
    },
    deleteRecord() {
      this.dialogDel = true;
      this.DelDynamicKey += 1;
    },
    closeDialogDel() {
      //關閉刪除視窗
      this.dialogDel = false;
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
@media only screen and (max-width: 600px) {
  .xwd {
    max-width: 100%;
  }
}
</style>