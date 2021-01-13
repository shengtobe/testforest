import axios from '@/apis/axiosSetting'

// 列車、軌道、車道設備 清單
export function radioQueryList(data) { 
    return axios(
    {
        url: '/mmis/equipdata/radioquerylist',
        method: 'post',
        data,
    }
)}
