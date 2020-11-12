// ----- smis 的測試資料 -----

// 行車事故事件--通報用
export const carEventItems = [
    {
        id: '999',
        date: '2020-07-01 14:05:00',
        location: '阿里山站',
        evtType: '車輛故障',
        deathCount: 0,
        status: 1,
        eqLoss: '',
        serviceShock: '停駛',
    },
    {
        id: '982',
        date: '2020-06-18 09:16:00',
        location: '主線 12K+0M',
        evtType: '平交道事故',
        deathCount: 0,
        status: 2,
        eqLoss: '柵欄損壞',
        serviceShock: '誤點10分鐘',
    },
    {
        id: '977',
        date: '2020-06-04 12:12:00',
        location: '竹崎站',
        evtType: '其他事件',
        deathCount: 0,
        status: 3,
        eqLoss: '',
        serviceShock: '',
    },
    {
        id: '803',
        date: '2020-03-24 12:00:00',
        location: '嘉義站',
        evtType: '其他事件',
        deathCount: 0,
        status: 4,
        eqLoss: '',
        serviceShock: '',
    },
    {
        id: '722',
        date: '2020-01-15 14:30:00',
        location: '眠月站',
        evtType: '其他事件',
        deathCount: 0,
        status: 5,
        eqLoss: '',
        serviceShock: '',
    },
]

// 結職災事故
export const jobEventItems = [
    {
        id: '803',
        date: '2020-06-14 16:20:00',
        memberType: '本處員工',
        name: '陳小華',
        location: '嘉義站售票大廳',
        evtType: '工作傷害事故',
        harmType: '跌倒',
        result: '輕傷',
    },
    {
        id: '412',
        date: '2020-06-18 09:16:00',
        memberType: '本處員工',
        name: '王永慶',
        location: '阿里山站廁所',
        evtType: '工作傷害事故',
        harmType: '跌倒',
        result: '輕傷',
    },
    {
        id: '211',
        date: '2020-06-04 12:12:00',
        memberType: '承攬商勞工',
        name: '劉得華',
        location: '阿里山站售票大廳',
        evtType: '工作傷害事故',
        harmType: '不當動作',
        result: '輕傷',
    },
]

// 行車危害
export const carHarmItems = [
    {
        id: 'K0152',
        caption: '危害說明文字危害說明文字危害說明文字危害說明文字危害說明文字危害說明文字危害說明文字危害說明文字危害說明文字危害說明文字危害說明文字危害說明文字',
        reason: '直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字',
        deriveEvt: '衍生事故文字衍生事故文字衍生事故文字衍生事故文字衍生事故文字衍生事故文字衍生事故文字衍生事故文字衍生事故文字衍生事故文字衍生事故文字衍生事故文字',
        serviceMode: '維修',
        level: '2',
    },
    {
        id: 'K5658',
        caption: '危害說明文字危害說明文字危害說明文字危害說明文字危害說明文字危害說明文字危害說明文字危害說明文字危害說明文字危害說明文字危害說明文字危害說明文字',
        reason: '直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字',
        deriveEvt: '衍生事故文字衍生事故文字衍生事故文字衍生事故文字衍生事故文字衍生事故文字衍生事故文字衍生事故文字衍生事故文字衍生事故文字衍生事故文字衍生事故文字',
        serviceMode: '維修',
        level: '2',
    },
    {
        id: 'K3457',
        caption: '危害說明文字危害說明文字危害說明文字危害說明文字危害說明文字危害說明文字危害說明文字危害說明文字危害說明文字危害說明文字危害說明文字危害說明文字',
        reason: '直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字直接原因文字',
        deriveEvt: '衍生事故文字衍生事故文字衍生事故文字衍生事故文字衍生事故文字衍生事故文字衍生事故文字衍生事故文字衍生事故文字衍生事故文字衍生事故文字衍生事故文字',
        serviceMode: '維修',
        level: '1',
    },
]

// 職災危害
export const jobHarmItems = [
    {
        id: '52365-10-06',
        name: '王小明',
        content: '工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字',
        env: '廠房',
        tools: '堆高機',
        harmType: '不當動作',
        riskSerious: 'S2',
        riskLevel: 'R3',
    },
    {
        id: '313685-02-09',
        name: '陳小美',
        content: '工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字',
        env: '廠房',
        tools: '手工具',
        harmType: '不當動作',
        riskSerious: 'S1',
        riskLevel: 'R1',
    },
    {
        id: '52365-10-02',
        name: '王小明',
        content: '工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字',
        env: '噪音',
        tools: '衝床',
        harmType: '不當動作',
        riskSerious: 'S2',
        riskLevel: 'R2',
    },
    {
        id: '52365-10-01',
        name: '劉小三',
        content: '工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字工作內容文字',
        env: '辦公室',
        tools: '美工刀',
        harmType: '被切、割、擦傷',
        riskSerious: 'S1',
        riskLevel: 'R1',
    },
]

