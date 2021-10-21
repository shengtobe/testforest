// --------- 行車事故事件 API --------------

import axios from '@/apis/axiosSetting'

// -------------- 行車事故事件 -------------
// excel檔案匯出
export function wordData(data) { return axios(
    {
        url: '/sms/event/export_word',
        method: 'post',
        data,
    }
)}

// 要求事故類型清單
export function fetchEvtTypes(data) { return axios(
    {
        url: '/global/accident/type/query',
        method: 'post',
        data,
    }
)}

// 要求衍生事故類型清單
export function fetchEvtTypes2(data) { return axios(
    {
        url: '/global/dangerdb/type/query',
        method: 'post',
        data,
    }
)}

// 搜尋列表
export function fetchList(data) { return axios(
    {
        url: '/sms/event/queryarray',
        method: 'post',
        data,
    }
)}

// 新增
export function createData(data) { return axios(
    {
        url: '/sms/event/create',
        method: 'post',
        data,
    }
)}

// 取得單一筆詳細資料
export function fetchOne(data) { return axios(
    {
        url: '/sms/event/detail',
        method: 'post',
        data,
    }
)}

// 更新
export function updateData(data) { return axios(
    {
        url: '/sms/event/update',
        method: 'post',
        data,
    }
)}

// 刪除 (作廢)
export function deleteData(data) { return axios(
    {
        url: '/sms/event/delete',
        method: 'delete',
        data,
    }
)}

// 檔案更新(上傳)
export function updateFile(data) { return axios(
    {
        url: '/sms/event/file/create',
        method: 'post',
        data,
    }
)}

// 檔案刪除
export function deleteFile(data) { return axios(
    {
        url: '/sms/event/file/delete',
        method: 'delete',
        data,
    }
)}

// 申請審核
export function applyData(data) { return axios(
    {
        url: '/sms/event/apply/check',
        method: 'post',
        data,
    }
)}

// 長官審核通過
export function passData(data) { return axios(
    {
        url: '/sms/event/check/pass',
        method: 'post',
        data,
    }
)}

// 申請結案
export function closeData(data) { return axios(
    {
        url: '/sms/event/apply/close',
        method: 'post',
        data,
    }
)}

// 退回
export function withdrawData(data) { return axios(
    {
        url: '/sms/event/check/return',
        method: 'post',
        data,
    }
)}

// 重提事故事件
export function resetData(data) { return axios(
    {
        url: '/sms/event/apply/reset',
        method: 'post',
        data,
    }
)}


// -------------- 人員傷亡名單 -------------
// 搜尋列表
export function hurtFetchList(data) { return axios(
    {
        url: '/sms/event/hurt_people/query',
        method: 'post',
        data,
    }
)}

// 新增
export function hurtCreateData(data) { return axios(
    {
        url: '/sms/event/hurt_people/create',
        method: 'post',
        data,
    }
)}

// 更新
export function hurtUpdateData(data) { return axios(
    {
        url: '/sms/event/hurt_people/update',
        method: 'post',
        data,
    }
)}

// 刪除
export function hurtDeleteData(data) { return axios(
    {
        url: '/sms/event/hurt_people/delete',
        method: 'delete',
        data,
    }
)}


// -------------- 改善措施 -------------
// 更新
export function procUpdateData(data) { return axios(
    {
        url: '/sms/event/proc/update',
        method: 'post',
        data,
    }
)}