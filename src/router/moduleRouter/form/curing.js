// -------- 表單-車輛養護科 -------

export const FormCuringRouter = [
    {
        linkText: '動力車車歷卡',
        path: '/form-manage/curing/power-car-maintenance',
        component: () => import('@/views/formManage/curing/PowerCarMaintenance.vue'),
        formGroup: ['curing']
    },
    {
        linkText: 'SL-31進廠維修紀錄',
        path: '/form-manage/curing/sl-31',
        component: () => import('@/views/formManage/curing/SL-31Maintenance-Record.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '故障原因紀錄表',
        path: '/form-manage/curing/malfunction-reason',
        component: () => import('@/views/formManage/curing/MalfunctionReason.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '柴油引擎保養',
        path: '/form-manage/curing/diesel-engine-maintenance',
        component: () => import('@/views/formManage/curing/DieselEngineMaintenance.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '發電機保養',
        path: '/form-manage/curing/locomotive-generator-overhaul',
        component: () => import('@/views/formManage/curing/LocomotiveGeneratorOverhaul.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '機車韌缸漏氣量檢測紀錄表',
        path: '/form-manage/curing/locomotive-leakgas',
        component: () => import('@/views/formManage/curing/LocomotiveLeakGas.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '機車一級檢修紀錄表',
        path: '/form-manage/curing/locomotive-one-level-maintenance',
        component: () => import('@/views/formManage/curing/LocomotiveOneMaintenance.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '機車一級檢修紀錄表Add',
        path: '/form-manage/curing/locomotive-one-level-maintenance-add',
        component: () => import('@/views/formManage/curing/LocomotiveOneMaintenanceAdd.vue'),
        formGroup: []
    },
    {
        linkText: '機車二級檢修紀錄表',
        path: '/form-manage/curing/locomotive-two-level-maintenance',
        component: () => import('@/views/formManage/curing/LocomotiveTwoMaintenance.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '機車二級檢修紀錄表Add',
        path: '/form-manage/curing/locomotive-two-level-maintenance-add',
        component: () => import('@/views/formManage/curing/LocomotiveTwoMaintenanceAdd.vue'),
        formGroup: []
    },
    {
        linkText: '機車三級檢修紀錄表',
        path: '/form-manage/curing/locomotive-three-level-maintenance',
        component: () => import('@/views/formManage/curing/LocomotiveThreeMaintenance.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '機車三級檢修紀錄表Add',
        path: '/form-manage/curing/locomotive-three-level-maintenance-add',
        component: () => import('@/views/formManage/curing/LocomotiveThreeMaintenanceAdd.vue'),
        formGroup: []
    },
    {
        linkText: '機車四級檢修紀錄表',
        path: '/form-manage/curing/locomotive-four-level-maintenance',
        component: () => import('@/views/formManage/curing/LocomotiveFourMaintenance.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '機車四級檢修紀錄表Add',
        path: '/form-manage/curing/locomotive-four-level-maintenance-add',
        component: () => import('@/views/formManage/curing/LocomotiveFourMaintenanceAdd.vue'),
        formGroup: []
    },
    {
        linkText: '乙炔熔接裝置作業前自動檢點表',
        path: '/form-manage/curing/acetylene-weld-checklist',
        component: () => import('@/views/formManage/curing/AcetyleneWeldChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '乙炔熔接裝置(年)定期檢查表',
        path: '/form-manage/curing/acetylene-weld-checklist-year',
        component: () => import('@/views/formManage/curing/AcetyleneWeldChecklistYear.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '阿里山林業鐵路車輪輪緣高度、厚度檢查紀錄表',
        path: '/form-manage/curing/wheel-thickness-checklist',
        component: () => import('@/views/formManage/curing/WheelThicknessChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '空氣壓縮機(月)定期檢查表',
        path: '/form-manage/curing/air-compressor-checklist-month',
        component: () => import('@/views/formManage/curing/AirCompressorChecklistMonth.vue'),
        formGroup: ['curing', 'maintain']
    },
    {
        linkText: '空氣壓縮機(年)定期檢查表',
        path: '/form-manage/curing/air-compressor-checklist-year',
        component: () => import('@/views/formManage/curing/AirCompressorChecklistYear.vue'),
        formGroup: ['curing', 'maintain']
    },
    {
        linkText: '客貨車使用前後保養日報表',
        path: '/form-manage/curing/van-maintenance-daily-report',
        component: () => import('@/views/formManage/curing/VanMaintenanceDailyReport.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '砂(研)磨機(季)定期檢查表',
        path: '/form-manage/curing/grinder-checklist',
        component: () => import('@/views/formManage/curing/GrinderChecklist.vue'),
        formGroup: ['curing', 'maintain']
    },
    {
        linkText: '搶修車設備定期保養紀錄表',
        path: '/form-manage/curing/rescuecar-checklist',
        component: () => import('@/views/formManage/curing/RescueCarChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '客車二級檢修記錄表',
        path: '/form-manage/curing/bus-two-checklist',
        component: () => import('@/views/formManage/curing/BusTwoChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '客車三級檢修記錄表',
        path: '/form-manage/curing/bus-three-checklist',
        component: () => import('@/views/formManage/curing/BusThreeChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '電焊機作業前自動檢點表',
        path: '/form-manage/curing/electric-welding-machine-checklist',
        component: () => import('@/views/formManage/curing/ElectricWeldingMachineChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '電焊機(月)定期檢查表',
        path: '/form-manage/curing/electric-welding-machine-checklist-month',
        component: () => import('@/views/formManage/curing/ElectricWeldingMachineChecklistMonth.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '轉轍器檢查保養紀錄表',
        path: '/form-manage/curing/track-switch-checklist',
        component: () => import('@/views/formManage/curing/TrackSwitchChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '鑽床(三個月)定期檢查表',
        path: '/form-manage/curing/drill-press-checklist',
        component: () => import('@/views/formManage/curing/DrillPressChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '頂昇機每月定期檢查表',
        path: '/form-manage/curing/jack-up-checklist',
        component: () => import('@/views/formManage/curing/JackUpChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: 'DL50號機車行駛公里及發電機工時統計表',
        path: '/form-manage/curing/dl50km-generatorhours',
        component: () => import('@/views/formManage/curing/DL50kmGeneratorHours.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '堆高機作業前自動檢點表',
        path: '/form-manage/curing/stacker-checklist',
        component: () => import('@/views/formManage/curing/StackerChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '堆高機(月)定期檢查表',
        path: '/form-manage/curing/stacker-checklist-month',
        component: () => import('@/views/formManage/curing/StackerChecklistMonth.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '堆高機(年)定期檢查表',
        path: '/form-manage/curing/stacker-checklist-year',
        component: () => import('@/views/formManage/curing/StackerChecklistYear.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '吊掛用具作業前自動檢點表',
        path: '/form-manage/curing/hanging-eqpt-checklist',
        component: () => import('@/views/formManage/curing/HangingEqptChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '吊掛用具(月)定期檢查表',
        path: '/form-manage/curing/hanging-eqpt-checklist-season',
        component: () => import('@/views/formManage/curing/HangingEqptChecklistSeason.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '鍋爐作業前自動檢點表',
        path: '/form-manage/curing/boiler-checklist',
        component: () => import('@/views/formManage/curing/BoilerChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '鍋爐(月)定期檢查表',
        path: '/form-manage/curing/boiler-checklist-month',
        component: () => import('@/views/formManage/curing/BoilerChecklistMonth.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '鍋爐(年)定期檢查表',
        path: '/form-manage/curing/boiler-checklist-year',
        component: () => import('@/views/formManage/curing/BoilerChecklistYear.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '固定式起重機作業前自動檢點表',
        path: '/form-manage/curing/bridge-crane-checklist',
        component: () => import('@/views/formManage/curing/BridgeCraneChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '固定式起重機(月)定期檢查表',
        path: '/form-manage/curing/bridge-crane-checklist-month',
        component: () => import('@/views/formManage/curing/BridgeCraneChecklistMonth.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '固定式起重機(年)定期檢查表',
        path: '/form-manage/curing/bridge-crane-checklist-year',
        component: () => import('@/views/formManage/curing/BridgeCraneChecklistYear.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '引擎規範',
        path: '/form-manage/curing/engine-spec',
        component: () => import('@/views/formManage/curing/EngineSpec.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '規範及設備裝置',
        path: '/form-manage/curing/spec-equip',
        component: () => import('@/views/formManage/curing/SpecEquip.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '客車一級檢修紀錄表',
        path: '/form-manage/curing/bus-checklist',
        component: () => import('@/views/formManage/curing/BusChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '客貨車工作日誌',
        path: '/form-manage/curing/vehicle-workLog',
        component: () => import('@/views/formManage/curing/VehicleWorkLog.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '柴油機車使用前後工作日誌',
        path: '/form-manage/curing/diesel-machine-workLog',
        component: () => import('@/views/formManage/curing/DieselMachineWorkLog.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '客貨車輛日報表',
        path: '/form-manage/curing/vehicle-status-daily-report',
        component: () => import('@/views/formManage/curing/VehicleStatusDailyReport.vue'),
        formGroup: ['curing']
    },
]