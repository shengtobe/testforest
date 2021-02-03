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
            <!-- <v-btn title="刪除" small dark fab color="red" @click="dialog3 = true">
              <v-icon dark>mdi-delete</v-icon>
            </v-btn>-->
          </template>

          <!-- 頁碼 -->
          <template v-slot:footer="footer">
            <Pagination :footer="footer" :pageOpt="pageOpt" @chPage="chPage" />
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <!-- 新增自動檢點表 modal -->
    <v-dialog v-model="Add" max-width="800px">
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
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">檢查日期</h3>
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
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">引擎號碼</h3>
                  <v-text-field solo value />
                </v-col>
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">檢查人員</h3>
                  <v-text-field solo value />
                </v-col>
              </v-row>
              <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                <v-col cols="12" sm="3">
                  <h3 class="mb-1">名稱</h3>
                </v-col>
                <v-col cols="12" sm="5">
                  <h3 class="mb-1">摘要</h3>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">備註</h3>
                </v-col>
              </v-row>
              <!-- -----------------型式----------------- -->
              <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6">
                <v-row no-gutter>
                  <v-col cols="12" sm="3">型式</v-col>
                  <v-col cols="12" sm="5">
                    <span class="d-sm-none error--text">摘要：</span>
                    <v-textarea auto-grow placeholder="AAA-00A" outlined rows="1"></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <span class="d-sm-none error--text">備註：</span>
                    <v-textarea placeholder="備註" auto-grow outlined rows="1" />
                  </v-col>
                </v-row>
              </v-alert>
              <!-- -----------------製造廠名----------------- -->
              <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6">
                <v-row no-gutter>
                  <v-col cols="12" sm="3">製造廠名</v-col>
                  <v-col cols="12" sm="5">
                    <span class="d-sm-none error--text">摘要：</span>
                    <v-textarea auto-grow outlined rows="1">
                      <!-- <span slot="append">CM</span> -->
                    </v-textarea>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <span class="d-sm-none error--text">備註：</span>
                    <v-textarea placeholder="備註" auto-grow outlined rows="1" />
                  </v-col>
                </v-row>
              </v-alert>
              <!-- -----------------製造日期----------------- -->
              <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6">
                <v-row no-gutter>
                  <v-col cols="12" sm="3">製造日期</v-col>
                  <v-col cols="12" sm="5">
                    <v-menu
                      v-model="ss2"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model.trim="zs2"
                          solo
                          v-on="on"
                          readonly
                          placeholder="點此選擇日期"
                        />
                      </template>
                      <v-date-picker
                        color="purple"
                        v-model="zs2"
                        @input="ass = false"
                        locale="zh-tw"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <span class="d-sm-none error--text">備註：</span>
                    <v-textarea placeholder="備註" auto-grow outlined rows="1" />
                  </v-col>
                </v-row>
              </v-alert>
              <!-- -----------------開始使用時間----------------- -->
              <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6">
                <v-row no-gutter>
                  <v-col cols="12" sm="3">開始使用時間</v-col>
                  <v-col cols="12" sm="5">
                    <v-menu
                      v-model="ss3"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model.trim="zs2"
                          solo
                          v-on="on"
                          readonly
                          placeholder="點此選擇時間"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        color="purple"
                        v-model="zs2"
                        @input="ass = false"
                        locale="zh-tw"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <span class="d-sm-none error--text">備註：</span>
                    <v-textarea placeholder="備註" auto-grow outlined rows="1" />
                  </v-col>
                </v-row>
              </v-alert>
              <!-- -----------------價格----------------- -->
              <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6">
                <v-row no-gutter>
                  <v-col cols="12" sm="3">價格</v-col>
                  <v-col cols="12" sm="5">
                    <span class="d-sm-none error--text">摘要：</span>
                    <v-textarea auto-grow outlined rows="1">
                      <!-- <span slot="append">height</span> -->
                    </v-textarea>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <span class="d-sm-none error--text">備註：</span>
                    <v-textarea placeholder="備註" auto-grow outlined rows="1" />
                  </v-col>
                </v-row>
              </v-alert>
              <!-- -----------------車身最大尺寸----------------- -->
              <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6">
                <v-row no-gutter>
                  <v-col cols="12" sm="3">車身最大尺寸</v-col>
                  <v-col cols="12" sm="5">
                    <span class="d-sm-none error--text">摘要：</span>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">長</span>
                        <span style="white-space:nowrap;" slot="append">n/m</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">寬</span>
                        <span style="white-space:nowrap;" slot="append">n/m</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">高</span>
                        <span style="white-space:nowrap;" slot="append">n/m</span>
                      </v-textarea>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <span class="d-sm-none error--text">備註：</span>
                    <v-textarea placeholder="備註" auto-grow outlined rows="1" />
                  </v-col>
                </v-row>
              </v-alert>
              <!-- -----------------燃料容量----------------- -->
              <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6">
                <v-row no-gutter>
                  <v-col cols="12" sm="3">燃料容量</v-col>
                  <v-col cols="12" sm="5">
                    <span class="d-sm-none error--text">摘要：</span>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="append">公升</span>
                      </v-textarea>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <span class="d-sm-none error--text">備註：</span>
                    <v-textarea placeholder="備註" auto-grow outlined rows="1" />
                  </v-col>
                </v-row>
              </v-alert>
              <!-- -----------------皮重----------------- -->
              <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6">
                <v-row no-gutter>
                  <v-col cols="12" sm="3">皮重</v-col>
                  <v-col cols="12" sm="5">
                    <span class="d-sm-none error--text">摘要：</span>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="append">公噸</span>
                      </v-textarea>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <span class="d-sm-none error--text">備註：</span>
                    <v-textarea placeholder="備註" auto-grow outlined rows="1" />
                  </v-col>
                </v-row>
              </v-alert>
              <!-- -----------------最大牽引重量或載重----------------- -->
              <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6">
                <v-row no-gutter>
                  <v-col cols="12" sm="3">最大牽引重量或載重</v-col>
                  <v-col cols="12" sm="5">
                    <span class="d-sm-none error--text">摘要：</span>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="append">公噸</span>
                      </v-textarea>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <span class="d-sm-none error--text">備註：</span>
                    <v-textarea placeholder="備註" auto-grow outlined rows="1" />
                  </v-col>
                </v-row>
              </v-alert>
              <!-- -----------------氣軔裝置----------------- -->
              <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6">
                <v-row no-gutter>
                  <v-col cols="12" sm="3">氣軔裝置</v-col>
                  <v-col cols="12" sm="5">
                    <span class="d-sm-none error--text">摘要：</span>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">型式</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">司軔閥</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">三通閥</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">調壓器</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">風泵</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">風泵排氣量</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">軔缸尺寸</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">分配閥</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">繼動閥</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">餵閥</span>
                      </v-textarea>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <span class="d-sm-none error--text">備註：</span>
                    <v-textarea placeholder="備註" auto-grow outlined rows="1" />
                  </v-col>
                </v-row>
              </v-alert>
              <!-- -----------------轉向架----------------- -->
              <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6">
                <v-row no-gutter>
                  <v-col cols="12" sm="3">轉向架</v-col>
                  <v-col cols="12" sm="5">
                    <span class="d-sm-none error--text">摘要：</span>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">型式</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">軸距</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">車輪直徑</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">軸頸直徑</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">開瓦中心距離</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">連結器中心制軌面高度</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">側承面致軌面高度</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">轉向架重量(一只)</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">彈簧撓度正常負荷</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">彈簧撓度最大負荷</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">機軔倍率</span>
                      </v-textarea>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <span class="d-sm-none error--text">備註：</span>
                    <v-textarea placeholder="備註" auto-grow outlined rows="1" />
                  </v-col>
                </v-row>
              </v-alert>
              <!-- -----------------最大容許速度----------------- -->
              <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6">
                <v-row no-gutter>
                  <v-col cols="12" sm="3">最大容許速度</v-col>
                  <v-col cols="12" sm="5">
                    <span class="d-sm-none error--text">摘要：</span>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">第一</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">第二</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">第三</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">第四</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">第五</span>
                      </v-textarea>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <span class="d-sm-none error--text">備註：</span>
                    <v-textarea placeholder="備註" auto-grow outlined rows="1" />
                  </v-col>
                </v-row>
              </v-alert>
              <!-- -----------------進氣增壓機----------------- -->
              <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6">
                <v-row no-gutter>
                  <v-col cols="12" sm="3">進氣增壓機</v-col>
                  <v-col cols="12" sm="5">
                    <span class="d-sm-none error--text">摘要：</span>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">型式</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">進氣方法</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">進氣量</span>
                        <span style="white-space:nowrap;" slot="append">公升/分</span>
                      </v-textarea>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <span class="d-sm-none error--text">備註：</span>
                    <v-textarea placeholder="備註" auto-grow outlined rows="1" />
                  </v-col>
                </v-row>
              </v-alert>
              <!-- -----------------電瓶----------------- -->
              <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6">
                <v-row no-gutter>
                  <v-col cols="12" sm="3">電瓶</v-col>
                  <v-col cols="12" sm="5">
                    <span class="d-sm-none error--text">摘要：</span>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">牌號</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">電壓</span>
                        <span style="white-space:nowrap;" slot="append">伏</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">容量</span>
                        <span style="white-space:nowrap;" slot="append">安/時</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">個數</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">尺寸及重量</span>
                      </v-textarea>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <span class="d-sm-none error--text">備註：</span>
                    <v-textarea placeholder="備註" auto-grow outlined rows="1" />
                  </v-col>
                </v-row>
              </v-alert>
              <!-- -----------------變速(逆轉)機----------------- -->
              <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6">
                <v-row no-gutter>
                  <v-col cols="12" sm="3">變速(逆轉)機</v-col>
                  <v-col cols="12" sm="5">
                    <span class="d-sm-none error--text">摘要：</span>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">型式</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">容油量</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">重量</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">最大迴轉力比</span>
                      </v-textarea>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <span class="d-sm-none error--text">備註：</span>
                    <v-textarea placeholder="備註" auto-grow outlined rows="1" />
                  </v-col>
                </v-row>
              </v-alert>
              <!-- -----------------冷卻器----------------- -->
              <v-alert dense border="top" colored-border color="teal" elevation="4" class="mb-6">
                <v-row no-gutter>
                  <v-col cols="12" sm="3">冷卻器</v-col>
                  <v-col cols="12" sm="5">
                    <span class="d-sm-none error--text">摘要：</span>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">型式</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">組數 x 條數</span>
                      </v-textarea>
                      <v-textarea auto-grow outlined rows="1">
                        <span style="white-space:nowrap;" slot="prepend">容水量</span>
                      </v-textarea>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <span class="d-sm-none error--text">備註：</span>
                    <v-textarea placeholder="備註" auto-grow outlined rows="1" />
                  </v-col>
                </v-row>
              </v-alert>
              
            </v-col>
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
import { mapState, mapActions } from 'vuex'
import { getNowFullTime } from '@/assets/js/commonFun'
import { maintainStatusOpts } from '@/assets/js/workList'
import { fetchFormOrderList, fetchFormOrderOne, createFormOrder, createFormOrder0 } from '@/apis/formManage/serve'
import { formDepartOptions } from '@/assets/js/departOption'

