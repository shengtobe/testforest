// -------------- smis 相關 -------------
// 首頁 個人資訊/代辦事項 所屬模組
export const InfoBelongMod = [
    { text: '不限', value: '' },
    { text: '危害通報頁面', value: '1' },
    { text: '事故事件管理頁面', value: '2' },
    { text: '行安改善措施檢討頁面', value: '3' },
    { text: '危害控制措施頁面', value: '4' },
    { text: '安全資訊發布頁面', value: '5' },
    { text: '安全會議文件管理頁面', value: '6' },
    { text: '規章文件管理頁面', value: '7' },
    { text: '軔機檢查異常填報頁面', value: '8' },
    { text: '酒測、健康檢查異常填報頁面', value: '9' },
    { text: '車速異常填報頁面', value: '10' },
    { text: '職業災害事故調查表頁面', value: '11' },
    { text: '改善對策頁面', value: '12' },
    { text: '慢行通報', value: '13' },
    { text: '行車危害資料庫', value: '14' },
    { text: '職災危害資料庫', value: '15' },
    { text: '維修養護科工單', value: '16' },
    { text: '服務科工單', value: '17' },
    { text: '設備維修管理', value: '18' },
]
// 行車事故事件狀態
export const carAccidentEventStatus = [
    { text: '不限', value: '' },
    { text: '已立案', value: '1' },
    { text: '審核中', value: '2' },
    { text: '已完備資料', value: '3' },
    { text: '審核中', value: '4' },
    { text: '改善措施已落實', value: '5' },
]

// 行車危害狀態
export const carHarmDbStatus = [
    { text: '未知', value: '' },
    { text: '已立案', value: '1' },
    { text: '審核中', value: '2' },
    { text: '已完備資料', value: '3' },
    { text: '審核中', value: '4' },
    { text: '風險已可接受', value: '5' },
    { text: '審核中', value: '6' },  // 審核更新
    { text: '審核中', value: '7' },  // 審核作廢
]

// 行車安全資訊狀態
export const carSafeInfoStatus = [
    { text: '已立案', value: '1' },
    { text: '審核中', value: '2' },
    { text: '加會中', value: '3' },
    { text: '已發布', value: '4' },
    { text: '未知', value: '' },
]

// 職安事故事件狀態
export const jobDisasterSurveyStatus = [
    { text: '已立案', value: '1' },
    { text: '審核中', value: '2' },
    { text: '已完備資料', value: '3' },
    { text: '審核中', value: '4' },
    { text: '改善措施已落實', value: '5' },
    { text: '未知', value: '' },
]

// 危害通報狀態
export const harmNotifyStatus = [
    { text: '不限', value: '' },
    { text: '未回覆', value: '1' },
    { text: '已回覆尚未立案', value: '2' },
    { text: '已立案', value: '3' },
    { text: '審核中', value: '4' },
]

// 危害通報狀態
export const harmNotifyStatus0 = [
    { text: '不限', value: '' },
    { text: '未回覆', value: '1' },
    { text: '已回覆尚未立案', value: '2' },
    { text: '已結案', value: '3' },
    { text: '審核中', value: '4' },
]

