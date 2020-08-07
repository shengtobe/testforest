// -------- 設備維修管理 -------

export const EqRepairRouter = [
    {
        linkText: '工單報修及立案',
        path: '/eqrepair/work-order-create',
        component: () => import('@/views/eqRepair/WorkOrderCreate.vue')
    },
    {
        linkText: '工單派工',
        path: '/eqrepair/work-order-dispatch',
        component: () => import('@/views/eqRepair/WorkOrderDispatch.vue')
    },
    {
        linkText: '工單結案及追蹤',
        path: '/eqrepair/work-order-end',
        component: () => import('@/views/eqRepair/WorkOrderEnd.vue')
    },
    {
        linkText: '工作日誌',
        path: '/eqrepair/work-log',
        component: () => import('@/views/eqRepair/WorkLog.vue')
    },
    {
        linkText: '料件管理',
        path: '/eqrepair/material-manage',
        component: () => import('@/views/eqRepair/MaterialManage.vue')
    },
    {
        linkText: '報表',
        path: '/eqrepair/report',
        component: () => import('@/views/eqRepair/Report.vue')
    },
    {
        linkText: '工班管理',
        path: '/eqrepair/work-shift',
        component: () => import('@/views/eqRepair/WorkShift.vue')
    },
]