// -------- 權限管理 -------

export const AccessRouter = [
    {
        path: '/access',
        component: () => import('@/views/groupManage.vue')
    },
    {
        linkText: '人員權限管理',
        path: '/access/userManage',
        component: () => import('@/views/userManage.vue')
    },
]