// // 事故類型
// export const evtTypes = [
//     { text: '重大事故-正線衝撞', value: 'M1' },
//     { text: '重大事故-正線出軌', value: 'M2' },
//     { text: '重大事故-正線火災', value: 'M3' },
//     { divider: true },
//     { text: '一般事故-側線衝撞', value: 'G1' },
//     { text: '一般事故-側線出軌', value: 'G2' },
//     { text: '一般事故-側線火災', value: 'G3' },
//     { text: '一般事故-平交道事故', value: 'G4' },
//     { text: '一般事故-人員死傷', value: 'G5' },
//     { text: '一般事故-設備損害', value: 'G6' },
//     { text: '一般事故-運轉中斷', value: 'G7' },
//     { divider: true },
//     { text: '異常事件-列車或車輛分離', value: 'A1' },
//     { text: '異常事件-進入錯線', value: 'A2' },
//     { text: '異常事件-冒進號誌', value: 'A3' },
//     { text: '異常事件-列車或車輛溜逸', value: 'A4' },
//     { text: '異常事件-違反閉塞運轉', value: 'A5' },
//     { text: '異常事件-違反號誌運轉', value: 'A6' },
//     { text: '異常事件-號誌處理錯誤', value: 'A7' },
//     { text: '異常事件-車輛故障', value: 'A8' },
//     { text: '異常事件-路線障礙', value: 'A9' },
//     { text: '異常事件-電子設備故障', value: 'A10' },
//     { text: '異常事件-運轉保安裝置故障', value: 'A11' },
//     { text: '異常事件-外物入侵', value: 'A12' },
//     { text: '異常事件-危險品洩漏', value: 'A13' },
//     { text: '異常事件-駕駛失能', value: 'A14' },
//     { text: '異常事件-天然災變', value: 'A15' },
//     { text: '異常事件-列車取消', value: 'A16' },
//     { text: '異常事件-其他事件', value: 'A17' },
//     { text: '未選擇', value: '' },
// ]

// 事故類型
export const evtTypes = [
    { text: '重大事故-正線衝撞', value: 'A01' },
    { text: '重大事故-正線出軌', value: 'A02' },
    { text: '重大事故-正線火災', value: 'A03' },
    { divider: true },
    { text: '一般事故-側線衝撞', value: 'B01' },
    { text: '一般事故-側線出軌', value: 'B02' },
    { text: '一般事故-側線火災', value: 'B03' },
    { text: '一般事故-平交道事故', value: 'B04' },
    { text: '一般事故-人員死傷', value: 'B05' },
    { text: '一般事故-設備損害', value: 'B06' },
    { text: '一般事故-運轉中斷', value: 'B07' },
    { divider: true },
    { text: '異常事件-列車或車輛分離', value: 'C01' },
    { text: '異常事件-進入錯線', value: 'C02' },
    { text: '異常事件-冒進號誌', value: 'C03' },
    { text: '異常事件-列車或車輛溜逸', value: 'C04' },
    { text: '異常事件-違反閉塞運轉', value: 'C05' },
    { text: '異常事件-違反號誌運轉', value: 'C06' },
    { text: '異常事件-號誌處理錯誤', value: 'C07' },
    { text: '異常事件-車輛故障', value: 'C08' },
    { text: '異常事件-路線障礙', value: 'C09' },
    { text: '異常事件-電子設備故障', value: 'C10' },
    { text: '異常事件-運轉保安裝置故障', value: 'C11' },
    { text: '異常事件-外物入侵', value: 'C12' },
    { text: '異常事件-危險品洩漏', value: 'C13' },
    { text: '異常事件-駕駛失能', value: 'C14' },
    { text: '異常事件-天然災變', value: 'C15' },
    { text: '異常事件-列車取消', value: 'C16' },
    { text: '異常事件-其他事件', value: 'C17' },
    { text: '未選擇', value: '' },
    { text: '其他', value: 'Other' },
]

// 職災危害類型
export const jobHarmType = [
    { text: '墜落、滾落', value: '1' },
    { text: '跌倒', value: '2' },
    { text: '衝撞', value: '3' },
    { text: '物體飛落', value: '4' },
    { text: '物體倒塌、崩塌', value: '5' },
    { text: '被撞', value: '6' },
    { text: '被夾、被捲', value: '7' },
    { text: '被切、割、擦傷', value: '8' },
    { text: '踩踏', value: '9' },
    { text: '溺斃', value: '10' },
    { text: '與高溫、低溫之接觸', value: '11' },
    { text: '與有害物等之接觸', value: '12' },
    { text: '感電', value: '13' },
    { text: '爆炸', value: '14' },
    { text: '物體破裂', value: '15' },
    { text: '火災', value: '16' },
    { text: '不當動作', value: '17' },
    { text: '其他', value: '18' },
    { text: '無法歸類者', value: '19' },
    { text: '上下班公路交通事故', value: '20' },
    { text: '上下班鐵路交通事故', value: '21' },
    { text: '上下班船艙、航空器交通事故', value: '22' },
    { text: '上下班其他交通事故', value: '23' },
    { text: '非上下班公路交通事故', value: '24' },
    { text: '非上下班鐵路交通事故', value: '25' },
    { text: '非上下班船艙、航空器交通事故', value: '26' },
    { text: '非上下班其他交通事故', value: '27' },
    { text: '未選擇', value: '' },
]

