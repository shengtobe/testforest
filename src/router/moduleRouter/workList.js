// -------- 工單 -------

export const WorkListRouter = [
    // -------- 服務科 -------- 
    {
        linkText: '工單檢視',  // 路由
        path: '/worklist/serve/:id/show',
        component: () => import('@/views/workList/serve/PageRouter.vue'),
        props: true,
    },
    {
        linkText: '搜尋頁',
        path: '/worklist/serve',
        component: () => import('@/views/workList/serve/Search.vue')
    },
    {
        linkText: '工單新增',  // 立案表單
        path: '/worklist/serve/newList',
        component: () => import('@/views/workList/serve/ListForm.vue')
    },
    {
        linkText: '工單新增',  // 立案表單2
        path: '/worklist/serve/:money/newList0',
        component: () => import('@/views/workList/serve/ListForm.vue'),
        props: true,
    },
    {
        linkText: '工單編輯',  // 編輯立案
        path: '/worklist/serve/:id/editList',
        component: () => import('@/views/workList/serve/ListForm.vue'),
        props: true,
    },
    {
        linkText: '派工單',  // 派工新增
        path: '/worklist/serve/:id/newWork',
        component: () => import('@/views/workList/serve/WorkForm.vue'),
        props: true,
    },
    {
        linkText: '派工單編輯',  // 編輯派工單
        path: '/worklist/serve/:id/editWork',
        component: () => import('@/views/workList/serve/WorkForm.vue'),
        props: true,
    },



    // -------- 維修、養護科 -------- 
    {
        linkText: '工單檢視',  // 路由
        path: '/worklist/maintain/:id/show',
        component: () => import('@/views/workList/maintain/PageRouter.vue'),
        props: true,
    },
    {
        linkText: '搜尋頁',
        path: '/worklist/maintain',
        component: () => import('@/views/workList/maintain/Search.vue')
    },
    {
        linkText: '工單新增',  // 立案表單
        path: '/worklist/maintain/newList',
        component: () => import('@/views/workList/maintain/ListForm.vue')
    },
    {
        linkText: '工單編輯',  // 編輯立案
        path: '/worklist/maintain/:id/editList',
        component: () => import('@/views/workList/maintain/ListForm.vue'),
        props: true,
    },
    {
        linkText: '派工單',  // 派工表單
        path: '/worklist/maintain/:id/newWork',
        component: () => import('@/views/workList/maintain/WorkForm.vue'),
        props: true,
    },
    {
        linkText: '派工單編輯',  // 編輯派工單
        path: '/worklist/maintain/:id/editWork',
        component: () => import('@/views/workList/maintain/WorkForm.vue'),
        props: true,
    },
]