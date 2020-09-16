// -------- 表單-服務科 -------

export const FormServeRouter = [
    {
        linkText: '保安裝置檢查紀錄表-北門車站',
        path: '/form-manage/serve/security-checklist1',
        component: () => import('@/views/formManage/serve/SecurityChecklist1.vue'),
        formGroup: ['serve']
    },
    {
        linkText: '保安裝置檢查紀錄表-竹崎車站',
        path: '/form-manage/serve/security-checklist2',
        component: () => import('@/views/formManage/serve/SecurityChecklist2.vue'),
        formGroup: ['serve']
    },
    {
        linkText: '保安裝置檢查紀錄表-奮起湖車站',
        path: '/form-manage/serve/security-checklist3',
        component: () => import('@/views/formManage/serve/SecurityChecklist3.vue'),
        formGroup: ['serve']
    },
    {
        linkText: '保安裝置檢查紀錄表-阿里山車站',
        path: '/form-manage/serve/security-checklist4',
        component: () => import('@/views/formManage/serve/SecurityChecklist4.vue'),
        formGroup: ['serve']
    },
    {
        linkText: '保安裝置檢查紀錄表-交力坪、神木、對高岳車站',
        path: '/form-manage/serve/security-checklist5',
        component: () => import('@/views/formManage/serve/SecurityChecklist5.vue'),
        formGroup: ['serve']
    },
    {
        linkText: '保安裝置檢查紀錄表-沼平、祝山車站',
        path: '/form-manage/serve/security-checklist6',
        component: () => import('@/views/formManage/serve/SecurityChecklist6.vue'),
        formGroup: ['serve']
    },
    {
        linkText: '保安裝置檢查紀錄表-十字岔道',
        path: '/form-manage/serve/security-checklist7',
        component: () => import('@/views/formManage/serve/SecurityChecklist7.vue'),
        formGroup: ['serve']
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
    {
        linkText: '車站營運異常狀況通報單',
        path: '/form-manage/serve/abnormal-notifice',
        component: () => import('@/views/formManage/serve/AbnormalNotifice.vue'),
        formGroup: ['serve', 'maintain', 'curing']
    },
    {
        linkText: '保安裝置保修工作申請書',
        path: '/form-manage/serve/device-maintain-application',
        component: () => import('@/views/formManage/serve/DeviceMaintainApplication.vue'),
        formGroup: ['serve']
    },
    {
        linkText: '車裝台無線電機檢查表機動台車(三個月)定期檢查表2',
        path: '/form-manage/serve/bs-radio-checklist',
        component: () => import('@/views/formManage/serve/BSRadioChecklist.vue'),
        formGroup: ['serve', 'maintain', 'curing']
    },
    {
        linkText: '基地台無線電機(含錄音設備)保養檢查紀錄表',
        path: '/form-manage/serve/radio-maintenance',
        component: () => import('@/views/formManage/serve/RadioMaintenance.vue'),
        formGroup: ['serve', 'maintain', 'curing']
    },
]