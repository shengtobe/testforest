// --------- 危害控制措施 API --------------

import axios from '@/apis/axiosSetting'

// 搜尋多筆 & 取得單一筆詳細資料
export function fetchList(data) { return axios(
    {
        url: '/sms/danger/proc/query',
        method: 'post',
        data,
    }
)}

// 新增
export function createData(data) { return axios(
    {
        url: '/sms/danger/proc/create',
        method: 'post',
        data,
    }
)}

// 更新
export function updateData(data) { return axios(
    {
        url: '/sms/danger/proc/update',
        method: 'post',
        data,
    }
)}

// 刪除
export function deleteData(data) { return axios(
    {
        url: '/sms/danger/proc/delete',
        method: 'delete',
        data,
    }
)}

// 檔案更新(上傳)
export function updateFile(data) { return axios(
    {
        url: '/sms/danger/proc/file/update',
        method: 'post',
        data,
    }
)}

// 檔案更新
export function deleteFile(data) { return axios(
    {
        url: '/sms/danger/proc/file/delete',
        method: 'post',
        data,
    }
)}
