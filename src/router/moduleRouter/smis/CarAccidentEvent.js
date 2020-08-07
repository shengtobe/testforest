// -------- 行車事故事件管理 -------

export const CarAccidentEventRouter = [
     {
        linkText: '人員傷亡名單查詢',  // 首頁
        path: '/smis/car-accident-event',
        component: () => import('@/views/smis/CarAccidentEvent/Search.vue')
    },
    {
        linkText: '事故事件新增',
        path: '/smis/car-accident-event/add',
        component: () => import('@/views/smis/CarAccidentEvent/Form.vue')
    },
    {
        linkText: '事故事件詳細內容',
        path: '/smis/car-accident-event/:id/show', 
        component: () => import('@/views/smis/CarAccidentEvent/Show.vue')
    },
    {
        linkText: '編輯事故事件',
        path: '/smis/car-accident-event/:id/edit', 
        component: () => import('@/views/smis/CarAccidentEvent/Form.vue')
    },
    {
        linkText: '人員傷亡名單',
        path: '/smis/car-accident-event/:id/person-casualty',
        component: () => import('@/views/smis/CarAccidentEvent/PersonCasualty.vue')
    },
    {
        linkText: '行安改善措施',
        path: '/smis/car-accident-event/:id/driving-improve',
        component: () => import('@/views/smis/CarAccidentEvent/DrivingImprove.vue')
    },
    {
        linkText: '審核中',  // 申請結案中
        path: '/smis/car-accident-event/:id/review',
        component: () => import('@/views/smis/CarAccidentEvent/ReviewComplated.vue'),
        props: { closeStatus: '申請結案中' }
    },
    {
        linkText: '已結案',  // 已結案
        path: '/smis/car-accident-event/:id/complated',
        component: () => import('@/views/smis/CarAccidentEvent/ReviewComplated.vue'),
        props: { closeStatus: '已結案' }
    },
    {
        linkText: '行安改善措施',
        path: '/smis/car-accident-event/del-recovery',
        component: () => import('@/views/smis/CarAccidentEvent/DelRecovery.vue')
    },
    {
        linkText: '各大類事故事件趨勢圖',
        path: '/smis/car-accident-event/maintype-chart',
        component: () => import('@/views/smis/CarAccidentEvent/MainTypeChart.vue')
    },
    {
        linkText: '重大事故類事故事件趨勢圖',
        path: '/smis/car-accident-event/majortype-chart',
        component: () => import('@/views/smis/CarAccidentEvent/MajorTypeChart.vue')
    },
    {
        linkText: '一般事故類事故事件趨勢圖',
        path: '/smis/car-accident-event/generaltype-chart',
        component: () => import('@/views/smis/CarAccidentEvent/GeneralTypeChart.vue')
    },
    {
        linkText: '異常事件類事故事件趨勢圖',
        path: '/smis/car-accident-event/abnormaltype-chart',
        component: () => import('@/views/smis/CarAccidentEvent/AbnormalTypeChart.vue')
    },
]