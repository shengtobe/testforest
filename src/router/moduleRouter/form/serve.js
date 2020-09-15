// -------- 表單-服務科 -------

export const FormServeRouter = [
    {
        linkText: '車裝台無線電機檢查表機動台車(三個月)定期檢查表',
        path: '/form-manage/serve/wireless-motor-checklist',
        component: () => import('@/views/formManage/serve/WirelessMotorChecklist.vue'),
        formGroup: ['serve', 'maintain', 'curing']
    },
    {
        linkText: '發電機(月)定期檢查表',
        path: '/form-manage/serve/generator-checklist',
        component: () => import('@/views/formManage/serve/GeneratorChecklist.vue'),
        formGroup: ['serve', 'maintain', 'curing']
    },
    {
        linkText: '鋁梯(六個月)定期檢查表',
        path: '/form-manage/serve/aluminum-ladder-checklist',
        component: () => import('@/views/formManage/serve/AluminumLadderChecklist.vue'),
        formGroup: ['serve', 'maintain', 'curing']
    },
    {
        linkText: '一般車輛作業前自動檢點表',
        path: '/form-manage/serve/general-vehicle-checklist',
        component: () => import('@/views/formManage/serve/GeneralVehicleChecklist.vue'),
        formGroup: ['serve', 'maintain', 'curing']
    },
    {
        linkText: '一般車輛(季)定期檢查表',
        path: '/form-manage/serve/general-vehicle-checklist-season',
        component: () => import('@/views/formManage/serve/GeneralVehicleChecklistSeason.vue'),
        formGroup: ['serve', 'maintain', 'curing']
    },
    {
        linkText: '6S(月)定期檢查表',
        path: '/form-manage/serve/6s-checklist-month',
        component: () => import('@/views/formManage/serve/6SChecklistMonth.vue'),
        formGroup: ['serve', 'maintain', 'curing']
    },
    {
        linkText: '危險品、易燃物安全(季)定期檢查表',
        path: '/form-manage/serve/dangerous-flammable-checklist-season',
        component: () => import('@/views/formManage/serve/DangerousFlammableChecklistSeason.vue'),
        formGroup: ['serve', 'maintain', 'curing']
    },
    {
        linkText: '一般電器安全(季)定期檢查表',
        path: '/form-manage/serve/general-elec-safety-checklist-season',
        component: () => import('@/views/formManage/serve/GeneralElecSafetyChecklistSeason.vue'),
        formGroup: ['serve', 'maintain', 'curing']
    },
    {
        linkText: '一般倉儲安全(季)定期檢查表',
        path: '/form-manage/serve/dangerous-flammable-checklist-season',
        component: () => import('@/views/formManage/serve/GeneralStorageSafetyChecklistSeason.vue'),
        formGroup: ['serve', 'maintain', 'curing']
    },
    {
        linkText: '工作安全觀察(半月)紀錄表',
        path: '/form-manage/serve/ee-work-safety-obs-record',
        component: () => import('@/views/formManage/serve/EEWorkSafetyObsRecord.vue'),
        formGroup: ['serve', 'maintain', 'curing']
    },
    {
        linkText: '各級主管走動管理督檢紀錄暨追蹤表(半月)',
        path: '/form-manage/serve/supervisory-tracking-list-month',
        component: () => import('@/views/formManage/serve/SupervisoryTrackingListMonth.vue'),
        formGroup: ['serve', 'maintain', 'curing']
    },
]