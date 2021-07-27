// --------- 安全文件 API --------------

import axios from '@/apis/axiosSetting'

// --------------- 慢行文件 ------------------
// 搜尋
export function fetchList(data) { return axios(
    {
        url: '/sms/slowspeed/query',
        method: 'post',
        data,
    }
)}

// 詳細資料
export function detail(data) { return axios(
    {
        url: '/sms/slowspeed/detail',
        method: 'post',
        data,
    }
)}

//新增
export function CreateCarSafelnfo(data) { return axios(
    {
        url: '/sms/slowspeed/create',
        method: 'post',
        data,
    }
)}

// 更新
export function updateRegul(data) { return axios(
    {
        url: '/sms/slowspeed/update',
        method: 'post',
        data,
    }
)}

// 刪除
export function deleteRegul(data) { return axios(
    {
        url: '/sms/slowspeed/delete',
        method: 'delete',
        data,
    }
)}

// 追蹤讀取
export function readTrack(data) { return axios(
    {
        url: '/sms/slowspeed/read/query',
        method: 'post',
        data,
    }
)}


// ------------------ 安全資訊文件 ---------------------
// 搜尋
export function safetyinfoquery(data) { return axios(
    {
        url: '/sms/safety/info/query',
        method: 'post',
        data,
    }
)}

// 詳細搜尋
export function safetyinfodetail(data) { return axios(
    {
        url: '/sms/safety/info/detail',
        method: 'post',
        data,
    }
)}

// 新增
export function safetyinfocreate(data) { return axios(
    {
        url: '/sms/safety/info/create',
        method: 'post',
        data,
    }
)}

// 資訊更新
export function safetyinfoupdate(data) { return axios(
    {
        url: '/sms/safety/info/update',
        method: 'post',
        data,
    }
)}

// 單檔更新
export function safetyinfofileupdate(data) { return axios(
    {
        url: '/sms/safety/info/file/update',
        method: 'post',
        data,
    }
)}

// 單檔刪除
export function safetyinfofiledelete(data) { return axios(
    {
        url: '/sms/safety/info/file/delete',
        method: 'delete',
        data,
    }
)}

// 審核
export function safetyinfocheck(data) { return axios(
    {
        url: '/sms/safety/info/check',
        method: 'post',
        data,
    }
)}

// 刪除_作廢(審核階段)
export function safetyinfodelete(data) { return axios(
    {
        url: '/sms/safety/info/delete',
        method: 'delete',
        data,
    }
)}

// 退回
export function safetyinforeturn(data) { return axios(
    {
        url: '/sms/safety/info/return',
        method: 'post',
        data,
    }
)}

// 加會
export function safetyinfojoincheck(data) { return axios(
    {
        url: '/sms/safety/info/joincheck',
        method: 'post',
        data,
    }
)}

export function safetyinfoexcel(data) { return axios(
    {
        url: '/sms/safety/info/saftyinfoexcel',
        method: 'post',
        data,
    }
)}

// // ------------------ 行車事故事件附件 ---------------------
// // 搜尋
// export function drivingfetchList(data) { return axios(
//     {
//         url: '/sms/event/file/query',
//         method: 'post',
//         data,
//     }
// )}


// // 更新
// export function updateDriving(data) { return axios(
//     {
//         url: '/sms/event/file/update',
//         method: 'post',
//         data,
//     }
// )}

// // 刪除
// export function deleteDriving(data) { return axios(
//     {
//         url: '/sms/event/file/delete',
//         method: 'delete',
//         data,
//     }
// )}