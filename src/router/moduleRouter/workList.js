// -------- 工單 -------

export const WorkListRouter = [
    // -------- 服務科 -------- 
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
        linkText: '工單檢視',  // 看立案的內容
        path: '/worklist/serve/:id/listShow',
        component: () => import('@/views/workList/serve/ListShow.vue')
    },
    {
        linkText: '工單編輯',  // 編輯立案
        path: '/worklist/serve/:id/editList',
        component: () => import('@/views/workList/serve/ListForm.vue')
    },
    {
        linkText: '派工單',  // 派工新增
        path: '/worklist/serve/:id/newWork',
        component: () => import('@/views/workList/serve/WorkForm.vue')
    },
    {
        linkText: '已派工待維修',  // 派工內容
        path: '/worklist/serve/:id/workShow',
        component: () => import('@/views/workList/serve/WorkShow.vue')
    },
    {
        linkText: '派工單編輯',  // 編輯派工單
        path: '/worklist/serve/:id/editWork',
        component: () => import('@/views/workList/serve/WorkForm.vue')
    },
    {
        linkText: '已維修待驗收',  // 待驗收內容
        path: '/worklist/serve/:id/acceptingShow',
        component: () => import('@/views/workList/serve/AcceptingShow.vue')
    },
    {
        linkText: '已驗收待結案',  // 待結案內容
        path: '/worklist/serve/:id/closedShow',
        component: () => import('@/views/workList/serve/ClosedComplated.vue'),
        props: { closeStatus: '已驗收待結案' }
    },
    {
        linkText: '已結案',  // 已結案
        path: '/worklist/serve/:id/complated',
        component: () => import('@/views/workList/serve/ClosedComplated.vue'),
        props: { closeStatus: '已結案' }
    },



    // -------- 維修、養護科 -------- 
    {
        linkText: '工單檢視',  // show (測試用)
        path: '/worklist/maintain/:id/show',
        component: () => import('@/views/workList/maintain/PageRouter.vue')
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
    // {
    //     linkText: '工單檢視',  // 看立案的內容
    //     path: '/worklist/maintain/:id/listShow',
    //     component: () => import('@/views/workList/maintain/ListShow.vue')
    // },
    {
        linkText: '工單編輯',  // 編輯立案
        path: '/worklist/maintain/:id/editList',
        component: () => import('@/views/workList/maintain/ListForm.vue')
    },
    {
        linkText: '派工單',  // 派工新增
        path: '/worklist/maintain/:id/newWork',
        component: () => import('@/views/workList/maintain/WorkForm.vue')
    },
    // {
    //     linkText: '已派工待維修',  // 派工內容
    //     path: '/worklist/maintain/:id/workShow',
    //     component: () => import('@/views/workList/maintain/WorkShow.vue')
    // },
    {
        linkText: '派工單編輯',  // 編輯派工單
        path: '/worklist/maintain/:id/editWork',
        component: () => import('@/views/workList/maintain/WorkForm.vue')
    },
    // {
    //     linkText: '已維修待驗收',  // 待驗收內容
    //     path: '/worklist/maintain/:id/acceptingShow',
    //     component: () => import('@/views/workList/maintain/AcceptingShow.vue')
    // },
    // {
    //     linkText: '已驗收待結案',  // 待結案內容
    //     path: '/worklist/maintain/:id/closedShow',
    //     component: () => import('@/views/workList/maintain/ClosedComplated.vue'),
    //     props: { closeStatus: '已驗收待結案' }
    // },
    // {
    //     linkText: '已結案',  // 已結案
    //     path: '/worklist/maintain/:id/complated',
    //     component: () => import('@/views/workList/maintain/ClosedComplated.vue'),
    //     props: { closeStatus: '已結案' }
    // },
]