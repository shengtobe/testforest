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
        <!-- <form51lib
          titlekm="123"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        /> -->
        <!-- 軌段檢查 -->
        <form51lib
          titlekm="1. 0km0-100m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
        />
        <form51lib
          titlekm="2. 0km520m"
          hide1="true"
          hide3="true"
          hide5="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="3. 0km550m"
          hide1="true"
          hide3="true"
          hide5="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="4. 0km600m"
          hide1="true"
          hide3="true"
          hide5="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="5. 0km700m"
          hide1="true"
          hide3="true"
          hide5="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="6. 0km800m"
          hide1="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="7. 0km900m"
          hide1="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="7-1庫. 車庫線"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
        />
        <form51lib
          titlekm="7-1. 1km190m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="7-2. 1km240m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="8. 1km440m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="9. 1km900m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="10. 2km110m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="11. 2km200m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="12. 2km520m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="13. 2km830m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="14. 3km310m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="15. 3km580m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="15-1. 4km500m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="16. 4km560m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="17. 4km900m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="17-1. 6km130m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="18. 6km240m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="18-1. 6km460m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="19. 6km740m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="19-1. 6km810m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="19-2. 6km830m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="20. 6km900m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="21. 7km250m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="22. 7km360m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="23. 7km520m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="24. 7km630m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="25. 7km830m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="26. 8km100m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="26-1. 8km500m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="27. 8km840m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        <form51lib
          titlekm="x. xkmxx0m"
          hide1="true"
          hide2="true"
          hide3="true"
          hide4="true"
          hide5="true"
          hide6="true"
          hide7="true"
          hide8="true"
        />
        

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
import form51lib from "@/components/Form51Lib.vue";

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
  components: { Pagination, form51lib }, // 頁碼
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