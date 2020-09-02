import Vue from 'vue'
import VueRouter from 'vue-router'
// 匯入路由表
import { ProfileRouter } from './moduleRouter/profile'
import { AccessRouter } from './moduleRouter/access'
import { CarHarmdbRouter } from './moduleRouter/smis/carHarmDb'
import { HarmnotifyRouter } from './moduleRouter/smis/harmNotify'
import { CarAccidentEventRouter } from './moduleRouter/smis/carAccidentEvent'
import { CarSafePerformanceRouter } from './moduleRouter/smis/carSafePerformance'
import { CarSafeInfoRouter } from './moduleRouter/smis/carSafeInfo'
import { SafeFileRouter } from './moduleRouter/smis/safeFile'
import { JobSafetyRouter } from './moduleRouter/smis/jobSafety'
import { EqInfoRouter } from './moduleRouter/eqInfo'
import { EqRepairRouter } from './moduleRouter/eqRepair'
import { EqRepairOutRouter } from './moduleRouter/eqRepairOut'
import { RepairAnalysisRouter } from './moduleRouter/repairAnalysis'
import { WorkListRouter } from './moduleRouter/workList'
import { FormManageRouter } from './moduleRouter/formManage'
import { LicenseRouter } from './moduleRouter/license'
import { MonitorRouter } from './moduleRouter/monitor'

import { DemoFormRouter } from './moduleRouter/demoForm'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    beforeEnter: (to, from, next) => {
      // 若已登入，重導至首頁
      if (localStorage.getItem('isLogined')) next('/')
      else next()
    }
  },
  {
    path: '/',
    component: () => import('../views/Manage.vue'),
    children: [
      ...ProfileRouter,  // 個人資訊管理 (含首頁)
      ...AccessRouter,  // 權限管理

      // ------ smis ------
      ...HarmnotifyRouter,  // 危害通報管理
      ...CarAccidentEventRouter,  // 行車事故事件管理
      ...CarHarmdbRouter,  // 行車危害資料庫
      ...CarSafeInfoRouter,  // 行車安全資訊管理
      ...SafeFileRouter,  // 安全文件管理
      ...CarSafePerformanceRouter,  // 行車安全績效管理
      ...JobSafetyRouter,  // 職安管理

      ...EqInfoRouter,  // 設備資料管理
      ...EqRepairRouter,  // 設備維修管理
      ...EqRepairOutRouter,  // 設備維修外包
      ...RepairAnalysisRouter,  // 維修統計分析
      ...WorkListRouter,  // 工單
      ...FormManageRouter,  // 表單
      ...LicenseRouter,  // 證照管理
      ...MonitorRouter,  // 監控系統
      ...DemoFormRouter,  // demo 表單
    ],
    beforeEnter: (to, from, next) => {
      // 檢查是否登入
      if (!localStorage.getItem('isLogined')) next({ path: '/login' })
      else next()
    }
  },
  {
    path: '*',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }     // 進入任何路由捲軸都會在最上方 (上、下頁除外)
  }
})

export default router
