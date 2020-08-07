// -------- 行車安全績效管理 -------

export const CarSafePerformanceRouter = [
    {
        linkText: '統計圖表',
        path: '/smis/car-safe-performance/charts',
        component: () => import('@/views/smis/CarSafePerformance/charts/Index.vue')
    },
    {
        linkText: '車速異常表',  // 搜尋頁
        path: '/smis/car-safe-performance/speed-abnormal',
        component: () => import('@/views/smis/CarSafePerformance/speedAbnormal/Search.vue')
    },
    {
        linkText: '軔機檢查異常表',  // 搜尋頁
        path: '/smis/car-safe-performance/machine-abnormal',
        component: () => import('@/views/smis/CarSafePerformance/machineAbnormal/Search.vue')
    },
    {
        linkText: '酒測、健康檢查異常表',  // 搜尋頁
        path: '/smis/car-safe-performance/health-abnormal',
        component: () => import('@/views/smis/CarSafePerformance/healthAbnormal/Search.vue')
    },
    {
        linkText: '慢行通報紀錄',
        path: '/smis/car-safe-performance/crawl-notify',
        component: () => import('@/views/smis/CarSafePerformance/CrawlNotify.vue')
    },
]
