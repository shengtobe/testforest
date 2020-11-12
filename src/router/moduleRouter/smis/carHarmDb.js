// -------- 行車危害資料庫 -------
export const CarHarmdbRouter = [
    // ------------- 行車危害 ----------------------
    {
        linkText: '行車危害',  // 搜尋頁
        path: '/smis/car-harmdb/harms',
        component: () => import('@/views/smis/carHarmDatabase/harms/Search.vue')
    },
    {
        linkText: '新增',
        path: '/smis/car-harmdb/harms/add',
        component: () => import('@/views/smis/carHarmDatabase/harms/Form.vue')
    },
    {
        linkText: '編輯',
        path: '/smis/car-harmdb/harms/:id/edit',
        component: () => import('@/views/smis/carHarmDatabase/harms/Form.vue')
    },
    {
        linkText: '已立案',
        path: '/smis/car-harmdb/harms/:id/show',
        component: () => import('@/views/smis/carHarmDatabase/harms/Show.vue')
    },
    {
        linkText: '審核中',  // 審核完備資料
        path: '/smis/car-harmdb/harms/:id/review',
        component: () => import('@/views/smis/carHarmDatabase/harms/ReviewComplated.vue'),
        props: { closeStatus: 2 }
    },
    {
        linkText: '已完備資料',
        path: '/smis/car-harmdb/harms/:id/complated',
        component: () => import('@/views/smis/carHarmDatabase/harms/ReviewComplated.vue'),
        props: { closeStatus: 3 }
    },
    {
        linkText: '審核中',  // 審核風險已可接受
        path: '/smis/car-harmdb/harms/:id/fulfill-review',
        component: () => import('@/views/smis/carHarmDatabase/harms/Fulfill.vue'),
        props: { closeStatus: 4 }
    },
    {
        linkText: '風險已可接受',
        path: '/smis/car-harmdb/harms/:id/fulfill-complated',
        component: () => import('@/views/smis/carHarmDatabase/harms/Fulfill.vue'),
        props: { closeStatus: 5 }
    },
    {
        linkText: '審核中',  // 審核更新
        path: '/smis/car-harmdb/harms/:id/update-review',
        component: () => import('@/views/smis/carHarmDatabase/harms/UpdateReview.vue'),
        props: { closeStatus: 6 }
    },
    {
        linkText: '審核中',  // 審核作廢
        path: '/smis/car-harmdb/harms/:id/invalid',
        component: () => import('@/views/smis/carHarmDatabase/harms/Fulfill.vue'),
        props: { closeStatus: 7 }
    },
    {
        linkText: '危害更新',  // 增加新版本
        path: '/smis/car-harmdb/harms/:id/update',
        component: () => import('@/views/smis/carHarmDatabase/harms/Update.vue')
    },
    
    
    // ------------- 危害控制措施 ----------------------
    {
        linkText: '危害控制措施',  // 搜尋頁
        path: '/smis/car-harmdb/control-measures',
        component: () => import('@/views/smis/carHarmDatabase/controlMeasures/Search.vue')
    },
    {
        linkText: '新增',
        path: '/smis/car-harmdb/control-measures/add',
        component: () => import('@/views/smis/carHarmDatabase/controlMeasures/Form.vue')
    },
    {
        linkText: '新增2',
        path: '/smis/car-harmdb/control-measures/add2',
        component: () => import('@/views/smis/carHarmDatabase/controlMeasures/Form2.vue')
    },
    {
        linkText: '新增3',
        path: '/smis/car-harmdb/control-measures/add3',
        component: () => import('@/views/smis/carHarmDatabase/controlMeasures/Form3.vue')
    },
    {
        linkText: '新增4',
        path: '/smis/car-harmdb/control-measures/add4',
        component: () => import('@/views/smis/carHarmDatabase/controlMeasures/Form4.vue')
    },
    {
        linkText: '編輯',
        path: '/smis/car-harmdb/control-measures/:id/edit',
        component: () => import('@/views/smis/carHarmDatabase/controlMeasures/Form.vue')
    },
]