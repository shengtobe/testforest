// -------- 監控系統 -------

export const MonitorRouter = [
    {
        linkText: '邊坡監控',
        path: '/monitor/slope-monitor',
        component: () => import('@/views/monitor/slopeMonitor.vue')
    },
    {
        linkText: '雨量監測',
        path: '/monitor/rainfall-monitor',
        component: () => import('@/views/monitor/rainfallMonitor.vue')
    },
]