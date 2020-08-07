// -------- 設備資料管理 -------

export const EqInfoRouter = [
    {
        linkText: '設備基本資料',
        path: '/eqinfo/info-manage',
        component: () => import('@/views/eqInfo/InfoManage.vue')
    },
    {
        linkText: '工班基本資料',
        path: '/eqinfo/work-manage',
        component: () => import('@/views/eqInfo/WorkManage.vue')
    },
    {
        linkText: '報表',
        path: '/eqinfo/report',
        component: () => import('@/views/eqInfo/Report.vue')
    },
]