import axios from '@/apis/axiosSetting'

// 取得設備標示編號Lv1
export function fetchEqCodeLv1(data) { return axios(
    {
        url: '/global/dev/querylv1',
        method: 'post',
        data,
    }
)}

// 取得設備標示編號Lv2
export function fetchEqCodeLv2(data) { return axios(
    {
        url: '/global/dev/querylv2',
        method: 'post',
        data,
    }
)}

// 取得設備標示編號Lv3
export function fetchEqCodeLv3(data) { return axios(
    {
        url: '/global/dev/querylv3',
        method: 'post',
        data,
    }
)}

// 取得設備標示編號Lv4
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
        url: '/mmis/order/create',
        method: 'post',
        data,
    }
)}

export function deleteOrder(data) { return axios(
    {
        url: '/mmis/order/delete',
        method: 'delete',
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

// 取得更新工單 (狀態：待派工)
export function updateListOrder(data) { return axios(
    {
        url: '/mmis/order/update',
        method: 'post',
        data,
    }
)}