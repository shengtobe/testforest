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
import { MmisRouter } from './moduleRouter/mmis'
import { WorkListRouter } from './moduleRouter/workList'
import { FormManageRouter } from './moduleRouter/formManage'
import { FormCuringRouter } from './moduleRouter/form/curing'
import { FormLaborRouter } from './moduleRouter/form/labor'
import { FormMaintainRouter } from './moduleRouter/form/maintain'
import { FormServeRouter } from './moduleRouter/form/serve'
import { MonitorRouter } from './moduleRouter/monitor'

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

      ...MmisRouter,  // 設備養護系統
      ...WorkListRouter,  // 工單
      ...FormManageRouter,  // 表單管理

      // ------ 各科室表單 ------ 
      ...FormCuringRouter,  // 車輛養護科
      ...FormLaborRouter,  // 勞安
      ...FormMaintainRouter,  // 鐵路維護科
      ...FormServeRouter,  // 服務科

      ...MonitorRouter,  // 監控系統
    ],
    beforeEnter: (to, from, next) => {
      // 檢查是否登入
      if (!localStorage.getItem('isLogined')) next({ path: '/login' })
      else next()
    }
  },
  {
    path: '/error',
    component: () => import('../views/Error.vue')
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
