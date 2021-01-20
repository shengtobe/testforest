import axios from '@/apis/axiosSetting'

// 服務科工單立案匯出 excel
export function serveNewListExecl(data) { return axios(
    {
        url: '/user/excel/create',
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