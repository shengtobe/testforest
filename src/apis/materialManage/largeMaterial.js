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
// 列車、軌道、車道設備 資料新增/修改
export function largeQueryEdit(data) { 
    return axios(
    {
        url: '/mmis/equipdata/largeedit',
        method: 'post',
        data,
    }
)}
// 列車、軌道、車道設備 資料刪除
export function largeQueryDelete(data) { 
    return axios(
    {
        url: '/mmis/equipdata/largedelete',
        method: 'post',
        data,
    }
)}
//檔案上傳
export function largeFileAdd(data) {
    return axios(
    {
        url: '/mmis/equipdata/largefileadd',
        method: 'post',
        data,
    }
)}
//檔案查詢
export function largeFileView(data) {
    return axios(
    {
        url: '/mmis/equipdata/largefileview',
        method: 'post',
        data,
    }
)}
//檔案刪除
export function largeFileDelete(data) {
    return axios(
    {
        url: '/mmis/equipdata/largefiledelete',
        method: 'post',
        data,
    }
)}
//設備標示分碼資料查詢
export function equipCodeDetail(data) {
    return axios(
        {
            url: '/mmis/equipdata/equipcodedetail',
            method: 'post',
            data
        }
    )
}
//設備標示分碼更新
export function equipCodeUpdate(data) {
    return axios(
        {
            url: '/mmis/equipdata/equipcodeupdate',
            method: 'post',
            data
        }
    )
}
//設備標示分碼新增
export function equipCodeInsert(data) {
    return axios(
        {
            url: '/mmis/equipdata/equipcodeinsert',
            method: 'post',
            data
        }
    )
}
//設備標示分碼刪除
export function equipCodeRemove(data) {
    return axios(
        {
            url: '/mmis/equipdata/equipcoderemove',
            method: 'post',
            data
        }
    )
}