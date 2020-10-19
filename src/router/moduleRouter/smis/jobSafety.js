// -------- 職安管理 -------

export const JobSafetyRouter = [
    // ----------------- 職業災害事故 -----------------
    {
        linkText: '職災事故管理',  // 職災事故查詢
        path: '/smis/jobsafety/disaster-survey', 
        component: () => import('@/views/smis/jobSafety/disasterSurvey/Search.vue')
    },
    {
        linkText: '每月紀錄表',
        path: '/smis/jobsafety/month-record', 
        component: () => import('@/views/smis/jobSafety/disasterSurvey/MonthRecord.vue')
    },
    {
        linkText: '職業災害事故調查表',  // 新增
        path: '/smis/jobsafety/disaster-survey-add', 
        component: () => import('@/views/smis/jobSafety/disasterSurvey/Form.vue')
    },
    {
        linkText: '事故事件詳細內容',  // 已立案
        path: '/smis/jobsafety/disaster-survey/:id/show', 
        component: () => import('@/views/smis/jobSafety/disasterSurvey/Show.vue')
    },
    {
        linkText: '編輯事故事件',
        path: '/smis/jobsafety/disaster-survey/:id/edit', 
        component: () => import('@/views/smis/jobSafety/disasterSurvey/Form.vue')
    },
    {
        linkText: '改善措施',
        path: '/smis/jobsafety/disaster-survey/:id/improve',
        component: () => import('@/views/smis/jobSafety/disasterSurvey/Improve.vue')
    },
    {
        linkText: '審核中',  // 審核中 (審核完備資料)
        path: '/smis/jobsafety/disaster-survey/:id/review',
        component: () => import('@/views/smis/jobSafety/disasterSurvey/ReviewComplated.vue'),
        props: { closeStatus: 2 }
    },
    {
        linkText: '已完備資料',
        path: '/smis/jobsafety/disaster-survey/:id/complated',
        component: () => import('@/views/smis/jobSafety/disasterSurvey/ReviewComplated.vue'),
        props: { closeStatus: 3 }
    },
    {
        linkText: '審核中',  // 審核中 (審核措施落實)
        path: '/smis/jobsafety/disaster-survey/:id/fulfill-review',
        component: () => import('@/views/smis/jobSafety/disasterSurvey/Fulfill.vue'),
        props: { closeStatus: 4 }
    },
    {
        linkText: '改善措施已落實',
        path: '/smis/jobsafety/disaster-survey/:id/fulfill-complated',
        component: () => import('@/views/smis/jobSafety/disasterSurvey/Fulfill.vue'),
        props: { closeStatus: 5 }
    },

    // ----------------- 職災危害資料庫 -----------------
    {
        linkText: '職災危害資料庫查詢',  // 首頁
        path: '/smis/jobsafety/disasterdb', 
        component: () => import('@/views/smis/jobSafety/disasterDb/Search.vue')
    },
    {
        linkText: '職災危害資料庫新增',
        path: '/smis/jobsafety/disasterdb/add', 
        component: () => import('@/views/smis/jobSafety/disasterDb/Form.vue')
    },
    {
        linkText: '職災危害資料詳庫細內容',
        path: '/smis/jobsafety/disasterdb/:id/show', 
        component: () => import('@/views/smis/jobSafety/disasterDb/Show.vue')
    },
    {
        linkText: '編輯職災危害資料庫',
        path: '/smis/jobsafety/disasterdb/:id/edit', 
        component: () => import('@/views/smis/jobSafety/disasterDb/Form.vue')
    },

    // ----------------- 職安績效管理 -----------------
    {
        linkText: '職安績效管理查詢',  // 首頁
        path: '/smis/jobsafety/performance',
        component: () => import('@/views/smis/jobSafety/performance/Index.vue')
    },

    // ----------------- 健檢管理 -----------------
    {
        linkText: '健檢管理查詢',
        path: '/smis/jobsafety/physical',  // 首頁
        component: () => import('@/views/smis/jobSafety/physical/Search.vue')
    },

    // ----------------- 證照管理 -----------------
    {
        linkText: '證照管理查詢',
        path: '/smis/jobsafety/license',  // 首頁
        component: () => import('@/views/smis/jobSafety/license/Search.vue')
    },
]