// 事故發生地點
export const locationOpts = [
    { text: '本線', value: 'l1' },
    { text: '祝山線', value: 'l2' },
    { text: '眠月線', value: 'l3' },
    { text: '水山線', value: 'l4' },
    { text: '嘉義車站', value: 't1' },
    { text: '北門車站', value: 't2' },
    { text: '鹿滿車站', value: 't3' },
    { text: '竹崎車站', value: 't4' },
    { text: '木屐寮車站', value: 't4-2' },
    { text: '樟腦寮車站', value: 't5' },
    { text: '獨立山車站', value: 't6' },
    { text: '梨園寮車站', value: 't7' },
    { text: '交力坪車站', value: 't8' },
    { text: '水社寮車站', value: 't9' },
    { text: '奮起湖車站', value: 't10' },
    { text: '多林車站', value: 't11' },
    { text: '十字路車站', value: 't12' },
    { text: '屏遮那車站', value: 't13' },
    { text: '第一分道車站', value: 't14' },
    { text: '二萬平車站', value: 't15' },
    { text: '神木車站', value: 't16' },
    { text: '阿里山車站', value: 't17' },
    { text: '沼平車站', value: 't18' },
    { text: '十字分道車站', value: 't19' },
    { text: '對高岳車站', value: 't20' },
    { text: '祝山車站', value: 't21' },
    { text: '塔山車站', value: 't22' },
    { text: '眠月車站', value: 't23' },
    { text: '石猴車站', value: 't24' },
    { text: '水山車站', value: 't25' },
    { text: '嘉義車庫', value: 'g1' },
    { text: '阿里山車庫', value: 'g2' },
    { text: '修理工廠', value: 'factory' },
    { text: '其他', value: 'other' },
    { text: '未選擇', value: '' },
]

// 行車事故 - 第一層因素
export const AccidentFactors1 = [ 
    { text: '未選擇', value: '' },
    { text: '內部因素', value: 'IC' },
    { text: '外部因素', value: 'EC' },
    { text: '未查明原因或其他', value: 'Other' },
]

// 行車事故 - 第二層因素
export const AccidentFactors2 = [ 
    { text: '未選擇', value: '' },
    { parent: 'IC', text: '人為因素', value: '2_HF' },
    { parent: 'IC', text: '車輛', value: '2_RS' },
    { parent: 'IC', text: '路線設施', value: '2_INF' },
    { parent: 'IC', text: '使用者', value: '2_RU' },
    { parent: 'EC', text: '第三方', value: '2_TrdP' },
    { parent: 'EC', text: '天氣與環境', value: '2_WE' },
]

// 行車事故 - 第三層因素
export const AccidentFactors3 = [ 
    { text: '未選擇', value: '' },
    { parent: '2_HF', text: '維修人員', value: '3_TSM' },
    { parent: '2_HF', text: '調度員及號誌員', value: '3_TOSS' },
    { parent: '2_HF', text: '司機員', value: '3_TD' },
    { parent: '2_HF', text: '其他人為因素', value: '3_HFOther' },
    { parent: '2_RS', text: '車輪', value: '3_RG' },
    { parent: '2_RS', text: '其他車輛因素', value: '3_RSOther' },
    { parent: '2_INF', text: '軌道與相關構造', value: '3_TS' },
    { parent: '2_INF', text: '電力系統', value: '3_ES' },
    { parent: '2_INF', text: '其他路線因素', value: '3_INFOther' },
    { parent: '2_RU', text: '乘客', value: '3_P' },
    { parent: '2_RU', text: '其他使用者因素', value: '3_RUOther' },
    { parent: '2_TrdP', text: '入侵路線', value: '3_Tre' },
    { parent: '2_TrdP', text: '車輛入侵平交道', value: '3_VLC' },
    { parent: '2_TrdP', text: '人員入侵平交道', value: '3_PLC' },
    { parent: '2_TrdP', text: '人員在公共區域', value: '3_PRA' },
    { parent: '2_TrdP', text: '其他第三方因素', value: '3_TrdPOther' },
    { parent: '2_WE', text: '環境', value: '3_Env' },
    { parent: '2_WE', text: '天氣', value: '3_Wea' },
]

