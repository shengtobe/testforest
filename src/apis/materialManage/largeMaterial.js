import axios from '@/apis/axiosSetting'

// 列車、軌道、車道設備 清單
export function largeQueryList(data) { 
    return axios(
    {
        url: '/mmis/equipdata/largequerylist',
        method: 'post',
        data,
    }
)}
// 列車、軌道、車道設備 詳細資料
export function largeQueryDetail(data) { 
    return axios(
    {
        url: '/mmis/equipdata/largequerydetail',
        method: 'post',
        data,
    }
)}