// 立案類型統計圖
export const caseTypeChartData = {
    // x 軸標題 (過去12個月)
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],

    // 以行車事故事件立案(新登錄)
    c1: [1, 2, 1, 2, 5, 1, 0, 0, 2, 0, 1, 3],

    // 以行車事故事件立案(已登錄)
    c2: [1, 1, 1, 3, 1, 0, 0, 5, 7, 0, 1, 0],

    // 以行車危害立案(新登錄)
    c3: [5, 24, 7, 8, 19, 4, 31, 4, 13, 7, 22, 1],

    // 以行車危害立案(已登錄)
    c4: [11, 13, 20, 1, 22, 14, 6, 0, 2, 14, 1, 0],

    // 以職災事故事件立案(新登錄)
    c5: [20, 10, 15, 31, 30, 20, 44, 20, 13, 1, 17, 5],

    // 以職災事故事件立案(已登錄)
    c6: [0, 3, 2, 1, 4, 0, 7, 0, 7, 1, 1, 2],

    // 以職災危害立案(新登錄)
    c7: [0, 2, 4, 1, 0, 0, 0, 1, 1, 0, 2, 0],

    // 以職災危害立案(已登錄)
    c8: [33, 10, 10, 27, 40, 1, 2, 7, 11, 9, 23, 0],

    // 不立案
    c9: [1, 1, 1, 3, 1, 0, 0, 5, 7, 0, 1, 0],

    // 未立案
    c10: [8, 6, 12, 23, 1, 0, 5, 7, 4, 10, 2, 3],
}

// 各部門通報次數趨勢
export const departChartData = {
    // x 軸標題 (過去12個月)
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],

    // 綜合企劃科
    planning: [20, 10, 15, 31, 30, 20, 44, 20, 13, 1, 17, 5],

    // 鐵路服務科
    serve: [33, 10, 10, 27, 40, 1, 2, 7, 11, 9, 23, 0],

    // 鐵路維護科
    maintain: [5, 24, 7, 8, 19, 4, 31, 4, 13, 7, 22, 1],

    // 車輛養護科
    curing: [11, 13, 20, 1, 22, 14, 6, 0, 2, 14, 1, 0],

    // 祕書室
    secretary: [1, 2, 1, 2, 5, 1, 0, 0, 2, 0, 1, 3],

    // 人事室
    personnel: [0, 3, 2, 1, 4, 0, 7, 0, 7, 1, 1, 2],

    // 主計室
    accountant: [0, 2, 4, 1, 0, 0, 0, 1, 1, 0, 2, 0],

    // 政風室
    political: [1, 1, 1, 3, 1, 0, 0, 5, 7, 0, 1, 0],
}

// 各類通報趨勢圖
export const TypeChartData = {
    // x 軸標題
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],

    // 事故事件
    evt: [20, 10, 15, 31, 30, 20, 44, 12, 15, 7, 26, 8],

    // 危害通報
    harm: [33, 10, 10, 27, 40, 1, 2, 11, 5, 18, 20, 7],

    // 其他通報
    other: [5, 24, 7, 8, 19, 4, 31, 20, 4, 9, 1, 6],
}

// 各大類事故事件趨勢圖
export const MainTypeChartData = {
    // x 軸標題
    labels: ['2015年', '2016年', '2017年', '2018年', '2019年'],

    // 重大事故
    major: [5, 8, 6, 4, 3],

    // 一般事故
    general: [13, 10, 15, 14, 9],

    // 異常事件
    abnormal: [15, 24, 17, 19, 10],
}

// 重大事故類事故事件趨勢圖
export const MajorTypeChartData = {
    // x 軸標題
    labels: ['2015年', '2016年', '2017年', '2018年', '2019年'],

    m1: [1, 2, 0, 1, 2],  // 正線衝撞事故
    m2: [3, 1, 5, 4, 3],  // 正線出軌事故
    m3: [2, 1, 6, 2, 5],  // 正線火災事故
}

// 一般事故類事故事件趨勢圖
export const GeneralTypeChartData = {
    // x 軸標題
    labels: ['2015年', '2016年', '2017年', '2018年', '2019年'],

    g1: [11, 12, 10, 7, 9],  // 側線衝撞事故
    g2: [23, 11, 15, 24, 3],  // 側線出軌事故
    g3: [5, 21, 6, 22, 15],  // 側線火災事故
    g4: [7, 3, 16, 22, 25],  // 平交道事故
    g5: [2, 1, 6, 2, 5],  // 人員死傷事故
    g6: [12, 21, 6, 22, 15],  // 設備損害事故
    g7: [32, 11, 26, 12, 25],  // 運轉中斷事故
}

