// --------- 安全文件 API --------------

import axios from '@/apis/axiosSetting'

// --------------- 規章文件 ------------------
// 搜尋
export function regulfetchList(data) { return axios(
    {
        url: '/sms/safety/regulfile/query',
        method: 'post',
        data,
    }
)}

// 新增
export function regulCreate(data) { return axios(
    {
        url: '/sms/safety/regulfile/create',
        method: 'post',
        data,
    }
)}

// -------------------------------------------
// // 新增
// export function createNotify(data) { return axios(
//     {
//         url: '/sms/event/create',
//         method: 'post',
//         data,
//     }
// )}

// // 取得單一筆工單詳細資料
// export function fetchNotifyOne(data) { return axios(
//     {
//         url: '/sms/event/detail',
//         method: 'post',
//         data,
//     }
// )}

// // 危害通報回覆
// export function replyNotify(data) { return axios(
//     {
//         url: '/sms/event/reply',
//         method: 'post',
//         data,
//     }
// )}
