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