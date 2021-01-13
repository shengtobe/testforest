<template>
  <v-sheet class="ma-4 mb-8" color="yellow lighten-2">
    <v-container style="max-width: 1200px" class="px-8">
      <p class="font-weight-black title text-center">新增{{ newText }}</p>
      <v-row class="white px-4">
        <!-- 上面的欄位 -->
        <v-col cols="12" sm="4">
          <h3 class="mb-1">評估日期</h3>
          <v-menu
            :close-on-content-click="false"
            transition="scale-transition"
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field v-model.trim="zs" solo v-on="on" readonly></v-text-field>
            </template>
            <v-date-picker color="purple" v-model="zs"  locale="zh-tw"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="4">
          <h3 class="mb-1">單位/部門</h3>
          <v-text-field solo value />
        </v-col>
        <v-col cols="12" sm="4">
          <h3 class="mb-1">受評估之場所</h3>
          <v-text-field solo />
        </v-col>
        <v-col cols="12" sm="4">
          <h3 class="mb-1">場所內工作型態及人數</h3>
          <v-text-field solo type="number" />
        </v-col>
        <v-col cols="12" sm="4">
          <h3 class="mb-1">評估人員</h3>
          <v-text-field solo />
        </v-col>
        <v-col cols="12" sm="4">
          <h3 class="mb-1">審核者</h3>
          <v-text-field solo />
        </v-col>
        <hr />
        <!-- 檢查項目 -->
        <v-col cols="13" sm="12">
          <v-toolbar color="teal lighten-2" dark>
            <v-spacer />
            <v-toolbar-title>外部不法侵害</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
        </v-col>
        <!-- 111 -->
        <v-col cols="12" sm="9">
          <p class="font-weight-black title text-left font-size-50">
            是否有組織外之人員(承包商、客戶、服務對象或親友等)因其行為無法預知，
            <br />可能成為該區工作者之不法侵害來源？
          </p>
        </v-col>
        <v-col cols="12" sm="2">
          <v-radio-group dense row class="pa-0 ma-0">
            <v-radio color="success" label="是" value="1"/>
            <v-radio color="success" label="否" value="2"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">潛在不法侵害風險類型</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
              </template>
              <span>(發生機率)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
              </template>
              <span>(傷害程度)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">風險等級</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
              </template>
              <span>(工程控制/管理控制/個人防護)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">應增加或修正相關措施</h3>
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
          class="mb-6 mt-4"
        >
          <v-row no-gutter>
            <!-- <v-col cols="12" sm="3">{{ item.question }}</v-col> -->
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">潛在不法侵害風險類型：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items1[idx].status">
                <v-radio color="red" label="肢體暴力" value="1"/>
                <v-radio color="red" label="心理暴力" value="2"/>
                <v-radio color="red" label="語言暴力" value="3"/>
                <v-radio color="red" label="性騷擾" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">可能性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items1[idx].status2">
                <v-radio color="red" label="可能發生" value="3"/>
                <v-radio color="orange" label="不大可能" value="2"/>
                <v-radio color="success" label="極不可能" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">嚴重性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items1[idx].status3">
                <v-radio color="red" label="嚴重" value="3"/>
                <v-radio color="orange" label="中度" value="2"/>
                <v-radio color="success" label="輕度" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">風險等級：</span>
              <v-text-field v-model="setLevel" solo readonly></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">現有控制措施：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items1[idx].status4">
                <v-radio color="success" label="工程控制" value="1"/>
                <v-radio color="success" label="管理控制" value="2"/>
                <v-radio color="success" label="個人防護" value="3"/>
                <v-radio color="success" label="其他" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">應增加或修正相關措施：</span>
              <v-textarea auto-grow outlined rows="2" />
            </v-col>
          </v-row>
        </v-alert>
        <!-- 222 -->
        <v-col cols="12" sm="9">
          <p class="font-weight-black title text-left font-size-50">
            是否有已知工作會接觸有暴力史之客戶
          </p>
        </v-col>
        <v-col cols="12" sm="2">
          <v-radio-group dense row class="pa-0 ma-0">
            <v-radio color="success" label="是" value="1"/>
            <v-radio color="success" label="否" value="2"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">潛在不法侵害風險類型</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
              </template>
              <span>(發生機率)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
              </template>
              <span>(傷害程度)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">風險等級</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
              </template>
              <span>(工程控制/管理控制/個人防護)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">應增加或修正相關措施</h3>
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
          class="mb-6 mt-4"
        >
          <v-row no-gutter>
            <!-- <v-col cols="12" sm="3">{{ item.question }}</v-col> -->
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">潛在不法侵害風險類型：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items2[idx].status">
                <v-radio color="red" label="肢體暴力" value="1"/>
                <v-radio color="red" label="心理暴力" value="2"/>
                <v-radio color="red" label="語言暴力" value="3"/>
                <v-radio color="red" label="性騷擾" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">可能性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items2[idx].status2">
                <v-radio color="red" label="可能發生" value="3"/>
                <v-radio color="orange" label="不大可能" value="2"/>
                <v-radio color="success" label="極不可能" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">嚴重性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items2[idx].status3">
                <v-radio color="red" label="嚴重" value="3"/>
                <v-radio color="orange" label="中度" value="2"/>
                <v-radio color="success" label="輕度" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">風險等級：</span>
              <v-text-field v-model="setLevel2" solo readonly/>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">現有控制措施：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items2[idx].status4">
                <v-radio color="success" label="工程控制" value="1"/>
                <v-radio color="success" label="管理控制" value="2"/>
                <v-radio color="success" label="個人防護" value="3"/>
                <v-radio color="success" label="其他" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">應增加或修正相關措施：</span>
              <v-textarea auto-grow outlined rows="2" />
            </v-col>
          </v-row>
        </v-alert>
        <!-- 333 -->
        <v-col cols="12" sm="9">
          <p class="font-weight-black title text-left font-size-50">
            勞工之工作性質是否為執行公共安全業務
          </p>
        </v-col>
        <v-col cols="12" sm="2">
          <v-radio-group dense row class="pa-0 ma-0">
            <v-radio color="success" label="是" value="1"/>
            <v-radio color="success" label="否" value="2"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">潛在不法侵害風險類型</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
              </template>
              <span>(發生機率)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
              </template>
              <span>(傷害程度)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">風險等級</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
              </template>
              <span>(工程控制/管理控制/個人防護)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">應增加或修正相關措施</h3>
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
          class="mb-6 mt-4"
        >
          <v-row no-gutter>
            <!-- <v-col cols="12" sm="3">{{ item.question }}</v-col> -->
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">潛在不法侵害風險類型：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items3[idx].status">
                <v-radio color="red" label="肢體暴力" value="1"/>
                <v-radio color="red" label="心理暴力" value="2"/>
                <v-radio color="red" label="語言暴力" value="3"/>
                <v-radio color="red" label="性騷擾" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">可能性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items3[idx].status2">
                <v-radio color="red" label="可能發生" value="3"/>
                <v-radio color="orange" label="不大可能" value="2"/>
                <v-radio color="success" label="極不可能" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">嚴重性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items3[idx].status3">
                <v-radio color="red" label="嚴重" value="3"/>
                <v-radio color="orange" label="中度" value="2"/>
                <v-radio color="success" label="輕度" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">風險等級：</span>
              <v-text-field v-model="setLevel3" solo readonly/>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">現有控制措施：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items3[idx].status4">
                <v-radio color="success" label="工程控制" value="1"/>
                <v-radio color="success" label="管理控制" value="2"/>
                <v-radio color="success" label="個人防護" value="3"/>
                <v-radio color="success" label="其他" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">應增加或修正相關措施：</span>
              <v-textarea auto-grow outlined rows="2" />
            </v-col>
          </v-row>
        </v-alert>
        <!-- 444 -->
        <v-col cols="12" sm="9">
          <p class="font-weight-black title text-left font-size-50">
            勞工之工作是否為單獨作業
          </p>
        </v-col>
        <v-col cols="12" sm="2">
          <v-radio-group dense row class="pa-0 ma-0">
            <v-radio color="success" label="是" value="1"/>
            <v-radio color="success" label="否" value="2"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">潛在不法侵害風險類型</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
              </template>
              <span>(發生機率)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
              </template>
              <span>(傷害程度)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">風險等級</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
              </template>
              <span>(工程控制/管理控制/個人防護)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">應增加或修正相關措施</h3>
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
          class="mb-6 mt-4"
        >
          <v-row no-gutter>
            <!-- <v-col cols="12" sm="3">{{ item.question }}</v-col> -->
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">潛在不法侵害風險類型：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items4[idx].status">
                <v-radio color="red" label="肢體暴力" value="1"/>
                <v-radio color="red" label="心理暴力" value="2"/>
                <v-radio color="red" label="語言暴力" value="3"/>
                <v-radio color="red" label="性騷擾" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">可能性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items4[idx].status2">
                <v-radio color="red" label="可能發生" value="3"/>
                <v-radio color="orange" label="不大可能" value="2"/>
                <v-radio color="success" label="極不可能" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">嚴重性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items4[idx].status3">
                <v-radio color="red" label="嚴重" value="3"/>
                <v-radio color="orange" label="中度" value="2"/>
                <v-radio color="success" label="輕度" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">風險等級：</span>
              <v-text-field v-model="setLevel4" solo readonly/>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">現有控制措施：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items4[idx].status4">
                <v-radio color="success" label="工程控制" value="1"/>
                <v-radio color="success" label="管理控制" value="2"/>
                <v-radio color="success" label="個人防護" value="3"/>
                <v-radio color="success" label="其他" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">應增加或修正相關措施：</span>
              <v-textarea auto-grow outlined rows="2" />
            </v-col>
          </v-row>
        </v-alert>
        <!-- 555 -->
        <v-col cols="12" sm="9">
          <p class="font-weight-black title text-left font-size-50">
            勞工是否需於深夜或凌晨工作
          </p>
        </v-col>
        <v-col cols="12" sm="2">
          <v-radio-group dense row class="pa-0 ma-0">
            <v-radio color="success" label="是" value="1"/>
            <v-radio color="success" label="否" value="2"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">潛在不法侵害風險類型</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
              </template>
              <span>(發生機率)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
              </template>
              <span>(傷害程度)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">風險等級</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
              </template>
              <span>(工程控制/管理控制/個人防護)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">應增加或修正相關措施</h3>
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
          class="mb-6 mt-4"
        >
          <v-row no-gutter>
            <!-- <v-col cols="12" sm="3">{{ item.question }}</v-col> -->
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">潛在不法侵害風險類型：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items5[idx].status">
                <v-radio color="red" label="肢體暴力" value="1"/>
                <v-radio color="red" label="心理暴力" value="2"/>
                <v-radio color="red" label="語言暴力" value="3"/>
                <v-radio color="red" label="性騷擾" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">可能性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items5[idx].status2">
                <v-radio color="red" label="可能發生" value="3"/>
                <v-radio color="orange" label="不大可能" value="2"/>
                <v-radio color="success" label="極不可能" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">嚴重性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items5[idx].status3">
                <v-radio color="red" label="嚴重" value="3"/>
                <v-radio color="orange" label="中度" value="2"/>
                <v-radio color="success" label="輕度" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">風險等級：</span>
              <v-text-field v-model="setLevel5" solo readonly/>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">現有控制措施：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items5[idx].status4">
                <v-radio color="success" label="工程控制" value="1"/>
                <v-radio color="success" label="管理控制" value="2"/>
                <v-radio color="success" label="個人防護" value="3"/>
                <v-radio color="success" label="其他" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">應增加或修正相關措施：</span>
              <v-textarea auto-grow outlined rows="2" />
            </v-col>
          </v-row>
        </v-alert>
        <!-- 666 -->
        <v-col cols="12" sm="9">
          <p class="font-weight-black title text-left font-size-50">
            勞工是否需於較陌生之環境工作
          </p>
        </v-col>
        <v-col cols="12" sm="2">
          <v-radio-group dense row class="pa-0 ma-0">
            <v-radio color="success" label="是" value="1"/>
            <v-radio color="success" label="否" value="2"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">潛在不法侵害風險類型</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
              </template>
              <span>(發生機率)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
              </template>
              <span>(傷害程度)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">風險等級</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
              </template>
              <span>(工程控制/管理控制/個人防護)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">應增加或修正相關措施</h3>
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
          class="mb-6 mt-4"
        >
          <v-row no-gutter>
            <!-- <v-col cols="12" sm="3">{{ item.question }}</v-col> -->
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">潛在不法侵害風險類型：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items6[idx].status">
                <v-radio color="red" label="肢體暴力" value="1"/>
                <v-radio color="red" label="心理暴力" value="2"/>
                <v-radio color="red" label="語言暴力" value="3"/>
                <v-radio color="red" label="性騷擾" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">可能性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items6[idx].status2">
                <v-radio color="red" label="可能發生" value="3"/>
                <v-radio color="orange" label="不大可能" value="2"/>
                <v-radio color="success" label="極不可能" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">嚴重性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items6[idx].status3">
                <v-radio color="red" label="嚴重" value="3"/>
                <v-radio color="orange" label="中度" value="2"/>
                <v-radio color="success" label="輕度" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">風險等級：</span>
              <v-text-field v-model="setLevel6" solo readonly/>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">現有控制措施：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items6[idx].status4">
                <v-radio color="success" label="工程控制" value="1"/>
                <v-radio color="success" label="管理控制" value="2"/>
                <v-radio color="success" label="個人防護" value="3"/>
                <v-radio color="success" label="其他" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">應增加或修正相關措施：</span>
              <v-textarea auto-grow outlined rows="2" />
            </v-col>
          </v-row>
        </v-alert>
        <!-- 777 -->
        <v-col cols="12" sm="9">
          <p class="font-weight-black title text-left font-size-50">
            勞工之工作是否涉及現金交易、運送或處理貴重物品
          </p>
        </v-col>
        <v-col cols="12" sm="2">
          <v-radio-group dense row class="pa-0 ma-0">
            <v-radio color="success" label="是" value="1"/>
            <v-radio color="success" label="否" value="2"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">潛在不法侵害風險類型</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
              </template>
              <span>(發生機率)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
              </template>
              <span>(傷害程度)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">風險等級</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
              </template>
              <span>(工程控制/管理控制/個人防護)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">應增加或修正相關措施</h3>
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
          class="mb-6 mt-4"
        >
          <v-row no-gutter>
            <!-- <v-col cols="12" sm="3">{{ item.question }}</v-col> -->
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">潛在不法侵害風險類型：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items7[idx].status">
                <v-radio color="red" label="肢體暴力" value="1"/>
                <v-radio color="red" label="心理暴力" value="2"/>
                <v-radio color="red" label="語言暴力" value="3"/>
                <v-radio color="red" label="性騷擾" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">可能性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items7[idx].status2">
                <v-radio color="red" label="可能發生" value="3"/>
                <v-radio color="orange" label="不大可能" value="2"/>
                <v-radio color="success" label="極不可能" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">嚴重性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items7[idx].status3">
                <v-radio color="red" label="嚴重" value="3"/>
                <v-radio color="orange" label="中度" value="2"/>
                <v-radio color="success" label="輕度" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">風險等級：</span>
              <v-text-field v-model="setLevel7" solo readonly/>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">現有控制措施：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items7[idx].status4">
                <v-radio color="success" label="工程控制" value="1"/>
                <v-radio color="success" label="管理控制" value="2"/>
                <v-radio color="success" label="個人防護" value="3"/>
                <v-radio color="success" label="其他" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">應增加或修正相關措施：</span>
              <v-textarea auto-grow outlined rows="2" />
            </v-col>
          </v-row>
        </v-alert>
        <!-- 888 -->
        <v-col cols="12" sm="9">
          <p class="font-weight-black title text-left font-size-50">
            勞工之工作是否為直接面對群眾之第一線服務工作
          </p>
        </v-col>
        <v-col cols="12" sm="2">
          <v-radio-group dense row class="pa-0 ma-0">
            <v-radio color="success" label="是" value="1"/>
            <v-radio color="success" label="否" value="2"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">潛在不法侵害風險類型</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
              </template>
              <span>(發生機率)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
              </template>
              <span>(傷害程度)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">風險等級</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
              </template>
              <span>(工程控制/管理控制/個人防護)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">應增加或修正相關措施</h3>
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
          class="mb-6 mt-4"
        >
          <v-row no-gutter>
            <!-- <v-col cols="12" sm="3">{{ item.question }}</v-col> -->
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">潛在不法侵害風險類型：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items8[idx].status">
                <v-radio color="red" label="肢體暴力" value="1"/>
                <v-radio color="red" label="心理暴力" value="2"/>
                <v-radio color="red" label="語言暴力" value="3"/>
                <v-radio color="red" label="性騷擾" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">可能性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items8[idx].status2">
                <v-radio color="red" label="可能發生" value="3"/>
                <v-radio color="orange" label="不大可能" value="2"/>
                <v-radio color="success" label="極不可能" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">嚴重性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items8[idx].status3">
                <v-radio color="red" label="嚴重" value="3"/>
                <v-radio color="orange" label="中度" value="2"/>
                <v-radio color="success" label="輕度" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">風險等級：</span>
              <v-text-field v-model="setLevel8" solo readonly/>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">現有控制措施：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items8[idx].status4">
                <v-radio color="success" label="工程控制" value="1"/>
                <v-radio color="success" label="管理控制" value="2"/>
                <v-radio color="success" label="個人防護" value="3"/>
                <v-radio color="success" label="其他" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">應增加或修正相關措施：</span>
              <v-textarea auto-grow outlined rows="2" />
            </v-col>
          </v-row>
        </v-alert>
        <!-- 999 -->
        <v-col cols="12" sm="9">
          <p class="font-weight-black title text-left font-size-50">
            勞工之工作是否會與酗酒、毒癮或精神疾病者接觸
          </p>
        </v-col>
        <v-col cols="12" sm="2">
          <v-radio-group dense row class="pa-0 ma-0">
            <v-radio color="success" label="是" value="1"/>
            <v-radio color="success" label="否" value="2"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">潛在不法侵害風險類型</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
              </template>
              <span>(發生機率)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
              </template>
              <span>(傷害程度)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">風險等級</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
              </template>
              <span>(工程控制/管理控制/個人防護)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">應增加或修正相關措施</h3>
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
          class="mb-6 mt-4"
        >
          <v-row no-gutter>
            <!-- <v-col cols="12" sm="3">{{ item.question }}</v-col> -->
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">潛在不法侵害風險類型：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items9[idx].status">
                <v-radio color="red" label="肢體暴力" value="1"/>
                <v-radio color="red" label="心理暴力" value="2"/>
                <v-radio color="red" label="語言暴力" value="3"/>
                <v-radio color="red" label="性騷擾" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">可能性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items9[idx].status2">
                <v-radio color="red" label="可能發生" value="3"/>
                <v-radio color="orange" label="不大可能" value="2"/>
                <v-radio color="success" label="極不可能" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">嚴重性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items9[idx].status3">
                <v-radio color="red" label="嚴重" value="3"/>
                <v-radio color="orange" label="中度" value="2"/>
                <v-radio color="success" label="輕度" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">風險等級：</span>
              <v-text-field v-model="setLevel9" solo readonly/>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">現有控制措施：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items9[idx].status4">
                <v-radio color="success" label="工程控制" value="1"/>
                <v-radio color="success" label="管理控制" value="2"/>
                <v-radio color="success" label="個人防護" value="3"/>
                <v-radio color="success" label="其他" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">應增加或修正相關措施：</span>
              <v-textarea auto-grow outlined rows="2" />
            </v-col>
          </v-row>
        </v-alert>
        <!-- 10 -->
        <v-col cols="12" sm="9">
          <p class="font-weight-black title text-left font-size-50">
            勞工之工作是否需接觸絕望或恐懼或亟需被關懷照顧者
          </p>
        </v-col>
        <v-col cols="12" sm="2">
          <v-radio-group dense row class="pa-0 ma-0">
            <v-radio color="success" label="是" value="1"/>
            <v-radio color="success" label="否" value="2"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">潛在不法侵害風險類型</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
              </template>
              <span>(發生機率)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
              </template>
              <span>(傷害程度)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">風險等級</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
              </template>
              <span>(工程控制/管理控制/個人防護)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">應增加或修正相關措施</h3>
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
          class="mb-6 mt-4"
        >
          <v-row no-gutter>
            <!-- <v-col cols="12" sm="3">{{ item.question }}</v-col> -->
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">潛在不法侵害風險類型：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items10[idx].status">
                <v-radio color="red" label="肢體暴力" value="1"/>
                <v-radio color="red" label="心理暴力" value="2"/>
                <v-radio color="red" label="語言暴力" value="3"/>
                <v-radio color="red" label="性騷擾" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">可能性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items10[idx].status2">
                <v-radio color="red" label="可能發生" value="3"/>
                <v-radio color="orange" label="不大可能" value="2"/>
                <v-radio color="success" label="極不可能" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">嚴重性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items10[idx].status3">
                <v-radio color="red" label="嚴重" value="3"/>
                <v-radio color="orange" label="中度" value="2"/>
                <v-radio color="success" label="輕度" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">風險等級：</span>
              <v-text-field v-model="setLevel10" solo readonly/>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">現有控制措施：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items10[idx].status4">
                <v-radio color="success" label="工程控制" value="1"/>
                <v-radio color="success" label="管理控制" value="2"/>
                <v-radio color="success" label="個人防護" value="3"/>
                <v-radio color="success" label="其他" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">應增加或修正相關措施：</span>
              <v-textarea auto-grow outlined rows="2" />
            </v-col>
          </v-row>
        </v-alert>
        <!-- 11 -->
        <v-col cols="12" sm="9">
          <p class="font-weight-black title text-left font-size-50">
            勞工當中是否有自行通報因私人關係遭受不法侵害威脅者或為家庭暴力受害者
          </p>
        </v-col>
        <v-col cols="12" sm="2">
          <v-radio-group dense row class="pa-0 ma-0">
            <v-radio color="success" label="是" value="1"/>
            <v-radio color="success" label="否" value="2"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">潛在不法侵害風險類型</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
              </template>
              <span>(發生機率)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
              </template>
              <span>(傷害程度)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">風險等級</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
              </template>
              <span>(工程控制/管理控制/個人防護)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">應增加或修正相關措施</h3>
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
          class="mb-6 mt-4"
        >
          <v-row no-gutter>
            <!-- <v-col cols="12" sm="3">{{ item.question }}</v-col> -->
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">潛在不法侵害風險類型：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items11[idx].status">
                <v-radio color="red" label="肢體暴力" value="1"/>
                <v-radio color="red" label="心理暴力" value="2"/>
                <v-radio color="red" label="語言暴力" value="3"/>
                <v-radio color="red" label="性騷擾" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">可能性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items11[idx].status2">
                <v-radio color="red" label="可能發生" value="3"/>
                <v-radio color="orange" label="不大可能" value="2"/>
                <v-radio color="success" label="極不可能" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">嚴重性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items11[idx].status3">
                <v-radio color="red" label="嚴重" value="3"/>
                <v-radio color="orange" label="中度" value="2"/>
                <v-radio color="success" label="輕度" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">風險等級：</span>
              <v-text-field v-model="setLevel11" solo readonly/>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">現有控制措施：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items11[idx].status4">
                <v-radio color="success" label="工程控制" value="1"/>
                <v-radio color="success" label="管理控制" value="2"/>
                <v-radio color="success" label="個人防護" value="3"/>
                <v-radio color="success" label="其他" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">應增加或修正相關措施：</span>
              <v-textarea auto-grow outlined rows="2" />
            </v-col>
          </v-row>
        </v-alert>
        <!-- 12 -->
        <v-col cols="12" sm="9">
          <p class="font-weight-black title text-left font-size-50">
            新進勞工是否有尚未接受職場不法侵害預防教育訓練者
          </p>
        </v-col>
        <v-col cols="12" sm="2">
          <v-radio-group dense row class="pa-0 ma-0">
            <v-radio color="success" label="是" value="1"/>
            <v-radio color="success" label="否" value="2"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">潛在不法侵害風險類型</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
              </template>
              <span>(發生機率)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
              </template>
              <span>(傷害程度)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">風險等級</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
              </template>
              <span>(工程控制/管理控制/個人防護)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">應增加或修正相關措施</h3>
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
          class="mb-6 mt-4"
        >
          <v-row no-gutter>
            <!-- <v-col cols="12" sm="3">{{ item.question }}</v-col> -->
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">潛在不法侵害風險類型：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items12[idx].status">
                <v-radio color="red" label="肢體暴力" value="1"/>
                <v-radio color="red" label="心理暴力" value="2"/>
                <v-radio color="red" label="語言暴力" value="3"/>
                <v-radio color="red" label="性騷擾" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">可能性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items12[idx].status2">
                <v-radio color="red" label="可能發生" value="3"/>
                <v-radio color="orange" label="不大可能" value="2"/>
                <v-radio color="success" label="極不可能" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">嚴重性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items12[idx].status3">
                <v-radio color="red" label="嚴重" value="3"/>
                <v-radio color="orange" label="中度" value="2"/>
                <v-radio color="success" label="輕度" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">風險等級：</span>
              <v-text-field v-model="setLevel12" solo readonly/>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">現有控制措施：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items12[idx].status4">
                <v-radio color="success" label="工程控制" value="1"/>
                <v-radio color="success" label="管理控制" value="2"/>
                <v-radio color="success" label="個人防護" value="3"/>
                <v-radio color="success" label="其他" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">應增加或修正相關措施：</span>
              <v-textarea auto-grow outlined rows="2" />
            </v-col>
          </v-row>
        </v-alert>
        <!-- 13 -->
        <v-col cols="12" sm="9">
          <p class="font-weight-black title text-left font-size-50">
            工作場所是否位於治安不佳或交通不便之偏遠地區
          </p>
        </v-col>
        <v-col cols="12" sm="2">
          <v-radio-group dense row class="pa-0 ma-0">
            <v-radio color="success" label="是" value="1"/>
            <v-radio color="success" label="否" value="2"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">潛在不法侵害風險類型</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
              </template>
              <span>(發生機率)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
              </template>
              <span>(傷害程度)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">風險等級</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
              </template>
              <span>(工程控制/管理控制/個人防護)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">應增加或修正相關措施</h3>
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
          class="mb-6 mt-4"
        >
          <v-row no-gutter>
            <!-- <v-col cols="12" sm="3">{{ item.question }}</v-col> -->
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">潛在不法侵害風險類型：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items13[idx].status">
                <v-radio color="red" label="肢體暴力" value="1"/>
                <v-radio color="red" label="心理暴力" value="2"/>
                <v-radio color="red" label="語言暴力" value="3"/>
                <v-radio color="red" label="性騷擾" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">可能性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items13[idx].status2">
                <v-radio color="red" label="可能發生" value="3"/>
                <v-radio color="orange" label="不大可能" value="2"/>
                <v-radio color="success" label="極不可能" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">嚴重性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items13[idx].status3">
                <v-radio color="red" label="嚴重" value="3"/>
                <v-radio color="orange" label="中度" value="2"/>
                <v-radio color="success" label="輕度" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">風險等級：</span>
              <v-text-field v-model="setLevel13" solo readonly/>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">現有控制措施：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items13[idx].status4">
                <v-radio color="success" label="工程控制" value="1"/>
                <v-radio color="success" label="管理控制" value="2"/>
                <v-radio color="success" label="個人防護" value="3"/>
                <v-radio color="success" label="其他" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">應增加或修正相關措施：</span>
              <v-textarea auto-grow outlined rows="2" />
            </v-col>
          </v-row>
        </v-alert>
        <!-- 14 -->
        <v-col cols="12" sm="9">
          <p class="font-weight-black title text-left font-size-50">
            工作環境中是否有讓施暴者隱藏的地方
          </p>
        </v-col>
        <v-col cols="12" sm="2">
          <v-radio-group dense row class="pa-0 ma-0">
            <v-radio color="success" label="是" value="1"/>
            <v-radio color="success" label="否" value="2"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">潛在不法侵害風險類型</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
              </template>
              <span>(發生機率)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
              </template>
              <span>(傷害程度)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">風險等級</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
              </template>
              <span>(工程控制/管理控制/個人防護)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">應增加或修正相關措施</h3>
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
          class="mb-6 mt-4"
        >
          <v-row no-gutter>
            <!-- <v-col cols="12" sm="3">{{ item.question }}</v-col> -->
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">潛在不法侵害風險類型：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items14[idx].status">
                <v-radio color="red" label="肢體暴力" value="1"/>
                <v-radio color="red" label="心理暴力" value="2"/>
                <v-radio color="red" label="語言暴力" value="3"/>
                <v-radio color="red" label="性騷擾" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">可能性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items14[idx].status2">
                <v-radio color="red" label="可能發生" value="3"/>
                <v-radio color="orange" label="不大可能" value="2"/>
                <v-radio color="success" label="極不可能" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">嚴重性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items14[idx].status3">
                <v-radio color="red" label="嚴重" value="3"/>
                <v-radio color="orange" label="中度" value="2"/>
                <v-radio color="success" label="輕度" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">風險等級：</span>
              <v-text-field v-model="setLevel14" solo readonly/>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">現有控制措施：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items14[idx].status4">
                <v-radio color="success" label="工程控制" value="1"/>
                <v-radio color="success" label="管理控制" value="2"/>
                <v-radio color="success" label="個人防護" value="3"/>
                <v-radio color="success" label="其他" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">應增加或修正相關措施：</span>
              <v-textarea auto-grow outlined rows="2" />
            </v-col>
          </v-row>
        </v-alert>
        <!-- 15 -->
        <v-col cols="12" sm="9">
          <p class="font-weight-black title text-left font-size-50">
            離開工作場所後，是否可能遭遇因執行職務所致之不法侵害行為
          </p>
        </v-col>
        <v-col cols="12" sm="2">
          <v-radio-group dense row class="pa-0 ma-0">
            <v-radio color="success" label="是" value="1"/>
            <v-radio color="success" label="否" value="2"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">潛在不法侵害風險類型</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
              </template>
              <span>(發生機率)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
              </template>
              <span>(傷害程度)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">風險等級</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
              </template>
              <span>(工程控制/管理控制/個人防護)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">應增加或修正相關措施</h3>
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
          class="mb-6 mt-4"
        >
          <v-row no-gutter>
            <!-- <v-col cols="12" sm="3">{{ item.question }}</v-col> -->
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">潛在不法侵害風險類型：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items15[idx].status">
                <v-radio color="red" label="肢體暴力" value="1"/>
                <v-radio color="red" label="心理暴力" value="2"/>
                <v-radio color="red" label="語言暴力" value="3"/>
                <v-radio color="red" label="性騷擾" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">可能性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items15[idx].status2">
                <v-radio color="red" label="可能發生" value="3"/>
                <v-radio color="orange" label="不大可能" value="2"/>
                <v-radio color="success" label="極不可能" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">嚴重性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items15[idx].status3">
                <v-radio color="red" label="嚴重" value="3"/>
                <v-radio color="orange" label="中度" value="2"/>
                <v-radio color="success" label="輕度" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">風險等級：</span>
              <v-text-field v-model="setLevel15" solo readonly/>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">現有控制措施：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items15[idx].status4">
                <v-radio color="success" label="工程控制" value="1"/>
                <v-radio color="success" label="管理控制" value="2"/>
                <v-radio color="success" label="個人防護" value="3"/>
                <v-radio color="success" label="其他" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">應增加或修正相關措施：</span>
              <v-textarea auto-grow outlined rows="2" />
            </v-col>
          </v-row>
        </v-alert>
        <v-col cols="13" sm="12">
          <v-toolbar color="teal lighten-2" dark>
            <v-spacer />
            <v-toolbar-title>內部不法侵害</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
        </v-col>
        <!-- 16 -->
        <v-col cols="12" sm="9">
          <p class="font-weight-black title text-left font-size-50">
            離開工作場所後，是否可能遭遇因執行職務所致之不法侵害行為
          </p>
        </v-col>
        <v-col cols="12" sm="2">
          <v-radio-group dense row class="pa-0 ma-0">
            <v-radio color="success" label="是" value="1"/>
            <v-radio color="success" label="否" value="2"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">潛在不法侵害風險類型</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
              </template>
              <span>(發生機率)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
              </template>
              <span>(傷害程度)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">風險等級</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
              </template>
              <span>(工程控制/管理控制/個人防護)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">應增加或修正相關措施</h3>
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
          class="mb-6 mt-4"
        >
          <v-row no-gutter>
            <!-- <v-col cols="12" sm="3">{{ item.question }}</v-col> -->
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">潛在不法侵害風險類型：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items16[idx].status">
                <v-radio color="red" label="肢體暴力" value="1"/>
                <v-radio color="red" label="心理暴力" value="2"/>
                <v-radio color="red" label="語言暴力" value="3"/>
                <v-radio color="red" label="性騷擾" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">可能性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items16[idx].status2">
                <v-radio color="red" label="可能發生" value="3"/>
                <v-radio color="orange" label="不大可能" value="2"/>
                <v-radio color="success" label="極不可能" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">嚴重性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items16[idx].status3">
                <v-radio color="red" label="嚴重" value="3"/>
                <v-radio color="orange" label="中度" value="2"/>
                <v-radio color="success" label="輕度" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">風險等級：</span>
              <v-text-field v-model="setLevel16" solo readonly/>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">現有控制措施：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items16[idx].status4">
                <v-radio color="success" label="工程控制" value="1"/>
                <v-radio color="success" label="管理控制" value="2"/>
                <v-radio color="success" label="個人防護" value="3"/>
                <v-radio color="success" label="其他" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">應增加或修正相關措施：</span>
              <v-textarea auto-grow outlined rows="2" />
            </v-col>
          </v-row>
        </v-alert>
        <!-- 17 -->
        <v-col cols="12" sm="9">
          <p class="font-weight-black title text-left font-size-50">
            是否有無法接受不同性別、年齡、國籍或宗教信仰之工作者
          </p>
        </v-col>
        <v-col cols="12" sm="2">
          <v-radio-group dense row class="pa-0 ma-0">
            <v-radio color="success" label="是" value="1"/>
            <v-radio color="success" label="否" value="2"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">潛在不法侵害風險類型</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
              </template>
              <span>(發生機率)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
              </template>
              <span>(傷害程度)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">風險等級</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
              </template>
              <span>(工程控制/管理控制/個人防護)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">應增加或修正相關措施</h3>
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
          class="mb-6 mt-4"
        >
          <v-row no-gutter>
            <!-- <v-col cols="12" sm="3">{{ item.question }}</v-col> -->
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">潛在不法侵害風險類型：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items17[idx].status">
                <v-radio color="red" label="肢體暴力" value="1"/>
                <v-radio color="red" label="心理暴力" value="2"/>
                <v-radio color="red" label="語言暴力" value="3"/>
                <v-radio color="red" label="性騷擾" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">可能性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items17[idx].status2">
                <v-radio color="red" label="可能發生" value="3"/>
                <v-radio color="orange" label="不大可能" value="2"/>
                <v-radio color="success" label="極不可能" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">嚴重性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items17[idx].status3">
                <v-radio color="red" label="嚴重" value="3"/>
                <v-radio color="orange" label="中度" value="2"/>
                <v-radio color="success" label="輕度" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">風險等級：</span>
              <v-text-field v-model="setLevel17" solo readonly/>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">現有控制措施：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items17[idx].status4">
                <v-radio color="success" label="工程控制" value="1"/>
                <v-radio color="success" label="管理控制" value="2"/>
                <v-radio color="success" label="個人防護" value="3"/>
                <v-radio color="success" label="其他" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">應增加或修正相關措施：</span>
              <v-textarea auto-grow outlined rows="2" />
            </v-col>
          </v-row>
        </v-alert>
        <!-- 18 -->
        <v-col cols="12" sm="9">
          <p class="font-weight-black title text-left font-size-50">
            是否有同仁之離職或請求調職原因源於職場不法侵害事件之發生
          </p>
        </v-col>
        <v-col cols="12" sm="2">
          <v-radio-group dense row class="pa-0 ma-0">
            <v-radio color="success" label="是" value="1"/>
            <v-radio color="success" label="否" value="2"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">潛在不法侵害風險類型</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
              </template>
              <span>(發生機率)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
              </template>
              <span>(傷害程度)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">風險等級</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
              </template>
              <span>(工程控制/管理控制/個人防護)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">應增加或修正相關措施</h3>
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
          class="mb-6 mt-4"
        >
          <v-row no-gutter>
            <!-- <v-col cols="12" sm="3">{{ item.question }}</v-col> -->
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">潛在不法侵害風險類型：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items18[idx].status">
                <v-radio color="red" label="肢體暴力" value="1"/>
                <v-radio color="red" label="心理暴力" value="2"/>
                <v-radio color="red" label="語言暴力" value="3"/>
                <v-radio color="red" label="性騷擾" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">可能性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items18[idx].status2">
                <v-radio color="red" label="可能發生" value="3"/>
                <v-radio color="orange" label="不大可能" value="2"/>
                <v-radio color="success" label="極不可能" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">嚴重性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items18[idx].status3">
                <v-radio color="red" label="嚴重" value="3"/>
                <v-radio color="orange" label="中度" value="2"/>
                <v-radio color="success" label="輕度" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">風險等級：</span>
              <v-text-field v-model="setLevel18" solo readonly/>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">現有控制措施：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items18[idx].status4">
                <v-radio color="success" label="工程控制" value="1"/>
                <v-radio color="success" label="管理控制" value="2"/>
                <v-radio color="success" label="個人防護" value="3"/>
                <v-radio color="success" label="其他" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">應增加或修正相關措施：</span>
              <v-textarea auto-grow outlined rows="2" />
            </v-col>
          </v-row>
        </v-alert>
        <!-- 19 -->
        <v-col cols="12" sm="9">
          <p class="font-weight-black title text-left font-size-50">
            是否有被同仁排擠或工作適應不良之工作者
          </p>
        </v-col>
        <v-col cols="12" sm="2">
          <v-radio-group dense row class="pa-0 ma-0">
            <v-radio color="success" label="是" value="1"/>
            <v-radio color="success" label="否" value="2"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">潛在不法侵害風險類型</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
              </template>
              <span>(發生機率)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
              </template>
              <span>(傷害程度)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">風險等級</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
              </template>
              <span>(工程控制/管理控制/個人防護)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">應增加或修正相關措施</h3>
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
          class="mb-6 mt-4"
        >
          <v-row no-gutter>
            <!-- <v-col cols="12" sm="3">{{ item.question }}</v-col> -->
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">潛在不法侵害風險類型：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items19[idx].status">
                <v-radio color="red" label="肢體暴力" value="1"/>
                <v-radio color="red" label="心理暴力" value="2"/>
                <v-radio color="red" label="語言暴力" value="3"/>
                <v-radio color="red" label="性騷擾" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">可能性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items19[idx].status2">
                <v-radio color="red" label="可能發生" value="3"/>
                <v-radio color="orange" label="不大可能" value="2"/>
                <v-radio color="success" label="極不可能" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">嚴重性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items19[idx].status3">
                <v-radio color="red" label="嚴重" value="3"/>
                <v-radio color="orange" label="中度" value="2"/>
                <v-radio color="success" label="輕度" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">風險等級：</span>
              <v-text-field v-model="setLevel19" solo readonly/>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">現有控制措施：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items19[idx].status4">
                <v-radio color="success" label="工程控制" value="1"/>
                <v-radio color="success" label="管理控制" value="2"/>
                <v-radio color="success" label="個人防護" value="3"/>
                <v-radio color="success" label="其他" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">應增加或修正相關措施：</span>
              <v-textarea auto-grow outlined rows="2" />
            </v-col>
          </v-row>
        </v-alert>
        <!-- 20 -->
        <v-col cols="12" sm="9">
          <p class="font-weight-black title text-left font-size-50">
            內部是否有酗酒、毒癮之工作者
          </p>
        </v-col>
        <v-col cols="12" sm="2">
          <v-radio-group dense row class="pa-0 ma-0">
            <v-radio color="success" label="是" value="1"/>
            <v-radio color="success" label="否" value="2"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">潛在不法侵害風險類型</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
              </template>
              <span>(發生機率)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
              </template>
              <span>(傷害程度)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">風險等級</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
              </template>
              <span>(工程控制/管理控制/個人防護)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">應增加或修正相關措施</h3>
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
          class="mb-6 mt-4"
        >
          <v-row no-gutter>
            <!-- <v-col cols="12" sm="3">{{ item.question }}</v-col> -->
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">潛在不法侵害風險類型：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items20[idx].status">
                <v-radio color="red" label="肢體暴力" value="1"/>
                <v-radio color="red" label="心理暴力" value="2"/>
                <v-radio color="red" label="語言暴力" value="3"/>
                <v-radio color="red" label="性騷擾" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">可能性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items20[idx].status2">
                <v-radio color="red" label="可能發生" value="3"/>
                <v-radio color="orange" label="不大可能" value="2"/>
                <v-radio color="success" label="極不可能" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">嚴重性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items20[idx].status3">
                <v-radio color="red" label="嚴重" value="3"/>
                <v-radio color="orange" label="中度" value="2"/>
                <v-radio color="success" label="輕度" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">風險等級：</span>
              <v-text-field v-model="setLevel20" solo readonly/>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">現有控制措施：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items20[idx].status4">
                <v-radio color="success" label="工程控制" value="1"/>
                <v-radio color="success" label="管理控制" value="2"/>
                <v-radio color="success" label="個人防護" value="3"/>
                <v-radio color="success" label="其他" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">應增加或修正相關措施：</span>
              <v-textarea auto-grow outlined rows="2" />
            </v-col>
          </v-row>
        </v-alert>
        <!-- 21 -->
        <v-col cols="12" sm="9">
          <p class="font-weight-black title text-left font-size-50">
            內部是否有情緒不穩定或精神疾患病史之工作者
          </p>
        </v-col>
        <v-col cols="12" sm="2">
          <v-radio-group dense row class="pa-0 ma-0">
            <v-radio color="success" label="是" value="1"/>
            <v-radio color="success" label="否" value="2"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">潛在不法侵害風險類型</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
              </template>
              <span>(發生機率)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
              </template>
              <span>(傷害程度)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">風險等級</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
              </template>
              <span>(工程控制/管理控制/個人防護)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">應增加或修正相關措施</h3>
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
          class="mb-6 mt-4"
        >
          <v-row no-gutter>
            <!-- <v-col cols="12" sm="3">{{ item.question }}</v-col> -->
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">潛在不法侵害風險類型：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items21[idx].status">
                <v-radio color="red" label="肢體暴力" value="1"/>
                <v-radio color="red" label="心理暴力" value="2"/>
                <v-radio color="red" label="語言暴力" value="3"/>
                <v-radio color="red" label="性騷擾" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">可能性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items21[idx].status2">
                <v-radio color="red" label="可能發生" value="3"/>
                <v-radio color="orange" label="不大可能" value="2"/>
                <v-radio color="success" label="極不可能" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">嚴重性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items21[idx].status3">
                <v-radio color="red" label="嚴重" value="3"/>
                <v-radio color="orange" label="中度" value="2"/>
                <v-radio color="success" label="輕度" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">風險等級：</span>
              <v-text-field v-model="setLevel21" solo readonly/>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">現有控制措施：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items21[idx].status4">
                <v-radio color="success" label="工程控制" value="1"/>
                <v-radio color="success" label="管理控制" value="2"/>
                <v-radio color="success" label="個人防護" value="3"/>
                <v-radio color="success" label="其他" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">應增加或修正相關措施：</span>
              <v-textarea auto-grow outlined rows="2" />
            </v-col>
          </v-row>
        </v-alert>
        <!-- 22 -->
        <v-col cols="12" sm="9">
          <p class="font-weight-black title text-left font-size-50">
            內部是否有處於情緒低落、絕望或恐懼，亟需被關懷照顧之工作者
          </p>
        </v-col>
        <v-col cols="12" sm="2">
          <v-radio-group dense row class="pa-0 ma-0">
            <v-radio color="success" label="是" value="1"/>
            <v-radio color="success" label="否" value="2"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">潛在不法侵害風險類型</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
              </template>
              <span>(發生機率)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
              </template>
              <span>(傷害程度)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">風險等級</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
              </template>
              <span>(工程控制/管理控制/個人防護)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">應增加或修正相關措施</h3>
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
          class="mb-6 mt-4"
        >
          <v-row no-gutter>
            <!-- <v-col cols="12" sm="3">{{ item.question }}</v-col> -->
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">潛在不法侵害風險類型：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items22[idx].status">
                <v-radio color="red" label="肢體暴力" value="1"/>
                <v-radio color="red" label="心理暴力" value="2"/>
                <v-radio color="red" label="語言暴力" value="3"/>
                <v-radio color="red" label="性騷擾" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">可能性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items22[idx].status2">
                <v-radio color="red" label="可能發生" value="3"/>
                <v-radio color="orange" label="不大可能" value="2"/>
                <v-radio color="success" label="極不可能" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">嚴重性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items22[idx].status3">
                <v-radio color="red" label="嚴重" value="3"/>
                <v-radio color="orange" label="中度" value="2"/>
                <v-radio color="success" label="輕度" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">風險等級：</span>
              <v-text-field v-model="setLevel22" solo readonly/>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">現有控制措施：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items22[idx].status4">
                <v-radio color="success" label="工程控制" value="1"/>
                <v-radio color="success" label="管理控制" value="2"/>
                <v-radio color="success" label="個人防護" value="3"/>
                <v-radio color="success" label="其他" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">應增加或修正相關措施：</span>
              <v-textarea auto-grow outlined rows="2" />
            </v-col>
          </v-row>
        </v-alert>
        <!-- 23 -->
        <v-col cols="12" sm="9">
          <p class="font-weight-black title text-left font-size-50">
            是否有超時工作，反應工作壓力大之工作者
          </p>
        </v-col>
        <v-col cols="12" sm="2">
          <v-radio-group dense row class="pa-0 ma-0">
            <v-radio color="success" label="是" value="1"/>
            <v-radio color="success" label="否" value="2"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">潛在不法侵害風險類型</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
              </template>
              <span>(發生機率)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
              </template>
              <span>(傷害程度)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">風險等級</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
              </template>
              <span>(工程控制/管理控制/個人防護)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">應增加或修正相關措施</h3>
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
          class="mb-6 mt-4"
        >
          <v-row no-gutter>
            <!-- <v-col cols="12" sm="3">{{ item.question }}</v-col> -->
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">潛在不法侵害風險類型：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items23[idx].status">
                <v-radio color="red" label="肢體暴力" value="1"/>
                <v-radio color="red" label="心理暴力" value="2"/>
                <v-radio color="red" label="語言暴力" value="3"/>
                <v-radio color="red" label="性騷擾" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">可能性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items23[idx].status2">
                <v-radio color="red" label="可能發生" value="3"/>
                <v-radio color="orange" label="不大可能" value="2"/>
                <v-radio color="success" label="極不可能" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">嚴重性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items23[idx].status3">
                <v-radio color="red" label="嚴重" value="3"/>
                <v-radio color="orange" label="中度" value="2"/>
                <v-radio color="success" label="輕度" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">風險等級：</span>
              <v-text-field v-model="setLevel23" solo readonly/>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">現有控制措施：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items23[idx].status4">
                <v-radio color="success" label="工程控制" value="1"/>
                <v-radio color="success" label="管理控制" value="2"/>
                <v-radio color="success" label="個人防護" value="3"/>
                <v-radio color="success" label="其他" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">應增加或修正相關措施：</span>
              <v-textarea auto-grow outlined rows="2" />
            </v-col>
          </v-row>
        </v-alert>
        <!-- 24 -->
        <v-col cols="12" sm="9">
          <p class="font-weight-black title text-left font-size-50">
            工作環境是否有空間擁擠，照明設備不足之問題
          </p>
        </v-col>
        <v-col cols="12" sm="2">
          <v-radio-group dense row class="pa-0 ma-0">
            <v-radio color="success" label="是" value="1"/>
            <v-radio color="success" label="否" value="2"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">潛在不法侵害風險類型</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
              </template>
              <span>(發生機率)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
              </template>
              <span>(傷害程度)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">風險等級</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
              </template>
              <span>(工程控制/管理控制/個人防護)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">應增加或修正相關措施</h3>
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
          class="mb-6 mt-4"
        >
          <v-row no-gutter>
            <!-- <v-col cols="12" sm="3">{{ item.question }}</v-col> -->
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">潛在不法侵害風險類型：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items24[idx].status">
                <v-radio color="red" label="肢體暴力" value="1"/>
                <v-radio color="red" label="心理暴力" value="2"/>
                <v-radio color="red" label="語言暴力" value="3"/>
                <v-radio color="red" label="性騷擾" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">可能性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items24[idx].status2">
                <v-radio color="red" label="可能發生" value="3"/>
                <v-radio color="orange" label="不大可能" value="2"/>
                <v-radio color="success" label="極不可能" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">嚴重性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items24[idx].status3">
                <v-radio color="red" label="嚴重" value="3"/>
                <v-radio color="orange" label="中度" value="2"/>
                <v-radio color="success" label="輕度" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">風險等級：</span>
              <v-text-field v-model="setLevel24" solo readonly/>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">現有控制措施：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items24[idx].status4">
                <v-radio color="success" label="工程控制" value="1"/>
                <v-radio color="success" label="管理控制" value="2"/>
                <v-radio color="success" label="個人防護" value="3"/>
                <v-radio color="success" label="其他" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">應增加或修正相關措施：</span>
              <v-textarea auto-grow outlined rows="2" />
            </v-col>
          </v-row>
        </v-alert>
        <!-- 25 -->
        <v-col cols="12" sm="9">
          <p class="font-weight-black title text-left font-size-50">
            工作場所出入是否未有相關管制措施
          </p>
        </v-col>
        <v-col cols="12" sm="2">
          <v-radio-group dense row class="pa-0 ma-0">
            <v-radio color="success" label="是" value="1"/>
            <v-radio color="success" label="否" value="2"/>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-row no-gutter class="indigo--text darken-2 d-none d-sm-flex font-weight-black">
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">潛在不法侵害風險類型</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">可能性</h3>
              </template>
              <span>(發生機率)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">嚴重性</h3>
              </template>
              <span>(傷害程度)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">風險等級</h3>
          </v-col>
          <v-col cols="12" sm="2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <h3 class="mb-1" v-bind="attrs" v-on="on">現有控制措施</h3>
              </template>
              <span>(工程控制/管理控制/個人防護)</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" sm="2">
            <h3 class="mb-1" v-bind="attrs" v-on="on">應增加或修正相關措施</h3>
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
          class="mb-6 mt-4"
        >
          <v-row no-gutter>
            <!-- <v-col cols="12" sm="3">{{ item.question }}</v-col> -->
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">潛在不法侵害風險類型：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items25[idx].status">
                <v-radio color="red" label="肢體暴力" value="1"/>
                <v-radio color="red" label="心理暴力" value="2"/>
                <v-radio color="red" label="語言暴力" value="3"/>
                <v-radio color="red" label="性騷擾" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">可能性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items25[idx].status2">
                <v-radio color="red" label="可能發生" value="3"/>
                <v-radio color="orange" label="不大可能" value="2"/>
                <v-radio color="success" label="極不可能" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">嚴重性：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items25[idx].status3">
                <v-radio color="red" label="嚴重" value="3"/>
                <v-radio color="orange" label="中度" value="2"/>
                <v-radio color="success" label="輕度" value="1"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">風險等級：</span>
              <v-text-field v-model="setLevel25" solo readonly/>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">現有控制措施：</span>
              <v-radio-group dense row class="pa-0 ma-0" v-model="ipt.items25[idx].status4">
                <v-radio color="success" label="工程控制" value="1"/>
                <v-radio color="success" label="管理控制" value="2"/>
                <v-radio color="success" label="個人防護" value="3"/>
                <v-radio color="success" label="其他" value="4"/>
              </v-radio-group>
            </v-col>
            <v-col cols="12" sm="2">
              <span class="d-sm-none error--text">應增加或修正相關措施：</span>
              <v-textarea auto-grow outlined rows="2" />
            </v-col>
          </v-row>
        </v-alert>
        <v-col cols="12">
          <v-btn large block class="mt-n8 mb-4" color="success">送出表單</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    title: "職場不法侵害預防之危害辨識及風險評估表",
    newText: "評估表",
    isLoading: false,
    disabled: false,
    menu: false, // 時間選單是否顯示
    ipt: {
      department: "",
      name: JSON.parse(localStorage.getItem("user")).name,
      date: new Date().toISOString().substr(0, 10),

      items1: [{ status: "0", status2: "0", status3: "0", status4: "0", note: "" }],
      items2: [{ status: "0", status2: "0", status3: "0", status4: "0", note: "" }],
      items3: [{ status: "0", status2: "0", status3: "0", status4: "0", note: "" }],
      items4: [{ status: "0", status2: "0", status3: "0", status4: "0", note: "" }],
      items5: [{ status: "0", status2: "0", status3: "0", status4: "0", note: "" }],
      items6: [{ status: "0", status2: "0", status3: "0", status4: "0", note: "" }],
      items7: [{ status: "0", status2: "0", status3: "0", status4: "0", note: "" }],
      items8: [{ status: "0", status2: "0", status3: "0", status4: "0", note: "" }],
      items9: [{ status: "0", status2: "0", status3: "0", status4: "0", note: "" }],
      items10: [{ status: "0", status2: "0", status3: "0", status4: "0", note: "" }],
      items11: [{ status: "0", status2: "0", status3: "0", status4: "0", note: "" }],
      items12: [{ status: "0", status2: "0", status3: "0", status4: "0", note: "" }],
      items13: [{ status: "0", status2: "0", status3: "0", status4: "0", note: "" }],
      items14: [{ status: "0", status2: "0", status3: "0", status4: "0", note: "" }],
      items15: [{ status: "0", status2: "0", status3: "0", status4: "0", note: "" }],
      items16: [{ status: "0", status2: "0", status3: "0", status4: "0", note: "" }],
      items17: [{ status: "0", status2: "0", status3: "0", status4: "0", note: "" }],
      items18: [{ status: "0", status2: "0", status3: "0", status4: "0", note: "" }],
      items19: [{ status: "0", status2: "0", status3: "0", status4: "0", note: "" }],
      items20: [{ status: "0", status2: "0", status3: "0", status4: "0", note: "" }],
      items21: [{ status: "0", status2: "0", status3: "0", status4: "0", note: "" }],
      items22: [{ status: "0", status2: "0", status3: "0", status4: "0", note: "" }],
      items23: [{ status: "0", status2: "0", status3: "0", status4: "0", note: "" }],
      items24: [{ status: "0", status2: "0", status3: "0", status4: "0", note: "" }],
      items25: [{ status: "0", status2: "0", status3: "0", status4: "0", note: "" }],
      suggest: "", // 改善建議
      track: "", // 改善追蹤
    },
    items1: [
      {
        question: "111",
      },
    ],
    first: "",
  }),
  computed: {
    setLevel() {
      var level = 0;
      var str = "";
      level = Number(this.ipt.items1[0].status2)*Number(this.ipt.items1[0].status3);
      if(level == 1 || level == 2)//2~1分
        str = "低度"
        else if(level == 3 || level == 4)//4~3分
        str = "中度"
        else if(level >= 6)//9~6分
        str = "高度"
        else//0
        str = ""
      return str;
    },
    setLevel2() {
      var aaa = this.ipt.items2[0];
      var str = "";
      var level = Number(aaa.status2)*Number(aaa.status3);
      if(level == 1 || level == 2)//2~1分
        str = "低度"
        else if(level == 3 || level == 4)//4~3分
        str = "中度"
        else if(level >= 6)//9~6分
        str = "高度"
        else//0
        str = ""
      return str;
    },
    setLevel3() {
      var aaa = this.ipt.items3[0];
      var str = "";
      var level = Number(aaa.status2)*Number(aaa.status3);
      if(level == 1 || level == 2)//2~1分
        str = "低度"
        else if(level == 3 || level == 4)//4~3分
        str = "中度"
        else if(level >= 6)//9~6分
        str = "高度"
        else//0
        str = ""
      return str;
    },
    setLevel4() {
      var aaa = this.ipt.items4[0];
      var str = "";
      var level = Number(aaa.status2)*Number(aaa.status3);
      if(level == 1 || level == 2)//2~1分
        str = "低度"
        else if(level == 3 || level == 4)//4~3分
        str = "中度"
        else if(level >= 6)//9~6分
        str = "高度"
        else//0
        str = ""
      return str;
    },
    setLevel5() {
      var aaa = this.ipt.items5[0];
      var str = "";
      var level = Number(aaa.status2)*Number(aaa.status3);
      if(level == 1 || level == 2)//2~1分
        str = "低度"
        else if(level == 3 || level == 4)//4~3分
        str = "中度"
        else if(level >= 6)//9~6分
        str = "高度"
        else//0
        str = ""
      return str;
    },
    setLevel6() {
      var aaa = this.ipt.items6[0];
      var str = "";
      var level = Number(aaa.status2)*Number(aaa.status3);
      if(level == 1 || level == 2)//2~1分
        str = "低度"
        else if(level == 3 || level == 4)//4~3分
        str = "中度"
        else if(level >= 6)//9~6分
        str = "高度"
        else//0
        str = ""
      return str;
    },
    setLevel7() {
      var aaa = this.ipt.items7[0];
      var str = "";
      var level = Number(aaa.status2)*Number(aaa.status3);
      if(level == 1 || level == 2)//2~1分
        str = "低度"
        else if(level == 3 || level == 4)//4~3分
        str = "中度"
        else if(level >= 6)//9~6分
        str = "高度"
        else//0
        str = ""
      return str;
    },
    setLevel8() {
      var aaa = this.ipt.items8[0];
      var str = "";
      var level = Number(aaa.status2)*Number(aaa.status3);
      if(level == 1 || level == 2)//2~1分
        str = "低度"
        else if(level == 3 || level == 4)//4~3分
        str = "中度"
        else if(level >= 6)//9~6分
        str = "高度"
        else//0
        str = ""
      return str;
    },
    setLevel9() {
      var aaa = this.ipt.items9[0];
      var str = "";
      var level = Number(aaa.status2)*Number(aaa.status3);
      if(level == 1 || level == 2)//2~1分
        str = "低度"
        else if(level == 3 || level == 4)//4~3分
        str = "中度"
        else if(level >= 6)//9~6分
        str = "高度"
        else//0
        str = ""
      return str;
    },
    setLevel10() {
      var aaa = this.ipt.items10[0];
      var str = "";
      var level = Number(aaa.status2)*Number(aaa.status3);
      if(level == 1 || level == 2)//2~1分
        str = "低度"
        else if(level == 3 || level == 4)//4~3分
        str = "中度"
        else if(level >= 6)//9~6分
        str = "高度"
        else//0
        str = ""
      return str;
    },
    setLevel11() {
      var aaa = this.ipt.items11[0];
      var str = "";
      var level = Number(aaa.status2)*Number(aaa.status3);
      if(level == 1 || level == 2)//2~1分
        str = "低度"
        else if(level == 3 || level == 4)//4~3分
        str = "中度"
        else if(level >= 6)//9~6分
        str = "高度"
        else//0
        str = ""
      return str;
    },
    setLevel12() {
      var aaa = this.ipt.items12[0];
      var str = "";
      var level = Number(aaa.status2)*Number(aaa.status3);
      if(level == 1 || level == 2)//2~1分
        str = "低度"
        else if(level == 3 || level == 4)//4~3分
        str = "中度"
        else if(level >= 6)//9~6分
        str = "高度"
        else//0
        str = ""
      return str;
    },
    setLevel13() {
      var aaa = this.ipt.items13[0];
      var str = "";
      var level = Number(aaa.status2)*Number(aaa.status3);
      if(level == 1 || level == 2)//2~1分
        str = "低度"
        else if(level == 3 || level == 4)//4~3分
        str = "中度"
        else if(level >= 6)//9~6分
        str = "高度"
        else//0
        str = ""
      return str;
    },
    setLevel14() {
      var aaa = this.ipt.items14[0];
      var str = "";
      var level = Number(aaa.status2)*Number(aaa.status3);
      if(level == 1 || level == 2)//2~1分
        str = "低度"
        else if(level == 3 || level == 4)//4~3分
        str = "中度"
        else if(level >= 6)//9~6分
        str = "高度"
        else//0
        str = ""
      return str;
    },
    setLevel15() {
      var aaa = this.ipt.items15[0];
      var str = "";
      var level = Number(aaa.status2)*Number(aaa.status3);
      if(level == 1 || level == 2)//2~1分
        str = "低度"
        else if(level == 3 || level == 4)//4~3分
        str = "中度"
        else if(level >= 6)//9~6分
        str = "高度"
        else//0
        str = ""
      return str;
    },
    setLevel16() {
      var aaa = this.ipt.items16[0];
      var str = "";
      var level = Number(aaa.status2)*Number(aaa.status3);
      if(level == 1 || level == 2)//2~1分
        str = "低度"
        else if(level == 3 || level == 4)//4~3分
        str = "中度"
        else if(level >= 6)//9~6分
        str = "高度"
        else//0
        str = ""
      return str;
    },
    setLevel17() {
      var aaa = this.ipt.items17[0];
      var str = "";
      var level = Number(aaa.status2)*Number(aaa.status3);
      if(level == 1 || level == 2)//2~1分
        str = "低度"
        else if(level == 3 || level == 4)//4~3分
        str = "中度"
        else if(level >= 6)//9~6分
        str = "高度"
        else//0
        str = ""
      return str;
    },
    setLevel18() {
      var aaa = this.ipt.items18[0];
      var str = "";
      var level = Number(aaa.status2)*Number(aaa.status3);
      if(level == 1 || level == 2)//2~1分
        str = "低度"
        else if(level == 3 || level == 4)//4~3分
        str = "中度"
        else if(level >= 6)//9~6分
        str = "高度"
        else//0
        str = ""
      return str;
    },
    setLevel19() {
      var aaa = this.ipt.items19[0];
      var str = "";
      var level = Number(aaa.status2)*Number(aaa.status3);
      if(level == 1 || level == 2)//2~1分
        str = "低度"
        else if(level == 3 || level == 4)//4~3分
        str = "中度"
        else if(level >= 6)//9~6分
        str = "高度"
        else//0
        str = ""
      return str;
    },
    setLevel20() {
      var aaa = this.ipt.items20[0];
      var str = "";
      var level = Number(aaa.status2)*Number(aaa.status3);
      if(level == 1 || level == 2)//2~1分
        str = "低度"
        else if(level == 3 || level == 4)//4~3分
        str = "中度"
        else if(level >= 6)//9~6分
        str = "高度"
        else//0
        str = ""
      return str;
    },
    setLevel21() {
      var aaa = this.ipt.items21[0];
      var str = "";
      var level = Number(aaa.status2)*Number(aaa.status3);
      if(level == 1 || level == 2)//2~1分
        str = "低度"
        else if(level == 3 || level == 4)//4~3分
        str = "中度"
        else if(level >= 6)//9~6分
        str = "高度"
        else//0
        str = ""
      return str;
    },
    setLevel22() {
      var aaa = this.ipt.items22[0];
      var str = "";
      var level = Number(aaa.status2)*Number(aaa.status3);
      if(level == 1 || level == 2)//2~1分
        str = "低度"
        else if(level == 3 || level == 4)//4~3分
        str = "中度"
        else if(level >= 6)//9~6分
        str = "高度"
        else//0
        str = ""
      return str;
    },
    setLevel23() {
      var aaa = this.ipt.items23[0];
      var str = "";
      var level = Number(aaa.status2)*Number(aaa.status3);
      if(level == 1 || level == 2)//2~1分
        str = "低度"
        else if(level == 3 || level == 4)//4~3分
        str = "中度"
        else if(level >= 6)//9~6分
        str = "高度"
        else//0
        str = ""
      return str;
    },
    setLevel24() {
      var aaa = this.ipt.items24[0];
      var str = "";
      var level = Number(aaa.status2)*Number(aaa.status3);
      if(level == 1 || level == 2)//2~1分
        str = "低度"
        else if(level == 3 || level == 4)//4~3分
        str = "中度"
        else if(level >= 6)//9~6分
        str = "高度"
        else//0
        str = ""
      return str;
    },
    setLevel25() {
      var aaa = this.ipt.items25[0];
      var str = "";
      var level = Number(aaa.status2)*Number(aaa.status3);
      if(level == 1 || level == 2)//2~1分
        str = "低度"
        else if(level == 3 || level == 4)//4~3分
        str = "中度"
        else if(level >= 6)//9~6分
        str = "高度"
        else//0
        str = ""
      return str;
    },
  },
};
</script>