// 危害資料庫 - 營運模式
export const operateModes = [ 
    { text: '正常', value: 'm1' },
    { text: '降級', value: 'm2' },
    { text: '緊急', value: 'm3' },
    { text: '維修', value: 'm4' },
    { text: '未選擇', value: '' },
]

// 危害資料庫 - 風險嚴重性
export const riskSerious = [
    { text: '極輕微 (S5)', value: 'S5' },
    { text: '稍微 (S4)', value: 'S4' },
    { text: '主要 (S3)', value: 'S3' },
    { text: '嚴重 (S2)', value: 'S2' },
    { text: '災難 (S1)', value: 'S1' },
    { text: '未選擇', value: '' },
]

// 危害資料庫 - 風險頻率
export const riskFrequency = [
    { text: '經常 (P1)', value: 'P1' },
    { text: '很可能 (P2)', value: 'P2' },
    { text: '偶爾 (P3)', value: 'P3' },
    { text: '很少 (P4)', value: 'P4' },
    { text: '幾乎不 (P5)', value: 'P5' },
    { text: '未選擇', value: '' },
    { text: '未選擇', value: null },
]

// 危害資料庫 - 風險等級
export const riskLevel = [
    { text: '非常高度風險 (R1)', value: 'R1' },
    { text: '中高度風險 (R2)', value: 'R2' },
    { text: '中度風險 (R3)', value: 'R3' },
    { text: '可接受，持續控管 (R4)', value: 'R4' },
    { text: '未選擇', value: '' },
]


// 職安-傷害部位
export const injurySiteOpts = [
    { text: '(1) 頭(含眼、耳、鼻、口腔、下顎骨)', value: 1 },
    { text: '(2) 臉頰(不含頭部之臉顏)', value: 2 },
    { text: '(3) 頸', value: 3 },
    { text: '(4) 肩', value: 4 },
    { text: '(5) 鎖骨', value: 5 },
    { text: '(6) 上膊', value: 6 },
    { text: '(7) 肘', value: 7 },
    { text: '(8) 前膊', value: 8 },
    { text: '(9) 腕', value: 9 },
    { text: '(10) 胸', value: 10 },
    { text: '(11) 肋骨', value: 11 },
    { text: '(12) 背', value: 12 },
    { text: '(13) 手', value: 13 },
    { text: '(14) 指', value: 14 },
    { text: '(15) 腹', value: 15 },
    { text: '(16) 臀', value: 16 },
    { text: '(17) 鼠蹊', value: 17 },
    { text: '(18) 股', value: 18 },
    { text: '(19) 膝', value: 19 },
    { text: '(20) 腿', value: 20 },
    { text: '(21) 足', value: 21 },
    { text: '(22) 內臟', value: 22 },
    { text: '(23) 全身', value: 23 },
    { text: '(24) 其他', value: 24 },
    { text: '', value: 0 },
]

