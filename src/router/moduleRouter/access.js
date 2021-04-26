// -------- 權限管理 -------

export const AccessRouter = [
    {
        path: '/access',
        component: () => import('@/views/Access.vue')
    },
    {
        linkText: '人員權限管理',
        path: '/access/userManage',
        component: () => import('@/views/smis/userManage.vue')
    },
]