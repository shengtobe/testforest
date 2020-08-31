// -------- 行車事故事件管理 -------
export const CarAccidentEventRouter = [
     {
        linkText: '人員傷亡名單查詢',  // 首頁
        path: '/smis/car-accident-event',
        component: () => import('@/views/smis/carAccidentEvent/Search.vue')
    },
    {
        linkText: '事故事件新增',
        path: '/smis/car-accident-event/add',
        component: () => import('@/views/smis/carAccidentEvent/Form.vue')
    },
    {
        linkText: '事故事件詳細內容',  // 已立案
        path: '/smis/car-accident-event/:id/show', 
        component: () => import('@/views/smis/carAccidentEvent/Show.vue')
    },
    {
        linkText: '編輯事故事件',
        path: '/smis/car-accident-event/:id/edit', 
        component: () => import('@/views/smis/carAccidentEvent/Form.vue')
    },
    {
        linkText: '人員傷亡名單',
        path: '/smis/car-accident-event/:id/person-casualty',
        component: () => import('@/views/smis/carAccidentEvent/PersonCasualty.vue')
    },
    {
        linkText: '行安改善措施',
        path: '/smis/car-accident-event/:id/driving-improve',
        component: () => import('@/views/smis/carAccidentEvent/DrivingImprove.vue')
    },
    {
        linkText: '審核中',  // 審核中 (審核完備資料)
        path: '/smis/car-accident-event/:id/review',
        component: () => import('@/views/smis/carAccidentEvent/ReviewComplated.vue'),
        props: { closeStatus: 2 }
    },
    {
        linkText: '已完備資料',
        path: '/smis/car-accident-event/:id/complated',
        component: () => import('@/views/smis/carAccidentEvent/ReviewComplated.vue'),
        props: { closeStatus: 3 }
    },
    {
        linkText: '審核中',  // 審核中 (審核措施落實)
        path: '/smis/car-accident-event/:id/fulfill-review',
        component: () => import('@/views/smis/carAccidentEvent/Fulfill.vue'),
        props: { closeStatus: 4 }
    },
    {
        linkText: '改善措施已落實',
        path: '/smis/car-accident-event/:id/fulfill-complated',
        component: () => import('@/views/smis/carAccidentEvent/Fulfill.vue'),
        props: { closeStatus: 5 }
    },
    {
        linkText: '刪除回復',
        path: '/smis/car-accident-event/del-recovery',
        component: () => import('@/views/smis/carAccidentEvent/DelRecovery.vue')
    },
    {
        linkText: '各大類事故事件趨勢圖',
        path: '/smis/car-accident-event/maintype-chart',
        component: () => import('@/views/smis/carAccidentEvent/MainTypeChart.vue')
    },
    {
        linkText: '重大事故類事故事件趨勢圖',
        path: '/smis/car-accident-event/majortype-chart',
        component: () => import('@/views/smis/carAccidentEvent/MajorTypeChart.vue')
    },
    {
        linkText: '一般事故類事故事件趨勢圖',
        path: '/smis/car-accident-event/generaltype-chart',
        component: () => import('@/views/smis/carAccidentEvent/GeneralTypeChart.vue')
    },
    {
        linkText: '異常事件類事故事件趨勢圖',
        path: '/smis/car-accident-event/abnormaltype-chart',
        component: () => import('@/views/smis/carAccidentEvent/AbnormalTypeChart.vue')
    },
]