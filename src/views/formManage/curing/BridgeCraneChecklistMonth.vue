<template>
  <v-container style="max-width: 1200px">
    <h2 class="mb-4 px-2">{{ title }}</h2>
    <!-- 第一排選項 -->
    <v-row class="px-2">
     <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="檢查日期(起)"
          key="dateStart"
          :showIcon="formData.settings.formIconShow"
          v-model="formData.searchItem.dateStart"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <dateSelect
          label="檢查日期(迄)"
          key="dateEnd"
          :showIcon="formData.settings.formIconShow"
          v-model="formData.searchItem.dateEnd"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <deptSelect
          label="管理單位"
          v-model="formData.searchItem.department"
          :showIcon="formData.settings.formIconShow"
          outType="key"
          key="department"
        />
      </v-col>
    </v-row>
    <v-row>
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
      </v-col>
    </v-row>
    <ToolBar @search="search" @reset="reset" @newOne="newOne" :text="newText" />
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
              <v-icon dark>mdi-pen</v-icon>
            </v-btn>
            <v-btn
              title="刪除"
              small
              dark
              fab
              color="red"
              @click="deleteRecord(item.RPFlowNo)"
            >
              <v-icon dark>mdi-delete</v-icon>
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
    <v-dialog v-model="editLog.dealogEdit" max-width="900px">
      <EditPage 
        @close="close"
        @search="search"
        @deleteRecord="deleteRecord"
        :key="'E'+editLog.EditDynamicKey"
        :item="editLog.editItem"
        :editType="editLog.editType"
        :DB_Table="DB_Table"
        :title="title"
      />
    </v-dialog>    
    <!-- 刪除確認視窗 -->
    <v-dialog v-model="delLog.dialogDel" persistent max-width="290">
      <dialogDelete
        :id="userData.UserId"
        :DB_Table="DB_Table"
        :RPFlowNo="delLog.RPFlowNo"
        :key="'D' + delLog.DelDynamicKey"
        @search="search"
        @close="closeDialogDel();close()"
        @cancel="closeDialogDel"
      />
    </v-dialog>

    <!-- 新增自動檢點表 modal -->
    <!-- <v-dialog v-model="Add" max-width="900px">
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
              <p>1.依職業安全衛生法第23條及職業安全衛生管理辦法第19條規定辦理。</p>
              <p>2.檢查結果請依狀態選擇正常、異常。</p>
              <p>3.缺點由使用單位自行改善，不克者委請設備商維護。</p>
              <p>4.本表於月底前完成檢查，經主管核章後，留存於管理單位之系統以保存備查。</p>
            </v-col>
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
                  <v-expansion-panel-header color="teal" class="white--text">過捲預防裝置</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查部位</h3>
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
                      v-for="(item, idx) in items1"
                      :key="idx"
                      class="mb-6 mt-4">
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
                  <v-expansion-panel-header color="teal" class="white--text">剎車器</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查部位</h3>
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
                      class="mb-6 mt-4">
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
                  <v-expansion-panel-header color="teal" class="white--text">警報裝置</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查部位</h3>
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
                      class="mb-6 mt-4">
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
                  <v-expansion-panel-header color="teal" class="white--text">鋼索及吊鍊</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查部位</h3>
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
                      v-for="(item, idx) in items4"
                      :key="idx"
                      class="mb-6 mt-4">
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
                  <v-expansion-panel-header color="teal" class="white--text">吊鉤</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查部位</h3>
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
                      v-for="(item, idx) in items5"
                      :key="idx"
                      class="mb-6 mt-4">
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
                  <v-expansion-panel-header color="teal" class="white--text">吊鉤</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查部位</h3>
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
                      v-for="(item, idx) in items5"
                      :key="idx"
                      class="mb-6 mt-4">
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
                  <v-expansion-panel-header color="teal" class="white--text">配線</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查部位</h3>
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
                      v-for="(item, idx) in items6"
                      :key="idx"
                      class="mb-6 mt-4">
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
                  <v-expansion-panel-header color="teal" class="white--text">集電裝置</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查部位</h3>
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
                      v-for="(item, idx) in items7"
                      :key="idx"
                      class="mb-6 mt-4">
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
                  <v-expansion-panel-header color="teal" class="white--text">配電盤</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查部位</h3>
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
                      v-for="(item, idx) in items8"
                      :key="idx"
                      class="mb-6 mt-4">
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
                  <v-expansion-panel-header color="teal" class="white--text">開關</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查部位</h3>
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
                      v-for="(item, idx) in items9"
                      :key="idx"
                      class="mb-6 mt-4">
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
                  <v-expansion-panel-header color="teal" class="white--text">控制器</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查部位</h3>
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
                      v-for="(item, idx) in items10"
                      :key="idx"
                      class="mb-6 mt-4">
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
                  <v-expansion-panel-header color="teal" class="white--text">鋼纜</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查部位</h3>
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
                      v-for="(item, idx) in items11"
                      :key="idx"
                      class="mb-6 mt-4">
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
                  <v-expansion-panel-header color="teal" class="white--text">捲揚機</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black"
                    >
                      <v-col cols="12" sm="2">
                        <h3 class="mb-1">檢查部位</h3>
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
                      v-for="(item, idx) in items12"
                      :key="idx"
                      class="mb-6 mt-4">
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
          </v-row>
        </div>
        <v-card-actions class="px-5 pb-5">
          <v-spacer></v-spacer>
          <v-btn class="mr-2" elevation="4" @click="close">取消</v-btn>
          <v-btn color="success" elevation="4" :loading="isLoading" @click="save">送出</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </v-container>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import { mapState, mapActions } from 'vuex'
