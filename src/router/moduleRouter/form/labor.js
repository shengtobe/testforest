// -------- 表單-職安 -------

export const FormLaborRouter = [
    {
        linkText: '過負荷作業防護計畫檢核表（群體部分）', // 職安衛1. 
        path: '/form-manage/labor/labor-overload-checklist-group',
        component: () => import('@/views/formManage/labor/LaborOverloadChecklistGroup.vue'),
        formGroup: ['labor']
    },
    {
        linkText: '職業安全衛生過勞量表', // 職安衛2.
        path: '/form-manage/labor/occupational-safety-overwork',
        component: () => import('@/views/formManage/labor/OccupationalSafetyOverwork.vue'),
        formGroup: ['labor']
    },
    {
        linkText: '心理健康量表', // 職安衛3.
        path: '/form-manage/labor/mental-health',
        component: () => import('@/views/formManage/labor/MentalHealth.vue'),
        formGroup: ['labor']
    },
    {
        linkText: '肌肉骨骼症狀調查表', // 職安衛4.
        path: '/form-manage/labor/muscle-skeleton-symptoms',
        component: () => import('@/views/formManage/labor/MuscleSkeletonSymptoms.vue'),
        formGroup: ['labor']
    },
    {
        linkText: '職場不法侵害預防之危害辨識及風險評估表', // 職安衛6.
        path: '/form-manage/labor/hazid-risk-assessment',
        component: () => import('@/views/formManage/labor/HAZIDRiskAssessment.vue'),
        formGroup: ['labor']
    },
    {
        linkText: '職場不法侵害預防之危害辨識及風險評估表Add', // 職安衛6.
        path: '/form-manage/labor/hazid-risk-assessment-add',
        component: () => import('@/views/formManage/labor/HAZIDRiskAssessmentAdd.vue'),
        formGroup: []
    },
    {
        linkText: '災害事故調查表(本處員工)', // 職安衛7.
        path: '/form-manage/labor/disaster-accident-survey',
        component: () => import('@/views/formManage/labor/DisasterAccidentSurvey.vue'),
        formGroup: ['labor'],
        params: [{ key: "type", value: 1 }]
    },
    {
        linkText: '災害事故調查表(本處員工)Add', // 職安衛7.
        path: '/form-manage/labor/disaster-accident-survey-add',
        component: () => import('@/views/formManage/labor/DisasterAccidentSurveyAdd.vue'),
        formGroup: []
    },
    {
        linkText: '災害事故調查表(承攬商)', // 職安衛8.
        path: '/form-manage/labor/disaster-accident-survey-vendor',
        component: () => import('@/views/formManage/labor/DisasterAccidentSurvey.vue'),
        formGroup: ['labor'],
        params: [{ key: "type", value: 2 }]
    },
    {
        linkText: '災害事故調查表(承攬商)Add', // 職安衛8. 
        path: '/form-manage/labor/disaster-accident-survey-vendor-add',
        component: () => import('@/views/formManage/labor/DisasterAccidentSurveyVendorAdd.vue'),
        formGroup: []
    }
]