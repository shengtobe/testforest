// -------- 表單-鐵路維護科 -------

export const FormMaintainRouter = [
    {
        linkText: '切割機(季)定期檢查表',// 25
        path: '/form-manage/maintain/cutting-machine-checklist',
        component: () => import('@/views/formManage/maintain/CuttingMachineChecklist.vue'),
        formGroup: ['maintain']
    },
    {
        linkText: '手提鏈鋸定期檢查表(三個月)',// 26
        path: '/form-manage/maintain/portable-chainsaw-checklist',
        component: () => import('@/views/formManage/maintain/PortableChainsawChecklist.vue'),
        formGroup: ['maintain', 'curing']
    },
    {
        linkText: '挖掘機每日作業前自動檢點表',// 54
        path: '/form-manage/maintain/excavator-checklist',
        component: () => import('@/views/formManage/maintain/ExcavatorChecklist.vue'),
        formGroup: ['maintain']
    },
    {
        linkText: '挖掘機(月)定期檢查表',// 55
        path: '/form-manage/maintain/excavator-checklist-month',
        component: () => import('@/views/formManage/maintain/ExcavatorChecklistMonth.vue'),
        formGroup: ['maintain']
    },
    {
        linkText: '重力機械使用前檢查表',// 56
        path: '/form-manage/maintain/gravity-machinery-checklist',
        component: () => import('@/views/formManage/maintain/GravityMachineryChecklist.vue'),
        formGroup: ['maintain']
    },
    {
        linkText: '竹崎監工區大型物料存放位置表',
        path: '/form-manage/maintain/takezaki-large-materials',
        component: () => import('@/views/formManage/maintain/TakezakiLargeMaterials.vue'),
        formGroup: ['maintain']
    },
    {
        linkText: '鐵道橋樑監理資料',
        path: '/form-manage/maintain/rail-bridge-checklist',
        component: () => import('@/views/formManage/maintain/RailBridgeChecklist.vue'),
        formGroup: ['maintain']
    },
    {
        linkText: '機動台車開車前自動檢點表',// 83
        path: '/form-manage/maintain/motor-vehicle-checklist',
        component: () => import('@/views/formManage/maintain/MotorVehicleChecklist.vue'),
        formGroup: ['maintain']
    },
    {
        linkText: '機動台車(季)定期檢查表',// 84
        path: '/form-manage/maintain/motor-vehicle-checklist-month',
        component: () => import('@/views/formManage/maintain/MotorVehicleChecklistMonth.vue'),
        formGroup: ['maintain']
    },
    {
        linkText: '割草機(季)定期檢查表',// 85
        path: '/form-manage/maintain/lawn-mower-checklist-season',
        component: () => import('@/views/formManage/maintain/LawnMowerChecklistSeason.vue'),
        formGroup: ['maintain']
    },
    {
        linkText: '鋼軌鉅軌-鑽孔-磨軌機(季)定期檢查表',// 59
        path: '/form-manage/maintain/saw-drill-grind-checklist',
        component: () => import('@/views/formManage/maintain/SawDrillGrindChecklist.vue'),
        formGroup: ['maintain']
    },
    {
        linkText: '竹崎監工區抽換道岔作業自主檢查表',
        path: '/form-manage/maintain/zhuqi-rail-switch-checklist',
        component: () => import('@/views/formManage/maintain/ZhuqiRailSwitchChecklist.vue'),
        formGroup: ['maintain']
    },
]