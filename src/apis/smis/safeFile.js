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

// 更新
export function updateRegul(data) { return axios(
    {
        url: '/sms/safety/regulfile/update',
        method: 'post',
        data,
    }
)}

// 刪除
export function deleteRegul(data) { return axios(
    {
        url: '/sms/safety/regulfile/delete',
        method: 'delete',
        data,
    }
)}


// ------------------ 安全會議文件 ---------------------
// 搜尋
export function meetfetchList(data) { return axios(
    {
        url: '/sms/safety/meetingdoc/query',
        method: 'post',
        data,
    }
)}

// 新增
export function createMeet(data) { return axios(
    {
        url: '/sms/safety/meetingdoc/create',
        method: 'post',
        data,
    }
)}

// 更新
export function updateMeet(data) { return axios(
    {
        url: '/sms/safety/meetingdoc/update',
        method: 'post',
        data,
    }
)}

// 刪除
export function deleteMeet(data) { return axios(
    {
        url: '/sms/safety/meetingdoc/delete',
        method: 'delete',
        data,
    }
)}


// ------------------ 行車事故事件附件 ---------------------
// 搜尋
export function drivingfetchList(data) { return axios(
    {
        url: '/sms/event/file/query',
        method: 'post',
        data,
    }
)}


// 更新
export function updateDriving(data) { return axios(
    {
        url: '/sms/event/file/update',
        method: 'post',
        data,
    }
)}

// 刪除
export function deleteDriving(data) { return axios(
    {
        url: '/sms/event/file/delete',
        method: 'delete',
        data,
    }
)}