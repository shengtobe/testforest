// --------- 行車危害資料庫 API --------------

import axios from '@/apis/axiosSetting'

// 搜尋多筆 & 取得單一筆詳細資料
export function fetchList(data) { return axios(
    {
        url: '/sms/dangerdb/queryarray',
        method: 'post',
        data,
    }
)}

// 新增
export function createData(data) { return axios(
    {
        url: '/sms/dangerdb/create',
        method: 'post',
        data,
    }
)}

// // 更新
// export function updateData(data) { return axios(
//     {
//         url: '/sms/dangerdb/update',
//         method: 'post',
//         data,
//     }
// )}

// // 刪除
// export function deleteData(data) { return axios(
//     {
//         url: '/sms/dangerdb/delete',
//         method: 'delete',
//         data,
//     }
// )}
