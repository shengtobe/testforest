// -------- 共通的函式 --------

// 取得目前時間(格式為 西元年-月-日 時:分:秒)
export function getNowFullTime() {
    let t = new Date()

    // 小於10的時間前面都補 0
    let o = {
        year: t.getFullYear(),
        month: (t.getMonth()+1 < 10)? '0'+(t.getMonth()+1) : t.getMonth()+1,
        day: (t.getDate() < 10)? '0'+ t.getDate() : t.getDate(),
        hour: (t.getHours() < 10)? '0'+ t.getHours() : t.getHours(),
        min: (t.getMinutes() < 10)? '0'+ t.getMinutes() : t.getMinutes(),
        sec: (t.getSeconds() < 10)? '0'+ t.getSeconds() : t.getSeconds(),
        ms: (t.getMilliseconds() < 10)? '00'+ t.getMilliseconds() : ((t.getMilliseconds() < 100)? '0'+ t.getMilliseconds() : t.getMilliseconds()),
    }
    // ISO 8601 時間格式
    return `${o.year}-${o.month}-${o.day} ${o.hour}:${o.min}:${o.sec}.${o.ms}`
}

// 工單階段要呈現的文字 (後端還沒寫好前，暫時先這樣)
// stateStr(status) {
//     switch(status) {
//         case '1':  // 待派工
//             return '待派工'
//             break
//         case '2':  // 已派工待維修
//             return '已派工待維修'
//             break
//         case '3':  // 已維修待驗收
//             return '已維修待驗收'
//             break
//         case '4':  // 已驗收待結案
//             return '已驗收待結案'
//             break
//         case '5':  // 已結案
//             return '已結案'
//             break
//         default:
//             break
//     }
// }