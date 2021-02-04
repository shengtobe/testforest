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
          :items="formDepartOptions" v-model="ipt2.depart"
          solo
        />
      </v-col>
      <v-col cols="12" sm="3" md="3" class="d-flex align-end">
        <v-btn color="green" dark large class="mb-sm-8 mb-md-8">
          <v-icon class="mr-1">mdi-magnify</v-icon>查詢
        </v-btn>
      </v-col>

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
    <!-- 新增自動檢點表 modal -->
    <v-dialog v-model="Add" max-width="900px">
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
            <v-col cols="12">
              <p>1.依職業安全衛生法第23條及職業安全衛生管理辦法第19條規定辦理</p>
              <p>2.檢查結果應詳實紀錄。檢查結果請依狀態選擇正常、異常。</p>
              <p>3.缺點由使用單位自行改善，不克者委請設備商維護。</p>
              <p>4.本表於12月年底前完成檢查，經主管核章後，留存於管理單位之系統以保存備查。</p>
            </v-col>
            <!-- 檢查部分 -->
            <v-col cols="12">
              <v-row no-gutter class="indigo--text">
                <v-col cols="12" sm="4">
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
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">管理單位</h3>
                  <v-text-field solo value  />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">檢查人員</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">噸數</h3>
                  <v-text-field solo>
                      <span slot="append">噸</span>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">工作場所</h3>
                  <v-text-field solo />
                </v-col>
                <v-col cols="12" sm="4">
                  <h3 class="mb-1">編號</h3>
                  <v-text-field solo />
                </v-col>
              </v-row>
              <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">電氣部分</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <!-- ---------------------吊重電動機--------------------- -->
                      <v-col cols="13" sm="12">
                        <v-toolbar color="teal lighten-2" dark>
                        <v-spacer/>
                        <v-toolbar-title>吊重電動機</v-toolbar-title>
                        <v-spacer/>
                      </v-toolbar>
                    </v-col>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查內容</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查方法</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">判斷基準</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查結果</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">改善措施</h3>
                      </v-col>
                    </v-row>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in items1_1"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="2">{{ item.question }}</v-col>
                        <v-col cols="12" sm="2">{{ item.checkContent }}</v-col>
                        <v-col cols="12" sm="2">{{ item.checkMethod }}</v-col>
                        <v-col cols="12" sm="2">{{ item.measure }}</v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="red" label="異常" value="2"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">改善措施：</span>
                          <v-textarea auto-grow
                           outlined rows="2"/>
                        </v-col>
                      </v-row>
                      
                    </v-alert>
                    <!-- ---------------------走行電動機--------------------- -->
                    <v-col cols="13" sm="12">
                        <v-toolbar color="teal lighten-2" dark>
                        <v-spacer/>
                        <v-toolbar-title>吊重電動機</v-toolbar-title>
                        <v-spacer/>
                      </v-toolbar>
                    </v-col>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查內容</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查方法</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">判斷基準</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查結果</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">改善措施</h3>
                      </v-col>
                    </v-row>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in items1_2"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="2">{{ item.question }}</v-col>
                        <v-col cols="12" sm="2">{{ item.checkContent }}</v-col>
                        <v-col cols="12" sm="2">{{ item.checkMethod }}</v-col>
                        <v-col cols="12" sm="2">{{ item.measure }}</v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group dense row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0">
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="red" label="異常" value="2"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">改善措施：</span>
                          <v-textarea auto-grow
                           outlined rows="2"/>
                        </v-col>
                      </v-row>
                    </v-alert>
                    <!-- ---------------------旋轉或橫行電動機--------------------- -->
                    <v-col cols="13" sm="12">
                        <v-toolbar color="teal lighten-2" dark>
                        <v-spacer/>
                        <v-toolbar-title>吊重電動機</v-toolbar-title>
                        <v-spacer/>
                      </v-toolbar>
                    </v-col>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查內容</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查方法</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">判斷基準</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查結果</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">改善措施</h3>
                      </v-col>
                    </v-row>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in items1_3"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="2">{{ item.question }}</v-col>
                        <v-col cols="12" sm="2">{{ item.checkContent }}</v-col>
                        <v-col cols="12" sm="2">{{ item.checkMethod }}</v-col>
                        <v-col cols="12" sm="2">{{ item.measure }}</v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group dense row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0">
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="red" label="異常" value="2"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">改善措施：</span>
                          <v-textarea auto-grow
                           outlined rows="2"/>
                        </v-col>
                      </v-row>
                      
                    </v-alert>
                    <!-- ---------------------吊桿升降機或其他用途電動機--------------------- -->
                    <v-col cols="13" sm="12">
                        <v-toolbar color="teal lighten-2" dark>
                        <v-spacer/>
                        <v-toolbar-title>吊桿升降機或其他用途電動機</v-toolbar-title>
                        <v-spacer/>
                      </v-toolbar>
                    </v-col>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查內容</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查方法</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">判斷基準</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查結果</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">改善措施</h3>
                      </v-col>
                    </v-row>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in items1_4"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="2">{{ item.question }}</v-col>
                        <v-col cols="12" sm="2">{{ item.checkContent }}</v-col>
                        <v-col cols="12" sm="2">{{ item.checkMethod }}</v-col>
                        <v-col cols="12" sm="2">{{ item.measure }}</v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group dense row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0">
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="red" label="異常" value="2"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">改善措施：</span>
                          <v-textarea auto-grow
                           outlined rows="2"/>
                        </v-col>
                      </v-row>
                    </v-alert>
                    <!-- ---------------------其他電氣部分--------------------- -->
                    <v-col cols="13" sm="12">
                        <v-toolbar color="teal lighten-2" dark>
                        <v-spacer/>
                        <v-toolbar-title>其他電氣部分</v-toolbar-title>
                        <v-spacer/>
                      </v-toolbar>
                    </v-col>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查內容</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查方法</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">判斷基準</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查結果</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">改善措施</h3>
                      </v-col>
                    </v-row>
                    <v-alert
                      dense
                      border="top"
                      colored-border
                      color="teal"
                      elevation="4"
                      v-for="(item, idx) in items1_5"
                      :key="idx"
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="2">{{ item.question }}</v-col>
                        <v-col cols="12" sm="2">{{ item.checkContent }}</v-col>
                        <v-col cols="12" sm="2">{{ item.checkMethod }}</v-col>
                        <v-col cols="12" sm="2">{{ item.measure }}</v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group dense row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0">
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="red" label="異常" value="2"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">改善措施：</span>
                          <v-textarea auto-grow
                           outlined rows="2"/>
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">機械部分</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查內容</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查方法</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">判斷基準</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查結果</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">改善措施</h3>
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
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="2">{{ item.question }}</v-col>
                        <v-col cols="12" sm="2">{{ item.checkContent }}</v-col>
                        <v-col cols="12" sm="2">{{ item.checkMethod }}</v-col>
                        <v-col cols="12" sm="2">{{ item.measure }}</v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="red" label="異常" value="2"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">改善措施：</span>
                          <v-textarea auto-grow
                           outlined rows="2"/>
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header color="teal" class="white--text">安全設備</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row
                      no-gutter
                      class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查項目</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查內容</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查方法</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">判斷基準</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查結果</h3>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">改善措施</h3>
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
                      class="mb-6 mt-4"
                    >
                      <v-row no-gutter>
                        <v-col cols="12" sm="2">{{ item.question }}</v-col>
                        <v-col cols="12" sm="2">{{ item.checkContent }}</v-col>
                        <v-col cols="12" sm="2">{{ item.checkMethod }}</v-col>
                        <v-col cols="12" sm="2">{{ item.measure }}</v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">檢查結果：</span>
                          <v-radio-group
                            dense
                            row
                            v-model="ipt.items[idx].status"
                            class="pa-0 ma-0"
                          >
                            <v-radio color="success" label="正常" value="1"></v-radio>
                            <v-radio color="red" label="異常" value="2"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="2">
                          <span class="d-sm-none error--text">改善措施：</span>
                          <v-textarea auto-grow
                           outlined rows="2"/>
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
            <!-- 改善建議、改善追蹤 -->
            
            <!-- END 檢查部分 -->
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
import { getNowFullTime, getTodayDateString, unique} from "@/assets/js/commonFun";
import { maintainStatusOpts } from '@/assets/js/workList'
import { fetchFormOrderList, fetchFormOrderOne, createFormOrder, createFormOrder0 } from '@/apis/formManage/serve'
import { formDepartOptions } from '@/assets/js/departOption'