// 異常事件類事故事件趨勢圖
export const AbnormalTypeChartData = {
    // x 軸標題
    labels: ['2015年', '2016年', '2017年', '2018年', '2019年'],

    a1: [11, 2, 20, 11, 32],  // 列車或車輛分離
    a2: [3, 31, 5, 24, 3],  // 進入錯線
    a3: [12, 1, 16, 2, 25],  // 冒進號誌
    a4: [21, 32, 0, 11, 32],  // 列車或車輛溜逸
    a5: [3, 21, 35, 4, 13],  // 違反閉塞運轉
    a6: [2, 1, 16, 12, 35],  // 違反號誌運轉
    a7: [21, 12, 20, 1, 12],  // 號誌處理錯誤
    a8: [23, 11, 5, 4, 23],  // 車輛故障
    a9: [2, 31, 26, 2, 25],  // 路線障礙
    a10: [1, 12, 30, 1, 2],  // 電子設備故障
    a11: [33, 1, 5, 4, 33],  // 運轉保安裝置故障
    a12: [2, 21, 6, 2, 5],  // 外物入侵
    a13: [21, 2, 0, 21, 2],  // 危險品洩漏
    a14: [13, 31, 5, 4, 3],  // 駕駛失能
    a15: [2, 1, 36, 2, 15],  // 天然災變
    a16: [31, 2, 0, 21, 12],  // 列車取消
    a17: [13, 21, 5, 34, 3],  // 其他事件
}

// 危害資料庫-危害
export const carHarmDBHarms = [
    {
        id: '11',
        mode: '維修',
        serious: '稍微 (S4)',
        frequency: '偶爾 (P3)',
        level: '可接受，持續控管 (R4)',
        status: 1,
    },
    {
        id: '22',
        mode: '緊急',
        serious: '嚴重 (S2)',
        frequency: '幾乎不 (P5)',
        level: '中度風險 (R3)',
        status: 2,
    },
    {
        id: '33',
        mode: '正常',
        serious: '極輕微 (S5)',
        frequency: '偶爾 (P3)',
        level: '可接受，持續控管 (R4)',
        status: 3,
    },
    {
        id: '44',
        mode: '正常',
        serious: '極輕微 (S5)',
        frequency: '幾乎不 (P5)',
        level: '可接受，持續控管 (R4)',
        status: 4,
    },
    {
        id: '55',
        mode: '正常',
        serious: '極輕微 (S5)',
        frequency: '偶爾 (P3)',
        level: '可接受，持續控管 (R4)',
        status: 5,
    },
    {
        id: '66',
        mode: '正常',
        serious: '極輕微 (S5)',
        frequency: '幾乎不 (P5)',
        level: '可接受，持續控管 (R4)',
        status: 6,
    },
    {
        id: '77',
        mode: '正常',
        serious: '嚴重 (S2)',
        frequency: '偶爾 (P3)',
        level: '中度風險 (R3)',
        status: 7,
    },
]

// 危害資料庫-控制措施
export const carHarmDBControls = [
    {
        id: 123,
        subject: '火災處理要點',
        desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',
        depart: '綜合企劃科',
        file: { name: '123.pdf', link: '/demofile/123.pdf' },
        note: '',
        evidences: [
            {
                name: '456.xlsx',
                link: '/demofile/456.xlsx'
            },
            {
                name: '123.pdf',
                link: '/demofile/123.pdf'
            },
        ],
    },
    {
        id: 456,
        subject: '中暑急救要點',
        desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',
        depart: '綜合企劃科',
        file: { name: '123.docx', link: '/demofile/123.docx' },
        note: '',
        evidences: [
            {
                name: '123.pdf',
                link: '/demofile/123.pdf'
            },
        ],
    },
    {
        id: 789,
        subject: '火車誤點處理措施',
        desc: '說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字',
        depart: '鐵路服務科',
        file: { name: '456.xlsx', link: '/demofile/456.xlsx' },
        note: '',
        evidences: [
            {
                name: '123.pdf',
                link: '/demofile/123.pdf'
            },
            {
                name: '123.docx',
                link: '/demofile/123.docx'
            },
        ],
    },
]


// 安全文件
export const safeDocs = [
    {
        id: 20,
        depart: '鐵路維護科',
        file: {
            name: '456.xlsx',
            link: '/demofile/456.xlsx'
        },
        note: '',
        type: '品質文件',
        version: '1.0.0',
        updateTime: '2019-05-11 12:20:00',
    },
    {
        id: 18,
        depart: '綜合企劃科',
        file: {
            name: '123.pdf',
            link: '/demofile/123.pdf'
        },
        note: '',
        type: '品質文件',
        version: '2.1.0',
        updateTime: '2019-11-20 16:30:00',
    },
    {
        id: 45,
        depart: '鐵路維護科',
        file: {
            name: '123.docx',
            link: '/demofile/123.docx'
        },
        note: '',
        type: '維修管理文件',
        version: '1.5.7',
        updateTime: '2020-01-06 09:10:00',
    },
]

// 職安績效-科室職災事故統計
export const departAccidentChartData = {
    // x 軸標題 (過去12個月)
    labels: ['維護科', '服務科', '養護科', '秘書室'],
    
    // 件數
    counter: [12, 11, 4, 1],

    // 公傷假
    loss: [339.5, 265.5, 74, 6]
}

// 職安績效-職災傷害類型統計
export const harmTypeChartData = {
    // x 軸標題
    labels: ['被夾', '物體飛落', '交通事故', '跌倒'],
    
    // 資料
    data: [12, 30, 18, 40],
}