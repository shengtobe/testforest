// -------- 個人資訊管理 -------

export const DemoFormRouter = [
    {
        linkText: 'demo 表單列表',
        path: '/demoform',
        component: () => import('@/views/demoForm/MainPage.vue')
    },
    // -------------- 修理工廠 黏sir -------------
    {
        linkText: 'demo 表單列表',
        path: '/demoform/sl-31',
        component: () => import('@/views/demoForm/SL31.vue')
    },
]