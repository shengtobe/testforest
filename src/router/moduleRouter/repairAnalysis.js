// -------- 維修統計分析 -------

export const RepairAnalysisRouter = [
    {
        linkText: 'RAM分析',
        path: '/repair-analysis/ram-analysis',
        component: () => import('@/views/repairAnalysis/RamAnalysis.vue')
    },
    {
        linkText: '報表',
        path: '/repair-analysis/report',
        component: () => import('@/views/repairAnalysis/Report.vue')
    },
]