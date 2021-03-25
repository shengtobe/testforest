import axios from '@/apis/axiosSetting'

// 層級因素列表列表清單
export function accidentResonQueryList(data) {
    return axios(
        {
            url: 'sms/sp/accidentresonquerylist',
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