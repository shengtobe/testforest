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

// 刪除
export function deleteData(data) { return axios(
    {
        url: '/sms/event/delete',
        method: 'delete',
        data,
    }
)}
