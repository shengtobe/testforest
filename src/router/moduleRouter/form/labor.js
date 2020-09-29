// -------- 表單-勞安 -------

export const FormLaborRouter = [
    {
        linkText: '過負荷作業防護計畫檢核表（群體部分）', // 勞安衛1. 
        path: '/form-manage/labor/labor-overload-checklist-group',
        component: () => import('@/views/formManage/labor/LaborOverloadChecklistGroup.vue'),
        formGroup: ['labor']
    },
    {
        linkText: '職業安全衛生過勞量表', // 勞安衛2.
        path: '/form-manage/labor/occupational-safety-overwork',
        component: () => import('@/views/formManage/labor/OccupationalSafetyOverwork.vue'),
        formGroup: ['labor']
    },
    {
        linkText: '心理健康量表', // 勞安衛3.
        path: '/form-manage/labor/mental-health',
        component: () => import('@/views/formManage/labor/MentalHealth.vue'),
        formGroup: ['labor']
    },
    {
        linkText: '職場不法侵害預防之危害辨識及風險評估表', // 勞安衛6.
        path: '/form-manage/labor/hazid-risk-assessment',
        component: () => import('@/views/formManage/labor/HAZIDRiskAssessment.vue'),
        formGroup: ['labor']
    },
]