import axios from '@/apis/axiosSetting'

// 服務科工單立案匯出 excel
export function serveNewListExecl(data) { return axios(
    {
        url: '/mmis/service_order/export_excel',
        method: 'post',
        data,
    }
)}

// 工單建立
export function createWorkOrder(data) { return axios(
    {
        url: '/mmis/service_order/create',
        method: 'post',
        data,
    }
)}

// 刪除工單
export function deleteOrder(data) { return axios(
    {
        url: '/mmis/service_order/delete',
        method: 'delete',
        data,
    }
)}

// 工單搜尋
export function fetchOrderList(data) { return axios(
    {
        url: '/mmis/service_order/queryarray',
        method: 'post',
        data,
    }
)}

// 取得單一筆工單詳細資料
export function fetchWorkOrderOne(data) { return axios(
    {
        url: '/mmis/service_order/querydetail',
        method: 'post',
        data,
    }
)}

// 更新工單
export function updateListOrder(data) { return axios(
    {
        url: '/mmis/service_order/update',
        method: 'post',
        data,
    }
)}

// 派工頁送出
export function dispatchOrder(data) { return axios(
    {
        url: '/mmis/service_order/dispatch',
        method: 'post',
        data,
    }
)}

// 維修頁送出
export function maintainOrder(data) { return axios(
    {
        url: '/mmis/service_order/maintain',
        method: 'post',
        data,
    }
)}


// 驗收頁送出
export function acceptanceOrder(data) { return axios(
    {
        url: '/mmis/service_order/acceptance',
        method: 'post',
        data,
    }
)}

// 結案送出
export function closeOrder(data) { return axios(
    {
        url: '/mmis/service_order/close',
        method: 'post',
        data,
    }
)}

// 退回
export function withdrawOrder(data) { return axios(
    {
        url: '/mmis/service_order/return',
        method: 'put',
        data,
    }
)}

// 徹銷
export function cancelOrder(data) { return axios(
    {
        url: '/mmis/service_order/cancel',
        method: 'delete',
        data,
    }
)}

// 延後驗收
export function delayOrder(data) { return axios(
    {
        url: '/mmis/service_order/delay',
        method: 'put',
        data,
    }
)}