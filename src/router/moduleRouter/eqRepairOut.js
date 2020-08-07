// -------- 設備維修外包 -------

export const EqRepairOutRouter = [
    {
        linkText: '包商管理',
        path: '/eqrepair-out/contractor-manage',
        component: () => import('@/views/eqRepairOut/ContractorManage.vue')
    },
    {
        linkText: '到修狀況統計',
        path: '/eqrepair-out/repair-state',
        component: () => import('@/views/eqRepairOut/RepairState.vue')
    },
    {
        linkText: '未到修警示及催修',
        path: '/eqrepair-out/no-repair',
        component: () => import('@/views/eqRepairOut/NoRepair.vue')
    },
    {
        linkText: '工單結案及追蹤',
        path: '/eqrepair-out/work-order-end',
        component: () => import('@/views/eqRepairOut/WorkOrderEnd.vue')
    },
    {
        linkText: '報表',
        path: '/eqrepair-out/report',
        component: () => import('@/views/eqRepairOut/Report.vue')
    },
    {
        linkText: '名單管理',
        path: '/eqrepair-out/list',
        component: () => import('@/views/eqRepairOut/VendorList.vue')
    },
]