// 職安-災害類型
export const disasterTypeOpts = [
    { text: '(1) 墜落、滾落', value: '1' },
    { text: '(2) 跌倒', value: '2' },
    { text: '(3) 衝撞', value: '3' },
    { text: '(4) 物體飛落', value: '4' },
    { text: '(5) 物體倒塌、崩塌', value: '5' },
    { text: '(6) 被撞', value: '6' },
    { text: '(7) 被夾、被捲', value: '7' },
    { text: '(8) 被切、割、擦傷', value: '8' },
    { text: '(9) 踩踏', value: '9' },
    { text: '(10) 溺斃', value: '10' },
    { text: '(11) 與高溫、低溫之接觸', value: '11' },
    { text: '(12) 與有害物等之接觸', value: '12' },
    { text: '(13) 感電', value: '13' },
    { text: '(14) 爆炸', value: '14' },
    { text: '(15) 物體破裂', value: '15' },
    { text: '(16) 火災', value: '16' },
    { text: '(17) 不當動作', value: '17' },
    { text: '(18) 其他', value: '18' },
    { text: '(19) 無法歸類者', value: '19' },
    { text: '(21) 上下班公路交通事故', value: '21' },
    { text: '(22) 上下班鐵路交通事故', value: '22' },
    { text: '(23) 上下班船艙、航空器交通事故', value: '23' },
    { text: '(29) 上下班其他交通事故', value: '29' },
    { text: '(31) 非上下班公路交通事故', value: '31' },
    { text: '(32) 非上下班鐵路交通事故', value: '32' },
    { text: '(33) 非上下班船艙、航空器交通事故', value: '33' },
    { text: '(39) 非上下班其他交通事故', value: '39' },
    { text: '', value: 0 },
]

