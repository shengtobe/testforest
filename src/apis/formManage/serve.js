import axios from '@/apis/axiosSetting'

// 表單管理-查詢表單清單-查詢清單明細 (for 前台-查詢表單清單)
export function fetchFormOrderList(data) {
    return axios(
        {
            url: 'rp/form/querylist',
            method: 'post',
            data,
        }
    )
}

// 表單管理-查詢表單清單-查詢單筆表單詳細資料 (for 前台-查詢單筆表單明細)
export function fetchFormOrderOne(data) {
    return axios(
        {
            url: 'rp/form/query',
            method: 'post',
            data,
        }
    )
}
// 表單管理-新增單筆表單-新增單筆表單資料 (for 前台-新增單筆表單明細)
export function createFormOrder0(data) {
    return axios(
        {
            url: 'rp/form/create',
            method: 'post',
            data,
        }
    )
}
// 1~7表單管理-新增單筆表單-新增單筆表單資料 (for 前台-新增單筆表單明細)
export function createFormOrder(data) {
    return axios(
        {
            url: 'rp/form/createSecurityChecklist',
            method: 'post',
            data,
        }
    )
}
// 表單管理-刪除單筆表單-刪除單筆表單資料 (for 前台-刪除單筆表單明細)				
export function deleteFormOrder(data) {
    return axios(
        {
            url: 'rp/form/delete',
            method: 'post',
            data,
        }
    )
}
// 表單管理-更新單筆表單-更新單筆表單資料 (for 前台-更新單筆表單明細)				
export function updateFormOrder(data) {
    return axios(
        {
            url: 'rp/form/update',
            method: 'post',
            data,
        }
    )
}

// 表單管理-上傳單筆表單資料-上傳單筆表單資料 (for 前台-上傳單筆表單明細)		
export function uploadFile(data) {
    return axios(
        {
            url: 'rp/form/upload',
            method: 'post',
            data,
        }
    )
}
