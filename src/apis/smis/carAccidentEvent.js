// --------- 行車事故事件 API --------------

import axios from '@/apis/axiosSetting'

// 搜尋
export function fetchList(data) { return axios(
    {
        url: '/sms/event/queryarray',
        method: 'post',
        data,
    }
)}

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
