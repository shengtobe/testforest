// -------- 表單-車輛養護科 -------

export const FormCuringRouter = [{
        linkText: '車歷卡', // 3
        path: '/form-manage/curing/power-car-maintenance',
        component: () =>
            import ('@/views/formManage/curing/PowerCarMaintenance.vue'),
        formGroup: ['curing']
    },
    {
        linkText: 'SL__/DL__進廠維修紀錄', // 1
        path: '/form-manage/curing/sl-31',
        component: () =>
            import ('@/views/formManage/curing/SL-31Maintenance-Record.vue'),
        formGroup: ['curing']
    },
    {
        linkText: 'SL__/DL__故障原因紀錄表', // 2
        path: '/form-manage/curing/malfunction-reason',
        component: () =>
            import ('@/views/formManage/curing/MalfunctionReason.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '柴油引擎保養', // 5
        path: '/form-manage/curing/diesel-engine-maintenance',
        component: () =>
            import ('@/views/formManage/curing/DieselEngineMaintenance.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '柴油液力機車發電機檢修', // 8
        path: '/form-manage/curing/locomotive-generator-overhaul',
        component: () =>
            import ('@/views/formManage/curing/LocomotiveGeneratorOverhaul.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '機車韌缸漏氣量檢測紀錄表', // 9
        path: '/form-manage/curing/locomotive-leakgas',
        component: () =>
            import ('@/views/formManage/curing/LocomotiveLeakGas.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '柴油液力機車一級檢修記錄表', // 17
        path: '/form-manage/curing/locomotive-one-level-maintenance',
        component: () =>
            import ('@/views/formManage/curing/LocomotiveOneMaintenance.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '柴油液力機車一級檢修記錄表Add', // 17
        path: '/form-manage/curing/locomotive-one-level-maintenance-add',
        component: () =>
            import ('@/views/formManage/curing/LocomotiveOneMaintenanceAdd.vue'),
        formGroup: []
    },
    {
        linkText: '柴油液力機車二級檢修紀錄表', // 18
        path: '/form-manage/curing/locomotive-two-level-maintenance',
        component: () =>
            import ('@/views/formManage/curing/LocomotiveTwoMaintenance.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '柴油液力機車二級檢修紀錄表Add', // 18
        path: '/form-manage/curing/locomotive-two-level-maintenance-add',
        component: () =>
            import ('@/views/formManage/curing/LocomotiveTwoMaintenanceAdd.vue'),
        formGroup: []
    },
    {
        linkText: '柴油液力機車三級檢修紀錄表', // 19
        path: '/form-manage/curing/locomotive-three-level-maintenance',
        component: () =>
            import ('@/views/formManage/curing/LocomotiveThreeMaintenance.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '柴油液力機車三級檢修紀錄表Add', // 19
        path: '/form-manage/curing/locomotive-three-level-maintenance-add',
        component: () =>
            import ('@/views/formManage/curing/LocomotiveThreeMaintenanceAdd.vue'),
        formGroup: []
    },
    {
        linkText: '柴油液力機車四級檢修紀錄表', // 20
        path: '/form-manage/curing/locomotive-four-level-maintenance',
        component: () =>
            import ('@/views/formManage/curing/LocomotiveFourMaintenance.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '柴油液力機車四級檢修紀錄表Add', // 20
        path: '/form-manage/curing/locomotive-four-level-maintenance-add',
        component: () =>
            import ('@/views/formManage/curing/LocomotiveFourMaintenanceAdd.vue'),
        formGroup: []
    },
    {
        linkText: '乙炔熔接裝置每日作業前檢點表(作業前)', // 22
        path: '/form-manage/curing/acetylene-weld-checklist',
        component: () =>
            import ('@/views/formManage/curing/AcetyleneWeldChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '乙炔熔接裝置定期檢查表(年)', // 24
        path: '/form-manage/curing/acetylene-weld-checklist-year',
        component: () =>
            import ('@/views/formManage/curing/AcetyleneWeldChecklistYear.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '車輪輪緣高度、厚度檢查紀錄表', // 31
        path: '/form-manage/curing/wheel-thickness-checklist',
        component: () =>
            import ('@/views/formManage/curing/WheelThicknessChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '空氣壓縮機每日作業前檢點表(作業前)', // 34
        path: '/form-manage/curing/air-compressor-checklist-before',
        component: () =>
            import ('@/views/formManage/curing/AirCompressorChecklistBefore.vue'),
        formGroup: ['curing', 'maintain']
    },
    {
        linkText: '空氣壓縮機定期檢查表(月)', // 35
        path: '/form-manage/curing/air-compressor-checklist-month',
        component: () =>
            import ('@/views/formManage/curing/AirCompressorChecklistMonth.vue'),
        formGroup: ['curing', 'maintain']
    },
    {
        linkText: '空氣壓縮機定期檢查表(年)', // 36
        path: '/form-manage/curing/air-compressor-checklist-year',
        component: () =>
            import ('@/views/formManage/curing/AirCompressorChecklistYear.vue'),
        formGroup: ['curing', 'maintain']
    },
    {
        linkText: '客、貨車使用前後檢修記錄表', // 38
        path: '/form-manage/curing/van-maintenance-daily-report',
        component: () =>
            import ('@/views/formManage/curing/VanMaintenanceDailyReport.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '砂輪機定期檢查表(三個月)', // 39
        path: '/form-manage/curing/grinder-checklist',
        component: () =>
            import ('@/views/formManage/curing/GrinderChecklist.vue'),
        formGroup: ['curing', 'maintain']
    },
    {
        linkText: '搶修車設備定期保養紀錄表', // 44
        path: '/form-manage/curing/rescuecar-checklist',
        component: () =>
            import ('@/views/formManage/curing/RescueCarChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '客車二級檢修記錄表', // 45
        path: '/form-manage/curing/bus-two-checklist',
        component: () =>
            import ('@/views/formManage/curing/BusTwoChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '客車三級檢修記錄表', // 46
        path: '/form-manage/curing/bus-three-checklist',
        component: () =>
            import ('@/views/formManage/curing/BusThreeChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '電焊機每日作業前檢點表(作業前)', // 47
        path: '/form-manage/curing/electric-welding-machine-checklist',
        component: () =>
            import ('@/views/formManage/curing/ElectricWeldingMachineChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '電焊機(月)定期檢查表', // 48
        path: '/form-manage/curing/electric-welding-machine-checklist-month',
        component: () =>
            import ('@/views/formManage/curing/ElectricWeldingMachineChecklistMonth.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '轉轍器檢查保養紀錄表', // 50
        path: '/form-manage/curing/track-switch-checklist',
        component: () =>
            import ('@/views/formManage/curing/TrackSwitchChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '鑽床(三個月)定期檢查表', // 52
        path: '/form-manage/curing/drill-press-checklist',
        component: () =>
            import ('@/views/formManage/curing/DrillPressChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '頂升機定期檢查表(三個月)', // 57
        path: '/form-manage/curing/jack-up-checklist',
        component: () =>
            import ('@/views/formManage/curing/JackUpChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: 'DL50號機車行駛公里及發電機工時統計表', // 60
        path: '/form-manage/curing/dl50km-generatorhours',
        component: () =>
            import ('@/views/formManage/curing/DL50kmGeneratorHours.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '堆高機每日作業前檢點表(作業前)', // 74
        path: '/form-manage/curing/stacker-checklist',
        component: () =>
            import ('@/views/formManage/curing/StackerChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '堆高機定期檢查表(月)', // 75
        path: '/form-manage/curing/stacker-checklist-month',
        component: () =>
            import ('@/views/formManage/curing/StackerChecklistMonth.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '堆高機定期檢查表(年)', //76
        path: '/form-manage/curing/stacker-checklist-year',
        component: () =>
            import ('@/views/formManage/curing/StackerChecklistYear.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '吊掛用具每日作業檢點表(作業前)', // 81
        path: '/form-manage/curing/hanging-eqpt-checklist',
        component: () =>
            import ('@/views/formManage/curing/HangingEqptChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '吊掛用具定期檢查表(三個月)', // 82
        path: '/form-manage/curing/hanging-eqpt-checklist-season',
        component: () =>
            import ('@/views/formManage/curing/HangingEqptChecklistSeason.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '鍋爐每日作業前檢點表(作業前)', // 92
        path: '/form-manage/curing/boiler-checklist',
        component: () =>
            import ('@/views/formManage/curing/BoilerChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '鍋爐定期檢查表(月)', // 93
        path: '/form-manage/curing/boiler-checklist-month',
        component: () =>
            import ('@/views/formManage/curing/BoilerChecklistMonth.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '鍋爐定期檢查表(年)', // 94
        path: '/form-manage/curing/boiler-checklist-year',
        component: () =>
            import ('@/views/formManage/curing/BoilerChecklistYear.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '固定式貣重機每日作業前檢點表(作業前)', // 70
        path: '/form-manage/curing/bridge-crane-checklist',
        component: () =>
            import ('@/views/formManage/curing/BridgeCraneChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '固定式貣重機定期檢查表(月)', // 71
        path: '/form-manage/curing/bridge-crane-checklist-month',
        component: () =>
            import ('@/views/formManage/curing/BridgeCraneChecklistMonth.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '固定式貣重機定期檢查表(年)', // 72
        path: '/form-manage/curing/bridge-crane-checklist-year',
        component: () =>
            import ('@/views/formManage/curing/BridgeCraneChecklistYear.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '引擎規範', // 104
        path: '/form-manage/curing/engine-spec',
        component: () =>
            import ('@/views/formManage/curing/EngineSpec.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '規範及設備裝置', // 105
        path: '/form-manage/curing/spec-equip',
        component: () =>
            import ('@/views/formManage/curing/SpecEquip.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '客車一級檢修記錄表', // 112
        path: '/form-manage/curing/bus-checklist',
        component: () =>
            import ('@/views/formManage/curing/BusChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '客貨車工作日誌', // 101
        path: '/form-manage/curing/vehicle-workLog',
        component: () =>
            import ('@/views/formManage/curing/VehicleWorkLog.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '柴油機車使用前後工作日誌', // 102
        path: '/form-manage/curing/diesel-machine-workLog',
        component: () =>
            import ('@/views/formManage/curing/DieselMachineWorkLog.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '_____車庫客貨車輛狀態日報表', // 15
        path: '/form-manage/curing/vehicle-status-daily-report',
        component: () =>
            import ('@/views/formManage/curing/VehicleStatusDailyReport.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '_____車庫動力車狀態日報表', // 16
        path: '/form-manage/curing/chiayi-power-car-report',
        component: () =>
            import ('@/views/formManage/curing/ChiayiPowerCarReport.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '鐵路維護科工作日誌', // 103
        path: '/form-manage/curing/railway-worklog',
        component: () =>
            import ('@/views/formManage/curing/RailwayWorkLog.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '鐵路維護科工作日誌Add', // 103
        path: '/form-manage/curing/railway-worklog-add',
        component: () =>
            import ('@/views/formManage/curing/RailwayWorkLogAdd.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '_____柴油液力機車行車紀錄表', // 40
        path: '/form-manage/curing/diesel-maintenance-dailyreport',
        component: () =>
            import ('@/views/formManage/curing/DieselMaintenanceDailyReport.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '平交道功能檢查紀錄表', // 51
        path: '/form-manage/curing/level-crossing-function-checklist',
        component: () =>
            import ('@/views/formManage/curing/LevelCrossingFunctionChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '平交道功能檢查紀錄表Add', // 51
        path: '/form-manage/curing/level-crossing-function-checklist-add',
        component: () =>
            import ('@/views/formManage/curing/LevelCrossingFunctionChecklistAdd.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '氬焊機每日作業前檢點表(作業前)', // 新增3.
        path: '/form-manage/curing/argon-welding-machine-checklist',
        component: () =>
            import ('@/views/formManage/curing/ArgonWeldingMachineChecklist.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '氬焊機定期檢查表(月)', // 新增4.
        path: '/form-manage/curing/argon-welding-machine-checklist-month',
        component: () =>
            import ('@/views/formManage/curing/ArgonWeldingMachineChecklistMonth.vue'),
        formGroup: ['curing']
    },
    {
        linkText: '緊急沖淋洗眼設備定期檢查表(月)', // 新增5.
        path: '/form-manage/curing/drench-shower-eyewash-checklistMonth',
        component: () =>
            import ('@/views/formManage/curing/DrenchShowerEyewashChecklistMonth.vue'),
        formGroup: ['curing']
    },
]