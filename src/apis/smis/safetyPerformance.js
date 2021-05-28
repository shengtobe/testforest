import axios from '@/apis/axiosSetting'

//指標分層列表清單 (四層)
export function indexLevelList(data) {
    return axios(
        {
            url: 'sms/sp/indexlevellist',
            method: 'post',
            data,
        }
    )
}
// 事故原因分類列表清單 (三層) 
export function accidentResonQueryList(data) {
    return axios(
        {
            url: 'sms/sp/accidentlevelquerylist',
            method: 'post',
            data,
        }
    )
}

//--軔機--
//查詢清單
export function brakeQueryList(data) {
    return axios(
        {
            url: 'sms/sp/brakequerylist',
            method: 'post',
            data,
        }
    )
}

//單層查詢
export function brakeQuery(data) {
    return axios(
        {
            url: 'sms/sp/brakequery',
            method: 'post',
            data,
        }
    )
}

//新增
export function brakeInsert(data) {
    return axios(
        {
            url: 'sms/sp/brakeinsert',
            method: 'post',
            data,
        }
    )
}

//修改
export function brakeUpdate(data) {
    return axios(
        {
            url: 'sms/sp/brakeupdate',
            method: 'post',
            data,
        }
    )
}

//-- 酒測/健檢異常 --
//查詢
export function drunkQueryList(data) {
    return axios(
        {
            url: 'sms/sp/drunkquerylist',
            method: 'post',
            data,
        }
    )
}

//單層查詢
export function drunkQuery(data) {
    return axios(
        {
            url: 'sms/sp/drunkquery',
            method: 'post',
            data,
        }
    )
}

//新增
export function drunkInsert(data) {
    return axios(
        {
            url: 'sms/sp/drunkinsert',
            method: 'post',
            data,
        }
    )
}

//修改
export function drunkUpdate(data) {
    return axios(
        {
            url: 'sms/sp/drunkupdate',
            method: 'post',
            data,
        }
    )
}

// -- 車速異常 --
//查詢
export function carspeedQueryList(data) {
    return axios(
        {
            url: 'sms/sp/carspeedquerylist',
            method: 'post',
            data,
        }
    )
}

//單層查詢
export function carspeedQuery(data) {
    return axios(
        {
            url: 'sms/sp/carspeedquery',
            method: 'post',
            data,
        }
    )
}

//新增
export function carspeedInsert(data) {
    return axios(
        {
            url: 'sms/sp/carspeedinsert',
            method: 'post',
            data,
        }
    )
}

//修改
export function carspeedUpdate(data) {
    return axios(
        {
            url: 'sms/sp/carspeedupdate',
            method: 'post',
            data,
        }
    )
}

// -- 行車安全績效趨勢 --
// -- 第一層 --
//趨勢圖
export function accidentQuery(data) {
    return axios(
        {
            url: 'sms/sp/accidentquery',
            method: 'post',
            data,
        }
    )
}
//趨勢圖-事故列表
export function accidentQueryList(data) {
    return axios(
        {
            url: 'sms/sp/accidentquerylist',
            method: 'post',
            data,
        }
    )
}
//趨勢分析
export function accidentTrendQuery(data) {
    return axios(
        {
            url: 'sms/sp/accidenttrendquery',
            method: 'post',
            data,
        }
    )
}
//趨勢分析-事故列表
export function accidentTrendQueryList(data) {
    return axios(
        {
            url: 'sms/sp/accidenttrendquerylist',
            method: 'post',
            data,
        }
    )
}
//事故原因比例
export function accidentYearQuery(data) {
    return axios(
        {
            url: 'sms/sp/accidentyearquery',
            method: 'post',
            data,
        }
    )
}
//事故原因比例-事故列表
export function accidentYearQueryList(data) {
    return axios(
        {
            url: 'sms/sp/accidentyearquerylist',
            method: 'post',
            data,
        }
    )
}
// -- 第三層 --
//查詢關鍵設備清單
export function keyEquipList(data) {
    return axios(
        {
            url: 'sms/sp/keyequiplist',
            method: 'post',
            data,
        }
    )
}
//查詢關鍵設備MKBF績效
export function keyEquipMKBFList(data) {
    return axios(
        {
            url: 'sms/sp/keyequipmkbflist',
            method: 'post',
            data,
        }
    )
}