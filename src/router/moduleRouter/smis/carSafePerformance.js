// -------- 行車安全績效管理 -------
export const CarSafePerformanceRouter = [
    {
        linkText: '表單填報、統計圖',  // 各表單及統計圖的入口
        path: '/smis/car-safe-performance',
        component: () => import('@/views/smis/carSafePerformance/Index.vue')
    },
    {
        linkText: '行車安全績效趨勢',  // 各表單及統計圖的入口
        path: '/smis/car-safe-performance/analysis',
        component: () => import('@/views/smis/carSafePerformance/AnalysisIndex.vue')
    },
    //-------- 第一、二層 -------
    {
        linkText: '趨勢圖',
        path: '/smis/car-safe-performance/:acdcode/accident-trend/:acdname',
        props: true,
        component: () => import('@/views/smis/carSafePerformance/AccidentTrend.vue')
    },
    {
        linkText: '趨勢分析',
        path: '/smis/car-safe-performance/:acdcode/accident-analysis/:acdname',
        props: true,
        component: () => import('@/views/smis/carSafePerformance/AccidentReasonAnaly.vue')
    },
    {
        linkText: '年分析',
        path: '/smis/car-safe-performance/:acdcode/year-analysis/:acdname',
        props: true,
        component: () => import('@/views/smis/carSafePerformance/AccidentYearAnaly.vue')
    },
    //----- 第三層 -----
    {
        linkText: '安全關鍵設備可靠度',
        path: '/smis/car-safe-performance/key-equip',
        component: () => import('@/views/smis/carSafePerformance/KeyEquip.vue')
    },
    {
        linkText: '安全關鍵設備可靠度趨勢分析',
        path: '/smis/car-safe-performance/:acdname/key-equip/:eqname/key-analysis',
        props: true,
        component: () => import('@/views/smis/carSafePerformance/KeyEquipAnaly.vue')
    },
    //----- 第四層 -----
    {
        linkText: '執行成效',
        path: '/smis/car-safe-performance/:acdname/work-effectiveness',
        props: true,
        component: () => import('@/views/smis/carSafePerformance/WorkEffectiveness.vue')
    },
    // ------- 機車行駛公里及發電機工時 ------- 
    {
        linkText: '機車行駛公里及發電機工時',
        path: '/smis/car-safe-performance/moto-dynamo',
        component: () => import('@/views/smis/carSafePerformance/MotoDynamo.vue')
    },
    // ------- 軔機檢查異常表 ------- 
    {
        linkText: '軔機檢查異常表',
        path: '/smis/car-safe-performance/machine-abnormal',
        component: () => import('@/views/smis/carSafePerformance/MachineAbnormal.vue')
    },
    {
        linkText: '軔機檢查異常表-新增',
        path: '/smis/car-safe-performance/machine-abnormal/add',
        props: true,
        component: () => import('@/views/smis/carSafePerformance/MachineAbnormalForm.vue')
    },
    {
        linkText: '軔機檢查異常表-編輯',
        path: '/smis/car-safe-performance/machine-abnormal/:id/edit',
        props: true,
        component: () => import('@/views/smis/carSafePerformance/MachineAbnormalForm.vue')
    },
    // ------- 酒測、健康檢查異常表 ------- 
    {
        linkText: '酒測、健康檢查異常表',
        path: '/smis/car-safe-performance/health-abnormal',
        component: () => import('@/views/smis/carSafePerformance/HealthAbnormal.vue')
    },
    {
        linkText: '酒測、健康檢查異常表-新增',
        path: '/smis/car-safe-performance/health-abnormal/add',
        component: () => import('@/views/smis/carSafePerformance/HealthAbnormalForm.vue')
    },
    {
        linkText: '酒測、健康檢查異常表-編輯',
        path: '/smis/car-safe-performance/health-abnormal/:id/edit',
        props: true,
        component: () => import('@/views/smis/carSafePerformance/HealthAbnormalForm.vue')
    },
    // ------- 車速異常表 -------
    {
        linkText: '車速異常表',
        path: '/smis/car-safe-performance/speed-abnormal',
        component: () => import('@/views/smis/carSafePerformance/SpeedAbnormal.vue')
    },
    {
        linkText: '車速異常表-新增',
        path: '/smis/car-safe-performance/speed-abnormal/add',
        component: () => import('@/views/smis/carSafePerformance/SpeedAbnormalForm.vue')
    },
    {
        linkText: '車速異常表-編輯',
        path: '/smis/car-safe-performance/speed-abnormal/:id/edit',
        props: true,
        component: () => import('@/views/smis/carSafePerformance/SpeedAbnormalForm.vue')
    },
    // ------- 圖表 -------
    {
        linkText: '慢行通報紀錄',
        path: '/smis/car-safe-performance/crawl-notify',
        component: () => import('@/views/smis/carSafePerformance/CrawlNotify.vue')
    },
]
