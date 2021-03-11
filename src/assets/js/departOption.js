// -------- 組織下拉選單 --------

export const departOptions = [
    { text: '處長室', value: 'ARCO001' },
    { text: '副處長室', value: 'ARCO002' },
    { text: '秘書室', value: 'ARCO023' },
    { text: '綜合企劃科', value: 'ARCO003' },
    { text: '鐵路服務科', value: 'ARCO004' },
    { text: '鐵路維護科', value: 'ARCO015' },
    { text: '車輛養護科', value: 'ARCO019' },
    { text: '人事室', value: 'ARCO024' },
    { text: '主計室', value: 'ARCO025' },
    { text: '政風室', value: 'ARCO026' },
    { text: '秘書', value: 'ARCO027' },
]

// 組織下拉選單 (期初報告書圖2-21)
export const dapartOptsBrief = [
    { text: '* 科室', disabled: true },
    { text: '處長室', value: '處長室' },
    { text: '副處長室', value: '副處長室' },
    { text: '秘書', value: '秘書' },
    { text: '綜合企劃科', value: '綜合企劃科' },
    { text: '鐵路服務科', value: '鐵路服務科' },
    { text: '鐵路維護科', value: '鐵路維護科' },
    { text: '車輛養護科', value: '車輛養護科' },
    { text: '秘書室', value: '秘書室' },
    { text: '人事室', value: '人事室' },
    { text: '主計室', value: '主計室' },
    { text: '政風室', value: '政風室' },
    { divider: true },
    { text: '* 車站', disabled: true },
    { text: '嘉義車站', value: '嘉義車站' },
    { text: '北門車站', value: '北門車站' },
    { text: '鹿麻產車站', value: '鹿麻產車站' },
    { text: '竹崎車站', value: '竹崎車站' },
    { text: '木屐寮車站', value: '木屐寮車站' },
    { text: '樟腦寮車站', value: '樟腦寮車站' },
    { text: '獨立山車站', value: '獨立山車站' },
    { text: '梨園寮車站', value: '梨園寮車站' },
    { text: '交力坪車站', value: '交力坪車站' },
    { text: '水社寮車站', value: '水社寮車站' },
    { text: '奮起湖車站', value: '奮起湖車站' },
    { text: '多林車站', value: '多林車站' },
    { text: '十字路車站', value: '十字路車站' },
    { text: '屏遮那車站', value: '屏遮那車站' },
    { text: '二萬平車站', value: '二萬平車站' },
    { text: '神木車站', value: '神木車站' },
    { text: '阿里山車站', value: '阿里山車站' },
    { text: '沼平車站', value: '沼平車站' },
    { text: '祝山車站', value: '祝山車站' },
    { text: '對高岳車站', value: '對高岳車站' },
    { divider: true },
    { text: '* 監工區', disabled: true },
    { text: '竹崎監工區', value: '竹崎監工區' },
    { text: '奮起湖監工區', value: '奮起湖監工區' },
    { text: '阿里山監工區', value: '阿里山監工區' },
    { divider: true },
    { text: '* 工廠、車庫', disabled: true },
    { text: '修理工廠', value: '修理工廠' },
    { text: '嘉義車庫', value: '嘉義車庫' },
    { text: '阿里山車庫', value: '阿里山車庫' },
]

// 組織下拉選單 (慢行通報用)
export const dapartOptsForMember = [
    { text: '* 科室', disabled: true },
    { text: '處長室', value: '處長室' },
    { text: '副處長室', value: '副處長室' },
    { text: '秘書', value: '秘書' },
    { text: '綜合企劃科', value: '綜合企劃科' },
    { text: '鐵路服務科', value: '鐵路服務科' },
    { text: '鐵路維護科', value: '鐵路維護科' },
    { text: '車輛養護科', value: '車輛養護科' },
    { text: '秘書室', value: '秘書室' },
    { text: '人事室', value: '人事室' },
    { text: '主計室', value: '主計室' },
    { text: '政風室', value: '政風室' },
    { divider: true },
    { text: '* 車站', disabled: true },
    { text: '北門車站', value: '北門車站' },
    { text: '竹崎車站', value: '竹崎車站' },
    { text: '交力坪車站', value: '交力坪車站' },
    { text: '奮起湖車站', value: '奮起湖車站' },
    { text: '二萬平車站', value: '二萬平車站' },
    { text: '神木車站', value: '神木車站' },
    { text: '阿里山車站', value: '阿里山車站' },
    { text: '沼平車站', value: '沼平車站' },
    { text: '祝山車站', value: '祝山車站' },
    { divider: true },
    { text: '* 監工區、道班', disabled: true },
    { text: '竹崎監工區', value: '竹崎監工區' },
    { text: '阿里山監工區', value: '阿里山監工區' },
    { text: '第1道班(北門)', value: '第1道班(北門)' },
    { text: '第2道班(竹崎)', value: '第2道班(竹崎)' },
    { text: '第3道班(樟腦寮)', value: '第3道班(樟腦寮)' },
    { text: '第4道班(交力坪)', value: '第4道班(交力坪)' },
    { text: '第5道班(奮起湖)', value: '第5道班(奮起湖)' },
    { text: '第6道班(十字路)', value: '第6道班(十字路)' },
    { text: '第7道班(二萬平)', value: '第7道班(二萬平)' },
    { text: '第8道班(神木)', value: '第8道班(神木)' },
    { text: '第9道班(祝山)', value: '第9道班(祝山)' },
    { divider: true },
    { text: '* 工廠、車庫', disabled: true },
    { text: '修理工廠', value: '修理工廠' },
    { text: '嘉義車庫', value: '嘉義車庫' },
    { text: '阿里山車庫', value: '阿里山車庫' },
]

//-------- 組織下拉選單 部門代號對照表(表單用) --------
export const formDepartOptions = [
    { text: '綜合企劃科', value: 'ARCO003' },
    { text: '鐵路服務科', value: 'ARCO004' },
    { text: '鐵路維護科', value: 'ARCO015' },
    { text: '車輛養護科', value: 'ARCO019' },
    { text: '祕書室', value: 'ARCO023' },
    { text: '人事室', value: 'ARCO024' },
    { text: '主計室', value: 'ARCO025' },
    { text: '政風室', value: 'ARCO026' },
]