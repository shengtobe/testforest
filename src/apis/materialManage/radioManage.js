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
export function radioDetail(data) {
    return axios({
        url: 'mmis/equipdata/radioquerydetail',
        method: 'post',
        data,
    })
}
export function radioUpdate(data) {
    return axios({
        url: 'mmis/equipdata/radioedit',
        method: 'post',
        data
    })
}
export function radioDelete(data) {
    return axios({
        url: 'mmis/equipdata/radiodelete',
        method: 'post',
        data
    })
}