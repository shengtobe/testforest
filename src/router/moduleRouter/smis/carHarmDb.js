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
        linkText: '待送審',  // 詳細內容
        path: '/smis/car-harmdb/harms/:id/show',
        component: () => import('@/views/smis/carHarmDatabase/harms/Show.vue')
    },
    {
        linkText: '審核中',
        path: '/smis/car-harmdb/harms/:id/review',
        component: () => import('@/views/smis/carHarmDatabase/harms/ReviewComplated.vue'),
        props: { closeStatus: '審核中' }
    },
    {
        linkText: '已核定',
        path: '/smis/car-harmdb/harms/:id/complated',
        component: () => import('@/views/smis/carHarmDatabase/harms/ReviewComplated.vue'),
        props: { closeStatus: '已核定' }
    },
    {
        linkText: '申請作廢中',
        path: '/smis/car-harmdb/harms/:id/invalid',
        component: () => import('@/views/smis/carHarmDatabase/harms/ReviewComplated.vue'),
        props: { closeStatus: '申請作廢中' }
    },
    {
        linkText: '危害更新',  // 增加新版本
        path: '/smis/car-harmdb/harms/:id/update',
        component: () => import('@/views/smis/carHarmDatabase/harms/Update.vue')
    },
    {
        linkText: '危害更新核定',  // 更新審核中
        path: '/smis/car-harmdb/harms/:id/update-review',
        component: () => import('@/views/smis/carHarmDatabase/harms/UpdateReview.vue')
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
        linkText: '編輯',
        path: '/smis/car-harmdb/control-measures/:id/edit',
        component: () => import('@/views/smis/carHarmDatabase/controlMeasures/Form.vue')
    },
]