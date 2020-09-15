// -------- 表單管理 -------

export const FormManageRouter = [
    {
        linkText: '表單搜尋',  // 各科室表單列表
        path: '/form-manage',
        component: () => import('@/views/formManage/Search.vue')
    },
]