// -------- 行車安全資訊管理 -------
export const CarSafeInfoRouter = [
    // ------------- 安全資訊 -------------
    {
        linkText: '安全資訊查詢',  // 搜尋頁
        path: '/smis/car-safeinfo/info',
        component: () => import('@/views/smis/carSafeInfo/info/Search.vue')
    },
    {
        linkText: '新增', 
        path: '/smis/car-safeinfo/info/add',
        component: () => import('@/views/smis/carSafeInfo/info/Form.vue')
    },
    {
        linkText: '編輯', 
        path: '/smis/car-safeinfo/info/:id/edit',
        component: () => import('@/views/smis/carSafeInfo/info/Form.vue')
    },
    {
        linkText: '詳細資訊', 
        path: '/smis/car-safeinfo/info/:id/show',
        component: () => import('@/views/smis/carSafeInfo/info/PageRouter.vue')
    },
    // {
    //     linkText: '審核中',
    //     path: '/smis/car-safeinfo/info/:id/review',
    //     component: () => import('@/views/smis/carSafeInfo/info/ReviewComplated.vue'),
    //     props: { closeStatus: 2 }
    // },
    // {
    //     linkText: '加會中',
    //     path: '/smis/car-safeinfo/info/:id/join',
    //     component: () => import('@/views/smis/carSafeInfo/info/ReviewComplated.vue'),
    //     props: { closeStatus: 3 }
    // },
    // {
    //     linkText: '已發布',
    //     path: '/smis/car-safeinfo/info/:id/complated',
    //     component: () => import('@/views/smis/carSafeInfo/info/ReviewComplated.vue'),
    //     props: { closeStatus: 4 }
    // },
    // {
    //     linkText: '安全資訊讀取追蹤',  // 已合併至「已發布內」
    //     path: '/smis/car-safeinfo/info/:id/read-track',
    //     component: () => import('@/views/smis/carSafeInfo/info/ReadTrack.vue')
    // },

    // ------------- 慢行通報 -------------
    {
        linkText: '慢行通報查詢',
        path: '/smis/car-safeinfo/crawl-notify',
        component: () => import('@/views/smis/carSafeInfo/crawlNotify/Search.vue')
    },
    {
        linkText: '慢行通報新增',
        path: '/smis/car-safeinfo/crawl-notify/add',
        component: () => import('@/views/smis/carSafeInfo/crawlNotify/Form.vue')
    },
    {
        linkText: '慢行通報編輯',
        path: '/smis/car-safeinfo/crawl-notify/:id/edit',
        component: () => import('@/views/smis/carSafeInfo/crawlNotify/Edit.vue'),
        props: true,
    },
    {
        linkText: '慢行通報讀取追蹤',
        path: '/smis/car-safeinfo/crawl-notify/:id/read-track',
        component: () => import('@/views/smis/carSafeInfo/crawlNotify/ReadTrack.vue'),
        props: true
    },
]