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

// 取得單一筆工單詳細資料
export function fetchNotifyOne(data) { return axios(
    {
        url: '/sms/dangernotify/detail',
        method: 'post',
        data,
    }
)}

// 危害通報回覆
export function replyNotify(data) { return axios(
    {
        url: '/sms/dangernotify/reply',
        method: 'post',
        data,
    }
)}
