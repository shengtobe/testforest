// --------- 職安管理 API --------------

import axios from '@/apis/axiosSetting'


// excel檔案匯出
export function excelData(data) { return axios(
    {
        url: '/sms/profession/event/export_excel',
        method: 'post',
        data,
    }
)}

// 查詢
export function searchData(data) { return axios(
    {
        url: '/sms/profession/event/queryarray',
        method: 'post',
        data,
    }
)}

// 查詢 職災危害資料庫
export function searchDataDb(data) { return axios(
    {
        url: '/sms/profession/danger/queryarray',
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

// 新增 職災危害資料庫
export function createDataDb(data) { return axios(
    {
        url: '/sms/profession/danger/create',
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

// 詳細資料 職災危害資料庫
export function detailOneDb(data) { return axios(
    {
        url: '/sms/profession/danger/detail',
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

// 更新 職災危害資料庫
export function updateDataDb(data) { return axios(
    {
        url: '/sms/profession/danger/update',
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

// 刪除 職災危害資料庫
export function deleteDataDb(data) { return axios(
    {
        url: '/sms/profession/danger/delete',
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

// 申請審核
export function sendCheckData(data) { return axios(
    {
        url: '/sms/profession/event/apply/check',
        method: 'post',
        data,
    }
)}

// 審核通過(同意措施執行)
export function passData(data) { return axios(
    {
        url: '/sms/profession/event/check/pass',
        method: 'post',
        data,
    }
)}

// 退回
export function withdrawData(data) { return axios(
    {
        url: '/sms/profession/event/check/return',
        method: 'post',
        data,
    }
)}

// 重提事故事件
export function resetData(data) { return axios(
    {
        url: '/sms/profession/event/apply/reset',
        method: 'post',
        data,
    }
)}

// 申請結案
export function closeData(data) { return axios(
    {
        url: '/sms/profession/event/apply/close',
        method: 'post',
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

// 職災傷害類型統計
export function analyDanger(data) { return axios(
    {
        url: '/sms/profession/danger/analydanger',
        method: 'post',
        data,
    }
)}
// 科室職災事故統計
export function analyDangerByDepart(data) { return axios(
    {
        url: '/sms/profession/danger/analydangerbydepart',
        method: 'post',
        data,
    }
)}
// 年工時輸入/查詢
export function jobDangerYearhr(data) { return axios(
    {
        url: '/sms/profession/danger/yearhr',
        method: 'post',
        data,
    }
)}
// 職能傷害率查詢
export function jobDangerOccupationrate(data) { return axios(
    {
        url: '/sms/profession/danger/occupationrate',
        method: 'post',
        data,
    }
)}