export default {
  data() {
    return {
      title: "規範及設備裝置",
      newText: "",
      isLoading: false,
      disabled: false,
      a: "",
      ass: "",
      ss2: "",
      z: "",
      zs: "",
      formDepartOptions: [
        // 通報單位下拉選單
        { text: "", value: "" },
        ...formDepartOptions,
      ],
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
      ipt: {
        department: "",
        date: new Date().toISOString().substr(0, 10),
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
        ],
      },
      items: [
        {
          question: "1. 工作場所",
          checkDetails:
            "1.工作場所環境（含四周溝渠）是否保持整潔？機械器具材料是否排列整齊及擦拭乾淨？廢棄物料(鐵、白鐵、銅、建材)是否有分區放置？現場地面油蹟是否按時清理？燈具照明有無燈管閃爍、不亮？通道是否堆置雜物影響通行順暢？逃生門、梯是否有標示及正常通暢？電氣安全使用是否良好？",
        },
        {
          question: "2. 辦公室",
          checkDetails:
            "2.辦公室環境是否保持整齊清潔？辦公桌除電腦、電話外其他物品是否收拾妥當？檔案資料是否分類、標示、歸定位及經管或使用之設備是否數量恰當，位置是否擺放整齊、有效率？燈具照明有無燈管閃爍、不亮？櫥櫃上方是否有放置易掉落物品？通道是否堆置雜物影響通行順暢？逃生門、梯是否有標示及正常通暢？電氣安全使用是否良好？",
        },
        {
          question: "3. 廁所",
          checkDetails:
            "3.廁所是否有定期打掃乾淨？廁內垃圾桶有無加蓋？廁所通風設備是否正常運作，有無異味？地面是否溼滑及擦拭乾淨？",
        },
        {
          question: "4. 廚房",
          checkDetails:
            "4.廚房是否有定期打掃乾淨？瓦斯不用開關是否予以旋緊？通風排氣是否良好？地面是否溼滑及擦拭乾淨？電氣安全使用是否良好？不用電器是否有拔掉電源？是否確實？保管品是否確實登入保管簿內？材料及物品是否有定期予以清潔打掃？",
        },
        {
          question: "5. 儲藏室及倉庫",
          checkDetails:
            "5.材料及物品是否有分類整理存放整齊？有財產編號之財產登記是否確實？保管品是否確實登入保管簿內？材料及物品是否有定期予以清潔打掃？",
        },
        {
          question: "6. 飲水機",
          checkDetails:
            "6.面板與檯面是否予以清潔？冷熱水出水是否正常？濾心是否定期予以更換？定期保養工作紀錄是否確實填寫？",
        },
        {
          question: "7. 逃生通道",
          checkDetails:
            "7.緊急出口指示燈照明裝置是否有亮？走道是否堆置雜物妨礙逃生通行？門鎖是否正常？",
        },
        {
          question: "8. 消防設施",
          checkDetails:
            "8.消防警示燈是否明亮？消防設施有無警訊出現？設備是否正常？滅火器有無短少或過期情形？滅火器是否有定期檢查及填寫檢查表？消防發電機是否有定期予以發動及保養？",
        },
        {
          question: "9. 綠美化",
          checkDetails:
            "9.場庫區四周環境綠美化工作是否良好？樹木及花草是否定期整理及修剪？",
        },
        {
          question: "10. 垃圾桶",
          checkDetails:
            "10.桶外面是否擦拭乾淨？桶內垃圾有無外溢散亂，有無蚊蟲滋生？垃圾是否有做分類處理？",
        },
      ],
      suggest: "", // 改善建議
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
      })},
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
