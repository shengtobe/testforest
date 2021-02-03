import axios from '@/apis/axiosSetting'

// 搜尋
export function fetchList(data) { return axios(
    {
        url: '/sms/dangernotify/queryarray',
        method: 'post',
        data,
    }
)}