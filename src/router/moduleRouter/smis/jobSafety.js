// -------- 職安管理 -------

export const JobSafetyRouter = [
    // ----------------- 職業災害事故 -----------------
    {
        linkText: '職業災害事故調查表',  // 職災新增
        path: '/smis/jobsafety/disaster-survey-add', 
        component: () => import('@/views/smis/jobSafety/disasterSurvey/Form.vue')
    },
    {
        linkText: '職災事故管理',  // 職災事故查詢
        path: '/smis/jobsafety/disaster-survey', 
        component: () => import('@/views/smis/jobSafety/disasterSurvey/Search.vue')
    },

    // ----------------- 職災危害資料庫 -----------------
    {
        linkText: '職災危害資料庫查詢',  // 首頁
        path: '/smis/jobsafety/disasterdb', 
        component: () => import('@/views/smis/jobSafety/disasterDb/Search.vue')
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
