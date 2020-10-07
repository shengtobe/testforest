// -------- 設備養護系統 -------

export const MmisRouter = [
    // ------ 設備資料管理 ------ 
    {
        linkText: '列車、軌道、車道設備',
        path: '/mmis/a',
        component: () => import('@/views/mmis/Test.vue')
    },

    // ------ 設備維修管理 ------ 
    {
        linkText: '故障、保養工單',
        path: '/mmis/b/a',
        component: () => import('@/views/mmis/Test.vue')
    },
    {
        linkText: '週期性工作提醒',
        path: '/mmis/b/b',
        component: () => import('@/views/mmis/Test.vue')
    },
    {
        linkText: '工班管理',
        path: '/mmis/b/c',
        component: () => import('@/views/mmis/Test.vue')
    },

    // ------ 維修外包管理 ------ 
    {
        linkText: '維修外包管理',
        path: '/mmis/c',
        component: () => import('@/views/mmis/Test.vue')
    },

    // ------ 統計分析 ------ 
    {
        linkText: 'MTTR 分析',
        path: '/mmis/d/a',
        component: () => import('@/views/mmis/Test.vue')
    },
    {
        linkText: 'MTBF 分析',
        path: '/mmis/d/b',
        component: () => import('@/views/mmis/Test.vue')
    },
    {
        linkText: 'MKBF 分析',
        path: '/mmis/d/c',
        component: () => import('@/views/mmis/Test.vue')
    },

    // ------ 統計分析 ------ 
    {
        linkText: '故障履歷',
        path: '/mmis/e/a',
        component: () => import('@/views/mmis/Test.vue')
    },
    {
        linkText: '維修工時履歷',
        path: '/mmis/e/b',
        component: () => import('@/views/mmis/Test.vue')
    },
    {
        linkText: '料件履歷',
        path: '/mmis/e/c',
        component: () => import('@/views/mmis/Test.vue')
    },
    {
        linkText: '維修費用',
        path: '/mmis/e/d',
        component: () => import('@/views/mmis/Test.vue')
    },
]