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
          v-model="a"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="z" solo v-on="on" readonly></v-text-field>
          </template>
          <v-date-picker color="purple" v-model="z" @input="a = false" locale="zh-tw"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-calendar-text</v-icon>檢查日期(迄)
        </h3>
        <v-menu
          v-model="q"
          :close-on-content-click="false"
          transition="scale-transition"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model.trim="df" solo v-on="on" readonly></v-text-field>
          </template>
          <v-date-picker color="purple" v-model="df" @input="q = false" locale="zh-tw"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <h3 class="mb-1">
          <v-icon class="mr-1 mb-1">mdi-ray-vertex</v-icon>管理單位
        </h3>
        <v-select
          :items="[{ text: '資訊科', value: 'A' }, { text: '資訊科2', value: 'B' }, { text: '資訊科3', value: 'C' }, { text: '資訊科4', value: 'D' }, { text: 'A0005', value: 'E' }]"
          solo
        />
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn color="green" dark large class="mb-sm-8 mb-md-8">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
      </v-col>

      
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn
          color="indigo"
          elevation="3"
          dark
          large
          class="ml-4 ml-sm-4 ml-md-4 mb-sm-8 mb-md-8"
          @click="Add = true"
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
    <!-- 新增自動檢點表 modal -->
    <v-dialog v-model="Add" max-width="860px">
      <v-card>
        <v-card-title class="blue white--text px-4 py-1">
          新增{{ title }}
          <v-spacer></v-spacer>
          <v-btn dark fab small text @click="close" class="mr-n2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <div class="px-6 py-4">
          <v-row>
            <!-- 檢查項目 -->
            <v-col cols="12">
              <v-row no-gutter class="indigo--text">
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">上次 級檢修完成日期</h3>
                  <v-menu
                    v-model="ass"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model.trim="zs" solo v-on="on" readonly></v-text-field>
                    </template>
                    <v-date-picker color="purple" v-model="zs" @input="ass = false" locale="zh-tw"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">本次 級檢修開始日期</h3>
                  <v-menu
                    v-model="abb"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model.trim="zs" solo v-on="on" readonly></v-text-field>
                    </template>
                    <v-date-picker color="purple" v-model="zs" @input="ass = false" locale="zh-tw"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">完成日期</h3>
                  <v-menu
                    v-model="abb2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field v-model.trim="zs" solo v-on="on" readonly></v-text-field>
                    </template>
                    <v-date-picker color="purple" v-model="zs" @input="ass = false" locale="zh-tw"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">檢修員</h3>
                  <v-text-field solo value  />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">車庫主管</h3>
                  <v-text-field solo value  />
                </v-col>
              </v-row>
              <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">行走裝置</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查結果</h3>
                      </v-col>
                       <v-col cols="12" sm="3">
                        <h3 class="mb-1">說明</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢修人員</h3>
                      </v-col>
                    </v-row>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in items1"
                      :key="idx"
                      class="mb-6 mt-4">
                      <v-row no-gutter>
                        <v-col cols="12" sm="3">{{ item.question }}</v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="success" label="經修復(需填說明→)" value="2"></v-radio>
                            <v-radio color="red" label="需進廠檢修" value="3"></v-radio>
                            <v-radio color="black" label="車輛無此項目" value="4"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <span class="d-sm-none error--text">說明</span>
                          <v-textarea auto-grow
                           outlined rows="1"/>
                            <!-- v-model.trim="ipt.item[idx].note"
                          /> -->
                        </v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">檢修人員</span>
                          <v-textarea auto-grow
                           outlined rows="1"/>
                            <!-- v-model.trim="ipt.item[idx].note"
                          /> -->
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">軔機裝置</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查結果</h3>
                      </v-col>
                       <v-col cols="12" sm="3">
                        <h3 class="mb-1">說明</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢修人員</h3>
                      </v-col>
                    </v-row>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in items2"
                      :key="idx"
                      class="mb-6 mt-4">
                      <v-row no-gutter>
                        <v-col cols="12" sm="3">{{ item.question }}</v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="success" label="經修復(需填說明→)" value="2"></v-radio>
                            <v-radio color="red" label="需進廠檢修" value="3"></v-radio>
                            <v-radio color="black" label="車輛無此項目" value="4"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <span class="d-sm-none error--text">說明</span>
                          <v-textarea auto-grow
                           outlined rows="1"/>
                            <!-- v-model.trim="ipt.item[idx].note"
                          /> -->
                        </v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">檢修人員</span>
                          <v-textarea auto-grow
                           outlined rows="1"/>
                            <!-- v-model.trim="ipt.item[idx].note"
                          /> -->
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">連結裝置</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查結果</h3>
                      </v-col>
                       <v-col cols="12" sm="3">
                        <h3 class="mb-1">說明</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢修人員</h3>
                      </v-col>
                    </v-row>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in items3"
                      :key="idx"
                      class="mb-6 mt-4">
                      <v-row no-gutter>
                        <v-col cols="12" sm="3">{{ item.question }}</v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="success" label="經修復(需填說明→)" value="2"></v-radio>
                            <v-radio color="red" label="需進廠檢修" value="3"></v-radio>
                            <v-radio color="black" label="車輛無此項目" value="4"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <span class="d-sm-none error--text">說明</span>
                          <v-textarea auto-grow
                           outlined rows="1"/>
                            <!-- v-model.trim="ipt.item[idx].note"
                          /> -->
                        </v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">檢修人員</span>
                          <v-textarea auto-grow
                           outlined rows="1"/>
                            <!-- v-model.trim="ipt.item[idx].note"
                          /> -->
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">電氣裝置</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查結果</h3>
                      </v-col>
                       <v-col cols="12" sm="3">
                        <h3 class="mb-1">說明</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢修人員</h3>
                      </v-col>
                    </v-row>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in items4"
                      :key="idx"
                      class="mb-6 mt-4">
                      <v-row no-gutter>
                        <v-col cols="12" sm="3">{{ item.question }}</v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="success" label="經修復(需填說明→)" value="2"></v-radio>
                            <v-radio color="red" label="需進廠檢修" value="3"></v-radio>
                            <v-radio color="black" label="車輛無此項目" value="4"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <span class="d-sm-none error--text">說明</span>
                          <v-textarea auto-grow
                           outlined rows="1"/>
                            <!-- v-model.trim="ipt.item[idx].note"
                          /> -->
                        </v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">檢修人員</span>
                          <v-textarea auto-grow
                           outlined rows="1"/>
                            <!-- v-model.trim="ipt.item[idx].note"
                          /> -->
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">空氣調節裝置</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查結果</h3>
                      </v-col>
                       <v-col cols="12" sm="3">
                        <h3 class="mb-1">說明</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢修人員</h3>
                      </v-col>
                    </v-row>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in items5"
                      :key="idx"
                      class="mb-6 mt-4">
                      <v-row no-gutter>
                        <v-col cols="12" sm="3">{{ item.question }}</v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="success" label="經修復(需填說明→)" value="2"></v-radio>
                            <v-radio color="red" label="需進廠檢修" value="3"></v-radio>
                            <v-radio color="black" label="車輛無此項目" value="4"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <span class="d-sm-none error--text">說明</span>
                          <v-textarea auto-grow
                           outlined rows="1"/>
                            <!-- v-model.trim="ipt.item[idx].note"
                          /> -->
                        </v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">檢修人員</span>
                          <v-textarea auto-grow
                           outlined rows="1"/>
                            <!-- v-model.trim="ipt.item[idx].note"
                          /> -->
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">車內各種設備</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查結果</h3>
                      </v-col>
                       <v-col cols="12" sm="3">
                        <h3 class="mb-1">說明</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢修人員</h3>
                      </v-col>
                    </v-row>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in items6"
                      :key="idx"
                      class="mb-6 mt-4">
                      <v-row no-gutter>
                        <v-col cols="12" sm="3">{{ item.question }}</v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="success" label="經修復(需填說明→)" value="2"></v-radio>
                            <v-radio color="red" label="需進廠檢修" value="3"></v-radio>
                            <v-radio color="black" label="車輛無此項目" value="4"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <span class="d-sm-none error--text">說明</span>
                          <v-textarea auto-grow
                           outlined rows="1"/>
                            <!-- v-model.trim="ipt.item[idx].note"
                          /> -->
                        </v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">檢修人員</span>
                          <v-textarea auto-grow
                           outlined rows="1"/>
                            <!-- v-model.trim="ipt.item[idx].note"
                          /> -->
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">車架及轉向架</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查結果</h3>
                      </v-col>
                       <v-col cols="12" sm="3">
                        <h3 class="mb-1">說明</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢修人員</h3>
                      </v-col>
                    </v-row>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in items7"
                      :key="idx"
                      class="mb-6 mt-4">
                      <v-row no-gutter>
                        <v-col cols="12" sm="3">{{ item.question }}</v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="success" label="經修復(需填說明→)" value="2"></v-radio>
                            <v-radio color="red" label="需進廠檢修" value="3"></v-radio>
                            <v-radio color="black" label="車輛無此項目" value="4"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <span class="d-sm-none error--text">說明</span>
                          <v-textarea auto-grow
                           outlined rows="1"/>
                            <!-- v-model.trim="ipt.item[idx].note"
                          /> -->
                        </v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">檢修人員</span>
                          <v-textarea auto-grow
                           outlined rows="1"/>
                            <!-- v-model.trim="ipt.item[idx].note"
                          /> -->
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">車身外觀</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                      <v-col cols="12" sm="3">
                        <h3 class="mb-1">檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <h3 class="mb-1">檢查結果</h3>
                      </v-col>
                       <v-col cols="12" sm="3">
                        <h3 class="mb-1">說明</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢修人員</h3>
                      </v-col>
                    </v-row>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in items8"
                      :key="idx"
                      class="mb-6 mt-4">
                      <v-row no-gutter>
                        <v-col cols="12" sm="3">{{ item.question }}</v-col>
                        <v-col cols="12" sm="4">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="success" label="經修復(需填說明→)" value="2"></v-radio>
                            <v-radio color="red" label="需進廠檢修" value="3"></v-radio>
                            <v-radio color="black" label="車輛無此項目" value="4"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="3">
                          <span class="d-sm-none error--text">說明</span>
                          <v-textarea auto-grow
                           outlined rows="1"/>
                            <!-- v-model.trim="ipt.item[idx].note"
                          /> -->
                        </v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">檢修人員</span>
                          <v-textarea auto-grow
                           outlined rows="1"/>
                            <!-- v-model.trim="ipt.item[idx].note"
                          /> -->
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
            <!-- 改善建議、改善追蹤 -->
            <!-- END 檢查項目 -->
          </v-row>
        </div>

        <v-card-actions class="px-5 pb-5">
          <v-spacer></v-spacer>
          <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
          <v-btn color="success" elevation="4" :loading="isLoading" @click="save">送出</v-btn>
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
      title:"客車一級檢修記錄表",
      newText:"記錄表",
      isLoading: false,
      disabled: false,
      a: "",
      ass: "",
      z: "",
      zs: "",
      q: "",
      df: "",
      s: "",
      qz: "",
      wx: "",
      pp: "",
      oo: "",
      ii: "",
      uu: "",
      yy: "",
      Add: false,
      dialog3: false,
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
      ipt: {
        // department: "",
        // date: new Date().toISOString().substr(0, 10),
        items: [
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
        ],
      },
      items1: [
        //行走裝置
        { question: "1. 輪、軸位置無鬆弛移位現象" },
        { question: "2. 輪、軸無裂痕" },
        { question: "3. 輪緣磨耗無超限(厚度大於24mm，月檢)" },
        { question: "4. 輪緣高度無超出輪踏面31mm(月檢)" },
        { question: "5. 輪緣缺損長度無超過27mm、寬度無超過9mm" },
        { question: "6. 踏面擦傷長度無超過40mm" },
        { question: "7. 軸承箱、軸承箱蓋無裂痕或破損" },
        { question: "8. 軸承箱螺栓無鬆弛或脫落" },
      ],
      items2: [
        //軔機裝置
        { question: "9. 拉桿、軔槓桿、挺桿、軔塊調整桿、軔樑、軔吊、軔吊托、圓梢、開口梢、襯套等無破損、變形、鬆弛或脫落" },
        { question: "10. 軔塊調整桿彎曲方向正確" },
        { question: "11. 軔塊厚度大於15mm" },
        { question: "12. 保持閥作用良好" },
        { question: "13. 各桿與車體其他部分無不當接觸" },
        { question: "14. 全緊軔時，EA閥軔缸行程在60至80mm範圍，K閥軔缸行程在100至130mm範圍" },
        { question: "15. 一組客車之軔管漏氣速率不超過每分鐘0.2kg/cm2" },
        { question: "16. 緊軔時，軔缸無漏氣" },
        { question: "17. 緊軔時，軔缸作用良好" },
        { question: "18. 軔機作用良好" },
        { question: "19. 氣軔軟管長度適當" },
        { question: "20. 軔管無破損、漏氣" },
        { question: "21. 車長閥作用正常" },
        { question: "22. 角旋塞作用正常" },
        { question: "23. 手軔機作用正常" },
        { question: "24. 氣軔貫通指示燈正常" },
        { question: "25. 壓力錶準確" },
      ],
      items3: [
        //連結裝置
        { question: "26. 連結器、軛無裂痕或變形" },
        { question: "27. 連結器緩衝彈簧緊度適當" },
        { question: "28. 連結器伸出車端長度正常" },
        { question: "29. 軛固定螺栓無脫落或防鬆鐵絲無斷掉" },
        { question: "30. 導架螺栓無鬆脫" },
        { question: "31. 導架滑動面潤滑正常" },
        { question: "32. 安全鏈及螺栓無鬆脫" },
        { question: "33. 連結銷長度適當。" },
        { question: "34. 八字環磨耗量小於8mm。" },
      ],
      items4: [
        //電氣裝置
        { question: "35. 蓄電池外箱無破損、洩漏" },
        { question: "36. 蓄電池導線或接頭良好" },
        { question: "37. 蓄電池電解液適當" },
        { question: "38. 電氣連接線絕緣物無破損" },
        { question: "39. 配電箱無破損" },
        { question: "40. 保險絲功能正常" },
        { question: "41. 電氣開關、插頭、插座、接頭等無破損、鬆弛或不良" },
        { question: "42. 燈泡、燈管無破損或不良" },
        { question: "43. 燈具、燈架無破損或不良" },
        { question: "44. 變壓器、充電器裝置無破損或機能不良" },
        { question: "45. 播音機、喇叭無破損或機能不良" },
        { question: "46. 個別車廂播音音量大小一致" },
        { question: "47. 雨刷機無破損或機能不良" },
        { question: "48. 車廂間電纜線長度適當" },
      ],
      items5: [
        //空氣調節裝置
        { question: "49. 電源電壓在額定電壓440伏特±10%以內" },
        { question: "50. 空調機配電盤內各機件之安裝螺絲無鬆弛" },
        { question: "51. 運轉指示燈顯示正確" },
        { question: "52. 空氣過濾網無髒污" },
        { question: "53. 溫度開關調整第1段設在25℃，第2段設在27℃，暖氣設在15℃位置" },
        { question: "54. 運轉中之冷媒低壓值在3～7kg/cm2，高壓值在13～22kg/cm2之範圍內" },
        { question: "55. 空調機運轉中聲音正常" },
        { question: "56. 出風口無破裂或作用不良" },
        { question: "57. 出風口風量適當" },
        { question: "58. 車廂內冷度適當" },
      ],
      items6: [
        //車內各種設備
        { question: "59. 廁所盥洗設備之鏡子、洗手台、馬桶、坐墊自動掀起裝置、扶手、垃圾桶、沖洗按鈕開關、衛生紙架、排風扇及其他附屬設備無破損或作用不良" },
        { question: "60. 儲水筒及供水管路無阻塞" },
        { question: "61. 馬桶水量充足、沖力強及沖水正常" },
        { question: "62. 馬桶沖洗時間正常" },
        { question: "63. 廁所控制氣壓管無漏氣" },
        { question: "64. 馬桶切斷閥正常" },
        { question: "65. 水龍頭關閉位置無漏水" },
        { question: "66. 座椅布無破損或汙穢" },
        { question: "67. 座椅迴轉或椅背復位操縱桿正常" },
        { question: "68. 座椅扶手、踏板等無缺損或不良" },
        { question: "69. 窗簾布無汙穢、破損" },
        { question: "70. 座號、茶杯架無破損" },
        { question: "71. 門窗、膠條、行李架、扶桿、頂板、璧板、地板等無汙穢、破損、銹蝕或不良" },
        { question: "72. 車內各式固定螺絲無缺損或突出" },
        { question: "73. 滅火器無過期、洩露或破損" },
        { question: "74. 車窗擊破鎚無缺損" },
      ],
      items7: [
        //車架及轉向架
        { question: "75. 車身車架各樑有無銹蝕破損" },
        { question: "76. 轉向框架、彎樑、導板、搖枕、角銷、懸吊系統、中心盤及其他轉向架機件無斷裂、變形、銹蝕、擦撞痕跡或作用不良" },
        { question: "77. 各式螺栓、襯套及銷無鬆脫或斷裂" },
        { question: "78. 排障器無缺損、斷裂、變形" },
        { question: "79. 旁承座間隙在3～6mm之間(每4個月量測一次)" },
        { question: "80. 旁承座潤滑正常" },
        { question: "81. 中心盤上、下盤無破裂" },
      ],
      items8: [
        //車身外觀
        { question: "82. 車身傾斜左右高低差不超過13mm(月檢)" },
        { question: "83. 車身文字、標記無脫落或不明顯" },
        { question: "84. 車身側面及車頂油漆無龜裂、剝落、褪色、髒污" },
        { question: "85. 車身鈑金無變形、龜裂、銹蝕" },
        { question: "86. 通路渡板及扶手無銹蝕、不良" },
      ],
      suggest: "", // 改善建議
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
    // 存
    save() {},
    // 關閉 dialog
    close() {
      this.Add = false;
      this.dialog3 = false;
      this.dialogShowEdit = false;
      this.dialogDel = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.addItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
  },
};
</script>
