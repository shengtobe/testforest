// -------- 行車安全資訊管理 -------
export const CarSafeInfoRouter = [
    // ------------- 安全資訊 -------------
    {
        linkText: '安全資訊查詢',  // 搜尋頁
        path: '/smis/car-safeinfo/info',
        component: () => import('@/views/smis/carSafeInfo/info/Search.vue')
    },
    {
        linkText: '安全資訊發布', 
        path: '/smis/car-safeinfo/info/add',
        component: () => import('@/views/smis/carSafeInfo/info/Form.vue')
    },
    {
        linkText: '安全資訊讀取追蹤', 
        path: '/smis/car-safeinfo/info/:id/read-track',
        component: () => import('@/views/smis/carSafeInfo/info/ReadTrack.vue')
    },

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
        component: () => import('@/views/smis/carSafeInfo/crawlNotify/Edit.vue')
    },
    {
        linkText: '慢行通報讀取追蹤',
        path: '/smis/car-safeinfo/crawl-notify/:id/read-track',
        component: () => import('@/views/smis/carSafeInfo/crawlNotify/ReadTrack.vue')
    },
]