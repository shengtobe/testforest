// -------- 行車安全資訊管理 -------

export const CarSafeInfoRouter = [
    {
        linkText: '安全資訊查詢',  // 搜尋頁
        path: '/smis/car-safeinfo',
        component: () => import('@/views/smis/CarSafeInfo/Search.vue')
    },
    {
        linkText: '安全資訊發布', 
        path: '/smis/car-safeinfo/info-publish',
        component: () => import('@/views/smis/CarSafeInfo/Form.vue')
    },
    {
        linkText: '資訊讀取追蹤',
        path: '/smis/car-safeinfo/read-track',
        component: () => import('@/views/smis/CarSafeInfo/readTrack/Search.vue')
    },
    {
        linkText: '慢行通報查詢',  // 首頁
        path: '/smis/car-safeinfo/crawl-notify',
        component: () => import('@/views/smis/CarSafeInfo/crawlNotify/Search.vue')
    },
]