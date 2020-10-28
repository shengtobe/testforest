<template>
<v-app>
  <SystemDialog />
  <SystemLoading />
  <SystemViewDialog />
  <MessageBar />

  <!-- app-bar -->
  <v-app-bar app dark clipped-left :color="mainColor" dense
    id="main-bar"
  >
    <v-app-bar-nav-icon
        @click.stop="showNav = true"
        v-if="!showNav"
    />

    <v-btn icon
        @click.stop="showNav = false"
        v-else
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <v-toolbar-title>林鐵資訊管理系統</v-toolbar-title>
    
    <v-spacer></v-spacer>

    <v-btn icon @click="logout">
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </v-app-bar>

  <!-- fullscreen nav -->
  <div id="main-nav" :class="{ shownav: showNav }">
      <!-- desktop -->
      <template>
            <v-container>
                <v-row class="mt-12">
                    <v-col cols="12" md="2">
                        <p class="text-h5 font-weight-black">常用功能</p>

                        <v-card outlined tile>
                            <v-list-item :class="titleColor" disabled>
                                <strong class="white--text">功能列表</strong>
                            </v-list-item>
                            <v-divider></v-divider>

                            <v-list class="pa-0">
                                <v-list-item to="/smis/car-safe-performance/moto-dynamo">個人資訊</v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/machine-abnormal">表單</v-list-item>
                                <v-divider></v-divider>

                                <!-- 故障、保養工單 -->
                                <v-list-item :class="titleColor" disabled>
                                    <strong class="white--text">故障、保養工單</strong>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/moto-dynamo">維修養護科類工單</v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/machine-abnormal">服務科類工單</v-list-item>
                                <v-divider></v-divider>

                                <!-- 監控系統 -->
                                <v-list-item :class="titleColor" disabled>
                                    <strong class="white--text">監控系統</strong>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/moto-dynamo">邊坡監控</v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/machine-abnormal">雨量監測</v-list-item>
                                <v-divider></v-divider>
                            </v-list>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="2">
                        <p class="text-h5 font-weight-black">安全資訊管理</p>

                        <v-card outlined tile>
                            <v-list class="pa-0">
                                <!-- 危害通報管理 -->
                                <v-list-item :class="titleColor" disabled>
                                    <strong class="white--text">危害通報管理</strong>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/moto-dynamo">危害通報</v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/machine-abnormal">危害通報審核</v-list-item>
                                <v-divider></v-divider>

                                <!-- 行車事故事件 -->
                                <v-list-item :class="titleColor" disabled>
                                    <strong class="white--text">行車事故事件</strong>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/moto-dynamo">行車事故事件</v-list-item>
                                <v-divider></v-divider>

                                <!-- 行車危害資料庫 -->
                                <v-list-item :class="titleColor" disabled>
                                    <strong class="white--text">行車危害資料庫</strong>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/moto-dynamo">行車危害</v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/machine-abnormal">控制措施</v-list-item>
                                <v-divider></v-divider>
                            </v-list>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="2">
                        <v-card outlined tile class="mt-sm-12">
                            <v-list class="pa-0">
                                <!-- 行車安全資訊 -->
                                <v-list-item :class="titleColor" disabled>
                                    <strong class="white--text">行車安全資訊</strong>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/moto-dynamo">安全資訊</v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/machine-abnormal">慢行通報</v-list-item>
                                <v-divider></v-divider>

                                <!-- 安全文件 -->
                                <v-list-item :class="titleColor" disabled>
                                    <strong class="white--text">安全文件</strong>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/moto-dynamo">安全會議文件</v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/machine-abnormal">行車事故事件附件</v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/machine-abnormal">規章文件</v-list-item>
                                <v-divider></v-divider>

                                <!-- 行車安全績效 -->
                                <v-list-item :class="titleColor" disabled>
                                    <strong class="white--text">行車安全績效</strong>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/moto-dynamo">行車安全績效</v-list-item>
                            </v-list>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="2">
                        <v-card outlined tile class="mt-sm-12">
                            <v-list class="pa-0">
                                <!-- 職安管理 -->
                                <v-list-item :class="titleColor" disabled>
                                    <strong class="white--text">職安管理</strong>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/moto-dynamo">職業災害事故調查表</v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/machine-abnormal">職災事故事件管理</v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/machine-abnormal">職災危害資料庫</v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/machine-abnormal">職安績效</v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/machine-abnormal">健檢管理</v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/machine-abnormal">證照管理</v-list-item>
                            </v-list>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="2">
                        <p class="text-h5 font-weight-black">設備養護管理</p>

                        <v-card outlined tile>
                            <v-list class="pa-0">
                                <!-- 設備資料管理 -->
                                <v-list-item :class="titleColor" disabled>
                                    <strong class="white--text">設備資料管理</strong>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/moto-dynamo">列車、軌道、車道設備</v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/machine-abnormal">無線電設備管理</v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/machine-abnormal">料件管理</v-list-item>
                                <v-divider></v-divider>

                                <!-- 設備維修管理 -->
                                <v-list-item :class="titleColor" disabled>
                                    <strong class="white--text">設備維修管理</strong>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/moto-dynamo">週期性工作提醒</v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/moto-dynamo">工班管理</v-list-item>
                                <v-divider></v-divider>

                                <!-- 維修外包管理 -->
                                <v-list-item :class="titleColor" disabled>
                                    <strong class="white--text">維修外包管理</strong>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/moto-dynamo">維修外包管理</v-list-item>
                            </v-list>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="2">
                        <v-card outlined tile class="mt-sm-12">
                            <v-list class="pa-0">
                                <!-- 統計分析 -->
                                <v-list-item :class="titleColor" disabled>
                                    <strong class="white--text">統計分析</strong>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/moto-dynamo">MTTR 分析</v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/machine-abnormal">MTBF 分析</v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/machine-abnormal">MKBF 分析</v-list-item>
                                <v-divider></v-divider>

                                <!-- 報表管理 -->
                                <v-list-item :class="titleColor" disabled>
                                    <strong class="white--text">報表管理</strong>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/moto-dynamo">維修工時履歷</v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/machine-abnormal">料件履歷</v-list-item>
                                <v-divider></v-divider>
                                <v-list-item to="/smis/car-safe-performance/machine-abnormal">維修費用</v-list-item>
                                <v-divider></v-divider>
                            </v-list>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
      </template>

      <!-- desktop -->
      <template>

      </template>
  </div>

  <!-- right main content -->
  <v-main>
    <!-- 組織表先暫時關閉，方便開放demo畫面 -->
    <!-- <OrganizeDialog /> -->
    <router-view></router-view>
  </v-main>
</v-app>
</template>

<script>
import SystemDialog from '@/components/SystemDialog.vue'
import SystemLoading from '@/components/SystemLoading.vue'
import SystemViewDialog from '@/components/SystemViewDialog.vue'
import OrganizeDialog from '@/components/OrganizeDialog.vue'
import MessageBar from '@/components/MessageBar.vue'

export default {
  data: () => ({
    mainColor: 'light-blue darken-1',
    showNav: true,
    titleColor: 'brown lighten-1',
  }),
  components: {
    SystemDialog,  // 系統重要訊息 Dialog
    SystemLoading,  // 系統 Loading 圖
    SystemViewDialog,  // 系統檢視內容 Dialog
    OrganizeDialog,  // 組職表 Dialog
    MessageBar,  // 題示訊息
  },
  methods: {
    // 登出
    logout() {
      localStorage.clear()  // 清除所有 localstorage
      this.$router.push('/login')
    }
  }
}
</script>