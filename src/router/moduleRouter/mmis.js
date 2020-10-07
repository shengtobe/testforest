// -------- 設備養護系統 -------

export const MmisRouter = [
    // ------ 設備資料管理 ------ 
    {
        linkText: '列車、軌道、車道設備',
        path: '/mmis/train-track-lane',
        component: () =>
            import ('@/views/mmis/TrainTrackLane.vue')
    },
    {
        linkText: '無線電設備管理',
        path: '/mmis/radio',
        component: () =>
            import ('@/views/mmis/Radio.vue')
    },
    {
        linkText: '料件管理',
        path: '/mmis/material',
        component: () =>
            import ('@/views/mmis/Material.vue')
    },
    // ------ 設備維修管理 ------ 
    {
        linkText: '故障、保養工單',
        path: '/mmis/fault-maintenance',
        component: () =>
            import ('@/views/mmis/FaultMaintenance.vue')
    },
    {
        linkText: '週期性工作提醒',
        path: '/mmis/periodicity-job',
        component: () =>
            import ('@/views/mmis/PeriodicityJob.vue')
    },
    {
        linkText: '工班管理',
        path: '/mmis/work-shift',
        component: () =>
            import ('@/views/mmis/WorkShift.vue')
    },

    // ------ 維修外包管理 ------ 
    {
        linkText: '維修外包管理',
        path: '/mmis/c',
        component: () =>
            import ('@/views/mmis/Test.vue')
    },

    // ------ 統計分析 ------ 
    {
        linkText: 'MTTR 分析',
        path: '/mmis/d/a',
        component: () =>
            import ('@/views/mmis/Test.vue')
    },
    {
        linkText: 'MTBF 分析',
        path: '/mmis/d/b',
        component: () =>
            import ('@/views/mmis/Test.vue')
    },
    {
        linkText: 'MKBF 分析',
        path: '/mmis/d/c',
        component: () =>
            import ('@/views/mmis/Test.vue')
    },

    // ------ 統計分析 ------ 
    {
        linkText: '故障履歷',
        path: '/mmis/e/a',
        component: () =>
            import ('@/views/mmis/Test.vue')
    },
    {
        linkText: '維修工時履歷',
        path: '/mmis/e/b',
        component: () =>
            import ('@/views/mmis/Test.vue')
    },
    {
        linkText: '料件履歷',
        path: '/mmis/e/c',
        component: () =>
            import ('@/views/mmis/Test.vue')
    },
    {
        linkText: '維修費用',
        path: '/mmis/e/d',
        component: () =>
            import ('@/views/mmis/Test.vue')
    },
]