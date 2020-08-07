// -------- 證照管理 -------

export const LicenseRouter = [
    {
        linkText: '證照列表',
        path: '/license',
        component: () => import('@/views/license/index.vue')
    },
    {
        linkText: '證照擁有者',
        path: '/license/:id/ownerList',
        component: () => import('@/views/license/ownerList.vue')
    },
]