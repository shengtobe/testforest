// --------- 職安管理 API --------------

import axios from '@/apis/axiosSetting'

// 查詢
export function searchData(data) { return axios(
    {
        url: '/sms/profession/event/queryarray',
        method: 'post',
        data,
    }
)}

// 新增
export function createData(data) { return axios(
    {
        url: '/sms/profession/event/create',
        method: 'post',
        data,
    }
)}

// 詳細資料
export function detailOne(data) { return axios(
    {
        url: '/sms/profession/event/detail',
        method: 'post',
        data,
    }
)}

// 更新
export function updateData(data) { return axios(
    {
        url: '/sms/profession/event/update',
        method: 'post',
        data,
    }
)}

// 刪除
export function deleteData(data) { return axios(
    {
        url: '/sms/profession/event/delete',
        method: 'delete',
        data,
    }
)}

// 檔案更新
export function fileUpdateData(data) { return axios(
    {
        url: '/sms/profession/event/file/update',
        method: 'post',
        data,
    }
)}

// 檔案刪除
export function fileDeleteData(data) { return axios(
    {
        url: '/sms/profession/event/file/delete',
        method: 'delete',
        data,
    }
)}

// // 搜尋
// export function licenseRcdQuery(data) { return axios(
//     {
//         url: '/sms/license/licensercdquery',
//         method: 'post',
//         data,
//     }
// )}

// // 新增/修改 - 依人
// export function licenseOption(data) { return axios(
//   {
//       url: '/sms/license/licenseoption',
//       method: 'post',
//       data,
//   }
// )}

// // 搜尋 - 依證照
// export function licenseQuery(data) { return axios(
//     {
//         url: '/sms/license/licensequery',
//         method: 'post',
//         data,
//     }
// )}