// 職安-致傷媒介物
export const vehicleOpts = {
    '動力機械': [
        { text: '* 原動機', disabled: true },
        { text: '(111) 原動機', value: 111 },
        { divider: true },
        { text: '* 動力傳導裝置', disabled: true },
        { text: '(121) 傳動軸', value: 121 },
        { text: '(122) 傳動輪', value: 122 },
        { text: '(123) 齒輪', value: 123 },
        { text: '(129) 其他', value: 129 },
        { divider: true },
        { text: '* 木材加工用機械', disabled: true },
        { text: '(131) 圓鋸', value: 131 },
        { text: '(132) 帶鋸', value: 132 },
        { text: '(133) 鉋面鋸', value: 133 },
        { text: '(139) 其他', value: 139 },
        { divider: true },
        { text: '* 營造用機械', disabled: true },
        { text: '(141) 牽引機類設備', value: 141 },
        { text: '(142) 動力鏟類設備', value: 142 },
        { text: '(143) 打樁機、拔樁機', value: 143 },
        { text: '(149) 其他', value: 149 },
        { divider: true },
        { text: '* 一般動力機械', disabled: true },
        { text: '(151) 車床', value: 151 },
        { text: '(152) 鑽床', value: 152 },
        { text: '(153) 研磨床', value: 153 },
        { text: '(154) 沖床、剪床', value: 154 },
        { text: '(155) 鍛壓鎚', value: 155 },
        { text: '(156) 離心機', value: 156 },
        { text: '(157) 錕合機、粉碎機', value: 157 },
        { text: '(158) 滾筒', value: 158 },
        { text: '(159) 其他', value: 159 },
        { text: '無', value: 0 },
    ],
    '裝卸運搬機械': [
        { text: '* 起重機械', disabled: true },
        { text: '(211) 起重機', value: 211 },
        { text: '(212) 移動式起重機', value: 212 },
        { text: '(213) 人字臂起重機', value: 213 },
        { text: '(214) 升降機、提升機', value: 214 },
        { text: '(215) 船舶裝卸裝置', value: 215 },
        { text: '(216) 吊籠', value: 216 },
        { text: '(217) 機械運材、索道機械、集材裝置', value: 217 },
        { text: '(219) 其他', value: 219 },
        { divider: true },
        { text: '* 動力搬機械', disabled: true },
        { text: '(221) 卡車', value: 221 },
        { text: '(222) 堆高機', value: 222 },
        { text: '(223) 事業內、軌道 設備', value: 223 },
        { text: '(224) 輸送帶', value: 224 },
        { text: '(229) 其他', value: 229 },
        { divider: true },
        { text: '* 交通工具', disabled: true },
        { text: '(231) 汽車、公共汽車', value: 231 },
        { text: '(232) 火車', value: 232 },
        { text: '(239) 其他', value: 239 },
        { text: '', value: 0 },
    ],
    '其他設備': [
        { text: '* 壓力容器類', disabled: true },
        { text: '(311) 鍋爐', value: 311 },
        { text: '(312) 壓力容器', value: 312 },
        { text: '(319) 其他', value: 319 },
        { divider: true },
        { text: '* 化學設備', disabled: true },
        { text: '(321) 化學設備', value: 321 },
        { divider: true },
        { text: '* 熔接設備', disabled: true },
        { text: '(331) 氣體熔接', value: 331 },
        { text: '(332) 電弧熔接', value: 332 },
        { text: '(339) 其他', value: 339 },
        { divider: true },
        { text: '* 爐窯等', disabled: true },
        { text: '(341) 爐窯等', value: 341 },
        { divider: true },
        { text: '* 電氣設備', disabled: true },
        { text: '(351) 輸配電線路', value: 351 },
        { text: '(352) 電力設備', value: 352 },
        { text: '(359) 其他', value: 359 },
        { divider: true },
        { text: '* 人力機械工具', disabled: true },
        { text: '(361) 人力起重機', value: 361 },
        { text: '(362) 人力搬運', value: 362 },
        { text: '(363) 人力機械', value: 363 },
        { text: '(364) 手工具', value: 364 },
        { divider: true },
        { text: '* 用具', disabled: true },
        { text: '(371) 梯子等', value: 371 },
        { text: '(372) 吊掛勾具', value: 372 },
        { text: '(379) 其他', value: 379 },
        { divider: true },
        { text: '* 其他設備', disabled: true },
        { text: '(391) 其他設備', value: 391 },
        { text: '', value: 0 },
    ],
    '營建物及施工設備': [
        { text: '* 營建物及施工設備', disabled: true },
        { text: '(411) 施工架', value: 411 },
        { text: '(412) 支撐架', value: 412 },
        { text: '(413) 樓梯、梯道', value: 413 },
        { text: '(414) 開口部份', value: 414 },
        { text: '(415) 屋頂、屋架、樑', value: 415 },
        { text: '(416) 工作台、踏板', value: 416 },
        { text: '(417) 通路', value: 417 },
        { text: '(418) 營建物', value: 418 },
        { text: '(419) 其他', value: 419 },
        { text: '', value: 0 },
    ],
    '物質材料': [
        { text: '* 危險物、有害物', disabled: true },
        { text: '(511) 爆炸性物質', value: 511 },
        { text: '(512) 引火性物質', value: 512 },
        { text: '(513) 可燃性氣體', value: 513 },
        { text: '(514) 有害物', value: 514 },
        { text: '(515) 輻射線', value: 515 },
        { text: '(519) 其他', value: 519 },
        { divider: true },
        { text: '* 材料', disabled: true },
        { text: '(521) 金屬材料', value: 521 },
        { text: '(522) 木材、竹材', value: 522 },
        { text: '(523) 石頭、砂、小石子', value: 523 },
        { text: '(529) 其他', value: 529 },
        { text: '', value: 0 },
    ],
    '貨物': [
        { text: '* 運搬物體', disabled: true },
        { text: '(611) 已包裝貨物', value: 611 },
        { text: '(612) 未包裝機械', value: 612 },
        { text: '', value: 0 },
    ],
    '環境': [
        { text: '* 環境', disabled: true },
        { text: '(711) 土砂、岩石', value: 711 },
        { text: '(712) 立木', value: 712 },
        { text: '(713) 水', value: 713 },
        { text: '(714) 特殊環境', value: 714 },
        { text: '(715) 高低溫環境', value: 715 },
        { text: '(719) 其他', value: 719 },
        { text: '', value: 0 },
    ],
    '其他類': [
        { text: '* 其他媒介物', disabled: true },
        { text: '(911) 其他媒介物', value: 911 },
        { divider: true },
        { text: '* 無媒介物', disabled: true },
        { text: '(921) 無媒介物', value: 921 },
        { divider: true },
        { text: '* 不能分類', disabled: true },
        { text: '(999) 不能分類', value: 999 },
        { text: '', value: 0 },
    ],
}

