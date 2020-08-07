// -------- 安全文件管理 -------

export const SafeFileRouter = [
    // ----------------- 規章文件 -----------------
    {
        linkText: '規章文件查詢',  // 首頁
        path: '/smis/safefile/regulations', 
        component: () => import('@/views/smis/safeFile/regulations/Search.vue')
    },

    // ----------------- 安全會議文件 -----------------
    {
        linkText: '安全會議文件查詢',  // 首頁
        path: '/smis/safefile/meeting', 
        component: () => import('@/views/smis/safeFile/meeting/Search.vue')
    },

    // ----------------- 行車事故事件附件 -----------------
    {
        linkText: '行車事故事件附件查詢',  // 首頁
        path: '/smis/safefile/driving-annex',
        component: () => import('@/views/smis/safeFile/drivingAnnex/Search.vue')
    },
]
