// -------- 表單管理 -------

export const FormManageRouter = [
    // 各科室表單列表
    {
        linkText: '表單列表',
        path: '/form-manage',
        component: () => import('@/views/formManage/FormList.vue')
    },

    // 測試
    {
        linkText: '測試',
        path: '/form-manage/10',
        props: { fid: 10, dep: 'service', title: '測試啦' },  // 表單id
        component: () => import('@/views/formManage/OnlyImgForm.vue')
    },
    // ------- 服務科 -------
    // ------- 養護科 -------
    // ------- 維護科 -------
    // ------- 勞安 -------
]