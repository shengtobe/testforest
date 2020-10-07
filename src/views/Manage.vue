<template>
<v-app>
  <SystemDialog />
  <SystemLoading />
  <SystemViewDialog />
  <MessageBar />

  <!-- left sidebar -->
  <!-- <v-navigation-drawer app clipped width="288" dark -->
  <v-navigation-drawer app clipped width="275" dark
    v-model="drawer"
  >
    <ProfileNav />
    <v-divider></v-divider>

    <!-- <AccessNav />
    <v-divider></v-divider> -->

    <SmisNav />
    <v-divider></v-divider>

    <MmisNav />
    <v-divider></v-divider>

    <!-- <EqInfoNav />
    <v-divider></v-divider>

    <EqRepairNav />
    <v-divider></v-divider>

    <EqRepairOutNav />
    <v-divider></v-divider>

    <RepairAnalysisNav />
    <v-divider></v-divider> -->

    <WorkListNav />
    <v-divider></v-divider>

    <!-- 表單管理 -->
    <v-list-item to="/form-manage" class="white--text">
      <v-list-item-icon>
        <v-icon>mdi-file</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>表單</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>

    <!-- 監控系統 -->
    <v-list-item to="/monitor" class="white--text">
      <v-list-item-icon>
        <v-icon>mdi-eye</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>監控系統</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>

    <!-- 證照管理，先放這 -->
    <!-- <v-list-item to="/license" class="white--text">
      <v-list-item-icon>
        <v-icon>mdi-file-multiple</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
          <v-list-item-title>證照管理</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider> -->
  </v-navigation-drawer>


  <!-- app-bar -->
  <v-app-bar app dark clipped-left :color="mainColor" dense>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-toolbar-title>林鐵資訊管理系統</v-toolbar-title>
    
    <v-spacer></v-spacer>

    <v-btn icon @click="logout">
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </v-app-bar>

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
import ProfileNav from '@/components/navs/ProfileNav.vue'
import AccessNav from '@/components/navs/AccessNav.vue'
import SmisNav from '@/components/navs/SmisNav.vue'
import MmisNav from '@/components/navs/MmisNav.vue'
// import EqInfoNav from '@/components/navs/EqInfoNav.vue'
// import EqRepairNav from '@/components/navs/EqRepairNav.vue'
// import EqRepairOutNav from '@/components/navs/EqRepairOutNav.vue'
// import RepairAnalysisNav from '@/components/navs/RepairAnalysisNav.vue'
import WorkListNav from '@/components/navs/WorkListNav.vue'

export default {
  data: () => ({
    mainColor: 'light-blue darken-1',
    drawer: null,
  }),
  components: {
    SystemDialog,  // 系統重要訊息 Dialog
    SystemLoading,  // 系統 Loading 圖
    SystemViewDialog,  // 系統檢視內容 Dialog
    OrganizeDialog,  // 組職表 Dialog
    MessageBar,  // 題示訊息
    ProfileNav,  // (sidebar) 個人資訊管理
    AccessNav,  // (sidebar) 權限管理
    SmisNav,  // (sidebar) SMIS
    // EqInfoNav,  // (sidebar) 設備資料管理
    // EqRepairNav,  // (sidebar) 設備維修管理
    // EqRepairOutNav,  // (sidebar) 設備維修外包
    // RepairAnalysisNav,  // (sidebar) 維修統計分析
    MmisNav,  // (sidebar) 設備養護
    WorkListNav,  // (sidebar) 工單
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