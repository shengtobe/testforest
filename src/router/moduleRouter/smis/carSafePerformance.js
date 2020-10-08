// -------- 行車安全績效管理 -------
export const CarSafePerformanceRouter = [
    {
        linkText: '表單填報、統計圖',  // 各表單及統計圖的入口
        path: '/smis/car-safe-performance/form-charts',
        component: () => import('@/views/smis/carSafePerformance/formCharts/Index.vue')
    },
    // ------- 機車行駛公里及發電機工時 ------- 
    {
        linkText: '機車行駛公里及發電機工時',
        path: '/smis/car-safe-performance/form-charts/moto-dynamo',
        component: () => import('@/views/smis/carSafePerformance/formCharts/MotoDynamo.vue')
    },
    // ------- 軔機檢查異常表 ------- 
    {
        linkText: '軔機檢查異常表',
        path: '/smis/car-safe-performance/form-charts/machine-abnormal',
        component: () => import('@/views/smis/carSafePerformance/formCharts/MachineAbnormal.vue')
    },
    {
        linkText: '軔機檢查異常表-新增',
        path: '/smis/car-safe-performance/form-charts/machine-abnormal/add',
        component: () => import('@/views/smis/carSafePerformance/formCharts/MachineAbnormalForm.vue')
    },
    {
        linkText: '軔機檢查異常表-編輯',
        path: '/smis/car-safe-performance/form-charts/machine-abnormal/:id/edit',
        component: () => import('@/views/smis/carSafePerformance/formCharts/MachineAbnormalForm.vue')
    },
    // ------- 酒測、健康檢查異常表 ------- 
    {
        linkText: '酒測、健康檢查異常表',
        path: '/smis/car-safe-performance/form-charts/health-abnormal',
        component: () => import('@/views/smis/carSafePerformance/formCharts/HealthAbnormal.vue')
    },
    {
        linkText: '酒測、健康檢查異常表-新增',
        path: '/smis/car-safe-performance/form-charts/health-abnormal/add',
        component: () => import('@/views/smis/carSafePerformance/formCharts/HealthAbnormalForm.vue')
    },
    {
        linkText: '酒測、健康檢查異常表-編輯',
        path: '/smis/car-safe-performance/form-charts/health-abnormal/:id/edit',
        component: () => import('@/views/smis/carSafePerformance/formCharts/HealthAbnormalForm.vue')
    },
    // ------- 車速異常表 -------
    {
        linkText: '車速異常表',
        path: '/smis/car-safe-performance/form-charts/speed-abnormal',
        component: () => import('@/views/smis/carSafePerformance/formCharts/speedAbnormal/Search.vue')
    },
    {
        linkText: '慢行通報紀錄',
        path: '/smis/car-safe-performance/crawl-notify',
        component: () => import('@/views/smis/carSafePerformance/CrawlNotify.vue')
    },
]
