// --------- 行車危害資料庫 API --------------

import axios from '@/apis/axiosSetting'

// 搜尋多筆
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

// 取得單一筆工單詳細資料
export function fetchOne(data) { return axios(
    {
        url: '/sms/dangerdb/detail',
        method: 'post',
        data,
    }
)}

// 更新
export function updateData(data) { return axios(
    {
        url: '/sms/dangerdb/update',
        method: 'post',
        data,
    }
)}

// 刪除
export function deleteData(data) { return axios(
    {
        url: '/sms/dangerdb/delete',
        method: 'delete',
        data,
    }
)}
// 申請審核
export function sendCheckData(data) { return axios(
    {
        url: '/sms/dangerdb/apply/check',
        method: 'post',
        data,
    }
)}

// 申請結案
export function sendCloseData(data) { return axios(
    {
        url: '/sms/dangerdb/apply/close',
        method: 'post',
        data,
    }
)}

// 審核通過
export function sendPassData(data) { return axios(
    {
        url: '/sms/dangerdb/check/pass',
        method: 'post',
        data,
    }
)}

// 退回
export function sendRetuenData(data) { return axios(
    {
        url: '/sms/dangerdb/check/return',
        method: 'post',
        data,
    }
)}

// 重提
export function sendResetData(data) { return axios(
    {
        url: '/sms/dangerdb/apply/reset',
        method: 'post',
        data,
    }
)}

// 申請更新(危害更新)
export function sendUpdateData(data) { return axios(
    {
        url: '/sms/dangerdb/apply/update',
        method: 'post',
        data,
    }
)}

// 行車危害編修歷程記錄查詢
export function getBeforeData(data) { return axios(
    {
        url: '/sms/dangerdb/record/query',
        method: 'post',
        data,
    }
)}


