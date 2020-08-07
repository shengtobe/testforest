import axios from '@/apis/axiosSetting'

// 取得設備報修碼Lv1
export function fetchEqCodeLv1(data) { return axios(
    {
        url: '/global/dev/querylv1',
        method: 'post',
        data,
    }
)}

// 取得設備報修碼Lv2
export function fetchEqCodeLv2(data) { return axios(
    {
        url: '/global/dev/querylv2',
        method: 'post',
        data,
    }
)}

// 取得設備報修碼Lv3
export function fetchEqCodeLv3(data) { return axios(
    {
        url: '/global/dev/querylv3',
        method: 'post',
        data,
    }
)}

// 取得設備報修碼Lv4
export function fetchEqCodeLv4(data) { return axios(
    {
        url: '/global/dev/querylv4',
        method: 'post',
        data,
    }
)}

// ----------------- 維修養護科 ----------------------
// 工單搜尋
export function fetchOrderList(data) { return axios(
    {
        url: '/mmis/order/querylist',
        method: 'post',
        data,
    }
)}

// 工單建立
export function createWorkOrder(data) { return axios(
    {
        url: '/mmis/order/create1',
        method: 'post',
        data,
    }
)}

// 取得一筆立案單資料
export function fetchWorkOrderOne(data) { return axios(
    {
        url: '/mmis/order/querydetail',
        method: 'post',
        data,
    }
)}