export default {
  data() {
    return {
      title:"固定式起重機定期檢查表(年)",
      newText:"檢查表",
      isLoading: false,
      disabled: false,
      a: "",
      ass: "",
      z: "",
      formDepartOptions: [
        // 通報單位下拉選單
        { text: "不限", value: "" },
        ...formDepartOptions,
      ],
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
        { text: "項次", value: "ItemNo", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "保養日期", value: "CheckDay", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "審查狀態", value: "CheckStatus", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "填寫人", value: "Name", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "保養單位", value: "DepartName", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
        { text: "功能", value: "content", align: "center", divider: true, class: "subtitle-1 white--text font-weight-bold light-blue darken-1" },
      ],
      tableItems: [],
      //------
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
          { status: "0", note: "" },
          { status: "0", note: "" },
          { status: "0", note: "" },
        ],
      },
      items1_1: [
        //吊重電動機
        { question:"吊重電動機", checkContent: "1.溫度",checkMethod: "用手擦拭是否燙手",measure: "正常溫度（不燙手；周圍溫度+200C）" },
        { question:"吊重電動機", checkContent: "2.聲音",checkMethod: "不正常作鳴鳴之聲",measure: "正常聲音" },
        { question:"吊重電動機", checkContent: "3.接觸不良",checkMethod: "端點螺絲是否鬆弛",measure: "充分旋緊" },
      ],
      items1_2: [
        //走行電動機 1_2
        { question:"走行電動機", checkContent: "1.溫度",checkMethod: "用手擦拭是否燙手",measure: "正常溫度（不燙手；周圍溫度+200C）" },
        { question:"走行電動機", checkContent: "2.聲音",checkMethod: "不正常作鳴鳴之聲",measure: "正常聲音" },
        { question:"走行電動機", checkContent: "3.損傷",checkMethod: "端點螺絲是否鬆弛",measure: "充分旋緊" },
      ],
      items1_3: [
        //旋轉或橫行電動機 1_3
        { question:"旋轉或橫行電動機", checkContent: "1.溫度",checkMethod: "用手擦拭是否燙手",measure: "正常溫度（不燙手；周圍溫度+200C）" },
        { question:"旋轉或橫行電動機", checkContent: "2.聲音",checkMethod: "不正常作鳴鳴之聲",measure: "正常聲音" },
        { question:"旋轉或橫行電動機", checkContent: "3.損傷",checkMethod: "端點螺絲是否鬆弛",measure: "充分旋緊" },
      ],
      items1_4: [
        //吊桿升降機或其他用途電動機 1_4
        { question:"吊桿升降機或其他用途電動機", checkContent: "1.溫度",checkMethod: "用手擦拭是否燙手",measure: "正常溫度（不燙手；周圍溫度+200C）" },
        { question:"吊桿升降機或其他用途電動機", checkContent: "2.聲音",checkMethod: "不正常作鳴鳴之聲",measure: "正常聲音" },
        { question:"吊桿升降機或其他用途電動機", checkContent: "3.損傷",checkMethod: "端點螺絲是否鬆弛",measure: "充分旋緊" },
      ],
      items1_5: [
        //其他電氣部分
        { question:"電阻器", checkContent: "接觸不良",checkMethod: "端點螺絲是否鬆弛",measure: "充分旋緊" },
        { question:"電阻器（走行）", checkContent: "接觸不良",checkMethod: "端點螺絲是否鬆弛",measure: "充分旋緊" },
        { question:"電阻器（旋轉或橫行）", checkContent: "接觸不良",checkMethod: "端點螺絲是否鬆弛",measure: "充分旋緊" },
        { question:"直、間接控制器(吊重)", checkContent: "動作",checkMethod: "反覆操作查看其動作狀況及電譯情形",measure: "動作確實" },
        { question:"直、間接控制器(行走)", checkContent: "動作",checkMethod: "反覆操作查看其動作狀況及電譯情形",measure: "動作確實" },
        { question:"直、間接控制器（旋轉或橫行）", checkContent: "動作",checkMethod: "反覆操作查看其動作狀況及電譯情形",measure: "動作確實" },
        { question:"電磁升降剎車", checkContent: "動作",checkMethod: "反覆操作上升查看其動作狀況停止位置",measure: "動作確實" },
        { question:"電磁行走剎車", checkContent: "動作",checkMethod: "反覆操作查看其動作狀況停止位置",measure: "動作確實" },
        { question:"渦電流及其控制剎車", checkContent: "動作",checkMethod: "使用特下降查看其降落速度是否適當",measure: "動作適當" },
        { question:"吊物升降極限開關", checkContent: "動作及位置",checkMethod: "動作是否確實；螺旋有無鬆弛",measure: "動作確實" },
        { question:"行走極限開關", checkContent: "動作",checkMethod: "動作是否確實；螺旋有無鬆弛",measure: "動作確實" },
        { question:"集電裝置", checkContent: "接觸不良",checkMethod: "螺絲是否鬆弛",measure: "充分旋緊" },
        { question:"集電裝置", checkContent: "輪屐磨耗",checkMethod: "查看接觸部分是否磨耗",measure: "充分旋緊" },
        { question:"旋轉集電滑環", checkContent: "接觸不良",checkMethod: "接觸壓力是否過當",measure: "調整接解壓" },
        { question:"旋轉集電滑環", checkContent: "磨耗",checkMethod: "接觸部分是否磨損",measure: "調整接解壓" },
        { question:"配線", checkContent: "被覆",checkMethod: "被覆是否剝損劣化",measure: "良好" },
        { question:"配線", checkContent: "接續",checkMethod: "端點螺栓是否鬆弛",measure: "充分旋緊" },
        { question:"無熔絲斷路器", checkContent: "動作",checkMethod: "使規定電流通過是否跳脫",measure: "超過規定電流通過應跳脫" },
        { question:"保險絲", checkContent: "容量",checkMethod: "保險絲是否符合規定",measure: "規定內" },
        { question:"電磁接觸", checkContent: "接觸不良",checkMethod: "螺絲是否鬆弛是否接觸不良",measure: "接觸緊故動作確實" },
      ],
      items2: [
        //機械部分
        { question:"主捲揚盤", checkContent: "損傷",checkMethod: "檢視有無損傷",measure: "良好無損 " },
        { question:"副捲揚盤", checkContent: "損傷",checkMethod: "檢視有無損傷",measure:  "良好無損 " },
        { question:"鋼索吊鍊及附件", checkContent: "損傷",checkMethod: "檢視有無損傷斷裂及附件是否完好",measure:  "良好無損 " },
        { question:"吊鉤", checkContent: "安全栓",checkMethod: "有無安全栓是否良好",measure:  "安全栓良好 " },
        { question:"索輪", checkContent: "索槽磨損",checkMethod: "檢視索槽磨損情形",measure:  "磨損1/4a以下 " },
        { question:"鋼索絞盤末端夾", checkContent: "是否鬆弛",checkMethod: "目測",measure:  "堅固無損 " },
        { question:"油脂潤滑情形", checkContent: "潤滑是否已乾",checkMethod: "拆卸目測",measure:  "潤滑油充足 " },
        { question:"鋼架", checkContent: "損傷銹蝕",checkMethod: "有無損傷銹蝕",measure:  "良好無損 " },
        { question:"機身旋轉情形", checkContent: "動作",checkMethod: "旋轉平穩",measure:  "良好無損 " },
        { question:"軌道", checkContent: "損傷斷裂",checkMethod: "有無損傷斷裂",measure:  "良好無損 " },
        { question:"阻擋器", checkContent: "牢固否位置適當否",checkMethod: "目測",measure:  "牢固適當 " },
      ],
      items3: [
        //安全設備
        { question:"電纜溝蓋", checkContent: "有無損傷銹蝕",checkMethod: "有無損傷銹蝕、斷裂",measure: "良好無損 " },
        { question:"行走警鈴", checkContent: "響亮",checkMethod: "行走時響亮",measure: "良好無損 " },
        { question:"喇叭", checkContent: "響亮",checkMethod: "按動時鳴叫",measure: "良好無損 " },
        { question:"照明燈", checkContent: "明亮",checkMethod: "燈泡是否損壞線路是否連通",measure: "控制靈敏 " },
        { question:"夜間警示燈", checkContent: "明亮",checkMethod: "燈泡是否損壞線路是否連通",measure: "控制靈敏 " },
        { question:"禁止攀登標示牌", checkContent: "醒目否",checkMethod: "是否在適當處懸掛",measure: "良好適當 " },
        { question:"安全標示", checkContent: "醒目否",checkMethod: "是否在適當部位裝置",measure: "良好適當 " },
        { question:"地板", checkContent: "損壞油垢",checkMethod: "是否附著油污或損壞",measure: "堅固清潔 " },
        { question:"消防設備", checkContent: "有效否",checkMethod: "是否過期失效、適當、充足",measure: "堅固清潔 " },
        { question:"堅固設備", checkContent: "損壞",checkMethod: "零件、鋼索、齊全損壞否",measure: "齊全良好 " },
        { question:"荷重試驗", checkContent: "荷重容量",checkMethod: "是否符合荷重容量",measure: "符合荷重 " },
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
      this.z = this.df = this.nowTime
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
          "FlowId", "DepartName"
        ],
      }).then(res => {
        let tbBuffer = JSON.parse(res.data.DT)
        let aa = unique(tbBuffer)
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