// 職安-風險嚴重性
export const jobSeriousOpts = [
    { text: '輕度 (S1)', value: 'S1' },
    { text: '中度 (S2)', value: 'S2' },
    { text: '高度 (S3)', value: 'S3' },
    { text: '重大 (S4)', value: 'S4' },
    { text: '極端 (S5)', value: 'S5' },
    { text: '未選擇', value: '' },
]

// 職安-風險可能性
export const jobPossibilityOpts = [
    { text: '非常不可能 (P1)', value: 'P1' },
    { text: '不太可能 (P2)', value: 'P2' },
    { text: '有可能 (P3)', value: 'P3' },
    { text: '較有可能 (P4)', value: 'P4' },
    { text: '極可能 (P5)', value: 'P5' },
    { text: '未選擇', value: '' },
]

// 職安-風險等級
export const jobLevelOpts = [
    { text: '低度風險 (R1)', value: 'R1' },
    { text: '中度風險 (R2)', value: 'R2' },
    { text: '中高度風險 (R3)', value: 'R3' },
    { text: '高度風險 (R4)', value: 'R4' },
    { text: '非常高度風險 (R5)', value: 'R5' },
    { text: '未選擇', value: '' },
]

// 職安-尿蛋白、尿潛血
export const jobUrineOpts = [
    { text: '-', value: "1" },
    { text: '+/-', value: "2" },
    { text: '+', value: "3" },
    { text: '++', value: "4" },
    { text: '+++', value: "5" },
    { text: '++++', value: "6" },
    { text: '未選擇', value: '' },
]

//行安績效 - 三層原因
export const carAccReason = {
    ReasonLv1: [
        {
            text: '內部因素',
            value: 'IC'
        },
        {
            text: '外部因素',
            value: 'EC'
        },
        {
            text: '未查明原因或其他',
            value: 'Other'
        },
    ],
    ReasonLv2: {
        'IC': [
            {
                text: '人為因素',
                value: '2_HF'
            },
            {
                text: '車輛',
                value: '2_RS'
            },
            {
                text: '路線設施',
                value: '2_INF'
            },
            {
                text: '使用者',
                value: '2_RU'
            },
        ],
        'EC': [
            {
                text: '第三方',
                value: '2_TrdP'
            },
            {
                text: '天氣與環境',
                value: '2_WE'
            },
        ]
    },
    ReasonLv3: {
        '2_HF': [
            {
                text: '維修人員',
                value: '3_TSM'
            },
            {
                text: '調度員及號誌員',
                value: '3_TOSS'
            },
            {
                text: '司機員',
                value: '3_TD'
            },
            {
                text: '其他人為因素',
                value: '3_HFOther'
            },
        ],
        '2_RS': [
            {
                text: '車輪',
                value: '3_RG'
            },
            {
                text: '其他車輛因素',
                value: '3_RSOther'
            },
        ],
        '2_INF': [
            {
                text: '軌道與相關構造',
                value: '3_TS'
            },
            {
                text: '電力系統',
                value: '3_ES'
            },
            {
                text: '其他路線因素',
                value: '3_INFOther'
            },
        ],
        '2_RU': [
            {
                text: '乘客',
                value: '3_P'
            },
            {
                text: '其他使用者因素',
                value: '3_RUOther'
            },
        ],
        '2_TrdP': [
            {
                text: '入侵路線',
                value: '3_Tre'
            },
            {
                text: '車輛入侵平交道',
                value: '3_VLC'
            },
            {
                text: '人員入侵平交道',
                value: '3_PLC'
            },
            {
                text: '人員在公共區域',
                value: '3_PRA'
            },
            {
                text: '其他第三方因素',
                value: '3_TrdPOther'
            },
        ],
        '2_WE': [
            {
                text: '環境',
                value: '3_Env'
            },
            {
                text: '天氣',
                value: '3_Wea'
            },
        ]
    }
}