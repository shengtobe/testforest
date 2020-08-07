// -------- 工單 -------

export const WorkListRouter = [
    // -------- 服務科 -------- 
    // 首頁
    {
        linkText: '服務科',
        path: '/worklist/serve',
        component: () => import('@/views/workList/Serve/Index.vue')
    },
    {
        linkText: '立案階段',
        path: '/worklist/serve/demo1',
        component: () => import('@/views/workList/Serve/Demo1.vue')
    },
    {
        linkText: '派工階段',
        path: '/worklist/serve/demo2',
        component: () => import('@/views/workList/Serve/Demo2.vue')
    },
    {
        linkText: '驗收階段',
        path: '/worklist/serve/demo3',
        component: () => import('@/views/workList/Serve/Demo3.vue')
    },
    {
        linkText: '結案階段',
        path: '/worklist/serve/demo4',
        component: () => import('@/views/workList/Serve/Demo4.vue')
    },


    // -------- 維修、養護科 -------- 
    {
        linkText: '維修、養護科',  // 首頁 (搜尋頁)
        path: '/worklist/maintain',
        component: () => import('@/views/workList/Maintain/Search.vue')
    },
    {
        linkText: '工單新增',  // 立案表單
        path: '/worklist/maintain/newList',
        component: () => import('@/views/workList/Maintain/ListForm.vue')
    },
    {
        linkText: '工單檢視',  // 看立案的內容
        path: '/worklist/maintain/:id/listShow',
        component: () => import('@/views/workList/Maintain/ListShow.vue')
    },
    {
        linkText: '工單編輯',  // 編輯立案
        path: '/worklist/maintain/:id/editList',
        component: () => import('@/views/workList/Maintain/ListForm.vue')
    },
    {
        linkText: '派工單',  // 派工新增
        path: '/worklist/maintain/:id/newWork',
        component: () => import('@/views/workList/Maintain/WorkForm.vue')
    },
    {
        linkText: '已派工待維修',  // 派工內容
        path: '/worklist/maintain/:id/workShow',
        component: () => import('@/views/workList/Maintain/WorkShow.vue')
    },
    {
        linkText: '派工單編輯',  // 編輯派工單
        path: '/worklist/maintain/:id/editWork',
        component: () => import('@/views/workList/Maintain/WorkForm.vue')
    },
    {
        linkText: '已維修待驗收',  // 待驗收內容
        path: '/worklist/maintain/:id/acceptingShow',
        component: () => import('@/views/workList/Maintain/AcceptingShow.vue')
    },
    {
        linkText: '已驗收待結案',  // 待結案內容
        path: '/worklist/maintain/:id/closedShow',
        component: () => import('@/views/workList/Maintain/ClosedShow.vue')
    },
    {
        linkText: '已結案',  // 已結案
        path: '/worklist/maintain/:id/complated',
        component: () => import('@/views/workList/Maintain/Complated.vue')
    },
]