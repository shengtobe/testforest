// -------- 危害通報管理 -------

export const HarmnotifyRouter = [
    {
        linkText: '通報新增',
        path: '/smis/harmnotify/notify', 
        component: () => import('@/views/smis/harmNotify/Form.vue')
    },
    {
        linkText: '通報查詢',  // 通報審核首頁
        path: '/smis/harmnotify/audit', 
        component: () => import('@/views/smis/harmNotify/Search.vue')
    },
    {
        linkText: '通報詳細內容',  // 職安人員的編輯通報頁面
        path: '/smis/harmnotify/:id/show', 
        component: () => import('@/views/smis/harmNotify/Show.vue')
    },
    {
        linkText: '各部門通報次數趨勢',
        path: '/smis/harmnotify/department-notify', 
        component: () => import('@/views/smis/harmNotify/DepartNotify.vue')
    },
    {
        linkText: '各類通報趨勢圖',
        path: '/smis/harmnotify/type-notify', 
        component: () => import('@/views/smis/harmNotify/TypeNotify.vue')
    },
]