import axios from '@/apis/axiosSetting'

// 搜尋
export function fetchList(data) { return axios(
    {
        url: '/sms/dangernotify/queryarray',
        method: 'post',
        data,
    }
)}

// 新增
export function createNotify(data) { return axios(
    {
        url: '/sms/dangernotify/create',
        method: 'post',
        data,
    }
)}