import { getNowFullTime, getTodayDateString, unique, decodeObject} from "@/assets/js/commonFun";
import { maintainStatusOpts } from '@/assets/js/workList'
import { fetchFormOrderList, fetchFormOrderOne, createFormOrder, createFormOrder0 } from '@/apis/formManage/serve'
import { formDepartOptions } from '@/assets/js/departOption'
import dateSelect from "@/components/forManage/dateSelect";
import deptSelect from "@/components/forManage/deptSelect";
import dialogDelete from "@/components/forManage/dialogDelete";
import ToolBar from "@/components/forManage/toolbar";
import { Actions } from "@/assets/js/actions";
import EditPage from '@/views/formManage/curing/BridgeCraneChecklistMonthEdit'

export default {
  data() {
    return {
      title:"固定式起重機定期檢查表(月)",
      newText:"檢查表",
      pageOpt: { page: 1 }, // 目前頁數
      //---api---
      DB_Table: "RP076",
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
      //------formData 搜尋欄-----
      formData: {
        settings: {
          formIconShow: true,
        },
        searchItem: {
          dateStart: "",
          dateEnd: "",
          department: "",
        },
        default: {
          dateStart: "",
          dateEnd: "",
          department: "",
        }
      },
      //--------------------------
      //---------delLog-----------
      delLog: {
        RPFlowNo: "",
        DelDynamicKey: 0,
        dialogDel: false
      },
      //---------------------------
      //-------------editLog-------
      editLog: {
        editItem: {},
        dealogEdit: false,
        EditDynamicKey: 0,
        editType: ""
      },
      //---------------------------
    };
  },
  components: {
    Pagination, // 頁碼
    dateSelect,
    deptSelect,
    ToolBar,
    dialogDelete,
    EditPage,
  },
  computed: {
    ...mapState ('user', {
        userData: state => state.userData,  // 使用者基本資料
    }),
  },
  mounted() {
    this.formData.searchItem.dateStart = this.formData.searchItem.dateEnd = this.formData.default.dateStart = this.formData.default.dateEnd = getTodayDateString();
  },
  methods: {
    ...mapActions('system', [
      "chMsgbar", // messageBar
      'chLoadingShow',  // 切換 loading 圖顯示
    ]),
    reset(){
      this.formData.searchItem = {...this.formData.default}
    },
    newOne(){
      this.editLog.dealogEdit = true
      this.editLog.editType = Actions.add;
      this.editLog.EditDynamicKey += 1
    },
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
          {'Column':'StartDayVlaue','Value':this.formData.searchItem.dateStart},
          {"Column":"EndDayVlaue","Value":this.formData.searchItem.dateEnd},
          {"Column":"DepartCode","Value":this.formData.searchItem.department},
                ],
        QyName:[
          "RPFlowNo",
          "ID",
          "Name",
          "CheckDay",
          "CheckStatus",
          "FlowId", "DepartName"
        ],
      }).then(res => {
        this.tableItems = decodeObject(unique(JSON.parse(res.data.DT)))
      }).catch(err => {
        console.log(err)
        this.chMsgbar({ success: false, msg: Constrant.query.failed });
      }).finally(() => {
        console.log("search final")
        this.chLoadingShow()
      })
    },
    // 關閉 dialog
    close() {
      this.editLog.dealogEdit = false
    },
    viewPage(item) {
      console.log("RPFlowNo: " + item.RPFlowNo);
      this.editLog.EditDynamicKey += 1;
      this.editLog.editType = Actions.edit;
      this.editLog.editItem = item;
      this.editLog.dealogEdit = true;
    },
    closeDialogDel() {
      this.delLog.dialogDel = false
    },
    deleteRecord(RPFlowNo) {
      this.delLog.dialogDel = true;
      this.delLog.DelDynamicKey += 1;
      this.delLog.RPFlowNo = RPFlowNo;
    },
  },
};
</script>
